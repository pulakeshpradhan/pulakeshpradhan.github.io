// Cuencas
var watersheds = ee.FeatureCollection('WWF/HydroSHEDS/v1/Basins/hybas_6');
var cuencaVal = watersheds.filter(ee.Filter.eq("PFAF_ID", 662104))
Map.setOptions("SATELLITE")
Map.centerObject(cuencaVal, 10)
// Map.addLayer(cuencaVal)
var visualization = {
  color: '808080',
  strokeWidth: 1
};
cuencaVal = cuencaVal.draw(visualization);
// Map.addLayer(cuencaVal, null, 'Basins', 0);
// create mask for valdivia
// print(cuencaVal)
var maskVal = cuencaVal.select('vis-red').gt(0)
// Flujos
var dataset = ee.Image('WWF/HydroSHEDS/15ACC');
var flowAccumulation = dataset.select('b1');
var flowAccumulationVis = {
  min: 0.0,
  max: 500.0,
  palette: [
    '000000', '023858', '006837', '1a9850', '66bd63', 'a6d96a', 'd9ef8b',
    'ffffbf', 'fee08b', 'fdae61', 'f46d43', 'd73027'
  ],
};
Map.addLayer(flowAccumulation.mask(maskVal), flowAccumulationVis, 'Flow Accumulation');
// Cuerpos de agua
var dataset = ee.ImageCollection('GLCF/GLS_WATER');
var water = dataset.select('water').mean();
var waterVis = {
  min: 1.0,
  max: 4.0,
  palette: ['fafafa', '00c5ff', 'df73ff', '828282', 'cccccc'],
};
print(water)
var land = water.eq(1).subtract(1).multiply(-1).mask(maskVal)
Map.addLayer(water.mask(maskVal).mask(land), waterVis, 'Water');
// Zonas urbanas
var getUrb = function(ini, end){
  return ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filterDate(ini, end)
  .mean()
  .gt(0.10)
  .multiply(100010)
  .select("built")
  .selfMask()
  .int()
}
var ur2016 = getUrb("2016-01-01", "2017-01-01")
var ur2017 = getUrb("2017-01-01", "2018-01-01")
var ur2018 = getUrb("2018-01-01", "2019-01-01")
var ur2019 = getUrb("2019-01-01", "2020-01-01")
var ur2020 = getUrb("2020-01-01", "2021-01-01")
var ur2021 = getUrb("2021-01-01", "2022-01-01")
// print(ur2021)
// Map.addLayer(ur2021, {palette: ["black", "white"], min:-10, max: 1}, "Urban", 1)
var cte = ee.Image.constant(1).mask(maskVal).mask(ur2021.mask(maskVal))
Map.addLayer(cte, {palette: ["black", "white"], min: 0, max: 1}, "Urban", 1)