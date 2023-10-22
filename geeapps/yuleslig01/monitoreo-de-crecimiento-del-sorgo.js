var CHIRP = ui.import && ui.import("CHIRP", "imageCollection", {
      "id": "UCSB-CHG/CHIRPS/DAILY"
    }) || ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY"),
    NDVI = ui.import && ui.import("NDVI", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_8DAY_NDVI"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_8DAY_NDVI"),
    ETOMODIS = ui.import && ui.import("ETOMODIS", "imageCollection", {
      "id": "MODIS/006/MOD16A2"
    }) || ee.ImageCollection("MODIS/006/MOD16A2"),
    PUNTO = ui.import && ui.import("PUNTO", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -107.90417889940467,
            25.06359346718168
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -107.89761285173621,
            25.068530410964186
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -107.89314965593543,
            25.064137706962338
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -107.90259103166785,
            25.05818981248883
          ]
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
    ee.Geometry.MultiPoint(
        [[-107.90417889940467, 25.06359346718168],
         [-107.89761285173621, 25.068530410964186],
         [-107.89314965593543, 25.064137706962338],
         [-107.90259103166785, 25.05818981248883]]),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -107.90250520097938,
                25.058423068691653
              ],
              [
                -107.89293507921424,
                25.064021084355705
              ],
              [
                -107.89808492052283,
                25.068919138244887
              ],
              [
                -107.90430764543738,
                25.063515718444226
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-107.90250520097938, 25.058423068691653],
          [-107.89293507921424, 25.064021084355705],
          [-107.89808492052283, 25.068919138244887],
          [-107.90430764543738, 25.063515718444226]]]),
    logo = ui.import && ui.import("logo", "image", {
      "id": "users/yuleslig01/h"
    }) || ee.Image("users/yuleslig01/h");
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1');
 var filtroespacial= l8.filterBounds(PUNTO);
 print('spatialFiltered', filtroespacial);
var filtrotemporal = filtroespacial.filterDate('2020-02-01', '2020-08-31');
print('temporalFiltered', filtrotemporal);
var orden = filtrotemporal.sort('CLOUD_COVER');
var escena = ee.Image(orden.first());
Map.addLayer(escena, {bands: ['B5', 'B4', 'B3'], min: 6000, max: 12000}, 'Escena');
var radiance = ee.Algorithms.Landsat.calibratedRadiance(escena);
Map.addLayer(radiance, {bands: ['B6', 'B5', 'B2'], max: 90}, 'Radianza');
var toa = ee.Algorithms.Landsat.TOA (escena);
Map.addLayer(toa, {bands: ['B5', 'B4', 'B3'], max: 0.2}, 'Reflectancia TOA');
var ColeccionLandsat = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT')
  .filterBounds(PUNTO)
  .filterDate('2020-02-01', '2020-10-31')
  .filterMetadata ('CLOUD_COVER', 'Less_Than', 20)
  .map(function (image){return image.clip(PUNTO);});
var ComposicionRGB = {
  BANDS: ['B6', 'B5', 'B2'],
  crs: 'EPSG:4326',
  min: 0.0,
  max: 30000.0,
  framesPerSecond: 2,
  dimensions: '1050',};
var ET = (ETOMODIS
   .filterDate('2020-02-01', '2020-10-31')
   .select(['ET']));
var prec = (CHIRP
   .filterDate('2020-02-01', '2020-10-31'));
var NDVI = (NDVI
   .filterDate('2020-02-01', '2020-10-31'));
Map.addLayer(NDVI,{min: -1, max: 1, palette: ["green", "blue", "yellow", "red"]},"NDVI")
Map.centerObject(PUNTO)
var header = ui.Label('Monitoreo de crecimiento de sorgo ', {fontSize: '25px', color: 'red'});
var text = ui.Label(
   ' Para poder analizar el crecimiento de sorgo dar clic en la zona elegida, ya que dando clic se podran generar las graficas y asi mismo ver el resultado .',
   {fontSize: '12px'});
var panel = ui.Panel([header, text], 'flow', {width: '400px'});
Map.onClick(function(coords) {
 var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                'lat: ' + coords.lat.toFixed(2);
 panel.widgets().set(1, ui.Label(location));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
 Map.layers().set(1, ui.Map.Layer(point, {color: 'F71606'}));
  var ETOMAIZ = ui.Chart.image.series(ET, point, ee.Reducer.mean(), 200)
     .setOptions({
       title: 'CRECIMIENTO DEL SORGO',
       vAxis: {title: 'ET'},
       lineWidth: 1,
       pointSize: 3,
     });
  panel.widgets().set(1, ETOMAIZ);
  var Prec = ui.Chart.image.series(prec, point, ee.Reducer.mean(), 1000)
    .setOptions({
       title: 'Precipitación',
       vAxis: {title: 'Prec'},
       lineWidth: 1,
       pointSize: 3,
     });
 panel.widgets().set(2, Prec);
    var NDVIchart = ui.Chart.image.series(NDVI, point, ee.Reducer.mean(), 30)
    .setOptions({
       title: 'NDVI',
       vAxis: {title: 'NDVI'},
       lineWidth: 1,
       pointSize: 5,
     });
panel.widgets().set(3, NDVIchart);
});
Map.style().set('cursor', 'crosshair');
ui.root.insert(0, panel); 
 var logo = ee.Image('users/yuleslig01/h').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '642x291',
        format: 'png'
        },
    style: {height: '127px', width: '280px',padding :'0'}
    });
var toolPanel = ui.Panel(thumb, 'flow', {width: '300px'});
ui.root.widgets().add(toolPanel);