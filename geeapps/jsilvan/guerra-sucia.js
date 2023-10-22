/* 
GuerraSucia - Esta app muestra la fotografía aérea histórica de los casos 
de búsqueda de desaparecidos de la guerra sucia.
La app fue desarrollada por JL Silván Cardenas, PhD <jsilvan@centrogeo.edu.mx>
Las ortofotos incluidas fueron descargadas desde el sitio del INEGI
Las fotos aéreas fueron proporcionadas por la CNB y fueron
georeferenciadas por personal del CentroGeo
AJ Alegre Mondragón, JM Madrigal Gómez, C Silva Árias y JL Silvan Cárdenas
Centro de Investigación en Ciencias de Información Geoespacial, A.C
con el asupicio de la Comisión Nacional de Búsqeuda de Desaparecidos en México (CNB)
*/
// Importa módulos externos
//var legends = require('users/jsilvan/tools:legends');
//var images = require('users/jsilvan/tools:images');
//var terrain = require('users/jsilvan/tools:terrain');
var geometries = require('users/jsilvan/tools:geometries');
var gui = require('users/jsilvan/tools:gui');
var io = require('users/jsilvan/tools:iofun');
var legends = require('users/jsilvan/tools:legends');
var WGS84_GEOG = ee.Projection('EPSG:4326');
var WGS84_PROJ = ee.Projection('EPSG:3857');
var app = {}; // Este objeto contiene todos los datos de la App
/******************************* Data Model ************************************
Esta sección contiene el modelo de datos que se muestran en la app
********************************************************************************/
app.data = {};
app.data.text = {};
app.data.text.title = 'Guerra Sucia';
app.data.text.descr = 'Selecciona un sitio en el menú.\n'+
  'Desliza el divisor para comparar el antes y después.\n' +
  '❏ Cambia al modo de un panel.\n' +
  '◫ Cambia al modo de dos paneles.\n' +
  '✏️ Activa el modo de trazos.\n' +
  '👁️ Activa el modo de visualización con estilos.\n' +
  '💾 Descarga los trazos en formato KML.\n' +
  '☁️ Exporta trazos a una Coleccion (modo desarrollo).\n' +  
  '✂️ Recorta el borde de las fotos aéreas.\n' +  
  '📷 Muestra el borde de las fotos aéreas.\n' +  
  '🔼️ Trae al frente la aerofoto señalada con un click.\n' +  
  '🔽️ Envía hacia atrás la aerofoto señalada con un click.\n' +  
  '📌️ Reposiciona la foto usando geometrías.\n' +  
  '🌊 Agrega capa de velocidad oceánica.\n' +
  '📁 ️Carga trazos desde una Colección o código  KML.\n' +  
 // '🗃️ Agrega capa de trazos  desde una Colección o código  KML.\n' +  
  '🗑️ Elimina todos los trazos.\n' +  
  '🕀️  Centra el mapa en la capa seleccionda.\n' +  
  '📄 Define atributos para la geometría seleccionada.\n' +
  '⚙️ Define atributos de estilo para la geometría/capa seleccionada.\n'+  
  '📐 Inspecciona dimensiones de la geometría seleccionada.\n' +  
  '✈️ Genera polígono de cobertura de vuelo.\n' + 
  '↝  Simula el arrastre marino de la geometría seleccionada.\n' +
   '🕒  Opción deshabilitada temporalmente por procesamiento en curso.\n' +  
  '';
app.data.flightNum = 0; // contador para el Id de vuelos
app.data.rootPath = 'projects/cnb-apps/assets/trazos_guerra_sucia/';
app.data.sites = {
  "Campo Miilitar 1-A": {
    lat: 19.44315, 
    lon: -99.23141,
    airphotos: [1970,1971],
    ortophotosBW: [1971,1994,1999,2005],
    floorplans: [1953], 
   },
  "Campo Miilitar 1-F": {
    lat: 19.388746, 
    lon: -99.228173,
    airphotos: [1970,1971],
    ortophotosBW: [1994,1999,2005],
    floorplans: [2017], 
   },
// objeto de sitios seleccionables
  "Actual Btlon Infantería antes Base Aérea": {
    lat: 19.81217541486167,
    lon: -99.2857228792377,
    airphotos: [1971],
    ortophotosBW: [1994,1999],
    floorplans: [], 
    },
  "Panteón Civil de Dolores": {
    lat: 19.41286,
    lon: -99.20915, 
    airphotos: [1970,1971,2005,2007],
    ortophotosBW: [1994,1999,2005],
    floorplans: [2022], 
    },
  "Ciudad de los Servicios": {
    lat: 17.210308882613027,
    lon: -100.42525537717042,
    airphotos: [1979,2007],
    ortophotosBW: [1995,2007],
    floorplans: [], 
    },
  "Base Militar Aérea Pie de la Cuesta": {
    lat: 16.907606734796758,
    lon: -99.98296687649496,
    airphotos: [2007],
    ortophotosBW: [1995,2007],
    floorplans: [], 
    },
  "Canal López Mateos": {
    lat: 25.083422390156468,
    lon: -107.69501180883617,
    airphotos: [1975,1979],
    ortophotosBW: [1993, 1994, 1997],
    floorplans: [], 
    },
  "Parque 87": {
    lat: 24.773788855652185,
    lon: -107.38845595495945,
    airphotos: [2004],
    ortophotosBW: [1997, 2004],
    floorplans: [], 
    },
  "Campo Militar 9-A":{
    lat: 24.797915925404073,
    lon: -107.37627489804808,
    airphotos: [1975,1976],
    ortophotosBW: [1997, 2004],    
    floorplans: [], 
    },
  "Cuartel Militar de la 28 Zona":{
    lat: 17.07575270675816,
    lon: -96.69749275891714,
    airphotos: [1979],
    ortophotosBW: [1995],
    floorplans: [], 
    },
  "Campo Militar 42-B": {
    lat: 26.935666469406023,
    lon: -105.69349198608495,
    airphotos: [2004,2005],
    ortophotosBW: [1994,1995],
    floorplans: [], 
    },
  "Cuartel General 5 Zona Militar": {
    lat: 28.620656281820832,
    lon: -106.08000881062058,
    airphotos: [1974,2006],
    ortophotosBW: [1993,2004],
    floorplans: [], 
    },
  "Aeropuerto Internacional de Acapulco": {
    lat: 16.7560,
    lon: -99.7516,
    airphotos: [1979],
    ortophotosBW: [1995,2007],
    floorplans: [], 
    },
  };
app.data.airbaseStyle = {
  pointShape: '+',
  pointSize: 5, 
  width: 1, 
  color: '000000', 
  fillColor: '#fa8072aa', 
  neighborhood: 7
};
app.data.layers = [];
// define colecciones usadas
app.data.airphoto = ee.ImageCollection('projects/inegi-datos/assets/Aerofoto');
app.data.ortophoto = ee.ImageCollection('projects/inegi-datos/assets/Ortofoto');
app.data.floorplans = ee.ImageCollection('projects/cnb-apps/assets/Planos');
app.data.airbases = ee.FeatureCollection('projects/cnb-apps/assets/BasesAereas')
 .style(app.data.airbaseStyle);
app.data.bathymetry = ee.ImageCollection([ee.Image("CGIAR/SRTM90_V4").toFloat().rename(['b1'])])
  .merge(ee.ImageCollection("projects/inegi-datos/assets/MDB_400m"))
  .reduce(ee.Reducer.firstNonNull());
//app.data.bathymetryRGB = app.data.bathymetry
//  .visualize(app.data.bathimetry);
  //.add(ee.Terrain.hillshade(app.data.bathymetry)
  //  .visualize({min:0, max: 255,palette: ['black','white']}));
app.data.seaVelocity = ee.ImageCollection("HYCOM/sea_water_velocity");
app.data.seaDepths = ['0','2','4','6','8','10','12','15','20',
    '25','30','35','40','45','50','60','70','80','90',
    '100','125','150','200','250','300','350','400','500',
    '600','700','800','900','1000','1250','1500','2000',
    '2500','3000','4000','5000'
  ];
app.data.seaDataDepth = 0;
app.data.seaDataDate = '1992-10-02';
// define parámetros de visualización
app.data.visParamsOrto = {
  min: 0, 
  max: 255,
  gamma: 1.5,
  //bands: ['b1'],
};
app.data.visParamsAero = {
  min: 0, 
  max: 255, 
  bands: ['b1'],
  gamma: 1,
};
app.data.visParamsPlans = {
  min: 0, 
  max: 255, 
 // bands: ['b1'],
};
app.data.visParamsBathy = {
  min: -5000, 
  max: 5000, 
  palette: [
    '000088','0000FF','5555FF','8888FF','88AAFF', '71b4ce', 'e2a83b', 
    'afe096',  '30a15e', '74de24','247615',
    'eef765','973709','58dc9f','ffffff'],
};
app.data.visParamsSeaVel = {
  min: 0,
  max: 255,
  bands: ['R','G','B'],
  };
app.data.visParamsSeaFlow = {
  min: 1, 
  max: 25, 
  palette: ['#41007b','#2e3cff','#49baff','#59ffe2','#daffe4']
};
app.data.visParamsSeaVect = {
  min: 0, 
  max: 500, //lag/4, 
  bands: ['flowline'],
  palette: ['#41007b','#2e3cff','#49baff','#59ffe2','#daffe4']
  };
