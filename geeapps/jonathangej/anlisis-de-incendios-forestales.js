var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint(),
    Quemado = ui.import && ui.import("Quemado", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.FeatureCollection([]),
    No_Quemado = ui.import && ui.import("No_Quemado", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "FeatureCollection",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.FeatureCollection([]);
//Etiquetas
var Etiquetas = {
  titulo:['Estimación de Severidad de Incendios Forestales','Forest Fire Severity Assesment'],
  intro:['Calcula la severidad de un incendio forestal con los índices NBR, NDVI, NDWI, IAQ y BAIS2','This app calculates the forest fire severity using NBR, NDVI, NDWI, BAI, BAIS2'],
  lab_AOI:['Dibuje el área de interés','Draw your area of interest'],
  AOI:['Área de interés','Area of interest'],
  interval_pre:['Intervalo pre-evento','Pre-event interval'],
  interval_pos:['Intervalo pos-evento','Pos-event interval'],
  B_buscar: ['Buscar','Search'],
  B_calc: ['Calcular','Run'],
  Dl_antes: ['Antes','Pre-fire'],
  Dl_despues: ['Después','Pos-fire'],
  Dl_diferencia: ['Diferencia','Difference'],
  Adv_1: ['Presione Guardar si desea conservar la imagen, Remover para eliminar la última imagen o Reiniciar para borrar todas','Press save to include the image, Remove to delete the last image or Reset to delete all the images'],
  B_guardar: ['Guardar','Save'],
  B_remover: ['Remover','Remove'],
  B_reiniciar: ['Reiniciar','Reset'],
  L_descarga: ['Descarga','Download'],
  L_res: ['Elegir tamaño de celda [m]','Cell size [m]'],
  Leyenda: ['Leyenda','Legend'],
  Clasificar: ['Clasificar (Random Forest)','Classify (Random Forest)'],
  Area_Q: ['Área Quemada: ','Burned Area: '],
  L_Kappa_Training: ['Índice Kappa (Entrenamiento): ', 'Kappa Index (Training): '],
  L_Kappa_Testing: ['Índice Kappa (Prueba): ', 'Kappa Index (Testing): '],
  Descripcion_C: ['1.Editar las geometrías Quemado y No_Quemado en Geometry Imports (50% entrenamiento y 50% de prueba).\n2.Asegúrese que esté cubierta toda el área de interés.\n3.Marcar las bandas de entrada',
    '1. Edit the geometries Quemado (Burned) or No_Quemado (Unburned) in Geometry Imports (50% for training and 50% for testing).\n2.Make sure that geometry covers your AOI.\n3.Check the input variables'],
  Graf_T: ['Importancia de las variables','Variable Importance'],
  Graf_I: ['Importancia','Importance'],
  Adv_nro_s:['Agregue más puntos de muestreo','Place more sample points'],
};
//Seleccion de idioma
var sel_idioma = ui.Select({
  items: ['Español','English'],
  value: 'Español',
  onChange: function(){
    var idioma = det_idioma();
    titulo_a.setValue(Etiquetas.titulo[idioma]);
    intro_a.setValue(Etiquetas.intro[idioma]);
    area_interes.setValue(Etiquetas.lab_AOI[idioma]);
    rect.setLabel(symbol.rectangle+Etiquetas.AOI[idioma]);
    pre_ev.setValue(Etiquetas.interval_pre[idioma]);
    Buscar_pre.setLabel(Etiquetas.B_buscar[idioma]);
    pos_ev.setValue(Etiquetas.interval_pos[idioma]);
    Buscar_pos.setLabel(Etiquetas.B_buscar[idioma]);
    calcular.setLabel(Etiquetas.B_calc[idioma]);
    descarga.setValue(Etiquetas.L_descarga[idioma]);
    cellsize.setValue(Etiquetas.L_res[idioma]);
    Leyenda.setValue(Etiquetas.Leyenda[idioma]);
  }
});
//Funcion para determinar idioma
var det_idioma = function(){ 
  var x;
  if (sel_idioma.getValue()=='English')
  {x = 1}
  else if (sel_idioma.getValue()=='Español')
  {x = 0}
  return x;
};
//Aplicar funcion de seleccion
var idioma = det_idioma();
//Paneles De Interfaz
var panel_principal = ui.Panel({
  style: {width: '25%'/*, border: '0.5px solid black'*/},
  layout: ui.Panel.Layout.flow('vertical'),
});
var panel_class = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '25%'/*, border: '0.5px solid black'*/,position:'bottom-center'},
});
var labels=ui.Panel();
var labels2=ui.Panel();
var Links=ui.Panel();
var prebox=ui.Panel();
var posbox=ui.Panel();
//Paneles para descargar datos
var ds_antes=ui.Panel({
  style: {width: '110px'},
});
var ds_despues=ui.Panel({
  style: {width: '110px'},
});
var ds_diferencia=ui.Panel({
  style: {width: '110px'},
});
var d_antes=ui.Panel({
  style: {width: '110px'},
});
var d_despues=ui.Panel({
  style: {width: '110px'},
});
var d_diferencia=ui.Panel({
  style: {width: '110px'},
});
//Grupo de paneles
var group_ds=ui.Panel([ds_antes, ds_despues, ds_diferencia],ui.Panel.Layout.Flow('horizontal'));
var group_d=ui.Panel([d_antes, d_despues, d_diferencia],ui.Panel.Layout.Flow('horizontal'));
//Funcion para crear paletas de colores
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
//Paleta de colores
var norm_viz={min:-1,max:1,palette:['#778835','#a8c050','#0be345','#f8fc11','#f87440','#f86719','#a600d4']};
//Crear la barra de color
var colorBar= ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(norm_viz.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', width: '150px', height: '30px',position:'top-left'},
});
var legendLabels = ui.Panel({
  widgets: [ui.Panel({widgets:[
      ui.Label(-500, {margin: '4px 8px'}),
      ui.Label(0, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(500, {margin: '4px 8px'})], 
    layout: ui.Panel.Layout.flow('horizontal'),
    style:{ height:'33px'}
  }),ui.Panel({widgets:[
      ui.Label(-1, {margin: '4px 8px'}),
      ui.Label(0, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(1, {margin: '4px 8px'})], 
    layout: ui.Panel.Layout.flow('horizontal'),
    style:{ height:'33px'}
  }),ui.Panel({widgets:[
      ui.Label(-1, {margin: '4px 8px'}),
      ui.Label(0, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(1, {margin: '4px 8px'})], 
    layout: ui.Panel.Layout.flow('horizontal'),
    style:{ height:'33px'}
  }),ui.Panel({widgets:[
      ui.Label(-1, {margin: '4px 8px'}),
      ui.Label(0, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(1, {margin: '4px 8px'})], 
    layout: ui.Panel.Layout.flow('horizontal'),
    style:{ height:'33px'}
  }),ui.Panel({widgets:[
      ui.Label(-1, {margin: '4px 8px'}),
      ui.Label(0, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(1, {margin: '4px 8px'})], 
    layout: ui.Panel.Layout.flow('horizontal')
  })],
  layout: ui.Panel.Layout.flow('vertical')
});
var Leyenda=ui.Label(Etiquetas.Leyenda[idioma],{fontWeight:'bold'});
var panel_T=ui.Panel({
  widgets:[
    ui.Panel({
      widgets:[
        ui.Label({
          value:'',
          style:{height:'42px'}
        }),
        ui.Label('DIAQ'),
        ui.Label('DBAIS2'),
        ui.Label('DNDWI'),
        ui.Label('DNDVI'),
        ui.Label('DNBR')
        ]
    }),
    ui.Panel({widgets: [Leyenda,colorBar, legendLabels]})],
  layout: ui.Panel.Layout.flow('horizontal'),
  style:{
    position: 'top-left',
  }
});
//Lista de seleccion de bandas
var band_select =['B2','B3','B4','B6','B7','B8','B8A','B11','NBR','NDVI','NDWI','IAQ','BAIS2'];
//Deslizador
var setval=10;
var sli=ui.Slider({
  min: 10,
  max: 500,
  value: setval,
  step: 10,
  style: {width:'95%'},
  onChange: function(){
    setval=(sli.getValue());
    d_antes.clear();
    d_despues.clear();
    d_diferencia.clear();
  }
});
//Valores para las funciones de enmascaramiento
var CLD_PRB_THRESH = 40;
var NIR_DRK_THRESH = 0.15;
var CLD_PRJ_DIST = 1;
var BUFFER = 75;
//Inicializacion de arreglos nulos para almacenar imagenes
var list_selector1=[];
var list_selector2=[];
//simbolo de rectangulo
var symbol = {
  rectangle: '⬛',
};
//Configurar las herramientas de dibujo
var drawingTools = Map.drawingTools();
Map.setControlVisibility({
  mapTypeControl: false, 
  fullscreenControl:false,
  zoomControl: false
});
//Configuracion de zoom y centro
Map.setCenter(-78.5,-1.5,6);
//Limpiar geometrias pre-cargadas
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
  layers.get(1).geometries().remove(layers.get(1).geometries().get(0));
  layers.get(2).geometries().remove(layers.get(2).geometries().get(0));
}
//clearGeometry();
//Funcion para crear geometrias
function drawRectangle() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
  drawingTools.setShape('rectangle');
  drawingTools.onDraw(function(){
    drawingTools.stop();
  });
}
//Titulo
var titulo_a=ui.Label(Etiquetas.titulo[idioma],
  {fontSize:'16px', fontWeight:'700'});
//Introduccion
var intro_a=ui.Label(Etiquetas.intro[idioma]);
//Etiqueta para Area de interes
var area_interes = ui.Label(Etiquetas.lab_AOI[idioma],
  {fontSize:'14px', fontWeight:'500',textAlign: 'center'});
//Sección de Descarga de datos
var descarga=ui.Label(Etiquetas.L_descarga[idioma],{fontWeight: '500'});
//Etiqueta para panel de descarga
var cellsize=ui.Label(Etiquetas.L_res[idioma]);
//Boton para dibujar el area de interes
var rect=ui.Button({
      label:symbol.rectangle+ Etiquetas.AOI[idioma],
      onClick: drawRectangle,
      style: {
        stretch: 'horizontal',
        width:'50%',
        fontSize: '10px',
        whiteSpace:'nowrap', 
        margin: '0px 0px 0px 25%'}
});
//Etiqueta
var pre_ev = ui.Label(Etiquetas.interval_pre[idioma],
{fontSize:'14px', fontWeight:'500',textAlign: 'center'});
//Caja de Texto Fecha 1
var pre1 = ui.Textbox({
  placeholder: 'YYYY-MM-DD',
  style:{textAlign: 'center',width:'35%'},
  onChange: function(pre){
    pre1.setValue(pre);
    var p_date=Date.parse(pre);
    if(isNaN(p_date) || p_date<Date.parse('2017-03-28') || p_date>Date.now()){
      pre1.setValue(null);
    }
  }
});
//Caja de Texto Fecha 2
var pre2 = ui.Textbox({
  placeholder: 'YYYY-MM-DD',
  style:{textAlign: 'center',width:'35%'},
  onChange: function(pre) {
    pre2.setValue(pre);
    var p_date=Date.parse(pre);
    if(isNaN(p_date) || p_date<Date.parse('2017-03-28') || p_date>Date.now()){
      pre2.setValue(null);
    }
  }
});
//Boton para buscar imagenes
var Buscar_pre=ui.Button({
  label: 'Buscar', 
  onClick: function(){
    if(pre1.getValue()!==null && pre2.getValue()!==null && Date.parse(pre1.getValue())<Date.parse(pre2.getValue())){
      idioma = det_idioma();
      var aoi = drawingTools.layers().get(0).getEeObject();
      panel_principal.remove(Buscar_pre);
      var antesc=ee.ImageCollection('COPERNICUS/S2_SR')
      .filterBounds(aoi)
      .filterDate(ee.Date(pre1.getValue()),ee.Date(pre2.getValue()))
      .sort('CLOUDY_PIXEL_PERCENTAGE');
      //Cambio de idioma
      sel_idioma.onChange(function(){
        var idioma=det_idioma();
        selector1.setPlaceholder(Etiquetas.Dl_antes[idioma]);
        remover1.setLabel(Etiquetas.B_remover[idioma]);
        run.setLabel(Etiquetas.B_guardar[idioma]);
        reset1.setLabel(Etiquetas.B_reiniciar[idioma]);
        adv.setValue(Etiquetas.Adv_1[idioma]);
      });
      //Menu desplegable para seleccionar imagenes
      var selector1 = ui.Select({
        items: getIds(antesc),
        placeholder: Etiquetas.Dl_antes[idioma],
        onChange: function(){
          Map.clear();
          Map.setControlVisibility({
            mapTypeControl: false, 
            fullscreenControl:false,
            zoomControl: false
          });
          var imag=selector1.getValue();
          var im2=ee.Image('COPERNICUS/S2_SR/'+imag);
          Map.addLayer(im2,{bands: ['B8','B4','B2'],min:0,max:3000});
        },
        style: {
          fontSize: '11px',
        }
      });
      //Boton para guardar la imagen seleccionada
      var run= ui.Button({
        label: Etiquetas.B_guardar[idioma], 
        onClick: function(){
          list_selector1.push(selector1.getValue());
          labels.add(ui.Label({
            value:selector1.getValue(),
            style:{fontSize:'10px'}
          }));
        }, 
        disabled: false
      });
      //Boton para guardar la imagen seleccionada
      var remover1= ui.Button({
        label: Etiquetas.B_remover[idioma], 
        onClick: function(){
          labels.remove(labels.widgets().get(labels.widgets().length()-1));
          list_selector1.pop();
        },
      });
      //Boton para reiniciar fechas e imagenes
      var reset1=ui.Button({
        label: Etiquetas.B_reiniciar[idioma], 
        onClick: function(){
          list_selector1=[];
          pre1.setValue(null);
          pre2.setValue(null);
          prebox.clear();
          labels.clear();
          panel_principal.insert(8,Buscar_pre);
          Map.clear();
          Map.setControlVisibility({
            mapTypeControl: false, 
            fullscreenControl:false,
            zoomControl: false
          });
          d_antes.clear();
          d_despues.clear();
          d_diferencia.clear();
        }, 
      });
      //Insertar elementos en la interfaz
      var sub1=ui.Panel([run, remover1, reset1],ui.Panel.Layout.Flow('horizontal'));
      //Advertencia
      var adv=ui.Label(Etiquetas.Adv_1[idioma],{fontSize:'12px'});
      prebox.add(selector1);
      prebox.add(adv);
      prebox.add(sub1);
    }
  }
});
//Funcion para obtener el id de cada imagen
function getIds(collection) {
  var info = collection.getInfo(); 
  var images = info['features']; 
  var ids = [];
  for (var i=0; i<images.length; i++) {  // note .length not size()
    var im = images[i];                  // [i] not .get(i)
    var id = im.id.slice(17,55);
    ids.push(id);                        // note .push() not .cat()
  }
  return ids;
}
///POS EVENTO
var pos_ev = ui.Label(Etiquetas.interval_pos[idioma],
{fontSize:'14px', fontWeight:'500',textAlign: 'center'});
var pos1 = ui.Textbox({
  placeholder: 'YYYY-MM-DD',
  style:{textAlign: 'center',width:'35%'},
  onChange: function(pos) {
    pos1.setValue(pos);
    var p_date=Date.parse(pos);
    if(isNaN(p_date) || p_date<Date.parse('2017-03-28') || p_date>Date.now()){
      pos1.setValue(null);
    }
  }
});
var pos2 = ui.Textbox({
  placeholder: 'YYYY-MM-DD',
  style:{textAlign: 'center',width:'35%'},
  onChange: function(pos) {
    pos2.setValue(pos);
    var p_date=Date.parse(pos);
    if(isNaN(p_date) || p_date<Date.parse('2017-03-28') || p_date>Date.now()){
      pos2.setValue(null);
    }
  }
});
var Buscar_pos=ui.Button({
  label: Etiquetas.B_buscar[idioma], 
  onClick: function(){
    if(pos1.getValue()!==null && pos2.getValue()!==null && Date.parse(pos1.getValue())<Date.parse(pos2.getValue())){
      idioma = det_idioma();
      var aoi = drawingTools.layers().get(0).getEeObject();
      panel_principal.remove(Buscar_pos);
      var antesc=ee.ImageCollection('COPERNICUS/S2_SR')
      .filterBounds(aoi)
      .filterDate(ee.Date(pos1.getValue()),ee.Date(pos2.getValue()))
      .sort('CLOUDY_PIXEL_PERCENTAGE');
      //Cambio de idioma
      sel_idioma.onChange(function(){
        var idioma=det_idioma();
        selector2.setPlaceholder(Etiquetas.Dl_despues[idioma]);
        run2.setLabel(Etiquetas.B_guardar[idioma]);
        remover2.setLabel(Etiquetas.B_remover[idioma]);
        reset2.setLabel(Etiquetas.B_reiniciar[idioma]);
        adv.setValue(Etiquetas.Adv_1[idioma]);
      });
      var selector2 = ui.Select({
          items: getIds(antesc),
          placeholder:Etiquetas.Dl_despues[idioma],
          onChange: function(){
            Map.clear();
            Map.setControlVisibility({
              mapTypeControl: false, 
              fullscreenControl:false,
              zoomControl: false
            });
            var imag=selector2.getValue();
            var im2=ee.Image('COPERNICUS/S2_SR/'+imag);
            Map.addLayer(im2,{bands: ['B8','B4','B2'],min:0,max:3000});
          },
          style:{
            fontSize: '11px'
          }
      });
      var run2= ui.Button({
        label: Etiquetas.B_guardar[idioma], 
        onClick: function(){
          list_selector2.push(selector2.getValue());
          labels2.add(ui.Label({
            value:selector2.getValue(),
            style:{fontSize:'10px'}
          }));
        }, 
        disabled: false
      });
      var remover2= ui.Button({
        label: Etiquetas.B_remover[idioma], 
        onClick: function(){
          labels2.remove(labels2.widgets().get(labels2.widgets().length()-1));
          list_selector2.pop();
        },
      });
      var reset2=ui.Button({
        label: Etiquetas.B_reiniciar[idioma], 
        onClick: function(){
          list_selector2=[];
          pos1.setValue(null);
          pos2.setValue(null);
          posbox.clear();
          labels2.clear();
          panel_principal.insert(12,Buscar_pos);
          d_antes.clear();
          d_despues.clear();
          d_diferencia.clear();
          Map.clear();
          Map.setControlVisibility({
            mapTypeControl: false, 
            fullscreenControl:false,
            zoomControl: false
          });
        }, 
        disabled: false
      });
      var sub2=ui.Panel([run2,remover2, reset2],ui.Panel.Layout.Flow('horizontal'));
      var adv=ui.Label(Etiquetas.Adv_1[idioma],{fontSize:'12px'});
      posbox.add(selector2);
      posbox.add(adv);
      posbox.add(sub2);
    }
  }
});
function add_cloud(img){
  var cld_prb = ee.Image(img.get('s2cloudless')).select('probability');
  var is_cloud = cld_prb.gt(CLD_PRB_THRESH).rename('clouds');
  return img.addBands(ee.Image([cld_prb, is_cloud]));
}
function add_shadow(img){
  var not_water = img.select('SCL').neq(6);
  var SR_BAND_SCALE = 10000;
  var dark_pixels = img.select('B8').lt(NIR_DRK_THRESH*SR_BAND_SCALE)
    .multiply(not_water).rename('dark_pixels');
  var shadow_azimuth = ee.Number(90)
    .subtract(ee.Number(img.get('MEAN_SOLAR_AZIMUTH_ANGLE')));
  var cld_proj = (img.select('clouds')
        .directionalDistanceTransform(shadow_azimuth, CLD_PRJ_DIST*10)
        .reproject({'crs': img.select(0).projection(), 'scale': 100})
        .select('distance')
        .mask()
        .rename('cloud_transform'));
  var shadows = cld_proj.multiply(dark_pixels).rename('shadows');
  return img.addBands(ee.Image([dark_pixels, cld_proj, shadows]));
}
function add_mask(img){
  var img_cloud = add_cloud(img);
  var img_cloud_shadow = add_shadow(img_cloud);
  var is_cld_shdw = img_cloud_shadow.select('clouds')
    .add(img_cloud_shadow.select('shadows')).gt(0);
  var is_cld_shdw2 = (is_cld_shdw.focal_min(2).focal_max(BUFFER*2/20)
        .reproject({'crs': img.select([0]).projection(), 'scale': 20})
        .rename('cloudmask'));
  return img.addBands(is_cld_shdw2);
}
function app_mask(img){
  var no_cld=img.select('cloudmask').not();
  return img.select('B.*').updateMask(no_cld);
}
//FUNCION PARA CALCULAR INDICES
function add_index(img){
  var NBR=img.expression(
    '(NIR-SWIR)/(SWIR+NIR)', {
    SWIR:img.select('B12'),
    NIR:img.select('B8'),
    }).rename('NBR');
  var NDVI=img.expression(
    '(NIR-RED)/(RED+NIR)', {
    RED:img.select('B4'),
    NIR:img.select('B8'),
    }).rename('NDVI');
  var NDWI=img.expression(
    '(NIR-SWIR)/(SWIR+NIR)', {
    SWIR:img.select('B11'),
    NIR:img.select('B8A'),
    }).rename('NDWI');
  var IAQ=img.expression(
    '-1/(((RED/10000)-0.1)**2+((NIR/10000)-0.06)**2)', {
    RED:img.select('B4'),
    NIR:img.select('B8'),
    }).rename('IAQ');
  var BAIS2=img.expression(
    '-((1-sqrt(((RE1/10000)*(RE2/10000)*(NIR2/10000))/(RED/10000)))*(((SWIR2/10000)-(NIR2/10000))/(sqrt((SWIR2/10000)+(NIR2/10000)))+1))', {
    RED:img.select('B4'),
    RE1:img.select('B6'),
    RE2:img.select('B7'),
    NIR2:img.select('B8A'),
    SWIR2:img.select('B12'),
    }).rename('BAIS2');
  return img.addBands(NBR).addBands(NDVI).addBands(NDWI).addBands(IAQ)
    .addBands(BAIS2);
}
var calcular=ui.Button({
  label: Etiquetas.B_calc[idioma],
  onClick: function(){
    if(list_selector1.filter(function(val) { return val !== null; }).length>0 && list_selector2.filter(function(val) { return val !== null; }).length>0){
      ui.root.add(panel_class);
      panel_principal.remove(group_d);
      panel_principal.remove(group_ds);
      d_antes.clear();
      d_despues.clear();
      d_diferencia.clear();
      ds_antes.clear();
      ds_despues.clear();
      ds_diferencia.clear();
      Map.clear();
      Map.setControlVisibility({
        mapTypeControl: false, 
        fullscreenControl:false,
        zoomControl: false
      });
      var aoi = drawingTools.layers().get(0).getEeObject();
      Map.centerObject(aoi);
      var ant=ee.ImageCollection(list_selector1.filter(function(val) { return val !== null; }).map(function(k){
        var j='COPERNICUS/S2_SR/'+k;
        return j;
      }));
      var des=ee.ImageCollection(list_selector2.filter(function(val) { return val !== null; }).map(function(k){
        var j='COPERNICUS/S2_SR/'+k;
        return j;
      }));
      var cloud_p=ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY')
      .filterDate(ee.Date(pre1.getValue()),ee.Date(pos2.getValue()));
      var combined1 =ee.ImageCollection(ee.Join.saveFirst('s2cloudless')
      .apply({
        primary: ant,
        secondary: cloud_p,
        condition: ee.Filter.equals({
          leftField: 'system:index',
          rightField: 'system:index'
        })
      }));
      var combined2 =ee.ImageCollection(ee.Join.saveFirst('s2cloudless')
      .apply({
        primary: des,
        secondary: cloud_p,
        condition: ee.Filter.equals({
          leftField: 'system:index',
          rightField: 'system:index'
        })
      }));
      var ac_prob=combined1.map(add_mask).map(app_mask);
      var dc_prob=combined2.map(add_mask).map(app_mask);
      var ac_index=ac_prob.map(add_index).mean();
      var dc_index=dc_prob.map(add_index).min();
      Map.addLayer(ac_index,{bands: ['B8','B4','B2'],min:0,max:3000},'PRE 8-4-2');
      Map.addLayer(dc_index,{bands: ['B8','B4','B2'],min:0,max:3000},'POS 8-4-2');
      var diffi=ac_index.subtract(dc_index);
      Map.addLayer(diffi.select('NBR'),norm_viz,'DNBR');
      Map.addLayer(diffi.select('NDVI'),norm_viz,'DNDVI');
      Map.addLayer(diffi.select('NDWI'),norm_viz,'DNDWI');
      Map.addLayer(diffi.select('BAIS2'),norm_viz,'DBAIS2');
      Map.addLayer(diffi,{bands:['IAQ'],min:-500,max:500, palette: norm_viz.palette},'DIAQ');
      panel_principal.add(group_ds);
      panel_principal.add(group_d);
      //Cambio de idioma
      sel_idioma.onChange(function(){
        var idioma=det_idioma();
        selindex_antes.setPlaceholder(Etiquetas.Dl_antes[idioma]);
        selindex_despues.setPlaceholder(Etiquetas.Dl_despues[idioma]);
        selindex_diferencia.setPlaceholder(Etiquetas.Dl_diferencia[idioma]);
      });
      //Descarga antes
      var selindex_antes=ui.Select({
        style:{width:'70px'},
        items:band_select,
        placeholder: Etiquetas.Dl_antes[idioma],
        onChange:function(){
          var aoi = drawingTools.layers().get(0).getEeObject();
          var indi=ac_index.select(selindex_antes.getValue());
          var lk=indi.getDownloadURL({name: 'Pre.'+selindex_antes.getValue()+'.'+setval+'m',scale: setval, region: aoi });
          d_antes.add(ui.Label({
            value: 'Pre.'+selindex_antes.getValue()+'.'+setval+'m',
            targetUrl: lk,
          }));
        }
      });
      ds_antes.add(selindex_antes);
      //Descarga despues
      var selindex_despues=ui.Select({
        style:{width:'70px'},
        items:band_select,
        placeholder: Etiquetas.Dl_despues[idioma],
        onChange:function(){
          var aoi = drawingTools.layers().get(0).getEeObject();
          var indi=dc_index.select(selindex_despues.getValue());
          var lkdesp=indi.getDownloadURL({name: 'Pos.'+selindex_despues.getValue()+'.'+setval+'m',scale: setval, region: aoi });
          d_despues.add(ui.Label({
            value: 'Pos.'+selindex_despues.getValue()+'.'+setval+'m',
            targetUrl: lkdesp,
          }));
        }
      });
      ds_despues.add(selindex_despues);
      //Descarga diferencia
      var selindex_diferencia=ui.Select({
        style:{width:'80px'},
        items:band_select,
        placeholder: Etiquetas.Dl_diferencia[idioma],
        onChange:function(){
          var aoi = drawingTools.layers().get(0).getEeObject();
          var indi=diffi.select(selindex_diferencia.getValue());
          var lkdif=indi.getDownloadURL({name: 'Dif.'+selindex_diferencia.getValue()+'.'+setval+'m',scale: setval, region: aoi });
          d_diferencia.add(ui.Label({
            value: 'Dif.'+selindex_diferencia.getValue()+'.'+setval+'m',
            targetUrl: lkdif,
          }));
        }
      });
      ds_diferencia.add(selindex_diferencia);
      Map.add(panel_T);
      sel_idioma.onChange(function(){
        var idioma=det_idioma();
        titulo_clas.setValue(Etiquetas.Clasificar[idioma]);
        descr_clas.setValue(Etiquetas.Descripcion_C[idioma]);
      });
      //CLASIFICACIÓN-CLASSIFICATION
      var titulo_clas=ui.Label(Etiquetas.Clasificar[idioma],
        {fontSize:'16px', fontWeight:'700'});
      var descr_clas=ui.Label(Etiquetas.Descripcion_C[idioma],
        {fontSize:'14px', whiteSpace: 'pre-wrap'});
      var index_selection=[];
      var chk_NBR=ui.Checkbox({
        label: 'NBR',
        onChange: function(){
          var valor=chk_NBR.getValue();
          var etiqueta=chk_NBR.getLabel();
          if(valor===true){
            index_selection.push(etiqueta);
          }
          else if(valor===false){
            var n_etiqueta=index_selection.indexOf(chk_NBR.getLabel());
            index_selection.splice(n_etiqueta,n_etiqueta+1);
          }
          if(index_selection.length===0){
            clasificador.setDisabled(true);
          }
          else if(index_selection.length>=0){
            clasificador.setDisabled(false);
          }
        }
      });
      var chk_NDVI=ui.Checkbox({
        label: 'NDVI',
        onChange: function(){
          var valor=chk_NDVI.getValue();
          var etiqueta=chk_NDVI.getLabel();
          if(valor===true){
            index_selection.push(etiqueta);
          }
          else if(valor===false){
            var n_etiqueta=index_selection.indexOf(chk_NDVI.getLabel());
            index_selection.splice(n_etiqueta,n_etiqueta+1);
          }
          if(index_selection.length===0){
            clasificador.setDisabled(true);
          }
          else if(index_selection.length>=0){
            clasificador.setDisabled(false);
          }
        }
      });
      var chk_BAIS2=ui.Checkbox({
        label: 'BAIS2',
        onChange: function(){
              var valor=chk_BAIS2.getValue();
              var etiqueta=chk_BAIS2.getLabel();
                if(valor===true){
                index_selection.push(etiqueta);
                }
                else if(valor===false){
                  var n_etiqueta=index_selection.indexOf(chk_BAIS2.getLabel());
                  index_selection.splice(n_etiqueta,n_etiqueta+1);
                }
              if(index_selection.length===0){
                clasificador.setDisabled(true);
              }
              else if(index_selection.length>=0){
                clasificador.setDisabled(false);
              }
            }
        });    
      var chk_IAQ=ui.Checkbox({
        label: 'IAQ',
        onChange: function(){
              var valor=chk_IAQ.getValue();
              var etiqueta=chk_IAQ.getLabel();
              if(valor===true){
                index_selection.push(etiqueta);
              }
              else if(valor===false){
                var n_etiqueta=index_selection.indexOf(chk_IAQ.getLabel());
                index_selection.splice(n_etiqueta,n_etiqueta+1);
              }
              if(index_selection.length===0){
                clasificador.setDisabled(true);
              }
              else if(index_selection.length>=0){
                clasificador.setDisabled(false);
              }              
            }
        });
      var chk_NDWI=ui.Checkbox({
        label: 'NDWI',
        onChange: function(){
              var valor=chk_NDWI.getValue();
              var etiqueta=chk_NDWI.getLabel();
              if(valor===true){
                index_selection.push(etiqueta);
              }
              else if(valor===false){
                var n_etiqueta=index_selection.indexOf(chk_NDWI.getLabel());
                index_selection.splice(n_etiqueta,n_etiqueta+1);
              }
              if(index_selection.length===0){
                clasificador.setDisabled(true);
              }
              else if(index_selection.length>=0){
                clasificador.setDisabled(false);
              }
            }
        });
      var clasificador=ui.Button({
        label: Etiquetas.Clasificar[idioma],
        onClick: function(){
          var idioma=det_idioma();
          if(Map.layers().length()>7){
            Map.remove(Map.layers().get(7));
          }
          var names=[];
          var color_names=[];
          var length_names=drawingTools.layers().length();
          for (var n=1;n<length_names;n=n+1){
            names.push(drawingTools.layers().get(n).get('name'));
            color_names.push(drawingTools.layers().get(n).get('color'));
          }
          var aoi = drawingTools.layers().get(0).getEeObject();
          var band_selection=index_selection;
          var img_c=diffi.select(band_selection).clip(aoi);
          var FC_LC=drawingTools.toFeatureCollection('landcover');
          var quem_1 = FC_LC.filterMetadata('landcover','equals',1)
            .map(function(el){return el.set('landcover',0)});
          var no_quem = FC_LC.filterMetadata('landcover','equals',2)
            .map(function(el){return el.set('landcover',1)});
          var points= quem_1.merge(no_quem);
          var datasamples = points.randomColumn();
          var split=0.5;
          var training = datasamples.filter(ee.Filter.lte('random', split));
          var testing = datasamples.filter(ee.Filter.gt('random', split));
          var kappa_train_l=ui.Label();
          var kappa_test_l=ui.Label();
          if(training.aggregate_count_distinct('landcover').getInfo()>1.1 && testing.aggregate_count_distinct('landcover').getInfo()>1.1){
            var training_sampled = img_c.select(band_selection).sampleRegions({
              collection: training,
              properties: ['landcover'],
              scale:10,
            });
            var classifierrandomForest = ee.Classifier.smileRandomForest(13).train({features: training_sampled, 
                        classProperty: 'landcover', 
                        inputProperties: band_selection,
            });
            var classifiedrandomForest = img_c.classify(classifierrandomForest);
            var vectors = classifiedrandomForest.reduceToVectors({
              geometry: aoi,
              scale: 10,
              geometryType: 'polygon',
              eightConnected: false,
              labelProperty: 'zone',
            });
            var vect_quem=vectors.filterBounds(drawingTools.layers().get(1).getEeObject().first().geometry());
            var vect_link=vect_quem.getDownloadURL({format:'geojson',filename:'area'});
            var test = classifiedrandomForest.sampleRegions({
              collection: testing,
              properties: ['landcover'],
              scale: 10,
            });
            var kappa_train = classifierrandomForest.confusionMatrix().kappa();
            var testConfusionMatrix = test.errorMatrix('landcover', 'classification');
            var kappa_test = testConfusionMatrix.kappa();
            kappa_train_l.setValue(Etiquetas.L_Kappa_Training[idioma]+kappa_train.getInfo().toFixed(4));
            kappa_test_l.setValue(Etiquetas.L_Kappa_Testing[idioma]+kappa_test.getInfo().toFixed(4));
            var classifier_importance=classifierrandomForest.setOutputMode('PROBABILITY');
            var classifier_dictionary=classifier_importance.explain();
            var variable_importance = ee.Feature(null, ee.Dictionary(classifier_dictionary).get('importance'));
            var chart = ui.Chart.feature.byProperty(variable_importance)
              .setChartType('ColumnChart')
              .setOptions({
                title: Etiquetas.Graf_T[idioma],
                legend: {position: 'none'},
                hAxis: {title: 'Variables'},
                vAxis: {minValue:0,title: Etiquetas.Graf_I[idioma]}
              });
            var area_download=ui.Label(Etiquetas.L_descarga[idioma]+' Area',{},vect_link);
            var area_quemada=ui.Label(Etiquetas.Area_Q[idioma]+vect_quem.geometry().area(1).getInfo().toFixed(2)+'m^2');
            panel_class.add(area_quemada);
            panel_class.add(kappa_train_l);
            panel_class.add(kappa_test_l);
            panel_class.add(area_download);
            panel_class.add(chart);
            Map.addLayer(classifiedrandomForest,{min:0,max:1,palette:color_names},'Clasificado/Classified');
          } else{
            kappa_train_l.setValue(Etiquetas.Adv_nro_s[idioma]);
            panel_class.add(kappa_train_l);
          }
        }
      });
      var panel_check_index=ui.Panel([chk_NBR,chk_NDVI,chk_BAIS2,chk_IAQ,chk_NDWI]);
      clasificador.setDisabled(true);
      panel_class.add(titulo_clas);
      panel_class.add(descr_clas);
      panel_class.add(panel_check_index);
      panel_class.add(clasificador);
    }
  }
});
ui.root.insert(0,panel_principal);
panel_principal.add(sel_idioma);
panel_principal.add(titulo_a);
panel_principal.add(intro_a);
panel_principal.add(area_interes).add(rect);
panel_principal.add(pre_ev);
panel_principal.add(ui.Panel([pre1, pre2],ui.Panel.Layout.Flow('horizontal')));
panel_principal.add(Buscar_pre).add(prebox).add(labels);
panel_principal.add(pos_ev);
panel_principal.add(ui.Panel([pos1, pos2],ui.Panel.Layout.Flow('horizontal')));
panel_principal.add(Buscar_pos).add(posbox).add(labels2);
panel_principal.add(calcular);
panel_principal.add(descarga);
panel_principal.add(cellsize);
panel_principal.add(sli);
panel_principal.add(group_ds);
panel_principal.add(group_d);
panel_principal.add(Links);