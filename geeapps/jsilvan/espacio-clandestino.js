/* EspacioClandestino v2.0 - Esta APP muestra la relación entre el espacio clandestino y puntos 
de hallazgos de ihumaciones clandestinastyle.info 
El espacio clandestino se define a partir de las dimensiones 
de PRIVACIDAD y ACCESIBILIDAD, donde la primera se mide a través
de un porcentaje de visibilidady la segunda en función del tiempo 
de viaje desde el centro urbano más cercano.
por: 
Dr. José Luis Silván Cárdenas
 (todos los derechos reservados)
Centro de Investigación en Ciencias de Información Geoespacial. A.C
jsilvan@centrogeo.edu.mx
*/
if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        value: function(search, rawPos) {
            var pos = rawPos > 0 ? rawPos|0 : 0;
            return this.substring(pos, pos + search.length) === search;
        }
    });
}
// función auxililar para convertir coordenadas en cadena
function coordsStr(coords){
  var EW = ['E','O'];
  var SN = ['S','N'];
  return Math.abs(coords[0]).toFixed(2).replace('.','_') + EW[(coords[0] >= 0)*1] +
    Math.abs(coords[1]).toFixed(2).replace('.','_') + SN[(coords[1] >= 0)*1];
  }
// función auxililar para convertir fecha en cadena
function dateStr(date){
  return date.getFullYear().toFixed() + (date.getMonth()+1).toFixed() + date.getDate().toFixed();
  }
// Modulos externos
var legends = require('users/jsilvan/tools:legends');
var gui = require('users/jsilvan/tools:gui');
var geometries = require('users/jsilvan/tools:geometries');
var image = require('users/jsilvan/tools:images');
//*********************************************
//              Modelo de datos
//*********************************************
var app = {}; 
app.data = {};
// costantes
app.data.CSVCount = 0;
app.data.masksCount = 0;
app.data.scale = 30;
app.data.maxPixels = 1e13;
app.data.label = 'clase';
app.data.indexName = "GGGI"; // "GNDVIGrowth";
app.data.bands = ['TiempoViaje','Visibilidad','CrecimientoN','DensidadPob','DistAFosas']; // espacio de caracteristicas
app.data.places = {
  "Nacional" : {
    code: 'MX', // Se usa para acceder a los limites estatales
    abrev: 'NAC',   // Se usa para acceder a los datos de fosas
    infoField: 'Info', // Se usa para consulta de información
    source: 'Comisión Nacional de Búsqueda', // No se usa todavía
  },
  "Baja California" : {
    code: 'MX02', // Se usa para acceder a los limites estatales
    abrev: 'BCN',   // Se usa para acceder a los datos de fosas
    infoField: 'id_unico', // Se usa para consulta de información
    source: 'Data Cívica & CNB', // Fiscalía General del Estado de Baja California
  },
  "Chihuahua" : {
    code: 'MX06',
    abrev: 'CHH',    
    infoField: 'DESCR',
    source: 'Comisión Nacional de Búsqueda'
  },  
  "Coahuila" : {
    code: 'MX07',
    abrev: 'COA',    
    infoField: 'Observacio',
    source: 'Medios'
  },
  "Guerrero" : {
    code: 'MX12',
    abrev: 'GRO',   
    infoField: 'T_HALLAZGO',
    source: 'FGR & COVAJ & CNB',
  },
  "Guanajuato" : {
    code: 'MX11',
    abrev: 'GTO',    
    infoField: 'Descr',
    source: 'Buscadoras Guanajuato & CNB'
  },
  "Jalisco" : {
    code: 'MX14',
    abrev: 'JAL',    
    infoField: 'MEDIOS',
    source: 'COBUPEJ'
  },
  "Michoacán" : {
    code: 'MX16',
    abrev: 'MICH',    
    infoField: 'id_unico',
    source: 'Data Cívica'
  },  
  "Morelos" : {
    code: 'MX17',
    abrev: 'MOR',    
    infoField: 'descriptio',
    source: 'Buscadoras Morelos & CNB'
  },  
  "Nayarit" : {
    code: 'MX18',
    abrev: 'NAY',    
    infoField: 'CAUSA',
    source: 'Comisión Nacional de Búsqueda'
    },
  "Nuevo León" : {
    code: 'MX19',
    abrev: 'NLE',    
    infoField: 'Descripci_',
    source: 'Programa de Derechos Humanos IBERO & CNB'
    },
  "San Luis Potosí" : {
    code: 'MX24',
    abrev: 'SLP',        
    infoField: 'OBSERVACIO',
    source: 'Fiscalía Estatal & CNB'
  },
  "Sinaloa" : {
    code: 'MX25',
    abrev: 'SIN',
    infoField: 'PopupInfo',
    source: 'https://hastaencontrarles.com/'
  },
  "Sonora" : {
    code: 'MX26',
    abrev: 'SON',    
    infoField: 'Observ',
    source: 'Comisión Nacional de Búsqueda'
  },
  "Tamaulipas" : {
    code: 'MX28',
    abrev: 'TAM',
    infoField: 'localidad',
    source: 'Comisión Nacional de Búsqueda',
    },
  "Veracruz" : {
    code: 'MX30',
    abrev: 'VER',
    infoField: 'DESCR',
    source: 'CentroGeo & CNB'
    },
};
app.data.ent = ee.FeatureCollection('users/jsilvan/INEGI/entmx2018');
//app.data.S2RECIgrowthCol = ee.ImageCollection('projects/espacio-clandestino/assets/S2RECIgrowth')
//  .select([0],[app.data.bands[2]]);
app.data.GNDVIgrowthCol = image.SensorsList["Landsat GNDVI-TSFA"].collection;
/*
//Versión de que incluye puntos de vista sobre caminos
app.data.visCol = ee.ImageCollection('projects/espacio-clandestino/assets/vismap2km')
  .map(function(img){
    return img
      //.select('b2').multiply(100)
      .select('b1').multiply(img.select('b3'))
      .divide(img.select('b3').max(10))
      .rename(app.data.bands[1]);
  });
*/
// Visibilidad que no toma en cuenta el punto de vista
app.data.visCol = ee.ImageCollection('projects/espacio-clandestino/assets/vismap1200m')
   .map(function(img){
      return img.select(2)
        .divide(100)
        .rename(app.data.bands[1]);
  });
app.data.timeCol = ee.ImageCollection('projects/espacio-clandestino/assets/timemapSt')
  .select([0],[app.data.bands[0]]);
app.data.gravesPath = "projects/espacio-clandestino/assets/Positivos/";
app.data.pop = ee.Image('users/jsilvan/CONAPO/pob2020_10a59_VIIRS');
app.data.defaultPlace = "Guerrero";
app.data.samples = null;
app.data.curve = null;
app.data.intro = 'Esta APP demuestra el concepto de Espacio Clandestino para la delimitación ' +
            'de áreas de búsqueda de restos humanos de personas desaparecidas. Usa ' +
            'los puntos de hallazgo previos para definir los parámetros del modelo, ' +
            'maximizando el número de fosas que son explicadas por el modelo, pero minimizando ' + 
            'el área de terreno en el mapa (tono rosado).';
app.data.masksText = 'Reduce aún más el área de búsqueda aplicando máscaras en dimensiones ' +
            'adicionales del espacio de características. ' +
            'Habilita las capas, ajusta los rangos y haz click en Aplicar.';
app.data.vectorText = 'Convierte la máscara de búsqueda a formato vectorial '+ 
          'o borra las geometrías generadas previamente que estén habilitadas en Geometry imports.';
