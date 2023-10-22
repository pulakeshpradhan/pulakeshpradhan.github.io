// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~ IMPORT COUNTRY POLYGON ~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var lsib = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
print(lsib.aggregate_array("country_na"),'Country names');
// !! Enter the countries of interest and add a number
var DictOfCountries = {
  'Switzerland':0
};
var CLIENT = 'Switzerland';
// Define where the computed values will be saved 
var assetID = 'users/shared/CrowtherLab/Countries/' + CLIENT + '/';
// Setup a list of the countries numbers 
var ListOfAOIs = ee.List.sequence(0,ee.Dictionary(DictOfCountries).keys().length().subtract(1));
//print(ListOfAOIs);
// Filter the LSIB dataset to retrieve the countrys' feature then retrieve its geometry
var AOItable = ee.FeatureCollection(ListOfAOIs.map(function(i){
  return ee.Feature(lsib.filter(ee.Filter.inList("country_na", [ee.Dictionary(DictOfCountries).keys().get(i)])));
})).flatten();
// Give the AOI Features an ID
var AOItable = AOItable.map(function(feature){return feature.set('ID',feature.id())});
//var polygon1 = ee.FeatureCollection(assetID + 'Bocus_de_T_Site_1_Nicaragua').union(10).set('AreaName','Bocus de T Site 1 Nicaragua');
//var polygonOI = ee.FeatureCollection(assetID + 'Polygons');
// !! Concatenate the polygons to a single one 
//var polygonOI = ee.FeatureCollection([ ]);
// !! List of values for unit conversion for the aggregated values
// Change units here: e.g. change to 
// -> "CrowtherLab_PresentBiomass_Old","ha",1
// -> "PixelArea","kha",1000
// -> "PixelArea","Mha",1000000
var listForUnitConversion = [
  ["Area","Mha",10000000000],
  ["HansenEtAl_ForestCover","ha",10000000000],
  ["CrowtherLab_PotentialTreeCover","Mha",10000000000],
  ["CrowtherLab_AddableTreeCover","Mha",10000000000],
  ["CrowtherLab_RestorableTreeCover","Mha",10000000000],
  ["CrowtherLab_PresentBiomass_Old","Mt C",100000000],
  ["CrowtherLab_PotentialBiomass","Mt C",100000000],
  ["CrowtherLab_RestorableBiomass","Mt C",100000000],
  ["MODIS_NPP_2010-2014","Mt C / year",100000000],
  ["SG_SOC_Stock_000cm_to_200cm","Mt C",100000000],
  ["XuEtAl_SoilMicrobialBiomass","Mt C",100000000]
];
// !! Change zoom level if wanted
var zoomlevel = 8; 
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
var LandCoverPalette = ["282828","FFBB22","FFFF4C","F096FF","FA0000","B4B4B4","F0F0F0","0032C8","0096A0","FAE6A0","58481F","009900","70663E","00CC00","4E751F","007800","666000","8DB400","8D7400","A0DC00","929900","648C00","000080"];
// Make a list of layers to include, their name & unit, their palette and the provided information
var listOfLayers = [
  ['Copernicus_LandCoverClass','Land Cover in 2015',LandCoverPalette,'This layer shows the Copernicus Land Cover classes. Find the legend here: https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_Landcover_100m_Proba-V_Global'],
  ['HansenEtAl_ForestCover','Tree Cover in 2000 (%)',Greens,'This layer shows how much of the pixel area was covered by tree canopy in the year 2000. Source here: http://data.globalforestwatch.org/datasets/14228e6347c44f5691572169e9e107ad'],
  ['CrowtherLab_PotentialTreeCover','Tree Cover Potential (%)',Greens,'This layer shows how much of the pixel area could be covered by tree canopy. Source here: https://science.sciencemag.org/content/365/6448/76'],
  ['CrowtherLab_AddableTreeCover','Addable Tree Cover (%)',Greens,'This layer shows how much of the pixel area could be additionally covered by tree cover. This includes land that has conflicting land uses in reality, such as agriculture. Source here: https://science.sciencemag.org/content/365/6448/76'],
  ['CrowtherLab_RestorableTreeCover','Restoration Potential (%)',Greens,'This layer shows how much of the pixel area could be restored by tree cover outside of urban and agricultural land. Source here: https://science.sciencemag.org/content/365/6448/76'],
  ['SpawnEtAl_AbovegroundBiomass2010_Mean','Current Living Biomass Density (aboveground) (t/ha)',Viridis,'This layer shows the aboveground living biomass carbon stock density. Source here: https://daac.ornl.gov/VEGETATION/guides/Global_Maps_C_Density_2010.html'],
  ['SpawnEtAl_BelowgroundBiomass2010_Mean','Current Living Biomass Density (belowground) (t/ha)',Viridis,'This layer shows the belowground living biomass carbon stock density. Source here: https://daac.ornl.gov/VEGETATION/guides/Global_Maps_C_Density_2010.html'],
  ['CrowtherLab_PresentBiomass_Old','Current Biomass Density (aboveground) (t/ha)',Viridis,'This layer shows the current biomass density aboveground. Unpublished Crowther Lab data (not yet peer-reviewed).'],
  ['CrowtherLab_PotentialBiomass','Potential Biomass Density (aboveground) (t/ha)',Viridis,'This layer shows the potential biomass density aboveground, if the area was effectively managed. Unpublished Crowther Lab data (not yet peer-reviewed).'],
  ['CrowtherLab_RestorableBiomass','Restorable Biomass Density (aboveground) (t/ha)',Viridis,'This layer shows the restorable biomass density aboveground, if the area was effectively managed and tree cover maximized. Unpublished Crowther Lab data (not yet peer-reviewed).'],
  ['CrowtherLab_TreeDensity','Tree Density (# of stems/pixel)',Greens,'This layer shows the number of trees / stems in each pixel. Source here: https://www.nature.com/articles/nature14967'],
  ['MODIS_NPP_2010-2014','Net Plant Productivity (t Carbon/ha/year)',Greens,'This layer shows the amount of carbon that plants absorb and allocate to leaves, roots, stalks or trunks every year. Source here: https://www.ntsg.umt.edu/project/modis/mod17.php'],
  ['MODIS_NDVI_2015-2019','Normalized Difference Vegetation Index (-)',Greens,'This layer shows the amount of live green vegetation. Source here: https://modis.gsfc.nasa.gov/data/dataprod/mod13.php'],
  ['CHELSA_Annual_Precipitation','Annual Precipitation (mm)',Blues,'This layer shows annual rainfall. Source here: http://chelsa-climate.org/'],
  ['CHELSA_Precipitation_Seasonality','Precipitation Seasonality (mm)',BlueRed,'This layer shows how variable rainfall is. A higher value indicates more variability. Source here: http://chelsa-climate.org/'],
  ['CHELSA_Temperature_Seasonality','Temperature Seasonality (°C)',Reds,'This layer shows how variable temperature is. A higher value indicates more variability. Source here: http://chelsa-climate.org/'],
  ['Elevation','Elevation (m)',Reds,'This layer shows the elevation of the area. Source here: http://hydro.iis.u-tokyo.ac.jp/~yamadai/MERIT_DEM/'],
  ['XuEtAl_SoilMicrobialBiomass','Soil Microbial Biomass (t/ha)',Reds,'This layer shows the amount of microbial biomass that lives in the soil. The higher this value, the healthier the soil is. Source here: https://www.researchgate.net/profile/Xiaofeng_Xu5/publication/235341099_A_global_analysis_of_soil_microbial_biomass_carbon_nitrogen_and_phosphorus_in_terrestrial_ecosystems/links/5a569936aca272bb6963f20b/A-global-analysis-of-soil-microbial-biomass-carbon-nitrogen-and-phosphorus-in-terrestrial-ecosystems.pdf'],
  ['CrowtherLab_NematodesTotalNumberPer100gSoil','Number of Nematodes per 100g Soil',SpectralReversed,'This layer shows the number of Nematodes in 100g soil. Nematodes are an important contributor to soil health. Source here: https://www.nature.com/articles/s41586-019-1418-6'],
  ['SG_Bulk_density_030cm','Bulk Density at 30cm depth (kg/m3)',Magma,'This layer shows the dry weight of soil per unit volume of soil. The higher the bulk density, the lower the porosity of the soil. Source here: https://soilgrids.org/'],
  ['SG_CEC_030cm','Cation-Exchange Capacity at 30cm depth (cmolc/kg)',Magma,'This layer is an indicator for soil fertility. The higher the CEC, the higher the soil fertility. Source here: https://soilgrids.org/'],
  ['SG_Clay_Content_030cm','Clay Content at 30cm depth (mass fraction in %)',Magma,'This layer shows how much of the soil particles are smaller than 2 microns. Soils with high amount of clay tend to be more fertile but too much clay leads to poor infiltration. Source here: https://soilgrids.org/'],
  ['SG_Silt_Content_030cm','Silt Content at 30cm depth (mass fraction in %)',Magma,'This layer shows how much of the soil particles are between 2 and 50 microns. Soils with high amount of silt tend to be store more water available for plants. Source here: https://soilgrids.org/'],
  ['SG_Sand_Content_030cm','Sand Content at 30cm depth (mass fraction in %)',Magma,'This layer shows how much of the soil particles are between 50 microns and 2mm. Soils with high amount of sand tend to infiltrate water quickly. Source here: https://soilgrids.org/'],
  ['SG_Coarse_fragments_030cm','Coarse Fragments (%)',Magma,'This layer shows how much of the soil particles are bigger than 2mm. These soils contain either heigh amounts of gravel or large organic debris. Source here: https://soilgrids.org/'],
  ['SG_Depth_to_bedrock','Depth to bedrock up to 2m (cm)',Magma,'This layer shows the depth to bedrock. The higher this depth, the more water can be stored in the soil per area. Source here: https://soilgrids.org/'],
  ['SG_H2O_Capacity_030cm','Available Soil Water Capacity at 30cm depth (%)',Blues,'This layer shows the plant available water. The higher this number, the more water is available to plants. Source here: https://soilgrids.org/'],
  ['SG_Saturated_H2O_Content_030cm','Saturated Water Content at 30cm depth (%)',Blues,'This layer shows the maximum amount of water that the soil can store. Source here: https://soilgrids.org/'],
  ['SG_SOC_Content_030cm','Soil Organic Carbon Content at 30cm depth (g/kg)',Reds,'This layer shows how much organic carbon is stored within the soil at 30cm depth. Source here: https://soilgrids.org/'],
  ['SG_SOC_Density_030cm','Soil Organic Carbon Density at 30cm depth (kg/m3)',Reds,'This layer shows how densely the organic carbon is distributed throughout the soil at 30cm depth. Source here: https://soilgrids.org/'],
  ['SG_SOC_Stock_030cm_to_060cm','Soil Organic Carbon Stock at 30-60cm depth (t/ha)',Reds,'This layer shows how much organic carbon is stored per hectare in the soil at 30-60cm depth. Source here: https://soilgrids.org/'],
  ['SG_Soil_pH_KCl_030cm','Soil pH in KCl at 30cm depth (ph x 10)',Zissou,'This layer shows the pH value of the soil at 30cm depth. Source here: https://soilgrids.org/'],
  ['CrowtherLab_Soil_N_Density_015_to_030_cm','Total Soil Nitrogen Density at 15-30cm depth (g/kg)',Blues,'This layer shows how much total Nitrogen is stored within the soil at 15-30cm depth. Unpublished Crowther Lab data (not yet peer-reviewed).'],
  ['CrowtherLab_Soil_CNratio_015_to_030_cm','Organic Carbon to Total Nitrogen Ration (C,N) at 15-30cm depth (-)',BlueRed,'This layer shows the Carbon to Total Nitrogen Ratio (C,N) at 15-30cm depth. This layer can be used as an indicator for nitrogen limitation of plants. Unpublished Crowther Lab data (not yet peer-reviewed).'],
];
// Get the layer names that should be shown
var layersToShow = listOfLayers.map(function(element){
  return ee.List(element).get(0);
});
// --- Set up the layers --- // 
// Input the composite using a self-defined function
var getCompositeFunction = require('users/shared/toolbox:loadComposite.js');
var composite = getCompositeFunction.loadRestorComposite();
// Calculate total belowground Carbon stocks 
var SG_SOC_Stock_000cm_to_200cm = composite.select('SG_SOC_Stock_000cm_to_005cm')
                                .add(composite.select('SG_SOC_Stock_005cm_to_015cm'))
                                .add(composite.select('SG_SOC_Stock_015cm_to_030cm'))
                                .add(composite.select('SG_SOC_Stock_030cm_to_060cm'))
                                .add(composite.select('SG_SOC_Stock_060cm_to_100cm'))
                                .add(composite.select('SG_SOC_Stock_100cm_to_200cm'))
                                .rename('SG_SOC_Stock_000cm_to_200cm');
