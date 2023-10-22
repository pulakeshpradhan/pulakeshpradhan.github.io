var india_states = ui.import && ui.import("india_states", "table", {
      "id": "users/karanknit/india_state_merge"
    }) || ee.FeatureCollection("users/karanknit/india_state_merge"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/karanknit/india_dist_sorted"
    }) || ee.FeatureCollection("users/karanknit/india_dist_sorted"),
    trainingPts = ui.import && ui.import("trainingPts", "table", {
      "id": "projects/earthengine-community/tutorials/classify-maizeland-ng/training-pts"
    }) || ee.FeatureCollection("projects/earthengine-community/tutorials/classify-maizeland-ng/training-pts"),
    rabi_rice = ui.import && ui.import("rabi_rice", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                76.63760802264034,
                15.849556175634982
              ],
              [
                76.63827321047603,
                15.849597459425175
              ],
              [
                76.63889548296748,
                15.850794685666795
              ],
              [
                76.63820883745967,
                15.851393296124035
              ],
              [
                76.63692137713252,
                15.851475862944291
              ],
              [
                76.63651368136226,
                15.849514891836355
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
                76.6386038683157,
                15.824632948856344
              ],
              [
                76.63993424398708,
                15.824715526617315
              ],
              [
                76.64034193975735,
                15.824220059545459
              ],
              [
                76.64042777044583,
                15.826387719018946
              ],
              [
                76.63841074926663,
                15.824632948856344
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
                76.64718693716335,
                15.829525622976748
              ],
              [
                76.64753025991726,
                15.82929853945727
              ],
              [
                76.64825982076931,
                15.830330735216881
              ],
              [
                76.6474658869009,
                15.830433954502872
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
                76.34240362973073,
                15.321862557448425
              ],
              [
                76.34261820645192,
                15.320807110049747
              ],
              [
                76.34319756359913,
                15.320972670778259
              ],
              [
                76.34296152920582,
                15.322235067023227
              ],
              [
                76.3423821720586,
                15.322048812318762
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
      "color": "#e6f566",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #e6f566 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[76.63760802264034, 15.849556175634982],
                  [76.63827321047603, 15.849597459425175],
                  [76.63889548296748, 15.850794685666795],
                  [76.63820883745967, 15.851393296124035],
                  [76.63692137713252, 15.851475862944291],
                  [76.63651368136226, 15.849514891836355]]]),
            {
              "class": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[76.6386038683157, 15.824632948856344],
                  [76.63993424398708, 15.824715526617315],
                  [76.64034193975735, 15.824220059545459],
                  [76.64042777044583, 15.826387719018946],
                  [76.63841074926663, 15.824632948856344]]]),
            {
              "class": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[76.64718693716335, 15.829525622976748],
                  [76.64753025991726, 15.82929853945727],
                  [76.64825982076931, 15.830330735216881],
                  [76.6474658869009, 15.830433954502872]]]),
            {
              "class": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[76.34240362973073, 15.321862557448425],
                  [76.34261820645192, 15.320807110049747],
                  [76.34319756359913, 15.320972670778259],
                  [76.34296152920582, 15.322235067023227],
                  [76.3423821720586, 15.322048812318762]]]),
            {
              "class": 1,
              "system:index": "3"
            })]),
    other = ui.import && ui.import("other", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                76.0065114841743,
                15.014775733479262
              ],
              [
                76.00698355296092,
                15.014858633810283
              ],
              [
                76.00702646830516,
                15.015687635350963
              ],
              [
                76.00633982279734,
                15.015563285324987
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
                76.0120046482368,
                15.012454511148983
              ],
              [
                76.01333502390818,
                15.011749849379864
              ],
              [
                76.01470831492381,
                15.011874201625654
              ],
              [
                76.01475123026805,
                15.012744665319564
              ],
              [
                76.01204756358104,
                15.012827566438776
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
                75.94021506227116,
                14.976596621480764
              ],
              [
                75.94180293000798,
                14.976679536610408
              ],
              [
                75.94158835328679,
                14.978586575732473
              ],
              [
                75.93871302522282,
                14.978462204133441
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
                75.97583479798894,
                14.998319287475963
              ],
              [
                75.97707934297185,
                14.99815347395109
              ],
              [
                75.97798056520085,
                14.998858180543891
              ],
              [
                75.97677893556218,
                15.000930833533497
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
                75.99630714344917,
                14.966500546315647
              ],
              [
                75.99738002705513,
                14.966666384357216
              ],
              [
                75.99695087361275,
                14.968324757715234
              ],
              [
                75.99583507466255,
                14.968449135199778
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
                76.58794919209382,
                15.832297411172345
              ],
              [
                76.58833543019196,
                15.832318054832825
              ],
              [
                76.58839980320832,
                15.83254513495892
              ],
              [
                76.58779898838898,
                15.832524491321642
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
                76.57947341160676,
                15.828333789282514
              ],
              [
                76.57968798832795,
                15.827797042841626
              ],
              [
                76.5812114830484,
                15.828313145214985
              ],
              [
                76.58114711003205,
                15.828808602253476
              ],
              [
                76.58005276875397,
                15.82862280600639
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
                76.57801428990265,
                15.834712705134802
              ],
              [
                76.57872239308259,
                15.834671418301111
              ],
              [
                76.57921591954133,
                15.834939782569291
              ],
              [
                76.57938758091828,
                15.835951306221874
              ],
              [
                76.57779971318146,
                15.836054522636315
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
                76.5915111656656,
                15.829964663952767
              ],
              [
                76.5928629990091,
                15.829820156602034
              ],
              [
                76.59354964451691,
                15.830563336162054
              ],
              [
                76.59344235615632,
                15.832421273103595
              ],
              [
                76.59183303074738,
                15.832090974451514
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
      "color": "#141cff",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #141cff */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[76.0065114841743, 15.014775733479262],
                  [76.00698355296092, 15.014858633810283],
                  [76.00702646830516, 15.015687635350963],
                  [76.00633982279734, 15.015563285324987]]]),
            {
              "class": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[76.0120046482368, 15.012454511148983],
                  [76.01333502390818, 15.011749849379864],
                  [76.01470831492381, 15.011874201625654],
                  [76.01475123026805, 15.012744665319564],
                  [76.01204756358104, 15.012827566438776]]]),
            {
              "class": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[75.94021506227116, 14.976596621480764],
                  [75.94180293000798, 14.976679536610408],
                  [75.94158835328679, 14.978586575732473],
                  [75.93871302522282, 14.978462204133441]]]),
            {
              "class": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[75.97583479798894, 14.998319287475963],
                  [75.97707934297185, 14.99815347395109],
                  [75.97798056520085, 14.998858180543891],
                  [75.97677893556218, 15.000930833533497]]]),
            {
              "class": 2,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[75.99630714344917, 14.966500546315647],
                  [75.99738002705513, 14.966666384357216],
                  [75.99695087361275, 14.968324757715234],
                  [75.99583507466255, 14.968449135199778]]]),
            {
              "class": 2,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[76.58794919209382, 15.832297411172345],
                  [76.58833543019196, 15.832318054832825],
                  [76.58839980320832, 15.83254513495892],
                  [76.58779898838898, 15.832524491321642]]]),
            {
              "class": 2,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[76.57947341160676, 15.828333789282514],
                  [76.57968798832795, 15.827797042841626],
                  [76.5812114830484, 15.828313145214985],
                  [76.58114711003205, 15.828808602253476],
                  [76.58005276875397, 15.82862280600639]]]),
            {
              "class": 2,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[76.57801428990265, 15.834712705134802],
                  [76.57872239308259, 15.834671418301111],
                  [76.57921591954133, 15.834939782569291],
                  [76.57938758091828, 15.835951306221874],
                  [76.57779971318146, 15.836054522636315]]]),
            {
              "class": 2,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[76.5915111656656, 15.829964663952767],
                  [76.5928629990091, 15.829820156602034],
                  [76.59354964451691, 15.830563336162054],
                  [76.59344235615632, 15.832421273103595],
                  [76.59183303074738, 15.832090974451514]]]),
            {
              "class": 2,
              "system:index": "8"
            })]),
    mask = ui.import && ui.import("mask", "image", {
      "id": "users/amitverma/nagaland_mask_agri_50m"
    }) || ee.Image("users/amitverma/nagaland_mask_agri_50m");
