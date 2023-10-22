// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  SET UP 
// Junín Lake:
//North: 10°47'42.43"S -> -10.795119
//South: 11°12'7.43"S -> -11.202064
//East: 75°54'35.88"W -> -75.909967
//West:  76°19'28.29"W -> -76.324525
// Pozuelos Lagoon:
//North: 22°14'7.69"S -> -22.235469
//South: 22°28'6.38"S -> -22.468439
//East: 65°52'26.71"W -> -65.874086
//West:  66° 7'33.66"W -> -66.126017
var Junin_Lake = /* color: #ffc82d */ee.Geometry.Polygon(
        [[[-76.324525, -10.795119],
          [-76.324525, -11.202064],
          [-75.909967, -11.202064],
          [-75.909967, -10.795119]]]);
var Pozuelos_Lagoon = /* color: #0b4a8b */ee.Geometry.Polygon(
        [[[-66.126017, -22.468439],
          [-66.126017, -22.235469],
          [-65.874086, -22.235469],
          [-65.874086, -22.468439]]]);
var Ibera_Marshes = ee.FeatureCollection("users/MScThesis/Reporting_for_Restoration/Wetlands_International/190212_Ibera_Marshes");
var Parana_Delta = ee.FeatureCollection("users/MScThesis/Reporting_for_Restoration/Wetlands_International/190212_Parana_Delta");
var Areas_of_Interest = ee.FeatureCollection(Junin_Lake.union(Pozuelos_Lagoon)).merge(Ibera_Marshes).merge(Parana_Delta)
var Composite = ee.Image("users/devinrouth/ETH_Composites/20181108_78Band_30ArcSec_Composite");
var Hansen2017 = ee.Image("UMD/hansen/global_forest_change_2017_v1_5");
var Composite = Composite.addBands(Hansen2017.select(0)).addBands(Hansen2017.select(1)).addBands(Hansen2017.select(2));
//print(Composite)
// Color palette
var vibgYOR = ['330044', '220066', '1133cc', '33dd00', 'ffda21', 'ff6622', 'd10000'];
// Print the Bandnames of the Composite 
//print(Composite.bandNames(), 'Composite');
// Mask out everything around the region of interest 
var Composite = Composite.clip(Areas_of_Interest)
// Center the Map over the region of interest
Map.setCenter(-76.1161260637844, -10.993692379651232, 11)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  DICTIONARIES
// List of Places
var places = {
  'Junín Lake': [-76.1161260637844, -10.993692379651232, 11],
  'Pozuelos Lagoon': [-65.99959972599538, -22.34800765777138, 11],
  'Ibera Marshes': [-57.701659027592086, -28.526864932736157, 8],
  'Parana Delta': [-59.537568919583464, -33.32370484599527, 8]
};
// List of Total Values
var TotalValues = {
  'Junín Lake': [-76.1161260637844, -10.993692379651232, 11],
  'Pozuelos Lagoon': [-65.99959972599538, -22.34800765777138, 11],
  'Ibera Marshes': [-57.701659027592086, -28.526864932736157, 8],
  'Parana Delta': [-59.537568919583464, -33.32370484599527, 8]
};
// Dictionary about the Content of the Composite
var dictionary = ee.Dictionary({
  'NPP': 3,
  'Aridity Index': 13,
  'Annual Mean Temperature': 21,
  'Temperature Seasonality': 24,
  'Annual Precipitation': 32,
  'Depth to Bedrock': 41,
  'Occurence of R Horizon': 42,
  'Bulk Density': 43, 
  'Cation Exchange Capacity': 44,
  'Clay Content': 45,
  'Coarse Fragments': 46,
  'Organic C Stock': 47,
  'Organic C Content': 48,
  'pH': 49,
  'Silt Content': 50,
  'Sand Content': 51,
  'Tree Cover in 2000': 78,
  'Tree Cover Loss': 79,
  'Tree Cover Gain': 80
});
// Dictionary of the Row Indices
var dictionary_list = {
  'Annual Mean Temperature': 0,
  'Annual Precipitation': 1,
  'Aridity Index': 2,
  'Bulk Density': 3, 
  'Cation Exchange Capacity': 4,
  'Clay Content': 5,
  'Coarse Fragments': 6,
  'Depth to Bedrock': 7,
  'NPP': 8,
  'Occurence of R Horizon': 9,
  'Organic C Content': 10,
  'Organic C Stock': 11,
  'Silt Content': 12,
  'Sand Content': 13,
  'Temperature Seasonality': 14,
  'Tree Cover Gain': 15,
  'Tree Cover Loss': 16,
  'Tree Cover in 2000': 17,
  'pH': 18
};
// List with the Selectors
var dictionary_layers = {
  'NPP': 3,
  'Aridity Index': 13,
  'Annual Mean Temperature': 21,
  'Temperature Seasonality': 24,
  'Annual Precipitation': 32,
  'Depth to Bedrock': 41,
  'Occurence of R Horizon': 42,
  'Bulk Density': 43, 
  'Cation Exchange Capacity': 44,
  'Clay Content': 45,
  'Coarse Fragments': 46,
  'Organic C Stock': 47,
  'Organic C Content': 48,
  'pH': 49,
  'Silt Content': 50,
  'Sand Content': 51,
  'Tree Cover in 2000': 78,
  'Tree Cover Loss': 79,
  'Tree Cover Gain': 80
};
// Dictionary for the legend (calculated using the following script:)
// 
var dictionary_legend = ee.Dictionary({
  'NPP': [    
8,
  12148,
  24288,],
  'Aridity Index': [ 1160,
  7101.5,
  13043,],
  'Annual Mean Temperature': [  3,
  12,
  21,],
  'Temperature Seasonality': [    66,
  284.5,
  503,],
  'Annual Precipitation': [    194,
  873,
  1552,],
  'Depth to Bedrock': [    68,
  134,
  200,],
  'Occurence of R Horizon': [    2,
  34.5,
  67,],
  'Bulk Density': [    855,
  1140,
  1425,], 
  'Cation Exchange Capacity': [    8,
  37,
  66,],
  'Clay Content': [  
  14,
  25.5,
  37,],
  'Coarse Fragments': [    0,
  20.5,
  41,],
  'Organic C Stock': [   9,
  76.5,
  144,],
  'Organic C Content': [   6,
  111.5,
  217,],
  'pH': [
  51,
  65,
  79,],
  'Silt Content': [
  20,
  35.5,
  51,],
  'Sand Content': [
  17,
  39.5,
  62],
  'Tree Cover in 2000': [0, 25, 60],
  'Tree Cover Loss': [0, 0.5, 1],
  'Tree Cover Gain': [0, 0.5, 1]
});
print(dictionary_legend)
print(dictionary_legend.values())
// Save only the values in the following list
var idx_list = dictionary_legend.values();
// Dictionary about the Units of the Composite
var dictionary_longnames = ee.Dictionary({
  'NPP': 'Annual Net Primary Productivity (kg*C/m^2)',
  'Aridity Index': 'Aridity Index (10000 x AI)',
  'Annual Mean Temperature': 'Annual Mean Temperature (° C)',
  'Temperature Seasonality': 'Temperature Seasonality (Std Deviation x 100) (° C)',
  'Annual Precipitation': 'Annual Precipitation (mm)',
  'Depth to Bedrock': 'Depth to Bedrock (cm up to 200)',
  'Occurence of R Horizon': 'Predicted Probability of Occurence of R Horizon (%)',
  'Bulk Density': 'Bulk Density (fine earth) (mass fraction in %)',
  'Cation Exchange Capacity': 'Cation Exchange Capacity (cmolc/kg)',
  'Clay Content': 'Clay content (0-2µm) (mass fraction in %)',
  'Coarse Fragments': 'Coarse fragments volumetric (%)',
  'Organic C Stock': 'Soil Organic Carbon Stock (t/ha)',
  'Organic C Content': 'Soil Organic Carbon Content (fine earth) (g/kg)',
  'pH': 'Soil pH x 10 in H2O (pH x 10)',
  'Silt Content': 'Silt Content (2-50µm) (mass fraction in %)',
  'Sand Content': 'Sand Content (50-2000µm) (mass fraction in %)',
  'Tree Cover in 2000': 'Tree Canopy Cover for year 2000 (%)',
  'Tree Cover Loss': 'Tree Canopy Cover Loss since 2000 (0: Not Loss, 1: Loss)',
  'Tree Cover Gain': 'Tree Canopy Cover Gain since 2000 (0: Not Gain, 1: Gain)'
});
var asd = dictionary_list['Aridity Index']
var Idx_in_Composite = dictionary_layers['Aridity Index'];
print(asd)
print(Idx_in_Composite)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  CALCULATIONS NPP
var NPP = Composite.select(3);
var pixelResolution = NPP.projection().nominalScale();
var ImageWithArea = NPP.addBands(ee.Image.pixelArea());
var imageMultipled = ImageWithArea.expression(" ( b('Npp') * b('area') ) / 1e12").rename('PgC'); //only divide by 12 as NPP is already in kg
var Junin_Lake_reducer = {
	reducer: ee.Reducer.sum(),
	geometry: Junin_Lake,
	scale: pixelResolution,
	maxPixels: 1e12
};
var Pozuelos_Lagoon_reducer = {
	reducer: ee.Reducer.sum(),
	geometry: Pozuelos_Lagoon,
	scale: pixelResolution,
	maxPixels: 1e12
};
var Ibera_Marshes_reducer = {
	reducer: ee.Reducer.sum(),
	geometry: Ibera_Marshes,
	scale: pixelResolution,
	maxPixels: 1e12
};
var Parana_Delta_reducer = {
	reducer: ee.Reducer.sum(),
	geometry: Parana_Delta,
	scale: pixelResolution,
	maxPixels: 1e12
};
var Npp_Junin_Lake_Totals = Math.round(ee.Number(imageMultipled.reduceRegion(Junin_Lake_reducer).get('PgC')).multiply(100).getInfo());
var Npp_Pozuelos_Lagoon_Totals = Math.round(ee.Number(imageMultipled.reduceRegion(Pozuelos_Lagoon_reducer).get('PgC')).multiply(100).getInfo());
var Npp_Ibera_Marshes_Totals = Math.round(ee.Number(imageMultipled.reduceRegion(Ibera_Marshes_reducer).get('PgC')).multiply(100).getInfo());
var Npp_Parana_Delta_Totals = Math.round(ee.Number(imageMultipled.reduceRegion(Parana_Delta_reducer).get('PgC')).multiply(100).getInfo());
var Npp_Junin_Lake_Totals = ee.Number(Npp_Junin_Lake_Totals).divide(100).getInfo();
var Npp_Pozuelos_Lagoon_Totals = ee.Number(Npp_Pozuelos_Lagoon_Totals).divide(100).getInfo();
var Npp_Ibera_Marshes_Totals = ee.Number(Npp_Ibera_Marshes_Totals).divide(100).getInfo();
var Npp_Parana_Delta_Totals = ee.Number(Npp_Parana_Delta_Totals).divide(100).getInfo();
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  CALCULATIONS CARBON STOCK
var CStock = Composite.select(47);
var pixelResolutionC = CStock.projection().nominalScale();
var ImageWithAreaC = CStock.addBands(ee.Image.pixelArea());
var imageMultipledC = ImageWithAreaC.expression(" ( b('OrgCStockTHa_0to15cm') * b('area') ) / 1e11").rename('PgC'); //only divide by 11 as C Stock is already in t (divide by 1e6), and in ha (multiply by 100)
var CStock_Junin_Lake_Totals = Math.round(ee.Number(imageMultipledC.reduceRegion(Junin_Lake_reducer).get('PgC')).multiply(100).getInfo());
var CStock_Pozuelos_Lagoon_Totals = Math.round(ee.Number(imageMultipledC.reduceRegion(Pozuelos_Lagoon_reducer).get('PgC')).multiply(100).getInfo());
var CStock_Ibera_Marshes_Totals = Math.round(ee.Number(imageMultipledC.reduceRegion(Ibera_Marshes_reducer).get('PgC')).multiply(100).getInfo());
var CStock_Parana_Delta_Totals = Math.round(ee.Number(imageMultipledC.reduceRegion(Parana_Delta_reducer).get('PgC')).multiply(100).getInfo());
var CStock_Junin_Lake_Totals = ee.Number(CStock_Junin_Lake_Totals).divide(100).getInfo();
var CStock_Pozuelos_Lagoon_Totals = ee.Number(CStock_Pozuelos_Lagoon_Totals).divide(100).getInfo();
var CStock_Ibera_Marshes_Totals = ee.Number(CStock_Ibera_Marshes_Totals).divide(100).getInfo();
var CStock_Parana_Delta_Totals = ee.Number(CStock_Parana_Delta_Totals).divide(100).getInfo();
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  FUNCTIONS
// Display NPP Values
var display_NPP = function(int2){
  return panel.widgets().set(int2, ui.Label({
    value: ['NPP per area (Pg C):'],
    style: {margin: '0 0 4px 30px'}}));
};
var display_NPP2 = function(int3){
  return panel.widgets().set(int3, ui.Label({
    value: ['Junín Lake: ', Npp_Junin_Lake_Totals].join(' '),
    style: {margin: '4px 0 4px 30px'}}));
};
var display_NPP3 = function(int4){
  return panel.widgets().set(int4, ui.Label({
    value: ['Pozuelos Lagoon: ', Npp_Pozuelos_Lagoon_Totals].join(' '),
    style: {margin: '0 0 4px 30px'}}));
};
var display_NPP4 = function(int5){
  return panel.widgets().set(int5, ui.Label({
    value: ['Ibera Marshes: ', Npp_Ibera_Marshes_Totals].join(' '),
    style: {margin: '0 0 4px 30px'}}));
};
var display_NPP5 = function(int6){
  return panel.widgets().set(int6, ui.Label({
    value: ['Parana Delta: ', Npp_Parana_Delta_Totals].join(' '),
    style: {margin: '0 0 4px 30px'}}));
};
// Display C Stock Values
var display_CStock = function(intC2){
  return panel.widgets().set(intC2, ui.Label({
    value: ['C Stock per area (Pg C):'],
    style: {margin: '0 0 4px 30px'}}));
};
var display_CStock2 = function(intC3){
  return panel.widgets().set(intC3, ui.Label({
    value: ['Junín Lake: ', CStock_Junin_Lake_Totals].join(' '),
    style: {margin: '4px 0 4px 30px'}}));
};
var display_CStock3 = function(intC4){
  return panel.widgets().set(intC4, ui.Label({
    value: ['Pozuelos Lagoon: ', CStock_Pozuelos_Lagoon_Totals].join(' '),
    style: {margin: '0 0 4px 30px'}}));
};
var display_CStock4 = function(intC5){
  return panel.widgets().set(intC5, ui.Label({
    value: ['Ibera Marshes: ', CStock_Ibera_Marshes_Totals].join(' '),
    style: {margin: '0 0 4px 30px'}}));
};
var display_CStock5 = function(intC6){
  return panel.widgets().set(intC6, ui.Label({
    value: ['Parana Delta: ', CStock_Parana_Delta_Totals].join(' '),
    style: {margin: '0 0 4px 30px'}}));
};
// Creates and styles the legend color boxes
var makeRow = function(color, name) {
  // Create the label that is actually the colored box
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width
      padding: '8px',
      margin: '0 0 4px 10px'
    }
  });
  // Create the label filled with the description text
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
// Creates a Select panel
var select_place = ui.Select({
  items: Object.keys(places),
  placeholder: 'Select location...',
  onChange: function(place) {
    // Fly to the Area of Interest
    Map.setCenter(places[place][0], places[place][1], places[place][2])
  }
});
// Creates a Select panel
var select_layer = ui.Select({
  items: Object.keys(dictionary_layers),
  placeholder: 'Select layer...',
  onChange: function(key) {
    // Translate the Name of the Layer to the Index of the Composite
    var Idx_in_Composite = dictionary_layers[key];
    // Translate the Name of the Layer to the Longname of the Layer
    var Longname_Layer = ee.String(dictionary_longnames.get(key)).getInfo();
    // Get the associated Image and its name
    var Layer = Composite.select(Idx_in_Composite);
    var name_of_Layer = Layer.bandNames().get(0).getInfo()
    // Compute NPP and C Stock values for all locations
    var int = ee.Algorithms.If(ee.Number(Idx_in_Composite).eq(3),1,0);
    var intC = ee.Algorithms.If(ee.Number(Idx_in_Composite).eq(47),1,0);
    var int2 = ee.Number(int).multiply(20).getInfo();
    var int3 = ee.Number(int).multiply(21).getInfo();
    var int4 = ee.Number(int).multiply(22).getInfo();
    var int5 = ee.Number(int).multiply(23).getInfo();
    var int6 = ee.Number(int).multiply(24).getInfo();
    display_NPP(int2);
    display_NPP2(int3);
    display_NPP3(int4);
    display_NPP4(int5);
    display_NPP5(int6);
    var intC2 = ee.Number(intC).multiply(20).getInfo();
    var intC3 = ee.Number(intC).multiply(21).getInfo();
    var intC4 = ee.Number(intC).multiply(22).getInfo();
    var intC5 = ee.Number(intC).multiply(23).getInfo();
    var intC6 = ee.Number(intC).multiply(24).getInfo();
    display_CStock(intC2);
    display_CStock2(intC3);
    display_CStock3(intC4);
    display_CStock4(intC5);
    display_CStock5(intC6);
    var legend = idx_list.get(dictionary_list[key]);
    var Label_min = ee.List(legend).get(0).getInfo();
    var Label_median = ee.List(legend).get(1).getInfo();
    var Label_max = ee.List(legend).get(2).getInfo();
    panel.widgets().set(5, ui.Label({
    value: ['Longname and Unit:'],
    style: {margin: '0 0 4px 30px'}}));
    panel.widgets().set(6, ui.Label({
    value: Longname_Layer,
    style: {margin: '0 0 4px 30px'}}));
    panel.widgets().set(7, ui.Label({
    value: Label_min,
    style: {margin: '20px 0 4px 8px'}}));
    panel.widgets().set(9, ui.Label({
    value: Label_median,
    style: {margin: '24px 0 4px 8px'}}));
    panel.widgets().set(11, ui.Label({
    value: Label_max,
    style: {margin: '24px 0 4px 8px'}}));
    panel.widgets().set(13, ui.Label({
    value: ['Click on the Map to get a value'],
    style: {margin: '0 0 4px 30px'}}));
    panel.widgets().set(14, ui.Label({
    value: [' '],
    style: {margin: '0 0 4px 30px'}}));
    panel.widgets().set(0, ui.Label({
    value: [' '],
    style: {margin: '5px 0 4px 30px'}}));
    // Map the chosen Layer
    //Map.addLayer(Composite.select(Idx_in_Composite), {min: min, max: max, palette: vibgYOR})
    var Image_of_Interest = Composite.select(Idx_in_Composite);
    //print(Image_of_Interest, 'Image_of_Interest');
    Map.layers().set(0, ui.Map.Layer(Image_of_Interest, {min: Label_min, max: Label_max, palette: vibgYOR}, name_of_Layer));
    Map.style().set('cursor', 'crosshair');
  }
});
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var lon = 'lon: ' + coords.lon.toFixed(2) ;
  var lat = 'lat: ' + coords.lat.toFixed(2) ;
  var Displayed_Image = Map.layers();
  //print(Displayed_Image.get(0).getEeObject())
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var sample = Displayed_Image.get(0).getEeObject().sample(point);
  //print(sample)
  var Bandname = Displayed_Image.get(0).getEeObject().bandNames().get(0);
  //print(Bandname)
  var computedValue = sample.first().get(Bandname);
  //print(ee.Number(computedValue))
    panel.widgets().set(15, ui.Label({
    value: lon,
    style: {margin: '0 0 4px 30px'}}));
    panel.widgets().set(16, ui.Label({
    value: lat,
    style: {margin: '0 0 4px 30px'}}));
    panel.widgets().set(17, ui.Label({
    value: 'The value is loading...',
    style: {color: 'gray', margin: '0 0 4px 30px'}}));
      // Request the value from the server.
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(17, ui.Label({
      value: 'Value: ' + result.toFixed(2),
      style: {margin: '0 0 4px 30px'}}));
  });
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  MAKE INTERACTIVE LEGEND
// Create a narrow panel to hold the colored boxes
var panel1 = ui.Panel({style: {width: '25px'}});
ui.root.add(panel1);
var label1_panel1 = ui.Label(' ');
var label2_panel1 = ui.Label(' ');
var label3_panel1 = ui.Label(' ');
var label4_panel1 = ui.Label(' ');
var label5_panel1 = ui.Label(' ');
var label6_panel1 = ui.Label(' ');
var label7_panel1 = ui.Label(' ');
var label8_panel1 = ui.Label(' ');
var label9_panel1 = ui.Label(' ');
var label10_panel1 = ui.Label(' ');
var label11_panel1 = ui.Label(' ');
var label12_panel1 = ui.Label(' ');
var label13_panel1 = ui.Label(' ');
var label14_panel1 = ui.Label(' ');
var label15_panel1 = ui.Label(' ');
// Create a panel to hold the chart
var panel = ui.Panel({style: {width: '400px'}});
ui.root.add(panel);
var empty = ui.Label({
  value: ' ',
  style: {margin: '5px 0 4px 30px'}});
