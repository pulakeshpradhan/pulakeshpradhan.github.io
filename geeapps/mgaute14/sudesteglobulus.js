var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -59.34449890006137,
            -38.70514818851786
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([-59.34449890006137, -38.70514818851786]);
//genero punto para centrar el estudio
var centrar = ee.Geometry.Point([-59.34449890006137, -38.70514818851786]);
// establecer el nivel de zoom en la vista
Map.centerObject(centrar,14);
// Area de estudio solo Concordia
//var geometry = ee.FeatureCollection('users/mgaute/provincias/depto_concordia');
var geometry = ee.FeatureCollection ('users/mgaute/area_muestreo')
// Cartografía macizos area_muestreo 
var carto_macizos = ee.FeatureCollection('users/mgaute/macizos_area_muestreo');
// Area de estudio solo Colon
//var geometry = ee.FeatureCollection('users/mgaute/provincias/depto_colon');
  //Area de estudio Corrientes- Entre Ríos
//var geometry = ee.FeatureCollection('users/mgaute/provincias/prov_corrientes_entrerios');
 //Area de estudio Corrientes
//var geometry = ee.FeatureCollection('users/mgaute/provincias/corrientes_4326');
//Area de estudio NOA
//var geometry = ee.FeatureCollection('users/mgaute/provincias/aoi_noa');
 // Area de estudio Patagonia
//var geometry = ee.FeatureCollection('users/mgaute/provincias/aoi_nqn_norte_4326');
//////////////////////////////////////////////////////////////////////////////////////
// Seleccionar colecciones
//////////////////////LANDSAT////////////////////////////////////////////////////////
var producto = ee.ImageCollection('LANDSAT/LC8_L1T_TOA');
// seleccionar bandas
var bandastm=['B7','B6','B5','B4','B3','B2','B1']
// filtrar coleccion
var col1=producto.filterBounds(geometry)
//rango de fechas
.filterDate('2016-02-01', '2016-05-31')
// cobertura de nubes máxima
.filterMetadata('CLOUD_COVER','less_than', 5)
// selecciono path principal
//.filter(ee.Filter.eq('WRS_PATH', 226))
//.filter(ee.Filter.eq('WRS_ROW', 84))
.select(bandastm);
// ver coleccion y filtros
print(col1);
// convertir coleccion a imagen, reduce a mediana
var imagen1=col1.mean().clip(geometry);
// ver imagen en mapa:
Map.addLayer (imagen1, {bands: ['B5', 'B6', 'B4'], min: [0,0,0], max: [0.6,0.6,0.6] }
, "L8", false ) ;
///////////SENTINEL 2 /////////////////////////////////////////////////////////
var START1 = ee.Date("2016-02-01");
var END1 = ee.Date("2016-05-31");
var productoS2 =  ee.ImageCollection('COPERNICUS/S2') 
.filterDate(START1,END1);
//print (collectionS2);
var bandasS2=['B2','B3','B4','B5','B6','B7','B8', 'B8A','B11','B12']
// filtrar coleccion
var col2 =productoS2.filterBounds(geometry) 
// cobertura de nubes máxima
//.filterMetadata('CLOUD_COVER','less_than', 60)
.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than',5)
.select(bandasS2);
print(col2);
// convertir coleccion a imagen, reduce a mediana
var imagen2=col2.mean().clip(carto_macizos);
// ver imagen en mapa
Map.addLayer (imagen2, {bands: ['B8', 'B11', 'B3'], min: [49.5], max: [3241] }
, "S2", false ) ;
////////////////////////////////////////////////////////////////////////////
// Calculo del NDVI_S2 usando una expresion
var ndviS2 = imagen2.expression(
    '(NIR - RED) / (NIR + RED)',
    { 'NIR': imagen2.select('B8'),
      'RED': imagen2.select('B4')
    });
    // Calculo del NDVI_RE usando una expresion
