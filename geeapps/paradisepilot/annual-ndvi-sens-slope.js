var imageUtils = require('users/paradisepilot/learn-gee:trends/modules/imageUtils');
var vizParams  = require('users/paradisepilot/learn-gee:trends/modules/vizParams' );
function prependYearImage (img,varname) {
  var year = img.get('year');
  var yearImage = ee.Image.constant(ee.Number(year)).toShort();
  return ee.Image.cat(yearImage,img)
    .rename(['year',varname])
    .set('year',year)
    .copyProperties(img,["system:time_start"]);
}
// Write a function for Cloud masking
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var  cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd( cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask)//.divide(10000)
    .select("B.*")
    .copyProperties(image,["system:time_start"]);
}
// Write a function to scale the bands
function scaleImage (image) {
  return image
    .multiply(0.0001)
    .copyProperties(image,["system:time_start"]);
}
function updatePanelTimeSeries (inputPanel,varname,widgetIndex,inputTS,coords) {
  // Update the lon/lat panel with values from the click event.
  var clickedPoint = ee.Geometry.Point(coords.lon,coords.lat);
  var chartTitle = ee.String(varname) // 'MODIS/061/MOD13Q1:NDVI'
    .cat(', ')
    .cat(
      '(lon,lat) = ('
      + coords.lon.toFixed(3)
      + ','
      + coords.lat.toFixed(3)
      + ')'
    );
  var chartPointTS = ui.Chart.image.series(
    inputTS,
    clickedPoint,
    ee.Reducer.mean(),
    30,
    'system:time_start'
  )
  .setChartType('LineChart')
  .setOptions({
    title: chartTitle.getInfo(),
    // vAxis: {title: 'NDVI'},
    hAxis: {title: 'date'},
    //vAxis: {title: 'NDSI', maxValue: 1, minValue: -1},
    //hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
    lineWidth: 0.5,
    pointSize: 3.5
  });
  inputPanel.widgets().set(widgetIndex,chartPointTS);
}
function removeLayer (inputMap,nameOfLayerToRemove) {
  var layers = inputMap.layers();
  var layerNames = [];
  layers.forEach(function(tempLayer) {
    // var layerName = tempLayer.getName();
    layerNames.push(tempLayer.getName());
  });
  var index = layerNames.indexOf(nameOfLayerToRemove);
  if (index > -1) {
    var layer = layers.get(index);
    inputMap.remove(layer);
  } else {
    print('Layer ' + name + ' not found');
  }
}
var pointOfInterestMarkerStyle = {
  color: 'white',
  pointShape: 'circle', // 'diamond',
  pointSize: 12,
  width: 3,
  fillColor: 'pink'
};
// ##### ##### ##### ##### #####
// ##### ##### ##### ##### #####
// var   pointOttawaON = ee.Geometry.Point([ lon_centre,lat_centre]);
// var pointThompsonMB = ee.Geometry.Point([ -97.855278, 55.743333]);
// Define the initial point (White Partridge Island, NWT)
var lon_centre = -102.122; // -102.122447;
var lat_centre =   60.117; //   60.117385;
var pointWPI = ee.Geometry.Point([-102.122447, 60.117385]); // White Partridge Island
// (lon,lat)'s of extreme points of Canada
var  northermost = [ -69.958333, 83.111389];
var southernmost = [ -82.682778, 41.682778];
var  easternmost = [ -52.619444, 47.523611];
var  westernmost = [-140.931389, 60.292222];
var lon_min = -140.931389;
var lon_max =  -52.619444;
var lat_min =   41.682778;
var lat_max =   83.111389;
// Define the regional bounds of animation frames.
var canadaBoundingRectangle = ee.Geometry.Polygon([[
  [ lon_min, lat_min ],
  [ lon_min, lat_max ],
  [ lon_max, lat_max ],
  [ lon_max, lat_min ],
  [ lon_min, lat_min ]
  ]],
  null,
  false
);
// ##### ##### ##### ##### #####
// ##### ##### ##### ##### #####
/*
var monthlyPrecipitation = ee.ImageCollection('NASA/GPM_L3/IMERG_MONTHLY_V06').select('precipitation');
print("monthlyPrecipitation:",monthlyPrecipitation);
var petMODIS = ee.ImageCollection('MODIS/006/MOD16A2').select('PET');
print("petMODIS:",petMODIS);
*/
var monthlyPrecipitation = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
  .select(['pr'],['precipitation']);
