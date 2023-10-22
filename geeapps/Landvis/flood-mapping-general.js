var geometry = ui.import && ui.import("geometry", "table", {
      "id": "projects/ee-landvis/assets/Pakistan"
    }) || ee.FeatureCollection("projects/ee-landvis/assets/Pakistan");
// Compute Normalized Difference Vegetation Index over S2-L2 product.
// NDVI = (NIR - RED) / (NIR + RED), where
// RED is B4, 664.5 nm
// NIR is B8, 835.1 nm
// Access your boundary-defining geometry
/*var geometry = ee.FeatureCollection("FAO/GAUL/2015/level0")
                  .filter(ee.Filter.eq('ADM0_NAME', 'Lebanon')); //filter for entry that equals the UN country name 'Lebanon'*/
// Access the Sentinel-2 Level-2A data and filter it for  the images of the year 2022 that lie within the geometries boundaries. Keep only the relevant bands and filter for cloud coverage.
var s2a = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterBounds(geometry)
                  .filterDate('2021-06-01', '2021-07-30')
                  .select('B1','B2','B3','B4','B5','B6','B7','B8','B8A','B9','B11','B12')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10));
//Print your ImageCollection to your console tab to inspect it
//print(s2a, 'Image Pakistan June 2022');
//Map.centerObject(s2a,9)
//Step 3: Create a single Image by reducing by Median and clip it to the extent of the geometry
var s2a_median = s2a.median()
                    .clip(geometry);
//Print your Image to your console tab to inspect it
//print(s2a_median, 'Median reduced Image Pakistan June 2022');
//Add your Image as a map layer
var visParams = {'min': 400,'max': [4000,3000,3000],   'bands':'B8,B4,B3'};
//Map.addLayer(s2a_median, visParams, 'S2 Pakistan June 2022 Median');
//Step 4: Calculate the NDVI manually: NDVI = (B8 - B4) / (B8 + B4)
/*//this can be achieved using either simple band operations, .expression or .normalizedDifference
//Variant 1: Simple band operations
var nir = s2a_median.select('B8');
var red = s2a_median.select('B4');
var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVI');
print(ndvi, 'NDVI Pakistan July 2022 V1')
// Display the result.
var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
Map.addLayer(ndvi, ndviParams, 'NDVI Pakistan June 2022 V1');
//Variant 2: .expression
var ndvi_2 = s2a_median.expression(
                      '(NIR-RED)/(NIR+RED)', {
                        'NIR' : s2a_median.select('B8'),
                        'RED' : s2a_median.select('B4')
                      })
                      .rename('NDVI');
print(ndvi_2, 'NDVI Pakistan June 2022 V2')
//Display the result
Map.addLayer(ndvi_2, ndviParams , 'NDVI Pakistan June 2022 V2');*/
//Variant 3: .normalizedDifference(NIR, RED)
//find out how .normalizedDifference works by checking Docs -> ee.Image -> normalizedDifference
var ndvi_3 = s2a_median.normalizedDifference(['B8', 'B4'])
                      .rename('NDVI');
//print(ndvi_3, 'NDVI Pakistan 2022 V3');
var thresholds = ee.Image([0.025, 0.2, 0.4, 0.6, 0.8, 1]); //Define the thresholds
var classified = ndvi_3.gt(thresholds).reduce('sum').toInt(); //Create the classified Image
print(classified, 'Classified');
//Define new visualization parameters for the classification: The values are now ranging from 0 to 7, one for each class
var classifiedParams = {min: 0, max: 6, palette: ['White', 'brown', 'burlywood', 'LimeGreen', 'ForestGreen', 'DarkGreen']};
Map.addLayer(classified, classifiedParams, 'NDVI',0);
//You can also create more complex colour palettes via hex strings.
//this color combination is taken from the Examples script Image -> Normalized Difference:
/*var palette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
//Please keep in mind that for this palette, you should set your minimum visible value to 0, as it s designed for this purpose.
//This is due to it being a gradient from brown to green tones, with a heavy focus on the green side. If we would set min: -1, NDVI = 0 would already be displayed in a dark green tone.
//You can recognize this by checking the palette-section of your layer information for ndvi_3.
// Display the input image and the NDVI derived from it.
Map.addLayer(ndvi_3, {min: 0, max: 1, palette: palette}, 'NDVI Pakistan June 2022 V3');*/
/*******************************************************************************************************************************************************************************************/
/*===========================================================================================
                       SAR-FLOOD MAPPING USING A CHANGE DETECTION APPROACH
  ===========================================================================================
  Within this script SAR Sentinel-1 is being used to generate a flood extent map. A change 
  detection approach was chosen, where a before- and after-flood event image will be compared. 
  Sentinel-1 GRD imagery is being used. Ground Range Detected imagery includes the following 
  preprocessing steps: Thermal-Noise Removal, Radiometric calibration, Terrain-correction 
  hence only a Speckle filter needs to be applied in the preprocessing.  
  ===========================================================================================
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
                                      RUN A DEMO (optional)
   If you would like to run an example of mapping a flood extent you can use the predefined 
   geometry below as well as the other predefined parameter settings. The code will take you
   to Beira, Mosambique where a cyclone caused a large coastal flooding in March 2019, 
   affecting more than 200.000 people. 
   --> Remove the comment-symbol (//) below so Earth Engine recognizes the polygon.*/
