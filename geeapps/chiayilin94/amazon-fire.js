// Fire map using data from NASA FIRMS, comparing the fire extent and intensity
// of 2018 and 2019. Author: Joanna Lin. Email: chiayilin94@gmail.com.
/*
 * Configure layers and visualization parameters.
 */
var fire2019 = ee.ImageCollection('FIRMS').filter(
    ee.Filter.date('2019-07-01', '2019-08-31')).select('T21').max();
var fire2018 = ee.ImageCollection('FIRMS').filter(
    ee.Filter.date('2018-07-01', '2018-08-31')).select('T21').max();
var fireLegend = [
      {'100°C': 'red'}, {'...': 'orange'}, {'236°C': 'yellow'},
    ];
var layerProperties = {
  'Fire 2019': {
    name: 'Fire',
    selectedImage: fire2019,
    visParams: {min: 373.0, max: 509.0, palette: ['red', 'orange', 'yellow'],},
    legend: fireLegend,
    defaultVisibility: true
  },
  'Fire 2018': {
    name: 'Fire',
    selectedImage: fire2018,
    visParams: {min: 373.0, max: 509.0, palette: ['red', 'orange', 'yellow'],},
    legend: fireLegend,
    defaultVisibility: true
  },
};
/*
 * Map panel configuration
 */
// Create map panels.
var map2019 = ui.Map({style: {width: '65%'}});
setupMap(map2019, '2019', 'top-right');
var map2018 = ui.Map();
setupMap(map2018, '2018', 'top-left');
function setupMap(map, labelTxt, position) {
  // Take all tools off the map except the zoom and mapTypeControl tools.
  map.setControlVisibility(false);
  // Center the map
  map.setCenter(-63.01, -8.75, 5);
  map.setOptions('HYBRID');
  var label = ui.Label(labelTxt);
  var labelPanel =
      ui.Panel({
        widgets: [label], 
        style: {position: position, padding: '0'}});
  map.add(labelPanel);
}
/*
 * Tie everything together
 */
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: map2018,
  secondPanel: map2019,
  wipe: true,
  style: {stretch: 'both'}
});
var linker = ui.Map.Linker([map2018, map2019]);
var fireLayer2019 = layerProperties['Fire 2019'];
var fireImg2019 = fireLayer2019.selectedImage
  .visualize(fireLayer2019.visParams);
map2019.add(
  ui.Map.Layer(
  fireImg2019, {}, 'Fire 2019', fireLayer2019.defaultVisibility));
var fireLayer2018 = layerProperties['Fire 2018'];
var fireImg2018 = fireLayer2018.selectedImage
    .visualize(fireLayer2018.visParams);
map2018.add(
  ui.Map.Layer(
    fireImg2018, {}, 'Fire 2018', fireLayer2018.defaultVisibility));
/*
 * Additional component configuration
 */
// Add a title and some explanatory text to a side panel.
var header = ui.Label(
  '2019年7至8月亞馬遜大火 The Amazonian Fires', {fontSize: '24px', color: 'red'});
var chineseText = ui.Label(
  '利用NASA衛星影像系統FIRMS所偵測的2018及2019年7至8月大火，顯示亞馬遜叢林火災' +
  '的發生地點以及燃燒溫度。左圖為2018年同一時段大火，可見燃燒範圍較小。',
  {fontSize: '15px'});
var engText = ui.Label(
  'The near real-time active fire maps with FIRMS dataset from July to August ' +
  'in 2018 (left) and 2019 (right), showing an increased fire extent this year.',
  {fontSize: '15px'});
var articleText = ui.Label(
  '閱讀Medium文章：亞馬遜雨林的悲歌', {fontSize: '15px'},
  'https://medium.com/@chiayilin94/%E4%BA%9E%E9%A6%AC%E9%81%9C%E9%9B%A8%E6%9E%97%E7%9A%84%E6%82%B2%E6%AD%8C-a0fa1a4aff58');
var toolPanel = ui.Panel(
  [header, chineseText, engText, articleText], 'flow', {width: '25%'});
// Add the select to the toolPanel with some explanatory text.
toolPanel.add(ui.Label('溫度 Temperature', {'font-size': '20px'}));
// Create the legend.
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '10px', margin: '0 0 0 8px', padding: '0'}
});
toolPanel.add(legendPanel);
var legendTitle = ui.Label(
    '攝氏 Celsius',
    {fontWeight: 'bold', fontSize: '14px', margin: '0 0 4px 0', padding: '0'});
legendPanel.add(legendTitle);
// Set the legend.
for (var i = 0; i < fireLegend.length; i++) {
  var item = fireLegend[i];
  var name = Object.keys(item)[0];
  var color = item[name];
  var colorBox = ui.Label('', {
    backgroundColor: color,
    // Use padding to give the box height and width.
    padding: '8px',
    margin: '0'
  });
  // Create the label with the description text.
  var description = ui.Label(name, {margin: '0 0 4px 6px', fontSize: '12px'});
  legendPanel.add(
      ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
}
// Create a hyperlink to an external reference.
var link = ui.Label(
  'NASA Fire Information for Resource Management System (FIRMS).', {},
  'https://earthdata.nasa.gov/earth-observation-data/near-real-time/firms/about-firms');
var linkPanel = ui.Panel(
  [ui.Label('參考資料 References', {fontSize: '20px',}), link]);
var sourceCode = ui.Label(
  'Source Code by Joanna Lin on Google Earth Engine.', {},
  'https://code.earthengine.google.com/30dd875263e7f8e128e7ceb1c009b022');
toolPanel.add(linkPanel);
toolPanel.add(sourceCode);
// Add the splitPanel and toolPanel to the UI root.
ui.root.widgets().reset([splitPanel, toolPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));