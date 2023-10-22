var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -57.927234849878054,
                -16.279413682259207
              ],
              [
                -57.927234849878054,
                -18.165559336596804
              ],
              [
                -55.977161607690554,
                -18.165559336596804
              ],
              [
                -55.977161607690554,
                -16.279413682259207
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-57.927234849878054, -16.279413682259207],
          [-57.927234849878054, -18.165559336596804],
          [-55.977161607690554, -18.165559336596804],
          [-55.977161607690554, -16.279413682259207]]], null, false);
//===========================================================================================
//             BURN SEVERITY MAPPING USING THE NORMALIZED BURN RATIO (NBR)
//===========================================================================================
// Normalized Burn Ratio will be applied to imagery from before and after a wild fire. By
// calculating the difference afterwards (dNBR) Burn Severity is derived, showing the spatial
// impact of the disturbance. Imagery used in this process comes from either Sentinel-2 or 
// Landsat 8.
//===========================================================================================
//*******************************************************************************************
//                                     SET TIME FRAME
// Set start and end dates of a period BEFORE the fire. Make sure it is long enough for 
// Sentinel-2 to acquire an image (repitition rate = 5 days). Adjust these parameters, if
// your ImageCollections (see Console) do not contain any elements.
var prefire_start = '2020-07-15';   
var prefire_end = '2020-08-1';
// Now set the same parameters for AFTER the fire.
var postfire_start = '2020-08-20';
var postfire_end = '2020-08-30';
//*******************************************************************************************
//                            SELECT A SATELLITE PLATFORM
// You can select remote sensing imagery from two availible satellite sensors. 
// Consider details of each mission below to choose the data suitable for your needs.
// Landsat 8                             |  Sentinel-2 (A&B)
//-------------------------------------------------------------------------------------------
// launched:        February 11th, 2015  |  June 23rd, 2015 & March 7th, 2017
// repitition rate: 16 days              |  5 day (since 2017)
// resolution:      30 meters            |  10 meters 
// advantages:      longer time series   |  9 times higher spatial detail
//                  smaller export file  |  higher chance of cloud-free images
// SELECT one of the following:   'L8'  or 'S2' 
var platform = 'S2';               // <--- assign your choice to the platform variable
//---------------------------------- Translating User Inputs --------------------------------
// Print Satellite platform and dates to console
if (platform == 'S2' | platform == 's2') {
  var ImCol = 'COPERNICUS/S2_SR';
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
//----------------------- Select Landsat imagery by time and location -----------------------
var imagery = ee.ImageCollection(ImCol);
// In the following lines imagery will be collected in an ImageCollection, depending on the
// location of our study area, a given time frame and the ratio of cloud cover.
var prefireImCol = ee.ImageCollection(imagery
    // Filter by dates.
    .filterDate(prefire_start, prefire_end)
    // Filter by location.
    .filterBounds(area));
// Select all images that overlap with the study area from a given time frame 
// As a post-fire state we select the 30 August 2020
var postfireImCol = ee.ImageCollection(imagery
    // Filter by dates.
    .filterDate(postfire_start, postfire_end)
    // Filter by location.
    .filterBounds(area));
// Add the clipped images to the console on the right
print("Pre-fire Image Collection: ", prefireImCol); 
print("Post-fire Image Collection: ", postfireImCol);
//------------------------------- Apply a cloud and snow mask -------------------------------
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
  // ????
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
//----------------------- Mosaic and clip images to study area -----------------------------
// This is especially important, if the collections created above contain more than one image
// (if it is only one, the mosaic() does not affect the imagery).
var pre_mos = prefireImCol.mosaic().clip(area);
var post_mos = postfireImCol.mosaic().clip(area);
var pre_cm_mos = prefire_CM_ImCol.mosaic().clip(area);
var post_cm_mos = postfire_CM_ImCol.mosaic().clip(area);
// Add the clipped images to the console on the right
print("Pre-fire True Color Image: ", pre_mos); 
print("Post-fire True Color Image: ", post_mos);
//------------------ Calculate NBR for pre- and post-fire images ---------------------------
// Apply platform-specific NBR = (NIR-SWIR2) / (NIR+SWIR2)
if (platform == 'S2' | platform == 's2') {
  var preNBR = pre_cm_mos.normalizedDifference(['B8', 'B12']);
  var postNBR = post_cm_mos.normalizedDifference(['B8', 'B12']);
} else {
  var preNBR = pre_cm_mos.normalizedDifference(['B5', 'B7']);
  var postNBR = post_cm_mos.normalizedDifference(['B5', 'B7']);
}
// Add the NBR images to the console on the right
//print("Pre-fire Normalized Burn Ratio: ", preNBR); 
//print("Post-fire Normalized Burn Ratio: ", postNBR);
//------------------ Calculate difference between pre- and post-fire images ----------------
// The result is called delta NBR or dNBR
var dNBR_unscaled = preNBR.subtract(postNBR);
// Scale product to USGS standards
var dNBR = dNBR_unscaled.multiply(1000);
// Add the difference image to the console on the right
print("Difference Normalized Burn Ratio: ", dNBR);
//==========================================================================================
//                                    ADD LAYERS TO MAP
// Add boundary.
//Map.addLayer(area.draw({color: 'ffffff', strokeWidth: 5}), {},'Study Area');
//---------------------------------- True Color Imagery ------------------------------------
// Apply platform-specific visualization parameters for true color images
if (platform == 'S2' | platform == 's2') {
  var vis = {bands: ['B4', 'B8', 'B3'], max: 2000, gamma: 1.5};
} else {
  var vis = {bands: ['B4', 'B3', 'B2'], min: 0, max: 4000, gamma: 1.5};
}
// Add the true color images to the map.
//Map.addLayer(pre_mos, vis,'Pre-fire image');
//Map.addLayer(post_mos, vis,'Post-fire image');
// Add the true color images to the map.
//Map.addLayer(pre_cm_mos, vis,'Pre-fire False Color Image - Clouds masked');
//Map.addLayer(post_cm_mos, vis,'Post-fire False Color Image - Clouds masked');
// scenes
// T21KWA // T21KWB // TK21VB // TK21VA 
var image13 = ee.Image('COPERNICUS/S2_SR/20200730T140101_20200730T140058_T21KWB');
Map.addLayer(image13,{'bands': 'B4,B8,B3', 'gain': '0.12, 0.08, 0.1'}, '30 Julho 2020 - T21KWB');
var image = ee.Image('COPERNICUS/S2_SR/20200730T140101_20200730T140058_T21KVB');
Map.addLayer(image,{'bands': 'B4,B8,B3', 'gain': '0.12, 0.08, 0.1'}, '30 Julho 2020 - TK21VB');
var image = ee.Image('COPERNICUS/S2_SR/20200730T140101_20200730T140058_T21KVA');
Map.addLayer(image,{'bands': 'B4,B8,B3', 'gain': '0.12, 0.08, 0.1'}, '30 Julho 2020 - T21KVA');
var image12 = ee.Image('COPERNICUS/S2_SR/20200730T140101_20200730T140058_T21KWA');
Map.addLayer(image12,{'bands': 'B4,B8,B3', 'gain': '0.12, 0.08, 0.1'}, '30 Julho 2020 - T21KWA');
//var image15 = ee.Image('COPERNICUS/S2_SR/20200814T140059_20200814T140055_T21KWB');
//Map.addLayer(image15,{'bands': 'B4,B8,B3', 'gain': '0.12, 0.08, 0.1'}, '14 Agosto 2020');
//var image = ee.Image('COPERNICUS/S2_SR/20200814T140059_20200814T140055_T21KVB');
//Map.addLayer(image,{'bands': 'B4,B8,B3', 'gain': '0.12, 0.08, 0.1'}, '14 Agosto 2020 - TK21VB');
var image16 = ee.Image('COPERNICUS/S2_SR/20200819T140101_20200819T140058_T21KWB');
Map.addLayer(image16,{'bands': 'B4,B8,B3', 'gain': '0.12, 0.08, 0.1'}, '19 Agosto 2020 - T21KWB');
var image = ee.Image('COPERNICUS/S2/20200819T140101_20200819T140058_T21KVB');
Map.addLayer(image,{'bands': 'B4,B8,B3', 'gain': '0.12, 0.08, 0.1'}, '19 Agosto 2020 - TK21VB');
var image = ee.Image('COPERNICUS/S2/20200819T140101_20200819T140058_T21KVA');
Map.addLayer(image,{'bands': 'B4,B8,B3', 'gain': '0.12, 0.08, 0.1'}, '19 Agosto 2020 - T21KVA');
var image16 = ee.Image('COPERNICUS/S2/20200819T140101_20200819T140058_T21KWA');
Map.addLayer(image16,{'bands': 'B4,B8,B3', 'gain': '0.12, 0.08, 0.1'}, '19 Agosto 2020 - T21KWA');
//var image17 = ee.Image('COPERNICUS/S2_SR/20200824T140059_20200824T140229_T21KWB');
//Map.addLayer(image17,{'bands': 'B4,B8,B3', 'gain': '0.12, 0.08, 0.1'}, '24 Agosto 2020 - T21KWB');
//var image = ee.Image('COPERNICUS/S2_SR/20200824T140059_20200824T140229_T21KVB');
//Map.addLayer(image,{'bands': 'B4,B8,B3', 'gain': '0.12, 0.08, 0.1'}, '24 Agosto 2020 - TK21VB');
//var image18 = ee.Image('COPERNICUS/S2_SR/20200829T140101_20200829T140057_T21KWB');
//Map.addLayer(image18,{'bands': 'B4,B8,B3', 'gain': '0.12, 0.08, 0.1'}, '29 Agosto 2020 - T21KWB');
//var image = ee.Image('COPERNICUS/S2_SR/20200829T140101_20200829T140057_T21KVB');
//Map.addLayer(image,{'bands': 'B4,B8,B3', 'gain': '0.12, 0.08, 0.1'}, '29 Agosto 2020 - TK21VB');
var image19 = ee.Image('COPERNICUS/S2_SR/20200903T140059_20200903T140055_T21KWB');
Map.addLayer(image19,{'bands': 'B4,B8,B3', 'gain': '0.12, 0.08, 0.1'}, '03 Setembro 2020 - T21KWB');
var image = ee.Image('COPERNICUS/S2_SR/20200903T140059_20200903T140055_T21KVB');
Map.addLayer(image,{'bands': 'B4,B8,B3', 'gain': '0.12, 0.08, 0.1'}, '03 Setembro 2020 - TK21VB');
var image = ee.Image('COPERNICUS/S2_SR/20200903T140059_20200903T140055_T21KVA');
Map.addLayer(image,{'bands': 'B4,B8,B3', 'gain': '0.12, 0.08, 0.1'}, '03 Setembro 2020 - T21KVA');
var image19 = ee.Image('COPERNICUS/S2_SR/20200903T140059_20200903T140055_T21KWA');
Map.addLayer(image19,{'bands': 'B4,B8,B3', 'gain': '0.12, 0.08, 0.1'}, '03 Setembro 2020 - T21KWA');
//--------------------------- Burn Ratio Product - Greyscale -------------------------------
var grey = ['white', 'black'];
// Remove comment-symbols (//) below to display pre- and post-fire NBR seperately
//Map.addLayer(preNBR, {min: -1, max: 1, palette: grey}, 'Prefire Normalized Burn Ratio');
//Map.addLayer(postNBR, {min: -1, max: 1, palette: grey}, 'Postfire Normalized Burn Ratio');
Map.addLayer(dNBR, {min: -1000, max: 1000, palette: grey}, 'dNBR greyscale');
//------------------------- Burn Ratio Product - Classification ----------------------------
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
// Add the image to the map using both the color ramp and interval schemes.
Map.addLayer(dNBR.sldStyle(sld_intervals), {}, 'dNBR classified');
// Seperate result into 8 burn severity classes
var thresholds = ee.Image([-1000, -251, -101, 99, 269, 439, 659, 2000]);
var classified = dNBR.lt(thresholds).reduce('sum').toInt();
//==========================================================================================
//                              ADD BURNED AREA STATISTICS
// count number of pixels in entire layer
var allpix =  classified.updateMask(classified);  // mask the entire layer
var pixstats = allpix.reduceRegion({
  reducer: ee.Reducer.count(),               // count pixels in a single class
  geometry: area,
  scale: 60 // 30 ???
  });
var allpixels = ee.Number(pixstats.get('sum')); // extract pixel count as a number
// create an empty list to store area values in
var arealist = [];
// create a function to derive extent of one burn severity class
// arguments are class number and class name
var areacount = function(cnr, name) {
 var singleMask =  classified.updateMask(classified.eq(cnr));  // mask a single class
 var stats = singleMask.reduceRegion({
  reducer: ee.Reducer.count(),               // count pixels in a single class
  geometry: area,
  scale: 60 // 30 ???
  });
var pix =  ee.Number(stats.get('sum'));                    // Sentinel pixel = 10m x 10m --> 100 sqm
var hect = pix.multiply(800).divide(10000);                // Landsat pixel = 30m x 30m --> 900 sqm
var perc = pix.divide(allpixels).multiply(10000).round().divide(100);   // get area percent by class and round to 2 decimals
arealist.push({Class: name, Pixels: pix, Hectares: hect, Percentage: perc});
};
// severity classes in different order
var names2 = ['NA', 'High Severity', 'Moderate-high Severity',
'Moderate-low Severity', 'Low Severity','Unburned', 'Enhanced Regrowth, Low', 'Enhanced Regrowth, High'];
// execute function for each class
for (var i = 0; i < 8; i++) {
  areacount(i, names2[i]);
  }
print('Burned Area by Severity Class', arealist, '--> click list objects for individual classes');
//==========================================================================================
//                                    ADD A LEGEND
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }});
// Create legend title
var legendTitle = ui.Label({
  value: 'dNBR Classes',
  style: {fontWeight: 'bold',
    fontSize: '18px',
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
//  Palette with the colors
var palette =['7a8737', 'acbe4d', '0ae042', 'fff70b', 'ffaf38', 'ff641b', 'a41fd6', 'ffffff'];
// name of the legend
var names = ['Enhanced Regrowth, High','Enhanced Regrowth, Low','Unburned', 'Low Severity',
'Moderate-low Severity', 'Moderate-high Severity', 'High Severity', 'NA'];
// Add color and and names
for (var i = 0; i < 8; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
//==========================================================================================
//                                  PREPARE FILE EXPORT
//var id = dNBR.id().getInfo();
//Export.image.toDrive({image: dNBR, scale: 10, description: id, fileNamePrefix: 'dNBR_10',
//region: area, maxPixels: 1e10});
// Downloads will be availible in the 'Tasks'-tab on the right.