///////////////////////////////
// High resolution global industrial and smallholder oil palm map for 2019
// Adrià Descals - a.descals@creaf.uab.cat
var textSections = '' +
  "\n SECTION 1 - DISPLAY GLOBAL OP LAYER 2019 " +
  "\n SECTION 2 - DISPLAY VALIDATION POINTS AND GRID "
print(textSections)
Map.setOptions('satellite')
Map.setCenter(30,0,3)
//_______________________________________________________________________________________________________________________
// SECTION 1 - DISPLAY GLOBAL OP LAYER 2019
{
var visComp = {min:60, max: 150,"bands":["VV","VH","B4"]}
// Call GEE composite
var GEE = ee.ImageCollection("users/globaloilpalm/validation/composites_30m_20200101_v1").mosaic()
  .select(["t0_vv","t0_vh","B4"]).rename(["VV","VH","B4"]);
Map.addLayer(GEE, visComp, 'S1-S2 composite', true);
// Display Global OP layer 2019
var visClass = {min:1,max:2,palette: ['ff0000','ef00ff']}
var outClass = ee.ImageCollection("users/adriadescals/shared/OP/global_oil_palm_map_v1").mosaic();
Map.addLayer(outClass.updateMask(outClass.neq(3)),visClass,'Global OP layer',true)
// make legend (categorical variable)
// setup
var TITLE = 'Oil palm'
var palette = ['ff0000','ef00ff']
var ClassNames = ['Industrial closed-canopy oil palm','Smallholder closed-canopy oil palm']
///////////////////////////
var legend = ui.Panel({style: { position: 'bottom-left',padding: '8px 15px'}});
var legendTitle = ui.Label({
  value: TITLE,
  style: {fontWeight: 'bold', fontSize: '20px', margin: '0 0 4px 0', padding: '0'}
});
var makeRow = function(color, name) {
  var colorBox = ui.Label({style: { backgroundColor: '#' + color, padding: '8px',  margin: '0 0 4px 0'}});
  var description = ui.Label({value: name,style: {margin: '0 0 4px 6px'}});
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
for (var i = 0; i < ClassNames.length; i++) {
  legend.add(makeRow(palette[i], ClassNames[i]));
}
Map.add(legend);
}
//_______________________________________________________________________________________________________________________
// SECTION 2 - DISPLAY GRID
{
//////////////////////////////// 
// Display grid
var tiles_OP = ee.FeatureCollection("users/adriadescals/shared/OP/grid_withOP");
var vPoly = ee.Image().toByte().paint(tiles_OP, 2,2);    
Map.addLayer(vPoly, {palette: '00ab1c', max: 3, opacity: 0.9}, 'CELLS with OP',true); 
}