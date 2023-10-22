var table8 = ui.import && ui.import("table8", "table", {
      "id": "users/magaparzanese/partidos"
    }) || ee.FeatureCollection("users/magaparzanese/partidos"),
    image7 = ui.import && ui.import("image7", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/CLASIFICACION_CHACABUCO_V2"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/CLASIFICACION_CHACABUCO_V2"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/CarmenAreco_Classified_v01"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/CarmenAreco_Classified_v01"),
    image4 = ui.import && ui.import("image4", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/ARENALES_FINA2020_CLASSIFIER"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/ARENALES_FINA2020_CLASSIFIER"),
    image5 = ui.import && ui.import("image5", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/SanAndresdeGiles_Classification"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/SanAndresdeGiles_Classification"),
    image8 = ui.import && ui.import("image8", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/COLON_classification_f2020"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/COLON_classification_f2020"),
    image9 = ui.import && ui.import("image9", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/PERGAMINO_CLASSIFICATION_F2020"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/PERGAMINO_CLASSIFICATION_F2020"),
    image10 = ui.import && ui.import("image10", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/ARRECIFES_CLASSIFICATION_F2020"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/ARRECIFES_CLASSIFICATION_F2020"),
    image11 = ui.import && ui.import("image11", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/RAMALLO_CLASIFICACION_F2020"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/RAMALLO_CLASIFICACION_F2020"),
    image12 = ui.import && ui.import("image12", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/SALTO_CLASSIFICATION_F2020"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/SALTO_CLASSIFICATION_F2020"),
    image13 = ui.import && ui.import("image13", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/BRAGADO_CLASSIFICATION_F2020"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/BRAGADO_CLASSIFICATION_F2020"),
    image14 = ui.import && ui.import("image14", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/BARADERO_SP_MAS_CLASSIFICATION_F2020"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/BARADERO_SP_MAS_CLASSIFICATION_F2020"),
    image15 = ui.import && ui.import("image15", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/ROSALES_CLASSIFICATION_F2020"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/ROSALES_CLASSIFICATION_F2020"),
    image16 = ui.import && ui.import("image16", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/BAHIA_BLANCA_CLASSIFICATION"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/BAHIA_BLANCA_CLASSIFICATION"),
    image = ui.import && ui.import("image", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/ROJAS_classiffication_f2020"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/ROJAS_classiffication_f2020"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/SAA_CLASSIFICATION_F2020"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/SAA_CLASSIFICATION_F2020"),
    image18 = ui.import && ui.import("image18", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/SAN_NICOLAS_CLASSIFICATION_F2020"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/SAN_NICOLAS_CLASSIFICATION_F2020"),
    image19 = ui.import && ui.import("image19", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/clasificacion_fina2021_pila_final"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/clasificacion_fina2021_pila_final"),
    image20 = ui.import && ui.import("image20", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/clasificacion_fina2021_castelli_final"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/clasificacion_fina2021_castelli_final"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/magaparzanese/Ejidos_Pais"
    }) || ee.FeatureCollection("users/magaparzanese/Ejidos_Pais"),
    table9 = ui.import && ui.import("table9", "table", {
      "id": "users/magaparzanese/macizos_solicitados_21_01_2021"
    }) || ee.FeatureCollection("users/magaparzanese/macizos_solicitados_21_01_2021"),
    image21 = ui.import && ui.import("image21", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/SALADILLO_CLASSIFICATION"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/SALADILLO_CLASSIFICATION"),
    image22 = ui.import && ui.import("image22", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/SUIPACHA_CLASSIFICATION_F2020"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/SUIPACHA_CLASSIFICATION_F2020"),
    logo = ui.import && ui.import("logo", "image", {
      "id": "users/estimacionesmagyp/min_agricultura_ganaderia"
    }) || ee.Image("users/estimacionesmagyp/min_agricultura_ganaderia"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/estimacionesmagyp/Departamentos_INDEC_2015"
    }) || ee.FeatureCollection("users/estimacionesmagyp/Departamentos_INDEC_2015"),
    image17 = ui.import && ui.import("image17", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/CARLOSTEJEDOR_CLASSIFICATION_F2020"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/CARLOSTEJEDOR_CLASSIFICATION_F2020"),
    image6 = ui.import && ui.import("image6", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/JUNIN_CLASSIFICATION_OK_BAJOS"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/JUNIN_CLASSIFICATION_OK_BAJOS"),
    image23 = ui.import && ui.import("image23", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/ALBERTI_CLASIFFICATION_F2020"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/ALBERTI_CLASIFFICATION_F2020"),
    image24 = ui.import && ui.import("image24", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/PEHUAJO_CLASSIFICATION_F2020"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/PEHUAJO_CLASSIFICATION_F2020"),
    image25 = ui.import && ui.import("image25", "image", {
      "id": "users/erollero/imageVTuerto"
    }) || ee.Image("users/erollero/imageVTuerto"),
    image26 = ui.import && ui.import("image26", "image", {
      "id": "users/erollero/imagedelLincoln"
    }) || ee.Image("users/erollero/imagedelLincoln"),
    image28 = ui.import && ui.import("image28", "image", {
      "id": "users/montisgo69/Fina_2021/Clasificaciones/Clasificacion_Castellanos_Fina2021_Tercera_4x4_Reclasif"
    }) || ee.Image("users/montisgo69/Fina_2021/Clasificaciones/Clasificacion_Castellanos_Fina2021_Tercera_4x4_Reclasif"),
    image29 = ui.import && ui.import("image29", "image", {
      "id": "users/montisgo69/Fina_2021/Clasificaciones/Clasificacion_9dejulio_Fina2021_Segunda_4x4_Reclasif"
    }) || ee.Image("users/montisgo69/Fina_2021/Clasificaciones/Clasificacion_9dejulio_Fina2021_Segunda_4x4_Reclasif"),
    image31 = ui.import && ui.import("image31", "image", {
      "id": "users/montisgo69/Fina_2021/Clasificaciones/Clasificacion_LaCapital_Fina2021_Primera_4x4_Reclasif"
    }) || ee.Image("users/montisgo69/Fina_2021/Clasificaciones/Clasificacion_LaCapital_Fina2021_Primera_4x4_Reclasif"),
    image32 = ui.import && ui.import("image32", "image", {
      "id": "users/montisgo69/Fina_2021/Clasificaciones/Clasificacion_LasColonias_Fina2021_Segunda_4x4_Reclasif"
    }) || ee.Image("users/montisgo69/Fina_2021/Clasificaciones/Clasificacion_LasColonias_Fina2021_Segunda_4x4_Reclasif"),
    image33 = ui.import && ui.import("image33", "image", {
      "id": "users/montisgo69/Fina_2021/Clasificaciones/Clasificacion_SanCristobal_Fina2021_Tercera_4x4_Reclasif"
    }) || ee.Image("users/montisgo69/Fina_2021/Clasificaciones/Clasificacion_SanCristobal_Fina2021_Tercera_4x4_Reclasif"),
    image34 = ui.import && ui.import("image34", "image", {
      "id": "users/montisgo69/Fina_2021/Clasificaciones/Clasificacion_SanJustol_Fina2021_Tercera_4x4_Reclasif"
    }) || ee.Image("users/montisgo69/Fina_2021/Clasificaciones/Clasificacion_SanJustol_Fina2021_Tercera_4x4_Reclasif"),
    image35 = ui.import && ui.import("image35", "image", {
      "id": "users/montisgo69/Fina_2021/Clasificaciones/Clasificacion_SDE_Rivadavia_Fina2021_Primera_4x4_Reclasif"
    }) || ee.Image("users/montisgo69/Fina_2021/Clasificaciones/Clasificacion_SDE_Rivadavia_Fina2021_Primera_4x4_Reclasif"),
    image36 = ui.import && ui.import("image36", "image", {
      "id": "users/montisgo69/Fina_2021/Clasificaciones/LP_Atreuco_Moda_4x4_Reclasif"
    }) || ee.Image("users/montisgo69/Fina_2021/Clasificaciones/LP_Atreuco_Moda_4x4_Reclasif"),
    image37 = ui.import && ui.import("image37", "image", {
      "id": "users/montisgo69/Fina_2021/Clasificaciones/LP_Capital_Moda_4x4_Reclasif"
    }) || ee.Image("users/montisgo69/Fina_2021/Clasificaciones/LP_Capital_Moda_4x4_Reclasif"),
    image38 = ui.import && ui.import("image38", "image", {
      "id": "users/montisgo69/Fina_2021/Clasificaciones/LP_Catrilo_Moda_4x4_Reclasif"
    }) || ee.Image("users/montisgo69/Fina_2021/Clasificaciones/LP_Catrilo_Moda_4x4_Reclasif"),
    image39 = ui.import && ui.import("image39", "image", {
      "id": "users/montisgo69/Fina_2021/Clasificaciones/LP_Guatrache_Moda_4x4_Reclasif"
    }) || ee.Image("users/montisgo69/Fina_2021/Clasificaciones/LP_Guatrache_Moda_4x4_Reclasif"),
    image40 = ui.import && ui.import("image40", "image", {
      "id": "users/montisgo69/Fina_2021/Clasificaciones/LP_Hucal_Moda_4x4_Reclasif"
    }) || ee.Image("users/montisgo69/Fina_2021/Clasificaciones/LP_Hucal_Moda_4x4_Reclasif"),
    image41 = ui.import && ui.import("image41", "image", {
      "id": "users/montisgo69/Fina_2021/Clasificaciones/LP_Toay_Moda_4x4_Reclasif"
    }) || ee.Image("users/montisgo69/Fina_2021/Clasificaciones/LP_Toay_Moda_4x4_Reclasif"),
    image42 = ui.import && ui.import("image42", "image", {
      "id": "users/montisgo69/Fina_2021/Clasificaciones/LP_Utracan_Moda_4x4_Reclasif"
    }) || ee.Image("users/montisgo69/Fina_2021/Clasificaciones/LP_Utracan_Moda_4x4_Reclasif"),
    image44 = ui.import && ui.import("image44", "image", {
      "id": "users/estimacionesmagyp/edu_rosario_SantaFe"
    }) || ee.Image("users/estimacionesmagyp/edu_rosario_SantaFe"),
    imageX = ui.import && ui.import("imageX", "image", {
      "id": "users/magaparzanese/CLASIFICACIONES_FINA2020/TRENQUELAUQUEN_CLASSIFICATION_F2020"
    }) || ee.Image("users/magaparzanese/CLASIFICACIONES_FINA2020/TRENQUELAUQUEN_CLASSIFICATION_F2020"),
    image52 = ui.import && ui.import("image52", "image", {
      "id": "users/estimacionesmagyp/delegacion_pergamino"
    }) || ee.Image("users/estimacionesmagyp/delegacion_pergamino"),
    image53 = ui.import && ui.import("image53", "image", {
      "id": "users/estimacionesmagyp/Fina2021/OesteSanJusto"
    }) || ee.Image("users/estimacionesmagyp/Fina2021/OesteSanJusto"),
    image50 = ui.import && ui.import("image50", "image", {
      "id": "users/estimacionesmagyp/Fina2021/Laboulaye"
    }) || ee.Image("users/estimacionesmagyp/Fina2021/Laboulaye"),
    image49 = ui.import && ui.import("image49", "image", {
      "id": "users/estimacionesmagyp/Fina2021/RioCuarto"
    }) || ee.Image("users/estimacionesmagyp/Fina2021/RioCuarto"),
    image30 = ui.import && ui.import("image30", "image", {
      "id": "users/estimacionesmagyp/Fina2021/Salliquelo"
    }) || ee.Image("users/estimacionesmagyp/Fina2021/Salliquelo"),
    image43 = ui.import && ui.import("image43", "image", {
      "id": "users/estimacionesmagyp/Fina2021/Rosario"
    }) || ee.Image("users/estimacionesmagyp/Fina2021/Rosario"),
    image27 = ui.import && ui.import("image27", "image", {
      "id": "users/ariasfernando09/Clasif_RestoVMaria2"
    }) || ee.Image("users/ariasfernando09/Clasif_RestoVMaria2"),
    image45 = ui.import && ui.import("image45", "image", {
      "id": "users/estimacionesmagyp/Fina2021/CanadaGomez"
    }) || ee.Image("users/estimacionesmagyp/Fina2021/CanadaGomez"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/estimacionesmagyp/lagos"
    }) || ee.FeatureCollection("users/estimacionesmagyp/lagos");
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
Map.setCenter(-60.49400, -34.30549, 5);
var l8 = ee.ImageCollection("COPERNICUS/S2_SR")
        .filterDate('2020-05-01', '2021-01-30')
        .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 2));
    var ndvi = l8.map(function(image) {
      return image.select().addBands(image.normalizedDifference(['B8','B4']));});
    var panel = ui.Panel();
    panel.style().set('width', '300px');
    var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'200px',height:'60px'}});
        panel.add(branding);
    var intro = ui.Panel([
      ui.Label({value: 'NDVI Campaña 20/21',
        style: {fontSize: '20px', fontWeight: 'bold'}  }),
      ui.Label('Realice un click sobre un lote.')]);
    panel.add(intro);
    var lat = ui.Label();
    var lon = ui.Label();
    panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
    Map.onClick(function(coords) {
      lat.setValue('lat: ' + coords.lat.toFixed(5)),
      lon.setValue('lon: ' + coords.lon.toFixed(5));
      var point = ee.Geometry.Point(coords.lon, coords.lat);
      var dot = ui.Map.Layer(point, {color: 'FF0000'});
      Map.layers().set(1, dot);
      var ndviChart = ui.Chart.image.series(ndvi, point, ee.Reducer.mean(), 500);
      ndviChart.setOptions({
        title: 'NDVI Serie de Tiempo',vAxis: {title: 'NDVI'},
        hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
      });  panel.widgets().set(2, ndviChart);});
    Map.style().set('cursor', 'crosshair')
    ui.root.insert(0, panel);
