//Lienzo en blanco
ui.root.clear();
var map = ui.Map();
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
//Función para limpiar imagenes
function clearImgs() {
  while (map.layers().length() > 0) {
    map.layers().remove(map.layers().get(0));
  }
}
//Mascara de nubes landsat 8
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
//Mascara de nubes Sentinel 2
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
//Funcion recortar
function corte(img){
  return img.clip(drawingTools.layers().get(0).getEeObject());
}
//Paneles de instruccione
var title = ui.Label('Instrucciones', {fontSize: '16px', fontWeight: 'bold'});
var instr1 = ui.Label('1. Seleccione el area de estudio.', {fontSize: '14px', margin: '8px 8px 4px 8px'});
var instr2 = ui.Label('2. Seleccione la plataforma satelital.', {fontSize: '14px', margin: '8px 8px 4px 8px'});
var instr3 = ui.Label('3. Seleccione la maxima cobertura de nubes', {fontSize: '14px'});
var instr4 = ui.Label('4. Selecione el índice entre las siguientes opciones:', {fontSize: '14px', margin: '8px 8px 4px 8px'});
var instr5 = ui.Label('5. Intervalo tiempo 0:', {fontSize: '14px'});
var instr6 = ui.Label('6. Intervalo tiempo 1:', {fontSize: '14px'});
var instr7 = ui.Label('7. Intervalo tiempo 2:', {fontSize: '14px'});
var instr8 = ui.Label('8. Enlace de descarga:', {fontSize: '14px'});
//Paneles de botones:
var symbol = {
  point: '●',
  rectangulo: '▊'
};
var regionButtonPanel = ui.Panel([
    ui.Button({
      label: symbol.rectangulo + ' Area de estudio',
      onClick: drawRectangle,
      style: {stretch: 'horizontal', margin:'1px'}}),
    ], ui.Panel.Layout.flow('horizontal'), {margin: '8px'}
);
var plataforma = ui.Select({
  items: ['Sentinel 2', 'Landsat 8'],
  placeholder: 'Sentinel 2',
  value: 'Sentinel 2',
  style: {stretch: 'horizontal'},
  onChange: function Sate (pre) {
        plataforma.setValue(pre);
        print (plataforma.getValue());
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
        print ("El indice seleccionado es: ", In.getValue());
  },
});
//Porcentaje de nubes
var maxCldCvr = ui.Slider({min: 0, max: 100, value: 60, step: 1,
  style: {stretch: 'horizontal'}});
