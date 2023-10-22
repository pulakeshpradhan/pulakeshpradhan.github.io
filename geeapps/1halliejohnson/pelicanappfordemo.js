/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var table = ee.FeatureCollection("users/1halliejohnson/gcsdata");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//Repository script to hold components of Pelican Tracking app
//App is still in development
//This function filters out cloud and cloud shadow pixels
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
//assign a now variable to allow the range for the landsat image to continue
var now = Date.now();
//Landsat 8 Image collection with the cloud mask applied and filter dates
var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate('2014-01-01', now)
                  .map(maskL8sr);
Map.setCenter(-112.523386, 41.429234, 6);
//Below are three dictionaries, currently the month color dictionary
//is being used, but there is framework to redeploy with the other styling 
//options
var sexcolor = ee.Dictionary({
  "M":'#d73027',
  'F': '#313695',
});
//currently in use in app
var monthcolor = ee.Dictionary({
  '1': '#313695',
  '2': '#313695',
  '3': '#abd9e9',
  '4': '#abd9e9',
  '5': '#abd9e9',
  '6': '#d73027',
  '7': '#d73027',
  '8': '#d73027',
  '9': '#fdae61',
  '10':'#fdae61',
  '11':'#fdae61',
  '12':'#313695',
});
var pelicolor = ee.Dictionary({
  'Annabelle':'#1F78B4',
  'Barnabus':'#B2DF8A', 
  'Chester':'#E31A1C', 
  'Daphne':'#FDBF6F', 
  'Eleanor':'#CAB2D6',
  'Finnigan':'#FB9A99', 
  'George':'#565A99', 
  'Abigail':'#A6CEE3', 
  'Cecilia':'#FF5699', 
  'Bartholomew':'#33A02C', 
  'Derek':'#FF7F00',
  'Gerald':'#CC5019', 
  'Hector':'#75FF00', 
  'Indie':'#ED8EFF', 
  'Jerome':'#7BB297',
  'Everett':'#383DD3', 
  'Flagg':'#B15928',
  'Loretta': '#BB41C9', 
  'Manuel':'#CB367E', 
  'Kirk':'#FFECBF', 
  'Oscar':'#E67878', 
  'Nelson':'#66CAEA', 
  'Pedro':'#63B8E3', 
  'Quincy':'#5F5FD7',
  'Rosalie':'#FA418C', 
  'Sylvester':'#FAA569', 
  'Theodore':'#AFCD78', 
  'Waylon':'#4350FF', 
  'Vinnie':'#32CC78', 
  'Uma':'#009A2D',
  'Xavier':'#21F6A1', 
  'Yukiko':'#ffff00', 
  'Albus':'#b71b40', 
  'Bridgette':'#fc0927', 
  'Fiona':'#bbf02c', 
  'Eloise':'#abe1d4',
  'Deidra':'#e7d60d', 
  'Cici':'#f7d6a2', 
  'Hook':'#FF1493', 
  'Genevieve':'#f56e3f', 
  'Kevin':'#c57779', 
  'Lupita':'#418af1', 
  'Jonah':'#8A2BE2',
  'Iris':'#217906', 
  'Miguel':'#a6cee3', 
  'Nathan':'#b2df8a', 
  'Penelope':'#40E0D0', 
  'Quentin':'#1f78b4', 
  'Olivia':'#6a3d9a',
  'Winona':'#ffff99', 
  'Xena':'#fdbf6f', 
  'Tabitha':'#cab2d6', 
  'Valerie':'#e31a1c', 
  'Stephan':'#fb9a99', 
  'Rachelle':'#ff7f00',
  'Ursula':'#c6499b', 
  'Yogi':'#a24a51',  
  'Alexander':'#2bbfa8', 
  'Zeus':'#a32bd4', 
  'Bianca':'#d6e368', 
  'Cassandra':'#94d576',
  'Darla':'#ad0c13', 
  'Gregory':'#9fedd9', 
  'Elmer':'#db5c2a', 
  'Fudd':'#00ea8d', 
  'Aurora':'#00ea8d',///this isn't the right color, i think i shifted them down one
});
var pname = ['Annabelle', 'Barnabus', 'Chester', 'Daphne', 'Eleanor',
       'Finnigan', 'George', 'Abigail', 'Cecilia', 'Bartholomew', 'Derek',
       'Gerald', 'Hector', 'Indie', 'Jerome', 'Everett', 'Flagg',
       'Loretta', 'Manuel', 'Kirk', 'Oscar', 'Nelson', 'Pedro', 'Quincy',
       'Rosalie', 'Sylvester', 'Theodore', 'Waylon', 'Vinnie', 'Uma',
       'Xavier', 'Yukiko', 'Albus', 'Bridgette', 'Fiona', 'Eloise',
       'Deidra', 'Cici', 'Hook', 'Genevieve', 'Kevin', 'Lupita', 'Jonah',
       'Iris', 'Miguel', 'Nathan', 'Penelope', 'Quentin', 'Olivia',
       'Winona', 'Xena', 'Tabitha', 'Valerie', 'Stephan', 'Rachelle',
       'Ursula', 'Yogi', 'Alexander', 'Zeus', 'Bianca', 'Cassandra',
       'Darla', 'Gregory', 'Elmer', 'Fudd', 'Aurora'];