// Concatenate the belowground Carbon stocks with the composite
var composite = composite.addBands([SG_SOC_Stock_000cm_to_200cm]); 
// print(composite.bandNames(),'All Layers');
// --- Set up translating dictionary --- // 
// Set up the Dictionary to translate Land Cover values to class names 
var copernicusLandCoverDict = ee.Dictionary({
  '0' :   "Unknown Land Cover",
  '20':   "Shrubs",
  '30':   "Herbaceous vegetation",
  '40':   "Cultivated and managed vegetation / agriculture",
  '50':   "Urban / built up",
  '60':   "Bare / sparse vegetation",
  '70':   "Snow and ice",
  '80':   "Permanent water bodies",
  '90':   "Herbaceous wetland",
  '100':  "Moss and lichen",
  '111':  "Closed forest, evergreen needleleaf",
  '112':  "Closed forest, evergreen broadleaf",
  '113':  "Closed forest, deciduous needleleaf",
  '114':  "Closed forest, deciduous broadleaf",
  '115':  "Closed forest, mixed",
  '116':  "Closed forest, not matching any of the other definitions",
  '121':  "Open forest, evergreen needleleaf",
  '122':  "Open forest, evergreen broad leaf",
  '123':  "Open forest, deciduous needle leaf",
  '124':  "Open forest, deciduous broad leaf",
  '125':  "Open forest, mixed",
  '126':  "Open forest, not matching any of the other definitions",
  '200':  "Oceans, seas. Can be either fresh or salt-water bodies"
});
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
/*
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
*/
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
    var imageMultiplied = ImageOI.multiply(compositeToUse.select('Area'));
    // Apply reducer to get the sum in each geometry 
    var value = imageMultiplied.reduceRegion(Reducer);
    return value;});
  // Compute the area of each feature and add it to the values
  var computeValues = computeValues.cat([{'Area':Geometry.area().divide(listForUnitConversion[0][2])}]);
  return computeValues;
});
// print(Values, 'Computed Values');
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
  var DictionaryWithValues = ee.Dictionary.fromLists(bandNames,ListOfValues)
                              .combine({'Area':ee.Feature(feature).area().divide(listForUnitConversion[0][2]).multiply(100).round().divide(100)});
  // Set the values as properties 
  return ee.Feature(feature).set(DictionaryWithValues);
});
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
  var dictOfMinMaxValues = layer.reduceRegion({reducer:ee.Reducer.percentile([0,100]),scale:1000});
  return ee.Feature(ee.Geometry.Point([0, 0]))
    .set('LayerName',nameOfLayer)
    .set('Min',dictOfMinMaxValues.get(ee.String(nameOfLayer).cat('_p0')))
    .set('Max',dictOfMinMaxValues.get(ee.String(nameOfLayer).cat('_p100')));
}));
print(FinalFC,'Final FeatureCollection');
// print(minMaxValuesOfLayers,'Final Min&Max Values');
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
var layersToManipulate = ['CurrentTreeCover','ForestPotential','RestorationPotential','Copernicus_LandCoverClass'];
var listOfIndicesToManipulate = ee.List.sequence(0,ee.List(layersToManipulate).length().subtract(1));
var idxOfLayersToManipulate = listOfIndicesToManipulate.map(function(i){
  return listOfLayerNames.indexOf(ee.List(layersToManipulate).get(i));
});
var listOfMaxValues = listOfMaxValues.set(idxOfLayersToManipulate.get(0),100).set(idxOfLayersToManipulate.get(1),100).set(idxOfLayersToManipulate.get(2),100).set(idxOfLayersToManipulate.get(3),200);
var listOfMinValues = listOfMinValues.set(idxOfLayersToManipulate.get(0),0).set(idxOfLayersToManipulate.get(1),0).set(idxOfLayersToManipulate.get(2),0).set(idxOfLayersToManipulate.get(3),0);
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
print('!! Click on JSON of the lists below and copy/paste them into the Script!');
print(listOfLayerNames);
print(listOfMaxValues);
print(listOfMinValues);
print(matchingIndices);
// !! Paste the lists in here
var listOfLayerNames = [
  "HansenEtAl_ForestCover",
  "CrowtherLab_AddableTreeCover",
  "CrowtherLab_RestorableTreeCover",
  "CrowtherLab_PresentBiomass_Old",
  "SG_Clay_Content_030cm",
  "SG_Coarse_fragments_030cm",
  "SG_CEC_030cm",
  "SG_H2O_Capacity_030cm",
  "SG_SOC_Stock_030cm_to_060cm",
  "SG_Silt_Content_030cm",
  "CHELSA_Annual_Precipitation",
  "SG_Soil_pH_KCl_030cm",
  "SG_Depth_to_bedrock",
  "SG_SOC_Density_030cm",
  "CrowtherLab_PotentialBiomass",
  "CrowtherLab_RestorableBiomass",
  "CrowtherLab_NematodesTotalNumberPer100gSoil",
  "CrowtherLab_Soil_N_Density_015_to_030_cm",
  "CHELSA_Temperature_Seasonality",
  "XuEtAl_SoilMicrobialBiomass",
  "SpawnEtAl_BelowgroundBiomass2010_Mean",
  "SpawnEtAl_AbovegroundBiomass2010_Mean",
  "SG_Saturated_H2O_Content_030cm",
  "CrowtherLab_Soil_CNratio_015_to_030_cm",
  "CrowtherLab_PotentialTreeCover",
  "CrowtherLab_TreeDensity",
  "Elevation",
  "SG_SOC_Content_030cm",
  "MODIS_NDVI_2015-2019",
  "CHELSA_Precipitation_Seasonality",
  "MODIS_NPP_2010-2014",
  "SG_Bulk_density_030cm",
  "Copernicus_LandCoverClass",
  "SG_Sand_Content_030cm"
];
var listOfMaxValues = [
  100.00000000000001,
  44,
  44,
  445.9418029785156,
  21.999999999999996,
  39,
  54,
  30.000000000000007,
  237,
  42,
  2587,
  53,
  200,
  1054,
  426.70819091796875,
  407.6723327636719,
  9083.25390625,
  4.7606329917907715,
  107.25210571289062,
  3.2173233032226562,
  39.29999923706055,
  166.1999969482422,
  59.99999999999999,
  45.10956192016602,
  94.99999999999996,
  72664.94531249996,
  965.9371337890625,
  138,
  0.8400078415870668,
  54.00564193725586,
  0.7482399940490723,
  1428,
  200,
  100
];
var listOfMinValues = [
  0,
  0,
  0,
  0,
  7,
  9,
  14,
  18,
  23,
  28,
  485,
  41,
  63,
  82,
  111.59478759765625,
  0.40386295318603516,
  2970.11572265625,
  0.6834102869033813,
  33.3227424621582,
  0.7625988721847534,
  5.199999809265137,
  7.199999809265137,
  41.00000000000001,
  21.940752029418952,
  57.15000152587892,
  25663.365234375015,
  7.352180170500936,
  6.999999999999998,
  0.45759215950965876,
  9.177221298217772,
  0.35446000099182123,
  829.9999999999999,
  0,
  0
];
var matchingIndices = [
   32,
  0,
  24,
  1,
  2,
  21,
  20,
  3,
  14,
  15,
  25,
  30,
  28,
  10,
  29,
  18,
  26,
  19,
  16,
  31,
  6,
  4,
  9,
  33,
  5,
  12,
  7,
  22,
  27,
  13,
  8,
  11,
  17,
  23
];
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~ MAP ALL LAYERS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Make the cursor a crosshair
Map.style().set('cursor', 'crosshair');
Map.setCenter(0, 0, 2);
Map.addLayer(AOItable,{}, 'Areas of Interest');
Map.addLayer(composite.select(listOfLayers[0][0]), {min: listOfMinValues[matchingIndices[0]], max: listOfMaxValues[matchingIndices[0]], palette: listOfLayers[0][2]}, listOfLayers[0][1]);
Map.addLayer(composite.select(listOfLayers[1][0]), {min: listOfMinValues[matchingIndices[1]], max: listOfMaxValues[matchingIndices[1]], palette: listOfLayers[1][2]}, listOfLayers[1][1]);
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
Map.addLayer(composite.select(listOfLayers[31][0]), {min: listOfMinValues[matchingIndices[31]], max: listOfMaxValues[matchingIndices[31]], palette: listOfLayers[31][2]}, listOfLayers[31][1], false);
Map.addLayer(composite.select(listOfLayers[32][0]), {min: listOfMinValues[matchingIndices[32]], max: listOfMaxValues[matchingIndices[32]], palette: listOfLayers[32][2]}, listOfLayers[32][1], false);
// Map.addLayer(composite.select(listOfLayers[33][0]), {min: listOfMinValues[matchingIndices[33]], max: listOfMaxValues[matchingIndices[33]], palette: listOfLayers[33][2]}, listOfLayers[33][1], false);
//Map.addLayer(FinalFC.style({color: 'black', fillColor: '00000000'}),{},'Polygon borders');
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
  var computedValue = ee.Algorithms.If(ee.List([Bandname]).equals([listOfLayers[0][0]]),
  ee.String(copernicusLandCoverDict.get(ee.String(computedValue))),
  ee.Number(computedValue).divide(100).round().multiply(100));
  print(computedValue)
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
  value: 'Value: ' + ee.List(ee.List(ee.Dictionary(dict).values()).get(0)).get(0).getInfo(), style: {margin: '0 0 4px 10px'}}));
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
  items: Object.keys(DictOfCountries),
  placeholder: 'Select location...',
  onChange: function(polygon) {
    // Selected polygon
    var polygonGeo = AOItable.filter(ee.Filter.inList("country_na", [polygon])).geometry();
    // Fly to the polygon
    Map.centerObject(polygonGeo, zoomlevel);
    // Get the Dictionary of the polygons' values 
    var polygonValues = ee.Feature(FinalFC.filter(ee.Filter.inList("country_na", [polygon])).toList(100).get(0)).toDictionary().getInfo();
    panel.widgets().set(3,ui.Label('Area (' + ee.String(listForUnitConversion[0][1]).getInfo() + ')'));
    panel1.widgets().set(3,ui.Label({value: polygonValues[listForUnitConversion[0][0]]})); //XXX
    panel.widgets().set(4,ui.Label('Tree Cover in 2000 (' + ee.String(listForUnitConversion[1][1]).getInfo() + ')'));
    panel1.widgets().set(4,ui.Label({value: polygonValues[listForUnitConversion[1][0]]}));
    panel.widgets().set(5,ui.Label({value:'Tree Cover Potential (' + ee.String(listForUnitConversion[2][1]).getInfo() + ')', style: {margin: '5px 0 12px 30px'}}));
    panel1.widgets().set(5,ui.Label({value: polygonValues[listForUnitConversion[2][0]]}));
    //panel.widgets().set(6,ui.Label({value:'... in Agricultural Areas (' + ee.String(listForUnitConversion[3][1]).getInfo() + ')', style: {margin: '5px 0 12px 30px'}}));
    //panel1.widgets().set(6,ui.Label({value: ee.Feature(polygonValues).get('ForestPotentialInAgriculturalAreas').getInfo()  }));
    panel.widgets().set(6,ui.Label({value:'Restoration Potential (' + ee.String(listForUnitConversion[4][1]).getInfo() + ')', style: {margin: '5px 0 12px 30px'}}));
    panel1.widgets().set(6,ui.Label({value: polygonValues[listForUnitConversion[4][0]]}));
    panel.widgets().set(7,ui.Label('Current Biomass aboveground (' + ee.String(listForUnitConversion[5][1]).getInfo() + ')'));
    panel1.widgets().set(7,ui.Label({value: polygonValues[listForUnitConversion[5][0]]}));
    panel.widgets().set(8,ui.Label({value:'Potential Biomass aboveground (' + ee.String(listForUnitConversion[6][1]).getInfo() + ')', style: {margin: '5px 0 12px 30px'}}));
    panel1.widgets().set(8,ui.Label({value: polygonValues[listForUnitConversion[6][0]]}));
    panel.widgets().set(9,ui.Label({value:'Restorable Biomass aboveground (' + ee.String(listForUnitConversion[7][1]).getInfo() + ')', style: {margin: '5px 0 12px 30px'}}));
    panel1.widgets().set(9,ui.Label({value: polygonValues[listForUnitConversion[7][0]]}));
    panel.widgets().set(10,ui.Label('Net Primary Productivity (' + ee.String(listForUnitConversion[8][1]).getInfo() + ')'));
    panel1.widgets().set(10,ui.Label({value: polygonValues[listForUnitConversion[8][0]]}));
    panel.widgets().set(11,ui.Label('Soil Organic Carbon (' + ee.String(listForUnitConversion[9][1]).getInfo() + ')'));
    panel1.widgets().set(11,ui.Label({value: polygonValues[listForUnitConversion[9][0]]}));
    panel.widgets().set(12,ui.Label({value:'Soil Microbial Biomass (' + ee.String(listForUnitConversion[10][1]).getInfo() + ')', style: {margin: '5px 0 12px 30px'}}));
    panel1.widgets().set(12,ui.Label({value: polygonValues[listForUnitConversion[10][0]]}));
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