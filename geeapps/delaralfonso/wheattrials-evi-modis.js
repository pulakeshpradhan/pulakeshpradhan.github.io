var geometry = ee.FeatureCollection("users/delaralfonso/DIFM/2019-20_UNL_Wheat_Trials");
var newDate = new Date();
var dateto = ee.Date(newDate);
var datefrom = dateto.advance(-120, 'day');
///////////////////////////////////////////////////////////
var collectionNDVI = ee.ImageCollection('MODIS/006/MOD13Q1')
                .filterDate(datefrom ,dateto)
                .filterBounds(geometry)
                .select("EVI");
var aoi= geometry.geometry().bounds()
var NDVI = collectionNDVI.select(['EVI']).max().clip(aoi)
print(NDVI)
var stat = NDVI.reduceRegion({
    reducer: ee.Reducer.stdDev().combine(ee.Reducer.mean(), '', true),
    geometry: NDVI.geometry(),
    scale: 250,
    maxPixels: 1e9
  })
print(stat)
stat.evaluate(function (stats) {
    var stdDev = stats.EVI_stdDev
    var min = stats.EVI_mean - stats.EVI_stdDev *2
    var max = stats.EVI_mean + stats.EVI_stdDev *2
    var visParams = {
      min: min,
      max: max,
      palette: ['red', 'yellow', 'green']
    }
    Map.addLayer(NDVI, visParams, "max EVI")
})
//var nbrParams = {min: 1, max: 3000, palette: ['red', 'yellow', 'green']};
//Map.addLayer(NDVI,nbrParams, "maxNDVI COMBINED")
///////////////////////////////////////////////////////////
// Create a time series chart.
var NDVITimeSeries = ui.Chart.image.seriesByRegion(
    collectionNDVI, geometry, ee.Reducer.mean(), 'EVI', 250, 'system:time_start', 'Id')
        .setChartType('LineChart')
        .setOptions({
          title: 'UNL 2020 Wheat - Trials EVI Temporal Series (MODIS)',
          curveType: 'function',
          vAxis: {title: 'EVI'},
          lineWidth: 1,
          pointSize: 4,
          interpolateNulls: true,
          width:900,height:500
        })
        ;
//ui.root.clear();
ui.root.add(NDVITimeSeries);
var empty = ee.Image().byte();
var outlinearea = empty.paint({
  featureCollection: geometry.geometry().buffer(1000),
  color: 1,
  width: 3
});
Map.addLayer(outlinearea, {palette: 'FF0000'}, 'AOI');
Map.centerObject(geometry,9)
var outlinetrial = empty.paint({
  featureCollection: geometry,
  color: 2,
  width: 3
});
Map.addLayer(outlinetrial, {}, 'Trials');