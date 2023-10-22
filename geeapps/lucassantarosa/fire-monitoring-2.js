var roi = ui.import && ui.import("roi", "table", {
      "id": "projects/ee-lucassantarosa2/assets/Project_areas/Lotes_PAI_01_29_19102022"
    }) || ee.FeatureCollection("projects/ee-lucassantarosa2/assets/Project_areas/Lotes_PAI_01_29_19102022"),
    geometry = ui.import && ui.import("geometry", "table", {
      "id": "projects/ee-lucassantarosa2/assets/Amazon_data/brazilian_legal_amazon"
    }) || ee.FeatureCollection("projects/ee-lucassantarosa2/assets/Amazon_data/brazilian_legal_amazon");
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
  CAPIZAL_I :	[-48.157,-3.819],
  CASTANHAL :	[-59.419,-9.936],
  D_GRAUS_I :	[-48.266,-3.148],
  D_GRAUS_II : [-48.237,-3.125],
  D_GRAUS_VI :	[-48.336,-3.176],
  FLORESTA_1 :	[-48.033,-2.76],
  KATIANA :	[-69.531,-10.292],
  LOTE_104 :	[-59.205,-2.655],
  LOTE_105 :	[-59.207,-2.643],
  LOTE_112 :	[-59.236,-2.624],
  LOTE_113 :	[-59.286,-2.587],
  LOTE_114 :	[-60.27,-1.623],
  LOTE_129 :	[-59.394,-2.489],
  LOTE_133 :	[-59.394,-2.428],
  LOTE_134 :	[-59.423,-2.472],
  LOTE_158 :	[-59.639,-2.146],
  LOTE_171 :	[-59.813,-2.082],
  LOTE_247 :	[-59.337,-1.916],
  LOTE_70 :	[-59.021,-2.848],
  LOTE_81 :	[-59.045,-2.819],
  LOTE_93 :	[-59.119,-2.767],
  NOVA_ESPERANAÇA :	[-48.365,-3.155],
  NUBIA_FLORESTA :	[-48.013,-2.78],
  PALMARES :	[-69.302,-10.136],
  PORONGABA :	[-69.058,-10.085],
  POTIGUAR :	[-69.473,-10.237],
  RIBEIRO_RONDON :	[-48.7,-4.315],
  SÃO_DOMINGOS :	[-48.131,-3.672],
  SERINGAL_LEAL :	[-71.179,-8.16]
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
  var image = selected.reduce(ee.Reducer.median()).clip(geometry)
  var reprojected = image
    .unitScale(-2000, 10000)
    .reproject('EPSG:4326', null, 1000)
  var points = reprojected.sample({region: geometry,geometries: true,})
  var firesVis = {min: 325.0,  max: 400.0, palette: ['red', 'orange', 'yellow']}
  var layerName = 'Fire Alert ' 
  var pontos = 'Point Alert ' 
  Map.addLayer(points, {color:"red"}, pontos);
  //Map.addLayer(selected, firesVis, layerName)
}
button.onClick(loadComposite)
var baseChange = [{featureType: 'all', stylers: [{invert_lightness: true}]}];
Map.setOptions('basemap', {'basemap': baseChange});
Map.addLayer(roi, {color: "yellow"}, 'area')
Map.centerObject(geometry,5)
mainPanel.add(autor)
mainPanel.add(linkinfo)
mainPanel.add(obs)
ui.root.add(mainPanel);