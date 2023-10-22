var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint();
//Agregar utilidades
var constantes = require('users/infonamonitoreo/tools:Visualizadores/constantes');
var funciones = require('users/infonamonitoreo/tools:Visualizadores/funciones');
//----------------------------Interfaz de usuario
var panel1 = ui.Panel({style: {width: '310px',backgroundColor: 'white'}});
var panel2 = ui.Panel({style: {width: '340px',backgroundColor: 'white'}});
var map1 = ui.Map();
function confMap(mapa){
  var estilosMapa = funciones.mapStyles();
  var gris = estilosMapa.gris;
  var oscuro = estilosMapa.oscuro;
  mapa.clear(),
  mapa.setOptions('ROADMAP',{'Gris': gris, 'Oscuro': oscuro});
}
function herramientaDibujos(mapa){
var drawingTools = mapa.drawingTools();
drawingTools.setDrawModes(['polygon']);
drawingTools.setLinked(false);
drawingTools.addLayer([ee.Geometry.Point([-159.90452018696843, 0.2085561506432854])],'aoi');
var dibujos = drawingTools.layers();
return dibujos}
var dibujos = herramientaDibujos(map1);
ui.root.clear();
ui.root.add(panel1);
//ui.root.add(panel2);
ui.root.add(map1);
function interfaz(panel){
// Titulo y descripcion
var logo = ui.Chart(
[
    ['<img src=http://www.infona.gov.py/application/files/4216/2792/0431/banner_pagina_web.png2.png width=150px>']
],
'Table', {allowHtml: true});
/*var logo1 = ee.Image('users/infonamonitoreo/LOGOS/logoINFONA').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '642x291',
        format: 'png'
        },
    style: {height: '127px', width: '280px',padding :'0'}
    });
var logoPanel = ui.Panel(thumb, 'flow', {width: '300px'});*/
var titulo = ui.Label('Sistema Nacional de Información Forestal', {'fontWeight': 'bold',fontSize: '16px', color: '0b1176',backgroundColor: 'white'});
var titBeta = ui.Label('VERSION BETA', {'fontWeight': 'bold',fontSize: '16px', color: 'red',backgroundColor: 'white'});
var vis_titulo = ui.Label('Panel de Visualización',{'fontWeight':'bold',fontSize:'14px',color: '0b1176',backgroundColor: 'white'});
var texto = ui.Label(
    'Sistema Nacional de Monitoreo Forestal - Datos de Actividad y Factores de Emisión',
    {fontSize: '14px',color: '0b1176',backgroundColor: 'white'});
var titlePanel = ui.Panel({widgets:[titulo,titBeta,texto], layout:'flow', style:{backgroundColor: 'white'}});
//var titlePanel = ui.Panel([titulo, texto],'flow');
var visPanel = ui.Panel({widgets:[vis_titulo], layout:'flow'});
panel.add(titlePanel);
//Diccionario
var dicReg = {
  'Oriental':[],
  'Occidental':[]
};
var dicEstr = {
'Bosque Húmedo de la Región Oriental':[],
'Bosque Subhúmedo Inundable del Rio Paraguay':[],
'Bosque Subhúmedo del Cerrado':[],
'Bosque Seco Chaqueño':[]
};
var dicDpto = {
'Concepción':[1],
'San Pedro':[2],
'Cordillera':[3],
'Guairá':[4],
'Caaguazú':[5],
'Caazapá':[6],
'Itapúa':[7],
'Misiones':[8],
'Paraguarí':[9],
'Alto Paraná':[10],
'Central':[11],
'Ñeembucú':[12],
'Amambay':[13],
'Canindeyú':[14],
'Presidente Hayes':[15],
'Boquerón':[16],
'Alto Paraguay':[17],
};
var dicDist = {
'25 de Diciembre':[212],
'3 de Febrero':[518],
'3 de Mayo':[611],
'Abaí':[602],
'Acahay':[902],
'Alberdi':[1202],
'Alto Verá':[725],
'Altos':[302],
'Antequera':[202],
'Areguá':[1101],
'Arroyito':[112],
'Arroyos y Esteros':[303],
'Asunción':[100],
'Atyrá':[304],
'Ayolas':[802],
'Azotey':[108],
'Bahía Negra':[1704],
'Belén':[102],
'Bella Vista':[1302],
'Bella Vista Sur':[702],
'Benjamín Aceval':[1502],
'Borja':[402],
'Buena Vista':[603],
'Caacupé':[301],
'Caaguazú':[502],
'Caapucú':[903],
'Caazapá':[601],
'Caballero':[904],
'Cambyretá':[703],
'Capiatá':[1102],
'Capiibary':[217],
'Capitán Bado':[1303],
'Capitán Mauricio José Troche':[403],
'Capitán Meza':[704],
'Capitán Miranda':[705],
'Caraguatay':[305],
'Carapeguá':[905],
'Carayaó':[503],
'Carlos Antonio López':[709],
'Carmelo Peralta':[1705],
'Carmen del Paraná':[707],
'Cerrito':[1203],
'Choré':[203],
'Ciudad del Este':[1001],
'Concepción':[101],
'Coronel Bogado':[708],
'Coronel Martínez':[404],
'Coronel Oviedo':[501],
'Corpus Christi':[1402],
'Desmochados':[1204],
'Doctor Bottrell':[416],
'Domingo Martínez de Irala':[1003],
'Dr. Cecilio Báez':[504],
'Dr. J. Eulogio Estigarribia':[512],
'Dr. Juan León Mallorquín':[1004],
'Dr. Juan Manuel Frutos':[506],
'Dr. Moisés S. Bertoni':[604],
'Dr. Raúl Peña':[1022],
'Edelira':[723],
'Emboscada':[306],
'Encarnación':[701],
'Escobar':[906],
'Eusebio Ayala':[307],
'Félix Pérez Cardozo':[405],
'Fernando de la Mora':[1103],
'Filadelfia':[1604],
'Fram':[711],
'Francisco Caballero Álvarez':[1407],
'Fuerte Olimpo':[1701],
'General Artigas':[712],
'General Delgado':[713],
'General Elizardo Aquino':[204],
'General Francisco Isidoro Resquín':[214],
'General José María Bruguez':[1509],
'Gral. Eugenio A. Garay':[406],
'Gral. Higinio Morínigo':[605],
'Gral. José Eduvugis Díaz':[1205],
'Guajayvi':[216],
'Guarambaré':[1104],
'Guazú-Cuá':[1206],
'Hernandarias':[1005],
'Hohenau':[714],
'Horqueta':[103],
'Humaitá':[1207],
'Independencia':[407],
'Iruña':[1019],
'Isla Pucú':[308],
'Isla Umbú':[1208],
'Itá':[1105],
'Itacurubí de la Cordillera':[309],
'Itacurubí del Rosario':[205],
'Itakyry':[1006],
'Itanará':[1405],
'Itapé':[408],
'Itapúa Poty':[730],
'Itauguá':[1106],
'Iturbe':[409],
'J. Augusto Saldivar':[1119],
'Jesús':[715],
'José Domingo Ocampos':[515],
'José Falcón':[1506],
'José Fassardi':[410],
'José Leandro Oviedo':[716],
'Juan de Mena':[310],
'Juan E. O´Leary':[1007],
'Karapaí':[1305],
'Katueté':[1408],
'La Colmena':[907],
'La Paloma del Espíritu Santo':[1409],
'La Pastora':[517],
'La Paz':[726],
'Lambaré':[1107],
'Laureles':[1209],
'Liberación':[220],
'Lima':[206],
'Limpio':[1108],
'Loma Grande':[311],
'Loma Plata':[1605],
'Loreto':[104],
'Los Cedrales':[1010],
'Luque':[1109],
'Maciel':[606],
'Maracaná':[1414],
'María Antonia':[918],
'Mariano Roque Alonso':[1110],
'Mariscal Francisco Solano López':[516],
'Mariscal José Félix Estigarribia':[1602],
'Mayor José de Jesús Martínez':[1210],
'Mayor Julio Dionisio Otaño':[718],
'Mbaracayú':[1017],
'Mbocayaty':[411],
'Mbocayaty del Yhaguy':[312],
'Mbuyapey':[908],
'Minga Guazú':[1011],
'Minga Porá':[1016],
'Nanawa':[1505],
'Naranjal':[1014],
'Natalicio Talavera':[412],
'Natalio':[710],
'Nueva Alborada':[706],
'Nueva Colombia':[313],
'Nueva Esperanza':[1410],
'Nueva Germania':[207],
'Nueva Italia':[1111],
'Nueva Londres':[508],
'Nueva Toledo':[522],
'Ñacunday':[1008],
'Ñemby':[1112],
'Ñumí':[413],
'Obligado':[717],
'Paraguarí':[901],
'Paso Barreto':[111],
'Paso de Patria':[1211],
'Paso Yobai':[417],
'Pedro Juan Caballero':[1301],
'Pilar':[1201],
'Pirapó':[729],
'Pirayú':[909],
'Piribebuy':[314],
'Presidente Franco':[1002],
'Primero de Marzo':[315],
'Puerto Casado':[1702],
'Puerto Pinasco':[1503],
'Quiindy':[910],
'Quyquyhó':[911],
'R.I. 3 Corrales':[513],
'Raúl Arsenio Oviedo':[514],
'Repatriación':[507],
'Roque Gonzalez de Santa Cruz':[912],
'Salto del Guairá':[1401],
'San Alberto':[1018],
'San Alfredo':[110],
'San Antonio':[1113],
'San Bernardino':[316],
'San Carlos del Apa':[105],
'San Cosme y Damián':[719],
'San Cristobal':[1012],
'San Estanislao':[208],
'San Ignacio':[803],
'San Joaquín':[509],
'San José de los Arroyos':[510],
'San José Obrero':[320],
'San Juan Bautista de las Misiones':[801],
'San Juan Bautista de Ñeembucú':[1212],
'San Juan del Paraná':[728],
'San Juan Nepomuceno':[607],
'San Lázaro':[106],
'San Lorenzo':[1114],
'San Miguel':[804],
'San Pablo':[209],
'San Patricio':[805],
'San Pedro de Ycuamandiyú':[201],
'San Pedro del Paraná':[720],
'San Rafael del Paraná':[721],
'San Salvador':[414],
'San Vicente Pancholo':[221],
'Santa Elena':[317],
'Santa Fe del Paraná':[1020],
'Santa María':[806],
'Santa Rita':[1013],
'Santa Rosa':[807],
'Santa Rosa del Aguaray':[218],
'Santa Rosa del Mbutuy':[505],
'Santa Rosa del Monday':[1015],
'Santiago':[808],
'Sapucái':[913],
'Sargento José Félix López':[109],
'Simón Bolivar':[519],
'Tacuaras':[1213],
'Tacuatí':[210],
'Tavaí':[608],
'Tavapy':[1021],
'Tebicuary':[418],
'Tebicuary-mi':[914],
'Tembiaporá':[521],
'Teniente Esteban Martínez':[1508],
'Tobatí':[318],
'Tomás Romero Pereira':[724],
'Trinidad':[722],
'Tte. 1° Manuel Irala Fernández':[1507],
'Unión':[211],
'Valenzuela':[319],
'Vaquería':[520],
'Villa Curuguaty':[1403],
'Villa del Rosario':[213],
'Villa Elisa':[1115],
'Villa Florida':[809],
'Villa Franca':[1214],
'Villa Hayes':[1504],
'Villa Oliva':[1215],
'Villa Ygatimí':[1404],
'Villalbín':[1216],
'Villarrica':[401],
'Villeta':[1116],
'Yabebyry':[810],
'Yaguarón':[915],
'Yasy Cañy':[1411],
'Yatayty del Guaira':[415],
'Yatayty':[727],
'Yatayty del Norte':[215],
'Yby Pytá':[1413],
'Yby Yaú':[107],
'Ybycuí':[916],
'Ybyrarobaná':[1412],
'Ybytymí':[917],
'Yegros':[609],
'Yguazú':[1009],
'Yhú':[511],
'Ypacaraí':[1117],
'Ypané':[1118],
'Ypejhu':[1406],
'Yrybucua':[219],
'Yuty':[610],
'Zanja Pytã':[1304],  
};
var dicMapas = {
'2000-2005-2011':[],
'2011-2013-2015':[],
'2015-2016':[],
'2016-2017':[],
'2017-2018':[],  
};
var dicIFN = {
'Primer Inventario Forestal Nacional (ONU REDD+)':[],
'Remedición: Inventario Forestal Nacional (50%)':[],
};
// Interfaz de Usuario
panel.add(ui.Label('Elegir periodo de Datos de Actividad', {'fontWeight': 'bold','font-size': '14px',color: '0b1176',backgroundColor: 'white'}));
var mapas_select = ui.Select({
  items: Object.keys(dicMapas), 
  placeholder: 'Seleccione Periodo a visualizar',
  onChange: function(){},
  style: {color: 'green',backgroundColor: 'white'}
});
panel.add(ui.Panel({widgets:[mapas_select], layout:'flow', style:{color:'0b1176',backgroundColor: 'white'}}));
panel.add(ui.Label('Elegir datos de Factores de Emisión', {'fontWeight': 'bold','font-size': '14px',color: '0b1176',backgroundColor: 'white'}));
var ifn_select = ui.Select({
  items: Object.keys(dicIFN), 
  placeholder: 'Seleccione datos de IFN',
  onChange: function(){},
  style: {color: 'green',backgroundColor: 'white'}
});
panel.add(ui.Panel({widgets:[ifn_select], layout:'flow', style:{color:'0b1176',backgroundColor: 'white'}}));
//Selección de área de estudio
panel.add(ui.Label('Elegir área de estudio (seleccionar la opción y completar)', {'fontWeight': 'bold','font-size': '14px',color: '0b1176',backgroundColor: 'white'}));
//==============Select========
var reg_select = ui.Select({
  items: Object.keys(dicReg), 
  placeholder: 'Seleccione Región',
  value: dicReg[0],
  style:{color:'green',backgroundColor:'white'}
});
var est_select = ui.Select({
      items:Object.keys(dicEstr),
      placeholder:'Seleccione Estrato Forestal',
      value:dicEstr[0],
      style:{color:'green',backgroundColor:'white'}
    });
var dpto_select = ui.Select({
      items:Object.keys(dicDpto),
      placeholder:'Seleccione Departamento',
      value: dicDpto[0],
      style:{color:'green',backgroundColor:'white'}
    });
var dist_select = ui.Select({
      items: Object.keys(dicDist),
      placeholder:'Seleccione Distrito',
      value: dicDist[0],
      style:{color:'green',backgroundColor:'white'}
    });
//=============TEXBOX==========
var idAsset = ui.Textbox({placeholder:'Introducir id del asset'});
//==============CHECKBOX========
var checkPais = ui.Checkbox({
      label: '    País', 
      value : false, 
      onChange: function(){return checkRegion.setValue(false),
                                  checkEstrato.setValue(false),
                                  checkDepartamento.setValue(false),
                                  checkDistrito.setValue(false),
                                  checkAsset.setValue(false),
                                  checkDibujo.setValue(false)},
      style:{color:'0b1176',backgroundColor:'white'}
});
var checkRegion = ui.Checkbox({
      label: '', 
      value : false,
      onChange: function(){return checkPais.setValue(false),
                                  checkEstrato.setValue(false),
                                  checkDepartamento.setValue(false),
                                  checkDistrito.setValue(false),
                                  checkAsset.setValue(false),
                                  checkDibujo.setValue(false)},
      style:{color:'0b1176',backgroundColor:'white'}
});
var checkEstrato = ui.Checkbox({
      label: '', 
      value : false,
      onChange: function(){return checkPais.setValue(false),
                                  checkRegion.setValue(false),
                                  checkDepartamento.setValue(false),
                                  checkDistrito.setValue(false),
                                  checkAsset.setValue(false),
                                  checkDibujo.setValue(false)},
      style:{color:'0b1176',backgroundColor:'white'}
});
var checkDepartamento = ui.Checkbox({
      label: '', 
      value : false,
      onChange: function(){return checkPais.setValue(false),
                                  checkEstrato.setValue(false),
                                  checkRegion.setValue(false),
                                  checkDistrito.setValue(false),
                                  checkAsset.setValue(false),
                                  checkDibujo.setValue(false)},
      style:{color:'0b1176',backgroundColor:'white'}
});
var checkDistrito = ui.Checkbox({
      label: '', 
      value : false,
      onChange: function(){return checkPais.setValue(false),
                                  checkEstrato.setValue(false),
                                  checkRegion.setValue(false),
                                  checkDepartamento.setValue(false),
                                  checkAsset.setValue(false),
                                  checkDibujo.setValue(false)},
      style:{color:'0b1176',backgroundColor:'white'}
});
var checkAsset = ui.Checkbox({
      label: '', 
      value : false,
      onChange: function(){return checkPais.setValue(false),
                                  checkEstrato.setValue(false),
                                  checkRegion.setValue(false),
                                  checkDepartamento.setValue(false),
                                  checkDistrito.setValue(false),
                                  checkDibujo.setValue(false)},
      style:{color:'0b1176',backgroundColor:'white'}
});
var checkDibujo = ui.Checkbox({
      label: '    Dibujar AOI', 
      value : false,
      onChange: function(){return checkPais.setValue(false),
                                  checkEstrato.setValue(false),
                                  checkRegion.setValue(false),
                                  checkDepartamento.setValue(false),
                                  checkDistrito.setValue(false),
                                  checkAsset.setValue(false)},
      style:{color:'0b1176',backgroundColor:'white'}
});
//=========SUBPANELES
var cs_Region = ui.Panel({
  widgets:[checkRegion,reg_select], 
  layout:ui.Panel.Layout.flow('horizontal'), 
  style:{backgroundColor:'white'}
});
var cs_Estrato = ui.Panel({
  widgets:[checkEstrato,est_select], 
  layout:ui.Panel.Layout.flow('horizontal'), 
  style:{backgroundColor:'white'}
});
var cs_Departamento = ui.Panel({
  widgets:[checkDepartamento,dpto_select], 
  layout:ui.Panel.Layout.flow('horizontal'), 
  style:{backgroundColor:'white'}
});
var cs_Distrito = ui.Panel({
  widgets:[checkDistrito,dist_select], 
  layout:ui.Panel.Layout.flow('horizontal'), 
  style:{backgroundColor:'white'}
});
var cs_Asset = ui.Panel({
  widgets:[checkAsset,idAsset], 
  layout:ui.Panel.Layout.flow('horizontal'), 
  style:{backgroundColor:'white'}
});
panel.add(ui.Panel({widgets:[checkPais,cs_Region,cs_Estrato,cs_Departamento,cs_Distrito,cs_Asset,checkDibujo], layout:'flow', style:{backgroundColor:'white'}}));
//Boton de Aplicar
var boton = ui.Button({label:'Aplicar', onClick:triggerStart});
panel.add(boton);
var titleLink = ui.Label('Enlaces de Interés', {'fontWeight': 'bold',color: '0b1176',backgroundColor: 'white'});
var link = ui.Label(
    'Sistema Satelital de Monitoreo Terrestre', {color: '760081',backgroundColor: 'white'},
    'http://www.infona.gov.py/index.php/903'
    );
var link1 = ui.Label(
 'Metodología de Elaboración de Mapas',{color: '760081',backgroundColor: 'white'},
 'http://www.infona.gov.py/application/files/4414/7405/3022/Documento_Tecnico_Metodologia_Mapa_de_Cambios_Paraguay.pdf'
 );
var linkPanel = ui.Panel({widgets: [titleLink,link,link1], layout:'flow', style:{backgroundColor: 'white'}});
panel.add(linkPanel);
var outputs = {};
outputs.mapas_select = mapas_select;
outputs.ifn_select = ifn_select;
outputs.checkPais = checkPais;
outputs.checkRegion = checkRegion;
outputs.reg_select = reg_select;
outputs.checkEstrato = checkEstrato;
outputs.est_select = est_select;
outputs.checkDepartamento = checkDepartamento;
outputs.dpto_select = dpto_select;
outputs.checkDistrito = checkDistrito;
outputs.dist_select = dist_select;
outputs.checkAsset = checkAsset;
outputs.idAsset = idAsset;
outputs.checkDibujo = checkDibujo;
return(outputs);
}
var interfazUsuario = interfaz(panel1);
map1.setCenter(-57.6160399213382,-24.055037600053165, 6);
//========================INICIO DE LA APP=====================================//
var estado;
function triggerStart(){
  estado = start();
}
function start(){
//Limpieza de mapa y carga de opciones
confMap(map1);
//Campos del usuario
var mapas_select = interfazUsuario.mapas_select.getValue();
var ifn_select = interfazUsuario.ifn_select.getValue();
var checkPais = interfazUsuario.checkPais.getValue();
var checkRegion = interfazUsuario.checkRegion.getValue();
var reg_select = interfazUsuario.reg_select.getValue();
var checkEstrato = interfazUsuario.checkEstrato.getValue();
var est_select = interfazUsuario.est_select.getValue();
var checkDepartamento = interfazUsuario.checkDepartamento.getValue();
var dpto_select = interfazUsuario.dpto_select.getValue();
var checkDistrito = interfazUsuario.checkDistrito.getValue();
var dist_select = interfazUsuario.dist_select.getValue();
var checkAsset = interfazUsuario.checkAsset.getValue();
var idAsset = interfazUsuario.idAsset.getValue();
var checkDibujo = interfazUsuario.checkDibujo.getValue();
//Seleccion de Variables de Estudio
var areaEstudio,region;
//Selección de Mapas
var mapaSelect;
switch (mapas_select) {
  case '2000-2005-2011':
    mapaSelect = constantes.ssmt1;
    break;
  case '2011-2013-2015':
    mapaSelect = constantes.ssmt2;
    break;
  case '2015-2016':
    mapaSelect = constantes.ssmt3;
    break;
  case '2016-2017':
    mapaSelect = constantes.ssmt4;
    break;
  case '2017-2018':
    mapaSelect = constantes.ssmt5;
    break;
}
print('periodo seleccionado',mapaSelect);
var ifnSelect;
switch (ifn_select) {
  case 'Primer Inventario Forestal Nacional (ONU REDD+)':
    ifnSelect = constantes.IFN_15;
    break;
  case 'Remedición: Inventario Forestal Nacional (50%)':
    ifnSelect = constantes.IFN_RE;
    break;
}
print('IFN seleccionado',ifnSelect);
var info_IFN_select;
switch (ifn_select) {
  case 'Primer Inventario Forestal Nacional (ONU REDD+)':
    info_IFN_select = constantes.info_IFN_15;
    break;
  case 'Remedición: Inventario Forestal Nacional (50%)':
    info_IFN_select = constantes.info_IFN_re;
    break;
}
print('IFN (info) seleccionado',info_IFN_select);
//Funcion seleccion de Area de estudio
if (checkPais === true ){
  areaEstudio = mapaSelect;
  region = ee.FeatureCollection(constantes.pyPy);
  }
  else {if (checkRegion === true) {
    areaEstudio = reg_select;
    region = constantes.pyReg.filter(ee.Filter.eq('REG_DESC',areaEstudio)).geometry();
  }
  else {if (checkEstrato === true) {
    areaEstudio = est_select;
    region = constantes.pyEstr.filter(ee.Filter.eq('EST_DESC',areaEstudio)).geometry();
  }
  else {if (checkDepartamento === true) {
    areaEstudio = dpto_select;
    region = constantes.pyDpto.filter(ee.Filter.eq('DPTO_DESC',areaEstudio)).geometry();
  }
  else {if (checkDistrito === true) {
    areaEstudio = dist_select;
    region = constantes.pyDist.filter(ee.Filter.eq('DIST_DESC',areaEstudio)).geometry();
  }
  else {if (checkAsset === true) {
    areaEstudio = idAsset;
    region = ee.FeatureCollection(areaEstudio);
  }
  else {if (checkDibujo === true) {
    areaEstudio = 'Custom';
    var poligono = dibujos.get(0).getEeObject().geometries().getGeometry(-1);
    region = ee.FeatureCollection(poligono);
}}}}}}}
  print('areaEstudio',areaEstudio);
  print('region',region);
map1.centerObject(region);
//------------------------VISUALIZACIÓN
// capas auxiliares
var vacio = ee.Image().byte();
var dist_vacio = vacio.paint({featureCollection: constantes.pyDist,color:1,width:1});
var dpto_vacio = vacio.paint({featureCollection: constantes.pyDpto,color:1,width:1.5});
var est_vacio = vacio.paint({featureCollection: constantes.pyEstr,color:1,width:2});
var reg_vacio = vacio.paint({featureCollection: constantes.pyReg,color:1,width:2.5});
var visParam = {"opacity": 1, palette:'1e7c36,ffe4a9,ff0000,8500ff','min':1, 'max':4};
map1.addLayer(mapaSelect.clip(region),visParam,'SSMT MAPA');
map1.addLayer(ifnSelect.filterBounds(region),{},'IFN parcelas');
map1.addLayer(dist_vacio.clip(region),{'opacity': 0.5, palette:'871186'},'Distritos',false);
map1.addLayer(dpto_vacio.clip(region),{'opacity': 0.5, palette:'ad4545'},'Departamentos',false);
map1.addLayer(est_vacio.clip(region),{'opacity': 0.5, palette:'1cb316'},'Estratos Forestales',false);
map1.addLayer(reg_vacio.clip(region),{'opacity': 0.5, palette:'474440'},'Regiones',false);
// Agregar leyenda
map1.add(funciones.crearLeyenda());
//}
// Crear inspector de celdas.
var inspectorFontsize = '80%';
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
    style: {
    position: 'top-right',
    padding: '4px 4px'
  }
});
inspector.add(ui.Label('Información del Mapa',{'font-size': inspectorFontsize}));
map1.add(inspector);
map1.style().set('cursor', 'crosshair');
map1.onClick(function(coords) {
//Mostrar mensaje cargando
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Cargando...', {'color': 'gray','font-size': inspectorFontsize}));
 // Crear las variables que va contener el inspector 
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var lon = ee.Number(coords.lon);
  var lat = ee.Number(coords.lat);
  var regionIns = ee.Feature(constantes.pyReg.filterBounds(point).first());
  var descReg = regionIns.get('REG_DESC');
  var estrIns = ee.Feature(constantes.pyEstr.filterBounds(point).first());
  var descEst = estrIns.get('EST_DESC');
  var dptoIns = ee.Feature(constantes.pyDpto.filterBounds(point).first());
  var descDpto = dptoIns.get('DPTO_DESC');
  var distIns = ee.Feature(constantes.pyDist.filterBounds(point).first());
  var descDist = distIns.get('DIST_DESC');
  var ifnIns = ee.Feature(info_IFN_select.filterBounds(point).first());
  var idPlot = ifnIns.get('ID_Plot');
  var muestra = ifnIns.get('ESTRATO');
  var bio_ae = ifnIns.get('BIO_ae');
  var carb_ae = ifnIns.get('CARBO_ae');
  var bio_subt = ifnIns.get('BIO_subt');
  var carb_subt = ifnIns.get('CARBO_subt');
  var bio_soto = ifnIns.get('BIO_soto');
  var carb_soto = ifnIns.get('CARBO_soto');
  var bio_toco = ifnIns.get('BIO_toco');
  var carb_toco = ifnIns.get('CARBO_toco');
  var bio_det = ifnIns.get('BIO_det');
  var carb_det = ifnIns.get('CARBO_det');
  var necro_amp = ifnIns.get('NECRO_amp');
  var carb_amp = ifnIns.get('CARBO_amp');
  var necro_mmc = ifnIns.get('NECRO_mmc');
  var carb_mmc = ifnIns.get('CARBO_mmc');
  var carb_suelo = ifnIns.get('CARBO_suel');
//Crear campo con informacion
lon.evaluate(function(result) {
  inspector.clear();
    inspector.add(ui.Label({
      value: 'Longitud: ' + result.toFixed(6),
      style: {'stretch': 'vertical', 'font-size': inspectorFontsize}
    }))}); 
lat.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'Latitud: ' + result.toFixed(6),
      style: {'stretch': 'vertical', 'font-size': inspectorFontsize}
    }))}); 
