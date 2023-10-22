var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -99.29200694559418,
                19.43661515009219
              ],
              [
                -99.29200694559418,
                19.285026399280408
              ],
              [
                -99.18557689188324,
                19.285026399280408
              ],
              [
                -99.18557689188324,
                19.43661515009219
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d60000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d60000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-99.29200694559418, 19.43661515009219],
          [-99.29200694559418, 19.285026399280408],
          [-99.18557689188324, 19.285026399280408],
          [-99.18557689188324, 19.43661515009219]]], null, false),
    barrancas = ui.import && ui.import("barrancas", "table", {
      "id": "users/alejandromarambio/barrancas_6"
    }) || ee.FeatureCollection("users/alejandromarambio/barrancas_6"),
    T1_asset = ui.import && ui.import("T1_asset", "image", {
      "id": "users/alejandromarambio/202204barrancas/T1"
    }) || ee.Image("users/alejandromarambio/202204barrancas/T1"),
    T2_asset = ui.import && ui.import("T2_asset", "image", {
      "id": "users/alejandromarambio/202204barrancas/T2"
    }) || ee.Image("users/alejandromarambio/202204barrancas/T2"),
    T1T2ndvi_asset = ui.import && ui.import("T1T2ndvi_asset", "image", {
      "id": "users/alejandromarambio/202204barrancas/T1T2ndvi"
    }) || ee.Image("users/alejandromarambio/202204barrancas/T1T2ndvi"),
    T2ndvi_asset = ui.import && ui.import("T2ndvi_asset", "image", {
      "id": "users/alejandromarambio/202204barrancas/T2ndvi"
    }) || ee.Image("users/alejandromarambio/202204barrancas/T2ndvi"),
    dtm5 = ui.import && ui.import("dtm5", "image", {
      "id": "users/alejandromarambio/202204barrancas/dtm5m_40x45km"
    }) || ee.Image("users/alejandromarambio/202204barrancas/dtm5m_40x45km");
Map.centerObject(roi, 13);
Map.setOptions('SATELLITE'); //"ROADMAP", "SATELLITE", "HYBRID", "TERRAIN"
//Map.setControlVisibility(false);
Map.setControlVisibility({zoomControl: false, layerList: true, fullscreenControl: true }); //scaleControl: true
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//PLANET 5m
var nicfi = ee.ImageCollection('projects/planet-nicfi/assets/basemaps/americas');
// Filter basemaps by date and get the first image from filtered results
var T1= nicfi.filter(ee.Filter.date('2021-01-01','2021-02-25')).median(); //first()
var T2= nicfi.filter(ee.Filter.date('2022-01-01','2022-02-25')).median(); //first()
var T1ndvi = T1.normalizedDifference(['N','R']).rename('NDVI_T1');
var T2ndvi = T2.normalizedDifference(['N','R']).rename('NDVI_T2');
var T1T2ndvi = (T1ndvi.addBands(T2ndvi)); // Red =cleared , blue = grown , white = no change
var vis = {"bands":["R","G","B"],"min":150,"max":1500,"gamma":1};
Map.addLayer(T1_asset.clip(roi), vis, '2021',false);
Map.addLayer(T2_asset.clip(roi), vis, '2022',false);
Map.addLayer(T1T2ndvi_asset.clip(roi), {"bands":["NDVI_T1","NDVI_T2","NDVI_T2"],"min":0.2,"max":1,"gamma":1}, 'CAMBIOS 2021 vs 2022',false);
Export.image.toAsset({image: T1, description: 'T1', maxPixels: 1e13, scale: 10,crs: 'EPSG:3857', region: roi});
Export.image.toAsset({image: T2, description: 'T2', maxPixels: 1e13, scale: 10,crs: 'EPSG:3857', region: roi});
Export.image.toAsset({image: T1T2ndvi, description: 'T1T2ndvi', maxPixels: 1e13, scale: 10,crs: 'EPSG:3857', region: roi});
Export.image.toAsset({image: T2ndvi, description: 'T2ndvi', maxPixels: 1e13, scale: 10,crs: 'EPSG:3857', region: roi});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//uso de suelo 2021 sentinel 2
var image = ee.ImageCollection("ESA/WorldCover/v100");
var esa_lc = image.first()
var treecover= esa_lc.eq(10)
var builtup= esa_lc.eq(50)
var wetland= esa_lc.eq(90)
var mangroves= esa_lc.eq(95)
var shrubland= esa_lc.eq(20)
var grassland= esa_lc.eq(30)
var cropland= esa_lc.eq(40)
var water= esa_lc.eq(80)
var dict1 = { // ESA WorldCover
"names": ['Tree cover','Shrubland','Grassland','Cropland','Built-up','Bare / sparse vegetation','Snow and ice',
'Open water','Herbaceous wetland','Mangroves','Moss and lichen'],
"colors": ['006400','ffbb22','ffff4c','f096ff','fa0000','b4b4b4','f0f0f0','0064c8','0096a0','00cf75','fae6a0']};
//Map.addLayer(esa_lc.clip(roi), {}, 'ESA_WC_LC_2020');
//Map.addLayer(treecover.updateMask(treecover).clip(roi), {palette: ['black','green']}, 'Tree cover',false);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//FABDEM
//var fabdem = ee.ImageCollection("projects/sat-io/open-datasets/FABDEM");
//var elev = fabdem.mosaic().setDefaultProjection('EPSG:3857',null,30)
Map.addLayer(dtm5.clip(roi), {palette:['006600', '002200', 'fff700', 'ab7634', 'c4d0ff', 'ffffff'],min: 2200, max: 3400}, 'dtm 5m', false);
// Use the terrain algorithms to compute a hillshade with 8-bit values.
var shade = ee.Terrain.hillshade(dtm5);
Map.addLayer(shade.clip(roi), {opacity:0.5}, 'dtm 5m hillshade', false);
// Create a custom elevation palette from hex strings.
var elevationPalette = ['006600', '002200', 'fff700', 'ab7634', 'c4d0ff', 'ffffff'];
var visParams = {min: 1, max: 3000, palette: elevationPalette};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Map.addLayer(T2ndvi_asset.updateMask(T2ndvi_asset.gte(0.45)).clip(roi), {palette:["#0fbc24","#1b5c00"], min:0.4, max:0.8, opacity:0.5}, 'NDVI 2021',false);
Map.addLayer(barrancas.style({color: 'white', fillColor: '00000000', width: 1}),{},'AVAs Barrancas');