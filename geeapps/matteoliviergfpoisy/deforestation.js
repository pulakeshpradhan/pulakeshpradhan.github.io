var Sabah = ee.FeatureCollection("users/patawaitte/Sabah"),
    geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[116.40685797646665, 5.65363186597396],
          [116.44411228418653, 5.6521898644701025],
          [116.44343857165313, 5.6740445616454505],
          [116.44755829174096, 5.694793191218686],
          [116.4293617739545, 5.695214671096182],
          [116.4143410494595, 5.696434029767089],
          [116.39360521361618, 5.699038434663281],
          [116.37201166848672, 5.66645458290564]]]);
// Load country boundaries from a Fusion Table.
var countries = ee.FeatureCollection('ft:1tdSwUL7MVpOauSgRzqVTOwdfy17KDbw-1d9omPw');
// Get a feature collection with just the Malaysia and Indonesia feature.
var StudyArea = geometry//countries.filter(ee.Filter.eq('Country', 'Indonesia'),ee.Filter.eq('Country', 'Malaysia'));
var L8_process = require('users/matteoliviergfpoisy/Script:Deforestation/L8Process')
var S2_process = require('users/matteoliviergfpoisy/Script:Deforestation/S2Process')
var S1_process = require('users/matteoliviergfpoisy/Script:Deforestation/S1Process')
var Dates = require('users/matteoliviergfpoisy/Script:Deforestation/Dates')
var resultat_1M = ee.FeatureCollection('users/matteoliviergfpoisy/Sabah_alerte_23_11-2018_to_23_12-2018')
var resultat_2M = ee.FeatureCollection('users/matteoliviergfpoisy/Sabah_alerte_23_10-2018_to_23_11-2018')
//////////DATES///////////////////////////////////////////////////////////
/////Dates T2 - images analysed
//var startD = ee.Date("2017-01-01")
//var stopD = ee.Date('2017-05-31')
var stopD = Dates.stopD
var startD = Dates.startD
////Dates forest reference
//var startDateRef = ee.Date('2016-01-01')
//var stopDateRef = ee.Date('2016-12-30')
var startDateRef = ee.Date.fromYMD(startD.get('Year'), 01, 01).advance(-1, 'year')
var stopDateRef = ee.Date.fromYMD(startD.get('Year'), 12, 31).advance(-1, 'year')
//var diff_Date = ee.Number(stopDateRef.difference(startDateRef, 'month')).round()
//print (diff_Date)
//////////////IMAGE_Collection to analysed/////////////////  
var L8_t2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA')
  .filterBounds(StudyArea)
  .filterDate(startD, stopD)
//////
var S2_t2 = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(StudyArea)
  .filterDate(startD, stopD)
var S2_t2 = S2_t2.map(function(image) {
    var date = image.get('system:time_start')
    return image.divide(10000).set({'system:time_start':date})
    });
//////////////FOREST_REFERENCE_IMAGECOLLECTION/////////////////////////////////////////////////                 
//// Select images for 1 year average ////
var imagesL8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA')
  .filterBounds(StudyArea)
  .filterDate(startDateRef, stopDateRef)
var masked_ref_L8 = imagesL8.map(L8_process.L8_maskNDVI);
var tmeanL8 = masked_ref_L8.mean();
//////
var imagesS2 = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(StudyArea)
  .filterDate(startDateRef, stopDateRef)
var imagesS2 = imagesS2.map(function(image) {
    return image.divide(10000)});
var masked_ref_S2 = imagesS2.map(S2_process.S2_maskNDVI);
var tmeanS2= masked_ref_S2.mean();
var addbandS = function(image,sens){
var addsensor = function(image) {
  var sensor = BL8.rename('sensor');
  return image.addBands(sensor);
}
  return addsensor;
}
///////// GET the sensors results //////////////////////////////
///////// /////////////////////// //////////////////////////////
var changeL8_IC =  L8_t2.map(L8_process.L8_alert(tmeanL8, StudyArea))
var  changeL8 = changeL8_IC.reduce(ee.Reducer.sum())
var changeL8_mask = changeL8.updateMask(changeL8.neq(0))
var L8_mask_cap = changeL8_mask.where(changeL8_mask.neq(0),(8))
Map.addLayer(changeL8_mask, {min: 0, max: 10, palette: ['blue', 'white', 'green'], opacity:0.5}, 'changeL8_mask', false);
//print(changeL8, 'changeL8')
var changeS2_IC =  S2_t2.map(S2_process.S2_alert(tmeanS2, StudyArea))
var  changeS2 = changeS2_IC.reduce(ee.Reducer.sum())
var changeS2_mask = changeS2.updateMask(changeS2.neq(0))
var S2_mask_cap = changeS2_mask.where(changeS2_mask.neq(0),(2))
Map.addLayer(changeS2_mask, {min: 0, max: 10, palette: ['blue', 'white', 'green'], opacity:0.5}, 'changeS2_mask', false);
//print(changeS2, 'changeS2')
var changeS1_IC = S1_process.change
changeS1_IC = changeS1_IC.select(['constant'], ['deforestation']);
changeS1_IC = changeS1_IC
  .map(function(i) { 
    return i.set({name: i.date().format('YYYY-MM-dd') })
        .set({sensor: 'S1' })
  })
