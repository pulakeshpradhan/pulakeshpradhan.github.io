//Para comprobar con calculo manual
/*var Punto = ee.Geometry.Point(-58.79289,	-31.86947);
Map.addLayer(Punto);*/ 
//Shape area de estudio 
var areaEst = ee.FeatureCollection("users/mabrigo/clara-dutra").geometry(500);
Map.addLayer(areaEst);
//Importa la coleccion de imagenes MODIS, se define el subset temporal con una fecha 
var SerieHist = ee.ImageCollection('MODIS/006/MOD13Q1')
  .filterDate('2000-01-01', '2019-12-31');
print('Serie Historica', SerieHist)
var NDVI = SerieHist.select(['NDVI']);
//print('NDVI', NDVI)
var Q = SerieHist.select(['DetailedQA']);
//-------------------------------QUALITY FILTER--------------------------------------//
var MaskCalidad = function(x){
  var Q = x.select(['DetailedQA'])
  var sombra = Q.bitwiseAnd(ee.Image.constant(32768))
  var nieve = Q.bitwiseAnd(ee.Image.constant(16384))
  var nube = Q.bitwiseAnd(ee.Image.constant(1024))
  var aerosol = Q.bitwiseAnd(ee.Image.constant(192))
  var filtro = sombra.add(nieve).add(nube).add(aerosol) 
  return filtro.lte(64)
}
var NDVImasked = SerieHist.map(function(img){
  var mask = MaskCalidad(img)
  var NDVI = img.select(['NDVI']).multiply(0.0001)
  var masked = NDVI.updateMask(mask)
  return masked.copyProperties(img, ['system:time_start', 'system:time_end'])
})
print('NDVImasked',NDVImasked)
//Map.addLayer(ee.Image(NDVImasked.first()), {min:0, max:1}, 'NDVImasked')
//--------------INTERPOLATION FUNCTION--------------------------
/** 
 * pkg_smooth example
 * 
 * Dongdong Kong, 1 Aug, 2018
 * Sun Yat-sen Univ
 */
var pkg_smooth = require('users/kongdd/public:Math/pkg_smooth.js');
//var pkg_vis    = require('users/kongdd/public:pkg_vis.js');
var imgcol = NDVImasked
// frame-day window before and after the current point is used to 
// seach the nearenearest valid good values. Then used the, 
// nearest valid good values to linear linterpolation.
var frame  = 16*3; 
var nodata = -9999; // missing values. It's crucial. Has to been given.
// two bands return: [band, qc];
// qc: 1 means linear interpolation; 0 means not;
var imgcol_sm = pkg_smooth.linearInterp(imgcol, frame, nodata);
// visualization
//var vis_vi = {min: 0, max: 0.6, bands:"NDVI", palette:pkg_vis.colors.RdYlGn[11]};
//var lg_vi  = pkg_vis.grad_legend(vis_vi  , 'NDVI', true); 
print(imgcol_sm);
//Map.addLayer(imgcol, vis_vi, 'original imgcol');
//Map.addLayer(imgcol_sm.select(['NDVI']), vis_vi,  'smoothed imgcol');
//-FUNCTION GENERATE AN IMAGE COLLECTION WITH 23 IMAGES OF HISTORIC MEAN AND STANDARD DEVIATION---------
//-------------------- Funciones para calculas el promedio y DS del año medio (23 fechas)-------
print(imgcol_sm.first())
//var years = ee.List.sequence(1, 18, 1)
var months = ee.List.sequence(1,365,16)
print(months)
var monthAverage = months.map(function(j) {
  return imgcol_sm.select('NDVI')
      .filter(ee.Filter.calendarRange(j, ee.Number(j).add(1), 'day_of_year'))
      .reduce(ee.Reducer.mean().combine(ee.Reducer.stdDev(), null, true))
      .rename('NDVI', 'NDVI_stdDev')
})
var Historico = ee.ImageCollection.fromImages(monthAverage)
print(Historico)
//-------------NDVI anomalies-------------------------
//-------------------Anomalías-------------------------
//print('Pormedio Historico', PromedioHistorico)
// IMAGEN MODIS CORRESPONDIENTE A LA FECHA ACTUAL
var NDVIact = ee.ImageCollection('MODIS/006/MOD13Q1').filterDate('2019-07-28', '2019-08-12');
// FILTRO DE CALIDAD PARA LA FECHA ACTUAL
var NDVIact_masked = NDVIact.map(function(img){
  var mask = MaskCalidad(img)
  var NDVI = img.select(['NDVI']).multiply(0.0001)
  var masked = NDVI.updateMask(mask)
  return masked.copyProperties(img, ['system:time_start', 'system:time_end'])
})
//print('NDVIact_masked', NDVIact_masked)
var NDVIact_masked = ee.Image(NDVIact_masked.first())
print('NDVIact_masked', NDVIact_masked)
// PROMEDIO Y DS HISTORICO PARA LA FECHA ACTUAL
var Historico_Factual = ee.Image(Historico.filterMetadata('system:index','equals','13').first())
print('Historico_Factual', Historico_Factual)
// CALCULO DE ANOMALIA
// CALCULO DE ANOMALIA
var anomalia = (NDVIact_masked.subtract(Historico_Factual.select(['NDVI']))).divide(Historico_Factual.select(['NDVI_stdDev']))
var r1 = -1.64 
var r2 = -0.52
var r3 = 0.52
var r4 = 1.64
var anomaliaCAT = anomalia.where(anomalia.lte(r1), 1)
anomaliaCAT = anomaliaCAT.where(anomalia.gt(r1).and(anomalia.lte(r2)),2) 
anomaliaCAT = anomaliaCAT.where(anomalia.gt(r2).and(anomalia.lte(r3)), 3)
anomaliaCAT = anomaliaCAT.where(anomalia.gt(r3).and(anomalia.lte(r4)), 4)
anomaliaCAT = anomaliaCAT.where(anomalia.gt(r4), 5) 
var anomalia_CAT_clip = anomaliaCAT.clip(areaEst)
print('anomalia_CAT_clip', anomalia_CAT_clip)
//Map.addLayer(Historico_Factual, null, 'Historico_Factual')
//Map.addLayer(NDVIact_masked, null, 'NDVIact_masked')
var vizParams = { min: 1, max:5,'palette':"FF0000, FFFF00, 0059B7, 00FF00, 004400"}
//Map.addLayer(anomalia, vizParams, 'anomalia')
Map.addLayer(anomalia_CAT_clip, vizParams, 'anomalia_CAT_clip')
Map.centerObject(areaEst)
//Export.image.toDrive({image:anomalia_CAT_clip, description:'anomalia_CAT_clip',folder:'Salida GEE',crs:'EPSG:4326', maxPixels: 1e13, scale:231.656358264, skipEmptyTiles:true});
// Export the image, specifying scale and region.
Export.image.toDrive({
  image: anomalia_CAT_clip,
  description: 'anomalia_CAT_clip',
  scale: 231.656358264,
  maxPixels: 1e13,
  crs:'EPSG:4326',
  skipEmptyTiles:true,
  region: geometry
});