var ndvi_redge = imagen2.expression(
    '(NIR - RED) / (NIR + RED)',
    { 'NIR': imagen2.select('B8A'),
      'RED': imagen2.select('B4')
    });
var nd118 = imagen2.expression(
    '(NIR - RED) / (NIR + RED)',
    { 'NIR': imagen2.select('B11'),
      'RED': imagen2.select('B8')
    });
// Calculo del ND118A 
var nd118a = imagen2.expression(
    '(B11 - B8A) / (B11 + B8A)',
    { 'B11': imagen2.select('B11'),
      'B8A': imagen2.select('B8A')
    });
    // Calculo de SAVI 
var nd_savi = imagen2.expression(
    '((B8 - B4) / ((B8 + B4) + 0.5) *1.5)',
    { 'B8': imagen2.select('B8'),
      'B4': imagen2.select('B4')
    });
    // renombre bandas - ver cuales se seleccionaron previamente
    imagen2=imagen2.rename('S2_B2','S2_B3','S2_B4','S2_B5','S2_B6', 'S2_B7', 'S2_B8', 'S2_B8A', 'S2_B11', 'S2_B12')
    //print ("S2",imagen2)
    // agregar bandas de indices
imagen2=imagen2.addBands(ndviS2.rename('NDVIS2'));
imagen2=imagen2.addBands(ndvi_redge.rename('NDVI_RE'));
imagen2=imagen2.addBands(nd118.rename('ND54S2'));
imagen2=imagen2.addBands(nd118a.rename('ND118A'));
imagen2=imagen2.addBands(nd_savi.rename('SAVI'));
// ver caracteristicas de imagen
print (imagen2) ;
     // crear paleta para ndvi
var ndviPaletaS2 = ['5c5592','0d8b8b','46a140','fbff11','c9860c','ff3305'];
var visParams = {min: 0, max: 200, palette: ndviPaletaS2};
var nd54PaletaS2 = ['5c5592','0d8b8b','46a140','fbff11','c9860c','ff3305'];
var visParams = {min: 0, max: 200, palette: nd54PaletaS2};
//ver NDVIS2 con estilo
Map.addLayer(imagen2, {bands: ['NDVIS2'], min: 0, max: 0.71, palette: ndviPaletaS2}, 'FPAR NDVI S2 (10m)',false );
//ver NDVIS2 con estilo
Map.addLayer(imagen2, {bands: ['ND54S2'], min: -0.5569383945239577, max: 0.19780481985206394, palette: nd54PaletaS2}, 'SUELO ND118 S2 (10m)', false);
//ver ND118A con estilo
Map.addLayer(imagen2, {bands: ['ND118A'], min: -0.5569383945239577, max: 0.19780481985206394, palette: nd54PaletaS2}, 'SUELO ND118A S2 (20m)', false);
//ver SAVI con estilo
Map.addLayer(imagen2, {bands: ['SAVI'], min: 0.28, max: 1.0962 , palette: nd54PaletaS2}, 'SAVI S2 (10m)', false);
//ver NDVI_rededge con estilo
Map.addLayer(imagen2, {bands: ['NDVI_RE'], min: 0.28, max: 1.0962 , palette: nd54PaletaS2}, 'SAVI S2 RED_EDGE (10m)', false);
/////////////////////////SENTINEL 1///////////////////////////////////////
var START1 = ee.Date("2016-02-01");
var END1 = ee.Date("2016-05-31")
var collectionS1 =  ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.filterBounds(geometry)
.filterDate(START1,END1);
print (collectionS1);
var imS1=collectionS1.select('VV').median().clip(geometry);
// ver S1 con estilo
//Map.addLayer(imS1, {bands: ['VV'], min: -13.388690948486328, max: -4.7677903175354 }, 'Sentinel1VV' ,false);
var ndS1Palette =['5c5592','0d8b8b','46a140','fbff11','c9860c'];
var visParams  = {min:0,max:200,palette: ndS1Palette};
///////////////////////////////////////////////////////////////////////////////////////////////////////
// crear indices landsat
// Calculo del NDVI  Landsat
var ndvi = imagen1.expression(
    '(NIR - RED) / (NIR + RED)',
    { 'NIR': imagen1.select('B5'),
      'RED': imagen1.select('B4')
    });
  // Calculo del ND54 Landsat
