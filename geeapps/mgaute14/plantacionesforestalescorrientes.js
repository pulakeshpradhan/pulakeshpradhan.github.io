//////// hansen
//alert ('El umbral es 0.5)')
//Cambiar el geometry por el de limnte nacional
// falta, filtra ultimo año hansen 
// cruzar capa plantaciones con ese único año
// extraer esos polígonos de plantaciones
////// alturas
// cortar la capa de GLAD con plantaciones
Map.setCenter (  -55.98506790683126,-28.41104044317974,14)
//Mostrar imagen google satelital detras del mapa.
Map.setOptions("HYBRID") 
//var geometry = ee.FeatureCollection('users/mgaute/limitenacional');
//var cartografia_plantaciones_corrientes = ee.FeatureCollection('users/mgaute/cartografia_corrientes');
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/cobertura_11052020');  
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/plantaciones_forestales_NEA_macizos_02_07_2020')
var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/macizos_corrientes_29_07_2020')
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/macizos_misiones_29_07_2020')
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/macizos_entrerios_29_07_2020')
var predios = ee.FeatureCollection( 'users/mgaute/campo_garruchos')
var predios2 = ee.FeatureCollection( 'users/mgaute/Campo-Puerto-Valle')
var carto_predios = predios.merge(predios2)
//var predios = ee.FeatureCollection ( 'users/mgaute/predios_Alto_Parana_lote_verificacion_sup')
//var predios = ee.FeatureCollection ( 'users/mgaute/rodal_arauco')
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/macizos_02_07_2020')
//var cartografia_plantaciones = ee.FeatureCollection ( 'users/mgaute/macizos_bdp')
//var region = ee.FeatureCollection( 'users/mgaute/limites_provincias_NEA')
var region = ee.FeatureCollection( 'users/mgaute/provincias/provincias_ign_2015')
//var cartografia_plantaciones = ee.FeatureCollection( 'users/mgaute/macizos_mapa_fina')
var geometry_Corrientes = region.filter(ee.Filter.stringStartsWith('nombre',"CORRIENTES"))
var geometry_Misiones = region.filter(ee.Filter.stringStartsWith('nombre',"MISIONES"))
var geometry_EntreRios = region.filter(ee.Filter.stringStartsWith('nombre',"ENTRE RÍOS"))
var geometry_total = geometry_Corrientes.merge( geometry_Misiones)
//var geometry = ee.FeatureCollection ('users/mgaute/provincias/area_recorte_sentinel')
//Filtrar por nombres
//var geometry  = region.filter(ee.Filter.inList('nombre', 
          //ee.List(['CORRIENTES', 'CHACO', 'ENTRE RÍOS','SANTIAGO DEL ESTERIO', 'SANTA FE', 'CÓRDOBA','BUENOS AIRES'])));
//var geometry  = region.filter(ee.Filter.inList('nombre', 
          //ee.List(['BUENOS AIRES'])));
var GFCH = ee.ImageCollection('users/potapovpeter/GEDI_V27')  
/*
var dataset = ee.Image('UMD/hansen/global_forest_change_2019_v1_7');
var perdida = dataset. select ( 'lossyear') 
var perdida_clic = perdida.mask(perdida.gt (15)).clip (geometry)
*/
//var buffer = ee.FeatureCollection('users/mgaute/Contorno_Buffer_500m')
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/macizos_02_07_2020')
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/macizos_misiones_29_07_2020')
//var cartografia_plantaciones = ee.FeatureCollection('users/mgaute/macizos_entrerios_29_07_2020')
/*
//var geometry = ee.FeatureCollection('users/mgaute/limites_provincia_entrerios');
var forestland = ee.Image('users/mgaute/forestland2');
var limite = geometry.map(function(feature) {
  return feature.simplify({maxError: 100});
});
var cartografia = cartografia_plantaciones.map(function(feature) {
  return feature.simplify({maxError: 10});
});
/*
var bufferPoly100 = function(feature) {
  return feature.buffer(100);   
};
var bufferedPolys = cartografia_plantaciones.map(bufferPoly100).union ()
////////////////////////////////////////////////////////
*/
// Visualize FireCCI51 for the year 2019
var dataset = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
                  .filterDate('2019-01-01', '2019-12-31');
