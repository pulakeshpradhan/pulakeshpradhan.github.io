var l8 = ee.ImageCollection("LANDSAT/LC8_SR"),
    wa = ee.FeatureCollection("projects/servir-wa/aoi/afrique_ouest_aoi1");
var ndviVis = {min: 0, max: 1, palette: [
  'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301'
]};
function getNdvi(image) {
  // return image.addBands(image.normalizedDifference(['B5', 'B4']).rename('ndvi'))
  return image.select().addBands(image.normalizedDifference(['B5', 'B4']));
}
function getLocustMap(biotopeAoi, locustType, timeLag, windAdvance, predTime) {
  var SAMPLING_SCALE = 30;
  var LANDSAT_QA = 'pixel_qa';
  var LANDSAT_7_ID = 'LANDSAT/LE07/C01/T1_SR';
  var LANDSAT_8_ID = 'LANDSAT/LC08/C01/T1_SR';
  var DATE_CUTOFF_BEGIN = '2015-01-01'; // Don't get dates before the start of GFS
  var TIME_LAG = timeLag;
  var TIME_LAG_UNIT = 'day';
  var WIND_ADVANCE = windAdvance;
  var PRED_TIME = predTime;
  var MODIS_LST_SCALE = 0.02;
}
  // var SWARMS_LINK = 'ft:1c-3VayDG853D5VNfEtWmbOdERGt-3II1j5aS9VCc';
  // var RAMSES_TIME_PROP = 'START_DATE';
  // Define various band names
  var NDVI_BANDS = ['B5', 'B4']; // For landsat 8
  var TEMPERATURE_BAND = 'LST_Day_1km';
  var PRECIPITATION_BAND = 'HQprecipitation';
  var RH_BAND = 'relative_humidity_2m_above_ground';
  var ACTUAL_WIND_BAND = 'u_component_of_wind_10m_above_ground'; // XXX: Wind speed calculations available elsewhere
  // var VEGETATION_BAND = 'ndvi'
  var VEGETATION_BAND = 'NDVI';
  var FORECAST_WIND_BANDS = ['u_component_of_wind_10m_above_ground', 'v_component_of_wind_10m_above_ground'];
  var CLIMATE_FORECAST_BANDS = [
    'temperature_2m_above_ground',
    'relative_humidity_2m_above_ground'
  ];
  var WIND_FORECAST_BAND = 'u_component_of_wind_10m_above_ground'; // We're cheating for now; do the actual calculations later
  var PRECIPITATION_FORECAST_BAND = 'total_precipitation_surface'; // This is summed so we track it different
  // These are the names of the bands, even though the properties might not be
  // those things
  // var PREDICTION_PREDICTORS = [ // Selector to use when classifying the prediction image
  //     'intercept',
  //     'temperature_2m_above_ground',
  //     'total_precipitation_surface',
  //     'relative_humidity_2m_above_ground',
  //     'u_component_of_wind_10m_above_ground',
  //     'ndvi'
  // ];
  var PREDICTORS = [
    'intercept',
    TEMPERATURE_BAND,
    PRECIPITATION_BAND,
    RH_BAND,
    ACTUAL_WIND_BAND,
    VEGETATION_BAND // XXX: Veg band isn't adding right, so drop it for now
  ]
  // Name of the band that represents the probability
  var CLASSIFICATION_BAND = 'sum';
  // var PLACEHOLDER_ID = 'NASA/GLDAS/V021/NOAH/G025/T3H'
  // var RH_ID = PLACEHOLDER_ID;
  // var WIND_SPEED_ID = PLACEHOLDER_ID
  // Proportion of the data to put into the training / validation sets
  var TRAINING_VALIDATION_SPLIT = 0.7;
  /*
    Define functions
  */
  // Convert longitude and latitude bands to a geometry.
  var toPoints = function(fc) {
    return ee.FeatureCollection(fc).map(function(f) {
      f = ee.Feature(f)
      return ee.Feature(
        ee.Geometry.Point([f.get('longitude'), f.get('latitude')]),
        f.toDictionary().remove(['longitude', 'latitude']))
    });
  };