app.data.const = {
  delay: 5000,
  layerProperty: 'layer',
  styleProperty: 'style',
};
// opciones de inicialización de la app
app.data.option = {
  site: "Panteón Civil de Dolores", //"Campo Miilitar 1-F",
  lat: 19.388746, 
  lon: -99.228173,
  zoom: 16,
  tableId: 'projects/cnb-apps/assets/trazos_guerra_sucia/PCD_topo', 
  layerProperty: 'layer',
  styleProperty: 'style',
  layerName : 'PCD_topo',
  layerColor: '#ff0000',
  replaceLayers: false,
  multipleLayers: true,
  masked: false,
  split: true,
};
// Estilos por default
app.data.styleProperty = {
  Point: {
    color: 'red',
    pointSize: 5,
    pointShape: 'circle', 
    fillColor: "#00FFFF55",
    lineType: 'solid', 
    },
  MultiPoint: {
    color: 'red',
    pointSize: 5,
    pointShape: 'circle', 
    fillColor: "#00FFFF55",
    lineType: 'solid', 
    },
  Polygon: {
    color: 'red',
    width: 2.0,
    fillColor: "#00FFFF55",
    lineType: 'solid', 
    },
  MultiPolygon: {
    color: 'red',
    width: 2.0,
    fillColor: "#00FFFF55",
    lineType: 'solid', 
    },
  LineString: {
    color: 'red',
    width: 2.0,
    lineType: 'solid' 
    },
  MultiLineString: {
    color: 'red',
    width: 2.0,
    lineType: 'solid' 
    },
  LinearRing: {
    color: 'red',
    width: 2.0,
    lineType: 'solid' 
    },
  Ranges: {
    pointSize: {min: 1, max: 50, step: 1, value: 5},
    pointShape: ['circle', 'square', 'diamond', 'cross', 'plus', 'pentagram', 'hexagram', 'triangle', 'triangle_up', 'triangle_down', 'triangle_left', 'triangle_right', 'pentagon', 'hexagon', 'star5', 'star6',0], 
    width: {min: 1, max: 20, step: 0.5, value: 2.0},
    lineType: ['solid', 'dotted', 'dashed',0]
    },   
  };
//indicadores de estado
app.data.modifiedLayers = false;
app.data.editeGeoms = false;
app.data.events = {};
/******************************* Components ************************************
Use this section to define the widgets that are components of the app
********************************************************************************/
// Objetos del mapa
app.left = {};
app.right = {};
app.left.map = ui.Map();
app.right.map = ui.Map();
app.left.mapLayer = ui.Map.Layer({name: 'Trazos'});
app.right.mapLayer = ui.Map.Layer({name: 'Trazos'});
app.left.seaVelocity = ui.Map.Layer({name: 'Velocidad del mar'});
app.right.seaVelocity = ui.Map.Layer({name: 'Velocidad del mar'});
app.linker = ui.Map.Linker([app.left.map, app.right.map]);
app.spliter = ui.SplitPanel({
    orientation: 'horizontal',
    wipe: true,
    style: {stretch: 'both'},
    firstPanel: app.linker.get(0),
    secondPanel: app.linker.get(1),
});
app.data.features = ee.FeatureCollection([]); // aquí se acumularan lo editado
// Widgets
app.title = ui.Label(app.data.text.title);
app.author = ui.Label('By jsilvan');
app.intro = ui.Label(app.data.text.descr);
var sites = Object.keys(app.data.sites).sort();
app.left.site = ui.Select(sites,null);
app.left.enableDrawing = gui.toggleIcon([gui.Emoji.pencil,gui.Emoji.eye]);
app.left.downloadLink = ui.Label(gui.Emoji.disquete);
app.left.saveToAssets = gui.icon(gui.Emoji.cloud);
app.left.registerImage = gui.icon(gui.Emoji.pin);
app.left.applyMask = gui.toggleIcon([gui.Emoji.scissors,gui.Emoji.camera]);
app.left.bringFront = gui.icon(gui.Emoji.up);
app.left.sendBack = gui.icon(gui.Emoji.down);
app.left.showHelp = gui.icon(gui.Emoji.question);
app.left.dividePanel = gui.toggleIcon([gui.Emoji.popSquare,gui.Emoji.splitSquare]);
app.left.selSeaData = gui.icon(gui.Emoji.wave);
app.left.toggleLegend = gui.toggleIcon([gui.Emoji.map,gui.Emoji.times],0);
app.right.site = ui.Select(sites,null);
app.right.enableDrawing = gui.toggleIcon([gui.Emoji.pencil,gui.Emoji.eye]);
app.right.downloadLink = ui.Label(gui.Emoji.disquete);
app.right.saveToAssets = gui.icon(gui.Emoji.cloud);
app.right.registerImage = gui.icon(gui.Emoji.pin);
app.right.applyMask = gui.toggleIcon([gui.Emoji.scissors,gui.Emoji.camera]);
app.right.bringFront = gui.icon(gui.Emoji.up);
app.right.sendBack = gui.icon(gui.Emoji.down);
app.right.showHelp = gui.icon(gui.Emoji.question);
app.right.dividePanel = gui.toggleIcon([gui.Emoji.popSquare,gui.Emoji.splitSquare]);
app.right.selSeaData = gui.icon(gui.Emoji.wave);
app.right.toggleLegend = gui.toggleIcon([gui.Emoji.map,gui.Emoji.times],0);
// iconos del modo de trazo
app.loadDrawLayers = gui.icon(gui.Emoji.folder);
app.addDrawLayer = gui.icon(gui.Emoji.files);
app.configLayer = gui.icon(gui.Emoji.gear);
app.clearDrawings = gui.icon(gui.Emoji.trashcan);
app.centerLayer = gui.icon(gui.Emoji.zoomIn);
app.editProps = gui.icon(gui.Emoji.notes);
app.configGeoms = gui.icon(gui.Emoji.gear);
app.measureGeom = gui.icon(gui.Emoji.squad);
app.drawFlight = gui.icon(gui.Emoji.airplane);
app.flowLines = gui.icon(gui.Emoji.waveArrowR);
app.left.message = gui.lazyMessage('','#ffffffff','#ff0000ff');
app.right.message = gui.lazyMessage('','#ffffffff','#ff0000ff');
/******************************* Composition ************************************
Use this section arrange the widgets into Panels and panels on Map. All objects
are contained in the ui.root opject
********************************************************************************/
app.editBar = ui.Panel([
  app.editProps,
  app.configGeoms,
  app.measureGeom,
  app.drawFlight,
  app.flowLines,
  ],ui.Panel.Layout.flow('vertical'),{margin: '0px',padding: '0px',stretch: 'vertical',width: '29px'});
app.drawBar = ui.Panel([
  app.loadDrawLayers,
  //app.addDrawLayer,
  app.clearDrawings,
  app.configLayer,
  app.centerLayer,
  ],ui.Panel.Layout.flow('vertical'),{margin: '0px',padding: '0px',stretch: 'vertical',width: '29px'});
app.right.editBarPos = 'top-right';
app.left.editBarPos = 'top-left';
app.left.toolBar = ui.Panel([
  app.left.showHelp,
  app.left.dividePanel,
  app.left.enableDrawing,
  app.left.downloadLink,
  app.left.saveToAssets,
  app.left.site,
  app.left.applyMask,
  app.left.bringFront,
  app.left.sendBack,
  app.left.registerImage,
  app.left.selSeaData,
//  app.left.toggleLegend
  ],ui.Panel.Layout.flow('horizontal'),{position: 'bottom-center',margin: '0px',padding: '0px',stretch: 'horizontal',height: '29px'});
app.left.map.add(app.left.toolBar);
app.left.map.add(app.left.message);
app.right.toolBar = ui.Panel([
  app.right.showHelp,
  app.right.dividePanel,
  app.right.enableDrawing,
  app.right.downloadLink,
  app.right.saveToAssets,
  app.right.site, 
  app.right.applyMask,
  app.right.bringFront,
  app.right.sendBack,
  app.right.registerImage,
  app.right.selSeaData,
//  app.right.toggleLegend
  ],ui.Panel.Layout.flow('horizontal'),{position: 'bottom-center',margin: '0px',padding: '0px',stretch: 'horizontal',height: '29px'});
// Panel de leyendas
app.legendPanel = ui.Panel([
  ui.Label('Simbología',{fontSize: '20px',fontWeight: 'bold',textAlign: 'center',stretch: 'horizontal'}),
    //legends.features('Features',[layer.hilighted,layer.units,layer.max_extent]),
    legends.value('Ortofotos',app.data.visParamsOrto),
    legends.value('Aerofotos',app.data.visParamsAero),
    legends.value('Planos',app.data.visParamsPlans),
    legends.value('Elevación',app.data.visParamsBathy),
    legends.value('Lineas de flujo',app.data.visParamsSeaVect),
    legends.rgb('Matiz-Saturación',app.data.visParamsSeaVel),
    legends.value('Flujo Acumulado',app.data.visParamsSeaFlow),
    legends.features('Puntos',[{label: 'Bases Aereas', style: app.data.airbaseStyle}]),
  ],'flow',{width: legends.width});
app.left.map.add(app.left.toggleLegend);
//app.right.map.add(app.right.toggleLegend);
app.right.map.add(app.right.toolBar);
app.right.map.add(app.right.message);
ui.root.clear();
ui.root.widgets().add(app.spliter); // por default está activo el divisor
/******************************* Styling ************************************
Use this section to apply the styes to widgets. All visual appearence of your app is defined 
here.
********************************************************************************/
app.styles = {};
app.styles.fit = {margin: '0px',padding: '0px',height: '29px'};
app.styles.iconSize = {width: '29px',height:'29px',textAlign: 'center'}; // 
app.styles.hidden = {shown: false};
app.left.site.style()
  .set(app.styles.fit)
  .set({width: '300px'});
app.right.site.style()
  .set(app.styles.fit)
  .set({width: '300px'});
app.left.downloadLink
  .style()
  .set(app.styles.iconSize)
  .set(app.styles.fit);
app.right.downloadLink
  .style()
  .set(app.styles.iconSize)
  .set(app.styles.fit);
