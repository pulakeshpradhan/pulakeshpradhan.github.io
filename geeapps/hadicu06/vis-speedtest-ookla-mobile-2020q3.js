/*
To continue:
How to update legend?
Map.widgets() ?
in the function to create the legend?
*/
///////////////////////////////////////////////////////////////////////////////
// Import utils
var palettes = require('users/gena/packages:palettes');
// print('palettes', palettes)
///////////////////////////////////////////////////////////////////////////////
// Config 
var config = {
  minStretch: 4000,              // 1
  maxStretch: 70000,       // 381130.3
  // customPalette: palettes.colorbrewer.RdYlBu[7].reverse()//.slice(0)
  customPalette: palettes.colorbrewer.YlOrRd[7]
}
// Initialize legend
var initLegend = ui.Panel({
    style: {
      padding: '0px 0px 5px 8px',
      position: 'bottom-center'
    }
  })
// var initLegend = continuousLegendMap('Average download speed (kbps)',
//       config.customPalette, config.minStretch, config.maxStretch, '', 18.975, 250)
// initLegend.style().set('shown', false) 
Map.add(initLegend)
continuousLegendMap_panelPreMade(initLegend, 'Average download speed (kbps)',
      config.customPalette, config.minStretch, config.maxStretch, '', 18.975, 250)
/////////////////////////////////////////////////////
// Ookla data
var ookla_rst = ee.Image("users/hadicu06/fun/gps_mobile_tiles_centro_reprojTo3857_toRst_layerExtM_avg_d_kbps")
Map.setOptions('SATELLITE')
Map.addLayer(ookla_rst, 
      {min: config.minStretch, max: config.maxStretch, 
      palette: config.customPalette}, 
      "gps_mobile_tiles_centro_reprojTo3857_toRst_layerExtM_avg_d_kbps")
