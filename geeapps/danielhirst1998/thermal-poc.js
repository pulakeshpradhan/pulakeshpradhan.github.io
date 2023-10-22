var guixi = ui.import && ui.import("guixi", "table", {
      "id": "users/danielhirst1998/guixi-poc/guixi-aoi"
    }) || ee.FeatureCollection("users/danielhirst1998/guixi-poc/guixi-aoi"),
    saganoseki = ui.import && ui.import("saganoseki", "table", {
      "id": "users/danielhirst1998/guixi-poc/saganoseki"
    }) || ee.FeatureCollection("users/danielhirst1998/guixi-poc/saganoseki"),
    wedabay = ui.import && ui.import("wedabay", "table", {
      "id": "users/danielhirst1998/guixi-poc/wedabay"
    }) || ee.FeatureCollection("users/danielhirst1998/guixi-poc/wedabay"),
    murrinmurrin = ui.import && ui.import("murrinmurrin", "table", {
      "id": "users/danielhirst1998/guixi-poc/murrinmurrin"
    }) || ee.FeatureCollection("users/danielhirst1998/guixi-poc/murrinmurrin"),
    longharbour = ui.import && ui.import("longharbour", "table", {
      "id": "users/danielhirst1998/guixi-poc/longharbour"
    }) || ee.FeatureCollection("users/danielhirst1998/guixi-poc/longharbour"),
    naoshima = ui.import && ui.import("naoshima", "table", {
      "id": "users/danielhirst1998/guixi-poc/naoshima"
    }) || ee.FeatureCollection("users/danielhirst1998/guixi-poc/naoshima"),
    huelva = ui.import && ui.import("huelva", "table", {
      "id": "users/danielhirst1998/guixi-poc/huelva"
    }) || ee.FeatureCollection("users/danielhirst1998/guixi-poc/huelva"),
    visParams_landsat8 = ui.import && ui.import("visParams_landsat8", "imageVisParam", {
      "params": {
        "bands": [
          "B11",
          "B10",
          "B7"
        ],
        "min": 2900,
        "max": 3100
      }
    }) || {"bands":["B11","B10","B7"],"min":2900,"max":3100},
    visParamsModis = ui.import && ui.import("visParamsModis", "imageVisParam", {
      "params": {
        "bands": [
          "Nadir_Reflectance_Band7",
          "Nadir_Reflectance_Band6",
          "Nadir_Reflectance_Band5"
        ],
        "min": 1000,
        "max": 2000
      }
    }) || {"bands":["Nadir_Reflectance_Band7","Nadir_Reflectance_Band6","Nadir_Reflectance_Band5"],"min":1000,"max":2000},
    visParams = ui.import && ui.import("visParams", "imageVisParam", {
      "params": {
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0,
        "max": 3000,
        "gamma": 1.4
      }
    }) || {"bands":["B4","B3","B2"],"min":0,"max":3000,"gamma":1.4},
    visParamsHeatmap = ui.import && ui.import("visParamsHeatmap", "imageVisParam", {
      "params": {
        "min": 2900,
        "max": 3100,
        "palette": [
          "blue",
          "lightgreen",
          "yellow",
          "red"
        ]
      }
    }) || {"min":2900,"max":3100,"palette":["blue","lightgreen","yellow","red"]},
    fireMaskVis = ui.import && ui.import("fireMaskVis", "imageVisParam", {
      "params": {
        "min": 0,
        "max": 6000,
        "bands": [
          "MaxFRP",
          "FireMask",
          "FireMask"
        ]
      }
    }) || {"min":0,"max":6000,"bands":["MaxFRP","FireMask","FireMask"]},
    trueColorVisModis = ui.import && ui.import("trueColorVisModis", "imageVisParam", {
      "params": {
        "min": 0,
        "max": 4000,
        "gamma": 1.4
      }
    }) || {"min":0,"max":4000,"gamma":1.4},
    visParamsS2 = ui.import && ui.import("visParamsS2", "imageVisParam", {
      "params": {
        "bands": [
          "B12",
          "B11",
          "B8A"
        ],
        "min": 0,
        "max": 3000
      }
    }) || {"bands":["B12","B11","B8A"],"min":0,"max":3000},
    ambatovy = ui.import && ui.import("ambatovy", "table", {
      "id": "users/danielhirst1998/guixi-poc/ambatovy"
    }) || ee.FeatureCollection("users/danielhirst1998/guixi-poc/ambatovy");
