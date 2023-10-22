var aoiGQ = ui.import && ui.import("aoiGQ", "table", {
      "id": "users/gismatsh/AOI_GQ"
    }) || ee.FeatureCollection("users/gismatsh/AOI_GQ"),
    aoiAzerbaijan = ui.import && ui.import("aoiAzerbaijan", "table", {
      "id": "users/gismatsh/AOI_Azerbaijan"
    }) || ee.FeatureCollection("users/gismatsh/AOI_Azerbaijan"),
    sample100 = ui.import && ui.import("sample100", "table", {
      "id": "users/gismatsh/ShakiSample"
    }) || ee.FeatureCollection("users/gismatsh/ShakiSample"),
    taxilGQ6 = ui.import && ui.import("taxilGQ6", "table", {
      "id": "users/gismatsh/GQ_1"
    }) || ee.FeatureCollection("users/gismatsh/GQ_1"),
    taxilGQ7 = ui.import && ui.import("taxilGQ7", "table", {
      "id": "users/gismatsh/GQ_2"
    }) || ee.FeatureCollection("users/gismatsh/GQ_2"),
    taxilGQ8 = ui.import && ui.import("taxilGQ8", "table", {
      "id": "users/gismatsh/GQ_3"
    }) || ee.FeatureCollection("users/gismatsh/GQ_3"),
    taxilGQ9 = ui.import && ui.import("taxilGQ9", "table", {
      "id": "users/gismatsh/GQ_4"
    }) || ee.FeatureCollection("users/gismatsh/GQ_4"),
    taxilGQ1 = ui.import && ui.import("taxilGQ1", "table", {
      "id": "users/gismatsh/GQ_AllCrop_6"
    }) || ee.FeatureCollection("users/gismatsh/GQ_AllCrop_6"),
    taxilGQ2 = ui.import && ui.import("taxilGQ2", "table", {
      "id": "users/gismatsh/GQ_AllCrop_7"
    }) || ee.FeatureCollection("users/gismatsh/GQ_AllCrop_7"),
    taxilGQ3 = ui.import && ui.import("taxilGQ3", "table", {
      "id": "users/gismatsh/GQ_AllCrop_8"
    }) || ee.FeatureCollection("users/gismatsh/GQ_AllCrop_8"),
    taxilGQ4 = ui.import && ui.import("taxilGQ4", "table", {
      "id": "users/gismatsh/GQ_AllCrop_9"
    }) || ee.FeatureCollection("users/gismatsh/GQ_AllCrop_9"),
    taxilGQ5 = ui.import && ui.import("taxilGQ5", "table", {
      "id": "users/gismatsh/GQ_AllCrop_10"
    }) || ee.FeatureCollection("users/gismatsh/GQ_AllCrop_10");
