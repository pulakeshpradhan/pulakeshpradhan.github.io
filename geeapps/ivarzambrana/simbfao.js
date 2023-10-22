var chiquitania = ui.import && ui.import("chiquitania", "table", {
      "id": "users/ivarzambrana/chiquitania"
    }) || ee.FeatureCollection("users/ivarzambrana/chiquitania"),
    AP_Nacional = ui.import && ui.import("AP_Nacional", "table", {
      "id": "users/ivarzambrana/AP_NACIONAL"
    }) || ee.FeatureCollection("users/ivarzambrana/AP_NACIONAL"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/ivarzambrana/departamentos"
    }) || ee.FeatureCollection("users/ivarzambrana/departamentos"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/ivarzambrana/Municipios"
    }) || ee.FeatureCollection("users/ivarzambrana/Municipios");
/*******************************************************************************
 * Model *
 *
 * A section to define information about the data being presented in your
 * app.
 *
 * Guidelines: Use this section to import assets and define information that
 * are used to parameterize data-dependant widgets and control style and
 * behavior on UI interactions.
 ******************************************************************************/
// Define a JSON object for storing the data model.
var tools = require('users/fitoprincipe/geetools:tools')
var fecha = new Date();
var m = {};
m.opciones = {
        limites: {
            municipios: "users/ivarzambrana/Municipios",
            departamentos: "users/ivarzambrana/departamentos",
            pais: 'users/ivarzambrana/bolivia',
            AP:'users/ivarzambrana/AP_NACIONAL'
        },
        departamentos:null,
        municipios:null,
        limiteActivo:null,
        nombreActivo:"",
        nombreMunicipio: [],
        nombreDepartamento: {
          "Ninguno":"Ninguno",
          "Beni":"10",
          "Chuquisaca":"20",
          "Cochabamba":"30",
          "La Paz":"40",
          "Oruro":"50",
          "Pando":"60",
          "Potosí":"70",
          "Santa Cruz":"80",
          "Tarija":"90",
        }};
        m.opciones.municipios = ee.FeatureCollection(m.opciones.limites.municipios);
        m.opciones.departamentos = ee.FeatureCollection(m.opciones.limites.departamentos);
        m.opciones.pais = ee.FeatureCollection(m.opciones.limites.pais);
        m.opciones.apnacional = ee.FeatureCollection(m.opciones.limites.AP);
m.fechas = {
      'hoy': fecha,
      'ayer':new Date(new Date().setDate(new Date().getDate() -15)),
      'año':fecha.getFullYear(),
      'mes':fecha.getMonth()+1,
      'dia':fecha.getDate(),  
      'dateRange':'',
      'Start_period':'',
      'End_period':'',
      'FechaPre':'',
      'FechaPost':'',
      'FechaPreImg':'',
      'FechaPostImg':'',
      'SensorSelect':0,
      'ImagenPre':ee.Image([]), // La imagen seleccionada Pre
      'ImagenPost':ee.Image([]),// La imagen seleccionada Post
      'Quema':ee.Image([]),
      'layerPre':'',
      'layerPost':'',
      'dNBR':'',
      'CLASEQUEMA':390,
},
m.logo = ee.Image('users/ivarzambrana/logo').visualize({
  bands:  ['b1', 'b2', 'b3'],
  min: 0,
  max: 255
});
m.table = ee.FeatureCollection("users/ivarzambrana/Municipios");
m.fechaini = ''
m.prefuego_fin = ee.Date(m.fechaini);
m.prefuego_ini = m.prefuego_fin.advance(-1, 'month');   
// Escoja la fecha cuando termina la quema.
m.fechafin = ''
m.postfuego_ini = ee.Date(m.fechafin);
m.postfuego_end = m.postfuego_ini.advance(1, 'month');
m.mun = "";
m.Limite = m.table.filter(ee.Filter.eq('MUNICIPIO', m.mun));
m.prefuego_CM_ImCol = ee.FeatureCollection([]);
m.preNBR = ee.Image([]);
m.postNBR = ee.Image([]);
m.dNBR = ee.Image([]);
m.postfuego_CM_ImCol =ee.FeatureCollection([]);
m.quemas = ee.Image([]);
m.clasificado = "";
m.areacicatriz = "";
m.areaquema ="";
/* Example
// Selected year.
m.year = null;
*/
/*******************************************************************************
 * Components *
 *
 * A section to define the widgets that will compose your m.fechas.
 *
 * Guidelines:
 * 1. Except for static text and constraints, accept default values;
 *    initialize others in the initialization section.
 * 2. Limit composition of widgets to those belonging to an inseparable unit
 *    (i.e. a group of widgets that would make no sense out of order).
 ******************************************************************************/
