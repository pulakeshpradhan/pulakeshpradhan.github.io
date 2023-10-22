var table3 = ui.import && ui.import("table3", "table", {
      "id": "users/abocin/Dambovita"
    }) || ee.FeatureCollection("users/abocin/Dambovita"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/abocin/PucioasaSurrOne"
    }) || ee.FeatureCollection("users/abocin/PucioasaSurrOne"),
    table = ui.import && ui.import("table", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            25.429517496048895,
            45.06477421019036
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([25.429517496048895, 45.06477421019036]);
// Air Quality from Sentinel 5P
// Allows moving between different case studies
//Formaldehyde - HCHO
var collection = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_HCHO')
  .select('tropospheric_HCHO_column_number_density')
  .filterDate('2020-06-01', '2020-06-30')
  .filterBounds(table);
var band_viz = {
  min: 0.0,
  max: 0.0003,
  opacity: 0.9,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection.mean(), band_viz, 'S5P HCHO');
Map.centerObject(table, 9);
//Carbon Monoxide - CO
var collection = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO')
  .select('CO_column_number_density')
  .filterDate('2020-06-01', '2020-06-30')
  .filterBounds(table);
var band_viz = {
  min: 0,
  max: 0.05,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection.mean(), band_viz, 'S5P CO');
Map.centerObject(table,9);
//Methane - CH4
var collection = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CH4')
  .select('CH4_column_volume_mixing_ratio_dry_air')
  .filterDate('2020-06-01', '2020-06-30')
  .filterBounds(table);
var band_viz = {
  min: 1750,
  max: 1900,
  opacity: 0.9,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection.mean(), band_viz, 'S5P CH4');
Map.centerObject(table,9);
//Nitrogen Dioxide - NO2
var collection = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2020-06-01', '2020-06-30')
  .filterBounds(table);
var band_viz = {
  min: 0,
  max: 0.0002,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection.mean(), band_viz, 'S5P N02');
Map.centerObject(table,9);
//Sulphur Dioxide - SO2
var collection = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_SO2')
  .select('SO2_column_number_density')
  .filterDate('2020-06-01', '2020-06-30')
  .filterBounds(table);
var band_viz = {
  min: 0.0,
  max: 0.0005,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection.mean(), band_viz, 'S5P SO2');
Map.centerObject(table,9);
//var places = {
//    Pucioasa: [25.434776475558966,45.070882122470614],
//    Selimbar: [24.183245133422194,45.77075565228804],
//    Vladeni: [25.77415717175228,44.87610960339511]
//};