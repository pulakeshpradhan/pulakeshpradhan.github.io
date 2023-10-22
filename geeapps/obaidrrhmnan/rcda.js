/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[70.27025645404372, 29.384870724490604],
          [70.79342374760148, 27.937330286953372],
          [73.92989671169708, 30.08577257454458],
          [74.63922057263164, 31.919969174591973],
          [73.30760607101588, 32.25388011485754],
          [72.57177482994314, 31.694647370772593],
          [70.32374709191619, 30.676704980343562]]]),
    imageVisParam = {"opacity":0.01,"gamma":0.1},
    table = ee.FeatureCollection("users/obaidrrhmnan/ryk"),
    table2 = ee.FeatureCollection("users/obaidrrhmnan/bwp"),
    image = ee.Image("users/obaidrrhmnan/rcdabwpmar2020"),
    image2 = ee.Image("users/obaidrrhmnan/rcdamultanmar2020");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var bound = table2;
//Engine App
var layers = image.addBands(image2);
//var layer = ee.Image('users/obaidrrhmnan/rcdabwpmar2020');
//var image = ee.Image('users/obaidrrhmnan/rcdabwpmar2020');
/*
var layer = {
  March132020: [ee.Image('users/obaidrrhmnan/rcdabwpmar2020')],
  March192020: [ee.Image('users/obaidrrhmnan/multangarlci2020')],
};*/
var layerProperties = {
  'RCDA_Bahwalpur_March2020': {
    name: 'classification',
    visParams: {min: 1, max: 5, palette: ['c80b18', 'd6871a', 'e5ed12', '8fd627', '8fd627']},
    legend: [
      {'Sever Damage': 'c80b18'}, {'Moderate Damage': 'd6871a'}, {'low Damage': 'e5ed12'},
      {'No loss': '8fd627'}
    ],
    defaultVisibility: true
  },
  'RCDA_Multan_March2020': {
    name: 'classification_1',
    visParams: {min: 1, max: 5, palette: ['c80b18', 'd6871a', 'e5ed12', '8fd627', '8fd627']},
    legend: [
      {'Sever Damage': 'c80b18'}, {'Moderate Damage': 'd6871a'}, {'low Damage': 'e5ed12'},
      {'No loss': '8fd627'}
    ],
    defaultVisibility: false
  },
};
print(layers);
// Some pre-set locations of interest that will be loaded into a pulldown menu.
var locationDict = {
  'Bahwalpur': {lon: 71.31001, lat: 28.86710, zoom: 9},
  'Multan': {lon: 71.54786, lat: 30.23373, zoom: 9},
  'hotspot_1_BWP': {lon: 71.5544, lat: 28.9741, zoom: 12},
  'hotspot_2_BWP': {lon: 71.31002, lat: 28.86709, zoom: 12},
  'hotspot_1_MTn': {lon: 71.59752, lat: 30.35052, zoom: 12}
};
// Create a map panel.
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
// Center the map
var defaultLocation = locationDict['Bahwalpur'];
mapPanel.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add layers to the map and center it.
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = layers.select(layer.name).visualize(layer.visParams);
  //var masked = addZeroAndWaterMask(image, hansen.select(layer.name));
  mapPanel.add(ui.Map.Layer(image, {}, key, layers.defaultVisibility));
}
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Rapid Crop Damage Assesment', {fontSize: '24px', color: 'red'});
var text = ui.Label(
    'Vegetation Loss due to Rains/Hail storms During March 2020.',
    {fontSize: '20px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
/*
// Create a hyperlink to an external reference.
var link = ui.Label(
    'Contact xyz', {},
    'http://doc ....');
var linkPanel = ui.Panel(
    [ui.Label('For more information', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);*/
// Create a layer selector pulldown.
// The elements of the pulldown are the keys of the layerProperties dictionary.
var selectItems = Object.keys(layerProperties);
// Define the pulldown menu.  Changing the pulldown menu changes the map layer
// and legend.
var layerSelect = ui.Select({
  items: selectItems,
  value: selectItems[0],
  onChange: function(selected) {
    // Loop through the map layers and compare the selected element to the name
    // of the layer. If they're the same, show the layer and set the
    // corresponding legend.  Hide the others.
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName());
    });
    setLegend(layerProperties[selected].legend);
  }
});
// Add the select to the toolPanel with some explanatory text.
toolPanel.add(ui.Label('Select Layer', {'font-size': '20px'}));
toolPanel.add(layerSelect);
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '10px', margin: '0 0 0 8px', padding: '0'}
});
toolPanel.add(legendPanel);
var legendTitle = ui.Label(
    'Legend',
    {fontWeight: 'bold', fontSize: '10px', margin: '0 0 4px 0', padding: '0'});
legendPanel.add(legendTitle);
// Define an area for the legend key itself.
// This area will be replaced every time the layer pulldown is changed.
var keyPanel = ui.Panel();
legendPanel.add(keyPanel);
function setLegend(legend) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
  keyPanel.clear();
  for (var i = 0; i < legend.length; i++) {
    var item = legend[i];
    var name = Object.keys(item)[0];
    var color = item[name];
    var colorBox = ui.Label('', {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0'
    });
    // Create the label with the description text.
    var description = ui.Label(name, {margin: '0 0 4px 6px'});
    keyPanel.add(
        ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
  }
}
// Set the initial legend.
setLegend(layerProperties[layerSelect.getValue()].legend);
//
// Create a visibility checkbox and an opacity slider.
//
// If the checkbox is clicked off, disable the layer pulldown and turn all the
// layers off. Otherwise, enable the select, and turn on the selected layer.
var checkbox = ui.Checkbox({
  label: 'Opacity',
  value: true,
  onChange: function(value) {
    var selected = layerSelect.getValue();
    // Loop through the layers in the mapPanel. For each layer,
    // if the layer's name is the same as the name selected in the layer
    // pulldown, set the visibility of the layer equal to the value of the
    // checkbox. Otherwise, set the visibility to false.
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName() ? value : false);
    });
    // If the checkbox is on, the layer pulldown should be enabled, otherwise,
    // it's disabled.
    layerSelect.setDisabled(!value);
  }
});
// Create an opacity slider. This tool will change the opacity for each layer.
// That way switching to a new layer will maintain the chosen opacity.
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
});
opacitySlider.onSlide(function(value) {
  mapPanel.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
var viewPanel =
    ui.Panel([checkbox, opacitySlider], ui.Panel.Layout.Flow('horizontal'));
toolPanel.add(viewPanel);
// Create the location pulldown.
var locations = Object.keys(locationDict);
var locationSelect = ui.Select({
  items: locations,
  value: locations[0],
  onChange: function(value) {
    var location = locationDict[value];
    mapPanel.setCenter(location.lon, location.lat, location.zoom);
  }
});
var locationPanel = ui.Panel([
  ui.Label('Select Hotspots', {'font-size': '24px'}), locationSelect
]);
toolPanel.add(locationPanel);