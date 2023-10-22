var geometry = ui.import && ui.import("geometry", "table", {
      "id": "users/jkessel55/Kincade_Boundary_GEE"
    }) || ee.FeatureCollection("users/jkessel55/Kincade_Boundary_GEE");
//==============================================================================
//
// SPLIT PANEL dNBR COMPARISION SCRIPT FOR GEE APP
//
//==============================================================================
// Link to GEE app: 
// https://jkessel55.users.earthengine.app/view/ ->
//         kincadefirepost-firelandscaperecovery
// MODIFIED by JOHN KESSEL from UN-SPIDER and GOOGLE EARTH ENGINE WIDGET GUIDE  
// for 2019 SONOMA COUNTY CA 2019 KINCADE FIRE STUDY AREA (written on 2/19/22)
//==============================================================================
//             BURN SEVERITY MAPPING USING THE NORMALIZED BURN RATIO (NBR)
//==============================================================================
// Normalized Burn Ratio will be applied to imagery from before and after a wild
// fire. By calculating the difference afterwards (dNBR) Burn Severity is 
// derived, showing the spatial impact of the disturbance. Imagery used in this 
// process comes from either Landsat 8 or Sentinel-2.
//==============================================================================
//******************************************************************************
//                             UPLOAD STUDY AREA POLYGON  
//
// Upload polygon in the upper left corner of the GEE IDE under Assests Tab and 
// New button.  Make sure yhe geometry has been fixed if necessary (use 
// fix geometry tool in QGIS). Using the side arrow icon, add the polygon table 
// to the top of the console.  At the top of the console, make sure the Imports 
// is selected to the uploaded polygon and that it reads:
//         "var geometry: Table users/username/filename" 
// (note: the word gemetry is what needs to be correct so that the file will be 
// read later in the script)
//
//******************************************************************************
//               MAP 1 (LEFT SIDE MAP): SET TIME FRAME
// IDENTIFY MAP 1: 2019 Kincade Fire 18 Months Post-Fire dNBR
// Set start and end dates of a period BEFORE the fire. Make sure it is long enough for 
// Sentinel-2 to acquire an image (repitition rate = 5 days). Adjust these parameters, if
// your ImageCollections (see Console) do not contain any elements.
var prefire_start = '2019-04-01';   
var prefire_end = '2019-04-30';
// Now set the same parameters for AFTER the fire.
var postfire_start = '2021-04-01';
var postfire_end = '2021-04-30';
//******************************************************************************
//               MAP 2 (RIGHT SIDE MAP): SET TIME FRAME
// IDENTIFIED MAP 2: 2019 Kincade Fire 6 Months Post-Fire dNBR
// Set start and end dates of a period BEFORE the fire. Make sure it is long enough for 
// Sentinel-2 to acquire an image (repitition rate = 5 days). Adjust these parameters, if
// your ImageCollections (see Console) do not contain any elements.
var prefire_start2 = '2019-04-01';   
var prefire_end2 = '2019-04-30';
// Now set the same parameters for AFTER the fire.
var postfire_start2 = '2020-04-01';
var postfire_end2 = '2020-04-30';
//******************************************************************************
//                            SELECT A SATELLITE PLATFORM
// You can select remote sensing imagery from two availible satellite sensors. 
// Consider details of each mission below to choose the data suitable for your needs.
// Landsat 8                             |  Sentinel-2 (A&B)
//------------------------------------------------------------------------------
// launched:        February 11th, 2015  |  June 23rd, 2015 & March 7th, 2017
// repitition rate: 16 days              |  5 day (since 2017)
// resolution:      30 meters            |  10 meters 
// advantages:      longer time series   |  9 times higher spatial detail
//                  smaller export file  |  higher chance of cloud-free images
// SELECT one of the following:   'L8'  or 'S2' 
var platform = 'L8';               // <--- assign your choice to the platform variable
//******************************************************************************
//---------------------------- Translating User Inputs -------------------------
// Print Satellite platform and dates to console
if (platform == 'S2' | platform == 's2') {
  var ImCol = 'COPERNICUS/S2';
  var pl = 'Sentinel-2';
} else {
  var ImCol = 'LANDSAT/LC08/C01/T1_SR';
  var pl = 'Landsat 8';
}
print(ee.String('Data selected for analysis: ').cat(pl));
print(ee.String('Fire incident occurred between ').cat(prefire_end).cat(' and ').cat(postfire_start));
// Location
var area = ee.FeatureCollection(geometry);
// Set study area as map center.
Map.centerObject(area);
//------------------ Select Landsat imagery by time and location ---------------
var imagery = ee.ImageCollection(ImCol);
// In the following lines imagery will be collected in an ImageCollection, depending on the
// location of our study area, a given time frame and the ratio of cloud cover.
var prefireImCol = ee.ImageCollection(imagery
    // Filter by dates.
    .filterDate(prefire_start, prefire_end)
    // Filter by location.
    .filterBounds(area));
