// Map of Before/After flood March 25, 2015
// Define Region of Interest centered in Chañaral
var roi = ee.Geometry.Point(-70.52097, -33.65849);
// Pan-sharpening function
var panSharpenL8 = function(image) {
  var rgb = image.select('B4', 'B3', 'B2');
  var pan = image.select('B8');
  // Convert to HSV, swap in the pan band, and convert back to RGB.
  var huesat = rgb.rgbToHsv().select('hue', 'saturation');
  var upres = ee.Image.cat(huesat, pan).hsvToRgb();
  return image.addBands(upres);
};
// Define vis params
var colorizedVis = {
  min: 0.0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
// Retrieve data
var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_32DAY_NDVI')
                  .filterDate('2017-06-01', '2018-04-30');
var t1 = dataset.select('NDVI');
var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_32DAY_NDVI')
                  .filterDate('2019-06-01', '2020-04-30');
var t2 = dataset.select('NDVI');
// Map.addLayer(t1, trueColor432Vis, 'Before');
// Map.addLayer(t2, trueColor432Vis, 'After');
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
// leftMap.setControlVisibility(false);
leftMap.layers().set(0, ui.Map.Layer(t1, colorizedVis));
leftMap.add(ui.Label("NDVI 2018", {position: "bottom-left", 
                                              fontSize: "30px", 
                                              color: "black", 
                                              backgroundColor: "white",
                                              fontFamily: "Sans-serif"
}))
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
rightMap.layers().set(0, ui.Map.Layer(t2, colorizedVis));
rightMap.add(ui.Label("NDVI 2020", {position: "bottom-right", 
                                              fontSize: "30px", 
                                              color: "white", 
                                              backgroundColor: "black",
                                              fontFamily: "Sans-serif"
}))
/*
 * Tie everything together
 */
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
leftMap.setCenter(-70.52097, -33.65849, 15);
var linker = ui.Map.Linker([leftMap, rightMap]);