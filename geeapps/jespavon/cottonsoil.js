var imageVisParam3 = {"opacity":1,"bands":["W C"],"min":0.20097432077036176,"max":0.40346536595837296,"palette":["ff2b09","ffcb3a","aaffa4","36abff","1733ff"]},
    imageVisParam = {"opacity":1,"bands":["W C"],"min":0.1381550903410732,"max":0.3305542723409883,"palette":["ff2b09","ffcb3a","aaffa4","36abff","1733ff"]},
    ROI = ee.FeatureCollection("users/jespavon/Cotton");
Map.centerObject(ROI,13);
var scale = 10;
var start_date = ee.Date.fromYMD(2018,1,15);
var end_date = ee.Date.fromYMD(2018,9,1);
//var ROI = geometry
var Sentinel2 = (ee.ImageCollection('COPERNICUS/S2')
                .filterBounds(ROI)
                .filterDate(ee.Date(start_date),ee.Date(end_date))
                .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 80)));
                //.reduce(ee.Reducer.median()));
//print(Sentinel2 )
//CloudMask
var cloudMask = function(image){
    var mask = image.mask().and((image.select('QA60').gte(1024)).not()).select([0], ["cloud"])
    return image.updateMask(mask)
}
// remove clouds for all images
var Sentinel_collection = Sentinel2.map(cloudMask);   
print(Sentinel_collection);
var clip = function(image)
{
    var select = Sentinel_collection//.select ('B2')
    var roi = image.clip(ROI)
       return image.addBands(roi)
}
var roidef = (Sentinel_collection.map(clip));
//var select1 = roidef.select('B2_1');
print(roidef)
var median = roidef.reduce(ee.Reducer.median());
//print('median',median)
  function getImageByIndex(roidef, index) {
    return ee.Image(roidef.toList(1, index).get(0))
  }
  var vis =  getImageByIndex(roidef,0);
  var vis2 = getImageByIndex(roidef,3);
  var vis3 = getImageByIndex(roidef,7);
//  print('vis',vis)
//Map.addLayer(vis) 
// calculete the variable STR
var STR = median.expression(
 '(1)/(B12_1)',{
    'B12_1': median.select('B12_1_median'),
    })
  .rename('STR')
  //.divide(1000);
var NDVI = median.expression(
 '(B8_1-B4_1)/(B8_1+B4_1)', {
    'B4_1': median.select('B4_1_median'),
    'B8_1': median.select('B8_1_median')})
  .rename('NDVI');
var w = NDVI.addBands(STR)
 //var STR_1 = TCARI.divide(10000) 
//var Col_cosntr = ee.ImageCollection(T_O)  
//print(STR)
//print(NDVI)
//print(w)
//Map.addLayer(NDVI,{},'NDVI')
//Map.addLayer(STR,{},'STR')
var w_p = w.expression(
 '(0.16 + 2.9*(NDVI-STR))/((0.16-2.7)+((2.9-7.1)*NDVI))', {
    'STR': w.select('STR'),
    'NDVI': w.select('NDVI')})
  .rename('W C')
  .multiply(-1);
//Map.addLayer(w_p,{},'wp_1');
var w_def = w_p
Map.addLayer(w_def,imageVisParam,'OPTRAM_May15_June01');
// calculete the soil moisture
var Col_cosntr = ee.ImageCollection(w_def) 
//Map.addLayer(Nit,{},'N(%)');
//////////////////////////////////////////////////////////////////////
//////////////////// THE SECOND COLLECTION OF ANALISIS///////////////
////////////////////////////////////////////////////////////////////
// the second Collection
var start_date1 = ee.Date.fromYMD(2018,1,15);
var end_date1 = ee.Date.fromYMD(2018,9,15);
//var ROI = geometry
var Sentinel2_2 = (ee.ImageCollection('COPERNICUS/S2')
                .filterBounds(ROI)
                .filterDate(ee.Date(start_date1),ee.Date(end_date1))
                .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)));
