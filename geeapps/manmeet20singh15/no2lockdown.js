// Demonstrates before/after imagery comparison with a variety of dates.
var collection19 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2019-03-23', '2019-05-31');
var collection20 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterDate('2020-03-23', '2020-05-31');  
/*
 * Configure the imagery
 */
// These Sentinel-1 images track the major flooding in Myanmar during the 2018
// monsoon season: https://www.bbc.com/news/world-asia-44962585
var images = {
//  'L5_01_86' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/19860101'),
//  'L5_01_89' : ee.Image('ANDSAT/LT05/C01/T1_8DAY_EVI/1989010'),
  'NO2_2019' : collection19.mean(),
//  'L5_01_02' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20020101'),
//  'L5_01_04' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20040101'),
  'NO2_2020' : collection20.mean(),
//  '5_01_11' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20110117'),
//  '5_02_11' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20011024')
};
var viz = {
min: 0,
  max: 0.0002,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'], 
  opacity:0.8,
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
    value: 'NO2_column_number_density',
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
//Map.setCenter(25.27, 24.11, 2.8);
leftMap.setCenter(45.27, 24.11, 4);