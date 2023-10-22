/*
 * Configure layers and locations
 */
// Import the Caballero et al. gold mining deforestation dataset.
var loss = ee.Image('users/jorcabes/prueba');
// Select the land/water mask.
var datamask = loss.select('b1');
// Create a binary mask.
var mask = datamask.lt(65535);
// Update the composite mask with the NoData mask.
var maskedComposite = datamask.updateMask(mask);
var added = loss.addBands(ee.Image(maskedComposite));
// Change band names
var goldMinMDD = added.select(
	['b1','b2', 'b1_1'],
	['layer', 'type', 'loss']
);
// Visualization parameters
var layerProperties = {
  'Year of Loss': {
    name: 'loss',
    visParams: {min: 1985, max: 2019, palette: ['blue', 'yellow', 'red']},
    legend: [
      {'2019': 'red'}, {'...': 'yellow'}, {'1985': 'blue'}
    ],
    defaultVisibility: true
  },
  'Type': {
    name: 'type',
    visParams: {min: 1, max: 2, palette: ['yellow', 'red']},
    legend:
        [{'Minimally Mechanized': 'red'}, {'Highly Mechanized': 'yellow'}],
    defaultVisibility: false
  },
};
// Some pre-set locations of interest that will be loaded into a pulldown menu.
var locationDict = {
  'Madre de Dios': {lon: -69.99, lat: -12.90, zoom: 9},
  'La Pampa': {lon: -69.99, lat: -12.90, zoom: 11},
  'Delta': {lon: -70.55, lat: -12.77, zoom: 12},
  'Huepetuhe': {lon: -70.53, lat: -13.02, zoom: 12}
};
/*
 * Map panel configuration
 */
// Now let's do some overall layout.
// Create a map panel.
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true, fullscreenControl: true});
// Set the default map's cursor to a "crosshair".
mapPanel.style().set('cursor', 'crosshair');
// Center the map
var defaultLocation = locationDict['Madre de Dios'];
mapPanel.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add layers to the map and center it.
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = goldMinMDD.select(layer.name).visualize(layer.visParams);
  mapPanel.add(ui.Map.Layer(image, {}, key, layer.defaultVisibility));
}
/*
 * Additional component configuration
*/
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});
inspector.style().set({
    position:'top-center'
});
// Add a label to the panel.
inspector.add(ui.Label('Click to get year of deforestation'));
// Add the panel to the map panel.
mapPanel.add(inspector);
// Register a callback on the map to be invoked when the map is clicked.
mapPanel.onClick(function(coords) {
  // Clear the panel and show a loading message.
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Loading...', {color: 'gray'}));
  // Compute the mean NDVI; a potentially long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var temporalMean = maskedComposite.reduce(ee.Reducer.min());
  var sampledPoint = temporalMean.reduceRegion(ee.Reducer.min(), point, 30);
  var computedValue = sampledPoint.get('min');
  // Request the value from the server and use the results in a function.
  computedValue.evaluate(function(result) {
    inspector.clear();
    // Add a label with the results from the server.
    inspector.add(ui.Label({
      value: 'Year Deforestation: ' + result,
      style: {stretch: 'vertical'}
    }));
    // Add a button to hide the Panel.
    inspector.add(ui.Button({
      label: 'Close',
      onClick: function() {
        inspector.style().set('shown', false);
      }
    }));
  });
});
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Gold Mining Deforestation', {fontSize: '36px', color: 'Gold', textAlign: 'center'});
var text = ui.Label(
    'Results from analysis of Landsat images characterizing gold mining extent in the Peruvian Southeastern Amazon region.',
    {fontSize: '12px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
// Create a hyperlink to an external reference.
var link = ui.Label(
    'Research article by Caballero, Messinger, Roman, Ascorra, Fernandez & Silman', {},
    'https://doi.org/10.3390/rs10121903');
var linkPanel = ui.Panel(
    [ui.Label('For more information', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);
// Create a hyperlink to an external reference.
var link = ui.Label(
    'Gold Mining Deforestation', {},
    'https://docs.google.com/forms/d/e/1FAIpQLSfqpWUCM1DTuYm2Ml5ixYg6h-Ai64ev3aWSMsKv0Xlnanc4lA/viewform?usp=sf_link');
var linkPanel = ui.Panel(
    [ui.Label('Download data', {fontWeight: 'bold'}), link]);
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
  ui.Label('Important Locations', {'font-size': '24px'}), locationSelect
]);
toolPanel.add(locationPanel);