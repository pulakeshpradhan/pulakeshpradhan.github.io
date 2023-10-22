///////////////////// MODEL /////////////////////
var s2Sr = ee.ImageCollection('COPERNICUS/S2_SR'), 
s2Clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY'),
dataset = ee.ImageCollection('FIRMS'),
B7 = ee.Image("users/lojanjulia/comparacionmodelosIF/Elevacion_div_1000"), 
B6 = ee.Image("users/lojanjulia/comparacionmodelosIF/dist_rios_km"), 
B5 = ee.Image("users/lojanjulia/comparacionmodelosIF/dist_antro_km"),
B4 = ee.Image("users/incendiosloja/access_vias"),
B3 = ee.Image("users/incendiosloja/access_cen"),
region =ee.FeatureCollection("users/incendiosloja/loja").geometry(),
parroquias = ee.FeatureCollection("users/lojanjulia/ParroquiasLoja"),
listaparroquias = parroquias.aggregate_array('DPA_DESPAR'), 
no_urbano = ee.FeatureCollection("users/incendiosloja/nourbano_provLoja"),
urbano = ee.FeatureCollection("users/incendiosloja/urbano_cantonLoja"),
poblados = ee.FeatureCollection("users/incendiosloja/poblados_cantonLoja");
///////////////////// COMPONENTS /////////////////////
var c = {};
c.infoPanel = ui.Panel([], 'absolute', {
  width: '320px',
  height: '270px',
  padding: '1px', 
  margin: '1px',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  position: 'bottom-right',
  shown:false
  });
c.leyendaPanel= ui.Panel([], 'absolute', {
  width: '220px',
  height: '220px',
  padding: '1px', 
  margin: '1px',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  position: 'bottom-right',
  shown:false
  });
c.descargaPanel = ui.Panel([], 'absolute', {
  width: '280px',
  height: '190px',
  padding: '1px', 
  margin: '1px',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  position: 'top-center',
  shown:false
  });
  c.descargaPanel.chart = ui.Panel([], 'absolute', {
  width: '280px',
  height: '190px',
  padding: '1px', 
  margin: '1px',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  position: 'top-center',
  shown:false
  });
  c.descargaPanel.chart2 = ui.Panel([], 'absolute', {
  width: '280px',
  height: '190px',
  padding: '1px', 
  margin: '1px',
  backgroundColor: 'rgba(255, 255, 255, 1)',
  position: 'top-center',
  shown:false
  });
c.map = ui.Map(); 
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
c.drawingtools = c.map.drawingTools({layers: dummyGeometry});
c.drawingtools.setShown(true).setDrawModes(['point', 'rectangle', 'polygon']);
c.capasPanel = ui.Panel([], 'absolute', {
  width: '170px',
  height: '95px',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  position: 'top-left',
  shown:false
  });
c.info = {};
c.info.TituloMapa = ui.Label({ value: 'Mapa de Susceptibilidad a Incendios Forestales, cantón Loja', style:{
fontWeight: 'bold',
fontSize: '13px', 
textAlign: 'center',
width: '280px',
border: '0.5px solid black',
backgroundColor: 'rgba(255, 255, 255, 0)',
fontFamily: 'arial', 
 position: 'top-left'}}); 
c.info.aboutLabel = ui.Label({value: 'Este visor muestra el nivel de probabilidad ocurrencia' + 
' para incendios forestales en el cantón Loja, aplicando  un modelo estadístico confiable. ' , 
style: {
  fontSize: '11.5px',
  color: 'black', 
  padding: '25px 0px 0px 0px',
  stretch: 'horizontal',
  textAlign: 'justify', 
  backgroundColor: 'rgba(255, 255, 255, 0)',
}});
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
c.info.contactoLabel = ui.Label('Contacto GAD Loja:');
c.info.municipioLabel = ui.Label({
  value: ' Fabrizio Riofrío Toscano',
  targetUrl: 'mailto:mfriofrio@loja.gob.ec'
});
c.info.websiteLabel = ui.Label({
  value: 'Información del modelo',
  targetUrl: 'https://ia601508.us.archive.org/33/items/informe-modelo-de-susceptibilidad-loja-visor/Informe%20modelo%20de%20susceptibilidad%20Loja%20%28visor%29.pdf'
});
c.labelapart = ui.Label({value: 'La generación de mapas de susceptibilidad se realiza a partir de las imágenes satelitales Sentinel-2, que se actualizan cada 5 días.' , 
style: {
  fontSize: '11.5px',
  color: 'black', 
  padding: '5px',
  stretch: 'both',
  textAlign: 'justify',
  fontWeight: 'bold',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  position: 'bottom-center', 
}});
c.dateSlider = ui.DateSlider({
start: "2018-12-13",
end: Date.now(),
value: "2022-08-24",
period: 5,
onChange: updateMap,
style: {width: '180px', position: 'middle-left', 
stretch: 'horizontal', 
padding: '0px',
margin: '35px 0px 0px 0px',
backgroundColor: 'rgba(255, 255, 255, 0)', 
fontSize: '7px', },
});
c.selectaDate = ui.Label ({
  value: 'SELECCIONE UNA FECHA', 
  style: {fontWeight: 'bold', 
    fontSize: '13.5px',
    color: 'black', 
    textAlign: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0)', 
    },
});
c.selectaDate2 = ui.Label ({
  value: 'se generará el mapa correspondiente a la imagen Sentinel-2 anterior más cercana', 
 style: { stretch: 'horizontal', fontWeight: 'normal', 
    fontSize: '10.5px', color: 'black', 
    textAlign: 'left',
    width: '180px',
    margin: '0px',
    padding: '0px',
    backgroundColor: 'rgba(255, 255, 255, 0)'}
}); 
c.selectaDate3 = ui.Label ({
  value: 'frecuencia: 5 días', 
   style: { stretch: 'horizontal', fontWeight: 'bold', 
    fontSize: '9.5px', color: 'black', 
    width: '150px',
    textAlign: 'right', 
    margin: '0px',
    padding: '0px',
    backgroundColor: 'rgba(255, 255, 255, 0)',}
}); 
c.selectaDatePanel = ui.Panel ({
  widgets: [c.selectaDate, c.selectaDate2, c.selectaDate3],
  layout: 'flow',
  style: {
    stretch: 'both',
    position: 'top-left',
    margin: '1px 1px 1px 1px',
    padding: '1px 1px 1px 1px',
  }
});
var Closebut_controlPanel = ui.Button({label: '✖', 
  onClick: function() {
    c.controlPanel.style().set('shown', false);
    button_controlPanel.style().set('shown', true);}, 
    style:{
  color: 'red', 
  position: 'bottom-right',
  margin: '1px 1px 1px 1px',
  padding: '1px 1px 1px 1px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  fontSize: '10px',
  fontWeight: 'bold',
    }
  });
    var button_controlPanel = ui.Button({
  label: 'Panel de Control', 
  onClick: function() {
    button_controlPanel.style().set('shown', false);
    c.controlPanel.style().set('shown', true);}, 
    style : {shown: false}
    });
