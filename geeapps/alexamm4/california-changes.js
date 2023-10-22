// ---------------------------------------------------------------------------------------
//                                      PARAMETERS
// ---------------------------------------------------------------------------------------
// DICTIONARIES
var locationDict = {  
  'Pine Flat Lake'    : {lon: -119.2940, lat: 36.85740, zoom: 12},
  'Creek Fire'        : {lon: -119.3246, lat: 37.34180, zoom: 10},
  'Crop losses 1'     : {lon: -121.7601, lat: 38.94290, zoom: 12},
  'Crop losses 2'     : {lon: -121.7013, lat: 38.88314, zoom: 12},
  'Lake Isabella'     : {lon:-118.426684941, lat: 35.667581956, zoom: 12},
  'LA Reservoir'      : {lon: -117.854759, lat: 34.212599, zoom: 12},
  'Lake Oroville'      : {lon: -121.45964, lat: 39.60354, zoom: 12},
};
var variableDict   = {
  'LANDSAT8'             :{name: 'LANDSAT', min: 0, max: 3000, coll: 'LANDSAT/LC08/C01/T1_SR', band: ['B4', 'B3', 'B2'], legende: 'LANDSAT', scale: 1},
};
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
// OTHERS
var opac          = 1;
var vizPalette    = ['red','blue', 'green'];
var labelB        = ui.Label('May/June 2020');
var labelA        = ui.Label('May/June 2021');
var controlPanelB = ui.Panel({widgets: [labelB], style: {position: 'top-left'}});
var controlPanelA = ui.Panel({widgets: [labelA], style: {position: 'top-right'}});
var colorBar      = ui.Thumbnail({// Create the color bar for the legend.
                      image: ee.Image.pixelLonLat().select(0),
                      params: makeColorBarParams(vizPalette),
                      style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
 var legendPanel = ui.Panel([colorBar]);  
// SET DEFAULTS
var defaultLocation = locationDict['Pine Flat Lake'];
var defaultVariable = variableDict['LANDSAT8'];
// ---------------------------------------------------------------------------------------
//                                      MAKING THE LAYOUT
// ---------------------------------------------------------------------------------------
ui.root.clear();  // Create a map panel.
var panel = ui.Panel({style: {width: '350px'}});
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// LEFT MAP
var leftMap = ui.Map();
leftMap.setControlVisibility({all: false, zoomControl: true, mapTypeControl: true});
leftMap.setCenter(defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
leftMap.add(controlPanelB)
leftMap.style().set('cursor', 'crosshair');
// Center the map
var rightMap = ui.Map();
rightMap.setControlVisibility({all: false, zoomControl: true, mapTypeControl: true});
rightMap.setCenter(defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
rightMap.add(controlPanelA)
rightMap.style().set('cursor', 'crosshair');
// Center the map
var splitPanel = ui.SplitPanel({
    firstPanel: leftMap,
    secondPanel: rightMap,
    wipe: true,
    style: {stretch: 'both'}
  });
  ui.root.insert(0,panel);        // Inset the left instruction panel
  ui.root.insert(1,splitPanel);   // Inset the maps
var linker = ui.Map.Linker([leftMap, rightMap]);    // link the two maps
// ---------------------------------------------------------------------------------------
//                                 USER INTERFACE ON THE LEFT
// ---------------------------------------------------------------------------------------
// BASIC INFORMATION
var header      = panel.add(ui.Label('How did California change from 2020 to 2021?', {fontSize: '18px', color: 'Black'}))
                       .add(ui.Label('Made by Alexandre Martinez\nPh.D. Candidate, University of California, Irvine.', {fontSize: '16px', color: 'Black', whiteSpace: 'pre'}).setUrl('https://www.linkedin.com/in/alexandre1martinez/'))
                       .add(ui.Label('For comments or suggestions to add variables, contact me by email').setUrl('mailto:alexamm4@uci.edu'));
var text        = panel.add(ui.Label(['We are comparing the May 15 to June 15 2020 and 2021 using Landsat 8 satellite imageries.',
                                      '\n  '], {fontSize: '12px'}))
//SMOOTHING
var boxcar = ee.Kernel.square({
  radius: 1000, units: 'meters', magnitude: 1  // Buffer of 5km
});
// SELECTION OF THE DATASET
var parameters   = Object.keys(variableDict);
var parSelect = ui.Select({
  items: parameters,
  value: parameters[0],
  onChange: redrawVAR,
});
var varPanel = ui.Panel([ui.Label('Choose a satelitte', {'font-size': '18px'}), parSelect]);
//panel.add(varPanel);
// SELECTION OF THE LOCATION
var locations   = Object.keys(locationDict);
var locSelect   = ui.Select({
  items:    locations,
  value:    locations[0],
  onChange: redrawLOC,
  });
var locPanel = ui.Panel([ui.Label('Choose a location', {'font-size': '18px'}), locSelect]);
panel.add(locPanel);
// ---------------------------------------------------------------------------------------
//                                      MAPPING FUNCTIONS
// ---------------------------------------------------------------------------------------
// Creates a color bar thumbnail image for use in legend from the given color palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
function drawMap(loca, varDraw) {
  var date1     = ee.Date('2020-06-30');
  var datasetB  = ee.ImageCollection(varDraw.coll)
                    .filterDate(date1.advance(-45,'day'), date1.advance(-1, 'day'))
                    .map(maskL8sr)
                    .mean();
  datasetB      = datasetB.multiply(varDraw.scale);
  var date2     = ee.Date('2021-06-30');
  var datasetA  = ee.ImageCollection(varDraw.coll)
                    .filterDate(date2.advance(-45,'day'), date2.advance(-1, 'day'))
                    .map(maskL8sr)
                    .mean();
  datasetA      = datasetA.multiply(varDraw.scale);
  var imageB    = datasetB.visualize({bands: varDraw.band, min: varDraw.min, max: varDraw.max, opacity: opac});
  var imageA    = datasetA.visualize({bands: varDraw.band, min: varDraw.min, max: varDraw.max, opacity: opac});
  var imageMB   = imageB.updateMask(imageB.gte(0.000007));
  var imageMA   = imageA.updateMask(imageA.gte(0.000007));
  leftMap.clear()
  rightMap.clear()
  leftMap.addLayer(imageB, {}, varDraw.name);
  rightMap.addLayer(imageA, {}, varDraw.name);
}
function redrawLOC() {
  var loc         = locSelect.getValue(); 
  var location    = locationDict[loc];  
  var par         = parSelect.getValue();   
  var parameter   = variableDict[par]; 
  drawMap(location, parameter)
  //NOW we need to redraw also the image due to change of dates.
  leftMap.setCenter(location.lon, location.lat, location.zoom);
  rightMap.setCenter(location.lon, location.lat, location.zoom);
}
function redrawVAR() {
  var par         = parSelect.getValue(); 
  var parameter   = variableDict[par];
  var loc         = locSelect.getValue(); 
  var location    = locationDict[loc]; 
  drawMap(location, parameter);
}
// Start by drawing
drawMap(defaultLocation, defaultVariable);