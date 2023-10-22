var roi = ui.import && ui.import("roi", "table", {
      "id": "users/lucassantarosa/Bacia"
    }) || ee.FeatureCollection("users/lucassantarosa/Bacia");
// Demonstrates before/after imagery comparison with a variety of dates.
//Functions 
//Image normalization
function normalize(image){
  var bandNames = image.bandNames();
  // Compute min and max of the image
  var minDict = image.reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: roi,
    scale: 10,
    maxPixels: 1e9,
    bestEffort: true,
    tileScale: 16
  });
  var maxDict = image.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: roi,
    scale: 10,
    maxPixels: 1e9,
    bestEffort: true,
    tileScale: 16
  });
  var mins = ee.Image.constant(minDict.values(bandNames));
  var maxs = ee.Image.constant(maxDict.values(bandNames));
  var normalized = image.subtract(mins).divide(maxs.subtract(mins))
  return normalized
}
var rgbVis = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 0.3,
  gamma: [1, 1, 1]
};
/*
 * Configure the imagery
 */
var L82013 = ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA")
                            .filterDate('2013-01-01','2013-12-31')
                            .filterMetadata('CLOUD_COVER','less_than',10)
                            .filterBounds(roi)
                            .select('B.*')
 print(L82013)
var L813m = L82013.median().clip(roi)
//var L8n = normalize(L8m)
var L82022 = ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA")
                            .filterDate('2022-01-01','2022-12-31')
                            .filterMetadata('CLOUD_COVER','less_than',10)
                            .filterBounds(roi)
                            .select('B.*')
print(L82022)
var L822m = L82022.median().clip(roi)
//var S2n = normalize(S2m)                          
var images = {
 'L8_2013' : L813m,
 'L8_2022' : L822m
};
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
//Map.addLayer(leftMap, colorizedVis);
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection],rgbVis));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
/*
 * Tie everything together
 */
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.centerObject(roi, 10);
rightMap.centerObject(roi, 10);
//Map.addLayer(roi, {color: "yellow"}, 'area')