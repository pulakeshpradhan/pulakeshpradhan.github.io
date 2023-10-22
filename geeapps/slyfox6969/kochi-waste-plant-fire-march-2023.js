var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                76.29604323709565,
                10.029566407157894
              ],
              [
                76.29604323709565,
                9.94402189322208
              ],
              [
                76.46976455057221,
                9.94402189322208
              ],
              [
                76.46976455057221,
                10.029566407157894
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[76.29604323709565, 10.029566407157894],
          [76.29604323709565, 9.94402189322208],
          [76.46976455057221, 9.94402189322208],
          [76.46976455057221, 10.029566407157894]]], null, false);
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset1 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filterDate('2023-03-04', '2023-03-10')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds)
                  .filterBounds(geometry);
var visualization = {
  min: 0.0,
  max: 0.3,
  //bands: ['B11', 'B8', 'B2'],
  bands: ['B4', 'B3', 'B2'],
};
var images = {
  '2023-03-01': getWeeklySentinelComposite('2023-03-01'),
  '2023-02-20': getWeeklySentinelComposite('2023-02-20'),
};
function getWeeklySentinelComposite(date) {
  var date = ee.Date(date);
  // Only include the VV polarization, for consistent compositing.
  var sentinel1 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                      .filterDate(date, date.advance(7, 'day'))
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
                  .map(maskS2clouds)
                      .mean();
  return sentinel1.visualize({min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],});
}
print (dataset1)
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
leftMap.setCenter(76.36597, 9.99185, 15);
var textVis = {
  'margin':'0px 8px 2px 0px',
  'fontWeight':'bold'
  };
var results = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    width: '310px'
  }
});
var text7 = ui.Label('Developed by Souvik Sankar Mitra Research Scientist, Geoinformatics Department, Indian Institute of Remote Sensing', textVis)
results.add(ui.Panel([text7]
      ));
Map.add(results);
//Map.addLayer(dataset1.mean().clip(geometry), visualization, 'new');