var dataset = ee.Image('CSP/ERGo/1_0/Global/SRTM_mTPI');
var countries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
var Thailand = countries.filter(ee.Filter.eq('country_na', 'Thailand'));
Map.addLayer(Thailand, {}, "Thailand", false);
var srtmMtpi = dataset.select('elevation');
var srtmMtpiVis = {
  min: -200.0,
  max: 200.0,
  palette: ['0b1eff', '4be450', 'fffca4', 'ffa011', 'ff0000'],
};
Map.setCenter(-105.8636, 40.3439, 11);
Map.addLayer(srtmMtpi.clip(Thailand), srtmMtpiVis, 'SRTM mTPI');
Map.centerObject(Thailand, 6);