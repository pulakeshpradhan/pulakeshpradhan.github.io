var thai = ui.import && ui.import("thai", "table", {
      "id": "users/athiyakautsary/thai"
    }) || ee.FeatureCollection("users/athiyakautsary/thai"),
    GMTED2010 = ui.import && ui.import("GMTED2010", "image", {
      "id": "USGS/GMTED2010"
    }) || ee.Image("USGS/GMTED2010"),
    Sentinel1 = ui.import && ui.import("Sentinel1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    HydroSHEDS = ui.import && ui.import("HydroSHEDS", "image", {
      "id": "WWF/HydroSHEDS/03DIR"
    }) || ee.Image("WWF/HydroSHEDS/03DIR"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            100.66935872511404,
            15.716807895700974
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            105.13567706030462,
            15.115896597464507
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            104.39959307592962,
            17.131621871265782
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            101.14763995092962,
            15.009808090255909
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.MultiPoint(
        [[100.66935872511404, 15.716807895700974],
         [105.13567706030462, 15.115896597464507],
         [104.39959307592962, 17.131621871265782],
         [101.14763995092962, 15.009808090255909]]);
var thai = thai;
Map.addLayer(thai,{color:"white" },"thai");
Map.centerObject(thai, 11);
var VV_Banjir= Sentinel1
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV')).select('VV')
.filterDate('2019-03-01', '2019-03-15').filter(ee.Filter.eq('orbitProperties_pass',
'DESCENDING'))
.filter(ee.Filter.eq('instrumentMode', 'IW')).mosaic();
var vis = {min:-30,max:0}
Map.addLayer(VV_Banjir.clip(thai),vis,'VV_Banjir');
var VV_Kering= Sentinel1
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV')).select('VV')
.filterDate('2019-08-01', '2019-08-28').filter(ee.Filter.eq('orbitProperties_pass',
'DESCENDING'))
.filter(ee.Filter.eq('instrumentMode', 'IW')).mosaic();
var vis = {min:-30,max:0}
Map.addLayer(VV_Kering.clip(thai),vis,'VV_Kering');
var elev = GMTED2010;
var elevationPalette = ['yellow','red', 'green', 'blue'];
var visParams = {min: 0, max: 15000, palette: elevationPalette};
var shade = ee.Terrain.hillshade(elev);
var clipped = shade.clipToCollection(thai);
Map.addLayer(shade.clip(thai), {palette:elevationPalette}, 'Hillshade');
var hydrosheds = HydroSHEDS;
var terrain = ee.Algorithms
.Terrain(hydrosheds);
var slope = terrain
.select('slope');
var terainPalette = ['yellow','red', 'green', 'blue'];
var visParams = {min: 0, max: 100, palette: terainPalette};
Map.addLayer(slope.clip(thai), {palette: terainPalette}, 'slope');
var banjir = VV_Banjir.subtract(VV_Kering);
var SMOOTHING_RADIUS = 100;
var DIFF_UPPER_THRESHOLD = -3;
var banjir_smoothed = VV_Banjir.focal_median(SMOOTHING_RADIUS, 'circle', 'meters')
.subtract(VV_Kering.focal_median(SMOOTHING_RADIUS, 'circle', 'meters'));
var banjir_thresholded = banjir_smoothed.lt(DIFF_UPPER_THRESHOLD);
Map.addLayer(banjir.clip(thai), {min:-10,max:10}, 'banjir');
Map.addLayer(banjir_smoothed.clip(thai), {min:-10,max:10}, 'Banjir_smoothed');
var banjir_mask = VV_Banjir.mask(slope.lt(5));
Map.addLayer(banjir_mask.clip(thai), {min:-10,max:10}, 'banjir_mask');
Map.addLayer(banjir_thresholded.clip(thai),{min:0,max:1}, 'banjir_area');