print("monthlyPrecipitation:",monthlyPrecipitation);
var pet = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
  .select(['pet'],['PET']);
print("pet:",pet);
var years = ee.List.sequence(2001,2021);
var precipitationYearlyTotals = years.map(
  function(year) {
  //return imageUtils.pixelwiseReductionByYear(year,threeHourlyPrecipitation,ee.Reducer.sum());
    return imageUtils.pixelwiseReductionByYear(year,monthlyPrecipitation,ee.Reducer.sum());
  }
);
precipitationYearlyTotals = ee.ImageCollection.fromImages(precipitationYearlyTotals);
print("precipitationYearlyTotals:",precipitationYearlyTotals);
var petYearlyTotals = years.map(
  function(year) {
    return imageUtils.pixelwiseReductionByYear(year,pet,ee.Reducer.sum());
  }
);
petYearlyTotals = ee.ImageCollection.fromImages(petYearlyTotals);
print("petYearlyTotals:",petYearlyTotals);
var aridityCollection = precipitationYearlyTotals.combine(petYearlyTotals);
aridityCollection = aridityCollection.sort('year');
print("aridityCollection:",aridityCollection);
//var constant192 = ee.Image.constant(ee.Number(192)).toShort();
aridityCollection = aridityCollection.map(
  function(img) {
  //var petScaled = img.select('PET_sum').divide(constant192).rename('petScaled');
    var petScaled = img.select('PET_sum').rename('PET');
    var wStress   = img.select('precipitation_sum').divide(  petScaled).rename('wStress' );
    var wDeficit  = img.select('precipitation_sum').subtract(petScaled).rename('wDeficit');
    return img.addBands([petScaled,wStress,wDeficit]);
  }
);
print("aridityCollection:",aridityCollection);
var waterStress = aridityCollection.select('wStress');
print("waterStress:",waterStress);
//var waterStressSens = waterStress.reduce(ee.Reducer.sensSlope());
var waterStressSens = waterStress
  .map(function (img) {
    return prependYearImage(img,'waterStress');
  })
  .reduce(ee.Reducer.sensSlope());
print("waterStressSens:",waterStressSens);
var waterStressSens_slope = waterStressSens.select('slope');
print("waterStressSens_slope:",waterStressSens_slope);
var percentiles_wStressSens_slope = waterStressSens_slope
//  .expression(
//    "(b('wStress') > 1) ? 1 : ORIGINAL",
//    {'ORIGINAL': waterStressSens_slope}
//  )
  .reduceRegion({
    geometry: canadaBoundingRectangle,
    reducer: ee.Reducer.percentile([0,1,5,10,25,50,75,90,95,99,100]),
    scale: 5000
  });
