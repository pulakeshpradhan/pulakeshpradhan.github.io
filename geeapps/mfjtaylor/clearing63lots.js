var table = ui.import && ui.import("table", "table", {
      "id": "users/mfjtaylor/QLD_65_lots_clrd1821"
    }) || ee.FeatureCollection("users/mfjtaylor/QLD_65_lots_clrd1821"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/mfjtaylor/Clrd1821_on_65_lots"
    }) || ee.FeatureCollection("users/mfjtaylor/Clrd1821_on_65_lots");
// Top 100 properties clearing detections
var T63 = ee.FeatureCollection(table);
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var LPoutline = empty.paint({
  featureCollection: T63,
  color: 1,
  width: 2
});
var Clrd1821 = ee.FeatureCollection(table2);
var empty2 = ee.Image().byte();
var Clrdoutline = empty2.paint({
  featureCollection: Clrd1821,
  color: 1,
  width: 1
});
//  mask out if not forest and woodland over preceding 15 year according to NCAS
//var clrd1821= ee.Image(image);
//SET DATES
var Yr1Start = '2018-05-01'
var Yr1End = '2018-09-30'
var Yr2Start = '2021-05-01'
var Yr2End = '2021-08-31'
//**SENTINEL2 IMPORTS
// * 1st a Function to remove scenes with clouds using Sentinel-2 QA band
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, so only cloudfree images selected.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
//*
//* Load Winter 2021 S2 median images 3 bands cloud masked
var S2_2021c = ee.ImageCollection('COPERNICUS/S2')
  .filterDate(Yr2Start,Yr2End)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
  .map(maskS2clouds)
  .median()
  .select(['B12', 'B8', 'B4']);
//*
//* Load Winter 2018 S2 median images 3 bands cloud masked
var S2_2018c = ee.ImageCollection('COPERNICUS/S2')
  .filterDate(Yr1Start,Yr1End)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
  .map(maskS2clouds)
  .median()
  .select(['B12', 'B8', 'B4']);
//* SET UP SPLIT PANELS SECTION
//*
//* LH PANEL SETUP
//* ADD Winter 2021 false colour to LEFTHAND MAP
Map.addLayer(S2_2021c, {bands: ['B12', 'B8', 'B4'], min:.05,max: 0.3, gamma:.9}, "Winter 2021");
Map.addLayer(LPoutline, {palette: 'white'}, 'Property');
Map.addLayer(Clrdoutline, {palette: 'yellow'}, 'Cleared 2018-21 from model');
//* RH PANEL SETUP
var map2 = ui.Map();
//* ADD FIRST false colour image to RIGHTHAND MAP
map2.addLayer(S2_2018c, {bands: ['B12', 'B8', 'B4'], min:.05,max: 0.3, gamma:.9}, "Winter 2018");
//* END RH PANEL LAYERS
//*
//* Link the two panels
var linker = ui.Map.Linker([ui.root.widgets().get(0), map2]);
//*Create the split panels
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
//* Set the split panels to ui roots
ui.root.widgets().reset([splitPanel]);
//* Set the view center
linker.get(0).setCenter(146.13165, -20.07554,14);
//** DROPDOWN MENU FOR SELECTING PROPERTIES
var PropertyIDTs = Clrd1821.aggregate_array('LotPlan');
//Create selection widget that selects IDT from Property layer
var IDTselect = ui.Select({
  items: PropertyIDTs.getInfo(),
  placeholder: ('Select'),
  style: {width: '90px'},
  onChange: function(key) {
    var selection2 = ee.Feature(Clrd1821.filter(ee.Filter.eq('LotPlan', key)).first());
    Map.centerObject(selection2)}
});
//*
//*NEW panel to hold dropdown widget
var IDTpanel = ui.Panel({style: {width: '100px'}});
//*
//*PUT selection button into panel
var stepone = ui.Panel({
    widgets: [IDTselect],
    layout: ui.Panel.Layout.flow('vertical')
  });
//*Call functions to create user interface//
IDTpanel.add(stepone); //add step one to panel
ui.root.add(IDTpanel); //add panel to root
//END call functions to create user interface//
//** END DROPDOWN PANEL SECTION