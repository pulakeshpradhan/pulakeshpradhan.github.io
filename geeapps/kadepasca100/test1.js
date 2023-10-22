var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            115.28093660663308,
            -8.605645063807351
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff0000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ff0000 */ee.Geometry.Point([115.28093660663308, -8.605645063807351]),
    urban = ui.import && ui.import("urban", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            115.27743900607766,
            -8.60261115021175
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.2815159637803,
            -8.602717231516792
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.27437055896462,
            -8.603841691523332
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.28353298495949,
            -8.606387626368834
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.27984762977303,
            -8.603173380789862
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.27860844920815,
            -8.604706250484249
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.28043528646685,
            -8.602832603467977
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.28065254539706,
            -8.602810061200008
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.28066997975566,
            -8.602875035968745
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.28080140799739,
            -8.602617788859877
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#00ff00",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #00ff00 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([115.27743900607766, -8.60261115021175]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([115.2815159637803, -8.602717231516792]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([115.27437055896462, -8.603841691523332]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([115.28353298495949, -8.606387626368834]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([115.27984762977303, -8.603173380789862]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([115.27860844920815, -8.604706250484249]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([115.28043528646685, -8.602832603467977]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([115.28065254539706, -8.602810061200008]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([115.28066997975566, -8.602875035968745]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([115.28080140799739, -8.602617788859877]),
            {
              "landcover": 0,
              "system:index": "9"
            })]),
    water = ui.import && ui.import("water", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            115.30930135128278,
            -8.620320231821347
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.31339976665754,
            -8.618707867792233
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.31457993862409,
            -8.623226712760529
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.31356748319888,
            -8.613548396012424
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.31533774114871,
            -8.615022880875824
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.31300867180539,
            -8.611533603966041
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.3114942420109,
            -8.608616315020962
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.32239006709472,
            -8.63720336097771
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.3404145116748,
            -8.628378099697079
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.35586403560058,
            -8.620061799333197
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
      },
      "color": "#0000ff",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #0000ff */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([115.30930135128278, -8.620320231821347]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([115.31339976665754, -8.618707867792233]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([115.31457993862409, -8.623226712760529]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([115.31356748319888, -8.613548396012424]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([115.31533774114871, -8.615022880875824]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([115.31300867180539, -8.611533603966041]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([115.3114942420109, -8.608616315020962]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([115.32239006709472, -8.63720336097771]),
            {
              "landcover": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([115.3404145116748, -8.628378099697079]),
            {
              "landcover": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([115.35586403560058, -8.620061799333197]),
            {
              "landcover": 1,
              "system:index": "9"
            })]),
    vegetation = ui.import && ui.import("vegetation", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            115.28895543048338,
            -8.61616263862547
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.28925583789305,
            -8.617775013510249
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.29234574267821,
            -8.613956219747188
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.28783963153319,
            -8.607676341731423
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.27814076373534,
            -8.608906866579767
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.30382924102992,
            -8.61206908742692
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.30262761139124,
            -8.612450970443764
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.29857751759812,
            -8.609964134299998
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.30300852689072,
            -8.609794407446762
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            115.29474732312485,
            -8.612838871311212
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 2
      },
      "color": "#999900",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #999900 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([115.28895543048338, -8.61616263862547]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([115.28925583789305, -8.617775013510249]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([115.29234574267821, -8.613956219747188]),
            {
              "landcover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([115.28783963153319, -8.607676341731423]),
            {
              "landcover": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([115.27814076373534, -8.608906866579767]),
            {
              "landcover": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([115.30382924102992, -8.61206908742692]),
            {
              "landcover": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([115.30262761139124, -8.612450970443764]),
            {
              "landcover": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([115.29857751759812, -8.609964134299998]),
            {
              "landcover": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([115.30300852689072, -8.609794407446762]),
            {
              "landcover": 2,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([115.29474732312485, -8.612838871311212]),
            {
              "landcover": 2,
              "system:index": "9"
            })]);
// Filter the collection for the VV product from the descending track
var image = ee.ImageCollection('COPERNICUS/S1_GRD')
            .filterBounds(roi)
            .filterDate('2018-01-01', '2018-04-30')
var collectionVV = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterBounds(roi)
    .select(['VV']);
print(collectionVV);
// Filter the collection for the VH product from the descending track
var collectionVH = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterBounds(roi)
    .select(['VH']);
print(collectionVH);
Map.centerObject(roi, 13);
var VV = collectionVV.median();
Map.addLayer(VV, {min: -14, max: -7}, 'VV');
var VH = collectionVH.median();
Map.addLayer(VH, {min: -20, max: -7}, 'VH');
var VV1 = ee.Image(collectionVV.filterDate('2018-01-01', '2018-04-30').median());
var VV2 = ee.Image(collectionVV.filterDate('2018-05-01', '2018-08-31').median());
var VV3 = ee.Image(collectionVV.filterDate('2018-09-01', '2018-12-31').median());
Map.addLayer(VV1.addBands(VV2).addBands(VV3), {min: -12, max: -7}, 'Season composite');
Map.addLayer(VV1, {min: -12, max: -7},'1 Season');
Map.addLayer(VV2, {min: -12, max: -7},'2 Season');
// Train
var newfc =urban.merge(water).merge(vegetation);
var bands = ['VV','VH'];
var training = image.select(bands).sampleRegions({
  collection: newfc,
	properties: ['landcover'], 
	scale: 30
});
//Train Classifier
var classifier = ee.Classifier.cart().train({
  features: training,
  classProperty: 'landcover',
  inputProperties: bands
});
var classified = image.select(bands).classify(classifier);
Map.centerObject(newfc, 11);
Map.addLayer(classified,
{min: 0, max: 3, palette: ['red', 'blue', 'green','yellow']},
'classification');