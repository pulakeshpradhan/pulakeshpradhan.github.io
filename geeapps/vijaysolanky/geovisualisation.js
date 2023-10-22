var roi = ui.import && ui.import("roi", "table", {
      "id": "users/vijaysolanky/MH_Boundary"
    }) || ee.FeatureCollection("users/vijaysolanky/MH_Boundary");
 var s2collection_Rabi18 = ee.ImageCollection('COPERNICUS/S2')
 .filterDate('2018-11-01', '2018-12-31')
 .filterBounds(roi);
 var s2collection_Kharif18 = ee.ImageCollection('COPERNICUS/S2')
 .filterDate('2018-10-01', '2018-11-01')
 .filterBounds(roi);
 var s2collection_Summer19 = ee.ImageCollection('COPERNICUS/S2')
 .filterDate('2019-04-01', '2019-05-31')
 .filterBounds(roi);
 var rabi_min = s2collection_Rabi18.min().clip(roi);
 var kharif_min = s2collection_Kharif18.min().clip(roi);
 var summer_min = s2collection_Summer19.min().clip(roi);
// Select the red, green and blue bands.
var sat_rabi = rabi_min.select('B4', 'B3', 'B2');
var sat_kharif = kharif_min.select('B4', 'B3', 'B2');
var sat_summer = summer_min.select('B4', 'B3', 'B2');
Map.addLayer(sat_kharif, {gain: '0.1, 0.1, 0.1', scale:20}, 'Kharif Season Satellite Image');
Map.addLayer(sat_rabi, {gain: '0.1, 0.1, 0.1', scale:20}, 'Rabi Season Satellite Image');
Map.addLayer(sat_summer, {gain: '0.1, 0.1, 0.1', scale:20}, 'Summer Season Satellite Image');
Map.setCenter(73.844416,18.502453,6);
// India
//Map.setCenter(73.7217954,20.7707739, 4);
// create function to add NDVI using NIR (B5) and the red band (B4)
var getNDVI = function(img){
  return img.addBands(img.normalizedDifference(['B8','B4']).rename('NDVI'));
};
// map over image collection
var s2kharif_ndvi = s2collection_Kharif18.map(getNDVI);
var s2rabi_ndvi = s2collection_Rabi18.map(getNDVI);
var s2summer_ndvi = s2collection_Summer19.map(getNDVI);
// for each pixel, select the "best" set of bands from available images
// based on the maximum NDVI/greenness
var composite_kharif = s2kharif_ndvi.qualityMosaic('NDVI').clip(roi);
var composite_rabi = s2rabi_ndvi.qualityMosaic('NDVI').clip(roi);
var composite_summer = s2summer_ndvi.qualityMosaic('NDVI').clip(roi);
//set visualization parameters for NDVI            
var ndviParams = {min: 0, max: 1, palette: ['red', 'yellow', 'green']};
Map.addLayer(composite_kharif.select('NDVI'), ndviParams, 'Kharif 2018 NDVI image');
Map.addLayer(composite_rabi.select('NDVI'), ndviParams, 'Rabi 2018 NDVI image');
Map.addLayer(composite_summer.select('NDVI'), ndviParams, 'Summer NDVI image');
 // SMAP Soil Moisture 
var smap = ee.ImageCollection('NASA_USDA/HSL/SMAP_soil_moisture').filterBounds(roi) 
                  .filter(ee.Filter.date('2018-10-01', '2018-11-30'));
var soilMoisture = smap.select('ssm');
var soilMoisture1 = soilMoisture.max().clip(roi);
var soilMoistureVis = {
  min: 0.0,
  max: 28.0,
  palette: ['0300ff', '418504', 'efff07', 'efff07', 'ff0303'],
};
Map.addLayer(soilMoisture1, soilMoistureVis, 'Soil Moisture_SMAP');
 // CHIRPS Precipitation 
var dataset = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY').filterBounds(roi)
                  .filter(ee.Filter.date('2018-01-01', '2018-12-01'));
var precipitation = dataset.select('precipitation');
var precipitation1 = precipitation.sum().clip(roi);
var precipitationVis = {
  min: 1.0,
  max: 17.0,
  palette: ['001137', '0aab1e', 'e7eb05', 'ff4a2d', 'e90000'],
};
Map.addLayer(precipitation1, precipitationVis, 'Precipitation_CHIRPS');
// TRMM 
var dataset = ee.ImageCollection('TRMM/3B43V7').filterBounds(roi)
                  .filter(ee.Filter.date('2018-07-01', '2018-12-31'));
var precipitation = dataset.select('precipitation');
var precipitation1 = precipitation.sum().clip(roi);
var precipitationVis = {
  min: 0.1,
  max: 1.2,
  palette: ['red', 'purple', 'cyan', 'green', 'yellow', 'blue'],
};
Map.addLayer(precipitation1, precipitationVis, 'Precipitation_TRMM');
// MODIS LST Min Max and Mean 
var dataset = ee.ImageCollection('MODIS/006/MOD11A1').filterBounds(roi)
                  .filter(ee.Filter.date('2018-01-01', '2018-05-01'));
var landSurfaceTemperature = dataset.select('LST_Day_1km');
var landSurfaceTemperature1 = landSurfaceTemperature.max().clip(roi);
var landSurfaceTemperature2 = landSurfaceTemperature.min().clip(roi);
var landSurfaceTemperature3 = landSurfaceTemperature.mean().clip(roi);
var landSurfaceTemperatureVis = {
  min: 13000.0,
  max: 16500.0,
  palette: [
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ],
};
Map.addLayer(landSurfaceTemperature1, landSurfaceTemperatureVis,'Max Land Surface Temperature');
Map.addLayer(landSurfaceTemperature2, landSurfaceTemperatureVis,'Min Land Surface Temperature');
Map.addLayer(landSurfaceTemperature3, landSurfaceTemperatureVis,'Average Land Surface Temperature');