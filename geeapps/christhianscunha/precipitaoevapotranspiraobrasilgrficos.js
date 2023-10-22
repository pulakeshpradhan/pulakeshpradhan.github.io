var brasil = ui.import && ui.import("brasil", "table", {
      "id": "users/christhianscunha/brasil_limites"
    }) || ee.FeatureCollection("users/christhianscunha/brasil_limites"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -54.416889179502704,
                -1.8919719002881559
              ],
              [
                -54.416889179502704,
                -8.887707035222975
              ],
              [
                -47.209857929502704,
                -8.887707035222975
              ],
              [
                -47.209857929502704,
                -1.8919719002881559
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
        [[[-54.416889179502704, -1.8919719002881559],
          [-54.416889179502704, -8.887707035222975],
          [-47.209857929502704, -8.887707035222975],
          [-47.209857929502704, -1.8919719002881559]]], null, false);
/*************************************************Curso de Gooogle Earth Engine*****************************************
    Autor: Christhian Santana Cunha
    Bacharel em Gestão Ambiental - UNIPAMPA (2012)
    Mestre em Engenharia Civil, Recursos Hídricos - UFSM (2014)
    Doutorando Sensoriamento Remoto -UFGRS
    Unidade 2 - Uso de diferentes coleções para compor um balanço hídrico
    O objetivo desta Unidade é permitir que o aluno consiga:
    1) Delimitar uma área de interesse por meio de uma geometria/ponto
    2) Importar uma coleção de imagens, aplicar filtros, remover núvens e extrair uma imagem de uma ano qualquer
    3) Construir funções 
    4) Construir gráficos 
    5) Exportar imagens 
    6) Criar Legenda
    7 Construir um APP
 * *********************************************************************************************************************/
/********************************************DEFINIÇÃO DAS VARIÁVEIS***************************************************/
/*********DEFINIÇÃO DO INTERVALO DE TEMPO PARA ANALISE - ANO X E ANO X+1**********************************************/
var startyear = 2001;
var endyear = 2020;
/******************************* CRIAR LISTA DE MESES E ANOS PARA UTILIZAR NAS FUNÇÕES********************************/ 
var months = ee.List.sequence(1,12);
var startdate = ee.Date.fromYMD(startyear,1,1);
var enddate = ee.Date.fromYMD(endyear,12,1);
var years = ee.List.sequence(startyear,endyear);
/************************************DEFINIÇÃO DA ÁREA DE ESTUDO****************************************************/ 
var area_de_estudo = ee.FeatureCollection('users/christhianscunha/brasil_limites');
/********************************** GEOMETRIA PARA DOWNLOAD - CONFIG INICIAL ****************************************/
var drawingTools = Map.drawingTools();
var layers = drawingTools.layers();
drawingTools.setShown(true);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: 'black',shown: false});
drawingTools.layers().set(0,dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
drawingTools.onDraw(ui.util.debounce(SCATTER_PLOT_AREA_SELECIONADA, 1000));
drawingTools.onEdit(ui.util.debounce(SCATTER_PLOT_AREA_SELECIONADA, 1000));
drawingTools.onDraw(ui.util.debounce(PREP_ET_AREA_SELECIONADA, 1000));
drawingTools.onEdit(ui.util.debounce(PREP_ET_AREA_SELECIONADA, 1000));
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
        .clip(area_de_estudo);
    return annual
        .set('year', year)
        .set('system:time_start', ee.Date.fromYMD(year, 1, 1));
}));
/*************************************MODIS16 2001 a 2020********************************************************/
var ET = ee.ImageCollection("MODIS/006/MOD16A2").select("ET")
        .filterDate(startdate, enddate)
        .sort('system:time_start', false)
        .filterBounds(area_de_estudo);
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
/******************************************PARÂMETROS DE VISUALIZAÇÃO******************************************************/
var VisET = {opacity:1,bands:['ET'],min:300,max:2000,palette:['ff0202','ffb13d','e8ff2b','8cff66','7cf3ff','47a1ff','2d64ff','0400ff']};
var VisP = {opacity:1,bands:["precipitation"],min:100,max:3500,palette:['ff0202','ffb13d','e8ff2b','8cff66','7cf3ff','47a1ff','2d64ff','0400ff']};
var empty = ee.Image().byte();
var outline = empty.paint({
  featureCollection: area_de_estudo,
  color: 1,
  width: 1
});
/******************************************ADICIONANDO LAYERS*****************************************************/
Map.addLayer(allET,VisET, 'Evapotranspiração MOD16',1);
Map.addLayer(allP, VisP, 'Precipitação CHIRPS',1);
Map.addLayer(outline, {palette: '#000000'}, 'Brasil',1);
Map.centerObject(area_de_estudo,3)
/*****************************************CRIANDO PAINEL PARA OS GRÁFICOS***************************************/
var panel = ui.Panel();
panel.style().set('width', '380px');
var intro = ui.Panel([
ui.Label({
    value: 'Gráficos Séries Temporais- Versão 1.1',
    style: {fontSize: '20px', fontWeight: 'bold'}}),
ui.Label('Neste painel são apresentados os gráficos das séries de precipitação e evapotranspiração anual a partir de 2001 até 2020. Foram utlizadas as coleções Terra Net Evapotranspiration 8-Day Global 500m e'+ 
  'CHIRPS Daily: Climate Hazards Group InfraRed Precipitation with Station Data (version 2.0 final).'+
  'Além disso, está disponível um gráfico Scatterplot para representar a associação entre pares de dados de Precipitação e Evapotranspiração.'),
ui.Label('Para fazer o download das informações que constam nos gráficos, basta maximizar a figura e selecionar a opção Download .CSV'),
ui.Label('Autor: Christhian Santana Cunha - Gestor Ambiental, Msc Recursos Hídricos.'),
  ui.Label('Co-autor: Leonardo Laipelt - Engenheiro Ambiental.')
//  ui.Label('O códigoser solicitado por email ou via Linkedin ao autor.')
]);
panel.add(intro);
/*********************************************ADICIONANDO LOGO**********************************************/
var logo = ee.Image('users/christhianscunha/tese/logo_lagan');
	var thumb = ui.Thumbnail({
image: logo,
params:{bands:['b3','b2','b1'],min:0,max:255},
style: {height: '34px', width: '120px',padding :'0'}
});
panel.widgets().set(1, thumb);
var logo_ufrgs = ee.Image('users/christhianscunha/tese/logo_ufgrs').visualize({
    bands:  ['b3', 'b2', 'b1'],
    min: 0,
    max: 255
    });
