// MODEL: S-SEBI Simplified Surface Energy Balance Index
//IMPLEMENTED BY: ULISSES A. BEZERRA
//PROJECT - EVAPOTRANSPIRATION IN SEMIARID
//LAB - Laboratory of Hydraulic-BU
//UNIVERSITY - UNIVERSIDADE FEDERAL DE CAMPINA GRANDE - UFCG
//BRAZIL, CAMPINA GRANDE - PB
//VERSION 0.2
//CONTATC US: ulisses.alencar@estudante.ufcg.edu.br
//
// CREATED IN: 29/06/2021 ALTERED IN:23/09/2021
//
//----------------------Analise na torre ------------------------------------------------------------------
//Entre com o ano! 
var StartYear = 2014;
var startDate = ee.Date.fromYMD(StartYear, 1, 1);
var endDate = (startDate.advance(1,'year')); 
//var pts = ee.Geometry.Point([-37.2514, -6.5783]); // ESEC (Estação conhecida)
Map.onClick(function(coords){
  //lon.setValue('lon: '+ coords.lon.toFixed(2));
  //lat.setValue('lat: '+ coords.lat.toFixed(2));
  var pts = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(pts, {color:'brown'});
  Map.layers().set(1, dot);
// Make a button widget.
//var pts = ui.Button('Click me!');
// Set a callback function to run when the
// button is clicked.
//pts.onClick(function() {
//  print('Hello, world!');
//});
// Display the button in the console.
//Map.add(pts);
//----------------------Analise temporal ------------------------------------------------------------------
// Analise temporal
// var StartYear = 2004;
// var EndYear = 2020;
// var diff_year = ee.Number(EndYear).subtract(StartYear).add(1);
// var ListYears = ee.List.sequence(StartYear, EndYear);
// // print('Periodo com anos:',ListYears);
// var ListMonths = ee.List.sequence(1,12);
// // print('Meses do ano:',ListMonths);
// var startDate = ee.Date.fromYMD(StartYear, 1, 1);
// var diff_year = ee.Number(EndYear).subtract(StartYear).add(1);
// var endDate = (startDate.advance(diff_year,'year')); //10 pq é exclusivo (no caso será de 01-01-2000 a 31-12-2009)
// // print(endDate);
//----------------------região de interesse ------------------------------------------------------------------
var roi = (pts.buffer(150000)).bounds(); //Testar melhor buffer.
Map.addLayer(roi,{},'roi');
Map.centerObject(roi, 6);
//----------------------funcoes ------------------------------------------------------------------
// Para clicar IC
var clipper = function(image){
  return image.clip(roi);
}; 
// Para setar date
var dates = function(img){
  var date = img.date().format('YYYY-MM-dd');
  return img.set('date', date);
};
// Para scale dos produtos
var scale1 = function(scene) {
  var scl = scene.multiply(0.0001);
  return scl.set('system:time_start',scene.get('system:time_start'));
};
var scale2 = function(scene) {
  var scl = scene.multiply(0.02);
  return scl.set('system:time_start',scene.get('system:time_start'));
};
// Para renomear LST
var renome_terra = function(image){
  return image.rename('LST_Terra');
}; 
var renome_aqua = function(image){
  return image.rename('LST_Aqua');
}; 
// Para calcular indices biofisicos
var calc_IB = function(image){
  var b1 = image.select(['Nadir_Reflectance_Band1']);
  var b2 = image.select(['Nadir_Reflectance_Band2']);
  var b3 = image.select(['Nadir_Reflectance_Band3']);
  var b4 = image.select(['Nadir_Reflectance_Band4']);
  var b5 = image.select(['Nadir_Reflectance_Band5']);
  var b6 = image.select(['Nadir_Reflectance_Band6']);
  var b7 = image.select(['Nadir_Reflectance_Band7']);
  var albedo = (b1.multiply(0.215)).add(b2.multiply(0.266))
  .add(b3.multiply(0.242)).add(b4.multiply(0.129))
  .add(b5.multiply(0.000)).add(b6.multiply(0.112))
  .add(b7.multiply(0.036)).rename('albedo');
  var ndvi = (b2.subtract(b1)).divide(b2.add(b1)).rename('ndvi');
  var img_1 = ee.Image.constant(0).toFloat().rename('img_1');
  return image.set('system:time_start',image.get('system:time_start'))
  .addBands(ee.Image(albedo).float())
  .addBands(ee.Image(ndvi).float())
  .addBands(ee.Image(img_1))
  .clip(roi);
};
// Para unir conjunto de dados
var filterTimeEq = ee.Filter.equals({
  leftField: 'date',
  rightField: 'date'
});
var cat = function(feature) {
  return ee.Image.cat(feature.get('primary'), feature.get('secondary'));
};
//----------------------Lista de coeficientes ------------------------------------------------------------------
// conversão Kelvin to Celsius
var c3 = ee.Number(273.15);
// Von karman constant
var von = ee.Number(0.41);
//Stefan-Boltzmann constant
var sigma_SB = ee.Number(0.000000056704);
//----------------------Dados de entrada------------------------------------------------------------------
// Dados de reflectancia
var dataset_MCD43A4 = ee.ImageCollection('MODIS/006/MCD43A4')
                  .filter(ee.Filter.date(startDate, endDate))
                  .map(clipper)
                  .map(dates);
print(dataset_MCD43A4);
// Temperatura de superficie
// Terra
var LST = ee.ImageCollection('MODIS/006/MOD11A1')
          .filter(ee.Filter.date(startDate, endDate))
          .select('LST_Day_1km')
          .map(scale2)
          .map(clipper)
          .map(dates)
          .map(renome_terra);
// print(LST);
// Map.addLayer(LST,{},'LST');
// Aqua
var LST1 = ee.ImageCollection("MODIS/006/MYD11A1")
  .filter(ee.Filter.date(startDate, endDate))
          .select('LST_Day_1km')
          .map(scale2)
          .map(clipper)
          .map(dates)
          .map(renome_aqua);
// print(LST1);        
// Map.addLayer(LST1,{},'LST1');
//----------------------Computo de variaveis------------------------------------------------------------------
var reflec_nadir = dataset_MCD43A4.map(scale1).map(dates);
var IndexBiofisico = (reflec_nadir.map(calc_IB)).select(['albedo','ndvi','img_1']);
print(IndexBiofisico,'IndexBiofisico');
var Data_set_combineLST = ee.ImageCollection(ee.Join.inner().apply(LST, LST1, filterTimeEq)).set('foo', null);
Data_set_combineLST = Data_set_combineLST.map(cat);
// print(Data_set_combineLST,'Data_set_combineLST');
var Data_set_combineLST_IB = ee.ImageCollection(ee.Join.inner().apply(IndexBiofisico, Data_set_combineLST, filterTimeEq));
Data_set_combineLST_IB = Data_set_combineLST_IB.map(cat);
print(Data_set_combineLST_IB,'Data_set_combineLST_IB');
//----------------------Seleção pixels frio e quente------------------------------------------------------------------
// quente
var calc_pq = function(image){
  var albedo = image.select(['albedo']);
  var ndvi = image.select(['ndvi']);
  var lst = image.select(['LST_Terra']);
  var alb_cand_pq_inf = albedo.reduceRegion({
    reducer: ee.Reducer.percentile([50]),
    geometry: roi,
    //scale: 30,
    bestEffort: true
    //maxPixels: 1e9
    });
  alb_cand_pq_inf = alb_cand_pq_inf.toImage();
  alb_cand_pq_inf = alb_cand_pq_inf.clip(roi);
  var alb_cand_pq_sup = albedo.reduceRegion({
    reducer: ee.Reducer.percentile([75]),
    geometry: roi,
    //scale: 30,
    bestEffort: true
    //maxPixels: 1e9
    });
  alb_cand_pq_sup = alb_cand_pq_sup.toImage();
  alb_cand_pq_sup = alb_cand_pq_sup.clip(roi);
  var ndvi_cand_pq_sup = ndvi.reduceRegion({
    reducer: ee.Reducer.percentile([15]),
    geometry: roi,
    //scale: 30,
    bestEffort: true
    //maxPixels: 1e9
    });
  ndvi_cand_pq_sup = ndvi_cand_pq_sup.toImage();
  ndvi_cand_pq_sup = ndvi_cand_pq_sup.clip(roi);
  var cand_pq_alb_ndvi = (albedo.gt(alb_cand_pq_inf).and(albedo.lt(alb_cand_pq_sup)))
  .and((ndvi.gt(0.10).and(ndvi.lt(ndvi_cand_pq_sup))));
  var lst_pq = lst.multiply(cand_pq_alb_ndvi);
  lst_pq = lst_pq.selfMask();
   var lst_cand_pq_sup = lst_pq.reduceRegion({
    reducer: ee.Reducer.percentile([97]),
    geometry: roi,
    //scale: 30,
    bestEffort: true
    //maxPixels: 1e9
    });
  lst_cand_pq_sup = lst_cand_pq_sup.toImage();
  lst_cand_pq_sup = lst_cand_pq_sup.clip(roi);
  var lst_cand_pq_inf = lst_pq.reduceRegion({
    reducer: ee.Reducer.percentile([95]),
    geometry: roi,
    //scale: 30,
    bestEffort: true
    //maxPixels: 1e9
    });
  lst_cand_pq_inf = lst_cand_pq_inf.toImage();
  lst_cand_pq_inf = lst_cand_pq_inf.clip(roi);
  var cand_pq_alb_ndvi_lst = (lst.gt(lst_cand_pq_inf).and(lst.lt(lst_cand_pq_sup)))
  .multiply(cand_pq_alb_ndvi);
  cand_pq_alb_ndvi_lst = cand_pq_alb_ndvi_lst.selfMask().rename('cand_pq');
  return image.set('system:time_start',image.get('system:time_start'))
  .addBands(ee.Image(cand_pq_alb_ndvi_lst).float());
};
Data_set_combineLST_IB = Data_set_combineLST_IB.map(calc_pq);
print(Data_set_combineLST_IB,'Data_set_combineLST_IB');
// frio
var calc_pf = function(image){
  var albedo = image.select(['albedo']);
  var ndvi = image.select(['ndvi']);
  var lst = image.select(['LST_Terra']);
  var alb_cand_pf_inf = albedo.reduceRegion({
    reducer: ee.Reducer.percentile([25]),
    geometry: roi,
    //scale: 30,
    bestEffort: true
    //maxPixels: 1e9
    });
  alb_cand_pf_inf = alb_cand_pf_inf.toImage();
  alb_cand_pf_inf = alb_cand_pf_inf.clip(roi);
  var alb_cand_pf_sup = albedo.reduceRegion({
    reducer: ee.Reducer.percentile([50]),
    geometry: roi,
    //scale: 30,
    bestEffort: true
    //maxPixels: 1e9
    });
  alb_cand_pf_sup = alb_cand_pf_sup.toImage();
  alb_cand_pf_sup = alb_cand_pf_sup.clip(roi);
  var ndvi_cand_pf_sup = ndvi.reduceRegion({
    reducer: ee.Reducer.percentile([97]),
    geometry: roi,
    //scale: 30,
    bestEffort: true
    //maxPixels: 1e9
    });
  ndvi_cand_pf_sup = ndvi_cand_pf_sup.toImage();
  ndvi_cand_pf_sup = ndvi_cand_pf_sup.clip(roi);
  var cand_pf_alb_ndvi = (albedo.gt(alb_cand_pf_inf).and(albedo.lt(alb_cand_pf_sup)))
  .and((ndvi.gt(ndvi_cand_pf_sup).and(ndvi.lt(0.99))));
  var lst_pf = lst.multiply(cand_pf_alb_ndvi);
  lst_pf = lst_pf.selfMask();
   var lst_cand_pf_sup = lst_pf.reduceRegion({
    reducer: ee.Reducer.percentile([10]),
    geometry: roi,
    //scale: 30,
    bestEffort: true
    //maxPixels: 1e9
    });
  lst_cand_pf_sup = lst_cand_pf_sup.toImage();
  lst_cand_pf_sup = lst_cand_pf_sup.clip(roi);
  var lst_cand_pf_inf = lst_pf.reduceRegion({
    reducer: ee.Reducer.percentile([0]),
    geometry: roi,
    //scale: 30,
    bestEffort: true
    //maxPixels: 1e9
    });
  lst_cand_pf_inf = lst_cand_pf_inf.toImage();
  lst_cand_pf_inf = lst_cand_pf_inf.clip(roi);
  var cand_pf_alb_ndvi_lst = (lst.gt(lst_cand_pf_inf).and(lst.lt(lst_cand_pf_sup)))
  .multiply(cand_pf_alb_ndvi);
  cand_pf_alb_ndvi_lst = cand_pf_alb_ndvi_lst.selfMask().rename('cand_pf');
  return image.set('system:time_start',image.get('system:time_start'))
  .addBands(ee.Image(cand_pf_alb_ndvi_lst).float());
};
Data_set_combineLST_IB = Data_set_combineLST_IB.map(calc_pf);
print(Data_set_combineLST_IB,'Data_set_combineLST_IB');
//----------------------calculo FE------------------------------------------------------------------
var calc_FE = function(image){
  var cand_pq = image.select(['cand_pq']);
  var cand_pf = image.select(['cand_pf']);
  var lst = image.select(['LST_Terra']);
  var lst_hot_temp = (lst.multiply(cand_pq));
  var lst_hot = lst_hot_temp.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: roi,
  //scale: 30,
   bestEffort: true
  //maxPixels: 1e9
  });
  lst_hot = lst_hot.toImage().rename('lst_hot');
  lst_hot = (lst_hot.clip(roi));
  var lst_cold_temp = (lst.multiply(cand_pf));
  var lst_cold = lst_cold_temp.reduceRegion({
  reducer: ee.Reducer.median(),
  geometry: roi,
  //scale: 30,
   bestEffort: true
  //maxPixels: 1e9
  });
  lst_cold = lst_cold.toImage().rename('lst_cold');
  lst_cold = (lst_cold.clip(roi));
  var FE = ((lst_hot.subtract(lst)).divide((lst_hot.subtract(lst_cold))))
  .rename('FE');
  return image.set('system:time_start',image.get('system:time_start'))
  .addBands(ee.Image(lst_hot).float())
  .addBands(ee.Image(lst_cold).float())
  .addBands(ee.Image(FE).float());
};
Data_set_combineLST_IB = Data_set_combineLST_IB.map(calc_FE);
print(Data_set_combineLST_IB,'Data_set_combineLST_IB');
//----------------------Dados climaticos ERA5 land------------------------------------------------------------------
var climatic_hour = ee.ImageCollection("ECMWF/ERA5_LAND/HOURLY")
                  .filter(ee.Filter.date(startDate, endDate))
                  .select(['surface_net_solar_radiation_hourly','surface_net_thermal_radiation_hourly'])
                  .map(clipper)
                  .map(dates);
