// !! Enter the countries of interest and add a number
var DictOfCountries = {
  'India':0,
  'Ethiopia':1,
  'Kenya':2
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~ SETUP OWN COMPOSITE 
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Input a table holding the countries of interest
var lsib = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
// Input Composite 
var CompositeCL = ee.Image("users/shared/Composite/20190218_30ArcSec_Composite");
//print(CompositeCL.bandNames())
// Input image holding pixel areas 
var imageWithArea = ee.Image("users/shared/Layers/CompositePixelArea");
// Input Forest Cover 
var ForestCover = ee.Image("UMD/hansen/global_forest_change_2018_v1_6");
var ForestCover30arc = ForestCover.select("treecover2000").reproject('EPSG:4326', [0.008333333333333333,0,-180,0,-0.008333333333333333,88]);
// Input Biomass Maps (in t per pixel -> normalize by areas)
var GlobBiomass = ee.Image("users/crowtherlab/GlobBiomass_AboveGroundBiomass");
var PresentBiomassDensity = ee.Image("users/shared/Layers/PresentForestBiomass").divide(1000).select(["b1"],["PresentBiomass"]);
var PresentBiomass = PresentBiomassDensity.multiply(ForestCover30arc).divide(100);
var PotentialBiomass = ee.Image("users/shared/Layers/PotentialForestBiomass").divide(imageWithArea).select(["b1"],["PotentialBiomass"]);
var RestorationBiomass = PotentialBiomass.subtract(PresentBiomass).select(["PotentialBiomass"],["RestorationBiomass"]);
// Input Restoration Potential 
var ForestPotential = ee.Image("users/crowtherlab/forest_potential").divide(100).select(["classification"],["ForestPotential"]);
var RestorationAreas = ee.Image("users/crowtherlab/restoration_potential_masked").divide(100).select(["b1"],["RestorationPotential"]);
// Forest Potential in Agricultural Areas
var GlobCover = ee.Image("ESA/GLOBCOVER_L4_200901_200912_V2_3").select("landcover");
var GlobCoverAgriculturalAreas = GlobCover.eq(11).add(GlobCover.eq(14)).add(GlobCover.eq(20)).add(GlobCover.eq(30));
var ForestPotentialInAgriculturalAreas = ForestPotential.mask(GlobCoverAgriculturalAreas).rename("ForestPotentialInAgriculturalAreas");
// Net Primary Productivity
var NPP = ee.Image("users/crowtherlab/Npp"); // in kg/ha
// Soil Carbon 
var OrgCStockTHa_5to15cm = CompositeCL.select("OrgCStockTHa_5to15cm"); // in t/ha
// Soil Diversity
var Depth_to_Bedrock = CompositeCL.select("Depth_to_Bedrock").divide(100); //in m
var Bulk_Density_15cm = CompositeCL.select("Bulk_Density_15cm"); // in kg/m3
var SoilMass = Bulk_Density_15cm.multiply(Depth_to_Bedrock).multiply(10); // kg/m3 * m -> kg/m2 -> *10 -> t/ha
var SoilMicrobialBiomass = ee.Image("users/crowtherlab/soil_microbial_carbon").multiply(10).divide(1000).select(["classification"],["SoilMicrobialCarbon"]); //in gC/m2 -> t/ha
var Bacteria = ee.Image("users/crowtherlab/bacterial_biomass").multiply(1000).multiply(SoilMass).divide(1000000).multiply(10).divide(1000); //in kg PLFA / ha
var Fungi = ee.Image("users/crowtherlab/fungal_biomass").multiply(1000).multiply(SoilMass).divide(1000000).multiply(10).divide(1000); //in kg PLFA / ha
var Nematodes = ee.Image("users/devinrouth/Nematodes_TotalNumber_per100gSoil").multiply(10).multiply(SoilMass).multiply(10000).divide(1000000000).select(["classification"],["Nematodes"]); //Billion Nematodes/ha
// Combine to own Composite 
var Composite = ee.ImageCollection([ 
  ee.Image(1),
  ForestCover.select('treecover2000'),
  ForestPotential,
  ForestPotentialInAgriculturalAreas,
  RestorationAreas,
  GlobBiomass,
  PresentBiomass,
  PotentialBiomass,
  RestorationBiomass,
  NPP,
  SoilMicrobialBiomass,
  Bacteria,
  Fungi,
  Nematodes,
  OrgCStockTHa_5to15cm
  ]);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~ SETUP A FEATURE COLLECTION OF THE COUNTRIES' GEOMETRIES
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Setup a list of the countries numbers 
var ListOfAOIs = ee.List.sequence(0,ee.Dictionary(DictOfCountries).keys().length().subtract(1));
// Filter the LSIB dataset to retrieve the countrys' feature then retrieve its geometry
var AOItable = ee.FeatureCollection(ListOfAOIs.map(function(i){
  return ee.Feature(lsib.filter(ee.Filter.inList("country_na", [ee.Dictionary(DictOfCountries).keys().get(i)])));
})).flatten();
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
// List of values for unit conversion
/*var ListOfUnitConversion = ee.List([
  0.01,     // Area (ha)
  1,        // Tree Cover in 2000 (ha)
  0.01,     // Tree Cover Potential (ha)
  0.01,    // Tree Cover Potential in Agricultural Areas (ha)
  0.01,     // Restoration Potential (ha)
  10,       // Current Biomass aboveground ESA (kt C)
  10,       // Current Biomass aboveground (kt C)
  10,       // Potential Biomass aboveground (kt C)
  10,       // Restorable Biomass aboveground (kt C)
  10000,    // Net Primary Productivity (kt C / year)
  10,       // Soil Microbial Biomass (kt C)
  10,       // Bacterial Biomass (t PLFA)
  10,       // Fungal Biomass (t PLFA)
  10000,    // Nematodes (Quadrillion Nematodes)
  10        // Soil Organic Carbon (kt C)
  ]);*/
/*var ListOfUnitConversion = ee.List([
  1000,     // Area (kha)
  1000,     // Tree Cover in 2000 (kha)
  10,       // Tree Cover Potential (kha)
  10,       // Tree Cover Potential in Agricultural Areas (kha)
  10,       // Restoration Potential (kha)
  10000,    // Current Biomass aboveground ESA (Mt C)
  10000,    // Current Biomass aboveground (Mt C)
  10000,    // Potential Biomass aboveground (Mt C)
  10000,    // Restorable Biomass aboveground (Mt C)
  10000000, // Net Primary Productivity (Mt C / year)
  10000,    // Soil Microbial Biomass (Mt C)
  10000,    // Bacterial Biomass (kt PLFA)
  10000,    // Fungal Biomass (kt PLFA)
  10000000, // Nematodes (Quintillion Nematodes)
  10000     // Soil Organic Carbon (Mt C)
  ]);*/
var ListOfUnitConversion = ee.List([
  10000,     // Area (Mha)
  1000000,     // Tree Cover in 2000 (Mha)
  10000,       // Tree Cover Potential (Mha)
  10000,       // Tree Cover Potential in Agricultural Areas (Mha)
  10000,       // Restoration Potential (Mha)
  10000000,    // Current Biomass aboveground ESA (Gt C)
  10000000,    // Current Biomass aboveground (Gt C)
  10000000,    // Potential Biomass aboveground (Gt C)
  10000000,    // Restorable Biomass aboveground (Gt C)
  10000000, // Net Primary Productivity (Mt C / year)
  10000,    // Soil Microbial Biomass (Mt C)
  10000,    // Bacterial Biomass (kt PLFA)
  10000,    // Fungal Biomass (kt PLFA)
  10000000,    // Nematodes (Quintillion Nematodes)
  10000000     // Soil Organic Carbon (Gt C)
  ]);
// Create list to map over the AOIs
var ListOfImages = ee.List.sequence(0,Composite.toList(100).length().subtract(1),1);
// Get band names
var CompositeAsImage = Composite.toList(100);
var BandNames = ListOfImages.map(function(image){
  var BN = ee.Image(CompositeAsImage.get(image)).bandNames().get(0);
  return BN;
});
print(BandNames, 'Band Names');
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~ GET VALUES
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
print(AOItable, 'Areas of Interest');
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
    var imageMultiplied = ImageOI.multiply(imageWithArea);
    // Apply reducer to get the sum in each geometry 
    var value = imageMultiplied.reduceRegion(Reducer);
    return value;
    });
  return computeValues;
  });
