/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var Canada_crop_type = ee.FeatureCollection("projects/ee-mortezakhazaei1370/assets/annual_crop_inventory_ground_truth_data_shp"),
    ROI = 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Point([-79.11390405606015, 42.98792824148595]),
    Region = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-79.7779640742063, 43.2690447575614],
          [-79.7779640742063, 42.83653990683636],
          [-78.90867086131567, 42.83653990683636],
          [-78.90867086131567, 43.2690447575614]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Create the application title bar.
Map.add(ui.Label('Crop Pixel Explorer', {fontWeight: 'bold', fontSize: '24px'}));
// We require a regularly-spaced time-series without
// any masked pixels. So this script applies
// linear interpolation to created regularly spaced images
// from the original time-series
// Step-1: Prepare a NDVI Time-Series
// Step-2: Create an empty Time-Series with images at n days
// Step-3: Use Joins to find before/after images
// Step-4: Apply linear interpolation to fill each image
// Step-5: Apply Moving Window Smoothing
// Step-6: Visualize the results
//##############################################################
// Step-1: Prepare a NDVI time-series
//##############################################################
// Write a function for Cloud masking
function maskS2clouds(image) {
  var qa = image.select('QA60')
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  // Snow
  var snow = image.select('SCL').neq(11);
  return image.updateMask(mask)
      .updateMask(snow)
      .divide(10000)
      .copyProperties(image, ["system:time_start"])
}
var s2 = ee.ImageCollection("COPERNICUS/S2_SR"); 
var startDate = ee.Date('2020-01-01')
var endDate = ee.Date('2021-01-01')
var filtered = s2
    .filter(ee.Filter.date(startDate, endDate))
    // .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 40))
    .filterBounds(ROI)
    .map(maskS2clouds)
    .select("B.*")
//##############################################################
// Step-2: Create an empty Time-Series with images at n days
//##############################################################
// Select the interval. We will have 1 image every n days
var n = 5;
var totalDays = endDate.difference(startDate, 'day');
var daysToInterpolate = ee.List.sequence(1, totalDays, n)
var initImages = daysToInterpolate.map(function(day) {
  var image = ee.Image.cat([
    ee.Image().rename('B1'),
    ee.Image().rename('B2'),
    ee.Image().rename('B3'),
    ee.Image().rename('B4'),
    ee.Image().rename('B5'),
    ee.Image().rename('B6'),
    ee.Image().rename('B7'),
    ee.Image().rename('B8'),
    ee.Image().rename('B8A'),
    ee.Image().rename('B9'),
    ee.Image().rename('B11'),
    ee.Image().rename('B12'),])
  return image.toFloat().set({
    'system:index': ee.Number(day).format('%d'),
    'system:time_start': startDate.advance(day, 'day').millis(),
    // Set a property so we can identify interpolated images
    'type': 'interpolated'
  })
})
var initCol = ee.ImageCollection.fromImages(initImages)
// print('Empty Collection', initCol)
//##############################################################
// Step-3: Use Joins to find before/after images
//##############################################################
// Merge empty collection with the original collection so we can
// find images to interpolate from
var mergedCol = filtered.merge(initCol)
var mergedCol = mergedCol.map(function(image) {
  var timeImage = image.metadata('system:time_start').rename('timestamp')
  var timeImageMasked = timeImage.updateMask(image.mask().select(0))
  return image.addBands(timeImageMasked)
})
// Specify the time-window
// Set it so that we have at least 1 non-cloudy image in the period
var days = 60
var millis = ee.Number(days).multiply(1000*60*60*24)
var maxDiffFilter = ee.Filter.maxDifference({
  difference: millis,
  leftField: 'system:time_start',
  rightField: 'system:time_start'
})
var lessEqFilter = ee.Filter.lessThanOrEquals({
  leftField: 'system:time_start',
  rightField: 'system:time_start'
})
var greaterEqFilter = ee.Filter.greaterThanOrEquals({
  leftField: 'system:time_start',
  rightField: 'system:time_start'
})
var filter1 = ee.Filter.and(maxDiffFilter, lessEqFilter)
var join1 = ee.Join.saveAll({
  matchesKey: 'after',
  ordering: 'system:time_start',
  ascending: false})
