var s2 = ee.ImageCollection("COPERNICUS/S2"),
    roi = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[36.99308351418449, -0.5132679612945094],
          [37.79233888527824, -0.5022820646230799],
          [37.77860597512199, 0.15139784902007125],
          [36.98759035012199, 0.14865127640455253]]]);
Map.centerObject(roi);
var roi_name = "Mt. Kenya";
var mosaicker = require('users/firsake/default:ImportantTools/mosaicByDate_module.js');
var reducer = ee.Reducer.median();
var start = '2019-02-01';
var end = '2019-03-31';
function maskS2clouds(image) {
  var qa = image.select('QA60').toInt();
  var cloudBitMask = Math.pow(2, 10);
  var cirrusBitMask = Math.pow(2, 11);
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var s2_col = ee.ImageCollection(s2.filterBounds(roi).filterDate(start,end));
var s2_col_mosaic = mosaicker.mosaicByDate(s2_col, reducer);
var col_Ids = s2_col_mosaic.reduceColumns(ee.Reducer.toList(), ['date']).get('list');
var band_c = ['B12','B8','B4'];
// Define the visualization parameters.
var vizParams = {
  bands: band_c,
  min: 0,
  max: 0.3,
  gamma: [0.95, 1.1, 1]
};
//var image_dates = [];
//print(col_Ids)
col_Ids.evaluate(function(ids) {
  for (var i=0; i<ids.length; i++) {
    var image = ee.Image(s2_col_mosaic.filter(ee.Filter.eq('date', ids[i])).first());
    var image_cloud_masked = maskS2clouds(image);
    //image_dates.push(ids[i]);
  Map.addLayer(image_cloud_masked, vizParams, roi_name + " " + ids[i]);
  }
});
//print(image_dates)*/
/*var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Select image to visualize');
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(ee.Image(s2_col_mosaic.filter(ee.Filter.eq('date', col_Ids.get(selection))).first())));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: col_Ids, onChange: updateMap});
  select.setValue(col_Ids.get(defaultValue), true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.centerObject(roi, 10);*/