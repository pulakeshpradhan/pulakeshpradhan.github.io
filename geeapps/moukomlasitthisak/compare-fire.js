var Thailand = ui.import && ui.import("Thailand", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                97.71484375,
                15.724311198028534
              ],
              [
                97.71484375,
                9.466121725207586
              ],
              [
                109.68994140625,
                9.466121725207586
              ],
              [
                109.68994140625,
                15.724311198028534
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[97.71484375, 15.724311198028534],
          [97.71484375, 9.466121725207586],
          [109.68994140625, 9.466121725207586],
          [109.68994140625, 15.724311198028534]]], null, false);
//1) โหลดพื้นที่ศึกษาในประเทศไทย
//var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
//var Thailand = countries.filter(ee.Filter.eq('country_na', 'Thailand','Cambodia'));
Map.setOptions('SATELLITE');
Map.addLayer(Thailand, {'palette': 'f03b20', 'opacity': 1}, 'Thailand', true);
var images = {
  'January 2022': getMonthlySentinelComposite('2022-01-01', '2022-01-31'),
  'February 2022': getMonthlySentinelComposite('2022-02-01', '2022-02-28'),
  'March 2022': getMonthlySentinelComposite('2022-03-01', '2022-03-31'),
  'January 2023': getMonthlySentinelComposite('2023-01-01', '2023-01-27'),
};
// Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// given date.
function getMonthlySentinelComposite(date) {
  var date = ee.Date(date);
  // Only include the VV polarization, for consistent compositing.
  var night = ee.ImageCollection('FIRMS')
                      .filterDate(date, date.advance(1, 'month'))
                      .filterBounds(Thailand)
                      .select('T21').median();
  return night.clip(Thailand).visualize({min: 1, max: 20, palette:['violet','indigo','blue','green','yellow','orange','red']});
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
  var label = ui.Label('เลือกเดือนเพื่อเปรียบเทียบ');
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
leftMap.setCenter(102.086, 14.295, 8);