//var geometry = ee.Geometry.Polygon([[[35.53377589953368, -19.6674648789114],[34.50106105578368, -18.952058786515526],[33.63314113390868, -19.87423907259203],[34.74825343859618, -20.61123742951084]]]);
/* Now hit Run to start the demo! 
   Do not forget to delete/outcomment this geometry before creating a new one!
  :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  *******************************************************************************************
                                  SELECT YOUR OWN STUDY AREA   
   Use the polygon-tool in the top left corner of the map pane to draw the shape of your 
   study area. Single clicks add vertices, double-clicking completes the polygon.
   **CAREFUL**: Under 'Geometry Imports' (top left in map panel) uncheck the 
               geometry box, so it does not block the view on the imagery later.
  *******************************************************************************************
                                       SET TIME FRAME
   Set start and end dates of a period BEFORE the flood. Make sure it is long enough for 
   Sentinel-1 to acquire an image (repitition rate = 6 days). Adjust these parameters, if
   your ImageCollections (see Console) do not contain any elements.*/
var before_start= '2022-07-01';
var before_end='2022-07-30';
// Now set the same parameters for AFTER the flood.
var after_start='2022-08-01';
var after_end='2022-09-15';
/********************************************************************************************
                           SET SAR PARAMETERS (can be left default)*/
var polarization = "VV"; /*or 'VV' --> VH mostly is the prefered polarization for flood mapping.
                           However, it always depends on your study area, you can select 'VV' 
                           as well.*/ 
var pass_direction = "DESCENDING"; /* or 'ASCENDING'when images are being compared use only one 
                           pass direction. Consider changing this parameter, if your image 
                           collection is empty. In some areas more Ascending images exist than 
                           than descending or the other way around.*/
var difference_threshold = 1.35; /*threshodl to be applied on the difference image (after flood
                           - before flood). It has been chosen by trial and error. In case your
                           flood extent result shows many false-positive or negative signals, 
                           consider changing it! */
//var relative_orbit = 79; 
                          /*if you know the relative orbit for your study area, you can filter
                           you image collection by it here, to avoid errors caused by comparing
                           different relative orbits.*/
/********************************************************************************************
  ---->>> DO NOT EDIT THE SCRIPT PAST THIS POINT! (unless you know what you are doing) <<<---
  ------------------>>> now hit the'RUN' at the top of the script! <<<-----------------------
  -----> The final flood product will be ready for download on the right (under tasks) <-----
  ******************************************************************************************/
