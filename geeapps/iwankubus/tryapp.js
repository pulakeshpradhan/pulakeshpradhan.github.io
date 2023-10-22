/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #00ffb3 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[114.98653489501181, -3.5288823414983606],
          [114.97932511717978, -3.5477290978343943],
          [114.97863847167197, -3.5682887572375455],
          [114.99305802733603, -3.5919317966595044],
          [115.01434403807822, -3.599470028485578],
          [115.0679023876876, -3.6135183848590975],
          [115.117684187004, -3.6028964768811282],
          [115.13691026122275, -3.590903851129347],
          [115.150643171379, -3.570687354251772],
          [115.16265946776572, -3.5449877752968137],
          [115.16780930907431, -3.5247702710566826],
          [115.15785294921103, -3.502153559253431],
          [115.15441972167197, -3.472339786715086],
          [115.1393135205001, -3.4483510100706494],
          [115.1063545361251, -3.441154258867443],
          [115.0682457104415, -3.4579465935902753],
          [115.04654796778671, -3.475840842108136],
          [115.03489875758852, -3.4915988551182653],
          [115.02700233424868, -3.500337293586464],
          [115.02133750880922, -3.5080476127777493],
          [115.01284329199419, -3.513752696101464],
          [115.00906674170122, -3.516022930763151],
          [115.00232903265581, -3.517779146238323],
          [114.99623505377397, -3.5219340818666494]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
Map.centerObject(geometry);
// Landat 5 surface reflection data
var L5coll = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
.filter(ee.Filter.lt('CLOUD_COVER',25))
.select(['B1', 'B2', 'B3','B5'])
.filterBounds(geometry)
.map(function(img) {
  return img.multiply(0.0001)
  .copyProperties(img,['system:time_start','system:time_end']); 
});
// Landat 7 surface reflection data, fill in the gaps! See USGS pages for more info
var L7coll = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
.filter(ee.Filter.lt('CLOUD_COVER',25))
.select(['B1', 'B2', 'B3','B5'])
.filterBounds(geometry)
.map(function(image){
  var filled1a = image.focal_mean(2, 'square', 'pixels', 1);
  return filled1a.blend(image);
})
.map(function(img) {
  return img.multiply(0.0001)
  .copyProperties(img,['system:time_start','system:time_end']); 
});
// Landat 8 surface reflection data, rename the band names. See USGS pages for more info
var L8coll = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.filter(ee.Filter.lt('CLOUD_COVER',5))
.filterBounds(geometry)
.map(function(image){
  return image.rename(['B0', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11']);
})
.select(['B1', 'B2', 'B3','B5'])
.map(function(img) {
  return img.multiply(0.0001)
  .copyProperties(img,['system:time_start','system:time_end']); 
});
// Penggabungan data L5, L7 & L8
var collection_merge = ee.ImageCollection(L5coll.merge(L7coll.merge(L8coll)));
print (collection_merge);
var first = collection_merge.first();
Map.addLayer(first,{bands: ['B3', 'B2', 'B1'], min: 0, max: 0.3},'composite');