var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -99.01526916503906,
            19.14145249092739
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#bf04c2",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #bf04c2 */ee.Geometry.Point([-99.01526916503906, 19.14145249092739]);
// Analisis de series temporales de incendios con Earth Engine
// http://www.gisandbeers.com/analisis-series-temporales-incendios-google-earth-engine/
// Acotamos un momento temporal en el que conozcamos la existencia del incendio
var ImagenesTemporales= ee.ImageCollection ('COPERNICUS/S2')
  .filterDate ('2020-12-30' ,'2021-01-30')
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 20);
// Componemos una imagen fruto de los valores medios de todas las imagenes disponibles
var Incendio = ImagenesTemporales.mean();
// Representamos la imagen a falso color para visualizar la zona afectada
Map.addLayer (Incendio, {
     max: 5000.00, 
     min: 0.00,
     bands: ['B11', 'B8', 'B4']}, 
     'Vista de Incendio'); 
// Centramos la vista en el lugar de estudio
Map.setCenter (-99.02, 19.14, 11); 
// Incorporamos una coordenada de control y extraemos los valores de la banda NIR
var BANDA8= ImagenesTemporales.select ('B8');
// Imprimimos una sencilla grafica temporal de los valores ofrecidos por el NIR
print (ui.Chart.image.series (BANDA8, geometry));