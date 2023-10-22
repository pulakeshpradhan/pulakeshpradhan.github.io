var table = ee.FeatureCollection("USDOS/LSIB/2013"),
    geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-66.37589876711235, -35.487260927622266],
          [-61.190351892112346, -35.45147072878029],
          [-61.366133142112346, -29.295712690256064],
          [-66.50773470461235, -29.257380534665142]]]),
    geometry2 = /* color: #ffc82d */ee.Geometry.Polygon(
        [[[-68.51056441808265, -24.57630828413791],
          [-68.42267379308265, -38.384045469072895],
          [-58.578923793082595, -38.52170319074437],
          [-58.578923793082595, -24.656211218687048],
          [-67.80743941808265, -24.656211218687048]]]),
    imageVisParam = {"opacity":1,"bands":["VV"],"palette":["071aff"]},
    imageVisParam2 = {"opacity":1,"bands":["VH"],"palette":["ffffff","ff220b"]},
    ndvi = {"opacity":1,"bands":["NDVI"],"min":0.22945092669280298,"max":0.6150542250813746,"palette":["310bff","07c5ff","09ff28","b7ff09","fff709"]},
    ndvi1 = {"opacity":1,"bands":["NDVI"],"palette":["ff1c05","ff930d","d9ff09","0bff83"]},
    cba = ee.FeatureCollection("users/diegopons06/vectores/limite_cba"),
    pedanias = ee.FeatureCollection("users/diegopons06/pedaniasTodas_Seba"),
    area_465 = ee.FeatureCollection("users/diegopons06/Areas-x-cuenca"),
    paleta_inundado = {"opacity":1,"bands":["cluster"],"min":0,"palette":["ffffff","ff4107"]};
//script para app de inundaciones en cordoba 2019
// leer vector area estudio
var geometry = table.filter(ee.Filter.eq('name', 'ARGENTINA'));
// polarizacion VV
var col1 =  ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filterBounds(geometry)
//rango de fechas
.filterDate('2018-10-01', '2019-05-01');
//polarizacion VH
var col2 =  ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filterBounds(geometry)
//rango de fechas
.filterDate('2018-10-01', '2019-05-01');
print (col2,'col2');
// cobertura de nubes máxima
//.filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than', 50)
// selecciono path principal
//.filter(ee.Filter.eq('WRS_PATH', 226))
//.filter(ee.Filter.eq('WRS_ROW', 84))
//.select(bandas);
//print (collectionS1);
var imS1=col1.select('VV').min()//.clip(geometry);//cambie los max por min
var imS2=col2.select('VH').min()//.clip(geometry);//cambie los max por min
//UMBRALES*****************************************************----------------------------------------------------------
var aguaVV=imS1.lt(-25).unmask(0);
print (aguaVV,'aguaVV');
var aguaVH=imS2.lt(-38);
print (aguaVH,'aguaVH');
//
//************************************************************************
// ver imagen en mapa:
Map.addLayer (imS1, {bands: ['VV'], min: [-13.205], max: [3.1698],
//palette: ['123f77','0f86b6','37cae5','f5db37','fbefcb']
}, "Sentinel1_VV",false );
/*Map.addLayer (imS2, {bands: ['VH'], min: [-20.205], max: [3.1698],
//palette: ['123f77','0f86b6','37cae5','f5db37','fbefcb']
}, "Sentinel1_VH",false );
Map.addLayer (aguaVV, {bands: ['VV'], min: [-23.205], max: [-14.1],
//palette: ['123f77','0f86b6','37cae5','f5db37','fbefcb']
}, "aguaVV",false );
Map.addLayer (aguaVH, {bands: ['VH'], min: [-23.205], max: [-14.1],
//palette: ['123f77','0f86b6','37cae5','f5db37','fbefcb']
}, "aguaVH",false );
//-----------------------------------------
//var aguaVV_segmento= aguaVV.clip(area_465);
*/
//sentinel 2-------------
// This example uses the Sentinel-2 QA band to cloud mask
// the collection.  The Sentinel-2 cloud flags are less
// selective, so the collection is also pre-filtered by the
// CLOUDY_PIXEL_PERCENTAGE flag, to use only relatively
// cloud-free granule.
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60')
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var collection = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2019-01-01', '2019-04-30')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .map(maskS2clouds)//.filterBounds(geometry)
var composite = collection.median()
//----------calculo de indices normalizados sentinel 2
//-----------ndvi
var QBs = function(image) {
var newImage = image.addBands(image.normalizedDifference(['B8', 'B4']).rename('NDVI'));
return (newImage);
};  
//La mapeo en toda la coleccion
var S2_ndvi = collection.map(QBs).select('NDVI').mean();
print (S2_ndvi,'S2_ndvi');
var ndvi = collection.map(QBs).select('NDVI');
//----------------------ndwi
var QBs1 = function(image) {
var newImage = image.addBands(image.normalizedDifference(['B8', 'B3']).rename('NDWI'));
return (newImage);
};  
//La mapeo en toda la coleccion
var S2_ndwi = collection.map(QBs1).select('NDWI').mean();
print (S2_ndwi,'S2_ndwi');
//var ndwi = collection.map(QBs1).select('NDWI');
// ndsi--- sentinel 2
var QBs2 = function(image) {
var newImage = image.addBands(image.normalizedDifference(['B11', 'B3']).rename('NDSI'));
return (newImage);
};  
//La mapeo en toda la coleccion
var S2_ndsi = collection.map(QBs2).select('NDSI').mean();
print (S2_ndsi,'S2_ndsi');
//var ndsi = collection.map(QBs2).select('NDSI');
//---------
var stack= aguaVV.addBands(S2_ndwi).addBands(S2_ndsi).addBands(S2_ndvi);//.addBands(aguaVH).
//var stack= stack.clip(area_465);
print (stack,'stack');
// clasificacion no supervisada---------------------------------------
// Construye el Dataset de entrenamiento
var training = stack.sample({
  region: cba,
  scale: 1000,
  numPixels: 5000,
  seed: 10,
});
//Define el metodo, nro de Clases, corre el algoritmo
var clusterer = ee.Clusterer.wekaKMeans(15).train(training);
// Obtiene las clases a partir del algoritmo 
var result = stack.cluster(clusterer);
print(stack, 'ClusterResultante');
// Muestra el Claster con colores aleatorios.
//Map.addLayer(result.randomVisualizer(), {}, 'clusters_clasificacion',false);
var agua= result.select('cluster').eq(3).unmask(0);
Export.image.toDrive({
  image: agua,
  description: 'agua_Sentinelcampana_2018_2019_VV_cba',
  scale: 10,
  region: cba,
  folder: 'Inundacion_2019',
  maxPixels: 1e13
});
//area con agua
var areaImage = agua.multiply(ee.Image.pixelArea());
// Calculate the area of loss pixels in Congo.
var stats = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: area_465,
  scale: 30,
  maxPixels: 1e9
});
print(stats,'stats');
print(
    'area con agua por poligono: ', stats.get('cluster'),
    ' square meters');
