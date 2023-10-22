var gmia_2005 = ui.import && ui.import("gmia_2005", "table", {
      "id": "users/lpintos/gmia_final"
    }) || ee.FeatureCollection("users/lpintos/gmia_final"),
    map_2020 = ui.import && ui.import("map_2020", "image", {
      "id": "users/lpintos/map2005V2"
    }) || ee.Image("users/lpintos/map2005V2"),
    map_2005 = ui.import && ui.import("map_2005", "image", {
      "id": "users/lpintos/map2005"
    }) || ee.Image("users/lpintos/map2005");
// Note map_2020 is just map_2005 with different bins, only to test if layers/legend change with selector
var layerProperties = {
  '2005': {
    map: map_2005,
    visParams: {min: 0, max: 4, palette: ['grey', 'green', 'yellow', 'orange', 'red']},
    legend: [
      {'irrig < 5%': 'gray'}, {'5% < irrig < 10%': 'green'}, {'10% < irrig < 25%': 'yellow'},
      {'25% < irrig < 50%': 'orange'}, {'irrig > 50%': 'red'}
    ],
    defaultVisibility: true
  },
  '2020': {
    map: map_2020,
    visParams: {min: 0, max: 5, palette: ['grey', '9ab602', 'green', 'yellow', 'orange', 'red']},
    legend: [
      {'irrig < 1%': 'gray'}, {'1% < irrig < 5%': '9ab602' }, {'5% < irrig < 10%': 'green'}, {'10% < irrig < 25%': 'yellow'},
      {'25% < irrig < 50%': 'orange'}, {'irrig > 50%': 'red'}
    ],
    defaultVisibility: false
  },
};
/*
 * Map panel configuration
 */
// Create a map panel.
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add layers to the map and center it.
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = layer.map.visualize(layer.visParams);
  // add masking if necessary;
  mapPanel.add(ui.Map.Layer(image, {}, key, layer.defaultVisibility));
}
//////////////////////////////////////////////////////////////
// Left Panel
//////////////////////////////////////////////////////////////
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Irrigation Map 2020', {fontSize: '36px', color: 'green'});
var text = ui.Label(
    'Results from analysis of Landsat images.',
    {fontSize: '11px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
// Create a hyperlink to an external reference.
var link = ui.Label(
    'Document by Pintos, Sanchini and Tosaria', {},
    '');
var linkPanel = ui.Panel(
    [ui.Label('For more information', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);
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