var legend = ui.Panel([],ui.Panel.Layout.Flow('vertical'), {});
var legendTitle = ui.Label('Grado de Susceptibilidad');
legend.add(legendTitle);
var makeRow = function(color, name) {var colorBox = ui.Label({style: {backgroundColor:'#' + color,padding: '8px', margin: '0px'}});
      var description = ui.Label({value: name, style: {width: '120px',fontSize: '11px', margin: '1px 1px 1px 5px',backgroundColor: 'rgba(255, 255, 255, 0)'}});
       return ui.Panel({  widgets: [colorBox, description],layout: ui.Panel.Layout.Flow('horizontal'), style: {backgroundColor: 'rgba(255, 255, 255, 0)'}})};
var palette =['2c7bb6', 'abd9e9','fecc5c','fd8d3c','d7191c','ffffffff'];
var names = ['Probabilidad Muy Baja','Probabilidad Baja','Probabilidad Media', 'Probabilidad Alta','Probabilidad Muy Alta', 'Sin Datos'];
for (var i = 0; i < 6; i++) {  legend.add(makeRow(palette[i], names[i]));  } 
var legend3 = ui.Panel([],ui.Panel.Layout.Flow('vertical'), {position: 'bottom-left', margin: '0px 0px 0px 0px', height: '95px', width: '190px', textAlign: 'left', backgroundColor: 'rgba(255, 255, 255, 0)',stretch: 'both'});
var legendTitle3 = ui.Label({ value: 'Cambio en la susceptibilidad'});
legend3.add(legendTitle3);
 var makeRow = function(color, name) {var colorBox = ui.Label({style: {backgroundColor:'#' + color,padding: '8px', margin: '0px'}});
      var description = ui.Label({value: name, style: {width: '100px',fontSize: '10px', margin: '1px 1px 1px 8px',backgroundColor: 'rgba(255, 255, 255, 0)'}});
       return ui.Panel({  widgets: [colorBox, description],layout: ui.Panel.Layout.Flow('horizontal') , style: {backgroundColor: 'rgba(255, 255, 255, 0)'}})};
var palette =['756bb1','ffffb3', 'd95f02'];
var names = ['Disminuyó','Se mantiene','Se incrementó'];
for (var i = 0; i < 3; i++) {  legend3.add(makeRow(palette[i], names[i]));  } //c.map.add(legend);
legend.add(legend3);
var parroquiaDD = ui.Select([], 'Seleccione una parroquia:');
listaparroquias.getInfo(function(parroquias){
  parroquiaDD.items().reset(parroquias);
});
var escala = {10:10, 15:15,20:20,25:25,30:30,35:35,40:40, 50:50, 60:60};
c.descargaselector = ui.Select({
  items: Object.keys(escala),
  placeholder:'Resolución (metros)',
  });
c.descargaPanel.Title = ui.Label ('Descargue la capa');
c.descargaPuntos = ui.Label ();
///////////////////// COMPOSITION /////////////////////
c.directorpanel = ui.Panel([c.info.directorLabel, c.info.frreyesLabel],ui.Panel.Layout.Flow('horizontal'),{width: '280px', backgroundColor: 'rgba(255, 255, 255, 0)'});
c.analistapanel = ui.Panel([c.info.analistaLabel, c.info.jilojanLabel],ui.Panel.Layout.Flow('horizontal'),{width: '280px', backgroundColor: 'rgba(255, 255, 255, 0)'});
c.contactopanel = ui.Panel([c.info.contactoLabel, c.info.municipioLabel],ui.Panel.Layout.Flow('horizontal'),{width: '280px', backgroundColor: 'rgba(255, 255, 255, 0)'});
c.perfilespanel = ui.Panel([c.info.aboutLabel, c.directorpanel, c.analistapanel, c.contactopanel],ui.Panel.Layout.Flow('vertical'),{
  width: '300px', position: 'middle-left', backgroundColor: 'rgba(255, 255, 255, 0)'});
c.infoPanel.add(c.info.TituloMapa).add(c.perfilespanel). add(c.info.websiteLabel);
//c.textoPanel  = ui.Panel([c.selectaDate2, c.selectaDate3],ui.Panel.Layout.Flow('vertical'),{position: 'middle-right'});
c.controlPanel = ui.Panel([c.selectaDatePanel, c.dateSlider, Closebut_controlPanel], 'absolute', 
{
  width: '210px',
  height: '250px',
  padding: '0px', 
  backgroundColor: 'rgba(255, 255, 255, 1)',
  position: 'bottom-left',
  shown:true
  });
//c.opcionesdescarga = ui.Panel([parroquiaDD, c.descargaselector],ui.Panel.Layout.Flow('horizontal'),{});
//c.descargaPanel.add(c.opcionesdescarga).add(c.descargaPanel.Title);
//c.descargaPanel.add(c.descargaPanel.Title);
//c.descargaPanel.add(botonURL).add(c.descargaPanel.Title);
///////////////////// STYLING /////////////////////
var firesVis = { min: 325.0,   max: 400.0,  palette: ['orange', 'yellow', 'red'],},
paleta = { max: 5, min: 1,   'palette': ['2c7bb6', 'abd9e9','fecc5c','fd8d3c','d7191c']}; 
var s= { } ; 
s.floatingpanel={
  width: '340px',
  padding: '4px', 
  backgroundColor: 'rgba(255, 255, 255, 0)',
  position: 'top-right',
  shown:true,
  };
s.floatingpanel2={
  width: '315px',
  padding: '2.5px', 
  backgroundColor: 'rgba(255, 255, 255, 0)',
  position: 'top-right',
  shown:true,
  };
s.fondotransparente = {
  backgroundColor: 'rgba(255, 255, 255, 0)'};
s.bordefino = {
  border: '1px solid black'};
s.perfil = {
  width: '285px', 
  backgroundColor: 'rgba(255, 255, 255, 0)',};
s.website = {
  height:'25px', width: '275px', 
  margin: '5px 0px 0px 10px', padding: '0px',
  backgroundColor: 'rgba(255, 195, 0, 0.5)'}; 
