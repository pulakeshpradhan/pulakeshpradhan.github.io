// Panels are the main container widgets
var mainPanel = ui.Panel({
  style: {width: '400px'}
});
var title = ui.Label({
  value: 'Set a threshold %',
  style: {'fontSize': '24px'}
});
// You can add widgets to the panel
mainPanel.add(title)
// You can even add panels to other panels
var dropdownPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
});
mainPanel.add(dropdownPanel);
var thresholdSelector = ui.Select({
  placeholder: 'please wait..',
  })
/*
var monthSelector = ui.Select({
  placeholder: 'please wait..',
  })*/
var button = ui.Button('Assign')
dropdownPanel.add(thresholdSelector)
// dropdownPanel.add(monthSelector)
dropdownPanel.add(button)
// Let's add a dropdown with the years
var thr = ee.List.sequence(30, 70) 
print(thr)
// var months = ee.List.sequence(1, 12)
// Dropdown items need to be strings
var thresholdStrings = thr.map(function(thr){
  return ee.Number(thr).format('%02d')
})
// var monthStrings = months.map(function(month){
//   return ee.Number(month).format('%02d')
// })
// Evaluate the results and populate the dropdown
thresholdStrings.evaluate(function(thresholdList) {
  thresholdSelector.items().reset(thresholdList)
  thresholdSelector.setPlaceholder('select a threshold (%)')
})
// monthStrings.evaluate(function(monthList) {
//   monthSelector.items().reset(monthList)
//   monthSelector.setPlaceholder('select a month')
// })
var col = ee.Image("users/angelini75/GBSmap_v1_prob");
  var visualization = {
  bands: ['b1'],
  min: 0.0,
  max: 100.0,
  palette: ["f5e79f", "d59455","703737"]
  }  
Map.addLayer(col, visualization, "Black Soils probability (%)");
// Create a panel and add it to the map.
var inspector = ui.Panel([ui.Label('Click to get probability values')]);
Map.add(inspector);
Map.onClick(function(coords) {
  // Show the loading label.
  inspector.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Determine the mean NDVI, a server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var d = col.reduce('mean');
  print(d)
  var sample = d.sample(point, 30);
  var computedValue = sample.first().get('mean');
print(computedValue)
  // Request the value from the server.
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector.widgets().set(0, ui.Label({
      value: 'probability: ' + result + '%' ,
    }));
  });
});
// Define a function that triggers when any value is changed
var loadComposite = function() {
  // col = col.updateMask(col.eq('nan'))
  // print(col)
  var thr = thresholdSelector.getValue()
  var thr2 = ee.Number.parse(thr)
  var cat = col.gt(thr2)
  var visualization2 = {
  bands: ['b1'],
  palette: ["fae67800","703737"]
  }
  var layerName = 'Black Soils ' + '- prob - ' + thr
  Map.addLayer(cat, visualization2, layerName)
  // inspector 
  // Configure the map.
Map.style().set('cursor', 'crosshair');
}
button.onClick(loadComposite)
// Map.setCenter(76.43, 12.41, 8)
ui.root.add(mainPanel);
// #######################################################
// var dataset = ee.Image("users/angelini75/GBSmap_gapFilled_v0_92");