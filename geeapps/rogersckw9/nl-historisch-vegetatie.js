var collection = ee.ImageCollection("users/rogersckw9/vegetatie-voorspelling-yearly-classification/Landsat-monthly-composite-classified-rhine-uiterwaard"),
    uiterwaard = ee.FeatureCollection("users/rogersckw9/vegetatie-uiterwaard/uiterwaard-indeling-rvdr-2002-wgs84"),
    imageCollection2 = ee.ImageCollection("users/rogersckw9/vegetatie-voorspelling-yearly-classification/best-classified-images-1984-2018-rhine-uiterwaard"),
    leggerImage = ee.Image("users/rogersckw9/vegetatie-voorspelling-improved/legger-image"),
    roughnessChange = ee.Image("users/rogersckw9/vegetatie-voorspelling-yearly-classification/roughness-change-per-polygon-1984-2018"),
    imageCollection = ee.ImageCollection("users/rogersckw9/vegetatie-voorspelling-yearly-classification/Sentinel-monthly-composite-classified-rhine-uiterwaard"),
    ecotoopCollection = ee.ImageCollection("users/rogersckw9/ecotoop/ecotoop-maps");
var animation = require('users/gena/packages:animation');
var utils = require('users/gena/packages:utils');
var palettes = require('users/gena/packages:palettes');
Map.centerObject(uiterwaard)
var styleLanduse = 
  '<RasterSymbolizer>' +
    '<ColorMap  type="values">' +
      '<ColorMapEntry color="#BDEEFF" quantity="1" label="Water" opacity="1" />' +
      '<ColorMapEntry color="#FF817E" quantity="2" label="Verhard oppervlak" opacity="1" />' +
      '<ColorMapEntry color="#EEFAD4" quantity="3" label="Gras en Akker" opacity="1" />' +
      '<ColorMapEntry color="#DEBDDE" quantity="4" label="Riet en Ruigte" opacity="1" />' +
      '<ColorMapEntry color="#73BF73" quantity="5" label="Bos" opacity="1" />' +
      '<ColorMapEntry color="#D97A36" quantity="6" label="Struweel" opacity="1" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
