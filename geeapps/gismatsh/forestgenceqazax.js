/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var aoiAzerbaijan = ee.FeatureCollection("users/gismatsh/AOI_Azerbaijan"),
    sample100 = ee.FeatureCollection("users/gismatsh/ShakiSample"),
    aoiGQ = ee.FeatureCollection("users/gismatsh/AOI_GQ"),
    forestGQ1 = ee.FeatureCollection("users/gismatsh/GQ_1"),
    forestGQ2 = ee.FeatureCollection("users/gismatsh/GQ_2"),
    forestGQ3 = ee.FeatureCollection("users/gismatsh/GQ_3"),
    forestGQ4 = ee.FeatureCollection("users/gismatsh/GQ_4"),
    forestGQ5 = ee.FeatureCollection("users/gismatsh/GQ_5"),
    forestGQ6 = ee.FeatureCollection("users/gismatsh/GQ_6"),
    forestGQ7 = ee.FeatureCollection("users/gismatsh/GQ_7"),
    forestGQ8 = ee.FeatureCollection("users/gismatsh/GQ_8");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
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
// Run the cloud masking code
function cloud_and_shadow_mask(img) {
  var toa = sentinel2toa(img);
  var cloud = ESAcloud(toa);
  var shadow = shadowMask(toa,cloud);
  var mask = cloud.or(shadow).eq(0);  
  return toa.updateMask(mask);
}
// SENTINEL-2 image and display – samplelankaran layerinin sərhədi üzrə SENTİNEL-2 təsvir  
var S2 = ee.ImageCollection('COPERNICUS/S2')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 15))
  .filterBounds(aoiAzerbaijan); 
