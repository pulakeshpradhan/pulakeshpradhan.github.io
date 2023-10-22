var image2 = ee.Image("users/franciscocorvalan6/Stock_1963"),
    image = ee.Image("users/franciscocorvalan6/Stock_2018"),
    imageVisParam2 = {"opacity":1,"bands":["b1"],"min":1.6312060356140137,"max":13.323736190795898,"palette":["f7e8c3","f1bf53","b55100","7f2c00","301405"]},
    imageVisParam4 = {"opacity":1,"bands":["b1"],"min":1.6312060356140137,"max":13.323736190795898,"palette":["f7e8c3","f1bf53","b55100","7f2c00","301405"]},
    image22 = ee.Image("users/franciscocorvalan6/Stock_1963"),
    image3 = ee.Image("users/franciscocorvalan6/Stock_2018"),
    imageVisParam22 = {"opacity":1,"bands":["b1"],"min":1.6312060356140137,"max":13.323736190795898,"palette":["f7e8c3","f1bf53","b55100","7f2c00","301405"]},
    imageVisParam42 = {"opacity":1,"bands":["b1"],"min":1.6312060356140137,"max":13.323736190795898,"palette":["f7e8c3","f1bf53","b55100","7f2c00","301405"]};
// Demonstrates before/after imagery comparison with a variety of dates.
// Demonstrates before/after imagery comparison with a variety of dates.
var images = {
  'Stock_1963' : image22,
  'Stock 2019' : image3
} 
/*
 * Configure the imagery
 */
// These Sentinel-1 images track the major flooding in Myanmar during the 2018
// monsoon season: https://www.bbc.com/news/world-asia-44962585
//var images = {
//  'L5_01_86' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/19860101'),
//  'L5_01_89' : ee.Image('ANDSAT/LT05/C01/T1_8DAY_EVI/1989010'),
//  'L5_01_98' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/19990101'),
//  'L5_01_02' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20020101'),
//  'L5_01_04' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20040101'),
//  '5_04_08' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20080414'),
//  '5_01_11' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20110117'),
//  '5_02_11' : ee.Image('LANDSAT/LT05/C01/T1_8DAY_EVI/20011024')
//};
var colorizedVis = {
  min: 1.6312060356140137,
  max: 13.323736190795898,
  palette: [
   'f7e8c3','f1bf53','b55100','7f2c00','301405'
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
//Map.addLayer(images, colorizedVis);
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
//Map.addLayer(leftMap, colorizedVis);
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Elegir el Año para visualizar');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection],colorizedVis));
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
leftMap.setCenter(-68.709765,-32.877495, 12);
/////////////////////////////////////////////
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Stock de Carbono (kg/m²)',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
 // Add the title to the panel
legend.add(legendTitle); 
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((colorizedVis.max-colorizedVis.min)/100.0).add(colorizedVis.min);
var legendImage = gradient.visualize(colorizedVis);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      // ui.Label(colorizedVis['max'])
      ui.Label('13,23')
    ],
  });
legend.add(panel);
// create thumbnail from the image
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
      // ui.Label(colorizedVis['min'])
      ui.Label('1,63')
    ],
  });
legend.add(panel);
leftMap.add(legend);
rightMap.add(legend);