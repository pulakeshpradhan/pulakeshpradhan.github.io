var imageCollection = ee.ImageCollection("MODIS/006/MOD11A1"),
    imageCollection2 = ee.ImageCollection("MODIS/006/MYD11A1");
// Create the main map and set the LST layer.
var mapPanel = ui.Map();
var layers = mapPanel.layers();
var vis = {min:0, max:30, palette: ['blue','red','yellow']};
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Configure the map.
mapPanel.style().set('cursor', 'crosshair');
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'MODIS Land Surface Temperature - Time Series Inspector',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a location to see its time series of ocean temperatures.')
]);
inspectorPanel.add(intro);
//Create Date input
inspectorPanel.add(ui.Label({
    value: "Enter date YYYY-MM-DD"
  }));
var date = ui.Textbox();
var button = ui.Button({
  label: "Search",
  onClick: getLST
});
var ChooseDate = ui.Panel([date, button], ui.Panel.Layout.flow('horizontal'));
inspectorPanel.add(ChooseDate);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
inspectorPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
/*
 * Year selector for Chart
 */
var options = {
  '2018': '2018-01-01',
  '2017': '2017-01-01',
  '2016': '2016-01-01',
  '2015': '2015-01-01',
  '2014': '2014-01-01',
  '2013': '2013-01-01',
  '2012': '2012-01-01',
  '2011': '2011-01-01',
  '2010': '2010-01-01',
  '2009': '2009-01-01',
  '2008': '2008-01-01',
  '2007': '2007-01-01',
  '2006': '2006-01-01',
  '2005': '2005-01-01',
  '2004': '2004-01-01',
  '2003': '2003-01-01',
  '2002': '2002-01-01',
  '2001': '2001-01-01',
  '2000': '2000-01-01'
};
// Configure a selection dropdown to allow the user to choose between images,
// and set the map to update when a user makes a selection.
var select = ui.Select({items: Object.keys(options)});
select.setValue(Object.keys(options)[18], true);
inspectorPanel.add(select);
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
  var timeseries = imageCollection.filterDate(ee.Date(select.getValue()), ee.Date(select.getValue()).advance(1, 'year'))
                    .select('LST_Day_1km');
 timeseries = timeseries.map(function(img){
   return img.multiply(0.02)
             .subtract(273.15)
             .set({'system:time_start': img.get('system:time_start')});
 });
  // Make a chart from the time series.
  var LSTChart = ui.Chart.image.series(timeseries, point, ee.Reducer.mean(), 500);
  // Customize the chart.
  LSTChart.setOptions({
    title: 'Land Surface surface temp: time series',
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
  inspectorPanel.widgets().set(6, LSTChart);
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
//Create legend colorbar Panel
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
  value: 'Map Legend: Land Surface Temperature (C)',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.add(legendPanel);
/*
 * Functions
 */
function getLST(){
  print(ee.Date(date.getValue()));
  var LST = imageCollection.select('LST_Day_1km')
            .filterDate(ee.Date(date.getValue()));
  LST = LST.first().multiply(0.02).subtract(273.15)
  print(LST);
  LST = LST.select('LST_Day_1km').visualize(vis);
  mapPanel.layers().set(0, LST,{}, "LST");
}
// Register a callback on the default map to be invoked when the map is clicked.
mapPanel.onClick(generateChart);
//Changes Chart based on selected year
function UpdateChart(){
  if (lon.getValue()){
  }
}