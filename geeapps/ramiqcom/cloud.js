var s5 = ui.import && ui.import("s5", "imageCollection", {
      "id": "COPERNICUS/S5P/NRTI/L3_CLOUD"
    }) || ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_CLOUD"),
    gaul0 = ui.import && ui.import("gaul0", "table", {
      "id": "FAO/GAUL/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level0"),
    gpm = ui.import && ui.import("gpm", "imageCollection", {
      "id": "NASA/GPM_L3/IMERG_V06"
    }) || ee.ImageCollection("NASA/GPM_L3/IMERG_V06");
// Function to zoom location or Indonesia
function myLocation(){
  // Select Indonesia map for center object
  var indonesia = gaul0.filter(ee.Filter.eq('ADM0_NAME', 'Indonesia'));
  // Function to get user position or center in indonesia
  function current_position(point) {
    Map.centerObject(point, 5);
  }
  function oops(error) {
    Map.centerObject(indonesia, 5);
  }
  ui.util.getCurrentPosition(current_position, oops);
}
myLocation();
// Function to start map
function resetMap(){
  // Clear map
  Map.clear();
  // Change cursor
  Map.style().set({cursor: 'crosshair'});
  // Change map view
  Map.setControlVisibility({
    all: false,
    scaleControl: true,
    fullscreenControl: true,
    layerList: true,
    drawingToolsControl: true
  });
  // Set drawing tools to only be rectangle and not linked to script
  Map.drawingTools().setDrawModes(['rectangle']).setLinked(false);
  // Set geometry to hide after each function
  Map.drawingTools().layers().forEach(function(obj){
    obj.setShown(false);
  });
}
resetMap();
// Panel for option
var mainPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {width: '400px', padding: '15px'}
});
ui.root.add(mainPanel);
// App title
var titleLabel = ui.Label({
  value: 'Cloud Animation Generator',
  style: {fontSize: '25px', fontWeight: 'bold', color: 'dodgerblue', margin: '15px'}
});
mainPanel.add(titleLabel);
// Select for band to show
var bandSelect = ui.Select({
  items: [
    "HQprecipitation",
    "IRprecipitation",
    "precipitationCal",
    "precipitationUncal	",
    "randomError"
  ],
  value: "precipitationCal",
  style: {stretch: 'horizontal'}
});
mainPanel.add(bandSelect);
// Select for period
var periodSelect = ui.Select({
  items: ['1-day', '2-days', '3-days'],
  value: '3-days',
  style: {stretch: 'horizontal'},
  onChange: function(value){
    switch (value) {
      case '1-day':
        dateSlider.setPeriod(1);
        break;
      case '2-days':
        dateSlider.setPeriod(2);
        break;
      case '3-days':
        dateSlider.setPeriod(3);
        break;
    }
  }
});
mainPanel.add(periodSelect);
// Date slider
var dateSlider = ui.DateSlider({
  start: '2000-06-01',
  end: Date.now(),
  value: Date.now()-604800000,
  period: 3,
  style: {stretch: 'horizontal'},
});
mainPanel.add(dateSlider);
// Draw AOI select
var drawAoiSelect = ui.Select({
  placeholder: 'Draw or select an AOI',
  style: {stretch: 'horizontal'},
  onChange: function(value){
    if (value !== null){
      generateButton.setDisabled(false);
    } else {
      generateButton.setDisabled(true);
    }
  }
});
mainPanel.add(drawAoiSelect);
// Drawing tools function
function draw(){
  // Drawing tools
  var drawingTools = Map.drawingTools();
  // Function when drawing tools change
  function change() {
    var layer = drawingTools.layers();
    var name = layer.getJsArray().map(function(obj){
      var objName = obj.getName();
      return objName;
    });
    drawAoiSelect.items().reset(name);
  }
  change();
  // Applying change function to drawing tools
  drawingTools.onLayerAdd(change);
  drawingTools.onLayerRemove(change);
}
draw(drawAoiSelect);
// Function to return draw aoi as geometry
function drawGeometry(){
  var geomName = drawAoiSelect.getValue();
  var layer = ee.FeatureCollection(Map.drawingTools().layers().getJsArray().map(function(obj){
    var name = obj.getName();
    return ee.Feature(obj.getEeObject()).set({'name': name});
  }));
  var geom = layer.filter(ee.Filter.eq('name', geomName)).first().geometry();
  return geom;
}
// Generate GIF button
var generateButton = ui.Button({
  label: 'Generate GIF',
  style: {stretch: 'horizontal'},
  disabled: true,
  onClick: function(){
    panelGIF();
  }
});
mainPanel.add(generateButton);
// Function for final images
function cloud(){
  var images = gpm.select(bandSelect.getValue())
    .filterDate(dateSlider.getValue()[0], dateSlider.getValue()[1])
    .map(function(img){
      return img.clip(drawGeometry());
    });
  return images;
}
// Function for visualization
function vis(){
  var image = cloud().first();
  var reduce = image.reduceRegion({
    reducer: ee.Reducer.percentile([2, 98]),
    geometry: image.geometry(),
    scale: 10000,
    bestEffort: true,
  });
  var keys = reduce.keys();
  var min = reduce.get(keys.get(0)).getInfo();
  var max = reduce.get(keys.get(1)).getInfo();
  var palette = ['purple', 'blue', 'aqua', 'green', 'yellow', 'red'];
  return {palette: palette, min: min, max: max};
}
// Function for administration border
function admin(){
  var feature = gaul0.filterBounds(drawGeometry());
  var image = ee.Image().toByte().paint({
    featureCollection: feature,
    width: 0.1,
    color: 1,
  }).visualize({palette: 'white'});
  return image;
}
// Function for final images
function finalImages(){
  var text = require('users/gena/packages:text');
  var annotations = [
    {position: 'left', offset: '1%', margin: '1%', property: 'label', scale: Map.getScale()}
  ];
  return cloud().map(function(img){
    var image =  img.visualize(vis()).blend(admin()).set('label', ee.Date(img.get('system:time_start')).format('yyyy-MMM-dd HH:mm zzz'));
    return text.annotateImage(image, {}, img.geometry(), annotations);
  });
}
// Function to generate GIF
function gif(){
  // Define animation arguments.
  var videoArgs = {
    dimensions: periodSelect.getValue() == '1-day' ? 720 : periodSelect.getValue() == '2-days' ? 540 : 480,
    region: drawGeometry(),
    framesPerSecond: 5,
  };
  return ui.Thumbnail({
    image: finalImages(), 
    params: videoArgs, 
    style: {stretch: 'horizontal'}
  });
}
// Function to add GIF to panel
function panelGIF(){
  resetMap();
  var minimizeButton = ui.Button({
    label: 'Minimze',
    onClick: function(){
      panel.style().set('shown', false);
      maximizeButton.style().set('shown', true);
    }
  });
  var maximizeButton = ui.Button({
    label: 'Maximize',
    style: {position: 'bottom-left', shown: false},
    onClick: function(){
      panel.style().set('shown', true);
      maximizeButton.style().set('shown', false);
    }
  });
  Map.add(maximizeButton);
  var panel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    widgets: [minimizeButton, gif()],
    style: {position: 'bottom-left'}
  });
  Map.add(panel);
}
var sourceLabel = ui.Label({
  value: 'Source: Global Precipitation Measurement (GPM) v6',
  targetUrl: 'https://doi.org/10.5067/GPM/IMERG/3B-HH/06'
});
mainPanel.add(sourceLabel);