// ========== DECLARING VARIABLES ========== //
var places = {
  Guixi: guixi,
  Saganoseki: saganoseki,
  "Weda Bay": wedabay,
  "Murrin Murrin": murrinmurrin,
  "Long Harbour": longharbour,
  "Huelva": huelva,
  "Naoshima": naoshima,
  "Ambatovy": ambatovy
};
var sensors = {
  'LANDSAT 8': "LANDSAT/LC08/C01/T1_SR",
  'MODIS': "MODIS/006/MCD43A4",
  'MODIS FIREMASK': "MODIS/006/MOD14A1"
}
var add_landsat8_layers = function(image) {
    Map.addLayer(image, visParams_landsat8, 'thermal')
    Map.addLayer(image, visParams, 'RGB')
    Map.addLayer(image.select('B10'), visParamsHeatmap, 'B10')
    Map.addLayer(image.select('B11'), visParamsHeatmap, 'B11')
    image.select('B10')
    .reduceRegion({
      reducer: ee.Reducer.minMax(),
      geometry: region.geometry(),
      scale: 250,
      maxPixels: 1e9
    })
    .evaluate(function (stats) {
      print(stats)
      var min = stats.B10_min
      var max = stats.B10_max
      var visParams = {
        bands: ['B10'],
        min: min,
        max: max,
        palette: ['blue','lightgreen','yellow','red']
      }
      Map.addLayer(image, visParams, "B10 Normalised")
  })
    image.select('B11')
    .reduceRegion({
      reducer: ee.Reducer.minMax(),
      geometry: region.geometry(),
      scale: 250,
      maxPixels: 1e9
    })
    .evaluate(function (stats) {
      print(stats)
      var min = stats.B11_min
      var max = stats.B11_max
      var visParams = {
        bands: ['B11'],
        min: min,
        max: max,
        palette: ['blue','lightgreen','yellow','red']
      }
      Map.addLayer(image, visParams, "B11 Normalised")
  })
}
var add_modis_firemask_layers = function(image) {
  Map.addLayer(image, fireMaskVis, 'MODIS Firemask')
}
var add_modis_layers = function(image) {
  var trueColor = image.select([
  'Nadir_Reflectance_Band1', 'Nadir_Reflectance_Band4',
  'Nadir_Reflectance_Band3'
]);
  Map.addLayer(trueColor, trueColorVisModis, 'Modis RGB')
  var thermal = image.select([
  'Nadir_Reflectance_Band6', 'Nadir_Reflectance_Band5',
  'Nadir_Reflectance_Band2'
]);
  Map.addLayer(thermal, trueColorVisModis, 'Modis thermal')
}
var layer_functions = {
  'LANDSAT 8': add_landsat8_layers,
  'MODIS': add_modis_layers,
  'MODIS FIREMASK': add_modis_firemask_layers
}
// ========== DEFAULT PARAMETERS ========== //
var region = guixi;
var sensor = "LANDSAT/LC08/C01/T1_SR"
var date = '2021-01-01'
var layer_function = add_landsat8_layers
// ========== SETTING UP SETUP PANEL ========== //
// Main option panel where you choose your options at the start
var panel = ui.Panel();
panel.style().set({
  width: '350px',
  fontSize: '9px',
  position: 'bottom-right'
});
// panel on left that includes the time series
var panel2 = ui.Panel();
panel2.style().set({
  width: '400px',
  fontSize: '9px',
  position: 'top-left'
});
// Central panel with the slider that allows you to scrub between images
var panel3 = ui.Panel();
panel3.style().set({
  width: '600px'});
