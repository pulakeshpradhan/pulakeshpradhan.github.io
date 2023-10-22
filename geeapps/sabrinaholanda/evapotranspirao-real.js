/* 
  Aplicação do algotirmo S-SEBI para cálculo da Evapotranspiração Real Diária (milímetros)
  -Equação inicial do Balanço de Energia:
  LE = Rn - G - H (EQ1)
  -Fluxo de calor latente (LE) e sensível (H) são expressos como a 
  Fração Evaporativa (FE):
  FE = LE / (Rn - G) (EQ2)
  -A EQ1 é transcrita como evapotranspiração real diária:
  ETd = 86 * 4*FE * ((Rnd - Gd) / l) (EQ3) d = diária
  l = calor latente de vaporização da água = 2450 KJ.kg-1
*/
/***************************** CÓDIGO *****************************/
// Extração do Rn direto do ERA-5 Hourly
// Criando um ponto com a coordenada estabelecida (Torre Insa)
var coordenada = ee.Geometry.Point(-37.2514, -6.5783);
var geometry = ee.FeatureCollection('users/ulissesalencar17/caatinga');
var ROI = geometry;
Map.centerObject(coordenada, 5);
Map.addLayer(coordenada,{},'Torre INSA');
Map.addLayer(ROI, {}, 'ROI');
// Função para Recorte da Área de Estudo
var clipper = function(image){
  return image.clip(geometry);
}; 
// Estabelecendo a data inicial e a data final
var startYear = 2014;
var endYear = 2015;
var startDate = ee.Date.fromYMD(startYear, 1, 1);
var endDate = ee.Date.fromYMD(endYear, 1, 1);
var start = startDate;
var end = endDate;
var numberOfDays = end.difference(start, 'days');
// print(numberOfDays);
var Listdays = ee.List.sequence(1,numberOfDays);
// print('Meses do ano:',Listdays);
var ListYears = ee.List.sequence(startYear, endYear);
// print('Periodo com anos:',ListYears);
var ListMonths = ee.List.sequence(1,12);
// print('Meses do ano:',ListMonths);
var climatic_day = ee.ImageCollection("ECMWF/ERA5_LAND/HOURLY")
                  .select(['surface_net_solar_radiation_hourly','surface_net_thermal_radiation_hourly'])
                  .map(clipper);
            // .filterDate(startDate, endDate);
var daily = ee.ImageCollection(
  ee.List.sequence(0, numberOfDays.subtract(1))
    .map(function (dayOffset) {
      var start_ = start.advance(dayOffset, 'days');
      var end_ = start_.advance(1, 'days');
     var bd = start_; // '2020-01-01'
     var ed = bd.advance(1, 'days');   // '2021-01-01'
     var serie_diaria = climatic_day.filterDate(bd, ed); // ee.ImageCollection()
     var climatica_day = serie_diaria.sum().divide(86400);
     return climatica_day.set('system:time_start', serie_diaria.first().get('system:time_start'));
    })
);
// print(daily);
var calc_Rn_d = function(image){
  var convert_Rs = image.select(['surface_net_solar_radiation_hourly']);
  var convert_Rl = image.select(['surface_net_thermal_radiation_hourly']);
  var Rn_d = convert_Rs.add(convert_Rl);
  return image.set('system:time_start',image.get('system:time_start'))
  .addBands(ee.Image(Rn_d).rename('Rn_d').float());
};
var Rn_d = daily.map(calc_Rn_d).map(function(img) {
    var date = img.date().format('YYYY-MM-dd');
    return img.set('date', date);
});
// print('Rn_d:', Rn_d);
var Rn_d_end = Rn_d.select('Rn_d');
// print('Rn_d_end:', Rn_d_end);
// Map.addLayer(Rn_d_end,{},'Rn_d_end');
/* Calculando a FE (Fração Evaporativa diária):
    Necessário determinar a Temperatura de Superfície (TS), Temperatura do Pixel quente/frio (Tpq e Tpf)
    Para determinar Tpq e Tpf tem que determinar Albedo, NDVI e TS */
