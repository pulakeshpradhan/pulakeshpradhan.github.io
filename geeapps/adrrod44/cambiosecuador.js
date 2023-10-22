var ecu = ui.import && ui.import("ecu", "table", {
      "id": "users/adrrod44/Almanaque/Ec_continental"
    }) || ee.FeatureCollection("users/adrrod44/Almanaque/Ec_continental"),
    nxprovincias = ui.import && ui.import("nxprovincias", "table", {
      "id": "users/adrrod44/Almanaque/nxprovincias"
    }) || ee.FeatureCollection("users/adrrod44/Almanaque/nxprovincias"),
    nxcantones = ui.import && ui.import("nxcantones", "table", {
      "id": "users/adrrod44/Almanaque/nxcantones"
    }) || ee.FeatureCollection("users/adrrod44/Almanaque/nxcantones");
/*
Author: Adrian Rodriguez Meza (adr.rod44@gmail.com)
El presente código fue desarrollado para la Fundación Heifer Ecuador con fecha 12/10/2021.
El enlace al aplicativo web es el siguiente:
https://adrrod44.users.earthengine.app/view/cambiosecuador
El enlace al repositorio git es el siguiente:
git clone https://earthengine.googlesource.com/users/adrrod44/Herfer_Ecuador
El enlace al código dentro de la plataforma de Earth Engine es el siguiente:
https://code.earthengine.google.com/06fad6e11325d09fed838226f1dbc4d0
*/
// Panel de precipitaciones Ecuador
//limpiamos el mapa
ui.root.clear();
var mapa_base = ui.Map();
mapa_base.setOptions('ROADMAP');
mapa_base.setCenter(-78.613, -0.972, 7);
mapa_base.setControlVisibility({zoomControl: false, drawingToolsControl: true, fullscreenControl: false, layerList: false});
mapa_base.addLayer(ecu,{"color":"#000000"},"Ecuador", 1, 0.5);
//Panel de instrucciones
var prov_layer = [];
var canton_layer = []; 
var canton_style = {color: '95949488', fillColor: '00000000', lineType: 'dashed'};
var title = ui.Label('Instrucciones', {fontSize: '16px', fontWeight: 'bold'});
var instr1 = ui.Label('1. Seleccione la variable de estudio', {fontSize: '14px'});
var variable = ui.Select({
  items: ['Precipitación', 'Temperatura Superficial', 'Estado de la vegetación'],
  placeholder: 'Precipitación',
  value: 'Precipitación',
  style: {stretch: 'horizontal'},
  onChange: function Cambio (pre){
        variable.setValue(pre);
  },
});
var provincia = ui.Select({
  items: [
  "ECUADOR",
  "AZUAY",
  "BOLIVAR",
  "CAÑAR",
  "CARCHI",
  "CHIMBORAZO",
  "COTOPAXI",
  "EL ORO",
  "ESMERALDAS",
  "GALAPAGOS",
  "GUAYAS",
  "IMBABURA",
  "LOJA",
  "LOS RIOS",
  "MANABI",
  "MORONA SANTIAGO",
  "NAPO",
  "ORELLANA",
  "PASTAZA",
  "PICHINCHA",
  "SANTA ELENA",
  "SANTO DOMINGO DE LOS TSACHILAS",
  "SUCUMBIOS",
  "TUNGURAHUA",
  "ZAMORA CHINCHIPE"],
  placeholder: "ECUADOR",
  value: "ECUADOR",
  style: {stretch: 'horizontal'},
  onChange: function Cambio (pre){
        provincia.setValue(pre);
        mapa_base.clear();
        mapa_base.add(Intr_panel);
        if (pre == "ECUADOR"){
          mapa_base.addLayer(ecu,{"color":"#000000"},pre, 1, 0.5);
          mapa_base.centerObject(ecu, 7);
        }
        else {
          if (pre == 'CAÑAR'){
            prov_layer = nxprovincias.filter(ee.Filter.eq('DPA_DESPRO', 'CA�AR'));
            canton_layer = nxcantones.filter(ee.Filter.eq('DPA_DESPRO', 'CA�AR'));
          } else {
            prov_layer = nxprovincias.filter(ee.Filter.eq('DPA_DESPRO', pre));
            canton_layer = nxcantones.filter(ee.Filter.eq('DPA_DESPRO', pre));
          }
          mapa_base.addLayer(prov_layer,{"color":"#000000"},pre, 1, 0.5);
          mapa_base.centerObject(prov_layer, 9);
        }
  },
});
var mes1 = ui.Select({
  items: ["Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre"],
  placeholder: "Enero",
  value: "Enero",
  style: {stretch: 'horizontal'},
  onChange: function Cambio (pre){
        mes1.setValue(pre);
  },
});
var mes2 = ui.Select({
  items: ["Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre"],
  placeholder: "Enero",
  value: "Enero",
  style: {stretch: 'horizontal'},
  onChange: function Cambio (pre){
        mes2.setValue(pre);
  },
});
var botonSiguiente = ui.Button({
  label: 'Siguiente',
  onClick: siguientepaso,
  style: {stretch: 'horizontal'}
});
var tiempo1 = ui.Slider({min: 2000, max: 2021, value: 2010, step: 1,
  style: {stretch: 'horizontal'}});
var tiempo2 = ui.Slider({min: 2000, max: 2021, value: 2010, step: 1,
  style: {stretch: 'horizontal'}});
var instr2 = ui.Label('2. Seleccione la provincia', {fontSize: '14px'});
var instr3 = ui.Label('3. Seleccione el año y el mes inicial', {fontSize: '14px'});
var instr4 = ui.Label('4. Seleccione el año y el mes final', {fontSize: '14px'});
var Intr_panel = ui.Panel([
    title,
    instr1,
    variable,
    instr2,
    provincia,
    instr3,
    tiempo1,
    mes1,
    instr4,
    tiempo2,
    mes2,
    botonSiguiente
  ], 
  null, {position: 'middle-left', width: '300px' , height: '475px'}
  );
