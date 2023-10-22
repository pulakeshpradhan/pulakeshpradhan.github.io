//######################################################################################################## 
//#                                                                                                    #\\
//#                         LANDTRENDR FITTED INDEX DELTA RGB MAPPER GUI                               #\\
//#                                                                                                    #\\
//########################################################################################################
// date: 2018-06-11
// author: Justin Braaten | jstnbraaten@gmail.com
//         Zhiqiang Yang  | zhiqiang.yang@oregonstate.edu
//         Robert Kennedy | rkennedy@coas.oregonstate.edu
// website: https://github.com/eMapR/LT-GEE
var ltgee = require('users/emaprlab/public:Modules/LandTrendr.js');  
var getParams = function(){
  var prevOneYrRec = paramBoxes[3].getValue();
  if(typeof(prevOneYrRec) !== "boolean"){
    prevOneYrRec = prevOneYrRec.toLowerCase() != 'false';
  }
  return { 
    maxSegments:              parseInt(paramBoxes[0].getValue()),
    spikeThreshold:         parseFloat(paramBoxes[1].getValue()),
    vertexCountOvershoot:     parseInt(paramBoxes[2].getValue()),
    preventOneYearRecovery:                         prevOneYrRec,
    recoveryThreshold:      parseFloat(paramBoxes[4].getValue()),
    pvalThreshold:          parseFloat(paramBoxes[5].getValue()),
    bestModelProportion:    parseFloat(paramBoxes[6].getValue()),
    minObservationsNeeded:    parseInt(paramBoxes[7].getValue())
  };
};
var plotTheMap = function(x, y){
  runParams = getParams();
  var startYear = startYearslider.getValue();
  var endYear = endYearslider.getValue();
  var startDay = startDayBox.getValue();
  var endDay = endDayBox.getValue();
  var index = indexSelect.getValue();
  var redYear = redYearslider.getValue();
  var greenYear = greenYearslider.getValue();
  var blueYear = blueYearslider.getValue();
  var buffer = bufferBox.getValue();
  buffer = buffer*1000;
  var point = ee.Geometry.Point(x, y).buffer(200);
  var aoi = point.buffer(buffer).bounds();
  var rgbVis = ltgee.mapRGBcomposite(index, startYear, endYear, startDay, endDay, redYear, greenYear, blueYear, aoi, runParams, 2);
  map.setCenter(x, y, 11);
  map.layers().set(0, ui.Map.Layer(rgbVis,null,'RGB Change'));
  map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}, 'Target'));
};
// SET UP PRIMARY PANELS
// control panel
var controlPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '340px'}
});
// map panel
var map = ui.Map();
map.style().set({cursor:'crosshair'});
map.setOptions('HYBRID');
// SET UP SECONDARY PANELS
// years panel
var d = new Date();
var y = d.getFullYear();
var yearSectionLabel = ui.Label('Define Year Range',{fontWeight: 'bold'});
var startYearLabel = ui.Label('Start Year');
var startYearslider = ui.Slider({min:1984, max:y, value:1984, step:1});
startYearslider.style().set('stretch', 'horizontal');
var endYearLabel = ui.Label('End Year');
var endYearslider = ui.Slider({min:1984, max:y, value:y-1, step:1});
endYearslider.style().set('stretch', 'horizontal');
var yearsPanel = ui.Panel(
  [
    yearSectionLabel,
    ui.Panel([startYearLabel, startYearslider], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}), //
    ui.Panel([endYearLabel  , endYearslider], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'})
  ] 
);
// date panel
var dateSectionLabel = ui.Label('Define Date Range (month-day)',{fontWeight: 'bold'});
var startDayLabel = ui.Label('Start Date:');
var startDayBox = ui.Textbox({value:'06-10'});
startDayBox.style().set('stretch', 'horizontal');
var endDayLabel = ui.Label('End Date:');
var endDayBox = ui.Textbox({value:'09-20'});
endDayBox.style().set('stretch', 'horizontal');
var datesPanel = ui.Panel(
  [
    dateSectionLabel,
    ui.Panel(
      [startDayLabel, startDayBox, endDayLabel, endDayBox],
      ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}
    )
  ]
);
// index panel
var indexLabel = ui.Label('Select Index',{fontWeight: 'bold'});
var indexList = ['NBR','NDVI','EVI','NDSI','TCB','TCG','TCW','B1','B2','B3','B4','B5','B7',];
var indexSelect = ui.Select({items:indexList, value:'NBR', style:{stretch: 'horizontal'}});
var indexPanel = ui.Panel([indexLabel,indexSelect], null, {stretch: 'horizontal'});
// rgb year panel
var rgbSectionLabel = ui.Label('Define Years for Red, Green, Blue',{fontWeight: 'bold'});
var redYearLabel = ui.Label('Red Year');
var redYearslider = ui.Slider({min:1984, max:y, value:1985, step:1, style:{stretch: 'horizontal'}});
var greenYearLabel = ui.Label('Green Year');
var greenYearslider = ui.Slider({min:1984, max:y, value:2000, step:1, style:{stretch: 'horizontal'}});
var blueYearLabel = ui.Label('Blue Year');
var blueYearslider = ui.Slider({min:1984, max:y, value:2015, step:1, style:{stretch: 'horizontal'}});
var rgbYearsPanel = ui.Panel([
    rgbSectionLabel,
    ui.Panel([redYearLabel, redYearslider], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
    ui.Panel([greenYearLabel, greenYearslider], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}),
    ui.Panel([blueYearLabel, blueYearslider], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'})
  ] 
);
// coordinate panel
var coordSectionLabel = ui.Label('Define Pixel Coordinates (optional)',{fontWeight: 'bold'});
var latLabel = ui.Label('Latitude:');
var latBox = ui.Textbox({value:43.7929});
latBox.style().set('stretch', 'horizontal');
var lonLabel = ui.Label('Longitude:');
var lonBox = ui.Textbox({value:-122.8848});
lonBox.style().set('stretch', 'horizontal');
var latLonPanel = ui.Panel(
  [
    coordSectionLabel,
    ui.Panel([lonLabel, lonBox, latLabel, latBox],ui.Panel.Layout.Flow('horizontal'))
  ],
  null,
  {stretch: 'horizontal'}
);
// buffer box
var bufferSectionLabel = ui.Label('Define a Buffer Around Point (km)',{fontWeight: 'bold'});
var bufferBoxLabel = ui.Label('Buffer');
var bufferBox = ui.Textbox({value: 50});
var bufferPanel = ui.Panel(
  [
    bufferSectionLabel,
    ui.Panel([bufferBoxLabel,bufferBox], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'})
  ]
);
// params panel
var runParams = [
  {label: 'Max Segments:', value: 6},
  {label: 'Spike Threshold:', value: 0.9},
  {label: 'Vertex Count Overshoot:', value: 3},
  {label: 'Prevent One Year Recovery:', value: true},
  {label: 'Recovery Threshold:', value: 0.25},
  {label: 'p-value Threshold:', value: 0.05},
  {label: 'Best Model Proportion:', value: 0.75},
  {label: 'Min Observations Needed:', value: 6},
];
var paramBoxes = [];
var paramPanels = [ui.Label('Define Segmentation Parameters',{fontWeight: 'bold'})];
runParams.forEach(function(param, index){
  var paramLabel = ui.Label(param.label);
  var paramBox = ui.Textbox({value:param.value});
  paramBox.style().set('stretch', 'horizontal');
  var paramPanel = ui.Panel([paramLabel,paramBox], ui.Panel.Layout.Flow('horizontal'));
  paramBoxes.push(paramBox);
  paramPanels.push(paramPanel);
});
var paramPanel = ui.Panel(paramPanels, null, {stretch: 'horizontal'});
// submit panel
var submitButton = ui.Button({label: 'Submit'});
submitButton.style().set('stretch', 'horizontal');
// set a callback function for when the user clicks the map.
map.onClick(function(coords) {
  var x = coords.lon;
  var y = coords.lat;
  lonBox.setValue(x);
  latBox.setValue(y);
  plotTheMap(x, y);
});
submitButton.onClick(function(){
  var x = parseFloat(lonBox.getValue());
  var y = parseFloat(latBox.getValue());
  plotTheMap(x, y);
});
controlPanel.add(yearsPanel);
controlPanel.add(datesPanel);
controlPanel.add(indexPanel);
controlPanel.add(rgbYearsPanel);
controlPanel.add(latLonPanel);
controlPanel.add(bufferPanel);
controlPanel.add(paramPanel);
controlPanel.add(submitButton);
map.add(ui.Label({
  value: 'Click a point',
  style: {position: 'top-center'}
}));
map.add(ui.Label({
  value: 'More info',
  style: {position: 'bottom-right'},
  targetUrl: 'https://goo.gl/gGL3Dd'
}));
ui.root.clear();
ui.root.add(controlPanel);
ui.root.add(map);