Map.add(panel);
// Converts map to satellite image by default
Map.setOptions("SATELLITE")
var title = ui.Label("THERMAL PROOF OF CONCEPT")
title.style().set('fontWeight', 'bold');
panel.add(title)
//panel.add(ui.Label("This app takes SAR imagery and subtracts them to detect differences over smelter sites. Currently, this app supports the smelters Guixi and Saganoseki and the uranium mine Port Pirie, with the ability to add more."))
panel.add(ui.Label("1. SELECT YOUR TARGET SMELTER"))
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    region = places[key]
    Map.centerObject(region, 16);
  }
});
select.setPlaceholder('Choose a location...');
panel.add(select)
panel.add(ui.Label("2. SELECT YOUR SATELLITE"))
var select = ui.Select({
  items: Object.keys(sensors),
  onChange: function(key) {
    sensor = sensors[key]
    layer_function = layer_functions[key]
  }
});
select.setPlaceholder('Choose a sensor...');
panel.add(select)
// Removed this from first iteration. We can add in easily, but i didn't have time to implement again
/*
panel.add(ui.Label("2. SELECT THE SENSITIVITY OF THE CHANGE DETECTION MASK"))
//panel.add(ui.Label("The app takes the mean of images of the site, and masks areas that are not different enough from this average. Move the slider to change the number of images used to generate the mean as well as the number of standard deviations away from the mean that the mask covers."))
panel.add(ui.Label("Standard Deviation:"))
var stdev_slider = ui.Slider(1,5,3,1);
stdev_slider.onChange(function(value) {
  mult = value
});
panel.add(stdev_slider)
panel.add(ui.Label("Mean:"))
var mean_slider = ui.Slider(1,10,5,1);
mean_slider.onChange(function(value) {
  mean = value
});
panel.add(mean_slider)
*/
panel.add(ui.Label("3. SELECT  DATE YOU WOULD LIKE TO SEE"))
panel.add(ui.Label("Note: The date that you choose may not be the exact date of acquisition, but instead the closest date to it."))
var startDateSlider = ui.DateSlider({
  start: '2015-01-01',
  end: '2021-03-01',
  value: null,
  period: 1,
  onChange: function(value) {
    date = value;
  }
});
panel.add(startDateSlider.setValue('2021-01-01'));
panel.add(ui.Label("5. RUN THE APP"))
panel.add(ui.Label("Click Run again if you have updated any of the parameters on this panel."))
var button = ui.Button({
  label: 'Run',
  onClick: function() {
    run_thermal_poc(region, layer_function, sensor, date);
  }
});
panel.add(button)
// ========== MAIN FUNCTION ========== //
function run_thermal_poc(region, layer_function, sensor, date) {
  Map.clear()
  Map.add(panel)
  // makes sure dates are ee date objects
  date = ee.Date(date.start())
  var s2_image = ee.ImageCollection("COPERNICUS/S2")
    .filterBounds(region)
    .filterDate(date, date.advance(30, 'day'))
    .first()
    .clip(region.geometry().buffer(2000));
    print(s2_image.select('B12')
    .reduceRegion({
      reducer: ee.Reducer.minMax(),
      geometry: region.geometry(),
      scale: 250,
      maxPixels: 1e9
    }))
      print(s2_image.select('B11')
    .reduceRegion({
      reducer: ee.Reducer.minMax(),
      geometry: region.geometry(),
      scale: 250,
      maxPixels: 1e9
    }))
  Map.addLayer(s2_image,visParamsS2, "Sentinel 2 Thermal (Current Method)")
  // grab all images from region within date range
  var image = ee.ImageCollection(sensor)
    .filterBounds(region)
    .filterDate(date, date.advance(30, 'day'))
    .first()
    .clip(region.geometry().buffer(2000))
  ;
  print(layer_function)
  layer_function(image)
}