//Xəritə mərkəzini miqyası 13 olmaqla geometry ərazisinə gətirmək
Map.centerObject(aoiGQ, 8); 
//Nəticəni göstərərkən xəritə attributlarını rəngləmək üçün
var imageVisParam4 = {"min":-2,"max":2,"palette":["red","green","blue","yellow"]};
//CLOUD MASKING – Buludluluq 
function sentinel2toa(img) {
  var toa = img.select(['B2','B3','B4','B5','B6','B7','B8','B8A','B11','B12'],  
                       ['blue', 'green', 'red', 're1','re2','re3', 'nir','nir2', 'swir1', 'swir2'])
                       .divide(10000)
                       .addBands(img.select(['QA60']))
                       .set('solar_azimuth',img.get('MEAN_SOLAR_AZIMUTH_ANGLE'))
                       .set('solar_zenith',img.get('MEAN_SOLAR_ZENITH_ANGLE'))
    return toa;
}
function ESAcloud(toa) {
  var qa = toa.select('QA60');  
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = Math.pow(2, 10);
  var cirrusBitMask = Math.pow(2, 11);  
  // clear if both flags set to zero.
  var clear = qa.bitwiseAnd(cloudBitMask).eq(0);  
  var cloud = clear.eq(0);
  return cloud;
}
function shadowMask(toa,cloud){
  // solar geometry3 (radians)
  var azimuth =ee.Number(toa.get('solar_azimuth')).multiply(Math.PI).divide(180.0).add(ee.Number(0.5).multiply(Math.PI));
  var zenith  =ee.Number(0.5).multiply(Math.PI ).subtract(ee.Number(toa.get('solar_zenith')).multiply(Math.PI).divide(180.0));
  // find where cloud shadows should be based on solar geometry2
  var nominalScale = cloud.projection().nominalScale();
  var cloudHeights = ee.List.sequence(200,10000,500);
  var shadows = cloudHeights.map(function(cloudHeight){
    cloudHeight = ee.Number(cloudHeight);
    var shadowVector = zenith.tan().multiply(cloudHeight);
    var x = azimuth.cos().multiply(shadowVector).divide(nominalScale).round();
    var y = azimuth.sin().multiply(shadowVector).divide(nominalScale).round();
    return cloud.changeProj(cloud.projection(), cloud.projection().translate(x, y));
  });
  var potentialShadow = ee.ImageCollection.fromImages(shadows).max();  
  // shadows are not clouds
  potentialShadow = potentialShadow.and(cloud.not());  
  // (modified by Sam Murphy) dark pixel detection 
  var darkPixels = toa.normalizedDifference(['green', 'swir2']).gt(0.25).rename(['dark_pixels']);  
  // shadows are dark
  var shadow = potentialShadow.and(darkPixels).rename('shadows');  
  return shadow;
}
var S2 = ee.ImageCollection('COPERNICUS/S2')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 15))
  .filterBounds(aoiAzerbaijan); 
//Map.addLayer(clipRGB, {bands: ['red', 'green', 'blue'], min: 0, max: 0.3}, 'RGB')
// Run the cloud masking code
function cloud_and_shadow_mask(img) {
  var toa = sentinel2toa(img);
  var cloud = ESAcloud(toa);
  var shadow = shadowMask(toa,cloud);
  var mask = cloud.or(shadow).eq(0);  
  return toa.updateMask(mask);
}
function NDFI(image) {
  var B08 = image.select('nir');
  var B04 = image.select('red');
  var B02 = image.select('blue');
  var ndfi = (B08.subtract((B04.add(B04)).subtract(B02))).divide(B08.add((B04.add(B04)).subtract(B02))).rename('NDFI');
  return ndfi
}
// SENTINEL-2 image and display – samplelankaran layerinin sərhədi üzrə SENTİNEL-2 təsvir  
var S2_1112 = ee.ImageCollection('COPERNICUS/S2')
  .filterDate('2019-11-01', '2019-12-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
  .filterBounds(aoiGQ); 
var S2_04 = ee.ImageCollection('COPERNICUS/S2')
  .filterDate('2020-03-01', '2020-04-30')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .filterBounds(aoiGQ); 
var S2_05 = ee.ImageCollection('COPERNICUS/S2')
  .filterDate('2020-05-01', '2020-05-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .filterBounds(aoiGQ); 
var S2_06_1 = ee.ImageCollection('COPERNICUS/S2')
  .filterDate('2020-06-01', '2020-06-20')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .filterBounds(aoiGQ); 
var S2_06_2 = ee.ImageCollection('COPERNICUS/S2')
  .filterDate('2020-06-20', '2020-07-19')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 15))
  .filterBounds(aoiGQ); 
