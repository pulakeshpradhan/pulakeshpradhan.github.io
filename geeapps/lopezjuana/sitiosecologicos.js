//App para delimitar sitios ecológicos a partir de productos de sensores remotos
//Juana López - 5/08/2021
//*****************************************************************************
//                      Definición de estilos
//*****************************************************************************
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var BORDER_STYLE = '4px solid rgba(97, 97, 97, 0.05)';
var LABEL_STYLE = {
  margin: '0 0 0 12px',
  fontSize: '14px',
  color: 'gray'
};
var CHECK_STYLE = {
  width:'160px',
  fontSize:'13px', 
  padding:'0px', 
  margin:'5px', 
  shown: 'true'
};
//******************************************************************************
//                      Definición de Paneles
//******************************************************************************
ui.root.clear();
var mapPanel = ui.Map();
mapPanel.setControlVisibility({layerList: false, zoomControl: false, scaleControl: false, mapTypeControl: true, fullscreenControl: true, drawingToolsControl: true})
mapPanel.setCenter(-63.68,-27.48,12).setOptions('HYBRID').style().set('cursor', 'crosshair');    
// Use un SplitPanel para que sea posible cambiar el tamaño de los dos paneles.
var mainPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {
    stretch: 'horizontal',
    height: '60%',
    width: '460px',
    //backgroundColor: colors.gray,
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
var avisosPanel = new ui.Panel([], ui.Panel.Layout.Flow('vertical'),{width:'300px', height:'80px', color:'black',backgroundColor:'white', position: 'bottom-right', shown: false});
mapPanel.add(avisosPanel);
var clasifPanel = ui.Panel([], ui.Panel.Layout.Flow('vertical', true),{width:'200px', height:'450px', color:'black',backgroundColor:'white', position: 'bottom-right', shown: false});
//Activacion de banderas para ejecucion del proceso
var banderaArea = 0;
var banderaFecha = 0;
var bandResul = 0;
var bandSent = 0;
var bandLand = 0;
var banderaClas = 0;
var visProducto = 0;
var visDescarga = 0;
var areaInteres = ee.FeatureCollection([]);
var startDate = ee.Date('');
var endDate = ee.Date('');
var mensaje = '';
var timeField = 'system:time_start';
var stackComp = ee.Image([]);
//**************************************************************************************
//*******************Area de funciones***************************************************
var clipRegion = function(image) {
  return image.clipToCollection(areaInteres);
};
// Cloud masking sentinel
function maskCloudAndShadows(image) {
  var cloudProb = image.select('MSK_CLDPRB');
  var snowProb = image.select('MSK_SNWPRB');
  var cloud = cloudProb.lt(5);
  var snow = snowProb.lt(5);
  var scl = image.select('SCL'); 
  var shadow = scl.eq(3); // 3 = cloud shadow
  var cirrus = scl.eq(10); // 10 = cirrus
  // Cloud probability less than 5% or cloud shadow classification
  var mask = (cloud.and(snow)).and(cirrus.neq(1)).and(shadow.neq(1));
  return image.updateMask(mask);
}
// Adding a NDVI band sentinel
function addNDVI(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('ndvi')
  return image.addBands([ndvi])
}
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
var cloudMaskL457 = function(image) {
  var qa = image.select('pixel_qa');
  // If the cloud bit (5) is set and the cloud confidence (7) is high
  // or the cloud shadow bit is set (3), then it's a bad pixel.
  var cloud = qa.bitwiseAnd(1 << 5)
                .and(qa.bitwiseAnd(1 << 7))
                .or(qa.bitwiseAnd(1 << 3));
  // Remove edge pixels that don't occur in all bands
  var mask2 = image.mask().reduce(ee.Reducer.min());
  return image.updateMask(cloud.not()).updateMask(mask2);
};
// Utilice esta función para agregar variables para NDVI, tiempo y una constante
// a las imágenes del Landsat 8.
var addVariables8 = function(image) {
  // Calcular el tiempo en años fraccionarios desde la época.
  var date = ee.Date(image.get(timeField));
  var years = date.difference(ee.Date('1970-01-01'), 'year');
  // Devuelve la imagen con las bandas añadidas.
  return image
    // Añadir una banda NDVI.
    .addBands(image.normalizedDifference(['B5', 'B4']).rename('ndvi')).float()
    // Añadir una banda de tiempo.
    .addBands(ee.Image(years).rename('t').float())
    // Añade una banda constante.
    .addBands(ee.Image.constant(1));
};
// Utilice esta función para agregar variables para NDVI, tiempo y una constante
// a las imágenes del Landsat 7.
var addVariables7 = function(image) {
  // Calcular el tiempo en años fraccionarios desde la época.
  var date = ee.Date(image.get(timeField));
  var years = date.difference(ee.Date('1970-01-01'), 'year');
  // Devuelve la imagen con las bandas añadidas.
  return image
    // Añadir una banda NDVI.
    .addBands(image.normalizedDifference(['B4', 'B3']).rename('ndvi')).float()
    // Añadir una banda de tiempo.
    .addBands(ee.Image(years).rename('t').float())
    // Añade una banda constante.
    .addBands(ee.Image.constant(1));
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
//Función para mostrar mensajes de advertencia o información.
function advertir(mensaje){
  avisosPanel.clear();
  var avisoLabel = ui.Label({value: 'Aviso: ' + mensaje, style: {margin: '0 0 0 4px', fontSize: '12px', color: 'gray'}});
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
  //Función para remover una layer
var activarLayer = function(name, checked) {
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
    mapPanel.layers().get(index).setShown(checked)
  } else {
    print('Layer '+name+' not found')
  }
}
function addVisor(){
  clasifPanel.clear();
  visDescarga = 0
  //var panel = ui.Panel([], ui.Panel.Layout.Flow('vertical', true),{width:'200px', height:'400px', color:'black',backgroundColor:'white', position: 'bottom-right'});
  var visorLabel = ui.Label('Visualice y seleccione los productos',{'height':'32px','fontSize':'14px', 'fontWeight': 'bold', 'padding':'1px', 'margin':'1px'});
  clasifPanel.add(visorLabel);
  if(bandSent !== 0){
    var checkbox1 = ui.Checkbox({label:'Imagen Sentinel 2', style:CHECK_STYLE});
    var checkbox2 = ui.Checkbox({label:'NDVI Sentinel 2', style:CHECK_STYLE});
    checkbox1.onChange(function(checked) {activarLayer('Imagen Sentinel 2 - Falso color', checked)});
    checkbox2.onChange(function(checked) {activarLayer('Indice de vegetacion Sentinel 2', checked)});
    clasifPanel.add(checkbox1);
    clasifPanel.add(checkbox2);
  }
  if(bandLand !== 0){ 
    var checkbox3 = ui.Checkbox({label:'Imagen Landsat', style:CHECK_STYLE} );
    var checkbox4 = ui.Checkbox({label:'NDVI Landsat', style:CHECK_STYLE});
    checkbox3.onChange(function(checked) {activarLayer('Imagen Landsat - Falso color', checked)});
    checkbox4.onChange(function(checked) {activarLayer('Indice de vegetacion Landsat', checked)});
    clasifPanel.add(checkbox3);
    clasifPanel.add(checkbox4);
  }
  var checkbox5 = ui.Checkbox({label:'Altura', style:CHECK_STYLE});
  var checkbox6 = ui.Checkbox({label:'Pendiente', style:CHECK_STYLE});
  var checkbox7 = ui.Checkbox({label:'Aspecto', style:CHECK_STYLE});
  checkbox5.onChange(function(checked) {activarLayer('Altura', checked)});
  checkbox6.onChange(function(checked) {activarLayer('Pendiente', checked)});
  checkbox7.onChange(function(checked) {activarLayer('Aspecto', checked)});
  clasifPanel.add(checkbox5);
  clasifPanel.add(checkbox6);
  clasifPanel.add(checkbox7);
  //Agregar subpanel de número de clases
  var clasesLabel =  ui.Label('Número de clases',{'width':'110px','fontSize':'12px', 'padding':'0px', 'margin':'10px'});
  //var clasesAyuda = ui.Label('Defina el número de clases que desea identificar',{'width':'300px','fontSize':'10px', 'padding':'0px', 'margin':'1px'});
  var nroClases =  ui.Textbox({value: '4', style: {'width':'30px','fontSize':'10px', 'padding':'0px', 'margin':'1px'}});
  var clasesSubPanel = ui.Panel([clasesLabel, nroClases], ui.Panel.Layout.Flow('horizontal'));
  var clasificarButton = ui.Button({
    label: 'Clasificar',
    onClick: function(){
      clasificar();
    }
  });
  clasifPanel.add(clasesSubPanel);
  //clasifPanel.add(clasesAyuda);
  clasifPanel.add(clasificarButton);
  clasifPanel.style().set({shown: true});
  if(bandResul === 0){
    mapPanel.add(clasifPanel);
    bandResul = 1;
  }
  function clasificar(){
    var bandas = ee.List([]);
    if(bandSent !== 0){
      print(checkbox1.getValue(), 'valor');
      if(checkbox1.getValue() === true){
        bandas = bandas.cat(['B2','B3','B4','B5','B6','B7','B8','B8A','B11','B12']);
      }
    }
    if(bandSent !== 0){
      if(checkbox2.getValue() === true){
        bandas = bandas.cat(['ndvi']);
      }
    }
    if(bandLand !== 0){
      if(checkbox3.getValue() === true){
        bandas = bandas.cat(['blue', 'green', 'red', 'nir','swir1', 'swir2']);
      }
    }
    if(bandLand !== 0){
      if(checkbox4.getValue() === true){
        bandas = bandas.cat(['ndviLand']);
      }
    }
    if(checkbox5.getValue() === true){
      bandas = bandas.cat(['elevation']);
    }
    if(checkbox6.getValue() === true){
      bandas = bandas.cat(['slope']);
    }
    if(checkbox7.getValue() === true){
      bandas = bandas.cat(['aspect']);
    }
    print(bandas);
    //controlar que haya al menos 1 banda seleccionada y el número de clases sea mayor o igual a 2
    var nroClust = ee.Number.parse(nroClases.getValue(), 10).getInfo();
    var nroBandas = bandas.length().getInfo();
    print(nroClust, 'clases');
    print(nroBandas, 'bandas');
    banderaClas = 1;
    if(nroClust < 2){
      mensaje = 'El número de clases debe ser mayor o igual a 2';
      ee.String(mensaje).evaluate(advertir);
      banderaClas = 0;
    }   
    if(nroBandas < 1){
      mensaje = 'Seleccione 1 o más capas';
      ee.String(mensaje).evaluate(advertir);
      banderaClas = 0;
    }
    if(banderaClas === 1){
      var stackSel = stackComp.select(bandas).toFloat();
      //Clasificacion no supervisada
      // Make the training dataset.
      var training = stackSel.sample({
        region: areaInteres,
        scale: 10,
        numPixels: 5000
      });
      // Instantiate the clusterer and train it.
      var clusterer = ee.Clusterer.wekaKMeans(nroClust).train(training);
      // Cluster the input using the trained clusterer.
      var result = stackSel.cluster(clusterer);
      if(visProducto === 1){
        removeLayer('Producto clasificado');
        mapPanel.addLayer(result.randomVisualizer(), {}, 'Producto clasificado', true);
      }
      else{
        mapPanel.addLayer(result.randomVisualizer(), {}, 'Producto clasificado', true);
        var checkbox8 = ui.Checkbox({label:'Producto clasificado', style:CHECK_STYLE}).setValue(true);
        checkbox8.onChange(function(checked) {activarLayer('Producto clasificado', checked)});
        clasifPanel.add(checkbox8);
        visProducto = 1;
      }
      exportar(result);
    }
  }
}
var exportar = function(cluster){
  cluster = ee.Image(cluster);
  var clusterVec = cluster.reduceToVectors({
    //reducer:ee.Reducer.mean(),
    geometry:areaInteres,
    scale:20,
    maxPixels:1e12,
    bestEffort: true,
    tileScale: 4,
  });
  function downloadCluster(){ 
    var downloadArgs = {
      format: 'kml',
      filename: 'SitiosEcolPoten',
    };
    var url = clusterVec.getDownloadURL(downloadArgs);
    urlLabel.setUrl(url);
    urlLabel.style().set({shown: true});
  }
  // Add UI elements to the Map.
  var downloadButton = ui.Button('Descargar sitios potenciales', downloadCluster);
  var urlLabel = ui.Label('Descargar', {shown: false});
  if(visDescarga === 0){
    clasifPanel.add(downloadButton);
    clasifPanel.add(urlLabel);
    visDescarga = 1;
  }
};
//********************Función principal*******************************************
//********************************************************************************
function init(){
  var table = ui.Chart(
    [
    ['<img src=https://raw.githubusercontent.com/lopezjuana/Proyectos_SIG/master/LogoINTASITSE.png width=420px height=70px>']
  ],
  'Table', {allowHtml: true});
  var titlePanel = ui.Panel([table], 'flow', {width: '465px', height:'75px', padding: '0 0 0 0', margin: '0 0 0 0'});
  //mainPanel.insert(0, titlePanel);
  var intro = ui.Label('DELIMITACIÓN DE SITIOS ECOLÓGICOS POTENCIALES', 
    {fontWeight: 'bold', fontSize: '14px', margin: '20px 2px'});
  var urlAyuda = ui.Label({
    value: '¿Cómo se utiliza esta APP?',
    style: {margin: '12px', fontSize: "14px", backgroundColor:'00000000'},
    targetUrl: 'https://drive.google.com/file/d/1pgyXZt0182Z4cHq9WPCM2yfAY-Z1fGkL/view?usp=sharing'
  });
  //Añadir la descripcion de la app
  var descriptionText =
      'Esta app nos permite visualizar imágenes satelitales, modelos de elevación digital y productos derivados ' +
      'para delimitar y/o caracterizar sitios ecológicos potenciales utilizando algoritmos de clasificación no supervisada.';
  var descriptionLabel = ui.Label(descriptionText, {margin: '0 0 0 12px',fontSize: '14px',color: 'gray'});
  var firstSubTitle_text = '1. Delimite el área de interés.';
  var firstSubTitle = ui.Label(firstSubTitle_text);
  var drawButton = ui.Button({
    label: 'Dibuje un Poligono',
    onClick: function(){
      mensaje = 'Haga clic en cada vértice del lote, cierre haciendo clic en el primero.';
      ee.String(mensaje).evaluate(advertir);
      // No haga importaciones que correspondan a los rectángulos dibujados.
      mapPanel.drawingTools().setLinked(false);
      // Limite los modos de dibujo a rectángulos.
      mapPanel.drawingTools().setDrawModes(['rectangle']);
      // Agregue una capa vacía para sostener el rectángulo dibujado.
      mapPanel.drawingTools().addLayer([]);
      // Establecer el tipo de geometría para ser rectángulo.
      mapPanel.drawingTools().setShape('polygon');
      // Ingrese al modo de dibujo.
      mapPanel.drawingTools().draw();
      mapPanel.drawingTools().onDraw(function (geometry){
        // Haz algo con la geometría
        var AOI = mapPanel.drawingTools().toFeatureCollection(0);
        //Map.addLayer (AOI, nulo, 'Región de interés');
        mapPanel.centerObject(AOI);
        mapPanel.drawingTools().stop();
        mapPanel.drawingTools().layers().forEach(function(layer) {
          layer.setShown(false);
        });
        areaInteres = AOI;
        banderaArea = 1;
        var AOIOutline = ee.Image().byte().paint({
          featureCollection: areaInteres,
          color: 1,
          width: 2
        });
        mapPanel.addLayer(AOIOutline, {palette: ['white']}, 'Área de interés');
      });
    }
  });
  var secondSubParagraph_text = '2. Seleccione el período de interés.';
  var secondSubParagraph = ui.Label(secondSubParagraph_text)
  //Obtenga la fecha de hoy y páselo como fecha de finalización predeterminada. 
  var now = new Date();
  var nowStr = now.toLocaleDateString('en-CA'); 
  var fechaFinText = ui.Textbox({
    value: nowStr,
    placeholder: 'AAAA-MM-DD',
    onChange: function(end) {
       fechaFinText.setValue(end);
       endDate = fechaFinText.getValue();
    }
  });
  //Obtenga la fecha del mes pasado y páselo como fecha de inicio predeterminada.
  var dateNow = ee.Date(nowStr);
  var lastMonth = dateNow.advance(-1, 'month').format ("YYYY-MM-dd");
  var fechaIniText = ui.Textbox({
    value: lastMonth.getInfo(),
    placeholder: 'AAAA-MM-DD',
    onChange: function(start) {
      fechaIniText.setValue(start);
      startDate = fechaIniText.getValue();
    }
  });
  startDate = fechaIniText.getValue();
  endDate = fechaFinText.getValue();
  var fechaIni = ui.Label('Fecha de inicio', LABEL_STYLE);
  var fechaFin = ui.Label('Fecha de fin', LABEL_STYLE);
  var thirdSubParagraph_text = '3. Visualice y seleccione los productos a utilizar.';
  var thirdSubParagraph = ui.Label(thirdSubParagraph_text)
  var mostrarImagButton = ui.Button({
    label: 'Visualizar',
    onClick:function(){
      if(banderaArea == 1){
        var difDias = ee.Date(fechaFinText.getValue()).difference(ee.Date(fechaIniText.getValue()), 'days');
        banderaFecha = ee.Algorithms.If(difDias.gt(-1), 1, 0);
        if(banderaFecha.getInfo() == 1){
          //mensaje = 'Haga clic en Layers para visualizar las capas de información';
          //ee.String(mensaje).evaluate(advertir);
          mostrarImagen(areaInteres);
          addVisor();
        }
        else{
          mensaje = 'Especifique el rango de fechas';
          ee.String(mensaje).evaluate(advertir);
        }
      }
      else { 
        mensaje = 'Establezca el área de interés';
        ee.String(mensaje).evaluate(advertir);
      }
    }
  });
  var botonreinicio = ui.Button({
    label: 'Cambiar el área',
    onClick: function(i) {
      mapPanel.clear();
      mainPanel.clear();
      avisosPanel = new ui.Panel([], ui.Panel.Layout.Flow('vertical'),{width:'300px', height:'80px', color:'black',backgroundColor:'white', position: 'bottom-right', shown: false});
      mapPanel.add(avisosPanel);
      clasifPanel = ui.Panel([], ui.Panel.Layout.Flow('vertical', true),{width:'200px', height:'450px', color:'black',backgroundColor:'white', position: 'bottom-right', shown: false});
      mapPanel.drawingTools().clear();
      mapPanel.setControlVisibility({layerList: false, zoomControl: false, scaleControl: false, mapTypeControl: true, fullscreenControl: true, drawingToolsControl: true})
      mapPanel.setOptions('HYBRID').style().set('cursor', 'crosshair');  
      //Activacion de banderas y variables para ejecucion del proceso
      banderaArea = 0;
      banderaFecha = 0;
      bandResul = 0;
      bandSent = 0;
      bandLand = 0;
      banderaClas = 0;
      visProducto = 0;
      visDescarga = 0;
      areaInteres = ee.FeatureCollection([]);
      startDate = ee.Date('');
      endDate = ee.Date('');
      mensaje = '';
      timeField = 'system:time_start';
      stackComp = ee.Image([]);
      init();
    }
  });
  mainPanel.add(titlePanel);
  mainPanel.add(intro);
  mainPanel.add(descriptionLabel);
  mainPanel.add(urlAyuda);
  mainPanel.add(firstSubTitle);
  mainPanel.add(drawButton);
  mainPanel.add(secondSubParagraph);
  //mainPanel.add(selectSatelite);
  mainPanel.add(fechaIni).add(fechaIniText).add(fechaFin).add(fechaFinText);
  mainPanel.add(mostrarImagButton);
  //mainPanel.add(thirdSubParagraph);
  mainPanel.add(botonreinicio);
}
init();
var mostrarImagen = function(areaInteres){
  Map.centerObject(areaInteres,8);
  clasifPanel.clear();
  visProducto = 0; 
  removeLayer('Imagen Sentinel 2 - Falso color');
  removeLayer('Indice de vegetacion Sentinel 2');
  removeLayer('Imagen Landsat - Falso color');
  removeLayer('Indice de vegetacion Landsat');
  removeLayer('Producto clasificado');
  removeLayer('Altura');
  removeLayer('Pendiente');
  removeLayer('Aspecto');
  //Filtrar para generar el gráfico
  //var dateNow = ee.Date(nowStr);
  var lastMonth = ee.Date(endDate).advance(-2, 'month').format ("YYYY-MM-dd");
  var collection = ee.ImageCollection('COPERNICUS/S2_SR')
    .filter(ee.Filter.date(lastMonth, endDate))
    .map(maskCloudAndShadows)
    .map(addNDVI)
    .filter(ee.Filter.bounds(areaInteres));
  print(collection);
  //Filtrar la imagen del área y fecha requeridos
  //Crear set de imágenes Landsat para graficar y mostrar si se selecciona Lansat en el paso 2
  var coleccionSel = collection
    .filterDate(startDate, endDate).map(clipRegion);
  var coleccionNoSel = collection.filter(ee.Filter.date(startDate, endDate).not());
  var sizeCollection = collection.size().getInfo();
  var sizeCollecNoSel = coleccionNoSel.size().getInfo();
  //Seleccionar imagen Landsat
  var l5toa = ee.ImageCollection('LANDSAT/LT05/C01/T1_SR');
  var l8toa = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR');
  // Utilice esta función para enmascarar nubes en imágenes Landsat 8.
  // Eliminar nubes, agregar variables y filtrar al área de interés.
  var filteredLandsat8 = l8toa.filterDate(lastMonth, endDate)
    .filterBounds(areaInteres)
    .map(maskL8sr)
    .map(addVariables8).select(['B2','B3','B4','B5','B6','B7', 'ndvi'],['blue', 'green', 'red', 'nir','swir1', 'swir2', 'ndviLand']);
  var filteredLandsat7 = l5toa.filterDate(lastMonth, endDate)
    .filterBounds(areaInteres)
    .map(cloudMaskL457)
    .map(addVariables7).select(['B1','B2','B3','B4','B5','B7', 'ndvi'],['blue', 'green', 'red', 'nir','swir1', 'swir2', 'ndviLand']);
  var l7l8 = filteredLandsat7.merge(filteredLandsat8);
  var l7l8Sel = l7l8.filterDate(startDate, endDate).map(clipRegion);
  print(l7l8Sel);
  var coleccionLandNoSel = l7l8.filter(ee.Filter.date(startDate, endDate).not());
  var sizeCollectionLand = l7l8.size().getInfo();
  var sizeCollecLandNoSel = coleccionLandNoSel.size().getInfo();
  //Determinar si se seleccionaron imágenes
  if(sizeCollection === sizeCollecNoSel){
    mensaje = 'No se encontraron imágenes Sentinel. Seleccione un intervalo de fechas más amplio.';
    ee.String(mensaje).evaluate(advertir);
    bandSent = 0;
  }
  else{
    bandSent = 1;
  }
  if(sizeCollectionLand === sizeCollecLandNoSel){
    mensaje = 'No se encontraron imágenes Landsat. Seleccione un intervalo de fechas más amplio.';
    ee.String(mensaje).evaluate(advertir);
    bandLand = 0;
  }
  else{
    bandLand = 1;
  }
  var suma = bandSent + bandLand;
  print(suma, 'suma');
  imprimir();
  //Visualizar todas las capas
  function imprimir(){
    //Remover suelos, departamentos y poblaciones para agregarlo sobre las imágenes
    removeLayer('Área de interés');
    var ndviParams = {palette: ['ff0000', 'ffa500', 'ffff00', '90ee90', '00be00', '005c00'], min: -0.15, max: 0.9};
    if(bandSent !== 0){
      var mosaicoSen = coleccionSel.select(['B2','B3','B4','B5','B6','B7','B8','B8A','B11','B12','ndvi']).median();
      var vizParamsSent = {bands: ['B8', 'B11', 'B4'], min: 289, max: 4135};
      mapPanel.addLayer(mosaicoSen, vizParamsSent, 'Imagen Sentinel 2 - Falso color', false);
      mapPanel.addLayer(mosaicoSen.select('ndvi'), ndviParams , 'Indice de vegetacion Sentinel 2', false);
    }
    if(bandLand !== 0){
      var mosaicoLand = l7l8Sel.median();
      var vizParams = {bands: ['nir', 'swir1', 'red'], min: 500, max: 3200};
      mapPanel.addLayer(mosaicoLand, vizParams, 'Imagen Landsat - Falso color', false);
      mapPanel.addLayer(mosaicoLand.select('ndviLand'), ndviParams , 'Indice de vegetacion Landsat', false);
    }
    var dem = ee.Image("USGS/SRTMGL1_003").clip(areaInteres);
    var terrain = ee.Algorithms.Terrain(dem);
    //var ALOSDSM = ALOSDSM.select('AVE_DSM').clip(area_estudio);
    print(terrain);
    var slope = terrain.select("slope");
    var aspect = terrain.select("aspect");
    var hillshade = terrain.select("hillshade");
    stackComp = ee.Image.cat(dem, slope, aspect);// SARVV_filtered,SARVH_filtered).clip(roi).toFloat();
    if(bandSent !== 0){
      stackComp = ee.Image.cat(stackComp, mosaicoSen);
    }
    if(bandLand !== 0){
      stackComp = ee.Image.cat(stackComp, mosaicoLand);
    }
    print(stackComp);
    //Calcular los percentiles para visualizar las imagenes y el DEM
    // Calculate the 2nd and 98th percentile elevation values from rescaled (to
    // 500m) pixels intersecting the area of interest. A Dictionary is returned.
    var percentDEM = dem.reduceRegion({
      reducer: ee.Reducer.percentile([2, 98]),
      geometry: areaInteres,
      scale: 90,
      maxPixels: 3e7
    });
    // Print the regional 2nd and 98th percentile elevation values. Get the
    // dictionary keys and use them to get the values for each percentile summary.
    var keys = percentDEM.keys();
    var min = ee.Number(percentDEM.get(keys.get(0))).round().getInfo();
    var max = ee.Number(percentDEM.get(keys.get(1))).round().getInfo();
    print(min, 'min');
    //var elevationPalette = ['006600', '002200', 'fff700', 'ab7634', 'c4d0ff'];
    var vizDEM = {min:min, max:max, palette:"1400f7,00f4e8,f4f000,b44d25"};
    //var vizDEM = {min:min, max:max, palette:elevationPalette};
    var vizSlope = {
      min: 0.0,
      max: 30.0,
      palette: [
        '3ae237', 'b5e22e', 'd6e21f', 'fff705', 'ffd611', 'ffb613', 'ff8b13',
        'ff6e08', 'ff500d', 'ff0000', 'de0101', 'c21301', '0602ff', '235cb1',
        '307ef3', '269db1', '30c8e2', '32d3ef', '3be285', '3ff38f', '86e26f'
      ]
    };
    var vizAspect = {
      min: 0.0,
      max: 360.0,
      palette: [
        '3ae237', 'b5e22e', 'd6e21f', 'fff705', 'ffd611', 'ffb613', 'ff8b13',
        'ff6e08', 'ff500d', 'ff0000', 'de0101', 'c21301', '0602ff', '235cb1',
        '307ef3', '269db1', '30c8e2', '32d3ef', '3be285', '3ff38f', '86e26f'
      ]
    };
    mapPanel.addLayer(dem.select('elevation'), vizDEM,"Altura", false);
    mapPanel.addLayer(slope, vizSlope,"Pendiente", false);
    mapPanel.addLayer(aspect, {},"Aspecto", false);
  }
};