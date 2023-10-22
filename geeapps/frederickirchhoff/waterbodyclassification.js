/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var table = ee.FeatureCollection("users/imazonfred/MapBiomasAGUA/annual_series/classifications/classified_objects_2016");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var col = ee.FeatureCollection(table); 
//var barragens_col = col.filterBounds(barragens);
var ant_col = col.filter(ee.Filter.gte('class', 3));
var amz_legal = ee.FeatureCollection("ft:1bX7IOWzLBM0rb2Krv0v0TWsrX8DGQN_oy1KjyOrG");
var amz = ee.Feature(amz_legal.first()).geometry();
Map.addLayer(ee.Image(1).clip(amz), {palette: '808080'}, 'amz');
Map.addLayer(ee.Image(1), {palette: '000000'}, 'background', false, 0.25);
Map.addLayer(
  col.reduceToImage(['class'], ee.Reducer.max()),
  {min:1, max: 6, palette: '0000ff, 0000ff, 00ffff, 00ffff, 800080, DB7093'},
  'water bodies',
  true
  );
//Map.addLayer(barragens_col.reduceToImage(['class'], ee.Reducer.max()), {palette: '00ffff'}, 'correction', false);
//Map.addLayer(ant_col.reduceToImage(['class'], ee.Reducer.max()), {min:3, max:6, palette: '00ffff, 00ffff, 800080, DB7093'}, 'ant_col', false);
  var names_ant = ['Natural Water Bodies', 'Anthropic Dams', 'Hydro Power Plants', 'Water within Mines'];
  var colors_ant = ['0000ff', '00ffff', '800080', 'DB7093'];
var legend_tool = require('users/frederickirchhoff/shortcuts:legendize');
var legend = legend_tool.legendize('Water Body Classification', names_ant, colors_ant);
Map.add(legend);