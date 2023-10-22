var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "LST_Day_1km"
        ],
        "min": 30.172851273892963,
        "max": 37.90551771006453,
        "palette": [
          "0933ff",
          "4e8cff",
          "7ff3ff",
          "e5ffa6",
          "fff4a6",
          "ffad67",
          "ff2d0b",
          "c22fff",
          "ff13f7"
        ]
      }
    }) || {"opacity":1,"bands":["LST_Day_1km"],"min":30.172851273892963,"max":37.90551771006453,"palette":["0933ff","4e8cff","7ff3ff","e5ffa6","fff4a6","ffad67","ff2d0b","c22fff","ff13f7"]},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "precipitation"
        ],
        "min": 46.5074859971365,
        "max": 57.90924429405668,
        "palette": [
          "ff2805",
          "ffb546",
          "ecff54",
          "8aff6d",
          "aaffdf",
          "73e5ff",
          "0b29ff"
        ]
      }
    }) || {"opacity":1,"bands":["precipitation"],"min":46.5074859971365,"max":57.90924429405668,"palette":["ff2805","ffb546","ecff54","8aff6d","aaffdf","73e5ff","0b29ff"]},
    ROI = ui.import && ui.import("ROI", "table", {
      "id": "users/jespavon/nogal"
    }) || ee.FeatureCollection("users/jespavon/nogal");
/*
 * Map layer configuration
 */
var start_date1 = ee.Date.fromYMD(2019,5,1);
var end_date1 = Date.now();
var chirps = ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD');
var precip = chirps.filterDate(ee.Date(start_date1),ee.Date(end_date1))
  .sort('system:time_start', false)
  .filterBounds(ROI);
var vis = {min: 0, max: 60, palette: 'navy,blue,aqua'};
var composite = precip.max().visualize(imageVisParam2);
var composite_clip = composite.clip(ROI)
var compositeLayer = ui.Map.Layer(composite_clip).setName('PREC')
                                            //.clip(ROI);
// Create the main map and set the SST layer.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(compositeLayer, '2020 Composite');
// PRECIP
//---------------------MONTHS-----------------------------------------------------
//calculating monthly precipitation for the region
//Monthly
//var chirps = ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD');
//                  
//var precip = chirps.filterDate('2017-12-31', '2018-12-31')
//  .sort('system:time_start', false)
//  .filterBounds(ROI);
//calculating monthly precipitation for the region
var years = ee.List.sequence(2019, 2020);
var months = ee.List.sequence(2, 12);
var monthlyPrecip =  ee.ImageCollection.fromImages(
  years.map(function (y) {
    return months.map(function(m) {
    // var n=m+1;
     //print(m)
      var w = precip.filter(ee.Filter.calendarRange(y, y, 'year'))
                    .filter(ee.Filter.calendarRange(m, m, 'month'))
                    .sum();
      return w.set('year', y)
              .set('month', m)
              .set('system:time_start', ee.Date.fromYMD(y, m, 1));
    });
  }).flatten()
);
//var monthlyMean = monthlyPrecip.mean().clip(roi);
/*
print(ui.Chart.image.series(monthlyPrecip , ROI, ee.Reducer.mean(), 2500)
.setOptions({
  title: "Precipitation mean by month of the year ",
  hAxis: {title: 'Time'},
  vAxis: {title: 'Precipitation (mm)'},
  colors: ['#EF851C'],
  pointSize: 3,
  trendlines: { 
    0: { 
      type: 'linear', 
      visibleInLegend: true,
      color: 'black',
      opacity: 1,
      lineWidth: 2,
      pointSize: 0
    } 
  }  
}));
*/
/*
 * Panel setup
 */
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Precipitation',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a location to see its time series from your fields.')
]);
inspectorPanel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
inspectorPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Add placeholders for the chart and legend.
inspectorPanel.add(ui.Label('[Chart]'));
//inspectorPanel.add(ui.Label('[Legend]'));
/*
 * Chart setup
 */
// Generates a new time series chart of LST for the given coordinates.
var generateChart = function (coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2));
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(1, dot);
  // Make a chart from the time series.
  //var sstChart = ui.Chart.image.series(modisLST, point, ee.Reducer.mean(), 500);
  var precChart = ui.Chart.image.series(monthlyPrecip , point, ee.Reducer.mean(), 500);
  // Customize the chart.
  /*
  sstChart.setOptions({
    title: 'Land surface temp: time series',
    vAxis: {title: 'Temp (C)'},
    hAxis: {title:  'Time', format: 'MM-yy', gridlines: {count: 7}},
    series: {
      0: {
        color: 'blue',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 3,
      },
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(2, sstChart);
*/
// the Second panel
 // Customize the chart.
  precChart.setOptions({
    title: 'Precip: time series',
    vAxis: {title:  'Precipitation (mm)'},
    hAxis: {title: 'Time'},
    colors: ['#EF851C'],
    pointSize: 3,
    trendlines: { 
    0: { 
      type: 'linear', 
      visibleInLegend: true,
      color: 'black',
      opacity: 1,
      lineWidth: 2,
      pointSize: 0
    }
  }})
  inspectorPanel.widgets().set(2, precChart)
};
  // Add the chart at a fixed position, so that new charts overwrite older ones.
//  inspectorPanel.widgets().set(3, precChart);
//};
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
    palette:palette ,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(imageVisParam2.palette),
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
  value: 'Max Precipitation (mm) 2019/03/01-2019/07/12 ',
  style: {fontWeight: 'bold'}
});
//var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
//inspectorPanel.widgets().set(3, legendPanel);
/*
 * Map setup
 */
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(-5.72, 39.95);
mapPanel.centerObject(ROI, 13);
/*
 * Initialize the app
 */
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});