// ===================
// Field Map App
// ===================
// ------------
// Load modules
// ------------
var geoTools = require('users/jhowarth/conservation:modules/geoTools.js');
var cart = require('users/jhowarth/conservation:modules/cart.js');
var style = require('users/jhowarth/conservation:modules/styles.js');
// ~~~~~~~~~~~~
// midd outline
// ~~~~~~~~~~~~
var towns = ee.FeatureCollection('users/jhowarth/middCC/vermontTownsUTM18');
var midd = towns.filter(ee.Filter.eq('TOWNNAME', 'MIDDLEBURY'));
var middOutline = geoTools.paintOutline(midd);
// ~~~~~~~~~~
// GPS tracks
// ~~~~~~~~~~  
var gps0927 = ee.FeatureCollection('users/jhowarth/gpsTracks/_09272021_trackPts');
var heatmapImg = geoTools.makeHeatmap(gps0927,10);
var heatViz = {
  min: 0,
  max: 1,
  palette: style.heatPalette
};
var heatLegend = cart.makeGradientLegend(heatViz, 'GPS heat');
// ~~~~~~~~~
// hillshade
// ~~~~~~~~~
// import
var image = ee.Image("USGS/NED");
// hillshade
var hs = ee.Terrain.hillshade(image.multiply(2), 315, 45);
// viz
var hsViz = {
  min: 0,
  max: 255,
  palette: ['black', 'white']
};
// ~~~~~~~~~~~~~
// beers map viz 
// ~~~~~~~~~~~~~
// import
var midd1871 = ee.Image('users/jhowarth/vt_images/beersMidd71');
var cornwall1871 = ee.Image('users/jhowarth/vt_images/beersCornwall71');
var beersViz = {
  min:50,
  max:255,
  bands: ['b1', 'b2', 'b3'],
  gamma: 2.5
};
// ~~~~~~~~~~
// ortho 1942
// ~~~~~~~~~~
var ortho1942 = ee.Image('users/jhowarth/middCC/Middlebury_1942_Ortho');
var orthoViz = {
  min:0,
  max:255,
  gamma: 1
};
// ~~~~~~~~~
// usgs 1920
// ~~~~~~~~~
var bran1920 = ee.Image('users/jhowarth/vt_images/VT_Brandon_460004_1920_62500_geo');
var midd1920 = ee.Image('users/jhowarth/vt_images/VT_Middlebury_1920');
var usgsViz = {
  min: 0,
  max: 255,
  bands: ['b1','b2','b3'],
  gamma: 0.9
};
// ~~~~~~~~~~~~~
// glacial lakes
// ~~~~~~~~~~~~~  
var lakes = ee.FeatureCollection('users/jhowarth/surfaceGeo/glacial_lakes_and_sea');
var lakeVermont = lakes.filter(ee.Filter.or
  (ee.Filter.eq('GlacialLak', 'Glacial Lake Vermont, Coveville Phase'),
  ee.Filter.eq('GlacialLak', 'Glacial Lake Hitchcock'))
  );
var seaChamplain = lakes.filter(ee.Filter.eq('GlacialLak', 'Champlain Sea'));
// ~~~
// TAM
// ~~~
var tam = ee.FeatureCollection('users/jhowarth/middCC/TAM');
var tamList = geoTools.tokenList(tam, 'Trail_Type');
var tamIDs = geoTools.tagIDs(tamList);
var tamDict = geoTools.tagDict(tamList, tamIDs);
var tamTagged = tam.map(geoTools.tagNominalClasses(tamDict, 'Trail_Type', 'TAG'));
var tamImage = geoTools.makeImageFromFeatures(tamTagged, 'TAG');
var tamPalette = ['#FC8156', '#FA5252', '#FCCD56', '#FFEB40', '#E6A35A']; 
var tamViz = {
  min: 0,
  max: 4,
  palette: tamPalette
};
var tamItems = ['Service Road', 'Side Trail', 'Bike trail', 'Foot trail', 'Road'];
var tamLegend = cart.makeLegend('TAM trails', tamPalette, tamItems);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Surface geology
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var surfaceGeo = ee.FeatureCollection('users/jhowarth/surfaceGeo/surfaceGeoShapes');
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
  palette: style.surGeo
};
// legend  
// ---------------
var sgLegend = cart.makeLegend('Landforms', style.surGeo, style.surGeoLabels);
// ~~~~~~~~~~~~~~~~
// Nat com soils
// ~~~~~~~~~~~~~~~~
var pncStack = ee.Image('users/jhowarth/midd_conservation_plan/pncStack');
// create a flat image
var pncU = pncStack.unmask();
var pncFlat = pncU.select(0)
  .add(pncU.select(1).multiply(2))
  .add(pncU.select(2).multiply(3))
  .add(pncU.select(3).multiply(4))
  .add(pncU.select(4).multiply(5))
  .add(pncU.select(5).multiply(6))
  .add(pncU.select(6).multiply(7))
  .add(pncU.select(7).multiply(8))
  .add(pncU.select(8).multiply(9))
