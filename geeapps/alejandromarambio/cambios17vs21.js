var roi = ui.import && ui.import("roi", "table", {
      "id": "users/alejandromarambio/Oaxaca/limit_450x300km_3857"
    }) || ee.FeatureCollection("users/alejandromarambio/Oaxaca/limit_450x300km_3857");
//alejandro.marambio@gmail.com
//agregar polígono en var roi
/////////////////////////////////////////
Map.centerObject(roi, 10);
var snazzy = require("users/aazuspan/snazzy:styles");
snazzy.addStyle("https://snazzymaps.com/style/235815/retro", "Retro");
//    "https://snazzymaps.com/style/235815/retro", "Retro",
//    "https://snazzymaps.com/style/13/neutral-blue", "Blue",
//    "https://snazzymaps.com/style/8097/wy", "WY"
//    "https://snazzymaps.com/style/14889/flat-pale", "Pale"
//Map.setOptions('ROADMAP'); //"ROADMAP", "SATELLITE", "HYBRID", "TERRAIN"
//Map.setControlVisibility(false);
//Map.setControlVisibility({zoomControl: false, layerList: true, fullscreenControl: true }); //scaleControl: true
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// cloudmask
function maskClouds(img) {
  var clouds = ee.Image(img.get('cloud_mask')).select('probability');
  var isNotCloud = clouds.lt(50);// max cloud probability
  return img.updateMask(isNotCloud);
}
//variables imagenes
var rgbVis = {min: 0, max: 3000, bands: ['B4', 'B3', 'B2']};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 2017
var S2_17sr = ee.ImageCollection('COPERNICUS/S2'); //_SR
var S2_17clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY');
var S2_17date = ee.Filter.and(ee.Filter.bounds(roi), ee.Filter.date('2017-06-01', '2017-12-30'));
    S2_17sr = S2_17sr.filter(S2_17date);
    S2_17clouds = S2_17clouds.filter(S2_17date);
var S2_17SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({
  primary: S2_17sr,
  secondary: S2_17clouds,
  condition: ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
});
var S2_17 = ee.ImageCollection(S2_17SrWithCloudMask).map(maskClouds).median().select('B2','B3', 'B4','B8','B8A','B11','B12');
var S2_17rgb = ee.ImageCollection(S2_17SrWithCloudMask).map(maskClouds).median().select('B4','B11', 'B8');
Map.addLayer( S2_17.clip(roi),rgbVis, 'S2 2017', true);
Export.image.toDrive({image: S2_17rgb, description: '2017', maxPixels: 1e13, scale: 15,crs: 'EPSG:3857', region: roi});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 2018
var S2_18sr = ee.ImageCollection('COPERNICUS/S2'); //_SR
var S2_18clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY');
var S2_18date = ee.Filter.and(ee.Filter.bounds(roi), ee.Filter.date('2018-06-01', '2018-12-30'));
    S2_18sr = S2_18sr.filter(S2_18date);
    S2_18clouds = S2_18clouds.filter(S2_18date);
var S2_18SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({
  primary: S2_18sr,
  secondary: S2_18clouds,
  condition: ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
});
var S2_18 = ee.ImageCollection(S2_18SrWithCloudMask).map(maskClouds).median().select('B2','B3', 'B4','B8','B8A','B11','B12');
var S2_18rgb = ee.ImageCollection(S2_18SrWithCloudMask).map(maskClouds).median().select('B4','B11', 'B8');
Map.addLayer( S2_18.clip(roi),rgbVis, 'S2 2018', false);
Export.image.toDrive({image: S2_18rgb, description: '2018', maxPixels: 1e13, scale: 15,crs: 'EPSG:3857', region: roi});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 2019
var S2_19sr = ee.ImageCollection('COPERNICUS/S2'); //_SR
var S2_19clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY');
var S2_19date = ee.Filter.and(ee.Filter.bounds(roi), ee.Filter.date('2019-06-01', '2019-12-30'));
    S2_19sr = S2_19sr.filter(S2_19date);
    S2_19clouds = S2_19clouds.filter(S2_19date);
