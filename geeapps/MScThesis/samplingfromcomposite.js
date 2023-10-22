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
// Color palette
var vibgYOR = ['330044', '220066', '1133cc', '33dd00', 'ffda21', 'ff6622', 'd10000'];
// Print the Bandnames of the Composite 
print(Composite.bandNames(), 'Composite');
// Mask out everything around the region of interest 
var Composite = Composite.clip(Areas_of_Interest)
// Center the Map over the region of interest
Map.setCenter(-76.1161260637844, -10.993692379651232, 11)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  DICTIONARIES
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
  'Sand Content': 51
});
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
  'Sand Content': 51
};
// Dictionary about the Units of the Composite
var dictionary_longnames = ee.Dictionary({
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
  'Sand Content': 'Sand Content (50-2000µm) (mass fraction in %)'
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  FUNCTIONS
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
// Creates the Select panel
var select = ui.Select({
  items: Object.keys(dictionary_layers),
  placeholder: 'Choose the layer...',
  onChange: function(key) {
    // Translate the Name of the Layer to the Index of the Composite
    var Idx_in_Composite = dictionary_layers[key];
    // Translate the Name of the Layer to the Longname of the Layer
    var Longname_Layer = ee.String(dictionary_longnames.get(key)).getInfo();
    // Get the associated Image and its name
    var Layer = Composite.select(Idx_in_Composite);
    var name_of_Layer = Layer.bandNames().get(0).getInfo()
    // Get min and max of image in the region
    var minMax_Areas_of_Interest = Layer.reduceRegion({geometry:Areas_of_Interest,reducer:ee.Reducer.percentile([0,50,100])})
    var p0 = [name_of_Layer, 'p0'].join("_"); //name 0 percentile
    var p50 = [name_of_Layer, 'p50'].join("_"); //name 50 percentile
    var p100 = [name_of_Layer, 'p100'].join("_"); //name 100 percentile
    var min = ee.Number(minMax_Areas_of_Interest.get(p0)).round().getInfo();
    var median = ee.Number(minMax_Areas_of_Interest.get(p50)).round().getInfo();
    var max = ee.Number(minMax_Areas_of_Interest.get(p100)).round().getInfo();
    var Label_min = min;
    var Label_median = median;
    var Label_max = max;
    panel.widgets().set(2, ui.Label({
    value: ['Longname and Unit:'],
    style: {margin: '0 0 4px 30px'}}));
    panel.widgets().set(3, ui.Label({
    value: Longname_Layer,
    style: {margin: '0 0 4px 30px'}}));
    panel.widgets().set(4, ui.Label({
    value: Label_min,
    style: {margin: '10px 0 4px 8px'}}));
    panel.widgets().set(6, ui.Label({
    value: Label_median,
    style: {margin: '23px 0 4px 8px'}}));
    panel.widgets().set(8, ui.Label({
    value: Label_max,
    style: {margin: '24px 0 4px 8px'}}));
    panel.widgets().set(10, ui.Label({
    value: ['Click on the Map to get a value'],
    style: {margin: '0 0 4px 30px'}}));
    panel.widgets().set(11, ui.Label({
    value: [' '],
    style: {margin: '0 0 4px 30px'}}));
    // Map the chosen Layer
    //Map.addLayer(Composite.select(Idx_in_Composite), {min: min, max: max, palette: vibgYOR})
    var Image_of_Interest = Composite.select(Idx_in_Composite);
    print(Image_of_Interest, 'Image_of_Interest');
    Map.layers().set(0, ui.Map.Layer(Image_of_Interest, {min: min, max: max, palette: vibgYOR}, name_of_Layer));
    Map.style().set('cursor', 'crosshair');
  }
});
/*
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var lon = 'lon: ' + coords.lon.toFixed(2) ;
  var lat = 'lat: ' + coords.lat.toFixed(2) ;
  var Displayed_Image = Map.layers();
  print(Displayed_Image.get(0).getEeObject())
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var sample = Displayed_Image.get(0).getEeObject().sample(point);
  print(sample)
  var Bandname = Displayed_Image.get(0).getEeObject().bandNames().get(0);
  print(Bandname)
  var computedValue = sample.first().get(Bandname);
  print(ee.Number(computedValue))
    panel.widgets().set(12, ui.Label({
    value: lon,
    style: {margin: '0 0 4px 30px'}}));
    panel.widgets().set(13, ui.Label({
    value: lat,
    style: {margin: '0 0 4px 30px'}}));
    panel.widgets().set(14, ui.Label({
    value: 'The value is loading...',
    style: {color: 'gray', margin: '0 0 4px 30px'}}));
      // Request the value from the server.
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    panel.widgets().set(14, ui.Label({
      value: 'Value: ' + result.toFixed(2),
      style: {margin: '0 0 4px 30px'}}));
  });
});
*/
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
// Create a panel to hold the chart
var panel = ui.Panel({style: {width: '400px'}});
ui.root.add(panel);
var label = ui.Label('Choose the layer of interest:');
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
// Create the legend
panel.add(label)
.add(select)
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
// Create the left panel
panel1.add(label2_panel1)
.add(label3_panel1)
.add(label4_panel1)
.add(label5_panel1)
.add(label6_panel1)
.add(label7_panel1)
.add(label8_panel1)
.add(label9_panel1)
.add(makeRow('330044',''))
.add(makeRow('220066',''))
.add(makeRow('1133cc',''))
.add(makeRow('33dd00',''))
.add(makeRow('ffda21',''))
.add(makeRow('ff6622',''))
.add(makeRow('d10000',''))
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//  MAP THE LAYERS OF INTEREST FROM THE COMPOSITE 
// ~~~~~~~~ DEPTH TO BEDROCK
var name_of_Layer = "Depth_to_Bedrock"
var Depth_to_Bedrock = Composite.select(name_of_Layer);
// Find min und max values within the Polygon
var minMax_Areas_of_Interest = Depth_to_Bedrock.reduceRegion({geometry:Areas_of_Interest,reducer:ee.Reducer.percentile([0,50,100])})
var p0 = [name_of_Layer, 'p0'].join("_"); //name 0 percentile
var p50 = [name_of_Layer, 'p50'].join("_"); //name 50 percentile
var p100 = [name_of_Layer, 'p100'].join("_"); //name 100 percentile
var min = minMax_Areas_of_Interest.get(p0).getInfo();
var median = ee.Number(minMax_Areas_of_Interest.get(p50)).round().getInfo();
var max = minMax_Areas_of_Interest.get(p100).getInfo();
Map.addLayer(Depth_to_Bedrock, {min: min, max: max, palette: vibgYOR}, 'Depth to Bedrock', false)
// ~~~~~~~~ R HORIZON 
var name_of_Layer = "PredProb_of_R_Horizon"
var PredProb_of_R_Horizon = Composite.select(name_of_Layer);
// Find min und max values within the Polygon
var minMax_Areas_of_Interest = PredProb_of_R_Horizon.reduceRegion({geometry:Areas_of_Interest,reducer:ee.Reducer.percentile([0,50,100])})
var p0 = [name_of_Layer, 'p0'].join("_"); //name 0 percentile
var p50 = [name_of_Layer, 'p50'].join("_"); //name 50 percentile
var p100 = [name_of_Layer, 'p100'].join("_"); //name 100 percentile
var min = minMax_Areas_of_Interest.get(p0).getInfo();
var median = ee.Number(minMax_Areas_of_Interest.get(p50)).round().getInfo();
var max = minMax_Areas_of_Interest.get(p100).getInfo();
Map.addLayer(PredProb_of_R_Horizon, {min: min, max: max, palette: vibgYOR}, 'Occurence of R Horizon', false)
// ~~~~~~~~ BULK DENSITY 
var name_of_Layer = "Bulk_Density_15cm"
var Bulk_Density_15cm = Composite.select(name_of_Layer);
// Find min und max values within the Polygon
var minMax_Areas_of_Interest = Bulk_Density_15cm.reduceRegion({geometry:Areas_of_Interest,reducer:ee.Reducer.percentile([0,50,100])})
var p0 = [name_of_Layer, 'p0'].join("_"); //name 0 percentile
var p50 = [name_of_Layer, 'p50'].join("_"); //name 50 percentile
var p100 = [name_of_Layer, 'p100'].join("_"); //name 100 percentile
var min = minMax_Areas_of_Interest.get(p0).getInfo();
var median = ee.Number(minMax_Areas_of_Interest.get(p50)).round().getInfo();
var max = minMax_Areas_of_Interest.get(p100).getInfo();
Map.addLayer(Bulk_Density_15cm, {min: min, max: max, palette: vibgYOR}, 'Bulk Density', false)
// ~~~~~~~~ CATION EXCHANGE CAPACITY
var name_of_Layer = "CatIonExcCap_15cm"
var CatIonExcCap_15cm = Composite.select(name_of_Layer);
// Find min und max values within the Polygon
var minMax_Areas_of_Interest = CatIonExcCap_15cm.reduceRegion({geometry:Areas_of_Interest,reducer:ee.Reducer.percentile([0,50,100])})
var p0 = [name_of_Layer, 'p0'].join("_"); //name 0 percentile
var p50 = [name_of_Layer, 'p50'].join("_"); //name 50 percentile
var p100 = [name_of_Layer, 'p100'].join("_"); //name 100 percentile
var min = minMax_Areas_of_Interest.get(p0).getInfo();
var median = ee.Number(minMax_Areas_of_Interest.get(p50)).round().getInfo();
var max = minMax_Areas_of_Interest.get(p100).getInfo();
Map.addLayer(CatIonExcCap_15cm, {min: min, max: max, palette: vibgYOR}, 'Cation Exchange Capacity', false)
// ~~~~~~~~ CLAY CONTENT
var name_of_Layer = "Clay_Content_15cm"
var Clay_Content_15cm = Composite.select(name_of_Layer);
// Find min und max values within the Polygon
var minMax_Areas_of_Interest = Clay_Content_15cm.reduceRegion({geometry:Areas_of_Interest,reducer:ee.Reducer.percentile([0,50,100])})
var p0 = [name_of_Layer, 'p0'].join("_"); //name 0 percentile
var p50 = [name_of_Layer, 'p50'].join("_"); //name 50 percentile
var p100 = [name_of_Layer, 'p100'].join("_"); //name 100 percentile
var min = minMax_Areas_of_Interest.get(p0).getInfo();
var median = ee.Number(minMax_Areas_of_Interest.get(p50)).round().getInfo();
var max = minMax_Areas_of_Interest.get(p100).getInfo();
Map.addLayer(Clay_Content_15cm, {min: min, max: max, palette: vibgYOR}, 'Clay Content', false)
// ~~~~~~~~ COARSE FRAGMENTS
var name_of_Layer = "CorFragVolPerc_15cm"
var CorFragVolPerc_15cm = Composite.select(name_of_Layer);
// Find min und max values within the Polygon
var minMax_Areas_of_Interest = CorFragVolPerc_15cm.reduceRegion({geometry:Areas_of_Interest,reducer:ee.Reducer.percentile([0,50,100])})
var p0 = [name_of_Layer, 'p0'].join("_"); //name 0 percentile
var p50 = [name_of_Layer, 'p50'].join("_"); //name 50 percentile
var p100 = [name_of_Layer, 'p100'].join("_"); //name 100 percentile
var min = minMax_Areas_of_Interest.get(p0).getInfo();
var median = ee.Number(minMax_Areas_of_Interest.get(p50)).round().getInfo();
var max = minMax_Areas_of_Interest.get(p100).getInfo();
Map.addLayer(CorFragVolPerc_15cm, {min: min, max: max, palette: vibgYOR}, 'Coarse Fragments', false)
// ~~~~~~~~ ORGANIC C STOCK
var name_of_Layer = "OrgCStockTHa_0to15cm"
var OrgCStockTHa_0to15cm = Composite.select(name_of_Layer);
// Find min und max values within the Polygon
var minMax_Areas_of_Interest = OrgCStockTHa_0to15cm.reduceRegion({geometry:Areas_of_Interest,reducer:ee.Reducer.percentile([0,50,100])})
var p0 = [name_of_Layer, 'p0'].join("_"); //name 0 percentile
var p50 = [name_of_Layer, 'p50'].join("_"); //name 50 percentile
var p100 = [name_of_Layer, 'p100'].join("_"); //name 100 percentile
var min = minMax_Areas_of_Interest.get(p0).getInfo();
var median = ee.Number(minMax_Areas_of_Interest.get(p50)).round().getInfo();
var max = minMax_Areas_of_Interest.get(p100).getInfo();
Map.addLayer(OrgCStockTHa_0to15cm, {min: min, max: max, palette: vibgYOR}, 'Organic C Stock', false)
// ~~~~~~~~ Organic C CONTENT
var name_of_Layer = "CContent_15cm"
var CContent_15cm = Composite.select(name_of_Layer);
// Find min und max values within the Polygon
var minMax_Areas_of_Interest = CContent_15cm.reduceRegion({geometry:Areas_of_Interest,reducer:ee.Reducer.percentile([0,50,100])})
var p0 = [name_of_Layer, 'p0'].join("_"); //name 0 percentile
var p50 = [name_of_Layer, 'p50'].join("_"); //name 50 percentile
var p100 = [name_of_Layer, 'p100'].join("_"); //name 100 percentile
var min = minMax_Areas_of_Interest.get(p0).getInfo();
var median = ee.Number(minMax_Areas_of_Interest.get(p50)).round().getInfo();
var max = minMax_Areas_of_Interest.get(p100).getInfo();
Map.addLayer(CContent_15cm, {min: min, max: max, palette: vibgYOR}, 'Organic C Content', false)
// ~~~~~~~~ PH
var name_of_Layer = "pHinHOX_15cm"
var pHinHOX_15cm = Composite.select(name_of_Layer);
// Find min und max values within the Polygon
var minMax_Areas_of_Interest = pHinHOX_15cm.reduceRegion({geometry:Areas_of_Interest,reducer:ee.Reducer.percentile([0,50,100])})
var p0 = [name_of_Layer, 'p0'].join("_"); //name 0 percentile
var p50 = [name_of_Layer, 'p50'].join("_"); //name 50 percentile
var p100 = [name_of_Layer, 'p100'].join("_"); //name 100 percentile
var min = minMax_Areas_of_Interest.get(p0).getInfo();
var median = ee.Number(minMax_Areas_of_Interest.get(p50)).round().getInfo();
var max = minMax_Areas_of_Interest.get(p100).getInfo();
Map.addLayer(pHinHOX_15cm, {min: min, max: max, palette: vibgYOR}, 'pH', false)
// ~~~~~~~~ SILT CONTENT
var name_of_Layer = "Silt_Content_15cm"
var Silt_Content_15cm = Composite.select(name_of_Layer);
// Find min und max values within the Polygon
var minMax_Areas_of_Interest = Silt_Content_15cm.reduceRegion({geometry:Areas_of_Interest,reducer:ee.Reducer.percentile([0,50,100])})
var p0 = [name_of_Layer, 'p0'].join("_"); //name 0 percentile
var p50 = [name_of_Layer, 'p50'].join("_"); //name 50 percentile
var p100 = [name_of_Layer, 'p100'].join("_"); //name 100 percentile
var min = minMax_Areas_of_Interest.get(p0).getInfo();
var median = ee.Number(minMax_Areas_of_Interest.get(p50)).round().getInfo();
var max = minMax_Areas_of_Interest.get(p100).getInfo();
Map.addLayer(Silt_Content_15cm, {min: min, max: max, palette: vibgYOR}, 'Silt Content', false)
// ~~~~~~~~ SAND CONTENT
var name_of_Layer = "Sand_Content_15cm"
var Sand_Content_15cm = Composite.select(name_of_Layer);
// Find min und max values within the Polygon
var minMax_Areas_of_Interest = Sand_Content_15cm.reduceRegion({geometry:Areas_of_Interest,reducer:ee.Reducer.percentile([0,50,100])})
var p0 = [name_of_Layer, 'p0'].join("_"); //name 0 percentile
var p50 = [name_of_Layer, 'p50'].join("_"); //name 50 percentile
var p100 = [name_of_Layer, 'p100'].join("_"); //name 100 percentile
var min = minMax_Areas_of_Interest.get(p0).getInfo();
var median = ee.Number(minMax_Areas_of_Interest.get(p50)).round().getInfo();
var max = minMax_Areas_of_Interest.get(p100).getInfo();
Map.addLayer(Sand_Content_15cm, {min: min, max: max, palette: vibgYOR}, 'Sand Content', false)
/*
// Create a textbox for interactiveness
var textbox = ui.Textbox({
  placeholder: 'E.g., Clay Content',
  onChange: function(text) {
    // Translate the Name of the Layer to the Index of the Composite
    var Idx_in_Composite = ee.Number(dictionary.get(text));
    // Translate the Name of the Layer to the Longname of the Layer
    var Longname_Layer = ee.String(dictionary_longnames.get(text)).getInfo();
    // Get the associated Image and its name
    var Layer = Composite.select(Idx_in_Composite);
    var name_of_Layer = Layer.bandNames().get(0).getInfo()
    // Get min and max of image in the region
    var minMax_Areas_of_Interest = Layer.reduceRegion({geometry:Areas_of_Interest,reducer:ee.Reducer.percentile([0,50,100])})
    var p0 = [name_of_Layer, 'p0'].join("_"); //name 0 percentile
    var p50 = [name_of_Layer, 'p50'].join("_"); //name 50 percentile
    var p100 = [name_of_Layer, 'p100'].join("_"); //name 100 percentile
    var min = ee.Number(minMax_Areas_of_Interest.get(p0)).round().getInfo();
    var median = ee.Number(minMax_Areas_of_Interest.get(p50)).round().getInfo();
    var max = ee.Number(minMax_Areas_of_Interest.get(p100)).round().getInfo();
    var Label_min = ['Lowest Value:', min].join(" ");
    var Label_median = ['Median Value:', median].join(" ");
    var Label_max = ['Highest Value:', max].join(" ")
    panel.widgets().set(2, ui.Label({
      value: Longname_Layer,
      style: {margin: '0 0 4px 30px'}}));
    panel.widgets().set(15, ui.Label({
    value: Label_min,
    style: {margin: '0 0 4px 0'}}));
    panel.widgets().set(16, ui.Label({
    value: Label_median,
    style: {margin: '0 0 4px 0'}}));
    panel.widgets().set(17, ui.Label({
    value: Label_max,
    style: {margin: '0 0 4px 0'}}));
  }
});
*/