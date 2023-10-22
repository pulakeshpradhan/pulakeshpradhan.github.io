var image = ee.Image("users/fernandotentor/Dem_dron_FRVT"),
    image2 = ee.Image("users/fernandotentor/orthomosaic_dron_FRVT"),
    imageVisParam = {"opacity":1,"bands":["b1"],"min":145.15332884868346,"max":147.05130239110892,"gamma":1};
/*
https://groups.google.com/forum/#!msg/google-earth-engine-developers/9kkY0FdV54k/BWHSyZYoBQAJ
Copyright (c) 2018 Gennadii Donchyts. All rights reserved.
This work is licensed under the terms of the MIT license.  
For a copy, see <https://opensource.org/licenses/MIT>.
*/
Map.centerObject(image,17)
Map.addLayer(image,imageVisParam,'dem dron')
Map.addLayer(image2.mask(image2),{},'othomosaic')
Map.setOptions('SATELLITE')
var srtm = image//ee.Image("USGS/SRTMGL1_003");
var uiTools = require('users/gena/packages:ui')
var utils = require('users/gena/packages:utils')
// transect drawing tool 
var tool = new uiTools.DrawTransectTool(Map)
// remember all drawn transects
var transects = []
var transectsLayer = ui.Map.Layer(ee.FeatureCollection(transects), {}, 'transects')
Map.layers().add(transectsLayer)
// subscribe to finished event
tool.onFinished(function(transect) {
  // print chart then drawing is finished
  var features = utils.reduceImageProfile(srtm, transect, ee.Reducer.median(), Map.getScale())
  //print (features)
  var chart = ui.Chart.feature.byFeature(features, 'distance')
                  .setOptions({
                    title:'Perfil de elevación',
                    hAxis: {title: 'Distancia (m)'},
                    vAxis: {title: 'Elevación (m)'},
                    interpolateNulls : true,
                    legend : {position:'none'}
                  })
  //print(chart)
  panel.add(chart)
  // update all historical transects
  transects.push(transect)
  transectsLayer.setEeObject(ee.FeatureCollection(transects))
})
// ui
var button = ui.Button('Comenzar a dibujar linea')
button.onClick(function() { 
  if(!tool.active) {
    tool.startDrawing() 
    button.setLabel('Finalizar linea')    
  } else {
    tool.stopDrawing()
    button.setLabel('Comenzar a dibujar linea')
  }
})
Map.add(button)
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '600px',
  position: 'bottom-left'
});
Map.add(panel);