/*******************************************************************************
 * 1. MODEL *
  * A section to define information about the data being presented in your app.
 * Guidelines: Use this section to import assets and define information that are used to parameterize 
 * data-dependant widgets and control style and behavior on UI interactions.
   *******************************************************************************/
   // Define a JSON object for storing the data model.
var m = {};
var access_cen = ee.Image("users/incendiosloja/Quilanga/access_cenQ"); var B1 = access_cen; 
var dist_ZAkm = ee.Image("users/incendiosloja/Quilanga/dist_ZAkm"); var B2 = dist_ZAkm;
var dist_rioskm = ee.Image("users/incendiosloja/Quilanga/dist_rioskm"); var B3 = dist_rioskm;
var dist_viaskm = ee.Image("users/incendiosloja/Quilanga/dist_viaskm"); var B4 = dist_viaskm;
var raster_Quilanga = ee.Image("users/incendiosloja/Quilanga/rasterQuilanga"); var B8= raster_Quilanga;
var region =ee.FeatureCollection("users/lojanjulia/GP_oct21_feb22/Quilanga");////límite cantonal///
var s2Sr = ee.ImageCollection('COPERNICUS/S2_SR'); 
var s2Clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY');
var region = region.geometry(); 
var parroquias = ee.FeatureCollection("users/lojanjulia/ParroquiasQuilanga");
/*******************************************************************************
 * 2. COMPONENTS *
 * A section to define the widgets that will compose your app.
  * Guidelines:
 * 1. Except for static text and constraints, accept default values;
 *    initialize others in the initialization section.
 * 2. Limit composition of widgets to those belonging to an inseparable unit
 *    (i.e. a group of widgets that would make no sense out of order).
 ******************************************************************************/
// Define a JSON object for storing UI components.
var c = {};
/*var logo = ee.Image("users/lojanjulia/modificado2").visualize({
  bands:  ['b1', 'b2', 'b3'],
  min: 0,
  max: 255
});
var branding = ui.Thumbnail({image:logo,
params:{dimensions: '300x100',format: 'png'},
style:{height: '150px', width: '340px',padding :'0px 0px 0px 25px'}});*/
// Define a control panel for user input.
c.controlPanel = ui.Panel();
c.descargaPanel = ui.Panel ({ style: {position: 'bottom-right', padding: '6px 6px'}});
c.nubesPanel = ui.Panel ({ style: {stretch: 'horizontal', position: 'bottom-right', margin: '4px 4px 4px 4px', padding: '4px 4px 4px 4px',backgroundColor: 'rgba(255, 255, 255, 0.6)'}});
//Info dentro de los paneles de descarga y nubes
c.nubesPanel.Title = ui.Label({ style: {fontSize: '13px', margin: '2px 2px 2px 2px', padding: '0', stretch: 'horizontal',textAlign: 'center',backgroundColor: 'rgba(255, 255, 255, 0)'}});
c.nubesPanel.subTitle = ui.Label({ style: {fontWeight: 'bold',fontSize: '13px', margin: '2px 2px 2px 2px', padding: '0' , stretch: 'horizontal', textAlign: 'center',backgroundColor: 'rgba(255, 255, 255, 0)'}});
c.nubesPanel.subTitle2 = ui.Label({ style: {fontWeight: 'bold',fontSize: '13px', margin: '2px 2px 2px 2px', padding: '0' , stretch: 'horizontal', textAlign: 'center',backgroundColor: 'rgba(255, 255, 255, 0)'}});
c.descargaPanel.Title = ui.Label({ style: {color: 'blue',fontWeight: 'bold', fontSize: '13px', margin: '2px 2px 2px 2px', stretch: 'horizontal',textAlign: 'center', padding: '0',backgroundColor: 'rgba(255, 255, 255, 0)' }});
c.descargaPanel.subTitle = ui.Label({ style: {fontWeight: 'bold',fontSize: '13px', margin: '2px 2px 2px 2px', padding: '0' , stretch: 'horizontal', textAlign: 'center',backgroundColor: 'rgba(255, 255, 255, 0)'}});
c.descargaPanel.subTitle2 = ui.Label({ style: {fontWeight: 'bold',fontSize: '13px', margin: '2px 2px 2px 2px', padding: '0' , stretch: 'horizontal', textAlign: 'center',backgroundColor: 'rgba(255, 255, 255, 0)'}});
// Define a series of panel widgets to be used as horizontal dividers.
c.dividers = {};
c.dividers.divider1 = ui.Panel();
c.dividers.divider2 = ui.Panel();
c.dividers.divider3 = ui.Panel();
c.dividers.divider4 = ui.Panel();
c.dividers.divider5 = ui.Panel();
// Define the main interactive map.
c.map = ui.Map(); 
// Define an app info widget group.
c.info = {};
//c.info.titleLabel = ui.Label('Mapa de Susceptibilidad a Incendios Forestales en el cantón Quilanga');
c.info.aboutLabel = ui.Label(
  'Este proyecto muestra, los resultados del nivel de ocurrencia para incendios forestales en el cantón Quilanga, aplicando  un modelo estadístico confiable.');
