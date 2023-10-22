var m = {};
var access_cen = ee.Image("users/incendiosloja/espindola/access_cen_"); var B1 = access_cen;
var dist_rios_km = ee.Image("users/incendiosloja/espindola/dist_rios_km"); var B2 = dist_rios_km;
var dist_vias_km = ee.Image("users/incendiosloja/espindola/dist_vias_km"); var B3 = dist_vias_km;
var dist_ZA_km = ee.Image("users/incendiosloja/espindola/dist_ZA_km"); var B4 = dist_ZA_km;
var elevacion_km = ee.Image("users/incendiosloja/espindola/elevacion_km"); var B8 = elevacion_km;
var region =ee.FeatureCollection("users/incendiosloja/espindola/espindola_");////límite cantonal///
var parroquias = ee.FeatureCollection("users/incendiosloja/espindola/parroquiasespindola");
var region = region.geometry(); 
var firesVis = { min: 325.0,   max: 400.0,  palette: ['orange', 'yellow', 'red'],}; 
var dataset = ee.ImageCollection('FIRMS');
var c = {};
c.controlPanel = ui.Panel();
c.descargaPanel = ui.Panel ({ style: {position: 'bottom-right', padding: '6px 6px'}});
c.nubesPanel = ui.Panel ({ style: {stretch: 'horizontal', position: 'bottom-right', margin: '4px 4px 4px 4px', padding: '4px 4px 4px 4px',backgroundColor: 'rgba(255, 255, 255, 0.6)'}});
c.nubesPanel.Title = ui.Label({ style: {fontSize: '13px', margin: '2px 2px 2px 2px', padding: '0', stretch: 'horizontal',textAlign: 'center',backgroundColor: 'rgba(255, 255, 255, 0)'}});
c.nubesPanel.subTitle = ui.Label({ style: {fontWeight: 'bold',fontSize: '13px', margin: '2px 2px 2px 2px', padding: '0' , stretch: 'horizontal', textAlign: 'center',backgroundColor: 'rgba(255, 255, 255, 0)'}});
c.nubesPanel.subTitle2 = ui.Label({ style: {fontWeight: 'bold',fontSize: '13px', margin: '2px 2px 2px 2px', padding: '0' , stretch: 'horizontal', textAlign: 'center',backgroundColor: 'rgba(255, 255, 255, 0)'}});
c.descargaPanel.Title = ui.Label({ style: {color: 'blue',fontWeight: 'bold', fontSize: '13px', margin: '2px 2px 2px 2px', stretch: 'horizontal',textAlign: 'center', padding: '0',backgroundColor: 'rgba(255, 255, 255, 0)' }});
c.descargaPanel.subTitle = ui.Label({ style: {fontWeight: 'bold',fontSize: '13px', margin: '2px 2px 2px 2px', padding: '0' , stretch: 'horizontal', textAlign: 'center',backgroundColor: 'rgba(255, 255, 255, 0)'}});
c.descargaPanel.subTitle2 = ui.Label({ style: {fontWeight: 'bold',fontSize: '13px', margin: '2px 2px 2px 2px', padding: '0' , stretch: 'horizontal', textAlign: 'center',backgroundColor: 'rgba(255, 255, 255, 0)'}});
c.dividers = {};
c.dividers.divider1 = ui.Panel();
c.dividers.divider2 = ui.Panel();
c.dividers.divider3 = ui.Panel();
c.dividers.divider4 = ui.Panel();
c.dividers.divider5 = ui.Panel();
c.map = ui.Map(); 
c.info = {};
c.info.aboutLabel = ui.Label(
  'Este proyecto muestra, los resultados del nivel de ocurrencia para incendios forestales en el cantón Espíndola, aplicando  un modelo estadístico confiable.');
