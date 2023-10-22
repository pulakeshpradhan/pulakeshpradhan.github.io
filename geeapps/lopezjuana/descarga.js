var BajoGrande = /* color: #00ffff */ee.Geometry.Polygon(
        [[[-64.11380326106121, -27.413998990601982],
          [-64.11380326106121, -27.616179685137336],
          [-63.79245316340496, -27.614962842679834],
          [-63.79382645442058, -27.413998990601982],
          [-63.79657303645183, -27.378640176386916],
          [-64.11105667902996, -27.37620122068086]]]),
    LaMaria = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-64.42026759194687, -28.058758412531322],
          [-64.21942379197742, -28.057243549216214],
          [-64.21942379195974, -27.981776368614522],
          [-64.42164088290502, -27.981169992444816]]]),
    colonia_simbolar = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-63.949797283985106, -27.805111985280327],
          [-63.71153129277417, -27.80693406493577],
          [-63.71015800175854, -27.676882470900008],
          [-63.958037030078856, -27.67262582595217]]]),
    inundacion = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-63.189949530765034, -29.131228572449988],
          [-61.717781562015034, -29.11203351161293],
          [-61.646370429202534, -28.108990163241888],
          [-63.102058905765034, -28.09445339376741]]]),
    Santiago = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-65.48050105492706, -30.70688012581341],
          [-61.63528621117706, -30.744656507207367],
          [-61.56936824242706, -25.555314628856376],
          [-65.37063777367706, -25.555314628856376]]]),
    table = ee.FeatureCollection("users/lopezjuana/lotes_demost"),
    cebolla1 = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-63.978380543493074, -27.850295777550784],
          [-63.967394215368074, -27.966798612590722],
          [-63.615831715368074, -28.197006388019435],
          [-63.574632984899324, -28.066211967129455]]]),
    laramada = ee.FeatureCollection("users/lopezjuana/area_recorte"),
    Machajuay = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-63.425082218783245, -27.545100057410203],
          [-63.34749127640043, -27.545708867968326],
          [-63.342684757845745, -27.453130970977778],
          [-63.42645550979887, -27.452521648135242]]]),
    LaRamada = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-63.78928502620175, -27.44066853901525],
          [-63.78688176692441, -27.511639622233243],
          [-63.61110051692441, -27.511335123021215],
          [-63.61110051692441, -27.442192003497606],
          [-63.78516515315488, -27.44097323359448]]]),
    Esdra = 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-63.39999881287986, -27.48898107452772],
          [-63.39999881287986, -27.4916554725815],
          [-63.394312529768285, -27.4916554725815],
          [-63.394312529768285, -27.48898107452772]]], null, false);
var start = ee.Date('2019-02-28');
var finish = ee.Date('2019-03-20');
//var geometry = ee.FeatureCollection('users/lopezjuana/area_ColoniaDora');
var geometry = ee.FeatureCollection(Machajuay);
Map.addLayer(geometry)
//var geometry = Santiago;
// 2. Seleccionar colecciones
//    Seleccionar producto
// ------------------------------
// Indicar el ImageCollection ID
var producto = ee.ImageCollection('COPERNICUS/S2');
// Filtrar colección
var producto_filtrado = producto
    // Por área de estudio. Debe estar cargada el área
    // en este caso en la variable “geometry”
    .filterBounds(geometry)
    //por rango de fechas
    .filterDate(start, finish)
    // por cobertura de nubes máxima – Sentinel 2
    .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than', 60);