descReg.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'Región: ' + result,
      style: {'stretch': 'vertical', 'font-size': inspectorFontsize},
    }))});
descEst.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'Estrato: ' + result,
      style: {'stretch': 'vertical', 'font-size': inspectorFontsize},
    }))});
descDpto.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'Dpto: ' + result,
      style: {'stretch': 'vertical', 'font-size': inspectorFontsize},
    }))});
descDist.evaluate(function(result) {
    inspector.add(ui.Label({
      value: 'Dist: ' + result,
      style: {'stretch': 'vertical', 'font-size': inspectorFontsize},
    }))});
idPlot.evaluate(function(result) {
  inspector.add(ui.Label({
    value: 'ID parcela: ' + result,
    style: {'stretch': 'vertical', 'font-size': inspectorFontsize},
  }))});    
muestra.evaluate(function(result) {
  inspector.add(ui.Label({
    value: 'Estrato : ' + result,
    style: {'stretch': 'vertical', 'font-size': inspectorFontsize},
  }))});
bio_ae.evaluate(function(result) {
  inspector.add(ui.Label({
    value: 'Biomasa Aérea (tn/ha) : ' + result,
    style: {'stretch': 'vertical', 'font-size': inspectorFontsize},
  }))});
carb_ae.evaluate(function(result) {
  inspector.add(ui.Label({
    value: 'Carbono Biomasa Aérea (tn/ha) : ' + result,
    style: {'stretch': 'vertical', 'font-size': inspectorFontsize},
  }))});
