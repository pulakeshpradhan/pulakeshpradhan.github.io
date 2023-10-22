var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                18.283474566104164,
                -33.88982977631015
              ],
              [
                18.283474566104164,
                -34.36500924321575
              ],
              [
                18.538906695010414,
                -34.36500924321575
              ],
              [
                18.538906695010414,
                -33.88982977631015
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[18.283474566104164, -33.88982977631015],
          [18.283474566104164, -34.36500924321575],
          [18.538906695010414, -34.36500924321575],
          [18.538906695010414, -33.88982977631015]]], null, false),
    TrainingData = ui.import && ui.import("TrainingData", "table", {
      "id": "users/alannarebelo/TMNP_training_final"
    }) || ee.FeatureCollection("users/alannarebelo/TMNP_training_final"),
    key = ui.import && ui.import("key", "image", {
      "id": "users/alannarebelo/TokaiKey"
    }) || ee.Image("users/alannarebelo/TokaiKey"),
    logo = ui.import && ui.import("logo", "image", {
      "id": "users/alannarebelo/logo_FOTP"
    }) || ee.Image("users/alannarebelo/logo_FOTP"),
    TrainingData21 = ui.import && ui.import("TrainingData21", "table", {
      "id": "users/alannarebelo/TMNP_TrainingFull_20210822"
    }) || ee.FeatureCollection("users/alannarebelo/TMNP_TrainingFull_20210822"),
    ChangeDetResult = ui.import && ui.import("ChangeDetResult", "image", {
      "id": "users/alannarebelo/ChangeDet_Tokai"
    }) || ee.Image("users/alannarebelo/ChangeDet_Tokai"),
    ChangeDetResult_Prob = ui.import && ui.import("ChangeDetResult_Prob", "image", {
      "id": "users/alannarebelo/ChangeDetProbability"
    }) || ee.Image("users/alannarebelo/ChangeDetProbability");
Map.centerObject(roi, 14) //Center map on Tokai with a zoom level of 4
print(ChangeDetResult_Prob, 'prob')
print(ChangeDetResult, 'ChangeDet')
//Training Data
//Map.addLayer(TrainingData, {color: 'FF0000'}, 'TrainingData');
print(TrainingData, "Training Data");
var TokaiPalette =[
  'F442D1', // Wattle // bright pink 1
  'FD0618', // Pine // red 2
  'FF7F00', // Gum // orange   3
  'A8A800', // Low Density Fynbos // olive green 4
  '14870E', // Afromontane Forest // forest green 5
  'FFFFFF', // Bareground // white 6
  '808080', // Rock // grey 7
  '0A14F9', // Water // royal blue 8
  '000000', // Shade // black 9
  'BFFF00', // High Density Fynbos // lime 10
  '30D5C8', // Wetland // turquoise 11
  '55FF00', // Grass // medium apple 12
  ];
// ---------------------------------------------------------------------------------- //
//2019
var S2019_10000 = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate("2019-12-16", "2019-12-20")
    .filterBounds(roi)
    .sort("CLOUD_COVERAGE_ASSESSMENT")
//    .first())
var S2019_10000 = S2019_10000.mosaic();
var S2019_10000 = S2019_10000.clip(roi);
    print(S2019_10000, "Sentscene2019");
//Map.addLayer(S2019_10000, {bands: ['B4', 'B3', 'B2'], max: 3000}, 'Sentscene2019');
//2018
var S2018_10000 = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate("2018-12-16", "2018-12-20")
    .filterBounds(roi)
    .sort("CLOUD_COVERAGE_ASSESSMENT")
//    .first())
    print(S2018_10000, "Sentscene2018");
var S2018_10000 = S2018_10000.mosaic();
var S2018_10000 = S2018_10000.clip(roi)
//Map.addLayer(S2018_10000, {bands: ['B4', 'B3', 'B2'], max: 3000}, 'Sentscene2018');
var S2018 = S2018_10000.divide(10000)
///////////////////////////////////////////////////////////
/////               Generating Indices               /////
//////////////////////////////////////////////////////////
// 1 NDVI 
    var NDVI = S2018.expression(
        "(NIR - RED) / (NIR + RED)",
        {
          RED: S2018.select("B4"),    //  RED
          NIR: S2018.select("B8"),    // NIR
        });
// 2 Chlogreen (Chlorophyll Green Index)
    var Chlogreen = S2018.expression(
        "(NIRnarrow) / (GREEN + REDedge1)",
        {
          NIRnarrow: S2018.select("B8A"),    
          GREEN: S2018.select("B3"),    
          REDedge1: S2018.select("B5")    
        });
// 3 LAnthoC (Leaf Anthocynanid Content)
    var LAnthoC = S2018.expression(
        "(REDedge3) / (GREEN + REDedge1)",
        {
          REDedge3: S2018.select("B7"),    
          GREEN: S2018.select("B3"),    
          REDedge1: S2018.select("B5")    
        });
// 4 LCaroC
var LCaroC = S2018.expression(
        "(Rededge3) / (Blue - Rededge1)",
        { Rededge3: S2018.select("B7"),    // Rededge3
          Blue: S2018.select("B2"),    // Blue
          Rededge1: S2018.select("B5"),    // Rededge1
          });
// 5 LChloC
var LChloC = S2018.expression(
        "(Rededge3) / (Rededge1)",
        { Rededge3: S2018.select("B7"),    // Rededge3
          Rededge1: S2018.select("B5"),    // Rededge1
          });
// 6 BAI
var BAI = S2018.expression(
        "(Blue - NIR)/(Blue + NIR)",
        { Blue: S2018.select("B2"),   
          NIR: S2018.select("B8"),    
          });
// 7 GI
var GI = S2018.expression(
        "Green/Red",
        { Green: S2018.select("B3"),   
          Red: S2018.select("B4"),
          });
// 8 gNDVI
var gNDVI = S2018.expression(
        "(NIR - Green)/(NIR + Green)",
        { NIR: S2018.select("B8"),   
          Green: S2018.select("B3"),
          });
// 9 MSI
var MSI = S2018.expression(
        "SWIR1/NIR",
        { SWIR1: S2018.select("B11"),   
          NIR: S2018.select("B8"),
          });
// 10 NDrededgeSWIR
var NDrededgeSWIR = S2018.expression(
        "(Rededge2 - SWIR2) / (Rededge2 + SWIR2)",
        { Rededge2: S2018.select("B6"),   
          SWIR2: S2018.select("B12"),
          });