print("percentiles_wStressSens_slope:",percentiles_wStressSens_slope);
// ##### ##### ##### ##### #####
// ##### ##### ##### ##### #####
// var ndviMODIS = ee.ImageCollection('MODIS/006/MOD13A2').select('NDVI');
var ndviMODIS = ee.ImageCollection('MODIS/061/MOD13Q1').select('NDVI');
print("ndviMODIS:",ndviMODIS);
var years = ee.List.sequence(2001,2021);
var ndviMODISYearlyAverages = years.map(
  function(year) {
//return imageUtils.pixelwiseReductionBySummer(year,ndviMODIS,ee.Reducer.mean());
  return imageUtils.pixelwiseReductionByYear(  year,ndviMODIS,ee.Reducer.mean());
  }
);
ndviMODISYearlyAverages = ee.ImageCollection.fromImages(ndviMODISYearlyAverages);
print("ndviMODISYearlyAverages:",ndviMODISYearlyAverages);
ndviMODISYearlyAverages = ndviMODISYearlyAverages.map(
  function(img) {
    return prependYearImage(img,'mean_ndvi');
  }
);
print("ndviMODISYearlyAverages:",ndviMODISYearlyAverages);
// Calculate time series slope using sensSlope().
//var ndviSens = ndviMODISYearlyAverages.reduce(ee.Reducer.linearFit());
var ndviSens = ndviMODISYearlyAverages.reduce(ee.Reducer.sensSlope());
print("ndviSens:",ndviSens);
// The resulting image has 2 bands: slope and intercept
// We select the 'slope' band
var ndviSens_slope = ndviSens.select('slope');
print("ndviSens_slope:",ndviSens_slope);
// ##### ##### ##### ##### #####
// ##### ##### ##### ##### #####
var histogramScale      = 5000;
var histogramMaxBuckets =  256;
var hOptions_wStress = {
  hAxis: {
    title: 'Water Stress Sens slope',
  //viewWindow: {min: -0.0015, max: 0.0015}
    viewWindow: {min: -0.0020, max: 0.0020}
  }
};
var hOptions_NDVI = {
  hAxis: {
    title: 'NDVI Sens slope',
    viewWindow: {min: -50, max: 50},
  }
};
var histogram_wStress = ui.Chart.image.histogram(
  waterStressSens_slope,
  canadaBoundingRectangle,
  histogramScale,
  histogramMaxBuckets
);
var histogram_NDVI = ui.Chart.image.histogram(
  ndviSens_slope,
  canadaBoundingRectangle,
  histogramScale
  // histogramMaxBuckets
);
histogram_wStress.setOptions(hOptions_wStress);
histogram_NDVI.setOptions(   hOptions_NDVI   );
print(histogram_wStress);
print(histogram_NDVI   );
// ##### ##### ##### ##### #####
// ##### ##### ##### ##### #####
/*
// Print the GIF URL to the console.
// print(rgbVis.getVideoThumbURL(gifParams));
// Render the GIF animation in the console.
print(ui.Thumbnail(rgbVis,gifParams));
Map.centerObject(pointThompsonMB,4);
Map.addLayer(pointThompsonMB, {}, 'POI');
// Set visualisation parameters
// var visParams = {min: -10, max: 10, palette: ['brown','white','blue']};
// var visParams = {min: -50, max: 50, palette: ['blue','cyan','black','yellow','red']};
var visParams = {min: -50, max: 50, palette: ['red','yellow','black','cyan','blue']};
Map.addLayer(ndviSens_slope, visParams, 'NDVI Sens slope');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var adminUnits1 = empty.paint({
//  featureCollection: ee.FeatureCollection("FAO/GAUL/2015/level1"),
  featureCollection: ee.FeatureCollection("users/paradisepilot/canada/census2016ProvTerrDigitalBoundary"),
  color: 1,
  width: 1
});
Map.addLayer(adminUnits1, {palette: 'FFFFFF'}, 'provincial boundaries');
*/
// ##### ##### ##### ##### #####
// ##### ##### ##### ##### #####
// Create a Split Panel App
var coordsWPI = pointWPI.coordinates().getInfo();
var center = {
  lon: coordsWPI[0],
  lat: coordsWPI[1],
  zoom: 4
};
// Create two maps.
var  leftMap = ui.Map(center);
var rightMap = ui.Map(center);
// Link them together.
var linker = new ui.Map.Linker([leftMap,rightMap]);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
// Add the layers to the maps
// Composite goes to the leftMap
var maxSlopeWStress =  0.003;
var maxSlopeNDVI    = 50.000;
var visParamsWStress = {min: -maxSlopeWStress, max: maxSlopeWStress, palette: ['blue','cyan','black','yellow','red']};
var visParamsNDVI    = {min: -maxSlopeNDVI,    max: maxSlopeNDVI,    palette: ['blue','cyan','black','yellow','red']};
 leftMap.addLayer(waterStressSens_slope, visParamsWStress, "Sen's slope, water stress"        );
rightMap.addLayer(ndviSens_slope,        visParamsNDVI,    "Sen's slope, NDVI yearly averages");
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var adminUnits1 = empty.paint({
//  featureCollection: ee.FeatureCollection("FAO/GAUL/2015/level1"),
  featureCollection: ee.FeatureCollection("users/paradisepilot/canada/census2016ProvTerrDigitalBoundary"),
  color: 1,
  width: 1
});
 leftMap.addLayer(adminUnits1, {palette: 'FFFFFF'}, 'provincial boundaries');
