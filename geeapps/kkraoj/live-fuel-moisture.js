/*
 * Configure layers and locations
 */
 //////////////
var mapPanel = ui.Map();
var palette_for_colorbar = ['#703103','#945629','#ce7e45', '#df923d', '#f1b555', '#fcd163', '#99b718', 
          '#74a901', '#66a000', '#529400', '#3e8601', '#207401', '#056201',
          '#004c00', '#023b01', '#012e01', '#011d01', '#011301'];
var palette_lfmc = ['#703103','#945629','#ce7e45', '#df923d', '#f1b555', '#fcd163', '#99b718', 
          '#74a901', '#66a000', '#529400', '#3e8601', '#207401', '#056201',
          '#004c00', '#023b01', '#012e01'
          , '#011d01', '#011301'];
var colorbar_thumbnail = require('users/kkraoj/ee:fmc_from_sar/make_colorbar');
var colorbar_thumbnail = colorbar_thumbnail.make_colorbar(palette_for_colorbar)
var lfmc_col = ee.ImageCollection('users/kkraoj/lfm-mapper/lfmc_col_25_may_2021');
var lfmc_col = lfmc_col.map(function(image){
  return image.selfMask()
})
var lfmc_col = lfmc_col.select(['b1'], ['LFMC'])
  // [ ee.Image('users/kkraoj/lfmc_map_2016-01-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-01-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-02-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-03-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-04-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-05-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-06-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-07-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-08-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-09-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-10-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-11-01'),
  //   ee.Image('users/kkraoj/lfmc_map_2019-12-01'),
  // ]);
// var lfmc = ee.Image('users/kkraoj/lfmc_map_2019-01-01');
var layerProperties = {
  'Live Fuel Moisture Content': {
    name: 0,
    visParams: {min: 50, max: 200, palette: palette_lfmc},
    legend: false,
    defaultVisibility: true
  }
};
/*
 * Map panel configuration
 */
// Now let's do some overall layout.
// Create a map panel.
var styleDict = require('users/kkraoj/ee:fmc_from_sar/style_map');
styleDict.stylemap(mapPanel);
// Take all tools off the map except the zoom and mapTypeControl tools.
mapPanel.setControlVisibility(
    {all: true, zoomControl: true, mapTypeControl: true});
// Center the map
var defaultLocation = {lon:-113.03, lat:38, zoom:6};
mapPanel.setCenter(
    defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
// Add these to the interface.
ui.root.widgets().reset([mapPanel]);
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
var toolPanel = ui.Panel(thumb, 'flow', {width: '500px'});
ui.root.widgets().add(toolPanel);
toolPanel.add(ui.Label(
    'Due to failure of the Sentinel-1B satellite, maps are not available since Dec 2021',
    {fontSize: '13px', color:"#8B0000"}, "https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-1/Mission_ends_for_Copernicus_Sentinel-1B_satellite"))
toolPanel.add(ui.Label(
    'View live fuel moisture content (LFMC) maps for western USA from 2016 onwards, every 15 days. LFMC = vegetation water relative to dry biomass. It is a % quantity. Here, it is estimated using deep learning with microwave backscatter and optical reflectance as inputs. Higher the LFMC, wetter the vegetation, lesser the risk of wildfire, and vice-versa.',
    {fontSize: '13px'}))
toolPanel.add(ui.Label(
    'Use slider on the map to scroll through time. Click anywhere on map to view time series of that location at the bottom right corner. ',
    {fontSize: '13px', fontWeight:'bold'}))  
// Create a hyperlink to an external reference.
var link = ui.Label(
    'Remote Sensing of Environment paper by Rao et al., 2020 [open access]', {},
    'https://www.sciencedirect.com/science/article/pii/S003442572030167X');
var linkPanel = ui.Panel(
    [ui.Label('For more information about algorithm, visit:'), link]);
toolPanel.add(linkPanel);
var link = ui.Label(
    'Github Repository', {},
    'https://github.com/kkraoj/vwc_from_radar');
var linkPanel = ui.Panel(
    [ui.Label('To download maps visit:'), link], ui.Panel.Layout.flow('horizontal'));
toolPanel.add(linkPanel);
toolPanel.add(ui.Label('___________________________________________________________________________'));
// Create a layer selector pulldown.
// The elements of the pulldown are the keys of the layerProperties dictionary.
var selectItems = Object.keys(layerProperties);
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {position: 'bottom-left',fontWeight: 'bold', fontSize: '16px', margin: '0 0 0 8px', padding: '10'}
});
mapPanel.add(legendPanel);
var legendTitle = ui.Label(
    'LFMC',
    {fontWeight: 'bold', fontSize: '16px', margin: '0 0 4px 0', padding: '10'});