// Calculando Albedo e NDVI
var dataset_MCD43A4 = ee.ImageCollection('MODIS/006/MCD43A4')
                  .filter(ee.Filter.date(start, end))
                  .filterBounds(ROI)
                  .map(clipper)
                  .map(function(img) {
    var date = img.date().format('YYYY-MM-dd');
    return img.set('date', date);
});
//print(dataset_MCD43A4)
var scale1 = function(scene) { // função para multiplicar pela escala
  var scl = scene.multiply(0.0001);
  return scl.set('system:time_start',scene.get('system:time_start'));
};
// var dateString = ee.Date (scene.get('system:time_start')).format('yyyy-MM-dd');
var reflec_nadir = dataset_MCD43A4.map(scale1); // multiplicando o dataset pela escala
// Map.addLayer(reflec_nadir, {}, 'reflec_nadir');
var calc_Alb_NDVI = function(image){
  var b1 = image.select(['Nadir_Reflectance_Band1']);
  var b2 = image.select(['Nadir_Reflectance_Band2']);
  var b3 = image.select(['Nadir_Reflectance_Band3']);
  var b4 = image.select(['Nadir_Reflectance_Band4']);
  var b5 = image.select(['Nadir_Reflectance_Band5']);
  var b6 = image.select(['Nadir_Reflectance_Band6']);
  var b7 = image.select(['Nadir_Reflectance_Band7']);
  var albedo = (b1.multiply(0.215)).add(b2.multiply(0.215))
  .add(b3.multiply(0.242)).add(b4.multiply(0.129))
  .add(b5.multiply(0.101)).add(b6.multiply(0.062))
  .add(b7.multiply(0.036)).rename('Albedo');
  var ndvi = (b2.subtract(b1)).divide(b2.add(b1)).rename('NDVI');
  return image.set('system:time_start',image.get('system:time_start'))
  .addBands(ee.Image(albedo).rename('Albedo').float())
  .addBands(ee.Image(ndvi).rename('NDVI').float())
  .clip(ROI);
};
var Alb_NDVI = reflec_nadir.map(calc_Alb_NDVI).map(function(img) {
    var date = img.date().format('YYYY-MM-dd');
    return img.set('date', date);
});
var Albedo_NDVI = Alb_NDVI.select(['Albedo','NDVI']);
// print('Albedo e NDVI:', Albedo_NDVI);
// Map.addLayer(Alb_NDVI, {}, 'Albedo e NDVI');
// Temperatura de Superficie da Terra (LST)
var scale2 = function(scene) {
  var scl = scene.multiply(0.02);
  return scl.set('system:time_start',scene.get('system:time_start'));
};
var LST_Terra = ee.ImageCollection('MODIS/006/MOD11A1')
  .filterDate(start, end)
  .filterBounds(ROI)
  .select('LST_Day_1km')
  .map(scale2)
  .map(clipper)
  .map(function(img) {
    var date = img.date().format('YYYY-MM-dd');
    return img.set('date', date).rename('LST_Day_Terra');
});
// print('Temperatura da Superfície Terrestre (MODIS_Terra):', LST_Terra);
// Map.addLayer(LST_Terra,{},'LST_Terra');
var LST_Aqua = ee.ImageCollection("MODIS/006/MYD11A1")
  .filterDate(start, end)
  .filterBounds(ROI)
  .select('LST_Day_1km')
  .map(scale2)
  .map(clipper)
  .map(function(img) {
    var date = img.date().format('YYYY-MM-dd');
    return img.set('date', date).rename('LST_Day_Aqua');
});
// print('Temperatura da Superfície Terrestre (MODIS_Aqua):', LST_Aqua);
// Map.addLayer(LST_Aqua,{},'LST_Aqua');
// Unindo conjunto de dados
var filterTimeEq = ee.Filter.equals({
  leftField: 'date',
  rightField: 'date'
});
var junção = function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
};
var Data_set_combine0 = ee.ImageCollection(ee.Join.inner().apply(Albedo_NDVI, LST_Terra, filterTimeEq)).set('foo', null);
var Data_set_combine1 = Data_set_combine0.map(junção);
var Data_set_combine2 = ee.ImageCollection(ee.Join.inner().apply(Rn_d_end, Data_set_combine1, filterTimeEq));
var Data_set_combine3 = Data_set_combine2.map(junção);
var Data_set_combine4 = ee.ImageCollection(ee.Join.inner().apply(LST_Aqua, Data_set_combine3, filterTimeEq));
var Data_set_combine = Data_set_combine4.map(junção).map(function(img) {
    var date = img.date().format('YYYY-MM-dd');
    return img.set('date', date);
});
// print(Data_set_combine,'Data_set_combine');
// Seleção pixels quente e frio
// Estabelecendo os critérios para essa seleção (limiares)
// Pixel quente
var calc_pq = function(image){
  var NDVIbands = image.select(['NDVI']);
  var ndvi_cand_pq = NDVIbands.reduceRegion({
  reducer: ee.Reducer.percentile([10]),
  geometry: ROI,
  //scale: 30,
  bestEffort: true
  //maxPixels: 1e9
  });
  ndvi_cand_pq = ndvi_cand_pq.toImage();
  ndvi_cand_pq = ndvi_cand_pq.clip(ROI);
  var cand_ndvi = NDVIbands.gt(0.10).and(NDVIbands.lte(ndvi_cand_pq));
  cand_ndvi = cand_ndvi.selfMask();
  var LST_ESCbands = image.select(['LST_Day_Aqua']);
  var temp_pq = LST_ESCbands.multiply(cand_ndvi);
  var lst_cand_pq = temp_pq.reduceRegion({
  reducer: ee.Reducer.percentile([97.5]),
  geometry: ROI,
  //scale: 30,
   bestEffort: true
  //maxPixels: 1e9
  });
  lst_cand_pq = lst_cand_pq.toImage();
  lst_cand_pq = lst_cand_pq.clip(ROI);
  var cand_lst = LST_ESCbands.gte(lst_cand_pq).multiply(cand_ndvi);
  cand_lst = cand_lst.selfMask();
  var temp_pq1 = cand_lst.rename('temp_pq1');
  return image.set('system:time_start',image.get('system:time_start'))
  .addBands(ee.Image(temp_pq1).float());
};
var joinedMODIS_select = Data_set_combine.map(calc_pq);
// print(joinedMODIS_select,'joinedMODIS_select_pq');
// Map.addLayer(joinedMODIS_select.select('temp_pq1').toBands(), {},'joinedMODIS_select_pq');
// frio
var calc_pf = function(image){
  var NDVIbands = image.select(['NDVI']);
  var ndvi_cand_pf = NDVIbands.reduceRegion({
  reducer: ee.Reducer.percentile([95]),
  geometry: ROI,
  //scale: 30,
  bestEffort: true
  //maxPixels: 1e9
  });
  ndvi_cand_pf = ndvi_cand_pf.toImage();
  ndvi_cand_pf = ndvi_cand_pf.clip(ROI);
  var cand_ndvi = NDVIbands.gte(ndvi_cand_pf);
  cand_ndvi = cand_ndvi.selfMask();
  var LST_ESCbands = image.select(['LST_Day_Aqua']);
  var temp_pf = LST_ESCbands.multiply(cand_ndvi);
  var lst_cand_pf = temp_pf.reduceRegion({
  reducer: ee.Reducer.percentile([2.5]),
  geometry: ROI,
  //scale: 30,
   bestEffort: true
  //maxPixels: 1e9
  });
  lst_cand_pf = lst_cand_pf.toImage();
  lst_cand_pf = lst_cand_pf.clip(ROI);
  var cand_lst = LST_ESCbands.lte(lst_cand_pf).multiply(cand_ndvi);
  cand_lst = cand_lst.selfMask();
  var temp_pf1 = cand_lst.rename('temp_pf1');
  return image.set('system:time_start',image.get('system:time_start'))
  .addBands(ee.Image(temp_pf1).float());
};
var joinedMODIS_select = joinedMODIS_select.map(calc_pf);
// print(joinedMODIS_select,'joinedMODIS_select_pf');
// Map.addLayer(joinedMODIS_select.select('temp_pf1').toBands(), {},'joinedMODIS_select_pf');
// FE
var calc_FE = function(image){
  var temp_pf1 = image.select(['temp_pf1']);
  var temp_pq1 = image.select(['temp_pq1']);
  var LST_ESCbands = image.select(['LST_Day_Aqua']);
  var lst_hot = (LST_ESCbands.multiply(temp_pq1));
  var lst_hot_temp = lst_hot.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: ROI,
  //scale: 30,
   bestEffort: true
  //maxPixels: 1e9
  });
  lst_hot_temp = lst_hot_temp.toImage().rename('lst_hot_temp');
  lst_hot_temp = (lst_hot_temp.clip(ROI));
  var lst_cold = (LST_ESCbands.multiply(temp_pf1));
  var lst_cold_temp = lst_cold.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: ROI,
  //scale: 30,
   bestEffort: true
  //maxPixels: 1e9
  });
  lst_cold_temp = lst_cold_temp.toImage().rename('lst_cold_temp');
  lst_cold_temp = (lst_cold_temp.clip(ROI));
  var FE = ((lst_hot_temp.subtract(LST_ESCbands)).divide(lst_hot_temp.subtract(lst_cold_temp)))
  .rename('FE');
  return image.set('system:time_start',image.get('system:time_start'))
  .addBands(ee.Image(lst_hot_temp).float())
  .addBands(ee.Image(lst_cold_temp).float())
  .addBands(ee.Image(FE).float());
};
var joinedMODIS_select = joinedMODIS_select.map(calc_FE);
// print(joinedMODIS_select,'joinedMODIS_select_FE');
// var pqpf = joinedMODIS_select.select(['lst_hot_temp','lst_cold_temp']);
// // print(pqpf,'pqpf');
// Map.addLayer(pqpf,{},'pqpf');
var FE = joinedMODIS_select.select(['FE']);
// print(FE,'FE');
// var FE = FE.toBands();
// Map.addLayer(FE,{},'FE');
// Calculando a Evapotranspiração Real diária(ETr_d)
var calc_et = function(image){
   var FE = image.select(['FE']);
   var Rn_1 = image.select(['Rn_d']);
   var ETr = (FE.multiply(0.035).multiply(Rn_1)).rename('ETr');
   return image.set('system:time_start',image.get('system:time_start'))
  .addBands(ee.Image(ETr).float());
};
var joinedMODIS_select = joinedMODIS_select.map(calc_et);
// print(joinedMODIS_select,'joinedMODIS_select_ETr');
var ETr = joinedMODIS_select.select(['ETr']);
Map.addLayer(ETr,{},'ETr');
// Exportando os dados de ETr_diária
var ETr_SSEBI = joinedMODIS_select.select('ETr');
// print(ETr_SSEBI);
var Etr_export = ETr_SSEBI.toBands();
// print(Etr_export);
var ETR = Etr_export.reduceRegion(ee.Reducer.first(),coordenada,30);
print(ETR);
// Export.table.toDrive({
//   collection: ETR,
//   description: 'Etr_SSEBI_Aqua',
//   fileFormat: 'CSV'
// });
/***************************** APP *****************************/
// 1) SETUP e ESTILOS 
var colors = {'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var title_style = {
  fontWeight: 'bold',
  fontSize: '32px',
  padding: '8px',
  color: '#616161',
  textAlign: 'center',
  backgroundColor: colors.transparent,
};
var subtitle_style = {
  fontWeight: 'bold',
  fontSize: '16px',
  padding: '8px',
  color: '#616161',
  textAlign: 'center',
  //maxWidth: '450px',
  backgroundColor: colors.transparent,
};
var paragraph_style = {
  fontSize: '14px',
  fontWeight: '50',
  color: '#616161',
  padding: '8px',
  maxWidth: '500px',
  textAlign: 'center',
  backgroundColor: colors.transparent,
};
var button_style = {
  fontSize: '14px',
  fontWeight: '100',
  color: '#616161',
  padding: '8px',
  textAlign: 'center',
  backgroundColor: colors.transparent,
};
var select_style = {
  fontSize: '14px',
  fontWeight: '50',
  color: '#616161',
  padding: '8px',
  textAlign: 'center',
  backgroundColor: colors.transparent,
  width: '80px'
};
var label_style = {
  fontWeight: '50',
  textAlign: 'center',
  fontSize: '14px',
  padding: '8px',
  backgroundColor: colors.transparent,
};
// 2) ROOT PANEL 
// Criar slide panel facilita a visualização de informações (ex: gráfico)
var infoPanel = ui.Panel({
    layout: ui.Panel.Layout.flow(), 
    style: {
      stretch: 'horizontal',
      height: '100%',
      width: '450px',
      backgroundColor: colors.gray
    }
});
var mappingPanel = ui.Map({
    center: {'lat': -7.28053, 'lon': -35.9763, 'zoom': 5},
    style: {cursor: 'crosshair'}
});
ui.root.clear();
ui.root.add(ui.SplitPanel(mappingPanel, infoPanel)); // ORDEM IMPORTA!
mappingPanel.addLayer(ROI, {}, 'Caatinga')
// 3) PAINÉIS PRINCIPAIS 
var seasonPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'), 
  style: {backgroundColor: colors.transparent}
});
var visPanel = ui.Panel({
  style: {backgroundColor: colors.transparent}
}); 
var graphPanel = ui.Panel({
  style: {backgroundColor: colors.transparent}
});
////////////////////////////
/////// INFO PANEL /////////
////////////////////////////
infoPanel.add(ui.Label('Estimativa de Evapotranspiração Real', title_style));
var app_description = 'Este APP foi desenvolvido pelo Grupo de Pesquisa ' + 
'de Evapotranspiração da Universidade Federal de Campina Grande (UFCG) '+
'com o objetivo de estimar a Evapotranspiração Real (ETr) utilizando o modelo S-SEBI.';
infoPanel.add(ui.Label(app_description, paragraph_style));
infoPanel.add(ui.Label('Versão 0.2. Última atualização: 23/11/2021.', paragraph_style));
var InfoButton_Panel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    backgroundColor: colors.transparent, 
    textAlign: 'center', 
    stretch: 'both', 
    padding: '4px'
  }
});
infoPanel.add(InfoButton_Panel);
var FAQ_PANEL = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    widgets:[
      ui.Label({
        value:'Como usar esse APP?',
        style: subtitle_style
      }),
      ui.Label({
        value: '1. Insira o período de análise no formato yyyy-mm-dd',
        style: paragraph_style
      }),
      ui.Label({
        value:'2. Clique no mapa para gerar uma região de interesse',
        style: paragraph_style
      }),
      ui.Label({
        value:'3. Clique no botão "Search" para dar um zoom na região',
        style: paragraph_style
      }),
      ui.Label({
        value:'4. Clique no botão "Run" para gerar o mapa com a mediana da evapotranspiração real',
        style: paragraph_style
      }),
      ui.Label({
        value:'5. Para o download da imagem, clique em "Baixar"',
        style: paragraph_style
      })
    ],
    style: {
    position: 'top-center',
    shown: true,
    width: '40%',
    height: 'auto',
    padding: '5px',
    margin: '10px',
    }
  });
