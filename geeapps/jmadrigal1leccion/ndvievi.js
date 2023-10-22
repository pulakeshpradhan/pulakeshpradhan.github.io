var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -100.4738887633725,
            17.150209555733397
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([-100.4738887633725, 17.150209555733397]);
// Coleccion Sentinel 2 nivel 2
var ColeccionSentinel = ee.ImageCollection("COPERNICUS/S2_SR")
  .filterDate ('2021-07-01' ,'2021-07-21')
  //.filterBounds (geometry)
  .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 10);
var Vegetacion = ee.Image(ColeccionSentinel.mean());
// NDVI (Normalized Difference Vegetation Index)
var NDVI = Vegetacion.expression ('float ((NIR - RED) / (NIR + RED))',{
    'NIR': Vegetacion.select ('B8'),  
    'RED': Vegetacion.select ('B4')});
// EVI (Enhanced Vegetation Index)
var EVI = Vegetacion.expression ('float (2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1)))', {
    'NIR': Vegetacion.select ('B8'),  
    'RED': Vegetacion.select ('B4'),
    'BLUE': Vegetacion.select ('B2')});
    // Simbologia comun para los indices
var Simbologia = {max: 1, min: 0, // IMPORTANTE variar rangos en funcion del indice
    palette: ['#0000ff', 'DF923D', 'F1B555',
    'FCD163', '99B718', '74A901', '66A000', '529400', '3E8601', '207401',
    '056201', '004C00', '023B01', '012E01', '011D01', '011301']};
// Representacion de indices de vegetacion
Map.addLayer (EVI, Simbologia, 'EVI',0);
Map.addLayer (NDVI, Simbologia, 'NDVI',0);
Map.addLayer (Vegetacion, {max: 4000.0, min: 0.0, gamma: 1.0, bands: ['B4','B3','B2']}, 'RGB color natural',0);
Map.setCenter (-100.4738887633725,17.150209555733397);