var nd54 = imagen1.expression(
    '(NIR6 - RED5) / (NIR6 + RED5)',
    { 'NIR6': imagen1.select('B6'),
      'RED5': imagen1.select('B5')
    });
  // crear paleta para ndvi
var ndPaleta = ['5c5592','0d8b8b','46a140','fbff11','c9860c','ff3305'];
var visParams = {min: 0, max: 200, palette: ndPaleta}; 
// Calculo de Altura y cobertura (Hall) sin expresion - ojo, si es L5/7 o L8 cambian las bandas
    var alt_B3 = imagen1.select(['B4']).multiply(100);
    var alt_B4 = imagen1.select(['B5']).multiply(100);
    var alt_B5 = imagen1.select(['B6']).multiply(100);
    var alt_B7 = imagen1.select(['B7']).multiply(100);
    // Calculo de Altura y cobertura (Hall) sentinel 
    var alt_s2 = imagen2.select(['S2_B2']) .divide(100);
    var alt_s3 = imagen2.select(['S2_B3']) .divide(100);
    var alt_s4 = imagen2.select(['S2_B4']) .divide(100);
    var alt_s5 = imagen2.select(['S2_B5']) .divide(100);
    var alt_s6 = imagen2.select(['S2_B6']) .divide(100);
    var alt_s7 = imagen2.select(['S2_B7']) 
    var alt_s8 = imagen2.select(['S2_B8'])  //.divide(100);
    var alt_s8a = imagen2.select(['S2_B8A'])  .divide(100);
    var alt_s11 = imagen2.select(['S2_B11']);
    var alt_s12 = imagen2.select(['S2_B12']).divide(100);
    var gnd118a = imagen2.select(['ND118A']);
    var gsavi= imagen2.select(['SAVI']);
    var lnsavi= imagen2.select (['SAVI']).log ();
    var lnndvi =imagen2.select (['NDVIS2']).log ();
    var lnb8a= imagen2.select (['S2_B8A']).log ();
    var lnb7 = imagen2.select (['S2_B7']).log();
    var ndvi_re =imagen2.select (['NDVI_RE']);
    var lnG = (lnb8a.multiply(5.776041)).add (ndvi_re.multiply(-17.025774)).add (alt_s11.multiply (-0.003990)).add (-26.608889);
    //var altura = ((alt_B3.multiply(-0.039)).add(alt_B4.multiply(-0.011)).add(alt_B5.multiply(-0.026)).add(4.13)).exp().byte();
    //var cobertura = ((alt_B3.multiply(-0.037)).add(alt_B4.multiply(-0.007)).add(alt_B7.multiply(-0.079)).add(5.22)).exp().byte();
    //var h_s2 = (((((alt_s4.multiply(-0.039)).add(alt_s8.multiply(-0.011)).add(alt_s11.multiply(-0.026)).add(4.13)).exp().byte()).divide (2.4)).subtract (0.66)) ;
     //var h_s2 = (((alt_s4.multiply(-0.039)).add(alt_s8.multiply(-0.011)).add(alt_s11.multiply(-0.026)).add(4.13))).exp();
     //var h_s2 = ((((alt_s11.multiply(-0.007819968)).add(alt_s12.multiply(-0.008070131))).add(21.91250853)).exp()).divide (100000000);
     //var cc_s2 = ((alt_s4.multiply(-0.037)).add(alt_s8.multiply(-0.007)).add(alt_s12.multiply(-0.079)).add(5.22)).exp();
