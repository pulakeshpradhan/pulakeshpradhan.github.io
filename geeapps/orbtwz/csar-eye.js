var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
var drawTools = require('users/orbtwz/Open:DrawTools');
var basemapStyle = {
  'Black': [
    {
      featureType: 'all',
      stylers: [
        {  color: "#000000"  }
      ]
    }
  ]
};
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var s2dataset = ee.ImageCollection('COPERNICUS/S2')
                .filterDate('2019-01-01', '2020-11-30')
                // Pre-filter to get less cloudy granules.
                .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                .map(maskS2clouds);
 function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
// Load a raw Landsat 5 ImageCollection for a single year.
var landsatColl = ee.ImageCollection('LANDSAT/LC08/C01/T1')
  .filterDate('2018-01-01', '2021-01-01');
// Create a cloud-free composite with default parameters.
// Create a cloud-free composite with custom parameters for
// cloud score threshold and percentile.
var customCompositeLandast = ee.Algorithms.Landsat.simpleComposite({
  collection: landsatColl,
  percentile: 75,
  cloudScoreRange: 0
});
// comment / uncomment to switch between landsat and sentinel-2 for greyscale background image (landsat has more consistent coverage across the world)
//var selectedBackgroundC = s2dataset.select("B8").median();
var selectedBackgroundC = customCompositeLandast.select("B5").divide(300);
print("0 - step 0");
//Map.setCenter(-9.1695, 38.6917, 12);
//Map.addLayer(dataset.median(), rgbVis, 'RGB');
//Map.addLayer(composite, {min: [0, 0, 0], max: [1, 1, 1]}, 'Composite');
// The namespace for our application.  All the state is kept in here.
var app = {};
// Load the Sentinel-1 ImageCollection.
var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD');
var s1Filtered_a;
var s1Filtered_d;
var s1Filtered_f;
// Filter by date.
/*var s1 ;*/ 
var defaultStartDate = "2019-09-01";
var defaultEndDate = "2020-02-01";
/*var default_lat =  25.2;
var default_lon = 52.2 ;
var default_zoom = 7;*/
var wantedCoords = [25.2,52.2,7];
var multiplierMin = 1;
var multiplierMax = 1;
var vv_maxDiff_range = {x:1,y:40,d:27}
var vv_minDiff_range = {x:1,y:40,d:18}
var vh_maxDiff_range = {x:1,y:60,d:9}
var vh_minDiff_range = {x:1,y:60,d:12} 
/*var vh_range = 20;
var vv_range = 40;*/
var mapMain_sentinelProcessor;
var mapRight_sentinelProcessor;
var solidBlackLayer;
print("0 - step 0");
var basemapStyle = {
  'Black': [
    {
      featureType: 'all',
      stylers: [
        {  color: "#000000"  }
      ]
    }
  ]
};
app.sentinel1Processor = function() {
  var s1 ;
  var ascending_source;
  var desceding_source;
  var composite ;
  var layer_composite;
  var map;
  var advancedMode;
  this.setAdvancedMode = function(advancedMode){
    this.advancedMode = advancedMode;
  }
  this.setup = function(map) {
    this.map = map;
    this.layer_composite = this.map.addLayer(this.composite, {min: [0, 0, 0], max: [1, 1, 1]}, 'Composite');
  }
  this.process = function(startDate,endDate,sentinel1,processingStatus,vhRange, vvRange,vhRangeSlider_max,
    vhRangeSlider_min,
    vvRangeSlider_max,
    vvRangeSlider_min,
    vh_amplifier_max,vh_amplifier_min,
    vv_amplifier_max,vv_amplifier_min,
    vhMaxMode,
    vvMaxMode,
    focalMode,
    focalRadius){
    print("s1 process > vhRange="+vhRange+" vvRange="+vvRange + " vhRangeSlider_min="+vhRangeSlider_min +" vvRangeSlider_min="+vvRangeSlider_min);
    processingStatus(true);
    var start = startDate;
    if (start) start = ee.Date(start);
    var end = endDate;
    if (end) end = ee.Date(end);
    this.s1 = sentinel1.filterDate(start, end);
    var s1Main = this.s1
    // Filter to get images with VV and VH dual polarization.
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV')) // VV
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH')) // VH
   //  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'HH')) // VH
  //    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'HV')) // VH
    // Filter to get images collected in interferometric wide swath mode.
    .filter(ee.Filter.eq('instrumentMode', 'IW')); 
    this.ascending_source = s1Main.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
    this.descending_source = s1Main.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
   s1Filtered_f = s1Main;
   s1Filtered_a = s1Main.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
   s1Filtered_d = s1Main.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
/*    var vv_maxDiff_range = {x:1,y:40,d:27}
var vv_minDiff_range = {x:1,y:40,d:18}
var vh_maxDiff_range = {x:1,y:20,d:9}
var vh_minDiff_range = {x:1,y:20,d:12} */
  print("vhRange:"+vhRange)
  //   this.compose2 = function (asc,desc,threshold1,threshold2,range,amplifier_max,amplifier_min,maxMode,focal,focalRadius) {
    this.composite =  ee.Image.cat([
  this.compose2(this.ascending_source.select('VH'),this.descending_source.select('VH'),vhRangeSlider_max,vhRangeSlider_min,vhRange,vh_amplifier_max,vh_amplifier_min,vhMaxMode,focalMode,focalRadius),
  this.compose2(this.ascending_source.select('VV'),this.descending_source.select('VV'),vvRangeSlider_max,vvRangeSlider_min,vvRange,vv_amplifier_max,vv_amplifier_min,vvMaxMode,focalMode,focalRadius), 
  //s2dataset.select("B8").median().subtract(checkOne(vhAscending.select('VH'))).subtract(checkOne(vhDescending.select('VH'))),
  //s2dataset.select("B8").median(),
  selectedBackgroundC,
  ]); 
    this.composite.evaluate(function(result){processingStatus(false);});
  }
  this.compose1 = function (asc,desc,threshold1,threshold2,range) {
      var tImage = ee.Image.cat([
      desc.max().add(range).add(asc.max().add(range)),
      desc.mean().add(range).add(asc.mean().add(range)), 
      desc.min().add(range).add(asc.min().add(range)),
      ]); 
     return selectedBackgroundC.add(tImage.expression(
       "((b(0)-b(1)) > threshold_1 ? (b(0)) : (b(1)-b(2) < threshold_2 ? b(2) : 0))/range"
       ,
       {
         "threshold_1":threshold1,
         "threshold_2":threshold2,
         "range":range
       }
       ));
  }
   this.compose2 = function (asc,desc,threshold1,threshold2,range,amplifier_max,amplifier_min,maxMode,focal,focalRadius) {
     var tImage = ee.Image.cat([
      asc.max().add(range),
      asc.mean().add(range), 
      asc.min().add(range),
      ]); 
      var tImage2 = ee.Image.cat([
      desc.max().add(range),
      desc.mean().add(range), 
      desc.min().add(range),
      ]); 
      //threshold2 = threshold2*-1;
      var rImage;
      var rImage2 ;
      if(maxMode == 0) {
        rImage = tImage.expression(
         "((b(0)-b(1)) > threshold_1 ? (b(0)*mMax) : (b(1)-b(2) > threshold_2 ? b(2)*mMin : 0))/range"
         ,
         {
           "threshold_1":threshold1,
           "threshold_2":threshold2,
           "range":range,
           "mMin":amplifier_min,
           "mMax":amplifier_max,
         }
         );
        rImage2 = tImage2.expression(
         "((b(0)-b(1)) > threshold_1 ? (b(0)*mMax) : (b(1)-b(2) > threshold_2 ? b(2)*mMin : 0))/range"
         ,
         {
           "threshold_1":threshold1,
           "threshold_2":threshold2,
           "range":range,
            "mMin":amplifier_min,
           "mMax":amplifier_max,
         }
         );
      }
      else {
        rImage = tImage.expression(
         "((b(0)-b(2)) > threshold_1 ? (b(0)*mMax) : (b(1)-b(2) > threshold_2 ? b(2)*mMin : 0))/range"
         ,
         {
           "threshold_1":threshold1,
           "threshold_2":threshold2,
           "range":range,
           "mMin":amplifier_min,
           "mMax":amplifier_max,
         }
         );
        rImage2 = tImage2.expression(
         "((b(0)-b(2)) > threshold_1 ? (b(0)*mMax) : (b(1)-b(2) > threshold_2 ? b(2)*mMin : 0))/range"
         ,
         {
           "threshold_1":threshold1,
           "threshold_2":threshold2,
           "range":range,
            "mMin":amplifier_min,
           "mMax":amplifier_max,
         }
         );
      }
      if(focal) {
        rImage =  rImage.focal_max({radius:focalRadius,units:"meters"});
        rImage2 = rImage2.focal_max({radius:focalRadius,units:"meters"});
      }
      //return tImage;
      //return rImage3;
      return selectedBackgroundC.add(rImage).add(rImage2);
  }
  this.refresh = function() {
    this.layer_composite.setEeObject(this.composite);
  }
}
print("0 - step 1");
var ruler; 
var rulerActive;
var map;
var viewMode = 0;
var advancedMode = false;
print("0 - step 2");
function vhRangeChanged(value) {
  app.mainTools.vhRangeSlider_max.setMax(value);
  app.mainTools.vhRangeSlider_min.setMax(value);
}
function vvRangeChanged(value) {
  app.mainTools.vvRangeSlider_max.setMax(value);
   app.mainTools.vvRangeSlider_min.setMax(value);
}
app.createPanels = function() {
 /* The collection filter controls. */
  app.mainTools = {
    startDate: ui.Textbox('YYYY-MM-DD', defaultStartDate),
    endDate: ui.Textbox('YYYY-MM-DD', defaultEndDate),
    goToCoordsButton: ui.Button('Go To Coords',app.ShowGoToCoordsPanel),
    /*vhRangeSlider_max: ui.Slider(0,20,10,{width: '80px'}),
    vhRangeSlider_min: ui.Slider(0,20,5),
    vvRangeSlider_max: ui.Slider(0,40,27),
    vvRangeSlider_min: ui.Slider(0,40,25),*/
    vhSensibilitySlider_max : ui.Slider({min:0,max:1,value:0.21,style:{width:"195px"}}),
    vhSensibilitySlider_min : ui.Slider({min:0,max:1,value:0.35,style:{width:"195px"}}),
    vvSensibilitySlider_max : ui.Slider({min:0,max:1,value:0.5,style:{width:"195px"}}),
    vvSensibilitySlider_min : ui.Slider({min:0,max:1,value:0.5,style:{width:"195px"}}),
    vhAmplifierSlider_max : ui.Slider({min:0,max:20,value:1,style:{width:"195px"}}),
    vhAmplifierSlider_min : ui.Slider({min:0,max:20,value:1,style:{width:"195px"}}),
    vvAmplifierSlider_max : ui.Slider({min:0,max:20,value:1,style:{width:"195px"}}),
    vvAmplifierSlider_min : ui.Slider({min:0,max:20,value:1,style:{width:"195px"}}),
    vhRangeTextBox: ui.Textbox("20",20),
    vvRangeTextBox: ui.Textbox("20",40),
    vhRangeTextBox_max: ui.Textbox("10",9),
    vhRangeTextBox_min: ui.Textbox("5",12),
    vvRangeTextBox_max: ui.Textbox("27",27),
    vvRangeTextBox_min: ui.Textbox("25",18),
    viewModeButton: ui.Button('Split mode',function() {
      app.viewModeClick();
    }),
    //advancedModeCheckbox: ui.Checkbox('Advanced Mode',advancedMode,function(val) {app.setAdvancedMode(val)}),
    processButton: ui.Button('UPDATE', function() {
     app.updateDataMapMain(true);
     app.refresh();
    }),
    polygonAnalysisButton: ui.Button('Polygon', function() {
     app.drawing_drawPolygon();
     //app.refresh();
    }),
     pointAnalysisButton: ui.Button('Point', function() {
     app.drawing_drawPoint();
     //app.refresh();
    }),
    focalBlur_checkbox: ui.Checkbox("Focal Blur",false),
    focalBlur_slider: ui.Slider({min:10,max:500,value:250,style:{width:"135px"}}),
    vh_maxMode_select: ui.Select(["Max-Mean","Max-Min"],"Max-Mean"),
    vv_maxMode_select: ui.Select(["Max-Mean","Max-Min"],"Max-Mean"),
    exportResText:  ui.Textbox({value:'0', style: {width: '60px',maxWidth:'60px'}}),
    fileNameRoot: ui.Textbox("exp file name"),
    animSteps: ui.Textbox({value:'1', style: {width: '40px',maxWidth:'50px'}}),
    multiplierMinTextBox: ui.Textbox("1",1),
    multiplierMaxTextBox: ui.Textbox("1",1),
    processingLabel: ui.Label('processing...',{/*fontWeight: 'bold',*/fontSize: '12px',color: 'gray'}),
    rulerButton: ui.Button('Ruler', app.Ruler_Show),
    lastClickPosLabel: ui.Label('LAT:'+wantedCoords[0]+" LON:"+wantedCoords[1]),
  };
   app.mainTools.panel = ui.Panel({
    widgets: [
      ui.Label('CSAR Eye', {fontWeight: 'bold',fontSize: '24px'}),
      ui.Label('Info & Help',{fontWeight: 'bold',fontSize: '12px'},'https://www.osinteditor.com/resources/osint-tools/c-sar-eye-sentinel-1-data-analysis-tool/'),
      // https://twitter.com/PutinIsAVirus/status/1221672817554526209?s=20
      //ui.Label('Tutorials / Guides',{fontWeight: 'bold',fontSize: '12px'},'http://www.osinteditor.com/resources/guides/5ghz-interference-tracker/'),
      // comment following panel for release version
      /*
        app.mainTools.fileNameRoot,
      ui.Panel([
        ui.Button("Export",function() {app.exportImage();}),
        ui.Label({value:'Res:'}),app.mainTools.exportResText,
      ], ui.Panel.Layout.flow('horizontal'),{width: '200px',maxWidth:'200px'}),
      ui.Panel([
        ui.Label('Frames'),
        app.mainTools.animSteps,
      ], ui.Panel.Layout.flow('horizontal'),{width: '200px',maxWidth:'200px'}),
      */
      // end of comment out area
      // app.mainTools.advancedModeCheckbox,
      ui.Panel([
        //app.mainTools.viewModeButton,
        app.mainTools.rulerButton,
        app.mainTools.goToCoordsButton,
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Label('Last click coordinates:',{fontWeight: 'bold'}),
      app.mainTools.lastClickPosLabel,
      ui.Label('------ AREA ANALYSIS -------',{fontWeight: 'bold'}),
      ui.Panel([app.mainTools.polygonAnalysisButton, app.mainTools.pointAnalysisButton],ui.Panel.Layout.flow('horizontal')),
      ui.Label('--------------------------------',{fontWeight: 'bold'}), 
      //ui.Label('Main Map',{fontWeight: 'bold'}),
      ui.Label('Start date (YYYY-MM-DD)', app.HELPER_TEXT_STYLE), app.mainTools.startDate,
      ui.Label('End date (YYYY-MM-DD)', app.HELPER_TEXT_STYLE), app.mainTools.endDate,
      ui.Panel([
         ui.Label('-------',{fontWeight: 'bold'}),
      app.mainTools.processButton,
      ui.Label('-------',{fontWeight: 'bold'}),
      //app.mainTools.processingLabel,
      ], ui.Panel.Layout.flow('horizontal')),
      //ui.Label('--------------------------------',{fontWeight: 'bold'}),
      ui.Label("Vertical Horizontal (RED)",{fontWeight: 'bold'}),
       ui.Panel([
         ui.Label('VH Threshold', app.HELPER_TEXT_STYLE), app.mainTools.vh_maxMode_select
         ], ui.Panel.Layout.flow('horizontal')),
         app.mainTools.vhSensibilitySlider_max,
      ui.Label('VH Threshold (Mean-Min)', app.HELPER_TEXT_STYLE), app.mainTools.vhSensibilitySlider_min,
      ui.Label('VH Amplifier (Max-Mean)', app.HELPER_TEXT_STYLE), app.mainTools.vhAmplifierSlider_max,
      ui.Label('VH Amplifier (Mean-Min)', app.HELPER_TEXT_STYLE), app.mainTools.vhAmplifierSlider_min,
      ui.Label('--------------------------------',{fontWeight: 'bold'}),
      ui.Label("Vertical Vertical (GREEN)",{fontWeight: 'bold'}),
      ui.Panel([ 
         ui.Label('VV Threshold', app.HELPER_TEXT_STYLE),
         app.mainTools.vv_maxMode_select
         ], ui.Panel.Layout.flow('horizontal')),
      app.mainTools.vvSensibilitySlider_max,
      ui.Label('VV Threshold (Mean-Min)', app.HELPER_TEXT_STYLE), app.mainTools.vvSensibilitySlider_min,
      ui.Label('VV Amplifier (Max-Mean)', app.HELPER_TEXT_STYLE), app.mainTools.vvAmplifierSlider_max,
      ui.Label('VV Amplifier (Mean-Min)', app.HELPER_TEXT_STYLE), app.mainTools.vvAmplifierSlider_min,
      ui.Label('--------------------------------',{fontWeight: 'bold'}),
      app.mainTools.focalBlur_checkbox,
      ui.Panel([ 
        ui.Label('Radius', app.HELPER_TEXT_STYLE),
        app.mainTools.focalBlur_slider,
       ], ui.Panel.Layout.flow('horizontal')),
      /*
      ui.Label('Max Diff Multiplier', app.HELPER_TEXT_STYLE), app.mainTools.multiplierMaxTextBox,
      ui.Label('Min Diff Multiplier', app.HELPER_TEXT_STYLE), app.mainTools.multiplierMinTextBox,
      ui.Label('VH range', app.HELPER_TEXT_STYLE), app.mainTools.vhRangeTextBox,
      ui.Label('VV range', app.HELPER_TEXT_STYLE), app.mainTools.vvRangeTextBox,
      ui.Label('VH min threshold',app.HELPER_TEXT_STYLE), app.mainTools.vhRangeTextBox_min,
      ui.Label('VH max threshold',app.HELPER_TEXT_STYLE), app.mainTools.vhRangeTextBox_max,
      ui.Label('VV min threshold',app.HELPER_TEXT_STYLE), app.mainTools.vvRangeTextBox_min,
      ui.Label('VV max threshold',app.HELPER_TEXT_STYLE), app.mainTools.vvRangeTextBox_max,
      */
    ],
  });
 app.goToCoordsInspector = {
  coordLat: ui.Textbox('lat'),
  coordLon: ui.Textbox('lon'),
  closeButton : ui.Button('Close', app.GoToCI_Close),
  goToButton : ui.Button('Go!', app.GoToCI_GoTo)
  }
  app.goToCoordsInspector.panel =  ui.Panel({
    widgets: [
         ui.Panel([
       ui.Label('Lat:'),
       app.goToCoordsInspector.coordLat,
       ui.Label('Lon:'),
       app.goToCoordsInspector.coordLon,
      ], ui.Panel.Layout.flow('horizontal'),{padding:'1px',margin: '10px'}),
      ui.Panel([
       app.goToCoordsInspector.closeButton,
       app.goToCoordsInspector.goToButton,
      ], ui.Panel.Layout.flow('horizontal'),{padding:'1px',margin: '10px'}),
    ],
     style:{shown: false, position: 'top-center'}
    });
  app.rulerInspector = {
    lengthDisplay: ui.Label('length'),
    closeButton : ui.Button('Close', app.Ruler_Close),
    resetButton: ui.Button("Reset",app.Ruler_ResetDraw),
  }
  app.rulerInspector.panel =  ui.Panel({
    widgets: [
      app.rulerInspector.lengthDisplay,
       ui.Panel([
       app.rulerInspector.closeButton,
        app.rulerInspector.resetButton,
      ], ui.Panel.Layout.flow('horizontal')),
    ],
     style:{shown: false, position: 'top-center'}
    });
   // app.mainTools.vhRange.onChange(vhRangeChanged);
   // app.mainTools.vvRange.onChange(vvRangeChanged);
}
var chartPanelCloseButton = ui.Button('Close',function() {
      app.closeChartPanel();
    });
var chartPanel2 = ui.Panel({
  style:
      {height:'900px' ,width: '500px', shown: true, padding:'0px',margin:'0px'}
});
var chartPanel_scroller = ui.Panel({
  style:
      {height:'435px' ,width: '520px', shown: true, padding:'0px',margin:'0px'}
});
var chartPanel = ui.Panel({
  style:
      {height:'500px',width: '520px', position: 'bottom-right', shown: false, padding:'0px',margin:'0px'}
}).add(chartPanel_scroller.add(chartPanel2));
app.drawingTools; // = Map.drawingTools();
app.closeChartPanel = function() {
  chartPanel.style().set('shown', false);
  app.drawing_clearGeometry();
}
app.drawing_clearGeometry = function() {
  var layers = app.drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
app.drawing_drawPolygon = function() {
  app.drawing_clearGeometry();
  app.drawingTools.setShape('polygon');
  app.drawingTools.draw();
}
app.drawing_drawPoint = function() {
  app.drawing_clearGeometry();
  app.drawingTools.setShape('point');
  app.drawingTools.draw();
}
/** Creates the app helper functions. */
app.createHelpers = function() {
  /** Applies the selection filters currently selected in the UI. */
  app.toggleProcessing_leftMap = function (status) {
    if(status) {
      app.mainTools.processingLabel.setValue('gathering data...');
    }
    else {
      app.mainTools.processingLabel.setValue('done');
    }
  }
  app.updateDataMapMain = function(setup) {
    if(map) {
      var center = map.getCenter().getInfo();
      wantedCoords[1] = center.coordinates[0];
      wantedCoords[0] = center.coordinates[1];
      wantedCoords[2] = map.getZoom();
      ui.root.remove(map);
      map.clear();
    }
    var amplifierMax_vh = app.mainTools.vhAmplifierSlider_max.getValue();
    var amplifierMin_vh = app.mainTools.vhAmplifierSlider_min.getValue();
    var amplifierMax_vv = app.mainTools.vvAmplifierSlider_max.getValue();
    var amplifierMin_vv = app.mainTools.vvAmplifierSlider_min.getValue();
    map = ui.Map();
    map.add(app.rulerInspector.panel);
    map.add(app.goToCoordsInspector.panel);
    mapMain_sentinelProcessor.setAdvancedMode(advancedMode);
    var vh_thresholdMax = (vh_maxDiff_range.y - vh_maxDiff_range.x) * app.mainTools.vhSensibilitySlider_max.getValue();
    var vh_thresholdMin = (vh_minDiff_range.y - vh_minDiff_range.x) * app.mainTools.vhSensibilitySlider_min.getValue();
    var vv_thresholdMax = (vv_maxDiff_range.y - vv_maxDiff_range.x) * app.mainTools.vvSensibilitySlider_max.getValue();
    var vv_thresholdMin = (vv_minDiff_range.y - vv_minDiff_range.x) * app.mainTools.vvSensibilitySlider_min.getValue();
    var vv_range = vv_maxDiff_range.y;
    var vh_range = vh_maxDiff_range.y;
  /*  this.process = function(startDate,endDate,sentinel1,processingStatus,vhRange, vvRange,vhRangeSlider_max,
    vhRangeSlider_min,
    vvRangeSlider_max,
    vvRangeSlider_min,
    vh_amplifier_max,vh_amplifier_min,
    vv_amplifier_max,vv_amplifier_min,
    vhMaxMode,
    vvMaxMode,
    focalMode,
    focalRadius){*/
    /* focalBlur_checkbox: ui.Checkbox("FocalB",false),
    focalBlur_slider: ui.Slider({min:10,max:500,value:250,style:{width:"195px"}}),
    vh_maxMode_select: ui.Select(["Max-Mean","Max-Min"],"Max-Mean"),
    vv_maxMode_select: ui.Select(["Max-Mean","Max-Min"],"Max-Mean"),
    */
    var vhMaxMode = 0;
    var vhMVal = app.mainTools.vh_maxMode_select.getValue();
    if(vhMVal == "Max-Mean") {
      vhMaxMode =0;
    }
    else if(vhMVal == "Max-Min") {
      vhMaxMode = 1;
    }
    var vvMVal = app.mainTools.vv_maxMode_select.getValue();
    var vvMaxMode = 0;
    if(vvMVal == "Max-Mean") {
      vvMaxMode = 0;
    }
    else if(vvMVal == "Max-Min") {
      vvMaxMode = 1;
    }
    var focalMode = app.mainTools.focalBlur_checkbox.getValue();
    var focalRadius = app.mainTools.focalBlur_slider.getValue();
    mapMain_sentinelProcessor.process(app.mainTools.startDate.getValue(),app.mainTools.endDate.getValue(),sentinel1, app.toggleProcessing_leftMap,
    vh_range, vv_range, vh_thresholdMax,vh_thresholdMin,vv_thresholdMax,vv_thresholdMin,amplifierMax_vh,amplifierMin_vh,amplifierMax_vv,amplifierMin_vv,
    vhMaxMode,vvMaxMode,focalMode,focalRadius);
    /*
     vhRange: ui.Textbox("20"),
    vvRange: ui.Textbox("20"),
    vhRangeSlider_max: ui.Slider(0,20,8),
    vhRangeSlider_min: ui.Slider(0,20,8),
    vvRangeSlider_max: ui.Slider(0,20,8),
    vvRangeSlider_min: ui.Slider(0,20,8),
    */
    mapMain_sentinelProcessor.setup(map);
    map.setOptions('satellite', basemapStyle);
    if(viewMode != 1) {
      ui.root.add(map);
      app.drawingTools = map.drawingTools();
      map.add(chartPanel);
      app.drawingTools.setShown(false);
      while (app.drawingTools.layers().length() > 0) {
        var layer = app.drawingTools.layers().get(0);
       app.drawingTools.layers().remove(layer);
      }
      var dummyGeometry = ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
      app.drawingTools.layers().add(dummyGeometry);
      app.drawingTools.onDraw(ui.util.debounce(app.chartPolygon, 500));
      app.drawingTools.onEdit(ui.util.debounce(app.chartPolygon, 500));
    }
    else {
       if(splitPanel) {
          splitPanel.setFirstPanel(map);
          if(linker) {
            linker.reset();
          }          
          linker = ui.Map.Linker([map, mapRight]);
       }
    }
    map.unlisten();
    map.onClick(app.CClick);
    map.setCenter(wantedCoords[1],wantedCoords[0], wantedCoords[2]);
  }
  app.ShowGoToCoordsPanel = function () {
   app.goToCoordsInspector.panel.style().set({shown: true});
   }
   app.GoToCI_Close = function () {
      app.goToCoordsInspector.panel.style().set({shown: false});
   }
   app.GoToCI_GoTo = function () {
      var inLat = app.goToCoordsInspector.coordLat.getValue();
      var inLon = app.goToCoordsInspector.coordLon.getValue();
       var lat = ee.Number.parse(inLat).getInfo();
       var lon = ee.Number.parse(inLon).getInfo();
      map.setCenter(lon,lat,map.getZoom());
      app.goToCoordsInspector.panel.style().set({shown: false});
      app.refresh();
   }
  app.refresh = function() {
    mapMain_sentinelProcessor.refresh();
  };
   app.Ruler_Close = function() {
    if(!rulerActive) {
      return;
    }
     app.rulerInspector.panel.style().set({shown: false});
    rulerActive = false;
    ruler.stopDrawing();
    ruler.ClearDraw();
  }
  app.Ruler_Show = function() {
      if(rulerActive === true) {
        return;
      }
      app.rulerInspector.panel.style().set({shown: true});
      if(!ruler) {
        ruler = new drawTools.DrawLineTool(map,app.Ruler_EndDrawCBK,'Ruler');
      }
      ruler.startDrawing();
      rulerActive = true;
  }
  app.Ruler_ResetDraw = function() {
      ruler.startDrawing();
  }
  app.Ruler_EndDrawCBK = function() {
      app.Ruler_UpdateGUI();
  }
  app.Ruler_UpdateGUI = function() {
      var l = ruler.GetLength();
      if(l !== null) {
        var disp = l.getInfo();
        app.rulerInspector.lengthDisplay.setValue(disp.toFixed(1)+' Mts');
      }
  }
  app.chartPolygon = function() {
      app.chartMaxVV(null, app.drawingTools.layers().get(0).getEeObject());
  }
  app.chartMaxVV = function(coords,polygon) {
  // Make the chart panel visible the first time a geometry is drawn.
        if (!chartPanel.style().get('shown')) {
          chartPanel.style().set('shown', true);
        }
      // Get the drawn geometry; it will define the reduction region.
      var aoi  = null;
      if(polygon == null) {
        aoi = ee.Geometry.Point([coords.lon, coords.lat]);
      }
      else {
        aoi = polygon;
      }
      var mapScale = Map.getScale();
      var scale = mapScale > 5000 ? mapScale * 2 : 5000;
      // Chart NDVI time series for the selected area of interest.
      var chart_vh_max = ui.Chart.image
                      .seriesByRegion({
                        imageCollection: s1Filtered_f,
                        regions: aoi,
                        reducer: ee.Reducer.max(),
                        band: 'VH',
                        scale: scale,
                        xProperty: 'system:time_start'
                      })
                      .setOptions({
                        titlePostion: 'none',
                        legend: {position: 'none'},
                        hAxis: {title: 'Date'},
                        vAxis: {title: 'VH Max db'},
                        series: {0: {color: 'red'}},
                        interpolateNulls: true,
                      });
      var chart_vh_min = ui.Chart.image
                      .seriesByRegion({
                        imageCollection: s1Filtered_f,
                        regions: aoi,
                        reducer: ee.Reducer.min(),
                        band: 'VH',
                        scale: scale,
                        xProperty: 'system:time_start'
                      })
                      .setOptions({
                        titlePostion: 'none',
                        legend: {position: 'none'},
                        hAxis: {title: 'Date'},
                        vAxis: {title: 'VH Min db'},
                        series: {0: {color: 'red'}},
                        interpolateNulls: true,
                      });
      var chart_vv_max = ui.Chart.image
                      .seriesByRegion({
                        imageCollection: s1Filtered_f,
                        regions: aoi,
                        reducer: ee.Reducer.max(),
                        band: 'VV',
                        scale: scale,
                        xProperty: 'system:time_start'
                      })
                      .setOptions({
                        titlePostion: 'none',
                        legend: {position: 'none'},
                        hAxis: {title: 'Date'},
                        vAxis: {title: 'VV Max db'},
                        series: {0: {color: 'green'}},
                        interpolateNulls: true,
                      });
      var chart_vv_min = ui.Chart.image
                      .seriesByRegion({
                        imageCollection: s1Filtered_f,
                        regions: aoi,
                        reducer: ee.Reducer.min(),
                        band: 'VV',
                        scale: scale,
                        xProperty: 'system:time_start'
                      })
                      .setOptions({
                        titlePostion: 'none',
                        legend: {position: 'none'},
                        hAxis: {title: 'Date'},
                        vAxis: {title: 'VV Min db'},
                        series: {0: {color: 'green'}},
                        interpolateNulls: true,
                      });
      // Replace the existing chart in the chart panel with the new chart.
      //chartPanel.widgets().reset([chart_vh_max,chart_vh_min,chart_vv_max,chart_vv_min]);
      app.drawChartPanel(chart_vh_max,chart_vh_min,chart_vv_max,chart_vv_min);
      app.drawingTools.stop();
      //app.drawing_clearGeometry();
}
app.drawChartPanel = function(c1,c2,c3,c4) {
  chartPanel.widgets().reset();
  chartPanel2.widgets().reset();
  chartPanel_scroller.widgets().reset();
  chartPanel2.add(c1).add(c2).add(c3).add(c4);
  chartPanel.add(chartPanelCloseButton);
  chartPanel_scroller.add(chartPanel2);
  chartPanel.add(chartPanel_scroller);
}
   app.CClick = function(coords) {
    var dispTxt = 'LAT:'+coords.lat.toFixed(4)+ ' LON:'+ coords.lon.toFixed(4);
    app.mainTools.lastClickPosLabel.setValue(dispTxt);
    var layers = map.layers();
    print(layers);
    var widgets = map.widgets();
    print(widgets);
    if(rulerActive) {
      ruler.StopCheck();
      app.Ruler_UpdateGUI();
    }
    //app.chartMaxVV(coords,null);
  }
  app.viewModeClick = function() {
    var center = map.getCenter().getInfo();
    print(center.coordinates);
    wantedCoords[1] = center.coordinates[0];
    wantedCoords[0] = center.coordinates[1];
    wantedCoords[2] = map.getZoom();
    viewMode += 1;
    if(viewMode > 1) {viewMode = 0;}
    app.refreshView();
  }
  app.exportImage = function(type) {
   /* var landsat = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_123032_20140515')
  .select(['B4', 'B3', 'B2']);*/
   // var expImage2 = mapMain_sentinelProcessor.simpleD;
  // Create a geometry representing an export region.
   // var geometry = ee.Geometry.Rectangle([116.2621, 39.8412, 116.4849, 40.01236]);
    var geometry = map.getBounds(false);
    var geometry2 = map.getBounds(true);
    // need to calculate a usable resolution: 
    print(geometry);
     var points = [];
     points.push([geometry[0],geometry[3]]);
     points.push([geometry[2],geometry[3]]);
     print(points);
    var line = ee.Geometry.LineString(points);
    var length = line.length().getInfo();
    print("Area width = "+length);
    var wRes = parseInt(app.mainTools.exportResText.getValue());
    var wFrames = parseInt(app.mainTools.animSteps.getValue());
    var startDate = Date.parse(app.mainTools.startDate.getValue());
    var endDate =  Date.parse(app.mainTools.endDate.getValue());
    var numberOfDays = Math.round((endDate-startDate)/(1000*60*60*24))
    var daysStep = Math.round(numberOfDays / wFrames);
    if(wRes == 0) {
      wRes = 9000; // max pixels for single band image
    }
    print("wRes = "+wRes);
    var wSize = length/wRes;
    if(wSize < 10) {
      wSize = 10;
    }
    for(var i = 0; i< wFrames; i++) {
      print(" export for step: "+i);
      var tmpStartDate = addDays(startDate,daysStep*i);
      var tmpEndDate = addDays(tmpStartDate,daysStep);
      var dString = cDateToString(tmpStartDate);
      app.mainTools.startDate.setValue(dString);
      dString = cDateToString(tmpEndDate);
      app.mainTools.endDate.setValue(dString);
      app.updateDataMapMain(false);
       var expImage = mapMain_sentinelProcessor.composite.toFloat();
        Export.image.toDrive({
          image: expImage,
          description: app.mainTools.fileNameRoot.getValue()+'_Comp'+"_"+app.mainTools.startDate.getValue()+"_"+app.mainTools.endDate.getValue()+"_F"+i,
          scale: wSize,
          region: geometry2
        });
    }
    print("wSize: "+wSize );
  }
}
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
function cDateToString(date) {
  var m = date.getMonth()+1;
  var result = ""+date.getFullYear()+"-"+(m)+"-"+date.getDate();
  return result;
}
app.setup = function() {
  print("step 0");
  mapMain_sentinelProcessor = new app.sentinel1Processor() ;
  app.createHelpers();
  app.createPanels();
  viewMode = 0;
  app.refreshView();
  print("step 1");
};
var mainPanel;
app.refreshView = function() {
  if(viewMode === 0) {
    app.showViewMode0();
  }
}
app.setAdvancedMode = function(val) {
  advancedMode = val;
  app.refreshView();
}
app.showViewMode0 = function() {
  print("showViewMode0  1");
  ui.root.clear();
  ruler = null;
  print("showViewMode0  2");
  if(mainPanel) {
    mainPanel.clear();
  }
  mainPanel = ui.Panel({
    widgets: [
      app.mainTools.panel,
    ],
    style: {width: '230px', padding: '4px'}
  });
  print("showViewMode0  3");
  //var date = Time.LocalDate.now();  
  ui.root.add(mainPanel);
  var eeNow = ee.Date(Date.now());
    eeNow.format('YYYY-MM-dd').evaluate(function(dateStr){
      app.mainTools.endDate.setValue(dateStr);
      var eeStart = ee.Date(Date.now()).advance(-6,"month");
      eeStart.format('YYYY-MM-dd').evaluate(function(dateStr){
        app.mainTools.startDate.setValue(dateStr);
        app.updateDataMapMain(true);
        mapMain_sentinelProcessor.refresh();
        app.generalRefresh();
      })
  })
}
app.generalRefresh = function() {
    app.Ruler_Close();
}
app.setup();