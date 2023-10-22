/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var image = ee.Image("projects/ee-nirdeshsharmanith1/assets/Ensemble_class_map"),
    table = ee.FeatureCollection("users/nirdeshsharmanith/India_Boundary");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// image = image.mask(image.mask().where(image.eq(0),0))
Map.addLayer(table,'','India Boundary')
var viz= { min:0,
max:4,
  palette:['#2b83ba','#abdda4','#ffffbf','#fdae61','#d7191c']
}
Map.centerObject(image,5)
// Map.setCenter(76.43, 22.41, 5)
Map.addLayer(image,viz,'ILSM')