// var startDate = ee.Date('2013-01-01')
// var endDate = ee.Date('2018-01-01')
// Map.addLayer(leggerImage.sldStyle(styleLanduse), {}, 'Legger')
var years = ee.List.sequence(1984, 2018, 1).remove(2012).getInfo()
var excludeL7 = collection.filterMetadata('mission', 'not_equals', 'L7')//.merge(imageCollection)
// print(excludeL7)
var bestImages = years.map(function(year){
  var saveDate = ee.Date.fromYMD(year, 06, 01)
  var startDate = ee.Date.fromYMD(year, 01, 01)
  var endDate = ee.Date.fromYMD(year, 12, 01)
  var yearImage = ee.Image(excludeL7.filterDate(startDate, endDate).sort('accuracyValidation', false).first())
  return yearImage.set({
    label: ee.Date(yearImage.date()).format('YYYY-MM-dd'),
    mission: yearImage.get('mission'),
    composite_type: yearImage.get('composite_type'),
    'system:time_start': yearImage.get('system:time_start'),
    accuracyValidation: yearImage.get('accuracyValidation'),
    accuracyTraining: yearImage.get('accuracyTraining'), 
    numImages: yearImage.get('numImages')
  }).remap([0, 1, 2, 3, 4, 5], [1, 2, 3, 4, 5, 6])
})
var roughnessImages = bestImages.map(function(i){
  return i.remap([1, 2, 3, 4, 5, 6], [0.0, 0.15, 0.39, 1.45, 12.84, 24.41])
})
var roughnessEcotoop = ecotoopCollection.map(function(i){
  return i.remap([1, 2, 3, 4, 5, 6], [0.0, 0.15, 0.39, 1.45, 12.84, 24.41])
})
var displayImages = bestImages.map(function(i){
  return i.sldStyle(styleLanduse).set({
    label: ee.Date(i.date()).format('YYYY-MM-dd')
  });
})
var roughnessDisplayImages = roughnessImages.map(function(i) {
  var image = i.updateMask(i.neq(0))
  return image.visualize({min: 0, max: 25, palette: palettes.colorbrewer.YlOrBr[9]})
    .set({ label: ee.Date(i.date()).format('YYYY-MM-dd') })
})
// var display2018 = ee.ImageCollection(bestImages).filterDate('2018-01-01', '2019-01-01').first()
// Map.addLayer(display2018.sldStyle(styleLanduse), {}, '2018', false)
function timeseries_chart(feature, imageCollection, scale){
  var result = imageCollection.map(function(i){
    var histo = i.reduceRegion({
      reducer: ee.Reducer.fixedHistogram(1, 7, 6).unweighted(),
      geometry: feature.geometry(),
      scale: scale
    })
    var dict = ee.Dictionary(histo).get('remapped')
    var pxCounts = ee.Array(dict)
    return i.set({
      'water': pxCounts.get([0,1]),
      'verhard': pxCounts.get([1,1]),
      'gras&akker': pxCounts.get([2,1]),
      'riet&ruigte': pxCounts.get([3,1]),
      'bos': pxCounts.get([4,1]),
      'struweel': pxCounts.get([5,1])
    })
  })
  var options = {
    title: 'Number of pixels per class within geometry, 1984-2018',
    hAxis: {title: 'Date'},
    vAxis: {title: 'Number of pixels in geometry'},
    series: {
      0: {color: '#80b1d3', pointSize: 5, lineWidth: 2},
      1: {color: '#FF817E', pointSize: 5, lineWidth: 2},
      2: {color: '#b3de69', pointSize: 5, lineWidth: 2},
      3: {color: '#bc80bd', pointSize: 5, lineWidth: 2},
      4: {color: '#73BF73', pointSize: 5, lineWidth: 2},
      5: {color: '#b15928', pointSize: 5, lineWidth: 2}
    }
  };
  var chart = ui.Chart.feature.byFeature(result, 'system:time_start', ['water', 'verhard', 'gras&akker', 'riet&ruigte', 'bos', 'struweel'])
    .setOptions(options)
  return chart;
}
function timeseries_roughness_chart(feature, imageCollection, classesCollection, scale){
// var result = imageCollection.map(function(i){
//     var histo = i.reduceRegion({
//       reducer: ee.Reducer.mean(),
//       geometry: feature.geometry(),
//       scale: scale
//     })
  // var roughnessCollection = imageCollection.map(function(i){
    // var date = i.date()
    // classesCollection = classesCollection.map(function(j){
    //   return j
    //     .set('time_diff', j.date().difference(date, 'month').abs())
    // })
    // var classesImage = ee.Image(classesCollection.sort('time_diff').first())
    // return i.addBands(classesImage)
  // })
  // roughnessEcotoop = roughnessEcotoop.map(function(i){
  //   return i.addBands(classesImage).set('system:time_start', ee.Date(i.get('system:time_start')));
  // }).select(['remapped', 'type'], ['ecotoop', 'type']);
  imageCollection = ee.ImageCollection(imageCollection).merge(classesCollection.select(['remapped'], ['ecotoop']))
  print(imageCollection)
  var options = {
    title: 'Mean roughness value (k-waarde) of region, 1984-2018',
    hAxis: {title: 'Date'},
    vAxis: {title: 'Roughness k-waarde'},
    series: {
      0: {pointSize: 5, lineWidth: 0, labelInLegend: 'Ecotoop'},
      1: {pointSize: 5, lineWidth: 0, labelInLegend: 'Classified'}
    },
    trendlines: {
      1: {
        color: '#27AE60',
        pointSize: 0,
        lineWidth: 2,
        labelInLegend: 'Trend',
        visibleInLegend: true
      }
    }
  };
  var chart = ui.Chart.image.series(imageCollection, feature.geometry(), ee.Reducer.mean(), scale)
    .setOptions(options)
  return chart;
}
// var meanImage = ee.ImageCollection(bestImages).reduce(ee.Reducer.mean())
// var stdDevImage = ee.ImageCollection(bestImages).filterDate(startDate, endDate).reduce(ee.Reducer.stdDev())
// var stdDevMean = stdDevImage.reduceRegions({
//   collection: uiterwaard, 
//   reducer: ee.Reducer.mean(),
//   scale: 30
// })
// Create an empty image into which to paint the features, cast to byte.
// var stdDevMeanImage = ee.Image().float().paint(stdDevMean, 'mean')
// var palette = palettes.colorbrewer.RdYlGn[9].reverse();
// Map.addLayer(stdDevImage, {palette: palette}, 'std Dev', false)
// Map.addLayer(stdDevMeanImage, {min:0, max:0.6, palette: palette}, 'stdDev aggregated', false);
// Map.addLayer(outline.randomVisualizer(), {}, 'classes (raster)')
// This function adds a time band to the image.
// var createTimeBand = function(image) {
//   // Scale milliseconds by a large constant to avoid very small slopes
//   // in the linear regression output.
//   return image.addBands(image.metadata('system:time_start').divide(1e18));
// };
// var roughnessImagesTime = ee.ImageCollection(roughnessImages.map(createTimeBand));
// // print(roughnessImagesTime)
// // Reduce the collection with the linear fit reducer.
// // Independent variable are followed by dependent variables.
// var linearFit = roughnessImagesTime.select(['system:time_start', 'remapped'])
//   .reduce(ee.Reducer.linearFit());
// var offset = linearFit.select('offset')
// var scale = linearFit.select('scale').divide(3.154e10)
var rdBlPalette = palettes.colorbrewer.RdBu[9].reverse();
// Map.addLayer(linearFit, {min: 0, max: [-1, 8e-5, 1], bands: ['scale', 'offset', 'scale'], palette: ['green', 'yellow', 'red']}, 'fit');
// Map.addLayer(scale, {min: -1e-5, max: 1e-5, palette: rdBlPalette}, 'Roughness Change', false)
// var scaleMean = ee.Image(scale).reduceRegions({
//   collection: uiterwaard, 
//   reducer: ee.Reducer.mean(),
//   scale: 30
// })
// var scaleMeanImage = ee.Image().float().paint(scaleMean, 'mean')
// Map.addLayer(scaleMeanImage, {min: -0.5e-4, max: 0.5e-4, palette: rdBlPalette}, 'Roughness Change per Polygon')
Map.addLayer(roughnessChange, {min: -0.5e-4, max: 0.5e-4, palette: rdBlPalette}, 'Roughness Change per Polygon')
// Export.image.toAsset({
//   image: scaleMeanImage,
//   scale:30,
//   assetId:'vegetatie-voorspelling-test-classification/roughness-change-per-polygon-1984-2018',
//   description: 'roughness-change-per-polygon-1984-2018',
//   maxPixels:1e10
// });
Map.addLayer(uiterwaard, {}, 'uiterwaard', true, 0.25)
var selection = ee.FeatureCollection([]);
var selectionLayer = ui.Map.Layer(selection, {color: '#000000'}, 'selected polygon (click)', true, 0.5);
Map.layers().add(selectionLayer);
var panelCharts = ui.Panel();
var panelMain = ui.Panel([panelCharts]);
panelMain.style().set({
  'background-color': '#fafafa',
  'position': 'bottom-right',
  'width': '600px',
  // 'height': '277px'
  'height': '477px'
});
panelCharts.style().set({
  'background-color': '#fafafa',
});
Map.widgets().add(panelMain);
panelCharts.add(ui.Label('Click on a region in the map ...'));
Map.onClick(function(pt) {
  pt = ee.Geometry.Point(ee.Dictionary(pt).values().reverse());
  var selection = ee.Feature(uiterwaard.filterBounds(pt).first());
  var timeChart = timeseries_chart(selection, bestImages, 30)
  var roughChart = timeseries_roughness_chart(selection, roughnessImages, roughnessEcotoop, 30)
  panelCharts.clear();
  panelCharts.add(timeChart);
  panelCharts.add(roughChart)
  selectionLayer.setEeObject(selection);
});
// animation.animate(roughnessDisplayImages, {label: 'label', maxFrames: 40})
// animation.animate(displayImages, {label: 'label', maxFrames: 40});
// utils.exportVideo(displayImages, {label: 'label'});