s.aboutText2 = {
  fontSize: '11.5px',
  color: 'blue', 
  fontFamily: 'arial',
  textAlign:'center' ,
  textDecoration:'underline',
  stretch: 'horizontal',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  width: '110px',
};
s.aboutText3 = {
  fontSize: '11.5px',
  color: 'blue', 
  fontFamily: 'arial',
  textAlign:'center' ,
  textDecoration:'underline',
  padding: '5px',
  margin: '10px 2px 2px 10px',
  backgroundColor: 'rgba(255, 195, 0, 0.35)',
  width: '150px',
  position: 'bottom-left',
  };
s.aboutText4 = {
  fontSize: '12px',
  color: 'black', 
  fontFamily: 'arial',
  textAlign:'center' ,
  fontWeight: 'bold',
  stretch: 'horizontal',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  width: '130px',
};
s.aboutText5 = {
  fontSize: '12px',
  color: 'black', 
  fontFamily: 'arial',
  textAlign:'right' ,
  backgroundColor: 'rgba(255, 255, 255, 0)',
 stretch: 'vertical',
 };
s.legend = {position: 'top-right', 
margin: '0px 0px 0px 0px', 
height: '290px', width: '200px', 
textAlign: 'left', backgroundColor: 'rgba(255, 255, 255, 0.5)', 
border: '1px solid black', shown:false};  
s.legendTitle = {
   height: '25px', width: '160px',
   color: 'black', stretch: 'horizontal', 
   fontWeight: 'bold', fontSize: '12px',
   margin: '0px 0px 4px 8px', padding: '0px' ,
   backgroundColor: 'rgba(255, 255, 255, 0)', 
  position: 'top-center', textAlign: 'center',
};
s.boton_cerrar = {
  color: 'red', 
  margin: '4.5px', 
  width: '280px',
  padding : '10px 5px 0px 230px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
    };
s.boton_cerrar3 = {
  color: 'red', 
  width: '120px',
  padding : '0px 0px 0px 45px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
    };
s.boton_abrir = {
  position: 'bottom-right', 
  color: 'black',
  backgroundColor: 'rgba(255, 255, 255, 0)', 
  margin:'0px', padding: '1px', width: '110px'}; 
s.boton_abrir2 = {
  position: 'top-left', 
  color: 'black',
  backgroundColor: 'rgba(255, 255, 255, 0)', 
  margin:'0px', padding: '1px', width: '130px'}; 
s.boton_descarga = {
  position: 'bottom-right', 
  textAlign: 'center',
  fontSize: '11.5px',
  fontWeight: 'bold',
  color: 'blue',
  backgroundColor: 'rgba(255, 255, 255, 1)', 
  //margin:'7px', padding: '7px',
  }; 
s.boton_des = {
  position: 'top-center', 
  fontSize: '11.5px',
  fontWeight: 'bold',
  color: 'blue',
  backgroundColor: 'rgba(255, 255, 255, 0)', 
  //margin:'7px', padding: '7px',
  width: '150px',
  };  
s.descargaTitle = {
  color: 'blue',fontWeight: 'bold', 
  fontSize: '13px', margin: '2px 2px 2px 2px', 
  stretch: 'horizontal',textAlign: 'center', 
  padding: '0',backgroundColor: 'rgba(255, 255, 255, 0)'}; 
  s.fechaTitle = {
  width: '300px', margin: '0px', 
  padding: '0px',backgroundColor: 'rgba(255, 255, 255, 0)'}; 
 s.descarga = {position: 'top-right', 
margin: '0px 0px 0px 0px', 
height: '230px', width: '400px', 
textAlign: 'left', backgroundColor: 'rgba(255, 255, 255, 1)', 
border: '1px solid black', shown:false};  
c.info.websiteLabel.style().set(s.aboutText3);
c.info.frreyesLabel.style().set(s.aboutText2);
c.info.directorLabel.style().set(s.aboutText4);
c.info.jilojanLabel.style().set(s.aboutText2);
c.info.analistaLabel.style().set(s.aboutText4);
c.info.municipioLabel.style().set(s.aboutText2);
c.info.contactoLabel.style().set(s.aboutText4);
//c.textoPanel.style().set(s.floatingpanel); 
//c.capasPanel.style().set(s.floatingpanel); 
legend.style().set(s.legend);
legendTitle.style().set(s.legendTitle);
legendTitle3.style().set(s.legendTitle);
//c.descargaPanel.style().set(s.descarga);
c.descargaPanel.Title.style().set(s.boton_descarga);
c.descargaPuntos.style().set(s.boton_des);
//botonURL.style().set(s.boton_descarga);
//c.opcionesdescarga.style().set(s.floatingpanel2);
button_controlPanel.style().set(s.boton_abrir);
//c.tituloPanel.style().set(s.fechaTitle);
///////////////////// BEHAVIORS /////////////////////
function updateMap(){
var  MAX_CLOUD_PROBABILITY = 40; 
var START_DAT = ee.List(c.dateSlider.getValue());
var START_DATE = ee.Date(START_DAT.get(0));
var END_DATE = START_DATE.advance ( 1, 'day');
function focosdecalor1(){
var fecha1_FC = START_DATE.advance(1, 'day'), fecha2_FC = START_DATE.advance(-7,'day');
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
function maskClouds(img) {var clouds = ee.Image(img.get('cloud_mask')).select('probability');  var isNotCloud = clouds.lt(MAX_CLOUD_PROBABILITY);  return img.updateMask(isNotCloud);}
function maskEdges(s2_img) {return s2_img.updateMask( s2_img.select('B8A').mask().updateMask(s2_img.select('B9').mask()));}
var criteria = ee.Filter.and(ee.Filter.bounds(region), ee.Filter.date(START_DATE, END_DATE));
var s2S = s2Sr.filter(criteria).map(maskEdges);
var s2Cloud = s2Clouds.filter(criteria);
var s2SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({ primary: s2S,  secondary: s2Cloud,  condition: ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})});
var s2 =  ee.ImageCollection(s2S).median().clip(region);
var s2CloudMasked = ee.ImageCollection(s2SrWithCloudMask).map(maskClouds).median().clip(region);
var mask_S2 = s2CloudMasked.select('B3');
var unmask_S2 = s2.select('B3');
var Clouds = s2Cloud.select('probability').median().clip(region);
var perminubes = 40;
var nubes = Clouds.gte(perminubes);
var noClouds = Clouds.updateMask(nubes);
var fech =  START_DATE.format('dd/MM/YYYY');
var fecha = fech.getInfo();
var no_nubes = nubes.select('probability').eq(1).selfMask().clip(region);
var nub = nubes.select('probability').neq(1).selfMask().clip(region);
var chartimage3 = no_nubes.addBands(nub).clip(no_urbano);
var chart3 = ui.Chart.image
                .regions({
                  image: chartimage3,
                  regions: region,
                  reducer: ee.Reducer.count(),
                  scale: 5e3,
                  //seriesProperty: 'label',
                  xLabels: ['1_Cubierto por nubes','2_Imagen sin nubes'],
                })
                .setChartType('PieChart')
                .setOptions({
                  title: 'Nubosidad de la imagen Sentinel-2A al ' + fecha,
                  colors:  ['#000000','#d3d3d3']
                });
