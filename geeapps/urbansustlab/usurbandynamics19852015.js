//  ###### Setting of the basic map ######
//  -------------------------------------------------------------
Map.setOptions('SATELLITE');
//  -------------------------------------------------------------
//  ###### Load our map ######
//  -------------------------------------------------------------
var urbanCmb2 = ee.Image('users/urbansustlab/US_urbanTS_1985_2015')
//  -------------------------------------------------------------
//  ###### Visualization ######
//  -------------------------------------------------------------
var background = ee.Image(1); 
Map.addLayer(background, {palette:'#000000', opacity: 0.8}, 'background'); 
var freqPalette = ['ff500d','ffa75c','ffdcb8']; 
Map.addLayer(urbanCmb2, {min: 1, max:30, opacity: 0.8, palette: freqPalette}, 'ourResult');
//  -------------------------------------------------------------
//  ###### Add legned on the map ######
//  ------------------------------------------------------------------------------
// Create and add the legend title.
var legend = ui.Panel({style: {position: 'bottom-left', padding: '8px 15px'}});
var legendTitle = ui.Label({
  value: 'Urbanized Year',
  style: {fontWeight: 'bold', fontSize: '18px', margin: '0 0 4px 0', padding: '0'}
});
legend.clear();
legend.add(legendTitle);
//  *** add entries on the legend
var colors = ['ff500d','f97d4e', 'f97e15','ffa75c', 'f79d40','f7bb7d','ffdcb8'];
var names = ['2015', '2010', '2005','2000', '1995', '1990','1985'];
// Create the label that is actually the colored box.
var makeRow = function(color, name){
  var colorBox = ui.Label({style: {backgroundColor: '#' + color, padding: '10px', margin: '0 0 10 0'}});
  var description = ui.Label({value: name, style: {margin: '0 0 4px 6px'}});
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  })
}
for (var x = 0; x<7; x++){
  legend.add(makeRow(colors[x], names[x]));
}
Map.add(legend);
//  ------------------------------------------------------------------------------