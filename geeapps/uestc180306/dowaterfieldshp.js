var geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[78.0391418501813, 31.413596328595524],
          [83.6641418501813, 25.863108030177706],
          [97.0235168501813, 26.17903302398046],
          [97.9024231001813, 21.518422679998398],
          [106.8672668501813, 19.874119575730855],
          [109.6797668501813, 17.207893424088],
          [115.4805481001813, 21.354801615679317],
          [120.7539856001813, 20.69849980318001],
          [123.5664856001813, 27.121655022828822],
          [121.2813293501813, 35.08748797485254],
          [125.6758606001813, 39.28663508878948],
          [132.8828918501813, 42.863024022692755],
          [135.6953918501813, 48.62123880874207],
          [131.8282043501813, 48.50490769786563],
          [126.3789856001813, 53.89393516686087],
          [120.0508606001813, 53.58202432363631],
          [118.4688293501813, 50.221856651549665],
          [115.8321106001813, 49.76986219039189],
          [110.2071106001813, 43.50388360129079],
          [97.1992981001813, 44.26402871615097],
          [92.1016418501813, 45.87771764205277],
          [90.6953918501813, 48.62123880874207],
          [85.9492981001813, 49.99639052739232],
          [73.1172668501813, 38.87728920193766]]]),
    p1 = /* color: #d63000 */ee.Geometry.Point([116.5132629439313, 39.93832287528225]),
    geometry2 = /* color: #05d662 */ee.Geometry.Polygon(
        [[[92.23873804646598, 41.976170425510645],
          [85.29537867146598, 34.64262681269384],
          [89.55807398396598, 32.852291234816555],
          [101.11569117146598, 33.14713671248404],
          [107.53170679646598, 41.64863323633477],
          [98.87448023396598, 40.08683045023824]]]);
/**********************************************************************************************************************************
 * File name   : finalDataProcess2
 * Author      : LSJ
 * Data        : 2018-09-18
 * Description : to deal with all shp one by one to get the threshold value to classify image by the enhanced Otsu method.
 * History     : 
 * 
**********************************************************************************************************************************/
/*why to compute the area of shp is that there are some shp area is to small 
  so that cannot contain one pixel in the resolution of 250m. Then, the image
  of min and max value is null.
  so, we compute the areas of every shp to filter out what connot be used.*/
var addArea = function(feature) {
  return feature.set({areaHa: feature.geometry().area()});
};
// var waterFieldShp = ee.FeatureCollection("users/uestc180306/2014_mask").map(addArea).sort("areaHa").limit(5);
var waterFieldShp = ee.FeatureCollection("users/uestc180306/2014_mask").map(addArea).filter(ee.Filter.gt('areaHa', 250*250));//.filterBounds(geometry2);
// print(waterFieldShp.geometry().projection());  //more than 5000 elements could not be shown.
var regionJson = ee.Geometry(geometry).toGeoJSONString();
// print(regionJson);
// the MOD09Q1 product has newer version 'MODIS/006/MOD09Q1'
var modis = ee.ImageCollection('MODIS/006/MOD09Q1').select(['sur_refl_b02']);
//var modis = ee.ImageCollection("MODIS/MOD09Q1").select(['sur_refl_b02']);
var filteredModis = modis.filterDate("2014-1-1", "2014-1-5");
//to configure some visual options.
// the black represents the background, gray represents inside the shp area but is not water pixel, blue represents water.
var palette = ['black','gray','blue'];
var visParams = {min: 0, max: 2, palette: palette};
var rawOriLayer = null;
var rawEditLayer = null;
var computedIds = filteredModis.reduceColumns(ee.Reducer.toList(), ['system:index'])
                               .get('list');
//to do all filtered images and get the results one by one.                              
computedIds.evaluate(function(ids) {
  // print("computedIds ", ids);
  for (var i=0; i<ids.length; i++) {
    var key = ids[i];
    doSelectRawImage(key);
  }
});
/*alternative method to do one image asynchronously.
  Also, there is a simple panel to select the next one or the previous one to do. */
