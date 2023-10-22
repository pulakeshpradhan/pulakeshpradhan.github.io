var vectores = ui.import && ui.import("vectores", "table", {
      "id": "users/eduardo2188/LimiteCordilleras"
    }) || ee.FeatureCollection("users/eduardo2188/LimiteCordilleras");
var logo = ee.Image("users/rabcpochito2019/NEVADO");
var rect = vectores.geometry();
function corte(img) {
return img.clip(vectores)}
var app={};
app.createConstants = function() {
app.Departamento=ee.FeatureCollection('users/eduardo2188/LimiteCordilleras');
app.SelectedDepartamento='JUNIN';
app.HELPER_TEXT_STYLE = {margin: '8px 0 -3px 50px',fontSize: '14px',fontWeight: 'bold',width:'180px',color: 'green'};
app.URL_TEXT_STYLE = {margin: '4px 0 -1px 4px',fontSize: '10px',color: '3792cb'};
app.eez =ee.FeatureCollection('users/eduardo2188/LimiteCordilleras');};
app.createPanels = function() {
  app.logo =  {panel: ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{border: '0px solid black', margin: '10px 0 0 75px'}})};
  app.intro = {panel: ui.Panel([ui.Label({value: 'MONITOREO DE LOS GLACIARES',style: {fontWeight: 'bold', fontSize: '18px', margin: '8px 0px 0px 70px',color: 'black'}})])};
  //app.intro = {panel: ui.Panel([ui.Label({value: 'Elaborado por: Eduardo Rojas Baez',style: {fontWeight: 'bold', fontSize: '12px', margin: '8px 0px 0px 70px',color: 'black'}})])};
  var features = ee.FeatureCollection(app.eez).sort('cordillera ').getInfo()['features'];
  var items=[];
  for (var i = 0; i < features.length; i++) {items.push({label: features[i]['properties']['cordillera'],value: features[i]['properties']['cordillera']});}
  app.filters = {
    c1: ui.Select({items:items, onChange: function(value) 
    {var selected_country = app.eez.filter(ee.Filter.eq('cordillera', value));
    Map.clear();
    panel.clear()
    app.inspector_intro.clear()
    app.inspector_intro2.clear()
    Map.setOptions("HYBRID")
    //Map.setOptions('Dark', MAP_STYLES)
    Map.addLayer(selected_country.style({color:'black', width:2, fillColor:'00000000'}), {}, 'Región'+' '+value);
    Map.centerObject(selected_country);
    app.SelectedDepartamento=value;},
    style:{width:'100px', border: '1px solid black'},placeholder:'Cordillera'}),
    d1: ui.Textbox('YYYY-MM-DD', '2020-01-01',0,0,{fontWeight: 'bold',border: '1px solid blue', fontSize: '12px', color: 'black',width:'90px'}),
    d2: ui.Textbox('YYYY-MM-DD', '2020-12-31',0,0,{fontWeight: 'bold',border: '1px solid blue', fontSize: '12px', color: 'black',width:'90px'}),
    umbral: ui.Textbox('', '0.3',0,0,{fontWeight: 'bold',border: '1px solid blue', fontSize: '12px', color: 'black',width:'90px'}),
    umbralred: ui.Textbox('', '0.10',0,0,{fontWeight: 'bold',border: '1px solid blue', fontSize: '12px', color: 'black',width:'90px'}),
    umbralnir: ui.Textbox('', '0.11',0,0,{fontWeight: 'bold',border: '1px solid blue', fontSize: '12px', color: 'black',width:'90px'}),
    umbralndsi: ui.Textbox('', '0.4',0,0,{fontWeight: 'bold',border: '1px solid blue', fontSize: '12px', color: 'black',width:'90px'}),
    umbralndwi: ui.Textbox('', '0.2',0,0,{fontWeight: 'bold',border: '1px solid blue', fontSize: '12px', color: 'black',width:'90px'}),
    umbralsrtm: ui.Textbox('', '3500',0,0,{fontWeight: 'bold',border: '1px solid blue', fontSize: '12px', color: 'black',width:'90px'}),
 apply: ui.Button('Run',app.refreshPlace,0,{fontWeight: 'bold', border: '1px solid blue', fontSize: '12px', width:'90px',color: 'red'}),};
  app.filters.panel = ui.Panel({
    widgets: [ 
      ui.Panel([ui.Label('')], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Seleccionar Cordillera:', app.HELPER_TEXT_STYLE), app.filters.c1], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Fecha de Inicio:', app.HELPER_TEXT_STYLE), app.filters.d1], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Fecha Final:', app.HELPER_TEXT_STYLE), app.filters.d2], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Umbral RED (Mayor de):', app.HELPER_TEXT_STYLE), app.filters.umbralred], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Umbral NIR (Mayor de):', app.HELPER_TEXT_STYLE), app.filters.umbralnir], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Umbral NDSI (Mayor de):', app.HELPER_TEXT_STYLE), app.filters.umbralndsi], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Umbral NDWI (Menor de):', app.HELPER_TEXT_STYLE), app.filters.umbralndwi], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Umbral SRTM (Mayor de):', app.HELPER_TEXT_STYLE), app.filters.umbralsrtm], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('Ejecutar:', app.HELPER_TEXT_STYLE), app.filters.apply], ui.Panel.Layout.flow('horizontal')),
      ui.Panel([ui.Label('')], ui.Panel.Layout.flow('horizontal')),
    ],
    style: app.SECTION_STYLE});
  //app.inspector_intro = ui.Panel([ui.Label('Cuantificación',{color: 'black',fontWeight: 'bold',fontSize: '18px', margin: '8px 0 0px 20px'})]);
  app.inspector_intro = ui.Panel([ui.Label('')]);
  app.inspector_intro2 = ui.Panel([ui.Label('')]);
  app.inspector = ui.Panel([ui.Label('')]);
  app.export = ui.Panel([ui.Label('')]);};