var masked_1112 = S2_1112.map(cloud_and_shadow_mask);
var masked_04 = S2_04.map(cloud_and_shadow_mask);
var masked_05 = S2_05.map(cloud_and_shadow_mask);
var masked_06_1 = S2_06_1.map(cloud_and_shadow_mask);
var masked_06_2 = S2_06_2.map(cloud_and_shadow_mask);
var PercentilesS1112  = masked_1112.reduce(ee.Reducer.percentile([25,50,75,90]));
var PercentilesS2_04  = masked_04.reduce(ee.Reducer.percentile([25,50,75,90]));
var PercentilesS2_05  = masked_05.reduce(ee.Reducer.percentile([25,50,75,90]));
var PercentilesS2_06_1  = masked_06_1.reduce(ee.Reducer.percentile([25,50,75,90]));
var PercentilesS2_06_2  = masked_06_2.reduce(ee.Reducer.percentile([25,50,75,90]));
var S1112 = PercentilesS1112.select('red_p25','green_p25','blue_p25','nir_p25', 'red_p50',
'green_p50','blue_p50','nir_p50','red_p75','green_p75','blue_p75','nir_p75','red_p90','green_p90','blue_p90','nir_p90');
var S2_04 = PercentilesS2_04.select('red_p25','green_p25','blue_p25','nir_p25', 'red_p50',
'green_p50','blue_p50','nir_p50','red_p75','green_p75','blue_p75','nir_p75','red_p90','green_p90','blue_p90','nir_p90');
var S2_05 = PercentilesS2_05.select('red_p25','green_p25','blue_p25','nir_p25', 'red_p50',
'green_p50','blue_p50','nir_p50','red_p75','green_p75', 'blue_p75','nir_p75','red_p90','green_p90','blue_p90','nir_p90');
var S2_06_1 = PercentilesS2_06_1.select('red_p25','green_p25','blue_p25','nir_p25', 'red_p50',
'green_p50','blue_p50','nir_p50','red_p75','green_p75', 'blue_p75','nir_p75','red_p90','green_p90','blue_p90','nir_p90');
var S2_06_2 = PercentilesS2_06_2.select('red_p25','green_p25','blue_p25','nir_p25', 'red_p50',
'green_p50','blue_p50','nir_p50','red_p75','green_p75', 'blue_p75','nir_p75','red_p90','green_p90','blue_p90','nir_p90');
var Selected_tiles = S1112.addBands(S2_04).addBands(S2_05).addBands(S2_06_1).addBands(S2_06_2);
var Selected_tiles_clip1 = Selected_tiles.clip(taxilGQ1)
var Selected_tiles_clip2 = Selected_tiles.clip(taxilGQ2)
var Selected_tiles_clip3 = Selected_tiles.clip(taxilGQ3)
var Selected_tiles_clip4 = Selected_tiles.clip(taxilGQ4)
var Selected_tiles_clip5 = Selected_tiles.clip(taxilGQ5)
var Selected_tiles_clip6 = Selected_tiles.clip(taxilGQ6)
var Selected_tiles_clip7 = Selected_tiles.clip(taxilGQ7)
var Selected_tiles_clip8 = Selected_tiles.clip(taxilGQ8)
var Selected_tiles_clip9 = Selected_tiles.clip(taxilGQ9)
var Selected_tiles_clipValid = Selected_tiles.clip(sample100)
print(' Selected_tiles_clip', Selected_tiles_clip1);
// training nümunələrin hazırlanması
var training1 = Selected_tiles_clip1.sampleRegions ({
  collection: taxilGQ1, // nümunələr olan təbəqənin adı
  properties: ['gridcode'], //attribut cədvəldə taxıl və digər əkin olduğunu göstərən sütun adı
  scale: 10, //hansı pixel ölçüsünə görə öyrənir
  geometries: true,
  tileScale: 16
});
var training2 = Selected_tiles_clip2.sampleRegions ({
  collection: taxilGQ2, // nümunələr olan təbəqənin adı
  properties: ['gridcode'], //attribut cədvəldə taxıl və digər əkin olduğunu göstərən sütun adı
  scale: 10, //hansı pixel ölçüsünə görə öyrənir
  geometries: true,
  tileScale: 16
});
var training3 = Selected_tiles_clip3.sampleRegions ({
  collection: taxilGQ3, // nümunələr olan təbəqənin adı
  properties: ['gridcode'], //attribut cədvəldə taxıl və digər əkin olduğunu göstərən sütun adı
  scale: 10, //hansı pixel ölçüsünə görə öyrənir
  geometries: true,
  tileScale: 16
});
var training4 = Selected_tiles_clip4.sampleRegions ({
  collection: taxilGQ4, // nümunələr olan təbəqənin adı
  properties: ['gridcode'], //attribut cədvəldə taxıl və digər əkin olduğunu göstərən sütun adı
  scale: 10, //hansı pixel ölçüsünə görə öyrənir
  geometries: true,
  tileScale: 16
});
var training5 = Selected_tiles_clip5.sampleRegions ({
  collection: taxilGQ5, // nümunələr olan təbəqənin adı
  properties: ['gridcode'], //attribut cədvəldə taxıl və digər əkin olduğunu göstərən sütun adı
  scale: 10, //hansı pixel ölçüsünə görə öyrənir
  geometries: true,
  tileScale: 16
});
var training6 = Selected_tiles_clip6.sampleRegions ({
  collection: taxilGQ6, // nümunələr olan təbəqənin adı
  properties: ['gridcode'], //attribut cədvəldə taxıl və digər əkin olduğunu göstərən sütun adı
  scale: 10, //hansı pixel ölçüsünə görə öyrənir
  geometries: true,
  tileScale: 16
});
var training7 = Selected_tiles_clip7.sampleRegions ({
  collection: taxilGQ7, // nümunələr olan təbəqənin adı
  properties: ['gridcode'], //attribut cədvəldə taxıl və digər əkin olduğunu göstərən sütun adı
  scale: 10, //hansı pixel ölçüsünə görə öyrənir
  geometries: true,
  tileScale: 16
});
var training8 = Selected_tiles_clip8.sampleRegions ({
  collection: taxilGQ8, // nümunələr olan təbəqənin adı
  properties: ['gridcode'], //attribut cədvəldə taxıl və digər əkin olduğunu göstərən sütun adı
  scale: 10, //hansı pixel ölçüsünə görə öyrənir
  geometries: true,
  tileScale: 16
});
var training9 = Selected_tiles_clip9.sampleRegions ({
  collection: taxilGQ9, // nümunələr olan təbəqənin adı
  properties: ['gridcode'], //attribut cədvəldə taxıl və digər əkin olduğunu göstərən sütun adı
  scale: 10, //hansı pixel ölçüsünə görə öyrənir
  geometries: true,
  tileScale: 16
});
var validation = Selected_tiles_clipValid.sampleRegions ({
  collection: sample100, // nümunələr olan təbəqənin adı
  properties: ['gridcode'], //attribut cədvəldə taxıl və digər əkin olduğunu göstərən sütun adı
  scale: 10, //hansı pixel ölçüsünə görə öyrənir
tileScale: 16
});
//print("training5", training5)
var classifier1 = ee.Classifier.smileRandomForest(1000).train({
  features: training1,
  classProperty: 'gridcode',
  inputProperties: Selected_tiles_clip1.bandNames()
  });