var months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
var sexes = ['M','F' ];
//legend properties
var layerProperties = {
 'Season': {
    name: 'table',
    legend: [
      {'Dec - Feb': '#313695'}, {'Mar - May': '#abd9e9'}, {'Jun - Aug': '#d73027'},
      {'Sep - Nov': '#fdae61'},
    ],
    defaultVisibility: false
  }
}
//highlight color for identify selection - refernce call function
var HIGHLIGHT_STYLE = {color: '#65FF33', pointSize: 5, fillColor: '#65FF33'};
//Applies the styles from the three dictionaries to the layer - remove 
//comments from other layers to apply, update the return for each variable
function addStyle(pt) {
  var pcolor = pelicolor.get(pt.get('name'));
  //var scolor = sexcolor.get(pt.get('sex'));
  var mcolor = monthcolor.get(pt.get('MM'));
  return pt.set('styleProperty', ee.Dictionary({'color': mcolor}));
}
//creates variable of the data with the style applied      
var peli = ee.FeatureCollection(table).map(addStyle);//.filter(ee.Filter.eq('BoolLoc', '1'));
var pelicans = ee.FeatureCollection(table);
//this is called in the app
function addpeliLayer(name){
  print(name);
  Map.addLayer(peli.filter(ee.Filter.eq('name', name)).style({styleProperty: 'styleProperty', neighborhood: 10}), {}, name, false, 0.85);
}
function addsexLayer(sex){
  print(sex);
  Map.addLayer(peli.filter(ee.Filter.eq('sex', sex)).style({styleProperty:'styleProperty', neighborhood: 50}), {}, sex, false, 1.0);
}
function addtimeLayer(MM){
  print(MM);
  Map.addLayer(peli.filter(ee.Filter.eq('MM', MM)).style({styleProperty:'styleProperty', neighborhood: 10}), {}, MM, true, 0.65);
}
//Add pelican data to map
pelicolor.keys().getInfo().map(addpeliLayer);
//sexcolor.keys().getInfo().map(addsexLayer);
//monthcolor.keys().getInfo().map(addtimeLayer);
// Create a map panel.
var mapPanel = ui.Map();
Map.style().set({cursor: 'crosshair'});
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Pelican Seasonal Movement', {fontSize: '36px', color: 'black'});
//Add a lager catch all panel
var toolPanel = ui.Panel([header], 'flow', {width: '200px'});
ui.root.widgets().add(toolPanel);
// Create a layer selector pulldown. There is an option here to add additional layers
// however the visualization is defined by a function and not the layer properties
// The elements of the pulldown are the keys of the layerProperties dictionary.
var selectItems = Object.keys(layerProperties);
// Define the pulldown menu.  Changing the pulldown menu changes the map layer
// and legend.
var layerSelect = ui.Select({
  items: selectItems,
  value: selectItems[0],
  onChange: function(selected) {
    // Loop through the map layers and compare the selected element to the name
    // of the layer. If they're the same, show the layer and set the
    // corresponding legend.  Hide the others.
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName());
    });
    setLegend(layerProperties[selected].legend);
  }
});
// Add the select to the toolPanel with some explanatory text.
toolPanel.add(ui.Label('Select pelicans from Layers to view in map', {'font-size': '18px'}));
toolPanel.add(layerSelect);
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '10px', margin: '0 0 0 8px', padding: '0'}
});
toolPanel.add(legendPanel);
var legendTitle = ui.Label(
    'Legend',
    {fontWeight: 'bold', fontSize: '10px', margin: '0 0 4px 0', padding: '0'});
legendPanel.add(legendTitle);
// Define an area for the legend key itself.
// This area will be replaced every time the layer pulldown is changed.
var keyPanel = ui.Panel();
legendPanel.add(keyPanel);
function setLegend(legend) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
  keyPanel.clear();
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
}
// Set the initial legend.
setLegend(layerProperties[layerSelect.getValue()].legend);
//create a title for the date slider
var dateSliderTitle = ui.Label(
    'Date Slider',
    {fontWeight: 'bold', fontSize: '14px', margin: '4px 4px 4px 4px', padding: '1'});