mapa_base.add(Intr_panel);
ui.root.add(mapa_base);
//funcion para limpiar imagenes
function clearImgs() {
  while (mapa_base.layers().length() > 0) {
    mapa_base.layers().remove(mapa_base.layers().get(0));
  }
  Intr_panel.clear();
}
//Segundo mapa
var mapa_base1 = ui.Map();
mapa_base1.drawingTools().setLinked(true);
mapa_base1.setOptions('ROADMAP');
mapa_base1.setCenter(-78.613, -0.972, 7);
mapa_base1.setControlVisibility({zoomControl: false, drawingToolsControl: false, layerList: false, fullscreenControl: false});
mapa_base1.style().set({cursor: 'crosshair'});
var Comparador = ui.Map();
Comparador.setOptions('ROADMAP');
Comparador.drawingTools().setLinked(true);
Comparador.setCenter(-78.613, -0.972, 7);
Comparador.setControlVisibility({zoomControl: false, drawingToolsControl: false, layerList: false, fullscreenControl: false});
Comparador.style().set({cursor: 'crosshair'});
var layer = ui.Map.GeometryLayer();
//Función para cortar
var area_estudio = [];
var cantones = [];
var corte = function(img){
  var roi = area_estudio;
  var img_corte = img.clip(roi);
  return img_corte; 
};
//Función para cambiar de grados kelvin a centigrados
var kelv_to_cent = function(img){
  var id = img.get('id');
  var time_star = img.get('system:time_start');
  var img_cent = img.multiply(0.02).subtract(273.15);
      img_cent = img_cent.set('id', id);
      img_cent = img_cent.set('system:time_start',time_star);
  return img_cent; 
};
// Funcion agrega un punto
// Retorna el punto
var selectedPoints = [];
var i = -1;
function getPoint() {
  i += 1;
  return selectedPoints[i];
}
function getPointchar() {
  return selectedPoints[i];
}
// Updates the map overlay using the currently-selected countries.
var POINT_STYLE = {color: '28083B', fillColor: 'A318F2', pointShape: 'diamond', pointSize: 6};
var overlay = [];
//Función para agregar punto
function agrega_punto() {
  overlay = ee.Geometry.Point(getPoint());
  var point_feac = ee.FeatureCollection(overlay);
  mapa_base1.layers().set(2, ui.Map.Layer(point_feac.style(POINT_STYLE), {},"Punto"));
  Comparador.layers().set(2, ui.Map.Layer(point_feac.style(POINT_STYLE), {},"Punto"));
}
//Función para generar gráfico
var dataset_ci = [];
var dataset_temp1 = [];
var dataset_cf = [];
var overlaychar = [];
var temp_listi = [];
var temp_listf = [];
var j = 0;
var dati2 = [];
var datf2 = [];
var chart_opcionesi = [];
var chart_opcionesf = [];
function generar_grafico(){
  var vari = variable.getValue();
  var a1 = tiempo1.getValue();
  var a2 = tiempo2.getValue();
  var dateci1 = ee.Date.fromYMD(a1, 01, 01);
  var dateci2 = ee.Date.fromYMD(a1+1, 01, 01);
  var datecf1 = ee.Date.fromYMD(a2, 01, 01);
  var datecf2 = ee.Date.fromYMD(a2+1, 01, 01);
  var dataset_ci_m = [];
  var dataset_cf_m = [];
  var date_mi1 = [];
  var date_mi2 = [];
  var date_mf1 = [];
  var date_mf2 = [];
  var i = 0;
  var f = 0;
  var first_mi = [];
  var first_mf = [];
  var first_mi_date = [];
  var first_mf_date = [];
  var cero_imgi = [];
  var cero_imgf = [];
  var maski = [];
  var maskf = [];
  var rdataseti = [];
  var rdatasetf = [];
  switch (vari){
    case 'Precipitación':
      dataset_ci = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
                        .filter(ee.Filter.date(dateci1, dateci2));
      dataset_ci = dataset_ci.map(corte);
      if (a1 == 2021){
      for (i = 0; i <= 8; i++) {
        date_mi1 = ee.Date.fromYMD(a1, i+1, 01);
        date_mi2 = ee.Date.fromYMD(a1, i+2, 01);
        dataset_ci_m[i] = dataset_ci.filter(ee.Filter.date(date_mi1, date_mi2));
        first_mi = dataset_ci_m[i].first();
        first_mi_date = first_mi.get('system:time_start');
        dataset_ci_m[i] = dataset_ci_m[i].sum().rename(vari); 
        dataset_ci_m[i] = dataset_ci_m[i].set('system:time_start',first_mi_date);
      } 
      } else {
      for (i = 0; i <= 11; i++) {
        date_mi1 = ee.Date.fromYMD(a1, i+1, 01);
        if (i == 11){
        date_mi2 = ee.Date.fromYMD(a1+1, 01, 01);  
        } else {
        date_mi2 = ee.Date.fromYMD(a1, i+2, 01);
        }
        dataset_ci_m[i] = dataset_ci.filter(ee.Filter.date(date_mi1, date_mi2));
        first_mi = dataset_ci_m[i].first();
        first_mi_date = first_mi.get('system:time_start');
        dataset_ci_m[i] = dataset_ci_m[i].sum().rename(vari); 
        dataset_ci_m[i] = dataset_ci_m[i].set('system:time_start',first_mi_date);
      }
      }
      dataset_ci = ee.ImageCollection(dataset_ci_m);
      dataset_cf = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
                        .filter(ee.Filter.date(datecf1, datecf2));
      dataset_cf = dataset_cf.map(corte);
      if (a2 == 2021) {
      for (f = 0; f <= 8; f++) {
        date_mf1 = ee.Date.fromYMD(a2, f+1, 01);
        date_mf2 = ee.Date.fromYMD(a2, f+2, 01);
        dataset_cf_m[f] = dataset_cf.filter(ee.Filter.date(date_mf1, date_mf2));
        first_mf = dataset_cf_m[f].first();
        first_mf_date = first_mf.get('system:time_start');
        dataset_cf_m[f] = dataset_cf_m[f].sum().rename(vari); 
        dataset_cf_m[f] = dataset_cf_m[f].set('system:time_start',first_mf_date);
      }        
      } else {
      for (f = 0; f <= 11; f++) {
        date_mf1 = ee.Date.fromYMD(a2, f+1, 01);
        if (f == 11){
        date_mf2 = ee.Date.fromYMD(a2+1, 01, 01);  
        } else {
        date_mf2 = ee.Date.fromYMD(a2, f+2, 01);
        }
        dataset_cf_m[f] = dataset_cf.filter(ee.Filter.date(date_mf1, date_mf2));
        first_mf = dataset_cf_m[f].first();
        first_mf_date = first_mf.get('system:time_start');
        dataset_cf_m[f] = dataset_cf_m[f].sum().rename(vari); 
        dataset_cf_m[f] = dataset_cf_m[f].set('system:time_start',first_mf_date);
      }
      }
      dataset_cf = ee.ImageCollection(dataset_cf_m);
      chart_opcionesi = {
        title: 'Precipitacion: serie temporal año '+a1,
        vAxis: {title: 'Precipitacion (mm/mes)'},
        hAxis: {title: 'Fecha', format: 'MM-yy', gridlines: {count: 7}},
        series: {
        0: {
          colors: 'blue',
          pointShape: 'diamond',
          pointsVisible: true,
          pointSize: 7,
          lineWidth: 2,
        },
        },
        chartArea: {backgroundColor: 'EBEBEB'},
        legend: {position: 'right'},
      };
      chart_opcionesf = {
        title: 'Precipitacion: serie temporal año '+a2,
        vAxis: {title: 'Precipitacion (mm/mes)'},
        hAxis: {title: 'Fecha', format: 'MM-yy', gridlines: {count: 7}},
        series: {
        0: {
          colors: ['blue', 'yellow'],
          pointShape: 'diamond',
          pointsVisible: true,
          pointSize: 7,
          lineWidth: 2,
        },
        },
        chartArea: {backgroundColor: 'EBEBEB'},
        legend: {position: 'right'},
      };
    break;
    case 'Temperatura Superficial':
      dataset_ci = ee.ImageCollection("MODIS/006/MOD11A1")
                        .filter(ee.Filter.date(dateci1, dateci2));
      dataset_ci = dataset_ci.select("LST_Day_1km");
      dataset_ci = dataset_ci.map(kelv_to_cent);
      if (a1 == 2021){
      for (i = 0; i <= 8; i++) {
        date_mi1 = ee.Date.fromYMD(a1, i+1, 01);
        date_mi2 = ee.Date.fromYMD(a1, i+2, 01);
        dataset_ci_m[i] = dataset_ci.filter(ee.Filter.date(date_mi1, date_mi2));
        first_mi = dataset_ci_m[i].first();
        first_mi_date = first_mi.get('system:time_start');
        dataset_ci_m[i] = dataset_ci_m[i].mean().rename(vari);
        cero_imgi = dataset_ci_m[i].multiply(ee.Image(0));
        rdataseti = dataset_ci_m[i].focal_mean(2, 'square', 'pixels', 25);
        maski = ee.Image(1).blend(cero_imgi);
        dataset_ci_m[i] = maski  
            .where(maski.lte(0.5), dataset_ci_m[i]).rename(vari)
            .where(maski.gt(0.5), rdataseti).rename(vari);
        dataset_ci_m[i] = dataset_ci_m[i].reproject('EPSG:32717', null, 1000);
        dataset_ci_m[i] = dataset_ci_m[i].set('system:time_start',first_mi_date);
        dataset_ci_m[i] = dataset_ci_m[i].clip(area_estudio);
      } 
      } else {
      for (i = 0; i <= 11; i++) {
        date_mi1 = ee.Date.fromYMD(a1, i+1, 01);
        if (i == 11){
        date_mi2 = ee.Date.fromYMD(a1+1, 01, 01);  
        } else {
        date_mi2 = ee.Date.fromYMD(a1, i+2, 01);
        }
        dataset_ci_m[i] = dataset_ci.filter(ee.Filter.date(date_mi1, date_mi2));
        first_mi = dataset_ci_m[i].first();
        first_mi_date = first_mi.get('system:time_start');
        dataset_ci_m[i] = dataset_ci_m[i].mean().rename(vari);
        cero_imgi = dataset_ci_m[i].multiply(ee.Image(0));
        rdataseti = dataset_ci_m[i].focal_mean(2, 'square', 'pixels', 25);
        maski = ee.Image(1).blend(cero_imgi);
        dataset_ci_m[i] = maski  
            .where(maski.lte(0.5), dataset_ci_m[i]).rename(vari)
            .where(maski.gt(0.5), rdataseti).rename(vari);
        dataset_ci_m[i] = dataset_ci_m[i].reproject('EPSG:32717', null, 1000);
        dataset_ci_m[i] = dataset_ci_m[i].set('system:time_start',first_mi_date);
        dataset_ci_m[i] = dataset_ci_m[i].clip(area_estudio);
      }
      }
      dataset_ci = ee.ImageCollection(dataset_ci_m);
      dataset_cf = ee.ImageCollection("MODIS/006/MOD11A1")
                        .filter(ee.Filter.date(datecf1, datecf2));
      dataset_cf = dataset_cf.select("LST_Day_1km");
      dataset_cf = dataset_cf.map(kelv_to_cent);
      if (a2 == 2021) {
      for (f = 0; f <= 8; f++) {
        date_mf1 = ee.Date.fromYMD(a2, f+1, 01);
        date_mf2 = ee.Date.fromYMD(a2, f+2, 01);
        dataset_cf_m[f] = dataset_cf.filter(ee.Filter.date(date_mf1, date_mf2));
        first_mf = dataset_cf_m[f].first();
        first_mf_date = first_mf.get('system:time_start');
        dataset_cf_m[f] = dataset_cf_m[f].mean().rename(vari);
        cero_imgf = dataset_cf_m[f].multiply(ee.Image(0));
        rdatasetf = dataset_cf_m[f].focal_mean(2, 'square', 'pixels', 25);
        maskf = ee.Image(1).blend(cero_imgf);
        dataset_cf_m[f] = maskf  
            .where(maskf.lte(0.5), dataset_cf_m[f]).rename(vari)
            .where(maskf.gt(0.5), rdatasetf).rename(vari);
        dataset_cf_m[f] = dataset_cf_m[f].reproject('EPSG:32717', null, 1000);
        dataset_cf_m[f] = dataset_cf_m[f].set('system:time_start',first_mf_date);
        dataset_cf_m[f] = dataset_cf_m[f].clip(area_estudio);
      }        
      } else {
      for (f = 0; f <= 11; f++) {
        date_mf1 = ee.Date.fromYMD(a2, f+1, 01);
        if (f == 11){
        date_mf2 = ee.Date.fromYMD(a2+1, 01, 01);  
        } else {
        date_mf2 = ee.Date.fromYMD(a2, f+2, 01);
        }
        dataset_cf_m[f] = dataset_cf.filter(ee.Filter.date(date_mf1, date_mf2));
        first_mf = dataset_cf_m[f].first();
        first_mf_date = first_mf.get('system:time_start');
        dataset_cf_m[f] = dataset_cf_m[f].mean().rename(vari);
        cero_imgf = dataset_cf_m[f].multiply(ee.Image(0));
        rdatasetf = dataset_cf_m[f].focal_mean(2, 'square', 'pixels', 25);
        maskf = ee.Image(1).blend(cero_imgf);
        dataset_cf_m[f] = maskf  
            .where(maskf.lte(0.5), dataset_cf_m[f]).rename(vari)
            .where(maskf.gt(0.5), rdatasetf).rename(vari);
        dataset_cf_m[f] = dataset_cf_m[f].reproject('EPSG:32717', null, 1000);
        dataset_cf_m[f] = dataset_cf_m[f].set('system:time_start',first_mf_date);
        dataset_cf_m[f] = dataset_cf_m[f].clip(area_estudio);
      }
      }
      dataset_cf = ee.ImageCollection(dataset_cf_m);
      chart_opcionesi = {
        title: 'Temperatura superficial: serie temporal año '+a1,
        vAxis: {title: 'Temperatura (°C)'},
        hAxis: {title: 'Fecha', format: 'MM-yy', gridlines: {count: 7}},
        series: {
        0: {
          color: '19CE34',
          pointShape: 'diamond',
          pointsVisible: true,
          pointSize: 7,
          lineWidth: 2,
        },
        },
      chartArea: {backgroundColor: 'EBEBEB'},
      legend: {position: 'right'},
    };
      chart_opcionesf = {
        title: 'Temperatura superficial: serie temporal año '+a2,
        vAxis: {title: 'Temperatura (°C)'},
        hAxis: {title: 'Fecha', format: 'MM-yy', gridlines: {count: 7}},
        series: {
        0: {
          color: '19CE34',
          pointShape: 'diamond',
          pointsVisible: true,
          pointSize: 7,
          lineWidth: 2,
        },
        },
      chartArea: {backgroundColor: 'EBEBEB'},
      legend: {position: 'right'},
    };
    break;
    case 'Estado de la vegetación':
      dataset_ci = ee.ImageCollection("MODIS/MOD09GA_006_NDVI")
                        .filter(ee.Filter.date(dateci1, dateci2));
      dataset_ci = dataset_ci.select('NDVI');
      if (a1 == 2021){
      for (i = 0; i <= 8; i++) {
        date_mi1 = ee.Date.fromYMD(a1, i+1, 01);
        date_mi2 = ee.Date.fromYMD(a1, i+2, 01);
        dataset_ci_m[i] = dataset_ci.filter(ee.Filter.date(date_mi1, date_mi2));
        first_mi = dataset_ci_m[i].first();
        first_mi_date = first_mi.get('system:time_start');
        dataset_ci_m[i] = dataset_ci_m[i].mean().rename(vari);
        dataset_ci_m[i] = dataset_ci_m[i].set('system:time_start',first_mi_date);
        dataset_ci_m[i] = dataset_ci_m[i].clip(area_estudio);
      } 
      } else {
      for (i = 0; i <= 11; i++) {
        date_mi1 = ee.Date.fromYMD(a1, i+1, 01);
        if (i == 11){
        date_mi2 = ee.Date.fromYMD(a1+1, 01, 01);  
        } else {
        date_mi2 = ee.Date.fromYMD(a1, i+2, 01);
        }
        dataset_ci_m[i] = dataset_ci.filter(ee.Filter.date(date_mi1, date_mi2));
        first_mi = dataset_ci_m[i].first();
        first_mi_date = first_mi.get('system:time_start');
        dataset_ci_m[i] = dataset_ci_m[i].mean().rename(vari);
        dataset_ci_m[i] = dataset_ci_m[i].set('system:time_start',first_mi_date);
        dataset_ci_m[i] = dataset_ci_m[i].clip(area_estudio);
      }
      }
      dataset_ci = ee.ImageCollection(dataset_ci_m);
      dataset_cf = ee.ImageCollection("MODIS/MOD09GA_006_NDVI")
                        .filter(ee.Filter.date(datecf1, datecf2));
      dataset_cf = dataset_cf.select('NDVI');
      if (a2 == 2021) {
      for (f = 0; f <= 8; f++) {
        date_mf1 = ee.Date.fromYMD(a2, f+1, 01);
        date_mf2 = ee.Date.fromYMD(a2, f+2, 01);
        dataset_cf_m[f] = dataset_cf.filter(ee.Filter.date(date_mf1, date_mf2));
        first_mf = dataset_cf_m[f].first();
        first_mf_date = first_mf.get('system:time_start');
        dataset_cf_m[f] = dataset_cf_m[f].mean().rename(vari);
        dataset_cf_m[f] = dataset_cf_m[f].set('system:time_start',first_mf_date);
        dataset_cf_m[f] = dataset_cf_m[f].clip(area_estudio);
      }        
      } else {
      for (f = 0; f <= 11; f++) {
        date_mf1 = ee.Date.fromYMD(a2, f+1, 01);
        if (f == 11){
        date_mf2 = ee.Date.fromYMD(a2+1, 01, 01);  
        } else {
        date_mf2 = ee.Date.fromYMD(a2, f+2, 01);
        }
        dataset_cf_m[f] = dataset_cf.filter(ee.Filter.date(date_mf1, date_mf2));
        first_mf = dataset_cf_m[f].first();
        first_mf_date = first_mf.get('system:time_start');
        dataset_cf_m[f] = dataset_cf_m[f].mean().rename(vari);
        dataset_cf_m[f] = dataset_cf_m[f].set('system:time_start',first_mf_date);
        dataset_cf_m[f] = dataset_cf_m[f].clip(area_estudio);
      }
      }
      dataset_cf = ee.ImageCollection(dataset_cf_m);
      chart_opcionesi = {
        title: 'Índice de vegetación normalizada: time series '+a1,
        vAxis: {title: 'NDVI'},
        hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
        series: {
        0: {
          color: 'FCAC00',
          pointShape: 'diamond',
          pointsVisible: true,
          pointSize: 7,
          lineWidth: 2,
        },
        },
      chartArea: {backgroundColor: 'EBEBEB'},
      legend: {position: 'right'},
    };
      chart_opcionesf = {
        title: 'Índice de vegetación normalizada: time series '+a2,
        vAxis: {title: 'NDVI'},
        hAxis: {title: 'Date', format: 'MM-yy', gridlines: {count: 7}},
        series: {
        0: {
          color: 'FCAC00',
          pointShape: 'diamond',
          pointsVisible: true,
          pointSize: 7,
          lineWidth: 2,
        },
        },
      chartArea: {backgroundColor: 'EBEBEB'},
      legend: {position: 'right'},
    };
    break;
  }
  overlaychar = ee.Geometry.Point(getPointchar());
  var point_feac_char = ee.FeatureCollection(overlaychar);
  var Charti = ui.Chart.image.series(dataset_ci, point_feac_char, ee.Reducer.mean(), 100);
  var Chartf = ui.Chart.image.series(dataset_cf, point_feac_char, ee.Reducer.mean(), 100);
  Charti.setOptions(chart_opcionesi);
  Chartf.setOptions(chart_opcionesf);
  resultsPaneli.clear().add(Charti);
  resultsPanelf.clear().add(Chartf);
}
//Funcion al hacer click
function handleMapClick(location) {
  selectedPoints.push([location.lon, location.lat]);
  agrega_punto();
  generar_grafico();
}
mapa_base1.onClick(handleMapClick);
Comparador.onClick(handleMapClick);
//Agregamos un panel para el histograma
//Creacion de los paneles
var resultsPaneli = ui.Panel({style: {position: 'bottom-left'}});
var resultsPanelf = ui.Panel({style: {position: 'bottom-right'}});
var instructionsLabeli = ui.Label({
          value: 'Click para generar la nube de puntos.', // Titulo del mapa
          style: {//position: 'top-left', // Posicion
          fontWeight: 'bold', // Negrita
          padding: '0px 0px 0px 0px', //margen
          fontSize: '11px'}}); // Tamaño de fuente