var S2_19SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({
  primary: S2_19sr,
  secondary: S2_19clouds,
  condition: ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
});
var S2_19 = ee.ImageCollection(S2_19SrWithCloudMask).map(maskClouds).median().select('B2','B3', 'B4','B8','B8A','B11','B12');
var S2_19rgb = ee.ImageCollection(S2_19SrWithCloudMask).map(maskClouds).median().select('B4','B11', 'B8');
Map.addLayer( S2_19.clip(roi),rgbVis, 'S2 2019', false);
Export.image.toDrive({image: S2_19rgb, description: '2019', maxPixels: 1e13, scale: 15,crs: 'EPSG:3857', region: roi});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 2020
var S2_20sr = ee.ImageCollection('COPERNICUS/S2'); //_SR
var S2_20clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY');
var S2_20date = ee.Filter.and(ee.Filter.bounds(roi), ee.Filter.date('2020-06-01', '2020-12-30'));
    S2_20sr = S2_20sr.filter(S2_20date);
    S2_20clouds = S2_20clouds.filter(S2_20date);
var S2_20SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({
  primary: S2_20sr,
  secondary: S2_20clouds,
  condition: ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
});
var S2_20 = ee.ImageCollection(S2_20SrWithCloudMask).map(maskClouds).median().select('B2', 'B3', 'B4','B8','B8A','B11','B12');
var S2_20rgb = ee.ImageCollection(S2_20SrWithCloudMask).map(maskClouds).median().select('B4','B11', 'B8');
Map.addLayer( S2_20.clip(roi),rgbVis, 'S2 2020', false);
Export.image.toDrive({image: S2_20rgb, description: '2020', maxPixels: 1e13, scale: 15,crs: 'EPSG:3857', region: roi});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 2021
var S2_21sr = ee.ImageCollection('COPERNICUS/S2'); //_SR
var S2_21clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY');
var S2_21date = ee.Filter.and(ee.Filter.bounds(roi), ee.Filter.date('2021-06-01', '2021-12-30')); //Invierno 12-21 / Otoño 09-21
    S2_21sr = S2_21sr.filter(S2_21date);
    S2_21clouds = S2_21clouds.filter(S2_21date);
