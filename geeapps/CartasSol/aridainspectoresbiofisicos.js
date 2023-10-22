/// Coleções de dados
//Coleção landsat 5 SR
var l5SR = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
//Coleção landsat 7 TOA
var l7toa = ee.ImageCollection("LANDSAT/LE07/C01/T1_TOA");
//print(l7toa.limit(5))        
//Coleção landsat 8 TOA
var l8toa = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA");
//Coleção landsat Modis
var modis=ee.ImageCollection("MODIS/006/MOD13Q1");
//Coleção landsat Sentinel
var dSentinel = ee.ImageCollection('COPERNICUS/S2');
//print(dSentinel.limit(5))
//Inclui Logo
var logos = require('users/CartasSol/package:Arida/EXEINI').Aridas;
// This field contains UNIX time in milliseconds.
var timeField = 'system:time_start';
//// Use this function to mask clouds in Sentinel 2 imagery.
//var makssentinel= function(image) {
//  var qa = image.select('QA60');
//  // Bits 10 and 11 are clouds and cirrus, respectively.
//  var cloudBitMask = 1 << 10;
//  var cirrusBitMask = 1 << 11;
//  // Both flags should be set to zero, indicating clear conditions.
//  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
//      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
//  return image.updateMask(mask).divide(10000);
//};
// Use this function to mask clouds in Landsat 8 imagery.
var maskClouds = function(image) {
  var quality = image.select('BQA');
  var cloud01 = quality.eq(61440);
  var cloud02 = quality.eq(53248);
  var cloud03 = quality.eq(28672);
  var mask = cloud01.or(cloud02).or(cloud03).not();
  return image.updateMask(mask);
};
// Use this function to mask clouds in Landsat 5 SR imagery.
var cloudMaskL5 = function(image) {
  var qa = image.select('pixel_qa');
  // If the cloud bit (5) is set and the cloud confidence (7) is high
  // or the cloud shadow bit is set (3), then it's a bad pixel.
  var cloud = qa.bitwiseAnd(1 << 5)
                  .and(qa.bitwiseAnd(1 << 7))
                  .or(qa.bitwiseAnd(1 << 3));
  // Remove edge pixels that don't occur in all bands
  var mask2 = image.mask().reduce(ee.Reducer.min());
  return image.updateMask(cloud.not()).updateMask(mask2);
};
// Use this function to add variables for NDVI, time and a constant
// to Landsat 8 imagery.
var addVariables = function(image) {
  // Compute time in fractional years since the epoch.
  var date = ee.Date(image.get(timeField));
  var years = date.difference(ee.Date('1970-01-01'), 'year');
  // Return the image with the added bands.
  return image
    // Add an NDVI band.
    .addBands(image.normalizedDifference(['B5', 'B4']).rename('NDVI')).float()
    // Add a time band.
    .addBands(ee.Image(years).rename('t').float())
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};
// Use this function to add variables for NDVI, time and a constant
// to Landsat 7 imagery.
var addVariables7 = function(image) {
  // Compute time in fractional years since the epoch.
  var date = ee.Date(image.get(timeField));
  var years = date.difference(ee.Date('1970-01-01'), 'year');
  // Return the image with the added bands.
  return image
    // Add an NDVI band.
    .addBands(image.normalizedDifference(['B4', 'B3']).rename('NDVI')).float()
    // Add a time band.
    .addBands(ee.Image(years).rename('t').float())
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};
// Use this function to add variables for NDVI, time and a constant
// to Landsat 5 imagery.
var addVariables5 = function(image) {
  // Compute time in fractional years since the epoch.
  var date = ee.Date(image.get(timeField));
  var years = date.difference(ee.Date('1970-01-01'), 'year');
  // Return the image with the added bands.
  return image
    // Add an NDVI band.
    .addBands(image.normalizedDifference(['B4', 'B3']).rename('NDVI')).float()
    // Add a time band.
    .addBands(ee.Image(years).rename('t').float())
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};
// Use this function to add variables for NDVI, time and a constant
// to Modis imagery.
var addVariablesM = function(image) {
  // Compute time in fractional years since the epoch.
  var date = ee.Date(image.get(timeField));
  var years = date.difference(ee.Date('1970-01-01'), 'year');
  // Return the image with the added bands.
  return image
    // Add an NDVI band.
    .addBands(image.select(['NDVI']).rename('NDVI')).float()
    // Add a time band.
    .addBands(ee.Image(years).rename('t').float())
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};
// Use this function to add variables for NDVI, time and a constant
// to Sentinel imagery.
var addVariablesS = function(image) {
  // Compute time in fractional years since the epoch.
  var date = ee.Date(image.get(timeField));
  var years = date.difference(ee.Date('1970-01-01'), 'year');
  // Return the image with the added bands.
  return image
    // Add an NDVI band.
    .addBands(image.normalizedDifference(['B8', 'B4']).rename('NDVI')).float()
    // Add a time band.
    .addBands(ee.Image(years).rename('t').float())
    // Add a constant band.
    .addBands(ee.Image.constant(1));
};
////////////////////////// GUI p/ ferramenta
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.add(logos);
panel.style().set({ 'width': '500px',
                   'padding': '2px'//,
                   //'stretch': 'horizontal'
});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Worspace Arida - Inspetor de descritores biofísicos',
    style: {fontSize: '15px', fontWeight: 'bold'}
  }),
  ui.Label('Clique para inspeção')
]);
panel.add(intro);
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
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(1, dot);
/////collection data  
// Remove clouds L5, add variables and filter to the area of interest.
var filteredLandsat5 = l5SR
  .filterBounds(point)
  .map(cloudMaskL5)
  .map(addVariables);
