var app = {};
var drawTools = require('users/orbtwz/Open:DrawTools');
var sentinel2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED');
var sentinel2CData;
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
Map.setCenter(83.277, 17.7009, 12);
//Map.addLayer(dataset.mean(), visualization, 'RGB');
var ruler; 
var rulerActive;
var map;
var defaultLatitude = "0";
var defaultDistance = "0";
var defaultVelocityVector = "0";
var defaultObjectVector = "0";
var defaultStartDate = "2019-09-01";
var defaultEndDate = "2020-02-01";
var wantedCoords = [25.2,52.2,7];
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
app.HELPER_TEXT_STYLE = {fontWeight: 'bold'};
app.HELPER_NUMBER_INPUT_PANEL_STYLE = {maxWidth:'220px',width:'120px'};
app.HELPER_NUMBER_INPUT_STYLE = {width:'50',maxWidth:'60px'};
app.updateDataMapMain = function() {
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
    map.add(app.goToCoordsInspector.panel);
    var start = app.mainTools.startDate.getValue();
    if (start) start = ee.Date(start);
    var end = app.mainTools.endDate.getValue();
    if (end) end = ee.Date(end);
    sentinel2CData = sentinel2.filterDate(start, end); // .reproject('EPSG:3857');
   map.addLayer(sentinel2CData.mean().divide(10000), visualization, 'RGB');
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
    if(ruler) {
      ruler.mapSetup(map);
    }
  }
