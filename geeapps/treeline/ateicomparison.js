// Demonstrates ATEI imagery comparison with a variety of years.
/*
 * Configure the imagery
 */
// Load annual ATEIs.
var ATEI = ee.Image("users/treeline/Dirk/Western_US/Annual_NDVI/L5/ATEI_L5_basedOn_NDVIgradientMagnitude");
var images = {
  "1984": ATEI.select("NDVI_1984"),
  "1985": ATEI.select("NDVI_1985"),
  "1986": ATEI.select("NDVI_1986"),
  "1987": ATEI.select("NDVI_1987"),
  "1988": ATEI.select("NDVI_1988"),
  "1989": ATEI.select("NDVI_1989"),
  "1990": ATEI.select("NDVI_1990"),
  "1991": ATEI.select("NDVI_1991"),
  "1992": ATEI.select("NDVI_1992"),
  "1993": ATEI.select("NDVI_1993"),
  "1994": ATEI.select("NDVI_1994"),
  "1995": ATEI.select("NDVI_1995"),
  "1996": ATEI.select("NDVI_1996"),
  "1997": ATEI.select("NDVI_1997"),
  "1998": ATEI.select("NDVI_1998"),
  "1999": ATEI.select("NDVI_1999"),
  "2000": ATEI.select("NDVI_2000"),
  "2001": ATEI.select("NDVI_2001"),
  "2002": ATEI.select("NDVI_2002"),
  "2003": ATEI.select("NDVI_2003"),
  "2004": ATEI.select("NDVI_2004"),
  "2005": ATEI.select("NDVI_2005"),
  "2006": ATEI.select("NDVI_2006"),
  "2007": ATEI.select("NDVI_2007"),
  "2008": ATEI.select("NDVI_2008"),
  "2009": ATEI.select("NDVI_2009"),
  "2010": ATEI.select("NDVI_2010"),
  "2011": ATEI.select("NDVI_2011")
};
var vis = {palette: "red"};
/*
 * Set up the maps and control widgets
 */
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose a year to visualize the annual ATE');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection].updateMask(images[selection].multiply(1e3)), vis, selection));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility({
  layerList: false,
  zoomControl: false, 
  fullscreenControl: false
});
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility({
  layerList: false,
  zoomControl: false, 
  fullscreenControl: false
});
var rightSelector = addLayerSelector(rightMap, 27, 'top-right');
/*
 * Tie everything together
 */
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: "horizontal",
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-113.64572, 48.86593, 13);