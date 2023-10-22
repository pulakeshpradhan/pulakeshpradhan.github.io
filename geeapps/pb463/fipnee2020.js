/* 
Title: App Visualization for 
       Hansen et al. 2020. 
       A policy-driven framework for conserving the best of Earth’s remaining moist tropical forests. 
       Nature Ecology & Evolution
Authors: Patrick Burns [pb463@nau.edu]
About: Display Forest Types and Conservation Strategies from the publication
Refs.: 
Last Updated: 7 Aug. 2020
TODO: 
*/
// Load in Forest Class Map
var fcImg = ee.Image('users/pb463/FIP_ForestClasses_30m')
//Map.addLayer(fcImg, {'palette': ['#DBD2C3', '#AD7B2A', '#76FA5F', '#148500'], 'min': 1, 'max': 4}, "Forest Type")
// Load in ecoregion
var ECOR_MBL = ee.FeatureCollection('users/pb463/Ecoregions2017_MoistBroadleaf_diss_cliptoLSIB20171229')
// Load in countries
var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
//Load in GFC Forest Loss
var loss = ee.Image('UMD/hansen/global_forest_change_2018_v1_6').select(['lossyear'])
var loss_nonzero = loss.updateMask(loss.gt(0))
var loss_to2012 = loss_nonzero.lte(12).multiply(1)
var loss_2013to2018 = loss_nonzero.gte(13).multiply(2)
var loss_comb = loss_to2012.add(loss_2013to2018)
//Map.addLayer(loss_comb, {'palette': ['yellow', 'red'], 'min': 1, 'max':2}, "Global Forest Change Loss (v1.6)", 0)
//Load in conservation strategies
var csImg = ee.Image('users/pb463/FIP_ConStratClasses_30m')
//Map.addLayer(csImg.updateMask(csImg.gt(0)).clip(ECOR_MBL), {'palette': ['#ffc800', '#33c22a', '#de3232', '#8500ff'], 'min': 1, 'max': 4}, "Conservation Strategy")
// Load in Protected Areas
var PAs = ee.FeatureCollection('users/pb463/WDPA_20191126_IUCN1to4_Marine0and1_intMBL');
//Map.addLayer(PAs.style({lineType: 'dotted', color: '#1000FF', fillColor: '#FFFFFF00', width: 1}), null, "IUCN Protected Areas (I to IV)", 0)
// combine Forest Type and Conservation Strat
var comb = ee.Image([fcImg, csImg.updateMask(csImg.gt(0))]).rename(['Forest_Type', 'Conservation_Strat']).clip(ECOR_MBL)
///////////////////////////
// Map visualization
///////////////////////////
// This is one option for making Figure Maps, but the QGIS EE plugin is a better option for displaying the results with an equal area projection
// Make a pretty map showing loss, lowSCI, highSCI, and highFSII
Map.setCenter(30,0,3)
/*
 * Configure layers and locations
 */
var layerProperties = {
  'Forest Condition (2018)': {
    name: 'Forest_Type',
    visParams: {min: 1, max: 4, palette: ['#DBD2C3', '#AD7B2A', '#76FA5F', '#148500']},
    legend: [
      {'Non-Forest': '#DBD2C3'}, 
      {'Low Forest Structural Condition (SCI)': '#AD7B2A'}, 
      {'High Forest Structural Condition (SCI)': '#76FA5F'},
      {'High Forest Integrity (FSII)': '#148500'}
    ],
    defaultVisibility: true
  },
  'Conservation Strategies': {
    name: 'Conservation_Strat',
    visParams: {min: 1, max: 4, palette: ['#148501', '#1609d1', '#ffab02', '#ff1180']},
    legend:
        [{'Expand Protection': '#148501'}, {'Maintain Protection': '#1609d1'}, 
        {'Restore Structure': '#ff1180'}, {'Restore Integrity' :  '#ffab02'}],
    defaultVisibility: false
  }
};
// Some pre-set locations of interest that will be loaded into a pulldown menu.
var locationDict = {
  'Brazil': {lon: -53.941, lat: -2.678, zoom: 8},
  'Dem. Rep. of Congo': {lon: 22.57, lat: -1.932, zoom: 7},
  'Borneo': {lon: 114.331, lat: 1.604, zoom: 6}
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
var defaultLocation = {lon: 30, lat: 0, zoom: 2};
mapPanel.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add layers to the map and center it.
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = comb.select(layer.name).visualize(layer.visParams);
  mapPanel.add(ui.Map.Layer(image, {}, key, layer.defaultVisibility));
}
/*
 * Additional component configuration
 */
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Tropical Forest Condition and Conservation', {fontSize: '30px', color: 'green'});
var text = ui.Label(
    'Tropical and Subtropical Moist Broadleaf Forest condition is assessed based on forest height, cover, and time since disturbance. Forest integrity combines this metric with human pressure to identify the ‘best of the last’ tropical forests of highest quality. Conservation strategies proposed in the paper consider the same datasets and protected status.',
    {fontSize: '12px'});
var note = ui.Label('Note: Spherical Mercator projection distorts areas, more so at high latitudes',
    {fontSize: '11px'})
var toolPanel = ui.Panel([header, text, note], 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);
// Create a hyperlink to an external reference.
var link = ui.Label(
    'Nature Ecology & Evolution paper by Andrew Hansen and colleagues (2020)', {},
    'https://www.nature.com/articles/s41559-020-1274-7');
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
toolPanel.add(ui.Label('View Different Layers', {'font-size': '20px'}));
toolPanel.add(layerSelect);
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '11px', margin: '0 0 0 8px', padding: '0'}
});
toolPanel.add(legendPanel);
var legendTitle = ui.Label(
    'Legend',
    {fontWeight: 'bold', fontSize: '11px', margin: '0 0 4px 0', padding: '0'});
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
  ui.Label('Visit Example Locations', {'font-size': '20px'}), locationSelect
]);
var extraline = ui.Label("\n", {fontSize: '40px', whiteSpace: 'pre'})
toolPanel.add(locationPanel).add(extraline);