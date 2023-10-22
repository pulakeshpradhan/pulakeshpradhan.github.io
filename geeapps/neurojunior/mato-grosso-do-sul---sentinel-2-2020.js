/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var roi = ee.FeatureCollection("users/neurojunior/ms_2000");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
Map.centerObject(roi, 9);
// Imagem Sentinel 2 - 2020 
var s2 = ee.ImageCollection ('COPERNICUS/S2_SR') 
  .filterDate ('2020-01-01', '2020-05-01') 
  .filterBounds (roi) 
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 2);
//var s2filtro = ee.Image(s2.first());  
var s2filtro = ee.Image(s2.median());
// Realizar o recorte (CLIP)
var s2clip = s2filtro.clip(roi);
// Configurando Indice NBRI
var NBRI = s2clip.normalizedDifference (['B8', 'B12']);
// Visualização Display | Google Earth Engine
Map.addLayer(roi.draw({color: '006600', strokeWidth: 1}), {}, 'Muncipios');
Map.addLayer (s2clip, {max: 5000.0, min: 0.0, gamma: 1.0, bands: ['B11','B8','B4']}, 'Analise da Vegetação');
Map.addLayer (s2clip, {max: 5000.0, min: 0.0, gamma: 1.0, bands: ['B8','B4','B3']}, 'Falso color');
Map.addLayer (s2clip, {max: 5000.0, min: 0.0, gamma: 1.0, bands: ['B4','B3','B2']}, 'Color natural');
Map.addLayer (NBRI, {max: 1.0, min: 0, palette: ['011301', '011D01', '012E01', '023B01', '004C00', '056201',
        '207401', '3E8601', '529400', '74A901', '99B718', 'FCD163', 'F1B555', 'DF923D', 'CE7E45', '66A000']},'NBRI');
// Exportar os arquivos para o Google Drive
Export.image.toDrive({image: NBRI, description: 'NBRI', scale: 10, region: roi, maxPixels: 1e13});
Export.image.toDrive({image: s2clip.select("B8", "B4", "B3"), description: 'Falsa Cor', scale: 10, region: roi, maxPixels: 1e13});
Export.image.toDrive({image: s2clip.select("B4", "B3", "B2"), description: 'Cor natural', scale: 10, region: roi, maxPixels: 1e13});
Export.image.toDrive({image: s2clip.select("B11", "B8", "B4"), description: 'Analise da vegetacao', scale: 10, region: roi, maxPixels: 1e13});
print(roi);
print(s2clip);