toolPanel.add(dateSliderTitle);
//add a little explanatory text
toolPanel.add(ui.Label('Choose a date to change the Landsat Imagery', {'font-size': '12px'}));
//creates a dictionary of the image start dates and the first associated 
//image
//also activates the date slider
ee.Dictionary({start: collection.first().date(), end: ee.Date(now)})
  .evaluate(renderSlider) 
//function to format date slider.  Images are chosen from 30 day periods
//when a new date is selected, the "renderDateRange() function is called
function renderSlider(dates) {
  var slider = ui.DateSlider({
    start: dates.start.value, 
    end: dates.end.value, 
    period: 30, // Every 30 days change range for weekly or bi weekly ranges
    onChange: renderDateRange
  })
  toolPanel.add(slider)
}
//filters the imagery based on the input from the slider
//applies some vis parameters to make an RGB image
//updates layer
//something with the Map.layers().reset([layer]) updates all the 
//layers with the imagery, so I add back the pelicans in this 
//function.  
function renderDateRange(dateRange) {
  var image = collection
    .filterDate(dateRange.start(), dateRange.end())
    .median()
  var visParams = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000,
  gamma: 1.4,
  }; 
  //Map.layers().set(0, ui.Map.Layer(overlay));
  var layer = ui.Map.Layer(image, visParams, 'Imagery');
  Map.layers().set(1, layer).reset(1);
  //pelicolor.keys().getInfo().map(addpeliLayer)
}
var exportButton = ui.Button("Export all features as CSV", Export.table.toDrive(table, "Pelican_Data") );
toolPanel.add(exportButton);
// A list of points the user has clicked on, as [lon,lat] tuples.
var selectedPoints = [];
// Returns the list of birds the user has selected.  There is a 1000
//meter on the selection point, this can be adjusted if it's determined
//that's too coarse
function getSelectedBirds() {
  return peli.filterBounds(ee.Geometry.MultiPoint(selectedPoints).buffer(1000));
}
// Updates the map overlay using the currently-selected bird 
function updateOverlay() {
  var overlay = getSelectedBirds().style(HIGHLIGHT_STYLE);
  Map.layers().set(0, ui.Map.Layer(overlay));
}
// Define groups in the data by mapping a function to set a new property.
// Makes a bar chart of the given FeatureCollection of countries by name. Change to scatter chart
function makeResultsBarChart(peli) {
  var chart = ui.Chart.feature.byFeature(peli, 'Date_time', 'DispAlt');
  chart.setChartType('ScatterChart');
  chart.setOptions({
    title: 'Pelican Altitudes',
    vAxis: {title: 'Meters'},
    hAxis: {title: 'Date', minValue: 2014}
  });
  chart.style().set({stretch: 'both'});
  return chart;
}
// Makes a table of the given FeatureCollection of countries by name.
function makeResultsTable(peli) {
  var table = ui.Chart.feature.byFeature(peli, 'name');
  table.setChartType('Table');
  table.setOptions({allowHtml: true, pageSize: 5});
  table.style().set({stretch: 'both'});
  return table;
}
function updateChart() {
  var chartBuilder = chartTypeToggleButton.value;
  var chart = chartBuilder(getSelectedBirds());
  resultsPanel.clear().add(chart).add(buttonPanel);
}
function clearResults() {
  selectedPoints = [];
  Map.layers().remove(Map.layers().get(1));
  var instructionsLabel = ui.Label('Select birds to compare altitude.');
  resultsPanel.widgets().reset([instructionsLabel]);
}
// Register a click handler for the map that adds the clicked point to the
// list and updates the map overlay and chart accordingly.
function handleMapClick(location) {
  selectedPoints.push([location.lon, location.lat]);
  updateOverlay();
  updateChart();
}
Map.onClick(handleMapClick);
function ToggleButton(states, onClick) {
  var index = 0;
  var button = ui.Button(states[index].label);
  button.value = states[index].value;
  button.onClick(function() {
    index = ++index % states.length;
    button.setLabel(states[index].label);
    button.value = states[index].value;
    onClick();
  });
  return button;
}
// Our chart type toggle button: the button text is the opposite of the
// current state, since you click the button to switch states.
var chartTypeToggleButton = ToggleButton(
    [
      {
        label: 'Display results as table',
        value: makeResultsBarChart,
      },
      {
        label: 'Display results as chart',
        value: makeResultsTable,
      }
    ],
    updateChart);
// A panel containing the two buttons .
var buttonPanel = ui.Panel(
    [ui.Button('Clear results', clearResults), chartTypeToggleButton],
    ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '500px'});
var resultsPanel = ui.Panel({style: {position: 'bottom-left'}});
Map.add(resultsPanel);
clearResults();