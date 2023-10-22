var roi = ui.import && ui.import("roi", "table", {
      "id": "users/njaumaggielu/jiangsusheng"
    }) || ee.FeatureCollection("users/njaumaggielu/jiangsusheng");
//创建表达式函数NDVI
//var NDVI = function(image) {
  //return image.expression('float(b("B5") - b("B4")) / (b("B5") + b("B4"))').clip(roi);
//};
var roi = ee.FeatureCollection("users/njaumaggielu/jiangsusheng");
function NDVI(img) {
 var ndvi = img.normalizedDifference(["B5","B4"]).clip(roi);
 return ndvi;
}
var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA').filterBounds(roi)
    .filterDate('2013-01-01', '2020-12-31');
// 创建调色板
var vis = {
 min: -0.2,
 max: 0.8,
 palette: 'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400,' +
   '3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301'
};
// Create a map panel.
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
// Add a title and some explanatory text to a side panel.
var header = ui.Label('江苏省2013-2020年NDVI', {fontSize: '24px', fontWeight: 'bold'});
var toolPanel = ui.Panel([header], 'flow', {width: '500px'});
ui.root.widgets().add(toolPanel);
//中心
Map.setCenter(118.4909, 32.8791, 7);
// 图像显示
Map.addLayer(collection.map(NDVI).mean(), vis, 'Mean NDVI');
var ndvi_list = collection.filterDate('2013-01-01', '2020-12-31')
   .map(function(image) {
   //通过云筛选landsat8
   var cloud = ee.Algorithms.Landsat.simpleCloudScore(image).select("cloud");
   var mask = cloud.lte(20);
   var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
   return image.addBands(ndvi).updateMask(mask);
});
/*
 * Chart setup
 */
// Generates a new time series chart of SST for the given coordinates.
//var generateChart = function (coords) {
  // Make a chart from the time series.
  var sstChart = ui.Chart.image.series({
    imageCollection: ndvi_list.select('NDVI'),
    region: roi, 
    reducer: ee.Reducer.mean(),
    scale: 500});
  // Customize the chart.
  sstChart.setOptions({
    title: '江苏省NDVI：时间序列',
    vAxis: {title: 'NDVI'},
    hAxis: {title: '日期', gridlines: {count: 7}},
    series: {
      0: {
        color: 'green',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 1,
      },
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  toolPanel.widgets().set(2, sstChart);
//};
/*
 * Legend setup
 */
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: '图例：2013-2020年江苏省NDVI均值',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
toolPanel.widgets().set(3, legendPanel);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');