app.editBar.style().set({shown: false});
app.drawBar.style().set({shown: false});
app.left.message.style().set({position: 'top-center'});
app.right.message.style().set({position: 'top-center'});
app.left.toggleLegend.style().set({position: 'bottom-left'});
app.right.toggleLegend.style().set({position: 'bottom-left'});
/*** Funciones auxiliares***/
function randomColor(){
  return '#'+ Math.floor(Math.random()*15).toString(16)
    + Math.floor(Math.random()*15).toString(16)
    + Math.floor(Math.random()*15).toString(16)
    + Math.floor(Math.random()*15).toString(16)
    + Math.floor(Math.random()*15).toString(16)
    + Math.floor(Math.random()*15).toString(16);
}
// Obtiene las propiedaes de estilo de trazo desde un objeto
function getValidStyleProps(props){
   Object.keys(props)
    .forEach(function(key){
      var range = app.data.styleProperty.Ranges[key];
      var val = props[key];
      if(range !== undefined) {
        props[key] = range;
        if(key === 'pointSize' || key === 'width')
          props[key].value = val;
        else // lineType || pointShape
          props[key][props[key].length-1] = props[key].indexOf(val);
      }
    });
    return props;
}
// Agrega propiedades de estilo a una colección
function addStyleProp(col,name,multiple){
  var props = ee.Dictionary(app.data.styleProperty);
  if(multiple === false){
    // colorea todo del mismo color
    var color = randomColor();
    return col.map(function(f){
      f = ee.Feature(f);
      var style = ee.Dictionary(props.get(ee.String(f.geometry().type())))
        .set('color',color)
        .set('fillColor',color + '88');
      return f
        .set(app.data.const.styleProperty,style)
        .set(app.data.const.layerProperty,name);
    });
  } else {
    // colores aleatorios por capa
    return col
      .randomColumn('random',0,'uniform') // para generar color aleatorio
      .map(function(f){
        f = ee.Feature(f);
        // genera color
        var color = ee.String('#')
          .cat(f.getNumber('random')
            .multiply(256*256*256)
            .floor()
            .format('%06x'));
        var style = ee.Dictionary(props.get(ee.String(f.geometry().type())))
          .set('color',color)
          .set('fillColor',color.cat('88'));
        return f
          .set(app.data.const.styleProperty,style)
          .set(app.data.const.layerProperty,f.get(name));
      });
  }
}
// Aplana un propiedad objeto 'prop' o nueva propiedad objeto 'newprop'
function reshapeProp(col,prop,newprop){
  var separator = ':';
  if(newprop !== undefined)
   return col.map(function(f){
      f = ee.Feature(f);
      var props = f
        .toDictionary()
        .keys();
      var otherProps = props
        .filter(ee.Filter.stringStartsWith('item',prop).not());
      var oldnames = props
        .filter(ee.Filter.stringStartsWith('item',prop));
      var newnames = oldnames.map(function(key){
        key = ee.String(key);
        return key.slice(ee.Number(key.index(separator)).add(1));
        });
      var dict = f.select(oldnames)
        .toDictionary()
        .rename(oldnames,newnames);
      return ee.Feature(f.select(otherProps))
        .set(newprop,dict);
      });
  else
     return col.map(function(f){
      f = ee.Feature(f);
      var otherProps = f
        .toDictionary()
        .keys()
        .filter(ee.Filter.neq('item',prop))
        .filter(ee.Filter.stringStartsWith('item','system:').not()); // quita los campos de systema
      var dict = ee.Dictionary(f.get(prop));
      var oldnames = ee.List(dict.keys());
      var newnames = oldnames.map(function(key){
        return ee.String(prop).cat(separator).cat(key);
        });
      return ee.Feature(f.select(otherProps))
        .set(dict.rename(oldnames,newnames));
      });  
  }
