var Bounds_1 = ui.import && ui.import("Bounds_1", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                28.27441858544284,
                50.15826550257109
              ],
              [
                28.27441858544284,
                50.14242602602183
              ],
              [
                28.346516363763154,
                50.14242602602183
              ],
              [
                28.346516363763154,
                50.15826550257109
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                28.350498864450824,
                50.13599872106784
              ],
              [
                28.350498864450824,
                50.121582703269254
              ],
              [
                28.397705743112933,
                50.121582703269254
              ],
              [
                28.397705743112933,
                50.13599872106784
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
        },
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#efefef",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #efefef */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.MultiPolygon(
        [[[[28.27441858544284, 50.15826550257109],
           [28.27441858544284, 50.14242602602183],
           [28.346516363763154, 50.14242602602183],
           [28.346516363763154, 50.15826550257109]]],
         [[[28.350498864450824, 50.13599872106784],
           [28.350498864450824, 50.121582703269254],
           [28.397705743112933, 50.121582703269254],
           [28.397705743112933, 50.13599872106784]]]], null, false),
    land = ui.import && ui.import("land", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                28.400447945185388,
                50.16522566592117
              ],
              [
                28.400447945185388,
                50.165170684821334
              ],
              [
                28.400490860529626,
                50.165170684821334
              ],
              [
                28.400490860529626,
                50.16522566592117
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                28.309094183584858,
                50.15087338575546
              ],
              [
                28.309094183584858,
                50.148508431496374
              ],
              [
                28.31475900902431,
                50.148508431496374
              ],
              [
                28.31475900902431,
                50.15087338575546
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                28.32771944298427,
                50.1513683613807
              ],
              [
                28.32771944298427,
                50.149195930257115
              ],
              [
                28.33072351708095,
                50.149195930257115
              ],
              [
                28.33072351708095,
                50.1513683613807
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                28.297464125296283,
                50.14405320000163
              ],
              [
                28.297464125296283,
                50.1411103195188
              ],
              [
                28.303858511587787,
                50.1411103195188
              ],
              [
                28.303858511587787,
                50.14405320000163
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
        },
        {
          "type": "rectangle"
        },
        {
          "type": "rectangle"
        },
        {
          "type": "rectangle"
        }
      ],
      "properties": {
        "class": 0
      },
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[28.400447945185388, 50.16522566592117],
                  [28.400447945185388, 50.165170684821334],
                  [28.400490860529626, 50.165170684821334],
                  [28.400490860529626, 50.16522566592117]]], null, false),
            {
              "class": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[28.309094183584858, 50.15087338575546],
                  [28.309094183584858, 50.148508431496374],
                  [28.31475900902431, 50.148508431496374],
                  [28.31475900902431, 50.15087338575546]]], null, false),
            {
              "class": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[28.32771944298427, 50.1513683613807],
                  [28.32771944298427, 50.149195930257115],
                  [28.33072351708095, 50.149195930257115],
                  [28.33072351708095, 50.1513683613807]]], null, false),
            {
              "class": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[28.297464125296283, 50.14405320000163],
                  [28.297464125296283, 50.1411103195188],
                  [28.303858511587787, 50.1411103195188],
                  [28.303858511587787, 50.14405320000163]]], null, false),
            {
              "class": 0,
              "system:index": "3"
            })]),
    deforest = ui.import && ui.import("deforest", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                28.312935106894184,
                50.14634962114821
              ],
              [
                28.31353592171352,
                50.145414564766945
              ],
              [
                28.314072363516498,
                50.14505703837836
              ],
              [
                28.315080874106098,
                50.14501578516155
              ],
              [
                28.316110842367817,
                50.14522205088979
              ],
              [
                28.316625826498676,
                50.14556582512683
              ],
              [
                28.31628250374477,
                50.1461571110347
              ],
              [
                28.314716093680072,
                50.14614336028262
              ],
              [
                28.313900702139545,
                50.14695464788912
              ],
              [
                28.312656157156635,
                50.146665886081166
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                28.317655794760395,
                50.14887968205479
              ],
              [
                28.31806349053066,
                50.14841218088129
              ],
              [
                28.319114916464496,
                50.14864593203931
              ],
              [
                28.31877159371059,
                50.14911343092777
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                28.322955839773822,
                50.14893468189239
              ],
              [
                28.323685400625873,
                50.14830217994102
              ],
              [
                28.323878519674945,
                50.147889674161625
              ],
              [
                28.32454370751064,
                50.14667963668296
              ],
              [
                28.325509302756,
                50.14713340432511
              ],
              [
                28.323921435019184,
                50.14966342376922
              ],
              [
                28.322827093741108,
                50.14940217795824
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                28.31822114160565,
                50.147075664137674
              ],
              [
                28.319165279178893,
                50.14571434665215
              ],
              [
                28.320431281833923,
                50.146003114205044
              ],
              [
                28.320431281833923,
                50.146291880014545
              ],
              [
                28.319143821506774,
                50.147625680414265
              ],
              [
                28.318113853245055,
                50.147433175436966
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                28.31187738679991,
                50.15268203588012
              ],
              [
                28.311534064046004,
                50.152475802324666
              ],
              [
                28.311694996586898,
                50.15211145420286
              ],
              [
                28.312263624898055,
                50.15189146908715
              ],
              [
                28.313046829930403,
                50.151788350715755
              ],
              [
                28.3146132399951,
                50.15240705760851
              ],
              [
                28.31411971353636,
                50.15325948510351
              ],
              [
                28.31239237093077,
                50.15282639883974
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                28.3253474404727,
                50.15160961167859
              ],
              [
                28.32558347486601,
                50.15130712870909
              ],
              [
                28.326162832013228,
                50.150502789686314
              ],
              [
                28.326763646832564,
                50.150654033954154
              ],
              [
                28.326506154767134,
                50.15124525695688
              ],
              [
                28.32611991666899,
                50.15187084543064
              ],
              [
                28.325283067456343,
                50.15172647958619
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "class": 1
      },
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[28.312935106894184, 50.14634962114821],
                  [28.31353592171352, 50.145414564766945],
                  [28.314072363516498, 50.14505703837836],
                  [28.315080874106098, 50.14501578516155],
                  [28.316110842367817, 50.14522205088979],
                  [28.316625826498676, 50.14556582512683],
                  [28.31628250374477, 50.1461571110347],
                  [28.314716093680072, 50.14614336028262],
                  [28.313900702139545, 50.14695464788912],
                  [28.312656157156635, 50.146665886081166]]]),
            {
              "class": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[28.317655794760395, 50.14887968205479],
                  [28.31806349053066, 50.14841218088129],
                  [28.319114916464496, 50.14864593203931],
                  [28.31877159371059, 50.14911343092777]]]),
            {
              "class": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[28.322955839773822, 50.14893468189239],
                  [28.323685400625873, 50.14830217994102],
                  [28.323878519674945, 50.147889674161625],
                  [28.32454370751064, 50.14667963668296],
                  [28.325509302756, 50.14713340432511],
                  [28.323921435019184, 50.14966342376922],
                  [28.322827093741108, 50.14940217795824]]]),
            {
              "class": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[28.31822114160565, 50.147075664137674],
                  [28.319165279178893, 50.14571434665215],
                  [28.320431281833923, 50.146003114205044],
                  [28.320431281833923, 50.146291880014545],
                  [28.319143821506774, 50.147625680414265],
                  [28.318113853245055, 50.147433175436966]]]),
            {
              "class": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[28.31187738679991, 50.15268203588012],
                  [28.311534064046004, 50.152475802324666],
                  [28.311694996586898, 50.15211145420286],
                  [28.312263624898055, 50.15189146908715],
                  [28.313046829930403, 50.151788350715755],
                  [28.3146132399951, 50.15240705760851],
                  [28.31411971353636, 50.15325948510351],
                  [28.31239237093077, 50.15282639883974]]]),
            {
              "class": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[28.3253474404727, 50.15160961167859],
                  [28.32558347486601, 50.15130712870909],
                  [28.326162832013228, 50.150502789686314],
                  [28.326763646832564, 50.150654033954154],
                  [28.326506154767134, 50.15124525695688],
                  [28.32611991666899, 50.15187084543064],
                  [28.325283067456343, 50.15172647958619]]]),
            {
              "class": 1,
              "system:index": "5"
            })]),
    points = ui.import && ui.import("points", "table", {
      "id": "users/ogordienko112/points"
    }) || ee.FeatureCollection("users/ogordienko112/points"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "VH"
        ],
        "min": -16.183243802958053,
        "max": -13.023907558873825,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["VH"],"min":-16.183243802958053,"max":-13.023907558873825,"gamma":1};