var FAQButton = ui.Button({
  label: 'Como usar esse APP?',
   style: button_style,
   onClick: function(){mappingPanel.add(FAQ_PANEL)}
});
var CloseButton = ui.Button({
  label: 'Close',
  style: button_style,
  onClick: function(){mappingPanel.remove(FAQ_PANEL);
  }
});
FAQ_PANEL.add(CloseButton);
var About_SSEBI_Panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  widgets:[
    ui.Label({
      value:'Simplified Surface Energy Balance Index (S-SEBI)',
      style: subtitle_style
    }),
    ui.Label({
      value:'Este modelo considera que, em condições atmosféricas constantes,'+
      'é possível estimar o fluxo de energia a partir da imagem obtida por'+
      'sensoriamento remoto sem necessidade de outro tipo de informação.' + 
      'Assim, o modelo se baseia na temperatura de radiação e do albedo de superfície'+
      'para estimar a ET',
      style: paragraph_style
    }),
    ui.Label({
      value: 'ROERINK, G. J.; SU, Z.; MENENTI, M. S-SEBI: A simple remote sensing algorithm'+
      'to estimate the surface energy balance. Physics and Chemistry of the Earth, Part B:' +
      'Hydrology. Oceans and Atmosphere. v.25, n. 2, p. 147-157. 2000.',
      style: {textAlign: 'left',padding: '10px',  margin: 'auto',fontSize:'10px'}
    })
  ],
  style: {
  position: 'top-center',
  shown: true,
  width: '40%',
  height: 'auto',
  padding: '5px',
  margin: '10px',
  }
});
var SSEBI_Button = ui.Button({
  label: 'Sobre S-SEBI',
  style: button_style,
  onClick: function(){mappingPanel.add(About_SSEBI_Panel)}
});
InfoButton_Panel.add(FAQButton).add(SSEBI_Button);
var CloseButtonSSEBI = ui.Button({
  label: 'Close',
  style: button_style,
  onClick: function(){mappingPanel.remove(About_SSEBI_Panel);
  }
});
About_SSEBI_Panel.add(CloseButtonSSEBI);
////////////////////////////
/////// SEASON PANEL ///////
////////////////////////////
infoPanel.add(seasonPanel);
//infoPanel.insert(4, ui.Label('PERÍODO DE ANÁLISE', subtitle_style));
seasonPanel.add(ui.Label({
  value: 'PERÍODO DE ANÁLISE',
  style: subtitle_style
  })
);
var DataSearchPanel= ui.Panel({
  layout: ui.Panel.Layout.flow("horizontal"), 
  style: {
    position: 'top-center',
    backgroundColor: colors.transparent}
});
//START DATE
var startPanel = ui.Panel({style: {backgroundColor: colors.transparent}});
var startLabel = ui.Label('Data inicial:', label_style);
var startDate = ui.Textbox({ 
  value: "2014-01-01", 
  placeholder:"yyyy-mm-dd",
  style: paragraph_style
});
startPanel.add(startLabel).add(startDate);
//END DATE
var endPanel = ui.Panel({style: {backgroundColor: colors.transparent}});
var endLabel = ui.Label('Data final:', label_style);
var endDate = ui.Textbox({ 
 value: "2014-12-31", 
 placeholder:"yyyy-mm-dd",
 style: paragraph_style
});
endPanel.add(endLabel).add(endDate);
DataSearchPanel.add(startPanel).add(endPanel);
seasonPanel.add(DataSearchPanel);
/*
var month_list = [
  {label: 'Janeiro', value: 1},
  {label: 'Fevereiro', value: 2},
  {label: 'Março', value: 3},
  {label: 'Abril', value:  4},
  {label: 'Maio', value:  5},
  {label: 'Junho',value:  6},
  {label: 'Julho', value:  7},
  {label: 'Agosto',value:  8},
  {label: 'Setembro', value: 9},
  {label: 'Outubro', value: 10},
  {label: 'Novembro', value: 11},
  {label: 'Dezembro', value: 12}
];
var month_start = ui.Select({
  items: month_list, 
  placeholder: 'Selecione um mês', 
  value: 1, 
  style: select_style
});
var month_end = ui.Select({
  items: month_list,
  placeholder: 'Selecione um mês',
  value:  12,
  style: select_style
});
seasonPanel.add(month_start).add(month_end);
*/
//infoPanel.insert(5, ui.Label('LOCAL DE ANÁLISE', subtitle_style));
seasonPanel.add(ui.Label({
  value: 'LOCAL DE ANÁLISE',
  style: subtitle_style
  })
);
//var local_name = ui.Label('Defina as coordenadas do pixel:', label_style);
var lon_text =ui.Textbox({ 
 value: "Longitude", 
 style: paragraph_style}); 