// 11 NDTI (also referred to as NBR2)
var NDTI = S2018.expression(
        "(SWIR1 - SWIR2) / (SWIR1 + SWIR2)",
        { SWIR1: S2018.select("B11"),   
          SWIR2: S2018.select("B12"),
          });
// 12 NDVIre
var NDVIre = S2018.expression(
        "(NIR - Rededge1) / (NIR + Rededge1)",
        { NIR: S2018.select("B8"),   
          Rededge1: S2018.select("B5"),
          });  
// 13 NDVI1
var NDVI1 = S2018.expression(
        "(NIR - SWIR1) / (NIR + SWIR1)",
        { NIR: S2018.select("B8"),   
          SWIR1: S2018.select("B11"),
          });           
// 14 NDVI2
var NDVI2 = S2018.expression(
        "(Green - NIR) / (Green + NIR)",
        { NIR: S2018.select("B8"),   
          Green: S2018.select("B3"),
          }); 
// 15 NHI
var NHI = S2018.expression(
        "(SWIR1 - Green) / (SWIR1 + Green)",
        { SWIR1: S2018.select("B11"),   
          Green: S2018.select("B3"),
          }); 
// 16 EVI
var EVI = S2018.expression(
        "2.5 * ((NIR - Red) / (NIR + 6*Red-7.5*Blue)+1)",
        { NIR: S2018.select("B8"),   
          Red: S2018.select("B4"),
          Blue: S2018.select("B2"),
          });  
// 17 EVI2
var EVI2 = S2018.expression(
        "2.4 * ((NIR - Red) / (NIR + Red +1))",
        { NIR: S2018.select("B8"),   
          Red: S2018.select("B4"),
          }); 
// 18 EVI2_2          
var EVI2_2 = S2018.expression(
        "2.5 * ((NIR - Red) / (NIR + 2.4 * Red +1))",
        { NIR: S2018.select("B8"),   
          Red: S2018.select("B4"),
          }); 
// 19 MSAVI
var MSAVI = S2018.expression(
        "(2 * NIR + 1 - sqrt(pow((2 * NIR + 1), 2) - 8 * (NIR - Red)) ) / 2",
        { NIR: S2018.select("B8"),   
          Red: S2018.select("B4"),
          });   
// 20 Norm-G (Normalised Green)
 var NormG = S2018.expression(
        "(GREEN) / (NIRwide + RED + GREEN)",
        {
          GREEN: S2018.select("B3"),    
          NIRwide: S2018.select("B8"),    
          RED: S2018.select("B4")    
        });
// 21 Norm-NIR (Normalised NIR)
 var NormNIR = S2018.expression(
       "(NIRwide) / (NIRwide + RED + GREEN)",
        {
          GREEN: S2018.select("B3"),    
          NIRwide: S2018.select("B8"),    
          RED: S2018.select("B4")    
        });
// 22 Norm-R (Normalised Red)
 var NormR = S2018.expression(
       "(RED) / (NIRwide + RED + GREEN)",
        {
          GREEN: S2018.select("B3"),    
          NIRwide: S2018.select("B8"),    
          RED: S2018.select("B4")    
        });
// 23 RededgePeakArea (Red-edge peak area)
 var RededgePeakArea = S2018.expression(
        "(RED + Rededge1 + Rededge2 + Rededge3 + NIRnarrow)",
        {
          Rededge1: S2018.select("B5"), 
          Rededge2: S2018.select("B6"), 
          Rededge3: S2018.select("B7"), 
          NIRnarrow: S2018.select("B8A"),    
          RED: S2018.select("B4")    
        });
// 24 RedSWIR1 (Bands difference)
 var RedSWIR1 = S2018.expression(
        "(RED - SWIR)",
        {
          RED: S2018.select("B4"),    
          SWIR: S2018.select("B11")    
        });
// 25 RTVIcore (Red-edge Triangular Vegetation Index)
 var RTVIcore = S2018.expression(
        "(100 * (NIRnarrow - Rededge1) - 10 * (NIRnarrow - Green))",
        {
          NIRnarrow: S2018.select("B8A"),    
          Rededge1: S2018.select("B5"),    
          Green: S2018.select("B3")    
        });
// 26 SAVI (Soil Adjusted Vegetation Index)
 var SAVI = S2018.expression(
        "((NIRnarrow - RED) / (NIRnarrow + RED + 0.5) * 1.5)",
        {
          NIRnarrow: S2018.select("B8A"),    
          RED: S2018.select("B4")    
          });
// 27 SR-BlueRededge1 (Simple Blue and Red-edge 1 Ratio)
 var SRBlueRededge1 = S2018.expression(
        "(BLUE / REDedge1)",
        {
          BLUE: S2018.select("B2"),    
          REDedge1: S2018.select("B5")    
        });
// 28 SR-BlueRededge2 (Simple Blue and Red-edge 2 Ratio)
 var SRBlueRededge2 = S2018.expression(
        "(BLUE / REDedge2)",
        {
          BLUE: S2018.select("B2"),    
          REDedge2: S2018.select("B6")    
        });
// 29 SR-BlueRededge3 (Simple Blue and Red-edge 3 Ratio)
 var SRBlueRededge3 = S2018.expression(
        "(BLUE / REDedge3)",
        {
          BLUE: S2018.select("B2"),    
          REDedge3: S2018.select("B7")    
        });
// 30 SR-NIRnarrowBlue (Simple ratio NIR narrow and Blue)
 var SRNIRnarrowBlue = S2018.expression(
        "(NIRnarrow / BLUE)",
        {
          NIRnarrow: S2018.select("B8A"),    
          BLUE: S2018.select("B2")    
        });
// 31 SR-NIRnarrowGreen (Simple ratio NIR narrow and Green)
 var SRNIRnarrowGreen = S2018.expression(
        "(NIRnarrow / GREEN)",
        {
          NIRnarrow: S2018.select("B8A"),    
          GREEN: S2018.select("B3")    
        });
// 32 SR-NIRnarrowRed (Simple ratio NIR narrow and Red)
 var SRNIRnarrowRed = S2018.expression(
        "(NIRnarrow / RED)",
        {
          NIRnarrow: S2018.select("B8A"),    
          RED: S2018.select("B4")    
        });
