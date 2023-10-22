/* VIExplorer - App para cáculo de indices espectrales empleando compuesto configurable
  Característica              Incluído    Nota
  Filtrado temático de indice     Si      Requiere revisión, falta por sensor
  Selección de indice             Si
  Textura de indice               Si      Operador espacial
  Configuración de compuesto      Si      Colección y período
  Histograma de escenas           Si      Muestra el numero de escenas disponibles por período
  Comparación de dos índices      Si      Varias métricas, inlcuido campo vectorial
  Comparación de comparaciones    No
  Carga de capas vectoriales      Si      Solamente desde assets precargados y compartidos
  Carga de capas raster           No
  Creación de nuevos índices      No      Son precodificados únicamente
  Leyendas                        Si      Hay que mejorar posiciónamiento
  Mapa llave (inset)              Si      Limitado al panel principal
  Mensaje de estado               Si      Limitado al panel principal
  Enmascaramiento interactivo     Si      Un solo umbral, invertible
  Área de máscara                 Si      A la escala del mapa
  Consulta de valores             Si
  Perfiles temporales             Si      Limitado a indices de primer orden
  Selector de fecha               Si      También desde perfil temporal e histograma
  Perfiles espectrales            Si      Solo un panel
  Perfiles espaciales             Si      Falta corregir para polyline
  Lineas de maximo descenso       Si      De escala fija
  Histogramas                     Si      Incluye estadisticas básicas, pero no incluye correlación
  Scatterplots                    Si      Falta ajuste de modelo corrrelacional
  Descarga de datos               Si      Interactividad limitada 
  Compartir mapas                 Si      Copiando y pegando el url, mapa de fondo no se configura
  Visualización configurable      Si      A través de la leyenda se configura
  Tipo de mapas base en url       Si      Solo por url, no se configura al cambiar el tipo de mapa
  Generación de huella de escenas Si      Limitado a 100
  Animación de colleccion         No
  Capa de numero de escenas       Si      Campo Count creado al vuelo
  Enmascaramiento de nubes        Sí      Solo productos con mpascara de nubes
  Ayuda en línea                  No
  Sección de ejemplos             No      Se incluiran en la ayuda en línea
  Compuestos progamables x 2      Si      Los compuestos son progamables desde el url
  Trazons ligados en dos paneles  Si
*/
/*
 Bugs:
 1. Cuando el url indica texturas con reescalamiento el rango de despliegue es el mismo antes y después del cálculo de texturas
 2. Cuando se procesa el URL y tiene doble panel con comparación puede no generarse debido a que el retraso no es suficiente
 3. Cuando se cambia la geometría con la consulta puntual, de línea o de área, ésta se desactiva
 4. Al duplicar el panel se pierde el campo de consulta de una geometría cargada
*/
// Importa módulos externos
var legends = require('users/jsilvan/tools:legends');
var images = require('users/jsilvan/tools:images');
var terrain = require('users/jsilvan/tools:terrain');
var geometries = require('users/jsilvan/tools:geometries');
var gui = require('users/jsilvan/tools:gui');
// Define algunas variables globales
var t0;
/******************************************
 * Modelo de Datos
********************************************/
var app = {};
app.data = {};
// Define algunas constantes de la app
app.data.startUpDelayStep = 500; // retrazo durante generación de mapa al iniciar
app.data.maxGOCthreholds = 32;
app.data.maxProfilePoints = 512;
app.data.maxflowLinePoints = 256;
app.data.maxHistogramBuckets = 128
app.data.maxScatterPoints = 1024;
app.data.maxStatsPoints = 128;
app.data.maxCatchAreaIter = 128;
app.data.defaultProj = ee.Projection('EPSG:4326');
app.data.sensorsList = Object.keys(images.SensorsList);
app.data.indexList = Object.keys(images.SI).sort();       // Lista de índices
app.data.indexNameList = app.data.indexList.map(function(i){return images.SI[i].name});       // Lista de índices
app.data.textureList = Object.keys(images.SF);            // lista de texturas
app.data.comparisonList = Object.keys(images.Comparisons);  // lista de metricas de comparación
app.data.dateFormat = 'MMM d, YYYY'; // formato de fechas
app.data.colReducers = {
  First: ee.Reducer.firstNonNull(),
  Min: ee.Reducer.min(),
  Max: ee.Reducer.max(),
  Mean: ee.Reducer.mean(),
  Median: ee.Reducer.median(),
  };
// define contadores y nombres base
app.data.profiles = 0;
app.data.areas = 0;
app.data.points = 0;
app.data.flowlines = 0;
app.data.catchments = 0;
app.data.contours = 0;
app.data.pointName = 'QueryPoint'; // nombre base de los puntos de consulta;
app.data.lineName = 'ProfileLine'; // nombre base de las lineas de perfiles;
app.data.flowlineName = 'FlowLine'; // nombre base de las lineas de flujo;
app.data.catchmentName = 'CatchmentArea'; // nombre base de las lineas de flujo;
app.data.contourName = 'ContourLine'; // nombre base de las lineas de contorno;
app.data.polygonName = 'StatsPolygon'; // nombre base de las lineas de perfiles;
app.data.selectable = []; // aquí van pares nombres de capas y campo consultables
app.data.positions = ['left','right'];
// Define textos de la interface
app.data.text = {};
app.data.text.title = 'Global Spectral Index Mapper';
app.data.text.descr = 'Use this app to compute, visualize, query and export ' +
  'spectral indices based on composites from varied image collections and time ' +
  'periods. Map will update upon change of options. (Last update Oct, 2023)';
app.data.text.aoi = 'This section provides some tools to locate your area of interest.' + 
  'You may also use the search box or the map navigation tools to locate your area of interest.';
app.data.text.layer = 'Load a vector layer from your GEE Assets (requires a GEE account). ' +
  'The Asset name must reference a public feature collection, and ' +
  'the Info property (optional), must be a valid string property.';
app.data.text.index = 'There are ' + app.data.indexList.length  + 
  ' indices to choose from. Use this section to filter, select and learn about available indices.';
app.data.text.composite = 'There are ' + app.data.sensorsList.length +
  ' collections that are filtered according to selected index. ' +
  'Configure the composite image by selecting the collection, ' + 
  'date, and other options.'; 
app.data.text.scenes = 'Scenes per period in current view'; 
app.data.text.operator = 'Optionally, perform some operations on selected index. '+
  'You may need to adjust the zoom level and/or index range before applying some operators.'
app.data.text.compare = 'Update the composite and\/or index (left panel), and then apply ' +
  'a binary operation between left and right indices. Result is shown on the left panel.';
app.data.text.explore = 'Use this section to change map and layer appearence and share the link.'
app.data.text.point = 'Click map to query value...';
app.data.text.profile = 'Draw a line to plot profile...';
app.data.text.polygon = 'Draw a polygon to compute statistics...';
app.data.text.download = 'Adjust the image resolution, image size and ' + 
  'download area, then click refresh to update the dowload URL. Maximum ' +
  'file size is 32 MB.';
// define opciones por default, algunas se modifican desde el url
app.data.option = {};
app.data.option.mapType = 'HYBRID';
app.data.option.index = 'NDVI';  // índice por defaut
app.data.option.collection = 'MODIS SR'; // sensor por default
app.data.option.period = 30;
app.data.option.refDate = 12*3600*1e3;
app.data.option.reducer = 'Median';
app.data.option.date = Date.now() - app.data.option.period*24*60*60*1000; // hace 30 días
app.data.option.texture = false;
app.data.option.descriptor = 'Mean';
app.data.option.kernel = 3; // kernel size
app.data.option.mask = false;
app.data.option.cloudMask = false;
app.data.option.threshold = 0;
app.data.option.invert = false;
app.data.option.splitted = false;
app.data.option.compare = false;
app.data.option.legendsPos = 'right';
app.data.option.insetPos = 'right';
app.data.option.comparison = 'Normalized Difference';
app.data.option.copacity = 1; // opacidad del compuesto por default
app.data.option.iopacity = 1; // opacidad del indice por default
// opciones de graficas
app.data.option.specChart = {
  title: 'SensorID Spectral Signature',
  hAxis: {
    title: 'Wavelength (micrometer)',
    titleTextStyle: {italic: false, bold: true},
    viewWindow: {min: 0.3, max: 2.5}
  },
  vAxis: {
    title: 'Reflectance',
    titleTextStyle: {italic: false, bold: true},
    //viewWindow: {min: 0, max: 0.5}
  },
  //legend: { position: "none" },
  series: {0: {labelInLegend: 'Point #'}},
  //colors: [color],
  pointSize: 0,
  lineSize: 2,
  curveType: 'function'
};
app.data.option.timeSeriesChart = {
  title: 'Sensor ID-index Time Series',
  hAxis: {title: 'time'},
  vAxis: {title: 'index'},
  //backgroundColor: 'FFFFAA',
  series: {0: {labelInlegend: 'point #', lineWidth: 1, pointSize: 0}}, //, color: color}},
};
app.data.option.profileChart = {
  title: 'Sensor ID-index Profile',
  vAxis: {
    title: 'index'
  },
  hAxis: {
    title: 'distance [m]'
  },  
//  legend: 'none',
  lineWidth: 1,
  series: {0: {labelInLegend: 'profile #'}}
  //pointSize: 2,
  //colors: [line_gl.getColor()],
};
app.data.option.histChart = {
  title: 'SensorID-index Histogram',
  bar: {groupWidth: '100%', gap: 0},
  series:  {0: {labelInLegend: 'polygon #'}},
  hAxis: {title: 'index', viewWindow: {min: 0, max: 1}},
  vAxis: {title: 'Count'},
};
app.data.option.scatterplot = {
  title: 'Scatterplot',
  pointSize: 2,
  hAxis: {
    title: 'xLabel',
    //viewWindow: {min: visParams_right.min, max: visParams_right.max}
  },
  vAxis: {
    title: 'yLabel',
    //viewWindow: {min: visParams_left.min, max: visParams_left.max}
  },
  series:  {0: {labelInLegend: 'polygon #'}},
};
app.data.option.colHistChart = {
  bar: {groupWidth: '100%', gap: 0},
  hAxis: {baselineColor: 'none',viewWindow: {min: 0, max: 1}, gridlines: {count: 0}},// textPosition: 'none',
  vAxis: {baselineColor: 'none',  textPosition: 'none', gridlines: {count: 0}},
  colors: ['aaaaaa'],
  backgroundColor: {fill: 'ffffff00'},
  strokeWidth: 0,
  chartArea: {height: '90%',width: '100%',left: 0, top: 0},
  width: 300,
  height: 50,
  toolTip: {ignoreBounds: true},
};
// define las variables de capas
app.data.layer = {};
app.data.layer.index = {};
app.data.layer.index.image = null;
app.data.layer.index.masked = null; // copia con máscara
app.data.layer.index.name = 'index';
app.data.layer.index.visParams = {};
app.data.layer.composite = {};
app.data.layer.composite.image = null;
app.data.layer.composite.name = 'composite';
app.data.layer.composite.visParams = {};
app.data.layer.downloadArea = null;
/******************************************
 * Objetos
********************************************/
// Maps
app.map = {};
app.map.bounds = ee.List([-148.05970982837678, 3.6866823174543017, -53.752071421623235, 37.71607656496076]);
app.map.scale = ee.Number(1000); // escala del mapa, se actualizará al cambiar el zoom
app.map.main = ui.Map();
app.map.inset = ui.Map({style: {position: "bottom-right"}});
app.map.copy = ui.Map();
app.map.layer = {};
app.map.layer.composite = ui.Map.Layer();  
app.map.layer.index = ui.Map.Layer(); 
app.map.layer.composite2 = ui.Map.Layer();  
app.map.layer.index2 = ui.Map.Layer(); 
app.map.linker = ui.Map.Linker([app.map.main, app.map.copy]);
app.map.split = ui.SplitPanel({
    orientation: 'horizontal',
    wipe: true,
    style: {stretch: 'both'},
    firstPanel: app.map.linker.get(0),
    secondPanel: app.map.linker.get(1),
});
app.map.message = ui.Panel();
app.map.legends = {};
app.map.legends.panel = ui.Panel();
app.map.legends.index = legends.image(app.map.layer.index,app.map.main);
app.map.legends.composite = legends.image(app.map.layer.composite,app.map.main);
app.map.legends.index2 = legends.image(app.map.layer.index2,app.map.main);
app.map.legends.composite2 = legends.image(app.map.layer.composite2,app.map.main);
app.drawingTools = app.map.main.drawingTools();
app.map.legends.title = gui.toggleIcon([gui.Emoji.map,gui.Emoji.minus],1);
// Widgets
app.title = ui.Label(app.data.text.title);
app.author = ui.Label('By jsilvan');
app.intro = ui.Label(app.data.text.descr);
app.control = {};
// AOI 
app.control.aoi = {};
app.control.aoi.panel = ui.Panel();
app.control.aoi.help = ui.Label(app.data.text.aoi);
app.control.aoi.centerOnMe = ui.Button('Center on my location'); // gui.curLocButton("🧿",10);
app.control.aoi.layer = ui.Checkbox('Use a vector layer');
app.control.aoi.asset = ui.Textbox('users/<username>/<asset>');
app.control.aoi.property = ui.Textbox('to be shown upon selection');
app.control.aoi.load = ui.Button('Load');
app.control.aoi.toggle = gui.toggleButton(
  gui.pmStates('Area of Interest'),
  function(value,widget) {
    app.control.aoi.panel.style().set('shown',value);
  });
// index
app.control.index = {};
app.control.index.help = ui.Label(app.data.text.index);
app.control.index.panel = ui.Panel();
app.control.index.filterTags = ui.Select();
app.control.index.selector = ui.Select();
app.control.index.name = ui.Label('',{fontWeight : 'bold',stretch: 'horizontal'});
app.control.index.descr = ui.Label('');
app.control.index.toggle = gui.toggleButton(
  gui.pmStates('Spectral Index'),
  function(value,widget) {
    app.control.index.panel.style().set('shown',value);
  });
// composite
app.control.composite = {};
app.control.composite.panel = ui.Panel();
app.control.composite.help = ui.Label(app.data.text.composite);
app.control.composite.collCount = ui.Label();
app.control.composite.collections = ui.Select({placeholder: 'There are NO collections for selected index!'});
app.control.composite.collection = ui.Label();
app.control.composite.dateLabel = ui.Label('Select composite range date: ');
app.control.composite.dateSlider = ui.DateSlider();
app.control.composite.optionsBar = gui.radioButtons(['Time slicing','Scenes'],'horizontal',0);
app.control.composite.refDate = ui.Textbox('yyyy-mm-dd');
app.control.composite.period = ui.Slider(1,365,app.data.option.period,1);
app.control.composite.reducer = ui.Select(Object.keys(app.data.colReducers),null,app.data.option.reducer);
app.control.composite.startDate = ui.Label();
app.control.composite.endDate = ui.Label();
app.control.composite.cloudMask = ui.Checkbox('Apply cloud masking');
app.control.composite.count = ui.Label();
app.control.composite.footprint = ui.Button('Generate footprint');
app.control.composite.toggle = gui.toggleButton(
  gui.pmStates('Image Composite'),
  function(value,widget) {
    app.control.composite.panel.style().set('shown',value);
  });
// operator
app.control.operator = {};
app.control.operator.panel = ui.Panel();
app.control.operator.help = ui.Label(app.data.text.operator);
app.control.operator.texture = ui.Checkbox('Apply spatial operator');
app.control.operator.selector = ui.Select(app.data.textureList);
app.control.operator.kernel = ui.Slider(3,15,app.data.option.kernel,2);
app.control.operator.rescale = ui.Checkbox('Apply pre-rescalling');
app.control.operator.rescaleMin = ui.Textbox();
app.control.operator.rescaleMax = ui.Textbox();
app.control.operator.name = ui.Label('',{fontWeight : 'bold',stretch: 'horizontal'});
app.control.operator.descr = ui.Label('');
app.control.operator.vectorize = ui.Button('Vectorize mask');
//app.control.operator.contourType = gui.radioButtons([gui.Emoji.filledSquare,gui.Emoji.outlineSquare],'horizontal',1);
app.control.operator.toggle = gui.toggleButton(
  gui.pmStates('Advanced Operations'),
  function(value,widget) {
    app.control.operator.panel.style().set('shown',value);
  });
