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
    max: 8,
    min: 1,
    opacity: 1,
    palette: ["#ff0000","f19241","d3eb54","9fa720","37ff59","33b31c","108519","0f2fc8"]};  
///Importa la coleccion de imagenes MODIS y se define el subset temporal  
var PRP = ee.FeatureCollection("users/bagnato/InventariosVeg/PRP")
Map.setOptions("SATELLITE")
Map.setCenter(-59.95, -33.686, 6)
var MODIS = ee.ImageCollection('MODIS/006/MOD13Q1')
              .filterDate('2019-01-01', '2019-12-31')
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
var NDVImasked = MODIS.map(function(img){
  var mask = MaskCalidad(img)
  var NDVI = img.select(['NDVI'])
  var masked = NDVI.updateMask(mask)
  return masked.copyProperties(img, ['system:time_start', 'system:time_end'])
})
//--------------INTERPOLATION FUNCTION--------------------------
// interpola temporalmente los valores enmascardos por la banda de calidad
//-------------------------INTERPOLACION DE LA SERIE FILTRADA--------------------------//
var pkg_smooth = require('users/bagnato/publico:InterpoladorDDK');
var imgcol = NDVImasked // La colección a filtrar
var frame  = 16*3; // Ventana temporal para buscar valores sin filtrar para la interpolacion
var nodata = -9999; // missing values. It's crucial. Has to been given.
var imgcol_sm = pkg_smooth.linearInterp(imgcol, frame, nodata);
// Devuelve dos bandas por imagen, el valor de NDVI y si fue interpolado [band, qc];
// qc: 1 interpolacion lineal; 0 valor orginal sin interpolar;
//print('Coleccion Interpolada', imgcol_sm);
//print('Una imagen Interpolada', imgcol_sm.first())
//-----------------------------------------------------------------------------
var NDVI_I = imgcol_sm.select(['NDVI'])
//print('NDVI_Interpolated', NDVI_I);
//Map.addLayer(NDVI_I,{"bands":["NDVI"],"min":-1717,"max":8298}, 'Interpolada')
//////NDVI MENSUAL
// make a list with years
var years = ee.List.sequence(2019, 2019);
// make a list with months
var months = ee.List.sequence(1, 12);
//Calculo de NDVI por mes
var monthlyNDVI =  ee.ImageCollection.fromImages(
  years.map(function (y) {
    return months.map(function(m) {
      var w = NDVI_I.filter(ee.Filter.calendarRange(y, y, 'year'))
                    .filter(ee.Filter.calendarRange(m, m, 'month'))
                    .mean();
      return w.set('year', y)
              .set('month', m)
              .set('system:time_start', ee.Date.fromYMD(y, m, 1));
    });
  }).flatten()
);
//print(monthlyNDVI, "monthlyNDVI")
/*
min_sr = 1.089645805
max_sr = 11.11387038
    frfa = 0
    if ndviQi > 0.0429:
        sr = (1 + ndviQi) / (1 - ndviQi)
        frfa = (sr/(max_sr-min_sr))-(min_sr/(max_sr-min_sr))
    if frfa > 0.95: frfa = 0.95
*/
/// Compute the fPAR using an expression.
var fpar = monthlyNDVI.map(function(img){
    var NDVI_mask = (img.multiply(0.0001)).gt(0.0429)
    var NDVIf = (img.multiply(0.0001)).multiply(NDVI_mask)
    var sr = NDVIf.expression(
    '(1 + ndvi) / (1 - ndvi)', {
      'ndvi': NDVIf});
    var frfa = sr.expression(
    '(sr / (11.11387038 - 1.089645805))-(1.089645805 / (11.11387038 - 1.089645805))', {
      'sr': sr});
    var frfa_mask = frfa.lte(0.95)
    var frfa2 = frfa.multiply(frfa_mask)
    var frfa3 = frfa.gt(0.95).multiply(0.95).add(frfa2)
    return frfa3.copyProperties(img, ["month","system:index",'system:time_start', 'year'])  
});
//print(fpar, "fpar")
//Map.addLayer(fpar,null, 'fpar')
var fpar_image = fpar.toBands()
//print(fpar_image,"fpar_image")
/////////////////////////////////////////////
var radiacion_solar = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY")
                      .filterDate('2019-01-01', '2019-12-31')
                      .select("surface_solar_radiation_downwards")
///Compute RFAI
var RFAi = radiacion_solar.map(function(img){
    var radiacion_transf = img.multiply(0.000001).multiply(30.5).multiply(0.48) //pasar de J a MJ, multiplicar por horas del dia y pasar a RFA (0.48)
    return radiacion_transf.copyProperties(img, ["system:index"])  
});
//print(RFAi, "RFAi")
//Map.addLayer(RFAi,imageVisParam, 'RFAi');  
var RFAi_image = RFAi.toBands()
//print(RFAi_image,"RFAi_image")
//////////////////////////////////////////////
var landcover = ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V-C3/Global")
                .filterDate('2019-01-01', '2019-12-31')
                .select("discrete_classification").first()
