var AreaOfInterest = ui.import && ui.import("AreaOfInterest", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint();
//App Code
Map.setCenter(110.706194, -8.754795, 6); // Center on Indonesia
Map.setOptions("HYBRID");
Map.drawingTools().setLinked(true);
// var mergeLayer = "AreaOfInterest";
var drawingTools = Map.drawingTools();
Map.drawingTools().setShape('rectangle');
Map.drawingTools().onDraw(function (geometry) {
  // Do something with the geometry
  // switch(mergeLayer){
  //   case "AreaOfInterest":
      AreaOfInterest = drawingTools.layers().get(0).toGeometry();
      // console.log("Area of Interest Updated");
      // print(AreaOfInterest, 'Area of Interest');
  //     break;
  // }
});
Map.drawingTools().onErase(function (geometry) {
  // This updates the geometry whenever an erase happens
  // switch(mergeLayer){
  //   case "AreaOfInterest":
      AreaOfInterest = drawingTools.layers().get(0).toGeometry();
      // console.log("Area of Interest Updated");
      // print(AreaOfInterest, 'Area of Interest');
  //     break;
  // }
});
      Map.drawingTools().onErase(function (geometry) {
  // This updates the geometry whenever an erase happens
  // switch(mergeLayer){
  //   case "AreaOfInterest":
      AreaOfInterest = drawingTools.layers().get(0).toGeometry();
      // console.log("Area of Interest Updated");
      // print(AreaOfInterest, 'Area of Interest');
  //     break;
  // }
});
// drawingTools.onLayerSelect(function (layer, widget) {mergeLayer = (layer.get('name'))});
var maxCon = 1000
var interval = 10
///////////////////DEM Code////////////////////////////////////
function run(){
  Map.clear();
// // Import the dataset and select the elevation band.
var DEMa = ee.Image('NASA/NASADEM_HGT/001').clip(AreaOfInterest);
var DEM1 = DEMa.select('elevation');
Map.addLayer(DEM1,{min: 0, max: maxCon, opacity: 0.8}, "NASA SRTM DEM [30m]")
var lines = ee.List.sequence(0, maxCon, interval)
var contourlines = lines.map(function(line) {
var mycontour = DEM1
.convolve(ee.Kernel.gaussian(5, 3))
.subtract(ee.Image.constant(line)).zeroCrossing()
.multiply(ee.Image.constant(line)).toFloat();
return mycontour.mask(mycontour);
})
contourlines = ee.ImageCollection(contourlines).mosaic()
Map.addLayer(contourlines, {min: 0, max: 5000, palette:['00ff00', 'red']}, 'Contours')
Map.centerObject(AreaOfInterest); // Center on AOI
Map.setOptions("HYBRID");
}
// Set up the tool panel
var header = ui.Label('Contour maker', {fontSize: '36px', color: 'red'});
var toolPanel = ui.Panel([header], 'flow', {width: '300px' 
// ,backgroundColor: '#D3D3D3'
});
ui.root.widgets().add(toolPanel);
//Instructions
var Instructions = ui.Label('Start by drawing a polygon around your area of interest. Then input your desired contour interval below. The Max Contour Elevation will end the contours at the given elevation and also control the contrast in the DEM image (its max.) Setting both numbers to be equal will give you just one contour at that numbers elevation.',{color: 'darkgreen'});
toolPanel.add(Instructions);
// Contour Interval
var ContourPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var ContourLabel = ui.Label('Contour Interval [m]');
ContourPanel.add(ContourLabel);
var ContourInput = ui.Textbox({
  value: interval,
  style: {width: '50px'},
  onChange: function(value){
    interval = parseFloat(value);
  }
});
ContourPanel.add(ContourInput);
toolPanel.add(ContourPanel)
// Max Contour
var MaxContourPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {width: '300px'}
});
var MaxContourLabel = ui.Label('Max Contour Elevation [m]');
MaxContourPanel.add(MaxContourLabel);
var MaxContourInput = ui.Textbox({
  value: maxCon,
  style: {width: '50px'},
  onChange: function(value){
    maxCon = parseFloat(value);
  }
});
MaxContourPanel.add(MaxContourInput);
toolPanel.add(MaxContourPanel)
// Run Button
var runButton = ui.Button({
  label: 'Run',
  onClick: run
});
toolPanel.add(runButton);
// // Set elevation <= 0 as transparent and add to the map.
// Map.addLayer(elevation.updateMask(elevation.gt(0)), elevationVis, 'Elevation');
// Map.setCenter(17.93, 7.71, 2);
///////////////////Old SRTM Data////////////////////////////////////////////////////
//         // Code for Evacuation DEM area option
// var DEM = ee.Image("USGS/SRTMGL1_003").clip(AreaOfInterest);
// Map.addLayer(DEM,{min: 0, max: 82}, "SRTM DEM")
// var maxCon = 82
// var interval = 4
// var lines = ee.List.sequence(0, maxCon, interval)
// var contourlines = lines.map(function(line) {
// var mycontour = DEM
// .convolve(ee.Kernel.gaussian(5, 3))
// .subtract(ee.Image.constant(line)).zeroCrossing()
// .multiply(ee.Image.constant(line)).toFloat();
// return mycontour.mask(mycontour);
// })
// contourlines = ee.ImageCollection(contourlines).mosaic()
// Map.addLayer(contourlines, {min: 0, max: 5000, palette:['00ff00', 'ff0000']}, 'SRTM contours')
// Map.centerObject(DEM,14)
//         // // Export Sentinel2 One Image, specifying scale and region.
// // Export.image.toDrive({
// //   image: Sentinel2,
// //   description: 'SentinelOneImage',
// //   scale: 10,
// //   region: areaOfInterest
// // });