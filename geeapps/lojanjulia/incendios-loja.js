//Importar las capas permanentes del modelo
var forma = ee.FeatureCollection("users/incendiosloja/loja"); //var areaLoja = forma.geometry().area().divide(10000); //print ('Superficie Loja', areaLoja, 'hectáreas');
var elevacion = ee.Image("users/lojanjulia/comparacionmodelosIF/Elevacion_div_1000"); var B7 = elevacion;
var dist_rios = ee.Image("users/lojanjulia/comparacionmodelosIF/dist_rios_km"); var B6 = dist_rios;
var dist_antro = ee.Image("users/lojanjulia/comparacionmodelosIF/dist_antro_km"); var B5 = dist_antro;
var access_vias = ee.Image("users/incendiosloja/access_vias"); var B4 = access_vias;
var access_cen = ee.Image("users/incendiosloja/access_cen"); var B3 = access_cen;
var raster_Loja = ee.Image("users/lojanjulia/comparacionmodelosIF/raster_Loja"); var B8= raster_Loja;
//Configuración para enmascarar las nubes de la imagen satelitales
var s2Sr = ee.ImageCollection('COPERNICUS/S2_SR');
var s2Clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY');
////////////////////////////////////////// PERSONALIZAR //////////////////////////////
var START_DATE = ee.Date('2020-08-20'); /////////////////////////////////////////////
var END_DATE = ee.Date('2020-11-01');  /////////////////////////////////////////////
var MAX_CLOUD_PROBABILITY = 30; ////////Permisividad con probabilidad de nubes ////
var region =ee.FeatureCollection("users/incendiosloja/loja");//////////límite/////
Map.addLayer(region,{color: 'skyblue'}, 'Loja', false);
Map.centerObject(region);
function maskClouds(img) {
  var clouds = ee.Image(img.get('cloud_mask')).select('probability');
  var isNotCloud = clouds.lt(MAX_CLOUD_PROBABILITY);
  return img.updateMask(isNotCloud);
}
function maskEdges(s2_img) {
  return s2_img.updateMask(
      s2_img.select('B8A').mask().updateMask(s2_img.select('B9').mask()));
}
// Filter input collections by desired data range and region.
var criteria = ee.Filter.and(
    ee.Filter.bounds(region), ee.Filter.date(START_DATE, END_DATE));
s2Sr = s2Sr.filter(criteria).map(maskEdges);
s2Clouds = s2Clouds.filter(criteria);
// Join S2 SR with cloud probability dataset to add cloud mask.
var s2SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({
  primary: s2Sr,
  secondary: s2Clouds,
  condition:
      ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
});
var s2 =  ee.ImageCollection(s2Sr).median().clip(region)
print (s2);
var s2CloudMasked =
    ee.ImageCollection(s2SrWithCloudMask).map(maskClouds).median().clip(region);
var rgbVis = {min: 0, max: 3000, bands: ['B4', 'B3', 'B2']};
    Map.addLayer(    s2, rgbVis, 'S2 without cloudmasking',     false);
Map.addLayer( s2CloudMasked, rgbVis, 'S2 SR masked at ' + MAX_CLOUD_PROBABILITY + '%', false);
//Cálculo del índice NDMI 
var NDMI = s2CloudMasked.normalizedDifference (['B8A', 'B11']); var B1 = NDMI;
//Calculo del Indice NDVI 
 var NDVI = s2CloudMasked.normalizedDifference (['B8', 'B4']); var B2 = NDVI;
var bandas = B1.addBands(B2).addBands(B3).addBands(B4).addBands(B5).addBands(B6).addBands(B7).addBands(B8)
              .rename('B1','B2','B3','B4','B5','B6','B7','B8');    
Map.addLayer (s2CloudMasked, {max: 5000.0, min: 0.0, gamma: 1.0, bands: ['B4','B3','B2']}, 'Color natural');
////////////////////////////////////////////////////////////////////
///////////////////////// REGRESIÓN LOGÍSTICA //////////////////////
////////////////////////////////////////////////////////////////////
var Logit_LR = bandas.expression(
    'float(1.885591 + (-1.989505*B2) + (-6.106258 * B1) + (0.020462 * B3) + (-0.049783*B4) + (-0.348723 * B7) + (0.360637 * B6) + (0.231751*B5)) '
   , {'B1': B1, 'B2': B2,'B3': B3, 'B4': B4,'B5': B5, 'B6': B6,'B7': B7 });
