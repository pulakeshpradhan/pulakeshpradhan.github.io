var landsat5 = ui.import && ui.import("landsat5", "imageCollection", {
      "id": "LANDSAT/LT05/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LT05/C01/T1_SR"),
    landsat8 = ui.import && ui.import("landsat8", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    bacias = ui.import && ui.import("bacias", "table", {
      "id": "users/christhianscunha/Bacias_RS_SEMA"
    }) || ee.FeatureCollection("users/christhianscunha/Bacias_RS_SEMA"),
    arroz = ui.import && ui.import("arroz", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -50.895784504804126,
            -30.01587979123201
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "label": "arroz"
      },
      "color": "#d6d366",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d6d366 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-50.895784504804126, -30.01587979123201]),
            {
              "label": "arroz",
              "system:index": "0"
            })]),
    floresta = ui.import && ui.import("floresta", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -50.97746405821216,
            -30.046415200052053
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "label": "floresta"
      },
      "color": "#4fff44",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #4fff44 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-50.97746405821216, -30.046415200052053]),
            {
              "label": "floresta",
              "system:index": "0"
            })]),
    agua = ui.import && ui.import("agua", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -50.925849727944396,
            -29.99800093922188
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "label": "agua"
      },
      "color": "#0b4a8b",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-50.925849727944396, -29.99800093922188]),
            {
              "label": "agua",
              "system:index": "0"
            })]),
    campo = ui.import && ui.import("campo", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -51.092009886578914,
            -29.977807749020894
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "label": "campo"
      },
      "color": "#ff5948",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ff5948 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-51.092009886578914, -29.977807749020894]),
            {
              "label": "campo",
              "system:index": "0"
            })]),
    banhados = ui.import && ui.import("banhados", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -51.031976244052856,
            -29.972511516681084
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "label": "banhados"
      },
      "color": "#00ffff",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ffff */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-51.031976244052856, -29.972511516681084]),
            {
              "label": "banhados",
              "system:index": "0"
            })]),
    urbana = ui.import && ui.import("urbana", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -51.09540730662147,
            -29.957611551379788
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "label": "urbana"
      },
      "color": "#92c2b7",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #92c2b7 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-51.09540730662147, -29.957611551379788]),
            {
              "label": "urbana",
              "system:index": "0"
            })]),
    ponto = ui.import && ui.import("ponto", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -50.94803230620857,
            -29.96563420699956
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff0000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ff0000 */
    /* shown: false */
    ee.Geometry.Point([-50.94803230620857, -29.96563420699956]),
    region = ui.import && ui.import("region", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -51.50679008819099,
                -29.645832212467457
              ],
              [
                -51.50679008819099,
                -30.302493389652103
              ],
              [
                -50.21589653350349,
                -30.302493389652103
              ],
              [
                -50.21589653350349,
                -29.645832212467457
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
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
    ee.Geometry.Polygon(
        [[[-51.50679008819099, -29.645832212467457],
          [-51.50679008819099, -30.302493389652103],
          [-50.21589653350349, -30.302493389652103],
          [-50.21589653350349, -29.645832212467457]]], null, false),
    visNDWI = ui.import && ui.import("visNDWI", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDWI_med"
        ],
        "min": -0.7574291825294495,
        "max": -0.2946194112300873,
        "palette": [
          "ffffff",
          "ce7e45",
          "df923d",
          "f1b555",
          "fcd163",
          "99b718",
          "74a901",
          "66a000",
          "7effff",
          "3fb8ff",
          "1d44ff",
          "1d02ff"
        ]
      }
    }) || {"opacity":1,"bands":["NDWI_med"],"min":-0.7574291825294495,"max":-0.2946194112300873,"palette":["ffffff","ce7e45","df923d","f1b555","fcd163","99b718","74a901","66a000","7effff","3fb8ff","1d44ff","1d02ff"]},
    visMNDWI = ui.import && ui.import("visMNDWI", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "MNDWI_med"
        ],
        "min": -0.35,
        "max": 0.15,
        "palette": [
          "ffffff",
          "ce7e45",
          "df923d",
          "f1b555",
          "fcd163",
          "99b718",
          "74a901",
          "66a000",
          "7effff",
          "3fb8ff",
          "1d44ff",
          "1d02ff"
        ]
      }
    }) || {"opacity":1,"bands":["MNDWI_med"],"min":-0.35,"max":0.15,"palette":["ffffff","ce7e45","df923d","f1b555","fcd163","99b718","74a901","66a000","7effff","3fb8ff","1d44ff","1d02ff"]},
    visLSWI = ui.import && ui.import("visLSWI", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "LSWI_med"
        ],
        "min": 0.05600188300013542,
        "max": 0.6736244559288025,
        "palette": [
          "ffffff",
          "ce7e45",
          "df923d",
          "f1b555",
          "fcd163",
          "99b718",
          "74a901",
          "66a000",
          "7effff",
          "3fb8ff",
          "1d44ff",
          "1d02ff"
        ]
      }
    }) || {"opacity":1,"bands":["LSWI_med"],"min":0.05600188300013542,"max":0.6736244559288025,"palette":["ffffff","ce7e45","df923d","f1b555","fcd163","99b718","74a901","66a000","7effff","3fb8ff","1d44ff","1d02ff"]};
