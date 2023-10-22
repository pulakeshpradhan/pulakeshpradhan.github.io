var imageCollection = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG"),
    imageCollection2 = ee.ImageCollection("MODIS/MCD43B3"),
    imageVisParam = {"opacity":1,"bands":["b1"],"max":3,"palette":["000000","fff700","9dff00","00ffad","00b8ff"]};
function createTimeBand(img) {
  var year = ee.Date(img.get('system:time_start')).get('year').subtract(2012);
  return ee.Image(year).byte().addBands(img);
}
var albedo01=imageCollection2.filterDate('2012-08-01', '2012-11-30').map(createTimeBand);
var albedo02=albedo01.reduce(ee.Reducer.median());
var WA2015=ee.Image('users/pmisson/World_Atlas_2015');
var collection01 =ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2012-08-01', '2012-11-30').map(createTimeBand);
var maxval=0;
var collection02 = collection01.reduce(ee.Reducer.median());
collection02 = collection02.multiply(collection02.gte(maxval));
var collection02 = collection02.set('system:time_start','2012-10-01');
var collection021=collection02.select(['avg_rad_median']).subtract(0.07).divide(1.0603848998166232).log10();
var collection021 = collection021.expression(
  '20.3-1.3*VIIRS', {
      'VIIRS': collection021
});
var collection021 = collection021.set('system:time_start','2012-10-01'); 
//var collection1 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG').filterDate('2013-08-01', '2013-11-30').select('avg_rad').reduce(ee.Reducer.median());
var albedo11=imageCollection2.filterDate('2013-08-01', '2013-11-30').map(createTimeBand);
var albedo12=albedo11.reduce(ee.Reducer.median());
var collection11 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2013-08-01', '2013-11-30').map(createTimeBand);
var collection12 = collection11.reduce(ee.Reducer.median());
collection12 = collection12.multiply(collection12.gte(maxval));
var collection12 = collection12.set('system:time_start','2013-10-01');
var collection121=collection12.select(['avg_rad_median']).subtract(0.03).divide(1.134992595931776).log10();
var collection121 = collection121.expression(
  '20.3-1.3*VIIRS', {
      'VIIRS': collection121
});
var collection121 = collection121.set('system:time_start','2013-10-01');
var albedo21=imageCollection2.filterDate('2014-08-01', '2014-11-30').map(createTimeBand);
var albedo22=albedo21.reduce(ee.Reducer.median());  
var collection2 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2014-08-01', '2014-11-30').select('avg_rad').reduce(ee.Reducer.median());
var collection21 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2014-08-01', '2014-11-30').map(createTimeBand);
var collection22 = collection21.reduce(ee.Reducer.median());
collection22 = collection22.multiply(collection22.gte(maxval));
var collection22 = collection22.set('system:time_start','2014-10-01');
var collection221=collection22.select(['avg_rad_median']).subtract(0.00).divide(1.1534292865982883).log10();
var collection221 = collection221.expression(
  '20.3-1.3*VIIRS', {
      'VIIRS': collection221
});
var collection221 = collection221.set('system:time_start','2014-10-01');
var albedo31=imageCollection2.filterDate('2015-08-01', '2015-11-30').map(createTimeBand);
var albedo32=albedo31.reduce(ee.Reducer.median());   
var collection3 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2015-08-01', '2015-11-30').select('avg_rad').reduce(ee.Reducer.median());
var collection31 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2015-08-01', '2015-11-30').map(createTimeBand);
var collection32 = collection31.reduce(ee.Reducer.median());
collection32 = collection32.multiply(collection32.gte(maxval));
var collection32 = collection32.set('system:time_start','2015-10-01'); 
var collection321=collection32.select(['avg_rad_median']).subtract(-0.05).divide(1.08032888627151).log10();
var collection321 = collection321.expression(
  '20.3-1.3*VIIRS', {
      'VIIRS': collection321
});
var collection321 = collection321.set('system:time_start','2015-10-01');
var albedo41=imageCollection2.filterDate('2016-08-01', '2016-11-30').map(createTimeBand);
var albedo42=albedo41.reduce(ee.Reducer.median());     
var collection4 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2016-08-01', '2016-11-30').reduce(ee.Reducer.median());
var collection41 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2016-08-01', '2016-11-30').map(createTimeBand);
var collection42 = collection41.reduce(ee.Reducer.median());
collection42 = collection42.multiply(collection42.gte(maxval));
var collection421=collection42.select(['avg_rad_median']).subtract(0.).divide(1.1461573694825833).log10();
var collection421 = collection421.expression(
  '20.3-1.3*VIIRS', {
      'VIIRS': collection421
});
var collection42 = collection42.set('system:time_start','2016-10-01'); 
var collection421 = collection421.set('system:time_start','2016-10-01');
var albedo51=imageCollection2.filterDate('2017-08-01', '2017-11-30').map(createTimeBand);
var albedo52=albedo51.reduce(ee.Reducer.median());    
var collection5 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2017-08-01', '2017-11-30').reduce(ee.Reducer.median());
var collection51 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2017-08-01', '2017-11-30').map(createTimeBand);
var collection52 = collection51.reduce(ee.Reducer.median());
collection52 = collection52.multiply(collection52.gte(maxval));
var collection52 = collection52.set('system:time_start','2017-10-01'); 
var collection521=collection52.select(['avg_rad_median']).subtract(0.15).divide(1.3139596030668375)
var collection521=collection521.log10();
var collection521 = collection521.expression(
  '20.3-1.3*VIIRS', {
      'VIIRS': collection521
});
var collection521 = collection521.set('system:time_start','2017-10-01');
var albedo61=imageCollection2.filterDate('2018-01-01', '2018-11-30').map(createTimeBand);
var albedo62=albedo61.reduce(ee.Reducer.median());   
var collection61 = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
  .filterDate('2018-01-01', '2018-11-30').map(createTimeBand);