app.control.operator.mask = ui.Checkbox('Apply threshold mask');
app.control.operator.threshold = ui.Slider();
app.control.operator.invertMask = ui.Checkbox('Invert masked pixels');
app.control.operator.maskArea = ui.Label('Mask area:');
app.control.operator.compare = ui.Checkbox('Apply binary operation');
app.control.operator.comparison = ui.Select(app.data.comparisonList,'',app.data.option.comparison);
app.control.operator.showQueryOpts = ui.Checkbox('Configure queries');
app.control.operator.queryBar = gui.radioButtons(['Point','Line','Area'],'horizontal',0);
app.control.operator.keepMarker = ui.Checkbox('Keep query point',true);
app.control.operator.timeseries = ui.Checkbox('Include time series chart');
app.control.operator.spectrum = ui.Checkbox('Include spectral signature chart');
app.control.operator.flowline = ui.Checkbox('Generate flowline (downhill)');
app.control.operator.catchment = ui.Checkbox('Generate catchment area (uphill)');
app.control.operator.deletePoints = gui.icon(gui.Emoji.trashcan);
app.control.operator.deleteLines = gui.icon(gui.Emoji.trashcan);
app.control.operator.keepLine = ui.Checkbox('Keep query line',true);
app.control.operator.profile = ui.Checkbox('Include profile plot',true);
app.control.operator.histogram = ui.Checkbox('Include histogram',true);
app.control.operator.scatterplot = ui.Checkbox('Include scatterplot');
app.control.operator.gocplot = ui.Checkbox('Include GOC plot');
app.control.operator.timeseries2 = ui.Checkbox('Include time series chart');
app.control.operator.deletePolygons = gui.icon([gui.Emoji.trashcan]);
app.control.operator.keepPolygon = ui.Checkbox('Keep query polygon',true);
// explore
app.control.explore = {};
app.control.explore.panel = ui.Panel();
app.control.explore.help = ui.Label(app.data.text.explore);
app.control.explore.legends = ui.Checkbox('Show legend');
app.control.explore.legendsPos = gui.radioButtons([gui.Emoji.leftArrow,gui.Emoji.rightArrow],'horizontal',1);//gui.toggleIcon([gui.Emoji.rightArrow,gui.Emoji.leftArrow]);
app.control.explore.index = ui.Checkbox('Include index',true);
app.control.explore.composite = ui.Checkbox('Include composite',true);
app.control.explore.index2 = ui.Checkbox('Include index (right panel)');
app.control.explore.composite2 = ui.Checkbox('Include composite (right panel)');
app.control.explore.inset = ui.Checkbox('Show inset map');
app.control.explore.insetPos = gui.radioButtons([gui.Emoji.leftArrow,gui.Emoji.rightArrow],'horizontal',1);//gui.toggleIcon([gui.Emoji.rightArrow,gui.Emoji.leftArrow]);
app.control.explore.mapType = ui.Select(["ROADMAP", "SATELLITE", "HYBRID","TERRAIN"]);
app.control.explore.duplicate = ui.Checkbox('Duplicate map');
app.control.explore.swap = gui.icon(gui.Emoji.horArrow);
app.control.explore.showLayerOpts = ui.Checkbox('Configure layers');
app.control.explore.layersBar = gui.radioButtons(['Index','Composite','Index (R)', 'Composite (R)'],'horizontal',0);
app.control.explore.mapUrl = ui.Label('Right click here, copy and share the map url');
app.control.explore.toggle = gui.toggleButton(
  gui.pmStates('Map Appearance'),
  function(value,widget) {
  app.control.explore.panel.style().set('shown',value);
});
// download
app.control.download = {};
app.control.download.help = ui.Label(app.data.text.download);
app.control.download.index = ui.Label('Index Image (TIF)');
app.control.download.indexRefresh = ui.Button('refresh');
app.control.download.composite = ui.Label('Composite image (TIF)');
app.control.download.compositeRefresh = ui.Button('refresh');
app.control.download.samples = ui.Label('Geometry layers (KML)');
app.control.download.samplesRefresh = ui.Button('refresh');  
app.control.download.scale = ui.Slider();
app.control.download.centerArea = ui.Button('Reset to current view');
app.control.download.scalePanel = ui.Panel([
    ui.Label('Pixel size (meters):'),
    app.control.download.scale
    ],ui.Panel.Layout.flow('horizontal')); 
app.control.download.rows = ui.Slider(100,10000,1000,1);
app.control.download.rowsPanel = ui.Panel([
    ui.Label('Rows (pixels):'),
    app.control.download.rows
    ],ui.Panel.Layout.flow('horizontal'));
app.control.download.cols = ui.Slider(100,10000,1000,1);
app.control.download.colsPanel = ui.Panel([
    ui.Label('Columns (pixels):'),
    app.control.download.cols
    ],ui.Panel.Layout.flow('horizontal'));
app.control.download.panel = ui.Panel();
// muestra el panel de descarga
var showDownloadPanel = function(value,widget) {
  print(eTime() +': opening download panel...');
  //app.drawingTools.unlisten();
  app.control.download.panel.style().set('shown',value);
  if (!value) {
    // oculta el área de descarga
    if (app.data.layer.downloadArea)
      app.data.layer.downloadArea.setShown(false);
    return;
  }
  if (app.data.layer.downloadArea) {
  // muestra área de descarga y centra el mapa en ella
    app.data.layer.downloadArea.setShown(true);
    app.map.main.centerObject(app.data.layer.downloadArea.geometries().get(0));
    app.drawingTools
        .setSelected(app.data.layer.downloadArea)
        .edit();
    return;    
  }
  // Crea área de descarga si no existe
  app.map.message.style().set({shown: true});
  app.map.message.widgets().reset([ui.Label('Updating geometry layers...')]);
  // usa los limites del mapa
  var bounds = app.map.main.getBounds();
  // crea la geometría asíncronamente
  app.map.main.getCenter()
    .coordinates()
    .evaluate(function(center){
      var rect = [
        (bounds[0]-center[0])*0.5+center[0],
        (bounds[1]-center[1])*0.5+center[1],
        (bounds[2]-center[0])*0.5+center[0],
        (bounds[3]-center[1])*0.5+center[1]
      ];
      // agrega la capa a la herramienta de dibujo
      app.data.layer.downloadArea = app.drawingTools.addLayer({
        name: DOWNLOAD_AREA_ID,
        color: 'cyan',
        geometries: [],
      });
      app.data.layer.downloadArea.geometries()
        .set(0,ee.Geometry.BBox(rect[0],rect[1],rect[2],rect[3]));
      var box = [
        [rect[0],rect[1]],
        [rect[2],rect[1]],
        [rect[2],rect[3]],
        [rect[0],rect[3]],
        [rect[0],rect[1]]
      ];
      // actualiza el selector de escala
      var geom = geometryProps(box);
      var scale = Math.max(geom.width/app.control.download.cols.getValue(),geom.height/app.control.download.rows.getValue());
      scale = Math.min(Math.max(scale,app.control.download.scale.getMin()),app.control.download.scale.getMax());
      app.drawingTools
        .setSelected(app.data.layer.downloadArea)
        .edit();
      app.drawingTools.onEdit(ui.util.debounce(updateDownloadArea, 500));  
      app.drawingTools.onErase(ui.util.debounce(closeDownload,500));
      app.map.message.style().set({shown: false});    
            // actualiza la escala y las dimensiones
      app.control.download.scale.setValue(scale,false);
      updateDownloadSize(app.control.download.scale.getValue()); 
    });
};
app.control.download.toggle = gui.toggleButton(
  gui.pmStates('Download Data'),
  showDownloadPanel);
app.control.panel = ui.Panel();
app.control.toggle = gui.toggleIcon([gui.Emoji.gear,gui.Emoji.times],1);
app.map.queryIcon = gui.toggleIcon([gui.Emoji.label,gui.Emoji.stop],0);
app.map.inspector = gui.inspector(''); // panel de inspección
/******************************************
 * Composición
********************************************/
// Panel de leyendas
app.map.legends.panel.add(app.map.legends.index);
app.map.legends.panel.add(app.map.legends.composite);
app.map.legends.panel.add(app.map.legends.index2);
app.map.legends.panel.add(app.map.legends.composite2);
app.map.legends.frame = ui.Panel([
  ui.Panel([
    ui.Label('',{stretch: 'horizontal'}),
    app.map.legends.title
    ],ui.Panel.Layout.flow('horizontal'),{backgroundColor: 'ffffff00'}),
  app.map.legends.panel,
  ]);
// aoi
app.control.aoi.panel.add(app.control.aoi.help);
app.control.aoi.panel.add(app.control.aoi.centerOnMe);
app.control.aoi.panel.add(app.control.aoi.layer);
app.control.aoi.layerOptions = ui.Panel([
  ui.Label(app.data.text.layer),
  ui.Panel([
    ui.Label('Asset name:'),
    app.control.aoi.asset,
    ],ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label('Info property:'),
    app.control.aoi.property,
    ],ui.Panel.Layout.flow('horizontal')),
  app.control.aoi.load,
]);
app.control.aoi.panel.add(app.control.aoi.layerOptions);
// index
app.control.index.panel.add(app.control.index.help);
app.control.index.panel.add(ui.Panel([
  ui.Label('Filter index list by: '),
  app.control.index.filterTags
  ],ui.Panel.Layout.flow('horizontal')));
app.control.index.panel.add(ui.Panel([
  ui.Label('Selected index: '),
  app.control.index.selector
  ],ui.Panel.Layout.flow('horizontal')));
app.control.index.panel.add(app.control.index.name);
app.control.index.panel.add(app.control.index.descr);
// composite
app.control.composite.panel.add(app.control.composite.help);
app.control.composite.panel.add(ui.Panel([
    ui.Panel([
      ui.Label('Available collections for selected index:'),
      app.control.composite.collCount
      ],ui.Panel.Layout.flow('horizontal')),
    app.control.composite.collections,
    app.control.composite.collection
    ]));
app.control.composite.datePanel = ui.Panel([
  app.control.composite.dateLabel,
  app.control.composite.dateSlider]);
app.control.composite.panel.add(app.control.composite.datePanel);
app.control.composite.timeSliceOptions = ui.Panel([
  ui.Panel([
    ui.Label('Pivot date: '), 
    app.control.composite.refDate,
  ],ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label('Period (days): '), 
    app.control.composite.period,
  ],ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label('Reducer: '), 
    app.control.composite.reducer,
  ],ui.Panel.Layout.flow('horizontal'))
  ]);
app.control.composite.panel.add(app.control.composite.optionsBar);
app.control.composite.panel.add(app.control.composite.timeSliceOptions);
app.control.composite.scenesOptions = ui.Panel([
    app.control.composite.cloudMask,
    app.control.composite.count,
    ui.Label(app.data.text.scenes,{fontWeight : 'bold'}),
    ui.Label('Double-click a histogram bar to load that period.'),
    ui.Panel([
      app.control.composite.startDate,
      app.control.composite.endDate
    ],ui.Panel.Layout.flow('horizontal'),{margin: '-6px 0px 8px 0px'}),
    app.control.composite.footprint,
  ]);
app.control.composite.panel.add(app.control.composite.scenesOptions);
// operator
app.control.operator.panel.add(app.control.operator.help);
app.control.operator.rangePanel = ui.Panel([
      ui.Label('Index range: '),
      app.control.operator.rescaleMin,
      ui.Label('-'),
      app.control.operator.rescaleMax,
    ],ui.Panel.Layout.flow('horizontal'),{stretch: 'horizontal'})
app.control.operator.panel.add(app.control.operator.rangePanel);
app.control.operator.thresholdPanel = ui.Panel([
  ui.Label('Threshold: '),
  app.control.operator.threshold
  ],ui.Panel.Layout.flow('horizontal'));
app.control.operator.maskOptions = ui.Panel([
    app.control.operator.thresholdPanel,
    app.control.operator.invertMask,
    app.control.operator.maskArea,
    //ui.Panel([
      app.control.operator.vectorize,
      //app.control.operator.contourType],ui.Panel.Layout.flow('horizontal')),
    ]);
app.control.operator.panel.add(app.control.operator.mask);
app.control.operator.panel.add(app.control.operator.maskOptions);    
app.control.operator.textureOptions = ui.Panel([
    ui.Panel([
      ui.Label('Spatial operator:'),
      app.control.operator.selector,
      ],ui.Panel.Layout.flow('horizontal')),
    app.control.operator.name,
    app.control.operator.descr,
    ui.Panel([
      ui.Label('Kernel size (pixels): '),
      app.control.operator.kernel,
      ],ui.Panel.Layout.flow('horizontal')),
    app.control.operator.rescale,
    ]);
app.control.operator.panel.add(app.control.operator.texture);
app.control.operator.panel.add(app.control.operator.textureOptions);
app.control.operator.panel.add(app.control.operator.compare);
app.control.operator.compareOptions = ui.Panel([
    ui.Panel([
      ui.Label('Binary operator:'),
      app.control.operator.comparison
      ],ui.Panel.Layout.flow('horizontal')),
    ]);
app.control.operator.panel.add(app.control.operator.compareOptions);
// Query configuration panels
app.control.operator.panel.add(app.control.operator.showQueryOpts);
app.control.operator.inspectorOptions = ui.Panel([  
  ui.Panel([
    app.control.operator.keepMarker,
    app.control.operator.deletePoints
    ],ui.Panel.Layout.flow('horizontal')),
  app.control.operator.spectrum,
  app.control.operator.timeseries,  
  app.control.operator.flowline,
  app.control.operator.catchment,
]);
app.control.operator.profileOptions = ui.Panel([
  ui.Panel([
    app.control.operator.keepLine,    
    app.control.operator.deleteLines,
    ],ui.Panel.Layout.flow('horizontal')),
    app.control.operator.profile,
  ]);
app.control.operator.statsOptions = ui.Panel([
  ui.Panel([
    app.control.operator.keepPolygon,
    app.control.operator.deletePolygons,
    ],ui.Panel.Layout.flow('horizontal')),
  app.control.operator.histogram,
  app.control.operator.timeseries2,
  app.control.operator.gocplot,
  app.control.operator.scatterplot,
  ]);
app.control.operator.queryOptions = ui.Panel([
  app.control.operator.queryBar,
  app.control.operator.inspectorOptions,
  app.control.operator.profileOptions,
  app.control.operator.statsOptions,
  ]);
app.control.operator.panel.add(app.control.operator.queryOptions);
// map configuration panel
app.control.explore.panel.add(app.control.explore.help);
app.control.explore.panel.add(ui.Panel([
  ui.Label('Select a basemap:'),
  app.control.explore.mapType,
  ],ui.Panel.Layout.flow('horizontal')),{stretch: 'horizontal'});
// panel Configure layers
app.control.explore.panel.add(app.control.explore.showLayerOpts);
app.control.explore.layersOptions = ui.Panel([
  app.control.explore.layersBar,
  app.map.legends.index.remove(app.map.legends.index.config),
  app.map.legends.composite.remove(app.map.legends.composite.config),
  app.map.legends.index2.remove(app.map.legends.index2.config),
  app.map.legends.composite2.remove(app.map.legends.composite2.config),
]);
app.control.explore.panel.add(app.control.explore.layersOptions);
// panel Show legend
app.control.explore.panel.add(
    ui.Panel([
    app.control.explore.legends,
    app.control.explore.legendsPos,
  ],ui.Panel.Layout.flow('horizontal'))),
app.map.legends.composite2.widgets().get(0).remove(app.map.legends.composite2.edit);
app.map.legends.index.widgets().get(0).remove(app.map.legends.index.edit);
app.map.legends.composite.widgets().get(0).remove(app.map.legends.composite.edit);
app.map.legends.index2.widgets().get(0).remove(app.map.legends.index2.edit);
app.control.explore.legendsOptions = ui.Panel([
  app.control.explore.index,
  app.control.explore.composite,
  app.control.explore.index2,
  app.control.explore.composite2,
]);
app.control.explore.panel.add(app.control.explore.legendsOptions);
// panel Show inset map
app.control.explore.panel.add(ui.Panel([
    app.control.explore.inset,
    app.control.explore.insetPos,
  ],ui.Panel.Layout.flow('horizontal')));
// panel Duplicate map
app.control.explore.panel.add(ui.Panel([
    app.control.explore.duplicate,
    app.control.explore.swap,
  ],ui.Panel.Layout.flow('horizontal'))
  );
// Panel +Download Data
app.control.download.panel.add(app.control.download.help);
app.control.download.panel.add(app.control.download.scalePanel);
app.control.download.panel.add(app.control.download.rowsPanel);
app.control.download.panel.add(app.control.download.colsPanel);
app.control.download.panel.add(app.control.download.centerArea);
app.control.download.panel.add(ui.Panel([
  app.control.download.index,
  app.control.download.indexRefresh
  ],ui.Panel.Layout.flow('horizontal')));
app.control.download.panel.add(ui.Panel([
  app.control.download.composite,
  app.control.download.compositeRefresh
  ],ui.Panel.Layout.flow('horizontal')));
app.control.download.panel.add(ui.Panel([
  app.control.download.samples,
  app.control.download.samplesRefresh
  ],ui.Panel.Layout.flow('horizontal')));
// tool panel
app.control.panel.add(app.title);
app.control.panel.add(app.author);
app.control.panel.add(app.intro);
app.control.panel.add(app.control.aoi.toggle);
app.control.panel.add(app.control.aoi.panel);
app.control.panel.add(app.control.index.toggle);
app.control.panel.add(app.control.index.panel);
app.control.panel.add(app.control.composite.toggle);
app.control.panel.add(app.control.composite.panel);
app.control.panel.add(app.control.explore.toggle);
app.control.panel.add(app.control.explore.panel);
app.control.panel.add(app.control.operator.toggle);
app.control.panel.add(app.control.operator.panel);
app.control.panel.add(app.control.download.toggle);
app.control.panel.add(app.control.download.panel);
// map
app.map.main.add(app.control.toggle);
app.map.main.add(app.map.message);
app.map.main.add(app.map.inspector.panel);
app.map.main.add(app.map.queryIcon);
ui.root.clear();
ui.root.widgets().add(app.control.panel);
ui.root.widgets().add(app.map.main); 
/******************************************
 * Estilos 
********************************************/
var HEADER_STYLE = {
  textAlign: 'left', 
  fontWeight: 'bold',
  fontSize: '18px',
  stretch: 'horizontal',
};
var WIDGET_STYLE = {
    stretch: 'horizontal', 
    border: '1px solid gray',
    //fontWeight: 'bold',
    //fontSize: '28px',
    //height: '36px',
    //padding: '0px 200px 0px 0px',
    margin: '0px',
    textAlign: 'left',
};
var CENTERED_TITLE_STYLE = {
  fontSize: '16px',
  fontWeight: 'bold',
  stretch: 'horizontal',
  textAlign: 'center',
  margin: '4px'
};
var LEGEND_TITLE_STYLE = {
  fontSize: '16px',
  fontWeight: 'bold',
//  stretch: 'both',
//  padding: '16px',
};
var TOGGLE_BUTTON_STYLE = {
  textAlign: 'left',
  padding: '0px',
  margin: '0px',
  fontWeight: 'bold',
  backgroundColor: 'red'
};
var INFO_STYLE = {
    backgroundColor: 'FFFFAA',
    color: '000088',
    margin: '0px -32px 0px 0px',
    stretch: 'vertical'
};
var CLOSE_BUTTON_STYLE = {
    border: '0px', 
    textAlign: 'left', 
    width: '48px', 
    padding: '0px 24px 0px 0px', 
    margin: '-8px -8px -8px 192px',
    backgroundColor: 'FFFFAA'
};  
var WIDGET_INDENT = {
  padding: '0px 0px 0px 30px'
};
var BORDER_STYLE = {
  border: '1px solid darkgray'
};
//var LEGEND_PANEL_STYLE = {width: '200px'};
//legends.panelStyle(LEGEND_PANEL_STYLE);
//legends.titleStyle(LEGEND_TITLE_STYLE);
var NDII_VISPARAMS = {
  min: -1,
  max: 1,
  palette: images.Palettes['bluered']
};
var DOWNLOAD_AREA_ID = 'Download_Area';
app.title.style().set({
    fontSize: '24px', 
    color: 'darkgray',
    textAlign: 'center',
    stretch: 'horizontal'
  });
/*app.map.legends.title.style().set({
  fontSize: '18px',
  backgroundColor: 'FFFFFF55',
  fontWeight: 'bold',
  textAlign: 'center',
  stretch: 'horizontal'});*/
