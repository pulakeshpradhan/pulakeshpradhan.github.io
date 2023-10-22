var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "constant"
        ],
        "max": 4,
        "palette": [
          "ff0000",
          "ffff00",
          "008000",
          "91681d"
        ]
      }
    }) || {"opacity":1,"bands":["constant"],"max":4,"palette":["ff0000","ffff00","008000","91681d"]},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
Map.setCenter (  -55.89038983817748,-28.069098682870578,14)
var Fondo_Oscuro = [
  /*{
    featureType: 'administrative',
    elementType: 'all',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [{color: '#444444'}]
  },*/
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [{color: '#000000'}, {visibility: 'on'}]
}]
Map.setOptions('Fondo_Oscuro', {Fondo_Oscuro: Fondo_Oscuro} );
/// mortandad""
var coleccion_paletas =  require ('users/gena/packages:palettes');
var region = ee.FeatureCollection( 'users/mgaute/provincias/provincias_ign_2015');
var geometry1 = region.filter(ee.Filter.stringStartsWith('nombre',"CORRIENTES"));
var geometry2 = region.filter(ee.Filter.stringStartsWith('nombre',"ENTRE RÍOS"));
var geometry3 = region.filter(ee.Filter.stringStartsWith('nombre',"MISIONES"));
var geometry = geometry1.merge(geometry2).merge(geometry3)
//var cartografia_plantaciones_euca_corrientes = ee.FeatureCollection('users/mgaute/cartografia_corrientes');
//var cartografia_plantaciones_euca = ee.FeatureCollection('users/mgaute/cobertura_11052020');  
//var cartografia_plantaciones_euca = ee.FeatureCollection('users/mgaute/plantaciones_forestales_NEA_macizos_02_07_2020')
var incendios = ee.FeatureCollection ( 'users/mgaute14/Incendios_Forestales')
var cicatrices_fuego  = incendios.map(function(feature) {
  return feature.simplify({maxError: 10});
});
// Make an image out of the land geometry attribute.
var landMask = cicatrices_fuego
  .filter(ee.Filter.notNull(['año']))
  .reduceToImage({
    properties: ['año'],
    reducer: ee.Reducer.first()
});
var buffer = ee.FeatureCollection('users/mgaute/Contorno_Buffer_500m')
//var cartografia_plantaciones_euca = ee.FeatureCollection('users/mgaute/macizos_02_07_2020')
//var cartografia_completa = ee.FeatureCollection('users/mgaute14/plantaciones_eucalyptus')
var cartografia_completa = ee.FeatureCollection('users/mgaute14/macizos_02_01_2023_nea')
var parcelas  = ee.FeatureCollection ( 'users/mgaute14/rodales_afectados_por_sequia')
var cartografia_plantaciones1 = cartografia_completa.filter(ee.Filter.stringStartsWith('prov',"CORRIENTES"))
var cartografia_plantaciones2 = cartografia_completa.filter(ee.Filter.stringStartsWith('prov',"ENTRE RÍOS"))
var cartografia_plantaciones3 = cartografia_completa.filter(ee.Filter.stringStartsWith('prov',"MISIONES"))
//var cartografia_plantaciones = cartografia_plantaciones1.merge(cartografia_plantaciones2).merge(cartografia_plantaciones3)
//var cartografia_plantaciones_euca = cartografia_plantaciones.filter( ee.Filter.stringStartsWith( 'genero', 'Eucalyptus'))
var cartografia_plantaciones = cartografia_plantaciones1.merge(cartografia_plantaciones2).merge(cartografia_plantaciones3)
var cartografia_plantaciones_euca_todos_estados = cartografia_plantaciones.filter( ee.Filter.stringStartsWith( 'genero', 'Eucalyptus'))
var cartografia_plantaciones_euca = cartografia_plantaciones_euca_todos_estados.filter( ee.Filter.neq( 'estado_pl', 'Cosechado'))
var plantaciones_con_altura = ee.FeatureCollection ( 'users/mgaute14/puntos_registfor_plantaciones_altura_eucalyptus')
var rebrotes  = ee.FeatureCollection ( 'users/mgaute14/puntos_registfor_plantaciones_rebrotes_eucalyptus')
print ( plantaciones_con_altura)
var carto_parcelas_er_concordia = ee.FeatureCollection('users/mgaute/Parcelas_rectangulares_buffer_4326')
var cartografia = cartografia_plantaciones_euca.map(function(feature) {
  return feature.simplify({maxError: 10});
});
/*
var bufferPoly100 = function(feature) {
  return feature.buffer(100);   
};
var bufferedPolys = cartografia_plantaciones_euca_euca.map(bufferPoly100).union ()
*/
/*
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
Map.addLayer({eeObject: occurrence_clic, visParams:VIS_OCCURRENCE, name: 'Global Surface Water (1984-2019) '});
Map.addLayer({
  eeObject: water_mask_clip,
  visParams: VIS_WATER_MASK,
  name: '90% occurrence water mask'
});
/*
//////////////////////////////hansen///////////////
var dataset = ee.Image('UMD/hansen/global_forest_change_2019_v1_7');
var perdida = dataset. select ( 'lossyear') 
var perdida_clic = perdida.mask(perdida.gt (15)).clip (cartografia_plantaciones_euca_euca)
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
//Map.addLayer(perdida_clic, treeLossVisParam, 'Año de Aprovechamiento', false) ;
////////////////////////////////////////////////////////////////
*/
/// Estilos borde cartografía 
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: cartografia_plantaciones_euca,
  color: 1,
  width: 0.5
});
var outline_datos_altura = empty.paint({
  featureCollection: plantaciones_con_altura,
  color: 1,
  width: 0.5
});
/*
var outline2 = empty.paint({
  featureCollection: cartografia_plantaciones_euca_euca_corrientes,
  color: 1,
  width: 2
});
*/
/*
var outline3 = empty.paint({
  featureCollection: bufferedPolys,
  color: 1,
  width: 2
});
*/
var outline4 = empty.paint({
  featureCollection: buffer,
  color: 1,
  width: 1.5
});
///////ALTURAS////////////////
//Altura Gaute
var altura_gaute = ee.Image('users/mgaute/altura_gaute_2022');
var altura_gaute_clip = altura_gaute.clip(cartografia_plantaciones_euca)
print (altura_gaute_clip
)
//Alturas GEDI
var rh95 = ee.ImageCollection('LARSE/GEDI/GEDI02_A_002_MONTHLY')
            //.filter(ee.Filter.date('2019-01-01', '2021-12-31'))
            .filter(ee.Filter.date('2020-01-01', '2021-12-31'))
            .filterBounds(geometry).select('rh95')
var imagen_rh95=rh95.mean().clip(cartografia_plantaciones_euca) 
print (imagen_rh95 )
var pal0 = {min:2,max:50,palette:['blue','00d81b','yellow','red', '1a1a1a']};
var imagen_rh95_filtro = imagen_rh95.mask(imagen_rh95.gte(2))
// Define arbitrary thresholds on the 6-bit nightlights image.
var zones = imagen_rh95.gt(2).add(imagen_rh95.gt(10)).add(imagen_rh95.gt(20));
zones = zones.updateMask(zones.neq(0))
// Convert the zones of the thresholded nightlights to vectors.
var vectors = zones.addBands(imagen_rh95).reduceToVectors({
  geometry: geometry,
  crs: imagen_rh95.projection(),
  scale: 10,
  geometryType: 'polygon',
  eightConnected: false,
  maxPixels: 1e13,
  labelProperty: 'GEDI_VECTOR',
  reducer: ee.Reducer.mean()
});
//Map.addLayer ( vectors, {color:  'red'} ,'Vector GEDI' )
///////////////////////////////////////// Sentinel Anterior /////////////////////////
var START_anterior = ee.Date("2018-08-01");
var END_anterior = ee.Date("2018-09-30");
var productoS2_anterior =  ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED') 
.filterDate(START_anterior,END_anterior);
//print (collectionS2);
var bandasS2_anterior=['B3','B4','B8', 'B11']
// filtrar coleccion
var col2_anterior=productoS2_anterior
.filterBounds(geometry) 
// cobertura de nubes máxima
//.filterMetadata('CLOUD_COVER','less_than', 60)
.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than',5)
.select(bandasS2_anterior)
//print(col2);
// convertir coleccion a imagen, reduce a mediana
var imagen2_anterior =col2_anterior.mean()//.clip(buffer)
// ver imagen en mapa
//Map.addLayer (imagen2_anterior, {bands: ['B8', 'B11', 'B3'], min: [49.5], max: [3241] }, "Imagen Sentinel septiembre 2018 ", false ) ;
//////////////////sentinel 2 ACTUAL //////////////////////7
var START_actual = ee.Date("2022-11-01");
var END_actual = ee.Date("2022-12-30");
var productoS2_actual =  ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED') 
.filterDate(START_actual,END_actual);
//print (collectionS2);
var bandasS2_actual =['B3','B4','B5','B8', 'B11','B12' ]
// filtrar coleccion
var col2_actual  =productoS2_actual
.filterBounds(geometry) 
// cobertura de nubes máxima
//.filterMetadata('CLOUD_COVER','less_than', 60)
.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than',5)
.select(bandasS2_actual)
//print(col2);
// convertir coleccion a imagen, reduce a mediana
var imagen2_actual =col2_actual.mean()//.clip(buffer)
var img_inversa = imagen2_actual.updateMask(landMask.unmask().not())
print (img_inversa)
Map.addLayer (img_inversa, {bands: ['B8', 'B11', 'B3'], min: [49.5], max: [3241] }
, "Imagen Sentinel diciembre 2022 ", false ) ;
// ver imagen en mapa
//Map.addLayer (imagen2_actual, {bands: ['B8', 'B11', 'B3'], min: [49.5], max: [3241] }, "Imagen satelital Sentinel 2 septiembre 2022 ", false ) ;
/////////////////////////////planet
var planet = ee.ImageCollection("projects/planet-nicfi/assets/basemaps/americas");
//Map.addLayer ( planet, {bands: ['N', 'R', 'G'], },"Imagen Planet & NICFI")
//Map.addLayer(planet, {"opacity":1,"bands":["N","G","R"],"min":405.79,"max":4499.71,"gamma":2.331}, "Planet falso color", false)
//Map.addLayer(planet, {"opacity":1,"bands":["R","G","B"],"min":405.79,"max":4499.71,"gamma":2.331},"Planet color verdadero (RGB)", false)
/////////////////////// productoS2_2S2//////////////
// Calculo del NDVI_S2 usando una expresion
var ndviS2_actual  = img_inversa.expression(
    '(NIR - RED) / (NIR + RED)',
    { 'NIR': img_inversa.select('B8'),
      'RED': img_inversa.select('B4')
    });
