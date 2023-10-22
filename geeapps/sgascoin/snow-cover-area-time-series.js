// Export snow cover area time series for a user-defined polygon after gapfilling
// simon.gascoin@cesbio.cnes.fr 
// 28/03/2020
var now = ee.Date(Date.now())
var pkg_smooth = require('users/kongdd/public:Math/pkg_smooth.js');
var rawCollection = ee.ImageCollection('MODIS/006/MOD10A1')
  .filterDate(now.advance(-10,'year'),now)
  .select('NDSI_Snow_Cover');
var filledCollection=pkg_smooth.linearInterp(rawCollection, 10, -9999)
  .select('NDSI_Snow_Cover');
// Salomoson & Appel 1.45 NDSI - 0.01, clamped to (0,100)
var filledCollectionSCF=filledCollection
  .select('NDSI_Snow_Cover')
  .map(function(image) {
    return image.divide(100).multiply(1.45).subtract(0.01).multiply(100)
    .clamp(0,100)
    .copyProperties(image, ['system:time_start']);
  });
//ui.root.clear();
//ui.root.add(ui.Map());
//var Map = ui.root.widgets().get(0);
//Map.setCenter(0,43,7)
// Center map at user's location
ui.util.getCurrentPosition(function(p){Map.centerObject(p,8)})
// Create the title label.
var title = ui.Label('5000 Draw a polygon to plot the time series of its snow-covered fraction');
title.style().set('position', 'top-center');
Map.add(title);
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'bottom-right'
});
Map.add(panel);
// Function to draw timeseries plot
var addPlot=function(g,gl) {
  panel.clear();
  var t = //ee.String('Snow cover fraction of ')
  ee.String(gl.getName())
  .cat(' (area: ')
  .cat(g.area().format('%4g'))
  .cat(' m²)');
var chart = ui.Chart.image.series(
  filledCollectionSCF, g, ee.Reducer.mean(),5000)
.setSeriesNames(t,0)
.setOptions({
  title: 'Snow Cover Fraction',
  hAxis: {title: 'time'},
  vAxis: {title: '% area'},
})
  panel.add(chart);
  gl.setLocked('true');
};
var drawingTools = Map.drawingTools();
drawingTools.setDrawModes(['polygon']);
// Draw a chart when a user clicks on the map.
drawingTools.onDraw(addPlot);
/* debug
var testaoi = ee.Geometry.Rectangle(-0.5, 42.7, 0.5, 42.8)
Map.addLayer(testaoi)
addPlot(testaoi,ui.Map.GeometryLayer())
*/