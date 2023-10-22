var Amazon = ui.import && ui.import("Amazon", "table", {
      "id": "projects/ee-josiascruz75/assets/RHA_TOA"
    }) || ee.FeatureCollection("projects/ee-josiascruz75/assets/RHA_TOA");
// Panels are the main container widgets
var mainPanel = ui.Panel({
  style: {width: '300px'}
});
var titleCN = ui.Label({
  value: 'CURVER NUMBER',
  style: {'fontSize': '24px'}
});
// You can add widgets to the panel
mainPanel.add(titleCN)
// You can even add panels to other panels
var dropdownPanelCN = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
});
mainPanel.add(dropdownPanelCN);
var yearSelectorCN = ui.Select({
  placeholder: 'please wait..',
  })
var buttonCN = ui.Button('Load')
dropdownPanelCN.add(yearSelectorCN)
dropdownPanelCN.add(buttonCN)
// Let's add a dropdown with the years
var yearsCN = ee.List([2009,2014,2019,2024,2029,2034,2039,2044,2049])
var monthsCN = ee.List.sequence(1, 12)
// Dropdown items need to be strings
var yearStringsCN = yearsCN.map(function(year){
  return ee.Number(year).format('%04d')
})
/*var monthStrings = months.map(function(month){
  return ee.Number(month).format('%02d')
})*/
// Evaluate the results and populate the dropdown
yearStringsCN.evaluate(function(yearList) {
  yearSelectorCN.items().reset(yearList)
  yearSelectorCN.setPlaceholder('select a year')
})
var loadCN = function() {
  var colCN = ee.ImageCollection('projects/ee-josiascruz/assets/CN').select('b1')
  var year = yearSelectorCN.getValue()
  var startDate = ee.Date.fromYMD(
    ee.Number.parse(year), ee.Number(1), 1)
  var endDate =  ee.Date.fromYMD(
    ee.Number.parse(year), ee.Number(1), 31)
  var filteredCN = colCN.filter(ee.Filter.date(startDate, endDate))
  var imageCN = ee.Image(filteredCN.sum().clip(Amazon))
  var CNVis = {min: 55, max: 100, palette:["#002de1","#d95049","#c6ff53","#eaa03f","#98fae7","#5bb5ff","#a59283","#fffce1" ]}
  var layerName = 'CN ' + year + '-'+'Amazon'
  Map.addLayer(imageCN, CNVis, layerName)
  Export.image.toDrive({
   image: imageCN,
   description:'CN',
   region: Amazon,
   scale:30,
   crs:'EPSG:4326',
   folder:'CN',
   maxPixels:1000000000000
});
}
buttonCN.onClick(loadCN)
Map.setOptions('SATELLITE')
Map.centerObject (Amazon,5)
ui.root.add(mainPanel);