var mask = "";
var NBRVisParam = {"opacity":1,"bands":["nd"],"min":-500,"max":700,"palette":['#1a9850','#91cf60','#d9ef8b','#fee08b','#fc8d59','#d73027']};
var ParamSensor = {
  'Label':['Sentinel 2',
                'Landsat 8-9'],
  'Inicial': ['S2','L8'],
  'Id': ['COPERNICUS/S2',
         'LANDSAT/LC08/C01/T1_SR'
        ],
  'Bandas': [['B2','B3','B4','B5','B6','B7','B8' ,'B8A','B11','B12'],//S2
              ['B2','B3','B4','B5','B6','B7','B10' ,'B11']], //L8
  'Periodo':[[2016,m.fechas.año],//S2
             [2013,m.fechas.año],//L8
            ],
  'BandaCloud':[['CLOUDY_PIXEL_PERCENTAGE','QA60',11,10],
                  ['CLOUD_COVER','pixel_qa',3,5]], 
  'Vis':[{bands: ['B11', 'B8A', 'B4'], min: [0, 1000, 0], max: [3000, 4000, 3000]},
         {bands: ['B6','B5','B4'], gain: [0.08, 0.06, 0.2]}]
};
// Define a JSON object for storing UI components.
var c = {};
c.controlPanel=ui.Panel({style:{width:"280px"}});
c.map = ui.Map();
c.map.setCenter(-61.1036,-17.73955, 7);
c.logo = ui.Thumbnail({
  image: m.logo,
  params: {
    dimensions: '642x291',
    format: 'png'
  },
  style: {height: '120px', width: '260px',padding :'0'}
});
c.info = {};
c.info.titulo = ui.Label ({
  "value": "CALCULO DE CICATRICES DE QUEMA",
  "style":{"fontWeight": 'bold', 
          "textAlign": 'center',
          "fontSize": "14px",
  }});
c.info.descripcion = ui.Label ({
  "value": "Herramienta para el calculo de cicatrices de quema a partir de imagenes satelitales Landsat 8 y Sentinel 2 Generado por SIMB y FAO-BOLIVIA",
   "style": {
          'stretch': 'horizontal',
          "fontSize": "11px",
          'padding':'4px'
      }
});    
c.info.panel = ui.Panel ([c.info.titulo, c.info.descripcion]);
c.labelSensor = ui.Label({
      "value": "Sensor:",
      "style": {
          'stretch': 'horizontal',
          "fontSize": "11px",
          'padding':'4px'
      }
  });
