/***
 * Introduction:
 * 1) Visualize global "steepest" centerlines.
 * 
 * Update: 10/29/2021.
*/
/* Load module(s). */
var GATE = require("users/ChenyangWei/Public:Modules/Global_ATE");
var VIS = require("users/ChenyangWei/Public:Modules/Visualization");
// var IMG = require("users/ChenyangWei/Public:Modules/Image_Analysis&Processing");
/* New Climate-based ATE. */
var readCATE = VIS.readNewCATE;
// North America.
var newCATE_NA = readCATE(GATE.wd_NorthAmerica);
// South America.
var newCATE_SA = readCATE(GATE.wd_SouthAmerica);
// Africa.
var newCATE_Af = readCATE(GATE.wd_Africa);
// Oceania.
var newCATE_Oc = readCATE(GATE.wd_Oceania);
// Europe.
var newCATE_Eu = readCATE(GATE.wd_Europe);
// Asia.
var newCATE_As = readCATE(GATE.wd_Asia);
// IMG.printImgInfo("newCATE_SA:", newCATE_SA);
// Global.
var newCATE = ee.ImageCollection.fromImages([newCATE_NA,
  newCATE_SA,
  newCATE_Af,
  newCATE_Oc,
  newCATE_Eu,
  newCATE_As]).mosaic();
/* Raw centerlines. */
var readRawCLs_others = function(wd) {
  return ee.FeatureCollection(wd
    + "Elevational_Transect_Generation/"
    + GATE.rawCLs_fileName);
};
var readRawCLs_NorthAm = function(wd) {
  return ee.FeatureCollection(wd
    + "Elevational_Transect_Generation/"
    + GATE.rawCLs_fileName + "/"
  + GATE.rawCLs_AllBasinGroups_fileName);
};
var readRawCLs_Asia = function(wd) {
  return ee.FeatureCollection(wd
    + "Elevational_Transect_Generation/"
    + GATE.rawCLs_AllBasinGroups_fileName);
};
// North America.
var rawCLs_NA = readRawCLs_NorthAm(GATE.wd_NorthAmerica);
// Asia.
var rawCLs_As = readRawCLs_Asia(GATE.wd_Asia);
// South America.
var rawCLs_SA = readRawCLs_others(GATE.wd_SouthAmerica);
// Africa.
var rawCLs_Af = readRawCLs_others(GATE.wd_Africa);
// Oceania.
var rawCLs_Oc = readRawCLs_others(GATE.wd_Oceania);
// Europe.
var rawCLs_Eu = readRawCLs_others(GATE.wd_Europe);
var rawCLs = rawCLs_NA
  .merge(rawCLs_As)
  .merge(rawCLs_SA)
  .merge(rawCLs_Eu)
  .merge(rawCLs_Af)
  .merge(rawCLs_Oc);
// print("# of raw centerlines:", rawCLs.size()); // 18,339,629.
// Load the old centerlines of North America.
var oldCLs_NA = ee.FeatureCollection(GATE.wd_NorthAmerica
  + "Transect_Analysis/"
  + "TransectCenterLines_LowerClosedForests_UpperNonForested_30mSegmentedNewCATE");
print("# of old centerlines (North America):", oldCLs_NA.size()); // 703,172.
/* Steepest transects. */
// Asia.
var steepestCLs_As = VIS.readSteepestCLs_Asia();
// North America.
var steepestCLs_NA = VIS.readSteepestCLs_NorthAmerica();
// South America.
var steepestCLs_SA = VIS.readSteepestCLs_otherContinents(GATE.wd_SouthAmerica);
// Europe.
var steepestCLs_Eu = VIS.readSteepestCLs_otherContinents(GATE.wd_Europe);
// Africa.
var steepestCLs_Af = VIS.readSteepestCLs_otherContinents(GATE.wd_Africa);
// Oceania.
var steepestCLs_Oc = VIS.readSteepestCLs_otherContinents(GATE.wd_Oceania);
print("Steepest centerlines (Asia):", steepestCLs_As.size()); // 1,501,040.
print("Steepest centerlines (North America):", steepestCLs_NA.size()); // 563,437.
print("Steepest centerlines (South America):", steepestCLs_SA.size()); // 164,684.
print("Steepest centerlines (Europe):", steepestCLs_Eu.size()); // 183,377.
print("Steepest centerlines (Africa):", steepestCLs_Af.size()); // 947.
print("Steepest centerlines (Oceania):", steepestCLs_Oc.size()); // 42,169.
var steepestCLs = steepestCLs_As
  .merge(steepestCLs_NA)
  .merge(steepestCLs_SA)
  .merge(steepestCLs_Eu)
  .merge(steepestCLs_Af)
  .merge(steepestCLs_Oc);
