var roi = /* color: #d63000 */ee.Geometry.Point([7.4333390538131425, 8.99603180975746]),
    l8 = ee.ImageCollection("LANDSAT/LC8_L1T_TOA"),
    urban = /* color: #8f8a5d */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([7.472310964683402, 9.065893886347656]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([7.478919927696097, 9.064431799721797]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([7.460895483116019, 9.0687756628451]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([7.596467654282151, 9.012290947440583]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([7.600254933411179, 9.012047230480295]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([7.4399098797834995, 8.99051452559237]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([7.426596821044768, 8.978953833536155]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([7.415331543182219, 8.978614717791274]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([7.405096233581389, 8.9909922369261]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([7.409795463775481, 8.990229251401107]),
            {
              "landcover": 0,
              "system:index": "9"
            })]),
    vegetation = /* color: #448b1c */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([7.443634212707366, 9.000020776869249]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([7.438892067169036, 8.999469745674455]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([7.43629568884262, 9.000402259512422]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([7.519841246560645, 9.073723953187795]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([7.510656067261948, 9.063744991632642]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([7.507051178345932, 9.034586720385192]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([7.530525871644272, 9.027339167374462]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([7.431048103699936, 9.027847772339065]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([7.40598554266478, 9.014242342610093]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([7.42546910894896, 9.01203829950406]),
            {
              "landcover": 1,
              "system:index": "9"
            })]),
    water = /* color: #31ffd4 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([7.4179589237072605, 9.069000009916675]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([7.421606727967514, 9.073831168529098]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([7.426541992554917, 9.081162539330688]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([7.421070508808839, 9.19064852101546]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([7.432400159687745, 9.207254980869012]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([7.422014646382081, 9.201917275216994]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([7.238079480976808, 9.22597867579011]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([7.243830137104737, 9.234111736030588]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([7.535653842336615, 9.059859245567585]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([7.530568374044378, 9.060346614641368]),
            {
              "landcover": 2,
              "system:index": "9"
            })]);
var image = ee.Image(l8.filterBounds(roi)
    .filterDate('2015-01-01', '2015-12-31')
    .sort('CLOUD_COVER')
    .first());
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'], max: 0.3}, 'image');
var newfc = urban.merge(vegetation).merge(water);
print(newfc);
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
var training = image.select(bands).sampleRegions({
  collection: newfc, 
  properties: ['landcover'], 
  scale: 30
});
// print(training)
var classifier = ee.Classifier.cart().train({
  features: training, 
  classProperty: 'landcover', 
  inputProperties: bands
});
print(classifier.explain());
var classified = image.select(bands).classify(classifier);
Map.addLayer(classified, {min: 0, max: 2, palette: ['red', 'green', 'blue']});