app.author = app.author.setUrl('https://www.centrogeo.org.mx/areas-profile/jsilvan/');
app.author.style().set({fontWeight: 'bold'});
app.intro.style().set({fontSize: '12px', stretch: 'horizontal'});
//AOI
app.control.aoi.centerOnMe.style().set({stretch: 'horizontal'});
app.control.aoi.asset.style().set({stretch: 'horizontal'});
app.control.aoi.property.style().set({stretch: 'horizontal'});
app.control.aoi.load.style().set({stretch: 'horizontal'});
app.control.aoi.layerOptions.style().set(WIDGET_INDENT);
app.control.aoi.toggle.style().set(WIDGET_STYLE);
app.control.aoi.panel.style().set(WIDGET_STYLE);
// index
app.control.index.filterTags.style().set({stretch: 'horizontal'});
app.control.index.selector.style().set({stretch: 'horizontal'});
app.control.index.panel.style().set(WIDGET_STYLE);
app.control.index.toggle.style().set(WIDGET_STYLE);
// composite
app.control.composite.collection.style().set({fontWeight: 'bold', textAlign: 'center',stretch: 'horizontal'});
app.control.composite.collections.style().set({stretch: 'horizontal'});
app.control.composite.scenesOptions.style().set(WIDGET_INDENT);
app.control.composite.timeSliceOptions.style().set(WIDGET_INDENT);
app.control.composite.dateSlider.style().set({stretch: 'horizontal'});
app.control.composite.period.style().set({stretch: 'horizontal'});
app.control.composite.refDate.style().set({stretch: 'horizontal'});
app.control.composite.reducer.style().set({stretch: 'horizontal'});
app.control.composite.startDate.style().set({
  stretch: 'horizontal',
  textAlign: 'left',
  fontSize: '11px',
  fontWeight: 'bold',
  padding: '0px',
  margin: '0px',
});
app.control.composite.endDate.style().set({
  stretch: 'horizontal',
  textAlign: 'right',
  fontSize: '11px',
  fontWeight: 'bold',
  padding: '0px',
  margin: '0px',  
});
app.control.composite.footprint.style().set({stretch: 'horizontal'});
app.control.composite.panel.style().set(WIDGET_STYLE);
app.control.composite.toggle.style().set(WIDGET_STYLE);
//operator
app.control.operator.rescale.style().set({stretch: 'horizontal'});
app.control.operator.rescaleMin.style().set({stretch: 'horizontal'});
app.control.operator.rescaleMax.style().set({stretch: 'horizontal'});
app.control.operator.selector.style().set({stretch: 'horizontal'});
app.control.operator.kernel.style().set({stretch: 'horizontal'});
app.control.operator.texture.style().set({stretch: 'horizontal'});
app.control.operator.textureOptions.style().set(WIDGET_INDENT);
app.control.operator.threshold.style().set({stretch: 'horizontal'});
app.control.operator.maskOptions.style().set(WIDGET_INDENT);
app.control.operator.vectorize.style().set({stretch: 'horizontal'});
app.control.operator.comparison.style().set({stretch: 'horizontal'});
app.control.operator.compareOptions.style().set(WIDGET_INDENT);
//app.control.operator.queryBar.style().set(WIDGET_INDENT);
app.control.operator.panel.style().set(WIDGET_STYLE);
app.control.operator.toggle.style().set(WIDGET_STYLE);
// explore - estilos
app.control.explore.inset.style().set({stretch: 'horizontal'});
app.control.explore.mapType.style().set({stretch: 'horizontal'});
app.control.explore.legends.style().set({stretch: 'horizontal'});
app.control.explore.duplicate.style().set({stretch: 'horizontal'});
app.control.explore.index.style().set({stretch: 'horizontal'});
app.control.explore.composite.style().set({stretch: 'horizontal'});
app.control.explore.index2.style().set({stretch: 'horizontal',shown: false});
app.control.explore.composite2.style().set({stretch: 'horizontal',shown: false});
app.control.explore.layersBar.setDisabled(2,true);
app.control.explore.layersBar.setDisabled(3,true);
app.control.explore.layersOptions.style().set({shown: false});
//app.control.explore.layersOptions.widgets().get(0).style().set({shown: true});
app.control.explore.legendsOptions.style().set(WIDGET_INDENT);
//app.control.explore.duplicateOptions.style().set(WIDGET_INDENT);
app.control.explore.panel.style().set(WIDGET_STYLE);
app.control.explore.toggle.style().set(WIDGET_STYLE);
app.control.operator.inspectorOptions.style().set(WIDGET_INDENT).set(BORDER_STYLE);
app.control.operator.statsOptions.style().set(WIDGET_INDENT).set(BORDER_STYLE);
app.control.operator.profileOptions.style().set(WIDGET_INDENT).set(BORDER_STYLE);
app.control.operator.keepMarker.style().set({stretch: 'horizontal'});
app.control.operator.keepLine.style().set({stretch: 'horizontal'});
app.control.operator.profile.style().set({stretch: 'horizontal'});
app.control.operator.keepPolygon.style().set({stretch: 'horizontal'});
app.control.operator.queryOptions.style().set({shown: false});
// download
app.control.download.index.style().set({stretch: 'horizontal'});
app.control.download.composite.style().set({stretch: 'horizontal'});
app.control.download.samples.style().set({stretch: 'horizontal'});
app.control.download.rows.style().set({stretch: 'horizontal'});
app.control.download.cols.style().set({stretch: 'horizontal'});
app.control.download.centerArea.style().set({stretch: 'horizontal'});
app.control.download.panel.style().set(WIDGET_STYLE);
app.control.download.toggle.style().set(WIDGET_STYLE);
app.control.panel.style().set({
  width: '350px', 
  margin: '0px 16px', 
  stretch: 'vertical'});
app.map.legends.frame.style().set({
  backgroundColor: 'ffffff44',
});
app.map.legends.index.config.style().set(BORDER_STYLE).set({shown: true});
app.map.legends.index2.config.style().set(BORDER_STYLE);
app.map.legends.composite.config.style().set(BORDER_STYLE);
app.map.legends.composite2.config.style().set(BORDER_STYLE);
app.map.legends.index2.style().set({shown: false});
app.map.legends.composite2.style().set({shown: false});
app.map.message.style().set({
  shown: false, 
  stretch: 'horizontal',
  position: 'bottom-center'
});
app.map.queryIcon.style().set({position: 'top-left'});
app.control.toggle.style()
  .set({position: 'bottom-left'});
app.map.main.setControlVisibility(true);
app.map.inset.setControlVisibility(false);
// liga los trazos para dos paneles
app.drawingTools.setLinked(true)
app.map.copy.drawingTools().setLinked(true);
/******************************************
 * Eventos 
********************************************/
/* Funciones Auxiliares
*/
// muestra el tiempo transcurrido desde t0 en segundos
var eTime = function(){
  var t = new Date();
  var et = t-t0;
  t0 = t;
  return et;
};
// define propiedad startsWith
if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        value: function(search, rawPos) {
            var pos = rawPos > 0 ? rawPos|0 : 0;
            return this.substring(pos, pos + search.length) === search;
        }
    });
}
// Función para formatear fecha a formato YYYY-mm-dd
function dateStr(datenum){
  var date = new Date(datenum);  
  var fill = ['','0'];
  return date.getFullYear().toFixed() + '-' +
    fill[(date.getMonth() < 9)*1] +
    (date.getMonth()+1).toFixed() + '-' + 
    fill[(date.getDate() < 9)*1] +
    date.getDate().toFixed();
}
// cambia la visibilidad de una lista de widgets
function setShown(widgets,value){
  for(var i = 0; i< widgets.length; i++)
    widgets[i].style().set({shown: true});
}
/*app.drawingTools.onLayerSelect(function(layer,dt){
  if(layer === null)
    return;
  var bounds = layer.toGeometry()
    .bounds()
  app.map.main.centerObject(bounds);
  });*/
app.drawingTools.onSelect(function(geom,layer,dt) {
  var names = app.data.selectable
    .map(function(elem){return elem.asset;});
  if(names.indexOf(layer.getName()) < 0)
    return;
  var infoField = app.control.aoi.property.getValue();
  var point = ee.Feature(
    ee.FeatureCollection(layer.getName())
      .filterBounds(geom.centroid(1)).first());
  var info = point.get(infoField);
  app.map.inspector.charts.clear();
  app.map.inspector.info.setValue('Retrieving value...');
  app.map.inspector.panel.style().set('shown', true);
  info.getInfo(function(info_str) {
    app.map.inspector.info.setValue(info_str);
  });
  app.map.inspector.panel.style().set({shown: true});
});
// Función para generar un nombre valido de geometrías
var validGeomName = function(string){
  var strings = string.split('/'); 
  return strings[strings.length-1] // ultimo nombre 
    .replace(/[^a-z0-9]/gi, ''); // elimina caracteres no alfanumericos
};
// carga una capa especificada
var loadLayer = function() {
  var assetName = app.control.aoi.asset.getValue();
  if(assetName.length === 0)
    return;
  var fc = ee.FeatureCollection(assetName);
  if(!fc)
   return;
  fc.geometry().geometries()
    .evaluate(function(geom){
    app.drawingTools.addLayer({
      geometries: geom,
      name: validGeomName(assetName),
      //locked: true,
    });
  });
  app.map.main.centerObject(fc);    
  ui.url.set('layer',true);  
  ui.url.set('asset',assetName);  
  // asigna el campo de consulta
  if(app.control.aoi.property.getValue()) {
    var propName = app.control.aoi.property.getValue();
    app.data.selectable[app.data.selectable.length] = {
      asset: assetName, 
      property: propName
    };
    ui.url.set('property',propName);
  }
};
// Crea lista indice-tags
var getIndexList = function(tag){
  var keys = app.data.indexList
    .map(function(key){
      return [key, images.SI[key].tags];
    }).filter(function(key){
    return key[1].indexOf(tag) >= 0; //key[1].includes(tag);
  });
  return keys.map(function(key){
    return images.SI[key[0]].name;
  }).sort();
};
var getIndexAcronym = function(name){
  return app.data.indexList[app.data.indexNameList.indexOf(name)];
};
// Genera lista de sensores para un índice dado
var getSensors = function(index) {  
  if(index === 'Count')
   return keys;
// extrae los nombres de las bandas en la expresion (incluye comillas)
  var indexBands = images.SI[index].expression
    .match(/'([^']*)'/g); 
  // Crea lista doble sensor-bandas
  var bands = app.data.sensorsList.map(function(key){
    return [key,images.SensorsList[key].bands];
  })
  // filtra sensores que incluyen todas las bandas requeridas
  .filter(function(elem){
    return indexBands.every(function(band){
      return elem[1].indexOf(band.slice(1,-1)) >= 0; // quita comoillas
    });
  });
  // returna lista de sensores
  return bands.map(function(sensor){
    return sensor[0];
  }).sort();
};
// control panel
app.map.legends.title.onChange(function(state,widget) {
    app.map.legends.panel.style().set('shown',state === 1);
  });
app.control.toggle.onChange(function(state,widget) {
 if (state === 1)
   ui.root.insert(0,app.control.panel);
 else
    ui.root.remove(app.control.panel);
 ui.url.set('tools',state === 1);
});
// aoi
// Carga una capa vectorial desde la cuenta del usuario
app.control.aoi.load.onClick(loadLayer);
app.control.aoi.centerOnMe.onClick(
  function(widget) {
    ui.util.getCurrentPosition(
      function(loc){
        app.map.main.centerObject(loc);
      }, 
      function(msg){
        app.map.main.setCenter(app.data.option.location);
      }
    );
  });
app.control.aoi.layer.onChange(
  function(newValue){
    app.control.aoi.layerOptions.style().set({shown: newValue});
    app.control.operator.queryBar.setSelected(0);
  });
// index
app.control.index.filterTags.onChange(
  function(tag){
  print(eTime() + ': selecting index...');
  var newVal;
  var newList = getIndexList(tag);
  var curVal = app.control.index.selector.getValue();
  app.control.index.selector.setValue(null,false);
  app.control.index.selector.items().reset(newList);
  // Actualiza la selección
  app.control.index.selector.setValue(null,false);
  if(!curVal)
    newVal = images.SI[app.data.option.index].name;
  else
    newVal = curVal;  
  if(newList.indexOf(newVal) < 0) 
    newVal = newList[0];
  // desencadena seleccion de indice
  app.control.index.selector.setValue(newVal);
});
// actualiza la colección
function updateSensor(indexName){
  var index = getIndexAcronym(indexName);
  print(eTime() + ': selecting collection...');
  if(app.data.option.ivisParams) {
    app.data.layer.index.visParams = app.data.option.ivisParams;
    app.data.option.ivisParams = null;
  } else {
    app.data.layer.index.visParams = images.SI[index].visParams; // define vis params
    app.data.layer.index.visParams.bands = [0]; // se asegura que la banda esta definida
  }
  //app.control.operator.rescaleMin.setValue(app.data.layer.index.visParams.min);
  //app.control.operator.rescaleMax.setValue(app.data.layer.index.visParams.max);
  var newVal;
  var curVal = app.control.composite.collections.getValue();
  // actualiza información del índice
  app.control.index.name.setValue(images.SI[index].name + ' (' +index+')');
  app.control.index.descr.setValue(images.SI[index].notes + '\n See: \n' + images.SI[index].reference);
  // borra colección seleccionada para forzar llaamada de evento de cambio
  app.control.composite.collections.setValue(null,false);
  // actualiza el listado de sensores
  var newList = getSensors(index);
  app.control.composite.collections.items().reset(newList); 
  app.control.composite.collCount.setValue(newList.length);
  if (newList.length === 0) {
    // en caso de que un índice no tenga colecciones
    app.map.message.style().set({shown: true});
    app.map.message.widgets().reset([
        ui.Label('No available collections for selected Index!')
        ]);
    return;
  }
  // oculta el mensaje de mapa de alguna llamada previa
  app.map.message.style().set({shown: false});
  // determina el nuevo valor en el siguiente orden:
  // 1- valor por default
  // 2- selección previa
  // 3. primero de la lista
  if(app.data.option.collection) 
    newVal = app.data.option.collection; 
  else
    newVal = curVal;
  // si la selección no está en la lista
  if (newList.indexOf(newVal) < 0) 
    newVal = newList[0]; // selecciona la primera opción
  app.control.composite.collections.setValue(newVal);
  // el valor por default sólo se usa una vez
  app.data.option.collection = null;   
}
app.control.composite.footprint.onClick(
  function(widget){
    var bounds = ee.Geometry.Rectangle(app.map.bounds);
    var geoms = images.Geometries(app.data.layer.composite.collection,bounds);
    geoms.evaluate(function(geometries) {
      var layerName = app.control.composite.collections.getValue() + ' footprint';
      app.drawingTools.addLayer({
        geometries: geometries,
        name: validGeomName(layerName),
      });
    });
  });
app.control.index.selector.onChange(updateSensor);
// actualiza el índice
var updateIndex = function(index,texture,compare){
  var min, max;
  // actualiza la capa de indice
  print(eTime() + ': updating index...');
  app.data.layer.index.image = app.data.layer.composite.image
      .expression(images.SI[index].expression)
      .rename(index);
  app.data.layer.index.scale = app.data.layer.index.image.projection().nominalScale();
  var scale = app.map.scale.max(app.data.layer.index.scale);
  app.data.layer.index.name = images.SI[index].name;
  // aplica filtro de textura
  if(texture){
    print(eTime() + ': computing spatial operator...');
    var selection = app.control.operator.selector.getValue();
    var band = images.SF[selection].band;
    var radius = (app.control.operator.kernel.getValue()-1)/2;
    index = index + '_' + selection;
    if(app.control.operator.rescale.getValue()){
      min = app.control.operator.rescaleMin.getValue()*1;
      max = app.control.operator.rescaleMax.getValue()*1;      
    } else {
      min = 0.0;
      max = 255.0;
    }
    var img = app.data.layer.index.image;
    app.data.layer.index.name = app.data.layer.index.name + ' ' + selection;
    app.data.layer.index.image = images.SF[selection]
        .feature(img,{min: min,max: max},radius,band,app.map.scale)
        .rename(index);
        //.setDefaultProjection('EPSG:3857',null,scale); // WGS 84 / Pseudo-Mercator -- Spherical Mercator
        //.reproject('EPSG:3857',null,scale);
  }
  // aplica normalización
  if(compare) {
    print(eTime() + ': comaparing two indices...');
    var comparison = app.control.operator.comparison.getValue();
    var right = app.map.split
        .getSecondPanel()
        .layers()
        .get(1)
        .getEeObject();
    app.data.layer.index.name = images.Comparisons[comparison].shortName + 
      " of " + app.data.layer.index.name;
    index = images.Comparisons[comparison].shortName + '_' + index;
    app.data.layer.index.image = images.Comparisons[comparison]
      .compare(app.data.layer.index.image,right,scale)
      .rename(index);
  }
  // actualiza opciones de visualización
  app.data.layer.index.visParams.bands = [index];
  /*app.data.layer.index.image.sample({
    region: ee.Geometry.Rectangle(app.map.bounds), 
    scale: scale, 
    numPixels: app.data.maxStatsPoints,
    }).reduceColumns(ee.Reducer.percentile([2,98]),[index])
    .evaluate(function(perc){ 
      app.data.layer.index.visParams.min = perc['p2'];
      app.data.layer.index.visParams.max = perc['p98'];
      }); */
};
// update texture
function updateTexture(){
    var texture = app.control.operator.texture.getValue();
    var selection = app.control.operator.selector.getValue();
    var index = getIndexAcronym(app.control.index.selector.getValue());
    var compare = app.control.operator.compare.getValue();
    if(texture) {
      //app.data.layer.index.visParams = images.SF[selection].visParams;
      app.control.operator.timeseries.setValue(false).setDisabled(true);
      app.control.operator.timeseries2.setValue(false).setDisabled(true);    
    } else {
      //app.data.layer.index.visParams = images.SI[index].visParams;
      app.control.operator.timeseries.setDisabled(false);
      app.control.operator.timeseries2.setDisabled(false);
    }  
    updateIndex(index,texture,compare);
    updateThrSlider();
    // actualizar la legenda con retraso
}
// operators
app.control.operator.texture.onChange(
  function(value){
    app.control.operator.textureOptions.style().set({shown: value});
    updateTexture();
});
app.control.operator.selector.onChange(
  function(value){
    var selection = app.control.operator.selector.getValue();
    var index = getIndexAcronym(app.control.index.selector.getValue());
    app.control.operator.rescale.setValue(index !== 'DSM' & index !== 'DTM' ,false);
    app.control.operator.name.setValue(images.SF[selection].name);
    app.control.operator.descr.setValue(images.SF[selection].notes + 
      ' See: ' + images.SF[selection].reference);
    if(!app.control.operator.texture.getValue())
      return;
    updateTexture();
  });
