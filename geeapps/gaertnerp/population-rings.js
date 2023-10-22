var population = ee.ImageCollection('JRC/GHSL/P2016/POP_GPW_GLOBE_V1').select('population_count');
var population_vis = population.filterDate('2015-01-01', '2015-12-31');
var population = population.toBands().rename('1975','1990','2000', '2015');//1975-1990-2000-2015
//print(population)
//var palettes = require('users/gena/packages:palettes');
//var palette = palettes.matplotlib.viridis[7];
//print(palette);
var vis = {min: 0, max: 200, palette: ['#440154','#433982','#30678D','#218F8B','#36B677','#8ED542','#FDE725']};
Map.addLayer(population_vis, vis, 'Background: Population Count 2015', true, 0.85);
//var slider = ui.Slider(10000,100000000,500000, 10000)
var area = 100000000
//slider.setValue(20000) , // Set a default value.
//slider.onChange(function(value) {
 // Map.layers().get(0).setOpacity(value);
// var area = value
//});
//Map.add(slider);
//
var circle_radius = Math.sqrt(area / Math.PI);
//print('circle_radius',circle_radius)
var solve_for_outer_radius = function(area, circle_radius){
var ring_outer_radius = Math.sqrt(Math.pow(circle_radius,2) + (area / Math.PI))
//print('ring_outer_radius',ring_outer_radius)
return ring_outer_radius
}
//print(solve_for_outer_radius(area, 218.50968611841583))
Map.setCenter(-0.10, 51.49, 9);
Map.setOptions('SATELLITE');
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '550px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Population Rings',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Population of rings with equal areas from any point in the world since 1975 until 2015.'),
  ui.Label("Inspired by Tom Forth's blogpost", {},'https://tomforth.co.uk/ringpopulations/'),
  ui.Label('Click a point on the map to inspect.')
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var pnt = ui.Map.Layer(point,{}, 'Clicked Point');
  Map.layers().set(1, pnt);
  var zone_1   = ee.FeatureCollection(ee.Feature(point.buffer(circle_radius),{label:'Zone 1'}));
  print('area zone 1:', zone_1.geometry().area())
  var circle_1 = ui.Map.Layer(zone_1.geometry(), {color: '#bd0026'}, 'Zone 1');
  Map.layers().set(2, circle_1);
  var outer_radius_zone_2 = solve_for_outer_radius(area, circle_radius);
  var zone_2   = ee.FeatureCollection(ee.Feature(point.buffer(outer_radius_zone_2).difference(zone_1.geometry()),{label:'Zone 2'}));
  print('area zone 2:', zone_2.geometry().area())
  var circle_2 = ui.Map.Layer(zone_2.geometry(), {color: '#f03b20'}, 'Zone 2');
  Map.layers().set(3, circle_2);
  var outer_radius_zone_3 = solve_for_outer_radius(area, outer_radius_zone_2);
  var zone_3   = ee.FeatureCollection(ee.Feature(point.buffer(outer_radius_zone_3).difference(zone_2.geometry()).difference(zone_1.geometry()),{label:'Zone 3'}));
  print('area zone 3:', zone_3.geometry().area())
  var circle_3 = ui.Map.Layer(zone_3.geometry(), {color: '#fd8d3c'}, 'Zone 3');
  Map.layers().set(4, circle_3);
  var outer_radius_zone_4 = solve_for_outer_radius(area, outer_radius_zone_3);
  var zone_4   = ee.FeatureCollection(ee.Feature(point.buffer(outer_radius_zone_4).difference(zone_3.geometry()).difference(zone_2.geometry()).difference(zone_1.geometry()),{label:'Zone 4'}));
  print('area zone 4:', zone_4.geometry().area())
  var circle_4 = ui.Map.Layer(zone_4.geometry(), {color: '#fecc5c'}, 'Zone 4');
  Map.layers().set(5, circle_4);
  var outer_radius_zone_5 = solve_for_outer_radius(area, outer_radius_zone_4);
  var zone_5   = ee.FeatureCollection(ee.Feature(point.buffer(outer_radius_zone_5).difference(zone_4.geometry()).difference(zone_3.geometry()).difference(zone_2.geometry()).difference(zone_1.geometry()),{label:'Zone 5'}));
  print('area zone 5:', zone_5.geometry().area())
  var circle_5 = ui.Map.Layer(zone_5.geometry(), {color: '#ffffb2'}, 'Zone 5');
  Map.layers().set(6, circle_5);
var zones = zone_1.merge(zone_2).merge(zone_3).merge(zone_4).merge(zone_5);
  var sum_pop_zones = population.reduceRegions({
  collection: zones,
  reducer: ee.Reducer.sum(),
  scale: 250,
});
  // Define the chart and print it to the console.
var chart = ui.Chart.feature
                .byProperty({
                  features: sum_pop_zones,
                  seriesProperty: 'label'
                })
                .setChartType('ScatterChart')
                .setOptions({
                  title: 'Population Grid 1975-1990-2000-2015',
                  hAxis: {
                    title: 'Year',
                    titleTextStyle: {italic: false, bold: true},
                  },
                  vAxis: {
                    title: 'Number of people',
                    titleTextStyle: {italic: false, bold: true}
                  },
                  colors: ['#bd0026','#f03b20','#fd8d3c','#fecc5c','#ffffb2'],
                  lineSize: 4,
                  pointSize: 0
                });
  panel.widgets().set(2, chart);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);