app.data.downloadText = 'Genera el URL de las capas habilitadas en Geometry imports. ' +
          'Opcionalmente, calcula los atributos a partir de las capas activas.';
app.data.editorText = 'Copia y pega el contenido de un archivo CSV en este espacio\n\n'+
'Los datos debe tener el siguiente orden: \n' +
'Latitud, Longitud, Descripción,...';
app.data.aboutText = 'Esta app ha sido creada sin fines de lucro a través de colaboraciónes entre el CentroGeo,\n' + 
'la Comisión Nacional de Búsqueda de Personas Desaparecidas (CNB) y otras instituciones académicas. ' +
'Las investigaciones relacionadas están disponibles para consulta en los siguientes vínculos:';
app.data.sourceText = 'Los datos de las capas fueron generados por investigadores del CentroGeo con base en datos e imágenes de libre acceso. '+ 
'Los datos de fosas fueron proporcionados por la CNB, Colectivos de Búsqueda, ' +
'el Programa de Derechos Humanos de la IBERO, Fiscalías Estatales y notas periodísticas consultadas.\n' +
'Si desea reportar un nuevo punto de hallazgo, marque el punto en el mapa, seleccione y acceda al ' +
'formulario con la coordenada pre-llenada, o si ya cuenta con la coordenada accede directamente al';
app.data.idgeoText = 'Aquí puedes visitar la IDGEO';
app.data.idegeoUrl = 'https://idegeo.centrogeo.org.mx/';
app.data.graveLayer = 'Puntos de Hallazgo';
// urls
app.data.website = 'https://www.centrogeo.org.mx/areas-profile/jsilvan/';
app.data.globalIndexApp = 'https://jsilvan.users.earthengine.app/view/indices-espectrales-globales#' + 
  'index=GNDVI;inspector=true;marker=true;timeseries=true;';
app.data.gFormUrl = 'https://forms.gle/UtjEGEKWDyXMK7rFA';
app.data.gFormUrlwCoords = 'https://docs.google.com/forms/d/e/1FAIpQLSeZH4UgegCXgdu1ZOCEMvaNtXN_U6dHWDElPmQ4s_nDKBQEKw/viewform?usp=pp_url&entry.1324773620=Lat&entry.1262181978=Lon';
app.data.infoText = 'Puntos: ... \tÁrea: ...';
app.data.areaName = 'Área de búsqueda ';
app.data.publications = [
  {cite: '➲ Artículo iGIS  2019',
  url: 'https://www.researchgate.net/publication/337168640_Potential_distribution_of_clandestine_graves_in_Guerrero_using_geospatial_analysis_and_modelling'},
  {cite: '➲ Libro EAAF. Sec. 4, 2021',
  url: 'https://eaaf.org/el-eaaf-presento-el-libro-nuevas-tecnologias-en-busqueda-forense/#descargar_pdf'},
  {cite: '➲ Artículo FSI 2021',
  url: 'https://www.sciencedirect.com/science/article/abs/pii/S0379073821003844'},
  {cite: '➲ Artículo iGIS  2021',
  url: 'https://link.springer.com/chapter/10.1007/978-3-030-98096-2_3'},
  ];
app.data.vectorFormats = ['csv', 'json', 'geojson', 'kml', 'kmz'];
// valores para botones
app.data.toggle = {};
app.data.toggle.legends = [
      {
        label: '📄',
        value: false,
      },
      {
        label: '>>',
        value: true,
      }
    ];
app.data.toggle.control = [
      {
        label: '📄',
        value: true,
      },
      {
        label: '✖',
        value: false,
      }
    ];
app.options = {};
app.options.time = {
  visParams : {
    min: 0,
    max: 120,
    palette: ['red','orange','yellow','green','cyan','blue','purple'],    
  },
  label : 'Tiempo de viaje [mins]',
  visibility: false,
  opacity: 0.5,
};
app.options.vis = {
  visParams : {
    min: 0,
    max: 100,
    palette: ['black','darkred','red','orange','yellow','lightyellow','white','lightgreen','cyan','lightblue'],
  },
  label : 'Visibilidad',
  visibility: false,
  opacity: 0.9,
};
app.options.space = {
  visParams : {
    min: 0, 
    max: 2, 
    palette: ['ff8888','ffff88','000055'],
    },
  label: 'Área de búsqueda',
  maxTime : 60,
  maxVis: 50,
  model: 0,
  classes: ['Clandestino','Otro'],
  visibility: true,
  opacity: 0.5,
  distRange: false,
  popRange: false,
  growthRange: false,
  growthPeriod: '2020',
};
app.options.dist = {
  visParams: {
    min: 0, 
    max: 50, 
    palette: ['aa5555','cyan']
    },
  label: 'Distancia a fosas',
  visibility: false,
  opacity: 0.8,
  };
app.options.growth = {
  visParams: {
    min: -100, 
    max: 100, 
    palette: ['blue', 'cyan', 'green', 'yellow','red', 'darkred'], //['cyan', 'red']
    },
  label: 'Crecimiento del GNDVI en Fosas (GGGI)',
  visibility: false,
  opacity: 1,
  periods: ['2006','2010','2016','2018','2020'],
  };
app.options.pop = {
  visParams: {
    min: 0, 
    max: 50, 
    palette: ['white','yellow','orange','red','darkred']
    },
  label: 'Población 10-59 años [hab/km2]',
  visibility: false,
  opacity: 1,
  };  
app.data.classes = ['Fuera','Clandestino','Dentro'];
app.options.spaceChart = {
      title: app.data.graveLayer,
      titleTextStyle: {fontSize: 14},
      hAxis: {title: app.options.time.label, viewWindow: {max: app.options.time.visParams.max}},
      vAxis: {title: app.options.vis.label, viewWindow: {max: app.options.vis.visParams.max}},
      width: 320,
      height: 160,
      chartArea: {backgroundColor: app.options.space.visParams.palette[1]},
      series: {
        0: {
          color: 'ff5588',
          width: 1,
          fillColor: 'ff5588',
          pointShape: 'o',
          pointSize: 5, 
          lineWidth: 0,
          //labelInLegend: app.data.classes[0]
          },
        1: {
          color: app.options.space.visParams.palette[0],
          lineWidth: 2,
          type: 'area',
          areaOpacity: 1,
          //labelInLegend: app.data.classes[1]
          },
       2: {
          color: 'aa0000',
          width: 1,
          fillColor: 'ff0000',
          pointShape: 'o',
          pointSize: 5, 
          lineWidth: 0,
          //labelInLegend: app.data.classes[2]
          },
        }
};
app.options.pieCharts = {
  colors: app.options.space.visParams.palette,
  fontSize: 11,
  pieSliceText: 'value',
  slices: {
    0: {textStyle: {color: 'black', fontSize: 11},},
    1: {textStyle: {color: 'black', fontSize: 11},},
    },
  legend: {position: 'none'},
}
//*********************************************
//                Componentes
//**********************************************
app.map = ui.Map();
app.drawingTools = app.map.drawingTools();
app.control = {};
app.control.toggle = gui.toggleIcon([gui.Emoji.gear,gui.Emoji.times],1);
// charts
app.charts = {};
app.charts.pieSamp = ui.Chart([['clase','Terreno [km2]']],'PieChart');
app.charts.pieImage = ui.Chart([['clase','Puntos']],'PieChart');
// Intro
app.control.title = ui.Label('Espacio Clandestino');
app.control.author = ui.Label('por jsilvan');
app.control.intro = ui.Label(app.data.intro);
app.control.place = ui.Select(Object.keys(app.data.places));
app.control.source = ui.Label('',{fontSize: '9px', padding: 0, margin: '0px 6px 6px', stretch: 'horizontal'});
// Principal
app.control.maxTime = ui.Slider({
  min: 1,
  max: 120,
  step: 1,
  direction: 'horizontal',
});
app.control.maxVis = ui.Slider({
  min: 1,
  max: 100,
  step: 1,
  direction: 'vertical',
});
app.control.exponent = ui.Slider({
  min: -4,
  max: 4,
  step: 1,
  direction: 'horizontal',
});
app.control.GCIlabel = ui.Label();
// Máscaras
app.control.masksToggle = gui.toggleButton(
  gui.pmStates('Dimensiones Adicionales'),
  function(value,widget){app.control.masks.style().set({shown: value})});