//Panel Definition
var panel = ui.Panel();
// Sets the variables for the panel
panel.style().set('width', '300px');
panel.style().set('border', '1px solid green');
// Define the intro panel
var intro = ui.Panel([
  ui.Label({
    value: 'SERVIR-West Africa Locust Forecasting Tool',
    style: {fontSize: '26px', fontWeight: 'bold', color: 'green'}
  }),
  ui.Label('This tool provides current and forecasted locust locations. (Based on FAO locust monitoring tool.)')
]);
//Adds the intro to the panel
panel.add(intro);
// Creates a label
var label = ui.Label('Select Year:');
var threshold = ui.Slider({
  min: 1,
  max: 20,
  step: 1,
  onChange: day5
});
// var thresh = ee.Number(threshold.getValue());
//Input functions for the buttons
var day5 = function(){
  Map.layers().reset();
  Map.addLayer(
  ee.Image(
    getLocustMap(
      selectedBiotope,
      // biotopeCollection.filter(ee.Filter.eq('ATLAS_P', '4A2')),
      LOCUST_TYPES[0],
      ee.Number(threshold.getValue()).multiply(-1),
      5,//ee.Number(button5.getLabel()),
      5
    )
  )
)
  print(ee.Number(threshold.getValue()).multiply(-1));
};
// print(thresh);
var day10 = function(){
  Map.addLayer(
  ee.Image(
    getLocustMap(
      selectedBiotope,
      // biotopeCollection.filter(ee.Filter.eq('ATLAS_P', '4A2')),
      LOCUST_TYPES[0],
      -10,
      5,
      10
    )
  )
)};
var day15 = function(){
  Map.addLayer(
  ee.Image(
    getLocustMap(
      selectedBiotope,
      // biotopeCollection.filter(ee.Filter.eq('ATLAS_P', '4A2')),
      LOCUST_TYPES[0],
      -10,
      5,
      15
    )
  )
)};
//Defines the buttons
var button5 = ui.Button({
  label: '5',
  onClick: day5
  });
