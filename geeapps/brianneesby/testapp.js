var style = require("users/deepakna/mids_w210_irrigated_cropland:v4/diffStyle.js");
var confusionMatrix = require("users/deepakna/mids_w210_irrigated_cropland:v4/confusionMatrix.js");
style.initMap();
var diffLegend = require("users/brianneesby/scripts:final_scripts/diff_legend.js");
Map.add(diffLegend.legend);
var baseImage1 = ee.Image("users/brianneesby/Siebert/Siebert_1950");
var baseImage2= ee.Image("users/brianneesby/Siebert/Siebert_2005");
var image1 = baseImage1.select('b1')
var image2 = baseImage2.select('b1')
var imgMask = baseImage1.expression('b("b1") > 100').or(baseImage2.expression('b("b1") > 100'));
// new - old: +ve means increase in probability, -ve means decrease in probability
var diff = image2.subtract(image1);
Map.addLayer(diff.updateMask(imgMask), {min:-9000, max:9000, palette: ["green", "white", "red"]}, "difference")
confusionMatrix.sumImage(image1);