app.control.distRange = ui.Checkbox('Distancia entre fosas [m]:');
app.control.minDistRange = ui.Slider({
  min: 0,
  max: 20000,
  value: 0,
  step: 100
});
app.control.maxDistRange = ui.Slider({
  min: 1,
  max: 20000,
  value: 500,
  step: 100
});
app.control.distInfo = ui.Label(app.data.infoText);
app.control.popRange = ui.Checkbox(app.options.pop.label);
app.control.minPopRange = ui.Slider({
  min: 0,
  max: 100,
  value: 0,
  step: 1
});
app.control.maxPopRange = ui.Slider({
  min: 0,
  max: 100,
  value: 33,
  step: 1
});
app.control.popInfo = ui.Label('Puntos: ... \n % Area: ...');
app.control.growthRange = ui.Checkbox(app.options.growth.label);
app.control.minGrowthRange = ui.Slider({
  min: 0,
  max: 100,
  value: 8,
  step: 1
});
app.control.maxGrowthRange = ui.Slider({
  min: 0,
  max: 100,
  value: 70,
  step: 1
});
app.control.growthInfo = ui.Label('Pts. Dentro: ... \n % Area: ...');
app.control.growthPeriod = ui.Select(app.options.growth.periods);
app.control.applyMasks = ui.Button('Aplicar');
// vectorización
app.control.vectorToggle = gui.toggleButton(
    gui.pmStates('Vectorización'),
    function(value,widget) {app.control.vector.style().set('shown',value);});
app.control.maxSegNum = ui.Slider({
  min: 1,
  max: 1000,
  value: 100,
  step: .1
});
app.control.maxSegArea = ui.Slider({
  min: 1,
  max: 50,
  value: 2,
  step: 1
});
app.control.vectorizeMask = ui.Button('Vectorizar');
app.control.deleteVectors = ui.Button('Borrar');
app.control.CSVEdit = ui.Textbox('Lat1, Lon1, Info1, Lat2, Lon2, Info2,...');
app.control.CSVLoad = ui.Button('Cargar');
//app.control.enableEditor = ui.Checkbox('Puntos desde un CSV');
// descargas
app.control.downloadToggle = gui.toggleButton(
  gui.pmStates('Descargas'),
  function(value,widget) {app.control.download.style().set('shown',value);});
app.control.downloadUrl = ui.Button('Generar URL');
app.control.downloadFormats = ui.Select(app.data.vectorFormats);
app.control.downloadAttr = ui.Checkbox('Atributos');
app.control.downloadNumLayers = ui.Label('0 capa(s)');
//app.control.downloadTime = ui.Label('');
app.control.urlsPanel = ui.Panel([]);
app.control.urlsClear = ui.Button('Borrar URLs');
// referencias
app.control.refsToggle = gui.toggleButton(
  gui.pmStates('Acerca de...'),
  function(value,widget){app.control.references.style().set({shown: value})});
app.control.ref1 = ui.Label(app.data.publications[0].cite);
app.control.ref2 = ui.Label(app.data.publications[1].cite);
app.control.ref3 = ui.Label(app.data.publications[2].cite);
app.control.ref4 = ui.Label(app.data.publications[3].cite);
app.control.gFormUrl = ui.Label('Formulario de reporte de hallazgo');
// inspector
app.inspector = {};
app.inspector.info = ui.Label('Info');
app.inspector.index = ui.Label('Consultar índice espectral...',{margin: '0px'});
app.inspector.gFormUrl = ui.Label('Reportar nuevo hallazgo...',{margin: '0px'});
app.inspector.close = ui.Button('✖');
// legendas
app.legends = {};
app.legends.title = ui.Label('Simbología');
app.legends.space = legends.classes(app.options.space.label,app.options.space.visParams,app.options.space.classes);
app.legends.vis = legends.value(app.options.vis.label,app.options.vis.visParams);
app.legends.time = legends.value(app.options.time.label,app.options.time.visParams);
app.legends.growth = legends.value(app.options.growth.label,app.options.growth.visParams);
app.legends.pop = legends.value(app.options.pop.label,app.options.pop.visParams);
app.legends.dist = legends.value(app.options.dist.label,app.options.dist.visParams);
app.legends.show = gui.toggleIcon([gui.Emoji.map,gui.Emoji.times]);
// Editor
/*
app.editor = gui.textEditor({
  text : {value: null, placeholder: app.data.editorText},
  run: {label: 'cargar', callback: vectorFromText},
  clear: {label: 'limpiar'},
  close: {label: 'cerrar', callback: function(){app.control.enableEditor.setValue(false);}},
  });
*/
//*************************************************
//                Composición 
//*************************************************
// Panel del scaterplot
app.control.chartPanel = ui.Panel([    
///    app.chart.space,
    app.control.maxTime,
    ],ui.Panel.Layout.flow('vertical',false));
// panel de graficos
app.control.space = ui.Panel([
  ui.Panel([
    app.control.maxVis,
    app.control.chartPanel
    ],ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label('Curvatura de la frontera',{fontSize: '11px', fontFamily: 'serif italic', textAlign: 'center',stretch: 'horizontal'}),
    app.control.exponent
    ]), 
  ui.Panel([
    app.charts.pieSamp,
    app.charts.pieImage,
  ],ui.Panel.Layout.flow('horizontal')),
  app.control.GCIlabel
  ]);
// panel de máscaras
app.control.distRangeOptions = ui.Panel([
  ui.Panel([ui.Label('Mín:'),
    app.control.minDistRange,
    ],ui.Panel.Layout.flow('horizontal')),
    ui.Panel([ui.Label('Max:'),
    app.control.maxDistRange,
    ],ui.Panel.Layout.flow('horizontal')),
    app.control.distInfo,
  ]);
app.control.popRangeOptions = ui.Panel([
  ui.Panel([ui.Label('Mín:'),
    app.control.minPopRange,
    ],ui.Panel.Layout.flow('horizontal')),
    ui.Panel([ui.Label('Max:'),
    app.control.maxPopRange,
    ],ui.Panel.Layout.flow('horizontal')),
    app.control.popInfo,
  ]);
app.control.growthRangeOptions = ui.Panel([
  ui.Panel([
    ui.Label('Período:'), 
    app.control.growthPeriod,
    ui.Label('+/- 2 años:'), ],ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label('Mín:'),
    app.control.minGrowthRange,
    ],ui.Panel.Layout.flow('horizontal')),
    ui.Panel([
      ui.Label('Max:'),
    app.control.maxGrowthRange,
    ],ui.Panel.Layout.flow('horizontal')),
    app.control.growthInfo,
  ]); 
