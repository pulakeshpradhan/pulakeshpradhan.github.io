var L8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR");
// Use the "USGS Landsat 8 Surface Reflectance Tier 1" collection.
var L8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
           //.filterDate('2018-06-01', '2018-06-02');
           .filterDate('2018-01-01', '2019-01-01');
// Calculate a vegetation index from multiple spectral bands.
function addNDVI(image) {
  var ndvi = image.normalizedDifference(['B5', 'B4']); // Landsat 8
  return image.addBands(ndvi.rename('ndvi'));
}
var withNdvi = L8.map(addNDVI);
var rgbVis = {min: 0, max: 3000, gamma: 1.5, bands: ['B4', 'B3', 'B2']};
var ndviVis = {bands:'ndvi', min:0, max:1, palette:['black','lightgreen']};
//////////////// User Interface ////////////////
var map1 = ui.Map();
map1.add(ui.Panel({
  widgets:[ui.Label('Median Composite - RGB')],
  style: {position: 'bottom-left'}
}));
map1.addLayer(withNdvi.median(), rgbVis, 'RGB');
var map2 = ui.Map();
map2.add(ui.Panel({
  widgets:[ui.Label('Median Composite - NDVI')],
  style: {position: 'bottom-right'}
}));
map2.addLayer(withNdvi.median(), ndviVis, 'NDVI');
// Present the imagery using a split map.
var linker = ui.Map.Linker([map1,map2]);
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
map1.setCenter(-121.15148, 37.87149, 12);
//////////////// Event handling ////////////////
var mapClicked = function(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  // Create an RGB spectrum chart.
  var rgbChart = ui.Chart.image.series(withNdvi.select('ndvi'), point)
      .setOptions({
        title: 'NDVI Change Over Time',
        vAxis: {title: 'band value'},
        hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
        height: "100%"
      });
  panel1.clear();
  panel1.widgets().set(1, rgbChart);
  // Add a red dot for the point clicked on.
  var dot1 = ui.Map.Layer(point, {color: 'FF0000'}, 'selected location');
  map1.layers().set(1, dot1);
  var dot2 = ui.Map.Layer(point, {color: 'FF0000'}, 'selected location');
  map2.layers().set(1, dot2);
};
map1.onClick(mapClicked);
map2.onClick(mapClicked);