//---------------------------------- Translating User Inputs ------------------------------//
//------------------------------- DATA SELECTION & PREPROCESSING --------------------------//
// rename selected geometry feature 
var aoi = ee.FeatureCollection(geometry);
Map.centerObject(aoi,5);
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
/*//Extended Directional Smoothing
function eds(image) {
  // Create a list of weights for a 3x3 kernel.
  var dir1 = ee.List([[0, 0, 0], [0.5, 0, 0.5], [0, 0, 0]]);
  var dir2 = ee.List([[0, 0.5, 0], [0, 0, 0], [0, 0.5, 0]]);
  var dir3 = ee.List([[0, 0, 0.5], [0, 0, 0], [0.5, 0, 0]]);
  var dir4 = ee.List([[0.5, 0, 0], [0, 0, 0], [0, 0, 0.5]]);
  //Convolve directional kernels with the image
  var d1 = image.convolve(ee.Kernel.fixed(3, 3, dir1, -1, -1));
  var d2 = image.convolve(ee.Kernel.fixed(3, 3, dir2, -1, -1));
  var d3 = image.convolve(ee.Kernel.fixed(3, 3, dir3, -1, -1));
  var d4 = image.convolve(ee.Kernel.fixed(3, 3, dir4, -1, -1));
  //Absolute value of the difference from convolved image with original values
  var D1=(d1.subtract(image)).abs();
  var D2=(d2.subtract(image)).abs();
  var D3=(d3.subtract(image)).abs();
  var D4=(d4.subtract(image)).abs();
  //Pick min pixel value based on abs difference(first input) using reducers
  var Dd=ee.ImageCollection([[D1,d1],[D2,d2],[D3,d3],[D4,d4]]);
  var reducer =ee.Reducer.min(2);
  //Select the second input to the reducer
  var v = Dd.reduce(reducer).select('min1');
  return v;
}*/
// Apply reduce the radar speckle by smoothing  
var smoothing_radius = 600;
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
      var swater = ee.Image('JRC/GSW1_0/GlobalSurfaceWater').select('seasonality');
      var swater_mask = swater.gte(10).updateMask(swater.gte(10));
      //Flooded layer where perennial water bodies (water > 10 mo/yr) is assigned a 0 value
      var flooded_mask = difference_binary.where(swater_mask,0);
      // final flooded area without pixels in perennial waterbodies
      var flooded = flooded_mask.updateMask(flooded_mask);
      // Compute connectivity of pixels to eliminate those connected to 8 or fewer neighbours
      // This operation reduces noise of the flood extent product 
      var connections = flooded.connectedPixelCount();    
      var flooded = flooded.updateMask(connections.gte(30));
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
var flood_area_ha = flood_stats
  .getNumber(polarization)
  .divide(10000)
  .round(); 
//------------------------------  DAMAGE ASSSESSMENT  ----------------------------------//
//----------------------------- Exposed population density ----------------------------//
// Load JRC Global Human Settlement Popluation Density layer
// Resolution: 250. Number of people per cell is given.
var population_count = ee.Image('JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015').clip(aoi);
// Calculate the amount of exposed population
// get GHSL projection
var GHSLprojection = population_count.projection();
// Reproject flood layer to GHSL scale
var flooded_res1 = flooded
    .reproject({
    crs: GHSLprojection
  });
// Create a raster showing exposed population only using the resampled flood layer
var population_exposed = population_count
  .updateMask(flooded_res1)
  .updateMask(population_count);
//Sum pixel values of exposed population raster 
var stats = population_exposed.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: aoi,
  scale: 250,
  maxPixels:1e9 
});
// get number of exposed people as integer
var number_pp_exposed = stats.getNumber('population_count').round();
//----------------------------- Affected agricultural land ----------------------------//
// using MODIS Land Cover Type Yearly Global 500m
// filter image collection by the most up-to-date MODIS Land Cover product 
var LC = ee.ImageCollection('MODIS/006/MCD12Q1')
  .filterDate('2019-07-01',after_end)
  .sort('system:index',false)
  .select("LC_Type1")
  .first()
  .clip(aoi);
// Extract only cropland pixels using the classes cropland (>60%) and Cropland/Natural 
// Vegetation Mosaics: mosaics of small-scale cultivation 40-60% incl. natural vegetation
var cropmask = LC
  .eq(12)
  .or(LC.eq(14))
var cropland = LC
  .updateMask(cropmask)
// get MODIS projection
var MODISprojection = LC.projection();
// Reproject flood layer to MODIS scale
var flooded_res = flooded
    .reproject({
    crs: MODISprojection
  });
// Calculate affected cropland using the resampled flood layer
var cropland_affected = flooded_res
  .updateMask(cropland)
// get pixel area of affected cropland layer
var crop_pixelarea = cropland_affected
  .multiply(ee.Image.pixelArea()); //calcuate the area of each pixel 
