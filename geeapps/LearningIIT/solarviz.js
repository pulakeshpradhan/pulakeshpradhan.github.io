var im1 = ui.import && ui.import("im1", "image", {
      "id": "users/LearningIIT/SP1Aug2020"
    }) || ee.Image("users/LearningIIT/SP1Aug2020"),
    im2 = ui.import && ui.import("im2", "image", {
      "id": "users/LearningIIT/SP1Dec2020"
    }) || ee.Image("users/LearningIIT/SP1Dec2020"),
    im3 = ui.import && ui.import("im3", "image", {
      "id": "users/LearningIIT/SP1Jan2021"
    }) || ee.Image("users/LearningIIT/SP1Jan2021"),
    im6 = ui.import && ui.import("im6", "image", {
      "id": "users/LearningIIT/WM4063Oct2019"
    }) || ee.Image("users/LearningIIT/WM4063Oct2019"),
    im8 = ui.import && ui.import("im8", "image", {
      "id": "users/LearningIIT/WM4063Oct2020"
    }) || ee.Image("users/LearningIIT/WM4063Oct2020"),
    im9 = ui.import && ui.import("im9", "image", {
      "id": "users/LearningIIT/WM4064Feb2021"
    }) || ee.Image("users/LearningIIT/WM4064Feb2021"),
    im4 = ui.import && ui.import("im4", "image", {
      "id": "users/LearningIIT/WM4064Nov2018"
    }) || ee.Image("users/LearningIIT/WM4064Nov2018"),
    im5 = ui.import && ui.import("im5", "image", {
      "id": "users/LearningIIT/WM4064Oct2019"
    }) || ee.Image("users/LearningIIT/WM4064Oct2019"),
    im7 = ui.import && ui.import("im7", "image", {
      "id": "users/LearningIIT/WM4064Oct2020"
    }) || ee.Image("users/LearningIIT/WM4064Oct2020");
// Demonstrates before/after imagery comparison with a variety of dates.
// monsoon season: https://www.bbc.com/news/world-asia-44962585
var images = {
  'SP 1 Aug 2020': images1(),
  'SP 1 Dec 2020': images2(),
  'SP 1 Jan 2021': images3(),
  '4064 NOV 2018': images4(),
  '4064 OCT 2019': images5(),
  '4063 OCT 2019': images6(),
  '4064 OCT 2020': images7(),
  '4063 OCT 2020': images8(),
  '4064 FEB 2021': images9(),
};
// Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// given date.
function images1() {
   var sentinel1 = im1
    return sentinel1.visualize({min: 0, max: 255, });
}
function images2() {
   var sentinel1 = im2
    return sentinel1.visualize({min: 0, max: 255, });
}
function images3() {
   var sentinel1 = im3
    return sentinel1.visualize({min: 0, max: 255, });
}
function images4() {
   var sentinel1 = im4
    return sentinel1.visualize({min: 0, max: 255, });
}
function images5() {
   var sentinel1 = im5
    return sentinel1.visualize({min: 0, max: 255, });
}
function images6() {
   var sentinel1 = im6
    return sentinel1.visualize({min: 0, max: 255, });
}
function images7() {
   var sentinel1 = im7
    return sentinel1.visualize({min: 0, max: 255, });
}
function images8() {
   var sentinel1 = im8
    return sentinel1.visualize({min: 0, max: 255, });
}
function images9() {
   var sentinel1 = im9
    return sentinel1.visualize({min: 0, max: 255, });
}
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
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
leftMap.setCenter(71.39, 26.71, 14);