var table3 = ui.import && ui.import("table3", "table", {
      "id": "users/pmisson/MedidasParkingCaminos"
    }) || ee.FeatureCollection("users/pmisson/MedidasParkingCaminos"),
    image13 = ui.import && ui.import("image13", "image", {
      "id": "users/pmisson/Corr_iss067e345117RGBcal2NAo2rect"
    }) || ee.Image("users/pmisson/Corr_iss067e345117RGBcal2NAo2rect"),
    image14 = ui.import && ui.import("image14", "image", {
      "id": "users/pmisson/Corr_iss062e102265RGBcal2NAo2rect"
    }) || ee.Image("users/pmisson/Corr_iss062e102265RGBcal2NAo2rect"),
    image = ui.import && ui.import("image", "image", {
      "id": "users/pmisson/Corr_iss050e035957RGBcal2NAo2_rect"
    }) || ee.Image("users/pmisson/Corr_iss050e035957RGBcal2NAo2_rect"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/pmisson/Corr_iss067e344681RGBcal2NAo2_rect"
    }) || ee.Image("users/pmisson/Corr_iss067e344681RGBcal2NAo2_rect");
alert("RAW images are publicly available and have been double-verified that there is no risk of misuse of this information or any restrictions on its use. Exact dates are not provided as a precaution. Calibrated images must be requested from the PI. A.Sánchez de Miguel. Published with embargo on: https://zenodo.org/record/7622744#.Y-QGKdKZOJk")
Map.setOptions('SATELLITE');
var collection = ee.ImageCollection([image2.divide(0.651),image13.divide(0.739)])//After
var collection2 = ee.ImageCollection([image,image14.divide(1.125)])//Before
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
  min:[0.01, 0.01, 0.01],
  max:[2, 2, 2],
  gamma: [3, 3, 3],
  };
var image1=collection.filterMetadata('system:index', 'equals', id1)
print(image1)
function getWeeklySentinelComposite(name) {
  var sentinel1 = collection.filterMetadata('system:index', 'equals', name);
  var vizParamsX2 = {
  min:[0.01, 0.01, 0.01],
  max:[2, 2, 2],
  gamma: [3, 3, 3],
  };
  var sentinel2=sentinel1.first()
  return sentinel2.visualize(vizParamsX2);//1e-5
}
function getWeeklySentinelComposite1(name) {
  var sentinel1 = collection2.filterMetadata('system:index', 'equals', name);
  var vizParamsX2 = {
  min:[0.01, 0.01, 0.01],
  max:[2, 2, 2],
  gamma: [3, 3, 3],
  };
  var sentinel2=sentinel1.first()
  return sentinel2.visualize(vizParamsX2);//1e-5
}
//Map.setOptions('SATELLITE');
print(getWeeklySentinelComposite('JL1GF03C03_MSS_20211231050211_200070556_101_0014_001_L1A_MSSRM_modificado'))
var images = {
  'NULL': getWeeklySentinelComposite('NULL'),
  'narrow': getWeeklySentinelComposite('0'),
  'wide': getWeeklySentinelComposite('1')
};
var images2 = {
  'NULL': getWeeklySentinelComposite('NULL'),
  'narrow': getWeeklySentinelComposite1('0'),
  'wide': getWeeklySentinelComposite1('1')  
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
  var label = ui.Label('Kiev during the war');
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
  var label = ui.Label('Kiev before the war');
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
leftMap.setCenter(30.62835, 50.44027, 12);
//Map.addLayer('CH1N',vizParamsX2,'CH1N');
//Map.addLayer('CH2N',vizParamsX2,'CH2N');
Map.setCenter(30.62835, 50.44027, 12);
var image13v=image13.visualize(vizParamsX2)
var image14v=image14.visualize(vizParamsX2)
var imageX1=image13v.getThumbURL({'dimensions': 3000, 'format': 'jpeg'});
var imageX2=image14v.getThumbURL({ 'dimensions': 3000, 'format': 'jpeg'});
print(imageX1)
print(imageX2)