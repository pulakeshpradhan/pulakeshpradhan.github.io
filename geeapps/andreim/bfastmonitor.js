var engine = require('users/andreim/geeMonitor:monitor.js');
var view = require('users/andreim/BFASTmonitorGEE:view.js');
var results = {};
function createLegend(layer,which) {
  var viz = layer.getVisParams()
  // Create the color bar for the legend.
  var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(1),
    params: {
      bbox: [0, 0, 10, 100],
      dimensions: '10x200',
      format: 'png',
      min: 0,
      max: 100,
      palette: layer.getVisParams().palette,
    },
    style: {stretch: 'vertical', margin: '8px 16px', maxHeight: '300px'},
  });
  var legend = ui.Panel({
    widgets : [
        ui.Label(viz.max.toFixed(2)),
        colorBar,
        ui.Label(viz.min.toFixed(2))
      ],
    style : {
      position : 'top-'+which,
      padding : '0px 0px',
      shown : false,
    }
  })
  legend.name = layer.getName()
  legend.type = 'legend'
  legend.style().set('shown',layer.getShown())
  return legend
}
function changeLayer(selectedValue, layerSelection){
  // Get which side should this apply to
  var which = layerSelection.style().get('position').split('-')[1];
  var whichNumber = which == 'left' ? 0 : 1;
  view.maps[which].layers().forEach(function(layer,index){
    layer.setShown(layer.getName()==selectedValue)
  })
  //set visibility of the correct legend
  view.layerSelection[which].widgets().forEach(function(widget,index){
    if (widget.type == 'legend' && widget.name == selectedValue){
      widget.style().set('shown',true)
    }
    else{
      if (widget.type == 'legend') {
        widget.style().set('shown',false)
      }
    }
  })
}
view.layerSelection.left.widgets().get(0).onChange(changeLayer)
view.layerSelection.right.widgets().get(0).onChange(changeLayer)
function updateMap(theButton){
  // Get which side should this apply to
  var which = theButton.style().get('position').split('-')[1];
  var whichNumber = which == 'left' ? 0 : 1;
  // Get parameters necessary for bfastmonitor
  var roi = view.maps[which].getCenter();
  var historyStart = view.control.panel.widgets().get(0).widgets().get(1).getValue();
  var monitoringEnd = view.control.panel.widgets().get(3).widgets().get(1).getValue();
  var historyEnd = view.control.panel.widgets().get(1).widgets().get(1).getValue()[0];
  var monitoringStart = view.control.panel.widgets().get(2).widgets().get(1).getValue()[0];
  // Some more parameters
  var h = view.control.panel.widgets().get(4).widgets().get(1).getValue();
  var period = view.control.panel.widgets().get(5).widgets().get(1).getValue();
  var alpha = view.control.panel.widgets().get(6).widgets().get(1).getValue();
  var magnitudeThreshold = view.control.panel.widgets().get(7).widgets().get(1).getValue()
  var harmonics = view.control.panel.widgets().get(8).widgets().get(1).getValue()
  // Calculating the result of bfastmonitor
  var result = engine.bfastMonitor(roi,historyStart,historyEnd,monitoringStart,monitoringEnd,h,period,alpha,magnitudeThreshold,harmonics)
  // Creating the layers
  //var moRes = ui.Map.Layer(result[0],{}, 'Image')
  var timeCnk2 = ee.Image(result.bfastResults.filterMetadata('bfast:result', 'equals', 'breakTime').first().copyProperties(result.bfastResults))
  var monitoringStartDate = ee.Date(monitoringStart)
  var monitoringEndDate = ee.Date(monitoringEnd)
  var min = monitoringStartDate.get('year').getInfo() + monitoringStartDate.getFraction('year').getInfo()
  var max = monitoringEndDate.get('year').getInfo() + monitoringEndDate.getFraction('year').getInfo()
  //timeCnk2 = ui.Map.Layer(timeCnk2,{min: ee.Date(monitoringStart), max: new Date(monitoringEnd).toISOString().split('T')[0],'palette' : '#f7fcfd,#e0ecf4,#bfd3e6,#9ebcda,#8c96c6,#8c6bb1,#88419d,#810f7c,#4d004b'},'Time of change',false)
  timeCnk2 = ui.Map.Layer(timeCnk2,{min: min, max: max,'palette' : '#f7fcfd,#e0ecf4,#bfd3e6,#9ebcda,#8c96c6,#8c6bb1,#88419d,#810f7c,#4d004b'},'Time of change',false)
  var Cnk = ee.Image(result.bfastResults.filterMetadata('bfast:result', 'equals', 'breakMagnitude').first().copyProperties(result.bfastResults))
  Cnk = ui.Map.Layer(Cnk, {min : -0.5, max : 0,'palette' : '#ffffcc,#ffeda0,#fed976,#feb24c,#fd8d3c,#fc4e2a,#e31a1c,#bd0026,#800026'}, 'Magnitude of change',false);
  //var criticalBorder1 = ui.Map.Layer(result[3] , {}, 'Time of change');
  // Adding the layers to the map
  view.layerSelection[which].widgets().get(0).items().reset()
  view.layerSelection[which].widgets().reset([view.layerSelection[which].widgets().get(0)])
  view.maps[which].layers()
    .reset([timeCnk2,Cnk])
    .forEach(function(layer,index){
      view.layerSelection[which].widgets().get(0).items().add(layer.getName())
      view.layerSelection[which].widgets().add(createLegend(layer,which))
  })
  // the trick below is necessary because setting the value to the same previous value doesn't trigger the onChange event
  // TODO: tell google that this must be documented somewhere, cause I spent hours to understand what the heck is going on
  view.layerSelection[which].widgets().get(0).setValue(view.layerSelection[which].widgets().get(0).items().get(+whichNumber),true)
  view.layerSelection[which].widgets().get(0).setValue(view.layerSelection[which].widgets().get(0).items().get(+!whichNumber),true)
  view.layerSelection[which].widgets().get(0).setValue(view.layerSelection[which].widgets().get(0).items().get(+whichNumber),true)
  // Adding the result to the global variable result for charting purposes
  // It's like a return, but not really because I would need to run the function
  // with an extra parameter, or create a wrapper onClick function that calls this function
  // TODO: Get rid of this part
  results[which] = result
}
view.updateButtons.left.onClick(updateMap);
view.updateButtons.right.onClick(updateMap);
function sync(){
  // Update both maps at the same time with the same parameters
  // Useful for comparing Time of change with Magnitude
  updateMap(view.maps.left.widgets().get(0))
  updateMap(view.maps.right.widgets().get(0))
}
view.buttons.widgets().get(0).onClick(sync);
// Run the default view
sync()
function downloadLink(mapCenter, theMap){
  //TODO: to set the scale the image needs to have a nominalScale() and not the default one for 4326 (meters in a degree at origin)
  theMap.widgets().get(0).setValue('Generating download link...');
  theMap.widgets().get(0).setUrl('');
  var imageResult = ee.Image(theMap.layers().getJsArray().map(function(layer){
    return(layer.getEeObject())
  }))
  //print([theMap.layers().get(0)],'projection')
  //print(imageResult.projection().nominalScale())
  var fileName = 'forestWatchdog-'
                  + ee.Date(imageResult.get('bfast:monitoringStart')).format('yMMdd').getInfo() + '-'
                  + ee.Date(imageResult.get('bfast:monitoringEnd')).format('yMMdd').getInfo()
  imageResult.getDownloadURL({name : fileName, crs: ee.Projection('EPSG:3857'), scale: theMap.getScale(), region: theMap.getBounds(true), filePerBand: false},function(url){
    theMap.widgets().get(0).setValue('Download this dataset at ' + theMap.getScale().toFixed(3) * 10 + ' meters/pixel');
    theMap.widgets().get(0).setUrl(url);
  })
}
view.maps.left.onChangeBounds(ui.util.debounce(downloadLink,1000))
view.maps.right.onChangeBounds(ui.util.debounce(downloadLink,1000))
function downloadLink30(mapCenter, theMap){
  //TODO: to set the scale the image needs to have a nominalScale() and not the default one for 4326 (meters in a degree at origin)
  theMap.widgets().get(1).setValue('Generating download link...');
  theMap.widgets().get(1).setUrl('');
  var imageResult = ee.Image(theMap.layers().getJsArray().map(function(layer){
    return(layer.getEeObject())
  }))
  //print([theMap.layers().get(0)],'projection')
  //print(imageResult.projection().nominalScale())
  var fileName = 'forestWatchdog-'
                  + ee.Date(imageResult.get('bfast:monitoringStart')).format('yMMdd').getInfo() + '-'
                  + ee.Date(imageResult.get('bfast:monitoringEnd')).format('yMMdd').getInfo()
  var scale = 30
  //theMap.widgets().get(0).setUrl(imageResult.getDownloadURL({name : fileName, crs: ee.Projection('EPSG:3857'), scale: scale, region: theMap.getBounds(true), filePerBand: false}))
  imageResult.getDownloadURL({name : fileName, crs: ee.Projection('EPSG:3857'), scale: scale, region: theMap.getBounds(true), filePerBand: false},function(url){
    theMap.widgets().get(1).setValue('Download this dataset at ' + scale.toFixed(2) + ' meters/pixel');
    theMap.widgets().get(1).setUrl(url);
  })
}
view.maps.left.onChangeBounds(ui.util.debounce(downloadLink30,1000))
view.maps.right.onChangeBounds(ui.util.debounce(downloadLink30,1000))
function addCharts(roi,residuals,predictedValues,mresiduals,extra){
  var coordinates = 'Longitude : ' + roi.coordinates().getInfo()[0] + '\n'
                  + 'Latitude : ' + roi.coordinates().getInfo()[1]
  extra = extra || ''
  var title = extra + coordinates
  var labels = []
  title.split('\n').forEach(function(element,index){labels.push(ui.Label(element))})
    ///... Plot the fitted model and the original data at the ROI.
  var residualsChart = ui.Chart.image.series(residuals.select(['NDMI', 'fitted']), roi)
      .setOptions({
        title: 'History Period: original and fitted values\n' + extra + coordinates,
        lineWidth: 1,
        pointSize: 3,
});
var predictedValuesChart = ui.Chart.image.series(predictedValues.select(['NDMI', 'predicted']), roi)
    .setOptions({
      title: 'Monitoring Period: original and predicted values\n' + extra + coordinates,
      lineWidth: 1,
      pointSize: 3,
});
var mresidualsChart = ui.Chart.image.series(mresiduals.select(['residual']), roi)
    .setOptions({
      title: 'Monitoring period:Residuals\n' + extra + coordinates,
      lineWidth: 1,
      pointSize: 3,
});
var chartsWidget = ui.Panel(labels.concat([residualsChart,predictedValuesChart,mresidualsChart]));
return(chartsWidget);
}
function clickMap(coords,theMap){
  // Get which side should this apply to
  //var which = theMap.widgets().get(0).style().get('position').split('-')[1];
  var which = theMap.which;
  var result = results[which];
  var roi = ee.Geometry.Point([coords.lon,coords.lat]);
  var scale = 156543.03392 * Math.cos(theMap.getCenter().coordinates().get(1).getInfo() * Math.PI / 180) / Math.pow(2, theMap.getZoom())
  var values = {}
  theMap.layers().forEach(function(layer,index){
    var obj = layer.getEeObject().reduceRegion(ee.Reducer.first(), roi, scale).getInfo()
    values[Object.keys(obj)[0]] = obj[Object.keys(obj)[0]]
  })
  var prettyValues = JSON.stringify(values).replace(/"/g,'').replace(/[{},]/g,'\n').replace(/:/g,' : ')
  //print(values[0][0])
  // Get coordinates, calculate, and add them to the chartPanel
  view.chartPanel.insert(1,addCharts(roi,result.residuals,result.predictedValues,result.mresiduals,'map : ' + which + prettyValues));
}
view.maps.left.onClick(clickMap)
view.maps.right.onClick(clickMap)
view.chartPanel.add(addCharts(view.maps.left.getCenter(),results.left.residuals,results.left.predictedValues,results.left.mresiduals,'left and right maps\n'));
//[moRes,timeCnk2,Cnk,criticalBorder1,residualsChart,predictedValuesChart,mresidualsChart]