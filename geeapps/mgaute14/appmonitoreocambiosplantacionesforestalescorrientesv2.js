Map.setCenter (  -55.935638, -27.983678,12)
//Mostrar imagen google satelital detras del mapa.
Map.setOptions("HYBRID")
var Fondo_Oscuro = [
  {
    featureType: 'administrative',
    elementType: 'all',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{color: '#444444'}]
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [{color: '#000000'}, {visibility: 'on'}]
}]
Map.setOptions('Fondo_Oscuro', {Fondo_Oscuro: Fondo_Oscuro});
//var geometry = ee.FeatureCollection('users/mgaute/limitenacional');
//var cartografia_plantaciones_corrientes = ee.FeatureCollection('users/mgaute/cartografia_corrientes');
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/cobertura_11052020');  
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/plantaciones_forestales_NEA_macizos_02_07_2020')
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/macizos_corrientes_29_07_2020')
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/macizos_misiones_29_07_2020')
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/macizos_entrerios_29_07_2020')
var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/macizos_02_07_2020')
var carto_prov = cartografia_plantaciones.filter(ee.Filter.stringStartsWith('prov',"CORRIENTES")) 
//AGREGADO DE SUP 
var addArea = function(feature) {
  return feature.set({areaHa: feature.geometry().area().divide(100 * 100)});
};
// Map the area getting function over the FeatureCollection.
var areaAdded = carto_prov.map(addArea);
// Print the first feature from the collection with the added property.
//print('First feature:', areaAdded.first());
// Calculo la sumatoria de columna área ( ha)
print("superficie vector ha", carto_prov.reduceColumns({
  reducer: ee.Reducer.sum(),
  selectors: ['superficie'],
}));
//var region = ee.FeatureCollection( 'users/mgaute/limites_provincias_NEA')
var region = ee.FeatureCollection( 'users/mgaute/provincias/provincias_ign_2015')
//var cartografia_plantaciones = ee.FeatureCollection( 'users/mgaute/macizos_mapa_fina')
var geometry = region.filter(ee.Filter.stringStartsWith('nombre',"CORRIENTES"))
//var geometry = ee.FeatureCollection ('users/mgaute/provincias/area_recorte_sentinel')
//Filtrar por nombres
//var geometry  = region.filter(ee.Filter.inList('nombre', 
//ee.List(['CORRIENTES', 'CHACO', 'ENTRE RÍOS','SANTIAGO DEL ESTERIO', 'SANTA FE', 'CÓRDOBA','BUENOS AIRES'])));
//var geometry  = region.filter(ee.Filter.inList('nombre', 
//ee.List(['BUENOS AIRES'])));
//var buffer = ee.FeatureCollection('users/mgaute/Contorno_Buffer_500m')
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/macizos_02_07_2020')
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/macizos_misiones_29_07_2020')
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/macizos_entrerios_29_07_2020')
//var geometry = ee.FeatureCollection('users/mgaute/limites_provincia_entrerios');
//var forestland = ee.Image('users/mgaute/forestland2');
//var limite = 
//geometry.map
//(function(feature) {
  //return feature.simplify({maxError: 100});
//});
//var cartografia = cartografia_plantaciones.map(function(feature) {
  //return feature.simplify({maxError: 10});
