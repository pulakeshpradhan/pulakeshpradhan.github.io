var image = ee.Image("UMD/hansen/global_forest_change_2017_v1_5"),
    table = ee.FeatureCollection("users/fernandotentor/ESCUELAS_BUFFER_DATOS"),
    table2 = ee.FeatureCollection("users/fernandotentor/ESCUELAS_DATOS"),
    ER = ee.FeatureCollection("users/fernandotentor/ER");
var image_ER = image.clip(ER)
var imageVisParam2 = {"opacity":1,"bands":["constant"],"palette":["ff0000"]};
var imageVisParam = {"opacity":1,"bands":["treecover2000"],'min':0,"max":100,'palette':['66A000','126b01','024401']};
var image2 = ee.Image().paint(table,'ff0000',5)
var bosque = image_ER.select('treecover2000').add(image_ER.select('gain').multiply(100)).subtract(image_ER.select('loss').multiply(100))
//Map.addLayer(image_ER.updateMask(image.gt(0)),imageVisParam,'Bosque')
Map.addLayer(bosque.updateMask(bosque.gt(0)),imageVisParam,'Bosque')
Map.addLayer(image2,imageVisParam2,'area de exclusión')
//Map.addLayer(table)
Map.addLayer(table2,{},'Escuela')
Map.centerObject(ER,9)