app.control.operator.kernel.onChange(updateTexture);
app.control.operator.rescale.onChange(updateTexture);
app.control.operator.vectorize.onClick(
  function(button){
    var region = ee.Geometry.Rectangle(app.map.bounds);
        //print('map & layer scale: ',app.map.scale,app.data.layer.index.scale)
    var scale = app.map.scale.max(app.data.layer.index.scale);
    var contour = app.data.layer.index.masked
      .mask() // mascara
      .selfMask()
      .rename('mask')
      .toInt()
      // crea polygonos
      .reduceToVectors({
        geometry: region,
        scale: scale,
        maxPixels: images.maxPixels,
        geometryType: 'polygon',
        bestEffort: true,
        crs: app.data.defaultProj, 
      }) 
      .geometry()
      //if(app.control.operator.contourType.getSelected() === 1)
      //  contour = ee.Geometry.MultiLineString(contour.coordinates());
      // agrega al mapa asíncronamente
      .evaluate(function(geometry){
        app.drawingTools.addLayer({
        geometries: [geometry],
        name: app.data.contourName + app.data.contours++,
        //color: 'black',
      });
    })
  });
// actualiza el compuesto
var updateComposite = function(sensorID,range){
  // actualiza la capa del compuesto
  print(eTime() + ': updating composite...');
  app.data.layer.composite.start = range.start().format('dd/MMM/yyyy').getInfo();
  app.data.layer.composite.end = range.end().format('dd/MMM/yyyy').getInfo();
  app.data.layer.composite.range = range;
  app.data.layer.composite.name = sensorID + ' ' +
    app.data.layer.composite.start.replace(/\//gi,'') + ' to '+
    app.data.layer.composite.end.replace(/\//gi,'');
  app.data.layer.composite.collection = images.SensorsList[sensorID].collection
    .filterDate(range.start(), range.end());
  var reducer = app.data.colReducers[app.control.composite.reducer.getValue()];
  app.data.layer.composite.image = ee.Image(ee.Algorithms.If(
    app.control.composite.cloudMask.getValue(),
    images.MakeCompositeWithCM(app.data.layer.composite.collection,sensorID,reducer),
    images.MakeComposite(app.data.layer.composite.collection,sensorID,reducer)
    ));
  /*
  if(app.control.composite.cloudMask.getValue())
    app.data.layer.composite.image = images.MakeCompositeWithCM(
      app.data.layer.composite.collection,sensorID,reducer);
  else
    app.data.layer.composite.image = images.MakeComposite(
      app.data.layer.composite.collection,sensorID,reducer);
  */
  app.data.layer.composite.bands = app.data.layer.composite.image.bandNames(); //images.SensorsList[sensorID].bands;
  return app.data.layer.composite.collection.size(); // number of images in collection
};
// actualiza capas del mapa
var updateLayers = function(range) {
  // se asegura que cuenta con los valores actuales de rango
  var daterange = app.control.composite.dateSlider.getValue();
  range = ee.DateRange(daterange[0],daterange[1]);
  print(eTime() + ': processing layers...');
  app.map.main.layers().reset([]);
  // determina la visibilidad actual de las capas
  var sensorID = app.control.composite.collections.getValue();
  var index = getIndexAcronym(app.control.index.selector.getValue());
  var texture = app.control.operator.texture.getValue();
  var compare = app.control.operator.compare.getValue();
  // actualiza variables de las capas
  app.data.count = updateComposite(sensorID,range);  
  app.control.composite.count.setValue('Global scenes in selected period: updating...');
  app.control.operator.thresholdPanel.widgets().reset([
      ui.Label('Threshold: updating...')
    ]);
  app.map.message.style().set({shown: true});
  app.map.message.widgets().reset([ui.Label('Updating image layers...')]);
  // actualiza asincronamente
  app.data.count.gt(0).evaluate(function(val){
    if (!val) { 
      app.map.message.widgets().reset([ui.Label('No images in selected period!')]);
      // limpia las capas
      if(app.control.operator.toggle.value)
        app.control.operator.toggle.click();
      app.control.operator.toggle.setDisabled(true);
      // cierra y deshabilita las opcines de indices
      if(app.control.explore.toggle.value)
        app.control.explore.toggle.click();
      app.control.explore.toggle.setDisabled(true);
      if(app.control.download.toggle.value)
        app.control.download.toggle.click();
      app.control.download.toggle.setDisabled(true);
      app.control.composite.footprint.setDisabled(true);
    } else {
    // habilita opciones de operaciones subsecuentes
      app.control.operator.toggle.setDisabled(false);
      app.control.explore.toggle.setDisabled(false);
      app.control.download.toggle.setDisabled(false);
      app.control.composite.footprint.setDisabled(false);
    // habililta grafica de firma
      var spectrum = images.SensorsList[sensorID].wavelengths.length > 1;  
      var value = app.control.operator.spectrum.getValue();
      app.control.operator.spectrum
        .setValue(value & spectrum)
        .setDisabled(!spectrum);
    // actualiza compuesto
      app.map.layer.composite = ui.Map.Layer({
        eeObject: app.data.layer.composite.image,
        visParams: app.data.layer.composite.visParams,
        name: app.data.layer.composite.name,
        opacity: app.data.option.copacity,
        shown: app.control.explore.composite.getValue(),
      });
      app.map.main.layers().set(0,app.map.layer.composite);
      updateIndex(index,texture,compare);
      updateThrSlider(); // actualiza umbrales
      updateScaleSlider();      
      app.map.message.style().set({shown: false});
    }
  });
  app.data.count.evaluate(function(val){
    app.control.composite.count.setValue('Global scenes in selected period: '+ val);
    app.data.count = val;
  });
};
// ajusta un rango de fechas para que
function dateRangeShift(range,refDate,period){
  var ref = refDate.millis();
  var start = ee.Number(range.get(0))
    .subtract(ref)
    .divide(period)
    .floor()
    .multiply(period)
    .add(ref);
  var end = ee.Number(range.get(1))
    .subtract(ref)
    .divide(period)
    .floor()
    .add(1)
    .multiply(period)
    .add(ref);    
  return ee.List([start, end]);
}
// actualiza el selector de fecha del compuesto
var updateDateSlider = function(sensorID) {
  var newVal;
  // asegura que se tiene la última selección
  sensorID = app.control.composite.collections.getValue();
  if(!sensorID) {
    app.control.composite.datePanel.style().set('shown',false);
    return;
  }
  // define parametros de visualización del compuesto
  if(app.data.option.cvisParams) {
    app.data.layer.composite.visParams = app.data.option.cvisParams;
    app.data.option.cvisParams = null;
  } else
   app.data.layer.composite.visParams = images.SensorsList[sensorID].visParams;
  print(eTime() + ': selecting date...');
  var period = app.control.composite.period.getValue();
  var period_ms = period * 24 * 3600 * 1000; 
  // actualiza la descripción del sensor
  //app.control.composite.collection.setValue(images.SensorsList[sensorID].description);
  var range = ee.List(images.SensorsList[sensorID].collection.get('date_range'));
  var refDate = ee.Date(app.control.composite.refDate.getValue());
  range = dateRangeShift(range,refDate,period_ms);
  // muestra el panel de fecha
  app.control.composite.datePanel.style().set('shown',true);
  // muestra/oculta opción de enmascaramiento de nubes
  var cloudMask = images.SensorsList[sensorID].qualityBand.length > 0;
  if(!cloudMask)
    app.control.composite.cloudMask.setValue(false);
  app.control.composite.cloudMask
      .style().set('shown',cloudMask);
  // determina la nueva fecha seleccionada usando uno de los siguientes:
  // 1- valor de default
  // 2- selección previa
  // 3- fecha más reciente disponible en el rango
  if(app.data.option.date)
    newVal = app.data.option.date;
  else {
    newVal =  app.control.composite.dateSlider.getValue();
    if(newVal)
      newVal = (newVal[0]+newVal[1])/2; // valor medio del rango
  }
    // temporary change app.control.composite.datePanel
  //app.control.composite.datePanel.widgets()
  //    .reset([app.control.composite.dateLabel,ui.Label('Updating periods...')]);
  app.control.composite.count.setValue('Images in period: updating...');
  var start = ee.Date(range.get(0));
  var end = ee.Date(range.get(1));
  var dateRange = ee.DateRange(start, end);  
  // Asynchronously compute the date range and show the slider.
  dateRange.evaluate(function(dateRangeHere) {
      if(!newVal) {
        newVal = (dateRangeHere.dates[0]+dateRangeHere.dates[1])/2;
      } else {
      // se asegura que quede dentro del rango
        newVal = Math.max(Math.min(newVal,dateRangeHere.dates[1]),dateRangeHere.dates[0]);
      }
      // crea un nuevo selector de fecha nuevamente 
      app.control.composite.dateSlider = ui.DateSlider({
        start: dateRangeHere.dates[0],
        end: dateRangeHere.dates[1],
        period: period,
        onChange: ui.util.debounce(updateLayers,1000),
        style: {stretch: 'horizontal'},
      });
      // registr una llamada a evento para actualizar el url al cambiar
      // la selección de fecha
      app.control.composite.dateSlider.onChange(function(newValue){
        newValue.start().millis()
          .getInfo(function(start){
            ui.url.set('date',start);
          });
      });
      // pone el selector de vuelta en el panel
      app.control.composite.datePanel.widgets()
        .reset([
          app.control.composite.dateLabel,
          app.control.composite.dateSlider]);
      // aculta el mensaje
      app.map.message.style().set({shown: false});
      app.data.option.date = null; // solo se usa una vez
      // actualiza la fecha seleccionada y llama la actualización de las capas
      app.control.composite.dateSlider.setValue(newVal,false);
      ui.url.set('date',newVal);
      updateLayers(); // asegura la llamada la primera vez
     });
};
app.control.composite.refDate.onChange(
  function(text,widget){
    var valid = text.match(/((?:19|20)[0-9][0-9])-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])/g) !== null;
    if(!valid)
      app.control.composite.refDate.setValue(dateStr(app.data.option.refDate),false);
    updateDateSlider();
    app.data.option.refDate = ee.Date(app.control.composite.refDate.get(Value)).millis();
    ui.url.set('refDate', app.data.option.refDate);
 });