//Calculo NBR
var nbr_actual = img_inversa.expression(
    '(nir - swir) / (nir + swir)',
    { 'nir': img_inversa.select('B5'),
      'swir': img_inversa.select('B12')
    });
//Calculo Moisture Stress Index (MSI):
var msi_actual = img_inversa.expression(
    '(MidIR /NIR)',
    { 'MidIR': img_inversa.select('B11'),
      'NIR': img_inversa.select('B8')
    });
//Cálculo Green Coverage Index (GCI):
var gci_actual = img_inversa.expression(
    '(NIR * RED) / (Green ** 2.0)',
    { 'NIR': img_inversa.select('B8'),
    'RED': img_inversa.select('B4'),
      'Green': img_inversa.select('B3'), 
    });
//var imagen_S2_actual_macizos = img_inversa.addBands(ndviS2_actual.rename('NDVIS2')).clip(carto_prov);
/////parámetros de ajuste
var imagen_S2_actual_buffer = img_inversa.addBands(ndviS2_actual.rename('NDVIS2')).clip(buffer);
var imagen_S2_actual_macizos = img_inversa.addBands(ndviS2_actual.rename('NDVIS2')).clip(cartografia_plantaciones_euca);
var imagen_S2_actual_macizos_nbr = img_inversa.addBands(nbr_actual.rename('NBRS2')).clip(cartografia_plantaciones_euca);
var imagen_S2_actual_macizos_msi = img_inversa.addBands(msi_actual.rename('MSIS2')).clip(cartografia_plantaciones_euca);
var imagen_S2_actual_macizos_gci = img_inversa.addBands(gci_actual.rename('GCIS2')).clip(cartografia_plantaciones_euca);
var imagen_B3_actual =imagen_S2_actual_macizos.select ('B3')
var imagen_ndvi_actual =imagen_S2_actual_macizos.select ('NDVIS2')
var imagen_gci_actual =imagen_S2_actual_macizos_gci.select ('GCIS2')
var b3_actual =imagen_B3_actual.mask(imagen_B3_actual.lte (450))
print (b3_actual)
///Para ver imagen con B3
//Map.addLayer (b3_actual, {}, "b3")
///Para ver imagen en pie//
var ndvi_en_pie_actual =imagen_ndvi_actual.mask(imagen_ndvi_actual.gt (0.3456))
//var nbr_en_pie_actual =imagen_S2_actual_macizos_nbr.mask( imagen_S2_actual_macizos_gci.gt(3.8104).and (imagen_S2_actual_macizos_gci.lte(4.5))  )
///para filtrar imagen de NBR
var imagen_nbr_actual =imagen_S2_actual_macizos_nbr.select ('NBRS2')
//Map.addLayer (imagen_nbr_actual , {palette:['ff0000']},'indice NBR');
var nbr_en_pie_actual_1 =imagen_nbr_actual.mask( imagen_nbr_actual.gt(-0.39).and (imagen_nbr_actual.lte(0.019) ))
//0.29
//mascara cosecha con NDVI
var nbr_en_pie_actual2= imagen_nbr_actual.mask((imagen_ndvi_actual.gt(0.2983120))  )
//mascara cosecha con gci 
var nbr_en_pie_actual3= nbr_en_pie_actual2.mask((imagen_gci_actual.gt(3.5))  )
//Altura GFH
var global_forest_height = ee.ImageCollection ( 'users/potapovpeter/GEDI_V27')
var gfhViz = {min: 0, max: 40, palette: ['daef9a','yellow','green','red' ]};
var imagen_gfh_2019 =global_forest_height.mean().clip (cartografia_plantaciones_euca)
// mascara con altura de plantacioens
var nbr_en_pie_actual = nbr_en_pie_actual3.mask((imagen_gfh_2019.gt(15))  )
var clases_estado_binario_actual  = ee.Image(10)
          .where(ndvi_en_pie_actual.gt(0.37). and (ndvi_en_pie_actual.lte(0.39)), 0)
          .where(ndvi_en_pie_actual.gt(0.4). and (ndvi_en_pie_actual.lte(0.45)), 1)
          .where(ndvi_en_pie_actual.gt(0.46). and (ndvi_en_pie_actual.lte(0.5)), 2)
          .where(ndvi_en_pie_actual.gt(0.51). and (ndvi_en_pie_actual.lte(0.7)), 3)
          .where(ndvi_en_pie_actual.gt(0.71) . and (ndvi_en_pie_actual.lte(0.9)), 4)
//-0.28002769124264454
//0.01598173515981735
var clases_estado_binario_actual_NBR  = ee.Image(7)
          .where(nbr_en_pie_actual.gt(-0.35). and (nbr_en_pie_actual.lte(-0.259)), 0)
          .where(nbr_en_pie_actual.gt(-0.259). and (nbr_en_pie_actual.lte(-0.22)), 1)
          .where(nbr_en_pie_actual.gt(-0.22). and (nbr_en_pie_actual.lte(-0.159)), 2)
          .where(nbr_en_pie_actual.gt(-0.159). and (nbr_en_pie_actual.lte(0)), 3)
          .where(nbr_en_pie_actual.gt(0) . and (nbr_en_pie_actual.lte(0.2)), 4)
