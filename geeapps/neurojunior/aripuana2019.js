/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var roi = ee.FeatureCollection("users/neurojunior/aripuana");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Autor: Neuro Salvador da Silva Junior, Engenheiro Florestal //
// Algoritmo para visualização de imagens de satélite Sentinel 2 
Map.centerObject(roi, 9);
// Imagem Sentinel 2 - 2020
var s2 = ee.ImageCollection ('COPERNICUS/S2_SR') 
  .filterDate ('2019-01-01', '2019-12-27') 
  .filterBounds (roi) 
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 5);
//var s2filtro = ee.Image(s2.first()); 
var s2filtro = ee.Image(s2.median());
var s2clip = s2filtro.clip(roi);
print(s2);
Map.addLayer(roi);
// Calculo dos Indices Espectrais 
var NDVI = s2clip.normalizedDifference (['B8', 'B4']);
var GNDVI = s2clip.normalizedDifference (['B8', 'B3']);
var NDMI = s2clip.normalizedDifference (['B8', 'B11']);
var NBRI = s2clip.normalizedDifference (['B8', 'B12']);
var NDWI = s2clip.normalizedDifference (['B3', 'B8']);
var NDSI = s2clip.normalizedDifference (['B3', 'B11']);
var NDGI = s2clip.normalizedDifference (['B3', 'B4']);
// Representacao de Indices Espectrais
Map.addLayer (NDGI, {
  max: 1.0, 
  min: 0, 
  palette: ['0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d', 'ff0000', 'de0101', 'c21301']},'NDGI');
Map.addLayer (GNDVI, {
  max: 1.0, 
  min: 0, 
  palette: ['0602ff', '307ef3', '30c8e2', '3ae237', 'd6e21f', 'ffd611', 'ff8b13', 'ff500d', 'ff0000', 
  'de0101', 'c21301']},'GNDVI');
Map.addLayer (NDMI, {
  max: 1.0,
  min: 0,
  palette: ['#7F0010', '#D99143', '#C04529', '#E02E20', '#EC6521', '#F6D53B']},'NDMI');
Map.addLayer (NBRI, {
  max: 1.0,
  min: 0,
  palette: ['011301', '011D01', '012E01', '023B01', '004C00', '056201', '207401', 
  '3E8601', '529400', '74A901', '99B718', 'FCD163', 
  'F1B555', 'DF923D', 'CE7E45', '66A000']},'NBRI');
Map.addLayer (NDSI, {
  max: 1.0,
  min: 0,
  palette: ['#7F0010', '#D99143', '#C04529', '#E02E20', '#EC6521', '#F6D53B']},'NDSI');
Map.addLayer (NDWI, {
  max: 1.0, min: 0, palette: ['0602ff', '307ef3', '30c8e2', '3ae237', 'd6e21f',
    'ffd611', 'ff8b13', 'ff500d', 'ff0000', 'de0101', 'c21301']},'NDWI');
Map.addLayer (NDVI, {max: 1.0, min: 0, palette: ['CE7E45', 'DF923D', 'F1B555', 
    'FCD163', '99B718', '74A901', '66A000', '529400', '3E8601','207401', '056201',
    '004C00', '023B01', '012E01', '011D01', '011301']},'NDVI');
// Representação no Display
Map.addLayer (s2clip, {max: 4000.0, min: 0.0, gamma: 1.0, bands: ['B4','B8','B2']}, 'Sedimentos B482');
Map.addLayer (s2clip, {max: 4000.0, min: 0.0, gamma: 1.0, bands: ['B12','B4','B2']}, 'Geologia B1242');
Map.addLayer (s2clip, {max: 4000.0, min: 0.0, gamma: 1.0, bands: ['B12','B8','B4']}, 'Vegetacão B12B84');
Map.addLayer (s2clip, {max: 4000.0, min: 0.0, gamma: 1.0, bands: ['B8A','B11','B4']}, 'Solo e Água B8A114');
Map.addLayer (s2clip, {max: 4000.0, min: 0.0, gamma: 1.0, bands: ['B12','B11','B4']}, 'Falsa cor - Analise urbanas B12114');
Map.addLayer (s2clip, {max: 4000.0, min: 0.0, gamma: 1.0, bands: ['B11','B8','B2']}, 'Agricultura B1182');
Map.addLayer (s2clip, {max: 4000.0, min: 0.0, gamma: 1.0, bands: ['B11','B8','B4']}, 'Analise da Vegetação B11B8B4');
Map.addLayer (s2clip, {max: 4000.0, min: 0.0, gamma: 1.0, bands: ['B8','B11','B2']}, 'Analise da Vegetação sadia B811_2');
Map.addLayer (s2clip, {max: 4000.0, min: 0.0, gamma: 1.0, bands: ['B8','B4','B3']}, 'Falsa color B843');
Map.addLayer (s2clip, {max: 4000.0, min: 0.0, gamma: 1.0, bands: ['B4','B3','B2']}, 'Cor natural B432');
Export.image.toDrive({image: NDSI, description: 'NDSI', scale: 10, region: roi, maxPixels: 1e13});
Export.image.toDrive({image: NDGI, description: 'NDGI', scale: 10, region: roi, maxPixels: 1e13});
Export.image.toDrive({image: GNDVI, description: 'GNDVI', scale: 10, region: roi, maxPixels: 1e13});
Export.image.toDrive({image: NDMI, description: 'NDMI', scale: 10, region: roi, maxPixels: 1e13});
Export.image.toDrive({image: NBRI, description: 'NBRI', scale: 10, region: roi, maxPixels: 1e13});
Export.image.toDrive({image: NDWI, description: 'NDWI', scale: 10, region: roi, maxPixels: 1e13});
Export.image.toDrive({image: NDVI, description: 'NDVI', scale: 10, region: roi, maxPixels: 1e13});
Export.image.toDrive({image: s2clip.select("B12", "B4", "B2"), description: 'Geologiaa', scale: 10, region: roi, maxPixels: 1e13});
Export.image.toDrive({image: s2clip.select("B4", "B8", "B2"), description: 'Sedimentos', scale: 10, region: roi, maxPixels: 1e13});
Export.image.toDrive({image: s2clip.select("B11", "B8", "B4"), description: 'Analisis_vegetacion', scale: 10, region: roi, maxPixels: 1e13});
Export.image.toDrive({image: s2clip.select("B8", "B11", "B2"), description: 'Analisis_vegetacion_sana', scale: 10, region: roi, maxPixels: 1e13});
Export.image.toDrive({image: s2clip.select("B8A", "B11", "B4"), description: 'Suelo_Agua', scale: 10, region: roi, maxPixels: 1e13});
Export.image.toDrive({image: s2clip.select("B12", "B8", "B4"), description: 'Vegetacion_SWIR', scale: 10, region: roi, maxPixels: 1e13});
Export.image.toDrive({image: s2clip.select("B11", "B8", "B2"), description: 'Agricultura', scale: 10, region: roi, maxPixels: 1e13});
Export.image.toDrive({image: s2clip.select("B12", "B11", "B4"), description: 'Analisis_urbanos', scale: 10, region: roi, maxPixels: 1e13});
Export.image.toDrive({image: s2clip.select("B8", "B4", "B3"), description: 'Falso_color', scale: 10, region: roi, maxPixels: 1e13});
Export.image.toDrive({image: s2clip.select("B4", "B3", "B2"), description: 'Color_natural', scale: 10, region: roi, maxPixels: 1e13});