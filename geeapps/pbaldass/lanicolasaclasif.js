var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "remapped"
        ],
        "min": 0,
        "max": 1,
        "palette": [
          "000000",
          "ff0000"
        ]
      }
    }) || {"opacity":1,"bands":["remapped"],"min":0,"max":1,"palette":["000000","ff0000"]};
var Lanico = ee.FeatureCollection("users/pbaldass/LaNicolasa")
Map.setOptions("SATELLITE")
Map.setCenter(-65.96, -38.85, 10)
var blank = ee.Image(0).mask(0);
var outline = blank.paint(Lanico, 'AA0000', 2); 
var visPar = {'palette':'#ff0000','opacity': 0.6};
Map.addLayer(outline, visPar, "La Nicolasa", true);
var TV = ee.FeatureCollection("users/pbaldass/tipo_veg_lanicolasa")
var blank2 = ee.Image(0).mask(0);
var outline2 = blank2.paint(TV, 'AA0000', 3); 
var visPar2 = {'palette':'#22e74c','opacity': 0.6};
Map.addLayer(outline2, visPar2, "Tipos de Vegetacion", true);
var TVs = TV.aggregate_array("Tipo_Veg")
function onNameChanged(name) {
  print('Update map for ' + name)
}
TVs.evaluate(function(TVs) {
  print(TVs);
  var currentName = ui.Select({
    items: TVs, 
    placeholder: 'Seleccionar Tipo de Vegetacion', 
    onChange: redraw,
  });
  var panel = ui.Panel([currentName]);
  Map.widgets().add(panel);
});
var layers = [
  ui.Map.Layer(TV),
];
// The new value is passed as a parameter to the select onChange callback.
function redraw(names) {
    // FILTER THE COLLECTION TO ONLY CONTAIN SELECTED FEATURE
    var myCounty = TV.filterMetadata("Tipo_Veg","equals",names)
    // Helper Function to remove all previous layers of the map
    function removeLayersFromMap(layer){
      Map.remove(layer)
    }
    Map.layers().map(removeLayersFromMap)  // map the function to the Map.layers() object
    Map.addLayer(myCounty,{},"Tipo Vegetacion seleccionado") 
    var blank = ee.Image(0).mask(0);
    var outline = blank.paint(Lanico, 'AA0000', 2); 
    var visPar = {'palette':'#ff0000','opacity': 0.6};
    Map.addLayer(outline, visPar, "La Nicolasa", true);
    var area = myCounty
    // Add the new layer to the map
//Función de corte. Área rectangular
var corte = function (image){
  return image.clip(area);
}
var MODIS = ee.ImageCollection('MODIS/006/MOD13Q1')
              .filterDate('2001-01-01', '2020-12-31')
              .map(corte)
//print(MODIS.first().projection().nominalScale(),"scale")              
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
////////APAR POSTMANEJO
var post_manejo = EVI_I.filterDate('2013-01-01', '2020-12-31')
//////NDVI PROMEDIO MENSUAL
// make a list with months
var months = ee.List.sequence(1, 12);
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
//print(radiacion_solar_post,"radiacion_solar_post")
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
//print(RFAi_post_image,"RFAi_image")
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
   ee.Image(RFAA_post_mensual.select(11).rename("rfaa").set('month',12))])