var instructionsLabelf = ui.Label({
          value: 'Click para generar la nube de puntos.', // Titulo del mapa
          style: {//position: 'top-left', // Posicion
          fontWeight: 'bold', // Negrita
          padding: '0px 0px 0px 0px', //margen
          fontSize: '11px'}}); // Tamaño de fuente
resultsPaneli.widgets().reset([instructionsLabeli]);
resultsPanelf.widgets().reset([instructionsLabelf]);
mapa_base1.add(resultsPaneli);
Comparador.add(resultsPanelf);
//Reductor
  var reducers = ee.Reducer.mean();
      reducers = reducers.combine({
       reducer2: ee.Reducer.max(),
        sharedInputs: true
      });
      reducers = reducers.combine({
        reducer2: ee.Reducer.min(),
        sharedInputs: true
      });
//Función para crear la paleta de colores
var makeColorBarParams = function (palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x8',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
//funcion siguiente paso
var mo = [];
var day = [];
var dataseti = [];
var datasetf = [];
var datasetVis = [];
var minimo = [];
var vista = [];
var titulo_m1 = [];
var TituloMapa1 = [];
var titulo_m2 = [];
var TituloMapa2 = [];
var estadisticosi = [];
var estadisticosf = [];
function siguientepaso() {
  ui.root.clear();
  var vari = variable.getValue();
  var a1 = tiempo1.getValue();
  var a2 = tiempo2.getValue();
  var prov = provincia.getValue();
  if (prov == "ECUADOR"){
    area_estudio = ecu;
    cantones = nxcantones;
  }
  else {
    area_estudio = prov_layer;
    cantones = canton_layer;
  }
  var mounth1 = mes1.getValue();
  switch (mounth1) {
    case "Enero":
      mo = 1;
      day = 31;
    break;
    case "Febrero":
      mo = 2;
      day = 28;
    break;
    case "Marzo":
      mo = 3;
      day = 31;
    break;
    case "Abril":
      mo = 4;
      day = 30;
    break;
    case "Mayo":
      mo = 5;
      day = 31;
    break;
    case "Junio":
      mo = 6;
      day = 30;
    break;
    case "Julio":
      mo = 7;
      day = 31;
    break;
    case "Agosto":
      mo = 8;
      day = 31;
    break;
    case "Septiembre":
      mo = 9;
      day = 30;
    break;
    case "Octubre":
      mo = 10;
      day = 31;
    break;
    case "Noviembre":
      mo = 11;
      day = 30;
    break;
    case "Diciembre":
      mo = 12;
      day = 31;
    break;
  }
  if (mo == 12){
  var datei1 = ee.Date.fromYMD(a1, mo, 01);
  var datei2 = ee.Date.fromYMD(a1+1, 01, 01);    
  } else {
    datei1 = ee.Date.fromYMD(a1, mo, 01);
    datei2 = ee.Date.fromYMD(a1, mo+1, 01);
  }
  var mounth2 = mes2.getValue();
  switch (mounth2) {
    case "Enero":
      mo = 1;
      day = 31;
    break;
    case "Febrero":
      mo = 2;
      day = 28;
    break;
    case "Marzo":
      mo = 3;
      day = 31;
    break;
    case "Abril":
      mo = 4;
      day = 30;
    break;
    case "Mayo":
      mo = 5;
      day = 31;
    break;
    case "Junio":
      mo = 6;
      day = 30;
    break;
    case "Julio":
      mo = 7;
      day = 31;
    break;
    case "Agosto":
      mo = 8;
      day = 31;
    break;
    case "Septiembre":
      mo = 9;
      day = 30;
    break;
    case "Octubre":
      mo = 10;
      day = 31;
    break;
    case "Noviembre":
      mo = 11;
      day = 30;
    break;
    case "Diciembre":
      mo = 12;
      day = 31;
    break;
  }
  if (mo == 12){
  var datef1 = ee.Date.fromYMD(a2, mo, 01);
  var datef2 = ee.Date.fromYMD(a2+1, 01, 01);    
  } else {
    datef1 = ee.Date.fromYMD(a2, mo, 01);
    datef2 = ee.Date.fromYMD(a2, mo+1, 01);
  }
  switch(vari){
    case "Precipitación":
      dataseti = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
                                        .filter(ee.Filter.date(datei1, datei2));
      dataseti = dataseti.map(corte);
      dataseti = dataseti.sum().rename(vari);
      datasetf = ee.ImageCollection('UCSB-CHG/CHIRPS/DAILY')
                                        .filter(ee.Filter.date(datef1, datef2));
      datasetf = datasetf.map(corte);
      datasetf = datasetf.sum().rename(vari);
      // Titulo del mapa
      //Definir el titulo
      titulo_m1 = vari+" " + mounth1 + " " + a1;
      TituloMapa1 = ui.Label({
          value: titulo_m1, // Titulo del mapa
          style: {position: 'top-left', // Posicion
          fontWeight: 'bold', // Negrita
          fontSize: '11px'}}); // TamaÃ±o de fuente
      titulo_m2 = vari+" " + mounth2 + " " + a2;
      TituloMapa2 = ui.Label({
          value: titulo_m2, // Titulo del mapa
          style: {position: 'top-right', // Posicion
          fontWeight: 'bold', // Negrita
          fontSize: '11px'}}); // TamaÃ±o de fuente
      mapa_base1.add(TituloMapa1);
      Comparador.add(TituloMapa2);
      // Reduce the region. The region parameter is the Feature geometry.
      estadisticosi = dataseti.reduceRegion({
          reducer: reducers,
          geometry: area_estudio,
          scale: 1000,
          maxPixels: 1e9,
          bestEffort: true,
          //crs: 'EPSG:32717'
      });
      estadisticosf = datasetf.reduceRegion({
          reducer: reducers,
          geometry: area_estudio,
          scale: 1000,
          maxPixels: 1e9,
          bestEffort: true,
          //crs: 'EPSG:32717'
      });
      //Evaluador 1
      estadisticosi.evaluate(function (MinMaxDict) {
        var i_maximo = MinMaxDict[vari+'_max'];
        var i_minimo = MinMaxDict[vari+'_min'];
        var i_promedio = MinMaxDict[vari+'_mean'];
        var txi_title = "Estadisticos: "+ "\n";
        var txi_max = vari + " máxima: "+ "\n" + i_maximo.toFixed(2) + " mm/mes" + "\n";
        var txi_min = vari + " mínima: "+ "\n" + i_minimo.toFixed(2) + " mm/mes" + "\n";
        var txi_mean = vari + " promedio: "+ "\n" + i_promedio.toFixed(2) + " mm/mes" + "\n";
        var nbInfoi = txi_title + txi_max + txi_min + txi_mean;
        var nbInfoLabeli = ui.Label(nbInfoi, {fontFamily: 'monospace', fontSize: '10px', whiteSpace: 'pre', backgroundColor: '#d3d3d3', padding: '4px', margin: '0px 8px 0px 8px', stretch: 'horizontal'});
        var imgCardi = ui.Panel([
          nbInfoLabeli
        ], null, {margin: '4px 0px 0px 4px' , width: '200px', position: 'top-left'});
        //Evaluador 2
        estadisticosf.evaluate(function (MinMaxDict) {
        var f_maximo = MinMaxDict[vari+'_max'];
        var f_minimo = MinMaxDict[vari+'_min'];
        var f_promedio = MinMaxDict[vari+'_mean'];
        var txf_title = "Estadisticos: "+ "\n";
        var txf_max = vari + " máxima: "+ "\n" + f_maximo.toFixed(2) + " mm/mes" + "\n";
        var txf_min = vari + " mínima: "+ "\n" + f_minimo.toFixed(2) + " mm/mes" + "\n";
        var txf_mean = vari + " promedio: "+ "\n" + f_promedio.toFixed(2) + " mm/mes" + "\n";
        var nbInfof = txf_title + txf_max + txf_min + txf_mean;
        var nbInfoLabelf = ui.Label(nbInfof, {fontFamily: 'monospace', fontSize: '10px', whiteSpace: 'pre', backgroundColor: '#d3d3d3', padding: '4px', margin: '0px 8px 0px 8px', stretch: 'horizontal'});
        var imgCardf = ui.Panel([
          nbInfoLabelf
        ], null, {margin: '4px 0px 0px 4px' , width: '200px', position: 'top-right'});
        var BandCompViz = [];
        if (i_maximo >= f_maximo) {
          BandCompViz = {
            min: 0, 
            max: i_maximo,
            palette: ['f7fbff', 'c6dbef', '6baed6', '4292c6', '08519c', '08306b', '05244e'],
          };
        } else {
          BandCompViz = {
            min: 0, 
            max: f_maximo,
            palette: ['f7fbff', 'c6dbef', '6baed6', '4292c6', '08519c', '08306b', '05244e'],
          };
        }
        var legendLabelsf = ui.Panel({
            widgets: [
              ui.Label(0, {margin: '4px 5px', fontSize: '10px'}),
              ui.Label(
                ((BandCompViz.max + 0) / 2).toFixed(2),
                {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontSize: '10px'}),
              ui.Label(BandCompViz.max.toFixed(2), {margin: '4px 8px', textAlign: 'right', fontSize: '10px'})
            ],
            layout: ui.Panel.Layout.flow('horizontal')
          });
        var legendTitlef = ui.Label({
              value: 'Precipitación mm/mes',
          style: {
            fontWeight: 'bold',
            margin: '4px 8px',
            fontSize: '10px'
          //width: '200px',
          //height : '10px'
          }
          });
        var colorBarf = ui.Thumbnail({
          //Se crea una imagen que contiene los valores de lat y long por pixel
          image: ee.Image.pixelLonLat().select(0),
          params: makeColorBarParams(BandCompViz.palette),
          style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '100px', width: '170px', textAlign: 'center'},
          });        
        var legendPanelf = ui.Panel(legendTitlef).add(colorBarf).add(legendLabelsf);
            legendPanelf.style().set({
              //height: '95px',
              width: '200px',
              position: 'top-right'
          });
        mapa_base1.centerObject(area_estudio, 9);
        mapa_base1.addLayer(area_estudio,{},prov,0,1);
        mapa_base1.addLayer(dataseti,BandCompViz,titulo_m1,1,0.9);
        mapa_base1.add(imgCardi);
        mapa_base1.addLayer(cantones.style(canton_style),{},"Cantones");
        //Comparador.addLayer(area_estudio,{},prov,0,1);
        Comparador.addLayer(datasetf,BandCompViz,titulo_m2,1,0.9);
        Comparador.add(imgCardf);
        Comparador.add(legendPanelf);
        Comparador.addLayer(cantones.style(canton_style),{},"Cantones");
        });
      });
      break;
    case 'Temperatura Superficial':
      dataseti = ee.ImageCollection("MODIS/006/MOD11A1")
                                        .filter(ee.Filter.date(datei1, datei2));
      dataseti = dataseti.select("LST_Day_1km");
      var dataseti_date = dataseti.first().get('system:time_start');
      dataseti = dataseti.mean();
      dataseti = dataseti.multiply(0.02).subtract(273.15).rename(vari);
      var cero_imgi = dataseti.multiply(ee.Image(0));
      var rdataseti = dataseti.focal_mean(2, 'square', 'pixels', 25);
      var maski = ee.Image(1).blend(cero_imgi);
      dataseti = maski  
            .where(maski.lte(0.5), dataseti).rename(vari)
            .where(maski.gt(0.5), rdataseti).rename(vari);
      dataseti = dataseti.reproject('EPSG:32717', null, 1000);
      dataseti = dataseti.set('system:time_start',dataseti_date);
      dataseti = dataseti.clip(area_estudio);
      datasetf = ee.ImageCollection("MODIS/006/MOD11A1")
                                        .filter(ee.Filter.date(datef1, datef2));
      datasetf = datasetf.select("LST_Day_1km");
      var datasetf_date = datasetf.first().get('system:time_start');
      datasetf = datasetf.mean();
      datasetf = datasetf.multiply(0.02).subtract(273.15).rename(vari);
      var cero_imgf = datasetf.multiply(ee.Image(0));
      var rdatasetf = datasetf.focal_mean(2, 'square', 'pixels', 25);
      var maskf = ee.Image(1).blend(cero_imgf);
      datasetf = maskf  
            .where(maskf.lte(0.5), datasetf).rename(vari)
            .where(maskf.gt(0.5), rdatasetf).rename(vari);
      datasetf = datasetf.reproject('EPSG:32717', null, 1000);
      datasetf = datasetf.set('system:time_start',datasetf_date);
      datasetf = datasetf.clip(area_estudio).toFloat();
      // Titulo del mapa
      //Definir el titulo
      titulo_m1 = vari+" " + mounth1 + " " + a1;
      TituloMapa1 = ui.Label({
          value: titulo_m1, // Titulo del mapa
          style: {position: 'top-left', // Posicion
          fontWeight: 'bold', // Negrita
          fontSize: '11px'}}); // TamaÃ±o de fuente
      titulo_m2 = vari+" " + mounth2 + " " + a2;
      TituloMapa2 = ui.Label({
          value: titulo_m2, // Titulo del mapa
          style: {position: 'top-right', // Posicion
          fontWeight: 'bold', // Negrita
          fontSize: '11px'}}); // TamaÃ±o de fuente
      mapa_base1.add(TituloMapa1);
      Comparador.add(TituloMapa2);
      // Reduce the region. The region parameter is the Feature geometry.
      estadisticosi = dataseti.reduceRegion({
          reducer: reducers,
          geometry: area_estudio,
          scale: 500,
          maxPixels: 1e11,
          bestEffort: true,
          crs: 'EPSG:32717'
      });
      estadisticosf = datasetf.reduceRegion({
          reducer: reducers,
          geometry: area_estudio,
          scale: 500,
          maxPixels: 1e12,
          bestEffort: true,
          crs: 'EPSG:32717'
      });
      //Evaluador 1
        estadisticosi.evaluate(function (MinMaxDict) {
        var i_maximo = MinMaxDict[vari+'_max'];
        var i_minimo = MinMaxDict[vari+'_min'];
        var i_promedio = MinMaxDict[vari+'_mean'];
        var txi_title = "Estadisticos: "+ "\n";
        var txi_max = vari + " máxima: "+ "\n" + i_maximo.toFixed(2) + " °C" + "\n";
        var txi_min = vari + " mínima: "+ "\n" + i_minimo.toFixed(2) + " °C" + "\n";
        var txi_mean = vari + " promedio: "+ "\n" + i_promedio.toFixed(2) + " °C" + "\n";
        var nbInfoi = txi_title + txi_max + txi_min + txi_mean;
        var nbInfoLabeli = ui.Label(nbInfoi, {fontFamily: 'monospace', fontSize: '10px', whiteSpace: 'pre', backgroundColor: '#d3d3d3', padding: '4px', margin: '0px 8px 0px 8px', stretch: 'horizontal'});
        var imgCardi = ui.Panel([
          nbInfoLabeli
        ], null, {margin: '4px 0px 0px 4px' , width: '220px', position: 'top-left'});
      //Evaluador 2
        estadisticosf.evaluate(function (MinMaxDict) {
        var f_maximo = MinMaxDict[vari+'_max'];
        var f_minimo = MinMaxDict[vari+'_min'];
        var f_promedio = MinMaxDict[vari+'_mean'];
        var txf_title = "Estadisticos: "+ "\n";
        var txf_max = vari + " máxima: "+ "\n" + f_maximo.toFixed(2) + " °C" + "\n";
        var txf_min = vari + " mínima: "+ "\n" + f_minimo.toFixed(2) + " °C" + "\n";
        var txf_mean = vari + " promedio: "+ "\n" + f_promedio.toFixed(2) + " °C" + "\n";
        var nbInfof = txf_title + txf_max + txf_min + txf_mean;
        var nbInfoLabelf = ui.Label(nbInfof, {fontFamily: 'monospace', fontSize: '10px', whiteSpace: 'pre', backgroundColor: '#d3d3d3', padding: '4px', margin: '0px 8px 0px 8px', stretch: 'horizontal'});
        var imgCardf = ui.Panel([
          nbInfoLabelf
        ], null, {margin: '4px 0px 0px 4px' , width: '220px', position: 'top-right'});
        var BandCompViz = [];
        if (i_maximo >= f_maximo) {
          if (i_minimo < f_minimo) {
          BandCompViz = {
            min: i_minimo, 
            max: i_maximo,
            prome: (i_minimo + i_maximo)/2,
            palette:[
            '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
            '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
            '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
            'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
            'ff0000', 'de0101', 'c21301', 'a71001', '911003'
            ],
          };
          } else if(i_minimo >= f_minimo){
          BandCompViz = {
            min: f_minimo, 
            max: i_maximo,
            prome: (f_minimo + i_maximo)/2,
            palette:[
            '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
            '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
            '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
            'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
            'ff0000', 'de0101', 'c21301', 'a71001', '911003'
            ],
          };
          }
        } else if(i_maximo < f_maximo) {
          if (i_minimo >= f_minimo){
            BandCompViz = {
            min: f_minimo, 
            max: f_maximo,
            prome: (f_minimo + f_maximo)/2,
            palette:[
            '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
            '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
            '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
            'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
            'ff0000', 'de0101', 'c21301', 'a71001', '911003'
            ],            
          };
          } else if (i_minimo < f_minimo) {
          BandCompViz = {
            min: i_minimo, 
            max: f_maximo,
            prome: (i_minimo + f_maximo)/2,
            palette:[
            '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
            '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
            '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
            'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
            'ff0000', 'de0101', 'c21301', 'a71001', '911003'
            ],            
          };
          }
        }
        var legendLabelsf = ui.Panel({
            widgets: [
              ui.Label(BandCompViz.min.toFixed(2), {margin: '4px 5px', fontSize: '10px'}),
              ui.Label(
                ((BandCompViz.max + BandCompViz.min) / 2).toFixed(2),
                {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontSize: '10px'}),
              ui.Label(BandCompViz.max.toFixed(2), {margin: '4px 8px', textAlign: 'right', fontSize: '10px'})
            ],
            layout: ui.Panel.Layout.flow('horizontal')
          });
        var legendTitlef = ui.Label({
              value: 'Temperatura superficial (°C)',
          style: {
            fontWeight: 'bold',
            margin: '4px 8px',
            fontSize: '10px'
          //width: '200px',
          //height : '10px'
          }
          });
        var colorBarf = ui.Thumbnail({
          //Se crea una imagen que contiene los valores de lat y long por pixel
          image: ee.Image.pixelLonLat().select(0),
          params: makeColorBarParams(BandCompViz.palette),
          style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '100px', width: '190px', textAlign: 'center'},
          });        
        var legendPanelf = ui.Panel(legendTitlef).add(colorBarf).add(legendLabelsf);
            legendPanelf.style().set({
              //height: '95px',
              width: '220px',
              position: 'top-right'
          });
        mapa_base1.centerObject(area_estudio,9);
        //mapa_base1.addLayer(area_estudio,{},prov,0,1);
        mapa_base1.addLayer(dataseti,BandCompViz,titulo_m1,1,0.8);
        mapa_base1.add(imgCardi);
        mapa_base1.addLayer(cantones.style(canton_style),{},"Cantones");
        Comparador.addLayer(datasetf,BandCompViz,titulo_m2,1,0.8);
        Comparador.add(imgCardf);
        Comparador.add(legendPanelf);
        Comparador.addLayer(cantones.style(canton_style),{},"Cantones");
        });
      });
      break;
    case "Estado de la vegetación":
      dataseti = ee.ImageCollection("MODIS/MOD09GA_006_NDVI")
                                        .filter(ee.Filter.date(datei1, datei2));
      dataseti = dataseti.select('NDVI');
      dataseti = dataseti.map(corte);
      dataseti = dataseti.mean().rename(vari);
      datasetf = ee.ImageCollection("MODIS/MOD09GA_006_NDVI")
                                        .filter(ee.Filter.date(datef1, datef2));
      datasetf = datasetf.select("NDVI");
      datasetf = datasetf.map(corte);
      datasetf = datasetf.mean().rename(vari);
      // Titulo del mapa
      //Definir el titulo
      titulo_m1 = vari+" " + mounth1 + " " + a1;
      TituloMapa1 = ui.Label({
          value: titulo_m1, // Titulo del mapa
          style: {position: 'top-left', // Posicion
          fontWeight: 'bold', // Negrita
          fontSize: '11px'}}); // TamaÃ±o de fuente
      titulo_m2 = vari+" " + mounth2 + " " + a2;
      TituloMapa2 = ui.Label({
          value: titulo_m2, // Titulo del mapa
          style: {position: 'top-right', // Posicion
          fontWeight: 'bold', // Negrita
          fontSize: '11px'}}); // TamaÃ±o de fuente
      mapa_base1.add(TituloMapa1);
      Comparador.add(TituloMapa2);
      // Reduce the region. The region parameter is the Feature geometry.
      estadisticosi = dataseti.reduceRegion({
          reducer: reducers,
          geometry: area_estudio,
          scale: 1000,
          maxPixels: 1e9,
          bestEffort: true,
          //crs: 'EPSG:32717'
      });
      estadisticosf = datasetf.reduceRegion({
          reducer: reducers,
          geometry: area_estudio,
          scale: 1000,
          maxPixels: 1e9,
          bestEffort: true,
          //crs: 'EPSG:32717'
      });
      //Evaluador 1
      estadisticosi.evaluate(function (MinMaxDict) {
        var i_maximo = MinMaxDict[vari+'_max'];
        var i_minimo = MinMaxDict[vari+'_min'];
        var i_promedio = MinMaxDict[vari+'_mean'];
        var txi_title = "Estadisticos: "+ "\n";
        var txi_max = "NDVI " + "máxima: "+ "\n" + i_maximo.toFixed(2) + "\n";
        var txi_min = "NDVI " + "mínima: "+ "\n" + i_minimo.toFixed(2) + "\n";
        var txi_mean = "NDVI " + "promedio: "+ "\n" + i_promedio.toFixed(2)  + "\n";
        var nbInfoi = txi_title + txi_max + txi_min + txi_mean;
        //print ("nbInfoi: ", nbInfoi);
        var nbInfoLabeli = ui.Label(nbInfoi, {fontFamily: 'monospace', fontSize: '10px', whiteSpace: 'pre', backgroundColor: '#d3d3d3', padding: '4px', margin: '0px 8px 0px 8px', stretch: 'horizontal'});
        var imgCardi = ui.Panel([
          nbInfoLabeli
        ], null, {margin: '4px 0px 0px 4px' , width: '150px', position: 'top-left'});
        //Evaluador 2
        estadisticosf.evaluate(function (MinMaxDict) {
        var f_maximo = MinMaxDict[vari+'_max'];
        var f_minimo = MinMaxDict[vari+'_min'];
        var f_promedio = MinMaxDict[vari+'_mean'];
        var txf_title = "Estadisticos: "+ "\n";
        var txf_max = "NDVI" + " máxima: "+ "\n" + f_maximo.toFixed(2) + "\n";
        var txf_min = "NDVI" + " mínima: "+ "\n" + f_minimo.toFixed(2) + "\n";
        var txf_mean = "NDVI" + " promedio: "+ "\n" + f_promedio.toFixed(2) + "\n";
        var nbInfof = txf_title + txf_max + txf_min + txf_mean;
        //print ("nbInfof: ", nbInfof);
        var nbInfoLabelf = ui.Label(nbInfof, {fontFamily: 'monospace', fontSize: '10px', whiteSpace: 'pre', backgroundColor: '#d3d3d3', padding: '4px', margin: '0px 8px 0px 8px', stretch: 'horizontal'});
        var imgCardf = ui.Panel([
          nbInfoLabelf
        ], null, {margin: '4px 0px 0px 4px' , width: '150px', position: 'top-right'});
        var BandCompViz = {
            min: 0, 
            max: 0.8,
            prome: (-0.2 + 0.8)/2,
            palette:[
              'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
              '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
              '012E01', '011D01', '011301'
            ],            
        };
        var legendLabelsf = ui.Panel({
            widgets: [
              ui.Label(BandCompViz.min.toFixed(2), {margin: '4px 5px', fontSize: '10px'}),
              ui.Label(
                ((BandCompViz.max + BandCompViz.min) / 2).toFixed(2),
                {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontSize: '10px'}),
              ui.Label(BandCompViz.max.toFixed(2), {margin: '4px 8px', textAlign: 'right', fontSize: '10px'})
            ],
            layout: ui.Panel.Layout.flow('horizontal')
          });
        var legendTitlef = ui.Label({
              value: 'Temperatura superficial (°C)',
          style: {
            fontWeight: 'bold',
            margin: '4px 8px',
            fontSize: '10px'
          //width: '200px',
          //height : '10px'
          }
          });
        var colorBarf = ui.Thumbnail({
          //Se crea una imagen que contiene los valores de lat y long por pixel
          image: ee.Image.pixelLonLat().select(0),
          params: makeColorBarParams(BandCompViz.palette),
          style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '100px', width: '170px', textAlign: 'center'},
          });        
        var legendPanelf = ui.Panel(legendTitlef).add(colorBarf).add(legendLabelsf);
            legendPanelf.style().set({
              //height: '95px',
              width: '200px',
              position: 'top-right'
          });
        mapa_base1.centerObject(area_estudio,9);
        //mapa_base1.addLayer(area_estudio,{},prov,0,1);
        mapa_base1.addLayer(dataseti,BandCompViz,titulo_m1,1,0.8);
        mapa_base1.add(imgCardi);
        mapa_base1.addLayer(cantones.style(canton_style),{},"Cantones");        
        //Comparador.addLayer(area_estudio,{},prov,0,1);
        Comparador.addLayer(datasetf,BandCompViz,titulo_m2,1,0.8);
        Comparador.add(imgCardf);
        Comparador.add(legendPanelf);
        Comparador.addLayer(cantones.style(canton_style),{},"Cantones");
        });
      });
      break;
  }
  var SWIPE = ui.Map.Linker([mapa_base1, Comparador]);
  var SWIPE2 = ui.SplitPanel({
    firstPanel: SWIPE.get(0),
    secondPanel: SWIPE.get(1),
    orientation: 'horizontal', // Cambio a horizontal o vertical
    wipe: true,
    style: {stretch: 'both'}});
  ui.root.widgets().reset([SWIPE2]);
}