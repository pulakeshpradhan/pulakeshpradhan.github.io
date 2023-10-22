var imageVisParam_pastizales = ui.import && ui.import("imageVisParam_pastizales", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "discrete_classification"
        ],
        "min": 30,
        "max": 30,
        "palette": [
          "e4d62a"
        ]
      }
    }) || {"opacity":1,"bands":["discrete_classification"],"min":30,"max":30,"palette":["e4d62a"]};
var vis_PPNA = {
    max: 6000,
    min: 0,
    opacity: 1,
    palette: ["#ff0000","f19241","d3eb54","37ff59","33b31c","108519"]};
var vis_AHPPNA = {
    max: 60,
    min: 0,
    opacity: 1,
    palette: ["#ff0000","f19241","d3eb54","37ff59","33b31c","108519"]};    
var vis_PS = {
    max: 160,
    min: 1,
    opacity: 1,
    palette: ["#ff0000","f19241","d3eb54","9fa720","37ff59","33b31c","108519","0f2fc8"]};  
var vis_PS2 = {
    max: 180,
    min: 0,
    opacity: 1,
    palette: ["#ff0000","f19241","d3eb54","37ff59","33b31c","108519"]};      
///Importa la coleccion de imagenes MODIS y se define el subset temporal  
var PRP = ee.FeatureCollection("users/bagnato/InventariosVeg/PRP")
Map.addLayer(PRP,null, "PRP")
Map.setOptions("SATELLITE")
Map.setCenter(-59.95, -33.686, 6)
//Función de corte. Área rectangular
var corte = function (image){
  return image.clip(PRP);
}
var MODIS = ee.ImageCollection('MODIS/006/MOD13Q1')
              .filterDate('2001-01-01', '2020-12-31')
              .map(corte)
//print('Serie MODIS', MODIS)
//-------------------------------Filtro de Calidad--------------------------------------//
//El filtro esta seteado para enmascarar sombra, nieve-hielo, nubes, y aerosoles (acepta solo low)
//Funcion del filtro de calidad
var MaskCalidad = function(x){
  var Q = x.select(['DetailedQA'])
  var sombra = Q.bitwiseAnd(ee.Image.constant(32768))// genera una mascara con 0 y 32768
  var nieve_hielo = Q.bitwiseAnd(ee.Image.constant(16384))//genera una mascara con 0 y 16348
  var nube = Q.bitwiseAnd(ee.Image.constant(1024))//genera una mascara con 0 y 1024
  var aerosol = Q.bitwiseAnd(ee.Image.constant(192)).neq(64)//genera una mascara con 0, 64, 128 y 192. Y enmascara con valor 1 a todos los que no son 64 (aerosol:low)
  var filtro = sombra.add(nieve_hielo).add(nube).add(aerosol)// suma todas las mascaras 
  return filtro.lt(1) //genera la mascara final con los pixeles que pasaron el filtro
}
//funcion para enmascarar las imagenes de NDVI aplicnado el filtro de calidad
var EVImasked = MODIS.map(function(img){
  var mask = MaskCalidad(img)
  var EVI = img.select(['EVI'])
  var masked = EVI.updateMask(mask)
  return masked.copyProperties(img, ['system:time_start', 'system:time_end'])
})
//--------------INTERPOLATION FUNCTION--------------------------
// interpola temporalmente los valores enmascardos por la banda de calidad
//-------------------------INTERPOLACION DE LA SERIE FILTRADA--------------------------//
var pkg_smooth = require('users/bagnato/publico:InterpoladorDDK');
var imgcol = EVImasked // La colección a filtrar
var frame  = 16*3; // Ventana temporal para buscar valores sin filtrar para la interpolacion
var nodata = -9999; // missing values. It's crucial. Has to been given.
var imgcol_sm = pkg_smooth.linearInterp(imgcol, frame, nodata);
// Devuelve dos bandas por imagen, el valor de NDVI y si fue interpolado [band, qc];
// qc: 1 interpolacion lineal; 0 valor orginal sin interpolar;
//print('Coleccion Interpolada', imgcol_sm);
//print('Una imagen Interpolada', imgcol_sm.first())
//-----------------------------------------------------------------------------
var EVI_I = imgcol_sm.select(['EVI'])
//print('NDVI_Interpolated', NDVI_I);
//Map.addLayer(NDVI_I,{"bands":["NDVI"],"min":-1717,"max":8298}, 'Interpolada')
//////NDVI PROMEDIO MENSUAL
// make a list with months
var months = ee.List.sequence(1, 12);
var monthlyEVI = ee.ImageCollection.fromImages(
  months.map(function (m) {
    var w = EVI_I.filter(ee.Filter.calendarRange(m, m, 'month'))
                   .mean();
    return w.set('month', m)
}));
//print(monthlyEVI, "monthlyEVI")
/// Compute the fPAR using an expression.
var fpar = monthlyEVI.map(function(img){
    var EVI_div = img.multiply(0.0001)
    var frfa = EVI_div.expression(
    '((1.4914 * evi) - 0.1382)', {
      'evi': EVI_div});
    var frfa_mask1 = frfa.gt(0)
    var frfa2 = frfa.multiply(frfa_mask1)
    var frfa_mask2 = frfa2.lte(0.95)
    var frfa3 = frfa2.multiply(frfa_mask2)
    var frfa4 = frfa2.gt(0.95).multiply(0.95).add(frfa3)
    return frfa4.copyProperties(img, ["month","system:index",'system:time_start', 'year'])  
});
//print(fpar, "fpar")
//Map.addLayer(fpar,null, 'fpar')
var fpar_image = fpar.toBands()
//print(fpar_image,"fpar_image")
/////////////////////////////////////////////
var rad_solar = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY")
                      .filterDate('2001-01-01', '2020-12-31')
                      .select("surface_solar_radiation_downwards")
                      .map(corte)
