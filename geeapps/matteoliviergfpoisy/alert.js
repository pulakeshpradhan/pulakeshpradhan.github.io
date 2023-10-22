var AllVal = ee.FeatureCollection("users/patawaitte/polygone_validation_all_onlySabah_"),
    geometry = /* color: #d63000 */ee.Geometry.MultiPoint(
        [[116.50111539569411, 5.3737884967397305],
         [116.56372409328424, 5.439184848850731],
         [118.21267693441723, 5.824367862835285],
         [118.21164696615551, 5.825307125644797],
         [118.22246163290356, 5.816426759969354],
         [118.22177498739575, 5.814206646634626],
         [118.22100251119946, 5.810620291206412],
         [118.21233361166333, 5.851899241553188],
         [118.22460740011547, 5.873159304483355],
         [118.22271912496899, 5.865475037879337],
         [118.21817009847973, 5.877172157138082],
         [118.22589486044262, 5.879050503760754],
         [118.2031686418627, 5.790189554556596],
         [118.20218158894522, 5.7883963033292485],
         [118.2168829874667, 5.845659268369648],
         [118.21241979166592, 5.824056609636828],
         [118.22441572911885, 5.870478914351291],
         [118.09140042481124, 5.85356781533247],
         [118.18956391263794, 5.774326581670225],
         [118.09931107911694, 5.847464630903671],
         [115.59238543755498, 5.154772639183555],
         [116.79125201357402, 5.237129037391086]]),
    imageVisParam = {"opacity":1,"bands":["constant"],"gamma":1};
///Get modules
var L8_process = require('users/patawaitte/AlerteSystem:Modules/L8Process_flou')
var S2_process = require('users/patawaitte/AlerteSystem:Modules/S2Process_flou')
var S1_process = require('users/patawaitte/AlerteSystem:Modules/S1Process_flou')
var Dates = require('users/patawaitte/AlerteSystem:Deforestation/Dates')
// Get study area from module
var StudyArea = Dates.StudyArea
Map.addLayer(StudyArea, {}, 'StudyArea')
/*
var pt=AllVal.filter(ee.Filter.eq('Type', 2))
Map.addLayer(pt)
print(pt)
*/
//////////DATES///////////////////////////////////////////////////////////
/////Dates T2 - images analysed
var stopD = Dates.stopD
var startD = Dates.startD
////Dates forest reference
var startDateRef = startD.advance(-1, 'year').advance(-3, 'month')
var stopDateRef = startDateRef.advance(1, 'year')
//////////////IMAGE_Collection to analysed/////////////////  
//////
/////Get module to avoid duplicate date imagery from Gena
var assets = require('users/gena/packages:assets')
var reducer = ee.Reducer.median()
////L8 analysed
var L8_t2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA')
  .filterBounds(StudyArea)
  .filterDate(startD, stopD)
L8_t2 = assets.mosaicByDate(L8_t2, reducer)  
//////S2 analysed
var S2_t2 = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(StudyArea)
  .filterDate(startD, stopD)
S2_t2 = assets.mosaicByDate(S2_t2, reducer)  
var S2_t2 = S2_t2.map(function(image) {
    var date = image.get('system:time_start')
    return image.divide(10000).set({'system:time_start':date})
    });
//////////////FOREST_REFERENCE_IMAGECOLLECTION/////////////////////////////////////////////////                 
//// Select images for 1 year average////
/////Reference Landsat 8
var imagesL8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA')
  .filterBounds(StudyArea)
  .filterDate(startDateRef, stopDateRef)
var masked_ref_L8 = imagesL8.map(L8_process.L8_maskNDVI);
var tmeanL8 = masked_ref_L8.mean();
/////Reference Sentinel 2
var imagesS2 = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(StudyArea)
  .filterDate(startDateRef, stopDateRef)
  .map(function (img) {
    var prj = img.select('B8').projection()
    var newim = img.select('B8').translate(-500, 0)
    img= img.clip(newim.geometry())
    var newimg2 = img.select('B8').translate(200, 0)
    return img.clip(newimg2.geometry())
     });
var imagesS2 = imagesS2.map(function(image) {
    return image.divide(10000)});