//Unidade 2/3 - Análises temporais, indíces fenológicos e de água.
// O objetivo desta Unidade é permitir que o aluno consiga: 
// 1) Delimitar uma área de interesse por meio de uma geometria/ponto
// 2) Importar uma coleção de imagens, aplicar filtros, remover núvens e extrair uma imagem de uma ano qualquer
// 3) Aplicar funções de índices fenológicos, de água e temperatura.
// 4) Aplicar mascaras para osbervar e apresentar resultados 
// 5) Análise gráficas 
/////////////////////////////// 1)Definião da área de estudo  - Geometria ou Ponto////////////////////////////////////
Map.setOptions('SATELLITE')
var area_de_estudo = ee.FeatureCollection(bacias.filter(ee.Filter.eq('Nome','GRAVATAI')));
var arealimite = ee.Image().byte();
var outline = arealimite.paint({featureCollection: area_de_estudo,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: 'FF0000'}, 'Bacia Hidrigráfica do Rio Gravataí');
//////////////////////////////1.1 DEFINIÇÃO DAS AMOSTRAS ///////////////////////////////////////////////////////////
var variaveis = arroz.merge((campo).merge(agua).merge(floresta).merge(urbana).merge(banhados))
///////////////////2 .DEFINIÇÃO DE INTERVALO DE TEMPO E IMPORTAÇÃO DAS COLEÇÕES LANDSAT////////////////////////////////
/*************************************MASCARAS DE NUVES PARA AS COLEÇÕES LANDSAT 5,7 e 8**************/
//Mascará de nuvens para a banda pixel_qa SR landsat 4,5 e 7
var cloudMaskL457 = function(image) {
var qa = image.select('pixel_qa'); // substitiu a band FMASK
//Se o bit da nuvem (5) estiver definido e a confiança na nuvem (7) estiver alta
//ou o bit de sombra da nuvem está definido (3), então é um pixel ruim.
var cloud = qa.bitwiseAnd(1 << 5)
            .and(qa.bitwiseAnd(1 << 7))
            .or(qa.bitwiseAnd(1 << 3))
//Remove os pixels das arestas que não ocorrem em todas as bandas
var mask2 = image.mask().reduce(ee.Reducer.min());
return image.updateMask(cloud.not()).updateMask(mask2).divide(10000).copyProperties(image, ["system:time_start"]); //dividir valor DN por 10.000 
}
//Mascará de nuvens para a banda pixel_qa SR landsat 8
function cloudMaskL8(image) {
// Os bits 3 e 5 são nuvem e sombra, respectivamente..
var cloudShadowBitMask = 1 << 3;
var cloudsBitMask = 1 << 5;
// Obter a banda QA de pixels..
var qa = image.select('pixel_qa');
// Ambos os bit devem ser definidos como zero, indicando condições claras
var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
          .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
// Retorna a imagem mascarada, dimensionada para a refletância, sem as bandas QA.
return image.updateMask(mask).divide(10000).copyProperties(image, ["system:time_start"]);
}
/****************************************DEFINIÇÃO DO INTERVALO DE TEMPO*************************************/
var startyear = 1984;
var endyear = 2020;  
var startdate = ee.Date.fromYMD(startyear, 1, 1);
var enddate = ee.Date.fromYMD(endyear , 12, 31);
var years = ee.List.sequence(startyear, endyear);
var months = ee.List.sequence(1,12); 
/**************************************IMPORTAR COLEÇÕES LANDSAT*******************************************/
var l5Bands = ['B1','B2','B3','B4','B5','B6','B7','pixel_qa'];//definir lista para poder compatibilizar as bandas
var l5names = ['blue', 'green', 'red', 'nir', 'swir1', 'temp', 'swir2','pixel_qa'];//definir lista com nomes iguais
var l7Bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7','pixel_qa'];//definir lista para poder compatibilizar as bandas
var l7names = ['blue', 'green', 'red', 'nir', 'swir1', 'temp', 'swir2','pixel_qa'];//definir lista para poder compatibilizar as bandas
var l8Bands = ['B2','B3', 'B4', 'B5', 'B6', 'B10', 'B7','pixel_qa'];//definir lista para poder compatibilizar as bandas
var l8names = ['blue', 'green', 'red', 'nir', 'swir1', 'temp', 'swir2','pixel_qa'];//definir lista para poder compatibilizar as bandas
/******************************************ÍNDICES FENOLÓGICOS E DE ÁGUA*************************************/                       
function f_index_ (image) {
  var ndvi =  image.normalizedDifference(['nir', 'red']).rename('NDVI');// Rouse 1973
  var lswi =  image.normalizedDifference(['nir', 'swir2']).rename('LSWI'); //Xiao 2002
  var mndwi = image.normalizedDifference(['green', 'swir2']).rename('MNDWI'); // Xu 2005
  var ndwi = image.normalizedDifference(['green', 'nir']).rename ('NDWI'); //Mc Feeters 1996
  var evi = image.expression('2.5 * ((N - R) / (N + (6 * R) - (7.5 * B) + 1))', { //Huete 2002
        'N': image.select('nir'), 'R': image.select('red'), 'B': image.select('blue')}).rename('EVI');
  var savi = image.expression('(1 + L ) * float(nir - red)/ (nir + red + L)',{ 'nir': image.select('nir'),
        'red': image.select('red'),'L':0.02}).rename('SAVI');
  return image.addBands([ndvi,lswi, mndwi, ndwi, evi,savi])}
