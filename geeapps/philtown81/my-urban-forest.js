var bu = ui.import && ui.import("bu", "table", {
      "id": "users/philtown81/BUA_SUB_simplified"
    }) || ee.FeatureCollection("users/philtown81/BUA_SUB_simplified");
// import functions
var F = require('users/philtown81/default:count_trees')
var MAX = 100
// functions
var removeLayer = function(name) {
  var layers = mapPanel.layers()
  // list of layers names
  var names = []
  layers.forEach(function(lay) {
    var lay_name = lay.getName()
    names.push(lay_name)
  })
  // get index
  var index = names.indexOf(name)
  if (index > -1) {
    // if name in names
    var layer = layers.get(index)
    mapPanel.remove(layer)
  } 
}
// Estimates canopy strucutre for selected ploygon, also
// selects polyong and de-selects all others.
var generateChart = function (coords) {
  removeLayer('selected')
  removeLayer('treeLayer')
  // select built-up area from map
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // select the polygon and colour red
  var selected = bu.filterBounds(point);
  var id = ee.String(selected.first().get('bua11nm'));
  var selectedDisplayed = mapPanel.addLayer(selected, {color:'red'}).setName('selected');
  mapPanel.centerObject(selected);
  // determine tree density
  var v = 'N'
  var trees = F.trees(selected, v, 'rf', 2020, 100).reproject('EPSG:27700', null, 100);
  mapPanel.addLayer(trees.reproject('EPSG:27700', null, 100), {min:0, max:MAX, palette:['white', 'green']}, 'treeLayer')
  // values in side panel
  bu_name.setValue('Identifying location...');
  id.evaluate(function(value){bu_name.setValue('Location: ' + JSON.stringify(value).replace(/\"/g, "").replace("BUA", ""))});
  var Ntrees
  if (v == 'N') {
      Ntrees = trees.reproject('EPSG:27700', null, 100).reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: selected,
      scale: 100,
      maxPixels: 1e9
      }).get('classification');
    Ntrees = ee.Number(Ntrees).int()
  }
  else {
      Ntrees = trees.reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: selected,
      scale: 100,
      maxPixels: 1e9
      }).get('classification');
    Ntrees = ee.Number(Ntrees).int()    
  }
  var area = selected.geometry().area().divide(100 * 100)
  var trees_ha = Ntrees.divide(area).round()
  bu_N.setValue('Calculating...');
  if (v == 'N'){
    trees_ha.evaluate(function(value){bu_density.setValue('Tree density: ' + JSON.stringify(value) + ' trees per ha')})
    Ntrees.evaluate(function(value){bu_N.setValue('Number of trees: ' + JSON.stringify(value).replace(/\"/g, "")) });
    bu_density.setValue('');
  }
  else if(v == 'N'){
    trees_ha.evaluate(function(value){bu_density.setValue('Mean canopy cover: ' + JSON.stringify(value) + '%')})
    bu_density.setValue('');  
  }
};
/*
 * Legend setup
 */
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
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
/*
 * Map layer configuration
 */
var builtupAreas = ui.Map.Layer(bu).setName('built-up areas');
// Create the main map and set the SST layer.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(builtupAreas);
/*
 * Panel setup
 */
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'How many trees are in your neighbourhood?',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click on a grey polygon to estimate the number of trees. \
            Processing can take a while so please be patient!')
]);
inspectorPanel.add(intro);
// Create panels to hold lon/lat values.
var bu_name = ui.Label({style: {fontSize: '20px', fontWeight: 'bold'}});
var bu_N = ui.Label({style: {fontSize: '20px', fontWeight: 'bold', stretch:'horizontal'}});
var bu_density = ui.Label({style: {fontSize: '20px', fontWeight: 'bold', stretch:'horizontal'}});
inspectorPanel.add(ui.Panel([bu_name]));
inspectorPanel.add(ui.Panel([bu_N, bu_density]), ui.Panel.Layout.flow({direction:'horizontal', wrap:true}));
var vis_N = {min: 0, max: MAX, palette: ['white', 'green']};
// DENSITY Create the color bar for the legend.
var colorBar3 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis_N.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels3 = ui.Panel({
  widgets: [
    ui.Label(vis_N.min, {margin: '4px 8px'}),
    ui.Label(
        (vis_N.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis_N.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle3 = ui.Label({
  value: 'Tree Density (trees per hectare)',
  style: {fontWeight: 'bold'}
});
var legendPanel3 = ui.Panel([legendTitle3, colorBar3, legendLabels3]);
inspectorPanel.add(legendPanel3);
// Add placeholders for the chart and legend.
var method = ui.Panel({
    widgets:
    [ui.Label({value:'Method', style: {fontSize: '18px', fontWeight: 'bold'}}),
     ui.Label({value:'This tool estimates the number of trees in an urban area from satellite\
                      imagery and other data sources.'}),
     ui.Label({value:'To do this the model was initially trained on LiDAR dervied\
                      estimates of tree denisty over London using the UK\'s Environment\
                      Agencies open-access dataset.'}), 
     ui.Label({value:'The model running to generate the estimates here is called\
                      Random Forest (nothing to do with actual forests!). This uses the\
                      satellite data to predict the number of trees.'}),
     ui.Label({value:'The built-up areas polygons were provided by the ONS and are representative\
                      of 2011 boundaries.'}),
     ui.Label({value:'The derivation of LiDAR training data and this implmentaion of the\
                      model in GEE were done by Phil Wilkes (UCL). The intial development\
                      of the model was done by Ollie Baines (University of Nottingham).'}),
     ui.Label({value:'\nFor more information see Baines, O., Wilkes, P. and Disney, M., 2020.\
                      Quantifying urban forest structure with open-access remote sensing data sets.\
                      Urban Forestry & Urban Greening DOI:10.1016/j.ufug.2020.126653'}),
                      ]});
method.style().set('position', 'bottom-right')
inspectorPanel.add(method)
var email = ui.Label({value:'Dr. Phil Wilkes', targetUrl:'https://www.geog.ucl.ac.uk/people/research-staff/phil-wilkes'})
var twitter = ui.Label({value:'@kungphil', targetUrl:'https://twitter.com/kungphil'})
var contact = ui.Panel({widgets:[ui.Label({value:'Contact', style: {fontSize: '20px', fontWeight: 'bold'}}), email, twitter]})
inspectorPanel.add(contact)
var disclaimer = ui.Panel({
    widgets:
    [ui.Label({value:'Disclaimer', style: {fontSize: '18px', fontWeight: 'bold'}}),
     ui.Label({value:'This tool is experimental and is only meant to be indicative. Development is ongoing.'})]})
disclaimer.style().set('position', 'bottom-right')
inspectorPanel.add(disclaimer)
/*
 * Map setup
 */
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(-0.1077, 51.500);
mapPanel.centerObject(initialPoint, 10);
/*
 * Initialize the app
 */
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));