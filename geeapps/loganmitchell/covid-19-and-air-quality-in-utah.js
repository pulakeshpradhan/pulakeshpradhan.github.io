// Information about the Tropomi NO2 data set:
// https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S5P_NRTI_L3_NO2
// Last updated: 2020-06-22
// Code updates: https://github.com/loganemitchell/GoogleEarthEngine
// Limits for the colorbar legend:
var legend_min=0.00004
var legend_max=0.00010
//var legend_palette = ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
var legend_palette = ['blue', 'cyan', 'green', 'yellow', 'red']
// Select start day of the images
var images = {
  'Mar 15-30, 2019': getComposite('2019-03-15'), // Left panel label + start date
  'Mar 15-30, 2020': getComposite('2020-03-15'), // Right panel label + start date
  'Mar 15-30, 2021': getComposite('2021-03-15'), // Right panel label + start date
};
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
//Tie everything together
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Add a legend
var legend=addColorbar('NO2 (mol/m^2)',legend_palette,legend_min,legend_max)
leftMap.add(legend);
//
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-111.8, 40.6, 8); // set the lat+lon+zoom level for the map starting location
// Functions:
function getComposite(date_string) {
  var date = ee.Date(date_string);
  var sentinel1 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
    .select('NO2_column_number_density')
//    .select('tropospheric_NO2_column_number_density')
    .filterDate(date, date.advance(15, 'day')) // Number of days of data to average
    .mean();
  return sentinel1.visualize({
    min:legend_min, 
    max:legend_max,
    opacity: 0.60,
    palette: legend_palette});
}
function addColorbar(_title,_palette,_min,_max){
  /*
  creates a panel with title label and image
  _title: the title of the legend
  _colors: a list of colors
  _min: lowest number
  _max: highest number
  returns legend object
  */
  // set position of panel
  var legend = ui.Panel({
  style: {
  position: 'bottom-left',
  padding: '4px 4px'
  }
  });
  // Create legend title
  var legend_title = ui.Label({
  value: _title,
  style: {
  fontWeight: 'bold',
  fontSize: '14px',
  margin: '0 0 4px 0',
  padding: '0',
  textAlign: 'center', 
  stretch: 'horizontal'
  }
  });
  // Add the title to the panel
  legend.add(legend_title);
  //create color bar
  var color_bar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '200x15',
      format: 'png',
      min: 0,
      max: 1,
      palette: _palette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
  });
  // add the thumbnail to the legend
  legend.add(color_bar);
  // Create min and max ticks
  var ticks = ui.Panel({
    widgets: [
      ui.Label(_min, {margin: '2px 8px'}),
      ui.Label(_max, {
        margin: '2px 8px',
        //units: 'km',
        //value: _title,
        textAlign: 'right', 
        stretch: 'horizontal'
      })],
    layout: ui.Panel.Layout.flow('horizontal'),
     style: {stretch: 'horizontal'}
  });
  legend.add(ticks);
  return legend
}
/*
var collection19 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('NO2_column_number_density')
  .filterDate('2019-03-15', '2019-03-30')
  .mean();
var collection20 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('NO2_column_number_density')
  .filterDate('2020-03-15', '2020-03-30')
  .mean();
var band_viz = {
  min: 0,
  max: 0.00010,
  opacity: 0.60,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection19, band_viz, 'S5P N02');
Map.setCenter(-111.8, 40.6, 8);
*/