// BASE 2021
var vectores = ee.FeatureCollection("users/geomathcenter/CeproYanesha"),
logo = ee.Image("users/geomathcenter/Amazonia_Impact_Ventures");
var MAP_STYLES = {Dark: [{"featureType": "all","elementType": "labels.text.fill","stylers": [{"saturation": 36},{"color": "#000000"},{"lightness": 40}]},{"featureType": "all","elementType": "labels.text.stroke","stylers": [{"visibility": "on"},{"color": "#000000"},{"lightness": 16}]},{"featureType": "all","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "administrative","elementType": "geometry.fill","stylers": [{"color": "#000000"},{"lightness": 20}]},{"featureType": "administrative","elementType": "geometry.stroke","stylers": [{"color": "#000000"},{"lightness": 17},{"weight": 1.2}]},{"featureType": "administrative","elementType": "labels.text.fill","stylers": [{"visibility": "on"},{"lightness": "32"}]},{"featureType": "administrative.country","elementType": "geometry.stroke","stylers": [{"visibility": "on"},{"weight": "2.28"},{"saturation": "-33"},{"lightness": "24"}]},{"featureType": "landscape","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 20}]},{"featureType": "landscape","elementType": "geometry.fill","stylers": [{"lightness": "0"}]},{"featureType": "landscape","elementType": "labels.text.fill","stylers": [{"lightness": "69"}]},{"featureType": "poi","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 21}]},{"featureType": "road","elementType": "geometry.fill","stylers": [{"lightness": "63"}]},{"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"color": "#2d2d2d"},{"lightness": 17}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#000000"},{"lightness": 29},{"weight": 0.2}]},{"featureType": "road.arterial","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 18}]},{"featureType": "road.local","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 16}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 19}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#0f252e"},{"lightness": 17}]},{"featureType": "water","elementType": "geometry.fill","stylers": [{"lightness": "-100"},{"gamma": "0.00"}]}]}
Map.setOptions('Dark', MAP_STYLES) 
var rect = vectores.geometry();
var app={};
app.createConstants = function() {
app.Departamento=ee.FeatureCollection('users/geomathcenter/CeproYanesha');
app.SelectedDepartamento='COD_CAT';
app.HELPER_TEXT_STYLE = {margin: '8px 0 -3px 50px',fontSize: '12px',fontWeight: 'bold',width:'180px',color: 'green'};
app.URL_TEXT_STYLE = {margin: '4px 0 -1px 4px',fontSize: '10px',color: '3792cb'};
app.eez =ee.FeatureCollection('users/geomathcenter/CeproYanesha');};
app.createPanels = function() {
app.logo =  {panel: ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{ margin: '10px 0 0 70px'}})};
app.intro = {
panel: ui.Panel([ui.Label({value: 'Monitoreo de los Bosques',
style: {fontWeight: 'bold', fontSize: '14px', margin: '15px 10px 10px 120px',color: 'black'}}),
ui.Label('https://www.amazoniaimpactventures.com/',{color: 'blue',fontWeight: 'bold',fontSize: '14px', margin: '8px 0 0px 60px'})
.setUrl('https://www.amazoniaimpactventures.com/')
]),};
var features = ee.FeatureCollection(app.eez).sort('COD_CAT').getInfo()['features'];
var items=[];
for (var i = 0; i < features.length; i++) {items.push({label: features[i]['properties']['COD_CAT'],value: features[i]['properties']['COD_CAT']});}
app.filters = {
c1: ui.Select({items:items, onChange: function(value) 
{var selected_country = app.eez.filter(ee.Filter.eq('COD_CAT', value));
Map.clear();
app.inspector_intro.clear()
app.inspector_intro2.clear()
var MAP_STYLES = {Dark: [{"featureType": "all","elementType": "labels.text.fill","stylers": [{"saturation": 36},{"color": "#000000"},{"lightness": 40}]},{"featureType": "all","elementType": "labels.text.stroke","stylers": [{"visibility": "on"},{"color": "#000000"},{"lightness": 16}]},{"featureType": "all","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "administrative","elementType": "geometry.fill","stylers": [{"color": "#000000"},{"lightness": 20}]},{"featureType": "administrative","elementType": "geometry.stroke","stylers": [{"color": "#000000"},{"lightness": 17},{"weight": 1.2}]},{"featureType": "administrative","elementType": "labels.text.fill","stylers": [{"visibility": "on"},{"lightness": "32"}]},{"featureType": "administrative.country","elementType": "geometry.stroke","stylers": [{"visibility": "on"},{"weight": "2.28"},{"saturation": "-33"},{"lightness": "24"}]},{"featureType": "landscape","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 20}]},{"featureType": "landscape","elementType": "geometry.fill","stylers": [{"lightness": "0"}]},{"featureType": "landscape","elementType": "labels.text.fill","stylers": [{"lightness": "69"}]},{"featureType": "poi","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 21}]},{"featureType": "road","elementType": "geometry.fill","stylers": [{"lightness": "63"}]},{"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"color": "#2d2d2d"},{"lightness": 17}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#000000"},{"lightness": 29},{"weight": 0.2}]},{"featureType": "road.arterial","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 18}]},{"featureType": "road.local","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 16}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 19}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#0f252e"},{"lightness": 17}]},{"featureType": "water","elementType": "geometry.fill","stylers": [{"lightness": "-100"},{"gamma": "0.00"}]}]}
Map.setOptions('Dark', MAP_STYLES)
Map.addLayer(selected_country.style({color:'cyan', width:2, fillColor:'00000000'}), {}, 'Zona');
Map.centerObject(selected_country);
app.SelectedDepartamento=value},style:{width:'100px', border: '1px solid black'},placeholder:'Zona'}),
d1: ui.Textbox('YYYY-MM-DD', '2022-01-01',0,0,{fontWeight: 'bold',border: '1px solid blue', fontSize: '12px', color: 'black',width:'90px'}),
d2: ui.Textbox('YYYY-MM-DD', '2022-12-31',0,0,{fontWeight: 'bold',border: '1px solid blue', fontSize: '12px', color: 'black',width:'90px'}), 
umbral_R: ui.Textbox('', '-0.96',0,0,{fontWeight: 'bold',border: '1px solid blue', fontSize: '12px', color: 'black',width:'90px'}),
umbral_I_Max: ui.Textbox('', '-0.2',0,0,{fontWeight: 'bold',border: '1px solid blue', fontSize: '12px', color: 'black',width:'90px'}),
apply: ui.Button('Run',app.refreshPlace,0,{fontWeight: 'bold', border: '1px solid blue', fontSize: '12px', width:'90px',color: 'red'}),};
app.filters.panel = ui.Panel({widgets: [ui.Panel([ui.Label('')], ui.Panel.Layout.flow('horizontal'))
,ui.Panel([ui.Label('Seleccionar Zona:', app.HELPER_TEXT_STYLE), app.filters.c1]
, ui.Panel.Layout.flow('horizontal'))
,ui.Panel([ui.Label('Ejecutar:', app.HELPER_TEXT_STYLE), app.filters.apply], ui.Panel.Layout.flow('horizontal')),      ui.Panel([ui.Label('---------------------------------------------------------------------------------------',{margin: '0px 0 0 15px',fontSize: '10px',fontWeight: 'bold',width:'350px',color: 'black'})], ui.Panel.Layout.flow('horizontal')),],  style: app.SECTION_STYLE});
app.inspector_intro = ui.Panel([ui.Label('')]);
app.inspector_intro2 = ui.Panel([ui.Label('')]);
  var MAP_STYLES = {Dark: [{"featureType": "all","elementType": "labels.text.fill","stylers": [{"saturation": 36},{"color": "#000000"},{"lightness": 40}]},{"featureType": "all","elementType": "labels.text.stroke","stylers": [{"visibility": "on"},{"color": "#000000"},{"lightness": 16}]},{"featureType": "all","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "administrative","elementType": "geometry.fill","stylers": [{"color": "#000000"},{"lightness": 20}]},{"featureType": "administrative","elementType": "geometry.stroke","stylers": [{"color": "#000000"},{"lightness": 17},{"weight": 1.2}]},{"featureType": "administrative","elementType": "labels.text.fill","stylers": [{"visibility": "on"},{"lightness": "32"}]},{"featureType": "administrative.country","elementType": "geometry.stroke","stylers": [{"visibility": "on"},{"weight": "2.28"},{"saturation": "-33"},{"lightness": "24"}]},{"featureType": "landscape","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 20}]},{"featureType": "landscape","elementType": "geometry.fill","stylers": [{"lightness": "0"}]},{"featureType": "landscape","elementType": "labels.text.fill","stylers": [{"lightness": "69"}]},{"featureType": "poi","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 21}]},{"featureType": "road","elementType": "geometry.fill","stylers": [{"lightness": "63"}]},{"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"color": "#2d2d2d"},{"lightness": 17}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#000000"},{"lightness": 29},{"weight": 0.2}]},{"featureType": "road.arterial","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 18}]},{"featureType": "road.local","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 16}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 19}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#0f252e"},{"lightness": 17}]},{"featureType": "water","elementType": "geometry.fill","stylers": [{"lightness": "-100"},{"gamma": "0.00"}]}]}
    Map.setOptions('Dark', MAP_STYLES)
app.inspector = ui.Panel([ui.Label('')]);
app.export = ui.Panel([ui.Label('')]);};
app.refreshPlace = function() {
Map.clear();
app.inspector_intro.clear()
app.inspector_intro2.clear()
app.inspector.clear();
app.export.clear();
var MAP_STYLES = {Dark: [{"featureType": "all","elementType": "labels.text.fill","stylers": [{"saturation": 36},{"color": "#000000"},{"lightness": 40}]},{"featureType": "all","elementType": "labels.text.stroke","stylers": [{"visibility": "on"},{"color": "#000000"},{"lightness": 16}]},{"featureType": "all","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "administrative","elementType": "geometry.fill","stylers": [{"color": "#000000"},{"lightness": 20}]},{"featureType": "administrative","elementType": "geometry.stroke","stylers": [{"color": "#000000"},{"lightness": 17},{"weight": 1.2}]},{"featureType": "administrative","elementType": "labels.text.fill","stylers": [{"visibility": "on"},{"lightness": "32"}]},{"featureType": "administrative.country","elementType": "geometry.stroke","stylers": [{"visibility": "on"},{"weight": "2.28"},{"saturation": "-33"},{"lightness": "24"}]},{"featureType": "landscape","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 20}]},{"featureType": "landscape","elementType": "geometry.fill","stylers": [{"lightness": "0"}]},{"featureType": "landscape","elementType": "labels.text.fill","stylers": [{"lightness": "69"}]},{"featureType": "poi","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 21}]},{"featureType": "road","elementType": "geometry.fill","stylers": [{"lightness": "63"}]},{"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"color": "#2d2d2d"},{"lightness": 17}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#000000"},{"lightness": 29},{"weight": 0.2}]},{"featureType": "road.arterial","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 18}]},{"featureType": "road.local","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 16}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 19}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#0f252e"},{"lightness": 17}]},{"featureType": "water","elementType": "geometry.fill","stylers": [{"lightness": "-100"},{"gamma": "0.00"}]}]}
Map.setOptions('Dark', MAP_STYLES)
var AOI = ee.FeatureCollection(app.eez.filter(ee.Filter.eq('COD_CAT', app.SelectedDepartamento)).geometry());//.buffer(app.bufferd)
var Date_Start = ee.Date(app.filters.d1.getValue()+'T00:00:00');
var Date_End = ee.Date(app.filters.d2.getValue()+'T23:59:59');
exports.Vector = function  (imagen,region){
  var raster = imagen.updateMask(imagen.eq(1))
  var vector = raster.addBands(raster).reduceToVectors({geometry: region,scale: 30, geometryType: 'polygon',eightConnected: false,maxPixels: 1e17,reducer:  ee.Reducer.count()})
  return vector}
var I = function(image) {
var atributos = {'blue':image.select('blue'),'red':image.select('red'),'green':image.select('green'),'nir':image.select('nir'),'swir1':image.select('swir1'),'swir2':image.select('swir2')}
var banda_I = image.expression('(swir1-nir)/(swir1+nir)', atributos).rename('I_1').addBands(image.expression('(swir2-nir)/(swir2+nir)',atributos).rename('I_2')).addBands(image.expression('(swir2-swir1)/(swir2+swir1)',atributos).rename('I_3'))
return image.addBands(banda_I).copyProperties(image,['system:time_start','system:time_end']);};
function Max_I(image){
  var banda = image.select('I_1').max(image.select('I_2')).max(image.select('I_3')).rename('I_Max')
  return image.addBands(banda).copyProperties(image,['system:time_start','system:time_end'])}
function Min_I(image){
  var banda = image.select('I_1').min(image.select('I_2')).min(image.select('I_3')).rename('I_Min')
  return image.addBands(banda).copyProperties(image,['system:time_start','system:time_end'])}
function Mediana_I(image){
var banda =ee.ImageCollection([image.select('I_1').rename('I'),image.select('I_2').rename('I'),image.select('I_3').rename('I')]).median().rename('I_Median')
return image.addBands(banda).copyProperties(image,['system:time_start','system:time_end'])}
// function Reflectancia_λ(image){
// var salida=  ee.ImageCollection([image.select('blue').rename('REFLECTANCIA').addBands(ee.Image.constant(0.4826).rename('λ')).float().addBands(ee.Image.constant(1)),image.select('green').rename('REFLECTANCIA').addBands(ee.Image.constant(0.5613).rename('λ')).float().addBands(ee.Image.constant(1)),image.select('red').rename('REFLECTANCIA').addBands(ee.Image.constant(0.6546).rename('λ')).float().addBands(ee.Image.constant(1)),image.select('nir').rename('REFLECTANCIA').addBands(ee.Image.constant(0.8646).rename('λ')).float().addBands(ee.Image.constant(1)),image.select('swir1').rename('REFLECTANCIA').addBands(ee.Image.constant(1.6090).rename('λ')).float().addBands(ee.Image.constant(1)),image.select('swir2').rename('REFLECTANCIA').addBands(ee.Image.constant(2.2010).rename('λ')).float().addBands(ee.Image.constant(1)),]).select(['λ', 'REFLECTANCIA']).reduce(ee.Reducer.pearsonsCorrelation()).select('correlation').rename('CORRELACION')
// return image.addBands(salida).copyProperties(image,['system:time_start','system:time_end'])}
function Reflectancia_λ(image){
var salida=  ee.ImageCollection([
image.select('nir').rename('REFLECTANCIA').addBands(ee.Image.constant(0.8646).rename('λ')).float().addBands(ee.Image.constant(1)),
image.select('swir1').rename('REFLECTANCIA').addBands(ee.Image.constant(1.6090).rename('λ')).float().addBands(ee.Image.constant(1)),
image.select('swir2').rename('REFLECTANCIA').addBands(ee.Image.constant(2.2010).rename('λ')).float().addBands(ee.Image.constant(1)),]).select(['λ', 'REFLECTANCIA']).reduce(ee.Reducer.pearsonsCorrelation()).select('correlation').rename('CORRELACION')
return image.addBands(salida).copyProperties(image,['system:time_start','system:time_end'])}
function Reproyectar(image) {
image = image.reproject('EPSG:4326', null, 30)
return image.copyProperties(image,['system:time_start','system:time_end']);}
var Numero_de_banda =ee.Dictionary({L5: ee.List([0,1,2,3,4,5,15,17,18]),L7: ee.List([0,1,2,3,4,5,15,17,18]),L8: ee.List([1,2,3,4,5,6,15,17,18])});
var Nombre_de_banda = ee.List(['blue','green','red','nir','swir1','swir2','ST_TRAD','QA_PIXEL','QA_RADSAT']);
var landsat5 = (ee.ImageCollection("LANDSAT/LT05/C02/T1_L2").merge(ee.ImageCollection("LANDSAT/LT05/C02/T2_L2")).select(Numero_de_banda.get('L5'), Nombre_de_banda)).filter(ee.Filter.eq('IMAGE_QUALITY' , 9))
var landsat7 = (ee.ImageCollection('LANDSAT/LE07/C02/T1_L2').merge(ee.ImageCollection('LANDSAT/LE07/C02/T2_L2')).select(Numero_de_banda.get('L7'), Nombre_de_banda)).filter(ee.Filter.eq('IMAGE_QUALITY' , 9)).filter(ee.Filter.inList('system:index', ['LE07_006068_20190618','LE07_006068_20190415','LE07_006068_20191211','LE07_008066_20190616','LE07_009064_20151103','LE07_008066_20141227','LE07_010063_20141225','LE07_006070_20170103','LE07_003070_20171216','LE07_006069_20170103','LE07_008066_20161013','LE07_005069_20151123','LE07_005069_20151107','LE07_005069_20161227','LE07_005069_20161211','LE07_003070_20141005','LE07_011063_20170122','LE07_006068_20141111','LE07_006068_20161116','LE07_010063_20140312','LE07_010063_20140224','LE07_010063_20161112']).not())
var landsat8 = (ee.ImageCollection('LANDSAT/LC08/C02/T1_L2').merge(ee.ImageCollection('LANDSAT/LC08/C02/T2_L2')).select(Numero_de_banda.get('L8'), Nombre_de_banda)).filter(ee.Filter.eq('IMAGE_QUALITY_OLI' , 9)).filter(ee.Filter.eq('IMAGE_QUALITY_TIRS' , 9)).filter(ee.Filter.inList('system:index', ['LC08_006065_20190914','LC08_003071_20200826']).not())
var landsat9 =  (ee.ImageCollection("LANDSAT/LC09/C02/T1_L2").merge(ee.ImageCollection("LANDSAT/LC09/C02/T2_L2")).select(Numero_de_banda.get('L8'), Nombre_de_banda)).filter(ee.Filter.eq('IMAGE_QUALITY_OLI' , 9)).filter(ee.Filter.eq('IMAGE_QUALITY_TIRS' , 9))
var landsat = landsat5.merge(landsat7).merge(landsat8).merge(landsat9);
function filtro_sombra_nubes(image) {
var dilatedCloud = image.select('QA_PIXEL').bitwiseAnd(1 << 1).eq(0)
var cloud = image.select('QA_PIXEL').bitwiseAnd(1 << 3).eq(0)
var cloudShadow = image.select('QA_PIXEL').bitwiseAnd(1 << 4).eq(0)
var scaled = image.multiply(0.0000275).add(-0.2)
return image.addBands(scaled, null, true).updateMask(dilatedCloud).updateMask(cloud).updateMask(cloudShadow).copyProperties(image,['system:time_start','system:time_end']);}
function filtro_limite_reflectancia(image) {
var mascara = image.select('blue').lte(0.1250).and(image.select('blue').gt(0)).and(image.select('green').gt(0)).and(image.select('red').gt(0)).and(image.select('nir').gt(0)).and(image.select('nir').lte(0.45)).and(image.select('swir1').gte(0.0250)).and(image.select('swir2').gte(0.0250))
return image.updateMask(mascara).copyProperties(image,['system:time_start','system:time_end']);}
var Landsat_anual =  landsat.filterDate(Date_Start,Date_End).map(filtro_sombra_nubes).map(filtro_limite_reflectancia).map(Reflectancia_λ).map(Reproyectar)
var fecha_mensual = ee.Number(Date_End.difference(Date_Start,'month')).round();
var LANDSATMensual = ee.ImageCollection(ee.List.sequence(0,fecha_mensual).map(function (n) {
var ini = Date_Start.advance(n,'month');
var end = ini.advance(1,'month'); 
return Landsat_anual.filterDate(ini,end).qualityMosaic('CORRELACION').set('system:time_start', ini);}));
var Mosaico = ee.ImageCollection(LANDSATMensual.qualityMosaic('CORRELACION')).map(I).map(Max_I).map(Min_I).map(Mediana_I).map(umbralCorrelacion).map(umbralIndice).median().clip(AOI)
var Mosaico_2 = Landsat_anual.map(I).map(Max_I).map(Min_I).map(Mediana_I).median().clip(AOI)
var Mosaico_Final =  ee.ImageCollection([Mosaico_2,ee.ImageCollection(Mosaico).map(umbralCorrelacion).map(umbralIndice).median()]).mosaic()
function umbralCorrelacion(image) {
var maska = (image.select('CORRELACION').gte(ee.Number.parse(app.filters.umbral_R.getValue())))
.and(image.select('swir1').gte(0.12))
.and(image.select('swir2').gte(0.12))
return image.mask(maska.eq(1)).copyProperties(image,['system:time_start','system:time_end'])}
function umbralIndice(image) {
var maska = (image.select('I_Max').gte(ee.Number.parse(app.filters.umbral_I_Max.getValue()))).and(image.select('nir').lt(0.35)).and(image.select('red').gt(image.select('green')))
return image.mask(maska.eq(1)).copyProperties(image,['system:time_start','system:time_end'])}
var mascara = ee.ImageCollection(Mosaico).map(umbralCorrelacion).map(umbralIndice).median().select('I_Max').gte(-10)
var vector = exports.Vector(mascara,AOI)
var vectorD = exports.Vector(mascara,AOI)
var vector_borde = ee.Image().byte().paint({featureCollection: vector.union(),color: 1, width: 1});
var MAP_STYLES = {Dark: [{"featureType": "all","elementType": "labels.text.fill","stylers": [{"saturation": 36},{"color": "#000000"},{"lightness": 40}]},{"featureType": "all","elementType": "labels.text.stroke","stylers": [{"visibility": "on"},{"color": "#000000"},{"lightness": 16}]},{"featureType": "all","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "administrative","elementType": "geometry.fill","stylers": [{"color": "#000000"},{"lightness": 20}]},{"featureType": "administrative","elementType": "geometry.stroke","stylers": [{"color": "#000000"},{"lightness": 17},{"weight": 1.2}]},{"featureType": "administrative","elementType": "labels.text.fill","stylers": [{"visibility": "on"},{"lightness": "32"}]},{"featureType": "administrative.country","elementType": "geometry.stroke","stylers": [{"visibility": "on"},{"weight": "2.28"},{"saturation": "-33"},{"lightness": "24"}]},{"featureType": "landscape","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 20}]},{"featureType": "landscape","elementType": "geometry.fill","stylers": [{"lightness": "0"}]},{"featureType": "landscape","elementType": "labels.text.fill","stylers": [{"lightness": "69"}]},{"featureType": "poi","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 21}]},{"featureType": "road","elementType": "geometry.fill","stylers": [{"lightness": "63"}]},{"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"color": "#2d2d2d"},{"lightness": 17}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#000000"},{"lightness": 29},{"weight": 0.2}]},{"featureType": "road.arterial","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 18}]},{"featureType": "road.local","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 16}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 19}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#0f252e"},{"lightness": 17}]},{"featureType": "water","elementType": "geometry.fill","stylers": [{"lightness": "-100"},{"gamma": "0.00"}]}]}
Map.setOptions('Dark', MAP_STYLES)
//Map.addLayer(Mosaico_Final,{bands:'swir1,nir,red',min: '0, 0, 0', max: '0.5,0.6,0.5'},"Mosaico")
var dataset = ee.Image('UMD/hansen/global_forest_change_2021_v1_9').clip(AOI);
var lossImage = dataset.select(['loss']);
var lossAreaImage = lossImage.multiply(ee.Image.pixelArea()).divide(10000);
var lossYear = dataset.select(['lossyear']);
var lossByYear = lossAreaImage.addBands(lossYear).reduceRegion({reducer: ee.Reducer.sum().group({groupField: 1}),geometry: AOI,scale: 30,maxPixels: 1e9});
var statsFormatted = ee.List(lossByYear.get('groups')).map(function(el) {
    var d = ee.Dictionary(el);
    return [ee.Number(d.get('group')).format("20%02d"), d.get('sum')];
  });
var statsDictionary = ee.Dictionary(statsFormatted.flatten());
var chart = ui.Chart.array.values({array: statsDictionary.values(),axis: 0,xLabels: statsDictionary.keys()}).setChartType('ColumnChart').setOptions({title: 'Pérdida de Bosque Por Año',hAxis: {title: 'Año', format: '####'},vAxis: {title: 'Area (has)'},legend: { position: "none" },lineWidth: 1,pointSize: 3});
//var treeCoverVisParam = {bands: ['treecover2000'],min: 0,max: 100,palette: ['black', 'green']};
//Map.addLayer(dataset, treeCoverVisParam, 'tree cover');
var palettes = require('users/gena/packages:palettes');
var palette = palettes.misc.jet[7];
var treeLossVisParam = {bands: ['lossyear'],min: 0,max: 21,palette: palette};
Map.addLayer(dataset, treeLossVisParam, 'Pérdida de Bosque');
//Map.addLayer(vector_borde,{palette: 'black'},'Resultado');
Map.addLayer(AOI.style({color:'cyan', width:2, fillColor:'00000000'}),{},'Zona');
// app.inspector_intro.widgets().set(1, ui.Label({value:"Descargar Vector",style:{fontWeight: 'bold',border: '1px solid red',padding: '5px 5px 5px 10px',margin: '0px 0px 0px 120px',width:'150px',fontSize:'16px',color:'black',
// backgroundColor:'yellow',position:'bottom-left'}}).setUrl(ee.data.makeTableDownloadUrl(ee.data.getTableDownloadId({table: vectorD, format: 'shp', filename: 'RESULTADO_'+app.SelectedDepartamento}))))
app.inspector_intro.widgets().set(2,ui.Panel([ui.Label('ESTADÍSTICA DE LA PÉRDIDA DEL BOSQUE POR AÑO',{margin: '0px 0 0 15px',fontSize: '14px',fontWeight: 'bold',width:'350px',color: 'red'})], ui.Panel.Layout.flow('horizontal')))
//app.inspector_intro.widgets().set(3, ui.Label('SELECCIONE UN PUNTO EN EL MAPA        ------>', {fontWeight: 'bold',color: 'red', fontSize: '13px',margin: '5px 0 5px 75px'}))
app.inspector_intro.add(chart)
var palettes = require('users/gena/packages:palettes');
var palette = palettes.misc.jet[7];
var Paleta = {min: 2001, max: 2021, palette:palette };
var legend = ui.Panel({style: {position: 'bottom-left'}});
function makeColorBarParams(palette) {
return {bbox: [0, 0, 1, 0.1],dimensions: '200x30',format: 'png',min: 0,max: 1,palette: palette,};}
var colorBar = ui.Thumbnail({image: ee.Image.pixelLonLat().select(0),params: makeColorBarParams(Paleta.palette),style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},});
var legendLabels = ui.Panel({widgets: [ui.Label(Paleta.min, {margin: '4px 8px'}),ui.Label(((Paleta.max+Paleta.min) / 2),{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),ui.Label(Paleta.max, {margin: '4px 8px'})],layout: ui.Panel.Layout.flow('horizontal')});
var legendTitle = ui.Label({value:'Año de la Pérdida del Bosque',style: {fontWeight: 'bold', fontSize: '14px', margin: '0px 0px 4px 10px',padding: '0'}});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
legend.add(legendPanel);
Map.add(legend);
var IMAGEADDED = false
var cur_point;
var refresh_layers = function(point) {
Map.layers().reset();
Map.layers().set(11);
var pointOutline = ee.Image().byte().paint({featureCollection: ee.FeatureCollection(point),color: 1,width: 2});
Map.addLayer(Mosaico_Final,{bands:'swir1,nir,red',min: '0, 0, 0', max: '0.5,0.6,0.5'},"Mosaico")
var dataset = ee.Image('UMD/hansen/global_forest_change_2021_v1_9').clip(AOI);
var treeCoverVisParam = {bands: ['treecover2000'],min: 0,max: 100,palette: ['black', 'green']};
Map.addLayer(dataset, treeCoverVisParam, 'tree cover');
var treeLossVisParam = {bands: ['lossyear'],min: 0,max: 21,palette: ['yellow', 'red']};
Map.addLayer(dataset, treeLossVisParam, 'tree loss year');
Map.addLayer(vector_borde,{palette: 'black'},'Resultado');
Map.addLayer(AOI.style({color:'cyan', width:2, fillColor:'00000000'}),{},'Zona');
Map.addLayer(pointOutline, {palette: 'red'}, 'Punto de Análisis')};
var MAP_STYLES = {Dark: [{"featureType": "all","elementType": "labels.text.fill","stylers": [{"saturation": 36},{"color": "#000000"},{"lightness": 40}]},{"featureType": "all","elementType": "labels.text.stroke","stylers": [{"visibility": "on"},{"color": "#000000"},{"lightness": 16}]},{"featureType": "all","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "administrative","elementType": "geometry.fill","stylers": [{"color": "#000000"},{"lightness": 20}]},{"featureType": "administrative","elementType": "geometry.stroke","stylers": [{"color": "#000000"},{"lightness": 17},{"weight": 1.2}]},{"featureType": "administrative","elementType": "labels.text.fill","stylers": [{"visibility": "on"},{"lightness": "32"}]},{"featureType": "administrative.country","elementType": "geometry.stroke","stylers": [{"visibility": "on"},{"weight": "2.28"},{"saturation": "-33"},{"lightness": "24"}]},{"featureType": "landscape","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 20}]},{"featureType": "landscape","elementType": "geometry.fill","stylers": [{"lightness": "0"}]},{"featureType": "landscape","elementType": "labels.text.fill","stylers": [{"lightness": "69"}]},{"featureType": "poi","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 21}]},{"featureType": "road","elementType": "geometry.fill","stylers": [{"lightness": "63"}]},{"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"color": "#2d2d2d"},{"lightness": 17}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#000000"},{"lightness": 29},{"weight": 0.2}]},{"featureType": "road.arterial","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 18}]},{"featureType": "road.local","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 16}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 19}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#0f252e"},{"lightness": 17}]},{"featureType": "water","elementType": "geometry.fill","stylers": [{"lightness": "-100"},{"gamma": "0.00"}]}]}
Map.setOptions('Dark', MAP_STYLES)
var loadPanel = ui.Panel({style: {position: 'bottom-left', width: '250px', shown: true}});
loadPanel.add(ui.Label('Cargando la imágen Landsat...'))
var lon = ui.Label();
var lat = ui.Label();
Map.onClick(function(coords) {
app.inspector.clear();
app.export.clear();
app.inspector.widgets().set(0, ui.Label({value: 'Espere...',style: {color: 'gray'}}));
var click_point = ee.Geometry.Point(coords.lon, coords.lat); 
var dot = ui.Map.Layer(click_point, {color: 'red'},'Punto de Análisis'); 
app.inspector.widgets().set(0, ui.Label({value: ['Latitud : ' + coords.lat.toFixed(3) +' y'+' Longitud : ' + coords.lon.toFixed(3)],style:{margin: '8px 0 -3px 45px',fontSize: '13px',fontWeight: 'bold',width:'250px',color: 'blue'}}));
})}
app.boot = function() {
app.createConstants();
app.createPanels();
var main = ui.Panel({widgets: [app.logo.panel,app.intro.panel,app.filters.panel,app.inspector_intro,app.inspector_intro2,], style: {width: '400px', padding: '4px',border: '2px solid black'}});
Map.style().set('cursor', 'crosshair');
ui.root.insert(0, main);
var scountry=ee.FeatureCollection(app.Departamento).filter(ee.Filter.eq('COD_CAT', app.SelectedDepartamento));
Map.centerObject(scountry,7)};
var MAP_STYLES = {Dark: [{"featureType": "all","elementType": "labels.text.fill","stylers": [{"saturation": 36},{"color": "#000000"},{"lightness": 40}]},{"featureType": "all","elementType": "labels.text.stroke","stylers": [{"visibility": "on"},{"color": "#000000"},{"lightness": 16}]},{"featureType": "all","elementType": "labels.icon","stylers": [{"visibility": "off"}]},{"featureType": "administrative","elementType": "geometry.fill","stylers": [{"color": "#000000"},{"lightness": 20}]},{"featureType": "administrative","elementType": "geometry.stroke","stylers": [{"color": "#000000"},{"lightness": 17},{"weight": 1.2}]},{"featureType": "administrative","elementType": "labels.text.fill","stylers": [{"visibility": "on"},{"lightness": "32"}]},{"featureType": "administrative.country","elementType": "geometry.stroke","stylers": [{"visibility": "on"},{"weight": "2.28"},{"saturation": "-33"},{"lightness": "24"}]},{"featureType": "landscape","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 20}]},{"featureType": "landscape","elementType": "geometry.fill","stylers": [{"lightness": "0"}]},{"featureType": "landscape","elementType": "labels.text.fill","stylers": [{"lightness": "69"}]},{"featureType": "poi","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 21}]},{"featureType": "road","elementType": "geometry.fill","stylers": [{"lightness": "63"}]},{"featureType": "road.highway","elementType": "geometry.fill","stylers": [{"color": "#2d2d2d"},{"lightness": 17}]},{"featureType": "road.highway","elementType": "geometry.stroke","stylers": [{"color": "#000000"},{"lightness": 29},{"weight": 0.2}]},{"featureType": "road.arterial","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 18}]},{"featureType": "road.local","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 16}]},{"featureType": "transit","elementType": "geometry","stylers": [{"color": "#000000"},{"lightness": 19}]},{"featureType": "water","elementType": "geometry","stylers": [{"color": "#0f252e"},{"lightness": 17}]},{"featureType": "water","elementType": "geometry.fill","stylers": [{"lightness": "-100"},{"gamma": "0.00"}]}]}
Map.setOptions('Dark', MAP_STYLES)
app.boot();