var masked = S2.map(cloud_and_shadow_mask);
// Use the start of the collection and now to bound the slider.
var start = ee.Image(S2.first()).date().get('year').format();
var now = Date.now();
var end = ee.Date(now).format();
// Run this function on a change of the dateSlider.
var showMosaic = function(range) {
  var mosaic = ee.Algorithms.Landsat.simpleComposite({
    collection: S2.filterDate(range.start(), range.end())
  });
  // Asynchronously compute the name of the composite.  Display it.
  range.start().get('year').evaluate(function(name) {
    var visParams = {bands: ['B4', 'B3', 'B2'], max: 100};
    var layer = ui.Map.Layer(mosaic, visParams, name + ' composite');
    Map.layers().set(0, layer);
  });
};
// Asynchronously compute the date range and show the slider.
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 30, //<= I would like to change this to monthly or semi-monthly
    onChange: showMosaic
  });
  Map.add(dateSlider.setValue(now));
});
function NDFI(image) {
  var B08 = image.select('nir');
  var B04 = image.select('red');
  var B02 = image.select('blue');
  //var y = 1;
  var ndfi = (B08.subtract((B04.add(B04)).subtract(B02))).divide(B08.add((B04.add(B04)).subtract(B02))).rename('NDFI');
  return ndfi
}
var PercentilesS2 = masked.reduce(ee.Reducer.percentile([10,25,50,75,90]))
// Tile-ların hazırlanması
var S2_tile = PercentilesS2.select('red_p10','green_p10','blue_p10', 'nir_p10',
'red_p25','green_p25','blue_p25', 'nir_p25',
'red_p50','green_p50','blue_p50', 'nir_p50',
'red_p75','green_p75','blue_p75', 'nir_p75',
'red_p90','green_p90','blue_p90', 'nir_p90');
var Selected_tiles = S2_tile
var compositeRGB = masked.median()
var clipRGB = compositeRGB.clip(aoiGQ)
// RGB təsvirin xəritədə vizuallaşması  
Map.addLayer(clipRGB, {bands: ['red', 'green', 'blue', ], min: 0, max: 0.3}, 'RGB')
//İstifadə olunacaq bəndlərin seçilməsi
var Selected_tiles_clip1 = Selected_tiles.clip(forestGQ1)
var Selected_tiles_clip2 = Selected_tiles.clip(forestGQ2)
var Selected_tiles_clip3 = Selected_tiles.clip(forestGQ3)
var Selected_tiles_clip4 = Selected_tiles.clip(forestGQ4)
var Selected_tiles_clip5 = Selected_tiles.clip(forestGQ5)
var Selected_tiles_clip6 = Selected_tiles.clip(forestGQ6)
var Selected_tiles_clip7 = Selected_tiles.clip(forestGQ7)
var Selected_tiles_clip8 = Selected_tiles.clip(forestGQ8)
var Selected_tiles_clipValid = Selected_tiles.clip(sample100)
print(' Selected_tiles_clip', Selected_tiles_clip1);
// training nümunələrin hazırlanması
var training1 = Selected_tiles_clip1.sampleRegions ({
  collection: forestGQ1, // nümunələr olan təbəqənin adı
  properties: ['gridcode'], //attribut cədvəldə taxıl və digər əkin olduğunu göstərən sütun adı
  scale: 10, //hansı pixel ölçüsünə görə öyrənir
  geometries: true,
  tileScale: 16
});
var training2 = Selected_tiles_clip2.sampleRegions ({
  collection: forestGQ2, // nümunələr olan təbəqənin adı
  properties: ['gridcode'], //attribut cədvəldə taxıl və digər əkin olduğunu göstərən sütun adı
  scale: 10, //hansı pixel ölçüsünə görə öyrənir
  geometries: true,
  tileScale: 16
});
var training3 = Selected_tiles_clip3.sampleRegions ({
  collection: forestGQ3, // nümunələr olan təbəqənin adı
  properties: ['gridcode'], //attribut cədvəldə taxıl və digər əkin olduğunu göstərən sütun adı
  scale: 10, //hansı pixel ölçüsünə görə öyrənir
  geometries: true,
  tileScale: 16
});
var training4 = Selected_tiles_clip4.sampleRegions ({
  collection: forestGQ4, // nümunələr olan təbəqənin adı
  properties: ['gridcode'], //attribut cədvəldə taxıl və digər əkin olduğunu göstərən sütun adı
  scale: 10, //hansı pixel ölçüsünə görə öyrənir
  geometries: true,
  tileScale: 16
});
var training5 = Selected_tiles_clip5.sampleRegions ({
  collection: forestGQ5, // nümunələr olan təbəqənin adı
  properties: ['gridcode'], //attribut cədvəldə taxıl və digər əkin olduğunu göstərən sütun adı
  scale: 10, //hansı pixel ölçüsünə görə öyrənir
  geometries: true,
  tileScale: 16
});
var training6 = Selected_tiles_clip6.sampleRegions ({
  collection: forestGQ6, // nümunələr olan təbəqənin adı
  properties: ['gridcode'], //attribut cədvəldə taxıl və digər əkin olduğunu göstərən sütun adı
  scale: 10, //hansı pixel ölçüsünə görə öyrənir
  geometries: true,
  tileScale: 16
});
var training7 = Selected_tiles_clip7.sampleRegions ({
  collection: forestGQ7, // nümunələr olan təbəqənin adı
  properties: ['gridcode'], //attribut cədvəldə taxıl və digər əkin olduğunu göstərən sütun adı
  scale: 10, //hansı pixel ölçüsünə görə öyrənir
  geometries: true,
  tileScale: 16
});
var training8 = Selected_tiles_clip8.sampleRegions ({
  collection: forestGQ8, // nümunələr olan təbəqənin adı
  properties: ['gridcode'], //attribut cədvəldə taxıl və digər əkin olduğunu göstərən sütun adı
  scale: 10, //hansı pixel ölçüsünə görə öyrənir
  geometries: true,
  tileScale: 16
});
// validation nümunələrin hazırlanması
var validation = Selected_tiles_clipValid.sampleRegions ({
  collection: sample100, // nümunələr olan təbəqənin adı
  properties: ['gridcode'], //attribut cədvəldə taxıl və digər əkin olduğunu göstərən sütun adı
  scale: 10, //hansı pixel ölçüsünə görə öyrənir
tileScale: 16
});
// validation və training nümunələrin console pəncərəsinə çıxarılması
print('training', training6)
print('training2', training5)
//RandomForest modeli üzrə öyrədilməsi
var classifier1 = ee.Classifier.smileRandomForest(300).train({
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
//Map.addLayer(clipRGB, {bands: ['red', 'green', 'blue', ], min: 0, max: 0.3}, 'RGB')
// Nəticənin vizuallaşması üçün parametrlərin daxil edilməsi
var Selected_tiles = Selected_tiles.clip(aoiGQ)
var classified = Selected_tiles.select(Selected_tiles.bandNames()).classify(classifier8)
//Modellərin öyrənməsinin geometry layeri sərhədi üzrə vizuallaşması
Map.addLayer(classified, imageVisParam4, 'LULC_1')
// create error matrix and accuracies
var testAcc = validation.classify(classifier7)
var confMat = testAcc.errorMatrix({
  actual: "gridcode",
  predicted: "classification"})
//Test nəticəsini və conf matrix-in console bölmədə görsənməsi
print('testAcc', testAcc)
print('confMat', confMat)
function updateMap() {
  var year = c.selectYear.slider.getValue();
  var band = c.selectBand.selector.getValue();
  var img = m.col.filter(ee.Filter.eq('year', parseInt(year, 10)))
    .select(m.imgInfo.bands[band].bname);
  var layer = ui.Map.Layer(
    img, m.imgInfo.bands[band].vis, band + ', ' + year);
  c.map.layers().set(0, layer);
}
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
Export.image.toDrive({
  image:  classified,
  description: 'GQ_2020_',
  scale: 10,
  region: aoiGQ,
  maxPixels: 10e9
});
var collection = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2021-08-11', '2021-09-30')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5))
    .map(cloud_and_shadow_mask);//.select(['red', 'green', 'blue', 'nir']);
var composite = collection.median()
var clipRGBs = composite.select(['red', 'green', 'blue', 'nir']).clip(aoiGQ)
Export.image.toDrive({
  image:  clipRGBs,
  description: 'GQ_RGB_',
  scale: 10,
  region: aoiGQ,
  maxPixels: 10e9
});