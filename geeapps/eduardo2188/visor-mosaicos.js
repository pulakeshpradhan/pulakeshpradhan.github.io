/// visualización de Mosaicos elaborados//////
var poligono = ee.FeatureCollection("users/eduardo2188/Amazonia_Buffer");
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
    'Mosaico 2000 INDEFO':ee.Image('users/eduardo2188/LANDSAT_MOSAICO_2000_INDEFO_065')
                  //.filterDate('2019-01-01', '2019-01-31')
                  //.select('NO2_column_number_density')
                  //.mean()
                  //.clip(poligono)
                  .visualize({bands: ['swir2','nir','red'], min: [0.01,0.05,0.03], max: [0.20,0.6,0.25]}),
    'Mosaico INDEFO065 FINAL':ee.Image('users/eduardo2188/LANDSAT_MOSAICO_1985_2000_INDEFO_065_FINAL')
                  //.filterDate('2019-01-01', '2019-01-31')
                  //.select('NO2_column_number_density')
                  //.mean()
                  //.clip(poligono)
                  .visualize({bands: ['swir2','nir','red'], min: [0.01,0.05,0.03], max: [0.20,0.6,0.25]}),
    'Mosaico INDEFO060 FINAL2':ee.Image('users/eduardo2188/LANDSAT_MOSAICO_1985_2000_INDEFO_065_FINAL2')
                  //.filterDate('2019-01-01', '2019-01-31')
                  //.select('NO2_column_number_density')
                  //.mean()
                  //.clip(poligono)
                  .visualize({bands: ['swir2','nir','red'], min: [0.01,0.05,0.03], max: [0.20,0.6,0.25]}),
    'Maryland2000':ee.Image('UMD/hansen/global_forest_change_2013')
                  //.filterDate('2019-01-01', '2019-01-31')
                  //.select('NO2_column_number_density')
                  //.mean()
                  .clip(poligono)
                  .visualize({bands: ['first_b50', 'first_b40', 'first_b30'], min: [0, 0, 0], max: [150, 130, 150]}),
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