// ##### ##### ##### ##### #####
// FUNCTIONS
// Write a function for Cloud masking
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask)//.divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"]);
}
// Write a function to scale the bands
function scaleImage (image) {
  return image
    .multiply(0.0001)
    .copyProperties(image, ["system:time_start"]);
}
// Creates and styles 1 row of the legend.
function makeRow(color,name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
}
// ##### ##### ##### ##### #####
// Define the area of interest (Ottawa, ON)
var lon_centre = -75.695000;
var lat_centre =  45.424722; 
var lon_width  = 0.50;
var lat_width  = 0.30;
var ottawaGeometry = ee.Geometry.Polygon([[
  [lon_centre - lon_width/2, lat_centre - lat_width/2],
  [lon_centre - lon_width/2, lat_centre + lat_width/2],
  [lon_centre + lon_width/2, lat_centre + lat_width/2],
  [lon_centre + lon_width/2, lat_centre - lat_width/2],
  [lon_centre - lon_width/2, lat_centre - lat_width/2]
]]);
Map.centerObject(ottawaGeometry,27);
var composite = ee.ImageCollection("COPERNICUS/S2")
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',30))
  .filter(ee.Filter.date('2020-01-01','2021-01-01'))
  .filter(ee.Filter.bounds(ottawaGeometry))
  .map(maskS2clouds)
  .map(scaleImage)
  .median();
// Load ESA WorldCover 2020 Classification
var filtered = ee.ImageCollection("ESA/WorldCover/v100")
  .filter(ee.Filter.date('2020-01-01','2021-01-01'));
var classification = ee.Image(filtered.first());
// print("classification:",classification);
// Create a Split Panel App
// Set a center and zoom level.
// Define the area of interest (Ottawa, ON)
var ottawaLongitude = -75.695000;
var ottawaLatitude  =  45.424722; 
var center = {lon: ottawaLongitude, lat: ottawaLatitude, zoom: 12};
// Create two maps.
var  leftMap = ui.Map(center);
var rightMap = ui.Map(center);
// Link them together.
var linker = new ui.Map.Linker([leftMap,rightMap]);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
// Remove the default map from the root panel.
ui.root.clear();
// Add our split panel to the root panel.
ui.root.add(splitPanel);
// Add the layers to the maps
// Composite goes to the leftMap
var rgbVis = {min: 0.0, max: 0.3, bands: ['B4','B3','B2']};
 leftMap.addLayer(composite.clip(ottawaGeometry), rgbVis, '2020 Composite');
rightMap.addLayer(classification.clip(ottawaGeometry), {}, 'WorldCover Classification');
// ##### ##### ##### ##### #####
// Adding a Legend
// The following code creates a legend with class names and colors
// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'middle-right',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'ESA WorldCover Classes',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
legend.add(loading);
var BAND_NAME = 'Map';
// Get the list of palette colors and class names from the image.
classification.toDictionary()
  .select([BAND_NAME + ".*"])
  .evaluate(function(result) {
    // print("result:",result);
    var palette = result[BAND_NAME + "_class_palette"];
    var classNames = result[BAND_NAME + "_class_names"];
    loading.style().set('shown', false);
    for (var i = 0; i < classNames.length; i++) {
      legend.add(makeRow(palette[i],classNames[i]));
    }
  });
// Print the panel containing the legend
// print("legend:",legend);
// ##### ##### ##### ##### #####
// ##### ##### ##### ##### #####
//
// EXERCISE
//
// The 'legend' panel contains the legend for the classification
// Add the legend to the map below
//
// Hint: The classification image is shown in the right-hand map
//
rightMap.add(legend);
// ##### ##### ##### ##### #####
// ##### ##### ##### ##### #####