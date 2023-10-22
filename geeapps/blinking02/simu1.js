// A UI to interactively flood estimation by waterlevel estimate.
//Define globe variables here
var app = {};
var y=0;
var x1=0;
var x2=0;
var x3=0;
var x4=0;
var x5=0;
var levelBox = ui.Textbox({placeholder:'Estimate is here'});
var result;
var pi = ee.Number(3.14159);
var image1 = ee.Image("users/blinking02/HRDEM/dtm_1m_utm19_e_18_109");
//var image1 = ee.Image("users/blinking02/HRDEM/aspect_dtm_1m_utm20_w_28_109");
var elevation1 = image1.select('b1');
///var imagecollection = ee.ImageCollection('users/blinking02/HRDEM');
////var elevation1 = imagecollection.select('b1');
var dataset = ee.ImageCollection('NRCan/CDEM');
var elevation = dataset.select('elevation');
var elevationVis;
/** Creates the UI panels. */
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'NB Flood Estimate',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('This application allows you to visualize and simulate the estimate of water level with High-Resolution Digital Elevation Model (HRDEM) generated from LiDAR:')
    ])
  };
};
 /* The collection interface panel. */
app.interface = {
    //Inputs
   // variable1: ui.Textbox({placeholder:'Enter here', onChange: function(value){ x1=value; return(x1);}}),
    //variable2: ui.Textbox({placeholder:'Enter here', onChange: function(value){ x2=value; return(x2);}}),
   // variable3: ui.Textbox({placeholder:'Enter here', onChange: function(value){ x3=value; return(x3);}}),
  //  variable4: ui.Textbox({placeholder:'Enter here', onChange: function(value){ x4=value; return(x4);}}),
     variable5: ui.Textbox({placeholder:'Enter here', onChange: function(value){ x5=value; return(x5);}}),
    //Button:
    applyButton: ui.Button({label:'Apply', 
    onClick:function(){
      print(x1,x2); 
      print(elevation);
      print(elevation1);
      result= 6.798345 + 0.01953*parseFloat(x1)+0.0189*parseFloat(x2)+ 0.0214*parseFloat(x3)+ 0.0062*parseFloat(x4); 
      //levelBox.setValue(result+' meters'); 
      levelBox.setValue(x5+' meters'); 
      elevationVis = {
       min: 0.0,
       //max: result+1,
      //  palette: ['0905ff', '0b00db', 'ffffff'],
       max: x5,
       palette: ['0905ff', '0b00db', 'ffffff'],
      //palette: [ '0b00db','00f0d0','ffffff'],
      };
      Map.clear();
      Map.addLayer(elevation1, elevationVis, 'Elevation', true, 0.3);
        var zone1 = elevation1.subtract(5.6).zeroCrossing();
      Map.addLayer(zone1, {min: 0, max: 1, opacity: 0.2}, 'Crossing 1000m');
      var exact = elevation1.lt(0);
      Map.addLayer(exact.updateMask(exact), {palette: 'red', opacity: 0.2}, 'Exactly 1000m');
      }
    })
  };
  /* The panel for control widgets. */
  app.interface.panel = ui.Panel({
    widgets: [
     // ui.Label('Input Independent Variables', {fontWeight: 'bold'}),
   //   ui.Label('Min Temperature in Celsius:', app.HELPER_TEXT_STYLE), app.interface.variable1,
   //   ui.Label('Yesterday Average Temperature in Celsius:', app.HELPER_TEXT_STYLE), app.interface.variable2,
    //  ui.Label('Rainfall in Millimeters:', app.HELPER_TEXT_STYLE), app.interface.variable3,
   //   ui.Label('Snow on Ground in Millimeters:', app.HELPER_TEXT_STYLE), app.interface.variable4,
      ui.Label('Simulated Water Level:', app.HELPER_TEXT_STYLE), app.interface.variable5,
      ui.Panel([
        app.interface.applyButton
      ], ui.Panel.Layout.flow('horizontal')),
      // ui.Label('Water Level Estimate:', app.HELPER_TEXT_STYLE),  levelBox
    ],
    style: app.SECTION_STYLE
  });
/** Creates the application interface. */
app.boot = function() {
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.interface.panel
    ],
    style: {width: '314px', padding: '10px'}
  });
  Map.setCenter(-66.63, 45.96, 13);
  ui.root.insert(0, main);
};
app.boot();