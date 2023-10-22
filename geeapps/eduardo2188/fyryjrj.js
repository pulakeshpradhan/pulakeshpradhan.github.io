/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var poligono = ee.FeatureCollection("users/eduardo2188/Lima"),
    table = ee.FeatureCollection("users/eduardo2188/Lima_distritos");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var poligono = ee.FeatureCollection("users/eduardo2188/Lima");
var poligono2 = ee.FeatureCollection("users/eduardo2188/Lima_distritos");
var palettes = require('users/gena/packages:palettes');
var palette = palettes.crameri.vik[50];
Map.setCenter(-76.90,-11.25);
var mosaico = {
 'Provincia Lima': ee.FeatureCollection("users/eduardo2188/Lima"),
 'Distritos Lima': ee.FeatureCollection("users/eduardo2188/Lima_distritos"),
  'NO2 Enero 2019':ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                  .filterDate('2019-01-01', '2019-01-31')
                  //.select('NO2_column_number_density')
                  .mean()
                  .clip(poligono)
                  .visualize({bands: ['NO2_column_number_density'], min: [0.00], max: [0.0002], palette: palette}),
  'NO2 Febrero 2019':ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                  .filterDate('2019-02-01', '2019-02-28')
                  //.select('NO2_column_number_density')
                  .mean()
                  .clip(poligono)
                  .visualize({bands: ['NO2_column_number_density'], min: [0.00], max: [0.0002], palette: palette}),
  'NO2 Marzo 2019':ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                  .filterDate('2019-03-01', '2019-03-31')
                  //.select('NO2_column_number_density')
                  .mean()
                  .clip(poligono)
                  .visualize({bands: ['NO2_column_number_density'], min: [0.00], max: [0.0002], palette: palette}),
  'NO2 Abril 2019':ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                  .filterDate('2019-04-01', '2019-04-30')
                  //.select('NO2_column_number_density')
                  .mean()
                  .clip(poligono)
                  .visualize({bands: ['NO2_column_number_density'], min: [0.00], max: [0.0002], palette: palette}),
  'NO2 Mayo 2019':ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                  .filterDate('2019-05-01', '2019-05-31')
                  //.select('NO2_column_number_density')
                  .mean()
                  .clip(poligono)
                  .visualize({bands: ['NO2_column_number_density'], min: [0.00], max: [0.0002], palette: palette}),
  'NO2 Junio 2019':ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                  .filterDate('2019-06-01', '2019-06-33')
                  //.select('NO2_column_number_density')
                  .mean()
                  .clip(poligono)
                  .visualize({bands: ['NO2_column_number_density'], min: [0.00], max: [0.0002], palette: palette}),
  'NO2 Julio 2019':ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                  .filterDate('2019-07-01', '2019-07-31')
                  //.select('NO2_column_number_density')
                  .mean()
                  .clip(poligono)
                  .visualize({bands: ['NO2_column_number_density'], min: [0.00], max: [0.0002], palette: palette}),
  'NO2 Agosto 2019':ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                  .filterDate('2019-08-01', '2019-08-31')
                  //.select('NO2_column_number_density')
                  .mean()
                  .clip(poligono)
                  .visualize({bands: ['NO2_column_number_density'], min: [0.00], max: [0.0002], palette: palette}),
  'NO2 Setiembre 2019':ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                  .filterDate('2019-09-01', '2019-09-30')
                  //.select('NO2_column_number_density')
                  .mean()
                  .clip(poligono)
                  .visualize({bands: ['NO2_column_number_density'], min: [0.00], max: [0.0002], palette: palette}),
  'NO2 Octubre 2019':ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                  .filterDate('2019-10-01', '2019-10-31')
                  //.select('NO2_column_number_density')
                  .mean()
                  .clip(poligono)
                  .visualize({bands: ['NO2_column_number_density'], min: [0.00], max: [0.0002], palette: palette}),
  'NO2 Noviembre 2019':ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                  .filterDate('2019-11-01', '2019-11-30')
                  //.select('NO2_column_number_density')
                  .mean()
                  .clip(poligono)
                  .visualize({bands: ['NO2_column_number_density'], min: [0.00], max: [0.0002], palette: palette}),
  'NO2 Diciembre 2019':ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                  .filterDate('2019-12-01', '2019-12-31')
                  //.select('NO2_column_number_density')
                  .mean()
                  .clip(poligono)
                  .visualize({bands: ['NO2_column_number_density'], min: [0.00], max: [0.0002], palette: palette}),
 'NO2 Enero 2020':ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                  .filterDate('2020-01-01', '2020-01-31')
                  //.select('NO2_column_number_density')
                  .mean()
                  .clip(poligono)
                  .visualize({bands: ['NO2_column_number_density'], min: [0.00], max: [0.0002], palette: palette}),
  'NO2 Febrero 2020':ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                  .filterDate('2020-02-01', '2020-02-28')
                  //.select('NO2_column_number_density')
                  .mean()
                  .clip(poligono)
                  .visualize({bands: ['NO2_column_number_density'], min: [0.00], max: [0.0002], palette: palette}),
  'NO2 Marzo 2020':ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                  .filterDate('2020-03-01', '2020-03-31')
                  //.select('NO2_column_number_density')
                  .mean()
                  .clip(poligono)
                  .visualize({bands: ['NO2_column_number_density'], min: [0.00], max: [0.0002], palette: palette}),
  'NO2 Abril 2020':ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                  .filterDate('2020-04-01', '2020-04-30')
                  //.select('NO2_column_number_density')
                  .mean()
                  .clip(poligono)
                  .visualize({bands: ['NO2_column_number_density'], min: [0.00], max: [0.0002], palette: palette}),
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
  var label = ui.Label('Contaminación NO2 Lima ');
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