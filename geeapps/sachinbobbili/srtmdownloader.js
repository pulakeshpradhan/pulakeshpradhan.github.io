var admin2 = ee.FeatureCollection("users/sachinbobbili/India_Dist");
var dem = ee.Image("CGIAR/SRTM90_V4");
// Panels are the main container widgets
var mainPanel = ui.Panel({
  style: {width: '400px'}
});
var title = ui.Label({
  value: 'Telangana District wise DEM view',
  style: {'fontSize': '24px'}
});
// You can add widgets to the panel
mainPanel.add(title)
// You can even add panels to other panels
var admin2Panel = ui.Panel()
mainPanel.add(admin2Panel);
// Let's add a dropdown with the names of admin2 regions
// We need to get all admin2 names and creat a ui.Select object
var filtered = admin2.filter(ee.Filter.eq('stname', 'TELANGANA'))
var admin2Names = filtered.aggregate_array('dtname')
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
    filtered.filter(ee.Filter.eq('dtname', admin2Name)).first())
  var geometry = selected.geometry()
  Map.clear()
  //Map.addLayer(geometry, {color: 'red'}, admin2Name)
  Map.centerObject(geometry, 10)
  //Selected DEM 
  var srtm = ee.Image(dem.select('elevation')).clip(geometry)
  var srtm_dem = srtm.rename('elevation').selfMask()
  var visParams = {min:0, max:990, palette: ['3ae237', 'b5e22e', 'd6e21f', 'fff705', 'ffd611', 'ffb613', 'ff8b13',
    'ff6e08', 'ff500d', 'ff0000', 'de0101', 'c21301', '0602ff', '235cb1',
    '307ef3', '269db1', '30c8e2', '32d3ef', '3be285', '3ff38f', '86e26f']}
  Map.addLayer(srtm_dem, visParams, 'SRTM_Elevation')
}
ui.root.add(mainPanel);
// Change the ADM1_NAME to a State/Provice in your region
// Change the Map.setCenter to center the map on the chosen region
// Test the App