var filtered = ui.import && ui.import("filtered", "table", {
      "id": "projects/ee-afotesfaye12/assets/eth_admbnda_adm3_csa_bofed_20201027"
    }) || ee.FeatureCollection("projects/ee-afotesfaye12/assets/eth_admbnda_adm3_csa_bofed_20201027");
/**** Start of imports. If edited, may not auto-convert in the playground. ****/
//var admin2 = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2"),
 var gswYearly = ee.ImageCollection("JRC/GSW1_3/YearlyHistory");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Panels are the main container widgets
var mainPanel = ui.Panel({
  style: {width: '300px'}
});
var title = ui.Label({
  value: 'Woreda level Surface Water Explorer',
  style: {'fontSize': '24px'}
});
// You can add widgets to the panel
mainPanel.add(title)
// You can even add panels to other panels
var admin2Panel = ui.Panel()
mainPanel.add(admin2Panel);
// Let's add a dropdown with the names of admin2 regions
// We need to get all admin2 names and creat a ui.Select object
//var filtered = admin2.filter(ee.Filter.eq('ADM1_NAME', 'Karnataka'))
var admin2Names = filtered.aggregate_array('ADM3_EN')
// We define a function that will be called when the user selects a value
admin2Names.evaluate(function(names){
  var dropDown = ui.Select({
    placeholder: 'select a woreda',
    items: names,
    onChange: display
  })
  admin2Panel.add(dropDown)
})
var resultPanel = ui.Panel();
var areaLabel1 = ui.Label()
var areaLabel2 = ui.Label()
resultPanel.add(areaLabel1)
resultPanel.add(areaLabel2)
mainPanel.add(resultPanel);
// This function will be called when the user changes the value in the dropdown
var display = function(admin2Name) {
  areaLabel1.setValue('')
  areaLabel2.setValue('')
  var selected = ee.Feature(
    filtered.filter(ee.Filter.eq('ADM3_EN', admin2Name)).first())
  var geometry = selected.geometry()
  leftMap.layers().reset()
  rightMap.layers().reset()
  leftMap.addLayer(geometry, {color: 'grey'}, admin2Name)
  rightMap.addLayer(geometry, {color: 'grey'}, admin2Name)
  leftMap.centerObject(geometry, 10)
  var visParams = {min:0, max:1, palette: ['white','blue']}
  var gswYearFiltered = gswYearly.filter(ee.Filter.eq('year', 2010))
  var gsw2010 = ee.Image(gswYearFiltered.first()).clip(geometry)
  var water2010 = gsw2010.eq(2).or(gsw2010.eq(3)).rename('water').selfMask()
  leftMap.addLayer(water2010, visParams, '2010 Water')
  var gswYearFiltered = gswYearly.filter(ee.Filter.eq('year', 2020))
  var gsw2020 = ee.Image(gswYearFiltered.first()).clip(geometry)
  var water2020 = gsw2020.eq(2).or(gsw2020.eq(3)).rename('water').selfMask()
  rightMap.addLayer(water2020, visParams, '2020 Water')
   var area2010 = water2010.multiply(ee.Image.pixelArea()).reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: geometry,
    scale: 30,
    maxPixels: 1e9
  });
  var waterArea2010 = ee.Number(area2010.get('water')).divide(10000).round();
  waterArea2010.evaluate(function(result) {
    var text = 'Woreda Surface Water Area  in 2010: ' + result + ' Hectares'
    areaLabel1.setValue(text)
  })
  var area2020 = water2020.multiply(ee.Image.pixelArea()).reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: geometry,
    scale: 30,
    maxPixels: 1e9
  });
  var waterArea2020 = ee.Number(area2020.get('water')).divide(10000).round();
  waterArea2020.evaluate(function(result) {
    var text = 'Woreda Surface Water Area in 2020: ' + result + ' Hectares'
    areaLabel2.setValue(text)
  })
}
// Create two maps.
var center = {lon: 39.43, lat: 9.41, zoom: 8};
var leftMap = ui.Map(center);
var rightMap = ui.Map(center);
// Link them together.
var linker = new ui.Map.Linker([leftMap, rightMap]);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
var yearLabel1 = ui.Label({value: '2010',
  style: {'fontSize': '20px', backgroundColor: '#f7f7f7', position:'top-left'}});
var yearLabel2 = ui.Label({value: '2020',
  style: {'fontSize': '20px', backgroundColor: '#f7f7f7', position:'top-right'}});
leftMap.setControlVisibility(false);
rightMap.setControlVisibility(false);
leftMap.add(yearLabel1)
rightMap.add(yearLabel2)
Map.setCenter(39.43, 9.41, 8)
ui.root.clear()
ui.root.add(splitPanel);
ui.root.add(mainPanel);