//LANDSAT 5 SURFACE REFLECTANCE COLLECTION SR T1
var ls5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR")
                            .select(l5Bands, l5names)
                            .filterDate(startdate,enddate)
                            .filter(ee.Filter.calendarRange(1,12,"month"))
                          .filterMetadata('CLOUD_COVER','less_than',1)
                            .map(cloudMaskL457)
                            .map(f_index_)
                            .filterBounds(area_de_estudo);
//LANDSAT 7 SURFACE REFLECTANCE COLLECTION SR T1
var ls7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR")
                            .select(l7Bands, l7names)
                            .filterDate(startdate,enddate)
                            .filter(ee.Filter.calendarRange(1,12,"month"))
                         .filterMetadata('CLOUD_COVER','less_than',1)
                            .map(cloudMaskL457)
                            .map(f_index_)
                            .filterBounds(area_de_estudo);
var ls8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
                            .select(l8Bands, l8names)
                            .filterDate(startdate,enddate)
                             .filter(ee.Filter.calendarRange(1,12,"month"))
                          .filterMetadata('CLOUD_COVER','less_than',1)
                            .map(cloudMaskL8)
                            .map(f_index_)
                            .filterBounds(area_de_estudo);
//Merge the dataseries
var collection_merge = ee.ImageCollection(ls5.merge(ls8));
                       print(collection_merge);
var collection_merge_index = collection_merge.map(f_index_);
//print('índices',collection_merge_index) 
//////////////////////////////// 6.1 REDUTORES APLICADOS AS COLEÇÕES /////////////////////////////////////////////
var col_stdDev = collection_merge_index.select('NDVI','LSWI','MNDWI','NDWI','EVI').reduce(ee.Reducer.stdDev());
var col_mean = collection_merge_index.select('NDVI','LSWI','MNDWI','NDWI','EVI').reduce(ee.Reducer.mean());
var col_min = collection_merge_index.select('NDVI','LSWI','MNDWI','NDWI','EVI').reduce(ee.Reducer.min());
var col_max = collection_merge_index.select('NDVI','LSWI','MNDWI','NDWI','EVI').reduce(ee.Reducer.max());
// Calculo NDVI - Média, Desvio Padrão, Max, Min
 var ndvi_mean = collection_merge_index.select('NDVI').reduce(ee.Reducer.mean()).rename('NDVI_med');
 var ndvi_stDev = collection_merge_index.select('NDVI').reduce(ee.Reducer.stdDev()).rename('NDVI_stdDev');
 var ndvi_max = collection_merge_index.select('NDVI').reduce(ee.Reducer.max()).rename('NDVI_max');
 var ndvi_min = collection_merge_index.select('NDVI').reduce(ee.Reducer.min()).rename('NDVI_min');
// Calculo LSWI - Média, Desvio Padrão, Max, Min, 
 var lswi_mean = collection_merge_index.select('LSWI').reduce(ee.Reducer.mean()).rename('LSWI_med');
 var lswi_stDev = collection_merge_index.select('LSWI').reduce(ee.Reducer.stdDev()).rename('LSWI_stdDev');
 var lswi_max = collection_merge_index.select('LSWI').reduce(ee.Reducer.max()).rename('LSWI_max');
 var lswi_min = collection_merge_index.select('LSWI').reduce(ee.Reducer.min()).rename('LSWI_min');