// Select all images that overlap with the study area from a given time frame 
var postfireImCol = ee.ImageCollection(imagery
    // Filter by dates.
    .filterDate(postfire_start, postfire_end)
    // Filter by location.
    .filterBounds(area));
// Add the clipped images to the console on the right
print("Pre-fire Image Collection: ", prefireImCol); 
print("Post-fire Image Collection: ", postfireImCol);
//------------------------- Apply a cloud and snow mask ------------------------
// Function to mask clouds from the pixel quality band of Sentinel-2 SR data.
function maskS2sr(image) {
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = ee.Number(2).pow(10).int();
  var cirrusBitMask = ee.Number(2).pow(11).int();
  // Get the pixel QA band.
  var qa = image.select('QA60');
  // All flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked image, scaled to TOA reflectance, without the QA bands.
  return image.updateMask(mask)
      .copyProperties(image, ["system:time_start"]);
}
// Function to mask clouds from the pixel quality band of Landsat 8 SR data.
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  var snowBitMask = 1 << 4;
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // All flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0))
      .and(qa.bitwiseAnd(snowBitMask).eq(0));
  // Return the masked image, scaled to TOA reflectance, without the QA bands.
  return image.updateMask(mask)
      .select("B[0-9]*")
      .copyProperties(image, ["system:time_start"]);
}
// Apply platform-specific cloud mask
if (platform == 'S2' | platform == 's2') {
  var prefire_CM_ImCol = prefireImCol.map(maskS2sr);
  var postfire_CM_ImCol = postfireImCol.map(maskS2sr);
} else {
  var prefire_CM_ImCol = prefireImCol.map(maskL8sr);
  var postfire_CM_ImCol = postfireImCol.map(maskL8sr);
}
//----------------- Mosaic and clip images to study area -----------------------
// This is especially important, if the collections created above contain more than one image
// (if it is only one, the mosaic() does not affect the imagery).
var pre_mos = prefireImCol.mosaic().clip(area);
var post_mos = postfireImCol.mosaic().clip(area);
var pre_cm_mos = prefire_CM_ImCol.mosaic().clip(area);
var post_cm_mos = postfire_CM_ImCol.mosaic().clip(area);
// Add the clipped images to the console on the right
print("Pre-fire True Color Image: ", pre_mos); 
print("Post-fire True Color Image: ", post_mos);
//--------------- Calculate NBR for pre- and post-fire images ------------------
// Apply platform-specific NBR = (NIR-SWIR2) / (NIR+SWIR2)
if (platform == 'S2' | platform == 's2') {
  var preNBR = pre_cm_mos.normalizedDifference(['B8', 'B12']);
  var postNBR = post_cm_mos.normalizedDifference(['B8', 'B12']);
} else {
  var preNBR = pre_cm_mos.normalizedDifference(['B5', 'B7']);
  var postNBR = post_cm_mos.normalizedDifference(['B5', 'B7']);
}
// Add the NBR images to the console on the right
print("Pre-fire Normalized Burn Ratio: ", preNBR); 
print("Post-fire Normalized Burn Ratio: ", postNBR);
//--------- Calculate difference between pre- and post-fire images -------------
// The result is called delta NBR or dNBR
var dNBR_unscaled = preNBR.subtract(postNBR);
// Scale product to USGS standards
var dNBR = dNBR_unscaled.multiply(1000);
// Add the difference image to the console on the right
print("Difference Normalized Burn Ratio: ", dNBR);
//---------------------------- True Color Imagery ------------------------------
// Apply platform-specific visualization parameters for true color images
if (platform == 'S2' | platform == 's2') {
  var vis = {bands: ['B4', 'B3', 'B2'], max: 2000, gamma: 1.5};
} else {
  var vis = {bands: ['B4', 'B3', 'B2'], min: 0, max: 4000, gamma: 1.5};
}
//------------------- Burn Ratio Product - Classification ----------------------
// Define an SLD style of discrete intervals to apply to the image.
var sld_intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#ffffff" quantity="-500" label="-500"/>' +
      '<ColorMapEntry color="#7a8737" quantity="-250" label="-250" />' +
      '<ColorMapEntry color="#acbe4d" quantity="-100" label="-100" />' +
      '<ColorMapEntry color="#0ae042" quantity="100" label="100" />' +
      '<ColorMapEntry color="#fff70b" quantity="270" label="270" />' +
      '<ColorMapEntry color="#ffaf38" quantity="440" label="440" />' +
      '<ColorMapEntry color="#ff641b" quantity="660" label="660" />' +
      '<ColorMapEntry color="#a41fd6" quantity="2000" label="2000" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