// funcion para cambiar la proyección de la foto
function changeProj(img,ref,tar){
  var proj = img.projection();
  ref = ref.transform(proj,0.1);
  tar = tar.transform(proj,0.1);
  var getVertices = function(geometry) {
    return ee.Array(geometry
      .geometries()
      .map(function(geom){
        return ee.Geometry(geom)
          .coordinates();
        })
      .flatten())
      .reshape([-1,2]);
  };
  var ref_coords = getVertices(ref);
  var tar_coords = getVertices(tar);
  if(ee.Number(ref_coords.length().get([0])).neq(tar_coords.length().get([0])).getInfo()){
    return null;
  }
  // ajusta traslacción
  var mref = ee.List(ref_coords
    .reduce(ee.Reducer.mean(),[0])
    .toList()
    .get(0));
  var mtar = ee.List(tar_coords
    .reduce(ee.Reducer.mean(),[0])
    .toList()
    .get(0));
  // ajusta escalas
  var sref = ee.List(ref_coords
    .reduce(ee.Reducer.stdDev(),[0])
    .toList()
    .get(0));
  var star = ee.List(tar_coords
    .reduce(ee.Reducer.stdDev(),[0])
    .toList()
    .get(0));
  var xt = mref.getNumber(0).subtract(mtar.getNumber(0));
  var yt = mref.getNumber(1).subtract(mtar.getNumber(1));
  var xs = sref.getNumber(0).divide(star.getNumber(0));
  var ys = sref.getNumber(1).divide(star.getNumber(1));
  var xts = ee.Number(1).subtract(xs).multiply(mref.getNumber(0));
  var yts = ee.Number(1).subtract(ys).multiply(mref.getNumber(1));
  var proj_trans = proj
    .translate(xt,yt)
    //.scale(xs,ys)
    //.translate(xts,yts);
  return img.changeProj(proj,proj_trans);
}
// genera el polígono de la cobertura de un vuelo a partir de la
// geometría de punto (origen = destino)
// si (1-sen(w))/(1+sen(w)) >= (r1/r2)^2 || w < pi/2 gota
// si (1-sen(w))/(1+sen(w)) < (r1/r2)^2 || w >= pi/2 corona
var flightPolygon0 = function(origen){
  var tipo = {
    'IAI 201 ARAVA 2005' : {
       Potencia: 552*1000, // W
       Vcrucero: 319 *(1000/3600), // m/s
       Ventrada: 115 *(1000/3600), // m/s
       Peso: 3999, // Kg
       Tripulacion: 2, //
      }
    }
  var s = 2000; // longitud de arco entre muestras
  // parametros del sector
  var aeronave = origen.get('Aeronave').getInfo();
  var ttot = origen.getNumber('tVuelo').multiply(60); // seg
  var m = origen.getNumber('Pasajeros').add(tipo[aeronave].Tripulacion).multiply(80).add(tipo[aeronave].Peso); // kg
  var P = origen.getNumber('Potencia').multiply(tipo[aeronave].Potencia/100); // W
  var tc = m.divide(P).multiply((Math.pow(tipo[aeronave].Vcrucero,2)-Math.pow(tipo[aeronave].Ventrada,2))/2);
  //var r1 = tc.multiply(tipo[aeronave].Vcrucero).add(P.multiply(tc.pow(2)).divide(m.multiply(2))); // m
  var r1 = m.multiply(Math.pow(tipo[aeronave].Vcrucero,3)-Math.pow(tipo[aeronave].Ventrada,3)).divide(P.multiply(3)); // m
  var r2 = r1.add(ttot.divide(2).subtract(tc).multiply(tipo[aeronave].Vcrucero)); // m
  var a = origen.getNumber('RumboN').multiply(Math.PI/180); // a radianes
  var w = origen.getNumber('DesvMax').multiply(Math.PI/180); // a radianes
  var p = origen
    .geometry()
    .transform(WGS84_PROJ); // coordenadas proyectadas
  var p1 = p.coordinates(); 
  var corona = w.sin().multiply(-1).add(1).divide(w.sin().add(1))
    .lt(r1.divide(r2).pow(2)).or(w.gte(Math.PI/2));  
  var r = w.sin().divide(w.sin().add(1)).multiply(r2) // r2*sen(w)/(1+sen(w))
     .multiply(corona.not()).add(r2.multiply(corona));
  var p2 = ee.Array(p1).add(ee.Array([a.sin(),a.cos()])
    .multiply(r2.subtract(r))).toList();
  // calcula incremento angilar en los arcos circulares
  var inc1 = ee.Number(Math.PI*2).divide(r1.divide(s/(2*Math.PI*10)).ceil());
  var inc2 = ee.Number(-Math.PI*2).divide(r.divide(s/(2*Math.PI)).ceil());
  // calcula arreglos de angulos
  var end = a.subtract(w).add(corona.not().multiply(-Math.PI/2));
  var start = a.add(w).add(corona.not().multiply(Math.PI/2));
  var theta1 = ee.Array(ee.List.sequence(a.subtract(w),a.add(w),inc1));
  var theta2 = ee.Array(ee.List.sequence(start,end,inc2));
  // calcula coordenadas
  var x = ee.Array.cat([
    theta1.sin().multiply(r1).add(p1.get(0)),
    theta2.sin().multiply(r).add(p2.get(0))
  ]).toList();
  var y = ee.Array.cat([
    theta1.cos().multiply(r1).add(p1.get(1)),
    theta2.cos().multiply(r).add(p2.get(1))
  ]).toList();
  // crea la geometría
  var geom = ee.Geometry.Polygon(x.zip(y),WGS84_PROJ).transform(WGS84_GEOG);
  return origen.setGeometry(geom)
   .set({R2: r2, R1: r1});
};
// genera polígono de cobertura de vuelo a partir de la geometría de línea
// origen y destino dados por los extremos de la línea
var flightPolygon1 = function(ruta){
  var tipo = {
    'IAI 201 ARAVA 2005' : {
       Potencia: 552*1000, // W
       Vcrucero: 319 *(1000/3600), // m/s
       Ventrada: 115 *(1000/3600), // m/s
       Peso: 3999, // Kg
       Tripulacion: 2, //
      }
    };
  var s = 2000; // longitud de arco entre muestras
  // parametros del sector
  var aeronave = ruta.get('Aeronave').getInfo();
  var ttot = ruta.getNumber('tVuelo').multiply(60); // seg
  var m = ruta.getNumber('Pasajeros').add(tipo[aeronave].Tripulacion).multiply(80).add(tipo[aeronave].Peso); // kg
  var P = ruta.getNumber('Potencia').multiply(tipo[aeronave].Potencia/100); // W
  var tc = m.divide(P).multiply((Math.pow(tipo[aeronave].Vcrucero,2)-Math.pow(tipo[aeronave].Ventrada,2))/2);
  //var r1 = tc.multiply(tipo[aeronave].Vcrucero).add(P.multiply(tc.pow(2)).divide(m.multiply(2))); // m
  var r1 = m.multiply(Math.pow(tipo[aeronave].Vcrucero,3)-Math.pow(tipo[aeronave].Ventrada,3)).divide(P.multiply(3)); // m
  var w = ruta.getNumber('DesvMax').multiply(Math.PI/180); // a radianes
  var p = ruta
    .geometry()
    .transform(WGS84_PROJ,10)
    .coordinates(); // coordenadas proyectadas
  var p1 = ee.Array(p.get(0));
  var p2 = ee.Array(p.get(-1));
  var D = p2.subtract(p1); 
  var d = D.get([0]).hypot(D.get([1])); // distancia total
  var a = ee.Number(Math.PI/2).subtract(D.get([0]).atan2(D.get([1]))); // rumbo norte
  var r2 = d.subtract(r1.multiply(2)); // distancia en crucero
  var vc = r2.divide(tc).multiply(3.6); // velocidad en crucero km/h
  var p0 = p1.add(p2).divide(2);  
  var r = d.divide(2).multiply(w.sin());
  var inc1 = ee.Number(s/10).divide(r1);
  var inc2 = ee.Number(s).divide(r);
  var theta1 = ee.Array(ee.List.sequence(a.subtract(w),a.add(w),inc1));
  var theta2 = ee.Array(ee.List.sequence(a.add(w).multiply(-1),w.subtract(a),inc2));
  var theta3 = ee.Array(ee.List.sequence(a.subtract(w).add(Math.PI),a.add(w).add(Math.PI),inc1));
  var theta4 = ee.Array(ee.List.sequence(a.add(w).multiply(-1).add(Math.PI),w.subtract(a).add(Math.PI),inc2));
  var x = ee.Array.cat([
    theta1.sin().multiply(r1).add(p1.get([0])),
    theta2.cos().multiply(r).add(p0.get([0])),
    theta3.sin().multiply(r1).add(p2.get([0])),
    theta4.cos().multiply(r).add(p0.get([0])),
  ]).toList();
  var y = ee.Array.cat([
    theta1.cos().multiply(r1).add(p1.get([1])),
    theta2.sin().multiply(r).add(p0.get([1])),
    theta3.cos().multiply(r1).add(p2.get([1])),
    theta4.sin().multiply(r).add(p0.get([1])),
  ]).toList();
  var geom = ee.Geometry.Polygon(x.zip(y),WGS84_PROJ).transform(WGS84_GEOG);
  return ruta.setGeometry(geom)
   .set({R2: r2, R1: r1, RumboN: a.multiply(180/Math.PI), vCrucero: vc});
};
// obtiene la capa de velocidad oceanica como HSV
var getSeaVel = function(depth,date){
  return app.data.seaVelocity
    .filterDate(date[0],date[1])
    .first()
    .select(['velocity_u_' + depth,'velocity_v_' + depth],['u','v'])
    .resample('bilinear');
};
// Crea imagen de flujo a partir de datos de velocidad del mar
var seaVel2Flow = function(depth,date){
  var maxiter = 9, n = 8;
  var G = getSeaVel(depth,date);
  // define constantes
  var nei = ['nei_-1_-1','nei_0_-1','nei_1_-1','nei_1_0',
             'nei_1_1','nei_0_1','nei_-1_1','nei_-1_0']; // SO-S-SE-E-NE-N-NO-O
//  var neiang = [7*Math.PI/4,  0,        Math.PI/4,  Math.PI/2,
//                3*Math.PI/4,  Math.PI,  5*Math.PI/4,  3*Math.PI/2];
  var neiang = [Math.PI/4,  Math.PI/2, 3*Math.PI/4,  Math.PI,
                5*Math.PI/4,  6*Math.PI/4,  7*Math.PI/4,  0]; // inward
  var kernel = ee.Kernel.square(1.5, 'pixels'); 
  // dirección del -gradiente en el rango 0-2pi
  var thetaG = G
    .select(0)
    .atan2(G.select(1));
  var mask = G.select(0).hypot(G.select(1)).gte(0).selfMask();
  var theta = thetaG  
    .add(ee.Image.constant(Math.PI)); // descend dir
  // peso de vecinos W8
  var neiwei = theta
    .rename('nei')
    .neighborhoodToBands(kernel)
    .select(nei)
    .subtract(ee.Image.constant(neiang))
    .cos()
    .max(0)
    .pow(n)
    .divide(thetaG
      .subtract(ee.Image.constant(neiang))
      .cos()
      .max(0)
      .pow(n)
      .reduce(ee.Reducer.sum()));
  // implementa el ciclo de acumulación
  return ee.Image(ee.List.sequence(1,maxiter)
    .iterate(function(iter,prev){
      prev = ee.Image(prev);
      // pondera por el flujo acumulado en la iteración previa
      return prev
        .rename('nei')
        .neighborhoodToBands(kernel)
        .select(nei)
        .multiply(neiwei) // vecinos que fluyen al centro
        //.addBands([prev]) // los vecinos ya incluyen la accumulación previa
        .reduce(ee.Reducer.sum()) // acumula vecinos
        .add(1); // suma el centro
    },mask)
  ).rename('flow')
  .visualize(app.data.visParamsSeaFlow);  
};
// obtiene la capa de velocidad oceanica como lineas de flujo
var seaVel2Vect = function(depth,date){
  var width = 100;
  var lag = 2000;
  // selecciona vector de velocidades
  var vel = getSeaVel(depth,date).divide(1000/(lag/2));
  var speed = vel
    .select(0)
    .hypot(vel.select(1));
  // coordenadas respecto a grid
  var xy = ee.Image.pixelCoordinates(WGS84_PROJ);
  var rs = xy
    .divide(lag)
    .round()
    .multiply(lag)
    .subtract(xy);
  // coordenadas rotadas
  var cs = vel
    .divide(speed);
  var u = rs
    .select(0)
    .multiply(cs.select(0))
    .add(rs.select(1).multiply(cs.select(1)));
  var v = rs
    .select(0)
    .multiply(cs.select(1))
    .multiply(-1)
    .add(rs.select(1).multiply(cs.select(0)));
  var arrow = v
    .abs()
    .lt(width/2) // ancho
    .and(u.gt(-5*lag).and(u.lt(5*lag))) // largo
    .or(v.abs().add(u.abs()).lt(1.5*width).and(u.lt(0))); // cabeza
  return speed.updateMask(arrow)
    .rename('flowline')
    .visualize(app.data.visParamsSeaVect);
};
var seaVel2HSV = function(depth,date){
  var img = getSeaVel(depth,date);
  var u = img.select('u');
  var v = img.select('v');
  var speed = u.hypot(v).divide(500);
  var azimuth = v.atan2(u)
          .multiply(180/Math.PI)
          .add(180).divide(360);
  return ee.Image([azimuth,speed,speed])
      .hsvToRgb()
      .rename(['R','G','B'])
      .visualize(app.data.visParamsSeaVel);
};
/******************************* Behaviors ************************************
Use this section to define response to events, such as when the user click a button
or slide a slider. 
********************************************************************************/
// actualiza las capas
var updateLayers = function(){
  // agrega los trazos
  if (app.right.enableDrawing.state === 0)
      app.right.map.add(app.right.mapLayer);
  if (app.left.enableDrawing.state === 0)      
    app.left.map.add(app.left.mapLayer);
  // Agrega capa de bases aereas
  app.right.map.addLayer(app.data.airbases,{},'Bases Aéreas');
  app.left.map.addLayer(app.data.airbases,{},'Bases Aéreas');
  // Agrega capa de batimetría
  app.right.map.addLayer(app.data.bathymetry,app.data.visParamsBathy,'Elevación',false);
  app.left.map.addLayer(app.data.bathymetry,app.data.visParamsBathy,'Elevación',false);
};
// Menu selector de sitios
var updatePhotos = function(val){
  // remueve las capas previas
  app.right.map.layers().reset(); 
  app.left.map.layers().reset(); 
  // agrega las ortofotos disponibles a los dos paneles
  var imgo, imga, imgp;
  var years = app.data.sites[val].ortophotosBW;
  for(var i = years.length-1; i >= 0 ;i--) {
    imgo = app.data.ortophoto
      .filterDate(years[i]+'-01-01',(years[i]+1)+'-01-01');
    app.left.map.addLayer(imgo,app.data.visParamsOrto,'O-'+years[i].toString(),false);
    app.right.map.addLayer(imgo,app.data.visParamsOrto,'O-'+years[i].toString(),false);
  }
  // Agrega un compuestos anuales en cada panel 
  var refyears = app.data.sites[val].airphotos;
  for(i = refyears.length-1; i >= 0 ;i--) {
    imga = app.data.airphoto
      .filterDate(refyears[i]+'-01-01',(refyears[i]+1)+'-01-01');
    app.left.map.addLayer(imga,app.data.visParamsAero,'A-'+refyears[i].toString(),i===0);
    app.right.map.addLayer(imga,app.data.visParamsAero,'A-'+refyears[i].toString(),i===refyears.length-1);
  }
  // Agrega un compuestos anuales en cada panel 
  var planyears = app.data.sites[val].floorplans;
  for(i = planyears.length-1; i >= 0 ;i--) {
    imgp = app.data.floorplans
      .filterDate(planyears[i]+'-01-01',(planyears[i]+1)+'-01-01');
    app.left.map.addLayer(imgp,app.data.visParamsPlans,'P-'+planyears[i].toString(),false,0.7);
    app.right.map.addLayer(imgp,app.data.visParamsPlans,'P-'+planyears[i].toString(),false,0.7);
  }
  updateLayers();
};
// Menu selector de sitio (derecho)
var updateSite = function(val){
  // centra el mapa 
  var lon = app.data.sites[val].lon;
  var lat = app.data.sites[val].lat;
  app.left.map.setCenter(lon,lat,app.data.option.zoom);
  app.left.site.setValue(val,false);
  app.right.site.setValue(val,false);
  ui.url.set('site',val);
  updatePhotos(val);
};
app.right.site.onChange(updateSite);
// Menu selector de sitio (izquierdo)
app.left.site.onChange(updateSite);
// Boton de división en mapa doble
var toogleSplit = function(state,button){
  ui.root.clear();
  if(state === 0) {
    ui.root.widgets().add(app.spliter);
    app.right.dividePanel.setState(0);
    app.left.dividePanel.setState(0);      
  } else {
    ui.root.widgets().add(app.spliter.getFirstPanel());
    app.right.dividePanel.setState(1);
    app.left.dividePanel.setState(1); 
    //app.right.site.onChange(updateSite);
  }
  ui.url.set('split',state === 0);
};
app.right.dividePanel.onChange(toogleSplit);
app.left.dividePanel.onChange(toogleSplit);
// Callback del boton Leyenda
var showLegend = function(state,widget) {
  if(state)
    ui.root.insert(0,app.legendPanel);
  else
    ui.root.remove(app.legendPanel);
};
app.left.toggleLegend.onChange(showLegend);
app.right.toggleLegend.onChange(showLegend);
// Activa modo ediciófn
var onSelect = function(geom,layer,tool){
  tool.state = 'Editing'; // modo edición
  tool.selected = geom;
  print('Ready to EDIT!');
  app.editBar.style().set({shown: true});
  app.drawBar.style().set({shown: false});
  // busca el feature a partir de la geometría seleccionada
  var selected = ee.FeatureCollection([ee.Feature(geom)]);
  var candidates = app.data.features
        .filter(ee.Filter.eq(app.data.option.layerProperty,layer.getName()));
  app.data.target = ee.Feature(app.data.features
        .filter(ee.Filter.eq(app.data.option.layerProperty,layer.getName()))
        .filter(ee.Filter.withinDistance(1e-6,'.geo',geom))
        .first())
        .aside(print);
  var id = app.data.target.id();
  app.data.remainder = app.data.features
  .map(function(f){
    return f.set('selected',f.id().equals(id));
    })
    .filter(ee.Filter.eq('selected',false));
  app.data.editedGeom = false;
};
// actuaiza tras nuevo trazo
var onDraw = function(geom,layer,tool){
  var styleProperty;
  var name = layer.getName();
  print('drawing on ' + name + '...');
  geom.type().getInfo(
    function(type){
      styleProperty = app.data.styleProperty[type];
      styleProperty.color = layer.getColor();
      if(type !== 'LineString')
        styleProperty.fillColor = styleProperty.color + '88';
      var dict = {
        layer: name,
        style: styleProperty
      };
    app.data.features = 
        app.data.features.merge(
          ee.FeatureCollection([ee.Feature(geom,dict)])
        );
    app.data.modifiedLayers = true;
  });
};
// actualiza capas al borrar
var onErase = function(geom,layer,tool){
  tool.state = 'Stopped';
  tool.selected = null;
  print('Layer ' + tool.layer + ' ERASED');
  app.data.features = app.data.features
    .filter(ee.Filter.neq('.geo',geom));
  app.data.modifiedLayers = true;
  // desactiva herramientas de edición
  app.editBar.style().set({shown: false});
  app.drawBar.style().set({shown: true});
  app.configLayer.setShown(true);
  app.centerLayer.setShown(true);
};
// guarda ediciones
var saveEdit = function(tool){
  if(!app.data.editedGeom)
   return;
  print('Saving edition...!');
  app.data.features = app.data.remainder.merge(
    ee.FeatureCollection([app.data.target])
    );
  app.data.target = null;
  // actualiza ligas
  app.data.editedGeom = false;
  app.data.modifiedLayer = true;
  tool.state = 'Stopped';
  tool.selected = null;
};
// Adminstra varios eventos
var onLayerSelect = function(layer,tool){
  print('***');
  if(tool.state === 'Editing') {
  // actualiza dición
      saveEdit(tool);
      app.editBar.style().set({shown: false});
      app.drawBar.style().set({shown: true});
    } else {
      if(layer === null) {
        if(tool.layer !== null) {
          print('Drawing tool STOPPED!');
          app.editBar.style().set({shown: false});
          app.drawBar.style().set({shown: true});
          app.configLayer.setShown(false);
          app.centerLayer.setShown(false);
        }
        tool.state = 'Stopped';
        tool.layer = null;
      } else { 
        if (tool.state === 'Stopped') {
          if(tool.getShape() !== null) {
            print('Ready to DRAW');
          }
        } else {
          if (layer.getName() != tool.layer) {
            print('Layer ' + layer.getName() + ' SELECTED');
            app.configLayer.setShown(true);
            app.centerLayer.setShown(true);
        } 
        tool.layer = layer.getName(); 
      }
    }   
  }
};
// actualiza modo de trazo
var onShapeChange = function(mode,tool){
  if(mode === null) {
    tool.state = 'Stopped';      
  } else {
    print('Shape set to ' + mode.toUpperCase());
    tool.state = 'Drawing';  
  }
};
var onLayerAdd = function(layer,tool){
  app.data.modifiedLayers = true;
  tool.layer = layer.getName();
  print('New layer ' + tool.layer + ' ADDED');
};
// Abre el dialogo de configuración de capa estándar
var onLayerConfig = function(layer,tool){
  tool.unlisten(app.data.events.onLayerConfig);
  var name = layer.getName();
  var color = layer.getColor();
  var fillColor = color + "88";
  if(tool.layer !== null) {
    print('Layer ' + tool.layer + ' CONFIGURED as ' + name);
    var target = app.data.features
      .filter(ee.Filter.eq(app.data.const.layerProperty,tool.layer))
      .map(function(f){
        f = ee.Feature(f);
        var style = ee.Dictionary(f.get(app.data.const.styleProperty))
          .set('color',color)
          .set('fillColor',fillColor);
         return f.set(app.data.const.layerProperty,name)
                .set(app.data.const.styleProperty,style);
      });
    var remainder = app.data.features
      .filter(ee.Filter.neq(app.data.option.layerProperty,tool.layer));
    app.data.features = remainder.merge(target);
    tool.layer = name; // actualiza la selección
    app.data.modifiedLayers = true;
  }
};
// actualiza colección al remover una capa
var onLayerRemove = function(layer,tool){
  print('Layer ' + layer.getName() + ' REMOVED');
  tool.state = 'Stopped';
  app.data.features = app.data.features
      .filter(ee.Filter.eq(app.data.option.layerProperty,layer.getName()).not());
};
// activa la edición
var onEdit = function(geom,layer,tool){
  print('Geometry EDITED');
  app.data.target = ee.Feature(app.data.target)
    .setGeometry(geom);
  app.data.editedGeom = true;
};
// inicializa eventos de trazo
var setDrawEvents = function(tool){
  tool.state = 'Stopped';
  tool.layer = null;
  tool.selected = null;
  tool.onSelect(onSelect);
  tool.onDraw(onDraw);
  tool.onErase(onErase);
  tool.onLayerSelect(onLayerSelect);
  tool.onShapeChange(onShapeChange);
  tool.onLayerAdd(onLayerAdd);
  //tool.onLayerConfig(onLayerConfig);
  tool.onLayerRemove(onLayerRemove);
  tool.onEdit(ui.util.debounce(onEdit,500));
};
// reinicia la herramienta de trazo
var resetDrawingTool = function(tool){
  // oculta boton de guardado
  app.left.downloadLink.style().set({shown: false});      
  app.left.saveToAssets.setShown(false);
  app.right.downloadLink.style().set({shown: false});      
  app.right.saveToAssets.setShown(false);
  // inicializa
  tool.clear();
  setDrawEvents(tool);
};
// intercambia entre estados de trazo y visualización
var toggleDrawing =  function(state,side,other){
  if(state == 1) {
    if(other.enableDrawing.state)
      other.enableDrawing.toggles();
    print('Enabling drawingTool...');
    //side.enableDrawing.setLabel(gui.Emoji.watch);
    side.downloadLink.style().set({shown: false});      
    side.saveToAssets.setShown(false);
    other.downloadLink.style().set({shown: false});
    other.saveToAssets.setShown(false);
    app.draw = side.map.drawingTools()
      .setShown(true);
    app.draw.layers().reset(app.data.layers);
    setDrawEvents(app.draw);
    app.draw.state = 'Stopped';
    app.draw.layer = null; 
    side.map.add(app.editBar);
    app.editBar.style().set({position: side.editBarPos});
    side.map.add(app.drawBar);
    app.drawBar.style().set({position: side.editBarPos, shown: true});
    app.configLayer.setShown(false);
    app.centerLayer.setShown(false);
    side.map.remove(side.mapLayer);
    // reinicia boton izquierdo
    other.enableDrawing.setState(0);
  } else {
    print('Disabling drawingTool...');
    //if(app.data.target !== null)
    //  saveEdit();
    app.draw.setShown(false); 
    app.draw.stop().unlisten();
    // guarda copia de las geometrías
    app.data.layers = [];
    app.draw.layers().forEach(function(item,index){
        app.data.layers
          .push(ui.Map.GeometryLayer({
            geometries: [], 
            name: item.getName(), 
            color: item.getColor(),
            }).fromGeometry(item.toGeometry()));
    });
    app.draw.layers().reset();
    // actualiza el mapa
    side.map.remove(app.editBar);
    side.map.remove(app.drawBar);
    // actualiza las capas de trazos
    side.mapLayer
      .setEeObject(app.data.features
      .style({styleProperty: app.data.const.styleProperty}));
    other.mapLayer
      .setEeObject(app.data.features
      .style({styleProperty: app.data.const.styleProperty}));
    side.map.add(side.mapLayer);
    if(app.data.layers.length > 0) {
      // habilita botones de descarga
      other.downloadLink.style().set({shown: true});
      other.saveToAssets.setShown(true);
      side.downloadLink.style().set({shown: true});
      side.saveToAssets.setShown(true);
    }
    if(app.data.modifiedLayers)
      downloadRefresh();
  }
};
// Habilita el trazo en panel derecho
app.right.enableDrawing.onChange(function(state,button){
  toggleDrawing(state,app.right,app.left);
 });
