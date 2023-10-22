var roi = ui.import && ui.import("roi", "table", {
      "id": "users/abdouu2005/boundary2"
    }) || ee.FeatureCollection("users/abdouu2005/boundary2");
// Function to mask cloud from built-in quality band
// information on cloud
var S2cloudMask = function(image) {
var QA60 = image.select(['QA60']);
return image.updateMask(QA60.lt(1));
};
// Function to calculate and add an NDVI band
var addNDVI = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B4']));
};
// get S2 image collection, filter cloudy pixels at 5 and apply the cloud mask
var S2 = ee.ImageCollection('COPERNICUS/S2')//S2_SR
.filterDate('2015-01-01', '2020-10-30')
.filterBounds(roi)
.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',5))
.map(S2cloudMask);
// Add NDVI band to image collection
var S2 = S2.map(addNDVI);
// select the NDVI band 
var ndvi = S2.select(['nd'],['NDVI']);
// color palette for NDVI
var ndvi_pal = ['#d43d51','#dc574a','#e06f45' ,'#e18745' ,'#e09d4b',
                          '#deb256','#dac767' ,'#b8bf62' , '#98b561',
                          '#58a066' ,'#379469','#379469', '#00876c'] ;
var vis = {min:-0.1, max:0.9, palette: ndvi_pal};
// Extract NDVI band and create NDVI median composite for the map vis 
var composite = ndvi.median().clip(roi).visualize(vis);
var compositeLayer = ui.Map.Layer(composite).setName('Median NDVI');
// var visInfra = { gamma: 1.3,min: 0, max: 0.3, bands: ['B8', 'B4', 'B3']};
// var firstIR = S2.median().divide(10000).visualize(visInfra);
// var infredLayer = ui.Map.Layer(firstIR).setName('Color Infrared (B8/B4/B3)');
//***********************************************
//***********************************************
// Create the main map and set the ndvi layer.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(compositeLayer, 'NDVI Composite');
 //************* Panel setup******************************
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '45%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'NDVI S2 - Time Series Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a location to see its NDVI time series')
]);
inspectorPanel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
inspectorPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Add placeholders for the chart and legend.
inspectorPanel.add(ui.Label('[Chart]'));
inspectorPanel.add(ui.Label('[Legend]'));
// **************** Chart setup************************************
// Generates a new time series chart of ndvi for the given coordinates.
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
  var ndviChart = ui.Chart.image.series(ndvi, point, ee.Reducer.mean(), 10);
  // Customize the chart.
  ndviChart.setOptions({
    title: 'NDVI: time series (cloud filter set at 5%)',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
    series: {
      0: {
        color: 'green',
        lineWidth: 1,
        pointsVisible: true,
        pointSize: 2.5,
      },
    },
    legend: {position: 'right'},
  });
  // Add the chart at a fixed position, so that new charts overwrite older ones.
  inspectorPanel.widgets().set(2, ndviChart);
};
 ////******************Legend setup****************************
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
  value: 'NDVI',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(3, legendPanel);
 //*************** Map setup***********************************
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(-74.18, 10.80);
mapPanel.centerObject(initialPoint, 12);
 //***************** Initialize the app
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});