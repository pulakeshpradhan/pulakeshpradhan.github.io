var GMTED2010 = ui.import && ui.import("GMTED2010", "image", {
      "id": "USGS/GMTED2010"
    }) || ee.Image("USGS/GMTED2010"),
    Sentinel1 = ui.import && ui.import("Sentinel1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    HydroSHEDS = ui.import && ui.import("HydroSHEDS", "image", {
      "id": "WWF/HydroSHEDS/03DIR"
    }) || ee.Image("WWF/HydroSHEDS/03DIR"),
    Paki = ui.import && ui.import("Paki", "table", {
      "id": "users/sdwijati/Pakistan_2"
    }) || ee.FeatureCollection("users/sdwijati/Pakistan_2"),
    Bhubhar = ui.import && ui.import("Bhubhar", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            73.11099839190305,
            33.01624869452931
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([73.11099839190305, 33.01624869452931]),
    Lilladarajat = ui.import && ui.import("Lilladarajat", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            72.76869626024636,
            32.59894284874862
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0300d6",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #0300d6 */ee.Geometry.Point([72.76869626024636, 32.59894284874862]),
    Jand = ui.import && ui.import("Jand", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            71.98111386278542,
            33.42117752863674
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([71.98111386278542, 33.42117752863674]),
    L8 = ui.import && ui.import("L8", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA"),
    S2 = ui.import && ui.import("S2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    image = ui.import && ui.import("image", "imageCollection", {
      "id": "NASA_USDA/HSL/soil_moisture"
    }) || ee.ImageCollection("NASA_USDA/HSL/soil_moisture"),
    L8_NDWI = ui.import && ui.import("L8_NDWI", "imageCollection", {
      "id": "LANDSAT/LC8_L1T_32DAY_NDWI"
    }) || ee.ImageCollection("LANDSAT/LC8_L1T_32DAY_NDWI");
var proname = ['Islamabad', 'Rawalpindi']
var paki = Paki.filter(ee.Filter.inList('NAME_2', proname));
Map.addLayer(paki,{color:"red" },"Islamabad");
Map.centerObject(paki, 8);
var VV_Banjir= Sentinel1
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV')).select('VV')
.filterDate('2019-02-01', '2019-04-30')
.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
.filter(ee.Filter.eq('instrumentMode', 'IW')).mosaic();
var vis = {min:-30,max:0}
Map.addLayer(VV_Banjir.clip(paki),vis,'VV_Banjir');
var VV_Kering= Sentinel1
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV')).select('VV')
.filterDate('2019-08-01', '2019-08-28')
.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
.filter(ee.Filter.eq('instrumentMode', 'IW')).mosaic();
var vis = {min:-30,max:0}
Map.addLayer(VV_Kering.clip(paki),vis,'VV_Kering');
var elev = GMTED2010;
var elevationPalette = ['yellow','red', 'green', 'blue'];
var visParams = {min: 0, max: 15000, palette: elevationPalette};
var shade = ee.Terrain.hillshade(elev);
var clipped = shade.clipToCollection(paki);
Map.addLayer(shade.clip(paki), {palette:elevationPalette}, 'Hillshade');
var hydrosheds = HydroSHEDS;
var terrain = ee.Algorithms
.Terrain(hydrosheds);
var slope = terrain
.select('slope');
var terainPalette = ['yellow','red', 'green', 'blue'];
var visParams = {min: 0, max: 100, palette: terainPalette};
Map.addLayer(slope.clip(paki), {palette: terainPalette}, 'slope');
var banjir = VV_Banjir.subtract(VV_Kering);
var SMOOTHING_RADIUS = 100;
var DIFF_UPPER_THRESHOLD = -3;
var banjir_smoothed = VV_Banjir.focal_median(SMOOTHING_RADIUS, 'circle', 'meters')
.subtract(VV_Kering.focal_median(SMOOTHING_RADIUS, 'circle', 'meters'));
var banjir_thresholded = banjir_smoothed.lt(DIFF_UPPER_THRESHOLD);
Map.addLayer(banjir.clip(paki), {min:-10,max:10}, 'banjir');
Map.addLayer(banjir_smoothed.clip(paki), {min:-10,max:10}, 'Banjir_smoothed');
var banjir_mask = VV_Banjir.mask(slope.lt(5));
Map.addLayer(banjir_mask.clip(paki), {min:-10,max:10}, 'banjir_mask');
Map.addLayer(banjir_thresholded.clip(paki),{min:0,max:1}, 'banjir_area');
var MODISNDVI = ee.ImageCollection('MODIS/MOD13A1');
var MODIS_NDVI_TS = ee.ImageCollection(MODISNDVI
.filterDate('2011-01-01', '2020-03-17'));
var Location = ee.FeatureCollection([
  ee.Feature(ee.Geometry.Point(73.11099839190305,33.01624869452931), {label: 'Bhubhar'}),
  ee.Feature(ee.Geometry.Point(72.76869626024636,32.59894284874862), {label: 'Lilla Da Rajat'}),
  ee.Feature(ee.Geometry.Point(71.98111386278542,33.42117752863674), {label: 'Jand'})
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
var Landsat8 = L8.filterDate('2019-02-01', '2019-04-15')
.select('B[1-9]');
var Sentinel2 = S2.filterDate('2019-02-01', '2019-04-15')
.select('B[1-9]');
print(ui.Chart.image.series(Landsat8, Location, ee.Reducer.mean(), 30));
print(ui.Chart.image.series(Sentinel2, Location, ee.Reducer.mean(), 30));
var L8_NDWI_a = L8_NDWI
.filterDate('2011-04-01', '2020-03-15');
var L8_NDWI_ab = ee.Image(L8_NDWI_a.first());
Map.addLayer(L8_NDWI_ab.clip(Paki),{min: 0, max: 1},'L8NDWI');
print(ui.Chart.image.series(L8_NDWI_a, Location, ee.Reducer.mean(), 30));