c.info.directorLabel = ui.Label('Director del proyecto:');
c.info.frreyesLabel = ui.Label({
  value: ' Fabián Reyes-Bueno',
  targetUrl: 'https://investigacion.utpl.edu.ec/frreyes'
});
c.info.analistaLabel = ui.Label('Analistas geoespaciales:');
c.info.jilojanLabel = ui.Label({
  value: ' Julia Loján-Córdova',
  targetUrl: 'https://www.linkedin.com/in/julia-loj%C3%A1n-c%C3%B3rdova-610a68112/'
});
c.info.fgonzalezLabel = ui.Label({
  value: ' Fernando González',
  targetUrl: 'https://unl.edu.ec/investigacion/centro-de-estudios-territoriales'
});
c.websiteLabel = ui.Label('Puedes descargar el informe en el '); //,{width: '350px'}
c.info.websiteLabel = ui.Label({
  value: ' siguiente link',
  targetUrl: 'https://ia601507.us.archive.org/11/items/informe-modelos-susceptibilidad-visor/Informe%20modelos%20susceptibilidad%20%28visor%29.pdf'
});
c.info.panel = ui.Panel([c.info.aboutLabel]);
c.directorpanel = ui.Panel([c.info.directorLabel, c.info.frreyesLabel],ui.Panel.Layout.Flow('horizontal'),{width: '350px'});
c.analistapanel = ui.Panel([c.info.analistaLabel],ui.Panel.Layout.Flow('horizontal'),{width: '350px'});
c.analistapanel2 = ui.Panel([ c.info.jilojanLabel, c.info.fgonzalezLabel],ui.Panel.Layout.Flow('horizontal'));
c.info. websitepanel = ui.Panel([c.websiteLabel, c.info.websiteLabel],ui.Panel.Layout.Flow('horizontal'),{height:'30px', width: '285px', margin: '20px 0px 0px 58px',padding: '5px',backgroundColor: 'rgba(255, 195, 0, 0.2)'});
c.controlPanel = ui.Panel();
c.selectaDate = {};
c.selectaDate.aboutLabel = ui.Label({value:
  'INSTRUCCIONES PARA CONSULTAR INFORMACIÓN EN ESTA HERRAMIENTA ', style:{
    stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '15px'}});  
c.selectaDate.aboutLabel2 = ui.Label({
  value: '1) Diríjase al calendario Sentinel 2 y consulte la fecha que desea configurar (color rojo)', style:{
    stretch: 'horizontal', fontWeight: 'bold', fontSize: '13px', textAlign: 'justify'}});  
  c.selectaDate.aboutLabel3 = ui.Label({
  value: '(recuerde que se actualizan cada 5 días)', style:{
    stretch: 'horizontal', fontWeight: 'normal', fontSize: '11px', textAlign: 'right', color: 'black'}});  
      c.selectaDate.aboutLabel4 = ui.Label({
  value: '2) Seleccione el día, mes y año correspondiente y elija un porcentaje de nubes permitidas en la imagen', style:{
    stretch: 'horizontal', fontWeight: 'bold', fontSize: '13px', textAlign: 'justify'}});  
c.selectaDate.aboutLabel5 = ui.Label({
  value: '3) Elija un porcentaje de nubes permitidas en la imagen', style:{
    stretch: 'horizontal', fontWeight: 'bold', fontSize: '13px', textAlign: 'justify'}}); 
    c.selectaDate.aboutLabel6 = ui.Label({
  value: '4) Presione el botón "Calcular" para generar el mapa de susceptibilidad:', style:{
    stretch: 'horizontal', fontWeight: 'bold', fontSize: '13px', textAlign: 'justify'}}); 
c.selectaDate.aboutLabel7 = ui.Label({
  value: 'NOTA: Si desea consultar una nueva fecha o cambiar el porcentaje de nubes permitidas, recuerde presionar el botón "Calcular" después de configurar los parámetros', style:{
    stretch: 'horizontal', fontWeight: 'normal', fontSize: '10px', color: 'black', textAlign: 'justify'}}); 
  c.selectaDate.aboutLabel8 = ui.Label({
  value: 'Cuando el mapa de susceptibilidad se visualice en la pantalla, notará cambios en el cuadro de la esquina inferior derecha: (1) el porcentaje total del cantón cubierto por nubes en la fecha seleccionada, (2) la fecha seleccionada, (3) el porcentaje de nubes permitido (que usted seleccionó previamente), y, (4) un enlace para descargar la capa en formato .GEOTIFF (si desea cambiar el nombre del archivo, haga click derecho sobre el texto en azul "Descargue la capa Geotiff" y posteriormente en la opción "Guardar vínculo como:")', style:{
    stretch: 'horizontal', fontWeight: 'normal', fontSize: '11px', textAlign: 'justify', color: 'black'}});  
