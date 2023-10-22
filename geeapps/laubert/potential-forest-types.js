//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// This script creates the final maps 
//
// This script has to be run for each PFT. Enter the PFT on the 
// "bang bang" line ("!!").
//
// The datasets can be found at the following locations: 
// The training points: "users/laubert/ForestComposition/190527_TreeCover_[PFT]_cleaned_reducedAbs"
// The results from the grid search procedure: 05-Script-BestParameters.Rmd
// The different climate scenarios: in the folder "users/laubert/ForestComposition/FutureClimateScenarios/"
// 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// !! Enter the current date
var Today = '190702';
//------------------------------------------------------------------------------
//--- SETUP --------------------------------------------------------------------
//------------------------------------------------------------------------------
// Define the asset location for exports
var assetLocationForExport = 'users/laubert/ForestComposition/';
// Define the inputs' asset locations
var pathToFinalPredictedMaps = "users/laubert/ForestComposition/ModelResults/190613_TreeCover_modelled_";
var pathToFinalCVMaps = "users/laubert/ForestComposition/ModelResults/190613_TreeCoverCVImageCollection_";
var pathToTrainingData = "users/laubert/ForestComposition/CleanedData/190527_TreeCover_";
var pathToFutureClimate = "users/laubert/ForestComposition/ModelResults/190613_TreeCover_futureClimate_";
// Define the color palettes
var brown = ['FFFFFF', '#8B4513'],     // BDT
    green = ['FFFFFF', '08a35b'],      // BET
    red = ['FFFFFF', '#990000'],       // NDT 
    blue = ['FFFFFF', '#000080'],      // NET
    purple = ['FFFFFF', '#9933ff'],    // NMixed
    neongreen = ['FFFFFF', '#00ffaa'], // BMixed
    cyan = ['FFFFFF', '008B8B'],       // Mixed
    black = ['FFFFFF', '000000'],      // JFs Map
    ndwiViz = ['330044', '220066', '1133cc', '33dd00', 'ffda21', 'ff6622', 'd10000']; // for the standard deviation
// Input the training data and the final maps
var TrainingDataBDT = ee.FeatureCollection(pathToTrainingData + "BDT" + "_cleaned_reducedAbs"),
    TrainingDataBET = ee.FeatureCollection(pathToTrainingData + "BET" + "_cleaned_reducedAbs"),
    TrainingDataNDT = ee.FeatureCollection(pathToTrainingData + "NDT" + "_cleaned_reducedAbs"),
    TrainingDataNET = ee.FeatureCollection(pathToTrainingData + "NET" + "_cleaned_reducedAbs");
var FinalPredictedMapBDT = ee.Image(pathToFinalPredictedMaps + "BDT"),
    FinalPredictedMapBET = ee.Image(pathToFinalPredictedMaps + "BET"),
    FinalPredictedMapNDT = ee.Image(pathToFinalPredictedMaps + "NDT"),
    FinalPredictedMapNET = ee.Image(pathToFinalPredictedMaps + "NET");
var FinalCVMapBDT = ee.ImageCollection(pathToFinalCVMaps + "BDT"),
    FinalCVMapBET = ee.ImageCollection(pathToFinalCVMaps + "BET"),
    FinalCVMapNDT = ee.ImageCollection(pathToFinalCVMaps + "NDT"),
    FinalCVMapNET = ee.ImageCollection(pathToFinalCVMaps + "NET");
var FutureClimateBDT = ee.Image(pathToFutureClimate + "BDT"),
    FutureClimateBET = ee.Image(pathToFutureClimate + "BET"),
    FutureClimateNDT = ee.Image(pathToFutureClimate + "NDT"),
    FutureClimateNET = ee.Image(pathToFutureClimate + "NET");
// Input the "Tree Carrying Capacity" map and the potential restoration areas
// from Bastin et al. (2019)
var PotentialTreeCover = ee.Image("users/crowtherlab/forest_potential"); 
var RestorationAreas = ee.Image("users/crowtherlab/restoration_potential_masked"); 
// Function that transforms a multiband image into an image collection
var BandsToCollection = function(image){
  var collection = ee.ImageCollection.fromImages(image.bandNames().map(function(bandName){
    return image.select(ee.String(bandName)).float().set('system:id', bandName).select([bandName], ['Band']);
  }));
  return collection;
};
//------------------------------------------------------------------------------
//--- COMPUTE THE PROPORTIONS OF TREE COVER OF THE PFTS ------------------------
//------------------------------------------------------------------------------
// Sum of all predicted images
var SUM = FinalPredictedMapBDT
  .add(FinalPredictedMapBET)
  .add(FinalPredictedMapNDT)
  .add(FinalPredictedMapNET);
// Combine all predicted images in one image 
var PFTs = FinalPredictedMapBDT
  .addBands(FinalPredictedMapBET)
  .addBands(FinalPredictedMapNDT)
  .addBands(FinalPredictedMapNET)
  .select(
    ['classification', 'classification_1', 'classification_2', 'classification_3'], // old names
    ['BDT', 'BET', 'NDT', 'NET']);                                                  // new names;
