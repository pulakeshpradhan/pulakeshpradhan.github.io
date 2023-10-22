var mozambique = ui.import && ui.import("mozambique", "table", {
      "id": "users/christhianscunha/Mozambique_provinces"
    }) || ee.FeatureCollection("users/christhianscunha/Mozambique_provinces"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                29.076087587904883,
                -9.625140240068973
              ],
              [
                29.076087587904883,
                -27.257087589472214
              ],
              [
                41.24893915040488,
                -27.257087589472214
              ],
              [
                41.24893915040488,
                -9.625140240068973
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
        [[[29.076087587904883, -9.625140240068973],
          [29.076087587904883, -27.257087589472214],
          [41.24893915040488, -27.257087589472214],
          [41.24893915040488, -9.625140240068973]]], null, false);
//Curso de Gooogle Earth Engine
//2021-30-01
//Autor: Christhian Santana Cunha
//Bacharel em Gestão Ambiental - UNIPAMPA (2012)
//Mestre em Engenharia Civil, Recursos Hídricos - UFSM (2014)
//Doutorando Sensoriamento Remoto -UFGRS
//Unidade 2 - Uso de diferentes coleções para compor um balanço hídrico
// O objetivo desta Unidade é permitir que o aluno consiga:
// 1) Delimitar uma área de interesse por meio de uma geometria/ponto
// 2) Importar uma coleção de imagens, aplicar filtros, remover núvens e extrair uma imagem de uma ano qualquer
// 3) Construir funções 
// 4) Construir gráficos 
// 5) Exportar imagens 
// 6) Criar Legenda
// 6 Construir um APP
/////////////////////////////////////////////////DEFINIÇÃO DAS VARIÁVEIS////////////////////////////////////////
//DEFINIÇÃO DO INTERVALO DE TEMPO PARA ANALISE - ANO X E ANO X+1
var startyear = 2010;
var endyear = 2020;
// CRIAR LISTA DE MESES PARA UTILIZAR NAS FUNÇÕES 
var months = ee.List.sequence(1,12);
// DEFINIR INÍCIO E FIM 
var startdate = ee.Date.fromYMD(startyear,1,1);
var enddate = ee.Date.fromYMD(endyear,12,1);
// CRIAR LISTA PARA VARIÁVEL YEARS
var years = ee.List.sequence(startyear,endyear);
// DEFINIÇÃO DA ÁREA DE ESTUDO 
var area_de_estudo = ee.FeatureCollection('users/christhianscunha/Mozambique_provinces');
////////////////////////////COLEÇÃO DE IMAGEM PARA PRECIPITAÇÃO - SATÉLITE CHIRPS////// 1981 A 2020.....
var P = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY").select('precipitation')
        .filterDate(startdate, enddate)
        .sort('system:time_start', false)
        .filterBounds(area_de_estudo);
// CALCULO DA PRECIPITAÇÃO MENSAL 
var allP = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var annual = P
        .filter(ee.Filter.calendarRange(year, year, 'year'))
        .sum()
        .clip(area_de_estudo);
    return annual
        .set('year', year)
        .set('system:time_start', ee.Date.fromYMD(year, 1, 1));
})); /// EMPILHAR COLEÇÕES 
//////////////////////////////////////////MODIS16////////////////////////////////////////////
// SELECAÇÃO DA IMAGEM MODIS E BANDA ET
var ET = ee.ImageCollection("MODIS/006/MOD16A2").select("ET")
       // .filterDate(startdate, enddate)
        //.sort('system:time_start', false)
        .filterBounds(area_de_estudo);