Map.centerObject(Bounds_1,12)
var imgVH = ee.ImageCollection('COPERNICUS/S1_GRD')
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation' ,'VH'))
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .select('VH');
var asc = imgVH.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
var date = ee.Filter.date('2021-03-01', '2021-05-27');
var date2 = ee.Filter.date('2020-03-01', '2020-05-27');
var ascChange = ee.Image.cat(
  asc.filter(date).mean()
  );
var descChange = ee.Image.cat(
  asc.filter(date).mean()
  );
var polygons=deforest.merge(land);
Map.addLayer(polygons,{}, 'Dataset for training',false);
print(polygons);
Map.centerObject(Bounds_1, 13);
var image = ascChange;
Map.addLayer (image.clip(Bounds_1),{min: -25, max: 5},'Multi-T Mean ASC', true);  
Map.addLayer(image.clip(Bounds_1),{},'Image_s1',false);
//Map.addLayer(Bounds_1,styleParams,'Bounds',false);
var bands = ['VH'];
var polygons = polygons;
var training = image.sampleRegions({
  // Get the sample from the polygons FeatureCollection.
   collection: polygons,
   //Keep this list of properties from the polygons.
   properties: ['class'],
  // Set the scale to get Landsat pixels in the polygons.
  scale: 10
});
var classifier = ee.Classifier.smileRandomForest({
    numberOfTrees: 30,
});
var trained = classifier.train(training, 'class', bands);
var classified = image.classify(trained);
var palette = [
  '#24781c' , 
  '#c3beb9'
 ];