// Habilita el trazo en panel izquierdo
app.left.enableDrawing.onChange(function(state,button){
  toggleDrawing(state,app.left,app.right);
 });
// Abre editor de estilos
var configGeom = function(button){
  print('Define styleProperty...');
  //button.setDisabled(true);
  app.editBar.style().set({shown: false});
  var type = app.draw.selected.type().getInfo();
  var fillable = (type !== 'LineString' && type !== 'LinearRing');
  // función de cierre de dialogo
  var onClose = function(result,handle){
    app.draw.getMap().remove(handle);
    //button.setDisabled(false);
    app.editBar.style().set({shown: true});
    if(result !== null) {
      // actualiza registro
      app.data.target = app.data.target
        .set(app.data.const.styleProperty,result);
      app.data.editedGeom = true;
      app.data.modifiedLayer = true;
      // transfiere el color el trazo a la capa
      var color = fillable?result.fillColor.slice(0,7):result.color.slice(0,7);
      app.draw
        .getSelected()
        .setColor(color);
    }
  };
  var labels = {
    ok: 'Aceptar',
    cancel: 'Cancelar',
    title: 'Ajusta los parametros de estilo'
  };
  // crea panel de edición a apartir del diccionary de propiedades
  ee.Dictionary(app.data.styleProperty[type]) // defaut
  .combine(
    ee.Dictionary(app.data.target
      .toDictionary()
      .get(app.data.const.styleProperty)
    )).evaluate(function(props,err){
      if(props === undefined) {
        props = app.data.styleProperty[type];
        button.setDisabled(false);
      }
      var dialog = gui.getVals(labels,onClose,getValidStyleProps(props));
      app.draw.getMap().add(dialog);
      //dialog.style().set({position: 'bottom-center'});
    }); 
  };
