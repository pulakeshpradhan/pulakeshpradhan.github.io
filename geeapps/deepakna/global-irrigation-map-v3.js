var style = require("users/deepakna/gimApps:style.js");
var cmb = require("users/deepakna/gimApps:combiner.js");
var cmn = require("users/deepakna/gimApps:common.js");
var lm = require("users/deepakna/gimApps:legendMaker.js");
style.initMap();
var mapAsset1 = ee.Image("users/deepakna/ellecp/v3/2005_ternary");
var mapAsset2 = ee.Image("users/deepakna/w210_irrigated_croplands/post_mids_v3b_results_2005");
var finalMap = cmb.combineMaps(mapAsset1, mapAsset2);
var satLayer = ee.Image('LANDSAT/LE7_TOA_5YEAR/2002_2006');
var trueColor321 = satLayer.select(['B3', 'B2', 'B1']);
var trueColor321Vis = {
  min: 0.0,
  max: 120.0,
};
Map.addLayer(trueColor321, trueColor321Vis, "True color 321");
Map.addLayer(finalMap.mask(finalMap), {min:1, max:2, palette: ["lightgreen", "green"]}, "Irrigation");
var legend = lm.makeLegend("Irrigation Extent: Predictions for 2005", [
    ["lightgreen", "Low to medium irrigation"],
    ["green", "High irrigation"],
  ]);
Map.add(legend);