var drawTools = require('users/orbtwz/Open:DrawTools');
// The namespace for our application.  All the state is kept in here.
var app = {};
// Load the Sentinel-1 ImageCollection.
var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD');
// Filter by date.
/*var s1 ;*/ 
var defaultStartDate = "2019-09-01";
var defaultEndDate = "2020-02-01";
/*var default_lat =  25.2;
var default_lon = 52.2 ;
var default_zoom = 7;*/
var wantedCoords = [25.2,52.2,7];
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
  var vhAscending ;
  var vhDescending;
  var composite ; 
  var simpleA; 
  var simpleD; 
  var simpleA_vv; 
  var simpleD_vv; 
  var simpleA_composite; 
  var simpleD_composite; 
  var layer_ascending;
  var layer_descending;
  var layer_ascending_vv;
  var layer_descending_vv;
  var layer_ascending_composite;
  var layer_descending_composite;
  var layer_composite;
  var map;
  var advancedMode;
  this.setAdvancedMode = function(advancedMode){
    this.advancedMode = advancedMode;
  }
  this.setup = function(map) {
    this.map = map;
    if(this.advancedMode) {
      this.layer_ascending_composite = this.map.addLayer(this.simpleA, {min: [-10,-25,-30], max: [2,5,0]}, 'Asc VV VH VH');
      this.layer_descending_composite = this.map.addLayer(this.simpleD, {min: [-10,-25,-30], max: [2,5,0]}, 'Des VV VH VH');
      this.layer_descending_composite.setOpacity(0.5);
      this.layer_ascending_vv = this.map.addLayer(this.simpleA, {min: [-10], max: [0]}, 'Ascending VV');
      this.layer_descending_vv = this.map.addLayer(this.simpleD, {min: [-10], max: [0]}, 'Descending VV');
      this.layer_descending_vv.setOpacity(0.5);
    }
    this.layer_ascending = this.map.addLayer(this.simpleA, {min: [-30], max: [0]}, 'Ascending VH');
    this.layer_descending = this.map.addLayer(this.simpleD, {min: [-30], max: [0]}, 'Descending VH');
    this.layer_composite = this.map.addLayer(this.composite, {min: [-30, -25, -30], max: [0, 10, 0]}, 'Composite');
    this.layer_descending.setOpacity(0.5);
  }
  this.process = function(startDate,endDate,sentinel1,processingStatus) {
    processingStatus(true);
    var start = startDate;
    if (start) start = ee.Date(start);
    var end = endDate;
    if (end) end = ee.Date(end);
    this.s1 = sentinel1.filterDate(start, end);
    var vh = this.s1
    // Filter to get images with VV and VH dual polarization.
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV')) // VV
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH')) // VH
   //  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'HH')) // VH
  //    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'HV')) // VH
    // Filter to get images collected in interferometric wide swath mode.
    .filter(ee.Filter.eq('instrumentMode', 'IW')); 
    this.vhAscending = vh.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
    this.vhDescending = vh.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
    this.composite = ee.Image.cat([
    this.vhAscending.select('VH').max(),
    this.vhDescending.select('VH').max(), 
     ee.ImageCollection(this.vhAscending.select('VV').merge(this.vhDescending.select('VV'))).max(),
    ]).focal_median(); 
    this.composite.evaluate(function(result){processingStatus(false);});
   /* this.simpleA = ee.Image.cat([
    this.vhAscending.select('VH').max(),this.vhAscending.select('VV').max(),this.vhAscending.select('VH').max()]).focal_median(); 
      */
    //this.vhAscending.select('VH').max().merge(this.vhAscending.select('VV')).max()]).focal_median(); 
   /* this.simpleD = ee.Image.cat([ee.ImageCollection(this.vhDescending.select('VV').merge(this.vhDescending.select('VH'))).max(),
    ]).focal_median(); */
    //this.vhDescending.select('VH').max().merge(this.vhDescending.select('VV')).max()]).focal_median(); 
    this.simpleA = ee.Image.cat([
    this.vhAscending.select('VH').max()]).focal_median(); 
    this.simpleD = ee.Image.cat([
    this.vhDescending.select('VH').max()]).focal_median(); 
    /*
    this.simpleA = ee.Image.cat([
    this.vhAscending.select('HH').max()]).focal_median(); 
    this.simpleD = ee.Image.cat([
    this.vhDescending.select('HH').max()]).focal_median(); 
    */
     if(this.advancedMode) {
      this.simpleA_vv = ee.Image.cat([
      this.vhAscending.select('VV').max()]).focal_median(); 
      this.simpleD_vv = ee.Image.cat([
      this.vhDescending.select('VV').max()]).focal_median(); 
      this.simpleA_composite = ee.Image.cat([
      this.vhAscending.select('VV').max(),this.vhAscending.select('VH').max(),this.vhAscending.select('VH').max()]).focal_median(); 
      this.simpleD_composite = ee.Image.cat([
      this.vhDescending.select('VV').max(),this.vhDescending.select('VH').max(),this.vhDescending.select('VH').max()]).focal_median(); 
     }
    /*processingStatus(false);*/
  }
  this.refresh = function() {
     if(this.advancedMode) {
      this.layer_ascending_composite.setEeObject(this.simpleA_composite);
      this.layer_descending_composite.setEeObject(this.simpleD_composite);
      this.layer_ascending_vv.setEeObject(this.simpleA_vv);
      this.layer_descending_vv.setEeObject(this.simpleD_vv);
     }
    this.layer_ascending.setEeObject(this.simpleA);
    this.layer_descending.setEeObject(this.simpleD);
    this.layer_composite.setEeObject(this.composite);
  }
}
print("0 - step 1");
var ruler; 
var rulerActive;
var map;
var mapRight;
var viewMode = 0;
var advancedMode = false;
var splitPanel;
print("0 - step 2");
app.createPanels = function() {
 /* The collection filter controls. */
  app.mainTools = {
    startDate: ui.Textbox('YYYY-MM-DD', defaultStartDate),
    endDate: ui.Textbox('YYYY-MM-DD', defaultEndDate),
    viewModeButton: ui.Button('Split mode',function() {
      app.viewModeClick();
    }),
    advancedModeCheckbox: ui.Checkbox('Advanced Mode',advancedMode,function(val) {app.setAdvancedMode(val)}),
    processButton: ui.Button('UPDATE', function() {
     app.updateDataMapMain(true);
     app.refresh();
    }),
    exportResText:  ui.Textbox('0','0', {width: '40px',maxWidth:'50px'}),
    processingLabel: ui.Label('processing...',{/*fontWeight: 'bold',*/fontSize: '12px',color: 'gray'}),
    rulerButton: ui.Button('Ruler', app.Ruler_Show),
    lastClickPosLabel: ui.Label('LAT:'+wantedCoords[0]+" LON:"+wantedCoords[1]),
  };
   app.mainTools.panel = ui.Panel({
    widgets: [
      ui.Label('5Ghz Interference Locator', {fontWeight: 'bold',fontSize: '24px'}),
      ui.Label('Info hub',{fontWeight: 'bold',fontSize: '12px'},'http://www.osinteditor.com/resources/sentinel-1-c-sar-interference-analysis-intro/'),
      // https://twitter.com/PutinIsAVirus/status/1221672817554526209?s=20
      ui.Label('Tutorials / Guides',{fontWeight: 'bold',fontSize: '12px'},'http://www.osinteditor.com/resources/guides/5ghz-interference-tracker/'),
      // comment following panel for release version
       /*
      ui.Panel([
        ui.Button("Export",function() {app.exportImage();}),
        app.mainTools.exportResText,
      ], ui.Panel.Layout.flow('horizontal'),{width: '200px',maxWidth:'200px'}),
      // end of comment out area
       */
       app.mainTools.advancedModeCheckbox,
      ui.Panel([
        app.mainTools.viewModeButton,
        app.mainTools.rulerButton,
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Label('Last click coordinates:',{fontWeight: 'bold'}),
      app.mainTools.lastClickPosLabel,
      ui.Label('--------------------------------',{fontWeight: 'bold'}), 
      ui.Label('Main Map',{fontWeight: 'bold'}),
      ui.Label('Start date', app.HELPER_TEXT_STYLE), app.mainTools.startDate,
      ui.Label('End date', app.HELPER_TEXT_STYLE), app.mainTools.endDate,
      ui.Panel([
      app.mainTools.processButton,
      app.mainTools.processingLabel,
      ], ui.Panel.Layout.flow('horizontal')),
    ],
  });
  app.mapRightTools = {
    startDate: ui.Textbox('YYYY-MM-DD', defaultStartDate),
    endDate: ui.Textbox('YYYY-MM-DD', defaultEndDate),
    processButton: ui.Button('UPDATE', function() {
      app.updateDataMapRight();
     app.refresh();
    }),
    processingLabel: ui.Label("processing...",{/*fontWeight: 'bold',*/fontSize: '12px',color: 'gray'}),
  }
   app.mapRightTools.panel = ui.Panel({
    widgets: [
      ui.Label('--------------------------------',{fontWeight: 'bold'}),   
      ui.Label('Right Map',{fontWeight: 'bold'}),
      ui.Label('Start date', app.HELPER_TEXT_STYLE), app.mapRightTools.startDate,
      ui.Label('End date', app.HELPER_TEXT_STYLE), app.mapRightTools.endDate,
      ui.Panel([
      app.mapRightTools.processButton,
      app.mapRightTools.processingLabel,
      ], ui.Panel.Layout.flow('horizontal')),
      //app.mapRightTools.processButton
    ],
    //style: app.SECTION_STYLE
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
  app.toggleProcessing_rightMap = function (status) {
    if(status) {
      app.mapRightTools.processingLabel.setValue('gathering data...');
    }
    else {
      app.mapRightTools.processingLabel.setValue('done');
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
    map = ui.Map();
    map.add(app.rulerInspector.panel);
    mapMain_sentinelProcessor.setAdvancedMode(advancedMode);
    mapMain_sentinelProcessor.process(app.mainTools.startDate.getValue(),app.mainTools.endDate.getValue(),sentinel1, app.toggleProcessing_leftMap);
    mapMain_sentinelProcessor.setup(map);
    map.setOptions('satellite', basemapStyle);
    if(viewMode != 1) {
      ui.root.add(map);
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
  app.updateDataMapRight = function(setup) {
     if(map && !setup) {
      var center = map.getCenter().getInfo();
      wantedCoords[1] = center.coordinates[0];
      wantedCoords[0] = center.coordinates[1];
      wantedCoords[2] = map.getZoom();
    }
    if(mapRight) {
      mapRight.clear();
    }
    mapRight = ui.Map();
     if(splitPanel) {
        splitPanel.setSecondPanel(mapRight);
        if(linker) {
          linker.reset();
        }          
        linker = ui.Map.Linker([map, mapRight]);
        mapRight.setCenter(wantedCoords[1],wantedCoords[0], wantedCoords[2]);
     }
      mapRight_sentinelProcessor.setAdvancedMode(advancedMode);
    mapRight_sentinelProcessor.process(app.mapRightTools.startDate.getValue(),app.mapRightTools.endDate.getValue(),sentinel1, app.toggleProcessing_rightMap);
    mapRight_sentinelProcessor.setup(mapRight);
    mapRight.setOptions('satellite', basemapStyle);
    mapRight.unlisten();
    mapRight.onClick(app.CClick);
  }
  app.refresh = function() {
    mapMain_sentinelProcessor.refresh();
    if(viewMode > 0) {
      mapRight_sentinelProcessor.refresh();
    }
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
    var expImage = mapMain_sentinelProcessor.simpleA;
    var expImage2 = mapMain_sentinelProcessor.simpleD;
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
    var wRes =ee.Number.parse(app.mainTools.exportResText.getValue()).toInt().getInfo();
    if(wRes == 0) {
      wRes = 9000; // max pixels for single band image
    }
    print("wRes = "+wRes);
    var wSize = length/wRes;
    if(wSize < 10) {
      wSize = 10;
    }
    print("wSize: "+wSize );
    // Export the image, specifying scale and region.
    Export.image.toDrive({
      image: expImage,
      description: 'Ascending',
      scale: wSize,
      region: geometry2
    });
    Export.image.toDrive({
      image: expImage2,
      description: 'Descending',
      scale: wSize,
      region: geometry2
    });
  }
}
app.setup = function() {
  print("step 0");
  mapMain_sentinelProcessor = new app.sentinel1Processor() ;
  mapRight_sentinelProcessor = new app.sentinel1Processor() ;
  app.createHelpers();
  app.createPanels();
  viewMode = 0;
  app.refreshView();
  print("step 1");
};
var mainPanel;
var linker;
app.refreshView = function() {
  if(viewMode === 0) {
    app.showViewMode0();
  }
  else {
    app.showViewMode1();
  }
}
app.setAdvancedMode = function(val) {
  advancedMode = val;
  app.refreshView();
}
app.showViewMode0 = function() {
  print("showViewMode0  1");
  ui.root.clear();
  splitPanel = null;
  if(mapRight) {
     mapRight.unlisten();
     mapRight.clear();
  }
  ruler = null;
  print("showViewMode0  2");
  if(mainPanel) {
    mainPanel.clear();
  }
  mainPanel = ui.Panel({
    widgets: [
      app.mainTools.panel,
    ],
    style: {width: '230px', padding: '8px'}
  });
  print("showViewMode0  3");
  ui.root.add(mainPanel); //.add(map);
  print("showViewMode0  3.15");
  app.updateDataMapMain(true);
  print("showViewMode0  3.2");
  mapMain_sentinelProcessor.refresh();
  print("showViewMode0  4");
  app.mainTools.viewModeButton.setLabel('SPLIT MODE');
  print("showViewMode0  5");
  app.generalRefresh();
}
app.showViewMode1 = function() {
  print("showViewMode1  1");
  ui.root.clear();
  app.updateDataMapMain(true);
  app.updateDataMapRight(true);
  if(mainPanel) {
    mainPanel.clear();
  }
  ruler = null;
  print("showViewMode1  3.1");
  mainPanel = ui.Panel({
    widgets: [
      app.mainTools.panel,
      app.mapRightTools.panel
    ],
    style: {width: '230px', padding: '8px'}
  });
  print("showViewMode1  3.2");
  ui.root.add(mainPanel);
   print("showViewMode1  3.22");
  splitPanel = ui.SplitPanel({
  firstPanel: map,
  secondPanel: mapRight,
  wipe: true,
  style: {stretch: 'both'}
  });
  ui.root.add(splitPanel);
  print("showViewMode1  3.3");
  mapMain_sentinelProcessor.refresh();
  mapRight_sentinelProcessor.refresh();
  print("showViewMode1  5");
  if(linker) {
    linker.reset();
  }
  linker = ui.Map.Linker([map, mapRight]);
  print("wanted coords = "+wantedCoords);
  map.setCenter(wantedCoords[1],wantedCoords[0], wantedCoords[2]);
  print("showViewMode1  6");
  app.mainTools.viewModeButton.setLabel('SINGLE MODE');
  app.generalRefresh();
}
app.generalRefresh = function() {
    app.Ruler_Close();
}
app.setup();