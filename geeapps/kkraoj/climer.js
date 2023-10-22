var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
var palettes = require('users/gena/packages:palettes');
////PM2.5
var hansenImage = ee.Image('UMD/hansen/global_forest_change_2015');
function waterMask(image){
    // Select the land/water mask.
    var datamask = hansenImage.select('datamask');
    // Create a binary mask.
    var mask = datamask.eq(1);
    // Update the composite mask with the water mask.
    var image = image.updateMask(mask);
    return image
}
var pm25Col = ee.ImageCollection('ECMWF/CAMS/NRT').map(waterMask)
var pm25visParams = {
  min: 0,
  max: 100,
  // palette : palettes.matplotlib.inferno[7]
  palette: [
    "5E4FA2",
    "3288BD",
    "66C2A5",
    "ABE0A4",
    "E6F598",
    "FFFFBF",
    "FEE08B",
    "FDAE61",
    "F46D43",
    "D53E4F",
    "9E0142"
  ]
};
/////// vulnerability axis 
var nl_ = ee.ImageCollection('NOAA/DMSP-OLS/CALIBRATED_LIGHTS_V4')
                  .filterDate('2010-01-01', '2010-01-15').mean();
var nl_ = waterMask(nl_)                  
var nl_= nl_.select('avg_vis');
var nlvisParams = {
   "palette": [
    "ffffe7",
    "86a192",
    "509791",
    "307296",
    "2c4484",
    "000066"
  ],
  min: 3.0,
  max: 60.0,
};
var nlLayer = ui.Map.Layer(nl_, nlvisParams, 'Income');
/////// population
var pop_ = ee.ImageCollection("WorldPop/GP/100m/pop").mean();
var popvisParams = {
  bands: ['population'],
  min: 0.0,
  max: 50.0,
  // palette : palettes.matplotlib.magma[7]
   "palette": [
    "ffffe7",
    "86a192",
    "509791",
    "307296",
    "2c4484",
    "000066"
  ],
};
var popLayer = ui.Map.Layer(pop_, popvisParams, 'Population density');
/////analysis
var pmThresh = 55;
function nFormatter(num) {
     if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1)+ 'B';
     }
     if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + 'M';
     }
     if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
     }
     return '0K';
}
//// ui for App
var showLayers = function(range) {
  // var aoi = defaultAoi
  // var aoi = drawingTools.layers().get(0).getEeObject();
  var pm25 = ee.Image(pm25Col.filterDate(range.start(), range.end()).select('particulate_matter_d_less_than_25_um_surface').first()).multiply(1e9);
  // var pm25 = pm25Col.filterDate("2020-01-01","2020-01-02").mean().select('particulate_matter_d_less_than_25_um_surface');
  // var pm25 = pm25.clip(aoi)
  var pmLayer = ui.Map.Layer(pm25, pm25visParams, 'Air quality');
      // pmLayer.setOpacity(opacitySlider.getValue());
  mapPanel.layers().set(0, pmLayer);
  mapPanel.layers().get(0).setShown(layerSelect.getValue() === "Air quality")
  };