/////////////////Establecemos umbral 
//var saviMasked = gsavi.updateMask(gsavi.gte(1.10));
//Delimitacion espectral de plantaciones
//Prueba1
//var gMasked = (g.updateMask (g.lt(25))).and (gsavi.gte(1.10))
//.and (g.updateMask(g.gte(35)));
//Prueba 2
//var plantaciones_espectrales = (g.updateMask (g.lt(25))).and (gsavi.lt(1.10))
///////////////////////////////////////////////////////////////////////////////
//var gMasked =  g.updateMask (gsavi.updateMask(gsavi.gte(1.10)))
//var lnGMasked = lnG.updateMask (gsavi.updateMask(gsavi.gte(1.10)))
//(g.updateMask(g.gte(2)).and
// ALTERNATIVA 1 Delimitacion de zonas: 
/*var zonas_g = ee.Image(0)
    .where(g.gt(2), 2)
     .where(g.gt(5), 5)
      .where(g.gt(10), 10)
       .where(g.gt(15), 15)
       .where(g.gt(20), 20)
        .where(g.gt(25), 25)
          .where(g.gt(30), 30)
            .where(g.gte(35), 0)
    .updateMask(g.gt(0))
*/
//Clip imagen
// agregar bandas de indices
//imagen1=imagen1.addBands(nd54.rename('ND54_OLI'))
//imagen1=imagen1.addBands(ndvi.rename('NDVI_OLI'))
//imagen1=imagen1.addBands(altura.rename('h_OLI'))
//imagen1=imagen1.addBands(cobertura.rename('cc_OLI'))
imagen1=imagen1.addBands(imS1)
//imagen1=imagen1.addBands(variableMasked.rename ( 'h_sentinel') )
//imagen1=imagen1.addBands(cc_s2.rename ( 'cc_sentinel') ),
imagen1=imagen1.addBands(ndviS2.rename ( 'NDVI_S2') ),
imagen1=imagen1.addBands(imagen2),
//imagen1=imagen1.addBands (g.rename ('G')),
//imagen1=imagen1.addBands (gMasked.rename ('G mascara')),
//imagen1=imagen1.addBands (lnGMasked.rename ('lnG mascara')),
//imagen1=imagen1.addBands (plantaciones_espectrales.rename ('Plantaciones_Sentinel')),
//imagen1=imagen1.addBands (saviMasked.rename ('SAVI mascara')),
imagen1=imagen1.addBands (lnsavi.rename ('Ln10 SAVI')),
imagen1=imagen1.addBands (lnb8a.rename ('Ln10 B8A'))
imagen1=imagen1.addBands (lnG.rename ('logG'))
var antlogG = imagen1.expression( 
    '2.718281828  ** lnG',
    { 'lnG': imagen1.select('logG') 
    });
