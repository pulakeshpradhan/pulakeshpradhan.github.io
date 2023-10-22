var table = ui.import && ui.import("table", "table", {
      "id": "users/cpwaldman/HORTA_B4"
    }) || ee.FeatureCollection("users/cpwaldman/HORTA_B4"),
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/cpwaldman/div_depart_geog"
    }) || ee.FeatureCollection("users/cpwaldman/div_depart_geog"),
    table6 = ui.import && ui.import("table6", "table", {
      "id": "users/cpwaldman/mask_final_11_long"
    }) || ee.FeatureCollection("users/cpwaldman/mask_final_11_long"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -58.32317002703752,
                -35.018506994686405
              ],
              [
                -58.060871443053145,
                -35.25210541018438
              ],
              [
                -57.73265489031877,
                -34.97238212973607
              ],
              [
                -58.07872422625627,
                -34.7819835198557
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
        [[[-58.32317002703752, -35.018506994686405],
          [-58.060871443053145, -35.25210541018438],
          [-57.73265489031877, -34.97238212973607],
          [-58.07872422625627, -34.7819835198557]]]),
    table4 = ui.import && ui.import("table4", "table", {
      "id": "users/cpwaldman/muestras_f01buff10_2"
    }) || ee.FeatureCollection("users/cpwaldman/muestras_f01buff10_2"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B8",
          "B4",
          "B12"
        ],
        "min": 431.5,
        "max": 4187,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B8","B4","B12"],"min":431.5,"max":4187,"gamma":1};
//var depa = table;
var muestras_total = table4
var mask = table6;
//Map.addLayer(mask, {}, 'mask');
var imagen = imageCollection
    .filterBounds(mask)
    .filterDate('2020-10-10','2020-12-01')
    .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10);
 var bandas = ['B8','B2','B12','B11','B4'];
// visualizar bandas
var img = imagen.select(bandas).map(function(i){return i.clip(mask)});
print("img", img);
var stack1 = img.median();
Map.addLayer(stack1.clip(mask), imageVisParam,"Stack1", false);
var ndvi = stack1.normalizedDifference(['B8', 'B4']).rename('ndvi');
//print ("ndvi", ndvi);
//Map.addLayer (ndvi, {min:-1, max:1, palette: ['#d5d82b','#47894c', '#407bff' , '#d24aff']}, 'ndvi');
//plastic index
var plmi = stack1.normalizedDifference(['B11', 'B4']).rename('plmi');
//print ("plmi", plmi);
//Map.addLayer(plmi, {},"plmi", false);
var plmi_mask = plmi.gt(-0.35);
plmi = plmi.mask(plmi_mask);
Map.addLayer(plmi_mask, {},"plmi_mask", false);
var stack2 = stack1.addBands(ndvi);
print('stack2', stack2);
var stack3 = stack2.addBands(plmi_mask);
print('stack3', stack3);
//Clasificacion
var seed =  2015;
muestras_total = muestras_total.randomColumn('random', seed);
var features_train = muestras_total.filterMetadata('random', 'not_less_than', 0.3 );
var features_test = muestras_total.filterMetadata('random', 'less_than', 0.3 );
var training = stack3.sampleRegions({
  collection: features_train, //Acá van las muestras 
  properties: ['class','random'], 
  scale:30
});
var testing = stack3.sampleRegions({
  collection: features_test, //Acá van las muestras 
  properties: ['class','random'], 
  scale:30
});
print ("train", training.size());
print ("test", testing.size());
// Entrenamiento
var bandas_sel = ['B8','B4','B12','B11','ndvi', 'plmi'];
var trained = ee.Classifier.svm().train(training, 'class', bandas_sel);
// clasificación con el modelo entrenado
var classified = stack3.select(bandas_sel).classify(trained).clip(mask);
Map.addLayer(classified, {min:0, max:3, palette: ['#d5d82b','#47894c', '#407bff' , '#d24aff']}, 'Clasificacion');
//print("clasificacion",classified);
Map.centerObject(mask, 10 );
// Generación de matriz de confusión y resultados
var validation = testing.classify(trained);
var errorMatrix = validation.errorMatrix('class', 'classification');
print('Matriz de Confusión:', errorMatrix);
print('Exactitud General:', errorMatrix.accuracy());
print('Indice Kappa:', errorMatrix.kappa());
print('Exactitudes de Usuario:', errorMatrix.consumersAccuracy());
print('Exactitudes de Productor:', errorMatrix.producersAccuracy());
//descargar imagen a exportar y select three bands.
//var classified = ee.Image
 // .select(['B0']);
//clasificacion_con_nodata = clasificacion.where(classified.gt(5).Or(classified.lt(0)), -99);
 // exportar imágen a Google Drive
Export.image.toDrive({
  image:classified,
  description: 'classified',
  scale: 10,
  region: geometry,
  crs:'EPSG:32721',
});
var areaImage = ee.Image.pixelArea().addBands(
     classified)
var areas = areaImage.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'class',
    }),
    geometry: mask.geometry(),
    scale: 10,
    maxPixels: 1e10
    }); 
print(areas)