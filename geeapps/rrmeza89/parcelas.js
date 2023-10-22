var table = ui.import && ui.import("table", "table", {
      "id": "users/rrmeza89/PARCELAS_03122021"
    }) || ee.FeatureCollection("users/rrmeza89/PARCELAS_03122021"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint();
/*Distritos*/
Map.centerObject(table,14)
/* Diccionario de dictrictos*/
var Parcelas = { 
  "FEBRERO":[],"BARBOZA":[],"CERRITO":[],"ESTEBANKUE":[],"FAVERO":[],"GIOVANNI":[],"ITARARA":[],
  "KAARENDY":[],"NARANJATY":[],"OBLIGADO":[],"ONONDIVEPA":[],"PICAFLOR":[],
  "PIRYTY":[],"REMPER":[],"SALTOKUE":[],"SANCAMILO":[],"TEXEIRA":[],
};
Map.setOptions("SATELLITE")
/*====================================== inicio de la app ======================================*/
var selector = ui.Select({
  items: Object.keys(Parcelas), 
  placeholder:'Seleccione el Cliente', 
  onChange: function(i){
var layer = ui.Map.Layer(table.filter(ee.Filter.inList('Cliente', [i])),{},"Parcelas")
  Map.layers().set(0,layer)
  Map.centerObject(table.filter(ee.Filter.inList('Cliente', [i])), 14)
  }
})
var buscador = ui.Panel({widgets:selector, layout: ui.Panel.Layout.flow('horizontal'), style: {backgroundColor: '00000000', stretch: 'both', position:'top-left' }})
 var dicobjetos = {
  Sliderfecha:ui.DateSlider({start:'2019-01-01', end:ee.Date(Date.now()), period: 5, onChange:function(){}}),}
//=============================================imagenes=====================\\\\\\\\\\\\\\\\\\\\\\/////////////////////////
var boton = ui.Button({label:'Aplicar', onClick:function(b){
var name = table.filter(ee.Filter.eq('Cliente', selector.getValue()));
var geometry = name.geometry();
var s2 = ee.ImageCollection("COPERNICUS/S2_SR").filterBounds(geometry)
				.filterDate(ee.Date(dicobjetos.Sliderfecha.getValue()[0]).format('YYYY-MM-dd'), ee.Date(dicobjetos.Sliderfecha.getValue()[1]).format('YYYY-MM-dd'))
				.filterMetadata('CLOUDY_PIXEL_PERCENTAGE',"less_than",30)
 var layer = ui.Map.Layer(s2.mosaic().clip(geometry), {"bands":["B4","B3","B2"], min:100, max:1600, gamma:1 }, 'Sentinel 2')
  Map.layers().set(0,layer)
var NDVI = function(img) {
  var ndvi = img.normalizedDifference(['B8','B4']).rename('NDVI');
  return img.addBands(ndvi)
}
s2 = s2.map(NDVI)
 var layer1 = ui.Map.Layer(s2.mosaic().clip(geometry), {'min': 0, 'max': 1,"opacity":1,"bands":["NDVI"],
 "palette":["ff0000","ffa500","ffff00","7dff04","36b11f"]},'Índice de Vegetación')
     Map.layers().set(1,layer1)
var RellenoAOI = ee.Image().byte();
var LimiteAOI = RellenoAOI.paint({featureCollection: geometry, width: 1,});
var layer2 = ui.Map.Layer(LimiteAOI,{palette: 'red', opacity: 0.7},'parcela');
 Map.layers().set(2,layer2);
}});
var panel = ui.Panel({widgets:[buscador,dicobjetos.Sliderfecha, boton], layout: ui.Panel.Layout.flow('vertical'), 
style: {backgroundColor: '00005555', position:'top-left'}})
Map.add(panel)