var rgbVis = {min: 0, max: 3000, bands: ['B4', 'B3', 'B2']};
var layer1 = ui.Map.Layer(
    s2, rgbVis, 'Imagen S2 sin recortar',     false);
  c.map.layers().set(0, layer1);
var layer2 = ui.Map.Layer(
    s2CloudMasked, rgbVis, 'Imagen S2 recortada', false);
  c.map.layers().set(1, layer2);
function MARS_Loja (){
var NDMI = s2CloudMasked.normalizedDifference (['B8A', 'B11']); var B1 = NDMI;
var NDVI = s2CloudMasked.normalizedDifference (['B8', 'B4']); var B2 = NDVI;
var bandas = B1.addBands(B2).addBands(B3).addBands(B4).addBands(B5).addBands(B6).addBands(B7).rename('B1','B2','B3','B4','B5','B6','B7');    
var Coef_1 = bandas.expression('float(max(0,(B1-(-0.0139)))*-127)', {'B1': bandas.select('B1')}); var Coef_2 = bandas.expression('float(max(((-0.0139)-B1),0)* 82)', {'B1': bandas.select('B1')});
var Coef_3 = bandas.expression('float(max(0,(B7-1.975))*-3.81)', {'B7': bandas.select('B7')}); var Coef_4 = bandas.expression('float(max((1.975-B7),0)*-4.99)', {'B7': bandas.select('B7')});
var Coef_5 = bandas.expression('float(max(0,(B2-0.3865))*-7.38)', {'B2': bandas.select('B2')}); var Coef_6 = bandas.expression('float(max(0,(B7-2.904))*8.02)', {'B7': bandas.select('B7')});
var Coef_7 = bandas.expression('float(max(0,(B5-0.303))*0.585)', {'B5': bandas.select('B5')}); var Coef_8 = bandas.expression('float(max((0.303-B5),0)*3.54)', {'B5': bandas.select('B5')});
var Coef_9 = bandas.expression('float(max((120-B4),0)*0.0485)', {'B4': bandas.select('B4')}); var Coef_10 = bandas.expression('float(max(0,(B3-(116)))*-0.653)', {'B3': bandas.select('B3')});
var Coef_11 = bandas.expression('float(max(0,(116-B3))*0.619)', {'B3':bandas.select('B3')}); var Coef_12 = bandas.expression('float(max(0, (0.1662-B6))*-6.95)', {'B6': bandas.select('B6')});
var Coef_13 = bandas.expression('float(max(0,(B3-11))*0.648)', {'B3': bandas.select('B3')}); var Coef_14 = bandas.expression('float(max(0,(B1-(-0.0751))*121))', {'B1': bandas.select('B1')});
var C0 = -76.10; 
var C1= ee.Image(1).where(B1.gt(-0.0139),Coef_1).where(B1.lte(-0.0139),0); var C2= ee.Image(1).where(B1.lte(-0.0139),Coef_2).where(B1.gt(-0.0139),0);
var C3 = ee.Image(1).where(B7.gt(1.975),Coef_3).where(B7.lte(1.975),0); var C4 = ee.Image(1).where(B7.lte(1.975),Coef_4).where(B7.gt(1.975),0);
var C5= ee.Image(1).where(B2.gt(0.3865), Coef_5).where(B2.lte(0.3865), 0); var C6 = ee.Image(1).where(B7.gt(2.904),Coef_6).where(B7.lte(2.904),0);
var C7 = ee.Image(1).where(B5.gt(0.303),Coef_7).where(B5.lte(0.303),0); var C8 = ee.Image(1).where(B5.lte(0.303),Coef_8).where(B5.gt(0.303),0);
var C9 = ee.Image(1).where(B4.lte(120),Coef_9).where(B4.gt(120),0); var C10 = ee.Image(1).where(B3.gt(116),Coef_10).where(B3.lte(116),0);
var C11 = ee.Image(1).where(B3.lte(116),Coef_11).where(B3.gt(116),0); var C12 = ee.Image(1).where(B6.lte(0.1662),Coef_12).where(B6.gt(0.1662),0);
var C13 = ee.Image(1).where(B3.gt(11),Coef_13).where(B3.lte(11),0); var C14 = ee.Image(1).where(B1.gt(-0.0751),Coef_14).where(B1.lte(-0.0751),0);
var Coef = bandas.expression('C0+C1+C2+C3+C4+C5+C6+C7+C8+C9+C10+C11+C12+C13+C14',
    {'C0': C0, 'C1': C1, 'C2': C2, 'C3': C3,'C4': C4, 'C5': C5,'C6':C6,'C7':C7, 'C8': C8, 'C9':C9,'C10': C10,'C11':C11, 'C12': C12, 'C13': C13, 'C14': C14});
var Probabilidad_MARS = Coef.expression('((2.71828182845904)**(Coef))/(1+((2.71828182845904)**(Coef)))', {'Coef': Coef});
var Reclasificado_MARS = ee.Image(1).where(Probabilidad_MARS.lte(0.2),1) .where(Probabilidad_MARS.gt(0.2).and(Probabilidad_MARS.lte(0.4)),2)                    .where(Probabilidad_MARS.gt(0.4).and(Probabilidad_MARS.lte(0.6)),3).where(Probabilidad_MARS.gt(0.6).and(Probabilidad_MARS.lte(0.8)),4)
                    .where(Probabilidad_MARS.gt(0.8),5);
var Reclas_MARS = Reclasificado_MARS.toDouble().updateMask(mask_S2); 
var generalizado_MARS = Reclas_MARS.reduceNeighborhood({ reducer: ee.Reducer.mode(),
  kernel: ee.Kernel.square({radius: 0.5,  units: 'pixels',  normalize: false})}); 
  var generalizad_MARS = generalizado_MARS.toInt().clip(region);
return generalizad_MARS; }
var Reclasi_final_MARS = MARS_Loja ().clipToCollection(no_urbano);
var MuyBaja = Reclasi_final_MARS.select('constant_mode').eq(1).selfMask();
var Baja = Reclasi_final_MARS.select('constant_mode').eq(2).selfMask();
var Media = Reclasi_final_MARS.select('constant_mode').eq(3).selfMask();
var Alta = Reclasi_final_MARS.select('constant_mode').eq(4).selfMask();
var MuyAlta = Reclasi_final_MARS.select('constant_mode').eq(5).selfMask();
var chartimage = MuyBaja.addBands(Baja).addBands(Media).addBands(Alta).addBands(MuyAlta)//.rename('Muy Baja', 'Baja', 'Media', 'Alta', 'Muy Alta');
  var URLDescarga = 
  Reclasi_final_MARS.getDownloadURL( {
  name: 'Susceptibilidad a Incendios Forestales',
  scale: 60,
  crs:'EPSG:4326',
  region: region,
  filePerBand: false,
  format: "GEO_TIFF", });
    c.descargaPanel.Title.setValue('Capa de Susceptibilidad');
    c.descargaPanel.Title.setUrl(URLDescarga) ;
  //var catnames = ['Muy Baja', 'Baja', 'Media', 'Alta', 'Muy Alta'];
  var chart = ui.Chart.image
                .regions({
                  image: chartimage,
                  regions: region,
                  reducer: ee.Reducer.count(),
                  scale: 5e3,
                  //seriesProperty: 'label',
                  xLabels: ['1_Muy Baja', '2_Baja', '3_Media', '4_Alta', '5_Muy Alta'],
                })
                .setChartType('PieChart')
                .setOptions({
                  title: 'Grado de susceptibilidad a incendios forestales en el cantón Loja',
                  colors:  ['2c7bb6', 'abd9e9','fecc5c','fd8d3c','d7191c']
                });
 /*var chart = ui.Chart.image.histogram({
    image: Reclasi_final_MARS,
    region: region,
    scale: 500,
  });
    chart.setSeriesNames(['1: Muy Baja, 2: Baja, 3: Media, 4: Alta, 5: Muy Alta'])
    .setOptions({
          title: 'Susceptibilidad a Incendios Forestales al ' + fecha,
          hAxis: {
            title: 'Grado de susceptibilidad',
            titleTextStyle: {italic: false, bold: true, textAlign: 'center'},
          },
          vAxis:
              {title: 'Frecuencia', titleTextStyle: {italic: false, bold: true}},
          colors: ['gray']
        });*/ 
  var layer3 = ui.Map.Layer(
    Reclasi_final_MARS, paleta, 'Situación del ' + fecha, true);
  c.map.layers().set(2, layer3);
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: parroquias,
  color: 1,
  width: 1
});
var layer4 = ui.Map.Layer(
    outline,{palette: '000000'},'Límites parroquiales', true);
  c.map.layers().set(3, layer4);