/////////////////ESTADÍSTICA
/*
// estadistica en pie
//parcialmente afectado
//var nbr_en_pie_actual =nbr_en_pie_actual.mask(nbr_en_pie_actual.gt(-0.26).and (nbr_en_pie_actual.lte (-0.159)))
// totalmente afectado
//var imagen_nbr_actual_totalmente_afectado =nbr_en_pie_actual.mask(nbr_en_pie_actual.gt(-0.361585).and (nbr_en_pie_actual.lte (-0.181486002451418204)).and (imagen_B3_actual.lte(450.1)))
//var imagen_nbr_actual_parcialmente_afectado =nbr_en_pie_actual.mask((nbr_en_pie_actual.gt(-0.181486002451418204).and (nbr_en_pie_actual.lte (-0.10))).and (imagen_B3_actual.lte(450.1)))
Map.addLayer (imagen_nbr_actual_totalmente_afectado , {palette:['ff0000']},'totalmente afectado');
Map.addLayer (imagen_nbr_actual_parcialmente_afectado , {palette:['ca6f2f']},'parcialmente afectado');
var area_totalmente_afectado = imagen_nbr_actual_totalmente_afectado.multiply(ee.Image.pixelArea())
var stats_pie_actual_nbr = area_totalmente_afectado.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
var in_value_actual_nbr =  stats_pie_actual_nbr.get('NBRS2');
var valor_nbr_actual = (ee.Number(in_value_actual_nbr ).multiply( 0.01))
print ( "Ha totalmente afectado ",valor_nbr_actual )
/////////////Parcialmente  afectado 
var area_parcialmente_afectado = imagen_nbr_actual_parcialmente_afectado.multiply(ee.Image.pixelArea())
var stats_pie_actual_nbr = area_parcialmente_afectado.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
var in_value_actual_nbr =  stats_pie_actual_nbr.get('NBRS2');
var valor_nbr_actual = (ee.Number(in_value_actual_nbr ).multiply( 0.01))
print ( "Ha parcialmente afectado ",valor_nbr_actual )
//////////////////////
var parcialmente_afectado = imagen_nbr_actual_parcialmente_afectado.toInt()//.clip(cartografia_plantaciones_euca).clip(geometry);
// Vectorización de Aprovechamientos/Pérdidas
var carto_mortandad = parcialmente_afectado.reduceToVectors({
  geometry:geometry,
  scale:10,
  maxPixels:1e12,
  bestEffort: true
 });
//Map.addLayer(carto_mortandad,{palette:['ff0000']},'Parcialmente afectado',false);
/*
_________________________________________________________________________________________________________________________________________________________
EXTRACCIÓN DE SHP DE ÁREA QUEMADA
_________________________________________________________________________________________________________________________________________________________*/
/*
//Export the FeatureCollection to a SHP file.
Export.table.toDrive({
collection: carto_mortandad,
description:'parcialmente',
folder:'Parcialmente afectado',
fileFormat: 'SHP'
});
/*_
//var perdidas_sin_incendio = v_perdida.difference(v_quemado);
//print(perdidas_sin_incendio,'perdidas_sin_incendio');
//Map.addLayer(perdidas_sin_incendio,{palette:['ff0000']},'perdidas_sin_incendio');
//______________________________________________________________________________________________________________________________________________________
//FILTRO POR TAMAÑO
//_________________________________________________________________________________________________________________________________________________________*/
/*
// Cálculo del área quemada en hectáreas
var v_mortandad = carto_mortandad.map(function(feature){
  return feature.set('area',feature.area(100).divide(10000));
});
//print(v_perdida,'Polígonos de las Pérdidas');
var filtrosup_mortandad = v_mortandad.filterMetadata("area","greater_than",5);
var cta_filtrosup_mortandad = filtrosup_mortandad.reduceColumns(ee.Reducer.sum(),["area"]);
print(cta_filtrosup_mortandad,'Sup. Pérdidas (ha):');
//Map.addLayer(filtrosup_mortandad,{palette: 'red'},'Filtro mortandads',false);
///////////////////////////////////////////////////////////////////////
      var imagen = ee.Image(clases_estado_binario_actual)
      var imagen_NBR = ee.Image(clases_estado_binario_actual_NBR)
      var clases_estado_binario_actual_clip = clases_estado_binario_actual.clip(cartografia_plantaciones_euca)
      var clases_estado_binario_actual_NBR_clip = clases_estado_binario_actual_NBR.clip(cartografia_plantaciones_euca)
      var binarioViz = {min: 0, max: 6, palette: ['red', 'brown','yellow','green','grey' ]};
       var binarioVizNBR = {min: 0, max: 5, palette: ['red', 'brown','yellow','green','grey' ]};
*/
//////////////////////////NDVI ANTERIOR////////////////////
// Calculo del NDVI_S2 usando una expresion
var ndviS2_anterior = imagen2_anterior.expression(
    '(NIR - RED) / (NIR + RED)',
    { 'NIR': imagen2_anterior.select('B8'),
      'RED': imagen2_anterior.select('B4')
    });
var imagen_S2_anterior_buffer= imagen2_anterior.addBands(ndviS2_anterior.rename('NDVIS2')).clip(buffer);
var imagen_S2_anterior_macizos= imagen2_anterior.addBands(ndviS2_anterior.rename('NDVIS2')).clip(cartografia_plantaciones_euca);
//print (imagen_S2_anterior) ;
// crear paleta para ndvi
var paletandvi_MSI = coleccion_paletas.colorbrewer.RdYlGn [11].slice(0).reverse()
var MSIVisParam = {
  bands: ['MSIS2'],
  min: 0.310,
  max: 2,
  palette: paletandvi_MSI
};
/////////////////
var mipaletandvi = coleccion_paletas.colorbrewer.RdYlGn [11]
var NDVIVisParam = {
  bands: ['NDVIS2'],
  min: 0,
  max: 1,
  palette: mipaletandvi
};
var GCIVisParam = {
  bands: ['GCIS2'],
  min: 1.87,
  max: 8.16,
  palette: mipaletandvi
};
var NBRVisParam = {
  bands: ['NBRS2'],
  min: -0.28002769124264454,
  max: 0.01598173515981735,
  palette: mipaletandvi
};
//////////////////////////////////////////////////////////////7
//Map.addLayer(outline2, {palette: '9f9f9f'}, 'Cartografia de plantaciones de Eucalyptus spp. Forestales Corrientes', false);
//indices de estres
//Map.addLayer(imagen_S2_actual_macizos_msi,  MSIVisParam, 'Estres hídrico (MSI ) septiembre/2022  ',false );
//Map.addLayer(nbr_en_pie_actual,  NBRVisParam, 'Índice  (NBR) septiembre/2022  ',false );
// indices de vegetacion
//Map.addLayer(imagen_S2_actual_macizos_gci,  GCIVisParam, 'geometryde Clorofila (GCI) septiembre/2022  ',false );
//Map.addLayer(imagen_S2_actual_macizos,  NDVIVisParam, 'Indice Verde  (NDVI) septiembre/2022  ',false );
//Map.addLayer(ndvi_en_pie_actual, {'bands':['NDVIS2'],"min":1,"max":3,"palette":['008000','e8ea1b','ff0000']},'NDVI con umbrales',false);
//Map.addLayer(imagen_S2_anterior_macizos,  NDVIVisParam, 'Indice Verde  (NDVI) septiembre/2021   ',false );
//Map.addLayer(clases_estado_binario_actual_clip, binarioViz, 'Estado categorizado de NDVI  2022 ', false);
//Map.addLayer(clases_estado_binario_actual_NBR_clip,  binarioVizNBR,'Estado de afectación categorizado 2022 ', false);
//Map.addLayer(imagen_S2_actual_buffer,  NDVIVisParam, 'Buffer control Incendios (NDVI)  septiembre/2022  ',false );
//Especies//
var clasificacion_corrientes_2022 = ee.Image('users/iinsua/S2_Corrientes_ultimo');
/*Map.addLayer(clasificacion_corrientes_2022, {min: 1, max: 5, palette: 
['fa0000'
// taeda ROJO
,'f1ff08'
// elliottii AMARILLO
,'15da14'
// grandis VIOLETA
,'00d0cf'
// Arauca azul
,'a64d79'
// dunnii blanco
]}, 'Especies forestales 2022', false);
*/
//{bands: ['NDVIS2'], min: 0, max: 1, palette: ndviPaletaS2}
///////////////////////////////////////////////////////
var palette_clasificacion =
['ff0000',// dunnii  (red)
              '9933ff',//grandis  (purple)
               'fffe9b',//grandis  (amarillo)
              '008000',//pinus elliottii  (green)
];
//var viz = {min:1,max:3,palette:palette_clasificacion};
/////////////////////////////barra de colores 
var chirps = ee.Image('users/mgaute/imagen_altura_septiembre_septiembre_2019_id_23296')
// Calculate rainfall in 2009
var sst = chirps.select("b1")
//CREAR Paleta para la barra
var coleccion_paletas =  require ('users/gena/packages:palettes')
//var composite = sst.mean().visualize(vis);
//Map.addLayer(composite);
//var HD_plantaciones_forestales_SUR =ee.Image( 'users/mgaute/imagen_altura_septiembre_septiembre_euca_-0000023296-0000023296')
//Map.addLayer (HD_plantaciones_forestales_SUR, {bands:['b1'], min: [4], max: [40], palette: mipaleta} , "HD (Sector SUR - Entre Ríos).septiembre.2019", false)
//var HD_plantaciones_forestales_NORTE =ee.Image('users/mgaute/imagen_altura_septiembre_septiembre_2019_id_23296')
//Map.addLayer (HD_plantaciones_forestales_NORTE, {bands:['b1'], min: [4], max: [40], palette: mipaleta } , "HD (Sector NORTE - Entre Ríos).septiembre.2019", false)
//Mostrar imagen google satelital detras del mapa.
Map.setOptions("HYBRID")
var palette =['ff0000',// palm  (red)
];
var viz = {min:1,max:6,palette:palette};
// Create a legend.
var labels = ['Altura dominante (HD)  en Plantaciones de Eucalyptus '];
var add_legend = function(title, lbl, pal) {
  var legend = ui.Panel({style: {position: 'bottom-left'}}), entry;
  legend.add(ui.Label({style: { fontWeight: 'bold', fontSize: '15px', margin: '1px 1px 4px 1px', padding: '2px' } }));
  for (var x = 0; x < lbl.length; x++){
    entry = [ ui.Label({style:{color: pal[x], border:'1px solid black', margin: '1px 1px 4px 1px'}}),
      ui.Label({ value: labels[x], style: { margin: '1px 1px 4px 4px' } }) ];
    legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
  }  };
  //Map.add(legend);
  add_legend('Legend', labels, palette);
