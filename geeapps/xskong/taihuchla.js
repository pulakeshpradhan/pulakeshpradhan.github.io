var roi2 = /* color: #0b4a8b */ee.Geometry.Polygon(
        [[[119.99672390440583, 31.46498218262803],
          [119.94590815792276, 31.409907601512437],
          [119.86144458557112, 31.22335186864817],
          [119.9733765632227, 31.015243255332713],
          [120.0867543306789, 30.944635326621906],
          [120.21646720521267, 30.902178440655106],
          [120.45955953448436, 30.95637299824051],
          [120.54883046736359, 31.0352509581566],
          [120.62368859206572, 31.118162476938213],
          [120.62334940219148, 31.192511488857726],
          [120.56187786518194, 31.177536834747645],
          [120.52410940327286, 31.192811081573602],
          [120.51174885546504, 31.260927604109206],
          [120.4307182911889, 31.253883374925103],
          [120.39088972193645, 31.29496748945447],
          [120.39020303728194, 31.351868738120782],
          [120.44994594988918, 31.405219035058543],
          [120.41011737763836, 31.486651679088965],
          [120.27964434792, 31.48665169093065],
          [120.24324955684085, 31.57269446229515],
          [120.11620965728434, 31.577374320820713],
          [120.05990026972859, 31.523536627156247],
          [120.00633768631053, 31.48606599705185]]]);
// name: Kong Xiangsheng
// email: emails305@163.com
// company: Ludong University
// define region of intrest (roi).
var roi = ee.FeatureCollection("ft:1uEC68BrzH9RQQBo2uubGYPPdZtEYumbay0gHNX7f");
// remove cloud function based on Landsat TOA
var cloud_thresh = 40;
function toarmCloud(image) {
  var cloudScore = ee.Algorithms.Landsat.simpleCloudScore(image);
  var mask = cloudScore.select("cloud").lt(cloud_thresh);//mask file
  return image.updateMask(mask);// Apply mask
}
// NDVI function
 var addNDVI_L5 = function(image){
   return image.addBands(image.normalizedDifference(['B4', 'B3']).rename('NDVI'));
};
var addNDVI_L8 = function(image){
   return image.addBands(image.normalizedDifference(['B5', 'B4']).rename('NDVI'));
};
// Chla function using NDVI.
var addChla = function(image){
  return image.addBands(image.select("NDVI").multiply(0.0918).add(0.0945).rename("Chla"));
};
// generate date interval filters
// var years1 = ee.List.sequence(1984, 2011);// Landsat 7 slc-off
// var years2 = ee.List.sequence(2013, 2018);// Landsat 7 slc-off
// var years = years1.cat(years2); // remove year of 2012.
var years = ee.List.sequence(1984, 2018)
// print(years);// test code
var filters = years.map(function(year) {
  var start = ee.Date.fromYMD(year, 5, 1);
  var stop = start.advance(6, 'month').advance(-1, 'day');
  var filter = ee.Filter.date(start, stop);
  return ee.Dictionary({filter: filter,year: year});
});
// get Landsat8,remove cloud,add NDVI,add Chlac using 179 scenes image of Lansat8 TOA
var L5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_TOA")
  .filterBounds(roi)
  .map(toarmCloud)
  .map(addNDVI_L5)
  .map(addChla);
var L7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_TOA")
  .filterBounds(roi)
  .map(toarmCloud)
  .map(addNDVI_L5)
  .map(addChla);
var L8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
  .filterBounds(roi)
  .map(toarmCloud)
  .map(addNDVI_L8)
  .map(addChla);
var L5_L8 = L5.merge(L7).merge(L8)
// print("Landsat5,L7,L8 image result:",L5,L7,L8);// test code   
// print("Landsat5-8 image result:",L5_L8);// test code   
// Map.addLayer(L5_L8.first(),{},"L5_L8.first")// test code
// generate mean for every date interval
var means = filters.map(function(obj) {
  obj = ee.Dictionary(obj);
  var year = obj.get('year');
  var filter = obj.get('filter');
  return L5_L8.select('Chla')
    .filter(filter)
    .mean()
    .set('year', year)
    .set("sensor","Landsat5"); // remember year
});
print("Landsat5_L8 image means result:",means)
// compose into a image collection
means = ee.ImageCollection(means);
// print("meansL5:",means)
Map.addLayer(means.first(),{},"meansL5");
function getMeanByYear(year) {
  return ee.Image(means.filter(ee.Filter.eq('year', year)).first());
}
// add to map and export
years.getInfo().map(function(year) {
    var chla = getMeanByYear(year);
    var vis = {palette: ["0000FF","00FF00"], min: 0, max: 0.2};
// Map.addLayer(chla.clip(roi), vis, "year")
    Map.addLayer(chla.clip(roi), vis,year.toString(),false);//year.toString is important
});
print(means);// test code
// create video using RGB.
var chlaVideo = means
      .map(function(image){
      return image
      .clip(roi)
      .select("Chla")
      .visualize(
        {'forceRgbOutput':true, 'palette': '0000FF, 00FF00','min':0,'max':0.2});
      });
print("chlaVideo:",chlaVideo);// test code
Map.addLayer(chlaVideo,{},"chlaVideo first");//test code
// Exportvideo
Export.video.toDrive({// use 9 minitues 
    collection: chlaVideo, 
    description: 'L5-L7-L8_Chla_1984_2018', 
    scale: 100,
    // dimensions: '720',
    framesPerSecond: 0.5,// small is high resolution
    maxPixels: 1e13,
    region: roi2
  });
// // Display the ROI.
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: roi,
  color: 0,
  width: 1
});
Map.centerObject(roi,9);
Map.addLayer(outline,{palette:'0000ff'},"taihu");