// Map the reducing function over the image collection.
var newTEOW = areaImage.reduceRegions(area_465, 'sum', 30)
var filenamePrefix = 'area_inundada';
var selectors = "ECO_NAME,ECO_ID,area_km2,AZE_ID,MapID,SiteNameFi,gain";
var taskParams = {
    'driveFolder' : '',
    'driveFileNamePrefix': filenamePrefix,
    'fileFormat' : 'CSV',
    'selectors' : selectors
  };
Export.table(newTEOW, filenamePrefix, taskParams);
/*
//Segmentacion sobre aguaVV//-----------------------------------
//(var seeds = ee.Algorithms.Image.Segmentation.seedGrid(100);
var snic = ee.Algorithms.Image.Segmentation.SNIC({
  image: stack, 
  size: 50,//para horticolas disminuir por debajo de 5 pixeles (es el grupo de pixeles que constituye la unidad para construir el segmento)
  compactness: 5,
  connectivity: 8,//para evitar diagonales a la hora de poligonizar
 neighborhoodSize:100//,
 //seeds:seeds
}).select('clusters')
print('Output snic',snic)
//Map.addLayer (seeds, {}, 'seeds');
var reprojected = snic.reproject('EPSG:4326', null, 10);//aca se evita que recalcule el segmento al cambiar el zoom. los mosaicos van a mantener el tamaño original
var clusters = reprojected.select("clusters");
var clusters = snic.select("clusters");
*/
//------------------------
//Map.addLayer(S2_ndwi, {}, 'S2_ndwi',false)
//Map.addLayer(S2_ndvi, ndvi1, 'S2_ndvi',false)
//Map.addLayer(S2_ndsi,{} , 'S2_ndsi',false)
// Display the results.
/*
Map.addLayer(ndxi, {bands: ['NDVI', 'NDWI','NDSI'], min: -1, max: 1}, 'ndxi sentinel 2  RGB')
//Map.addLayer(composite, {bands: ['B8', 'B4', 'B3'], min: 0, max: 0.3}, 'sentinel 2 infrarrojo RGB')
Map.addLayer(aguaVV.updateMask(aguaVV), imageVisParam, 'mascara_agua_VV');
//Map.addLayer(aguaVH.updateMask(aguaVH),imageVisParam2, 'mascara_agua_VH');
print(area_465,'area_465');
Map.addLayer(clusters.randomVisualizer(), {}, "clusters");
*/
Map.centerObject(area_465,8);
Map.addLayer(composite, {bands: ['B11', 'B8', 'B2'], min: 0, max: 0.3}, 'sentinel 2 agricultura RGB')
Map.addLayer(aguaVV.updateMask(aguaVV), imageVisParam, 'mascara_agua_VV');
Map.addLayer(area_465, {}, 'area_465');
//Map.addLayer(agua, {}, 'agua_clasificacion');
// Display as default and with a custom color.
//Map.addLayer(pedanias, {}, 'pedanias');
//Map.addLayer(pedanias, {color: 'FF0000'}, 'pedanias');
Export.image.toDrive({
  image: aguaVV,
  description: 'agua_Sentinel_1_enero_2019_VV_cba',
  scale: 10,
  region: cba,
  folder: 'Inundacion_2019',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: aguaVH,
  description: 'agua_Sentinel_1_enero_2019_VH_cba',
  scale: 10,
  region: cba,
  folder: 'Inundacion_2019',
  maxPixels: 1e13
});
//exportacion de indices cba
Export.image.toDrive({
  image: S2_ndwi,
  description: 'NDWI_Sentinel_2_enero_27_2019_cba',
  scale: 10,
  region: cba,
  folder: 'Inundacion_2019',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: S2_ndvi,
  description: 'NDVI_Sentinel_2_enero_27_2019_cba',
  scale: 10,
  region: cba,
  folder: 'Inundacion_2019',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: S2_ndsi,
  description: 'NDSI_Sentinel_2_enero_27_2019_cba',
  scale: 10,
  region: cba,
  folder: 'Inundacion_2019',
  maxPixels: 1e13
});
//-------------
Export.image.toDrive({
  image: imS1,
  description: 'Mosaico_Sentinel_1_enero_2019_VV',
  scale: 10,
  region: geometry,
  folder: 'Inundacion_2019',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: imS2,
  description: 'Mosaico_Sentinel_1_enero_2019_VH',
  scale: 10,
  region: geometry,
  folder: 'Inundacion_2019',
  maxPixels: 1e13
});
Export.image.toDrive({
  image: imS2,
  description: 'Mosaico_Sentinel_2_enero_2019_VH',
  scale: 10,
  region: cba,
  folder: 'Inundacion_2019',
  maxPixels: 1e13
});
/*Export.ImageCollection.toDrive({
  image: ndxi,
  description: 'NDXI_Sentinel_2_enero_27_2019_cba',
  scale: 10,
  region: cba,
  folder: 'Inundacion_2019',
  maxPixels: 1e13
});
*/
// ocurrencia de agua 
//////////////////////////////////////////////////////////////
// Asset List
//////////////////////////////////////////////////////////////
var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
var occurrence = gsw.select('occurrence');
//////////////////////////////////////////////////////////////
// Constants
//////////////////////////////////////////////////////////////
/*
var VIS_OCCURRENCE = {
  min:0,
  max:100,
  palette: ['red', 'blue']
};
var VIS_WATER_MASK = {
  palette: ['white', 'black']
};
//////////////////////////////////////////////////////////////
// Calculations
//////////////////////////////////////////////////////////////
// Create a water mask layer, and set the image mask so that non-water areas
// are opaque.
var water_mask = occurrence.gt(90).unmask(0);
//////////////////////////////////////////////////////////////
// Initialize Map Location
//////////////////////////////////////////////////////////////
// Uncomment one of the following statements to center the map.
// Map.setCenter(-90.162, 29.8597, 10);   // New Orleans, USA
// Map.setCenter(-114.9774, 31.9254, 10); // Mouth of the Colorado River, Mexico
// Map.setCenter(-111.1871, 37.0963, 11); // Lake Powell, USA
// Map.setCenter(149.412, -35.0789, 11);  // Lake George, Australia
// Map.setCenter(105.26, 11.2134, 9);     // Mekong River Basin, SouthEast Asia
// Map.setCenter(90.6743, 22.7382, 10);   // Meghna River, Bangladesh
// Map.setCenter(81.2714, 16.5079, 11);   // Godavari River Basin Irrigation Project, India
// Map.setCenter(14.7035, 52.0985, 12);   // River Oder, Germany & Poland
// Map.setCenter(-59.1696, -33.8111, 9);  // Buenos Aires, Argentina
//Map.setCenter(-74.4557, -8.4289, 11);  // Ucayali River, Peru
//////////////////////////////////////////////////////////////
// Map Layers
//////////////////////////////////////////////////////////////
//Map.addLayer({
  eeObject: water_mask,
  visParams: VIS_WATER_MASK,
  name: '90% occurrence water mask',
  shown: false
});
/*Map.addLayer({
  eeObject: occurrence.updateMask(occurrence.divide(100)),
  name: "Water Occurrence (1984-2015)",
  visParams: VIS_OCCURRENCE
});
var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
var occurrence = gsw.select('occurrence');
Map.addLayer(occurrence);
Map.addLayer({eeObject: occurrence, name: 'Water Occurrence (1984-2015)'});
Map.addLayer({
  eeObject: water_mask,
  visParams: VIS_WATER_MASK,
  name: '90% occurrence water mask'
});
Export.image.toDrive({
  image: water_mask,
  description: 'water_mask-ocurrencia90__1985_2015',
  scale: 10,
  region: cba,
  folder: 'Inundacion_2019',
  maxPixels: 1e13
});
var inundado= agua.subtract(water_mask);
print (inundado);
Map.addLayer(inundado,paleta_inundado,'inundado');
Export.image.toDrive({
  image: inundado,
  description: 'inundado_filtrado',
  scale: 10,
  region: cba,
  folder: 'Inundacion_2019',
  maxPixels: 1e13
});
*/