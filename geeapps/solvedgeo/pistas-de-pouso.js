// var pistas = ee.FeatureCollection('projects/solvedltda/assets/Pistas_de_Pouso_02_Fev_2023_v1')
var pistas = ee.FeatureCollection('projects/solvedltda/assets/Pistas_de_Pouso_27_Mar_2023_v1_2')
pistas = pistas.distinct(['X', 'Y'])
var ti_total = ee.Dictionary(pistas.aggregate_histogram('TI'))
var ti_filtered = ee.Dictionary(pistas.filter(ee.Filter.eq('Garimpo+5k','SIM')).aggregate_histogram('TI'))
var sliced_ti = ti_filtered.keys().slice(1)
var dataTI = sliced_ti.map(function(ti){
  var strTI = ee.String(ti)
  var nonFilteredValue = ti_total.get(ti)
  var filteredValue = ti_filtered.get(ti)
  // var percentage = ee.Number(ee.Number(filteredValue).divide(ee.Number(nonFilteredValue))).multiply(100).format('%.2f').cat('% (').cat(ee.Number(filteredValue).format()).cat(' de ').cat(ee.Number(nonFilteredValue).format()).cat(')')
  // return ee.List([ti, nonFilteredValue, percentage])
  var percentage = ee.Number(ee.Number(filteredValue).divide(ee.Number(nonFilteredValue))).multiply(100)
  var percentageAnnotation = percentage.format('%.2f').cat('% (').cat(ee.Number(filteredValue).format()).cat(' de ').cat(ee.Number(nonFilteredValue).format()).cat(')')
  return ee.List([ti, percentage, percentageAnnotation])
})
// Define column names and properties for the DataTable. The order should
// correspond to the order in the construction of the 'row' property above.
var columnHeader = ee.List([[
  {role: 'domain'},{role: 'data'},{role: 'annotation'}
]]);
// Concatenate the column header to the table.
dataTI = columnHeader.cat(dataTI);
// Use 'evaluate' to transfer the server-side table to the client, define the
// chart and print it to the consntageole.
var rankTI = ee.Dictionary(pistas.aggregate_histogram('TI'))
var sliced_ti_k = rankTI.keys().slice(1)
var sliced_ti_v = rankTI.values().slice(1)
var ti_dict = ee.Dictionary.fromLists(sliced_ti_k, sliced_ti_v)
// print(ti_dict)
var rankUC = ee.Dictionary(pistas.aggregate_histogram('UC'))
var sliced_uc_k = rankUC.keys().slice(1)
var sliced_uc_v = rankUC.values().slice(1)
var uc_dict = ee.Dictionary.fromLists(sliced_uc_k, sliced_uc_v)
// print(uc_dict)
var rankti_5km = ee.Dictionary(pistas.filter(ee.Filter.eq('Garimpo+5k','SIM')).aggregate_histogram('TI'))
var sliced_ti5km_k = rankti_5km.keys().slice(1)
var sliced_ti5km_v = rankti_5km.values().slice(1)
var ti5km_dict = ee.Dictionary.fromLists(sliced_ti5km_k, sliced_ti5km_v)
// print(ti5km_dict)
var ufs = ee.Dictionary(pistas.aggregate_histogram('UF'))
var sliced_uf_k = ufs.keys().slice(1)
var sliced_uf_v = ufs.values().slice(1)
var uf_dict = ee.Dictionary.fromLists(sliced_uf_k, sliced_uf_v)
// print(uf_dict)
var municipios = ee.Dictionary(pistas.aggregate_histogram('NM_MUN'))
var sliced_muni_k = municipios.keys().slice(1)
var sliced_muni_v = municipios.values().slice(1)
var municipio_dict = ee.Dictionary.fromLists(sliced_muni_k, sliced_muni_v)
// print(municipio_dict)
var mapPanel = ui.Map();
mapPanel.style().set('cursor', 'crosshair');
// var bgColor = '#F7F7FA';//#F8F9FA';
var bgColor = '#FFFFFF'
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'bottom-left',
  stretch: 'both', 
  backgroundColor: bgColor,
  shown: true
});
var subtitlestyle = {color: '#555555', fontWeight: 'bold', backgroundColor:bgColor}
var clickPanel = ui.Panel({style:{backgroundColor:bgColor}});
var info = ui.Label({style: {whiteSpace: 'pre',backgroundColor:bgColor}});
var info_TI_dict= ui.Label({style: {whiteSpace: 'pre',backgroundColor:bgColor}}); 
var info_UC_dict= ui.Label({style: {whiteSpace: 'pre',backgroundColor:bgColor}});
var info_TI5km_dict= ui.Label({style: {whiteSpace: 'pre',backgroundColor:bgColor}});
var info_UF_dict= ui.Label({style: {whiteSpace: 'pre',backgroundColor:bgColor}}); 
var info_muni_dict = ui.Label({style: {whiteSpace: 'pre',backgroundColor:bgColor}}); 
var chartTI = ui.Panel({style: {whiteSpace: 'pre',backgroundColor:bgColor}});
/* For date selection https://courses.spatialthoughts.com/end-to-end-gee.html#module-5-earth-engine-apps */
// You can even add panels to other panels
var dropdownPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {whiteSpace: 'pre',backgroundColor:bgColor},
});
// mainPanel.add(dropdownPanel);
var yearSelector = ui.Select({
  placeholder: 'Carregando..',
  })
