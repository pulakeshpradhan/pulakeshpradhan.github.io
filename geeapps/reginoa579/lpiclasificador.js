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
    }) || {"opacity":1,"bands":["nd"],"palette":["ff0000","ffa218","0eebe1"]},
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B3",
          "B2",
          "B1"
        ],
        "min": 63,
        "max": 9269,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B3","B2","B1"],"min":63,"max":9269,"gamma":1},
    imageVisParam4 = ui.import && ui.import("imageVisParam4", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B3",
          "B2",
          "B1"
        ],
        "min": 1069,
        "max": 2754,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B3","B2","B1"],"min":1069,"max":2754,"gamma":1};
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
var aspIB = datos.aspIB; 
var bioIB = datos.bioIB; 
var distBioIB = datos.distBioIB;
print('exports from datos',aspIB,bioIB,distBioIB);
// puntos de entrenamiento nivel 1
var forest =  datos.forest
var nonForest = datos.nonForest
var water = datos.water
print('Puntos para nivel 1',forest,nonForest,water);
// puntos de entrenamiento nivel 2
var IPCC1 = datos.IPCC1
var IPCC2 = datos.IPCC2
var IPCC3 = datos.IPCC3
var IPCC4 = datos.IPCC4
var IPCC5 = datos.IPCC5
var IPCC6 = datos.IPCC6
print('Puntos para nivel 2',IPCC1,IPCC2,IPCC3,IPCC4,IPCC5,IPCC6);
// Fusión de puntos de entrenamiento
var trnL1 = forest.merge(nonForest).merge(water); // Crear puntos de entrenamiento para nivel 1
var trnL2 = IPCC1.merge(IPCC2).merge(IPCC3).merge(IPCC4).merge(IPCC5).merge(IPCC6); //Crear puntos de entrenamiento para nivel 2
print('Fusiones',trnL1,trnL2)
//=================INTERFAZ DE USUARIO FUNCIONAL
function interfaz(panel){
var titulo = ui.Label('Laboratorio de Procesamiento de imágenes', {'fontWeight': 'bold',fontSize: '12px', color: '0b1176',backgroundColor: '00000000'});
var expl = ui.Label('Portal para clasificación supervisada automática',
{fontSize: '11px', color: 'black',backgroundColor: '00000000'});
var subtit1 = ui.Label('Seleccionar área de Estudio',{'fontWeight': 'bold',fontSize: '11px', color: '0b1176',backgroundColor: '00000000'});
var titlePanel = ui.Panel({widgets: [titulo,expl,subtit1],layout:'flow',style:{backgroundColor:'00000000'}});
mainPanel.add(titlePanel);
// ASP_IB
var ASP_IB = {
'Reserva Natural Carapá':[1],
'Refugio Biológico Mbaracayú':[2],
'Reserva Biológica Limoy':[3],
'Reserva Natural Pikyry':[4],
'Reserva Biológica Itabo':[5],
'Refugio de Vida Silvestre Yvytu Rokai':[6],
'Refugio Bilólogico Tati Yupi':[7],
};
var dist_IB = {
  'FRANCISCO CABALLERO ALVAREZ':[0],
  'KATUETE':[0],
  'MBARACAYU':[0],
  'SAN ALBERTO':[0],
  'SANTA FE DEL PARANA':[0],
  'VILLA YGATIMÍ':[0],
  'YBYRAROBANA':[0],
  'CORPUS CHRISTI':[0],
  'SALTOS DEL GUAIRA':[0],
  'LA PALOMA':[0],
  'NUEVA ESPERANZA':[0],
  'ITAKYRY':[0],
  'MINGA PORA':[0],
  'HERNANDARIAS':[0],
  'VAQUERIA':[0],
};
// print(ASP_IB)
// Selectores
//title
// var selectCol = ui.Select({
//   items: Object.keys(Colecciones),
//   placeholder:'Seleccione Dataset',
//   value: Colecciones[0]
// });
// mainPanel.add(ui.Panel({widgets:[selectCol], layout:'flow', style:{color:'green',backgroundColor: '00000000'}}));
//title
var selectASP = ui.Select({
  items: Object.keys(ASP_IB), 
  placeholder:'Seleccione Area Protegida',
  value: ASP_IB[0]
  });
var selectDist = ui.Select({
   items: Object.keys(dist_IB), 
  placeholder:'Seleccione Distrito',
  value: dist_IB[0]
});
// mainPanel.add(ui.Panel({widgets:[selectASP], layout:'flow', style:{color:'green',backgroundColor: '00000000'}}));
//checkbox
var checkBIO = ui.Checkbox({
      label: '    Biosfera ITAIPU',
      value: true,
      onChange: function(){return checkASP.setValue(false),checkDist.setValue(false),checkDibujo.setValue(false)},
      style:{color:'0b1176',backgroundColor:'00000000'}
});
var checkASP = ui.Checkbox({
      label: '    Seleccionar Area Protegida',
      value: false,
      onChange: function(){return checkBIO.setValue(false),checkDist.setValue(false),checkDibujo.setValue(false)},
      style:{color:'0b1176',backgroundColor:'00000000'}
});
var checkDist = ui.Checkbox({
      label: '   Seleccionar Distrito',
      value: false,
      onChange: function(){return checkBIO.setValue(false),checkASP.setValue(false),checkDibujo.setValue(false)},
      style:{color:'0b1176',backgroundColor:'00000000'}
})
var checkDibujo = ui.Checkbox({
      label: '    Dibujar AOI', 
      value : false,
      onChange: function(){return checkBIO.setValue(false),checkASP.setValue(false),checkDist.setValue(false)},
      style:{color:'0b1176',backgroundColor:'00000000'}
});
var panelBIO = ui.Panel({widgets:[checkBIO], layout:ui.Panel.Layout.Flow('horizontal'), style:{color:'green',backgroundColor: '00000000'}});
var panelASP = ui.Panel({widgets:[checkASP,selectASP], layout:ui.Panel.Layout.Flow('horizontal'), style:{color:'green',backgroundColor: '00000000'}});
var panelAsset = ui.Panel({widgets:[checkDist,selectDist], layout:ui.Panel.Layout.Flow('horizontal'), style:{color:'green',backgroundColor: '00000000'}});
 mainPanel.add(ui.Panel({widgets:[panelBIO,panelASP,panelAsset,checkDibujo], layout:'flow', style:{color:'green',backgroundColor: '00000000'}}));
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
var subtit2 = ui.Label('Seleccionar fecha inicial y fecha final',{'fontWeight': 'bold',fontSize: '11px', color: '0b1176',backgroundColor: '00000000'});
var subtitlePanel = ui.Panel({widgets: [subtit2],layout:'flow',style:{backgroundColor:'00000000'}});
// var refdate1 = ui.Label('Fecha inicial',{fontSize: '11px', color: '0b1176',backgroundColor: '00000000'});
// var refdate2 = ui.Label('Fecha final',{fontSize: '11px', color: '0b1176',backgroundColor: '00000000'});
var fechaSelect1 = ui.Textbox({placeholder:'aaaa-mm-dd'});
var fechaSelect2 = ui.Textbox({placeholder:'aaaa-mm-dd'});
var datePanel1 = ui.Panel({widgets:[fechaSelect1,fechaSelect2], layout:ui.Panel.Layout.Flow('horizontal'), style:{color:'0b1176',backgroundColor: '00000000'}});
// var datePanel2 = ui.Panel({widgets:[,refdate2], layout:ui.Panel.Layout.Flow('horizontal'), style:{color:'0b1176',backgroundColor: '00000000'}});
// creación de checkbox para Visualaización
var checkL1 = ui.Checkbox({label: 'Nivel 1', value: true, 
                        onChange:function(){return checkL2.setValue(false)},
                        style:{color:'0b1176',backgroundColor:'00000000'}});
var checkL2 = ui.Checkbox({label: 'Nivel 2', value: false, 
                        onChange:function(){return checkL1.setValue(false)},
                        style:{color:'0b1176',backgroundColor:'00000000'}});
 mainPanel.add(ui.Panel({widgets:[subtitlePanel,datePanel1]}));
var subtit3 = ui.Label('Seleccionar nivel de clasificación',{'fontWeight': 'bold',fontSize: '11px', color: '0b1176',backgroundColor: '00000000'});
var visPanel = ui.Panel({
  widgets:[checkL1,checkL2], 
  layout:ui.Panel.Layout.Flow('vertical'), 
  style:{backgroundColor: '00000000'}
});
mainPanel.add(ui.Panel({widgets:[subtit3,visPanel]}));
// var boton = ui.Button({label:'Aplicar', onClick:triggerStart});
// mainPanel.add(boton);
var outputs = {};
// outputs.selectCol = selectCol;
// outputs.fechaSelect = fechaSelect
outputs.fechaSelect1 = fechaSelect1;
outputs.fechaSelect2 = fechaSelect2;
outputs.checkBIO = checkBIO;
outputs.selectASP = selectASP;
outputs.checkASP = checkASP;
outputs.checkDist = checkDist;
outputs.selectDist = selectDist;
outputs.checkDibujo = checkDibujo;
outputs.checkL1 = checkL1;
outputs.checkL2 = checkL2;
// agregar los nuevos indices como salidas
return(outputs); 
}
var interfazUsuario = interfaz(mainPanel);
var vacio = ee.Image().byte();
var bioIB_bounds = vacio.paint({featureCollection: bioIB,color:1,width:3});
mapPanel.addLayer(bioIB_bounds,{'palette':'#00edff'},'Biosfera ITAIPU');
mapPanel.centerObject(bioIB,9);
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
var checkBIO = interfazUsuario.checkBIO.getValue();
var selectASP = interfazUsuario.selectASP.getValue();
var checkASP = interfazUsuario.checkASP.getValue();
var checkDist = interfazUsuario.checkDist.getValue();
var selectDist = interfazUsuario.selectDist.getValue();
var checkDibujo = interfazUsuario.checkDibujo.getValue();
var checkL1 = interfazUsuario.checkL1.getValue();
var checkL2 = interfazUsuario.checkL2.getValue();
// Agregar los inidces incorporados
// Variables de Estudio
var areaEstudio,region;
// Selección de área
if (checkBIO === true) {
    areaEstudio = bioIB
    region = ee.FeatureCollection(areaEstudio);
  }
  else {if (checkASP === true) {
    areaEstudio = selectASP;
    region = aspIB.filter(ee.Filter.eq('NOMBRE',areaEstudio)).geometry();
  }
  else {if (checkDist === true) {
    areaEstudio = selectDist;
    region = distBioIB.filter(ee.Filter.eq('DIST_DESC',areaEstudio)).geometry();
  }
  else {if (checkDibujo === true) {
    areaEstudio = 'Custom';
    var poligono = dibujos.get(0).getEeObject().geometries().getGeometry(-1);
    region = ee.FeatureCollection(poligono);
  }
  }}}
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
  ];
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60')
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
// // Map the function over one year of data and take the median.
// // Load Sentinel-2 TOA reflectance data.
// var collection = ee.ImageCollection('COPERNICUS/S2')
//     .filterDate('2016-01-01', '2016-12-31')
//     // Pre-filter to get less cloudy granules.
//     .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
//     .map(maskS2clouds)
var collection = ee.ImageCollection('COPERNICUS/S2_SR').filterBounds(region).filterDate(fecha1,fecha2)
     .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
     .map(maskS2clouds)