var radiacion_solar = ee.ImageCollection.fromImages(
  months.map(function (m) {
    var w = rad_solar.filter(ee.Filter.calendarRange(m, m, 'month'))
                   .mean();
    return w.set('month', m)
}));   
print(radiacion_solar,"radiacion_solar")
/*
///Compute RFAI
var RFAi = radiacion_solar.map(function(img){
    var radiacion_transf = img.multiply(0.000001).multiply(30.5).multiply(0.48) //pasar de J a MJ, multiplicar por horas del dia y pasar a RFA (0.48)
    return radiacion_transf.copyProperties(img, ["system:index"])  
});
print(RFAi, "RFAi")
//Map.addLayer(RFAi,imageVisParam, 'RFAi');  
*/
var RFAi_img = radiacion_solar.toBands()
var RFAi_mensual = ee.ImageCollection.fromImages(
  [ee.Image(RFAi_img.select(0).multiply(0.00001488).rename("RFAi").set('month', 1)),
   ee.Image(RFAi_img.select(1).multiply(0.00001344).rename("RFAi").set('month', 2)),
   ee.Image(RFAi_img.select(2).multiply(0.00001488).rename("RFAi").set('month', 3)),
   ee.Image(RFAi_img.select(3).multiply(0.00001440).rename("RFAi").set('month', 4)),
   ee.Image(RFAi_img.select(4).multiply(0.00001488).rename("RFAi").set('month', 5)),
   ee.Image(RFAi_img.select(5).multiply(0.00001440).rename("RFAi").set('month', 6)),
   ee.Image(RFAi_img.select(6).multiply(0.00001488).rename("RFAi").set('month', 7)),
   ee.Image(RFAi_img.select(7).multiply(0.00001488).rename("RFAi").set('month', 8)),
   ee.Image(RFAi_img.select(8).multiply(0.00001440).rename("RFAi").set('month', 9)),
   ee.Image(RFAi_img.select(9).multiply(0.00001488).rename("RFAi").set('month', 10)),
   ee.Image(RFAi_img.select(10).multiply(0.00001440).rename("RFAi").set('month',11)),
   ee.Image(RFAi_img.select(11).multiply(0.00001488).rename("RFAi").set('month',12))])
