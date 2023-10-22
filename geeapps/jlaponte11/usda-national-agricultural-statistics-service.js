//Jade Aponte
//Question 4/Synthesis
//USDA NASS Cropland Data Layers
//USDA Nass Crop Land 
var getNASS = function(year) {
var dataset = ee.ImageCollection('USDA/NASS/CDL');
    var NASS = dataset.filter(ee.Filter.eq('system:index',year)).first();
//Selecting the Land cover band
var cropland = NASS.select('cropland');
return ui.Map.Layer(cropland, {}, year);
};
var images = {
  '2008': getNASS('2008'),
  '2010': getNASS('2010'),
  '2012': getNASS('2012'),
  '2014': getNASS('2014'),
  '2016': getNASS('2016'),
  '2018': getNASS('2018'),
  '2020': getNASS('2020'),
};
//Left Map displayed on first layer
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display the last layer.
var rightMap = ui.Map();
rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap, 6, 'top-right');
// Adds a layer selection widget 
function addLayerSelector(mapToChange, defaultValue, position) {
 var label = ui.Label('Select a year:');
 // This function changes the given map to show the selected image.
 function updateMap(selection) {
 // mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
 mapToChange.layers().set(0, images[selection]);
 }
 // Configure a selection dropdown to allow the user to choose
 // between images, and set the map to update when a user
 // makes a selection.
 var select = ui.Select({items: Object.keys(images), onChange:
updateMap});
 select.setValue(Object.keys(images)[defaultValue], true);
 var controlPanel =
 ui.Panel({widgets: [label, select], style: {position:
position}});
 mapToChange.add(controlPanel);
}
// Set the legend title.
var title = 'CDL Crop Land Cover Classification';
// Set the legend position.
var position = 'bottom-right';
// Define a dictionary that will be used to make a legend
var dict = {
 names: [
 "1 Corn",
 "2 Cotton",
 "3 Rice",
 "4 Sorghum",
 "5 Soybeans",
 "6 Sunflower",
 "10 Peanuts",
 "11 Tobacco",
 "12 Sweet COrn",
 "13 Pop or Orn Corn",
 "14 Mint",
 "21 Barley",
 "22 Durum Wheat",
 "23 Spring Wheat",
 "24 Winter Wheat",
 "25 other small grains",
 "26 Dbl Crop WinWht/Soybeans",
 "27 Rye",
 "43 Potatoes",
 "45 Sugarcane",
 ],
  colors: [
 '#ffd300', '#ff2626', '#00a8e2', '#ff9e0a', '#267000', '#ffff00',
 '#70a500', '#00af49', '#dda50a', '#dda50a', '#7cd3ff', '#e2007c',
 '#896054', '#d8b56b', '#a57000', '#d69ebc', '#707000', '#aa007c',
 '#702600', '#af7cff',
 ]
};
// Create a panel to hold the legend widget.
var legend = ui.Panel({
 style: {
 position: position,
 padding: '8px 15px'
 }
});
// Function to generate the legend.
function addCategoricalLegend(panel, dict, title) {
  // Create and add the legend title.
 var legendTitle = ui.Label({
 value: title,
 style: {
 fontWeight: 'bold',
 fontSize: '18px',
 margin: '0 0 4px 0',
 padding: '0'
 }
 });
 panel.add(legendTitle);
var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
 panel.add(loading);
 // Creates and styles 1 row of the legend.
 var makeRow = function(color, name) {
 // Create the label that is actually the colored box.
 var colorBox = ui.Label({
 style: {
 backgroundColor: color,
 // Use padding to give the box height and width.
 padding: '8px',
 margin: '0 0 4px 0'
 }
 });
 // Create the label filled with the description text.
 var description = ui.Label({
 value: name,
 style: {margin: '0 0 4px 6px'}
 });
 return ui.Panel({
 widgets: [colorBox, description],
 layout: ui.Panel.Layout.Flow('horizontal')
 });
 };
 // Get the list of palette colors and class names from the image.
var NASS_class_palette = dict.colors;
var names = dict.names;
 loading.style().set('shown', false);
for (var i = 0; i < names.length; i++) {
 panel.add(makeRow(NASS_class_palette[i], names[i]));
 }
 rightMap.add(panel);
}
addCategoricalLegend(legend, dict, title);
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
 firstPanel: leftMap,
 secondPanel: rightMap,
 wipe: true,
 style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-100, 40, 4);