// Display training and validation points to see distribution within the AOI.
// Then, filter collection
// Load sent 2 data, filter by date and bounds. 
var st = ee.FeatureCollection('users/karanknit/india_state_merge')
  .filter(ee.Filter.eq('STATE_NAME', 'Rajasthan'));
  /*var st = ee.FeatureCollection('users/karanknit/india_dist_sorted')
  .filter(ee.Filter.or(
     ee.Filter.eq('DISTNAME', 'Bellary'),
     ee.Filter.eq('DISTNAME', 'Davanagere'),
     ee.Filter.eq('DISTNAME', 'Koppal'),
     ee.Filter.eq('DISTNAME', 'Raichur'),
     ee.Filter.eq('DISTNAME', 'Yadgir')
  ));*/
 /* var st1 = ee.FeatureCollection('users/karanknit/india_dist_sorted')
  .filter(ee.Filter.or(ee.Filter.eq('DISTNAME', 'Alwar'), ee.Filter.eq('DISTNAME', 'Bharatpur')));*/
    var st1 = ee.FeatureCollection('users/karanknit/india_dist_sorted')
  .filter(ee.Filter.eq('DISTNAME', 'Raichur'));
    var dt = ee.FeatureCollection('users/karanknit/india_dist_sorted')
  .filter(ee.Filter.eq('STATENAME', 'Nagaland'));
   var dt_name = ee.FeatureCollection('users/karanknit/india_dist_sorted')
  .filter(ee.Filter.eq('DISTNAME', 'Baran'));
  var gt = ee.FeatureCollection('users/karanknit/Rajasthan_gt_21_22_1');
 // .filter(ee.Filter.eq('class', 1));
  //var crop_mask1 = crop_mask.clip(st);
