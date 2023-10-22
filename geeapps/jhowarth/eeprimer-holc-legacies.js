var richmond = ui.import && ui.import("richmond", "image", {
      "id": "users/zlevitt/Richmond_LST_NDVI_Impervious"
    }) || ee.Image("users/zlevitt/Richmond_LST_NDVI_Impervious"),
    jacksonville = ui.import && ui.import("jacksonville", "image", {
      "id": "users/zlevitt/Jacksonville_LST_NDVI_Impervious"
    }) || ee.Image("users/zlevitt/Jacksonville_LST_NDVI_Impervious"),
    baltimore = ui.import && ui.import("baltimore", "image", {
      "id": "users/zlevitt/Baltimore_LST_NDVI_Impervious"
    }) || ee.Image("users/zlevitt/Baltimore_LST_NDVI_Impervious"),
    denver = ui.import && ui.import("denver", "image", {
      "id": "users/zlevitt/Denver_LST_NDVI_Impervious"
    }) || ee.Image("users/zlevitt/Denver_LST_NDVI_Impervious"),
    boston = ui.import && ui.import("boston", "image", {
      "id": "users/zlevitt/Boston_LST_NDVI_Impervious"
    }) || ee.Image("users/zlevitt/Boston_LST_NDVI_Impervious"),
    centroids = ui.import && ui.import("centroids", "table", {
      "id": "users/zlevitt/holc_centroids"
    }) || ee.FeatureCollection("users/zlevitt/holc_centroids"),
    holcByCity = ui.import && ui.import("holcByCity", "table", {
      "id": "users/jhowarth/eePrimer/holcDissolvedByCity"
    }) || ee.FeatureCollection("users/jhowarth/eePrimer/holcDissolvedByCity"),
    holc = ui.import && ui.import("holc", "table", {
      "id": "users/jhowarth/eePrimer/holc"
    }) || ee.FeatureCollection("users/jhowarth/eePrimer/holc"),
    landsat = ui.import && ui.import("landsat", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_RT"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_RT"),
    nlcd = ui.import && ui.import("nlcd", "imageCollection", {
      "id": "USGS/NLCD"
    }) || ee.ImageCollection("USGS/NLCD"),
    states = ui.import && ui.import("states", "table", {
      "id": "users/zlevitt/states"
    }) || ee.FeatureCollection("users/zlevitt/states");
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
/*
  App to explore the relationship between HOLC neighborhoods, LST, NDVI, and NLCD data
  Zach Levitt and Dr. Jeff Howarth
  Middlebury College, Vermont, USA
  Fall 2020 
  What did I change from past version?
    - created config dictionary that stores values for rendering map and charts
    - reduced the number of get info calls
    - reduced the number of get info calls
    - button clicks render using assets for each city individually
    - inset map
    - select list
  TO MOVE INTO MODULE CODE: // ------------MOVE TO MODULE------------
*/
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// MODULE FUNCTIONS for LST, NDVI, and new basemap
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var LandsatLST = require('users/sofiaermida/landsat_smw_lst:modules/Landsat_LST.js');
var NDVIfun = require('users/sofiaermida/landsat_smw_lst:modules/compute_NDVI.js');
var tools = require('users/jhowarth/modules:newBaseMap.js');
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Variables for legends
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var meanTemp,lstLegend;
var calculateStatsButton;
var lst_stats,a_stats,b_stats,c_stats,d_stats;
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Define the config parameters for the app.
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var config = {
  currentCity: "",
  currentState: "",
  lstInstance: null,
  ndviInstance: null,
  imperviousInstance: null,
  cityPoint: null,
  RL_outline: null,
  NRL_outline: null,
  A_outline: null,
  B_outline: null,
  C_outline: null,
  holcFiltered: null,
  holc_A_B_C_table: null,
  holc_A_table: null,
  holc_B_table: null,
  holc_C_table: null,
  holc_D_table: null,
  holc_A_image: null,
  holc_B_image: null,
  holc_C_image: null,
  holc_D_image: null,
  holc_A_B_C_image: null,
  lst_NRL_masked: null,
  lst_RL_masked: null,
  ndvi_NRL_masked: null,
  ndvi_RL_masked: null,
  impervious_NRL_masked: null,
  impervious_RL_masked: null,
  A_TempPercDiff: 0,
  B_TempPercDiff: 0,
  C_TempPercDiff: 0,
  D_TempPercDiff: 0,
  A_NDVIPercDiff: 0,
  B_NDVIPercDiff: 0,
  C_NDVIPercDiff: 0,
  D_NDVIPercDiff: 0,
  A_ImperviousPercDiff: 0,
  B_ImperviousPercDiff: 0,
  C_ImperviousPercDiff: 0,
  D_ImperviousPercDiff: 0,
  maxImpervious: 0,
  minImpervious: 0,
  maxNDVI: 0,
  minNDVI: 0,
  minTemp: 0,
  maxTemp: 0,
};
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//    MODULE FUNCTIONS
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------MOVE TO MODULE------------
var makeRow = function(color, name) {
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
        padding: '8px',
        margin: '0 0 4px 0'
        }
    });
    var description = ui.Label({
      value: name,
      style: {margin: '0 0 4px 6px'}
      });
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
      });
    };