var collection62 = collection61.reduce(ee.Reducer.median());
collection62 = collection62.multiply(collection62.gte(maxval));
var collection62 = collection62.set('system:time_start','2018-10-01'); 
var collection621=collection62.select(['avg_rad_median']).subtract(0.13).divide(1.3139596030668375).log10();
var collection621 = collection621.expression(
  '20.3-1.3*VIIRS', {
      'VIIRS': collection621
});
var collection621 = collection621.set('system:time_start','2018-10-01');
var VIIRS201209 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20120901");
var VIIRS201609 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20160901");
var VIIRS201210 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20121001");
var VIIRS201610 = ee.Image("NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG/20161001");
var F162010_c1a = ee.Image("NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4/F16_20100111-20101209_V4");
var collection02 = collection02.set('system:time_start','2012-08-01');
var collectionS = ee.ImageCollection([collection02,collection12,collection22,collection32,collection42,collection52,collection62]);
var collectionSX = ee.ImageCollection([collection021,collection121,collection221,collection321,collection421,collection521,collection621]);
//var collectionS = ee.ImageCollection([collection02,collection42]);
//var collection = collection1.subtract(collection2);
//print(collection42)
var collectionS2=collectionS.select(['constant_median', 'avg_rad_median']).reduce(ee.Reducer.linearFit())
var collectionS3=collectionS.select(['constant_median', 'avg_rad_median']).reduce(ee.Reducer.mean());
// Visualize brightness in green and a linear fit trend line in red/blue.
var linearFit = collectionS.select(['constant_median', 'avg_rad_median'])
  .reduce(ee.Reducer.linearFit());