// sum pixels of affected cropland layer
var crop_stats = crop_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(), //sum all pixels with area information                
  geometry: aoi,
  scale: 500,
  maxPixels: 1e9
  });
// convert area to hectares
var crop_area_ha = crop_stats
  .getNumber(polarization)
  .divide(10000)
  .round();
//-------------------------------- Affected urban area ------------------------------//
// Using the same MODIS Land Cover Product 
// Filter urban areas
var urbanmask = LC.eq(13)
var urban = LC
  .updateMask(urbanmask)
//Calculate affected urban areas using the resampled flood layer
var urban_affected = urban
  .mask(flooded_res)
  .updateMask(urban);
// get pixel area of affected urban layer
var urban_pixelarea = urban_affected
  .multiply(ee.Image.pixelArea()); //calcuate the area of each pixel 
// sum pixels of affected cropland layer
var urban_stats = urban_pixelarea.reduceRegion({
  reducer: ee.Reducer.sum(), //sum all pixels with area information                
  geometry: aoi,
  scale: 500,
  bestEffort: true,
  });
// convert area to hectares
var urban_area_ha = urban_stats
  .getNumber('LC_Type1')
  .divide(10000)
  .round();
//------------------------------  DISPLAY PRODUCTS  ----------------------------------//
// Before and after flood SAR mosaic
//Map.centerObject(aoi,5);
Map.addLayer(before_filtered, {min:-25,max:0}, 'Before Flood',0);
Map.addLayer(after_filtered, {min:-25,max:0}, 'After Flood',0);
// Difference layer
Map.addLayer(difference,{min:0,max:2},"Difference Layer",0);
// Flooded areas
Map.addLayer(flooded,{palette:"0000FF"},'Flooded areas',1);
// Population Density
var populationCountVis = {
  min: 0,
  max: 200.0,
  palette: ['060606','337663','337663','ffffff'],
};
Map.addLayer(population_count, populationCountVis, 'Population Density',0);
// Exposed Population
var populationExposedVis = {
  min: 0,
  max: 200.0,
  palette: ['yellow', 'orange', 'red'],
};
Map.addLayer(population_exposed, populationExposedVis, 'Exposed Population',0);
// MODIS Land Cover
var LCVis = {
  min: 1.0,
  max: 17.0,
  palette: [
    '05450a', '086a10', '54a708', '78d203', '009900', 'c6b044', 'dcd159',
    'dade48', 'fbff13', 'b6ff05', '27ff87', 'c24f44', 'a5a5a5', 'ff6d4c',
    '69fff8', 'f9ffa4', '1c0dff'
  ],
};
Map.addLayer(LC, LCVis, 'Land Cover',0);
// Cropland
var croplandVis = {
  min: 0,
  max: 14.0,
  palette: ['30b21c'],
};
Map.addLayer(cropland, croplandVis, 'Cropland',0)
// Affected cropland
Map.addLayer(cropland_affected, croplandVis, 'Affected Cropland',0); 
// Urban
var urbanVis = {
  min: 0,
  max: 13.0,
  palette: ['grey'],
};
Map.addLayer(urban, urbanVis, 'Urban',0)
// Affected urban
Map.addLayer(urban_affected, urbanVis, 'Affected Urban',0); 
//------------------------------------- EXPORTS ------------------------------------//
// Export flooded area as TIFF file 
Export.image.toDrive({
  image: flooded, 
  description: 'Flood_extent_raster',
  fileNamePrefix: 'flooded',
  region: aoi, 
  maxPixels: 1e10
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
// Convert affected crops raster to polygons
var cropland_flooded = cropland_affected.reduceToVectors({
  scale: 10,
  geometryType:'polygon',
  geometry: aoi,
  eightConnected: false,
  bestEffort:true,
  tileScale:2,
});
// Export flood polygons as shape-file
Export.table.toDrive({
  collection:cropland_flooded,
  description:'Flood_cropland-Effected_vector',
  fileFormat:'SHP',
  fileNamePrefix:'cropland_flooded'
});
// Export auxcillary data as shp?
// Exposed population density
Export.image.toDrive({
  image:population_exposed,
  description:'Exposed_Populuation',
  scale: 250,
  fileNamePrefix:'population_exposed',
  region: aoi,
  maxPixels:1e10
});
//---------------------------------- MAP PRODUCTION --------------------------------//
//-------------------------- Display the results on the map -----------------------//
// set position of panel where the results will be displayed 
var results = ui.Panel({
  style: {
    position: 'bottom-left',
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
  'color':'bf0f19',
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
  'font-weight':'', 
  'color': '3333ff'
  };
// Create lables of the results 
// Titel and time period
var title = ui.Label('Results', titleTextVis);
var text1 = ui.Label('Flood status between:',textVis);
var number1 = ui.Label(after_start.concat(" and ",after_end),numberVIS);
// Alternatively, print dates of the selected tiles
//var number1 = ui.Label('Please wait...',numberVIS); 
//(after_collection).evaluate(function(val){number1.setValue(val)}),numberVIS;
// Estimated flood extent 
var text2 = ui.Label('Estimated flood extent:',textVis);
var text2_2 = ui.Label('Please wait...',subTextVis);
dates(after_collection).evaluate(function(val){text2_2.setValue('based on Senintel-1 imagery '+val)});
var number2 = ui.Label('Please wait...',numberVIS); 
flood_area_ha.evaluate(function(val){number2.setValue(val+' hectares')}),numberVIS;
// Estimated number of exposed people
var text3 = ui.Label('Estimated number of exposed people: ',textVis);
var text3_2 = ui.Label('based on GHSL 2015 (250m)',subTextVis);
var number3 = ui.Label('Please wait...',numberVIS);
number_pp_exposed.evaluate(function(val){number3.setValue(val)}),numberVIS;
// Estimated area of affected cropland 
var MODIS_date = ee.String(LC.get('system:index')).slice(0,4);
var text4 = ui.Label('Estimated affected cropland:',textVis);
var text4_2 = ui.Label('Please wait', subTextVis)
MODIS_date.evaluate(function(val){text4_2.setValue('based on MODIS Land Cover '+val +' (500m)')}), subTextVis;
var number4 = ui.Label('Please wait...',numberVIS);
crop_area_ha.evaluate(function(val){number4.setValue(val+' hectares')}),numberVIS;
// Estimated area of affected urban
var text5 = ui.Label('Estimated affected urban areas:',textVis);
var text5_2 = ui.Label('Please wait', subTextVis)
MODIS_date.evaluate(function(val){text5_2.setValue('based on MODIS Land Cover '+val +' (500m)')}), subTextVis;
var number5 = ui.Label('Please wait...',numberVIS);
urban_area_ha.evaluate(function(val){number5.setValue(val+' hectares')}),numberVIS;
// Disclaimer
var text6 = ui.Label('Disclaimer: This product has been derived automatically without validation data. All geographic information has limitations due to the scale, resolution, date and interpretation of the original source materials. No liability concerning the content or the use thereof is assumed by the developer.',subTextVis)
// Produced by...
var text7 = ui.Label('Developed by: PITB, Govt of Punjab, PAK. (AUG,2022) Refrence: UN-SPIDER December 2019', subTextVis)
// Add the labels to the panel 
results.add(ui.Panel([
        title,
        text1,
        number1,
        text2,
        text2_2,
        number2,
        text3,
        text3_2,
        number3,
        text4,
        text4_2,
        number4,
        text5,
        text5_2,
        number5,
        text6,
        text7]
      ));
// Add the panel to the map 
Map.add(results);
//----------------------------- Display legend on the map --------------------------//
// Create legend (*credits to thisearthsite on Open Geo Blog: https://mygeoblog.com/2016/12/09/add-a-legend-to-to-your-gee-map/)
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
  }
});
// Create legend title
var legendTitle = ui.Label('Legend',titleTextVis);
// Add the title to the panel
legend.add(legendTitle);
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
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['#0000FF', '#30b21c', 'grey'];
// name of the legend
var names = ['potentially flooded areas','affected cropland','affected urban'];
// Add color and and names
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// Create second legend title to display exposed population density
var legendTitle2 = ui.Label({
value: 'Exposed population density',
style: {
fontWeight: 'bold',
fontSize: '15px',
margin: '10px 0 0 0',
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