var image1 = ee.Image("users/ylfeng/HurricaneMariaUIimages/nrmlzdDNPV_UI_ibase"),
    image2 = ee.Image("users/ylfeng/HurricaneMariaUIimages/nrmlzdDNPV_UI_inorm"),
    image3 = ee.Image("users/ylfeng/HurricaneMariaUIimages/nrmlzdDNPV_UI1011"),
    image4 = ee.Image("users/ylfeng/HurricaneMariaUIimages/nrmlzdDNPV_UI"),
    image5 = ee.Image("users/ylfeng/HurricaneMariaUIimages/nrmlzdDNPV_UIlate_new");
// Demonstrates before/after imagery comparison with a variety of dates.
var DNPVIntensity_intervals =
  '<RasterSymbolizer>' +
    '<ColorMap  type="intervals" extended="false" >' +
      '<ColorMapEntry color="#442288" quantity="-10.0" label="-0.4000--2.0000" />' + //Spanish Violet
      '<ColorMapEntry color="#6CA2EA" quantity="-0.2" label="-0.2000--0.4000" />' + //Little boy blue
      '<ColorMapEntry color="#B5D33D" quantity="0.0" label="-0.200-0.0000" />' +   //Android Green
      '<ColorMapEntry color="#FFFFE0" quantity="0.2" label="0.0001-0.2000" />' +   //lightyellow
      '<ColorMapEntry color="#FFBB4E" quantity="0.4" label="0.2001-0.4000" />' +   //Pastel Orange
      '<ColorMapEntry color="#FF0000" quantity="0.6" label="0.4001-0.6000" />' +   //Red
      '<ColorMapEntry color="#794B26" quantity="0.8" label="0.6001-0.8000" />' +   //Russet
      '<ColorMapEntry color="#000000" quantity="1.0" label="0.8001-1.0000" />' +   //Black
    '</ColorMap>' +
  '</RasterSymbolizer>';  
/*
 * Configure the imagery
 */
// These Sentinel-1 images track the major flooding in Kerala during the 2018
// monsoon season: https://en.wikipedia.org/wiki/2018_Kerala_floods
var Preh = ee.Image(image1).visualize({bands: 'B6,B5,B4', 'gain':'0.06,0.04,0.06'});
var Posth = ee.Image(image2).visualize({bands: 'B6,B5,B4', 'gain':'0.06,0.04,0.06'});
var nmDNPVom = ee.Image(image3).sldStyle(DNPVIntensity_intervals);
var nmDNPVtm = ee.Image(image4).sldStyle(DNPVIntensity_intervals);
var nmDNPVoy = ee.Image(image5).sldStyle(DNPVIntensity_intervals);
var images = {
  'Pre-Hurricane Maria': Preh,
  'Post-Hurricane Maria': Posth,
  'Disturbance intensity after one month': nmDNPVom,
  'Disturbance intensity after three months': nmDNPVtm,
  'Disturbance intensity after a year': nmDNPVoy
};
// // Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// // given date.
// function getWeeklySentinelComposite(date) {
//   var date = ee.Date(date);
//   // Only include the VV polarization, for consistent compositing.
//   var polarization = 'VV';
//   var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
//                       .filterDate(date, date.advance(1, 'week'))
//                       .filter(ee.Filter.listContains(
//                           'transmitterReceiverPolarisation', polarization))
//                       .filter(ee.Filter.eq('instrumentMode', 'IW'))
//                       .select(polarization)
//                       .mean();
//   return sentinel1.visualize({min: -25, max: 0, palette: ['aqua', 'black']});
// }
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
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
/*
 * Tie everything together
 */
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
leftMap.setCenter( -66.4838, 18.2033, 10);