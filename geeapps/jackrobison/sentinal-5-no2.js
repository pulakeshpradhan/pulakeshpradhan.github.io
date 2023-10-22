// ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_HCHO")
// COPERNICUS/S5P/NRTI/L3_NO2
Map.addLayer(ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2').select('NO2_column_number_density').filterDate('2020-02-25', '2020-02-27').mean(), {min: 0,max: 0.0002,palette: ['green', 'yellow', 'red']}, '2/25 - 2/27', false, 0.5);
Map.addLayer(ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2').select('NO2_column_number_density').filterDate('2020-02-27', '2020-02-29').mean(), {min: 0,max: 0.0002,palette: ['green', 'yellow', 'red']}, '2/27 - 3/29', false, 0.5);
Map.addLayer(ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2').select('NO2_column_number_density').filterDate('2020-02-29', '2020-03-02').mean(), {min: 0,max: 0.0002,palette: ['green', 'yellow', 'red']}, '2/29 - 3/02', false, 0.5);
Map.addLayer(ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2').select('NO2_column_number_density').filterDate('2020-03-02', '2020-03-04').mean(), {min: 0,max: 0.0002,palette: ['green', 'yellow', 'red']}, '3/02 - 3/04', false, 0.5);
Map.addLayer(ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2').select('NO2_column_number_density').filterDate('2020-03-04', '2020-03-06').mean(), {min: 0,max: 0.0002,palette: ['green', 'yellow', 'red']}, '3/04 - 3/06', false, 0.5);
Map.addLayer(ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2').select('NO2_column_number_density').filterDate('2020-03-06', '2020-03-08').mean(), {min: 0,max: 0.0002,palette: ['green', 'yellow', 'red']}, '3/06 - 3/08', false, 0.5);
Map.addLayer(ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2').select('NO2_column_number_density').filterDate('2020-03-08', '2020-03-10').mean(), {min: 0,max: 0.0002,palette: ['green', 'yellow', 'red']}, '3/08 - 3/10', false, 0.5);
Map.addLayer(ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2').select('NO2_column_number_density').filterDate('2020-03-10', '2020-03-12').mean(), {min: 0,max: 0.0002,palette: ['green', 'yellow', 'red']}, '3/10 - 3/12', true, 0.5);
Map.addLayer(ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2').select('NO2_column_number_density').filterDate('2020-03-12', '2020-03-14').mean(), {min: 0,max: 0.0002,palette: ['green', 'yellow', 'red']}, '3/12 - 3/14', false, 0.5);
Map.setCenter(65.27, 24.11, 4);