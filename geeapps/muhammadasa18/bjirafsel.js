/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var Africa = ee.FeatureCollection("users/muhammadasa18/ZAF_adm0"),
    GMTED2010 = ee.Image("USGS/GMTED2010"),
    Sentinel1 = ee.ImageCollection("COPERNICUS/S1_GRD"),
    HydroSHEDS = ee.Image("WWF/HydroSHEDS/03CONDEM"),
    L8_NDWI = ee.ImageCollection("LANDSAT/LC8_L1T_8DAY_NDWI"),
    geometry = /* color: #d63000 */ee.Geometry.Point([28.741272352943795, -24.91412557779869]),
    geometry2 = /* color: #98ff00 */ee.Geometry.Point([28.779724501381295, -25.346055697939722]),
    geometry3 = /* color: #0b4a8b */ee.Geometry.Point([29.693308082945393, -24.159772705585496]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var Africa = Africa;
Map.addLayer(Africa,{color:"white" },"Africa");
Map.centerObject(Africa, 11);
var VV_Banjir= Sentinel1
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV')).select('VV')
.filterDate('2019-04-15', '2019-04-30')
.filter(ee.Filter.eq('orbitProperties_pass','DESCENDING'))
.filter(ee.Filter.eq('instrumentMode', 'IW')).mosaic();
var vis = {min:-30,max:0}
Map.addLayer(VV_Banjir.clip(Africa),vis,'VV_Banjir');
var VV_Kering= Sentinel1
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV')).select('VV')
.filterDate('2019-10-01', '2019-10-28')
.filter(ee.Filter.eq('orbitProperties_pass','DESCENDING'))
.filter(ee.Filter.eq('instrumentMode', 'IW')).mosaic();
var vis = {min:-30,max:0}
Map.addLayer(VV_Kering.clip(Africa),vis,'VV_Kering');
var elev = GMTED2010;
var elevationPalette = ['yellow','red', 'green', 'blue'];
var visParams = {min: 0, max: 15000, palette: elevationPalette};
var shade = ee.Terrain.hillshade(elev);
var clipped = shade.clipToCollection(Africa);
Map.addLayer(shade.clip(Africa), {palette:elevationPalette}, 'Hillshade');
var hydrosheds = HydroSHEDS;
var terrain = ee.Algorithms
.Terrain(hydrosheds);
var slope = terrain
.select('slope');
var terainPalette = ['yellow','red', 'green', 'blue'];
var visParams = {min: 0, max: 100, palette: terainPalette};
Map.addLayer(slope.clip(Africa), {palette: terainPalette}, 'slope');
var banjir = VV_Banjir.subtract(VV_Kering);
var SMOOTHING_RADIUS = 100;
var DIFF_UPPER_THRESHOLD = -3;
var banjir_smoothed = VV_Banjir.focal_median(SMOOTHING_RADIUS, 'circle', 'meters')
.subtract(VV_Kering.focal_median(SMOOTHING_RADIUS, 'circle', 'meters'));
var banjir_thresholded = banjir_smoothed.lt(DIFF_UPPER_THRESHOLD);
Map.addLayer(banjir.clip(Africa), {min:-10,max:10}, 'banjir');
Map.addLayer(banjir_smoothed.clip(Africa), {min:-10,max:10}, 'Banjir_smoothed');
var banjir_mask = VV_Banjir.mask(slope.lt(5));
Map.addLayer(banjir_mask.clip(Africa), {min:-10,max:10}, 'banjir_mask');
Map.addLayer(banjir_thresholded.clip(Africa),{min:0,max:1}, 'banjir_area');
var L8_NDWI_a=L8_NDWI
.filterDate('2014-01-01','2020-10-28');
var L8_NDWI_ab=ee.Image(L8_NDWI_a.first());
Map.addLayer(L8_NDWI_ab.clip(Africa),{min:0,max:1},'L8NDWI');
var geom = ee.Geometry.Point(28.741272352943795,-24.91412557779869)
print(ui.Chart.image.series(L8_NDWI_a,geom,ee.Reducer.mean(),30));
var geom = ee.Geometry.Point(28.779724501381295,-25.346055697939722)
print(ui.Chart.image.series(L8_NDWI_a,geom,ee.Reducer.mean(),30));
var geom = ee.Geometry.Point(29.693308082945393,-24.159772705585496)
print(ui.Chart.image.series(L8_NDWI_a,geom,ee.Reducer.mean(),30));