print(Values, 'Computed Values');
// Copy the computed values into the AOItable as properties 
var FinalFC = AOItable.map(function(feature){
  // List that holds the values
  var ListWithValues = ee.List(Values.get(ee.Feature(feature).getNumber("index")));
    // Get the list of the values
    var ListOfValues = ListOfImages.map(function(n){
      // Divisor for conversion 
      var divisor = ee.Number(ListOfUnitConversion.get(n));
      return ee.Dictionary(ListWithValues.get(n)).getNumber(BandNames.get(n)).divide(divisor).round().divide(100);
    });
  // Create a Dictionary out of bandNames and values 
  var DictionaryWithValues = ee.Dictionary.fromLists(BandNames,ListOfValues);
  // Set the values as properties 
  return ee.Feature(feature).set(DictionaryWithValues);
});
print(FinalFC,'Final FeatureCollection');
// Export the final FeatureCollection holding the values 
Export.table.toAsset({
  collection: FinalFC,
  description: 'Export_FinalFC',
  assetId: 'ExportedValues_EthopiaIndiaKenya'
});
// Input the exported and calculated values
var FinalFC = ee.FeatureCollection('users/shared/ExportedValues_EthopiaIndiaKenya');
print(FinalFC);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~ SETUP PANEL
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Create legend titles
var legendTitle = ui.Label({
value: 'Aggregate values',
style: {
fontWeight: 'bold',
fontSize: '18px',
margin: '8px 0px 4px 8px',
padding: '0'
}
});
var legendTitle_empty2 = ui.Label({
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
// Set up two panel holding the values from both areas 
var panel = ui.Panel({style: {width: '300px'}});
var panel1 = ui.Panel({style: {width: '100px'}});
ui.root.add(panel);
ui.root.add(panel1);
// Creates a Select panel
var SelectCountry = ui.Select({
  items: Object.keys(DictOfCountries),
  placeholder: 'Select location...',
  onChange: function(country) {
    // Selected country
    var exampleGeometry = lsib.filter(ee.Filter.inList("country_na", [country])).geometry();
    // Fly to the country
    Map.centerObject(exampleGeometry, 4);
    // Get the List of the countrie's values 
    var CountryValues = FinalFC.filter(ee.Filter.inList("country_na", [country])).toList(100).get(0);
    panel.widgets().set(2,ui.Label('Country Area (Mha)'));
    panel1.widgets().set(2,ui.Label({value: ee.Feature(CountryValues).getNumber('constant').getInfo()  }));
    panel.widgets().set(3,ui.Label('Tree Cover in 2000 (Mha)'));
    panel1.widgets().set(3,ui.Label({value: ee.Feature(CountryValues).get('treecover2000').getInfo()  }));
    panel.widgets().set(4,ui.Label({value:'Tree Cover Potential (Mha)', style: {margin: '5px 0 12px 30px'}}));
    panel1.widgets().set(4,ui.Label({value: ee.Feature(CountryValues).get('ForestPotential').getInfo()  }));
    panel.widgets().set(5,ui.Label({value:'... in Agricultural Areas (Mha)', style: {margin: '5px 0 12px 30px'}}));
    panel1.widgets().set(5,ui.Label({value: ee.Feature(CountryValues).get('ForestPotentialInAgriculturalAreas').getInfo()  }));
    panel.widgets().set(6,ui.Label({value:'Restoration Potential (Mha)', style: {margin: '5px 0 12px 30px'}}));
    panel1.widgets().set(6,ui.Label({value: ee.Feature(CountryValues).get('RestorationPotential').getInfo()  }));
    //panel.widgets().set(7,ui.Label('Current Biomass aboveground (Gt C)'));
    //panel1.widgets().set(7,ui.Label({value: ee.Feature(CountryValues).get('PresentBiomass').getInfo()  }));
    //panel.widgets().set(8,ui.Label({value:'Potential Biomass aboveground (Gt C)', style: {margin: '5px 0 12px 30px'}}));
    //panel1.widgets().set(8,ui.Label({value: ee.Feature(CountryValues).get('PotentialBiomass').getInfo()  }));
    //panel.widgets().set(9,ui.Label({value:'Restorable Biomass aboveground (Gt C)', style: {margin: '5px 0 12px 30px'}}));
    //panel1.widgets().set(9,ui.Label({value: ee.Feature(CountryValues).get('RestorationBiomass').getInfo()  }));
    panel.widgets().set(10,ui.Label('Net Primary Productivity (Mt C / year)'));
    panel1.widgets().set(10,ui.Label({value: ee.Feature(CountryValues).get('Npp').getInfo()  }));
    panel.widgets().set(11,ui.Label('Soil Organic Carbon (Gt C)'));
    panel1.widgets().set(11,ui.Label({value: ee.Feature(CountryValues).get('OrgCStockTHa_5to15cm').getInfo()  }));
    panel.widgets().set(12,ui.Label('Soil Microbial Biomass (Mt C)'));
    panel1.widgets().set(12,ui.Label({value: ee.Feature(CountryValues).get('SoilMicrobialCarbon').getInfo()  }));
  }
});
panel.add(legendTitle);
panel1.add(legendTitle_empty2);
panel.add(SelectCountry);
panel1.add(Area2);
// Clip the images to the countries borders
var GeometriesCombined = FinalFC.geometry()
print(GeometriesCombined)
// Map the layers
Map.addLayer(ee.Image(1).clip(GeometriesCombined), {min: 0, max:1, palette: ["000000"]}, 'Black background');
Map.addLayer(ForestCover.select('treecover2000').clip(GeometriesCombined), {min: 0, max:100, palette: ["FFFFE5", "F7FCB9", "D9F0A3", "ADDD8E", "78C679", "41AB5D", "238443", "006837", "004529"]}, 'Tree Cover in 2000 (%)');
Map.addLayer(ForestPotential.clip(GeometriesCombined), {min: 0, max:1, palette: ["FFFFE5", "F7FCB9", "D9F0A3", "ADDD8E", "78C679", "41AB5D", "238443", "006837", "004529"]}, 'Tree Cover Potential (%)', false);
Map.addLayer(ForestPotentialInAgriculturalAreas.clip(GeometriesCombined), {min: 0, max:1, palette: ["FFFFE5", "F7FCB9", "D9F0A3", "ADDD8E", "78C679", "41AB5D", "238443", "006837", "004529"]}, 'Tree Cover Potential in Agricultural Areas (%)', false);
Map.addLayer(RestorationAreas.clip(GeometriesCombined), {min: 0, max:1, palette: ["FFFFE5", "F7FCB9", "D9F0A3", "ADDD8E", "78C679", "41AB5D", "238443", "006837", "004529"]}, 'Restoration Potential (%)', false);
Map.addLayer(GlobBiomass.clip(GeometriesCombined), {min: 0, max:420, palette: ["440154", "472D7B", "3B528B", "2C728E", "21908C", "27AD81", "5DC863", "AADC32", "FDE725"]}, 'Current Biomass aboveground ESA (t / ha)', false);
Map.addLayer(PresentBiomass.clip(GeometriesCombined), {min: 0, max:420, palette: ["440154", "472D7B", "3B528B", "2C728E", "21908C", "27AD81", "5DC863", "AADC32", "FDE725"]}, 'Current Biomass aboveground (t / ha)', false);
Map.addLayer(PotentialBiomass.clip(GeometriesCombined), {min: 0, max:420, palette: ["440154", "472D7B", "3B528B", "2C728E", "21908C", "27AD81", "5DC863", "AADC32", "FDE725"]}, 'Potential Biomass aboveground ESA (t / ha)', false);
Map.addLayer(RestorationBiomass.clip(GeometriesCombined), {min: 0, max:420, palette: ["440154", "472D7B", "3B528B", "2C728E", "21908C", "27AD81", "5DC863", "AADC32", "FDE725"]}, 'Restorable Biomass aboveground ESA (t / ha)', false);
Map.addLayer(NPP.clip(GeometriesCombined), {min: 0, max:15000, palette: ["FFFFE5", "F7FCB9", "D9F0A3", "ADDD8E", "78C679", "41AB5D", "238443", "006837", "004529"]}, 'Net Plant Productivity (t C / ha / year)', false);
Map.addLayer(OrgCStockTHa_5to15cm.clip(GeometriesCombined), {min: 0, max:85, palette: ["FFF5F0", "800000"]}, 'Soil Organic Carbon (t C / ha)', false);
Map.addLayer(SoilMicrobialBiomass.clip(GeometriesCombined), {min: 0, max:2.27, palette: ["000004", "1D1147", "51127C", "822681", "B63679", "E65164", "FB8861", "FEC287", "FCFDBF"]}, 'Soil Microbial Biomass (t / ha)', false);
Map.addLayer(FinalFC.style({color: 'black', fillColor: '00000000'}),{},'Country borders');