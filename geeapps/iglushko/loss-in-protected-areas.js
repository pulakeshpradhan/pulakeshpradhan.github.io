//1.Select country
//2.Select basin by click
// Max area
var maxAoiArea = 8e20;
var aoiArea = null;
//Countries
var Countries='USDOS/LSIB_SIMPLE/2017';
//prepare country list
var cnames=ee.List(ee.FeatureCollection(Countries).aggregate_array('country_na').getInfo());
//Добавим глобальный слой ООПТ
var wdpa=ee.FeatureCollection("WCMC/WDPA/current/polygons");
//var panames=ee.List(ee.FeatureCollection(wdpa).aggregate_array('NAME').getInfo());
//print(wdpa.first())
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var wdpa_outline = empty.paint({
    featureCollection: wdpa,
    color: 1,
    width: 1
});
//watershed style
var pastyling = {palette: '#3559b1'};
//Выберем ООПТ из глобального слоя
var pa=wdpa.filter(ee.Filter.eq('NAME', 'Kenozersky'));
print(pa)
//Primary forests
var sa_primary = ee.Image('users/iglushko/PrimaryForestsGLAD/SouthAmerica_2001_primary');
var as_primary = ee.Image('users/iglushko/PrimaryForestsGLAD/Asia_2001_primary');
var af_primary = ee.Image('users/iglushko/PrimaryForestsGLAD/Africa_2001_primary');
var mad_primary = ee.Image('users/iglushko/PrimaryForestsGLAD/Madagaskar_2001_primary');
var prim=ee.Image(ee.ImageCollection([sa_primary.unmask(),as_primary.unmask(),af_primary.unmask(),mad_primary.unmask()]).max());
var VIS_OPTIONS_PRIM = {min: 0, max: 1, palette:  ['grey','green']};
//GLAD
var GLAD_ID = 'UMD/hansen/global_forest_change_2020_v1_8';
//print(ee.Image(GLAD_ID));
// Define vis palette:
var default_palette = ['000004', '2C105C', '711F81', 'B63679', 'EE605E', 'FDAE78', 'FCFDBF'];
var loss_palette= ['cf2ccf','9b2ccf', '682ccf', '2c39cf', '2c5fcf',
'2c96cf', '2cbfcf','2ccfbf', '2ccf8e', '2ccf5d', '31cf2c',
'75cf2c', 'a4cf2c','f4e21a', 'f4a019', 'f45a18', 'f41818','f41861'];
// Define data options.
var dataInfo = {
  'LandsatGLADlast': {
    colId: GLAD_ID,
    bands: ['last_b50','last_b40','last_b30'],
    legendLabel: 'Landsat GLAD last composite',
    visParams: {
      min: 15,
      max: 128,
    },
    viewWindow: {
      min: 0.0,
      max: 1000.0
    },
    baseline: 0
  },
  'LandsatGLADfirst': {
    colId: GLAD_ID,
    bands: ['first_b50','first_b40','first_b30'],
    legendLabel: 'Landsat GLAD first composite',
    visParams: {
      min: 15,
      max: 128,
    },
    viewWindow: {
      min: 0.0,
      max: 1000.0
    },
    baseline: 0
  },
  'LOSS': {
    colId: GLAD_ID,
    bands: 'loss',
    legendLabel: 'Landsat GLAD total loss',
    visParams: {
      palette:['yellow','red'],
      min: 0,
      max: 1,
    },
    viewWindow: {
      min: 0.0,
      max: 1000.0
    },
    baseline: 0
  },
    'LOSSYEAR': {
    colId: GLAD_ID,
    bands: 'lossyear',
    legendLabel: 'Landsat GLAD yearly loss',
    visParams: {
      palette:loss_palette,
      min: 0,
      max: 19,
    },
    viewWindow: {
      min: 0.0,
      max: 1000.0
    },
    baseline: 0
  },
}
//get selectors
var dateInfo = {
  left: {selected: ''},
  rigth: {selected: ''}
};
var selectedCountryName='Russia'
var country = ee.FeatureCollection(Countries).filter(ee.Filter.eq('country_na', selectedCountryName));
//print(ee.Feature(selected_country.first()).bounds())
var countrySelector = ui.Select({
      items:cnames.getInfo(), 
      onChange: function(value) {
        selectedCountryName=value
    }
});
var dataSelector = ui.Select({
  items: Object.keys(dataInfo)
});
// Get data information - used globally in functions.
var datasetUrl = ui.url.get('dataset', 'LandsatGLADfirst');
//ui.url.set('dataset', datasetUrl); // need to set incase this is the initial load.
var thisData = dataInfo[datasetUrl];
dataSelector.set({placeholder: datasetUrl, value: datasetUrl});
// Get data information - used globally in functions.
var countrysetUrl = ui.url.get('country', selectedCountryName);
ui.url.set('country', selectedCountryName); // need to set incase this is the initial load.
countrySelector.set({placeholder: countrysetUrl, value: countrysetUrl});
var cpoint=ee.Feature(country.first()).centroid().geometry();
//print(cpoint.getInfo()['coordinates'][0])
var initPoint = ee.Geometry.Point(cpoint.getInfo()['coordinates'][0], cpoint.getInfo()['coordinates'][1]).toGeoJSONString();
var center = ui.url.get('center', initPoint);
//ui.url.set('center', dataTypeUrl);
var zoom = ui.url.get('zoom', '3');
ui.url.set('center', zoom);
// #############################################################################
// ### STEP UP THE INFO PANEL ###
// #############################################################################
// Define the info panel.
var infoPanel = ui.Panel({style: {width: '27%'}});
// Create an introduction panel.
var intro = ui.Panel([
  ui.Label({
    value: 'Forest loss in protected areas',
    style: {fontSize: '24px', fontWeight: 'bold'}
  }),
  ui.Label('An application to visualize forest canopy loss within PA')
]);
var country=ui.Panel([
  ui.Label({
  value: 'Selected country',
  style: {fontSize: '14px', fontWeight: 'bold'}
  }),
  countrySelector], ui.Panel.Layout.flow('horizontal'));