//==============================================================================
//                                    ADD A LEGEND
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }});
// Create legend title
var legendTitle = ui.Label({
  value: '2019 Kincade Fire dNBR',
  style: {fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }});
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
//  Palette with the colors (must match number of lables)
var palette =['ffffff', 'ffffff','7a8737', 'acbe4d', '0ae042', 'fff70b', 'ffaf38', 'ff641b', 'a41fd6', 'ffffff'];
// name of the legend (must match number of colors)
var names = ['6 Months Post-Fire (1st Spring)', '18 Months Post-Fire (2nd Spring)','Enhanced Regrowth, High','Enhanced Regrowth, Low','Unburned', 'Low Severity',
'Moderate-low Severity', 'Moderate-high Severity', 'High Severity', 'N/A'];
// Add color and and names
for (var i = 0; i < 10; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
//==============================================================================
//
// MAP 2: 6 Months Post-Fire (note: each variable has "2" added to the variable name to 
// distinguish it from map 1)
//
//---------------------------- Translating User Inputs -------------------------
// Print Satellite platform and dates to console
if (platform == 'S2' | platform == 's2') {
  var ImCol = 'COPERNICUS/S2';
  var pl = 'Sentinel-2';
} else {
  var ImCol = 'LANDSAT/LC08/C01/T1_SR';
  var pl = 'Landsat 8';
}
print(ee.String('Data selected for analysis: ').cat(pl));
print(ee.String('Fire incident occurred between ').cat(prefire_end2).cat(' and ').cat(postfire_start2));
// Location
var area2 = ee.FeatureCollection(geometry);
// Set study area as map center.
Map.centerObject(area2);
//----------------- Select Landsat imagery by time and location ----------------
var imagery = ee.ImageCollection(ImCol);
// In the following lines imagery will be collected in an ImageCollection, depending on the
// location of our study area, a given time frame and the ratio of cloud cover.
var prefireImCol2 = ee.ImageCollection(imagery
    // Filter by dates.
    .filterDate(prefire_start2, prefire_end2)
    // Filter by location.
    .filterBounds(area));
// Select all images that overlap with the study area from a given time frame 
// As a post-fire state we select the 25th of February 2017
var postfireImCol2 = ee.ImageCollection(imagery
    // Filter by dates.
    .filterDate(postfire_start2, postfire_end2)
    // Filter by location.
    .filterBounds(area));
// Add the clipped images to the console on the right
print("Pre-fire Image Collection: ", prefireImCol2); 
print("Post-fire Image Collection: ", postfireImCol2);
//------------------------- Apply a cloud and snow mask ------------------------
// Function to mask clouds from the pixel quality band of Sentinel-2 SR data.
function maskS2sr(image) {
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = ee.Number(2).pow(10).int();
  var cirrusBitMask = ee.Number(2).pow(11).int();
  // Get the pixel QA band.
  var qa = image.select('QA60');
  // All flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked image, scaled to TOA reflectance, without the QA bands.
  return image.updateMask(mask)
      .copyProperties(image, ["system:time_start"]);
}
// Function to mask clouds from the pixel quality band of Landsat 8 SR data.
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  var snowBitMask = 1 << 4;
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // All flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0))
      .and(qa.bitwiseAnd(snowBitMask).eq(0));
  // Return the masked image, scaled to TOA reflectance, without the QA bands.
  return image.updateMask(mask)
      .select("B[0-9]*")
      .copyProperties(image, ["system:time_start"]);
}
// Apply platform-specific cloud mask
if (platform == 'S2' | platform == 's2') {
  var prefire_CM_ImCol2 = prefireImCol2.map(maskS2sr);
  var postfire_CM_ImCol2 = postfireImCol2.map(maskS2sr);
} else {
  var prefire_CM_ImCol2 = prefireImCol2.map(maskL8sr);
  var postfire_CM_ImCol2 = postfireImCol2.map(maskL8sr);
}
//----------------- Mosaic and clip images to study area -----------------------
// This is especially important, if the collections created above contain more than one image
// (if it is only one, the mosaic() does not affect the imagery).
var pre_mos2 = prefireImCol2.mosaic().clip(area);
var post_mos2 = postfireImCol2.mosaic().clip(area);
var pre_cm_mos2 = prefire_CM_ImCol2.mosaic().clip(area);
var post_cm_mos2 = postfire_CM_ImCol2.mosaic().clip(area);
// Add the clipped images to the console on the right
print("Pre-fire True Color Image: ", pre_mos2); 
print("Post-fire True Color Image: ", post_mos2);
//------------- Calculate NBR for pre- and post-fire images --------------------
// Apply platform-specific NBR = (NIR-SWIR2) / (NIR+SWIR2)
if (platform == 'S2' | platform == 's2') {
  var preNBR2 = pre_cm_mos2.normalizedDifference(['B8', 'B12']);
  var postNBR2 = post_cm_mos2.normalizedDifference(['B8', 'B12']);
} else {
  var preNBR2 = pre_cm_mos2.normalizedDifference(['B5', 'B7']);
  var postNBR2 = post_cm_mos2.normalizedDifference(['B5', 'B7']);
}
//------------ Calculate difference between pre- and post-fire images ----------
// The result is called delta NBR or dNBR
var dNBR_unscaled2 = preNBR2.subtract(postNBR2);
// Scale product to USGS standards
var dNBR2 = dNBR_unscaled2.multiply(1000);
// Add the difference image to the console on the right
print("Difference Normalized Burn Ratio: ", dNBR2);
//==============================================================================
// SPLIT PANEL SLIDER
// ADD A SECOND MAP TO COMPARE TO THE FIRST MAP.  NOTE THIS WILL USE "2" TO DISTINGISH 
// IT FROM THE FIRST MAP BUT OTHERWISE IT IS THE SAME PROCESS
// Add the 6 Month dNBR Classification
Map.addLayer(dNBR2.sldStyle(sld_intervals), {}, '6 Month dNBR Classified');
// Seperate result into 8 burn severity classes
var thresholds = ee.Image([-1000, -251, -101, 99, 269, 439, 659, 2000]);
var classified = dNBR2.lt(thresholds).reduce('sum').toInt();
// Make another map and add a color-NIR composite to it.
// Add the console image of 18 month dNBR classified to the map 
// using both the color ramp and interval schemes.
var linkedMap = ui.Map();
linkedMap.addLayer(dNBR.sldStyle(sld_intervals), {}, '18 Month dNBR Classified');
// Seperate result into 8 burn severity classes
var thresholds = ee.Image([-1000, -251, -101, 99, 269, 439, 659, 2000]);
var classified = dNBR.lt(thresholds).reduce('sum').toInt();
// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
Map.setCenter(-122.75, 38.65, 10);
Map.add(ui.Label('6 Months Post-Fire Vegetation', {position:'bottom-center'}));
linkedMap.add(ui.Label('18 Months Post-Fire Vegetation', {position:'bottom-center'}));
//==============================================================================
//
// END OF SCRIPT 
// JOHN KESSEL 2-19-22
//
//==============================================================================