// var monthSelector = ui.Select({
//   placeholder: 'Carregando..',
  // })
var button = ui.Button('Carregar')
dropdownPanel.add(yearSelector)
// dropdownPanel.add(monthSelector)
dropdownPanel.add(button)
// Let's add a dropdown with the years
var currYear =  new Date().getFullYear()
var years = ee.List.sequence(2016, 2022)
// var months = ee.List.sequence(1, 12)
// Dropdown items need to be strings
var yearStrings = years.map(function(year){
  return ee.Number(year).format('%04d')
})
// var monthStrings = months.map(function(month){
//   return ee.Number(month).format('%02d')
// })
// Evaluate the results and populate the dropdown
yearStrings.evaluate(function(yearList) {
  yearSelector.items().reset(yearList)
  yearSelector.setPlaceholder('Selecione o Ano')
})
// monthStrings.evaluate(function(monthList) {
//   monthSelector.items().reset(monthList)
//   monthSelector.setPlaceholder('Selecione o Mês')
// })
var pistasStyles = ee.Dictionary({
  'SIM': {color: '#0000FF', pointSize: 5, pointShape: 'circle'},
  'NÃO': {color: '#FF0000', pointSize: 5, pointShape: 'circle'},
});
var pistasStyled = pistas.map(function(feature) {
  return feature.set('style', pistasStyles.get(feature.get('Reg ANAC')));
});
var pistasVis = pistasStyled.style({
  styleProperty: 'style',
});
// var pistas_ui_Map = ui.Map.Layer(pistas,{color:'#00FFFFFF'},'Pistas de Pouso')
// var pistas_ui_Map2 = ui.Map.Layer(pistasVis,null,'Pistas de Pouso')
var pistasANACYes = pistas.filter(ee.Filter.eq('Reg ANAC','SIM')).size().getInfo()
var pistasANACNo = pistas.filter(ee.Filter.neq('Reg ANAC','SIM')).size().getInfo()
var pistas_ui_Map1 = ui.Map.Layer(pistas.filter(ee.Filter.eq('Reg ANAC','SIM')),{color: '#0000FF', pointSize: 5, pointShape: 'circle'},'Pistas de Pouso Registradas')
var pistas_ui_Map2 = ui.Map.Layer(pistas.filter(ee.Filter.neq('Reg ANAC','SIM')),{color: '#FFFF00', pointSize: 5, pointShape: 'circle'},'Pistas de Pouso Não Registradas')
// Class color and label info.
var classInfo = [
  [  // Column 1
    {name: 'Pistas registradas', color: '#0000FF'},  // Row 1
    {name: 'Pistas não registradas', color: '#FFFF00'},     // Row 2
  ]
];
// Makes a legend entry: color and label side-by-side in a panel.
function legendEntry(info) {
  var color = ui.Panel({style: {
    width: '20px',
    height: '20px',
    backgroundColor: info.color,
    margin: '6px 0px 0px 0px',
    border:  '1px solid black',
  }});
  var label = ui.Label({
    value: info.name,
  });
  return ui.Panel({
    widgets: [color, label],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      stretch: 'horizontal',
      margin: '-6px 0px 0px 0px'
    }});
}
// Make a grid of legend entries.
var columns = [];
classInfo.forEach(function(column) {
  var rows = [];
  column.forEach(function(row) {
    rows.push(legendEntry(row));
  });
  columns.push(ui.Panel(rows));
});
// Add the legend components grid to a parent legend panel. 
var legend = ui.Panel({
  widgets: columns,
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'top-left',
    padding: '8px 8px 0px 8px' 
  }
});
// Create a panel and add it to the map.
var inspectorInfo = [ui.Label('Clique em um ponto indicativo de pista de pouso para mais detalhes')]
var inspector = ui.Panel(inspectorInfo);
inspector.style().set({
  width: '380px',
  position: 'bottom-left',
  stretch: 'both', 
  backgroundColor: bgColor,
  shown: true
});
// Define a function that triggers when any value is changed
var loadComposite = function() {
  mapPanel.clear();
  // mapPanel.remove(sentinel_ui_Map);
  var year  = yearSelector.getValue()
  year = ee.Number.parse(year)
 var collection = ee.ImageCollection( 'projects/nexgenmap/MapBiomas2/SENTINEL/mosaics-3')
        .filter(ee.Filter.eq('version', '3'))
        .filter(ee.Filter.eq('year', year))
        .filter(ee.Filter.or(ee.Filter.inList('biome', ['AMAZONIA']), ee.Filter.inList('biome', ['CERRADO']), ee.Filter.inList('biome', ['PANTANAL']) ))
  var sentinel_ui_Map = ui.Map.Layer(collection,{bands: ["red_median", "green_median", "blue_median"], min: 465, max: 2195, gamma:1.5}, 'Sentinel '+year.getInfo(),true)
  mapPanel.add(sentinel_ui_Map);
  // var pistas_ui_Map = ui.Map.Layer(pistas,{color:'#FF0000'},'Pistas de Pouso')
  // mapPanel.add(pistas_ui_Map);
  var pistas_ui_Map1 = ui.Map.Layer(pistas.filter(ee.Filter.eq('Reg ANAC','SIM')),{color: '#0000FF', pointSize: 5, pointShape: 'circle'},'Pistas de Pouso Registradas')
  var pistas_ui_Map2 = ui.Map.Layer(pistas.filter(ee.Filter.neq('Reg ANAC','SIM')),{color: '#FFFF00', pointSize: 5, pointShape: 'circle'},'Pistas de Pouso Não Registradas')
  mapPanel.add(pistas_ui_Map1);
  mapPanel.add(pistas_ui_Map2);
  var inspectorInfo = [ui.Label('Clique em um ponto indicativo de pista de pouso para mais detalhes')]
  var inspector = ui.Panel(inspectorInfo);
    inspector.style().set({
    width: '380px',
    position: 'bottom-left',
    stretch: 'both', 
    backgroundColor: bgColor,
    shown: true
  });
  mapPanel.add(inspector);
  mapPanel.add(legend);
  mapPanel.onClick(pointInfo);
  mapPanel.setOptions('SATELLITE');
}
button.onClick(loadComposite)
var year  = 2021
var collection = ee.ImageCollection( 'projects/nexgenmap/MapBiomas2/SENTINEL/mosaics-3')
        .filter(ee.Filter.eq('version', '3'))
        .filter(ee.Filter.eq('year', year))
        .filter(ee.Filter.or(ee.Filter.inList('biome', ['AMAZONIA']), ee.Filter.inList('biome', ['CERRADO']), ee.Filter.inList('biome', ['PANTANAL']) ))