var join1Result = join1.apply({
  primary: mergedCol,
  secondary: mergedCol,
  condition: filter1
})
var filter2 = ee.Filter.and(maxDiffFilter, greaterEqFilter)
var join2 = ee.Join.saveAll({
  matchesKey: 'before',
  ordering: 'system:time_start',
  ascending: true})
var join2Result = join2.apply({
  primary: join1Result,
  secondary: join1Result,
  condition: filter2
})
//##############################################################
// Step-4: Apply linear interpolation to fill each image
//##############################################################
// Once the joins are done, we don't need original NDVI images
// We keep only the blank images which now have matching NDVI images
// as properties
var filtered = join2Result.filter(ee.Filter.eq('type', 'interpolated'))
// Interpolatinon function
function interpolateImages(image) {
  image = ee.Image(image);
  var beforeImages = ee.List(image.get('before'))
  var beforeMosaic = ee.ImageCollection.fromImages(beforeImages).mosaic()
  var afterImages = ee.List(image.get('after'))
  var afterMosaic = ee.ImageCollection.fromImages(afterImages).mosaic()
  var t1 = beforeMosaic.select('timestamp').rename('t1')
  var t2 = afterMosaic.select('timestamp').rename('t2')
  var t = image.metadata('system:time_start').rename('t')
  var timeImage = ee.Image.cat([t1, t2, t])
  var timeRatio = timeImage.expression('(t - t1) / (t2 - t1)', {
    't': timeImage.select('t'),
    't1': timeImage.select('t1'),
    't2': timeImage.select('t2'),
  })
  var interpolated = beforeMosaic
    .add((afterMosaic.subtract(beforeMosaic).multiply(timeRatio)))
  var result = image.unmask(interpolated)
  return result.copyProperties(image, ['system:time_start'])
}
var interpolatedCol = ee.ImageCollection(
  filtered.map(interpolateImages))
// print('Interpolated Collection', interpolatedCol)
//##############################################################
// Step-5: Apply Moving Window Smoothing
//##############################################################
// We use a 'join' to find all images that are within
// the time-window
// The join will add all matching images into a
// new property called 'images'
var join = ee.Join.saveAll({
  matchesKey: 'images'
});
// This filter will match all images that are captured
// within the specified day of the source image
var interval = 60; //dayes
var diffFilter = ee.Filter.maxDifference({
  difference: 1000 * 60 * 60 * 24 * interval,
  leftField: 'system:time_start', 
  rightField: 'system:time_start'
});
var joinedCollection = join.apply({
  primary: interpolatedCol, 
  secondary: interpolatedCol, 
  condition: diffFilter
});
// Each image in the joined collection will contain
// matching images in the 'images' property
// Extract and return the mean of matched images
var smoothedCollection = ee.ImageCollection(joinedCollection.map(function(image) {
  var collection = ee.ImageCollection.fromImages(image.get('images'));
  return collection.median().copyProperties(image, ["system:time_start"]);
}))
//##############################################################
// Step-5: Apply Moving Window Smoothing
//##############################################################
var aafc = ee.ImageCollection("AAFC/ACI");
var agriMask = function(image){
  var labels = [120, 
                130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 
                140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 
                150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 
                160, 161, 162, 163, 164, 165, 166, 167, 168, 169,
                170, 171, 172, 173, 174, 175, 176, 177, 178, 179,
                180, 181, 182, 183, 184, 185, 186, 187, 188, 189,
                190, 191, 192, 193, 194, 195, 196, 197, 198, 199];
  return ee.ImageCollection(labels.map(function(n){
    return image.eq(ee.Number(n));
  })).max()
}
var cropland = aafc.filter(ee.Filter.date('2009-01-01', '2021-01-01'))
    .map(agriMask)
    .max()
