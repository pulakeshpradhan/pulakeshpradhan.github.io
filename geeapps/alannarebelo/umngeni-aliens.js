var roi = ui.import && ui.import("roi", "table", {
      "id": "users/alannarebelo/uMngeniCatchment"
    }) || ee.FeatureCollection("users/alannarebelo/uMngeniCatchment"),
    TrainingData = ui.import && ui.import("TrainingData", "table", {
      "id": "users/alannarebelo/uMngeniTrain_2021"
    }) || ee.FeatureCollection("users/alannarebelo/uMngeniTrain_2021"),
    key = ui.import && ui.import("key", "image", {
      "id": "users/alannarebelo/uMngeniKey"
    }) || ee.Image("users/alannarebelo/uMngeniKey"),
    logo = ui.import && ui.import("logo", "image", {
      "id": "users/alannarebelo/logo_SEBEI"
    }) || ee.Image("users/alannarebelo/logo_SEBEI");
Map.centerObject(roi)
//Training Data
//Map.addLayer(TrainingData, {color: 'FF0000'}, 'TrainingData');
print(TrainingData, "Training Data");
var uMngenipalette =[
  '08F3E4', // Wetland // turquoise
  'FFFDD0', // Bare Ground // white
  '0A14F9', // Water // royal blue
  'F98B88', // Dryland Crops //peach
  'CCFF00', // Irrigated Crops // lime green
  'A7B297', // Burnt Area // grey
  '000000', // Urban/Settlements // black
  'A8A800', // Grassland // olive green
  '14870E', // Indigenous Forest // forest green
  'FD0618', // Pine // red
  'F442D1', // Wattle // bright pink
  'FF7F00', // Gum // orange
  '6A0DAD', // Bugweed // purple
    ];
// ---------------------------------------------------------------------------------- //
//2019
var S2019_10000 = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate("2019-09-15", "2019-09-17")
    .filterBounds(roi)
    .sort("CLOUD_COVERAGE_ASSESSMENT")
//    .first())
    print(S2019_10000, "Sentscene2019");
var S2019_10000 = S2019_10000.mosaic();
var S2019_10000 = S2019_10000.clip(roi)
//Map.addLayer(S2018_10000, {bands: ['B4', 'B3', 'B2'], max: 3000}, 'Sentscene2018');
var S2019 = S2019_10000.divide(10000)
//2020
var S2020_10000 = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate("2020-09-15", "2020-09-17")
    .filterBounds(roi)
    .sort("CLOUD_COVERAGE_ASSESSMENT")
//    .first())
    print(S2020_10000, "Sentscene2020");
var S2020_10000 = S2020_10000.mosaic();
var S2020_10000 = S2020_10000.clip(roi)
//Map.addLayer(S2018_10000, {bands: ['B4', 'B3', 'B2'], max: 3000}, 'Sentscene2018');
var S2020 = S2020_10000.divide(10000)
///////////////////////////////////////////////////////////
/////               Generating Indices               /////
//////////////////////////////////////////////////////////
// 1 NDVI 
    var NDVI = S2019.expression(
        "(NIR - RED) / (NIR + RED)",
        {
          RED: S2019.select("B4"),    //  RED
          NIR: S2019.select("B8"),    // NIR
        });
// 2 Chlogreen (Chlorophyll Green Index)
    var Chlogreen = S2019.expression(
        "(NIRnarrow) / (GREEN + REDedge1)",
        {
          NIRnarrow: S2019.select("B8A"),    
          GREEN: S2019.select("B3"),    
          REDedge1: S2019.select("B5")    
        });
// 3 LAnthoC (Leaf Anthocynanid Content)
    var LAnthoC = S2019.expression(
        "(REDedge3) / (GREEN + REDedge1)",
        {
          REDedge3: S2019.select("B7"),    
          GREEN: S2019.select("B3"),    
          REDedge1: S2019.select("B5")    
        });
// 4 LCaroC
var LCaroC = S2019.expression(
        "(Rededge3) / (Blue - Rededge1)",
        { Rededge3: S2019.select("B7"),    // Rededge3
          Blue: S2019.select("B2"),    // Blue
          Rededge1: S2019.select("B5"),    // Rededge1
          });
// 5 LChloC
var LChloC = S2019.expression(
        "(Rededge3) / (Rededge1)",
        { Rededge3: S2019.select("B7"),    // Rededge3
          Rededge1: S2019.select("B5"),    // Rededge1
          });
// 6 BAI
var BAI = S2019.expression(
        "(Blue - NIR)/(Blue + NIR)",
        { Blue: S2019.select("B2"),   
          NIR: S2019.select("B8"),    
          });
