var collection = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CH4')
  .select('CH4_column_volume_mixing_ratio_dry_air')
  .filterDate('2020-01-01', '2020-01-31');
var band_viz = {
  min: 1750,
  max: 1900,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection.mean(), band_viz, 'S5P CH4 2020-01');
Map.setCenter(0.0, 0.0, 2);
var collection = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CH4')
  .select('CH4_column_volume_mixing_ratio_dry_air')
  .filterDate('2021-01-01', '2021-02-01');
var band_viz = {
  min: 1750,
  max: 1900,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
Map.addLayer(collection.mean(), band_viz, 'S5P CH4 2021-01');
Map.setCenter(0.0, 0.0, 2);