var button10 = ui.Button({
  label: '10 day',
  onClick: day10
});
var button15 = ui.Button({
  label: '15 day',
  onClick: day15
});
var buttonlabel = ui.Label({
  value: 'Select the time step to view the vulnerability to locust'
});
//Adds the label and slider settings
var baselinePanel = ui.Panel({
  widgets: [label, threshold],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {padding: '7px'}
});
var buttonInfo = ui.Panel({
  widgets:[buttonlabel],
  layout: ui.Panel.Layout.flow('horizontal')
});
//Sets the button panel settings
var buttonPanel = ui.Panel({
  widgets: [button5, button10, button15],
  layout: ui.Panel.Layout.flow('horizontal')
});
// End Panel definition
Map.centerObject(wa, 5);
var biotopeCollection = ee.FeatureCollection("projects/servir-wa/services/locusts_west_africa/biotopo_2008");
// Provides a way to connect bandnames in GFS with human readable names
var bandNameDictionary = {
  'Temperature': 'temperature_2m_above_ground',
  'Relative Humidity': 'relative_humidity_2m_above_ground',
  'Precipitation': 'total_precipitation_surface',
  'Soil Moisture (5cm)': 'Volumetric_Soil_Moisture_Content_depth_below_surface_layer_5_cm'
};
var bandTitleDictionary = {
  'Temperature': 'Temperature 2m au dessus du sol',
  'Relative Humidity': 'Humidité relative 2m au dessus du sol',
  'Precipitation': 'Precipitation totale à la surface',
  'Soil Moisture (5cm)': 'Humidité du sol, 5 cm en dessous de la surface'
};
// Used to lookup the data collection associated with each data type
var dataCollectionDictionary = {
  'Temperature': ee.ImageCollection('NOAA/GFS0P25'),
  'Relative Humidity': ee.ImageCollection('NOAA/GFS0P25'),
  'Precipitation': ee.ImageCollection('NOAA/GFS0P25'),
  'Soil Moisture (5cm)': ee.ImageCollection('NOAA/CFSV2/FOR6H')
};
var chartTypeDictionary = {
  'Temperature': 'LineChart',
  'Relative Humidity': 'LineChart',
  'Precipitation': 'ColumnChart',
  'Soil Moisture (5cm)': 'LineChart'
}; 
var bandUnits = {
  'Temperature': 'Temperature, °C',
  'Relative Humidity': 'Relative humidity, %',
  'Precipitation': 'Total precipitation, mm',
  'Soil Moisture (5cm)': 'Soil moisture (5cm), fraction'
};
// Bands which are forecasts, and thus all need to be handled the same way
var gfsBands = [
  'Temperature',
  'Relative Humidity',
  'Precipitation',
]
var cfsv2Bands = [
  'Soil Moisture (5cm)'
]
var forecastDataType = {
  select: ui.Select({
    items: Object.keys(bandNameDictionary),
    onChange: function(newDataType) {
      displayChart()
    }
  })
}
forecastDataType.panel = ui.Panel({
  widgets: [
    ui.Label('Select Data Type and click on a biotope to display chart.'),
    forecastDataType.select
  ]
})
var forecastPanel = ui.Panel({
  widgets: [
    forecastDataType.panel
  ],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    width: '400px'
  }
});
// Converts the forcast_time property of forecasts to the time_start property,
// so that they display on a chart properly.
function forecastTimeToTimeStart(feature) {
  return feature.set('system:time_start', feature.get('forecast_time'))
}
// Gets a collection of all forecasts from the last 24h
function getGfsForecast(biotope, bandName) {
  // Get the timestamp for 24h ago
  var yesterday = new Date() - (1000 * 60 * 60 * 24);
  var collection = dataCollectionDictionary[bandName];
  // Get the band on the collection that we're interested in
  var band = bandNameDictionary[bandName];
  // There's no precipitation data on the 0 hour forecast, so if we're looking for,
  // precipitation, don't use that forecast
  if (bandName === "Precipitation") {
    return ee.ImageCollection(collection)
      .filterBounds(ee.Feature(biotope).geometry())
      .filter(ee.Filter.and(
        ee.Filter.gt('creation_time', yesterday),
        ee.Filter.neq('forecast_hours', 0)
      ))
      .map(forecastTimeToTimeStart)
      .select(band);
  }
  return ee.ImageCollection(collection)
    .filterBounds(ee.Feature(biotope).geometry())
    .filter(ee.Filter.gt('creation_time', yesterday))
    .map(forecastTimeToTimeStart)
    .select(band);
}
function getCsfv2Forecast(biotope, bandName) {
  // Get the timestamp for one week ago
  var yesterday = new Date() - (1000 * 60 * 60 * 24 * 7);
  var collection = dataCollectionDictionary[bandName];
  // Get the band on the collection that we're interested in
  var band = bandNameDictionary[bandName];
  // print('csfv2', ee.ImageCollection(collection)
  //   .filterBounds(ee.Feature(biotope).geometry())
  //   .filter(ee.Filter.gt('system:time_start', yesterday))
  //   .select(band)
  // )
  // Map.addLayer(ee.ImageCollection(collection)
  //   .filterBounds(ee.Feature(biotope).geometry())
  //   .filter(ee.Filter.gt('system:time_start', yesterday))
  //   .select(band)
  // )
  return ee.ImageCollection(collection)
    .filterBounds(ee.Feature(biotope).geometry())
    .filter(ee.Filter.gt('system:time_start', yesterday))
    .select(band);
}
function maskClouds(image) {
    var saturationMask = ee.Image(image).select("radsat_qa").eq(0);
    // Bits 3 and 5 are cloud shadow and cloud, respectively.
    var cloudShadowBitMask = ee.Number(2).pow(3).int();
    var cloudsBitMask = ee.Number(2).pow(5).int();
    // Get the pixel QA band.
    var qa = image.select('pixel_qa');
    // Both flags should be set to zero, indicating clear conditions.
    var qualityMask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
        .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
    return ee.Image(image)
      .updateMask(qualityMask)
      .updateMask(saturationMask)
}
function getNdviImage(biotope) {
  var today = new Date();
  // Only get landsat images from the last 48 days
  var dateLimit = new Date() - (1000 * 60 * 60 * 24 * 48);
  var ls = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterBounds(ee.Feature(biotope).bounds().geometry())
    .filterDate(dateLimit, today)
    .map(maskClouds)
    .sort('system:time_start')
    .mosaic()
    // .clip(biotope.geometry())
  return getNdvi(ls)
}
function getChart(biotope, bandName) {
  // Using the band name, determine the data collection we're pulling from
  // dataCollection = dataCollectionDictionary[bandName];
  // print('bandName', bandName)
  // If the band is one of the forecast bands, handle it in a certain way.
  if (gfsBands.indexOf(bandName) !== -1) {
    var collection = getGfsForecast(biotope, bandName);
  } else if (cfsv2Bands.indexOf(bandName) !== -1) {
    var collection = getCsfv2Forecast(biotope, bandName);
  }
  // Combine the all our reducers into one.
  var reducers = ee.Reducer.mean().combine({
    reducer2: ee.Reducer.stdDev(),
    sharedInputs: true
  }).combine({
    reducer2: ee.Reducer.min(),
    sharedInputs: true
  }).combine({
    reducer2: ee.Reducer.max(),
    sharedInputs: true
  });
  // Render precipitation charts as ColumnCharts (could be anything though)
  if (bandName === 'Precipitation') {
    var chartType = 'ColumnChart'
    // var options = ee.Dictionary(chart
    //   .getOptions())
    //   .set('chartType', 'ColumnChart')
    // // options.chartType = chartTypeDictionary[bandName]
    // chart.setOptions(options)
  } else {
    var chartType = 'LineChart'
  }
  // Create our chart. Sample at a scale of 600 pixels so that we never exceed the
  // max pixel value
  var chart = ui.Chart.image.series(
    collection,
    ee.Feature(biotope).geometry(),
    reducers,
    600
  ).setSeriesNames([
    'Max',
    'Mean',
    'Min',
    'Std Dev'
  ]).setOptions({
    title: ee.String(biotope.get('ATLAS_S')).cat(', ').cat(bandTitleDictionary[bandName]).getInfo(),
    slantedTextAngle: 60,
    height: 400,
    chartType: chartType,
    vAxis: {
      title: bandUnits[bandName]
    }
  });
  return chart;
}
function displayChart(chart, panel) {
}
/*
  Map click handler. Creates a function that determines which feature collection
  on the map was clicked.
*/
// Map.addLayer(biotopeCollection)
var onclick = function(coord) {
  var filter = biotopeCollection.filterBounds(ee.Geometry.Point(coord.lon, coord.lat))
  var feature = ee.Feature(filter.first())
  // print('feature', feature)
  selectedBiotope = feature;
  // Show the chart
  displayChart()
  // Show the NDVI for the zone
  ndviLayer.setEeObject(getNdviImage(selectedBiotope))
  ndviLayer.setVisParams(ndviVis)
  // Add the biotope, except for the active biotope.
  var filteredBiotopes = biotopeCollection.filter(
    ee.Filter.neq('ATLAS_P', selectedBiotope.get('ATLAS_P'))
  )
  biotopeLayer.setEeObject(filteredBiotopes)
  // biotopeLayer.setVisParams()
  // Add the outline of the selected biotope
  var biotopeOutline = ee.Image().toByte().paint(selectedBiotope.geometry(), 2, 1);
  // Display with opacity values to make it "transparent"
  var selectedBiotopeVis = {
    // palette: 'FF3333,FF0000,000000,0000FF,32CD32,FFFFFF,FFFF00',
    // max: 3,
    opacity: 0.9
  };
  selectedBiotopeLayer.setEeObject(biotopeOutline);
  selectedBiotopeLayer.setVisParams(selectedBiotopeVis);
}
var selectedBiotope = biotopeCollection.first()
Map.onClick(onclick)
// Map.addLayer(getNdviImage(selectedBiotope), ndviVis, 'ndvi')
function displayChart() {
  var dataType = forecastDataType.select.getValue()
  forecastPanel.widgets().set(1, getChart(selectedBiotope, dataType))
}
forecastDataType.select.setValue(forecastDataType.select.items().get(0))
//Adds the button panel and slider panel to the panel
panel.add(baselinePanel);
panel.add(buttonInfo);
panel.add(buttonPanel);
// panel.add(BASHPanel);
/*
  Map Layers:
    Create the map layers that we will use to display NDVI results, locust
  risk assessment, biotope, etc.
*/
// Create the layers
var biotopeLayer = ui.Map.Layer(ee.Image(), {}, 'biotopes');
var selectedBiotopeLayer = ui.Map.Layer(ee.Image(), {}, 'selected biotope');
var locustLayer = ui.Map.Layer(ee.Image(), {}, 'locust risk');
var ndviLayer = ui.Map.Layer(ee.Image(), {}, 'ndvi');
// Add them to the map
Map.layers().add(ndviLayer)
Map.layers().add(biotopeLayer)
Map.layers().add(selectedBiotopeLayer)
Map.layers().add(locustLayer)
biotopeLayer.setEeObject(biotopeCollection)
// // Create outlines of all the biotopes to display on the map
// var biotopeOutlines = ee.Image().toByte().paint(biotopeOutlines.geometry(), 2, 1);
// //Display with opacity values to make it "transparent"
// Map.addLayer(biotopeOutlines, {
//       palette: 'FF3333,FF0000,000000,0000FF,32CD32,FFFFFF,FFFF00',
//       max: 3,
//       opacity: 0.9
//   }, 'biotopes');
ui.root.insert(0, panel);
// Add the forecastPanel at position 2 so it's on the right
ui.root.insert(2, forecastPanel);
// Set the cursor to a crosshair, because it looks nice
Map.style().set('cursor', 'crosshair');
// print('biotopefirst', biotopeCollection.first())