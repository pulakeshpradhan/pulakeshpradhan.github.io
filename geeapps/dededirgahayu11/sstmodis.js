// A simple tool for charting MODIS ocean surface temperature.
// Modified by : Dr Ir Dede Dirgahayu ; Pusfatja; LAPAN; Indonesia
/*
 * Map layer configuration
 */
var Bts_Indonesia = ee.Geometry.Rectangle(92,8,142,-11);
// Compute the mean sea surface temperature (SST) value for each pixel by
// averaging MODIS Aqua data for one year.
var modisOceanColor = ee.ImageCollection('NASA/OCEANDATA/MODIS-Aqua/L3SMI');
var sst =
    modisOceanColor.select(['sst']).filterDate('2020-01-01', '2020-11-30')
    .filterBounds(Bts_Indonesia);
print('Data SSt : ',sst);
var vis = {min: 25, max: 33, palette: 'blue,aqua,yellow,red'};
var composite = sst.mean().visualize(vis);
var compositeLayer = ui.Map.Layer(composite).setName('SST Composite 2020');
// Create the main map and set the SST layer.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(compositeLayer, '2020 Composite');
/*
 * Panel setup
 */
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'MODIS SST - Time Series Inspector (Created by Dr Dede Dirgahayu)',
    style: {color : 'red',fontSize: '18px',margin:'center', fontWeight: 'bold'}
  }),
  ui.Label('Click a location to see its time series of ocean temperatures.')
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
  lon.setValue('Lon: ' + coords.lon.toFixed(6));
  lat.setValue('Lat: ' + coords.lat.toFixed(6));
  // Add a dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'black'}, 'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(1, dot);
  // Make a chart from the time series.
  var Buf3km = point.buffer(1500);
  var sstChart = ui.Chart.image.series(sst, Buf3km, ee.Reducer.mean(), 500);
  // Customize the chart.
  sstChart.setOptions({
    title: 'Sea surface temp: time series',
    vAxis: {title: 'Temp (C)'},
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
        ((vis.min + vis.max) / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Map Legend: mean 2020 ocean temp (C)',
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
var initialPoint = (Bts_Indonesia.centroid());
mapPanel.centerObject(initialPoint, 5);
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
function Jum_Dat(ArrObj,Opsi) {
  if (Opsi == 'Arr') return ee.List(ArrObj).length().getInfo();
  else return ArrObj.size().getInfo();
}