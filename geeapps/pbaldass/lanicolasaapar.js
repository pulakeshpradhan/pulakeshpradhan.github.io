var imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "rfaa"
        ],
        "min": 0.3463690854567627,
        "max": 1796.6750314725653,
        "palette": [
          "417bff",
          "66f1ff",
          "fdff74",
          "d0ff12",
          "26ff0c",
          "15a72d",
          "ff9e58",
          "ff0000"
        ]
      }
    }) || {"opacity":1,"bands":["rfaa"],"min":0.3463690854567627,"max":1796.6750314725653,"palette":["417bff","66f1ff","fdff74","d0ff12","26ff0c","15a72d","ff9e58","ff0000"]},
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "rfaa"
        ],
        "max": 1800,
        "palette": [
          "417bff",
          "66f1ff",
          "fdff74",
          "d0ff12",
          "26ff0c",
          "15a72d",
          "ff9e58",
          "ff0000",
          "950000"
        ]
      }
    }) || {"opacity":1,"bands":["rfaa"],"max":1800,"palette":["417bff","66f1ff","fdff74","d0ff12","26ff0c","15a72d","ff9e58","ff0000","950000"]};
var Lanico = ee.FeatureCollection("users/pbaldass/LaNicolasa")
Map.setOptions("SATELLITE")
Map.setCenter(-65.96, -38.85, 10)
var blank = ee.Image(0).mask(0);
var outline = blank.paint(Lanico, 'AA0000', 2); 
var visPar = {'palette':'#ff0000','opacity': 0.6};
Map.addLayer(outline, visPar, "La Nicolasa", true);
var buff = function(shape){
  var buff = shape.buffer(800)
  return buff
}
var area = Lanico.map(buff).union()
//Map.addLayer(area, null, "La Nicolasa_area", true);
//Función de corte. Área rectangular
var corte = function (image){
  return image.clip(area);
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
//RFAi
var rad_solar = ee.ImageCollection("ECMWF/ERA5_LAND/MONTHLY")
                      .filterDate('2001-01-01', '2020-12-31')
                      .select("surface_solar_radiation_downwards")
                      .map(corte)
////////APAR PREMANEJO
var pre_manejo = EVI_I.filterDate('2001-01-01', '2011-12-31')
//////NDVI PROMEDIO MENSUAL
// make a list with months
var months = ee.List.sequence(1, 12);
var monthlyEVIpre = ee.ImageCollection.fromImages(
  months.map(function (m) {
    var w = pre_manejo.filter(ee.Filter.calendarRange(m, m, 'month'))
                   .mean();
    return w.set('month', m)
}));
/// Compute the fPAR using an expression.
var fpar_pre = monthlyEVIpre.map(function(img){
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
var fpar_pre_image = fpar_pre.toBands()
//print(fpar_image,"fpar_image")
/////////////////////////////////////////////
var rad_solar_pre = rad_solar.filterDate('2001-01-01', '2011-12-31')
var radiacion_solar_pre = ee.ImageCollection.fromImages(
  months.map(function (m) {
    var w = rad_solar_pre.filter(ee.Filter.calendarRange(m, m, 'month'))
                   .mean();
    return w.set('month', m)
}));   
print(radiacion_solar_pre,"radiacion_solar_pre")
var RFAi_pre_img = radiacion_solar_pre.toBands()
var RFAi_mensual_pre = ee.ImageCollection.fromImages(
  [ee.Image(RFAi_pre_img.select(0).multiply(0.00001488).rename("RFAi").set('month', 1)),
   ee.Image(RFAi_pre_img.select(1).multiply(0.00001344).rename("RFAi").set('month', 2)),
   ee.Image(RFAi_pre_img.select(2).multiply(0.00001488).rename("RFAi").set('month', 3)),
   ee.Image(RFAi_pre_img.select(3).multiply(0.00001440).rename("RFAi").set('month', 4)),
   ee.Image(RFAi_pre_img.select(4).multiply(0.00001488).rename("RFAi").set('month', 5)),
   ee.Image(RFAi_pre_img.select(5).multiply(0.00001440).rename("RFAi").set('month', 6)),
   ee.Image(RFAi_pre_img.select(6).multiply(0.00001488).rename("RFAi").set('month', 7)),
   ee.Image(RFAi_pre_img.select(7).multiply(0.00001488).rename("RFAi").set('month', 8)),
   ee.Image(RFAi_pre_img.select(8).multiply(0.00001440).rename("RFAi").set('month', 9)),
   ee.Image(RFAi_pre_img.select(9).multiply(0.00001488).rename("RFAi").set('month', 10)),
   ee.Image(RFAi_pre_img.select(10).multiply(0.00001440).rename("RFAi").set('month',11)),
   ee.Image(RFAi_pre_img.select(11).multiply(0.00001488).rename("RFAi").set('month',12))])
var RFAi_pre_image = RFAi_mensual_pre.toBands()
print(RFAi_pre_image,"RFAi_image")
var RFAA_pre_mensual = fpar_pre_image.multiply(RFAi_pre_image)
var RFAA_pre_anual = ee.ImageCollection.fromImages(
  [ee.Image(RFAA_pre_mensual.select(0).rename("rfaa").set('month', 1)),
   ee.Image(RFAA_pre_mensual.select(1).rename("rfaa").set('month', 2)),
   ee.Image(RFAA_pre_mensual.select(2).rename("rfaa").set('month', 3)),
   ee.Image(RFAA_pre_mensual.select(3).rename("rfaa").set('month', 4)),
   ee.Image(RFAA_pre_mensual.select(4).rename("rfaa").set('month', 5)),
   ee.Image(RFAA_pre_mensual.select(5).rename("rfaa").set('month', 6)),
   ee.Image(RFAA_pre_mensual.select(6).rename("rfaa").set('month', 7)),
   ee.Image(RFAA_pre_mensual.select(7).rename("rfaa").set('month', 8)),
   ee.Image(RFAA_pre_mensual.select(8).rename("rfaa").set('month', 9)),
   ee.Image(RFAA_pre_mensual.select(9).rename("rfaa").set('month', 10)),
   ee.Image(RFAA_pre_mensual.select(10).rename("rfaa").set('month',11)),
   ee.Image(RFAA_pre_mensual.select(11).rename("rfaa").set('month',12))]).sum()
Map.addLayer(RFAA_pre_anual, imageVisParam, "APAR pre_manejo")   
////////APAR POSTMANEJO
var post_manejo = EVI_I.filterDate('2013-01-01', '2020-12-31')
//////NDVI PROMEDIO MENSUAL
// make a list with months
var monthlyEVIpost = ee.ImageCollection.fromImages(
  months.map(function (m) {
    var w = post_manejo.filter(ee.Filter.calendarRange(m, m, 'month'))
                   .mean();
    return w.set('month', m)
}));
/// Compute the fPAR using an expression.
var fpar_post = monthlyEVIpost.map(function(img){
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
var fpar_post_image = fpar_post.toBands()
//print(fpar_image,"fpar_image")
/////////////////////////////////////////////
var rad_solar_post = rad_solar.filterDate('2013-01-01', '2020-12-31')
var radiacion_solar_post = ee.ImageCollection.fromImages(
  months.map(function (m) {
    var w = rad_solar_post.filter(ee.Filter.calendarRange(m, m, 'month'))
                   .mean();
    return w.set('month', m)
}));   
print(radiacion_solar_post,"radiacion_solar_post")
var RFAi_post_img = radiacion_solar_post.toBands()
var RFAi_mensual_post = ee.ImageCollection.fromImages(
  [ee.Image(RFAi_post_img.select(0).multiply(0.00001488).rename("RFAi").set('month', 1)),
   ee.Image(RFAi_post_img.select(1).multiply(0.00001344).rename("RFAi").set('month', 2)),
   ee.Image(RFAi_post_img.select(2).multiply(0.00001488).rename("RFAi").set('month', 3)),
   ee.Image(RFAi_post_img.select(3).multiply(0.00001440).rename("RFAi").set('month', 4)),
   ee.Image(RFAi_post_img.select(4).multiply(0.00001488).rename("RFAi").set('month', 5)),
   ee.Image(RFAi_post_img.select(5).multiply(0.00001440).rename("RFAi").set('month', 6)),
   ee.Image(RFAi_post_img.select(6).multiply(0.00001488).rename("RFAi").set('month', 7)),
   ee.Image(RFAi_post_img.select(7).multiply(0.00001488).rename("RFAi").set('month', 8)),
   ee.Image(RFAi_post_img.select(8).multiply(0.00001440).rename("RFAi").set('month', 9)),
   ee.Image(RFAi_post_img.select(9).multiply(0.00001488).rename("RFAi").set('month', 10)),
   ee.Image(RFAi_post_img.select(10).multiply(0.00001440).rename("RFAi").set('month',11)),
   ee.Image(RFAi_post_img.select(11).multiply(0.00001488).rename("RFAi").set('month',12))])
var RFAi_post_image = RFAi_mensual_post.toBands()
print(RFAi_post_image,"RFAi_image")
var RFAA_post_mensual = fpar_post_image.multiply(RFAi_post_image)
var RFAA_post_anual = ee.ImageCollection.fromImages(
  [ee.Image(RFAA_post_mensual.select(0).rename("rfaa").set('month', 1)),
   ee.Image(RFAA_post_mensual.select(1).rename("rfaa").set('month', 2)),
   ee.Image(RFAA_post_mensual.select(2).rename("rfaa").set('month', 3)),
   ee.Image(RFAA_post_mensual.select(3).rename("rfaa").set('month', 4)),
   ee.Image(RFAA_post_mensual.select(4).rename("rfaa").set('month', 5)),
   ee.Image(RFAA_post_mensual.select(5).rename("rfaa").set('month', 6)),
   ee.Image(RFAA_post_mensual.select(6).rename("rfaa").set('month', 7)),
   ee.Image(RFAA_post_mensual.select(7).rename("rfaa").set('month', 8)),
   ee.Image(RFAA_post_mensual.select(8).rename("rfaa").set('month', 9)),
   ee.Image(RFAA_post_mensual.select(9).rename("rfaa").set('month', 10)),
   ee.Image(RFAA_post_mensual.select(10).rename("rfaa").set('month',11)),
   ee.Image(RFAA_post_mensual.select(11).rename("rfaa").set('month',12))]).sum()   
Map.addLayer(RFAA_post_anual, imageVisParam, "APAR post_manejo")
var dif_manejo = ((RFAA_post_anual.subtract(RFAA_pre_anual)).divide(RFAA_pre_anual)).multiply(100)
// valores de 0 a 590
var intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#ffffff" quantity="10" label="10"/>' +
      '<ColorMapEntry color="#0deaf5" quantity="25" label="25" />' +
      '<ColorMapEntry color="#0bc5ce" quantity="40" label="40" />' +
      '<ColorMapEntry color="#121fbe" quantity="65" label="65" />' +
      '<ColorMapEntry color="#f1ea18" quantity="80" label="80" />' +
      '<ColorMapEntry color="#31f12e" quantity="100" label="100" />' +
      '<ColorMapEntry color="#24b122" quantity="200" label="200" />' +
      '<ColorMapEntry color="#1a8119" quantity="2000" label="2000" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
// Agrega la imagen al mapa utilizando la rampa de color como los intervalo definidos.
Map.addLayer(dif_manejo.sldStyle(intervals), null, "Diferencia manejo (%)")
//Map.addLayer(dNBR.sldStyle(intervals), {}, 'dNBR clasificado');
var rfaa_pre_mask = RFAA_pre_anual.gt(0).and(RFAA_pre_anual.lt(450))
var rfaa_pre_maskf = RFAA_pre_anual.updateMask(rfaa_pre_mask)
var rfaa_post_mask = RFAA_post_anual.gt(0).and(RFAA_post_anual.lt(450))
var rfaa_post_maskf = RFAA_post_anual.updateMask(rfaa_post_mask)
var rfaa_promedio_anual = rfaa_pre_maskf.rename("rfaa_pre").addBands(rfaa_post_maskf.rename("rfaa_post"))
// Definir opciones del histograma
var banda_pre = ["rfaa_pre"]//,"rfaa_pre"]
var banda_post = ["rfaa_post"]//,"rfaa_pre"]
var opciones_pre = { 
  title: "Histograma La Nicolasa " +
         "pre-manejo (2001-2011)",
  fontSize: 14,
  hAxis: {title: 'RFAA promedio anual (MJ/m2)'},
  vAxis: {title: 'Frecuencia'},
  series: { 0: {color: 'red'}
  }
};
// Generamos el histograma
var histograma_pre = ui.Chart.image.histogram( 
                {
                image:rfaa_promedio_anual.select(0),
                region:area,
                scale:MODIS.first().projection().nominalScale()
                  })
                 .setSeriesNames(banda_pre)
                 .setOptions(opciones_pre); 
//print(histograma_pre)
var opciones_post = { 
  title: "Histograma La Nicolasa " +
         "post-manejo (2013-2020)",
  fontSize: 14,
  hAxis: {title: 'RFAA promedio anual (MJ/m2)'},
  vAxis: {title: 'Frecuencia'},
  series: { 0: {color: 'blue'}
  }
};
var histograma_post = ui.Chart.image.histogram( 
                {
                image:rfaa_promedio_anual.select(1),
                region:area,
                scale:MODIS.first().projection().nominalScale()
                  })
                 .setSeriesNames(banda_post)
                 .setOptions(opciones_post); 
//print(histograma_post)
// ////////////////////////////////////////////////////////
// //  8) Create a dropdown menu to display graph results //
// ////////////////////////////////////////////////////////
// //Add a panel to hold graphs within main panel
var panel = ui.Panel({
  style:{width: '400px',position:'middle-right'}});
var panelGraph = ui.Panel({
  style:{width: '400px',position:'middle-right'}
}).add(histograma_pre)
  .add(histograma_post)
panel.add(panelGraph)
ui.root.insert(1,panel)
//////////////////
//////////////////////LEYENDA///////////////////////////////  
var colors = [
              "417bff",//200
              "66f1ff",//400
              "fdff74",//600
              "d0ff12",//800
              "26ff0c",//1000
              "15a72d",//1200
              "ff9e58",//1400
              "ff0000",//1600
              "950000",//1800
              ];
var names = [
              "<200",
              "400",
              "600",
              "800",
              "1000",
              "1200",
              "1400",
              "1600",
              "1800",
            ];
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
    width: '150px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: "APAR promedio "+
          "anual (MJ/m2)",
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
/////////
var colors2 = [
              "ffffff",//<10
              "0deaf5",//25
              "0bc5ce",//40
              "121fbe",//65
              "f1ea18",//80
              "31f12e",//100
              "24b122",//200
              "1a8119",//>200
              ];
var names2 = [
              "<10",
              "25",
              "40",
              "65",
              "80",
              "100",
              "200",
              ">200",
            ];
var legend2 = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    width: '160px'
  }
});
// Create and add the legend title.
var legendTitle2 = ui.Label({
  value: 'Diferencia APAR (post-pre/pre)(%)',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend2.add(legendTitle2);
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
for (var i = 0; i < names2.length; i++){
legend2.add(makeRow(colors2[i], names2[i]));
}
Map.add(legend2)