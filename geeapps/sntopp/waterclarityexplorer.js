var l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    l5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR"),
    l7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR"),
    pekel = ee.Image("JRC/GSW1_0/GlobalSurfaceWater"),
    countries = ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    states = ee.FeatureCollection("TIGER/2016/States");
//Set the inital baselayer to satellite and center somewhere without an
//overwhelming amount of lakes
Map.setOptions('HYBRID')
Map.setCenter(-81.49, 28.12, 8)
// Create all the base layers we need.
//Hydrolakes
//var usa = countries.filter(ee.Filter.eq('country_co','US'))
var fl = states.filter(ee.Filter.eq('NAME','Florida'))
var lakes = ee.FeatureCollection("users/eeProject/HydroLAKES_polys_v10")
.filterBounds(fl);
Map.addLayer(lakes,{color: 'cyan'},'Lakes')
//Pekel occurance mask
var threshold = 80
var occ = pekel.select('occurrence').gt(threshold)//.clip(lakes)
occ = occ.updateMask(occ)
// Training Data Set Imported from R
var train = ee.FeatureCollection('ft:1nVQYf2uhqAoRECc5SzMxwAc82C9xWpptFo7cr7FF')
//var test = ee.FeatureCollection('ft:16cx9AM9uBJnO8Ut4fS2_uFEzXFckqvswYrbcfacG')
//Create Landsat collection with standardized band names
var bn8 = ['B2','B3', 'B4', 'B5', 'B6','B7', 'pixel_qa']
var bn57 = ['B1', 'B2', 'B3', 'B4', 'B5','B7', 'pixel_qa']
var bns = ['blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'fmask']
var ls5 = l5.select(bn57, bns)
var ls7 = l7.select(bn57, bns)//.filterDate('1999-01-01','2003-05-30')
var ls8 = l8.select(bn8, bns)
var ls = ee.ImageCollection(ls5.merge(ls8).merge(ls7))
.filter(ee.Filter.lt('CLOUD_COVER', 30))
.filterBounds(fl)
.map(function(img){
  //var ndwi = img.normalizedDifference(['green','swir1']).rename('ndwi');
  //var ndvi = img.normalizedDifference(['nir', 'red']).rename('ndvi');
  var latLong = ee.Image.pixelLonLat().rename(['long','lat']);
  var BR = img.select('blue').divide(img.select('red')).rename('BR')
  var SR = img.select('swir1').divide(img.select('red')).rename('SR');
  var BG = img.select('blue').divide(img.select('green')).rename('BG')
  var GR = img.select('green').divide(img.select('red')).rename('GR');
  return img.addBands(BR).addBands(latLong)
  .addBands(SR).addBands(BG).addBands(GR)//.addBands(ndwi).addBands(ndvi)
})
//Train the random forest classifier
var rf = ee.Classifier.randomForest({numberOfTrees: 15, seed: 32}).setOutputMode('REGRESSION')
    .train(train, 'SDD', ['green', 'red', 'SR','BG' , 'BR', 'GR', 'long']);
//Classify an image in order to immediately generate the model
// the idea being this will save time later.
var rfTrain = ee.Image(ls.first().clip(ls.first().geometry().buffer(-1000))).updateMask(occ).classify(rf)
print(rfTrain)
// Create an intro panel with discussion about the app.
var panelLeft = ui.Panel();
panelLeft.style().set('width', '400px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Historic Water Clarity Explorer',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label({
    value: 'Enter your year of interest then pan/zoom to your chosen lake. Click on a spot in the lake to visualize average summer lake water clarity for the chosen year and the trend in clarity for the four years before and after the chosen date.',
    style: {fontSize: '12px', fontWeight: 'bold'}
  }),
  ui.Label('This proof-of-concept app provides a tool to visualize and explore historic water clarity changes in lakes across Florida. The goal of this app is to provide a simple example of what an outfacing water quality product might look like.  With that in mind, we acknowledge a few known limitations, which we hope to address using future funding:'),
  ui.Label('-Data is aggregated into one single value per summer; eventually, we would prefer to provide data separately for all clear-sky images.'),
  ui.Label('-All classification and computation is done in real-time, leading to slow display; ideally these computations would be done beforehand.'),
  ui.Label('-Time series analysis is dependent on having at least one cloud free image per summer.  Areas without a cloud free image result in an error.'),
  ui.Label('-No convenient validation of regression classifiers is currently available in Earth Engine, so our confidence in the model is based on similar models we’ve developed in other programming environments.'),
  ui.Label('-The model used here includes only optical characteristics of the water. The inclusion of additional landscape variables, which we have not yet ingested into Earth Engine, improves model performance.'),
  ui.Label('-We provide water clarity as an example, but in our current work we’ve additionally produced robust models for total suspended solids, dissolved organic carbon, and chlorophyll-a.')
]);
panelLeft.add(intro);
//Create a year widget to enter year of interest.
var year = ui.Panel({
  widgets:[
  ui.Label('First, enter a year (1984-2018), then click on a lake to explore historic water clarity.'),
  ui.Textbox('YYYY', '2018')]
})
//Generate our legend 
var vis = {palette: ['58FE00', '0000FF'], min: 0, max: 3};
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
    ui.Label(String('>').concat(String(vis.max)), {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Water Clarity (m)',
  style: {fontWeight: 'bold'}
});
//Bring it all together into a second analysis panel
var legendPanel = ui.Panel({
  widgets: [year, legendTitle, colorBar, legendLabels],
  style: {
      position: 'bottom-left',
      padding: '5px',
      width: '300px'
  }});