app.control.masks = ui.Panel([  
  ui.Label(app.data.masksText),
  app.control.distRange,
  app.control.distRangeOptions,
  app.control.popRange,
  app.control.popRangeOptions,
  app.control.growthRange,
  app.control.growthRangeOptions,
  app.control.applyMasks,
]);
// panel de vectorización
app.control.vector = ui.Panel([
  ui.Label(app.data.vectorText),
  ui.Panel([ui.Label('Máx. # áreas:'),
    app.control.maxSegNum,
    ],ui.Panel.Layout.flow('horizontal')),
  ui.Panel([ui.Label('Área máx [ha]:'),
    app.control.maxSegArea,
  ],ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    app.control.vectorizeMask,
    app.control.deleteVectors,
  ],ui.Panel.Layout.flow('horizontal')),
  ui.Label('Carga puntos desde un texto con valores separados por coma. Los valores info serán consultables al seleccionar el marcador.'),
  ui.Panel([
    app.control.CSVEdit,
    app.control.CSVLoad,
  ],ui.Panel.Layout.flow('horizontal')),
  ]);
// panel de descarga
app.control.download = ui.Panel([
    ui.Label(app.data.downloadText),
    ui.Panel([
      //app.control.downloadTime,
      app.control.downloadNumLayers,
      app.control.downloadAttr,
      app.control.downloadFormats,
      app.control.downloadUrl,
    ],ui.Panel.Layout.flow('horizontal')),
    app.control.urlsPanel,
    app.control.urlsClear
  ]);
// panel de referencias
app.control.references = ui.Panel([
  ui.Label(app.data.aboutText),
  app.control.ref1,
  app.control.ref2,
  app.control.ref3,
  app.control.ref4,
  ui.Label(app.data.sourceText),
  app.control.gFormUrl,
  ]);
// panel de controles
app.control.panel = ui.Panel([
  app.control.title,
  app.control.author,
  app.control.intro,
  app.control.place,
  app.control.source,
  app.control.space,
  app.control.masksToggle,
  app.control.masks,
  app.control.vectorToggle,
  app.control.vector,
  app.control.downloadToggle,
  app.control.download,
  app.control.refsToggle,
  app.control.references
  ]);
// panel de inspector
app.inspector.panel = ui.Panel([
  app.inspector.close,
  app.inspector.info,
  app.inspector.index,
  app.inspector.gFormUrl], ui.Panel.Layout.flow('vertical'));
app.legends.panel = ui.Panel([
  app.legends.title,
  app.legends.space,
  app.legends.vis,
  app.legends.time,
  app.legends.growth,
  app.legends.pop,
  app.legends.dist]);
//app.legends.frame = ui.Panel([
//  app.legends.panel,
//  app.legends.show],
//  ui.Panel.Layout.flow('vertical'));
//app.mapWithEdit = ui.SplitPanel(app.editor.panel,app.map,'vertical',true);
app.map.add(app.legends.show);
app.map.add(app.inspector.panel);
app.map.add(app.control.toggle);
ui.root.widgets().reset([app.control.panel,app.map])
//*************************************************
//                  Estilos
//*************************************************
app.style = {};
app.style.title = {
  color: '555555',
  fontSize: '20px',
  fontWeight: 'bold',
  textAlign: 'center',
  stretch: 'horizontal',
};
app.style.info = {
    backgroundColor: 'FFFFAA',
    color: '000088',
    margin: '8px 0px 0px 0px',
    stretch: 'vertical'
};
app.style.intro = {
  fontSize: '11px',
  textAlign: 'left',
  margin: '0px 4px 8px 16px'};
app.style.header = {
  fontSize: '14px',
  fontWeight: 'bold',
};
app.style.close = {
    border: '0px', 
    textAlign: 'left', 
    width: '48px', 
    padding: '0px 24px 0px 0px', 
    margin: '-8px -8px -8px 192px',
    backgroundColor: 'FFFFAA'
};
app.style.legendItem = {
  padding: '0px', 
  margin: '0px', 
  stretch: 'horizontal',
  backgroundColor: 'ffffff'
};
app.style.chart = {
    stretch: 'both',
    margin: '0px',
    padding: '0px',
};
app.style.references = {
  margin: '0px',
  padding: '0px 0px 0px 25px',
  whiteSpace: 'pre'
};
var WIDGET_INDENT = {
  padding: '0px 0px 0px 30px'
};
var WIDGET_STYLE = {
    stretch: 'horizontal',
    border: '1px solid darkgray',
    fontWeight: 'bold',
    //fontSize: '28px',
    //height: '36px',
    padding: '0px',
    margin: '0px',
    textAlign: 'left',
};
var PANEL_STYLE = {
    stretch: 'both',
    border:  '1px solid darkgray',
    padding: '8px',
    margin: '0px',
  };
var NEWLINE = {whiteSpace: 'pre'};
app.map.setOptions({mapTypeId: 'SATELLITE'});
app.control.toggle.style()
  .set({
  textAlign: 'left',
  padding: '0px',
  margin: '0px',
  stretch: 'both',
  position: 'bottom-left'
});
app.inspector.panel.style().set({
    shown: false, 
    position: 'bottom-left',
    backgroundColor: 'FFFFAA', 
    border: '1px solid yellow', 
    width: '250px'
  });
app.inspector.info.style().set(app.style.info);
app.inspector.close.style().set(app.style.close);
app.control.panel.style().set({width: '380px'});
app.control.title.style().set(app.style.title);
app.control.author.style().set(app.style.intro);
app.control.author.setUrl(app.data.website);
app.control.intro.style().set(app.style.intro);
app.control.place.style().set({stretch: 'horizontal'});
app.control.maxVis.style().set({
    stretch: 'vertical', 
    maxHeight: '200px',
    padding: '10px 0px 0px 0px', 
    margin: '0px 0px 0px 0px',
    });
app.control.exponent.style().set({
    stretch: 'both', 
    padding: '0px', 
    margin: '0px',
    });    
app.control.maxTime.style().set({stretch: 'horizontal',
      padding: '0px 0px 0px 40px',
      margin: '0px 0px 0px 0px',
});
app.control.chartPanel.style().set({stretch: 'both',
    padding: '0px',
    margin: '0px',
  });
app.control.space.style().set(PANEL_STYLE);
app.control.GCIlabel.style().set({
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'right'});
app.control.masksToggle.style().set(WIDGET_STYLE)
app.control.masks.style().set(PANEL_STYLE);
app.control.minDistRange.style().set({stretch: 'horizontal'});
app.control.maxDistRange.style().set({stretch: 'horizontal'});
app.control.distRangeOptions.style().set(WIDGET_INDENT);
app.control.distInfo.style().set(NEWLINE);
app.control.minPopRange.style().set({stretch: 'horizontal'});
app.control.maxPopRange.style().set({stretch: 'horizontal'});
app.control.popRangeOptions.style().set(WIDGET_INDENT);
app.control.popInfo.style().set(NEWLINE);
app.control.minGrowthRange.style().set({stretch: 'horizontal'});
app.control.maxGrowthRange.style().set({stretch: 'horizontal'});
app.control.growthRangeOptions.style().set(WIDGET_INDENT);
app.control.growthInfo.style().set(NEWLINE);
app.control.vectorToggle.style().set(WIDGET_STYLE);
app.control.vector.style().set(PANEL_STYLE);
app.control.maxSegNum.style().set({stretch: 'horizontal'});
app.control.maxSegArea.style().set({stretch: 'horizontal'});
app.control.CSVEdit.style().set({stretch: 'horizontal'});
app.control.downloadToggle.style().set(WIDGET_STYLE)
app.control.download.style().set(PANEL_STYLE);
app.control.refsToggle.style().set(WIDGET_STYLE)
app.control.references.style().set(app.style.header);
app.control.ref1.setUrl(app.data.publications[0].url)
  .style().set(app.style.references);
