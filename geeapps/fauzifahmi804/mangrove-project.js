var L8 = ui.import && ui.import("L8", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    SRTM = ui.import && ui.import("SRTM", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.1368358616631,
                -6.325463582817778
              ],
              [
                108.26352195785451,
                -6.328875897906621
              ],
              [
                108.2622643434692,
                -6.206416846895236
              ],
              [
                108.14622125264889,
                -6.205051603158603
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
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
                [[[108.1368358616631, -6.325463582817778],
                  [108.26352195785451, -6.328875897906621],
                  [108.2622643434692, -6.206416846895236],
                  [108.14622125264889, -6.205051603158603]]]),
            {
              "system:index": "0"
            })]),
    Mangrove = ui.import && ui.import("Mangrove", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.19298356577458,
                -6.237138384886136
              ],
              [
                108.19326251551213,
                -6.237319695454772
              ],
              [
                108.19343417688908,
                -6.237095723566745
              ],
              [
                108.19292992159428,
                -6.236957074254791
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.19335907503667,
                -6.23820491674231
              ],
              [
                108.19290846392217,
                -6.238119594273678
              ],
              [
                108.19298356577458,
                -6.238407557549663
              ],
              [
                108.19329470202031,
                -6.238418222853144
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.19120334235267,
                -6.240442940592228
              ],
              [
                108.19131063071326,
                -6.240627316073567
              ],
              [
                108.19163249579505,
                -6.240478002434512
              ],
              [
                108.19131063071326,
                -6.240392680335943
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.19082783309058,
                -6.241561162672429
              ],
              [
                108.19117115584449,
                -6.241614488866726
              ],
              [
                108.1914071902378,
                -6.2413158621087375
              ],
              [
                108.19102095213965,
                -6.241262535884035
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            108.19340275374488,
            -6.240515968168371
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            108.19312380400733,
            -6.2409425784218735
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            108.19245861617163,
            -6.241155883418356
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            108.19314526167945,
            -6.241710476002781
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 1
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
                [[[108.19298356577458, -6.237138384886136],
                  [108.19326251551213, -6.237319695454772],
                  [108.19343417688908, -6.237095723566745],
                  [108.19292992159428, -6.236957074254791]]]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[108.19335907503667, -6.23820491674231],
                  [108.19290846392217, -6.238119594273678],
                  [108.19298356577458, -6.238407557549663],
                  [108.19329470202031, -6.238418222853144]]]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[108.19120334235267, -6.240442940592228],
                  [108.19131063071326, -6.240627316073567],
                  [108.19163249579505, -6.240478002434512],
                  [108.19131063071326, -6.240392680335943]]]),
            {
              "landcover": 1,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[108.19082783309058, -6.241561162672429],
                  [108.19117115584449, -6.241614488866726],
                  [108.1914071902378, -6.2413158621087375],
                  [108.19102095213965, -6.241262535884035]]]),
            {
              "landcover": 1,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([108.19340275374488, -6.240515968168371]),
            {
              "landcover": 1,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([108.19312380400733, -6.2409425784218735]),
            {
              "landcover": 1,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([108.19245861617163, -6.241155883418356]),
            {
              "landcover": 1,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([108.19314526167945, -6.241710476002781]),
            {
              "landcover": 1,
              "system:index": "7"
            })]),
    NonMangrove = ui.import && ui.import("NonMangrove", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.19374607649878,
                -6.241337192597089
              ],
              [
                108.19394992438392,
                -6.241369188327996
              ],
              [
                108.19410012808875,
                -6.241198544407235
              ],
              [
                108.1937675341709,
                -6.241155883418356
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.19017184244937,
                -6.242414381129809
              ],
              [
                108.19038641917057,
                -6.242425046351727
              ],
              [
                108.19054888335303,
                -6.242318394122719
              ],
              [
                108.19019483176307,
                -6.242233072323899
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.19574010836429,
                -6.240899917412155
              ],
              [
                108.19581521021671,
                -6.241123887674421
              ],
              [
                108.19614780413455,
                -6.240878586905992
              ],
              [
                108.19590104090518,
                -6.240750603850781
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.193347577923,
                -6.242745002908435
              ],
              [
                108.19374454485721,
                -6.242478372458089
              ],
              [
                108.19358361231632,
                -6.242275733225046
              ],
              [
                108.19312227236576,
                -6.242574359435851
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.19763911234683,
                -6.240046696488345
              ],
              [
                108.1978858755762,
                -6.240110688105826
              ],
              [
                108.19786441790409,
                -6.239844056314774
              ],
              [
                108.19762838351078,
                -6.239833391040313
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            108.20188773142642,
            -6.242617020309201
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            108.21326688262445,
            -6.2484872476532445
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            108.20966199370844,
            -6.250748243612244
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            108.20777371856195,
            -6.250662923187435
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            108.22034791442377,
            -6.2484872476532445
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "landcover": 0
      },
      "color": "#ffc82d",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #ffc82d */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[108.19374607649878, -6.241337192597089],
                  [108.19394992438392, -6.241369188327996],
                  [108.19410012808875, -6.241198544407235],
                  [108.1937675341709, -6.241155883418356]]]),
            {
              "landcover": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[108.19017184244937, -6.242414381129809],
                  [108.19038641917057, -6.242425046351727],
                  [108.19054888335303, -6.242318394122719],
                  [108.19019483176307, -6.242233072323899]]]),
            {
              "landcover": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[108.19574010836429, -6.240899917412155],
                  [108.19581521021671, -6.241123887674421],
                  [108.19614780413455, -6.240878586905992],
                  [108.19590104090518, -6.240750603850781]]]),
            {
              "landcover": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[108.193347577923, -6.242745002908435],
                  [108.19374454485721, -6.242478372458089],
                  [108.19358361231632, -6.242275733225046],
                  [108.19312227236576, -6.242574359435851]]]),
            {
              "landcover": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[108.19763911234683, -6.240046696488345],
                  [108.1978858755762, -6.240110688105826],
                  [108.19786441790409, -6.239844056314774],
                  [108.19762838351078, -6.239833391040313]]]),
            {
              "landcover": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([108.20188773142642, -6.242617020309201]),
            {
              "landcover": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([108.21326688262445, -6.2484872476532445]),
            {
              "landcover": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([108.20966199370844, -6.250748243612244]),
            {
              "landcover": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([108.20777371856195, -6.250662923187435]),
            {
              "landcover": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([108.22034791442377, -6.2484872476532445]),
            {
              "landcover": 0,
              "system:index": "9"
            })]);
//=====================================================================================================================
//                                        NASA - University of Maryland (ESSIC)
// Mangrove Extent Mapping Tutorial for Guyana
//                                                  
// Code: Mangrove Extent Mapping Tutorial for Guyana
// Written by: Abigail Barenblitt NASA Goddard and University of Maryland 
// Objective: This code works through a tutorial for mapping mangrove extent in Guyana in 2009 and 2019
//=====================================================================================================================
///////////////////////////////////////////////////////////////
//                    1) Set up the map                      //
///////////////////////////////////////////////////////////////
//Center the map to the region of interest using the region shapefile
Map.centerObject(geometry,11)
Map.setOptions('satellite')
///////////////////////////////////////////////////////////////
//            2) Set up Filtered Landsat Composite           //
///////////////////////////////////////////////////////////////
//2.1) Cloud Masking
////////////////////
//Landsat data includes a 'pixel_qa' band which can be used to create 
//     a function to mask clouds
function maskClouds(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
    var cloudShadowBitMask = ee.Number(2).pow(3).int();
    var cloudsBitMask = ee.Number(2).pow(5).int();  
    // Get the pixel QA band.
    var qa = image.select('pixel_qa');
     // Both flags should be set to zero, indicating clear conditions.
    var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0).and(qa.bitwiseAnd(cloudsBitMask).eq(0)); 
  // Return the masked image, scaled to [0, 1].
  return image.updateMask(mask).divide(10000).copyProperties(image, ["system:time_start"]);
}
//2.2) Adding Spectral Indices
///////////////////////////////
// This function maps spectral indices for Mangrove Mapping using Landsat 8 Imagery
var addIndicesL8 = function(img) {
  // NDVI
  var ndvi = img.normalizedDifference(['B5','B4']).rename('NDVI');
  // NDMI (Normalized Difference Mangrove Index - Shi et al 2016 - New spectral metrics for mangrove forest identification)
  var ndmi = img.normalizedDifference(['B7','B3']).rename('NDMI');
  // MNDWI (Modified Normalized Difference Water Index - Hanqiu Xu, 2006)
  var mndwi = img.normalizedDifference(['B3','B6']).rename('MNDWI');
  // SR (Simple Ratio)
  var sr = img.select('B5').divide(img.select('B4')).rename('SR');
  // Band Ratio 54
  var ratio54 = img.select('B6').divide(img.select('B5')).rename('R54');
  // Band Ratio 35
  var ratio35 = img.select('B4').divide(img.select('B6')).rename('R35');
  // GCVI
  var gcvi = img.expression('(NIR/GREEN)-1',{
    'NIR':img.select('B5'),
    'GREEN':img.select('B3')
  }).rename('GCVI');
  return img
    .addBands(ndvi)
    .addBands(ndmi)
    .addBands(mndwi)
    .addBands(sr)
    .addBands(ratio54)
    .addBands(ratio35)
    .addBands(gcvi);
};
//2.3) Filter Landsat data by Date and Region
/////////////////////////////////////////////
// Temporal Parameters
// Select the desired central year here
var year = 2021; 
// Start date will be set one year before the central year
var startDate = (year-1)+'-01-01'; 
// End date will be set to one year later than the central year.
var endDate = (year+1)+'-12-31'; 
//2.4) Apply filters and masks to Landsat 8 imagery
///////////////////////////////////////////////////
var l8 = L8.filterDate(startDate,endDate)
// Mask for clouds and cloud shadows
    .map(maskClouds)
//Add the indices
    .map(addIndicesL8)
//2.5) Composite the Landsat image collection
/////////////////////////////////////////////
//You can composite on a per pixel, per-band basis using .median()
// OR with quality bands like .qualityMosaic('NDVI')
var composite = l8
              // Uses the median reducer
              .median() 
              // Clips the composite to our area of interest
              .clip(geometry); 
//2.6) Mask to areas of low elevation and high NDVI and MNDWI
/////////////////////////////////////////////////////////////
// Clip SRTM data to region
var srtmClip = SRTM.clip(geometry);
//Mask to elevations less than 65 meters
var elevationMask = srtmClip.lt(65);
//Used the NDVI and MNDWI bands to create masks
var NDVIMask = composite.select('NDVI').gt(0.25);
var MNDWIMask = composite.select('MNDWI').gt(-0.50);
//Apply the masks
var compositeNew = composite
                        .updateMask(NDVIMask)
                        .updateMask(MNDWIMask)
                        .updateMask(elevationMask)
//2.7) Display results
///////////////////////
//Select bands and parameters for visualization
var visPar = {bands:['B5','B6','B4'], min: 0, max: 0.35}; 
//Add layer to map
Map.addLayer(compositeNew.clip(geometry), visPar, 'Landsat Composite 2019')
///////////////////////////////////////////////////////////////
//          3) Construct Random Forest Model                 //
///////////////////////////////////////////////////////////////
//3.1) Prepare training data and predictors
////////////////////////////////////////////
//After drawing training polygons, merge them together
var classes = Mangrove.merge(NonMangrove)
//Define the bands you want to include in the model
var bands = ['B5','B6','B4','NDVI','MNDWI','SR','GCVI']
//Create a variable called image to select the bands of interest and clip to geometry
var image = compositeNew.select(bands).clip(geometry)
//Assemble samples for the model
var samples = image.sampleRegions({
    collection: classes, // Set of geometries selected for training
    properties: ['landcover'], // Label from each geometry
    scale: 30 // Make each sample the same size as Landsat pixel
    }).randomColumn('random'); // creates a column with random numbers
//Here we randomly split our samples to set some aside for testing our model's accuracy
// using the "random" column we created
var split = 0.8; // Roughly 80% for training, 20% for testing.
var training = samples.filter(ee.Filter.lt('random', split)); //Subset training data
var testing = samples.filter(ee.Filter.gte('random', split)); //Subset testing data
//Print these variables to see how much training and testing data you are using
    print('Samples n =', samples.aggregate_count('.all'));
    print('Training n =', training.aggregate_count('.all'));
    print('Testing n =', testing.aggregate_count('.all'));
//3.2) Begin Random Forest Classification
/////////////////////////////////////////
//.smileRandomForest is used to run the model. Here we run the model using 100 trees
// and 5 randomly selected predictors per split ("(100,5)")
    var classifier = ee.Classifier.smileRandomForest(100,5).train({ 
    features: training.select(['B5','B6','B4','NDVI','MNDWI','SR','GCVI', 'landcover']), //Train using bands and landcover property
    classProperty: 'landcover', //Pull the landcover property from classes
    inputProperties: bands
    });
//3.3) Test the accuracy of the model
//////////////////////////////////////
    var validation = testing.classify(classifier);
    var testAccuracy = validation.errorMatrix('landcover', 'classification');
    print('Validation error matrix RF: ', testAccuracy);
    print('Validation overall accuracy RF: ', testAccuracy.accuracy());
//3.4) Classify the Landsat composite using the Random Forest model
///////////////////////////////////////////////////////////////////
    var classifiedrf = image.select(bands) // select the predictors
                      .classify(classifier); // .classify applies the Random Forest
//The model results may be "noisy". To reduce noise, create a mask to mask
// unconnected pixels
    var pixelcount = classifiedrf.connectedPixelCount(100, false); //Create an image that shows the number of pixels each pixel is connected to
    var countmask = pixelcount.select(0).gt(25); //filter out all pixels connected to 4 or less 
//Mask the results to only display mangrove extent
    var classMask = classifiedrf.select('classification').gt(0)
    var classed= classifiedrf.updateMask(countmask).updateMask(classMask)
//3.5) Map results
////////////////////
//Add classification to map
Map.addLayer (classed, {min: 1, max: 1, palette:'blue'}, 'Mangrove Extent 2019');
//For comparison, let's add the GMW dataset to the map
var GMW = ee.Image('projects/mangrovescience/GuyanaGMW')
Map.addLayer (GMW, {min: 1, max: 1, palette:'green'}, 'Global Mangrove Watch');
//6.2) Calculate Mangrove Area in 2019
///////////////////////////////////////
//Use reduceRegion with a Sum reducer to calculate total area
var get2019 = classed.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:geometry,
      scale: 100,
      maxPixels:1e13,
      tileScale: 16
      }).get('classification');
print(get2019, 'Mangrove Extent 2019 in ha')