var classifier2 = classifier1.train({
  features: training2,
  classProperty: 'gridcode',
  inputProperties: Selected_tiles_clip2.bandNames()
  });
var classifier3 = classifier2.train({
  features: training3,
  classProperty: 'gridcode',
  inputProperties: Selected_tiles_clip3.bandNames()
  });
var classifier4 = classifier3.train({
  features: training4,
  classProperty: 'gridcode',
  inputProperties: Selected_tiles_clip4.bandNames()
  });
var classifier5 = classifier4.train({
  features: training5,
  classProperty: 'gridcode',
  inputProperties: Selected_tiles_clip5.bandNames()
  });
var classifier6 = classifier5.train({
  features: training6,
  classProperty: 'gridcode',
  inputProperties: Selected_tiles_clip6.bandNames()
  });
var classifier7 = classifier6.train({
  features: training7,
  classProperty: 'gridcode',
  inputProperties: Selected_tiles_clip7.bandNames()
  });
var classifier8 = classifier7.train({
  features: training8,
  classProperty: 'gridcode',
  inputProperties: Selected_tiles_clip8.bandNames()
  });
var classifier9 = classifier8.train({
  features: training9,
  classProperty: 'gridcode',
  inputProperties: Selected_tiles_clip9.bandNames()
  });