bio_subt.evaluate(function(result) {
  inspector.add(ui.Label({
    value: 'Biomasa Subeterránea (tn/ha) : ' + result,
    style: {'stretch': 'vertical', 'font-size': inspectorFontsize},
  }))});
carb_subt.evaluate(function(result) {
  inspector.add(ui.Label({
    value: 'Carbono en Biomasa Subeterránea (tn/ha) : ' + result,
    style: {'stretch': 'vertical', 'font-size': inspectorFontsize},
  }))}); 
bio_soto.evaluate(function(result) {
  inspector.add(ui.Label({
    value: 'Biomasa Sotobosque (tn/ha) : ' + result,
    style: {'stretch': 'vertical', 'font-size': inspectorFontsize},
  }))});
 carb_soto.evaluate(function(result) {
  inspector.add(ui.Label({
    value: 'Carbono en Biomasa Sotobosque (tn/ha) : ' + result,
    style: {'stretch': 'vertical', 'font-size': inspectorFontsize},
  }))});
bio_det.evaluate(function(result) {
  inspector.add(ui.Label({
    value: 'Biomasa detritus (tn/ha) : ' + result,
    style: {'stretch': 'vertical', 'font-size': inspectorFontsize},
  }))});
carb_det.evaluate(function(result) {
  inspector.add(ui.Label({
    value: 'Carbono en Biomasa detritus (tn/ha) : ' + result,
    style: {'stretch': 'vertical', 'font-size': inspectorFontsize},
  }))});
