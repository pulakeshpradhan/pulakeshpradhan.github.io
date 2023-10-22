var s2 = ee.ImageCollection("COPERNICUS/S2"),
    roi = /* color: #ffc82d */ee.Geometry.Point([14.38934326171875, 50.05120770091101]);
//////////////// Constants ////////////////
var RGB_VIS = {min: 0, max: 3000, gamma: 1.5, bands: ['B4', 'B3', 'B2']};
//////////////// Functions ////////////////
function addNDVI(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']); // Sentinel 2
  return image.addBands(ndvi.rename('ndvi'));
}
//////////////// Analysis ////////////////
var filtered = s2.filterDate('2017-01-01', '2018-01-01');
var with_ndvi = filtered.map(addNDVI);
var greenest = with_ndvi.qualityMosaic('ndvi');
//////////////// User Interface ////////////////
var map1 = ui.Map();
map1.style().set('cursor', 'crosshair');
map1.add(ui.Label('Median Composite'));
map1.addLayer(with_ndvi.median(), RGB_VIS, 'RGB');
var map2 = ui.Map();
map2.style().set('cursor', 'crosshair');
map2.add(ui.Label('Greenest Pixel Composite'));
map2.addLayer(greenest, RGB_VIS, 'RGB (greenest pixel)');
// Link the two maps.
var linker = ui.Map.Linker([map1,map2]);
// Make a split map.
var splitMap = ui.SplitPanel({
  firstPanel: map1,
  secondPanel: map2,
  wipe: true,
});
var panel1 = ui.Panel({
  widgets: [ui.Label('Click on the map to see a time series chart.')]
});
var splitPanel = ui.SplitPanel({
  firstPanel: ui.Panel([splitMap]),
  secondPanel: panel1,
  orientation: "vertical",
  wipe: false,
});
ui.root.widgets().reset([splitPanel]);
//////////////// Event handling ////////////////
var mapClicked = function(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Create an RGB spectrum chart.
  var rgbChart = ui.Chart.image.series(with_ndvi.select('B[2-5]'), point)
      .setOptions({
        title: 'RGB Reflectance Over Time',
        vAxis: {title: 'band value'},
        hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
        height: "100%"
      });
  panel1.clear();
  panel1.widgets().set(1, rgbChart);
  // Add a red dot for the point clicked on.
  var dot1 = ui.Map.Layer(point, {color: 'FF0000'});
  map1.layers().set(1, dot1);
  var dot2 = ui.Map.Layer(point, {color: 'FF0000'});
  map2.layers().set(1, dot2);
};
map1.onClick(mapClicked);
map2.onClick(mapClicked);
//////////////// Initialize ////////////////
map1.setCenter(-121.15148, 37.87149, 12);