var chartPanel = ui.Panel();
// Generates a new time series chart of SST for the given coordinates.
function generateChart(aoi) {
  chartPanel.clear();
  drawingTools.setShape(null);
  var pop = pop_.clip(aoi);
  var nl = nl_.clip(aoi);
  var pm25 = mapPanel.layers().get(0).getEeObject()
  var pm25 = pm25.clip(aoi);
  var nlThresh = nl.reduceRegion({reducer : ee.Reducer.median(),scale : 6000, maxPixels:1e11}).get("avg_vis").getInfo();
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = mapPanel.getScale();
  var scale = mapScale > 6000 ? mapScale * 2 : 6000;
  // print(mapScale)
  var multiply = scale*scale/85/85
  var richSafe = ee.Number(pop.multiply(nl.gt(nlThresh).and(pm25.lt(pmThresh))).reduceRegion({reducer : ee.Reducer.sum(),scale : scale, maxPixels:1e11}).get("population")).multiply(multiply).max(0.1).getInfo();
  var richDanger = ee.Number(pop.multiply(nl.gt(nlThresh).and(pm25.gt(pmThresh))).reduceRegion({reducer : ee.Reducer.sum(),scale : scale, maxPixels:1e11}).get("population")).multiply(multiply).max(0.1).getInfo();
  var poorSafe = ee.Number(pop.multiply(nl.lt(nlThresh).and(pm25.lt(pmThresh))).reduceRegion({reducer : ee.Reducer.sum(),scale : scale, maxPixels:1e11}).get("population")).multiply(multiply).max(0.1).getInfo();
  var poorDanger = ee.Number(pop.multiply(nl.lt(nlThresh).and(pm25.gt(pmThresh))).reduceRegion({reducer : ee.Reducer.sum(),scale : scale, maxPixels:1e11}).get("population")).multiply(multiply).max(0.1).getInfo();
  var data = [
      ['ID',                   'Income', 'Risk',  'Region', 'Population'],
      [nFormatter(poorSafe),    -1,        -1,      "none",   poorSafe],
      [nFormatter(poorDanger),  -1,        1,       "none",   poorDanger],
      [nFormatter(richSafe),    1,        -1,       "none",   richSafe],
      [nFormatter(richDanger),  1,        1,        "none",   richDanger]
      ];
  var options = {
        // title: 'Risk + Vulnerability',
        legend:null,
        hAxis: {title: 'Income',
                minValue:-2,
                maxValue:1.5,
                ticks: [{v:-1, f:'Lower Income'}, {v:1, f:'Higher Income'}],
                gridlines:{count:0,color:"white"},
                baselineColor:'white'
                },
        vAxis: {title: 'Air Quality',
                minValue:-2,
                maxValue:1.5,
                ticks: [{v:-1, f:'Safe'}, {v:1, f:'Unhealthy'}],
                gridlines:{count:0,color:"white"},
                baselineColor:'white'
                },
        bubble: {textStyle: {fontSize: 11}},
        series: {'none': {color: '#158bc2',visibleInLegend:false}},
      };
      var chart = new ui.Chart(data, 'BubbleChart', options);
  chartPanel.add(chart)
};
var layerProperties = {
  'Air quality': {
    name: 0,
    visParams: pm25visParams,
    legend:  true,
    palette: [
    "5E4FA2",
    "3288BD",
    "66C2A5",
    "ABE0A4",
    "E6F598",
    "FFFFBF",
    "FEE08B",
    "FDAE61",
    "F46D43",
    "D53E4F",
    "9E0142"
  ],
    legendLabels : ["Safe","Unhealthy"],
    defaultVisibility: false
    },
  'Income': {
    name: 0,
    visParams: nlvisParams,
    legend: true,
    palette:['#d7dfc0', '#9bc799', '#65a88e', '#477d89', '#3b4a71', '#2c1e3e'],
    legendLabels : ["Low Income","High Income"],
    defaultVisibility: false  
  },
};
var mapPanel = ui.Map();
// mapPanel.layers().set(2, popLayer);
/////legend
var legendPanel = ui.Panel({
  style:
      {position: 'bottom-left',fontWeight: 'bold', fontSize: '16px', margin: '0 0 0 8px', padding: '10'}
});
mapPanel.add(legendPanel);
var legendTitle = ui.Label(
    'Legend',
    {fontWeight: 'bold', fontSize: '16px', margin: '0 0 4px 0', padding: '10'});
legendPanel.add(legendTitle);
var keyPanel = ui.Panel();
legendPanel.add(keyPanel);
var colorbar_thumbnail = require('users/kkraoj/ee:make_colorbar_generic');
function setLegend(legend, palette, legendLabels) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
  keyPanel.clear();
  if (Array.isArray(legend)) {
      for (var i = 0; i < legend.length; i++) {
        var item = legend[i];
        var name = Object.keys(item)[0];
        var color = item[name];
        var colorBox = ui.Label('', {
          backgroundColor: color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0'
        });
        // Create the label with the description text.
        var description = ui.Label(name, {margin: '0 0 4px 6px'});
        keyPanel.add(
            ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
        }
    } else {
      var colorbar = colorbar_thumbnail.make_colorbar(palette, legendLabels)
      keyPanel.add(colorbar, ui.Panel.Layout.Flow('horizontal'));
        // print(colorbar_thumbnail)
    }
}
//// layer select
var selectItems = Object.keys(layerProperties);
var layerSelect = ui.Select({
  items: selectItems,
  value: selectItems[0],
  onChange: function(selected) {
    // Loop through the map layers and compare the selected element to the name
    // of the layer. If they're the same, show the layer and set the
    // corresponding legend.  Hide the others.
    var i;
    for (i = 0; i < selectItems.length; i++) {
      if (selectItems[i]===selected) {
          mapPanel.layers().get(i).setShown(true);
        //  block of code to be executed if the condition is true
      } else {
          mapPanel.layers().get(i).setShown(false);
        //  block of code to be executed if the condition is false
      }
      var legend = layerProperties[layerSelect.getValue()].legend;
      var palette = layerProperties[layerSelect.getValue()].palette;
      var legendLabels = layerProperties[layerSelect.getValue()].legendLabels;
      setLegend(legend, palette,legendLabels);
    }
  }
});
// Set the initial legend.
var legend = layerProperties[layerSelect.getValue()].legend;
var palette = layerProperties[layerSelect.getValue()].palette;
var legendLabels = layerProperties[layerSelect.getValue()].legendLabels;
setLegend(legend, palette,legendLabels);
///set the initial layer 
showLayers(ee.DateRange('2020-09-01', '2020-09-15'));
mapPanel.layers().set(1, nlLayer);
mapPanel.layers().get(1).setShown(layerSelect.getValue() === "Income")
var styleDict = require('users/kkraoj/ee:fmc_from_sar/style_map');
styleDict.stylemap(mapPanel);
mapPanel.setControlVisibility(
    {all: true, zoomControl: true, mapTypeControl: false});
