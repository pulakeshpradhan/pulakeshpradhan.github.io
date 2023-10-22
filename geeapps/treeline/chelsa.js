var hansen = ee.Image("UMD/hansen/global_forest_change_2018_v1_6"),
    point = /* color: #98ff00 */ee.Geometry.Point([18.9873, -33.9816]);
// Initialize the map.
// ===================
var map = ui.Map();
var precip = ee.ImageCollection('projects/map-of-life/chelsa/v201905/prec_collection')
    .filterDate('2016-01-01', '2017-01-01');
var land = hansen.select("datamask").eq(1);
precip = precip.map(function maskWater(p) {
  return p.updateMask(p.gte(0)).updateMask(land)
    .rename("Daily Precipitation");
});
// print(precip.limit(5))
// Monthly aggregation.
var month = ee.List.sequence(1, 12);
var monthlyPrec = ee.ImageCollection(month.map(function aggregation(m) {
  var mnP = precip.filter(ee.Filter.calendarRange(m, m, "month"));
  // var first = mnP.first().get("system:time_start");
  // var last = mnP.sort("system:time_start", false).first()
  //   .get("system:time_start");
  // var t = ee.Number(first).add(last).divide(2)
  var t = mnP.first().get("system:time_start");
  mnP = mnP.mean().rename("Monthly Average Precipitation")
    .set("system:time_start", t);
  return mnP;
}));
// print(monthlyPrec)
var scale = 927.6624195666301;
var threshold = 0;
// var prec_Palette = ['1621A2', 'white', 'cyan', 'green', 'yellow', 'orange', 'red'];
// var prec_Palette = [
//   '000096','0064ff', '00b4ff', '33db80', '9beb4a',
//   'ffeb00', 'ffb300', 'ff6400', 'eb1e00', 'af0000'
// ];
var prec_Palette = ['3907ff', '03fff3', '28ff25', 'fbff09', 'ff1105'];
var vis = {min: 0, max: 50, palette: prec_Palette, 
  opacity: 1};
map.setOptions("hybrid");
map.style().set('cursor', 'crosshair');
map.addLayer(precip.mean(), vis, 'Average Daily Precipitation'); 
map.centerObject(point, 8); // South Africa.
// Show the clicked point on the map.
// ======================
function showPointOnMap(point) {
  var pt = ui.Map.Layer(point, {color: 'FF0000'}, "Selected Point");
  map.layers().set(1, pt);
}
// Display a precipitation chart.
// ======================
function makeChart(point) {
  var chart = ui.Chart.image.series(precip.merge(monthlyPrec), 
    point, 
    ee.Reducer.mean(), 
    scale);
  chart.setOptions({
    title: 'CHELSA Precipitation Over Time',
    vAxis: {title: 'Precipitation'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
    colors: ["0000FF", "FF0000"]
  }).setChartType('LineChart');
  return chart;
}
// Mask mean daily precipitation (if needed).
// ======================
function maskPrecip(value) {
  map.layers().reset();
  var threshold = Number(value);
  var precipMean = precip.mean();
  var masked = precipMean.updateMask(precipMean.gt(threshold));
  map.addLayer(masked, vis, 'Mean Daily Precipitation');
  showPointOnMap(point);
}
// Make a textbox for the threshold.
// ======================
function makeTextbox() {
  var textboxLabel = ui.Label({
    value: 'Minimum Annual Average Precipitation in 2016:',
    style: {stretch: 'vertical', padding: '10px'}
  });
  var textbox = ui.Textbox({
    placeholder: 'A number between 0 and 100',
    value: threshold,
    onChange: maskPrecip,
    style: {width: '100px'}
  });
  maskPrecip(threshold);
  return ui.Panel(
    [textboxLabel, textbox],
    ui.Panel.Layout.flow('horizontal'));
} 
// Initialize the widgets.
// ======================
function init() {
  var panel = ui.Panel({
    style: {
      width: '30%',
      border: '3px solid #0000FF', // #ddd
    }
  });
  var title = ui.Label({
    value: 'CHELSA Precipitation Explorer',
    style: {
      fontSize: '18px',
      fontWeight: '100, bold',
      padding: '10px',
      color: "0000FF"
    }
  });
  var instructions = ui.Label({
    value: 'Click on the map to show precipitation chart.',
    style: {
      color: 'gray',
      padding: '10px',
    }
  });
  var chartPanel = ui.Panel();
  var textBoxPanel = ui.Panel();
  panel.add(title);
  panel.add(textBoxPanel);
  panel.add(instructions);
  panel.add(chartPanel);
  var splitPanel = ui.SplitPanel({
    firstPanel: panel,
    secondPanel: map,
  });
  ui.root.clear();
  ui.root.add(splitPanel);
  showPointOnMap(point);
  chartPanel.clear();
  chartPanel.add(makeChart(point));
  textBoxPanel.add(makeTextbox()); 
  // Bind the click handler to the new map.
  map.onClick(function(coordinates){
    var point = ee.Geometry.Point([coordinates.lon, coordinates.lat]);
    showPointOnMap(point);
    chartPanel.clear();
    chartPanel.add(makeChart(point));
  });
}
init();