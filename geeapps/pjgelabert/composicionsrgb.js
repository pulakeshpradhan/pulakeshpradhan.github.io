//Múltiples vistas en Google Earth Engine
//http://www.gisandbeers.com/multiples-vistas-google-earth-engine/
// Llamada a la colección Copernicus y filtro de fechas y cobertura de nubes
var ImagenSatelite = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2018-04-01', '2018-04-30')
    .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 20);
// Composición y contraste RGB de 4 imágenes para un mismo momento
var ComposicionesRGB = {
  'Color Natural RGB 4,3,2': ['B4', 'B3', 'B2'],
  'Urbà RGB 12,11,4': ['B12', 'B11', 'B4'],
  'Vegetació RGB 8,4,3': ['B8', 'B4', 'B3'],
  'Agricultura RGB 11,8,2': ['B11', 'B8', 'B2']};
function getVisualization(bands) {
  return {gamma: 1, min: 0, max: 5000, bands: bands};}
//Creación y linkeo entre mapas
var PanelMapas = [];
Object.keys(ComposicionesRGB).forEach(function(name) {
  var Mapa = ui.Map();
  Mapa.add(ui.Label(name));
  Mapa.addLayer(ImagenSatelite, getVisualization(ComposicionesRGB[name]), name);
  Mapa.setControlVisibility(false);
  PanelMapas.push(Mapa);});
var linker = ui.Map.Linker(PanelMapas);
//Configuración de la posición de los 4 mapas sobre la vista
var mapGrid = ui.Panel([
    ui.Panel([PanelMapas[0], PanelMapas[1]], null, {stretch: 'both'}),
    ui.Panel([PanelMapas[2], PanelMapas[3]], null, {stretch: 'both'})],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
// Controladores de título y escala-zoom para el primer mapa
PanelMapas[0].setControlVisibility({zoomControl: true});
PanelMapas[0].setControlVisibility({scaleControl: true});
var Titulo = ui.Label('Composicions RGB', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '11 px'});
// Centrado del mapa en localización y carga de títulos y mapas en mosaico
PanelMapas[0].setCenter(0.62218,41.61674, 11);
ui.root.widgets().reset([Titulo, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));