//roi选取的是中国陆地区域，数据使用的是modis地标分类数据集合
var Wuhu = ee.FeatureCollection("users/martinaklockopas91/Wuhu");
 var  mcd12q1 = ee.ImageCollection("MODIS/006/MCD12Q1");
Map.centerObject(Wuhu, 8);
Map.addLayer(Wuhu, {}, "Wuhu");
var bounds = Wuhu.geometry().bounds();
var landCover = mcd12q1.filterDate("2017-1-1", "2018-1-1")
                       .select("LC_Type1")
                       .first()
                       .clip(Wuhu);
var visParam = {
  min: 1,
  max: 17,
  palette: [
    '05450a', '086a10', '54a708', '78d203', '009900', 'c6b044', 'dcd159',
    'dade48', 'fbff13', 'b6ff05', '27ff87', 'c24f44', 'a5a5a5', 'ff6d4c',
    '69fff8', 'f9ffa4', '1c0dff'
  ],
};
Map.addLayer(landCover, visParam, "landCover");
var randomPoint = ee.FeatureCollection.randomPoints({
  region: Wuhu, 
  points: 1000
});
Map.addLayer(randomPoint,{color:"red"}, "random point");
print("randomPoint", randomPoint);
var sample = randomPoint.map(function(feature) {
  var dict = landCover.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: feature.geometry(), 
    scale: 500,
    tileScale: 16
  });
  var LC_Type1 = dict.get("LC_Type1");
  feature = feature.set("class", LC_Type1);
  return feature;
});
Export.table.toDrive({
  collection: sample,
  description: "Drive-randomSample02",
  folder: "training02",
  fileNamePrefix: "randomSample02",
  fileFormat: "GeoJSON"
});