var scalerel=linearFit.select(['scale']).divide(linearFit.select(['offset']));
var linearFit2=linearFit.addBands(scalerel);
//var linearFit3=linearFit2.filter(ee.Filter.lq(linearFit.select(['offset'], 1));
print(collection52)
var canny = collection02.select(['avg_rad_median']).gte(0.27);
print(canny)
var linearFit3=linearFit2.multiply(canny.select(['avg_rad_median']));
var vizParams = {
  bands: ['avg_rad_median'],
  min: 0.4,
  max: 100,
  gamma: 2.0,
};
var vizParams3 = {
  bands: ['avg_rad_median_mean'],
  min: 0,
  max: 1,
  gamma: 9.0,
};
var albedo03=albedo02.select("Albedo_BSA_Band1_median").add(albedo02.select("Albedo_BSA_Band2_median"));
albedo03.select("Albedo_BSA_Band1_median").add(albedo02.select("Albedo_BSA_Band3_median"));
albedo03.select("Albedo_BSA_Band1_median").add(albedo02.select("Albedo_BSA_Band4_median"));
var albedo=albedo03.select(["Albedo_BSA_Band1_median"]);
print(albedo);
// Define an arbitrary region of interest.
var world2 = ee.Geometry.Polygon([-140, 60, 0, 60, 155, 60, 155, -50, 10, -50, -140, -50], null, false)
var boxcar = ee.Kernel.square({
  radius: 10, units: 'pixels', normalize: true
});
var createConstantBand = function(image) {
  return ee.Image(1).addBands(image);
};
// Smooth the image by convolving with the boxcar kernel.
var collectionS3B = collectionS3.convolve(boxcar);
var albedo=albedo.select("Albedo_BSA_Band1_median").unmask(0);
var albedoB = albedo.addBands(ee.Image(1));
var collectionS3B = collectionS3B.addBands(ee.Image(1));
 //var albedo = albedo.expression('IMA/1370.5*0.14+0.0778+0.03',{'IMA':albedo.select("Albedo_BSA_Band1_median")});
 var albedoB = albedoB.expression('IMA*pen+ord',{'IMA':albedoB.select("Albedo_BSA_Band1_median"),'pen':0.0001136537233862081,'ord':0.04});
 var albedoB=albedoB.select("Albedo_BSA_Band1_median").unmask(0.08952334027393852);
var collectionS4=collectionS3.select('avg_rad_median_mean').subtract(albedoB.select("Albedo_BSA_Band1_median"));
//var max1=albedo.reduce(ee.Reducer.max());
//var min1=albedo.reduce(ee.Reducer.min());
var collectionS5=collectionS4.subtract(WA2015.select("b1"));
var vizParams2 = {
  bands: [],
  min: 0,
  max: 300,
  gamma: 3.0,
};
//Map.addLayer(collectionS5,{},'Skybrightness');
var VIIRS=collectionS4.select(['avg_rad_median_mean']).log10();
// Compute the EVI using an expression.
var evi = VIIRS.expression(
  '22-1.3*VIIRS', {
      'VIIRS': VIIRS
});
var vizParams2 = {
  bands: ['constant'],
  min: 22,
  max: 17,
  gamma: 3.0,
};
var composite1 = collectionS4.log10()
print(collectionS4)
var collectionS4=collectionS4.unmask(0).subtract(0.08640731036663055)
var VIIRS=composite1.select(['avg_rad_median_mean']);
var dif=WA2015.divide(collectionS4)
var vis = {min: 3, max:0, palette: ['#ff0000','#fbff0c',
 '#000000']
};
if (1){    
//Map.setCenter(-3.7353515625,40.463666324587685, 7);
Map.addLayer(albedoB,{min: 0, max:0.14},'albedo');
//Map.addLayer(collection02,vizParams,'2012');
//Map.addLayer(collection12,vizParams,'2013');
//Map.addLayer(collection22,vizParams,'2014');
//Map.addLayer(collection32,vizParams,'2015');
//Map.addLayer(collection42,vizParams,'2016');
//Map.addLayer(collection52,vizParams,'2017');
//Map.addLayer(collection62,vizParams,'2018');
Map.addLayer(collectionS3,vizParams3,'2012-2018');
Map.addLayer(collectionS4,vizParams3,'2012-2018_albedo');
Map.addLayer(WA2015,{},'WA2015');
Map.addLayer(dif,vis,'Diff');
//Map.addLayer(F162010_c1a,vizParams2,'2011');
}
var vizParams2 = {
  bands: ['constant'],
  min: 22,
  max: 17,
  gamma: 3.0,
};