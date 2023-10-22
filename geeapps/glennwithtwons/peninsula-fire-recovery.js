///////////////////////////////////////
//Fire recovery anomalies in fynbos
//Jasper Slingsby, Glenn Moncrieff and Adam Wilson
////////////////////////////////////////
var vis = {"opacity":1,"min":0,"max":1,"palette":["0b1eff","09ff05","ff220b"]};
//anomaly layer
var danom = {'Exceed above':ee.Image("users/glennwithtwons/emma_output")
                .select(['exceed_above']),
            'Exceed below':ee.Image("users/glennwithtwons/emma_output")
                .select(['exceed_below'])}
var aoi = 
    ee.Geometry.Polygon(
        [[[18.158159615255272, -33.861166832966596],
          [18.158159615255272, -34.41584793013852],
          [18.740435005880272, -34.41584793013852],
          [18.740435005880272, -33.861166832966596]]], null, false);
var poi = ee.Geometry.Point([18.451403611483784, -34.10548602485794]);        
//ndvi data
var ndvi_percent = ee.ImageCollection("users/glennwithtwons/ndvi_percent").sort('system:time_start');
//date of most recent image
var recDateEnd = ee.Date(new Date())
var recDateStart = ee.Date(recDateEnd.advance(-6,'month'))
var recDateMid = ee.Date(recDateEnd.advance(-3,'month'))
//fetch sentinel 2 data for display
var getSentinel2 = function(indate,lePasse){
  var strDateFin = indate;
  var strDateDebut = ee.Date(indate.advance(lePasse, 'month'));
  var collection = ee.ImageCollection('COPERNICUS/S2')
    .filterDate(strDateDebut, strDateFin)
    .filterBounds(poi);
  var lastImage= collection  
    .sort('CLOUDY_PIXEL_PERCENTAGE')
    .first();
  return lastImage
}
/////////////
/////////////
/////////////
/////////////
//interactive app
//////////////////////////
////get sentinel 2 data
var first = getSentinel2(recDateStart,-1);
var firstd = first.date();
var mid = getSentinel2(recDateMid,-1);
var midd = mid.date();
var end = getSentinel2(recDateEnd,-1);
var endd = end.date();
//you need to manully labels the images below with these dates
print(firstd)
print(midd)
print(endd)
var images = {
  '2019-11': first.visualize( {bands: ['B4', 'B3', 'B2'], gamma: 1.5, min:500, max :3000}),
  '2019-08': mid.visualize( {bands: ['B4', 'B3', 'B2'], gamma: 1.5, min:500, max :3000}),
  '2019-05': end.visualize( {bands: ['B4', 'B3', 'B2'], gamma: 1.5, min:500, max :3000}),
'none': ee.Image()
};
////
//get ndiv data
var ndvi_percent = ndvi_percent.select(['NDVI','anorm_p5','anorm_p95'],['NDVI','lower','upper']) 
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '230px', position: 'bottom-left',border :'2px solid black',shown: false},
});
// Create a button to unhide the panel.
var button = ui.Button({
  label: 'show/hide settings',
  style: {position: 'bottom-left',border :'2px solid black'},
  onClick: function() {
    // Display the panel.
    if (inspectorPanel.style().get('shown')) {
      inspectorPanel.style().set('shown', false)}
    else {
      inspectorPanel.style().set('shown', true)
    };
}});
// Add the button to the map and the panel to root.
//ui.root.insert(0, inspectorPanel);
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Cape Peninsula postfire recovery monitor',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click on a location to view the NDVI time-series for the last six months')
]);
inspectorPanel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
inspectorPanel.add(ui.Panel());
// Add placeholders for the chart and legend.
inspectorPanel.add(ui.Label('[Chart]'));
inspectorPanel.add(ui.Label('[Legend]'));
inspectorPanel.setLayout(ui.Panel.Layout.flow('vertical'),
    {width: '230px', position: 'bottom-left'})
//ui.root.add(inspectorPanel);
/*
 * Chart setup
 */
// Generates a new time series chart of ndvi for the given coordinates.
var generateChart = function (coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2));
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  //var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  //leftMap.layers().set(2, dot);
  //rightMap.layers().set(2, dot);
  // Make a chart from the time series.
  var ndviChart = ui.Chart.image.series(ndvi_percent, point, ee.Reducer.mean(), 250);
  // Customize the chart.
  ndviChart.setOptions({
    vAxis: {title: 'ndvi',
      viewWindow: {
          min: 0,
          max: 1
        }
    },
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
    series: {
      0: {
        color: 'green',
        lineWidth: 2,
      },
      1: {
        color: 'red',
        lineWidth: 1,
      },
      2: {
        color: 'red',
        lineWidth: 1,
      },
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(2, ndviChart);
};
/*
 * Legend setup
 */
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
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Proportion of anomalous observations (last 6 months)',
  style: {fontWeight: 'bold',fontSize: '13px'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(3, legendPanel);
//////////
// slider panel
//////////
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
leftMap.add(button)
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
//rightMap.add(button)
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label({
    value: 'Select an S2 image',
    style: {fontSize: '13px'}
  });
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position,border :'2px solid black'}});
  mapToChange.add(controlPanel);
}
/*
 * Tie everything together
 */
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
//var linker = ui.Map.Linker([leftMap, rightMap]);
///////
/*
* Map setup
 */
// Register a callback on the default map to be invoked when the map is clicked.
leftMap.onClick(generateChart);
rightMap.onClick(generateChart);
// Configure the map.
leftMap.style().set('cursor', 'crosshair');
rightMap.style().set('cursor', 'crosshair');
// Initialize with a test point.
var initialPoint = poi;
leftMap.centerObject(initialPoint, 10);
//////
// layer selector2
//////
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector2(defaultValue, position) {
  var label = ui.Label({
    value: 'Anomaly to visualize',
    style: {fontSize: '13px'}
  });
  var label2 = ui.Label({
    value: 'Basemap',
    style: {fontSize: '13px'}
  });
  var label3 = ui.Label({
    value: 'Anomaly transparency',
    style: {fontSize: '13px'}
  });
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
   leftMap.layers().set(1, ui.Map.Layer(danom[selection],vis))
   rightMap.layers().set(1, ui.Map.Layer(danom[selection],vis))
  }
  // This function changes the basemap. 
  function updateBase(selection) { 
    leftMap.setOptions({mapTypeId: selection}) 
    rightMap.setOptions({mapTypeId: selection}) 
  } 
  //opacity silder for anom
  var slider = ui.Slider({style: {width: '200px'}});
  slider.setValue(0);  // Set a default value.
  slider.onChange(function(value) {
    leftMap.layers().get(1).setOpacity(1-value);
    rightMap.layers().get(1).setOpacity(1-value);
  })
//background selector dropdown
  var select2 = ui.Select({items: ["ROADMAP", "SATELLITE", "HYBRID","TERRAIN"], onChange: updateBase}); 
  select2.setValue("ROADMAP", true);
  var select = ui.Select({items: Object.keys(danom), onChange: updateMap});
  select.setValue(Object.keys(danom)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select, label2, select2, label3, slider], 
                style: {position: position}});
  inspectorPanel.add(controlPanel);
}
// Create the overlay map, and have it display layer 1.
var anomSelector = addLayerSelector2(1, 'top-right');
/*
 * Initialize the app
 */
ui.root.clear();
var linker = ui.Map.Linker([leftMap, rightMap]);
//mapPanel.add(inspectorPanel);
ui.root.add(inspectorPanel);
ui.root.add(splitPanel);
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});