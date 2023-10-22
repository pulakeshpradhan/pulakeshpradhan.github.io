var c = ['0231b6','00a0ff','ffffff','b5ff40','39640b'];
var fs = '16px';
var m = '3px 0 3px 0';
var style = {fontSize: fs, fontWeight: 'bold', color: 'e8e8e8', stretch: 'horizontal', textAlign: 'center', margin: m, backgroundColor: '202020'};
function ColorBar(palette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '150x15',
      format: 'png',
      palette: palette
    },
    style: {margin: '3px 10px 10px 10px', backgroundColor: '00000000'},
  });
}
var buttonFunction = function() {
  if (Map.layers().get(0).get('shown') === true) {
    Map.layers().get(0).set('shown', false);
    Map.layers().get(1).set('shown', false);
    Map.layers().get(2).set('shown', true);
    Map.layers().get(3).set('shown', true);
    panelstart.widgets().set(1, inverted);
  } else {
    Map.layers().get(0).set('shown', true);
    Map.layers().get(1).set('shown', true);
    Map.layers().get(2).set('shown', false);
    Map.layers().get(3).set('shown', false);
    panelstart.widgets().set(1, panel);
  }
};
var panelstart = ui.Panel([ui.Label('')],ui.Panel.Layout.flow('vertical'), {position: 'bottom-left', width: '145px', backgroundColor: '202020'});
var panel = ui.Panel(
  [
    ui.Label('TOPOGRAPHY', style),
    ui.Label('of', {fontSize: fs, color: 'e8e8e8', stretch: 'horizontal', textAlign: 'center', margin: m, backgroundColor: '202020'}),
    ui.Label('EARTH', style),
    ui.Label('')
  ],
  ui.Panel.Layout.flow('vertical'), {stretch: 'horizontal', position: 'bottom-left', backgroundColor: '202020'}
);
var inverted = ui.Panel(
  [
    ui.Label('TOPOGRAPHY', style),
    ui.Label('of', {fontSize: fs, color: 'e8e8e8', stretch: 'horizontal', textAlign: 'center', margin: m, backgroundColor: '202020'}),
    ui.Label('INVERTED', style),
    ui.Label('EARTH', style),
    ui.Label('')
  ],
  ui.Panel.Layout.flow('vertical'), {stretch: 'horizontal', position: 'bottom-left', backgroundColor: '202020'}
);
var bar = {palette: c};
var button = ui.Button('Toggle!', buttonFunction, false, {margin: '20px 0 0 25px', width: '70px'});
var labelPanel = ui.Panel(
  [
    ui.Label('Low', {margin: '0 10px', fontSize: '11px', color: 'e8e8e8', backgroundColor: '202020'}),
    ui.Label('High', {margin: '0 50px', fontSize: '11px', color: 'e8e8e8', backgroundColor: '202020'})
  ],
  ui.Panel.Layout.flow('horizontal'), {backgroundColor: '202020'});
var sidebar = ui.Panel(
    [
      ColorBar(bar.palette), labelPanel, button,
      ui.Label('')
    ],
    ui.Panel.Layout.flow('vertical'),
    {stretch: 'horizontal', textAlign: 'center', width: '125px', position: 'top-left', backgroundColor: '202020'});
//ui.root.insert(0, panelstart);
Map.add(panelstart.add(panel).add(sidebar));
//Map.setCenter(-10,2,1.5);
var i = ee.Image("NOAA/NGDC/ETOPO1").select('bedrock');
var s = ee.Terrain.hillshade(i);
var i2 = ee.Image("NOAA/NGDC/ETOPO1").select('bedrock').multiply(-1);
var s2 = ee.Terrain.hillshade(i2);
Map.addLayer(s, {min: 178, max: 182}, 'hillshade');
Map.addLayer(i, {min: -7734, max: 2339, palette: c, opacity: 0.65}, 'dem');
Map.addLayer(s2, {min: 178, max: 182}, 'hillshade inverted', false);
Map.addLayer(i2, {min: -2339, max: 7734, palette: c, opacity: 0.65}, 'dem inverted', false);