var sentinel_ui_Map = ui.Map.Layer(collection,{bands: ["red_median", "green_median", "blue_median"], min: 465, max: 2195, gamma:1.5}, 'Sentinel '+year,true)
mapPanel.setOptions('SATELLITE');
 mapPanel.add(sentinel_ui_Map);
 mapPanel.add(pistas_ui_Map1);
 mapPanel.add(pistas_ui_Map2);
 mapPanel.add(inspector);
 mapPanel.add(legend);
// panel.add(info);
panel.add(
  ui.Panel([ui.Label({value: 'Pistas de Pouso na Amazônia Brasileira', style: {fontSize: '20px', fontWeight: 'bold', backgroundColor: bgColor}}),
  ui.Panel([ui.Label("A base de dados de pistas de pouso está na sua versão 1.2 [27 de março de 2023] e é feita a partir de interpretação visual de dados de satélite de alta-resolução (4m), na forma de mosaicos mensais livres de nuvem, do ano de 2021, fornecidos pela empresa Planet. Atualmente a base de dados conta com 2869 pistas de pouso identificadas (pontos amarelos ou azuis sobre o mapa).",{backgroundColor: bgColor,margin: '8px 4px 2px 8px'}),ui.Label("Baixar Dados",{backgroundColor: bgColor, color:'blue'},"https://mapbiomas-br-site.s3.amazonaws.com/downloads/Pistas_de_Pouso_27_Mar_2023_v1.2.zip"),],ui.Panel.Layout.flow('vertical'),{backgroundColor: bgColor}),
  ui.Label({value:'Total de pistas de pouso: '+(pistasANACYes+pistasANACNo), style: {backgroundColor: bgColor}}),
  // ui.Label({value:'Pistas **registradas** na ANAC:'+pistasANACYes+" ("+((pistasANACYes/(pistasANACYes+pistasANACNo))*100).toFixed(2)+"%)" ,style: {backgroundColor: bgColor}}),
  // ui.Label({value:'Pistas NÃO registradas pela ANAC: '+pistasANACNo+" ("+((pistasANACNo/(pistasANACYes+pistasANACNo))*100).toFixed(2)+"%)",style: {backgroundColor: bgColor}}),
  ui.Panel([ui.Label('Pistas',{margin: '8px 0px 2px 8px'}),ui.Label(" REGISTRADAS ",{fontWeight:'bold',margin: '8px 2px 2px 4px'}), ui.Label('na ANAC:'+pistasANACYes+" ("+((pistasANACYes/(pistasANACYes+pistasANACNo))*100).toFixed(0)+"%)",{margin: '8px 4px 2px 2px'})],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor}),
  ui.Panel([ui.Label('Pistas',{margin: '8px 0px 2px 8px'}),ui.Label(" NÃO REGISTRADAS ",{fontWeight:'bold',margin: '8px 2px 2px 4px'}), ui.Label('na ANAC:'+pistasANACNo+" ("+((pistasANACNo/(pistasANACYes+pistasANACNo))*100).toFixed(0)+"%)",{margin: '8px 4px 2px 2px'})],ui.Panel.Layout.flow('horizontal'),{backgroundColor: bgColor}),
  ui.Label('Rankings de Pistas de Pouso por Terra Indígena',subtitlestyle),
  info_TI_dict,
  ui.Label('Rankings de Pistas de Pouso por UC',subtitlestyle),
  info_UC_dict,
  // ui.Label('Rankings de Pistas de Pouso a Menos de 5km, Agregadas por Terra Índigena',subtitlestyle),
  // info_TI5km_dict,
  // chartTI,
  ui.Label('Rankings de Pistas de Pouso por UF',subtitlestyle),
  info_UF_dict,
  ui.Label('Rankings de Pistas de Pouso por Municípios',subtitlestyle),
  info_muni_dict,
  ui.Label('Seleciona a data do Mosaico Sentinel-2:',{margin: '8px 0 0 8px',backgroundColor:bgColor}),
  dropdownPanel,
  ui.Label('Clique no ponto indicativo de pista de pouso para mais detalhes',subtitlestyle),
  clickPanel,
  info,
  ],'flow',{backgroundColor: bgColor})
);
var startlat=ee.Algorithms.If(ui.url.get('lat'),ui.url.get('lat'),-7.208371595682682).getInfo();
var startlon=ee.Algorithms.If(ui.url.get('lon'),ui.url.get('lon'),-56.65957900771589).getInfo();
var startzoom=ee.Algorithms.If(ui.url.get('zoom'),ui.url.get('zoom'),9).getInfo();
mapPanel.setCenter(startlon,startlat,startzoom);
ui.root.clear();
ui.root.add(ui.SplitPanel(mapPanel,panel));
mapPanel.onChangeBounds(changeURL);
mapPanel.onClick(pointInfo);
///////////////////////////////////////////////////////////////////////////
function changeURL(input){
  ui.url.set({'lon':input.lon,'lat':input.lat,'zoom':input.zoom});
}
// Totorial https://gis.stackexchange.com/questions/384236/how-to-print-properties-of-a-clicked-feature-to-a-panel-in-earth-engine-apps
function pointInfo(coords){
  var lon=coords.lon;
  var lat = coords.lat;
  clickPanel.clear();
  var point = ee.Geometry.Point(lon, lat);
  // var alertday = ee.Number(pistas.reduceRegion({reducer:ee.Reducer.first(),geometry:point,scale:5}).get('alertdate'));
  clickPanel.add(ui.Label({value:'Lon: '+lon.toFixed(5)+', Lat: '+lat.toFixed(5), style: {whiteSpace: 'pre',backgroundColor:bgColor}}));
  getProps(point, pistas) 
  // if(alertday.gt(0).getInfo()){alertInfo(alertday,lat,lon,point)}
  // else{clickPanel.add(ui.Label('no landing track at clicked location'));}
}
function getProps(pointLoc, fc) {
  var inspet = mapPanel.widgets().get(0)
  inspet.widgets().set(0, ui.Label({
    value: 'Carregando...',
    style: {color: 'gray'}
  }));
  var SEARCH_DISTANCE = 550;  // Meters.
  // loc = ee.Dictionary(loc);
  // var point = ee.Geometry.Point(loc.getNumber('lon'), loc.getNumber('lat'));
  var point = pointLoc
  var thisFeature = fc.filterBounds(
    point.buffer(SEARCH_DISTANCE)).map(function(ft) {
      return ft.set('system:click_distance', point.distance(ft.geometry()));
  })
  .sort('system:click_distance').first();
  if(ee.FeatureCollection([thisFeature]).size().eq(0).getInfo()){
    clickPanel.add(ui.Label({value:'Sem pista de pouso no local selecionado',style: {whiteSpace: 'pre',backgroundColor:bgColor}}))
    info.setValue('')
    inspet.widgets().set(0, ui.Label({
    value: 'Sem pista de pouso no local selecionado',
    style: {color: 'gray'}
  }));
  }else{
    var props = thisFeature.toDictionary();
    props.evaluate(function(props) {
      var str = '';
      Object.keys(props).forEach(function(i) {
        str = str + i + ': ' + props[i] + '\n';
      });
      // clickPanel.add(str)
      info.setValue(str);
      // print(str)
      inspet.widgets().set(0, ui.Label({
        style: {whiteSpace: 'pre',backgroundColor:bgColor},
          value:str,
        }))
    }); 
  }
}
 ti_dict.evaluate(function(props) {
      var str = '';
      var items = Object.keys(props).map(function(key) {
        return [key, props[key]];
      });
      // Sort the array based on the second element
      items.sort(function(first, second) {
        return second[1] - first[1];
      });
      // Create a new array with only the first 5 items
      items = items.slice(0, 20);
      var index = 1
      items.forEach(function(i) {
        str = str +index+' - '+ i[0] + ': ' +i[1] + '\n';
        index+=1
      });
      info_TI_dict.setValue(str);
    });
 uc_dict.evaluate(function(props) {
      var str = '';
      var items = Object.keys(props).map(function(key) {
        return [key, props[key]];
      });
      // Sort the array based on the second element
      items.sort(function(first, second) {
        return second[1] - first[1];
      });
      // Create a new array with only the first 5 items
      items = items.slice(0, 20);
      var index = 1
      items.forEach(function(i) {
        str = str +index+' - '+ i[0] + ': ' +i[1] + '\n';
        index+=1
      });
      info_UC_dict.setValue(str);
    });
