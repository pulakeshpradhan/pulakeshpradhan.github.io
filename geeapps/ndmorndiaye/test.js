var senegal = ui.import && ui.import("senegal", "table", {
      "id": "users/ndmorndiaye/senegal_dep"
    }) || ee.FeatureCollection("users/ndmorndiaye/senegal_dep");
// Reducing Feature Collection
// Import department limit of senegal
senegal=ee.FeatureCollection(senegal);
// Load an image of daily precipitation in mm/day.
var precip = ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD').select('precipitation')
.filterDate('2020-01-01', '2020-08-15')
.filterBounds(senegal)
.sum();
// Collection to generate Chart
var precipa = ee.ImageCollection('UCSB-CHG/CHIRPS/PENTAD').select('precipitation')
.filterDate('2020-01-01', '2020-08-15')
.filterBounds(senegal);
// Display total annual rainfall 
var RF_PALETTE = "ff0000, ffff00, 00ffff, 0000ff";
//Map.addLayer(precip.clip(senegal), {min:3.4962849645744, max:251.25987514857843, bands:["precipitation"], "palette": RF_PALETTE}, "Rainfall");
//Dep Map
//var ess=Map.addLayer(ee.Image().paint(senegal,"black",1))
//Map.addLayer(world, {}, "World)");
//Map.centerObject(senegal, 2);
// Summarize by department using reducer
var precip_dep = precip.reduceRegions({
  collection: senegal,
  reducer: ee.Reducer.mean(),
  scale: 1000,
});
// Top 10 countries with the highest rainfall
//var high_rainfall = precip_dep.sort('mean', false).limit(10);
//print(high_rainfall);
//Export{table
//Export.table(high_rainfall, 'High_Rainfall_Countries_2017', {fileFormat: 'CSV'});
var options = {
  title: 'Evolution de la pluviometrie 2020-2021',
  hAxis: {title: 'Dates'},
  vAxis: {title: 'Rainfall'},
  lineWidth: 1,
  pointSize: 4,
};
var graph=ui.Chart.image.series(precipa,senegal,
ee.Reducer.sum(),1000).setOptions(options);
//var display=ui.Panel()
var map=ui.Map()
map.addLayer(precip.clip(senegal), {min:3.4962849645744, max:251.25987514857843, bands:["precipitation"], "palette": RF_PALETTE}, "Rainfall");
map.addLayer(ee.Image().paint(senegal,"black",1));
//map.add(graph)
//var display = ui.Panel({
  //widgets: [ui.Label("Pluviometrie")],
  //layout: ui.Panel.Layout.flow('vertical'),
  //style: {
    //position: 'bottom-right',
  //},
//});
//display.add(graph)
//map.add(display)
map.centerObject(senegal, 6);
//ui.root.clear();
//ui.root.add(map);
//Map.addLayer(world, {}, "World)");
var panel = ui.Panel();
var title = ui.Label('Rainfall season 2020-2021 in Senegal')
//var instructions = ui.Label('Click on the map to show NDVI chart.')
//var chartPanel = ui.Panel();
panel.add(title);
//panel.add(instructions);
panel.add(graph);
var splitPanel = ui.SplitPanel({
  firstPanel: panel,
  secondPanel: map,
});
ui.root.clear();
ui.root.add(splitPanel);