// Remove clouds L8, add variables and filter to the area of interest.
var filteredLandsat = l8toa
  .filterBounds(point)
  .map(maskClouds)
  .map(addVariables);
// Remove clouds L7, add variables and filter to the area of interest.
var filteredLandsat7 = l7toa
  .filterBounds(point)
  .map(maskClouds)
  .map(addVariables7);
// mODIS, add variables and filter to the area of interest.
var filteredLandsatM = modis
  .filterBounds(point)
  //.map(maskClouds)
  .map(addVariablesM);
  //print("Modis",filteredLandsatM)
// Remove Sentinel add variables and filter to the area of interest.
var filteredLandsatS = dSentinel
  .filterBounds(point)
  //.map(makssentinel)
  .map(addVariablesS);  
//print(filteredLandsatS)
// Linear trend ----------------------------------------------------------------
// List of the independent variable names
var independents = ee.List(['constant', 't']);
// Name of the dependent variable.
var dependent = ee.String('NDVI');
// Compute a linear trend L8.  This will have two bands: 'residuals' and 
// a 2x1 band called coefficients (columns are for dependent variables).
var trend = filteredLandsat.select(independents.add(dependent))
    .reduce(ee.Reducer.linearRegression(independents.length(), 1));
// Map.addLayer(trend, {}, 'trend array image');
// Compute a linear trend L7.  This will have two bands: 'residuals' and 
// a 2x1 band called coefficients (columns are for dependent variables).
var trend5 = filteredLandsat5.select(independents.add(dependent))
    .reduce(ee.Reducer.linearRegression(independents.length(), 1));
// Map.addLayer(trend, {}, 'trend array image');
// Compute a linear trend L7.  This will have two bands: 'residuals' and 
// a 2x1 band called coefficients (columns are for dependent variables).
var trend7 = filteredLandsat7.select(independents.add(dependent))
    .reduce(ee.Reducer.linearRegression(independents.length(), 1));
// Map.addLayer(trend, {}, 'trend array image');
// Compute a linear trend L7.  This will have two bands: 'residuals' and 
// a 2x1 band called coefficients (columns are for dependent variables).
var trendM = filteredLandsatM.select(independents.add(dependent))
    .reduce(ee.Reducer.linearRegression(independents.length(), 1));
// Map.addLayer(trend, {}, 'trend array image');
// Compute a linear trend L7.  This will have two bands: 'residuals' and 
// a 2x1 band called coefficients (columns are for dependent variables).
var trendS = filteredLandsatS.select(independents.add(dependent))
    .reduce(ee.Reducer.linearRegression(independents.length(), 1));
// Map.addLayer(trend, {}, 'trend array image');
// Flatten the coefficients into a 2-band image
var coefficients = trend.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([independents]);
  // Flatten the coefficients into a 2-band image