// 33 SR-NIRnarrowRededge1 (Simple NIR and Red-edge 1 Ratio)
 var SRNIRnarrowRededge1 = S2018.expression(
        "(NIRnarrow / REDedge1)",
        {
          NIRnarrow: S2018.select("B8A"),    
          REDedge1: S2018.select("B5")    
        });
// 34 SR-NIRnarrowRededge2 (Simple NIR and Red-edge 2 Ratio)
 var SRNIRnarrowRededge2 = S2018.expression(
        "(NIRnarrow / REDedge2)",
        {
          NIRnarrow: S2018.select("B8A"),    
          REDedge2: S2018.select("B6")    
        });
// 35 SR-NIRnarrowRededge3 (Simple NIR and Red-edge 3 Ratio)
 var SRNIRnarrowRededge3 = S2018.expression(
        "(NIRnarrow / REDedge3)",
        {
          NIRnarrow: S2018.select("B8A"),    
          REDedge3: S2018.select("B7")    
        });
// 36 STI (Soil Tillage Index)
 var STI = S2018.expression(
        "(SWIR1 / SWIR2)",
        {
          SWIR1: S2018.select("B11"),    
          SWIR2: S2018.select("B12")
        });
// 37 WBI (Water Body Index)
 var WBI = S2018.expression(
        "(BLUE - RED) / (BLUE + RED)",
        {
          BLUE: S2018.select("B2"),    
          RED: S2018.select("B4")
        });
// 38 NDMI (Normalized Difference Moisture Index)
 var NDMI = S2018.expression(
        "(NIR-SWIR)/(NIR+SWIR)",
        {
          NIR: S2018.select("B8"),    
          SWIR: S2018.select("B11"),    
          });
// 39 NDBR (Normalized Difference Burning Ratio) (also referred to as NBR)
 var NDBR = S2018.expression(
        "(NIR-MIR)/(NIR+MIR)",
        {
          NIR: S2018.select("B8"),    
          MIR: S2018.select("B12"),    
          });
// // adding all the indices into the S2018 as new bands
var S2018 = S2018.addBands(NDVI); 
var S2018 = S2018.addBands(Chlogreen);
var S2018 = S2018.addBands(LAnthoC);
var S2018 = S2018.addBands(LCaroC);
var S2018 = S2018.addBands(LChloC);
var S2018 = S2018.addBands(BAI);
var S2018 = S2018.addBands(GI);
var S2018 = S2018.addBands(gNDVI);
var S2018 = S2018.addBands(MSI);
var S2018 = S2018.addBands(NDrededgeSWIR);
var S2018 = S2018.addBands(NDTI);
var S2018 = S2018.addBands(NDVIre);
var S2018 = S2018.addBands(NDVI1);
var S2018 = S2018.addBands(NDVI2);
var S2018 = S2018.addBands(NHI);
var S2018 = S2018.addBands(EVI);
var S2018 = S2018.addBands(EVI2);
var S2018 = S2018.addBands(EVI2_2);
var S2018 = S2018.addBands(MSAVI);
var S2018 = S2018.addBands(NormG);
var S2018 = S2018.addBands(NormNIR);
var S2018 = S2018.addBands(NormR);
var S2018 = S2018.addBands(RededgePeakArea);
var S2018 = S2018.addBands(RedSWIR1);
var S2018 = S2018.addBands(RTVIcore);
var S2018 = S2018.addBands(SAVI);
var S2018 = S2018.addBands(SRBlueRededge1);
var S2018 = S2018.addBands(SRBlueRededge2);
var S2018 = S2018.addBands(SRBlueRededge3);
var S2018 = S2018.addBands(SRNIRnarrowBlue);
var S2018 = S2018.addBands(SRNIRnarrowGreen);
var S2018 = S2018.addBands(SRNIRnarrowRed);
var S2018 = S2018.addBands(SRNIRnarrowRededge1);
var S2018 = S2018.addBands(SRNIRnarrowRededge2);
var S2018 = S2018.addBands(SRNIRnarrowRededge3);
var S2018 = S2018.addBands(STI);
var S2018 = S2018.addBands(WBI);
var S2018 = S2018.addBands(NDMI);
var S2018 = S2018.addBands(NDBR);
print (S2018, "allindices added");
// Training data
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B11', 'B12', 'B8_1', 'B8A_1', 'B7_1', 'B7_2', 'B7_3', "B2_1", "B3_1", "B8_2", "B11_1", 
                "B6_1", "B11_2", "B8_3", "B8_4", "B3_2", "B11_3", "constant", "constant_1", "constant_2", "constant_3",
                "B3_3", "B8_5", "B4_1", "B4_2", "B4_3", "constant_4", "B8A_2", "B2_2", "B2_3", "B2_4", 
                "B8A_3", "B8A_4", "B8A_5", "B8A_6", "B8A_7", "B8A_8", "B11_4", "B2_5", "B8_6", "B8_7"];
print (bands, "allbands&indices")
var training_data = S2018.select(bands).sampleRegions({ // Generate training data
  collection: TrainingData, 
  properties: ['Landcover', 'LCLU'], 
  geometries: true,
  scale: 10
});
var classifier = ee.Classifier.libsvm().train({ // Train the classifier with training data
  features: training_data, 
  classProperty: 'Landcover', 
  inputProperties: bands
});
var classified2018 = S2018.select(bands).classify(classifier); // Run the classification 
Map.addLayer(classified2018, {min: 1, max: 12, palette: TokaiPalette}, '2018'); //Display classification 
// ---------------------------------------------------------------------------------- //
//2020
var S2020_10000 = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate("2020-12-16", "2020-12-20")
    .filterBounds(roi)
    .sort("CLOUD_COVERAGE_ASSESSMENT")
//    .first())
    print(S2020_10000, "Sentscene2020");
var S2020_10000 = S2020_10000.mosaic();
var S2020_10000 = S2020_10000.clip(roi)
//Map.addLayer(S2020_10000, {bands: ['B4', 'B3', 'B2'], max: 3000}, 'Sentscene2020');
var S2020 = S2020_10000.divide(10000)
///////////////////////////////////////////////////////////
/////               Generating Indices               /////
//////////////////////////////////////////////////////////
// 1 NDVI 
    var NDVI = S2020.expression(
        "(NIR - RED) / (NIR + RED)",
        {
          RED: S2020.select("B4"),    //  RED
          NIR: S2020.select("B8"),    // NIR
        });
