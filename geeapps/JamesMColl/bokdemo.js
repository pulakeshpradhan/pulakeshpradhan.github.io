//
// Tutorial: Global snow/ice cover change analysis using LinearFit
//
// Creating constants for 
var inList = ee.List.sequence(0,100,1).cat([225,237,239]);                   // Create a list with values 0-100,225,237,239
var outList = ee.List.repeat(0,10).cat(ee.List.repeat(1,91)).cat([0,0,0]);   // Create a list with values of 0 for no snow and 1 for snow
// A function to reclassify MODIS snow cover products (MOD10A1/A2) values
// snow/ice--1; no snow/ice--0; all others--null
var Reclassify = function(anImage) {
  var ClassifiedImage = anImage.remap(inList,    // Original pixel values from MODIS Snow Products
                                      outList,   // Reclassified values: 1--snow/ice; 0--no snow/ice
                                      null,                  // All other MODIS snow product pixel values (0, 1, 11, 50, 254, 255)
                                      'NDSI_Snow_Cover');    // The band we wish to remap
  return ClassifiedImage;
};
// A function to merge the bands together after a join
// the bands are referred to as the 'primary' and 'secondary' properties
var MergeBands = function(aRow) {
  var anImage = ee.Image.cat(aRow.get('primary'), aRow.get('secondary'));
  return anImage;
};
// A function to assign high sensor zenith angle cells to null
var CorrectSensorPixels = function(anImage) {
  var LT25 = anImage.select('SensorZenith').lte(2500); // Angle is stored as angle * 100 in MOD09
  return anImage.mask(LT25);
};
// Prepare MODIS snow cover data for calculating snow cover frequency
// Join MOD09 and MOD10, mask out cells with gte 25 sensor-zenith-angle, and reclassify to: 1, 0, null
var PrepareModisSnowCover = function(StartDate, EndDate) {
  // Create MOD09GA and MOD10A1 image collections for the time period
  var MOD09GA = ee.ImageCollection('MODIS/006/MOD09GA')
                  .select('SensorZenith')
                  .filterDate(StartDate, EndDate);
  var MOD10A1 = ee.ImageCollection('MODIS/006/MOD10A1')
                  .select('NDSI_Snow_Cover')
                  .filterDate(StartDate, EndDate);
  // Define the join type and filter
  var innerJoin = ee.Join.inner();
  var joinFilter = ee.Filter.equals({
                                    'leftField': 'system:time_start', 
                                    'rightField': 'system:time_start'
                                    });
  // Join the two collections, passing entries through the filter
  var joinedMods = ee.ImageCollection(innerJoin.apply(MOD09GA, MOD10A1, joinFilter));
  // Map our functions over the Image Collections 
  var FinalModisDataset = joinedMods.map(MergeBands)
                                    .map(CorrectSensorPixels)
                                    .map(Reclassify);
  return FinalModisDataset;
};
// A function that generates a list of SCF images in yearly intervals
var GenerateSnowCoverFrequency = function(StartDate, EndDate, TotalSteps) {                
  var SCF_List = ee.List([]);
  for(var i = 1; i <= TotalSteps; i++) {
    var MODISSnowCover = PrepareModisSnowCover(StartDate, EndDate);
    var NumOfSnowDays =  MODISSnowCover.sum();                                                                        // Calculate the number of days with snow cover with .sum()
    var NumOfValidObsDays = MODISSnowCover.count();                                                                   // Count the number of days with a valid observation with .count()
    var SnowCoverFrequency = NumOfSnowDays.toFloat().divide(NumOfValidObsDays);                                       // perform the SCF calculation
    var SCF_Image = ee.Image(ee.Number.parse(EndDate.format('YYYY')))                                                 // Attach a date band (timestamp) used for trend analysis
                      .addBands(SnowCoverFrequency.select(['remapped'], ['Snow Cover Frequency'])).toDouble()
                      .copyProperties(ee.Image(MODISSnowCover.first()),['system:time_start']);                        // We need a System:time_start for our chart
    SCF_List = SCF_List.add(SCF_Image);
    StartDate = ee.Date(StartDate).advance(1, 'year');
    EndDate = ee.Date(EndDate).advance(1, 'year');
  }
  return ee.ImageCollection(SCF_List);
};
var SCFYearCollection = GenerateSnowCoverFrequency(ee.Date('2000-10-01'), ee.Date('2001-10-01'), 18);
var LinearFit = SCFYearCollection.reduce(ee.Reducer.linearFit());
// design a color ramp
var BlueToBrown = ['964B00', 'A15F1C', 'AD7338', 'B98755', 'C49B71', 'D0AF8D', 'DCC3AA', 'E7D7C6', 'F3EBE2', 'FFFFFF', 'E7F1FA', 'CFE4F6', 'B7D7F2', '9FCAED', '88BDE9', '70B0E5', '58A3E0', '4096DC', '2989D8'];
var WhiteToBlack = ["#000000", "#050505", "#0A0A0A", "#0F0F0F", "#141414", "#1A1A1A", "#1F1F1F", "#242424", "#292929", "#2E2E2E", "#343434", "#393939", "#3E3E3E", "#434343", "#484848", "#4E4E4E", "#535353", "#585858", "#5D5D5D", "#626262", "#686868", "#6D6D6D", "#727272", "#777777", "#7C7C7C", "#828282", "#878787", "#8C8C8C", "#919191", "#969696", "#9C9C9C", "#A1A1A1", "#A6A6A6", "#ABABAB", "#B0B0B0", "#B6B6B6", "#BBBBBB", "#C0C0C0", "#C5C5C5", "#CACACA", "#D0D0D0", "#D5D5D5", "#DADADA", "#DFDFDF", "#E4E4E4", "#EAEAEA", "#EFEFEF", "#F4F4F4", "#F9F9F9", "#FFFFFF"];
// Mask out low snow areas
var LinearFitSlopeImage = LinearFit.select(['scale']).mask((SCFYearCollection.select(['Snow Cover Frequency']).min()).gte(0.04));
// Add the image to the Map
var imageToExport = LinearFitSlopeImage.visualize({'min':-0.03, 'max':0.03, 'palette':BlueToBrown, 'forceRgbOutput':true});
//
// Modified from the "Ocean Timeseries Investigator" example
//
// Compute the mean sea surface temperature (SST) value for each pixel by
// averaging MODIS Aqua data for one year.
var modisSCF = ee.ImageCollection(SCFYearCollection);
var scf = modisSCF.select(['Snow Cover Frequency']);
var vis = {min:-0.03, max: 0.03, palette: BlueToBrown};
var composite = LinearFit.select(['scale']).mask((SCFYearCollection.select(['Snow Cover Frequency']).min()).gte(0.04)).visualize(vis);
var compositeLayer = ui.Map.Layer(composite).setName('linear Fit Slope');
// Create the main map and set the SST layer.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(compositeLayer, 'linear Fit Slope');
/*
 * Panel setup
 */
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'MODIS Snow Cover GIS&T Tutorial - Time Series Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a location to see its time series of Snow Cover Frequency.')
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
  var scfChart = ui.Chart.image.series(scf, point, ee.Reducer.mean(), 500);
  // Customize the chart.
  scfChart.setOptions({
    title: 'Snow Cover Frequency Time Series',
    vAxis: {title: 'Frequency'},
    hAxis: {title: 'Date', format: 'yyyy', gridlines: {count: 7}},
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
  inspectorPanel.widgets().set(2, scfChart);
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
  value: 'Map Legend: Linear Slope of Snow Cover Frequency',
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
var initialPoint = ee.Geometry.Point(-119.486, 38.208);
mapPanel.centerObject(initialPoint, 9);
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