// 7 GI
var GI = S2019.expression(
        "Green/Red",
        { Green: S2019.select("B3"),   
          Red: S2019.select("B4"),
          });
// 8 gNDVI
var gNDVI = S2019.expression(
        "(NIR - Green)/(NIR + Green)",
        { NIR: S2019.select("B8"),   
          Green: S2019.select("B3"),
          });
// 9 MSI
var MSI = S2019.expression(
        "SWIR1/NIR",
        { SWIR1: S2019.select("B11"),   
          NIR: S2019.select("B8"),
          });
// 10 NDrededgeSWIR
var NDrededgeSWIR = S2019.expression(
        "(Rededge2 - SWIR2) / (Rededge2 + SWIR2)",
        { Rededge2: S2019.select("B6"),   
          SWIR2: S2019.select("B12"),
          });
// 11 NDTI (also referred to as NBR2)
var NDTI = S2019.expression(
        "(SWIR1 - SWIR2) / (SWIR1 + SWIR2)",
        { SWIR1: S2019.select("B11"),   
          SWIR2: S2019.select("B12"),
          });
// 12 NDVIre
var NDVIre = S2019.expression(
        "(NIR - Rededge1) / (NIR + Rededge1)",
        { NIR: S2019.select("B8"),   
          Rededge1: S2019.select("B5"),
          });  
// 13 NDVI1
var NDVI1 = S2019.expression(
        "(NIR - SWIR1) / (NIR + SWIR1)",
        { NIR: S2019.select("B8"),   
          SWIR1: S2019.select("B11"),
          });           
// 14 NDVI2
var NDVI2 = S2019.expression(
        "(Green - NIR) / (Green + NIR)",
        { NIR: S2019.select("B8"),   
          Green: S2019.select("B3"),
          }); 
// 15 NHI
var NHI = S2019.expression(
        "(SWIR1 - Green) / (SWIR1 + Green)",
        { SWIR1: S2019.select("B11"),   
          Green: S2019.select("B3"),
          }); 
// 16 EVI
var EVI = S2019.expression(
        "2.5 * ((NIR - Red) / (NIR + 6*Red-7.5*Blue)+1)",
        { NIR: S2019.select("B8"),   
          Red: S2019.select("B4"),
          Blue: S2019.select("B2"),
          });  
// 17 EVI2
var EVI2 = S2019.expression(
        "2.4 * ((NIR - Red) / (NIR + Red +1))",
        { NIR: S2019.select("B8"),   
          Red: S2019.select("B4"),
          }); 
// 18 EVI2_2          
var EVI2_2 = S2019.expression(
        "2.5 * ((NIR - Red) / (NIR + 2.4 * Red +1))",
        { NIR: S2019.select("B8"),   
          Red: S2019.select("B4"),
          }); 
// 19 MSAVI
var MSAVI = S2019.expression(
        "(2 * NIR + 1 - sqrt(pow((2 * NIR + 1), 2) - 8 * (NIR - Red)) ) / 2",
        { NIR: S2019.select("B8"),   
          Red: S2019.select("B4"),
          });   
// 20 Norm-G (Normalised Green)
 var NormG = S2019.expression(
        "(GREEN) / (NIRwide + RED + GREEN)",
        {
          GREEN: S2019.select("B3"),    
          NIRwide: S2019.select("B8"),    
          RED: S2019.select("B4")    
        });
// 21 Norm-NIR (Normalised NIR)
 var NormNIR = S2019.expression(
       "(NIRwide) / (NIRwide + RED + GREEN)",
        {
          GREEN: S2019.select("B3"),    
          NIRwide: S2019.select("B8"),    
          RED: S2019.select("B4")    
        });
// 22 Norm-R (Normalised Red)
 var NormR = S2019.expression(
       "(RED) / (NIRwide + RED + GREEN)",
        {
          GREEN: S2019.select("B3"),    
          NIRwide: S2019.select("B8"),    
          RED: S2019.select("B4")    
        });
// 23 RededgePeakArea (Red-edge peak area)
 var RededgePeakArea = S2019.expression(
        "(RED + Rededge1 + Rededge2 + Rededge3 + NIRnarrow)",
        {
          Rededge1: S2019.select("B5"), 
          Rededge2: S2019.select("B6"), 
          Rededge3: S2019.select("B7"), 
          NIRnarrow: S2019.select("B8A"),    
          RED: S2019.select("B4")    
        });
// 24 RedSWIR1 (Bands difference)
 var RedSWIR1 = S2019.expression(
        "(RED - SWIR)",
        {
          RED: S2019.select("B4"),    
          SWIR: S2019.select("B11")    
        });