var thumb_ufrgs = ui.Thumbnail({
    image: logo_ufrgs,
    params: {
        dimensions: '100x100',
        format: 'png'
        },
    style: {height: '100px', width: '100px',padding :'5px' , position: 'middle-left'}
    });
panel.widgets().set(2, thumb_ufrgs);
/******************************** FUNÇÃO PARA INSERIR GRÁFICO DE SÉRIES POR REGIÃO ******************************/  
var titleP = {
  title: 'Precipitação acumulada',
  hAxis: {title: 'Intervalo de tempo'},
  vAxis: {title: 'P (mm)'},
};
var chartP = ui.Chart.image.seriesByRegion(allP, area_de_estudo, ee.Reducer.mean(),
'precipitation', 1000, 'system:time_start', 'ESTADO')
    .setOptions(titleP)
    .setChartType('LineChart');  
panel.widgets().set(3, chartP);
/********************************************GRÁFICO EVAPOTRANSPIRAÇÃO*******************************************/
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
seriesProperty: 'ESTADO'
}).setOptions(titleET)
.setChartType('LineChart');
panel.widgets().set(4, chartMonthlyET); 
/********************************FUNCAO PARA SELECIONAR UMA AREA DE INTERESSE E GERAR GRAFICO********************/
var symbol = {
  rectangle: '⬛',
};
var AREA_DOWNLOAD_GRAFICO =  ui.Panel({
    layout:ui.Panel.Layout.flow("vertical"), 
    style: {position: 'top-center',margin: 'auto', width: '100%'},
    widgets:[ui.Label({
      value:'Selecione uma área específica para visualizar a análise gráfica e reailzar o download das imagens:',
      style:{fontSize: '16px',}
      }), ui.Button({
      label: symbol.rectangle + ' Área Selecionada',
      onClick: drawRectangle,
      style: {stretch: 'horizontal',
         textAlign: 'center',
      }})
    ]}
  );  
panel.widgets().set(5, AREA_DOWNLOAD_GRAFICO)
var PAINEL_GRAFICO_SCATTERPLOT =  ui.Panel({
    layout:ui.Panel.Layout.flow("vertical"), 
    widgets:[
    ]}
  );
var PAINEL_GRAFICO_PREP_ET =  ui.Panel({
    layout:ui.Panel.Layout.flow("vertical"), 
    widgets:[
    ]}
  ); 