// ------------MOVE TO MODULE------------
var makeLegend = function(layerName, palette, labels) {
  var labelList = ee.List(labels);
  var labelLength = labelList.length();
  var legend = ui.Panel({
  style: {
    padding: '8px 15px'
    }
  });
  var legendTitle = ui.Label({
    value: layerName,
    style: {
      fontSize: '14px',
      margin: '0 0 4px 0',
      padding: '0',
      fontFamily: 'Helvetica',
      }
    });
  legend.add(legendTitle);
  for (var i = 0; i < labelLength.getInfo(); i++) {
  legend.add(makeRow(palette[i], labels[i]));
  }
  return legend;
};
// ------------MOVE TO MODULE------------
var makeColorBarParams = function(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
};
// ------------MOVE TO MODULE------------
var makeGradientLegend = function(vis, title) {
  var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams(vis.palette),
    style: {stretch: 'horizontal', margin: '0px 0px', maxHeight: '24px'},
  });
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(vis.min, {margin: '4px 0px'}),
      ui.Label(
          ((vis.max+vis.min) / 2),
          {margin: '4px 0px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(vis.max, {margin: '4px 0px'})
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  var legendTitle = ui.Label({
    value: title,
    style: {fontFamily: 'Helvetica'}
  });
  return ui.Panel({widgets:[legendTitle, colorBar, legendLabels], style:{margin:'0px 0px 0px 0px'}});
};
// ------------MOVE TO MODULE------------
var tagNominalClasses = function(inDict, inString, outString) {
  var wrap = function(f) {
    var tag = inDict.get(f.get(inString));
    return f.set(outString, tag);
  };
  return wrap;
};
// ------------MOVE TO MODULE------------
var tokenList = function(f, p) {
  return ee.List(f.aggregate_array(p))
  .distinct()
  .sort();
};
// ------------MOVE TO MODULE------------
var tagIDs = function(tokenList) {
  var listLength = ee.Number(tokenList.length()).subtract(1);
  return ee.List.sequence(0,listLength,1);
};
// ------------MOVE TO MODULE------------
var makeOpacitySlider = function(value) {
    var sliderStyle = {
      fontSize: '12px',
      fontWeight: 'bold',
      fontFamily: 'Helvetica',
      color: 'black',
      padding: '4px',
      margin: '4px 24px',
      width: '150px'
    };
  var sliderOptions = {
    value: value,
    disabled: false,
    style: sliderStyle,
    step: 0.1,
    };
  return ui.Slider(sliderOptions);
};
// ------------MOVE TO MODULE------------
var makeImageFromFeatures = function(fc, p) {
  return ee.Image().byte().paint({
    featureCollection: fc,
    color: p
  });
};
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Create a lot of panels.
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var chartPanel = ui.Panel({layout: ui.Panel.Layout.Flow('vertical')});
var rlPanel = ui.Panel({layout: ui.Panel.Layout.Flow('horizontal')});
var nrlPanel = ui.Panel({layout: ui.Panel.Layout.Flow('horizontal')});
var nrlMergePanel = ui.Panel({layout: ui.Panel.Layout.Flow('horizontal')});
var basePanel = ui.Panel({layout: ui.Panel.Layout.Flow('horizontal')});
var imperviousPanel = ui.Panel({layout: ui.Panel.Layout.Flow('horizontal')});
var imperviousLegendPanel = ui.Panel({layout: ui.Panel.Layout.Flow('vertical')});
var treePanel = ui.Panel({layout: ui.Panel.Layout.Flow('horizontal')});
var treeLegendPanel = ui.Panel({layout: ui.Panel.Layout.Flow('vertical')});
var holcPanel = ui.Panel({layout: ui.Panel.Layout.Flow('horizontal')});
var holcBoundaryPanel = ui.Panel({layout: ui.Panel.Layout.Flow('horizontal')});
var aPanel = ui.Panel({layout: ui.Panel.Layout.Flow('horizontal')});
var bPanel = ui.Panel({layout: ui.Panel.Layout.Flow('horizontal')});
var cPanel = ui.Panel({layout: ui.Panel.Layout.Flow('horizontal')});
var dPanel = ui.Panel({layout: ui.Panel.Layout.Flow('horizontal')});
var tempStatsChart = ui.Panel();
var NDVIStatsChart = ui.Panel();
var ImperviousStatsChart = ui.Panel();
var maketextboxPanel = ui.Panel();
var selectPanel = ui.Panel();
var checkboxPanel = ui.Panel();
var introPanel = ui.Panel({layout:ui.Panel.Layout.Flow('vertical',true), style:{maxWidth:400,height:700}});
var buttonPanel = ui.Panel({layout:ui.Panel.Layout.Flow('horizontal',true), style:{maxWidth:400,height:700}});
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//      HOLC LISTS
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------MOVE TO MODULE------------
var centroidList = centroids.toList(196)
  .map(function(element){
    return ee.Feature(element).geometry()
})
// ------------MOVE TO MODULE------------
var cityList = holcByCity.toList(196).map(function(element) {
  var fullString = ee.Feature(element).get('city');// + ", " + ee.Feature(element).get('state')
  return fullString;
})
// ------------MOVE TO MODULE------------
var cityDict = ee.Dictionary.fromLists(cityList, centroidList)
var centroids_examples = centroids.filter(ee.Filter.or(ee.Filter.equals('city','Richmond'),ee.Filter.equals('city','Denver'),ee.Filter.equals('city','Baltimore')/*,ee.Filter.equals('city','Minneapolis')*/,ee.Filter.equals('city','Jacksonville'),ee.Filter.equals('city','Boston')))
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//      VISUALIZATION PARAMETERS
// ------------MOVE TO MODULE------------ 
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var palettes = require('users/gena/packages:palettes');
var HIGHLIGHT_STYLE = {color: 'EDBC17'};
var holcPalette = ['#74a161','#7caeb6','#d5c958','#d97867', 'white'];
var lstPalette = palettes.cmocean.Haline[7];
var treePalette = ['#ffffe5','#f7fcb9','#d9f0a3','#addd8e','#78c679','#41ab5d','#238443','#006837','#004529']; 
var impPalette = ['#E8E8E8','#C8C8C8','#A8A8A8','#787878','	#585858','#282828'];
var lstVis = {
  min: 80,
  max: 110,
  palette: lstPalette
};
var holcVis = {
  min: 0,
  max: 4,
  palette: holcPalette
};
var treeVis = {
  min: 0,
  max: 1,
  palette: treePalette
};
var imperviousVis = {
  min: 0,
  max: 100,
  palette: impPalette
};
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>
// INITIALIZE MAPS
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>
var sideMap = ui.Map();
//make the little map with state boundaries
// ------------MOVE TO MODULE------------ layer and where to zoom
var createInset = function() {
  sideMap.centerObject(ee.Geometry.Point([-98.878499,40.814068]),3);
  sideMap.style().set({height:220,maxWidth:200,width:150})
  // var empty = ee.Image().byte();
  // var outline = empty.paint({
  //   featureCollection: states,
  //   color: 1,
  //   width: 0
  // });
  //sideMap.addLayer(outline,{palette:'#777777'},'states',true,1);
};
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// UPDATES STATE OVERLAY ON SIDEMAP
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ------------MOVE TO MODULE------------
function updateOverlay(point) {
  var overlay = states.filterBounds(point).style(HIGHLIGHT_STYLE);
  sideMap.layers().set(0, ui.Map.Layer(overlay).setName('Selection').setOpacity(0.7));
  return overlay;
}
// Run it once to initialize.
createInset();
var labelStyle = {
          color: 'black',
          fontSize: '16px',
          fontWeight:'100',
          padding:'0px',
          textAlign:'center',
          width:'100%',
          margin:'5px 0px 0px 0px',
          fontFamily: 'Helvetica',
        }
function statsForSelectCity(){
  //calculateStats();
  //print(config);
  //renderChart2();
  // lst_stats = ui.Label({
  //   value: "% difference from city average",
  //   style: labelStyle,
  // });
  // a_stats = ui.Label({
  //   value: "Grade A: " + config.A_TempPercDiff.format('%.2f').getInfo() + "%",
  //   style: labelStyle,
  // });
  // b_stats = ui.Label({
  //   value: "Grade B: " + config.B_TempPercDiff.format('%.2f').getInfo() + "%",
  //   style: labelStyle,
  // });
  // c_stats = ui.Label({
  //   value: "Grade C: " + config.C_TempPercDiff.format('%.2f').getInfo() + "%",
  //   style: labelStyle,
  // });
  // d_stats = ui.Label({
  //   value: "Grade D: " + config.D_TempPercDiff.format('%.2f').getInfo() + "%",
  //   style: labelStyle,
  // });
  //chartPanel.remove(stats);
  chartPanel.insert(0,lst_stats)
  chartPanel.insert(1,a_stats);
  //chartPanel.insert(2,b_stats);
  //chartPanel.insert(3,c_stats);
  //chartPanel.insert(4,d_stats);
  checkboxPanel.remove(calculateStatsButton);
}
// Makes a select table of the cities within state.
function makeSelect(state,cities){
  var selectLabel = ui.Label({
    value: 'Cities with HOLC data in ' + state.getInfo(),
    style: {stretch: 'vertical',
            fontWeight: '500',
            fontSize: '16px',
            padding:'0px',
            color:'#EDBC17'
    }
  });
  var select = ui.Select({
    items: cities.getInfo(),
    onChange: function(city) {
      //chartPanel.remove(stats);
      config.currentCity = city;
      config.cityPoint = ee.Geometry(cityDict.get(config.currentCity));
      //print(city);
      loadLST();
      loadNDVI()
      loadImpervious();
      loadHOLC();
      showChartsCheck.style().set({'shown':false});
      //legendPanel.remove(lstLegend)
      //calculateStatsButton = makeButton(statsForSelectCity,'Calculate charts for city');
      //checkboxPanel.insert(3,calculateStatsButton);
      calculateStats();
      lstVis = {
        min: meanTemp.int().subtract(15).getInfo(),
        max: meanTemp.int().add(15).getInfo(),
        palette: lstPalette
      };
      lstLegend = makeGradientLegend(lstVis,'Land surface temperature (F)');
      legendPanel.insert(0,lstLegend)
      lstLegend.style().set({textAlign:'center',fontWeight:'100',maxWidth:'200px',position:'bottom-left',margin:'0px 0px 0px 0px'})
      //renderChart();
      //map.centerObject(config.cityPoint,12);
      renderMap(12);
    },
    style: {width:'200px'},
    placeholder: 'Choose a city',
  });
selectPanel = ui.Panel([selectLabel,select],ui.Panel.Layout.flow('vertical'));
introPanel.insert(4,selectPanel);
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// HANDLES CLICK ON SIDEMAP
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
function handleMapClick(coordinates) {
  var point = ee.Geometry.Point([coordinates.lon, coordinates.lat]);
  var selectState = states.filterBounds(point);
  print(selectState)
  var stateName = selectState.first().get('gn_name');
  var stateAbbrev = selectState.first().get('postal');
  config.currentState = stateAbbrev.getInfo();
  updateOverlay(point);
  var citiesForSelect = holcByCity.filterBounds(selectState).toList(20).map(function(element) {
    var fullString = ee.Feature(element).get('city');
  return fullString;
})
  introPanel.remove(selectPanel);
  makeSelect(stateName,citiesForSelect);
}
sideMap.onClick(handleMapClick);
var map = ui.Map();
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// FUNCTION TO SET UP MAP PREFERENCES
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
function setUpMap(){
  map.setOptions('Simple Map', {'Simple Map': tools.baseMap});
  sideMap.setOptions('Simple Map', {'Simple Map': tools.baseMap});
  map.setControlVisibility({
    all: false,
    layerList: false,
    zoomControl: true,
    scaleControl: true,
    mapTypeControl: false,
    fullscreenControl: true,
    drawingToolsControl: false,
  });
  sideMap.setControlVisibility({
    all: false,
    layerList: false,
    zoomControl: true,
    scaleControl: true,
    mapTypeControl: false,
    fullscreenControl: true,
    drawingToolsControl: false,
  });
}
setUpMap();
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// FUNCTION FOR CALCULATING NDVI, LST, IMPERVIOUS STATS
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
function calculateStats(){
  //Most of these stats functions could be consolidated and moved to a module to make this function shorter
  // ------------MOVE TO MODULE------------
  meanTemp = ee.Number(config.lstInstance.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: config.holcFiltered.geometry(),
    scale: 30,
    maxPixels: 1e8
  }).get('LST'));
  var meanNDVI = ee.Number(config.ndviInstance.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: config.holcFiltered.geometry(),
    scale: 30,
    maxPixels: 1e8
  }).get('NDVI'));
  var meanImpervious = ee.Number(config.imperviousInstance.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: config.holcFiltered.geometry(),
    scale: 30,
    maxPixels: 1e8
  }).get('impervious'));
  config.A_TempPercDiff = ee.Number(config.lstInstance.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: config.holc_A_table.geometry(),
    scale: 30,
    maxPixels: 1e8
  }).get('LST')).subtract(meanTemp).divide(meanTemp).multiply(100);
  config.B_TempPercDiff = ee.Number(config.lstInstance.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: config.holc_B_table.geometry(),
    scale: 30,
    maxPixels: 1e8
  }).get('LST')).subtract(meanTemp).divide(meanTemp).multiply(100);
  config.C_TempPercDiff = ee.Number(config.lstInstance.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: config.holc_C_table.geometry(),
    scale: 30,
    maxPixels: 1e8
  }).get('LST')).subtract(meanTemp).divide(meanTemp).multiply(100);
  config.D_TempPercDiff = ee.Number(config.lstInstance.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: config.holc_D_table.geometry(),
    scale: 30,
    maxPixels: 1e8
  }).get('LST')).subtract(meanTemp).divide(meanTemp).multiply(100);
  config.A_NDVIPercDiff = ee.Number(config.ndviInstance.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: config.holc_A_table.geometry(),
    scale: 30,
    maxPixels: 1e8
  }).get('NDVI')).subtract(meanNDVI).divide(meanNDVI).multiply(100);
  config.B_NDVIPercDiff = ee.Number(config.ndviInstance.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: config.holc_B_table.geometry(),
    scale: 30,
    maxPixels: 1e8
  }).get('NDVI')).subtract(meanNDVI).divide(meanNDVI).multiply(100);
  config.C_NDVIPercDiff = ee.Number(config.ndviInstance.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: config.holc_C_table.geometry(),
    scale: 30,
    maxPixels: 1e8
  }).get('NDVI')).subtract(meanNDVI).divide(meanNDVI).multiply(100);
  config.D_NDVIPercDiff = ee.Number(config.ndviInstance.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: config.holc_D_table.geometry(),
    scale: 30,
    maxPixels: 1e8
  }).get('NDVI')).subtract(meanNDVI).divide(meanNDVI).multiply(100);
  config.A_ImperviousPercDiff = ee.Number(config.imperviousInstance.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: config.holc_A_table.geometry(),
    scale: 30,
    maxPixels: 1e8
  }).get('impervious')).subtract(meanImpervious).divide(meanImpervious).multiply(100);
  config.B_ImperviousPercDiff = ee.Number(config.imperviousInstance.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: config.holc_B_table.geometry(),
    scale: 30,
    maxPixels: 1e8
  }).get('impervious')).subtract(meanImpervious).divide(meanImpervious).multiply(100);
  config.C_ImperviousPercDiff = ee.Number(config.imperviousInstance.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: config.holc_C_table.geometry(),
    scale: 30,
    maxPixels: 1e8
  }).get('impervious')).subtract(meanImpervious).divide(meanImpervious).multiply(100);
  config.D_ImperviousPercDiff = ee.Number(config.imperviousInstance.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: config.holc_D_table.geometry(),
    scale: 30,
    maxPixels: 1e8
  }).get('impervious')).subtract(meanImpervious).divide(meanImpervious).multiply(100);
 config.maxImpervious = config.A_ImperviousPercDiff.abs().max(config.B_ImperviousPercDiff.abs()).max(config.C_ImperviousPercDiff.abs()).max(config.D_ImperviousPercDiff.abs())
 config.minImpervious = (ee.Number(0).subtract(config.maxImpervious))
 config.maxNDVI = config.A_NDVIPercDiff.abs().max(config.B_NDVIPercDiff.abs()).max(config.C_NDVIPercDiff.abs()).max(config.D_NDVIPercDiff.abs())
 config.minNDVI = (ee.Number(0).subtract(config.maxNDVI));
 config.maxTemp = config.A_TempPercDiff.abs().max(config.B_TempPercDiff.abs()).max(config.C_TempPercDiff.abs()).max(config.D_TempPercDiff.abs())
 config.minTemp = (ee.Number(0).subtract(config.maxTemp));
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// FUNCTION FOR LOADING NDVI FOR A CITY
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ------------MOVE TO MODULE------------
function loadNDVI(){
  var satellite = 'L8';
  var use_ndvi = true;
  var landsatFiltered_2020 = landsat
    .filter(ee.Filter.date('2020-06-01', '2020-08-31'))
    .filterBounds(config.cityPoint);
  var landsatFiltered_2019 = landsat
    .filter(ee.Filter.date('2019-06-01', '2019-08-31'))
    .filterBounds(config.cityPoint);
  var landsatFiltered_2018 = landsat
    .filter(ee.Filter.date('2018-06-01', '2018-08-31'))
    .filterBounds(config.cityPoint);
  var landsatFiltered_2017 = landsat
    .filter(ee.Filter.date('2017-06-01', '2017-08-31'))
    .filterBounds(config.cityPoint);
  var landsatFiltered_2016 = landsat
    .filter(ee.Filter.date('2016-06-01', '2016-08-31'))
    .filterBounds(config.cityPoint);
  var NDVI_2019 = landsatFiltered_2019.map(NDVIfun.addBand(satellite));
  var NDVI_2018 = landsatFiltered_2018.map(NDVIfun.addBand(satellite));
  var NDVI_2017 = landsatFiltered_2017.map(NDVIfun.addBand(satellite));
  var NDVI_2016 = landsatFiltered_2016.map(NDVIfun.addBand(satellite));
  var NDVI_2020 = landsatFiltered_2020.map(NDVIfun.addBand(satellite));
  var NDVI = NDVI_2020.merge(NDVI_2019).merge(NDVI_2018)//.merge(NDVI_2017).merge(NDVI_2016);
  config.ndviInstance = NDVI.select('NDVI').max();
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// FUNCTION FOR LOADING IMPERVIOUS DATA FOR CITY
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ------------MOVE TO MODULE------------
function loadImpervious(){
  var collection= ee.ImageCollection(nlcd)
    .filter(ee.Filter.date('2016-01-01', '2016-12-31'))
    .filterBounds(config.cityPoint);
  config.imperviousInstance = collection.select('impervious').max();
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// FUNCTION FOR LOADING LST OVER 5 YEARS FOR A CITY
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ------------MOVE TO MODULE------------
function loadLST(){
  var date_start = '2016-06-01';
  var date_end = '2020-08-31';
  var satellite = 'L8';
  var use_ndvi = true;
  var landsatFiltered = landsat
    .filter(ee.Filter.date(date_start, date_end))
    .filterBounds(config.cityPoint)
  var LST_2019 = LandsatLST.collection(satellite, '2019-06-01', '2019-08-31', config.cityPoint, use_ndvi);
  var LST_2018 = LandsatLST.collection(satellite, '2018-06-01', '2018-08-31', config.cityPoint, use_ndvi);
  var LST_2017 = LandsatLST.collection(satellite, '2017-06-01', '2017-08-31', config.cityPoint, use_ndvi);
  var LST_2016 = LandsatLST.collection(satellite, '2016-06-01', '2016-08-31', config.cityPoint, use_ndvi);
  var LST_2020 = LandsatLST.collection(satellite, '2020-06-01', '2020-08-31', config.cityPoint, use_ndvi);
  var LST = LST_2020.merge(LST_2019).merge(LST_2018).merge(LST_2017).merge(LST_2016);
  var max = LST.select('LST').max();
  config.lstInstance = max.expression(
    '((LST - 273.15)*1.8)+32', {
      'LST': max.select('LST')
  }).rename('LST');
}
function customOutline(fc,width) {
  return ee.Image().byte().paint({
    featureCollection: fc,
    color: 1,
    width: width
  });
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// FUNCTION FOR LOADING HOLC DATA
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ------------MOVE TO MODULE------------
function loadHOLC(){
  //filter the bounds of HOLC data to only show the relevant boundaries
  config.holcFiltered = holc.filter(ee.Filter.and(ee.Filter.neq('holc_grade',''),ee.Filter.eq('city',config.currentCity)));
  var holcList = tokenList(config.holcFiltered, 'holc_grade');
  var holcTags = tagIDs(holcList);
  var holcDict = ee.Dictionary.fromLists(holcList, holcTags);
  var holcTagged = config.holcFiltered.map(tagNominalClasses(holcDict, 'holc_grade', 'TAG'));
  var holcImage = makeImageFromFeatures(holcTagged, 'TAG');
  config.holc_A_B_C_table = holcTagged.filter(ee.Filter.or(ee.Filter.equals('holc_grade','A'),ee.Filter.equals('holc_grade','B'),ee.Filter.equals('holc_grade','C')));
  config.holc_A_table = holcTagged.filter(ee.Filter.equals('holc_grade','A'));
  config.holc_B_table = holcTagged.filter(ee.Filter.equals('holc_grade','B'));
  config.holc_C_table = holcTagged.filter(ee.Filter.equals('holc_grade','C'));
  config.holc_D_table = holcTagged.filter(ee.Filter.equals('holc_grade','D'));
  config.holc_A_image = makeImageFromFeatures(holcTagged.filter(ee.Filter.equals('holc_grade','A')),'TAG');
  config.holc_B_image = makeImageFromFeatures(holcTagged.filter(ee.Filter.equals('holc_grade','B')),'TAG');
  config.holc_C_image = makeImageFromFeatures(holcTagged.filter(ee.Filter.equals('holc_grade','C')),'TAG');
  config.holc_D_image = makeImageFromFeatures(holcTagged.filter(ee.Filter.equals('holc_grade','D')),'TAG');
  config.holc_A_B_C_image = ee.Image().byte().paint({featureCollection: config.holc_A_B_C_table,color:1});
  config.RL_outline = customOutline(config.holc_D_table,2);
  config.A_outline = customOutline(config.holc_A_table,2);
  config.B_outline = customOutline(config.holc_B_table,2);
  config.C_outline = customOutline(config.holc_C_table,2);
  config.NRL_outline= customOutline(config.holc_A_B_C_table,1);
  config.lst_RL_masked = config.lstInstance.updateMask(config.holc_D_image);
  config.lst_NRL_masked = config.lstInstance.updateMask(config.holc_A_B_C_image);
  config.ndvi_RL_masked = config.ndviInstance.updateMask(config.holc_D_image);
  config.ndvi_NRL_masked = config.ndviInstance.updateMask(config.holc_A_B_C_image);
  config.impervious_RL_masked = config.imperviousInstance.updateMask(config.holc_D_image);
  config.impervious_NRL_masked = config.imperviousInstance.updateMask(config.holc_A_B_C_image);
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//    STYLE PANELS AND CREATE LABELS
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ------------MOVE TO MODULE------------
// some of the labeling could be streamlined with a module function
var panel = ui.Panel({
  style: {
    width: '30%',
    maxWidth: '600px',
  }
});
var layersTitle = ui.Label({value:"Layers",style: {
    color: 'black',
    fontSize: '14px',
    fontWeight:'bold',
    padding:'5px',
    shown: true,
    fontFamily: 'Helvetica',
  }});
var cityTitle = ui.Label({
  value: "",
  style: {
    color: 'black',
    fontSize: '20px',
    fontWeight:'700',
    padding:'0px',
    textAlign:'left',
    width:'100%',
    margin:'10px 0px 0px 16px',
    fontFamily: 'Helvetica',
  }
});
var title = ui.Label({
  value: "Redlining and Land Surface Temperature in U.S. Cities",
  style: {
    fontSize: '18px',
    fontWeight: '300',
    color:'black',
    fontFamily: 'Helvetica',
  }
});
var clickInstruction = ui.Label({
  value: "Select a city to explore its legacy of redlining:",
  style: {
    color: 'black',
    fontSize: '16px',
    fontWeight:'500',
    padding:'0px',
    margin:'5px 0px 0px 10px',
    shown: true,
    fontFamily: 'Helvetica',
  }
});
var clickInstruction2 = ui.Label({
  value: "Or, you can click on any state on the map below to generate data for one of its cities:",
  style: {
    color: '#000000',
    fontSize: '16px',
    fontWeight:'500',
    padding:'0px',
    margin: '25px 0px 10px 10px',
    fontFamily: 'Helvetica',
  }
});
var clickInstruction3 = ui.Label({
  value: "Warning: generating your own data will take some patience.",
  style: {
    color: '#777777',
    fontSize: '14px',
    padding:'0px',
    margin: '0px 0px 10px 10px',
    fontFamily: 'Helvetica',
  }
});
var credits = ui.Label({
  value: "Developed by Zach Levitt and Professor Jeff Howarth, Middlebury College, Vermont, USA",
  style: {
    color: 'gray',
    fontSize: '12px',
    fontWeight:'100',
    padding:'15px 0px 0px 0px',
    fontFamily: 'Helvetica',
  }
});
// ------------MOVE TO MODULE------------
// module function could render chart for one of the factors
// so three calls in this function
function renderChart(){
  chartPanel.add(showChartsCheck);
  showChartsCheck.style().set({'shown':true});
  showChartsCheck.setValue(true);
  var arrayTemp = ee.Array([[config.A_TempPercDiff],[config.B_TempPercDiff],[config.C_TempPercDiff],[config.D_TempPercDiff]]);
  var arrayNDVI = ee.Array([[config.A_NDVIPercDiff],[config.B_NDVIPercDiff],[config.C_NDVIPercDiff],[config.D_NDVIPercDiff]]);
  var arrayImpervious = ee.Array([[config.A_ImperviousPercDiff],[config.B_ImperviousPercDiff],[config.C_ImperviousPercDiff],[config.D_ImperviousPercDiff]]);
  tempStatsChart = ui.Chart.array.values(arrayTemp,1,['']) //ee.Array([['type', 'number'],['median temp',ee.Number.parse(medianTemp)],['redlined',ee.Number.parse(medianTempRedlined)],['not redlined',ee.Number.parse(medianTempNotRedlined)]]);
  tempStatsChart.setChartType('BarChart');
  tempStatsChart.setOptions(
    {legend: {position:'top'},
      bar: {groupWidth: "60%"},
    title:'Land Surface Temperature (F)',
    titleTextStyle: 
      {color: 'black', 
      fontSize: 14,
      bold: false,
      fontFamily: 'Helvetica',
      },
    series: {
      0: {
        color: '#74a161',
        labelInLegend: 'A',
      },
      1: {
        color: '#7caeb6',
        labelInLegend: 'B',
      },
      2: {
        color: '#d5c958',
        labelInLegend: 'C',
      },
      3: {
        color: '#d97867',
        labelInLegend: 'D',
      }
      },
    width:200,
    hAxis :{direction:1,
            title:'% difference from average',
            minValue:config.minTemp,
            maxValue:config.maxTemp}})
  chartPanel.insert(1,tempStatsChart);
  ImperviousStatsChart = ui.Chart.array.values(arrayImpervious,1,['']) //ee.Array([['type', 'number'],['median temp',ee.Number.parse(medianTemp)],['redlined',ee.Number.parse(medianTempRedlined)],['not redlined',ee.Number.parse(medianTempNotRedlined)]]);
  ImperviousStatsChart.setChartType('BarChart');
  ImperviousStatsChart.setOptions(
    {legend: {position:'none'},
    bar: {groupWidth: "60%"},
    title:'Impervious surfaces (roads and buildings)',
    titleTextStyle: 
      {color: 'black', 
      fontSize: 14,
      bold: false,
      fontFamily: 'Helvetica',
      },
    series: {
      0: {
        color: '#74a161',
        labelInLegend: 'A',
      },
      1: {
        color: '#7caeb6',
        labelInLegend: 'B',
      },
      2: {
        color: '#d5c958',
        labelInLegend: 'C',
      },
      3: {
        color: '#d97867',
        labelInLegend: 'D',
      }
      },
    maxWidth:200,
    hAxis :{direction:1,title:'% difference from average',minValue:config.minImpervious,maxValue:config.maxImpervious}})
  chartPanel.insert(2,ImperviousStatsChart);
  NDVIStatsChart = ui.Chart.array.values(arrayNDVI,1,['']) //ee.Array([['type', 'number'],['median temp',ee.Number.parse(medianTemp)],['redlined',ee.Number.parse(medianTempRedlined)],['not redlined',ee.Number.parse(medianTempNotRedlined)]]);
  NDVIStatsChart.setChartType('BarChart');
  NDVIStatsChart.setOptions(
    {legend: {position:'none'},
      bar: {groupWidth: "60%"},
    title:'NDVI (Tree canopy and green space)',
    titleTextStyle: 
      {color: 'black', 
      fontSize: 14,
      bold: false,
      fontFamily: 'Helvetica',
      },
    series: {
      0: {
        color: '#74a161',
        labelInLegend: 'A',
      },
      1: {
        color: '#7caeb6',
        labelInLegend: 'B',
      },
      2: {
        color: '#d5c958',
        labelInLegend: 'C',
      },
      3: {
        color: '#d97867',
        labelInLegend: 'D',
      }
      },
    width:250,
    hAxis :{direction:1,title:'% difference from average',minValue:config.minNDVI,maxValue:config.maxNDVI}})
  chartPanel.insert(3,NDVIStatsChart);
  // ------------MOVE TO MODULE------------
  //this could be moved to a module also, including below
  lstVis = {
    min: meanTemp.int().subtract(15).getInfo(),
    max: meanTemp.int().add(15).getInfo(),
    palette: lstPalette
  };
  // ------------MOVE TO MODULE------------
  lstLegend = makeGradientLegend(lstVis,'Land surface temperature (F)');
  legendPanel.insert(0,lstLegend)
  lstLegend.style().set({textAlign:'center',fontWeight:'100',maxWidth:'250px',position:'bottom-left',margin:'0px 0px 0px 0px'})
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// FUNCTIONS FOR RENDERING THE MAP and PANELS
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ------------MOVE TO MODULE------------ if config dict can be moved to dictionary
function renderMap(zoom){
  print(config);
  cityTitle.setValue(config.currentCity + ", " + config.currentState);
  map.centerObject(config.cityPoint,zoom);
  map.addLayer(config.lstInstance,lstVis, 'LST',true,0.4);
  map.addLayer(config.ndviInstance,treeVis, 'NDVI',false,1);
  map.addLayer(config.imperviousInstance,imperviousVis, 'Impervious',false,1);
  map.addLayer(config.lst_RL_masked,lstVis, 'Redlined neighborhoods image',true,1);//4
  map.addLayer(config.lst_NRL_masked,lstVis, 'Not redlined neighborhoods image',true,1);//5
  map.addLayer(config.NRL_outline, {palette: '#000000'}, 'Not redlined neighborhoods - outline', true, 1);//6
   map.addLayer(config.holc_A_image, holcVis, 'Grade A image', false, 0.8);//7
  map.addLayer(config.holc_B_image, holcVis, 'Grade B image', false, 0.8);//8
  map.addLayer(config.holc_C_image, holcVis, 'Grade C image', false, 0.8);//9
  map.addLayer(config.holc_D_image, holcVis, 'Grade D image', false, 0.8);//10
  map.addLayer(config.A_outline, {palette: '#3e911d'}, 'Grade A outline', false, 1);//11
  map.addLayer(config.B_outline, {palette: '#4689bf'}, 'Grade B outline', false, 1);//12
  map.addLayer(config.C_outline, {palette: '#ebd10e'}, 'Grade C outline',false, 1);//13
  map.addLayer(config.RL_outline, {palette: '#eb0000'}, 'Redlined neighborhoods - outline', 1, 1);//14
  introPanel.style().set({shown:false});
  checkboxPanel.style().set({shown:true});
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//    FUNCTIONS FOR PRESET CITIES
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
function renderDenver(){
  config.currentCity = 'Denver';
  config.currentState = 'CO';
  config.cityPoint = centroids_examples.filter(ee.Filter.equals('city','Denver')).geometry()
  config.lstInstance = denver.select('LST')
  config.ndviInstance = denver.select('NDVI')
  config.imperviousInstance = denver.select('impervious')
  loadHOLC();
  calculateStats();
  renderChart();
  renderMap(11);
}
function renderBoston(){
  config.currentCity = 'Boston';
  config.currentState = 'MA';
  config.cityPoint = centroids_examples.filter(ee.Filter.equals('city','Boston')).geometry()
  config.lstInstance = boston.select('LST')
  config.ndviInstance = boston.select('NDVI')
  config.imperviousInstance = boston.select('impervious')
  loadHOLC();
  calculateStats();
  renderChart();
  renderMap(11);
}
function renderJacksonville(){
  config.currentCity = 'Jacksonville';
  config.currentState = 'FL';
  config.cityPoint = centroids_examples.filter(ee.Filter.equals('city','Jacksonville')).geometry()
  config.lstInstance = jacksonville.select('LST')
  config.ndviInstance = jacksonville.select('NDVI')
  config.imperviousInstance = jacksonville.select('impervious')
  loadHOLC();
  calculateStats();
  renderChart();
  renderMap(12);
}
function renderRichmond(){
  config.currentCity = 'Richmond';
  config.currentState = 'VA';
  config.cityPoint = centroids_examples.filter(ee.Filter.equals('city','Richmond')).geometry()
  config.lstInstance = richmond.select('LST')
  config.ndviInstance = richmond.select('NDVI')
  config.imperviousInstance = richmond.select('impervious')
  loadHOLC();
  calculateStats();
  renderChart();
  renderMap(12);
}
function renderBaltimore(){
  config.currentCity = 'Baltimore';
  config.currentState = 'MD';
  config.cityPoint = centroids_examples.filter(ee.Filter.equals('city','Baltimore')).geometry()
  config.lstInstance = baltimore.select('LST')
  config.ndviInstance = baltimore.select('NDVI')
  config.imperviousInstance = baltimore.select('impervious')
  loadHOLC();
  calculateStats();
  renderChart();
  renderMap(11);
}
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//    CREATE BUTTONS FOR PRESET CITIES
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// ------------MOVE TO MODULE------------
// function to create city button with a function and title
function makeButton(fxn,label,width){
  var button = ui.Button({
  label: label,
  onClick: fxn,
  style: {fontSize:'28px',
          fontWeight:'700',
          color:'black',
          padding:'0px',
          width:width,
  }
  });
  return ui.Panel(button);
}
var jacksonvilleButton = makeButton(renderJacksonville,'Jacksonville, FL','125px');
var bostonButton = makeButton(renderBoston,'Boston, MA','125px');
var denverButton = makeButton(renderDenver,'Denver, CO','125px');
var baltimoreButton = makeButton(renderBaltimore,'Baltimore, MD','125px');
var richmondButton = makeButton(renderRichmond,'Richmond, VA','125px');
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//    SETUP INTRO PANEL and SPLIT PANEL
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
panel.add(title);
panel.add(introPanel);
introPanel.add(clickInstruction);
introPanel.add(buttonPanel);
buttonPanel.add(richmondButton);
buttonPanel.add(baltimoreButton);
buttonPanel.add(denverButton);
buttonPanel.add(bostonButton);
buttonPanel.add(jacksonvilleButton);
introPanel.add(clickInstruction2);
introPanel.add(clickInstruction3);
introPanel.add(sideMap);
panel.add(checkboxPanel);
panel.add(credits);
var splitPanel = ui.SplitPanel({
  firstPanel: panel,
  secondPanel: map,
});
ui.root.clear();
ui.root.add(splitPanel);
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//        CREATE AND STYLE LEGENDS
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
var treeLegend = makeGradientLegend(treeVis, 'Tree canopy (NDVI)');
var imperviousLegend = makeGradientLegend(imperviousVis, 'Impervious surfaces');
var legendPanel = ui.Panel({widgets:[],layout: ui.Panel.Layout.absolute(),style:{height:'110px',width:'100%',margin:'0px 0px 0px 0px'}});
treeLegend.style().set({shown: false,maxWidth:'225px',margin:'0px 0px 0px 10px'});
imperviousLegend.style().set({shown: false,maxWidth:'225px',margin:'0px 0px 0px 10px'});
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//        CREATE AND STYLE SLIDERS
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
var rlSlider = makeOpacitySlider(1);
rlSlider.style().set({margin:'0px 0px 0px 0px'});
var nrlSlider = makeOpacitySlider(1);
nrlSlider.style().set({margin:'0px 0px 0px 0px'});
var treeSlider = makeOpacitySlider(1);
treeSlider.style().set({shown: false});
var imperviousSlider = makeOpacitySlider(1);
imperviousSlider.style().set({shown: false,margin:'20px 0px 0px 0px'});
var holcSlider = makeOpacitySlider(0.9);
holcSlider.style().set({shown: false,margin:'0px 0px 0px 0px'});
var holcBoundarySlider = makeOpacitySlider(1);
holcBoundarySlider.style().set({shown: false,margin:'0px 0px 0px 0px'});
var baseSlider = makeOpacitySlider(0.4);
baseSlider.style().set({margin:'0px 0px 0px 0px'});
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//        SET SLIDER ONCHANGE FUNCTIONS
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
/*
LAYER OVERVIEW
0: LST basemap
1: NDVI
2: impervious
3: redlined
4: not redlined
5: not redlined merged boundary
6: Grade A polygon
7: Grade B polygon
8: Grade C polygon
9: Grade D polygon
10: Grade A boundary
11: Grade B boundary
12: Grade C boundary
13: Grade D boundary
*/
// ------------MOVE TO MODULE------------
// could do a function that takes a list of which layers to change
baseSlider.onChange(function(value) {
  map.layers().get(0).setOpacity(value);
});
rlSlider.onChange(function(value) {
  map.layers().get(3).setOpacity(value);
});
nrlSlider.onChange(function(value) {
  map.layers().get(4).setOpacity(value);
});
treeSlider.onChange(function(value) {
  map.layers().get(1).setOpacity(value);
});
imperviousSlider.onChange(function(value) {
  map.layers().get(2).setOpacity(value);
});
holcSlider.onChange(function(value) {
  map.layers().get(6).setOpacity(value);
  map.layers().get(7).setOpacity(value);
  map.layers().get(8).setOpacity(value);
  map.layers().get(9).setOpacity(value);
});
holcBoundarySlider.onChange(function(value) {
  map.layers().get(5).setOpacity(value);
  map.layers().get(10).setOpacity(value);
  map.layers().get(11).setOpacity(value);
  map.layers().get(12).setOpacity(value);
  map.layers().get(13).setOpacity(value);
});
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//        CREATE AND STYLE CHECKBOXES
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
function makeCheckBox(label,checked) {
  var checkStyle = {
    fontSize: '14px',
    fontFamily: 'Helvetica',
    color: 'black',
    padding: '4px',
    margin: '4px 4px'
    };
  var checkOptions = {
    label: label,
    value: checked,
    disabled: false,
    style: checkStyle
    };
  return ui.Checkbox(checkOptions);
}
var showChartsCheck = makeCheckBox('Show charts',true);
showChartsCheck.style().set({margin:'0px 0px 10px 16px'})
var rlLayerCheck = makeCheckBox("LST in redlined neighborhoods",true);
rlLayerCheck.style().set({margin:'0px 0px 0px 0px'});
var nrlLayerCheck = makeCheckBox('LST in not redlined neighborhoods',true);
nrlLayerCheck.style().set({margin:'0px 0px 0px 0px'});
var nrlMergeCheck = makeCheckBox('Separate neighborhoods by grade',false);
nrlMergeCheck.style().set({margin:'0px 0px 0px 40px'})
var imperviousCheck = makeCheckBox('Impervious surfaces',false);
imperviousCheck.style().set({margin:'20px 0px 0px 0px'})
var treeCheck = makeCheckBox('Tree canopy (NDVI)',false);
treeCheck.style().set({margin:'0px 0px 20px 0px'})
var holcCheck = makeCheckBox("Neighborhoods by HOLC grade",false);
holcCheck.style().set({margin:'0px 0px 0px 0px'})
var holcBoundaryCheck = makeCheckBox("Neighborhood boundaries by HOLC grade",true);
holcBoundaryCheck.style().set({margin:'0px 0px 0px 0px'})
var a_Check = makeCheckBox("Grade A",true);
var b_Check = makeCheckBox("Grade B",true);
var c_Check = makeCheckBox("Grade C",true);
var d_Check = makeCheckBox("Grade D",true);
a_Check.style().set({margin:'0px 0px 0px 40px'});
b_Check.style().set({margin:'0px 0px 0px 40px'});
c_Check.style().set({margin:'0px 0px 0px 40px'});
d_Check.style().set({margin:'0px 0px 0px 40px'});
var baseCheck = makeCheckBox("LST basemap",true);
baseCheck.style().set({margin:'0px 0px 0px 0px'});
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//        SET CHECKBOX ONCHANGE FUNCTIONS
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
showChartsCheck.onChange(function(checked){
  tempStatsChart.style().set({shown:checked})
  NDVIStatsChart.style().set({shown:checked})
  ImperviousStatsChart.style().set({shown:checked})
})
baseCheck.onChange(function(checked) {
  map.layers().get(0).setShown(checked);
  baseSlider.style().set({shown: checked});
});
rlLayerCheck.onChange(function(checked) {
  map.layers().get(3).setShown(checked);
  rlSlider.style().set({shown: checked});
});
nrlLayerCheck.onChange(function(checked) {
  map.layers().get(4).setShown(checked);
  nrlSlider.style().set({shown: checked});
});
nrlMergeCheck.onChange(function(checked) {
  map.layers().get(5).setShown(!checked);
  map.layers().get(10).setShown(checked);
  map.layers().get(11).setShown(checked);
  map.layers().get(12).setShown(checked);
});
a_Check.onChange(function(checked) {
  map.layers().get(6).setShown((checked&holcCheck.getValue()));
  map.layers().get(10).setShown((checked&holcBoundaryCheck.getValue()));
});
b_Check.onChange(function(checked) {
  map.layers().get(7).setShown((checked&holcCheck.getValue()));
  map.layers().get(11).setShown((checked&holcBoundaryCheck.getValue()));
});
c_Check.onChange(function(checked) {
  map.layers().get(8).setShown((checked&holcCheck.getValue()));
  map.layers().get(12).setShown((checked&holcBoundaryCheck.getValue()));
});
d_Check.onChange(function(checked) {
  map.layers().get(9).setShown((checked&holcCheck.getValue()));
  map.layers().get(13).setShown((checked&holcBoundaryCheck.getValue()));
});
holcBoundaryCheck.onChange(function(checked) {
  map.layers().get(5).setShown(checked&!nrlMergeCheck.getValue());
  map.layers().get(10).setShown(checked&a_Check.getValue()&nrlMergeCheck.getValue());
  map.layers().get(11).setShown(checked&b_Check.getValue()&nrlMergeCheck.getValue());
  map.layers().get(12).setShown(checked&c_Check.getValue()&nrlMergeCheck.getValue());
  map.layers().get(13).setShown(checked&d_Check.getValue()&nrlMergeCheck.getValue());
  a_Check.style().set({shown:(checked||holcCheck.getValue())});
  b_Check.style().set({shown:(checked||holcCheck.getValue())});
  c_Check.style().set({shown:(checked||holcCheck.getValue())});
  d_Check.style().set({shown:(checked||holcCheck.getValue())});
  holcBoundarySlider.style().set({shown: checked});
});
holcCheck.onChange(function(checked) {
  map.layers().get(6).setShown(checked&a_Check.getValue());
  map.layers().get(7).setShown(checked&b_Check.getValue());
  map.layers().get(8).setShown(checked&c_Check.getValue());
  map.layers().get(9).setShown(checked&d_Check.getValue());
  a_Check.style().set({shown:(checked||holcBoundaryCheck.getValue())});
  b_Check.style().set({shown:(checked||holcBoundaryCheck.getValue())});
  c_Check.style().set({shown:(checked||holcBoundaryCheck.getValue())});
  d_Check.style().set({shown:(checked||holcBoundaryCheck.getValue())});
  holcSlider.style().set({shown: checked});
});
treeCheck.onChange(function(checked) {
  map.layers().get(1).setShown(checked);
  treeLegend.style().set({shown: checked});
  treeSlider.style().set({shown: checked});
});
imperviousCheck.onChange(function(checked) {
  map.layers().get(2).setShown(checked);
  imperviousLegend.style().set({shown: checked});
  imperviousSlider.style().set({shown: checked});
});
function resetMap(){
  a_Check.style().set({shown:false});
  b_Check.style().set({shown:false});
  c_Check.style().set({shown:false});
  d_Check.style().set({shown:false});
  introPanel.style().set({shown:true});
  map.clear();
  setUpMap();
  map.centerObject(ee.Geometry.Point([-98.878499,40.814068]),4);
  //chartPanel.remove(tempStatsChart);
  //chartPanel.remove(NDVIStatsChart);
  //chartPanel.remove(ImperviousStatsChart);
  chartPanel.clear()
  legendPanel.remove(lstLegend);
  checkboxPanel.style().set({shown:false});
  //showChartsCheck.style().set({'shown':true});
  config.currentCity = "";
  config.currentState = "";
}
function addCheckboxes(){
  checkboxPanel.style().set({shown:false});
  checkboxPanel.add(makeButton(resetMap,'Reset map','100px'));
  checkboxPanel.add(cityTitle);
  checkboxPanel.add(legendPanel);
  checkboxPanel.add(chartPanel);
  checkboxPanel.add(layersTitle);
  //chartPanel.add(showChartsCheck);
  basePanel.add(baseCheck);
  basePanel.add(baseSlider);
  checkboxPanel.add(basePanel);
  rlPanel.add(rlLayerCheck);
  rlPanel.add(rlSlider);
  checkboxPanel.add(rlPanel);
  nrlPanel.add(nrlLayerCheck);
  nrlPanel.add(nrlSlider);
  checkboxPanel.add(nrlPanel);
  nrlMergePanel.add(nrlMergeCheck);
  checkboxPanel.add(nrlMergePanel);
  imperviousPanel.add(imperviousCheck);
  imperviousPanel.add(imperviousSlider);
  imperviousLegendPanel.add(imperviousPanel);
  imperviousLegendPanel.add(imperviousLegend);
  checkboxPanel.add(imperviousLegendPanel);
  treePanel.add(treeCheck);
  treePanel.add(treeSlider);
  treeLegendPanel.add(treePanel);
  treeLegendPanel.add(treeLegend);
  checkboxPanel.add(treeLegendPanel);
  holcBoundaryPanel.add(holcBoundaryCheck);
  holcBoundaryPanel.add(holcBoundarySlider);
  checkboxPanel.add(holcBoundaryPanel);
  holcPanel.add(holcCheck);
  holcPanel.add(holcSlider);
  checkboxPanel.add(holcPanel);
  checkboxPanel.add(a_Check);
  checkboxPanel.add(b_Check);
  checkboxPanel.add(c_Check);
  checkboxPanel.add(d_Check);
}
addCheckboxes();