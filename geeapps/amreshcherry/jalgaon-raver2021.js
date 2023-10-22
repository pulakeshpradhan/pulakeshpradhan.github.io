var table = ui.import && ui.import("table", "table", {
      "id": "users/amreshcherry/raver"
    }) || ee.FeatureCollection("users/amreshcherry/raver");
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-03-30', '2021-04-5')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
  var l8 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2020-03-30', '2021-04-1')
// Create two collections to sample from, one for each plot.
var rgb = l8.select(['B8', 'B4', 'B3']);
var ndviyear = l8.map(function(image) {
  return image.select().addBands(image.normalizedDifference(['B8', 'B4']));
});                
  var COLOR = {
  BANANA: 'ff0000',
  HARVESTED: '0000ff',
  SETTLEMENT: '00ff00'
};
var banana = ee.Feature(
    ee.Geometry.Point( 75.943053,  21.151625), {'label': 'Banana'});
var harvested = ee.Feature(
    ee.Geometry.Point( 75.942146,   21.146304), {'label': 'Harvested'});
var settlement = ee.Feature(
    ee.Geometry.Point( 75.944804,  21.149862), {'label': 'Settlement'});
    // Spectral chart
    var danasurPoints = ee.FeatureCollection([banana, harvested, settlement]);
dataset = dataset.filterBounds(danasurPoints);
var danasurImage = ee.Image(dataset.first());
// Select bands B1 to B7.
danasurImage = danasurImage.select(['B[2-8]']);
var bandChart = ui.Chart.image.regions({
  image: danasurImage,
  regions: danasurPoints,
  scale: 30,
  seriesProperty: 'label'
});
bandChart.setChartType('LineChart');
bandChart.setOptions({
  title: 'Sentinel  band values at three points near Danasur',
  hAxis: {
    title: 'Band'
  },
  vAxis: {
    title: 'Reflectance'
  },
  lineWidth: 1,
  pointSize: 4,
  series: {
    0: {color: COLOR.PARK},
    1: {color: COLOR.FARM},
    2: {color: COLOR.URBAN}
  }
});
// From: https://landsat.usgs.gov/what-are-best-spectral-bands-use-my-study
var wavelengths = [.40, .50, .60, .65, .86, 1.61, 2.2];
var spectraChart = ui.Chart.image.regions({
  image: danasurImage,
  regions: danasurPoints,
  scale: 30,
  seriesProperty: 'label',
  xLabels: wavelengths
});
spectraChart.setChartType('LineChart');
spectraChart.setOptions({
  title: 'Sentinel  band values at three points near Danasur',
  hAxis: {
    title: 'Wavelength (micrometers)'
  },
  vAxis: {
    title: 'Reflectance'
  },
  lineWidth: 1,
  pointSize: 4,
  series: {
    0: {color: COLOR.PARK},
    1: {color: COLOR.FARM},
    2: {color: COLOR.URBAN}
  }
});
print(bandChart);
print(spectraChart);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B8', 'B4', 'B3'],
};
var sentinel1 = dataset.median();
var ndvi = sentinel1.normalizedDifference(['B8','B4']);
var fc = ee.FeatureCollection("users/amreshcherry/raver");
var clipped = ndvi.clipToCollection(fc);
var clipped1 = sentinel1.clipToCollection(fc);
var dmean = clipped.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: fc,
  scale: 200
});
print(dmean);
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Two Chart Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to inspect.')
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
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
//var canny = ee.Algorithms.CannyEdgeDetector(clipped, 0.4);
// Mask the image with itself to get rid of areas with no edges.
//canny = canny.updateMask(canny);
 // Create an NDVI chart.
  var ndviChart = ui.Chart.image.series(ndviyear, point, ee.Reducer.mean(), 500);
  ndviChart.setOptions({
    title: 'NDVI Over Time',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
  });
  panel.widgets().set(2, ndviChart);
  // Create an RGB spectrum chart.
  var rgbChart = ui.Chart.image.series(rgb, point)
      .setOptions({
        title: 'RGB Reflectance Over Time',
        vAxis: {title: 'band value'},
        hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
      });
   panel.widgets().set(3, rgbChart);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);
var vis = {
  min: 0,
  max: 1,
  palette: [
      'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
      '74A901', '66A000', '529400', '3E8601', '207401', '056201',
      '004C00', '023B01', '012E01', '011D01', '011301'
  ]
};
Map.setCenter(75.940524, 21.159574, 11);
//Map.addLayer(dataset.mean(), visualization, 'FCC');
Map.addLayer(clipped1, visualization, 'FCC');
Map.addLayer(clipped, vis, 'Raver NDVI');
Map.addLayer(banana, {color: COLOR.BANANA});
Map.addLayer(harvested, {color: COLOR.HARVESTED});
Map.addLayer(settlement, {color: COLOR.SETTLEMENT});
//Map.addLayer(canny, {min: 0, max: 1, palette: 'FF0000'}, 'Canny Edges');