var countryPanel = ui.Panel({
  widgets: [country],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal'}
});
//add panel for watershed
var inspector = ui.Panel([ui.Label('')]);
var mapComparison = ui.Panel([
  ui.Label({
    value: 'Map Comparison',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label({value: '1. Select country from list:'}),
  countryPanel,
  ui.Label({value: '2. Select PA:'}),
  inspector,
  ui.Label(''),
  ui.Label('')
]);
// Add widgets to the info panel.
infoPanel.add(intro);
var panelBreak25 = ui.Panel(null, null, {stretch: 'horizontal', height: '1px', backgroundColor: '000', margin: '8px 0px 8px 0px'});
infoPanel.add(panelBreak25);
infoPanel.add(mapComparison);
// #############################################################################
// ### MAP LEGEND SETUP ###
// #############################################################################
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
function makeLegend() {
  // Create the color bar for the legend.
  var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams(loss_palette),
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '20px'},
  });
  // Create a panel with three numbers for the legend.
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label('2001', {fontWeight: 'bold',margin: '4px 8px', fontSize: '14px'}), //
      ui.Label(
          '2010', //
          {fontWeight: 'bold', margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontSize: '14px'}),
      ui.Label('2020', {fontWeight: 'bold',margin: '4px 8px', fontSize: '14px'})
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  var legendTitle = ui.Label({
    value:'Loss-by-year palette',
    style: {fontWeight: 'bold', fontSize: '12px'}
  });
  var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
  mapComparison.widgets().set(14, legendPanel);
}
// Add the legend to the info panel
makeLegend();
// #############################################################################
// ### STEP UP THE MAP CANVASES ###
// #############################################################################
// Make date labels for the maps.
var leftLabel = ui.Label('2000',
  {shown: true, position: 'bottom-left', fontWeight: 'bold', color:'000',
  fontSize: '18px', backgroundColor: 'rgba(255, 255, 255, 1.0)'});
var rightLabel = ui.Label('2020',
  {shown: true, position: 'bottom-right', fontWeight: 'bold', color:'000',
  fontSize: '18px', backgroundColor: 'rgba(255, 255, 255, 1.0)'}); 
// Make maps.
var leftMap = ui.Map();
var rightMap = ui.Map();
// left map draw only.
//var rightMapDrawLabel = ui.Label({value: 'Drawing disabled on this side',
  //style: {color: 'EE605E', position: 'top-right', backgroundColor: 'rgba(255, 255, 255, 1.0)'}})