var RFAi_image = RFAi_mensual.toBands()
print(RFAi_image,"RFAi_image")
//////////////////////////Clasificaciones de usos del suelo////////////////////////
/////ESA
var ESA = ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V-C3/Global")
                .filterDate('2019-01-01', '2019-12-31')
                .select("discrete_classification").first().clip(PRP)
//Map.addLayer(ESA.randomVisualizer(), {}, 'Land use ESA');
var ESA_pastizal_mask = ESA.eq(30)
var ESA_pastizales = ESA.updateMask(ESA_pastizal_mask)
//Map.addLayer(ESA_pastizales,imageVisParam_pastizales,'ESA_pastizales');
var ESA_humedal_mask = ESA.eq(90)
var ESA_humedales = ESA.updateMask(ESA_humedal_mask)
//Map.addLayer(ESA_humedales,null,'ESA_Humedales');
var ESA_arbustal_mask = ESA.eq(20)
var ESA_arbustales = ESA.updateMask(ESA_arbustal_mask)
//Map.addLayer(ESA_arbustales,null,'ESA_arbustales');
var ESA_sabana_mask = ESA.gte(121).and(ESA.lte(126))
var ESA_sabanas = ESA.updateMask(ESA_sabana_mask)
//Map.addLayer(ESA_sabanas,null,'ESA_sabanas');
var ESA_mascara = ESA_pastizal_mask.add(ESA_humedal_mask).add(ESA_arbustal_mask).add(ESA_sabana_mask)
/////Mapbiomas
var MapbiomasPampa  =  ee.Image('projects/MapBiomas_Pampa/public/collection1/mapbiomas_pampa_collection1_integration_v1')
                       .select(19).clip(PRP)
/*
var palettes = require('users/mapbiomas/modules:Palettes.js');
var pal = palettes.get('classification2');
var vis = {
      //bands: 'classification_2018',
      min:0,
      max:34,
      palette: pal,
      format: 'png'
    };
Map.addLayer(MapbiomasPampa.select('classification_' + año), vis, "MapbiomasPampa_"+año)
*/
var MB_pastizal = MapbiomasPampa.eq(12)
var MB_pastizales = MapbiomasPampa.updateMask(MB_pastizal)
//Map.addLayer(MB_pastizales, null, "MapBiomas_pastizales")
var MB_humedal = MapbiomasPampa.eq(11)
var MB_humedales = MapbiomasPampa.updateMask(MB_humedal)
//Map.addLayer(MB_humedales, null, "MB_humedales")
var MB_sabana = MapbiomasPampa.eq(4)
var MB_sabanas = MapbiomasPampa.updateMask(MB_sabana)
//Map.addLayer(MB_sabanas, null, "MB_sabanas")
var MB_mascara = MB_pastizal.add(MB_humedal).add(MB_sabana)
/////Baeza&Paruelo(2020)
var baeza = ee.Image("users/pbaldass/RPG_aa1213_BaezaParuelo").clip(PRP)
var Baeza_RF_mask = baeza.eq(1)
var Baeza_RF = baeza.updateMask(Baeza_RF_mask)
//Map.addLayer(Baeza_RF, null, "RF_Baeza%Paruelo")
////////////////////////////////////////////////
//Cálculo PPNA
var RFAA_mensual = fpar_image.multiply(RFAi_image)
var RFAA_anual = ee.ImageCollection.fromImages(
  [ee.Image(RFAA_mensual.select(0).rename("rfaa").set('month', 1)),
   ee.Image(RFAA_mensual.select(1).rename("rfaa").set('month', 2)),
   ee.Image(RFAA_mensual.select(2).rename("rfaa").set('month', 3)),
   ee.Image(RFAA_mensual.select(3).rename("rfaa").set('month', 4)),
   ee.Image(RFAA_mensual.select(4).rename("rfaa").set('month', 5)),
   ee.Image(RFAA_mensual.select(5).rename("rfaa").set('month', 6)),
   ee.Image(RFAA_mensual.select(6).rename("rfaa").set('month', 7)),
   ee.Image(RFAA_mensual.select(7).rename("rfaa").set('month', 8)),
   ee.Image(RFAA_mensual.select(8).rename("rfaa").set('month', 9)),
   ee.Image(RFAA_mensual.select(9).rename("rfaa").set('month', 10)),
   ee.Image(RFAA_mensual.select(10).rename("rfaa").set('month',11)),
   ee.Image(RFAA_mensual.select(11).rename("rfaa").set('month',12))]).sum().multiply(10)
