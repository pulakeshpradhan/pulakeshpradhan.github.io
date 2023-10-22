//-----Ex-Post Flood Damage Assessment------//
//var table = ee.FeatureCollection("users/marufce2k7/BDG_admin_02");
//var geometry = table.filter(ee.Filter.eq("NAME_2", "Chittagong"));
var geometry = ee.Geometry.Polygon(
        [[[89.57728594426585, 25.360098848499273],
          [89.70362871770335, 25.652607806529925],
          [89.07740801457835, 26.422559479913442],
          [88.76429766301585, 26.22561869119211]]]);
var geometryArea = geometry.area({maxError:0.01}).divide(1000 * 1000).round();
var before_start= '2021-10-07';
var before_end='2021-10-09';
// Now set the same parameters for AFTER the flood.
var after_start='2021-10-18';
var after_end='2021-10-21';
var polarization = "VH"; /*or 'VV' --> VH mostly is the prefered polarization for flood mapping.
                           However, it always depends on your study area, you can select 'VV' 
                           as well.*/ 
var pass_direction = "DESCENDING"; /* or 'ASCENDING'when images are being compared use only one 
                           pass direction. Consider changing this parameter, if your image 
                           collection is empty. In some areas more Ascending images exist than 
                           than descending or the other way around.*/
var difference_threshold = 1.20; /*threshodl to be applied on the difference image (after flood
                           - before flood). It has been chosen by trial and error. In case your
                           flood extent result shows many false-positive or negative signals, 
                           consider changing it! */
var relative_orbit = 41; 
                          /*if you know the relative orbit for your study area, you can filter
                           you image collection by it here, to avoid errors caused by comparing
                           different relative orbits.*/
// rename selected geometry feature 
var aoi = ee.FeatureCollection(geometry);
// Load and filter Sentinel-1 GRD data by predefined parameters 
var collection= ee.ImageCollection('COPERNICUS/S1_GRD')
  .filter(ee.Filter.eq('instrumentMode','IW'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', polarization))
  .filter(ee.Filter.eq('orbitProperties_pass',pass_direction)) 
  .filter(ee.Filter.eq('resolution_meters',10))
  //.filter(ee.Filter.eq('relativeOrbitNumber_start',relative_orbit ))
  .filterBounds(aoi)
  .select(polarization);
// Select images by predefined dates
var before_collection = collection.filterDate(before_start, before_end);
var after_collection = collection.filterDate(after_start,after_end);
// Print selected tiles to the console
      // Extract date from meta data
      function dates(imgcol){
        var range = imgcol.reduceColumns(ee.Reducer.minMax(), ["system:time_start"]);
        var printed = ee.String('from ')
          .cat(ee.Date(range.get('min')).format('YYYY-MM-dd'))
          .cat(' to ')
          .cat(ee.Date(range.get('max')).format('YYYY-MM-dd'));
        return printed;
      }
      // print dates of before images to console
      var before_count = before_collection.size();
      print(ee.String('Tiles selected: Before Flood ').cat('(').cat(before_count).cat(')'),
        dates(before_collection), before_collection);
      // print dates of after images to console
      var after_count = before_collection.size();
      print(ee.String('Tiles selected: After Flood ').cat('(').cat(after_count).cat(')'),
        dates(after_collection), after_collection);
// Create a mosaic of selected tiles and clip to study area
var before = before_collection.mosaic().clip(aoi);
var after = after_collection.mosaic().clip(aoi);
// Apply reduce the radar speckle by smoothing  
var smoothing_radius = 50;
var before_filtered = before.focal_mean(smoothing_radius, 'circle', 'meters');
var after_filtered = after.focal_mean(smoothing_radius, 'circle', 'meters');
//------------------------------- FLOOD EXTENT CALCULATION -------------------------------//
// Calculate the difference between the before and after images
var difference = after_filtered.divide(before_filtered);
// Apply the predefined difference-threshold and create the flood extent mask 
var threshold = difference_threshold;
var difference_binary = difference.gt(threshold);
// Refine flood result using additional datasets
      // Include JRC layer on surface water seasonality to mask flood pixels from areas
      // of "permanent" water (where there is water > 10 months of the year)
      var swater = ee.Image('JRC/GSW1_3/GlobalSurfaceWater').select('seasonality');
      var swater_mask = swater.gte(10).updateMask(swater.gte(10));
      //Flooded layer where perennial water bodies (water > 10 mo/yr) is assigned a 0 value
      var flooded_mask = difference_binary.where(swater_mask,0);
      // final flooded area without pixels in perennial waterbodies
      var flooded = flooded_mask.updateMask(flooded_mask);
      // Compute connectivity of pixels to eliminate those connected to 8 or fewer neighbours
      // This operation reduces noise of the flood extent product 
      var connections = flooded.connectedPixelCount();    
      var flooded = flooded.updateMask(connections.gte(8));
      // Mask out areas with more than 5 percent slope using a Digital Elevation Model 
      var DEM = ee.Image('WWF/HydroSHEDS/03VFDEM');
      var terrain = ee.Algorithms.Terrain(DEM);
      var slope = terrain.select('slope');
      var flooded = flooded.updateMask(slope.lt(5));
// Calculate flood extent area
// Create a raster layer containing the area information of each pixel 
var flood_pixelarea = flooded.select(polarization)
  .multiply(ee.Image.pixelArea());
// Sum the areas of flooded pixels
// default is set to 'bestEffort: true' in order to reduce compuation time, for a more 
// accurate result set bestEffort to false and increase 'maxPixels'. 
var flood_stats = flood_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(),              
  geometry: aoi,
  scale: 10, // native resolution 
  //maxPixels: 1e9,
  bestEffort: true
  });
