/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var GMTED2010 = ee.Image("USGS/GMTED2010"),
    Sentinel1 = ee.ImageCollection("COPERNICUS/S1_GRD"),
    HydroSHEDS = ee.Image("WWF/HydroSHEDS/03DIR"),
    L8_NDWI = ee.ImageCollection("LANDSAT/LC8_L1T_8DAY_NDWI"),
    L8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA"),
    S2 = ee.ImageCollection("COPERNICUS/S2_SR"),
    image = ee.ImageCollection("NASA_USDA/HSL/soil_moisture"),
    Bangla = ee.FeatureCollection("users/sdwijati/BGD_adm0");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var bgl = Bangla;
Map.addLayer(bgl,{color:"white"},"bangladesh")
Map.centerObject(bgl,11);
var geometry = ee.Geometry.Point(90.40,23.81);
var geometry2 = ee.Geometry.Point(90.65,23.79);
var geometry3 = ee.Geometry.Point(90.55,23.69);
var loca = ee.FeatureCollection([
  ee.Feature(ee.Geometry.Point(90.40,23.81), {Label: 'A'}),
  ee.Feature(ee.Geometry.Point(90.65,23.79), {Label: 'B'}),
  ee.Feature(ee.Geometry.Point(90.55,23.69), {Label: 'C'})
  ]);
var VV_Banjir= Sentinel1
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV')).select('VV')
.filterDate('2019-07-01', '2019-07-31').filter(ee.Filter.eq("orbitProperties_pass", 'DESCENDING'))
.filter(ee.Filter.eq('instrumentMode', 'IW')).mosaic();
var vis = {min:-30,max:0};
Map.addLayer(VV_Banjir.clip(bgl),vis,"VV_Banjir");
var VV_Kering = Sentinel1
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV')).select('VV')
.filterDate('2019-10-01', '2019-10-30').filter(ee.Filter.eq("orbitProperties_pass", 'DESCENDING'))
.filter(ee.Filter.eq('instrumentMode', 'IW')).mosaic();
var vis = {min:-30,max:0};
Map.addLayer(VV_Kering.clip(bgl),vis,"VV_Kering");
var elev = GMTED2010;
var elevationPalette = ['yellow','red', 'green', 'blue'];
var visParams = {min: 0, max: 15000, palette: elevationPalette};
var shade = ee.Terrain.hillshade(elev);
var clipped = shade.clipToCollection(bgl);
Map.addLayer(shade.clip(bgl), {palette:elevationPalette}, 'Hillshade');
var hydrosheds = HydroSHEDS;
var terrain = ee.Algorithms
.Terrain(hydrosheds);
var slope = terrain
.select('slope');
var terainPalette = ['yellow','red', 'green', 'blue'];
var visParams = {min: 0, max: 100, palette: terainPalette};
Map.addLayer(slope.clip(bgl), {palette: terainPalette}, 'slope');
var banjir = VV_Banjir.subtract(VV_Kering);
var SMOOTHING_RADIUS = 100;
var DIFF_UPPER_THRESHOLD = -3;
var banjir_smoothed = VV_Banjir.focal_median(SMOOTHING_RADIUS, 'circle', 'meters')
.subtract(VV_Kering.focal_median(SMOOTHING_RADIUS, 'circle', 'meters'));
var banjir_thresholded = banjir_smoothed.lt(DIFF_UPPER_THRESHOLD);
Map.addLayer(banjir.clip(bgl), {min:-10,max:10}, 'banjir');
Map.addLayer(banjir_smoothed.clip(bgl), {min:-10,max:10}, 'Banjir_smoothed');
var banjir_mask = VV_Banjir.mask(slope.lt(5));
Map.addLayer(banjir_mask.clip(bgl), {min:-10,max:10}, 'banjir_mask');
Map.addLayer(banjir_thresholded.clip(bgl),{min:0,max:1}, 'banjir_area');
//Filter collection to data range
var Landsat8 = L8.filterDate('2019-01-01', '2019-12-31')
.select('B[1-9]')
;
var Sentinel2 = S2.filterDate('2019-01-01', '2019-12-31')
.select('B[1-9]')
;
//Create and print the chart.
print(ui.Chart.image.series(Landsat8, geometry, ee.Reducer.mean(), 30));
print(ui.Chart.image.series(Sentinel2, geometry, ee.Reducer.mean(), 30));
var MODISNDVI = ee.ImageCollection('MODIS/MOD13A1');
var MODIS_NDVI_TS = ee.ImageCollection(MODISNDVI
.filterDate('2011-01-01', '2019-12-31'));
var Location = ee.FeatureCollection([
  ee.Feature(ee.Geometry.Point(90.40,23.81), {label: 'Urban'}),
  ee.Feature(ee.Geometry.Point(90.65,23.79), {label: 'Hutan'}),
  ee.Feature(ee.Geometry.Point(90.55,23.69), {label: 'Danau'})
]);
var NDVITimeSeries = ui.Chart.image.seriesByRegion(MODIS_NDVI_TS, Location, ee.Reducer.mean(),'NDVI',
500, 'system:time_start', 'label')
.setOptions({
title: 'NDVI Long‐Term Time Series',
vAxis: {title: 'NDVI'},
hAxis: {title: 'time'},  pointSize: 3,
series: {
0: {color: 'red'}, // Urban  
1: {color: 'green'}, // Hutan  
2: {color: 'blue'} // Danau
}});
print(NDVITimeSeries);
var L8_NDWI_a = L8_NDWI
.filterDate('2014-01-01', '2020-02-28');
var L8_NDWI_ab = ee.Image(L8_NDWI_a.first());
Map.addLayer(L8_NDWI_ab.clip(bgl),{min: 0, max: 1},'L8NDWI');
print(ui.Chart.image.series(L8_NDWI_a, loca, ee.Reducer.mean(), 30));