c.info.directorLabel = ui.Label('Director del proyecto:');
c.info.frreyesLabel = ui.Label({
  value: ' Fabián Reyes-Bueno',
  targetUrl: 'https://investigacion.utpl.edu.ec/frreyes'
});
c.info.analistaLabel = ui.Label('Analista geoespacial:');
c.info.jilojanLabel = ui.Label({
  value: ' Julia Loján-Córdova',
  targetUrl: 'https://www.linkedin.com/in/julia-loj%C3%A1n-c%C3%B3rdova-610a68112/'
});
c.websiteLabel = ui.Label('Puedes descargar el informe en el '); //,{width: '350px'}
c.info.websiteLabel = ui.Label({
  value: ' siguiente link',
  targetUrl: 'https://ago-item-storage.s3.us-east-1.amazonaws.com/12f7bf97252e463aa3108847cc83adcb/Informe_Modelo_de_Susceptibilidad.pdf?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBYaCXVzLWVhc3QtMSJHMEUCIHXy8O7LRYv4UwRf0uNYBW3aRwztxbXGKsq7lgjAadKqAiEA%2Bsik%2Be8gRq6E4%2FxiWLcOhYC3Wf7hI4zWzx26RkTCrTMq0wQIHxAAGgw2MDQ3NTgxMDI2NjUiDJHTGOqp6%2BIhw8W4NSqwBHQMYZNjuUwHeZnygMvYFuhSBNhKFbnjgOmXfWFvudoMcUOiWwoi4gQ5trOU0wu4PBCsadlBuuobyfM8bSEUhsficCnhvnS7GRdeEl4WzGDZVJJDDD%2FFUn31WVmwCMKyI%2BRRTKBPciBEAt5%2F4LEJMZSurvTmCqjKVXvU48LovFYYuJhBL0Qg%2FQ3neg8GjX8XWOXfqalA7ChAuVbJMfsNTTtlrWYWpG1f9htbfzgwtU6XtpVI97uWorAyupv04wRMo1Cq6LP%2FV8blofb0NbUpzwcP%2FxlMpCOetbNLU2dLoikMTlwm7UrSh252z2LslD4mLBzMh7B9iTbNetcRsDiUU50wEtCIfImzr4DNdlFIjZ1IQEJK3qtQ3YlNserJdzpNm9ilCALzz1t2EyA68Fou0uZqMITsvsebg%2FMOoO9WOQ5%2FbYaw5KtZP%2BRIvAbMLEhLkTVBSTr1DUTMGyQS3CAc9UIcYFxiYpm2ZPXSmFLIOiy4fwFmSz0yMpqbpHhOtZklKxQdDe1dJ8kWjfAneh4gkk5rUONWGB5Cjo1Q0jmJw0PalBF2lZxW%2FZLfwPcmUz%2BkUGi%2FR25mir5WZQYR%2BmE1iu7gaHR4g07GtRfwxPBDPOB%2B4H4czyZY9A9xMO%2FWpjw4%2F0D4onSRB3lV9ROxlzxDpwzoxsLMM2zC438ZOJigTY3RCkA8tgSIuKnxsYS4XCoyWAfXRRgpULHtkr%2B2%2B%2BRf9FvW%2F1%2Fu5VhLbCF0Hk%2BFr2UEMMLXiZUGOqkBCZKuOAeS4DZa2n84eXjL5V92UqYuIzr47fhf%2FFC5V%2FrvYeOdrp%2FDJ%2FtpSQjH6MAX656d%2BWvsxYIeg%2FoA9x064%2FEfUPAIv6veR1eXUe%2BQ%2Bg64lsPnnUki82E9GJOjj%2FiXcIQtizTOOtJlWQp5YZrIuoHpECQLY6XRrk8A6hT2gS%2BU6wkALycQdHfDiXHk%2BfnwiwVb1qwQ1xXwqkK%2F83taLvYAXOKxNTVixw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20220609T224343Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAYZTTEKKERDU44I5J%2F20220609%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=9759f7e537887dabdafecd4c5fa44d96388054a377ad6c1b4d605014ce1bb93d'
});
c.info.panel = ui.Panel([c.info.aboutLabel]);
c.directorpanel = ui.Panel([c.info.directorLabel, c.info.frreyesLabel],ui.Panel.Layout.Flow('horizontal'),{width: '350px'});
c.analistapanel = ui.Panel([c.info.analistaLabel, c.info.jilojanLabel],ui.Panel.Layout.Flow('horizontal'),{width: '350px'});
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
  value: 'Cuando el mapa de susceptibilidad se visualiza en la pantalla, notará cambios en el cuadro de la esquina inferior derecha: (1) el porcentaje total del cantón cubierto por nubes en la fecha seleccionada, (2) la fecha seleccionada, (3) el porcentaje de nubes permitido (que usted seleccionó previamente), y, (4) un enlace para descargar la capa en formato .GEOTIFF (si desea cambiar el nombre del archivo, haga click derecho sobre el texto en azul "Descargue la capa Geotiff" y posteriormente en la opción "Guardar vínculo como:")', style:{
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
print (days);
var dia5 = 5;
print (dia5);
var dia6 = '6';
print (dia6);
var dia7 = ee.Number.parse(dia6);
print (dia7);
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
print (meses);
var mesess = ee.Dictionary(meses);
print (mesess);
     var from = ['enero','febrero', 'marzo','abril','mayo','junio','julio','agosto',
'septiembre', 'octubre', 'noviembre','diciembre'];
//print(from);
var to = ['1','2','3','4','5','6','7','8','9','10','11','12'];
//print(to);
var fromto = mesess.rename(from, to); print (fromto);
//meses.replace('enero', 1).replace('febrero', 2).replace('marzo', 3).replace('abril', 4).replace('mayo', 5).replace('junio', 6)
//.replace('julio', 7).replace('agosto', 8).replace('septiembre', 9).replace('octubre', 10).replace('noviembre', 11).replace('diciembre', 12);
    //print (meses);
   c.selectaDate2.selector = ui.Select({
  items: Object.keys(meses),
  placeholder:'Mes',
});
//var mes2 = meses.replaceAll({oldval: meses, newval: meses2});
//print (mes2);
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
//print (years);
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
//print (years);
c.permisividadnubes.selector2 = ui.Select({
  items: Object.keys(nubesper),
  placeholder:'Cloud Probability',
  });
c.permisividadnubes.panel = ui.Panel([c.permisividadnubes.label, c.permisividadnubes.selector2]);
c.info.paperLabel = ui.Label({
  value: 'Consulte las fechas Sentinel 2 disponibles',
  targetUrl: 'https://utpl-my.sharepoint.com/:b:/g/personal/jilojan_utpl_edu_ec/EUTuW7F7Z3lJp_74eoVy_NUBrlAk6CL7o-vMGG9EITYWHg?e=bLamwb'
});
/*c.selectaDate.panel = ui.Panel([c.selectaDate.aboutLabel,c.selectaDate.label, c.selectaDate.selector,]);
c.selectaDate2.panel = ui.Panel([c.selectaDate2.label, c.selectaDate2.selector]);
c.selectaDate3.panel = ui.Panel([c.selectaDate3.label, c.selectaDate3.selector, c.info.paperLabel]);*/
c.datePanel = ui.Panel([c.selectaDate.aboutLabel],ui.Panel.Layout.Flow('vertical'),{width: '350px'});
c.calendarioPanel = ui.Panel([c.selectaDate.aboutLabel2,c.info.paperLabel, c.selectaDate.aboutLabel3, c.selectaDate.aboutLabel4],ui.Panel.Layout.Flow('vertical'),{textAlign: 'center', width: '350px'});
c.datePanel2 = ui.Panel([c.selectaDate.aboutLabel2],ui.Panel.Layout.Flow('horizontal'));
c.datePanel3 = ui.Panel([ c.selectaDate.selector, c.selectaDate2.selector, c.selectaDate3.selector, c.permisividadnubes.selector2],
ui.Panel.Layout.Flow('horizontal'));
//PASO 2. LLamar a la colección Sentinel 2 y enmascar nubes
//Configuración para enmascarar las nubes de la imagen satelitales
var s2Sr = ee.ImageCollection('COPERNICUS/S2_SR'); 
var s2Clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY');
var mapPanel = ui.Panel([
      ui.Panel([c.map], null, {stretch: 'both'})   ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
//AGREGAR UNA LEYENDA
// establece la posición del recuadro de leyenda.
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
//Definir el titulo del mapa
var TituloMapa = ui.Label({ value: 'Mapa de Susceptibilidad a Incendios Forestales, cantón Quilanga',
  style: {position: 'top-center', fontWeight: 'bold', fontSize: '16px', border: '0.5px solid black',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  fontFamily: 'arial', width: '1000px', TextAlign:'center'}}); c.map.add(TituloMapa); 
  //c.selectaDate.panel = ui.Panel([c.selectaDate.label, c.selectaDate.slider]);
/*******************************************************************************
 * 3. COMPOSITION *
  * A section to compose the app i.e. add child widgets and widget groups to
 * first-level parent components like control panels and maps.
  * Guidelines: There is a gradient between components and composition. There
 * are no hard guidelines here; use this section to help conceptually break up
 * the composition of complicated apps with many widgets and widget groups.
 *******************************************************************************/
c.controlPanel.add(c.info.panel);
c.controlPanel.add(c.directorpanel);
c.controlPanel.add(c.analistapanel);
//c.controlPanel.add(c.dividers.divider1);
c.controlPanel.add(c.info. websitepanel);
c.controlPanel.add(c.dividers.divider2);
c.controlPanel.add(c.datePanel);
c.controlPanel.add(c.calendarioPanel);
//c.controlPanel.add(c.datePanel2);
c.controlPanel.add(c.datePanel3);
//c.controlPanel.add(c.selectaDate2.panel);
//c.controlPanel.add(c.selectaDate3.panel);
//c.controlPanel.add(c.permisividadnubes.panel);
//c.controlPanel.add(c.dividers.divider4);
//c.controlPanel.add(branding);
//print(branding);
//print(logo);
//var nubesPanel = c.nubesPanel.add(c.dividers.divider3).add(c.nubesPanel.Title).add(c.nubesPanel.subTitle).add(c.nubesPanel.subTitle2).add(c.descargaPanel.Title).add(c.dividers.divider5);
var nubesPanel = c.nubesPanel.add(c.nubesPanel.Title).add(c.nubesPanel.subTitle).add(c.nubesPanel.subTitle2).add(c.descargaPanel.Title);
c.map.add(nubesPanel);
//c.nubesPanel.add(c.descargaPanel.subTitle);
//c.nubesPanel.add(c.descargaPanel.subTitle2);
//c.map.add(nubesPanel)
//c.controlPanel.add(c.logo);
ui.root.clear();
ui.root.add(c.controlPanel);
//ui.root.add(c.nubesPanel);
//ui.root.add(c.descargaPanel);
ui.root.add(c.map);
 /*******************************************************************************
 * 4. STYLING *
 *
 * A section to define and set widget style properties.
 *
 * Guidelines:
 * 1. At the top, define styles for widget "classes" i.e. styles that might be
 *    applied to several widgets, like text styles or margin styles.
 * 2. Set "inline" style properties for single-use styles.
 * 3. You can add multiple styles to widgets, add "inline" style followed by
 *    "class" styles. If multiple styles need to be set on the same widget, do
 *    it consecutively to maintain order.
 ******************************************************************************/
// Define a JSON object for defining CSS-like class style properties.
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
  textAlign:'right' ,
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
// Set widget style.
/*c.info.titleLabel.style().set({
  fontSize: '18px',
  fontWeight: 'bold', 
  textALign: 'center',
  border: '0.5px solid black',
  backgroundColor: 'feb24c',
  fontFamily: 'arial'
});*/
//c.info.titleLabel.style().set(s.bigTopMargin);
c.info.aboutLabel.style().set(s.aboutText4);
c.info.paperLabel.style().set(s.aboutText8);
c.info.paperLabel.style().set(s.smallBottomMargin);
c.websiteLabel.style().set(s.aboutText7);
c.info.websiteLabel.style().set(s.aboutText3);
c.info.frreyesLabel.style().set(s.aboutText5);
c.info.directorLabel.style().set(s.aboutText6);
c.info.jilojanLabel.style().set(s.aboutText5);
c.info.analistaLabel.style().set(s.aboutText6);
c.selectaDate.slider.style().set(s.stretchHorizontal);
c.selectaDate.label.style().set(s.sliderTitle);
c.selectaDate2.slider.style().set(s.stretchHorizontal);
c.selectaDate2.label.style().set(s.sliderTitle);
c.selectaDate3.slider.style().set(s.stretchHorizontal);
c.selectaDate3.label.style().set(s.sliderTitle);
c.permisividadnubes.selector.style().set(s.stretchHorizontal);
c.permisividadnubes.label.style().set(s.sliderTitle);
//c.logo.estilo = c.logo.style().set(({height: '200px', 
//width: '150px'}));
// Loop through setting divider style.
Object.keys(c.dividers).forEach(function(key) {
  c.dividers[key].style().set(s.divider);
});
 /*******************************************************************************
 * 5. BEHAVIORS *
 *
 * A section to define app behavior on UI activity.
 *
 * Guidelines:
 * 1. At the top, define helper functions and functions that will be used as
 *    callbacks for multiple events.
 * 2. For single-use callbacks, define them just prior to assignment. If
 *    multiple callbacks are required for a widget, add them consecutively to
 *    maintain order; single-use followed by multi-use.
 * 3. As much as possible, include callbacks that update URL parameters.
 ******************************************************************************/
  var boton = ui.Button({
  label: 'Calcular',
  onClick: function updateMap(){
//c.controlPanel.clear();
//c.map.clear();
var dia = c.selectaDate.selector.getValue() ; //var diadespues = dia + 1;//////////////////////////////////////////////
var dia2 = ee.Number.parse(dia);
//print(dia); //print(dia2);
var mes = c.selectaDate2.selector.getValue();  
print (mes);
var mes2 = mes.replace('enero','1').replace('febrero', '2').replace('marzo','3').replace('abril','4').replace('mayo','5').replace('junio','6')
.replace('julio','7').replace('agosto','8').replace('septiembre','9').replace('octubre','10').replace('noviembre', '11').replace('diciembre','12');
print (mes2);
var mes3 = ee.Number.parse(mes2);
//print(mes3);
////////////////////////////////////////////////////////////
var año = c.selectaDate3.selector.getValue(); 
var año2 = ee.Number.parse(año);
//print(año); //print(año2);
var  MAX_CLOUD_PROBABILITY = c.permisividadnubes.selector2.getValue(); 
//print(MAX_CLOUD_PROBABILITY);
////print(dia); //print(mes);//print(año);
var perminubes = ee.Number.parse(MAX_CLOUD_PROBABILITY);
//print(perminubes);
var START_DATE = ee.Date.fromYMD(año2, mes3, dia2); 
var END_DATE = START_DATE.advance ( 1, 'day');
//print(START_DATE); print (END_DATE); //print(MAX_CLOUD_PROBABILITY);
function maskClouds(img) {var clouds = ee.Image(img.get('cloud_mask')).select('probability');  var isNotCloud = clouds.lt(perminubes);  return img.updateMask(isNotCloud);}
function maskEdges(s2_img) {return s2_img.updateMask( s2_img.select('B8A').mask().updateMask(s2_img.select('B9').mask()));}
var criteria = ee.Filter.and(ee.Filter.bounds(region), ee.Filter.date(START_DATE, END_DATE));
var s2S = s2Sr.filter(criteria).map(maskEdges);
var s2Cloud = s2Clouds.filter(criteria);
var s2SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({ primary: s2S,  secondary: s2Cloud,  condition: ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})});
var s2 =  ee.ImageCollection(s2S).median().clip(region);
var s2CloudMasked =     ee.ImageCollection(s2SrWithCloudMask).map(maskClouds).median().clip(region);
var rgbVis = {min: 0, max: 3000, bands: ['B4', 'B3', 'B2']};
var layer1 = ui.Map.Layer(
    s2, rgbVis, 'S2 without cloudmasking',     false);
  c.map.layers().set(0, layer1);
var layer2 = ui.Map.Layer(
    s2CloudMasked, rgbVis, 'S2 SR masked at ' + MAX_CLOUD_PROBABILITY + '%', false);
  c.map.layers().set(1, layer2);
function MARS_Quilanga (){
m.Moisture = s2CloudMasked.normalizedDifference (['B8A', 'B11']); var B5 = m.Moisture;
m.NDVI = s2CloudMasked.normalizedDifference (['B8', 'B4']); var B6 = m.NDVI;
m.BSI = s2CloudMasked.expression('float(((Red+SWIR)-(NIR+Blue))/((Red+SWIR)+(NIR+Blue)))',
{'Red': s2CloudMasked.select('B11'), 'NIR': s2CloudMasked.select('B8'),
'SWIR': s2CloudMasked.select('B4'), 'Blue': s2CloudMasked.select('B2')}); 
var B7 = m.BSI;
m.bandas = B1.addBands(B2).addBands(B3).addBands(B4).addBands(B5).addBands(B6).addBands(B7).addBands(B8).rename('B1','B2','B3','B4','B5','B6','B7','B8' );
m.Coef_1 = m.bandas.expression('float(max(0,(B6-(0.10787)))*85.2)', {'B6': m.bandas.select('B6')});
m.Coef_2 = m.bandas.expression('float(max((0.10787-B6),0)*-36.2)', {'B6': m.bandas.select('B6')});
m.Coef_3 = m.bandas.expression('float(max(0,(B2-(0.131034)))*68)', {'B2': m.bandas.select('B2')});
m.Coef_4 = m.bandas.expression('float(max((0.131034-B2),0)*24.5)', {'B2': m.bandas.select('B2')});
m.Coef_5 = m.bandas.expression('float(max(0,(B5-(0.34134)))*30.5)', {'B5': m.bandas.select('B5')});
m.Coef_6 = m.bandas.expression('float(max((0.34143-B5),0)*11.1)', {'B5': m.bandas.select('B5')});
m.Coef_7 = m.bandas.expression('float(max((164.045-B1),0)*0.0263)', {'B1': m.bandas.select('B1')});
m.Coef_8 = m.bandas.expression('float(max((0.169706-B3),0)*-15.4)', {'B3': m.bandas.select('B3')});
m.Coef_9 = m.bandas.expression('float(max((0.22616-B7),0)*-4.7)', {'B7': m.bandas.select('B7')});
m.Coef_10 = m.bandas.expression('float(max(0,(B4-(0.367967)))*-142)', {'B4': m.bandas.select('B4')});
m.Coef_11 = m.bandas.expression('float(max((0.367967-B4),0)*161)', {'B4': m.bandas.select('B4')});
m.Coef_12 = m.bandas.expression('float(max(0,(B4-(0.0447214)))*171)', {'B4': m.bandas.select('B4')});
m.Coef_13 = m.bandas.expression('float(max(0,(B6-(-0.01134)))*-89)', {'B6': m.bandas.select('B6')});
m.Coef_14 = m.bandas.expression('float(max(0,(B4-(0.241661)))*-29.2)', {'B4': m.bandas.select('B4')});
m.C0 = -46.1; m.C1= ee.Image(1).where(B6.gt(0.10787),m.Coef_1).where(B6.lte(0.10787),0);
m.C2= ee.Image(1).where(B6.lte(0.10787),m.Coef_2).where(B6.gt(0.10787),0); m.C3= ee.Image(1).where(B2.gt(0.131034),m.Coef_3).where(B2.lte(0.131034),0);
m.C4= ee.Image(1).where(B2.lte(0.131034),m.Coef_4).where(B2.gt(0.131034),0); m.C5= ee.Image(1).where(B5.gt(0.34134),m.Coef_5).where(B5.lte(0.34134),0);
m.C6= ee.Image(1).where(B5.lte(0.34134),m.Coef_6).where(B5.gt(0.34134),0); m.C7= ee.Image(1).where(B1.lte(164.045),m.Coef_7).where(B1.gt(164.045),0);
m.C8= ee.Image(1).where(B1.lte(0.169706),m.Coef_8).where(B1.gt(0.169706),0); m.C9= ee.Image(1).where(B7.lte(0.22616),m.Coef_9).where(B7.gt(0.22616),0);
m.C10= ee.Image(1).where(B4.gt(0.367967),m.Coef_10).where(B4.lte(0.367967),0); m.C11= ee.Image(1).where(B4.lte(0.367967),m.Coef_11).where(B4.gt(0.367967),0);
m.C12= ee.Image(1).where(B4.gt(0.0447214),m.Coef_12).where(B4.lte(0.0447214),0); m.C13= ee.Image(1).where(B6.gt(-0.01134),m.Coef_13).where(B6.lte(-0.01134),0);
m.C14= ee.Image(1).where(B4.gt(0.241661),m.Coef_14).where(B4.lte(0.241661),0);
m.Coef = m.bandas.expression('C0+C1+C2+C3+C4+C5+C6+C7+C8+C9+C10+C11+C12+C13+C14', 
    {'C0': m.C0, 'C1': m.C1, 'C2': m.C2, 'C3': m.C3,'C4': m.C4, 'C5': m.C5,'C6':m.C6,'C7':m.C7,'C8':m.C8,'C9':m.C9,'C10':m.C10,'C11':m.C11,'C12':m.C12,'C13':m.C13,'C14':m.C14});
m.Probabilidad_MARS = m.Coef.expression('((2.71828182845904)**(Coef))/(1+((2.71828182845904)**(Coef)))', {'Coef': m.Coef});
m.less = m.bandas.expression('float( B8 + B5 + B6 + B7) ' , {'B5': B5, 'B6': B6, 'B7': B7, 'B8': B8});
m.Reclasificado_MARS = ee.Image(1).where(m.Probabilidad_MARS.lte(0.2),1) .where(m.Probabilidad_MARS.gt(0.2).and(m.Probabilidad_MARS.lte(0.4)),2).where(m.Probabilidad_MARS.gt(0.4).and(m.Probabilidad_MARS.lte(0.6)),3).where(m.Probabilidad_MARS.gt(0.6).and(m.Probabilidad_MARS.lte(0.8)),4).where(m.Probabilidad_MARS.gt(0.8),5);
m.Reclas_MARS = m.Reclasificado_MARS.toDouble(); m.generalizado_MARS = m.Reclas_MARS.reduceNeighborhood({ reducer: ee.Reducer.mode(), kernel: ee.Kernel.square({radius: 0.5,  units: 'pixels',  normalize: false})}); m.generalizado_MARS = m.generalizado_MARS.toInt();
m.Reclas_final_MARS = ee.Image(1) .where(B8.neq(m.less),7); m.Reclas_final_MARS = ee.Image(1) .where(m.Reclas_final_MARS.neq(7).and(m.C1.eq(1).and(m.C13.eq(1).and(m.C2.eq(1).and(m.C8.eq(0)).and(m.C5.eq(1).and(m.C6.eq(1).and(m.C9.eq(1).and(m.Reclasificado_MARS.eq(5)))))))),6).where(m.Reclas_final_MARS.eq(7),m.generalizado_MARS).clip(region);
//Export.image.toDrive({image: m.Reclas_final_MARS, description: 'SusceptibilidadIF_1rafecha', scale: 10, region: region, crs:'EPSG:32717', folder:'SusceptibilidadIF_Quilanga'});                  
return m.Reclas_final_MARS; }
var Reclas_final_MARS = MARS_Quilanga ();
var paleta = {    max: 6, min: 1,   'palette': ['2c7bb6', 'abd9e9','fecc5c','fd8d3c','d7191c','ffffff80']}; 
var layer3 = ui.Map.Layer(
    Reclas_final_MARS, paleta, 'Susceptibilidad IF' + dia + '-'+ mes + '-'+ año +'Permisividad de nubes: '+MAX_CLOUD_PROBABILITY+ ' %', true);
  c.map.layers().set(2, layer3);
  // Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: parroquias,
  color: 1,
  width: 2
});
var layer4 = ui.Map.Layer(
    outline,{palette: '000000'},'Límites parroquiales', true);
  c.map.layers().set(3, layer4);
function porcentajenubes (){
m.nubes = (m.Reclas_final_MARS.eq(6)); m.nubes = m.Reclas_final_MARS.updateMask (m.nubes); m.nonubes = (m.Reclas_final_MARS.neq(6)); m.nonubes = m.Reclas_final_MARS.updateMask (m.nonubes);
m.getnubes = m.nubes.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({reducer:ee.Reducer.sum(), geometry: region, scale: 10, maxPixels:1e13, });
m.getnubes = ee.Number(m.getnubes.get('constant')); m.getnonubes = m.nonubes.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({reducer:ee.Reducer.sum(), geometry: region, scale: 10, maxPixels:1e13,});
m.getnonubes = ee.Number(m.getnonubes.get('constant')); m.total = (m.getnubes.add(m.getnonubes));
m.porcentajeNubes = (m.getnubes.multiply(100)).divide(m.total); m.fecha = START_DATE.format('dd/MM/YY'); 
return m.porcentajeNubes;}
function linkdescarga(){
var URLDescarga = Reclas_final_MARS.getDownloadURL( {
  name: 'Susceptibilidad a Incendios Forestales',
  scale: 15,
  crs:'EPSG:32717',
  region: region,
  filePerBand: false,
  format: "GEO_TIFF",
}); 
return URLDescarga;}
////print('>>ENLACE DE DESCARGA<<',URLDescarga);
 var link = linkdescarga();
 //print(link);
/*var descarga = ui.Panel({ style: {position: 'bottom-right', padding: '6px 6px'}});
var descargaTitle = ui.Label({ value: 'Descargue la capa (.GEOTIFF)',  targetUrl: link,
  style: {color: 'blue',fontWeight: 'bold', fontSize: '13px', margin: '2px 2px 2px 2px', textAlign: 'center', padding: '0' }});
  var descargasubTitle = ui.Label({ value:c.selectaDate.slider.getValue() + '-'+ c.selectaDate2.slider.getValue() + '-'+ c.selectaDate3.slider.getValue()  ,  
  style: {fontWeight: 'bold',fontSize: '13px', margin: '2px 2px 2px 2px', padding: '0' , stretch: 'horizontal', textAlign: 'center'}});
var descargasubTitle2 = ui.Label({ value: 'Permisividad de nubes: '+c.permisividadnubes.selector.getValue()+ ' %',  
  style: {fontWeight: 'bold',fontSize: '13px', margin: '2px 2px 2px 2px', padding: '0' , stretch: 'horizontal', textAlign: 'center'}});
descarga.add(descargaTitle); descarga.add(descargasubTitle); descarga.add(descargasubTitle2);c.map.add(descarga);}
function updatednubes(){
var pornubes = porcentajenubes ();
var nubestext = pornubes.getInfo();
function updatedlink(){
  var dia = c.selectaDate.slider.getValue(); 
  var mes = c.selectaDate2.slider.getValue();
  var año = c.selectaDate3.slider.getValue();
  var permisividad = c.permisividadnubes.selector.getValue();
  var link = link;
  var nubestext = nubestext;
  //c.nubesPanel.Title.setValue (nubestext +' (% NUBES)');
   c.nubesPanel.subTitle.setValue (dia);
  //c.nubesPanel.subTitle.setValue ('Fecha:'+ dia + '-' + mes + '-'+ año);
  //c.nubesPanel.subTitle2.setValue ('Permisividad de nubes: '+ permisividad + ' %');
return c.nubesPanel.subTitle
////print(updatedlink);
var updlink = updatedlink();
var nubes = ui.Panel({ style: {position: 'bottom-center', padding: '6px 6px'}});
var nubesTitle = ui.Label({ value: nubestext +' (% NUBES)',  
  style: {fontSize: '13px', margin: '2px 2px 2px 2px', padding: '0' }});
var nubessubTitle = ui.Label({ value: c.selectaDate.slider.getValue() + '-'+ c.selectaDate2.slider.getValue() + '-'+ c.selectaDate3.slider.getValue() ,  
  style: {fontWeight: 'bold',fontSize: '13px', margin: '2px 2px 2px 2px', padding: '0' , stretch: 'horizontal', textAlign: 'center'}});
var nubessubTitle2 = ui.Label({ value: 'Permisividad de nubes: '+c.permisividadnubes.selector.getValue()+ ' %',  
  style: {fontWeight: 'bold',fontSize: '13px', margin: '2px 2px 2px 2px', padding: '0' , stretch: 'horizontal', textAlign: 'center'}});
nubes.add(nubesTitle);nubes.add(nubessubTitle); nubes.add(nubessubTitle2); c.map.add(nubes);}*/
 // //print(updatednubes); //print(updateMap);
  //var updnubes = updatednubes();
  //print (m.fecha, m.porcentajeNubes, '% NUBES' )
/*function updatedday(){
  var dia = dia; 
  var mes = mes;
  var año = año;
  var MAX_CLOUD_PROBABILITY = MAX_CLOUD_PROBABILITY;
  var link = link;
  var pornubes = porcentajenubes ();
  var nubestext = pornubes.getInfo();
  //var nubestext = nubestext.getValue();
  c.nubesPanel.Title.setValue (nubestext +' (% NUBES)');
  c.nubesPanel.subTitle.setValue ('Fecha:'+ dia + '-' + mes + '-'+ año);
  c.nubesPanel.subTitle2.setValue ('Permisividad de nubes: '+ MAX_CLOUD_PROBABILITY + ' %');
}*/
  //c.nubesPanel.subTitle.setValue ('Fecha:'+ dia + '-' + mes + '-'+ año);
  var pornubes = porcentajenubes().round();
  var nubestext = pornubes.getInfo();
  //var nubestext = nubestext.getValue();
  c.nubesPanel.Title.setValue (nubestext +'%  (NUBES)');
  c.nubesPanel.subTitle.setValue ('Fecha:'+ dia + '-' + mes + '-'+ año);
  c.nubesPanel.subTitle2.setValue ('Permisividad de nubes: '+ MAX_CLOUD_PROBABILITY + ' %');
  c.descargaPanel.Title.setValue('Descargue la capa Geotiff');
  c.descargaPanel.Title.setUrl(link);
//c.descargaPanel.subTitle.setValue('Fecha:'+ dia + '-' + mes + '-'+ año);
//c.descargaPanel.subTitle2.setValue('Permisividad de nubes: '+ MAX_CLOUD_PROBABILITY + ' %');
/*function updatedlink(){
  var dia = c.selectaDate.slider.getValue(); 
  var mes = c.selectaDate2.slider.getValue();
  var año = c.selectaDate3.slider.getValue();
  var permisividad = c.permisividadnubes.selector.getValue();
  //print(permisividad)
  var link = link;
  var nubestext = nubestext;
  //c.nubesPanel.Title.setValue (nubestext +' (% NUBES)');
   c.nubesPanel.subTitle.setValue (dia);
  //c.nubesPanel.subTitle.setValue ('Fecha:'+ dia + '-' + mes + '-'+ año);
  //c.nubesPanel.subTitle2.setValue ('Permisividad de nubes: '+ permisividad + ' %');
//return c.nubesPanel.subTitle;
var uplink = updatedlink();}
c.selectaDate.slider.onChange(updatedlink);
c.selectaDate2.slider.onChange(updatedlink);
c.selectaDate3.slider.onChange(updatedlink);
c.permisividadnubes.selector.onChange(updatedlink);*/
    c.selectaDate.selector.onChange(updateMap); //c.selectaDate.slider.onChange(updatednubes);c.selectaDate.slider.onChange(updatedlink);
c.selectaDate2.selector.onChange(updateMap);
c.selectaDate3.selector.onChange(updateMap);
c.permisividadnubes.selector2.onChange(updateMap);
c.selectaDate.selector.unlisten(); //c.selectaDate.slider.onChange(updatednubes);c.selectaDate.slider.onChange(updatedlink);
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
//c.controlPanel.add(c.dividers.divider4);
//c.controlPanel.add(nubesPanel);
//.setLayout(ui.Panel.Layout.Flow('vertical'));
//var rgbVis = {min: 0, max: 3000, bands: ['B4', 'B3', 'B2']};
//var layer = ui.Map.Layer( s2CloudMasked, rgbVis, 'S2 SR masked at ' + MAX_CLOUD_PROBABILITY + '%', false);
//c.map.layers().set(0, layer)
//c.selectaDate.slider.onChange(updatednubes);
//c.selectaDate2.slider.onChange(updatednubes);
//c.selectaDate3.slider.onChange(updatednubes);
//c.permisividadnubes.selector.onChange(updatednubes);
/*******************************************************************************
 * 6. INITIALIZE *
 *
 * A section to initialize the app state on load.
 *
 * Guidelines:
 * 1. At the top, define any helper functions.
 * 2. As much as possible, use URL params to initial the state of the app.
 ******************************************************************************/
c.map.centerObject(region);
c.map.setOptions('ROADMAP');
c.nubesPanel.Title.setValue('Porcentaje de nubes en la imagen S2');
c.nubesPanel.subTitle.setValue('Fecha de la imagen S2');
c.nubesPanel.subTitle2.setValue('Permivisidad de nubes');
c.descargaPanel.Title.setValue('Link de descarga');
c.descargaPanel.subTitle.setValue('Fecha de la imagen S2');
c.descargaPanel.subTitle2.setValue('Permivisidad de nubes');