// Convert the flood extent to hectares (area calculations are originally given in meters)  
var flood_area_ha = flood_stats.getNumber(polarization).divide(10000).round(); 
//------------------------------  DAMAGE ASSSESSMENT  ----------------------------------//
//----------------------------- Exposed population density ----------------------------//
var pop100m = ee.ImageCollection("WorldPop/GP/100m/pop").mosaic().clip(aoi);
var pop100mStatTotal = pop100m.reduceRegion({
  reducer: ee.Reducer.sum(), //sum all pixels with area information                
  geometry: aoi,
  scale: 100,
  bestEffort: true,
  }).getNumber('population').round();
//print(ee.ImageCollection("WorldPop/GP/100m/pop").first().projection())
//flooded.setDefaultProjection(collection.first().projection())
//print('dfds',flooded.projection())
var flooded_rep = flooded
      .reproject({
      crs: ee.ImageCollection("WorldPop/GP/100m/pop").first().projection(),
      scale: 100
    })
Map.addLayer(flooded_rep, {palette:"0000FF"}, 'rep flood')
var pop100m_exposed = pop100m.updateMask(flooded_rep).updateMask(pop100m);
var pop100mStatAffected = pop100m_exposed.reduceRegion({
  reducer: ee.Reducer.sum(), //sum all pixels with area information                
  geometry: aoi,
  scale: 100,
  bestEffort: true,
  }).getNumber('population').round();
print('Total Population', pop100mStatTotal, 'Population Exposed', pop100mStatAffected);
//-------------------ESRI 10m LULC MAP-----------------------//
var lulcClipped = ee.ImageCollection("projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m").mosaic().clip(aoi);
// Define a dictionary which will be used to make legend and visualize image on map
var dict = {
  "names": ["Water", "Trees", "Grass", "Flooded Vegetation", "Crops", "Scrub/Shrub", "Built Area", "Bare Ground", "Snow/Ice", "Clouds"],
  "colors": ["#1A5BAB", "#358221", "#A7D282", "#87D19E", "#FFDB5C", "#EECFA8", "#ED022A", "#EDE9E4", "#F2FAFF", "#C8C8C8"]
  };
var crop10m = lulcClipped.eq(5);
var crop10mMasked = crop10m.updateMask(crop10m);
var crop10mAffected = crop10mMasked.mask(flooded).updateMask(crop10mMasked);
var crop10mPixelArea = crop10mAffected.multiply(ee.Image.pixelArea());
var crop10mStat = crop10mPixelArea.reduceRegion({
  reducer: ee.Reducer.sum(), //sum all pixels with area information                
  geometry: aoi,
  scale: 10,
  bestEffort: true,
  });
