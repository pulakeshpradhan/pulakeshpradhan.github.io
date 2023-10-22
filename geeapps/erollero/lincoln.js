var s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    zona = ui.import && ui.import("zona", "table", {
      "id": "users/erollero/LINCOLN/ESTLINCOLNsUBgeo"
    }) || ee.FeatureCollection("users/erollero/LINCOLN/ESTLINCOLNsUBgeo"),
    muestras = ui.import && ui.import("muestras", "table", {
      "id": "users/erollero/LINCOLN/verdadfinalincoln"
    }) || ee.FeatureCollection("users/erollero/LINCOLN/verdadfinalincoln");
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = ee.Number(2).pow(10).int();
  var cirrusBitMask = ee.Number(2).pow(11).int();
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked and scaled data.
  return image.updateMask(mask).divide(10000);
}
// Map the cloud masking function over one year of data
var s2filtrada = s2.filterDate('2019-08-15', '2019-12-10')
                  // Pre-filter to get less cloudy granules.
                  .filterBounds(zona)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5))
                  .map(maskS2clouds)
                  .select( 'B8A','B3','B4','B5','B6','B7','B8','B11','B12');
var imagen = s2filtrada.median();
var bandas = ['B8A','B3','B4','B5','B6','B7','B8','B11','B12'];
// visualizar bandas
var sentinel2 = imagen.select(bandas);
print("sentinel2" , sentinel2);
var sentinel2a = sentinel2.clip(zona);
// Función para enmascarar nubes desde la banda pixel_qa de calidad de Landsat 8 Surface Reflectance
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  // Return the masked image, scaled to reflectance, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B[2-7]*")
      .copyProperties(image, ["system:time_start"]);
}
// Colección de imágenes y filtrado de las mismas por capa (depto), fechas, % de nubes de escena landsat.
var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterBounds(zona)
    .filterDate('2019-08-15', '2019-12-10')
    .filterMetadata("CLOUD_COVER", "less_than", 20)
    .map(maskL8sr)
// Calculo de la mediana de toda la colección
var composite = collection.median();
print( composite);
var bandas = ['B2','B3','B4','B5','B6','B7'];
// visualizar bandas
var landsat = composite.select(bandas);
print("landsat" , landsat);
var landsat8 = landsat.clip(zona);
//Mostrar imagen google satelital detras del mapa.
Map.setOptions("HYBRID")
//Centrado del mapa y zoom
Map.centerObject(zona, 10);
Map.addLayer(landsat8, {min:0.0432 ,max:0.422,gamma: [0.85, 1.35, 1.1], bands: ['B5','B6','B4']}, 'Landsat8_30mts');
var max = collection.max();
var maxi = max.clip(zona);
var min = collection.min();
var mini = min.clip(zona);
//Map.addLayer(min, {}, 'min');
//print("mini", min);
//var desvio st = sentinel.s
var desv_st = collection.reduce(ee.Reducer.stdDev());
print("Dst", desv_st);
var DS = desv_st.clip(zona);
//Cálculo NDVI
//generacion de dicccionario
var bandas_indices = {
  'NIR':  landsat8.select('B5'),
  'RED':  landsat8.select('B4'),
  'SWIR': landsat8.select('B6'),
  'BLUE':  landsat8.select('B2'),
  'Green': landsat8.select('B3')
};
//Luego se indica la ecuación y el diccionario de bandas a utilizar:
var ndvi =  landsat8.expression('10000 * (NIR - RED) / (NIR + RED)', bandas_indices).rename('NDVI');
print("ndvi", ndvi);
// Shared visualization parameters.
var visParams_ndvi = {
  min: 1000,
  max: 8000,
  palette: [
      'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
      '74A901', '66A000', '529400', '3E8601', '207401', '056201',
      '004C00', '023B01', '012E01', '011D01', '011301'
  ]
};
Map.addLayer(ndvi,visParams_ndvi,'NDVI')
//unir todas las capas en una imagen
var stack1 = landsat8.addBands(maxi);
print('stack1', stack1.bandNames());
var stack2 = stack1.addBands(mini);
print('stack2', stack2.bandNames());
var stack3 = stack2.addBands(DS);
print('stack3', stack3.bandNames());
var stack4 = stack3.addBands(ndvi);
print('stack4', stack4.bandNames());
// Using code from earthEngine docs:
// Get LS8 projection
var ls8Projection = composite.projection();
// Resample Sentinel data
var sentinelMean = sentinel2a
    .reproject({
      crs: ls8Projection,
      scale: 30
    });
print("sentinelMean",sentinelMean);
Map.addLayer(sentinelMean, {min:0.144 ,max:0.4550,gamma: [0.85, 1.35, 1.1], bands: ['B8','B11','B4']}, 'Sentinel2_30mts');
// Load the Sentinel-1 ImageCollection.
var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD');
// Filter by metadata properties.
var s1filtered = sentinel1
  .filterDate('2019-10-01', '2019-11-20')
  // Filter to get images with VV and VH dual polarization.
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  // Filter to get images collected in interferometric wide swath mode.
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
  .select('V.*');
   var s1_sar_min = s1filtered.mean().clip(zona);// it is a image
  var sar_viz={bands: ['VV'],min:-21,max:-7,palette:['#a50026','#d73027','#f46d43','#fdae61','#fee090','#ffffbf','#e0f3f8','#abd9e9','#74add1','#4575b4','#313695']};
