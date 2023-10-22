/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var imageCollection = ee.ImageCollection("users/benitezrcamilo/tesis_vmpo/lulc_sc"),
    roi = ee.FeatureCollection("users/benitezrcamilo/tesis_vmpo/ROI_Thesis_VMPO"),
    catastro = ee.FeatureCollection("users/benitezrcamilo/tesis_vmpo/catastro_roi_Thesis_VMPO"),
    survey = ee.FeatureCollection("users/benitezrcamilo/tesis_vmpo/surveys_geodata_VMPO");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
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
var palettes = require('users/mapbiomas/modules:Palettes.js');
// import tools
var tools = require('users/fitoprincipe/geetools:tools')
var lulc12 = ee.Image('users/benitezrcamilo/tesis_vmpo/lulc_sc/mapbiomas-brazil-collection-60-santacatarina-2012')
var lulc20 = ee.Image('users/benitezrcamilo/tesis_vmpo/lulc_sc/mapbiomas-brazil-collection-60-santacatarina-2020')
// Load LandCover maps
var fcImg = ee.Image('users/pb463/FIP_ForestClasses_30m')
print(fcImg)
//Map.addLayer(fcImg, {'palette': ['#DBD2C3', '#AD7B2A', '#76FA5F', '#148500'], 'min': 1, 'max': 4}, "Forest Type")
// Load ROI boundaries
var ECOR_MBL = ee.FeatureCollection('users/benitezrcamilo/tesis_vmpo/ROI_Thesis_VMPO')
// Load in countries (aca hay que guardar los sitios de interés o puntos)
var cat = ee.FeatureCollection('users/benitezrcamilo/tesis_vmpo/catastro_roi_Thesis_VMPO')
// Load in Protected Areas (áreas protegidas de Brasil)
var PAs = ee.FeatureCollection('users/pb463/WDPA_20191126_IUCN1to4_Marine0and1_intMBL');
//Map.addLayer(PAs.style({lineType: 'dotted', color: '#1000FF', fillColor: '#FFFFFF00', width: 1}), null, "IUCN Protected Areas (I to IV)", 0)
// combine Forest Type and Conservation Strat (combinar capas)
var comb = ee.Image([lulc12, lulc20]).rename(['LULC_2012', 'LULC_2020']).clip(ECOR_MBL)
///////////////////////////
// Map visualization
///////////////////////////
// This is one option for making Figure Maps, but the QGIS EE plugin is a better option for displaying the results with an equal area projection
// Make a pretty map
Map.setCenter(-49.1636,-27.0699,10)
/*
 * Configure layers and locations
 */
 //Palette
var palette = {
            'LULC_2012': palettes.get('classification6'),
            'LULC_2020': palettes.get('classification6')
            };