c.dateSensor = ui.Select({
      'items': ParamSensor.Label,
      'placeholder': ParamSensor.Label[m.fechas.SensorSelect],
      'onChange': function (s) {
          var AntSen = ParamSensor.Label[m.fechas.SensorSelect];
          var f;
          m.fechas.SensorSelect =  ParamSensor.Label.indexOf(s)
          // Recalculamos el rango del periodo
          var y = ParamSensor.Periodo[m.fechas.SensorSelect][0];
          m.fechas.Start_period = ee.Date(y+'-01-01')
          var y = ParamSensor.Periodo[m.fechas.SensorSelect][1];
          m.fechas.End_period = ee.Date(m.fechas.FechaPost).advance(1, 'day')
          if (y===2011){
            m.fechas.End_period = ee.Date(y+'-12-31')
            c.fechas["textFechaImgPre"].setValue(y+'-12-17')
            c.fechas["textFechaImgPost"].setValue(y+'-12-31')
          }
          else{
            if (AntSen=== ParamSensor.Label[4]){
              m.fechas.hoy = new Date();
              m.fechas.ayer=new Date(new Date().setDate(new Date().getDate() -15)),
              m.fechas.FechaPost = m.fechas.año+'-'+GetMesT(m.fechas.mes)+'-'+GetDiaT(m.fechas.dia)
              m.fechas.FechaPre = m.fechas.ayer.getFullYear()+'-'+GetMesT(m.fechas.ayer.getMonth()+1)+'-'+GetDiaT(m.fechas.ayer.getDate())
              m.fechas.Start_period = ee.Date(m.fechas.FechaPre)
              m.fechas.End_period = ee.Date(m.fechas.FechaPost)
              c.fechas["textFechaImgPre"].setValue(m.fechas.FechaPre)
              c.fechas["textFechaImgPost"].setValue(m.fechas.FechaPost)
            }
          }
          m.fechas.dateRange =  ee.DateRange(m.fechas.Start_period, m.fechas.End_period) 
          m.fechas.GenImg = false
      },
      'style': {
          'stretch': 'horizontal',
          // 'width': '120px'
      }
  }),
c.dateSensor.panel =ui.Panel([c.labelSensor,c.dateSensor])
c.fechas = {
    labelFechaImgPre: ui.Label({
      "value": "Fecha Img-Pre quema:",
      "style": {
          "fontSize": "10px",
          'stretch': 'horizontal',
      }
  }),
  textFechaImgPre: ui.Textbox({
      //'placeholder': '',
      'value': "2021-08-01",
      'onChange': function (text) {
          //PorcNube = text.toString();
          m.fechas.FechaPre = text
          //print(text)
      },
  }),
  labelFechaImgPost: ui.Label({
      "value": "Fecha Img-Post quema:",
      "style": {
          'stretch': 'horizontal',
          "fontSize": "10px",
      }
  }),
  textFechaImgPost: ui.Textbox({
      //'placeholder': '',
      'value': "2021-09-01",
      'onChange': function (text) {
          //PorcNube = text.toString();
          m.fechas.FechaPost = text
      },
  }),
  FIRMS : ui.Checkbox({label:"Active los focos de calor (FIRMS)",onChange:function(checked){
  if(checked === true){
  var dataset = ee.ImageCollection('FIRMS').filter(
    ee.Filter.date(c.fechas["textFechaImgPre"].getValue(), c.fechas["textFechaImgPost"].getValue()));
  var fires = dataset.select('T21');
  var firesVis = {
      min: 325.0,
      max: 400.0,
  palette: ['red', 'orange', 'yellow'],
  };
  var FIRMS_LAYER = ui.Map.Layer(fires,firesVis, "FIRMS");
  c.map.layers().set(5, FIRMS_LAYER)}
  else{
    tools.map.removeLayerByName("FIRMS",c.map);
    //c.map.layers().get(5).setShown(false);
  }}, "style": {
          'stretch': 'horizontal',
          "fontSize": "12px",
      }})
};
/*c.selectDate = {};
c.selectDate.iniciallabel =  ui.Label ("Seleccione la fecha de inicio de la quema");
c.selectDate.inicialwidget = ui.DateSlider("2021-08-01");
c.selectDate.finallabel =ui.Label ("Seleccione la fecha de finalizacion de la quema");
c.selectDate.finalwidget = ui.DateSlider({start:2020-01-01, end:ee.Date(Date.now()).advance(-10, "day"), onChange: function(){print(ee.Date(c.selectDate.finalwidget.getValue()[0]).format("YYYY-MM-dd"));
  print(ee.Date(c.selectDate.finalwidget.getValue()[1]).format("YYYY-MM-dd"))
}});
c.selectDate.panel =ui.Panel([c.selectDate.finallabel,c.selectDate.finalwidget]);*/
c.selectarea ={};
c.selectarea.departamento = {};
c.selectarea.departamento.label = ui.Label("Seleccione el departamento y municipio");
c.selectarea.departamento.selector = ui.Select({ 'items': [
                    "Ninguno","Beni","Chuquisaca","Cochabamba","La Paz","Oruro","Pando","Potosí","Santa Cruz", "Tarija"
                ],
                'placeholder': 'Seleccione Departamento',
                'onChange': function (state) {
                    if (state != 'Ninguno') {
                        m.opciones.nombreActivo = state;
                        loadMunicipalitiesList(m.opciones.nombreDepartamento[state]);
                              }
                },
                'style': {
                    'stretch': 'horizontal'
                }});