//rightMap.add(rightLabel);
//leftMap.add(leftLabel);
// Set map properties
leftMap.setControlVisibility({layerList: true, zoomControl: false, fullscreenControl: false});
rightMap.setControlVisibility({layerList: true, zoomControl: false, fullscreenControl: false});
leftMap.drawingTools().setShown(false);
rightMap.drawingTools().setShown(false);
leftMap.setOptions('Dark', {Dark: darkMap()});
rightMap.setOptions('Dark', {Dark: darkMap()});
// Link the default Map to the other map.
var linker = ui.Map.Linker([leftMap, rightMap]);
// Create a SplitPanel which holds the linked maps side-by-side.
// Get the initial AOI from the url parameter.
var swipeStatus = ui.url.get('swipe', false);
ui.url.set('swipe', swipeStatus);
var sliderPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: swipeStatus,
  style: {stretch: 'both'}
});
var swipeButtonLabel = 'Show swipe display';
if(swipeStatus) {
  swipeButtonLabel = 'Show side-by-side display';
}
var swipeSwitchIndex=11
var swipeButton = ui.Button(swipeButtonLabel, switchSwipe, null, {position: 'top-left', });
mapComparison.widgets().set(swipeSwitchIndex, swipeButton);
function switchSwipe() {
  if(swipeStatus) {
    sliderPanel.setWipe(false);
    swipeButton.setLabel('Show swipe display');
    swipeStatus = false;
    ui.url.set('swipe', 'false');
  } else {
    sliderPanel.setWipe(true);
    swipeButton.setLabel('Show side-by-side display');
    swipeStatus = true;
    ui.url.set('swipe', 'true');
  }
}
///add go back button
//var backStatus =  true;
var backSwitchIndex=5;
var backButton = ui.Button('Go back',refreshMap, null, {position: 'top-left', });
mapComparison.widgets().set(backSwitchIndex, backButton);
function clearPanel() {
  //print(infoPanel.widgets())
  var tmptimeSeries=infoPanel.widgets().get(4)
  var tmptimeSeries1=infoPanel.widgets().get(3)
  //print(tmptimeSeries)
  tmptimeSeries1.clear()
  tmptimeSeries.clear()
}
function refreshMap() {
  leftCountryHandler();
  rightCountryHandler();
  //clearPanel();
  clearChart();
  WatershedHandler();
}
function zoomMap() {
  var countryFromClick = countrySelector.getValue();
  var country = ee.FeatureCollection(Countries).filter(ee.Filter.eq('country_na', countryFromClick));
  rightMap.centerObject(country,4)
  leftMap.centerObject(country,4)
}
///###########################################################################
function leftCountryHandler() {
  var countryFromClick = countrySelector.getValue();
  //print(countryFromClick)
  var country = ee.FeatureCollection(Countries).filter(ee.Filter.eq('country_na', countryFromClick));
  var img1 = firstCompositeImage(country);
  var loss1 = lossImage(country);
  //var wsh = addWatershed(country);
  leftMap.centerObject(country,4)
  leftMap.layers().set(0, ui.Map.Layer(img1, thisData.visParams, 'First Composite', true, 0.95));
  leftMap.layers().set(2, ui.Map.Layer(wdpa_outline, pastyling, 'PA', true, 0.85));
  //drawChart();
}
function rightCountryHandler() {
  var countryFromClick = countrySelector.getValue();
  //print(countryFromClick)
  var country = ee.FeatureCollection(Countries).filter(ee.Filter.eq('country_na', countryFromClick));
  var img1 = lastCompositeImage(country);
  var loss1 = lossImage(country);
  rightMap.centerObject(country,4)
  rightMap.layers().set(0, ui.Map.Layer(img1, thisData.visParams, 'Last Composite', true, 0.95));
  rightMap.layers().set(1, ui.Map.Layer(loss1, dataInfo.LOSSYEAR.visParams, 'Forest Loss', true, 0.95));
  rightMap.layers().set(2, ui.Map.Layer(wdpa_outline, pastyling, 'PA', true, 0.85));
  //drawChart();
}
//select watershed by click and get data for watershed only
function WatershedHandler() {
  inspector.clear();
  leftMap.onClick(function(coords) {
  // Show the loading label.
  inspector.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Determine the coord.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var w = ee.FeatureCollection(wdpa).filterBounds(point);
  var pa_id = ee.Feature(w.first()).get('NAME');
  var sub_area = ee.Feature(w.first()).get('GIS_AREA');
  // Request the value from the server.
  pa_id.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector.widgets().set(0, ui.Label({
      value: 'NAME: ' + result,style: {fontSize: '14px', fontWeight: 'bold'}
    }));
  });
  sub_area.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector.widgets().set(1, ui.Label({
      value: 'AREA: ' + result.toFixed(1),style: {fontSize: '14px', fontWeight: 'bold'}
    }));
  });
  //1.Create subset of data and add to map
  var img_ss = firstCompositeImage(w);
  var loss_ss = lossImage(w);
  //add outline
  var tmp_outline = empty.paint({
    featureCollection: w,
    color: 1,
    width: 2
  });
  //var wsh = addWatershed(c);
  leftMap.clear();
  leftMap.setOptions('Dark', {Dark: darkMap()});
  leftMap.centerObject(w)
  leftMap.layers().set(0, ui.Map.Layer(img_ss.clipToCollection(w), thisData.visParams, 'First Composite', true, 0.95));
  leftMap.layers().set(1, ui.Map.Layer(loss_ss.clipToCollection(w), dataInfo.LOSSYEAR.visParams, 'Loss', false, 0.95));
  leftMap.layers().set(2, ui.Map.Layer(tmp_outline, pastyling, pa_id.getInfo(), true, 0.85));
  var img_ss1 = lastCompositeImage(w);
  rightMap.clear();
  rightMap.setOptions('Dark', {Dark: darkMap()});
  rightMap.centerObject(w)
  rightMap.layers().set(0, ui.Map.Layer(img_ss1.clipToCollection(w), thisData.visParams, 'Last Composite', true, 0.95));
  rightMap.layers().set(1, ui.Map.Layer(loss_ss.clipToCollection(w), dataInfo.LOSSYEAR.visParams, 'Loss', true, 0.95));
  rightMap.layers().set(2, ui.Map.Layer(tmp_outline, pastyling, pa_id.getInfo(), true, 0.85));  //2.calc total loss
  rightMap.add(rightLabel);
  leftMap.add(leftLabel);
  //2.calc total loss
  inspector.widgets().set(2, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  inspector.widgets().set(3, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  var lossAreaImage = loss_ss.gt(0).updateMask(loss_ss.gt(0)).rename('loss').multiply(ee.Image.pixelArea());
  var totloss = lossAreaImage.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: w,
    scale: 30,
    maxPixels: 1e18
  });
  totloss=ee.Number(totloss.get('loss')).divide(1000000);
  var totloss_prc=totloss.divide(sub_area.getInfo()).multiply(100);
  //print(totloss,totloss_prc);
  //add to panel
  totloss.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector.widgets().set(2, ui.Label({
      value: 'Total forest loss, km²: ' + result.toFixed(1),style: {fontSize: '14px', fontWeight: 'bold'}
    }));
  });
  totloss_prc.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector.widgets().set(3, ui.Label({
      value: 'Percent of PA area, %: ' + result.toFixed(1),style: {fontSize: '14px', fontWeight: 'bold'}
    }));
  });
  //3.Add chart
  drawChart(loss_ss,w);
  //print(infoPanel.widgets())
  //clearPanel();
  //time panel
  /*var timeSeries =ui.Panel({
    widgets: [
      ui.Label({
        value: 'Time Series Chart',
        style: {fontSize: '20px', fontWeight: 'bold'}
      }),
      chartButton
    ],
    style: {position: 'bottom-left'},
    layout: null,
  });
  var panelBreak50 = ui.Panel(null, null, {stretch: 'horizontal', height: '1px', backgroundColor: '000', margin: '8px 0px 8px 0px'});
  infoPanel.add(panelBreak50);
  infoPanel.add(timeSeries);
  //rightLabel.setValue(date);
  //rightLabel.style().set({shown: true});
  //drawChart();
  */
  });
}
// #############################################################################
// ### INITIALIZE THE DATA ###
// #############################################################################
function firstCompositeImage(c) {
  var datasetUrl = ui.url.get('dataset', 'LandsatGLADfirst');
  //ui.url.set('dataset', datasetUrl); // need to set incase this is the initial load.
  var thisData = dataInfo[datasetUrl];
  var col = ee.Image(thisData.colId);
  return ee.Image(col.select(thisData.bands));
}
function lastCompositeImage(c) {
  var datasetUrl = ui.url.get('dataset', 'LandsatGLADlast');
  //ui.url.set('dataset', datasetUrl); // need to set incase this is the initial load.
  var thisData = dataInfo[datasetUrl];
  var col = ee.Image(thisData.colId);
  return ee.Image(col.select(thisData.bands));
}
function lossImage(c) {
  var datasetUrl = ui.url.get('dataset', 'LOSSYEAR');
  var thisData = dataInfo[datasetUrl];
  var col = ee.Image(thisData.colId);
  return col.select(thisData.bands);
}
function addWatershed(c) {
  var clipped = ee.Feature(ee.Feature(selected_country.first()).bounds().geometry()).intersection(watershed.geometry(), 10);
  return clipped;
}
// #############################################################################
// ### SETUP THE CHARTS PANEL ###
// #############################################################################
var noPlotLabel = ui.Label({value: 'PA not selected',
  style: {position: 'top-left', color: 'EE605E', fontWeight: 'bold', shown: false}});
