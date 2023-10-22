var ghm = ee.ImageCollection("CSP/HM/GlobalHumanModification");
//user variables
var nodataColor = 'c9d2e0'
// Make a nice visualization for the GHM layer.
var first = ghm.first();
print(first.mask());
var gray = first.mask().lt(1).selfMask().visualize({palette: nodataColor});
var rgb = first.visualize({
          "bands": ["gHM"],
          "min": [0.0],
          "max": [1.0],
          "palette": ["0c0c0c","071aff","ff0000","ffbd03","fbff05","fffdfd"]
});
// This is a dirty trick to composite the two images.
var image = ee.ImageCollection([gray, rgb]).mosaic();
// Some pre-set locations of interest that will be loaded into a pulldown menu.
var locationDict = {
  'Global':        {lon: 0.0, lat: 0.0, zoom: 2},
  'Africa':        {lon: 22.65, lat: 7.88, zoom: 3},
  'Asia':          {lon: 88.29, lat: 48.61, zoom: 3},
  'Europe':        {lon: 14.36, lat: 48.66, zoom: 4},
  'North America': {lon: -102.58, lat: 44.4, zoom: 3},
  'Oceania':       {lon: 144.42, lat: -20.08, zoom: 3},
  'South America': {lon: -58.01, lat: -12.4, zoom: 3}
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
var defaultLocation = locationDict['Global'];
mapPanel.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
mapPanel.add(ui.Map.Layer(image, {}, 'GHM'));
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
var header = ui.Label('Global Human Modification', {fontSize: '22px', color: '141414'});
var text = ui.Label(
    'The degree of human modification measures the spatial extent and the intensity of land modified by humans, and integrates stressors on human settlement, agriculture, transportation, mining, energy production, and electrical infrastructure.',
    {fontSize: '14px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '11px', margin: '0 0 0 8px', padding: '0'}
});
toolPanel.add(legendPanel);
var legendTitle = ui.Label(
    'Degree of human modification',
    {fontWeight: 'regular', fontSize: '14px', margin: '0 0 4px 0', padding: '0'});
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
setLegend([
  {'1.0 (maximum)': 'feffc1'},
  {'0.8': 'fbff05'}, 
  {'0.6': 'ffbd03'}, 
  {'0.4': 'ff0000'}, 
  {'0.2': '071aff'}, 
  {'0.0 (minimum)': '0c0c0c'},
  {'Water or no data': nodataColor},
]);
// Create a visibility checkbox and an opacity slider.
//
// If the checkbox is clicked off, disable the layer pulldown and turn all the
// layers off. Otherwise, enable the select, and turn on the selected layer.
var checkbox = ui.Checkbox({
  label: 'Opacity',
  value: true,
  style:
      {fontSize: '12px'},
  onChange: function(value) {
    var layer = mapPanel.layers().get(0);
    layer.setShown(!layer.getShown());
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
  ui.Label('Visit continents', {'font-size': '14px'}), locationSelect
]);
toolPanel.add(locationPanel);
// Create a hyperlink to an external reference.
var link = ui.Label(
    'Cite: Kennedy et al. (2019)', {},
    'https://onlinelibrary.wiley.com/doi/full/10.1111/gcb.14549');
var linkPanel = ui.Panel(
    [ui.Label('', {fontSize: 10, fontWeight: 'regular'}), link]);
toolPanel.add(linkPanel);