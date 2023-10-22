var nx_cantones = ui.import && ui.import("nx_cantones", "table", {
      "id": "users/adrrod44/Almanaque/nxcantones"
    }) || ee.FeatureCollection("users/adrrod44/Almanaque/nxcantones");
//Panel para la detección de Cambios Mediante la plataforma de GEE
ui.root.clear();
var map = ui.Map();
var map_1 = ui.Map();
var map_2 = ui.Map();
var map_3 = ui.Map();
var map_4 = ui.Map();
//Dibuja una geometría
{
var drawingTools = map.drawingTools();
drawingTools.setShown(false);
drawingTools.onDraw(function() {
  drawingTools.setShape(null);
});
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: 'cd00cd'});
drawingTools.layers().add(dummyGeometry);
}
//Función para limpiar geometrías
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
//Función para dibujar geometrías
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
//Función que activa el desplegador de imágenes
var i = 0;
var p = 0;
var img_x = [];
var img_y = [];
var plt_sate = []
function displayMapImg(button) {
  var imgId = button.style().get('whiteSpace');
  var imgIdShort = imgId.split('/')[2];
  var img = ee.Image(imgId);
  plt_sate = plataforma.getValue();
  switch (plt_sate) {
    case 'Landsat 5':
      var opticalBands = img.select('SR_B.').multiply(0.0000275).add(-0.2);
      var thermalBand = img.select('ST_B6').multiply(0.00341802).add(149.0);
      img = img.addBands(opticalBands, null, true).addBands(thermalBand, null, true);
    break;
  }
  img_x[i] = img;
  map.centerObject(img, 9);
  map.addLayer(img_x[i], RBG_VIS_pre, "Imagen "+i+" pre-evento");
  i=i+1;
  print ("imagen x: ", img_x);
}
function displayMapImg_1(button) {
  var imgId = button.style().get('whiteSpace');
  var imgIdShort = imgId.split('/')[2];
  var img = ee.Image(imgId);
  plt_sate = plataforma_1.getValue();
  switch (plt_sate) {
    case 'Landsat 5':
      var opticalBands = img.select('SR_B.').multiply(0.0000275).add(-0.2);
      var thermalBand = img.select('ST_B6').multiply(0.00341802).add(149.0);
      img = img.addBands(opticalBands, null, true).addBands(thermalBand, null, true);
    break;
  }
  img_y[p] = img;
  map_1.centerObject(img, 9);
  map_1.addLayer(img_y[p], RBG_VIS, "Imagen "+p+" pre-evento");
  p=p+1;
}
//funcion para limpiar imagenes
function clearImgs() {
  while (map.layers().length() > 0) {
    map.layers().remove(map.layers().get(0));
  }
  imgCardPanel.clear();
}
function clearImgs_1() {
  while (map_1.layers().length() > 0) {
    map_1.layers().remove(map_1.layers().get(0));
  }
  imgCardPanel_1.clear();
}
function clearImgs_2() {
  while (map_2.layers().length() > 0) {
    map_2.layers().remove(map_2.layers().get(0));
  }
}
//Funcion para factor de escala
// Landsat 5
function applyScaleFactors_lt5(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBand = image.select('ST_B6').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBand, null, true);
}
//Función para obtener la colección
//Obtencion de la coleccion
var S2_SR_COL = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED");
var RBG_VIS = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 2700,
  gamma: 1.3
}; 
var RBG_VIS_pre = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 2700,
  gamma: 1.3
}; 
var RBG_VIS_post = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 2700,
  gamma: 1.3
}; 
var j = 0;
function getCol() {
  var endDate = tiempo[j+1].getValue();
  var startDate = tiempo[j].getValue();
  var pointGeom = drawingTools.layers().get(0).getEeObject();
  //var pointGeom = nxcantones.filter(ee.Filter.eq("DPA_DESCAN", "EL CHACO"));
  if (j === 0){
  var sat = plataforma.getValue();
  var cldThrsh = maxCldCvr.getValue();
  } else {
      sat = plataforma_1.getValue(); 
      cldThrsh = maxCldCvr_1.getValue();
  }
  switch (sat) {
    case 'Sentinel 2':
      S2_SR_COL = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED").filterBounds(pointGeom)
    .filterDate(startDate, endDate)
    .filter(ee.Filter.lte('CLOUDY_PIXEL_PERCENTAGE', cldThrsh));
      RBG_VIS = {
        bands: ['B4', 'B3', 'B2'],
        min: 0,
        max: 2700,
        gamma: 1.3
      };
    break;
//------------------------------------------------------------------------------------------------------
    case 'Landsat 8':
      S2_SR_COL = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2").filterBounds(pointGeom)
    .filterDate(startDate, endDate)
    .filter(ee.Filter.lte('CLOUD_COVER_LAND', cldThrsh));
      RBG_VIS = {
        bands: ["SR_B4","SR_B3","SR_B2"],
        gamma: 1.8820000000000001,
        max: 44167.56,
        min: 7234.4400000000005,
        opacity: 1
      }
    break;
//-----------------------------------------------------------------------
    case 'Landsat 7':
      S2_SR_COL = ee.ImageCollection("LANDSAT/LE07/C02/T1_L2").filterBounds(pointGeom)
    .filterDate(startDate, endDate)
    .filter(ee.Filter.lte('CLOUD_COVER_LAND', cldThrsh));
      RBG_VIS = {
        bands: ["SR_B3","SR_B2","SR_B1"],
        gamma: 1.8820000000000001,
        max: 44167.56,
        min: 7234.4400000000005,
        opacity: 1
      }
    break;
//--------------------------------------------------------------------------
    case 'Landsat 5':
      S2_SR_COL = ee.ImageCollection("LANDSAT/LT05/C02/T1_L2").filterBounds(pointGeom)
    .filterDate(startDate, endDate)
    .filter(ee.Filter.lte('CLOUD_COVER_LAND', cldThrsh))
    .map(applyScaleFactors_lt5);
      RBG_VIS = {
        bands: ['SR_B3', 'SR_B2', 'SR_B1'],
        min: 0.0,
        max: 0.3,
      };
    break;
  }
  return S2_SR_COL
    .map(function(img) {
      var date = img.date().format('YYYY-MM-dd');
      return img.set('date', date);
    })
    .sort('system:time_start', false)
    .map(function(img) {
      return img.set({info: {
        id: img.id(),
        date: img.get('date'),
        dateEnd: img.date().advance(1, 'day').format('YYYY-MM-dd'),
        crs: img.select([0]).projection().crs(),
      }});
    });
}
//Activa el buscador de imágenes
function displayBrowseImg() {
  i=0;
  img_x = [];
  clearImgs();
  waitMsg.style().set('shown', true);
  imgCardPanel.add(waitMsg);
  var imgList = getCol();
  var imgInfoList = imgList.reduceColumns(ee.Reducer.toList(), ['info']).get('list');
  imgInfoList.evaluate(function(imgInfoList) {
    waitMsg.style().set('shown', false);
    imgInfoList.forEach(function(imgInfo) {
    var sat = plataforma.getValue();
    switch (sat) {
    case 'Sentinel 2':
      var imgsat = ee.Image('COPERNICUS/S2_SR_HARMONIZED'+'/'+imgInfo.id);
      var RBG_VIS_sat = {
        bands: ['B4', 'B3', 'B2'],
        min: 0,
        max: 2700,
        gamma: 1.3
      };
      var imgId_sat = 'COPERNICUS/S2_SR_HARMONIZED'+'/'+imgInfo.id;
      var importId_sat = "ee.Image('COPERNICUS/S2_SR_HARMONIZED"+"/"+imgInfo.id+"')";
    break;
//------------------------------------------------------------------------------------------------------
    case 'Landsat 8':
      imgsat = ee.Image('LANDSAT/LC08/C02/T1_L2'+'/'+imgInfo.id);
      RBG_VIS_sat = {
        bands: ["SR_B4","SR_B3","SR_B2"],
        gamma: 1.8820000000000001,
        max: 44167.56,
        min: 7234.4400000000005,
        opacity: 1
      };
      imgId_sat = 'LANDSAT/LC08/C02/T1_L2'+'/'+imgInfo.id;
      importId_sat = "ee.Image('LANDSAT/LC08/C02/T1_L2"+"/"+imgInfo.id+"')";
    break;
//-----------------------------------------------------------------------
    case 'Landsat 7':
      imgsat = ee.Image('LANDSAT/LE07/C02/T1_L2'+'/'+imgInfo.id);
      RBG_VIS_sat = {
        bands: ["SR_B3","SR_B2","SR_B1"],
        gamma: 1.8820000000000001,
        max: 44167.56,
        min: 7234.4400000000005,
        opacity: 1
      };
      imgId_sat = 'LANDSAT/LE07/C02/T1_L2'+'/'+imgInfo.id;
      importId_sat = "ee.Image('LANDSAT/LE07/C02/T1_L2"+"/"+imgInfo.id+"')";
    break;
//--------------------------------------------------------------------------
    case 'Landsat 5':
      imgsat = ee.Image('LANDSAT/LT05/C02/T1_L2'+'/'+imgInfo.id);
      var opticalBands = imgsat.select('SR_B.').multiply(0.0000275).add(-0.2);
      var thermalBand = imgsat.select('ST_B6').multiply(0.00341802).add(149.0);
      imgsat = imgsat.addBands(opticalBands, null, true).addBands(thermalBand, null, true);
      RBG_VIS_sat = {
        bands: ['SR_B3', 'SR_B2', 'SR_B1'],
        min: 0.0,
        max: 0.3,
      };
      imgId_sat = 'LANDSAT/LT05/C02/T1_L2'+'/'+imgInfo.id;
      importId_sat = "ee.Image('LANDSAT/LT05/C02/T1_L2"+"/"+imgInfo.id+"')";
    break;
  }
      var img = imgsat;
      RBG_VIS_pre = RBG_VIS_sat;
      var visImg = img.visualize(RBG_VIS_pre);
      var thumbnail = ui.Thumbnail({
        image: visImg,
        params: {
          dimensions: '295', // '295x295'
          crs: imgInfo.crs
        },
        style: {margin: '6px 8px 8px 8px'}
      });
      var imgId = imgId_sat;
      var importId = importId_sat;
      var startDateVar = "START_DATE = '" + imgInfo.date + "'\n";
      var endDateVar = "END_DATE = '" + imgInfo.dateEnd + "'\n";
      var cloudFilter = "CLOUD_FILTER = " + maxCldCvr.getValue().toString(); 
      var nbInfo = startDateVar + endDateVar + cloudFilter;
      var nbInfoLabel = ui.Label(nbInfo, {fontFamily: 'monospace', fontSize: '10px', whiteSpace: 'pre', backgroundColor: '#d3d3d3', padding: '4px', margin: '0px 8px 0px 8px', stretch: 'horizontal'}); 
      var imgCard = ui.Panel([
        ui.Panel([
          ui.Label(imgInfo.date, {padding: '6px 0px 0px 0px', fontSize: '16px', fontWeight: 'bold', width: '88px'}),
          ui.Button({label: 'añadir al mapa', onClick: displayMapImg, style: {whiteSpace: imgId, width: '90px', margin: '8px 0px 6px 120px'}}),
        ], ui.Panel.Layout.flow('horizontal')),
        nbInfoLabel,
        thumbnail
      ], null, {margin: '4px 0px 0px 4px' , width: '320px'});
      imgCardPanel.add(imgCard);
    });
  });
}
function displayBrowseImg_1() {
  p=0;
  clearImgs_1();
  map_1.addLayer(Zona_estudio,{color: "red", opacity: 0.3},"Area de estudio");
  waitMsg_1.style().set('shown', true);
  imgCardPanel_1.add(waitMsg_1);
  var imgList = getCol();
  var imgInfoList = imgList.reduceColumns(ee.Reducer.toList(), ['info']).get('list');
  imgInfoList.evaluate(function(imgInfoList) {
    waitMsg_1.style().set('shown', false);
    imgInfoList.forEach(function(imgInfo) {
    var sat = plataforma_1.getValue();
    switch (sat) {
    case 'Sentinel 2':
      var imgsat = ee.Image('COPERNICUS/S2_SR_HARMONIZED'+'/'+imgInfo.id);
      var RBG_VIS_sat = {
        bands: ['B4', 'B3', 'B2'],
        min: 0,
        max: 2700,
        gamma: 1.3
      };
      var imgId_sat = 'COPERNICUS/S2_SR_HARMONIZED'+'/'+imgInfo.id;
      var importId_sat = "ee.Image('COPERNICUS/S2_SR_HARMONIZED"+"/"+imgInfo.id+"')";
    break;
//------------------------------------------------------------------------------------------------------
    case 'Landsat 8':
      imgsat = ee.Image('LANDSAT/LC08/C02/T1_L2'+'/'+imgInfo.id);
      RBG_VIS_sat = {
        bands: ["SR_B4","SR_B3","SR_B2"],
        gamma: 1.8820000000000001,
        max: 44167.56,
        min: 7234.4400000000005,
        opacity: 1
      };
      imgId_sat = 'LANDSAT/LC08/C02/T1_L2'+'/'+imgInfo.id;
      importId_sat = "ee.Image('LANDSAT/LC08/C02/T1_L2"+"/"+imgInfo.id+"')";
    break;
//-----------------------------------------------------------------------
    case 'Landsat 7':
      imgsat = ee.Image('LANDSAT/LE07/C02/T1_L2'+'/'+imgInfo.id);
      RBG_VIS_sat = {
        bands: ["SR_B3","SR_B2","SR_B1"],
        gamma: 1.8820000000000001,
        max: 44167.56,
        min: 7234.4400000000005,
        opacity: 1
      };
      imgId_sat = 'LANDSAT/LE07/C02/T1_L2'+'/'+imgInfo.id;
      importId_sat = "ee.Image('LANDSAT/LE07/C02/T1_L2"+"/"+imgInfo.id+"')";
    break;
//--------------------------------------------------------------------------
    case 'Landsat 5':
      imgsat = ee.Image('LANDSAT/LT05/C02/T1_L2'+'/'+imgInfo.id);
      var opticalBands = imgsat.select('SR_B.').multiply(0.0000275).add(-0.2);
      var thermalBand = imgsat.select('ST_B6').multiply(0.00341802).add(149.0);
      imgsat = imgsat.addBands(opticalBands, null, true).addBands(thermalBand, null, true);
      RBG_VIS_sat = {
        bands: ['SR_B3', 'SR_B2', 'SR_B1'],
        min: 0.0,
        max: 0.3,
      };
      imgId_sat = 'LANDSAT/LT05/C02/T1_L2'+'/'+imgInfo.id;
      importId_sat = "ee.Image('LANDSAT/LT05/C02/T1_L2"+"/"+imgInfo.id+"')";
    break;
  }
      var img = imgsat;
      RBG_VIS_post = RBG_VIS_sat;
      var visImg = img.visualize(RBG_VIS_post);
      var thumbnail = ui.Thumbnail({
        image: visImg,
        params: {
          dimensions: '295', // '295x295'
          crs: imgInfo.crs
        },
        style: {margin: '6px 8px 8px 8px'}
      });
      var imgId = imgId_sat;
      var importId = importId_sat;
      var startDateVar = "START_DATE = '" + imgInfo.date + "'\n";
      var endDateVar = "END_DATE = '" + imgInfo.dateEnd + "'\n";
      var cloudFilter = "CLOUD_FILTER = " + maxCldCvr.getValue().toString(); 
      var nbInfo = startDateVar + endDateVar + cloudFilter;
      var nbInfoLabel = ui.Label(nbInfo, {fontFamily: 'monospace', fontSize: '10px', whiteSpace: 'pre', backgroundColor: '#d3d3d3', padding: '4px', margin: '0px 8px 0px 8px', stretch: 'horizontal'}); 
      var imgCard_1 = ui.Panel([
        ui.Panel([
          ui.Label(imgInfo.date, {padding: '6px 0px 0px 0px', fontSize: '16px', fontWeight: 'bold', width: '88px'}),
          ui.Button({label: 'añadir al mapa', onClick: displayMapImg_1, style: {whiteSpace: imgId, width: '90px', margin: '8px 0px 6px 120px'}}),
        ], ui.Panel.Layout.flow('horizontal')),
        nbInfoLabel,
        thumbnail
      ], null, {margin: '4px 0px 0px 4px' , width: '320px'});
      imgCardPanel_1.add(imgCard_1);
    });
  });
}
// Titulo del mapa
//Definir el titulo
var TituloMapa = ui.Label({
  value: 'Detección de cambios en la superficie terrestre', // Titulo del mapa
  style: {position: 'top-center', // Posicion
  fontWeight: 'bold', // Negrita
  fontSize: '15px'}}); // Tamaaño de fuente
