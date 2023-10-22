var no2 = ui.import && ui.import("no2", "imageCollection", {
      "id": "COPERNICUS/S5P/NRTI/L3_NO2"
    }) || ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2"),
    ne = ui.import && ui.import("ne", "image", {
      "id": "users/gena/NE1_HR_LC_SR_W"
    }) || ee.Image("users/gena/NE1_HR_LC_SR_W"),
    land = ui.import && ui.import("land", "image", {
      "id": "users/gena/land_polygons_image"
    }) || ee.Image("users/gena/land_polygons_image"),
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "COPERNICUS/S5P/OFFL/L3_NO2"
    }) || ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2"),
    globalmap = ui.import && ui.import("globalmap", "table", {
      "id": "users/class9/Shareable/globalmap_rworldmap"
    }) || ee.FeatureCollection("users/class9/Shareable/globalmap_rworldmap");
/*
ref
https://code.earthengine.google.com/f4430aa189b447d5d3987345e59e4b99
https://twitter.com/gena_d/status/1246107298147287041?s=20
*/
var gl = require('users/gena/packages:gl')
var palettes = require('users/gena/packages:palettes')
var style = require('users/gena/packages:style')
var animation = require('users/gena/packages:animation')
var utils = require('users/gena/packages:utils')
//var dem = ee.Image("JAXA/ALOS/AW3D30/V2_2").select('AVE_DSM')
// var dem = ee.Image("USGS/NED")
// var weight = 1.0
// var extrusion = 30
// var sunAzimuth = 315
// var sunElevation = 15
// var contrast = 0
// var brightness = 0
// var saturation = 0.25
// var shadows = true
// var styled = ne.visualize({ gamma: 0.3, min: 0, max: 255 })
// dem = dem.unmask(0, false).multiply(land.mask())
var weight = 0.6
var extrusion = 5
var sunAzimuth = 315 + 90
var sunElevation = 5
var contrast = 0
var brightness = 0
var saturation = 0.5
var shadows = true
var styled = ne.visualize({ min: 0, max: 255 })
//dem = dem.updateMask(land.mask()).blend(ee.Image(0).float().updateMask(land.mask().not()))
//var demHillshaded = utils.hillshadeRGB(styled, dem, weight, extrusion, sunAzimuth, sunElevation, contrast, brightness, saturation, shadows)
//Map.addLayer(demHillshaded, {}, 'dem (hillshade)')
Map.setOptions('HYBRID')
// Map.setOptions('TERRAIN')
// style.SetMapStyleDark()
var no2Var = 'tropospheric_NO2_column_number_density'
// var no2Var = 'NO2_column_number_density'
// var palette = palettes.matplotlib.magma[7]
// var palette = ["#000004","#2C105C","#711F81","#B63679","#EE605E","#FDAE78","#FCFDBF"]
no2 = no2.select([no2Var, 'cloud_fraction']);
function resample(images) {
  return images.map(function(i) { return i.resample('bicubic') })
}
function maskClouds(i) {
  var mask = gl.smoothstep(0, 0.15, i.select('cloud_fraction'))
  return i.updateMask(mask)
}
function smoothen(i) {
  return i.convolve(ee.Kernel.gaussian(10000, 5000, 'meters'))
    .copyProperties(i, ['system:time_start'])
}
var no2_201904 = no2.filterDate('2019-04-01','2019-04-30')
  .map(maskClouds)
//  .map(smoothen)
  .select(no2Var)
  .median();
var no2_202004 = no2.filterDate('2020-04-01','2020-04-30')
  .map(maskClouds)
//  .map(smoothen)
  .select(no2Var)
  .median();
var no2_202005 = no2.filterDate('2020-05-01','2020-05-31')
  .map(maskClouds)
//  .map(smoothen)
  .select(no2Var)
  .median();
var no2_202005_1w = no2.filterDate('2020-05-01','2020-05-07')
  .map(maskClouds)
//  .map(smoothen)
  .select(no2Var)
  .median();
var no2_202005_2w = no2.filterDate('2020-05-08','2020-05-14')
  .map(maskClouds)
//  .map(smoothen)
  .select(no2Var)
  .median();
var no2_202005_3w = no2.filterDate('2020-05-15','2020-05-21')
  .map(maskClouds)
//  .map(smoothen)
  .select(no2Var)
  .median();
var no2_202005_4w = no2.filterDate('2020-05-22','2020-05-28')
  .map(maskClouds)
//  .map(smoothen)
  .select(no2Var)
  .median();