//////CALCULO DA ET MENSAL
var allET = ee.ImageCollection.fromImages(
  years.map(function (year) {
    var annual = ET
        .filter(ee.Filter.calendarRange(year, year, 'year'))
        .sum()
        .multiply(0.1)
        .clip(area_de_estudo);
    return annual
        .set('year', year)
        .set('system:time_start', ee.Date.fromYMD(year, 1, 1));
}));
////////////////////////////////////////ADICIONANDO LAYERS//////////////////////////////////////
var VisET = {opacity:1,bands:['ET'],min:100,max:1550,palette:["000096","0064ff","00b4ff","33db80","9beb4a","ffeb00","ffb300","ff6400","eb1e00","af0000"]};
var VisP = {opacity:1,bands:["precipitation"],min:100,max:1600,palette:["000096","0064ff","00b4ff","33db80","9beb4a","ffeb00","ffb300","ff6400","eb1e00","af0000"]};
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: area_de_estudo,
  color: 1,
  width: 1
});
Map.addLayer(allET,VisET, 'Evapotranspiração MOD16',1);
Map.addLayer(allP, VisP, 'Precipitação CHIRPS',1);
Map.addLayer(outline, {palette: '#000000'}, 'Mozambique',1);
Map.centerObject(area_de_estudo,6)
///////////////////////////////CRIANDO PAINEL PARA OS GRÁFICOS///////////////////////////.
var panel = ui.Panel();
panel.style().set('width', '380px');
// Crie um painel de introdução com etiquetas.
var intro = ui.Panel([
  ui.Label({
    value: 'Gráficos Séries Temporais',
    style: {fontSize: '20px', fontWeight: 'bold'} 
  }),
  ui.Label('Neste painel são apresentados os gráficos das séries de precipitação e evapotranspiração anual a partir de 2010 até 2020. Foram utlizadas as coleções Terra Net Evapotranspiration 8-Day Global 500m e'+ 
  'CHIRPS Daily: Climate Hazards Group InfraRed Precipitation with Station Data (version 2.0 final).'+
  'Além disso, está disponível um gráfico Scatterplot para representar a associação entre pares de dados de Precipitação e Evapotranspiração.'),
  ui.Label('Para fazer o download das informações que constam nos gráficos, basta maximizar a figura e selecionar a opção Download .CSV'),
  ui.Label('Autor: Christhian Santana Cunha - christhianscunha@gmail.com'),
//  ui.Label('O códigoser solicitado por email ou via Linkedin ao autor.')
]);
panel.add(intro);
/*
var logo = ee.Image('users/christhianscunha/logo').visualize({
bands:  ['b1', 'b2', 'b3'],
min: 0,
 max: 255
});
	var thumb = ui.Thumbnail({
image: logo,
params: {
dimensions: '480x480',
format: 'png'
 },
style: {height: '77px', width: '300px',padding :'0'}
});
	panel.widgets().set(1, thumb);
*/
////////////////// FUNÇÃO PARA INSERIR GRÁFICO DE SÉRIES POR REGIÃO /////////////////////  
var titleP = {
  title: 'Precipitação acumulada',
  hAxis: {title: 'Intervalo de tempo'},
  vAxis: {title: 'P (mm)'},
};
var chartP = ui.Chart.image.seriesByRegion(allP, area_de_estudo, ee.Reducer.mean(),
'precipitation', 1000, 'system:time_start', 'Provincia')
    .setOptions(titleP)
    .setChartType('LineChart');  
panel.widgets().set(2, chartP);
//////////////////////////GRÁFICO EVAPOTRANSPIRAÇÃO///////////////////////////////////////
var titleET = {
title: 'Evapotranspiração acumulada',
hAxis: {title: 'Intervalo de Tempo'},
vAxis: {title: 'ET (mm)'},
};
var chartMonthlyET = ui.Chart.image.seriesByRegion({
imageCollection: allET,
regions: area_de_estudo,
reducer: ee.Reducer.mean(),
band: 'ET',
scale: 500,
xProperty: 'system:time_start',
seriesProperty: 'Provincia' 
}).setOptions(titleET)
.setChartType('LineChart');
panel.widgets().set(3, chartMonthlyET); 
//Gráficos ScatterPlot
var Imagens = allP.mean().addBands(allET.mean());
var Amostras = Imagens.sample({ region: area_de_estudo, scale: 1000, numPixels: 2000,geometries :true}) 
Map.addLayer(Amostras,{'color':'red'},'Amostras aleatórias',0)
//Criando um scatter plot
var Grafico_scatter_plot = ui.Chart.feature.byFeature(Amostras, 'precipitation', 'ET')
  .setChartType('ScatterChart')
  .setOptions({ pointSize: 2,
  title: 'Scatterplot Precipitação x Evapotranspiração ',
 // pointColor: 'red',
  width: 500,
  height: 500, titleX: 'Precipitação', titleY: 'Evapotranspiração' }
  )
