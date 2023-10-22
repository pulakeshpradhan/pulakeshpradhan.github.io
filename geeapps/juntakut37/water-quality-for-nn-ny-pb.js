var landsat8Sr =  ee.ImageCollection("LANDSAT/LC08/C02/T1_L2"),
    boundary =  ee.FeatureCollection("users/juntakut37/korat_nayok_prachin");
// This script computes normalized difference suspended sediment index (NDSSI) time series for Manyame catchment area in Zimbabwe
// We will use Landsat time-series data to calculate NDSSI, developed by Hossain et al. 2010.
// NDSSI = (blue-NIR)/(blue+NIR)
//////
// Display catchment boundary
Map.addLayer(boundary, {}, 'Boundary');
// Import the global surface water layer that we will use to mask water areas
var gsw = ee.Image("JRC/GSW1_3/GlobalSurfaceWater");
// Select the 'max_extent' band
var water = gsw.select('max_extent').clip(boundary); // max_extent band has values 0 or 1
// Keep the water areas only (1)
var masked = water.updateMask(water);
// finally masking out 0 values and retain only water areas (1)
var masked = water.selfMask();
Map.addLayer(masked, {}, 'Water');
//////
// Function to cloud mask from the pixel_qa band of Landsat 8 SR data.
var maskL8sr = function(image) {
  // Bit 0 - Fill; Bit 1 - Dilated Cloud; Bit 2 - Cirrus; Bit 3 - Cloud; Bit 4 - Cloud Shadow
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var saturationMask = image.select('QA_RADSAT').eq(0);
  // Apply the scaling factors to the appropriate bands.
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  // Replace the original bands with the scaled ones and apply the masks.
  return image.addBands(opticalBands, null, true)
    .addBands(thermalBands, null, true)
    .updateMask(qaMask)
    .updateMask(saturationMask)
    .updateMask(masked);
};
// Function to to calculate NDSSI.
var addVariables = function(image) {
  // Compute time in fractional years since the epoch.
  var date = image.date();
  var years = date.difference(ee.Date('1970-01-01'), 'year');
  // Return the image with the added bands.
  return image
  // Add an NDSSI band.
  .addBands(image.normalizedDifference(['SR_B2', 'SR_B5']).rename('NDSSI'))
  // Add a time band.
  .addBands(ee.Image(years).rename('t')).float()
  // Add a constant band.
  .addBands(ee.Image.constant(1));
};
// Remove clouds, add variables and filter to the area of interest.
var filteredLandsat = landsat8Sr
  .filterBounds(boundary)
  .filterDate('2014', '2021')
  .map(maskL8sr)
  .map(addVariables);
// Display RGB parameters
var rgb = landsat8Sr.select('SR_B5', 'SR_B4','SR_B3');
// Plot a time series of NDSSI at a single location.
Map.setCenter(102.185440, 14.435191, 13);
// Load and define a continuous palette
var palettes = require('users/gena/packages:palettes');
// Choose and define NDSSI display palette
var palette = palettes.colorbrewer.RdBu[10];
var viz = {min: -1, max: 1, palette: palette};
// set position of panel
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px',
border: '5px solid grey'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'NDSSI',
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
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label(viz['max'])
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
ui.Label(viz['min'])
],
});
legend.add(panel);
Map.add(legend);
// Display the NDSSI map
var NDSSI = filteredLandsat.select('NDSSI');
Map.addLayer(NDSSI, viz, 'NDSSI Mosaic');
/////////////// LOGO ///////////////
var logo = ee.Image('users/juntakut37/SDGs_logo_v1_water0').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        format: 'png'
        },
    style: {stretch: 'horizontal', height: '170px', width: '350px', padding :'0'}
    });