legendPanel.add(legendTitle);
// Define an area for the legend key itself.
// This area will be replaced every time the layer pulldown is changed.
var keyPanel = ui.Panel();
legendPanel.add(keyPanel);
function setLegend(legend) {
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
      keyPanel.add(colorbar_thumbnail, ui.Panel.Layout.Flow('horizontal'));
        // print(colorbar_thumbnail)
    }
}
// Create a visibility checkbox and an opacity slider.
//
// Create an opacity slider. This tool will change the opacity for each layer.
// That way switching to a new layer will maintain the chosen opacity.
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 0.9,
  step: 0.01,
});
// print(opacitySlider.getValue())
opacitySlider.onSlide(function(value) {
  mapPanel.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
var text = ui.Label(
    'Layer Opacity',  
    {fontSize: '14px'});
var viewPanel =
    ui.Panel([text, opacitySlider], ui.Panel.Layout.Flow('horizontal'));
// toolPanel.add(ui.Label('__________________________________________'));
// Use a DateSlider
// Use the start of the collection and now to bound the slider.
var start = ee.Date('2016-04-01');
var end = ee.Date('2021-12-22').format();
// var end = ee.Date(Date.now()).advance(-15, "day").format();
// var default_date = ee.Date(Date.now()).advance(-1, "month").millis().getInfo();
var default_date = end.getInfo();
// Run this function on a change of the dateSlider.
var showLayer = function(range) {
  var lfmc = lfmc_col.filterDate(range.start(), range.end()).first();
  // Asynchronously compute the name of the composite.  Display it.
  // range.start().evaluate(function(name) {
      var visParams = {min:50, max: 200,palette:palette_lfmc};
      var lfmc_layer = ui.Map.Layer(lfmc, visParams, 'Live Fuel Moisture Content');
      lfmc_layer.setOpacity(opacitySlider.getValue());
      mapPanel.layers().set(0, lfmc_layer);
  };
// Asynchronously compute the date ange and show the slider.
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 17,
    onChange: showLayer,
    style: {position:'bottom-center',width:'800px'}
  });
  mapPanel.add(dateSlider.setValue(default_date));
});
toolPanel.add(viewPanel);
// toolPanel.add(ui.Label('__________________________________________'));
// Set the initial legend.
setLegend(layerProperties['Live Fuel Moisture Content'].legend);
///set the initial layer 
// initialize in october 2019
// showLayer(ee.DateRange('2019-10-01', '2019-11-02'));
////////clicking features
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
var chartPanel = ui.Panel();
// Generates a new time series chart of SST for the given coordinates.
var generateChart = function (coords) {
  chartPanel.clear();
  // Update the lon/lat panel with values from the click event.
  lon.setValue('Lon: ' + coords.lon.toFixed(3));
  lat.setValue('Lat: ' + coords.lat.toFixed(3));
  // Add a dot for the point clicked on.
  var point = ee.FeatureCollection(ee.Geometry.Point(coords.lon, coords.lat));
  var dot = ui.Map.Layer(point.draw({color: '00cdcd', strokeWidth: 8, pointRadius:4}),{},'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(1, dot);
  // Make a chart from the time series.
  var sstChart = ui.Chart.image.series(lfmc_col.select(0), point, ee.Reducer.mean(), 500);
  // sstChart.style().set({width: '500px'});
  // Customize the chart.
  sstChart.setOptions({
    // title: 'Live Fuel Moisture Content: time series',
    vAxis: {title: 'LFMC (%)', minValue:0,maxValue:200},
    hAxis: { format: 'MMM-yy',
      gridlines: {count : -1}, 
      minorGridlines:{
        // multiple:40000000
        // units: {format:{months:[1, 2, 3, 6]}}
        minSpacing:40
        }
      },
    series: {
      0: {
        color: 'blue',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
    legend: {position: 'none'},
  });
  chartPanel.add(sstChart)
};
toolPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
toolPanel.add(chartPanel);
mapPanel.onClick(generateChart);
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
generateChart({
  lon: defaultLocation.lon,
  lat: defaultLocation.lat
});
var point = ee.FeatureCollection(ee.Geometry.Point(defaultLocation.lon, defaultLocation.lat));
var dot = ui.Map.Layer(point.draw({color: '00cdcd', strokeWidth: 8, pointRadius:4}),{},'clicked location');
  // Add the dot as the second layer, so it shows up on top of the composite.
mapPanel.layers().set(1, dot);