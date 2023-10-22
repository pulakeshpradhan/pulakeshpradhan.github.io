var imageVisParam = {"opacity":1,"bands":["LST_Day_1km"],"min":30.172851273892963,"max":37.90551771006453,"palette":["0933ff","4e8cff","7ff3ff","e5ffa6","fff4a6","ffad67","ff2d0b","c22fff","ff13f7"]},
    ROI = ee.FeatureCollection("users/jespavon/Par_merged_barba"),
    imageVisParam2 = {"opacity":1,"bands":["ET"],"min":27.496115435468496,"max":168.57350481769606,"palette":["1224ff","5aabff","3eff3b","fffa5c","ff3f06"]};
// A simple tool for charting TOMATE IN EXTREMADURA
 Map.addLayer(ROI, {color: 'FF0000'}, 'Polygons')
 //Map.centerObject(ROI,17);
/*
 * Map layer configuration
 */
var ETDef = ee.List([]);
var TerraNetET = ee.ImageCollection("MODIS/006/MOD16A2");
var NLCD = ee.ImageCollection("USGS/NLCD");
var generateETLandcoverDatasetSeries = function() {
  var LCImage = ee.Image(NLCD.toList(5).get(1)).select('landcover');
  var MODIS_ET1 = TerraNetET.filterDate(ee.Date('2001-01-01'), ee.Date('2019-12-31'))
                            .map(function(image) {
    var ETSum = image.select('ET');
    var LESum = image.select('LE');
    var AET = ETSum.divide(LESum);
    var ET_Image = ee.Image(image)         
                     .addBands(AET.select(['ET'],['K']))
                     .addBands(LCImage);
    return ET_Image;
    });
  LCImage = ee.Image(NLCD.toList(5).get(2)).select('landcover');
  var MODIS_ET2 = TerraNetET.filterDate(ee.Date('2005-01-01'), ee.Date('2019-12-31'))
                            .map(function(image) {
    var ETSum = image.select('ET');
    var LESum = image.select('LE');
    var AET = ETSum.divide(LESum);
    var ET_Image = ee.Image(image)         
                     .addBands(AET.select(['ET'],['K']))
                     .addBands(LCImage);
    return ET_Image;
    });
  var runningCollecton = ee.ImageCollection(MODIS_ET1).merge(MODIS_ET2);
  LCImage = ee.Image(NLCD.toList(5).get(2)).select('landcover');
  //var MODIS_ET3 = TerraNetET.filterDate(ee.Date('2010-01-01'), ee.Date('2018-12-31'))  // Turn this on in ~ 1/25/2019
  var MODIS_ET3 = TerraNetET.filterDate(ee.Date('2010-01-01'), ee.Date('2019-12-31'))
                            .map(function(image) {
    var ETSum = image.select('ET');
    var LESum = image.select('LE');
    var AET = ETSum.divide(LESum);
    var ET_Image = ee.Image(image)         
                     .addBands(AET.select(['ET'],['K']))
                     .addBands(LCImage);
    return ET_Image;
    });
  var finalCollecton = ee.ImageCollection(runningCollecton).merge(MODIS_ET3);
  return finalCollecton;
};
var ET_LC_Dataset = generateETLandcoverDatasetSeries();
print(ET_LC_Dataset)
var ETC = ET_LC_Dataset
                    .filterDate('2019-05-15', '2019-11-09')
                    .select('ET');
print(ETC)
/*
function getImageByIndex(ETC, index) {
  return ee.Image(ETC.toList(1, index).get(0))
}
var before = getImageByIndex(ETC,1);
var before = before.clip(ROI)
Map.addLayer(before)
*/
var vis = {min: 0, max: 60, palette: 'navy,blue,aqua'};
var composite = ETC.mean().visualize(imageVisParam2);
var composite_clip = composite.clip(ROI)
var compositeLayer = ui.Map.Layer(composite_clip).setName('EVAPO Composite')
                                            //.clip(ROI);
// Create the main map and set the SST layer.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(compositeLayer, '2018 Composite');
/// Panel setup
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Evapotranspiracion',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click para conocer Evapotranspiración en tus campos')
]);
inspectorPanel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
inspectorPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Add placeholders for the chart and legend.
inspectorPanel.add(ui.Label('[Chart]'));
inspectorPanel.add(ui.Label('[Legend]'));
///Chart setup
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
  var sstChart = ui.Chart.image.series(ETC, point, ee.Reducer.mean(), 500);
  // Customize the chart.
  sstChart.setOptions({
    title: 'Evapotranspiración Series Temporales',
    vAxis: {title: 'mm', maxValue: 50, minValue: 20},
    hAxis: {title: 'Fecha', format: 'MM-yy', gridlines: {count: 7}},
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
//Legend setup
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
  params: makeColorBarParams(imageVisParam.palette),
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
  value: 'Media 2019/05/01-2019/10/30 Evapotranspiración (mm)',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(3, legendPanel);
//Map setup
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Initialize with a test point.
var initialPoint = ee.Geometry.Point(-5.91, 36.82);
mapPanel.centerObject(initialPoint, 13);
//Initialize the app
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});