var registrosIF = ee.FeatureCollection("users/incendiosloja/puntos_SNGRE_");
var style = registrosIF.style({
  color:'black', width: 1, pointSize: 4, pointShape: 'triangle', fillColor: 'yellow'
});
  var layer5 = ui.Map.Layer(
    style,null,'Registro históricos SNGRE', false);
  c.map.layers().set(4, layer5);
  var layer_7 = ui.Map.Layer(fires, firesVis, 'Focos de calor (7 días)',false);
  c.map.layers().set(5,layer_7);
  var layer_8 = ui.Map.Layer(fires3, firesVis, 'Focos de calor (14 días)',false);
  c.map.layers().set(6,layer_8);
var layer9 = ui.Map.Layer(urbano.draw({color: '424949', strokeWidth: 1}), {}, 'Zonas urbanas', false);
  c.map.layers().set(7, layer9);
function Susc_actual (){
  var START_DAT = ee.List(c.dateSlider.getValue());
var START_DATE = ee.Date(START_DAT.get(0));
var  MAX_CLOUD_PROBABILITY = 40; 
var START_DATE_2 = START_DATE.advance ( -10, 'day');
var END_DATE = START_DATE.advance ( 1, 'day'); 
function maskClouds(img) {var clouds = ee.Image(img.get('cloud_mask')).select('probability');  var isNotCloud = clouds.lt(MAX_CLOUD_PROBABILITY);  return img.updateMask(isNotCloud);}
function maskEdges(s2_img) {return s2_img.updateMask( s2_img.select('B8A').mask().updateMask(s2_img.select('B9').mask()));}
var criteria = ee.Filter.and(ee.Filter.bounds(region), ee.Filter.date(START_DATE_2, END_DATE));
var s2S = s2Sr.filter(criteria).map(maskEdges);
var s2Cloud = s2Clouds.filter(criteria);
var s2SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({ primary: s2S,  secondary: s2Cloud,  condition: ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})});
var s2 =  ee.ImageCollection(s2S).median().clip(region);
var s2CloudMasked = ee.ImageCollection(s2SrWithCloudMask).map(maskClouds).median().clip(region);
var mask_S2 = s2CloudMasked.select('B3');
var unmask_S2 = s2.select('B3');
var Clouds = s2Cloud.select('probability').median().clip(region);
var perminubes = ee.Number.parse(MAX_CLOUD_PROBABILITY);
var nubes = Clouds.gte(perminubes);
var noClouds = Clouds.updateMask(nubes);
var NDMI = s2CloudMasked.normalizedDifference (['B8A', 'B11']); var B1 = NDMI;
var NDVI = s2CloudMasked.normalizedDifference (['B8', 'B4']); var B2 = NDVI;
var bandas = B1.addBands(B2).addBands(B3).addBands(B4).addBands(B5).addBands(B6).addBands(B7).rename('B1','B2','B3','B4','B5','B6','B7');    
var Coef_1 = bandas.expression('float(max(0,(B1-(-0.0139)))*-127)', {'B1': bandas.select('B1')}); var Coef_2 = bandas.expression('float(max(((-0.0139)-B1),0)* 82)', {'B1': bandas.select('B1')});
var Coef_3 = bandas.expression('float(max(0,(B7-1.975))*-3.81)', {'B7': bandas.select('B7')}); var Coef_4 = bandas.expression('float(max((1.975-B7),0)*-4.99)', {'B7': bandas.select('B7')});
var Coef_5 = bandas.expression('float(max(0,(B2-0.3865))*-7.38)', {'B2': bandas.select('B2')}); var Coef_6 = bandas.expression('float(max(0,(B7-2.904))*8.02)', {'B7': bandas.select('B7')});
var Coef_7 = bandas.expression('float(max(0,(B5-0.303))*0.585)', {'B5': bandas.select('B5')}); var Coef_8 = bandas.expression('float(max((0.303-B5),0)*3.54)', {'B5': bandas.select('B5')});
var Coef_9 = bandas.expression('float(max((120-B4),0)*0.0485)', {'B4': bandas.select('B4')}); var Coef_10 = bandas.expression('float(max(0,(B3-(116)))*-0.653)', {'B3': bandas.select('B3')});
var Coef_11 = bandas.expression('float(max(0,(116-B3))*0.619)', {'B3':bandas.select('B3')}); var Coef_12 = bandas.expression('float(max(0, (0.1662-B6))*-6.95)', {'B6': bandas.select('B6')});
var Coef_13 = bandas.expression('float(max(0,(B3-11))*0.648)', {'B3': bandas.select('B3')}); var Coef_14 = bandas.expression('float(max(0,(B1-(-0.0751))*121))', {'B1': bandas.select('B1')});
var C0 = -76.10; 
var C1= ee.Image(1).where(B1.gt(-0.0139),Coef_1).where(B1.lte(-0.0139),0); var C2= ee.Image(1).where(B1.lte(-0.0139),Coef_2).where(B1.gt(-0.0139),0);
var C3 = ee.Image(1).where(B7.gt(1.975),Coef_3).where(B7.lte(1.975),0); var C4 = ee.Image(1).where(B7.lte(1.975),Coef_4).where(B7.gt(1.975),0);
var C5= ee.Image(1).where(B2.gt(0.3865), Coef_5).where(B2.lte(0.3865), 0); var C6 = ee.Image(1).where(B7.gt(2.904),Coef_6).where(B7.lte(2.904),0);
var C7 = ee.Image(1).where(B5.gt(0.303),Coef_7).where(B5.lte(0.303),0); var C8 = ee.Image(1).where(B5.lte(0.303),Coef_8).where(B5.gt(0.303),0);
var C9 = ee.Image(1).where(B4.lte(120),Coef_9).where(B4.gt(120),0); var C10 = ee.Image(1).where(B3.gt(116),Coef_10).where(B3.lte(116),0);
var C11 = ee.Image(1).where(B3.lte(116),Coef_11).where(B3.gt(116),0); var C12 = ee.Image(1).where(B6.lte(0.1662),Coef_12).where(B6.gt(0.1662),0);
var C13 = ee.Image(1).where(B3.gt(11),Coef_13).where(B3.lte(11),0); var C14 = ee.Image(1).where(B1.gt(-0.0751),Coef_14).where(B1.lte(-0.0751),0);
var Coef = bandas.expression('C0+C1+C2+C3+C4+C5+C6+C7+C8+C9+C10+C11+C12+C13+C14',
    {'C0': C0, 'C1': C1, 'C2': C2, 'C3': C3,'C4': C4, 'C5': C5,'C6':C6,'C7':C7, 'C8': C8, 'C9':C9,'C10': C10,'C11':C11, 'C12': C12, 'C13': C13, 'C14': C14});