// Center the map
var defaultAoi = ee.Geometry.Rectangle([-123.588671875, 38.086752154007726, -119.4578125, 41.33120222486773]);
mapPanel.centerObject(defaultAoi, 4)
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
// Add a title and some explanatory text to a side panel.
var bear = ee.Image('users/kkraoj/lfm-mapper/lfm-logo').visualize({
  bands:  ['b1', 'b2', 'b3'],
  min: 0,
  max: 255
});
var thumb = ui.Thumbnail({
  image: bear,
  params: {
    dimensions: '938x100',
    format: 'png'
  },
  style: {height: '50px', width: '484px',padding :'0'}
});
// var header = ui.Label('FireNet: Wildfire Risk Forecaster', {fontSize: '36px', color: '#945629'});
var toolPanel = ui.Panel(thumb, 'flow', {width: '350px'});
ui.root.widgets().add(toolPanel);
toolPanel.add(ui.Label(
    'Lorem Ipsum.',
    {fontSize: '13px'}))
toolPanel.add(ui.Label(
    '1. Use slider on the map to scroll through time.\n2. Click on button below to draw area of interest.\n3.Wait for chart of climate risk vs. vulnerability to appear\n4.Repeat 1-3 to recompute statistics for different area/time',
    {fontSize: '13px', fontWeight:'bold'}))  
// var link = ui.Label(
//     'Github Repository', {},
//     'https://github.com/kkraoj/vwc_from_radar');
// var linkPanel = ui.Panel(
//     [ui.Label('To download maps visit:'), link], ui.Panel.Layout.flow('horizontal'));
// toolPanel.add(linkPanel);
toolPanel.add(ui.Label('___________________________________________________________________________'));
// Add the select to the toolPanel with some explanatory text.
toolPanel.add(ui.Label('Select Layer', {'font-size': '24px'}));
// toolPanel.add ui.Panel([header, text], 'flow', {width: '300px'});
// toolPanel.add(layerSelect);
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 0.9,
  step: 0.01,
});
opacitySlider.onSlide(function(value) {
  mapPanel.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
var text = ui.Label(
    'Opacity',  
    {fontSize: '14px'});
var viewPanel =
    ui.Panel([layerSelect, text, opacitySlider], ui.Panel.Layout.Flow('horizontal'));
// toolPanel.add(ui.Label('__________________________________________'));
toolPanel.add(viewPanel);
var symbol = {
  rectangle: '⬛',
};
var controlPanel = ui.Panel({
  widgets: [
    // ui.Label('Click to select area of interest'),
    ui.Button({
      label: symbol.rectangle + ' Draw area of interest',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
toolPanel.add(controlPanel);
var start = ee.Date('2019-01-01');
var end = ee.Date('2020-10-01').format();
// Asynchronously compute the date ange and show the slider.
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 30,
    onChange: showLayers,
    style: {position:'bottom-center',width:'800px'}
  });
  mapPanel.add(dateSlider.setValue(ee.Date('2020-09-01').millis().getInfo()));
});
toolPanel.add(chartPanel);
////////drawing
var drawingTools = mapPanel.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: 'FF33D6'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  // var numRects = layers.get(0).geometries.getInfo()
  // print(numRects)
  // var i;
  //   for (i = 0; i < numRects; i++) {
  //     layers.get(0).geometries().remove(layers.get(0).geometries().get(i));
  //   }
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
drawingTools.onDraw(ui.util.debounce(generateChart, 500));
drawingTools.onEdit(ui.util.debounce(generateChart, 500));
// mapPanel.style().set('cursor', 'crosshair');
function drawRectangle() {
clearGeometry();
drawingTools.setShape('rectangle');
drawingTools.draw();
}