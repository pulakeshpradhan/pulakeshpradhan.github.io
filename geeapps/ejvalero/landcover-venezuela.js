/**
 * Get modules
 */
var data = require('users/ejvalero/apps:LANDCOVER/data.js');
var headerModule = require('users/ejvalero/apps:LANDCOVER/COMPONENTS/header.js');
var coverSelector = require('users/ejvalero/apps:LANDCOVER/COMPONENTS/coverselector.js');
var regionSelector = require('users/ejvalero/apps:LANDCOVER/COMPONENTS/regionselector.js');
var sidebar = require('users/ejvalero/apps:LANDCOVER/COMPONENTS/sidebar.js');
var legends = require('users/ejvalero/apps:LANDCOVER/COMPONENTS/legends.js');
var functions = require('users/ejvalero/apps:LANDCOVER/functions.js');
/**
 * Config and paths
 */
var appZoom = 9;
var years = data.years;
var country = 'VENEZUELA';
var mapType = 'SATELLITE';
var palette = data.palette;
var legendCoversColors = data.legend.coversColors;
var legendCoversDescriptions = data.legend.coversDescriptions;
var mosaicBands = ['swir1_median', 'nir_median', 'red_median'];
var visMosaics = { min: 0, max: 4000, bands: mosaicBands };
var visCovers = { min: 0, max: palette.length - 1, palette: palette };
/**
 * Get assets
 */
var covers = ee.Image(data.paths.covers['LLANOS CENTRO-ORIENTALES']);
var region = ee.FeatureCollection(data.paths.regions['LLANOS CENTRO-ORIENTALES']);
var mosaics = data.mosaics;
/**
 * Define left and right maps
 */
var leftMap = ui.Map();
leftMap.setOptions(mapType);
leftMap.setControlVisibility(false);
//addLegend(leftMap, 'bottom-right');
var rightMap = ui.Map();
rightMap.setOptions(mapType);
rightMap.setControlVisibility(false);
addCoversLegend(rightMap);
setLayers({
  leftMap: leftMap,
  rightMap: rightMap,
  region: region,
  covers: covers,
  mosaics: mosaics,
  visCovers: visCovers,
  visMosaics: visMosaics,
  years: years
});
addVectors(leftMap);
addVectors(rightMap);
/**
 * Create left sidebar component
 */
// base ui components
var selectRegion = regionSelector.selectFromRegionList;
var regionsPanel = regionSelector.regionsPanel;
var coversBoxes = coverSelector.checkboxes;
var opacitySliders = coverSelector.opacitysliders;
var coversLabel = coverSelector.label;
var createSidebar = sidebar.panel;
var maintitle = headerModule
  .titlePanel(
    'LANDCOVER',
    'Venezuela',
    'Visualizador de cobertura de la tierra.',
    'MapBiomas Venezuela',
    'https://mapbiomas.org',
    'Emanuel Valero',
    'mailto:ejvalero@gmail.com'
  );
// Regions and covers selector panel
selectRegion.onChange(function(item) {
  var regionPath = data.paths.regions[item];
  var region = ee.FeatureCollection(regionPath);
  leftMap.layers().reset();
  rightMap.layers().reset();
  leftMap.centerObject(region, appZoom);
  setLayers({
    leftMap: leftMap,
    rightMap: rightMap,
    region: region,
    covers: data.paths.covers[item],
    mosaics: mosaics,
    visCovers: visCovers,
    visMosaics: visMosaics,
    years: years
  });
  rightMap.addLayer(region.style({color: 'FFFFFFFF', fillColor: '00000000', width: 2}));
  leftMap.addLayer(region.style({color: 'FFFFFFFF', fillColor: '00000000', width: 2}));
  //addVectors(rightMap);
  coversBoxes.forEach(function(box) {
    var year = box.getLabel().toString();
    var lastYear = years[years.length - 1].toString();
    box.setValue(year === lastYear ? true : false);
  });
});
/**
 * Covers selector component
 */
coversBoxes.forEach(function(box) {
  box.onChange(function(checked){
    var year = box.getLabel().toString();
    functions.toggleLayer(rightMap, year, checked);
    functions.toggleLayer(leftMap, year, checked);
  });
});
opacitySliders.forEach(function(slider) {
  slider.item.onSlide(function(value) {
    var firstYear = years[0];
    var numericYear = parseInt(slider.year, 10);
    leftMap.layers().get(numericYear-firstYear).setOpacity(value/100);
    rightMap.layers().get(numericYear-firstYear).setOpacity(value/100);
  });
});
var coversPanel = ui.Panel({
  widgets: [
    ui.Panel({
      widgets: coversBoxes,
      style: {
        backgroundColor: "#11ffee00",
        width: "28.5%",
        margin: "4px 4px 12px 0",
      }
    }),
    ui.Panel({
      widgets: opacitySliders.map(function(slider) { return slider.item }),
      style: {
        width: "70%",
        margin: "4px 0px 12px 0",
      }
    })
  ],
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {
    backgroundColor: '#fff',
    border: '1px solid lightgrey',
    height: '600px',
    margin: '0 8px 12px 8px',
    padding: '4px 8px'
  }
});
var sidebar = createSidebar([
  maintitle,
  regionsPanel,
  coversLabel,
  coversPanel
]);
/**
 * Create the instance of SplitPanel
 */
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: { stretch: 'both' }
});
ui.root.widgets().reset([sidebar, splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.centerObject(region, appZoom);
/**
 * Legend setup
 */
// hide and show legend buttons
function addCoversLegend(map) {
  var hideButton = legends.toggleButton('－', 'top-right');
  var showButton = legends.toggleButton('＋', 'bottom-right');
  var coversLegend = legends.covers(
    'CLASES DE COBERTURA',
    legendCoversColors,
    legendCoversDescriptions,
    'bottom-right', 
    hideButton
  );
  map.add(coversLegend);
  showButton.onClick(function() {
    map.add(coversLegend);
    map.remove(showButton);
  });
  hideButton.onClick(function() {
    map.remove(coversLegend);
    map.add(showButton);
  });
}
/**
 * functions: static adding vectors
 */
function addVectors(map) {
  map.addLayer(
    region
      .style({
        fillColor: '00000000',
        color: 'fff',
        width: 2
      }),
    {},
    'REGION'
  );
}
/**
 * setLayers
 */
function setLayers(config) {
  var years = config.years;
  var region = config.region;
  var covers = config.covers;
  var mosaics = config.mosaics;
  var visMosaics = config.visMosaics;
  var visCovers = config.visCovers;
  var lastYear = years[years.length - 1];
  years.forEach(function(year){
    var layerDisplay = year === lastYear ? true : false;
    var cover = covers
      .select('classification_' + year)
      .clip(region);
    var mosaic = mosaics
      .filter(ee.Filter.eq('year', year))
      .mosaic()
      .clip(region);
    config.rightMap.addLayer(cover, visCovers,  year.toString(), layerDisplay);
    config.leftMap.addLayer(mosaic, visMosaics, year.toString(), layerDisplay);
  });
}