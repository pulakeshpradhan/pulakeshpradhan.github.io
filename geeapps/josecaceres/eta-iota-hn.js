// Demuestra la comparación de imágenes antes / después con una variedad de fechas.
//Agregar limites
var hn =  ee.FeatureCollection("users/josecaceres/Limite_Depto_HN")
// Utilizaremos imagenes Sentinel-1 de las tormentas ETA y IOTA
var images = {
  'ANTES': getWeeklySentinelComposite('2020-10-20'),
  'ETA': getWeeklySentinelComposite('2020-11-05'),
  'IOTA': getWeeklySentinelComposite('2020-11-17'),
};
// Composición de la colección de imágenes Sentinel-1 durante 7 días (inclusive)
// después de la fecha indicada.
function getWeeklySentinelComposite(date) {
  var date = ee.Date(date);
  // Solo incluya la polarización VV, para una composición consistente.
  var polarization = 'VV';
  var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
                      .filterDate(date, date.advance(1, 'week'))
                      .filter(ee.Filter.listContains(
                          'transmitterReceiverPolarisation', polarization))
                      .filter(ee.Filter.eq('instrumentMode', 'IW'))
                      .map(function(image){return image.clip(hn)})
                      .select(polarization)
                      .mean();
  return sentinel1.visualize({min: -25, max: -5, palette: ['aqua', 'black']});
}
// Cree el mapa de la izquierda y haga que muestre la capa 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Cree el mapa de la derecha y haga que muestre la capa 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Agrega un widget de selección de capa al mapa dado, para permitir
// a los usuarios cambiar que imagen se muestra en el mapa asociado.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Seleccione el momento a visualizar');
  // Esta funcion cambia el mapa dado para mostrar la imagen seleccionada.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure un menú desplegable de selección para permitir que el usuario elija
  // entre imagenes y configure el mapa para que se actualice cuando un usuario haga una seleccion.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
// Cree un SplitPanel para contener los mapas vinculados adyacentes.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Configure el SPLITPanel como el unico elemento en el UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-86.8, 15.3, 9);