;
// Define min and max to stretch palette
var pncViz = {
  min: 1,
  max: 9,
  palette: style.natCom
};
//  make legend
var pncLegend = cart.makeLegend('Nat Com Soils', style.natCom, style.natComLabels);
// ~~~~~~~~~~~~~~~~
// Protected lands
// ~~~~~~~~~~~~~~~~
var proStack = ee.Image('users/jhowarth/midd_conservation_plan/proStackProj');
// make flat layer from stack
// --------------------------
var proStackU = proStack.unmask();
var proFlat = proStackU.select(0)
  .add(proStackU.select(1).multiply(2))
  .add(proStackU.select(2).multiply(3))
  ;
// viz dictionary
// --------------
var proViz = {
  min: 1,
  max: 3,
  palette: style.proLand
};
// make legend
// -----------
var proLegend = cart.makeLegend('Protected lands', style.proLand, style.proLandLabels);
// ~~~~~~~~~~~~~~~
// Land Cover 
// ~~~~~~~~~~~~~~~
var lcStack = ee.Image('users/jhowarth/midd_conservation_plan/lcStack');
var lcFlat = lcStack.select(0)
  .add(lcStack.select(1).multiply(2))
  .add(lcStack.select(2).multiply(3))
  .add(lcStack.select(3).multiply(4))
  .add(lcStack.select(4).multiply(5))
  ;
var lcViz = {
  min: 1,
  max: 5,
  palette: style.lc
};
//  make legend
var lcLegend = cart.makeLegend('Land Cover', style.lc, style.lcLabels);
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
var title = cart.makeTitle("Midd field maps");
// initialize map and options 
var map = ui.Map();
map.setOptions('HYBRID');
// map.style().set({cursor: 'crosshair'});
// Compose sources and credits  
var src = {
  surGeoLabel: 'Surficial Geologic Map of Vermont, 1970 - Units',
  surGeoLink: 'https://geodata.vermont.gov/datasets/VTANR::surficial-geologic-map-of-vermont-1970-units/about',
  middBeersLabel: 'Middlebury 1871, by F.W. Beers',
  middBeersLink: 'https://archive.org/details/vtmaps_Middlebury_0082',
  cornBeersLabel: 'Cornwall 1871, by F.W. Beers',
  cornBeersLink: 'https://archive.org/details/vtmaps_Cornwall_0044', 
  nativeLand: 'This is Abenaki land.',
  author: 'Jeff Howarth, Geography Department, Middlebury College,\njhowarth@middlebury.edu'
};
var surGeoSrc = cart.makeSource(src.surGeoLabel, src.surGeoLink);  
var middBeersSrc = cart.makeSource(src.middBeersLabel, src.middBeersLink);
var cornBeersSrc = cart.makeSource(src.cornBeersLabel, src.cornBeersLink);
var landAck = cart.makeCredit(src.nativeLand);
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
  bran: 4,
  midd: 5,
  sg: 6,
  lakeV: 7,
  seaC: 8,
  tam: 9,
  middO: 10,
};
map.centerObject(midd, 13);
map.setOptions('HYBRID');
map.addLayer(hs, hsViz, 'Hillshade', 0, 0.9);
map.addLayer(ortho1942, orthoViz, '1942 Ortho', 0, 1 );
map.addLayer(cornwall1871, beersViz, '1871 Corn', 0, 0.66);
map.addLayer(midd1871, beersViz, '1871 Midd', 0, 0.66);
map.addLayer(bran1920, usgsViz, '1920 Brand', 0, 0.66);
map.addLayer(midd1920, usgsViz, '1920 Midd', 0, 0.66);
map.addLayer(sgImage, sgViz, 'Surface Geo', 0, 0.66);
map.addLayer(pncFlat, pncViz, 'NC soils', 0, 0.8);
map.addLayer(lcFlat, lcViz, 'Land cover', 0, 0.8);
map.addLayer(proFlat, proViz, 'Protected', 0, 0.8);
map.addLayer(lakeVermont, {color:'#7FC0D4'}, 'Ice lakes',0,1);
map.addLayer(seaChamplain, {color:'#94F6F3'}, 'Champ Sea', 0,1);
map.addLayer(tamImage, tamViz, 'TAM', 1,1);
map.addLayer(heatmapImg,heatViz,'Heatmap',0,0.9);
map.addLayer(middOutline, {palette: 'black'}, 'Midd', 1, 1);
// Construct panel
// ---------------
panelSide.add(title)
  .add(tamLegend)
  .add(heatLegend)
  .add(sgLegend)
  .add(surGeoSrc)
  .add(pncLegend)
  .add(proLegend)
  .add(lcLegend)
  .add(middBeersSrc)
  .add(cornBeersSrc)
  .add(landAck)
  .add(author);