// computedIds.evaluate(function(ids) {
//   // print("computedIds ", ids);
//   var total = ids.length;
//   var showTitle = ui.Label("", {fontWeight: 'bold'});
//   var curIndex = 0;
//   var bPlus = ui.Button("下一景", function() {
//     curIndex += 1;
//     if (curIndex >= total) {
//       curIndex = 0;
//     }
//     showTitle.setValue(ids[curIndex]);
//     doSelectRawImage(ids[curIndex]);
//   });
//   var bReduce = ui.Button("上一景", function() {
//     curIndex -= 1;
//     if (curIndex < 0) {
//       curIndex = total - 1;
//     }
//     showTitle.setValue(ids[curIndex]);
//     doSelectRawImage(ids[curIndex]);
//   });
//   showTitle.setValue(ids[curIndex]);
//   doSelectRawImage(ids[curIndex]);
//   var main = ui.Panel({
//     widgets: [
//       ui.Label('点击"下一景"或"上一景"更换影像数据', {fontWeight: 'bold'}),
//       bPlus, bReduce,
//       ui.Label("当前影像数据ID: ", {fontWeight: 'bold'}),
//       showTitle
//     ],
//     style: {width: '200px', padding: '8px'}
//   });
//   ui.root.insert(0, main);
// });
/**
  @method   : doSelectRawImage
  @abstract : the function to deal with selected images
  @param key: the image's system:index property
*/
function doSelectRawImage(key) {
  // if use the sencond way, one could remove the previous layers and only show the current results.
  // if (rawOriLayer !== null) {
  //   Map.remove(rawOriLayer);
  // }
  // if (rawEditLayer !== null) {
  //   Map.remove(rawEditLayer);
  // }
  // print("show raw image id is: " + key);
  var image = ee.Image(filteredModis.filter(ee.Filter.eq("system:index", key)).first());
  var clippedImage = image.clipToCollection(waterFieldShp);
  // to get the classfied image
  var clsImg = classifiedImg(clippedImage);
  //print(clsImg);
  // It's a failure attempt to reproject the clsImg to resource projection. we want set the crs param to reproject but it doesnot work.
  // var crsinfo = 'PROJCS["Albers_Conic_Equal_Area",GEOGCS["WGS 84",DATUM["WGS_1984", \
  //         SPHEROID["WGS 84",6378137,298.257223563, \
  //         AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],\
  //         PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295],\
  //         AUTHORITY["EPSG","4326"]],PROJECTION["Albers_Conic_Equal_Area"],\
  //         PARAMETER["False_Easting",4000000],\
  //         PARAMETER["False_Northing",0],PARAMETER["longitude_of_center",105],\
  //         PARAMETER["Standard_Parallel_1",25],PARAMETER["Standard_Parallel_2",47],\
  //         PARAMETER["latitude_of_center",0],UNIT["Meter",1,AUTHORITY["EPSG","9001"]]]';
  // to get the result image has two method: export and getDownloadURL
  Export.image.toDrive({
    image: clsImg.toByte(),//.reproject('ESRI:102025',null,250),
    description: key+"_classfied_uint8",
    folder: "modis2014_result",
    fileNamePrefix: key+"_classfied_uint8",
    scale: 250,
    region: regionJson,
    // crs: crsinfo,
    // crsTransform: [250,0,567839.801,0,-250,6186669.745],   
    fileFormat: 'GeoTIFF',
    maxPixels: 1e11
  });
  //show the clipped image and classfied image results
   rawOriLayer = Map.addLayer(clippedImage, {}, key+"_clipped");
   rawEditLayer = Map.addLayer(clsImg, visParams, key+"_clipped_classfied");
  //one method to get roi json information
  //var roiInfo = roi.getInfo();
  //var region1 = JSON.stringify(roiInfo);
  //another method to get roi json information
  //var region2 = ee.Geometry(roi).toGeoJSONString();
  // the limit of the getDownloadURL request is not more than 1GB.
  var url1 = clippedImage.toByte().select("sur_refl_b02").getDownloadURL({scale: 250,
                                          region: regionJson,
                                          name: key+"clipped"});
  print(key + "_clipped: ", url1);
  var url2 = clsImg.toByte().getDownloadURL({scale: 250,
                                    region: regionJson,
                                    name: key+"_classfied"});
  print(key + "_classfied: ", url2);
}
/** 
    @abstract: to get the classfied image. If the result image's pixel value equal to 2, 
               it represents true water and value 1 represents no water but inside the shp area.
    @param {Image}: the data what to do.
    @return: the classfied image. 
*/
function classifiedImg(img){
  var blank = ee.Image(0).clipToCollection(waterFieldShp);
  /** 
    @abstract: use map function to deal with every shp simultaneously.
    @param {func}: the parameter of map is a function, the map function
                    must have a return image or feature and the parameter
                    oneShp represent the one of the collection elements.
    @return {collection}: the collection of processed images.
  */
  var waterClippedImgs =  waterFieldShp.map(
                            function(oneShp){
                              // to get the img's minimize and maximum values to convert data type to uint8 by (currentValue - minValue)/(maxValue - minValue) 
                              var minMax = img.reduceRegion({
                                  reducer: ee.Reducer.minMax(),
                                  geometry: oneShp.geometry(),
                                  scale: 250,
                                  maxPixels: 1e9
                              });
                              //print(minMax);
                              var minImg = minMax.get("sur_refl_b02_min");
                              var maxImg = minMax.get("sur_refl_b02_max");
                              var imgUint8 = img.clip(oneShp).subtract(ee.Number(minImg)).divide(ee.Number(maxImg).subtract(ee.Number(minImg))).multiply(255);
                              imgUint8 = imgUint8.toByte();
                              //to get the histogram for otsu function
                              var totalMeanAndHist = imgUint8.reduceRegion({
                                  reducer: ee.Reducer.histogram()
                                           .combine('mean', null, true),
                                  geometry: oneShp.geometry(),
                                  scale: 250,
                                  maxPixels: 1e9
                              });
                              // print(totalMeanAndHist);
                              var totalMean = totalMeanAndHist.get("sur_refl_b02_mean");
                              var histogram = totalMeanAndHist.get('sur_refl_b02_histogram');
                              //compared with otsu function, one replaced the inner variance with (innerVariance / (interVarianceA + interVarianceB)).
                              var enhancedOtsu = function(histogram) {
                                var counts = ee.Array(ee.Dictionary(histogram).get('histogram'));
                                var means = ee.Array(ee.Dictionary(histogram).get('bucketMeans'));
                                var size = means.length().get([0]);
                                var totalNu = counts.reduce(ee.Reducer.sum(), [0]).get([0]);
                                var sum = means.multiply(counts).reduce(ee.Reducer.sum(), [0]).get([0]);
                                var totalMean = sum.divide(totalNu);
                                var indices = ee.List.sequence(1, size);
                                // print(indices);
                                // Compute between sum of squares, where each mean partitions the data.
                                var varianceList = indices.map(function(nu) {
                                  nu = ee.Number(nu);
                                  var imgUint8Bgd = imgUint8.updateMask(imgUint8.gt(nu));
                                  // print(imgUint8Bgd)
                                  var imgUint8Object = imgUint8.updateMask(imgUint8.lte(nu));
                                  var BgdVarDict = imgUint8Bgd.reduceRegion({
                                      reducer: ee.Reducer.variance(),
                                      geometry: oneShp.geometry(),
                                      scale: 250,
                                      maxPixels: 1e9
                                  });
                                  var ObjectVarDict = imgUint8Object.reduceRegion({
                                      reducer: ee.Reducer.variance(),
                                      geometry: oneShp.geometry(),
                                      scale: 250,
                                      maxPixels: 1e9
                                  });
                                  var objectVar = ObjectVarDict.get("sur_refl_b02");
                                  objectVar = ee.Number(ee.Algorithms.If(objectVar,objectVar,0));
                                  var bgdVar = BgdVarDict.get("sur_refl_b02");
                                  bgdVar = ee.Number(ee.Algorithms.If(bgdVar,bgdVar,0));
                                  var objectCounts = counts.slice(0, 0, nu);
                                  var objectNu = objectCounts.reduce(ee.Reducer.sum(), [0]).get([0]);
                                  // print("objectNu",objectNu);
                                  var objectMeans = means.slice(0, 0, nu);
                                  var objectMean = objectMeans.multiply(objectCounts)
                                      .reduce(ee.Reducer.sum(), [0]).get([0])
                                      .divide(objectNu);
                                  // print("objectMean",objectMean)
                                  var bgdNu = totalNu.subtract(objectNu);
                                  // print("bgdNu",bgdNu);
                                  var bgdMean = sum.subtract(objectNu.multiply(objectMean)).divide(bgdNu);
                                  // print("bgdMean",bgdMean)
                                  var objectRatio = objectNu.divide(totalNu);
                                  // print("objectRatio",objectRatio)
                                  var bgdRatio = bgdNu.divide(totalNu);
                                  // print("bgdRatio",bgdRatio)
                                  var objectInnerVar = ee.Number(objectVar);//.divide(objectRatio);
                                  // print("objectInnerVar",objectInnerVar)
                                  var bgdInnerVar = ee.Number(bgdVar);//.divide(bgdRatio);
                                  // print("bgdInnerVar",bgdInnerVar)
                                  var interVar =  objectRatio.multiply(objectMean.subtract(totalMean).pow(2)).add(
                                        bgdRatio.multiply(bgdMean.subtract(totalMean).pow(2)));
                                  return interVar.divide(bgdInnerVar.add(objectInnerVar));
                                });
                                // Return the mean value corresponding to the maximum varianceList.
                                return means.sort(varianceList).get([-1]);
                              };
                              var thrValue = enhancedOtsu(histogram);
                              return blank.clip(oneShp).where(imgUint8.lte(ee.Number(totalMean)),2).where(imgUint8.gt(ee.Number(totalMean)),1);
                            }
                          );
  // every area in waterFieldShp has a classfied image.
  var clss = ee.ImageCollection(waterClippedImgs).mosaic();
  return clss;
}
/* choose the p1 point as a centre because if we compute the centroid of all shp 
that could consume a lot of memory that should be avoid.*/
Map.centerObject(p1, 7);