//Selector de las fechas
var tiempo = [];
    tiempo[0] = ui.Textbox({
      placeholder: 'YYYY-MM-DD',
      style:{textAlign: 'center',width:'100px'},
      onChange: function(pre) {
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
var tiempo1 = ui.Panel({
  //style: {width: '400px'/*, border: '0.5px solid black'*/},
  layout: ui.Panel.Layout.Flow('horizontal'),
});
tiempo1.add(ui.Panel([tiempo[0], tiempo[1]],ui.Panel.Layout.Flow('horizontal')));
    tiempo[2] = ui.Textbox({
      placeholder: 'YYYY-MM-DD',
      style:{textAlign: 'center',width:'100px'},
      onChange: function(pre) {
        tiempo[2].setValue(pre);
    }
    });
    tiempo[3] = ui.Textbox({
      placeholder: 'YYYY-MM-DD',
      style:{textAlign: 'center',width:'100px'},
      onChange: function(pre) {
        tiempo[3].setValue(pre);
    }
  });
var tiempo2 = ui.Panel({
  //style: {width: '400px'/*, border: '0.5px solid black'*/},
  layout: ui.Panel.Layout.Flow('horizontal'),
});
tiempo2.add(ui.Panel([tiempo[2], tiempo[3]],ui.Panel.Layout.Flow('horizontal')));
    tiempo[4] = ui.Textbox({
        placeholder: 'YYYY-MM-DD',
        style:{textAlign: 'center',width:'100px'},
        onChange: function(pre) {
        tiempo[4].setValue(pre);
    }
    });
    tiempo[5] = ui.Textbox({
        placeholder: 'YYYY-MM-DD',
        style:{textAlign: 'center',width:'100px'},
        onChange: function(pre) {
        tiempo[5].setValue(pre);
    }
    });
var tiempo3 = ui.Panel({
  //style: {width: '400px'/*, border: '0.5px solid black'*/},
  layout: ui.Panel.Layout.Flow('horizontal'),
});
tiempo3.add(ui.Panel([tiempo[4], tiempo[5]],ui.Panel.Layout.Flow('horizontal')));
//Boton ejecutar
var crear = ui.Panel([
    ui.Button({
      label: 'Ejecutar',
      onClick: Ejecutar,
      style: {stretch: 'horizontal', margin:'1px'}}),
    ], ui.Panel.Layout.flow('horizontal'), {margin: '8px'}
);
//Se añaden los paneles
var controlPanel = ui.Panel([
    title,
    instr1,
    regionButtonPanel,
    instr2,
    plataforma,
    instr3,    
    maxCldCvr,
    instr4,
    In,
    instr5,
    tiempo1,
    instr6,
    tiempo2,
    instr7,
    tiempo3,
    crear,
    instr8,
  ] ,
  null, {position: 'bottom-left', width: '280px'}
);
//Funcion para ejecutat codigo
function Ejecutar(){
  var Satelite = plataforma.getValue();
  print('el codigo esta funcionando');
  clearImgs();
  map.clear();
  map.setOptions('HYBRID');
  // Creamos nuestra area de estudio
  var Area_estudio = drawingTools.layers().get(0).getEeObject();
  var nubes = maxCldCvr.getValue();
  print("% de nubes", nubes);
  print("Plataforma_Satelital", Satelite);
  var Indice = In.getValue();
  //Seleccionamos la coleccion de imagenes
  //1: Landsat 8
  //2: Sentinel 2
  //Escoger una opccion
  var n = 0;
  var m = 0;
  var Colection = [];
  var Col_indice = [];
  var Col_corte = [];
  var Col_corte_prom = []; 
  var Col_prom = [];
  var Col_prom_in = [];
  //-------------------------------------------------------------------------------------------
  // Centramos acorde al area de estudio
  map.centerObject(Area_estudio,9);
  for(var i=1; i <= 3; i=i+1){
    // Fechas de estudio
    var t1a = tiempo[m].getValue();
    var t1b = tiempo[m+1].getValue();
    print ('tiempo_'+n, t1a, m, t1b, m+1);
    m = m + 2;
    // Guardamos y corremos el programa
    if (Satelite == 'Landsat 8'){
      Colection[n] = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
                      .filterBounds (Area_estudio)
                      .filterDate(t1a, t1b)
                      .filterMetadata("CLOUD_COVER", "less_than", nubes);
      Colection[n] = Colection[n].map(maskL8sr).map(corte);
      print ("la coleccion al tiempo " + n + "es: ", Colection[n]);
    } else {
      Colection[n] = ee.ImageCollection("COPERNICUS/S2_SR")
                      .filterBounds (Area_estudio)
                      .filterDate(t1a, t1b)
                      .filterMetadata("CLOUDY_PIXEL_PERCENTAGE","less_than", nubes);
      Colection[n] = Colection[n].map(maskS2clouds).map(corte);
      print ("entro a la colección Sentinel")
  }
  // Determinamos el numero de imagenes que tenemos en la coleeccion
  var N_imagenes = Colection[n].size();
  print ('Numero de imagenes:', N_imagenes);
  //Calculamos los diferentes indices
  switch (Indice) {
    case 'NDVI (Normalice diference vegetacion index)':
      var Nin = 'NDVI';
      var Vis_param = {"opacity":1,
      "bands":["NDVI"],
      "min":0,"max":0.8,
      "palette":["red","yellow","green"]};
      Col_indice[n] = Colection[n].map(NDVI);
      print ("la coleccion al tiempo " + n + "acorde al indice es: ", Col_indice[n]);
    break;
//------------------------------------------------------------------------------------------------------
    case 'NDWI (Normalized difference water index)':
      Nin = 'NDWI';
      Col_indice[n] = Colection[n].map(NDWI);
      Vis_param = {
        "opacity":1,
        "bands":["NDWI"],
        "min":-1,
        "max":0.2,
        "palette":["169d06","ff1818","37edff"]};
      break;
//-----------------------------------------------------------------------
    case 'GCI (Green Coverage Index)':
      Nin = 'GCI';
      Col_indice[n] = Colection[n].map(GCI);
      if (Satelite == 'Landsat 8'){
        var min = 1;
        var max = 5;
      } else {
          min = 0;
          max = 3.5;
      }
      Vis_param = {
        "opacity":1,
        "bands":["GCI"],
        "min": min,
        "max": max,
        "palette":["b48674","ffee25","5fff6c","2a8138"]};
    break;
//--------------------------------------------------------------------------
    case 'SAVI (Soil Adjusted Vegetation Index)':
      Nin = 'SAVI';
      Col_indice[n] = Colection[n].map(SAVI);
          if (Satelite == 'Landsat 8'){
            min = 0;
            max = 1.5;
      } else {
            min = 0;
            max = 1;
      }
      Vis_param = {
        "opacity":1,
        "bands":["SAVI"],
        "min":0,
        "max":1.5,
        "palette":["red","yellow","green"]};
      break;
//--------------------------------------------------------------------------
    case 'NBR (Normalized Burn Ratio)':
      Nin = 'NBR';
      Col_indice[n] = Colection[n].map(NBR);
      Vis_param = {
        "opacity":1,
        "bands":["NBR"],
        "min":-0.4,
        "max":0.8,
        "palette":["169d06","ff1818","37edff"]};
      break;
    default:
      print ('Aun no se desarrolla el indice solicitado');
  }
  var RGBVis = {
    "opacity":1,
    "bands":["B4","B3","B2"],
    "min":101.111,
    "max":3431.380,
    "gamma":[1.2, 1.2, 1.2]};
  //Se determina el promedio
  Col_prom[n] =  Col_indice[n].mean();
  map.addLayer(Col_prom[n], RGBVis, 'Promedio_RGB_tiempo_'+n,0);
  print ('Promedio_RGB_tiempo_'+n, Col_prom[n]);
  var nombre = 'Promedio_'+ Nin + '_' + n;
  map.addLayer(Col_prom[n], Vis_param, nombre, 1);
  n = n+1; 
  }
  var img_mul_t = ee.Image.cat(Col_prom[0].select(Nin), Col_prom[1].select(Nin), Col_prom[2].select(Nin));
  map.addLayer(img_mul_t, {}, "img_mul_t");
  // Creamos un titulo
  var title = ui.Label(Nin + ' Promedio');
  title.style().set({
    position: 'top-center',
    fontWeight: 'bold'
  });
  map.add(title);
  //Barra NDVI
  var palette = ['red', 'yellow', 'green'];
  var makeColorBarParams = function (palette) {
    return {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x8',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    };
  };
  var colorBar = ui.Thumbnail({
  //Se crea una imagen que contiene los valores de lat y long por pixel
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams(Vis_param.palette),
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '100px', width: '200px'},
  });
  var minimo = Vis_param.min;
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(Vis_param.min, {margin: '4px 5px'}),
      ui.Label(
        ((Vis_param.max + Vis_param.min) / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(Vis_param.max, {margin: '4px 8px'})
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  var legendTitle = ui.Label({
    value: Nin,
    style: {
      fontWeight: 'bold',
      margin: '4px 8px'
      //width: '200px',
      //height : '10px'
    }
  });
  var legendPanel = ui.Panel(legendTitle).add(colorBar).add(legendLabels);
  legendPanel.style().set({
    //height: '95px',
    //width: '200px',
    position: 'bottom-right'
  });
  map.add(legendPanel);
}
//Funcion para los Índices
//NDVI
var NDVI = function(img){
    var Satelite = plataforma.getValue();
    if (Satelite == 'Landsat 8'){
          var NDVI_img = img.addBands(img.normalizedDifference(['B5','B4']).rename("NDVI"));
          return NDVI_img;
    } else {
        var NDVI_img_ST = img.addBands(img.normalizedDifference(['B8','B4']).rename("NDVI"));
         return NDVI_img_ST;
    }
};
//NDWI
var NDWI = function(img){
    var Satelite = plataforma.getValue();
    if (Satelite == 'Landsat 8'){
        var NDWI_img = img.addBands(img.normalizedDifference(['B3','B6']).rename("NDWI"));
        return NDWI_img;
    } else {
        var NDWI_img_ST = img.addBands(img.normalizedDifference(['B3','B11']).rename("NDWI"));
        return NDWI_img_ST;
    }
};
//GCI
var GCI = function(img){
    var Satelite = plataforma.getValue();
    if (Satelite == 'Landsat 8'){
      var GCI_img = img.addBands(((img.select("B5").divide(img.select("B3"))).subtract(1)).rename("GCI"));
      return GCI_img;
    } else {
      var GCI_img_ST = img.addBands(((img.select("B7").divide(img.select("B5"))).subtract(1)).rename("GCI"));
      return GCI_img_ST;
    }
};
//SAVI
var SAVI = function(img){
    var Satelite = plataforma.getValue();
    if (Satelite == 'Landsat 8'){
      var B5 = img.select("B5");
      var B4 = img.select("B4");
      var L = 0.2;
      var SAVI_img = img.addBands((((B5.subtract(B4)).divide((B5.add(B4)).add(L))).multiply(L+1))
      .rename("SAVI"));
      return SAVI_img;
    } else {
      var B8_ST = img.select("B8");
      var B4_ST = img.select("B4");
      var L_ST = 0.2;
      var SAVI_img_ST = img.addBands((((B8_ST.subtract(B4_ST)).divide((B8_ST.add(B4_ST)).add(L_ST))).multiply(L_ST+1))
      .rename("SAVI"));
      return SAVI_img_ST;
    }
};
//NBR
var NBR = function(img){
    var Satelite = plataforma.getValue();
    if (Satelite == 'Landsat 8'){
        var NBR_img = img.addBands(img.normalizedDifference(['B5','B6']).rename("NBR"));
        return NBR_img;
    } else {
        var NBR_img_ST = img.addBands(img.normalizedDifference(['B8','B11']).rename("NBR"));
        return NBR_img_ST;
    }
};
var splitPanel = ui.SplitPanel({
  firstPanel: map,
  secondPanel: controlPanel,
  orientation: 'horizontal',
  wipe: false,
});
map.setOptions('HYBRID');
map.setControlVisibility({zoomControl: false});
ui.root.add(splitPanel);