panel.add(PAINEL_GRAFICO_SCATTERPLOT)
panel.add(PAINEL_GRAFICO_PREP_ET)
/******************************************GRÁFICO SCATTERPLOT***********************************************/
function SCATTER_PLOT_AREA_SELECIONADA() {
  //Link_download_MOD16.style().set({shown:false})
var Imagens = allP.mean().addBands(allET.mean());
//
var aoi = drawingTools.layers().get(0).getEeObject();
drawingTools.setShape(null);
var Amostras = Imagens.sample({ region: aoi, scale: 1000, numPixels: 2000,geometries :true}) 
//Map.addLayer(Amostras,{'color':'red'},'Amostras aleatórias',0)
var Grafico_scatter_plot = ui.Chart.feature.byFeature(Amostras, 'precipitation', 'ET')
.setChartType('ScatterChart')
.setOptions({ pointSize: 2,
title: 'Scatterplot Precipitação x Evapotranspiração ',
 // pointColor: 'red',
width: 500,
height: 500, titleX: 'Precipitação', titleY: 'Evapotranspiração' })
PAINEL_GRAFICO_SCATTERPLOT.widgets().reset([Grafico_scatter_plot])
}
/*******************************************GRÁFICO PRECIPITAÇÕES E EVAPOTRANSPIRAÇÃO***************************************************/
/*****************************************************FUNÇÃO JOIN**********************************************************************/
function PREP_ET_AREA_SELECIONADA() {
var aoi = drawingTools.layers().get(0).getEeObject();
drawingTools.setShape(null);
var byMonth_RAIN = ee.ImageCollection.fromImages(
      years.map(function (y) {
        return P.filter(ee.Filter.calendarRange(y, y, 'year'))
                    .sum()
                    .set('year', y)
                    .clip(aoi)
                    .rename('Precipitação')
}));
var modis = ee.ImageCollection("MODIS/006/MOD16A2")
.filterBounds(aoi)
.select('ET');
var byMonth_ET = ee.ImageCollection.fromImages(
      years.map(function (y) {
        return modis.filter(ee.Filter.calendarRange(y, y, 'year'))
                    .sum()
                    .multiply(0.1)
                    .set('year', y)
                    .clip(area_de_estudo)
}));
var innerJoin = ee.Join.inner();
var filterTimeEq = ee.Filter.equals({
  leftField: 'year',
  rightField: 'year'
});
var innerJoinedclima = innerJoin.apply(byMonth_RAIN, byMonth_ET, filterTimeEq);
var joined_clima = innerJoinedclima.map(function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
});
var modis1 = ee.ImageCollection(joined_clima);
/***********************************************GRÁFICO***************************************************************************/
var chart = ui.Chart.image.series(modis1.select(['Precipitação', 'ET'])
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
panel.widgets().set(7, chart)}
/************************************************BUTTON DONWLOAD**********************************************************************/
var Download_Panel= ui.Panel({
  layout:ui.Panel.Layout.flow("vertical"), 
    style: {position: 'top-center',margin: 'auto', width: '100%'},
    widgets:[ui.Label('Baixar produto CHIRPS e MOD16')]
})
/************************************************PRECIPITAÇÃO************************************************************************/
var year_image_CHIRPS=ui.Textbox({ 
 value: '2001', 
 style: { color: "#000000"}}); 
var Link_download_CHIRPS=ui.Label({ 
 value: 'Download', 
 style: { color: "#000000",shown:false}}); 
var select_year_CHIRPS = ui.Select({
   items: ['2001','2002','2003','2004','2005','2006','2007','2008','2009','2010',
   '2011','2012','2013','2014','2015','2016','2017','2018','2019','2020'
   ],
   placeholder: '2001',
   onChange:function(year_value) {
   Link_download_CHIRPS.style().set({shown:false})
   year_image_CHIRPS.setValue(year_value)
}})
var button = ui.Button({
  label: 'Download CHIRPS',
  onClick: function() {
 var aoi = drawingTools.layers().get(0).getEeObject();
var link = allP.filter(ee.Filter.eq("year", parseFloat(year_image_CHIRPS.getValue()))).first().clip(aoi).getDownloadURL({
  name: 'CHIRPS_'+year_image_CHIRPS.getValue(),
  scale: 2500,
  region: aoi
});
  Link_download_CHIRPS.setUrl(link)
  Link_download_CHIRPS.style().set({shown:true})
}
});
var Panel_Button_CHIRPS = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style:{
    color: "#000000", 
    margin: '2px 10px'},//border: '0.5px solid #000000' 
  widgets:[select_year_CHIRPS,button,Link_download_CHIRPS]
})
Download_Panel.add(Panel_Button_CHIRPS);
//var Panel_Button_CHIRPS = ui.Panel({
//  layout: ui.Panel.Layout.flow('horizontal'),
 // style:{
 //   color: "#000000", 
 //   margin: '2px 10px'},//border: '0.5px solid #000000' 
