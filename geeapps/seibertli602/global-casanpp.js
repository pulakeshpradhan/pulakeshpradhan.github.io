/**
 ************
 *Parameters*
 ************
 */
// Some pre-set locations of interest that will be loaded into a map.
var locationDict = {
  'The default location': {lon: 115.65371234628795, lat: 34.42567414613981, zoom: 6}
};
// From "Show bounds" function
var outline = null
var boundLayer = null
//  From "Calcute NPP" function
var NPPMap = null
// From "Show NPP" function
var minMaxValue = null
var CASANPPVisPar = null
// From "Show NPP thumbnail" function
var NPPVisParam= {
      min: 0, 
      max: 200,
      palette: 'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400,' +
        '3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301'
    }
// From "Creat polygon" function
var polygons=""
//  From "DIY time" function
var date = "";
/**
 *********
 *Service*
 *********
 */
/**
 * Draw
 */
function drawROI() {
  // Add an empty layer to hold the drawn points.
  mapPanel.drawingTools().addLayer([]);
  // Set the geometry type to be polygon.
  mapPanel.drawingTools().setShape('polygon');
  // Enter drawing mode.
  mapPanel.drawingTools().draw();
}
/**
 * Clear
 */
function clearROI() {
  mapPanel.remove(boundLayer);
  polygons = null;
  mapPanel.drawingTools().clear();
}
/**
 * Creat polygon
 * This function gets called when the geometry layer changes.
 * Use debounce to call the function at most every 100 milliseconds.
 */
var getNewROI = ui.util.debounce(function() {
  // Creat polygon
  polygons = mapPanel.drawingTools().layers().get(0).toGeometry();
  mapPanel.drawingTools().layers().get(0).setShown(false);
  showBounds(polygons)
  print("You have identified your research area")
}, 100);
/**
 * Show bounds
 * @param  {ee.Geometry}  [bound as layer]
 */
function showBounds(region) {
  outline = ee.Image()
                  .toByte()
                  .paint({
                    featureCollection:region,
                    color:0,
                    width:1.5
                  });
  // boundLayer can be cleared, if you click "Clear ROI" button 
  boundLayer = mapPanel.addLayer(outline, {palette: "1b3eff"}, "bounds");
}
/**
 * Calcute NPP
 */
function calcuteNPP() {
  var casaNPP = require('users/seibertli602/units:js/casaNPPAPP.js');
  NPPMap = casaNPP.NPP(polygons,date);
  if(NPPMap){
      print("The data has been processed. You can click the 'show' button to display the results")
  }
}
/**
 * Show NPP
 */
function showNPP() {
  // // Set minMaxValue to show NPPMap
  // var casaNPP = require('users/seibertli602/units:js/casaNPPAPP.js');
  // minMaxValue = casaNPP.showNPP(NPPMap,polygons);
  // Add NPP layer
  CASANPPVisPar={min:0,max:200,palette: 'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400,3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301'}
  mapPanel.addLayer(NPPMap.reproject('EPSG:4326', null, 5000),CASANPPVisPar,"CASANpp")
  // Add legend
  var legend  = require('users/seibertli602/units:js/legend.js');
  var legendFVC  = legend.grad_legend(CASANPPVisPar, date+'NPP gc/y', false); 
  legend.add_lgds([legendFVC],mapPanel,'bottom-right');
  // Set ui.Map parameters
  mapPanel.centerObject(polygons, 8);
  mapPanel.style().set('cursor', 'crosshair');
  print("Show layer would be slow")
  print("If the map is loaded successfully,")
  print("you can click on the map to inspect the layers")
}
/**
 * Show NPP thumbnail
 */
function showNPPThumbnail() {
  var VisParam = CASANPPVisPar || NPPVisParam
  var thumbnail = ui.Thumbnail({
    image: NPPMap.visualize(VisParam),
    params: {
      dimensions: "500x500",  //Thumbnail size
      region: polygons.toGeoJSON(), //Geoinfo
      format: "png"  //Format
    },
    style: {height: "300px", width: "300px"},
  });
  print(thumbnail);
}
/**
 * Export NPP image
 */
