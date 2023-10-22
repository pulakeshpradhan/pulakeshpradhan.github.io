/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var image = ee.Image("users/obaidrrhmnan/multangarlci2020"),
    image3 = ee.Image("users/obaidrrhmnan/mtnndvinov19"),
    image4 = ee.Image("users/obaidrrhmnan/mtnndvimar20"),
    image5 = ee.Image("users/obaidrrhmnan/mtnndvijan20"),
    image6 = ee.Image("users/obaidrrhmnan/mtnndvifeb20"),
    image7 = ee.Image("users/obaidrrhmnan/mtnndvidec19"),
    image8 = ee.Image("users/obaidrrhmnan/mtnndviapr20"),
    geometry = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[71.57135852762535, 30.447745626607926],
          [71.57150873133018, 30.44741265338731],
          [71.57129415460899, 30.44693169006054],
          [71.57133706995323, 30.446811448858043],
          [71.57137998529747, 30.446126996110934],
          [71.57689460703209, 30.44627498630132],
          [71.5770233530648, 30.449780438240673],
          [71.573997821296, 30.44867054625258],
          [71.57133706995323, 30.447717878882997]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"]);
}
var S2 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2019-10-01', '2020-04-20')
    .filterBounds(geometry)
    //.filterDate('2019-01-25', '2019-01-29')
    //.filterDate('2019-01-25', '2019-01-29')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .map(maskS2clouds);
// Function to calculate and add an NDVI band
var addNDVI = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B4']));
};
// Add NDVI band to image collection
var S2 = S2.map(addNDVI);
// Extract NDVI band and create NDVI median composite image
var NDVI = S2.select(['nd']);
var NDVImed = NDVI.median();
var vis = {bands: ['B12', 'B8', 'B2'], min: 0, max: 0.4,gamma: [0.95, 1.2, 1]};
var composite = S2.median().clip(geometry).visualize(vis);
//var compositeLayer = ui.Map.Layer(composite).setName('Sat Composite');    
//var vis = {min: 0, max: 30, palette: 'navy,blue,aqua'};
//var composite = S2.mean().visualize(vis);
//var layers = mapPanel.layers();
//layers.add(compositeLayer, 'Composite');
//Application
var locationDict = {
  'Multan-Field': {lon: 71.57457, lat: 30.44778, zoom: 17},
  'Garlic-Field': {lon: 71.576592, lat: 30.447872, zoom: 19},
};
//
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
// Center the map
var defaultLocation = locationDict['Multan-Field'];
mapPanel.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Satellite Based Crop Assesment', {fontSize: '24px', color: 'red'});
var text = ui.Label(
    'Crop Monitoring and Health Assesment 2020.',
    {fontSize: '20px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
//
var layers = image.addBands(image3).addBands(image4).addBands(image5).addBands(image6).addBands(image7).addBands(image8).addBands(composite);
var layerProperties = {
  'Crops Classification': {
    name: 'classification',
    visParams: {min: 1, max: 5, palette: ['1ad61c', 'ecff19', '8b250b','b716b6','ff1b0a']},
    legend: [
      {'Wheat': '1ad61c'}, {'Fodders': 'ecff19'}, {'Orchards': '8b250b'},
      {'Others': 'b716b6'},{'Garlic': 'ff1b0a'}
    ],
    defaultVisibility: true
  },
'Garlic health November 2019': {
    name: 'classification_1',
    visParams: {min: 1, max: 5, palette: ['c80b18', 'd6871a', 'e5ed12', '8fd627', '8fd627']},
    legend: [
      {'Sever Damage': 'c80b18'}, {'Moderate Damage': 'd6871a'}, {'low Damage': 'e5ed12'},
      {'No loss': '8fd627'}
    ],
    defaultVisibility: false
},
'Garlic health December 2019': {
    name: 'classification_2',
    visParams: {min: 1, max: 5, palette: ['d6871a', 'e5ed12', '8fd627', 'c80b18', '8fd627']},
    legend: [
      {'Sever Damage': 'c80b18'}, {'Moderate Damage': 'd6871a'}, {'low Damage': 'e5ed12'},
      {'No loss': '8fd627'}
    ],
    defaultVisibility: false
  },
'Garlic health January 2020': {
    name: 'classification_3',
    visParams: {min: 1, max: 5, palette: ['d6871a', 'e5ed12', '8fd627', 'c80b18', '8fd627']},
    legend: [
      {'Sever Damage': 'c80b18'}, {'Moderate Damage': 'd6871a'}, {'low Damage': 'e5ed12'},
      {'No loss': '8fd627'}
    ],
    defaultVisibility: false
  },
'Garlic health February 2020': {
    name: 'classification_4',
    visParams: {min: 1, max: 5, palette: ['d6871a', 'e5ed12', '8fd627', 'c80b18', '8fd627']},
    legend: [
      {'Sever Damage': 'c80b18'}, {'Moderate Damage': 'd6871a'}, {'low Damage': 'e5ed12'},
      {'No loss': '8fd627'}
    ],
    defaultVisibility: false
  },
'Garlic health March 2020': {
    name: 'classification_5',
    visParams: {min: 1, max: 5, palette: ['d6871a', 'e5ed12', '8fd627', 'c80b18', '8fd627']},
    legend: [
      {'Sever Damage': 'c80b18'}, {'Moderate Damage': 'd6871a'}, {'low Damage': 'e5ed12'},
      {'No loss': '8fd627'}
    ],
    defaultVisibility: false
  },
'Garlic health April 2020': {
    name: 'classification_6',
    visParams: {min: 1, max: 5, palette: ['d6871a', 'e5ed12', '8fd627', 'c80b18', '8fd627']},
    legend: [
      {'Sever Damage': 'c80b18'}, {'Moderate Damage': 'd6871a'}, {'low Damage': 'e5ed12'},
      {'No loss': '8fd627'}
    ],
    defaultVisibility: false
  },
};
print(layers);
// Add layers to the map and center it.
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = layers.select(layer.name).visualize(layer.visParams);
  //var masked = addZeroAndWaterMask(image, hansen.select(layer.name));
  mapPanel.add(ui.Map.Layer(image, {}, key, layer.defaultVisibility));
}
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
toolPanel.add(ui.Label('Select Layers', {'font-size': '20px'}));
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
  ui.Label('Select Fields', {'font-size': '24px'}), locationSelect
]);
toolPanel.add(locationPanel);