// Styling for the title and footnotes.
var TITLE_STYLE = {
  fontSize: '30px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '6px',
};
// Styling for the title and footnotes.
var TITLE_STYLE = {
  fontSize: '12px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '6px',
};
var TEXT_STYLE = {
  fontSize: '9px',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '6px',
};
var TEXT_LINK = {
  fontSize: '10px',
  color : '142cd6',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '6px',
};
Map.add(ui.Panel(
    [
      ui.Label('Caracterización de plantaciones forestales a partir de información derivada de plataformas satelitales y recursos informáticos de alto rendimiento', TITLE_STYLE),
      ui.Label(
          'Área SIG e Inventario Forestal ', TITLE_STYLE),
          ui.Label(
          ' CITAS y LINKS ', TITLE_STYLE),
          ui.Label(
          ' Lang et al.2022 : https://langnico.github.io/globalcanopyheight/ ', TEXT_LINK),
           ui.Label(
          ' Potapov et al.2020  : https://glad.umd.edu/publications/mapping-global-forest-canopy-height-through-integration-gedi-and-landsat-data ', TEXT_LINK),
          ui.Label(
          '  GEDI L2A Elevation and Height Metrics Data Global Footprint Level - GEDI02_A Dubayah, R., M. Hofton, J. Blair, J. Armston, H. Tang, S. Luthcke. GEDI L2A Elevation and Height Metrics Data Global Footprint Level V002. 2021, distributed by NASA EOSDIS Land Processes DAAC ', TEXT_LINK),
           ui.Label(
          ' Fayad et al.2021   : https://ieeexplore.ieee.org/stamp/stamp.jsp?tp=&arnumber=9466386 ', TEXT_LINK),
          ui.Label(
          ' Gaute et al.2019  : https://bit.ly/3PSRHVj ', TEXT_LINK),
           ui.Label(
          ' Más recursos: https://bit.ly/3tH2gld ', TEXT_LINK),
          ui.Label(
          '   mgaute@magyp.gob.ar ', TITLE_STYLE),
    ],
    ui.Panel.Layout.flow('vertical'),
    {width: '350px', position: 'bottom-right'}));
////////////////////////////////////////////////////////////////////77
/*
//Calculate histograms for each image
//print(ui.Chart.image.histogram({image:HD_plantaciones_forestales_NORTE, region:geometry, scale:100,  }));
//Calculate histograms for each image
print(ui.Chart.image.histogram({image:HD_plantaciones_forestales_SUR, region:geometry, scale:100,  }));
//Compare differences in vegetation loss between 16/18 and 18/19
var area_eucalyptus_NORTE = HD_plantaciones_forestales_NORTE.reduceRegion({
reducer: ee.Reducer.count(),
geometry: geometry,
scale: 30,
maxPixels: 1e9
});
print ('stats_Norte:', area_eucalyptus_NORTE)
/*
//Compare differences in vegetation loss between 16/18 and 18/19
var area_eucalyptus_SUR = HD_plantaciones_forestales_SUR.reduceRegion({
reducer: ee.Reducer.count(),
geometry: geometry,
scale: 10,
maxPixels: 1e9
});
print ('stats_SUR:', area_eucalyptus_SUR)
//var areaImage = ee.Image.pixelArea().addBands().divide(10000);
//print (areaImage)
*/
// Escala colorimetrica
/////////////////////////////barra de colores 
var altura = ee.Image('users/mgaute/imagen_altura_septiembre_septiembre_2019_id_23296')
// Calculate rainfall in 2009
var sst = altura.select("b1")
//CREAR Paleta para la barra
var coleccion_paletas =  require ('users/gena/packages:palettes')
var mipaleta = coleccion_paletas.colorbrewer.Spectral [11].reverse(); 
var vis = {min: 2, max: 35, palette: mipaleta};
//var composite = sst.mean().visualize(vis);
//Map.addLayer(composite);
/*
 * Legend setup
 */
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '20px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 5),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal') 
});
var legendTitle = ui.Label({
  value: 'Altura dominante en Eucalyptus (m) - ( solo Entre Ríos)  ',
  style: {position: 'bottom-left',fontWeight: 'bold'}
});
// Add the legendPanel to the map.
var legendPanelHD = ui.Panel([legendTitle, colorBar, legendLabels], ui.Panel.Layout.flow('vertical'),
    {width: '350px', position: 'bottom-right'})
