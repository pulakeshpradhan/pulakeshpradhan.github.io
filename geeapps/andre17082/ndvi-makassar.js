var l8toa = ui.import && ui.import("l8toa", "imageCollection", {
      "id": "LANDSAT/LC08/C02/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA"),
    visualisasi = ui.import && ui.import("visualisasi", "imageVisParam", {
      "params": {
        "bands": [
          "B5",
          "B3",
          "B2"
        ],
        "max": 0.3
      }
    }) || {"bands":["B5","B3","B2"],"max":0.3},
    polygon = ui.import && ui.import("polygon", "table", {
      "id": "projects/ee-andre17082/assets/Makassar"
    }) || ee.FeatureCollection("projects/ee-andre17082/assets/Makassar"),
    visndvi = ui.import && ui.import("visndvi", "imageVisParam", {
      "params": {
        "min": -1,
        "max": 1,
        "palette": [
          "blue",
          "white",
          "green"
        ]
      }
    }) || {"min":-1,"max":1,"palette":["blue","white","green"]},
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI"
        ],
        "min": -1,
        "palette": [
          "0000ff",
          "ffffff",
          "008000"
        ]
      }
    }) || {"opacity":1,"bands":["NDVI"],"min":-1,"palette":["0000ff","ffffff","008000"]};
var shp = ee.FeatureCollection(polygon)
//median
var median = l8toa.filterDate('2019-01-01', '2019-12-31').median();
// true color
var visualisasi = {bands: ['B5', 'B3', 'B2'], max: 0.3};
//memunculkan visualisasi
Map.addLayer(median, visualisasi, 'median');
// citra yang sedikit awannya
var citral8 = ee.Image(
  l8toa.filterBounds(polygon)
    .filterDate('2021-01-01', '2021-10-31')
    .sort('CLOUD_COVER')
    .first()
);
// selection band 5 dan band 4
var nir = citral8.select('B5');
var red = citral8.select('B4');
// Membuat perhitungan ndvi
var ndvi = nir.subtract(red).divide(nir.add(red)).rename('NDVI');
// visualisasi ndvi
Map.centerObject(citral8, 10);
var visndvi = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
Map.addLayer(ndvi, visndvi, 'Citra NDVI');
Map.addLayer(ndvi.clip(polygon), visndvi, 'NDVI Makassar');