// Compute the maximum value of all PFTs at each pixel 
var maxValue = PFTs.reduce(ee.Reducer.max());
// Compute the proportions of each PFT
var PFTs_proportions = PFTs.divide(SUM);
//------------------------------------------------------------------------------
//--- COMPUTE STANDARD DEVIATION OF THE CROSS VALIDATION -----------------------
//------------------------------------------------------------------------------
// Determine the standard deviation of the k-fold cross validation (k=10)
var BDT_vari = FinalCVMapBDT.reduce(ee.Reducer.stdDev());
var BET_vari = FinalCVMapBET.reduce(ee.Reducer.stdDev());
var NDT_vari = FinalCVMapNDT.reduce(ee.Reducer.stdDev());
var NET_vari = FinalCVMapNET.reduce(ee.Reducer.stdDev());
//------------------------------------------------------------------------------
//--- SCALE PROPORTIONS BY "THE TREE CARRYING CAPACITY" (BASTIN ET AL. 2019) ---
//------------------------------------------------------------------------------
// Multiply the proportions with the potential tree cover determined by Bastin et al. (2019)
var PotentialTreeCover_BDT = PotentialTreeCover.multiply(PFTs_proportions.select(0));
var PotentialTreeCover_BET = PotentialTreeCover.multiply(PFTs_proportions.select(1));
var PotentialTreeCover_NDT = PotentialTreeCover.multiply(PFTs_proportions.select(2));
var PotentialTreeCover_NET = PotentialTreeCover.multiply(PFTs_proportions.select(3));
//------------------------------------------------------------------------------
//--- DETERMINE THE DOMINANT PFT -----------------------------------------------
//------------------------------------------------------------------------------
// Subtract the max value of each pixel from the images. The PFT that is dominant 
// will have the value zero, all others are negative. 
var BDT_maxValue = FinalPredictedMapBDT.subtract(maxValue);
var BET_maxValue = FinalPredictedMapBET.subtract(maxValue);
var NDT_maxValue = FinalPredictedMapNDT.subtract(maxValue);
var NET_maxValue = FinalPredictedMapNET.subtract(maxValue);
// Determine the dominant PFT
var BDT_maxValue = BDT_maxValue.eq(0).updateMask(BDT_maxValue.gte(0));
var BET_maxValue = BET_maxValue.eq(0).updateMask(BET_maxValue.gte(0));
var NDT_maxValue = NDT_maxValue.eq(0).updateMask(NDT_maxValue.gte(0));
var NET_maxValue = NET_maxValue.eq(0).updateMask(NET_maxValue.gte(0));
//------------------------------------------------------------------------------
//--- DETERMINE THE FOREST TYPES -----------------------------------------------
//------------------------------------------------------------------------------
// Define forest types as mixtures of PFTs.  
// Mixed forests are defined as forest of at least two PFTs, whose proportions 
// are at least 20%. Similarily, a forest type containing only a single PFT 
// is assigned if its proportion is above 80%. 
// This follows the approach of Pongratz et al. (2008): A reconstruction of global agricultural areas and land cover of the last millenium. Glob.Biogeochem.Cycles.
// Threshold for when a PFT as constituting a forest type
var threshold = 0.2;
// --- Four dominant PFTs --- // 
var BDT_BET_NDT_NET_Mixed = PFTs_proportions.select(0).gte(threshold)
.multiply(PFTs_proportions.select(1).gte(threshold))
.multiply(PFTs_proportions.select(2).gte(threshold))
.multiply(PFTs_proportions.select(3).gte(threshold));
// --- Three dominant PFTs --- //
var BDT_BET_NDT_Mixed = PFTs_proportions.select(0).gte(threshold)
.multiply(PFTs_proportions.select(1).gte(threshold))
.multiply(PFTs_proportions.select(2).gte(threshold))
.multiply(PFTs_proportions.select(3).lt(threshold));
var BDT_BET_NET_Mixed = PFTs_proportions.select(0).gt(threshold)
.multiply(PFTs_proportions.select(1).gt(threshold))
.multiply(PFTs_proportions.select(3).gt(threshold))
.multiply(PFTs_proportions.select(2).lt(threshold));
var BDT_NDT_NET_Mixed = PFTs_proportions.select(0).gt(threshold)
.multiply(PFTs_proportions.select(2).gt(threshold))
.multiply(PFTs_proportions.select(3).gt(threshold))
.multiply(PFTs_proportions.select(1).lt(threshold));
var BET_NDT_NET_Mixed = PFTs_proportions.select(1).gt(threshold)
.multiply(PFTs_proportions.select(2).gt(threshold))
.multiply(PFTs_proportions.select(3).gt(threshold))
.multiply(PFTs_proportions.select(0).lt(threshold));
// --- Two dominant PFTs --- //
var BMixed = PFTs_proportions.select(0).gte(threshold)
.multiply(PFTs_proportions.select(1).gte(threshold))
.multiply(PFTs_proportions.select(2).lt(threshold))
.multiply(PFTs_proportions.select(3).lt(threshold));
var BDT_NDT_Mixed = PFTs_proportions.select(0).gte(threshold)
.multiply(PFTs_proportions.select(2).gte(threshold))
.multiply(PFTs_proportions.select(1).lt(threshold))
.multiply(PFTs_proportions.select(3).lt(threshold));
var BDT_NET_Mixed = PFTs_proportions.select(0).gte(threshold)
.multiply(PFTs_proportions.select(3).gte(threshold))
.multiply(PFTs_proportions.select(1).lt(threshold))
.multiply(PFTs_proportions.select(2).lt(threshold));
var BET_NDT_Mixed = PFTs_proportions.select(1).gte(threshold)
.multiply(PFTs_proportions.select(2).gte(threshold))
.multiply(PFTs_proportions.select(0).lt(threshold))
.multiply(PFTs_proportions.select(3).lt(threshold));
var BET_NET_Mixed = PFTs_proportions.select(1).gte(threshold)
.multiply(PFTs_proportions.select(3).gte(threshold))
.multiply(PFTs_proportions.select(0).lt(threshold))
.multiply(PFTs_proportions.select(2).lt(threshold));
var NMixed = PFTs_proportions.select(2).gte(threshold)
.multiply(PFTs_proportions.select(3).gte(threshold))
.multiply(PFTs_proportions.select(0).lt(threshold))
.multiply(PFTs_proportions.select(1).lt(threshold));
// --- One dominant PFT --- //
var BDT_pure = PFTs_proportions.select(0).gte(threshold)
.multiply(PFTs_proportions.select(1).lt(threshold))
.multiply(PFTs_proportions.select(2).lt(threshold))
.multiply(PFTs_proportions.select(3).lt(threshold));
var BET_pure = PFTs_proportions.select(1).gte(threshold)
.multiply(PFTs_proportions.select(0).lt(threshold))
.multiply(PFTs_proportions.select(2).lt(threshold))
.multiply(PFTs_proportions.select(3).lt(threshold));
var NDT_pure = PFTs_proportions.select(2).gte(threshold)
.multiply(PFTs_proportions.select(0).lt(threshold))
.multiply(PFTs_proportions.select(1).lt(threshold))
.multiply(PFTs_proportions.select(3).lt(threshold));
var NET_pure = PFTs_proportions.select(3).gte(threshold)
.multiply(PFTs_proportions.select(0).lt(threshold))
.multiply(PFTs_proportions.select(1).lt(threshold))
.multiply(PFTs_proportions.select(2).lt(threshold));
// Combine the forest types in an ImageCollection for beter visualization
var ForestTypes = ee.ImageCollection([
  BDT_pure.multiply(PotentialTreeCover).divide(100).updateMask(BDT_pure).visualize({min: 0, max: 1, palette: brown}),
  BET_pure.multiply(PotentialTreeCover).divide(100).updateMask(BET_pure).visualize({min: 0, max: 1, palette: green}),
  NDT_pure.multiply(PotentialTreeCover).divide(100).updateMask(NDT_pure).visualize({min: 0, max: 1, palette: red}),
  NET_pure.multiply(PotentialTreeCover).divide(100).updateMask(NET_pure).visualize({min: 0, max: 1, palette: blue}),
  BMixed.multiply(PotentialTreeCover).divide(100).updateMask(BMixed).visualize({min: 0, max: 1, palette: neongreen}),
  BDT_NDT_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(BDT_NDT_Mixed).visualize({min: 0, max: 1, palette: black}),
  BDT_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(BDT_NET_Mixed).visualize({min: 0, max: 1, palette: ['FFFFFF','#5F9EA0']}),
  BET_NDT_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(BET_NDT_Mixed).visualize({min: 0, max: 1, palette: black}),
  BET_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(BET_NET_Mixed).visualize({min: 0, max: 1, palette: black}),
  NMixed.multiply(PotentialTreeCover).divide(100).updateMask(NMixed).visualize({min: 0, max: 1, palette: purple}),
  BDT_BET_NDT_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(BDT_BET_NDT_Mixed).visualize({min: 0, max: 1, palette: black}),
  BDT_BET_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(BDT_BET_NET_Mixed).visualize({min: 0, max: 1, palette: black}),
  BDT_NDT_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(BDT_NDT_NET_Mixed).visualize({min: 0, max: 1, palette: ['FFFFFF','#800000']}),
  BET_NDT_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(BET_NDT_NET_Mixed).visualize({min: 0, max: 1, palette: black}),
  BDT_BET_NDT_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(BDT_BET_NDT_NET_Mixed).visualize({min: 0, max: 1, palette: black})
]).mosaic();
// Forest types of only one single PFT 
var ForestTypesOnePFT = ee.ImageCollection([
  BDT_pure.multiply(PotentialTreeCover).divide(100).updateMask(BDT_pure).visualize({min: 0, max: 1, palette: brown}),
  BET_pure.multiply(PotentialTreeCover).divide(100).updateMask(BET_pure).visualize({min: 0, max: 1, palette: green}),
  NDT_pure.multiply(PotentialTreeCover).divide(100).updateMask(NDT_pure).visualize({min: 0, max: 1, palette: red}),
  NET_pure.multiply(PotentialTreeCover).divide(100).updateMask(NET_pure).visualize({min: 0, max: 1, palette: blue}),
  BMixed.multiply(PotentialTreeCover).divide(100).updateMask(BMixed).visualize({min: 0, max: 1, palette: black}),
  BDT_NDT_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(BDT_NDT_Mixed).visualize({min: 0, max: 1, palette: black}),
  BDT_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(BDT_NET_Mixed).visualize({min: 0, max: 1, palette: black}),
  BET_NDT_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(BET_NDT_Mixed).visualize({min: 0, max: 1, palette: black}),
  BET_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(BET_NET_Mixed).visualize({min: 0, max: 1, palette: black}),
  NMixed.multiply(PotentialTreeCover).divide(100).updateMask(NMixed).visualize({min: 0, max: 1, palette: black}),
  BDT_BET_NDT_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(BDT_BET_NDT_Mixed).visualize({min: 0, max: 1, palette: black}),
  BDT_BET_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(BDT_BET_NET_Mixed).visualize({min: 0, max: 1, palette: black}),
  BDT_NDT_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(BDT_NDT_NET_Mixed).visualize({min: 0, max: 1, palette: black}),
  BET_NDT_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(BET_NDT_NET_Mixed).visualize({min: 0, max: 1, palette: black}),
  BDT_BET_NDT_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(BDT_BET_NDT_NET_Mixed).visualize({min: 0, max: 1, palette: black})
]).mosaic();
// In restoration areas 
var ForestTypesRestorationAreas = ee.ImageCollection([
  BDT_pure.multiply(RestorationAreas).divide(100).updateMask(BDT_pure).visualize({min: 0, max: 1, palette: brown}),
  BET_pure.multiply(RestorationAreas).divide(100).updateMask(BET_pure).visualize({min: 0, max: 1, palette: green}),
  NDT_pure.multiply(RestorationAreas).divide(100).updateMask(NDT_pure).visualize({min: 0, max: 1, palette: red}),
  NET_pure.multiply(RestorationAreas).divide(100).updateMask(NET_pure).visualize({min: 0, max: 1, palette: blue}),
  BMixed.multiply(RestorationAreas).divide(100).updateMask(BMixed).visualize({min: 0, max: 1, palette: neongreen}),
  BDT_NDT_Mixed.multiply(RestorationAreas).divide(100).updateMask(BDT_NDT_Mixed).visualize({min: 0, max: 1, palette: black}),
  BDT_NET_Mixed.multiply(RestorationAreas).divide(100).updateMask(BDT_NET_Mixed).visualize({min: 0, max: 1, palette: ['FFFFFF','#5F9EA0']}),
  BET_NDT_Mixed.multiply(RestorationAreas).divide(100).updateMask(BET_NDT_Mixed).visualize({min: 0, max: 1, palette: black}),
  BET_NET_Mixed.multiply(RestorationAreas).divide(100).updateMask(BET_NET_Mixed).visualize({min: 0, max: 1, palette: black}),
  NMixed.multiply(RestorationAreas).divide(100).updateMask(NMixed).visualize({min: 0, max: 1, palette: purple}),
  BDT_BET_NDT_Mixed.multiply(RestorationAreas).divide(100).updateMask(BDT_BET_NDT_Mixed).visualize({min: 0, max: 1, palette: black}),
  BDT_BET_NET_Mixed.multiply(RestorationAreas).divide(100).updateMask(BDT_BET_NET_Mixed).visualize({min: 0, max: 1, palette: black}),
  BDT_NDT_NET_Mixed.multiply(RestorationAreas).divide(100).updateMask(BDT_NDT_NET_Mixed).visualize({min: 0, max: 1, palette: ['FFFFFF','#800000']}),
  BET_NDT_NET_Mixed.multiply(RestorationAreas).divide(100).updateMask(BET_NDT_NET_Mixed).visualize({min: 0, max: 1, palette: black}),
  BDT_BET_NDT_NET_Mixed.multiply(RestorationAreas).divide(100).updateMask(BDT_BET_NDT_NET_Mixed).visualize({min: 0, max: 1, palette: black})
]).mosaic();
//------------------------------------------------------------------------------
//--- FUTURE CLIMATE SCENARIOS -------------------------------------------------
//------------------------------------------------------------------------------
// For more convinience transform the multiband image into an image collection 
var FutureClimateBDT_IC = BandsToCollection(FutureClimateBDT);
var FutureClimateBET_IC = BandsToCollection(FutureClimateBET);
var FutureClimateNDT_IC = BandsToCollection(FutureClimateNDT);
var FutureClimateNET_IC = BandsToCollection(FutureClimateNET);
// Get the names of the different bands
var BandsOfInterest = FutureClimateBDT.bandNames();
// Transform the band names into a FeatureCollection to filter on them
var FCOfBandNames = ee.FeatureCollection(BandsOfInterest.map(function(bN){return ee.Feature(ee.Geometry.Point([0,0])).set('BandName',bN)}));
// --- Compute the average between all three Earth System Models --- //
// first determine the list of the images of the three Earth System Models depending on
// climate scenario and the year in question, then compute the average value
/*
// --- RCP 4.5 --- //
// - 2050 
var ListOfImages = FCOfBandNames
  .filterMetadata('BandName','contains','rcp45')
  .filterMetadata('BandName','contains','2050').reduceColumns(ee.Reducer.toList(), ['BandName']).get('list');
var FutureClimate_rcp45_2050_BDT = FutureClimateBDT_IC.filter(ee.Filter.inList('system:id', ListOfImages)).mean();
var FutureClimate_rcp45_2050_BET = FutureClimateBET_IC.filter(ee.Filter.inList('system:id', ListOfImages)).mean();
var FutureClimate_rcp45_2050_NDT = FutureClimateNDT_IC.filter(ee.Filter.inList('system:id', ListOfImages)).mean();
var FutureClimate_rcp45_2050_NET = FutureClimateNET_IC.filter(ee.Filter.inList('system:id', ListOfImages)).mean();
var Proportions_rcp45_2050 = FutureClimate_rcp45_2050_BDT.addBands(FutureClimate_rcp45_2050_BET).addBands(FutureClimate_rcp45_2050_NDT).addBands(FutureClimate_rcp45_2050_NET)
                                  .divide((FutureClimate_rcp45_2050_BDT.add(FutureClimate_rcp45_2050_BET).add(FutureClimate_rcp45_2050_NDT).add(FutureClimate_rcp45_2050_NET)));
// - 2080 
var ListOfImages = FCOfBandNames
  .filterMetadata('BandName','contains','rcp45')
  .filterMetadata('BandName','contains','2080').reduceColumns(ee.Reducer.toList(), ['BandName']).get('list');
var FutureClimate_rcp45_2080_BDT = FutureClimateBDT_IC.filter(ee.Filter.inList('system:id', ListOfImages)).mean();
var FutureClimate_rcp45_2080_BET = FutureClimateBET_IC.filter(ee.Filter.inList('system:id', ListOfImages)).mean();
var FutureClimate_rcp45_2080_NDT = FutureClimateNDT_IC.filter(ee.Filter.inList('system:id', ListOfImages)).mean();
var FutureClimate_rcp45_2080_NET = FutureClimateNET_IC.filter(ee.Filter.inList('system:id', ListOfImages)).mean();
var Proportions_rcp45_2080 = FutureClimate_rcp45_2080_BDT.addBands(FutureClimate_rcp45_2080_BET).addBands(FutureClimate_rcp45_2080_NDT).addBands(FutureClimate_rcp45_2080_NET)
                                  .divide((FutureClimate_rcp45_2080_BDT.add(FutureClimate_rcp45_2080_BET).add(FutureClimate_rcp45_2080_NDT).add(FutureClimate_rcp45_2080_NET)));
// --- RCP 8.5 --- //
// - 2050 
var ListOfImages = FCOfBandNames
  .filterMetadata('BandName','contains','rcp85')
  .filterMetadata('BandName','contains','2050').reduceColumns(ee.Reducer.toList(), ['BandName']).get('list');
var FutureClimate_rcp85_2050_BDT = FutureClimateBDT_IC.filter(ee.Filter.inList('system:id', ListOfImages)).mean();
var FutureClimate_rcp85_2050_BET = FutureClimateBET_IC.filter(ee.Filter.inList('system:id', ListOfImages)).mean();
var FutureClimate_rcp85_2050_NDT = FutureClimateNDT_IC.filter(ee.Filter.inList('system:id', ListOfImages)).mean();
var FutureClimate_rcp85_2050_NET = FutureClimateNET_IC.filter(ee.Filter.inList('system:id', ListOfImages)).mean();
var Proportions_rcp85_2050 = FutureClimate_rcp85_2050_BDT.addBands(FutureClimate_rcp85_2050_BET).addBands(FutureClimate_rcp85_2050_NDT).addBands(FutureClimate_rcp85_2050_NET)
                                  .divide((FutureClimate_rcp85_2050_BDT.add(FutureClimate_rcp85_2050_BET).add(FutureClimate_rcp85_2050_NDT).add(FutureClimate_rcp85_2050_NET)));
// - 2080 
var ListOfImages = FCOfBandNames
  .filterMetadata('BandName','contains','rcp85')
  .filterMetadata('BandName','contains','2080').reduceColumns(ee.Reducer.toList(), ['BandName']).get('list');
var FutureClimate_rcp85_2080_BDT = FutureClimateBDT_IC.filter(ee.Filter.inList('system:id', ListOfImages)).mean();
var FutureClimate_rcp85_2080_BET = FutureClimateBET_IC.filter(ee.Filter.inList('system:id', ListOfImages)).mean();
var FutureClimate_rcp85_2080_NDT = FutureClimateNDT_IC.filter(ee.Filter.inList('system:id', ListOfImages)).mean();
var FutureClimate_rcp85_2080_NET = FutureClimateNET_IC.filter(ee.Filter.inList('system:id', ListOfImages)).mean();
var Proportions_rcp85_2080 = FutureClimate_rcp85_2080_BDT.addBands(FutureClimate_rcp85_2080_BET).addBands(FutureClimate_rcp85_2080_NDT).addBands(FutureClimate_rcp85_2080_NET)
                                  .divide((FutureClimate_rcp85_2080_BDT.add(FutureClimate_rcp85_2080_BET).add(FutureClimate_rcp85_2080_NDT).add(FutureClimate_rcp85_2080_NET)));
*/
var Proportions_rcp85_2050 = ee.Image("users/laubert/App/Proportions_rcp85_2050")
var FutureClimate_rcp85_2050_BDT = ee.Image("users/laubert/App/FutureClimate_rcp85_2050_BDT")
var FutureClimate_rcp85_2050_BET = ee.Image("users/laubert/App/FutureClimate_rcp85_2050_BET")
var FutureClimate_rcp85_2050_NDT = ee.Image("users/laubert/App/FutureClimate_rcp85_2050_NDT")
var FutureClimate_rcp85_2050_NET = ee.Image("users/laubert/App/FutureClimate_rcp85_2050_NET")
//------------------------------------------------------------------------------
//--- DETERMINE THE FUTURE FOREST TYPES UNDER RCP8.5 IN 2050 -------------------
//------------------------------------------------------------------------------
// same as above
// --- Four dominant PFTs --- // 
var FutureClimate_BDT_BET_NDT_NET_Mixed = Proportions_rcp85_2050.select(0).gte(threshold)
.multiply(Proportions_rcp85_2050.select(1).gte(threshold))
.multiply(Proportions_rcp85_2050.select(2).gte(threshold))
.multiply(Proportions_rcp85_2050.select(3).gte(threshold));
// --- Three dominant PFTs --- //
var FutureClimate_BDT_BET_NDT_Mixed = Proportions_rcp85_2050.select(0).gte(threshold)
.multiply(Proportions_rcp85_2050.select(1).gte(threshold))
.multiply(Proportions_rcp85_2050.select(2).gte(threshold))
.multiply(Proportions_rcp85_2050.select(3).lt(threshold));
var FutureClimate_BDT_BET_NET_Mixed = Proportions_rcp85_2050.select(0).gt(threshold)
.multiply(Proportions_rcp85_2050.select(1).gt(threshold))
.multiply(Proportions_rcp85_2050.select(3).gt(threshold))
.multiply(Proportions_rcp85_2050.select(2).lt(threshold));
var FutureClimate_BDT_NDT_NET_Mixed = Proportions_rcp85_2050.select(0).gt(threshold)
.multiply(Proportions_rcp85_2050.select(2).gt(threshold))
.multiply(Proportions_rcp85_2050.select(3).gt(threshold))
.multiply(Proportions_rcp85_2050.select(1).lt(threshold));
var FutureClimate_BET_NDT_NET_Mixed = Proportions_rcp85_2050.select(1).gt(threshold)
.multiply(Proportions_rcp85_2050.select(2).gt(threshold))
.multiply(Proportions_rcp85_2050.select(3).gt(threshold))
.multiply(Proportions_rcp85_2050.select(0).lt(threshold));
// --- Two dominant PFTs --- //
var FutureClimate_BMixed = Proportions_rcp85_2050.select(0).gte(threshold)
.multiply(Proportions_rcp85_2050.select(1).gte(threshold))
.multiply(Proportions_rcp85_2050.select(2).lt(threshold))
.multiply(Proportions_rcp85_2050.select(3).lt(threshold));
var FutureClimate_BDT_NDT_Mixed = Proportions_rcp85_2050.select(0).gte(threshold)
.multiply(Proportions_rcp85_2050.select(2).gte(threshold))
.multiply(Proportions_rcp85_2050.select(1).lt(threshold))
.multiply(Proportions_rcp85_2050.select(3).lt(threshold));
var FutureClimate_BDT_NET_Mixed = Proportions_rcp85_2050.select(0).gte(threshold)
.multiply(Proportions_rcp85_2050.select(3).gte(threshold))
.multiply(Proportions_rcp85_2050.select(1).lt(threshold))
.multiply(Proportions_rcp85_2050.select(2).lt(threshold));
var FutureClimate_BET_NDT_Mixed = Proportions_rcp85_2050.select(1).gte(threshold)
.multiply(Proportions_rcp85_2050.select(2).gte(threshold))
.multiply(Proportions_rcp85_2050.select(0).lt(threshold))
.multiply(Proportions_rcp85_2050.select(3).lt(threshold));
var FutureClimate_BET_NET_Mixed = Proportions_rcp85_2050.select(1).gte(threshold)
.multiply(Proportions_rcp85_2050.select(0).lt(threshold))
.multiply(Proportions_rcp85_2050.select(3).gte(threshold))
.multiply(Proportions_rcp85_2050.select(2).lt(threshold));
var FutureClimate_NMixed = Proportions_rcp85_2050.select(2).gte(threshold)
.multiply(Proportions_rcp85_2050.select(3).gte(threshold))
.multiply(Proportions_rcp85_2050.select(0).lt(threshold))
.multiply(Proportions_rcp85_2050.select(1).lt(threshold));
// --- One dominant PFT --- //
var FutureClimate_BDT_pure = Proportions_rcp85_2050.select(0).gte(threshold)
.multiply(Proportions_rcp85_2050.select(1).lt(threshold))
.multiply(Proportions_rcp85_2050.select(2).lt(threshold))
.multiply(Proportions_rcp85_2050.select(3).lt(threshold));
var FutureClimate_BET_pure = Proportions_rcp85_2050.select(1).gte(threshold)
.multiply(Proportions_rcp85_2050.select(0).lt(threshold))
.multiply(Proportions_rcp85_2050.select(2).lt(threshold))
.multiply(Proportions_rcp85_2050.select(3).lt(threshold));
var FutureClimate_NDT_pure = Proportions_rcp85_2050.select(2).gte(threshold)
.multiply(Proportions_rcp85_2050.select(0).lt(threshold))
.multiply(Proportions_rcp85_2050.select(1).lt(threshold))
.multiply(Proportions_rcp85_2050.select(3).lt(threshold));
var FutureClimate_NET_pure = Proportions_rcp85_2050.select(3).gte(threshold)
.multiply(Proportions_rcp85_2050.select(0).lt(threshold))
.multiply(Proportions_rcp85_2050.select(1).lt(threshold))
.multiply(Proportions_rcp85_2050.select(2).lt(threshold));
// Combine the forest types in an ImageCollection for beter visualization
var FutureClimate_ForestTypes = ee.ImageCollection([
  FutureClimate_BDT_pure.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BDT_pure).visualize({min: 0, max: 1, palette: brown}),
  FutureClimate_BET_pure.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BET_pure).visualize({min: 0, max: 1, palette: green}),
  FutureClimate_NDT_pure.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_NDT_pure).visualize({min: 0, max: 1, palette: red}),
  FutureClimate_NET_pure.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_NET_pure).visualize({min: 0, max: 1, palette: blue}),
  FutureClimate_BMixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BMixed).visualize({min: 0, max: 1, palette: neongreen}),
  FutureClimate_BDT_NDT_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BDT_NDT_Mixed).visualize({min: 0, max: 1, palette: black}),
  FutureClimate_BDT_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BDT_NET_Mixed).visualize({min: 0, max: 1, palette: ['FFFFFF','#5F9EA0']}),
  FutureClimate_BET_NDT_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BET_NDT_Mixed).visualize({min: 0, max: 1, palette: black}),
  FutureClimate_BET_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BET_NET_Mixed).visualize({min: 0, max: 1, palette: black}),
  FutureClimate_NMixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_NMixed).visualize({min: 0, max: 1, palette: purple}),
  FutureClimate_BDT_BET_NDT_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BDT_BET_NDT_Mixed).visualize({min: 0, max: 1, palette: black}),
  FutureClimate_BDT_BET_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BDT_BET_NET_Mixed).visualize({min: 0, max: 1, palette: black}),
  FutureClimate_BDT_NDT_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BDT_NDT_NET_Mixed).visualize({min: 0, max: 1, palette: ['FFFFFF','#800000']}),
  FutureClimate_BET_NDT_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BET_NDT_NET_Mixed).visualize({min: 0, max: 1, palette: black}),
  FutureClimate_BDT_BET_NDT_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BDT_BET_NDT_NET_Mixed).visualize({min: 0, max: 1, palette: black})
]).mosaic();
// Future forest types out of one single PFT
var FutureClimate_ForestTypes_OnePFT = ee.ImageCollection([
  FutureClimate_BDT_pure.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BDT_pure).visualize({min: 0, max: 1, palette: brown}),
  FutureClimate_BET_pure.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BET_pure).visualize({min: 0, max: 1, palette: green}),
  FutureClimate_NDT_pure.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_NDT_pure).visualize({min: 0, max: 1, palette: red}),
  FutureClimate_NET_pure.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_NET_pure).visualize({min: 0, max: 1, palette: blue}),
  FutureClimate_BMixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BMixed).visualize({min: 0, max: 1, palette: black}),
  FutureClimate_BDT_NDT_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BDT_NDT_Mixed).visualize({min: 0, max: 1, palette: black}),
  FutureClimate_BDT_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BDT_NET_Mixed).visualize({min: 0, max: 1, palette: black}),
  FutureClimate_BET_NDT_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BET_NDT_Mixed).visualize({min: 0, max: 1, palette: black}),
  FutureClimate_BET_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BET_NET_Mixed).visualize({min: 0, max: 1, palette: black}),
  FutureClimate_NMixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_NMixed).visualize({min: 0, max: 1, palette: black}),
  FutureClimate_BDT_BET_NDT_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BDT_BET_NDT_Mixed).visualize({min: 0, max: 1, palette: black}),
  FutureClimate_BDT_BET_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BDT_BET_NET_Mixed).visualize({min: 0, max: 1, palette: black}),
  FutureClimate_BDT_NDT_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BDT_NDT_NET_Mixed).visualize({min: 0, max: 1, palette: black}),
  FutureClimate_BET_NDT_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BET_NDT_NET_Mixed).visualize({min: 0, max: 1, palette: black}),
  FutureClimate_BDT_BET_NDT_NET_Mixed.multiply(PotentialTreeCover).divide(100).updateMask(FutureClimate_BDT_BET_NDT_NET_Mixed).visualize({min: 0, max: 1, palette: black})
]).mosaic();
//------------------------------------------------------------------------------
//--- DIFFERENCE IN FOREST TYPES BETWEEN TODAY AND 2050 (RCP8.5) ---------------
//------------------------------------------------------------------------------
// Subtract the values from the RCP8.5 2050 scenario from the values today 
var DiffTodayFutureClimate = BDT_pure.subtract(FutureClimate_BDT_pure).abs()
  .add(BET_pure.subtract(FutureClimate_BET_pure).abs())
  .add(NDT_pure.subtract(FutureClimate_NDT_pure).abs())
  .add(NET_pure.subtract(FutureClimate_NET_pure).abs())
  .add(BMixed.subtract(FutureClimate_BMixed).abs())
  .add(BDT_NDT_Mixed.subtract(FutureClimate_BDT_NDT_Mixed).abs())
  .add(BDT_NET_Mixed.subtract(FutureClimate_BDT_NET_Mixed).abs())
  .add(BET_NDT_Mixed.subtract(FutureClimate_BET_NDT_Mixed).abs())
  .add(BET_NET_Mixed.subtract(FutureClimate_BET_NET_Mixed).abs())
  .add(NMixed.subtract(FutureClimate_NMixed).abs())
  .add(BDT_BET_NDT_Mixed.subtract(FutureClimate_BDT_BET_NDT_Mixed).abs())
  .add(BDT_BET_NET_Mixed.subtract(FutureClimate_BDT_BET_NET_Mixed).abs())
  .add(BDT_NDT_NET_Mixed.subtract(FutureClimate_BDT_NDT_NET_Mixed).abs())
  .add(BET_NDT_NET_Mixed.subtract(FutureClimate_BET_NDT_NET_Mixed).abs())
  .add(BDT_BET_NDT_NET_Mixed.subtract(FutureClimate_BDT_BET_NDT_NET_Mixed).abs())
  .rename('Difference_2019_2050');
