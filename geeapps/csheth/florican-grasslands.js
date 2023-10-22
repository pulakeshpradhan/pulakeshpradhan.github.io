var image = ui.import && ui.import("image", "image", {
      "id": "projects/ee-lesser-florican/assets/planetscope/PSScene-5band-2020-12-07"
    }) || ee.Image("projects/ee-lesser-florican/assets/planetscope/PSScene-5band-2020-12-07"),
    classifiediii = ui.import && ui.import("classifiediii", "image", {
      "id": "projects/ee-lesser-florican/assets/113classifiediii"
    }) || ee.Image("projects/ee-lesser-florican/assets/113classifiediii");
// CHANGE THE STATE NAME IN NE INDIA TO DISPLAY ACCORDINGLY FIRST LETTER ALWAYS CAPITAL
var images = {
  '543-PSScene-12-07-2020' : getPSScene('psscene'),
 // 'classified-trial-ii' : getclassifiedimagei('classified1'),
  'classified-trial-iii' :getclassifiedimageiii('classified3')
    };
// for psscene
function getPSScene(psscene) {
 return image.visualize({bands:['b5', 'b4', 'b2'], min: 2500,  max : 7500});
}
// // For classified
// function getclassifiedimagei(classified) {
// var palette = [
//   'f9da00', //  vegetation = green
//   '000000' //  bare = gold
// ];
//   return classifiedii.visualize({min: 1, max: 2, palette: palette, opacity: 1});
// }
function getclassifiedimageiii(classified3) {
 var palette = [
  'f9da00', //  vegetation = green
  '000000' //  bare = gold
];
   return classifiediii.visualize({min: 1, max: 2, palette: palette, opacity: 0.6});
}
var leftMap = ui.Map();
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('CHOOSE YEAR');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position} });
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
leftMap.setCenter(74.6169, 23.9757 , 14);