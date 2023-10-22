var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "NOAA/DMSP-OLS/NIGHTTIME_LIGHTS"
    }) || ee.ImageCollection("NOAA/DMSP-OLS/NIGHTTIME_LIGHTS"),
    table = ui.import && ui.import("table", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0"),
    imageCollection2 = ui.import && ui.import("imageCollection2", "imageCollection", {
      "id": "NOAA/DMSP-OLS/NIGHTTIME_LIGHTS"
    }) || ee.ImageCollection("NOAA/DMSP-OLS/NIGHTTIME_LIGHTS"),
    imageCollection3 = ui.import && ui.import("imageCollection3", "imageCollection", {
      "id": "users/pmisson/JL_Chrismas_1"
    }) || ee.ImageCollection("users/pmisson/JL_Chrismas_1"),
    imageCollection4 = ui.import && ui.import("imageCollection4", "imageCollection", {
      "id": "users/pmisson/JL_Chrismas_2"
    }) || ee.ImageCollection("users/pmisson/JL_Chrismas_2"),
    imageCollection5 = ui.import && ui.import("imageCollection5", "imageCollection", {
      "id": "users/pmisson/JL_No_Chrismas"
    }) || ee.ImageCollection("users/pmisson/JL_No_Chrismas");
//Map.setOptions('SATELLITE');
var mosaicX1 = imageCollection3.reduce(ee.Reducer.median());
var mosaicX2 = imageCollection4.reduce(ee.Reducer.median());
var mosaicX3 = imageCollection5.reduce(ee.Reducer.median());
var collection = ee.ImageCollection([mosaicX3])
var collection2 = ee.ImageCollection([mosaicX2])
var id1=collection.first().get('system:index')
print(collection2)
// A helper function to show the image for a given year on the default map.
// Demonstrates before/after imagery comparison with a variety of dates.
/*
 * Configure the imagery
 */
// These Sentinel-1 images track the major flooding in Myanmar during the 2018
// monsoon season: https://www.bbc.com/news/world-asia-44962585
  var vizParamsX2 = {
  min:[1, 1, 1],
  max:[789.6, 905.128, 505.826],
  gamma: [3, 3, 3],
  };  
var image1=collection.filterMetadata('system:index', 'equals', id1)
print(image1)
function getWeeklySentinelComposite(name) {
  var sentinel1 = collection.filterMetadata('system:index', 'equals', name);
  var vizParamsX2 = {
  min:[1, 1, 1],
  max:[789.6, 905.128, 505.826],
  gamma: [3, 3, 3],
  };
  var sentinel2=sentinel1.first()
  return sentinel2.visualize(vizParamsX2);//1e-5
}
function getWeeklySentinelComposite1(name) {
  var sentinel1 = collection2.filterMetadata('system:index', 'equals', name);
  var vizParamsX2 = {
  min:[1, 1, 1],
  max:[789.6, 905.128, 505.826],
  gamma: [3, 3, 3],
  };
  var sentinel2=sentinel1.first()
  return sentinel2.visualize(vizParamsX2);//1e-5
}
//Map.setOptions('SATELLITE');
print(getWeeklySentinelComposite('JL1GF03C03_MSS_20211231050211_200070556_101_0014_001_L1A_MSSRM_modificado'))
var images = {
  'NULL': getWeeklySentinelComposite('NULL'),
  'CH1N': getWeeklySentinelComposite('0')
};
var images2 = {
  'NULL': getWeeklySentinelComposite('NULL'),
  'NCH1N': getWeeklySentinelComposite1('0')
  };
print(images)
print(images2)
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector2(leftMap, 1, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
rightMap.setOptions('SATELLITE');
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize without Chrismas lights');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
   select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
function addLayerSelector2(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize in with Chrismas lights');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images2[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images2), onChange: updateMap});
   select.setValue(Object.keys(images2)[defaultValue], true);
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
leftMap.setCenter(-3.703515, 40.416892, 16);
//Map.addLayer('CH1N',vizParamsX2,'CH1N');
//Map.addLayer('CH2N',vizParamsX2,'CH2N');
Map.setCenter(-3.703515, 40.416892, 16);