app.control.composite.collections.onChange(updateDateSlider);
app.control.composite.period.onChange(updateDateSlider);
app.control.composite.cloudMask.onChange(updateLayers);
app.control.composite.reducer.onChange(updateLayers);
// actualiza el histograma de la colección
var updateColHist = function (){
  //if(!app.control.composite.scenes.getValue())
  if(app.control.composite.optionsBar.getSelected() !== 1)
    return;    
  print(eTime() + ': updating histogram...');
  var sensorID = app.control.composite.collections.getValue();
  var period = app.control.composite.period.getValue();
  var period_ms = period * 24 * 3600 * 1000; 
  var range = ee.List(images.SensorsList[sensorID].collection.get('date_range'));
  //var refDate = ee.Date(app.data.option.refDate);
  var refDate = ee.Date(app.control.composite.refDate.getValue());
  range = dateRangeShift(range,refDate,period_ms);  
  var start = ee.Number(range.get(0));
  var end = ee.Number(range.get(1));
  var bounds = ee.Geometry.Rectangle(app.map.bounds);
  var steps = end
    .subtract(start)
    .divide(period_ms)
    .ceil()
  // update end
  var max = steps.multiply(period_ms).add(start);
  app.data.option.colHistChart.hAxis.viewWindow.min = start;
  app.data.option.colHistChart.hAxis.viewWindow.max = max;
  var time = ee.Array(images.SensorsList[sensorID].collection
    .filterBounds(bounds)
    .aggregate_array('system:time_start')
    .reduce(ee.Reducer.fixedHistogram(start,max,steps)));
  var xLabels = time
      .slice(1,0,1)
      .toList()
      .flatten()
      .map(function(t){
        return ee.Date(ee.Number(t).add(period_ms/2)).format(app.data.dateFormat);
        });
    var hist = ui.Chart.array.values({
        array: time.slice(1,1),
        axis: 0,
        xLabels: xLabels,
      })
    .setChartType('ColumnChart')
    .setOptions(app.data.option.colHistChart);
    ee.Date(start).format(app.data.dateFormat).getInfo(function(startDate){
      app.control.composite.startDate.setValue(startDate); 
      });
    ee.Date(end).format(app.data.dateFormat).getInfo(function(endDate){
      app.control.composite.endDate.setValue(endDate);
      });
    app.control.composite.scenesOptions
      .widgets()
      .set(3,hist);
    hist.onClick(setDate);
};
app.control.composite.optionsBar.onClick(function(sel,desel,radio){
  if(sel === 0) {
    app.control.composite.timeSliceOptions.style().set({shown: true});
    app.control.composite.scenesOptions.style().set({shown: false});    
  } else if(sel === 1) {
    app.control.composite.timeSliceOptions.style().set({shown: false});
    app.control.composite.scenesOptions.style().set({shown: true});  
  }
  updateColHist();
});
//app.control.composite.timeSlice.onChange(function(value,widget){
//  app.control.composite.timeSliceOptions.style().set({shown: value});
//  updateColHist();
//});
app.control.composite.period.onChange(updateColHist);
//app.control.composite.scenes.onChange(function(value){
//  app.control.composite.scenesOptions.style().set({shown: value});
//  updateColHist();
//});
// actualiza la capa de indice
var updateIndexLayer = function(withLegend){
  print(eTime() + ': updating index layer...');
  var masked = app.control.operator.mask.getValue();
  if(masked)
    app.map.layer.index = ui.Map.Layer({
      eeObject: app.data.layer.index.masked, 
      visParams: app.data.layer.index.visParams, 
      name: app.data.layer.index.name, 
      shown: app.control.explore.index.getValue(), 
      opacity: app.data.option.iopacity,
      });
  else
    app.map.layer.index = ui.Map.Layer({
      eeObject: app.data.layer.index.image, 
      visParams: app.data.layer.index.visParams, 
      name: app.data.layer.index.name, 
      shown: app.control.explore.index.getValue(), 
      opacity: app.data.option.iopacity,
      });  
  app.map.main.layers().set(1,app.map.layer.index);
  // update legend
  if(withLegend) {
    ui.util.setTimeout(function(){
      updateLegends(true);
    },app.data.startUpDelayStep);
  }
};
// operators
var showValue = function(point,point_gl,drawingTools){
  var shape = drawingTools.getShape();
  drawingTools.unlisten(); // deja de escuchar eventos hasta que termine la consulta
  drawingTools.setSelected(null);
  if(point.length === 0) {
    drawingTools.layers().remove(point_gl);    
    return;
  }
  var color = point_gl.getColor();
  var scale = app.map.scale.max(app.data.layer.index.scale);
  var aoi = ee.Geometry.Rectangle(app.map.bounds);
  var index = getIndexAcronym(app.control.index.selector.getValue());
  var indexBand = app.data.layer.index.visParams.bands[0]; // puede incluir textura o comparacion
  var sensorID = app.control.composite.collections.getValue();
  app.map.inspector.info.setValue('Retrieving value...');
  app.map.inspector.panel.style().set('shown', true);
  app.map.message.widgets().reset([ui.Label('Please wait...')]);   
  // Extrae valore de la capa de indice
  app.data.layer.index.image.reduceRegion({
    reducer: ee.Reducer.first(), 
    geometry: point,
    crs: app.data.defaultProj, 
    scale: scale
  }).evaluate(function(value) {
    // muestra la información
        var coords = point.coordinates().getInfo();
        //var scaleStr = scale.format('%.0f').getInfo();
        var infoStr = sensorID + '\n' +
          'Period: ' + app.data.layer.composite.start + '-' + app.data.layer.composite.end + '\n' +
          indexBand + ' value: ' + value[indexBand] + '\n' +
          point_gl.getName() + '\n' + 
          'Lon:' + coords[0].toFixed(8) + ' deg,\n' +
          'Lat: ' + coords[1].toFixed(8) + ' deg,\n' +
          'Scale: ' + scale.getInfo().toFixed(1) + ' meters';
        app.map.inspector.info.setValue(infoStr);
      // mantiene o borra el marcador
      if(!app.control.operator.keepMarker.getValue()) 
        drawingTools.layers().remove(point_gl);
      else
        ++app.data.points;
      startQuery(shape);
    });
  // procesa las gráficas
  app.map.inspector.charts.clear();
  if (app.control.operator.spectrum.getValue()) {
    // firma espectral del índice
    var wavelengths = images.SensorsList[sensorID].wavelengths;
    app.data.option.specChart.title = sensorID + ' Spectral Signature';
    app.data.option.specChart.hAxis.title = images.SensorsList[sensorID].wavelengthUnits;
    app.data.option.specChart.series[0].labelInLegend = point_gl.getName();
    var composite = app.data.layer.composite.image
      .select(images.SensorsList[sensorID].bands); // sin count
    var reflectance = ee.Dictionary(composite
      .reduceRegion({
        reducer: ee.Reducer.first(), 
        geometry: point,
        crs: app.data.defaultProj, 
        scale: scale
      })
    ).values(images.SensorsList[sensorID].bands);
    reflectance = reflectance.sort(wavelengths)
    wavelengths = wavelengths.sort();
    app.data.option.specChart.hAxis.viewWindow.min = wavelengths[0];
    app.data.option.specChart.hAxis.viewWindow.max = wavelengths[wavelengths.length-1];
    var specChart = ui.Chart.array.values(reflectance,0,wavelengths)
      .setChartType('LineChart') // BarChart,ColumnChart,ScatterChart,LineChart
      .setOptions(app.data.option.specChart);
    app.map.inspector.charts.add(specChart);  
  }    
  if (app.control.operator.timeseries.getValue()) {
    // serie de tiempo
    app.data.option.timeSeriesChart.title = sensorID + '-' + index + ' Time Series';
    app.data.option.timeSeriesChart.vAxis.title = index;
    app.data.option.timeSeriesChart.series[0].labelInLegend = point_gl.getName();
    var bandNames = images.SensorsList[sensorID].bands;
    var count = ee.List(bandNames).size().getInfo();
    var bands = ee.List.sequence(0,count-1);
    var period = app.control.composite.period.getValue();
    var refDate = app.control.composite.refDate.getValue();
    var reducer = app.data.colReducers[app.control.composite.reducer.getValue()];
    var col = images.SensorsList[sensorID].collection.filterBounds(point);    
    // crea la serie de tiempo de indices
    /*var collection  = ee.ImageCollection(ee.Algorithms.If(period > 1,
      images.mapIndexes(col,sensorID,reducer,period,'day',refDate,index),
      images.mapIndex(col,sensorID,index)
    ));
    var seriesChart = ui.Chart.image.series(collection, point, ee.Reducer.first(), scale)
  */  
    // Method que requiere menos memoria, pero mas tiempo
    var collection = images.mapIndex(col,sensorID,index);
    var data = images.groupedSeries(collection,reducer,point,scale,period,'day',refDate,index);
    var xLabels = ee.Array(data)
      .slice(1,0,1)
      .toList()
      .flatten()
      .map(function(t){
        return ee.Date(t).format(app.data.dateFormat);
        });
    var seriesChart = ui.Chart.array.values({
      array: ee.Array(data).slice(1,1),
      axis: 0,
      xLabels: xLabels
    })
    .setOptions(app.data.option.timeSeriesChart);
    seriesChart.onClick(setDate);
    app.map.inspector.charts.add(seriesChart);  
  }
  if (app.control.operator.flowline.getValue()){
      terrain.setDEM(app.data.layer.index.image); // usa el indice como MDE
      var scale2 = scale * 1.5;
      var line = terrain.FlowLine(point,app.data.maxflowLinePoints,scale2)
        .evaluate(function(geometry){
          if(geometry !== undefined)
            app.drawingTools.addLayer({
              geometries: [geometry],
              name: app.data.flowlineName + app.data.flowlines++,
              color: color,
            })
        })
    }
  if (app.control.operator.catchment.getValue()){
      terrain.setDEM(app.data.layer.index.image); // usa el indice como MDE
      var carea = terrain.Catchment(point,app.data.maxCatchAreaIter)
        .reproject('EPSG:3857',null,scale) // WGS 84 / Pseudo-Mercator -- Spherical Mercator
        .addBands([app.data.layer.index.image])
        .reduceToVectors({
          reducer: ee.Reducer.first(),
          geometry: aoi, 
          geometryType: 'polygon', 
          labelProperty: 'value',
          bestEffort: true
        }).geometry(scale)
        .evaluate(function(geometry){
          app.drawingTools.addLayer({
            geometries: [geometry],
            name: app.data.catchmentName + app.data.catchments++,
            color: color,
          });
        });
    }    
};
// line query
var plotProfile = function(line,line_gl,drawingTools){
  var shape = drawingTools.getShape();
  drawingTools.unlisten();
  drawingTools.setSelected(null);
  if(line.length === 0) {
    if(!app.control.operator.keepLine.getValue()) 
      drawingTools.layers().remove(line_gl);    
    return;
  }
  app.map.inspector.info.setValue('Computing statistics...');
  app.map.inspector.panel.style().set('shown', true);
  app.map.message.widgets().reset([ui.Label('Please wait...')]);   
  var index = app.data.layer.index.visParams.bands[0];
  var sensorID = app.control.composite.collections.getValue();
  var scale = app.map.scale.max(app.data.layer.index.scale);
  //var scaleStr = scale.format('%.0f').getInfo();
  var statsReducer = ee.Reducer.minMax()
    .combine(ee.Reducer.mean(),"",true)
    .combine(ee.Reducer.stdDev(),"",true)
    .combine(ee.Reducer.sum(),"",true)
    .combine(ee.Reducer.count(),"",true)
    .combine(ee.Reducer.toList(),"",true); // datos para histograma
  // calcula estadisticas
  var dict = app.data.layer.index.image
    .reduceRegion({
      reducer: statsReducer, 
      geometry: line, 
      scale: scale,
      bestEffort: true, 
      crs: app.data.defaultProj,
      maxPixels: images.maxPixels, 
    });
    dict.remove([index + '_list'])
      .evaluate(function(stats) {
        var infoStr = sensorID + '\n' +
          'Period: ' + app.data.layer.composite.start + '-' + app.data.layer.composite.end + '\n' +
          index + ' ' + line_gl.getName() + '\n' +
         'min:\t' + stats[index + '_min'].toFixed(4) + ',\t' +
          'max:  ' + stats[index + '_max'].toFixed(4) + ',\n' +
          'mean:\t' + stats[index + '_mean'].toFixed(4) + ',\t' +
          'std:  ' + stats[index + '_stdDev'].toFixed(4) + ',\n' +
          'sum:\t' + stats[index + '_sum'].toFixed(2) + ',\t' +
          'count: ' + stats[index + '_count'].toFixed(0) + ',\n' +      
          'scale: ' + scale.getInfo().toFixed(1) + ' meters\n' +
          'length: ' + (line.length().getInfo()/1e3).toFixed(5) + ' kilometers\n';
        app.map.inspector.info.setValue(infoStr);
          // reinicia trazo
        if(!app.control.operator.keepLine.getValue()) 
          drawingTools.layers().remove(line_gl);
        else
          ++app.data.profiles;
        startQuery(shape);
      });
  app.map.inspector.charts.clear();
  if(app.control.operator.profile.getValue()) {
    terrain.setDEM(app.data.layer.index.image);
/*    var infoStr = sensorID + '\n' +
      'Period: ' + app.data.layer.composite.start + '-' + app.data.layer.composite.end + '\n' +
      index + ' ' + line_gl.getName() + '\n' +
      'Length: ' + (line.length().getInfo()/1e3).toFixed(6) + ' kilometers\n';*/
    app.data.option.profileChart.title = sensorID + '-' + index + ' profile';
    app.data.option.profileChart.vAxis.title = index;
    app.data.option.profileChart.series[0].labelInLegend = line_gl.getName();
    var profile = terrain.ProfilePlot(line,app.data.maxProfilePoints)
      .setOptions(app.data.option.profileChart)
      .setChartType('AreaChart');
    app.map.inspector.charts.add(profile);
  }
};
// area query
var showStats = function(polygon,polygon_gl,drawingTools){
  var shape = drawingTools.getShape();
  drawingTools.unlisten();
  drawingTools.setSelected(null);
  if(polygon.length === 0) {
    //if(!app.control.operator.keepPolygon.getValue())
    app.control.operator.keepPolygon.setValue(false);
    drawingTools.layers().remove(polygon_gl);    
    return;
  }
  app.map.inspector.info.setValue('Computing statistics...');
  app.map.inspector.panel.style().set('shown', true);
  app.map.message.widgets().reset([ui.Label('Please wait...')]);   
  var index = app.data.layer.index.visParams.bands[0];
  var sensorID = app.control.composite.collections.getValue();
  var scale = app.map.scale.max(app.data.layer.index.scale);
  //var scaleStr = scale.format('%.0f').getInfo();
  var statsReducer = ee.Reducer.minMax()
    .combine(ee.Reducer.mean(),"",true)
    .combine(ee.Reducer.stdDev(),"",true)
    .combine(ee.Reducer.sum(),"",true)
    .combine(ee.Reducer.count(),"",true)
    .combine(ee.Reducer.toList(),"",true); // datos para histograma
  // calcula estadisticas
  var dict = app.data.layer.index.image
    .reduceRegion({
      reducer: statsReducer, 
      geometry: polygon, 
      scale: scale,
      bestEffort: true, 
      crs: app.data.defaultProj,
      maxPixels: images.maxPixels, 
    });
    dict.remove([index + '_list'])
      .evaluate(function(stats) {
        var infoStr = sensorID + '\n' +
          'Period: ' + app.data.layer.composite.start + '-' + app.data.layer.composite.end + '\n' +
          index + ' ' + polygon_gl.getName() + '\n' +
         'min:\t' + stats[index + '_min'].toFixed(4) + ',\t' +
          'max:  ' + stats[index + '_max'].toFixed(4) + ',\n' +
          'mean:\t' + stats[index + '_mean'].toFixed(4) + ',\t' +
          'std:  ' + stats[index + '_stdDev'].toFixed(4) + ',\n' +
          'sum:\t' + stats[index + '_sum'].toFixed(2) + ',\t' +
          'count: ' + stats[index + '_count'].toFixed(0) + ',\n' +      
          'scale: ' + scale.getInfo().toFixed(1) + ' meters\n' +
          'area: ' + (stats[index + '_count']*scale/1e4).toFixed(2) + ' hectares\n';
        app.map.inspector.info.setValue(infoStr);
        // reinicia trazo
        if(!app.control.operator.keepPolygon.getValue()) 
          drawingTools.layers().remove(polygon_gl);
        else
          ++app.data.areas;
        startQuery(shape);  
      });
  app.map.inspector.charts.clear();
   // agrega el histograma
  var min = Number(app.control.operator.rescaleMin.getValue());
  var max = Number(app.control.operator.rescaleMax.getValue());
  if(app.control.operator.histogram.getValue()) {
    app.data.option.histChart.title = sensorID +'-' + index + ' Histogram';
    app.data.option.histChart.series[0].labelInLegend = polygon_gl.getName();
    app.data.option.histChart.hAxis.title = index;
    app.data.option.histChart.hAxis.viewWindow.min = min;
    app.data.option.histChart.hAxis.viewWindow.max = max;
    // calcula histograma de ancho fijo
  var data = ee.Array(ee.List(dict.get(index + '_list'))
      .reduce(ee.Reducer.fixedHistogram(min,max,app.data.maxHistogramBuckets)));
    var hist = ui.Chart.array.values({
        array: data.slice(1,1),
        axis: 0,
        xLabels: data.slice(1,0,1),
      })
    .setChartType('ColumnChart')
    .setOptions(app.data.option.histChart);
/*   // histograma ligado
    var histogram = ui.Chart.image.histogram( {
      image: app.data.layer.index.image, 
      region: polygon, 
      scale: scale, 
      maxBuckets: app.data.maxHistogramBuckets, 
    }).setOptions(app.data.option.histChart);*/
    app.map.inspector.charts.add(hist);
  }
  // agrega el scatterplot
  if(app.control.operator.scatterplot.getValue()) {
    var right = app.map.layer.index2.getEeObject();    
    var visParams_right = app.map.layer.index2.getVisParams();
    var visParams_left = app.data.layer.index.visParams;
    var yLabel = index + '_left';  
    var xLabel = right.bandNames().get(0).getInfo() + '_right';  
     var pixelVals = app.data.layer.index.image
      .addBands(right)
      .select([0,1],[yLabel,xLabel])
      .sample({
        region: polygon, 
        scale: scale, 
        projection: app.data.defaultProj,
        numPixels: app.data.maxScatterPoints, 
      });
    var xValues = pixelVals.aggregate_array(xLabel);
    var yValues = pixelVals.aggregate_array(yLabel);
    app.data.option.scatterplot.hAxis.title = xLabel;
    app.data.option.scatterplot.vAxis.title = yLabel;
    app.data.option.scatterplot.series[0].labelInLegend = polygon_gl.getName();
    var scatterplot = ui.Chart.array.values({
      array: yValues, 
      axis: 0,
      xLabels: xValues
    }).setOptions(app.data.option.scatterplot).setSeriesNames([index]);
    app.map.inspector.charts.add(scatterplot);
  }
  // agrega gocplot
  if(app.control.operator.gocplot.getValue() && polygon.type().getInfo() === 'MultiPoint') {
    var aoi = ee.Geometry.Rectangle(app.map.bounds);
    var inc = (max-min)/app.data.maxGOCthreholds;
    var gocplot = images.GOCPlot(app.data.layer.index.image,{
      min: min,
      max: max,
      inc: inc,
      points: polygon,
      aoi: aoi,
      scale: scale,
      crs: app.data.defaultProj, 
    });
    //.setOptions(app.data.option.scatterplot).setSeriesNames([index]);
    app.map.inspector.charts.add(gocplot);
  }
  // agrega serie de tiempo
  if (app.control.operator.timeseries2.getValue()) {
    var bandNames = images.SensorsList[sensorID].bands;
    var count = ee.List(bandNames).size().getInfo();
    var bands = ee.List.sequence(0,count-1);
    var period = app.control.composite.period.getValue();
    var refDate = app.control.composite.refDate.getValue();
    var reducer = app.data.colReducers[app.control.composite.reducer.getValue()];
    var col = images.SensorsList[sensorID].collection.filterBounds(polygon);
    app.data.option.timeSeriesChart.title = sensorID + '-' + index + ' Time Series';
    app.data.option.timeSeriesChart.vAxis.title = index;
    app.data.option.timeSeriesChart.series[0].labelInLegend = polygon_gl.getName();
    /*
    var collection = images.mapIndexes(col,sensorID,reducer,period,'day',refDate,index);
    var chart = ui.Chart.image.series({
      imageCollection: collection, 
      region: polygon, 
      scale: scale
    })*/
    var collection = images.mapIndex(col,sensorID,index);
    var series = images.groupedSeries(collection,reducer,polygon,scale,period,'day',refDate,index);
    var xLabels = ee.Array(series)
      .slice(1,0,1)
      .toList()
      .flatten()
      .map(function(t){
        return ee.Date(t).format(app.data.dateFormat);
        });
    var seriesChart = ui.Chart.array.values({
      array: ee.Array(series).slice(1,1),
      axis: 0,
      xLabels: xLabels
    }).setOptions(app.data.option.timeSeriesChart);
    seriesChart.onClick(setDate);
    app.map.inspector.charts.add(seriesChart);  
  }
};
// Funcion que inicia el query con forma de geometría dada 
var startQuery = function(shape){
  print('startQuery:shape:',shape)
  var name,message,type,onDraw,widget;
  var dt = app.drawingTools;
  if(shape === null)
    return;
  shape = shape.toLowerCase();
  if(shape === 'point') {
    name = app.data.pointName + app.data.points;
    message = app.data.text.point;
    type = 'Point';
    onDraw = showValue;
    widget = app.control.operator.keepMarker;
  } else {
    if(shape === 'line') {  
      name = app.data.lineName + app.data.profiles;
      message = app.data.text.profile;
      type = 'Line';
      onDraw = plotProfile;
      widget = app.control.operator.keepLine;
    } else {
      if(shape === 'rectangle' || shape === 'polygon' || shape == 'multipoint') {
        name = app.data.polygonName + app.data.areas;  
        type = 'Rectangle|Polygon|MultiPoint';    
        message = app.data.text.polygon;
        onDraw = showStats;
        widget =  app.control.operator.keepPolygon;
      }
    }
  }
  app.map.message.widgets().reset([ui.Label(message)]);
  var onShapeChange = function(newshape,dt){
    print('onShapeChange:newshape:',newshape)
    var deleted = geometries.stopDraw(type,dt);
    if(type === 'Rectangle|Polygon|MultiPoint')
      app.data.areas -= deleted;
    else {
      if (type === 'Line')
        app.data.profiles -= deleted;
      else {
        if (type === 'Point')
          app.data.points -= deleted;
    }}
    if(newshape === null)
       app.map.queryIcon.toggles();
    else
      startQuery(newshape); // reinicia
  };
  // si había una geometría seleccionada
  if(geometries.startDraw(dt,name,shape + '|' + type,onDraw,onShapeChange)) 
    widget.setValue(true); // la mantiene
};
var stopQuery = function(shape){
  var count = geometries.stopDraw(shape,app.drawingTools);
  if(shape === 'point') {
    app.data.points -= count;
  } else if(shape === 'line') {
    app.data.profiles -= count;
  } else if(shape === 'rectangle' || shape === 'polygon') {
    app.data.areas -= count;
  }
};
// barra de query
app.map.queryIcon.onChange(
  function(state,but){
    app.map.message.style().set({shown: state});
    var shape;
    // optiene la forma de consulta
    var selectedGeom = app.drawingTools.getSelected();
    if(selectedGeom) {
      var prevGeom = selectedGeom.toGeometry();
      shape = prevGeom.type().getInfo().toLowerCase();
    } else 
      shape = app.drawingTools.getShape() || 'point';  
    if(state)
      startQuery(shape);
    else
      stopQuery(shape);
    ui.url.set('inspector',state  > 0);
});
// opciones de visuaización de capas
app.control.explore.layersBar.onClick( 
  function(sel,desel,radio){
    if(desel === 0 || sel === 0)
      app.map.legends.index.config.style().set({shown: sel === 0});
    if(desel === 1 || sel === 1)
      app.map.legends.composite.config.style().set({shown: sel === 1});
    if(desel === 2 || sel === 2)
      app.map.legends.index2.config.style().set({shown: sel === 2});
    if(desel === 3 || sel === 3)
      app.map.legends.composite2.config.style().set({shown: sel === 3});
});
// opciones de consulta del mapa
app.control.operator.queryBar.onClick(
  function(sel,desel,radio){
    var layerName;
    if(desel === 0){
      app.control.operator.inspectorOptions.style().set({shown: false});
    } else if(desel === 1) {
      app.control.operator.profileOptions.style().set({shown: false});
    } else if(desel === 2) {
      app.control.operator.statsOptions.style().set({shown: false});
    }
    app.control.aoi.layer.setValue(false);
    if(sel === 0) {
      app.control.operator.inspectorOptions.style().set({shown: true});
    } else if (sel === 1) {
      app.control.operator.profileOptions.style().set({shown: true});
    } else if (sel === 2) {
      app.control.operator.statsOptions.style().set({shown: true});
    }
});
// actualiza área de la máscara
function updateArea(){
  if(!app.control.operator.mask.getValue())
    return;
  if(!app.data.layer.index.masked)
    return;
  app.control.operator.maskArea.setValue('Mask area: updating...');
  var scale = app.map.scale.max(app.data.layer.index.scale);
  app.data.layer.index.masked
    .reduceRegion({
      reducer: ee.Reducer.count(),
      scale: scale,
      bestEffort: true,
      maxPixels: images.maxPixels,
      crs: app.data.defaultProj, 
      geometry: ee.Geometry.Rectangle(app.map.bounds),
    }).getNumber(getIndexAcronym(app.control.index.selector.getValue()))
    .multiply(scale.pow(2).divide(1e6)) // covierte a km2
    .evaluate(function(area){
      if(!area)
        area = 0;
      app.control.operator.maskArea.setValue('Mask area: ' + area.toFixed(4) + ' Km2');
    });
}
// actualiza máscara
var updateMask = function(threshold){
  print(eTime() + ': masking/unmasking index...');
  threshold = app.control.operator.threshold.getValue();
  // aplica la mascara y actualiza la capa
  if (app.control.operator.invertMask.getValue()) 
    app.data.layer.index.masked = app.data.layer.index.image
        .updateMask(app.data.layer.index.image.lte(threshold));
  else
    app.data.layer.index.masked = app.data.layer.index.image
        .updateMask(app.data.layer.index.image.gt(threshold));
  // actualiza si está activa
   updateIndexLayer(true); // actualiza la capa sin la leyenda
   updateArea();
};
app.control.operator.threshold.onChange(ui.util.debounce(updateMask,100));
app.control.operator.invertMask.onChange(updateMask);
app.control.operator.rescaleMin.onChange(function(value){
  if(isNaN(parseFloat(value)))
    app.control.operator.rescaleMin
      .setValue(app.data.layer.index.visParams.min,false);
});
app.control.operator.rescaleMax.onChange(function(value){
  if(isNaN(parseFloat(value)))
    app.control.operator.rescaleMax
      .setValue(app.data.layer.index.visParams.max,false);
});
// actualiza el selector de umbral
var updateThrSlider = function() {
  var newVal;
  var curVal = app.control.operator.threshold.getValue();
  print(eTime() + ': updating threhold slider...');
  var disabled = app.control.operator.threshold.getDisabled();
  var min = parseFloat(app.control.operator.rescaleMin.getValue());
  var max = parseFloat(app.control.operator.rescaleMax.getValue());
  var step = Math.min((max-min)/100,1);
  // determina el nuevo valror a partir de los siguientes
  // 1- valor por default
  // 2- valor actual
  // 3- valor más cercano dentro del rango válido
  if(app.data.option.threshold !== null) {
    newVal = app.data.option.threshold;
    app.data.option.threshold = null;
  } else
    newVal = curVal;
  newVal = Math.min(Math.max(newVal,min),max);
  // quita el valor para actualizar límites
  app.control.operator.threshold.setValue(null,false);
  // actualiza los limites
  if(max < app.control.operator.threshold.getMax()) {
    if(min < app.control.operator.threshold.getMin())
      app.control.operator.threshold = app.control.operator.threshold
        .setMin(min).setStep(step).setMax(max);
    else 
      app.control.operator.threshold = app.control.operator.threshold
        .setStep(step).setMax(max).setMin(min);
  } else {
    if(min < app.control.operator.threshold.getMin())
      app.control.operator.threshold = app.control.operator.threshold
        .setMin(min).setMax(max).setStep(step);
    else 
      app.control.operator.threshold = app.control.operator.threshold
        .setMax(max).setStep(step).setMin(min);  
  }  
  app.control.operator.thresholdPanel.widgets().reset([
    ui.Label('Threshold:'),
    app.control.operator.threshold
    ]);
  app.control.operator.threshold.setValue(newVal,false);
  updateMask(newVal);
};
// Borra todas las geometrias que comienzan por prefix
var deleteGeometries = function(prefix) {
    var toDelete = [];
    app.drawingTools.layers()
      .forEach(function(layer){
        if(layer.getName().startsWith(prefix))
          toDelete[toDelete.length] = layer;
      });
    toDelete.map(function(layer) {
      app.drawingTools.layers().remove(layer);
    });
};
app.control.operator.deletePoints.onClick(
  function(value) {
    deleteGeometries(app.data.pointName); 
    app.data.points = 0;
    deleteGeometries(app.data.flowlineName);
    app.data.flowlines = 0;    
  });