//  widgets:[select_year_CHIRPS,button]
//})
//panel.widgets().set(5, Panel_Button_CHIRPS);
/***************************************************EVAPOTRASNPIRAÇÃO******************************************************/
var year_image_MOD16=ui.Textbox({ 
 value: '2001', 
 style: { color: "#000000"}}); 
var Link_download_MOD16=ui.Label({ 
 value: 'Download', 
 style: { color: "#000000",shown:false}}); 
var select_year_MOD16 = ui.Select({
   items: ['2001','2002','2003','2004','2005','2006','2007','2008','2009','2010',
   '2011','2012','2013','2014','2015','2016','2017','2018','2019','2020'
   ],
   placeholder: '2001',
  onChange:function(year_value) {
   Link_download_MOD16.style().set({shown:false})
   year_image_MOD16.setValue(year_value)
}})
var button = ui.Button({
  label: 'Download ET',
  onClick: function() {
  var aoi = drawingTools.layers().get(0).getEeObject();
var link = allET.filter(ee.Filter.eq("year", parseFloat(year_image_MOD16.getValue()))).first().clip(aoi).getDownloadURL({
  name: 'ET_'+year_image_MOD16.getValue(),
  scale: 500,
  region: aoi
});
  Link_download_MOD16.setUrl(link)
  Link_download_MOD16.style().set({shown:true})
}
});
var Panel_Button_MOD16 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style:{
    color: "#000000", 
    margin: '2px 10px'},//border: '0.5px solid #000000' 
  widgets:[select_year_MOD16,button,Link_download_MOD16]
})
Download_Panel.add(Panel_Button_MOD16);
panel.add(Download_Panel)
/*********************************************FIM DO PAINEL**************************************************************/
ui.root.insert(0, panel);
/*********************************************ADICIONAR WIDGET**********************************************************/
var pViz_month = {
  min: 100, 
  max: 3500, 
  palette: 'ff0202,ffb13d,e8ff2b,8cff66,7cf3ff,47a1ff,2d64ff,0400ff'
};
/*******************************************ADICIONAR LEGENDAS*********************************************************/
function makeLegend(vis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
/********************************ADICIONAR PAINEL DE LEGENDA E ADICIONAR LEGENDA AO MAPA***************************/
var thumb_precipitation = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,5', dimensions:'156x10'}, 
    style: {padding: '0.5px', position: 'bottom-left'}
  });
var panel_precipitation = ui.Panel({
    widgets: [
      ui.Label(String(vis['min'])), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label(vis['max']),
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal'}
  });
var panellegend_precipitation = ui.Label({
  value: 'Precipitação (mm/ano)',
  style: {
    fontWeight: 'bold',
    fontSize: '9px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
  return ui.Panel().add(panel_precipitation).add(thumb_precipitation).add(panellegend_precipitation);
}
Map.add(makeLegend(pViz_month));
///////////////////////////ADICIONAR WIDGET///////////////////////////////////
var ETViz_month = {
  min: 300, 
  max: 2000, 
  palette: 'ff0202,ffb13d,e8ff2b,8cff66,7cf3ff,47a1ff,2d64ff,0400ff'
};
// ADICIONAR LEGENDAS
function makeLegendET(vis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
// ADICIONAR PAINEL DE LEGENDA E ADICIONAR LEGENDA AO MAPA
  var thumb_ET = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,5', dimensions:'156x10'}, 
    style: {padding: '0.5px', position: 'middle-left'}
  });
  var panel_ET = ui.Panel({
    widgets: [
      ui.Label(String(vis['min'])), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label(vis['max']),
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal'}
  });
// Create and add the legend title.
var panellegend_ET = ui.Label({
  value: 'Evapotranspiração (mm/ano)',
  style: {
    fontWeight: 'bold',
    fontSize: '9px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
  return ui.Panel().add(panel_ET).add(thumb_ET).add(panellegend_ET);
}
Map.add(makeLegendET(ETViz_month));
/******************************************************FIM DAS LEGENDAS***************************************************************/