// print(cropland)
// Calculate S2 indices *********************************************************
var temporalCollection = function(collection, start, count, interval, units) {
  // Create a sequence of numbers, one for each time interval.
  var sequence = ee.List.sequence(0, ee.Number(count).subtract(1));
  var originalStartDate = ee.Date(start);
  return ee.ImageCollection(sequence.map(function(i) {
    // Get the start date of the current sequence.
    var startDate = originalStartDate.advance(ee.Number(interval).multiply(i), units);
    // Get the end date of the current sequence.
    var endDate = originalStartDate.advance(
      ee.Number(interval).multiply(ee.Number(i).add(1)), units);
    // Define a boxcar or low-pass kernel.
    var boxcar = ee.Kernel.square({
      radius: 3, units: 'pixels', normalize: true
    });
    return collection.filterDate(startDate, endDate)
        .median()
        .convolve(boxcar)
        .set('system:time_start', startDate.millis())
        .set('system:time_end', endDate.millis());
  }));
};
var S2_monthly_2020 = smoothedCollection//temporalCollection(smoothedCollection, '2020-01-01', 12, 1, 'month')
// For this function to work sigma has to be previously computed (see bellow)
var addKNDVI = function(image) {
  // Compute kernel (k) that compares NIR and red, and the normalized kernel index kNDVI
  var red = image.select('B4');
  var nir = image.select('B8');
  var D2 = nir.subtract(red).pow(2).select([0],['d2']);
  // The sigma value is fixed to the median distance between NIR and red reflectances in the dictionary
  var sigma = ee.Number(0.15);
  // Kndvi RBF kernel
  var kndvi = D2.divide(sigma.multiply(2).pow(2)).tanh();
  return image.addBands(kndvi.select([0], ['KNDVI']));
};
var S2_monthly_2020_conv = S2_monthly_2020.map(addKNDVI)
// print(S2_monthly_2020_conv);
// Digital Elevation Model
var CDEM = ee.ImageCollection('NRCan/CDEM');
var proj = CDEM.first().select(0).projection();
var elevation = CDEM.select('elevation').mosaic().setDefaultProjection(proj);
// var slope = ee.Terrain.slope(elevation);
// var aspect = ee.Terrain.aspect(elevation);
// var terrain = ee.Image.cat(
  // elevation.divide(6500)
  // slope,
  // aspect.divide(360)
//   );
// print(terrain);
// Map.addLayer(terrain)
var ndvi = S2_monthly_2020_conv.select(['KNDVI']).toBands()
  .addBands(elevation.divide(6500))
  .multiply(10000).int16().updateMask(cropland)
// Map.addLayer(ndvi, {}, "NDVI", false);
// #######################################
var samples = Canada_crop_type.filter(
  ee.Filter.rangeContains('DATE_COLL', 
    startDate.millis(), 
    endDate.millis()
  )).filterBounds(Region)
  .randomColumn('rnd');
// print(samples.size());
// print(samples.limit(1000));
// print(samples.aggregate_histogram('LANDNAME'))
// Map.addLayer(samples, {}, '2020', false);
var corn_filter = ee.Filter.eq('LANDNAME', 'Corn');
var corn = samples.filter(corn_filter).map(function(f){
  return f.set('class', 0);
});
var soybeans_filter = ee.Filter.eq('LANDNAME', 'Soybeans');
var soybeans = samples.filter(soybeans_filter).map(function(f){
  return f.set('class', 1);
}).filter(ee.Filter.lt('rnd', 0.4));
var wheat_filter = ee.Filter.eq('LANDNAME', 'Winter Wheat');
var winter_wheat = samples.filter(wheat_filter).map(function(f){
  return f.set('class', 2);
});
var other = samples.filter(ee.Filter.or(corn_filter, soybeans_filter, wheat_filter).not()).map(function(f){
  return f.set('class', 3);
}).filter(ee.Filter.lt('rnd', 0.25));
var new_samples = corn.merge(soybeans).merge(winter_wheat).merge(other);
// print(new_samples.aggregate_histogram('class'));
// Conduct the accuracy Accessment
var samples_2020_with_values = ndvi.sampleRegions({
  collection: new_samples,
  properties: ['class'],
  scale: 10,
});
// print(samples_2020_with_values.limit(100))
// This being a simpler classification, we take 60% points
// for validation. Normal recommended ratio is
// 70% training, 30% validation
samples_2020_with_values = samples_2020_with_values.randomColumn();
var trainingGcp = samples_2020_with_values.filter(ee.Filter.lt('random', 0.7));
var validationGcp = samples_2020_with_values.filter(ee.Filter.gte('random', 0.7));
// Get training stats
// print('Training stats:', trainingGcp.aggregate_histogram('class'));
// print('Number of training samples:', trainingGcp.size());
// Make a Random Forest classifier and train it.
var classifier = ee.Classifier.smileRandomForest(1000)
  .train({
    features: trainingGcp,
    classProperty: 'class',
    inputProperties: ndvi.bandNames()
  });
