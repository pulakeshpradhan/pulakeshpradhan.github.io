var NDBI1990_1992 = ui.import && ui.import("NDBI1990_1992", "image", {
      "id": "users/rizkiatthoriq99/Urban_Change/NDBI_1990_1992"
    }) || ee.Image("users/rizkiatthoriq99/Urban_Change/NDBI_1990_1992"),
    NDBI1995 = ui.import && ui.import("NDBI1995", "image", {
      "id": "users/rizkiatthoriq99/Urban_Change/NDBI1995"
    }) || ee.Image("users/rizkiatthoriq99/Urban_Change/NDBI1995"),
    NDBI2000 = ui.import && ui.import("NDBI2000", "image", {
      "id": "users/rizkiatthoriq99/Urban_Change/NDBI2000"
    }) || ee.Image("users/rizkiatthoriq99/Urban_Change/NDBI2000"),
    NDBI2005 = ui.import && ui.import("NDBI2005", "image", {
      "id": "users/rizkiatthoriq99/Urban_Change/NDBI2005"
    }) || ee.Image("users/rizkiatthoriq99/Urban_Change/NDBI2005"),
    NDBI2010 = ui.import && ui.import("NDBI2010", "image", {
      "id": "users/rizkiatthoriq99/Urban_Change/NDBI2010"
    }) || ee.Image("users/rizkiatthoriq99/Urban_Change/NDBI2010"),
    NDBI2015 = ui.import && ui.import("NDBI2015", "image", {
      "id": "users/rizkiatthoriq99/Urban_Change/NDBI2015"
    }) || ee.Image("users/rizkiatthoriq99/Urban_Change/NDBI2015"),
    NDBI2020 = ui.import && ui.import("NDBI2020", "image", {
      "id": "users/rizkiatthoriq99/Urban_Change/NDBI2020"
    }) || ee.Image("users/rizkiatthoriq99/Urban_Change/NDBI2020");
Map.setOptions('HYBRID')
//Visualization Parameters
var style = {
  min: -0.17,
  max:0.1,
  palette: ['grey','white', 'yellow', 'red']
}
//Urban Change
Map.addLayer(NDBI1990_1992.updateMask(NDBI1990_1992.gt(-0.17)), style, 'Build-Up Index 1990-1992')
Map.addLayer(NDBI1995.updateMask(NDBI1995.gt(-0.17)), style, 'Build-Up Index 1995')
Map.addLayer(NDBI2000.updateMask(NDBI2000.gt(-0.17)), style, 'Build-Up Index 2000')
Map.addLayer(NDBI2005.updateMask(NDBI2005.gt(-0.17)), style, 'Build-Up Index 2005')
Map.addLayer(NDBI2010.updateMask(NDBI2010.gt(-0.17)), style, 'Build-Up Index 2010')
Map.addLayer(NDBI2015.updateMask(NDBI2015.gt(-0.17)), style, 'Build-Up Index 2015')
Map.addLayer(NDBI2020.updateMask(NDBI2020.gt(-0.17)), style, 'Build-Up Index 2020')
// Adding Images
var images = {
  'NDBI 1990-1992': NDBI1990_1992.updateMask(NDBI1990_1992.gt(-0.17)),
  'NDBI 1995'     : NDBI1995.updateMask(NDBI1995.gt(-0.17)),
  'NDBI 2000'     : NDBI2000.updateMask(NDBI2000.gt(-0.17)),
  'NDBI 2005'     : NDBI2005.updateMask(NDBI2005.gt(-0.17)),
  'NDBI 2010'     : NDBI2010.updateMask(NDBI2010.gt(-0.17)),
  'NDBI 2015'     : NDBI2015.updateMask(NDBI2015.gt(-0.17)),
  'NDBI 2020'     : NDBI2020.updateMask(NDBI2020.gt(-0.17)),
};
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'bottom-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'bottom-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose the year');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection].visualize(style)));
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
leftMap.setCenter( 100.38010293799312,-0.307015207019515, 15)
        .setOptions('HYBRID')
rightMap.setOptions('HYBRID')