var no2_dif = no2_202004.subtract(no2_201904);
var no2_prop = no2_dif.divide(no2_201904).multiply(100);
var no2_dif_0405 = no2_202005.subtract(no2_201904);
var no2_prop_0405 = no2_dif_0405.divide(no2_202004).multiply(100);
// visualization
var palette1 = palettes.crameri.roma[50].slice(0).reverse().slice(20)
var vis1 = {
  min: 0.00000, max: 0.00004,
  palette: palette1
}
var palette2 = palettes.misc.coolwarm[7].reverse();
var vis2 = {
  min: -0.00001, max: 0.00001,
  palette: palette2
}
var vis3 = {
  min: -100, max: 100,
  palette: palette2
}
Map.setCenter(0, 20, 2);
Map.addLayer(no2_201904.select('tropospheric_NO2_column_number_density'),vis1, "no2_201904", false);
Map.addLayer(no2_202004.select('tropospheric_NO2_column_number_density'),vis1, "no2_202004", false);
Map.addLayer(no2_202005.select('tropospheric_NO2_column_number_density'),vis1, "no2_202005", false);
Map.addLayer(no2_202005_1w.select('tropospheric_NO2_column_number_density'),vis1, "no2_202005 (1w)", false);
Map.addLayer(no2_202005_2w.select('tropospheric_NO2_column_number_density'),vis1, "no2_202005 (2w)", false);
Map.addLayer(no2_202005_3w.select('tropospheric_NO2_column_number_density'),vis1, "no2_202005 (3w)", false);
Map.addLayer(no2_202005_4w.select('tropospheric_NO2_column_number_density'),vis1, "no2_202005 (4w)", false);
//Map.addLayer(no2_dif.select('tropospheric_NO2_column_number_density'),vis2, "dif btw 2019-2020");
Map.addLayer(no2_prop.select('tropospheric_NO2_column_number_density'),vis3, "prop btw 201904-202004", false);
Map.addLayer(no2_prop_0405.select('tropospheric_NO2_column_number_density'),vis3, "prop btw 202004-202005", false);
// Paint all the polygon edges with the same number and width, display.
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: globalmap,
  color: 0,
  width: 1
});
Map.addLayer(outline, {palette: '000000'}, 'edges');
//Export
//print(ee.Number(no2.first().projection().nominalScale()));
/*
var poly = ee.Geometry.Polygon([-179.95, 89.05, 0, 89.05, 179.95, 89.05, 179.95, -60, 10, -60, -179.95, -60]);
var westhalf = ee.Geometry.Polygon([-180, 89.95, -90, 89.95, 0, 89.95, 0, -60, -90, -60, -180, -60]);
var easthalf = ee.Geometry.Polygon([0, 89.95, 90, 89.95, 180, 89.95, 180, -60, 90, -60, 0, -60]);
Export.image.toDrive({
    description: 'no2_dif_2019_2020_westhalf',
    image: no2_dif.clip(globalmap), 
    folder: 'GEE',
    scale: 1113.1949079327358,
    maxPixels: 1e13,
    crs: 'EPSG:4326',
    region: westhalf});
Export.image.toDrive({
    description: 'no2_dif_2019_2020_easthalf',
    image: no2_dif.clip(globalmap), 
    folder: 'GEE',
    scale: 1113.1949079327358,
    maxPixels: 1e13,
    crs: 'EPSG:4326',
    region: easthalf});
Export.image.toDrive({
    description: 'no2_201904_westhalf',
    image: no2_201904.clip(globalmap), 
    folder: 'GEE',
    scale: 1113.1949079327358,
    maxPixels: 1e13,
    crs: 'EPSG:4326',
    region: westhalf});
Export.image.toDrive({
    description: 'no2_201904_easthalf',
    image: no2_201904.clip(globalmap), 
    folder: 'GEE',
    scale: 1113.1949079327358,
    maxPixels: 1e13,
    crs: 'EPSG:4326',
    region: easthalf});
Export.image.toDrive({
    description: 'no2_202004_westhalf',
    image: no2_202004.clip(globalmap), 
    folder: 'GEE',
    scale: 1113.1949079327358,
    maxPixels: 1e13,
    crs: 'EPSG:4326',
    region: westhalf});
Export.image.toDrive({
    description: 'no2_202004_easthalf',
    image: no2_202004.clip(globalmap), 
    folder: 'GEE',
    scale: 1113.1949079327358,
    maxPixels: 1e13,
    crs: 'EPSG:4326',
    region: easthalf});
// Add reducer output to the Features in the collection.
var maineMedianFeatures = no2_dif.select(0).reduceRegions({
  collection: globalmap.select('NAME'),
  reducer: ee.Reducer.median(),
  scale: 1113.1949079327358,
});
// Export the FeatureCollection to a KML file.
Export.table.toDrive({
  collection: maineMedianFeatures,
  folder: 'GEE',
  description:'no2_countrysummary',
  fileFormat: 'SHP'
});
//
// perhaps too heavy computation gets error below
// Print the first feature, to illustrate the result.
print(ee.Feature(maineMedianFeatures.first()));
print(maineMedianFeatures);
// Paint the interior of the polygons with different colors.
var fills = empty.paint({
  featureCollection: maineMedianFeatures,
  color: 'no2_dif',
});
Map.addLayer(fills, {palette: palette2}, 'dif per country');
Map.addLayer(maineMedianFeatures,{},"dif median (each country)");
*/
/*
var images = dates.map(function(t) {
  t = ee.Date(t)
  var imagesSample = no2.filterDate(t.advance(timeWindow, 'day'), t)
  var i = imagesSample
    // .median()
    // .reduce(ee.Reducer.percentile([25]))
    .mean()
    // .unmask(0, false)
  return i.set({ 
    count: imagesSample.size(), 
    'system:time_start': t.millis() 
  })
})
images = ee.ImageCollection(images).filter(ee.Filter.gt('count', 0))
// Map.addLayer(images.first())
var images = images.map(function(i) {
  var t = i.date()
  var mask = gl.smoothstep(0, vis.min, i).multiply(0.95)
  // var mask = i.unitScale(vis.min - (vis.max-vis.min) * 0.5, vis.max).add(0.1).multiply(0.9)
  return ee.ImageCollection([
    demHillshaded.visualize({ forceRgbOutput: true }), 
    ee.Image(1).byte().mask(0.15).visualize({ palette: ['000000'], forceRgbOutput: true }),
    i.updateMask(mask).visualize(vis)
  ]).mosaic().set({ label: t.format('YYYY-MM-dd') })
})
// Map.addLayer(images.first())
// throw(0)
animation.animate(images, { label: 'label', maxFrames: 150 })
*/