// 2 Chlogreen (Chlorophyll Green Index)
    var Chlogreen = S2020.expression(
        "(NIRnarrow) / (GREEN + REDedge1)",
        {
          NIRnarrow: S2020.select("B8A"),    
          GREEN: S2020.select("B3"),    
          REDedge1: S2020.select("B5")    
        });
// 3 LAnthoC (Leaf Anthocynanid Content)
    var LAnthoC = S2020.expression(
        "(REDedge3) / (GREEN + REDedge1)",
        {
          REDedge3: S2020.select("B7"),    
          GREEN: S2020.select("B3"),    
          REDedge1: S2020.select("B5")    
        });
// 4 LCaroC
var LCaroC = S2020.expression(
        "(Rededge3) / (Blue - Rededge1)",
        { Rededge3: S2020.select("B7"),    // Rededge3
          Blue: S2020.select("B2"),    // Blue
          Rededge1: S2020.select("B5"),    // Rededge1
          });
// 5 LChloC
var LChloC = S2020.expression(
        "(Rededge3) / (Rededge1)",
        { Rededge3: S2020.select("B7"),    // Rededge3
          Rededge1: S2020.select("B5"),    // Rededge1
          });
// 6 BAI
var BAI = S2020.expression(
        "(Blue - NIR)/(Blue + NIR)",
        { Blue: S2020.select("B2"),   
          NIR: S2020.select("B8"),    
          });
// 7 GI
var GI = S2020.expression(
        "Green/Red",
        { Green: S2020.select("B3"),   
          Red: S2020.select("B4"),
          });
// 8 gNDVI
var gNDVI = S2020.expression(
        "(NIR - Green)/(NIR + Green)",
        { NIR: S2020.select("B8"),   
          Green: S2020.select("B3"),
          });
// 9 MSI
var MSI = S2020.expression(
        "SWIR1/NIR",
        { SWIR1: S2020.select("B11"),   
          NIR: S2020.select("B8"),
          });
// 10 NDrededgeSWIR
var NDrededgeSWIR = S2020.expression(
        "(Rededge2 - SWIR2) / (Rededge2 + SWIR2)",
        { Rededge2: S2020.select("B6"),   
          SWIR2: S2020.select("B12"),
          });
// 11 NDTI (also referred to as NBR2)
var NDTI = S2020.expression(
        "(SWIR1 - SWIR2) / (SWIR1 + SWIR2)",
        { SWIR1: S2020.select("B11"),   
          SWIR2: S2020.select("B12"),
          });
// 12 NDVIre
var NDVIre = S2020.expression(
        "(NIR - Rededge1) / (NIR + Rededge1)",
        { NIR: S2020.select("B8"),   
          Rededge1: S2020.select("B5"),
          });  
// 13 NDVI1
var NDVI1 = S2020.expression(
        "(NIR - SWIR1) / (NIR + SWIR1)",
        { NIR: S2020.select("B8"),   
          SWIR1: S2020.select("B11"),
          });           
// 14 NDVI2
var NDVI2 = S2020.expression(
        "(Green - NIR) / (Green + NIR)",
        { NIR: S2020.select("B8"),   
          Green: S2020.select("B3"),
          }); 
// 15 NHI
var NHI = S2020.expression(
        "(SWIR1 - Green) / (SWIR1 + Green)",
        { SWIR1: S2020.select("B11"),   
          Green: S2020.select("B3"),
          }); 
// 16 EVI
var EVI = S2020.expression(
        "2.5 * ((NIR - Red) / (NIR + 6*Red-7.5*Blue)+1)",
        { NIR: S2020.select("B8"),   
          Red: S2020.select("B4"),
          Blue: S2020.select("B2"),
          });  
// 17 EVI2
var EVI2 = S2020.expression(
        "2.4 * ((NIR - Red) / (NIR + Red +1))",
        { NIR: S2020.select("B8"),   
          Red: S2020.select("B4"),
          }); 
// 18 EVI2_2          
var EVI2_2 = S2020.expression(
        "2.5 * ((NIR - Red) / (NIR + 2.4 * Red +1))",
        { NIR: S2020.select("B8"),   
          Red: S2020.select("B4"),
          }); 
// 19 MSAVI
var MSAVI = S2020.expression(
        "(2 * NIR + 1 - sqrt(pow((2 * NIR + 1), 2) - 8 * (NIR - Red)) ) / 2",
        { NIR: S2020.select("B8"),   
          Red: S2020.select("B4"),
          });   
// 20 Norm-G (Normalised Green)
 var NormG = S2020.expression(
        "(GREEN) / (NIRwide + RED + GREEN)",
        {
          GREEN: S2020.select("B3"),    
          NIRwide: S2020.select("B8"),    
          RED: S2020.select("B4")    
        });
// 21 Norm-NIR (Normalised NIR)
 var NormNIR = S2020.expression(
       "(NIRwide) / (NIRwide + RED + GREEN)",
        {
          GREEN: S2020.select("B3"),    
          NIRwide: S2020.select("B8"),    
          RED: S2020.select("B4")    
        });
// 22 Norm-R (Normalised Red)
 var NormR = S2020.expression(
       "(RED) / (NIRwide + RED + GREEN)",
        {
          GREEN: S2020.select("B3"),    
          NIRwide: S2020.select("B8"),    
          RED: S2020.select("B4")    
        });
// 23 RededgePeakArea (Red-edge peak area)
 var RededgePeakArea = S2020.expression(
        "(RED + Rededge1 + Rededge2 + Rededge3 + NIRnarrow)",
        {
          Rededge1: S2020.select("B5"), 
          Rededge2: S2020.select("B6"), 
          Rededge3: S2020.select("B7"), 
          NIRnarrow: S2020.select("B8A"),    
          RED: S2020.select("B4")    
        });
// 24 RedSWIR1 (Bands difference)
 var RedSWIR1 = S2020.expression(
        "(RED - SWIR)",
        {
          RED: S2020.select("B4"),    
          SWIR: S2020.select("B11")    
        });
// 25 RTVIcore (Red-edge Triangular Vegetation Index)
 var RTVIcore = S2020.expression(
        "(100 * (NIRnarrow - Rededge1) - 10 * (NIRnarrow - Green))",
        {
          NIRnarrow: S2020.select("B8A"),    
          Rededge1: S2020.select("B5"),    
          Green: S2020.select("B3")    
        });
