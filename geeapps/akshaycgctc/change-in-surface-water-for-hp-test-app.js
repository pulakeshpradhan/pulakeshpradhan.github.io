var gswYearly = ui.import && ui.import("gswYearly", "imageCollection", {
      "id": "JRC/GSW1_3/YearlyHistory"
    }) || ee.ImageCollection("JRC/GSW1_3/YearlyHistory"),
    admin2 = ui.import && ui.import("admin2", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2");
// Panels are the main container widgets
var mainPanel = ui.Panel({
  style: {width: '300px'}
});
var title = ui.Label({
  value: 'Surface Water Explorer HP',
  style: {'fontSize': '24px'}
});
// You can add widgets to the panel
mainPanel.add(title)
// You can even add panels to other panels
var admin2Panel = ui.Panel()
mainPanel.add(admin2Panel);
// Let's add a dropdown with the names of admin2 regions
// We need to get all admin2 names and creat a ui.Select object
var filtered = admin2.filter(ee.Filter.eq('ADM1_NAME', 'Himachal Pradesh'))
var admin2Names = filtered.aggregate_array('ADM2_NAME').sort()
// We define a function that will be called when the user selects a value
admin2Names.evaluate(function(names){
  var dropDown = ui.Select({
    placeholder: 'select a region',
    items: names,
    onChange: display
  })
  admin2Panel.add(dropDown)
})
// This function will be called when the user changes the value in the dropdown
var display = function(admin2Name) {
  var selected = ee.Feature(
    filtered.filter(ee.Filter.eq('ADM2_NAME', admin2Name)).first())
  var geometry = selected.geometry()
  Map.clear()
  Map.addLayer(geometry, {color: 'grey'}, admin2Name)
  Map.centerObject(geometry, 10)
  var gswYearFiltered = gswYearly.filter(ee.Filter.eq('year', 2012))
  var gswYearFiltered1 = gswYearly.filter(ee.Filter.eq('year', 2013))
  var gswYearFiltered2 = gswYearly.filter(ee.Filter.eq('year', 2020))
  var gswYearFiltered3 = gswYearly.filter(ee.Filter.eq('year', 2000))
  var gsw2012 = ee.Image(gswYearFiltered.first()).clip(geometry)
  var gsw2013 = ee.Image(gswYearFiltered1.first()).clip(geometry)
  var gsw2020 = ee.Image(gswYearFiltered2.first()).clip(geometry)
  var gsw2000 = ee.Image(gswYearFiltered2.first()).clip(geometry)
  var water2012 = gsw2012.eq(2).or(gsw2012.eq(3)).rename('water12').selfMask()
  var water2013 = gsw2013.eq(2).or(gsw2013.eq(3)).rename('water13').selfMask()
  var water2020 = gsw2020.eq(2).or(gsw2020.eq(3)).rename('water20').selfMask()
  var water2000 = gsw2020.eq(2).or(gsw2000.eq(3)).rename('water00').selfMask()
  var visParams = {min:0, max:1, palette: ['white','blue']}
  Map.addLayer(water2012, visParams, '2012 Water')
  Map.addLayer(water2013, visParams, '2013 Water')
  Map.addLayer(water2020, visParams, '2020 Water')
  Map.addLayer(water2000, visParams, '2000 Water')
}
Map.setCenter(77.1264, 31.4082, 8)
ui.root.add(mainPanel);
// Panels are the main container widgets
// var mainPanel = ui.Panel({
//   style: {width: '300px'}
// });
// var title = ui.Label({
//   value: 'Surface Water Explorer HP',
//   style: {'fontSize': '24px'}
// });
// // You can add widgets to the panel
// mainPanel.add(title)
// // You can even add panels to other panels
// var admin2Panel = ui.Panel()
// mainPanel.add(admin2Panel);
// // Let's add a dropdown with the names of admin2 regions
// // We need to get all admin2 names and creat a ui.Select object
// var filtered = admin2.filter(ee.Filter.eq('ADM1_NAME', 'Himachal Pradesh'))
// var admin2Names = filtered.aggregate_array('ADM2_NAME').sort()
// // We define a function that will be called when the user selects a value
// admin2Names.evaluate(function(names){
//   var dropDown = ui.Select({
//     placeholder: 'select a region',
//     items: names,
//     onChange: display
//   })
//   admin2Panel.add(dropDown)
// })
// // This function will be called when the user changes the value in the dropdown
// var display = function(admin2Name) {
//   var selected = ee.Feature(
//     filtered.filter(ee.Filter.eq('ADM2_NAME', admin2Name)).first())
//   var geometry = selected.geometry()
//   Map.clear()
//   Map.addLayer(geometry, {color: 'grey'}, admin2Name)
//   Map.centerObject(geometry, 10)
//   var gswYearFiltered = gswYearly.filter(ee.Filter.eq('year', 2020))
//   var gsw2020 = ee.Image(gswYearFiltered.first()).clip(geometry)
//   var water2020 = gsw2020.eq(2).or(gsw2020.eq(3)).rename('water').selfMask()
//   var visParams = {min:0, max:1, palette: ['white','blue']}
//   Map.addLayer(water2020, visParams, '2020 Water')
// }
// // Akshay