//Map.add(legendPanelHD)
//////////////////////////////////////////////////////////////
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
//CREAR Paleta para la barra NDVI////////////////////77
//var ndviPaletaS2 = ['5c5592','0d8b8b','46a140','fbff11','c9860c','ff3305'];
//var coleccion_paletas =  require ('users/gena/packages:palettes')
var mipaletandvi = coleccion_paletas.colorbrewer.RdYlGn [11]//.reverse(); 
var visndvi = {min: 0, max: 1, palette: mipaletandvi};
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBarNDVI = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(visndvi.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '20px'},
});
// Create a panel with three numbers for the legend.
var legendLabelsNDVI = ui.Panel({
  widgets: [
    ui.Label(visndvi.min, {margin: '4px 8px'}),
    ui.Label(
        (visndvi.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(visndvi.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle_ndvi = ui.Label({
  value: 'Índice de vegetación (NDVI) 2022',
  style: {textAlign: 'center',fontWeight: 'bold'}
});
// Add the legendPanel to the map.
var legendPanelNDVI = (ui.Panel([legendTitle_ndvi, colorBarNDVI, legendLabelsNDVI], ui.Panel.Layout.flow('vertical'),
    {width: '350px', position: 'bottom-right'}))
Map.add(legendPanelNDVI);
////////////////////////////////////// Panel volumen
var mipaletavol = coleccion_paletas.colorbrewer.RdYlGn [11]//.reverse(); 
var Viz_volumen = {min: 0, max: 538, palette: [ '2308ff','0eff0a','fbff1a','ff2806', '730a00']};
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBarvol = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(Viz_volumen.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '20px'},
});
// Create a panel with three numbers for the legend.
var legendLabelsvol = ui.Panel({
  widgets: [
    ui.Label(Viz_volumen.min, {margin: '4px 8px'}),
    ui.Label(
        (Viz_volumen.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(Viz_volumen.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle_vol = ui.Label({
  value: 'Volumen (m3/ha) 2020',
  style: {textAlign: 'center',fontWeight: 'bold'}
});
// Add the legendPanel to the map.
var legendPanelvol = (ui.Panel([legendTitle_vol, colorBarvol, legendLabelsvol], ui.Panel.Layout.flow('vertical'),
    {width: '350px', position: 'bottom-right'}))
Map.add(legendPanelvol);
/////////////////////////////
/*
var mipaleta_hansen = coleccion_paletas.colorbrewer.RdYlGn [11]//.reverse(); 
var vishansen  = {min: 0, max: 19, palette: ['yellow', 'orange', 'red']}
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar_hansen = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vishansen.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '20px'},
});
// Create a panel with three numbers for the legend.
var legendLabels_hansen = ui.Panel({
  widgets: [
    ui.Label(vishansen.min, {margin: '4px 8px'}),
    //ui.Label(
      //  (vishansen.max / 2),
        //{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vishansen.max, {margin: '4px 8px', textAlign: 'right', stretch: 'horizontal'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle_hansen = ui.Label({
  value: ' Año de pérdida de cobertura árbórea o aprovechamiento forestal',
  style: {textAlign: 'center',fontWeight: 'bold'}
});
// Add the legendPanel to the map.
var legendPanel_hansen = (ui.Panel([legendTitle_hansen, colorBar_hansen, legendLabels_hansen], ui.Panel.Layout.flow('vertical'),
    {width: '350px', position: 'bottom-left'}))
Map.add(legendPanel_hansen);
*/
///////////////VISUALIZACIONES//////////////////
var TEXT_LINK3 = {
  fontSize: '10px',
  color : '142cd6',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '6px',
};
// Configuracion del titulo y posicion de la leyenda
var Titulo = ui.Label({
  value: 'Especies forestales cultivadas',// Titulo de la leyenda
  style: {fontWeight: 'bold', fontSize: '14px', margin: '0px 0px 15px 0px',}}); // Estilo y dimensiones
  var metodo = ui.Label('Metodología  https://bit.ly/3aOs6fN ',TEXT_LINK3)
var Leyenda = ui.Panel({
  style: {position: 'bottom-left', padding: '10px 20px'}}); // Posicion, altura y anchura
Leyenda.add(Titulo)//.add(metodo);
// Configuracion de la simbologia
var Simbologia = ['fa0000'
// taeda ROJO
,'f1ff08'
// elliottii AMARILLO
,'15da14'
// grandi VIOLETA
,'00d0cf'
// Arauca azul
,'a5682a'
// dunnii marrón
];
// Descripcion del etiquetado de elementos de la leyenda
var Etiquetas = [
  '1 - Pinus taeda',
  '2 - Pinus elliottii ',
  '3 - Eucalyptus grandis ',
  '4 - Araucaria angustifolia',
  '5 - Eucalyptus dunnii'
  ];
var Simbolos = function(simbolo, texto) {
var TextoLeyenda = ui.Label({
  value: texto,
  style: {margin: '6px 0px 10px 15px'}}); // Posicion en la separacion de los textos
var CajaLeyenda = ui.Label({
  style: {backgroundColor: '#' + simbolo,
  padding: '10px', // TamaÃ±o del simbolo
  margin: '0px 0px 6px 0px'}}); // Posicion en la separacion de los simbolos
//Representacion de leyenda en el visor
return ui.Panel({
  widgets: [CajaLeyenda, TextoLeyenda],
  layout: ui.Panel.Layout.Flow('horizontal')});};
for (var i = 0; i < 5; i++) {Leyenda.add(Simbolos(Simbologia[i], Etiquetas[i]));} 
//Map.add(Leyenda);
/////////////////////////////////////////////////
////////////////temperatura
//Map.centerObject(geometry);
/*
//cloud mask
function maskL8sr(col) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = col.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return col.updateMask(mask);
}
//vis params
var vizParams = {
  bands: ['B5', 'B6', 'B4'],
  min: 642,
  max: 3307,
  gamma: [1, 0.9, 1.1]
};
var vizParams2 = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};
//load the collection:
var col = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .map(maskL8sr)
    .filterDate('2021-12-01','2022-01-28')
    .filterBounds(geometry)
    .map(function(image){return image.clip(geometry)});
print('coleccion', col);
//imagen reduction
var image = col.median()//.clip ( cartografia_plantaciones_euca)
//print('image', image);
//Map.addLayer(image, vizParams2);
//median
var ndvi1 = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
var ndviParams = {min: 0.10554729676864096, max: 0.41295681063122924, palette: ['blue', 'white', 'green']};
//print('ndvi1', ndvi1);
//individual LST images
var col_list = col.toList(col.size());
var LST_col = col_list.map(function (ele) {
  var date = ee.Image(ele).get('system:time_start');
  var ndvi = ee.Image(ele).normalizedDifference(['B5', 'B4']).rename('NDVI');
  // find the min and max of NDVI
  var min = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: geometry,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  var max = ee.Number(ndvi.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: geometry,
    scale: 30,
    maxPixels: 1e9
  }).values().get(0));
  var fv = (ndvi.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV');
  var a= ee.Number(0.004);
  var b= ee.Number(0.986);
  var EM = fv.multiply(a).add(b).rename('EMM');
  var image = ee.Image(ele);
  var LST = image.expression(
    '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
      'Tb': image.select('B10').multiply(0.1),
      'Ep': fv.multiply(a).add(b)
  });
  return ee.Algorithms.If(min, LST.set('system:time_start', date).float().rename('LST'), 0);
}).removeAll([0]);
LST_col = ee.ImageCollection(LST_col);
print("LST_col", LST_col);
/////////////////
//Map.addLayer(ndvi1, ndviParams, 'ndvi');
//select thermal band 10(with brightness tempereature), no calculation 
var thermal= image.select('B10').multiply(0.1);
var b10Params = {min: 200, max: 400, palette: ['blue', 'white', 'green']};
//Map.addLayer(thermal, b10Params, 'thermal');
// find the min and max of NDVI
var min = ee.Number(ndvi1.reduceRegion({
  reducer: ee.Reducer.min(),
  geometry: geometry,
  scale: 30,
  maxPixels: 1e9
}).values().get(0));
//print('min', min );
var max = ee.Number(ndvi1.reduceRegion({
  reducer: ee.Reducer.max(),
  geometry: geometry,
  scale: 30,
  maxPixels: 1e9
}).values().get(0));
//print('max', max);
//fractional vegetation
var fv = (ndvi1.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('FV'); 
//print('fv', fv);
//Map.addLayer(fv);
//Emissivity
var a= ee.Number(0.004);
var b= ee.Number(0.986);
var EM = fv.multiply(a).add(b).rename('EMM');
var imageVisParam3 = {min: 0.9865619146722164, max:0.989699971371314};
//Map.addLayer(EM, imageVisParam3,'EMM');
//LST in Celsius Degree bring -273.15
//NB: In Kelvin don't bring -273.15
var LST = col.map(function (image){
  var date = image.get('system:time_start');
  var LST = image.expression(
    '(Tb/(1 + (0.00115* (Tb / 1.438))*log(Ep)))-273.15', {
    'Tb': thermal.select('B10'),
    'Ep':EM.select('EMM')
  }).float().rename('LST');
  return LST.set('system:time_start', date);
});
//print(LST);
/*Map.addLayer(LST, {min: 0, max: 50, palette: [
'040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
]},'Temperatura superfice');
print("chart");
print(
      ui.Chart.image.series({
        imageCollection: LST_col, 
        region: geometry,
        reducer: ee.Reducer.median(),
        scale: 10000, // nominal scale Landsat imagery 
        xProperty: 'system:time_start' // default
      }));
*/
//vectores
//Map.addLayer(outline4, {palette: '808080'}, 'Limite buffer ( 500 m) sobre las plantaciones', false);
//Map.addLayer (nbr_en_pie_actual,  {palette:['931d11','e27c35','2edc19'], min: -0.35655539429124333, max: 0.16097560975609757},'Rodales con distintos grados de  mortandad',false);
//////////////////////////////////////
////////////////////////////////////
/// Altura Lang
var canopy_height = ee.Image('users/nlang/ETH_GlobalCanopyHeight_2020_10m_v1');
var canopy_height_clip = canopy_height.clip(cartografia_plantaciones_euca)
var canopy_height_clip_mascara =canopy_height_clip.mask(imagen_B3_actual.lte (700))
print (canopy_height_clip_mascara)
///Volumen!!!!
var volumen_estimado_lang = ((canopy_height_clip_mascara).pow (2.2).multiply (0.17))
print (volumen_estimado_lang)
//Altura GFH
var global_forest_height = ee.ImageCollection ( 'users/potapovpeter/GEDI_V27')
var gfhViz = {min: 0, max: 40, palette: ['daef9a','yellow','green','red' ]};
var imagen_gfh_2019 =global_forest_height.mean().clip (cartografia_plantaciones_euca)
////clases alturas
var altura_clase_1 =canopy_height_clip_mascara.mask(canopy_height_clip_mascara.gt(0).and (canopy_height_clip_mascara.lt (10)))
var altura_clase_2 =canopy_height_clip_mascara.mask(canopy_height_clip_mascara.gte(10).and (canopy_height_clip_mascara.lt (20)))
var altura_clase_3 =canopy_height_clip_mascara.mask(canopy_height_clip_mascara.gte(20).and (canopy_height_clip_mascara.lt(30)))
var altura_clase_4 =canopy_height_clip_mascara.mask(canopy_height_clip_mascara.gte(30).and (canopy_height_clip_mascara.lte (45)))
// Mapas alturas 
Map.addLayer (altura_clase_1 , {palette:['2700fc']},'Altura Clase 1 : ( 0-10) m', false);
Map.addLayer (altura_clase_2 , {palette:['00d81b']},'Altura Clase 2 : (10-20) m',false);
Map.addLayer (altura_clase_3 , {palette:['fffe14']},'Altura Clase 3 : (20-30) m',false);
Map.addLayer (altura_clase_4 , {palette:['ff220c']},'Altura Clase 4 : (30-45) m',false);
///Cálculo de sup por clase
/*
//calculo sup clase 1 
var area_clase_1 = altura_clase_1.multiply(ee.Image.pixelArea())
var sta_clase_1 = area_clase_1.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
var value_clase_1 =  sta_clase_1.get('b1');
var valor_clase_1 = (ee.Number(value_clase_1 ).multiply( 0.01))
print ( "Ha clase 1 0-10 m  ",valor_clase_1 )
//calculo sup clase 2 
var area_clase_2 = altura_clase_2.multiply(ee.Image.pixelArea())
var sta_clase_2 = area_clase_2.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
var value_clase_2 =  sta_clase_2.get('b1');
var valor_clase_2 = (ee.Number(value_clase_2 ).multiply( 0.01))
print ( "Ha clase 2 10-20 m  ",valor_clase_2 )
//calculo sup clase 3 
var area_clase_3 = altura_clase_3.multiply(ee.Image.pixelArea())
var sta_clase_3 = area_clase_3.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
var value_clase_3 =  sta_clase_3.get('b1');
var valor_clase_3 = (ee.Number(value_clase_3 ).multiply( 0.01))
print ( "Ha clase 3 20-30 m  ",valor_clase_3 )
//calculo sup clase 4 
var area_clase_4 = altura_clase_4.multiply(ee.Image.pixelArea())
var sta_clase_4 = area_clase_4.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
var value_clase_4 =  sta_clase_4.get('b1');
var valor_clase_4 = (ee.Number(value_clase_4 ).multiply( 0.01))
print ( "Ha clase 4 30-45 m  ",valor_clase_4 )
var imagen_gfh_2019_mayor_10m= imagen_gfh_2019.mask (imagen_gfh_2019.gt (15))
*/
//////////////////////////////////Cálculo de clases volumétricas
////clases volúmenes
var volumen_clase_1 =volumen_estimado_lang.mask(volumen_estimado_lang.gt(0).and (volumen_estimado_lang.lt (105)))
var volumen_clase_2 =volumen_estimado_lang.mask(volumen_estimado_lang.gte(105).and (volumen_estimado_lang.lt (210)))
var volumen_clase_3 =volumen_estimado_lang.mask(volumen_estimado_lang.gte(210).and (volumen_estimado_lang.lt(300)))
var volumen_clase_4 =volumen_estimado_lang.mask(volumen_estimado_lang.gte(300).and (volumen_estimado_lang.lt (400)))
var volumen_clase_5 =volumen_estimado_lang.mask(volumen_estimado_lang.gte(400).and (volumen_estimado_lang.lte (539)))
// Mapas alturas 
Map.addLayer (volumen_clase_1 , {palette:['2700fc']},'Vol Clase 1 : (0-105) m3/ha',false);
Map.addLayer (volumen_clase_2 , {palette:['00d81b']},'Vol Clase 2 : (106-210) m3/ha',false);
Map.addLayer (volumen_clase_3 , {palette:['fffe14']},'Vol Clase 3 : (210 - 300) m3/ha',false);
Map.addLayer (volumen_clase_4 , {palette:['ff220c']},'Vol Clase 4 : (300 -400) m3/ha',false);
Map.addLayer (volumen_clase_5 , {palette:['730a00']},'Vol Clase 5 : (> 400) m3/ha',false);
///Cálculo de sup por clase
/*
//calculo sup clase 1 
var area_clase_1_vol = volumen_clase_1.multiply(ee.Image.pixelArea())
var sta_clase_1_vol = area_clase_1_vol.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
var value_clase_1_vol =  sta_clase_1_vol.get('b1');
var valor_clase_1_vol = (ee.Number(value_clase_1_vol ).multiply( 0.01))
print ( "Ha clase 1 0-105 m3/ha  ",valor_clase_1_vol )
//calculo sup clase 2 
var area_clase_2_vol = volumen_clase_2.multiply(ee.Image.pixelArea())
var sta_clase_2_vol = area_clase_2_vol.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
var value_clase_2_vol =  sta_clase_2_vol.get('b1');
var valor_clase_2_vol = (ee.Number(value_clase_2_vol ).multiply( 0.01))
print ( "Ha clase 2 105 -210 m3/ha  ",valor_clase_2_vol )
//calculo sup clase 3 
var area_clase_3_vol = volumen_clase_3.multiply(ee.Image.pixelArea())
var sta_clase_3_vol = area_clase_3_vol.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
var value_clase_3_vol =  sta_clase_3_vol.get('b1');
var valor_clase_3_vol = (ee.Number(value_clase_3_vol ).multiply( 0.01))
print ( "Ha clase 3 210-300 m3/ha  ",valor_clase_3_vol )
//calculo sup clase 4 
var area_clase_4_vol = volumen_clase_4.multiply(ee.Image.pixelArea())
var sta_clase_4_vol= area_clase_4_vol.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
var value_clase_4_vol =  sta_clase_4_vol.get('b1');
var valor_clase_4_vol = (ee.Number(value_clase_4_vol ).multiply( 0.01))
print ( "Ha clase 4 300-400 m3/ha  ",valor_clase_4_vol )
//calculo sup clase 4 
var area_clase_5_vol = volumen_clase_5.multiply(ee.Image.pixelArea())
var sta_clase_5_vol= area_clase_5_vol.reduceRegion({
  reducer: ee.Reducer.count(),
  geometry: geometry,
  scale: 10,
  maxPixels: 1e12
});
var value_clase_5_vol =  sta_clase_5_vol.get('b1');
var valor_clase_5_vol = (ee.Number(value_clase_5_vol ).multiply( 0.01))
print ( "Ha clase 5 > 400 m3/ha  ",valor_clase_5_vol )
*/
/////////////////////////////////////////////
var Viz_altura_gaute =  {min: 2, max: 40, palette: ['2308ff','0eff0a','fbff1a','ff2806','2308ff']};
var cambioViz_altura = {min: 2, max: 40, palette: [ '2308ff','0eff0a','fbff1a','ff2806']};
var Viz_volumen = {min: 0, max: 538, palette: [ '2308ff','0eff0a','fbff1a','ff2806']};
Map.addLayer ( imagen_gfh_2019, cambioViz_altura , "Altura 2019  ( Potapov et.al 2019) ", false ) ;
Map.addLayer ( altura_gaute, Viz_altura_gaute , "Altura 2019  ( Gaute et.al 2021) ", false ) ;
Map.addLayer(canopy_height_clip_mascara ,cambioViz_altura , 'Altura 2020 ( Lang et.al 2022) ', true);
//Map.addLayer(canopy_height_clip ,cambioViz_altura , 'Altura 2020 ( Lang et.al 2022) ', true);
Map.addLayer(imagen_rh95_filtro, pal0,'LIDAR GEDI ( rh95) 2020-2021 ', true);
Map.addLayer ( volumen_estimado_lang, Viz_volumen,'Volumen estimado m3/ha', true )
//Map.addLayer ( imagen_gfh_2019_mayor_10m, gfhViz , "Plantaciones (+15 m altura) -2019  ", false ) ;
//Map.addLayer (parcelas, {color: 'red'} ,'Parcelas')
Map.addLayer(ndvi_en_pie_actual, NDVIVisParam,'NDVI dentro del rodal ( diciembre 2022)',false);
Map.addLayer(outline, {palette: '00ff00'}, 'Cartografía de plantaciones de Eucalyptus', false);
Map.addLayer (rebrotes, {color: 'orange'}, 'Manejo de  Rebrotes relevados a campo', false )
Map.addLayer (plantaciones_con_altura, {color: 'white'}, 'Puntos con Altura -Datos de campo', false )
//Map.addLayer(carto_parcelas_er_concordia, {color: '42e7f4'} , 'Parcelas_Datos_Validación', true);
/*
//export LST
var export_Collection = LST_col.select (['LST']).toBands();
// As a "flattened" image
print("export_Collection map", export_Collection);
Export.image.toDrive ({
   image: export_Collection, 
   description: 'LST_collection', 
   scale: 30}); 
// As a reduced Image
var export_Image = LST_col.reduce(ee.Reducer.median());
print("export_Image map", export_Image);
Export.image.toDrive ({
   image: export_Image, 
   description: 'LST_Warburg_Nadelwald', 
   scale: 30});
*/
////////////////////////////////////////////////// Leyenda estado de situación
///////////////////////////LEYENDA Dirección del cambio
// Descripcion del etiquetado de elementos de la leyenda
var Etiquetas = [
  'Clase 4 : (31-45) m - 78.257 ha -  31 % ',
  'Clase 3 : (21-30) m - 127.731 ha -45 %',
  'Clase 2 : (11-20) m - 56.196 ha - 20 % ',
  'Clase 1 : ( 0-10) m  - 21.331 ha - 8 % '
  ];
// Configuracion del titulo y posicion de la leyenda
var Titulo = ui.Label({
  value: '  Distribución de alturas forestales en plantaciones de Eucalyptus (2020) ', // Titulo de la leyenda
  style: {fontWeight: 'bold', fontSize: '14px', margin: '0px 0px 15px 0px',}}); // Estilo y dimensiones
var Leyenda = ui.Panel({
  style: {position: 'bottom-left', padding: '10px 20px'}}); // Posicion, altura y anchura
Leyenda.add(Titulo);
// Configuracion de la simbologia
var Simbologia = ['ff220c','fffe14', '00d81b', '2700fc'];
var Simbolos = function(simbolo, texto) {
var TextoLeyenda = ui.Label({
  value: texto,
  style: {margin: '6px 0px 10px 15px'}}); // Posicion en la separacion de los textos
var CajaLeyenda = ui.Label({
  style: {backgroundColor: '#' + simbolo,
  padding: '10px', // TamaÃ±o del simbolo
  margin: '0px 0px 6px 0px'}}); // Posicion en la separacion de los simbolos
//Representacion de leyenda en el visor
return ui.Panel({
  widgets: [CajaLeyenda, TextoLeyenda],
  layout: ui.Panel.Layout.Flow('horizontal')});};
for (var i = 0; i < 4; i++) {Leyenda.add(Simbolos(Simbologia[i], Etiquetas[i]));} 
//Map.centerObject (SRTM90, 2);
//Map.add(Leyenda);
/////////////////////////////////////////////
// Descripcion del etiquetado de elementos de la leyenda
var Etiquetas_vol = [
  'Clase 5 :   (> 400)   m3/ha - 10.582 ha -  4 % ',
  'Clase 4 : (301 - 400) m3/ha - 78.289 ha -  27 % ',
  'Clase 3 : (211 - 300) m3/ha - 64.306 ha -22 %',
  'Clase 2 : (106 - 210) m3/ha - 63.084 ha - 22 % ',
  'Clase 1 :   (0-105)   m3/ha  - 69.755 ha - 24 %'
  ];
// Configuracion del titulo y posicion de la leyenda
var Titulo_vol = ui.Label({
  value: '  Distribución del  Volumen en plantaciones de Eucalyptus (2020) ', // Titulo de la leyenda
  style: {fontWeight: 'bold', fontSize: '14px', margin: '0px 0px 15px 0px',}}); // Estilo y dimensiones
var Leyenda_vol = ui.Panel({
  style: {position: 'bottom-left', padding: '10px 20px'}}); // Posicion, altura y anchura
Leyenda_vol.add(Titulo_vol);
// Configuracion de la simbologia
var Simbologia_vol = ['730a00','ff220c','fffe14', '00d81b', '2700fc' ];
var Simbolos_vol = function(simbolo, texto) {
var TextoLeyenda_vol = ui.Label({
  value: texto,
  style: {margin: '6px 0px 10px 15px'}}); // Posicion en la separacion de los textos
var CajaLeyenda_vol = ui.Label({
  style: {backgroundColor: '#' + simbolo,
  padding: '10px', // TamaÃ±o del simbolo
  margin: '0px 0px 6px 0px'}}); // Posicion en la separacion de los simbolos
//Representacion de leyenda en el visor
return ui.Panel({
  widgets: [CajaLeyenda_vol, TextoLeyenda_vol],
  layout: ui.Panel.Layout.Flow('horizontal')});};
for (var i = 0; i < 5; i++) {Leyenda_vol.add(Simbolos(Simbologia_vol[i], Etiquetas_vol[i]));} 
//Map.centerObject (SRTM90, 2);
//Map.add(Leyenda_vol);
////////////////////////////////////////////////////// Etiquetas de datos de campo
var text = require('users/gena/packages:text')
var scale = Map.getScale()*1
var labels = plantaciones_con_altura.map(function(feat) {
  feat = ee.Feature(feat)
  var name = ee.Number(feat.get("altura"))
  var centroid = feat.geometry().centroid()
  var t = text.draw(name, centroid,scale)
  return t
})
labels = ee.ImageCollection(labels)
Map.addLayer(labels,  {color: 'white'},  'Altura -  Datos de campo etiqueta', false)
Map.addLayer (cicatrices_fuego,{color: 'red',width: 0.5}, 'Incendios 2020 -2022',false)
///////////////////herramientas 
////MÓDULO PARA DIBUJAR Y CUANTIFICAR
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
/*function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
*/
var chartPanel = ui.Panel({
  style:
      {height: '350px', width: '600px', position: 'bottom-left', shown: false}
});
Map.add(chartPanel);
function chart_volumen() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
var vol_roi  = volumen_estimado_lang.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: aoi,
  scale: 10,
  maxPixels: 1e12
});
print('Vol_roi =', vol_roi);
  // Chart NDVI time series for the selected area of interest.
  var chart =
    ui.Chart.image.histogram({image:volumen_estimado_lang , region: aoi ,scale: 10})
        .setSeriesNames(['Cantidad de píxeles'])
        .setOptions({
          title: ' Histograma de distribución del Volumen ',
          hAxis: {
            title: 'Volumen (m3/ha) ',
            titleTextStyle: {italic: false, bold: true},
          },
          vAxis:
              {title: 'Cantidad de píxeles (píxel = 0.01 ha)', titleTextStyle: {italic: false, bold: true}},
          colors: ['cf513e', '1d6b99', 'f0af07']
        });
var polygonArea = aoi.area({'maxError': 1});
var ha = polygonArea .divide(10000)
// Print the result to the console.
//print('Superficie =', ha);
    // Create a panel and add it to the map.
//para pasar a entero 
//var intNumber = number.int(); 
  var computedValue = ha.format('%.2f')
// Request the value from the server.
computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    chartPanel.widgets().set(1, ui.Label({
      value:'Superficie digitalizada =' + '  ' + result + '  '+' ha' } ))
    });
 var computedValue_vol_sin_formato= vol_roi.get('b1')
    var computedValue_vol = ee.Number (computedValue_vol_sin_formato).format('%.2f')
  computedValue_vol.evaluate(function(result_vol) {
    // When the server returns the value, show it.
    chartPanel.widgets().set(2, ui.Label({
      value:'Volumen promedio = ' + result_vol + '  '+ '  '+'m3/ha'  } ))
    });
//ui.root.add(panel_superficie);
 chartPanel.widgets().reset([chart])
 }
  // Replace the existing chart in the chart panel with the new chart.
drawingTools.onDraw(ui.util.debounce(chart_volumen, 500));
drawingTools.onEdit(ui.util.debounce(chart_volumen, 500));
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('1. Seleccionar un modo de dibujo.'),
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    /*ui.Button({
      label: symbol.point + ' Point',
      onClick: drawPoint,
      style: {stretch: 'horizontal'}
    }),
    */
    ui.Label('2. Dibuje un área de interés ( menor a 80 mil ha)'),
    ui.Label('3. Espere a que se despliegue el gráfico.'),
    ui.Label(
        '4. Repita  los pasos 1 a 3, para estudiar otro sitio .',
        {whiteSpace: 'pre'})
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
Map.add(controlPanel);
//////////////////////////////////////////////////////////////////////////////////////////
/////////////////ver valores coordenadas clic sobre el mapa/////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// Load and display NDVI data.
var ndvi = ee.ImageCollection('NOAA/VIIRS/001/VNP13A1')
    .filterDate('2012-01-01', '2022-01-01').select('NDVI');
// Configure the map.
//Map.setCenter(-94.84497, 39.01918, 8);
Map.style().set('cursor', 'crosshair');
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '500px'}})
    .add(ui.Label('Clic sobre el rodal para ver evolución del NDVI ( VIIRS)'));
  //Ver atributos de los polígonos 
var  fc = cartografia_plantaciones_euca
var fc_fitro_atributos  = fc.select ({
propertySelectors:['anio_plant', 'edad', 'especie','id','densidad', 'superficie'],
newProperties: ['Año de plantación', 'Edad', 'Especie', 'id', 'Densidad (Último dato registrado)', 'Superficie']
});
function getProps(loc) {
  loc = ee.Dictionary(loc);
  var point = ee.Geometry.Point(loc.getNumber('lon'), loc.getNumber('lat'));
  var thisFeature = fc_fitro_atributos.filterBounds(point).first();
  var props = thisFeature.toDictionary();
  props.evaluate(function(props) {
    var str = '';
    Object.keys(props).forEach(function(i) {
      str = str + i + ': ' + props[i] + '\n';
    });
    info.setValue(str);
  });
}
/////////////////////////////////////////////////////////
///////////MAIN PANEL//////////////////
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var style_title = {
  fontWeight: 'bold',
  fontSize: '12px',
  padding: '1px',
  color: 'Black',
  backgroundColor: colors.transparent,
};
var paragraph_title = {
  fontSize: '18px',
  fontWeight: 'bold',
  color: 'black',
  padding: '1px',
  backgroundColor: colors.transparent,
};
var style_paragraph = {
  fontSize: '15px',
  fontWeight: '60',
  color: 'grey',
  padding: '1px',
  backgroundColor: colors.transparent,
};
var SUBPARAGRAPH_STYLE = {
  fontSize: '13px',
  fontWeight: '50',
  color: '#9E9E9E',
  padding: '2px',
  backgroundColor: colors.transparent,
};
var LABEL_STYLE = {
  fontWeight: '50',
  textAlign: 'center',
  fontSize: '11px',
  backgroundColor: colors.transparent,
};
var THUMBNAIL_WIDTH = 128;
var BORDER_STYLE = '2px solid rgba(50, 5, 98, 10.05)';
  var mainPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {
      stretch: 'horizontal',
      //height: '30%',
      width: '200px',
      backgroundColor: colors.gray,
      border: BORDER_STYLE,
      position: 'top-left'
    }
  });
  // Add the app title to the side panel
  var titleLabel = ui.Label('Utilice este panel para navegar hacia un sitio. Ingrese coordenadas en grados decimales (lat, long): Ejemplo: -33.9364, -58.72 ', style_title);
  mainPanel.add(titleLabel);
  /*// Add the app description to the main panel
  var descriptionText =
      'This app computes the Sen´s slope estimator to assess' +
      ' spatio-temporal changes of NDVI in Collserola (Barcelona, Spain)' +
      '. Data are derived from Sentinel-2 imagery.' 
;
  var descriptionLabel = ui.Label(descriptionText, style_paragraph);
  mainPanel.add(descriptionLabel);
       var firstSubParagraph_text = 'Sen´s slope estimator is a common method to estimate the fit of a regression line through pairs of points.' + 
     ' Unlike the Ordinary Least Squares, the Sen´s slope is insensitive to outliers.';
   var firstSubParagraph = ui.Label(firstSubParagraph_text, style_paragraph);
   mainPanel.add(firstSubParagraph);
      var secondSubParagraph_text = 'The right pannel shows the trend direction and the mean daily NDVI for the entire extent of Collserola.' 
   +' The chart can be downloaded in .csv by clicking on the top-right of the plot.';
   var secondSubParagraph = ui.Label(secondSubParagraph_text, style_paragraph);
   mainPanel.add(secondSubParagraph);
  var firstSubTitle_text = 'Select the Start and End dates';
  var firstSubTitle = ui.Label(firstSubTitle_text, paragraph_title);
  mainPanel.add(firstSubTitle);
   var secondSubParagraph_text = 'The tool will search for images between these dates. '+ 
                                 ' Date format must be: YYYY-MM-DD.';
   var secondSubParagraph = ui.Label(secondSubParagraph_text, SUBPARAGRAPH_STYLE);
   mainPanel.add(secondSubParagraph);
   */