c.selectarea.municipio ={};
c.selectarea.municipio.label  = ui.Label("Seleccione su municipio");
c.selectarea.municipio.selector = ui.Select({
                'items': [],
                'placeholder': 'Ninguno',
                'style': {
                    'stretch': 'horizontal'
                },
                "onChange": function(municipio){
                  if(municipio != "Ninguno"){
                    m.opciones.nombreActivo = municipio;
                  }
                }
            }),
c.selectarea.panel =ui.Panel([c.selectarea.departamento.label,c.selectarea.departamento.selector,c.selectarea.municipio.label]);
c.crearcapas = ui.Button(
  {label:"Generar indices de quema", 
   onClick: function GenCQ(){
     m.fechas.FechaPost = c.fechas["textFechaImgPost"].getValue();
     m.fechas.FechaPre = c.fechas["textFechaImgPre"].getValue();
     var prefuego_fin = ee.Date(m.fechas.FechaPre);
     var prefuego_ini = prefuego_fin.advance(-2, 'month');   
     var postfuego_ini = ee.Date(m.fechas.FechaPost);
     var postfuego_end = postfuego_ini.advance(1, 'month');
     var limite = m.opciones.limiteActivo;
     c.map.centerObject(limite);
    var prefuegoImCol = ee.ImageCollection(ParamSensor.Id[m.fechas.SensorSelect])
    // Filtro por fecha.
    .filterDate(prefuego_ini, prefuego_fin)
    // Filtro por ubicacion.
    .filterBounds(limite);
    // Se repite el proceso para las imagenes postquema
    var postfuegoImCol = ee.ImageCollection(ParamSensor.Id[m.fechas.SensorSelect])
        // Filtro por fecha.
        .filterDate(postfuego_ini, postfuego_end)
        // Filtro por ubicacion.
        .filterBounds(limite);
    function maskS2sr(image) {
  // Bits 10 y 11 son nubes y cirrus(nubes altas y poco densas).
  var cloudBitMask = ee.Number(2).pow(10).int();
  var cirrusBitMask = ee.Number(2).pow(11).int();
  // Extraer valores de la banda QA60.
  var qa = image.select('QA60');
  // Todos los valores deben ser  definidos como zero, lo que indica buenas condiciones climaticas.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Regresa la imagen cortada y escalada a reflectancia en el tope de la atmosfera, sin las bandas QA.
  return image.updateMask(mask)
      .copyProperties(image, ["system:time_start"]);
  }
// Funcion para cortar zonas de nubes de los datos de Landsat 8 
function maskL8sr(image) {
  // Bits 3 y 5 are nubes y sombra de nubes, respectively.
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  var snowBitMask = 1 << 4;
  // Extraer valores de la banda QA60.
  var qa = image.select('pixel_qa');
  // Todos los valores deben ser  definidos como zero, lo que indica buenas condiciones climaticas.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0))
      .and(qa.bitwiseAnd(snowBitMask).eq(0));
  // Regresa la imagen cortada y escalada a reflectancia en el tope de la atmosfera, sin las bandas QA.
  return image.updateMask(mask)
      .select("B[0-9]*")
      .copyProperties(image, ["system:time_start"]);
}
if (m.fechas.SensorSelect === 0) {
  m.prefuego_CM_ImCol = prefuegoImCol.map(maskS2sr).mosaic().clip(limite);
  m.postfuego_CM_ImCol = postfuegoImCol.map(maskS2sr).mosaic().clip(limite);
  m.preNBR = m.prefuego_CM_ImCol.normalizedDifference(['B8', 'B12']);
  m.postNBR = m.postfuego_CM_ImCol.normalizedDifference(['B8', 'B12']);
  //------------------ Calcula ladiferencia de NBR entre imagenes pre y post fuego ----------------
// El resultado se llama delta NBR o dNBR
var dNBR_sinescalar = m.preNBR.subtract(m.postNBR);
// Escalar dNBR a estandares de la USGS
  m.dNBR = dNBR_sinescalar.multiply(1000);
  m.quemas = ee.Image(0).where(m.dNBR.gt(m.fechas.CLASEQUEMA),1);
  mask = m.quemas.updateMask(m.quemas);
  //mask=mask.reproject("EPSG:32720",null,20);
} else {
  m.prefuego_CM_ImCol = prefuegoImCol.map(maskL8sr).mosaic().clip(limite);
  m.postfuego_CM_ImCol = postfuegoImCol.map(maskL8sr).mosaic().clip(limite);
  m.preNBR = m.prefuego_CM_ImCol.normalizedDifference(['B5', 'B7']);
  m.postNBR = m.postfuego_CM_ImCol.normalizedDifference(['B5', 'B7']);
  var dNBR_sinescalar = m.preNBR.subtract(m.postNBR);
  m.dNBR = dNBR_sinescalar.multiply(1000);
  m.quemas = ee.Image(0).where(m.dNBR.gt(m.fechas.CLASEQUEMA),1);
  mask= m.quemas.updateMask(m.quemas);
  //mask=mask.reproject("EPSG:32720",null,20);
}
  m.clasificado = ui.Map.Layer(mask,{palette: ["#252525"]},"clasificacion de quema");
  m.fechas.layerPre = ui.Map.Layer(m.prefuego_CM_ImCol,
  ParamSensor.Vis[m.fechas.SensorSelect]  
  ,'Imagen pre '+ParamSensor.Inicial[m.fechas.SensorSelect]+' '+m.fechas.FechaPre);
  m.fechas.layerPost = ui.Map.Layer(m.postfuego_CM_ImCol,
  ParamSensor.Vis[m.fechas.SensorSelect]  
  ,'Imagen post '+ParamSensor.Inicial[m.fechas.SensorSelect]+' '+m.fechas.FechaPost);
  m.fechas.dNBR = ui.Map.Layer(m.dNBR,NBRVisParam,'DeltaNBR');
  c.map.layers().set(1, m.fechas.layerPre);
  c.map.layers().set(2, m.fechas.layerPost);
  c.map.layers().set(3, m.fechas.dNBR);
  c.map.layers().set(4, m.clasificado);
  m.fechas.GenImg = true     
   }});
  c.clasificacion = ui.Slider({min:0, max:100, value:30, step:5, onChange: function(i){ 
    m.fechas.CLASEQUEMA = ee.Number(300).add(ee.Number(i).multiply(3));
    m.quemas = ee.Image(0).where(m.dNBR.gt(m.fechas.CLASEQUEMA),1);
    mask= m.quemas.updateMask(m.quemas);
    //mask=mask.reproject("EPSG:32720",null,20);
    print(m.fechas.CLASEQUEMA);
    var areaLayer = ee.Image.pixelArea().divide(10000);
    var areaImage = m.quemas.multiply(areaLayer);
    var area = areaImage.reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: m.opciones.limiteActivo,
      bestEffort:true,
      scale: 200,
      maxPixels: 1e13
    });
    m.areacicatriz=Math.round(area.values().get(0).getInfo())
    print(m.areacicatriz)
    m.clasificado = ui.Map.Layer(mask,{palette: ["#252525"]},"clasificacion de quema");
    c.map.layers().set(4, m.clasificado);
    c.areaquemas.setValue("Area estimada de quema es " + m.areacicatriz + " (ha)");
  }, style:{width:"200px"}}) 
  c.areaquemas =ui.Label();
  c.descarga =ui.Button({label:"Generar link de descarga", onClick:function(){
    var BA_vector = mask.reduceToVectors({
    geometry: m.opciones.limiteActivo,
    scale: 200,
    geometryType: 'polygon',
    eightConnected: false,
    maxPixels: 1e13});
    alert('Generando descarga, espere por favor');
    var urlClass = BA_vector.getDownloadURL('kml', 'label', "AQ_Quema", null);
 c.urlLabelClass.setValue(' Descarga - AQ-Municipio de '+m.opciones.nombreActivo);
 c.urlLabelClass.setUrl(urlClass);
 c.urlLabelClass.style().set({shown: true});
  }})
  c.urlLabelClass= ui.Label({
      'value': 'Descargar AQ',
      'style': {
          'stretch': 'horizontal',
          "fontSize": "14px",
          'shown':false
          // 'width': '120px'
      }});
