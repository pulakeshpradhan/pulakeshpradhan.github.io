var geometry = /* color: #d63000 */ee.Geometry.LineString(
        [[-133.608203125, 44.29609549055348],
         [-120.86406249999999, 44.60978736008787]]),
    imageVisParam = {"opacity":1,"bands":["B11"],"min":3,"max":4,"gamma":1};
var app = {};
var map;
var map2;
/** Creates the UI panels. */
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'SOSINT Toolbox',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
       ui.Label({
        value: 'Info and support : orbtwz@gmail.com',
        style: { fontSize: '10px',}
        }).setUrl('mailto:orbtwz@gmail.com')
    ])
  };
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
  app.mainTools =  {
    goToCoordsButton: ui.Button('Go To Coords',app.ShowGoToCoordsPanel),
    modeChangeButton: ui.Button('Regular',app.IterateMode),
    refreshButton: ui.Button('Refresh', app.GeneralRefresh),
    rulerButton: ui.Button('Ruler', app.Ruler_Show),
    lastClickPosLabel: ui.Label('last click pos'),
  }
  app.mainTools.panel =ui.Panel([
      ui.Panel([
      app.mainTools.modeChangeButton,
     app.mainTools.goToCoordsButton,
     app.mainTools.rulerButton,
      app.mainTools.refreshButton,
       ], ui.Panel.Layout.flow('horizontal'),{padding:'1px',margin: '10px'}),
     ui.Panel([
       ui.Label('Click Pos:'),
       app.mainTools.lastClickPosLabel
      ], ui.Panel.Layout.flow('horizontal'),{padding:'1px',margin: '10px'}),
    ]);
  app.layers_modeRegular = {
    layers:   [],
    mainLabel: ui.Label('Layers'),
    addButton: ui.Button('Add layer',app.NewLayerMode1),
    removeButton: ui.Button('Remove layer',app.RemoveLayerMode1),
    header: null,
  }
  app.layers_modeRegular.panel = ui.Panel(); 
  app.layers_modeRegular.DisableAllLayers = function() {
    for (var i=0;i<app.layers_modeRegular.layers.length;++i){
       app.layers_modeRegular.layers[i].active = false;
    }
  }
  app.layers_modeRegular.DrawPanel = function() {
      if(! app.layers_modeRegular.header) {
         app.layers_modeRegular.header = ui.Panel([
        app.layers_modeRegular.mainLabel,
        app.layers_modeRegular.addButton,
         app.layers_modeRegular.removeButton
       ], ui.Panel.Layout.flow('horizontal'),{padding:'1px',margin: '10px'});
      }
    app.layers_modeRegular.panel.clear();
    app.layers_modeRegular.panel.add( app.layers_modeRegular.header);
    for (var i=0;i<app.layers_modeRegular.layers.length;++i){
      app.layers_modeRegular.layers[i].SetMap(map);
      app.layers_modeRegular.panel.add(app.layers_modeRegular.layers[i].panel);
      app.layers_modeRegular.layers[i].Update();
    }
  }
  app.layers_modeSplit = {
    layers:   [new uiTools.SingleMap('Left','Sentinel 2 - Optical',map,'2019-05-11'),new uiTools.SingleMap('Right','Sentinel 2 - Optical',map2,'2019-05-11')],
  }
  app.layers_modeSplit.panel = ui.Panel();
  app.layers_modeSplit.DrawPanel = function() {
    app.layers_modeSplit.layers[0].SetMap(map);
    app.layers_modeSplit.layers[1].SetMap(map2);
    app.layers_modeSplit.panel.clear();
    app.layers_modeSplit.panel.add(ui.Label('Left Map'));
    app.layers_modeSplit.panel.add(app.layers_modeSplit.layers[0].panel);
    app.layers_modeSplit.layers[0].Update();
    app.layers_modeSplit.panel.add(ui.Label('Right Map'));
    app.layers_modeSplit.panel.add(app.layers_modeSplit.layers[1].panel);
    app.layers_modeSplit.layers[1].Update();
  }
  app.layers_modeSplit.DisableAllLayers = function() {
     app.layers_modeSplit.layers[0].active = false;
    app.layers_modeSplit.layers[1].active = false;
  }
};
/** Creates the app constants. */
app.createConstants = function() {
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
};
/** Creates the app helper functions. */
app.createHelpers = function() {
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
    map.setCenter(lon,lat,14);
    app.goToCoordsInspector.panel.style().set({shown: false});
    app.GeneralRefresh();
 }
 app.NewLayerMode1 = function() {
   var name = 'Layer ' + app.layers_modeRegular.layers.length;
    app.layers_modeRegular.layers.push( new uiTools.SingleMap(name,'Sentinel 2 - Optical',map,'2019-05-11'));
    app.GeneralRefresh();
 }
 app.RemoveLayerMode1 = function() {
  if( app.layers_modeRegular.layers.length === 0) {
    return;
  }
    app.layers_modeRegular.layers.pop();
    app.GeneralRefresh();
 }
  app.CClick = function(coords) {
    var dispTxt = 'Lat:'+coords.lat.toFixed(4)+ ' Lon:'+ coords.lon.toFixed(4);
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
  app.GeneralRefresh = function() {
    app.Ruler_Close();
    map.clear();
    map.add(app.goToCoordsInspector.panel);
    map.add(app.rulerInspector.panel);
    map.unlisten();
    map.onClick(app.CClick);
    switch(currentAppMode) {
      case 0:
        app.layers_modeRegular.DrawPanel();
      break;
      case 1:
        app.layers_modeSplit.DrawPanel();
      break;
    }
  };
  app.IterateMode = function() {
     var center = map.getCenter().getInfo();
     print(center);
     wantedCoords[0] = center.coordinates[0];
      wantedCoords[1] = center.coordinates[1];
       wantedCoords[2] = map.getZoom();
     currentAppMode++;
    if(currentAppMode > appModes.length) {
      currentAppMode = 0;
    }
    print('IterateMode='+currentAppMode);
    app.SetMode(appModes[currentAppMode]);
  }
  app.SetMode = function(wMode) {
    print('SetMode='+wMode);
    app.layers_modeRegular.DisableAllLayers();
    app.layers_modeSplit.DisableAllLayers();
    switch(wMode) {
      case 'Regular':
        currentAppMode = 0;
        app.CreateInterfaceRegular();
        break;
      case 'Split':
        currentAppMode =1;
         app.CreateInterfaceSplit();
        break;
    }
  }
};
var drawTools = require('users/orbtwz/Open:DrawTools');
var uiTools = require('users/orbtwz/Open:UITools');
var rulerActive = false;
var mainToolsPanel;
var splitPanel;
var appModes = ['Regular','Split'];
var currentAppMode = 0;
var wantedCoords = [12.52,41.85,6];
/** Creates the application interface. */
app.boot = function() {
  ui.root.clear();
  map = ui.Map();
  app.createConstants();
  app.createHelpers();
  app.createPanels();
 app.SetMode('Regular');
};
app.CreateInterfaceRegular = function() {
  map.clear();
  if(map2) {
    map2.clear();
  }
  ui.root.clear();
  map = ui.Map();
   if(mainToolsPanel) {
    mainToolsPanel.clear();
  }
  mainToolsPanel = ui.Panel({
    widgets: [
      app.intro.panel,
      app.mainTools.panel,
      app.layers_modeRegular.panel,
    ],
    style: {width: '380px', padding: '8px'}
  });
  app.mainTools.modeChangeButton.setLabel("Regular Mode");
  map.add(app.goToCoordsInspector.panel);
  map.add(app.rulerInspector.panel);
  ui.root.add(mainToolsPanel).add(map);
  map.setCenter(wantedCoords[0],wantedCoords[1],wantedCoords[2]);
  app.GeneralRefresh();
}
app.CreateInterfaceSplit = function() {
   map.clear();
  if(map2) {
    map2.clear();
  }
  ui.root.clear();
  map = ui.Map();
  map2 = ui.Map();
  if(mainToolsPanel) {
    mainToolsPanel.clear();
  }
  mainToolsPanel = ui.Panel({
    widgets: [
      app.intro.panel,
      app.mainTools.panel,
      app.layers_modeSplit.panel,
    ],
    style: {width: '380px', padding: '8px'}
  });
  app.mainTools.modeChangeButton.setLabel("Split Mode");
  splitPanel = ui.SplitPanel({
  firstPanel: map,
  secondPanel: map2,
  wipe: true,
  style: {stretch: 'both'}
  });
 ui.root.add(mainToolsPanel).add(splitPanel);
  map.add(app.goToCoordsInspector.panel);
  map.add(app.rulerInspector.panel);
  var linker = ui.Map.Linker([map, map2]);
  map.setCenter(wantedCoords[0],wantedCoords[1],wantedCoords[2]);
  app.GeneralRefresh();
}
var ruler; 
app.boot();