imagen1=imagen1.addBands (antlogG.rename ('antilogG')).clip( carto_macizos)
//imagen1=imagen1.addBands (zonas_g.rename ('Zg'))
// agregar bandas de indices
//imagen2=imagen2.addBands(cc_s2.rename ( 'cc_sentinel') )
//imagen2=imagen2.addBands(variableMasked.rename ( 'h_sentinel') )
// agrego S2 + NDVI S2
//imagen1=imagen1.addBands(imagen2)
// ver caracteristicas de imagen
print (imagen1)
// ver imagen en mapa:
//Map.addLayer (imagen1, {bands: ['altura', 'cobertura', 'h_sentinel'], min: [0,0,0], max: [200,200,200] }, "altura-cobertura",false );
// ver imagen en mapa:
//Map.addLayer (imagen2, {bands: ['h_sentinel', 'cc_sentinel', 'ND54S2'], min: [0,0,0], max: [200,200,200] }, "altura-cobertura-ND54",false );
// crear paleta para altura
var Alturapalette =['5c5592','0d8b8b','46a140','fbff11','c9860c','c62701','991d00'];
var visParams  = {min:15,max:42,palette: Alturapalette};
var Coberturapalette =['5c5592','0d8b8b','46a140','fbff11','c9860c','ff3305'];
var visParams  = {min:15,max:42,palette: Coberturapalette};
// ver NDVI con estilo
//Map.addLayer(imagen1, {bands: ['NDVI'], min: 0, max: 1, palette: ndPaleta}, 'NDVI TM ( 30m)', false );
// ver altura con estilo
//Map.addLayer(imagen1, {bands: ['altura'], min: 15, max: 42, palette: Alturapalette}, 'Altura (30m)', false);
// ver altura s2 con estilo
//Map.addLayer(imagen1, {bands: ['h_sentinel'], min: 20.33041062679072, max: 32.698129356958034, palette: Alturapalette}, 'Altura sentinel(10m)',false);
// ver area basaL s2 con estilo
//Map.addLayer(imagen1, {bands: ['G'], min: 2, max: 35, palette: Alturapalette}, 'Area basal (20m)',false);
//Map.addLayer(imagen1, {bands: ['Ln10 SAVI'], min: 564.04, max: 10526.5520, palette: Alturapalette}, 'Ln10 SAVI ( 10) ',false);
//Map.addLayer(imagen1, {bands: ['SAVI mascara'], min: 1.1000, max: 1.2393, palette: Alturapalette}, 'SAVI mascara ( 10) ',false);
//Map.addLayer(imagen1, {bands: ['Plantaciones_Sentinel'], min: 0, max: 1 , palette: Alturapalette}, 'Plantaciones Sentinel ( 10) ',true);
//Map.addLayer(imagen1, {bands: ['G mascara'], min: -34.64, max: 39.417 , palette: Alturapalette}, 'G mascara  ( 10) ',true);
//Map.addLayer(imagen1, {bands: ['logG'], min: 0.4376, max: 2.6223 , palette: Alturapalette}, 'log G   ( 10) ',true);
//Map.addLayer(imagen1, {bands: ['lnG mascara'], min: 0.4376, max: 2.6223 , palette: Alturapalette}, 'ln G mascara  ( 10) ',true);
Map.addLayer(imagen1, {bands: ['antilogG'], min: 3, max: 60 , palette: Alturapalette}, 'area basal estimada ',false);
//Map.addLayer(imagen1, {bands: ['Zg'], min: 2, max: 30 , palette: Alturapalette}, 'Zonas de Área basal   ( 10) ',true);
// ver crown closure s2 con estilo
//Map.addLayer(imagen1, {bands: ['cc_sentinel'], min: 5, max: 35, palette: Alturapalette}, 'Crown closure  sentinel(10m)',false);
// ver cobertura con estilo
//Map.addLayer(imagen1, {bands: ['cobertura'], min: 11, max: 111, palette: Coberturapalette}, 'Cobertura (30m)', false);
// ver ND54 con estilo
//Map.addLayer(imagen1, {bands: ['ND54'], min: -0.6417332536005851, max: 0.010823276298059797, palette: ndPaleta}, 'ND54 TM ( 30 m)', false);
/*
// radar
var imgVV = ee.ImageCollection('COPERNICUS/S1_GRD')
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .select('VV')
        .map(function(image) {
          var edge = image.lt(-30.0);
          var maskedImage = image.mask().and(edge.not());
          return image.updateMask(maskedImage);
        });
var desc = imgVV.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
var asc = imgVV.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
var spring = ee.Filter.date('2016-03-01', '2016-04-20');
var lateSpring = ee.Filter.date('2016-04-21', '2016-06-10');
var summer = ee.Filter.date('2016-06-11', '2016-08-31');
var descChange = ee.Image.cat(
        desc.filter(spring).mean(),
        desc.filter(lateSpring).mean(),
        desc.filter(summer).mean());
var ascChange = ee.Image.cat(
        asc.filter(spring).mean(),
        asc.filter(lateSpring).mean(),
        asc.filter(summer).mean());
Map.setCenter(5.2013, 47.3277, 12);
Map.addLayer(ascChange, {min: -25, max: 5}, 'Multi-T Mean ASC', true);
Map.addLayer(descChange, {min: -25, max: 5}, 'Multi-T Mean DESC', true);
////////
*/
var carto_parcelas_sudeste = ee.FeatureCollection('users/mgaute/PoligonosGlobulusNDVI_id');
/// Estilos borde cartografía 
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: carto_parcelas_sudeste,
  color: 1,
  width: 1
});
var outline_macizos = empty.paint({
  featureCollection: carto_macizos,
  color: 1,
  width: 1
});
Map.addLayer(outline_macizos, {color: '067b06'} , 'Cartografia de macizos', true);
Map.addLayer(outline, {palette: '9f9f9f'}, 'parcelas_muestreo', true);
var palettes = require('users/gena/packages:palettes')
var style = require('users/gena/packages:style')
 var utils = require('users/gena/packages:utils')