function exportNPP() {
   Export.image.toDrive({
        image: NPPMap,
        description: date+'NPP',
        folder: "NPP", 
        fileNamePrefix: date+'NPP',
        crs: "EPSG:4326",
        region: polygons,
        scale: 1000,
        maxPixels: 1e13
    });
}
/**
 *********
 ***GUI***
 *********
 */
// Now let's do some overall layout.
// Create a map panel.
var mapPanel = ui.Map();
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true,layerList:true});
// Center the map
var defaultLocation = locationDict['The default location'];
mapPanel.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// Don't make imports that correspond to the drawn points.
mapPanel.drawingTools().setLinked(false);    
// Limit the draw modes to polygons.
mapPanel.drawingTools().setDrawModes(['polygon']);
mapPanel.setOptions("SATELLITE");
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
/*
 * Additional component configuration
 */
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Global NPP', {fontSize: '36px', color: 'Black',stretch: 'horizontal',textAlign:'center',margin:'8px 8px 0px 8px'});
var text = ui.Label(
    'Actual NPP is calculated using CASA model and multi-source remote sensing data.',
    {fontSize: '15px',margin:'0px 8px 8px 8px',textAlign:'left'});
var dataText = ui.Label('Dataset Availability:2000 - true',{fontSize: '15px',margin:'0px 8px 8px 8px',textAlign:'left'})
var toolPanel = ui.Panel([header, text, dataText], 'flow', {width: '400px'});
ui.root.add(toolPanel);
// Create a hyperlink to an external reference.
var link = ui.Label(
    'Seibert website (简研) by Saibo Li', {fontSize: '14px',fontWeight: 'bold',height:'16px'},
    'https://www.seibert.cn/');
var linkPanel = ui.Panel(
    [ui.Label('For more information:', {fontWeight: 'bold',fontSize: '14px',height:'16px'}), link],ui.Panel.Layout.flow('horizontal'),{});
toolPanel.add(linkPanel);
// DIY roi
var roiLabel = ui.Label("(1) Click 'Draw ROI' button, then use the mouse to draw your research area");
var roiBtn = ui.Button({
    label: "Draw ROI",
    onClick: drawROI
  });
var clearROIBtn = ui.Button({
    label: "Clear ROI",
    onClick: clearROI
  });
toolPanel.add(ui.Panel([roiLabel,ui.Panel([roiBtn,clearROIBtn],ui.Panel.Layout.flow('horizontal'),{})],'flow',{border:"1px solid black",margin:"2px",textAlign:'left'}));
// DIY time
var startLabel = ui.Label("(2) Enter the time in the input box below (time: yyyy)");
var startTextbox = ui.Textbox({
  placeholder: "e.g. 2015",
  value: date,
  onChange: function(value) {
    print("Time: " + value);
    date = value;
  }
});
toolPanel.add(ui.Panel([startLabel,startTextbox],'flow',{border:"1px solid black",margin:"2px",textAlign:'left'}));
// Run
var runBtn = ui.Button({
    label: "Run",
    onClick: calcuteNPP
  });
// Show
var showBtn = ui.Button({
    label: "Show layer",
    onClick: showNPP
  });
// Show Thumbnail
var showThumbnailBtn = ui.Button({
    label: "Show thumbnail",
    onClick: showNPPThumbnail
  });
// Export
var exportBtn = ui.Button({
    label: "Export NPP",
    onClick: exportNPP
  });
toolPanel.add(ui.Panel([runBtn,showBtn,showThumbnailBtn,exportBtn],ui.Panel.Layout.flow('horizontal'),{}))
// Set the callback function on changes of the geometry layer.
mapPanel.drawingTools().onEdit(getNewROI);
mapPanel.drawingTools().onDraw(getNewROI);
mapPanel.drawingTools().onErase(getNewROI);