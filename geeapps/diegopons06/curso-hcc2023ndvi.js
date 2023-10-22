var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -64.3835843905874,
                -31.106124970167574
              ],
              [
                -64.3835843905874,
                -31.237139219687617
              ],
              [
                -64.23286570162256,
                -31.237139219687617
              ],
              [
                -64.23286570162256,
                -31.106124970167574
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
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-64.3835843905874, -31.106124970167574],
          [-64.3835843905874, -31.237139219687617],
          [-64.23286570162256, -31.237139219687617],
          [-64.23286570162256, -31.106124970167574]]], null, false),
    palette = ui.import && ui.import("palette", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI"
        ],
        "min": 0.3355331803963033,
        "max": 0.5561962419870923,
        "palette": [
          "ff460a",
          "bdff0a",
          "08ff5c",
          "ffffff"
        ]
      }
    }) || {"opacity":1,"bands":["NDVI"],"min":0.3355331803963033,"max":0.5561962419870923,"palette":["ff460a","bdff0a","08ff5c","ffffff"]};
// Define la región de interés (ROI) en Río Ceballos, Córdoba, Argentina
//var roi = ee.Geometry.Point([-64.3108, -31.1785]).buffer(1000); // Puedes ajustar el punto y el tamaño del buffer según tus necesidades
Map.centerObject(roi,12);
// Define la paleta de colores de rojo a verde
//var palette = ['FF0000', 'FFFF00', '00FF00'];
// Carga la colección de imágenes Landsat
var collection = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR') // Cambiar al sensor y nivel de procesamiento deseado
    .filterDate('1987-01-01', '2023-12-31') // Filtra por fecha
    .filterBounds(roi) // Filtra por la región de interés
    .select(['B4', 'B3']); // Selecciona las bandas correspondientes al infrarrojo cercano (NIR) y rojo (RED)
// Calcula el NDVI
var ndvi = collection.map(function(image) {
  var ndvi = image.normalizedDifference(['B4', 'B3']).rename('NDVI'); // Calcula el NDVI y renombra la banda
  return image.addBands(ndvi); // Agrega el NDVI como una banda adicional a la imagen
});
// Calcula la media del NDVI a lo largo del tiempo
var meanNDVI = ndvi.mean().clip(roi); // Calcula la media y recorta a la región de interés
// Visualiza el NDVI medio
Map.addLayer(meanNDVI, palette, 'NDVI medio');
// Convertir la imagen del NDVI medio a Float32
var meanNDVIFloat32 = meanNDVI.toFloat();
// Exporta la imagen de la media del NDVI como una imagen en Google Drive
Export.image.toDrive({
  image: meanNDVIFloat32.select('NDVI'),
  description: 'ndvi_medio_rio_ceballos',
  folder: 'GEE_exports', // Cambiar al nombre de la carpeta deseada en Google Drive
  scale: 30, // Cambiar a la escala deseada en metros
  region: roi,
  maxPixels: 1e13 // Ajustar según la cantidad máxima de píxeles permitida
});