necro_amp.evaluate(function(result) {
  inspector.add(ui.Label({
    value: 'Necromasa-Árbol muerto en pie (tn/ha) : ' + result,
    style: {'stretch': 'vertical', 'font-size': inspectorFontsize},
  }))});
carb_amp.evaluate(function(result) {
  inspector.add(ui.Label({
    value: 'Necromasa-Árbol muerto en pie (tn/ha) : ' + result,
    style: {'stretch': 'vertical', 'font-size': inspectorFontsize},
  }))});
necro_mmc.evaluate(function(result) {
  inspector.add(ui.Label({
    value: 'Necromasa-Madera muerta caída (tn/ha) : ' + result,
    style: {'stretch': 'vertical', 'font-size': inspectorFontsize},
  }))});
carb_mmc.evaluate(function(result) {
  inspector.add(ui.Label({
    value: 'Necromasa-Madera muerta caída (tn/ha) : ' + result,
    style: {'stretch': 'vertical', 'font-size': inspectorFontsize},
  }))});
carb_suelo.evaluate(function(result) {
  inspector.add(ui.Label({
    value: 'Carbono en el suelo (tn/ha) : ' + result,
    style: {'stretch': 'vertical', 'font-size': inspectorFontsize},
  }))});
   });
}
// mapaSelect.clip(region) esa es la variable desde la cual hay que crear el chart