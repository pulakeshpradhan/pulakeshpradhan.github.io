var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -47.034076679502704,
                -14.564899385753783
              ],
              [
                -47.034076679502704,
                -21.08698887284312
              ],
              [
                -45.100482929502704,
                -21.08698887284312
              ],
              [
                -45.100482929502704,
                -14.564899385753783
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#000000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || 
    /* color: #000000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-47.034076679502704, -14.564899385753783],
          [-47.034076679502704, -21.08698887284312],
          [-45.100482929502704, -21.08698887284312],
          [-45.100482929502704, -14.564899385753783]]], null, false);
/*************************************************Curso de Gooogle Earth Engine*****************************************
    Autor: Christhian Santana Cunha
    Bacharel em Gestão Ambiental - UNIPAMPA (2012)
    Mestre em Engenharia Civil, Recursos Hídricos - UFSM (2014)
    Doutorando Sensoriamento Remoto -UFGRS
  / Dados de precipitação e evapotranspiração
    O objetivo desta Unidade é permitir o usuário consiga:
    1) Delimitar uma área de interesse por meio de uma geometria/ponto
    2) Importar uma coleção de imagens, aplicar filtros, remover núvens e extrair uma imagem de uma ano qualquer
    3) Construir funções 
    4) Construir gráficos 
**********************************************************************************************************************/
/********************************************DEFINIÇÃO DAS VARIÁVEIS***************************************************/
/*********DEFINIÇÃO DO INTERVALO DE TEMPO PARA ANALISE - ANO X E ANO X+1**********************************************/
var startyear = 1981;
var endyear = 2020;
/******************************* CRIAR LISTA DE MESES E ANOS PARA UTILIZAR NAS FUNÇÕES********************************/ 
var months = ee.List.sequence(1,12);
var startdate = ee.Date.fromYMD(startyear,1,1);
var enddate = ee.Date.fromYMD(endyear,12,1);
var years = ee.List.sequence(startyear,endyear);
/************************************DEFINIÇÃO DA ÁREA DE ESTUDO****************************************************/ 
var area_de_estudo = ee.FeatureCollection('users/christhianscunha/brasil_limites');
/********************************** GEOMETRIA PARA DOWNLOAD - CONFIG INICIAL ****************************************/
var drawingTools = Map.drawingTools(); //ferramentas de desenho
var layers = drawingTools.layers();//retorna a lista de camadas de geometria na ferramenta  de desenhos
drawingTools.setShown(false);//Define a visibilidade do seletor de formas e da lista de camadas de geometria
while (drawingTools.layers().length() > 0) {  //enquanto //comprimento
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer); //Retorna um dicionário com as chaves especificadas removidas.
}
var dummyGeometry = //geometria fictícia
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: 'black',shown: false});
drawingTools.layers().set(0,dummyGeometry);
function clearGeometry() { //limpar geometria
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() { //Desenhar forma
  clearGeometry();
  drawingTools.setShape('rectangle'); //definir forma
  drawingTools.draw(); //desenhar
}
//Registra um retorno de chamada que é disparado quando uma forma é desenhada.
drawingTools.onDraw(ui.util.debounce(PREP_ET_AREA_SELECIONADA, 1000)); 
//Registra um retorno de chamada que é disparado quando uma forma é editada.
drawingTools.onEdit(ui.util.debounce(PREP_ET_AREA_SELECIONADA, 1000));  
//ui.util.debounce - permitir que ela seja chamada, no máximo, uma vez para cada sequência de chamadas disparadas repetidamente,
//desde que sejam disparadas com menos de um intervalo especificado
/************************************Criando um painel*********************************************/
var panel = ui.Panel();
panel.style().set('width', '380px');
/*************************************Ferramenta de seleção e gráfico******************************/
var symbol = {
  rectangle: '⬛',
};
var AREA_GRAFICO =  ui.Panel({
    layout:ui.Panel.Layout.flow("vertical"), 
    style: {position: 'middle-left',margin: 'auto', width: '100%'},
    widgets:[ui.Label({
      value:'Selecione uma área específica para visualizar o gráfico da série temporal das imagens no painel.'+
      'Dados de Precipitação da coleção CHIRPS Daily: Climate Hazards Group InfraRed Precipitation with Station Data (version 2.0 final).'+
      'Dados de Evapotranspiração da coleção TerraClimate: Monthly Climate and Climatic Water Balance for Global Terrestrial Surfaces, University of Idaho.',
      style:{fontSize: '16px',}
      }), ui.Button({ //Um botão clicável com um rótulo de texto.
      label: symbol.rectangle + ' Selecione a Área',
      onClick: drawRectangle,
      style: {stretch: 'horizontal',
         textAlign: 'center',
      }})
    ]}
  );  
panel.widgets().set(1, AREA_GRAFICO) //Retorna a lista de widgets atualmente no painel
//set Define o valor de uma determinada propriedade.
var PAINEL_GRAFICO_PREP_ET =  ui.Panel({
    layout:ui.Panel.Layout.flow("vertical"), 
    widgets:[
    ]}
  ); 
panel.widgets().set(2,PAINEL_GRAFICO_PREP_ET) 
var PAINEL_GRAFICO_PET =  ui.Panel({
    layout:ui.Panel.Layout.flow("vertical"), 
    widgets:[
    ]}
  ); 
panel.widgets().set(3, PAINEL_GRAFICO_PET) 
/**************************COLEÇÃO DE IMAGEM PARA PRECIPITAÇÃO - SATÉLITE CHIRPS 1981 A 2020***********************/
var P = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY").select('precipitation')
        .filterDate(startdate, enddate)
        .sort('system:time_start', false)
        .filterBounds(area_de_estudo);
var allP = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var annual = P
        .filter(ee.Filter.calendarRange(year, year, 'year'))
        .sum()
        .clip(area_de_estudo)
        .rename('Precipitação');
    return annual
        .set('year', year)
        .set('system:time_start', ee.Date.fromYMD(year, 1, 1));
}));
/*************************************TerraClima 1985 a 2019********************************************************/
var ET = ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE").select("aet")
        .filterDate(startdate, enddate)
        .sort('system:time_start', false)
        .filterBounds(area_de_estudo);