// Calculo MNDWI - Média, Desvio Padrão, Max, Min, 
 var mndwi_mean = collection_merge_index.select('MNDWI').reduce(ee.Reducer.mean()).rename('MNDWI_med');
 var mndwi_stDev = collection_merge_index.select('MNDWI').reduce(ee.Reducer.stdDev()).rename('MNDWI_stdDev');
 var mndwi_max = collection_merge_index.select('MNDWI').reduce(ee.Reducer.max()).rename('MNDWI_max');
 var mndwi_min = collection_merge_index.select('MNDWI').reduce(ee.Reducer.min()).rename('MNDWI_min');
// Calculo NDWI - Média, Desvio Padrão, Max, Min, Percentil 25%
 var ndwi_mean = collection_merge_index.select('NDWI').reduce(ee.Reducer.mean()).rename('NDWI_med');
 var ndwi_stDev = collection_merge_index.select('NDWI').reduce(ee.Reducer.stdDev()).rename('NDWI_stdDev');
 var ndwi_max = collection_merge_index.select('NDWI').reduce(ee.Reducer.max()).rename('NDWI_max');
 var ndwi_min = collection_merge_index.select('NDWI').reduce(ee.Reducer.min()).rename('NDWI_min');
// Calculo EVI - Média, Desvio Padrão, Max, Min, Percentil 25%
 var evi_mean = collection_merge_index.select('EVI').reduce(ee.Reducer.mean()).rename('EVI_med');
 var evi_stDev = collection_merge_index.select('EVI').reduce(ee.Reducer.stdDev()).rename('EVI_stdDev');
 var evi_max = collection_merge_index.select('EVI').reduce(ee.Reducer.max()).rename('EVI_max');
 var evi_min = collection_merge_index.select('EVI').reduce(ee.Reducer.min()).rename('EVI_min');
///////////////////////////////////////// 7. GRÁFICOS///////////////////////////////////////////////////////////
var ndvichart = ui.Chart.image.seriesByRegion(collection_merge_index, variaveis, ee.Reducer.mean(),
'NDVI', 30, 'system:time_start', 'label')
.setChartType('LineChart')
.setOptions({
          title: 'NDVI dos Alvos',
          vAxis: {title: 'NDVI'},
          lineWidth: 1,
          pointSize: 4,
          });
//print(ndvichart)
var evichart = ui.Chart.image.seriesByRegion(collection_merge_index, variaveis, ee.Reducer.mean(),
'EVI', 30, 'system:time_start', 'label')
.setChartType('LineChart')
.setOptions({
          title: 'EVI dos Alvos',
          vAxis: {title: 'EVI'},
          lineWidth: 1,
          pointSize: 4,
          });
//print(evichart)
var lswichart = ui.Chart.image.seriesByRegion(collection_merge_index, variaveis, ee.Reducer.mean(),
'LSWI', 30, 'system:time_start', 'label')
.setChartType('LineChart')
.setOptions({
          title: 'LSWI dos Alvos',
          vAxis: {title: 'LSWI'},
          lineWidth: 1,
          pointSize: 4,
          });
//print(lswichart)
var ndwichart = ui.Chart.image.seriesByRegion(collection_merge_index, variaveis, ee.Reducer.mean(),
'NDWI', 30, 'system:time_start', 'label')
.setChartType('LineChart')
.setOptions({
          title: 'NDWI dos Alvos',
          vAxis: {title: 'NDWI'},
          lineWidth: 1,
          pointSize: 4,
          });
//print(ndwichart)
var mndwichart = ui.Chart.image.seriesByRegion(collection_merge_index, variaveis, ee.Reducer.mean(),
'MNDWI', 30, 'system:time_start', 'label')
.setChartType('LineChart')
.setOptions({
          title: 'MNDWI dos Alvos',
          vAxis: {title: 'MNDWI'},
          lineWidth: 1,
          pointSize: 4,
          });