rightMap.addLayer(adminUnits1, {palette: 'FFFFFF'}, 'provincial boundaries');
/*
var landcover  = ee.List([0, 1, 2, 3]);
var gcpsStyled = ee.FeatureCollection(
  landcover.map(function(lc){
    var color = palette.get(landcover.indexOf(lc));
    var markerStyle = { color: 'white', pointShape: 'diamond', pointSize: 4, width: 1, fillColor: color};
    return gcps
      .filter(ee.Filter.eq('landcover',lc))
      .map(function(point){ return point.set('myPlotStyle',markerStyle); });
      }))
  .flatten();
print("gcpsStyled:",gcpsStyled);
*/
print("pointWPI:",pointWPI);
var featurePointOfInterest = ee.FeatureCollection(pointWPI);
featurePointOfInterest = featurePointOfInterest.map(
  function(point) {
    return point.set('myPlotStyle',pointOfInterestMarkerStyle);
  }
);
print("featurePointOfInterest",featurePointOfInterest);
 leftMap.addLayer(featurePointOfInterest.style({styleProperty:"myPlotStyle"}), {}, 'point of interest');
rightMap.addLayer(featurePointOfInterest.style({styleProperty:"myPlotStyle"}), {}, 'point of interest');
// ##### ##### ##### ##### #####
// ##### ##### ##### ##### #####
// Panels are the main container widgets
var panelMain = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
//style: {width: '225px', minWidth: '225px', maxWidth: '400px'}
//style: {minWidth: '225px', maxWidth: '500px'}
  style: {width: '500px'}
});
/*
panelMain.setLayout(ui.Panel.Layout.absolute({
  stretch: 'horizontal'
}));
*/
/*
var panelTitle = ui.Panel({
//layout: ui.Panel.Layout.flow('horizontal')
  layout: ui.Panel.Layout.absolute()
});
var titleMain = ui.Label({
  value: 'Water Stress & NDVI',
  style: {'fontSize': '20px', 'position': 'top-left'}
});
*/
var panelSelectLonLat = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical')
});
var panelEnterLonLat = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});
var panelEnterLon = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical')
});
var panelEnterLat = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical')
});
var panelButtons = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});
var panelWidgets = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical')
});
var titleLon = ui.Label({
  value: 'POI longitude',
  style: {'fontSize': '15px'}
});
var titleLat = ui.Label({
  value: 'POI latitude',
  style: {'fontSize': '15px'}
});
var textboxLon = ui.Textbox({
  placeholder: lon_centre, // ee.Number(lon_centre).format('%.3f').getInfo(),
  onChange: function(value) {
    textboxLon.setValue(value);
    return(value);
  }
});
var textboxLat = ui.Textbox({
  placeholder: lat_centre, // ee.Number(lat_centre).format('%.3f').getInfo(),
  onChange: function(value) {
    textboxLat.setValue(value);
    return(value);
  }
});
var buttonUpdateLonLat = ui.Button('Update POI');
var buttonReset        = ui.Button( 'Reset POI');
// Element panel.
var panelReadMe = ui.Panel(
  {style: {margin: '0px -8px 0px -8px'}});
// Show/hide info panel button.
var buttonReadMe = ui.Button({
  label: '< README',
  style: { margin: '0px 4px 0px 0px' }
});
// Information text. 
var labelReadMe = ui.Label(
  "Left heatmap: Sen's slope of water stress annual time series. " +
  "Right heatmap: Sen's slope of average NDVI annual time series. " +
  'The pink dot is the "Point of Interest" (POI). ' +
  'The right panel shows the water stress and NDVI time series of the POI. ' +
  'Click anywhere on the map to re-position the POI, and view the updated time series. ' +
  'Or, do the same by entering a (lon,lat) and then clicking on "Update POI".  ' +
  'Here, water stress is defined/computed as IDAHO_EPSCOR/TERRACLIMATE:pr divided by IDAHO_EPSCOR/TERRACLIMATE:pet, ' + 
  'whereas NDVI is MODIS/061/MOD13Q1:NDVI. '
);
var panelReadMeLabel = ui.Panel(
  labelReadMe
  //{stype : {'position': 'top-right'}}
);
// ##### ##### ##### ##### #####
// ##### ##### ##### ##### #####
var legend = {};
legend.title = ui.Label();
legend.palette = {
  min: -50, max: 50,
  palette: [
    'blue',
    'cyan',  //'cyan',  //'cyan',
    'black', //'black', //'black',
    'yellow',//'yellow',//'yellow',
    'red'
  ]
};
/*
legend.gradient = ee.Image.pixelLonLat()
  .select('longitude')
  .multiply((legend.palette.max - legend.palette.min)/100.0)
  .add(legend.palette.min);
*/
legend.gradient = ee.Image.pixelLonLat()
  .select('longitude')
  //.multiply((legend.palette.max - legend.palette.min)/250.0)
  //.multiply((legend.palette.max - legend.palette.min)/350.0);
  .multiply((legend.palette.max - legend.palette.min)/300.0);
