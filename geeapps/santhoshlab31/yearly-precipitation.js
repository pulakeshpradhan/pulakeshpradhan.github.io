/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var admin0 = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0"),
    admin2 = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2"),
    admin1 = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level1");
var chirps = ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD");
// Drill-down (Cascading Forms) in Earth Engine
// This script shows how to build hierarchical selection using UI Widgets
// Set-up the panel
var mainPanel = ui.Panel();
mainPanel.style().set({
  width: '300px',
});
ui.root.insert(0,mainPanel);
var title = ui.Label('Yearly Precipitation');
title.style().set({
  'position':  'top-center',
  'fontSize': '24px'
  });
mainPanel.add(title)
// Create a panel to hold the drop-down boxes
var dropdownPanel = ui.Panel();
// Create a panel to hold the result
var resultPanel = ui.Panel();
// Define 3 dropdowns for admin0, admin1 and admin2 names
// Keep them disbled. We will add items later
var admin0Select = ui.Select({
    placeholder: 'please wait..',
  }).setDisabled(true)
var admin1Select = ui.Select({
    placeholder: 'select a country first',
  }).setDisabled(true)
var admin2Select = ui.Select({
  placeholder: 'select a state first',
}).setDisabled(true)
dropdownPanel.add(admin0Select)
dropdownPanel.add(admin1Select)
dropdownPanel.add(admin2Select)
mainPanel.add(dropdownPanel)
mainPanel.add(resultPanel)
c
// *************************
// Define callback functions
// *************************
// We need to do this first since the functions need to
// be defined before they are used.
// Define the onChange() function for admin0Select
var admin0Selected = function(admin0Selection) {
  resultPanel.clear()
  Map.clear()
  admin1Select.items().reset()
  admin2Select.items().reset()
  admin1Select.setPlaceholder('please wait..')
  admin2Select.setPlaceholder('Select a state first..')
  // Now we have admin0 values, fetch admin1 values for that country
  var admin1Names = admin1
    .filter(ee.Filter.eq('ADM0_NAME', admin0Selection))
    .aggregate_array('ADM1_NAME')
    .sort()
  // Use evaluate() to not block the UI
  admin1Names.evaluate(function(items){
    admin1Select.setPlaceholder('selet a state')
    admin1Select.items().reset(items)
    // Now that we have items, enable the menu
    admin1Select.setDisabled(false)
  })
}
// Define the onChange() function for admin1Select
var admin1Selected = function(admin1Selection) {
  resultPanel.clear()
  Map.clear()
  admin2Select.setPlaceholder('please wait..')
  var admin2Names = admin2
      .filter(ee.Filter.eq('ADM1_NAME', admin1Selection))
      .aggregate_array('ADM2_NAME')
      .sort()
  admin2Names.evaluate(function(items){
    admin2Select.setPlaceholder('selet a district')
    admin2Select.items().reset(items)
    admin2Select.setDisabled(false)
  })
}
// Define the onChange() function for admin2Select
var admin2Selected = function(admin1Selection) {
  resultPanel.clear()
  Map.clear()
  var admin0Value = admin0Select.getValue()
  var admin1Value = admin1Select.getValue()
  var admin2Value = admin2Select.getValue()
  // Some regions do not have admin2 values
  // We are on client-side, so using if/else is ok
  if (admin2Value == 'Area without administration at 2nd level') {
      var result = admin1Value + ', ' + admin0Value
      var filtered = admin1.filter(ee.Filter.eq('ADM1_NAME', admin1Value))
  }
  else {
      var result = admin2Value + ', ' + admin1Value + ', ' + admin0Value
      var filtered = admin2.filter(ee.Filter.eq('ADM2_NAME', admin2Value))
  }
  var label = ui.Label(result + ' - Yearly Precipitation')
  resultPanel.add(label)
  Map.centerObject(filtered, 7)
  // Map.addLayer(filtered, {color: 'blue'}, admin2Value)
  var years = ee.List.sequence(1981, 2020)
  var roi = filtered.geometry()
  var getYearlyPrecipitation = function(year){
    var start = ee.Date.fromYMD(year, 1, 1)
    var end = start.advance(1, 'year')
    var image = chirps.filter(ee.Filter.date(start, end)).sum()
    var values = image.reduceRegion({
    reducer:ee.Reducer.mean(),
    geometry:roi,
    scale:5566,
    maxPixels:1e16,
    tileScale:8})
    var precipitation = values.get('precipitation')
    return ee.Feature(null, {'precipitation':precipitation, 'year':year})
  }
  var getMosaic = chirps.mosaic()
    // Display the total rainfall image.
  var palette = ['#ffffcc','#a1dab4','#41b6c4','#2c7fb8','#253494']
  var visParams = {
    min:0,
    max: 2000,
    palette: palette
  }
  Map.addLayer(getMosaic, visParams, result)
  var yearlyPrecipitation = ee.FeatureCollection(years.map(getYearlyPrecipitation))
  // print(yearlyPrecipitation)
  var plot = ui.Chart.feature.byProperty({
    features:yearlyPrecipitation,
    xProperties:'precipitation',
    seriesProperty:'year'
  })
  mainPanel.add(plot)
}
// Register the callback functions
admin0Select.onChange(admin0Selected)
admin1Select.onChange(admin1Selected)
admin2Select.onChange(admin2Selected)
// ******************
// Populate the items
// ******************
// Get all country names and sort them
var admin0Names = admin0.aggregate_array('ADM0_NAME').sort().distinct()
// Fetch the value using evaluate() to not block the UI
admin0Names.evaluate(function(items){
  admin0Select.items().reset(items)
  // Now that we have items, enable the menu
  admin0Select.setDisabled(false)
  // Change placeholder
  admin0Select.setPlaceholder('Select a country')
})
// var years = ee.List.sequence(1981, 2020)
// var getYearlyPrecipitation = function(year){
//   var start = ee.Date.fromYMD(year, 1, 1)
//   var end = start.advance(1, 'year')
//   var image = chirps.filter(ee.Filter.date(start, end)).sum()
//   var values = image.reduceRegion({
//   reducer:ee.Reducer.mean(),
//   geometry:roi,
//   scale:5566,
//   maxPixels:1e16,
//   tileScale:8})
//   var precipitation = values.get('precipitation')
//   return ee.Feature(null, {'precipitation':precipitation, 'year':year})
// }
// var yearlyPrecipitation = ee.FeatureCollection(years.map(getYearlyPrecipitation))
// // print(yearlyPrecipitation)
// var plot = ui.Chart.feature.byProperty({
//   features:yearlyPrecipitation,
//   xProperties:'precipitation',
//   seriesProperty:'year'
// }).setChartType('LineChart')