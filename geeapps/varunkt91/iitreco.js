var geometry1 = 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[77.92581079746094, 30.393892190855205],
          [77.92581079746094, 30.214267246460984],
          [78.137984259375, 30.214267246460984],
          [78.137984259375, 30.393892190855205]]], null, false),
    imageVisParam2 = {"opacity":1,"bands":["B8","B4","B3"],"min":462.5,"max":2388.3333333333335,"gamma":1},
    imageVisParam3 = {"opacity":1,"bands":["B8","B4","B3"],"min":462.5,"max":2388.3333333333335,"gamma":1},
    imageVisParam = {"opacity":1,"bands":["B8","B4","B3"],"min":557.1176470588235,"max":2731.5,"gamma":1},
    imageVisParam4 = {"opacity":1,"bands":["B8","B4","B3"],"min":603,"max":2893,"gamma":1},
    imageCollection = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR"),
    imageVisParam5 = {"opacity":1,"bands":["B4","B3","B2"],"min":380,"max":2970,"gamma":1},
    geometry = /* color: #98ff00 */ee.Geometry.MultiPoint();
var vis = {min: 0, max: 1, palette: [
 'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301'
]};
Map.centerObject(geometry1,7)
var image =ee.ImageCollection("COPERNICUS/S2").filterDate('2018-1-1', '2018-12-30')
.filterBounds(geometry1)
.filter(ee.Filter.lt ('CLOUDY_PIXEL_PERCENTAGE', 30))
.sort('CLOUDY_PIXEL_PERCENTAGE')
.select(['B8', 'B4','B3','B11']).median();
print (image);
//Filter date range-------------2018
var clip= image.clip(geometry1);
Map.addLayer(clip,imageVisParam,'FCC- 2018');
var ndvi = clip.normalizedDifference(['B8', 'B4']);
Map.addLayer(ndvi,vis,'NDVI- 2018');
var ndwi = clip.normalizedDifference(['B8', 'B11']);
Map.addLayer(ndwi,vis,'NDWI-2018');
var ndbi = clip.normalizedDifference(['B11', 'B8']);
Map.addLayer(ndbi,vis,'NDBI-2018');
//------------------------------2015-----------------------
//Filter date range
var image1 =ee.ImageCollection("COPERNICUS/S2").filterDate('2016-1-1', '2016-12-30')
.filterBounds(geometry1)
.filter(ee.Filter.lt ('CLOUDY_PIXEL_PERCENTAGE', 30))
.sort('CLOUDY_PIXEL_PERCENTAGE')
.select(['B8', 'B4','B3','B11']).median();
print (image1);
var clip1= image1.clip(geometry1);
Map.addLayer(clip1,imageVisParam4,'FCC- 2015');
var ndvi1 = clip1.normalizedDifference(['B8', 'B4']);
Map.addLayer(ndvi1,vis,'NDVI- 2015');
var ndwi1 = clip1.normalizedDifference(['B8', 'B11']);
Map.addLayer(ndwi1,vis,'NDWI-2015');
var ndbi1 = clip1.normalizedDifference(['B11', 'B8']);
Map.addLayer(ndbi1,vis,'NDBI-2015');
///-----------------------------landsat 2008----------------
var landsat= imageCollection.filterDate('2008-1-1', '2008-12-30')
.filterBounds(geometry1)
.select(['B4', 'B3','B2']).median();
print(landsat);
Map.addLayer(landsat,{},'FCC-2008')
Export.image.toDrive({
  image: ndvi,
  description: 'ndvi_gurugram',
  maxPixels: 3e12,
  scale: 10,
  region:geometry1
 });
 Export.image.toDrive({
  image: ndwi,
  description: 'ndwi_gurugram',
  maxPixels: 3e12,
  scale: 10,
  region:geometry1
 });
 Export.image.toDrive({
  image: ndbi,
  description: 'ndbi_gurugram',
  maxPixels: 3e12,
  scale: 10,
  region:geometry1
 });