var S2_21SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({
  primary: S2_21sr,
  secondary: S2_21clouds,
  condition: ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
});
var S2_21 = ee.ImageCollection(S2_21SrWithCloudMask).map(maskClouds).median().select('B2', 'B3', 'B4','B8','B8A','B11','B12');
var S2_21rgb = ee.ImageCollection(S2_21SrWithCloudMask).map(maskClouds).median().select('B4','B11', 'B8');
Map.addLayer( S2_21.clip(roi),rgbVis, 'S2 2021', true);
Export.image.toDrive({image: S2_21rgb, description: '2021', maxPixels: 1e13, scale: 15,crs: 'EPSG:3857', region: roi});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////NDVI //["B8","B4"] Normalized Difference Vegetation Index
var ndvi2017 = S2_17.normalizedDifference(["B8","B4"]).rename ('ndvi2017');
var ndvi2018 = S2_18.normalizedDifference(["B8","B4"]).rename ('ndvi2018');
var ndvi2019 = S2_19.normalizedDifference(["B8","B4"]).rename ('ndvi2019');
var ndvi2020 = S2_20.normalizedDifference(["B8","B4"]).rename ('ndvi2020');
var ndvi2021 = S2_21.normalizedDifference(["B8","B4"]).rename ('ndvi2021');
var RGBndvi = (ndvi2017.addBands(ndvi2018).addBands(ndvi2019).addBands(ndvi2020).addBands(ndvi2021)); // Red =cleared , blue = grown , white = no change
var ndvi2120diff = ndvi2021.subtract(ndvi2020).rename(['ndvi2120diff']);
var ndvi2019diff = ndvi2020.subtract(ndvi2019).rename(['ndvi2019diff']);
var ndvi1918diff = ndvi2019.subtract(ndvi2018).rename(['ndvi1918diff']);
var ndvi1817diff = ndvi2018.subtract(ndvi2017).rename(['ndvi1817diff']);
var ndvi2117diff = ndvi2021.subtract(ndvi2017).rename(['ndvi2117diff']);
var RGBchange = (ndvi1817diff.addBands(ndvi1918diff).addBands(ndvi2019diff).addBands(ndvi2120diff))
var RGBmax = RGBndvi.reduce(ee.Reducer.median());
//Map.addLayer(RGBndvi.clip(roi),{bands: ['ndvi2020', 'ndvi2021', 'ndvi2021'], min: 0,  max: 1,  gamma: [1, 1, 1]}, 'ndvi2021',false);
//Map.addLayer(RGBndvi.clip(roi),{bands: ['ndvi2019', 'ndvi2020', 'ndvi2020'], min: 0,  max: 1,  gamma: [1, 1, 1]}, 'ndvi1920',false); 
//Map.addLayer(RGBndvi.clip(roi),{bands: ['ndvi2018', 'ndvi2019', 'ndvi2019'], min: 0,  max: 1,  gamma: [1, 1, 1]}, 'ndvi1819',false); 
//Map.addLayer(RGBndvi.clip(roi),{bands: ['ndvi2017', 'ndvi2018', 'ndvi2018'], min: 0,  max: 1,  gamma: [1, 1, 1]}, 'ndvi1718',false);
Map.addLayer(RGBndvi.clip(roi),{bands: ['ndvi2017', 'ndvi2021', 'ndvi2021'], min: 0.3,  max: 1,  gamma: [1, 1, 1]}, 'RGBndvi_2017vs2021',false);
//Map.addLayer(RGBmax.clip(roi),{palette: ['black', 'grey','white','green'], min: 0,  max: 1}, 'RGBmax',true); 
//Map.addLayer(ndvi2120diff.clip(roi), {palette: ['red', 'black','grey'], min: -0.4, max: 0.1},'ndvi2120diff');
//Map.addLayer(ndvi2019diff.clip(roi), {palette: ['red', 'black','grey'], min: -0.4, max: 0.1},'ndvi2019diff');
//Map.addLayer(ndvi1918diff.clip(roi), {palette: ['red', 'black','grey'], min: -0.4, max: 0.1},'ndvi1918diff');
//Map.addLayer(ndvi1817diff.clip(roi), {palette: ['red', 'black','grey'], min: -0.4, max: 0.1},'ndvi1817diff');
//Map.addLayer(ndvi2117diff.clip(roi), {palette: ['red', 'black','grey'], min: -0.1, max: 0.0},'ndvi2117diff');
Export.image.toDrive({image: RGBndvi,description: 'RGBndvi', fileNamePrefix: 'RGBndvi', region: roi, scale: 10, crs: 'EPSG:3857', maxPixels: 1e13});
Export.image.toDrive({image: ndvi2120diff, description: 'ndvi2120diff', maxPixels: 1e13, scale: 10,crs: 'EPSG:3857', region: roi});
Export.image.toDrive({image: ndvi2019diff, description: 'ndvi2019diff', maxPixels: 1e13, scale: 10,crs: 'EPSG:3857', region: roi});
Export.image.toDrive({image: ndvi1918diff, description: 'ndvi1918diff', maxPixels: 1e13, scale: 10,crs: 'EPSG:3857', region: roi});
Export.image.toDrive({image: ndvi1817diff, description: 'ndvi1817diff', maxPixels: 1e13, scale: 10,crs: 'EPSG:3857', region: roi});
Export.image.toDrive({image: ndvi2117diff, description: 'ndvi2117diff', maxPixels: 1e13, scale: 10,crs: 'EPSG:3857', region: roi});
Export.image.toDrive({image: RGBmax, description: 'RGBmax', maxPixels: 1e13, scale: 30,crs: 'EPSG:3857', region: roi});