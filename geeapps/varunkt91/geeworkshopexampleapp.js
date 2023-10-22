var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI"
        ],
        "min": -0.2585278276481149,
        "max": 0.6676803981199889,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["NDVI"],"min":-0.2585278276481149,"max":0.6676803981199889,"gamma":1},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B8",
          "B4",
          "B3"
        ],
        "min": 399,
        "max": 7680,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B8","B4","B3"],"min":399,"max":7680,"gamma":1};
var sentinel_image= ee.Image('COPERNICUS/S2/20151002T050646_20151002T051841_T44QMM');
Map.centerObject(sentinel_image,10)
Map.addLayer(sentinel_image,imageVisParam2,'Cloudy')
var select_qa60 = sentinel_image.select(['QA60']);
var cloudmask=select_qa60.lt(1)
Map.addLayer(cloudmask,{},'cloudMask')
var sentinel_image_cloudfree= sentinel_image.updateMask(cloudmask);
Map.addLayer(sentinel_image_cloudfree,imageVisParam2,'Cloudyfree')
//Map.addLayer(cloudmask)
var NDVI= sentinel_image.normalizedDifference(['B8','B4']).rename('NDVI');
print(NDVI)
Map.addLayer(NDVI,imageVisParam,'NDVI_Sentinel');
var NDVI_exp= sentinel_image.expression(
  '(NIR-R)/(NIR+R)', {
    'NIR': sentinel_image.select('B8'),
    'R':sentinel_image.select('B4')
  }
  ).rename('NDVI');
print(NDVI_exp);
Map.addLayer(NDVI_exp,imageVisParam,'NDVI_Sentinel_exp');
//NDVI thresholding
var NDVI_th=NDVI.gt(0.50);
var update_NDVI= NDVI.updateMask(NDVI_th)
Map.addLayer(update_NDVI)
//Map.addLayer(NDVI_th)
// other expressiions
var my_formula= sentinel_image.expression(
  '0.5*((NIR)-(R))/((G)+(B))',{
    'NIR': sentinel_image.select('B8'),
    'R': sentinel_image.select('B4'),
    'G': sentinel_image.select('B4'),
    'B': sentinel_image.select('B2')
  }
  ).rename('my_formula')
  print(my_formula)
//Map.addLayer(my_formula,{},'my_formula');
//Try to export these layers in gdrive by yourself