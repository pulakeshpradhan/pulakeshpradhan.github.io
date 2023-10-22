var mekong = ee.FeatureCollection('ft:1tdSwUL7MVpOauSgRzqVTOwdfy17KDbw-1d9omPw');
var boundary = mekong.filter(ee.Filter.inList('Country', ['Myanmar (Burma)'])).geometry();
var repository = 'projects/servir-mekong/yearly_primitives_smoothed';
var scale = 30;
var exportPath = 'users/biplov/myanmar';
var primitives = ['mangrove', 'woody', 'water', 'snow', 'barren', 'rice', 'cropland', 'urban', 'grass', 'closedForest', 'openForest', 'wetlands'];
var classKeys = ee.List(['closedforest','water','grass','openForest','woody','cropland','other','urban','wetlands','mangroves','snow']);
var defaultThresholds = [70, 3, 70, 75, 70, 45, 40, 75, 95, 95, 69, 70];
//var defaultThresholds = [70, 3, 70, 75, 70, 45, 40, 75, 55, 63, 66, 70];
var year = 2015;
var runCount = 1;
var testAreaImage = ee.Image(1).clip(boundary);
var scaleforTestArea = 100;
var reducer = testAreaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: boundary,
  crs: 'EPSG:32646', // WGS Zone N 46
  scale: scaleforTestArea,
  maxPixels: 1E13
});
// km square
var area = ee.Number(reducer.get('constant')).multiply(scaleforTestArea).multiply(scaleforTestArea).divide(1000000);
// google reports 676,575 km2
//print(area); // outputs around 666,312 km2 because some islands might be missing
var startId = 'MGV';
var classStruct = {
  'closedforest': {number: 1, color: '267300'}, 
  'openforest': {number: 2, color: '98E600'}, 
  'woody': {number: 3, color: 'FFAA00'}, 
  'cropland' : {number: 4, color: 'FFFFBE'},
  'other' : {number: 5, color: 'FFEBBE'},
  'urban': {number: 6, color: 'FF5500'}, 
  'wetlands': {number: 7, color: '539CC9'},
  'mangroves': {number: 8, color: 'DF73FF'},
  'snow': {number: 9, color: 'ffffff'},
  'water': {number: 10, color: 'aec3d4'},
  'grass': {number: 11, color: 'D3FFBE'}
};
var nodeStruct = {
  'MGV':  {band: 'mangroves', name:'mangrove', threshold: defaultThresholds[0], left: 'terminal', leftName: 'mangroves', right: 'WOD'},
  'WOD':  {band: 'canopy', name:'woody',threshold: defaultThresholds[1],  left: 'CLF', right: 'SFW'},
  'SFW':  {band: 'water', name:'water',threshold: defaultThresholds[2], left: 'terminal', leftName: 'water', right: 'SNW'},
  'SNW':  {band: 'snow',  name:'snow',threshold: defaultThresholds[3], left: 'terminal', leftName: 'snow', right: 'BAR'},
  'BAR':  {band: 'barren', name:'barren',threshold: defaultThresholds[4], left: 'terminal', leftName: 'other', right: 'RIC'},
  'RIC':  {band: 'rice',  name:'rice',threshold: defaultThresholds[5], left: 'terminal', leftName: 'cropland', right: 'CRP'},
  'CRP':  {band: 'cropland', name:'cropland',threshold: defaultThresholds[6],  left: 'terminal', leftName: 'cropland', right: 'URB'},
  'URB':  {band: 'urban', name:'urban',threshold: defaultThresholds[7], left: 'terminal', leftName: 'urban', right: 'GRS'},
  'GRS':  {band: 'grass', name:'grass',threshold: defaultThresholds[8],  left: 'terminal', leftName: 'grass', right: 'WTL'},
  'CLF':  {band: 'canopy', name:'closedForest',threshold: defaultThresholds[9],  left: 'terminal', leftName: 'closedforest', right: 'OPF'},
  'OPF':  {band: 'canopy', name:'openForest',threshold: defaultThresholds[10], left: 'terminal',leftName:'openforest', right: 'terminal',rightName:"woody"},
  'WTL': {band: 'wetlands', name:'wetlands',threshold: defaultThresholds[11],  left: 'terminal', leftName: 'wetlands',right: 'terminal',rightName:"other"}
};
// Function to get a list of column values from a structure
function getList(struct, column) {
  return Object.keys(struct).map(function (k) {
    var value = struct[k][column];
    return value;
  });
}
var palette = getList(classStruct,'color');
var classColorMap = {};
var classIndexMap = {};
for (var _class in classStruct) {
  classColorMap[classStruct[_class].color] = _class;
}
classColorMap = ee.Dictionary(classColorMap);
for (var _class in classStruct) {
  classIndexMap[classStruct[_class].number] = _class;
}
classIndexMap = ee.Dictionary(classIndexMap);
/* ----------------------------------------------------------------------------------------------
WARNING!!!
FUNCTIONS AND PROCEDURES BELOW HERE
edit at your own risk
*/
// container for the classified landclass image
var landClass;
// ************************************************
// ui objects
// containers for sliders
var sliders = {};
// containers for inspected values
var valLabels = {};
// list of all selectable years
//var availableYears = ['2015','2016','2017','2018'];
var availableYears = ['2015'];
// dropdown to select years
var yearList = ui.Select(availableYears, 'year', ''+year);
// button to refresh display according to parameters
var refreshDisplay = ui.Button({
  label:'Refresh Display',
  onClick: refresh, 
  style: {'fontSize':'11px', 'padding':'4px', 'margin':'0px'}
});
// button to export the current LandCover
var exportLC = ui.Button({
  label:'Export current landCover',
  onClick: exportHelper, 
  style: {'fontSize':'11px', 'padding':'4px', 'margin':'0px'}
});
// button to export problem regions
var calculateAreaButton = ui.Button({
  label:'Calculate Area',
  onClick: calculateArea, 
  style: {'fontSize':'11px', 'padding':'4px', 'margin':'0px'}
});
// ************************************************
// functions
// function to classify stack image using decision tree
function classify (stackImage, decisionTree) {
  var classifier = ee.Classifier.decisionTree(decisionTree);
  var landClass = stackImage.classify(classifier);
  return landClass;
}
function makeStackImageFromCollection (year) {
  // 10 is radix param
  // If the string begins with "0x", the radix is 16 (hexadecimal)
  // If the string begins with "0", the radix is 8 (octal). This feature is deprecated
  // If the string begins with any other value, the radix is 10 (decimal)
  // reference https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
  year = parseInt(year, 10);
  var start = ee.Date.fromYMD(year, 1, 1);
  var end = ee.Date.fromYMD(year, 12, 31);
  var mangroves = ee.ImageCollection('projects/servir-mekong/yearly_primitives_smoothed/mangrove').filterDate(start, end).first().unmask(0).rename('mangroves');
  var woody = ee.ImageCollection('projects/servir-mekong/MyanmarFRA/woody').filterDate(start, end).first().rename('woody');
  var water = ee.ImageCollection('projects/servir-mekong/yearly_primitives_smoothed/water').filterDate(start, end).first().rename('water');
  var snow = ee.ImageCollection('projects/servir-mekong/yearly_primitives_smoothed/snow').filterDate(start, end).first().rename('snow');
  var barren = ee.ImageCollection('projects/servir-mekong/yearly_primitives_smoothed/barren').filterDate(start, end).first().rename('barren');
  var rice = ee.ImageCollection('projects/servir-mekong/yearly_primitives_smoothed/rice').filterDate(start, end).first().rename('rice');
  var cropland = ee.ImageCollection('projects/servir-mekong/yearly_primitives_smoothed/cropland').filterDate(start, end).first().rename('cropland');
  var urban = ee.ImageCollection('projects/servir-mekong/yearly_primitives_smoothed/urban').filterDate(start, end).first().rename('urban');
  var grass = ee.ImageCollection('projects/servir-mekong/yearly_primitives_smoothed/grass').filterDate(start, end).first().rename('grass');
  var closedForest = ee.ImageCollection('projects/servir-mekong/MyanmarFRA/smoothed_closedForest').filterDate(start, end).first().rename('closedforest');
  var openForest = ee.ImageCollection('projects/servir-mekong/MyanmarFRA/smoothed_openForest').filterDate(start, end).first().rename('openforest');
  var wetlands = ee.ImageCollection('projects/servir-mekong/yearly_primitives_smoothed/wetlands').filterDate(start, end).first().rename('wetlands');
  var canopy = ee.ImageCollection('projects/servir-mekong/UMD/tree_canopy').filterDate(start, end).first().rename('canopy');
  var collection = ee.ImageCollection(ee.List([mangroves, woody, water, snow, barren, rice, cropland, urban, grass, closedForest, openForest, wetlands, canopy]));
  var stack = ee.Image(collection.iterate(function(img, prev) {
    return ee.Image(prev).addBands(img);
  }, ee.Image(1)));
  stack = stack.select(ee.List.sequence(1, stack.bandNames().size().subtract(1)));
  return stack;
}
function buildDecisionTree(nodeStruct,classStruct,id,node,DTstring){
  // Extract parameters
  var lnode = 2*node; // left child node number
  var rnode = lnode + 1; // right child node number
  var dict = nodeStruct[id]; // current dictionary
  var band = dict.band; // decision band
  var threshold = dict.threshold; // decision threshold
  var left = dict.left; // left result (either 'terminal' or new id)
  var right = dict.right; // right result (either 'terminal' or new id)
  var leftName = dict.leftName; // left class name (if 'terminal')
  var rightName = dict.rightName; // right class name (if 'terminal')
  var leftLine = '';
  var rightLine = '';
  var leftNumber = 0;
  var rightNumber = 0;
  // Add the left condition and right condition strings to the current decision 
  // tree string. If either condition is non-terminal, recursively call the 
  // function.
  if (left == 'terminal') { // left terminal condition
    leftNumber = classStruct[leftName].number;
    leftLine = lnode + ') ' + band + '>=' + threshold + ' 9999 9999 ' + leftNumber + ' *';
    DTstring.push(leftLine);
    if (right == 'terminal') { // right terminal condition
      rightNumber = classStruct[rightName].number;
      rightLine = rnode + ') ' + band + '<' + threshold + ' 9999 9999 ' + rightNumber + ' *';
      DTstring.push(rightLine);
      return DTstring;
    } else { // right non-terminal condition
      rightLine = rnode + ') ' + band + '<' + threshold + ' 9999 9999 9999';
      DTstring.push(rightLine);
      return buildDecisionTree(nodeStruct,classStruct,right,rnode,DTstring);
    }
  } else { // left non-terminal condition
    leftLine = lnode + ') ' + band + '>=' + threshold + ' 9999 9999 9999';
    DTstring.push(leftLine);
    DTstring = buildDecisionTree(nodeStruct,classStruct,left,lnode,DTstring);
    if (right == 'terminal') { // right terminal condition
      rightNumber = classStruct[rightName].number;
      rightLine = rnode + ') ' + band + '<' + threshold + ' 9999 9999 ' + rightNumber + ' *';
      DTstring.push(rightLine);
      return DTstring;
    } else { // right non-terminal
      rightLine = rnode + ') ' + band + '<' + threshold + ' 9999 9999 9999';
      DTstring.push(rightLine);
      return buildDecisionTree(nodeStruct,classStruct,right,rnode,DTstring);
    }
  }
  return DTstring;
}
function updateThresholdingValues() {
  for (var node in nodeStruct) {
    for (var primitive in primitives) {
      var x = primitives[primitive];
      if (nodeStruct[node].name === x) {
        nodeStruct[node].threshold = sliders[x].getValue();
      }
    }
  }
}
// function to start the process
function process(year){
  print('*********************** Run ' + runCount + ' ***********************');
  Map.centerObject(boundary);
  var stackImage = makeStackImageFromCollection(year).clip(boundary);
  // keep it inside this funtion otherwise it will act crazy :D
  var DTstring = ['1) root 9999 9999 9999'];
  var decisionTree = buildDecisionTree(nodeStruct,classStruct,startId,1,DTstring).join('\n');
  landClass = classify(stackImage, decisionTree);
  var lcLayer = ui.Map.Layer(landClass, {palette: palette.join(','), min: 1, max: palette.length - 1}, 'Run:' + runCount, true, 1);
  Map.layers().set(primitives.length, lcLayer);
  calculateArea(landClass);
  runCount += 1;
}
// function to add legend to the map
function addLegend(){
  var colors = classColorMap.keys().getInfo();
  var labels = classColorMap.values().getInfo();
  var symbolBox = ui.Panel();
  for (var i = 0; i < colors.length; i++){
    var symbol = ui.Label({
      style: {
        backgroundColor: '#' + colors[i],
        padding: '8px',
        margin: '0 0 4px 0'
      }
    });
    var description = ui.Label({
      value: labels[i],
      style: {margin: '0 0 4px 6px'}
    });
    symbolBox.add(ui.Panel({
      widgets: [symbol, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    }));
  }
  var legendWidgets = [];
  var legendTitle = ui.Label('Legend',{fontWeight: 'bold'});
  legendWidgets = [legendTitle, symbolBox];
  var legend = ui.Panel({
    widgets:legendWidgets,
    layout:ui.Panel.Layout.Flow('vertical'),
    style: {
      'position':'bottom-right',
      'padding':'8px 16px',
    }
  });
  Map.add(legend);
}
//update the labels once the sampling is done
function updateValues(feature){
  // print(feature.properties);
  for (var i=0; i<primitives.length;i++){
    var value = parseFloat(feature.properties[primitives[i]]).toFixed(2);
    valLabels[primitives[i]].setValue(value);
  }
}
// function to export all Land Covers
function exportHelper(){
  var DTstring = ['1) root 9999 9999 9999'];
  var decisionTree = buildDecisionTree(nodeStruct,classStruct,startId,1,DTstring).join('\n');
  var image = landClass.set('decisionTree', decisionTree, 'year', ee.Date.fromYMD(parseInt(year, 10),1,1));
  Export.image.toAsset({
    image: image.toInt8(),
    description: 'LandCover-' + year, 
    region: boundary.bounds(),
    scale: scale,
    assetId: exportPath + '/Landcover-' + year,
    maxPixels: 1e13
  });
}
// function to calculate the area of the landcover classes
function calculateArea (lcMap){
  var reduce = lcMap.reduceRegion({
    reducer: ee.Reducer.frequencyHistogram(),
    geometry: boundary,
    crs: 'EPSG:32646', // WGS Zone N 46
    scale: 100,
    maxPixels: 1E13
  });
  var data = ee.Dictionary(reduce.get('classification'));
  var dataKeys = data.keys();
  var keys = ee.List([]);
  keys = dataKeys.map(function (key) {
    return classIndexMap.get(key);
  });
  var values = data.values();
  //var keys = ee.List(['closedforest','water','grass','openForest','woody','cropland','other','urban','wetlands','mangroves','snow']);
  var stats = ee.Dictionary.fromLists(keys, values);
  // this is the area in hectare for a scale of 100
  // converting to meter square by multiplying with scale value i.e. 100*100
  // and then converting to hectare multiplying with 0.0001
  // area = reducervalue * 100 * 100 * 0.0001 # in hectare
  // meaning we can use the value directly as the hectare
  var chart = ui.Chart.array.values(values, 0, keys)
    .setChartType('ColumnChart')
    .setSeriesNames(['Area (ha)'])
    .setOptions({
      title: 'Area by Class',
      vAxis: {
        title: 'Area (hectare)'
      },
      pointSize: 0,
      lineWidth: 1,
      colors: ['red']
    });
  print(chart);
  print(stats);
}
// function to refresh display based on parameters
function refresh () {
  // get layer shown state
  var layers = Map.layers();
  var shownStat = layers.map(function(layer){
    return layer.getShown();
  });
  // get selected year
  year = yearList.getValue();
  updateThresholdingValues();
  // initiate the process
  process(year);
  // reassign the previous layer shown status
  /*layers = Map.layers();
  layers.map(function(layer){
    return layer.setShown(shownStat[layers.indexOf(layer)]);
  });*/
}
// function to initialize the application
function init(){
  var panel = ui.Panel([], ui.Panel.Layout.Flow('vertical'),{position:'bottom-left'});
  var yearLabel = ui.Label('Year',{'width':'30px','height':'18px','fontSize':'11px', 'margin':'15px 0px'});
  var yearSubPanel = ui.Panel([yearLabel, yearList], ui.Panel.Layout.Flow('horizontal'));
  panel.add(yearSubPanel);
  var sliderLabel = ui.Label('Adjust Probability Thresholds',{'height':'18px','fontSize':'11px', 'padding':'0px', 'margin':'1px'});
  panel.add(sliderLabel);
  for (var i = 0; i< primitives.length;i++){
    var label = ui.Label(primitives[i],{'width':'50px','height':'18px','fontSize':'11px', 'padding':'0px', 'margin':'1px'});
    sliders[primitives[i]] = ui.Slider({
      min:0,
      max:100,
      step:1,
      value:defaultThresholds[i],
      style:{'height':'18px','fontSize':'11px', 'padding':'0px', 'margin':'1px'}
    });
    var subPanel = ui.Panel([label, sliders[primitives[i]]], ui.Panel.Layout.Flow('horizontal'),{'padding':'4px'});
    panel.add(subPanel);
  }
  panel.add(refreshDisplay);
  panel.add(exportLC);
  //panel.add(calculateAreaButton);
  Map.add(panel);
  addLegend();
}
init();
process(year);