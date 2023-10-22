var roi = /* color: #ff8013 */ee.Geometry.Point([130.83680872524656, -12.45570213344978]),
    urban = /* color: #33c618 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([130.82065358153, -12.45764655036231]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([130.84198250761642, -12.463848406423057]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([130.84052338591232, -12.450774050154342]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([130.8483339785637, -12.458819885858993]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([130.86009278288498, -12.438285748627194]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([130.85387005797043, -12.43195755453058]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([130.83314194670334, -12.437573310633578]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([130.84292664518966, -12.432795734788344]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([130.8452011584343, -12.441051665847874]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([130.88528653542664, -12.428069696237962]),
            {
              "landcover": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([130.98977764299354, -12.509427282203692]),
            {
              "landcover": 0,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([130.99166591814003, -12.5112288275841]),
            {
              "landcover": 0,
              "system:index": "11"
            })]),
    water = /* color: #363162 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([130.78929943315302, -12.418347448044617]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([130.89667204252282, -12.316216921879967]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([130.01776579252282, -12.527446781952522]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([130.7689559780697, -12.385975254049065]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([130.83968046537439, -12.526776483083799]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([130.50459745756189, -12.346403097891427]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([130.36108854642907, -12.51605146428669]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([130.03156859941623, -12.852972107787382]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([130.07551391191623, -13.339846673647436]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([130.00410277910373, -13.406649310728858]),
            {
              "landcover": 1,
              "system:index": "9"
            })]),
    vegetation = /* color: #a5a24a */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([130.8654966264586, -12.450109739490948]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([130.8987989335875, -12.532567913950256]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([130.7365789323668, -12.512793757726364]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([131.0709010550048, -12.409039340020133]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([131.07630838837883, -12.417254113849301]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([130.94893564667962, -12.46796202050292]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([130.7324145218871, -12.43319036091723]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([131.09697867580587, -13.002968625527958]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([131.04344202392576, -13.930247410908398]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([130.59024894580216, -13.47400736497279]),
            {
              "landcover": 2,
              "system:index": "9"
            })]);
var image = ee.ImageCollection('LANDSAT/LC8_L1T_TOA')
    .filterBounds(roi)
    .filterDate('2015-01-01', '2015-12-31')
    .sort('CLOUD_COVER')
    .first();
Map.addLayer(image, {bands: ['B4', 'B3', 'B2'], max: 0.3}, 'image');    
var newfc = urban.merge(water).merge(vegetation);
print(newfc);
//create traiing data
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
var training = image.select(bands).sampleRegions({
  collection: newfc,
  properties: ['landcover'],
  scale: 30
})
print(training);
var classifier = ee.Classifier.cart().train({
  features: training,
  classProperty: 'landcover',
  inputProperties: bands
})
var classified = image.select(bands).classify(classifier);
Map.centerObject(newfc, 11);
Map.addLayer(image,
{bands: ['B4', 'B3', 'B2'], max: 0.3},
'Landsat Image');
Map.addLayer(classified,
{min: 0, max: 2, palette: ['0000FF', '00FF00', 'FF0000']},
'classification')
Map.addLayer(newfc);