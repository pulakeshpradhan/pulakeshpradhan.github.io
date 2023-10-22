// A UI to interactively flood estimation by waterlevel estimate.
//Lopad NB map
//Map.setCenter(-66.7225845, 46.0275848, 9); // Center on the Grand Canyon.
// The namespace for our application.  
//Define globe variables here
var app = {};
var y=0;
var x1=0;
var x2=0;
var x3=0;
var x4=0;
var levelBox = ui.Textbox({placeholder:'Estimate is here'});
var result;
var pi = ee.Number(3.14159);
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
      ui.Label('This application allows you to visualize and simulate the estimate of water level based on machine learning model:')
    ])
  };
};
 /* The collection interface panel. */
app.interface = {
    //Inputs
    variable1: ui.Textbox({placeholder:'Enter here', onChange: function(value){ x1=value; return(x1);}}),
    variable2: ui.Textbox({placeholder:'Enter here', onChange: function(value){ x2=value; return(x2);}}),
    variable3: ui.Textbox({placeholder:'Enter here', onChange: function(value){ x1=value; return(x3);}}),
    variable4: ui.Textbox({placeholder:'Enter here', onChange: function(value){ x1=value; return(x4);}}),
    //Button:
    applyButton: ui.Button({label:'Apply Button', 
    onClick:function(){
      print(x1); 
      result= 7.012 + 0.0215*parseFloat(x1)+0.0179*parseFloat(x2)+ 0.0104*parseFloat(x3)+ 0.0061*parseFloat(x4); 
      levelBox.setValue(result+' meters'); 
      elevationVis = {
       min: 4.0,
       max: result+1,
        palette: ['0905ff', '0b00db', 'ffffff'],
      //palette: [ '0b00db','00f0d0','ffffff'],
      };
      Map.clear();
      Map.addLayer(elevation, elevationVis, 'Elevation', true, 0.3);
      }
    })
  };
  /* The panel for control widgets. */
  app.interface.panel = ui.Panel({
    widgets: [
      ui.Label('Input Independent Variables', {fontWeight: 'bold'}),
      ui.Label('Today Temperature in Celsius:', app.HELPER_TEXT_STYLE), app.interface.variable1,
      ui.Label('Yesterday Temperature in Celsius:', app.HELPER_TEXT_STYLE), app.interface.variable2,
      ui.Label('Rainfall in Millimeters:', app.HELPER_TEXT_STYLE), app.interface.variable3,
      ui.Label('Snow on Ground in Millimeters:', app.HELPER_TEXT_STYLE), app.interface.variable4,
      ui.Panel([
        app.interface.applyButton
      ], ui.Panel.Layout.flow('horizontal')),
       ui.Label('Water Level Estimate:', app.HELPER_TEXT_STYLE),  levelBox
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
  Map.setCenter(-66.66, 45.98, 13);
  ui.root.insert(0, main);
};
app.boot();