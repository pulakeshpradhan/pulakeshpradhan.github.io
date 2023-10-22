var bwi = ui.import && ui.import("bwi", "table", {
      "id": "users/kadepasca100/banyuwangi"
    }) || ee.FeatureCollection("users/kadepasca100/banyuwangi");
//buat train
Map.setCenter(114.22045,-8.332587, 10);
var LBS = ee.FeatureCollection('users/kadepasca100/banyuwangi');
var Bts_Banyuwangi = ee.Geometry.Rectangle([113.8359, -8.78036, 114.605, -7.884814]);
Map.addLayer(LBS);
// add layer to map
var veg1 = [114.3269668,-8.463933894,114.2929726,-8.355792681,
114.1890251,-8.321613948,114.3444002,-8.180443662,
114.4117164,-7.95477971,114.3952644,-7.979261655,
114.329303,-8.465675716,114.3274668,-8.463933894,
114.3228798,-8.385457829,114.2628273,-8.424398521,
114.1895251,-8.321613948,114.3957644,-7.979261655,
114.0496705,-8.576467192,114.1192506,-8.520310232,
114.3269668,-8.464433894,114.189874,-8.433762716,
114.1787715,-8.343793906,114.1890251,-8.322113948,
114.3274668,-8.464433894,114.2628273,-8.424898521,
114.190374,-8.433762716,114.0365188,-8.300629195,
113.9739841,-8.312780913,114.3439206,-8.177394691];
Map.addLayer(ee.Geometry.MultiPoint(veg1));
var veg2 = [114.2856534,-8.349714192,114.197277,-8.214222684,
114.348414,-8.236605653,114.4268571,-8.028530144,
114.399814,-7.943445402,114.4132012,-8.019025131,
114.2298577,-8.508254764,114.2179498,-8.535338403,
114.2448546,-8.534692271,114.3382615,-8.538685541,
114.1002295,-8.415723945,114.2856634,-8.404205848,
114.348914,-8.236605653,114.4273571,-8.028530144,
114.4063535,-8.011159382,114.400314,-7.943445402,
114.3767558,-7.931482167,114.3377615,-8.539185541,
114.328803,-8.466175716,114.2856534,-8.350214192,
114.3353296,-8.365110005,114.4117164,-7.95527971,
114.4097211,-7.946397596,114.399814,-7.943945402,
114.3952644,-7.979761655,114.2630366,-8.507959099,
114.3382615,-8.539185541,114.3358296,-8.365110005,
114.197777,-8.214722684,114.4273571,-8.029030144,
114.4209101,-7.982756001,114.4102211,-7.946397596,
114.400314,-7.943945402];
//Map.addLayer(ee.Geometry.MultiPoint(veg2));
var gen1 = [114.3846554,-8.139323909,114.4058535,-8.011159382,
114.4204101,-7.982256001,114.4104198,-7.976235959,
114.3756874,-7.945780829,114.4157698,-7.97522048,
114.2914389,-8.568400594,113.9739841,-8.312280913,
114.4109198,-7.976235959,114.3761874,-7.945780829,
114.3802138,-7.926046491,114.4137012,-8.019025131,
114.4162698,-7.97522048,114.2909389,-8.568900594,
114.197277,-8.214722684,114.3226772,-8.210026285,
114.3846554,-8.139823909,114.4204101,-7.982756001,
114.3974773,-7.959176404,114.3762558,-7.931982167,
114.4157698,-7.97572048,114.2914389,-8.568900594,
114.2861534,-8.350214192,114.176603,-8.344749605,
114.3851554,-8.139823909,114.4032247,-7.953699707,
114.3785052,-7.930156708,114.4162698,-7.97572048];
//Map.addLayer(ee.Geometry.MultiPoint(gen1));
var gen2 = [114.263221,-8.273431942,114.4133937,-7.988666511,
114.4149571,-7.97881018,114.4037224,-7.957640864,
114.4027247,-7.953199707,113.9585753,-8.537895844,
114.263721,-8.273431942,114.176603,-8.344249605,
114.4209101,-7.982256001,114.4154571,-7.97881018,
114.4042224,-7.957640864,114.4032247,-7.953199707,
114.3919875,-8.146795515,114.4133937,-7.989166511,
114.4104198,-7.976735959,114.4027247,-7.953699707,
114.3780052,-7.930156708,114.3797138,-7.926546491,
114.4132012,-8.019525131,114.1790828,-8.411694887,
114.4109198,-7.976735959,114.4042224,-7.958140864,
114.4122164,-7.95527971,114.3957978,-7.942262787,
114.3957644,-7.979761655];
//var panenHijau = [];
var panenMuda = [114.1785828,-8.411194887,114.4138937,-7.988666511,
114.1785828,-8.411694887,114.1705639,-8.376147712];
//Map.addLayer(ee.Geometry.MultiPoint(panen));
var panenPipilan = [114.3188499,-8.237299333,114.1787715,-8.343293906,
114.3919875,-8.146295515,114.4313537,-8.029318891,
114.2515136,-8.401444316,114.3193499,-8.237299333,
114.3650897,-8.200508876,114.3924875,-8.146295515,
114.2174498,-8.535838403,114.4313537,-8.029818891,
114.4058535,-8.011659382,114.2179498,-8.535838403,
114.3924875,-8.146795515,114.4063535,-8.011659382,
114.4154571,-7.97931018];
//Map.addLayer(ee.Geometry.MultiPoint(panen));
var persiapanLahan = [114.3785052,-7.929656708,
114.0795691,-8.566834631
];
//Map.addLayer(ee.Geometry.MultiPoint(bera));
var bukanJagung = [114.1056472,-8.58893661,114.0496705,-8.575967192,
114.0701815,-8.570119747,114.0790691,-8.566334631,
113.9580753,-8.537895844,114.1709258,-8.578441455,
114.1169248,-8.572583996,114.1698127,-8.56953402,
114.1320265,-8.565969535,114.1232235,-8.535799511,
114.1192506,-8.519810232,114.2293577,-8.508254764,
114.2625366,-8.507459099,114.2443546,-8.534692271,
114.2909389,-8.568400594,114.3366701,-8.56728816,
114.3006577,-8.488679674,114.3025898,-8.457375344,
114.3277002,-8.420158443,114.3223798,-8.385457829,
114.2458933,-8.449799297,114.2623273,-8.424398521,
114.2226662,-8.416407556,114.2185055,-8.392387433,
114.189874,-8.433262716,114.1776226,-8.408537348,
114.1537077,-8.421607508,114.0997295,-8.415723945,
114.1080888,-8.389615794,114.0981401,-8.309426309,
114.0360188,-8.300129195,113.9734841,-8.312280913,
113.9688764,-8.307022431,114.1705639,-8.375647712,
114.1352134,-8.321971939,114.2727208,-8.408967526,
114.2851634,-8.404205848,114.3173888,-8.401651492,
114.2510136,-8.401444316,114.2938049,-8.353093687,
114.3353296,-8.364610005,114.3145675,-8.358852742,
114.2621029,-8.302039387,114.2555554,-8.290581563,
114.176103,-8.344249605,114.143491,-8.292295883,
114.1572038,-8.187448613,114.2941765,-8.217335695,
114.3226772,-8.209526285,114.2442718,-8.191699705,
114.2349175,-8.174944516,114.3645897,-8.200508876,
114.3448622,-8.20007788,114.3402783,-8.195720241,
114.3434206,-8.176894691,114.387384,-8.141045955,
114.4193432,-8.013526926,114.3777026,-7.955556363,
114.4097211,-7.945897596,114.3952978,-7.941762787,
114.3762558,-7.931482167,114.3780052,-7.929656708,
114.3797138,-7.926046491,114.1061472,-8.58893661,
114.0501705,-8.575967192,114.0706815,-8.570119747,
114.0795691,-8.566334631,114.1714258,-8.578441455,
114.1174248,-8.572583996,114.1703127,-8.56953402,
114.1325265,-8.565969535,114.1237235,-8.535799511,
114.1197506,-8.519810232,114.2630366,-8.507459099,
114.3371701,-8.56728816,114.3011577,-8.488679674,
114.3030898,-8.457375344,114.3282002,-8.420158443,
114.2463933,-8.449799297,114.2231662,-8.416407556,
114.2190055,-8.392387433,114.190374,-8.433262716,
114.1790828,-8.411194887,114.1781226,-8.408537348,
114.1542077,-8.421607508,114.1085888,-8.389615794,
114.0986401,-8.309426309,114.0365188,-8.300129195,
113.9693764,-8.307022431,114.1710639,-8.375647712,
114.1357134,-8.321971939,114.2732208,-8.408967526,
114.3178888,-8.401651492,114.2934726,-8.355792681,
114.2943049,-8.353093687,114.3358296,-8.364610005,
114.3150675,-8.358852742,114.2626029,-8.302039387,
114.2560554,-8.290581563,114.143991,-8.292295883,
114.1577038,-8.187448613,114.2946765,-8.217335695,
114.2447718,-8.191699705,114.3453622,-8.20007788,
114.3407783,-8.195720241,114.3449002,-8.180443662,
114.387884,-8.141045955,114.4318537,-8.029318891,
114.4198432,-8.013526926,114.3782026,-7.955556363,
114.4122164,-7.95477971,114.4102211,-7.945897596,
114.3788728,-7.945719701,114.3957978,-7.941762787,
114.1056472,-8.58943661,114.0701815,-8.570619747,
114.0790691,-8.566834631,113.9580753,-8.538395844,
114.1253436,-8.58717972,114.1709258,-8.578941455,
114.1698127,-8.57003402,114.1320265,-8.566469535,
114.1232235,-8.536299511,114.1805904,-8.533147035,
114.2293577,-8.508754764,114.2625366,-8.507959099,
114.2443546,-8.535192271,114.3366701,-8.56778816,
114.3006577,-8.489179674,114.3025898,-8.457875344,
114.3277002,-8.420658443,114.3223798,-8.385957829,
114.2458933,-8.450299297,114.2623273,-8.424898521,
114.2226662,-8.416907556,114.2185055,-8.392887433,
114.1776226,-8.409037348,114.1537077,-8.422107508,
114.0997295,-8.416223945,114.1229424,-8.411213738,
114.1080888,-8.390115794,114.0981401,-8.309926309,
114.0360188,-8.300629195,113.9734841,-8.312780913,
113.9688764,-8.307522431,114.1352134,-8.322471939,
114.2727208,-8.409467526,114.2851634,-8.404705848,
114.3173888,-8.402151492,114.2510136,-8.401944316,
114.2929726,-8.356292681,114.2938049,-8.353593687,
114.3145675,-8.359352742,114.263221,-8.273931942,
114.3188499,-8.237799333,114.2621029,-8.302539387,
114.2555554,-8.291081563,114.176103,-8.344749605,
114.143491,-8.292795883,114.1572038,-8.187948613,
114.2442718,-8.192199705,114.2349175,-8.175444516,
114.3645897,-8.201008876,114.3448622,-8.20057788,
114.3402783,-8.196220241,114.3444002,-8.180943662,
114.3434206,-8.177394691,114.387384,-8.141545955,
114.4193432,-8.014026926,114.4037224,-7.958140864,
114.3777026,-7.956056363,114.3783728,-7.946219701,
114.3952978,-7.942262787,114.1061472,-8.58943661,
114.0501705,-8.576467192,114.0706815,-8.570619747,
113.9585753,-8.538395844,114.1258436,-8.58717972,
114.1714258,-8.578941455,114.1703127,-8.57003402,
114.1325265,-8.566469535,114.1237235,-8.536299511,
114.1197506,-8.520310232,114.2298577,-8.508754764,
114.2448546,-8.535192271,114.3371701,-8.56778816,
114.3011577,-8.489179674,114.3030898,-8.457875344,
114.3282002,-8.420658443,114.3228798,-8.385957829,
114.2463933,-8.450299297,114.2231662,-8.416907556,
114.2190055,-8.392887433,114.1781226,-8.409037348,
114.1542077,-8.422107508,114.1002295,-8.416223945,
114.1085888,-8.390115794,114.0986401,-8.309926309,
113.9693764,-8.307522431,114.1710639,-8.376147712,
114.1357134,-8.322471939,114.2732208,-8.409467526,
114.3178888,-8.402151492,114.2934726,-8.356292681,
114.2943049,-8.353593687,114.3150675,-8.359352742,
114.263721,-8.273931942,114.3193499,-8.237799333,
114.2626029,-8.302539387,114.2560554,-8.291081563,
114.1802732,-8.348237363,114.1792715,-8.343793906,
114.1895251,-8.322113948,114.143991,-8.292795883,
114.1577038,-8.187948613,114.2946765,-8.217835695,
114.2447718,-8.192199705,114.2354175,-8.175444516,
114.348914,-8.237105653,114.3650897,-8.201008876,
114.3453622,-8.20057788,114.3407783,-8.196220241,
114.387884,-8.141545955,114.4318537,-8.029818891,
114.4198432,-8.014026926,114.3979773,-7.959176404,
114.3782026,-7.956056363,114.3761874,-7.946280829,
114.3788728,-7.946219701,114.3802138,-7.926546491];
var bukanLahan = [114.1253436,-8.58667972,114.160374,-8.400008626,
114.1229424,-8.410713738,114.1797732,-8.347737363,
114.3974773,-7.958676404,114.3783728,-7.945719701,
114.4158632,-7.940400679,114.1258436,-8.58667972,
114.1810904,-8.532647035,114.160874,-8.400008626,
114.1234424,-8.410713738,114.2861534,-8.349714192,
114.1802732,-8.347737363,114.1792715,-8.343293906,
114.3231772,-8.209526285,114.2354175,-8.174944516,
114.3439206,-8.176894691,114.3851554,-8.139323909,
114.3979773,-7.958676404,114.4163632,-7.940400679,
114.1169248,-8.573083996,114.160374,-8.400508626,
114.1797732,-8.348237363,114.2941765,-8.217835695,
114.348414,-8.237105653,114.4268571,-8.029030144,
114.4149571,-7.97931018,114.3756874,-7.946280829,
114.4158632,-7.940900679,114.1174248,-8.573083996,
114.1810904,-8.533147035,114.329303,-8.466175716,
114.160874,-8.400508626,114.1234424,-8.411213738,
114.2856634,-8.404705848,114.2515136,-8.401944316,
114.3231772,-8.210026285,114.3449002,-8.180943662,
114.4138937,-7.989166511,114.4163632,-7.940900679,
114.3767558,-7.931982167,114.4137012,-8.019525131];
//var puso = [];
var features = [
  ee.Feature(ee.Geometry.MultiPoint(veg1), {tutupan:1}),
  ee.Feature(ee.Geometry.MultiPoint(veg2), {tutupan:1}),
  ee.Feature(ee.Geometry.MultiPoint(gen1), {tutupan:1}),
  ee.Feature(ee.Geometry.MultiPoint(gen2), {tutupan:1}),
  //ee.Feature(ee.Geometry.MultiPoint(panenHijau), {tutupan:1}),
  ee.Feature(ee.Geometry.MultiPoint(panenMuda), {tutupan:1}),
  ee.Feature(ee.Geometry.MultiPoint(panenPipilan), {tutupan:1}),
  ee.Feature(ee.Geometry.MultiPoint(persiapanLahan), {tutupan:1}),
  ee.Feature(ee.Geometry.MultiPoint(bukanJagung), {tutupan:2}),
  ee.Feature(ee.Geometry.MultiPoint(bukanLahan), {tutupan:3})
  //ee.Feature(ee.Geometry.MultiPoint(puso), {tutupan:1})
];
var fromList = ee.FeatureCollection(features);
//print(fromList);
//Map.addLayer(fromList,'fitur');
// Function to cloud mask from the Fmask band of Landsat 8 SR data.
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = ee.Number(2).pow(3).int();
  var cloudsBitMask = ee.Number(2).pow(5).int();
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  //Return the masked image, scaled to [0, 1].
  return image.updateMask(mask).divide(10000);
}
function addBands(image){
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  var ndbi = image.normalizedDifference(['B3', 'B6']).rename('NDBI');
  var ndwi = image.normalizedDifference(['B6', 'B5']).rename('NDWI');
  var evi = image.expression(
    "((b('B2') < b('B5')) || (b('B4') < b('B2'))) ? 2.5 * ((NIR - RED) / (1+NIR + 6 * RED - 7.5 * BLUE )) : 1.5*(NIR-RED)/(0.5+NIR+RED)"
    ,{
    'NIR': image.select('B5'),
    'RED': image.select('B2'),
    'BLUE': image.select('B4')
    }
    ).rename('EVI');
  return image.addBands(ndvi).addBands(ndbi).addBands(ndwi).addBands(evi);
}
var l8sr = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
              .filterBounds(bwi)
              .filterDate('2019-03-01','2019-05-31')
              .map(maskL8sr).map(addBands);