// 26 SAVI (Soil Adjusted Vegetation Index)
 var SAVI = S2020.expression(
        "((NIRnarrow - RED) / (NIRnarrow + RED + 0.5) * 1.5)",
        {
          NIRnarrow: S2020.select("B8A"),    
          RED: S2020.select("B4")    
          });
// 27 SR-BlueRededge1 (Simple Blue and Red-edge 1 Ratio)
 var SRBlueRededge1 = S2020.expression(
        "(BLUE / REDedge1)",
        {
          BLUE: S2020.select("B2"),    
          REDedge1: S2020.select("B5")    
        });
// 28 SR-BlueRededge2 (Simple Blue and Red-edge 2 Ratio)
 var SRBlueRededge2 = S2020.expression(
        "(BLUE / REDedge2)",
        {
          BLUE: S2020.select("B2"),    
          REDedge2: S2020.select("B6")    
        });
// 29 SR-BlueRededge3 (Simple Blue and Red-edge 3 Ratio)
 var SRBlueRededge3 = S2020.expression(
        "(BLUE / REDedge3)",
        {
          BLUE: S2020.select("B2"),    
          REDedge3: S2020.select("B7")    
        });
// 30 SR-NIRnarrowBlue (Simple ratio NIR narrow and Blue)
 var SRNIRnarrowBlue = S2020.expression(
        "(NIRnarrow / BLUE)",
        {
          NIRnarrow: S2020.select("B8A"),    
          BLUE: S2020.select("B2")    
        });
// 31 SR-NIRnarrowGreen (Simple ratio NIR narrow and Green)
 var SRNIRnarrowGreen = S2020.expression(
        "(NIRnarrow / GREEN)",
        {
          NIRnarrow: S2020.select("B8A"),    
          GREEN: S2020.select("B3")    
        });
// 32 SR-NIRnarrowRed (Simple ratio NIR narrow and Red)
 var SRNIRnarrowRed = S2020.expression(
        "(NIRnarrow / RED)",
        {
          NIRnarrow: S2020.select("B8A"),    
          RED: S2020.select("B4")    
        });
// 33 SR-NIRnarrowRededge1 (Simple NIR and Red-edge 1 Ratio)
 var SRNIRnarrowRededge1 = S2020.expression(
        "(NIRnarrow / REDedge1)",
        {
          NIRnarrow: S2020.select("B8A"),    
          REDedge1: S2020.select("B5")    
        });
// 34 SR-NIRnarrowRededge2 (Simple NIR and Red-edge 2 Ratio)
 var SRNIRnarrowRededge2 = S2020.expression(
        "(NIRnarrow / REDedge2)",
        {
          NIRnarrow: S2020.select("B8A"),    
          REDedge2: S2020.select("B6")    
        });
// 35 SR-NIRnarrowRededge3 (Simple NIR and Red-edge 3 Ratio)
 var SRNIRnarrowRededge3 = S2020.expression(
        "(NIRnarrow / REDedge3)",
        {
          NIRnarrow: S2020.select("B8A"),    
          REDedge3: S2020.select("B7")    
        });
// 36 STI (Soil Tillage Index)
 var STI = S2020.expression(
        "(SWIR1 / SWIR2)",
        {
          SWIR1: S2020.select("B11"),    
          SWIR2: S2020.select("B12")
        });
// 37 WBI (Water Body Index)
 var WBI = S2020.expression(
        "(BLUE - RED) / (BLUE + RED)",
        {
          BLUE: S2020.select("B2"),    
          RED: S2020.select("B4")
        });
// 38 NDMI (Normalized Difference Moisture Index)
 var NDMI = S2020.expression(
        "(NIR-SWIR)/(NIR+SWIR)",
        {
          NIR: S2020.select("B8"),    
          SWIR: S2020.select("B11"),    
          });
// 39 NDBR (Normalized Difference Burning Ratio) (also referred to as NBR)
 var NDBR = S2020.expression(
        "(NIR-MIR)/(NIR+MIR)",
        {
          NIR: S2020.select("B8"),    
          MIR: S2020.select("B12"),    
          });
// // adding all the indices into the S2020 as new bands
var S2020 = S2020.addBands(NDVI); 
var S2020 = S2020.addBands(Chlogreen);
var S2020 = S2020.addBands(LAnthoC);
var S2020 = S2020.addBands(LCaroC);
var S2020 = S2020.addBands(LChloC);
var S2020 = S2020.addBands(BAI);
var S2020 = S2020.addBands(GI);
var S2020 = S2020.addBands(gNDVI);
var S2020 = S2020.addBands(MSI);
var S2020 = S2020.addBands(NDrededgeSWIR);
var S2020 = S2020.addBands(NDTI);
var S2020 = S2020.addBands(NDVIre);
var S2020 = S2020.addBands(NDVI1);
var S2020 = S2020.addBands(NDVI2);
var S2020 = S2020.addBands(NHI);
var S2020 = S2020.addBands(EVI);
var S2020 = S2020.addBands(EVI2);
var S2020 = S2020.addBands(EVI2_2);
var S2020 = S2020.addBands(MSAVI);
var S2020 = S2020.addBands(NormG);
var S2020 = S2020.addBands(NormNIR);
var S2020 = S2020.addBands(NormR);
var S2020 = S2020.addBands(RededgePeakArea);
var S2020 = S2020.addBands(RedSWIR1);
var S2020 = S2020.addBands(RTVIcore);
var S2020 = S2020.addBands(SAVI);
var S2020 = S2020.addBands(SRBlueRededge1);
var S2020 = S2020.addBands(SRBlueRededge2);
var S2020 = S2020.addBands(SRBlueRededge3);
var S2020 = S2020.addBands(SRNIRnarrowBlue);
var S2020 = S2020.addBands(SRNIRnarrowGreen);
var S2020 = S2020.addBands(SRNIRnarrowRed);
var S2020 = S2020.addBands(SRNIRnarrowRededge1);
var S2020 = S2020.addBands(SRNIRnarrowRededge2);
var S2020 = S2020.addBands(SRNIRnarrowRededge3);
var S2020 = S2020.addBands(STI);
var S2020 = S2020.addBands(WBI);
var S2020 = S2020.addBands(NDMI);
var S2020 = S2020.addBands(NDBR);
print (S2020, "allindices added");
var training_data = S2020.select(bands).sampleRegions({ // Generate training data
  collection: TrainingData, 
  properties: ['Landcover', 'LCLU'], 
  geometries: true,
  scale: 10
});
var classifier = ee.Classifier.libsvm().train({ // Train the classifier with training data
  features: training_data, 
  classProperty: 'Landcover', 
  inputProperties: bands
});
var classified2020 = S2020.select(bands).classify(classifier); // Run the classification 
Map.addLayer(classified2020, {min: 1, max: 12, palette: TokaiPalette}, '2020'); //Display classification 
// //Configure the imagery
// var images = {
//   '2018': classified2018.visualize({min: 1, max: 12, palette: TokaiPalette}),
//   'Sentinel Image 2018': S2018_10000.visualize({bands: ['B4', 'B3', 'B2'], max: 3000}),
//   '2020': classified2020.visualize({min: 1, max: 12, palette: TokaiPalette}),
//   'Sentinel Image 2019': S2019_10000.visualize({bands: ['B4', 'B3', 'B2'], max: 3000}),
//   'Sentinel Image 2020': S2020_10000.visualize({bands: ['B4', 'B3', 'B2'], max: 3000}),
// };
// // ---------------------------------------------------------------------------------- //
// 2021
var S2021_10000 = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate("2021-07-24", "2021-07-25")
    .filterBounds(roi)
    .sort("CLOUD_COVERAGE_ASSESSMENT")