//CloudMask
var cloudMask = function(image){
    var mask = image.mask().and((image.select('QA60').gte(1024)).not()).select([0], ["cloud"])
    return image.updateMask(mask)
}
// remove clouds for all images
var Sentinel_collection2 = Sentinel2_2.map(cloudMask);   
print(Sentinel_collection2);
var clip = function(image)
{
    var select = Sentinel2_2//.select ('B2')
    var roi = image.clip(ROI)
       return image.addBands(roi)
}
var roidef = (Sentinel_collection2.map(clip));
//var select1 = roidef.select('B2_1');
//print('roidef',roidef)
var STRf = function(image)
{
  var Strf = image.expression(
 '(1)/(B12_1)', {
    'B12_1': image.select('B12_1')})
    .rename('STRf')
    //.divide(10000);
      return image.addBands(Strf)
}
var STRf1 = roidef.map(STRf);
//print(STRf1)
var NDVI2 = function(image)
{
  var NDVIf = image.expression(
  '(B8_1-B4_1)/(B8_1+B4_1)',{
    'B8_1': image.select('B8_1'),
    'B4_1': image.select('B4_1')})
    .rename('NDVI2');
     return image.addBands(NDVIf)
}
var NDVI3 = STRf1.map(NDVI2);
//print(NDVI3)
var wp1 = function(image)
{
  var wpf = image.expression(
  '(0.16 + 2.9*(NDVI2-STRf))/((0.16-2.7)+((2.9-7.1)*NDVI2))',{
    'NDVI2': image.select('NDVI2'),
    'STRf': image.select('STRf')})
    .rename('W C')
    .multiply(-1)
      return image.addBands(wpf)
}
var wpf1 = NDVI3.map(wp1);
//print(wpf1)
/*
var wp2 = function(image)
{
  var wpf2 = image.expression(
  '((0.000181*w_p)+0.0417)',{
    'w_p': image.select('W_P')})
    .rename('w_p')
      return image.addBands(wpf2)
}
var wpf2 = wpf1.map(wp2);
print(wpf2)
*/
var Col_cosntr2 = ee.ImageCollection(wpf1);
/// Stop1
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
/////////////////// The functions ////////////////////////////////////
////////////////////////////////////////////////////////////////////
// //This function extracts mean pixel values and date for each feature in a feature collection 
// //Then iterates over entire image collection. Returns a feature collection
function meanValCol(fc, collection) {
 var newfc = fc.map(function(feature) {
    return  collection.filterBounds(feature.geometry()).map(function(img) {
      var vals = img.reduceRegion({
        reducer: 'mean',
        geometry: feature.geometry(),
        scale: scale
      });
       return feature.set({
          //'date': img.date(),
          //'image': img.id(),
          'W C': vals.get('W C')
     });
     });
   }).flatten();
     return newfc;
 }