///////////////////
// Create a panel to hold our widgets.
var panel = ui.Panel({
  style:{width: "400px", backgroundColor: "white", border: "7px solid grey"} });
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Monitoring Water Quality on Water Areas using NDSSI for the Provinces of Nakhonratchasima, Nakhonnayok, and Prachinburi in Thailand',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('NDSSI & SR Chart Inspector: Click a point on the map to inspect.')
]);
var subtitle = ui.Label('Use Landsat 8 imagery to calculate'+
  ' normalized difference suspended sediment index (NDSSI) between 2014 and 2021.'+
  ' Lower or more negative NDSSI values indicate higher suspended sediment concentrations,'+
   ' while higher or more positive NDSSI values indicate lower suspended sediment concentrations.'
  , {});
panel.add(thumb).add(intro).add(subtitle);
//////////////////////////////////
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '33FF66'});
  Map.layers().set(10, dot);
  Map.centerObject(point, 13);
 ////////////////////////////////// 
  // Create an NDSSI chart.
  var NDSSIChart1 = ui.Chart.image.series(NDSSI, point, ee.Reducer.mean(), 500);
  NDSSIChart1.setOptions({
    title: 'NDSSI Over Time',
    vAxis: {title: 'NDSSI'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
    lineWidth: 1,
    pointSize: 3,
  });
  panel.widgets().set(2, NDSSIChart1);
// Create an NDSSI chart.
  var NDSSIChart2 = ui.Chart.image.series(NDSSI, point, ee.Reducer.mean(), 500);
  NDSSIChart2.setOptions({
    title: 'Trend of NDSSI Over Time',
    vAxis: {title: 'NDSSI'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
    trendlines: {0: {
        color: 'CC0000'
      }},
      lineWidth: 1,
      pointSize: 3,
  });
  panel.widgets().set(3, NDSSIChart2);
// Linear trend ----------------------------------------------------------------
// List of the independent variable names
var independents = ee.List(['constant', 't']);
// Name of the dependent variable.
var dependent = ee.String('NDSSI');
// Compute a linear trend.  This will have two bands: 'residuals' and 
// a 2x1 band called coefficients (columns are for dependent variables).
var trend = filteredLandsat.select(independents.add(dependent))
    .reduce(ee.Reducer.linearRegression(independents.length(), 1));
// Map.addLayer(trend, {}, 'trend array image');
// Flatten the coefficients into a 2-band image
var coefficients = trend.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([independents]);
// Compute a de-trended series.
// This field contains UNIX time in milliseconds.
var timeField = 'system:time_start';
var detrended = filteredLandsat.map(function(image) {
  return image.select(dependent).subtract(
          image.select(independents).multiply(coefficients).reduce('sum'))
          .rename(dependent)
          .copyProperties(image, [timeField]);
});
// Plot the detrended results.
var detrendedChart3 = ui.Chart.image.series(detrended, point, null, 30)
    .setOptions({
      title: 'Detrended Landsat time series at ROI',
      lineWidth: 1,
      pointSize: 3,
    });
//print(detrendedChart);
panel.widgets().set(4, detrendedChart3);
// Harmonic trend ----------------------------------------------------------------
// Use these independent variables in the harmonic regression.
var harmonicIndependents = ee.List(['constant', 't', 'cos', 'sin']);
// Add harmonic terms as new image bands.
var harmonicLandsat = filteredLandsat.map(function(image) {
  var timeRadians = image.select('t').multiply(2 * Math.PI);
  return image
    .addBands(timeRadians.cos().rename('cos'))
    .addBands(timeRadians.sin().rename('sin'));
});
// The output of the regression reduction is a 4x1 array image.
var harmonicTrend = harmonicLandsat
  .select(harmonicIndependents.add(dependent))
  .reduce(ee.Reducer.linearRegression(harmonicIndependents.length(), 1));
// Turn the array image into a multi-band image of coefficients.
var harmonicTrendCoefficients = harmonicTrend.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([harmonicIndependents]);
// Compute fitted values.
var fittedHarmonic = harmonicLandsat.map(function(image) {
  return image.addBands(
    image.select(harmonicIndependents)
      .multiply(harmonicTrendCoefficients)
      .reduce('sum')
      .rename('fitted'));
});
// Plot the fitted model and the original data at the ROI.
var NDSSIChart4 = ui.Chart.image.series(
  fittedHarmonic.select(['fitted','NDSSI']), point, ee.Reducer.mean(), 30)
    .setSeriesNames(['NDSSI', 'fitted'])
    .setOptions({
      title: 'Harmonic model: original and fitted values',
      lineWidth: 1,
      pointSize: 3,
});
panel.widgets().set(5, NDSSIChart4);
// Autocovariance and autocorrelation ---------------------------------------------
// Function to get a lagged collection.  Images that are within
// lagDays of image are stored in a List in the 'images' property.
var lag = function(leftCollection, rightCollection, lagDays) {
  var filter = ee.Filter.and(
    ee.Filter.maxDifference({
      difference: 1000 * 60 * 60 * 24 * lagDays,
      leftField: timeField, 
      rightField: timeField
    }), 
    ee.Filter.greaterThan({
      leftField: timeField, 
      rightField: timeField
  }));
  return ee.Join.saveAll({
    matchesKey: 'images',
    measureKey: 'delta_t',
    ordering: timeField, 
    ascending: false, // Sort reverse chronologically
  }).apply({
    primary: leftCollection, 
    secondary: rightCollection, 
    condition: filter
  });
};
// Lag the Landsat series to get the previous image.
// Note that the results vary when using detrended data
var lagged17 = lag(detrended, detrended, 17);
// Function to merge bands of a lagged collection.  If a collection is
// lagged with itself, the band names will be appended with an '_' and
// suffixed by an index of the order in which they were added.  Because
// the 'images' list is sorted reverse chronologically, band_1 is the t-1
// image when the band names collide.
var merge = function(image) {
  // Function to be passed to iterate.
  var merger = function(current, previous) {
    return ee.Image(previous).addBands(current);
  };
  return ee.ImageCollection.fromImages(image.get('images')).iterate(merger, image);
};
// Merge the bands together.
var merged17 = ee.ImageCollection(lagged17.map(merge));
// Function to compute covariance over time.  This will return 
// a 2x2 array image.  Pixels contains variance-covariance matrices.
var covariance = function(mergedCollection, band, lagBand) {
  return mergedCollection.select([band, lagBand]).map(function(image) {
    return image.toArray();
  }).reduce(ee.Reducer.covariance(), 8);
};
// Compute covariance from the merged series.
var lagBand = dependent.cat('_1');
var covariance17 = ee.Image(covariance(merged17, dependent, lagBand));
// (Note that covariance accentuates agriculture)
Map.addLayer(covariance17.arrayGet([0, 1]), {}, 'covariance (lag = 17 days)',false);
// Compute correlation from a 2x2 covariance image.
var correlation = function(vcArrayImage) {
  var covariance = ee.Image(vcArrayImage).arrayGet([0, 1]);
  var sd0 = ee.Image(vcArrayImage).arrayGet([0, 0]).sqrt();
  var sd1 = ee.Image(vcArrayImage).arrayGet([1, 1]).sqrt();
  return covariance.divide(sd0).divide(sd1).rename('correlation');
};
// Correlation
var correlation17 = correlation(covariance17);
// (Not sure what this means)
Map.addLayer(correlation17, {min: -1, max: 1}, 'correlation (lag = 17 days)',false);
// Lag the Landsat series to get the previous image.
var lagged34 = lag(detrended, detrended, 34);
// Merge the bands together.
var merged34 = ee.ImageCollection(lagged34.map(merge))
    .map(function(image) {
      return image.set('laggedImages', ee.List(image.get('images')).length());
    })
    .filter(ee.Filter.gt('laggedImages', 1));
// Compute covariance from the merged series.
var covariance34 = ee.Image(covariance(merged34, dependent, dependent.cat('_2')));
Map.addLayer(covariance34.arrayGet([0, 1]), {}, 'covariance34',false);
// Cross-correlation ----------------------------------------------------------------
// Precipitation (covariate)
var chirps = ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD');
// Join the precipitation images from a pentad ago
var lag1PrecipNDSSI = lag(filteredLandsat, chirps, 5);
print('lag1PrecipNDSSI', lag1PrecipNDSSI);
// Add the precipitation images as bands.
var merged1PrecipNDSSI = ee.ImageCollection(lag1PrecipNDSSI.map(merge));
print('merged1PrecipNDSSI', merged1PrecipNDSSI);
// Compute covariance.
var cov1PrecipNDSSI = covariance(merged1PrecipNDSSI, 'NDSSI', 'precipitation');
Map.addLayer(cov1PrecipNDSSI.arrayGet([0, 1]), {}, 'NDSSI - PRECIP cov (lag = 5)',false);
// Correlation.
var corr1PrecipNDSSI = correlation(cov1PrecipNDSSI);
Map.addLayer(corr1PrecipNDSSI, {min: -0.5, max: 0.5}, 'NDSSI - PRECIP corr (lag = 5)',false);
// Advanced cross-correlation----------------------------------------------------
// Join the precipitation images from the previous month
var lag30PrecipNDSSI = lag(filteredLandsat, chirps, 30);
print(lag30PrecipNDSSI);
var sum30PrecipNDSSI = ee.ImageCollection(lag30PrecipNDSSI.map(function(image) {
  var laggedImages = ee.ImageCollection.fromImages(image.get('images'));
  return ee.Image(image).addBands(laggedImages.sum().rename('sum'));
}));
// Compute covariance.
var cov30PrecipNDSSI = covariance(sum30PrecipNDSSI, 'NDSSI', 'sum');
Map.addLayer(cov1PrecipNDSSI.arrayGet([0, 1]), {}, 'NDSSI - sum cov (lag = 30)',false);
// Correlation.
var corr30PrecipNDSSI = correlation(cov30PrecipNDSSI);
Map.addLayer(corr30PrecipNDSSI, {min: -0.5, max: 0.5}, 'NDSSI - sum corr (lag = 30)',false);
// AR models --------------------------------------------------------------------------
// Lag the Landsat series to get the previous image.
var lagged34 = ee.ImageCollection(lag(filteredLandsat, filteredLandsat, 34));
// Merge the bands together.
var merged34 = lagged34.map(merge).map(function(image) {
  return image.set('n', ee.List(image.get('images')).length());
}).filter(ee.Filter.gt('n', 1));
// These names are based on the default behavior of addBands(), which 
// appends '_n' for the nth time the band name is replicated.
var arIndependents = ee.List(['constant', 'NDSSI_1', 'NDSSI_2']);
var ar2 = merged34
  .select(arIndependents.add(dependent))
  .reduce(ee.Reducer.linearRegression(arIndependents.length(), 1));
// Turn the array image into a multi-band image of coefficients.
var arCoefficients = ar2.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([arIndependents]);
// Compute fitted values.
var fittedAR = merged34.map(function(image) {
  return image.addBands(
    image.expression('beta0 + beta1 * p1 + beta2 * p2', {
      p1: image.select('NDSSI_1'),
      p2: image.select('NDSSI_2'),
      beta0: arCoefficients.select('constant'),
      beta1: arCoefficients.select('NDSSI_1'),
      beta2: arCoefficients.select('NDSSI_2')
    }).rename('fitted'));
});
// Plot the fitted model and the original data at the ROI.
var NDSSIChart5 = ui.Chart.image.series(
  fittedAR.select(['fitted', 'NDSSI']), point, ee.Reducer.mean(), 30)
    .setSeriesNames(['NDSSI', 'fitted'])
    .setOptions({
      title: 'AR(2) model: original and fitted values',
      lineWidth: 1,
      pointSize: 3,
});
panel.widgets().set(6, NDSSIChart5);
// Forecasting ----------------------------------------------------------------
var fill = function(current, list) {
  // Get the date of the last image in the list.
  var latestDate = ee.Image(ee.List(list).get(-1)).date();
  // Get the date of the current image being processed.
  var currentDate = ee.Image(current).date();
  // If those two dates are more than 16 days apart, there's
  // a temporal gap in the sequence.  To fill in the gap, compute
  // the potential starting and ending dates of the gap.
  var start = latestDate.advance(16, 'day').millis();
  var end = currentDate.advance(-16, 'day').millis();
  // Determine if the start and end dates are chronological.
  var blankImages = ee.Algorithms.If({
    // Watch out for this.  Might need a tolerance here.
    condition: start.lt(end), 
    // Make a sequence of dates to fill in with empty images.
    trueCase: ee.List.sequence({
      start: start,
      end: end,
      step: 1000 * 60 * 60 * 24 * 16
      }).map(function(date) {
        // Return a dummy image with a masked NDVI band and a date.
        return ee.Image(0).mask(0).rename('NDSSI').set({
          'dummy': true,
          'system:time_start': ee.Date(date).millis()
        });
      }), 
    // If there's no gap, return an empty list.
    falseCase: []
  });
  // Add any dummy images and the current image to the list.
  return ee.List(list).cat(blankImages).add(current);
};
// The first image is the starting image.
var first = filteredLandsat.first();
// The first image is duplicated in this list, so slice it off.
var filled = ee.List(filteredLandsat.iterate(fill, [first])).slice(1);
// Now, map a function over this list to do the prediction.
var indices = ee.List.sequence(5, filled.length().subtract(1));
// A function to forecast from the previous two images.
var forecast = function(current, list) {
  var ndvi = ee.Image(current).select('NDSSI');
  // Get the t-1 and t-2 images.
  var size = ee.List(list).size();
  var image1 = ee.Image(ee.List(list).get(size.subtract(1)));
  var image2 = ee.Image(ee.List(list).get(size.subtract(2)));
  var predicted = ee.Image().expression('beta0 + beta1 * p1 + beta2 * p2', {
      p1: image1.select('NDSSI'),
      p2: image2.select('NDSSI'),
      beta0: arCoefficients.select('constant'),
      beta1: arCoefficients.select('NDSSI_1'),
      beta2: arCoefficients.select('NDSSI_2')
  }).rename('NDSSI')
      .set('system:time_start', current.get('system:time_start'));
  // Replace the entire image if it's a dummy.
  var replaced = ee.Algorithms.If({
    condition: current.get('dummy'), 
    trueCase: predicted, 
    // Otherwise replace only masked pixels.
    falseCase: current.addBands({
      srcImg: ndvi.unmask().where(ndvi.mask().not(), predicted).rename('NDSSI'),
      overwrite: true
    })
  });
  // Add the predicted image to the list.
  return ee.List(list).add(replaced);
};
// Start at a point in the sequence with three consecutive real images.
var startList = filled.slice(4, 5);
// Iterate over the filled series to replace dummy images with predictions.
var modeled = ee.ImageCollection.fromImages(
  ee.ImageCollection(filled).iterate(forecast, startList)).select('NDSSI');
var NDSSIChart6 = ui.Chart.image.series(
  modeled, point, ee.Reducer.mean(), 30)
    .setSeriesNames(['NDSSI'])
    .setOptions({
      title: 'forecast',
      lineWidth: 1,
      pointSize: 3,
});
panel.widgets().set(7, NDSSIChart6);
/////////////////////////////////////////////////
  // Create an RGB spectrum chart.
   var rgbChart = ui.Chart.image.series(rgb, point)
      .setOptions({
        title: 'RGB Reflectance Over Time',
        vAxis: {title: 'band value'},
        hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
       });
   panel.widgets().set(8, rgbChart);
});
///////////////////////////////////////////
Map.setOptions('HYBRID');
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);