//Export.image.toDrive({image: Logit_LR, description: 'Logit_LR', scale: 10, region: forma, crs:'EPSG:32717', folder:'S2'});
var less = Logit_LR.expression(
    'float( B8 + B2 + B1 ) '
   , {'B1': B1, 'B2': B2,'B8': B8});
//Export.image.toDrive({image: less, description: 'less', scale: 10, region: forma, crs:'EPSG:32717', folder:'S2'});
//                      CONVERSIÓN A PROBABILIDAD
var Probabilidad_LR = bandas.expression(
    '((1)/(1+(2.71828182845904 **(Logit * -1))))',
    {'Logit': Logit_LR});
//Export.image.toDrive({image: Probabilidad_LR, description: 'Probabilidad_LR', scale: 10, region: forma, crs:'EPSG:32717', folder:'S2'});
//==========================================================================================
//            RECLASIFICACIÓN A UN RANGO DE PROBABILIDAD
var Reclasificado_LR = ee.Image(1)
                    .where(Probabilidad_LR.lte(0.2),1)
                    .where(Probabilidad_LR.gt(0.2).and(Probabilidad_LR.lte(0.4)),2)
                    .where(Probabilidad_LR.gt(0.4).and(Probabilidad_LR.lte(0.6)),3)
                    .where(Probabilidad_LR.gt(0.6).and(Probabilidad_LR.lte(0.8)),4)
                    .where(Probabilidad_LR.gt(0.8),5);
//Export.image.toDrive({image: Reclasificado_LR, description: 'Reclasificado_LR', scale: 10, region: forma, crs:'EPSG:32717', folder:'S2'});                    
//Map.addLayer(Reclasificado_LR); print (Reclasificado_LR);
//==========================================================================================
//                                    FILTRO DE SUAVIZADO (GENERALIZACIÓN)
var Reclas_LR = Reclasificado_LR.toDouble();
var generalizado_LR = Reclas_LR.reduceNeighborhood({
  reducer: ee.Reducer.mode(),
  kernel: ee.Kernel.square({radius: 0.5, 
                            units: 'pixels', 
                            normalize: false})
  });
var generalizado_LR = generalizado_LR.toInt();
//Export.image.toDrive({image: generalizado_LR, description: 'generalizado_LR', scale: 10, region: forma, crs:'EPSG:32717', folder:'S2'});                    
//print(generalizado_LR);
//Reclasificación e identificación de valores sin datos (nulos)
var Reclas_final_LR = ee.Image(1)
  .where(B8.eq(less),6)
  .where(B8.neq(less).and(Reclasificado_LR.eq(1)),7)
  .clip(forma);
var Reclas_final_LR = ee.Image(1)
  .where(Reclas_final_LR.eq(6),generalizado_LR)
  .where(Reclas_final_LR.lt(6),6)
  .clip(forma)