var PPNA_ESA_pastizal = RFAA_anual.multiply(0.313).multiply(ESA_pastizal_mask)
var PPNA_ESA_humedal = RFAA_anual.multiply(0.7).multiply(ESA_humedal_mask)
var PPNA_ESA_arbustal = RFAA_anual.multiply(0.3).multiply(ESA_arbustal_mask)
var PPNA_ESA_sabana = RFAA_anual.multiply(0.313).multiply(ESA_sabana_mask)
var PPNA_ESA = (PPNA_ESA_pastizal.add(PPNA_ESA_humedal).add(PPNA_ESA_arbustal).add(PPNA_ESA_sabana)).updateMask(ESA_mascara)
Map.addLayer(PPNA_ESA,vis_PPNA, "PPNA (kg/ha*año)-ESA")
var PPNA_MB_pastizal = RFAA_anual.multiply(0.313).multiply(MB_pastizal)
var PPNA_MB_humedal = RFAA_anual.multiply(0.7).multiply(MB_humedal)
var PPNA_MB_sabana = RFAA_anual.multiply(0.313).multiply(MB_sabana)
var PPNA_MB = (PPNA_MB_pastizal.add(PPNA_MB_humedal).add(PPNA_MB_sabana)).updateMask(MB_mascara)
//Map.addLayer(PPNA_MB,vis_PPNA, "PPNA (kg/ha*año)-MapBiomas")
var PPNA_Baeza = RFAA_anual.multiply(0.313).updateMask(Baeza_RF)
//Map.addLayer(PPNA_Baeza,vis_PPNA, "PPNA (kg/ha*año)-Baeza&Paruelo")
///////////////////////////////////////
//Productividad secundaria - Estimaciones
//1) ESA-Irisarri
//Compute the PNS using an expression.
var PNS_ESA_Irisarri = PPNA_ESA.expression(
    '0.0001 * (PPNA_ESA**1.6184)', {
    'PPNA_ESA': PPNA_ESA.select("rfaa")})
Map.addLayer(PNS_ESA_Irisarri, vis_PS, "PNS_ESA_Irisarri" )
//2) MB-Irisarri
var PNS_MB_Irisarri = PPNA_MB.expression(
    '0.0001 * (PPNA_MB**1.6184)', {
    'PPNA_MB': PPNA_MB.select("rfaa")})
Map.addLayer(PNS_MB_Irisarri, vis_PS, "PNS_MB_Irisarri" )
//3) Beaza-Irisarri
var PNS_Baeza_Irisarri = PPNA_Baeza.expression(
    '0.0001 * (PPNA_Baeza**1.6184)', {
    'PPNA_Baeza': PPNA_Baeza.select("rfaa")})