var allET = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var annual = ET
        .filter(ee.Filter.calendarRange(year, year, 'year'))
        .sum()
        .multiply(0.1)
        .clip(area_de_estudo)
        .rename('ET');
    return annual
        .set('year', year)
        .set('system:time_start', ee.Date.fromYMD(year, 1, 1));
}));
/******************************************PARÂMETROS DE VISUALIZAÇÃO******************************************************/
var VisET = {opacity:1,bands:['ET'],min:300,max:1500,palette:['ff0202','ffb13d','e8ff2b','8cff66','7cf3ff','47a1ff','2d64ff','0400ff']};
var VisP = {opacity:1,bands:["Precipitação"],min:100,max:3500,palette:['ff0202','ffb13d','e8ff2b','8cff66','7cf3ff','47a1ff','2d64ff','0400ff']};
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: area_de_estudo,
  color: 1,
  width: 1
});
/******************************************ADICIONANDO LAYERS*****************************************************/
Map.addLayer(allET,VisET, 'Evapotranspiração Terra Clima',1);
Map.addLayer(allP, VisP, 'Precipitação CHIRPS',1);
Map.addLayer(outline, {palette: '#000000'}, 'Brasil',1);
Map.centerObject(area_de_estudo,3)
/*******************************************GRÁFICO PRECIPITAÇÕES E EVAPOTRANSPIRAÇÃO***************************************************/
/*****************************************************FUNÇÃO JOIN**********************************************************************/
function PREP_ET_AREA_SELECIONADA() {
var aoi = drawingTools.layers().get(0).getEeObject();
drawingTools.setShape(null);
var byAnual_RAIN = ee.ImageCollection.fromImages(
      years.map(function (y) {
        return P.filter(ee.Filter.calendarRange(y, y, 'year'))
                    .sum()
                    .set('year', y)
                    .clip(aoi)
                    .rename('Precipitação')
}));
var terracliam_et = ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE")
.filterBounds(aoi)
.select('aet');
var byAnual_ET = ee.ImageCollection.fromImages(
      years.map(function (y) {
        return terracliam_et.filter(ee.Filter.calendarRange(y, y, 'year'))
                    .sum()
                    .multiply(0.1)
                    .set('year', y)
                    .clip(area_de_estudo)
                    .rename('ET')
}));
var innerJoin = ee.Join.inner();
var filterTimeEq = ee.Filter.equals({
  leftField: 'year',
  rightField: 'year'
});
var innerJoinedclima = innerJoin.apply(byAnual_RAIN, byAnual_ET, filterTimeEq);
var joined_clima = innerJoinedclima.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
});
var PET = ee.ImageCollection(joined_clima);
/***********************************************GRÁFICO***************************************************************************/
var chart = ui.Chart.image.series(PET.select(['Precipitação', 'ET'])
    , aoi, ee.Reducer.mean(), 2500, 'year')
    .setChartType('ComboChart')
    .setSeriesNames(['Evapotranspiração', 'Pluviosidade Acumulada'])
    .setOptions({
      title: 'Dinâmica entre precipitação e evapotranspiração',
      seriesType: "bars",
      series: {
       1: {targetAxisIndex: 1, 
          color: 'blue'},
       0: {
           targetAxisIndex: 0,
           type: 'line',
           color: 'red'}},
      vAxes: {
        0: {title: 'Evapontraspiração (mm/ano)'},
        1: {title: 'Pluviosidade (mm/ano)', seriesType: 'bars'},
        },
      hAxes: {
        0: {
          title: 'Dinâmica entre precipitação e evapotranspiração', 
                        }
                },
      lineWidth: 1,
      pointSize: 1,
      bar: {groupWidth: '100%'}
      });
PAINEL_GRAFICO_PREP_ET.widgets().reset([chart])
// combine the two datasets
var myCollection = allP.combine(allET);
print(myCollection)
// calculate the effective rainfall
myCollection = myCollection.map(function(img){
  var myimg = img.expression("(p - et) ",
  {
    p: img.select("Precipitação"),
    et: img.select("ET"),
    });
  return img.addBands(myimg.rename('Excedente'));
})
// setup the chart
var chart_PET = ui.Chart.image.seriesByRegion(myCollection, aoi, ee.Reducer.mean(), 'Excedente', 2500, 'system:time_start', 'year')
     .setSeriesNames(['Excedente'])
     .setOptions({
        title: 'Precipitação - Evapotranspiração na região selecionada',
        vAxis: {title: 'P - ETr (mm/ano)'},
        hAxis: {title: 'Período', gridlines: {count: 7}},
      })
    .setChartType('ColumnChart');
PAINEL_GRAFICO_PET.widgets().reset([chart_PET])
}
/*********************************************FIM DO PAINEL**************************************************************/
ui.root.insert(0, panel)