var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                145.49536279907284,
                -15.982998395916587
              ],
              [
                145.49536279907284,
                -16.205987981863
              ],
              [
                145.5860000061041,
                -16.205987981863
              ],
              [
                145.5860000061041,
                -15.982998395916587
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#000000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #000000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[145.49536279907284, -15.982998395916587],
          [145.49536279907284, -16.205987981863],
          [145.5860000061041, -16.205987981863],
          [145.5860000061041, -15.982998395916587]]], null, false);
Map.setCenter(32.327, 31.4532, 10);
Map.setOptions("Hybrid");
Map.setControlVisibility({ all: false });
var dem = ee.ImageCollection("JAXA/ALOS/AW3D30/V3_2").mean().select("DSM");
var s1 = ee
  .ImageCollection("COPERNICUS/S1_GRD")
  .filter(ee.Filter.listContains("transmitterReceiverPolarisation", "VV"))
  .filter(ee.Filter.eq("instrumentMode", "IW"))
  .sort("system:time_start");
var suez = ee.Geometry.Polygon([
  [
    [32.17388584692775, 31.59541178442045],
    [32.17388584692775, 31.327159861902278],
    [32.4787564523965, 31.327159861902278],
    [32.4787564523965, 31.59541178442045],
  ],
]);
var drawingTools = Map.drawingTools();
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry = ui.Map.GeometryLayer({
  geometries: null,
})
  .fromGeometry(suez)
  .setShown(false);
drawingTools.layers().add(dummyGeometry);
function drawPolygon() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
  drawingTools.setShape("rectangle");
  drawingTools.draw();
}
function getVectors(img) {
  var aoi = drawingTools.layers().get(0).getEeObject();
  var processed = img.clip(aoi).select("VV");
  var cutoff = processed.gt(0);
  var points = cutoff.reduceToVectors({
    geometry: aoi,
    scale: scaleSlider.getValue(),
    geometryType: "centroid",
    eightConnected: true,
    maxPixels: 1653602926,
  });
  var count = points.size();
  var date = ee.Date(img.get("system:time_start"));
  return points.set("count", count).set("system:time_start", date);
}
// Run this function on a change of the dateSlider.
var daterangeVectors = function () {
  var range = ee.DateRange(
    ee.Date(dateSlider.getValue()[0]),
    ee.Date(dateSlider.getValue()[1])
  );
  var aoi = drawingTools.layers().get(0).getEeObject();
  drawingTools.layers().get(0).setShown(false);
  var s1Filtered = s1.filterDate(range.start(), range.end())
  var vectors = s1Filtered.filterBounds(aoi).map(getVectors);
  viz(aoi, vectors, s1Filtered.max().updateMask(dem.lte(0)));
  var chart = ui.Chart.feature
    .byFeature({
      features: vectors,
      xProperty: "system:time_start",
      yProperties: ["count"],
    })
    .setOptions({
      title: "Daily Number of Ships in Area of Interest",
      vAxis: { title: "Ship Count" },
      explorer: { axis: "horizontal" },
      lineWidth: 2,
      series: "Area of Interest",
    });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  homePanel.widgets().set(4, chart);
  var filterDay = function (callback) {
    var date = ee.Date(callback);
    var vectorDay = vectors.filterDate(date);
    var s1Day = s1.filterDate(date).max().updateMask(dem.lte(0));
    viz(aoi, vectorDay, s1Day);
  };
  chart.onClick(filterDay);
};
function viz(aoi, vectors, s1Filtered) {
  // Create an empty image into which to paint the features, cast to byte.
  var empty = ee.Image().byte();
  // Paint all the polygon edges with the same number and width, display.
  var outline = empty.paint({
    featureCollection: aoi,
    color: 1,
    width: 3,
  });
  var aoi_layer = ui.Map.Layer(outline, { palette: "red" }, "AOI");
  var vectorLayer = ui.Map.Layer(
    vectors.flatten(),
    { color: "#39ff14" },
    "Vectors"
  );
  var sarLayer = ui.Map.Layer(
    s1Filtered,
    { min: [-25, -20, -25], max: [0, 10, 0], opacity: 0.8 },
    "SAR"
  );
  Map.layers().set(0, sarLayer);
  Map.layers().set(1, vectorLayer);
  Map.layers().set(2, aoi_layer);
}
// UI
var drawButton = ui.Button({
  label: "🔺" + " Draw a Polygon",
  onClick: drawPolygon,
  style: { stretch: "horizontal" },
});
var scaleLabel = ui.Label("Ship Size: ");
var scaleSlider = ui.Slider({
  min: 1,
  max: 100,
  value: 80,
  step: 1,
  onChange: daterangeVectors,
  style: { width: "70%" },
});
var scalePanel = ui.Panel({
  widgets: [scaleLabel, scaleSlider],
  style: { stretch: "horizontal" },
  layout: ui.Panel.Layout.Flow("horizontal"),
});
var homePanel = ui.Panel({
  widgets: [
    ui.Label("SAR Ship Detection", {
      fontWeight: "bold",
      fontSize: "20px",
    }),
    ui.Label(
      "This tool identifies ships using Synthetic Aperture Radar imagery. Use the date slider below to analyze a given year. Click on the graph to show ships on a given day.",
      { whiteSpace: "wrap" }
    ),
    ui.Label(),
    ui.Label(),
    ui.Label(),
    scalePanel,
    ui.Label(
      "Click the button below and draw a rectangle on the map to count ships in a custom area."
    ),
  ],
  style: {maxWidth: "400px"},
  layout: ui.Panel.Layout.flow("vertical", true),
});
var start = "2014-01-01";
var now = Date.now();
var end = ee.Date(now).format();
var dateSlider = ui.DateSlider({
  value: "2021-03-01",
  start: start,
  end: now,
  period: 365,
  onChange: daterangeVectors,
  style: { width: "95%" },
});
ui.root.insert(0,homePanel);
homePanel.widgets().set(3, dateSlider);
homePanel.add(drawButton);
drawingTools.onDraw(ui.util.debounce(daterangeVectors, 500));
daterangeVectors();
//boxes=boxes.map(function(feature){return feature.set('area',feature.geometry().area(10))}).filter(ee.Filter.gt('area',5000))
//   boxes = boxes.map(function(feature) {
//   return feature.buffer(100);
// })
// boxes=ee.FeatureCollection(boxes.geometry().dissolve();)