var coefficients5 = trend5.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([independents]);
// Flatten the coefficients into a 2-band image
var coefficients7 = trend7.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([independents]);
// Flatten the coefficients into a 2-band image
var coefficientsM = trendM.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([independents]);
// Flatten the coefficients into a 2-band image
var coefficientsS = trendS.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([independents]);
// Compute a de-trended series.
var detrended = filteredLandsat.map(function(image) {
  return image.select(dependent).subtract(
          image.select(independents).multiply(coefficients).reduce('sum'))
          .rename(dependent)
          .copyProperties(image, [timeField]);
});
// Compute a de-trended series.
var detrended5 = filteredLandsat5.map(function(image) {
  return image.select(dependent).subtract(
          image.select(independents).multiply(coefficients5).reduce('sum'))
          .rename(dependent)
          .copyProperties(image, [timeField]);
});
// Compute a de-trended series.
var detrended7 = filteredLandsat7.map(function(image) {
  return image.select(dependent).subtract(
          image.select(independents).multiply(coefficients7).reduce('sum'))
          .rename(dependent)
          .copyProperties(image, [timeField]);
});
// Compute a de-trended series.
var detrendedM = filteredLandsatM.map(function(image) {
  return image.select(dependent).subtract(
          image.select(independents).multiply(coefficientsM).reduce('sum'))
          .rename(dependent)
          .copyProperties(image, [timeField]);
});
// Compute a de-trended series.
var detrendedS = filteredLandsatS.map(function(image) {
  return image.select(dependent).subtract(
          image.select(independents).multiply(coefficientsS).reduce('sum'))
          .rename(dependent)
          .copyProperties(image, [timeField]);
});
// Harmonic trend ----------------------------------------------------------------
// Use these independent variables in the harmonic regression L8.
var harmonicIndependents = ee.List(['constant', 't', 'cos', 'sin']);
// Use these independent variables in the harmonic regression L8.
var harmonicIndependents5 = ee.List(['constant', 't', 'cos', 'sin']);
// Use these independent variables in the harmonic regression L7.
var harmonicIndependents7 = ee.List(['constant', 't', 'cos', 'sin']);
// Use these independent variables in the harmonic regression L7.
var harmonicIndependentsM = ee.List(['constant', 't', 'cos', 'sin']);
// Use these independent variables in the harmonic regression L7.
var harmonicIndependentsS = ee.List(['constant', 't', 'cos', 'sin']);
// Add harmonic terms as new image bands L8.
var harmonicLandsat = filteredLandsat.map(function(image) {
  var timeRadians = image.select('t').multiply(2 * Math.PI);
  return image
    .addBands(timeRadians.cos().rename('cos'))
    .addBands(timeRadians.sin().rename('sin'));
});
// Add harmonic terms as new image bands L7.
var harmonicLandsat5 = filteredLandsat5.map(function(image) {
  var timeRadians = image.select('t').multiply(2 * Math.PI);
  return image
    .addBands(timeRadians.cos().rename('cos'))
    .addBands(timeRadians.sin().rename('sin'));
});
// Add harmonic terms as new image bands L7.
var harmonicLandsat7 = filteredLandsat7.map(function(image) {
  var timeRadians = image.select('t').multiply(2 * Math.PI);
  return image
    .addBands(timeRadians.cos().rename('cos'))
    .addBands(timeRadians.sin().rename('sin'));
});
// Add harmonic terms as new image bands Modis.
var harmonicLandsatM = filteredLandsatM.map(function(image) {
  var timeRadians = image.select('t').multiply(2 * Math.PI);
  return image
    .addBands(timeRadians.cos().rename('cos'))
    .addBands(timeRadians.sin().rename('sin'));
});
// Add harmonic terms as new image bands Sentinel.
var harmonicLandsatS = filteredLandsatS.map(function(image) {
  var timeRadians = image.select('t').multiply(2 * Math.PI);
  return image
    .addBands(timeRadians.cos().rename('cos'))
    .addBands(timeRadians.sin().rename('sin'));
});
// The output of the regression reduction is a 4x1 array image L8.
var harmonicTrend = harmonicLandsat
  .select(harmonicIndependents.add(dependent))
  .reduce(ee.Reducer.linearRegression(harmonicIndependents.length(), 1));
  // The output of the regression reduction is a 4x1 array image L7.
var harmonicTrend5 = harmonicLandsat5
  .select(harmonicIndependents5.add(dependent))
  .reduce(ee.Reducer.linearRegression(harmonicIndependents5.length(), 1));
  // The output of the regression reduction is a 4x1 array image L7.
var harmonicTrend7 = harmonicLandsat7
  .select(harmonicIndependents7.add(dependent))
  .reduce(ee.Reducer.linearRegression(harmonicIndependents7.length(), 1));
  // The output of the regression reduction is a 4x1 array image Modis.
var harmonicTrendM = harmonicLandsatM
  .select(harmonicIndependentsM.add(dependent))
  .reduce(ee.Reducer.linearRegression(harmonicIndependentsM.length(), 1));
  // The output of the regression reduction is a 4x1 array image Sentinel.
var harmonicTrendS = harmonicLandsatS
  .select(harmonicIndependentsS.add(dependent))
  .reduce(ee.Reducer.linearRegression(harmonicIndependentsS.length(), 1));
