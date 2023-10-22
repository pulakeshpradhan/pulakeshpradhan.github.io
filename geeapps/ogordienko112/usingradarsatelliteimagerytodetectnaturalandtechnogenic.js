var points = ui.import && ui.import("points", "table", {
      "id": "users/ogordienko112/points"
    }) || ee.FeatureCollection("users/ogordienko112/points"),
    Bounds_1 = ui.import && ui.import("Bounds_1", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                23.828128435846384,
                47.97779268315041
              ],
              [
                23.828128435846384,
                47.92996661099024
              ],
              [
                23.902286150690134,
                47.92996661099024
              ],
              [
                23.902286150690134,
                47.97779268315041
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
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ffff */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[23.828128435846384, 47.97779268315041],
          [23.828128435846384, 47.92996661099024],
          [23.902286150690134, 47.92996661099024],
          [23.902286150690134, 47.97779268315041]]], null, false),
    land = ui.import && ui.import("land", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                23.854265100026648,
                47.96421147862702
              ],
              [
                23.855552560353797,
                47.96444136519968
              ],
              [
                23.85718334343485,
                47.96478619314037
              ],
              [
                23.856067544484656,
                47.965935602983706
              ],
              [
                23.855123406911414,
                47.96645282906848
              ],
              [
                23.853063470387976,
                47.96610801225414
              ],
              [
                23.85375011589579,
                47.96501607715525
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
                23.849115258718054,
                47.962027505158844
              ],
              [
                23.849115258718054,
                47.96122286007879
              ],
              [
                23.850316888356726,
                47.95972848596432
              ],
              [
                23.852033502126258,
                47.95903876025496
              ],
              [
                23.853063470387976,
                47.95903876025496
              ],
              [
                23.852033502126258,
                47.961452759952
              ],
              [
                23.851518517995398,
                47.96317697638899
              ],
              [
                23.84945858147196,
                47.96288961097938
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
                23.87426277565969,
                47.96645307665865
              ],
              [
                23.875293016692492,
                47.96582074333961
              ],
              [
                23.87589399063833,
                47.96369374718154
              ],
              [
                23.87881300679715,
                47.96369374717542
              ],
              [
                23.879413980756016,
                47.96553331653306
              ],
              [
                23.878898860275953,
                47.96697043454057
              ],
              [
                23.875378870093325,
                47.96708540225842
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "class": 0
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
            ee.Geometry.Polygon(
                [[[23.854265100026648, 47.96421147862702],
                  [23.855552560353797, 47.96444136519968],
                  [23.85718334343485, 47.96478619314037],
                  [23.856067544484656, 47.965935602983706],
                  [23.855123406911414, 47.96645282906848],
                  [23.853063470387976, 47.96610801225414],
                  [23.85375011589579, 47.96501607715525]]]),
            {
              "class": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[23.849115258718054, 47.962027505158844],
                  [23.849115258718054, 47.96122286007879],
                  [23.850316888356726, 47.95972848596432],
                  [23.852033502126258, 47.95903876025496],
                  [23.853063470387976, 47.95903876025496],
                  [23.852033502126258, 47.961452759952],
                  [23.851518517995398, 47.96317697638899],
                  [23.84945858147196, 47.96288961097938]]]),
            {
              "class": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[23.87426277565969, 47.96645307665865],
                  [23.875293016692492, 47.96582074333961],
                  [23.87589399063833, 47.96369374718154],
                  [23.87881300679715, 47.96369374717542],
                  [23.879413980756016, 47.96553331653306],
                  [23.878898860275953, 47.96697043454057],
                  [23.875378870093325, 47.96708540225842]]]),
            {
              "class": 0,
              "system:index": "2"
            })]),
    lake = ui.import && ui.import("lake", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            23.854252418127675,
            47.96168567142445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            23.85592611655297,
            47.96076606993902
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            23.876252078939583,
            47.93978409887447
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            23.87408485405555,
            47.93754159141027
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            23.854322299064314,
            47.96240292794375
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            23.857498034537947,
            47.95998897264693
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            23.850417258844285,
            47.93949147899713
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            23.849698426828294,
            47.939455541941
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            23.847735049829392,
            47.940195840254006
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            23.852176787958054,
            47.93929741859729
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            23.834127562064538,
            47.96737836855528
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            23.835264818686852,
            47.967047925075626
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            23.836166040915856,
            47.966918620529825
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            23.835736887473473,
            47.965453146386636
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            23.868554690120842,
            47.9559369110816
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            23.869777777431633,
            47.95552017231812
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "class": 1
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
            ee.Geometry.Point([23.854252418127675, 47.96168567142445]),
            {
              "class": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([23.85592611655297, 47.96076606993902]),
            {
              "class": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([23.876252078939583, 47.93978409887447]),
            {
              "class": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([23.87408485405555, 47.93754159141027]),
            {
              "class": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([23.854322299064314, 47.96240292794375]),
            {
              "class": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([23.857498034537947, 47.95998897264693]),
            {
              "class": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([23.850417258844285, 47.93949147899713]),
            {
              "class": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([23.849698426828294, 47.939455541941]),
            {
              "class": 1,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([23.847735049829392, 47.940195840254006]),
            {
              "class": 1,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([23.852176787958054, 47.93929741859729]),
            {
              "class": 1,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([23.834127562064538, 47.96737836855528]),
            {
              "class": 1,
              "system:index": "10"
            }),
        ee.Feature(
            ee.Geometry.Point([23.835264818686852, 47.967047925075626]),
            {
              "class": 1,
              "system:index": "11"
            }),
        ee.Feature(
            ee.Geometry.Point([23.836166040915856, 47.966918620529825]),
            {
              "class": 1,
              "system:index": "12"
            }),
        ee.Feature(
            ee.Geometry.Point([23.835736887473473, 47.965453146386636]),
            {
              "class": 1,
              "system:index": "13"
            }),
        ee.Feature(
            ee.Geometry.Point([23.868554690120842, 47.9559369110816]),
            {
              "class": 1,
              "system:index": "14"
            }),
        ee.Feature(
            ee.Geometry.Point([23.869777777431633, 47.95552017231812]),
            {
              "class": 1,
              "system:index": "15"
            })]),
    Building = ui.import && ui.import("Building", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                23.89677882784341,
                47.94976099959239
              ],
              [
                23.89722943895791,
                47.94972506967542
              ],
              [
                23.897304540810328,
                47.94981130143421
              ],
              [
                23.896853929695826,
                47.949998136418046
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "class": 2
      },
      "color": "#cfd61c",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #cfd61c */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[23.89677882784341, 47.94976099959239],
                  [23.89722943895791, 47.94972506967542],
                  [23.897304540810328, 47.94981130143421],
                  [23.896853929695826, 47.949998136418046]]]),
            {
              "class": 2,
              "system:index": "0"
            })]),
    Bounds_border = ui.import && ui.import("Bounds_border", "table", {
      "id": "users/ogordienko112/border"
    }) || ee.FeatureCollection("users/ogordienko112/border");
var imgVV = ee.ImageCollection('COPERNICUS/S1_GRD')
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation' ,'VH'))
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .select('VH')
        .map(function(image) {
          var edge = image.lt(-40.0);
          var maskedImage = image.mask().and(edge.not());
          return image.updateMask(maskedImage);
        });
var desc = imgVV.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
var asc = imgVV.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
var spring = ee.Filter.date('2021-03-01', '2021-05-27');
var summer = ee.Filter.date('2020-06-01', '2020-08-31');//
var autumn  = ee.Filter.date('2020-09-01', '2020-11-30');//
var winter  = ee.Filter.date('2020-12-01', '2021-02-28');
// spring summer autumn winter
var ascChange = ee.Image.cat(
        desc.filter(spring).mean(),
        desc.filter(spring).mean(),
        desc.filter(spring).mean(),
        desc.filter (spring).mean())
        ;
var descChange = ee.Image.cat(
        desc.filter(autumn).mean(),
        desc.filter(autumn).mean(),
        desc.filter(autumn).mean(),
        desc.filter (autumn).mean())
        ;
Map.setCenter(5.2013, 47.3277, 12);
Map.addLayer(ascChange, {min: -25, max: 5}, 'Multi-T Mean ASC', false);
Map.addLayer(descChange, {min: -25, max: 5}, 'Multi-T Mean DESC', false);
var polygons=lake.merge(land);//.merge(Building);
Map.addLayer(polygons,{}, 'Dataset for training',false);
print(polygons);
Map.centerObject(Bounds_1, 13);
var img = imgVV;// maybe this is mistake
var image = ascChange;
Map.addLayer(image.clip(Bounds_1),{},'Image_s1',false);
Map.addLayer(Bounds_1,{},'Bounds',false);
var bands = ['VH','VH_1','VH_2','VH_3'];
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
 // '#ed4245', 
  '#b59571' , 
  '#5865f2'
 ];
  Map.addLayer(classified.clip(Bounds_1),{min: 0, max: 1, palette: palette},'Classified_S1',true);
var dataframe = classified.reduceRegions({
 collection: points,
 reducer: ee.Reducer.mean(),
 scale: 30
});
// ///////////////////////////////////////////////////////////////////////////////////////////////////////// start sentinel-2
var addNDVI = function(dataset){
  var ndvi = dataset.normalizedDifference(['B8','B4']).rename('NDVI');
  return dataset.addBands(ndvi);
};
var start = ee.Date.fromYMD(2020,4,1);
var finish = ee.Date.fromYMD(2020,10,1);
var bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9', 'B10', 'B11', 'B12', 'NDVI'];
//Загружаем коллекцию снимков COPERNICUS
var img_s2 = ee.ImageCollection('COPERNICUS/S2')
.map(addNDVI)
//Отфильтруем снимки по временному промежутку
 .filterDate(start, finish)
//Отфильтруем снимки по облачности
.filter(ee.Filter.lt('CLOUD_COVERAGE_ASSESSMENT',5));
//Понижаем коллекцию снимков до единичного изображения, с помощью фильтрации по области интересса,
//сортировкой снимков по облачности, и выбором снимка с минимальным значением облачности
var image_s2 = ee.Image(img_s2.filterBounds(Bounds_1).sort('CLOUD_COVER',false).min());
print('All metadata:', image_s2);
//Задаем параметры визуализации для отфильтрованного изображения в режиме натуральных цветов  
var visParams = {
  bands: ['B4','B3','B2'],
  gamma: 2,
  min: 300,
  max: 5000
  };
// Добавляем слой с изображением на карту с центрированием по объекту
Map.centerObject(Bounds_1, 13);
Map.addLayer(image_s2.clip(Bounds_1),visParams,'Image_s2',false);
//Classification with ML
//Классификация изображения с помощью алгоритмов машинного обучения
//Определяем каналы, на которых будем обучаться
var bands_s2 = ['B1','B2','B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9','B10', 'B11', 'B12', 'NDVI'] ;//COPERNICUS 
//Выбираем каналы изображения, на которых будем обучаться
var image_s2 = image_s2.select(bands_s2);
//Определяем полигоны, по которым будет производиться обучение для каждого класса
var polygons_s2 = polygons;
//Извлекаем образцы пикселей классов из снимка, который будем классифицировать в соответсвии 
//с определенным набором полигонов для обучения
var training_s2 = image_s2.sampleRegions({
  // Get the sample from the polygons FeatureCollection.
   collection: polygons_s2, 
   //Keep this list of properties from the polygons.
   properties: ['class'],
  // Set the scale to get Landsat pixels in the polygons.
  scale: 10
});
//Создаем классификатор Random Forest и определяем количество деревьев
var classifier_s2 = ee.Classifier.smileRandomForest({
    numberOfTrees: 30,
});
//Обучаем классификатор Random Forest
var trained_s2 = classifier_s2.train(training_s2, 'class', bands_s2);
//Классифицируем изображение
var classified_s2 = image_s2.classify(trained_s2);
//Задаем контрастные параметры визуализации
var palette = [
 //'#ed4245', 
  '#b59571' , 
  '#5865f2'
 ];
//Добавляем классифицированный растр на карту с заданными параметрами визуализации, обрезав его по области интереса.
 Map.addLayer(classified_s2.clip(Bounds_1),{min: 0, max: 1, palette: palette},'Classified_S2',false);
 var dataframe = classified_s2.reduceRegions({
 collection: points,
 reducer: ee.Reducer.mean(),
 scale: 30
});
var aoi = Bounds_border;
var styleParams = {
  fillColor: 'FF000000',
  color: '#a12d2d',
  width: 1.0,
};
var Style_white = aoi.style(styleParams);
Map.addLayer (Style_white,{},'Border_AOI');