//});
var bufferPoly100 = function(feature) {
  return feature.buffer(-50);   
};
var bufferedPolys = cartografia_plantaciones.map(bufferPoly100)
////////////////////////////////////////////////////////
/// Estilos borde cartografía 
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: carto_prov,
  color: 1,
  width: 2
});
var outline_buffer = empty.paint({
  featureCollection: bufferedPolys,
  color: 1,
  width: 2
});
////////////////Sentinel_fecha_actual
var START_actual = ee.Date("2020-09-01");
var END_actual = ee.Date("2020-11-26");
var productoS2_actual =  ee.ImageCollection('COPERNICUS/S2') 
.filterDate(START_actual,END_actual)
//.filterBounds ( geometry)
//print (collectionS2);
var bandasS2_actual =['B3','B4','B8', 'B11']
// filtrar coleccion
var col2_actual  =productoS2_actual
//.filterBounds(limite) 
// cobertura de nubes máxima
//.filterMetadata('CLOUD_COVER','less_than', 60)
.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than',5)
.select(bandasS2_actual)
//////////////////////////////////
////////////////Sentinel_fecha_anterior
var START_anterior = ee.Date("2019-09-01");
var END_anterior = ee.Date("2019-11-26");
var productoS2_anterior =  ee.ImageCollection('COPERNICUS/S2') 
.filterDate(START_anterior,END_anterior)
//.filterBounds ( geometry)
//print (collectionS2);
var bandasS2_anterior =['B3','B4','B8', 'B11']
// filtrar coleccion
var col2_anterior  =productoS2_anterior
//.filterBounds(limite) 
// cobertura de nubes máxima
//.filterMetadata('CLOUD_COVER','less_than', 60)
.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than',5)
.select(bandasS2_anterior)
//print(col2);
// convertir coleccion a imagen, reduce a mediana
var imagen2_actual =col2_actual.mean().clip(carto_prov)
var imagen2_anterior =col2_anterior.mean().clip(carto_prov)
// ver imagen en mapa
Map.addLayer (imagen2_anterior, {bands: ['B8', 'B11', 'B3'], min: [49.5], max: [3241] }
, "Mosaico Sentinel 2 anterior ", false ) ;
Map.addLayer (imagen2_actual, {bands: ['B8', 'B11', 'B3'], min: [49.5], max: [3241] }
, "Mosaico Sentinel 2 actual ", false ) ;
////////////////////////////////////////// Sentinel Anterior /////////////////////////
/*
var START_anterior = 
ee.Date
("2019-01-01");
var END_anterior = 
ee.Date
("2019-03-20");
var productoS2_anterior =  ee.ImageCollection('COPERNICUS/S2') 
.filterDate(START_anterior,END_anterior);
//print (collectionS2);
var bandasS2_anterior=['B3','B4','B8', 'B11']
// filtrar coleccion
var col2_anterior=productoS2_anterior
//.filterBounds(limite) 
// cobertura de nubes máxima
//.filterMetadata('CLOUD_COVER','less_than', 60)
.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than',5)
.select(bandasS2_anterior)
//print(col2);
// convertir coleccion a imagen, reduce a mediana
var imagen2_anterior =col2_anterior.mean().clip(cartografia_plantaciones)
// ver imagen en mapa
Map.addLayer (imagen2_anterior, {bands: ['B8', 'B11', 'B3'], min: [49.5], max: [3241] }
, "Mosaico Sentinel 2 marzo - abril 2019 ", false ) ;
*/
/////////////////////// productoS2_2S2//////////////
/////////////////
var coleccion_paletas =  require ('users/gena/packages:palettes')
var mipaletandvi = coleccion_paletas.colorbrewer.RdYlGn [11]//.reverse(); 
var NDVIVisParam_actual = {
  bands: ['NDVIS2_actual'],
  min: 0,
  max: 1,
  palette: mipaletandvi
};
var NDVIVisParam_anterior = {
  bands: ['NDVIS2_anterior'],
  min: 0,
  max: 1,
  palette: mipaletandvi
};
// Calculo del NDVI_S2 actual usando una expresion
var ndviS2_actual  = imagen2_actual.expression(
    '(NIR - RED) / (NIR + RED)',
    { 'NIR': imagen2_actual.select('B8'),
      'RED': imagen2_actual.select('B4')
    });
// Calculo del NDVI_S2 anterior usando una expresion
var ndviS2_anterior  = imagen2_anterior.expression(
    '(NIR - RED) / (NIR + RED)',
    { 'NIR': imagen2_anterior.select('B8'),
      'RED': imagen2_anterior.select('B4')
    });