var masked_ref_S2 = imagesS2.map(S2_process.S2_maskNDVI);
var tmeanS2= masked_ref_S2.mean();
//Map.addLayer(tmeanS2,  {bands:['B4','B3','B2'],min:0, max:0.3},'tmeanS2')
///////////////////////////////////////////////////////////////////////////////////////////
/////////GET the sensors results//////////////////////////////
////////////////////////////////////////////////////////////
//////////Results Landsat 8/////////////
var changeL8_mask_ =  L8_t2.map(L8_process.L8_mask(StudyArea))
var changeL8 =  L8_t2.map(L8_process.L8_alert(tmeanL8, StudyArea))
////Add band Id_sensor (Landsat_8 Id_sensor=8)
var  changeL8_sum = changeL8.reduce(ee.Reducer.sum())
var L8_mask_coef = changeL8_sum.where(changeL8_sum.neq(0),(8)).rename('Id_sensor')
var changeL8 =changeL8.map(function(b){return b.addBands(L8_mask_coef)})
///////////FONCTION COMBINE///////////////
// Use an equals filter to specify how the collections match.
var INDEX = 'system:index'; 
var filter = ee.Filter.equals({ leftField: INDEX, rightField: INDEX });
// Define the join.
var innerJoin = ee.Join.inner('primary', 'secondary');
// Apply the join.
var combined = innerJoin.apply(changeL8_mask_, changeL8, filter);
// merge images
var combinedImages = combined.map(function(f) {
  var toa = ee.Image(f.get('secondary'))
  var mask = ee.Image(f.get('primary'))
  return toa.addBands(mask)
})
//////L8 -> Image collection final
var L8_joinded = ee.ImageCollection(combinedImages)
//////////Results Sentinel 2/////////////
var changeS2 =  S2_t2.map(S2_process.S2_alert(tmeanS2, StudyArea))
var changeS2_mask_ =  S2_t2.map(S2_process.S2_mask(StudyArea))
////Add band Id_sensor (Sentinel-2 Id_sensor=2)
var  changeS2_sum = changeS2.reduce(ee.Reducer.sum())
var S2_mask_coef = changeS2_sum.where(changeS2_sum.neq(0),(2)).rename('Id_sensor')
var changeS2 =changeS2.map(function(b){return b.addBands(S2_mask_coef)})
///////////FONCTION COMBINE///////////////
// Use an equals filter to specify how the collections match.
var INDEX = 'system:index'; 
var filter = ee.Filter.equals({ leftField: INDEX, rightField: INDEX });
// Define the join.
var innerJoin = ee.Join.inner('primary', 'secondary');
/// Apply the join.
var combined = innerJoin.apply(changeS2_mask_, changeS2, filter);
/// merge images
var combinedImages = combined.map(function(f) {
  var toa = ee.Image(f.get('secondary'))
  var mask = ee.Image(f.get('primary'))
  return toa.addBands(mask)
})
///-----S2 -> Image collection final
var S2_joinded = ee.ImageCollection(combinedImages)
//////////Results Sentinel 1/////////////
var changeS1 = S1_process.change
changeS1 = changeS1.select(['constant'], ['deforestation']);
changeS1 = changeS1
  .map(function(i) { 
    return i.set({name: i.date().format('YYYY-MM-dd') })
  })
///-----Add band Id_sensor (Sentinel-1 Id_sensor=1)
var  changeS1_sum = changeS1.reduce(ee.Reducer.sum())
var S1_mask_coef = changeS1_sum.where(changeS1_sum.neq(0),(1)).rename('Id_sensor')
var changeS1 =changeS1.map(function(b){return b.addBands(S1_mask_coef)})
///-----S1 -> Image collection final
var S1_joinded = changeS1.map(function(image) {
  var masknull = ee.Image(0)
  return image.addBands(masknull);
});  
///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////MERGE ALL SENSORS////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//////-----Combine the 3 images collection and sort by date     
var add=L8_joinded.merge(S2_joinded).merge(S1_joinded)
///-----Sort by date
var add=add.sort('system:time_start')
var listall = add.toList(add.size())
var IC_liste = ee.ImageCollection(listall)
var IC_liste = IC_liste.cast({
  bandTypes:{
    'deforestation':'int8',
    'constant':'int8',
    'Id_sensor':'int8'
  },
   bandOrder:['deforestation','constant', 'Id_sensor']
   })