var numberOfDays = endDate.difference(startDate, 'days');
var climatic_daily = ee.ImageCollection(
  ee.List.sequence(0, numberOfDays.subtract(1))
    .map(function (dayOffset) {
      var start_ = startDate.advance(dayOffset, 'days');
      var end_ = start_.advance(1, 'days');
     var bd = start_; 
     var ed = bd.advance(1, 'days');   
     var serie_diaria = climatic_hour.filterDate(bd, ed); 
     var climatica_day = serie_diaria.sum().divide(86400);
     return climatica_day.set('system:time_start', serie_diaria.first().get('system:time_start'));
    })
);
var calc_Rn_d = function(image){
  var convert_Rs = image.select(['surface_net_solar_radiation_hourly']);
  var convert_Rl = image.select(['surface_net_thermal_radiation_hourly']);
  var Rn_d = (convert_Rs.add(convert_Rl)).rename('Rn_d');
  return image.set('system:time_start',image.get('system:time_start'))
  .addBands(ee.Image(Rn_d).float());
};
var Rn_d = climatic_daily.map(calc_Rn_d).map(dates);
print('Rn_d:', Rn_d);
Data_set_combineLST_IB = ee.ImageCollection(ee.Join.inner().apply(Data_set_combineLST_IB, Rn_d, filterTimeEq));
Data_set_combineLST_IB = Data_set_combineLST_IB.map(cat);
print(Data_set_combineLST_IB,'Data_set_combineLST_IB');
var calc_ET_day = function(image){
  var Rn_24 = image.select(['Rn_d']);
  var FE = image.select(['FE']);
  var ET_d = FE.multiply(0.035).multiply(Rn_24).rename('ET_d');
  return image.set('system:time_start',image.get('system:time_start'))
  .addBands(ee.Image(ET_d).float());
};
Data_set_combineLST_IB = Data_set_combineLST_IB.map(calc_ET_day);
print(Data_set_combineLST_IB,'Data_set_combineLST_IB');
var ET_d = Data_set_combineLST_IB.select('ET_d');
print('ET_d:', ET_d);
var chart_ET = ui.Chart.image.seriesByRegion({
  imageCollection: ET_d,
  regions: pts,
  reducer: ee.Reducer.max(), //como a geometria é ponto pode ser qualquer reducer ex.: mean, max etc...
  band: 'ET_d',
  scale: 2500,
  xProperty: 'system:time_start',
  seriesProperty: 'ET Diária'})
  .setOptions({
    title:'ET diária',
    hAxis:{title: 'Intervalo de Tempo'},
    vAxis:{title:'ET (mm)'}}
    )
    .setChartType('ColumnChart')
    chart_ET.style().set({
    position: 'bottom-right',
    width: '500px',
    height: '300px'
  });
Map.add(chart_ET);
})