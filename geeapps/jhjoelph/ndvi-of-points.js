var regions = ee.FeatureCollection([
  ee.Feature(
    ee.Geometry.Point(-65.93301296265987, -17.276870278817547), {label: 'Point 1'}),
  ee.Feature(
    ee.Geometry.Point(-65.84924221070675, -17.25195334020588), {label: 'Point 2'}),
  ee.Feature(
    ee.Geometry.Point(-65.93026638062862, -17.305717260739826), {label: 'Point 3'}),
  ee.Feature(
    ee.Geometry.Point(-65.96597194703487, -17.202109370714695), {label: 'Ponit 4'}),
  ]);
var dataset = ee.ImageCollection("COPERNICUS/S2_SR")
              .filter(ee.Filter.date('2019-07-01', '2019-12-31'))
              .filter(ee.Filter.lt("CLOUDY_PIXEL_PERCENTAGE", 30))
              .filterBounds(regions);
Map.centerObject(regions);
Map.addLayer(regions, {color: 'green', opacity: 0.5}, 'Points');
//var ft = ee.FeatureCollection(ee.List([]));
//var fill = function (img, ini ){
//  var inift = ee.FeatureCollection (ini);
//  var mosaic = dataset.mosaic();
//  var ndvi = mosaic.normalizedDifference(['B8','B4']);
//  var ft2 = ndvi.reduceRegions(pts, ee.Reducer.first(),20);
//  var date = img.date().format();
//  var ft3 = ft2.map(function (f){return f.set("date", date)});
//  return inift.merge(ft3);
//};
//var newft = ee.FeatureCollection(dataset.iterate(fill,ft));
//Export.table.toDrive(newft, "lai_data_description", "lai_data_folder", "Lai_data_name");
//Calculate NDVI of dataset images
var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
  return image.addBands(ndvi);
};
var withNDVI = dataset.map(addNDVI);
var reducer = ee.Reducer.mean();
// Time series chart settings.
var tempTimeSeries = ui.Chart.image.seriesByRegion(
    withNDVI.select('NDVI'), regions, reducer, 'NDVI', 10, 'system:time_start','label')
        .setChartType('ScatterChart')
        .setOptions({
          title: 'NDVI for points',
          vAxis: {title: 'NDVI'},
          hAxis: {title: 'Date', format: 'dd-MM-yy', gridlines: {count: 7}},
          lineWidth: 1,
          pointSize: 4,
          series: {
            0: {color: '008744'}, // Point 1
            1: {color: '0057e7'}, // Point 2
            2: {color: 'd62d20'},  // Point 3
            3: {color: 'ffa700'}, //Point 4
}});
// Display.
print("Data set: ", withNDVI);
print(tempTimeSeries);