c.selectaDate.label = ui.Label('Seleccione el día (1-31):');
c.selectaDate.slider = ui.Slider({
  min: 1,
  max: 31,
  step: 1
});
var days = {
  1: 1, 2:2,3:3,4:4,5:5, 6:6, 7:7, 8:8, 9:9, 10:10,
  11:11,12:12,13:13,14:14,15:15,16:16,17:17,18:18,19:19,20:20, 
  21:21,22:22,23:23,24:24,25:25, 26:26, 27:27,28:28,29:29,30:30,31:31
};
   c.selectaDate.selector = ui.Select({
  items: Object.keys(days),
  placeholder:'Día',
});
   c.selectaDate2 = {};
c.selectaDate2.label = ui.Label('Seleccione el mes (1-12):');
c.selectaDate2.slider = ui.Slider({
  min: 1,
  max: 12,
  step: 1
});
    var meses = {
 'enero': 1,
  'febrero': 2,
  'marzo': 3,
 'abril':4,
  'mayo':5,
  'junio':6,
  'julio':7,
  'agosto':8,
  'septiembre':9,
  'octubre': 10,
  'noviembre': 11, 
  'diciembre':12
};
   c.selectaDate2.selector = ui.Select({
  items: Object.keys(meses),
  placeholder:'Mes',
});
   c.selectaDate3 = {};
c.selectaDate3.label = ui.Label('Seleccione el año (a partir de 2018):');
c.selectaDate3.slider = ui.Slider({
  min: 2018,
  max: 2026,
  step: 1
});
var years = {
  2018: 2018,
  2019: 2019,
  2020: 2020,
  2021:2021,
  2022:2022,
  //2023:2023,
  //2024:2024,
  //2025:2025,
  //2026:2026,
};
c.selectaDate3.selector = ui.Select({
  items: Object.keys(years),
  placeholder:'Año',
});
c.selectaDate.panel = ui.Panel([c.selectaDate.label, c.selectaDate.slider]);
c.selectaDate2.panel = ui.Panel([c.selectaDate2.label, c.selectaDate2.slider]);
c.selectaDate3.panel = ui.Panel([c.selectaDate3.label, c.selectaDate2.slider]);
c.permisividadnubes = {};
c.permisividadnubes.label = ui.Label('Seleccione el porcentaje de nubes de la imagen Sentinel 2:');
c.permisividadnubes.selector = ui.Slider({
  min: 0,
  max: 100,
  step: 5
});
var nubesper = {0:0, 5:5,10:10,15:15,20:20,25:25,30:30,35:35, 40:40};
c.permisividadnubes.selector2 = ui.Select({
  items: Object.keys(nubesper),
  placeholder:'Cloud Probability',
  });
