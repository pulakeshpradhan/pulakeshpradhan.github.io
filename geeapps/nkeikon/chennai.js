var s1 = ee.ImageCollection("COPERNICUS/S1_GRD"),
    s2sr = ee.ImageCollection("COPERNICUS/S2_SR"),
    chennai = /* color: #d63000 */ee.Geometry.Point([80.17558213277266, 13.161275630005136]),
    s2 = ee.ImageCollection("COPERNICUS/S2");
var s12018 = s1.filterBounds(chennai).filterDate('2018-06-01','2018-06-30').select('VV').mean();
var s12019 = s1.filterBounds(chennai).filterDate('2019-06-01','2019-06-30').select('VV').mean();
Map.addLayer(s12018,{min: -25, max: 0, palette: ['aqua', 'black']},'before');
Map.addLayer(s12019,{min: -25, max: 0, palette: ['aqua', 'black']},'after');
var s1before = s12018.visualize({min: -25, max: 0, palette: ['aqua', 'black']});
var s1after = s12019.visualize({min: -25, max: 0, palette: ['aqua', 'black']});
//var s2_12Mar19 = imageCollection2.filterBounds(geometry5).filterDate('2018-06-01','2018-06-30').sort('CLOUDY_PIXEL_PERCENTAGE',false).median();//.map(maskS2clouds)
var s22018 = s2.filterBounds(chennai).filterDate('2018-06-01','2018-06-30').sort('CLOUDY_PIXEL_PERCENTAGE',false).mosaic();//.map(maskS2clouds)
var s22019 = s2sr.filterBounds(chennai).filterDate('2019-06-01','2019-06-30').sort('CLOUDY_PIXEL_PERCENTAGE',false).mosaic();
var s2before = s22018.visualize({bands:['B4',"B3","B2"], min:859, max: 2465, gamma:0.85});
var s2after = s22019.visualize({bands:['B4',"B3","B2"], min:280, max: 3500, gamma: 1.1});
var imagesleft = {
  'RGB (Sentinel-2)': s2before,
  'Radar (Sentinel-1, VV)': s1before,
};
var imagesright = {
    'Radar (Sentinel-1, VV)': s1after,
    'RGB (Sentinel-2)': s2after,
};
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelectorLeft(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelectorRight(rightMap, 1, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelectorLeft(mapToChange, defaultValue, position) {
  var label = ui.Label('June 2018');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(imagesleft[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(imagesleft), onChange: updateMap});
  select.setValue(Object.keys(imagesleft)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
function addLayerSelectorRight(mapToChange, defaultValue, position) {
  var label = ui.Label('June 2019');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(imagesright[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(imagesright), onChange: updateMap});
  select.setValue(Object.keys(imagesright)[defaultValue], true);
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
leftMap.setCenter(80.18338241359788, 13.166541802442758, 13);