var transects = steepestCLs.map(function(CL) {
  return CL.buffer(45);
});
var oldTransects_NA = oldCLs_NA.map(function(CL) {
  return CL.buffer(45);
});
// print("# of steepestCLs:", steepestCLs.size()); // 2,455,654. 
print("Total # of transects:", transects.size()); // 2,455,654. 
/* ESRI LULC 10m. */
var esri_lulc10 = 
  ee.ImageCollection("projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m");
// Define a dictionary which will be used to make legend and visualize image on map
var dict = {
  "names": [
    "Water",
    "Trees",
    "Grass",
    "Flooded Vegetation",
    "Crops",
    "Scrub/Shrub",
    "Built Area",
    "Bare Ground",
    "Snow/Ice",
    "Clouds"
  ],
  "colors": [
    "#1A5BAB",
    "#358221",
    "#A7D282",
    "#87D19E",
    "#FFDB5C",
    "#EECFA8",
    "#ED022A",
    "#EDE9E4",
    "#F2FAFF",
    "#C8C8C8"
  ]};
// Create a panel to hold the legend widget
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Function to generate the legend
function addCategoricalLegend(panel, dict, title, the_map) {
  // Create and add the legend title.
  var legendTitle = ui.Label({
    value: title,
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
    }
  });
  panel.add(legendTitle);
  var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
  panel.add(loading);
  // Creates and styles 1 row of the legend.
  var makeRow = function(color, name) {
    // Create the label that is actually the colored box.
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
        // Use padding to give the box height and width.
        padding: '8px',
        margin: '0 0 4px 0'
      }
    });
    // Create the label filled with the description text.
    var description = ui.Label({
      value: name,
      style: {margin: '0 0 4px 6px'}
    });
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
  };
  // Get the list of palette colors and class names from the image.
  var palette = dict['colors'];
  var names = dict['names'];
  loading.style().set('shown', false);
  for (var i = 0; i < names.length; i++) {
    panel.add(makeRow(palette[i], names[i]));
  }
  the_map.add(panel);
}
// Add the legend to the map
addCategoricalLegend(legend, dict, 'ESRI 2020 Land Cover (10m)', Map);
// Add image to the map
Map.addLayer(esri_lulc10.mosaic(), 
  {min:1, max:10, palette:dict['colors']}, 'ESRI LULC 10m');
/* ESA WorldCover 10m v100. */
// Legend at Bottom Right
var legend2 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// The dataset
var dataset = ee.ImageCollection("ESA/WorldCover/v100").first();
// The dictionary to create the legend for ESA
var esa_dict = {
  "names": dataset.get("Map_class_names").getInfo(),
  "colors": dataset.get("Map_class_palette").getInfo()
};
// Create the legend
addCategoricalLegend(legend2, esa_dict, 'ESA 10m WorldCover', Map);
// Add the dataset to the map
Map.addLayer(dataset, {bands: ['Map']}, "ESA 10m WorldCover");
/* Visualization. */
VIS.centerNorthAmerica(13);
// VIS.centerOceania(12);
// VIS.centerAsia(11);
// VIS.centerSouthAmerica(13);
// VIS.centerEurope(11);
// VIS.centerAfrica(13);
Map.addLayer(newCATE, {palette: "FFFFFF"}, "New climatic ATE", true, 0.5);
Map.addLayer(rawCLs, {color: "FFFF00"}, "Raw centerlines", false, 0.5);
Map.addLayer(transects, {color: "0000FF"}, "New transects (global)", true, 1);
Map.addLayer(oldTransects_NA, {color: "FF0000"}, "Old transects (North America)", true, 1);
// Map.addLayer(steepestCLs, {color: "0000FF"}, "Transect centerlines", true, 1);