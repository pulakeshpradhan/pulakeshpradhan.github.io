var lote = ee.FeatureCollection("users/ftentor/campo_marro_sur");
// Define geometría
//Define fechas
var fecha_1 = '2018-03-01';
var fecha_2 = '2018-03-21';
var fecha1 = ee.Date(fecha_1);
var fecha2 = ee.Date(fecha_2)
//Define coleccion
var imageCollection = ee.ImageCollection("COPERNICUS/S2")
    .filterBounds(lote);
// obtiene image
var img_fecha1 = ee.Image(imageCollection.filterDate(fecha1,fecha1.advance(1,'day')).mosaic().copyProperties(imageCollection.filterDate(fecha1,fecha1.advance(1,'day')).first()));
var img_fecha2 = ee.Image(imageCollection.filterDate(fecha2,fecha2.advance(1,'day')).mosaic().copyProperties(imageCollection.filterDate(fecha2,fecha2.advance(1,'day')).first()));
// Mascara de nubes y sombra
function sentinelCloudScore(toa) {
  var score = toa.select('B2').multiply(toa.select('B9')).multiply(1e4);
  var cloudScoreThreshold = 450;
  var cloud = score.gt(cloudScoreThreshold);
  return cloud;
}
function shadowMask(toa,cloud){
  var azi = ee.Number(toa.get('solar_azimuth'));
  var zen = ee.Number(toa.get('solar_zenith')).multiply(1.6);
  var azimuth =azi.multiply(Math.PI).divide(180.0).add(ee.Number(0.5).multiply(Math.PI));
  var zenith  =ee.Number(0.5).multiply(Math.PI ).subtract(zen.multiply(Math.PI).divide(180.0));
  var nominalScale = cloud.projection().nominalScale();
  var cloudHeights = ee.List.sequence(200,5000,500);
  function cloudH (cloudHeight){
    cloudHeight = ee.Number(cloudHeight);
    var shadowVector = zenith.tan().multiply(cloudHeight);
    var x = azimuth.cos().multiply(shadowVector).divide(nominalScale).round();
    var y = azimuth.sin().multiply(shadowVector).divide(nominalScale).round();
    return cloud.changeProj(cloud.projection(), cloud.projection().translate(x, y));
  }
  var shadows = cloudHeights.map(cloudH);
  var potentialShadow = ee.ImageCollection.fromImages(shadows).max();
  var potentialShadow1 = potentialShadow.and(cloud.not());
  var darkPixels = toa.select(['B8','B11','B12']).reduce(ee.Reducer.sum()).multiply(1e3).lt(250).rename(['dark_pixels']);
  var shadow = potentialShadow1.and(darkPixels).rename('shadows');
  return shadow;
}
function sentinel2toa(img) {
  var toa = img//.select(['B4','B8','B2','B9','B11','B12'])  
     .divide(10000)
     .set('solar_azimuth',img.get('MEAN_SOLAR_AZIMUTH_ANGLE'))
     .set('solar_zenith', img.get('MEAN_SOLAR_ZENITH_ANGLE'));
  return toa;
}
function cloud_and_shadow_mask(img) {
  var toa = sentinel2toa(img);
  var cloud = sentinelCloudScore(toa);
  var shadow = shadowMask(toa,cloud);
  var mask = cloud.or(shadow).fastDistanceTransform(75, 'pixels').gt(75);
  return toa.updateMask(mask);
}
var fecha1_cloudless = cloud_and_shadow_mask(img_fecha1)
var fecha2_cloudless = cloud_and_shadow_mask(img_fecha2)
// NDVI
var ndvi1 = fecha1_cloudless.normalizedDifference(['B8','B4']).rename('ndvi1')//.clip(lote);
var ndvi2 = fecha2_cloudless.normalizedDifference(['B8','B4']).rename('ndvi2')//.clip(lote);
// Obtiene la tasa
var dif_days = fecha2.difference(fecha1,'day')
var tasa = (ndvi2.subtract(ndvi1)).divide(dif_days).rename('tasa')//.clip(lote)
// resclass para la visualización
var tasa_res = tasa
                    .where(tasa.lt(-0.03),  -0.03 )
                    .where(tasa.gte(-0.03).and(tasa.lt(-0.025)), -0.025)
                    .where(tasa.gte(-0.025).and(tasa.lt(-0.02)), -0.02)
                    .where(tasa.gte(-0.02).and(tasa.lt(-0.015)), -0.015)
                    .where(tasa.gte(-0.015).and(tasa.lt(-0.01)), -0.01)
                    .where(tasa.gte(-0.01).and(tasa.lt(-0.005)), -0.005)
                    .where(tasa.gte(-0.005).and(tasa.lt(0.005)), 0)
                    .where(tasa.gte(0.005).and(tasa.lt(0.01)), 0.005)
                    .where(tasa.gte(0.01).and(tasa.lt(0.015)), 0.01)
                    .where(tasa.gte(0.015).and(tasa.lt(0.02)), 0.015)
                    .where(tasa.gte(0.02).and(tasa.lte(0.025)), 0.02)
                    .where(tasa.gte(0.025).and(tasa.lte(0.03)), 0.025)
                    .where(tasa.gt(0.03), 0.03);
