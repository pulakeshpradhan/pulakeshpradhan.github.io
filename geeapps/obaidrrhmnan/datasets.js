/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[60.82062499999999, 36.87882014021174],
          [60.82062499999999, 23.64360749989555],
          [78.48664062499999, 23.64360749989555],
          [78.48664062499999, 36.87882014021174]]], null, false),
    table = ee.FeatureCollection("users/obaidrrhmnan/PK");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var bound = table;
var startdate = '2020-03-01';
var enddate = '2020-05-10';
var filterdate = '2020-05-10';
var dataset = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
                  .filter(ee.Filter.date(startdate, enddate));
var ppt = dataset.select('precipitation');
var precipitationVis = {
  min: 1.0,
  max: 17.0,
  palette: ['001137', '0aab1e', 'e7eb05', 'ff4a2d', 'e90000'],
};
//var clipped = ppt.clip(bound);
Map.addLayer(bound,{},'Pakistan');
Map.setCenter(70.25101, 29.77899, 6);
Map.addLayer(ppt.median().clip(bound), precipitationVis, 'Precipitation');
var dataset = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
                  .filter(ee.Filter.date(startdate, enddate));
var nighttime = dataset.select('avg_rad');
var nighttimeVis = {min: 0.0, max: 60.0};
//Map.addLayer(nighttime.median().clip(bound), nighttimeVis, 'Nighttime');
var dataset = ee.Image('ESA/GLOBCOVER_L4_200901_200912_V2_3');
var landcover = dataset.select('landcover');
Map.addLayer(landcover.clip(bound), {}, 'Landcover');
// Example script to load and visualize ERA5 climate reanalysis parameters in
// Google Earth Engine
// Daily mean 2m air temperature
var era5_2mt = ee.ImageCollection('ECMWF/ERA5/DAILY')
                   .select('mean_2m_air_temperature')
                   .filter(ee.Filter.date(startdate, enddate));
print(era5_2mt);
// Daily total precipitation sums
var era5_tp = ee.ImageCollection('ECMWF/ERA5/DAILY')
                  .select('total_precipitation')
                  .filter(ee.Filter.date(startdate, enddate));
// Daily mean 2m dewpoint temperature
var era5_2d = ee.ImageCollection('ECMWF/ERA5/DAILY')
                  .select('dewpoint_2m_temperature')
                  .filter(ee.Filter.date(startdate, enddate));
// Daily mean sea-level pressure
var era5_mslp = ee.ImageCollection('ECMWF/ERA5/DAILY')
                    .select('mean_sea_level_pressure')
                    .filter(ee.Filter.date(startdate, enddate));
// Daily mean surface pressure
var era5_sp = ee.ImageCollection('ECMWF/ERA5/DAILY')
                  .select('surface_pressure')
                  .filter(ee.Filter.date(startdate, enddate));
// Daily mean 10m u-component of wind
var era5_u_wind_10m = ee.ImageCollection('ECMWF/ERA5/DAILY')
                          .select('u_component_of_wind_10m')
                          .filter(ee.Filter.date(startdate, enddate));
// Convert pressure levels from Pa to hPa - Example for surface pressure
var era5_sp = era5_sp.map(function(image) {
  return image.divide(100).set(
      'system:time_start', image.get('system:time_start'));
});
// Visualization palette for total precipitation
var visTp = {
  min: 0,
  max: 0.1,
  palette: ['#FFFFFF', '#00FFFF', '#0080FF', '#DA00FF', '#FFA400', '#FF0000']
};
// Visualization palette for temperature (mean, min and max) and 2m dewpoint
// temperature
var vis2mt = {
  min: 250,
  max: 320,
  palette: [
    '#000080', '#0000D9', '#4000FF', '#8000FF', '#0080FF', '#00FFFF', '#00FF80',
    '#80FF00', '#DAFF00', '#FFFF00', '#FFF500', '#FFDA00', '#FFB000', '#FFA400',
    '#FF4F00', '#FF2500', '#FF0A00', '#FF00FF'
  ]
};
// Visualization palette for u- and v-component of 10m wind
var visWind = {
  min: 0,
  max: 30,
  palette: [
    '#FFFFFF', '#FFFF71', '#DEFF00', '#9EFF00', '#77B038', '#007E55', '#005F51',
    '#004B51', '#013A7B', '#023AAD'
  ]
};
// Visualization palette for pressure (surface pressure, mean sea level
// pressure) - adjust min and max values for mslp to min:990 and max:1050
var visPressure = {
  min: 500,
  max: 1150,
  palette: [
    '#01FFFF', '#058BFF', '#0600FF', '#DF00FF', '#FF00FF', '#FF8C00', '#FF8C00'
  ]
};
// Add layer to map
Map.addLayer(
    era5_tp.filter(ee.Filter.date(filterdate)).mosaic().clip(bound), visTp,
    'Daily total precipitation sums');
Map.addLayer(
    era5_2d.filter(ee.Filter.date(filterdate)).mosaic().clip(bound), vis2mt,
    'Daily mean 2m dewpoint temperature');
Map.addLayer(
    era5_2mt.filter(ee.Filter.date(filterdate)).mosaic().clip(bound), vis2mt,
    'Daily mean 2m air temperature');
Map.addLayer(
    era5_u_wind_10m.filter(ee.Filter.date(filterdate)).mosaic().clip(bound), visWind,
    'Daily mean 10m u-component of wind');
Map.addLayer(
    era5_sp.filter(ee.Filter.date(filterdate)).mosaic().clip(bound), visPressure,
    'Daily mean surface pressure');
var dataset = ee.ImageCollection('GLCF/GLS_TCC')
                  .filter(ee.Filter.date(startdate, enddate));
var treeCanopyCover = dataset.select('tree_canopy_cover');
var treeCanopyCoverVis = {
  min: 0.0,
  max: 100.0,
  palette: ['ffffff', 'afce56', '5f9c00', '0e6a00', '003800'],
};
//Map.addLayer(treeCanopyCover.median().clip(bound), treeCanopyCoverVis, 'Tree Canopy Cover');
var dataset = ee.ImageCollection('NOAA/GFS0P25')
                  .filter(ee.Filter.date(startdate, enddate));
var temperatureAboveGround = dataset.select('temperature_2m_above_ground');
var visParams = {
  min: -40.0,
  max: 35.0,
  palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
};
Map.addLayer(temperatureAboveGround.mosaic().clip(bound), visParams, 'Temperature Above Ground');
var dataset = ee.ImageCollection('NASA_USDA/HSL/SMAP_soil_moisture')
                  .filter(ee.Filter.date(startdate, enddate));
var soilMoisture = dataset.select('ssm').mosaic();
var soilMoistureVis = {
  min: 0.0,
  max: 28.0,
  palette: ['0300ff', '418504', 'efff07', 'efff07', 'ff0303'],
};
Map.addLayer(soilMoisture.clip(bound), soilMoistureVis, 'Soil Moisture');