//print(mndwichart)
/***********************RESPOSTA DOS ALVOS************************************************************/
var chart_regions_stdDev = ui.Chart.image.regions({
  image: col_stdDev,
  regions: variaveis,
  scale: 30,
  seriesProperty: 'label'
});
chart_regions_stdDev.setChartType('LineChart');
chart_regions_stdDev.setOptions({
  title: 'Desvio Padrão dos Indices Espectrais',
  hAxis: {
    title: 'Índices Espectrais de Vegetação e Água'
  },
  vAxis: {
    title: 'Desv. Pad.'
  },
  lineWidth: 1,
  pointSize: 4,
});
//print(chart_regions_stdDev);
var chart_regions = ui.Chart.image.regions({
  image: col_mean,
  regions: variaveis,
  scale: 30,
  seriesProperty: 'label'
});
chart_regions.setChartType('LineChart');
chart_regions.setOptions({
  title: 'Média dos Indices Espectrais',
  hAxis: {
    title: 'Índices Espectrais de Vegetação e Água'
  },
  vAxis: {
    title: 'Média'
  },
  lineWidth: 1,
  pointSize: 4,
});
print(chart_regions);
var chart_regions = ui.Chart.image.regions({
  image: col_min,
  regions: variaveis,
  scale: 30,
  seriesProperty: 'label'
});
chart_regions.setChartType('LineChart');
chart_regions.setOptions({
  title: 'Mínimo dos Indices Espectrais',
  hAxis: {
    title: 'Índices Espectrais de Vegetação e Água'
  },
  vAxis: {
    title: 'Mínimo'
  },
  lineWidth: 1,
  pointSize: 4,
});
print(chart_regions);
var chart_regions = ui.Chart.image.regions({
  image: col_max,
  regions: variaveis,
  scale: 30,
  seriesProperty: 'label'
});
chart_regions.setChartType('LineChart');
chart_regions.setOptions({
  title: 'Máximo dos Indices Espectrais',
  hAxis: {
    title: 'Índices Máximo Espectrais de Vegetação e Água'
  },
  vAxis: {
    title: 'Máximo'
  },
  lineWidth: 1,
  pointSize: 4,
});
print(chart_regions);
/////////////////////////////////////8. ADICIONANDO OS LAYERS///////////////////////////////////////////////////
var palette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
  Map.addLayer(ndvi_mean.clip(area_de_estudo),{min:0.2, max:0.81, palette: palette}, 'NDVI Médio',0);
  Map.addLayer(lswi_mean.clip(area_de_estudo),visLSWI, 'LSWI Médio',0);
  Map.addLayer(mndwi_mean.clip(area_de_estudo),visMNDWI, 'MNDWI Médio',0);
  Map.addLayer(ndwi_mean.clip(area_de_estudo),visNDWI, 'NDWI Médio',0);
  Map.addLayer(evi_mean.clip(area_de_estudo),{min:0.08, max:0.47, palette: palette}, 'EVI Médio',0);
///////////////////////////////////////9. APLICANDO MASCARAS //////////////////////////////////////////////
var mndwiMasked = mndwi_max.updateMask(mndwi_max.gte(0.5));
var mndwiViz = {min:0.5, max: 0.9, palette: ['00FFFF', '#0b4a8b']};
Map.addLayer(mndwiMasked.clip(area_de_estudo), mndwiViz, 'MNDWI masked',0);
var ndwiMasked = ndwi_max.updateMask(ndwi_max.gte(0.1));
var ndwiViz = {min: 0.2, max: 0.9, palette: ['00FFFF', '#d5fdff']};
Map.addLayer(ndwiMasked.clip(area_de_estudo), ndwiViz, 'NDWI masked',0);
// Load an image.
var image = collection_merge;
// Define the visualization parameters.
var vizParams = {
  bands: ['red', 'green', 'blue'],
  min: 0.019,
  max: 0.16};
