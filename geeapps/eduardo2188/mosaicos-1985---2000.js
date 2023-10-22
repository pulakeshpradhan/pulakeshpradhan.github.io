var poligono = ee.FeatureCollection("users/eduardo2188/BAS_ARE_PROVINCIA");
//var poligono2 = ee.FeatureCollection("users/eduardo2188/Lima_distritos");
var palettes = require('users/gena/packages:palettes');
var palette = palettes.crameri.vik[50];
Map.setCenter(-76.90,-11.25);
var mosaico = {
 //'Provincia Lima': ee.FeatureCollection("users/eduardo2188/BAS_ARE_PROVINCIA"),
 //'Distritos Lima': ee.FeatureCollection("users/eduardo2188/Lima_distritos"),
  'Mosaico NBR':ee.Image('users/GEE-RRBM/LANDSAT_1985_2000')
                  //.filterDate('2019-01-01', '2019-01-31')
                  //.select('NO2_column_number_density')
                  //.mean()
                  //.clip(poligono)
                  .visualize({bands: ['swir2','nir','red'], min: [0.01,0.05,0.03], max: [0.20,0.6,0.25]}),
    'Mosaico NBR2':ee.Image('users/GEE-RRBM/LANDSAT_1985_2000_NBR2')
                  //.filterDate('2019-01-01', '2019-01-31')
                  //.select('NO2_column_number_density')
                  //.mean()
                  //.clip(poligono)
                  .visualize({bands: ['swir2','nir','red'], min: [0.01,0.05,0.03], max: [0.20,0.6,0.25]}),
    'Mosaico INDEFO':ee.Image('users/eduardo2188/LANDSAT_1985_2000_ndfi2_v2')
                  //.filterDate('2019-01-01', '2019-01-31')
                  //.select('NO2_column_number_density')
                  //.mean()
                  //.clip(poligono)
                  .visualize({bands: ['swir2','nir','red'], min: [0.01,0.05,0.03], max: [0.20,0.6,0.25]}),
};
// Centrado del mapa en localización y carga de títulos y mapas en vertical
// Create two maps.
var leftMap = ui.Map();
//leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
var rightMap = ui.Map();
//rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Mosaicos Amazonia');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(mosaico[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(mosaico), onChange: updateMap});
  select.setValue(Object.keys(mosaico)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
leftMap.setControlVisibility({zoomControl: true});
// Link them together.
var linker = new ui.Map.Linker([leftMap, rightMap]);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
// Remove the default map from the root panel.
ui.root.clear();
// Add our split panel to the root panel.
ui.root.add(splitPanel);