app.createPanels = function() {
 /* The collection filter controls. */
  app.mainTools = {
    startDate: ui.Textbox('YYYY-MM-DD', defaultStartDate),
    endDate: ui.Textbox('YYYY-MM-DD', defaultEndDate),
    latitude: ui.Textbox({placeholder:"0",value:defaultLatitude,style: app.HELPER_NUMBER_INPUT_STYLE}),
    distance: ui.Textbox({placeholder:"0",value: defaultDistance,style: app.HELPER_NUMBER_INPUT_STYLE}),
    velocityVector: ui.Textbox({placeholder:"0",value:defaultVelocityVector,style: app.HELPER_NUMBER_INPUT_STYLE}),
    objectVector: ui.Textbox({placeholder:"0",value:defaultObjectVector,style:app.HELPER_NUMBER_INPUT_STYLE}),
    computeResultsLabel_v: ui.Label({value:"V:",style:app.HELPER_TEXT_STYLE}),
    computeResultsLabel_v_disp: ui.Label({value:"0",style:app.HELPER_NUMBER_INPUT_STYLE}),
    computeResultsLabel_vObj: ui.Label({value:"Obj Speed (Km/h):",style:app.HELPER_TEXT_STYLE}),
    computeResultsLabel_vObj_disp: ui.Label({value:"0",style:app.HELPER_NUMBER_INPUT_STYLE}),
    computeResultsLabel_hObj: ui.Label({value:"Obj Altitude (m):",style:app.HELPER_TEXT_STYLE}),
    computeResultsLabel_hObj_disp: ui.Label({value:"0",style:app.HELPER_NUMBER_INPUT_STYLE}),   
    //advancedModeCheckbox: ui.Checkbox('Advanced Mode',advancedMode,function(val) {app.setAdvancedMode(val)}),
    updateButton: ui.Button('UPDATE MAP', function() {
     app.updateDataMapMain(true);
     app.refresh();
    }),
    computeButton: ui.Button("COMPUTE", function() {
      app.computeSpeed();
    }),
    rulerButton: ui.Button('Ruler', app.Ruler_Show),
    goToCoordsButton: ui.Button('Go To Coords',app.ShowGoToCoordsPanel),
    lastClickPosLabel: ui.Label('LAT:'+wantedCoords[0]+" LON:"+wantedCoords[1]),
  };
   app.mainTools.panel = ui.Panel({
    widgets: [
      ui.Label('Sentinel-2 Speedometer', {fontWeight: 'bold',fontSize: '24px'}),
      //ui.Label('Info hub',{fontWeight: 'bold',fontSize: '12px'},'http://www.osinteditor.com/resources/sentinel-1-c-sar-interference-analysis-intro/'),
      // https://twitter.com/PutinIsAVirus/status/1221672817554526209?s=20
      //ui.Label('Tutorials / Guides',{fontWeight: 'bold',fontSize: '12px'},'http://www.osinteditor.com/resources/guides/5ghz-interference-tracker/'),
      ui.Panel([
        //app.mainTools.viewModeButton,
        app.mainTools.goToCoordsButton,
        app.mainTools.rulerButton,
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Label('Last click coordinates:',{fontWeight: 'bold'}),
      app.mainTools.lastClickPosLabel,
      ui.Label('--------------------------------',{fontWeight: 'bold'}), 
      ui.Label('Main Map',{fontWeight: 'bold'}),
      ui.Label('Start date', app.HELPER_TEXT_STYLE), app.mainTools.startDate,
      ui.Label('End date', app.HELPER_TEXT_STYLE), app.mainTools.endDate,
      ui.Panel([
      app.mainTools.updateButton,
      //app.mainTools.processingLabel,
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Latitude:', app.HELPER_TEXT_STYLE), app.mainTools.latitude], ui.Panel.Layout.flow('horizontal')),
     ui.Panel([ui.Label('Distance:', app.HELPER_TEXT_STYLE), app.mainTools.distance], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Vel Heading:', app.HELPER_TEXT_STYLE), app.mainTools.velocityVector], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Obj Heading:', app.HELPER_TEXT_STYLE), app.mainTools.objectVector], ui.Panel.Layout.flow('horizontal')),
      app.mainTools.computeButton,
      ui.Label('RESULTS:', app.HELPER_TEXT_STYLE),
      // ui.Panel([app.mainTools.computeResultsLabel_v, app.mainTools.computeResultsLabel_v_disp], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.mainTools.computeResultsLabel_vObj, app.mainTools.computeResultsLabel_vObj_disp], ui.Panel.Layout.flow('horizontal')),
        ui.Panel([app.mainTools.computeResultsLabel_hObj, app.mainTools.computeResultsLabel_hObj_disp], ui.Panel.Layout.flow('horizontal')),
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
    lengthDisplay: ui.Label('Length'),
    angleDisplay: ui.Label('Angle:'),
    avgLatDisplay: ui.Label("Avg Lat:"),
    closeButton : ui.Button('Close', app.Ruler_Close),
    resetButton: ui.Button("Reset",app.Ruler_ResetDraw),
  }
  app.rulerInspector.panel =  ui.Panel({
    widgets: [
      app.rulerInspector.lengthDisplay,
      app.rulerInspector.angleDisplay,
      app.rulerInspector.avgLatDisplay,
       ui.Panel([
        app.rulerInspector.closeButton,
        app.rulerInspector.resetButton,
      ], ui.Panel.Layout.flow('horizontal')),
    ],
     style:{shown: false, position: 'top-center'}
    });
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
app.createHelpers = function() {
 app.refresh = function() {
  //  mapMain_sentinelProcessor.refresh();
    app.updateDataMapMain();
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
      var angle = ruler.GetAngle();
      if(angle < 0) {
        angle = 360-Math.abs(angle);
      }
     var fixedAngle = 360 - angle;
     var avgLat = ruler.GetAvgLat();
      if(l !== null) {
       // var disp = l.getInfo();
        var lfast = ruler.GetLengthFast();
        //var resAngle = angle.getInfo();
        var angleFlat = ruler.GetAngleFlat();
        //print("resAngle: "+fixedAngle + " lfast:"+lfast + " cartAngle:"+angleCartesian);
        app.rulerInspector.lengthDisplay.setValue("Distance: "+lfast.toFixed(1)+' m');
        app.rulerInspector.angleDisplay.setValue("Angle: "+angleFlat+" °");
        app.rulerInspector.avgLatDisplay.setValue("Avg Lat: "+avgLat);
      }
  }
   app.CClick = function(coords) {
    var dispTxt = 'LAT:'+coords.lat.toFixed(4)+ ' LON:'+ coords.lon.toFixed(4);
    app.mainTools.lastClickPosLabel.setValue(dispTxt);
    var layers = map.layers();
   // print(layers);
   // var widgets = map.widgets();
    //print(widgets);
    if(rulerActive) {
      ruler.StopCheck();
      app.Ruler_UpdateGUI();
    }
    //app.chartMaxVV(coords,null);
  }
}
function cDateToString(date) {
  var m = date.getMonth()+1;
  var result = ""+date.getFullYear()+"-"+(m)+"-"+date.getDate();
  return result;
}
app.setup = function() {
  //print("step 0");
 // mapMain_sentinelProcessor = new app.sentinel1Processor() ;
  app.createHelpers();
  app.createPanels();
  //viewMode = 0;
  app.refreshView();
 // print("step 1");
};
var viewMode = 0;
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
 // print("showViewMode0  1");
  ui.root.clear();
  ruler = null;
 // print("showViewMode0  2");
  if(mainPanel) {
    mainPanel.clear();
  }
  mainPanel = ui.Panel({
    widgets: [
      app.mainTools.panel,
    ],
    style: {width: '230px', padding: '4px'}
  });
  //print("showViewMode0  3");
  //var date = Time.LocalDate.now();  
  ui.root.add(mainPanel);
  var eeNow = ee.Date(Date.now()).advance(1,"day");
    eeNow.format('YYYY-MM-dd').evaluate(function(dateStr){
      app.mainTools.endDate.setValue(dateStr);
      var eeStart = ee.Date(Date.now()).advance(-1,"day");
      eeStart.format('YYYY-MM-dd').evaluate(function(dateStr){
        app.mainTools.startDate.setValue(dateStr);
        app.updateDataMapMain(true);
       // mapMain_sentinelProcessor.refresh();
        app.generalRefresh();
      })
  })
}
app.computeSpeed = function() {
  var latitude = parseFloat(app.mainTools.latitude.getValue());
  var aDist =  parseFloat(app.mainTools.distance.getValue());
  var speedHeading = parseFloat(app.mainTools.velocityVector.getValue());
  var objectHeading = parseFloat(app.mainTools.objectVector.getValue());
  var Vs2 = 26784; // km/s
  var Hs2 = 786; // km
  var inclination = -98.62; // °
  var Os2 = (Math.cos(app.toRadians(inclination))/**Math.sign(inclination)*/) / Math.cos(app.toRadians(latitude));
  Os2 = Math.acos(Os2)*-1;
  var aVs2x = Math.cos(Os2)*Vs2;
	var aVs2y = Math.sin(Os2)*Vs2;
	//print("latitude= "+latitude+ "  Os2= "+app.toDegrees(Os2) + " Math.cos(Os2)="+Math.cos(Os2) +" Math.sin(Os2)= "+Math.sin(Os2)+ " aVs2y="+aVs2y +" aVs2x="+aVs2x);
	var mag_aVs2 = app.vectorLength(aVs2x,aVs2y);
	var aVs2 = Vs2*(Math.cos(Os2),Math.sin(Os2));
	//var aVs2 = Vs2*vectorLength(Math.cos(Os2),Math.sin(Os2));
	//console.log("aVs2= "+aVs2);
	var V = (((1/(0.527))*aDist) * 60*60)/1000 ; // apparent velocity in km/h, used delay between blue and green bands (2 and 3)
	var Vac = (Math.sin(app.toRadians(speedHeading)-Os2)/Math.sin(app.toRadians(objectHeading)-Os2))*V; // object speed
	// Vac = velocity aircraft
//	var Hac = (Math.sin(toRadians(speedHeading)-toRadians(objectHeading))/Math.sin(toRadians(objectHeading)-Os2))*(V/Vs2)*Hs2;
	var Hac = Math.sin(app.toRadians(speedHeading)-app.toRadians(objectHeading));
		Hac = (Hac/Math.sin(app.toRadians(objectHeading)-Os2))*(V/mag_aVs2)*Hs2;
	//print("V= "+V + " Vac= "+Vac + " Hac= "+Hac+ "  mag_aVs2: "+mag_aVs2);
		app.mainTools.computeResultsLabel_v_disp.setValue(V);
		app.mainTools.computeResultsLabel_vObj_disp.setValue(Vac);
	app.mainTools.computeResultsLabel_hObj_disp.setValue((Hac*1000));
}
app.generalRefresh = function() {
    app.Ruler_Close();
    app.mainTools.latitude.style(app.HELPER_NUMBER_INPUT_STYLE);
}
app.toRadians = function(angle) {
  return angle * (Math.PI / 180);
}
app.toDegrees = function(angle) {
  return angle * (180 / Math.PI);
}
app.vectorLength = function(x,y) {
	return Math.sqrt((x*x) + (y*y));
}
app.setup();