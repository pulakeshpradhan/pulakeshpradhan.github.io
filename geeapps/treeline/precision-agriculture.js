var dataset = ee.ImageCollection('USDA/NASS/CDL').aside(print);
// Get the date range of images in the imported collection.
var range = dataset.reduceColumns(ee.Reducer.minMax(), ["system:time_start"]);
print('Entire date range: ', ee.Date(range.get('min')), ee.Date(range.get('max')));
var cropLandcover = dataset.filter(ee.Filter.date('2018-01-01', '2018-12-31'));
// Get the date range of images in the imported collection.
var range2 = cropLandcover.reduceColumns(ee.Reducer.minMax(), ["system:time_start"]);
print('Selected date range: ', ee.Date(range2.get('min')), ee.Date(range2.get('max')));
print(cropLandcover);
Map.setCenter(-100.55, 40.71, 4);
Map.addLayer(cropLandcover.first().select('cropland'), {}, 'Crop Landcover in 2018');
var dataset = ee.ImageCollection('NASA/ORNL/DAYMET_V3')
                  .filter(ee.Filter.date('2017-04-01', '2017-04-30')).aside(print);
var maximumTemperature = dataset.select('tmax');
var maximumTemperatureVis = {
  min: 30,
  max: 32,
  palette: ['1621A2', 'white', 'cyan', 'green', 'yellow', 'orange', 'red'],
};
Map.setCenter(-110.21, 35.1, 4);
Map.addLayer(maximumTemperature, maximumTemperatureVis, 'Maximum Temperature', true);
var dataset = ee.FeatureCollection('USGS/WBD/2017/HUC10');
var styleParams = {
  fillColor: 'ffffff',
  color: 'ff0000',
  width: 6,
};
var watersheds = dataset.style(styleParams);
Map.setCenter(-96.8, 40.43, 9);
Map.addLayer(watersheds, {opacity: 0.5}, 'USGS/WBD/2017/HUC10');
var dataset = ee.FeatureCollection('USGS/WBD/2017/HUC12');
var styleParams = {
  fillColor: 'ffffff',
  color: '0000ff',
  width: 3,
};
var subwatersheds = dataset.style(styleParams);
Map.setCenter(-96.8, 40.43, 10);
Map.addLayer(subwatersheds, {opacity: 0.5}, 'USGS/WBD/2017/HUC12');
Map.setCenter(-85.422, 31.1871, 12);
Map.setOptions("hybrid");