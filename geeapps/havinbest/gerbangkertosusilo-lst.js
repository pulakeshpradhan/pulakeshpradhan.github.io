var RGB = ui.import && ui.import("RGB", "image", {
      "id": "users/havinbest/RGB_031020"
    }) || ee.Image("users/havinbest/RGB_031020"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            112.4833804749062,
            -7.217524362342085
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([112.4833804749062, -7.217524362342085]),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/havinbest/NDVI_031020"
    }) || ee.Image("users/havinbest/NDVI_031020"),
    image = ui.import && ui.import("image", "image", {
      "id": "users/havinbest/NDVI_130719"
    }) || ee.Image("users/havinbest/NDVI_130719"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/havinbest/NDVI_310720"
    }) || ee.Image("users/havinbest/NDVI_310720"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/havinbest/NDVI_150521"
    }) || ee.Image("users/havinbest/NDVI_150521");
var cmap1 = ['blue', 'cyan', 'green', 'yellow', 'red'];
var cmap2 = ['red','yellow','green']
Map.setCenter(112.4833804749062,-7.217524362342085, 11);
Map.addLayer(image, {min:-1, max:1, palette:cmap2}, 'NDVI 2019');
Map.addLayer(image2, {min:-1, max:1, palette:cmap2}, 'NDVI covid');
Map.addLayer(image3, {min:-1, max:1, palette:cmap2}, 'NDVI covid2');
Map.addLayer(image4, {min:-1, max:1, palette:cmap2}, 'NDVI covid3');
var images = {
  'NDVI COVID': ee.Image('users/havinbest/NDVI_310720'),
  'NDVI COVID2': ee.Image('users/havinbest/NDVI_031020'),
  'NDVI COVID3': ee.Image('users/havinbest/NDVI_150521'),
  'NDVI 2019': ee.Image('users/havinbest/NDVI_130719')
}
var viz = {
  min: -1,
  max: 1,
  palette: [
    'red','yellow','green'
  ],
};
// Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// given date.
//function getWeeklySentinelComposite(date) {
//  var polarization = 'VV';
//  var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
//                      .filterDate(date, date.advance(1, 'week'))
//                      .filter(ee.Filter.listContains(
//                          'transmitterReceiverPolarisation', polarization))
//                      .filter(ee.Filter.eq('instrumentMode', 'IW'))
//                      .select(polarization)
//                      .mean();
//  return sentinel1.visualize({min: -1, max: 1, palette: ['aqua', 'black']});
//}
//Map.addLayer(images, viz);
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.add(createLegend())
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
//Map.addLayer(leftMap, viz);
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.add(createLegend())
rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection],viz));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select, ], style: {position: position}});
  mapToChange.add(controlPanel);
}
function createLegend() {
    var legend = ui.Panel({
    style: {
      position: 'bottom-left',
      padding: '8px 15px'
    }
  })
  // Create legend title
  var legendTitle = ui.Label({
    value: 'NDVI',
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
   // Add the title to the panel
  legend.add(legendTitle); 
  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label(viz['max'])
      ],
    });
  legend.add(panel);
  var lon = ee.Image.pixelLonLat().select('latitude');
  var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
  var legendImage = gradient.visualize(viz);
  var thumbnail = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,10,100', dimensions:'10x200'},  
    style: {padding: '1px', position: 'bottom-center'}
  });
  // add the thumbnail to the legend
  legend.add(thumbnail);
  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label(viz['min'])
      ],
    });
  legend.add(panel);
  return legend
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
leftMap.setCenter(112.48,-7.22, 11);