app.control.ref2.setUrl(app.data.publications[1].url)
  .style().set(app.style.references);
app.control.ref3.setUrl(app.data.publications[2].url)
  .style().set(app.style.references);
app.control.ref4.setUrl(app.data.publications[3].url)
  .style().set(app.style.references);
app.control.gFormUrl.setUrl(app.data.gFormUrl)
  .style().set(app.style.references);
app.legends.title.style()
  .set(app.style.legendItem)
  .set(app.style.title);
app.legends.vis.style().set(app.style.legendItem);
app.legends.time.style().set(app.style.legendItem);
app.legends.space.style().set(app.style.legendItem);
/*app.legends.frame.style().set({
  maxHeight: '400px',
  minWidth: '60px',
  stretch: 'both',
  position: 'bottom-right',
  backgroundColor: 'aaaaaa88',
  margin: '10px'});
*/
app.legends.panel.style().set({
  width: '210px',
  padding: '0px',
  margin: '0px',
  border: '1px solid black',
  //stretch: 'horizontal',
  //shown: false
});
app.legends.show.style().set({
  margin: '0px',
  padding: '0px',
  position: 'bottom-right',
  });
//*********************************************
//              Eventos
//**********************************************
app.control.toggle.onChange(
  function(value,widget) {
    app.control.panel.style().set({shown: value});
  });
app.legends.show.onChange(function(value,widget) {
  if (value) 
    ui.root.add(app.legends.panel);
  else
    ui.root.remove(app.legends.panel);
});
app.control.CSVEdit.onChange(
  function(csv){
    if(csv.length)
      app.control.CSVLoad.data = csv.match(/\s*"[^"]*"|[^,\s]+/g);
    else 
      app.control.CSVLoad.data = [];
   app.control.CSVLoad.setDisabled( app.control.CSVLoad.data.length < 3);
});
app.control.CSVLoad.onClick(
  function(widget){    
    var collection = geometries.fromList(app.control.CSVLoad.data,3);
    var name = 'Puntos desde CSV ' + app.data.CSVCount +1 ;
    var layer = geometries.update(app.drawingTools, collection, {
      layer: {name: name},
      infoField: 'info',
      reset: false
    });
    if(layer !== null) {
      app.data.loadded = +1;
      app.map.centerObject(collection);
      app.control.downloadUrl.setDisabled(false);
    }
  });
// panel de ediión
/*
app.control.enableEditor.onChange(  
  function(value){
    if(value) {
      ui.root.remove(app.map);
      ui.root.add(app.mapWithEdit);
    } else {
      ui.root.remove(app.mapWithEdit);
      ui.root.add(app.map);
    }
  });
*/
app.control.downloadAttr.onChange(
  function(value){
    app.map.layers().get(0).setShown(value); // time
    app.map.layers().get(1).setShown(value); // vis
});
// reloj
/*
ui.util.setInterval(function(){
  var now = new Date();
  var label = now.getHours().toFixed() + ':' + now.getMinutes().toFixed() + ':' + now.getSeconds().toFixed();
  app.control.downloadTime.setValue(label);
  }, 1000);
*/
app.drawingTools.onLayerSelect(function(layer,dt){
    var layers = geometries.getShownLayers(dt,'');
    var numLayers = layers.length;
    app.control.downloadNumLayers.setValue(numLayers.toFixed() + ' capa(s)');
  });
app.control.downloadUrl.onClick(
  function(button){
    var layers = geometries.getShownLayers(app.drawingTools,'');
    var numLayers = layers.length;
    app.control.downloadNumLayers.setValue(numLayers.toFixed() + ' capa(s)');
    if(numLayers === 0) {
     app.control.downloadUrl.setDisabled(true);
     return
    }
    var format = app.control.downloadFormats.getValue();
    //var time = app.control.downloadTime.getValue();
    var date = new Date();    
    var coords = app.map.getCenter().coordinates().getInfo(); // remplazar por el cenroide de los poligonos
    var layerName = layers[0].getName() + ' (+' + (numLayers-1).toFixed() + ')';
    var label = button.getLabel();
    button.setLabel('generando url...').setDisabled(true);
    var fc;
    var bands = [];
    for(var i = 0; i < 5; i++)
      if(app.map.layers().get(i).getShown())
        bands.push(i);
    var numBands = bands.length * (app.control.downloadAttr.getValue());
    if(numBands > 0) {
      var image = ee.Image([
        app.data.time,
        app.data.vis,
        app.data.growth,
        app.data.pop,
        app.data.dist
        ]).select(bands);
      var reducer = ee.Reducer.mean();
      fc = geometries.toCollection(layers,{image:image,reducer: reducer, scale: 1});
    } else {
      fc = geometries.toCollection(layers);
    }
    var numPolys = fc.size().format(' %3d regs ').getInfo();
    var urlLabel = layerName + numPolys + ' ' + numBands.toFixed() + ' atrs ' + format;
    var filename = 'AB' + '_' + coordsStr(coords) + '_' + dateStr(date);
    fc.getDownloadURL({
        format: format, 
        filename: filename, 
        callback: function(url){
          button.setLabel(label).setDisabled(false);
          app.control.urlsPanel.add(ui.Label(urlLabel,{whiteSpace: 'pre', margin: '0px',padding: '0px 0px 0px 16px'},url));         
          app.control.urlsClear.setDisabled(false);
        }
      });
  });
app.control.urlsClear.onClick(
  function(button){
    app.control.urlsClear.setDisabled(true);  
    app.control.urlsPanel.widgets().reset([]);
  });
app.control.deleteVectors.onClick(
  function(button){
    geometries.getShownLayers(app.drawingTools,app.data.areaName)
      .forEach(function(layer){
        app.drawingTools.layers().remove(layer);
        });
    var value = app.drawingTools.layers().length < 2;
    app.control.deleteVectors.setDisabled(value);
    app.control.downloadUrl.setDisabled(value);
    }
  );
