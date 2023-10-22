var states = ui.import && ui.import("states", "table", {
      "id": "TIGER/2018/States"
    }) || ee.FeatureCollection("TIGER/2018/States"),
    goes = ui.import && ui.import("goes", "imageCollection", {
      "id": "NOAA/GOES/16/FDCC"
    }) || ee.ImageCollection("NOAA/GOES/16/FDCC"),
    county = ui.import && ui.import("county", "table", {
      "id": "TIGER/2018/Counties"
    }) || ee.FeatureCollection("TIGER/2018/Counties"),
    nlcd = ui.import && ui.import("nlcd", "imageCollection", {
      "id": "USGS/NLCD"
    }) || ee.ImageCollection("USGS/NLCD"),
    theobald = ui.import && ui.import("theobald", "image", {
      "id": "CSP/ERGo/1_0/US/landforms"
    }) || ee.Image("CSP/ERGo/1_0/US/landforms"),
    ned = ui.import && ui.import("ned", "image", {
      "id": "USGS/NED"
    }) || ee.Image("USGS/NED"),
    landsat = ui.import && ui.import("landsat", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    parcels = ui.import && ui.import("parcels", "table", {
      "id": "users/jhowarth/fire/SC_Assessor_Parcels"
    }) || ee.FeatureCollection("users/jhowarth/fire/SC_Assessor_Parcels");
// Start with clean slate
// ======================
ui.root.clear();
// initialize two maps
// ===================
var leftMap = ui.Map();
var rightMap = ui.Map();
// link the two maps
// =================
var linker = ui.Map.Linker([leftMap,rightMap]);
// Create a SplitPanel which holds the linked maps side-by-side.
var mapLayout = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// add maps to map panel
ui.root.add(mapLayout);
// Define variables
// =================
var newDate = new Date();
var today = ee.Date(newDate);
// var tenAgo = today.advance(-9, 'day');
// var twentyAgo = today.advance(-20, 'day');
// var thirtyAgo = today.advance(-30, 'day');
// var fortyAgo = today.advance(-39, 'day');
// var fiftyAgo = today.advance(-50, 'day');
// var _365Ago = today.advance(-365, 'day');
// var _356Ago = _365Ago.advance(-9, 'day');
var preStart = ee.Date('2019-09-01');
var preEnd = ee.Date('2019-09-28');
var postStart = ee.Date('2020-09-01');
var postEnd = ee.Date('2020-09-30');
var seasonStart = ee.Date('2020-08-01');
var seasonEnd = ee.Date('2020-08-31');
var cloudFilter = 100;
var stateName = 'California';
var regionState = states.filter(ee.Filter.eq('NAME', stateName));
var countyName = 'Santa Cruz';
var regionCounty = county.filter(ee.Filter.and(
  ee.Filter.eq('NAME', countyName),
  ee.Filter.eq('STATEFP','06')
  ))
  ;
// FIRMS dataset
// =============
var firms = ee.ImageCollection('FIRMS')
  .filterBounds(regionState)
  .select('T21');
var firmsNow = firms
  .filterDate(seasonStart, seasonEnd);
var firmsVis = {
  min: 325.0,
  max: 400.0,
  palette: ['yellow', 'orange', 'red'],
};
// Sentinel dataset
// ================
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var sentCurrent = ee.ImageCollection('COPERNICUS/S2_SR')
  .filterDate(postStart, postEnd)
  .filterBounds(regionState)
  // Pre-filter to get less cloudy granules.
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',cloudFilter))
  .map(maskS2clouds);
var sentPrevious = ee.ImageCollection('COPERNICUS/S2_SR')
  .filterBounds(regionState)
  .filterDate('2017-01-01', '2019-12-31')
  .filter(ee.Filter.calendarRange(9,9,'month'))
  // Pre-filter to get less cloudy granules.
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',cloudFilter))
  .map(maskS2clouds);
var sentVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B12', 'B8', 'B4'],
};
// NLCD
var landcover = nlcd
  .filter(ee.Filter.eq('system:index', 'NLCD2016'))
  .select('landcover');
