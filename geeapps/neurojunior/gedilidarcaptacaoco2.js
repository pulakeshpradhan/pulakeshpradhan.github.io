var AOI = ui.import && ui.import("AOI", "table", {
      "id": "users/neurojunior/Limite_co2"
    }) || ee.FeatureCollection("users/neurojunior/Limite_co2");
var heigth = ee.Image('users/potapovpeter/GEDI_V27/GEDI_SAM_v27').clip(AOI);
var GFCHParams = {min: 0, max: 40, palette: ['white', 'green']};
Map.addLayer(heigth, GFCHParams, 'Global Forest Canopy Height 2019');
// Selecionar Imagens Sentinel 2 LA
var Sentinel = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate('2019-01-01', '2019-12-30')
    .filterBounds(AOI)
    .filterMetadata ('CLOUDY_PIXEL_PERCENTAGE', 'Less_Than', 1);
var s2filtro = ee.Image(Sentinel.median());
var s2clip = s2filtro.clip(AOI);
Map.addLayer (s2clip, {max: 4000.0, min: 0.0, gamma: 1.0, bands: ['B12','B8A','B4']}, 'Agricultura');
// Visualização da Composição do Satélite Sentinel 2 LA - Bandas: 11, 8A e 4
Map.addLayer(s2clip, {bands: ['B11', 'B8A', 'B4'],
  gamma: 1,
  min: 0,
  max: 5000,},
  'Agricultura');
// Composição do Segundo Mapa
var MapasVinculados = ui.Map();
var GFCHParams = {min: 0, max: 40, palette: ['white', 'green']};
MapasVinculados.addLayer(heigth, GFCHParams, 'Global Forest Canopy Height 2019');
// Vinculação dos Mapas
var SWIPE = ui.Map.Linker([ui.root.widgets().get(0), MapasVinculados]);
//Integração do Efeito Swipe
var SWIPE2 = ui.SplitPanel({
  firstPanel: SWIPE.get(0),
  secondPanel: SWIPE.get(1),
  orientation: 'horizontal', //'horizontal' o 'vertical'
  wipe: true,
  style: {stretch: 'both'}});
// Zoom e Visualização do Efeito Swipe
ui.root.widgets().reset([SWIPE2]);
MapasVinculados.centerObject(AOI, 9);