var imagen_S2_actual = imagen2_actual.addBands(ndviS2_actual.rename('NDVIS2_actual')).clip(carto_prov);
var imagen_S2_anterior = imagen2_anterior.addBands(ndviS2_anterior.rename('NDVIS2_anterior')).clip(carto_prov)
//var imagen_S2_actual_buffer = imagen2_actual_buffer.addBands(ndviS2_actual.rename('NDVIS2')).clip(bufferedPolys);
var imagen_ndvi_actual =imagen_S2_actual.select ('NDVIS2_actual')
var imagen_ndvi_anterior = imagen_S2_anterior.select ('NDVIS2_anterior')
var diferencia =imagen_ndvi_anterior.subtract(imagen_ndvi_actual)
var diferencia_actual_anterior = imagen_ndvi_actual.subtract (imagen_ndvi_anterior) 
//var diferencia_cuadrada = diferencia.pow(2);
//var imagen_ndvi_buffer =imagen_S2_actual_buffer.select ('NDVIS2')
////////////////en pie//////////////////
var sin_cambio =diferencia.mask( diferencia.gt (-0.2).and ( diferencia.lt(0.2)))
var perdida  = diferencia.mask( diferencia.gt(0.3))
var  ganancia = diferencia.mask(diferencia.lt (0.4))
//Map.addLayer(outline, {palette: '0000FF'}, 'Cartografía Plantaciones Forestales - vectorial', false);
//Map.addLayer(outline2, {palette: 'e8ea1b'}, 'Predios', false);
//Map.addLayer(outline4, {palette: '80ff00'}, 'Buffer', false);
/////////////contar numero de pixeles
var areaImage_sin_cambio = sin_cambio.multiply(ee.Image.pixelArea())
var areaImage_ganancia = ganancia.multiply(ee.Image.pixelArea())
var areaImage_perdida = perdida.multiply(ee.Image.pixelArea())
//print ( areaImage_pie)
//Map.addLayer (sin_cambio, {palette: 'green'} , "sin cambio ", false ) ;
//Map.addLayer (ganancia,{palette: 'blue'} , "plantación  o crecimiento", false ) ;
//Map.addLayer (perdida, {palette: 'red'} , "cosecha o decrecimiento", false ) ;
/*/////////////////////////////////////////////estadistica cambios
 var stats_sin_cambio = areaImage_sin_cambio.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
print('Sumatoria  de píxeles sin cambio: ', stats_sin_cambio.get('NDVIS2_anterior'), 'metros cuadrados');
var stats_ganancia = areaImage_ganancia.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
print('Sumatoria  de píxeles gananacia: ', stats_ganancia.get('NDVIS2_anterior'), 'metros cuadrados');
*/
var stats_perdida_actual= areaImage_perdida.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
//print('Sumatoria  de píxeles perdida ', stats_perdida_actual.get('NDVIS2_actual'), 'metros cuadrados');
/////////////////////////////////////////////estadistica estado actual
//imagen en pie actual 
var imagen_S2_actual = imagen2_actual.addBands(ndviS2_actual.rename('NDVIS2_actual')).clip(carto_prov);
var imagen_ndvi_actual =imagen_S2_actual.select ('NDVIS2_actual')
/////////////////////////////////reclasifico imagen de estado actual
var DTstring_actual = ['1) root 9999 9999 9999',
'2) NDVIS2_actual<=0.25 9999 9999 1 *',
'3) NDVIS2_actual>0.25 9999 9999 9999',
'6) NDVIS2_actual<=0.5 9999 9999 2 *',
'7) NDVIS2_actual>0.5 9999 9999 3 *'].join("\n");
var classifier_actual  = ee.Classifier.decisionTree(DTstring_actual);
var reclassifiedImage_actual = imagen_ndvi_actual.select('NDVIS2_actual').classify(classifier_actual);
var ndwiViz = {min: 1, max: 3, palette: ['red', 'yellow ', 'green ']};
//Map.addLayer(reclassifiedImage_actual, ndwiViz, 'Clases de Estado actual', false);
// estadistica en pie
var ndvi_en_pie_actual =imagen_ndvi_actual.mask(imagen_ndvi_actual.gt (0.5))
var areaImage_pie_actual = ndvi_en_pie_actual.multiply(ee.Image.pixelArea())
var stats_pie_actual = areaImage_pie_actual.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
//print('Sumatoria  de píxeles en pie actual: ', stats_pie_actual.get('NDVIS2_actual'), 'metros cuadrados');
// estadistica perdida actual 
var ndvi_perdida_actual =imagen_ndvi_actual.mask(imagen_ndvi_actual.lt (0.5))
var areaImage_perdida_actual = ndvi_perdida_actual.multiply(ee.Image.pixelArea())
var stats_perdida_actual = areaImage_perdida_actual.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
//imagen en pie anterior
var imagen_S2_anterior= imagen2_anterior.addBands(ndviS2_anterior .rename('NDVIS2_anterior')).clip(carto_prov);
var imagen_ndvi_anterior =imagen_S2_anterior.select ('NDVIS2_anterior')
////////////////////reclasifico imagen estado anterior
var DTstring_anterior = ['1) root 9999 9999 9999',
'2) NDVIS2_anterior<=0.25 9999 9999 1 *',
'3) NDVIS2_anterior>0.25 9999 9999 9999', //
'6) NDVIS2_anterior<=0.5 9999 9999 2 *',
'7) NDVIS2_anterior>0.5 9999 9999 3 *'].join("\n");
var classifier_anterior = ee.Classifier.decisionTree(DTstring_anterior);
var reclassifiedImage_anterior = imagen_ndvi_anterior.select('NDVIS2_anterior').classify(classifier_anterior);
var ndwiViz = {min: 1, max: 3, palette: ['red', 'yellow ', 'green ']};
//Map.addLayer(reclassifiedImage_anterior, ndwiViz, 'Clases de Estado anterior', false);
/////////////////////////////////////////
//////////////////////// reclasifico imagen de cambios
var clases_cambio  = ee.Image(1)
          .where(diferencia.gt(-1). and (diferencia.lt(0)), 2)
          .where(diferencia.gt(0).and (diferencia.lte(0.2)) , 3)
          .where(diferencia.gt(0.2), 4)