var landcoverVis = {
  min: 0.0,
  max: 95.0,
  palette: [
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '466b9f',
    'd1def8',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'dec5c5',
    'd99282',
    'eb0000',
    'ab0000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'b3ac9f',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '68ab5f',
    '1c5f2c',
    'b5c58f',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'af963c',
    'ccb879',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'dfdfc2',
    'd1d182',
    'a3cc51',
    '82ba9e',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'dcd939',
    'ab6c28',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    '000000',
    'b8d9eb',
    '000000',
    '000000',
    '000000',
    '000000',
    '6c9fb8'
  ],
};
// Theobald landforms
var landforms = theobald.select('constant');
var landformsVis = {
  min: 11.0,
  max: 42.0,
  palette: [
    '141414', '383838', '808080', 'EBEB8F', 'F7D311', 'AA0000', 'D89382',
    'DDC9C9', 'DCCDCE', '1C6330', '68AA63', 'B5C98E', 'E1F0E5', 'a975ba',
    '6f198c'
  ],
};
// NED layers
var nedSlope = ee.Terrain.slope(ned);
var landMask = ned.gt(0);
var nedSlopePalette = ['#fee5d9','#fcae91','#fb6a4a','#de2d26','#a50f15'];
var nedVis = {
  min: 0,
  max: 45,
  palette: nedSlopePalette
};
/* 
*******************************************************************
MAKE NORMALIZED BURN RATIO FUNCTION
*******************************************************************
*/
var burnRatioSentinel = function(image) {
  return image.normalizedDifference(['B8','B12']);
};
/* 
*******************************************************************
APPLY FUNCTION TO PRE- AND POST- FIRE IMAGE COLLECTIONS
*******************************************************************
*/
var nbiPreSent = sentPrevious.map(burnRatioSentinel);
var nbiPostSent = sentCurrent.map(burnRatioSentinel);
/* 
*******************************************************************
FUNCTION TO CALCULATE CHANGE IN NBR
*******************************************************************
*/
var dNBRsentinel = nbiPreSent.median().subtract(nbiPostSent.median());
/* 
*******************************************************************
 CLASSIFY SEVERITY
*******************************************************************
*/
var dNBRclass = function(image) {
  return image
    .gte(-0.25)
    .add(image.gte(-0.1))
    .add(image.gte(0.1))
    .add(image.gte(0.27))
    .add(image.gte(0.44))
    .add(image.gte(0.66));
};
var dNBRclassSentinel = dNBRclass(dNBRsentinel);
/* 
*******************************************************************
VIS PARAMETERS FOR CLASSED LAYER
*******************************************************************
*/
var dNBRpalette = ['#778735', '#a7c04f', '#07e444', '#f6fc0d', '#f7b140', '#f86819', '#a601d4']
var dNBRvis = {
  min: 0,
  max: 6,
  palette: dNBRpalette
};
// =========================
// Legend
// =========================
var dNBRlabels = [
  'High post-fire regrowth',
  'Low post-fire regrowth',
  'Unburned',
  'Low Severity',
  'Moderate-low Severity',
  'Moderate-high Severity',
  'High Severity'];
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
    }
    });
var legendTitle = ui.Label({
  value: 'Burn Severity',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
  });
// Add the title to the panel
legend.add(legendTitle);
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      padding: '8px',
      margin: '0 0 4px 0'
      }
    });
  var description = ui.Label({
    value: name,
    style: {
      margin: '0 0 4px 6px',
      fontSize: '14px'
      }
    });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
    });
};
// Add color and and names using a FOR-LOOP.
//A for-loop is a programming concept that allows us to carry out an action for a specifically defined number of times.
//Don't worry too much about the syntax, but this function is going to run 14 times, for each color we defined above.
//For each color, it will add a row to the legend with the palette colorbox and name.
for (var i = 0; i < 7; i++) {
  legend.add(makeRow(dNBRpalette[i], dNBRlabels[i]));
  } 
//Add legend to the map
leftMap.add(legend);
// Map display
leftMap.setCenter(-122.227327,37.150974,11);
leftMap.setOptions('TERRAIN');
rightMap.setOptions('TERRAIN');
rightMap.addLayer(nedSlope, nedVis, "Slope",0,0.55);
rightMap.addLayer(landforms, landformsVis, 'Landforms',0,0.55);
rightMap.addLayer(landcover, landcoverVis, 'Landcover', 0, 0.55);
rightMap.addLayer(sentCurrent.median(), sentVis, 'Sentinel Current',1,0.55);
rightMap.addLayer(firmsNow.max(), firmsVis, 'August Fires (FIRMS)',0,0.55);
leftMap.addLayer(dNBRclassSentinel.updateMask(landMask), dNBRvis, 'Burn Ratio Sentinel',1,0.55);
leftMap.addLayer(firmsNow.max(), firmsVis, 'August Fires (FIRMS)',0,0.55);
//leftMap.addLayer(parcels, {color: 'white'}, 'Parcels', 1, 1);
// rightMap.addLayer(fires, firesVis, 'Fires',0,1);
// =========================
// Checkbox
// =========================
var showFires = function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  leftMap.layers().get(1).setShown(checked);
  rightMap.layers().get(4).setShown(checked);
};
var checkStyle = {
   position: 'bottom-left',
    padding: '8px 15px'
    };
var checkbox = ui.Checkbox('Show August Fires (FIRMS)', false, showFires, false, checkStyle);
leftMap.add(checkbox);
// =========================
// Select fires
// =========================
var fires = {
  CZU: [-122.227327, 37.150974,11],
  River: [-121.580721, 36.477666, 11],
  SCU: [-121.453185, 37.385932,10],
  LNU: [-122.251668, 38.6079782, 10],
  August: [-122.922302, 39.9026063, 10]
};
var select = ui.Select({
  items: Object.keys(fires),
  onChange: function(key) {
    leftMap.setCenter(fires[key][0], fires[key][1])},
  style: checkStyle
});
// Set a place holder.
select.setPlaceholder('Choose a fire...');
leftMap.add(select);