var NDWI1=l8sr.select('NDWI');
var NDBI1=l8sr.select('NDBI');
var EVI1=l8sr.select('EVI');
var NDVI1=l8sr.select('NDVI');
var NDWIs = NDWI1.reduce(ee.Reducer.variance());
var NDBIs = NDBI1.reduce(ee.Reducer.variance());
var EVIs = EVI1.reduce(ee.Reducer.variance());
var NDVIs = NDVI1.reduce(ee.Reducer.variance());
//jika mau bulanan
//var imgList = ee.List([]);
//for (var month = 1; month <= 12; month = month + 1){
//var thisImage = l8sr.filter(ee.Filter.calendarRange(month,month,'month')).mean().clip(LBSbwi);
//imgList = imgList.add(thisImage);
//}
//var meanCollection = ee.ImageCollection(imgList);
var stat =  ee.Image.cat(l8sr.min(),l8sr.max(),l8sr.mean()).clip(LBS);
// Use these bands for prediction.
var bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6','B7','B10','B11','NDVI','EVI','NDWI','NDBI'];
//jika ditambahkan varian
//variabel prediktor
//var stat =  ee.Image.cat(Juni.min(),Juni.max(),Juni.mean(),
//            NDWIs,NDBIs,EVIs,NDVIs).clip(LBS);
//var bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6','B7','B10','B11','NDVI','EVI','NDWI','NDBI',
//             'NDWI_variance','NDBI_variance','NDVI_variance','EVI_variance'];
// Get the values for all pixels in each polygon in the training.
var training = stat.sampleRegions({
  // Get the sample from the polygons FeatureCollection.
  collection: fromList,
  // Keep this list of properties from the polygons.
  properties: ['tutupan'],
  // Set the scale to get Landsat pixels in the polygons.
  scale: 10
});
// Create a random forest classifier with custom parameters.
var classifier = ee.Classifier.smileRandomForest(100).train({
  features: training,
  classProperty: 'tutupan',
  inputProperties: bands
});
// Train the classifier.
var trained = classifier.train(training, 'tutupan', bands);
// Classify the image.
var classified = stat.classify(trained);
// Create a palette to display the classes.
var palette =['#2bff13','8b530d','#e92250'];
//jagung hijau muda
//bkn jagung coklat
//bukan lahan merah 
//
//
// Display the classification result and the input image.
Map.addLayer(classified, {min: 1, max: 3, palette: palette}, 'Jagung 2018');
//histogram
//print(ui.Chart.image.histogram(classified,features,900));
// Optionally, do some accuracy assessment.  Fist, add a column of
// random uniforms to the training dataset.
var withRandom = training.randomColumn('random');
// We want to reserve some of the data for testing, to avoid overfitting the model.
var split = 0.7;  // Roughly 70% training, 30% testing.
var trainingPartition = withRandom.filter(ee.Filter.lt('random', split));
var testingPartition = withRandom.filter(ee.Filter.gte('random', split));
// Trained with 70% of our data.
var trainedClassifier = ee.Classifier.smileRandomForest(100).train({
  features: trainingPartition,
  classProperty: 'tutupan',
  inputProperties: bands
});
// Classify the test FeatureCollection.
var test = testingPartition.classify(trainedClassifier);
// Print the confusion matrix.
var confusionMatrix = test.errorMatrix('tutupan', 'classification');
//print('Confusion Matrix', confusionMatrix);
//print('Validation overall accuracy: ', confusionMatrix.accuracy());
// Get a confusion matrix representing resubstitution accuracy.
var trainAccuracy = classifier.confusionMatrix();
//print('Resubstitution error matrix: ', trainAccuracy);
//print('Training overall accuracy: ', trainAccuracy.accuracy());
//make image into feature collection
var fcclassified = ee.FeatureCollection([classified]);
Export.image.toDrive({ 
  image: classified, 
  description: 'classified_jagung3kelas_mei', 
  scale: 30,
  maxPixels: 9e9,
  region: Bts_Banyuwangi});
  /////////
  function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  // Return the masked image, scaled to TOA reflectance, without the QA bands.
  // return image.updateMask(mask).divide(10000) // Reflektan dijadikan 0-1
     return image.updateMask(mask)  // Scaled Reflektan 0-10000
      .select("B[0-9]*") // Pilih Band Reflektan 1-7, and Suhu Brightness B10,B11 (dlm K, dikali 10)
      .copyProperties(image, ["system:time_start"]);
}
function addBands(image){
  // Index ndvi,ndbi,evi,ndwi direscale 1000
  var ndvi = image.normalizedDifference(['B5', 'B4']).multiply(1000).rename('NDVI');
  var ndbi = image.normalizedDifference(['B3', 'B6']).multiply(1000).rename('NDWI');
  var ndwi = image.normalizedDifference(['B6', 'B5']).multiply(1000).rename('NDBI');
  var evi = image.expression(
    "(RED < NIR || BLUE < RED) ? 1000*2.5*((NIR-RED)/(L+NIR+6*RED-7.5*BLUE)):1000*1.5*((NIR-RED)/(L/2+NIR+RED))"
    ,{
    NIR: image.select('B5'),
    RED: image.select('B2'),
    BLUE: image.select('B4'),
    L : 10000
    }
    ).rename('EVI');
  //return image.addBands(ndvi).addBands(ndbi).addBands(ndwi).addBands(evi).toUint16();
  return image.addBands(ndbi).addBands(ndvi).addBands(evi).addBands(ndwi).toInt16(); // Simpan dlm Int16 bit
}
var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR') 
    .filterDate('2018-01-01', '2019-06-30')
    .map(maskL8sr)
    .map(addBands)
    .select('EVI', 'NDWI', 'NDBI', 'NDVI');