print(palette)
//Limits properties
var blank = ee.Image(0).mask(0);
var outline = blank.paint(roi, 'AA0000', 2); 
var visPar = {'palette':'000000','opacity': 0.6};
var layerProperties = {
  'LULC 2012': {
    name: 'LULC_2012',
    visParams: {min: 0, max: 49, palette: palette['LULC_2012']},
    legend: [
        {'Forest': '#129912'}, {'Forest Formation': '#6400'}, {'Savanna Formation': '#00ff00'},
        {'Mangrove': '#687537'}, {'Wooded Restinga': '#6b9932'}, {'Non Forest Natural Formation': '#BBFCAC'},
        {'Wetlands': '#45C2A5'}, {'Grassland': '#B8AF4F'}, {'Salt Flat': '#968c46'}, {'Rocky Outcrop': '#665a3a'},
        {'Other non Forest Formations': '#f1c232'}, {'Farming': '#FFFFB2'}, {'Pasture': '#FFD966'},
        {'Agriculture': '#E974ED'}, {'Forest Plantation': '#ad4413'}, {'Mosaic Agriculture and Pasture': '#fff3bf'},
        {'Non vegetated Area': '#EA9999'}, {'Beach, Dune and Sand Spot': '#DD7E6B'}, {'Urban Area': '#aa0000'},
        {'Mining': '#af2a2a'}, {'Other non Vegetaded Areas': '#ff3d3d'}, {'Water': '#0000FF'}, {'River,Lake and Ocean': '#0000FF'},
        {'Aquaculture': '#02106f'}, {'Non Observed': '#D5D5E5'}
    ],
    defaultVisibility: true
  },
  'LULC 2020': {
    name: 'LULC_2020',
    visParams: {min: 0, max: 49, palette: palette['LULC_2020']},
    legend:
        [{'Forest': '#129912'}, {'Forest Formation': '#6400'}, {'Savanna Formation': '#00ff00'},
        {'Mangrove': '#687537'}, {'Wooded Restinga': '#6b9932'}, {'Non Forest Natural Formation': '#BBFCAC'},
        {'Wetlands': '#45C2A5'}, {'Grassland': '#B8AF4F'}, {'Salt Flat': '#968c46'}, {'Rocky Outcrop': '#665a3a'},
        {'Other non Forest Formations': '#f1c232'}, {'Farming': '#FFFFB2'}, {'Pasture': '#FFD966'},
        {'Agriculture': '#E974ED'}, {'Forest Plantation': '#ad4413'}, {'Mosaic Agriculture and Pasture': '#fff3bf'},
        {'Non vegetated Area': '#EA9999'}, {'Beach, Dune and Sand Spot': '#DD7E6B'}, {'Urban Area': '#aa0000'},
        {'Mining': '#af2a2a'}, {'Other non Vegetaded Areas': '#ff3d3d'}, {'Water': '#0000FF'}, {'River,Lake and Ocean': '#0000FF'},
        {'Aquaculture': '#02106f'}, {'Non Observed': '#D5D5E5'}],
    defaultVisibility: false
  }
};
// Some pre-set locations of interest that will be loaded into a pulldown menu. (config puntos)
var locationDict = {
  'Example 1': {lon: -49.04299, lat: -27.11241, zoom: 15}, 
  'Example 2': {lon: -49.07022, lat: -27.13478, zoom: 15},
  'Example 3': {lon: -49.302596, lat:-27.190715, zoom: 15}
};
/*
 * Map panel configuration
 */
// Now let's do some overall layout.
// Create a map panel.
var mapPanel = ui.Map();
var visMap = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: true, zoomControl: true, mapTypeControl: true});
// Center the map (centrar en área de estudio)
var defaultLocation = {lon: -49.1636,  lat: -27.0699, zoom: 10};
mapPanel.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
//Specific layers
var opacityChangingLayers = [];
// Add layers to the map and center it.
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = comb.select(layer.name).visualize(layer.visParams);
  var mapLayer = ui.Map.Layer(image, {}, key, layer.defaultVisibility)
  mapPanel.add(mapLayer);
  opacityChangingLayers.push(mapLayer);
}
//Municiopalities
mapPanel.addLayer(outline,visPar,'Municipalities',1)
//
mapPanel.addLayer(cat,{color: 'yellow', fillColor: '00000000'},'Rural cadaster')
//Points
mapPanel.addLayer(survey,{color: 'red', fillColor: '00000000'},'Survey sites')
/*
 * Additional component configuration
 */
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Survey points verification', {fontSize: '30px', color: 'green'});
var text = ui.Label(
    'Select specific locations of interest to visualize the issues from a geospatial point of view related to the survey database.',
    {fontSize: '12px'});
var note = ui.Label('Notes: Opacity checkbox not working, use Layers selector directly on Map view. Spherical Mercator projection distorts areas.',
    {fontSize: '11px'})
var toolPanel = ui.Panel([header, text, note], 'flow', {width: '300px'});
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
  // value: true,
  // onChange: function(value) {
  //   var selected = layerSelect.getValue();
  //   // Loop through the layers in the mapPanel. For each layer,
  //   // if the layer's name is the same as the name selected in the layer
  //   // pulldown, set the visibility of the layer equal to the value of the
  //   // checkbox. Otherwise, set the visibility to false.
  //   mapPanel.layers().forEach(function(element, index) {
  //     element.setShown(selected == element.getName() ? value : false);
  //   });
  //   // If the checkbox is on, the layer pulldown should be enabled, otherwise,
  //   // it's disabled.
  //   layerSelect.setDisabled(!value);
  // }
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
    opacityChangingLayers.forEach(function(element, index) {
    element.setOpacity(value);
  });
});
/*opacitySlider.onSlide(function(value) {
  mapPanel.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});*/
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
// var layers = mapPanel.layers()
// var layer = layers.get(0)
// var layer2 = layers.get(1)
// layers.remove(layer)
// layers.remove(layer)