var Probabilidad_MARS = Coef.expression('((2.71828182845904)**(Coef))/(1+((2.71828182845904)**(Coef)))', {'Coef': Coef});
var Reclasificado_MARS = ee.Image(1).where(Probabilidad_MARS.lte(0.2),1) .where(Probabilidad_MARS.gt(0.2).and(Probabilidad_MARS.lte(0.4)),2)                    .where(Probabilidad_MARS.gt(0.4).and(Probabilidad_MARS.lte(0.6)),3).where(Probabilidad_MARS.gt(0.6).and(Probabilidad_MARS.lte(0.8)),4)
                    .where(Probabilidad_MARS.gt(0.8),5);
var Reclas_MARS = Reclasificado_MARS.toDouble().updateMask(mask_S2); 
var generalizado_MARS = Reclas_MARS.reduceNeighborhood({ reducer: ee.Reducer.mode(),
  kernel: ee.Kernel.square({radius: 0.5,  units: 'pixels',  normalize: false})}); 
  var generalizad_MARS = generalizado_MARS.toInt().clip(region);
return generalizad_MARS; }
var MARSactual = Susc_actual ().clipToCollection(no_urbano);
  var layer10 = ui.Map.Layer(
    MARSactual, paleta, 'Susceptibilidad IF', false);
  c.map.layers().set(8, layer10);