var barChart = ui.Label({value: '', style: {position: 'top-left', shown: false}});
var lineChart = ui.Label({value: '', style: {position: 'top-left', shown: false}});
var tsChart = ui.Panel([noPlotLabel, barChart, lineChart]);
var chartStatus = ui.url.get('chart', 'bar');
ui.url.set('chart', chartStatus);
var chartButtonLabel = 'Show line chart';
if(chartStatus == 'bar') {
  tsChart.widgets().get(0).style().set({shown: false});
  tsChart.widgets().get(1).style().set({shown: true});
  tsChart.widgets().get(2).style().set({shown: false});
} else {
  chartButtonLabel = 'Show line chart';
  tsChart.widgets().get(0).style().set({shown: false});
  tsChart.widgets().get(2).style().set({shown: false});
  tsChart.widgets().get(1).style().set({shown: true});  
}
var chartButton = ui.Button(chartButtonLabel, switchChart);
function switchChart() {
  if(chartStatus == 'bar') {
    chartButton.setLabel('Show bar chart');
    chartStatus = 'line';
    ui.url.set('chart', 'line');
    tsChart.widgets().get(1).style().set({shown: false});
    tsChart.widgets().get(2).style().set({shown: true});
    tsChart.widgets().get(0).style().set({shown: false});
  } else {
    chartButton.setLabel('Show line chart');
    chartStatus = 'bar';
    ui.url.set('chart', 'bar');
    tsChart.widgets().get(1).style().set({shown: true});
    tsChart.widgets().get(2).style().set({shown: false});
    tsChart.widgets().get(0).style().set({shown: false});
    //drawChart()
  }
}
//add panel for first time
var timeSeries =ui.Panel({
    widgets: [
      ui.Label({
        value: 'Time Series Chart',
        style: {fontSize: '20px', fontWeight: 'bold'}
      }),
      chartButton
    ],
    style: {position: 'bottom-left'},
    layout: null,
});
var panelBreak50 = ui.Panel(null, null, {stretch: 'horizontal', height: '1px', backgroundColor: '000', margin: '8px 0px 8px 0px'});
infoPanel.add(panelBreak50);
infoPanel.add(timeSeries);
// #############################################################################
// ### CHART DATA ###
// #############################################################################
function setChart() {
  if(chartStatus == 'bar') {
    tsChart.widgets().get(1).style().set({shown: true});
    tsChart.widgets().get(2).style().set({shown: false});
    tsChart.widgets().get(0).style().set({shown: false});
  } else {
    tsChart.widgets().get(2).style().set({shown: false});
    tsChart.widgets().get(1).style().set({shown: true});
    tsChart.widgets().get(0).style().set({shown: false});
  }
}
//clear chart
function clearChart() {
  // Set the aoi url parameter as the new geometry.
  //ui.url.set('aoi', aoi.toGeoJSONString());
  tsChart.widgets().get(0).style().set({shown: true});
  tsChart.widgets().get(2).style().set({shown: false});
  tsChart.widgets().get(1).style().set({shown: false});
}
// Function to plot chart on drawing events.
function drawChart(loss,aoi) {
  // Set the aoi url parameter as the new geometry.
  //ui.url.set('aoi', aoi.toGeoJSONString());
  setChart();
  chartTimeSeries(loss,aoi);
}
//chart
function chartTimeSeries(loss,aoi) {
  var lossAreaImage = loss.gt(0).updateMask(loss.gt(0)).multiply(ee.Image.pixelArea());
  var lossByYear = lossAreaImage.addBands(loss.updateMask(loss.gt(0))).reduceRegion({
      reducer: ee.Reducer.sum().group({
        groupField: 1
        }),
      geometry: aoi,
      scale: 30,
      maxPixels: 1e18
    });
  var statsFormatted = ee.List(lossByYear.get('groups'))
      .map(function(el) {
        var d = ee.Dictionary(el);
        return [ee.String(ee.Number(d.get('group')).format("20%02d")), d.get('sum')];
      });
  var statsDictionary = ee.Dictionary(statsFormatted.flatten());
  var barChart = ui.Chart.array.values({
    array: statsDictionary.values(),
    axis: 0,
    xLabels: statsDictionary.keys()
    }).setChartType('ColumnChart')
    .setOptions({
      height: 245,
      //explorer: {axis: 'vertical'},
      //interpolateNulls: true,
      title: 'Loss-over-year',
      vAxis: {
        baseline: 0,
        titleTextStyle: {italic: false, fontSize: 14, bold: true},
        title: 'Loss Area, m²',
        gridlines: {count: 0},
      },
      hAxis: {
        titleTextStyle: {italic: false, fontSize: 14, bold: true},
        title: 'Year', 
        gridlines: {count: 4, color: 'FFF'},
        //ticks: [0, 100, 200, 300],
      },
      legend: {position: 'none'},
    });
  var lineChart = ui.Chart.array.values({
    array: statsDictionary.values(),
    axis: 0,
    xLabels: statsDictionary.keys()
    }).setChartType('LineChart')
    .setOptions({
      height: 245,
      explorer: {axis: 'vertical'},
      interpolateNulls: true,
      title: 'Loss-over-year',
      vAxis: {
        baseline: 0,
        titleTextStyle: {italic: false, fontSize: 14, bold: true},
        title: 'Year',
        gridlines: {count: 0},
      },
      hAxis: {
        titleTextStyle: {italic: false, fontSize: 14, bold: true},
        title: 'Loss Area, m²', 
        gridlines: {count: 4, color: 'FFF'},
        //ticks: [0, 100, 200, 300],
      },
      legend: {position: 'none'},
    });
  tsChart.widgets().set(2, lineChart);
  tsChart.widgets().set(1, barChart);
  setChart();
}
// #############################################################################
// ### PREP FOR DEALING WITH GEOMETRY DRAWING ###
// #############################################################################
// Get the drawing tools widget object.
var drawingTools = leftMap.drawingTools();
var drawingToolsRight = rightMap.drawingTools();
// clear any existing geometries.
var nLayers = drawingTools.layers().length();
while (nLayers > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
  nLayers = drawingTools.layers().length();
}
var nLayers = drawingToolsRight.layers().length();
while (nLayers > 0) {
  var layer = drawingToolsRight.layers().get(0);
  drawingToolsRight.layers().remove(layer);
  nLayers = drawingToolsRight.layers().length();
}
//drawingTools.addLayer([aoi], null, 'FFF');
//drawingToolsRight.addLayer([aoi], null, 'FFF');
//drawingToolsRight.layers().get(0).setLocked(true);
// Set up a ui.Panel to hold instructions and the geometry drawing buttons.
// #############################################################################
// ### SETUP APP DISPLAY ###
// #############################################################################
var mapChartSplitPanel = ui.Panel(ui.SplitPanel({
  firstPanel: ui.Panel(sliderPanel, null, {height: '62%'}), //
  secondPanel: tsChart,
  orientation: 'vertical',
  wipe: false,
}));
// Make the info panel and slider panel split.
var splitPanel = ui.SplitPanel(infoPanel, mapChartSplitPanel);
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
// Set url params for map bounds.
leftMap.onChangeBounds(function(e) {
  ui.url.set('center', ee.Geometry.Point(e.lon, e.lat).toGeoJSONString());
  ui.url.set('zoom', e.zoom);
});
// center aoi.
leftMap.centerObject(ee.Geometry(JSON.parse(center)), parseInt(zoom));
// #############################################################################
// ### INITIALIZE MAP DATA ###
// #############################################################################
// Add data to maps.
var blankImg = ee.Image(0).selfMask();
leftMap.addLayer(blankImg);
rightMap.addLayer(blankImg);
leftMap.add(leftLabel);
rightMap.add(rightLabel);
leftCountryHandler();
rightCountryHandler();
WatershedHandler();
countrySelector.onChange(leftCountryHandler);
countrySelector.onChange(rightCountryHandler);
countrySelector.onChange(clearChart);
countrySelector.onChange(WatershedHandler);
// #############################################################################
// ### CUSTOM MAP STYLE ###
// #############################################################################
function darkMap() {
return [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3e3e3e"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#3e3e3e"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
];
}