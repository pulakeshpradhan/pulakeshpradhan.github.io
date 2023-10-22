// !! Define the client
var CLIENT = 'Jocotoco';
// Define where the computed values will be saved 
var assetID = 'users/shared/CrowtherLab/RestorationAgencies/' + CLIENT + '/';
// !! Enter the polygons of interest and set their name
var polygon1 = ee.FeatureCollection(assetID + 'ANTISANILLA_2019').union(10).set('AreaName','ANTISANILLA');
var polygon2 = ee.FeatureCollection(assetID + 'AYAMPE_2019').union(10).set('AreaName','AYAMPE');
var polygon3 = ee.FeatureCollection(assetID + 'BUENAVENTURA_2019').union(10).set('AreaName','BUENAVENTURA');
var polygon4 = ee.FeatureCollection(assetID + 'CANANDE_2019').union(10).set('AreaName','CANANDE');
var polygon5 = ee.FeatureCollection(assetID + 'COPALINGA_2019').union(10).set('AreaName','COPALINGA');
var polygon6 = ee.FeatureCollection(assetID + 'JORUPE_2019').union(10).set('AreaName','JORUPE');
var polygon7 = ee.FeatureCollection(assetID + 'UTUANA_2019').union(10).set('AreaName','UTUANA');
var polygon8 = ee.FeatureCollection(assetID + 'YANACOCCHA_2019').union(10).set('AreaName','YANACOCCHA');
var polygon9 = ee.FeatureCollection(assetID + 'YUNGUILLA_2019').union(10).set('AreaName','YUNGUILLA');
var polygon10 = ee.FeatureCollection(assetID + 'LoggingSites').union(10).set('AreaName','NEW AREA');
var polygonAll = polygon1.merge(polygon2).merge(polygon3).merge(polygon4).merge(polygon5).merge(polygon6).merge(polygon7).merge(polygon8).merge(polygon9).merge(polygon10).union(10).set('AreaName','--- ALL ---');
// !! Enter the names of the polygons of interest and add a number
var DictOfPolygons = {
  '--- ALL ---':0,
  'NEW AREA':1,
  'ANTISANILLA':2,
  'AYAMPE':3,
  'BUENAVENTURA':4,
  'CANANDE':5,
  'COPALINGA':6,
  'JORUPE':7,
  'UTUANA':8,
  'YANACOCCHA':9,
  'YUNGUILLA':10
};
// !! Concatenate the polygons to a single one 
var polygonOI = ee.FeatureCollection([polygonAll,
                                      polygon10,
                                      polygon1,
                                      polygon2,
                                      polygon3,
                                      polygon4,
                                      polygon5,
                                      polygon6,
                                      polygon7,
                                      polygon8,
                                      polygon9]);
