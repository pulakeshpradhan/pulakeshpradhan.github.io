var filtered = ui.import && ui.import("filtered", "table", {
      "id": "projects/ee-afotesfaye12/assets/eth_admbnda_adm3_csa_bofed_20201027"
    }) || ee.FeatureCollection("projects/ee-afotesfaye12/assets/eth_admbnda_adm3_csa_bofed_20201027");
  var gswYearly = ee.ImageCollection("JRC/GSW1_3/YearlyHistory");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Panels are the main container widgets
var mainPanel = ui.Panel({
  style: {width: '300px'}
});
var title = ui.Label({
  value: 'Surface Water Explorer of Ethiopia ',
  style: {'fontSize': '24px'}
});
// You can add widgets to the panel
mainPanel.add(title)
// You can even add panels to other panels
var admin2Panel = ui.Panel()
mainPanel.add(admin2Panel);
// Let's add a dropdown with the names of admin2 regions
// We need to get all admin2 names and creat a ui.Select object
//var filtered = admin2.filter(ee.Filter.eq('ADM0_NAME', 'Ethiopia'))
var admin2Names = filtered.aggregate_array('ADM3_EN')
// We define a function that will be called when the user selects a value
admin2Names.evaluate(function(names){
  var dropDown = ui.Select({
    placeholder: 'please select Woreda',
    items: names,
    onChange: display
  })
  admin2Panel.add(dropDown)
})
var resultPanel = ui.Panel();
var areaLabel = ui.Label()
resultPanel.add(areaLabel)
mainPanel.add(resultPanel);
// This function will be called when the user changes the value in the dropdown
var display = function(admin2Name) {
  areaLabel.setValue('')
  var selected = ee.Feature(
    filtered.filter(ee.Filter.eq('ADM3_EN', admin2Name)).first())
  var geometry = selected.geometry()
  Map.clear()
  Map.addLayer(geometry, {color: 'grey'}, admin2Name)
  Map.centerObject(geometry, 10)
  var gswYearFiltered = gswYearly.filter(ee.Filter.eq('year', 2020))
  var gsw2020 = ee.Image(gswYearFiltered.first()).clip(geometry)
  var water2020 = gsw2020.eq(2).or(gsw2020.eq(3)).rename('water').selfMask()
  var visParams = {min:0, max:1, palette: ['white','blue']}
  Map.addLayer(water2020, visParams, '2020 Water')
  var area = water2020.multiply(ee.Image.pixelArea()).reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: geometry,
    scale: 30,
    maxPixels: 1e9
  });
  var waterArea = ee.Number(area.get('water')).divide(10000).round();
  waterArea.evaluate(function(result) {
    var text = 'Surface Water Area in the above Woreda as of 2020: ' + result +' Ha'+ ' Author ' + ' Afework Mekeberiaw +251911675804 E-mail: afotesfaye@gmail.com '
    areaLabel.setValue(text)
  })
}
Map.setCenter(39, 10.41, 8)
ui.root.add(mainPanel);