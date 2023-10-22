// Demonstrates how to efficiently display a number of layers of a dataset along
// with a legend for each layer, and some visualization controls.
/*
 * Configure layers and locations
 */
var hansen = ee.Image('UMD/hansen/global_forest_change_2017_v1_5');
var lanid = ee.Image('users/xyhuwmir4/LANID_postCls/LANID_v2');
var irFreq = lanid.reduce(ee.Reducer.sum());
lanid = lanid.addBands(irFreq.rename('irFreq'));
var freqPalette = ['ffffff','ce7e45','df923d','f1b555','fcd163','99b718','74a901','66a000','529400',
                  '3e8601','207401','056201','004c00','023b01','012e01','011d01','011301'];
var palette = ['ffffcc','c7e9b4','7fcdbb','41b6c4','1d91c0','225ea8','0c2c84'];
var layerProperties = {
  'Irrigation Frequency': {
    name: 'irFreq',
    visParams: {min: 1, max: 21, palette: palette},
    legend: [
      {'19-21': '0c2c84'},{'16-18': '225ea8'}, {'13-15': '1d91c0'}, {'10-12': '41b6c4'},
      {'7-9': '7fcdbb'},{'4-6': 'c7e9b4'}, {'1-3': 'ffffcc'}
    ],
    defaultVisibility: true
  },
  'Irrigation Map 1997': {
    name: 'irMap97',
    visParams: {min: 0, max: 1, palette: ['black', 'blue']},
    legend: 
      [{'irrigated': 'blue'}, {'non-irrigated': 'black'}],
    defaultVisibility: false
  },
  'Irrigation Map 2017': {
    name: 'irMap17',
    visParams: {min: 0, max: 1, palette: ['black', 'blue']},
    legend:
        [{'irrigated': 'blue'}, {'non-irrigated': 'black'}],
    defaultVisibility: false
  }
};
// Some pre-set locations of interest that will be loaded into a pulldown menu.
var locationDict = {
  'Irrigation frequency in Phoenex': {lon: -112.4183, lat: 33.4503, zoom: 10},
  '...... in High Plains Aquifer': {lon: -101.0581, lat: 37.8103, zoom: 6},
  '...... in California': {lon: -120.5498, lat: 36.9962, zoom: 6},
  '...... in MAP region': {lon: -90.8974, lat: 35.3897, zoom: 6},
  '...... in Snake River Plain': {lon: -114.1554, lat: 42.8045, zoom: 7},
  '...... in Wisconsin': {lon: -89.5406, lat: 44.2177, zoom: 8},
};
/*
 * Map panel configuration
 */
// Now let's do some overall layout.
// Create a map panel.
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
// Center the map
var defaultLocation = locationDict['Irrigation frequency in Phoenex'];
mapPanel.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// mapPanel.setCenter(
//     -101.0581, 37.8103, 5);
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add layers to the map and center it.
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = lanid.select(layer.name).visualize(layer.visParams);
  // var masked = addZeroAndWaterMask(image, hansen.select(layer.name));
  mapPanel.add(ui.Map.Layer(image, {}, key, layer.defaultVisibility));
}
// Draws black and gray overlays for nodata/water/zero values.
function addZeroAndWaterMask(visualized, original) {
  // Places where there is nodata or water are drawn in gray.
  var water =
      hansen.select('datamask').neq(1).selfMask().visualize({palette: 'gray'});
  // Places were the underyling value is zero are drawn in black.
  var zero = original.eq(0).selfMask().visualize({palette: 'black'});
  // Stack the images, with the gray on top, black next, and the original below.
  return ee.ImageCollection([visualized, zero, water]).mosaic();
}
/*
 * Additional component configuration
 */
// Add a title and some explanatory text to a side panel.
var header = ui.Label('LANdsat-based Irrigation Dataset (1997-2017)', {fontSize: '36px', color: 'Black'});
var text = ui.Label(
    '',
    {fontSize: '11px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
// Create a hyperlink to an external reference.
var link = ui.Label(
    'Xie and Lark (2021)', {},
    'https://www.sciencedirect.com/science/article/pii/S0034425721001632');
var linkPanel = ui.Panel(
    [ui.Label('For more information, please refer to', {fontWeight: 'bold'}), link]);
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
      {fontWeight: 'bold', fontSize: '13px', margin: '0 0 0 8px', padding: '0'}
});
toolPanel.add(legendPanel);
var legendTitle = ui.Label(
    'Legend',
    {fontWeight: 'bold', fontSize: '14px', margin: '0 0 4px 0', padding: '0'});
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
  ui.Label('Visit Example Locations', {'font-size': '24px'}), locationSelect
]);
toolPanel.add(locationPanel);