var burnedArea = dataset.select('BurnDate');
// Use a circular palette to assign colors to date of first detection
var baVis = {
  min: 1,
  max: 366,
  palette: [
    'ff0000', 'fd4100', 'fb8200', 'f9c400', 'f2ff00', 'b6ff05',
    '7aff0a', '3eff0f', '02ff15', '00ff55', '00ff99', '00ffdd',
    '00ddff', '0098ff', '0052ff', '0210ff', '3a0dfb', '7209f6',
    'a905f1', 'e102ed', 'ff00cc', 'ff0089', 'ff0047', 'ff0004'
  ]
};
var maxBA = burnedArea.max().clip (cartografia_plantaciones)
Map.addLayer(maxBA, baVis, 'Burned Area', false);
///////////////////////////water///////////////////////////
var coleccion_paletas =  require ('users/gena/packages:palettes');
var gsw = ee.Image("JRC/GSW1_2/GlobalSurfaceWater")
var occurrence = gsw.select('occurrence');
var VIS_OCCURRENCE = {
  min:0,
  max:100,
  palette: ['white', 'blue']
};
var VIS_WATER_MASK = {
  palette: ['black', 'blue']
};
//////////////////////////////////////////////////////////////
// Calculations
//////////////////////////////////////////////////////////////
// Create a water mask layer, and set the image mask so that non-water areas
// are opaque.
var water_mask = occurrence.gt(90).unmask(0);
var water_mask_clip = water_mask
//.clip (geometry)
var occurrence = gsw.select('occurrence');
var occurrence_clic = occurrence
//.clip (geometry)
//Map.addLayer(occurrence);
//Map.addLayer({eeObject: occurrence_clic, visParams:VIS_OCCURRENCE, name: 'Global Surface Water (1984-2019) '});
//Map.addLayer({ eeObject: water_mask_clip,visParams: VIS_WATER_MASK,name: '90% occurrence water mask'});
//////////////////////////////hansen///////////////
var dataset = ee.Image('UMD/hansen/global_forest_change_2019_v1_7');
var perdida = dataset. select ( 'lossyear') 
//var perdida_clic = perdida.mask(perdida.gt (18)).clip (cartografia_plantaciones)
var perdida_clic = perdida.clip (cartografia_plantaciones)
var treeCoverVisParam = {
  bands: ['treecover2000'],
  min: 0,
  max: 100,
  palette: ['black', 'green']
};
//Map.addLayer(dataset, treeCoverVisParam, 'tree cover');
var treeLossVisParam = {
  bands: ['lossyear'],
  min: 0,
  max: 19,
  palette: ['yellow', 'red']
};
Map.addLayer(perdida_clic, treeLossVisParam, 'Año de Aprovechamiento 2019', false) ;
////////////////////////////////////////////////////////////////
////////////////// estilo GFCH///////////////////7
var GFCHVisParam = {
  bands: ['b1'],
  min: 3,
  max: 50,
  palette: ['black', 'green','yellow', 'red']
};
Map.addLayer(GFCH, GFCHVisParam, 'Global Forest Canopy Height GLAD 2019', false) ;
/// Estilos borde cartografía 
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: cartografia_plantaciones,
  color: 1,
  width: 2
});
var outline2 = empty.paint({
  featureCollection: carto_predios,
  color: 1,
  width: 2
});
////////////////Sentinel
var START_actual = ee.Date("2020-07-01");
var END_actual = ee.Date("2020-09-01");
var productoS2_actual =  ee.ImageCollection('COPERNICUS/S2') 
.filterDate(START_actual,END_actual)
.filterBounds ( geometry_total)
//print (collectionS2);
var bandasS2_actual =['B3','B4','B8', 'B11']
// filtrar coleccion
var col2_actual  =productoS2_actual
//.filterBounds(predios) 
// cobertura de nubes máxima
//.filterMetadata('CLOUD_COVER','less_than', 60)
.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than',5)
.select(bandasS2_actual)
//print(col2);
// convertir coleccion a imagen, reduce a mediana
var imagen2_actual =col2_actual.mean().clip(cartografia_plantaciones)
// ver imagen en mapa
Map.addLayer (imagen2_actual, {bands: ['B8', 'B11', 'B3'], min: [49.5], max: [3241] }
, "Mosaico Sentinel 2 septiembre 2020 ", false ) ;
////////////////////////////////////////// Sentinel Anterior /////////////////////////
/*
var START_anterior = ee.Date("2019-01-01");
var END_anterior = ee.Date("2019-03-20");
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
// Calculo del NDVI_S2 usando una expresion
var ndviS2_actual  = imagen2_actual.expression(
    '(NIR - RED) / (NIR + RED)',
    { 'NIR': imagen2_actual.select('B8'),
      'RED': imagen2_actual.select('B4')
    });
var imagen_S2_actual = imagen2_actual.addBands(ndviS2_actual.rename('NDVIS2')).clip(cartografia_plantaciones);
var imagen_ndvi =imagen_S2_actual.select ('NDVIS2')
/////////////////en pie//////////////////
var ndvi_en_pie =imagen_ndvi.mask(imagen_ndvi.gt (0.5))
var ndvi_no_pie =imagen_ndvi.mask(imagen_ndvi.lt (0.5))
////////////////////////PALETAS//////////////7
var coleccion_paletas =  require ('users/gena/packages:palettes')
var mipaleta = coleccion_paletas.colorbrewer.Spectral [11].reverse(); 
var mipaletandvi = coleccion_paletas.colorbrewer.RdYlGn [11]//.reverse(); 
var NDVIVisParam = {
  bands: ['NDVIS2'],
  min: 0,
  max: 1,
  palette: mipaletandvi
};
var HD_plantaciones_forestales_SUR =ee.Image( 'users/mgaute/imagen_altura_junio_agosto_euca_-0000023296-0000023296')
//Map.addLayer (HD_plantaciones_forestales_SUR, {bands:['b1'], min: [4], max: [40], palette: mipaleta} , "Altura Dominante (Sector SUR - Entre Ríos).Agosto.2019", false)
var HD_plantaciones_forestales_NORTE =ee.Image('users/mgaute/imagen_altura_junio_agosto_2019_id_23296')
//Map.addLayer (HD_plantaciones_forestales_NORTE, {bands:['b1'], min: [4], max: [40], palette: mipaleta } , "Altura Dominante (Sector NORTE - Entre Ríos).Agosto.2019", false)
//Calculate histograms for each image
print(ui.Chart.image.histogram({image:HD_plantaciones_forestales_NORTE, region:geometry_EntreRios, scale:100,  }));
print(ui.Chart.image.histogram({image:HD_plantaciones_forestales_SUR, region:geometry_EntreRios, scale:100,  }));
var forestland = ee.Image('users/mgaute/forestland2')
.clip (cartografia_plantaciones )
print(ui.Chart.image.histogram({image:forestland, region:geometry_Corrientes, scale:100, maxPixels: 1e12  }));
var palette_clasificacion =
['ff0000',// dunnii  (red)
              '9933ff',//grandis  (purple)
               'fffe9b',//grandis  (amarillo)
              '008000',//pinus elliottii  (green)
];
Map.addLayer(forestland, 
{ min: 1, max: 4, palette:palette_clasificacion },
'Especies forestales (marzo-abril 2020)',true);
Map.addLayer(outline, {palette: '0000FF'}, 'Cartografía Plantaciones Forestales - vectorial', false);
//Map.addLayer(outline, {palette: '0000FF'}, 'Cartografía Plantaciones Forestales - vectorial', false);
//Map.addLayer(outline2, {palette: 'e8ea1b'}, 'Predios', false);
//Map.addLayer(outline4, {palette: '80ff00'}, 'Buffer', false);
/////////////contar numero de pixeles
//  var areaImage_pie = ndvi_en_pie.multiply(ee.Image.pixelArea())
  //  var areaImage_no_pie = ndvi_no_pie.multiply(ee.Image.pixelArea())
//print ( areaImage_pie)
Map.addLayer (ndvi_en_pie, NDVIVisParam , "plantaciones en Pie ", false ) ;
Map.addLayer (ndvi_no_pie, NDVIVisParam , "plantaciones: cosechadados/incipientes", false ) ;
Map.addLayer (imagen_ndvi, NDVIVisParam , "plantaciones: total", true ) ;
/*
 var stats_pie = areaImage_pie.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry_Misiones,
  scale: 10,
  maxPixels: 1e12
});
print('Sumatoria  de píxeles en pie: ', stats_pie.get('NDVIS2'), 'metros cuadrados');
var stats_no_pie = areaImage_no_pie.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry_Misiones,
  scale: 10,
  maxPixels: 1e12
});
print('Sumatoria  de píxeles NO en pie: ', stats_no_pie.get('NDVIS2'), 'metros cuadrados');
*/