// Compute the areas where a change in the forest type will occur
// 0: no change will occur
var ChangeInForestType = DiffTodayFutureClimate.neq(0);
var NoChangeInForestType = ChangeInForestType.neq(1);
// ***** for exporting before Davos only ++++++ //
// Areas where forest types will change 
var Changes_TH_0 = ChangeInForestType.updateMask(ChangeInForestType).updateMask(PotentialTreeCover.gt(0));
var Changes_TH_10 = ChangeInForestType.updateMask(ChangeInForestType).updateMask(PotentialTreeCover.gt(10));
// Determine the restoration areas where the forest type will (not) change
var ChangeInForestType_RestorationAreas = ChangeInForestType.mask(ChangeInForestType).multiply(RestorationAreas.gt(0));
var NoChangeInForestType_RestorationAreas = NoChangeInForestType.mask(NoChangeInForestType).multiply(RestorationAreas.gt(0));
var ChangeInForestType_RestorationAreas = ee.ImageCollection([
  ChangeInForestType_RestorationAreas.visualize({min: 1, max: 1, palette: ['FF0000']}),
  NoChangeInForestType_RestorationAreas.visualize({min: 0, max: 0, palette: ['FFFFFF']}),
  ]).mosaic();
//------------------------------------------------------------------------------
//--- MAPPING ------------------------------------------------------------------
//------------------------------------------------------------------------------
// --- MODEL RESULTS
//Map.addLayer(PotentialTreeCover, {min: 0, max: 100, palette: black}, 'Potential Tree Cover from Bastin et al. (2019)', false);
Map.addLayer(FinalPredictedMapBDT, {min: 0, max: 100, palette: brown}, 'Final predicted map BDT', false);
Map.addLayer(FinalPredictedMapBET, {min: 0, max: 100, palette: green}, 'Final predicted map BET', false);
Map.addLayer(FinalPredictedMapNDT, {min: 0, max: 100, palette: red}, 'Final predicted map NDT', false);
Map.addLayer(FinalPredictedMapNET, {min: 0, max: 100, palette: blue}, 'Final predicted map NET', false);
// --- STANDARD DEVIATION OF THE K-FOLD CROSS VALIDATION 
Map.addLayer(BDT_vari, {min: 0, max: 10, palette: ndwiViz},'Final predicted map BDT (Std. Dev)', false);
Map.addLayer(BET_vari, {min: 0, max: 10, palette: ndwiViz},'Final predicted map BET (Std. Dev)', false);
Map.addLayer(NDT_vari, {min: 0, max: 10, palette: ndwiViz},'Final predicted map NDT (Std. Dev)', false);
Map.addLayer(NET_vari, {min: 0, max: 10, palette: ndwiViz},'Final predicted map NET (Std. Dev)', false);
// --- PROPORTIONS SCALED BY THE POTENTIAL TREE COVER FROM BASTIN ET AL. (2019)
Map.addLayer(PotentialTreeCover_BDT, {min: 0, max: 100, palette: ['FFFFFF', '#8B4513']}, 'Fig. S3a - Potential Tree Cover of BDTs', false);
Map.addLayer(PotentialTreeCover_BET, {min: 0, max: 100, palette: ['FFFFFF', '08a35b']}, 'Fig. S3b - Potential Tree Cover of BETs', false);
Map.addLayer(PotentialTreeCover_NDT, {min: 0, max: 100, palette: ['FFFFFF', '#990000']}, 'Fig. S3c - Potential Tree Cover of NDTs', false);
Map.addLayer(PotentialTreeCover_NET, {min: 0, max: 100, palette: ['FFFFFF', '#009999']}, 'Fig. S3d - Potential Tree Cover of NETs', false);
// --- DOMINANT PFTs
//Map.addLayer(BDT_maxValue, {min: 0, max: 1, palette: brown}, 'Areas where BDTs are dominant', false);
//Map.addLayer(BET_maxValue, {min: 0, max: 1, palette: green}, 'Areas where BETs are dominant', false);
//Map.addLayer(NDT_maxValue, {min: 0, max: 1, palette: red}, 'Areas where NDTs are dominant', false);
//Map.addLayer(NET_maxValue, {min: 0, max: 1, palette: blue}, 'Areas where NETs are dominant', false);
// --- FOREST TYPES
// multiplied with the potential tree cover (in % tree cover)
Map.addLayer(ForestTypes, {}, 'Fig. 2a - Forest types under current climate', false);
Map.addLayer(ForestTypesOnePFT, {}, 'Fig. 2a - Illustration of forest types out of 1 PFT', false);
Map.addLayer(ForestTypesRestorationAreas, {}, 'Fig. 2b - Forest types in restoration areas', false);
/*
// --- FUTURE POTENTIALS
Map.addLayer(FutureClimate_rcp45_2050_BDT, {min:0,max:100,palette:brown}, 'Potential for BDT under RCP4.5 in 2050', false);
Map.addLayer(FutureClimate_rcp45_2050_BET, {min:0,max:100,palette:green}, 'Potential for BET under RCP4.5 in 2050', false);
Map.addLayer(FutureClimate_rcp45_2050_NDT, {min:0,max:100,palette:red}, 'Potential for NDT under RCP4.5 in 2050', false);
Map.addLayer(FutureClimate_rcp45_2050_NET, {min:0,max:100,palette:blue}, 'Potential for NET under RCP4.5 in 2050', false);
Map.addLayer(FutureClimate_rcp45_2080_BDT, {min:0,max:100,palette:brown}, 'Potential for BDT under RCP4.5 in 2080', false);
Map.addLayer(FutureClimate_rcp45_2080_BET, {min:0,max:100,palette:green}, 'Potential for BET under RCP4.5 in 2080', false);
Map.addLayer(FutureClimate_rcp45_2080_NDT, {min:0,max:100,palette:red}, 'Potential for NDT under RCP4.5 in 2080', false);
Map.addLayer(FutureClimate_rcp45_2080_NET, {min:0,max:100,palette:blue}, 'Potential for NET under RCP4.5 in 2080', false);
*/
Map.addLayer(FutureClimate_rcp85_2050_BDT, {min:0,max:100,palette:brown}, 'Potential for BDT under RCP8.5 in 2050', false);
Map.addLayer(FutureClimate_rcp85_2050_BET, {min:0,max:100,palette:green}, 'Potential for BET under RCP8.5 in 2050', false);
Map.addLayer(FutureClimate_rcp85_2050_NDT, {min:0,max:100,palette:red}, 'Potential for NDT under RCP8.5 in 2050', false);
Map.addLayer(FutureClimate_rcp85_2050_NET, {min:0,max:100,palette:blue}, 'Potential for NET under RCP8.5 in 2050', false);
/*
Map.addLayer(FutureClimate_rcp85_2080_BDT, {min:0,max:100,palette:brown}, 'Potential for BDT under RCP8.5 in 2080', false);
Map.addLayer(FutureClimate_rcp85_2080_BET, {min:0,max:100,palette:green}, 'Potential for BET under RCP8.5 in 2080', false);
Map.addLayer(FutureClimate_rcp85_2080_NDT, {min:0,max:100,palette:red}, 'Potential for NDT under RCP8.5 in 2080', false);
Map.addLayer(FutureClimate_rcp85_2080_NET, {min:0,max:100,palette:blue}, 'Potential for NET under RCP8.5 in 2080', false);
*/
// --- FUTURE FOREST TYPES UNDER RCP8.5 IN 2050
// multiplied with the potential tree cover (in % tree cover)
Map.addLayer(FutureClimate_ForestTypes, {}, 'Fig. 3a - Forest types under RCP8.5 in 2050', false);
Map.addLayer(FutureClimate_ForestTypes_OnePFT, {}, 'Fig. 3a - Illustration of future forest types out of 1 PFT', false);
//Map.addLayer(FutureClimate_ForestTypes.updateMask(RestorationAreas), {}, 'Fig. 3b - Future forest types in restoration areas', false);
// --- CHANGES IN FOREST TYPES
//Map.addLayer(ChangeInForestType.updateMask(ChangeInForestType).updateMask(PotentialTreeCover.gt(0)), {min:0,max:1,palette:['#FF0000']}, 'Areas where forest types will change', false);
Map.addLayer(Changes_TH_10, {min:0,max:1, opacity: 0.5, palette:['#FF0000']}, 'Fig. 3b - Areas where forest types will change', false);
Map.addLayer(ChangeInForestType_RestorationAreas,{},'Fig. 4 - change (red) / no change (white) in Restoration Areas', false);
//Map.addLayer(ChangeInForestType_RestorationAreas, {min:0,max:1,palette:['#FF0000']}, 'Fig. 4 - Restoration areas where forest types will change', false);
//Map.addLayer(NoChangeInForestType_RestorationAreas, {min:0,max:1,palette:['FFFFFF']}, 'Fig. 4 - Restoration areas where forest types will not change', false);
// Create a bounding rectangle for the entire planet to use when exporting the image
var unboundedGeo = ee.Geometry.Polygon([-180, 88, 0, 88, 180, 88, 180, -88, 0, -88, -180, -88], null, false);
/*Export.image.toAsset(
  {
    image:Proportions_rcp85_2050,
    description:'Proportions_rcp85_2050',
    assetId: 'App/Proportions_rcp85_2050',
    region:unboundedGeo,
    scale:927.6624232772797,
    maxPixels:1e13
  }); 
*/