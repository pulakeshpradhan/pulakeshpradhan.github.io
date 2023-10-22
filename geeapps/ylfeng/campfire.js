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
    point = /* color: #d63000 */ee.Geometry.Point([-121.4348162396401, 39.854424794741306]),
    goes1047 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--10-47-18_PST"),
    goes1042 = ee.Image("users/ylfeng/Campfire/cropped_GOES16_ABI_L1b_Rad_B7_2018-11-08--10-42-18_PST");
var animation = require('users/gena/packages:animation')
// add GOES images to map
var goes = ee.ImageCollection.fromImages([image, image1, image2, image3, image4,
image5, image6, image7, image8, image9, image10, image11, image12, image13, image14,
image15,image16,image17,image18,image19,image20,image21,image22,image23,image24])
// animation.animate(goes, {
//   vis: { min: 0.45, max: 1, palette: ['FFFFFF', 'FFFF00', 'FF0000']}
// })
animation.animate(goes, {
  vis: { min: 5, max: 10, palette: ['FFFFFF', 'FFFF00', 'FF0000']}
})
var image = ee.Image('LANDSAT/LC08/C01/T1_RT/LC08_044032_20181108');                      
var LT2 = ee.Algorithms.Landsat.simpleComposite({
  collection: image,
  asFloat: true
});
var date = ee.Date(image.get('system:time_start')); //GMT TO PST: 10:45AM in PST
print('Timestamp: ', date); // ee.Date
var goes = ee.Image(goes1047)
var goes42 = ee.Image(goes1042)
//Landsat 8 raw B6	30 meters	1.57 - 1.65 µm	Shortwave infrared 1
Map.addLayer(LT2, {bands: ['B6', 'B5', 'B4'], max: 0.5}, 'SWIR-NIR-R-2');
//GOES-R ABI Band 7 (approximately 3.9 μm central, 3.8 μm to 4.0 μm)
// Map.addLayer(goes, {min: 5, max: 10, palette: ['FFFFFF', 'FFFF00', 'FF0000']}, "goes1047")
// Map.addLayer(goes42, {min: 5, max: 10, palette: ['FFFFFF', 'FFFF00', 'FF0000']}, "goes1042")
Map.setCenter(-121.544, 39.817, 10)