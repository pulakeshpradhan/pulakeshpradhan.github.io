var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -4.093684406674029,
            39.92474471212918
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #0b4a8b */ee.Geometry.Point([-4.093684406674029, 39.92474471212918]);
//NDVI MULTITEMPORAL EN UN PUNTO DEFINIDO MANUALMENTE
//FECHAS DE INICIO Y FIN DE LAS IMÁGENES LANDSAT
var fech1 = '2013-01-01'; var fech2 = '2021-05-15';
////////////////////////////////////////////////////////
// COLECCIÓN LANDSAT8
/**Landsat 8 Surface Reflectance Tier 1
 * Function to mask clouds based on the pixel_qa band of Landsat 8 SR data.
 * @param {ee.Image} image input Landsat 8 SR image
 * @return {ee.Image} cloudmasked Landsat 8 image
 */
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
//IMAGEN LANDSAT CON CORRECCIÓN A NIVEL DE SUELO (BOA):
var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate(fech1, fech2)
                  .map(maskL8sr);
var visParams = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};
Map.addLayer(dataset.median(), visParams);
////////////////////////////////////////////////////////
//COLECCIÓN LANDSAT8 NDVI-8DIAS -TOA
var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_8DAY_NDVI')
                  .filterDate(fech1, fech2);
var colorized = dataset.select('NDVI');
var colorizedVis = {
  min: 0.0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
Map.centerObject(geometry, 12);
Map.addLayer(colorized, colorizedVis, 'Colorized');
//GRAFICO DE  LAS BANDAS SELECCIONADAS DE LA SERIE TEMPORAL DE UN PUNTO CREADO MANUALMENTE MEDIANTE geometry
var grafico_punto_NDVI = ui.Chart.image.series(colorized.select('NDVI'), geometry, ee.Reducer.mean(),15)
.setOptions({
      title: 'VALORES DE NDVI EN EL PUNTO EN EL PERIODO '+fech1+' - '+fech2,
      hAxis: {title: 'Fechas'},
      vAxis: {title: 'NDVI'}});
print(grafico_punto_NDVI)