var  changeS1 = changeS1_IC.reduce(ee.Reducer.sum())
var changeS1_mask = changeS1.updateMask(changeS1.neq(0))
var S1_mask_cap = changeS1_mask.where(changeS1_mask.neq(0),(1))
Map.addLayer(changeS1_mask, {min: 1, max: 10, palette: ['blue', 'white', 'green'], opacity:0.5}, 'changeS1_mask', false);
//print(changeS1_mask, 'changeS1')
var getCentroids = function(feature) {
   return feature.set({Centroid: feature.centroid(1), Alerte: 'Deforestation', StartDate : startD.format("dd_MM-YYYY").getInfo(), StopDate : stopD.format("dd_MM-YYYY").getInfo()});//, Nb_Capteurs: ee.Number(feature.get('L8')) + ee.Number(feature.get('S1')) + ee.Number(feature.get('S2'))});
 };
//Map.centerObject(StudyArea,14);
var Somme_Col = ee.ImageCollection([L8_mask_cap,S2_mask_cap, S1_mask_cap])
var Somme_Capteur = Somme_Col.reduce(ee.Reducer.sum())
//print (Somme_Capteur)
Map.addLayer(Somme_Capteur, {min: 1, max: 50, palette: ['blue', 'white', 'green'], opacity:0.5}, 'Somme_Capteur', false);
//// Id_capteur = 1 --> S1 ; = 2 --> S2 ; = 3 --> S1 + S2 ; = 8 --> L8 ; = 9 --> L8 + S1 ; = 10 --> L8 + S2 ; = 11 --> L8 + S1 + S2
var Im = Somme_Capteur.rename('Id_capteur').addBands(changeL8_mask.rename('nbr_L8')).addBands(changeS2_mask.rename('nbr_S2')).addBands(changeS1_mask.rename('nbr_S1'));
var detection_Point = ee.Image([0])
                        .where(Im.select('Id_capteur').eq(1),
                        (Im.select('nbr_S1').multiply(1)))
                        .where(Im.select('Id_capteur').eq(2),
                        (Im.select('nbr_S2').multiply(2)))
                        .where(Im.select('Id_capteur').eq(3),
                        (Im.select('nbr_S2').multiply(2)).add(Im.select('nbr_S1').multiply(1)))
                        .where(Im.select('Id_capteur').eq(8),
                        (Im.select('nbr_L8').multiply(2)))
                        .where(Im.select('Id_capteur').eq(9),
                        (Im.select('nbr_L8').multiply(2)).add(Im.select('nbr_S1').multiply(1)))
                        .where(Im.select('Id_capteur').eq(10),
                        (Im.select('nbr_S2').multiply(2)).add(Im.select('nbr_L8').multiply(2)))
                        .where(Im.select('Id_capteur').eq(11),
                        (Im.select('nbr_S2').multiply(2)).add(Im.select('nbr_S1').multiply(1)).add(Im.select('nbr_L8').multiply(2)))
                        ;
var detection_Point = detection_Point.updateMask(detection_Point.neq(0))
Map.addLayer(detection_Point, {min: 1, max: 50, palette: ['blue', 'white', 'green'], opacity:0.5}, 'detection_Points', false);
var Feature_Point = detection_Point.reduceToVectors({
  geometry: StudyArea,
  geometryType: 'polygon',
  eightConnected: true,
  labelProperty : 'Points',
  maxPixels:1e16,
  scale : 30,
  tileScale : 16
});
Map.addLayer(Feature_Point, {min: 1, max: 50, palette: ['blue', 'white', 'green'], opacity:0.5}, 'Feature_Point', false);
var detection_Point_mean = detection_Point.reduceNeighborhood({
  reducer: ee.Reducer.mean(),
  kernel: ee.Kernel.square(90, 'meters'),
}).updateMask(detection_Point.neq(0)).int();
var Feature_Point_mean = detection_Point_mean.reduceToVectors({
  geometry: StudyArea,
  geometryType: 'polygon',
  eightConnected: true,
  labelProperty : 'Points',
  maxPixels:1e16,
  scale : 30,
  tileScale : 16
});
Map.addLayer(Feature_Point_mean, {color: 'FF00FF'}, 'Feature_Point_mean', false);
var attributs = function(feature) {
  return feature.set({Centroid: feature.centroid(1), Alerte: 'Deforestation', StartDate : startD.format("YYYY-MM-dd"), StopDate : stopD.format("YYYY-MM-dd")});
};
var fcWithCentroids = Feature_Point_mean.map(attributs);
Map.addLayer(fcWithCentroids, {min: 1, max: 50, palette: ['blue', 'white', 'green'], opacity:0.5}, 'fcWithCentroids', true);
var nom = 'Sabah_SUM_'+ startD.format("dd_MM-YYYY").getInfo() + '_to_' + stopD.format("dd_MM-YYYY").getInfo()
var nom_alerte = 'Sabah_alerte_'+ startD.format("dd_MM-YYYY").getInfo() + '_to_' + stopD.format("dd_MM-YYYY").getInfo()
///Fonctions pour fusionner les polygones Voisins de 30m
///rayon de recherche 30 m (2X15m)
var bufferer  = function(feature) {
  return feature.buffer(16)
  };