ti5km_dict.evaluate(function(props) {
    var str = '';
    var items = Object.keys(props).map(function(key) {
      return [key, props[key]];
    });
    // Sort the array based on the second element
    items.sort(function(first, second) {
      return second[1] - first[1];
    });
    // Create a new array with only the first 5 items
    items = items.slice(0, 20);
    var index = 1
    items.forEach(function(i) {
      str = str +index+' - '+ i[0] + ': ' +i[1] + '\n';
      index+=1
    });
    info_TI5km_dict.setValue(str);
  });
 uf_dict.evaluate(function(props) {
      var str = '';
      var items = Object.keys(props).map(function(key) {
        return [key, props[key]];
      });
      // Sort the array based on the second element
      items.sort(function(first, second) {
        return second[1] - first[1];
      });
      // Create a new array with only the first 5 items
      items = items.slice(0, 9);
      var index = 1
      items.forEach(function(i) {
        str = str +index+' - '+ i[0] + ': ' +i[1] + '\n';
        index+=1
      });
      info_UF_dict.setValue(str);
    }); 
 municipio_dict.evaluate(function(props) {
      var str = '';
      var items = Object.keys(props).map(function(key) {
        return [key, props[key]];
      });
      // Sort the array based on the second element
      items.sort(function(first, second) {
        return second[1] - first[1];
      });
      // Create a new array with only the first 5 items
      items = items.slice(0, 20);
      var index = 1
      items.forEach(function(i) {
        str = str +index+' - '+ i[0] + ': ' +i[1] + '\n';
        index+=1
      });
      info_muni_dict.setValue(str);
    }); 
dataTI.evaluate(function(dataTI) {
  var chart = ui.Chart(dataTI).setChartType('BarChart').setOptions({
    title: 'Pistas de pouso em Terras Indígenas a 5 km ou menos de um garimpo',
    hAxis: {
      // title: 'Terra Indígena',
      title: 'Porcentagem de pistas de pouso à menos de 5 kms de algum garimpo',
      titleTextStyle: {italic: false, bold: true},
    },
    vAxis: {
      // title: 'Quantidade de Pistas de Pouso',
      title: 'Terra Indígena',
      titleTextStyle: {italic: false, bold: true}
    },
    lineWidth: 5,
    colors: ['e37d05', '1d6b99'],
    legend: {position: 'none'},
  });
  chartTI.add(chart);
  // panel.add(chart)
});