var fech2 =  START_DATE.advance(-10, 'day');
var fechi2 = fech2.format('dd/MM/YYYY');
var fecha2 = fechi2.getInfo();
layer10.setName('Situación del '+ fecha2 + ' al ' + fecha);
function Susc_previa (){
  var START_DAT = ee.List(c.dateSlider.getValue());
var START_DATE = ee.Date(START_DAT.get(0));
var  MAX_CLOUD_PROBABILITY = 40; 
var START_DATE_2 = START_DATE.advance ( -25, 'day');
var END_DATE = START_DATE.advance ( -14, 'day'); 
function maskClouds(img) {var clouds = ee.Image(img.get('cloud_mask')).select('probability');  var isNotCloud = clouds.lt(MAX_CLOUD_PROBABILITY);  return img.updateMask(isNotCloud);}
function maskEdges(s2_img) {return s2_img.updateMask( s2_img.select('B8A').mask().updateMask(s2_img.select('B9').mask()));}
var criteria = ee.Filter.and(ee.Filter.bounds(region), ee.Filter.date(START_DATE_2, END_DATE));
var s2S = s2Sr.filter(criteria).map(maskEdges);
var s2Cloud = s2Clouds.filter(criteria);
var s2SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({ primary: s2S,  secondary: s2Cloud,  condition: ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})});
var s2 =  ee.ImageCollection(s2S).median().clip(region);
var s2CloudMasked = ee.ImageCollection(s2SrWithCloudMask).map(maskClouds).median().clip(region);
var mask_S2 = s2CloudMasked.select('B3');
var unmask_S2 = s2.select('B3');
var Clouds = s2Cloud.select('probability').median().clip(region);
var perminubes = ee.Number.parse(MAX_CLOUD_PROBABILITY);
var nubes = Clouds.gte(perminubes);
var noClouds = Clouds.updateMask(nubes);
var NDMI = s2CloudMasked.normalizedDifference (['B8A', 'B11']); var B1 = NDMI;
var NDVI = s2CloudMasked.normalizedDifference (['B8', 'B4']); var B2 = NDVI;
var bandas = B1.addBands(B2).addBands(B3).addBands(B4).addBands(B5).addBands(B6).addBands(B7).rename('B1','B2','B3','B4','B5','B6','B7');    
var Coef_1 = bandas.expression('float(max(0,(B1-(-0.0139)))*-127)', {'B1': bandas.select('B1')}); var Coef_2 = bandas.expression('float(max(((-0.0139)-B1),0)* 82)', {'B1': bandas.select('B1')});
var Coef_3 = bandas.expression('float(max(0,(B7-1.975))*-3.81)', {'B7': bandas.select('B7')}); var Coef_4 = bandas.expression('float(max((1.975-B7),0)*-4.99)', {'B7': bandas.select('B7')});
var Coef_5 = bandas.expression('float(max(0,(B2-0.3865))*-7.38)', {'B2': bandas.select('B2')}); var Coef_6 = bandas.expression('float(max(0,(B7-2.904))*8.02)', {'B7': bandas.select('B7')});
var Coef_7 = bandas.expression('float(max(0,(B5-0.303))*0.585)', {'B5': bandas.select('B5')}); var Coef_8 = bandas.expression('float(max((0.303-B5),0)*3.54)', {'B5': bandas.select('B5')});
var Coef_9 = bandas.expression('float(max((120-B4),0)*0.0485)', {'B4': bandas.select('B4')}); var Coef_10 = bandas.expression('float(max(0,(B3-(116)))*-0.653)', {'B3': bandas.select('B3')});
var Coef_11 = bandas.expression('float(max(0,(116-B3))*0.619)', {'B3':bandas.select('B3')}); var Coef_12 = bandas.expression('float(max(0, (0.1662-B6))*-6.95)', {'B6': bandas.select('B6')});
var Coef_13 = bandas.expression('float(max(0,(B3-11))*0.648)', {'B3': bandas.select('B3')}); var Coef_14 = bandas.expression('float(max(0,(B1-(-0.0751))*121))', {'B1': bandas.select('B1')});
var C0 = -76.10; 
var C1= ee.Image(1).where(B1.gt(-0.0139),Coef_1).where(B1.lte(-0.0139),0); var C2= ee.Image(1).where(B1.lte(-0.0139),Coef_2).where(B1.gt(-0.0139),0);
var C3 = ee.Image(1).where(B7.gt(1.975),Coef_3).where(B7.lte(1.975),0); var C4 = ee.Image(1).where(B7.lte(1.975),Coef_4).where(B7.gt(1.975),0);
var C5= ee.Image(1).where(B2.gt(0.3865), Coef_5).where(B2.lte(0.3865), 0); var C6 = ee.Image(1).where(B7.gt(2.904),Coef_6).where(B7.lte(2.904),0);
var C7 = ee.Image(1).where(B5.gt(0.303),Coef_7).where(B5.lte(0.303),0); var C8 = ee.Image(1).where(B5.lte(0.303),Coef_8).where(B5.gt(0.303),0);
var C9 = ee.Image(1).where(B4.lte(120),Coef_9).where(B4.gt(120),0); var C10 = ee.Image(1).where(B3.gt(116),Coef_10).where(B3.lte(116),0);
var C11 = ee.Image(1).where(B3.lte(116),Coef_11).where(B3.gt(116),0); var C12 = ee.Image(1).where(B6.lte(0.1662),Coef_12).where(B6.gt(0.1662),0);
var C13 = ee.Image(1).where(B3.gt(11),Coef_13).where(B3.lte(11),0); var C14 = ee.Image(1).where(B1.gt(-0.0751),Coef_14).where(B1.lte(-0.0751),0);
var Coef = bandas.expression('C0+C1+C2+C3+C4+C5+C6+C7+C8+C9+C10+C11+C12+C13+C14',
    {'C0': C0, 'C1': C1, 'C2': C2, 'C3': C3,'C4': C4, 'C5': C5,'C6':C6,'C7':C7, 'C8': C8, 'C9':C9,'C10': C10,'C11':C11, 'C12': C12, 'C13': C13, 'C14': C14});
var Probabilidad_MARS = Coef.expression('((2.71828182845904)**(Coef))/(1+((2.71828182845904)**(Coef)))', {'Coef': Coef});
var Reclasificado_MARS = ee.Image(1).where(Probabilidad_MARS.lte(0.2),1) .where(Probabilidad_MARS.gt(0.2).and(Probabilidad_MARS.lte(0.4)),2)                    .where(Probabilidad_MARS.gt(0.4).and(Probabilidad_MARS.lte(0.6)),3).where(Probabilidad_MARS.gt(0.6).and(Probabilidad_MARS.lte(0.8)),4)
                    .where(Probabilidad_MARS.gt(0.8),5);
var Reclas_MARS = Reclasificado_MARS.toDouble().updateMask(mask_S2); 
var generalizado_MARS = Reclas_MARS.reduceNeighborhood({ reducer: ee.Reducer.mode(),
  kernel: ee.Kernel.square({radius: 0.5,  units: 'pixels',  normalize: false})}); 
  var generalizad_MARS = generalizado_MARS.toInt().clip(region);
return generalizad_MARS; }
var MARSprevia = Susc_previa ().clipToCollection(no_urbano);
  var layer11 = ui.Map.Layer(
    MARSprevia, paleta, 'Susceptibilidad IF', false);
  c.map.layers().set(9, layer11);
var fech3 =  START_DATE.advance(-25, 'day');
var fechi3 = fech3.format('dd/MM/YYYY');
var fecha3 = fechi3.getInfo();
var fech4 =  START_DATE.advance(-15, 'day');
var fechi4 = fech4.format('dd/MM/YYYY');
var fecha4 = fechi4.getInfo();
layer11.setName('Situación del '+ fecha3 + ' al ' + fecha4);
var cambiosIF = MARSactual.subtract(MARSprevia).toDouble();
var fromList = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
var toList =   [ 1, 1,  1,  1,  1,  2,  3,  3,  3,  3,  3];
var cambios_reclas2 = cambiosIF.remap({
  from: fromList,
  to: toList,
});
var paleta2 = { min: 1, max: 3,  palette: ['756bb1','ffffb3', 'd95f02']}; 
var layer12 = ui.Map.Layer(
    cambios_reclas2, paleta2 , 'Cambios entre el ' + fecha3 + ' y ' + fecha, false);
