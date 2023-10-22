var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -56.66556584111225,
                -25.671636912594863
              ],
              [
                -56.47330509892475,
                -25.676587752318174
              ],
              [
                -56.4375995325185,
                -25.60973407511226
              ],
              [
                -56.465065352831,
                -25.545321100533666
              ],
              [
                -56.67655216923725,
                -25.567621821405783
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[-56.66556584111225, -25.671636912594863],
          [-56.47330509892475, -25.676587752318174],
          [-56.4375995325185, -25.60973407511226],
          [-56.465065352831, -25.545321100533666],
          [-56.67655216923725, -25.567621821405783]]]),
    aoi = ui.import && ui.import("aoi", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -159.90452018696843,
            0.2085561506432854
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([-159.90452018696843, 0.2085561506432854]),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "nd"
        ],
        "palette": [
          "ff0000",
          "ffa218",
          "0eebe1"
        ]
      }
    }) || {"opacity":1,"bands":["nd"],"palette":["ff0000","ffa218","0eebe1"]},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "nd"
        ],
        "palette": [
          "ff0000",
          "ffa218",
          "0eebe1"
        ]
      }
    }) || {"opacity":1,"bands":["nd"],"palette":["ff0000","ffa218","0eebe1"]};
var funciones = require('users/reginoa579/PTI-LPI:base/Funciones');
var datos = require('users/reginoa579/PTI-LPI:base/Data');
//----------------------------Interfaz de usuario Diseño
var mainPanel = ui.Panel({style: {width: '320',backgroundColor: 'white'}});
var mapPanel = ui.Map();
function confMap(mapa){
  var estilosMapa = funciones.mapStyles();
  var gris = estilosMapa.gris;
  var oscuro = estilosMapa.oscuro;
  mapa.clear(),
  mapa.setOptions('ROADMAP',{'Gris': gris, 'Oscuro': oscuro});
}
function herramientaDibujos(mapa){
var drawingTools = mapa.drawingTools();
drawingTools.setDrawModes(['polygon','point']);
drawingTools.setLinked(false);
drawingTools.addLayer([ee.Geometry.Point([-159.90452018696843, 0.2085561506432854])],'aoi');
var dibujos = drawingTools.layers();
return dibujos}
var dibujos = herramientaDibujos(mapPanel);
ui.root.clear();
ui.root.add(ui.SplitPanel(mainPanel,mapPanel));
var dptosPy = ee.FeatureCollection('users/reginoa579/Database/dptoPy_2019');
//=================INTERFAZ DE USUARIO FUNCIONAL
function interfaz(panel){
var titulo = ui.Label('Laboratorio de Procesamiento de imágenes', {'fontWeight': 'bold',fontSize: '12px', color: '0b1176',backgroundColor: '00000000'});
var expl = ui.Label('Portal para visualización, análisis y descarga de Imágenes Satelitales (Colección Sentinel 2) e Índices Espectrales',
{fontSize: '11px', color: 'black',backgroundColor: '00000000'});
var subtit1 = ui.Label('Seleccionar área de Estudio',{'fontWeight': 'bold',fontSize: '11px', color: '0b1176',backgroundColor: '00000000'});
var titlePanel = ui.Panel({widgets: [titulo,expl,subtit1],layout:'flow',style:{backgroundColor:'00000000'}});
mainPanel.add(titlePanel);
// var Sentinel_2 = ee.ImageCollection('COPERNICUS/S2_SR');
// var Landsat_8 = ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA");
// var Colecciones = {'COPERNICUS/Sentinel 2':Sentinel_2,'USGS/Landsat_8':Landsat_8}; 
// // print(Colecciones)
// Departamentos
var Departamentos = {
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
// print(Departamentos)
// Selectores
//title
// var selectCol = ui.Select({
//   items: Object.keys(Colecciones),
//   placeholder:'Seleccione Dataset',
//   value: Colecciones[0]
// });
// mainPanel.add(ui.Panel({widgets:[selectCol], layout:'flow', style:{color:'green',backgroundColor: '00000000'}}));
//title
var selectDpto = ui.Select({
  items: Object.keys(Departamentos), 
  placeholder:'Seleccione Departamento',
  value: Departamentos[0]
  });
// mainPanel.add(ui.Panel({widgets:[selectDpto], layout:'flow', style:{color:'green',backgroundColor: '00000000'}}));
var idAsset = ui.Textbox({placeholder:'Introducir id del asset'});
// mainPanel.add(ui.Panel({widgets:[idAsset], layout:'flow', style:{color:'green',backgroundColor: '00000000'}}));
//checkbox
var checkDpto = ui.Checkbox({
      label: '    Selec. por Dpto',
      value: false,
      onChange: function(){return checkAsset.setValue(false),checkDibujo.setValue(false)},
      style:{color:'0b1176',backgroundColor:'00000000'}
});
var checkAsset = ui.Checkbox({
      label: '    Selec. por Asset',
      value: false,
      onChange: function(){return checkDpto.setValue(false),checkDibujo.setValue(false)},
      style:{color:'0b1176',backgroundColor:'00000000'}
});
var checkDibujo = ui.Checkbox({
      label: '    Dibujar AOI', 
      value : true,
      onChange: function(){return checkDpto.setValue(false),checkAsset.setValue(false)},
      style:{color:'0b1176',backgroundColor:'00000000'}
});
var panelDpto = ui.Panel({widgets:[checkDpto,selectDpto], layout:ui.Panel.Layout.Flow('horizontal'), style:{color:'green',backgroundColor: '00000000'}});
var panelAsset = ui.Panel({widgets:[checkAsset,idAsset], layout:ui.Panel.Layout.Flow('horizontal'), style:{color:'green',backgroundColor: '00000000'}});
 mainPanel.add(ui.Panel({widgets:[panelDpto,panelAsset,checkDibujo], layout:'flow', style:{color:'green',backgroundColor: '00000000'}}));
// var fechaSelect =  ui.DateSlider({
//     start:'2020-01-01',
//     end:ee.Date(Date.now()),
//     period:8,
//     onChange:function(){},
//     style: {width: '300px',backgroundColor: '00002222'}
//           });
// print('fecha Select inicio',fechaSelect.getValue()[0]); print('fecha select final',fechaSelect.getValue()[1])
// var fechaSelect1 = ee.Date(fechaSelect.getValue()[0]).format('YYYY-MM-dd'); print('FECHA INICIO',fechaSelect1);
// var fechaSelect2 = ee.Date(fechaSelect.getValue()[1]).format('YYYY-MM-dd'); print('FECHA FINAL', fechaSelect2);
var subtit2 = ui.Label('Seleccionar rango de fechas',{'fontWeight': 'bold',fontSize: '11px', color: '0b1176',backgroundColor: '00000000'});
var subtitlePanel = ui.Panel({widgets: [subtit2],layout:'flow',style:{backgroundColor:'00000000'}});
var refdate1 = ui.Label('Fecha inicial',{fontSize: '11px', color: '0b1176',backgroundColor: '00000000'});
var refdate2 = ui.Label('Fecha final',{fontSize: '11px', color: '0b1176',backgroundColor: '00000000'});
var fechaSelect1 = ui.Textbox({placeholder:'aaaa-mm-dd'});
var fechaSelect2 = ui.Textbox({placeholder:'aaaa-mm-dd'});
var datePanel1 = ui.Panel({widgets:[fechaSelect1,refdate1], layout:ui.Panel.Layout.Flow('horizontal'), style:{color:'0b1176',backgroundColor: '00000000'}});
var datePanel2 = ui.Panel({widgets:[fechaSelect2,refdate2], layout:ui.Panel.Layout.Flow('horizontal'), style:{color:'0b1176',backgroundColor: '00000000'}});
// creación de checkbox para Visualaización
var checkRGB = ui.Checkbox({label: 'RGB', value: true, 
                        onChange:function(){return checkIR.setValue(false),
                                            checkFC.setValue(false)}, 
                        style:{color:'0b1176',backgroundColor:'00000000'}});
var checkIR = ui.Checkbox({label: 'IR', value: false, 
                        onChange:function(){return checkRGB.setValue(false),
                                            checkFC.setValue(false)},
                        style:{color:'0b1176',backgroundColor:'00000000'}});
var checkFC = ui.Checkbox({label: 'Falso Color', value: false, 
                        onChange:function(){return checkRGB.setValue(false),
                                                  checkIR.setValue(false)},
                        style:{color:'0b1176',backgroundColor:'00000000'}});                      
// Creación de checkbox para INDEX                        
var checkNDVI = ui.Checkbox({label: 'NDVI', value: true,
                        onChange:function(){return checkNDRE.setValue(false),
                                                  checkNDWI.setValue(false),
                                                  checkNBR.setValue(false)},
                        style:{color:'0b1176',backgroundColor:'00000000'}});
var checkNDRE = ui.Checkbox({label: 'NDRE', value: false,
                        onChange:function(){return checkNDVI.setValue(false),
                                                  checkNDWI.setValue(false),
                                                  checkNBR.setValue(false)},
                        style:{color:'0b1176',backgroundColor:'00000000'}});
var checkNDWI = ui.Checkbox({label: 'NDWI', value: false,
                        onChange:function(){return checkNDVI.setValue(false),
                                                   checkNDRE.setValue(false),
                                                   checkNBR.setValue(false)},
                        style:{color:'0b1176',backgroundColor:'00000000'}});                      
// Add más índices
var checkNBR = ui.Checkbox({label: 'NBR',value:false,
                        onChange: function(){return checkNDVI.setValue(false), 
                                                    checkNDRE.setValue(false),
                                                    checkNDWI.setValue(false)},
                        style:{color:'0b1176',backgroundColor:'00000000'}});
 mainPanel.add(ui.Panel({widgets:[subtitlePanel,datePanel1,datePanel2]}));
var subtit3 = ui.Label('Seleccionar una visualización',{'fontWeight': 'bold',fontSize: '11px', color: '0b1176',backgroundColor: '00000000'});
var visPanel = ui.Panel({
  widgets:[checkRGB,checkIR,checkFC], 
  layout:ui.Panel.Layout.Flow('horizontal'), 
  style:{backgroundColor: '00000000'}
});
var subtit4 = ui.Label('Seleccionar un índice',{'fontWeight': 'bold',fontSize: '11px', color: '0b1176',backgroundColor: '00000000'});
var indexPanel = ui.Panel({
 widgets:[checkNDVI,checkNDRE,checkNDWI], 
 layout:ui.Panel.Layout.Flow('horizontal'), 
 style:{backgroundColor: '00000000'}
});
var indexPanel2 = ui.Panel({
  widgets:[checkNBR], 
  layout:ui.Panel.Layout.Flow('horizontal'), 
  style:{backgroundColor: '00000000'}
});
mainPanel.add(ui.Panel({widgets:[subtit3,visPanel]}));
mainPanel.add(ui.Panel({widgets:[subtit4,indexPanel,indexPanel2]}));
// var boton = ui.Button({label:'Aplicar', onClick:triggerStart});
// mainPanel.add(boton);
var outputs = {};
// outputs.selectCol = selectCol;
// outputs.fechaSelect = fechaSelect
outputs.fechaSelect1 = fechaSelect1;
outputs.fechaSelect2 = fechaSelect2;
outputs.checkDpto = checkDpto;
outputs.selectDpto = selectDpto;
outputs.checkAsset = checkAsset;
outputs.idAsset = idAsset;
outputs.checkDibujo = checkDibujo;
outputs.checkRGB = checkRGB;
outputs.checkIR = checkIR;
outputs.checkFC = checkFC;
outputs.checkNDVI = checkNDVI;
outputs.checkNDRE = checkNDRE;
outputs.checkNDWI = checkNDWI;
// agregar los nuevos indices como salidas
outputs.checkNBR = checkNBR;
return(outputs); 
}
var interfazUsuario = interfaz(mainPanel);
mapPanel.setCenter(-57.6160399213382,-24.055037600053165, 6);
//::::::::::::::::::::::::INICIO DE LA APP:::::::::::::::::::::::::::::::::
var estado;
function triggerStart(){
  estado = start();
}
function start(){//
//Limpieza de mapa y carga de opciones
confMap(mapPanel);
//Selección del Usuario
// var selectCol = interfazUsuario.selectCol.getValue();
// var fechaSelect = interfazUsuario.fechaSelect.getValue();
var fecha1 = ee.Date(interfazUsuario.fechaSelect1.getValue());
var fecha2 = ee.Date(interfazUsuario.fechaSelect2.getValue());
var fechaSelect1 = interfazUsuario.fechaSelect1.getValue();
var fechaSelect2 = interfazUsuario.fechaSelect2.getValue();
var checkDpto = interfazUsuario.checkDpto.getValue();
var selectDpto = interfazUsuario.selectDpto.getValue();
var checkAsset = interfazUsuario.checkAsset.getValue();
var idAsset = interfazUsuario.idAsset.getValue();
var checkDibujo = interfazUsuario.checkDibujo.getValue();
var checkRGB = interfazUsuario.checkRGB.getValue();
var checkIR = interfazUsuario.checkIR.getValue();
var checkFC = interfazUsuario.checkFC.getValue();
var checkNDVI = interfazUsuario.checkNDVI.getValue();
var checkNDRE = interfazUsuario.checkNDRE.getValue();
var checkNDWI = interfazUsuario.checkNDWI.getValue();
// Agregar los inidces incorporados
var checkNBR = interfazUsuario.checkNBR.getValue();
// Variables de Estudio
var areaEstudio,region;
// Seleccionar Dataset
// var selec_colec;
// switch (selectCol){
//   case 'COPERNICUS/Sentinel 2':
//     selec_colec = Sentinel_2;
//     break;
//   case 'USGS/Landsat_8':
//     selec_colec = Landsat_8;
// }
// print('Dataset seleccionado',selec_colec);
// Selección de área
if (checkDpto === true) {
    areaEstudio = selectDpto;
    region = dptosPy.filter(ee.Filter.eq('DPTO_DESC',areaEstudio)).geometry();
  }
  else {if (checkAsset === true) {
    areaEstudio = idAsset;
    region = ee.FeatureCollection(areaEstudio);
  }
  else {if (checkDibujo === true) {
    areaEstudio = 'Custom';
    var poligono = dibujos.get(0).getEeObject().geometries().getGeometry(-1);
    region = ee.FeatureCollection(poligono);
  }
  }}
print('Selección de Area de Estudio',areaEstudio);
print('Selección de Region',region);
mapPanel.centerObject(region);
var bandas = [
  'B1',
  'B2',
  'B3',
  'B4',
  'B5',
  'B6',
  'B7',
  'B8',
  'B8A',
  'B9',
  'B11',
  'B12'
  ]
var collection = ee.ImageCollection('COPERNICUS/S2_SR').filterBounds(region)
    .filterDate(fecha1,fecha2)
    .filter(ee.Filter.lte('CLOUDY_PIXEL_PERCENTAGE',10)).mosaic().select(bandas);
print('Colección',ee.ImageCollection('COPERNICUS/S2_SR').filterBounds(region)
    .filterDate(fecha1,fecha2))
//     var capa = ui.Map.Layer(colection,
//     visParam);
//     Map.layers().set(0,capa);
// };
// Seleccion de visualizacion
var layer, visParam, descComposite;
if (checkRGB === true) {
  layer = collection.select("B4","B3","B2");
  visParam = {"opacity":1,"bands":["B4","B3","B2"],"min":1200,"max":2500,"gamma":1};
  descComposite = 'RGB';
  }
  else{if (checkIR === true){
  layer = collection.select("B8","B11","B12");
  visParam = {"opacity":1,"bands":["B8","B11","B12"],"min":1200,"max":6000,"gamma":1};
  descComposite = 'IR';
  }
  else{if (checkFC === true){
  layer = collection.select("B11","B8A","B2");
  visParam = {"opacity":1,"bands":["B11","B8A","B2"],"min":1000,"max":5000,"gamma":1};
  descComposite = 'FalsoColor';
  }
  }}
print('Coleccion Vis',layer);
// // Seleccion de visualizacion index
  var layerI, visParamI,descIndex;
if (checkNDVI === true) {
  layerI = collection.normalizedDifference(['B8', 'B4']);
  visParamI = {min: -1, max: 1, palette: ['red','yellow','green']};
  descIndex = 'NDVI';
  }
  else{if (checkNDRE === true){
  layerI = collection.normalizedDifference(['B8', 'B5']);
  visParamI = {min: -1, max: 1, palette: ['yellow','orange','brown']};
  descIndex = 'NDRE';
  }
  else{if (checkNDWI === true){
  layerI = collection.normalizedDifference(['B3', 'B8']);
  visParamI = {min: -1, max: 1, palette: ['white','skyblue','blue']};
  descIndex = 'NDWI';
  }
  // agregar los indices incorporados
  else{if (checkNBR === true){
  layerI = collection.normalizedDifference(['B8A','B12']);
  visParamI = {min: -1, max: 1, palette: ['5a0000','c41704','ff0000','fffc97','6eff00','17da00']};
  descIndex = 'NBR';
  }
  }}}
 print()
// Visualización de capas
var vacio = ee.Image().byte();
var dpto_vacio = vacio.paint({featureCollection: dptosPy,color:1,width:1.5});
// mapPanel.addLayer(dpto_vacio.clip(region),{'opacity': 1, palette:'00fff9'},'Departamentos',false);
mapPanel.addLayer(layer.clip(region),visParam,'Composite');
mapPanel.addLayer(layerI.clip(region),visParamI,'Index');
// mapPanel.addLayer(layerIR.clip(region),visParamIR,'Composite IR');
// mapPanel.addLayer(layerNDVI.clip(region),visParamNDVI,'Composite NDVI');
var outputs = {};
outputs.collection = collection;
outputs.layer = layer
outputs.layerI = layerI
outputs.visParam = visParam;
outputs.region = region
return(outputs);
}
var boton = ui.Button({label:'Aplicar', onClick:triggerStart});
// ============ DESCARGA DE DATOS
var botonDescarga = ui.Button({
  label:'Descarga',
  onClick: function(d){
    Export.image.toDrive({image: estado.layer, description: 'Composite', folder: 'Descargas_LPI', region: estado.region, scale:10, maxPixels:1e12});
    Export.image.toDrive({image: estado.layerI, description: 'Index', folder: 'Descargas_LPI', region: estado.region, scale:10, maxPixels:1e12});
 }});
var buttonPanel = ui.Panel({widgets:[boton,botonDescarga], layout:ui.Panel.Layout.Flow('horizontal'), style:{color:'0b1176',backgroundColor: '00000000'}});
mainPanel.add(ui.Panel({widgets:[buttonPanel]}));
// var botonDescarga = ui.Button({label: 'Descargar', onClick: download});
//mainPanel.add(botonDescarga);
var mensaje = ui.Label('IMPORTANTE', {'fontWeight': 'bold',fontSize: '12px', color: 'd63000',backgroundColor: '00000000'});
var mnsjdesc = ui.Label('Para la descarga de los datos se requiere una suscripción a #GEE y acceder al repositorio', {fontSize: '11px', color: 'black',backgroundColor: '00000000'});
var link = ui.Label(
    'Crear cuenta de #GEE aquí', {},
    'https://signup.earthengine.google.com/#!/');
mainPanel.add(ui.Panel({widgets:[mensaje,mnsjdesc,link]}));