var panel = ui.Panel({style: {width: '450px'}}).add(ui.Label('Serie de Tiempo', {fontWeight: 'bold', fontSize: '22px',margin: '0 0 5px 30px'}))
app.refreshPlace = function() {
  Map.clear();
  panel.clear()
  app.inspector_intro.clear()
  app.inspector.clear();
  app.export.clear();
  Map.setOptions("HYBRID")
  //Map.setOptions('Dark', MAP_STYLES)
  var AOI = ee.FeatureCollection(app.eez.filter(ee.Filter.eq('cordillera', app.SelectedDepartamento)).geometry());//.buffer(app.bufferd)
  var Date_Start = ee.Date(app.filters.d1.getValue()+'T00:00:00');
  var Date_End = ee.Date(app.filters.d2.getValue()+'T23:59:59');
  var umbral_nir = (app.filters.umbralnir.getValue())
  var umbral_red = (app.filters.umbralred.getValue())
  var umbral_ndsi = (app.filters.umbralndsi.getValue())
  var umbral_srtm = (app.filters.umbralsrtm.getValue())
  var umbral_ndwi = (app.filters.umbralndwi.getValue())
var maskL5 = function(image) {
var qa = image.select('BQA');
var mask = qa.bitwiseAnd(1 << 4).eq(0);
return image.updateMask(mask);}
// Assign a common name to the sensor-specific bands.
var LC8_BANDS = ['BQA', 'B2', 'B3', 'B4', 'B5',  'B6', 'B7', 'B10']; //Landsat 8
var LC7_BANDS = ['BQA', 'B1', 'B2', 'B3', 'B4',  'B5', 'B7', 'B6_VCID_2']; //Landsat 7
var LC5_BANDS = ['BQA', 'B1', 'B2', 'B3', 'B4',  'B5', 'B7', 'B6']; //Llandsat 5
var STD_NAMES = ['BQA', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').select(LC8_BANDS, STD_NAMES).map(maskL5)// Landsat 8
var l7 = ee.ImageCollection('LANDSAT/LE07/C01/T1_TOA').select(LC7_BANDS, STD_NAMES).map(maskL5) //Landsat 7
var l5 = ee.ImageCollection('LANDSAT/LT05/C01/T1_TOA').select(LC5_BANDS, STD_NAMES).map(maskL5) //Landsat 5
var composite = ee.ImageCollection(l5.merge(l7).merge(l8)).filterBounds(AOI).filterDate(Date_Start, Date_End).median();
var SRTM = ee.Image("CGIAR/SRTM90_V4").clip(AOI);
var ndvi = composite.normalizedDifference(['B4', 'B3']);
var ndsi = composite.normalizedDifference(['B2', 'B5']);
var ndwi = composite.normalizedDifference(['B3', 'B4']);
var palette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718','74A901', '66A000', '529400', '3E8601', '207401', '056201','004C00', '023B01', '012E01', '011D01', '011301'];
Map.addLayer(ndsi.clip(AOI), {min: -1, max: 1, palette: palette}, 'NDSI');
Map.addLayer(composite.clip(AOI), {bands: ['B4', 'B3', 'B2'], max: 0.3},'Imagen');
var NDSI = function(composite) {
 var ndsi = composite.expression('float(green - swir1)/(green + swir1)', {'green': composite.select('B2'),'swir1': composite.select('B5')});
 return ndsi.rename("ndsi");};
var GLACIER = function(NDSI_Calc,composite) {
 var B1nir = composite.select('B4'); //nir
 var B2red = composite.select('B3'); //red
 var GELO = ee.Image(0);
 var SelecGELO = GELO.where(
 B1nir.gt(ee.Number.parse(umbral_nir)).and(ndwi.lt(ee.Number.parse(umbral_ndwi))).and(SRTM.gt(ee.Number.parse(umbral_srtm))).and(B2red.gt(ee.Number.parse(umbral_red))).and(NDSI_Calc.gt(ee.Number.parse(umbral_ndsi))),1);
 var GLACIER= SelecGELO.updateMask(SelecGELO).rename('GLACIER');
 return GLACIER.rename("ndsi");
};
var NDSI_Calc =NDSI(composite);
var AreaGlacier = GLACIER(NDSI_Calc,composite).clip(AOI);
Map.addLayer(AreaGlacier,{palette:['0000FF']}, 'Glaciar');
Map.addLayer(AOI.style({color:'black', width:2, fillColor:'00000000'}),{},'Región'+' '+app.SelectedDepartamento,true);
var GLACIER_class = AreaGlacier.gte(0)
var area_pxa = AreaGlacier.multiply(ee.Image.pixelArea()).reduceRegion(ee.Reducer.sum(),AOI,30,null,null,false,1e13).get('ndsi')
area_pxa = ee.Number(area_pxa).divide(1e6)                
print ('Area using ee.Image.pixelArea (km²)', area_pxa)
app.inspector_intro2.widgets().set(0, ui.Label('Area del Glaciar: '+area_pxa.getInfo().toFixed(2) +' '+'km²',{margin: '10px 10px 10px 100px',fontSize: '16px',color: 'blue'}))
function makeColorBarParams2(palette) {
return {bbox: [0, 0, 1, 0.1],dimensions: '200x30',format: 'png',min: 0,max: 1,palette: palette,};}
var PaletaDS = {min: -1,max: 1,palette: ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718','74A901', '66A000', '529400', '3E8601', '207401', '056201','004C00', '023B01', '012E01', '011D01', '011301']};
var legendd1 = ui.Panel({style: {position: 'bottom-left'}});
function makeColorBarParams3(palette) {
return {bbox: [0, 0, 1, 0.1],dimensions: '200x30',format: 'png',min: 0,max: 1,palette: palette,};}
var colorBar21 = ui.Thumbnail({image: ee.Image.pixelLonLat().select(0),params: makeColorBarParams2(PaletaDS.palette),style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},});
var legendLabels21 = ui.Panel({widgets: [ui.Label(PaletaDS.min, {margin: '4px 8px'}),ui.Label(((PaletaDS.max+PaletaDS.min) / 2),{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),ui.Label(PaletaDS.max, {margin: '4px 8px'})],layout: ui.Panel.Layout.flow('horizontal')});
var legendTitle21 = ui.Label({value:'Índice de Nieve de Diferencia Normalizada (NDSI) ',style: {fontWeight: 'bold', fontSize: '14px', margin: '0 10px 4px 10px',padding: '0'}});
var legendPanel21 = ui.Panel([legendTitle21, colorBar21, legendLabels21]);
legendd1.add(legendPanel21);
Map.add(legendd1);
}
 app.boot = function() {
  app.createConstants();
  app.createPanels();
  var main = ui.Panel({widgets: [app.logo.panel,app.intro.panel,app.filters.panel,app.inspector_intro,app.inspector_intro2], style: {width: '420px', padding: '4px',border: '2px solid black'}});
Map.style().set('cursor', 'crosshair');
  ui.root.insert(0, main);
  var scountry=ee.FeatureCollection(app.Departamento).filter(ee.Filter.eq('cordillera', app.SelectedDepartamento));
  Map.centerObject(scountry,5);
};
Map.setOptions("HYBRID")
app.boot();