var collection = ee.ImageCollection('COPERNICUS/S2_SR') 
                   .filterDate('2022-01-01', '2022-01-31')
                   .filterBounds(st);
var collection1 = ee.ImageCollection('COPERNICUS/S2_SR') 
                   .filterDate('2021-01-01', '2021-01-31')
                   .filterBounds(st);
var collection2 = ee.ImageCollection('COPERNICUS/S2_SR') 
                   .filterDate('2020-01-01', '2020-01-31')
                   .filterBounds(st);
//print(collection);
//var mosaic = collection.min().select(['B2', 'B3', 'B4', 'B8', 'B11', 'B12']).clip(table10);
var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
};
var withNDVI = collection.map(addNDVI);
var withNDVI1 = collection1.map(addNDVI);
var withNDVI2 = collection2.map(addNDVI);
var greenest = withNDVI.qualityMosaic('NDVI').select(['B2', 'B3', 'B4', 'B8', 'B11', 'B12']).clip(st);
var greenest1 = withNDVI1.qualityMosaic('NDVI').select(['B2', 'B3', 'B4', 'B8', 'B11', 'B12']).clip(st);
var greenest2 = withNDVI2.qualityMosaic('NDVI').select(['B2', 'B3', 'B4', 'B8', 'B11', 'B12']).clip(st);
var ndvi = greenest.normalizedDifference(['B8', 'B4']).rename('NDVI');
var ndvi1 = greenest1.normalizedDifference(['B8', 'B4']).rename('NDVI1');
var ndvi2 = greenest2.normalizedDifference(['B8', 'B4']).rename('NDVI1');
var ndvi_scaled = ndvi.multiply(100).add(100).uint8();
var ndvi_scaled1 = ndvi1.multiply(100).add(100).uint8();
var ndvi_scaled2 = ndvi1.multiply(100).add(100).uint8();
var ndvi_diff22_21 = (((ndvi_scaled.subtract(ndvi_scaled1)).divide(ndvi_scaled1)).multiply(100))
var ndvi_dev_intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#FF3333" quantity="-5000" label="1-100" />' +
      '<ColorMapEntry color="#FF3333" quantity="-30" label="-30" />' +
      '<ColorMapEntry color="#FF9933" quantity="-20" label="-30 to -20" />' +
      '<ColorMapEntry color="#FBD733" quantity="-10" label="120-130" />' +
      '<ColorMapEntry color="#FBFF00" quantity="0" label="130-140" />' +
      '<ColorMapEntry color="#5DFF00" quantity="10" label="140-150" />' +
      '<ColorMapEntry color="#86FF33" quantity="20" label="150-160" />' +
      '<ColorMapEntry color="#00B808" quantity="30" label="160-170" />' +
      '<ColorMapEntry color="#FF01C9" quantity="5000" label="30" />' +
      '</ColorMap>' +
  '</RasterSymbolizer>';
  Map.addLayer(ndvi_diff22_21.sldStyle(ndvi_dev_intervals), {}, 'ndvi_diff_22_21');