Export.image.toDrive({image: Reclas_final_LR, description: 'Reclas_final_LR', scale: 10, region: forma, crs:'EPSG:32717', folder:'S2'});                    
////////////////////////////////////////////////////////////////////
//////MARS (Multivariate adaptive regression spline )///////////////
////////////////////////////////////////////////////////////////////
var Coef_1 = bandas.expression('float(max(0,(B1-(-0.0139)))*-127)', {'B1': bandas.select('B1')});
var Coef_2 = bandas.expression('float(max(((-0.0139)-B1),0)* 82)', {'B1': bandas.select('B1')});
var Coef_3 = bandas.expression('float(max(0,(B7-1.975))*-3.81)', {'B7': bandas.select('B7')});
var Coef_4 = bandas.expression('float(max((1.975-B7),0)*-4.99)', {'B7': bandas.select('B7')});
var Coef_5 = bandas.expression('float(max(0,(B2-0.3865))*-7.38)', {'B2': bandas.select('B2')});
var Coef_6 = bandas.expression('float(max(0,(B7-2.904))*8.02)', {'B7': bandas.select('B7')});
var Coef_7 = bandas.expression('float(max(0,(B5-0.303))*0.585)', {'B5': bandas.select('B5')});
var Coef_8 = bandas.expression('float(max((0.303-B5),0)*3.54)', {'B5': bandas.select('B5')});
var Coef_9 = bandas.expression('float(max((120-B4),0)*0.0485)', {'B4': bandas.select('B4')});
var Coef_10 = bandas.expression('float(max(0,(B3-(116)))*-0.653)', {'B3': bandas.select('B3')});
var Coef_11 = bandas.expression('float(max(0,(116-B3))*0.619)', {'B3':bandas.select('B3')});
var Coef_12 = bandas.expression('float(max(0, (0.1662-B6))*-6.95)', {'B6': bandas.select('B6')});
var Coef_13 = bandas.expression('float(max(0,(B3-11))*0.648)', {'B3': bandas.select('B3')});
var Coef_14 = bandas.expression('float(max(0,(B1-(-0.0751))*121))', {'B1': bandas.select('B1')});
var C0 = -76.10;
var C1= ee.Image(1).where(B1.gt(-0.0139),Coef_1).where(B1.lte(-0.0139),0);
var C2= ee.Image(1).where(B1.lte(-0.0139),Coef_2).where(B1.gt(-0.0139),0);
var C3 = ee.Image(1).where(B7.gt(1.975),Coef_3).where(B7.lte(1.975),0);
var C4 = ee.Image(1).where(B7.lte(1.975),Coef_4).where(B7.gt(1.975),0);
var C5= ee.Image(1).where(B2.gt(0.3865), Coef_5).where(B2.lte(0.3865), 0);
var C6 = ee.Image(1).where(B7.gt(2.904),Coef_6).where(B7.lte(2.904),0);
var C7 = ee.Image(1).where(B5.gt(0.303),Coef_7).where(B5.lte(0.303),0);
var C8 = ee.Image(1).where(B5.lte(0.303),Coef_8).where(B5.gt(0.303),0);
var C9 = ee.Image(1).where(B4.lte(120),Coef_9).where(B4.gt(120),0);
var C10 = ee.Image(1).where(B3.gt(116),Coef_10).where(B3.lte(116),0);
var C11 = ee.Image(1).where(B3.lte(116),Coef_11).where(B3.gt(116),0);
var C12 = ee.Image(1).where(B6.lte(0.1662),Coef_12).where(B6.gt(0.1662),0);
var C13 = ee.Image(1).where(B3.gt(11),Coef_13).where(B3.lte(11),0);
var C14 = ee.Image(1).where(B1.gt(-0.0751),Coef_14).where(B1.lte(-0.0751),0);
var Coef = bandas.expression('C0+C1+C2+C3+C4+C5+C6+C7+C8+C9+C10+C11+C12+C13+C14',
    {'C0': C0, 'C1': C1, 'C2': C2, 'C3': C3,'C4': C4, 'C5': C5,'C6':C6,'C7':C7, 'C8': C8, 'C9':C9,'C10': C10,
      'C11':C11, 'C12': C12, 'C13': C13, 'C14': C14});
    //print(Coef); 
    //Map.addLayer(Coef);Map.centerObject(forma);
//==========================================================================================
//                      CONVERSIÓN A PROBABILIDAD
var Probabilidad_MARS = Coef.expression('((2.71828182845904)**(Coef))/(1+((2.71828182845904)**(Coef)))',
    {'Coef': Coef});
//Export.image.toDrive({image: Probabilidad_MARS, description: 'Probabilidad_MARS', scale: 10, region: forma, crs:'EPSG:32717', folder:'S2'});
//==========================================================================================
//            RECLASIFICACIÓN A UN RANGO DE PROBABILIDAD
var Reclasificado_MARS = ee.Image(1)
                    .where(Probabilidad_MARS.lte(0.2),1)
                    .where(Probabilidad_MARS.gt(0.2).and(Probabilidad_MARS.lte(0.4)),2)
                    .where(Probabilidad_MARS.gt(0.4).and(Probabilidad_MARS.lte(0.6)),3)
                    .where(Probabilidad_MARS.gt(0.6).and(Probabilidad_MARS.lte(0.8)),4)
                    .where(Probabilidad_MARS.gt(0.8),5);
//Export.image.toDrive({image: Reclasificado_MARS, description: 'Reclasificado_MARS', scale: 10, region: forma, crs:'EPSG:32717', folder:'S2'});                    
//Map.addLayer(Reclasificado_MARS); print (Reclasificado_MARS);
//==========================================================================================
//                                    FILTRO DE SUAVIZADO (GENERALIZACIÓN)
var Reclas_MARS = Reclasificado_MARS.toDouble();
var generalizado_MARS = Reclas_MARS.reduceNeighborhood({
  reducer: ee.Reducer.mode(),
  kernel: ee.Kernel.square({radius: 0.5, 
                            units: 'pixels', 
                            normalize: false})
  });