//////////////////////////////////////////////////////////////////////////////////
//CLASIFICACIONES POR DEPTO FINA2020
var paletamonti =['#BFBF77','#A57000','#E9FFBF','#92CC92', '#7EB1B2'];
Map.addLayer(image29, {min: 1, max: 5, palette: paletamonti}, '9 DE JULIO', false); 
Map.addLayer(image28, {min: 1, max: 5, palette: paletamonti}, 'CASTELLANOS', false); 
Map.addLayer(image32, {min: 1, max: 5, palette: paletamonti}, 'LAS COLONIAS', false); 
var img33Masked = image33.updateMask(image33.gt(5));
Map.addLayer(img33Masked, {min: 1, max: 5, palette: paletamonti}, 'SAN CRISTOBAL', false);
Map.addLayer(image34, {min: 1, max: 5, palette: paletamonti}, 'SAN JUSTO', false); 
Map.addLayer(image35, {min: 1, max: 5, palette: paletamonti}, 'RIVADAVIA SDE', false); 
//Map.addLayer(image36, {min: 1, max: 5, palette: paletamonti}, 'ATREUCO', false); 
Map.addLayer(image37, {min: 1, max: 5, palette: paletamonti}, 'CAPITAL LP', false); 
Map.addLayer(image38, {min: 1, max: 5, palette: paletamonti}, 'CATRILO', false); 
//Map.addLayer(image39, {min: 1, max: 5, palette: paletamonti}, 'GUATRACHE', false); 
//Map.addLayer(image40, {min: 1, max: 5, palette: paletamonti}, 'HUCAL', false); 
Map.addLayer(image41, {min: 1, max: 5, palette: paletamonti}, 'TOAY', false); 
Map.addLayer(image42, {min: 1, max: 5, palette: paletamonti}, 'UTRACAN', false); 
var paletariocuarto =['#BFBF77','#a57000','#e9ffbf','#c49c6c','#7eb1b2','#92CC92'];
Map.addLayer(image49, {min: 1, max: 6, palette: paletariocuarto}, 'RIO CUARTO', false); 
var paletalaboulaye =['#BFBF77','#a57000','#e9ffbf','#c49c6c','#7eb1b2','#92CC92'];
Map.addLayer(image50, {min: 1, max: 6, palette: paletalaboulaye}, 'LABOULAYE', false); 
var paletaestesanjusto =['#BFBF77','#A57000','#E9FFBF','#c49c6c','#a40000','#92cc92'];
Map.addLayer(image53, {min: 1, max: 6, palette: paletaestesanjusto}, 'SAN FRANCISCO', false); 
//var paletaVM =['#BFBF77','#C49C6C','#A57000','#E9FFBF','#92cc92'];
//Map.addLayer(image27, {min: 1, max: 5, palette: paletaVM}, 'DELEGACION VILLA MARIA', false); 
var paletalincoln =['#A57000','#A57000','#A40000','#D1FF00','#E9FFBF','#C49C6C','#BFBF77', '#BFBF77', '#A57000', '#E9FFBF','#E9FFBF','#92CC92', '#7EB1B2', '#A57000'];
Map.addLayer(image26, {min: 1, max: 14, palette: paletalincoln}, 'LINCOLN', false); 
var paletasalliquelo =['#A57000','#A57000','#A40000','#D1FF00','#E9FFBF','#C49C6C','#BFBF77', '#e9ffbf', '#e9ffbf', '#bfbf77','#7eb1b2','#92cc92'];
Map.addLayer(image30, {min: 1, max: 12, palette: paletasalliquelo}, 'DELEGACIÓN SALLIQUELO', false); 
var paletacañada =['#BFBF77','#A57000','#e9ffbf','#d1ff00','#a40000','#ff6766','#BFBF77', '#b17eff', '#e9ffbf', '#bfbf77','#7eb1b2','#92cc92'];
Map.addLayer(image45, {min: 1, max: 12, palette: paletacañada}, 'CAÑADA DE GOMEZ', false); 
var paletarosario =['#A57000','#A57000','#A40000', '#A40000', '#bfbf77','#E9FFBF', '#bfbf77', '#e9ffbf', '#e9ffbf', '#FFFF00', '#7eb1b2','#92cc92'];
Map.addLayer(image43, {min: 1, max: 12, palette: paletarosario}, 'ROSARIO', false); 
var paletasatrenque =['#A57000','#A57000','#A57000','#bfbf77', '#bfbf77','#bfbf77','#BFBF77','#c49c6c','#e9ffbf','#E9FFBF', '#92CC92', '#7EB1B2'];
Map.addLayer(imageX, {min: 1, max: 12, palette: paletasatrenque}, 'TRENQUE LAUQUEN', false); 
var paletarojas =['#A57000','#A57000','#A57000','#BFBF77','#BFBF77','#E9FFBF','#E9FFBF','#BFBF77', '#A40000', '#C49C6C', '#92CC92', '#7EB1B2'];
Map.addLayer(image, {min: 1, max: 12, palette: paletarojas}, 'ROJAS', false); 
var paleta33 =['#A57000','#A57000','#A57000','#BFBF77','#BFBF77','#E9FFBF','#E9FFBF','#92CC92', '#A40000', '#D1FF00', '#7EB1B2', '#BFBF77'];
Map.addLayer(image7, {min: 1, max: 12, palette: paleta33}, 'CHACABUCO', false);
// Create and define visualization parameters and display CARMEN DE ARECO
var paleta2 =['#A57000','#A57000','#BFBF77','#BFBF77','#E9FFBF','#E9FFBF', '#92CC92', '#7EB1B2','#A40000' ];
Map.addLayer(image3, {min: 1, max: 9, palette: paleta2}, 'CARMEN DE ARECO', false);
var paleta6 =['#A57000','#A57000','#A57000','#BFBF77','#BFBF77','#E9FFBF','#E9FFBF','#92CC92','#7EB1B2','#BFBF77', '#BFBF77'];
Map.addLayer(image4, {min: 1, max: 11, palette: paleta6}, 'GENERAL ARENALES', false);
var paleta4 =['#A57000','#A57000','#BFBF77','#BFBF77','#E9FFBF','#E9FFBF', '#92CC92', '#7EB1B2'];
Map.addLayer(image5, {min: 1, max: 8, palette: paleta4}, 'SAN ANDRÉS DE GILES', false);
// Create and define visualization parameters and display JUNÍN
var paleta5 =['#A57000','#A57000', '#A57000','#BFBF77','#BFBF77','#E9FFBF','#E9FFBF','#92CC92', '#7EB1B2','#A40000'];
var img6Masked = image6.updateMask(image6.gt(0));
Map.addLayer(img6Masked, {min: 1, max: 10, palette: paleta5}, 'JUNÍN', false);
var paletacol =['#A57000','#A57000','#A40000', '#BFBF77','#BFBF77','#E9FFBF','#E9FFBF','#BFBF77','#92CC92', '#7EB1B2'];
Map.addLayer(image8, {min: 1, max: 10, palette: paletacol}, 'COLON', false);  
var paletaper =['#A57000','#A57000','#BFBF77','#BFBF77','#E9FFBF','#E9FFBF','#BFBF77', '#A40000', '#C49C6C', '#92CC92', '#7EB1B2','#FF6766'];
Map.addLayer(image9, {min: 1, max: 12, palette: paletaper}, 'PERGAMINO', false);   
var paletaram =['#A57000','#A40000','#BFBF77','#BFBF77','#BFBF77','#E9FFBF', '#E9FFBF', '#92CC92', '#7EB1B2'];
Map.addLayer(image11, {min: 1, max: 9, palette: paletaram}, 'RAMALLO', false);       
var paletaarre =['#A57000','#A57000','#A57000','#BFBF77','#BFBF77','#E9FFBF','#BFBF77', '#A40000', '#C49C6C', '#92CC92', '#7EB1B2','#FFFF00'];
Map.addLayer(image10, {min: 1, max: 12, palette: paletaarre}, 'ARRECIFES', false);              
var paletasalto =['#A57000','#A57000','#BFBF77','#BFBF77','#E9FFBF','#E9FFBF','#BFBF77','#A40000','#C49C6C', '#92CC92','#7EB1B2'];
Map.addLayer(image12, {min: 1, max: 11, palette: paletasalto}, 'SALTO', false);
var paletabr =['#A57000','#A57000','#A57000','#BFBF77','#BFBF77','#E9FFBF','#E9FFBF','#BFBF77','#C49C6C', '#92CC92', '#7EB1B2'];
Map.addLayer(image13, {min: 1, max: 11, palette: paletabr}, 'BRAGADO', false);   
var paletamulti =['#A57000','#A57000','#A57000','#BFBF77','#BFBF77','#E9FFBF','#E9FFBF','#BFBF77','#A40000','#D1FF00','#C49C6C','#92CC92','#7EB1B2'];
Map.addLayer(image14, {min: 1, max: 13, palette: paletamulti}, 'BARADERO, SAN PEDRO, CAP. SARMIENTO', false); 
 var paletarosales =['#A57000','#A57000','#A57000','#BFBF77','#E9FFBF','#E9FFBF', '#C49C6C', '#C49C6C', '#A57000','#7EB1B2'];