//legend.colorbar = ui.Thumbnail(ee.Image.pixelLonLat().select(0));
legend.colorbar = ui.Thumbnail({image: legend.gradient.visualize(legend.palette)});
legend.leftLabel   = ui.Label('large -ve slope');
legend.centerLabel = ui.Label('0');
legend.rightLabel  = ui.Label('large +ve slope');
legend.labelPanel  = ui.Panel({
  widgets: [
    legend.leftLabel,
    legend.centerLabel,
    legend.rightLabel,
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
legend.panel = ui.Panel([
  legend.title,
  legend.colorbar,
  legend.labelPanel
]);
// ##### ##### ##### ##### #####
// ##### ##### ##### ##### #####
/*
buttonSelectLonLat.onClick(function(coords) {
 updatePanelTimeSeries(panelMain,'WATER STRESS',          1,waterStress,coords);
 updatePanelTimeSeries(panelMain,'MODIS/061/MOD13Q1:NDVI',2,ndviMODIS,  coords);
});
*/
/*
// You can even add panels to other panels
var panelDropdown = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
});
panelMain.add(panelDropdown);
// You can even add panels to other panels
var panelLoadReset = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
});
panelMain.add(panelLoadReset);
var selectorYear = ui.Select({
  placeholder: 'please wait ...',
  });
var selectorMonth = ui.Select({
  placeholder: 'please wait ...',
  });
var buttonLoad  = ui.Button('Load');
var buttonReset = ui.Button('Reset');
panelDropdown.add(selectorYear);
panelDropdown.add(selectorMonth);
panelLoadReset.add(buttonLoad);
panelLoadReset.add(buttonReset);
// Let's add a dropdown with the years
var years  = ee.List.sequence(2014,2022);
var months = ee.List.sequence(1,12);
// Dropdown items need to be strings
var yearStrings = years.map(function(year){
  return ee.Number(year).format('%04d');
});
var monthStrings = months.map(function(month){
  return ee.Number(month).format('%02d');
});
// Evaluate the results and populate the dropdown
yearStrings.evaluate(function(yearList) {
  selectorYear.items().reset(yearList);
  selectorYear.setPlaceholder('Select year');
});
monthStrings.evaluate(function(monthList) {
  selectorMonth.items().reset(monthList);
  selectorMonth.setPlaceholder('Select month');
});
// Define a function that triggers when any value is changed
var loadComposite = function() {
  var year  =  selectorYear.getValue();
  var month = selectorMonth.getValue();
  var startDate = ee.Date.fromYMD(
    ee.Number.parse(year),
    ee.Number.parse(month),
    1);
  var endDate = startDate.advance(1,'month');
  var filtered = ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG")
    .filter(ee.Filter.date(startDate,endDate));
  var firstImage = ee.Image(filtered.first()).select('avg_rad');
  var nighttimeVis = {min: 0.0, max: 60.0};
  var layerName = 'Night Lights ' + year + '-' + month;
  Map.addLayer(firstImage, nighttimeVis, layerName);
};
buttonLoad.onClick(loadComposite);
var resetComposite = function() {
  yearStrings.evaluate(function(yearList) {
    selectorYear.items().reset(yearList);
    selectorYear.setPlaceholder('Select year');
  });
  monthStrings.evaluate(function(monthList) {
    selectorMonth.items().reset(monthList);
    selectorMonth.setPlaceholder('Select month');
  });
  Map.clear();
};
buttonReset.onClick(resetComposite);
*/
// ##### ##### ##### ##### #####
// ##### ##### ##### ##### #####
//
// EXERCISE
//
// Set the map center to your area of interst (already done, see top of script)
// Replace the author label with your name
// Publish the app.
// var authorLabel = ui.Label('App by: Quaternary Octics');
// panelMain.add(authorLabel);
// ##### ##### ##### ##### #####
// ##### ##### ##### ##### #####
var stringLonLat = ee.String(', ').cat(
  '(lon,lat) = ('
  + lon_centre.toString()
  + ','
  + lat_centre.toString()
  + ')'
);
var chartTitle = ee.String('Water Stress (TerraClimate)').cat(stringLonLat);
var chartPointWStress = ui.Chart.image.series(
  waterStress,
  pointWPI, // pointThompsonMB, pointOttawaON,
  ee.Reducer.mean(),
  30,
  'system:time_start'
  )
  .setChartType('LineChart')
  .setOptions({
    title: chartTitle.getInfo(),
    // vAxis: {title: 'NDVI'},
    hAxis: {title: 'date'},
    //vAxis: {title: 'NDSI', maxValue: 1, minValue: -1},
    //hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
    lineWidth: 0.5,
    pointSize: 3.5
  });
var chartTitle = ee.String('NDVI (MODIS/061/MOD13Q1)').cat(stringLonLat);
var chartPointNDVI = ui.Chart.image.series(
  ndviMODIS,
  pointWPI, // pointThompsonMB, pointOttawaON,
  ee.Reducer.mean(),
  30,
  'system:time_start'
  )
  .setChartType('LineChart')
  .setOptions({
    title: chartTitle.getInfo(),
  //vAxis: {title: 'NDVI'},
    hAxis: {title: 'date'},
    lineWidth: 0.5,
    pointSize: 3.5
  });
// ##### ##### ##### ##### #####
// ##### ##### ##### ##### #####
leftMap.onClick(function(coords) {
  textboxLon.setPlaceholder(coords.lon);
  textboxLat.setPlaceholder(coords.lat);
  textboxLon.setValue(coords.lon);
  textboxLat.setValue(coords.lat);
  var featurePointOfInterest = ee.FeatureCollection(ee.Geometry.Point([coords.lon,coords.lat]));
  featurePointOfInterest = featurePointOfInterest.map(
    function(point) {
      return point.set('myPlotStyle',pointOfInterestMarkerStyle);
    }
  );
  removeLayer( leftMap,'point of interest');
  removeLayer(rightMap,'point of interest');
   leftMap.addLayer(featurePointOfInterest.style({styleProperty:"myPlotStyle"}), {}, 'point of interest');
  rightMap.addLayer(featurePointOfInterest.style({styleProperty:"myPlotStyle"}), {}, 'point of interest');
  updatePanelTimeSeries(panelWidgets,'Water Stress (TerraClimate)',0,waterStress,coords);
  updatePanelTimeSeries(panelWidgets,'NDVI (MODIS/061/MOD13Q1)',   1,ndviMODIS,  coords);
});
rightMap.onClick(function(coords) {
  textboxLon.setPlaceholder(coords.lon);
  textboxLat.setPlaceholder(coords.lat);
  textboxLon.setValue(coords.lon);
  textboxLat.setValue(coords.lat);
  var featurePointOfInterest = ee.FeatureCollection(ee.Geometry.Point([coords.lon,coords.lat]));
  featurePointOfInterest = featurePointOfInterest.map(
    function(point) {
      return point.set('myPlotStyle',pointOfInterestMarkerStyle);
    }
  );
  removeLayer( leftMap,'point of interest');
  removeLayer(rightMap,'point of interest');
   leftMap.addLayer(featurePointOfInterest.style({styleProperty:"myPlotStyle"}), {}, 'point of interest');
  rightMap.addLayer(featurePointOfInterest.style({styleProperty:"myPlotStyle"}), {}, 'point of interest');
  updatePanelTimeSeries(panelWidgets,'Water Stress (TerraClimate)', 0,waterStress,coords);
  updatePanelTimeSeries(panelWidgets,'NDVI (MODIS/061/MOD13Q1)',    1,ndviMODIS,  coords);
});
var updateLatLon = function() {
  var coords = {
    'lon': parseFloat(textboxLon.getValue()),
    'lat': parseFloat(textboxLat.getValue())
  };
  var center = { lon: coords.lon, lat: coords.lat, zoom: 4 };
   leftMap.setCenter(center);
  rightMap.setCenter(center);
  var featurePointOfInterest = ee.FeatureCollection(ee.Geometry.Point([coords.lon,coords.lat]));
  featurePointOfInterest = featurePointOfInterest.map(
    function(point) {
      return point.set('myPlotStyle',pointOfInterestMarkerStyle);
    }
  );
  removeLayer( leftMap,'point of interest');
  removeLayer(rightMap,'point of interest');
   leftMap.addLayer(featurePointOfInterest.style({styleProperty:"myPlotStyle"}), {}, 'point of interest');
  rightMap.addLayer(featurePointOfInterest.style({styleProperty:"myPlotStyle"}), {}, 'point of interest');
  updatePanelTimeSeries(panelWidgets,'Water Stress (TerraClimate)',0,waterStress,coords);
  updatePanelTimeSeries(panelWidgets,'NDVI (MODIS/061/MOD13Q1)',   1,ndviMODIS,  coords);
};
buttonUpdateLonLat.onClick(updateLatLon);
buttonReset.onClick(function() {
  textboxLon.setPlaceholder(lon_centre);
  textboxLat.setPlaceholder(lat_centre);
  textboxLon.setValue(lon_centre);
  textboxLat.setValue(lat_centre);
});
var showReadMeLabel = false;
buttonReadMe.onClick(function() {
  if(showReadMeLabel) {
    showReadMeLabel = false;
    panelReadMeLabel.style().set('shown',false);
    buttonReadMe.setLabel('< README');
  } else {
    showReadMeLabel = true;
    panelReadMeLabel.style().set('shown',true);
    buttonReadMe.setLabel('> README');
  }
});
// ##### ##### ##### ##### #####
// ##### ##### ##### ##### #####
panelMain.add(panelSelectLonLat);
panelMain.add(panelWidgets);
panelSelectLonLat.add(panelEnterLonLat);
panelSelectLonLat.add(panelButtons);
panelEnterLonLat.add(panelEnterLon);
panelEnterLonLat.add(panelEnterLat);
panelEnterLon.add(  titleLon);
panelEnterLon.add(textboxLon);
panelEnterLat.add(  titleLat);
panelEnterLat.add(textboxLat);
panelButtons.add(buttonUpdateLonLat);
panelButtons.add(buttonReset);
panelWidgets.widgets().set(0,chartPointWStress);
panelWidgets.widgets().set(1,chartPointNDVI   );
panelReadMe.add(buttonReadMe);
panelReadMe.add(panelReadMeLabel);
// ##### ##### ##### ##### #####
// ##### ##### ##### ##### #####
var s = {};
s.opacityWhiteMed = {
//backgroundColor: 'rgba(255, 255, 255, 0.50)'
  backgroundColor: 'rgba(255, 255, 255, 0.70)'
};
s.opacityWhiteNone = {
  backgroundColor: 'rgba(255, 255, 255, 0)'
};
s.chartStyle = {
  height: '325px',
  margin: '0px',
  padding: '0px'
};
panelReadMe.style().set({
  position: 'bottom-right',
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
});
panelReadMeLabel.style().set({
  position: 'top-right'
});
panelReadMeLabel.style().set({
  shown: false,
  width: '300px',
  margin: '4px 0px 0px 0px',
  padding: '8px 8px 8px 8px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
});
legend.title.style().set({
  fontWeight: 'bold',
  fontSize: '12px',
  color: '383838'
});
legend.title.style().set(s.opacityWhiteNone);
legend.colorbar.style().set({
  stretch: 'horizontal',
  margin: '0px 8px',
  maxHeight: '20px'
});
legend.leftLabel.style().set({
  margin: '4px 8px',
  fontSize: '12px'
});
legend.leftLabel.style().set(s.opacityWhiteNone);
legend.centerLabel.style().set({
  margin: '4px 8px',
  fontSize: '12px',
  textAlign: 'center',
  stretch: 'horizontal'
});
legend.centerLabel.style().set(s.opacityWhiteNone);
legend.rightLabel.style().set({
  margin: '4px 8px',
  fontSize: '12px'
});
legend.rightLabel.style().set(s.opacityWhiteNone);
legend.panel.style().set({
  position: 'bottom-left',
  width: '250px',
  padding: '0px'});
legend.panel.style().set(s.opacityWhiteMed);
legend.labelPanel.style().set(s.opacityWhiteNone);
// ##### ##### ##### ##### #####
// ##### ##### ##### ##### #####
 leftMap.add(legend.panel);
rightMap.add(panelReadMe);
ui.root.clear();
ui.root.add(splitPanel);
ui.root.add(panelMain);
leftMap.setControlVisibility({
  drawingToolsControl: true
});
rightMap.setControlVisibility({
  drawingToolsControl: true
});
Map.setControlVisibility({
  drawingToolsControl: true
});