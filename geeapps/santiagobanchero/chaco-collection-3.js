var table = ui.import && ui.import("table", "table", {
      "id": "projects/mapbiomas-chaco/COLECCION-3/Limite/zonas-operativas-por-pais-c3"
    }) || ee.FeatureCollection("projects/mapbiomas-chaco/COLECCION-3/Limite/zonas-operativas-por-pais-c3"),
    Errores = ui.import && ui.import("Errores", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -61.28639643189367,
            -18.410417308850988
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -58.076169057931885,
            -19.497183700710092
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.MultiPoint(
        [[-61.28639643189367, -18.410417308850988],
         [-58.076169057931885, -19.497183700710092]]),
    limite_chaco = ui.import && ui.import("limite_chaco", "table", {
      "id": "projects/mapbiomas-chaco/COLECCION-3/Limite/Limite_Chaco_col3"
    }) || ee.FeatureCollection("projects/mapbiomas-chaco/COLECCION-3/Limite/Limite_Chaco_col3");
/***
 * Visualizador de clasificaciones
 * 
 * Banchero (2022)
 * 
 * 
 * */
var version_filtro = "2_tmp_W3_ini_fin"
var ts = require("users/santiagobanchero/plots:plots.js")
// Matriz de confusión
// var cm = require("users/MapBiomasAR/coleccion-3:libs/confusion-matrix.js").cm  // CM
var filtradas = ee.ImageCollection("projects/mapbiomas-chaco/COLECCION-3/RESULTADOS/clasificaciones-filtradas")
                     .filter(ee.Filter.eq("version", version_filtro))
                     .select('classification_2.*')
print("FIL:",filtradas)
// Estilos & Visualización
// var colors = ["#ffffff", "#129912", "#1f4423", "#006400", "#00ff00", "#ffffff", "#76a5af", "#ffffff", "#ffffff", "#935132", "#bbfcac", "#45c2a5", "#b8af4f", "#ffffff", "#ffffb2", "#ffd966", "#ffffff", "#ffffff", "#ffffff", "#d5a6bd", "#ffffff", "#ffffff", "#ea9999", "#ffffff", "#ffffff", "#ffffff", "#0000ff", "#d5d5e5", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#f3b4f1", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#cca0d4", "#d082de", "#cd49e4", "#cae6d1"]
var colors = ["#ffffff", "#129912", "#1f4423", "#006400", "#00ff00", "#ffffff", "#76a5af", "#ffffff", "#ffffff", "#935132", "#bbfcac", "#45c2a5", "#b8af4f", "#ffffff", "#ffffb2", "#ffd966", "#ffffff", "#ffffff", "#ffffff", "#F39C12", "#ffffff", "#ffffff", "#ea9999", "#ffffff", "#ffffff", "#ffffff", "#0000ff", "#d5d5e5", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#BF063B", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#C8AD82", "#A08B69", "#cd49e4", "#5BC674"]
var vis_class =  {
      // "bands": ["clasificacion_2019"],
      "min": 0,
      "max": 45,
      "palette": colors,
      "format": "png"
    }
var year = ee.List.sequence(2000, 2021).getInfo();
print(year)
year.forEach(function(y){
  var filtrada_ano = filtradas.select("classification_"+y).mosaic()
  Map.addLayer(filtrada_ano, vis_class, "CF - " + y, false)  
})
Map.addLayer(limite_chaco.style({fillColor: "ff000000",color:"ff0000"}),{},"Limite C3")
Map.centerObject(limite_chaco)
// --------------------------------------
//  APP: Controles de gráficos y leyenda
// --------------------------------------
var app = {
  flag_plot_enable: false,
  plot: ts.plots.ts_landsat, // plot object
  barplot: ts.plots.barplot, // plot object
  current_year: null,
  max_layers: Map.layers().length(),
  //cm: cm, // Confusion Matrix Object 
  leyenda : {
     3  :{label:"Leñosas Cerradas", color:"#006400"},
    4  :{label:"Leñosas Abiertas", color:"#00ff00"},
    45 :{label:"Leñosas Dispersas", color:"#5BC674"},//"#e04cfa"
    6  :{label:"Leñosas Inundables", color:"#76a5af"},
    9  :{label:"Leñosas Cultivadas", color:"#935132"},
    42 :{label:"Pastizal Abierto", color:"#C8AD82"},//"#cca0d4"
    43 :{label:"Pastizal Cerrado", color:"#A08B69"}, //"#d082de"
    44 :{label:"Pastizal Disperso", color:"#cd49e4"},
    11 :{label:"Pastizal Inundable", color:"#45c2a5"},
    15 :{label:"Pasturas", color:"#ffd966"},
    19 :{label:"Cultivos Anuales", color:"#F39C12"},// "d5a6bd"
    36 :{label:"Cultivos Arbustivos", color:"#BF063B"},//#f3b4f1
    22 :{label:"Áreas no Vegetadas", color:"#ea9999"},
    26 :{label:"Cuerpos de Agua", color:"#0000ff"},
    },
  // Plot config 
  params: {
    start: "1985-01-01",
    end: "2022-04-01",
    geom: null,
    index: "ndvi",
    cloud_cover: 10,
    options:{
      title: "NDVI time series",
      subtitle: ""
    }
  },
  activate: function(v){
    app.flag_plot_enable = !app.flag_plot_enable;
    app.panel_plot.widgets().reset([]);
  },
  on_map_click: function(p){
    if(app.flag_plot_enable){
      var point = ee.Geometry.Point([p.lon, p.lat])
      app.params.geom = point
      print("Y:",year)
      print("B:",filtradas.mosaic().bandNames())
      app.params.options.subtitle = "Año: " + app.current_year
      var params_bar1 = {
        title: "Sin F.",   
        point: point,
        image: i_class,
        years: year    
      }
      var params_bar2 = {
        title: "Filtradas",   
        point: point,
        image: filtradas.mosaic(),
        years: year    
      }
      var p = ui.Panel([
                ui.Panel(
                  [app.barplot.get(params_bar1),
                   app.barplot.get(params_bar2)], 
                   ui.Panel.Layout.Flow("horizontal")),
                      app.plot.get(app.params) ])
      app.panel_plot.widgets().reset([p]);
      var point_clic = ui.Map.Layer(ee.Feature(point,null), {color:"yellow"}, "Inspect", true) // OnClick
      Map.layers().set(app.max_layers, point_clic)
    }
  },
  make_row: function(color, name) {
    // Create the label that is actually the colored box.
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
        // Use padding to give the box height and width.
        padding: '8px',
        margin: '0 0 4px 0'
      }
    });
    // Create the label filled with the description text.
    var description = ui.Label({
      value: name,
      style: {margin: '0 0 4px 6px'}
    });
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
  },
  add_legend: function(){
    for(var x in app.leyenda) {
      var obj = app.leyenda[x]
      app.panel_legend.add(app.make_row(obj.color, "("+x+") " + obj.label))
    }
  },
  classify_change: function(year){
    app.current_year = year;
  },
  // Visual Interface
  panel_main: ui.Panel([], ui.Panel.Layout.Flow("vertical"), {position: "bottom-right", width: "500px"}),
  panel_legend: ui.Panel([], ui.Panel.Layout.Flow("vertical"), {position: "top-left"}),
  panel_plot: ui.Panel([], ui.Panel.Layout.Flow("vertical")),
  panel_cm: ui.Panel([], ui.Panel.Layout.Flow("vertical"), {}),  // CM
  chk_plot: ui.Checkbox("Activar serie temporal", false, function(v){app.activate(v)}, false, {border: "1px", padding: "5px"}),
  lst_years: ui.Select(year.map(function(n){return "" + n}), "Año... ", null, function(v){app.classify_change(v)}, false, {}),
  //btn_show_ConfusionMatrix: ui.Button("ConfusionMatrix", function(f){app.show_ConfusionMatrix(f)}),
  init: function(){
    app.panel_main.add(app.panel_plot);
    app.panel_main.add(app.chk_plot);
    // app.panel_main.add(app.lbl_current_class);
    //app.panel_main.add(ui.Panel([app.lst_years, app.btn_show_ConfusionMatrix], ui.Panel.Layout.Flow("horizontal")));
    // Map.add(app.panel_main)
    Map.add(app.panel_legend)
    // Map.add(app.panel_cm)
    // Map.onClick(app.on_map_click)
    app.add_legend();
  }
}
app.init()
Map.setOptions("HYBRID")