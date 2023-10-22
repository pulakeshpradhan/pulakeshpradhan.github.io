var Manila = ui.import && ui.import("Manila", "table", {
      "id": "users/ramakunto335482/manila_metromanila"
    }) || ee.FeatureCollection("users/ramakunto335482/manila_metromanila"),
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
    genangan1 = ui.import && ui.import("genangan1", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.94354813133727,
            14.597900268225489
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff9999",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ff9999 */ee.Geometry.Point([120.94354813133727, 14.597900268225489]),
    genangan2 = ui.import && ui.import("genangan2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.94509308372984,
            14.595574577692506
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#99ff99",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #99ff99 */ee.Geometry.Point([120.94509308372984, 14.595574577692506]),
    genangan3 = ui.import && ui.import("genangan3", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.94732468163023,
            14.597651088272881
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#9999ff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #9999ff */ee.Geometry.Point([120.94732468163023, 14.597651088272881]),
    genangan4 = ui.import && ui.import("genangan4", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.9536761525775,
            14.597900268225489
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffff99",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ffff99 */ee.Geometry.Point([120.9536761525775, 14.597900268225489]),
    genangan5 = ui.import && ui.import("genangan5", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.94981377159606,
            14.610275850666156
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#99ffff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #99ffff */ee.Geometry.Point([120.94981377159606, 14.610275850666156]),
    genangan6 = ui.import && ui.import("genangan6", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.95230286156188,
            14.605292478414382
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff99ff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ff99ff */ee.Geometry.Point([120.95230286156188, 14.605292478414382]),
    genangan7 = ui.import && ui.import("genangan7", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.95925514732848,
            14.604378847915603
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([120.95925514732848, 14.604378847915603]),
    genangan8 = ui.import && ui.import("genangan8", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.95891182457457,
            14.618415115687766
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([120.95891182457457, 14.618415115687766]),
    genangan9 = ui.import && ui.import("genangan9", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.95977013145934,
            14.615425216632243
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #0b4a8b */ee.Geometry.Point([120.95977013145934, 14.615425216632243]),
    genangan10 = ui.import && ui.import("genangan10", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.96650784050475,
            14.592875084641014
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ffc82d */ee.Geometry.Point([120.96650784050475, 14.592875084641014]),
    genangan11 = ui.import && ui.import("genangan11", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            121.0074919942523,
            14.593830293660396
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #00ffff */ee.Geometry.Point([121.0074919942523, 14.593830293660396]),
    genangan12 = ui.import && ui.import("genangan12", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            121.02036659752379,
            14.598232507723269
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#bf04c2",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #bf04c2 */ee.Geometry.Point([121.02036659752379, 14.598232507723269]),
    genangan13 = ui.import && ui.import("genangan13", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.98045532738219,
            14.586354634082957
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff0000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ff0000 */ee.Geometry.Point([120.98045532738219, 14.586354634082957]),
    genangan14 = ui.import && ui.import("genangan14", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.97410385643492,
            14.602717691828923
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #00ff00 */ee.Geometry.Point([120.97410385643492, 14.602717691828923]),
    genangan15 = ui.import && ui.import("genangan15", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.96045677696715,
            14.600973464433576
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0000ff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #0000ff */ee.Geometry.Point([120.96045677696715, 14.600973464433576]),
    genangan16 = ui.import && ui.import("genangan16", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.96183006798277,
            14.594411723207392
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#999900",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #999900 */ee.Geometry.Point([120.96183006798277, 14.594411723207392]),
    genangan17 = ui.import && ui.import("genangan17", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.99487488304625,
            14.585357860291818
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#009999",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #009999 */ee.Geometry.Point([120.99487488304625, 14.585357860291818]),
    genangan18 = ui.import && ui.import("genangan18", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.97642128502379,
            14.584859471704133
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff00ff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ff00ff */ee.Geometry.Point([120.97642128502379, 14.584859471704133]),
    genangan19 = ui.import && ui.import("genangan19", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            121.00397412973406,
            14.595303620124778
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff9999",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ff9999 */ee.Geometry.Point([121.00397412973406, 14.595303620124778]),
    genangan20 = ui.import && ui.import("genangan20", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.98818128305437,
            14.632843949384048
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#99ff99",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #99ff99 */ee.Geometry.Point([120.98818128305437, 14.632843949384048]),
    genangan21 = ui.import && ui.import("genangan21", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.97281758981707,
            14.611167683247611
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#9999ff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #9999ff */ee.Geometry.Point([120.97281758981707, 14.611167683247611]),
    genangan22 = ui.import && ui.import("genangan22", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.97110097604754,
            14.59613422773157
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffff99",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ffff99 */ee.Geometry.Point([120.97110097604754, 14.59613422773157]),
    genangan23 = ui.import && ui.import("genangan23", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.96474950510027,
            14.625784863936195
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#99ffff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #99ffff */ee.Geometry.Point([120.96474950510027, 14.625784863936195]),
    genangan24 = ui.import && ui.import("genangan24", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.99739443709397,
            14.60517196186968
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff99ff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ff99ff */ee.Geometry.Point([120.99739443709397, 14.60517196186968]),
    genangan25 = ui.import && ui.import("genangan25", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.9702496992596,
            14.623548354445965
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([120.9702496992596, 14.623548354445965]),
    genangan26 = ui.import && ui.import("genangan26", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.96899582454738,
            14.610142215346944
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #0b4a8b */ee.Geometry.Point([120.96899582454738, 14.610142215346944]),
    genangan27 = ui.import && ui.import("genangan27", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            121.0007531792837,
            14.592076942668914
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ffc82d */ee.Geometry.Point([121.0007531792837, 14.592076942668914]),
    genangan28 = ui.import && ui.import("genangan28", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.97380234310207,
            14.583687507134542
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #00ffff */ee.Geometry.Point([120.97380234310207, 14.583687507134542]),
    genangan29 = ui.import && ui.import("genangan29", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.99845327347059,
            14.58078655616631
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([120.99845327347059, 14.58078655616631]),
    genangan30 = ui.import && ui.import("genangan30", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.98214544266004,
            14.569904589714135
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([120.98214544266004, 14.569904589714135]),
    genangan31 = ui.import && ui.import("genangan31", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.97270406692762,
            14.587224107675196
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #0b4a8b */ee.Geometry.Point([120.97270406692762, 14.587224107675196]),
    genangan32 = ui.import && ui.import("genangan32", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.97947317113334,
            14.592596859525889
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ffc82d */ee.Geometry.Point([120.97947317113334, 14.592596859525889]),
    genangan33 = ui.import && ui.import("genangan33", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.95697356038826,
            14.601146317165789
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #00ffff */ee.Geometry.Point([120.95697356038826, 14.601146317165789]),
    genangan34 = ui.import && ui.import("genangan34", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.97159061210247,
            14.606215572967615
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#bf04c2",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #bf04c2 */ee.Geometry.Point([120.97159061210247, 14.606215572967615]),
    genangan35 = ui.import && ui.import("genangan35", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            120.94814606003949,
            14.612679833385071
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff0000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ff0000 */ee.Geometry.Point([120.94814606003949, 14.612679833385071]);
var Manila = Manila;
Map.addLayer(Manila,{color:"blue" },"Manila");
Map.centerObject(Manila, 13);
//Sentinel 1
var VV_Banjir= Sentinel1
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV')).select('VV')
.filterDate('2019-05-09', '2019-06-25').filter(ee.Filter.eq('orbitProperties_pass','DESCENDING'))
.filter(ee.Filter.eq('instrumentMode', 'IW')).mosaic();
var vis = {min:-30,max:0}
//Layer VV_Banjir
Map.addLayer(VV_Banjir.clip(Manila),vis,'VV_Banjir');
var VV_Kering= Sentinel1
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV')).select('VV')
.filterDate('2019-02-15', '2019-03-16').filter(ee.Filter.eq('orbitProperties_pass','DESCENDING'))
.filter(ee.Filter.eq('instrumentMode', 'IW')).mosaic();
var vis = {min:-30,max:0}
//Layer VV_Kering
Map.addLayer(VV_Kering.clip(Manila),vis,'VV_Kering');
//GMTED2010
var elev = GMTED2010;
var elevationPalette = ['yellow','red', 'green', 'blue'];
var visParams = {min: 0, max: 15000, palette: elevationPalette};
var shade = ee.Terrain.hillshade(elev);
var clipped = shade.clipToCollection(Manila);
//Layer Hillshade
Map.addLayer(shade.clip(Manila), {palette:elevationPalette}, 'Hillshade');
//HydroSHEDS
var hydrosheds = HydroSHEDS;
var terrain = ee.Algorithms
.Terrain(hydrosheds);
var slope = terrain
.select('slope');
var terainPalette = ['yellow','red', 'green', 'blue'];
var visParams = {min: 0, max: 100, palette: terainPalette};
Map.addLayer(slope.clip(Manila), {palette: terainPalette}, 'slope');
var banjir = VV_Banjir.subtract(VV_Kering);
var SMOOTHING_RADIUS = 100;
var DIFF_UPPER_THRESHOLD = -3;
var banjir_smoothed = VV_Banjir.focal_median(SMOOTHING_RADIUS, 'circle', 'meters')
.subtract(VV_Kering.focal_median(SMOOTHING_RADIUS, 'circle', 'meters'));
var banjir_thresholded = banjir_smoothed.lt(DIFF_UPPER_THRESHOLD);
//Layer banjir
Map.addLayer(banjir.clip(Manila), {min:-10,max:10}, 'banjir');
//Layer banjir smoothed
Map.addLayer(banjir_smoothed.clip(Manila), {min:-10,max:10}, 'banjir_smoothed');
var banjir_mask = VV_Banjir.mask(slope.lt(5));
//Layer banjir_mask
Map.addLayer(banjir_mask.clip(Manila), {min:-10,max:10}, 'banjir_mask');
//Layer banjir_area
Map.addLayer(banjir_thresholded.clip(Manila),{min:0,max:1}, 'banjir_area');
// Grafik NDWI
var L8_NDWI_a = L8_NDWI
.filterDate('2014-01-01', '2020-02-28');
var L8_NDWI_ab = ee.Image(L8_NDWI_a.first());
Map.addLayer(L8_NDWI_ab.clip(Manila),{min: 0, max: 1},'L8NDWI');
var geom = ee.Geometry.Point(120.94354813133727, 14.597900268225489)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.94509308372984, 14.595574577692506)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.94732468163023, 14.597651088272881)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.9536761525775, 14.597900268225489)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.94981377159606, 14.610275850666156)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.95230286156188, 14.605292478414382)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.95925514732848, 14.604378847915603)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.95891182457457, 14.618415115687766)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.95977013145934, 14.615425216632243)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.96646492516051, 14.59283355372003)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(121.0074919942523, 14.593830293660396)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(121.02036659752379, 14.598232507723269)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.98045532738219, 14.586354634082957)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.97410385643492, 14.602717691828923)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.96045677696715, 14.600973464433576)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.96183006798277, 14.594411723207392)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.99487488304625, 14.585357860291818)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.97642128502379, 14.584859471704133)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(121.00397412973406, 14.595303620124778)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.98818128305437, 14.632843949384048)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.97281758981707, 14.611167683247611)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.97110097604754, 14.59613422773157)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.96474950510027, 14.625784863936195)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.99739443709397, 14.60517196186968)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.9702496992596, 14.623548354445965)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.96899582454738, 14.610142215346944)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(121.0007531792837, 14.592076942668914)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.97380234310207, 14.583687507134542)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.99845327347059, 14.58078655616631)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.98214544266004, 14.569904589714135)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.97270406692762, 14.587224107675196)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.97947317113334, 14.592596859525889)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.95697356038826, 14.601146317165789)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.97159061210247, 14.606215572967615)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
var geom = ee.Geometry.Point(120.94814606003949, 14.612679833385071)
print(ui.Chart.image.series(L8_NDWI_a, geom, ee.Reducer.mean(), 30));
// Grafik NDVI
var MODISNDVI = ee.ImageCollection('MODIS/MOD13A1'); 
var MODIS_NDVI_TS = ee.ImageCollection(MODISNDVI
.filterDate('2011-01-01', '2019-12-31'));
// Megambil beberapa sample genangan 
var Location = ee.FeatureCollection([  
  ee.Feature(ee.Geometry.Point(120.96646492516051, 14.59283355372003), {label: 'Genangan10'}),
  ee.Feature(ee.Geometry.Point(121.0074919942523, 14.593830293660396), {label: 'Genangan11'}),
  ee.Feature(ee.Geometry.Point(121.02036659752379, 14.598232507723269), {label: 'Genangan12'}),
  ee.Feature(ee.Geometry.Point(120.98045532738219, 14.586354634082957), {label: 'Genangan13'}),
  ee.Feature(ee.Geometry.Point(120.97410385643492, 14.602717691828923), {label: 'Genangan14'}),
  ee.Feature(ee.Geometry.Point(120.99487488304625, 14.585357860291818), {label: 'Genanngan17'}),
  ee.Feature(ee.Geometry.Point(120.97642128502379, 14.584859471704133), {label: 'Genangan18'}),
  ee.Feature(ee.Geometry.Point(120.98818128305437, 14.632843949384048), {label: 'Genangan20'}),
  ee.Feature(ee.Geometry.Point(120.97281758981707, 14.611167683247611), {label: 'Genangan21'}),
  ee.Feature(ee.Geometry.Point(120.96899582454738, 14.610142215346944), {label: 'Genangan26'})
]);
var NDVITimeSeries = ui.Chart.image.seriesByRegion(MODIS_NDVI_TS, Location, ee.Reducer.mean(),'NDVI',
500, 'system:time_start', 'label')
.setOptions({
title: 'NDVI Long‐Term Time Series',
vAxis: {title: 'NDVI'},
hAxis: {title: 'time'},  pointSize: 3,
series: {
0: {color: 'red'}, // Genangan10  
1: {color: 'green'}, // Genangan11  
2: {color: 'blue'}, // Genangan12
3: {color: 'black'}, // Genangan13 
4: {color: 'yellow'}, // Genangan14 
5: {color: 'purple'}, // Genangan17
6: {color: 'orange'}, // Genangan18  
7: {color: 'brown'}, // Genangan20  
8: {color: 'pink'}, // Genangan21
9: {color: 'grey'}, // Genangan26  
}});
print(NDVITimeSeries);