/////////////////////////////////////////////////////
// UI
var attributionText = ui.Panel({
  widgets: [
    ui.Label('Data source see:', {'padding':'0px', 'margin':'0px'}),
    ui.Label('Speedtest by Ookla Global Fixed and Mobile Network Performance Map Tiles').setUrl("https://github.com/teamookla/ookla-open-data", {'padding':'0px', 'margin':'0px'}),
    ui.Label("(Note: conversion to raster here might shift the original tile)", {'fontSize':'12px', 'padding':'0px', 'margin':'0px'})
  ], 
  layout: ui.Panel.Layout.flow('vertical'), 
  style: {'position':'bottom-right', 'height':'70px', 'padding':'0px', 'margin':'0px'}
})
Map.add(attributionText)
/////////////////////////////////////////////////////
// Stretch functionalities
var uiMinStretch = ui.Textbox({
  placeholder: 'Insert min stretch value', 
  value: '4000', 
  onChange: function(value) { config.minStretch = value },
  style: {'position': 'bottom-left', 'padding':'0px'}
})
var uiMaxStretch = ui.Textbox({
  placeholder: 'Insert max stretch value', 
  value: '70000', 
  onChange: function(value) { config.maxStretch = value },
  style: {'position': 'bottom-left', 'padding':'0px'}
})
var loadingText = ui.Label({value:''})
// Local min max
var uiGetLocalMinMax = ui.Button({
  label: 'Calculate local min,max', 
  onClick: function(value){
    loadingText.setValue('Loading...calculating min, max...')
    var aoi = ee.Geometry(Map.getBounds(true))   
    // Map.addLayer(aoi)
    var minMax = ookla_rst.reduceRegion({
      reducer: ee.Reducer.minMax(), 
      geometry: aoi, 
      scale: 610.8, 
      // crs, 
      // bestEffort, 
      maxPixels: 1e12, 
      tileScale: 4
    })
    // print(minMax)
    minMax.evaluate(updateMinMaxTextbox)
    function updateMinMaxTextbox(result){
      loadingText.setValue('')
      uiMinStretch.setValue(result.b1_min.toString())   // to change to .evaluate() -> done
      uiMaxStretch.setValue(result.b1_max.toString())   // to change to .evaluate() -> done
    }
  }, 
  // disabled, 
  style: {'position': 'bottom-left', 'padding':'0px'}
})
// Local 10th,90th percentile
var uiGetLocalPercentiles = ui.Button({
  label: 'Calculate local 10th,90th percentiles', 
  onClick: function(value){
    loadingText.setValue('Loading...calculating 10th, 90th percentiles...')
    var aoi = ee.Geometry(Map.getBounds(true))   
    // Map.addLayer(aoi)
    var percentiles = ookla_rst.reduceRegion({
      reducer: ee.Reducer.percentile([10,90]), 
      geometry: aoi, 
      scale: 610.8, 
      // crs, 
      // bestEffort, 
      maxPixels: 1e12, 
      tileScale: 4
    })
    percentiles = percentiles.map(function(k,v) { return ee.Number(v).round() })
    // print(minMax)
    percentiles.evaluate(updateMinMaxTextbox)
    function updateMinMaxTextbox(result){
      loadingText.setValue('')
      var p10 = result.b1_p10
      var p90 = result.b1_p90
      uiMinStretch.setValue(p10.toString())   // to change to .evaluate() -> done
      uiMaxStretch.setValue(p90.toString())   // to change to .evaluate() -> done
    }
  }, 
  // disabled, 
  style: {'position': 'bottom-left', 'padding':'0px'}
})
var uiApplyStretch = ui.Button({
  label: 'Apply', 
  onClick: function(value){
    var mapLayer = ui.Map.Layer(
      ookla_rst, 
      {min: config.minStretch, max: config.maxStretch, 
      palette: config.customPalette}, 
      "gps_mobile_tiles_centro_reprojTo3857_toRst_layerExtM_avg_d_kbps")
    // Update image
    Map.layers().set(0, mapLayer)
    // Update legend    (here to fix to continue!)                 // *****
    initLegend.clear()
    initLegend.style().set('shown', true)
    continuousLegendMap_panelPreMade(initLegend, 'Average download speed (kbps)',
      config.customPalette, config.minStretch, config.maxStretch, '', 18.975, 250)
  }, 
  // disabled, 
  style: {'position': 'bottom-left', 'fontWeight':'bold', 'padding':'0px'}
})
var manualStretchPanel = ui.Panel({
  widgets: [
    ui.Label('Mobile (cellular) network, Q3 2020, average download speed of all tests, tiles approx. 610.8m at the equator.', 
        {'fontWeight': 'bold', 'fontSize':'14px'}),
    ui.Label('1) Fill min & max stretch, or calculate local (viewport) stats:', {'width':'250px'}), 
    uiMinStretch, uiMaxStretch, uiGetLocalMinMax, uiGetLocalPercentiles, loadingText, 
    ui.Label('2) Apply stretch and display:'), 
    uiApplyStretch], 
    layout: ui.Panel.Layout.flow('vertical'), 
    style: {'position': 'bottom-left', 'width': '270px', 'padding':'0px'}
})
Map.add(manualStretchPanel)
/////////////////////////////////////////////////////
// Legend: color scale min max change 
// Function to create continuous legend (source: https://code.earthengine.google.com/?accept_repo=users/tl2581/FIRECAM)
// function continuousLegendMap(title, colPal, minVal,
//   maxVal, units, stretchFactor, maxValPos) {
//   var continuousLegendPanel = ui.Panel({
//     style: {
//       padding: '0px 0px 5px 8px',
//       position: 'bottom-center'
//     }
//   });
//   var legendTitle = ui.Label(title, {fontWeight: 'bold', fontSize: '16px', margin: '0 0 6px 8px'});
//   continuousLegendPanel.add(legendTitle);
//   continuousLegendPanel.add(ui.Label(units,{margin: '-6px 0 6px 8px'}));
//   var makeRow = function(colPal) {
//     var colorBox = ui.Label('', {
//         backgroundColor: colPal,
//         padding: '8px' + ' ' + stretchFactor + 'px',
//         margin: '0 0 4px 0px',
//     });
//     return ui.Panel({widgets: [colorBox], layout: ui.Panel.Layout.Flow('vertical')});
//   };
//   var colPalWidget = []; var labelWidget = [];
//   for (var i = 0; i < colPal.length; i++) {
//     colPalWidget[i] = makeRow(colPal[i]);
//   }
//   continuousLegendPanel.add(ui.Panel({widgets: colPalWidget, layout: ui.Panel.Layout.Flow('horizontal'),
//     style: {margin: '0 0 6px 8px'}}));
//   continuousLegendPanel.add(ui.Label(minVal,{margin: '-6px 0px 0px 8px'}));
//   continuousLegendPanel.add(ui.Label(maxVal,{margin: '-17px 5px 0px ' + maxValPos + 'px', textAlign: 'right'}));
//   return continuousLegendPanel;
// };
function continuousLegendMap_panelPreMade(continuousLegendPanel, title, colPal, minVal,
  maxVal, units, stretchFactor, maxValPos) {
  var legendTitle = ui.Label(title, {fontWeight: 'bold', fontSize: '14px', margin: '0 0 6px 8px'});
  continuousLegendPanel.add(legendTitle);
  continuousLegendPanel.add(ui.Label(units,{margin: '-6px 0 6px 8px'}));
  var makeRow = function(colPal) {
    var colorBox = ui.Label('', {
        backgroundColor: colPal,
        padding: '8px' + ' ' + stretchFactor + 'px',
        margin: '0 0 4px 0px',
    });
    return ui.Panel({widgets: [colorBox], layout: ui.Panel.Layout.Flow('vertical')});
  };
  var colPalWidget = []; var labelWidget = [];
  for (var i = 0; i < colPal.length; i++) {
    colPalWidget[i] = makeRow(colPal[i]);
  }
  continuousLegendPanel.add(ui.Panel({widgets: colPalWidget, layout: ui.Panel.Layout.Flow('horizontal'),
    style: {margin: '0 0 6px 8px'}}));
  continuousLegendPanel.add(ui.Label(minVal,{margin: '-6px 0px 0px 8px'}));
  continuousLegendPanel.add(ui.Label(maxVal,{margin: '-17px 5px 0px ' + maxValPos + 'px', textAlign: 'right'}));
  // side effect
  // return continuousLegendPanel;
};
// Map.setCenter(6.9474157498473765, 8.256848016632176, 7)
Map.setCenter(114.18177346039934, 9.907356934429572, 4)