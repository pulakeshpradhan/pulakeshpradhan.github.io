// ===================
// Surface geology app
// ===================
// ------------
// Load modules
// ------------
var geoTools = require('users/jhowarth/conservation:modules/geoTools.js');
var cart = require('users/jhowarth/conservation:modules/cart.js');
var palette = require('users/jhowarth/conservation:modules/palettes.js');
var legendTool = require('users/jhowarth/middCC:modules/legend.js');
// ------------
// Import data
// ------------
var surfaceGeo = ee.FeatureCollection('users/jhowarth/surfaceGeo/surfaceGeoShapes');
var lakes = ee.FeatureCollection('users/jhowarth/surfaceGeo/glacial_lakes_and_sea');
var towns = ee.FeatureCollection('users/jhowarth/middCC/vermontTownsUTM18');
var image = ee.Image("USGS/NED");
// midd
// --------
var midd = towns.filter(ee.Filter.eq('TOWNNAME', 'MIDDLEBURY'));
var middOutline = geoTools.paintOutline(midd);
// hillshade
// ---------
var hs = ee.Terrain.hillshade(image.multiply(2), 315, 45);
var hsViz = {
  min: 0,
  max: 255,
  palette: ['black', 'white']
};
// glacial lakes
// -------------  
var lakeVermont = lakes.filter(ee.Filter.eq('GlacialLak', 'Glacial Lake Vermont, Coveville Phase'));
var seaChamplain = lakes.filter(ee.Filter.eq('GlacialLak', 'Champlain Sea'));
// -----------------------------------
// Convert feature collection to image
// -----------------------------------
var sgList = geoTools.tokenList(surfaceGeo, 'FEATURE_TY');
var sgIDs = geoTools.tagIDs(sgList);
var sgDict = geoTools.tagDict(sgList, sgIDs);
var sgTagged = surfaceGeo.map(geoTools.tagNominalClasses(sgDict, 'FEATURE_TY', 'TAG'));
var sgImage = geoTools.makeImageFromFeatures(sgTagged, 'TAG');
// ----------------
// Viz Scheme
// ---------------
var sgViz = {
  min: 0,
  max: 11,
  palette: palette.surfaceGeo
};
// ----------------
// legend  
// ---------------
print(sgList);
print('codes', sgDict);
var legendList = [
  'Bedrock exposure',
  'Champlain Sea deposit',
  'Champlain Sea landform',
  'Eolian deposit',
  'Glacial deposit',
  'Glaciofluvial',
  'Glaciofluvial deposit',
  'Glaciolacustrine depost',
  'No data',
  'Pluvial deposit',
  'Postglacial fluvial deposit',
  'Surface Water'
  ];
var sgLegend = cart.makeLegend('Landforms', palette.surfaceGeo, legendList);
// ----------------
// Layout
// ---------------
// Compose side panel for marginalia
// =================================
// Initialize side panel
var panelSide = ui.Panel({
  style: {
    width: '20%'
  }
});
// Compose title
var title = ui.Label({
  value: 'Vermont surface geology',
  style: {
    fontSize: '24px',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    padding: '4px'
  }
});
// initialize map and options 
var map = ui.Map();
map.setOptions('HYBRID');
map.style().set({cursor: 'crosshair'});
// Compose sources and credits  
var sources = ui.Label({
  value: 'Surficial Geologic Map of Vermont, 1970 - Units', 
  style: {
    fontSize: '10px',
    fontFamily: 'Helvetica',
    color: 'gray',
    padding: '4px',
    whiteSpace: 'pre'
  }
});
sources.setUrl('https://geodata.vermont.gov/datasets/VTANR::surficial-geologic-map-of-vermont-1970-units/about');
var credits = ui.Label({
  value: 'Jeff Howarth, Geography Department, Middlebury College,\njhowarth@middlebury.edu', 
  style: {
    fontSize: '10px',
    fontFamily: 'Helvetica',
    color: 'gray',
    padding: '4px',
    whiteSpace: 'pre'
  }
});
// initialize split panel for main layout
// --------------------------------------
var splitPanel = ui.SplitPanel({
  firstPanel: panelSide,
  secondPanel: map,
});
// clear root and add split panel
// ------------------------------
ui.root.clear();
ui.root.add(splitPanel);
// -------------------
// Compose layer stack
// -------------------
map.centerObject(midd, 12);
map.setOptions('HYBRID');
map.addLayer(hs, hsViz, 'Hillshade', 1, 0.9);
map.addLayer(sgImage, sgViz, 'Surface Geology', 1, 0.66);
map.addLayer(lakeVermont, {color:'white'}, 'Lake Vermont',0,1);
map.addLayer(seaChamplain, {color:'white'}, 'Champlain Sea', 0,1);
map.addLayer(middOutline, {palette: 'black'}, 'Middlebury', 1, 1);
// -------------------------------
// Query landform type by location
// -------------------------------
var sgPanel = ui.Panel();
var sgTitle = 'Selected landform';
var sgFilter = ['FEATURE_TY', 'LITHNAME', 'DESCRIPTIO'];
var sgField = 'FEATURE_TY';
var makeChart = function(feat, panel, title, filt, field) {
  var label = ui.Label({
    value: title,
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      fontFamily: 'Helvetica',
      color: 'black',
      padding: '4px'
      }
    });
  var filter = feat.select(filt);
  var table = ui.Chart.feature.byFeature(filter, field);
  table.setChartType('Table');
  table.setOptions({allowHtml: true, pageSize: 5});
  table.style().set({stretch: 'both'});
  panel.clear();
  panel.add(label);
  panel.add(table);
};
var highlight1 = 'yellow';
// Updates the map overlay using the currently-selected countries.
function updateOverlay(point) {
  var overlay = surfaceGeo.filterBounds(point).style(highlight1);
  map.layers().set(5, ui.Map.Layer(overlay).setName('Selected landform'));
  return overlay;
}
// Register a click handler for the map that adds the clicked point to the
// list and updates the map overlay and chart accordingly.
function handleMapClick(coordinates) {
  var point = ee.Geometry.Point([coordinates.lon, coordinates.lat]);
  var selectSG = surfaceGeo.filterBounds(point);
  updateOverlay(point);
  makeChart(selectSG, sgPanel, sgTitle, sgFilter, sgField);
}
map.onClick(handleMapClick);
// Construct panel
// ---------------
panelSide.add(title).add(sgLegend).add(sources).add(credits);
panelSide.add(sgPanel);