var ndwiViz = {min: 1, max: 4, palette: ['black', 'blue ', 'green ', 'red']};
//Map.addLayer(clases_cambio, ndwiViz, 'Mapa Clases de cambios', false);
///////////////////////////////////////////////////////////////
var ndvi_en_pie_anterior =imagen_ndvi_anterior.mask(imagen_ndvi_anterior.gt (0.5))
var areaImage_pie_anterior = ndvi_en_pie_anterior.multiply(ee.Image.pixelArea())
var stats_pie_anterior = areaImage_pie_anterior.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
// estadistica perdida anterior
var ndvi_perdida_anterior =imagen_ndvi_anterior.mask(imagen_ndvi_anterior.lt (0.25))
var areaImage_perdida_anterior = ndvi_perdida_anterior.multiply(ee.Image.pixelArea())
var stats_perdida_anterior = areaImage_perdida_anterior.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
print('Sumatoria  de píxeles perdida anterior : ', stats_perdida_anterior.get('NDVIS2_anterior'), 'metros cuadrados');
// estadistica perdida actual 
var ndvi_perdida_actual =imagen_ndvi_actual.mask(imagen_ndvi_actual.lt (0.25))
var areaImage_perdida_actual = ndvi_perdida_actual.multiply(ee.Image.pixelArea())
var stats_perdida_actual = areaImage_perdida_actual.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
print('Sumatoria  de píxeles perdida actual : ', stats_perdida_actual.get('NDVIS2_actual'), 'metros cuadrados');
/////////////////////////////////////////// estadistica incipiente  anterior
var ndvi_incipiente_anterior =imagen_ndvi_anterior.mask (imagen_ndvi_anterior.gte (0.25).and (imagen_ndvi_anterior.lte(0.5) ))
var areaImage_incipiente_anterior = ndvi_incipiente_anterior.multiply(ee.Image.pixelArea())
var stats_incipiente_anterior = areaImage_incipiente_anterior.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
print('Sumatoria  de píxeles incipiente anterior : ', stats_incipiente_anterior.get('NDVIS2_anterior'), 'metros cuadrados');
////////////////////////////////////////////// estadistica incipiente actual 
var ndvi_incipiente_actual =imagen_ndvi_actual.mask(imagen_ndvi_actual.gte (0.25).and (imagen_ndvi_actual.lte(0.5) ))
var areaImage_incipiente_actual = ndvi_incipiente_actual.multiply(ee.Image.pixelArea())
var stats_incipiente_actual = areaImage_incipiente_actual.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
print('Sumatoria  de píxeles incipiente actual : ', stats_incipiente_actual.get('NDVIS2_actual'), 'metros cuadrados');
//////////////////////////////////////
////////////////////////////////////////
/////////////////////////////////
// copy the call statement (above), below the creation of the function
var in_value_anterior =  stats_pie_anterior.get('NDVIS2_anterior');
var in_value_actual =  stats_pie_actual.get('NDVIS2_actual');
var valor_pie_actual = (ee.Number(in_value_actual ).multiply( 0.01))
var valor_pie_anterior = (ee.Number(in_value_anterior ).multiply( 0.01))
print ( "Ha en Pie periodo actual",valor_pie_actual )
print ( "Ha en Pie periodo anterior",valor_pie_anterior )
function calculate_porcentaje (in_value_actual, in_value_anterior) {
var porcentaje = ((ee.Number(in_value_actual ) .subtract (ee.Number(in_value_anterior))).divide (ee.Number(in_value_anterior))).multiply (100); // code that calculates the sum
   return porcentaje
}
calculate_porcentaje (in_value_actual, in_value_anterior)
var dif_porcentual_pie  = calculate_porcentaje (in_value_actual, in_value_anterior);
print ("Diferencia % en Pie período", dif_porcentual_pie )
var in_value_anterior =  stats_pie_anterior.get('NDVIS2_anterior');
var valor_porcentual  =  (ee.Number(dif_porcentual_pie ) )
function calculate_ha (in_value_anterior, valor_porcentual) {
var calculo = ((ee.Number(in_value_actual ).multiply( 0.01)).multiply(ee.Number(dif_porcentual_pie))).divide (100); // code that calculates the sum
   return calculo
}
var calculo_ha  = calculate_ha (in_value_actual, valor_porcentual);
print ("Diferencia ha en Pie período", calculo_ha )
/*
var in_value_anterior_incipiente =  stats_incipiente_anterior.get('NDVIS2_anterior');
var in_value_actual_perdida =  stats_perdida_actual.get('NDVIS2_actual');
var valor_perdida_actual = (ee.Number(in_value_actual_perdida ).multiply( 0.01))
var valor_perdida_anterior = (ee.Number(in_value_anterior_perdida ).multiply( 0.01))
print ( "Ha perdida periodo actual",valor_perdida_actual )
print ( "Ha perdida periodo anterior",valor_perdida_anterior )
function calculate_porcentaje (in_value_actual_perdida, in_value_anterior_perdida) {
var porcentaje = ((ee.Number(in_value_actual_perdida ) .subtract (ee.Number(in_value_anterior_perdida))).divide (ee.Number(in_value_anterior_perdida))).multiply (100); // code that calculates the sum
   return porcentaje
}
calculate_porcentaje (in_value_actual_perdida, in_value_anterior_perdida)
var dif_porcentual_perdida  = calculate_porcentaje (in_value_actual_perdida, in_value_anterior_perdida);
print ("Diferencia % perdida período", dif_porcentual_perdida )
var in_value_anterior_perdida =  stats_perdida_anterior.get('NDVIS2_anterior');
var valor_porcentual  =  (ee.Number(dif_porcentual_perdida ) )
function calculate_ha (in_value_actual_perdida, valor_porcentual) {
var calculo = ((ee.Number(in_value_actual_perdida ).multiply( 0.01)).multiply(ee.Number(dif_porcentual_perdida))).divide (100); // code that calculates the sum
   return calculo
}
var calculo_ha  = calculate_ha (in_value_actual_perdida, valor_porcentual);
print ("Diferencia ha pérdida período", calculo_ha )
*/
////////////////////////////////////////////
/////////////////////////////////////////////////////////////// Estados binarios anterior
var clases_estado_binario_anterior  = ee.Image(10)
          .where(imagen_ndvi_anterior.gt(-1). and (imagen_ndvi_anterior.lte(0.3)), 0)//nopie
          .where(imagen_ndvi_anterior.gt(0.3) , 1)