var mean = RFAA_post_anual.mean()
var min = RFAA_post_anual.min()
var max = RFAA_post_anual.max()
var SD = RFAA_post_anual.reduce(ee.Reducer.stdDev())
var bandas = mean.addBands(min).addBands(max).addBands(SD)
//---------------------------------------------------------------------------------------------------
//------------------------ DEFINIR EL NUMERO INICIAL DE CLASES --------------------------------------
//---------------------------------------------------------------------------------------------------
// MUESTREAR LA IMAGEN PARA DEFNIR LOS CLUSTERS
var training = bandas.sample({
  region: area,
  scale: 231.65635826395828,
  numPixels: 50,
});
//print(training,"training")
var numclas = 20
// ENTRENA UN CLASIFICADOR CON EL ALGORITMO K-MEANS
var clusterer = ee.Clusterer.wekaKMeans({nClusters: numclas,maxIterations: 100,seed: 123}).train(training);
// CLASIFICAR LA IMAGEN
var ClasNosup = bandas.cluster(clusterer);
var Clasificacion = ClasNosup.remap(ee.List.sequence(0,numclas-1), ee.List.sequence(1,numclas)).int8()
Map.addLayer(Clasificacion.randomVisualizer(), {},"clasificacion")
var mask1 = Clasificacion.eq(1)
var clase_select1 = ui.Map.Layer(Clasificacion.multiply(mask1), imageVisParam, "Clase 1",false)
var mask2 = Clasificacion.eq(2)
var clase_select2 = ui.Map.Layer(Clasificacion.multiply(mask2), imageVisParam, "Clase 2",false)
var mask3 = Clasificacion.eq(3)
var clase_select3 = ui.Map.Layer(Clasificacion.multiply(mask3), imageVisParam, "Clase 3",false)
var mask4 = Clasificacion.eq(4)
var clase_select4 = ui.Map.Layer(Clasificacion.multiply(mask4), imageVisParam, "Clase 4",false)
var mask5 = Clasificacion.eq(5)
var clase_select5 = ui.Map.Layer(Clasificacion.multiply(mask5), imageVisParam, "Clase 5",false)
var mask6 = Clasificacion.eq(6)
var clase_select6 = ui.Map.Layer(Clasificacion.multiply(mask6), imageVisParam, "Clase 6",false)
var mask7 = Clasificacion.eq(7)
var clase_select7 = ui.Map.Layer(Clasificacion.multiply(mask7), imageVisParam, "Clase 7",false)
var mask8 = Clasificacion.eq(8)
var clase_select8 = ui.Map.Layer(Clasificacion.multiply(mask8), imageVisParam, "Clase 8",false)
var mask9 = Clasificacion.eq(9)
var clase_select9 = ui.Map.Layer(Clasificacion.multiply(mask9), imageVisParam, "Clase 9",false)
var mask10 = Clasificacion.eq(10)
var clase_select10 = ui.Map.Layer(Clasificacion.multiply(mask10), imageVisParam, "Clase 10",false)
var mask11 = Clasificacion.eq(11)
var clase_select11 = ui.Map.Layer(Clasificacion.multiply(mask11), imageVisParam, "Clase 11",false)
var mask12 = Clasificacion.eq(12)
var clase_select12 = ui.Map.Layer(Clasificacion.multiply(mask12), imageVisParam, "Clase 12",false)
var mask13 = Clasificacion.eq(13)
var clase_select13 = ui.Map.Layer(Clasificacion.multiply(mask13), imageVisParam, "Clase 13",false)
var mask14 = Clasificacion.eq(14)
var clase_select14 = ui.Map.Layer(Clasificacion.multiply(mask14), imageVisParam, "Clase 14",false)
var mask15 = Clasificacion.eq(15)
var clase_select15 = ui.Map.Layer(Clasificacion.multiply(mask15), imageVisParam, "Clase 15",false)
var mask16 = Clasificacion.eq(16)
var clase_select16 = ui.Map.Layer(Clasificacion.multiply(mask16), imageVisParam, "Clase 16",false)
var mask17 = Clasificacion.eq(17)
var clase_select17 = ui.Map.Layer(Clasificacion.multiply(mask17), imageVisParam, "Clase 17",false)
var mask18 = Clasificacion.eq(18)
var clase_select18 = ui.Map.Layer(Clasificacion.multiply(mask18), imageVisParam, "Clase 18",false)
var mask19 = Clasificacion.eq(19)
var clase_select19 = ui.Map.Layer(Clasificacion.multiply(mask19), imageVisParam, "Clase 19",false)
var mask20 = Clasificacion.eq(20)
var clase_select20 = ui.Map.Layer(Clasificacion.multiply(mask20), imageVisParam, "Clase 20",false)
Map.add(clase_select20)
Map.add(clase_select19)
Map.add(clase_select18)
Map.add(clase_select17)
Map.add(clase_select16)
Map.add(clase_select15)
Map.add(clase_select14)
Map.add(clase_select13)
Map.add(clase_select12)
Map.add(clase_select11)
Map.add(clase_select10)
Map.add(clase_select9)
Map.add(clase_select8)
Map.add(clase_select7)
Map.add(clase_select6)
Map.add(clase_select5)
Map.add(clase_select4)
Map.add(clase_select3)
Map.add(clase_select2)
Map.add(clase_select1)
//}
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({
  style: {width: '300px'}})
      .add(ui.Label('Click en el mapa'));
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(6) + ' ' +
                 'lat: ' + coords.lat.toFixed(6);
  panel.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
});
// Add the panel to the ui.root.
ui.root.add(panel);
}