var crop10mAreaHa = crop10mStat.getNumber('b1').divide(10000).round();
var urban10m = lulcClipped.eq(7);
var urban10mMasked = urban10m.updateMask(urban10m);
var urban10mAffected = urban10mMasked.mask(flooded).updateMask(urban10mMasked);
var urban10mPixelArea = urban10mAffected.multiply(ee.Image.pixelArea());
var urban10mStat = urban10mPixelArea.reduceRegion({
  reducer: ee.Reducer.sum(), //sum all pixels with area information                
  geometry: aoi,
  scale: 10,
  bestEffort: true,
  });
var urban10mAreaHa = urban10mStat.getNumber('b1').divide(10000).round();
//print(crop10mAreaHa,urban10mStat)
//------------------------------  DISPLAY PRODUCTS  ----------------------------------//
// Before and after flood SAR mosaic
Map.centerObject(aoi,9);
Map.addLayer(geometry, {color: 'grey'}, "Chittagong", true)
Map.addLayer(before_filtered, {min:-25,max:0}, 'Before Flood', false);
Map.addLayer(after_filtered, {min:-25,max:0}, 'After Flood', true);
// Difference layer
Map.addLayer(difference,{min:0,max:2},"Difference Layer", false);
// Flooded areas
Map.addLayer(flooded,{palette:"0000FF"},'Flooded areas');
// Add image to the map
Map.addLayer(lulcClipped, {min:1, max:10, palette:dict.colors}, 'LULC 10m', false);
Map.addLayer(crop10mAffected, {min:0, max:1, palette:['white','green']}, 'Affected Cropland', false);
Map.addLayer(urban10mAffected, {min:0, max:1, palette:['white','red']}, 'Affected Builtup Area', false);
//Total Population
var pop_vis = {
  //bands: ['population'],
  min: 0.0,
  max: 200.0,
  palette: ['24126c', '1fff4f', 'd4ff50']
};
Map.addLayer(pop100m, pop_vis, 'Population 100m', false);
// Exposed Population
var populationExposedVis = {
  min: 0,
  max: 200.0,
  palette: ['24126c', '1fff4f', 'd4ff50'],
};
Map.addLayer(pop100m_exposed, populationExposedVis, 'Population Affected');
//------------------------------------- EXPORTS ------------------------------------//
// Export flooded area as TIFF file 
Export.image.toDrive({
  image: flooded, 
  description: 'Flood_extent_raster',
  fileNamePrefix: 'flooded',
  region: aoi, 
  maxPixels: 1e13
});
// Export flooded area as shapefile (for further analysis in e.g. QGIS)
// Convert flood raster to polygons
var flooded_vec = flooded.reduceToVectors({
  scale: 10,
  geometryType:'polygon',
  geometry: aoi,
  eightConnected: false,
  bestEffort:true,
  tileScale:2,
});
// Export flood polygons as shape-file
Export.table.toDrive({
  collection:flooded_vec,
  description:'Flood_extent_vector',
  fileFormat:'SHP',
  fileNamePrefix:'flooded_vec'
});
//---------------------------------- MAP PRODUCTION --------------------------------//
//-------------------------- Display the results on the map -----------------------//
// set position of panel where the results will be displayed 
var results = ui.Panel({
  style: {
    //position: 'bottom-left',
    padding: '8px 15px',
    width: '350px'
  }
});
//Prepare the visualtization parameters of the labels 
var textVis = {
  'margin':'0px 8px 2px 0px',
  'fontWeight':'bold'
  };
var numberVIS = {
  'margin':'0px 0px 15px 0px', 
  'color':'red',
  'fontWeight':'bold'
  };
var subTextVis = {
  'margin':'0px 0px 2px 0px',
  'fontSize':'12px',
  'color':'grey'
  };
var titleTextVis = {
  'margin':'0px 0px 15px 0px',
  'fontSize': '18px', 
  'font-weight':'bold', 
  'color': 'bf0f19'
  };