/* Example
c.legend = {
  title: ui.Label();
}
*/
/*******************************************************************************
 * Composition *
 *
 * A section to compose the app i.e. add child widgets and widget groups to
 * first-level parent components like control panels and maps.
 *
 * Guidelines: There is a gradient between components and composition. There
 * are no hard guidelines here; use this section to help conceptually break up
 * the composition of complicated apps with many widgets and widget groups.
 ******************************************************************************/
ui.root.clear();
ui.root.add(ui.SplitPanel(c.controlPanel, c.map));
c.controlPanel.add(c.logo);
c.controlPanel.add(c.info.panel);
c.controlPanel.add(c.dateSensor.panel);
c.controlPanel.add(c.fechas["labelFechaImgPre"]);
c.controlPanel.add(c.fechas["textFechaImgPre"]);
c.controlPanel.add(c.fechas["labelFechaImgPost"]);
c.controlPanel.add(c.fechas["textFechaImgPost"]);
c.controlPanel.add(c.fechas["FIRMS"]);
//c.controlPanel.add(c.selectDate.panel);
c.controlPanel.add(c.selectarea.panel);
c.controlPanel.add(c.crearcapas);
c.controlPanel.add(c.clasificacion);
c.controlPanel.add(c.areaquemas);
c.controlPanel.add(c.descarga);
c.controlPanel.add(c.urlLabelClass);
/*******************************************************************************
 * Styling *
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
  width: "275px"
});
/* Example
s.legend.title = {
  fontWeight: 'bold',
  fontSize: '12px',
  color: '383838'
};
c.legend.title.style().set(s.legend.title);
*/
/*******************************************************************************
 * Behaviors *
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
/* Example
// Handles updating the legend when band selector changes.
function updateLegend() {
  c.legend.title.setValue(c.bandSelect.getValue() + ' (%)');
}
*/
//updateDep();
function updateDep() {
  var dep  = c.selectarea.departamento.selector.getValue();
  var lim = m.opciones.departamentos.filter(ee.Filter.eq("DEPARTAMEN",dep));
  c.map.clear();
  var limite =ui.Map.Layer(ee.Image().byte().paint(lim, 1, 2), {
                    'palette': 'ffffff,ff0000',
                    'min': 0,
                    'max': 1
                },
                'Departamento de ' + dep,
                true);
c.map.layers().set(0, limite);
  c.map.centerObject(lim);
}
  /*c.selectarea.departamento.selector.setPlaceholder('Cargando Nombres....');
  ee.List(m.opciones.departamentos
          .reduceColumns(ee.Reducer.toList(), ['FIRST_obje'])
          .get('list'))
          .sort()
          .evaluate(
            function (statesList, errorMsg) {
                        var filtered = Object.keys(m.opciones.nombreDepartamento)
                            .filter(
                                function (state) {
                                    print("estado seleccionado", state)
                                    return statesList.indexOf(m.opciones.nombreDepartamento[state]) != -1;
                                }
                            );
                        print(filtered);
                        c.selectarea.departamento.selector = ui.Select({
                            'items': ['Ninguno'].concat(filtered),
                            'placeholder': 'Seleccione Departamento',
                            'onChange': function (state) {
                                if (state != 'Ninguno') {
                                    m.opciones.nombreActivo = state;
                                    loadMunicipalitiesList(m.opciones.nombreDepartamento[state]);
                                }
                            },
                            'style': {
                                'stretch': 'horizontal'
                            }
                        });
                    }
                );
        }*/
 function loadMunicipalitiesList(state) {
            c.selectarea.municipio.selector.setPlaceholder('Cargando Nombres...');
            ee.List(m.opciones.municipios
                    .filterMetadata('UF', 'equals', parseInt(state, 10))
                    .reduceColumns(ee.Reducer.toList(), ['MUNICIPIO'])
                    .get('list'))
                    .sort()
                .evaluate(function (municipio, errorMsg) {
                        m.opciones.nombresMunicipio = municipio;
                        print(municipio);
                        c.selectarea.municipio.selector = ui.Select({
                            'items': ["ninguno"].concat(municipio),
                            'placeholder': 'Seleccione Municipio',
                            'onChange': function (municipio) {
                                if (municipio != 'Ninguno') {
                                    m.opciones.nombreActivo = municipio;
                                    loadMunicipalitie(municipio);
                                }
                            },
                            'style': {
                                'stretch': 'horizontal'
                            }
                        });
                  c.selectarea.panel.widgets()
                            .set(2, c.selectarea.municipio.selector);
                })
 }
 function  loadMunicipalitie(municipio) {
            var uf = m.opciones.nombreDepartamento[c.selectarea.departamento.selector.getValue()];
            m.opciones.limiteActivo = m.opciones.municipios
                .filterMetadata('MUNICIPIO', 'equals', municipio)
                .filterMetadata('UF', 'equals', parseInt(uf, 10));
            c.map.clear();
            c.map.addLayer(ee.Image().byte().paint(m.opciones.limiteActivo, 1, 2), {
                    'palette': 'ffffff,ff0000',
                    'min': 0,
                    'max': 1
                },
                'Municipio de ' + municipio,
                true);
           c.map.centerObject(m.opciones.limiteActivo);
            return m.opciones.limiteActivo;
        }
  c.selectarea.departamento.selector.onChange(updateDep);      
loadMunicipalitiesList();
m.opciones.limiteActivo = ee.FeatureCollection(chiquitania);
function GetMesT(mes){
  var r='';
  if (mes<10)
    r = '0'+mes;
  else
    r = mes.toString();
  return r;
}
function GetDiaT(dia){
  var r='';
  if (dia<10)
    r = '0'+dia;
  else
    r = dia.toString();
  return r;
}
//print(m.opciones.nombreActivo)
//print(m.opciones.limiteActivo)
/*******************************************************************************
 * Initialize *
 *
 * A section to initialize the app state on load.
 *
 * Guidelines:
 * 1. At the top, define any helper functions.
 * 2. As much as possible, use URL params to initial the state of the app.
 ******************************************************************************/
/* Example
// Selected year.
m.year = 2020;
*/