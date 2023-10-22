var dataset = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
                  .filter(ee.Filter.date('2019-01-01', '2019-12-31'));
// var palette = ['000000', 'fff0b2', 'fff68f', 'ffb948', 'ffa500'];
var country_names = ["India"];
// import the country feasture collection
var countries = ee.FeatureCollection('ft:1tdSwUL7MVpOauSgRzqVTOwdfy17KDbw-1d9omPw');
// find the countries in the country list
var country = countries.filter(ee.Filter.inList('Country', country_names));
// Get the geometry of the countries
var region = country.geometry();
var boxcar = ee.Kernel.square({
  radius: 2, units: 'pixels', normalize: true
});
dataset = dataset.sum()
dataset = dataset.clip(region)
// dataset = dataset.convolve(boxcar)
var nighttimeLights = dataset.select('avg_rad');
var palettes = require('users/gena/packages:palettes');
var palette = palettes.crameri.lajolla[50].reverse();
var nighttimeLightsVis = {
  min: 1,
  max: 700,
  palette: palette,
};
Map.setCenter(77.6775, 12.7154,10);
Map.addLayer(nighttimeLights, nighttimeLightsVis, 'Nighttime Lights 2019',true,0.9);
dataset = ee.ImageCollection('NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG')
                  .filter(ee.Filter.date('2018-01-01', '2018-12-31'));
print(dataset)
dataset = dataset.sum()
dataset = dataset.clip(region)
// dataset = dataset.convolve(boxcar)
var nighttimeLights = dataset.select('avg_rad');
Map.addLayer(nighttimeLights, nighttimeLightsVis, 'Nighttime Lights 2018',true,0.9);