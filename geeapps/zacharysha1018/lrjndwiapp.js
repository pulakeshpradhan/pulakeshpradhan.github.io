var table = ui.import && ui.import("table", "table", {
      "id": "users/zacharysha1018/beijing"
    }) || ee.FeatureCollection("users/zacharysha1018/beijing");
var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_32DAY_NDWI')
                  .filterDate('2017-01-01', '2017-12-31');
var colorized = dataset.select('NDWI');
var colorizedVis = {
  min: 0.0,
  max: 1.0,
  palette: ['0000ff', '00ffff', 'ffff00', 'ff0000', 'ffffff'],
};
Map.setCenter(116, 40);
Map.addLayer(colorized, colorizedVis, 'Colorized');