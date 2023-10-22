var countriesLayer = ui.import && ui.import("countriesLayer", "fusionTable", {
      "docId": "1tdSwUL7MVpOauSgRzqVTOwdfy17KDbw-1d9omPw"
    }) || ee.FeatureCollection("ft:1tdSwUL7MVpOauSgRzqVTOwdfy17KDbw-1d9omPw"),
    visParam = ui.import && ui.import("visParam", "imageVisParam", {
      "params": {
        "min": 0,
        "max": 100,
        "palette": "c10000,d742f4,001556,b7d2f7"
      }
    }) || {"min":0,"max":100,"palette":"c10000,d742f4,001556,b7d2f7"},
    point = ui.import && ui.import("point", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            77.15351562499995,
            25.828457131676924
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([77.15351562499995, 25.828457131676924]),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                94.40633008978045,
                16.890655362966296
              ],
              [
                94.12066400024901,
                16.047713609460867
              ],
              [
                95.35127742211762,
                15.646067229928567
              ],
              [
                96.84559187939851,
                16.785499014578043
              ],
              [
                96.46268737957655,
                17.78116551099831
              ],
              [
                95.60958778359918,
                17.782307425048568
              ],
              [
                95.01940846452476,
                20.82041856596498
              ],
              [
                95.72121567115539,
                21.520847117266477
              ],
              [
                96.53375897475621,
                21.626207590877293
              ],
              [
                96.43906090128758,
                22.920715814067115
              ],
              [
                97.6587658611868,
                24.169778799231775
              ],
              [
                97.57384393462974,
                25.528408182376953
              ],
              [
                97.23834706754184,
                25.61318473669738
              ],
              [
                97.01300467933066,
                26.225540967675283
              ],
              [
                96.51636088913187,
                26.656408892989035
              ],
              [
                96.12763346351244,
                26.798571643241853
              ],
              [
                95.87719808791076,
                26.449390375808505
              ],
              [
                95.44771583029211,
                25.92250749839501
              ],
              [
                94.90611303911305,
                25.31247067722472
              ],
              [
                94.13698233148818,
                23.31987430716433
              ],
              [
                94.90072542541611,
                21.802932396900736
              ],
              [
                94.290255985989,
                21.58866574355644
              ],
              [
                94.66520316696528,
                20.198765820967527
              ],
              [
                94.9037335500658,
                17.23453107711223
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[94.40633008978045, 16.890655362966296],
          [94.12066400024901, 16.047713609460867],
          [95.35127742211762, 15.646067229928567],
          [96.84559187939851, 16.785499014578043],
          [96.46268737957655, 17.78116551099831],
          [95.60958778359918, 17.782307425048568],
          [95.01940846452476, 20.82041856596498],
          [95.72121567115539, 21.520847117266477],
          [96.53375897475621, 21.626207590877293],
          [96.43906090128758, 22.920715814067115],
          [97.6587658611868, 24.169778799231775],
          [97.57384393462974, 25.528408182376953],
          [97.23834706754184, 25.61318473669738],
          [97.01300467933066, 26.225540967675283],
          [96.51636088913187, 26.656408892989035],
          [96.12763346351244, 26.798571643241853],
          [95.87719808791076, 26.449390375808505],
          [95.44771583029211, 25.92250749839501],
          [94.90611303911305, 25.31247067722472],
          [94.13698233148818, 23.31987430716433],
          [94.90072542541611, 21.802932396900736],
          [94.290255985989, 21.58866574355644],
          [94.66520316696528, 20.198765820967527],
          [94.9037335500658, 17.23453107711223]]]),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                90.93715063451508,
                29.259249953481156
              ],
              [
                90.93715063451508,
                6.873715405139031
              ],
              [
                103.11000219701508,
                6.873715405139031
              ],
              [
                103.11000219701508,
                29.259249953481156
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[90.93715063451508, 29.259249953481156],
          [90.93715063451508, 6.873715405139031],
          [103.11000219701508, 6.873715405139031],
          [103.11000219701508, 29.259249953481156]]], null, false),
    geometry3 = ui.import && ui.import("geometry3", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                93.88148657201508,
                15.994779484629834
              ],
              [
                98.40785375951508,
                9.093061154528558
              ],
              [
                100.91273657201508,
                11.212534366558593
              ],
              [
                98.36390844701508,
                18.17891281285857
              ],
              [
                101.79164282201508,
                21.362722639778465
              ],
              [
                99.94593969701508,
                22.949967201870013
              ],
              [
                99.41859594701508,
                27.79211512047266
              ],
              [
                96.69398657201508,
                28.798154859806033
              ],
              [
                91.72816625951508,
                21.40364288208448
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #0b4a8b */ee.Geometry.Polygon(
        [[[93.88148657201508, 15.994779484629834],
          [98.40785375951508, 9.093061154528558],
          [100.91273657201508, 11.212534366558593],
          [98.36390844701508, 18.17891281285857],
          [101.79164282201508, 21.362722639778465],
          [99.94593969701508, 22.949967201870013],
          [99.41859594701508, 27.79211512047266],
          [96.69398657201508, 28.798154859806033],
          [91.72816625951508, 21.40364288208448]]]),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 0.81,
        "bands": [
          "vis-red",
          "vis-green",
          "vis-blue"
        ],
        "gamma": 1
      }
    }) || {"opacity":0.81,"bands":["vis-red","vis-green","vis-blue"],"gamma":1};
// A simple tool for charting MODIS ocean surface temperature.
/*
 * Map layer configuration
 */
// Compute the mean sea surface temperature (SST) value for each pixel by
// averaging MODIS Aqua data for one year.
var modisOceanColor = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_CO').filterBounds(geometry3);
var sst =
    modisOceanColor.select(['CO_column_number_density']).filterDate('2019-06-01', '2020-04-30');
var vis = {
  min: 0,
  max: 0.10,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};
var composite = sst.mean().visualize(vis);
var compositeLayer = ui.Map.Layer(composite).setName('SST Composite');
// Create the main map and set the SST layer.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(compositeLayer, '2017 Composite');
/*
 * Panel setup
 */
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Carbon Monoxide - Time Series Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a location to see its time series of Carbon Monoxide.')
]);
inspectorPanel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
inspectorPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Add placeholders for the chart and legend.
inspectorPanel.add(ui.Label('[Chart]'));
inspectorPanel.add(ui.Label('[Legend]'));
/*
 * Chart setup
 */
// Generates a new time series chart of SST for the given coordinates.
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
  var sstChart = ui.Chart.image.series(sst, point, ee.Reducer.mean(), 500);
  // Customize the chart.
  sstChart.setOptions({
    title: 'Carbon Monoxide: time series',
    vAxis: {title: 'CO column density'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
    series: {
      0: {
        color: 'blue',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(2, sstChart);
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
  value: 'Map Legend: Carbon Monoxide Density',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(3, legendPanel);
/*
 * Map setup
 */
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(96.16, 16.85);
mapPanel.centerObject(initialPoint, 3);
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