print(IC_liste, 'IC_liste')
Map.addLayer(IC_liste, {},'IC_liste',false)
////-----Made an empty image (0)
var init = ee.Image(IC_liste.first())
init= init.where(init.select('deforestation').neq(0),(0))
init= init.where(init.select('constant').neq(0),(0))
////-----Function to merge images through time -> ModelScore  
function ModelScore(image, init){
init = ee.Image(init)
var Defi = init.select('deforestation')
var maski = init.select('constant')
var Def = image.select('deforestation')
var mask = image.select('constant')
var sensor =image.select('Id_sensor')
//sensor = image.get('sensor')
/*
var im1 = init
  .where(Defi.gt(0).and(Def.eq(0)), Defi.subtract(mask))
   //.where(Defi.gt(0).and(Def.gt(0)), init.add(Def))
  .where(Defi.gt(0).and(Def.gt(0)).and((sensor.eq(2)).or((sensor.eq(8)))), init.add(Def.multiply(2)))
  .where(Defi.gt(0).and(Def.gt(0)).and((sensor.eq(1))), init.add(Def))
  //.where(Defi.eq(0), init.add(Def))
  .where(Defi.eq(0).and((sensor.eq(2)).or((sensor.eq(8)))), init.add(Def.multiply(2)))
  .where(Defi.eq(0).and((sensor.eq(1))), init.add(Def))  
  //.where(Defi.lt(0).and(Def.gt(0)), Def)
  .where(Defi.lt(0).and(Def.gt(0)).and((sensor.eq(2)).or((sensor.eq(8)))), Def.multiply(2))
  .where(Defi.lt(0).and(Def.gt(0)).and((sensor.eq(1))), Def)
  .where(Defi.lt(0).and(Def.eq(0)), 0)
  */
var im1 = init
  .where(Defi.gt(0).and(Def.eq(0)), Defi.subtract(mask))
  .where(Defi.gt(0).and(Def.gt(0)), init.add(Def))
  .where(Defi.eq(0), init.add(Def))
  .where(Defi.lt(0).and(Def.gt(0)), Def)
  .where(Defi.lt(0).and(Def.eq(0)), 0)
return im1
}
//-----Iterate through each day and calculate total Score
var TotalScore = IC_liste.iterate(ModelScore, init) 
var TotalScore=ee.Image(TotalScore)
TotalScore=TotalScore.select('deforestation')
var TotalScore_mask = TotalScore.updateMask(TotalScore.neq(0))
Map.addLayer(TotalScore_mask, {bands: ['deforestation'], min: 1, max: 10, palette: ['blue', 'green', 'red']}, 'TotalScore_mask', false);
///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////TRANSFORM RESULT IMAGE ALERT TO VECTOR////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//-----Select only the deforestation band
var TotalScore_def = TotalScore_mask.select(['deforestation'])
.updateMask(TotalScore_mask.neq(0)).int();
//Map.addLayer(TotalScore_def, {min: 1, max: 50, palette: ['blue', 'white', 'green'], opacity:0.5}, 'TotalScore_def', false);
//-----Transform to vector
var TotalScore_feature = TotalScore_def.select(['deforestation']).reduceToVectors({
  geometry: StudyArea,
  geometryType: 'polygon',
  eightConnected: true,
  labelProperty : 'Points',
  maxPixels:1e16,
  scale : 30,
  tileScale : 16
});
//Map.addLayer(TotalScore_feature, {color: 'FF00FF'}, 'TotalScore_feature', false);
//-----Merges all geometries
var Feat_union = TotalScore_feature.union(1).first()
//-----Buffer all geometries -> search radius 32m
var buffered_union = TotalScore_feature.map(function(feature) {
  return feature.buffer(16)
  }).union(1);
