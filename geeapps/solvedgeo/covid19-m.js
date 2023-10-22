var table = ui.import && ui.import("table", "table", {
      "id": "users/luizcf14/COVID19/Casos_confirmados"
    }) || ee.FeatureCollection("users/luizcf14/COVID19/Casos_confirmados"),
    coronaTable = ui.import && ui.import("coronaTable", "table", {
      "id": "users/solvedgeo/CoronaTable"
    }) || ee.FeatureCollection("users/solvedgeo/CoronaTable");
ui.root.clear()
var lastPos             = coronaTable.filterMetadata('Tipo','equals','Timeline').sort('id',false).first().getInfo()
var maxCasos            = coronaTable.filterMetadata('Tipo','equals','Map').reduceColumns(ee.Reducer.max(),['Casos_Confirmados']).get('max').getInfo()
var maxCasos_daily      = coronaTable.filterMetadata('Tipo','equals','Timeline').reduceColumns(ee.Reducer.max(),['Confirmados_Diarios']).get('max').getInfo()
var maxCasosObito       = coronaTable.filterMetadata('Tipo','equals','Map').reduceColumns(ee.Reducer.max(),['Obitos']).get('max').getInfo()
var maxCasos_age        = coronaTable.filterMetadata('Tipo','equals','Idades').reduceColumns(ee.Reducer.max(),['Casos_Confirmados']).get('max').getInfo()
var maxCasos_ageObito   = coronaTable.filterMetadata('Tipo','equals','Idades').reduceColumns(ee.Reducer.max(),['Obitos']).get('max').getInfo()
var maxCasos_sexo       = coronaTable.filterMetadata('Tipo','equals','Sexo').reduceColumns(ee.Reducer.max(),['Casos_Confirmados']).get('max').getInfo()
var maxCasos_sexoObito  = coronaTable.filterMetadata('Tipo','equals','Sexo').reduceColumns(ee.Reducer.max(),['Obitos']).get('max').getInfo() 
var esquemaCores        = {'red':'#e60000','gray':'#313131','black':'#000000','green':'#477d4b','light_green':'#2afa00','white':'#FFFFFF','yellow':'#fcca03'}
 // Dados 
var totalCasos_confirmados  = lastPos.properties.Casos_Confirmados
var totalCasos_recuperados  = lastPos.properties.Recuperados
var totalCasos_obito        = lastPos.properties.Obitos
var totalCasos_em_analise   = lastPos.properties.Casos_Analise
var totalCasos_descartados  = lastPos.properties.Casos_Descartado
var totalTestes             = 32920 //adicionar a tabela drive
//Preprocessing Input Data
var filtro = ee.Filter.equals({
  leftField: 'CD_GEOCMU',
  rightField: 'Desc'
});
var table_confirmados = ee.Join.inner('primary','secondary').apply(table,coronaTable.filterMetadata('Tipo','equals','Map'),filtro)
table_confirmados= table_confirmados.map(function(e){
  return ee.Feature(ee.Feature(e.get('primary')).geometry(),ee.Feature(e.get('secondary')).toDictionary())
})
table = table_confirmados;
var table_confirmados = table_confirmados.filterMetadata('Casos_Confirmados','not_equals',0).reduceToImage({
    properties: ['Casos_Confirmados'],
    reducer: ee.Reducer.first()
});
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
map.addLayer(table_confirmados.mask(table_confirmados.gt(0)),{palette:['#3288bd','#99d594','#e6f598','#ffffbf','#fee08b','#fc8d59','#d53e4f'],min:0,max:maxCasos},'PA',true)
// PANELS
var panelChildren_rankConfirmado          = ui.Panel([], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'100%', 
                                                              'height':'100%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'
})
var panelChildren_rankObito               = ui.Panel([], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'100%', 
                                                              'height':'100%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'})
var panelChildren_etariaConfirmado        = ui.Panel([], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'50%', 
                                                              'height':'100%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'
})
var panelChildren_etariaObito             = ui.Panel([], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'50%', 
                                                              'height':'100%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'})
var panelChildren_sexoConfirmado          = ui.Panel([], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'50%', 
                                                              'height':'100%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'
})
var panelChildren_sexoObito               = ui.Panel([], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'50%', 
                                                              'height':'100%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'})
var panelChildren_Map_Graph_ButtonsR       = ui.Panel([], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'50%', 
                                                              'height':'100%',
                                                              'border':'0px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'})
