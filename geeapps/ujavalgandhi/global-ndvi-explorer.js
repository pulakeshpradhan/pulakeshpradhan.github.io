var geometry = ee.Geometry.Point([77.5979, 13.00896]);
Map.centerObject(geometry, 10)
var s2 = ee.ImageCollection("COPERNICUS/S2")
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
var palette = [
  'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
  '74A901', '66A000', '529400', '3E8601', '207401', '056201',
  '004C00', '023B01', '012E01', '011D01', '011301'];
var ndviVis = {min:0, max:0.5, palette: palette }
// Write a function for Cloud masking
function maskS2clouds(image) {
  var qa = image.select('QA60')
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
var filtered = s2
  .filter(ee.Filter.date('2019-01-01', '2019-12-31'))
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
  .map(maskS2clouds)
// Write a function that computes NDVI for an image and adds it as a band
function addNDVI(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('ndvi');
  return image.addBands(ndvi);
}
// Map the function over the collection
var withNdvi = filtered.map(addNDVI);
var composite = withNdvi.median()
var title = ui.Label('Global NDVI Explorer');
title.style().set({
  'position':  'top-center',
  'fontSize': '24px'
  });
var resultsPanel = ui.Panel();
var chartPanel = ui.Panel();
var selectionPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
});
resultsPanel.style().set({
  width: '400px',
  position: 'bottom-right'
});
var resetPanel = ui.Panel();
//var label = ui.Label('Click anywhere to see the chart')
//resetPanel.add(label)
resultsPanel.add(selectionPanel)
resultsPanel.add(chartPanel)
resultsPanel.add(resetPanel)
//Map.add(resultsPanel)
var resetEverything = function() {
  chartPanel.clear()
  selectionPanel.clear()
  resetPanel.clear()
  Map.clear()
  Map.add(title);
  Map.add(resultsPanel)
  Map.onClick(displayChart)
  Map.addLayer(composite, rgbVis, 'Sentinel-2 Composite')
  var label = ui.Label('Click anywhere to see the chart')
  resetPanel.add(label)
}
var displayChart = function(point) {
  resetPanel.clear()
  var button = ui.Button({
    label: 'Reset',
    onClick: resetEverything})
  resetPanel.add(button)
  var geometry = ee.Geometry.Point(point['lon'], point['lat']);
  var chart = ui.Chart.image.series({
    imageCollection: withNdvi.select('ndvi'),
    region: geometry,
    reducer: ee.Reducer.mean(),
    scale: 20}).setOptions({
      //lineWidth: 1,
      title: 'NDVI Time Series',
      vAxis: {title: 'NDVI'},
      hAxis: {title: 'Date', gridlines: {count: 12}}
    })
  chartPanel.clear()
  selectionPanel.clear()
  selectionPanel.add(ui.Label('Choose an image to display:'))
  chartPanel.add(chart)
  var filtered = s2
    .filter(ee.Filter.date('2019-01-01', '2019-12-31'))
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 50))
    .map(maskS2clouds)
    .map(addNDVI)
    .filter(ee.Filter.bounds(geometry))
  var addNdviLayer = function(dateString) {
    var date = ee.Date.parse('YYYY-MM-dd', dateString)
    var image = ee.Image(filtered.filter(ee.Filter.date(date, date.advance(1, 'day'))).first())
    Map.addLayer(image.select('ndvi'), ndviVis, 'NDVI Image -' + dateString)
  }
  filtered.aggregate_array("system:time_start").evaluate(function(ids) {
    print(ids)
    var dates = ee.List(ids).map(function(timestamp) {
      return ee.Date(timestamp).format('YYYY-MM-dd')
    })
    dates.evaluate(function(dateList){
      selectionPanel.add(ui.Select({
      items: dateList,
      onChange: addNdviLayer
    }))
    })
});
}
resetEverything();
//Map.onClick(displayChart)
// Get the list of IDs and put them into a select
//var ids = withNdvi.aggregate_array("system:index")
// // Display the image with the given ID.
// var display = function(id) {
//   var image = withNdvi.filter(ee.Filter.eq("system:index", id))
//   Map.layers().reset()
//   Map.addLayer(image.select('ndvi'), ndviVis, "Image")
// }
// ids.evaluate(function(ids) {
//   var dropdown = ui.Select({
//     items: ids,
//     onChange: display
//   })
//   Map.add(dropdown)
// })
// Exercise
// The dropdown default value is empty. Change the code so that when the 
// script is run, the first item in the collection is selected and added to the map by default.