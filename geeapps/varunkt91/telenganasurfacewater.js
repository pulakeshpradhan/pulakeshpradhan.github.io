var imageVisParam = {"opacity":1,"bands":["B6","B4","B3"],"min":5209,"max":15230,"gamma":1},
    ROI = ee.FeatureCollection("users/varunkt91/ts1"),
    imageCollection = ee.ImageCollection("COPERNICUS/S2_SR"),
    imageVisParam2 = {"opacity":1,"bands":["B5","B4","B3"],"min":8351,"max":18856,"gamma":1},
    imageVisParam3 = {"opacity":1,"bands":["B6"],"palette":["0c13ff"]};
Map.centerObject(ROI,11)
//var L8_2015= imageCollection
var L8_2015 = ee.ImageCollection('LANDSAT/LC08/C01/T1')
.filterDate('2018-1-1', '2018-12-30')
//.filter(ee.Filter.lt ('CLOUDY_PIXEL_PERCENTAGE', 100))
//.sort('CLOUDY_PIXEL_PERCENTAGE')
.select(['B6', 'B4','B3','B5']).median();
var clip= L8_2015.clip(ROI)
Map.addLayer(clip,imageVisParam2,'2018');
var NDVI = L8_2015.normalizedDifference(['B5', 'B4']); //(NIR-R)/(NIR+R)
//Map.addLayer(NDVI);
var NDWI= L8_2015.normalizedDifference(['B3', 'B5']); //(G-NIR/(G+NIR)
var NDSIn= L8_2015.normalizedDifference(['B6', 'B5']);
//Map.addLayer(NDSIn)
//var NDSI= L8_2015.normalizedDifference(['B3', 'B6']);
//Map.addLayer(NDSI)
var merge= NDWI.gt(NDVI).and(NDWI.gt(NDSIn).and(NDWI.gt(NDSIn)));
var mask = merge.eq(1);
var maskedComposite = clip.updateMask(mask);
Map.addLayer(maskedComposite,imageVisParam3,'Surface Water')
//7 2