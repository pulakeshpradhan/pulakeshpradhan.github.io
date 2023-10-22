/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var mun = ee.FeatureCollection("users/alejandromarambio/Oaxaca/LUL_municipios"),
    s2_2021 = ee.Image("users/alejandromarambio/Oaxaca_R/2021_S2_10m"),
    LULclass = ee.Image("users/alejandromarambio/Oaxaca_R/2021_LUL_class10"),
    usv2014 = ee.Image("users/alejandromarambio/Oaxaca/usv2014_10palette"),
    urban = ee.Image("users/alejandromarambio/Oaxaca/GHSL18"),
    s2_2019 = ee.Image("users/alejandromarambio/Oaxaca_R/2019_S2_10m"),
    ndviS2 = ee.Image("users/alejandromarambio/Oaxaca_R/ndvi_S2_192021"),
    S1_crops = ee.Image("users/alejandromarambio/Oaxaca_R/2021_S1_crops"),
    l7_2000 = ee.Image("users/alejandromarambio/Oaxaca_R/2000_L7"),
    l8_2020 = ee.Image("users/alejandromarambio/Oaxaca_R/2020_L8"),
    ndviL78 = ee.Image("users/alejandromarambio/Oaxaca_R/ndvi_L78_0020"),
    P_EFM2021 = ee.Image("users/alejandromarambio/Oaxaca_R/2021EFM"),
    P_JAS2021 = ee.Image("users/alejandromarambio/Oaxaca_R/2021JAS");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// route to script for app 202103_Oaxaca/POERT_SSC
// Set a custom basemap style and default to the satellite map type.
Map.setOptions('roadmap');
Map.centerObject(mun, 10);
Map.setControlVisibility(false);
Map.setControlVisibility({zoomControl: false, layerList: true, fullscreenControl: true }); //scaleControl: true
// Palette for classification
var lulPalette = [
    '2738ff', // 1	agua
    '068fa5', // 2	humedal (aparte ahora como 3)
    '284e15', // 3	bosque primario
    '30a928', // 4	bosque
    'bfdf86', // 5	matorral
    '4ff313', // 6	selva primaria
    '9f9f9f', // 7	suelo desnudo
    'f3b543', // 8	pastizal
    'f032f3', // 9	cultivo
    'FF0000', //10	urbano  (aparte ahora como 7)
];
//urban mask
var mask = urban.gt(30);
var maskR03 = urban.updateMask(mask);
//Maps
Map.addLayer(l7_2000, {bands: ['B3', 'B2', 'B1'], min: 0, max: 0.3}, '2000 Landsat 7',false);
Map.addLayer(l8_2020, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3}, '2020 Landsat 8',false);
Map.addLayer(ndviL78, {bands: ['ndvi2000', 'ndvi2020', 'ndvi2020'], min: 0.2, max: 0.7}, 'ndvi 2000 vs 2020',false);
Map.addLayer(P_EFM2021, {bands: ['R', 'G', 'B'], min: 64, max: 5454, gamma: 1.8}, '2021 EFM',false);
Map.addLayer(P_JAS2021, {bands: ['R', 'G', 'B'], min: 64, max: 5454, gamma: 1.8}, '2021 JAS',false);
Map.addLayer(P_EFM2021.normalizedDifference(['N','R']).rename('NDVI T1'), {min:0.2,max:0.9,palette: ['black', 'grey','yellow','green']}, 'NDVI EFM', false);
Map.addLayer(P_JAS2021.normalizedDifference(['N','R']).rename('NDVI T2'), {min:0.2,max:0.9,palette: ['black', 'grey','yellow','green']}, 'NDVI JAS', false);
Map.addLayer(s2_2019, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3}, '2019 Sentinel 2',false);
Map.addLayer(s2_2021, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3}, '2021 Sentinel 2');
Map.addLayer(ndviS2, {bands: ['ndvi2019', 'ndvi2021', 'ndvi2021'], min: 0.1, max: 0.7}, 'ndvi 2019 vs 2021',false);
Map.addLayer(S1_crops, {bands: ['s1pri', 's1ver', 's1inv'], min: -25, max: -5}, 'Sentinel 1 cultivos',false);
Map.addLayer(usv2014, {palette:lulPalette, min:1, max:10, opacity: 1}, 'Coberturas INEGI2014',false);
Map.addLayer(LULclass, {palette:lulPalette, min:1, max:10, opacity: 1}, 'Coberturas LUL',false);
Map.addLayer(maskR03, {palette:['#660d11', 'red'], min:0, max:100, opacity: 0.8}, 'Area urbana',false);
Map.addLayer(mun.style({color: 'white', fillColor: '00000000', width: 1}),{},'Municipios');
// Create and add the legend title.
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '10px 30px',
    color: 'green',
  }
});
var legendTitle = ui.Label({
  value: 'POERT Sierra Sur - Costa',
  style: {fontFamily: 'Arial', fontWeight: 'bold', fontSize: '18px', margin: '0 0 2px 0', padding: '0'}
});
var legendsubTitle = ui.Label({
  value: 'www.poert-ssc.com',
  style: {fontFamily: 'Arial', fontSize: '11px', margin: '0 0 2px 0', padding: '0'}
});
legend.add(legendTitle);
legend.add(legendsubTitle);
Map.add(legend);