// Abre editor de propiedades
var editProps = function(button){
  print('Editing properties...')
  app.editBar.style().set({shown: false});
  var map = app.draw.getMap();
  // función de cierre de dialogo
  var onClose = function(result,handle){
    map.remove(handle);
    //button.setDisabled(false);
    app.editBar.style().set({shown: true});
    if(result !== null) {
      // actualiza registro
      print('updating target feature...',result)
      app.data.target = app.data.target
        .select([app.data.const.layerProperty])
        .set(result);
      app.data.modifiedLayers = true;
      app.data.editedGeom = true;
    }
  };
  var labels = {
    header : ['Atributo','Valor','-'],
    ok: 'Aceptar',
    cancel: 'Cancelar'
  };
  // crea panel de edición
  ee.Dictionary(app.data.target.aside(print)
    .toDictionary())
    .aside(print)
    .evaluate(function(props,err){
      if(props === undefined) {
        app.left.message.show(err,app.data.const.delay);
        app.right.message.show(err,app.data.const.delay);
        app.editBar.style().set({shown: true});
        return;
      }
      delete props[app.data.const.styleProperty];
      var dialog = gui.getPropVals(labels,onClose,props);
      map.add(dialog);
    });
  };
// abre dialogo de medición
var measureGeom = function(button){
  app.editBar.style().set({shown: false});
  var geom = ee.Geometry(app.draw.selected);
  var measures = {
    Polygon: {Área: geom.area(0.1), Perímetro: geom.perimeter(0.1)},
    LineString: {Longitud: geom.length(0.1)},
    Point: {Lon: geom.coordinates().get(0), Lat: geom.coordinates().get(1)},
  };
  var units = {
    Área: ' m^2', 
    Perímetro: ' m', 
    Longitud: ' m', 
    Lon: '°N', 
    Lat: '°O'
  };
  var precision = {
    Área: 4, 
    Perímetro: 2, 
    Longitud: 2, 
    Lon: 6, 
    Lat: 6
  };
  var type = app.draw.selected.type().getInfo();
  ee.Dictionary(measures[type])
    .evaluate(
      function(dict){
        var info = '';
        Object.keys(dict).forEach(function(key){
          info = info + key + ':\t' + dict[key].toFixed(precision[key]) + units[key]+ '\n';
        });
        var dialog = gui.inspector(info)
          .setPosition('top-center')
          .setWidth('150px')
          .setShown(true)
          .onClose(function(panel){
            app.editBar.style().set({shown: true});
            app.draw.getMap().remove(panel);
        });
        app.draw.getMap().add(dialog.panel);
    });
};
// Dialogo para definir polygono de un vuelo
var drawFlight = function(button){
  app.editBar.style().set({shown: false});
  var map = app.draw.getMap();
  var geom = ee.Geometry(app.draw.selected);
  var type = geom.type().getInfo();
  var flightPolygon, prompt;
  if(type == 'Point') {
   flightPolygon = flightPolygon0;
   prompt = {
    'NumVuelo': 'C00' + app.data.flightNum++,
    'Aeronave' : ['IAI 201 ARAVA 2005', 0],
    'Pasajeros' : {min: 0, max: 20, step: 1, value: 3},
    'tVuelo' : {min: 5, max: 300, step: 5, value: 30},
    'Potencia' : {min: 10, max: 100, step: 5, value: 50},
    'RumboN' : {min: 0, max: 360, step: 1, value: 180},
    'DesvMax' : {min: 1, max: 180, step: 1, value: 20},
    };  
  } else if(type == 'LineString') {
   flightPolygon = flightPolygon1;
    prompt = {
    'NumVuelo': 'C00' + app.data.flightNum++,
    'Aeronave' : ['IAI 201 ARAVA 2005', 0],
    'Pasajeros' : {min: 0, max: 20, step: 1, value: 3},
    'tVuelo' : {min: 5, max: 300, step: 5, value: 60},
    'Potencia' : {min: 10, max: 100, step: 5, value: 50},
    'DesvMax' : {min: 1, max: 90, step: 1, value: 30},
    }; 
  }else {
    var msg = 'Esta opción sólo está disponible puntos y lineas!';
      app.left.message.show(msg,app.data.const.delay);
      app.right.message.show(msg,app.data.const.delay);
      button.setDisabled(false);
    return;
  }
  // prepara dialogo
  var labels = {
    ok: 'Aceptar',
    cancel: 'Cancelar',
    title: 'Ajusta los parámetros de vuelo'
  };
  var onClose = function(props,handle){
    app.editBar.style().set({shown: true});
    app.draw.getMap().remove(handle);
    if(props !== null) {
      var fp = flightPolygon(ee.Feature(geom,props));
      var col = addStyleProp(ee.FeatureCollection([fp]),props.NumVuelo,false);
      loadDrawing(app.draw,col,false);
    }
  };
  // agrega dialog al mapa
  var dialog = gui.getVals(labels,onClose,prompt);
  map.add(dialog);
};
// Dialogo para definir geometría tras arrastre
var flowLines = function(button){
  app.editBar.style().set({shown: false});
  var map = app.draw.getMap();
  var geom = ee.Geometry(app.draw.selected);
  var dates = {
    start: '1992-10-02', 
    end: '2023-03-01', 
    value: app.data.seaDataDate, 
    period: 1
  };
  var depths = ['0','2','4','6','8','10','12','15','20',
    '25','30','35','40','45','50','60','70','80','90',
    '100','125','150','200','250','300','350','400','500',
    '600','700','800','900','1000','1250','1500','2000',
    '2500','3000','4000','5000', app.data.seaDataDepth
  ];
  var prompt = {    
    'Fecha': dates,
    'Profundidad': depths,
    'Iteraciones' : {min: 1, max: 100, step: 1, value: 10},
    'Incremento' : {min: 1, max: 59, step: 1, value: 10},
    'Unidades' : {'segundos': 1,'minutos' : 60,'horas': 3600},
    'Geometrias' : {
      'Posición final': ee.Filter.eq('name','displaced'),
      'Lineas de flujo': ee.Filter.eq('name','flowlines'),
      'Ambas': ee.Filter.neq('name','none'),
     },
  };
  // prepara dialogo
  var labels = {
    ok: 'Aceptar',
    cancel: 'Cancelar',
    title: 'Selecciona las opciones de simulación',
  };
  var onClose = function(result,panel){
    map.remove(panel);
    app.editBar.style().set({shown: true});
    app.flowLines.setLabel(gui.Emoji.watch);
    var milis = result.Incremento*result.Unidades*result.Iteraciones*1000-18*3600*1000;
    var name = app.draw.getSelected().getName() + 
      ' c/arrastre x ' + (new Date(milis)).toLocaleTimeString();
    if(result !== null){
     app.data.seaDataDepth = depths.indexOf(result.Profundidad);
      app.data.seaDataDate = result.Fecha;
      var seaVel = getSeaVel(result.Profundidad,app.data.seaDataDate)
        .multiply(result.Incremento * result.Unidades);
      var col = geometries.displace(geom,seaVel,result.Iteraciones)
        .filter(result.Geometrias);
      col.evaluate(function(res,err){
         app.flowLines.setLabel(gui.Emoji.waveArrowR);
          if(result === undefined){
            app.left.message.show(err,app.data.const.delay);
            return;
          }
          loadDrawing(app.draw,addStyleProp(col,name,false),false);
          });
    }
  };
  // agrega dialog al mapa
  var dialog = gui.getVals(labels,onClose,prompt);
  map.add(dialog);
};
app.editProps.onClick(editProps);
app.configGeoms.onClick(configGeom);
app.measureGeom.onClick(measureGeom);
app.drawFlight.onClick(drawFlight);
app.flowLines.onClick(flowLines);
// Actualiza la liga de descarga
var downloadRefresh = function(button){  
  var url = null;
  if (app.data.layers.length > 0) {
    var table = reshapeProp(app.data.features,app.data.const.styleProperty); 
    app.left.downloadLink.setValue(gui.Emoji.watch);
    app.right.downloadLink.setValue(gui.Emoji.watch);
    var sampFileName = 'Trazo' + Date.now();
    url = table
      .getDownloadURL({
        format: 'KML',
        filename: sampFileName,
      }); 
    ee.String(url).evaluate(
      // actualiza iconos de descaga
      function(u){
        // actualiza ligas
        if(u === undefined) {
          app.left.downloadLink
            .style()
            .set({shown: false});
          app.right.downloadLink
            .style()
            .set({shown: false});
          } else {
          app.left.downloadLink
            .setValue("💾")
            .setUrl(u)
            .style()
            .set({shown: true});
          app.right.downloadLink
            .setValue("💾")
            .setUrl(u)
            .style()
            .set({shown: true});
          app.data.modifiedLayers = false;
        }
      });
  } else {
    app.left.downloadLink.setUrl(null);
    app.right.downloadLink.setUrl(null);
  }
};
// boton de configuración de capa
app.configLayer.onClick(function(button){
  if(app.draw.getSelected() !== null) {
    app.draw.getSelected()
      .openConfigurationDialog();
    app.data.events.onLayerConfig = app.draw.onLayerConfig(onLayerConfig);  
  }
});
// centra el mapa en la capa
app.centerLayer.onClick(function(button){
  if(app.draw.getSelected() !== null)
    app.draw.getMap().centerObject(app.draw.getSelected().toGeometry());
});
// actualiza las capas
var loadDrawing = function(tool,col,replace){
  print('Loading drawing layers...');
  var geoms;
  geoms = ee.List(col.aggregate_array(app.data.const.layerProperty)
    .distinct()
    .map(function(val){
      var features =  col.filter(ee.Filter.eq(app.data.const.layerProperty,val));
      var style = ee.Dictionary(features.first().get(app.data.const.styleProperty));
      return ee.Dictionary({
        name: val,
        color: ee.String(style.get('fillColor')).slice(1,7),
        geometries: features.geometry(-0.1).geometries()});
      }));
  geoms.evaluate(function(list,err){
    if(list === undefined) {
      app.left.message.show(err,app.data.const.delay);
      app.right.message.show(err,app.data.const.delay);
      return;
    }
    tool.unlisten();
    var layers = list.map(function(obj) {
      return ui.Map.GeometryLayer(obj); 
    });
    if(replace === true) {
      app.data.features = ee.FeatureCollection([]);
      tool.layers().reset(layers);
    } else 
      tool.layers().add(layers[0]);
    app.data.features = app.data.features.merge(col);
    tool.getMap().centerObject(col);
    app.data.modifiedLayers = true;
    setDrawEvents(tool);
   });
};
// carga capa de trazos desde KML o colección
var getTable = function(){
  // intenta cargar como KML
   app.data.option.source = 'kml';
  var col = io.featureCollectionFromKML(app.data.option.tableId);
  var reshape = false;
  if(col === null) {
    col = ee.FeatureCollection(app.data.option.tableId); // intenta definiendo como    
    app.data.option.source = 'asset';
    reshape = true;
  } else 
    reshape = col
      .first()
      .get(app.data.const.styleProperty)
      .getInfo() === null;
  if(app.data.option.styleProperty === 'default')
    col = addStyleProp(col,app.data.option.layerProperty,app.data.option.multipleLayers);
  else if(reshape)
    col = reshapeProp(col,app.data.option.styleProperty,app.data.const.styleProperty);
  return col;
};
// dialogo para agregar capa de trazo
/*var addDrawLayer = function(button){
  button.setDisabled(true);
  app.editBar.style().set({shown: false});
  var labels = {ok: 'Aceptar', cancel: 'Cancelar', title: 'Agrega una Capa desde Repositiorio o KML'};
  var prompt = {
    //'Source' : ['GEE Asset','KML',0],    
    'Colección o código KML': app.data.option.tableId,
    'Nombre de la capa': app.data.option.layerName,
    'Color de la capa': randomColor() + '88',
  };
  var onClose = function(result,handle){
    app.draw.getMap().remove(handle);
    button.setDisabled(false);
    var col;
    if(result !== null) {
      if(result['Table ID or KML code'] === '')
       return;
      app.data.option.tableId = result['Colección o código KML'];
      app.data.option.layerProperty = result['Nombre de la capa'];
      app.data.option.layerColor = result['Color de la capa'];
      app.data.option.styleProperty = 'default';
      app.data.option.multipleLayers = false;
      col = getTable();
      if(app.data.option.source === 'asset'){
        ui.url.set('table',app.data.option.tableId);
        ui.url.set('style',app.data.const.styleProperty);
        ui.url.set('layer',app.data.const.layerProperty);
      }
      loadDrawing(app.draw,col,false);//
    }
  };
  var dialog = gui.getVals(labels,onClose,prompt);
  app.draw.getMap().add(dialog);
};
app.addDrawLayer.onClick(addDrawLayer);*/
// Carga capas de trazos desde colección o KML
var loadDrawLayers = function(button){
  button.setDisabled(true);
  var labels = {ok: 'Aceptar', cancel: 'Cancelar', title: 'Carga trazos desde Colección o KML'};
  var prompt = {
    'Colección o código KML': app.data.option.tableId,
    'Separa capas': app.data.option.multipleLayers,
    'Nombre capas': app.data.option.layerProperty,
    'Estilo capas': app.data.option.styleProperty,
    'Reemplaza trazos': true,
    };
  var onClose = function(result,handle){
    button.setDisabled(false);
    app.draw.getMap().remove(handle);
    if(result !== null) {
      if(result['Table ID or KML code'] === '')
        return;
      app.data.option.tableId = result['Colección o código KML'];
      app.data.option.multipleLayers = result['Separa capas'];
      app.data.option.layerProperty = result['Nombre capas'];
      app.data.option.styleProperty = result['Estilo capas'];
      app.data.option.replaceLayers = result['Reemplaza trazos'];
      var col = getTable();
      if(app.data.option.source === 'asset'){
        ui.url.set('table',app.data.option.tableId);
        ui.url.set('style',app.data.option.styleProperty);
        ui.url.set('layer',app.data.option.layerProperty);
      }
      loadDrawing(app.draw,col,app.data.option.replaceLayers);
    }
  };
  var dialog = gui.getVals(labels,onClose,prompt);
  app.draw.getMap().add(dialog);
};
app.loadDrawLayers.onClick(loadDrawLayers);
// Guarda capa de trazos como asset (solo en modo desarrollo)
var saveToAssets = function(button){
  // Serializa styleProperty para guardar
  var table = reshapeProp(app.data.features,app.data.const.styleProperty); 
  var sampFileName = 'Trazo' + Date.now();
  Export.table.toAsset({
    collection: table, 
    description: 'sampFileName', 
    assetId: app.data.rootPath + sampFileName, 
    //maxVertices: 1e10
  });
  app.left.saveToAssets.setShown(false);
  app.right.saveToAssets.setShown(false);
  //ui.url.set('drawing',sampFileName);
};
app.left.saveToAssets.onClick(saveToAssets);
app.right.saveToAssets.onClick(saveToAssets);
// Borra todos los trazos
var clearDrawings = function(button){
  button.setDisabled(true);
  var map = app.draw.getMap();
  var labels = {
    ok: 'Proceder',
    cancel: 'Cancelar',
    title: 'Se borraran todos lo trazos. ¿Quieres proceder?'
    };
  var onClose = function(result,panel){
    map.remove(panel);
    button.setDisabled(false);
    if(result !== null) {
      app.data.features = ee.FeatureCollection([]);
      resetDrawingTool(app.draw); 
    }
  };
  var dialog = gui.getVals(labels,onClose,{});
  map.add(dialog);
};
app.clearDrawings.onClick(clearDrawings);
// Abre dialogo para registro de images
var registerImage = function(button,map,message){
  // determina si hay geometrias disponibles
  if(app.draw.layers().length() < 2){
    message.show('¡Se requiren dos geometrías!',app.data.const.delay);
    return;
  }
  // determina si hay capas de fotos visibles
  var selectedLayer = map.layers()
    .getJsArray()
    .filter(function(layer){
      return layer.getShown() && layer.getName()[0] == 'A';
      });
  if(selectedLayer.length === 0) {
    message.show('¡Se require capa de aerofotos activa!',app.data.const.delay);
    return;
  }
  // hay condiciones
  button.setDisabled(true);
  selectedLayer = selectedLayer[0];
  // prepara el dialogo  
  var labels = {
    ok: 'Aplicar',
    cancel: 'Cancelar',
    title: 'Selecciona las Geometrías Apareadas'
  };
  var names = [];
  app.draw.layers()
    .forEach(function(layer){
      names.push(layer.getName());
    });
  names.push(0); // valor por default
  var prompt = {
    "Origen" : names,
    "Destino" : names,
   // "Ajustar escala" : true,
  };
  // funcion de cierre del dialogo
  var onClose = function(result,panel){
    map.remove(panel);
    button.setDisabled(false);
    if(result !== null){
      var ref = app.draw.layers()
        .getJsArray()
        .filter(function(layer){
          return layer.getName() === result["Destino"];
          })[0].toGeometry();
      var tar = app.draw.layers()
        .getJsArray()
        .filter(function(layer){
          return layer.getName() === result["Origen"];
          })[0].toGeometry();
      var col = selectedLayer.getEeObject();
      // selecciona la fot de encima
      var photo = ee.Image(col
        .filterBounds(tar)
        .toList(10)
        .get(-1));
      var newphoto = changeProj(photo,ref,tar);
      if(newphoto === null){
        message.show("¡Número de vertices es incompatible!",app.data.const.delay);
        return;
      }
      var newcol = 
          col.filter(ee.Filter.eq('system:index',photo.id()).not())
          .merge(ee.ImageCollection(newphoto));
      selectedLayer.setEeObject(newcol);
      button.setDisabled(false);
    }
  };
  // crea el dialogo y lo agrega al mapa
  var dialog = gui.getVals(labels,onClose,prompt);
  map.add(dialog);
};
app.left.registerImage
  .onClick(function(button){
    registerImage(button,app.left.map,app.left.message);
  });
