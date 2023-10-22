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
    pedanias = ee.FeatureCollection("users/diegopons06/pedaniasTodas_Seba");
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
.filterDate('2019-03-25', '2019-04-01');
//polarizacion VH
var col2 =  ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filterBounds(geometry)
//rango de fechas
.filterDate('2019-03-25', '2019-04-01');
print (col2,'col2');
// cobertura de nubes máxima
//.filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than', 50)
// selecciono path principal
//.filter(ee.Filter.eq('WRS_PATH', 226))
//.filter(ee.Filter.eq('WRS_ROW', 84))
//.select(bandas);
//print (collectionS1);
var imS1=col1.select('VV').min().clip(geometry);//cambie los max por min
var imS2=col2.select('VH').min().clip(geometry);//cambie los max por min
//UMBRALES*****************************************************----------------------------------------------------------
var aguaVV=imS1.lt(-13);
print (aguaVV,'aguaVV');
var aguaVH=imS2.lt(-19);
print (aguaVH,'aguaVH');
/*
//************************************************************************
// ver imagen en mapa:
Map.addLayer (imS1, {bands: ['VV'], min: [-13.205], max: [3.1698],
//palette: ['123f77','0f86b6','37cae5','f5db37','fbefcb']
}, "Sentinel1_VV" );
Map.addLayer (imS2, {bands: ['VH'], min: [-20.205], max: [3.1698],
//palette: ['123f77','0f86b6','37cae5','f5db37','fbefcb']
}, "Sentinel1_VH" );
Map.addLayer (aguaVV, {bands: ['VV'], min: [-23.205], max: [-14.1],
//palette: ['123f77','0f86b6','37cae5','f5db37','fbefcb']
}, "aguaVV" );
Map.addLayer (aguaVH, {bands: ['VH'], min: [-23.205], max: [-14.1],
//palette: ['123f77','0f86b6','37cae5','f5db37','fbefcb']
}, "aguaVH" );
//-----------------------------------------
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
    .filterDate('2019-03-20', '2019-04-31')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .map(maskS2clouds).filterBounds(geometry)
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
var ndsi = collection.map(QBs2).select('NDSI');
//-----merge de indices
//var ndxi = ndvi.merge(ndwi).merge(ndsi);
// Create a collection with fromImages().
var ndxi = ee.ImageCollection(
  [S2_ndvi,S2_ndwi, S2_ndsi]);
print (ndxi,'ndxi');  
//------------------------
Map.addLayer(S2_ndwi, {}, 'S2_ndwi')
Map.addLayer(S2_ndvi, ndvi1, 'S2_ndvi')
Map.addLayer(S2_ndsi,{} , 'S2_ndsi')
// Display the results.
Map.addLayer(composite, {bands: ['B11', 'B8', 'B2'], min: 0, max: 0.3}, 'sentinel 2 agricultura RGB')
//Map.addLayer(ndxi, {bands: ['NDVI', 'NDWI','NDSI'], min: -1, max: 1}, 'ndxi sentinel 2  RGB')
//Map.addLayer(composite, {bands: ['B8', 'B4', 'B3'], min: 0, max: 0.3}, 'sentinel 2 infrarrojo RGB')
Map.addLayer(aguaVV.updateMask(aguaVV), imageVisParam, 'mascara_agua_VV');
Map.addLayer(aguaVH.updateMask(aguaVH),imageVisParam2, 'mascara_agua_VH');
Map.centerObject(geometry2,8);
// Display as default and with a custom color.
//Map.addLayer(pedanias, {}, 'pedanias');
//Map.addLayer(pedanias, {color: 'FF0000'}, 'pedanias');
/*
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
/*
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
*/
/*Export.ImageCollection.toDrive({
  image: ndxi,
  description: 'NDXI_Sentinel_2_enero_27_2019_cba',
  scale: 10,
  region: cba,
  folder: 'Inundacion_2019',
  maxPixels: 1e13
});
*/