Map.addLayer(classified.clip(Bounds_1),{min: 0, max: 1, palette: palette},'Classified_S1',true);
var dataframe = classified.reduceRegions({
 collection: points,
 reducer: ee.Reducer.mean(),
 scale: 30
});
///////////////////////////////
var ascChange2 = ee.Image.cat(
  asc.filter(date2).mean()
  );
var descChange2 = ee.Image.cat(
  asc.filter(date2).mean()
  );
var polygons2=deforest.merge(land);
Map.addLayer(polygons2,{}, 'Dataset for training',false);
print(polygons2);
Map.centerObject(Bounds_1, 13);
var image2 = ascChange2;
//Map.addLayer (image2.clip(Bounds_1),{min: -25, max: 5},'Multi-T Mean ASC', true);  
Map.addLayer(image2.clip(Bounds_1),{},'Image_s1',false);
Map.addLayer(Bounds_1,{},'Bounds',false);
var bands2 = ['VH'];
var polygons2 = polygons2;
var training2 = image2.sampleRegions({
  // Get the sample from the polygons FeatureCollection.
   collection: polygons2,
   //Keep this list of properties from the polygons.
   properties: ['class'],
  // Set the scale to get Landsat pixels in the polygons.
  scale: 10
});
var classifier2 = ee.Classifier.smileRandomForest({
    numberOfTrees: 30,
});
var trained2 = classifier2.train(training, 'class', bands);
var classified2 = image2.classify(trained);
var palette2 = [
  '#24781c' , 
  '#c3beb9'
 ];
Map.addLayer(classified2.clip(Bounds_1),{min: 0, max: 1, palette: palette2},'Classified_S1_old',true);
print(classified2)
var dataframe2 = classified2.reduceRegions({
 collection: points,
 reducer: ee.Reducer.mean(),
 scale: 30
});
Map.addLayer (image2.clip(Bounds_1),{min: -25, max: 5},'Multi-T Mean ASC2', true);