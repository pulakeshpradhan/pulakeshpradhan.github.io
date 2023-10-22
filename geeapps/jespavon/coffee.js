var imageVisParam = {"opacity":1,"bands":["Nit"],"min":2.3741142729018327,"max":2.4846431630363797,"palette":["ff0303","ffcd5e","98ff64","40afff","153cff"]},
    imageVisParam2 = {"opacity":1,"bands":["Nit"],"min":2.244768545115598,"max":2.4675110034043164,"palette":["ff0303","ffcd5e","98ff64","40afff","153cff"]},
    imageVisParam3 = {"opacity":1,"bands":["Nit"],"min":2.2133600334881858,"max":2.484704244521581,"palette":["ff0303","ffcd5e","98ff64","40afff","153cff"]},
    imageVisParam4 = {"opacity":1,"bands":["Nit"],"min":2.1529602436993347,"max":2.4789708669158195,"palette":["ff0303","ffcd5e","98ff64","40afff","153cff"]},
    ROI = ee.FeatureCollection("users/jespavon/Coffee_1"),
    imageVisParam5 = {"opacity":1,"bands":["Nit"],"min":2.3476777238237534,"max":2.5673042871597933,"palette":["ff0303","ffcd5e","98ff64","40afff","153cff"]};
Map.centerObject(ROI,13);
var scale = 10;
var start_date = ee.Date.fromYMD(2019,2,25);
var end_date = ee.Date.fromYMD(2019,9,25);
//var ROI = geometry
var Sentinel2 = (ee.ImageCollection('COPERNICUS/S2')
                .filterBounds(ROI)
                .filterDate(ee.Date(start_date),ee.Date(end_date))
                .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5)));
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
print('median',median)
  function getImageByIndex(roidef, index) {
    return ee.Image(roidef.toList(1, index).get(0))
  }
  var vis =  getImageByIndex(roidef,0);
  var vis2 = getImageByIndex(roidef,3);
  var vis3 = getImageByIndex(roidef,7);
  print('vis',vis)
var TCARI = median.expression(
 '3*((B6_1 - B5_1)-0.2*(B6_1 - B3_1)*(B6_1)/(B5_1))/((1 +1.6)*(B6_1 - B5_1)/(B6_1+B5_1+1.6))', {
    'B3_1': median.select('B3_1_median'),
    'B5_1': median.select('B5_1_median'),
    'B6_1': median.select('B6_1_median')})
  .rename('Tca/Os');
 var T_O = TCARI.divide(10000) 
//var Col_cosntr = ee.ImageCollection(T_O)  
print(TCARI)
// calculete the photosynthesis 
var photo = T_O.expression(
  '-2.08*B1+4.1',{
    'B1': T_O.select('Tca/Os')})
  .rename('Pht')
//Map.addLayer(photo,{},'PHOTO');
// calculete the Leaf Nitrogen
var Nit = photo.expression(
  '0.486*B1+0.686',{
    'B1': photo.select('Pht')})
  .rename('Nit')
var Col_cosntr = ee.ImageCollection(Nit) 
//Map.addLayer(Nit,{},'N(%)');
//////////////////////////////////////////////////////////////////////
//////////////////// THE SECOND COLLECTION OF ANALISIS///////////////
////////////////////////////////////////////////////////////////////
// the second Collection
var start_date1 = ee.Date.fromYMD(2019,3,1);
var end_date1 = ee.Date.fromYMD(2019,9,24);
//var ROI = geometry
var Sentinel2_2 = (ee.ImageCollection('COPERNICUS/S2')
                .filterBounds(ROI)
                .filterDate(ee.Date(start_date1),ee.Date(end_date1))
                .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10)));
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
print(roidef)
var Nitf = function(image)
{
  var TCARIf = image.expression(
 '3*((B6_1 - B5_1)-0.2*(B6_1 - B3_1)*(B6_1)/(B5_1))/((1 +1.6)*(B6_1 - B5_1)/(B6_1+B5_1+1.6))', {
    'B3_1': image.select('B3'),
    'B5_1': image.select('B5'),
    'B6_1': image.select('B6')})
  .rename('Tca/Os')
  .divide(10000);
      return image.addBands(TCARIf)
}
var Nit1 = Sentinel_collection2.map(Nitf);
print(Nit1)
var Nit2 = function(image)
{
  var photof = image.expression(
  '-2.08*B1+4.1',{
    'B1': image.select('Tca/Os')})
    .rename('Pht');
     return image.addBands(photof)
}
var Nit2 = Nit1.map(Nit2);
print(Nit2)
var Nit3 = function(image)
{
  var Nit4 = image.expression(
  '0.486*B1+0.686',{
    'B1': image.select('Pht')})
    .rename('Nit')
      return image.addBands(Nit4)
}
var Nit_Def = Nit2.map(Nit3);
print(Nit_Def)
var Col_cosntr2 = ee.ImageCollection(Nit_Def) 
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
          'Nit': vals.get('Nit')
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
var remove = meanNDVIs.select(['Nit','ID_1'])
print('Polygons fc with NI: ', meanNDVIs.limit(40));
print('remove', remove);
//var seriesChart = timeSeriesChart(Col.select('NDVI'));
//print('chart with NDVI: ',seriesChart);
// SECOND FASE
/*
 * Data sources
 */
// Constants used to visualize the data on the map.
// The median for the mount of the interest
var ghslPop = ee.Image(Nit);
Map.addLayer(ghslPop,imageVisParam5,'SEPII_N(%)')
// Sector boundary data with associated mean of the sector.
// These are Zone Farmer boundaries simplified somewhat for visualization.
var countries = remove
//stop1
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
/*
 * The chart panel in the bottom-right
 */
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
    title: 'Comparison N%',
    vAxis: {title: null},
    hAxis: {title: 'Mean  Sector N%', minValue: 0}
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
  var instructionsLabel = ui.Label('Select sector to compare NDVI.');
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
var NDVIChart = ui.Chart.image.series(Col_cosntr2.select('Nit'), point.buffer(10), ee.Reducer.mean(), 10);
  NDVIChart.setOptions({
    title: 'Leaf N (%)',
    vAxis: {title: 'N (%)', maxValue: 2.8, minValue: 2.3},
    hAxis: {title: 'date', gridlines: {count: 7}},
  });
  panel.widgets().set(1, NDVIChart);
});
///format: 'MM-yy'
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);