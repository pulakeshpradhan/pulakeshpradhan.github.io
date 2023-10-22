var dataset = ee.Image('users/alexchunet/lac_taabo');
//var elevation = dataset.select('b1');
var VIZ_PARAMS = {bands: ['b1', 'b2', 'b3'], max: 1750, gamma: 0.5};
Map.setCenter(-5.108226658420103,6.2355966873556605, 13);
Map.addLayer(dataset, VIZ_PARAMS, 'Vue optique');
Map.add(ui.Label('Lac taabo - Pléiades (50cm res.) - January 2020', {fontWeight: 'bold', fontSize: '24px'}))
//var vis = {min: 0, max: 30, palette: ['24126c', '1fff4f', 'd4ff50']};
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}