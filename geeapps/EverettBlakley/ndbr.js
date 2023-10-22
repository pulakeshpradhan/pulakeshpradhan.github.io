var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T2_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T2_SR"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -115.40791295018182,
            55.91333978556477
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #0b4a8b */ee.Geometry.Point([-115.40791295018182, 55.91333978556477]),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B5",
          "B4",
          "B3"
        ],
        "min": 0,
        "max": 1000,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B5","B4","B3"],"min":0,"max":1000,"gamma":1},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B5",
          "B4",
          "B3"
        ],
        "min": 0,
        "max": 10000,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B5","B4","B3"],"min":0,"max":10000,"gamma":1},
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -115.41,
            55.91
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([-115.41, 55.91]);
var Point = geometry2;
print(Point);
Map.addLayer(Point);
var L8 = imageCollection
  .filterDate('2010-05-20', '2020-08-30')
  .filterBounds(Point);
  // .sort('CLOUD_COVER')
  // .first()
print(L8, 'L8 image collection');  //this is an image collection
Map.addLayer(L8);
var L8_CCLT2 = L8
  .filter(ee.Filter.lte('CLOUD_COVER', 50));
print(L8_CCLT2, 'L8_CCLT2 image collection'); 
Map.addLayer(L8_CCLT2);
// var image_B5 = L8.select('B5')
// var image_B7 = L8.select('B7')
//calculate nbr for a single image
var L8first = L8.first(); //just for demo purposes, we'll get the "first" image in the collection
print(L8first, 'L8first = image');  // this is an Image, not Image collection. 
//calculate nbr using the longform method - Tuesday Q1a
var NBR_long = L8first.select('B5').subtract(L8first.select('B7'))
               .divide(L8first.select('B5').add(L8first.select('B7')));
var nbrViz = {min: 0.25, max: 1, palette: ['FFFFFF', '006400']};
Map.addLayer(NBR_long, nbrViz, 'NBR_long', false);
//calculate NBR using the normalizedDifference function - Tuesday Q1b
var nbr = L8first.normalizedDifference(['B5', 'B7']).rename('nbr'); //note: renamed band to 'nbr' as default is 'nd'
var nbrViz = {min: 0.25, max: 1, palette: ['FFFFFF', '006400']}; //as above
Map.addLayer(nbr, nbrViz, 'nbr', false);
//calculate NDWI using the normalizedDifference function - Tuesday Q1b
var ndwi = L8first.normalizedDifference(['B5', 'B6']).rename('ndwi'); //note: renamed band to 'nbr' as default is 'nd'
var ndwiViz = {min: 0.25, max: 1, palette: ['FFFFFF', '006400']}; //as above
Map.addLayer(ndwi, ndwiViz, 'ndwi', false);
// var nbr = L8.expression(
//     '((B5-B7)/B5+B7))', {
//       'B5': L8.select('B5'),
//       'B7': L8.select('B7')
// });
// print(nbr);
//var NBRViz = {min: 0.25, max: 1, palette: ['FFFFFF', '006400']};
//Map.addLayer(nbr, NBRViz, 'NBR', false);