///// return collection.filterBounds(feature.geometry()).map(function(img) {
/////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// function of the mosaic
function mosaicByTime(images) {
  var TIME_FIELD = 'system:time_start';
  var distinct = images.distinct([TIME_FIELD]);
  var filter = ee.Filter.equals({ leftField: TIME_FIELD, rightField: TIME_FIELD });
  var join = ee.Join.saveAll('matches');
  var results = join.apply(distinct, images, filter);
  // mosaic
  results = results.map(function(i) {
    var mosaic = ee.ImageCollection.fromImages(i.get('matches')).sort('system:index').mosaic();
    return mosaic.copyProperties(i).set(TIME_FIELD, i.get(TIME_FIELD));
  });
  return ee.ImageCollection(results);
}
////////////////////////////////////////////////////
///////////////////// function of the generation of the chart
var meanNDVIs = meanValCol(ROI,Col_cosntr);
var remove = meanNDVIs.select(['W C','ID_1'])
//print('Polygons fc with NI: ', meanNDVIs.limit(40));
//print('remove', remove);
//var seriesChart = timeSeriesChart(Col.select('NDVI'));
//print('chart with NDVI: ',seriesChart);
// SECOND FASE
// Constants used to visualize the data on the map.
// The median for the mount of the interest
//var ghslPop = ee.Image(Nit);
//Map.addLayer(ghslPop,imageVisParam)
// Sector boundary data with associated mean of the sector.
// These are Zone Farmer boundaries simplified somewhat for visualization.
//stop1
var countries = remove
var COUNTRIES_STYLE = {color: '26458d', fillColor: '00000000'};
var HIGHLIGHT_STYLE = {color: '8856a7', fillColor: '8856a7C0'};
//var undoColorStretch = imageVisParam;
var POPULATION_STYLE = {
  min: 0,
  max: 1,
  palette: ['lightyellow', 'steelblue', 'darkblue']
};
// Configure our map with a minimal set of controls.
// Configure our map with a minimal set of controls.
Map.setControlVisibility(true);
Map.setControlVisibility({scaleControl: true, zoomControl: true});
Map.style().set({cursor: 'crosshair'});
//Map.setCenter(0, 20, 3);
// Add our two base layers to the map: global population density and countries.
//Map.addLayer(ghslPop,imageVisParam);
Map.addLayer(countries.style(COUNTRIES_STYLE));
// Create the application title bar.
//Map.add(ui.Label('Aistech Mean NDVI', {fontWeight: 'bold', fontSize: '24px'}));
//The chart panel in the bottom-right
//stop 2
// A list of points the user has clicked on, as [lon,lat] tuples.
var selectedPoints = [];
// Returns the list of countries the user has selected.
function getSelectedCountries() {
  return countries.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
}
// Makes a bar chart of the given FeatureCollection of Zone by name.
function makeResultsBarChart(countries) {
  var chart = ui.Chart.feature.byFeature(countries, 'ID_1');
  chart.setChartType('BarChart');
  chart.setOptions({
    title: 'Comparison soil moisture',
    vAxis: {title: null},
    hAxis: {title: 'Mean cm3/cm3', minValue: 0}
  });
  chart.style().set({stretch: 'vertical'});
  return chart;
}
// Makes a table of the given FeatureCollection of Zone by Sector.
function makeResultsTable(countries) {
  var table = ui.Chart.feature.byFeature(countries, 'ID_1');
  table.setChartType('Table');
  table.setOptions({allowHtml: true, pageSize: 5});
  table.style().set({stretch: 'both'});
  return table;
}
// Updates the map overlay using the currently-selected countries.
function updateOverlay() {
  var overlay = getSelectedCountries().style(HIGHLIGHT_STYLE);
  Map.layers().set(2, ui.Map.Layer(overlay));
}
// Updates the chart using the currently-selected charting function,
function updateChart() {
  var chartBuilder = chartTypeToggleButton.value;
  var chart = chartBuilder(getSelectedCountries());
  resultsPanel.clear().add(chart).add(buttonPanel);
}
// Clears the set of selected points and resets the overlay and results
// panel to their default state.
function clearResults() {
  selectedPoints = [];
  Map.layers().remove(Map.layers().get(2));
  var instructionsLabel = ui.Label('Select sector to compare soil moisture');
  resultsPanel.widgets().reset([instructionsLabel]);
}
// Register a click handler for the map that adds the clicked point to the
// list and updates the map overlay and chart accordingly.
function handleMapClick(location) {
  selectedPoints.push([location.lon, location.lat]);
  updateOverlay();
  updateChart();
}
Map.onClick(handleMapClick);
// A button widget that toggles (or cycles) between states.
// To construct a ToggleButton, supply an array of objects describing
// the desired states, each with 'label' and 'value' properties.
function ToggleButton(states, onClick) {
  var index = 0;
  var button = ui.Button(states[index].label);
  button.value = states[index].value;
  button.onClick(function() {
    index = ++index % states.length;
    button.setLabel(states[index].label);
    button.value = states[index].value;
    onClick();
  });
  return button;
}
// Our chart type toggle button: the button text is the opposite of the
// current state, since you click the button to switch states.
var chartTypeToggleButton = ToggleButton(
    [
      {
        label: 'Display results as table',
        value: makeResultsBarChart,
      },
      {
        label: 'Display results as chart',
        value: makeResultsTable,
      }
    ],
    updateChart);
// A panel containing the two buttons .
var buttonPanel = ui.Panel(
    [ui.Button('Clear results', clearResults), chartTypeToggleButton],
    ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '400px'});
var resultsPanel = ui.Panel({style: {position: 'bottom-right'}});
Map.add(resultsPanel);
clearResults();
/// the second Graph
// Create User Interface portion --------------------------------------------------
// Create a panel to hold our widgets.
var mapPanel = ui.Map();
var panel = ui.Panel();
panel.style().set('width', '200px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Space inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to inspect.')
]);
panel.add(intro);
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(2, dot)
var NDVIChart = ui.Chart.image.series(Col_cosntr2.select('W C'), point.buffer(10), ee.Reducer.mean(), 10);
  NDVIChart.setOptions({
    title: 'soil moisture ',
    vAxis: {title: 'cm3/cm3', maxValue: 0.5, minValue: 0.1},
    hAxis: {title: 'date', gridlines: {count: 7}},
  });
  panel.widgets().set(1, NDVIChart);
});
///format: 'MM-yy'
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);