var palette = ['00FFFF', '#00ffff','#0b4a8b']
Map.addLayer(image.mean().clip(area_de_estudo), vizParams, 'Cor Verdadeira',0);
var imageRGB = image.mean().clip(area_de_estudo).visualize({bands: ['red', 'green', 'blue'],  min: 0.019, max: 0.16});
var mndwiRGB = mndwiMasked.clip(area_de_estudo).visualize({min: 0.5, max: 1, palette: ['00FFFF', '#0b4a8b']
});
// Mosaic the visualization layers and display (or export).
/////////////////////////////////////////////////////////////////////////
//I would like to create a gif with this image.///
/////////////////////////////////////////////////////////////////////////
var mosaic = ee.ImageCollection([imageRGB, mndwiRGB]).mosaic();
Map.addLayer(mosaic, {}, 'Mosaico',1);
//I want to use the mosaic image to generate the video to see 
//the evolution of the flood spot over the years.
Map.centerObject(ponto,10);
/////////////////////////////////////CODE GIF
//Below I put the parameters for making the gif but this is giving error.
// Define RGB visualization parameters.
var text = require('users/gena/packages:text')
var style = require('users/gena/packages:style')
var visParams = {
  min: 0.4,
  max: 1,
  palette: ['00FFFF', '#0b4a8b'  ],
};
var scaled = 120 // 
var textProperties = { fontSize: 32, textColor: 'ffffff' }
// gradient bar
var labels = ee.List.sequence(0, 1, 1)
var pt1 = text.getLocation(region, 'left', '90%', '5%')
var pt2 = text.getLocation(region, 'left', '85%', '35%')
var rect = ee.Geometry.Rectangle([pt1, pt2], 'EPSG:4326', false)
var gradientBar = style.GradientBar.draw(rect, {
  min: 0, max: 1, palette: palette, labels: labels, 
  format: '%d', text: textProperties, scale: scaled
})
// get text location
var pt = text.getLocation(region, 'right', '2%', '35%') // aloca o texto na 'região' definida
var ptTitle = text.getLocation(region, 'left', '2%', '2%') 
var ptTitlee = text.getLocation(region, 'left', '10%', '2%') 
// Create RGB visualization images for use as animation frames.
var rgbVis = collection_merge.filterBounds(ponto).map(function(img) {
  var water = img.normalizedDifference(['green', 'swir2']).unitScale(0, 0.3).selfMask().visualize({palette: ['00FFFF', '#0b4a8b']})
  var rgb = img.visualize({bands: ['red', 'green', 'blue'],  min: 0.019, max: 0.16})
  var scale = 120
  var textVis = { fontSize: 32, textColor: 'ffffff', outlineColor: '000000', outlineWidth: 2.5, outlineOpacity: 0.6 }
  var label = text.draw(img.date().format('YYYY-MM-dd'), pt, scale, textVis)
  var textVisTitle = { fontSize: 32, fontType: 'Consolas', textColor: 'ffffff', outlineColor: '000000', outlineWidth: 2.5, outlineOpacity: 0.6 }
  var title = text.draw('Serie_MNDWI-1984-2020', ptTitle, scale, textVisTitle)
  var titlee = text.draw('Autor_Christhian_Cunha', ptTitlee, scale, textVisTitle)
  return rgb.blend(water).clip(area_de_estudo).blend(label).blend(gradientBar).blend(title).blend(titlee)
})
// Define GIF visualization parameters.
var gifParams = {
  'region': region,
  'dimensions': 780,
  'crs': 'EPSG:4326',
  'framesPerSecond': 2,
  'format': 'gif'
};
// Print the GIF URL to the console.
print(rgbVis.getVideoThumbURL(gifParams));
// Render the GIF animation in the console.
print(ui.Thumbnail(rgbVis, gifParams));
//Map.add (ui.Thumbnail(rgbVis, gifParams))
//////////////////////////////////////////////EXPORTAR IMAGEM//////////////////////////////////////////
 Export.image.toDrive({
  image: mndwi_max.clip(area_de_estudo),
  description: 'NDWI_MAX_BH_GRAVATAI',
  folder: 'Curso_GEE',
  scale: 30,
  region: area_de_estudo
});
/****************************************DEFINIÇÃO DO INTERVALO DE TEMPO LOOP*************************************/
var totalAreas=ee.List([])
var Names = ee.List(['MNDWI_max'])
var years=ee.List.sequence(1984,2019).getInfo()
var month = ee.List.sequence(1,12).getInfo()
print (years)
var a=years.map(areaCalc)
function areaCalc(year){
  //print (year)
  var startdate = ee.Date.fromYMD(year, 1, 1);
  var enddate = ee.Date.fromYMD(year, 12, 31);
//LANDSAT 5 SURFACE REFLECTANCE COLLECTION SR T1
var ls5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR")
                            .select(l5Bands, l5names)
                            .filterDate(startdate,enddate)
                            .filter(ee.Filter.calendarRange(1,12,"month"))
                         .filterMetadata('CLOUD_COVER','less_than',10)
                            .map(cloudMaskL457)
                            .map(f_index_)
                            .filterBounds(area_de_estudo);
//LANDSAT 7 SURFACE REFLECTANCE COLLECTION SR T1
var ls7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR")
                            .select(l7Bands, l7names)
                            .filterDate(startdate,enddate)
                            .filter(ee.Filter.calendarRange(1,12,"month"))
                         .filterMetadata('CLOUD_COVER','less_than',10)
                            .map(cloudMaskL457)
                            .map(f_index_)
                            .filterBounds(area_de_estudo);
var ls8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
                            .select(l8Bands, l8names)
                            .filterDate(startdate,enddate)
                             .filter(ee.Filter.calendarRange(1,12,"month"))
                        .filterMetadata('CLOUD_COVER','less_than',10)
                            .map(cloudMaskL8)
                            .map(f_index_)
                            .filterBounds(area_de_estudo);
//Merge the dataseries
var collection_merge = ee.ImageCollection(ls5.merge(ls7.merge(ls8)));
                       //print(collection_merge);
var collection_merge_index = collection_merge.map(f_index_);
//print('índices',collection_merge_index )
//Map.addLayer(collection_merge.median().clip(area_de_estudo), {bands: ['red', 'green', 'blue'], min: 0.03, max: 0.19, gamma: 1.05}, 'Coleções Landsat' .concat(year),0)
/****************************************************ÍNDICES************************************************************/
// aplicação de reduções nas coleções e índices
var col_stdDev = collection_merge.select('NDVI','LSWI','MNDWI','NDWI','EVI','SAVI').reduce(ee.Reducer.stdDev());
var col_mean = collection_merge.select('NDVI','LSWI','MNDWI','NDWI','EVI','SAVI').reduce(ee.Reducer.mean());
var col_per_90 = collection_merge.select('NDVI','LSWI','MNDWI','NDWI','EVI','SAVI').reduce(ee.Reducer.percentile([90]));
var col_min = collection_merge.select('NDVI','LSWI','MNDWI','NDWI','EVI','SAVI').reduce(ee.Reducer.min());
var col_max = collection_merge.select('NDVI','LSWI','MNDWI','NDWI','EVI','SAVI').reduce(ee.Reducer.max());
// Calculo NDVI - Média, Desvio Padrão, Max, Min, Percentil 25%
 var ndvi_mean = collection_merge.select('NDVI').reduce(ee.Reducer.mean()).rename('NDVI_med');
 var ndvi_stDev = collection_merge.select('NDVI').reduce(ee.Reducer.stdDev()).rename('NDVI_stdDev');
 var ndvi_max = collection_merge.select('NDVI').reduce(ee.Reducer.max()).rename('NDVI_max');
 var ndvi_min = collection_merge.select('NDVI').reduce(ee.Reducer.min()).rename('NDVI_min');
 var ndvi_per_90 = collection_merge.select('NDVI').reduce(ee.Reducer.percentile([90])).rename('NDVI_per_10');
// Calculo LSWI - Média, Desvio Padrão, Max, Min, Percentil 25%
 var lswi_mean = collection_merge.select('LSWI').reduce(ee.Reducer.mean()).rename('LSWI_med');
 var lswi_stDev = collection_merge.select('LSWI').reduce(ee.Reducer.stdDev()).rename('LSWI_stdDev');
 var lswi_max = collection_merge.select('LSWI').reduce(ee.Reducer.max()).rename('LSWI_max');
 var lswi_min = collection_merge.select('LSWI').reduce(ee.Reducer.min()).rename('LSWI_min');
 var lswi_per_90 = collection_merge.select('LSWI').reduce(ee.Reducer.percentile([90])).rename('LSWI_per_10');
// Calculo MNDWI - Média, Desvio Padrão, Max, Min, Percentil 25%
 var mndwi_mean = collection_merge.select('MNDWI').reduce(ee.Reducer.mean()).rename('MNDWI_med');
 var mndwi_stDev = collection_merge.select('MNDWI').reduce(ee.Reducer.stdDev()).rename('MNDWI_stdDev');
 var mndwi_max = collection_merge.select('MNDWI').reduce(ee.Reducer.max()).rename('MNDWI_max');
 var mndwi_min = collection_merge.select('MNDWI').reduce(ee.Reducer.min()).rename('MNDWI_min');
 var mndwi_per_90 = collection_merge.select('MNDWI').reduce(ee.Reducer.percentile([90])).rename('MNDWI_per_10');
// Calculo NDWI - Média, Desvio Padrão, Max, Min, Percentil 25%
 var ndwi_mean = collection_merge.select('NDWI').reduce(ee.Reducer.mean()).rename('NDWI_med');
 var ndwi_stDev = collection_merge.select('NDWI').reduce(ee.Reducer.stdDev()).rename('NDWI_stdDev');
 var ndwi_max = collection_merge.select('NDWI').reduce(ee.Reducer.max()).rename('NDWI_max');
 var ndwi_min = collection_merge.select('NDWI').reduce(ee.Reducer.min()).rename('NDWI_min');
 var ndwi_per_90 = collection_merge.select('NDWI').reduce(ee.Reducer.percentile([90])).rename('NDWI_per_10'); 
// Calculo EVI - Média, Desvio Padrão, Max, Min, Percentil 25%
 var evi_mean = collection_merge.select('EVI').reduce(ee.Reducer.mean()).rename('EVI_med');
 var evi_stDev = collection_merge.select('EVI').reduce(ee.Reducer.stdDev()).rename('EVI_stdDev');
 var evi_max = collection_merge.select('EVI').reduce(ee.Reducer.max()).rename('EVI_max');
 var evi_min = collection_merge.select('EVI').reduce(ee.Reducer.min()).rename('EVI_min');
 var evi_per_90 = collection_merge.select('EVI').reduce(ee.Reducer.percentile([90])).rename('EVI_per_10');
// Calculo SAVI - Média, Desvio Padrão, Max, Min, Percentil 25%
 var savi_mean = collection_merge.select('SAVI').reduce(ee.Reducer.mean()).rename('SAVI_med');
 var savi_stDev = collection_merge.select('SAVI').reduce(ee.Reducer.stdDev()).rename('SAVI_stdDev');
 var savi_max = collection_merge.select('SAVI').reduce(ee.Reducer.max()).rename('SAVI_max');
 var savi_min = collection_merge.select('SAVI').reduce(ee.Reducer.min()).rename('SAVI_min');
 var savi_per_90 = collection_merge.select('SAVI').reduce(ee.Reducer.percentile([90])).rename('SAVI_per_10');
///////////////////////////////MASCARAS///////////////////////////////////////////////////////
var mndwiMasked = mndwi_max.updateMask(mndwi_max.gte(0.5));
var mndwiViz = {min:0, max: 1, palette: ['00FFFF', '#0b4a8b']};
Map.addLayer(mndwiMasked.clip(area_de_estudo), mndwiViz, 'MNDWI masked' .concat(year),0);
// calcular área. deve tentar calcular 'umidade' onde a área é multiplicada pelo valor ndwi
var total = mndwiMasked.select('MNDWI_max').gte(0.5).multiply(ee.Image.pixelArea()).divide(1000000);
var Area = total.reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry:area_de_estudo,
  scale:30,
  maxPixels: 1e13,
  bestEffort:true
});
var Area_pxa = ee.Number(Area)
//print (Area_pxa,'Area Inundada MNDWI em km²:',year);
// calcular área. deve tentar calcular 'umidade' onde a área é multiplicada pelo valor .ndwi
var totall = mndwi_max.select('MNDWI_max').gte(0.5).multiply(ee.Image.pixelArea()).divide(1000000);
var Areaa = totall.reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry:area_de_estudo,
  scale:30,
  maxPixels: 1e13,
  bestEffort:true
});
var Area_pxaa = ee.Number(Areaa)
//print (Area_pxaa,'Area Total MNDWI em km²:', year);
// definindo lista para a array
var list = ee.List(Area);
var areas = ee.Array(Area.get('MNDWI_max'))
var Names = ee.List(['MNDWI'])
totalAreas=totalAreas.add(areas)
//////////////////////////////////////EXPORTAR IMAGENS/////////////////////////////////////////////////
Export.image.toDrive({
  image: mndwiMasked.clip(area_de_estudo),
  description: 'MNDWI_MAX_'.concat(year),
  folder: 'ARTIGO_DISCIPLINA',
  scale: 30,
  region: area_de_estudo
});
return year;
}
var chart = ui.Chart.array.values({
    array: totalAreas,
    axis: 0,
    xLabels: years,
    })
    .setSeriesNames(Names)
    .setOptions({
      title: 'Área em Km²',
      hAxis: {title: 'Intervalo de tempo', format: '####'},
      vAxis: {title: 'Area Km²', format: 'decimal'},
      legend:  Names,
      interpolateNulls: true,
      lineWidth: 1,
      pointSize: 3,
      series: {
      0: { color: '#0b4a8b'}}//água
      })
      .setChartType('ColumnChart');
