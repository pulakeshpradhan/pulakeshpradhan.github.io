var lagunasMuestreadas = ui.import && ui.import("lagunasMuestreadas", "table", {
      "id": "users/torrezaffaroni/Doct/Lagunas/Lagunas_ubicacion"
    }) || ee.FeatureCollection("users/torrezaffaroni/Doct/Lagunas/Lagunas_ubicacion"),
    gsweMappingLayers = ui.import && ui.import("gsweMappingLayers", "image", {
      "id": "JRC/GSW1_3/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_3/GlobalSurfaceWater"),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -61.3355071238373,
                -35.3504423749788
              ],
              [
                -61.8903166941498,
                -35.86849102764831
              ],
              [
                -61.10754081524355,
                -36.25260564127636
              ],
              [
                -60.58569022930605,
                -35.6232827409531
              ],
              [
                -61.3080413035248,
                -35.31459137233163
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-61.3355071238373, -35.3504423749788],
          [-61.8903166941498, -35.86849102764831],
          [-61.10754081524355, -36.25260564127636],
          [-60.58569022930605, -35.6232827409531],
          [-61.3080413035248, -35.31459137233163]]]),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.MultiPoint(),
    table = ui.import && ui.import("table", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2"),
    zonasPampas = ui.import && ui.import("zonasPampas", "table", {
      "id": "users/torrezaffaroni/zonasPampas"
    }) || ee.FeatureCollection("users/torrezaffaroni/zonasPampas"),
    gswe = ui.import && ui.import("gswe", "imageCollection", {
      "id": "JRC/GSW1_3/MonthlyHistory"
    }) || ee.ImageCollection("JRC/GSW1_3/MonthlyHistory"),
    lagunasVect = ui.import && ui.import("lagunasVect", "table", {
      "id": "users/torrezaffaroni/Doct/Lagunas/lagunas_10pc"
    }) || ee.FeatureCollection("users/torrezaffaroni/Doct/Lagunas/lagunas_10pc"),
    deptos = ui.import && ui.import("deptos", "table", {
      "id": "users/torrezaffaroni/Doct/Lagunas/deptos_final"
    }) || ee.FeatureCollection("users/torrezaffaroni/Doct/Lagunas/deptos_final"),
    lagunasVect2 = ui.import && ui.import("lagunasVect2", "table", {
      "id": "users/torrezaffaroni/Doct/Lagunas/lagunas_10pc_cincoDeptos"
    }) || ee.FeatureCollection("users/torrezaffaroni/Doct/Lagunas/lagunas_10pc_cincoDeptos"),
    mosaico = ui.import && ui.import("mosaico", "imageCollection", {
      "id": "users/torrezaffaroni/Doct/Lagunas/mosaico_458_cincoDeptos"
    }) || ee.ImageCollection("users/torrezaffaroni/Doct/Lagunas/mosaico_458_cincoDeptos");
var colorbrewer = require('users/gena/packages:colorbrewer');
var style = require('users/gena/packages:style');
// print(colorbrewer, "paletas");
var region = zonasPampas.filter(ee.Filter.eq("DISTRITO", "interior plana"))
// var deptos = table.filter(ee.Filter.inList("ADM2_NAME", 
//                           ["Pehuajo", "9 de Julio", "Hipolito Yrigoyen", "Carlos Casares"]))
//                   .filter(ee.Filter.eq("ADM1_NAME", "Buenos Aires"))
/// exploramos con pekel la frecuencia de agua por pixel
var frecuencia = gsweMappingLayers.select("occurrence").clip(deptos)
var visPekel = {
  "min":0,
  "max":100,
  "palette": ['ffffff', 'ffbbbb', '0000ff']
};
var frecAbs = gswe.map(function(img){
    return img.select("water")
                     .where(img.select("water").lte(1), 0)
                     .where(img.select("water").gt(1), 1)
                     .rename("agua");
}).sum();
var aguaLagunas = frecuencia.gte(10)
aguaLagunas = aguaLagunas.updateMask(frecAbs.gte(42)) 
/////////--------- 1. correr modelos ajustados ---------/////////
// . Modelos de ajuste
var chla = " 10 ** (5.96 - 3.01 * (b('BLUE') / b('GREEN')) + 1.95 * log10(b('RED'))) "
var secchi =  "10 ** (1.69 + 22.84 * b('BLUE') - 13.68 * b('RED') - 5.59 * b('NIR')) "
var sedim = " 10 ** (1.04 - 51.5 * b('BLUE') + 35.61 * b('RED') + 8.17 * b('NIR')) "
// antilog = 10 ** x
var modelos = mosaico.map(function(i){
  i = i.updateMask(aguaLagunas)
  var chlEst = i.expression(chla).rename("chlA_mgm3")
  var sechEst = i.expression(secchi).rename("secchi_m")
  var sedEst = i.expression(sedim).rename("solSusp_mgL")
  chlEst = chlEst.updateMask(chlEst.lte(1e4))
  sechEst = sechEst.updateMask(sechEst.lte(10))
  sedEst = sedEst.updateMask(sedEst.lte(1e3))
  var anio = ee.String(i.get("anio_mes")).slice(0,4)
  var mes = ee.String(i.get("anio_mes")).slice(5,7)
  return chlEst.addBands(sechEst)
                .addBands(sedEst)
                .copyProperties(i, ["anio_mes"])
                .set({"system:time_start": ee.Date.fromYMD(
                  ee.Number.parse(anio),
                  ee.Number.parse(mes), 
                  01).millis()})
}) 
// print(modelos)
var visChla = {
  min:0, 
  max:100, 
  palette: colorbrewer.Palettes.PuBuGn[9]
  // ['4348ff','5086ff','80ffed',
  // '7effcf','6effa1','37ff50', '3dd621']
}
var visSol = {
  min:15, 
  max: 100, 
  palette: ["1219ff","8d4fad","8f467c","935471","874c54"]
}
var visSech = {
  min: 0.1,
  max: 0.8,
  palette: ["6c3d43","7e4861","8f467c","8d4fad","1219ff"]
}
// Map.addLayer(mosaico2, {}, "mosaico2 Mensual Landsats", false)
// Map.addLayer(modelos, {}, "resultados por modelo", false)
// Map.addLayer(modelos.select("secchi_m"), visSech, "prof Disco Secchi", false)
// Map.addLayer(modelos.select("solSusp_mgL"), visSol, 
//             "solidos en suspension", false)
// Map.addLayer(modelos.select("chlA_mgm3"), visChla, 
//             "chl-A", false)
var minChla = modelos.select("chlA_mgm3").min()
var maxChla = modelos.select("chlA_mgm3").max()
var rangoChla = maxChla.subtract(minChla) //dif entre p5 y p99
var meanChla = modelos.select("chlA_mgm3").mean()
// var medianChla = modelos.select("chlA_mgm3").median()
var sdChla = modelos.select("chlA_mgm3").reduce(ee.Reducer.stdDev())
var minSecc = modelos.select("secchi_m").min()
var maxSecc = modelos.select("secchi_m").max()
var rangoSecc = maxSecc.subtract(minSecc)
var meanSecc = modelos.select("secchi_m").mean()
// var medianSecc = modelos.select("secchi_m").median()
var sdSecc = modelos.select("secchi_m").reduce(ee.Reducer.stdDev())
var minSol = modelos.select("solSusp_mgL").min()
var maxSol = modelos.select("solSusp_mgL").max()
var rangoSol = maxSol.subtract(minSol)
var meanSol = modelos.select("solSusp_mgL").mean()
// var medianSol = modelos.select("solSusp_mgL").median()
var sdSol = modelos.select("solSusp_mgL").reduce(ee.Reducer.stdDev())
var media = modelos.median();
Map.addLayer(media, {}, "mediana con outliers", false);
var percentilRegion = { //del script 4-resumen_por_laguna
  "chlA_mgm3_p1":11.956352369873292,
  "chlA_mgm3_p99":134.86576760444655,
  "secchi_m_p1":0.1956296396952563,
  "secchi_m_p99":0.8669287063850776,
  "solSusp_mgL_p1":18.438881915134925,
  "solSusp_mgL_p99":170.016459663905
}
var medianChla = media.select("chlA_mgm3")
                  // .updateMask(media.select("chlA_mgm3").lte(ee.Number(percentilRegion["chlA_mgm3_p99"])))
                  // .updateMask(media.select("chlA_mgm3").gte(ee.Number(percentilRegion["chlA_mgm3_p1"])))
var medianSecc = media.select("secchi_m")
                                  // .updateMask(media.select("secchi_m").lte(ee.Number(percentilRegion["secchi_m_p99"])))
                                  // .updateMask(media.select("secchi_m").gte(ee.Number(percentilRegion["secchi_m_p1"])))
var medianSol = media.select("solSusp_mgL")
                                  // .updateMask(media.select("solSusp_mgL").lte(ee.Number(percentilRegion["solSusp_mgL_p99"])))
                                  // .updateMask(media.select("solSusp_mgL").gte(ee.Number(percentilRegion["solSusp_mgL_p1"])))
////////------------ Mapa y visualización --------------///////////
var visCV = {
  min: 0,
  max: 3,
  palette:['black', 'yellow', 'red']
}
var visRangoChla = {
  min:0, 
  max:500, 
  palette: ['black', 'brown', 'yellow']
}
var visRangoSol = {
  min: 0,
  max: 200,
  palette: ['black', 'brown', 'yellow']
}
var visRangoSech = {
  min: 0, 
  max: 30,  
  palette: ['black', 'brown', 'yellow']
}
Map.addLayer(frecuencia, visPekel, "frecuencia de inundación (GSWE)", true)
Map.addLayer(meanSecc.divide(sdSecc), visCV, "Coef.Var. Prof. Disco Secchi ", false)
Map.addLayer(meanSol.divide(sdSol), visCV, "Coef.Var. Contenido de Sólidos en Suspensión ", false)
Map.addLayer(meanChla.divide(sdChla), visCV, "Coef.Var. Contenido de Clorofila a", false)
Map.addLayer(medianSecc,visSech, "mediana Prof. Disco Secchi ", false)
Map.addLayer(medianSol,visSol, "mediana Contenido de Sólidos en Suspensión ", false)
Map.addLayer(medianChla,  visChla, "mediana Contenido de Clorofila a", false)
// Map.addLayer(minSecc,   visSech, "min prof Disco Secchi ", false)
// Map.addLayer(maxSecc,   visSech, "max prof Disco Secchi ", false)
// Map.addLayer(rangoSecc, visRangoSech, "Rango prof Disco Secchi ", false)
// Map.addLayer(minSol,   visSol, "min solidos en suspension ", false)
// Map.addLayer(maxSol,   visSol, "max solidos en suspension ", false)
// Map.addLayer(rangoSol ,visRangoSol, "rango solidos en suspension ", false)
// Map.addLayer(minChla,  visChla, "min clorofila a ", false)
// Map.addLayer(maxChla,  visChla, "max clorofila a ", false)
// Map.addLayer(rangoChla,visRangoChla, "rango clorofila a ", false)
// PEKEL, 3 VARIABLES (MEDIANA), CV, RANGO - mismo orden que layers
var blank = ee.Image(0).mask(0);
var outline = blank.paint(ee.FeatureCollection(deptos), 'AA0000', 3); 
var visPar = {'palette':'#f20a0a','opacity': 0.6};
Map.addLayer(outline, visPar, "Área de estudio")
// cosas genericas y de mapa
Map.setOptions("HYBRID")
Map.centerObject(deptos)
// Map.addLayer(lagunasVect.style({fillColor:"ff000000", color:"black", width : 0.75}), {}, "lagunas vectorizadas", true, 0.7)
Map.addLayer(lagunasVect2.style({fillColor:"ff000000", color:"black", width : 1}), {}, "Lagunas vectorizadas", true, 0.5)
Map.addLayer(lagunasMuestreadas.style({color:"yellow"}), {}, "Lagunas muestreadas", true)
var utilsLeyendas = require('users/torrezaffaroni/SAT:utils_leyendas');
var leyendaPekel = utilsLeyendas.get_legend_continuo("Frecuencia de agua (%) (GSWE)", visPekel)
var leyendaCV = utilsLeyendas.get_legend_continuo("Coeficiente de variación (%)", visCV)
var leyendaChla = utilsLeyendas.get_legend_continuo("Clorofila a (mg/m3)", visChla)
var leyendaSol = utilsLeyendas.get_legend_continuo("Solidos en suspensión (mg/L)", visSol)
var leyendaSech = utilsLeyendas.get_legend_continuo("Profundidad del disco de Secchi (m)", visSech)
var leyendaRangoChla = utilsLeyendas.get_legend_continuo("Rango", visRangoChla)
// var leyendaRangoSol = utilsLeyendas.get_legend_continuo("Rango de solidos en suspensión (mg/L)", visRangoSol)
// var leyendaRangoSech = utilsLeyendas.get_legend_continuo("Rango de prof disco Secchi (m)", visRangoSech)
var variables = {
  'Clorofila a': 'chlA_mgm3',
  'Solidos en suspension' : 'solSusp_mgL', 
  'Prof. disco Secchi': 'secchi_m'
};
var ecuaciones = {
  'Clorofila a':  "chlA (mg/m3) = 10 ^ (6.06 - 3.06 * AZUL/VERDE + 1.99 * log10(ROJO)), R2 = 0.57",
  'Solidos en suspension' : "solSusp (mg/L) = 10 ^ (0.07 - 53.62 * AZUL + 33-38 * ROJO + 9.29 * IRc), R2 = 0.52",
  'Prof. disco Secchi': "Prof. D.Secchi (m) =  10 ^ (1.04 + 30.41 * AZUL - 14.89 * ROJO - 8.34 * IRc), R2 = 0.51"
}
// antilog = 10 ** x
var variableS = ui.Select({items:Object.keys(variables)});
var panelModelos = ui.Panel({
      widgets:[ui.Label('Variable a graficar:'), variableS]
})
var tickLaguna = ui.Checkbox({
                    label: "Obtener serie temporal por laguna"
                  })
Map.setControlVisibility({drawingToolsControl : false,
                          mapTypeControl : false
})
ui.root.add(ui.Panel({widgets:[
                  ui.Label({
                    value: "Estimación de parámetros de calidad de lagunas de la pampa interior a través de información satelital",
                    style:{fontSize: '16px', fontWeight :'bold'},
                  }),
                  ui.Label({
                    value: "Ir al trabajo presentado en el XI Congreso de Ecología y Manejo de Ecosistemas Acuáticos Pampeanos (EMEAP)",
                    targetUrl:'https://drive.google.com/file/d/1zuAuxXpstRtzodyrxaHahV95TktetYtn/view?usp=sharing',
                    style:{color: 'blue', fontSize: '12px'},
                  }),
                  ui.Label({
                    value: "Para visualizar la serie temporal, debe seleccionar primero la variable en el menú desplegable",
                    style:{fontSize: '12px'},
                  }),
                  panelModelos,
                  tickLaguna,
                  leyendaChla, leyendaSol, leyendaSech, 
                  // leyendaRangoChla, 
                  leyendaCV, 
                  leyendaPekel, 
                  ui.Chart.image.histogram({
                    image: frecuencia,
                    region: deptos,
                    scale:30,
                    maxPixels:1e12,
                    minBucketWidth:5
                  }).setOptions({
                    title: 'Distribución de frecuencias de inundación (píxeles)'
                  })
                  ],
  style: {width:'250px'}
}))
ui.root.setLayout(ui.Panel.Layout.flow('horizontal', true));
Map.onClick(function(coords){
  var variable = variableS.getValue();
   //otro paso es que haga la reduccion por la laguna que está intersectando el punto
  var pgeo = ee.Geometry.Point([coords.lon, coords.lat]);
  if(tickLaguna.getValue()){
    var laguna = lagunasVect2.filter(ee.Filter.contains(".geo", pgeo))
    Map.addLayer(laguna.style({fillColor:"FF000000", color:"red"}), {}, "laguna clickeada")
    var reduccion = modelos.select(variables[variable])
                          .reduce(ee.Reducer.percentile([99]))
                          .reduceRegion({
                            reducer: ee.Reducer.median(),
                            geometry: laguna.first().geometry(), 
                            scale: 30
                          })
    var colImg = modelos.select(variables[variable])
                      .map(function(i){
                        return i.updateMask(i.lte(ee.Number(reduccion.get(variables[variable]+"_p99"))))
                      })
    var filteredSWE = ui.Chart.image.series({
        imageCollection: colImg, 
        region: laguna.first().geometry(), 
        reducer:ee.Reducer.median(), 
        scale: 30, 
        xProperty:"system:time_start"
      });
    var reductor = modelos.select(variables[variable]).min().rename("min")
                      .addBands(
                        [modelos.select(variables[variable]).median().rename("median"),
                        modelos.select(variables[variable]).mean().rename("mean"),
                        modelos.select(variables[variable]).max().rename("max")])
                        .reduceRegion({
                          reducer: ee.Reducer.median(),
                          geometry: laguna.first().geometry(),
                          scale: 30
                        });
  } else{
    Map.addLayer(pgeo, {color:"red"}, "punto clickeado");
    var reduccion = modelos.select(variables[variable])
                          .reduce(ee.Reducer.percentile([99]))
                          .reduceRegion({
                            reducer: ee.Reducer.median(),
                            geometry: pgeo.buffer(90), 
                            scale: 30
                          })
    var colImg = modelos.select(variables[variable])
                      .map(function(i){
                        return i.updateMask(i.lte(ee.Number(reduccion.get(variables[variable]+"_p99"))))
                      })
    var filteredSWE = ui.Chart.image.series({
        imageCollection: colImg, 
        region: pgeo.buffer(90), 
        reducer:ee.Reducer.median(), 
        scale: 30, 
        xProperty:"system:time_start"
      });
    var reductor = modelos.select(variables[variable]).min().rename("min")
                      .addBands(
                        [modelos.select(variables[variable]).median().rename("median"),
                        modelos.select(variables[variable]).mean().rename("mean"),
                        modelos.select(variables[variable]).max().rename("max")])
                        .reduceRegion({
                          reducer: ee.Reducer.first(),
                          geometry: pgeo,
                          scale: 30
                        });
  }
  // print(reduccion)
  // print(ee.Number(reduccion.get(variables[variable]+"_p99")))
  filteredSWE.style().set({
    position: 'bottom-left',
    width: '500px', //
    height: '300px'  //
    });
  filteredSWE.setOptions({
    title: ('Serie temporal de '+variable),
    hAxis: {title: 'Año'},
    vAxis: {title: (variables[variable])}});
  var datos = ui.Label("min: "+ee.Number(reductor.get("min")).format("%.2f").getInfo()+
                      "; max: "+ee.Number(reductor.get("max")).format("%.2f").getInfo()+
                      "; mediana: "+ee.Number(reductor.get("median")).format("%.2f").getInfo()+
                      "; media: " +ee.Number(reductor.get("mean")).format("%.2f").getInfo())
  // Add and update chart
  panelChart.clear();
  panelChart.style().set(show_panel1);
  panelChart.add(ui.Label(ecuaciones[variable]))
  panelChart.add(filteredSWE);
  panelChart.add(datos)
});
var panelChart = ui.Panel();
var hide_panel1 = {
  position: 'bottom-left',
  width: '1px',
  height: '1px'
};
var show_panel1 = {
  position: 'bottom-left',
  width: '',
  height: ''
};
panelChart.style().set(hide_panel1);
Map.add(panelChart);