var clases_estado_binario_anterior_clip = clases_estado_binario_anterior.clip (carto_prov)
var binarioViz = {min: 0, max: 1, palette: [ 'red ', 'green']};
Map.addLayer(clases_estado_binario_anterior_clip, binarioViz, 'Estado Pie/NO pie anterior', false);
/////////////////////////////////////////////////   Estados binarios actual
var clases_estado_binario_actual  = ee.Image(10)
          .where(imagen_ndvi_actual.gt(-1). and (imagen_ndvi_actual.lte(0.3)), 0)
          .where(imagen_ndvi_actual.gt(0.3) , 1)
      var imagen = ee.Image(clases_estado_binario_actual)
 var clases_estado_binario_actual_clip = clases_estado_binario_actual.clip ( carto_prov)
var binarioViz = {min: 0, max: 1, palette: [ 'red ', 'green']};
Map.addLayer(clases_estado_binario_actual_clip, binarioViz, 'Estado Pie/NO pie actual', false);
var imagen_estado_dos_años = imagen_ndvi_actual
.addBands( imagen_ndvi_actual.gt(-0.1). and (imagen_ndvi_actual.lte(0.3)).rename ('no_pie_actual'))
.addBands (imagen_ndvi_actual.gt(0.3).and(imagen_ndvi_actual.lte(0.5)).rename( 'incipiente_actual'))
.addBands( imagen_ndvi_actual.gt(0.5).rename('pie_actual'))
.addBands( imagen_ndvi_anterior.gt(-0.1). and (imagen_ndvi_anterior.lte(0.3)).rename ('no_pie_anterior'))//no pie 
.addBands( imagen_ndvi_anterior.gt(0.3).and (imagen_ndvi_anterior.lte(0.5)).rename('incipiente_anterior'))// incipiente
.addBands( imagen_ndvi_anterior.gt(0.5).rename('pie_anterior'))//no pie
var cambioViz = { palette: [ 'red ','green', 'blue']};
Map.addLayer (imagen_estado_dos_años, {bands: ['no_pie_actual', 'incipiente_actual', 'pie_anterior'], min: [0], max: [1] }
, "Cambio interanual ", false ) ;
/////////////////////////////clasificar la imagen de cambio/////////////////7
///////////////////////////////////////// Calculo del cambio Forestal /No Forestal
var cambio_forestal = clases_estado_binario_actual_clip.subtract( clases_estado_binario_anterior_clip)
print ( cambio_forestal)
////////////////////// calculos
////////////////////////////////////////////// calculo neutro 
var cambio_forestal_neutro =cambio_forestal.mask(cambio_forestal.eq (0))
var area_cambio_neutro  = cambio_forestal_neutro.multiply(ee.Image.pixelArea())
var stats_cambio_neutro = area_cambio_neutro.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
print('Sumatoria  de píxeles cambio neutro  : ', stats_cambio_neutro.get('constant'), 'metros cuadrados');
//////////////////////cálculo pérdida 
////////////////////////////////////////////// calculo pérdida 
var cambio_forestal_perdida =cambio_forestal.mask(cambio_forestal.eq (-1))
var area_cambio_perdida  = cambio_forestal_perdida.multiply(ee.Image.pixelArea())
var stats_cambio_perdida = area_cambio_perdida.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
print('Sumatoria  de píxeles cambio perdida  : ', stats_cambio_perdida.get('constant'), 'metros cuadrados');
////////////////////////////////////////// cálculo ganancia
//////////////////////cálculo pérdida 
////////////////////////////////////////////// calculo ganancia 
var cambio_forestal_ganancia =cambio_forestal.mask(cambio_forestal.eq (1))
var area_cambio_ganancia  = cambio_forestal_ganancia.multiply(ee.Image.pixelArea())
var stats_cambio_ganancia = area_cambio_ganancia.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
print('Sumatoria  de píxeles cambio ganancia  : ', stats_cambio_ganancia.get('constant'), 'metros cuadrados');
/////////////////////////////////////////////////////////////
//Map.addLayer(diferencia ,{ min:-0.25, max: 0.4238, palette: [ 'blue', 'green', 'red']}, "Cambios en las plantaciones ", false );
Map.addLayer (imagen_ndvi_anterior, NDVIVisParam_anterior , "Estado plantación  anterior", false ) ;
Map.addLayer (imagen_ndvi_actual, NDVIVisParam_actual , "Estado plantación  actual", true ) ;
/////////////////////////////////
Map.addLayer(cambio_forestal, cambioViz, 'Análisis de cambios cobertura forestal', false);
////////////////////////////////////////////////////////7
//var diferencia_cuadrada = diferencia.pow(2);
Map.addLayer(ndvi_en_pie_anterior ,NDVIVisParam_anterior, " Plantaciones en Pie anterior ", false );
Map.addLayer(ndvi_en_pie_actual ,NDVIVisParam_actual, " Plantaciones en  Pie actual  ", false );
Map.addLayer(ndvi_incipiente_anterior ,NDVIVisParam_anterior, " Plantación incipiente  anterior  ", false );
Map.addLayer(ndvi_incipiente_actual ,NDVIVisParam_actual, " Plantación Incipiente en pie  actual  ", false );
Map.addLayer(ndvi_perdida_anterior ,NDVIVisParam_anterior, " Plantación NO en pie  anterior  ", false );
Map.addLayer(ndvi_perdida_actual ,NDVIVisParam_actual, " Plantación NO en pie  actual  ", false );
Map.addLayer(outline, {palette: '0000FF'}, 'Cartografía Plantaciones Forestales - vectorial', false);
/////////////////////////compilacion
var imagen_ndvi_actual =imagen_S2_actual.select ('NDVIS2_actual')
var imagen_ndvi_anterior = imagen_S2_anterior.select ('NDVIS2_anterior')
var compilada = imagen_ndvi_actual.addBands(cambio_forestal_neutro).addBands(cambio_forestal_perdida).addBands( cambio_forestal_ganancia)
var cambioViz = {min: -1, max: 1, palette: [ 'red ','green', 'blue']};
//clasificacion
//Map.addLayer(clases_cambio, ndwiViz, 'Mapa Clases de cambios', false);
///////////////histograma ndvi
//var histogram = ui.Chart.image.histogram(image, region, 30)