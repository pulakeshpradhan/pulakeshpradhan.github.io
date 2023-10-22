var s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            14.38934326171875,
            50.05120770091101
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([14.38934326171875, 50.05120770091101]);
var filtered = s2.filterDate('2016-04-01', '2016-07-01');
var rgb_vis = {
  min: 0,
  max: 2500,
  gamma: 1.4,
  bands: ['B4', 'B3', 'B2']
};
function addNDVI(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']);
  return image.addBands(ndvi);
}
var with_ndvi = filtered.map(addNDVI);
var greenest = with_ndvi.qualityMosaic('nd');
Map.addLayer(greenest, rgb_vis, 'RGB (greenest pixel)');
// Show a chart of NDVI in the region of interest.
print(ui.Chart.image.series(with_ndvi.select('nd'), roi));
Map.centerObject(roi, 11);  // Prague