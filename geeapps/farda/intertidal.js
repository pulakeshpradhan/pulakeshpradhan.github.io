// Global Intertidal
var Intertidal = {
  '1984-1986' : ee.Image("UQ/murray/Intertidal/v1_1/global_intertidal/1984-1986").visualize({palette: ['Burlywood']}),
  '1987-1989' : ee.Image("UQ/murray/Intertidal/v1_1/global_intertidal/1987-1989").visualize({palette: ['Tan']}),
  '1990-1992' : ee.Image("UQ/murray/Intertidal/v1_1/global_intertidal/1990-1992").visualize({palette: ['SandyBrown']}),
  '1993-1995' : ee.Image("UQ/murray/Intertidal/v1_1/global_intertidal/1993-1995").visualize({palette: ['Goldenrod']}),
  '1996-1998' : ee.Image("UQ/murray/Intertidal/v1_1/global_intertidal/1996-1998").visualize({palette: ['DarkGoldenrod']}),
  '1999-2001' : ee.Image("UQ/murray/Intertidal/v1_1/global_intertidal/1999-2001").visualize({palette: ['Peru']}),
  '2002-2004' : ee.Image("UQ/murray/Intertidal/v1_1/global_intertidal/2002-2004").visualize({palette: ['Chocolate']}),
  '2005-2007' : ee.Image("UQ/murray/Intertidal/v1_1/global_intertidal/2005-2007").visualize({palette: ['SaddleBrown']}),
  '2008-2010' : ee.Image("UQ/murray/Intertidal/v1_1/global_intertidal/2008-2010").visualize({palette: ['Sienna']}),
  '2011-2013' : ee.Image("UQ/murray/Intertidal/v1_1/global_intertidal/2011-2013").visualize({palette: ['Brown']}),
  '2014-2016' : ee.Image("UQ/murray/Intertidal/v1_1/global_intertidal/2014-2016").visualize({palette: ['Maroon']}),
  'All' : ee.ImageCollection("UQ/murray/Intertidal/v1_1/global_intertidal"),
};
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
    mapToChange.layers().set(0, ui.Map.Layer(Intertidal[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(Intertidal), onChange: updateMap});
  select.setValue(Object.keys(Intertidal)[defaultValue], true);
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
leftMap.setCenter(108.85296040087883,-7.677659611586453, 12);