app.right.registerImage
.onClick(function(button){
    registerImage(button,app.right.map,app.right.message);
  });
// aplica/quita mascara de las fotos
var applyMask = function(state,button){
  // define collección de aerofotos
  var colections = [
    'projects/inegi-datos/assets/Aerofoto',
    'projects/ee-centrogeo/assets/Aerofoto'
  ];
  app.data.airphoto = ee.ImageCollection(colections[state])
      .select('b1');
  var refyears = app.data.sites[app.right.site.getValue()].airphotos;
  // busca capa por nombre
  var getLayer = function(map,name){
    var layer = map.layers()
      .getJsArray()
      .filter(function(item){
        return item.getName() === name;
      });
    return layer[0];
  };
  // actualiza capas
  for(var i = refyears.length-1; i >= 0 ;i--) {
    var imga = app.data.airphoto
      .filterDate(refyears[i]+'-01-01',(refyears[i]+1)+'-01-01');
    var layerName = 'A-'+refyears[i].toString();
    getLayer(app.left.map,layerName)
      .setEeObject(imga);
    getLayer(app.right.map,layerName)
      .setEeObject(imga);
  }
  ui.url.set('masked',state === 1);
};
app.left.applyMask.onChange(function(state,button){
  app.right.applyMask.setState(state);
  applyMask(state,button);
});
app.right.applyMask.onChange(function(state,button){
  app.left.applyMask.setState(state);
  applyMask(state,button);
});
var showHelp = function(button){
  app.left.showHelp.setDisabled(true);
  app.right.showHelp.setDisabled(true);
  var dialog = function(){
    var help = gui.inspector(app.data.text.descr)
    .setPosition('top-center')
    .setWidth('500px')
    .setShown(true)
    .onClose(function(panel){
      app.left.map.remove(leftHelp);
      app.right.map.remove(rightHelp);
      app.left.showHelp.setDisabled(false);
      app.right.showHelp.setDisabled(false);
    });
    return help.panel;
  };
  var leftHelp = dialog();
  var rightHelp = dialog();
  app.left.map.add(leftHelp);
  app.right.map.add(rightHelp);
};
app.left.showHelp.onClick(showHelp);
app.right.showHelp.onClick(showHelp);
var bringFront = function(button,map,message,top){
  button.setDisabled(true);
  // encuentra la primera capa visible
  var clickedLayer = map.layers()
    .getJsArray()
    .filter(function(layer){
      return layer.getShown() && layer.getName()[0] == 'A';
      });
  if(clickedLayer.length === 0) {
    message.show('No hay capa de Aerofotos visible!',app.data.const.delay);
    button.setDisabled(false);
    return;
  }
  map.style().set({cursor: 'crosshair'});
  clickedLayer = clickedLayer[0]; // se queda con la primera
  // determina la colección del compuesto
  var col = clickedLayer.getEeObject();
  // escucha siguiente evento de click en mapa
  app.data.events.onMapClick = map
    .onClick(function(coords){
      // crea filtro por ubicación
      var clickedImage = ee.Filter.bounds(ee.Geometry.Point(coords.lon,coords.lat));
      // reordena coleccción
      if(top)
        clickedImage = clickedImage.not();
      var newcol = col.filter(clickedImage)
            .merge(col.filter(clickedImage.not()));
      // actualiza capa
      clickedLayer.setEeObject(newcol);     
      // configura para volver al estado original
      button.setDisabled(false);
      map.style().set({cursor: 'hand'});
      map.unlisten(app.data.events.onMapClick);
    });
};
app.left.bringFront.onClick(function(but){
  bringFront(but,app.left.map,app.left.message,true);
});
app.right.bringFront.onClick(function(but){
  bringFront(but,app.right.map,app.right.message,true);
});
app.left.sendBack.onClick(function(but){
  bringFront(but,app.left.map,app.left.message,false);
});
app.right.sendBack.onClick(function(but){
  bringFront(but,app.right.map,app.right.message,false);
});
// Dialogo para seleccionar capa de velocidad del mar
var selectSeaData = function(button,map){
  // define valores de dialogo
  var labels = {
    ok: 'Aceptar', 
    cancel: 'Cancelar', 
    title: 'Modelo Oceánico de Velocidades'
  };
  var dates = {
    start: '1992-10-02', 
    end: '2023-03-01', 
    value: app.data.seaDataDate, 
    period: 1
  };
  var depths =  ['0','2','4','6','8','10','12','15','20',
    '25','30','35','40','45','50','60','70','80','90',
    '100','125','150','200','250','300','350','400','500',
    '600','700','800','900','1000','1250','1500','2000',
    '2500','3000','4000','5000', app.data.seaDataDepth
  ];
  var prompt = {
    'Fecha': dates,
    'Profundidad': depths,
    'Visualizacion': {
      'Líneas de flujo': seaVel2Vect, 
      'Matiz-saturación': seaVel2HSV, 
      'Flujo acumulado': seaVel2Flow
    },
  };
  // funcion de cierre del dialogo
  var onClose = function(result,panel){
    map.remove(panel);
    button.setDisabled(false);
    if(result !== null){
      app.data.seaDataDepth = depths.indexOf(result.Profundidad);
      app.data.seaDataDate = result.Fecha;
      var layerName = 'Vel@' + result.Profundidad + 'm, ' + 
        new Date(result.Fecha[0]).toLocaleDateString();
      var seaImage = result.Visualizacion(result.Profundidad,app.data.seaDataDate);
      map.addLayer(seaImage,{},layerName,true);
      app.data.seaDataDate = result.Fecha[0];
      button.setDisabled(false);
    }
  };
  var dialog = gui.getVals(labels,onClose,prompt);
  map.add(dialog);
};
app.right.selSeaData.onClick(function(button){
  selectSeaData(button,app.right.map);
 });
