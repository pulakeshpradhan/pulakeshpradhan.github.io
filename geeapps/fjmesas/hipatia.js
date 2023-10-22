/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var muestras = ee.FeatureCollection("users/fjmesas/Hipatia");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
function NDVI(entrada){
  var ndvi = entrada.addBands(entrada.normalizedDifference(['B8','B4']).rename("NDVI"))
  return (ndvi)
}
var parametros_visuales = {
  bands:"NDVI",
  min: 0, max: 1,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
    '74A901', '66A000', '529400', '3E8601', '207401', '056201',
    '004C00', '023B01', '012E01', '011D01', '011301']};
var fc=ee.FeatureCollection(muestras)
function getProps(loc) {
  loc = ee.Dictionary(loc);
  var point = ee.Geometry.Point(loc.getNumber('lon'), loc.getNumber('lat'));
  var thisFeature = fc.filterBounds(point).first();
  var props = thisFeature.toDictionary();
  props.evaluate(function(props) {
    var str = '';
    Object.keys(props).forEach(function(i) {
      str = str + i + ': ' + props[i] + '\n';
    });
    info.setValue(str);
  });
}
var panel = ui.Panel({style: {position: 'bottom-left', width: '300px', height: '50px'}});
var titulo=ui.Label({value: 'Solo aquellos que descifren el código secreto sabran la verdad oculta detras del NDVI del trigo y el olivo', style: {whiteSpace: 'pre'}});
var info = ui.Label({value: '', style: {whiteSpace: 'pre'}});
panel.add(info);
Map.add(titulo)
var coleccion = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
                  .filterDate('2020-04-01', '2020-04-15')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .filterBounds(muestras)
coleccion=coleccion.map(NDVI)
Map.add(panel);
Map.style().set('cursor', 'crosshair');
Map.onClick(getProps);
Map.centerObject(fc,16)
Map.addLayer(fc,{},'',false);
Map.addLayer(coleccion,parametros_visuales,'NDVI Sentinel 2')