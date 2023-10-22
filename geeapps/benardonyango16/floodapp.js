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
var before_start= year_before_label2;
var before_end= year_before_label3;
// Now set the same parameters for AFTER the flood.
var after_start= year_after_label2;
var after_end= year_after_label3;
/********************************************************************************************
                           SET SAR PARAMETERS (can be left default)*/
var polarization = "VH"; /*or 'VV' --> VH mostly is the prefered polarization for flood mapping.
                           However, it always depends on your study area, you can select 'VV' 
                           as well.*/ 
var pass_direction = "DESCENDING"; /* or 'ASCENDING'when images are being compared use only one 
                           pass direction. Consider changing this parameter, if your image 
                           collection is empty. In some areas more Ascending images exist than 
                           than descending or the other way around.*/
var difference_threshold = 1.25; /*threshodl to be applied on the difference image (after flood
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
var Flood_Prone = ee.FeatureCollection("users/benardonyango16/Flood_prone_districts"),
    Baardheere = ee.FeatureCollection("users/benardonyango16/Baardheere"),
    Balcad = ee.FeatureCollection("users/benardonyango16/Balcad"),
    Banadir = ee.FeatureCollection("users/benardonyango16/Banadir"),
    Baraawe = ee.FeatureCollection("users/benardonyango16/Baraawe"),
    BeletWeyne = ee.FeatureCollection("users/benardonyango16/BeletWeyne"),
    Buaale = ee.FeatureCollection("users/benardonyango16/Buaale"),
    BuloBurto = ee.FeatureCollection("users/benardonyango16/BuloBurto"),
    Cadale = ee.FeatureCollection("users/benardonyango16/Cadale"),
    Diinsoor = ee.FeatureCollection("users/benardonyango16/Diinsoor"),
    Doolow = ee.FeatureCollection("users/benardonyango16/Doolow"),
    Garbahaarey = ee.FeatureCollection("users/benardonyango16/Garbahaarey"),
    Jalalaqsi = ee.FeatureCollection("users/benardonyango16/Jalalaqsi"),
    Jamaame = ee.FeatureCollection("users/benardonyango16/Jamaame"),
    Jilib = ee.FeatureCollection("users/benardonyango16/Jilib"),
    Jowhar = ee.FeatureCollection("users/benardonyango16/Jowhar"),
    Kismaayo = ee.FeatureCollection("users/benardonyango16/Kismaayo"),
    Luuq = ee.FeatureCollection("users/benardonyango16/Luuq"),
    Marka = ee.FeatureCollection("users/benardonyango16/Marka"),
    QansaxDheere = ee.FeatureCollection("users/benardonyango16/QansaxDheere"),
    Qoryooley = ee.FeatureCollection("users/benardonyango16/Qoryooley"),
    Saakow = ee.FeatureCollection("users/benardonyango16/Saakow"),
    Sablaale = ee.FeatureCollection("users/benardonyango16/Sablaale"),
    WanlaWeyn = ee.FeatureCollection("users/benardonyango16/WanlaWeyn"),
    Afmadow = ee.FeatureCollection("users/benardonyango16/Afmadow"),
    Kurtunwaarey = ee.FeatureCollection("users/benardonyango16/Kurtunwaarey"),
    Afgooye = ee.FeatureCollection("users/benardonyango16/Afgooye");
// SET OF USER INPUTS FOR AREA OF INTEREST
// SET OF USER INPUTS FOR AREA OF INTEREST
var FLOOD_PRONE = 'Flood Prone Area',
    AFGOOYE = 'Afgooye',
    AFMADOW = 'Afmadow',
    BAARDHEERE = 'Baardheere',
    BALCAD = 'Balcad',
    BANADIR = 'Banadir',
    BARAAWE = 'Baraawe',
    BELETWEYNE = 'BeletWeyne',
    BUAALE = 'Buaale',
    BULOBURTO = 'BuloBurto',
    CADALE = 'Cadale',
    DIINSOOR = 'Diinsoor',
    DOOLOW = 'Doolow',
    GARBAHAAREY = 'Garbahaarey',
    JALALAQSI = 'Jalalaqsi',
    JAMAAME = 'Jamaame',
    JILIB = 'Jilib',
    JOWHAR = 'Jowhar',
    KISMAAYO = 'Kismaayo',
    KURTUNWAAREY = 'Kurtunwaarey',
    LUUQ = 'Luuq',
    MARKA = 'Marka',
    QANSAXDHEERE = 'QansaxDheere',
    QORYOOLEY = 'Qoryooley',
    SAAKOW = 'Saakow',
    SABLAALE = 'Sablaale',
    WANLAWEYN = 'WanlaWeyn';
// Gobal Variable, allows for functions to be applied within other functions 
var aoi,
    areaOfInterest,
    geometry,
    before_start,before_end,
    after_start,after_end;
////////////////////////////A function which sets the area of interest/////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
function applyFilter(){
function setAreaOfInterest(){
  aoi = selectAoi.getValue();
  if (aoi == FLOOD_PRONE){
      areaOfInterest = Flood_Prone;
  }//sets the area of interest to the Lassen Volcanic National Park
  else if (aoi == AFGOOYE){
      areaOfInterest = Afgooye;
  }
  else if (aoi == AFMADOW){
      areaOfInterest = Afmadow;
  }
  else if (aoi == BAARDHEERE){
      areaOfInterest = Baardheere;
  }//sets the area of interest to the Badger Planning Area
  else if (aoi == BALCAD){
      areaOfInterest = Balcad;
  }//sets the area of interest to the Lassen National Forest
  else if (aoi == BANADIR){
      areaOfInterest = Banadir;
  }//sets the area to the Study Area
  else if (aoi == BARAAWE){
      areaOfInterest = Baraawe;
  }//sets the area to the Study Area
  else if (aoi == BELETWEYNE){
      areaOfInterest = BeletWeyne;
  }//sets the area to the Study Area
  else if (aoi == BUAALE){
      areaOfInterest = Buaale;
  }
  else if (aoi == BULOBURTO){
      areaOfInterest = BuloBurto;
  }//sets the area of interest to the Badger Planning Area
  else if (aoi == CADALE){
      areaOfInterest = Cadale;
  }//sets the area of interest to the Lassen National Forest
  else if (aoi == DIINSOOR){
      areaOfInterest = Diinsoor;
  }//sets the area to the Study Area
  else if (aoi == DOOLOW){
      areaOfInterest = Doolow;
  }//sets the area to the Study Area
  else if (aoi == GARBAHAAREY){
      areaOfInterest = Garbahaarey;
  }//sets the area to the Study Area
  else if (aoi == JALALAQSI){
      areaOfInterest = Jalalaqsi;
  }
  else if (aoi == JAMAAME){
      areaOfInterest = Jamaame;
  }//sets the area of interest to the Badger Planning Area
  else if (aoi == JILIB){
      areaOfInterest = Jilib;
  }//sets the area of interest to the Lassen National Forest
  else if (aoi == JOWHAR){
      areaOfInterest = Jowhar;
  }//sets the area to the Study Area
  else if (aoi == KISMAAYO){
      areaOfInterest = Kismaayo;
  }//sets the area to the Study Area
  else if (aoi == LUUQ){
      areaOfInterest = Luuq;
  }//sets the area to the Study Area
  else if (aoi == MARKA){
      areaOfInterest = Marka;
  }
  else if (aoi == QANSAXDHEERE){
      areaOfInterest = QansaxDheere;
  }//sets the area of interest to the Badger Planning Area
  else if (aoi == QORYOOLEY){
      areaOfInterest = Qoryooley;
  }//sets the area of interest to the Lassen National Forest
  else if (aoi == SAAKOW){
      areaOfInterest = Saakow;
  }//sets the area to the Study Area
  else if (aoi == SABLAALE){
      areaOfInterest = Sablaale;
  }//sets the area to the Study Area
  else if (aoi == WANLAWEYN){
      areaOfInterest = WanlaWeyn;
  }//sets the area to the Study Area
  else if (aoi == KURTUNWAAREY){
      areaOfInterest = Kurtunwaarey;
  }//sets the area to the Study Area
  // var geometry = ee.Feature(areaOfInterest)
  // print(geometry)
}
setAreaOfInterest();
print(areaOfInterest);
geometry = areaOfInterest
before_start = before_1.getValue(); //Input for Landsat Binary Map
before_end = before_2.getValue(); //Input for Landsat Change Map Start Year
after_start = after_1.getValue(); //Input for Landsat Binary Map
after_end = after_2.getValue(); //Input for Landsat Change Map Start Year
/////////////
// rename selected geometry feature 
//var aoi = ee.FeatureCollection(geometry);
// Load and filter Sentinel-1 GRD data by predefined parameters 
var collection= ee.ImageCollection('COPERNICUS/S1_GRD')
  .filter(ee.Filter.eq('instrumentMode','IW'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', polarization))
  .filter(ee.Filter.eq('orbitProperties_pass',pass_direction)) 
  .filter(ee.Filter.eq('resolution_meters',10))
  //.filter(ee.Filter.eq('relativeOrbitNumber_start',relative_orbit ))
  .filterBounds(geometry)
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
var before = before_collection.mosaic().clip(geometry);
var after = after_collection.mosaic().clip(geometry);
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
  geometry: geometry,
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
var population_count = ee.Image('JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015').clip(geometry);
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
  geometry: geometry,
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
  .clip(geometry);
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
  geometry: geometry,
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
  geometry: geometry,
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
Map.centerObject(geometry,8);
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
//------------------------------------- EXPORTS ------------------------------------//
// Export flooded area as TIFF file 
Export.image.toDrive({
  image: flooded, 
  description: 'Flood_extent_raster',
  fileNamePrefix: 'flooded',
  region: geometry, 
  maxPixels: 1e10
});
// Export flooded area as shapefile (for further analysis in e.g. QGIS)
// Convert flood raster to polygons
var flooded_vec = flooded.reduceToVectors({
  scale: 10,
  geometryType:'polygon',
  geometry: geometry,
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
  region: geometry,
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
//dates(after_collection).evaluate(function(val){text2_2.setValue('based on Senintel-1 imagery '+val)});
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
var text6 = ui.Label('Disclaimer: This product has been derived automatically without validation data. All geographic information has limitations due to the scale, resolution, date and interpretation of the original source materials. No liability concerning the content or the use thereof is assumed by the producer.',subTextVis)
// Produced by...
var text7 = ui.Label('Script produced by: UN-SPIDER December 2019', subTextVis)
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
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// WIDGET PANEL ///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Spacer object//
var spacer = ui.Label('           ');
/* Create UI Panels */
var panel = ui.Panel({style: {width:'33.333%'}});
ui.root.insert(0,panel);
/* Introduction */ 
var intro = ui.Label('FLOOD EXTRACTION APPLICATION ', 
  {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
);
var subtitle = ui.Label(' This app allows a user to visualize the flooded area within'+
  ' the flood prone area in the Southern part of Somalia. It uses Sentinel 1'+
  ' and it allows a user to select an area of interest, before floods period and'+
  ' after floods period. On the background, the script does an image'+
  ' difference between the two periods selected and assumes that whatever has'+
  ' changed between the two periods is the addition of floods. Additional information'+
  ' such as urban areas, population and crop lands affected is also added to the panel.', {});
panel.add(intro).add(subtitle);
////////////////////SELECT AREA OF INTEREST//////////////////////////////
////////////////////////////////////////////////////////////////////////
//SELECT BUTTONS FOR AOI
var selectAoi = ui.Select({
  items:[FLOOD_PRONE,AFGOOYE,AFMADOW,BAARDHEERE,BALCAD,BANADIR,BARAAWE,BELETWEYNE,
 BUAALE,BULOBURTO,CADALE, DIINSOOR,DOOLOW,GARBAHAAREY,JALALAQSI,JAMAAME,JILIB,
 JOWHAR,KISMAAYO,KURTUNWAAREY,LUUQ,MARKA,QANSAXDHEERE,QORYOOLEY,SAAKOW,SABLAALE,WANLAWEYN,
 ],
  placeholder:'Select area of interest',
  //value: 'Select area of interest',//Default
  //onChange: addOwnAOI
  }); 
var selectSIAOI = ui.Label({value:'Select area of interest',
style: {fontSize: '18px', fontWeight: 'bold'}});
var SIAOIpanel = ui.Panel(); 
SIAOIpanel.add(selectSIAOI)
          .add(ui.Panel([selectAoi]), ui.Panel.Layout.flow('horizontal'));
panel.add(SIAOIpanel);
///selecting year panel
// Define the textbox for the 1st and 2nd year
var before_1 = ui.Textbox({placeholder: 'Year',  value: '2020-03-01',
  style: {width: '100px'}});
var before_2 = ui.Textbox({placeholder: 'Year',  value: '2020-03-31',
  style: {width: '100px'}});
var after_1 = ui.Textbox({placeholder: 'Year',  value: '2020-04-01',
  style: {width: '100px'}});
var after_2 = ui.Textbox({placeholder: 'Year',  value: '2020-04-30',
  style: {width: '100px'}});
// define the labels needed for GUI
var year_before_panel = ui.Label({
  value:'Select Period Before Floods',
  style:{fontSize: '18px', fontWeight: 'bold'}});
var year_before_label2 = ui.Label('Start Date(YYYY-MM-DD)           ',
  {margin: '0 0 0 10px',fontSize: '12px',color: 'gray'});
var year_before_label3 = ui.Label('End Date(YYYY-MM-DD)      ',
  {margin: '0 0 0 10px',fontSize: '12px',color: 'gray'});
var year_after_panel = ui.Label({
  value:'Select Period During Floods',
  style:{fontSize: '18px', fontWeight: 'bold'}});
var year_after_label2 = ui.Label('Start Date (YYYY-MM-DD)           ',
  {margin: '0 0 0 10px',fontSize: '12px',color: 'gray'});
var year_after_label3 = ui.Label('End Date (YYYY-MM-DD)     ',
  {margin: '0 0 0 10px',fontSize: '12px',color: 'gray'});
panel.add(year_before_panel)
  .add(ui.Panel([year_before_label2, year_before_label3],ui.Panel.Layout.flow('horizontal')))
  .add(ui.Panel([before_1, before_2],ui.Panel.Layout.flow('horizontal')));
panel.add(year_after_panel)
  .add(ui.Panel([year_after_label2, year_after_label3],ui.Panel.Layout.flow('horizontal')))
  .add(ui.Panel([after_1, after_2],ui.Panel.Layout.flow('horizontal')));
//////create function and button for creating the map and running the results
function CALCULATEFLOODS (){
    applyFilter(); 
}
// Create a button that will run the function that creates the NDVI binary object
var FLOODMAP = ui.Button({label:'Calculate' , onClick:CALCULATEFLOODS});
// Add Button to the map.
panel.add(FLOODMAP);
var resetButton = ui.Button('Reset Map', reset);
panel.add(resetButton);
/*
Reset Map
*/
function reset(){
  Map.clear();
}