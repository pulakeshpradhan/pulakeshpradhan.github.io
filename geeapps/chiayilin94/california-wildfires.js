/**
 * Fire map using data from NASA FIRMS, comparing the fire extent and intensity
 * of 2019 and 2020. Author: Joanna Lin. Email: chiayilin94@gmail.com.
 */
var styles = require('users/chiayilin94/module:styles');
/**
 * Configure layers and visualization parameters.
 */
var fire2019 = ee.ImageCollection('FIRMS').filter(
    ee.Filter.date('2020-07-01', '2020-09-30')).select('T21').max();
var fire2018 = ee.ImageCollection('FIRMS').filter(
    ee.Filter.date('2019-07-01', '2019-09-30')).select('T21').max();
var fireLegend = [
      {'100°C': 'red'}, {'168°C': 'orange'}, {'236°C': 'yellow'},
    ];
var layerProperties = {
  'Fire 2020': {
    name: 'Fire',
    selectedImage: fire2019,
    visParams: {min: 373.0, max: 509.0, palette: ['red', 'orange', 'yellow'],},
    legend: fireLegend,
    defaultVisibility: true
  },
  'Fire 2019': {
    name: 'Fire',
    selectedImage: fire2018,
    visParams: {min: 373.0, max: 509.0, palette: ['red', 'orange', 'yellow'],},
    legend: fireLegend,
    defaultVisibility: true
  },
};
/**
 * Map panel configuration
 */
// Create map panels.
var map2020 = ui.Map({style: {width: '90%'}});
setupMap(map2020, '2020', 'top-right');
var map2019 = ui.Map();
setupMap(map2019, '2019', 'top-left');
function setupMap(map, labelTxt, position) {
  // Take all tools off the map except the zoom and mapTypeControl tools.
  map.setControlVisibility(false);
  // Center the map
  map.setCenter(-118.663, 37.101, 6);
  map.setOptions('Dark', styles.getDarkBasemap());
  var label = ui.Label(labelTxt);
  var labelPanel =
      ui.Panel({
        widgets: [label], 
        style: {position: position, padding: '0'}});
  map.add(labelPanel);
}
/**
 * Tie everything together
 */
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: map2019,
  secondPanel: map2020,
  wipe: true,
  style: {stretch: 'both'}
});
var linker = ui.Map.Linker([map2019, map2020]);
var fireLayer2020 = layerProperties['Fire 2020'];
var fireImg2020 = fireLayer2020.selectedImage
  .visualize(fireLayer2020.visParams);
map2020.add(
  ui.Map.Layer(
  fireImg2020, {}, 'Fire 2020', fireLayer2020.defaultVisibility));
var fireLayer2019 = layerProperties['Fire 2019'];
var fireImg2019 = fireLayer2019.selectedImage
    .visualize(fireLayer2019.visParams);
map2019.add(
  ui.Map.Layer(
    fireImg2019, {}, 'Fire 2019', fireLayer2019.defaultVisibility));
/**
 * Additional component configuration
 */
// Add a title and some explanatory text to a side panel.
var header = ui.Label(
  '2020年7至9月加州野火 Wildfires in California',
  {fontSize: '24px', color: '#900C3F', fontFamily: 'system-ui', fontWeight: 500});
var chineseText = ui.Label(
  '利用NASA衛星影像系統FIRMS所偵測的2019及2020年7至9月大火，顯示加州森林野火' +
  '的發生地點以及燃燒溫度。左圖為2019年同一時段大火，可見燃燒範圍較小。',
  {fontSize: '15px', fontFamily: 'system-ui', color: '#3C3E3E'});
var engText = ui.Label(
  'The near real-time active fire maps with FIRMS dataset from July to September ' +
  'in 2019 (left) and 2020 (right), showing an increased fire extent this year.',
  {fontSize: '15px', fontFamily: 'system-ui', color: '#3C3E3E'});
var articleText = ui.Label(
  '閱讀Medium文章：2020 加州森林野火', {fontSize: '15px', fontFamily: 'system-ui'},
  'https://medium.com/@chiayilin94/2020-%E5%8A%A0%E5%B7%9E%E9%87%8E%E7%81%AB-af97b699e1af');
var toolPanel = ui.Panel(
  [header, chineseText, engText, articleText], 'flow',
  {width: '25%', padding: '10px'});
// Add the select to the toolPanel with some explanatory text.
toolPanel.add(ui.Label(
  '溫度 Temperature',
  {'font-size': '18px', color: '#900C3F', fontWeight: 400}
));
// Create the legend.
var legendPanel = ui.Panel({
  style: {
    fontWeight: 'bold',
    fontSize: '10px',
    fontFamily: 'system-ui',
    margin: '0 0 0 8px',
    padding: '0',
  }
});
toolPanel.add(legendPanel);
var legendTitle = ui.Label(
  '攝氏 Celsius', {
    fontWeight: 'bold',
    fontSize: '14px',
    fontFamily: 'system-ui',
    margin: '0 0 4px 0',
    padding: '0',
    color: '#3C3E3E',
});
legendPanel.add(legendTitle);
// Set up the legend.
for (var i = 0; i < fireLegend.length; i++) {
  var item = fireLegend[i];
  var name = Object.keys(item)[0];
  var color = item[name];
  var colorBox = ui.Label('', {
    backgroundColor: color,
    // Use padding to give the box height and width.
    padding: '8px',
    margin: '0',
    color: '#3C3E3E',
  });
  // Create the label with the description text.
  var description = ui.Label(name, {
    margin: '0 0 4px 6px', fontFamily: 'system-ui', fontSize: '12px', color: '#3C3E3E'});
  legendPanel.add(
      ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
}
// Create a hyperlink to an external reference.
var link = ui.Label(
  'NASA Fire Information for Resource Management System (FIRMS).', {},
  'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/about-firms');
var linkPanel = ui.Panel([ui.Label('參考資料 References',
  {fontSize: '18px', fontFamily: 'system-ui', color: '#900C3F', fontWeight: 400}), link]);
var sourceCode = ui.Label(
  'Source Code by Joanna Lin on Google Earth Engine.', {},
  'https://code.earthengine.google.com/2450795c439d3c4cdb85d15c55560e69');
toolPanel.add(linkPanel);
toolPanel.add(sourceCode);
// Add the splitPanel and toolPanel to the UI root.
ui.root.widgets().reset([splitPanel, toolPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));