/* Add the chart to the map.
chart.style().set({
  position: 'bottom-left',
  width: '500px',
  height: '300px'
});
//Map.add(chart);*/
/******************************************FIM CÓDIGO****************************************************/
/*****************************************CRIANDO PAINEL PARA OS GRÁFICOS***************************************/
var panel = ui.Panel();
panel.style().set('width', '380px');
var intro = ui.Panel([
ui.Label({
    value: 'Estimativa de áreas inundáveis',
    style: {fontSize: '20px', fontWeight: 'bold'}}),
ui.Label('Neste painel são apresentados os gráficos dos índices NDVI, EVI,'+ 
'LSWI, NDWI e MNDWI na Bacia Hidrógrafica do rio Gravataí, localizada no Estado do Rio Grande do Sul, Brasil.'),
ui.Label('Para fazer o download das informações que constam nos gráficos, basta maximizar a figura e selecionar a opção Download .CSV'),
ui.Label('Além dos gráficos, é disponibilizado um gif com as áreas inundáveis estimadas e também os layers da série MNDWI.'),
ui.Label('Autor: Christhian Santana Cunha - christhianscunha@gmail.com'),
//  ui.Label('O códigoser solicitado por email ou via Linkedin ao autor.')
]);
panel.add(intro);
/******************************** FUNÇÃO PARA INSERIR GRÁFICO DE SÉRIES POR REGIÃO ******************************/  
panel.widgets().set(2, ndvichart)
panel.widgets().set(3, evichart)
panel.widgets().set(4, lswichart)
panel.widgets().set(5, ndwichart)
panel.widgets().set(6, mndwichart)
panel.widgets().set(7, chart_regions_stdDev);
panel.widgets().set(8, chart)
panel.widgets().set(9, ui.Thumbnail(rgbVis, gifParams))
ui.root.insert(0, panel);
/********************************************GRÁFICO EVAPOTRANSPIRAÇÃO*******************************************/