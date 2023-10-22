var geometry = ui.import && ui.import("geometry", "table", {
      "id": "users/grettelvargas/LIMITE_GAM_OFICIAL"
    }) || ee.FeatureCollection("users/grettelvargas/LIMITE_GAM_OFICIAL");
// Example script showing how to create a bar chart
// with each bar having a different color.
// We create a map of forest loss with each pixel 
// colored accoridng to the year in which the loss occurred.
// The chart displays the total loss in the region by year
// with the color or the bar matching the map.
// Select a region
// Get the Hansen Global Forest Change dataset
// This dataset is updated yearly, so we get the latest version.
var gfc2022 = ee.Image('UMD/hansen/global_forest_change_2022_v1_10');
var lossYear = gfc2022.select(['lossyear']);
// The lossYear image contains pixel values from 0 to 22
// indicating the year in which the loss occurred
// We visualize this layer on the map.
var palette = [
  '0083ba', '#4394b6', '#5ca5b2', '#74b6ad', '#8dc8a9',
  '#a5d9a5', '#b7e2a8', '#c7e8ad', '#d7efb2', '#e7f5b7',
  '#f7fcbc', '#fff7b6', '#fee8a4', '#fed890', '#fec980',
  '#fdba6e', '#fba75e', '#f48b51', '#ed6e43', '#e5522a',
  '#de3519', '#d7191c'];
var lossYearVis = {
  min: 0,
  max: 22,
  palette: palette
}
// Visualize the loss on the map
Map.centerObject(geometry, 10);
Map.setOptions('SATELLITE');
Map.addLayer(geometry, {color:'white'}, 'GAM', true, 0.3);
Map.addLayer(lossYear.clip(geometry), lossYearVis, 'Pérdidas de cobertura');
// Create an area image and convert to Hectares
var areaImage = ee.Image.pixelArea().divide(1e5);
// Add the band containing yearly loss
var areaImageWithYear = areaImage.addBands(lossYear);
var areas = areaImageWithYear.reduceRegion({
  reducer: ee.Reducer.sum().group({
    groupField: 1,
    groupName: 'year'
    }),
  geometry: geometry,
  scale: 30,
  maxPixels: 1e10
});
var yearAreas = ee.List(areas.get('groups'));
// Process results to extract the areas and
// create a list
var yearAreasList = ee.List(yearAreas.map(function(item) {
  var areaDict = ee.Dictionary(item);
  var yearString = ee.Number(areaDict.get('year')).format('20%02d');
  var area = ee.Number(
    areaDict.get('sum'));
  return ee.List([yearString, area])
}));
print('Year Areas', yearAreasList);
// We create a list of rows in the DataTable format
var rowList = yearAreasList.map(function(item) {
  var year = ee.List(item).get(0);
  var x = ee.String('Date(')
    .cat(year)
    .cat(', ')
    .cat('0')
    .cat(', ')
    .cat('1')
    .cat(ee.String(')'))
  var y = ee.List(item).get(1);
  // We will assign the color to each year from the palette
  var color = ee.List(palette).get(yearAreasList.indexOf(item));
  var rowDict = {
    c: [{v: x}, {v: y}, {v: color}]
  };
  return rowDict;
});
print('Rows', rowList);
// Create the DataTable
rowList.evaluate(function(rowListClient) {
  var dataTable = {
    cols: [
      {id: 'x', type: 'date'},
      {id: 'y', label: 'area', type: 'number'},
      {id: 'style', label: 'Style', type: 'string', role: 'style'},
    ],
    rows: rowListClient
  };
  var options = {
    title: 'Pérdida de masa forestal anual',
    vAxis: {
      title: 'Area (Hectares)', 
    },
    hAxis: {
      title: 'Year',
      gridlines: {color: 'transparent'}
    },
    legend: {position:'none'},
    height: '400px',
    width: '300px'
  };
  var chart = ui.Chart(dataTable, 'ColumnChart', options);
  // Add the chart on the map
  var chartPanel = ui.Panel({
    style: {width: '400px', position: 'bottom-left'}
  });
  chartPanel.add(chart);
  Map.add(chartPanel);
});
///////////////////////////////////////////////////////////////
//      3) Set up panels and widgets for display             //
///////////////////////////////////////////////////////////////
//3.1) Set up title and summary widgets
//App title
var header = ui.Label('Visor Masa Forestal', {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
//App summary
var text = ui.Label(
  'Results from time-series analysis of Landsat images in characterizing global forest extent and change.. ' 
 );
//3.2) Create a panel to hold text
var panel = ui.Panel({
  widgets:[header, text],//Adds header and text
  style:{width: '200px',position:'bottom-right'}});
//3.3) Create variable for additional text and separators
//This creates another panel to house a line separator and instructions for the user
var intro = ui.Panel([
  ui.Label({
    value: '____________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  }),
  ui.Label({
    value:'Select layers to display.',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })]);
//Add this new panel to the larger panel we created 
panel.add(intro)
//3.4) Add our main panel to the root of our GUI
ui.root.insert(1,panel)