var ndvidiff = ['red', 'green'];
//Map.addLayer(ndvi_diff22_21, {min:-30, max: 20, palette: ndvidiff}, 'ndvi_diff_22_21');
//var stacked_composite = ndvi.addBands([ndvi1,ndvi2,ndvi3,ndvi4,ndvi5,ndvi6,ndvi7,ndvi8,ndvi9,ndvi10,ndvi11]);
//print(stacked_composite);
var S2_bands = ['B4', 'B3', 'B2'];
var S2_display = {bands: S2_bands, min: 0, max: 2000};
Map.addLayer(greenest, S2_display, 'feb2022');
Map.addLayer(greenest1, S2_display, 'feb2021');
Map.addLayer(greenest2, S2_display, 'feb2020');
 //Map.addLayer(gt, {color: 'green'}, 'must_gt');
var ndviPalette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
//Map.addLayer(ndvi_scaled, {min:100, max: 200, palette: ndviPalette}, 'ndvi2022');
//Map.addLayer(ndvi_scaled1, {min:100, max: 200, palette: ndviPalette}, 'ndvi2021');
//Map.addLayer(greenest, S2_display, 'spatial mosaic');
var sld_intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#0000ff" quantity="0" label="0"/>' +
      '<ColorMapEntry color="#BA3840" quantity="100" label="1-100" />' +
      '<ColorMapEntry color="#D1B58D" quantity="110" label="100-110" />' +
      '<ColorMapEntry color="#FFFF00" quantity="120" label="110-120" />' +
      '<ColorMapEntry color="#FFD600" quantity="130" label="120-130" />' +
      '<ColorMapEntry color="#FEA500" quantity="140" label="130-140" />' +
      '<ColorMapEntry color="#7FFED1" quantity="150" label="140-150" />' +
      '<ColorMapEntry color="#80FF00" quantity="160" label="150-160" />' +
      '<ColorMapEntry color="#00FF01" quantity="170" label="160-170" />' +
      '<ColorMapEntry color="#016300" quantity="180" label="170-180" />' +
      '<ColorMapEntry color="#099EF2" quantity="190" label="180-190" />' +
      '<ColorMapEntry color="#9E21EF" quantity="200" label="190-200" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
/*var ndviPalette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];*/
Map.addLayer(ndvi_scaled.sldStyle(sld_intervals), {}, 'ndvi2022');
Map.addLayer(ndvi_scaled1.sldStyle(sld_intervals), {}, 'ndvi2021');
Map.addLayer(ndvi_scaled2.sldStyle(sld_intervals), {}, 'ndvi2020');