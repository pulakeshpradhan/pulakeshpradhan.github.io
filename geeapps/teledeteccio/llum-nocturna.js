var dataset = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMCFG')
                  .filter(ee.Filter.date('2019-12-01', '2019-12-31'));
var nighttime = dataset.select('avg_rad');
var nighttimeVis = {min: 0.0, max: 60.0};
Map.setCenter(8.42, 42.92, 4);
Map.addLayer(nighttime, nighttimeVis, 'Nighttime');