//    .first())
    print(S2021_10000, "Sentscene2021");
var S2021_10000 = S2021_10000.mosaic();
var S2021_10000 = S2021_10000.clip(roi)
//Map.addLayer(S2020_10000, {bands: ['B4', 'B3', 'B2'], max: 3000}, 'Sentscene2021');
var S2021 = S2021_10000.divide(10000)
///////////////////////////////////////////////////////////
/////               Generating Indices               /////
//////////////////////////////////////////////////////////
// 1 NDVI 
    var NDVI = S2021.expression(
        "(NIR - RED) / (NIR + RED)",
        {
          RED: S2021.select("B4"),    //  RED
          NIR: S2021.select("B8"),    // NIR
        });
// 2 Chlogreen (Chlorophyll Green Index)
    var Chlogreen = S2021.expression(
        "(NIRnarrow) / (GREEN + REDedge1)",
        {
          NIRnarrow: S2021.select("B8A"),    
          GREEN: S2021.select("B3"),    
          REDedge1: S2021.select("B5")    
        });
// 3 LAnthoC (Leaf Anthocynanid Content)
    var LAnthoC = S2021.expression(
        "(REDedge3) / (GREEN + REDedge1)",
        {
          REDedge3: S2021.select("B7"),    
          GREEN: S2021.select("B3"),    
          REDedge1: S2021.select("B5")    
        });
// 4 LCaroC
var LCaroC = S2021.expression(
        "(Rededge3) / (Blue - Rededge1)",
        { Rededge3: S2021.select("B7"),    // Rededge3
          Blue: S2021.select("B2"),    // Blue
          Rededge1: S2021.select("B5"),    // Rededge1
          });
// 5 LChloC
var LChloC = S2021.expression(
        "(Rededge3) / (Rededge1)",
        { Rededge3: S2021.select("B7"),    // Rededge3
          Rededge1: S2021.select("B5"),    // Rededge1
          });
// 6 BAI
var BAI = S2021.expression(
        "(Blue - NIR)/(Blue + NIR)",
        { Blue: S2021.select("B2"),   
          NIR: S2021.select("B8"),    
          });
// 7 GI
var GI = S2021.expression(
        "Green/Red",
        { Green: S2021.select("B3"),   
          Red: S2021.select("B4"),
          });
// 8 gNDVI
var gNDVI = S2021.expression(
        "(NIR - Green)/(NIR + Green)",
        { NIR: S2021.select("B8"),   
          Green: S2021.select("B3"),
          });
// 9 MSI
var MSI = S2021.expression(
        "SWIR1/NIR",
        { SWIR1: S2021.select("B11"),   
          NIR: S2021.select("B8"),
          });
// 10 NDrededgeSWIR
var NDrededgeSWIR = S2021.expression(
        "(Rededge2 - SWIR2) / (Rededge2 + SWIR2)",
        { Rededge2: S2021.select("B6"),   
          SWIR2: S2021.select("B12"),
          });
// 11 NDTI (also referred to as NBR2)
var NDTI = S2021.expression(
        "(SWIR1 - SWIR2) / (SWIR1 + SWIR2)",
        { SWIR1: S2021.select("B11"),   
          SWIR2: S2021.select("B12"),
          });
// 12 NDVIre
var NDVIre = S2021.expression(
        "(NIR - Rededge1) / (NIR + Rededge1)",
        { NIR: S2021.select("B8"),   
          Rededge1: S2021.select("B5"),
          });  
// 13 NDVI1
var NDVI1 = S2021.expression(
        "(NIR - SWIR1) / (NIR + SWIR1)",
        { NIR: S2021.select("B8"),   
          SWIR1: S2021.select("B11"),
          });           
// 14 NDVI2
var NDVI2 = S2021.expression(
        "(Green - NIR) / (Green + NIR)",
        { NIR: S2021.select("B8"),   
          Green: S2021.select("B3"),
          }); 
// 15 NHI
var NHI = S2021.expression(
        "(SWIR1 - Green) / (SWIR1 + Green)",
        { SWIR1: S2021.select("B11"),   
          Green: S2021.select("B3"),
          }); 
// 16 EVI
var EVI = S2021.expression(
        "2.5 * ((NIR - Red) / (NIR + 6*Red-7.5*Blue)+1)",
        { NIR: S2021.select("B8"),   
          Red: S2021.select("B4"),
          Blue: S2021.select("B2"),
          });  
// 17 EVI2
var EVI2 = S2021.expression(
        "2.4 * ((NIR - Red) / (NIR + Red +1))",
        { NIR: S2021.select("B8"),   
          Red: S2021.select("B4"),
          }); 
// 18 EVI2_2          
var EVI2_2 = S2021.expression(
        "2.5 * ((NIR - Red) / (NIR + 2.4 * Red +1))",
        { NIR: S2021.select("B8"),   
          Red: S2021.select("B4"),
          }); 
// 19 MSAVI
var MSAVI = S2021.expression(
        "(2 * NIR + 1 - sqrt(pow((2 * NIR + 1), 2) - 8 * (NIR - Red)) ) / 2",
        { NIR: S2021.select("B8"),   
          Red: S2021.select("B4"),
          });   
