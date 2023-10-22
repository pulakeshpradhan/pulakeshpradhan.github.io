/* Create a split-panel map that users can swipe to 
   visually compare elevation and slope, or click the 
   map to get the values in meters and degrees.
 */
// Minimum and maximum elevation in meters and slope in degrees for your area (approx.). Affects color.
var minElevation = 3;
var maxElevation = 20;
var minSlope = 0;
var maxSlope = 30;
// Elevation color gradient from lowest to highest. Add more colors for areas with more variation.
var demColor = ['green', 'yellow', 'orange'];
// Remove default map, create two maps for elevation and slope side by side
ui.root.clear();
var Map1 = ui.Map();
var Map2 = ui.Map();
ui.root.add(Map1);
ui.root.add(Map2);
// Set the map center and zoom level
Map1.setCenter(-91.167275, 30.398996, 17);
// Sync the pan and zoom of the two maps
ui.Map.Linker([Map1, Map2]);
// Load the digital elevation model (DEM) layer and add it to the default map.
var dem = ee.Image("USGS/NED");
Map1.addLayer(dem, {min: minElevation, max: maxElevation, palette: demColor}, 'Elevation');
// Calculate pixel slope based on the DEM and add to the 2nd map
var slope = ee.Terrain.slope(dem);
Map2.addLayer(slope, {min: minSlope, max: maxSlope}, 'Slope');
// Split the map panels so there is a swipe bar 
var splitPanel = ui.SplitPanel({firstPanel: Map1, secondPanel: Map2, orientation: 'horizontal', wipe: true, style: {stretch: 'both'}});
ui.root.widgets().reset([splitPanel]);
// Define text for the side panel: title, instructions, "Elevation" & "Slope", and a link to the data source.
var titleLabel = ui.Label({value: 'Highland Road Elevation Explorer', style: {fontSize: '2em'}});
var instructionsLabel = ui.Label('Explore elevation changes in an otherwise flat landscape along the historic Highland Road running along the natural floodplain of the Mississippi River. Slide the handle left and right to visually compare elevation and slope. Slide far right for elevation map controls.');
var valuesLabel = ui.Label('Elevation: (click map)\nSlope: (click map)', {whiteSpace: 'pre'});
var sourceLink = ui.Label({
  value: 'Data source: USGS National Elevation Dataset', 
  targetUrl: 'https://developers.google.com/earth-engine/datasets/catalog/USGS_NED'
});
// Create the side panel where info will be printed
var sidePanel = ui.Panel([titleLabel,instructionsLabel,valuesLabel,sourceLink], 'flow', {width: '20%'});
ui.root.add(sidePanel);
// Query a clicked pixel for elevation and slope.
var getPixelValues = function(coords) {
  // Print "Loading..." in the valuesLabel first in case query is slow. 
  valuesLabel.setValue('Elevation: Loading...\nSlope: Loading...').style({whiteSpace: 'pre'});
  // Send the clicked location to the server to request an elevation value
  var location = ee.Geometry.Point(coords.lon, coords.lat);
  dem.reduceRegion(ee.Reducer.first(), location, 10).evaluate(function(val){
    var demText = val.elevation.toFixed(2) + ' meters';
    // Request slope value from the server and print both elevation and slope to valuesLabel
    slope.reduceRegion(ee.Reducer.first(), location, 10).evaluate(function(val){
      var slopeText = val.slope.toFixed(0) + ' degrees';
      valuesLabel.setValue('Elevation: ' + demText + '\nSlope: ' + slopeText).style({whiteSpace: 'pre'});
    });
  });  
}
// Tell the maps to listen for a click and run our getPixelValues function. 
Map1.onClick(getPixelValues);
Map2.onClick(getPixelValues);
// Style the mouse pointer as a crosshair
Map1.style().set('cursor', 'crosshair');
Map2.style().set('cursor', 'crosshair');