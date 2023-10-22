var sample = ee.FeatureCollection("users/bullocke/amazon/assessment/sample_crosstab_attributes_june11_data2");
/*  Sample interpretation tool for determining reference labels for
    a sample derived from a mapped dataset. The sample must have Landsat
    time series information in its metadata, which can be generated with
    'Save Feature Timeseries' tool. Each unique sample location much have
    an identifier, such as 'ID'. */
// Define the sample from Imports or a Feature Collection.    
var sampleName = sample  
// Unique sample identifier
var sampleIdentifier = 'ID'
// Global variables
var latlon;
// Define start and end to the time series in a parameter Dictionary.
var params = ee.Dictionary({
     'start': '1990-01-01',
     'end': '2019-01-01',
      })
// Load necessary utilities
var miscUtils = require('users/bullocke/assessment-tools:Utilities');
// Filter out cloud observations
var sampleData = sampleName//.filterMetadata('mask','equals','nocloud')
var refresh_layers = function(point) {
   Map.layers().reset();
   var coords = ee.List(point.geometry().coordinates().get(0)).get(0).getInfo()
   var lat = coords[1]
   var lon = coords[0]
   latlon = ui.Label('Lat, Lon: ' + lat + ', ' + lon)
   panel.add(latlon)
   var select_style = {color: 'FF0000',pointRadius: 4}; 
   Map.centerObject(point.geometry(),14);
   var pointOutline = ee.Image().byte().paint({
    featureCollection: ee.FeatureCollection(point),
    color: 1,
    width: 4
   });
   Map.layers().set(2, ui.Map.Layer(pointOutline, {palette: 'red'}, 'pixel'), 'pixel');
   Map.setOptions('SATELLITE');
};
var unmixf = function(image) { 
  var gv= [500, 900, 400, 6100, 3000, 1000];
  var npv= [1400, 1700, 2200, 3000, 5500, 3000];
  var soil= [2000, 3000, 3400, 5800, 6000, 5800];
  var shade= [0, 0, 0, 0, 0, 0];
  var cloud = [9000, 9600, 8000, 7800, 7200, 6500];
  var unmixi = ee.Image(image).select([0,1,2,3,4,5]).unmix([gv, shade, npv, soil, cloud], true, true);
  var ndfi = ee.Image(unmixi).expression(
        '((GV / (1 - SHADE)) - (NPV + SOIL)) / ((GV / (1 - SHADE)) + (NPV + SOIL))', {
          'GV': ee.Image(unmixi).select('band_0'),
          'SHADE': ee.Image(unmixi).select('band_1'),
          'NPV': ee.Image(unmixi).select('band_2'),
          'SOIL': ee.Image(unmixi).select('band_3')
        })
  var newimage = ee.Image(image).addBands(
    [unmixi.select(['band_0','band_1','band_3','band_4']).rename(['GV','Shade','NPV','Soil']),ndfi.rename('NDFI')]);
  return newimage;
};
var getImageRegion = function(region, date) {
  // Get Landsat image at a given date and location
  var collection4 = ee.ImageCollection('LANDSAT/LT04/C01/T1_SR')
      .filterBounds(region)
  var collection5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
      .filterBounds(region)
  var collection7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
      .filterBounds(region)
  var collection8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
      .filterBounds(region)
  var col4NoClouds = collection4.map(miscUtils.mask457)
  var col5NoClouds = collection5.map(miscUtils.mask457)
  var col7NoClouds = collection7.map(miscUtils.mask457)
  var col8NoClouds = collection8.map(miscUtils.mask8)
  var colNoClouds = col4NoClouds
                      .merge(col5NoClouds)
                      .merge(col7NoClouds)
                      .merge(col8NoClouds)
  var imDate = ee.Date(date)
  var befDate = imDate.advance(-1, 'day')
  var aftDate = imDate.advance(1, 'day')
  var selectedImage = colNoClouds.filterDate(befDate, aftDate).first()
  var image_id = selectedImage.get('system:index').getInfo();
  Map.layers().reset()
  Map.addLayer(ee.Image(selectedImage), visParams, image_id);
  var pointOutline = ee.Image().byte().paint({
      featureCollection: ee.FeatureCollection(region),
      color: 1,
      width: 4
    });
  Map.addLayer(pointOutline, {palette: 'red'}, 'pixel');
  return selectedImage
}  
var getInputsRegion = function(region, params) {
  // Get Landsat time series for a given location
  var start = params.get('start')
  var end = params.get('end')
  var collection4 = ee.ImageCollection('LANDSAT/LT04/C01/T1_SR')
      .filterBounds(region)
      .filterDate(start, end)
  var collection5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR')
      .filterBounds(region)
      .filterDate(start, end)
  var collection7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_SR')
      .filterBounds(region)
      .filterDate(start, end)
  var collection8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
      .filterBounds(region)
      .filterDate(start, end)
  var col4NoClouds = collection4.map(miscUtils.mask457)
  var col5NoClouds = collection5.map(miscUtils.mask457)
  var col7NoClouds = collection7.map(miscUtils.mask457)
  var col8NoClouds = collection8.map(miscUtils.mask8)
  var colNoClouds = col4NoClouds
                      .merge(col5NoClouds)
                      .merge(col7NoClouds)
                      .merge(col8NoClouds)
  var colIndices = ee.ImageCollection(miscUtils.doIndices(colNoClouds))
  return ee.ImageCollection(colIndices.map(unmixf))
}  
var makeSinglePlot = function(x, y, bandName, position, ymin, ymax, region){
  // Make time series plot with y axis based on data min and max
  var yminNew = ee.Number(ee.List(y).reduce(ee.Reducer.min()))
  var ymaxNew = ee.Number(ee.List(y).reduce(ee.Reducer.max()))
  if (quantileButton.getValue()) {
    // Get percentiles
    var ySorted = ee.List(y).sort()
    var yLength = ee.Number(ySorted.length()).add(1)
    // 10 % quantile
    var quantile5 = ee.Number(yLength.multiply(.05)).toInt()
    yminNew = ySorted.get(quantile5).getInfo()
    var quantile95 = ee.Number(yLength.multiply(.95)).toInt()
    ymaxNew = ySorted.get(quantile95).getInfo()
  }
  var chart = ui.Chart.array.values(y, 0, x)
                    .setSeriesNames([bandName])
                    .setOptions({
                      title: bandName,
                      hAxis: {'title': 'year'},
                      vAxis: {'title': bandName, viewWindow: {min: yminNew, max: ymaxNew}},
                      pointSize: 4,
                      lineWidth: 0}) 
  chart.onClick(function(coords) {
    getImageRegion(ee.Feature(region).geometry(), coords)
  });
  panel.add(chart)
}
//if (button.getDisabled()) return;
var makeImagePlot = function(iCol, region, point, bandName, position){
  // Make time series plot from image collection
  var yminNew = ee.Image(iCol.min())
                  .reduceRegion({
                    reducer: ee.Reducer.mean(),
                    geometry: region,
                    scale: 30
                  })
  var ymaxNew = ee.Image(iCol.max())
                  .reduceRegion({
                    reducer: ee.Reducer.mean(),
                    geometry: region,
                    scale: 30
                  })
  var chart = ui.Chart.image.series(ee.ImageCollection(iCol).select(bandName), region, ee.Reducer.mean(), 30)
                .setOptions({
                  title: bandName,
                  vAxis: {'title': bandName, viewWindow: {min: ee.Number(yminNew), max: ee.Number(ymaxNew)}},
                  lineWidth: 0,
                  pointSize: 6,
                 });
  chart.onClick(function(coords) {
    getImageRegion(ee.Feature(point).geometry(), coords)
  });
  panel.add(chart); 
}
var makePlots = function(sampleID, point){
  // Function to make all time series plots 
  var sampleDates = sampleID.aggregate_array('Date')
  var sampleRed = sampleID.aggregate_array('Red')
  var sampleNIR = sampleID.aggregate_array('NIR')
  var sampleSWIR1 = sampleID.aggregate_array('SWIR1')
  var sampleNDFI = sampleID.aggregate_array('NDFI')
  var sampleGV = sampleID.aggregate_array('GV')
  var sampleNPV = sampleID.aggregate_array('NPV')
  var sampleShade = sampleID.aggregate_array('Shade')
  var sampleSoil = sampleID.aggregate_array('Soil')
  var sampleEVI = sampleID.aggregate_array('EVI')
  var sampleNDVI = sampleID.aggregate_array('NDVI')
  var sampleBright = sampleID.aggregate_array('Brightness')
  var sampleGreenness = sampleID.aggregate_array('Greenness')
  var sampleWet = sampleID.aggregate_array('Wetness')
  panel.clear()
  panel.add(select_stretch)
  panel.add(resetButton)
  panel.add(quantileButton)
  panel.add(latlon)
  makeSinglePlot(sampleDates, sampleNDFI, 'NDFI', 4, 0, 1, point)
  makeSinglePlot(sampleDates, sampleGV, 'GV', 5, 0, 1, point)
  makeSinglePlot(sampleDates, sampleNPV, 'NPV', 6, 0, 1, point)
  makeSinglePlot(sampleDates, sampleSoil, 'Soil', 7, 0, 1, point)
  makeSinglePlot(sampleDates, sampleShade, 'Shade', 8, 0, 1, point)
  makeSinglePlot(sampleDates, sampleNDVI, 'NDVI', 9, 0, 1, point)
  makeSinglePlot(sampleDates, sampleEVI, 'EVI', 10, 0, 1, point)
  makeSinglePlot(sampleDates, sampleRed, 'Red',11, 0, 2000, point)
  makeSinglePlot(sampleDates, sampleNIR, 'NIR', 12, 0, 3000, point)
  makeSinglePlot(sampleDates, sampleSWIR1, 'SWIR1', 13, 0, 2000, point)
}
var setZoom = function(button, increment, cur_points) {
  // Zooms to the current point based on next and previous buttons
  var collectionLength = cur_points.size();
  selectedIndex = selectedIndex + increment;
  if (selectedIndex === 0) selectedIndex = pointTotal;
  if (selectedIndex > (pointTotal)) selectedIndex = 1;
  text_in.setValue(selectedIndex)
  cur_point = ee.Feature(
                    ee.FeatureCollection(cur_points.filterMetadata('ID', 'equals',selectedIndex))
                      .toList(1).get(0))
  cur_point = cur_point.buffer(14).bounds()
  if (dataButton.getValue()) {
    var curPointData = sampleData.filterMetadata('ID','equals',selectedIndex).sort('Date')
    refresh_layers(cur_point);
    read_meta(cur_point,selectedIndex);
    print(curPointData)
    makePlots(curPointData, cur_point)
  }
  else {
    refresh_layers(cur_point);
    notSaved(cur_point)
  }
};
var setZoom_abs = function(cur_val,cur_points) {
  // Zooms to current point based on drop box selection
  var collectionLength = cur_points.size();
  selectedIndex = parseInt(cur_val)
  cur_point = ee.Feature(
                    ee.FeatureCollection(cur_points.filterMetadata('ID', 'equals', selectedIndex))
                      .toList(1).get(0))
  cur_point = cur_point.buffer(14).bounds()
  if (dataButton.getValue()) {
    var curPointData = sampleData.filterMetadata('ID','equals',selectedIndex).sort('Date')
    // refresh the selected point
    refresh_layers(cur_point);
    read_meta(cur_point,selectedIndex);
    makePlots(curPointData,cur_point)
    }  else {
    refresh_layers(cur_point);
    notSaved(cur_point)
  }
};
var read_meta = function(cur_point,pix_id) {
  // Display description of the sample point in map display
  inspector.clear();
  var temp = 0;
  var cur_str = 0;
  if(cur_point.toDictionary().contains(sampleIdentifier)) {
    temp = cur_point.toDictionary().get(sampleIdentifier).getInfo();
    cur_str = 'ID: ' + temp;
    inspector.add(ui.Label(cur_str));
  }
  inspector.style().set({shown: true});
}; 
var notSaved = function(pgeo){
  // Load a time series for a sample point that is not saved
  panel.clear()
  panel.widgets().set(2, resetButton)
  panel.widgets().set(3, select_stretch)
  var coords = ee.List(pgeo.geometry().coordinates().get(0)).get(0)
      .evaluate(function(coords) {
      var lat = coords[1]
      var lon = coords[0]
      var latlon = ui.Label('Lat, Lon: ' + lat + ', ' + lon)
      panel.add(latlon)
      })
  var landsatData = getInputsRegion(pgeo.geometry(), params)
  // Add a red dot to the map where the user clicked.
  var pointOutline = ee.Image().byte().paint({
      featureCollection: ee.FeatureCollection(pgeo),
      color: 1,
      width: 4
    });
  Map.addLayer(pointOutline, {palette: 'red'}, 'pixel');
  makeImagePlot(landsatData,pgeo, pgeo, 'NDFI', 6)
  makeImagePlot(landsatData,pgeo, pgeo, 'GV', 7)
  makeImagePlot(landsatData,pgeo, pgeo, 'Shade', 8)
  makeImagePlot(landsatData,pgeo, pgeo, 'Soil', 9)
  makeImagePlot(landsatData,pgeo, pgeo, 'Red', 10)
  makeImagePlot(landsatData,pgeo, pgeo, 'SWIR1', 11)
  makeImagePlot(landsatData,pgeo, pgeo, 'EVI', 12)
  makeImagePlot(landsatData,pgeo, pgeo, 'EVI2', 13)
  makeImagePlot(landsatData,pgeo, pgeo, 'NBR', 14)
  makeImagePlot(landsatData,pgeo, pgeo, 'NDVI', 15)
  makeImagePlot(landsatData,pgeo, pgeo, 'Brightness', 16)
  makeImagePlot(landsatData,pgeo, pgeo, 'Greenness', 17)
  makeImagePlot(landsatData,pgeo, pgeo, 'Wetness', 18)
  makeImagePlot(landsatData,pgeo, pgeo, 'Blue', 19)
  makeImagePlot(landsatData,pgeo, pgeo, 'Green', 20)
  makeImagePlot(landsatData,pgeo, pgeo, 'NIR', 21)
}
Map.onClick(function(coords) {
  // Click on the map and load a new time series
  panel.clear()
  var pgeo = ee.Geometry.Point([coords.lon, coords.lat]);
  // Create or update the location label
  var location = 'Lon: ' + coords.lon.toFixed(2) + ' ' +
                 'Lat: ' + coords.lat.toFixed(2)
  panel.widgets().set(1, ui.Label(location))
  panel.widgets().set(2, resetButton)
  panel.widgets().set(3, select_stretch)
  var landsatData = getInputsRegion(pgeo, params)
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var pointOutline = point.buffer(14).bounds()
  var pointOutlinePlot = ee.Image().byte().paint({
    featureCollection: ee.FeatureCollection(pointOutline),
    color: 1,
    width: 4
  });
  Map.centerObject(point, 14)
  Map.addLayer(pointOutlinePlot, {palette: 'red'}, 'pixel');
  makeImagePlot(landsatData, pgeo, pointOutline, 'NDFI', 4)
  makeImagePlot(landsatData, pgeo, pointOutline, 'GV', 5)
  makeImagePlot(landsatData, pgeo, pointOutline, 'NPV', 6)
  makeImagePlot(landsatData, pgeo, pointOutline, 'Soil', 7)
  makeImagePlot(landsatData, pgeo, pointOutline, 'Shade', 8)
  makeImagePlot(landsatData, pgeo, pointOutline, 'NDVI', 9)
  makeImagePlot(landsatData, pgeo, pointOutline, 'EVI', 10)
  makeImagePlot(landsatData, pgeo, pointOutline, 'Red', 11)
  makeImagePlot(landsatData, pgeo, pointOutline, 'NIR', 12)
  makeImagePlot(landsatData, pgeo, pointOutline, 'SWIR1', 12)
});
// Variables
var selectedIndex = 0;
var visParams = {bands: ['B3', 'B2', 'B1'], min: 0, max: 1400};
var cur_point = '';
var sampleIDs = ee.List(sampleName.aggregate_array('ID')).reduce(ee.Reducer.frequencyHistogram())
var pointTotal = ee.Dictionary(sampleIDs).keys().size().getInfo()
// Quantile button
var quantileButton = ui.Checkbox('Stretch to 5/95% percentiles', false);
// Load data button
var dataButton = ui.Checkbox('Load data from feature collection', true);
// Stretch button
var stretch_321 = {bands: ['B3', 'B2', 'B1'], min: 0, max: 1400};
var stretch_543 = {bands: ['B5', 'B4', 'B3'], min: 0, max: 7000};
var stretches = {
    Stretch_321: stretch_321,
    Stretch_543: stretch_543
  };