c.map.layers().set(10, layer12);
var disminucion = cambios_reclas2.select('remapped').eq(1).selfMask();
var mantenimiento = cambios_reclas2.select('remapped').eq(2).selfMask();
var aumento = cambios_reclas2.select('remapped').eq(3).selfMask();
var chartimage2 = disminucion.addBands(mantenimiento).addBands(aumento);
var chart2 = ui.Chart.image
                .regions({
                  image: chartimage2,
                  regions: region,
                  reducer: ee.Reducer.count(),
                  scale: 5e3,
                  //seriesProperty: 'label',
                  xLabels: ['1_Disminuyó', '2_Se mantiene', '3_Se incrementó'],
                })
                .setChartType('PieChart')
                .setOptions({
                  title: 'Cambios entre el ' + fecha4 + ' y ' + fecha,
                  colors:  ['756bb1','ffffb3', 'd95f02']
                });
c.descargaPanel.add(chart);
c.descargaPanel.chart2.add(chart2);
c.descargaPanel.chart.add(chart3);
}
var Closebut_infoPanel = ui.Button({label: '✖', 
style:{
  color: 'red', 
  position: 'bottom-right',
  margin: '1px 1px 1px 1px',
  padding: '1px 1px 1px 1px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  fontSize: '10px',
  fontWeight: 'bold',
    },
  onClick: function() {
    c.infoPanel.style().set('shown', false);
    button_infoPanel.style().set('shown', true);}
  });
  c.infoPanel.add(Closebut_infoPanel);
    var button_infoPanel = ui.Button({
  label: 'Sobre el proyecto' , style: s.boton_abrir,
  onClick: function() {
    button_infoPanel.style().set('shown', false);
    c.infoPanel.style().set('shown', true);}
});
var Closebut_legendPanel = ui.Button({label: '✖', 
style:{
  color: 'red', 
  position: 'bottom-right',
  margin: '1px 1px 1px 1px',
  padding: '1px 1px 1px 80px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  fontSize: '10px',
  fontWeight: 'bold',
    },
  onClick: function() {
    legend.style().set('shown', false);
    button_legendPanel.style().set('shown', true);}
  });
  legend.add(Closebut_legendPanel);
    var button_legendPanel = ui.Button({
  label: 'Leyendas', style: s.boton_abrir,
  onClick: function() {
    button_legendPanel.style().set('shown', false);
    legend.style().set('shown', true);}
});
var Closebut_descargaPanel = ui.Button({label: '✖ Cerrar gráficos', 
style:{
  color: 'red', 
  position: 'bottom-right',
  margin: '1px 1px 1px 1px',
  padding: '1px 1px 1px 80px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  fontSize: '10px',
  fontWeight: 'bold',
    },
  onClick: function() {
    c.descargaPanel.style().set('shown', false);
    button_descargaPanel.style().set('shown', true);
        c.descargaPanel.chart2.style().set('shown', false);
    c.descargaPanel.chart.style().set('shown', false);
  }
  });
  c.descargaPanel.add(Closebut_descargaPanel);
    var button_descargaPanel = ui.Button({
  label: 'Gráficos de pastel', style: s.boton_abrir,
  onClick: function() {
    button_descargaPanel.style().set('shown', false);
    c.descargaPanel.style().set('shown', true);
    c.descargaPanel.chart2.style().set('shown', true);
    c.descargaPanel.chart.style().set('shown', true);
    }
});
var Closebut_capasPanel = ui.Button({label: '✖', 
style:{
  color: 'red', 
  position: 'bottom-center',
  margin: '1px 1px 1px 1px',
  padding: '1px 1px 1px 1px',
  backgroundColor: 'rgba(255, 255, 255, 0)',
  fontSize: '10px',
  fontWeight: 'bold',
    },
  onClick: function() {
    c.capasPanel.style().set('shown', false);
    button_capasPanel.style().set('shown', true);}
  });
  c.capasPanel.add(Closebut_capasPanel);
  c.capasPanel.add(c.descargaPuntos);
  var button_capasPanel = ui.Button({
  label: 'Descargar geometrías', style: s.boton_abrir2,
  onClick: function () {
    button_capasPanel.style().set('shown', false);
    c.capasPanel.style().set('shown', true);
  var fc_ = c.drawingtools.toFeatureCollection();
  var URL_puntos = fc_.getDownloadURL(
    {format: 'kml',
      });
    c.descargaPuntos.setValue('Descargar geometrías');
    c.descargaPuntos.setUrl(URL_puntos) ;}
});
var Closebut_ubicacion = ui.Button({label: 'Vista general', 
style: {position: 'top-right', color: 'black',backgroundColor: 'rgba(255, 255, 255, 0)', margin:'0px', padding: '1px', width: '110px', shown:false},
  onClick: function() {
  c.map.centerObject(region);
  button_ubicacion.style().set('shown', true);
  Closebut_ubicacion.style().set('shown', false);
    }
  });
  var button_ubicacion = ui.Button({
  label: 'Ubicación actual 📍',
  style: {position: 'top-right', color: 'black',backgroundColor: 'rgba(255, 255, 255, 0)', margin:'0px', padding: '1px', width: '110px',},
  onClick: function() {
  ui.util.getCurrentPosition(current_position, oops);
  function current_position(point) {
  c.map.centerObject(point,16);
  var layer_10 = ui.Map.Layer(point, {}, 'Ubicación actual',true);
  c.map.layers().set(8,layer_10);
      Closebut_ubicacion.style().set('shown', true);
      button_ubicacion.style().set('shown', false);
  }
  function oops(error) {
  print(error);
} }
});
 c.map.add(button_ubicacion);
 c.map.add(Closebut_ubicacion);
c.botones = ui.Panel([button_infoPanel, button_controlPanel, button_legendPanel,button_descargaPanel], ui.Panel.Layout.Flow('vertical'), {position: 'bottom-right', padding: '0px', backgroundColor: 'rgba(255, 255, 255, 0)'});
///////////////////// INITIALIZE /////////////////////
ui.root.clear();
ui.root.add(c.map); 
c.map.add(c.botones).add(c.infoPanel).add(legend).add(c.controlPanel).add(c.descargaPanel.Title).add(c.capasPanel).add(button_capasPanel).add(c.descargaPanel);//.add(c.descargaPuntos).add(c.capasPanel);
c.map.add(c.labelapart);
c.map.add(c.descargaPanel.chart2);
c.map.add(c.descargaPanel.chart);
c.map.centerObject(region).setOptions('ROADMAP');
c.dateSlider.setValue(ee.Date(Date.now()));
//c.dateSlider.setValue(ee.Date.fromYMD(2020,8,24));