//Abre paso al siguiente proceso
function siguienteimg() {
  j = 2;
  ui.root.clear();
  imgCardPanel_1.clear();
  ui.root.add(splitPanel_1);
  Zona_estudio = drawingTools.layers().get(0).getEeObject();
  map_1.addLayer(Zona_estudio,{color: "red", opacity: 0.3},"Area de estudio");
  map_1.centerObject(Zona_estudio, 10);
}
var col_pre = [];
var col_pre_cop = [];
var col_post = [];
var col_post_cop = [];
var Zona_estudio = [];
var s_ind_o_band = [];
var controlPanel_3 = [];
function siguienteimg_1() {
  ui.root.clear();
  imgCardPanel_1.clear();
  map_2.add(controlPanel_2);
  ui.root.add(map_2);
  Zona_estudio = drawingTools.layers().get(0).getEeObject();
  map_2.addLayer(Zona_estudio,{color: "red", opacity: 0.3},"Area de estudio");
  map_2.centerObject(Zona_estudio,10);
  col_pre = ee.ImageCollection(img_x);
  col_pre = col_pre.map(corte);
  map_2.addLayer(col_pre, RBG_VIS_pre,"Img_pre_evento");
  col_post = ee.ImageCollection(img_y);
  col_post = col_post.map(corte);
  map_2.addLayer(col_post, RBG_VIS_post,"Img_post_evento");
  col_pre_cop = col_pre;
  col_post_cop = col_post;
}
var Bandas = ui.Select();
var Bandas_1 = ui.Select();
function siguienteimg_2() {
  ui.root.clear();
  imgCardPanel_2.clear();
  s_ind_o_band = ind_o_band.getValue();
  var pl_sat = plataforma.getValue();
  var pl_sat_1 = plataforma_1.getValue();
  var txt_s = '13.1 Seleccione la banda de la imagen '+pl_sat+ ' pre-evento';
  var instr13_2 = ui.Label(txt_s, {fontSize: '14px', margin: '8px 8px 4px 8px'});
  var txt_s_1 = '13.2 Seleccione la banda de la imagen '+pl_sat_1+ ' post-evento';
  var instr13_3 = ui.Label(txt_s_1, {fontSize: '14px'});
  switch (pl_sat) {
  case 'Sentinel 2':
    Bandas = ui.Select({
    items: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9', 'B11', 'B12'],
    placeholder: 'B1',
    value: 'B1',
    style: {stretch: 'horizontal'},
    onChange: function Cambio (pre) {
          Bandas.setValue(pre);
    },
  });
  break;
  case 'Landsat 8':
    Bandas = ui.Select({
    items: ['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7'],
    placeholder: 'SR_B1',
    value: 'SR_B1',
    style: {stretch: 'horizontal'},
    onChange: function Cambio (pre) {
          Bandas.setValue(pre);
    },
  });
  break;
  case 'Landsat 7':
    Bandas = ui.Select({
    items: ['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7'],
    placeholder: 'SR_B1',
    value: 'SR_B1',
    style: {stretch: 'horizontal'},
    onChange: function Cambio (pre) {
          Bandas.setValue(pre);
    },
  });
  break;
  case 'Landsat 5':
    Bandas = ui.Select({
    items: ['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7'],
    placeholder: 'SR_B1',
    value: 'SR_B1',
    style: {stretch: 'horizontal'},
    onChange: function Cambio (pre) {
          Bandas.setValue(pre);
    },
  });
  break;
  }
  switch (pl_sat_1) {
  case 'Sentinel 2':
    Bandas_1 = ui.Select({
    items: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9', 'B11', 'B12'],
    placeholder: 'B1',
    value: 'B1',
    style: {stretch: 'horizontal'},
    onChange: function Cambio (pre) {
          Bandas_1.setValue(pre);
    },
  });
  break;
  case 'Landsat 8':
    Bandas_1 = ui.Select({
    items: ['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7'],
    placeholder: 'SR_B1',
    value: 'SR_B1',
    style: {stretch: 'horizontal'},
    onChange: function Cambio (pre) {
          Bandas_1.setValue(pre);
    },
  });
  break;
  case 'Landsat 7':
    Bandas_1 = ui.Select({
    items: ['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7'],
    placeholder: 'SR_B1',
    value: 'SR_B1',
    style: {stretch: 'horizontal'},
    onChange: function Cambio (pre) {
          Bandas_1.setValue(pre);
    },
  });
  break;
  case 'Landsat 5':
    Bandas_1 = ui.Select({
    items: ['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7'],
    placeholder: 'SR_B1',
    value: 'SR_B1',
    style: {stretch: 'horizontal'},
    onChange: function Cambio (pre) {
          Bandas_1.setValue(pre);
    },
  });
  break;
  }
  if (s_ind_o_band == 'Indice multiespectral') {
  controlPanel_3 = ui.Panel([
    title,
    instr13_1,
    In,
    botonSiguiente_3
  ], 
  null, {position: 'bottom-left', width: '330px' , height: '400px'}
  );
  } else {
  controlPanel_3 = ui.Panel([
    title,
    instr13_2,
    Bandas,
    instr13_3,
    Bandas_1,
    botonSiguiente_3
  ], 
  null, {position: 'bottom-left', width: '330px' , height: '400px'}
  );
  }
  map_3.add(controlPanel_3);
  ui.root.add(map_3);
  Zona_estudio = drawingTools.layers().get(0).getEeObject();
  map_3.centerObject(Zona_estudio,10);
  map_3.addLayer(Zona_estudio,{color: "red", opacity: 0.3},"Area de estudio");
  map_3.addLayer(col_pre.mean(), RBG_VIS_pre,"Img_pre_evento");
  map_3.addLayer(col_post.mean(), RBG_VIS_post,"Img_post_evento");
}
//Panel de Leyenda
{
// Descripcion del etiquetado de elementos de la leyenda
var Etiquetas = [
  'Cambio negativo',
  'Ligero cambio negativo',
  'Sin cambio',
  'Ligero cambio positivo',
  'Cambio positivo',
  ];
// Configuracion del titulo y posicion de la leyenda
var Titulo = ui.Label({
  value: 'Cambios en la superficie', // Titulo de la leyenda
  style: {fontWeight: 'bold', fontSize: '20px', margin: '0px 0px 15px 0px',}}); // Estilo y dimensiones
var Leyenda = ui.Panel({
  style: {position: 'bottom-left', padding: '10px 20px'}}); // Posicion, altura y anchura
Leyenda.add(Titulo);
// Configuracion de la simbologia
var Simbologia = ['0034F5', 'F3EC16', '37D02D', 'FF8410', 'FD3000'];
//'0034F5','F3EC16','37D02D','FF8410','FD3000'
var Simbolos = function(simbolo, texto) {
var TextoLeyenda = ui.Label({
  value: texto,
  style: {margin: '6px 0px 10px 15px'}}); // Posicion en la separacion de los textos
var CajaLeyenda = ui.Label({
  style: {backgroundColor: '#' + simbolo,
  padding: '15px', // TamaÃ±o del simbolo
  margin: '0px 0px 6px 0px'}}); // Posicion en la separacion de los simbolos
//Representacion de leyenda en el visor
return ui.Panel({
  widgets: [CajaLeyenda, TextoLeyenda],
  layout: ui.Panel.Layout.Flow('horizontal')});};
for (var i = 0; i < 5; i++) {Leyenda.add(Simbolos(Simbologia[i], Etiquetas[i]));} 
}
//Reductor
{
  var reducers = ee.Reducer.mean();
      reducers = reducers.combine({
      reducer2: ee.Reducer.stdDev(),
      sharedInputs: true
    });
      reducers = reducers.combine({
       reducer2: ee.Reducer.max(),
        sharedInputs: true
      });
      reducers = reducers.combine({
        reducer2: ee.Reducer.min(),
        sharedInputs: true
      });
        reducers = reducers.combine({
        reducer2: ee.Reducer.sum(),
        sharedInputs: true
      });
}
function siguienteimg_3() {
  ui.root.clear();
  ui.root.add(map_4);
  Zona_estudio = drawingTools.layers().get(0).getEeObject();
  var pl_sat = plataforma.getValue();
  var pl_sat_1 = plataforma_1.getValue();
  map_4.centerObject(Zona_estudio,10);
  map_4.addLayer(Zona_estudio,{color: "red", opacity: 0.3},"Area de estudio");
  print("col_pre",col_pre);
  print("col_post",col_post);
  map_4.addLayer(col_pre, RBG_VIS_pre,"Img_pre_evento");
  map_4.addLayer(col_post, RBG_VIS_post,"Img_post_evento");
  var s_in_o_b = ind_o_band.getValue();
  var s_metodo = metodo.getValue();
  var cambio_img = ee.Image();
  var Vis_param_ind = [];
  var indice_ms = [];
  var Bpre = [];
  var Bpost = [];
  var maximo = [];
  var minimo = [];
  var prom = [];
  var Nin = [];
  var des_std = [];
  if (s_in_o_b == 'Indice multiespectral'){
    indice_ms = In.getValue();
      switch (indice_ms) {
        case 'NDVI (Normalice diference vegetacion index)':
          Nin = 'NDVI';
          Vis_param_ind = {"opacity":1,
              "bands":["NDVI"],
              "min":0,"max":0.8,
              "palette":["red","yellow","green"]};
          var col_pre_ind = col_pre.map(NDVI_pre);
          col_pre_ind = col_pre_ind.select('NDVI');
          var col_pre_ind_m = col_pre_ind.mean();
          var col_post_ind = col_post.map(NDVI_post);
          col_post_ind = col_post_ind.select('NDVI');
          var col_post_ind_m = col_post_ind.mean();
          print ("la coleccion pre acorde al indice" + Nin + "es: ", col_pre_ind);
          map_4.addLayer(col_pre_ind_m, Vis_param_ind, "col_pre_ind");
          print ("la coleccion post acorde al indice" + Nin + "es: ", col_post_ind);
          map_4.addLayer(col_post_ind_m, Vis_param_ind, "col_post_ind");
          if (s_metodo == 'Diferencia'){
            print ("Esta en diferencia");
            cambio_img = col_post_ind_m.subtract(col_pre_ind_m);
            map_4.addLayer(cambio_img,{},"cambio_img_diferencia")
          } else {
            print ("esta en división")
            cambio_img = col_post_ind_m.divide(col_pre_ind_m);
            map_4.addLayer(cambio_img,{},"cambio_img_división");
          }
        break;
//------------------------------------------------------------------------------------------------------
        case 'NDWI (Normalized difference water index)':
          Nin = 'NDWI';
          print ("la coleccion pre acorde al indice" + Nin + "es: ");
          col_pre_ind = col_pre.map(NDWI_pre);
          col_pre_ind = col_pre_ind.select('NDWI');
          col_pre_ind_m = col_pre_ind.mean();
          col_post_ind = col_post.map(NDWI_post);
          col_post_ind = col_post_ind.select('NDWI');
          col_post_ind_m = col_post_ind.mean();
          Vis_param_ind = {
            "opacity":1,
            "bands":["NDWI"],
            "min":-1,
            "max":0.2,
            "palette":["169d06","ff1818","37edff"]};
          print ("la coleccion pre acorde al indice " + Nin + " es: ", col_pre_ind);
          map_4.addLayer(col_pre_ind_m, Vis_param_ind, "col_pre_ind");
          print ("la coleccion post acorde al indice " + Nin + " es: ", col_post_ind);
          map_4.addLayer(col_post_ind_m, Vis_param_ind, "col_post_ind");
          if (s_metodo == 'Diferencia'){
            print ("Esta en diferencia");
            cambio_img = col_post_ind_m.subtract(col_pre_ind_m);
            map_4.addLayer(cambio_img,Vis_param_ind,"cambio_img_diferencia");
          } else {
            print ("esta en división");
            cambio_img = col_post_ind_m.divide(col_pre_ind_m);
            map_4.addLayer(cambio_img,Vis_param_ind,"cambio_img_división");
          }
        break;
//-----------------------------------------------------------------------
        case 'GCI (Green Coverage Index)':
          Nin = 'GCI';
          print ("la coleccion pre acorde al indice" + Nin + "es: ");
          col_pre_ind = col_pre.map(GCI_pre);
          col_pre_ind = col_pre_ind.select('GCI');
          col_pre_ind_m = col_pre_ind.mean();
          col_post_ind = col_post.map(GCI_post);
          col_post_ind = col_post_ind.select('GCI');
          col_post_ind_m = col_post_ind.mean();
          print ("la coleccion pre acorde al indice" + Nin + "es: ", col_pre_ind);
          map_4.addLayer(col_pre_ind_m, Vis_param_ind, "col_pre_ind");
          print ("la coleccion post acorde al indice" + Nin + "es: ", col_post_ind);
          map_4.addLayer(col_post_ind_m, Vis_param_ind, "col_post_ind");
          var satel_pre = plataforma.getValue();
          var satel_post = plataforma_1.getValue();
          var Vis_param_ind_p = [];
          if (satel_pre == 'Landsat 8'){
              Vis_param_ind = {
                "opacity":1,
                "bands":["GCI"],
                "min": 1,
                "max": 5,
                "palette":["b48674","ffee25","5fff6c","2a8138"]};
          } else if (satel_pre == 'Sentinel 2'){
              Vis_param_ind = {
                "opacity":1,
                "bands":["GCI"],
                "min": 0,
                "max": 3.5,
                "palette":["b48674","ffee25","5fff6c","2a8138"]};
          } else if (satel_pre == 'Landsat 7') {
              Vis_param_ind = {
                "opacity":1,
                "bands":["GCI"],
                "min": 1,
                "max": 5,
                "palette":["b48674","ffee25","5fff6c","2a8138"]};
          } else {
              Vis_param_ind = {
                "opacity":1,
                "bands":["GCI"],
                "min": 1,
                "max": 5,
                "palette":["b48674","ffee25","5fff6c","2a8138"]}; 
          }
          if (satel_post == 'Landsat 8'){
              Vis_param_ind_p = {
                "opacity":1,
                "bands":["GCI"],
                "min": 1,
                "max": 5,
                "palette":["b48674","ffee25","5fff6c","2a8138"]};
          } else if (satel_post == 'Sentinel 2'){
              Vis_param_ind_p = {
                "opacity":1,
                "bands":["GCI"],
                "min": 0,
                "max": 3.5,
                "palette":["b48674","ffee25","5fff6c","2a8138"]};
          } else if (satel_post == 'Landsat 7') {
              Vis_param_ind_p = {
                "opacity":1,
                "bands":["GCI"],
                "min": 1,
                "max": 5,
                "palette":["b48674","ffee25","5fff6c","2a8138"]};
          } else {
              Vis_param_ind_p = {
                "opacity":1,
                "bands":["GCI"],
                "min": 1,
                "max": 5,
                "palette":["b48674","ffee25","5fff6c","2a8138"]}; 
          }
          if (s_metodo == 'Diferencia'){
            print ("Esta en diferencia");
            cambio_img = col_post_ind_m.subtract(col_pre_ind_m);
            map_4.addLayer(cambio_img, Vis_param_ind,"cambio_img_diferencia")
          } else {
            print ("esta en división")
            cambio_img = col_post_ind_m.divide(col_pre_ind_m);
            map_4.addLayer(cambio_img, Vis_param_ind_p,"cambio_img_división");
          }
        break;
//--------------------------------------------------------------------------
        case 'SAVI (Soil Adjusted Vegetation Index)':
          Nin = 'SAVI';
          print ("la coleccion pre acorde al indice" + Nin + "es: ");
          col_pre_ind = col_pre.map(SAVI_pre);
          col_pre_ind = col_pre_ind.select('SAVI');
          col_pre_ind_m = col_pre_ind.mean();
          col_post_ind = col_post.map(SAVI_post);
          col_post_ind = col_post_ind.select('SAVI');
          col_post_ind_m = col_post_ind.mean();
          print ("la coleccion pre acorde al indice" + Nin + "es: ", col_pre_ind);
          map_4.addLayer(col_pre_ind_m, Vis_param_ind, "col_pre_ind");
          print ("la coleccion post acorde al indice" + Nin + "es: ", col_post_ind);
          map_4.addLayer(col_post_ind_m, Vis_param_ind, "col_post_ind");
          satel_pre = plataforma.getValue();
          satel_post = plataforma_1.getValue();
          Vis_param_ind_p = [];
          if (satel_pre == 'Landsat 8'){
              Vis_param_ind = {
                "opacity":1,
                "bands":["SAVI"],
                "min": 1,
                "max": 5,
                "palette":["b48674","ffee25","5fff6c","2a8138"]};
          } else if (satel_pre == 'Sentinel 2'){
              Vis_param_ind = {
                "opacity":1,
                "bands":["SAVI"],
                "min":0,
                "max":1.5,
                "palette":["red","yellow","green"]};
          } else if (satel_pre == 'Landsat 7') {
              Vis_param_ind = {
                "opacity":1,
                "bands":["SAVI"],
                "min":0,
                "max":1.5,
                "palette":["red","yellow","green"]};
          } else {
              Vis_param_ind = {
                "opacity":1,
                "bands":["SAVI"],
                "min":0,
                "max":1.5,
                "palette":["red","yellow","green"]};
          }
          if (satel_post == 'Landsat 8'){
              Vis_param_ind_p = {
                "opacity":1,
                "bands":["SAVI"],
                "min":0,
                "max":1.5,
                "palette":["red","yellow","green"]};
          } else if (satel_post == 'Sentinel 2'){
              Vis_param_ind_p = {
                "opacity":1,
                "bands":["SAVI"],
                "min":0,
                "max":1.5,
                "palette":["red","yellow","green"]};
          } else if (satel_post == 'Landsat 7') {
              Vis_param_ind_p = {
                "opacity":1,
                "bands":["SAVI"],
                "min":0,
                "max":1.5,
                "palette":["red","yellow","green"]};
          } else {
              Vis_param_ind_p = {
                "opacity":1,
                "bands":["SAVI"],
                "min":0,
                "max":1.5,
                "palette":["red","yellow","green"]};
          }
          if (s_metodo == 'Diferencia'){
            print ("Esta en diferencia");
            cambio_img = col_post_ind_m.subtract(col_pre_ind_m);
            map_4.addLayer(cambio_img, Vis_param_ind,"cambio_img_diferencia");
          } else {
            print ("esta en división");
            cambio_img = col_post_ind_m.divide(col_pre_ind_m);
            map_4.addLayer(cambio_img, Vis_param_ind_p,"cambio_img_división");
          }
        break;
//--------------------------------------------------------------------------
        case 'NBR (Normalized Burn Ratio)':
          Nin = 'NBR';
          print ("la coleccion pre acorde al indice" + Nin + "es: ");
          col_pre_ind = col_pre.map(NBR_pre);
          col_pre_ind = col_pre_ind.select('NBR');
          col_pre_ind_m = col_pre_ind.mean();
          col_post_ind = col_post.map(NBR_post);
          col_post_ind = col_post_ind.select('NBR');
          col_post_ind_m = col_post_ind.mean();
          Vis_param_ind = {
            "opacity":1,
            "bands":["NBR"],
            "min":-1,
            "max":0.2,
            "palette":["169d06","ff1818","37edff"]};
          print ("la coleccion pre acorde al indice " + Nin + " es: ", col_pre_ind);
          map_4.addLayer(col_pre_ind_m, Vis_param_ind, "col_pre_ind");
          print ("la coleccion post acorde al indice " + Nin + " es: ", col_post_ind);
          map_4.addLayer(col_post_ind_m, Vis_param_ind, "col_post_ind");
          if (s_metodo == 'Diferencia'){
            print ("Esta en diferencia");
            cambio_img = col_post_ind_m.subtract(col_pre_ind_m);
            map_4.addLayer(cambio_img,Vis_param_ind,"cambio_img_diferencia");
          } else {
            print ("esta en división");
            cambio_img = col_post_ind_m.divide(col_pre_ind_m);
            map_4.addLayer(cambio_img,Vis_param_ind,"cambio_img_división");
          }
        break;
        default:
          print ('Aun no se desarrolla el indice solicitado');
  }
  } else {
    Bpre = Bandas.getValue();
    Bpost = Bandas_1.getValue();
    var col_pre_b = col_pre.select(Bpre);
    col_pre_b = col_pre_b.mean();
    var col_post_b = col_post.select(Bpost);
    col_post_b = col_post_b.mean();
    if (s_metodo == 'Diferencia'){
      print ("Esta en diferencia");
      cambio_img = col_pre_b.subtract(col_post_b);
      map_4.addLayer(cambio_img, {},"cambio_img_diferencia");
    } else {
      print ("esta en división");
      cambio_img = col_pre_b.divide(col_post_b);
      map_4.addLayer(cambio_img, {},"cambio_img_división");
    }
  }
  // Reduce the region. The region parameter is the Feature geometry.
  var meanDictionary = cambio_img.reduceRegion({
    reducer: reducers,
    geometry: Zona_estudio,
    scale: 10,
    maxPixels: 1e9
  });
  print("meanDictionary",meanDictionary);
  if (s_in_o_b == 'Indice multiespectral'){
    maximo = meanDictionary.getNumber(Nin+"_max");
    minimo = meanDictionary.getNumber(Nin+"_min");
    des_std = meanDictionary.getNumber(Nin+"_stdDev");
    prom = meanDictionary.getNumber(Nin+"_mean");
  } else {
    Bpre = Bandas.getValue();
    maximo = meanDictionary.getNumber(Bpre+"_max");
    minimo = meanDictionary.getNumber(Bpre+"_min");
    des_std = meanDictionary.getNumber(Bpre+"_stdDev");
    prom = meanDictionary.getNumber(Bpre+"_mean");
  }
  var img_norm = (((cambio_img.subtract(minimo)).multiply(2)).divide(maximo.subtract(minimo))).add(-1);
  print ("img_norm",img_norm);
  map_4.addLayer(img_norm,{},"cambio_img_norm");
  var mask_inf = cambio_img.lte(des_std.multiply(-2.5));
  var img_mask_inf = mask_inf.multiply(prom.add(des_std.multiply(-2.5)));
  var mask_sup = cambio_img.gte(des_std.multiply(2.5));
  var img_mask_sup = mask_sup.multiply(prom.add(des_std.multiply(2.5)));
  var mask_img = cambio_img.gt(des_std.multiply(-2.5));
  var mask_img_1 = cambio_img.lt(des_std.multiply(2.5));
  var mask_f = mask_img.multiply(mask_img_1);
  var cambio_img_mask = cambio_img.multiply(mask_f);
  var img_ajus = cambio_img_mask.add(img_mask_inf).add(img_mask_sup);
  var ajus_stad = img_ajus.reduceRegion({
    reducer: reducers,
    geometry: Zona_estudio,
    scale: 10,
    maxPixels: 1e9
  });
  print ("ajus_stad", ajus_stad);
  if (s_in_o_b == 'Indice multiespectral'){
    maximo = ajus_stad.getNumber(Nin+"_max");
    minimo = ajus_stad.getNumber(Nin+"_min");
    des_std = ajus_stad.getNumber(Nin+"_stdDev");
    prom = ajus_stad.getNumber(Nin+"_mean");
  } else {
    Bpre = Bandas.getValue();
    maximo = ajus_stad.getNumber(Bpre+"_max");
    minimo = ajus_stad.getNumber(Bpre+"_min");
    des_std = ajus_stad.getNumber(Bpre+"_stdDev");
    prom = ajus_stad.getNumber(Bpre+"_mean");
  }
  var ajust_norm = (((img_ajus.subtract(minimo)).multiply(2)).divide(maximo.subtract(minimo))).add(-1);
  ajust_norm = ajust_norm.multiply(100);
  map_4.addLayer(img_norm,{},"img_ajust_norm");
  var ajust_norm_stad = ajust_norm.reduceRegion({
    reducer: reducers,
    geometry: Zona_estudio,
    scale: 10,
    maxPixels: 1e9
  });
  print ("ajust_norm_stad", ajust_norm_stad);
  //Se realiza la reclasificación
  var Clases = ajust_norm  
          .where(ajust_norm.lte(-50), 1)
          .where(ajust_norm.gt(-50).and(ajust_norm.lte(-15)), 2) 
          .where(ajust_norm.gt(-15).and(ajust_norm.lte(15)), 3)
          .where(ajust_norm.gt(15).and(ajust_norm.lte(50)), 4)
          .where(ajust_norm.gt(50), 5);
  map_4.addLayer(Clases, {min: 1, max :5,
  palette: ['#0034f5','#f3ec16','#37d02d','#ff8410','#fd3000']},
  'Reclasificacion');
  map_4.add(TituloMapa);
  map_4.add(Leyenda);
}
//Función para filtro de nubes
//Landsat 5
var cloudMaskL5 = function(image) {
  var qa = image.select('QA_PIXEL');
  // If the cloud bit (5) is set and the cloud confidence (7) is high
  // or the cloud shadow bit is set (3), then it's a bad pixel.
  var cloud = qa.bitwiseAnd(1 << 5)
                  .and(qa.bitwiseAnd(1 << 7))
                  .or(qa.bitwiseAnd(1 << 3));
  // Remove edge pixels that don't occur in all bands
  var mask2 = image.mask().reduce(ee.Reducer.min());
  return image.updateMask(cloud.not()).updateMask(mask2);
};
//Landsat 7
var cloudMaskL7 = function(image) {
  var qa = image.select('QA_PIXEL');
  // If the cloud bit (5) is set and the cloud confidence (7) is high
  // or the cloud shadow bit is set (3), then it's a bad pixel.
  var cloud = qa.bitwiseAnd(1 << 5)
                  .and(qa.bitwiseAnd(1 << 7))
                  .or(qa.bitwiseAnd(1 << 3));
  // Remove edge pixels that don't occur in all bands
  var mask2 = image.mask().reduce(ee.Reducer.min());
  return image.updateMask(cloud.not()).updateMask(mask2);
};
//Landsat 8
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('QA_PIXEL');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
//Sentinel 2
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask);
}
//Función para cortar
var corte = function(img){
  var roi = drawingTools.layers().get(0).getEeObject();
  var img_corte = img.clip(roi);
  return img_corte; 
};
//Funcion boton filtro de nubes
function cloudfilterSI(){
  clearImgs_2();
  map_2.addLayer(Zona_estudio,{color: "red", opacity: 0.3},"Area de estudio");
  var satelite_pre = plataforma.getValue();
  var satelite_post = plataforma_1.getValue();
  print("si_esta_la coleccion pre",col_pre);
  switch (satelite_pre) {
  case 'Sentinel 2':
    col_pre = col_pre.map(maskS2clouds);
  break;
  case 'Landsat 8':
    col_pre = col_pre.map(maskL8sr);
  break;
  case 'Landsat 7':
    col_pre = col_pre.map(cloudMaskL7);
  break;
  case 'Landsat 5':
    col_pre = col_pre.map(cloudMaskL5);
  break;
  }
  map_2.addLayer(col_pre,RBG_VIS_pre,"col_pre sin nubes");
  print("si_esta_la coleccion post",col_post);
  switch (satelite_post) {
  case 'Sentinel 2':
    col_post = col_post.map(maskS2clouds);
  break;
  case 'Landsat 8':
    col_post = col_post.map(maskL8sr);
  break;
  case 'Landsat 7':
    col_post = col_post.map(cloudMaskL7);
  break;
  case 'Landsat 5':
    col_post = col_post.map(cloudMaskL5);
  break;
  }
  map_2.addLayer(col_post,RBG_VIS_post,"col_post sin nubes");
}
function cloudfilterNO(){
  clearImgs_2();
  map_2.addLayer(Zona_estudio,{color: "red", opacity: 0.3},"Area de estudio");
  col_pre = col_pre_cop;
  map_2.addLayer(col_pre,RBG_VIS_pre,"col_pre con nubes");
  col_post = col_post_cop;
  map_2.addLayer(col_post,RBG_VIS_post,"col_post con nubes");
}
//Funcion para los Índices
//NDVI
var NDVI_img = [];
var Satelite_In = [];
var NDVI_pre = function(img){
  Satelite_In = plataforma.getValue();
  print ("La plataforma satelital pre es: ", Satelite); 
    if (Satelite_In == 'Landsat 8'){
        print ("La plataforma satelital esta en Landsat 8");
        NDVI_img = img.addBands(img.normalizedDifference(['SR_B5','SR_B4']).rename("NDVI"));
        return NDVI_img;
    } else if (Satelite_In == 'Sentinel 2'){
        print ("La plataforma satelital esta en Sentinel 2");
        NDVI_img = img.addBands(img.normalizedDifference(['B8','B4']).rename("NDVI"));
        return NDVI_img;
    } else if (Satelite_In == 'Landsat 7') {
        print ("La plataforma satelital esta en Landsat 7");
        NDVI_img = img.addBands(img.normalizedDifference(['SR_B4','SR_B3']).rename("NDVI"));
        return NDVI_img;
    } else {
        print ("La plataforma satelital esta en Landsat 5");
        NDVI_img = img.addBands(img.normalizedDifference(['SR_B4','SR_B3']).rename("NDVI"));
        return NDVI_img;  
    }
};
var NDVI_post = function(img){
  Satelite_In = plataforma_1.getValue();
  print ("La plataforma satelital pre es: ", Satelite); 
    if (Satelite_In == 'Landsat 8'){
        print ("La plataforma satelital esta en Landsat 8");
        NDVI_img = img.addBands(img.normalizedDifference(['SR_B5','SR_B4']).rename("NDVI"));
        return NDVI_img;
    } else if (Satelite_In == 'Sentinel 2'){
        print ("La plataforma satelital esta en Sentinel 2");
        NDVI_img = img.addBands(img.normalizedDifference(['B8','B4']).rename("NDVI"));
        return NDVI_img;
    } else if (Satelite_In == 'Landsat 7') {
        print ("La plataforma satelital esta en Landsat 7");
        NDVI_img = img.addBands(img.normalizedDifference(['SR_B4','SR_B3']).rename("NDVI"));
        return NDVI_img;
    } else {
        print ("La plataforma satelital esta en Landsat 5");
        NDVI_img = img.addBands(img.normalizedDifference(['SR_B4','SR_B3']).rename("NDVI"));
        return NDVI_img;  
    }
};
//NDWI
var NDWI_img = [];
var NDWI_pre = function(img){
    Satelite_In = plataforma.getValue();
    if (Satelite_In == 'Landsat 8'){
        NDWI_img = img.addBands(img.normalizedDifference(['SR_B3','SR_B6']).rename("NDWI"));
        return NDWI_img;
    } else if (Satelite_In == 'Sentinel 2') {
        NDWI_img = img.addBands(img.normalizedDifference(['B3','B11']).rename("NDWI"));
        return NDWI_img;
    } else if (Satelite_In == 'Landsat 7') {
        NDWI_img = img.addBands(img.normalizedDifference(['SR_B2','SR_B5']).rename("NDWI"));
        return NDWI_img;
    } else {
        NDWI_img = img.addBands(img.normalizedDifference(['SR_B2','SR_B5']).rename("NDWI"));
        return NDWI_img;
    }
};
var NDWI_post = function(img){
    Satelite_In = plataforma_1.getValue();
    if (Satelite_In == 'Landsat 8'){
        NDWI_img = img.addBands(img.normalizedDifference(['SR_B3','SR_B6']).rename("NDWI"));
        return NDWI_img;
    } else if (Satelite_In == 'Sentinel 2') {
        NDWI_img = img.addBands(img.normalizedDifference(['B3','B11']).rename("NDWI"));
        return NDWI_img;
    } else if (Satelite_In == 'Landsat 7') {
        NDWI_img = img.addBands(img.normalizedDifference(['SR_B2','SR_B5']).rename("NDWI"));
        return NDWI_img;
    } else {
        NDWI_img = img.addBands(img.normalizedDifference(['SR_B2','SR_B5']).rename("NDWI"));
        return NDWI_img;
    }
};
//GCI
var GCI_img = [];
var GCI_pre = function(img){
    var Satelite = plataforma.getValue();
    if (Satelite == 'Landsat 8'){
      GCI_img = img.addBands(((img.select("SR_B5").divide(img.select("SR_B3"))).subtract(1)).rename("GCI"));
      return GCI_img;
    } else if (Satelite == 'Sentinel 2') {
      GCI_img = img.addBands(((img.select("B7").divide(img.select("B5"))).subtract(1)).rename("GCI"));
      return GCI_img_ST;
    } else if (Satelite == 'Landsat 7') {
      GCI_img = img.addBands(((img.select("SR_B4").divide(img.select("SR_B2"))).subtract(1)).rename("GCI"));
      return GCI_img;
    } else {
      GCI_img = img.addBands(((img.select("SR_B4").divide(img.select("SR_B2"))).subtract(1)).rename("GCI"));
      return GCI_img;      
    }
};
var GCI_post = function(img){
    var Satelite = plataforma_1.getValue();
    if (Satelite == 'Landsat 8'){
      GCI_img = img.addBands(((img.select("SR_B5").divide(img.select("SR_B3"))).subtract(1)).rename("GCI"));
      return GCI_img;
    } else if (Satelite == 'Sentinel 2') {
      GCI_img = img.addBands(((img.select("B7").divide(img.select("B5"))).subtract(1)).rename("GCI"));
      return GCI_img_ST;
    } else if (Satelite == 'Landsat 7') {
      GCI_img = img.addBands(((img.select("SR_B4").divide(img.select("SR_B2"))).subtract(1)).rename("GCI"));
      return GCI_img;
    } else {
      GCI_img = img.addBands(((img.select("SR_B4").divide(img.select("SR_B2"))).subtract(1)).rename("GCI"));
      return GCI_img;      
    }
};
//SAVI
var SAVI_img = [];
var B5 = [];
var B4 = [];
var L = [];
var SAVI_pre = function(img){
    var Satelite = plataforma.getValue();
    if (Satelite == 'Landsat 8'){
      B5 = img.select("SR_B5");
      B4 = img.select("SR_B4");
      L = 0.5;
      SAVI_img = img.addBands((((B5.subtract(B4)).divide((B5.add(B4)).add(L))).multiply(L+1))
      .rename("SAVI"));
      return SAVI_img;
    } if (Satelite == 'Sentinel 2') {
      var B8_ST = img.select("B8");
      var B4_ST = img.select("B4");
      var L_ST = 0.2;
      var SAVI_img_ST = img.addBands((((B8_ST.subtract(B4_ST)).divide((B8_ST.add(B4_ST)).add(L_ST))).multiply(L_ST+1))
      .rename("SAVI"));
      return SAVI_img_ST;
    } else if (Satelite == 'Landsat 7') {
      B5 = img.select("SR_B4");
      B4 = img.select("SR_B3");
      L = 0.5;
      SAVI_img = img.addBands((((B5.subtract(B4)).divide((B5.add(B4)).add(L))).multiply(L+1))
      .rename("SAVI"));
      return SAVI_img;
    } else {
      B5 = img.select("SR_B4");
      B4 = img.select("SR_B3");
      L = 0.5;
      SAVI_img = img.addBands((((B5.subtract(B4)).divide((B5.add(B4)).add(L))).multiply(L+1))
      .rename("SAVI"));
      return SAVI_img;      
    }
};
var SAVI_post = function(img){
    var Satelite = plataforma_1.getValue();
    if (Satelite == 'Landsat 8'){
      B5 = img.select("SR_B5");
      B4 = img.select("SR_B4");
      L = 0.5;
      SAVI_img = img.addBands((((B5.subtract(B4)).divide((B5.add(B4)).add(L))).multiply(L+1))
      .rename("SAVI"));
      return SAVI_img;
    } if (Satelite == 'Sentinel 2') {
      var B8_ST = img.select("B8");
      var B4_ST = img.select("B4");
      var L_ST = 0.2;
      var SAVI_img_ST = img.addBands((((B8_ST.subtract(B4_ST)).divide((B8_ST.add(B4_ST)).add(L_ST))).multiply(L_ST+1))
      .rename("SAVI"));
      return SAVI_img_ST;
    } else if (Satelite == 'Landsat 7') {
      B5 = img.select("SR_B4");
      B4 = img.select("SR_B3");
      L = 0.5;
      SAVI_img = img.addBands((((B5.subtract(B4)).divide((B5.add(B4)).add(L))).multiply(L+1))
      .rename("SAVI"));
      return SAVI_img;
    } else {
      B5 = img.select("SR_B4");
      B4 = img.select("SR_B3");
      L = 0.5;
      SAVI_img = img.addBands((((B5.subtract(B4)).divide((B5.add(B4)).add(L))).multiply(L+1))
      .rename("SAVI"));
      return SAVI_img;      
    }
};
//NBR
var NBR_img = [];
var NBR_pre = function(img){
    var Satelite = plataforma.getValue();
    if (Satelite == 'Landsat 8'){
        NBR_img = img.addBands(img.normalizedDifference(['SR_B5','SR_B6']).rename("NBR"));
        return NBR_img;
    } else if (Satelite == 'Sentinel 2') {
        NBR_img = img.addBands(img.normalizedDifference(['B8','B11']).rename("NBR"));
        return NBR_img;
    } else if (Satelite == 'Landsat 7'){
        NBR_img = img.addBands(img.normalizedDifference(['SR_B4','SR_B5']).rename("NBR"));
        return NBR_img;
    } else {
        NBR_img = img.addBands(img.normalizedDifference(['SR_B4','SR_B5']).rename("NBR"));
        return NBR_img;
    } 
};
var NBR_post = function(img){
    var Satelite = plataforma_1.getValue();
    if (Satelite == 'Landsat 8'){
        NBR_img = img.addBands(img.normalizedDifference(['SR_B5','SR_B6']).rename("NBR"));
        return NBR_img;
    } else if (Satelite == 'Sentinel 2') {
        NBR_img = img.addBands(img.normalizedDifference(['B8','B11']).rename("NBR"));
        return NBR_img;
    } else if (Satelite == 'Landsat 7'){
        NBR_img = img.addBands(img.normalizedDifference(['SR_B4','SR_B5']).rename("NBR"));
        return NBR_img;
    } else {
        NBR_img = img.addBands(img.normalizedDifference(['SR_B4','SR_B5']).rename("NBR"));
        return NBR_img;
    } 
};
//Selector de las fechas
{
var tiempo = [];
    tiempo[0] = ui.Textbox({
      placeholder: 'YYYY-MM-DD',
      style:{textAlign: 'center',width:'100px'},
      onChange: function(pre){
        tiempo[0].setValue(pre);
    }
    });
    tiempo[1] = ui.Textbox({
      placeholder: 'YYYY-MM-DD',
      style:{textAlign: 'center',width:'100px'},
      onChange: function(pre) {
        tiempo[1].setValue(pre);
    }
    });
    tiempo[2] = ui.Textbox({
      placeholder: 'YYYY-MM-DD',
      style:{textAlign: 'center',width:'100px'},
      onChange: function(pre) {
        tiempo[0].setValue(pre);
    }
    });
    tiempo[3] = ui.Textbox({
      placeholder: 'YYYY-MM-DD',
      style:{textAlign: 'center',width:'100px'},
      onChange: function(pre) {
        tiempo[1].setValue(pre);
    }
    });
var hasta1 = ui.Label('hasta', {fontSize: '14px', margin: '8px 8px 4px 8px'});
var hasta1_1 = ui.Label('hasta', {fontSize: '14px', margin: '8px 8px 4px 8px'});
var tiempo1 = ui.Panel({
  //style: {width: '400px'/*, border: '0.5px solid black'*/},
  layout: ui.Panel.Layout.Flow('horizontal'),
});
tiempo1.add(ui.Panel([tiempo[0], hasta1, tiempo[1]],ui.Panel.Layout.Flow('horizontal')));
var tiempo1_1 = ui.Panel({
  //style: {width: '400px'/*, border: '0.5px solid black'*/},
  layout: ui.Panel.Layout.Flow('horizontal'),
});
tiempo1_1.add(ui.Panel([tiempo[2], hasta1_1, tiempo[3]],ui.Panel.Layout.Flow('horizontal')));
}
//Botones:
{
var symbol = {
  point: '●',
  rectangulo: '▊',
  poligono: '▛  '
};
var regionButtonPanel = ui.Panel([
    ui.Button({
      label: symbol.rectangulo + ' Area de estudio',
      onClick: drawRectangle,
      style: {stretch: 'horizontal', margin:'1px'}}),
    ], ui.Panel.Layout.flow('horizontal'), {margin: '8px'}
);
var plataforma = ui.Select({
  items: ['Sentinel 2', 'Landsat 8', 'Landsat 7', 'Landsat 5'],
  placeholder: 'Sentinel 2',
  value: 'Sentinel 2',
  style: {stretch: 'horizontal'},
  onChange: function Cambio (pre){
        plataforma.setValue(pre);
  },
});
var plataforma_1 = ui.Select({
  items: ['Sentinel 2', 'Landsat 8', 'Landsat 7', 'Landsat 5'],
  placeholder: 'Sentinel 2',
  value: 'Sentinel 2',
  style: {stretch: 'horizontal'},
  onChange: function Cambio (pre) {
        plataforma_1.setValue(pre);
  },
});
var metodo = ui.Select({
  items: ['Diferencia', 'División'],
  placeholder: 'Diferencia',
  value: 'Diferencia',
  style: {stretch: 'horizontal'},
  onChange: function Cambio (pre) {
        metodo.setValue(pre);
  },
});
var ind_o_band = ui.Select({
  items: ['Indice multiespectral', 'Banda'],
  placeholder: 'Indice multiespectral',
  value: 'Indice multiespectral',
  style: {stretch: 'horizontal'},
  onChange: function Cambio (pre) {
        ind_o_band.setValue(pre);
  },  
});
var In = ui.Select({
  items: ['NDVI (Normalice diference vegetacion index)',
          'NDWI (Normalized difference water index)',
          'GCI (Green Coverage Index)',
          'SAVI (Soil Adjusted Vegetation Index)',
          'NBR (Normalized Burn Ratio)'],
  placeholder: 'INDICES',
  value: 'NDVI (Normalice diference vegetacion index)',
  style: {stretch: 'horizontal'},
  onChange: function Ind (pre) {
        In.setValue(pre);
  },
});
var Satelite = plataforma.getValue();
var maxCldCvr = ui.Slider({min: 0, max: 100, value: 60, step: 1,
  style: {stretch: 'horizontal'}});
var maxCldCvr_1 = ui.Slider({min: 0, max: 100, value: 60, step: 1,
  style: {stretch: 'horizontal'}});
var browseButton = ui.Button({
  label: 'Buscar imágenes',
  onClick: displayBrowseImg,
  style: {stretch: 'horizontal'}
});
var browseButton_1 = ui.Button({
  label: 'Buscar imágenes',
  onClick: displayBrowseImg_1,
  style: {stretch: 'horizontal'}
});
var botonSiguiente = ui.Button({
  label: 'Siguiente',
  onClick: siguienteimg,
  style: {stretch: 'horizontal'}
});
var botonSiguiente_1 = ui.Button({
  label: 'Siguiente',
  onClick: siguienteimg_1,
  style: {stretch: 'horizontal'}
});
var botonSiguiente_2 = ui.Button({
  label: 'Siguiente',
  onClick: siguienteimg_2,
  style: {stretch: 'horizontal'}
});
var botonSiguiente_3 = ui.Button({
  label: 'Siguiente',
  onClick: siguienteimg_3,
  style: {stretch: 'horizontal'}
});
var botonSI = ui.Button({
  label: 'SI',
  onClick: cloudfilterSI,
  style: {stretch: 'horizontal'}
});
var botonNO = ui.Button({
  label: 'NO',
  onClick: cloudfilterNO,
  style: {stretch: 'horizontal'}
});
}
//Panel de instrucciones 1
{
var title = ui.Label('Instrucciónes', {fontSize: '16px', fontWeight: 'bold'});
var instr1 = ui.Label('1. Seleccione el area de estudio', {fontSize: '14px'});
var instr2 = ui.Label('2. Seleccione la plataforma satelital para la imágen 1', {fontSize: '14px'});
var instr3 = ui.Label('3. Seleccione el intervalo de fechas pre-evento', {fontSize: '14px', margin: '8px 8px 4px 8px'});
var instr4 = ui.Label('4. Seleccione la maxima covertura de nubes', {fontSize: '14px'});
var instr5 = ui.Label('5. Busque y seleccione la/as imagene/es pre-evento', {fontSize: '14px'});
var controlPanel = ui.Panel([
    title,
    instr1,
    regionButtonPanel,
    instr2,
    plataforma,
    instr3,
    tiempo1,
    instr4,
    maxCldCvr,
    instr5,
    browseButton,
    botonSiguiente
  ], 
  null, {position: 'bottom-left', width: '330px' , height: '400px'}
  );
}
//Panel de instrucciones 2
{
var title = ui.Label('Instrucciónes', {fontSize: '16px', fontWeight: 'bold'});
var instr6 = ui.Label('6. Seleccione la plataforma satelital para la imágen 2', {fontSize: '14px'});
var instr7 = ui.Label('7. Seleccione el intervalo de fechas post-evento', {fontSize: '14px', margin: '8px 8px 4px 8px'});
var instr8 = ui.Label('8. Seleccione la maxima covertura de nubes', {fontSize: '14px'});
var instr9 = ui.Label('9. Busque y seleccione la/as imagene/es post-evento', {fontSize: '14px'});
var controlPanel_1 = ui.Panel([
    title,
    instr6,
    plataforma_1,
    instr7,
    tiempo1_1,
    instr8,
    maxCldCvr_1,
    instr9,
    browseButton_1,
    botonSiguiente_1
  ], 
  null, {position: 'bottom-left', width: '330px' , height: '400px'}
  );
}
//Panel de instrucciones 3
{
var title = ui.Label('Instrucciónes', {fontSize: '16px', fontWeight: 'bold'});
var instr10 = ui.Label('10. Desea que se aplique el filtro de nubes:', {fontSize: '14px'});
var instr11 = ui.Label('11. Seleccione el metodo de detección de cambio', {fontSize: '14px', margin: '8px 8px 4px 8px'});
var instr12 = ui.Label('12. Selccione metodo de índice o banda:', {fontSize: '14px'});
var controlPanel_2 = ui.Panel([
    title,
    instr10,
    botonSI,
    botonNO,
    instr11,
    metodo,
    instr12,
    ind_o_band,
    botonSiguiente_2
  ], 
  null, {position: 'bottom-left', width: '330px' , height: '400px'}
  );
}
//Panel de instrucciones 4
{
var title = ui.Label('Instrucciónes', {fontSize: '16px', fontWeight: 'bold'});
var instr13_1 = ui.Label('13. Seleccione el indice de cambio:', {fontSize: '14px'});
}
//Panel de búsqueda
var waitMsg = ui.Label({
  value: '⚙️' + ' Processing, please wait...',
  style: {
    stretch: 'horizontal',
    textAlign: 'center',
    backgroundColor: '#d3d3d3'
  }
});
var waitMsg_1 = ui.Label({
  value: '⚙️' + ' Processing, please wait...',
  style: {
    stretch: 'horizontal',
    textAlign: 'center',
    backgroundColor: '#d3d3d3'
  }
});
var imgCardPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {width: '337px', backgroundColor: '#d3d3d3'}
});
var imgCardPanel_1 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {width: '337px', backgroundColor: '#d3d3d3'}
});
var imgCardPanel_2 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
  style: {width: '337px', backgroundColor: '#d3d3d3'}
});
//Mapa 0
map.setOptions('HYBRID');
map.setCenter(-78.613, -0.972, 7);
map.setControlVisibility({zoomControl: false, drawingToolsControl: true});
map.add(controlPanel);
//Mapa 1
map_1.setOptions('HYBRID');
map_1.setCenter(-78.613, -0.972, 7);
map_1.setControlVisibility({zoomControl: false, drawingToolsControl: true});
map_1.add(controlPanel_1);
//Mapa 2
map_2.setOptions('HYBRID');
map_2.setCenter(-78.613, -0.972, 7);
map_2.setControlVisibility({zoomControl: false, drawingToolsControl: false});
//Mapa 3
map_3.setOptions('HYBRID');
map_3.setCenter(-78.613, -0.972, 7);
map_3.setControlVisibility({zoomControl: false, drawingToolsControl: false});
//Mapa 4
map_4.setOptions('HYBRID');
map_4.setCenter(-78.613, -0.972, 7);
map_4.setControlVisibility({zoomControl: false, drawingToolsControl: false});
//splitPanel 0
var splitPanel = ui.SplitPanel({
  firstPanel: map,
  secondPanel: imgCardPanel,
  orientation: 'horizontal',
  wipe: false,
});
var splitPanel_1 = ui.SplitPanel({
    firstPanel: map_1,
    secondPanel: imgCardPanel_1,
    orientation: 'horizontal',
    wipe: false,
});
ui.root.add(splitPanel);