Map.addLayer(image15, {min: 1, max: 10, palette: paletarosales}, 'GOBERNADOR ROSALES', false);  
var paletabahia =['#A57000','#A57000','#A57000','#BFBF77','#E9FFBF','#E9FFBF','#C49C6C', '#92CC92', '#7EB1B2'];
Map.addLayer(image16, {min: 1, max: 10, palette: paletabahia}, 'BAHÍA BLANCA', false); 
//var paletaVM =['#92CC92','#7EB1B2','#A57000','#E9FFBF','#A57000','#E9FFBF','#FFFF00','#EC2914','#C0C0C0','#800080','#BFBF77'];
//Map.addLayer(image17, {min: 1, max: 11, palette: paletaVM}, 'VILLA MARÍA'); 
var paletaSN =['#A57000','#A57000','#BFBF77','#BFBF77','#E9FFBF','#E9FFBF','#226F00','#A40000','#92CC92','#7EB1B2', '#BFBF77'];
Map.addLayer(image18, {min: 1, max: 11, palette: paletaSN}, 'SAN NICOLÁS', false); 
var paletaSAA =['#A57000','#A57000','#BFBF77','#BFBF77','#E9FFBF','#E9FFBF','#226F00','#A40000','#C49C6C','#92CC92','#7EB1B2'];
Map.addLayer(image2, {min: 1, max: 11, palette: paletaSAA}, 'SAN ANTONIO DE ARECO', false);   
var paletacastelli =['#A57000','#BFBF77','#BFBF77','#E9FFBF','#E9FFBF','#BFBF77','#E9FFBF','#92CC92','#BFBF77','#BFBF77','#D1FF00','#E9FFBF', '#BFBF77', '#BFBF77','#7EB1B2', '#E9FFBF'];
var img20Masked = image20.updateMask(image20.gt(0));
var img19Masked = image19.updateMask(image19.gt(0));
Map.addLayer(img20Masked, {min: 1, max: 16, palette: paletacastelli}, 'PILA, CASTELLI', false);   
var paletasuipa =['#A57000','#A57000','#A57000','#BFBF77','#BFBF77','#BFBF77','#BFBF77','#E9FFBF', '#E9FFBF', '#E9FFBF','#92CC92', '#7EB1B2'];
Map.addLayer(image22, {min: 1, max: 12, palette: paletasuipa}, 'SUIPACHA', false); 
var paletaSALADILLO =['#A57000','#A57000','#A57000','#BFBF77','#BFBF77','#BFBF77','#E9FFBF', '#E9FFBF', '#E9FFBF','#92CC92', '#7EB1B2'];
Map.addLayer(image21, {min: 1, max: 11, palette: paletaSALADILLO}, 'SALADILLO', false);              
var paletactejedor =['#A57000','#A57000','#A57000','#A57000', '#BFBF77','#BFBF77','#BFBF77','#BFBF77','#E9FFBF','#E9FFBF', '#92CC92', '#7EB1B2', '#BFBF77'];
Map.addLayer(image17, {min: 1, max: 13, palette: paletactejedor}, 'CARLOS TEJEDOR', false);               
var paletaalberti =['#A57000','#A57000','#A57000','#A57000', '#BFBF77','#A40000','#BFBF77','#BFBF77','#E9FFBF','#E9FFBF', '#92CC92', '#7EB1B2', '#BFBF77'];
Map.addLayer(image23, {min: 1, max: 13, palette: paletaalberti}, 'ALBERTI', false); 
var paletapehuajo =['#A57000','#A57000','#A57000','#A57000', '#BFBF77','#BFBF77','#BFBF77','#BFBF77','#E9FFBF','#E9FFBF', '#7EB1B2', '#BFBF77'];
Map.addLayer(image24, {min: 1, max: 13, palette: paletapehuajo}, 'PEHUAJO', false);               
var paletaVTUERTO =['#A57000','#A57000','#A57000', '#BFBF77','#BFBF77','#BFBF77','#BFBF77','#E9FFBF','#E9FFBF', '#BFBF77','#E9FFBF', '#7EB1B2', '#BFBF77'];
Map.addLayer(image25, {min: 1, max: 13, palette: paletaVTUERTO}, 'VENADO TUERTO', false); 
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with theb same number and width, display.
var outline = empty.paint({
  featureCollection: table8,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: 'black'}, 'Partidos');