// !! List of values for unit conversion for the aggregated values
// Change units here: e.g. change to 
// -> "Pixel_Area","ha",1
// -> "Pixel_Area","kha",1000
// -> "Pixel_Area","Mha",1000000
var listForUnitConversion = [
  ["Pixel_Area","kha",1000],
  ["Area","kha",1000],
  ["CurrentTreeCover","kha",1000],
  ["ForestPotential","kha",1000],
  ["RestorationPotential","kha",1000],
  ["PresentBiomass","Mt C",10000],
  ["PotentialBiomass","Mt C",10000],
  ["RestorationBiomass","Mt C",10000],
  ["Npp","kt C / year",10],
  ["SG_SOC_Stock_000cm_to_200cm","Mt C",10000],
  ["SoilMicrobialCarbon","kt C",10]
];
// !! Change zoom level if wanted
var zoomlevel = 10; 
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~ FUNCTIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Function that transforms the multiband composite into an image collection
var BandsToCollection = function(image){
  var collection = ee.ImageCollection.fromImages(image.bandNames().map(function(bandName){
    return image.select(ee.String(bandName)).float().set('system:id', bandName);//.select([bandName], ['Band']);
  }));
  return collection;
};
// Change values iteratively in a list
var changeValues = function(index,newValue,previous) {
  return ee.List(previous).set(index,newValue);
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~ SETUP ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// --- Set up the palettes --- // 
var BlueRed = ["2166AC", "4393C3", "92C5DE", "D1E5F0", "FDDBC7", "F4A582", "D6604D", "B2182B"];
var Blues = ["F7FBFF", "DEEBF7", "C6DBEF", "9ECAE1", "6BAED6", "4292C6", "2171B5", "08519C", "08306B"];
var Greens = ["F7FCF5", "E5F5E0", "C7E9C0", "A1D99B", "74C476", "41AB5D", "238B45", "006D2C", "00441B"];
var Reds = ["FFF5F0", "FEE0D2", "FCBBA1", "FC9272", "FB6A4A", "EF3B2C", "CB181D", "A50F15", "67000D"];
var Zissou = ["3B9AB2", "78B7C5", "EBCC2A", "E1AF00", "F21A00"];
var Magma = ["000004", "1D1147", "51127C", "822681", "B63679", "E65164", "FB8861", "FEC287", "FCFDBF"];
var Viridis = ["440154", "472D7B", "3B528B", "2C728E", "21908C", "27AD81", "5DC863", "AADC32", "FDE725"];
var SpectralReversed = ["3288BD", "66C2A5", "ABDDA4", "E6F598", "FFFFBF", "FEE08B", "FDAE61", "F46D43", "D53E4F"];
// Make a list of layers to include, their name & unit, their palette and the provided information
var listOfLayers = [
  ['CurrentTreeCover','Tree Cover in 2000 (%)',Greens,'This layer shows how much of the pixel area was covered by tree canopy in the year 2000.'],
  ['ForestPotential','Tree Cover Potential (%)',Greens,'This layer shows how much of the pixel area could be covered by tree canopy.'],
  ['RestorationPotential','Restoration Potential (%)',Greens,'This layer shows how much of the pixel area could be restored by tree cover outside of urban and agricultural land'],
  ['PresentBiomass','Current Biomass Density (aboveground) (t/ha)',Viridis,'This layer shows the current biomass density aboveground.'],
  ['PotentialBiomass','Potential Biomass Density (aboveground) (t/ha)',Viridis,'This layer shows the potential biomass density aboveground, if the area was effectively managed.'],
  ['RestorationBiomass','Restorable Biomass Density (aboveground) (t/ha)',Viridis,'This layer shows the restorable biomass density aboveground, if the area was effectively managed and tree cover maximized.'],
  ['Npp','Net Plant Productivity (t Carbon/ha/year)',Greens,'This layer shows the amount of carbon that plants absorb and allocate to leaves, roots, stalks or trunks every year.'],
  ['CHELSA_Annual_Precipitation','Annual Precipitation (mm)',Blues,'This layer shows annual rainfall.'],
  ['CHELSA_Precipitation_Seasonality','Precipitation Seasonality (mm)',BlueRed,'This layer shows how variable rainfall is. A higher value indicates more variability.'],
  ['CHELSA_Temperature_Seasonality','Temperature Seasonality (°C)',Reds,'This layer shows how variable temperature is. A higher value indicates more variability.'],
  ['EarthEnvTopoMed_Elevation','Elevation (m)',Reds,'This layer shows the elevation of the area.'],
  ['LandCoverClass_Barren','Pixel Area covered by Barren Ground (%)',Reds,'This layer shows how much of the pixel area is exposed soil, sand, rocks, or snow.'],
  ['LandCoverClass_Shrubs','Pixel Area covered by Shrubs (%)',Greens,'This layer shows how much of the pixel area is covered by shrubs (woody vegetation <2m height).'],
  ['SoilMicrobialCarbon','Soil Microbial Biomass (t/ha)',Reds,'This layer shows the amount of microbial biomass that lives in the soil. The higher this value, the healthier the soil is.'],
  ['Nematodes_Total_per100gSoil','Number of Nematodes per 100g Soil',SpectralReversed,'This layer shows the number of Nematodes in 100g soil. Nematodes are an important contributor to soil health.'],
  ['SG_Bulk_density_030cm','Bulk Density at 30cm depth (kg/m3)',Magma,'This layer shows the dry weight of soil per unit volume of soil. The higher the bulk density, the lower the porosity of the soil.'],
  ['SG_CEC_030cm','Cation-Exchange Capacity at 30cm depth (cmolc/kg)',Magma,'This layer is an indicator for soil fertility. The higher the CEC, the higher the soil fertility.'],
  ['SG_Clay_Content_030cm','Clay Content at 30cm depth (mass fraction in %)',Magma,'This layer shows how much of the soil particles are smaller than 2 microns. Soils with high amount of clay tend to be more fertile but too much clay leads to poor infiltration.'],
  ['SG_Silt_Content_030cm','Silt Content at 30cm depth (mass fraction in %)',Magma,'This layer shows how much of the soil particles are between 2 and 50 microns. Soils with high amount of silt tend to be store more water available for plants.'],
  ['SG_Sand_Content_030cm','Sand Content at 30cm depth (mass fraction in %)',Magma,'This layer shows how much of the soil particles are between 50 microns and 2mm. Soils with high amount of sand tend to infiltrate water quickly.'],
  ['SG_Coarse_fragments_030cm','Coarse Fragments (%)',Magma,'This layer shows how much of the soil particles are bigger than 2mm. These soils contain either heigh amounts of gravel or large organic debris.'],
  ['SG_Depth_to_bedrock','Depth to bedrock up to 2m (cm)',Magma,'This layer shows the depth to bedrock. The higher this depth, the more water can be stored in the soil per area.'],
  ['SG_H2O_Capacity_030cm','Available Soil Water Capacity at 30cm depth (%)',Blues,'This layer shows the plant available water. The higher this number, the more water is available to plants.'],
  ['SG_Saturated_H2O_Content_030cm','Saturated Water Content at 30cm depth (%)',Blues,'This layer shows the maximum amount of water that the soil can store.'],
  ['SG_SOC_Content_030cm','Soil Organic Carbon Content at 30cm depth (g/kg)',Reds,'This layer shows how much organic carbon is stored within the soil at 30cm depth.'],
  ['SG_SOC_Density_030cm','Soil Organic Carbon Density at 30cm depth (kg/m3)',Reds,'This layer shows how densely the organic carbon is distributed throughout the soil at 30cm depth.'],
  ['SG_SOC_Stock_030cm_to_060cm','Soil Organic Carbon Stock at 30-60cm depth (t/ha)',Reds,'This layer shows how much organic carbon is stored per hectare in the soil at 30-60cm depth.'],
  ['SG_Soil_pH_KCl_030cm','Soil pH in KCl at 30cm depth (ph x 10)',Zissou,'This layer shows the pH value of the soil at 30cm depth.'],
  ['Soil_N_Density_015_to_030_cm','Total Soil Nitrogen Density at 15-30cm depth (g/kg)',Blues,'This layer shows how much total Nitrogen is stored within the soil at 15-30cm depth.'],
  ['Soil_CNratio_015_to_030_cm','Organic Carbon to Total Nitrogen Ration (C,N) at 15-30cm depth (-)',BlueRed,'This layer shows the Carbon to Total Nitrogen Ratio (C,N) at 15-30cm depth. This layer can be used as an indicator for nitrogen limitation of plants.'],
  ['Tree_Density','Tree Density (# of stems/pixel)',Greens,'This layer shows the number of trees / stems in each pixel.']
];
// Get the layer names that should be shown
var layersToShow = listOfLayers.map(function(element){
  return ee.List(element).get(0);
});
// --- Set up the layers --- // 
// Input the composite based on the following Script,
// https://code.earthengine.google.com/e846fec6053d869d9f1a982ede63dd13
var composite = ee.Image("users/shared/Composite/CompositeForCLApp");
// Input Hansen's Tree Cover Layer
var ForestCover = ee.Image("UMD/hansen/global_forest_change_2018_v1_6").select('treecover2000').rename("CurrentTreeCover");
// Set all pixels in Hansen's Tree Cover Layer to 100% (this allows to calculate the Area with this layer/resolution)
var PixelAreaHansenSize = ForestCover.gt(-1).multiply(100).rename("Area");
// Calculate total belowground Carbon stocks 
var SG_SOC_Stock_000cm_to_200cm = composite.select('SG_SOC_Stock_000cm_to_005cm')
                                .add(composite.select('SG_SOC_Stock_005cm_to_015cm'))
                                .add(composite.select('SG_SOC_Stock_015cm_to_030cm'))
                                .add(composite.select('SG_SOC_Stock_030cm_to_060cm'))
                                .add(composite.select('SG_SOC_Stock_060cm_to_100cm'))
                                .add(composite.select('SG_SOC_Stock_100cm_to_200cm'))
                                .rename('SG_SOC_Stock_000cm_to_200cm');
// Concatenate the Hansen Layer with the Composite
var composite = composite.addBands([ForestCover,PixelAreaHansenSize,SG_SOC_Stock_000cm_to_200cm]);
//print(composite.bandNames(),'All Layers');
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~ COMPUTE THE AGGREGATED VALUE ~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Choose the layers of which to show aggregated values
var compositeToUse = composite.select(
  listForUnitConversion[0][0],
  listForUnitConversion[1][0],
  listForUnitConversion[2][0],
  listForUnitConversion[3][0],
  listForUnitConversion[4][0],
  listForUnitConversion[5][0],
  listForUnitConversion[6][0],
  listForUnitConversion[7][0],
  listForUnitConversion[8][0],
  listForUnitConversion[9][0],
  listForUnitConversion[10][0]
);
// Get the band names
var bandNames = compositeToUse.bandNames();
//print('Aggregated Layers',bandNames);
// Transform the compositeToUse into an Image Collection
var Composite = BandsToCollection(compositeToUse);
// Combine MultiPolygons
var AOItable = ee.FeatureCollection(polygonOI.toList(100).map(function(FC){
  // Check if there are more than one feature, if so combine them
  return ee.Algorithms.If(ee.FeatureCollection(FC).toList(100).length().gt(1),
                          ee.Feature(ee.FeatureCollection(FC).union(1).toList(100).get(0)).set('AreaName', ee.FeatureCollection(FC).get("AreaName")),
                          ee.Feature(ee.FeatureCollection(FC).toList(100).get(0)).set('AreaName', ee.FeatureCollection(FC).get("AreaName")));
}));
//print(AOItable, 'Areas of Interest');
// --- Add an index to the FeatureCollection --- //
// Create list to map over the Features
var ListOfAOIs = ee.List.sequence(0,AOItable.toList(100).length().subtract(1),1);
// Give the AOI Features an ID
var AOItable = AOItable.map(function(feature){return feature.set('ID',feature.id())});
// Get FC that holds an numerated index and the ID from AOItable
var FCWithIndex = ListOfAOIs.map(function(i){
  return ee.Feature(ee.Geometry.Point([0,0])).set('index',i).set('ID', ee.Feature(AOItable.toList(100).get(i)).id());
});
// Use an equals filter to specify how the feature collections match
var JoinFilter = ee.Filter.equals({
  leftField: 'ID',
  rightField: 'ID'
});
// Define the join.
var innerJoin = ee.Join.inner();
// Apply the join.
var toyJoin = innerJoin.apply(AOItable, FCWithIndex, JoinFilter);
// Define new AOItable that holds an index property
var AOItable = toyJoin.map(function(pair) {
  var f1 = ee.Feature(pair.get('primary'));
  var f2 = ee.Feature(pair.get('secondary'));
  return f1.set(f2.toDictionary());
});
// --- Compute the values --- //
// Create list to map over the AOIs
var ListOfImages = ee.List.sequence(0,Composite.toList(100).length().subtract(1),1);
// Map over the AOI using the list of indices 
var Values = ListOfAOIs.map(function(i){
  // Get the geometry of each feature
  var Geometry = ee.Feature(AOItable.toList(100).get(i)).geometry();
  // Setup the reducer
  var Reducer = {
	reducer: ee.Reducer.sum(),
	geometry: Geometry,
	scale: 927.6624232772797,
	maxPixels: 1e12
  };
  // Map over the different images 
  var computeValues = ListOfImages.map(function(image){
    // Get the image of interest
    var ImageOI = ee.Image(Composite.toList(100).get(image));
    // Multiply image with pixel area
    var imageMultiplied = ImageOI.multiply(compositeToUse.select('Pixel_Area'));
    // Apply reducer to get the sum in each geometry 
    var value = imageMultiplied.reduceRegion(Reducer);
    return value;});
  return computeValues;
});
//print(Values, 'Computed Values');
// Copy the computed values into the AOItable as properties 
var FinalFC = AOItable.map(function(feature){
  // List that holds the values
  var ListWithValues = ee.List(Values.get(ee.Feature(feature).getNumber("index")));
    // Get the list of the values
    var ListOfValues = ListOfImages.map(function(n){
      // Divisor for conversion 
      var divisor = ee.Number(ee.List(ee.List(listForUnitConversion).get(n)).get(2));
      return ee.Dictionary(ListWithValues.get(n)).getNumber(bandNames.get(n)).divide(divisor).round().divide(100);
    });
  // Create a Dictionary out of bandNames and values 
  var DictionaryWithValues = ee.Dictionary.fromLists(bandNames,ListOfValues);
  // Set the values as properties 
  return ee.Feature(feature).set(DictionaryWithValues);
});
//print(FinalFC,'Final FeatureCollection');
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~ COMPUTE MIN AND MAX VALUES OF THE IMAGES ~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Clip the composite to the polygons 
var composite = composite.select(layersToShow).clip(FinalFC.geometry());
// Clip the composite to the geometry of all polygons and transform it into an ImageCollection
var compositeAsIC = BandsToCollection(composite);
// Map over the ImageCollection and compute min and max values inside the polygons
var minMaxValuesOfLayers = ee.FeatureCollection(compositeAsIC.map(function(layer){
  // Get the Layer name
  var nameOfLayer = layer.bandNames().get(0);
  // Get min & max values
  var dictOfMinMaxValues = layer.reduceRegion({reducer:ee.Reducer.percentile([0,100])});
  return ee.Feature(ee.Geometry.Point([0, 0]))
    .set('LayerName',nameOfLayer)
    .set('Min',dictOfMinMaxValues.get(ee.String(nameOfLayer).cat('_p0')))
    .set('Max',dictOfMinMaxValues.get(ee.String(nameOfLayer).cat('_p100')));
}));
// Export both FeatureCollections holding aggregated values & MinMax values
Export.table.toAsset({
  collection: FinalFC,
  description: 'exportedAggregateValues',
  assetId: assetID + 'exportedAggregateValues'
});
Export.table.toAsset({
  collection: minMaxValuesOfLayers,
  description: 'exportedMinMaxValues',
  assetId: assetID + 'exportedMinMaxValues'
});
print('!! Run the two export tasks and share them before you resume!');
// Alternatively export the final FeatureCollection to Drive holding the values 
Export.table.toDrive({
  collection: FinalFC,
  description: 'AlternativelyExportAggregatedValuesToDrive',
  folder: 'GEE_Output',
  fileNamePrefix: 'AggregatedValues_' + CLIENT,
  fileFormat: 'CSV'
});
// Import the exported FeatureCollections again
var FinalFC = ee.FeatureCollection(assetID + 'exportedAggregateValues');
var minMaxValuesOfLayers = ee.FeatureCollection(assetID + 'exportedMinMaxValues');
// Make a list of the length of the Layers list
var listOfLayerIndices = ee.List.sequence(0,ee.List(listOfLayers).length().subtract(1));
// Transform the server-side FeatureCollection into client-side lists 
var listOfLayerNames = listOfLayerIndices.map(function(f){
  return ee.Feature(minMaxValuesOfLayers.toList(100).get(f)).get('LayerName');
});
var listOfMaxValues = listOfLayerIndices.map(function(f){
  return ee.Feature(minMaxValuesOfLayers.toList(100).get(f)).get('Max');
});
var listOfMinValues = listOfLayerIndices.map(function(f){
  return ee.Feature(minMaxValuesOfLayers.toList(100).get(f)).get('Min');
});
// Manipulate the Min&Max values in the list for layers with proportions (0-100%)
var layersToManipulate = ['CurrentTreeCover','ForestPotential','RestorationPotential','LandCoverClass_Barren','LandCoverClass_Shrubs'];
var listOfIndicesToManipulate = ee.List.sequence(0,ee.List(layersToManipulate).length().subtract(1));
var idxOfLayersToManipulate = listOfIndicesToManipulate.map(function(i){
  return listOfLayerNames.indexOf(ee.List(layersToManipulate).get(i));
});
var listOfMaxValues = listOfMaxValues.set(idxOfLayersToManipulate.get(0),100).set(idxOfLayersToManipulate.get(1),100).set(idxOfLayersToManipulate.get(2),100).set(idxOfLayersToManipulate.get(3),100).set(idxOfLayersToManipulate.get(4),100);
var listOfMinValues = listOfMinValues.set(idxOfLayersToManipulate.get(0),0).set(idxOfLayersToManipulate.get(1),0).set(idxOfLayersToManipulate.get(2),0).set(idxOfLayersToManipulate.get(3),0).set(idxOfLayersToManipulate.get(4),0);
// Manipulate the Biomass values in a way that for the max of potential Biomass is max for all
var listOfMaxValues = listOfMaxValues.set(listOfLayerNames.indexOf('PresentBiomass'),listOfMaxValues.get(listOfLayerNames.indexOf('PotentialBiomass'))).set(listOfLayerNames.indexOf('RestorationBiomass'),listOfMaxValues.get(listOfLayerNames.indexOf('PotentialBiomass')));
var listOfMinValues = listOfMinValues.set(listOfLayerNames.indexOf('PotentialBiomass'),listOfMinValues.get(listOfLayerNames.indexOf('RestorationBiomass'))).set(listOfLayerNames.indexOf('PresentBiomass'),listOfMinValues.get(listOfLayerNames.indexOf('RestorationBiomass')));
// Match the indices of the layer names with the ones defined in the beginning
var matchingIndices = ee.List(layersToShow).map(function(item){
  return listOfLayerNames.indexOf(item);
});
// !! Transform the lists from server to client-side lists
// !! The lists are printed in the Console. Go ahead, click on JSON and copy/paste these lists
// !! into this script and command the "getInfo()" lines
// !! Command these lines
//var listOfLayerNames = listOfLayerNames.getInfo();
//var listOfMaxValues = listOfMaxValues.getInfo();
//var listOfMinValues = listOfMinValues.getInfo();
//var matchingIndices = matchingIndices.getInfo();
print('!! Click on JSON of the lists below and copy/paste them into the Script!')
print(listOfLayerNames)
print(listOfMaxValues)
print(listOfMinValues)
print(matchingIndices)
// !! Paste the lists in here
var listOfLayerNames = [
  "CurrentTreeCover",
  "ForestPotential",
  "LandCoverClass_Barren",
  "LandCoverClass_Shrubs",
  "RestorationPotential",
  "EarthEnvTopoMed_Elevation",
  "SG_Depth_to_bedrock",
  "CHELSA_Temperature_Seasonality",
  "SG_SOC_Density_030cm",
  "SG_Silt_Content_030cm",
  "CHELSA_Precipitation_Seasonality",
  "Soil_N_Density_015_to_030_cm",
  "SG_Saturated_H2O_Content_030cm",
  "PresentBiomass",
  "RestorationBiomass",
  "SG_H2O_Capacity_030cm",
  "SoilMicrobialCarbon",
  "SG_Soil_pH_KCl_030cm",
  "Npp",
  "SG_SOC_Content_030cm",
  "Tree_Density",
  "CHELSA_Annual_Precipitation",
  "SG_CEC_030cm",
  "PotentialBiomass",
  "SG_SOC_Stock_030cm_to_060cm",
  "Soil_CNratio_015_to_030_cm",
  "SG_Sand_Content_030cm",
  "Nematodes_Total_per100gSoil",
  "SG_Bulk_density_030cm",
  "SG_Clay_Content_030cm",
  "SG_Coarse_fragments_030cm"
];
var listOfMaxValues = [
  100,
  100,
  100,
  100,
  100,
  4442.5,
  200,
  1298.3377685546875,
  776.6895751953125,
  41.17763900756836,
  113.0898666381836,
  11.745429992675781,
  71.55646514892578,
  505.0065002441406,
  505.0065002441406,
  32.51826477050781,
  2.6002755165100098,
  51.52571487426758,
  18008.232421875,
  172.89218139648438,
  90962.8671875,
  2978.439453125,
  49.17529296875,
  505.0065002441406,
  213.45831298828125,
  30.655378341674805,
  56.58624267578125,
  6689.69580078125,
  1348.5833740234375,
  40.22309494018555,
  26.020082473754883
];
var listOfMinValues = [
  0,
  0,
  0,
  0,
  0,
  50,
  60.9072265625,
  218.73046875,
  128.1434326171875,
  17.984712600708008,
  22.789583206176758,
  0.8942833542823792,
  45.078067779541016,
  -0.028871705755591393,
  -0.028871705755591393,
  21.14764976501465,
  0.32199108600616455,
  42.34138488769531,
  2229.081298828125,
  9.022099494934082,
  779.2068481445312,
  564.5828247070312,
  15.323803901672363,
  -0.028871705755591393,
  43.76491165161133,
  4.8335371017456055,
  32.138084411621094,
  959.5906982421875,
  461.3424987792969,
  9.774596214294434,
  6.4286112785339355
];
var matchingIndices = [
  0,
  1,
  4,
  13,
  23,
  14,
  18,
  21,
  10,
  7,
  5,
  2,
  3,
  16,
  27,
  28,
  22,
  29,
  9,
  26,
  30,
  6,
  15,
  12,
  19,
  8,
  24,
  17,
  11,
  25,
  20
];
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~ MAP ALL LAYERS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Make the cursor a crosshair
Map.style().set('cursor', 'crosshair');
Map.setCenter(0, 0, 2);
Map.addLayer(AOItable,{}, 'Areas of Interest');
Map.addLayer(composite.select(listOfLayers[0][0]), {min: listOfMinValues[matchingIndices[0]], max: listOfMaxValues[matchingIndices[0]], palette: listOfLayers[0][2]}, listOfLayers[0][1]);
Map.addLayer(composite.select(listOfLayers[1][0]), {min: listOfMinValues[matchingIndices[1]], max: listOfMaxValues[matchingIndices[1]], palette: listOfLayers[1][2]}, listOfLayers[1][1], false);
Map.addLayer(composite.select(listOfLayers[2][0]), {min: listOfMinValues[matchingIndices[2]], max: listOfMaxValues[matchingIndices[2]], palette: listOfLayers[2][2]}, listOfLayers[2][1], false);
Map.addLayer(composite.select(listOfLayers[3][0]), {min: listOfMinValues[matchingIndices[3]], max: listOfMaxValues[matchingIndices[3]], palette: listOfLayers[3][2]}, listOfLayers[3][1], false);
Map.addLayer(composite.select(listOfLayers[4][0]), {min: listOfMinValues[matchingIndices[4]], max: listOfMaxValues[matchingIndices[4]], palette: listOfLayers[4][2]}, listOfLayers[4][1], false);
Map.addLayer(composite.select(listOfLayers[5][0]), {min: listOfMinValues[matchingIndices[5]], max: listOfMaxValues[matchingIndices[5]], palette: listOfLayers[5][2]}, listOfLayers[5][1], false);
Map.addLayer(composite.select(listOfLayers[6][0]), {min: listOfMinValues[matchingIndices[6]], max: listOfMaxValues[matchingIndices[6]], palette: listOfLayers[6][2]}, listOfLayers[6][1], false);
Map.addLayer(composite.select(listOfLayers[7][0]), {min: listOfMinValues[matchingIndices[7]], max: listOfMaxValues[matchingIndices[7]], palette: listOfLayers[7][2]}, listOfLayers[7][1], false);
Map.addLayer(composite.select(listOfLayers[8][0]), {min: listOfMinValues[matchingIndices[8]], max: listOfMaxValues[matchingIndices[8]], palette: listOfLayers[8][2]}, listOfLayers[8][1], false);
Map.addLayer(composite.select(listOfLayers[9][0]), {min: listOfMinValues[matchingIndices[9]], max: listOfMaxValues[matchingIndices[9]], palette: listOfLayers[9][2]}, listOfLayers[9][1], false);
Map.addLayer(composite.select(listOfLayers[10][0]), {min: listOfMinValues[matchingIndices[10]], max: listOfMaxValues[matchingIndices[10]], palette: listOfLayers[10][2]}, listOfLayers[10][1], false);
Map.addLayer(composite.select(listOfLayers[11][0]), {min: listOfMinValues[matchingIndices[11]], max: listOfMaxValues[matchingIndices[11]], palette: listOfLayers[11][2]}, listOfLayers[11][1], false);
Map.addLayer(composite.select(listOfLayers[12][0]), {min: listOfMinValues[matchingIndices[12]], max: listOfMaxValues[matchingIndices[12]], palette: listOfLayers[12][2]}, listOfLayers[12][1], false);
Map.addLayer(composite.select(listOfLayers[13][0]), {min: listOfMinValues[matchingIndices[13]], max: listOfMaxValues[matchingIndices[13]], palette: listOfLayers[13][2]}, listOfLayers[13][1], false);
Map.addLayer(composite.select(listOfLayers[14][0]), {min: listOfMinValues[matchingIndices[14]], max: listOfMaxValues[matchingIndices[14]], palette: listOfLayers[14][2]}, listOfLayers[14][1], false);
Map.addLayer(composite.select(listOfLayers[15][0]), {min: listOfMinValues[matchingIndices[15]], max: listOfMaxValues[matchingIndices[15]], palette: listOfLayers[15][2]}, listOfLayers[15][1], false);
Map.addLayer(composite.select(listOfLayers[16][0]), {min: listOfMinValues[matchingIndices[16]], max: listOfMaxValues[matchingIndices[16]], palette: listOfLayers[16][2]}, listOfLayers[16][1], false);
Map.addLayer(composite.select(listOfLayers[17][0]), {min: listOfMinValues[matchingIndices[17]], max: listOfMaxValues[matchingIndices[17]], palette: listOfLayers[17][2]}, listOfLayers[17][1], false);
Map.addLayer(composite.select(listOfLayers[18][0]), {min: listOfMinValues[matchingIndices[18]], max: listOfMaxValues[matchingIndices[18]], palette: listOfLayers[18][2]}, listOfLayers[18][1], false);
Map.addLayer(composite.select(listOfLayers[19][0]), {min: listOfMinValues[matchingIndices[19]], max: listOfMaxValues[matchingIndices[19]], palette: listOfLayers[19][2]}, listOfLayers[19][1], false);
Map.addLayer(composite.select(listOfLayers[20][0]), {min: listOfMinValues[matchingIndices[20]], max: listOfMaxValues[matchingIndices[20]], palette: listOfLayers[20][2]}, listOfLayers[20][1], false);
Map.addLayer(composite.select(listOfLayers[21][0]), {min: listOfMinValues[matchingIndices[21]], max: listOfMaxValues[matchingIndices[21]], palette: listOfLayers[21][2]}, listOfLayers[21][1], false);
Map.addLayer(composite.select(listOfLayers[22][0]), {min: listOfMinValues[matchingIndices[22]], max: listOfMaxValues[matchingIndices[22]], palette: listOfLayers[22][2]}, listOfLayers[22][1], false);
Map.addLayer(composite.select(listOfLayers[23][0]), {min: listOfMinValues[matchingIndices[23]], max: listOfMaxValues[matchingIndices[23]], palette: listOfLayers[23][2]}, listOfLayers[23][1], false);
Map.addLayer(composite.select(listOfLayers[24][0]), {min: listOfMinValues[matchingIndices[24]], max: listOfMaxValues[matchingIndices[24]], palette: listOfLayers[24][2]}, listOfLayers[24][1], false);
Map.addLayer(composite.select(listOfLayers[25][0]), {min: listOfMinValues[matchingIndices[25]], max: listOfMaxValues[matchingIndices[25]], palette: listOfLayers[25][2]}, listOfLayers[25][1], false);
Map.addLayer(composite.select(listOfLayers[26][0]), {min: listOfMinValues[matchingIndices[26]], max: listOfMaxValues[matchingIndices[26]], palette: listOfLayers[26][2]}, listOfLayers[26][1], false);
Map.addLayer(composite.select(listOfLayers[27][0]), {min: listOfMinValues[matchingIndices[27]], max: listOfMaxValues[matchingIndices[27]], palette: listOfLayers[27][2]}, listOfLayers[27][1], false);
Map.addLayer(composite.select(listOfLayers[28][0]), {min: listOfMinValues[matchingIndices[28]], max: listOfMaxValues[matchingIndices[28]], palette: listOfLayers[28][2]}, listOfLayers[28][1], false);
Map.addLayer(composite.select(listOfLayers[29][0]), {min: listOfMinValues[matchingIndices[29]], max: listOfMaxValues[matchingIndices[29]], palette: listOfLayers[29][2]}, listOfLayers[29][1], false);
Map.addLayer(composite.select(listOfLayers[30][0]), {min: listOfMinValues[matchingIndices[30]], max: listOfMaxValues[matchingIndices[30]], palette: listOfLayers[30][2]}, listOfLayers[30][1], false);
//Map.addLayer(FinalFC.style({color: 'black', fillColor: '00000000'}),{},'Country borders');
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~ SETUP PANEL
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Create legend titles
var legendTitle = ui.Label({
value: CLIENT + ' App',
style: {
fontWeight: 'bold',
fontSize: '22px',
margin: '8px 0px 4px 8px',
padding: '0'
}
});
var empty2 = ui.Label({
value: '',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '30px 0px 4px 8px',
padding: '0'
}
});
var empty3 = ui.Label({
value: '',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '30px 0px 4px 8px',
padding: '0'
}
});
var Area = ui.Label({
value: '',
style: {
fontWeight: 'bold',
fontSize: '12px',
margin: '8px 0px 35px 8px',
padding: '0'
}
});
var Area2 = ui.Label({
value: '   ',
style: {
fontWeight: 'bold',
fontSize: '12px',
margin: '8px 0px 35px 8px',
padding: '0'
}
});
var Title1 = ui.Label({
value: 'Aggregated values',
style: {
fontWeight: 'bold',
fontSize: '14px',
margin: '8px 0px 4px 8px',
padding: '0'
}
});
var legendTitlePixelValues = ui.Label({
	value: 'Pixel values',
	style: {
	fontWeight: 'bold',
	fontSize: '14px',
	margin: '8px 0px 4px 8px',
	padding: '0'}
});
var ClickOnAPixel = ui.Label({
	value: 'Click on a pixel to get its value',
	style: {
	fontWeight: 'italic',
	fontSize: '12px',
	margin: '8px 0px 4px 8px',
	padding: '0'}
});
var selectLocationToGet = ui.Label({
	value: 'Select a location to get its values',
	style: {
	fontWeight: 'italic',
	fontSize: '12px',
	margin: '8px 0px 4px 8px',
	padding: '0'}
});
// Set up two panel holding the values from both areas 
var panel = ui.Panel({style: {width: '300px'}});
var panel1 = ui.Panel({style: {width: '100px'}});
// Add the panels 
ui.root.add(panel);
ui.root.add(panel1);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~ SETUP CALLBACK FUNCTION
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Overwrite the former values 
  panel.widgets().set(14,ui.Label(''));
  panel.widgets().set(15,ui.Label(''));
  panel.widgets().set(16,ui.Label(''));
  panel.widgets().set(17,ui.Label(''));
  panel.widgets().set(18,ui.Label(''));
  // Create or update the location label (the second widget in the panel)
  var location = 'Location: ( ' + coords.lon.toFixed(2) + ' | ' + coords.lat.toFixed(2) + ' )';
  // Get the displayed layers
  var displayedLayers = Map.layers();
  // Map over all displayed layers to find the active ones
  var listOfDisplayedLayersBoolean = displayedLayers.map(function (layer) {
    return layer.getShown();});
  // Get the index of the layer that is shown (the highest of the active ones)
  var indexOfShownLayer = ee.List(listOfDisplayedLayersBoolean).lastIndexOfSubList([true]).getInfo();
  // Get the shown layer
  var shownLayer = displayedLayers.get(indexOfShownLayer).getEeObject();
  // Get the name of the shown layer 
  var nameOfShownLayer = displayedLayers.get(indexOfShownLayer).getName();
  // Sample the shown layer at the chosen pixel 
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var sample = shownLayer.sample(point);
  var Bandname = shownLayer.bandNames().get(0);
  var computedValue = sample.first().get(Bandname);
  var informationToShow = ee.List(ee.List(listOfLayers).get(ee.Number(indexOfShownLayer).subtract(1))).get(3);
  var computedDict = ee.Dictionary([nameOfShownLayer,[computedValue,informationToShow]]);
  // Display the longitude and latitude
  panel.widgets().set(14, ui.Label({
  value: location, style: {margin: '0 0 4px 10px'}}));
  // While the values are computed, display placeholder 
  panel.widgets().set(16, ui.Label({
  value: 'The value is loading...', style: {color: 'gray', margin: '0 0 4px 10px'}}));   
  panel.widgets().set(17, ui.Label({
  value: '', style: {margin: '0 0 4px 10px'}}));
  panel.widgets().set(18, ui.Label({
  value: '', style: {margin: '0 0 4px 10px'}}));
  // Request the value and the unit from the server
  computedDict.evaluate(function(dict) {
  // Show the value that is returned from the server
  panel.widgets().set(16, ui.Label({
  value: 'Value: ' + ee.List(ee.List(ee.Dictionary(dict).values()).get(0)).get(0).getInfo().toFixed(2), style: {margin: '0 0 4px 10px'}}));
  panel.widgets().set(17, ui.Label({
  value: 'Layer: ' + ee.Dictionary(dict).keys().get(0).getInfo(), style: {margin: '0 0 4px 10px'}}));
  panel.widgets().set(18, ui.Label({
  value: 'Information: ' + ee.List(ee.List(ee.Dictionary(dict).values()).get(0)).get(1).getInfo(), style: {margin: '0 0 4px 10px'}}));
  });
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~ SETUP PIXEL AGGREGATES
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Creates a Select panel
var selectLocation = ui.Select({
  items: Object.keys(DictOfPolygons),
  placeholder: 'Select location...',
  onChange: function(polygon) {
    // Selected polygon
    var polygonGeo = AOItable.filter(ee.Filter.inList("AreaName", [polygon])).geometry();
    // Fly to the polygon
    Map.centerObject(polygonGeo, zoomlevel);
    // Get the Dictionary of the polygons' values 
    var polygonValues = ee.Feature(FinalFC.filter(ee.Filter.inList("AreaName", [polygon])).toList(100).get(0)).toDictionary().getInfo();
    panel.widgets().set(3,ui.Label('Area (' + ee.String(listForUnitConversion[1][1]).getInfo() + ')'));
    panel1.widgets().set(3,ui.Label({value: polygonValues['Area']}));
    panel.widgets().set(4,ui.Label('Tree Cover in 2000 ('+ ee.String(listForUnitConversion[2][1]).getInfo() + ')'));
    panel1.widgets().set(4,ui.Label({value: polygonValues['CurrentTreeCover']}));
    panel.widgets().set(5,ui.Label({value:'Tree Cover Potential (' + ee.String(listForUnitConversion[3][1]).getInfo() + ')', style: {margin: '5px 0 12px 30px'}}));
    panel1.widgets().set(5,ui.Label({value: polygonValues['ForestPotential']}));
    //panel.widgets().set(6,ui.Label({value:'... in Agricultural Areas (ha)', style: {margin: '5px 0 12px 30px'}}));
    //panel1.widgets().set(6,ui.Label({value: ee.Feature(polygonValues).get('ForestPotentialInAgriculturalAreas').getInfo()  }));
    panel.widgets().set(6,ui.Label({value:'Restoration Potential (' + ee.String(listForUnitConversion[4][1]).getInfo() + ')', style: {margin: '5px 0 12px 30px'}}));
    panel1.widgets().set(6,ui.Label({value: polygonValues['RestorationPotential']}));
    panel.widgets().set(7,ui.Label('Current Biomass aboveground (' + ee.String(listForUnitConversion[5][1]).getInfo() + ')'));
    panel1.widgets().set(7,ui.Label({value: polygonValues['PresentBiomass']}));
    panel.widgets().set(8,ui.Label({value:'Potential Biomass aboveground (' + ee.String(listForUnitConversion[6][1]).getInfo() + ')', style: {margin: '5px 0 12px 30px'}}));
    panel1.widgets().set(8,ui.Label({value: polygonValues['PotentialBiomass']}));
    panel.widgets().set(9,ui.Label({value:'Restorable Biomass aboveground (' + ee.String(listForUnitConversion[7][1]).getInfo() + ')', style: {margin: '5px 0 12px 30px'}}));
    panel1.widgets().set(9,ui.Label({value: polygonValues['RestorationBiomass'],style: {margin: '8px 0 10px 8px'}}));
    panel.widgets().set(10,ui.Label('Net Primary Productivity (' + ee.String(listForUnitConversion[8][1]).getInfo() + ')'));
    panel1.widgets().set(10,ui.Label({value: polygonValues['Npp']}));
    panel.widgets().set(11,ui.Label('Soil Carbon Stock (first 2m) (' + ee.String(listForUnitConversion[9][1]).getInfo() + ')'));
    panel1.widgets().set(11,ui.Label({value: polygonValues['SG_SOC_Stock_000cm_to_200cm']}));
    panel.widgets().set(12,ui.Label({value:'Soil Microbial Biomass (' + ee.String(listForUnitConversion[10][1]).getInfo() + ')', style: {margin: '5px 0 12px 30px'}}));
    panel1.widgets().set(12,ui.Label({value: polygonValues['SoilMicrobialCarbon']}));
  }
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~ SETUP LAYOUT BETWEEN THE VALUE TABLES
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var emptyBox1 = ui.Label({value:'',style:{height:'12px'}});
var emptyBox2 = ui.Label({value:'',style:{height:'12px'}});
var emptyBox3 = ui.Label({value:'',style:{height:'12px'}});
var emptyBox4 = ui.Label({value:'',style:{height:'12px'}});
var emptyBox5 = ui.Label({value:'',style:{height:'12px'}});
var emptyBox6 = ui.Label({value:'',style:{height:'12px'}});
var emptyBox7 = ui.Label({value:'',style:{height:'12px'}});
var emptyBox8 = ui.Label({value:'',style:{height:'12px'}});
var emptyBox9 = ui.Label({value:'',style:{height:'12px'}});
var emptyBox10 = ui.Label({value:'',style:{height:'12px'}});
// Add all elements to the panels
panel.add(legendTitle);
panel1.add(empty2);
panel.add(selectLocation);
panel1.add(Area2);
panel.add(Title1);
panel1.add(empty3);
panel.add(selectLocationToGet).add(emptyBox1).add(emptyBox2).add(emptyBox3).add(emptyBox4).add(emptyBox5).add(emptyBox6).add(emptyBox7).add(emptyBox8).add(emptyBox9);
panel.add(legendTitlePixelValues);
panel.add(ClickOnAPixel);