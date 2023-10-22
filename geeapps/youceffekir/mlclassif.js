var L8 = ui.import && ui.import("L8", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA"),
    S2 = ui.import && ui.import("S2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    foret = ui.import && ui.import("foret", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                0.16510974953278357,
                35.43110633389273
              ],
              [
                0.16472351143463904,
                35.430302066150816
              ],
              [
                0.1648093421231156,
                35.42967263361958
              ],
              [
                0.1657105643521195,
                35.42963766500139
              ],
              [
                0.16613971779450232,
                35.430511875901345
              ],
              [
                0.16558181831940466,
                35.43093149376254
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "cover": 0
      },
      "color": "#06490d",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #06490d */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[0.16510974953278357, 35.43110633389273],
                  [0.16472351143463904, 35.430302066150816],
                  [0.1648093421231156, 35.42967263361958],
                  [0.1657105643521195, 35.42963766500139],
                  [0.16613971779450232, 35.430511875901345],
                  [0.16558181831940466, 35.43093149376254]]]),
            {
              "cover": 0,
              "system:index": "0"
            })]),
    urbain = ui.import && ui.import("urbain", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                0.1391459662686234,
                35.42781927593206
              ],
              [
                0.13880264351471716,
                35.42649042718727
              ],
              [
                0.14000427315338904,
                35.426000845807295
              ],
              [
                0.1412059027920609,
                35.42677018663974
              ],
              [
                0.14112007210358435,
                35.42788921473236
              ],
              [
                0.14043342659577185,
                35.42788921473236
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
                0.13021240234376563,
                35.403428113129
              ],
              [
                0.12952575683595313,
                35.403148272623554
              ],
              [
                0.1302982330322422,
                35.40251862793449
              ],
              [
                0.13132820129396094,
                35.403148272623554
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
                0.1300407409668125,
                35.38698583558955
              ],
              [
                0.12986907958985938,
                35.38628608983918
              ],
              [
                0.1309848785400547,
                35.38628608983918
              ],
              [
                0.13107070922853126,
                35.38705580983071
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
                0.15098342895509376,
                35.39188388587132
              ],
              [
                0.15106925964357032,
                35.391394094228616
              ],
              [
                0.15175590515138282,
                35.391813915818766
              ],
              [
                0.15175590515138282,
                35.39244364410632
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "cover": 1
      },
      "color": "#d2fd08",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d2fd08 */
    /* shown: false */
    /* locked: true */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[0.1391459662686234, 35.42781927593206],
                  [0.13880264351471716, 35.42649042718727],
                  [0.14000427315338904, 35.426000845807295],
                  [0.1412059027920609, 35.42677018663974],
                  [0.14112007210358435, 35.42788921473236],
                  [0.14043342659577185, 35.42788921473236]]]),
            {
              "cover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[0.13021240234376563, 35.403428113129],
                  [0.12952575683595313, 35.403148272623554],
                  [0.1302982330322422, 35.40251862793449],
                  [0.13132820129396094, 35.403148272623554]]]),
            {
              "cover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[0.1300407409668125, 35.38698583558955],
                  [0.12986907958985938, 35.38628608983918],
                  [0.1309848785400547, 35.38628608983918],
                  [0.13107070922853126, 35.38705580983071]]]),
            {
              "cover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[0.15098342895509376, 35.39188388587132],
                  [0.15106925964357032, 35.391394094228616],
                  [0.15175590515138282, 35.391813915818766],
                  [0.15175590515138282, 35.39244364410632]]]),
            {
              "cover": 1,
              "system:index": "3"
            })]),
    roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                0.11294518201758752,
                35.43318790752318
              ],
              [
                0.11294518201758752,
                35.37246217466731
              ],
              [
                0.16993675916602502,
                35.37246217466731
              ],
              [
                0.16993675916602502,
                35.43318790752318
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
      "color": "#9dbfc2",
      "mode": "Geometry",
      "shown": false,
      "locked": true
    }) || 
    /* color: #9dbfc2 */
    /* shown: false */
    /* locked: true */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[0.11294518201758752, 35.43318790752318],
          [0.11294518201758752, 35.37246217466731],
          [0.16993675916602502, 35.37246217466731],
          [0.16993675916602502, 35.43318790752318]]], null, false),
    sol = ui.import && ui.import("sol", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                0.15664825439454688,
                35.42455326565779
              ],
              [
                0.15673408508302344,
                35.423644018859505
              ],
              [
                0.15784988403321876,
                35.42413361456468
              ],
              [
                0.15784988403321876,
                35.42518273819813
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
                0.12635002136232032,
                35.43007846781007
              ],
              [
                0.12720832824708594,
                35.42867971828749
              ],
              [
                0.127980804443375,
                35.430288278143124
              ],
              [
                0.12703666687013282,
                35.4305680244036
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
                0.1639009475708164,
                35.3941228954997
              ],
              [
                0.16377220153810157,
                35.39338822731776
              ],
              [
                0.16454467773439063,
                35.394367783406345
              ],
              [
                0.1641584396362461,
                35.39468263819359
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
                0.1618410110473789,
                35.39510244266422
              ],
              [
                0.16158351898194923,
                35.39408791145233
              ],
              [
                0.16261348724366798,
                35.394962508083495
              ],
              [
                0.16248474121095313,
                35.395557228374464
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "cover": 2
      },
      "color": "#0000ff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0000ff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[0.15664825439454688, 35.42455326565779],
                  [0.15673408508302344, 35.423644018859505],
                  [0.15784988403321876, 35.42413361456468],
                  [0.15784988403321876, 35.42518273819813]]]),
            {
              "cover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[0.12635002136232032, 35.43007846781007],
                  [0.12720832824708594, 35.42867971828749],
                  [0.127980804443375, 35.430288278143124],
                  [0.12703666687013282, 35.4305680244036]]]),
            {
              "cover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[0.1639009475708164, 35.3941228954997],
                  [0.16377220153810157, 35.39338822731776],
                  [0.16454467773439063, 35.394367783406345],
                  [0.1641584396362461, 35.39468263819359]]]),
            {
              "cover": 2,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[0.1618410110473789, 35.39510244266422],
                  [0.16158351898194923, 35.39408791145233],
                  [0.16261348724366798, 35.394962508083495],
                  [0.16248474121095313, 35.395557228374464]]]),
            {
              "cover": 2,
              "system:index": "3"
            })]),
    roi1 = ui.import && ui.import("roi1", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -0.6768535614013516,
                35.30927701003341
              ],
              [
                -0.6768535614013516,
                35.17356284560945
              ],
              [
                -0.5470775604247891,
                35.17356284560945
              ],
              [
                -0.5470775604247891,
                35.30927701003341
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
        [[[-0.6768535614013516, 35.30927701003341],
          [-0.6768535614013516, 35.17356284560945],
          [-0.5470775604247891, 35.17356284560945],
          [-0.5470775604247891, 35.30927701003341]]], null, false);
