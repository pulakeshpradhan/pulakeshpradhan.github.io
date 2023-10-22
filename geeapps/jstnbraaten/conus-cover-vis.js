// Import initial collection.
var no2 = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2");
// Define an initial geometry to filter the collection.
var initPoint = ee.Geometry.Point(112, 30);
// Get todays date to use as initial date filter for collection.
var today = ee.Date(Date.now());
// Get latest image date.
var mostRecentDate = no2
  .filterBounds(initPoint)
  .filterDate(today.advance(-20, 'day'), today.advance(1, 'day'))
  .sort('system:time_start', false)
  .first()
  .date();
//print(mostRecentDate)
// var filterDate = {
//   'Jan-01 to Jan-15': {y2019: ee.Filter.date('2019-01-01', '2019-01-16'), y2020: ee.Filter.date('2020-01-01', '2020-01-16')},
//   'Jan-16 to Jan-30': {y2019: ee.Filter.date('2019-01-16', '2019-01-31'), y2020: ee.Filter.date('2020-01-16', '2020-01-31')},
//   'Jan-31 to Feb-14': {y2019: ee.Filter.date('2019-01-31', '2019-02-15'), y2020: ee.Filter.date('2020-01-31', '2020-02-15')},
//   'Feb-15 to Feb-29': {y2019: ee.Filter.date('2019-02-15', '2019-03-01'), y2020: ee.Filter.date('2020-02-15', '2020-03-01')},
//   'Mar-01 to Mar-15': {y2019: ee.Filter.date('2019-03-01', '2019-03-15'), y2020: ee.Filter.date('2020-03-01', '2020-03-15')},
//   'Mar-16 to Mar-30': {y2019: ee.Filter.date('2019-03-16', '2019-03-31'), y2020: ee.Filter.date('2020-03-16', '2020-03-31')},
// };
// var dateSelector = ui.Select({
//   items: Object.keys(filterDate),
//   placeholder: 'Mar-16 to Mar-30',
//   value: 'Mar-16 to Mar-30',
//   onChange: dateSelectHandler
// });
// Function to add new map layers for NO2 based on date selection.
function dateSelectHandler(date) {
  //y2019 = compositeImages(filterDate[key].y2019);
  //y2020 = compositeImages(filterDate[key].y2020);
  // Get the start day from the selected date (date slider return object)
  today = ee.Date(date.start());
  //ui.url.set('date', today.format('YYYY-MM-dd').getInfo());
  // Set the date URL param.
  today.format('YYYY-MM-dd').evaluate(function(date) {
    //print(date)
    ui.url.set('date', date);
  });
  // Update the date labels in the maps.
  leftLabel.setValue(today.advance(-1, 'year').format('YYYY-MM-dd').getInfo());
  rightLabel.setValue(today.format('YYYY-MM-dd').getInfo());
  // Calculate start and end dates for composites - 2019 and 2020
  y2020startDate = today.advance(-3, 'day');
  y2020endDate = today.advance(4, 'day');
  y2019startDate = y2020startDate.advance(-1, 'year');
  y2019endDate = y2020endDate.advance(-1, 'year');
  // Define date range filters.
  y2020Filter = ee.Filter.date(y2020startDate.format('YYYY-MM-dd'), y2020endDate.format('YYYY-MM-dd'));
  y2019Filter = ee.Filter.date(y2019startDate.format('YYYY-MM-dd'), y2019endDate.format('YYYY-MM-dd'));
  // Calculate the composites, give the filters.
  y2019 = compositeImages(y2019Filter);
  y2020 = compositeImages(y2020Filter);
  // Replace the map layers.
  leftMap.layers().set(0, ui.Map.Layer(y2019, visParams ,'2019', true, 0.6));
  rightMap.layers().set(0, ui.Map.Layer(y2020, visParams, '2020', true, 0.6));
}
// #############################################################################
// ### STEP UP THE INFO PANEL ###
// #############################################################################
// Define the info panel.
var infoPanel = ui.Panel({style: {width: '27%'}});
// Create an introduction panel.
var intro = ui.Panel([
  ui.Label({
    value: 'NO2 2020 vs. 2019',
    style: {fontSize: '24px', fontWeight: 'bold'}
  }),
  ui.Label('Explore changes in atmospheric nitrogen dioxide concentrations during the COVID-19 outbreak.')
]);
// TODO: date slider - url
var sliderDateUrl = ui.url.get('date', mostRecentDate.format('YYYY-MM-dd').getInfo());
ui.url.set('date', sliderDateUrl); // need to set incase this is the initial load.
//print('sliderDate', sliderDate);
var sliderDate = ee.Date(sliderDateUrl);
// Set up the date slider widget.
var sliderEndDate = mostRecentDate.advance(1, 'day').format('YYYY-MM-dd').getInfo();
// print('sliderEndDate', sliderEndDate)
var dateSelector = ui.DateSlider({
  start: '2020-01-01',
  end: sliderEndDate,// ee.Date(Date.now()).advance(-4, 'day').format('YYYY-MM-dd').getInfo(),
  value: sliderDate.format('YYYY-MM-dd').getInfo(),
  period: 1,
  style: {stretch: 'horizontal'},
  onChange: dateSelectHandler
});
var mapComparison = ui.Panel([
  ui.Label({
    value: 'Map Comparison',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label({value: '1. Select a date to compare 2020 to 2019.'}),
  dateSelector,
  ui.Label({value: '2. Compare data side-by-side or use the swipe tool.'}),
  ui.Label('[swipeSwitch]')
]);
// Add widgets to the info panel.
infoPanel.add(intro);
infoPanel.add(mapComparison);
infoPanel.add(ui.Label('[Legend]'));
infoPanel.add(ui.Label('[timeSeries]'));
infoPanel.add(ui.Label('[timeSeriesChart1]'));
// #############################################################################
// ### INITIALIZE THE NO2 DATA ###
// #############################################################################
// Function to masl low NO2 values - mapped over collection.
function maskLowVals(img) {
  return img.updateMask(img.gt(0.00007));
}
// Function to median composite images within date range - masks low values
function compositeImages(dateRange) {
  return no2.filter(dateRange)
  .select('NO2_column_number_density')
  .map(maskLowVals)
  .reduce(ee.Reducer.mean());
}
// Get initial dates.
var targetDate = sliderDate;//mostRecentDate;
//print('targetDate', targetDate)
var y2020startDate = targetDate.advance(-3, 'day');
var y2020endDate = targetDate.advance(4, 'day');
var y2019startDate = y2020startDate.advance(-1, 'year');
var y2019endDate = y2020endDate.advance(-1, 'year');
// print('y2020startDate', y2020startDate);
// print('y2020endDate', y2020endDate);
// Make date filters for the initial map layers.
var y2020Filter = ee.Filter.date(y2020startDate.format('YYYY-MM-dd'), y2020endDate.format('YYYY-MM-dd'));
var y2019Filter = ee.Filter.date(y2019startDate.format('YYYY-MM-dd'), y2019endDate.format('YYYY-MM-dd'));
// Create initial map layers.
var y2019 = compositeImages(y2019Filter);
var y2020 = compositeImages(y2020Filter);
// Create difference map
//var dif = y2020.subtract(y2020);
// #############################################################################
// ### STEP UP THE MAP CANVASES ###
// #############################################################################
// Make date labels for the maps.
// var leftLabel = ui.Label('[leftLabel]', {position: 'bottom-left', fontWeight: 'bold', color:'000', fontSize: '18px', backgroundColor: 'rgba(255, 255, 255, 1.0)'});
// var rightLabel = ui.Label('[rightLabel]', {position: 'bottom-right', fontWeight: 'bold', color:'000', fontSize: '18px', backgroundColor: 'rgba(255, 255, 255, 1.0)'});
// var dateLabels = ee.Dictionary({
//   leftDate: targetDate.advance(-1, 'year').format('YYYY-MM-dd'),
//   rightDate: targetDate.format('YYYY-MM-dd')
// });
// dateLabels.evaluate(function(dict) {
//   leftLabel.setValue(dict.leftDate);
//   rightLabel.setValue(dict.rightDate);
// });
var leftLabel = ui.Label(targetDate.advance(-1, 'year').format('YYYY-MM-dd').getInfo(), {position: 'bottom-left', fontWeight: 'bold', color:'000', fontSize: '18px', backgroundColor: 'rgba(255, 255, 255, 1.0)'});
var rightLabel = ui.Label(targetDate.format('YYYY-MM-dd').getInfo(), {position: 'bottom-right', fontWeight: 'bold', color:'000', fontSize: '18px', backgroundColor: 'rgba(255, 255, 255, 1.0)'});
// Make maps.
var leftMap = ui.Map();
var rightMap = ui.Map();
// left map draw only.
var rightMapDrawLabel = ui.Label({value: 'Drawing disabled on this side', style: {color: 'EE605E', position: 'top-right'}})
rightMap.add(rightMapDrawLabel);
// Set map properties
leftMap.setControlVisibility({layerList: false, zoomControl: false, fullscreenControl: false});
rightMap.setControlVisibility({layerList: false, zoomControl: false, fullscreenControl: false});
//leftMap.drawingTools().setLinked(true);
//rightMap.drawingTools().setLinked(true);
leftMap.drawingTools().setShown(false);
rightMap.drawingTools().setShown(false);
leftMap.setOptions('Dark', {Dark: darkMap()});
rightMap.setOptions('Dark', {Dark: darkMap()});
// Link the default Map to the other map.
var linker = ui.Map.Linker([leftMap, rightMap]);
// Create a SplitPanel which holds the linked maps side-by-side.
// Get the initial AOI from the url parameter.
var swipeStatus = ui.url.get('swipe', false);
ui.url.set('swipe', swipeStatus); // need to set incase this is the initial load.
var sliderPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: swipeStatus,
  style: {stretch: 'both'}
});
var swipeButtonLabel = 'Show swipe';
if(swipeStatus) {
  swipeButtonLabel = 'Show side-by-side';
}
var swipeButton = ui.Button(swipeButtonLabel, switchSwipe, null, {position: 'top-left', });
mapComparison.widgets().set(4, swipeButton);
function switchSwipe() {
  if(swipeStatus) {
    sliderPanel.setWipe(false);
    swipeButton.setLabel('Show swipe');
    swipeStatus = false;
    ui.url.set('swipe', 'false');
  } else {
    sliderPanel.setWipe(true);
    swipeButton.setLabel('Show side-by-side');
    swipeStatus = true;
    ui.url.set('swipe', 'true');
  }
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
//Initialize a dummy GeometryLayer with null geometry acts as a placeholde
//for drawn geometries.
// var dummyGeometry = ui.Map.GeometryLayer({
//   geometries: null, name: 'geometry', color: '23cba7'});
// // Add the dummy geometry as a layer of the drawing tools widget.
// drawingTools.layers().add(dummyGeometry);
// Get the initial AOI from the url parameter.
var aoiUrl = ui.url.get('aoi', initPoint.toGeoJSONString());
var aoi = ee.Geometry(JSON.parse(aoiUrl));
ui.url.set('aoi', aoi.toGeoJSONString()); // need to set incase this is the initial load.
drawingTools.addLayer([aoi], null, 'FFF'); //drawingTools.addLayer([ee.Geometry(JSON.parse(aoiUrl))], null, 'FFF');
drawingToolsRight.addLayer([aoi], null, 'FFF');
drawingToolsRight.layers().get(0).setLocked(true);
//var aoi = drawingTools.layers().get(0).getEeObject();
// #############################################################################
// ### STEP UP APP DISPLAY ###
// #############################################################################
// Make the info panel and slider panel split.
var splitPanel = ui.SplitPanel(infoPanel, ui.Panel(sliderPanel));
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
// Get initial map bounds from the url parameter.
var center = ui.url.get('center', initPoint.toGeoJSONString());
var zoom = ui.url.get('zoom', '5');
// Set url params for map bounds.
leftMap.onChangeBounds(function(e) {
  ui.url.set('center', ee.Geometry.Point(e.lon, e.lat).toGeoJSONString());
  ui.url.set('zoom', e.zoom);
});
// center aoi.
leftMap.centerObject(ee.Geometry(JSON.parse(center)), parseInt(zoom));
//leftMap.centerObject(aoi, 5);
// #############################################################################
// ### INITIALIZE MAP DATA ###
// #############################################################################
// Vis params.
var visParams = {
  min: 0.00005, //50,
  max: 0.0004, //300,
  palette: ['000004', '2C105C', '711F81', 'B63679', 'EE605E', 'FDAE78', 'FCFDBF']//['feedb0', 'f7b37c', 'eb7858', 'ce4356', '9f2462', '66185c', '2f0f3e']//['383838', '320A5A', '781B6C', 'BB3654', 'EC6824', 'FBB41A', 'FCFFA4']
};
// Add data to maps.
leftMap.addLayer(y2019, visParams ,'2019', true, 0.6);
rightMap.addLayer(y2020, visParams, '2020', true, 0.6);
leftMap.add(leftLabel);
rightMap.add(rightLabel);
// #############################################################################
// ### CHART DATA ###
// #############################################################################
//var aoi = ee.Geometry.Point(103.967, 30.853).buffer(25000)
//leftMap.centerObject(aoi, 5)
var chartTimeSeries = function() {
  // Get image from '2019-01-01' to present for aoi.
  var no2ImgTs = no2
    .filter(ee.Filter.date('2019-01-01', mostRecentDate.advance(1, 'day')))//ee.Date(Date.now()).advance(-1, 'year')))
    .filterBounds(aoi)
    .select('NO2_column_number_density');
var firstDate = ee.Date('2019-01-01');
var lastDate = mostRecentDate.advance(1, 'day');
var nDays = lastDate.difference(firstDate, 'day');
// Enumerate a list of days with a 2-day step.
var seq = ee.List.sequence(0, nDays, 5);
// Map over the list of days to make NO2 composite images.
var compList = seq.map(function(i){
  // Identify the target date.
  var middleDay = firstDate.advance(i, 'day');
  // Identify date 2 days before target date.
  var fromDate = middleDay.advance(-5, 'day');
  // Identify date 3 days after target date.
  var toDate = middleDay.advance(6, 'day');
  // Filter the NO2 collection to the 5 days centered around target date. 
  var imgComp = no2ImgTs.filterDate(fromDate, toDate) // (inclusive, exclusive)
    // Calculate mean NO2 - reduce the collection to an image.
    .reduce(ee.Reducer.mean());
  // Determine the number of bands (used later to remove images with no bands).
  var nBands = imgComp.bandNames().size();
  // Return the composite image; set date and number of bands info. 
  return imgComp.set({
    'system:time_start': middleDay.millis(),
    'nBands': nBands})});
// Convert the image composite list to an ImageCollection.
var compCol = ee.ImageCollection.fromImages(compList)
  // Remove images with no bands
  // (can occur when there are no images for a given date range).
  .filter(ee.Filter.gt('nBands', 0));
  // Reduce the collection 
  var no2FcTs = ee.FeatureCollection(compCol.map(function(img) {
    var stat = img.reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: aoi,
      scale: 10000,
      bestEffort: true
    }
    );
    var imgDate = ee.Date(img.get('system:time_start'));
    return ee.Feature(aoi, stat).set({
      'system:time_start': imgDate.millis(),
      'doy': imgDate.getRelative('day', 'year'),
      'year': imgDate.get('year'),
      'MM-dd': imgDate.format('MM-dd'),
    });
  }));
  // Make the chart from the sorted FeatureCollection.
  var chart = ui.Chart.feature.groups({
    features: no2FcTs.sort('doy'), //chartThisFc.sort('system:time_start'), 
    xProperty: 'doy', //  'system:time_start', 
    yProperty: 'NO2_column_number_density_mean',
    seriesProperty: 'year'
  })
  .setChartType('LineChart')
  .setSeriesNames(['2019', '2020'])
  .setOptions({
    interpolateNulls: true,
    title: 'Year-over-year',
    vAxis: {
      title: 'NO₂ (mol/m²)',
      gridlines: {count: 0},
      viewWindow: {
        min: 0,
        max: 0.0005
      }
    },
    hAxis: {
      title: 'Day-of-year', 
      //format: 'MM-yy', 
      gridlines: {count: 4, color: 'FFF'},
      ticks: [0, 100, 200, 300],
    },
    series: {
      0: 
      {
        lineWidth: 1,
        color: 'B8B8B8',
        pointsVisible: false
      },
      1: 
      {
        lineWidth: 2,
        color: '711F81',
        pointsVisible: false
      }
    },
    //legend: {position: 'right'},
  });
  infoPanel.widgets().set(4, chart);
};
// #############################################################################
// ### EVENT HANDLERS ###
// #############################################################################
// Function to plot a default chart on page load.
function defaultChart() {
  chartTimeSeries();
} 
// Function to plot chart on map click.
// function clickChart(coords) {
//   aoi = ee.Geometry.Point(coords.lon, coords.lat);
//   chartTimeSeries();
// }
function clearRightGeom() {
  var nLayers = drawingToolsRight.layers().length();
  while (nLayers > 0) {
    var layer = drawingToolsRight.layers().get(0);
    drawingToolsRight.layers().remove(layer);
    nLayers = drawingToolsRight.layers().length();
  }
}
// Function to plot chart on drawing events.
function drawChart() {
  // Get the geometry.
  aoi = drawingTools.layers().get(0).getEeObject();
  clearRightGeom() 
  drawingToolsRight.addLayer([aoi], null, 'FFF');
  drawingToolsRight.layers().get(0).setLocked(true);
  // Set the aoi url parameter as the new geometry.
  ui.url.set('aoi', aoi.toGeoJSONString());
  // Set drawing mode back to null.
  drawingTools.setShape(null);
  // Adjust scale depending on map scale.
  // var mapScale = leftMap.getScale();
  // var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  // print(mapScale);
  // print(scale);
  // Plot the chart for the drawn geometry.
  chartTimeSeries();
}
// Add click listener/handler to maps.
//leftMap.onClick(clickChart);
//rightMap.onClick(clickChart);
// Initialize the chart.
defaultChart();
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
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(visParams.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(visParams.min, {margin: '4px 8px'}),
    ui.Label(
        (visParams.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(visParams.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'NO2 (mol/m²), total vertical column, 7-day mean',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
infoPanel.widgets().set(2, legendPanel);
// #############################################################################
// ### DRAWING TOOLS SETUP ###
// #############################################################################
// Define symbols for the labels.
var symbol = {
  rectangle: '▮',
  polygon: '▲',
  point: '●',
};
// Set up a ui.Panel to hold instructions and the geometry drawing buttons.
var timeSeries = ui.Panel({
  widgets: [
    ui.Label({
      value: 'Regional Time Series',
      style: {fontSize: '20px', fontWeight: 'bold'}
    }),
    ui.Label('1. Select a drawing mode.'),
    ui.Panel([
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal', margin:'3px'}}),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal', margin:'3px'}}),
    ui.Button({
      label: symbol.point + ' Point',
      onClick: drawPoint,
      style: {stretch: 'horizontal', margin:'3px'}}),
    ], ui.Panel.Layout.flow('horizontal'), {margin: '10px'}),
    ui.Label('2. Draw a geometry on the left map.\n'+
      '3. Wait for the chart to render.\n'+
      '4. Repeat 1-3 or edit/move geometry for\na new chart.',
      {whiteSpace: 'pre'})
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
infoPanel.widgets().set(3, timeSeries);
//infoPanel.add(timeSeries);
//infoPanel.add(mainPanel)
// // Get the drawing tools widget object.
// var drawingTools = leftMap.drawingTools();
// // clear any existing geometries.
// var nLayers = drawingTools.layers().length();
// while (nLayers > 0) {
//   var layer = drawingTools.layers().get(0);
//   drawingTools.layers().remove(layer);
//   nLayers = drawingTools.layers().length();
// }
// // Initialize a dummy GeometryLayer with null geometry acts as a placeholde
// // for drawn geometries.
// var dummyGeometry = ui.Map.GeometryLayer({
//   geometries: null, name: 'geometry', color: 'FFF'});
// // Add the dummy geometry as a layer of the drawing tools widget.
// drawingTools.layers().add(dummyGeometry);
// Define a function to clear the geometry from the layer when a
// drawing mode button is clicked.
function clearGeometry(){
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function clearGeometryRight(){
  var layers = drawingToolsRight.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
// Define function for dealing with a click on the rectangle button.
function drawRectangle(){
  clearGeometry();
  clearRightGeom();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
// Define function for dealing with a click on the polygon button.
function drawPolygon(){
  clearGeometry();
  clearRightGeom();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
// Define function for dealing with a click on the point button.
function drawPoint(){
  clearGeometry();
  clearRightGeom();
  drawingTools.setShape('point');
  drawingTools.draw();
}
// Use debounce to call the function at most every 100 milliseconds.
drawingTools.onEdit(ui.util.debounce(drawChart, 100));
drawingTools.onDraw(ui.util.debounce(drawChart, 100));
var chartNote = ui.Label({
  value: 'Chart note: data points represent 10-day center mean around 5-day increments.',
  style: {fontSize: '10px'}
});
var creditsLabel = ui.Label({
  value: 'Data source: Sentinel-5P Near Real Time Data (European Comission/ESA/Copernicus).',
  style: {fontSize: '10px'}
});
infoPanel.add(chartNote);
infoPanel.add(creditsLabel);
// #############################################################################
// ### CUSTOM MAP STYLE ###
// #############################################################################
function darkMap() {
return [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
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
        "color": "#212121"
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
]
}