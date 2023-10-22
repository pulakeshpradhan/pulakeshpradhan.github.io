var guixi = ui.import && ui.import("guixi", "table", {
      "id": "users/danielhirst1998/guixi-poc/guixi-aoi"
    }) || ee.FeatureCollection("users/danielhirst1998/guixi-poc/guixi-aoi"),
    huelva = ui.import && ui.import("huelva", "table", {
      "id": "users/danielhirst1998/guixi-poc/huelva"
    }) || ee.FeatureCollection("users/danielhirst1998/guixi-poc/huelva"),
    longharbour = ui.import && ui.import("longharbour", "table", {
      "id": "users/danielhirst1998/guixi-poc/longharbour"
    }) || ee.FeatureCollection("users/danielhirst1998/guixi-poc/longharbour"),
    murrinmurrin = ui.import && ui.import("murrinmurrin", "table", {
      "id": "users/danielhirst1998/guixi-poc/murrinmurrin"
    }) || ee.FeatureCollection("users/danielhirst1998/guixi-poc/murrinmurrin"),
    naoshima = ui.import && ui.import("naoshima", "table", {
      "id": "users/danielhirst1998/guixi-poc/naoshima"
    }) || ee.FeatureCollection("users/danielhirst1998/guixi-poc/naoshima"),
    portpirie = ui.import && ui.import("portpirie", "table", {
      "id": "users/danielhirst1998/guixi-poc/portpirie"
    }) || ee.FeatureCollection("users/danielhirst1998/guixi-poc/portpirie"),
    saganoseki = ui.import && ui.import("saganoseki", "table", {
      "id": "users/danielhirst1998/guixi-poc/saganoseki"
    }) || ee.FeatureCollection("users/danielhirst1998/guixi-poc/saganoseki"),
    wedabay = ui.import && ui.import("wedabay", "table", {
      "id": "users/danielhirst1998/guixi-poc/wedabay"
    }) || ee.FeatureCollection("users/danielhirst1998/guixi-poc/wedabay"),
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
// ========== DEFAULT PARAMETERS ========== //
var region = guixi;
var date = 2020
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
var title = ui.Label("THERMAL VARIANCE PROOF OF CONCEPT")
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
panel.add(ui.Label("3. SELECT  YEAR YOU WOULD LIKE TO SEE"))
var select = ui.Select({
  items: ['2017', '2018', '2019', '2020', '2021'],
  onChange: function(result) {
    date = result
  }
});
select.setPlaceholder('Choose a location...');
panel.add(select)
panel.add(ui.Label("5. RUN THE APP"))
panel.add(ui.Label("Click Run again if you have updated any of the parameters on this panel."))
var button = ui.Button({
  label: 'Run',
  onClick: function() {
    run_thermal_poc(region, date);
  }
});
panel.add(button)
// ========== MAIN FUNCTION ========== //
function run_thermal_poc(region, date) {
  print(ee.Number.parse(date))
  Map.clear()
  Map.add(panel)
  panel2.clear()
  // makes sure dates are ee date objects
  date = ee.Date.fromYMD(ee.Number.parse(date), 1, 1)
  print(date)
  var image_collection = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR").filterBounds(region).filterDate(date,date.advance(1, 'year'))
  var mean = image_collection.reduce(ee.Reducer.mean())
// print((image.subtract(mean)).pow(2).reduceRegion({
//     reducer: ee.Reducer.mean(),
//     geometry: guixi.geometry(),
//     scale: 250,
//     maxPixels: 1e9
//   }))
// var variances = image_collection.map(function(image) {
//   return (image.subtract(mean)).pow(2)
// })
// print(variances)
  panel2.add(ui.Chart.image.doySeriesByYear(image_collection,'B11',region.geometry(), ee.Reducer.mean()))
  panel2.add(ui.Chart.image.doySeriesByYear(image_collection,'B10',region.geometry(), ee.Reducer.mean()))
  Map.add(panel2)
// print(variance
// .reduceRegion({
//   reducer: ee.Reducer.minMax(),
//   geometry: guixi.geometry(),
//   scale: 250,
//   maxPixels: 1e9
// }))
//     Map.centerObject(guixi, 16);
  var variance = image_collection.reduce(ee.Reducer.variance()).clip(region.geometry());
  print(variance)
  variance.select('B11_variance')
    .reduceRegion({
      reducer: ee.Reducer.minMax(),
      geometry: region.geometry(),
      scale: 250,
      maxPixels: 1e9
    })
    .evaluate(function (stats) {
      var min = stats.B11_variance_min
      var max = stats.B11_variance_max
      var visParams = {
        bands: ['B11_variance'],
        min: min,
        max: max,
        palette: ['blue','lightgreen','yellow','red']
      }
      Map.addLayer(variance, visParams, "Variance B11 Normalised")
  })
  variance.select('B10_variance')
    .reduceRegion({
      reducer: ee.Reducer.minMax(),
      geometry: region.geometry(),
      scale: 250,
      maxPixels: 1e9
    })
    .evaluate(function (stats) {
      var min = stats.B10_variance_min
      var max = stats.B10_variance_max
      var visParams = {
        bands: ['B10_variance'],
        min: min,
        max: max,
        palette: ['blue','lightgreen','yellow','red']
      }
      Map.addLayer(variance, visParams, "Variance B10 Normalised")
  })
}