// 25 RTVIcore (Red-edge Triangular Vegetation Index)
 var RTVIcore = S2019.expression(
        "(100 * (NIRnarrow - Rededge1) - 10 * (NIRnarrow - Green))",
        {
          NIRnarrow: S2019.select("B8A"),    
          Rededge1: S2019.select("B5"),    
          Green: S2019.select("B3")    
        });
// 26 SAVI (Soil Adjusted Vegetation Index)
 var SAVI = S2019.expression(
        "((NIRnarrow - RED) / (NIRnarrow + RED + 0.5) * 1.5)",
        {
          NIRnarrow: S2019.select("B8A"),    
          RED: S2019.select("B4")    
          });
// 27 SR-BlueRededge1 (Simple Blue and Red-edge 1 Ratio)
 var SRBlueRededge1 = S2019.expression(
        "(BLUE / REDedge1)",
        {
          BLUE: S2019.select("B2"),    
          REDedge1: S2019.select("B5")    
        });
// 28 SR-BlueRededge2 (Simple Blue and Red-edge 2 Ratio)
 var SRBlueRededge2 = S2019.expression(
        "(BLUE / REDedge2)",
        {
          BLUE: S2019.select("B2"),    
          REDedge2: S2019.select("B6")    
        });
// 29 SR-BlueRededge3 (Simple Blue and Red-edge 3 Ratio)
 var SRBlueRededge3 = S2019.expression(
        "(BLUE / REDedge3)",
        {
          BLUE: S2019.select("B2"),    
          REDedge3: S2019.select("B7")    
        });
// 30 SR-NIRnarrowBlue (Simple ratio NIR narrow and Blue)
 var SRNIRnarrowBlue = S2019.expression(
        "(NIRnarrow / BLUE)",
        {
          NIRnarrow: S2019.select("B8A"),    
          BLUE: S2019.select("B2")    
        });
// 31 SR-NIRnarrowGreen (Simple ratio NIR narrow and Green)
 var SRNIRnarrowGreen = S2019.expression(
        "(NIRnarrow / GREEN)",
        {
          NIRnarrow: S2019.select("B8A"),    
          GREEN: S2019.select("B3")    
        });
// 32 SR-NIRnarrowRed (Simple ratio NIR narrow and Red)
 var SRNIRnarrowRed = S2019.expression(
        "(NIRnarrow / RED)",
        {
          NIRnarrow: S2019.select("B8A"),    
          RED: S2019.select("B4")    
        });
// 33 SR-NIRnarrowRededge1 (Simple NIR and Red-edge 1 Ratio)
 var SRNIRnarrowRededge1 = S2019.expression(
        "(NIRnarrow / REDedge1)",
        {
          NIRnarrow: S2019.select("B8A"),    
          REDedge1: S2019.select("B5")    
        });
// 34 SR-NIRnarrowRededge2 (Simple NIR and Red-edge 2 Ratio)
 var SRNIRnarrowRededge2 = S2019.expression(
        "(NIRnarrow / REDedge2)",
        {
          NIRnarrow: S2019.select("B8A"),    
          REDedge2: S2019.select("B6")    
        });
// 35 SR-NIRnarrowRededge3 (Simple NIR and Red-edge 3 Ratio)
 var SRNIRnarrowRededge3 = S2019.expression(
        "(NIRnarrow / REDedge3)",
        {
          NIRnarrow: S2019.select("B8A"),    
          REDedge3: S2019.select("B7")    
        });
// 36 STI (Soil Tillage Index)
 var STI = S2019.expression(
        "(SWIR1 / SWIR2)",
        {
          SWIR1: S2019.select("B11"),    
          SWIR2: S2019.select("B12")
        });
// 37 WBI (Water Body Index)
 var WBI = S2019.expression(
        "(BLUE - RED) / (BLUE + RED)",
        {
          BLUE: S2019.select("B2"),    
          RED: S2019.select("B4")
        });
// 38 NDMI (Normalized Difference Moisture Index)
 var NDMI = S2019.expression(
        "(NIR-SWIR)/(NIR+SWIR)",
        {
          NIR: S2019.select("B8"),    
          SWIR: S2019.select("B11"),    
          });
// 39 NDBR (Normalized Difference Burning Ratio) (also referred to as NBR)
 var NDBR = S2019.expression(
        "(NIR-MIR)/(NIR+MIR)",
        {
          NIR: S2019.select("B8"),    
          MIR: S2019.select("B12"),    
          });
