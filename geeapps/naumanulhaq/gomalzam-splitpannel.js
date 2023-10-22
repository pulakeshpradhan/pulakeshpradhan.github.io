var commandArea = ee.FeatureCollection("users/naumanulhaq/Office/CommandArea_outerBoundary"),
    l7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_RT"),
    l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA");
var images = {
  '2001': crops_2001('2001'),
  '2009': crops_2009('2009'),
  '2014': crops_2014('2014'),
  '2017': crops_2017('2017'),
  '2018': crops_2018('2018'),
  '2019': crops_2019('2019'),
};
function crops_2001(date) {
  var date = ee.Date(date);
  var image_2001_feb = ee.ImageCollection(l7.filterDate("2001-03-01", "2001-03-30").filterBounds(commandArea).sort("CLOUD_COVER"));
  var image_2001_june = ee.ImageCollection(l7.filterDate("2001-06-01", "2001-07-30").filterBounds(commandArea).sort("CLOUD_COVER"));
  var feb_2001_images = image_2001_feb.sort('system:time_start', false).limit(2);
  var june_2001_images = image_2001_june.sort('system:time_start', true).limit(2);
  var mosaic_2001_feb = feb_2001_images.mosaic();
  var mosaic_2001_june = june_2001_images.mosaic();
  var ndvi_2001_feb = mosaic_2001_feb.normalizedDifference(['B4', 'B3']).rename('NDVI');
  var ndvi_2001_june = mosaic_2001_june.normalizedDifference(['B4', 'B3']).rename('NDVI');
  var ndvi_diff_2001 = ndvi_2001_feb.subtract(ndvi_2001_june);
  var threshold = 0.3;
  var clip_crops_commandArea_2001 = ndvi_diff_2001.gt(threshold);
  var clip_crops_commandArea_2001 = ndvi_diff_2001.updateMask(clip_crops_commandArea_2001).clip(commandArea);
  return clip_crops_commandArea_2001.visualize({palette: ['green']});
}
function crops_2009(date) {
  var date = ee.Date(date);
  var image_2009_feb = ee.ImageCollection(l7.filterDate("2009-01-01", "2009-03-30").filterBounds(commandArea).sort("CLOUD_COVER"));
  var image_2009_june = ee.ImageCollection(l7.filterDate("2009-06-01", "2009-07-30").filterBounds(commandArea).sort("CLOUD_COVER"));
  var feb_2009_images = image_2009_feb.sort('system:time_start', true).limit(4);
  var june_2009_images = image_2009_june.sort('system:time_start', true).limit(5);
  var mosaic_2009_feb = feb_2009_images.mosaic();
  var mosaic_2009_june = june_2009_images.mosaic();
  var ndvi_2009_feb = mosaic_2009_feb.normalizedDifference(['B4', 'B3']).rename('NDVI');
  var ndvi_2009_june = mosaic_2009_june.normalizedDifference(['B4', 'B3']).rename('NDVI');
  var ndvi_diff_2009 = ndvi_2009_feb.subtract(ndvi_2009_june);
  var threshold = 0.3;
  var clip_crops_commandArea_2009 = ndvi_diff_2009.gt(threshold);
  var clip_crops_commandArea_2009 = ndvi_diff_2009.updateMask(clip_crops_commandArea_2009).clip(commandArea);
  return clip_crops_commandArea_2009.visualize({palette: ['green']});
}
function crops_2014(date) {
  var date = ee.Date(date);
  var image_2014_feb = ee.Image(l8.filterDate("2014-02-01", "2014-02-27").filterBounds(commandArea).sort("CLOUD_COVER").first());
  var image_2014_june = ee.ImageCollection(l8.filterDate("2014-06-01", "2014-06-30").filterBounds(commandArea).sort("CLOUD_COVER"));
  // var feb_2014_images = image_2014_feb.sort('system:time_start', false).limit(3);
  var june_2014_images = image_2014_june.sort('system:time_start', false).limit(3);
  // var mosaic_2014_feb = feb_2014_images.mosaic();
  var mosaic_2014_june = june_2014_images.mosaic();
  var ndvi_2014_feb = image_2014_feb.normalizedDifference(['B5', 'B4']).rename('NDVI');
  var ndvi_2014_june = mosaic_2014_june.normalizedDifference(['B5', 'B4']).rename('NDVI');
  var ndvi_diff_2014 = ndvi_2014_feb.subtract(ndvi_2014_june);
  var threshold = 0.3;
  var clip_crops_commandArea_2014 = ndvi_diff_2014.gt(threshold);
  var clip_crops_commandArea_2014 = ndvi_diff_2014.updateMask(clip_crops_commandArea_2014).clip(commandArea);
  return clip_crops_commandArea_2014.visualize({palette: ['green']});
}
function crops_2017(date) {
  var date = ee.Date(date);
  var image_2017_feb = ee.ImageCollection(l8.filterDate("2017-02-01", "2017-03-30").filterBounds(commandArea).sort("CLOUD_COVER"));
  var image_2017_june = ee.ImageCollection(l8.filterDate("2017-06-01", "2017-06-30").filterBounds(commandArea).sort("CLOUD_COVER"));
  var feb_2017_images = image_2017_feb.sort('system:time_start', true).limit(3);
  var june_2017_images = image_2017_june.sort('system:time_start', true).limit(3);
  var mosaic_2017_feb = feb_2017_images.mosaic();
  var mosaic_2017_june = june_2017_images.mosaic();
  var ndvi_2017_feb = mosaic_2017_feb.normalizedDifference(['B5', 'B4']).rename('NDVI');
  var ndvi_2017_june = mosaic_2017_june.normalizedDifference(['B5', 'B4']).rename('NDVI');
  var ndvi_diff_2017 = ndvi_2017_feb.subtract(ndvi_2017_june);
  var threshold = 0.3;
  var clip_crops_commandArea_2017 = ndvi_diff_2017.gt(threshold);
  var clip_crops_commandArea_2017 = ndvi_diff_2017.updateMask(clip_crops_commandArea_2017).clip(commandArea);
  return clip_crops_commandArea_2017.visualize({palette: ['green']});
}
function crops_2018(date) {
  var date = ee.Date(date);
  var image_2018_feb = ee.ImageCollection(l8.filterDate("2018-02-01", "2018-03-30").filterBounds(commandArea).sort("CLOUD_COVER"));
  var image_2018_june = ee.ImageCollection(l8.filterDate("2018-06-01", "2018-06-30").filterBounds(commandArea).sort("CLOUD_COVER"));
  var feb_2018_images = image_2018_feb.sort('system:time_start', true).limit(2);
  var june_2018_images = image_2018_june.sort('system:time_start', false).limit(3);
  var mosaic_2018_feb = feb_2018_images.mosaic();
  var mosaic_2018_june = june_2018_images.mosaic();
  var ndvi_2018_feb = mosaic_2018_feb.normalizedDifference(['B5', 'B4']).rename('NDVI');
  var ndvi_2018_june = mosaic_2018_june.normalizedDifference(['B5', 'B4']).rename('NDVI');
  var ndvi_diff_2018 = ndvi_2018_feb.subtract(ndvi_2018_june);
  var threshold = 0.3;
  var clip_crops_commandArea_2018 = ndvi_diff_2018.gt(threshold);
  var clip_crops_commandArea_2018 = ndvi_diff_2018.updateMask(clip_crops_commandArea_2018).clip(commandArea);
  return clip_crops_commandArea_2018.visualize({palette: ['green']});
}
function crops_2019(date) {
  var date = ee.Date(date);
  var image_2019_feb = ee.ImageCollection(l8.filterDate("2018-02-01", "2018-03-30").filterBounds(commandArea).sort("CLOUD_COVER"));
  var image_2019_june = ee.ImageCollection(l8.filterDate("2018-06-01", "2018-06-30").filterBounds(commandArea).sort("CLOUD_COVER"));
  var feb_2019_images = image_2019_feb.limit(1).mosaic();
  var june_2019_images = image_2019_june.limit(1).mosaic();
  var ndvi_2019_feb = feb_2019_images.normalizedDifference(['B5', 'B4']).rename('NDVI');
  var ndvi_2019_june = june_2019_images.normalizedDifference(['B5', 'B4']).rename('NDVI');
  var ndvi_diff_2019 = ndvi_2019_feb.subtract(ndvi_2019_june);
  var threshold = 0.3;
  var clip_crops_commandArea_2019 = ndvi_diff_2019.gt(threshold);
  var clip_crops_commandArea_2019 = ndvi_diff_2019.updateMask(clip_crops_commandArea_2019).clip(commandArea);
  return clip_crops_commandArea_2019.visualize({palette: ['green']});
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
leftMap.setCenter(70.215427, 32.112840, 11);