app.control.vectorizeMask.onClick(
  function(button){
    var img = app.data.class.eq(-1).selfMask();
    var label = button.getLabel();
    button.setLabel('Vectorizando...').setDisabled(true);
    var vector = img
      .addBands(app.data.class)
      .reduceToVectors({
        reducer: ee.Reducer.first(),
        geometry: ee.Geometry.Rectangle(app.map.getBounds()),
        scale: app.mapScale,
        crs: app.data.class.projection(),
        geometryType: 'polygon', 
        eightConnected: true, 
        labelProperty: 'class', 
        bestEffort: true, 
        maxPixels: app.data.maxPixels,
      }).map(function(feat){
          return feat.set({area: feat.area(10)})
        }).sort('area')
          .filterMetadata('area','not_greater_than',app.control.maxSegArea.getValue()*1e4)
          .toList(app.control.maxSegNum.getValue())
          .map(function(feat){
            return ee.Feature(feat).geometry();
          });
    ee.List(vector).evaluate(function(geometries) { 
      if(geometries !== undefined) {
        app.data.masksCount += 1;
        var name = app.data.areaName  + app.data.masksCount;
        app.drawingTools.addLayer(geometries, name);
      }
      button.setLabel(label).setDisabled(false);
      app.control.deleteVectors.setDisabled(false);
      //app.control.downloadUrl.setDisabled(false);
  });
});
function inspectorClose() {
  app.inspector.panel.style().set('shown', false);
}
app.inspector.close.onClick(inspectorClose);
function inspectorShow(){
  app.inspector.panel.style().set('shown', true);
}
function updatePointInfo(geom,layer,dt) {
  // solo se puede consultar un punto
  if(geom.type().getInfo() !== 'Point')
    return;
  var year = app.control.growthPeriod.getValue(), col;
  var xValue = geom.coordinates().get(0);
  var yValue = geom.coordinates().get(1);
  var zoom = app.map.getZoom().toFixed();
  var lat = yValue.getInfo().toFixed(6);
  var lon = xValue.getInfo().toFixed(6);
  if(year > 2013)
    col = 'Landsat%208%20SR';
  else 
    col = 'Landsat%205%20SR';
  var indexUrl = app.data.globalIndexApp + 
    'lat=' + lat + ';lon='+ lon + ';zoom=' + zoom +
    ';collection=' + col + ';date=' + (year-1969.5)*31557600000;
  var gFormUrl = app.data.gFormUrlwCoords
    .replace('Lat',lat)
    .replace('Lon',lon);
  var place = app.control.place.getValue();
  if(layer.collection !== undefined) {
    var point = ee.Feature(layer.collection.filterBounds(geom.buffer(1)).first());
    var info = point.get(layer.infoField);
    info.evaluate(function(info_str) {
      app.inspector.info.setValue(info_str);
    });
  } else
    app.inspector.info.setValue('');
  app.inspector.index.setUrl(indexUrl);
  app.inspector.gFormUrl.setUrl(gFormUrl);
  inspectorShow();
}
app.drawingTools.onSelect(updatePointInfo);
function updateDistLayer(){
 if(app.map.layers().get(4)) {
    app.options.dist.visibility = app.map.layers().get(4).getShown();
    app.options.dist.opacity = app.map.layers().get(4).getOpacity();
  }
  if(app.mapScale === undefined)
    app.mapScale = 152.8740565703525;
  app.map.layers().set(4,ui.Map.Layer({
    eeObject: app.data.dist.multiply(app.mapScale).updateMask(app.data.distMask),
    visParams: app.options.dist.visParams,
    name: app.options.dist.label,
    shown: app.options.dist.visibility,
    opacity: app.options.dist.opacity,
    }));
}
function updateDistMask(){
  print('updating distance mask...');
  var r1 = Math.max(0.1,app.control.minDistRange.getValue()) //* 1e3; //18000; 
  var r2 = app.control.maxDistRange.getValue() //* 1e3; //28000;
 /*
   app.data.distMask = app.data.dist
    .gte(app.control.minDistRange.getValue())
    .and(app.data.dist
      .lte(app.control.maxDistRange.getValue()))
      .rename(['mask']);
  */    
  app.data.distMask = app.data.graves.map(
    function(feat){
      feat = ee.Feature(feat);
      var anulus = feat.geometry().buffer(r2)
        .difference(feat.geometry().buffer(r1));
      return ee.Feature(anulus,{value: 1});
      })
      .reduceToImage(['value'],ee.Reducer.first())
      .select([0],['mask']);
  updateDistLayer();
/*
 if(app.map.layers().get(4)) {
    app.options.dist.visibility = app.map.layers().get(4).getShown();
    app.options.dist.opacity = app.map.layers().get(4).getOpacity();
  }
  app.map.layers().set(4,ui.Map.Layer({
    eeObject: app.data.dist.multiply(app.mapScale).updateMask(app.data.distMask),
    visParams: app.options.dist.visParams,
    name: app.options.dist.label,
    shown: app.options.dist.visibility,
    opacity: app.options.dist.opacity,
    }));
*/    
  // Actualiza la información
  var count = app.data.distMask
    .reduceRegion({
      reducer: ee.Reducer.sum(),
      scale: 1,
      geometry: app.data.graves,
    }).getNumber('mask');
  var area = app.data.distMask
    .reduceRegion({
      reducer: ee.Reducer.sum(),
      scale: 100,
      bestEffort: true,
      geometry: app.data.aoi,
    }).getNumber('mask')
      .divide(100)
      .round(); 
  app.control.distInfo.setValue(app.data.infoText);   
  ee.List([count,area])
    .evaluate(function(data){
        if(data !== undefined)
        app.control.distInfo
          .setValue('Pts. Dentro: ' + data[0] + '\tÁrea: ' + data[1] + ' Km2')
        })
  }
app.control.minDistRange.onChange(updateDistMask);
app.control.maxDistRange.onChange(updateDistMask);
function updatePopMask(){
  print('updating population mask...');
  var place = app.control.place.getValue();
   // actualza máscata de densididad de población
   app.data.popMask = app.data.popDens
    .gte(app.control.minPopRange.getValue())
    .and(app.data.popDens
      .lte(app.control.maxPopRange.getValue()))
      .select([0],['mask']);
  if(app.map.layers().get(3)) {
    app.options.pop.visibility = app.map.layers().get(3).getShown();
    app.options.pop.opacity = app.map.layers().get(3).getOpacity();
  }  
  app.map.layers().set(3,ui.Map.Layer({
    eeObject: app.data.popDens.updateMask(app.data.popMask),
    visParams: app.options.pop.visParams,
    name: app.options.pop.label,
    shown: app.options.pop.visibility,
    opacity: app.options.pop.opacity,
    }));
  // actualiza información de la máscara
  var count = app.data.popMask
    .reduceRegion({
      reducer: ee.Reducer.sum(),
      scale: 1,
      geometry: app.data.graves,
    }).getNumber('mask');
  var area = app.data.popMask
    .reduceRegion({
      reducer: ee.Reducer.sum(),
      scale: 100,
      bestEffort: true,
      geometry: app.data.aoi,
    }).getNumber('mask')
      .divide(100)
      .round(); 
  app.control.popInfo.setValue(app.data.infoText);    
  ee.List([count,area])
    .evaluate(function(data){
        app.control.popInfo
          .setValue('Pts. Dentro: ' + data[0] + '\tÁrea: ' + data[1] + ' Km2')
        })
  }
app.control.minPopRange.onChange(updatePopMask);
app.control.maxPopRange.onChange(updatePopMask);
function updateGrowthMask(){
  print('updating growth mask...')
   // actualza máscata de densididad de población
   app.data.growthMask = app.data.growth
    .gte(app.control.minGrowthRange.getValue())
    .and(app.data.growth
      .lte(app.control.maxGrowthRange.getValue()))
      .select([0],['mask']);
  if(app.map.layers().get(2)) {
    app.options.growth.visibility = app.map.layers().get(2).getShown();
    app.options.growth.opacity = app.map.layers().get(2).getOpacity();
  }
  app.map.layers().set(2,ui.Map.Layer({
    eeObject: app.data.growth.updateMask(app.data.growthMask),
    visParams: app.options.growth.visParams,
    name: app.options.growth.label,
    shown: app.options.growth.visibility,
    opacity: app.options.growth.opacity,
    }));
  // actualiza información de la máscara
  var count = app.data.growthMask
    .reduceRegion({
      reducer: ee.Reducer.sum(),
      scale: 1,
      geometry: app.data.graves,
    }).getNumber('mask');
  var area = app.data.growthMask
    .reduceRegion({
      reducer: ee.Reducer.sum(),
      scale: 100,
      bestEffort: true,
      geometry: app.data.aoi,
    }).getNumber('mask')
      .divide(100)
      .round(); 
  app.control.growthInfo.setValue(app.data.infoText);    
  ee.List([count,area])
    .evaluate(function(data){
        app.control.growthInfo
          .setValue('Pts. Dentro: ' + data[0] + '\tÁrea: ' + data[1] + ' Km2');
        });
  }
