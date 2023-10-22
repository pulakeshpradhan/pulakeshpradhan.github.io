// ===================
// Historical Midd App
// ===================
// ------------
// Load modules
// ------------
var geoTools = require('users/jhowarth/conservation:modules/geoTools.js');
var cart = require('users/jhowarth/conservation:modules/cart.js');
var palette = require('users/jhowarth/conservation:modules/palettes.js');
// ------------
// Import data
// ------------
var midd1871 = ee.Image('users/jhowarth/vt_images/beersMidd71');
var cornwall1871 = ee.Image('users/jhowarth/vt_images/beersCornwall71');
var surfaceGeo = ee.FeatureCollection('users/jhowarth/surfaceGeo/surfaceGeoShapes');
var lakes = ee.FeatureCollection('users/jhowarth/surfaceGeo/glacial_lakes_and_sea');
var towns = ee.FeatureCollection('users/jhowarth/middCC/vermontTownsUTM18');
var image = ee.Image("USGS/NED");
var ortho1942 = ee.Image('users/jhowarth/middCC/Middlebury_1942_Ortho');
var usgs1920 = ee.Image('users/jhowarth/vt_images/VT_Brandon_460004_1920_62500_geo');
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
// beers map viz 
// -------------
var beersViz = {
  min:50,
  max:255,
  bands: ['b1', 'b2', 'b3'],
  gamma: 2.5
};
// ortho 1942
// ----------
var orthoViz = {
  min:0,
  max:255,
  gamma: 1
};
// usgs 1920
// ---------
var usgsViz = {
  min: 0,
  max: 255,
  bands: ['b1','b2','b3'],
  gamma: 0.25
};
// glacial lakes
// -------------  
var lakeVermont = lakes.filter(ee.Filter.eq('GlacialLak', 'Glacial Lake Vermont, Coveville Phase'));
var seaChamplain = lakes.filter(ee.Filter.eq('GlacialLak', 'Champlain Sea'));
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Surface geology
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Convert feature collection to image
// -----------------------------------
var sgList = geoTools.tokenList(surfaceGeo, 'FEATURE_TY');
var sgIDs = geoTools.tagIDs(sgList);
var sgDict = geoTools.tagDict(sgList, sgIDs);
var sgTagged = surfaceGeo.map(geoTools.tagNominalClasses(sgDict, 'FEATURE_TY', 'TAG'));
var sgImage = geoTools.makeImageFromFeatures(sgTagged, 'TAG');
// Viz Scheme
// ---------------
var sgViz = {
  min: 0,
  max: 11,
  palette: palette.surGeo
};
// legend  
// ---------------
var sgLegend = cart.makeLegend('Landforms', palette.surGeo, palette.surGeoLabels);
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
var title = cart.makeTitle("Remembering our pasts");
// initialize map and options 
var map = ui.Map();
map.setOptions('HYBRID');
map.style().set({cursor: 'crosshair'});
// Compose sources and credits  
var src = {
  surGeoLabel: 'Surficial Geologic Map of Vermont, 1970 - Units',
  surGeoLink: 'https://geodata.vermont.gov/datasets/VTANR::surficial-geologic-map-of-vermont-1970-units/about',
  middBeersLabel: 'Middlebury 1871, by F.W. Beers',
  middBeersLink: 'https://archive.org/details/vtmaps_Middlebury_0082',
  cornBeersLabel: 'Cornwall 1871, by F.W. Beers',
  cornBeersLink: 'https://archive.org/details/vtmaps_Cornwall_0044',
  author: 'Jeff Howarth, Geography Department, Middlebury College,\njhowarth@middlebury.edu'
};
var surGeoSrc = cart.makeSource(src.surGeoLabel, src.surGeoLink);  
var middBeersSrc = cart.makeSource(src.middBeersLabel, src.middBeersLink);
var cornBeersSrc = cart.makeSource(src.cornBeersLabel, src.cornBeersLink);
var author = cart.makeCredit(src.author);
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
var layerStack = {
  hs: 0,
  ortho: 1,
  cornwallB: 2,
  middB: 3,
  usgs: 4,
  sg: 5,
  lakeV: 6,
  seaC: 7,
  middO: 8,
  selection: 9
};
map.centerObject(midd, 13);
map.setOptions('HYBRID');
map.addLayer(hs, hsViz, 'Hillshade', 1, 0.9);
map.addLayer(ortho1942, orthoViz, 'Orthomosaic 1942', 0, 1 );
map.addLayer(cornwall1871, beersViz, 'Cornwall 1871', 0, 0.66);
map.addLayer(midd1871, beersViz, 'Midd 1871', 1, 0.66);
map.addLayer(usgs1920, usgsViz, 'Brandon 1920', 0, 0.66);
map.addLayer(sgImage, sgViz, 'Surface Geology', 0, 0.66);
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
  map.layers().set(layerStack.selection, ui.Map.Layer(overlay).setName('Selected landform'));
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
panelSide.add(title)
  .add(middBeersSrc)
  .add(cornBeersSrc)
  .add(sgLegend)
  .add(surGeoSrc)
  .add(author);
panelSide.add(sgPanel);