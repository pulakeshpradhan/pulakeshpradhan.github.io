// sandbox/ezangakis
/* 
ecoEE Example Web Application
Author: Evan Zangakis, Matthew Helmus
Description:  Visualize ecosystem multifunctionality across Philadelphia PA, USA census tracts
  Visualized data are from
    Tran, Tyler J., Matthew R. Helmus, and Jocelyn E. Behm. "Green infrastructure space 
    and traits (GIST) model: Integrating green infrastructure spatial placement and plant traits 
    to maximize multifunctionality. Urban Forestry & Urban Greening 49 (2020): 126635.
  https://www-sciencedirect-com.libproxy.temple.edu/science/article/pii/S1618866719302778
*/
// Load Module Data --------------------------------------------------------
var module1 = require('users/ieco/megalopolis:sandbox/ezangakis/module_priorityScores');
var priorityScores = module1.priorityScores;
var layer = module1.layer;
var layerSelectFunc = module1.layerSelectFunc;
var alphaES = module1.alphaES;
var module2 = require('users/ieco/megalopolis:sandbox/ezangakis/module_staticWidgets');
var panelText = module2.panelText;
var panelLegend = module2.panelLegend;
var panelTextEE = module2.panelTextEE;
var module3 =require('users/ieco/megalopolis:sandbox/ezangakis/module_onclick');
var panelChart = module3.panelChart;
var panelTable = module3.panelTable;
var clickFunc = module3.clickFunc;
var module3 = require('users/ieco/megalopolis:sandbox/ezangakis/module_slider');
var panelSlider = module3.panelSlider;
var slider = module3.slider;
// Locally defined variables -------------------------------------------------
var colorGI = "black";
var nameGI = "Census Tracts";
// Initiate Maps -----------------------------------------------------------------------------
var appMap = ui.Map().setOptions('SATELLITE'); // replace all 'appMap' with 'Map' objects for non-webApp code
ui.root.widgets().reset([appMap]);
appMap.setControlVisibility(false);
appMap.setCenter(-75.14648576097875, 40.00005656001049,11); // zoom map to Philadelphia
appMap.addLayer(priorityScores,{color: colorGI},nameGI,0); // add first layer to map
//---------------//
var appMap2 = ui.Map().setOptions('SATELLITE'); // replace all 'appMap' with 'Map' objects for non-webApp code
ui.root.widgets().reset([appMap]);
appMap2.setControlVisibility(false);
appMap2.setCenter(-75.14648576097875, 40.00005656001049,11); 
appMap2.addLayer(priorityScores,{color: colorGI},nameGI,0); 
// Add all widgets and layers to map ------------------------------------------
// decide on the first layer to map in the web app
appMap.addLayer(layer['Vegetation'][0],  layer['Vegetation'][1], 'Vegetation', true, alphaES);
appMap2.addLayer(layer['Biodiversity Equity'][0], layer['Biodiversity Equity'][1], 'Biodiversity Equity', true, alphaES);
layerSelectFunc(appMap, 'Vegetation', 'top-left')
layerSelectFunc(appMap2, 'Biodiversity Equity', 'top-right')
appMap.add(panelText); // add text panel to map
appMap.add(panelTextEE); // add text panel to map
appMap.add(panelChart);
appMap2.add(panelTable);
appMap.add(panelLegend);
appMap.onClick(clickFunc);
appMap2.onClick(clickFunc);
appMap2.add(panelSlider);
//------------------------------------------------------------------------------
// Create a SplitPanel to hold the adjacent, linked maps. -----------------------
var splitPanel = ui.SplitPanel({
  firstPanel: appMap,
  secondPanel: appMap2,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([appMap, appMap2]);
//------------------------------------------------------------------------------
// Create slider opacity function
slider.onChange(function(value) {
  alphaES = value;
  appMap.layers().get(1).setOpacity(value);
  appMap2.layers().get(1).setOpacity(value);
});