var generalizado_MARS = generalizado_MARS.toInt();
//Export.image.toDrive({image: generalizado_MARS, description: 'generalizado_MARS', scale: 10, region: forma, crs:'EPSG:32717', folder:'S2'});                    
//print(generalizado_MARS);
//Reclasificación e identificación de valores sin datos (nulos)
var Reclas_final_MARS = ee.Image(1)
  .where(B8.eq(less),6)
  .where(B8.neq(less).and(C1.eq(1).and(C10.eq(0).and(C2.eq(1).and(C4.eq(0)).and(C5.eq(1).and(C13.eq(0).and(C14.eq(1))))))),7)
  .clip(forma);
var Reclas_final_MARS = ee.Image(1)
  .where(Reclas_final_MARS.eq(6),generalizado_MARS)
  .where(Reclas_final_MARS.lt(6),6)
  .clip(forma)
Export.image.toDrive({image: Reclas_final_MARS, description: 'Reclas_final_MARS', scale: 10, region: forma, crs:'EPSG:32717', folder:'S2'});                    
////////////////////////////////////////////////////////////////////
/////////////////////////      LMT          ////////////////////////
////////////////////////////////////////////////////////////////////
//==========================================================================================
//                        CLASIFICACIÓN DE LAS 10 HOJAS (SUBGRUPOS)
//var LM = ee.Image (1).where(B4.lte(58).and(B2.lte(0.5185).and(B7.lte(2.592).and(B7.lte(1.645)))),1)
//        .where(B4.lte(58).and(B2.lte(0.5185).and(B7.lte(2.592).and(B7.gt(1.645).and(B1.lte(0.2093).and(B3.lte(41))))),2)
//        .where(B4.lte(58).and(B2.lte(0.5185).and(B7.lte(2.592).and(B7.gt(1.645).and(B1.lte(0.2093).and(B3.gt(41))))),3)
//        .where(B4.lte(58).and(B2.lte(0.5185).and(B7.lte(2.592).and(B7.gt(1.645).and(B1.gt(0.2093).and(B3.lte(6))))),4)
//        .where(B4.lte(58).and(B2.lte(0.5185).and(B7.lte(2.592).and(B7.gt(1.645).and(B1.gt(0.2093).and(B3.gt(6).and(B7.lte(2.249).and(B1.lte(0.3537))))))),5)
//        .where(B4.lte(58).and(B2.lte(0.5185).and(B7.lte(2.592).and(B7.gt(1.645).and(B1.gt(0.2093).and(B3.gt(6).and(B7.lte(2.249).and(B1.gt(0.3537))))))),6)
//        .where(B4.lte(58).and(B2.lte(0.5185).and(B7.lte(2.592).and(B7.gt(1.645).and(B1.gt(0.2093).and(B3.gt(6).and(B7.gt(2.249))))))),7)
//        .where(B4.lte(58).and(B2.lte(0.5185).and(B7.lte(2.592)),8)
//        .where(B4.lte(58).and(B2.gt(0.5185)),9)
//        .where(B4.gt(58),10)))))));
var LM_1 = ee.Image (1).where(B4.lte(58).and(B2.lte(0.5185).and(B7.lte(2.592).and(B7.lte(1.645)))),1).where(B4.lte(58).and(B2.lte(0.5185).and(B7.lte(2.592).and(B7.gt(1.645)))),2);
var LM_2 = ee.Image (1).where(LM_1.eq(2).and(B1.lte(0.2093).and(B3.lte(41))), 2).where(LM_1.eq(2).and(B1.lte(0.2093).and(B3.gt(41))), 3);
var LM_3 = ee.Image (1).where(LM_1.eq(2).and(B1.gt(0.2093).and(B4.lte(6))), 4);
var LM_4 = ee.Image (1).where(LM_1.eq(2).and(B1.gt(0.2093).and(B4.gt(6).and(B7.lte(2.249).and(B1.lte(0.3537))))), 5);
var LM_5 = ee.Image (1).where(LM_1.eq(2).and(B1.gt(0.2093).and(B4.gt(6).and(B7.lte(2.249).and(B1.gt(0.3537))))),6);
var LM_6 = ee.Image (1).where(LM_1.eq(2).and(B1.gt(0.2093).and(B4.gt(6).and(B7.gt(2.249)))),7);
var LM_7 = ee.Image (1).where(B4.lte(58).and(B2.lte(0.5185)),2);
var LM_8 = ee.Image (1).where (LM_7.eq(2).and(B7.gt(2.592)),8);
var LM_9 = ee.Image (1).where(B4.lte(58).and(B2.gt(0.5185)),9);
var LM_10 = ee.Image (1).where(B4.gt(58),10);
var LM = ee.Image (1).where(LM_1.eq(1), 1).where(LM_2.eq(2), 2).where(LM_2.eq(3), 3)
              .where(LM_3.eq(4), 4).where(LM_4.eq(5),5).where(LM_5.eq(6),6)
              .where(LM_6.eq(7),7).where(LM_8.eq(8),8).where(LM_9.eq(9),9).where(LM_10.eq(10),10);