// 20 Norm-G (Normalised Green)
 var NormG = S2021.expression(
        "(GREEN) / (NIRwide + RED + GREEN)",
        {
          GREEN: S2021.select("B3"),    
          NIRwide: S2021.select("B8"),    
          RED: S2021.select("B4")    
        });
// 21 Norm-NIR (Normalised NIR)
 var NormNIR = S2021.expression(
       "(NIRwide) / (NIRwide + RED + GREEN)",
        {
          GREEN: S2021.select("B3"),    
          NIRwide: S2021.select("B8"),    
          RED: S2021.select("B4")    
        });
// 22 Norm-R (Normalised Red)
 var NormR = S2021.expression(
       "(RED) / (NIRwide + RED + GREEN)",
        {
          GREEN: S2021.select("B3"),    
          NIRwide: S2021.select("B8"),    
          RED: S2021.select("B4")    
        });
// 23 RededgePeakArea (Red-edge peak area)
 var RededgePeakArea = S2021.expression(
        "(RED + Rededge1 + Rededge2 + Rededge3 + NIRnarrow)",
        {
          Rededge1: S2021.select("B5"), 
          Rededge2: S2021.select("B6"), 
          Rededge3: S2021.select("B7"), 
          NIRnarrow: S2021.select("B8A"),    
          RED: S2021.select("B4")    
        });
// 24 RedSWIR1 (Bands difference)
 var RedSWIR1 = S2021.expression(
        "(RED - SWIR)",
        {
          RED: S2021.select("B4"),    
          SWIR: S2021.select("B11")    
        });
// 25 RTVIcore (Red-edge Triangular Vegetation Index)
 var RTVIcore = S2021.expression(
        "(100 * (NIRnarrow - Rededge1) - 10 * (NIRnarrow - Green))",
        {
          NIRnarrow: S2021.select("B8A"),    
          Rededge1: S2021.select("B5"),    
          Green: S2021.select("B3")    
        });
// 26 SAVI (Soil Adjusted Vegetation Index)
 var SAVI = S2021.expression(
        "((NIRnarrow - RED) / (NIRnarrow + RED + 0.5) * 1.5)",
        {
          NIRnarrow: S2021.select("B8A"),    
          RED: S2021.select("B4")    
          });
// 27 SR-BlueRededge1 (Simple Blue and Red-edge 1 Ratio)
 var SRBlueRededge1 = S2021.expression(
        "(BLUE / REDedge1)",
        {
          BLUE: S2021.select("B2"),    
          REDedge1: S2021.select("B5")    
        });
// 28 SR-BlueRededge2 (Simple Blue and Red-edge 2 Ratio)
 var SRBlueRededge2 = S2021.expression(
        "(BLUE / REDedge2)",
        {
          BLUE: S2021.select("B2"),    
          REDedge2: S2021.select("B6")    
        });
// 29 SR-BlueRededge3 (Simple Blue and Red-edge 3 Ratio)
 var SRBlueRededge3 = S2021.expression(
        "(BLUE / REDedge3)",
        {
          BLUE: S2021.select("B2"),    
          REDedge3: S2021.select("B7")    
        });
// 30 SR-NIRnarrowBlue (Simple ratio NIR narrow and Blue)
 var SRNIRnarrowBlue = S2021.expression(
        "(NIRnarrow / BLUE)",
        {
          NIRnarrow: S2021.select("B8A"),    
          BLUE: S2021.select("B2")    
        });
// 31 SR-NIRnarrowGreen (Simple ratio NIR narrow and Green)
 var SRNIRnarrowGreen = S2021.expression(
        "(NIRnarrow / GREEN)",
        {
          NIRnarrow: S2021.select("B8A"),    
          GREEN: S2021.select("B3")    
        });
// 32 SR-NIRnarrowRed (Simple ratio NIR narrow and Red)
 var SRNIRnarrowRed = S2021.expression(
        "(NIRnarrow / RED)",
        {
          NIRnarrow: S2021.select("B8A"),    
          RED: S2021.select("B4")    
        });
// 33 SR-NIRnarrowRededge1 (Simple NIR and Red-edge 1 Ratio)
 var SRNIRnarrowRededge1 = S2021.expression(
        "(NIRnarrow / REDedge1)",
        {
          NIRnarrow: S2021.select("B8A"),    
          REDedge1: S2021.select("B5")    
        });
// 34 SR-NIRnarrowRededge2 (Simple NIR and Red-edge 2 Ratio)
 var SRNIRnarrowRededge2 = S2021.expression(
        "(NIRnarrow / REDedge2)",
        {
          NIRnarrow: S2021.select("B8A"),    
          REDedge2: S2021.select("B6")    
        });
// 35 SR-NIRnarrowRededge3 (Simple NIR and Red-edge 3 Ratio)
 var SRNIRnarrowRededge3 = S2021.expression(
        "(NIRnarrow / REDedge3)",
        {
          NIRnarrow: S2021.select("B8A"),    
          REDedge3: S2021.select("B7")    
        });
// 36 STI (Soil Tillage Index)
 var STI = S2021.expression(
        "(SWIR1 / SWIR2)",
        {
          SWIR1: S2021.select("B11"),    
          SWIR2: S2021.select("B12")
        });
// 37 WBI (Water Body Index)
 var WBI = S2021.expression(
        "(BLUE - RED) / (BLUE + RED)",
        {
          BLUE: S2021.select("B2"),    
          RED: S2021.select("B4")
        });
// 38 NDMI (Normalized Difference Moisture Index)
 var NDMI = S2021.expression(
        "(NIR-SWIR)/(NIR+SWIR)",
        {
          NIR: S2021.select("B8"),    
          SWIR: S2021.select("B11"),    
          });
// 39 NDBR (Normalized Difference Burning Ratio) (also referred to as NBR)
 var NDBR = S2021.expression(
        "(NIR-MIR)/(NIR+MIR)",
        {
          NIR: S2021.select("B8"),    
          MIR: S2021.select("B12"),    
          });
