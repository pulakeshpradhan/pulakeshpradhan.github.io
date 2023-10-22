// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~ SETUP 
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Input points of interest
var HighRestorationPotential = /* color: #d63000 */ee.Geometry.Point([104.64237191756433, -3.747522837478208]);
var LowRestorationPotential = /* color: #d63000 */ee.Geometry.Point([103.98319223006433, -2.167649167852472]);
// Set buffer around the areas
var BlueArea = HighRestorationPotential.buffer(50000);
var RedArea = LowRestorationPotential.buffer(50000);
// Make a Linear Ring around the areas 
var BlueArea_Ring = ee.Geometry.LinearRing(BlueArea.coordinates().get(0));
var RedArea_Ring = ee.Geometry.LinearRing(RedArea.coordinates().get(0));
// Zoom to points
Map.setCenter(104.4285839821971, -3.0570514813612197, 8);
// Input Composite 
var CompositeCL = ee.Image("users/shared/Composite/20190218_30ArcSec_Composite");
print(CompositeCL.bandNames())
// Input image holding pixel areas 
var imageWithArea = ee.Image("users/shared/Layers/CompositePixelArea");
// Input Forest Cover 
var ForestCover = ee.Image("UMD/hansen/global_forest_change_2018_v1_6");
var ForestCover30arc = ForestCover.select("treecover2000").reproject('EPSG:4326', [0.008333333333333333,0,-180,0,-0.008333333333333333,88]);
// Input Biomass Maps (in t per pixel -> normalize by areas)
var GlobBiomass = ee.Image("users/crowtherlab/RestorPlatform/GlobBiomass_AboveGroundBiomass");
var PresentBiomassDensity = ee.Image("users/shared/Layers/PresentForestBiomass").divide(1000).select(["b1"],["PresentBiomass"]);
var PresentBiomass = PresentBiomassDensity.multiply(ForestCover30arc).divide(100);
var PotentialBiomass = ee.Image("users/shared/Layers/PotentialForestBiomass").divide(imageWithArea).select(["b1"],["PotentialBiomass"]);
var RestorationBiomass = PotentialBiomass.subtract(PresentBiomass).select(["PotentialBiomass"],["RestorationBiomass"]);
// Input Restoration Potential 
var ForestPotential = ee.Image("users/crowtherlab/RestorPlatform/forest_potential").divide(100).select(["classification"],["ForestPotential"]);
var RestorationAreas = ee.Image("users/crowtherlab/RestorPlatform/restoration_potential_masked").divide(100).select(["b1"],["RestorationPotential"]);
// Net Primary Productivity
var NPP = ee.Image("users/crowtherlab/RestorPlatform/Npp"); // in kg/ha
// Soil Carbon 
var OrgCStockTHa_5to15cm = CompositeCL.select("OrgCStockTHa_5to15cm"); // in t/ha
// Soil Diversity
var Depth_to_Bedrock = CompositeCL.select("Depth_to_Bedrock").divide(100); //in m
var Bulk_Density_15cm = CompositeCL.select("Bulk_Density_15cm"); // in kg/m3
var SoilMass = Bulk_Density_15cm.multiply(Depth_to_Bedrock).multiply(10); // kg/m3 * m -> kg/m2 -> *10 -> t/ha
var SoilMicrobialBiomass = ee.Image("users/crowtherlab/RestorPlatform/soil_microbial_carbon").multiply(10).divide(1000).select(["classification"],["SoilMicrobialCarbon"]); //in gC/m2 -> t/ha
var Bacteria = ee.Image("users/crowtherlab/RestorPlatform/bacterial_biomass").multiply(1000).multiply(SoilMass).divide(1000000).multiply(10).divide(1000); //in kg PLFA / ha
var Fungi = ee.Image("users/crowtherlab/RestorPlatform/fungal_biomass").multiply(1000).multiply(SoilMass).divide(1000000).multiply(10).divide(1000); //in kg PLFA / ha
var Nematodes = ee.Image("users/devinrouth/Nematodes_TotalNumber_per100gSoil").multiply(10).multiply(SoilMass).multiply(10000).divide(1000000000).select(["classification"],["Nematodes"]); //Billion Nematodes/ha
// Combine to own Composite 
var Composite = ee.ImageCollection([ 
  ee.Image(1),
  ForestCover.select('treecover2000'),
  ForestCover.select('loss'),
  ForestCover.select('gain'),
  ForestPotential,
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
// ~~~ REDUCER & FUNCTIONS
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Setup a reducer for BlueArea 
var BlueAreaReducer = {
	reducer: ee.Reducer.sum(),
	geometry: BlueArea,
	scale: 927.6624232772797,
	maxPixels: 1e12
};
// Create a function that computes the values 
var computeValuesBlueArea = function(image) {
	var imageMultiplied = image.multiply(imageWithArea);//.multiply(10000)//.divide(10e9); //*10'000 to get per m2; :10e9 to get km2
	var value = imageMultiplied.reduceRegion(BlueAreaReducer);
	return value;
};
// Setup a reducer for RedArea 
var RedAreaReducer = {
	reducer: ee.Reducer.sum(),
	geometry: RedArea,
	scale: 927.6624232772797,
	maxPixels: 1e12
};
// Create a function that computes the values 
var computeValuesRedArea = function(image) {
	var imageMultiplied = image.multiply(imageWithArea);//.multiply(10000)//.divide(10e9); //*10'000 to get per m2; :10e9 to get km2
	var value = imageMultiplied.reduceRegion(RedAreaReducer);
	return value;
};
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~ COMPUTE VALUES
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Define a list of indices to map over it 
var ListOfIndices = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
// Get the values from the BlueArea site 
var BlueAreaValues = ee.List(ListOfIndices.map(function(i){
  var image = ee.Image(Composite.toList(100).get(i));
  var value = computeValuesBlueArea(image);
  return value;
  }));
print(BlueAreaValues, 'BlueAreaValues');
// Get the values from the RedArea site 
var RedAreaValues = ee.List(ListOfIndices.map(function(i){
  var image = ee.Image(Composite.toList(100).get(i));
  var value = computeValuesRedArea(image);
  return value;
  }));
print(RedAreaValues, 'RedAreaValues');
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~ CLIP TO GEOMETRY
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Combine the two circles to one geometry 
var geometry = BlueArea.union(RedArea);
// Clip the layers
var ForestLoss = ForestCover.select("loss").clip(geometry);
var ForestLoss = ForestLoss.mask(ForestLoss);
var ForestGain = ForestCover.select("gain").clip(geometry);
var ForestGain = ForestGain.mask(ForestGain);
var ForestCover = ForestCover.select("treecover2000").clip(geometry);
var ForestPotential = ForestPotential.multiply(100).clip(geometry);
var RestorationAreas = RestorationAreas.multiply(100).clip(geometry);
var GlobBiomass = GlobBiomass.clip(geometry);
var PresentBiomass = PresentBiomass.clip(geometry);
var PotentialBiomass = PotentialBiomass.clip(geometry);
var RestorationBiomass = RestorationBiomass.clip(geometry);
var NPP = NPP.divide(1000).clip(geometry);
var OrgCStockTHa_5to15cm = OrgCStockTHa_5to15cm.clip(geometry);
var SoilMicrobialBiomass = SoilMicrobialBiomass.clip(geometry);
var Bacteria = Bacteria.clip(geometry);
var Fungi = Fungi.clip(geometry);
var Nematodes = Nematodes.divide(10).clip(geometry);
// Map the layers
Map.addLayer(ForestCover, {min: 0, max:100, palette: ["FFFFE5", "F7FCB9", "D9F0A3", "ADDD8E", "78C679", "41AB5D", "238443", "006837", "004529"]}, 'Tree Cover in 2000 (%)');
Map.addLayer(ForestLoss, {min: 0, max:1, palette: ["67000D"]}, 'Forest Loss since 2000', false);
Map.addLayer(ForestGain, {min: 0, max:1, palette: ["08306B"]}, 'Forest Gain since 2000', false);
Map.addLayer(ForestPotential, {min: 0, max:100, palette: ["FFFFE5", "F7FCB9", "D9F0A3", "ADDD8E", "78C679", "41AB5D", "238443", "006837", "004529"]}, 'Tree Cover Potential (%)', false);
Map.addLayer(RestorationAreas, {min: 0, max:100, palette: ["FFFFE5", "F7FCB9", "D9F0A3", "ADDD8E", "78C679", "41AB5D", "238443", "006837", "004529"]}, 'Restoration Potential (%)', false);
Map.addLayer(GlobBiomass, {min: 0, max:420, palette: ["440154", "472D7B", "3B528B", "2C728E", "21908C", "27AD81", "5DC863", "AADC32", "FDE725"]}, 'Current Biomass aboveground ESA (t / ha)', false);
Map.addLayer(PresentBiomass, {min: 0, max:420, palette: ["440154", "472D7B", "3B528B", "2C728E", "21908C", "27AD81", "5DC863", "AADC32", "FDE725"]}, 'Current Biomass aboveground (t / ha)', false);
Map.addLayer(PotentialBiomass, {min: 0, max:420, palette: ["440154", "472D7B", "3B528B", "2C728E", "21908C", "27AD81", "5DC863", "AADC32", "FDE725"]}, 'Potential Biomass aboveground ESA (t / ha)', false);
Map.addLayer(RestorationBiomass, {min: 0, max:420, palette: ["440154", "472D7B", "3B528B", "2C728E", "21908C", "27AD81", "5DC863", "AADC32", "FDE725"]}, 'Restorable Biomass aboveground ESA (t / ha)', false);
Map.addLayer(NPP, {min: 0, max:13, palette: ["FFFFE5", "F7FCB9", "D9F0A3", "ADDD8E", "78C679", "41AB5D", "238443", "006837", "004529"]}, 'Net Plant Productivity (t C / ha / year)', false);
Map.addLayer(OrgCStockTHa_5to15cm, {min: 0, max:156, palette: ["FFF5F0", "800000"]}, 'Soil Organic Carbon (t C / ha)', false);
Map.addLayer(SoilMicrobialBiomass, {min: 0, max:2.27, palette: ["000004", "1D1147", "51127C", "822681", "B63679", "E65164", "FB8861", "FEC287", "FCFDBF"]}, 'Soil Microbial Biomass (t / ha)', false);
Map.addLayer(Bacteria, {min: 0, max:42.5, palette: ["000004", "1D1147", "51127C", "822681", "B63679", "E65164", "FB8861", "FEC287", "FCFDBF"]}, 'Bacterial Biomass (kg PLFA / ha)', false);
Map.addLayer(Fungi, {min: 0, max:42.5, palette: ["000004", "1D1147", "51127C", "822681", "B63679", "E65164", "FB8861", "FEC287", "FCFDBF"]}, 'Fungal Biomass (kg PLFA / ha)', false);
Map.addLayer(Nematodes, {min: 0, max:337, palette: ["000004", "1D1147", "51127C", "822681", "B63679", "E65164", "FB8861", "FEC287", "FCFDBF"]}, 'Nematodes (Billion Nematodes / ha)', false);
Map.addLayer(ee.FeatureCollection(ee.Feature(BlueArea_Ring)).style({color: 'blue', fillColor: '00000000'}),{},'Blue Area');
Map.addLayer(ee.FeatureCollection(ee.Feature(RedArea_Ring)).style({color: 'red', fillColor: '00000000'}),{},'Red Area');
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
var legendTitle_empty3 = ui.Label({
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
value: 'Blue Area',
style: {
fontWeight: 'bold',
fontSize: '12px',
margin: '8px 0px 20px 8px',
padding: '0'
}
});
var Area3 = ui.Label({
value: 'Red Area',
style: {
fontWeight: 'bold',
fontSize: '12px',
margin: '8px 0px 20px 8px',
padding: '0'
}
});
// Set up two panel holding the values from both areas 
var panel = ui.Panel({style: {width: '300px'}});
var panel1 = ui.Panel({style: {width: '100px'}});
var panel2 = ui.Panel({style: {width: '100px'}});
ui.root.add(panel);
ui.root.add(panel1);
ui.root.add(panel2);
panel.add(legendTitle);
panel1.add(legendTitle_empty2);
panel2.add(legendTitle_empty3);
panel.add(Area);
panel1.add(Area2);
panel2.add(Area3);
panel.add(ui.Label('Tree Cover in 2000 (kha)'));
panel1.add(ui.Label({value: ee.Dictionary(BlueAreaValues.get(1)).getNumber('treecover2000').divide(1000).round().divide(100).getInfo()  }));
panel2.add(ui.Label({value: ee.Dictionary(RedAreaValues.get(1)).getNumber('treecover2000').divide(1000).round().divide(100).getInfo()  }));
panel.add(ui.Label({value:'Tree Cover Potential (kha)', style: {margin: '5px 0 12px 30px'}}));
panel1.add(ui.Label({value: ee.Dictionary(BlueAreaValues.get(4)).getNumber('ForestPotential').divide(10).round().divide(100).getInfo()  }));
panel2.add(ui.Label({value: ee.Dictionary(RedAreaValues.get(4)).getNumber('ForestPotential').divide(10).round().divide(100).getInfo()  }));
panel.add(ui.Label({value:'Restoration Potential (kha)', style: {margin: '5px 0 12px 30px'}}));
panel1.add(ui.Label({value: ee.Dictionary(BlueAreaValues.get(5)).getNumber('RestorationPotential').divide(10).round().divide(100).getInfo()  }));
panel2.add(ui.Label({value: ee.Dictionary(RedAreaValues.get(5)).getNumber('RestorationPotential').divide(10).round().divide(100).getInfo()  }));
panel.add(ui.Label('Current Biomass aboveground ESA (Mt C)'));
panel1.add(ui.Label({value: ee.Dictionary(BlueAreaValues.get(6)).getNumber('GlobBiomass_AboveGroundBiomass').divide(10000).round().divide(100).getInfo()  }));
panel2.add(ui.Label({value: ee.Dictionary(RedAreaValues.get(6)).getNumber('GlobBiomass_AboveGroundBiomass').divide(10000).round().divide(100).getInfo()  }));
panel.add(ui.Label('Current Biomass aboveground (Mt C)'));
panel1.add(ui.Label({value: ee.Dictionary(BlueAreaValues.get(7)).getNumber('PresentBiomass').divide(10000).round().divide(100).getInfo()  }));
panel2.add(ui.Label({value: ee.Dictionary(RedAreaValues.get(7)).getNumber('PresentBiomass').divide(10000).round().divide(100).getInfo()  }));
panel.add(ui.Label({value:'Potential Biomass aboveground (Mt C)', style: {margin: '5px 0 12px 30px'}}));
panel1.add(ui.Label({value: ee.Dictionary(BlueAreaValues.get(8)).getNumber('PotentialBiomass').divide(10000).round().divide(100).getInfo()  }));
panel2.add(ui.Label({value: ee.Dictionary(RedAreaValues.get(8)).getNumber('PotentialBiomass').divide(10000).round().divide(100).getInfo()  }));
panel.add(ui.Label({value:'Restorable Biomass aboveground (Mt C)', style: {margin: '5px 0 12px 30px'}}));
panel1.add(ui.Label({value: ee.Dictionary(BlueAreaValues.get(9)).getNumber('RestorationBiomass').divide(10000).round().divide(100).getInfo()  }));
panel2.add(ui.Label({value: ee.Dictionary(RedAreaValues.get(9)).getNumber('RestorationBiomass').divide(10000).round().divide(100).getInfo()  }));
panel.add(ui.Label('Net Primary Productivity (Mt C / year)'));
panel1.add(ui.Label({value: ee.Dictionary(BlueAreaValues.get(10)).getNumber('Npp').divide(10000000).round().divide(100).getInfo()  }));
panel2.add(ui.Label({value: ee.Dictionary(RedAreaValues.get(10)).getNumber('Npp').divide(10000000).round().divide(100).getInfo()  }));
panel.add(ui.Label('Soil Organic Carbon (Mt C)'));
panel1.add(ui.Label({value: ee.Dictionary(BlueAreaValues.get(15)).getNumber('OrgCStockTHa_5to15cm').divide(10000).round().divide(100).getInfo()  }));
panel2.add(ui.Label({value: ee.Dictionary(RedAreaValues.get(15)).getNumber('OrgCStockTHa_5to15cm').divide(10000).round().divide(100).getInfo()  }));
panel.add(ui.Label('Soil Microbial Biomass (Mt C)'));
panel1.add(ui.Label({value: ee.Dictionary(BlueAreaValues.get(11)).getNumber('SoilMicrobialCarbon').divide(10000).round().divide(100).getInfo()  }));
panel2.add(ui.Label({value: ee.Dictionary(RedAreaValues.get(11)).getNumber('SoilMicrobialCarbon').divide(10000).round().divide(100).getInfo()  }));
panel.add(ui.Label('Bacterial Biomass (kt PLFA)'));
panel1.add(ui.Label({value: ee.Dictionary(BlueAreaValues.get(12)).getNumber('bacterial_biomass').divide(10000).round().divide(100).getInfo()  }));
panel2.add(ui.Label({value: ee.Dictionary(RedAreaValues.get(12)).getNumber('bacterial_biomass').divide(10000).round().divide(100).getInfo()  }));
panel.add(ui.Label('Fungal Biomass (kt PLFA)'));
panel1.add(ui.Label({value: ee.Dictionary(BlueAreaValues.get(13)).getNumber('fungal_biomass').divide(10000).round().divide(100).getInfo()  }));
panel2.add(ui.Label({value: ee.Dictionary(RedAreaValues.get(13)).getNumber('fungal_biomass').divide(10000).round().divide(100).getInfo()  }));
panel.add(ui.Label('Nematodes (Quintillion Nematodes)'));
panel1.add(ui.Label({value: ee.Dictionary(BlueAreaValues.get(14)).getNumber('Nematodes').divide(10000000).round().divide(100).getInfo()  }));
panel2.add(ui.Label({value: ee.Dictionary(RedAreaValues.get(14)).getNumber('Nematodes').divide(10000000).round().divide(100).getInfo()  }));
/*
// Create a panel to hold the chart
var panel = ui.Panel({style: {width: '400px'}});
ui.root.add(panel);
var empty = ui.Label({
  value: ' ',
  style: {margin: '5px 0 4px 30px'}});
var label1 = legendTitle;
var choose2 = ui.Label('Select layer of interest:');
var label2 = ui.Label(' ');
var label3 = ui.Label(' ');
var label4 = ui.Label(' ');
var label5 = ui.Label(' ');
var label6 = ui.Label(' ');
*/