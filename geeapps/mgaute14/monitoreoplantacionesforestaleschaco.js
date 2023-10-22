var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -60.45326159142298,
            -26.82256131510839
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Point([-60.45326159142298, -26.82256131510839]);
Map.setCenter (  -60.45, -26.82 ,12)
//Mostrar imagen google satelital detras del mapa.
Map.setOptions("HYBRID")
var snazzyBlack = [
  //{
    //featureType: 'administrative',
    //elementType: 'all',
    //stylers: [{visibility: 'off'}]
  //},
  //{
    //featureType: 'administrative',
    //elementType: 'labels.text.fill',
    //stylers: [{color: '#444444'}]
  //},
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [{color: '#000000'}, {visibility: 'on'}]
}]
var snazzyColor = [
  {
    featureType: 'landscape',
    elementType: 'geometry.fill',
    stylers: [{color: '#FBFCF4'}]
  }]
Map.setOptions('snazzyBlack', {snazzyBlack: snazzyBlack, snazzyColor: snazzyColor});
//var geometry = ee.FeatureCollection('users/mgaute/limitenacional');
//var cartografia_plantaciones_corrientes = ee.FeatureCollection('users/mgaute/cartografia_corrientes');
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/cobertura_11052020');  
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/plantaciones_forestales_NEA_macizos_02_07_2020')
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/macizos_corrientes_29_07_2020')
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/macizos_misiones_29_07_2020')
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/macizos_entrerios_29_07_2020')
var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/macizos_02_07_2020')
var carto_prov = cartografia_plantaciones.filter(ee.Filter.stringStartsWith('prov',"CHACO"))
//var region = ee.FeatureCollection( 'users/mgaute/limites_provincias_NEA')
var region = ee.FeatureCollection( 'users/mgaute/provincias/provincias_ign_2015')
//var cartografia_plantaciones = ee.FeatureCollection( 'users/mgaute/macizos_mapa_fina')
var geometry = region.filter(ee.Filter.stringStartsWith('nombre',"CHACO"))
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
var START_actual = ee.Date("2020-06-01");
var END_actual = ee.Date("2020-07-26");
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
var START_anterior = ee.Date("2019-06-01");
var END_anterior = ee.Date("2019-07-26");
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
var NDVIVisParam = {
  bands: ['NDVIS2'],
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
var imagen_S2_actual = imagen2_actual.addBands(ndviS2_actual.rename('NDVIS2')).clip(carto_prov);
var imagen_S2_anterior = imagen2_anterior.addBands(ndviS2_anterior.rename('NDVIS2_anterior')).clip(carto_prov);
//var imagen_S2_actual_buffer = imagen2_actual_buffer.addBands(ndviS2_actual.rename('NDVIS2')).clip(bufferedPolys);
var imagen_ndvi_actual =imagen_S2_actual.select ('NDVIS2')
var imagen_ndvi_anterior = imagen_S2_anterior.select ('NDVIS2_anterior')
var diferencia =imagen_ndvi_anterior.subtract(imagen_ndvi_actual)
print ( diferencia)
//var diferencia_cuadrada = diferencia.pow(2);
Map.addLayer(diferencia ,{ min:-0.25, max: 0.4238, palette: [ 'blue', 'green', 'red']}, "Cambios en las plantaciones " );
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
Map.addLayer (perdida, {palette: 'red'} , "cosecha ", false ) ;
Map.addLayer (imagen_ndvi_actual, NDVIVisParam , "Estado plantación actual", false ) ;
Map.addLayer(outline, {palette: '0000FF'}, 'Cartografía Plantaciones Forestales - vectorial', false);
/////////////////////////////////////////////estadistica cambios
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
var stats_perdida= areaImage_perdida.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
print('Sumatoria  de píxeles perdida ', stats_perdida.get('NDVIS2_anterior'), 'metros cuadrados');
/////////////////////////////////////////////estadistica estado actual
var imagen_S2_actual = imagen2_actual.addBands(ndviS2_actual.rename('NDVIS2')).clip(carto_prov);
var imagen_ndvi =imagen_S2_actual.select ('NDVIS2')
var ndvi_en_pie =imagen_ndvi.mask(imagen_ndvi.gt (0.5))
var areaImage_pie = ndvi_en_pie.multiply(ee.Image.pixelArea())
var stats_pie = areaImage_pie.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
print('Sumatoria  de píxeles en pie: ', stats_pie.get('NDVIS2'), 'metros cuadrados');
///////////////histograma ndvi
//var histogram = ui.Chart.image.histogram(image, region, 30)