app.control.operator.deleteLines.onClick(
  function(value) {
    deleteGeometries(app.data.lineName);
    app.data.profiles = 0;
  });
app.control.operator.deletePolygons.onClick(
  function(value) {
    deleteGeometries(app.data.polygonName);
    app.data.areas = 0;
  });
// actualiza la fecha
var setDate = function(xValue, yValue, seriesName) {
  if (!xValue) return; 
  var date = new Date(xValue);
  app.control.composite.datePanel.widgets().get(1).setValue(date); 
};
// actuaiza rango de rescalamiento
app.control.operator.rescale.onChange(
  function(value){
    //app.control.operator.rescaleMin.setDisabled(!value);
    //app.control.operator.rescaleMax.setDisabled(!value);
  }
);
// habilita máscara
app.control.operator.mask.onChange(
  function(value){
    app.control.operator.maskOptions.style().set({shown: value});
    updateThrSlider();    
    updateIndexLayer(false); // actualiza la capa sin la legenda
});
// actualiza comparación
var updateComparison = function(compare){
  var index = getIndexAcronym(app.control.index.selector.getValue());
  var texture = app.control.operator.texture.getValue();
  var comparison = app.control.operator.comparison.getValue();
  app.control.operator.compareOptions.style().set({shown: compare});
  app.control.operator.timeseries.setDisabled(compare);
  app.control.operator.timeseries2.setDisabled(compare);
  if(compare) {
    //app.data.layer.index.visParams = images.Comparisons[comparison].visParams;
    app.control.operator.timeseries.setValue(false);
    app.control.operator.timeseries2.setValue(false);
  //} else {
  //  app.data.layer.index.visParams = images.SI[index].visParams;    
  }  
  updateIndex(index,texture,compare);
  updateThrSlider();
};
app.control.operator.compare.onChange(updateComparison);
app.control.operator.comparison.onChange(
  function(){
    if(app.control.operator.compare.getValue())
      updateComparison(true);
  });
app.control.operator.showQueryOpts.onChange(
  function(checked) {
    app.control.operator.queryOptions.style().set({shown: checked});
  });
// explore -eventos
// transfiere el valor de visParams editado
app.control.explore.mapType.onChange(
  function(value){
    app.map.main.setOptions(value);
  });
app.map.legends.index.config.applyButton.onClick(
  function(widget){
    app.data.layer.index.visParams = app.map.legends.index.config.visParams;
  });
app.map.legends.composite.config.applyButton.onClick(
  function(widget){
    app.data.layer.composite.visParams = app.map.legends.composite.config.visParams;
  });
function updateInsetBounds(center,map) {
  if (app.control.explore.inset.getValue()) {
    app.map.bounds.evaluate(function(rect){
      var bounds = ee.Geometry.Rectangle(rect);
      app.map.inset.centerObject(bounds);
      app.map.inset.layers().set(0, bounds);  
    });
  }
}
var updateInsetPos = function(pos){
  // si no está visible
  if(!app.control.explore.inset.getValue())
    return;
  var split = app.control.explore.duplicate.getValue();
  // muestra en el panel correspondiente
  if(split) {
    app.map.main.remove(app.map.inset);
    app.map.copy.remove(app.map.inset);
    if (pos === 1) 
      app.map.copy.add(app.map.inset);
    else 
      app.map.main.add(app.map.inset);
  }
  // actualiza posicion
  if (pos === 0) 
    app.map.inset.style().set({position: 'bottom-left'})
  else 
    app.map.inset.style().set({position: 'bottom-right'})
  ui.url.set('insetPos',app.data.positions[pos]);
}
app.control.explore.inset.onChange(
  function(value){
      // remueve
    app.control.explore.insetPos.style().set({shown: value});
    var split = app.control.explore.duplicate.getValue();  
    if(!value){
      app.map.copy.remove(app.map.inset);
      app.map.main.remove(app.map.inset);
      return;
    }
    app.map.main.add(app.map.inset);      
    updateInsetBounds();  
  });
app.control.explore.insetPos.onClick(updateInsetPos);
// habilita legendas
var updateLegendsPos = function(pos){
  // si no está visible
  if(!app.control.explore.legends.getValue())
    return;
  var split = app.control.explore.duplicate.getValue();
  // muestra en el panel correspondiente
  if (split) {
    app.map.main.remove(app.map.legends.frame);
    app.map.copy.remove(app.map.legends.frame);
   if(pos === 1) //(pos === 'right') 
    app.map.copy.add(app.map.legends.frame);
   else 
    app.map.main.add(app.map.legends.frame);     
  }
  // actualiza posicion
  if(pos === 0) // (pos === 'left') 
    app.map.legends.frame.style().set({position: 'top-left'});
  else 
    app.map.legends.frame.style().set({position: 'top-right'});
  ui.url.set('legendsPos',app.data.positions[pos]);
};
// actualiza la legendas del mapa indicado 0=main, 1=main
var updateLegends = function(main){
  print(eTime() + ': updating legends...');
  if(main) {
    app.map.legends.index.config.imageLayer = app.map.layer.index;
    app.map.legends.composite.config.imageLayer = app.map.layer.composite;
    app.map.legends.index.updateFromImage('i','');
    app.map.legends.composite.updateFromImage('c','');
  } else {
    app.map.legends.index2.config.imageLayer = app.map.layer.index2;    
    app.map.legends.composite2.config.imageLayer = app.map.layer.composite2;    
    app.map.legends.index2.updateFromImage('i','_');
    app.map.legends.composite2.updateFromImage('c','_');
  }
};
app.control.explore.legends.onChange(
  function(value) {
    app.control.explore.legendsPos.style().set({shown: value});
    app.control.explore.legendsOptions.style().set({shown: value});
    if (!value) {
      app.map.main.remove(app.map.legends.frame);     //ui.root.remove(app.map.legends.panel);
      app.map.copy.remove(app.map.legends.frame);
      return;
    }
    app.map.main.add(app.map.legends.frame);     //ui.root.add(app.map.legends.panel);
    updateLegendsPos(app.control.explore.legendsPos.getSelected());
  }
);
app.control.explore.legendsPos.onClick(updateLegendsPos);
app.control.explore.index.onChange(
  function(value){
    app.map.legends.index.style().set({shown: value});
  });
app.control.explore.composite.onChange(
  function(value){
    app.map.legends.composite.style().set({shown: value});
  });
app.control.explore.index2.onChange(
  function(value){
    app.map.legends.index2.style().set({shown: value});
  });
app.control.explore.composite2.onChange(
  function(value){
    app.map.legends.composite2.style().set({shown: value});
    });
app.control.explore.showLayerOpts.onChange(
  function(checked){
    app.control.explore.layersOptions.style().set({shown: checked});
    }
  );
// habilita panel doble
app.control.explore.duplicate.onChange(
  function(checked){
    // muestra/oculta la opción de legenda del indice y compuesto
    app.control.explore.swap.style().set({shown: checked});
    app.control.explore.index2.style().set({shown: checked});
    app.control.explore.composite2.style().set({shown: checked});
    // actualiza opciones de capas activas
    if(app.control.explore.layersBar.getSelected() > 1)
      app.control.explore.layersBar.setSelected(0);
    app.control.explore.layersBar.setDisabled(2,!checked);
    app.control.explore.layersBar.setDisabled(3,!checked);
    // si se habilita el duplicado
    if(checked) {
      // aborta si no hay compuesto
      if(!app.data.layer.composite.image)
        return;
     // actualiza posicion del mapa copia
     app.map.main.getCenter().coordinates().getInfo(
       function(mapCenter){
        app.map.copy.setCenter(mapCenter[0],mapCenter[1]);
       });
      print(eTime() + ': duplicating map...');  // para monitoreo
      // reemplaza un panel por dos paneles
      ui.root.widgets().remove(app.map.main);
      ui.root.widgets().insert(1,app.map.split);
      //app.map.copy.centerObject(app.map.main.getCenter(),app.map.main.getZoom());
      // copia compuesto del panel principal
      app.map.layer.composite2 = ui.Map.Layer({
        eeObject: app.map.layer.composite.getEeObject(), 
        visParams: app.map.layer.composite.getVisParams(),
        name: app.map.layer.composite.getName(), 
        shown: app.map.layer.composite.getShown(), 
        opacity: app.map.layer.composite.getOpacity()
      });
      app.map.layer.index2 = ui.Map.Layer({
        eeObject: app.map.layer.index.getEeObject(), 
        visParams: app.map.layer.index.getVisParams(),
        name: app.map.layer.index.getName(), 
        shown: app.map.layer.index.getShown(), 
        opacity: app.map.layer.index.getOpacity()
      });
      app.map.copy.layers().reset([
        app.map.layer.composite2,
        app.map.layer.index2
        ]); 
      app.map.copy.setOptions(app.control.explore.mapType.getValue()); 
      // habilita la comparación y scatterplot
      app.control.operator.compare.setDisabled(false);
      app.control.operator.scatterplot.setDisabled(false);
      // espera un segundo antes de actualizar la legenda
      ui.util.setTimeout(function(){
        updateLegends(false);
      },app.data.startUpDelayStep*(1+app.data.option.texture));
    } else {
      // reemplaza los dos paneles por un panel
      ui.root.widgets().remove(app.map.split);
      ui.root.widgets().insert(1,app.map.main);
      //app.map.main.centerObject(app.map.copy.getCenter(),app.map.copy.getZoom());
      // borra las capas del mapa secundario
      app.map.copy.layers().reset([]);
      // Desabilita la comparación y escatterplot
      app.control.operator.compare.setValue(false).setDisabled(true);
      app.control.operator.scatterplot.setValue(false).setDisabled(true);
      // deshabilita la leyenda del panel secundario
      app.control.explore.index2.setValue(false);
      app.control.explore.composite2.setValue(false);
    }
    updateInsetPos(app.control.explore.insetPos.getSelected());
    updateLegendsPos(app.control.explore.legendsPos.getSelected());
  }
);
app.control.explore.swap.onClick(
  function(widget){
    // copia temporal
      app.data.layer.composite.image = app.map.layer.composite2.getEeObject();
      app.data.layer.composite.visParams = app.map.layer.composite2.getVisParams();
      app.data.layer.composite.name = app.map.layer.composite2.getName();
      var cshown = app.map.layer.composite2.getShown(); 
      var copacity =  app.map.layer.composite2.getOpacity();
      app.data.layer.index.image = app.map.layer.index2.getEeObject(); 
      app.data.layer.index.visParams = app.map.layer.index2.getVisParams();
      app.data.layer.index.name = app.map.layer.index2.getName();
      var ishown = app.map.layer.index2.getShown();
      var iopacity = app.map.layer.index2.getOpacity();
    // actualiza el panel derecho
     app.map.layer.composite2 = ui.Map.Layer({
        eeObject: app.map.layer.composite.getEeObject(), 
        visParams: app.map.layer.composite.getVisParams(),
        name: app.map.layer.composite.getName(), 
        shown: app.map.layer.composite.getShown(), 
        opacity: app.map.layer.composite.getOpacity()
      });
      app.map.layer.index2 = ui.Map.Layer({
        eeObject: app.map.layer.index.getEeObject(), 
        visParams: app.map.layer.index.getVisParams(),
        name: app.map.layer.index.getName(), 
        shown: app.map.layer.index.getShown(), 
        opacity: app.map.layer.index.getOpacity()
      });
      app.map.copy.layers().reset([
        app.map.layer.composite2,
        app.map.layer.index2
        ]);
     updateLegends(false);    
      // actualiza el panel izquierdo
      app.map.layer.index = ui.Map.Layer({
        eeObject: app.data.layer.index.image, 
        visParams: app.data.layer.index.visParams,
        name: app.data.layer.index.name, 
        shown: ishown, 
        opacity: iopacity
      });
      app.map.layer.composite = ui.Map.Layer({
        eeObject: app.data.layer.composite.image, 
        visParams: app.data.layer.composite.visParams,
        name: app.data.layer.composite.name, 
        shown: cshown, 
        opacity: copacity
      });
      app.map.main.layers().reset([
        app.map.layer.composite,
        app.map.layer.index
        ]);
      updateLegends(true);
  });
// download
// construye la colección a partir de las geometrias editadas
var getSampleFeatures = function(scale,index){
    return ee.FeatureCollection(
      geometries.getShownLayers(app.drawingTools,'')
      //app.drawingTools.layers().getJsArray()
        .map(function(geometryLayer){ 
          var name = geometryLayer.getName();
          var geometry = geometryLayer.toGeometry();
          var dict = app.data.layer.index.image.reduceRegion({
            geometry: geometry,
            reducer: ee.Reducer.mean()
              .setOutputs(['mean' + index]),
            scale: scale,
            maxPixels: images.maxPixels,
            bestEffort: true,
            crs: app.data.defaultProj, 
          }).set('LayerName',name);
          return ee.Feature(geometry,dict);
        })).filterBounds(app.data.layer.downloadArea.geometries().get(0));
  };
