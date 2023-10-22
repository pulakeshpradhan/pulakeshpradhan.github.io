var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -74.24439103153804,
                4.41052780111893
              ],
              [
                -74.22138840702632,
                4.409672035498075
              ],
              [
                -74.22087342289547,
                4.444586470399821
              ],
              [
                -74.24421937016109,
                4.444073034776658
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-74.24439103153804, 4.41052780111893],
          [-74.22138840702632, 4.409672035498075],
          [-74.22087342289547, 4.444586470399821],
          [-74.24421937016109, 4.444073034776658]]]),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b4",
          "b3",
          "b2"
        ],
        "min": 76.22,
        "max": 3734.78,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["b4","b3","b2"],"min":76.22,"max":3734.78,"gamma":1},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "max": 2482,
        "palette": [
          "ff1fa6"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"max":2482,"palette":["ff1fa6"]};
//Realizamos la mascara a la imagen Sentinel 2 banda QA60
function MascaraNubesS(image) {
  var qa = image.select('QA60');
//Excluimos los pixel identificados como nubes y cirros de la imagen
  var RecorteNubesMascaraS = 1 << 10;
  var RecorteCirrosMascaraS = 1 << 11;
  var MascaraS = qa.bitwiseAnd(RecorteNubesMascaraS).eq(0)
      .and(qa.bitwiseAnd(RecorteCirrosMascaraS).eq(0));
  return image.updateMask(MascaraS);}
//Realizamos una llamada a la colección de imágenes Sentinel y filtramos por fecha y cobertura de nubes
var Sentinel = ee.ImageCollection('COPERNICUS/S2')
   .filterDate('2020-01-1', '2020-05-15')
   .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
   .filterBounds (geometry)
   .map(MascaraNubesS);
//Representamos la composición RGB a color natural o falso color. Por ejemplo, un RGB 432
//Obtenemos una única image fruto de la combinación de píxels disponibles con ausencia de nube
var rgbVis = {
  min: 446,
  max: 4895,
  bands: ['B8', 'B4', 'B3'],};
Map.addLayer(Sentinel.median(), rgbVis, 'SENTINEL_SIN_NUBES',0);
// ADICIONAMOS LA IMAGEN SATELITAL DEL PROYECTO
var IMAGENRETAMO = ee.Image('users/cartografia2016ud/IMAGEN_SATELITAL');
Map.addLayer(IMAGENRETAMO, imageVisParam, 'IMAGEN_RETAMO',0);
// ADICIONAMOS LOS PUNTOS DE RETAMO VISTOS EN CAMPO
var RETAMO = ee.FeatureCollection('users/cartografia2016ud/RETAMO_2020');
print(RETAMO, 'PUNTOS_RETAMO');
// CREAMOS GRAFICAS DE ANALSIS DE REFLECTIVIDAD EN LOSPUNTOS GPS
var REFLECTIVIDAD = ui.Chart.image.byRegion(IMAGENRETAMO, RETAMO.select('index'), ee.Reducer.mean(), 10);
print(REFLECTIVIDAD,'REFLECTIVIDAD_IMAGEN');
var REFLEC = ui.Chart.image.byRegion(Sentinel.median(), RETAMO.select('index'), ee.Reducer.mean(), 10);
print(REFLEC,'REFLEC_SENTINEL-2');
// REALIZAMOS LAS DIFERENTES MASCARAS CON VALORES DE LA FIRMA ESPECTRAL
var B1 = IMAGENRETAMO.select('b1');
var B1FILTRO = B1.updateMask(B1.lt(45).add(B1.lt(104)));
Map.addLayer(B1FILTRO, {}, 'B1FILTRO');
var B2 = IMAGENRETAMO.select('b2');
var B2FILTRO = B2.updateMask(B2.lt(263).add(B2.lt(352)));
Map.addLayer(B2FILTRO, {}, 'B2FILTRO');
var B3 = IMAGENRETAMO.select('b3');
var B3FILTRO = B3.updateMask(B3.lt(417).add(B3.lt(529)));
Map.addLayer(B3FILTRO, {}, 'B3FILTRO');
var B4 = IMAGENRETAMO.select('b4');
var B4FILTRO = B4.updateMask(B4.lt(1693).add(B4.lt(2009)));
Map.addLayer(B4FILTRO, {}, 'B4FILTRO');
// realizamos la composicion de las bandas filtradas segun los valores radiometricos
var COMPO = B1FILTRO.select('b1').add(B2FILTRO.select('b2')).add(B3FILTRO.select('b3')).add(B4FILTRO.select('b4'));
Map.addLayer(COMPO, imageVisParam2, 'COMPO');
Map.addLayer(RETAMO, {color: '859CE9'}, 'PUNTOS_RETAMO');
Map.centerObject(RETAMO);
// Definimos un kernel.
var kernel = ee.Kernel.circle({radius: 0.5});
// Perform an erosion followed by a dilation, display.
var FILTRO = COMPO
             .focal_min({kernel: kernel, iterations: 2})
             .focal_max({kernel: kernel, iterations: 2});
Map.addLayer(FILTRO, {}, 'FILTRO');
// Creamos el titulo del mapa.
var TITULO_MAPA = ui.Label({
  value:'UBICACION ZONAS POSIBLES RETAMO ESPINOSO',
  style:{
    fontSize:'20px',
    fontWeight:'bold'
  }
});
// Agregamos el titulo al mapa
TITULO_MAPA.style().set('position', 'top-center');
Map.add(TITULO_MAPA);