var L8_d= L8.filterDate('2020-01-01', '2020-09-30');
var L8_stud = L8_d.filterBounds(roi);
var L8_study = L8_stud.filterMetadata('CLOUD_COVER',"less_than",1).median().clip(roi);
var S2_d= S2.filterDate('2020-01-01', '2020-09-30');
var S2_stud = S2_d.filterBounds(roi);
var S2_study = S2_stud.filterMetadata('CLOUD_COVERAGE_ASSESSMENT',"less_than",1).median().clip(roi);
//print(S2_study);
var trueColor432 = L8_study.select(['B4', 'B3', 'B2']);
var trueColor432Vis = {
  min: 0.0,
  max: 0.4,
};
var trueColour = {
        bands: ["B4", "B3", "B2"],
        min: 0,
        max: 3000
        };
Map.setCenter(0.1, 35.4, 12);
Map.addLayer(trueColor432, trueColor432Vis, 'Image Landsat 8 (432)');
Map.addLayer(S2_study,trueColour,'Images Sentinel 2');
var echant = foret.merge(urbain).merge(sol);
//print(echant, 'echant');
var bands = ['B2', 'B5','B8'];
// Sample the input imagery to get a FeatureCollection of training data.
var training = S2_study.select(bands).sampleRegions({
  collection: echant,
  properties: ['cover'],
  scale: 5
});
var training1 = L8_study.select(bands).sampleRegions({
  collection: echant,
  properties: ['cover'],
  scale: 30
});
// Make a SVM classifier and train it.
//var classifier = ee.Classifier.libsvm({ kernelType: 'RBF', gamma: 0.5, cost: 10 });
var classifier = ee.Classifier.smileRandomForest(50).train({
  features: training1,  
  classProperty: 'cover' 
  //inputProperties: S2_study.bandNames()
});
// Train the classifier.
//var trained = classifier.train(training, 'cover', bands);
// Classify the input imagery.
var classified = L8_study.classify(classifier);
// Train a CART classifier with default parameters.
var trainedCART = ee.Classifier.smileCart().train(training, 'cover', bands);
// Classify the image with the same bands used for training.
var classifiedCART = S2_study.classify(trainedCART);
// Define a palette for the Land Use classification.
var palette = [
  'green', // urban (0)  // grey
  'red', // water (1)  // blue
  'yellow' //  forest (2) // green
];
// Display the classification result and the input image.
Map.addLayer(classified, {min: 0, max: 2, palette: palette}, 'L8 Land Use Classification SVM');
Map.addLayer(classifiedCART, {min: 0, max: 2, palette: palette}, 'L8 Land Use Classification CART');
var trainAccuracy = classifier.confusionMatrix();
print('Resubstitution error matrix: ', trainAccuracy);
print('Training overall accuracy: ', trainAccuracy.accuracy());