// Create lables of the results 
// Titel and time period
var title = ui.Label('Ex-Post Flood Damage Assessment', titleTextVis);
var text0 = ui.Label('Region of Interest (ROI) Area:',textVis);
var number0 = ui.Label('Please wait...',numberVIS);
geometryArea.evaluate(function(val){number0.setValue(val+' km2')}),numberVIS;
var text00 = ui.Label('Region of Interest (ROI) Population:',textVis);
var number00 = ui.Label('Please wait...',numberVIS);
pop100mStatTotal.evaluate(function(val){number00.setValue(val)}),numberVIS;
var text1 = ui.Label('Flood event between:',textVis);
var number1 = ui.Label(after_start.concat(" and ",after_end),numberVIS);
// Estimated flood extent 
var text2 = ui.Label('Estimated flood extent:',textVis);
var text2_2 = ui.Label('Please wait...',subTextVis);
dates(after_collection).evaluate(function(val){text2_2.setValue('based on Senintel-1 imagery '+val)});
var number2 = ui.Label('Please wait...',numberVIS); 
flood_area_ha.evaluate(function(val){number2.setValue(val+' hectares')}),numberVIS;
// Estimated number of exposed people
var text3 = ui.Label('Estimated number of affected people: ',textVis);
var text3_2 = ui.Label('based on WorldPop Global Project Population Data in 2020 (100m)',subTextVis);
var number3 = ui.Label('Please wait...',numberVIS);
pop100mStatAffected.evaluate(function(val){number3.setValue(val)}),numberVIS;
// Estimated area of affected cropland 
var text4 = ui.Label('Estimated affected cropland:',textVis);
var text4_2 = ui.Label('based on ESRI LULC Land Cover (10m) of year 2020', subTextVis)
var number4 = ui.Label('Please wait...',numberVIS);
crop10mAreaHa.evaluate(function(val){number4.setValue(val+' hectares')}),numberVIS;
// Estimated area of affected urban
var text5 = ui.Label('Estimated affected builtup areas:',textVis);
var text5_2 = ui.Label('based on ESRI LULC Land Cover (10m) of year 2020', subTextVis);
var number5 = ui.Label('Please wait...',numberVIS);
urban10mAreaHa.evaluate(function(val){number5.setValue(val+' hectares')}),numberVIS;
// Disclaimer
var text6 = ui.Label('Developed in Google Earth Engine',subTextVis)
// Produced by...
var text7 = ui.Label('Script by: Md Manzur Rahman', subTextVis)
// Add the labels to the panel 
results.add(ui.Panel([
        title, text0, number0, text00, number00, text1, number1, text2, text2_2, number2, text3, text3_2, number3, 
        text4, text4_2, number4, text5, text5_2, number5, text6, text7
        ]));
//----------------------------- Display legend on the map --------------------------//
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
  }
});
// Function to generate the legend
function addCategoricalLegend(panel, dict, title) {
  // Create and add the legend title.
  var legendTitle = ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
    }
  });
  panel.add(legendTitle);
  var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
  panel.add(loading);
  // Creates and styles 1 row of the legend.
  var makeRow = function(color, name) {
    // Create the label that is actually the colored box.
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
        // Use padding to give the box height and width.
        padding: '8px',
        margin: '0 0 4px 0'
      }
    });
    // Create the label filled with the description text.
    var description = ui.Label({
      value: name,
      style: {margin: '0 0 4px 6px'}
    });
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
  };
  // Get the list of palette colors and class names from the image.
  var palette = dict['colors'];
  var names = dict['names'];
  loading.style().set('shown', false);
  for (var i = 0; i < names.length; i++) {
    panel.add(makeRow(palette[i], names[i]));
  }
  //Map.add(panel);
}
// Add the legend to the map
addCategoricalLegend(legend, dict, 'ESRI 2020 LULC Classes');
// Create second legend title to display exposed population density
var legendTitle2 = ui.Label({
value: 'WorldPop Population density',
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
    }
});
// Add second title to the panel
legend.add(legendTitle2);
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((populationExposedVis.max-populationExposedVis.min)/100.0).add(populationExposedVis.min);
var legendImage = gradient.visualize(populationExposedVis);
// create text on top of legend
var panel = ui.Panel({
  widgets: [
  ui.Label('> '.concat(populationExposedVis['max']))
  ],
  });
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x50'},
style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
  widgets: [
  ui.Label(populationExposedVis['min'])
  ],
  });
legend.add(panel);
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
// Add the panel to the map 
//Map.add(results);
ui.root.add(results);