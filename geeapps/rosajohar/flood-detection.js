var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                46.3822895161625,
                -15.72578198088258
              ],
              [
                46.3822895161625,
                -15.865193309194256
              ],
              [
                46.519618617725,
                -15.865193309194256
              ],
              [
                46.519618617725,
                -15.72578198088258
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#00cccc",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || 
    /* color: #00cccc */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[46.3822895161625, -15.72578198088258],
          [46.3822895161625, -15.865193309194256],
          [46.519618617725, -15.865193309194256],
          [46.519618617725, -15.72578198088258]]], null, false);
var wrapper = require('users/rosajohar/rnrImpact:floodDetection/wrapper')
var parameter = {};
/** Creates the UI panels for parameters. */
var app = {};
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Flood Detection',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('This app allows you to perform flood detection'+
      ' on a region of interest (ROI) with Normalized Difference'+
      ' Ratio Method and using sentinel 1 images. ROI must be '+
      'smaller than whole scene of an image. Flood detection is '+
      'performed after a ROI drawing and then after every ROI '+
      'or any Parameter modifying.')
    ])
  };
  /* date selection */
  app.event = {
    startDate: ui.Textbox('YYYY-MM-DD', '2021-08-30', refresh),
  };
  /* date selection panel */
  app.event.panel = ui.Panel({
    widgets: [
      ui.Label('1) Set parameters ', {fontWeight: 'bold'}),
      ui.Label('start date of the event', app.HELPER_TEXT_STYLE), app.event.startDate,
    ],
    style: app.SECTION_STYLE
  });
  /* Paramaters setting. */
  var polaList = ['VV', 'VH', 'VVVH'];
  var orbList = ['BOTH', 'ASCENDING', 'DESCENDING'];
  var filterList = ['BOXCAR', 'GAMMA MAP', 'LEE', 'REFINED LEE', 'LEE SIGMA' ];
  var filterFrame = ['NONE', 'MONO', 'MULTI'];
  app.params = {
    orbit: ui.Select(orbList, null, 'BOTH'),
    bands: ui.Select(polaList, null, 'VV'),
    filter: ui.Select(filterList, null, 'LEE'),
    frame: ui.Select(filterFrame, null, 'MONO'),
    filterKsize: ui.Textbox({value: 5, style: {maxWidth: '40px'}, onChange: refresh}),
    majorityKsize: ui.Textbox({value : 2, style: {maxWidth: '40px'}, onChange: refresh}),
  };
  /* The panel for pamaters setting. */
  app.params.panel = ui.Panel({
    widgets: [
      //ui.Label('2) Set parameters', {fontWeight: 'bold'}),
      ui.Label('Orbit pass', app.HELPER_TEXT_STYLE), app.params.orbit,
      ui.Label('Polarisation', app.HELPER_TEXT_STYLE), app.params.bands,
      ui.Label('Speckle filter framework ', app.HELPER_TEXT_STYLE),
      ui.Panel([
        app.params.frame,
        app.params.filter
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([
        ui.Label('Speckle filter kernel size : ', {
            margin: '8px 4px 2px 8px',
             fontSize: '12px',
              color: 'gray'
            }),
        app.params.filterKsize
      ], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([
        ui.Label('Majority filter kernel size : ',  {
            margin: '8px 4px 4px 8px',
             fontSize: '12px',
              color: 'gray'
            }),
        app.params.majorityKsize
      ], ui.Panel.Layout.flow('horizontal')),
    ],
    style: app.SECTION_STYLE
  });
 };
/** Creates the app constants. */
app.createConstants = function() {
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -1px 8px',
      fontSize: '12px',
      color: 'gray'
  };
};
/** Creates the application interface. */
app.boot = function() {
  app.createConstants();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.event.panel,
      app.params.panel,
    ],
    style: {width: '320px', padding: '8px'}
  });
  ui.root.insert(0, main);
};
app.boot();
var setParameters = function(){
  parameter = {
              START_DATE: app.event.startDate.getValue(),
              POLARIZATION: app.params.bands.getValue(),
              ORBIT : app.params.orbit.getValue(),
              SPECKLE_FILTER: app.params.filter.getValue(),
              SPECKLE_FILTER_KERNEL_SIZE: Number(app.params.filterKsize.getValue()),
              MAJORITY_FILTER_KERNEL_SIZE: Number(app.params.majorityKsize.getValue()),
                };
  if(app.params.frame.getValue() !== 'NONE'){
    parameter.SPECKLE_FILTER_FRAMEWORK = app.params.frame.getValue();
    parameter.APPLY_SPECKLE_FILTERING =  true;
  } else {
    parameter.APPLY_SPECKLE_FILTERING =  false;
  }
};
setParameters();
/** Create a new drawing widget */
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '00cccc'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
var showROI = function(value){
    Map.drawingTools().layers().get(0).setShown(value)
} 
function flood_detection(){
  // Get the drawn geometry; it will define the area of interest.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  geoshow.setValue(true)
  //Update parameters
  setParameters();
  parameter.GEOMETRY = aoi;
 var ndrCollection = ee.ImageCollection(wrapper.s1_flood_detect(parameter));
 print (ndrCollection)
  if (ndrCollection.size().getInfo() < 1){
    date.setValue('No image found ');
    Map.layers().reset();
    throw new Error('No image found ');
  } 
  else {
    var dateValue = ee.Date(ee.ImageCollection(ndrCollection).select('flood').sort('system:time_start',false)
                                 .first()
                                 .get('system:time_start'))
                                 .format('yyyy-MM-dd')
                                 .getInfo();
    //change the displayed date
    date.setValue(dateValue); 
  }
 var layer = ui.Map.Layer(ee.ImageCollection(ndrCollection).select('flood').sort('system:time_start',false).first().clip(aoi),
                            {palette: '0033FF'})
  // display flooded area on selected area of interest.
  Map.layers().reset([layer]);
  //get the acquisition date of the image
}
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
};
var geoshow = ui.Checkbox({
      label: 'show ROI',
      value: true
          }) 
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('2) Draw ROI',{fontWeight: 'bold'} ),
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.polygon + ' Polygon' ,
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    geoshow
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
Map.add(controlPanel); 
drawingTools.onDraw(ui.util.debounce(flood_detection, 100));
drawingTools.onEdit(ui.util.debounce(flood_detection, 100));
/** Add widget to show the aquisition date of the image */
var date = ui.Label();
var datePanel = ui.Panel(
  [ui.Label('Date of the image :'), date],
  ui.Panel.Layout.flow('horizontal'),
  {position: 'bottom-right', shown: true}
  )
Map.add(datePanel);
/*perform again flood detection after changing parameters if
ROI is defined */
var refresh = function(){
  setParameters();
  if (drawingTools.layers().get(0).geometries().length() > 0){
    flood_detection();
  }
}
app.params.filter.onChange(refresh);
app.params.frame.onChange(refresh);
app.params.orbit.onChange(refresh);
app.params.bands.onChange(refresh);
app.params.filterKsize.onChange(refresh);
app.params.majorityKsize.onChange(refresh);
var showROI = function(value){
    Map.drawingTools().layers().get(0).setShown(value)
} 
geoshow.onChange(showROI)