// Use the start of the collection and now to bound the slider.
var start = ee.Date('2001-01-01').get('year').format();
var now = Date.now();
var end = ee.Date(now).get('year').format();
// Asynchronously compute the date range and show the slider.
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 365, //<= I would like to change this to monthly or semi-monthly
    onChange: showMosaic
  });
  Map.add(dateSlider.setValue(now));
});
var showMosaic = function(range) {
  // Asynchronously compute the name of the composite.  Display it.
  range.start().get('year').evaluate(function(name) {
     //print(name)
    var removeLayer = function(namm) {
      //print(namm)
  var layers = Map.layers()
  // list of layers names
  var names = []
  layers.forEach(function(lay) {
    var lay_name = lay.getName()
    names.push(lay_name)
  })
  // get index
  var index = names.indexOf(namm)
  if (index > -1) {
    // if name in names
    var layer = layers.get(index)
    Map.remove(layer)
  } else {
    print('Layer '+name+' not found')
  }
}
    var yea = range.start().get('year').subtract(2);
    var year = range.start().get('year').subtract(1);
    //print(ee.String(yea).cat('-11-01'));
    var collection = ee.ImageCollection('COPERNICUS/S2')
    .filterDate(ee.String(year).cat('-07-01'), ee.String(year).cat('-07-30'))
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5))
    .map(cloud_and_shadow_mask);//.select(['red', 'green', 'blue', 'nir']);
    var composite = collection.median()
    var clipRGBs = composite.select(['red', 'green', 'blue', 'nir']).clip(aoiGQ)
    Map.addLayer(clipRGBs, {bands: ['red', 'green', 'blue'], min: 0, max: 0.3}, 'RGB')
    var S2_n = ee.ImageCollection('COPERNICUS/S2')
    .filterDate(ee.String(yea).cat('-11-01'), ee.String(yea).cat('-12-31'))
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
    .filterBounds(aoiGQ); 
    var S2_n04 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate(ee.String(year).cat('-03-01'), ee.String(year).cat('-04-30'))
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .filterBounds(aoiGQ); 
    var S2_n05 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate(ee.String(year).cat('-05-01'), ee.String(year).cat('-05-31'))
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .filterBounds(aoiGQ); 
    var S2_n06_1 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate(ee.String(year).cat('-06-01'), ee.String(year).cat('-06-20'))
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .filterBounds(aoiGQ); 
    var S2_n06_2 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate(ee.String(year).cat('-06-20'), ee.String(year).cat('-07-19'))
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 15))
    .filterBounds(aoiGQ); 
    var masked_n = S2_n.map(cloud_and_shadow_mask);
    var masked_n04 = S2_n04.map(cloud_and_shadow_mask);
    var masked_n05 = S2_n05.map(cloud_and_shadow_mask);
    var masked_n06_1 = S2_n06_1.map(cloud_and_shadow_mask);
    var masked_n06_2 = S2_n06_2.map(cloud_and_shadow_mask);
    var PercentilesSn  = masked_n.reduce(ee.Reducer.percentile([25,50,75,90]));
    var PercentilesS2_n04  = masked_n04.reduce(ee.Reducer.percentile([25,50,75,90]));
    var PercentilesS2_n05  = masked_n05.reduce(ee.Reducer.percentile([25,50,75,90]));
    var PercentilesS2_n06_1  = masked_n06_1.reduce(ee.Reducer.percentile([25,50,75,90]));
    var PercentilesS2_n06_2  = masked_n06_2.reduce(ee.Reducer.percentile([25,50,75,90]));
    var Sn = PercentilesSn.select('red_p25','green_p25','blue_p25','nir_p25', 'red_p50',
    'green_p50','blue_p50','nir_p50','red_p75','green_p75','blue_p75','nir_p75','red_p90','green_p90','blue_p90','nir_p90');
    var S2n_n04 = PercentilesS2_n04.select('red_p25','green_p25','blue_p25','nir_p25', 'red_p50',
    'green_p50','blue_p50','nir_p50','red_p75','green_p75','blue_p75','nir_p75','red_p90','green_p90','blue_p90','nir_p90');
    var S2n_n05 = PercentilesS2_n05.select('red_p25','green_p25','blue_p25','nir_p25', 'red_p50',
    'green_p50','blue_p50','nir_p50','red_p75','green_p75', 'blue_p75','nir_p75','red_p90','green_p90','blue_p90','nir_p90');
    var S2n_n06_1 = PercentilesS2_n06_1.select('red_p25','green_p25','blue_p25','nir_p25', 'red_p50',
    'green_p50','blue_p50','nir_p50','red_p75','green_p75', 'blue_p75','nir_p75','red_p90','green_p90','blue_p90','nir_p90');
    var S2n_n06_2 = PercentilesS2_n06_2.select('red_p25','green_p25','blue_p25','nir_p25', 'red_p50',
    'green_p50','blue_p50','nir_p50','red_p75','green_p75', 'blue_p75','nir_p75','red_p90','green_p90','blue_p90','nir_p90');
    var Selected_tiles_n = Sn.addBands(S2n_n04).addBands(S2n_n05).addBands(S2n_n06_1).addBands(S2n_n06_2);
    // Nəticənin vizuallaşması üçün parametrlərin daxil edilməsi
    var Selected_tilen = Selected_tiles_n.clip(aoiGQ)
    var classified_n = Selected_tilen.select(Selected_tilen.bandNames()).classify(classifier5)
    //Modellərin öyrənməsinin geometry layeri sərhədi üzrə vizuallaşması
    var imageVisParm = {"min":-2,"max":25,"palette":["red","yellow","green", "blue"]};
    Map.addLayer(classified_n, imageVisParm, 'LULC_1')
  });
};
// create error matrix and accuracies
var testAcc = validation.classify(classifier5)
var confMat = testAcc.errorMatrix({
  actual: "gridcode",
  predicted: "classification"})
