/*
  Universidade Federal da Paraíba
  Centro de Tecnologia
  Programa de Pós-graduação em Engenharia Civil e Ambiental (PPGECAM)
  Geoprocessamento em nuvem com o Google Earth Engine – Módulo Avançado
  Prof. Cristiano Almeida
  Criado em: Out/2021
  Modificado em: Out/2021
  Criando interfaces (User Interface - ui)
  Objetivo desta etapa do curso:
    - Entender o funcionamento do pacote ui (User Interface)
    - Criar uma interface simples
    - Como criar interações entre o mapa e seus objetos (widgets)
    - Como criar um App
  Fonte/Leitura adicional:
    https://developers.google.com/earth-engine/guides/ui
    https://developers.google.com/earth-engine/guides/ui_panels
*/
// Load and display NDVI data.
var ndvi = ee.ImageCollection('LANDSAT/LC8_L1T_8DAY_NDVI')
    .filterDate('2014-01-01', '2015-01-01');
Map.addLayer(ndvi.median(), {min: 0, max: 1, palette: ['99c199', '006400']}, 'NDVI');
// Configure the map.
Map.setCenter(-94.84497, 39.01918, 8);
Map.style().set('cursor', 'crosshair');
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}})
    .add(ui.Label('Click on the map'));
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'longitude: ' + coords.lon.toFixed(2) + ' ' +
                 'latitude: ' + coords.lat.toFixed(2);
  panel.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
  // Create a chart of NDVI over time.
  var chart = ui.Chart.image.series(ndvi, point, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'NDVI Over Time',
        vAxis: {title: 'NDVI'},
        lineWidth: 1,
        pointSize: 3,
      });
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel.widgets().set(2, chart);
});
// Add the panel to the ui.root.
ui.root.add(panel);