//print(Grafico_scatter_plot)
panel.widgets().set(4, Grafico_scatter_plot)
///////////////////////DOWNLOAD//////////////////////////////////
//DOWNLOAD DAS COLEÇÕES 
var button = ui.Button({
  label: 'Download CHIRPS',
  onClick: function() {
var list = allP.toList(30)
// DOWNLOAD IMAGENS 
for(var year=1; year < 20; year++)
{
var Name= ee.Image(list.get(year)).get('system:index').getInfo();
var img = ee.Image(list.get(year)).clip(geometry);
var link = img.getDownloadURL({
  name: 'Name',
  scale: 2500
});
print('Precipitação '.concat(year),link)
}
print(Map.getCenter());
}
});
panel.widgets().set(5, button);
//DOWNLOAD DAS COLEÇÕES 
var button = ui.Button({
  label: 'Download ET',
  onClick: function() {
var list = allET.toList(30)
// DOWNLOAD IMAGENS 
for(var year=1; year < 20; year++)
{
var Name= ee.Image(list.get(year)).get('system:index').getInfo();
var img = ee.Image(list.get(year)).clip(geometry);
var link = img.getDownloadURL({
  name: 'Name',
  scale: 2500
});
print('Evapotranspiração '.concat(year),link)
}
print(Map.getCenter());
}
});
panel.widgets().set(6, button);
Map.style().set('cursor', 'crosshair');
// ADICIONAR O PAINEL UI.ROOT
ui.root.insert(0, panel);
///////////////////////////ADICIONAR WIDGET///////////////////////////////////
var pViz_month = {
  min: 100, 
  max: 1600, 
  palette: '000096,0064ff,00b4ff,33db80,9beb4a,ffeb00,ffb300,ff6400,eb1e00,af0000'
};
// ADICIONAR LEGENDAS
function makeLegend(vis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
// ADICIONAR PAINEL DE LEGENDA E ADICIONAR LEGENDA AO MAPA
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,5', dimensions:'156x10'}, 
    style: {padding: '0.5px', position: 'bottom-left'}
  });
  var panel = ui.Panel({
    widgets: [
      ui.Label(String(vis['min'])), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label(vis['max']),
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal'}
  });
// Create and add the legend title.
var panellegend = ui.Label({
  value: 'Precipitação (mm/ano)',
  style: {
    fontWeight: 'bold',
    fontSize: '9px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
  return ui.Panel().add(panel).add(thumb).add(panellegend);
}
Map.add(makeLegend(pViz_month));
///////////////////////////ADICIONAR WIDGET///////////////////////////////////
var ETViz_month = {
  min: 100, 
  max: 1550, 
  palette: '000096,0064ff,00b4ff,33db80,9beb4a,ffeb00,ffb300,ff6400,eb1e00,af0000'
};
// ADICIONAR LEGENDAS
function makeLegendET(vis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
// ADICIONAR PAINEL DE LEGENDA E ADICIONAR LEGENDA AO MAPA
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,5', dimensions:'156x10'}, 
    style: {padding: '0.5px', position: 'middle-left'}
  });
  var panel = ui.Panel({
    widgets: [
      ui.Label(String(vis['min'])), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label(vis['max']),
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal'}
  });
// Create and add the legend title.
var panellegend = ui.Label({
  value: 'Evapotranspiração (mm/ano)',
  style: {
    fontWeight: 'bold',
    fontSize: '9px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
  return ui.Panel().add(panel).add(thumb).add(panellegend);
}
Map.add(makeLegendET(ETViz_month));