Map.addLayer(s1_sar_min,sar_viz,"Sentinel1");
// Create a constant image.
var image1 = ee.Image(stack4);
print(image1);
// Concatenate two images into one multi-band image.
var image2 = ee.Image(sentinelMean);
var image21 = ee.Image(s1_sar_min);
var image3 = ee.Image.cat([image1,image21, image2]);
print(image3);
var seed =  560;
var muestras = muestras.randomColumn('random', seed);
// separo las muestras de Entrenamiento y validación, son independientes. Identificar umbral de separación
var features_train = muestras.filterMetadata('random', 'not_less_than', 0.7 );
var features_test = muestras.filterMetadata('random', 'less_than', 0.7 );
print ("training", features_train.size());
print ("testing", features_test.size());
// extraccion de información incluyendo atributos clase y "random"
var training = image3.sampleRegions({
  collection: features_train, //Acá van las muestras 
  properties: ['class','random'], 
  scale:30
});
var testing = image3.sampleRegions({
  collection: features_test, //Acá van las muestras 
  properties: ['class','random'], 
  scale:30
});
print ("train", training.size());
print ("test", testing.size());
// Entrenamiento
var parametros = {
  numberOfTrees: 105, 
  variablesPerSplit: 0, 
  minLeafPopulation: 1, 
  seed: 15
};
var trained = ee.Classifier.randomForest(parametros).train(training, 'class');
// clasificación con el modelo entrenado
var classified = image3.classify(trained);
// Crea la paleta de colores para pintar el mapa
// tantos colores como clases de  0 a n 
var paleta =['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#FF00FF','#6a3d9a','#ffff99','#b15928', "#ffff00", "#f879f8"];
Map.addLayer(classified, {min: 0, max: 13, palette: paleta}, 'clasificacion');              
//Map.addLayer(classified, {min:0 , max:3, palette: ['40d84c',   ' #fb2fff', '#2f35ff']}, 'Clasificacion');
print("clasificacion" , classified);
// Generación de matriz de confusión y resultados
/*var training_pred = training.classify(trained);
var errorMatrix_training = training_pred.errorMatrix('clase', 'classification');  
print('Matriz de Confusión Training:', errorMatrix_training);
print('Exactitud General Training:', errorMatrix_training.accuracy());
print('Indice Kappa Training:', errorMatrix_training.kappa());
print('Exactitudes de Usuario Training:', errorMatrix_training.consumersAccuracy());
print('Exactitudes de Productor Training:', errorMatrix_training.producersAccuracy());
*/
var validation = testing.classify(trained);
var errorMatrix = validation.errorMatrix('class', 'classification');
print('Matriz de Confusión:', errorMatrix);
print('Exactitud General:', errorMatrix.accuracy());
print('Indice Kappa:', errorMatrix.kappa());
print('Exactitudes de Usuario:', errorMatrix.consumersAccuracy());
print('Exactitudes de Productor:', errorMatrix.producersAccuracy());
var exportAccuracy = ee.Feature(null, {matrix: errorMatrix.array()})
// Export the FeatureCollection.
Export.table.toDrive({
  collection: ee.FeatureCollection(exportAccuracy),
  description: 'exportAccuracy',
  fileFormat: 'CSV'
});
/*//Definir imagen sobre la cual se quieren realizar los calculos de area
var imagen = classified;
//Definir region en caso de que el calculo se quiera hacer sobre una subregion de la imagen
var region = depto
var areaDict = ee.Image.pixelArea().divide(10000).addBands(imagen)
  .reduceRegion({
    reducer: ee.Reducer.sum().group(1),
    geometry: region.geometry(), //cambiar imagen por region en esta línea en caso de usar una subregion
    scale: 30,
  });
var areas = ee.List(areaDict.get('groups')).map(function(obj) { 
  return ee.Dictionary(obj).get('sum')})
var areas2 = areas.getInfo();
for (var loop = 0; loop < areas2.length; ++loop)
{var loop2 = loop + 1;
 var numero = ee.Number.parse(areas2[loop].toString()).format('%,.2f');
print( 'Clase ' + loop2 + ' = ' + numero.getInfo() + ' ha')}
*/
// Leyenda
var legend = ui.Panel({style: {position: 'bottom-right', padding: '8px 15px'}});
var loading = ui.Label('', {margin: '2px 0 4px 0'});
legend.add(loading);
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
legend.add(makeRow('a6cee3', 'avena'));
legend.add(makeRow('1f78b4', 'bc'));
legend.add(makeRow('b2df8a', 'bq'));
legend.add(makeRow('33a02c', 'cn'));
legend.add(makeRow('fb9a99', 'cebada'));
legend.add(makeRow('e31a1c', 'cnt'));
legend.add(makeRow('fdbf6f', 'rastrojos'));
legend.add(makeRow('ff7f00', 'pp'));
legend.add(makeRow('FF00FF', 'trigo'));
legend.add(makeRow('6a3d9a', 'agua'));
legend.add(makeRow('ffff99', 'bajo'));
legend.add(makeRow('b15928', 'monte'));
legend.add(makeRow('ffff00', 'alfa'));
legend.add(makeRow('f879f8', 'trigoreg'));
Map.add(legend);
// Exportar imagen de clasificación
Export.image.toDrive({
  image:classified,
  description: 'clasificacion',
  scale: 30,
  maxPixels: 1.0E13,
  region: zona
});