//Test nəticəsini və conf matrix-in console bölmədə görsənməsi
//print('testAcc', testAcc)
//print('confMat', confMat)
// Accuracie-ni cədvəl formasında hazırlanması
var accuracies = ee.FeatureCollection([
  ee.Feature(null, {
    "OA": confMat.accuracy(),
    "PA": confMat.producersAccuracy(),
    "kP": confMat.kappa(),
    "UA": confMat.consumersAccuracy()}) ])
// Accuracie cədvəlin console bölməsində görsənməsi
print('accuracies', accuracies)
var testAccuracy = testAcc.errorMatrix('gridcode', 'classification')
var exportAccuracy = ee.Feature(null, {matrix: testAccuracy.array()})
// ------------------------ Export_classification_output---------------------------------//
var collectionImg = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2017-07-01', '2017-07-30')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5))
    .map(cloud_and_shadow_mask);//.select(['red', 'green', 'blue', 'nir']);
var img = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_044034_20140318');    
var composite = collectionImg.median()
var clipRGBs = composite.select(['red', 'green', 'blue', 'nir']).clip(aoiGQ);
    //print('GQ_RGB_'+ee.String(yea))
Export.image.toDrive({
     image:  clipRGBs,
     description: 'GQ_RGB_',
     scale: 10,
     region: aoiGQ,
     maxPixels: 10e9
    });
function runTaskList(){
    var tasklist = document.getElementsByClassName('task local type-EXPORT_IMAGE awaiting-user-config');
    for (var i = 0; i < tasklist.length; i++)
            tasklist[i].getElementsByClassName('run-button')[0].click();
}
function confirmAll() {
    var ok = document.getElementsByClassName('goog-buttonset-default goog-buttonset-action');
    for (var i = 0; i < ok.length; i++)
        ok[i].click();
}
//runTaskList();
//confirmAll();
function downloadImg() {
  var viewBounds = ee.Geometry.Rectangle(Map.getBounds());
  print("get");
  var downloadArgs = {
    name: 'ee_image',
    crs: 'EPSG:3857',
    scale: 130,
    region: viewBounds.toGeoJSONString()
 };
 var url = composite.getDownloadURL(downloadArgs);
 urlLabel.setUrl(url);
 urlLabel.style().set({shown: true});
}
var batch = require('users/fitoprincipe/geetools:batch')
var col = ee.ImageCollection("LEDAPS/LE7_L1T_SR").filterDate("2002-01-01","2002-01-03");
function downloadImgB() {
  https://content-earthengine.googleapis.com/v1alpha/projects/earthengine-legacy:listAssets?key=AIzaSyCIdO53SBE0yrw3mmxBnfF3HeIIj316gA0
  batch.Download.ImageCollection.toDrive(collectionImg, "", {scale:30});
}
// Add UI elements to the Map.
var downloadButton = ui.Button('Download viewport', downloadImg);
var urlLabel = ui.Label('Download', {shown: false});
var panel = ui.Panel([downloadButton, urlLabel]);
Map.add(panel);