var geom = function(geom) {
  return ee.Feature(ee.Geometry(geom));
};
var Intersect = function(feature) {
  return feature.intersection(Feat_union,1)
};
var Info = function (feature) {
  return feature.set({Centroid: feature.centroid(1), Alerte: 'Deforestation', StartDate : startD.format("dd_MM-YYYY").getInfo(), StopDate : stopD.format("dd_MM-YYYY").getInfo(), count : feature.area().divide(900).round() });
};
//var Feat_discr = Feature_Point_mean
var Feat_discr = Feature_Point_mean//.filter(ee.Filter.lessThan('count',9 ))
var Feat_union = Feat_discr.union(1).first()
var buffered_union = Feat_discr.map(bufferer).union(1);
var buffered_geom = buffered_union.geometry().geometries();
var fc = ee.FeatureCollection(buffered_geom.map(geom));
var Feat_Intersect = fc.map(Intersect)
var Feat_Intersect = Feat_Intersect.map(Info)
var filter = ee.Filter.intersects({
  leftField: '.geo',
  rightField: '.geo',
  maxError: 1 
})
// Fonction de jointure spatiale pour obtenir la moyenne des points du nouveau polygone
var simpleJoin = ee.Join.saveAll({
  matchesKey: 'Points'
})
var Feat_discr_Im = Feat_discr.reduceToImage({properties:['Points'], reducer : ee.Reducer.mean()})
var Feat_discr_Im_mean = Feat_discr_Im.reduceRegions({collection : Feat_Intersect, reducer :ee.Reducer.mean(), scale : 30})
// Application de la jointure
var resultat_voisinage = simpleJoin.apply(Feat_discr_Im_mean, Feat_Intersect, filter).map(function(feature){
  return feature.set({Points : feature.get('mean') })
  })
// Selection des polygones supérieurs à 9 pixels et calcul des centroïdes
var resultat_voisinage = resultat_voisinage.filter(ee.Filter.greaterThanOrEquals('count',9 ))
Map.addLayer(resultat_voisinage, {}, 'resultat_voisinage')
/*
///////////Comparaison avec mois précedents ///////
var bufferer30m  = function(feature) {
  return feature.buffer(30)
  };
var M1_M2 = resultat_1M.merge(resultat_2M)
var buffered = M1_M2.map(bufferer30m).union(1);
var filter = ee.Filter.intersects({
  leftField: '.geo',
  rightField: '.geo',
  maxError: 1 
})
var multiply  = function(feature) {
  var Points = ee.Number(feature.get('Points'))
  var PointsM = Points.multiply(1.5);
  return ee.Feature(feature.set('Points', PointsM));
  };
// Deux jointure, une sur les polygones intersectant les buffer et l'autre sur les polygones n'intersectant pas les buffers
var resultat_voisinage1 = ee.Join.simple().apply(resultat_voisinage.map(multiply), buffered, filter)
var invertedJoined = ee.Join.inverted().apply(resultat_voisinage, buffered, filter);
//Merge les deux collection et changer l'identifiant pour retirer le préfixe du featurecollection.merge
var liste_poly = resultat_voisinage.size()
var result_voisin = ee.FeatureCollection(resultat_voisinage1.merge(invertedJoined).toList(liste_poly).map(function(f) {
  var id = ee.String(ee.Feature(f).get("system:index"))
  id = id.split("_").slice(1).join("_")
  return ee.Feature(f).set("system:index", id)
}))
*/
//print (result_voisin)
//Map.addLayer(result_voisin, {}, 'result_voisin')
// Fonction transformer les polygone en points
var getCentroid = function(feature) {
  var keepProperties = ['Points'];
  var centroid = feature.geometry(0.001).centroid(0.001);
  return ee.Feature(centroid).copyProperties(feature, keepProperties);
};
var Alerte = resultat_voisinage.map(getCentroid);
// Export to asset
Export.table.toDrive({
  folder: nom,
  collection: Alerte,
  description: nom_alerte,
  fileFormat: 'GeoJSON'
  })
// Export to GeoJSON
Export.table.toDrive({
  folder: nom,
  collection: resultat_voisinage,
  description: nom,
  fileNamePrefix: nom,
  fileFormat: 'GeoJSON'
  });