var table = ui.import && ui.import("table", "table", {
      "id": "users/luizcf14/COVID19/Casos_confirmados"
    }) || ee.FeatureCollection("users/luizcf14/COVID19/Casos_confirmados");
ui.root.clear()
var esquemaCores = {'red':'#e60000','gray':'#313131','black':'#000000','blue':'#477d4b','white':'#FFFFFF','yellow':'#fcca03'}
 // Dados
var totalCasos_descartados = 977
var totalCasos_em_analise = 60
var totalCasos_confirmados = 51
var totalCasos_obito = 1
//Tratamento Dado Entrada
var table_confirmados = table
  .filter(ee.Filter.notNull(['C_Confirm']))
  .reduceToImage({
    properties: ['C_Confirm'],
    reducer: ee.Reducer.first()
});
//Mapa
var map = require('users/jeffjeff20072/hackthon_modual:Mapp.js');
// // Add new themes
map.addThemes();
// Set your favorite theme
map.setBasemap('Dark');
var map = map.getWidget().setControlVisibility(false,false,true)
ui.root.clear()
var centerPoint = ee.Geometry.Point([-52.45275150688214,-3.731433957756451])
map.centerObject(table,5)
map.addLayer(table,{},'PA',false)
map.addLayer(table.draw(esquemaCores.gray, 1, 1),{},'PA',true)
map.addLayer(table_confirmados.mask(table_confirmados.gt(0)),{palette:['green','yellow','red','magenta'],min:0,max:40},'PA',true)
var panelChildren_Counties = ui.Panel([], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'100%', 
                                                              'height':'50%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'})
var panelChildren_Counties2 = ui.Panel([], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'100%', 
                                                              'height':'50%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'})                                                              
var panelChildren_Map_Graph = ui.Panel([], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'100%', 
                                                              'height':'40%',
                                                              'border':'1px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'})