var panelChildren_Map_Graph_ButtonsL       = ui.Panel([], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'50%', 
                                                              'height':'100%',
                                                              'border':'0px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'})
var panelChildren_Map_Graph_ButtonsR2       = ui.Panel([], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'50%', 
                                                              'height':'100%',
                                                              'border':'0px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'})
var panelChildren_Map_Graph_ButtonsL2       = ui.Panel([], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'50%', 
                                                              'height':'100%',
                                                              'border':'0px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'})
var panelChildren_Map_Graph_Buttons       = ui.Panel([panelChildren_Map_Graph_ButtonsR, panelChildren_Map_Graph_ButtonsL], ui.Panel.Layout.flow('horizontal'), {
                                                              'width':'100%', 
                                                              'height':'15%',
                                                              'border':'0px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'})
var panelChildren_Map_Graph_Buttons_forDaily = ui.Panel([panelChildren_Map_Graph_ButtonsR2, panelChildren_Map_Graph_ButtonsL2], ui.Panel.Layout.flow('horizontal'), {
                                                              'width':'100%', 
                                                              'height':'15%',
                                                              'border':'0px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'})
var panelChildren_Map_Graph               = ui.Panel([panelChildren_Map_Graph_Buttons], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'100%', 
                                                              'height':'40%',
                                                              'border':'1px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'
})
var panelChildren_Map_Graph_Daily         = ui.Panel([panelChildren_Map_Graph_Buttons_forDaily], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'100%', 
                                                              'height':'40%',
                                                              'border':'1px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px',
                                                              'shown':false,
})
var panelChildren_Map                     = ui.Panel([map], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'100%', 
                                                              'height':'60%',
                                                              'border':'1px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'2px'})
var panelChildren_firstColumn_Confirmados = ui.Label('Casos Confirmados', {
                                                              'width':'95%', 
                                                              'height':'17%',
                                                              'border':'0px solid black', 
                                                              'background-color': esquemaCores.gray,
                                                              'color':esquemaCores.yellow,
                                                              'textAlign':'center',
                                                              'fontSize':'14px',
                                                              'fontWeight':'bold',
                                                              'position':'top-center',
})
var panelChildren_firstColumn_ConfirmadosQTD = ui.Label(totalCasos_confirmados, {
                                                              'width':'95%', 
                                                              'height':'25%',
                                                              'border':'0px solid black', 
                                                              'background-color': esquemaCores.gray,
                                                              'color':esquemaCores.yellow,
                                                              'textAlign':'center',
                                                              'fontSize':'34px',
                                                              'fontWeight':'bold',
                                                              'position':'top-center',
})
var panelChildren_firstColumn_Recuperados = ui.Label('Recuperados', {
                                                              'width':'95%', 
                                                              'height':'17%',
                                                              'border':'0px solid black', 
                                                              'background-color': esquemaCores.gray,
                                                              'color':esquemaCores.light_green,
                                                              'textAlign':'center',
                                                              'fontSize':'14px',
                                                              'fontWeight':'bold',
                                                              'position':'top-center',
})
var panelChildren_firstColumn_RecuperadosQTD = ui.Label(totalCasos_recuperados, {
                                                              'width':'95%', 
                                                              'height':'25%',
                                                              'border':'0px solid black', 
                                                              'background-color': esquemaCores.gray,
                                                              'color':esquemaCores.light_green,
                                                              'textAlign':'center',
                                                              'fontSize':'34px',
                                                              'fontWeight':'bold',
                                                              'position':'top-center',
})
var panelChildren_firstColumn_Obito       = ui.Label('Óbitos', {
                                                              'width':'95%', 
                                                              'height':'17%',
                                                              'border':'0px solid black', 
                                                              'background-color': esquemaCores.gray,
                                                              'color':esquemaCores.red,
                                                              'textAlign':'center',
                                                              'fontSize':'14px',
                                                              'fontWeight':'bold',
                                                              'position':'top-center',
})
var panelChildren_firstColumn_ObitoQTD    = ui.Label(totalCasos_obito, {
                                                              'width':'95%', 
                                                              'height':'25%',
                                                              'border':'0px solid black', 
                                                              'background-color': esquemaCores.gray,
                                                              'color':esquemaCores.red,
                                                              'textAlign':'center',
                                                              'fontSize':'34px',
                                                              'fontWeight':'bold',
                                                              'position':'top-center',
})
var panelChildren_firstColumn_EmAnalise   = ui.Label('Em Análise', {
                                                              'width':'95%', 
                                                              'height':'17%',
                                                              'border':'0px solid black', 
                                                              'background-color': esquemaCores.gray,
                                                              'color':esquemaCores.green,
                                                              'textAlign':'center',
                                                              'fontSize':'14px',
                                                              'fontWeight':'bold',
                                                              'position':'top-center',
})
var panelChildren_firstColumn_EmAnaliseQTD = ui.Label(totalCasos_em_analise, {
                                                              'width':'95%', 
                                                              'height':'25%',
                                                              'border':'0px solid black', 
                                                              'background-color': esquemaCores.gray,
                                                              'color':esquemaCores.green,
                                                              'textAlign':'center',
                                                              'fontSize':'34px',
                                                              'fontWeight':'bold',
                                                              'position':'top-center',
})
var panelChildren_firstColumn_Descartados = ui.Label('Descartados', {
                                                              'width':'95%', 
                                                              'height':'17%',
                                                              'border':'0px solid black', 
                                                              'background-color': esquemaCores.gray,
                                                              'color':esquemaCores.white,
                                                              'textAlign':'center',
                                                              'fontSize':'14px',
                                                              'fontWeight':'bold',
                                                              'position':'top-center',
})
var panelChildren_firstColumn_DescartadosQTD = ui.Label(totalCasos_descartados, {
                                                              'width':'95%', 
                                                              'height':'25%',
                                                              'border':'0px solid black', 
                                                              'background-color': esquemaCores.gray,
                                                              'color':esquemaCores.white,
                                                              'textAlign':'center',
                                                              'fontSize':'34px',
                                                              'fontWeight':'bold',
                                                              'position':'top-center',
})
var panelChildren_Confirmados             = ui.Panel([panelChildren_firstColumn_Confirmados, panelChildren_firstColumn_ConfirmadosQTD], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'20%', 
                                                              'height':'100%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'
})
var panelChildren_Recuperados             = ui.Panel([panelChildren_firstColumn_Recuperados, panelChildren_firstColumn_RecuperadosQTD], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'20%', 
                                                              'height':'100%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'
})
var panelChildren_Obito                   = ui.Panel([panelChildren_firstColumn_Obito, panelChildren_firstColumn_ObitoQTD], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'20%', 
                                                              'height':'100%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'
})
var panelChildren_EmAnalise               = ui.Panel([panelChildren_firstColumn_EmAnalise, panelChildren_firstColumn_EmAnaliseQTD], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'20%', 
                                                              'height':'100%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'
})
var panelChildren_Descartados             = ui.Panel([panelChildren_firstColumn_Descartados, panelChildren_firstColumn_DescartadosQTD], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'20%', 
                                                              'height':'100%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'
})
var panelChildren_firstBar                = ui.Panel([panelChildren_Map, panelChildren_Map_Graph_Daily, panelChildren_Map_Graph], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'100%', 
                                                              'height':'37%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                               'padding':'0px',
                                                               'position':'top-center'
})
var panelChildren_secondBar               = ui.Panel([panelChildren_Confirmados, panelChildren_Recuperados, panelChildren_Obito, panelChildren_EmAnalise, panelChildren_Descartados], ui.Panel.Layout.flow('horizontal'), {
                                                              'width':'100%', 
                                                              'height':'5%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px'
})
var panelChildren_thirdBar                = ui.Panel([panelChildren_rankConfirmado, panelChildren_rankObito], ui.Panel.Layout.flow('horizontal'), {
                                                              'width':'100%', 
                                                              'height':'60%',
                                                              'border':'1px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px',
                                                              'position':'bottom-center'
})  
var panelChildren_fourthBar               = ui.Panel([panelChildren_etariaConfirmado, panelChildren_etariaObito], ui.Panel.Layout.flow('horizontal'), {
                                                              'width':'100%', 
                                                              'height':'14%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px',
                                                              // 'position':'bottom-center'
})
var panelChildren_fifthBar                = ui.Panel([panelChildren_sexoConfirmado, panelChildren_sexoObito], ui.Panel.Layout.flow('horizontal'), {
                                                              'width':'100%', 
                                                              'height':'12%',
                                                              'border':'2px solid black', 
                                                              'background-color':'#313131',
                                                              'padding':'0px',
                                                              'position':'bottom-center'
}) 
var panelMaster                           = ui.Panel([panelChildren_firstBar, panelChildren_secondBar, panelChildren_thirdBar, panelChildren_fourthBar, panelChildren_fifthBar], ui.Panel.Layout.flow('vertical'), {
                                                              'width':'100%', 
                                                              'height':'100%',
                                                              'border':'2px solid black', 
                                                              'background-color':'black',
})
// var verticalSpacing =  ui.Panel([], ui.Panel.Layout.flow('horizontal'), {
//                                                               'width':'0%', 
//                                                               'height':'100%',
//                                                               'border':'2px solid black', 
//                                                               'background-color':'black',
// })
// var panelMaster = ui.Panel([verticalSpacing,panelMaster], ui.Panel.Layout.flow('vertical'), {
//                                                               'width':'100%', 
//                                                               'height':'100%',
//                                                               'border':'2px solid black', 
//                                                               'background-color':'black',
// })
ui.root.add(panelMaster)
//OPTIONS
//CASOS
var optionsCasos = {
  title: 'Curva Acumulada de Casos Confirmados de COVID-19 no Pará',
  'width':'98%', 
  'height':'75%',
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
    viewWindow:{
          max:totalCasos_confirmados +1 ,
          min:0,
          // interval: 100,
    },
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
  lineWidth: 4,
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
      0: {color: esquemaCores.yellow}, // confirmado
      1: {color: '#fc0b03'}, // Obito
  }
};
var optionsCasosDaily = {
  title: 'Curva Diária de Casos Confirmados de COVID-19 no Pará',
  'width':'98%', 
  'height':'75%',
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
    viewWindow:{
          max:maxCasos_daily +1 ,
          min:0,
          // interval: 100,
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
  lineWidth: 4,
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
      0: {color: esquemaCores.yellow}, // confirmado
      1: {color: '#fc0b03'}, // Obito
  }
};
//RANK
var optionsRank = {
  'width':'100%', 
  'height':'98%',
  title: 'Casos por Município:',
  titleTextStyle: {
    fontSize: '18',
    align:'left',
    position:'left'
  },
  bars:'horizontal',
  titleColor: esquemaCores.white,
  textColor: esquemaCores.white,
  idColor: esquemaCores.white,
  vAxis: {
    textColor: esquemaCores.white,
   backgroundColor: esquemaCores.gray,
    textStyle: {
    fontSize: '11',
    align:'left',
    position:'left'
    }
  },
  hAxis: {
    // title: 'Ocorrências',
    titleColor: esquemaCores.white,
    textColor: esquemaCores.white,
    backgroundColor: esquemaCores.gray,
    viewWindow:{
          max:maxCasos +1 ,
          min:0,
          // interval: 100,
      },
      textPosition:'in',
  },
  backgroundColor: esquemaCores.gray,
  chartArea:{left:'26%',top: '3%', width:'70%', height:'1550'},
  color:esquemaCores.white,
  legend:{
    textStyle: {
      color:esquemaCores.white,
      bold:true
    }
  },
  colors: [esquemaCores.yellow,esquemaCores.white],
};
var optionsRankObito = {
  'width':'100%', 
  'height':'90%',
  title: 'Óbitos por Município:',
  titleTextStyle: {
    fontSize: '18',
    align:'left',
    position:'left'
  },
  titleColor: esquemaCores.white,
  textColor: esquemaCores.white,
  idColor: esquemaCores.white,
  vAxis: {
    textColor: esquemaCores.white,
   backgroundColor: esquemaCores.gray,
    textStyle: {
    fontSize: '11',
    align:'left',
    position:'left'
    }
  },
  hAxis: {
    // title: 'Ocorrências',
    titleColor: esquemaCores.white,
    textColor: esquemaCores.white,
    backgroundColor: esquemaCores.gray,
    viewWindow:{
          max:maxCasosObito +1 ,
          min:0,
          // interval: 100,
      },
  },
  backgroundColor: esquemaCores.gray,
  color:esquemaCores.white,
  legend:{
    textStyle: {
      color:esquemaCores.white,
      bold:true
    }
  },
  colors: [esquemaCores.red,esquemaCores.white],
};
//AGE
var optionsAge = {
  'width':'98%', 
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
    viewWindow:{
          max:maxCasos_age +1 ,
          min:0,
          // interval: 100,
      },
  },
  backgroundColor: esquemaCores.gray,
  color:esquemaCores.white,
  legend:{
    textStyle: {
      color:esquemaCores.white,
      bold:true
    }
  },
  colors: [esquemaCores.yellow,esquemaCores.white],
};
var optionsAgeObito = {
  'width':'98%', 
  'height':'90%',
  title: 'Óbitos por faixa etária:',
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
    viewWindow:{
          max:maxCasos_ageObito +1 ,
          min:0,
          // interval: 100,
      },
  },
  backgroundColor: esquemaCores.gray,
  color:esquemaCores.white,
  legend:{
    textStyle: {
      color:esquemaCores.white,
      bold:true
    }
  },
  colors: [esquemaCores.red,esquemaCores.white],
};
//SEX
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
    colors: [esquemaCores.black,esquemaCores.red],
    viewWindow:{
          max:maxCasos_sexo +1 ,
          min:0,
          // interval: 100,
      },
  },
  backgroundColor: esquemaCores.gray,
  color:esquemaCores.white,
  legend:{
    textStyle: {
      color:esquemaCores.white,
      bold:true
    }
  },
  colors: [esquemaCores.yellow],
};
var optionsSexoObito = {
  'width':'98%', 
  'height':'80%',
  title: 'Óbitos por gênero:',
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
    colors: [esquemaCores.black,esquemaCores.red],
    viewWindow:{
          max:maxCasos_sexoObito +1 ,
          min:0,
          // interval: 100,
      },
  },
  backgroundColor: esquemaCores.gray,
  color:esquemaCores.white,
  legend:{
    textStyle: {
      color:esquemaCores.white,
      bold:true
    }
  },
  colors: [esquemaCores.red],
};
//FEATURE COLLECTIONS
var timeline_FeatureCollection      = coronaTable.filterMetadata('Tipo','equals','Timeline').sort('id',true)
var timelineDaily_FeatureCollection = coronaTable.filterMetadata('Tipo','equals','Timeline').sort('id',true)
var sexo_FeatureCollection          = coronaTable.filterMetadata('Tipo','equals','Sexo').sort('id',true)
var sexoObito_FeatureCollection     = coronaTable.filterMetadata('Tipo','equals','Sexo').filterMetadata('Obitos','greater_than',0).sort('id',true)
var age_FeatureCollection           = coronaTable.filterMetadata('Tipo','equals','Idades').sort('id',true)
var ageObito_FeatureCollection      = coronaTable.filterMetadata('Tipo','equals','Idades').filterMetadata('Obitos','greater_than',0).sort('id',true)
var rank_FeatureCollection          = coronaTable.filterMetadata('Tipo','equals','Map').filterMetadata('Casos_Confirmados','greater_than',0).sort('Casos_Confirmados',false)
var rankObito_FeatureCollection     = coronaTable.filterMetadata('Tipo','equals','Map').filterMetadata('Obitos','greater_than',0).sort('Obitos',false)
//CHARTS
var charsexo        = new ui.Chart.feature.byFeature(sexo_FeatureCollection,'Desc',['Casos_Confirmados']).setChartType('BarChart').setOptions(optionsSexo).setSeriesNames(['Confirmados'],0)
var charsexoObito   = new ui.Chart.feature.byFeature(sexoObito_FeatureCollection,'Desc',['Obitos']).setChartType('BarChart').setOptions(optionsSexoObito).setSeriesNames(['Obitos'],0)
var charage         = new ui.Chart.feature.byFeature(age_FeatureCollection,'Desc',['Casos_Confirmados']).setChartType('BarChart').setOptions(optionsAge).setSeriesNames(['Confirmados'],0)//new ui.Chart(dataTableAge, 'BarChart', optionsAge);
var charageObito    = new ui.Chart.feature.byFeature(ageObito_FeatureCollection,'Desc',['Obitos']).setChartType('BarChart').setOptions(optionsAgeObito).setSeriesNames(['Obitos'],0)//new ui.Chart(dataTableAge, 'BarChart', optionsAge);
var charrank        = new ui.Chart.feature.byFeature(rank_FeatureCollection,'Municipio',['Casos_Confirmados']).setChartType('BarChart').setOptions(optionsRank).setSeriesNames(['Confirmados'],0)//new ui.Chart(dataTableAge, 'BarChart', optionsAge);
var charrankObito   = new ui.Chart.feature.byFeature(rankObito_FeatureCollection,'Municipio',['Obitos']).setChartType('BarChart').setOptions(optionsRankObito).setSeriesNames(['Obitos'],0)//new ui.Chart(dataTableAge, 'BarChart', optionsAge)
var charcovid       = new ui.Chart.feature.byFeature(timeline_FeatureCollection,'Data',['Casos_Confirmados','Obitos']).setOptions(optionsCasos)//new ui.Chart(dataTableCOVID, 'LineChart', optionsCasos)
var charcovidDaily  = new ui.Chart.feature.byFeature(timelineDaily_FeatureCollection,'Data',['Confirmados_Diarios','Obitos_Diarios']).setChartType('ColumnChart').setOptions(optionsCasosDaily)//new ui.Chart(dataTableCOVID, 'LineChart', optionsCasos)
charsexo.style().set({backgroundColor: esquemaCores.gray,})
charsexoObito.style().set({backgroundColor: esquemaCores.gray,})
charage.style().set({backgroundColor: esquemaCores.gray,})
charageObito.style().set({backgroundColor: esquemaCores.gray,})
charrank.style().set({backgroundColor: esquemaCores.gray,})
charrankObito.style().set({backgroundColor: esquemaCores.gray,})
charcovid.style().set({backgroundColor: esquemaCores.gray})
charcovidDaily.style().set({backgroundColor: esquemaCores.gray})
// Create a buttons to select timeline cumulative or daily.
var buttonTot = ui.Button({
  label: 'Acumulado',
  style: {position:'top-right',
          'width':'97%', 
          'height':'62%',
          // backgroundColor:'#4CAF50',
          // 'background-color': esquemaCores.red,
          'color': esquemaCores.gray,
          'textAlign':'center',
          'fontSize':'15px',
  },
  onClick: function() {
     ee.Algorithms.If(
      panelChildren_Map_Graph_Daily.style().set('shown', true),
      panelChildren_Map_Graph_Daily.style().set('shown', false)
    )
    panelChildren_Map_Graph.style().set('shown', true)
  }
});
var buttonDaily = ui.Button({
  label: 'Diário',
  style: {position:'top-left',
          'width':'97%', 
          'height':'62%',
          // backgroundColor:'#4CAF50',
          // 'background-color': esquemaCores.red,
          'color': esquemaCores.gray,
          'textAlign':'center',
          'fontSize':'15px',
          // 'shown': false
  },
  onClick: function() {
    ee.Algorithms.If(
      panelChildren_Map_Graph.style().set('shown', true),
      panelChildren_Map_Graph.style().set('shown', false)
    )
    panelChildren_Map_Graph_Daily.style().set('shown', true)
  }
});
// Create a buttons to select timeline cumulative or daily.
var buttonTot2 = ui.Button({
  label: 'Acumulado',
  style: {position:'top-right',
          'width':'97%', 
          'height':'62%',
          // backgroundColor:'#4CAF50',
          // 'background-color': esquemaCores.red,
          'color': esquemaCores.gray,
          'textAlign':'center',
          'fontSize':'15px',
  },
  onClick: function() {
    ee.Algorithms.If(
      panelChildren_Map_Graph_Daily.style().set('shown', true),
      panelChildren_Map_Graph_Daily.style().set('shown', false)
    )
    panelChildren_Map_Graph.style().set('shown', true)
  }
});
var buttonDaily2 = ui.Button({
  label: 'Diário',
  style: {position:'top-left',
          'width':'97%', 
          'height':'62%',
          // backgroundColor:'#4CAF50',
          // 'background-color': esquemaCores.red,
          'color': esquemaCores.gray,
          'textAlign':'center',
          'fontSize':'15px',
          // 'shown': false
  },
  onClick: function() {
    ee.Algorithms.If(
      panelChildren_Map_Graph.style().set('shown', true),
      panelChildren_Map_Graph.style().set('shown', false)
    )
    panelChildren_Map_Graph_Daily.style().set('shown', true)
  }
});
// var buttonMap = ui.Button({
//   label: 'Mapa',
//   style: {position:'top-right',
//           'width':'16%', 
//           'height':'59%',
//           // backgroundColor:'#4CAF50',
//           // 'background-color': esquemaCores.red,
//           'color': esquemaCores.gray,
//           'textAlign':'center',
//           'fontSize':'10px',
//           'shown': false
//   },
//   onClick: function() {
//     ee.Algorithms.If(
//       panelChildren_Tests.style().set('shown', true),
//       panelChildren_Tests.style().set('shown', false)
//     )
//     panelChildren_Map.style().set('shown', true)
//     charLeitos.style().set('shown', false)
//     buttonMap.style().set('shown', false)
//     buttonTests.style().set('shown', true)
//   }
// });
// var buttonTests = ui.Button({
//   label: "UTI's e Testes",
//   style: {position:'top-right',
//           'width':'16%', 
//           'height':'59%',
//           // backgroundColor:'#4CAF50',
//           // 'background-color': esquemaCores.red,
//           'color': esquemaCores.gray,
//           'textAlign':'center',
//           'fontSize':'10px',
//           // 'shown': false
//   },
//   onClick: function() {
//     ee.Algorithms.If(
//       panelChildren_Map.style().set('shown', true),
//       panelChildren_Map.style().set('shown', false)
//     )
//     panelChildren_Tests.style().set('shown', true)
//     charLeitos.style().set('shown', true)
//     buttonTests.style().set('shown', false)
//     buttonMap.style().set('shown', true)
//   }
// });
buttonTot.style().set({backgroundColor: esquemaCores.gray})
buttonDaily.style().set({backgroundColor: esquemaCores.gray})
buttonTot2.style().set({backgroundColor: esquemaCores.gray})
buttonDaily2.style().set({backgroundColor: esquemaCores.gray})
// buttonTests.style().set({backgroundColor: esquemaCores.gray})
// buttonMap.style().set({backgroundColor: esquemaCores.gray})
//ADD TO PAINELS
panelChildren_Map_Graph_ButtonsR.add(buttonTot)
panelChildren_Map_Graph_ButtonsL.add(buttonDaily)
panelChildren_Map_Graph_ButtonsR2.add(buttonTot2)
panelChildren_Map_Graph_ButtonsL2.add(buttonDaily2)
// panelChildren_Map_Graph_Buttons.add(buttonTests)
// panelChildren_Map_Graph_Buttons.add(buttonMap)
panelChildren_Map_Graph.add(charcovid)
panelChildren_Map_Graph_Daily.add(charcovidDaily)
panelChildren_rankConfirmado.add(charrank)
panelChildren_rankObito.add(charrankObito)
panelChildren_etariaConfirmado.add(charage)
panelChildren_etariaObito.add(charageObito)
panelChildren_sexoConfirmado.add(charsexo)
panelChildren_sexoObito.add(charsexoObito)
//Atualizado heimm
var updateDate  =  coronaTable.filterMetadata('Tipo','equals','Data').first().get('Desc').getInfo()
var today = ee.String(updateDate).slice(0,5) //To use in timelineDaily_FeatureCollection
// print(today)
var label_Update = ui.Label('Atualizado em: '+updateDate, {
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
// panelChildren_sexoObito.add(label_Update)
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
print(ee.FeatureCollection(table_confirmados))
var lock = false;
var contaminedByCounty = function(coords){
 if(lock ==false ){
    lock = true;
    inspector.clear();
    inspector.style().set('shown', true);
    inspector.add(ui.Label('Carregando...', {'background-color':'00000000','color':esquemaCores.gray}));
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    var feat = table.filterBounds(point).first()
    var nomeMunicipio= feat.get('Municipio');
    var casosCorona= feat.get('Casos_Confirmados');
    var obitosCorona= feat.get('Obitos');
    nomeMunicipio.evaluate(function(result) {
      inspector.clear()
      inspector.add(ui.Label({value: result,style: {'background-color':'00000000','color':esquemaCores.white}}));
      casosCorona.evaluate(function(result) {
        inspector.add(ui.Label({value: 'Casos Confirmados: '+result,style: {'background-color':'00000000','color':esquemaCores.white}}));
        obitosCorona.evaluate(function(result) {
          if(result != null){
            inspector.add(ui.Label({value: 'Óbitos: '+result,style: {'background-color':'00000000','color':esquemaCores.white}}));
          }
          lock = false
        })
      })
    })
  }
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
map.add(makeLegend({palette:['#3288bd','#99d594','#e6f598','#ffffbf','#fee08b','#fc8d59','#d53e4f'],min:0,max:maxCasos}))