// Create the primary update function
Map.onClick(function(coords) {
  var yearUpdate = year.widgets().get(1).getValue();
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'}, 'Analysis Point');
  Map.layers().set(1, dot);
  //Pull start date from textbox, mosaic summer months
  var startDate = yearUpdate.concat('-05-01');
  var endDate = yearUpdate.concat('-08-30');
  //Filter everything to the lake of interest.
  var lake = lakes.filterBounds(point);
  var occLake = occ.clip(lake);
  //Classify water clarity imgage for median summer clarity.
  var sdd = ee.Image(ls.filterBounds(lake)
  .filterDate(startDate,endDate)
  .reduce(ee.Reducer.median()))
  .updateMask(occLake)
  .rename(['blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'fmask', 'BR', 'long', 'lat','SR', 'BG', 'GR'])
  .classify(rf);
  //print(sdd)
  var vis = {palette: ['58FE00', '0000FF'], min: 0, max: 3};
  //Add it to the map
  var sddViz = ui.Map.Layer(sdd.select('classification'), vis,'sdd');
  Map.layers().set(0, sddViz);
  // Yearly summer mosaics, adapted from Giovani's code
  // in the dev forum.
  // Calculate yearly summer values
  // Define time range
  var startyear = ee.Number(parseInt(yearUpdate)).subtract(4);
  var endyear = ee.Number(parseInt(yearUpdate)).add(4).min(2018);
  var startmonth = 6; // !!!!check and remove unnecessary monthly images from stack 
  var endmonth = 8;  // !!!!check and remove unnecessary monthly images from stack 
  // Set date in ee date format
  var startdate = ee.Date.fromYMD(startyear,startmonth,1);
  var enddate = ee.Date.fromYMD(endyear,endmonth,30);
  // create list for years
  var years = ee.List.sequence(startyear,endyear);
  // create list for months
  var months = ee.List.sequence(startmonth,endmonth);
  // Filter data
  var datain = ls.filterDate(startdate, enddate)
    .filter(ee.Filter.calendarRange(startmonth,endmonth, 'month'))
    // Sort chronologically in descending order.
    // .sort('system:time_start', false)
    .filterBounds(point.buffer(90))
    .map(function(img){
      return(img.updateMask(occ.clip(point.buffer(90))));
    });
  //print(datain, 'datain');
  /////////////////////////
  //
  // YEARLY ANALYSIS
  //
  ////////////////////////
  // calculate the annual values
  var YY_TS =  ee.ImageCollection.fromImages(
    years.map(function (y) {
        var w = datain.filter(ee.Filter.calendarRange(y, y, 'year'))
              .reduce(ee.Reducer.median())
              .rename(['blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'fmask', 'BR', 'long', 'lat','SR', 'BG', 'GR'])
              .classify(rf)
              .rename(['Clarity']);
      return w.set('year', ee.Date.fromYMD(y,6,15))}));
  print(YY_TS,'YY_TS');
  // Create an sdd chart.
  var sddChart = ui.Chart.image.series(YY_TS, point.buffer(90), ee.Reducer.mean(), 30, 'year');
  sddChart.setOptions({
    title: 'Water Clarity Over Time',
    vAxis: {title: 'Clarity (m)'},
    hAxis: {title: 'Year', format : 'YYYY'},
  });
  //Add timeseries to legend panel.
  legendPanel.widgets().set(4, sddChart)
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panelLeft);
Map.add(legendPanel);