// retorna las dimensiones del area de descarga
var geometryProps = function(verts){
  var bounds = verts[0].concat(verts[2]);
  var center = [(bounds[0]+bounds[2])/2,(bounds[1]+bounds[3])/2];
  var height = ee.Geometry.Point(verts[1])
    .distance(ee.Geometry.Point(verts[2]))
    .getInfo();
  var width =  ee.Geometry.Point(verts[0])
    .distance(ee.Geometry.Point(verts[1]))
    .getInfo();
  return {
    bounds: bounds,
    center: center,
    height: height,
    width: width
  };
};
// llamada al cambiar la escala
var updateDownloadSize = function(scale){
  print(eTime() + 'updating download image size...');
  app.control.download.rowsPanel.widgets().reset([
    ui.Label('Rows (pixels):'),
    ui.Label('updating...')]);
  app.control.download.colsPanel.widgets().reset([
    ui.Label('Columns (pixels):'),
    ui.Label('updating...')]);
  app.drawingTools.unlisten();
  app.data.layer.downloadArea
    .geometries()
    .get(0)
    .bounds()
    .coordinates()
    .get(0)
    .evaluate(function(verts) {
  var geom = geometryProps(verts);
  var maxCols = app.control.download.cols.getMax();
  var minCols = app.control.download.cols.getMin();
  var maxRows = app.control.download.rows.getMax();
  var minRows = app.control.download.rows.getMin();
  var cols = Math.round(geom.width / scale);
  var rows = Math.round(geom.height / scale);
  if(cols < minCols || cols > maxCols || rows < minRows || rows > maxRows) {
    var xscale = Math.max(Math.min(cols,maxCols),minCols) / cols;
    var yscale = Math.max(Math.min(rows,maxRows),minRows) / rows;
    var rect = [
      (geom.bounds[0]-geom.center[0])*xscale+geom.center[0],
      (geom.bounds[1]-geom.center[1])*yscale+geom.center[1],
      (geom.bounds[2]-geom.center[0])*xscale+geom.center[0],
      (geom.bounds[3]-geom.center[1])*yscale+geom.center[1]
      ];
      app.data.layer.downloadArea.geometries()
        .set(0,ee.Geometry.BBox(rect[0],rect[1],rect[2],rect[3]));
    cols = Math.max(Math.min(cols,maxCols),minCols);
    rows = Math.max(Math.min(rows,maxRows),minRows);
  }
  app.control.download.rowsPanel.widgets().reset([
    ui.Label('Rows (pixels):'),
    app.control.download.rows]);
  app.control.download.colsPanel.widgets().reset([
    ui.Label('Columns (pixels):'),
    app.control.download.cols]);
  app.control.download.cols.setValue(cols,false);
  app.control.download.rows.setValue(rows,false);
  app.drawingTools.onEdit(ui.util.debounce(updateDownloadArea, 500));  
  app.drawingTools.onErase(ui.util.debounce(closeDownload,500));
  });
};
// llamada al modificar el area de descarga
var updateDownloadArea = function(geometry,layer,dt){
  if(layer.getName() != DOWNLOAD_AREA_ID)
    return;
  print(eTime() + 'updating download image extent...');
  app.drawingTools.unlisten();
   app.data.layer.downloadArea
    .geometries()
    .get(0)
    .bounds()
    .coordinates()
    .get(0)
    .evaluate(function(box){
  var geom = geometryProps(box);
  // valida que el tamaño no supere el tamaño en pixeles
  var maxWidth = app.control.download.cols.getMax() * app.control.download.scale.getMax();
  var maxHeight = app.control.download.rows.getMax() * app.control.download.scale.getMax();
  var minWidth = app.control.download.cols.getMin() * app.control.download.scale.getMin();
  var minHeight = app.control.download.rows.getMin() * app.control.download.scale.getMin();
  // forza el ajuste del área
  if (geom.width < minWidth || geom.width > maxWidth || geom.height < minHeight || geom.height > maxHeight) {
    var xscale = Math.max(Math.min(geom.width,maxWidth),minWidth) / geom.width;
    var yscale = Math.max(Math.min(geom.width,maxWidth),minWidth) / geom.height;
    var rect = [
      (geom.bounds[0]-geom.center[0])*xscale+geom.center[0],
      (geom.bounds[1]-geom.center[1])*yscale+geom.center[1],
      (geom.bounds[2]-geom.center[0])*xscale+geom.center[0],
      (geom.bounds[3]-geom.center[1])*yscale+geom.center[1]
      ];
      app.data.layer.downloadArea.geometries()
        .set(0,ee.Geometry.BBox(rect[0],rect[1],rect[2],rect[3]));
  }
  updateDownloadSize(app.control.download.scale.getValue());
  app.drawingTools.onEdit(ui.util.debounce(updateDownloadArea, 500));    
  app.drawingTools.onErase(ui.util.debounce(closeDownload,500));
  });
};
// actualiza el slider de resolución
var updateScaleSlider = function(){
  app.control.download.scalePanel.widgets().reset([
    ui.Label('updating...') 
    ]);
  var minScale = Math.round(100*app.data.layer.index.scale.getInfo()) / 100;
  app.control.download.scale = ui.Slider({
    min: minScale,
    max: 100*minScale,
    step: minScale,
    style: {stretch: 'horizontal'},
    onChange: updateDownloadSize
  });
  app.control.download.scalePanel.widgets().reset([
    ui.Label('Pixel size (meters):'),
    app.control.download.scale,
    ]);
};
app.control.download.rows
  .onChange(function(rows){
  print(eTime() + ': updating download image rows...');
  app.map.message.style().set({shown: true});
  app.map.message.widgets().reset([ui.Label('Updating geometry layers...')]);
  app.drawingTools.unlisten();
   app.data.layer.downloadArea
    .geometries()
    .get(0)
    .bounds()
    .coordinates()
    .get(0)
    .evaluate(function(box){
  var geom = geometryProps(box);
  var yscale = rows * app.control.download.scale.getValue() / geom.height;
  var rect = [
    geom.bounds[0],
    (geom.bounds[1]-geom.center[1])*yscale+geom.center[1],
    geom.bounds[2],
    (geom.bounds[3]-geom.center[1])*yscale+geom.center[1],
  ];
  app.data.layer.downloadArea.geometries()
    .set(0,ee.Geometry.BBox(rect[0],rect[1],rect[2],rect[3]));
  app.drawingTools.onEdit(ui.util.debounce(updateDownloadArea, 500));  
  app.drawingTools.onErase(ui.util.debounce(closeDownload,500));
  app.map.message.style().set({shown: false});
    });
});
// actualiza columnas
app.control.download.cols
  .onChange(function(cols){  
  print(eTime() + 'updating download image cols...');
  app.map.message.style().set({shown: true});
  app.map.message.widgets().reset([ui.Label('Updating geometry layers...')]);
  app.drawingTools.unlisten();
  app.data.layer.downloadArea
    .geometries()
    .get(0)
    .bounds()
    .coordinates()
    .get(0)
    .evaluate(function(box){
  var geom = geometryProps(box);
  var xscale = cols * app.control.download.scale.getValue() / geom.width;
  var rect = [
    (geom.bounds[0]-geom.center[0])*xscale+geom.center[0],
    geom.bounds[1],
    (geom.bounds[2]-geom.center[0])*xscale+geom.center[0],
    geom.bounds[3]
  ];
  app.data.layer.downloadArea.geometries()
    .set(0,ee.Geometry.BBox(rect[0],rect[1],rect[2],rect[3]));
  app.drawingTools.onEdit(ui.util.debounce(updateDownloadArea, 500));  
  app.drawingTools.onErase(ui.util.debounce(closeDownload,500));
  app.map.message.style().set({shown: false});
    });
});
// Centra el área de descarga a la vista del mapa
app.control.download.centerArea.onClick(
  function(but){
    app.drawingTools.layers().remove(app.data.layer.downloadArea);
    app.data.layer.downloadArea = null;
    app.control.download.toggle.click();
    app.control.download.toggle.click();
    });
var closeDownload = function(geometry,layer,dt){
  if(layer.getName() != DOWNLOAD_AREA_ID)
    return;
  print(eTime() + 'closing download panel...');
  dt.layers().remove(layer);
  app.data.layer.downloadArea = null;
  // simula un click en el botton cerrar panel  
  app.control.download.toggle.click(); 
};
app.control.download.indexRefresh
  .onClick(function(){
  if(!app.data.layer.index.image) return;
  var index = getIndexAcronym(app.control.index.selector.getValue());
  var url = null;
  var scale = app.control.download.scale.getValue();
  var region = app.data.layer.downloadArea.geometries().get(0);
  var dimensions = [app.control.download.cols.getValue(),app.control.download.rows.getValue()];
  var totalMbytes = dimensions[0] * dimensions[1] * 4 / Math.pow(2,20);
  if (totalMbytes <= 32) {
    app.control.download.index.setValue('updating...')
      .style().set('color','black');
    var indexFileName = index + '_' + 
      app.data.layer.composite.name.replace(/ /gi,'_')  + '_' + scale.toFixed(0) + 'm';  
    url = app.data.layer.index.image.float().getDownloadURL({
      name: indexFileName,
      region: region,
      dimensions: dimensions,
      crs: app.data.defaultProj, 
      filePerBand: false,      
    });
    ee.String(url).evaluate(function(url_index){
      app.control.download.index
        .setValue('Index image (TIF, ' + totalMbytes.toFixed(2) + ' MB) 🢃')
        .setUrl(url_index).style()
        .set('color','blue');
    });
  } else
      app.control.download.index
        .setValue('Index image (TIF, +32 MB!)')
        .setUrl(url).style()
        .set('color','red');
});
app.control.download.compositeRefresh
  .onClick(function(){
  if(!app.data.layer.composite.image) return;
  var sensorID = app.control.composite.collections.getValue();
  var url = null;
  var scale = app.control.download.scale.getValue();
  var region = app.data.layer.downloadArea.geometries().get(0);
  var dimensions = [app.control.download.cols.getValue(),app.control.download.rows.getValue()];
  var numBands = images.SensorsList[sensorID].bands.length;
  var totalMbytes = dimensions[0] * dimensions[1] * 4 * numBands / Math.pow(2,20);
  if (totalMbytes <= 32) {
    app.control.download.composite
        .setValue('updating...')
        .style().set('color','black');
    var compositeName = app.data.layer.composite.name.replace(/ /gi,'_') + '_' + scale.toFixed(0) + 'm';      
    //app.control.download.index.setValue('Udating...');
    url = app.data.layer.composite.image.getDownloadURL({
      name: compositeName,
      dimensions: dimensions,
      region: region,
      crs: app.data.defaultProj,      
      filePerBand: false,
    });
    ee.String(url).evaluate(function(url_composite){
      app.control.download.composite
        .setValue('Composite image (TIF, ' + totalMbytes.toFixed(2) + 'MB) 🢃')
        .setUrl(url_composite).style()
        .set('color','blue');
    });
  } else 
    app.control.download.composite
      .setValue('Composite image (TIF, +32 MB!)')
      .setUrl(url).style()
      .set('color','red');
});
app.control.download.samplesRefresh
  .onClick(function(){
  var url = null;
  var index = getIndexAcronym(app.control.index.selector.getValue());
  var scale = app.control.download.scale.getValue();
  if (app.drawingTools.layers().getJsArray().length) {
    app.control.download.samples
      .setValue('updating...')
      .setUrl(url)
      .style().set('color','black');
    var sampFileName = index + '_' + 
      app.data.layer.composite.name.replace(/ /gi,'_');  
    url = getSampleFeatures(scale,index).getDownloadURL({
        format: 'KML',
        filename: sampFileName,
    }); 
    ee.String(url).evaluate(function(url_samples){
      app.control.download.samples
        .setValue('Geometry layers (KML) 🢃')
        .setUrl(url_samples)
        .style().set('color','blue');
    });
  } else
    app.control.download.samples
      .setUrl(url)
      .style().set('color','red');
});
/*********************************************
             Inicialización
**********************************************/
var getTags = function(index_dict){  
  index_dict = ee.Dictionary(index_dict);
  return index_dict.keys().map(function(key){
    return ee.Dictionary(index_dict.get(key))
      .get('tags');
  }).flatten().distinct().sort();
};
var getVisParamsFromUrl = function(prefix,postfix){
    var visParams = {};
    var index = ui.url.get('index'+postfix,app.data.option.index);
    var texture = ui.url.get('texture'+postfix,app.data.option.texture);
    var descriptor = ui.url.get('descriptor'+postfix,app.data.option.descriptor);
    var split = ui.url.get('split',app.data.option.split);
    var comparison = ui.url.get('comparison',app.data.option.comparison);
    var bands = ui.url.get(prefix+'bands'+postfix,null);
    var min = ui.url.get(prefix+'min'+postfix,null);
    var max = ui.url.get(prefix+'max'+postfix,null);
    var gamma = ui.url.get(prefix+'gamma'+postfix,null);
    var palette = ui.url.get(prefix+'palette'+postfix,null);
    if(!bands & !min & !max & !gamma & !palette)
      return null;
    if(bands) 
      visParams.bands = bands.match(/[^,]+/g);
    else
      visParams.bands = [0];
    if(min)
      visParams.min = min.match(/[^,]+/g)
        .map(function(n){return Number(n);});
    if(max)
      visParams.max = max.match(/[^,]+/g)
        .map(function(n){return Number(n);});
    if(visParams.bands.length == 3) {
      if(gamma)
        visParams.gamma = gamma;
    } else
       if(palette) {
        if(palette != 'imported') { // specified palette name
          visParams.palette = images.Palettes[palette];
        } else {// default comparison palette
          if(split & comparison)
            visParams.palette = images.Comparisons[comparison].visParams.palette;
          else {
            if(texture) // default texture palette
              visParams.palette = images.SF[descriptor].visParams.palette;
            else // default index palette
              visParams.palette = images.SI[index].visParams.palette;
          }
        }
      } else // no palette
        if(gamma)
          visParams.gamma = gamma;
    if(visParams.min.length == 1)
      visParams.min = visParams.min[0];
    if(visParams.max.length == 1)
      visParams.max = visParams.max[0];
    return visParams;
};
function getOptionsFromUrl(){
  // configuration options
  app.data.option.inset = ui.url.get('inset',false);
  app.data.option.insetPos = ui.url.get('insetPos',app.data.option.insetPos);
  app.data.option.layer = ui.url.get('layer',false);
  app.data.option.asset = ui.url.get('asset','');
  app.data.option.property = ui.url.get('property','');
  app.data.option.inspector = ui.url.get('inspector',false);  
  app.data.option.timeseries = ui.url.get('timeseries',false);
  app.data.option.spectrum = ui.url.get('spectrum',false);
  app.data.option.marker = ui.url.get('marker',true);
  app.data.option.statistics = ui.url.get('statistics',false);  
  app.data.option.histogram = ui.url.get('histogram',false);  
  app.data.option.profile = ui.url.get('profile',false);  
  app.data.option.split = ui.url.get('split',false);
  app.data.option.legends = ui.url.get('legends',false);
  app.data.option.legendsPos = ui.url.get('legendsPos',app.data.option.legendsPos);
  app.data.option.indexItem = ui.url.get('iitem',true);
  app.data.option.compositeItem = ui.url.get('citem',false);
  app.data.option.index2Item = ui.url.get('iitem_',false);
  app.data.option.composite2Item = ui.url.get('citem_',false);  
  app.data.option.tools = ui.url.get('tools',true);
  app.data.option.location = {
    lon: ui.url.get('lon',-100.818),
    lat: ui.url.get('lat',21.123),
    zoom: ui.url.get('zoom',4),
  };
  app.data.option.compare = ui.url.get('normalize',app.data.option.compare);  
  app.data.option.comparison = ui.url.get('comparison',app.data.option.comparison);
  if(app.data.option.split) {
    // guarda un respaldo de las opciones de capa
    app.data.option.copy = {
      sensor: ui.url.get('collection',app.data.option.collection),
      period: ui.url.get('period',app.data.option.period),
      reducer: ui.url.get('reducer',app.data.option.reducer),
      date: ui.url.get('date',app.data.option.date),     
      cloudMask: ui.url.get('cloudMask',app.data.option.cloudMask),     
      refDate: ui.url.get('refDate',app.data.option.refDate),      
      index: ui.url.get('index',app.data.option.index),
      texture: ui.url.get('texture',app.data.option.texture),
      descriptor: ui.url.get('descriptor',app.data.option.descriptor),
      rescale: ui.url.get('rescale',false),
      rescaleMin: ui.url.get('rescalemin',0),      
      rescaleMax: ui.url.get('rescalemax',255),      
      kernel: ui.url.get('kernel',app.data.option.kernel),      
      mask: ui.url.get('mask',app.data.option.mask),
      threshold: ui.url.get('threshold',app.data.option.threshold),
      invert: ui.url.get('invert',app.data.option.invert),
      mapType: ui.url.get('maptype',app.data.option.mapType),
      iopacity: ui.url.get('iopacity',app.data.option.iopacity),
      copacity: ui.url.get('copacity',app.data.option.copacity),      
      ivisParams: getVisParamsFromUrl('i',''),
      cvisParams: getVisParamsFromUrl('c',''),      
    };
    app.data.option.collection = ui.url.get('collection_',app.data.option.collection);
    app.data.option.period = ui.url.get('period_',app.data.option.period);
    app.data.option.reducer = ui.url.get('reducer_',app.data.option.reducer);
    app.data.option.date = ui.url.get('date_',app.data.option.date);
    app.data.option.cloudMask = ui.url.get('cloudMask_',app.data.option.cloudMask);   
    app.data.option.refDate = ui.url.get('refDate_',app.data.option.refDate);
    app.data.option.index = ui.url.get('index_',app.data.option.index);
    app.data.option.texture = ui.url.get('texture_',app.data.option.texture);
    app.data.option.descriptor = ui.url.get('descriptor_',app.data.option.descriptor);
    app.data.option.rescale = ui.url.get('rescale_',false);
    app.data.option.rescaleMin = ui.url.get('rescaleMin_',0);
    app.data.option.rescaleMax = ui.url.get('rescaleMax_',255);
    app.data.option.kernel = ui.url.get('kernel_',app.data.option.kernel);
    app.data.option.mask = ui.url.get('mask_',app.data.option.mask);
    app.data.option.threshold = ui.url.get('threshold_',app.data.option.threshold);
    app.data.option.invert = ui.url.get('invert_',app.data.option.invert);   
    app.data.option.mapType = ui.url.get('maptype_',app.data.option.mapType);
    app.data.option.iopacity = ui.url.get('iopacity_',app.data.option.iopacity),
    app.data.option.copacity = ui.url.get('copacity_',app.data.option.copacity),      
    app.data.option.ivisParams =  getVisParamsFromUrl('i','_');
    app.data.option.cvisParams =  getVisParamsFromUrl('c','_');    
} else { 
    app.data.option.collection = ui.url.get('collection',app.data.option.collection);
    app.data.option.period = ui.url.get('period',app.data.option.period);
    app.data.option.reducer = ui.url.get('reducer',app.data.option.reducer);
    app.data.option.date = ui.url.get('date',app.data.option.date);
    app.data.option.cloudMask = ui.url.get('cloudMask',app.data.option.cloudMask);   
    app.data.option.refDate = ui.url.get('refDate',app.data.option.refDate);    
    app.data.option.index = ui.url.get('index',app.data.option.index);
    app.data.option.texture = ui.url.get('texture',app.data.option.texture);    
    app.data.option.descriptor = ui.url.get('descriptor',app.data.option.descriptor);    
    app.data.option.rescale = ui.url.get('rescale',false);
    app.data.option.rescaleMin = ui.url.get('rescalemin',0);
    app.data.option.rescaleMax = ui.url.get('rescalemax',255);
    app.data.option.kernel = ui.url.get('kernel',app.data.option.kernel);    
    app.data.option.mask = ui.url.get('mask',app.data.option.mask);
    app.data.option.threshold = ui.url.get('threshold',app.data.option.threshold);
    app.data.option.invert = ui.url.get('invert',app.data.option.invert);
    app.data.option.mapType = ui.url.get('maptype',app.data.option.mapType);
    app.data.option.iopacity = ui.url.get('iopacity',app.data.option.iopacity),
    app.data.option.copacity = ui.url.get('copacity',app.data.option.copacity),          
    app.data.option.ivisParams =  getVisParamsFromUrl('i','');
    app.data.option.cvisParams =  getVisParamsFromUrl('c','');    
  }
    ui.url.set('collection',app.data.option.collection);
    ui.url.set('period',app.data.option.period);
    ui.url.set('reducer',app.data.option.reducer);
    ui.url.set('date',app.data.option.date);
    ui.url.set('cloudMask',app.data.option.cloudMask);
    ui.url.set('index',app.data.option.index);
    ui.url.set('texture',app.data.option.texture);
    ui.url.set('descriptor',app.data.option.descriptor); 
    ui.url.set('kernel',app.data.option.kernel);        
    ui.url.set('mask',app.data.option.mask);
    ui.url.set('threshold',app.data.option.threshold);
    ui.url.set('invert',app.data.option.invert);
    ui.url.set('rescale',app.data.option.rescale);
    ui.url.set('rescalemin',app.data.option.rescaleMin);  
    ui.url.set('rescalemax',app.data.option.rescaleMax);        
    ui.url.set('iopacity',app.data.option.iopacity);
    ui.url.set('copacity',app.data.option.copacity);        
}
/***********************/
// define las opciones de inicio a partir del URL
getOptionsFromUrl();
t0 = new Date(); // tiempo de referencia
// oculta todos los paneles
app.control.aoi.panel.style().set({shown: false});
app.control.composite.panel.style().set({shown: false});
app.control.index.panel.style().set({shown: false});
app.control.operator.panel.style().set({shown: false});
app.control.explore.panel.style().set({shown: false});
app.control.download.panel.style().set({shown: false});
// oculta el panel principal
if(!app.data.option.tools)
  app.control.toggle.toggles();