var lat_text =ui.Textbox({ 
 value: "Latitude", 
 style: paragraph_style}); 
var latlon_search = ui.Button({
  label: 'Search',
   style: button_style});
var LatLon_location =  ui.Panel({
  layout: ui.Panel.Layout.flow("vertical"), 
  style: {
    position: 'top-center', 
    //margin: 'auto', 
    backgroundColor: colors.transparent
  },
  widgets: [
    ui.Panel({
      layout: ui.Panel.Layout.flow("horizontal"), 
      style: {
        position: 'top-center', 
        //margin: 'auto',
        backgroundColor: colors.transparent
      },
      widgets: [lon_text,lat_text]
    }),
  latlon_search]
});
//seasonPanel.add(lon_text).add(lat_text);
//seasonPanel.add(latlon_search);
seasonPanel.add(LatLon_location);
mappingPanel.onClick(function(coords){
  var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                 'lat: ' + coords.lat.toFixed(4);
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
  lon_text.setValue(coords.lon);
  lat_text.setValue(coords.lat);
});
latlon_search.onClick(function() {
  var click_point = ee.Geometry.Point([
    lon_text.getValue(),
    lat_text.getValue()
  ]);
  //mappingPanel().reset();
  mappingPanel.layers().set(1, ui.Map.Layer(
    click_point, {color: '#000000'},'Point')
  );
  mappingPanel.setCenter(lon_text.getValue(),lat_text.getValue(), 10);
});
///////////////////////////////////
/////// VISUALIZATION PANEL ///////
///////////////////////////////////
// 3.3 Construir a composição do mapa
// Seleção da escala
infoPanel.add(visPanel);
var rangePanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {backgroundColor: colors.transparent, padding: '4px'}});
var minPanel = ui.Panel({style: {backgroundColor: colors.transparent}});
var minLabel = ui.Label('ETr mínima:', label_style);
var minSlider = ui.Slider({
  min: -3, max: 10, value: 1.0, 
  style: {width: '125px', backgroundColor: colors.transparent}
});
minPanel.add(minLabel).add(minSlider);
var maxPanel = ui.Panel({style: {backgroundColor: colors.transparent}});
var maxLabel = ui.Label('ETr máxima:', label_style);
var maxSlider = ui.Slider({
  min: -3, max: 10, value: 7.0, 
  style: {width: '125px', backgroundColor: colors.transparent}
});
maxPanel.add(maxLabel).add(maxSlider);
rangePanel.add(minPanel).add(maxPanel);
visPanel.add(rangePanel);
// Make a panel to host the buttons (for layout purposes)
var buttonHold = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    backgroundColor: colors.transparent, 
    textAlign: 'center', 
    stretch: 'both', 
    padding: '4px',
    position: 'top-center'
  }
});
infoPanel.add(buttonHold);
// Add the run & clear buttons
var runButton = ui.Button({
  label: 'Run', 
  style: {
    width: '125px', 
    maxWidth: '250px', 
    color: '#616161',
  }
});
var clearButton = ui.Button({
  label: 'Limpar mapa', 
  style: {
    width: '125px', 
    maxWidth: '250px', 
    color: '#616161',
  }
});
buttonHold.add(runButton).add(clearButton);
// 3.3.1 Adding onMapClick function: adding a POI to the map
mappingPanel.add(ui.Label('Clique no mapa para criar um ponto de interesse'));
mappingPanel.onClick(function(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var point_layer = ui.Map.Layer(point, {}, 'POI');
  mappingPanel.setCenter(coords.lon, coords.lat);
  var layers = mappingPanel.layers();
  var names = [];
  layers.forEach(function(x) {
    var lay_name = x.getName();
    names.push(lay_name);
  });
  var index = names.indexOf('POI');
  if (index > -1) {
    var layer_POI = layers.get(index);
    mappingPanel.remove(layer_POI);
    mappingPanel.add(point_layer);
  }
  else {
    mappingPanel.add(point_layer);
  }
});
// 3.3.2 Adding onMapClick function: clear button
var clearMap = clearButton.onClick(function() {
  var layers = mappingPanel.layers();
  layers.forEach(function(x) {
    mappingPanel.remove(x);
  });
});
// 3.3.3 Adding onMapClick function: criar composição
var buildComposite = runButton.onClick(function() {
  var center_point = mappingPanel.getCenter();
  var buffer = center_point.buffer(5000).bounds();
  var MODIS_Region = joinedMODIS_select.filterBounds(buffer);
  var start = startDate.getValue();
  var end = endDate.getValue();
  var composite = MODIS_Region.filter(ee.Filter.date(start, end))
                              .median()
                              .clip(buffer)
                              .select('ETr')
                              .rename('ETr_s1');
  var comp = ui.Map.Layer(composite,
    {bands: ['ETr_s1'],
    min: minSlider.getValue(),
    max: maxSlider.getValue()},
    'ETr mediana');
  mappingPanel.add(comp);
});
//joinedMODIS_select.select(['ETr'])
var ET_Palette = {min: 0, max: 7, 
  palette: ['deac9c', 'EDD9A6', 'f2dc8d', 'fff199', 
            'b5e684', '3BB369', '20998F', '25b1c1', 
            '16678A', '114982', '0B2C7A']};
