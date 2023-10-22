var Estados = ui.import && ui.import("Estados", "table", {
      "id": "users/gaguilar/Estados"
    }) || ee.FeatureCollection("users/gaguilar/Estados"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/gaguilar/PY"
    }) || ee.FeatureCollection("users/gaguilar/PY");
//var vegPalette = ['green', 'blue', 'yellow', 'orange'];
//Imagen para Landsat 5
var IMGLandsat5= ee.ImageCollection ('LANDSAT/LT05/C01/T1_TOA') 
  .filterDate ('2000-01-01', '2000-12-31') //fechas disponibles ('1984-01-01' - '2012-05-05')
  .filterBounds (Estados) 
  .filterMetadata ('CLOUD_COVER', 'Less_Than', 4);
var Landsat5Filtro = ee.Image(IMGLandsat5.median());
var Landsat5Clip = Landsat5Filtro.clip (Estados);
Map.addLayer (Landsat5Clip, {
  min: 0.045904818922281265,
  max: 0.1741328276693821,
  gamma: 1.09,
  bands: ['B3','B2','B1']}, 
  'Imagen Landsat 5 ');
print (Landsat5Filtro);
Map.centerObject (Estados);
Export.image.toDrive({
  image: Landsat5Clip.select("B3", "B2", "B1"),
  description: 'Landsat5_30m',
  scale: 30,
  region: Estados});
//Imagen para LANDSAT 7
var IMGLandsat7= ee.ImageCollection ('LANDSAT/LE07/C01/T1_TOA') 
  .filterDate ('2009-01-01', '2010-12-31') 
  //fechas disponibles ('1999-01-01' - actualidad)
  .filterBounds (Estados) 
  .filterMetadata ('CLOUD_COVER', 'Less_Than', 10);
var Landsat7Filtro = ee.Image(IMGLandsat7.median());
var Landsat7Clip = Landsat7Filtro.clip (Estados);
Map.addLayer (Landsat7Clip, {
  min: 0.03254673257470131,
  max: 0.21422117948532104,
  gamma: 1.14,
  bands: ['B3','B2','B1']}, 
  'Imagen Landsat 7');
print (Landsat7Filtro);
Export.image.toDrive({
  image: Landsat7Clip.select("B3", "B2", "B1"),
  description: 'Landsat7_30m',
  scale: 30,
  region: Estados});
//Imagen para LANDSAT 8
var IMGLandsat8= ee.ImageCollection ('LANDSAT/LC08/C01/T1_TOA') 
  .filterDate ('2019-01-01', '2020-06-01') //fechas disponibles ('2013-04-11' - actualidad)
  .filterBounds (Estados) 
  .filterMetadata ('CLOUD_COVER', 'Less_Than', 10);
var Landsat8Filtro = ee.Image(IMGLandsat8.median());
var Landsat8Clip = Landsat8Filtro.clip (Estados);
Map.addLayer (Landsat8Clip, {
  min: 0.04,
  max: 0.20,
  gamma: 1.0,
  bands: ['B4','B3','B2']}, 
  'Imagen Landsat 8 ');
print (Landsat8Filtro);
Export.image.toDrive({
  image: Landsat8Clip.select("B4", "B3", "B2"),
  description: 'Landsat8_30m',
  scale: 30,
  region: Estados});
/*  
  //EVI
var evi2000 =  Landsat5Clip.expression(
   '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
     'NIR': Landsat5Clip.select('B4'),
     'RED': Landsat5Clip.select('B3'),
     'BLUE': Landsat5Clip.select('B1')
});
var evi2010 =  Landsat7Clip.expression(
   '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
     'NIR': Landsat7Clip.select('B4'),
     'RED': Landsat7Clip.select('B3'),
     'BLUE': Landsat7Clip.select('B1')
});
var evi2020 =  Landsat8Clip.expression(
   '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))', {
     'NIR': Landsat8Clip.select('B5'),
     'RED': Landsat8Clip.select('B4'),
     'BLUE': Landsat8Clip.select('B2')
});
//Map.addLayer(evi2000, {min: -1, max: 1,palette: vegPalette}, 'EVI00');
//Map.addLayer(evi2010, {min: -1, max: 1, palette: vegPalette}, 'EVI10');
//Map.addLayer(evi2020, {min: -1, max: 1, palette: vegPalette}, 'EVI20');
*/