print("Producto filtrado", producto_filtrado);
var image = ee.Image(producto_filtrado.mosaic());
var image = ee.Image('COPERNICUS/S2/20190301T141041_20190301T141747_T20JMQ');
Map.addLayer( image, {bands: ['B8', 'B11', 'B4'], min: [0,0,0], max:[10000,10000,10000] } , "S2 B8-B11-B4" );
var bandas = ['B2','B3','B4','B8','B11'];
var image_band = image.select(bandas).uint16();
var stack1= image_band.clip(geometry);
Map.addLayer( stack1, {bands: ['B4', 'B3', 'B2'], min: [0,0,0], max:[10000,10000,10000] } , "S2 B4-B3-B2" );
//var ndvi_img = stack1.normalizedDifference(['B8', 'B4']).select(['nd'],[nombre]).multiply(10000).uint16();
/*
var image = ee.Image('COPERNICUS/S2/20180907T141039_20180907T141037_T20JMS');
var bandas = ['B8','B11','B4'];
var image = image.select(bandas);
var image= image.clip(area_interes);
Map.addLayer( image, {bands: ['B8', 'B11', 'B4'], min: [0,0,0], max:[10000,10000,10000] } , "S2 B8-B11-B4" );
// Bandas disponibles
// B1	Aerosols	443nm	60m
// B2	Blue	490nm	10m
// B3	Green	560nm	10m
// B4	Red	665nm	10m
// B5	Red Edge 1	705nm	20m
// B6	Red Edge 2	740nm	20m
// B7	Red Edge 3	783nm	20m
// B8	NIR	842nm	10m
// B8a	Red Edge 4	865nm	20m
// B9	Water vapor	940nm	60m
// B10	Cirrus	1375nm	60m
// B11	SWIR 1	1610nm	20m
// B12	SWIR 2	2190nm	20m
// Definir bandas a seleccionar
var bandas = ['B8','B11','B4'];
var mosaic_colec = mosaic_colec.select(bandas);
print("mosaico", mosaic_colec);
var mosaic_colec_med = mosaic_colec.median().uint16();
var stack1= mosaic_colec_med.clip(LaMaria);
Map.addLayer( stack1, {bands: ['B8', 'B11', 'B4'], min: [0,0,0], max:[10000,10000,10000] } , "S2 B8-B11-B4" );
//Exportar imagen
*/
Export.image.toDrive({
  image:stack1,
  description: 'Machajuay_01_03_2019_B234811',
  folder: 'Descargas',
  scale: 10,
  region: Machajuay
});
/*
print('coleccion de mosaicos', stack1);
Map.addLayer( stack1, {bands: ['B8', 'B11', 'B4'], min: [0,0,0], max:[10000,10000,10000] } , "S2 B8-B4-B3" );
/*
var mosaic_colec_med = mosaic_colec.median();
//print("Mosaico media", mosaic_colec_med);
var colection_ndvi = mosaic_colec.map(function(img){
    return img.normalizedDifference(['B8', 'B4'])//.select(['nd'],[nombre]).multiply(10000).uint16();
});
print("Coleccion NDVI seleccionada", colection_ndvi);
//recortar la imagen
// Create a funtion to clip each image to the feature collection
var recorteLotes = function(image) {
  return image.clipToCollection(lotes);
};
//////
// Map the clip funtion over the Image Collection 
//var stack1= mosaic_colec.clipToCollection(lotes);
;
print ("Mosaico med recorte", stack1);
Map.addLayer( stack1, {bands: ['B8', 'B4', 'B3'], min: [0,0,0], max:[10000,10000,10000] } , "S2 B8-B4-B3" );
// Update the composite mask with the mask.
var maskstack1 = stack1.updateMask(mascara);
Map.addLayer(maskstack1, {bands: ['B8', 'B4', 'B3'], min: [0,0,0], max:[10000,10000,10000] } , "S2masc B8-B4-B3" );
// Configuramos el algoritmo wekaXMeans
var TOTALK = 25; // Máxima cantidad de clusters
var clasificadorNoSup = ee.Clusterer.wekaXMeans(
  {minClusters: 2,  // Mínima cantidad de clusters
   maxClusters: TOTALK, 
   maxIterations: 100, 
   distanceFunction: "Euclidean", 
   seed: 123});
// Seleccionamos los pixeles para correr el agrupamiento
var datos_km = maskstack1.sample({
    region: lotes,
    scale: 20,
    numPixels: 5000,
    seed: 10
  });   
// Entreno con las muestras
clasificadorNoSup = clasificadorNoSup.train(datos_km);
var clusters = maskstack1.cluster(clasificadorNoSup);
var paleta = 'd73027,f46d43,fdae61,fee08b,ffffbf,d9ef8b,a6d96a,66bd63,1a9850';
Map.addLayer(clusters,{'palette':paleta},'clusters') 
//5. Exportar imagen de clasificación
Export.image.toDrive({
  image:clusters,
  description: 'cluster_verano_18_9_mar',
  scale: 20,
  region: area_estudio1
});
Export.image.toDrive({
  image:stack1,
  description: 'mosaico_sent_verano_mar18',
  scale: 20,
  region: area_estudio1
});
*/