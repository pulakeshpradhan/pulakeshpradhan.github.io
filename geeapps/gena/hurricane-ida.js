var bounds = ui.import && ui.import("bounds", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -92.02535487427632,
                30.828394464744612
              ],
              [
                -92.02535487427632,
                28.8126332410309
              ],
              [
                -86.84530116333882,
                28.8126332410309
              ],
              [
                -86.84530116333882,
                30.828394464744612
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
        [[[-92.02535487427632, 30.828394464744612],
          [-92.02535487427632, 28.8126332410309],
          [-86.84530116333882, 28.8126332410309],
          [-86.84530116333882, 30.828394464744612]]], null, false);
var images = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(bounds)
var imageBefore = images  
  .filterDate('2021-08-20', '2021-08-28')
  .sort('CLOUDY_PIXEL_PERCENTAGE', false)
  .mosaic()
  .visualize({min: 500, max: 4500, bands: ['B12', 'B8', 'B3'], gamma: 1.4 })
Map.addLayer(imageBefore, {}, 'before')
var imageAfter = images  
  .filterDate('2021-08-30', '2021-09-05')
  .mosaic()
  .visualize({min: 500, max: 4500, bands: ['B12', 'B8', 'B3'], gamma: 1.4 })
// Make another map and add a color-NIR composite to it.
var linkedMap = ui.Map();
linkedMap.addLayer(imageAfter, {}, 'after');
var HRSL = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrslpop");
var HRSL_men = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrsl_men");
var HRSL_women = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrsl_women");
var HRSL_youth = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrsl_youth");
var HRSL_children_under_five = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrsl_children_under_five");
var HRSL_women_reproductive_age = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrsl_women_reproductive_age");
var HRSL_elderly_over_sixty = ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrsl_elderly_over_sixty");
var urbanLayer = ui.Map.Layer(HRSL, { palette: ['fb6a4a']}, 'urban (Facebook)', false, 0.9)
linkedMap.layers().add(urbanLayer)
var showHidePopulation = ui.Checkbox('Population', false, function() {
  urbanLayer.setShown(!urbanLayer.getShown())
})
showHidePopulation.style().set({ position: 'middle-right'})
linkedMap.widgets().add(showHidePopulation)
// Link the default Map to the other map.
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
// Make an inset map and add it to the linked map.
var inset = ui.Map({style: {position: "bottom-right"}});
inset.setControlVisibility({all: false})
linkedMap.add(inset);
// Register a function to the linked map to update the inset map.
linkedMap.onChangeBounds(function() {
  var bounds = ee.Geometry.Rectangle(Map.getBounds());
  inset.centerObject(bounds);
  inset.layers().set(0, bounds);
});
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
linkedMap.setCenter(-90.12228719247229, 29.72688463544745, 11);
Map.setOptions('HYBRID')
linkedMap.setOptions('HYBRID')