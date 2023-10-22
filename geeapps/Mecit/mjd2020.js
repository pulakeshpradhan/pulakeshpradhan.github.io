var Water = ui.import && ui.import("Water", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            16.936144111256407,
            45.50872360739723
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([16.936144111256407, 45.50872360739723]),
            {
              "landcover": 0,
              "system:index": "0"
            })]),
    Other = ui.import && ui.import("Other", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            16.415323493580626,
            45.25625083181076
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([16.415323493580626, 45.25625083181076]),
            {
              "landcover": 1,
              "system:index": "0"
            })]),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                12.968497679501594,
                46.72064925887262
              ],
              [
                12.968497679501594,
                42.19148250643596
              ],
              [
                19.648185179501592,
                42.19148250643596
              ],
              [
                19.648185179501592,
                46.72064925887262
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[12.968497679501594, 46.72064925887262],
          [12.968497679501594, 42.19148250643596],
          [19.648185179501592, 42.19148250643596],
          [19.648185179501592, 46.72064925887262]]], null, false);
Map.setCenter(16.128, 45.586, 8);
// Get a feature collection with country boundary
var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
var Croatia = countries.filter(ee.Filter.eq('country_na', 'Croatia'));
var image  = ee.ImageCollection("COPERNICUS/S2_SR")
.filterBounds(Croatia).filterDate('2020-06-01','2020-09-01')
.filter(ee.Filter.lessThan('CLOUDY_PIXEL_PERCENTAGE',15))
.median().select('B2','B3','B4','B5','B6','B7','B8','B8A','B11','B12').clip(Croatia);
//.rename('SB2','SB3','SB4','SB5','SB6','SB7','SB8','SB8A','SB11','SB12');
//print('S2: ',sen2IM);
Map.addLayer(image,{min:0, max:1500, bands:['B4','B3','B2']},'sen2IM', 0);
//---------------------compute MBWI
var MBWI = image.expression(
    '2*GREEN-RED-NIR-SWIR5-SWIR7', {
      'RED': image.select('B4'),
      'GREEN': image.select('B3'),
      'SWIR5': image.select('B11'),
      'SWIR7': image.select('B12'),
      'NIR': image.select('B8'),
});
var MBWIViz = {min: -1800, max: -1000, palette: ['00000000', 'FF0000']};
Map.addLayer(MBWI, MBWIViz, 'MBWI',0);
 var MBWImask = MBWI.gte(-1800).rename('MBWImask');
//Map.addLayer(MBWImask);
// Map.addLayer(MBWImask,{},'MBWImask', 0);
// .......................products stacking........................
var prostack = MBWImask;
print('prostack:',prostack);
// ........................sampling......................
var training_data = Water.merge(Other);
print('training_data:', training_data);
// .......................first clusters......................
var training = prostack.sampleRegions({
  collection: training_data,
  properties: ['landcover'],
  scale:30
});
print('training:',training);
// .......................classifier.....................
var classifier = ee.Classifier.libsvm().train({
  features: training,
  classProperty: 'landcover'
});
// ...................classification......................
var classified = prostack.classify(classifier);
Map.addLayer(classified,{min : 0, max : 1,
  palette : ['#1276ff','#d6d6d6']
},'Sonuc',0);
var water = MBWImask.eq(1);
water = water.mask(water);
Map.addLayer(water, {palette: ['#0000ff']}, 'water');
//-----------------------------------Calculate the pixel area in ha
var areaImage = ee.Image.pixelArea().addBands(
      classified)
var areas = areaImage.reduceRegion({
      reducer: ee.Reducer.sum().group({
      groupField: 1,
      groupName: 'landcover',
    }),
    geometry: Croatia,
    scale: 50,
    maxPixels: 1e19
    }); 
print(areas)
/*
Export.image.toDrive({
  image : water,
  description : 'CR_su_20',
  scale : 30,
  region : Croatia,
  maxPixels : 1e9
});
*/