// // adding all the indices into the S2019 as new bands
var S2019 = S2019.addBands(NDVI); 
var S2019 = S2019.addBands(Chlogreen);
var S2019 = S2019.addBands(LAnthoC);
var S2019 = S2019.addBands(LCaroC);
var S2019 = S2019.addBands(LChloC);
var S2019 = S2019.addBands(BAI);
var S2019 = S2019.addBands(GI);
var S2019 = S2019.addBands(gNDVI);
var S2019 = S2019.addBands(MSI);
var S2019 = S2019.addBands(NDrededgeSWIR);
var S2019 = S2019.addBands(NDTI);
var S2019 = S2019.addBands(NDVIre);
var S2019 = S2019.addBands(NDVI1);
var S2019 = S2019.addBands(NDVI2);
var S2019 = S2019.addBands(NHI);
var S2019 = S2019.addBands(EVI);
var S2019 = S2019.addBands(EVI2);
var S2019 = S2019.addBands(EVI2_2);
var S2019 = S2019.addBands(MSAVI);
var S2019 = S2019.addBands(NormG);
var S2019 = S2019.addBands(NormNIR);
var S2019 = S2019.addBands(NormR);
var S2019 = S2019.addBands(RededgePeakArea);
var S2019 = S2019.addBands(RedSWIR1);
var S2019 = S2019.addBands(RTVIcore);
var S2019 = S2019.addBands(SAVI);
var S2019 = S2019.addBands(SRBlueRededge1);
var S2019 = S2019.addBands(SRBlueRededge2);
var S2019 = S2019.addBands(SRBlueRededge3);
var S2019 = S2019.addBands(SRNIRnarrowBlue);
var S2019 = S2019.addBands(SRNIRnarrowGreen);
var S2019 = S2019.addBands(SRNIRnarrowRed);
var S2019 = S2019.addBands(SRNIRnarrowRededge1);
var S2019 = S2019.addBands(SRNIRnarrowRededge2);
var S2019 = S2019.addBands(SRNIRnarrowRededge3);
var S2019 = S2019.addBands(STI);
var S2019 = S2019.addBands(WBI);
var S2019 = S2019.addBands(NDMI);
var S2019 = S2019.addBands(NDBR);
print (S2019, "allindices added");
// Training data
var bands = ['B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B11', 'B12', 'B8_1', 'B8A_1', 'B7_1', 'B7_2', 'B7_3', "B2_1", "B3_1", "B8_2", "B11_1", 
                "B6_1", "B11_2", "B8_3", "B8_4", "B3_2", "B11_3", "constant", "constant_1", "constant_2", "constant_3",
                "B3_3", "B8_5", "B4_1", "B4_2", "B4_3", "constant_4", "B8A_2", "B2_2", "B2_3", "B2_4", 
                "B8A_3", "B8A_4", "B8A_5", "B8A_6", "B8A_7", "B8A_8", "B11_4", "B2_5", "B8_6", "B8_7"];
print (bands, "allbands&indices")
var training_data = S2019.select(bands).sampleRegions({ // Generate training data
  collection: TrainingData, 
  properties: ['Id', 'LULC'], 
  geometries: true,
  scale: 10
});
var classifier = ee.Classifier.libsvm().train({ // Train the classifier with training data
  features: training_data, 
  classProperty: 'Id', 
  inputProperties: bands
});
var classified2019 = S2019.select(bands).classify(classifier); // Run the classification 
Map.addLayer(classified2019, {min: 1, max: 13, palette: uMngenipalette}, '2019'); //Display classification 
// ---------------------------------------------------------------------------------- //
//Configure the imagery
var images = {
  '2019': classified2019.visualize({min: 1, max: 13, palette: uMngenipalette}),
  'Sentinel Image 2019': S2019_10000.visualize({bands: ['B4', 'B3', 'B2'], max: 3000}),
  'Sentinel Image 2020': S2020_10000.visualize({bands: ['B4', 'B3', 'B2'], max: 3000}),
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
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(30.4, -29.5, 10);
// ADD A KEY
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var main = ui.Panel({style: {width: '310px', padding: '8px'}});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var title = ui.Label('SEBEI uMngeni Alien Tool', {fontWeight: 'bold', fontSize: '20px', color: 'green'});
var descr = ui.Label("Invasive alien trees/shrubs in the uMngeni Catchment. Mapped from Sentinel2 imagery in four broad categories: pine, gum, wattle and Bugweed, at a 20 m resolution. Developed by Dr Alanna Rebelo as part of the SEBEI Project", {color: 'black'});
var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'150px',height:'98.9px'}}); 
var key = ui.Thumbnail({image:key,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'187px',height:'300px'}});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
main.add(title);
main.add(descr);
main.add(branding);
main.add(key);
ui.root.insert(0, main);
//////////////////////////////////////////////////////////////////////// END ////////////////////////////////////////////////////////////////////////