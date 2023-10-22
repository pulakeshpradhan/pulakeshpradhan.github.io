var getQABits = function(image, start, end, newName) {
    // Compute the bits we need to extract.
    var pattern = 0;
    for (var i = start; i <= end; i++) {
       pattern += Math.pow(2, i);
    }
    return image.select([0], [newName])
                  .bitwiseAnd(pattern)
                  .rightShift(start);
};
// Load morning (Terra) MODIS data.
var morning = ee.ImageCollection('MODIS/006/MOD09GA');
var clear = function(image){
  var img = image.select('state_1km');
  return getQABits(img,0,1,'Clouds').expression("b(0) == 0 || b(0) == 3");
};
var clear_days = morning.filter(ee.Filter.calendarRange(2015,2015,'year'))
                        .map(clear);
var count = clear_days.reduce(ee.Reducer.sum());
var mean_obs = morning.filter(ee.Filter.calendarRange(2015,2015,'year'))
                      .select('num_observations_1km').reduce(ee.Reducer.mean())
var count = count.divide(mean_obs)
var count=count.reproject('EPSG:4326', null, 10000).reduceResolution({reducer: ee.Reducer.mean(),  maxPixels: 16096})
var palettes = require('users/gena/packages:palettes');
var palette = palettes.colorbrewer.RdYlGn[9];
// Load or import the Hansen et al. forest change dataset.
var hansenImage = ee.Image('UMD/hansen/global_forest_change_2015');
// Select the land/water mask.
var datamask = hansenImage.select('datamask');
// Create a binary mask.
var mask = datamask.eq(1);
var count = count.updateMask(mask);
var vis = {min: 0, max: 100, palette: palette};
var composite = count.visualize(vis);
Map.setCenter(9.586, 44.894, 6)
Map.addLayer(composite);
/*
 * Legend setup
 */
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Number of cloudless days in 2020',
  style: {fontWeight: 'bold'}
});
// Add the legendPanel to the map.
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
Map.add(legendPanel);
var label = ui.Label('Because we love the sun. GF');
Map.add(label);