//print(LM);
//Export.image.toDrive({image: LM, description: 'LM', scale: 10, region: forma, crs:'EPSG:32717', folder:'S2'});
//==========================================================================================
var Logit_LM1 = bandas.expression(
    'float(5.34 + (-5.23*B2) + (-8.5 * B1) + (-0.02 * B3) + (-0.01 * B4) + (-1.76*B7) + (0.73*B6) + (-1.58 * B5)) '
   , {'B1': bandas.select('B1'), 'B2': bandas.select('B2'),'B3': bandas.select('B3'), 'B4': bandas.select('B4'),
      'B5': bandas.select('B5'), 'B6': bandas.select('B6'),'B7': bandas.select('B7')});
var Logit_LM2 = bandas.expression(
    'float(8.31 + (1.51*B2) + (-0.38 * B1) + (-0 * B3) + (-0.06 * B4) + (-2.68*B7) + (-2.32*B6) + (-0.98 * B5)) '
  , {'B1': bandas.select('B1'), 'B2': bandas.select('B2'),'B3': bandas.select('B3'), 'B4': bandas.select('B4'),
      'B5': bandas.select('B5'), 'B6': bandas.select('B6'),'B7': bandas.select('B7')});
var Logit_LM3 = bandas.expression(
    'float(3.1 + (0.99*B2) + (-0.87 * B1) + (-0.02 * B3) + (0.02 * B4) + (-0.91*B7) + (0.52*B6) + (0.24 * B5)) ' 
  , {'B1': bandas.select('B1'), 'B2': bandas.select('B2'),'B3': bandas.select('B3'), 'B4': bandas.select('B4'),
      'B5': bandas.select('B5'), 'B6': bandas.select('B6'),'B7': bandas.select('B7')});
var Logit_LM4 = bandas.expression(
     'float(-28.92 + (6.45*B2) + (-88.57 * B1) + (-0.01 * B3) + (3.06 * B4) + (29.08*B7) + (-3.53*B6) + (-11.09 * B5)) ' 
  , {'B1': bandas.select('B1'), 'B2': bandas.select('B2'),'B3': bandas.select('B3'), 'B4': bandas.select('B4'),
      'B5': bandas.select('B5'), 'B6': bandas.select('B6'),'B7': bandas.select('B7')});
var Logit_LM5 = bandas.expression(
    'float(-12.48 + (-0.91*B2) + (-0.96 * B1) + (0.07 * B3) + (-0.11* B4) + (6*B7) + (4.6*B6) + (-1.37 * B5)) ' 
  , {'B1': bandas.select('B1'), 'B2': bandas.select('B2'),'B3': bandas.select('B3'), 'B4': bandas.select('B4'),
      'B5': bandas.select('B5'), 'B6': bandas.select('B6'),'B7': bandas.select('B7')});
var Logit_LM6 = bandas.expression(
     'float(56.37 + (836.97*B2) + (-192.75 * B1) + (0.04 * B3) + (0.63* B4) + (2.72*B7) + (-22.21*B6) + (-1.05 * B5)) ' 
  , {'B1': bandas.select('B1'), 'B2': bandas.select('B2'),'B3': bandas.select('B3'), 'B4': bandas.select('B4'),
      'B5': bandas.select('B5'), 'B6': bandas.select('B6'),'B7': bandas.select('B7')});
var Logit_LM7 = bandas.expression(
    'float(4.27 + (0.51*B2) + (5.66 * B1) + (-0.01 * B3) + (0.06* B4) + (-4.6*B7) + (5.07*B6) + (1.11 * B5)) ' 
  , {'B1': bandas.select('B1'), 'B2': bandas.select('B2'),'B3': bandas.select('B3'), 'B4': bandas.select('B4'),
      'B5': bandas.select('B5'), 'B6': bandas.select('B6'),'B7': bandas.select('B7')});