// print(classifier.explain());
// Test the classifiers' accuracy. (data, Y, X)
var validation = validationGcp.classify(classifier);
var errorMatrix = validation.errorMatrix('class', 'classification');
print('Confusion table:', errorMatrix);
print('Accuracy: (correct/total)', errorMatrix.accuracy());
print('Kappa Coefficient: ', errorMatrix.kappa());
print('Consumer\'s accuracy (comission) (across):', errorMatrix.consumersAccuracy());
print('Producer\'s accuracy (omission) (down):', errorMatrix.producersAccuracy());
// Classify the input imagery.
var classified = ndvi.classify(classifier).toUint8();
Map.centerObject(Region, 12, classified);
// Get variable importance
var dict = classifier.explain();
var VI = ee.Dictionary(dict.get('importance'));
var keys = VI.keys();
var values = VI.values();
var zipped_list = keys.zip(values).sort(values).reverse().slice(0, 20).unzip();
var sorted_keys = ee.List(zipped_list.get(0));
var sorted_values = ee.List(zipped_list.get(1));
// Create chart, print it
var chart =
  ui.Chart.array.values(sorted_values, 0, sorted_keys)
  .setChartType('ColumnChart')
  .setOptions({
    title: 'Random Forest Variable Importance',
  legend: {position: 'none'},
  hAxis: {title: 'Bands'},
  vAxis: {title: 'Importance'}
});
print(chart);
// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Crop Types',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
legend.add(loading);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
// Get the list of palette colors and class names from the image.
classified.evaluate(function(result) {
  var palette = ["ff2d00", "78ff00", "d500ff", "b44e13"];
  var names = ["Corn", "Soybeans", "Winter Wheat", "Others"];
  loading.style().set('shown', false);
  for (var i = 0; i < names.length; i++) {
    legend.add(makeRow(palette[i], names[i]));
  }
  Map.addLayer(classified, {min: 0, max: 3, palette: palette}, 'Crop Type');
});
Map.add(legend);
var chartPanel = ui.Panel({style: {position: 'bottom-right'}});
Map.add(chartPanel);
// Create and add the legend title.
var chartTitle = ui.Label({
  value: 'Time Series Analysis',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
chartPanel.add(chartTitle);
var intro = ui.Label('See how NDVI changes over time by clicking on the map.', {margin: '2px 0 4px 0'});
chartPanel.add(intro);
// chart
var generateChart = function (coords) {
  var lat = coords.lat;
  var lon = coords.long;
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  Map.layers().set(1, dot);
  var chart = ui.Chart.image.series(S2_monthly_2020_conv.select(['KNDVI']), point, ee.Reducer.mean(), 10);
  chart.setOptions({
    title: 'NDVI',
    hAxis: {'title': 'Time'},
    vAxis: {'title': 'NDVI'},
    pointSize: 3,
  });
  chartPanel.clear().add(chart);
};
Map.onClick(generateChart);
Map.style().set('cursor', 'crosshair');