var composite = collection.median()
     print('mosaico con filtro',composite)
// print('Colección',ee.ImageCollection('COPERNICUS/S2_SR').filterBounds(region)
//     .filterDate(fecha1,fecha2));
// Seleccion de Clasificaciónc
var clases, training, trained, classified, visParam;
if (checkL1 === true) {
  clases = trnL1;//.filterBounds(region);
  training = composite.sampleRegions(clases,['clase'],30);
  trained = ee.Classifier.smileCart(20).train(training,'clase',bandas);
  classified = composite.select(bandas).classify(trained);
  visParam = {min:1, max:3, palette:["#328033","#ffe389","#0cb6ff"]};
  }
  else{if (checkL2 === true){
  clases = trnL2;//.filterBounds(region);
  training = composite.sampleRegions(clases,['clase'],30);
  trained = ee.Classifier.smileCart(20).train(training,'clase',bandas);
  classified = composite.select(bandas).classify(trained);
  visParam = {min:1, max:6, palette:["#328033","#ffe389","#cce908","#0cb6ff","#d6d6d6","54473e"]}; 
  }} 
print('Coleccion Vis',classified);
// Visualización de capas
mapPanel.addLayer(bioIB_bounds,{'palette':'#00edff'},'Biosfera ITAIPU');
mapPanel.addLayer(composite.clip(region),{"opacity":1,"bands":["B4","B3","B2"],"min":0.10,"max":0.20,"gamma":1},'Composite');
mapPanel.addLayer(classified.clip(region),visParam,'Classification');
mapPanel.addLayer(clases,{},'muestras',false);
mapPanel.add(funciones.crearLeyenda());
var outputs = {};
outputs.collection = collection;
outputs.composite = composite;
outputs.classified = classified;
outputs.visParam = visParam;
outputs.region = region;
return(outputs);
}
var boton = ui.Button({label:'Aplicar', onClick:triggerStart});
// ============ DESCARGA DE DATOS
var botonDescarga = ui.Button({
  label:'Descarga',
  onClick: function(d){
    Export.image.toDrive({image: estado.composite, description: 'Composite', folder: 'Descargas_LPI', region: estado.region, scale:10, maxPixels:1e12});
    Export.image.toDrive({image: estado.classified, description: 'Classified', folder: 'Descargas_LPI', region: estado.region, scale:10, maxPixels:1e12});
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