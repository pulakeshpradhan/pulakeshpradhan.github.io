var image11 = ui.import && ui.import("image11", "image", {
      "id": "users/rogersckw9/vegetatie-monitor-testing/classified-image-annual-ahn3-filter-ecotope-11-class-2017"
    }) || ee.Image("users/rogersckw9/vegetatie-monitor-testing/classified-image-annual-ahn3-filter-ecotope-11-class-2017"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "users/rogersckw9/vegetatie-monitor-testing/classified-image-annual-ahn3-filter-ecotope-6-class-2017"
    }) || ee.Image("users/rogersckw9/vegetatie-monitor-testing/classified-image-annual-ahn3-filter-ecotope-6-class-2017"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "users/rogersckw9/vegetatie-monitor-testing/classified-image-annual-ahn3-filter-ecotope-7-class-2017"
    }) || ee.Image("users/rogersckw9/vegetatie-monitor-testing/classified-image-annual-ahn3-filter-ecotope-7-class-2017");
var data = ee.Image([image11,image7,image6]).rename(['elevenClass', 'sevenClass', 'sixClass'])
// Demonstrates how to efficiently display a number of layers of a dataset along
// with a legend for each layer, and some visualization controls.
// Configure layers
var elevenPalette = [
  '#80b1d3', // blue
  '#d9d9d9', // gray
  '#fb8072', // coral
  '#ffffb3', // light yellow
  '#ccebc5', // light green
  '#b3de69', // green
  '#fccde5', // pink
  '#bebada', // light purple
  '#bc80bd', // dark purple
  '#8dd3c7', // aqua
  '#fdb462' // orange
]
var sevenPalette =  ["#BDEEFF", "#d9d9d9", "#FF817E", "#EEFAD4", "#DEBDDE", "#73BF73", "#D97A36"]
var sixPalette = ["#BDEEFF", "#FF817E", "#EEFAD4", "#DEBDDE", "#73BF73", "#D97A36"]
var layerProperties = {
  '11 Class': {
    name: 'elevenClass',
    visParams: {min: 1, max: 11, palette: elevenPalette},
    legend: [
      {'Water': '#80b1d3'}, {'Bebouwd/verhard': '#d9d9d9'}, {'Onbegroeid natuurlijk substraat': '#fb8072'},
      {'Akker': '#ffffb3'}, {'Pioniervegetatie': '#ccebc5'}, {'Grasland': '#b3de69'}, {'Ruigte/biezenvegetatie': '#fccde5'},
      {'Bos': '#bebada'}, {'Natuurlijk bos': '#bc80bd'}, {'Struweel': '#fdb462'} 
    ],
    defaultVisibility: true
  },
  '7 Class': {
    name: 'sevenClass',
    visParams: {min: 1, max: 7, palette: sevenPalette},
    legend: [
      {'Water': '#BDEEFF'}, {'Bebouwd/verhard': '#d9d9d9'}, {'Onbegroeid natuurlijk substraat': '#FF817E'}, {'Gras en Akker': '#EEFAD4'}, 
      {'Riet en ruigte': '#DEBDDE'}, {'Bos': '#73BF73'}, {'Struweel': '#D97A36'} 
    ],
    defaultVisibility: false
  },
  '6 Class': {
    name: 'sixClass',
    visParams: {min: 1, max: 6, palette: sixPalette},
    legend: [
      {'Water': '#BDEEFF'}, {'Bebouwd/verhard': '#FF817E'}, {'Gras en Akker': '#EEFAD4'}, 
      {'Riet en ruigte': '#DEBDDE'}, {'Bos': '#73BF73'}, {'Struweel': '#D97A36'} 
    ],
    defaultVisibility: false
  }
};
//Map panel configuration
// Now let's do some overall layout.
// Create a map panel.
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
// Center the map
mapPanel.setCenter(5.81, 51.93, 12);
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add layers to the map and center it.
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = data.select(layer.name).visualize(layer.visParams);
  mapPanel.add(ui.Map.Layer(image, {}, key, layer.defaultVisibility));
}
//Additional component configuration
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Vegetatie Classificatie', {fontSize: '32px', color: 'black'});
var text = ui.Label(
    'Results from 2017 Sentinel-2 classified annual composite, with AHN 3 as additional input.',
    {fontSize: '11px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
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
toolPanel.add(ui.Label('View Different Layers', {'font-size': '24px'}));
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