Map.addLayer(PNS_Baeza_Irisarri, vis_PS, "PNS_Baeza_Irisarri" )
/*
var grilla = ee.FeatureCollection("users/c1redduy/ROI_UY");
var grilla_unida = grilla.union();
var PNS_promedio_Uruguay_ESA = PNS_ESA_Irisarri.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: grilla_unida,
  scale: 250,
  crs: "EPSG:4326",
  maxPixels: 1e16,
  bestEffort: true,
});
print(PNS_promedio_Uruguay_ESA,"PNS_promedio_Uruguay_ESA")
var PNS_promedio_Uruguay_MB = PNS_MB_Irisarri.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: grilla_unida,
  scale: 250,
  crs: "EPSG:4326",
  maxPixels: 1e16,
  bestEffort: true,
});
print(PNS_promedio_Uruguay_MB,"PNS_promedio_Uruguay_MB")
var PNS_promedio_Uruguay_Baeza = PNS_Baeza_Irisarri.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: grilla_unida,
  scale: 250,
  crs: "EPSG:4326",
  maxPixels: 1e16,
  bestEffort: true,
});
print(PNS_promedio_Uruguay_Baeza,"PNS_promedio_Uruguay_Baeza")
var prod_secundaria = consumo.expression(
    '0.02164 * (consumo * 0.7 * 4.4 * 0.82)', {
      'consumo': consumo});
//print(prod_secundaria, prod_secundaria)
//Map.addLayer(prod_secundaria,vis_PS,"Prod_secundaria")
var prod_secundaria_rangos = prod_secundaria.expression(
    "(b('constant') < 40) ? 1" +
      ": (b('constant') < 60) ? 2" +
        ": (b('constant') < 80) ? 3" +
          ": (b('constant') < 100) ? 4" +
            ": (b('constant') < 120) ? 5" +
              ": (b('constant') < 140) ? 6" +
                ": (b('constant') < 160) ? 7" +
                  ": (b('constant') > 160) ? 8" +
                ": 0"
);
var mascara = prod_secundaria_rangos.gt(0)
var prod_sec_final = prod_secundaria_rangos.updateMask(mascara)
Map.addLayer(prod_sec_final,vis_PS,"Prod_secundaria")
*/
//////////////////////LEYENDA///////////////////////////////  
var colors = ["ff0000","f19241","d3eb54","37ff59","33b31c","108519"];
var names = ["1-1000",
             "1001-2000",
             "2001-3000",
             "3001-4000",
             "4001-5000",
             "5001-6000",
            ];
var legend = ui.Panel({
  style: {
    position: 'top-right',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'PPNA (kg/ha*año)',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
// var loading = ui.Label('Legend:', {margin: '2px 0 4px 0'});
// legend.add(loading);
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
for (var i = 0; i < names.length; i++){
legend.add(makeRow(colors[i], names[i]));
}
Map.add(legend)
////////////////////////////////////////////////////////
/*
var names2 = ["1-10",
             "11-20",
             "21-30",
             "31-40",
             "41-50",
             "51-60",
            ];
var legend2 = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle2 = ui.Label({
  value: 'AHPPNA(%)',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend2.add(legendTitle2);
var makeRow2 = function(color, name) {
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
  var description2 = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description2],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
for (var i = 0; i < names2.length; i++){
legend2.add(makeRow2(colors[i], names2[i]));
}
Map.add(legend2)
*/
////////////////////////////////////////////////////////
var colors3 = ["ff0000","f19241","d3eb54","9fa720","37ff59","33b31c","108519","0f2fc8"];
var names3 = ["1-20",
             "21-40",
             "41-60",
             "61-90",
             "81-100",
             "101-120",
             "121-140",
             "141-160",
            ];
var legend3 = ui.Panel({
  style: {
    position: 'middle-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle3 = ui.Label({
  value: 'Prod. secundaria (Kg/ha*año)',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend3.add(legendTitle3);
var makeRow3 = function(color, name) {
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
  var description3 = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description3],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
for (var i = 0; i < names3.length; i++){
legend3.add(makeRow3(colors3[i], names3[i]));
}
Map.add(legend3)