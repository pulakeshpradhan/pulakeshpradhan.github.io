var geometry = ui.import && ui.import("geometry", "table", {
      "id": "users/syukrealworld/DesaDIY"
    }) || ee.FeatureCollection("users/syukrealworld/DesaDIY"),
    kecamatan = ui.import && ui.import("kecamatan", "table", {
      "id": "users/syukrealworld/Kecamatan"
    }) || ee.FeatureCollection("users/syukrealworld/Kecamatan");
// Atur parameter yang SEBELUM banjir.
var before_start= '2019-02-01';
var before_end='2019-03-16';
// Atur parameter yang sama untuk SETELAH banjir.
var after_start='2019-03-17';
var after_end='2019-03-28';
/********************************************************************************************
                           SET SAR PARAMETERS (can be left default)*/
var polarization = "VH"; 
var pass_direction = "DESCENDING";
var difference_threshold = 1.21; /* Original=1.25*/
//var relative_orbit = 79; 
                          /*if you know the relative orbit for your study area, you can filter
                           you image collection by it here, to avoid errors caused by comparing
                           different relative orbits.*/
//------------------------------- PEMILIHAN & PEMROSESAN DATA --------------------------//
// Area of Interest
var aoi = ee.FeatureCollection(geometry);
// Muat dan filter data Sentinel-1 GRD dengan parameter yang telah ditentukan sebelumnya 
var collection= ee.ImageCollection('COPERNICUS/S1_GRD')
  .filter(ee.Filter.eq('instrumentMode','IW'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', polarization))
  .filter(ee.Filter.eq('orbitProperties_pass',pass_direction)) 
  .filter(ee.Filter.eq('resolution_meters',10))
  //.filter(ee.Filter.eq('relativeOrbitNumber_start',relative_orbit ))
  .filterBounds(aoi)
  .select(polarization);
// Pilih gambar berdasarkan tanggal yang telah ditentukan
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
      var swater = ee.Image('JRC/GSW1_0/GlobalSurfaceWater').select('seasonality');
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
  .filterDate('2014-01-01',after_end)
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
Map.centerObject(aoi,10);
Map.addLayer(before_filtered, {min:-25,max:0}, 'Before Flood',0);
Map.addLayer(after_filtered, {min:-25,max:0}, 'After Flood',1);
// Difference layer
Map.addLayer(difference,{min:0,max:2},"Difference Layer",0);
// Flooded areas
Map.addLayer(flooded,{palette:"0000FF"},'Flooded areas');
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
Map.addLayer(population_exposed, populationExposedVis, 'Exposed Population');
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
Map.addLayer(cropland_affected, croplandVis, 'Affected Cropland'); 
// Urban
var urbanVis = {
  min: 0,
  max: 13.0,
  palette: ['grey'],
};
Map.addLayer(urban, urbanVis, 'Urban',0)
// Affected urban
Map.addLayer(urban_affected, urbanVis, 'Affected Urban'); 
// Village DIY
//Map.addLayer(geometry,{},'Desa'); 
// District DIY
Map.addLayer(kecamatan,{},'Kecamatan',0); 
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
var title = ui.Label('Prediksi dampak Banjir terhadap Pertanian di Yogyakarta', titleTextVis);
var text1 = ui.Label('Status banjir antara:',textVis);
var number1 = ui.Label(after_start.concat(" dan ",after_end),numberVIS);
// Alternatively, print dates of the selected tiles
//var number1 = ui.Label('Please wait...',numberVIS); 
//(after_collection).evaluate(function(val){number1.setValue(val)}),numberVIS;
// Estimated flood extent 
var text2 = ui.Label('Perkiraan luas banjir:',textVis);
var text2_2 = ui.Label('Mohon tunggu...',subTextVis);
dates(after_collection).evaluate(function(val){text2_2.setValue('berdasarkan Sentinel-1 imagery '+val)});
var number2 = ui.Label('Mohon tunggu...',numberVIS); 
flood_area_ha.evaluate(function(val){number2.setValue(val+' hectares')}),numberVIS;
// Estimated number of exposed people
var text3 = ui.Label('Perkiraan jumlah orang yang terpapar: ',textVis);
var text3_2 = ui.Label('berdasarkan GHSL 2015 (250m)',subTextVis);
var number3 = ui.Label('Mohon tunggu...',numberVIS);
number_pp_exposed.evaluate(function(val){number3.setValue(val)}),numberVIS;
// Estimated area of affected cropland 
var MODIS_date = ee.String(LC.get('system:index')).slice(0,4);
var text4 = ui.Label('Perkiraan lahan pertanian yang terkena dampak:',textVis);
var text4_2 = ui.Label('Mohon tunggu', subTextVis)
MODIS_date.evaluate(function(val){text4_2.setValue('berdasarkan Tutupan Lahan MODIS '+val +' (500m)')}), subTextVis;
var number4 = ui.Label('Mohon tunggu...',numberVIS);
crop_area_ha.evaluate(function(val){number4.setValue(val+' hectares')}),numberVIS;
// Estimated area of affected urban
var text5 = ui.Label('Perkiraan wilayah perkotaan yang terkena dampak:',textVis);
var text5_2 = ui.Label('Mohon tunggu', subTextVis)
MODIS_date.evaluate(function(val){text5_2.setValue('berdasarkan Tutupan Lahan MODIS'+val +' (500m)')}), subTextVis;
var number5 = ui.Label('Mohon tunggu...',numberVIS);
urban_area_ha.evaluate(function(val){number5.setValue(val+' hectares')}),numberVIS;
// Disclaimer
var text6 = ui.Label('Catatan: Output peta ini diproduksi secara otomatis tanpa proses validasi. Semua informasi geografis memiliki keterbatasan karena skala, resolusi, tanggal dan interpretasi dari sumber bahan aslinya. Aplikasi ini dibuat sebagai prototype dan keperluan simulasi dan penelitian gamifikasi.',subTextVis)
// Produced by...
var text7 = ui.Label('Aplikasi ini merupakan pengembangan dari UN-SPIDER (2019). Saran dan masukan dapat disampaikan ke syukrealworld@gmail.com', subTextVis)
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
var names = ['Daerah berpotensi banjir','Lahan pertanian yang terkena dampak','Perumahan yang terkena dampak'];
// Add color and and names
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// Create second legend title to display exposed population density
var legendTitle2 = ui.Label({
value: 'Kepadatan penduduk yang terpapar',
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