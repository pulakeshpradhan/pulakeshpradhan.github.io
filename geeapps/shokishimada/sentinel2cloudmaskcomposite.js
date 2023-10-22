//constants
var cloud_probability_thresh=30;
var visParams={bands:['B4','B3','B2'],min:0,max:0.2};
//some additional data
var country_boundary=ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
.filter(ee.Filter.eq('country_co','RP'));
var water = ee.ImageCollection("ESA/WorldCover/v100")
.map(function(image){
  return image.clip(country_boundary).eq(80).not();
}).max();
//function that creates a cloud masked composite image in a given period of time
var create_composite=function(start,end){
  //The sentinel-2 images
  var S2L2A=ee.ImageCollection("COPERNICUS/S2_SR")
  .filterBounds(country_boundary)
  .filterDate(start,end)
  .map(function(image){
    return image.clip(country_boundary).divide(10000);
  });
  //The sentinel-2 cloud probability images
  var S2_cloud_probability=ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY')
  .filterBounds(country_boundary)
  .filterDate(start,end)
  .map(function(image){
    return image.clip(country_boundary);
  });
  //Merge the sentinel-2 image collection and the sentinel-2 cloud probability image collection
  var filter = ee.Filter.equals({
    leftField: 'system:index',
    rightField: 'system:index'
  });
  var simpleJoin = ee.Join.inner();
  var innerJoin = ee.ImageCollection(simpleJoin.apply(S2L2A,S2_cloud_probability , filter));
  var S2L2A_with_CloudProbability = innerJoin.map(function(feature) {
    return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
  });
  //A function that masks the cloud contaminated pixels 
  var add_cloud_mask=function(image){
    var cld_prb = image.select('probability');
    var cloud_mask = cld_prb.lt(cloud_probability_thresh);
    return image.updateMask(cloud_mask);
  };
  //A function that masks the water pixels
  var update_water_mask=function(image){
    return image.updateMask(water);
  };
  //Apply the functions on the whole dataset
  var S2L2A_with_CloudMask=S2L2A_with_CloudProbability
  .map(add_cloud_mask)
  .map(update_water_mask)
  .median();
  //Define a vegetation index
  var add_VI=function(image){
    var VI = ee.Image(0).expression(
    //This formula can be changed to an arbitrary form such as (Band8-Band4)/(Band8+Band4)
    '2.5*(Band8-Band4)/(Band8+6*Band4-7.5*Band2+1)', {
      'Band8': image.select('B8'),
      'Band4': image.select('B4'),
      'Band2': image.select('B2'),
    });
  return image.addBands(VI.rename('Vegetation Index'));
  }
  //Add a VI layer
  var S2L2A_with_CloudMask_with_VI=add_VI(S2L2A_with_CloudMask);
  return S2L2A_with_CloudMask_with_VI;
};
Map.setCenter(121,14.5,11)
var start='2019-01-01';
var end='2019-04-01';
var composite=create_composite(start,end);
Map.addLayer(composite.select('Vegetation Index'),{min:-1,max:1,palette: ['blue', 'white', 'green']},'2019-01-01 to 2019-04-01 VI');
Map.addLayer(composite,visParams,'2019-01-01 to 2019-04-01 composite');
var start='2020-01-01';
var end='2020-04-01';
var composite=create_composite(start,end);
Map.addLayer(composite.select('Vegetation Index'),{min:-1,max:1,palette: ['blue', 'white', 'green']},'2020-01-01 to 2020-04-01 VI');
Map.addLayer(composite,visParams,'2020-01-01 to 2020-04-01 composite');