// parámetros de visualización
var vis_ndvi = {min: 0, max: 1, palette: ['000000','FFFEFF','C4BAA4','B4966C','A4824C','94723C','7C9E2C','94B614','74AA04'
,'64A204','549604','3C8604','1C7204','045E04','044204','043A04','042604','041204']
  };
//var vis_tasa = {min: -0.03, max: 0.03, palette: ['b2182b','ef8a62','fddbc7','f7f7f7','d1e5f0',
//                '67a9cf','2166ac']};
var vis_tasa = {min: -0.03, max: 0.03, palette: ['b2182b','d05146','ef8a62','F6B294','fddbc7',
                  'FAE9DF','f7f7f7','E4EEF3','d1e5f0','9CC7DF','67a9cf','4487BD','2166ac']};
// genera thumbnail
//var thumb_path_tasa = tasa_res.visualize(vis_tasa).reproject({crs:'EPSG:3857',scale:10}).getThumbURL({dimensions:500,region:ee.Feature(lote).geometry().toGeoJSON()})
//print (thumb_path_tasa,'tasa de cambio')
//var thumb_path_fecha1 = ndvi1.visualize(vis_ndvi).reproject({crs:'EPSG:3857',scale:10}).getThumbURL({dimensions:500,region:lote.geometry().toGeoJSON().getInfo()})
//print (thumb_path_fecha1,'fecha 1')
//var thumb_path_fecha2 = ndvi2.visualize(vis_ndvi).reproject({crs:'EPSG:3857',scale:10}).getThumbURL({dimensions:500,region:lote.geometry().toGeoJSON().getInfo()})
//print (thumb_path_fecha2,'fecha 2')
/* Exporta a Drive
Export.image.toDrive({
  image : tasa,
  description : 'tasa_crecimiento_'+fecha_1+'_vs_'+fecha_2,
  folder : 'Carpeta_TIFS',
  fileNamePrefix : 'tasa_crecimiento_'+fecha_1+'_vs_'+fecha_2,
  region: lote,
  scale:10,
})
*/
// Mapas
Map.addLayer(ndvi1,vis_ndvi,'NDVI fecha 2018-03-01 ',false);
Map.addLayer(ndvi2,vis_ndvi, 'NDVI fecha 2018-03-21',false);
Map.addLayer(tasa,vis_tasa,'tasa de crecimiento',true);
//Map.addLayer(tasa_res,vis_tasa,'tasa con reclass',true);
Map.addLayer(lote,{},'Lotes',true);
Map.centerObject(lote,14);
var pkg_vis  = require('users/kongdd/public:pkg_vis.js');
var lg_vi    = pkg_vis.grad_legend(vis_tasa  , 'Tasa', false)
pkg_vis.add_lgds([lg_vi]);
// Area calculation
var areaDict = ee.Image.pixelArea().divide(10000).addBands(tasa_res) // has !
  .reduceRegion({
    reducer: ee.Reducer.sum().group(1),
    geometry: lote, 
    scale: 10,
    maxPixels: 1e10
  });
var areas = ee.List(areaDict.get('groups')).map(function(obj) { 
  return ee.Number(ee.Dictionary(obj).get('sum')).format('%.2f')
})
var group = ee.List(areaDict.get('groups')).map(function(obj) { 
  return ee.String(ee.Dictionary(obj).get('group'))
})
var Dict = ee.Dictionary.fromLists(group,areas)
print('área por clase (has)',Dict)
var feat = ee.List(areaDict.get('groups')).map(function (obj){
            var area = ee.Number(ee.Dictionary(obj).get('sum')).format('%.2f')
            var clase = ee.String(ee.Dictionary(obj).get('group'))
          return ee.Feature(lote,{'clase':clase,'area':area})
});
var path = ee.FeatureCollection(feat).getDownloadURL('csv',['clase','area_has'])
print ('path to csv',path)