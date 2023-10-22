var DF = ui.import && ui.import("DF", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -48.29624485816483,
                -15.483824623441016
              ],
              [
                -48.29624485816483,
                -16.065313041136513
              ],
              [
                -47.29099583472733,
                -16.065313041136513
              ],
              [
                -47.29099583472733,
                -15.483824623441016
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
        [[[-48.29624485816483, -15.483824623441016],
          [-48.29624485816483, -16.065313041136513],
          [-47.29099583472733, -16.065313041136513],
          [-47.29099583472733, -15.483824623441016]]], null, false),
    processos = ui.import && ui.import("processos", "table", {
      "id": "users/celbeberger/processos"
    }) || ee.FeatureCollection("users/celbeberger/processos"),
    belavista = ui.import && ui.import("belavista", "table", {
      "id": "users/celbeberger/BelaVista"
    }) || ee.FeatureCollection("users/celbeberger/BelaVista");
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60')
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
var palette = [
  'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
  '74A901', '66A000', '529400', '3E8601', '207401', '056201',
  '004C00', '023B01', '012E01', '011D01', '011301'];
// These Sentinel-1 images track the major flooding in Myanmar during the 2018
var images = {
  'jun/23': getWeeklySentinelComposite('2023-06-01', '2023-06-25'),
  'out/21': getWeeklySentinelComposite('2021-10-01', '2021-10-31'),
  'jun/21': getWeeklySentinelComposite('2021-06-01', '2021-06-30'),
  'nov/20': getWeeklySentinelComposite('2020-11-01', '2020-11-30'),
  'Jun/20': getWeeklySentinelComposite('2020-06-01', '2020-06-30'),
  'jun/20': getWeeklySentinelComposite('2020-06-01', '2020-06-30'),
  'mai/20': getWeeklySentinelComposite('2020-05-01', '2020-05-31'),
  'dez/19': getWeeklySentinelComposite('2019-12-01', '2019-12-31'),
  'out/19': getWeeklySentinelComposite('2019-10-01', '2019-10-31'),
  'jun/19': getWeeklySentinelComposite('2019-06-01', '2019-06-30'),
  'Jan/19': getWeeklySentinelComposite('2019-01-01', '2019-01-31'),
  'Out/18': getWeeklySentinelComposite('2018-10-01', '2018-10-30'),
};
//var ndvi = {
//  'Janeiro': ndviMensal('2019-01-01', '2019-01-31'),
//  'Fevereiro': ndviMensal('2019-02-01', '2019-02-28'),
//  'Marco': ndviMensal('2019-03-01', '2019-03-31'),
//  'Abril': ndviMensal('2019-04-01', '2019-04-30'),
//};
// Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// given date.
function getWeeklySentinelComposite(inicio, fim) {
  //var inicio = ee.Date(date);
 // var fim = ee.Date(date);
  // Only include the VV polarization, for consistent compositing.
  var sentinel1 = ee.ImageCollection('COPERNICUS/S2')
                    .filterDate(inicio, fim)
                    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                    .map(maskS2clouds)
                    .median();
 return sentinel1.visualize({bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3});
}
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
//leftMap.addLayer(belavista);
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
leftMap.setCenter(-47.82, -15.78, 13);