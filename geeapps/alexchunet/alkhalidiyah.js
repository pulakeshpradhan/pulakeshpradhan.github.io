var dataset = ee.Image('users/alexchunet/al_khalidiyah');
//var elevation = dataset.select('b1'); 
var VIZ_PARAMS = {bands: ['b1', 'b2', 'b3'], max: 3000, gamma: 0.8};
Map.setCenter(43.55719276503427,33.36930249544459, 12);
Map.addLayer(dataset, VIZ_PARAMS, 'Vue optique');
Map.add(ui.Label('Al-Khalidiya - Pléiades (50cm res.) - September 2020', {fontWeight: 'bold', fontSize: '24px'}))
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