//Map.addLayer(landcover.randomVisualizer(), {}, 'Land use ');
var pastizales_mask = landcover.eq(30)
var pastizales = landcover.updateMask(pastizales_mask).clip(PRP)
//print(pastizales, "pastizales")
Map.addLayer(pastizales,imageVisParam_pastizales,  'Pastizales RP');
//var arbustales_mask = landcover.eq(20)
//var arbustales = landcover.updateMask(arbustales_mask)
//print(arbustales, "arbustales")
//Map.addLayer(arbustales,imageVisParam_arbustales, 'arbustales');
////////////////////////////////////////////////
var RFAA = fpar_image.multiply(RFAi_image)
var PPNA_pastizales_mensual = RFAA.multiply(0.3233).add(0.5451).multiply(10)
//print(PPNA_pastizales_mensual,"PPNA_pastizales_mensual")
var PPNA_pastizales_anual = ee.ImageCollection.fromImages(
  [ee.Image(PPNA_pastizales_mensual.select(0).rename("ppna").set('month', 1)),
   ee.Image(PPNA_pastizales_mensual.select(1).rename("ppna").set('month', 2)),
   ee.Image(PPNA_pastizales_mensual.select(2).rename("ppna").set('month', 3)),
   ee.Image(PPNA_pastizales_mensual.select(3).rename("ppna").set('month', 4)),
   ee.Image(PPNA_pastizales_mensual.select(4).rename("ppna").set('month', 5)),
   ee.Image(PPNA_pastizales_mensual.select(5).rename("ppna").set('month', 6)),
   ee.Image(PPNA_pastizales_mensual.select(6).rename("ppna").set('month', 7)),
   ee.Image(PPNA_pastizales_mensual.select(7).rename("ppna").set('month', 8)),
   ee.Image(PPNA_pastizales_mensual.select(8).rename("ppna").set('month', 9)),
   ee.Image(PPNA_pastizales_mensual.select(9).rename("ppna").set('month', 10)),
   ee.Image(PPNA_pastizales_mensual.select(10).rename("ppna").set('month',11)),
   ee.Image(PPNA_pastizales_mensual.select(11).rename("ppna").set('month',12))]).sum().updateMask(pastizales_mask).clip(PRP)
//print(PPNA_pastizales_anual,"PPNA_pastizales_anual")   
Map.addLayer(PPNA_pastizales_anual,vis_PPNA, "PPNA kg/ha*año")
//var PPNA_arbustales_mensual = RFAA.multiply(0.3).multiply(10)
//print(PPNA_arbustales_mensual,"PPNA_arbustales_mensual")
/*
var PPNA_arbustales_anual = ee.ImageCollection.fromImages(
  [ee.Image(PPNA_arbustales_mensual.select(0).rename("ppna").set('month', 1)),
   ee.Image(PPNA_arbustales_mensual.select(1).rename("ppna").set('month', 2)),
   ee.Image(PPNA_arbustales_mensual.select(2).rename("ppna").set('month', 3)),
   ee.Image(PPNA_arbustales_mensual.select(3).rename("ppna").set('month', 4)),
   ee.Image(PPNA_arbustales_mensual.select(4).rename("ppna").set('month', 5)),
   ee.Image(PPNA_arbustales_mensual.select(5).rename("ppna").set('month', 6)),
   ee.Image(PPNA_arbustales_mensual.select(6).rename("ppna").set('month', 7)),
   ee.Image(PPNA_arbustales_mensual.select(7).rename("ppna").set('month', 8)),
   ee.Image(PPNA_arbustales_mensual.select(8).rename("ppna").set('month', 9)),
   ee.Image(PPNA_arbustales_mensual.select(9).rename("ppna").set('month', 10)),
   ee.Image(PPNA_arbustales_mensual.select(10).rename("ppna").set('month',11)),
   ee.Image(PPNA_arbustales_mensual.select(11).rename("ppna").set('month',12))]).sum().updateMask(arbustales_mask)
*/
//print(PPNA_arbustales_anual,"PPNA_arbustales_anual")   
//Map.addLayer(PPNA_arbustales_anual,null, "PPNA_arbustales_anual en kg/ha")
//FALTA FILTRAR POR VECTOR "RESOLVE ECOREGIONS 2017" POR BIOMAS
//se puede agarrar toda la serie modis y pedirle el promedio de ndvi mensual y calcular la ppna media
/////////////////////////////////
//Consumo
var consumo_pc = PPNA_pastizales_anual.expression(
    '-5.71 + (0.7154 * (PPNA**0.5))', {
      'PPNA': PPNA_pastizales_anual});
//print(consumo_pc, consumo_pc)
Map.addLayer(consumo_pc,vis_AHPPNA,"AHPPNA (%)")
var consumo = PPNA_pastizales_anual.multiply(consumo_pc.divide(100))
//print(consumo, consumo)
//Map.addLayer(consumo,null,"consumo")
///////////////////////////////////////
//Productividad secundaria
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
////////////////////////////////////////////////////////
var colors3 = ["ff0000","f19241","d3eb54","9fa720","37ff59","33b31c","108519","0f2fc8"];
var names3 = ["1-40",
             "41-60",
             "61-80",
             "81-100",
             "101-120",
             "121-140",
             "141-160",
             "161-180",
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