var choose1 = ui.Label('Select area of interest:');
var choose2 = ui.Label('Select layer of interest:');
var label2 = ui.Label(' ');
var label3 = ui.Label(' ');
var label4 = ui.Label(' ');
var label5 = ui.Label(' ');
var label6 = ui.Label(' ');
var label7 = ui.Label(' ');
var label8 = ui.Label(' ');
var label9 = ui.Label(' ');
var label10 = ui.Label(' ');
var label11 = ui.Label(' ');
var label12 = ui.Label(' ');
var label13 = ui.Label(' ');
var label14 = ui.Label(' ');
var label15 = ui.Label(' ');
var label16 = ui.Label(' ');
var label17 = ui.Label(' ');
var label18 = ui.Label(' ');
var label19 = ui.Label(' ');
var label20 = ui.Label(' ');
var label21 = ui.Label(' ');
var label22 = ui.Label(' ');
// Create the legend
panel.add(empty)
.add(choose1)
.add(select_place)
.add(choose2)
.add(select_layer)
.add(label2)
.add(label3)
.add(label4)
.add(label5)
.add(label6)
.add(label7)
.add(label8)
.add(label9)
.add(label10)
.add(label11)
.add(label12)
.add(label13)
.add(label14)
.add(label15)
.add(label16)
.add(label17)
.add(label18)
.add(label19)
.add(label20)
.add(label21)
.add(label22)
// Create the left panel
panel1.add(label2_panel1)
.add(label3_panel1)
.add(label4_panel1)
.add(label5_panel1)
.add(label6_panel1)
.add(label7_panel1)
.add(label8_panel1)
.add(label9_panel1)
.add(label10_panel1)
.add(label11_panel1)
.add(label12_panel1)
.add(label13_panel1)
.add(label14_panel1)
.add(label15_panel1)
.add(makeRow('330044',''))
.add(makeRow('220066',''))
.add(makeRow('1133cc',''))
.add(makeRow('33dd00',''))
.add(makeRow('ffda21',''))
.add(makeRow('ff6622',''))
.add(makeRow('d10000',''))