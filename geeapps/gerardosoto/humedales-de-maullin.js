var pt = ui.import && ui.import("pt", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -73.6233856967239,
            -41.59990957652151
          ]
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
    ee.Geometry.Point([-73.6233856967239, -41.59990957652151]);
var rescale = function(img, exp, thresholds) {
    return img.expression(exp, {img: img})
        .subtract(thresholds[0]).divide(thresholds[1] - thresholds[0]);
  };
////////////////////////////////////////////////////// 
//Algorithm to compute liklihood of water
//Builds on logic from Google cloudScore algorithm
function waterScore(img){
      // Compute several indicators of water and take the minimum of them.
      var score = ee.Image(1.0);
      //Set up some params
      var darkBands = ['green','red','nir','swir2','swir1'];//,'nir','swir1','swir2'];
      var brightBand = 'blue';
      var shadowSumBands = ['nir','swir1','swir2'];
      //Water tends to be dark
      var sum = img.select(shadowSumBands).reduce(ee.Reducer.sum());
      var sum = rescale(sum,'img',[0.35,0.2]).clamp(0,1)
      score = score.min(sum);
      //It also tends to be relatively bright in the blue band
      var mean = img.select(darkBands).reduce(ee.Reducer.mean());
      var std = img.select(darkBands).reduce(ee.Reducer.stdDev());
      var z = (img.select([brightBand]).subtract(std)).divide(mean);
      z = rescale(z,'img',[0,1]).clamp(0,1);
      score = score.min(z);
      // // Water is at or above freezing
      // score = score.min(rescale(img, 'img.temp', [273, 275]));
      // // Water is nigh in ndsi (aka mndwi)
      var ndsi = img.normalizedDifference(['green', 'swir1']);
      ndsi = rescale(ndsi, 'img', [0.3, 0.8]);
      score = score.min(ndsi);
      return score.clamp(0,1).rename('waterScore');
      }
//////////////////////////////////////////////////////////////////
function maskWater(img){
  var ws = waterScore(img);
  return img.mask(img.mask().and(ws.lt(waterThresh)));
}
///////////////////////////////////////////////////
var vizParams = {'min': 0.05, 'max': [0.4,0.5,0.35], 'bands': 'swir1,nir,red'};
var i = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(pt)
  .filterDate('2018-12-01', '2018-12-06')
  .mean()
  .divide(10000)
  .select(['QA60', 'B1','B2','B3','B4','B5','B6','B7','B8','B8A', 'B9','B10', 'B11','B12'],
          ['QA60','cb', 'blue', 'green', 'red', 're1','re2','re3','nir', 'nir2', 'waterVapor', 'cirrus','swir1', 'swir2']);
print(i)
Map.addLayer(i, vizParams, 'Raw Image');
var ws = waterScore(i);
// Map.addLayer(ws, {'min': 0, 'max': 1, 'palette': '000,00F'}, 'Water Score', false);
var wm = ws.gt(0.1);
// Map.addLayer(wm.updateMask(wm), {'min':1,'max':1,'palette':'00F'}, 'Water Mask', false);
var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
var occurrence = gsw.select('occurrence');
Map.centerObject(pt, 12)
Map.addLayer(occurrence, {'min': 0, 'max': 100, 'palette': '000,00F'}, 'Water Score');