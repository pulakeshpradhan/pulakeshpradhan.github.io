var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -98.67256332397461,
            19.191670259351337
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([-98.67256332397461, 19.191670259351337]);
// Analisis de series temporales de incendios con Earth Engine
// http://www.gisandbeers.com/analisis-series-temporales-incendios-google-earth-engine/
// Acotamos un momento temporal en el que conozcamos la existencia del incendio
var ImagenesTemporales= ee.ImageCollection ('COPERNICUS/S2')
  .filterDate ('2020-12-30' ,'2021-01-15')
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
Map.setCenter (-98.67, 19.19, 11); 
// Incorporamos una coordenada de control y extraemos los valores de la banda NIR
var BANDA8= ImagenesTemporales.select ('B8');
// Imprimimos una sencilla grafica temporal de los valores ofrecidos por el NIR
print (ui.Chart.image.series (BANDA8, geometry));