app.left.selSeaData.onClick(function(button){
  selectSeaData(button,app.left.map);
 });
/******************************* Inicialization ************************************
Use this section to define the initial values of your widgets. You may also process the url
parameters to customize the App at startup.
********************************************************************************/
// optionen parametros de inicio
app.data.option.site = ui.url.get('site',app.data.option.site);
app.data.option.split = ui.url.get('split',app.data.option.split);
app.data.option.lon = ui.url.get('lon',null);
app.data.option.lat = ui.url.get('lat',null);
if(app.data.option.lon === null || app.data.option.lat === null) {
  app.data.option.lon = app.data.sites[app.data.option.site].lon;
  app.data.option.lat = app.data.sites[app.data.option.site].lat;
}
app.data.option.zoom = ui.url.get('zoom',app.data.option.zoom);
app.data.option.tableId = ui.url.get('table',app.data.option.tableId);
app.data.option.layerProperty = ui.url.get('layer',app.data.option.layerProperty);
app.data.option.styleProperty = ui.url.get('style',app.data.option.styleProperty);
app.data.option.singleLayer = ui.url.get('singleLayer',app.data.option.singleLayer);
app.data.option.masked = ui.url.get('masked',app.data.option.masked);
app.left.map.setOptions("HYBRID");
app.right.map.setOptions("HYBRID");
// inicializa las herramientas de trazo
//app.left.map.drawingTools().setShown(false);
//app.right.map.drawingTools().setShown(false);
app.right.site.setValue(app.data.option.site); 
// activa las herramientas de trazo en el panel derecho
app.right.enableDrawing.toggles();
if(app.data.option.tableId !== null) 
  loadDrawing(app.draw,getTable(),true);
// centra el mapa
app.right.map = app.right.map
  .setCenter(app.data.option.lon, app.data.option.lat, app.data.option.zoom);
// aplica mascara
if(app.data.option.masked)
  app.left.applyMask.toggles();
// desactiva el divisor
if(app.data.option.split === false)
  ui.util.setTimeout(function(){
    app.left.dividePanel.toggles();
    }, 300);
// actualiza parámetros de posición y acercamiento
app.right.map.onIdle(function(center,map){
  ui.url.set('lon',center.lon);
  ui.url.set('lat',center.lat);
  ui.url.set('zoom',center.zoom);
});