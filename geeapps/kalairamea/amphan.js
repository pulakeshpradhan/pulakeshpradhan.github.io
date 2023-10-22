// These Sentinel-1 images track the major flooding in West Bengal during the 2020
// Amphan Cyclone
var roi = ee.Geometry.Polygon([[[86.70678594452039,20.659176977723398],
[92.03515508514539,20.659176977723398],
[92.03515508514539,23.19659036911414],
[86.70678594452039,23.19659036911414],
[86.70678594452039,20.659176977723398]]]);
var images = {
  //'2018-07-21': getWeeklySentinelComposite('2018-07-21'),
  //'2018-07-28': getWeeklySentinelComposite('2018-07-28'),
  //'2018-08-18': getWeeklySentinelComposite('2018-08-18'),
  //'2018-09-15': getWeeklySentinelComposite('2018-09-15'),
  //'Ref-TrueColor': getWeeklySentinelComposite('2020-01-20'),
  //'2020-05-10': getWeeklySentinelComposite('2020-05-10'),
  //'2020-03-20': getWeeklySentinelCompositeVV('2020-03-20'),
  //'2020-05-22': getWeeklySentinelCompositeVV('2020-05-22'),
  'Affected_Areas': ee.Image(normalize(getWeeklySentinelCompositeVV('2020-05-22'))
                  .subtract(normalize(getWeeklySentinelCompositeVV('2020-03-20'))))
                  //.visualize({min: 0, max: 1, palette: ['black', '#252525', '#636363', '#f7f7f7', 'red']}),
                  .visualize({min:0.1, max:0.5, palette: ['white', 'red']}),
  'Basemap': getWeeklySentinelComposite('2020-01-20'),
  'SAR_After': normalize(getWeeklySentinelCompositeVV('2020-05-22')),
  'SAR_Before': normalize(getWeeklySentinelCompositeVV('2020-03-20')),
};
var viz = {min: -100, 
//max: 170, palette: ['black', '#252525', '#636363', '#f7f7f7', 'red']}
max: 170, palette: ['white', 'red']}
// Composite the Sentinel-2 ImageCollection for 7 days (inclusive) after the
// given date.
function getWeeklySentinelComposite(date) {
  var date = ee.Date(date);
  // Only include the VV polarization, for consistent compositing.
  //var polarization = 'VV';
  var sentinel1 = ee.ImageCollection('COPERNICUS/S2_SR')
                      .filterDate(date, date.advance(1, 'week'))
                      //.filterDate(date, date.advance(1, 'month'))
                      .filterBounds(roi)
                      .filter(ee.Filter.lte('CLOUDY_PIXEL_PERCENTAGE',20))
                      .select(['B4', 'B3', 'B2'])
                      .mean();
  return sentinel1.visualize({min: 0, max: 2000});
}
// Composite the Sentinel-1 ImageCollection for 7 days (inclusive) after the
// given date.
function getWeeklySentinelCompositeVV(date) {
  var date = ee.Date(date);
  // Only include the VV polarization, for consistent compositing.
  var polarization = 'VV';
  var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
                      .filterDate(date, date.advance(1, 'day'))
                      .filterBounds(roi)
                      .filter(ee.Filter.listContains(
                          'transmitterReceiverPolarisation', polarization))
                      .filter(ee.Filter.eq('instrumentMode', 'IW'))
                      .select(polarization)
                      .mean();
  return sentinel1.visualize({min: -15, max: 0});
}
function normalize(image) {
  var minMax = image.reduceRegion({
  reducer: ee.Reducer.minMax(),
  geometry: roi,
  scale: 30,
  maxPixels: 10e9,
  // tileScale: 16
}); 
  // use unit scale to normalize the pixel values
  var unitScale = ee.ImageCollection.fromImages(
    image.bandNames().map(function(name){
      name = ee.String(name);
      var band = image.select(name);
      return band.unitScale(ee.Number(minMax.get(name.cat('_min'))), ee.Number(minMax.get(name.cat('_max'))))
                  // eventually multiply by 100 to get range 0-100
                  //.multiply(100);
  })).toBands().rename(image.bandNames());
  return unitScale;
}
function createLegend() {
    var legend = ui.Panel({
    style: {
      position: 'bottom-right',
      padding: '1px 1px'
    }
  })
  // Create legend title
  var legendTitle = ui.Label({
    value: 'Flooding',
    style: {
      fontWeight: 'bold',
      fontSize: '12px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
   // Add the title to the panel
  legend.add(legendTitle); 
  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label({value: 'High',
            style: {
      fontSize: '12px'}})
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
        ui.Label({value: 'Low',
            style: {
      fontSize: '12px'}})
      ],
    });
  legend.add(panel);
  return legend
}
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 1, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
rightMap.add(createLegend());
var rightSelector = addLayerSelector(rightMap, 0, 'top-right');
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
leftMap.setCenter(88.26, 21.66, 11);