// muestra/oculta opciones
app.control.aoi.layerOptions.style().set({shown: app.data.option.layer});
app.control.composite.timeSliceOptions.style().set({shown: true});
app.control.composite.scenesOptions.style().set({shown: false});
app.control.operator.inspectorOptions.style().set({shown: true});
app.control.operator.profileOptions.style().set({shown: app.data.option.profile});
app.control.operator.statsOptions.style().set({shown: app.data.option.statistics});
app.control.operator.scatterplot.setDisabled(!app.data.option.split)
app.control.operator.textureOptions.style().set({shown: app.data.option.texture});
app.control.operator.maskOptions.style().set({shown: app.data.option.mask});  
app.control.operator.compareOptions.style().set({shown: app.data.option.compare});
app.control.explore.legendsPos.style().set({shown: app.data.option.legends});
app.control.explore.legendsOptions.style().set({shown: app.data.option.legends});
app.control.explore.swap.style().set({shown: app.data.option.split});
// actualiza algunas opciones en silencio
app.control.aoi.layer.setValue(app.data.option.layer,false);
app.control.composite.period.setValue(app.data.option.period,false);
app.control.composite.reducer.setValue(app.data.option.reducer,false);
app.control.composite.refDate.setValue(dateStr(app.data.option.refDate),false);
app.control.composite.cloudMask.setValue(app.data.option.cloudMask,false);
app.control.operator.texture.setValue(app.data.option.texture,false);
app.control.operator.selector.setValue(app.data.option.descriptor,false);
app.control.operator.kernel.setValue(app.data.option.kernel,false);
app.control.operator.mask.setValue(app.data.option.mask,false);
app.control.operator.invertMask.setValue(app.data.option.invert,false);
app.control.operator.rescale.setValue(app.data.option.rescale,false);
app.control.operator.rescaleMin.setValue(app.data.option.rescaleMin,false);
app.control.operator.rescaleMax.setValue(app.data.option.rescaleMax,false);
app.control.operator.compare.setDisabled(!app.data.option.split);
// actualiza items de leyenda
app.control.explore.index.setValue(app.data.option.indexItem);
app.control.explore.composite.setValue(app.data.option.compositeItem);
app.control.explore.index2.setValue(app.data.option.index2Item);
app.control.explore.composite2.setValue(app.data.option.composite2Item);
// configura las capas
app.map.layer.index.setShown(app.data.option.indexItem);
app.map.layer.composite.setShown(app.data.option.compositeItem);
app.map.layer.index2.setShown(app.data.option.index2Item);
app.map.layer.composite2.setShown(app.data.option.composite2Item);
app.map.main.setCenter(app.data.option.location);
/*
var baseChange = [{featureType: 'all', stylers: [{invert_lightness: true}]}];
app.map.main.setOptions('baseChange', {'baseChange': baseChange});
*/
// agrega los tags al selector
var tagNames = getTags(images.SI).getInfo();
app.control.index.filterTags
  .items()
  .reset(tagNames);
/***********/
// desencadena los eventos de actualización del mapa principal
app.control.index.filterTags
  .setValue('All');
// estima el retraso cuando se incia con doble panel
var delay_split = app.data.option.split*app.data.startUpDelayStep*(16+2*app.data.option.texture+2*app.data.option.mask);
//app.control.explore.duplicate.setValue(app.data.option.split,false);
if(app.data.option.split) {
  // espera unos segundos para que termine el mapa principal 
  ui.util.setTimeout(function(){
    // desencadena la copia del mapa principal
    app.control.explore.duplicate.setValue(true);  
    // transfiere las opciones para el nuevo mapa principal
    app.data.option.index = app.data.option.copy.index;
    app.data.option.texture = app.data.option.copy.texture;
    app.data.option.descriptor = app.data.option.copy.descriptor;
    app.data.option.collection = app.data.option.copy.sensor;
    app.data.option.period = app.data.option.copy.period;
    app.data.option.reducer = app.data.option.copy.reducer;
    app.data.option.refDate = app.data.option.copy.refDate;
    app.data.option.date = app.data.option.copy.date;
    app.data.option.cloudMask = app.data.option.copy.cloudMask;
    app.data.option.mask = app.data.option.copy.mask;
    app.data.option.threshold = app.data.option.copy.threshold;
    app.data.option.invert = app.data.option.copy.invert;
    app.data.option.ivisParams = app.data.option.copy.ivisParams;
    app.data.option.cvisParams = app.data.option.copy.cvisParams;
    app.data.option.rescale = app.data.option.copy.rescale;
    app.data.option.mapType = app.data.option.copy.mapType;
    app.data.option.copacity = app.data.option.copy.copacity;
    app.data.option.iopacity = app.data.option.copy.iopacity;
    // actualiza url con valores de respaldo
    ui.url.set('index',app.data.option.index);
    ui.url.set('collection',app.data.option.collection);
    ui.url.set('period',app.data.option.period);
    ui.url.set('reducer',app.data.option.reducer);
    ui.url.set('refDate',app.data.option.refDate);
    ui.url.set('date',app.data.option.date);
    ui.url.set('cloudMask',app.data.option.cloudMask);
    ui.url.set('texture',app.data.option.texture);
    ui.url.set('descriptor',app.data.option.descriptor);    
    ui.url.set('rescale',app.data.option.rescale);    
    ui.url.set('mask',app.data.option.mask);
    ui.url.set('threshold',app.data.option.threshold);
    ui.url.set('invert',app.data.option.invert);
    ui.url.set('iopacity',app.data.option.iopacity);
    ui.url.set('copacity',app.data.option.copacity);
    ui.url.set('maptype',app.data.option.mapType);
    // vueleve a mostrar/ocultar opciones
    app.control.operator.textureOptions.style().set({shown: app.data.option.texture});
    app.control.operator.maskOptions.style().set({shown: app.data.option.mask});  
    app.control.explore.mapType.setValue(app.data.option.mapType);
    // vuelve a actualizar algunos controles en silencio
    app.control.index.selector.setValue(images.SI[app.data.option.index].name,false);
    app.control.composite.period.setValue(app.data.option.period,false);
    app.control.composite.reducer.setValue(app.data.option.reducer,false);
    app.control.composite.refDate.setValue(dateStr(app.data.option.refDate),false);
    app.control.composite.cloudMask.setValue(app.data.option.cloudMask,false);
    app.control.operator.mask.setValue(app.data.option.mask,false);
    app.control.operator.invertMask.setValue(app.data.option.invert,false);
    app.control.operator.compare.setValue(app.data.option.compare,false);
    app.control.operator.comparison.setValue(app.data.option.comparison,false);
    app.control.operator.texture.setValue(app.data.option.texture,false);
    app.control.operator.selector.setValue(app.data.option.descriptor,false);
    app.control.operator.rescale.setValue(app.data.option.rescale,true);
    app.control.operator.rescaleMin.setValue(app.data.option.rescaleMin,false);
    app.control.operator.rescaleMax.setValue(app.data.option.rescaleMax,false);
      // vuelve a actualizar el mapa principal con las nuevas opciones
    print(eTime() +': selecting index again...');
    updateSensor(images.SI[app.data.option.index].name);
  },delay_split);
}
var delay_total = delay_split+app.data.startUpDelayStep*(20+app.data.option.texture+2*app.data.option.mask+app.data.option.compare);
ui.util.setTimeout(function(){    
  // procesa el inspector
  app.map.queryIcon.setState(app.data.option.inspector * 1); 
  app.control.operator.timeseries.setValue(app.data.option.timeseries);
  app.control.operator.spectrum.setValue(app.data.option.spectrum);
  app.control.operator.keepMarker.setValue(app.data.option.marker);
  app.control.explore.mapType.setValue(app.data.option.mapType);
  if(app.data.option.inspector){
    var point = ee.Geometry.Point([app.data.option.location.lon,app.data.option.location.lat]);
    var point_gl = app.drawingTools.getSelected();    
    point_gl.geometries().reset([point]);
    app.map.main.setCenter(app.data.option.location);
  } /*else if(app.data.option.marker) {
    var point = ee.Geometry.Point([app.data.option.location.lon,app.data.option.location.lat]);
    app.drawingTools.addLayer({
      geometries: [point],
      name: 'MapCenter',
    });
    app.map.main.setCenter(app.data.option.location);
  }*/
  // agrega legenda
  app.control.explore.legends.setValue(app.data.option.legends);
  app.control.explore.legendsPos.setSelected(app.data.positions.indexOf(app.data.option.legendsPos));
  // agrega inset
  app.control.explore.inset.setValue(app.data.option.inset);
  app.control.explore.insetPos.style().set({shown: app.data.option.inset});
  app.control.explore.insetPos.setSelected(app.data.positions.indexOf(app.data.option.insetPos));
  // carga la capa solicitada y centra el mapa
  if(app.control.aoi.layer.getValue()) {
    app.control.aoi.asset.setValue(app.data.option.asset);
    app.control.aoi.property.setValue(app.data.option.property);
    loadLayer();
    ui.util.setTimeout(function(){
      app.map.main.setCenter(app.data.option.location);
      },app.data.startUpDelayStep*2);
  } else
    app.map.main.setCenter(app.data.option.location);
},delay_total);
/*************************/
// Actualiza el URL bajo eventos
// legend
app.map.legends.index.config.applyButton.onClick(function(){
  app.map.legends.index.config.updateUrl('i');
});
app.map.legends.composite.config.applyButton.onClick(function(){
  app.map.legends.composite.config.updateUrl('c');
});
app.map.legends.index2.config.applyButton.onClick(function(){
  app.map.legends.index2.config.updateUrl('i','_');
});
app.map.legends.composite2.config.applyButton.onClick(function(){
  app.map.legends.composite2.config.updateUrl('c','_');
});
// aoi
app.control.explore.mapType.onChange(
  function(newValue){
    ui.url.set('maptype',newValue);
  });
app.control.explore.inset.onChange(
  function(newValue){
    ui.url.set('inset',newValue);
  });
app.control.aoi.layer.onChange(
  function(newValue){
    ui.url.set('layer',newValue);
  });
//index
app.control.index.selector.onChange(
  function(newValue){
    ui.url.set('index',getIndexAcronym(newValue));
  });
// composite 
app.control.composite.collections
  .onChange(function(newValue){
    ui.url.set('collection',newValue);
  });
app.control.composite.period
  .onChange(function(newValue){
    ui.url.set('period',newValue);
  });
app.control.composite.reducer
  .onChange(function(newValue){
    ui.url.set('reducer',newValue);
  });
app.control.composite.cloudMask.onChange(
  function(newValue) {
    ui.url.set('cloudMask',newValue); 
  });
// operator
app.control.operator.rescale.onChange(
  function(newValue){
    ui.url.set('rescale',newValue);
  }
);
app.control.operator.rescaleMin.onChange(
  function(newValue){
    ui.url.set('rescalemin',newValue);
  }
);
app.control.operator.rescaleMax.onChange(
  function(newValue){
    ui.url.set('rescalemax',newValue);
  }
);
app.control.operator.mask.onChange(
  function(newValue){
    ui.url.set('mask',newValue);
  });
app.control.operator.threshold.onChange(
  function(newValue){
    ui.url.set('threshold',newValue);
  });
app.control.operator.invertMask.onChange(
  function(newValue){
    ui.url.set('invert',newValue);
  });
app.control.explore.duplicate.onChange(
  function(newValue){
    ui.url.set('split',newValue);
    if(newValue) { 
      ui.url.set('index_',ui.url.get('index',app.data.option.index));
      ui.url.set('collection_',ui.url.get('collection',app.data.option.collection));
      ui.url.set('period_',ui.url.get('period',app.data.option.period));
      ui.url.set('reducer_',ui.url.get('reducer',app.data.option.reducer));
      ui.url.set('date_',ui.url.get('date',app.data.option.date));
      ui.url.set('refDate_',ui.url.get('refDate',app.data.option.refDate));
      ui.url.set('cloudMask_',ui.url.get('cloudMask',app.data.option.cloudMask));
      ui.url.set('mask_',ui.url.get('mask',false));
      ui.url.set('threshold_',ui.url.get('threshold',app.data.option.mask));
      ui.url.set('invert_',ui.url.get('invert',app.data.option.invert));
      ui.url.set('iopacity_',ui.url.get('iopacity',app.data.option.iopacity));
      ui.url.set('copacity_',ui.url.get('copacity',app.data.option.copacity));
      ui.url.set('texture_',ui.url.get('texture',app.data.option.texture));
      ui.url.set('descriptor_',ui.url.get('descriptor',app.data.option.descriptor));
      ui.url.set('kernel_',ui.url.get('kernel',app.data.option.kernel));
      ui.url.set('rescale_',ui.url.get('rescale',app.data.option.rescale));
      ui.url.set('maptype_',ui.url.get('maptype',app.data.option.mapType));      
    } else {
     ui.url.set('index_',null);
      ui.url.set('collection_',null);
      ui.url.set('period_',null);
      ui.url.set('reducer_',null);      
      ui.url.set('date_',null);
      ui.url.set('refDate_',null);
      ui.url.set('mask_',null);
      ui.url.set('threshold_',null);
      ui.url.set('invert_',null);
      ui.url.set('iopacity_',null);
      ui.url.set('copacity_',null);
      ui.url.set('texture_',null);
      ui.url.set('descriptor_',null);
      ui.url.set('kernel_',null);
      ui.url.set('rescale_',null);
      ui.url.set('maptype_',null);
    }
  });
app.control.operator.compare.onChange(
  function(newValue){
    ui.url.set('normalize',newValue);
  });
app.control.operator.comparison.onChange(
  function(newValue){
    ui.url.set('comparison',newValue);
  });
app.control.operator.texture.onChange(
  function(newValue){
    ui.url.set('texture',newValue);
  });
app.control.operator.selector.onChange(
  function(newValue){
    ui.url.set('descriptor',newValue);
  });  
app.control.operator.kernel.onChange(
  function(newValue){
    ui.url.set('kernel',newValue);
  }); 
// explore
app.control.explore.index.onChange(function(value){
  app.map.layer.index.setShown(value);
  ui.url.set('iitem',value);
});
app.control.explore.composite.onChange(function(value){
  app.map.layer.composite.setShown(value);
  ui.url.set('citem',value);
});
app.control.explore.index2.onChange(function(value){
  app.map.layer.index2.setShown(value);
  ui.url.set('iitem_',value);
});
app.control.explore.composite2.onChange(function(value){
  app.map.layer.composite2.setShown(value);
  ui.url.set('citem_',value);
});
app.control.operator.timeseries.onChange(
  function(newValue){
    ui.url.set('timeseries',newValue);
  });
app.control.operator.spectrum.onChange(
  function(newValue){
    ui.url.set('spectrum',newValue);
  });
app.control.operator.keepMarker.onChange(
  function(newValue){
    ui.url.set('marker',newValue);
  });
app.control.explore.legends.onChange(
  function(newValue){
    ui.url.set('legends',newValue);
  });
/*app.control.explore.legendsPos.onChange(
  function(newValue){
    ui.url.set('legendsPos',app.data.positions[newValue]);
  });  */
// actualiza opacidad de las capas en los parametros del url
function setUrlParamsOpacity(){
  ui.url.set('copacity',app.map.layer.composite.getOpacity());
  ui.url.set('iopacity',app.map.layer.index.getOpacity());
  if(app.control.explore.duplicate.getValue()){
    ui.url.set('copacity_',app.map.layer.composite2.getOpacity());
    ui.url.set('iopacity_',app.map.layer.index2.getOpacity());
  }
};
app.map.main.onIdle(
  function(newMapParams,map){
    ui.url.set('lat',newMapParams.lat);
    ui.url.set('lon',newMapParams.lon);
    ui.url.set('zoom',newMapParams.zoom);
    // actualiza los valores de la leyenda
    app.control.explore.composite.setValue(app.map.layer.composite.getShown())
    app.control.explore.index.setValue(app.map.layer.index.getShown())
    if(app.control.explore.duplicate.getValue()) {
      app.control.explore.composite2.setValue(app.map.layer.composite2.getShown())
      app.control.explore.index2.setValue(app.map.layer.index2.getShown())
    }
    app.map.bounds = ee.List(app.map.main.getBounds());
    app.map.scale = ee.Number(app.map.main.getScale());
});
app.map.main.onIdle(setUrlParamsOpacity); // no encuentro un mejor lugar para hacer esto
app.map.main.onIdle(updateArea);
app.map.main.onIdle(updateInsetBounds);
app.map.main.onIdle(ui.util.debounce(updateColHist,3000));
app.control.composite.collections.onChange(ui.util.rateLimit(updateColHist,3000));