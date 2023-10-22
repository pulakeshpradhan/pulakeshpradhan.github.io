var srtm = ee.Image("USGS/SRTMGL1_003");
//Contour SRTM
var lines = ee.List.sequence(0, 10000, 2)
var contourlines = lines.map(function(line) {
var mycontour = srtm
.convolve(ee.Kernel.gaussian(5, 3))
.subtract(ee.Image.constant(line)).zeroCrossing()
.multiply(ee.Image.constant(line)).toFloat();
return mycontour.mask(mycontour);
})
contourlines = ee.ImageCollection(contourlines).mosaic();
// Slope & aspect layer
var pal_slope = ['#ffffcc', '#ffeda0', '#fed976','#feb24c','#fd8d3c','#fc4e2a','#e31a1c','#b10026']     
var pal_aspect = ['#1a9850', '#66bd63', '#a6d96a','#d9ef8b','#fee08b','#fdae61','#f46d43','#d73027']  
var slope = ee.Terrain.slope(srtm);
var aspect = ee.Terrain.aspect(srtm)
//Add Map SRTM Visible
Map.addLayer(srtm, {min:0, max: 2000}, 'SRTM',false)
Map.addLayer(slope,{min: 0, max:90, palette:pal_slope}, 'Slope',false);
Map.addLayer(aspect,{min: 0, max:360, palette:pal_aspect}, 'Aspect',false);
Map.addLayer(contourlines, {min: 0, max: 5000, palette:['ff7c50']}, 'Contour')
var uiTools = require('users/gena/packages:ui') //Ui function of Gennadii 
var utils = require('users/gena/packages:utils') //Profile of Gennadii
// transect drawing tool
var tool = new uiTools.DrawTransectTool(Map)
// remember all drawn transects
var transects = []
var transectsLayer = ui.Map.Layer(ee.FeatureCollection(transects), {}, 'transects')
// Map.layers().add(transectsLayer)
// subscribe to finished event
tool.onFinished(function(transect) {
  // print chart then drawing is finished
  var features_srtm = utils.reduceImageProfile(srtm, transect, ee.Reducer.median(), Map.getScale())
  var features_slope = utils.reduceImageProfile(slope, transect, ee.Reducer.median(), Map.getScale())
  var features_aspect = utils.reduceImageProfile(aspect, transect, ee.Reducer.median(), Map.getScale())
//Chart elevation 
  var chart_elevation = ui.Chart.feature.byFeature(features_srtm, 'distance')
                  .setOptions({
                    title:'Elevation profile',
                    hAxis: {title: 'Distance (m)'},
                    vAxis: {title: 'Elevation (m)'}
                  })
//Chart slope
  var chart_slope = ui.Chart.feature.byFeature(features_slope, 'distance')
                  .setOptions({
                    title:'Slope profile',
                    hAxis: {title: 'Distance (m)'},
                    vAxis: {title: 'Slope (degrees)'},
                    colors: ['#ff7c50']
                  })
//Chart aspect
  var chart_aspect = ui.Chart.feature.byFeature(features_aspect, 'distance')
                  .setOptions({
                    title:'Aspect profile',
                    hAxis: {title: 'Distance (m)'},
                    vAxis: {title: 'Aspect (degrees)'},
                    colors: ['#1b7837']
                  })    
  //Reset and add Chart                
  chartPanel.widgets().reset([]) //Reset chart
  chartPanel.widgets().add(chart_elevation) // Add new chart
  chartPanel.widgets().add(chart_slope) // Add new chart
  chartPanel.widgets().add(chart_aspect) // Add new chart
  // Map.add(chart);
  // update all historical transects
  // transects.push(transect) // Ko lưu lịch sử line
  transectsLayer.setEeObject(ee.FeatureCollection(transects))
})
// ui
var button = ui.Button('Start Drawing')
button.onClick(function() { 
  if(!tool.active) {
    tool.startDrawing() 
    button.setLabel('Stop Drawing')    
  } else {
    tool.stopDrawing()
    button.setLabel('Start Drawing')
  }
})
Map.add(button)
Map.setCenter(107.361191,16.351267,6)
//Panel
var panel = ui.Panel();
panel.style().set('width', '400px')
ui.root.insert(0, panel);
var title = ui.Panel([
    ui.Label({
        value: 'PROFILE OF ELEVATION, SLOPE AND ASPECT',
        style: {fontSize: '18px', fontWeight: 'bold',color:'red'}
    })
]);
panel.add(title)
var chartPanel = new ui.Panel()
panel.add(chartPanel)