// Turn the array image into a multi-band image of coefficients L8.
var harmonicTrendCoefficients = harmonicTrend.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([harmonicIndependents]);
// Turn the array image into a multi-band image of coefficients L5.
var harmonicTrendCoefficients5 = harmonicTrend5.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([harmonicIndependents5]);
// Turn the array image into a multi-band image of coefficients L7.
var harmonicTrendCoefficients7 = harmonicTrend7.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([harmonicIndependents7]);
// Turn the array image into a multi-band image of coefficients Modis.
var harmonicTrendCoefficientsM = harmonicTrendM.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([harmonicIndependentsM]);
// Turn the array image into a multi-band image of coefficients Sentinel.
var harmonicTrendCoefficientsS = harmonicTrendS.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([harmonicIndependentsS]);
// Compute fitted values L8.
var fittedHarmonic = harmonicLandsat.map(function(image) {
  return image.addBands(
    image.select(harmonicIndependents)
      .multiply(harmonicTrendCoefficients)
      .reduce('sum')
      .rename('fitted'));
});
// Compute fitted values L5.
var fittedHarmonic5 = harmonicLandsat5.map(function(image) {
  return image.addBands(
    image.select(harmonicIndependents5)
      .multiply(harmonicTrendCoefficients5)
      .reduce('sum')
      .rename('fitted'));
});
// Compute fitted values L7.
var fittedHarmonic7 = harmonicLandsat7.map(function(image) {
  return image.addBands(
    image.select(harmonicIndependents7)
      .multiply(harmonicTrendCoefficients7)
      .reduce('sum')
      .rename('fitted'));
});
// Compute fitted values Modis.
var fittedHarmonicM = harmonicLandsatM.map(function(image) {
  return image.addBands(
    image.select(harmonicIndependentsM)
      .multiply(harmonicTrendCoefficientsM)
      .reduce('sum')
      .rename('fitted'));
});
// Compute fitted values Sentinel.
var fittedHarmonicS = harmonicLandsatS.map(function(image) {
  return image.addBands(
    image.select(harmonicIndependentsS)
      .multiply(harmonicTrendCoefficientsS)
      .reduce('sum')
      .rename('fitted'));
});
// Plot the fitted model and the original data at the ROI- Modis.
//print(
    var ndviChartM= ui.Chart.image.series(
      fittedHarmonicM.select(['fitted','NDVI']), point, ee.Reducer.mean(), 30)
        .setSeriesNames(['NDVI', 'fitted'])
        .setOptions({
          trendlines: {0: {
            color: 'CC0000'
          }},
          title: 'Modis - NDVI',
          lineWidth: 1,
          //max: 750,
          pointSize: 3,
    });
panel.widgets().set(2, ndviChartM);
// Plot the fitted model and the original data at the ROI - L8.
//print(
    var ndviChart= ui.Chart.image.series(
      fittedHarmonic.select(['fitted','NDVI']), point, ee.Reducer.mean(), 30)
        .setSeriesNames(['NDVI', 'fitted'])
        .setOptions({
          trendlines: {0: {
            color: 'CC0000'
          }},
          title: 'Landsat 8 - NDVI',
          lineWidth: 1,
          pointSize: 3,
    });
panel.widgets().set(3, ndviChart);
// Plot the fitted model and the original data at the ROI - L7.
//print(
    var ndviChart7= ui.Chart.image.series(
      fittedHarmonic7.select(['fitted','NDVI']), point, ee.Reducer.mean(), 30)
        .setSeriesNames(['NDVI', 'fitted'])
        .setOptions({
          trendlines: {0: {
            color: 'CC0000'
          }},
          title: 'Ladsat 7 - NDVI',
          lineWidth: 1,
          pointSize: 3,
    });
panel.widgets().set(4, ndviChart7);
// Plot the fitted model and the original data at the ROI - L7.
//print(
    var ndviChart5= ui.Chart.image.series(
      fittedHarmonic5.select(['fitted','NDVI']), point, ee.Reducer.mean(), 30)
        .setSeriesNames(['NDVI', 'fitted'])
        .setOptions({
          trendlines: {0: {
            color: 'CC0000'
          }},
          title: 'Ladsat 5 SR - NDVI',
          lineWidth: 1,
          pointSize: 3,
    });
panel.widgets().set(5, ndviChart5);
// Plot the fitted model and the original data at the ROI- Modis.
//print(
    var ndviChartS= ui.Chart.image.series(
      fittedHarmonicS.select(['fitted','NDVI']), point, ee.Reducer.mean(), 10)
        .setSeriesNames(['NDVI', 'fitted'])
        .setOptions({
          trendlines: {0: {
            color: 'CC0000'
          }},
          title: 'Sentinel 2 - NDVI',
          lineWidth: 1,
          //max: 750,
          pointSize: 3,
    });
panel.widgets().set(6, ndviChartS);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);
Map.setCenter(-39.77, -8.23, 8)