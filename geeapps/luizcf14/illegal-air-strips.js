var pistas = ee.FeatureCollection('projects/solvedltda/assets/Pistas_de_Pouso_02_Fev_2023_v1')
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
var bgColor = '#F7F7FA';//#F8F9FA';
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
var monthSelector = ui.Select({
  placeholder: 'Carregando..',
  })
var button = ui.Button('Carregar')
dropdownPanel.add(yearSelector)
dropdownPanel.add(monthSelector)
dropdownPanel.add(button)
// Let's add a dropdown with the years
var currYear =  new Date().getFullYear()
var years = ee.List.sequence(2020, currYear)
var months = ee.List.sequence(1, 12)
// Dropdown items need to be strings
var yearStrings = years.map(function(year){
  return ee.Number(year).format('%04d')
})
var monthStrings = months.map(function(month){
  return ee.Number(month).format('%02d')
})
// Evaluate the results and populate the dropdown
yearStrings.evaluate(function(yearList) {
  yearSelector.items().reset(yearList)
  yearSelector.setPlaceholder('Selecione o Ano')
})
monthStrings.evaluate(function(monthList) {
  monthSelector.items().reset(monthList)
  monthSelector.setPlaceholder('Selecione o Mês')
})
var pistas_ui_Map = ui.Map.Layer(pistas,{color:'#FF0000'},'Pistas de Pouso')
// Define a function that triggers when any value is changed
var loadComposite = function() {
  mapPanel.clear();
  var year  = yearSelector.getValue()
  var month = monthSelector.getValue()
  var planetImg = ee.Image('projects/planet-nicfi/assets/basemaps/americas/planet_medres_normalized_analytic_'+year+'-'+month+'_mosaic')
  var planet_ui_Map = ui.Map.Layer(planetImg, {
  "bands":["R", "G", "B"],
  "min": [200,200,50],
  "max":[1700,1400,1100],
  "gamma": 1.35, 
  },'planet_'+year+'-'+month,true)
  mapPanel.add(planet_ui_Map);
  var pistas_ui_Map = ui.Map.Layer(pistas,{color:'#FF0000'},'Pistas de Pouso')
  mapPanel.add(pistas_ui_Map);
}
button.onClick(loadComposite)
var year  = "2022"
var month = "07"
var planetImg = ee.Image('projects/planet-nicfi/assets/basemaps/americas/planet_medres_normalized_analytic_'+year+'-'+month+'_mosaic')
var planet_ui_Map = ui.Map.Layer(planetImg, {
"bands":["R", "G", "B"],
"min": [200,200,50],
"max":[1700,1400,1100],
"gamma": 1.35, 
},'planet_'+year+'-'+month,true)
 mapPanel.add(planet_ui_Map)
 mapPanel.add(pistas_ui_Map);
// panel.add(info);
panel.add(
  ui.Panel([ui.Label({value: 'Pistas de Pouso na Amazonia Brasileira', style: {fontSize: '20px', fontWeight: 'bold', backgroundColor: bgColor}}),
  ui.Panel([ui.Label("Há um problema logístico intrínseco à atividade de garimpar, em especial dentro de Terras Indígenas e Unidades de Conservação. Sem grandes rotas de acesso terrestre ou até mesmo fluvial, o escoamento da produção do ouro garimpeiro tem grande relação com a existência de pistas de pouso ilegais, ou mesmo legais, porém cooptadas para servir aos interesses do garimpo. Seja por helicópteros ou aviões de pequeno-porte, grande parte da produção garimpeira amazônica é feita por via aérea. Portanto, Identificar as pistas de pouso encravdas na floresta Amazônica é tarefa essencial na busca por estrangular a logistica de avanço do garimpo ilegal. Sabedor desta necessidade, estamos trabalhando naa Solved entrega à sociedade civíl e aos tomadores de decisão, da primeira base de dados, pública e gratuita, de localização das pistas de pouso, sejam elas legais ou ilegais, dentro de toda a extensão do bioma Amazônico. Estes dados também serão disponibilizados através da rede Mapbiomas em breve.",{backgroundColor: bgColor,margin: '8px 4px 2px 8px'}),ui.Label("Data download",{backgroundColor: bgColor},"https://drive.google.com/file/d/1TBfdK8nzwq_hdZZNoV1W4jpBbXNAIfPu/view?usp=drivesdk"),],ui.Panel.Layout.flow('vertical'),{backgroundColor: bgColor}),
  chartTI,
  ui.Label('Rankings de Pistas de Pouso por UF',subtitlestyle),
  info_UF_dict,
  ui.Label('Rankings de Pistas de Pouso por Municípios',subtitlestyle),
  info_muni_dict,
  ui.Label('Seleciona a data do Mosaico Planet:',{margin: '8px 0 0 8px',backgroundColor:bgColor}),
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
  var SEARCH_DISTANCE = 500;  // Meters.
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
  }else{
    var props = thisFeature.toDictionary();
    props.evaluate(function(props) {
      var str = '';
      Object.keys(props).forEach(function(i) {
        str = str + i + ': ' + props[i] + '\n';
      });
      // clickPanel.add(str)
      info.setValue(str);
    }); 
  }
}
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
      items = items.slice(0, 5);
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
      title: 'Porcentagem de pistas de pouso à menos de 5 km de algum garimpo',
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