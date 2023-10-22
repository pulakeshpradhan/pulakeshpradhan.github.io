/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[87.49616158131491, 23.233539494679043],
                  [87.49616158131491, 21.503947263769387],
                  [89.30341255787741, 21.503947263769387],
                  [89.30341255787741, 23.233539494679043]]], null, false),
            {
              "system:index": "0"
            })]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
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
var before_start= '2021-02-01';
var before_end='2021-02-20';
// Now set the same parameters for AFTER the flood.
var after_start='2021-05-26';
var after_end='2021-05-29';
/********************************************************************************************
                           SET SAR PARAMETERS (can be left default)*/
var polarization = "VV"; /*or 'VV' --> VH mostly is the prefered polarization for flood mapping.
                           However, it always depends on your study area, you can select 'VV' 
                           as well.*/ 
var pass_direction = "ASCENDING"; /* or 'ASCENDING'when images are being compared use only one 
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
//------------------------------  DISPLAY PRODUCTS  ----------------------------------//
// Before and after flood SAR mosaic
var shown = true; // true or false, 1 or 0 
var opacity = 0.1; // number [0-1]
var nameLayer = 'map'; // string
var visParams = {color: 'red'}; // dictionary: 
//Map.addLayer(geometry,visParams, nameLayer, shown, opacity)
// set styling
var styling = {color: 'red', fillColor: '00000000'};
Map.addLayer(geometry.style(styling))
//Map.addLayer(before_filtered, {min:-25,max:0}, 'Before Flood',0);
//Map.addLayer(after_filtered, {min:-25,max:0}, 'After Flood',1);
// Difference layer
//Map.addLayer(difference,{min:0,max:2},"Difference Layer",0);
// Flooded areas
Map.addLayer(flooded,{palette:"0000FF"},'Flooded areas');
Map.setCenter(88.1189, 21.7944,11)
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
var legendTitle = ui.Label({
  value: 'Visualization of Flooded Areas in West Bengal due to Yash Cyclone (26th May, 2021)',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
// var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
// legend.add(loading);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
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
legend.add(makeRow("0000FF", "Flood Affected Area"));
var textVis = {
  'margin':'0px 8px 2px 0px',
  'fontWeight':'bold'
  };
var results = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    width: '310px'
  }
});
var text7 = ui.Label('Developed by Souvik Sankar Mitra Research Scientist, Geoinformatics Department, Indian Institute of Remote Sensing', textVis)
results.add(ui.Panel([text7]
      ));
Map.add(results); 
Map.add(legend);