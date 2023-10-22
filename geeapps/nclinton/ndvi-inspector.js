var l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA");
// MAP DISPLAY LAYERS ---------------------------------------------------
// Map a function over the Landsat 8 collection 
// to add an NDVI band and mask clouds.
var masked = l8.map(function(image) {
  // Use a built-in cloud score (between 0-100)
  // and an arbitrary threshold of 10 for a cloud mask
  var score = ee.Algorithms.Landsat.simpleCloudScore(image).select('cloud');
  var mask = score.lt(10);
  // Compute the normalized difference.
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  // Return the image with NDVI, cloud-masked.
  return image.addBands(ndvi).updateMask(mask);
});
// Compute the median of the image stack.
var median = masked.median();
// Compute the normalized difference of the median (better for display).
var ndvi = median.normalizedDifference(['B5', 'B4']).rename('NDVI');
// Visualization parameters for NDVI.
var ndviVis = {min: 0, max: 0.7, palette:
  // http://colorbrewer2.org/#type=diverging&scheme=PRGn&n=7
  ['#762a83','#af8dc3','#e7d4e8','#f7f7f7','#d9f0d3','#7fbf7b','#1b7837']
};
// Visualization parameters for true color.
var trueColorVis = {bands: ['B4', 'B3', 'B2'], max: 0.3};
var ndviLayer = ui.Map.Layer(ndvi, ndviVis, 'NDVI');
var medianLayer = ui.Map.Layer(median, trueColorVis, 'median');
// Create the main map and set the true color and NDVI layers.
var map = ui.Map({lon: -90.1057, lat: 29.9966, zoom: 11});
var layers = map.layers();
layers.add(medianLayer);
layers.add(ndviLayer);
// PANEL SETUP ---------------------------------------------------
// Create a panel to hold widgets.
var panel = ui.Panel();
panel.style().set('width', '400px');
panel.style().set('position', 'bottom-left');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'NDVI Time Series Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to get: Landsat 8 median TOA spectrum, Landsat 8 TOA time series.')
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// MAP CLICK EVENT LOGIC  ---------------------------------------------------
var chartFunction = function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  map.layers().set(2, dot);
  // Create a spectrum chart.
  var spectrumChart = ui.Chart.image.regions({
    image: median.select(['B2', 'B3', 'B4', 'B5', 'B6', 'B7']), 
    regions: point, 
    reducer: ee.Reducer.mean(), 
    scale: 30, 
    xLabels: [0.48, 0.56, 0.65, 0.86, 1.61, 2.2]
  }).setOptions({
    title: 'Median TOA reflectance spectrum',
    vAxis: {title: 'reflectance'},
    hAxis: {title: 'wavelength (microns)', gridlines: {count: 7}},
    curveType: 'function',
    series: {
      0: { 
        visibleInLegend: false, 
        color: '555555'
      }
    },
  });
   panel.widgets().set(2, spectrumChart);
  // Get all the data for a linear regression.
  var listOfLists = ee.List(masked.getRegion(point, 30));
  // Turn the output of getRegion into a FeatureCollection.
  var keys = listOfLists.get(0);
  var data = listOfLists.slice(1);
  var fc = ee.FeatureCollection(data.map(function(list) {
    return ee.Feature(null, ee.Dictionary.fromLists(keys, list));
  }));
  // Map a function to create new properties holding the regression data.
  var startDate = ee.Date('2013-01-01');
  var regressionData = fc.map(function(feature) {
    var years = ee.Date(feature.get('time')).difference(startDate, 'year');
    var cos = years.multiply(2 * Math.PI).cos();
    var sin = years.multiply(2 * Math.PI).sin();
    var constant = ee.Number(1);
    return feature.set({
      constant: constant,
      years: years,
      cos: cos,
      sin: sin,
    });
  });
  // Filter out nulls for NDVI.
  var filtered = fc.filter(ee.Filter.neq('NDVI', null));
  // Perform the regression on the filtered data.
  var regression = regressionData.reduceColumns({
    reducer: ee.Reducer.linearRegression(4), 
    selectors: ['constant', 'years', 'cos', 'sin', 'NDVI'],
  });
  // 1xP vector of coefficients.
  var coefficients = ee.Array(regression.get('coefficients')).transpose();
  // Map a function over the regression data to compute the predictions.
  // These predictions will exist for every image, even where NDVI is masked.
  var predictions = regressionData.map(function(feature) {
    var predictors = feature.toArray(['constant', 'years', 'cos', 'sin']);
    var prediction = coefficients.matrixMultiply(ee.Array.cat([predictors], 1));
    return feature.set('prediction', prediction.get([0, 0]));
  });
  // Make the chart from the sorted FeatureCollection.
  var ndviChart = ui.Chart.feature.byFeature({
    features: predictions.sort('time'), 
    xProperty: 'time', 
    yProperties: ['NDVI', 'prediction']
  });
  // Customize the NDVI series chart.
  ndviChart.setSeriesNames(['observed', 'interpolated']);
  ndviChart.setOptions({
    title: 'NDVI time series',
    vAxis: {title: 'NDVI'},
    hAxis: {
      title: 'date', 
      format: 'MM-yy', 
      gridlines: {count: 7}
    },
    series: {
      0: {
        color: '1b7837',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 3,
      },
      1: {
        lineWidth: 2,
        color: '4575b4',
        pointsVisible: false
      }
    },
    trendlines: {
      0: {
        type: 'linear',
        color: 'red',
        lineWidth: 1,
        opacity: 0.3,
        showR2: true,
        visibleInLegend: true
      }
    },
    legend: {position: 'right'},
  });
  panel.widgets().set(3, ndviChart);
};
// MAP SETUP ---------------------------------------------------
// Register a callback on the default map to be invoked when the map is clicked.
map.onClick(chartFunction);
// Configure the map.
map.style().set('cursor', 'crosshair');
map.add(panel);
ui.root.clear();
ui.root.add(map);
// Initialize with a test point.
var aPoint = ee.Geometry.Point(-90.1057, 29.9966);
aPoint.coordinates().evaluate(function(coordinates) {
  chartFunction({
    lon: coordinates[0],
    lat: coordinates[1]
  });
}) ;
// LEGEND SETUP ---------------------------------------------------
// A hacky function that makes thumbnail parameters for a
// color bar with the given color palette.
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
  params: makeColorBarParams(ndviVis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(ndviVis.min, {margin: '4px 8px'}),
    ui.Label((ndviVis.max / 2), {margin: '4px 8px', textAlign: 'center', stretch:'horizontal'}),
    ui.Label(ndviVis.max, {margin: '4px 8px'})
  ], 
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Map Legend: median NDVI',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
panel.widgets().set(4, legendPanel);