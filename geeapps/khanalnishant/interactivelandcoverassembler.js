/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var imageVisParam = {"opacity":1,"bands":["classification"],"palette":["ffffff","00970b","0905ff","ff0000","85ff00","ffe31f"]};
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// ************************************************
// Author: Nishanta Khanal
// Date  : 10th September 2018
// ************************************************
// script to perform assemblage while interactively visualizing the primitive
// thresholds and changing them to perform reclassification to optitmize
// accuracy
// ************************************************
// environment settings
var nepalBounds = ee.FeatureCollection('ft:1tdSwUL7MVpOauSgRzqVTOwdfy17KDbw-1d9omPw').filter(ee.Filter.inList('Country', ['Nepal'])).first().geometry().buffer(30000);
var repository = 'projects/servir-hkh/ncomp_yearly_30/primitives/';
var year = 2017;
var primitives = ['forest','wetland','settlement','grassland','cropland'];
var defaultThresholds = [70, 80, 70, 40, 60];
// container for the classified landclass image
var landClass = ee.Image();
// ************************************************
// ui objects
// containers for sliders
var sliders = {};
// list of all selectable years
var availableYears = ['2000','2001','2002','2003','2004','2005',
      '2006','2007','2008','2009','2010','2011',
      '2012','2013','2014','2015','2016','2017'];
// dropdown to select years
var yearList = ui.Select(availableYears, 'year', ''+year);
// checkbox to visualize primitives using thresholds
var primThresholds = ui.Checkbox({
  label:'Visualize primitive by thresholds',
  style:{'height':'18px','fontSize':'11px'}
});
// button to refresh display according to parameters
var refreshDisplay = ui.Button({
  label:'Refresh Display',
  onClick: refresh, 
  style: {'fontSize':'11px'}
});
// button to export the current LandCover
var exportLC = ui.Button({
  label:'Export current landCover',
  onClick: exportHelper, 
  style: {'fontSize':'11px'}
});
// ************************************************
// functions
// function to reclassify stack image using decision tree
function reclassify(stackImage, decisionTree){
  var classifier = ee.Classifier.decisionTree(decisionTree);
  var landClass = stackImage.classify(classifier);
  return landClass;
}
// client side list map function to change list of primitives
// to a list of images corresponding to the primitives
// also adds the primitives to the map
function getPrimitiveImages(primitive){
  var image = ee.Image(repository+primitive+'-'+year).multiply(0.01).rename(primitive);
  var primLayer = ui.Map.Layer(image, {max:100}, primitive, false, 1);
  if (primThresholds.getValue()){
    primLayer = ui.Map.Layer(image.gte(sliders[primitive].getValue()), {}, primitive, false, 1);
  }
  Map.layers().set(primitives.indexOf(primitive), primLayer);
  return image;
}
// function to build decision tree from interface
function buildDecisionTree(){
  var fval = sliders['forest'].getValue();
  var wval = sliders['wetland'].getValue();
  var sval = sliders['settlement'].getValue();
  var gval = sliders['grassland'].getValue();
  var cval = sliders['cropland'].getValue();
  var DT = ['1) root 9999 9999 9999',
  '2) forest>='+fval+' 9999 9999 1 *',
  '3) forest<'+fval+' 9999 9999 9999',
  '6) wetland>='+wval+' 9999 9999 2 *',
  '7) wetland<'+wval+' 9999 9999 9999',
  '14) settlement>='+sval+' 9999 9999 3 *',
  '15) settlement<'+sval+' 9999 9999 9999',
  '30) grassland>='+gval+' 9999 9999 4 *',
  '31) grassland<'+gval+' 9999 9999 9999',
  '62) cropland>='+cval+' 9999 9999 5 *',
  '63) cropland<'+cval+' 9999 9999 0 *'].join('\n');
  return DT  
}
// function to start the process
function process(year){
  var stackImage = ee.Image(primitives.map(getPrimitiveImages)).clip(nepalBounds);
  landClass = reclassify(stackImage, buildDecisionTree());
  var lcLayer = ui.Map.Layer(landClass, imageVisParam, 'land cover', true, 1);
  Map.layers().set(primitives.length, lcLayer);
}
function addLegend(){
  var UTILS = require('users/khanalnishant/Algorithms:Utilities')
  var palette = imageVisParam.palette
  palette = palette.slice(1).concat(palette[0])
  var labels = primitives.concat('otherland')
  UTILS.addLegend(palette, labels,'Legend',{
    'position':'bottom-right',
    'padding':'8px 16px',
  });
}
// function to export current Land Cover
function exportHelper(){
  Export.image.toAsset({
    image:landClass.toInt8(), 
    description:'NepalLandCover-'+year, 
    region:nepalBounds,
    scale:30,
    maxPixels:1e10
  })
}
// function to refresh display based on parameters
function refresh(){
  // get layer shown state
  var layers = Map.layers();
  var shownStat = layers.map(function(layer){
    return layer.getShown();
  });
  // get selected year
  year = yearList.getValue();
  // initiate the process
  process(year);
  // reassign the previous layer shown status
  layers = Map.layers();
  layers.map(function(layer){
    return layer.setShown(shownStat[layers.indexOf(layer)]);
  });
}
// function to initialize the application
function init(){
  var panel = ui.Panel([], ui.Panel.Layout.Flow('vertical'),{position:'bottom-left'});
  var yearLabel = ui.Label('Year',{'width':'30px','height':'18px','fontSize':'11px'});
  var yearSubPanel = ui.Panel([yearLabel, yearList], ui.Panel.Layout.Flow('horizontal'));
  panel.add(yearSubPanel);
  var sliderLabel = ui.Label('Adjust Probability Thresholds',{'height':'18px','fontSize':'11px'});
  panel.add(sliderLabel);
  for (var i = 0; i< primitives.length;i++){
    var label = ui.Label(primitives[i],{'width':'50px','height':'18px','fontSize':'11px'});
    sliders[primitives[i]] = ui.Slider({
      min:0,
      max:100,
      value:defaultThresholds[i],
      style:{'height':'18px','fontSize':'11px'}
    });
    var subPanel = ui.Panel([label, sliders[primitives[i]]], ui.Panel.Layout.Flow('horizontal'));
    panel.add(subPanel);
  }
  panel.add(primThresholds);
  panel.add(refreshDisplay);
  panel.add(exportLC)
  Map.add(panel);
  addLegend();
}
init();
process(year);