///////////////////////////
/////// GRAPH PANEL ///////
///////////////////////////
infoPanel.add(graphPanel);
var chartOnly = ui.Panel();
var displayGraph = ui.Button({label: 'Gerar gráfico', style: button_style});
var graphTitle = ui.Label('Gráfico da ETr Diária', subtitle_style);
graphPanel.add(graphTitle).add(displayGraph).add(chartOnly);
displayGraph.onClick(function(){
  chartOnly.clear();
  var center_point = mappingPanel.getCenter();
  var start = startDate.getValue();
  var end = endDate.getValue();
  var composite = joinedMODIS_select.filter(ee.Filter.date(start, end));
  var etr_time_series_POI = ui.Chart.image.doySeriesByYear({
    imageCollection: composite, 
    region: center_point.buffer(5000),
    regionReducer: ee.Reducer.mean(),
    bandName: 'ETr',
    scale: 1000}).setOptions({
      colors: ['red'],
      interpolateNulls: true,
      title: 'Evapotranspiração Real Média - 5000m buffer ao redor do ROI',
      hAxis: {title: 'Dia'},
      vAxis: {title: 'ETr'},
      legend: 'left'
    });
  chartOnly.add(etr_time_series_POI);
});
//var DownloadET_Button = ui.Button({label: 'Baixar', style: button_style});
var DownloadET_Button = ui.Label({value:"Baixar", style: button_style});  
var CheckBoxET = ui.Checkbox('', false);
var getURLET= function(){
  var center_point = mappingPanel.getCenter();
  var buffer = center_point.buffer(5000).bounds();
  var MODIS_Region = joinedMODIS_select.filterBounds(buffer);
  var start = startDate.getValue();
  var end = endDate.getValue();
  var composite = MODIS_Region.filter(ee.Filter.date(start, end))
                              .median()
                              .clip(buffer)
                              .select('ETr')
                              .rename('ETr_s1');
  var downloadUrl = composite.getDownloadURL({ 
    name: 'ETr',
    scale: 100,
    geometry:buffer,
    maxPixels: 10e18 });
  return downloadUrl;
};
CheckBoxET.onChange(function() {DownloadET_Button.setUrl(getURLET())});
var Products_Panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {backgroundColor: colors.transparent},
  widgets: [
    ui.Label({value:'DOWNLOAD', style: subtitle_style}),
    ui.Panel({
      layout:ui.Panel.Layout.flow("vertical"), 
      style: {position: 'top-center', backgroundColor: colors.transparent},
      widgets: [
        ui.Panel({
          layout: ui.Panel.Layout.flow("horizontal"),
          style: {position: 'top-center', backgroundColor: colors.transparent},
           widgets: [
             //ET_Button, 
             DownloadET_Button,
             CheckBoxET]
        })]  
    })
  ]
});
graphPanel.add(Products_Panel);
///////////////////////////
/////// LOGO PANEL ///////
///////////////////////////
var lab_hid = ee.Image('users/sabrinaholanda/lab_hid_II_final').resample('bicubic');
var ufcg = ee.Image('users/sabrinaholanda/logo_ufcg_final').resample('bicubic');
var Logos_Panel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    width: '205px',
    height: 'auto',
    padding: '10px',
    position: 'bottom-center'
  },
  widgets:[
    ui.Thumbnail({
      image:lab_hid,
      params:{bands:['b1','b2','b3'], min:0, max:255},
      style:{width:'80px', height:'auto', margin: 'auto', backgroundColor: colors.transparent}
    }),
    ui.Thumbnail({
      image:ufcg,
      params:{bands:['b1','b2','b3'], min:0, max:255},
      style:{width:'80px', height:'auto', margin: 'auto',  backgroundColor: colors.transparent}
    })
  ]
});
graphPanel.add(Logos_Panel);