// ejidos urbanos argentina
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: table,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: 'black'}, 'Deptos');
Map.addLayer(table2, {palette: '808080',}, 'Ejidos urbanos', false);
// Macizos forestales provincia de Buenos Aires
var fills = empty.paint({
  featureCollection: table9,
  color: 1,
});
Map.addLayer(fills, {palette:'92cc92' }, 'Macizos forestales', false);
// TITULO
var titleppal = ui.Panel({style: {position: 'top-center', padding: '8px 15px'}});
var loadingt = ui.Label('', {margin: '2px 0 4px 0'});
titleppal.add(loadingt);
var titlemapa = ui.Label('Mapa de cultivos - Campaña Fina 2020/2021 - V01', {fontWeight: 'bold', fontSize: '24px', color: 'black'});
titleppal.add(titlemapa);
Map.add(titleppal);
// Leyenda
var legend = ui.Panel({style: {position: 'bottom-right', padding: '8px 15px'}});
var loading = ui.Label('', {margin: '2px 0 4px 0'});
legend.add(loading);
var title = ui.Label('Referencias', {fontWeight: 'bold', fontSize: '20px', color: 'green'});
legend.add(title);
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
legend.add(makeRow('a57000', 'Cereales de Invierno'));
legend.add(makeRow('a40000', 'Legumbres'));
legend.add(makeRow('c49c6c', 'Cultivos de servicio'));
legend.add(makeRow('bfbf77', 'Barbechos'));
legend.add(makeRow('e9ffbf', 'Recursos Forrajeros'));
legend.add(makeRow('d1ff00', 'Colza'));
legend.add(makeRow('ff6766', 'Manzanilla'));
legend.add(makeRow('7eb1b2', 'Bajos'));
legend.add(makeRow('92cc92', 'Montes y macizos forestales'));
legend.add(makeRow('808080', 'Ejidos urbanos'));
legend.add(makeRow('FFFF00', 'Otros cultivos'));
Map.add(legend);
var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'150px',height:'50px'}});
        legend.add(branding);
var dires = ui.Label("Dirección de Estimaciones Agrícolas",{fontWeight: 'bold', fontSize: '15px', color: 'black'});
legend.add(dires);