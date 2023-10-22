/*
This script uses to visualize the gloal urban extent dynamics (30m) from 1982-2017
Author: lixuecaosysu@gmail.com
*/
//  ###### Setting of the basic map ######
//  -------------------------------------------------------------
Map.setOptions('SATELLITE');
//  -------------------------------------------------------------
// //  ###### Added fishgrid to track their differences ######
// //  -------------------------------------------------------------
// var gFish = ee.FeatureCollection('users/shellyhu7780/FusionTables/gFish_1deg_filterByContinent_filterByNTLurban');
// //  *** visualize for specific region
// var selFish = gFish.filter(ee.Filter.eq('Id', 3004));
// var outline = ee.Image().byte().paint({
//   featureCollection: selFish, 
//   width: 2,
// })
// Map.centerObject(selFish, 9); Map.addLayer(outline, {palette: 'ffdcb8'}, 'outline')
// //  -------------------------------------------------------------
//  ###### Load our map ######
//  -------------------------------------------------------------
var urbanCmb2 = ee.Image('users/lixuecaosysu/UrbanProduct/gUrbanTS_1983_2018_v5')
                  // .clipToCollection(selFish);
//  -------------------------------------------------------------
// //  ###### Load GHSL data ######
// //  -------------------------------------------------------------
// var ghsl = ee.Image('JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1').select('built');
// var ghsl = ghsl.updateMask(ghsl.gte(3))
//                         .remap(ee.List([3,4,5,6]), ee.List([1,2,3,4]))
//                         .clipToCollection(selFish);
// //  -------------------------------------------------------------
//  ###### Visualization ######
//  -------------------------------------------------------------
var background = ee.Image(1); 
Map.addLayer(background, {palette:'#000000', opacity: 0.8}, 'background'); 
var freqPalette = ['ff500d','ffa75c','ffdcb8']; 
Map.addLayer(urbanCmb2, {min: 1, max:36, opacity: 0.8, palette: freqPalette}, 'ourResult');
// Map.addLayer(ghsl, {min: 1, max:4, opacity: 0.8, palette: freqPalette}, 'ghsl');
//  -------------------------------------------------------------
//  ###### Add legned on the map ######
//  ------------------------------------------------------------------------------
// Create and add the legend title.
var legend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
var legendTitle = ui.Label({
  value: 'Year Information',
  style: {fontWeight: 'bold', fontSize: '18px', margin: '0 0 4px 0', padding: '0'}
});
legend.clear();
legend.add(legendTitle);
//  *** add entries on the legend
var colors = ['ff500d', 'ffa75c','ffdcb8'];
var names = ['2018', '2000', '1982'];
// Create the label that is actually the colored box.
var makeRow = function(color, name){
  var colorBox = ui.Label({style: {backgroundColor: '#' + color, padding: '10px', margin: '0 0 10 0'}});
  var description = ui.Label({value: name, style: {margin: '0 0 4px 6px'}});
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  })
}
for (var x = 0; x<3; x++){
  legend.add(makeRow(colors[x], names[x]));
}
Map.add(legend);
//  ------------------------------------------------------------------------------