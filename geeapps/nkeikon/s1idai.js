var imageCollection = ee.ImageCollection("COPERNICUS/S1_GRD"),
    geometry = /* color: #d63000 */ee.Geometry.Point([34.71514540625003, -19.863928495395204]),
    geometry2 = /* color: #98ff00 */ee.Geometry.Point([34.30517268380845, -19.16221150876947]),
    geometry3 = /* color: #0b4a8b */ee.Geometry.Polygon(
        [[[33.159480183324604, -21.211774293301993],
          [33.71997950833418, -21.033157876714505],
          [34.35778437897193, -20.833037591745363],
          [35.338212140224755, -20.57261401188039],
          [35.14367929497439, -19.812994170209045],
          [34.928835604428855, -19.07361636785879],
          [33.8672057377471, -19.33981956196183],
          [32.818844763600964, -19.599867896829792]]]),
    geometry4 = /* color: #ffc82d */ee.Geometry.Polygon(
        [[[34.30658025574405, -18.914515643203178],
          [33.91656560730655, -20.399127756591884],
          [35.19097966980655, -20.553510357066124],
          [35.72930974793155, -19.267505763010135]]]),
    imageCollection2 = ee.ImageCollection("COPERNICUS/S2_SR");
var s1_13Mar19 = ee.Image('COPERNICUS/S1_GRD/S1A_IW_GRDH_1SDV_20190313T161522_20190313T161557_026321_02F156_A8A9').select('VV');
var s1_19Mar19 = ee.Image('COPERNICUS/S1_GRD/S1B_IW_GRDH_1SDV_20190319T161451_20190319T161520_015425_01CE3C_A401').select('VV');
Map.addLayer(s1_13Mar19,{min: -25, max: 0, palette: ['aqua', 'black']},'before');
Map.addLayer(s1_19Mar19,{min: -25, max: 0, palette: ['aqua', 'black']},'after');
var s1before = s1_13Mar19.visualize({min: -25, max: 0, palette: ['aqua', 'black']});
var s1after = s1_19Mar19.visualize({min: -25, max: 0, palette: ['aqua', 'black']});
var s2_12Mar19 = imageCollection2.filterBounds(geometry4).filterDate('2019-03-12','2019-03-13').sort('CLOUDY_PIXEL_PERCENTAGE',false).median();//.map(maskS2clouds)
var s2_22Mar19 = imageCollection2.filterBounds(geometry4).filterDate('2019-03-18','2019-03-25').sort('CLOUDY_PIXEL_PERCENTAGE',false).median();
var s2before = s2_12Mar19.visualize({bands:['B4',"B3","B2"], max: 5000});
var s2after = s2_22Mar19.visualize({bands:['B4',"B3","B2"], max: 5000});
var imagesleft = {
  '2019-03-13 Sentinel-1 (VV)': s1before,
  '2019-03-12 Sentinel-2 (RGB)': s2before,
};
var imagesright = {
    '2019-03-22 Sentinel-2 (RGB)': s2after,
    '2019-03-19 Sentinel-1 (VV)': s1after,
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
  var label = ui.Label('Before');
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
  var label = ui.Label('After');
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
leftMap.setCenter(34.03180961116436, -19.903276515027486, 11);