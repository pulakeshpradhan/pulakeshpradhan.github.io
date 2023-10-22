/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #98ff00 */ee.Geometry.Point([27.519983713239412, 40.565515282199215]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
  var collection = ee.ImageCollection('COPERNICUS/S2')
    //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',50))
    .filterDate('2021-04-22','2021-05-31')
    .filterBounds(geometry);
    //.filterMetadata('MGRS_TILE','equals','T06VUP');
print(collection);
//var scene = ee.Image(collection.sort('Date'));
//print(scene)
var imagelist = collection.toList(collection.size());
print(imagelist);
var img_tag = 1; // just to make it easier to select the same image
var img1 = imagelist.get(0);
var img12 = imagelist.get(1);
var img2 = imagelist.get(12);
var img22 = imagelist.get(13);
//print(img1)f
var scene1  = ee.Image(img1);
var scene12 = ee.Image(img12);
var scene2  = ee.Image(img2);
var scene21 = ee.Image(img22);
print(scene1);
print(scene2);
var visParams = {bands: ['B4', 'B3', 'B2'], max: 4000, gamma: [0.95, 1.1, 2]};
var visParams_imprv = {bands: ['B4', 'B3', 'B1'], max: 3000};
//, max: 4000};
//gain: '0.5, 0.5, 0.5',scale:20};
//var visParams_NIR = {bands: ['B4', 'B83', 'B1'],gain: '0.1, 0.1, 0.1',scale:20};
//
//Map.setCenter( 30.043676314615986, 32.428691193971815,  6); // Evegreen
Map.setCenter( 27.998027286535116, 40.96620466637073,  6); // Turkey marmara
//Map.addLayer(scene,visParams,'RGB');
Map.addLayer(scene1,visParams,'S2 20210422 South');
Map.addLayer(scene12,visParams,'S2 20210422 North');
Map.addLayer(scene2,visParams,'S2 20210522 South');
Map.addLayer(scene21,visParams,'S2 20210522 North');
//var min = collection.min();
// Select the red, green and blue bands.
//var result = min.select('B7', 'B5', 'B4');
//Map.addLayer(result, {gain: '0.1, 0.1, 0.1', scale:20},'working');
//Map.setCenter(5, 47, 4);