// Load an image of mont Saint-Michel, May 2020
var sendica = ee.ImageCollection ('COPERNICUS/S2')
           .filterDate('2017-04-01', '2017-08-25').select('B4','B8','B11').filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than', 15.0);
var image = sendica.median();
// Add a color-SWIR composite to the default Map.
Map.addLayer(image, {max: 4200, min:482, bands:['B8', 'B11', 'B4']}, 'RecAGO');
// Make another map and add a color-NIR composite to it.
var linkedMap = ui.Map();
var sendica2 = ee.ImageCollection ('COPERNICUS/S2')
           .filterDate('2021-08-21', '2021-09-25').select('B4','B8','B11').filterMetadata('CLOUD_COVERAGE_ASSESSMENT','less_than', 25.0);
var image1 = sendica2.median();
linkedMap.addLayer(image1, {max: 4200, min:482, bands:['B8', 'B11', 'B4']}, 'RecAGOs');
// Add a thermal image to the map.
/*linkedMap.addLayer(image, {\n  bands: ['B11'],\n  min: 290,\n  max: 310,\n  palette: ['gray', 'white', 'yellow', 'red']\n}, 'Thermal');*/
// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
// Make an inset map and add it to the linked map.
var inset = ui.Map({style: {position: "bottom-right"}});
linkedMap.add(inset);
// Register a function to the linked map to update the inset map.
linkedMap.onChangeBounds(function() {  var bounds = ee.Geometry.Rectangle(Map.getBounds());  inset.centerObject(bounds);
inset.layers().set(0, bounds);});
var panel = ui.Panel({style: {
  width: '10%',
  padding: '8px 20px',
  position: 'top-right'}})
    .add(ui.Label('Fecha: Julio 2021'))
linkedMap.add(panel)
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({  firstPanel: linker.get(0),  secondPanel: linker.get(1),  orientation: 'horizontal',  wipe: true,  style: {stretch: 'both'}});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
linker.get(0).setCenter(-60.5533, -31.7212, 11); 
// mont Saint-Michel
var panel = ui.Panel({style: {
  width: '10%',
  padding: '8px 20px',
  position: 'top-left'}})
    .add(ui.Label('Fecha: Julio 2017'))
Map.add(panel)