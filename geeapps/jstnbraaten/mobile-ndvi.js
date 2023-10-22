Map.setControlVisibility({all: false});
function getS2(point) {
  return ee.ImageCollection('COPERNICUS/S2_SR')
  .filterBounds(point)
  .limit(50)
  .sort('CLOUDY_PIXEL_PERCENTAGE', false)
  .mosaic()
  .visualize({bands: ['B11', 'B8', 'B3'], min: 100, max: 4500, opacity: 1});
}
function getNdviChart(point) {
  return ui.Chart.image
              .seriesByRegion({
                imageCollection: ee.ImageCollection('MODIS/006/MOD13Q1').filterDate('2010-01-01', '2021-01-01'),
                regions: point,
                reducer: ee.Reducer.first(),
                band: 'NDVI',
                scale: 250,
                xProperty: 'system:time_start'
              })
              .setChartType('LineChart')
              .setOptions({
                titlePostion: 'none',
                legend: {position: 'none'},
                hAxis: {title: 'Date'},
                vAxis: {title: 'NDVI (x1e4)'},
                series: {0: {color: '66b266'}},
                curveType: 'function',
                lineWidth: 1.5,
                chartArea:{left:20, top:0, width:'90%', height:'75%'},
                explorer: {},
              });
}
function showPosition(point) {
  var center = ee.Geometry.Point(
    ee.Number(point.coordinates().get(0)),
    ee.Number(point.coordinates().get(1)).subtract(0.007));
  Map.centerObject(center, 14);
  Map.addLayer(getS2(point));
  Map.addLayer(point, {color: 'ffff00'});
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  chartPanel.add(getNdviChart(point));
}
function errorMessage(message) {
  alert('Cannot get current position');
}
function getPostionInfo() {
  Map.clear();
  chartPanel.clear();
  Map.setControlVisibility({all: false});
  Map.add(actionButton);
  Map.add(chartPanel);
  ui.util.getCurrentPosition(showPosition, errorMessage);
}
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '94%', position: 'bottom-left', shown: false}
});
var actionButton = ui.Button({label: 'Get info', onClick: getPostionInfo, style: {position: 'top-right'}});
Map.add(chartPanel);
Map.add(actionButton);