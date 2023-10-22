var roi = ui.import && ui.import("roi", "table", {
      "id": "users/vijaysolanky/India_Boundary"
    }) || ee.FeatureCollection("users/vijaysolanky/India_Boundary"),
    mh = ui.import && ui.import("mh", "table", {
      "id": "users/vijaysolanky/MH_Boundary"
    }) || ee.FeatureCollection("users/vijaysolanky/MH_Boundary");
Map.setCenter(74.739816, 19.102868,5);
var ind= ee.FeatureCollection('users/vijaysolanky/India_Boundary');
//https://code.earthengine.google.com/?asset=users/vijaysolanky/India_Boundary
var jan = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2020-01-01', '2020-01-31');
var feb = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2020-02-01', '2020-02-29');
var mar = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2020-03-01', '2020-03-31');
var apr = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2020-04-01', '2020-04-30');  
var band_viz = {
  min: 0,
  max: 0.0002,
  //palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
  palette: ['#0000FF', '#32CD32', '#9ACD32', '#FFFF00', '#A52A2A', '#D2691E', 'red']
};
//Map.addLayer(ind);
/*Map.addLayer(jan.max().clip(roi), band_viz, 'S5P N02_Jan');
Map.addLayer(feb.max().clip(roi), band_viz, 'S5P N02_Feb');
Map.addLayer(mar.max().clip(roi), band_viz, 'S5P N02_Mar');
Map.addLayer(apr.max().clip(roi), band_viz, 'S5P N02_Apr'); */
Map.addLayer(jan.max().clip(ind), band_viz, 'N02 Levels Jan 2020');
Map.addLayer(feb.max().clip(ind), band_viz, 'N02 Levels Feb 2020');
Map.addLayer(mar.max().clip(ind), band_viz, 'N02 Levels March 2020');
Map.addLayer(apr.max().clip(ind), band_viz, 'N02 Levels April 2020');