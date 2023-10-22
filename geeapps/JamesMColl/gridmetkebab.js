var getSecondsInMonth = function(startTime) {
  var year = ee.Number(ee.Date(startTime).get('year'));
  var month = ee.Number(ee.Date(startTime).get('month'));
  var end = ee.Number(ee.Date.fromYMD(year,month,1).advance(1,'month').millis());
  var start = ee.Number(ee.Date.fromYMD(year,month,1).millis());
  var SecondsInMonth = ee.Number.expression('abs(s - e) / 1000',
    {
        s: start,
        e: end
    });
  return ee.Image(SecondsInMonth);
};
var currentData = ee.ImageCollection("OREGONSTATE/PRISM/AN81m")
  .filterDate('1880-01-01','2021-01-01')
  .select('ppt','tmax','tmean','tmin');
var projections = ee.ImageCollection('NASA/NEX-DCP30')
  .filterDate('2021-01-01','2100-01-01')
  .filter(ee.Filter.eq('scenario', 'rcp85'))
  .filter(ee.Filter.eq('model', 'MIROC5'))
  .map(function(oddImage) {
    // kg/m2/s is equivalent to mm/s
    var secondsdThisMonth = getSecondsInMonth(oddImage.get('system:time_start'));
    var calibratedImagePrecip = ee.Image(oddImage).select('pr').multiply(secondsdThisMonth).select(['pr'],['ppt']);
    var calibratedImageTempmax = ee.Image(oddImage.select('tasmax').subtract(273.15)).select(['tasmax'],['tmax']);
    var calibratedImageTempmean = ee.Image(((oddImage.select('tasmax').add(oddImage.select('tasmin'))).divide(2)).subtract(273.15)).select(['tasmax'],['tmean']);
    var calibratedImageTempmin = ee.Image(oddImage.select('tasmin').subtract(273.15)).select(['tasmin'],['tmin']);
    var calibratedImage = ee.Image(calibratedImagePrecip)
      .addBands(calibratedImageTempmax)
      .addBands(calibratedImageTempmean)
      .addBands(calibratedImageTempmin)
      .set('system:time_start', oddImage.get('system:time_start'));
    return(calibratedImage);
  });
var database = ee.ImageCollection(currentData).merge(projections);
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '400px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Data Skewer - Precip & Temp',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Retroactive data from PRISM climate').setUrl("https://developers.google.com/earth-engine/datasets/catalog/OREGONSTATE_PRISM_AN81m"),
  ui.Label('Projected data from NASA DCP30 (MIROC5 model @ rcp8.5)').setUrl("https://developers.google.com/earth-engine/datasets/catalog/NASA_NEX-DCP30"),
  ui.Label('Click a point on the map to inspect or click a series on a chart to show the image for that date.')
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
var dateview = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(1, dot);
  // Create charts.
  var dataChart = ui.Chart.image.series(database, point, ee.Reducer.first(), 1000);
  dataChart.onClick(function(xValue, yValue, seriesName) {
    if (!xValue) return;  // Selection was cleared.
    // Show the image for the clicked date.
    var equalDate = ee.Filter.equals('system:time_start', xValue);
    var image = ee.Image(database.filter(equalDate).first());
    var maplayer = ui.Map.Layer(image);
    Map.layers().reset([maplayer, point]);
    // Show a label with the date on the map.
    dateview.setValue((new Date(xValue)).toUTCString());
  });
  dataChart.setOptions({
    title: 'Temperature and Precipitation',
    vAxis: {title: 'Temp & Precip (c & mm)'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
  panel.widgets().set(2, dataChart);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);
var testPoint = ee.Geometry.Point([-88.02503216920715, 44.514937089236575]);
// Map.c(testPoint);