app.control.minGrowthRange.onChange(updateGrowthMask);
app.control.maxGrowthRange.onChange(updateGrowthMask);
app.control.growthPeriod.onChange(
  function(year){
    updateGrowth();
    updateGrowthMask();
  });
function spaceBoundary(a,b,n) {
  var points = ee.List.sequence(0,120)
    .map(function(time){
      time = ee.Number(time);
      var vis = ee.Number(1)
        .subtract(time.divide(a).pow(n))
        .pow(1/n)
        .multiply(b)
        .multiply(time.lte(a));
      return ee.Feature(null)
        .set(app.data.bands[0],time)
        .set(app.data.bands[1],vis)
        .set(app.data.label,0)
        .set('label',app.data.classes[1]);
    });
    return ee.FeatureCollection(points);
  }
function classify(time,vis,a,b,n) {
  return time
    .divide(a)
    .pow(n)
    .add(vis
      .divide(b)
      .pow(n))
    .gte(1)
    .multiply(2)
    .subtract(1)
}
// Actualiza las graficas de Pie
function updatePieCharts(){
  print('updating pie charts...');
  var neg_area = app.data.class
    .eq(1).selfMask()
    .reduceRegion({
      reducer: ee.Reducer.sum(),
      crs: ee.Projection('EPSG:4326'),
      scale: 10,
      geometry: app.data.aoi,
      bestEffort: true,
      }).get(app.data.label);
  var pos_area = app.data.class
    .eq(-1).selfMask()
    .reduceRegion({
      geometry: app.data.aoi,
      reducer: ee.Reducer.sum(),
      scale: 10,
      crs: ee.Projection('EPSG:4326'),
      bestEffort: true,
      }).get(app.data.label);
  var pos_count = app.data.samples
    .filterMetadata(app.data.label,'equals',-1)    
    .size();
  var neg_count = app.data.samples
    .size()
    .subtract(pos_count);
  ee.List([pos_area,neg_area,pos_count,neg_count]).evaluate(function(values){
    var area_data = [[app.data.label,'Fosas'],
    [app.options.space.classes[0],values[0]*900*1e-6],
    [app.options.space.classes[1],values[1]*900*1e-6]];              
    app.charts.pieImage.setDataTable(area_data);
    var samp_data = [['clase','Terreno Km2'],
      [app.options.space.classes[0],values[2]],
      [app.options.space.classes[1],values[3]]];
    app.charts.pieSamp.setDataTable(samp_data);
    var GCI = values[2]/(values[0]*900*1e-10);
    app.control.GCIlabel.setValue('GCI: '+ GCI.toFixed(2));
  });
}
// llamada al dar doble click en un punto del diagrama de dispersión
function goTo(xValue, yValue, seriesName) {
  if (!xValue | seriesName === app.data.classes[1]) return;  
  var point = app.data.samples.filter(ee.Filter.and(
    ee.Filter.maxDifference(1e-6,app.data.bands[0],parseFloat(xValue)),
    ee.Filter.eq(app.data.bands[1],parseFloat(yValue))
    )).first().geometry();
  app.map.centerObject(point);
}
// actualiza el diagrama de dispersión
function updateCharts(boundary) {
print('updating charts...')
  var point = app.data.boundary
    .merge(app.data.samples)
    .merge(ee.Feature(null,{clase:1,label: app.data.classes[0],vis:1e3,time: 1e3})); // necesario para evitar grupo vacío
  app.control.chartPanel.remove(app.charts.space);
  app.charts.space = ui.Chart.feature.groups(point, app.data.bands[0],  app.data.bands[1], 'label')
    .setOptions(app.options.spaceChart);
  app.charts.space.style().set(app.style.chart);
  app.control.chartPanel.insert(0,app.charts.space);
  app.charts.space.onClick(goTo);
  updatePieCharts();
}
// actualiza la capa de tipos de espacios
function updateSpaceLayer(value) {
  print('updating space mask layer...');
  // resetea los valores al actualizar la capa
  app.options.space.visibility = true;
  //app.options.space.opacity = 0.5;
  if(app.map.layers().get(5)) {
    //app.options.space.visibility = app.map.layers().get(5).getShown();
    app.options.space.opacity = app.map.layers().get(5).getOpacity();
  }
  var place = app.control.place.getValue();
  var maxTime = app.control.maxTime.getValue();
  var exponent = Math.pow(2,app.control.exponent.getValue());
  var maxVis = app.control.maxVis.getValue();
  var boundary = app.data.ent
    .filter(ee.Filter.stringStartsWith('CODIGO',app.data.places[place].code));
  // clasifica la imagen
  app.data.class = classify(app.data.time,app.data.vis,maxTime,maxVis,exponent)
    .paint(boundary,2,1)
    .rename([app.data.label])
    //.clip(app.data.aoi);
  if (app.control.distRange.getValue())
    app.data.class = app.data.class.updateMask(app.data.distMask).unmask(1);
  if (app.control.popRange.getValue())
    app.data.class = app.data.class.updateMask(app.data.popMask).unmask(1);
  if (app.control.growthRange.getValue())
    app.data.class = app.data.class.updateMask(app.data.growthMask).unmask(1);
  //app.map.layers().get(5).setEeObject(app.data.class);
  app.map.layers().set(5,ui.Map.Layer({
    eeObject: app.data.class,
    visParams: app.options.space.visParams,
    name: app.options.space.label,
    shown: app.options.space.visibility,
    opacity: app.options.space.opacity
    }));
  app.data.boundary = spaceBoundary(maxTime,maxVis,exponent);
  // clasifica los puntos
  app.data.samples = app.data.class
    .sampleRegions({
      collection: app.data.samples,
      properties: [app.data.bands[0],app.data.bands[1]],
      scale: 1,
      geometries: true,
    }).map(function(feat){
      feat = ee.Feature(feat);
      var labels = ee.List(app.data.classes);
      var label = labels
        .get(ee.Number(1).subtract(feat.get(app.data.label)));
      return feat.set('label',label);
      });
  updateCharts();
}
app.control.applyMasks.onClick(updateSpaceLayer);
app.control.distRange.onChange(function(value){
  app.control.distRangeOptions.style().set({shown: value});
  app.map.layers().get(4).setShown(value);
});
app.control.popRange.onChange(function(value){
  app.control.popRangeOptions.style().set({shown: value});
  app.map.layers().get(3).setShown(value);
});
app.control.growthRange.onChange(function(value){
  app.control.growthRangeOptions.style().set({shown: value});
  app.map.layers().get(2).setShown(value);
});
app.control.maxTime.onChange(updateSpaceLayer);
//app.control.maxTime.onChange(updateCharts);
app.control.maxVis.onChange(updateSpaceLayer);
//app.control.maxVis.onChange(updateCharts);
app.control.exponent.onChange(updateSpaceLayer);
//app.control.exponent.onChange(updateCharts);
function updateMapLayers(){
print('updating clandestine space layers...')
  app.map.layers().set(0,ui.Map.Layer({
    eeObject: app.data.time,
    visParams: app.options.time.visParams,
    name: app.options.time.label,
    shown: app.options.time.visibility,
    opacity: app.options.time.opacity
    }));
  app.map.layers().set(1,ui.Map.Layer({
    eeObject: app.data.vis,
    visParams: app.options.vis.visParams,
    name: app.options.vis.label,
    shown: app.options.vis.visibility,
    opacity: app.options.vis.opacity
    }));
  updateGrowthMask();
  updatePopMask();
  updateDistMask();  
}
// actualiza muestras para el diagrama
function updateSamples(){
  // update Chart panel
  app.data.samples = ee.Image([app.data.time,app.data.vis])
    .sampleRegions({
      collection: app.data.graves,
      properties: [app.data.label],
      scale: 1,
      geometries: true,
    });
}
function updateGrowth(){
    var year = app.control.growthPeriod.getValue();
    var col = app.data.GNDVIgrowthCol
      //.filterBounds(app.data.aoi)
      .filterDate(year + '-01-01',year + '-12-31');
    app.data.growth = image.MakeComposite(col,"Landsat GNDVI-TSFA",ee.Reducer.max())
      .expression(image.SI[app.data.indexName].expression)
      //.add(0.5)
      .multiply(100)
      //.clip(app.data.aoi)
      .rename([app.data.bands[2]]);
  }