//print(lat);
var lon = ui.Textbox({
  value: 1.0,
  placeholder: 'Enter longitude here...',
  onChange: function(value) {
    // set value with a dedicated method
    lon.setValue(value);
    return(value);
  }
});
//print(lon);
var lat = ui.Textbox({
   value: 1.0,
  placeholder: 'Enter latitude here...',
  onChange: function(value) {
    // set value with a dedicated method
    lat.setValue(value);
    return(value);
  }
});
//print(lat);
mainPanel.add(lat);  
mainPanel.add(lon);
var button = ui.Button({
  label: 'Navegar hacia el punto',
  onClick: function() {
    // you don't have to convert it into EE objects since you are
    // working on the client side
var Lo;
var La;
    Lo = parseFloat(lon.getValue());
    La = parseFloat(lat.getValue());
    Map.setCenter(Lo, La, 19);
  }
});
 mainPanel.add(button);
Map.add(mainPanel);
//print(button);
//////////////////////////////////////////////////////
var panel_atributos = ui.Panel({style: {position: 'bottom-left', width: '300px', height: '200px'}});
var info = ui.Label({value: 'Clic en un rodal para ver los atributos', style: {whiteSpace: 'pre'}});
panel_atributos.add(info);
Map.add(panel_atributos);
Map.style().set('cursor', 'crosshair');
Map.onClick(getProps);
//Map.addLayer(fc);
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
  // Create a chart of NDVI over time.
  var chart = ui.Chart.image.series(ndvi, point, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'NDVI serie temporal  - VIIRS (VNP13A1) ( pixel 500 m)',
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
/*
var panel = ui.Panel({style: {width: '100px'}})
    .add(ui.Label('Haga clic sobre el mapa para visualizar las coordenadas'));
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}, 'Coordenadas'));
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  //panel.widgets().set(1, );
});
// Add the panel to the ui.root.
ui.root.add(panel);
*/
//////////////////////////////////////////////////////////////////////////////////////////
/////////////////ver valores de ALTURA haciendo clic sobre el mapa/////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// Create a panel and add it to the map.
var inspector = ui.Panel([ui.Label('Clic sobre el mapa para ver Altura en un sector del  rodal')]);
Map.add(inspector);
Map.onClick(function(coords) {
  // Show the loading label.
  inspector.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Determine the mean NDVI, a long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var altura  = canopy_height_clip_mascara//.reduce('mean');
  var sample = altura.sample(point, 10);
  var computedValue = sample.first().get('b1');
  // Request the value from the server.
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector.widgets().set(0, ui.Label({
      value: 'Altura(m) en  2020: ' + result 
    }));
  });
});
//////////////////////////////////////////////////////////////////////////////////////////
/////////////////ver valores de VOLUMEN haciendo clic sobre el mapa/////////////////////////
/////////////////////////////////////////////////////////////////////////////////////
// Create a panel and add it to the map.
var inspector_vol = ui.Panel([ui.Label('Clic sobre el mapa para ver  Volumen en un sector del rodal ')]);
Map.add(inspector_vol);
Map.onClick(function(coords) {
  // Show the loading label.
  inspector_vol.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Determine the mean NDVI, a long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var volumen  = volumen_estimado_lang//.reduce('mean');
  var sample_vol = volumen.sample(point, 10);
  var computedValue_vol = sample_vol.first().get('b1');
  // Request the value from the server.
  computedValue_vol.evaluate(function(result_vol) {
    // When the server returns the value, show it.
    inspector_vol.widgets().set(0, ui.Label({
      value: 'Volumen (m3/ha) en 2020: ' + result_vol 
    }));
  });
});
/// volver al punto incial de ubicación del mapa
var button = ui.Button({
  label: 'Volver el mapa al lugar de incio',
  onClick: function() {
    print(Map.setCenter(-55.89038983817748,-28.069098682870578,14));
  }
});
Map.add ( button ) 
//////////////////NOTA
// Function to handle showing and hiding the notes panel.
var notesShow = false;
function notesButtonHandler() {
  if(notesShow){
    notesShow = false;
    notesPanel.style().set('shown', false);
    notesPanel.style().set('width', '83px');
    notesButton.setLabel('Importante!!!');
  } else {
    notesShow = true;
    notesPanel.style().set('shown', true);
    notesPanel.style().set('width', '400px');
    notesButton.setLabel('Ocultar');
  }
}
// Note style.
var noteStyle = {backgroundColor: 'rgba(0, 0, 0, 0.0)', fontSize: '11px', fontWeight: '550', margin: '8px 8px 1px 8px'};
// Show/hide note button.
var notesButton = ui.Button({label: 'Importante !!!', onClick: notesButtonHandler, style: {margin: '0px'}});
/// Notes panel.
var notesPanel = ui.Panel({
  widgets: [
    ui.Label({value: '# Esta aplicación está en desarrollo.', style: noteStyle}),
    ui.Label({value: '# Los datos de altura y volumen  corresponden a estimaciones ( ver refencias) .', style: noteStyle}),
    //ui.Label({value: '• Download the animation by right clicking on it and selecting a save option.', style: noteStyle}),
   // ui.Label({value: '• Copie la URL para compartir.', style: noteStyle}),
    ui.Label({value: ' Clic acquí para acceder al sitio web de la Dirección Nacional de Desarrollo Foresto Industrial', style: noteStyle, targetUrl: 'https://www.magyp.gob.ar/sitio/areas/desarrollo-foresto-industrial/'}),
    //ui.Label({value: '• See data desription in the Earth Engine Data Catalog.',
      //  style: {backgroundColor: 'rgba(0, 0, 0, 0.0)', fontSize: '11px', fontWeight: '500', margin: '8px 8px 8px 8px'},
        //targetUrl: 'https://developers.google.com/earth-engine/datasets/catalog/JRC_GSW1_1_YearlyHistory'})
  ],
  style: {shown: false, backgroundColor: 'rgba(255, 255, 255, 0.8)', fontSize: '11px', fontWeight: '500'}
});
// Notes panel container.
var notesContainer = ui.Panel({widgets: [notesButton, notesPanel],
  style: {position: 'bottom-right', padding: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.9)'}});
Map.add(notesContainer);
/*
//Extraer información Er
// Exporto todo incluynedo la columna genero
var sampling = volumen_estimado_lang.sampleRegions({
  collection: carto_parcelas_er_concordia,
  properties: [ 'FID_CUADRI','NOMBRE', 'DAP_CM','HMED_M', 'HDOM_M','AB_M2HA', 'VOLTO_M3HA', 'ARB_HA', 'FUSTE_HA'],
  scale: 10} );
  */
  //Extraer información Er
// Exporto todo incluynedo la columna genero
var sampling = canopy_height_clip_mascara.sampleRegions({
  collection: carto_parcelas_er_concordia,
  properties: [ 'FID_CUADRI','NOMBRE', 'DAP_CM','HMED_M', 'HDOM_M','AB_M2HA', 'VOLTO_M3HA', 'ARB_HA', 'FUSTE_HA'],
  scale: 10} );
/// exportar tabla con información
Export.table.toDrive({
 'collection': sampling,
  'description': 'Extraccion_carto_parcelas_rectangulares_buffer',
  'fileNamePrefix': 'Extraccion_carto_parcelas_rectangulares_buffer',
  'fileFormat': 'CSV'})