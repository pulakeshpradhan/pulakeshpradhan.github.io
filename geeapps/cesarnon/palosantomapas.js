/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var Zona = ee.FeatureCollection("users/cesarnon/PaloSanto/Distrib_PaloSanto_MNE_Valid1"),
    imageVisParam = {"opacity":1,"bands":["B4","B3","B2"],"min":525.9,"max":1961.1,"gamma":1},
    imageVisParam2 = {"opacity":1,"bands":["B4","B3","B2"],"min":432.02,"max":1536.98,"gamma":1},
    Mapa_Palo = ee.Image("users/cesarnon/Palo_Nivel3_7cat_10m_v3");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//collection y mosaico 1
var coll_S2_O_d1 = ee.ImageCollection('COPERNICUS/S2')
  .filterDate('2018-05-01', '2018-06-30')
  .filterBounds(Zona)
  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than' ,10);
var mosaico_mediana1 = coll_S2_O_d1.median().clip(Zona)
//collection y mosaico 2
var coll_S2_O_d2 = ee.ImageCollection('COPERNICUS/S2')
  .filterDate('2018-08-01', '2018-09-30')
  .filterBounds(Zona)
  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than' ,10);
var mosaico_mediana2 = coll_S2_O_d2.median().clip(Zona)
var mosaico_m1s = mosaico_mediana1.select(['B4', 'B3','B2'])
var mosaico_m2s = mosaico_mediana2.select(['B4', 'B3','B2'])
Map.addLayer(mosaico_m1s, imageVisParam2, 'Sentinel2_Mayo/junio_2018', false)
Map.addLayer(mosaico_m2s, imageVisParam, 'Sentinel2_Agosto/septiembre_2018', false)
var color = ['fff9f3','ff1955','0000ff','c298ed','1d5362','1e8527','a9dc0e','f8f122']
Map.addLayer (Mapa_Palo.clip(Zona),{min:1, max:8, palette: color},'Mapa_Palo')
Map.centerObject(Mapa_Palo, 7)
// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Ambientes y Coberturas Nivel3',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
//var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
//legend.add(loading);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '6px',
      margin: '0 0 3px 0'
          }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 2px 4px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var names = ['Vegetacion cultural (Desmontes, cult., past.,etc.)',
'Infraestructura primaria (urbana y vial)',
'Agua',
'Humedal',
'Bosque ribereños y Bosques Humedos',
'Montes dominados por Q.colorado y Mistol',
'Montes dominados por P.santo y P.cruz',
'Monte con caracteristicas de Palosantal']
for (var i = 0; i < names.length; i++) {
    legend.add(makeRow(color[i], names[i]));
  }
Map.add(legend);