// actualiza capas al lugar seleccionado
function updatePlace(place) {
print('updating selected place...')
  inspectorClose();
  app.control.source.setValue('Puntos de hallazgo proporcionados por ' + app.data.places[place].source)
  // actualiza variables globales
  app.data.aoi = app.data.ent
    .filter(ee.Filter.stringStartsWith('CODIGO',app.data.places[place].code))
    .geometry();
  app.data.time = app.data.timeCol
    //.filterBounds(app.data.aoi)
    .min()
    //.clip(app.data.aoi);
  app.data.vis = app.data.visCol
    //.filterBounds(app.data.aoi)
    .max()
    //.clip(app.data.aoi);
  updateGrowth();
  app.data.popDens = app.data.pop
    //.clip(app.data.aoi)
    .divide(100)
    .rename([app.data.bands[3]]);
  // colección de fosas
  app.data.graves = ee.FeatureCollection(app.data.gravesPath + app.data.places[place].abrev)
    .distinct(['.geo']) // no pueden haber dos fosas con la misma coordenada
    //.filterBounds(app.data.aoi)
    .map(function(f){
      return ee.Feature(f)
        .set(app.data.label,1);
    });
  app.data.dist = app.data.graves
    .reduceToImage([app.data.label],ee.Reducer.first())
    .fastDistanceTransform()
    .sqrt()
    .divide(1e3)
    .rename([app.data.bands[4]]);
  // Actualiza el mapa
  app.map.centerObject(app.data.graves);    
  geometries.update(app.drawingTools, app.data.graves, {
    reset: true,
    infoField: app.data.places[place].infoField,
    layer: {
      name: app.data.graveLayer, 
      color: app.options.spaceChart.series[2].fillColor,
      //locked: true
    },
  });
  updateMapLayers();
  updateSamples();
  updateSpaceLayer();   
}
app.control.place.onChange(updatePlace);
function updateUrlParamMaxTime(newValue){
  ui.url.set('max_time',newValue);
}
app.control.maxTime.onChange(updateUrlParamMaxTime);
function updateUrlParamMaxVis(newValue){
  ui.url.set('max_vis',newValue);
}
app.control.maxVis.onChange(updateUrlParamMaxVis);
function updateUrlParamPlace(newValue){
  ui.url.set('place',newValue);
}
app.control.place.onChange(updateUrlParamPlace);
function updateUrlParamModel(newValue){
  ui.url.set('curve',newValue);
}
app.control.exponent.onChange(updateUrlParamModel);
function updateUrlParamDistRange(newValue){
  ui.url.set('dist_range',newValue);
}
app.control.distRange.onChange(updateUrlParamDistRange);
function updateUrlParamPopRange(newValue){
  ui.url.set('pop_range',newValue);
}
app.control.popRange.onChange(updateUrlParamPopRange);
function updateUrlParamGrowthRange(newValue){
  ui.url.set('growth_range',newValue);
}
app.control.growthRange.onChange(updateUrlParamGrowthRange);
function updateUrlParamGrowthYear(newValue){
  ui.url.set('growth_year',newValue);
}
app.control.growthPeriod.onChange(updateUrlParamGrowthYear);
function updateUrlParamMap(newMapParams){
  app.mapScale = app.map.getScale(); 
  ui.url.set('lat',newMapParams.lat);
  ui.url.set('lon',newMapParams.lon);
  ui.url.set('zoom',newMapParams.zoom);
  updateDistLayer();
}
//*********************************************
//             Inicialización
//*********************************************
// pone el zoom basado la ubicación por url
var center = {
  lon: ui.url.get('lon',-99.531),
  lat: ui.url.get('lat',18.3643),
  zoom: ui.url.get('zoom',10),
  };
//app.drawingTools.setShown(false);
app.control.maxTime.setMax(app.options.time.visParams.max);
app.control.maxVis.setMax(app.options.vis.visParams.max);
// inicializa las graficas
app.options.pieCharts.title = app.data.graveLayer;
app.charts.pieSamp.setOptions(app.options.pieCharts);
app.charts.pieSamp.style().set(app.style.chart);
app.options.pieCharts.title = 'Terreno [km2]';
app.options.pieCharts.pieSliceText = 'percentage';
app.charts.pieImage.setOptions(app.options.pieCharts);
app.charts.pieImage.style().set(app.style.chart);
// oculta opciones
app.control.masks.style().set({shown: false});
app.control.vector.style().set({shown: false});
app.control.download.style().set({shown: false});
app.control.references.style().set({shown: false});
app.control.urlsClear.setDisabled(true);
app.control.place.setValue(ui.url.get('place',app.data.defaultPlace),false);
app.control.maxVis.setValue(ui.url.get('max_vis',app.options.space.maxVis),false);
app.control.maxTime.setValue(ui.url.get('max_time',app.options.space.maxTime),false);
app.control.exponent.setValue(ui.url.get('curve',app.options.space.model),false);
app.control.distRange.setValue(ui.url.get('dist_range',app.options.space.distRange),false);
app.control.distRangeOptions.style().set({shown: app.control.distRange.getValue()});
app.control.popRange.setValue(ui.url.get('pop_range',app.options.space.popRange),false);
app.control.popRangeOptions.style().set({shown: app.control.popRange.getValue()});
app.control.growthPeriod.setValue(ui.url.get('growth_year',app.options.space.growthPeriod),false);
app.control.growthRange.setValue(ui.url.get('growth_range',app.options.space.growthRange),false);
app.control.growthRangeOptions.style().set({shown: app.control.growthRange.getValue()});
app.options.dist.visibility = app.control.distRange.getValue();
app.options.pop.visibility = app.control.popRange.getValue();
app.options.growth.visibility = app.control.growthRange.getValue();
app.control.downloadFormats.setValue('kml');
app.control.deleteVectors.setDisabled(true);
app.control.CSVLoad.setDisabled(true);
updatePlace(app.control.place.getValue());
// Espera 2 segundos para centrar el mapa
ui.util.setTimeout(function(){
  app.map.setCenter(center);
},2000);
app.map.onIdle(updateUrlParamMap);