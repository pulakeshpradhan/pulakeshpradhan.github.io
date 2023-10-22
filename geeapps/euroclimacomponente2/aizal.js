/*
Script desarrollado en el marco del Proyecto Euroclima+ "Vivir y producir en el Bosque Chaqueño"
Segmentador SNIC aplicado a la delimitación y caracterización de Grandes Unidades de Paisajes (GUPas) del Gran Chaco Americano
Aplica el algoritmo de segmentación, transforma a vector el resultado y calcula los valores medios de
cada una de las variables del set de datos consideradas. Permite exportar el resultado como KML
Actualizado 21/02/2022
Juana Lopez, INTA Santiago del Estero, lopez.juana@inta.gob.ar
*/
//***********************************************************************************
//      Paquete requerido
//***********************************************************************************
var estilos = require('users/euroclimacomponente2/APP_Zonificacion:packages/visor');
//******************************************************************************
//    Definicion de región de análisis, límites geográficos adicionales, escala
//******************************************************************************
//https://gis.stackexchange.com/questions/270033/convert-or-add-hand-drawn-geometries-to-featurecollection-as-they-are-drawn-on-g
var L_GChaco = ee.FeatureCollection('users/euroclimacomponente2/Zonificacion/General/L_GChacoTNCBrasil');//Limite del Gran Chaco (Fuente: WMF)
var complejos = ee.FeatureCollection('users/euroclimacomponente2/Zonificacion/General/complejos_ecosis_tnc');//Complejos Ecosistemicos TNC 2005 para establecer las semillas
var sudamerica = ee.FeatureCollection('users/volante/VARIOS/Sudamerica');
var sitios_pilotos = ee.FeatureCollection('users/euroclimacomponente2/Zonificacion/General/sitiosPilotos'); //Sitios pilotos de la Componente 1 del Proyecto
// Acceso al set de datos (todas las variables)
var standOrig = ee.Image('users/euroclimacomponente2/Zonificacion/Stack/set_datos_escal_0_1_v3');//Variables escaladas al intervalo [0, 1]
var stackOrig = ee.Image('users/euroclimacomponente2/Zonificacion/Stack/set_datos_v3');//Variables con los valores originales
//var semillas = ee.FeatureCollection('users/galarzamartininta/Centroides_TNC');//Centroides de los Complejos Ecosistemicos (TNC, 2005)
var semillas = ee.FeatureCollection('users/euroclimacomponente2/Zonificacion/General/semillasTNC_Brasil');//Centroides de los Complejos Ecosistemicos (TNC, 2005) con semillas agregadas
var scale = 0;
var version = 'V3';
//******************************************************************************
//                      Definiciones de estilos
//******************************************************************************
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var TITLE_STYLE = {
  fontSize: '18px',
  padding: '8px',
  color: 'black',
  fontWeight: 'bold',
  backgroundColor: colors.transparent,
};
var SUBTITLE_STYLE = {
  fontSize: '14px',
  fontWeight: '80',
  color: 'black',
  padding: '2px',
  backgroundColor: colors.transparent,
};
var PARAGRAPH_STYLE = {
  fontSize: '16px',
  fontWeight: '50',
  color: 'black',
  padding: '8px',
  backgroundColor: colors.transparent,
};
var SUBPARAGRAPH_STYLE = {
  fontSize: '13px',
  fontWeight: '50',
  color: 'black',
  padding: '2px',
  backgroundColor: colors.transparent,
};
var LABEL_STYLE = {
  fontWeight: '50',
  textAlign: 'center',
  fontSize: '11px',
  backgroundColor: colors.transparent,
};
var THUMBNAIL_WIDTH = 128;
var BORDER_STYLE = '4px solid rgba(97, 97, 97, 0.05)';
//Paleta de colores asignados a los sitios pilotos
var colorTable = ee.Dictionary({
  'San Francisco': 'e10f2b',
  'Santo Domingo': '263bf4',//1 Santo Domingo
  'Algarrobales': '3ef426',//2 Algarrobales
  'Salta Forestal':'f9ab2c',//3 Salta Forestal'
  'Zona Norte':'63fced',//4 Salta Norte
  'Zona Norte Criollos': '63fced',
  'Marina':'8a30ea',//5 Marina
  'Ismael Pino':'3b9e2a',//6 Ismael Pino
  'Agua de la Paloma':'abb7d6',//7 Agua de la Paloma
  'Campo Cirilo Arriba': '9da64b',
  'Lote Cirilo Abajo':'9da64b',//8 Cirilo
  'Colonia':'6abebd',//9 Colonia
  'Campo Diego Maldonado':'d334eb',//10 Maldonado
  'El Escondido':'863b08',//11 El Escondido
  'La Iguana':'eed9dd',//12 La Iguana
  'Pozo Grande':'ffff00',//13 Pozo Grande
  'Fernandez Irala':'d2e9e0',//14 Fernández Irala
});
//Paleta para leyenda de sitios pilotos
var palette =['e10f2b',// 0 San Francisco
              '263bf4',//1 Santo Domingo
              '3ef426',//2 Algarrobales
              'f9ab2c',//3 Salta Forestal'
              '63fced',//4 Salta Norte
              '8a30ea',//5 Marina
              '3b9e2a',//6 Ismael Pino
              'abb7d6',//7 Agua de la Paloma
              '9da64b',//8 Cirilo
              '6abebd',//9 Colonia
              'd334eb',//10 Maldonado
              '863b08',//11 El Escondido
              'eed9dd',//12 La Iguana
              'ffff00',//13 Pozo Grande
              'd2e9e0',//14 Fernández Irala
];
//******************************************************************************
//                      Definición de Paneles
//******************************************************************************
ui.root.clear();
var mapPanel = ui.Map();
mapPanel.setControlVisibility({layerList: true, zoomControl: false, scaleControl: false, mapTypeControl: true, fullscreenControl: true, drawingToolsControl: true})
mapPanel.setCenter(-64,-27.5,8).setOptions('HYBRID').style().set('cursor', 'crosshair');
// Use un SplitPanel para que sea posible cambiar el tamaño de los dos paneles.
var mainPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {
    stretch: 'horizontal',
    height: '60%',
    width: '500px',
    backgroundColor: colors.gray,
    border: BORDER_STYLE,
    position: 'top-left'
  }
});
var splitPanel = ui.SplitPanel({
  firstPanel: mainPanel,
  secondPanel: mapPanel,
  orientation: 'horizontal',
  style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);
//Crear un panel de avisos
var avisosPanel = new ui.Panel([], ui.Panel.Layout.Flow('horizontal', true),{width:'600px', height:'60px', color:'black',backgroundColor:'white', position: 'bottom-left', shown: false});
mapPanel.add(avisosPanel);
var descargasPanel = new ui.Panel([], ui.Panel.Layout.Flow('vertical', true), {shown: false});
mapPanel.add(descargasPanel);
var inspecPanel = ui.Panel([], ui.Panel.Layout.Flow('vertical', true),{width:'450px', height:'150px', color:'black',backgroundColor:'white', position: 'bottom-center', shown: false});
mapPanel.add(inspecPanel);
//******************************************************************************
//                      Seccion para generar interfaz de usuario
//******************************************************************************
var dicRegion = {
  'Dibujar Area': 'si',
  'Gran Chaco':[]
};
var dicSemillas = {
  'Semillas regulares':['semilla1'],
  'Semilla definidas desde cetroides de Complejos Ecosistémicos':['semilla2'],
  'Semillas definidas por el usuario':['semilla3']
};
var dicEscala = {
  'Resolución 500 m':['500'],
  'Resolución 1000 m':['1000'],
  'Resolución 1500 m':['1500']
};
var variables = {
  banda: ['b01','b02','b03','b04','b05','b06','b07','b08', 'b09','b10','b11','b12','b13','b14','b15','b16','b17a','b17b',
    'b18','b19','b20','b21','b22','b23','b24','b25','b26','b27','b28','b29','b30','b31','b32','b33','b34','b35','b36','b37'],
  descripcion: ['B01- Distancia a cursos de agua','B02- Distancia a cuerpos de agua permanente','B03- Evapotranspiración promedio anual','B04- Precipitación promedio anual','B05- Índice de severidad de la sequía','B06- Temperatura mínima promedio',
    'B07- Temperatura máxima promedio','B08- Albedo','B09- Capacidad de intercambio de cationes','B10- Fragmentos gruesos','B11- Nitrogeno','B12- Arcilla','B13- Densidad de carbono orgánico',
    'B14- Stock de carbono orgánico','B15- Contenido de carbono orgánico','B16- Índice de pH en solución de agua','B17a- Arena','B17b- Limo','B18- Densidad aparente','B19- Riqueza del paisaje',
    'B20- Fragmentacion del paisaje','B21- Dominancia del paisaje','B22- Diversidad del paisaje','B23- Índice de provisión de servicios ecosistémicos','B24- Elevación','B25- Diversidad topografica',
    'B26- Distancia a instituciones','B27- Distancia a áreas protegidas','B28- Poblacion','B29- Impacto humano','B30- Distancia a uso agropecuario','B31- Distancia a uso forestal',
    'B32- Distancia a centros educativos','B33- Distancia a centros de salud','B34- Accesibilidad','B35- Distancia a comunidades originales','B36- Distancia a caminos','B37- Crecimiento poblacional'],
  seleccion: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
};
var parametrosSNIC = {
  nombre: ['size', 'compactness','connectivity','neighborhood Size'],
  ayuda: ['Espaciamiento entre semillas de las zonas, sólo se considera si se eligen semillas distribuidas de manera regular','Valores grandes generan zonas más compactas (cuadradas)','Valores sugeridos 4 u 8','Tamaño de la vecindad, por defecto es 2 * tamaño'],
};
// Contenedor de variables
// Contenedor para selección y ponderacion de variables
var valLabels = {};
var valCheckbox = {};
var mediaLabel = {};
var valParam = {};
//Lista de variables y lista de pesos para correr el script
var listaVar = ee.List([]);
var listaPesos = ee.List([]);
//Activacion de banderas para ejecucion del proceso
var banderaArea = 0;
var banderaVari = 0;
var banderaSemi = 0;
var bandParam = 0;
var banderaEsca = 0;
var banderaPond = 0;
var banderaError = 0;
var tipoSemilla = 0;
var panelVar = 0;
var panelPond = 0;
var panelDesc = 0;
var panelFinSem = 0;
var mensaje = 'Aviso';
var areaInteres = ee.FeatureCollection([]);
var seedInput = ee.FeatureCollection([]);
var uniPaisajes = ee.Image([]);
var GUPasVector = ee.FeatureCollection([]);
//******************************************************************************
//                      Seccion de funciones
//******************************************************************************
//Crear un panel para contener las Bandas
function addSelVar(dicPasos){
  variables.seleccion = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var panel = ui.Panel([], ui.Panel.Layout.Flow('vertical', true),{width:'350px', height:'500px', color:'black',backgroundColor:'white'});
  //Definir los widgets del panel visor
  var visorPanel = ui.Map({style: {width:'400px', height:'500px', stretch: 'both', shown: false}})
        .setControlVisibility(false);
  mapPanel.add(visorPanel);
  visorPanel.centerObject(L_GChaco,5);
  var labtitlezoom = ui.Label('Variables',{maxWidth:'400px',fontSize:'12px',backgroundColor:'00009999',color:'white'});
  visorPanel.widgets().set(1,labtitlezoom);
  var insLabel =  ui.Label('Valor',{'width':'30px','fontSize':'12px', 'padding':'0px', 'margin':'1px', backgroundColor:'00009999',color:'white'});
  var valorVar =  ui.Label('Clic en el mapa',{'fontSize':'12px', 'padding':'0px', 'margin':'1px', backgroundColor:'00009999',color:'white'});
  var inspecVisor = ui.Panel([insLabel, valorVar], ui.Panel.Layout.Flow('horizontal'), {'position': 'bottom-center', backgroundColor:'00009999',color:'white'});
  visorPanel.widgets().set(2,inspecVisor);
  visorPanel.style().set('shown', true).set('cursor', 'crosshair');
  var splitPanelVar = ui.SplitPanel({
    firstPanel: visorPanel,
    secondPanel: panel,
    orientation: 'horizontal',
    style: {stretch: 'both'}
  });
  var addVarLabel = ui.Label('Seleccione las variables, vea su descripción en Fichas de variables',  {'height':'30px','fontSize':'14px', 'fontWeight': 'bold', 'padding':'0px', 'margin':'1px'});
  panel.add(addVarLabel);
  var urlClick = ui.Label({
    value: 'Fichas de variables',
    style: {fontSize: "14px", backgroundColor:'00000000'},
    targetUrl: 'https://drive.google.com/file/d/1PB7z47IUXuRqX-rWHWHrL3By3RFLvhrT/view'
  });
  panel.add(urlClick);
  var addSelVarSubPanel = ui.Panel([], ui.Panel.Layout.Flow('vertical', true),{maxHeight:'350px',position:'bottom-center'});
  for (var i = 0; i < variables.banda.length; i++){
      var varCheck = ui.Checkbox({'label': variables.descripcion[i], 'disabled': false, 'style': {'height':'30px','fontSize':'12px', 'padding':'0px', 'margin':'1px'}, 'value': false      });
      valCheckbox[variables.descripcion[i]] =  varCheck;
      addSelVarSubPanel.add(varCheck);
  }
  //Validar si cambian los botones de selección de variables, si se tilda agrega la capa, si se desactiva la remueve
  function activarVisor(variDescr){
    var posicion = variables.descripcion.indexOf(variDescr);
    var checkVar = valCheckbox[variables.descripcion[posicion]];
    checkVar.onChange(function(checked) {
      var label = checkVar.getLabel();
      var banda = variables.banda[posicion];
      manageLayers(checked, banda, label);
  });
  }
  variables.descripcion.map(activarVisor);
  //Remueve una imagen del visor de variables
  function removeImageLayer(label) {
    for (var i = 0; i < visorPanel.layers().length(); i++) {
      var layer = visorPanel.layers().get(i);
        if (label === layer.get('name')) {
          visorPanel.remove(layer);
        }
    }
  }
  //Agrega una imagen al visor de variables
  function manageLayers(checked, banda, label) {
    if (checked){
      var paleta = estilos.asignarPaleta(banda);
      if(paleta.tipoPaleta === 1){
        var imageLayer = ui.Map.Layer({
                'eeObject': stackOrig.select([banda]),
                'visParams': paleta.parametroVis,
                'name': label,
                'shown': true,
                'opacity': 1.0
        })
      }
      else{
        imageLayer = ui.Map.Layer({
                'eeObject': stackOrig.select([banda]).sldStyle(paleta.parametroVis),
                'visParams': {},
                'name': label,
                'shown': true,
                'opacity': 1.0
        });
      }
      visorPanel.layers().set(0, imageLayer);
      labtitlezoom.setValue(label);
      visorPanel.onClick(fetchValuesVisor);
    } 
    else{
      removeImageLayer(label);
    }
  }
  // function to update the inspect section once map is clicked
  function fetchValuesVisor(lonlat){
    var point = ee.Geometry.Point(lonlat.lon, lonlat.lat);
    valorVar.setValue('Actualizando...');
    var limiteAOI = L_GChaco.first().geometry();
    var condition2 = limiteAOI.contains(point);
    if(condition2.getInfo() === true){
      var pointSampled = stackOrig.sample(point,30).first().evaluate(updateValuesVisor);
    }
    else{
       valorVar.setValue('Sin datos');
    }
  }
  function updateValuesVisor(feature){
    var nomVar = labtitlezoom.getValue();
    var posicion = variables.descripcion.indexOf(nomVar);
    var banda = variables.banda[posicion];
    var value = parseFloat(feature.properties[banda].toFixed(2));
    valorVar.setValue(value);
  }
  //Apila las variables seleccionadas
  function stackearBandas(){
    listaVar = ee.List([]);
    for (var i = 0; i < variables.banda.length; i++){
      if(valCheckbox[variables.descripcion[i]].getValue()===true){
        listaVar = ee.List(listaVar).add(variables.banda[i]);
        variables.seleccion[i] = 1;
      }
    }
  }
  var aceptarButton = ui.Button({
    label: 'Aceptar',
    onClick: function(){
      visorPanel.style().set('shown', false);
      stackearBandas();
      if(listaVar.length().getInfo() < 1){
        mensaje = 'Seleccione 1 o más variables';
        ee.String(mensaje).evaluate(advertir);
        banderaVari = 0;
        dicPasos.checkPaso2.setValue(' ');
      }
      else{
        banderaVari = 1;
        dicPasos.checkPaso2.setValue('✔');
        avisosPanel.style().set({shown: false});
      }
      mapPanel.remove(panel);
      banderaPond = 0;
      panelVar = 0;
    }
  });
  panel.add(addSelVarSubPanel);
  panel.add(aceptarButton);
  if(panelVar === 0){
    mapPanel.add(panel);
    panelVar = 1;
  }
}
//Función para mostrar mensajes de advertencia o información.
function advertir(mensaje) {
  avisosPanel.clear();
  var avisoLabel = ui.Label({value: 'Aviso: ' + mensaje, style: {fontWeight: 'bold', fontSize: '12px'}});
  var aceptarButton = ui.Button({
    label: 'OK',
    onClick: function(){
      avisosPanel.style().set({shown: false});
    }
  });
  avisosPanel.add(avisoLabel);
  avisosPanel.add(aceptarButton);
  avisosPanel.style().set({shown: true});
}
// Función para consultar los valores medios de las variables seleccionadas para realizar la segmentación.
function addInspect(){
  inspecPanel.clear();
  var inspecLabel = ui.Label('Clic para inspeccionar los valores medios de las variables.',{'height':'16px','fontSize':'12px', 'fontWeight': 'bold', 'padding':'1px', 'margin':'1px'});
  inspecPanel.add(inspecLabel);
  for (var i = 0; i < variables.banda.length;i++){
    if(variables.seleccion[i] === 1){
      var insLabel =  ui.Label(variables.descripcion[i],{'width':'280px','fontSize':'12px', 'padding':'0px', 'margin':'1px'});
      mediaLabel[variables.descripcion[i]] =  ui.Label('Clic en la GUPa',{'fontSize':'11px', 'padding':'0px', 'margin':'1px'});
      var inspecSubPanel = ui.Panel([insLabel, mediaLabel[variables.descripcion[i]]], ui.Panel.Layout.Flow('horizontal'));
      inspecPanel.add(inspecSubPanel);
    }
  }
  var aceptarButton = ui.Button({
    label: 'Aceptar',
    onClick: function(){
      avisosPanel.style().set({shown: false});
      inspecPanel.style().set({shown: false});
    }
  });
  inspecPanel.add(aceptarButton);
  inspecPanel.style().set({shown: true});
}
// function to update the inspect section once map is clicked
function fetchValues(lonlat){
  var point = ee.Geometry.Point(lonlat.lon, lonlat.lat);
  for (var i = 0; i < variables.banda.length;i++){
    if(variables.seleccion[i] === 1){
      mediaLabel[variables.descripcion[i]].setValue('Actualizando los valores');
    }
  }
  var limiteAOI = areaInteres.first().geometry();
  var condition2 = limiteAOI.contains(point);
  if(condition2.getInfo() === true){
    var pointSampled = GUPasVector.filterBounds(point).first().evaluate(updateValues);
  }
  else{
    for (i = 0; i < variables.banda.length;i++){
      if(variables.seleccion[i] === 1){
         mediaLabel[variables.descripcion[i]].setValue('Sin datos');
      }
    }
  }
}
function updateValues(feature){
  for (var i = 0; i < variables.banda.length;i++){
    if(variables.seleccion[i] === 1){
      var value = parseFloat(feature.properties[variables.banda[i]].toFixed(2));
      mediaLabel[variables.descripcion[i]].setValue(value);
    }
  }
}
//Calcular los pesos de las variables de acuerdo a la importancia asignada.
function addPonderacion(dicPasos){
  panelPond = 1;
  var panel = ui.Panel([], ui.Panel.Layout.Flow('vertical', true),{width:'400px', height:'400px', color:'black',backgroundColor:'white'});
  var ponderLabel = ui.Label('Ingrese la importancia a las variables [1 mayor importancia,2,3, ....',{'height':'16px','fontSize':'12px', 'fontWeight': 'bold', 'padding':'1px', 'margin':'1px'});
  panel.add(ponderLabel);
  for (var i = 0; i < variables.banda.length;i++){
    if(variables.seleccion[i] === 1){
      var insLabel =  ui.Label(variables.descripcion[i],{'width':'140px','fontSize':'12px', 'padding':'0px', 'margin':'1px'});
      valLabels[variables.descripcion[i]] =  ui.Textbox({value: '1'}); 
      var ponderSubPanel = ui.Panel([insLabel, valLabels[variables.descripcion[i]]], ui.Panel.Layout.Flow('horizontal'));
      panel.add(ponderSubPanel);
    }
  }
  function calcularPesos(){
    var sumaImport = 0;
    var nroVari = listaVar.length().getInfo();
    for (var i = 0; i < variables.banda.length;i++){
      if(variables.seleccion[i] === 1){
        var valor = ee.Number.parse((valLabels[variables.descripcion[i]].getValue()), 10);
        sumaImport = ee.Number(sumaImport).add(valor);
      }
    }
    for (i = 0; i < variables.banda.length;i++){
      if(variables.seleccion[i] === 1){
        var peso = (ee.Number(nroVari).add(1).subtract(ee.Number.parse(valLabels[variables.descripcion[i]].getValue(),10))).divide(sumaImport);
        listaPesos = listaPesos.add(peso);
      }
    }
  }
  var aceptarButton = ui.Button({
    label: 'Aceptar',
    onClick: function(){
      calcularPesos();
      banderaPond = 1;
      dicPasos.checkPaso5.setValue('✔');
      avisosPanel.style().set({shown: false});
      panelPond = 0;
      mapPanel.remove(panel);
    }
  });
  panel.add(aceptarButton);
  mapPanel.add(panel);
}
//Establecer los valores de los parámetros de SNIC.
function addParametros(){
  var panel = ui.Panel([], ui.Panel.Layout.Flow('vertical', true),{width:'350px', height:'300px', color:'black',backgroundColor:'white'});
  var paramLabel = ui.Label('Ingrese los valores de los parámetros.',{'height':'16px','fontSize':'12px', 'fontWeight': 'bold', 'padding':'1px', 'margin':'1px'});
  panel.add(paramLabel);
  //Agregar los parámetros
  var sizeLabel =  ui.Label(parametrosSNIC.nombre[0],{'width':'100px','fontSize':'12px', 'padding':'0px', 'margin':'10px'});
  var sizeAyuda = ui.Label(parametrosSNIC.ayuda[0],{'width':'300px','fontSize':'10px', 'padding':'0px', 'margin':'1px'});
  valParam[parametrosSNIC.nombre[0]] = ui.Textbox({value: '128', });
  var sizeSubPanel = ui.Panel([sizeLabel, valParam[parametrosSNIC.nombre[0]]], ui.Panel.Layout.Flow('horizontal'));
  var compacLabel =  ui.Label(parametrosSNIC.nombre[1],{'width':'100px','fontSize':'12px', 'padding':'0px', 'margin':'10px'});
  var compacAyuda = ui.Label(parametrosSNIC.ayuda[1],{'width':'300px','fontSize':'10px', 'padding':'0px', 'margin':'1px'});
  valParam[parametrosSNIC.nombre[1]] =  ui.Textbox({value: '0'});
  var compacSubPanel = ui.Panel([compacLabel, valParam[parametrosSNIC.nombre[1]]], ui.Panel.Layout.Flow('horizontal'));
  var conectLabel =  ui.Label(parametrosSNIC.nombre[2],{'width':'100px','fontSize':'12px', 'padding':'0px', 'margin':'10px'});
  var conectAyuda = ui.Label(parametrosSNIC.ayuda[2],{'width':'300px','fontSize':'10px', 'padding':'0px', 'margin':'1px'});
  valParam[parametrosSNIC.nombre[2]] =  ui.Textbox({value: '4'});
  var conectSubPanel = ui.Panel([conectLabel, valParam[parametrosSNIC.nombre[2]]], ui.Panel.Layout.Flow('horizontal'));
  var vecindLabel =  ui.Label(parametrosSNIC.nombre[3],{'width':'100px','fontSize':'12px', 'padding':'0px', 'margin':'10px'});
  var vecindAyuda = ui.Label(parametrosSNIC.ayuda[3],{'width':'300px','fontSize':'10px', 'padding':'0px', 'margin':'1px'});
  valParam[parametrosSNIC.nombre[3]] =  ui.Textbox({value: '256'});
  var vecindSubPanel = ui.Panel([vecindLabel, valParam[parametrosSNIC.nombre[3]]], ui.Panel.Layout.Flow('horizontal'));
  var aceptarButton = ui.Button({
    label: 'Aceptar',
    onClick: function(){
      mapPanel.remove(panel);
    }
  });
  panel.add(sizeSubPanel);
  panel.add(sizeAyuda);
  panel.add(compacSubPanel);
  panel.add(compacAyuda);
  panel.add(conectSubPanel);
  panel.add(conectAyuda);
  panel.add(vecindSubPanel);
  panel.add(vecindAyuda);
  panel.add(aceptarButton);
  mapPanel.add(panel);
}
var segmentar = function(){
  removeLayer('Region');
  var stack = stackOrig.select(listaVar);
  var stand = standOrig.select(listaVar);
  avisosPanel.style().set({shown: false});
  inspecPanel.style().set({shown: false});
  descargasPanel.style().set({shown: false});
  //Ponderacion de variables
  var stand_ponderadas = ee.Image([]);
  for (var i=0;i<listaVar.length().getInfo();i++){
    var pesovar = ee.Image.constant(listaPesos.get(i));
    var banda = stand.select([listaVar.get(i)]).multiply(pesovar);
    stand_ponderadas = stand_ponderadas.addBands([banda]);
  }
  //Definir valores de los parámetros de SNIC
  if(bandParam === 1){
    var paramSize = ee.Number.parse(valParam[parametrosSNIC.nombre[0]].getValue(), 10);
    var paramCompact = ee.Number.parse(valParam[parametrosSNIC.nombre[1]].getValue(), 10);
    var paramConect = ee.Number.parse(valParam[parametrosSNIC.nombre[2]].getValue(), 10);
    var paramVecind = ee.Number.parse(valParam[parametrosSNIC.nombre[3]].getValue(), 10);
  }
  else{
    paramSize = 128;
    paramCompact = 0;
    paramConect = 4;
    paramVecind = 256;
  }
  //Segmentar en de acuerdo a la selección de la semilla
  if (tipoSemilla !== 1){
    var seed_SNIC = ee.Image().toByte().paint(seedInput,1).unmask();
    var snic = ee.Algorithms.Image.Segmentation.SNIC({
      image: stand_ponderadas, 
      size:paramSize,
      compactness: paramCompact,
      connectivity: paramConect,
      neighborhoodSize:paramVecind,
      seeds: seed_SNIC,
    }).reproject('EPSG:4326', null, scale);
  }
  else {snic = ee.Algorithms.Image.Segmentation.SNIC({
      image: stand_ponderadas, 
      size:paramSize,
      compactness: paramCompact,
      connectivity: paramConect,
      neighborhoodSize:paramVecind,
      }).reproject('EPSG:4326', null, scale);
  }
  var snic_clip = snic.clip(areaInteres);
  return snic_clip;
};
  //Visualización de resultados finales
var imprimir = function(uniPaisajes, areaInteres){
  avisosPanel.style().set({shown: false});
  removeLayer('Semillas');
  removeLayer('Sitios_pilotos');
  removeLayer('Region');
  removeLayer('Limite Gran Chaco');
  removeLayer('Set de datos');
  removeLayer('Limite Sudamérica');
  removeLayer('Grandes Unidades de Paisajes');
  removeLayer('Complejos ecosistemicos TNC');
  if (tipoSemilla == 1){
    var semillasLayer  = ui.Map.Layer(uniPaisajes.select('seeds').focal_max(3), {}, 'Semillas', true);
  }
  else{semillasLayer= ui.Map.Layer(seedInput,{},'Semillas', true);
  }
  //Agregar sitios pilotos
  var outline_sit_pilotos = sitios_pilotos
  .map(function (feature) {
    return feature.set('style', {
      fillColor: colorTable.get(feature.get('Nombre'), '777777'),
      width: 1
    });
  })
  .style({
    styleProperty: 'style',
  });
  var sitiosPiloLayer = ui.Map.Layer(outline_sit_pilotos, {}, 'Sitios_pilotos'); 
  var datosLayer = ui.Map.Layer(standOrig, {}, 'Set de datos', false);
  var blank = ee.Image(0).mask(0);
  var outline_Sud = blank.paint(sudamerica, 'ff001d', 1);
  var outline_complejos = blank.paint(complejos, 'ff001d', 2);
  var outline_Gch = blank.paint(L_GChaco, 'ff001d', 2);
  var visParp = {'palette':'black','opacity': 1};
  var visParpComple = {'palette':'green','opacity': 1};
  var visParpSudam = {'palette':'white','opacity': 1};
  var GChacoLayer = ui.Map.Layer(outline_Gch, visParp, "Limite Gran Chaco", true);
  var SudameLayer  = ui.Map.Layer(outline_Sud, visParpSudam, "Limite Sudamérica", false);
  var CompEcosLayer = ui.Map.Layer(outline_complejos, visParpComple, "Complejos ecosistemicos TNC", false);
  var GUPasLayer  = ui.Map.Layer(uniPaisajes.randomVisualizer(), {}, 'Grandes Unidades de Paisajes');
  mapPanel.layers().add(GChacoLayer);
  mapPanel.layers().add(datosLayer);
  mapPanel.layers().add(GUPasLayer);
  mapPanel.layers().add(SudameLayer);
  mapPanel.layers().add(CompEcosLayer);
  mapPanel.layers().add(semillasLayer);
  mapPanel.layers().add(sitiosPiloLayer);
};
var exportar = function(uniPaisajes){
  //Exportar el resultado de la segmentación como imagen y como vector con sus valores medios
  //Vectorización de los cluster a escala definida
  avisosPanel.style().set({shown: false});
  descargasPanel.clear();
  var GUPasVec = uniPaisajes.reduceToVectors({
    reducer:ee.Reducer.mean(),
    geometry:areaInteres,
    scale:scale,
    maxPixels:1e12,
    bestEffort: true,
    tileScale: 4,
  });
  //Renombrar las label de la zonificación
  var GUPA_int = GUPasVec.map(function(f){return f.set("GUPA_ID", ee.Number.parse(f.get("label"), 10).toInt())});
  var label_GUPA = GUPA_int.aggregate_array("label");
  print(label_GUPA);
  //Generar secuencia de numeros desde 1 hasta el numero de GUPas de la capa
  var label_num = ee.List.sequence(1, label_GUPA.length());
  //Reemplazar label por numeros
  var GUPA_cod = GUPasVec.remap(label_GUPA, label_num,"label");
  //Calcular nuevo campo a partir de la concatenacion de "GUP" y label
  GUPasVec = GUPA_cod.map(function(f){return f.set("GUPA_ID", ee.String('GUP').cat(f.get("label")))});
      // Obtiene un nuevo vector con los valores medios de cada una de las variables originales.
  var GUPasVectorInfo = stackOrig.reduceRegions({
    collection: GUPasVec,
    reducer: ee.Reducer.mean(),
    scale: scale,
  });
  function downloadGUPas() { 
    var downloadArgs = {
      format: 'kml',
      filename: 'GUPAS_'+ version + '_e' +scale,
    };
    var url = GUPasVectorInfo.getDownloadURL(downloadArgs);
    urlLabel.setUrl(url);
    urlLabel.style().set({shown: true});
  }
  // Add UI elements to the Map.
  var downloadButton = ui.Button('Descargar GUPas', downloadGUPas);
  var urlLabel = ui.Label('Descargar', {shown: false});
  var cerrarButton = ui.Button({
    label: 'Cerrar',
    onClick: function(){
      descargasPanel.style().set({shown: false});
    }
  });
  Export.table.toAsset({
    collection: GUPasVectorInfo,
    description:'GUPAS_CEco_128_0_4_resol1000_varsel',
    assetId: 'GUPAS_CEco_128_0_4_resol1000_varsel',
  });
  descargasPanel.add(downloadButton);
  descargasPanel.add(urlLabel);
  descargasPanel.add(cerrarButton);
  descargasPanel.style().set({shown: true});
  return GUPasVectorInfo;
};
//Función para remover una layer
var removeLayer = function(name) {
  var layers = mapPanel.layers()
  // list of layers names
  var names = []
  layers.forEach(function(lay) {
    var lay_name = lay.getName()
    names.push(lay_name)
  })
  // get index
  var index = names.indexOf(name)
  if (index > -1) {
    // if name in names
    var layer = layers.get(index)
    mapPanel.remove(layer)
  } else {
    print('Layer '+name+' not found')
  }
}
// function to initialize the application
function init(){
  //Diccionario de control de pasos
  var dicPasos = {
    'checkPaso1' : ui.Label({value:'', style:{fontWeight: 'bold',backgroundColor:'00000000', color:'blue', fontSize:'18px'}}),
    'checkPaso2' : ui.Label({value:'', style:{fontWeight: 'bold',backgroundColor:'00000000', color:'blue', fontSize:'18px'}}),
    'checkPaso3' : ui.Label({value:'', style:{fontWeight: 'bold',backgroundColor:'00000000', color:'blue', fontSize:'18px'}}),
    'checkPaso4' : ui.Label({value:'', style:{fontWeight: 'bold',backgroundColor:'00000000', color:'blue', fontSize:'18px'}}),
    'checkPaso5' : ui.Label({value:'', style:{fontWeight: 'bold',backgroundColor:'00000000', color:'blue', fontSize:'18px'}}),
  };
  //Mostrar el límite del Gran Chaco y los sitios pilotos como referencia
  var visParp1 = {'palette':'black','opacity': 1};
  var blank = ee.Image(0).mask(0);
  var outline_Gch = blank.paint(L_GChaco, 'ff001d', 2);
  //var outline_sit_pilotos = blank.paint(sitios_pilotos, 'aa001d', 3);
  var GChacoLayer = ui.Map.Layer(outline_Gch, visParp1, "Limite Gran Chaco", true);
  //Asignar paleta a los sitios pilotos
  var outline_sit_pilotos = sitios_pilotos
  .map(function (feature) {
    return feature.set('style', {
      fillColor: colorTable.get(feature.get('Nombre'), '777777'),
      width: 1
    });
  })
  .style({
    styleProperty: 'style',
  });
  var sitiosPiloLayer = ui.Map.Layer(outline_sit_pilotos, {}, 'Sitios_pilotos'); 
  mapPanel.layers().add(GChacoLayer);
  mapPanel.layers().add(sitiosPiloLayer);
  //Agregar elementos a los paneles
  // Añadir el logo y el título de la APP
  var logo = ee.Image('users/euroclimacomponente2/Zonificacion/Logos/LogoEuroChaco32720').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
  var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '1497x464',
        format: 'png'
        },
    style: {height: '127px', width: '408px',padding :'0'}
    });
  var toolPanel = ui.Panel(thumb, 'flow', {width: '450px'});
  //***************************************************
  var table = ui.Chart(
    [
    ['<img src=https://inta.gob.ar/sites/all/themes/adaptivetheme/agil/logo.png width=450px height=140px>']
  ],
  'Table', {allowHtml: true});
  var titlePanel = ui.Panel([table], 'flow', {width: '500px', height:'180px', padding: '0 0 0 0', margin: '0 0 0 0'});
  //mainPanel.insert(0, titlePanel);
  mainPanel.add(toolPanel);
  var titleLabel = ui.Label('Proyecto Euroclima + Vivir y Producir en el Bosque Chaqueño', TITLE_STYLE);
  // añadir la descripcion de la app
  var descriptionText =
    'Esta herramienta permite obtener Unidades de Paisaje del Gran Chaco Americano a partir de un set de variables '+
    'biofísicas, socio-económicas y político institucionales, a diferentes escalas utilizando algoritmos de segmentación.'
  var descriptionLabel = ui.Label(descriptionText, PARAGRAPH_STYLE);
  var urlAyuda = ui.Label({
    value: '¿Cómo se utiliza AIZAL?',
    style: {fontSize: "14px", backgroundColor:'00000000'},
    targetUrl: 'https://drive.google.com/file/d/1ZgZ1peWtClQ1ik-q-QswFDSu5vI80Emb/view?usp=sharing'
  });
  var firstSubTitle_text = '1) Seleccione la región de Interés.';
  var firstSubTitle = ui.Label(firstSubTitle_text, SUBTITLE_STYLE);
  var firstSubParagraph_text = 'Seleccione el área del Gran Chaco o dibuje su región de interés en el mapa.';
  var firstSubParagraph = ui.Label(firstSubParagraph_text, SUBTITLE_STYLE);
  //Agregar la leyenda de los sitios pilotos
  // Create a legend
  var labels = ['San Francisco','Santo Domingo', 'Algarrobales', 'Salta Forestal', 'Salta Norte', 'Marina', 'Ismael Pino', 
              'Agua de la Paloma', 'Cirilo', 'Colonia', 'Maldonado', 'El Escondido', 'La Iguana', 'Pozo Grande', 'Fernández Irala'];
  var add_legend = function(title, lbl, pal) {
    var legend = ui.Panel({style: {position: 'bottom-right'}}), entry;
    legend.add(ui.Label({value: title, style: { fontWeight: 'bold', fontSize: '12px', margin: '0 0 4px 0', padding: '0px' } }));
    for (var x = 0; x < lbl.length; x++){
      entry = [ ui.Label({style:{color: pal[x], border:'1px solid black', margin: '0 0 4px 0'}, value: '██'}),
        ui.Label({ value: labels[x], style: { margin: '0 0 4px 4px', fontSize: '12px' } }) ];
      legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
    } 
    mapPanel.add(legend);
  };
  add_legend('Sitios Pilotos', labels, palette);
  //Función para evaluar área
  function validarArea(limite){
    var limiteAOI = ee.FeatureCollection(limite).first().geometry();
    var condition3 = L_GChaco.first().geometry().contains(limiteAOI);
    if(condition3.getInfo() === true){
      banderaArea = 1;
      dicPasos.checkPaso1.setValue('✔');
      mapPanel.drawingTools().clear();
      var visParp1 = {'palette':'yellow','opacity': 1};
      var blank = ee.Image(0).mask(0);
      var outline_AOI = blank.paint(areaInteres, 'orange', 2);
      var AOILayer = ui.Map.Layer(outline_AOI, visParp1, 'Region', true);
      mapPanel.layers().add(AOILayer);
    }
    else{
      mensaje = 'El área de interés debe estar contenida en el Gran Chaco';
      ee.String(mensaje).evaluate(advertir);
      banderaArea = 0;
      dicPasos.checkPaso1.setValue(' ');
    }
  }
  //Seleccionar región
  var select = ui.Select({
    items: Object.keys(dicRegion),
    placeholder: 'Seleccione Región',
    onChange:function(selection) {
      select.style().set('color', 'black');
      select.style().set({border: '1px', });
      mapPanel.drawingTools().clear();
      removeLayer('Region');
      if(dicRegion[selection][0]=='s'){
        banderaArea = 0;
        dicPasos.checkPaso1.setValue(' ');
        mapPanel.drawingTools().setLinked(false);
        // Limite los modos de dibujo a poligonos.
        mapPanel.drawingTools().setDrawModes(['polygon']);
        // Agregue una capa vacía para sostener el poligono dibujado.
        mapPanel.drawingTools().addLayer([]);
        // Establecer el tipo de geometría para ser poligono.
        mapPanel.drawingTools().setShape('polygon');
        // Ingrese al modo de dibujo.
        mapPanel.drawingTools().draw();
        mapPanel.drawingTools().onDraw(function (geometry) {
          // Haz algo con la geometría
          var AOI = mapPanel.drawingTools().toFeatureCollection(0);
          mapPanel.centerObject(AOI);
          mapPanel.drawingTools().stop();
          mapPanel.drawingTools().layers().forEach(function(layer) {
            layer.setShown(true);
          });
          areaInteres = AOI;
          areaInteres.evaluate(validarArea);
        });
      } else{
          areaInteres = L_GChaco;
          banderaArea = 1;
          //ee.Number(banderaArea).evaluate(validarPaso1);
          dicPasos.checkPaso1.setValue('✔');
      }
    }
  });
  var panelcheck1 = ui.Panel([select, dicPasos.checkPaso1], ui.Panel.Layout.Flow('horizontal'), {backgroundColor:'00000000',position:'bottom-right'});
  var secondSubParagraph_text = '2) Seleccione las variables a utilizar en la zonificación.';
  var secondSubParagraph = ui.Label(secondSubParagraph_text, SUBTITLE_STYLE);
  //Agregar botón de selección de variables, mostrar panel de variables.
  var selectBandButton = ui.Button({
    label: 'Seleccione variables',
    onClick: function(img){
      banderaVari = 0;
      dicPasos.checkPaso2.setValue(' ');
      dicPasos.checkPaso5.setValue(' ');
      addSelVar(dicPasos);
    }
  });
  var panelcheck2 = ui.Panel([selectBandButton, dicPasos.checkPaso2], ui.Panel.Layout.Flow('horizontal'), {backgroundColor:'00000000',position:'bottom-right'});
  var thirdSubTitle_text = '3) Seleccione las semillas.';
  var thirdSubTitle = ui.Label(thirdSubTitle_text, SUBTITLE_STYLE); 
  //Agregar desplegable para seleccionar la semilla a utilizar
  var selectSemilla = ui.Select({
    items: Object.keys(dicSemillas),
    placeholder: 'Seleccione Semilla',
    onChange:function(selection) {
      //mapPanel.drawingTools().clear();
      removeLayer('Semillas');
      seedInput = ee.FeatureCollection([]);
      banderaSemi = 0;
      dicPasos.checkPaso3.setValue(' ');
      if(banderaArea===1){
        if(dicSemillas[selection][0]=='semilla3'){
          var finalizarSemillas = ui.Button({
            label: 'Finalizar semillas', 
            style: {position: 'top-center'},
            onClick:function(){
              //mapPanel.drawingTools().stop();
              var seedTemp = mapPanel.drawingTools().toFeatureCollection(0);
              var numSemi = ee.Number.parse(seedTemp.size(),10).getInfo();
              if(numSemi > 1){
                var limiteAOI = areaInteres.first().geometry();
                var condition1 = limiteAOI.contains(seedTemp);
                if(condition1.getInfo() === true){
                  tipoSemilla = 3;
                  banderaSemi = 1;
                  dicPasos.checkPaso3.setValue('✔');
                  mapPanel.remove(finalizarSemillas);
                  mapPanel.drawingTools().stop();
                  mapPanel.drawingTools().clear();
                  seedInput = seedTemp;
                  var semillasLayer  = ui.Map.Layer(seedInput,{},'Semillas', true);
                  mapPanel.layers().add(semillasLayer);
                  panelFinSem = 0;
                  avisosPanel.style().set({shown: false});
                  //Mapear semillas de usuario
                }
                else{
                  mensaje = 'Desplace las semillas al área de interés';
                  ee.String(mensaje).evaluate(advertir);
                  banderaSemi = 0;
                  dicPasos.checkPaso3.setValue(' ');
                }
              }
              else{
                mensaje = 'Las semillas deben ser 2 o más, agréguelas con el marcador y haga clic en "Finalizar semillas"';
                ee.String(mensaje).evaluate(advertir);
                banderaSemi = 0;
                dicPasos.checkPaso3.setValue(' ');
              }
            }
          });
          if(panelFinSem === 0){
            mapPanel.add(finalizarSemillas);
            panelFinSem = 1;
            mapPanel.drawingTools().clear();
          }
          mapPanel.drawingTools().setLinked(false);
          mapPanel.drawingTools().setDrawModes(['point']);
          //Agregue una capa vacía para sostener el punto dibujado.
          mapPanel.drawingTools().addLayer([]);
          // Establecer el tipo de geometría para ser punto.
          mapPanel.drawingTools().setShape('point');
          // Ingrese al modo de dibujo.
          mapPanel.drawingTools().draw();
          mapPanel.drawingTools().onDraw(function (geometry) {
            // Haz algo con la geometría
            var semillasUser = mapPanel.drawingTools().toFeatureCollection(0);
            mapPanel.drawingTools().layers().forEach(function(layer) {
              layer.setShown(true);
            });
          });
          } else if(dicSemillas[selection][0]==='semilla2'){
                    seedInput = semillas;
                    tipoSemilla = 2;
                    banderaSemi = 1;
                    dicPasos.checkPaso3.setValue('✔');
                    var semillasLayer  = ui.Map.Layer(seedInput,{},'Semillas', true);
                    mapPanel.layers().add(semillasLayer);
                    //Mapear semillas TNC
                  }
                  else {tipoSemilla = 1;
                    mensaje = 'Las semillas se definen en el proceso de segmentación'
                    ee.String(mensaje).evaluate(advertir);
                    banderaSemi = 1;
                    dicPasos.checkPaso3.setValue('✔');
                    //mostrar mensaje semillas definidas durante la segmentación
                  }
      }
      else{
        mensaje = 'Especifique la región de interés';
        ee.String(mensaje).evaluate(advertir);
      }
    }
  });
  var panelcheck3 = ui.Panel([selectSemilla, dicPasos.checkPaso3], ui.Panel.Layout.Flow('horizontal'), {backgroundColor:'00000000',position:'bottom-right'});
  //Agregar panel de parámetros adicionales del segmentador
  var parametCheck = ui.Checkbox({'label': 'Parámetros adicionales', 'disabled': false, 'style': {'height':'30px','fontSize':'14px', 'padding':'0px', 'margin':'1px'}, 'value': false});
  parametCheck.onChange(function(checked){
    if(checked === true){
      addParametros();
      bandParam = 1;
    }
    else{
      bandParam = 0;
    }
  });
  //Agregar selector de escala
  var fourthSubTitle_text = '4) Seleccione la resolución en metros de la zonificación.';
  var fourthSubTitle = ui.Label(fourthSubTitle_text, SUBTITLE_STYLE);
  var selectEscala = ui.Select({
    items: Object.keys(dicEscala), 
    placeholder:'Seleccione resolución',
    onChange: function(escala){
      dicPasos.checkPaso4.setValue(' ');
      if(dicEscala[escala][0]==='500'){
        scale = 500;
      }else if(dicEscala[escala][0]==='1000'){
        scale = 1000;
        }else scale = 1500;
      banderaEsca = 1;
      dicPasos.checkPaso4.setValue('✔');
    }
  });
  var panelcheck4 = ui.Panel([selectEscala, dicPasos.checkPaso4], ui.Panel.Layout.Flow('horizontal'), {backgroundColor:'00000000',position:'bottom-right'});
  //Agregar panel de ponderación
  var fifthSubTitle_text = '5) Establece un ranking de importancia de las variables.';
  var fifthSubTitle = ui.Label(fifthSubTitle_text, SUBTITLE_STYLE);
    //Agregar botón de selección de variables, mostrar panel de variables.
  var ingresePondButton = ui.Button({
    label: 'Establece orden',
    onClick: function(){
      dicPasos.checkPaso5.setValue(' ');
      if(panelPond === 0){
        if(banderaVari===1){
          addPonderacion(dicPasos);
        }
        else{
          mensaje = 'Seleccione las variables';
          ee.String(mensaje).evaluate(advertir);
          dicPasos.checkPaso5.setValue(' ');
        }
        }
      }
  });
   var panelcheck5 = ui.Panel([ingresePondButton, dicPasos.checkPaso5], ui.Panel.Layout.Flow('horizontal'), {backgroundColor:'00000000',position:'bottom-right'});
  //Agregar botón para correr el script
  //************Agregar mensaje que avise que aún no se definió algún parámetro
  var zonificarButton = ui.Button({
    label: 'Zonificar',
    onClick:function(){
      if(banderaArea == 1){
        areaInteres.evaluate(validarArea);
      }
      if(banderaArea == 1){
        if(banderaVari == 1){
          if(banderaSemi == 1){
            if(banderaEsca == 1){
              if(banderaPond == 1){
                uniPaisajes= segmentar();
                imprimir(uniPaisajes);
                GUPasVector = exportar(uniPaisajes);
                addInspect();
                mapPanel.onClick(fetchValues);
                banderaError = 1;
              }
              else mensaje = 'Complete la importancia de las variables';
              }
            else mensaje = 'Seleccione la escala de zonificación';
          }
          else mensaje = 'Seleccione las semillas';
        }
        else mensaje = 'Seleccione las variables';
      }
      else mensaje = 'Establezca el área de interés';
      if(banderaError === 0){
        ee.String(mensaje).evaluate(advertir);
      }
    }
  });
  var botonreinicio = ui.Button({
    label: 'Reset!',
    onClick: function(i) {
      mapPanel.clear();
      mainPanel.clear();
      avisosPanel = new ui.Panel([], ui.Panel.Layout.Flow('horizontal', true),{width:'600px', height:'60px', color:'black',backgroundColor:'white', position: 'bottom-left', shown: false});
      mapPanel.add(avisosPanel);
      descargasPanel = new ui.Panel([], ui.Panel.Layout.Flow('vertical', true), {shown: false});
      mapPanel.add(descargasPanel);
      inspecPanel = ui.Panel([], ui.Panel.Layout.Flow('vertical', true),{width:'450px', height:'150px', color:'black',backgroundColor:'white', position: 'bottom-center', shown: false});
      mapPanel.add(inspecPanel);
      mapPanel.drawingTools().clear();
      mapPanel.setControlVisibility({layerList: true, zoomControl: false, scaleControl: false, mapTypeControl: true, fullscreenControl: true, drawingToolsControl: true});
      mapPanel.setCenter(-64,-27.5,8).setOptions('HYBRID').style().set('cursor', 'crosshair');
      // Contenedor para selección y ponderacion de variables
      valLabels = {};
      valCheckbox = {};
      var mediaLabel = {};
      variables.seleccion = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      var valParam = {};
      //Lista de variables y lista de pesos para correr el script
      listaVar = ee.List([]);
      listaPesos = ee.List([]);
      //Activacion de banderas para ejecucion del proceso
      banderaArea = 0;
      banderaVari = 0;
      banderaSemi = 0;
      bandParam = 0;
      banderaEsca = 0;
      banderaPond = 0;
      tipoSemilla = 0;
      banderaError = 0;
      panelVar = 0;
      panelPond = 0;
      panelDesc = 0;
      panelFinSem = 0;
      areaInteres = ee.FeatureCollection([]);
      seedInput = ee.FeatureCollection([]);
      uniPaisajes = ee.Image([]);
      GUPasVector = ee.FeatureCollection([]);
      init();
    }
  });
  mainPanel.add(titleLabel);
  mainPanel.add(descriptionLabel);
  mainPanel.add(urlAyuda);
  mainPanel.add(firstSubTitle);
  mainPanel.add(firstSubParagraph);
  mainPanel.add(panelcheck1);
  mainPanel.add(secondSubParagraph);
  mainPanel.add(panelcheck2);
  mainPanel.add(thirdSubTitle);
  mainPanel.add(panelcheck3);
  mainPanel.add(parametCheck);
  mainPanel.add(fourthSubTitle);
  mainPanel.add(panelcheck4);
  mainPanel.add(fifthSubTitle);
  mainPanel.add(panelcheck5);
  mainPanel.add(zonificarButton);
  mainPanel.add(botonreinicio);
  mapPanel.setCenter (-64,-27.5,6);
}
init();