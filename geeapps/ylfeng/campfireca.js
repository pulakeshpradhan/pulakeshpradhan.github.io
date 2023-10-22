var image = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--06-37-18_PST"),
    image1 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--06-42-18_PST"),
    image2 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--06-47-18_PST"),
    image3 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--06-52-18_PST"),
    image4 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--06-57-18_PST"),
    image5 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--07-02-18_PST"),
    image6 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--07-07-18_PST"),
    image7 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--07-12-18_PST"),
    image8 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--07-17-18_PST"),
    image9 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--07-22-18_PST"),
    image10 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--07-27-18_PST"),
    image11 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--07-32-18_PST"),
    image12 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--07-37-18_PST"),
    image13 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--07-42-18_PST"),
    image14 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--07-47-18_PST"),
    image15 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--07-52-18_PST"),
    image16 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--07-57-18_PST"),
    image17 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--08-02-18_PST"),
    image18 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--08-07-18_PST"),
    image19 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--08-12-18_PST"),
    image20 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--08-17-18_PST"),
    image21 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--08-22-18_PST"),
    image22 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--08-27-18_PST"),
    image23 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--08-32-18_PST"),
    image24 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--08-37-18_PST"),
    l8raw = ee.ImageCollection("LANDSAT/LC08/C01/T1_RT"),
    goes1047 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--10-47-18_PST"),
    goes1042 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--10-42-18_PST");
var animation = require('users/gena/packages:animation')
// add GOES images to map
var goes = ee.ImageCollection.fromImages([image, image1, image2, image3, image4,
image5, image6, image7, image8, image9, image10, image11, image12, image13, image14,
image15,image16,image17,image18,image19,image20,image21,image22,image23,image24])
var limit = function(i){
  var mask = i.gte(5)
  var p = i.updateMask(mask)
  return p
}
var collection = goes.map(limit)
//The animation package is from Gennadii Donchyts, gennadiy.donchyts@gmail.com
animation.animate(collection, {
  vis: { min: 5, max: 10, palette: ['FFFF00', 'FF0000'],opacity: 0.4}
})
//Landsat 8 raw image on 11/08/2018 10:47am
var image = ee.Image('LANDSAT/LC08/C01/T1_RT/LC08_044032_20181108');                      
var LT2 = ee.Algorithms.Landsat.simpleComposite({
  collection: image,
  asFloat: true
});
//Export (change dimensions or scale for higher quality).
// Export.video.toDrive({
//   collection: collection,
//   description: 'campfire',
//   dimensions: 720,
//   framesPerSecond: 12,
//   region: polygon
// });
Map.setCenter(-121.544, 39.817, 10)