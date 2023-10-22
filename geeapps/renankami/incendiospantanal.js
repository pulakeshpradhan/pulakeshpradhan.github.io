/*
var dateini = '2020-07-01'; 
var datefin = '2020-08-30';
var ic = ee.ImageCollection("COPERNICUS/S2_SR");  // surface reflectance
var c = ic.filterBounds(ee.Geometry.Point(-56.25, -16.75))
          .filterDate(dateini,datefin);
print(c);
var image = ee.Image('COPERNICUS/S2_SR/20200829T140101_20200829T140057_T21KWB');
var image = ee.Image('COPERNICUS/S2_SR/20200720T140101_20200720T140057_T21KWB')
Map.addLayer(image,{'bands': 'B4,B8,B3', 'gain': '0.1, 0.05, 0.1'}, 'Pantanal');
*/
Map.setCenter(-56.25, -16.75, 10); 
var imagepos = ee.Image('COPERNICUS/S2_SR/20200829T140101_20200829T140057_T21KWB');
var imagepre = ee.Image('COPERNICUS/S2_SR/20200720T140101_20200720T140057_T21KWB');
var image4 = ee.Image('COPERNICUS/S2_SR/20200809T140101_20200809T140058_T21KWB');
Map.addLayer(image4,{'bands': 'B4,B8,B3', 'gain': '0.1, 0.05, 0.1'}, '09 Agosto 2020');
var image3 = ee.Image('COPERNICUS/S2_SR/20200814T140059_20200814T140055_T21KWB');
Map.addLayer(image3,{'bands': 'B4,B8,B3', 'gain': '0.1, 0.05, 0.1'}, '14 Agosto 2020');
var image2 = ee.Image('COPERNICUS/S2_SR/20200819T140101_20200819T140058_T21KWB');
Map.addLayer(image2,{'bands': 'B4,B8,B3', 'gain': '0.1, 0.05, 0.1'}, '19 Agosto 2020');
var image1 = ee.Image('COPERNICUS/S2_SR/20200824T140059_20200824T140229_T21KWB');
Map.addLayer(image1,{'bands': 'B4,B8,B3', 'gain': '0.1, 0.05, 0.1'}, '24 Agosto 2020');
Map.addLayer(imagepre,{'bands': 'B4,B8,B3', 'gain': '0.1, 0.05, 0.1'}, '20 Julho 2020');
// Make another map and add a false composite color to it
var linkedMap = ui.Map();
linkedMap.addLayer(image4, {bands: ['B4', 'B8', 'B3'], 'gain': '0.1, 0.05, 0.1'}, '09 Agosto 2020');
linkedMap.addLayer(image3, {bands: ['B4', 'B8', 'B3'], 'gain': '0.1, 0.05, 0.1'}, '14 Agosto 2020');
linkedMap.addLayer(image2, {bands: ['B4', 'B8', 'B3'], 'gain': '0.1, 0.05, 0.1'}, '19 Agosto 2020');
linkedMap.addLayer(image1, {bands: ['B4', 'B8', 'B3'], 'gain': '0.1, 0.05, 0.1'}, '24 Agosto 2020');
linkedMap.addLayer(imagepos, {bands: ['B4', 'B8', 'B3'], 'gain': '0.1, 0.05, 0.1'}, '29 Agosto 2020');
// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
// Register a function to the linked map to update the inset map.
linkedMap.onChangeBounds(function() {
  var bounds = ee.Geometry.Rectangle(Map.getBounds());
});
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
linkedMap.setCenter(-56.25, -16.75, 10);