var Logit_LM8 = bandas.expression(
     'float(-6.23 + (-0.52*B2) + (-10.8 * B1) + (0.07 * B3) + (-0.06* B4) + (1.19*B7) + (0.92*B6) + (0.54 * B5)) ' 
  , {'B1': bandas.select('B1'), 'B2': bandas.select('B2'),'B3': bandas.select('B3'), 'B4': bandas.select('B4'),
      'B5': bandas.select('B5'), 'B6': bandas.select('B6'),'B7': bandas.select('B7')});
var Logit_LM9 = bandas.expression(
     'float(0.74 + (-1.11*B2) + (-0.45 * B1) + (0.01 * B3) + (-0.03* B4) + (-0.3*B7) + (-0.7*B6) + (-0.31 * B5)) ' 
  , {'B1': bandas.select('B1'), 'B2': bandas.select('B2'),'B3': bandas.select('B3'), 'B4': bandas.select('B4'),
      'B5': bandas.select('B5'), 'B6': bandas.select('B6'),'B7': bandas.select('B7')});
var Logit_LM10 = bandas.expression(
     'float(-0.06 + (0.58*B2) + (-3.44 * B1) + (0 * B3) + (-0* B4) + (-0.27*B7) + (0.06*B6) + (0.01 * B5)) ' 
  , {'B1': bandas.select('B1'), 'B2': bandas.select('B2'),'B3': bandas.select('B3'), 'B4': bandas.select('B4'),
      'B5': bandas.select('B5'), 'B6': bandas.select('B6'),'B7': bandas.select('B7')});
var Logit_LMT = ee.Image (1)
            .where(LM.eq(1),Logit_LM1).where(LM.eq(2),Logit_LM2)
            .where(LM.eq(3),Logit_LM3).where(LM.eq(4),Logit_LM4).where(LM.eq(5),Logit_LM5)
            .where(LM.eq(6),Logit_LM6).where(LM.eq(7),Logit_LM7).where(LM.eq(8),Logit_LM8)
            .where(LM.eq(9),Logit_LM9).where(LM.eq(10),Logit_LM10);
//Export.image.toDrive({image: Logit_LMT, description: 'Logit_LMT', scale: 10, region: forma, crs:'EPSG:32717', folder:'S2'});
//==========================================================================================
//                      CONVERSIÓN A PROBABILIDAD
var Probabilidad_LMT = bandas.expression(
    '((1)/(1+(2.71828182845904 **(Logit * -1))))',
    {'Logit': Logit_LMT});
//Export.image.toDrive({image: Probabilidad_LMT, description: 'Probabilidad_LMT', scale: 10, region: forma, crs:'EPSG:32717', folder:'S2'});
//==========================================================================================
//            RECLASIFICACIÓN A UN RANGO DE PROBABILIDAD
var Reclasificado_LMT = ee.Image(1)
                    .where(Probabilidad_LMT.lte(0.2),1)
                    .where(Probabilidad_LMT.gt(0.2).and(Probabilidad_LMT.lte(0.4)),2)
                    .where(Probabilidad_LMT.gt(0.4).and(Probabilidad_LMT.lte(0.6)),3)
                    .where(Probabilidad_LMT.gt(0.6).and(Probabilidad_LMT.lte(0.8)),4)
                    .where(Probabilidad_LMT.gt(0.8),5);
//Export.image.toDrive({image: Reclasificado_LMT, description: 'Reclasificado_LMT', scale: 10, region: forma, crs:'EPSG:32717', folder:'S2'});                    
//Map.addLayer(Reclasificado_LMT); print (Reclasificado_LMT);
//==========================================================================================
//                                    FILTRO DE SUAVIZADO (GENERALIZACIÓN)
var Reclas_LMT = Reclasificado_LMT.toDouble();
var generalizado_LMT = Reclas_LMT.reduceNeighborhood({
  reducer: ee.Reducer.mode(),
  kernel: ee.Kernel.square({radius: 0.5, 
                            units: 'pixels', 
                            normalize: false})
  });
