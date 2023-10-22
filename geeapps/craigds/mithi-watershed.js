var mithi = ee.FeatureCollection("users/craigds/mithi_watershed_Jinda"),
    nrscLULC = ee.Image("users/craigds/open/nrscLULC");
// Demonstrates before/after imagery comparison with a variety of dates. 
/*
 * Configure the imagery
 */
// These Sentinel-1 images track the major flooding in Myanmar during the 2018
// monsoon season: https://www.bbc.com/news/world-asia-44962585
var images = {
  '2014 Nov': getNovNDVIComposite(2014),
  '2015 Nov': getNovNDVIComposite(2015),
  '2016 Nov': getNovNDVIComposite(2016),
  '2017 Nov': getNovNDVIComposite(2017),
  '2018 Nov': getNovNDVIComposite(2018),
  '2014 - 2018 Diff': getNovNDVIComposite(2018).subtract(getNovNDVIComposite(2014))
  // '2019 Nov': getNovNDVIComposite('2019'),
};
var ndvipalette = ['CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601'];
var ndviVis = {min: 0,max: 0.8,bands: ['ndvi'],palette: ndvipalette};
var deforesVis = {min:-0.3,max:0.3,bands: ['ndvi'],palette:['FF0000','FFFFFF','00FF00']}; //,
// Composite the Landsat ImageCollection for November
function getNovNDVIComposite(year) {
  var yr = ee.Number(year)
  var landsat8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                      .filterBounds(mithi)
                      .filter(ee.Filter.calendarRange(yr,yr,'year'))
                      .filter(ee.Filter.calendarRange(11,11,'month'))
                      .median().clip(mithi);
  var ndvi = landsat8.normalizedDifference(['B5','B4']).updateMask(nrscLULC.neq(16)).rename('ndvi');
  // landsat8 = landsat8.addBands(ndvi);
  return ndvi ;
}
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(true);
leftMap.setOptions('SATELLITE')
var leftSelector = addLayerSelector(leftMap, 5, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(true);
rightMap.setOptions('SATELLITE')
var rightSelector = addLayerSelector(rightMap, 0, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    if (selection == '2014 - 2018 Diff')
    {
      mapToChange.layers().set(0, ui.Map.Layer(images[selection],deforesVis));
    }
    else
    {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection],ndviVis));
    // print(selection)
    }
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
leftMap.centerObject(mithi, 12);