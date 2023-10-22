////////////////////////////////////////////
////Prefire vs postfire image comparison app
////Slider UI with image selection menus
////Mason Bruce & Girard 2020-2021
////mbgfpeg@gmail.com
////////////////////////////////////////////
////////////////////////////////////////////
//// Define vector and image components
////////////////////////////////////////////
//// Vector map components
var focperims = ee.FeatureCollection('users/mbgfpeg/Focal_Perimeters_2020');
var empty = ee.Image().byte();
var edgesfocperims = empty.paint({
  featureCollection: focperims,
  width: 2.55
});
//// Imagery map components
////Version with Sentinel 2 cloud free
var MAX_CLOUD_PROBABILITY = 65;
var region =
    ee.Geometry.Rectangle({coords: [-121.4, 45.5, -123.6, 42.9], geodesic: false});
function maskClouds(img) {
  var clouds = ee.Image(img.get('cloud_mask')).select('probability');
  var isNotCloud = clouds.lt(MAX_CLOUD_PROBABILITY);
  return img.updateMask(isNotCloud);
}
function maskEdges(s2_img) {
  return s2_img.updateMask(
      s2_img.select('B8A').mask().updateMask(s2_img.select('B9').mask()));
}
var images = {
  'Pre-fire (2020-06-01)': getMonthlySentinel2Composite('2020-06-01','2020-07-01',2000),
  'Post-fire (2020-09-01)': getMonthlySentinel2Composite('2020-09-15','2020-10-15',1250),
};
// Composite Sentinel-2 ImageCollection spanning input dates
function getMonthlySentinel2Composite(date1,date2,maxbright) {
  // Filter input collections by input dates and region
  var s2Sr = ee.ImageCollection('COPERNICUS/S2_SR')
                      .filterDate(date1, date2)
                      .filterBounds(region).map(maskEdges);
  var s2Clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY')
                      .filterDate(date1, date2)
                      .filterBounds(region);
  // Join S2 SR with cloud probability dataset to add cloud mask.
  var s2SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({
    primary: s2Sr,
    secondary: s2Clouds,
    condition:
        ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
  });
  var s2CloudMasked =
      ee.ImageCollection(s2SrWithCloudMask).map(maskClouds).median();
  // var rgbVis = {min: 0, max: 1000, bands: ['B4', 'B3', 'B2']};
  var rgbVis = {min: 0, max: maxbright, bands: ['B4', 'B3', 'B2']};
  // return(s2CloudMasked.visualize({min: 0, max: 3000, bands: ['B4', 'B3', 'B2']}))
  return(s2CloudMasked.visualize(rgbVis))
}
////////////////////////////////////////////
////End Define vector and image components
////////////////////////////////////////////
////////////////////////////////////////////
//// Set up map structure
////////////////////////////////////////////
//// Left panel displays layer 0
var leftMap = ui.Map();
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 0, 'bottom-left');
//// Right panel displays layer 1
var rightMap = ui.Map();
rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap, 1, 'bottom-right');
// Add layer selection menu
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose Sentinel 2 Date Range');
  // Function changes specified map to show selection
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Define the selection dropdown menu contents
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
////////////////////////////////////////////
////End Set up map structure
////////////////////////////////////////////
////////////////////////////////////////////
////Add elements to the app
////////////////////////////////////////////
// SplitPanel ui to contain left and right maps
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-122.5, 44.17, 11);
leftMap.addLayer(edgesfocperims, {palette: 'LightGreen'}, 'Fire Perimeter');
rightMap.addLayer(edgesfocperims, {palette: 'DarkOrange'}, 'Fire Perimeter');
// Define title panel and contents
var main = ui.Panel({style: {width: '310px', padding: '8px'}});
var title = ui.Label('Oregon 2020 Wildfire Impacts Viewer', {fontWeight: 'bold', fontSize: '20px', color: 'green'});
var logo = ui.Label('Mason Bruce & Girard', {fontWeight: 'bold', fontSize: '15px', color: 'green'},
  'https://www.masonbruce.com/');
var descr = ui.Label("This viewer combines Sentinel 2 cloud-corrected imagery from before and after the 2020 wildfire season. Comparison focuses on Western Oregon, from the South Obenchain fire in the south to the Riverside fire in the north.", {color: 'black'});
var instr = ui.Label("Move the slider bar to the left to reveal post-fire imagery, or to the right to impose pre-fire imagery. Left vs right images may be swapped with the drop down menus. Other areas can be loaded by panning the map (click-drag) or by zooming out (wheel) and repositioning the map.", {color: 'black'});
var link = ui.Label(
    'National Interagecy Fire Center (NIFC), November 13th 2020', {},
    'https://data-nifc.opendata.arcgis.com/');
var linkPanel = ui.Panel(
    [ui.Label('Fire perimeter data source:', {fontWeight: 'bold'}), link]);
main.add(title);
main.add(logo);
main.add(descr);
main.add(instr);
main.add(linkPanel);
ui.root.insert(0, main);
////////////////////////////////////////////
////End Add elements to the app
////////////////////////////////////////////