var palette = palettes.colorbrewer.Paired[7]
var minMax = antlogG.reduceRegion(ee.Reducer.percentile([1, 99]), Map.getBounds(true), (Map.getScale()*20)).values()
var min = ee.Number(minMax.get(0))
var max = ee.Number(minMax.get(1))
var geometryScaleBar = /* color: #98ff00 */ee.Geometry.LineString(
        [[ -58.218707059843666, -31.41356350695651],
         [-58.2128062000109, -31.414479130793104]]),
    geometryGradientBar = /* color: #d63000 */ee.Geometry.LineString(
         [[ -58.21907059843666, -31.41356350695651],
         [-58.2128062000109, -31.41346379130793104]])
//barra de escala
/*// add a scale bar
var scale = style.ScaleBar.draw(geometryScaleBar, {
  steps:4, palette: ['5ab4ac', 'f5f5f5'], multiplier: 10, format: '%.1f', units: 'km', text: textProperties
})
Map.addLayer(scale, {}, 'scale bar')
*/
//
var textProperties = {  fontSize:10, textColor: '000000', outlineColor: 'ffffff', outlineWidth: 2, outlineOpacity: 0.6 }
// add a gradient bar
var labels = ee.List.sequence(min, max, max.subtract(min).divide(5))
var gradient = style.GradientBar.draw(geometryGradientBar, {
  min: min, max: max, palette: palette, labels: labels, format: '%.0f', text: textProperties
})
//Map.addLayer(gradient, {}, 'gradient bar (G)')
////////////////////////////////// Muestras inventario Entre Ríos 2015
//var monitoreo_concordia_15052018 = ee.FeatureCollection('users/mgaute/provincias/monitoreo_concordia_15052018');
//Map.addLayer(monitoreo_concordia_15052018, {color: '0f12f9'} , 'cartografia_15052018', false);
////////////////////////////////// Muestras inventario Entre Ríos 2015
//var muestras_er = ee.FeatureCollection('users/mgaute/muestras_inventarios_wgs84_4326_2015');
//Map.addLayer(muestras_er, {fillColor : (0.01), color: '40f6ff', opacity: 0.1} , 'Muestras_inventario_ER_2015 ', true);
// Cartografía  Corrientes
//var carto_co = ee.FeatureCollection('users/mgaute/cartografia_corrientes');
//Map.addLayer(carto_co, {color: '067b06'} , 'Cartografia_Corrientes', false);
//var carto_parcelas_co = ee.FeatureCollection('users/mgaute/provincias/ParcelasInv_Ctes_2015_buffer');
//Map.addLayer(carto_parcelas_co, {color: '42e7f4'} , 'Parcelas_Corrientes', true);
//var carto_parcelas_er_concordia = ee.FeatureCollection('users/mgaute/provincias/punto_parcelas_inventario_corroborados_4326');
//Map.addLayer(carto_parcelas_er_concordia, {color: '42e7f4'} , 'Parcelas_Concordia', true);
var carto_parcelas_er_concordia = ee.FeatureCollection('users/mgaute/provincias/Buffer_puntos_aleatorios_elegidos_ID_join_GEE_4326');
//Map.addLayer(carto_parcelas_er_concordia, {color: '42e7f4'} , 'Parcelas_Concordia', true);
//var carto_parcelas_er_concordia = ee.FeatureCollection('users/mgaute/provincias/buffer_merge_puntos_colon_4326');
//Map.addLayer(carto_parcelas_er_concordia, {color: '42e7f4'} , 'Parcelas_colon', true);
/*
// ER CARTOGRAFIA Filtro por edad
//print(carto_er.limit(10))
print("sin filtrar ER:",carto_er.size())
// Contar cuántas instancias de cada clase hay
print('Clases Distintas:',
carto_er.aggregate_count_distinct('anio_plant'));
var ER_euca= carto_er.filter(ee.Filter.stringStartsWith('nombre_cie',"Eucalyptus"));
print('ER Euca:', ER_euca.size());
// ojo que solo funciona el lessThan si pongo entre comillas el nro, ver formato del dato
var ER_euca_filt_edad=ER_euca.filter(ee.Filter.lessThan('anio_plant',"2011"));
//print(ER_euca_filt_edad)
print('ER Euca más de 6 años:', ER_euca_filt_edad.size());
Map.addLayer(ER_euca_filt_edad, {color: '42e7f4'}, 'ER Euca más de 6 años');
// Corrientes CARTOGRAFIA Filtro por edad
print(carto_co.limit(10))
print("sin filtrar Corrientes:",carto_co.size())
// Contar cuántas instancias de cada clase hay
print('Clases Distintas:',
carto_co.aggregate_count_distinct('ano_plan'));
var CO_euca= carto_co.filter(ee.Filter.stringStartsWith('genero',"Eucalyptus"));
print('CO Euca:', CO_euca.size());
// ojo que solo funciona el lessThan si pongo sin comillas el nro, ver formato del dato
var CO_euca_filt_edad=CO_euca.filter(ee.Filter.lessThan('ano_plan',2011));
//print(ER_euca_filt_edad)
print('CO Euca más de 6 años:', CO_euca_filt_edad.size());
Map.addLayer(CO_euca_filt_edad, {color: '42e7f4'}, 'CO Euca más de 6 años');
/*
// Extraer información Er
// Exporto todo incluynedo la columna genero
var sampling = imagen2.sampleRegions({
  collection: monitoreo_concordia_15052018,
  properties: ['id'],
  scale: 30
});*/
// Exporto todo incluynedo la columna genero
/*var sampling = h_s2.sampleRegions({
  collection: carto_co,
  properties: ['codigo'],
  scale: 30
});
*/
//Extraer información Er
// Exporto todo incluynedo la columna genero
var sampling = imagen1.sampleRegions({
  collection: carto_parcelas_sudeste,
  properties: [ 'id'],
  scale: 10} );
/*
// exportar tabla con información
Export.table.toDrive({
 'collection': sampling,
  'description': 'Extraccion_carto_co',
  'fileNamePrefix': 'Extraccion_carto_co',
  'fileFormat': 'CSV'}
);
*/
// exportar tabla con información
Export.table.toDrive({
 'collection': sampling,
  'description': 'parcelas_sudeste',
  'fileNamePrefix': 'parcelas_sudeste',
  'fileFormat': 'CSV'}
);
/*
// Prueba
// Exporto carto ER para ver formato años
// exportar tabla con información
Export.table.toDrive({
 'collection': carto_er,
  'description': 'carto_er',
  'fileNamePrefix': 'carto_er',
  'fileFormat': 'KML'}
);
// Exporto carto CO para ver formato años
// exportar tabla con información
Export.table.toDrive({
 'collection': carto_co,
  'description': 'carto_co',
  'fileNamePrefix': 'carto_co',
  'fileFormat': 'KML'}
);
*/