var select_stretch = ui.Select({
    items: Object.keys(stretches),
    onChange: function(key) {
      visParams = stretches[key];
    }
  });
select_stretch.setPlaceholder('Select Stretch');
// Reset button
var resetButton = ui.Button({
  label: 'Reset Map Layers',
  onClick: function() {
    Map.layers().reset();
    Map.setOptions('SATELLITE');
    var pointOutline = ee.Image().byte().paint({
      featureCollection: ee.FeatureCollection(cur_point),
      color: 1,
      width: 4
    });
    Map.addLayer(pointOutline, {palette: 'red'}, 'pixel');
   }
});
// Panel to hold it  
var panel = ui.Panel({style: {width: '600px'}})
.add(ui.Label('Sample units from Bullock et al. (Submitted Manuscript)'))
// Feature information panel 
var inspector = ui.Panel({style: {shown: false, width: '200px'}});
inspector.style().set({position: 'bottom-left'});
Map.add(inspector);
// search and change feature
var text_in = new ui.Textbox('Search ID');
text_in.style().set({width: '80px',margin: '2px'});
// Sets up next and previous buttons used to navigate through previews of the
// images in the collection.
var prevButton = new ui.Button('Previous', null, false, {margin: '0 auto 0 0'});
var nextButton = new ui.Button('Next', null, false, {margin: '0 0 0 auto'});
var buttonPanel = new ui.Panel(
    [prevButton, text_in, nextButton],
    ui.Panel.Layout.Flow('horizontal'));
// Previous next and search pannel
var mainPanel = ui.Panel({
  widgets: [buttonPanel],
  style: {position: 'bottom-center', width: '250px'}
});
// Set up display
Map.style().set('cursor', 'crosshair');
Map.setOptions('SATELLITE');
Map.add(mainPanel);
// Set up the next and previous buttons.
prevButton.onClick(function(button) { setZoom(button, -1, sampleName); });
nextButton.onClick(function(button) { setZoom(button, 1, sampleName); });
text_in.onChange(function(val) {
  setZoom_abs(val,sampleName); 
});
// Add the panel to the ui.root.
ui.root.add(panel);