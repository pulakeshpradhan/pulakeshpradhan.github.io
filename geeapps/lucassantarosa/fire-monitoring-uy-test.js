var geometry = ui.import && ui.import("geometry", "table", {
      "id": "projects/ee-lucassantarosa2/assets/UY"
    }) || ee.FeatureCollection("projects/ee-lucassantarosa2/assets/UY");
// Panels are the main container widgets
var mainPanel = ui.Panel({
   layout: ui.Panel.Layout.flow(), 
    style: {
      stretch: 'horizontal',
      height: '100%',
      width: '400px',
      }
});
var title = ui.Label({
  value: 'Fire monitoring with FIRMS dataset',
  style: {'fontSize': '20px'}
});
var datainfo = ui.Label({
  value: 'The Earth Engine version of the Fire Information for Resource Management System (FIRMS) dataset contains the LANCE fire detection product in rasterized form. The near real-time (NRT) active fire locations are processed by LANCE using the standard MODIS MOD14/MYD14 Fire and Thermal Anomalies product. Each active fire location represents the centroid of a 1km pixel that is flagged by the algorithm as containing one or more fires within the pixel. The data are rasterized as follows: for each FIRMS active fire point, a 1km bounding box (BB) is defined; pixels in the MODIS sinusoidal projection that intersect the FIRMS BB are identified; if multiple FIRMS BBs intersect the same pixel, the one with higher confidence is retained; in case of a tie, the brighter one is retained.',
  style: {'fontSize': '12px'}
});
var linkinfo = ui.Label({
  value: 'https://developers.google.com/earth-engine/datasets/catalog/FIRMS#description',
  style: {'fontSize': '09px'}
});
var autor = ui.Label({
  value: 'Edition: Lucas Vituri Santarosa',
  style: {'fontSize': '11px'}
});
var obs = ui.Label({
  value: 'Obs.: Data is released 3 or 4 days late',
  style: {'fontSize': '10px'}
});
// You can add widgets to the panel
mainPanel.add(title)
mainPanel.add(datainfo)
// You can even add panels to other panels
var dropdownPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
});
mainPanel.add(dropdownPanel);
var yearSelector = ui.Select({
  placeholder: 'please wait..',
  })
var monthSelector = ui.Select({
  placeholder: 'please wait..',
  })
var daySelector = ui.Select({
  placeholder: 'please wait..',
  })
var button = ui.Button('Load')
dropdownPanel.add(yearSelector)
dropdownPanel.add(monthSelector)
dropdownPanel.add(daySelector)
var dropdownPanel2 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
});
mainPanel.add(dropdownPanel2);
var yearSelector2 = ui.Select({
  placeholder: 'please wait..',
  })
var monthSelector2 = ui.Select({
  placeholder: 'please wait..',
  })
var daySelector2 = ui.Select({
  placeholder: 'please wait..',
  })
var button = ui.Button('Load')
dropdownPanel2.add(yearSelector2)
dropdownPanel2.add(monthSelector2)
dropdownPanel2.add(daySelector2)
dropdownPanel2.add(button)
// Let's add a dropdown with the years
var years = ee.List.sequence(2019, 2022)
var months = ee.List.sequence(1, 12)
var days = ee.List.sequence(1, 31)
// Dropdown items need to be strings
var yearStrings = years.map(function(year){
  return ee.Number(year).format('%04d')
})
var monthStrings = months.map(function(month){
  return ee.Number(month).format('%02d')
})
var dayStrings = days.map(function(day){
  return ee.Number(day).format('%02d')
})
// Evaluate the results and populate the dropdown
yearStrings.evaluate(function(yearList) {
  yearSelector.items().reset(yearList)
  yearSelector.setPlaceholder('select a year')
})
monthStrings.evaluate(function(monthList) {
  monthSelector.items().reset(monthList)
  monthSelector.setPlaceholder('select a month')
})
dayStrings.evaluate(function(dayList) {
  daySelector.items().reset(dayList)
  daySelector.setPlaceholder('select a day')
})
yearStrings.evaluate(function(yearList) {
  yearSelector2.items().reset(yearList)
  yearSelector2.setPlaceholder('select a year')
})
monthStrings.evaluate(function(monthList) {
  monthSelector2.items().reset(monthList)
  monthSelector2.setPlaceholder('select a month')
})
dayStrings.evaluate(function(dayList) {
  daySelector2.items().reset(dayList)
  daySelector2.setPlaceholder('select a day')
})
//Select Location 
var dropdownPanel3 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
});
mainPanel.add(dropdownPanel3);
var places = {
  ARTIGAS : [-56.172,-30.619],
  CANELONES:[-55.549,-34.789], 
  CERROLARGO:[-53.808,-32.069],
  COLONIA:[-57.822,-34.474],
  DURAZNO:[-55.309,-32.49],
  FLORES:[-57.188,-33.766],
  FLORIDA:[-56.422,-33.88],
  LAVALLEJA:[-55.52,-34.516],
  MALDONADO:[-54.845,-34.387],
  MONTEVIDEO:[-56.34,-34.753],
  PAYSANDÚ:[-56.394,-32.258],
  RÌONEGRO:[-57.95,-33.066],
  RIVERA:[-54.531,-31.503],
  ROCHA:[-53.532,-33.619],
  SALTO:[-56.353,-31.617],
  SANJOSÉ:[-56.359,-34.783],
  SORIANO:[-57.211,-33.566],
  TACUAREMBÓ:[-56.302,-31.74],
  TREINTAYTRES:[-54.097,-32.789],
};
var LocalSelector = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    Map.setCenter(places[key][0], places[key][1], 12);
  }
});
LocalSelector.setPlaceholder('Choose a location...');
var button2 = ui.Button('Load')
dropdownPanel3.add(LocalSelector)
// Define a function that triggers when any value is changed
var loadComposite = function() {
  var col = ee.ImageCollection('FIRMS')
  var year = yearSelector.getValue()
  var month = monthSelector.getValue()
  var day = daySelector.getValue()
  var year2 = yearSelector2.getValue()
  var month2 = monthSelector2.getValue()
  var day2 = daySelector2.getValue()
  var startDate = ee.Date.fromYMD(
    ee.Number.parse(year), ee.Number.parse(month), ee.Number.parse(day))
  var endDate = ee.Date.fromYMD(
    ee.Number.parse(year2), ee.Number.parse(month2), ee.Number.parse(day2))
  var filtered = col.filter(ee.Filter.date(startDate, endDate))
  var selected = filtered.select('T21')
  var firesVis = {min: 325.0,  max: 400.0, palette: ['red', 'orange', 'yellow']}
  var layerName = 'Fire Alert ' 
  Map.addLayer(selected, firesVis, layerName)
}
button.onClick(loadComposite)
var baseChange = [{featureType: 'all', stylers: [{invert_lightness: true}]}];
Map.setOptions('basemap', {'basemap': baseChange});
Map.centerObject(geometry,7)
mainPanel.add(autor)
mainPanel.add(linkinfo)
mainPanel.add(obs)
ui.root.add(mainPanel);