var panelChildren_Map = ui.Panel([map], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'100%', 
                                                              'height':'60%',
                                                              'border':'1px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'2px'
})
var panelChildren_firstColumn_Descartados = ui.Label('Descartados', {
                                                              'width':'95%', 
                                                              'height':'33%',
                                                              'border':'0px solid black', 
                                                              'background-color': esquemaCores.gray,
                                                              'color':esquemaCores.white,
                                                              'textAlign':'center',
                                                              'fontSize':'15px',
                                                              'fontWeight':'bold',
                                                               'position':'top-center',
})
var panelChildren_firstColumn_DescartadosQTD = ui.Label(totalCasos_descartados, {
                                                              'width':'95%', 
                                                              'height':'33%',
                                                              'border':'0px solid black', 
                                                              'background-color': esquemaCores.gray,
                                                              'color':esquemaCores.white,
                                                              'textAlign':'center',
                                                              'fontSize':'50px',
                                                              'fontWeight':'bold',
                                                              'position':'top-center',
})
var panelChildren_firstColumn_EmAnalise = ui.Label('Em Análise', {
                                                              'width':'95%', 
                                                              'height':'33%',
                                                              'border':'0px solid black', 
                                                              'background-color': esquemaCores.gray,
                                                              'color':esquemaCores.blue,
                                                              'textAlign':'center',
                                                              'fontSize':'15px',
                                                              'fontWeight':'bold',
                                                              'position':'top-center',
})
var panelChildren_firstColumn_EmAnaliseQTD = ui.Label(totalCasos_em_analise, {
                                                              'width':'95%', 
                                                              'height':'33%',
                                                              'border':'0px solid black', 
                                                              'background-color': esquemaCores.gray,
                                                              'color':esquemaCores.blue,
                                                              'textAlign':'center',
                                                              'fontSize':'50px',
                                                              'fontWeight':'bold',
                                                              'position':'top-center',
})
var panelChildren_firstColumn_Confirmados = ui.Label('Casos Confirmados', {
                                                              'width':'95%', 
                                                              'height':'33%',
                                                              'border':'0px solid black', 
                                                              'background-color': esquemaCores.gray,
                                                              'color':esquemaCores.yellow,
                                                              'textAlign':'center',
                                                              'fontSize':'15px',
                                                              'fontWeight':'bold',
                                                              'position':'top-center',
})
var panelChildren_firstColumn_ConfirmadosQTD = ui.Label(totalCasos_confirmados, {
                                                              'width':'95%', 
                                                              'height':'33%',
                                                              'border':'0px solid black', 
                                                              'background-color': esquemaCores.gray,
                                                              'color':esquemaCores.yellow,
                                                              'textAlign':'center',
                                                              'fontSize':'50px',
                                                              'fontWeight':'bold',
                                                              'position':'top-center',
})
var panelChildren_firstColumn_Obito = ui.Label('Óbitos', {
                                                              'width':'95%', 
                                                              'height':'33%',
                                                              'border':'0px solid black', 
                                                              'background-color': esquemaCores.gray,
                                                              'color':esquemaCores.red,
                                                              'textAlign':'center',
                                                              'fontSize':'15px',
                                                              'fontWeight':'bold',
                                                              'position':'top-center',
})
var panelChildren_firstColumn_ObitoQTD = ui.Label(totalCasos_obito, {
                                                              'width':'95%', 
                                                              'height':'33%',
                                                              'border':'0px solid black', 
                                                              'background-color': esquemaCores.gray,
                                                              'color':esquemaCores.red,
                                                              'textAlign':'center',
                                                              'fontSize':'50px',
                                                              'fontWeight':'bold',
                                                              'position':'top-center',
})
var panelChildren_Confirmed_1 = ui.Panel([panelChildren_firstColumn_Descartados,panelChildren_firstColumn_DescartadosQTD], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'100%', 
                                                              'height':'25%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'
})
var panelChildren_Confirmed_2 = ui.Panel([panelChildren_firstColumn_EmAnalise,panelChildren_firstColumn_EmAnaliseQTD], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'100%', 
                                                              'height':'25%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'
})
var panelChildren_Confirmados = ui.Panel([panelChildren_firstColumn_Confirmados,panelChildren_firstColumn_ConfirmadosQTD], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'100%', 
                                                              'height':'25%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'
})
var panelChildren_Obito = ui.Panel([panelChildren_firstColumn_Obito,panelChildren_firstColumn_ObitoQTD], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'100%', 
                                                              'height':'25%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'
})
var panelChildren_firstColumn = ui.Panel([panelChildren_Confirmed_1,panelChildren_Confirmed_2,panelChildren_Confirmados, panelChildren_Obito], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'16%', 
                                                              'height':'100%',
                                                              'border':'2px solid black', 
                                                              'background-color':'green',
                                                               'padding':'0px'
})     
var panelChildren_SecondColumn = ui.Panel([panelChildren_Map,panelChildren_Map_Graph], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'64%', 
                                                              'height':'100%',
                                                              'border':'2px solid black', 
                                                              'background-color':'green',
                                                               'padding':'0px'
})      
var panelChildren_ThirdColumn = ui.Panel([panelChildren_Counties,panelChildren_Counties2], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'20%', 
                                                              'height':'100%',
                                                              'border':'2px solid black', 
                                                              'background-color':'green',
                                                              'padding':'0px',
                                                              'position':'top-left'
})       
var panelMaster = ui.Panel([panelChildren_firstColumn,panelChildren_SecondColumn,panelChildren_ThirdColumn], ui.Panel.Layout.flow('horizontal'), {
                                                              'width':'100%', 
                                                              'height':'94%',
                                                              'border':'0px solid black', 
                                                              'background-color':'black',
})
var verticalSpacing =  ui.Panel([], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'100%', 
                                                              'height':'0%',
                                                              'border':'2px solid black', 
                                                              'background-color':'black',
})
var panelMaster = ui.Panel([verticalSpacing,panelMaster], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'100%', 
                                                              'height':'100%',
                                                              'border':'2px solid black', 
                                                              'background-color':'black',
})
ui.root.add(panelMaster)
var dataTableCOVID = {
  cols: [{id: 'diaid', label: 'dia', type: 'string'},
         {id: 'confirmado', label: 'Confirmados', type: 'number'},
          {id: 'obitos', label: 'Óbitos', type: 'number'}],
  rows: [{c: [{v: '24/03'},{v:5},{v:0}]},
         {c: [{v: '25/03'},{v:7},{v:0}]},
         {c: [{v: '26/03'},{v:13},{v:0}]},
         {c: [{v: '27/03'},{v:16},{v:0}]},
         {c: [{v: '28/03'},{v:17},{v:0}]},
         {c: [{v: '29/03'},{v:19},{v:0}]},
         {c: [{v: '30/03'},{v:26},{v:0}]},
         {c: [{v: '31/03'},{v:34},{v:0}]},
         {c: [{v: '01/04'},{v:41},{v:1}]},
         {c: [{v: '02/04'},{v:49},{v:1}]},
         {c: [{v: '03/04'},{v:51},{v:1}]}]
};
var dataTableSexo={
  cols: [{id:'casos', type:'string'},
         {id:'fem', label:'Feminino', type:'number'},
         {id:'mas', label:'Masculino', type:'number'},
         ],
  rows:[{c: [{v: ''}, {v: 28}, {v: 0}]},
        {c: [{v: ''}, {v: 0}, {v: 23}]}]
}
var dataTableAge={
  cols: [{id:'idade', label:'Idade', type:'string'},
         {id:'casos', label:'Casos', type:'number'}],
  rows:[{c: [{v: 'De 0 a 9'} ,  {v: 1}]},
        {c: [{v: 'De 10 a 19'}, {v: 1}]},
        {c: [{v: 'De 20 a 29'}, {v: 11}]},
        {c: [{v: 'De 30 a 39'}, {v: 13}]},
        {c: [{v: 'De 40 a 49'}, {v: 11}]},
        {c: [{v: 'De 50 a 59'}, {v: 7}]},
        {c: [{v: 'De 60 a 69'}, {v: 6}]},
        {c: [{v: 'De 70 a 79'}, {v: 0}]},
        {c: [{v: 'De 80 a 89'}, {v: 1}]},
        {c: [{v: 'De 90 a 99'}, {v: 0}]},
        {c: [{v: 'De 100 +'},   {v: 0}]},
        {c: [{v: 'Sem informação'}, {v: 0}]}]
}
var optionsCasos = {
  title: 'Curva de Tendência de Casos de COVID-19',
  'width':'98%', 
  'height':'80%',
  titleColor: '#FFFFFF',
  titleTextStyle: {
    fontSize: '16',
    align:'left',
    position:'left'
  },
  vAxis: {
    title: 'Ocorrências',
    titleColor: '#FFFFFF',
    textColor: esquemaCores.white,
    titleTextStyle: {
      fontSize: '14',
      bold:true,
      position:'right'
    },
  },
  hAxis:{
    titleColor: '#FFFFFF',
    textColor: esquemaCores.white,
    fontWeight:'bold',
    textStyle: {
      color:esquemaCores.white,
      bold:true
    }
  },
  lineWidth: 5,
  pointSize: 6,
  scale: 5,
  legend: {
    position: 'top-right',
    textStyle: {
      color:esquemaCores.white
    }},
  backgroundColor: esquemaCores.gray,
    series: {
    //0: {color: '#fc8403'}, // analise
    //1: {color: '#0373fc'}, // descartado
      0: {color: '#fc8403'}, // confirmado
      1: {color: '#fc0b03'}, // Obito
  }
};
var optionsSexo = {
  'width':'98%', 
  'height':'80%',
  title: 'Casos por gênero:',
  titleTextStyle: {
    fontSize: '12',
    align:'left',
    position:'left',
  },
  titleColor: esquemaCores.white,
  textColor: esquemaCores.white,
  idColor: esquemaCores.white,
  // legend: 'none',
  // legend: {
  //   title:'Legenda',
  //   position: 'top'
  // },
  vAxis: {
    title: 'Gênero',
    titleColor: esquemaCores.white,
    textColor: esquemaCores.white,
    titleTextStyle: {
       bold:true
    }
  },
  hAxis: {
    // title: 'Ocorrências',
    titleColor: esquemaCores.white,
    textColor: esquemaCores.white,
    annotation: 0,
  },
  backgroundColor: esquemaCores.gray,
  color:esquemaCores.white,
  legend:{
    textStyle: {
      color:esquemaCores.white,
      bold:true
    }
  },
  colors: [esquemaCores.black,esquemaCores.red],
};
var optionsAge = {
  'width':'90%', 
  'height':'90%',
  title: 'Casos por faixa etária:',
  titleTextStyle: {
    fontSize: '12',
    align:'left',
    position:'left'
  },
  titleColor: esquemaCores.white,
  textColor: esquemaCores.white,
  idColor: esquemaCores.white,
  vAxis: {
    textColor: esquemaCores.white,
   backgroundColor: esquemaCores.gray,
  },
  hAxis: {
    // title: 'Ocorrências',
    titleColor: esquemaCores.white,
    textColor: esquemaCores.white,
    backgroundColor: esquemaCores.gray,
  },
  backgroundColor: esquemaCores.gray,
  color:esquemaCores.white,
  legend:{
    textStyle: {
      color:esquemaCores.white,
      bold:true
    }
  },
  colors: ['#e60000',esquemaCores.white],
};
var charsexo = new ui.Chart(dataTableSexo, 'BarChart', optionsSexo);
var charage = new ui.Chart(dataTableAge, 'BarChart', optionsAge);
var charcovid = new ui.Chart(dataTableCOVID, 'LineChart', optionsCasos)
charsexo.style().set({backgroundColor: esquemaCores.gray,})
panelChildren_Counties.add(charage)
panelChildren_Counties2.add(charsexo)
panelChildren_Map_Graph.add(charcovid)
//Atualizado heimm
var label_Update = ui.Label('Atualizado em: 03-04-2020 às 14:40', {
                                                              'width':'95%', 
                                                              'height':'7%',
                                                              'border':'0px solid black', 
                                                              'background-color': esquemaCores.gray,
                                                              'color':esquemaCores.white,
                                                              'textAlign':'center',
                                                              'fontSize':'10px',
                                                              'fontWeight':'bold',
                                                               'position':'top-center',
})
panelChildren_Counties2.add(label_Update)
//MAP events
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style:{ 
    'background-color':'00000000',
    'position':'top-right'
  }
});
inspector.add(ui.Label('Clique sobre o Município',{'background-color':'00000000','color':'FFFFFF'}))
// Add a label to the panel.
var contaminedByCounty = function(coords){
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Carregando...', {'background-color':'00000000','color':esquemaCores.gray}));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var feat = table.filterBounds(point).first()
  var nomeMunicipio= feat.get('NM_MUNICIP');
  var casosCorona= feat.get('C_Confirm');
  var obitosCorona= feat.get('Obitos');
  nomeMunicipio.evaluate(function(result) {
    inspector.clear()
    inspector.add(ui.Label({value: result,style: {'background-color':'00000000','color':esquemaCores.white}}));
    casosCorona.evaluate(function(result) {
      inspector.add(ui.Label({value: 'Casos: '+result,style: {'background-color':'00000000','color':esquemaCores.white}}));
      obitosCorona.evaluate(function(result) {
        if(result != null){
          inspector.add(ui.Label({value: 'Obítos: '+result,style: {'background-color':'00000000','color':esquemaCores.white}}));
        }
      })
    })
  })
  }
map.onClick(contaminedByCounty)
map.style().set('cursor', 'crosshair');
map.add(inspector)
//Color BAR
function makeLegend(vis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
  // In case you really need it, get the color ramp as an image:
  print(legendImage.getThumbURL({bbox:'0,0,100,8', dimensions:'256x20'}));
  // Otherwise, add it to a panel and add the panel to the map.
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'128x20'}, 
    style: {padding: '1px', position: 'bottom-center','background-color':'00000000'}
  });
  var panel = ui.Panel({
    widgets: [
      ui.Label(String(1),{color:esquemaCores.white,'background-color':'00000000'}), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label(vis['max'],{color:esquemaCores.white,'background-color':'00000000'})
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal', 'position':'bottom-right','background-color':'00000000'}
  });
  return ui.Panel([], null, {'background-color':'00000000','position':'bottom-right'}).add(panel).add(thumb);
}
map.add(makeLegend({palette:['green','yellow','red','magenta'],min:0,max:40}))