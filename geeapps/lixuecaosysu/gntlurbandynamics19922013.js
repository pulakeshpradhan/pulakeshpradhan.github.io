//  ###### Load data sets ######
//  ------------------------------------------------------------------------------
var gNTLresult = ee.Image("users/lixuecaosysu/globalNTL/sQ_urbanResult_global_stackTS_post");
//  ------------------------------------------------------------------------------
//  ###### Visualization ######
//  ------------------------------------------------------------------------------
var paletteVis = ['000000', '1593ff', '21c1ff', 'feffcc', 'ffec91', 'ffec91', 'ffd371', 'ffbd6b', 'ff7e40', 'ff250f'];
var ntlVis = {min:0, max:22, palette: paletteVis, opacity: 0.5};
Map.setOptions('SATELLITE');
Map.centerObject(gNTLresult, 2); 
Map.addLayer(gNTLresult, ntlVis, 'gNTL_urbanTS');
//  ------------------------------------------------------------------------------
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
var entry;
var colors = ['000000', '1593ff', '21c1ff', 'feffcc', 'ffec91', 'ffd371', 'ffbd6b', 'ff7e40', 'ff250f'];
var names = ['non-urban', '2013', '2010', '2007', '2004', '2001', '1998', '1995', '1992'];
// Create the label that is actually the colored box.
var makeRow = function(color, name){
  var colorBox = ui.Label({style: {backgroundColor: '#' + color, padding: '8px', margin: '0 0 4px 0'}});
  var description = ui.Label({value: name, style: {margin: '0 0 4px 6px'}});
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  })
}
for (var x = 0; x<9; x++){
  legend.add(makeRow(colors[x], names[x]));
}
Map.add(legend);
//  ------------------------------------------------------------------------------