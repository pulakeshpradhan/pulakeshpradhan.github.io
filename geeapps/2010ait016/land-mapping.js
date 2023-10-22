// District Boundary
// var MP = ee.FeatureCollection("users/2010ait016/Jabalpur")
var tal = ee.FeatureCollection("users/2010ait016/IND_adm2")
// var Gum = tal.filter(ee.Filter.eq('NAME_2', 'Koppal'))
// Map.addLayer(Gum,{},"Gumla_tal")
var MP = tal.filter(ee.Filter.eq('NAME_2', 'Koppal'))
// JRC Water Mask 2018
var water = ee.Image("JRC/GSW1_1/GlobalSurfaceWater").select("max_extent")
var water_gum = water.clip(MP)
var water_only = water_gum.updateMask(water_gum.eq(1));
// OSM water Mask
// var Water = ee.FeatureCollection("users/2010ait016/JH_Water")
// var Non_wcater = MP.geometry().difference(water.geometry())
Map.addLayer(water_only,{},"Non_water",0)
// var classes = landcover.reduceToVectors({
//   reducer: ee.Reducer.countEvery(), 
//   geometry: geometry, 
//   scale: 30,
//   maxPixels: 1e8
// });
// Map.addLayer(vectors,{},'Water_vect')
// var Non_water_1 = MP.geometry().difference(vectors.geometry())
// Map.addLayer(Non_water_1,{},"Non_water_1")
var collectionA = ee.ImageCollection('COPERNICUS/S1_GRD').filterBounds(MP)
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV')) 
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
print('all collection VV+VH IW mode all dates', collectionA);
// var vvA=collectionA.select('VV');
var vhA=collectionA.select('VH');
print('VH all dates', vhA);
var vh1A=vhA.filterDate('2019-06-05', '2019-08-30').min();
print('VH1 all dates', vh1A);
var vh2A=vhA.filterDate('2019-08-01', '2019-10-03').max();
print('VH2 all dates', vh1A);
var boxcar = ee.Kernel.square({radius: 1.5, units: 'pixels', normalize: true});
var vh1A = vh1A.convolve(boxcar);
var vh2A = vh2A.convolve(boxcar);
var visParamsvhA = {min: -30,
max: 0};
var st_vhA_1 = vh1A.reproject({
crs: vh1A.projection().crs(),
scale: 10
});
var st_vhA_2 = vh2A.reproject({
crs: st_vhA_1.projection().crs(),
scale: 10
});
// Display map
Map.centerObject(MP, 12);
// Display composite image
var Diff = st_vhA_2.subtract(st_vhA_1);
var visParams = {bands: ['st_vhA_2', 'st_vhA_1', 'Diff'],min: -30,
max: 0,gamma: [0.9, 0.8, 0.7]};
var Min = st_vhA_1.clip(MP)
var Max = st_vhA_2.clip(MP)
var Differ = Diff.clip(MP)
var Rice = Differ.select('VH').gt(13).and(Differ.select('VH').lt(28))
var Rice_1 = Rice.updateMask(water_gum.eq(0))
var Rice_2 = Rice_1.updateMask(Rice_1.select('VH').eq(1))
print(Rice)
var stack = Max.addBands(Min).addBands(Differ)
// Map.addLayer(Min, {min: -41.060, max: -11.674}, 'Min');
// Map.addLayer(Max, {min: -30.2028, max: -3.988}, 'Max');
// Map.addLayer(Differ, {min: -3.2028, max: 19.088}, 'Differ');
// Map.addLayer(Rice_1, {}, 'Rice');
// Map.addLayer(Rice, {}, 'Rice');
Map.addLayer(stack, {'min':[-31, -42, -3.2],'max':[-3.98,-11.674,19.088]}, 'Stack');
Map.addLayer(Rice_2, {}, "Up_Rice",0)
// Map.addLayer(MP, {}, "MP",0)
var areaImage = Rice_2.multiply(ee.Image.pixelArea());
var stats = areaImage.reduceRegions({
  collection: MP,
  reducer: ee.Reducer.sum(),
  scale: 10
});
// Export.image.toDrive({
//   image: Rice_2,
//   description: 'jabalpur_rice_kharif_2019',
//   folder: 'jabalpur_rice_kharif_2019',
//   scale: 10,
//   region: MP,
//   maxPixels :1e9
// });
print(stats)