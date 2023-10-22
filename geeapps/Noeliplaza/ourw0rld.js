//pide coordenadas y las almazena en las variables n2 y n1. Luego crea otra variable para tener el punto geografico
var n2 = parseFloat(prompt("Inserta long"));
var n1 = parseFloat(prompt("Inserta lat"));
var point = ee.Geometry.Point([ n2, n1 ]);
//Añade el punto a la consola y lo ubica en el mapa
Map.addLayer(point, {color: 'red'}, 'point');
// Importa el Landsat 8 TOA image collection
var lANDSAT8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
// obtiene la imagen sin manchas atraves del filtro en 2021
var image = ee.Image(
  lANDSAT8.filterBounds(point)
    .filterDate('2021-01-01', '2021-12-31')
    .sort('CLOUD_COVER')
//SORT SIRVE PARA ORDENAR
    .first()
);
// Banda 4 - rojo	0,64-0,67 -	Discrimina pendientes de vegetación
//Banda 5 - Infrarrojo Cercano (NIR)	0,85-0,88	- Enfatiza el contenido de biomasa y las costas
var nir = image.select('B5');
var rojo = image.select('B4');
// el ndvi es la resta del nir y el rojo dividido entre su suma
var ndvi = nir.subtract(rojo).divide(nir.add(rojo)).rename('NDVI');
// Obtener el resultado
Map.centerObject(point, 12);
var ndviParams = {min: -1, max: 1, palette: ['blue', 'white', 'green']};
Map.addLayer(ndvi, ndviParams, 'NDVI image');
//agregar el NDVI a una coleccion de imagenes
var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
};
//agregar una banda de NDVI a cada imagen de la colección
var ndvi = addNDVI(image).select('NDVI');
var withNDVI = lANDSAT8.map(addNDVI);
// hacer un compuesto en el que cada píxel contenga el píxel NDVI máximo de la colección
var greenest = withNDVI.qualityMosaic('NDVI');
// Añadir una CAPA
var visParams = {bands: ['B4', 'B3', 'B2'], max: 0.3};
Map.addLayer(greenest, visParams, 'Greenest pixel composite');