//7 panen jagung pipilan
var kode71 = ee.Geometry.Point(114.4058535,-8.011659382).buffer(10);
var kode72 = ee.Geometry.Point(114.4133937,-7.989166511).buffer(10);
var kode73 = ee.Geometry.Point(114.4027247,-7.953699707).buffer(10);
var kode74 = ee.Geometry.Point(114.4037224,-7.958140864).buffer(10);
//8 persiapan lahan
var kode81 = ee.Geometry.Point(114.4313537,-8.029818891).buffer(10);
//9 bukan jagung
var kode91 = ee.Geometry.Point(114.4193432,-8.014026926).buffer(10);
var kode92 = ee.Geometry.Point(114.3777026,-7.956056363).buffer(10);
var kode93 = ee.Geometry.Point(114.4097211,-7.946397596).buffer(10);
var kode94 = ee.Geometry.Point(114.3952978,-7.942262787).buffer(10);
// Map.setCenter(114.22045,-8.332587, 10); 
var ser1=ui.Chart.image.series(collection, kode91, ee.Reducer.mean(), 30);
var ser2=ui.Chart.image.series(collection, kode92, ee.Reducer.mean(), 30);
var ser3=ui.Chart.image.series(collection, kode93, ee.Reducer.mean(), 30);
var ser4=ui.Chart.image.series(collection, kode94, ee.Reducer.mean(), 30);
//print(ser1, ser2, ser3,ser4);