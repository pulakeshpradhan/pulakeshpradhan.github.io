var bandung = ui.import && ui.import("bandung", "table", {
      "id": "users/anjardimarasakti/KotaBandung"
    }) || ee.FeatureCollection("users/anjardimarasakti/KotaBandung"),
    GMTED2010 = ui.import && ui.import("GMTED2010", "image", {
      "id": "USGS/GMTED2010"
    }) || ee.Image("USGS/GMTED2010"),
    Sentinel1 = ui.import && ui.import("Sentinel1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    HydroSHEDS = ui.import && ui.import("HydroSHEDS", "image", {
      "id": "WWF/HydroSHEDS/03DIR"
    }) || ee.Image("WWF/HydroSHEDS/03DIR"),
    L8_NDWI = ui.import && ui.import("L8_NDWI", "imageCollection", {
      "id": "LANDSAT/LC8_L1T_8DAY_NDWI"
    }) || ee.ImageCollection("LANDSAT/LC8_L1T_8DAY_NDWI"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            107.587684211008,
            -6.957971346015806
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([107.587684211008, -6.957971346015806]),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            107.6188163960856,
            -6.955371309980705
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([107.6188163960856, -6.955371309980705]);
var bandung = bandung;
Map.addLayer(bandung,{color:"white" },"Bandung");
Map.centerObject(bandung, 11);  
var VV_Banjir= Sentinel1
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV')).select('VV') 
.filterDate('2019-03-01', '2019-03-15').filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
.filter(ee.Filter.eq('instrumentMode', 'IW')).mosaic();
var vis = {min:-30,max:0}
Map.addLayer(VV_Banjir.clip(bandung),vis,'VV_Banjir');
var VV_Kering= Sentinel1
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV')).select('VV')
.filterDate('2019-08-01', '2019-08-28').filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
.filter(ee.Filter.eq('instrumentMode', 'IW')).mosaic();
var vis = {min:-30,max:0}
Map.addLayer(VV_Kering.clip(bandung),vis,'VV_Kering');
var elev = GMTED2010;
var elevationPalette = ['yellow','red', 'green', 'blue'];
var visParams = {min: 0, max: 15000, palette: elevationPalette};
var shade = ee.Terrain.hillshade(elev);
var clipped = shade.clipToCollection(bandung);
Map.addLayer(shade.clip(bandung), {palette:elevationPalette}, 'Hillshade');
var hydrosheds = HydroSHEDS;
var terrain = ee.Algorithms
  .Terrain(hydrosheds);
var slope = terrain
  .select('slope');
var terainPalette = ['yellow','red', 'green', 'blue'];
var visParams = {min: 0, max: 100, palette: terainPalette};
Map.addLayer(slope.clip(bandung), {palette: terainPalette}, 'slope');
var banjir = VV_Banjir.subtract(VV_Kering);
var SMOOTHING_RADIUS = 100;  
var DIFF_UPPER_THRESHOLD = -3;
var banjir_smoothed = VV_Banjir.focal_median(SMOOTHING_RADIUS, 'circle', 'meters')
.subtract(VV_Kering.focal_median(SMOOTHING_RADIUS, 'circle', 'meters'));
var banjir_thresholded = banjir_smoothed.lt(DIFF_UPPER_THRESHOLD);
Map.addLayer(banjir.clip(bandung), {min:-10,max:10}, 'banjir');
Map.addLayer(banjir_smoothed.clip(bandung), {min:-10,max:10}, 'Banjir_smoothed');
var banjir_mask = VV_Banjir.mask(slope.lt(5));
Map.addLayer(banjir_mask.clip(bandung), {min:-10,max:10}, 'banjir_mask');
Map.addLayer(banjir_thresholded.clip(bandung),{min:0,max:1}, 'banjir_area');
var L8_NDWI_a = L8_NDWI
.filterDate('2014-01-01', '2020-02-28');
var L8_NDWI_ab = ee.Image(L8_NDWI_a.first());
Map.addLayer(L8_NDWI_ab.clip(bandung),{min: 0, max: 1},'L8NDWI');
var geom = ee.Geometry.Point(107.587684211008,-6.957971346015806)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(107.6188163960856,-6.95537130)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));