c.permisividadnubes.panel = ui.Panel([c.permisividadnubes.label, c.permisividadnubes.selector2]);
c.info.paperLabel = ui.Label({
  value: 'Consulte las fechas Sentinel 2 disponibles',
  targetUrl: 'https://ia601400.us.archive.org/26/items/fechas-imagenes-sentinel-2-disponibles-para-ecuador-dic-18-nov-22/Fechas_im%C3%A1genes_Sentinel_2_disponibles_para_Ecuador_Dic18_Nov22.pdf'
});
c.datePanel = ui.Panel([c.selectaDate.aboutLabel],ui.Panel.Layout.Flow('vertical'),{width: '350px'});
c.calendarioPanel = ui.Panel([c.selectaDate.aboutLabel2,c.info.paperLabel, c.selectaDate.aboutLabel3, c.selectaDate.aboutLabel4],ui.Panel.Layout.Flow('vertical'),{textAlign: 'center', width: '350px'});
c.datePanel2 = ui.Panel([c.selectaDate.aboutLabel2],ui.Panel.Layout.Flow('horizontal'));
c.datePanel3 = ui.Panel([ c.selectaDate.selector, c.selectaDate2.selector, c.selectaDate3.selector, c.permisividadnubes.selector2],
ui.Panel.Layout.Flow('horizontal'));
var s2Sr = ee.ImageCollection('COPERNICUS/S2_SR'); 
var s2Clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY');
var mapPanel = ui.Panel([
      ui.Panel([c.map], null, {stretch: 'both'})   ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
var legend = ui.Panel([],ui.Panel.Layout.Flow('vertical'), {position: 'bottom-left', margin: '0px 0px 8px 0px', height: '190px', width: '200px', textAlign: 'left', backgroundColor: 'rgba(255, 255, 255, 1)', border: '1px solid black'});
c.datePanel = ui.Panel([c.selectaDate.aboutLabel],ui.Panel.Layout.Flow('vertical'),{width: '350px'});
var legendTitle = ui.Label({ value: 'Grado de Susceptibilidad a Incendios',
  style: {height: '35px', width: '160px',color: 'black', stretch: 'horizontal', fontWeight: 'bold', fontSize: '12px', margin: '0px 0px 4px 8px', padding: '0px' ,backgroundColor: 'rgba(255, 255, 255, 0)'}});
var leyendaTitle = ui.Label({ value: 'SIMBOLOGÍA',
  style: {height: '30px', width: '165px',textAlign: 'center',stretch: 'horizontal',fontWeight: 'bold', fontSize: '15.5px', margin: '0px 0px 4px 0px', padding: '2px 2px 2px 2px' ,backgroundColor: 'rgba(255, 255, 255, 0)'}});
legend.add(leyendaTitle).add(legendTitle);
 var makeRow = function(color, name) {var colorBox = ui.Label({style: {backgroundColor:'#' + color,padding: '8px', margin: '0px'}});
      var description = ui.Label({value: name, style: {width: '140px',fontSize: '12px', margin: '1px 1px 1px 8px',backgroundColor: 'rgba(255, 255, 255, 0.6)'}});
       return ui.Panel({  widgets: [colorBox, description],layout: ui.Panel.Layout.Flow('horizontal') })};
var palette =['2c7bb6', 'abd9e9','fecc5c','fd8d3c','d7191c','ffffffff'];
var names = ['Probabilidad Muy Baja','Probabilidad Baja','Probabilidad Media', 'Probabilidad Alta','Probabilidad Muy Alta', 'Sin Datos'];
for (var i = 0; i < 6; i++) {  legend.add(makeRow(palette[i], names[i]));  } //c.map.add(legend);
var TituloMapa = ui.Label({ value: 'Mapa de Susceptibilidad a Incendios Forestales, cantón Espíndola',
  style: {position: 'top-center', fontWeight: 'bold', fontSize: '16px', border: '0.5px solid black',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  fontFamily: 'arial', width: '600px', TextAlign:'center'}}); c.map.add(TituloMapa); 
c.controlPanel.add(c.info.panel);
c.controlPanel.add(c.directorpanel);
c.controlPanel.add(c.analistapanel);
c.controlPanel.add(c.analistapanel2);
c.controlPanel.add(c.info. websitepanel);
c.controlPanel.add(c.dividers.divider2);
c.controlPanel.add(c.datePanel);
c.controlPanel.add(c.calendarioPanel);
c.controlPanel.add(c.datePanel3);
var nubesPanel = c.nubesPanel.add(c.nubesPanel.Title).add(c.nubesPanel.subTitle).add(c.nubesPanel.subTitle2).add(c.descargaPanel.Title);
c.map.add(nubesPanel);
ui.root.clear();
ui.root.add(c.controlPanel);
ui.root.add(c.map);
var s = {};
 c.controlPanel.style().set({
  width: '400px',
  padding: '20px', 
  });
s.opacityWhiteMed = {
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
};
s.opacityWhiteNone = {
  backgroundColor: 'rgba(255, 255, 255, 0)'
};
s.aboutText = {
  fontSize: '13px',
  color: 'black', 
  };
s.aboutText2 = {
  fontSize: '13px',
  color: 'red', 
  fontFamily: 'arial',
  fontWeight:'bold',
  textAlign:'center' ,
  backgroundColor: 'white',
};
s.aboutText3 = {
  fontSize: '12px',
  color: 'blue', 
  fontFamily: 'arial',
  textAlign:'left' ,
  textDecoration:'underline',
  padding: '0px 10px 0px 1px',
  margin: '0px 5px 0px 1px',
  backgroundColor: 'rgba(255, 195, 0, 0)'
};
s.aboutText5 = {
  fontSize: '12px',
  color: 'blue', 
  fontFamily: 'arial',
  textAlign:'right' ,
  textDecoration:'underline',
  stretch: 'horizontal'
};
s.aboutText4 = {
  fontSize: '13px',
  color: 'black', 
  stretch: 'horizontal',
  textAlign: 'justify', 
  whiteSpace: 'pre-line'
};
s.aboutText6 = {
  fontSize: '12px',
  color: 'black', 
  fontFamily: 'arial',
  textAlign:'left' ,
  fontWeight: 'bold',
  stretch: 'horizontal'
};
s.aboutText7 = {
  fontSize: '12px',
  color: 'black', 
  fontFamily: 'arial',
  textAlign:'right' ,
  padding: '0px 0px 0px 5px',
  margin: '0px 0px 0px 5px',
  backgroundColor: 'rgba(255, 195, 0, 0)'
 };
s.aboutText8 = {
  fontSize: '12px',
  color: 'blue', 
  fontFamily: 'arial',
  textAlign:'right' ,
  textDecoration:'underline',
  stretch: 'horizontal'
};
s.widgetTitle = {
  fontSize: '15px',
  fontWeight: 'bold',
  margin: '8px 8px 0px 8px',
  color: '383838', 
};
s.sliderTitle = {
  fontSize: '13px',
  fontWeight: 'bold',
  margin: '8px 8px 0px 8px',
  color: 'black', 
};
s.stretchHorizontal = {
  stretch: 'horizontal'
};
s.noTopMargin = {
  margin: '0px 8px 8px 8px'
};
s.smallBottomMargin = {
  margin: '8px 8px 4px 8px'
};
s.bigTopMargin = {
  margin: '24px 8px 8px 8px'
};
s.divider = {
  backgroundColor: 'F0F0F0',
  height: '4px',
  margin: '20px 0px'
};
c.info.aboutLabel.style().set(s.aboutText4);
c.info.paperLabel.style().set(s.aboutText8);
c.info.paperLabel.style().set(s.smallBottomMargin);
c.websiteLabel.style().set(s.aboutText7);
c.info.websiteLabel.style().set(s.aboutText3);
c.info.frreyesLabel.style().set(s.aboutText5);
c.info.directorLabel.style().set(s.aboutText6);
c.info.jilojanLabel.style().set(s.aboutText5);
c.info.fgonzalezLabel.style().set(s.aboutText5);
c.info.analistaLabel.style().set(s.aboutText6);
c.selectaDate.slider.style().set(s.stretchHorizontal);
c.selectaDate.label.style().set(s.sliderTitle);
c.selectaDate2.slider.style().set(s.stretchHorizontal);
c.selectaDate2.label.style().set(s.sliderTitle);
c.selectaDate3.slider.style().set(s.stretchHorizontal);
c.selectaDate3.label.style().set(s.sliderTitle);
c.permisividadnubes.selector.style().set(s.stretchHorizontal);
c.permisividadnubes.label.style().set(s.sliderTitle);
Object.keys(c.dividers).forEach(function(key) {
  c.dividers[key].style().set(s.divider);
});
  var boton = ui.Button({
  label: 'Calcular',
  onClick: function updateMap(){
var dia = c.selectaDate.selector.getValue() ; 
var dia2 = ee.Number.parse(dia);
var mes = c.selectaDate2.selector.getValue();  
var mes2 = mes.replace('enero','1').replace('febrero', '2').replace('marzo','3').replace('abril','4').replace('mayo','5').replace('junio','6')
.replace('julio','7').replace('agosto','8').replace('septiembre','9').replace('octubre','10').replace('noviembre', '11').replace('diciembre','12');
var mes3 = ee.Number.parse(mes2);
var año = c.selectaDate3.selector.getValue(); 
var año2 = ee.Number.parse(año);
var  MAX_CLOUD_PROBABILITY = c.permisividadnubes.selector2.getValue(); 
var perminubes = ee.Number.parse(MAX_CLOUD_PROBABILITY);
var START_DATE = ee.Date.fromYMD(año2, mes3, dia2); 
var END_DATE = START_DATE.advance ( 1, 'day');
function focosdecalor1(){
var fecha1_FC = START_DATE.advance(1, 'day');
var fecha2_FC = START_DATE.advance(-7,'day');
var dataset = ee.ImageCollection('FIRMS').filter(ee.Filter.date(fecha2_FC, fecha1_FC));
var fires = dataset.select('T21');
return fires}
var fires = focosdecalor1();
function focosdecalor3(){
var fecha4_FC = START_DATE.advance(-12,'day');
var fecha1_FC = START_DATE.advance(1, 'day');
var dataset3 = ee.ImageCollection('FIRMS').filter(
    ee.Filter.date(fecha4_FC, fecha1_FC));
var fires3 = dataset3.select('T21');
return fires3}
var fires3 = focosdecalor3();
function maskClouds(img) {var clouds = ee.Image(img.get('cloud_mask')).select('probability');  var isNotCloud = clouds.lt(perminubes);  return img.updateMask(isNotCloud);}
function maskEdges(s2_img) {return s2_img.updateMask( s2_img.select('B8A').mask().updateMask(s2_img.select('B9').mask()));}
var criteria = ee.Filter.and(ee.Filter.bounds(region), ee.Filter.date(START_DATE, END_DATE));
var s2S = s2Sr.filter(criteria).map(maskEdges);
var s2Cloud = s2Clouds.filter(criteria);
var s2SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({ primary: s2S,  secondary: s2Cloud,  condition: ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})});
var s2 =  ee.ImageCollection(s2S).median().clip(region);
var s2CloudMasked =     ee.ImageCollection(s2SrWithCloudMask).map(maskClouds).median().clip(region);
var mask_S2 = s2CloudMasked.select('B3');
var unmask_S2 = s2.select('B3');
var rgbVis = {min: 0, max: 3000, bands: ['B4', 'B3', 'B2']};
var layer1 = ui.Map.Layer(
    s2, rgbVis, 'S2 without cloudmasking',     false);
  c.map.layers().set(0, layer1);
var layer2 = ui.Map.Layer(
    s2CloudMasked, rgbVis, 'S2 SR masked at ' + MAX_CLOUD_PROBABILITY + '%', false);
  c.map.layers().set(1, layer2);
function LMT_Espindola (){
 var BSI = s2CloudMasked.expression ('float(((Red+SWIR)-(NIR+Blue))/((Red+SWIR)+(NIR+Blue)))',
{'Red':s2CloudMasked.select('B11'), 'NIR': s2CloudMasked.select('B8'),
'SWIR': s2CloudMasked.select('B4'), 'Blue': s2CloudMasked.select('B2')}); var B5 = BSI;
var Moisture = s2CloudMasked.normalizedDifference (['B8A', 'B11']); var B7 = Moisture;
var NDVI = s2CloudMasked.normalizedDifference (['B8', 'B4']); var B6 = NDVI;
var bandas = B1.addBands(B2).addBands(B3).addBands(B4).addBands(B5).addBands(B6).addBands(B7).addBands(B8).rename('B1','B2','B3','B4','B5','B6','B7','B8');
var Logit_LMT = bandas.expression(
    'float(-3.92720 + (0.02351*B1) + (-3.56308 * B2) + (3.86546 * B3)+ (-3.12801 * B4)+ (-25.92952 * B5)+ (-6.64139 * B6)+ (-38.61783 * B7)+ (4.48976 * B8)) ', 
    {'B1': bandas.select('B1'), 'B2': bandas.select('B2'),'B3': bandas.select('B3'),'B4': bandas.select('B4'), 'B5': bandas.select('B5'),'B6': bandas.select('B6'),'B7': bandas.select('B7'),'B8': bandas.select('B8')});
var Probabilidad_LMT = bandas.expression(
    '((1)/(1+(2.71828182845904 **(Logit * -1))))',
    {'Logit': Logit_LMT});
var Reclasificado_LMT = ee.Image(1).where(Probabilidad_LMT.lte(0.2),1).where(Probabilidad_LMT.gt(0.2).and(Probabilidad_LMT.lte(0.4)),2)
    .where(Probabilidad_LMT.gt(0.4).and(Probabilidad_LMT.lte(0.6)),3).where(Probabilidad_LMT.gt(0.6).and(Probabilidad_LMT.lte(0.8)),4).where(Probabilidad_LMT.gt(0.8),5);
var Reclas_LMT = Reclasificado_LMT.toDouble().updateMask(mask_S2); 
var generalizad_LMT = Reclas_LMT.reduceNeighborhood({
  reducer: ee.Reducer.mode(),   kernel: ee.Kernel.square({radius: 0.5,  units: 'pixels', normalize: false})});
var generalizado_LMT = generalizad_LMT.toInt().clip(region); 
return generalizado_LMT ; }
var Reclasi_final_LMT = LMT_Espindola ();
var paleta = {    max: 5, min: 1,   'palette': ['2c7bb6', 'abd9e9','fecc5c','fd8d3c','d7191c']}; 
var layer3 = ui.Map.Layer(
    Reclasi_final_LMT, paleta, 'Susceptibilidad IF' + dia + '-'+ mes + '-'+ año +'Permisividad de nubes: '+MAX_CLOUD_PROBABILITY+ ' %', true);
  c.map.layers().set(2, layer3);
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: parroquias,
  color: 1,
  width: 2
});
var layer4 = ui.Map.Layer(
    outline,{palette: '000000'},'Límites parroquiales', true);
  c.map.layers().set(3, layer4);
var registrosIF = ee.FeatureCollection("users/incendiosloja/Eventos_2010_2021_inf");
var style = registrosIF.style({
  color:'black', width: 1, pointSize: 4, pointShape: 'triangle', fillColor: 'yellow'
});
  var layer5 = ui.Map.Layer(
    style,null,'Registro históricos SNGRE', false);
  c.map.layers().set(4, layer5);
  /*var layer6 = ui.Map.Layer(buffer_vias, {min: 0, max: 1, palette: ['00A600','63C600']}, 'vias', false);
  c.map.layers().set(5,layer6);*/
  var layer_7 = ui.Map.Layer(fires, firesVis, 'Focos de calor (últimos 7 días)',false);
  c.map.layers().set(5,layer_7);
  var layer_8 = ui.Map.Layer(fires3, firesVis, 'Focos de calor (últimos 14 días)',false);
  c.map.layers().set(6,layer_8);
var getnonube = ee.Number(mask_S2.multiply(ee.Image.pixelArea())
                .reduceRegion(ee.Reducer.sum(),region,10,null,null,false,1e13).get('B3'));
     var getnonubes = ee.Number(getnonube).divide(1e7)   ;
var gettota = ee.Number(unmask_S2.multiply(ee.Image.pixelArea())
                .reduceRegion(ee.Reducer.sum(),region,10,null,null,false,1e13).get('B3'));
     var gettotal = ee.Number(gettota).divide(1e7)   ;
var total = ee.Number(65317.443);
var getnubes = gettotal.subtract(getnonubes);
var porcentajeNubes = ((getnubes.multiply(100)).divide(gettotal)).int().getInfo(); 
var URLDescarga = Reclasi_final_LMT.getDownloadURL( {
  name: 'Susceptibilidad a Incendios Forestales',
  scale: 35,
  crs:'EPSG:32717',
  region: region,
  filePerBand: false,
  format: "GEO_TIFF",
}); 
  c.nubesPanel.Title.setValue (porcentajeNubes +'%  (NUBES)');
  c.nubesPanel.subTitle.setValue ('Fecha: '+ ' '+ dia + ' / ' + mes + ' / '+ año);
  c.nubesPanel.subTitle2.setValue ('Permisividad de nubes: '+ MAX_CLOUD_PROBABILITY + ' %');
  c.descargaPanel.Title.setValue('Descargue la capa Geotiff');
  c.descargaPanel.Title.setUrl(URLDescarga);
    c.selectaDate.selector.onChange(updateMap); 
c.selectaDate2.selector.onChange(updateMap);
c.selectaDate3.selector.onChange(updateMap);
c.permisividadnubes.selector2.onChange(updateMap);
c.selectaDate.selector.unlisten(); 
c.selectaDate2.selector.unlisten();
c.selectaDate3.selector.unlisten();
c.permisividadnubes.selector2.unlisten();}
  });
 boton.style().set({
  width: '300px',
  border:'1px outset black'
  });
c.controlPanel.add(c.selectaDate.aboutLabel6).add(boton).add(c.selectaDate.aboutLabel7);
c.controlPanel.add(c.dividers.divider3);
c.controlPanel.add(c.selectaDate.aboutLabel8)
c.map.add(legend);
c.map.centerObject(region);
c.map.setOptions('ROADMAP');
c.nubesPanel.Title.setValue('Porcentaje de nubes en la imagen S2');
c.nubesPanel.subTitle.setValue('Fecha de la imagen S2');
c.nubesPanel.subTitle2.setValue('Permisividad de nubes');
c.descargaPanel.Title.setValue('Link de descarga');