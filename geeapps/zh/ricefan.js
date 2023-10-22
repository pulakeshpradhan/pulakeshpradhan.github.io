var tree3 = ui.import && ui.import("tree3", "table", {
      "id": "users/zh/shp/tree3"
    }) || ee.FeatureCollection("users/zh/shp/tree3"),
    geometry3 = ui.import && ui.import("geometry3", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                105.04882544457256,
                30.77544786319789
              ],
              [
                105.04882544457256,
                28.36298448553634
              ],
              [
                107.18291968285381,
                28.36298448553634
              ],
              [
                107.18291968285381,
                30.77544786319789
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[105.04882544457256, 30.77544786319789],
          [105.04882544457256, 28.36298448553634],
          [107.18291968285381, 28.36298448553634],
          [107.18291968285381, 30.77544786319789]]], null, false);
function rmCloud(image) {
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
               .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask);
}
var cloudScore = function(img) {
  // A helper to apply an expression and linearly rescale the output.
  var rescale = function(img, exp, thresholds) {
    return img.expression(exp, {img: img})
        .subtract(thresholds[0]).divide(thresholds[1] - thresholds[0]);
  };
  // Compute several indicators of cloudyness and take the minimum of them.
  var score = ee.Image(1.0);
  // Clouds are reasonably bright in the blue band.
  score = score.min(rescale(img, 'img.blue', [0.1, 0.3]));
  // Clouds are reasonably bright in all visible bands.
  score = score.min(rescale(img, 'img.red + img.green + img.blue', [0.2, 0.8]));
  // Clouds are reasonably bright in all infrared bands.
  score = score.min(rescale(img, 'img.nir + img.swir1 + img.swir2', [0.3, 0.8]));
  // However, clouds are not snow.
  var ndsi = img.normalizedDifference(['green', 'swir1']);
  return score.min(rescale(ndsi, 'img', [0.8, 0.6]));
};
function addCloudScore(image) {
  // A mapping from a common name to the sensor-specific bands.
  var S2_BANDS = ['B2',   'B3',    'B4',  'B8',  'B11',    'B12'];
  var STD_NAMES = ['blue', 'green', 'red', 'nir', 'swir1', 'swir2'];
  image = image.divide(10000);
  // Invert the cloudscore so 1 is least cloudy, and rename the band.
  var score = cloudScore(image.select(S2_BANDS, STD_NAMES));
  score = score.divide(100);
  return image.addBands(score.rename('cloud'));
}
function selectData(start, end){
  var data =  ee.ImageCollection('COPERNICUS/S2')
              .filterDate(start, end)
              .map(addCloudScore)
              .filterBounds(geometry3)
              .map(function(image) {
                   return image.addBands(image.normalizedDifference(["B8","B4"]).rename("NDVI"));
              }).map(function(image) {
                   return image.addBands(image.normalizedDifference(["B3","B8"]).rename("NDWI"));
              }).map(function(image) {
                   return image.addBands(image.select('B8').divide(image.select('B4')).rename("RVI"));
              }).map(function(image) {
                   return image.addBands(image.select('B8').subtract(image.select('B4')).divide(image.select('B8').add(image.select('B4').multiply(6).subtract(image.select('B2').multiply(7.5)).add(1))).multiply(2.5).rename("EVI"));
              }).map(function(image) {
                   return image.addBands(image.normalizedDifference(["B8","B3"]).rename("GNDVI"));
              }).map(function(image) {
                   return image.addBands(image.select('B8').subtract(image.select('B4')).rename("DVI"));
              }).map(function(image) {
                   return image.addBands((image.select('B8').subtract(image.select('B4'))).divide(image.select('B8').add(image.select('B4').add(0.16))).rename("OSAVI"));
              }).map(function(image) {
              return image.addBands(image.select('B8').multiply(0).add(1).rename("ss"));
              })
              //.map(rmCloud)
              .median()
              .clip(geometry3).multiply(10000).toDouble()
              .aside(print);
  return data
}
var visParam = {
 min: -0.3,
 max: 0.8,
 //palette: 'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400,' +
 //  '3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301'
 palette: ["FFFFFF", "CE7E45", "DF923D", "F1B555", "FCD163", 
            "99B718", "74A901", "66A000", "529400", "3E8601", 
            "207401", "056201", "004C00", "023B01", "012E01", 
            "011D01", "011301"]
};
var g20_fcolor=selectData('2018-04-16', '2018-04-18')
var vcVis = {
  gamma:1.5,
  min: 0,
  max: 0.4,
  bands: ['B8A', 'B4', 'B3'],
};
var farmVis = {
  min: 0,
  max: 0.4,
  bands: ['B11', 'B8', 'B2'],
};
var cityVis = {
  gamma:1.4,
  min: 0,
  max: 3000,
  bands: ['B12', 'B11', 'B4'],
};
var rgbVis = {
  gamma:1.3,
  min: 0,
  max: 3000,
  bands: ['B4', 'B3', 'B2'],
};
var ndviVisParam={
      min: -1000, 
      max: 9000,
      palette: 'FF0000,FF3300,FF6633,FF9933,CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400,' +
        '3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301' 
    };
var ndwiVisParam={
      min: -5000, 
      max:2000,
      palette: 'FF0000,FF3300,FF6633,FF9933,CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400,' +
        '3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301' 
    };
Map.addLayer(g20_fcolor, rgbVis, 'RGB');
Map.addLayer(g20_fcolor.select("NDWI"), ndwiVisParam, 'NDWI');
Map.addLayer(g20_fcolor.select("NDVI"), ndviVisParam, 'NDVI');
var outline = ee.Image()
                  .toByte()
                  .paint({
                    featureCollection:geometry3,
                    color:0,
                    width:1.5
                  });
Map.addLayer(outline, {palette: "ff0000"}, "bounds");
//var paletteParam = {
//  min: 0,
//  max: 4,
//  palette: ["ff0000", "0000ff", "009900", "ffc82d", "00FF33"]
//};
var cloud = tree3.filter(ee.Filter.eq("RASTERVALU",0));
var other = tree3.filter(ee.Filter.eq("RASTERVALU",1));
var dryland = tree3.filter(ee.Filter.eq("RASTERVALU",2));
var forest  = tree3.filter(ee.Filter.eq("RASTERVALU",3));
var paddyrice = tree3.filter(ee.Filter.eq("RASTERVALU",4));
print(cloud);
print(other);
//print(tree3);
//print(tree3.get("OBJECTID"));
Map.addLayer(cloud.draw("white"),{}, "cloud");
Map.addLayer(other.draw("black"),{}, "other");
Map.addLayer(dryland.draw("brown"),{}, "dryland");
Map.addLayer(forest.draw("green"),{}, "forest");
Map.addLayer(paddyrice.draw("yellow"),{}, "paddyrice");
function main() {
 // Map.style().set('cursor', 'crosshair');
  Map.centerObject(geometry3, 9);
  Map.setOptions("SATELLITE");
  //initUI();
  //showBounds(roi);
}
main();