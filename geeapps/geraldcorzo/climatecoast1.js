var Erosion = ui.import && ui.import("Erosion", "table", {
      "id": "users/geraldcorzo/GEPLTC45"
    }) || ee.FeatureCollection("users/geraldcorzo/GEPLTC45"),
    dem = ui.import && ui.import("dem", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/geraldcorzo/GEPLTC45CSV"
    }) || ee.FeatureCollection("users/geraldcorzo/GEPLTC45CSV");
//var a=ui.root.widgets().get(0)
//ui.root.clear();
Map.drawingTools().setShown(false);
//ui.root.add(a)
// import the dem
var elevation = dem.select('elevation');
var slope = ee.Terrain.slope(elevation);
Map.addLayer(slope, {min: 0, max: 1,palette:['00FFFF','0000FF']}, 'slope',false);
var R1=Erosion.select('R1')
Map.addLayer(Erosion.draw({color: '006600', strokeWidth: 1}), {},'Erosion');
// Display as default and with a custom color.
//Map.addLayer(Erosion, {}, 'default display');
var E=Erosion.first()
print('Primer elemento',E)
// Print the number of watersheds.
print('Count:', E.get('R17'));
//Map.addLayer(ecoregions,  {min: 0, max: 1,palette:['00FFFF','0000FF']}, 'colored');
// Create the title label.
var title = ui.Label('Coastal Erosion Climate Scenarios');
title.style().set('position', 'top-center');
Map.add(title);
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'top-left'
});
var Title = ui.Label({
  value: 'Test of loading Erosion data',
  style: {fontSize: '20px', fontWeight: 'bold'}
});
panel.add(Title)
Map.add(panel);
//print('also-',R1.length())
// Make a button widget.
//1     5    17    50    83    95    99
var Options = ui.Select(['Percentile 1',
    'Percentile 5','Percentile 17','Percentile 50','Percentile 83','Percentile 95','Percentile 99'],
    'Please select a percentile');
// Set a callback function to run when the
// button is clicked.
Options.onChange(function() {
  print('Hello, world!');
});
panel.add(Options);
// Register a function to draw a chart when a user clicks on the map.
Map.onClick(function(coords) {
    panel.clear()
    panel.add(Title)
    panel.add(Options)
    var Locationtext='Lat='+coords.lat.toFixed(2)+'  Lon='+coords.lon.toFixed(2)
    print(Locationtext)
    var label = ui.Label(Locationtext);
    var point = ee.Geometry.Point(coords.lon, coords.lat);
//  var chart = ui.Chart.feature.histogram({features: Erosion, property: 'R1', maxBuckets: 30});
//  chart.setOptions({title: 'Return period 1 Year'});
// label.setValue=ee.String('Selected a point ');
    panel.add(label)
//  panel.add(chart);
  });