// // adding all the indices into the S2021 as new bands
var S2021 = S2021.addBands(NDVI); 
var S2021 = S2021.addBands(Chlogreen);
var S2021 = S2021.addBands(LAnthoC);
var S2021 = S2021.addBands(LCaroC);
var S2021 = S2021.addBands(LChloC);
var S2021 = S2021.addBands(BAI);
var S2021 = S2021.addBands(GI);
var S2021 = S2021.addBands(gNDVI);
var S2021 = S2021.addBands(MSI);
var S2021 = S2021.addBands(NDrededgeSWIR);
var S2021 = S2021.addBands(NDTI);
var S2021 = S2021.addBands(NDVIre);
var S2021 = S2021.addBands(NDVI1);
var S2021 = S2021.addBands(NDVI2);
var S2021 = S2021.addBands(NHI);
var S2021 = S2021.addBands(EVI);
var S2021 = S2021.addBands(EVI2);
var S2021 = S2021.addBands(EVI2_2);
var S2021 = S2021.addBands(MSAVI);
var S2021 = S2021.addBands(NormG);
var S2021 = S2021.addBands(NormNIR);
var S2021 = S2021.addBands(NormR);
var S2021 = S2021.addBands(RededgePeakArea);
var S2021 = S2021.addBands(RedSWIR1);
var S2021 = S2021.addBands(RTVIcore);
var S2021 = S2021.addBands(SAVI);
var S2021 = S2021.addBands(SRBlueRededge1);
var S2021 = S2021.addBands(SRBlueRededge2);
var S2021 = S2021.addBands(SRBlueRededge3);
var S2021 = S2021.addBands(SRNIRnarrowBlue);
var S2021 = S2021.addBands(SRNIRnarrowGreen);
var S2021 = S2021.addBands(SRNIRnarrowRed);
var S2021 = S2021.addBands(SRNIRnarrowRededge1);
var S2021 = S2021.addBands(SRNIRnarrowRededge2);
var S2021 = S2021.addBands(SRNIRnarrowRededge3);
var S2021 = S2021.addBands(STI);
var S2021 = S2021.addBands(WBI);
var S2021 = S2021.addBands(NDMI);
var S2021 = S2021.addBands(NDBR);
print (S2021, "2021 Allindices added");
var TrainingData21 = S2021.select(bands).sampleRegions({ // Generate training data
  collection: TrainingData21, 
  properties: ['Landcover', 'LCLU'], 
  geometries: true,
  scale: 10
});
var classifier21 = ee.Classifier.libsvm().train({ // Train the classifier with training data
  features: TrainingData21, 
  classProperty: 'Landcover', 
  inputProperties: bands
});
var classified2021 = S2021.select(bands).classify(classifier21); // Run the classification 
Map.addLayer(classified2021, {min: 1, max: 12, palette: TokaiPalette}, '2021'); //Display classification 
//-------------------------------------------------------------------------------------//
//Configure the imagery
var images = {
  'Alien Tree Map Dec 2018': classified2018.visualize({min: 1, max: 12, palette: TokaiPalette}),
  'Alien Tree Map Dec 2020': classified2020.visualize({min: 1, max: 12, palette: TokaiPalette}),
  'Alien Tree Map Jul 2021': classified2021.visualize({min: 1, max: 12, palette: TokaiPalette}),
  //'Alien Tree Clearing 2021': ChangeDetResult.visualize({min: 0, max: 1, palette: ['white', 'red'], opacity: 0.5 }),
  'Alien Tree Clearing Probability 2021': ChangeDetResult_Prob.visualize({min:0,max:100, palette: ['blue', 'green', 'yellow', 'red']}),
  'Sentinel Image Dec 2018': S2018_10000.visualize({bands: ['B4', 'B3', 'B2'], max: 3000}),
  'Sentinel Image Dec 2019': S2019_10000.visualize({bands: ['B4', 'B3', 'B2'], max: 3000}),
  'Sentinel Image Dec 2020': S2020_10000.visualize({bands: ['B4', 'B3', 'B2'], max: 3000}),
  'Sentinel Image Jul 2021': S2021_10000.visualize({bands: ['B4', 'B3', 'B2'], max: 3000}),
};
// ---------------------------------------------------------------------------------- //
// //Configure the imagery
// var images = {
//   '2017': getWeeklySentinelComposite('2017-12-30'),
//   '2018': getWeeklySentinelComposite('2018-12-30'),
//   '2019': getWeeklySentinelComposite('2019-12-30'),
//   '2020': getWeeklySentinelComposite('2020-12-30'),
// };
// // Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// // given date.
// function getWeeklySentinelComposite(date) {
//   var date = ee.Date(date);
//   // Only include the VV polarization, for consistent compositing.
//   var polarization = 'VV';
//   var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
//                       .filterDate(date, date.advance(1, 'week'))
//                       .filterBounds(roi)
//                       .filter(ee.Filter.listContains(
//                           'transmitterReceiverPolarisation', polarization))
//                       .filter(ee.Filter.eq('instrumentMode', 'IW'))
//                       .select(polarization)
//                       .mean();
//   return sentinel1.visualize({min: -25, max: 0, palette: ['aqua', 'black']});
// }
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
//Tie everything together
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// // Create a title. -TO FINALISE
// var title = ui.Label('Change in alien trees at Tokai Park, South Africa', {
//   stretch: 'horizontal',
//   textAlign: 'center',
//   fontWeight: 'bold',
//   fontSize: '24px'
// });
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(18.41, -34.06, 14);
// ADD A KEY
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var main = ui.Panel({style: {width: '310px', padding: '8px'}});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var title = ui.Label('Tokai Park Alien Tree Tool', {fontWeight: 'bold', fontSize: '20px', color: 'green'});
var descr = ui.Label("This tool shows invasive alien tree cover at Tokai Park in December of 2018 and 2020 and July of 2021, as well as in greater Table Mountain National Park. It is mapped from Sentinel-2 imagery in three broad categories: pine, gum, and wattle, at a 20 m resolution. Developed by the Friends of Tokai Park, the project was led by Dr Alanna Rebelo, funded by the Izele Small Grant Scheme (2021) and a WESSA Small Grant (2021) and uses methodology from Holden & Rebelo et al. 2021. Choose between the 2018, 2020 and 2021 alien tree map, and compare the results to the Sentinel-2 mosaic of December 2018, 2019 or 2020, and July 2021. In addition, we have recently added some change detection results which show alien tree clearing as a probability (with blue being low, red being high) in 2021.", {color: 'black'});
var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'133px',height:'123px'}});
var key = ui.Thumbnail({image:key,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'201px',height:'300px'}});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
main.add(title);
main.add(branding);
main.add(descr);
main.add(key);
ui.root.insert(0, main);
//////////////////////////////////////////////////////////////////////// END ////////////////////////////////////////////////////////////////////////