//Map.addLayer(buffered_union, {color: 'FF00FF'}, 'buffered_union', false);
var buffered_geom = buffered_union.geometry().geometries();
//Map.addLayer(buffered_geom, {color: 'FF00FF'}, 'buffered_geom', false);
//-----Transform to individual feature with infos
var fc = ee.FeatureCollection(buffered_geom.map(function(geom) {
  return ee.Feature(ee.Geometry(geom));
}));
var Feat_Intersect = fc.map(function(feature) {
  return feature.intersection(Feat_union,1)
})
var Feat_Intersect = Feat_Intersect.map(function (feature) {
  return feature.set({Centroid: feature.centroid(1), Alerte: 'Deforestation', StartDate : startD.format("dd_MM-YYYY").getInfo(), StopDate : stopD.format("dd_MM-YYYY").getInfo(), count : feature.area().divide(900).round() });
})
//----- Add score for each polygon -> Get max tiers mean pixel score 
var TotalScore_tiers_mean = TotalScore.reduceRegions({collection : Feat_Intersect, reducer :ee.Reducer.intervalMean(66,100), scale : 30})
//----- Delete small polygons <9 pixels (0.81ha)
var Result_FinalScore = TotalScore_tiers_mean.filter(ee.Filter.greaterThanOrEquals('count',9 ))
Map.addLayer(Result_FinalScore, {min: 1, max: 50, palette: ['blue', 'white', 'green'], opacity:0.5}, 'Result_FinalScore', true);
///////////////////////////////////////////////////////////////////////////////////////////
/////////////////////POLYGONS TO CENTROIDS////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
var getCentroid = function(feature) {
  var keepProperties = ['mean'];
  var centroid = feature.geometry(0.1).centroid(0.1);
  return ee.Feature(centroid).copyProperties(feature, keepProperties);
};
var Alert_centroid = Result_FinalScore.map(getCentroid);
Map.addLayer(Alert_centroid, {}, 'Alert_centroid', false);
////////EXPORT TO DRIVE////////////
var name = 'Alert_SCORE_'+ startD.format("dd_MM-YYYY").getInfo() + '_to_' + stopD.format("dd_MM-YYYY").getInfo()
var name_centroid = 'Alert_CENTROID_SCORE_'+ startD.format("dd_MM-YYYY").getInfo() + '_to_' + stopD.format("dd_MM-YYYY").getInfo()
// Export to asset
Export.table.toDrive({
  collection: Alert_centroid,
  description: name_centroid,
    folder:'test',
    fileFormat : "SHP",
  })
// Export to GeoJSON
Export.table.toDrive({
  folder: name,
  collection: Result_FinalScore,
  description: 'Result_FinalScore',
  folder:'test',
  fileFormat: 'GeoJSON'
  })
;
Export.image.toDrive({
  image: TotalScore_def,
  description: "TotalScore_def",
    folder: 'test',
  scale: 30,
  region: StudyArea,
  maxPixels: 160000000
});
/////Export result to grid process
exports.Result_FinalScore = Result_FinalScore
//////ADD LAYERS///// 
/*   
print(S2_t2)
//Boucle pour afficher chaque Image de la collection Sentinel 2
var ImList = S2_t2.getInfo().features;
for (var Im = 0; Im < ImList.length; ++Im){
  var image = ee.Image(S2_t2.toList(100).get(Im))
  var dateIm = ee.Date(ee.Image(S2_t2.toList(100).get(Im)).get('system:time_start'))
  var datestring = dateIm.format("dd_MM-YYYY").getInfo()
print('Image n°'+ datestring)
Map.addLayer(image, {bands: ['B2','B3','B4'], min:0.0400, max:0.8000},'Image n° '+ datestring, false);}
   */ 
/*
//Boucle pour afficher chaque Image changeS2_mask_
var ImList = IC_liste.getInfo().features;
for (var Im = 0; Im < ImList.length; ++Im){
  var image = ee.Image(IC_liste.toList(100).get(Im))
  //var dateIm = ee.Date(ee.Image(changeS2_mask_.toList(100).get(Im)).get('system:time_start'))
  //var datestring = dateIm.format("dd_MM-YYYY").getInfo()
print('Image n°'+ Im)
Map.addLayer(image, {bands: ['deforestation'], min: 1, max: 10, palette: ['blue', 'green', 'red']},'Image n° '+ Im, false)
;}
*/