var images = {
  'January 2020': ee.ImageCollection('MODIS/006/MYD10A1').filter(ee.Filter.date('2020-01-01', '2020-02-01')).select('NDSI_Snow_Cover'),
  'February 2020': ee.ImageCollection('MODIS/006/MYD10A1').filter(ee.Filter.date('2020-02-01', '2020-03-01')).select('NDSI_Snow_Cover'),
  'March 2020': ee.ImageCollection('MODIS/006/MYD10A1').filter(ee.Filter.date('2020-03-01', '2020-04-01')).select('NDSI_Snow_Cover'),
  'April 2020': ee.ImageCollection('MODIS/006/MYD10A1').filter(ee.Filter.date('2020-04-01', '2020-05-01')).select('NDSI_Snow_Cover'),
  'May 2020': ee.ImageCollection('MODIS/006/MYD10A1').filter(ee.Filter.date('2020-05-01', '2020-06-01')).select('NDSI_Snow_Cover'),
  'June 2020': ee.ImageCollection('MODIS/006/MYD10A1').filter(ee.Filter.date('2020-06-01', '2020-07-01')).select('NDSI_Snow_Cover'),
  'July 2020': ee.ImageCollection('MODIS/006/MYD10A1').filter(ee.Filter.date('2020-07-01', '2020-08-01')).select('NDSI_Snow_Cover'),
  'August 2020': ee.ImageCollection('MODIS/006/MYD10A1').filter(ee.Filter.date('2020-08-01', '2020-09-01')).select('NDSI_Snow_Cover'),
  'September 2020': ee.ImageCollection('MODIS/006/MYD10A1').filter(ee.Filter.date('2020-09-01', '2020-10-01')).select('NDSI_Snow_Cover'),
  'October 2020': ee.ImageCollection('MODIS/006/MYD10A1').filter(ee.Filter.date('2020-10-01', '2020-11-01')).select('NDSI_Snow_Cover'),
  'November 2020': ee.ImageCollection('MODIS/006/MYD10A1').filter(ee.Filter.date('2020-11-01', '2020-12-01')).select('NDSI_Snow_Cover'),
  'December 2020': ee.ImageCollection('MODIS/006/MYD10A1').filter(ee.Filter.date('2020-12-01', '2021-01-01')).select('NDSI_Snow_Cover'),
};
var snowCoverVis = {min:0, max:100, palette: ['black','0dffff','0524ff','ffffff']};
//setting preset locations
var locationDict = {
  'Snow cover in Scandinavia': {lon: 16.333, lat: 61.825, zoom: 6},
  'Snow cover in the Sierra Nevadas': {lon: -120.71151575343997, lat: 39.508977585001624, zoom: 7},
  'Snow cover in Alaska': {lon: -150.91340507828383, lat: 63.86108229759147, zoom: 5}
};
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose a month to visualize', {fontWeight: 'bold', color: '0054A9'});
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection], snowCoverVis));
  }
// Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(16.333, 61.825, 6);
// Create description panel
var desPanel = ui.Panel({
  style:
      {position: 'bottom-right'}
});
var desTitle = ui.Label({
  value: 'Global NDSI Snow Cover',
  style: {fontWeight: 'bold', color: '0054A9', 'font-size': '30px'}
});
desPanel.add(desTitle);
var text = ui.Label(
    'Results from global analyses of Normalized Difference Snow Index [NDSI] captured by MODIS.',
    {fontSize: '11px', color: '3097FF'});
desPanel.add(text);
rightMap.add(desPanel);
//rightMap.add(desPanel);
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {position: 'bottom-left'}
});
var legendTitle = ui.Label({
  value: 'NDSI Snow Cover [0 - 100]',
  style: {fontWeight: 'bold', color: '0054A9'}
});
legendPanel.add(legendTitle);
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '200x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(snowCoverVis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
legendPanel.add(colorBar);
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(snowCoverVis.min, {margin: '4px 8px', color: '0054A9'}),
    ui.Label(
        (snowCoverVis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', color: '0054A9'}),
    ui.Label(snowCoverVis.max, {margin: '0px 8px', maxHeight: '24px', color: '0054A9'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
legendPanel.add(legendLabels);
// Add the legendPanel to the map.
leftMap.add(legendPanel);
// Create the location pulldown.
var locations = Object.keys(locationDict);
var locationSelect = ui.Select({
  items: locations,
  value: locations[0],
  onChange: function(value) {
  var location = locationDict[value];
    rightMap.setCenter(location.lon, location.lat, location.zoom);
  }
});
// Create the location panel
var locationPanel = ui.Panel ({
  style: 
        {position: 'top-left'}
});
var locationTitle = ui.Label({
  value: 'Choose a Location',
  style: {fontWeight: 'bold', color: '0054A9', fontSize: '20'}
});
locationPanel.add(locationTitle);
locationPanel.add(locationSelect);
leftMap.add(locationPanel);
// Timeseries
var aoi = ee.Geometry.Polygon(
  [[[-179.0, 78.0], [-179.0, -58.0], [179.0, -58.0], [179.0, 78.0]]], null,
  false);
var ndsidata = ee.ImageCollection('MODIS/006/MYD10A1')
            .filterDate('2020-01-01', '2021-01-01')
            .select('NDSI_Snow_Cover')
            .limit(60);
// Make a day-of-year sequence from 1 to 365 with a 16-day step.
var doyList = ee.List.sequence(1, 365, 16);
// Map over the list of days to build a list of image composites.
var ndsiCompList = doyList.map(function(startDoy) {
  // Ensure that startDoy is a number.
  startDoy = ee.Number(startDoy);
  // Filter images by date range; starting with the current startDate and
  // ending 15 days later. Reduce the resulting image collection by median.
  return ndsidata
    .filter(ee.Filter.calendarRange(startDoy, startDoy.add(15), 'day_of_year'))
    .reduce(ee.Reducer.median());
});
// Convert the image List to an ImageCollection.
var ndsiCompCol = ee.ImageCollection.fromImages(ndsiCompList);
var visFun = function(img) {
  return img.visualize(snowCoverVis).copyProperties(img, img.propertyNames());
};
// Map over the image collection to convert each image to an RGB visualization
// using the previously defined visualization function.
var ndsiColVis = ndsidata.map(visFun);
var videoArgs = {
  dimensions: 768,
  region: aoi,
  framesPerSecond: 4,
  crs: 'EPSG:3857',
  min: 0,
  max: 100,
  palette: ["black","0dffff","0524ff","ffffff"]
};
print(ndsidata.getVideoThumbURL(videoArgs));
// Create a hyperlink to an external reference.
var link = ui.Label(
    'NDSI Animation [January & February]: ', {fontSize: '11px', color: '3097FF'},
    'https://earthengine.googleapis.com/v1alpha/projects/earthengine-legacy/videoThumbnails/8aff7662980992a4eb0abf5d1e037389-329188e176ef6b5a5870fb827512946a:getPixels');
var linkPanel = ui.Panel(
    [ui.Label('View NDSI time series animation from January through February:', {fontWeight: 'bold', color:  '0054A9'}), link]);
desPanel.add(linkPanel);