var generalizado_LMT = generalizado_LMT.toInt();
//Export.image.toDrive({image: generalizado_LMT, description: 'generalizado_LMT', scale: 10, region: forma, crs:'EPSG:32717', folder:'S2'});                    
//print(generalizado_LMT);
//Reclasificación e identificación de valores sin datos (nulos)
var Reclas_final_LMT = ee.Image(1)
                    .where(generalizado_LMT.gte(1),generalizado_LMT)
                    .where(generalizado_LMT.eq(4).and(Logit_LMT.eq(1)),6)
                    .clip(forma);
Export.image.toDrive({image: Reclas_final_LMT, description: 'Reclas_final_LMT', scale: 10, region: forma, crs:'EPSG:32717', folder:'S2'});                    
////////////////////////////////////////////////////////////////////
///////////////////////// REPRESENTACIÓN GRÁFICA////////////////////
////////////////////////////////////////////////////////////////////
Map.addLayer (Reclas_final_LR,{    max: 6, min: 1,
    'palette': ['2c7bb6', 'abd9e9','ffffbf','fd8d3c','d7191c','ffffff']},
    'LR_Susceptibilidad de Incendios Forestales');
//Centramos la imagen con un nivel de zoom
Map.centerObject (forma,9);
Map.addLayer (Reclas_final_LMT,{    max: 6, min: 1,
    'palette': ['2c7bb6', 'abd9e9','ffffbf','fd8d3c','d7191c','ffffff']},
    'LMT_Susceptibilidad de Incendios Forestales');
//Centramos la imagen con un nivel de zoom
Map.centerObject (forma,9);
Map.addLayer (Reclas_final_MARS,{    max: 6, min: 1,
    'palette': ['2c7bb6', 'abd9e9','ffffbf','fd8d3c','d7191c','ffffff']},
    'MARS_Susceptibilidad de Incendios Forestales');
//Centramos la imagen con un nivel de zoom
Map.centerObject (forma,9);
//==========================================================================================
//                                    AGREGAR UNA LEYENDA
// establece la posición del recuadro de leyenda.
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }});
// Crea un título de leyenda.
var legendTitle = ui.Label({
  value: 'Susceptibilidad a Incendios',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
// Agregua el título al recuadro.
legend.add(legendTitle);
// Crea y estiliza 1 fila de la leyenda.
var makeRow = function(color, name) {
      // Crea la etiqueta que en realidad es el cuadro de color.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Usa (padding) para rellenoar y dar la altura y el ancho de la caja.
          padding: '8px',
          margin: '0 0 4px 0'
        }});
      // Crea la etiqueta llena con el texto descriptivo.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // devuelve el panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
//  Paleta de colores
var palette =['2c7bb6', 'abd9e9','ffffbf','fd8d3c','d7191c','ffffff'];
// Nombre de la leyenda
var names = ['Probabilidad Muy Baja','Probabilidad Baja','Probabilidad Media', 
'Probabilidad Alta','Probabilidad Muy Alta', 'Sin Datos'];
// Agregua color y nombres
for (var i = 0; i < 6; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// Agrega la leyenda al mapa (también se puede imprimir la leyenda en la consola)
Map.add(legend);
//Definir el titulo del mapa
var TituloMapa = ui.Label({
  value: 'Mapa de Susceptibilidad a Incendios Forestales, cantón Loja', // Titulo del mapa
  style: {position: 'top-center', // Posicion, opciones: 'top-left','top-center','top-right'
                                              //'middle-left', 'middle-right','bottom-left'
                                              //'bottom-center', 'bottom-right'
  fontWeight: 'bold', // Negrita
  fontSize: '15px'}}); // TamaÃ±o de fuente
//Incorporar el titulo en el visor
Map.add(TituloMapa); 
var nubes = (Reclas_final_MARS.eq(6));
var nubes = Reclas_final_MARS.updateMask (nubes)
//Map.addLayer(nubes);
var nonubes = (Reclas_final_MARS.neq(6));
var nonubes = Reclas_final_MARS.updateMask (nonubes)
//Map.addLayer(nonubes);
var getnubes = nubes.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry: forma,
      scale: 10,
      maxPixels:1e13,
            });
var getnubes = ee.Number(getnubes.get('constant'));
print (getnubes)
var getnonubes = nonubes.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry: forma,
      scale: 10,
      maxPixels:1e13,
            });
var getnonubes = ee.Number(getnonubes.get('constant'));
print (getnonubes)
var porcentajeNubes = (getnubes.multiply(100)).divide(getnubes.add(getnonubes))
print(porcentajeNubes, '% NUBES')