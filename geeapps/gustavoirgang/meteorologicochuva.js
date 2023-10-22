//var d = image.date().format('Y-M-d');
var today = ee.Date(new Date().toISOString().split('T')[0])
var wx = ee.ImageCollection('NOAA/GFS0P25')
.filter(ee.Filter.gt('forecast_hours', 0))
.filterDate(today.advance(0, 'day'), today.advance(0.75, 'day'))
  // Sort so latest can be picked by taking first
  .sort('system:creation_time', true);
//.filter(ee.Filter.eq('creation_time', ee.Filter.date( ee.Date(Date.now()))));
//.filterDate(d);
var vWind = wx.select(['v_component_of_wind_10m_above_ground']);
var min = wx.select(['total_precipitation_surface']);
var uWind = wx.select(['u_component_of_wind_10m_above_ground']);
var wx1 = ee.ImageCollection('NOAA/GFS0P25').select(['total_precipitation_surface'])
.filterDate(today.advance(0, 'day'), today.advance(0.75, 'day'))
  // Sort so latest can be picked by taking first
  .sort('system:creation_time', true);
var pctWatAboveGround0 = min.filter(ee.Filter.lte('forecast_hours', 385));
var pctWatAboveGround =pctWatAboveGround0.sum().divide(10);
var pctWatAboveGround241 = (min.filter(ee.Filter.lte('forecast_hours', 24)));
var pctWatAboveGround24 =pctWatAboveGround241.sum().divide(10);
var pctWatAboveGround481 = min.filter(ee.Filter.gt('forecast_hours', 24)).filter(ee.Filter.lte('forecast_hours', 48));
var pctWatAboveGround48 =pctWatAboveGround481.sum().divide(10);
var pctWatAboveGround721 =  min.filter(ee.Filter.gt('forecast_hours', 48)).filter(ee.Filter.lte('forecast_hours', 72));
var pctWatAboveGround72 =pctWatAboveGround721.sum().divide(10);
var pctWatAboveGroundSemana1 = (min.filter(ee.Filter.lte('forecast_hours', 168)).sum().divide(10));
var pctWatAboveGroundSemana =pctWatAboveGroundSemana1;
var pctWatAboveGroundSemana21 = pctWatAboveGround.subtract(pctWatAboveGroundSemana1);
var pctWatAboveGroundSemana2 =pctWatAboveGroundSemana21;
var visParams10 = {
  min: 500,
  max: 0,
  opacity: 0.30,
  palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
};
//Map.setCenter(-54, -18, 4);
var visParams100 = {
  min: 50,
  max: 0,
  opacity: 0.30,
  palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
};
var dataset = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
                  .filter(ee.Filter.date( ee.Date(Date.now()).advance(-32,'year'), ee.Date(Date.now()).advance(0,'hour')));
var TERRACLIMATE = dataset.select('pr');
var months = ee.List.sequence(1, 12);
var years = ee.List.sequence(2000, 2020);
var precipvis = {
  min: 0.0,
  max: 3000,
  opacity: 0.55,
  palette: ['dbfffc', '29ccff', '66aeff', '3801ff']
};
var precipvis2 = {
  min: -800,
  max: 1100,
   opacity: 0.65,
  palette: ['990000', '666666', '6666ff', '000088']
};
var byMonthYear = ee.ImageCollection.fromImages(
  months.map(function (m) {
     return TERRACLIMATE
      .filter(ee.Filter.calendarRange(m, m, 'month'))
      .mean()
      .set('month', m)
     // .float();
 }).flatten());
//print(byMonthYear)
var check = ee.Image(byMonthYear.sum());
var dataset2 = ee.ImageCollection('JAXA/GPM_L3/GSMaP/v6/operational')
 .filter(ee.Filter.date( ee.Date(Date.now()).advance(-1,'year'), ee.Date(Date.now()).advance(0,'hour')));
     var data = ee.Date(Date.now());
  //   print (data);
var TERRACLIMATE2 = dataset2.select(['hourlyPrecipRateGC']);
var months = ee.List.sequence(1, 12);
var years = ee.List.sequence(2000, 2020);
var byMonthYear2 = ee.ImageCollection.fromImages(
  months.map(function (m) {
     return TERRACLIMATE2
      .filter(ee.Filter.calendarRange(m, m, 'month'))
      .mean().multiply(720)
      .set('month', m)
      .double();
 }).flatten());
//print(byMonthYear2)
var byMonthYear3 = byMonthYear.select(['pr']).merge(byMonthYear2.select(['hourlyPrecipRateGC']));
//print(byMonthYear3)
var check2 = ee.Image(byMonthYear2.sum());
var dif = check2.subtract(check);
var wx2 = ee.ImageCollection('NOAA/GFS0P25').select(['total_precipitation_surface'])
.filterDate(today.advance(0, 'day'), today.advance(0.75, 'day'))
  // Sort so latest can be picked by taking first
  .sort('system:creation_time', true);
var forecasts = ee.ImageCollection(
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,120,123,126,129,132,135,138,141,144,147,150,153,156,159,162,165,168,171,174,177,180,183,186,189,192,195,198,201,204,207,210,213,216,219,222,225,228,231,234,237,240,243,246,249,252,255,258,261,264,267,270,273,276,279,282,285,288,291,294,297,300,303,306,309,312,315,318,321,324,327,330,333,336,339,342,345,348,351,354,357,360,363,366,369,372,375,378,381,384].map(forecast) // Pick forecasts for these hours
)
function forecast(hours) {
  var image = wx2
    .filterMetadata('forecast_hours', 'equals', hours)
    // Since colleciton is sorted descending, if there are forecasts 
    // for both yesterday and today, first() will give today.
    .first()
  var date = image.date().advance(hours, 'hours')
  return image
    .set('date', date.format())
}
var wx3 = ee.ImageCollection('NOAA/GFS0P25').select(['total_precipitation_surface'])
.filterDate(today.advance(-3, 'day'), today.advance(-2.75, 'day'))
  // Sort so latest can be picked by taking first
  .sort('system:creation_time', true);
var forecasts3 = ee.ImageCollection(
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,120,123,126,129,132,135,138,141,144,147,150,153,156,159,162,165,168,171,174,177,180,183,186,189,192,195,198,201,204,207,210,213,216,219,222,225,228,231,234,237,240,243,246,249,252,255,258,261,264,267,270,273,276,279,282,285,288,291,294,297,300,303,306,309,312,315,318,321,324,327,330,333,336,339,342,345,348,351,354,357,360,363,366,369,372,375,378,381,384].map(forecast3) // Pick forecasts for these hours
)
function forecast3(hours) {
  var image = wx3
    .filterMetadata('forecast_hours', 'equals', hours)
    // Since colleciton is sorted descending, if there are forecasts 
    // for both yesterday and today, first() will give today.
    .first()
  var date = image.date().advance(hours, 'hours')
  return image
    .set('date', date.format())
}
var dia10 =forecasts3.filter(ee.Filter.gt('forecast_hours', 48)).filter(ee.Filter.lte('forecast_hours', 72)).sum().divide(10);
var dia2 = forecasts3.filter(ee.Filter.gt('forecast_hours', 24)).filter(ee.Filter.lte('forecast_hours', 48)).sum().divide(10);
var dia3 = forecasts3.filter(ee.Filter.gt('forecast_hours', 0)).filter(ee.Filter.lte('forecast_hours', 24)).sum().divide(10);
// var dataset2d = ee.ImageCollection('JAXA/GPM_L3/GSMaP/v6/operational')
 //.filter(ee.Filter.date( ee.Date(Date.now()).advance(-2,'day'), ee.Date(Date.now()).advance(-1,'day')));
//var TERRACLIMATE2d = dataset2d.select(['hourlyPrecipRateGC']);
//var dia2 = TERRACLIMATE2d.sum();
//var dataset1d = ee.ImageCollection('JAXA/GPM_L3/GSMaP/v6/operational')
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-28,'hour'), ee.Date(Date.now()).advance(0,'hour')));
//var TERRACLIMATE1d = dataset1d.select(['hourlyPrecipRateGC']);
//var dia10 = TERRACLIMATE1d.sum();
//var dataset3d = ee.ImageCollection('JAXA/GPM_L3/GSMaP/v6/operational')
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-76,'hour'), ee.Date(Date.now()).advance(0,'hour')));
//var TERRACLIMATE3d = dataset3d.select(['hourlyPrecipRateGC']);
//var dia3 = TERRACLIMATE3d.sum();
var dataset1w = ee.ImageCollection('JAXA/GPM_L3/GSMaP/v6/operational')
 .filter(ee.Filter.date( ee.Date(Date.now()).advance(-7,'day'), ee.Date(Date.now()).advance(0,'hour')));
var TERRACLIMATE1w = dataset1w.select(['hourlyPrecipRateGC']);
var dia1w = TERRACLIMATE1w.sum();
var dataset2w = ee.ImageCollection('JAXA/GPM_L3/GSMaP/v6/operational')
 .filter(ee.Filter.date( ee.Date(Date.now()).advance(-14,'day'), ee.Date(Date.now()).advance(-7,'day')));
var TERRACLIMATE2w = dataset2w.select(['hourlyPrecipRateGC']);
var dia2w = TERRACLIMATE2w.sum();
var dataset3w = ee.ImageCollection('JAXA/GPM_L3/GSMaP/v6/operational')
 .filter(ee.Filter.date( ee.Date(Date.now()).advance(-21,'day'), ee.Date(Date.now()).advance(-14,'day')));
var TERRACLIMATE3w = dataset3w.select(['hourlyPrecipRateGC']);
var dia3w = TERRACLIMATE3w.sum();
var dataset1m = ee.ImageCollection('JAXA/GPM_L3/GSMaP/v6/operational')
 .filter(ee.Filter.date( ee.Date(Date.now()).advance(-30,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE1m = dataset1m.select(['hourlyPrecipRateGC']);
var dia1m = TERRACLIMATE1m.sum();
var dataset3m = ee.ImageCollection('JAXA/GPM_L3/GSMaP/v6/operational')
 .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE3m = dataset3m.select(['hourlyPrecipRateGC']);
var dia3m = TERRACLIMATE3m.sum();
var dataset6m = ee.ImageCollection('JAXA/GPM_L3/GSMaP/v6/operational')
 .filter(ee.Filter.date( ee.Date(Date.now()).advance(-180,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE6m = dataset6m.select(['hourlyPrecipRateGC']);
var dia6m = TERRACLIMATE6m.sum();
var brasil = ee.FeatureCollection('users/gustavoirgang/BRPais');
Map.addLayer(check2.resample(),precipvis , 'Precipitação ult. ano',false);
Map.addLayer(brasil, precipvis2 , 'Brasil',false);
Map.addLayer(check, precipvis, 'Normal', false);
Map.addLayer(dif, precipvis2, 'Diferença');
Map.addLayer(pctWatAboveGround, visParams10, 'Previsão 16 dias');
Map.addLayer(pctWatAboveGround24, visParams100, 'Previsão 24h');
Map.addLayer(pctWatAboveGround48, visParams10, 'Previsão 48h', false);
Map.addLayer(pctWatAboveGround72, visParams10, 'Previsão 72h', false);
Map.addLayer(pctWatAboveGroundSemana, visParams10, 'Previsão 1ª Semana', false);
Map.addLayer(pctWatAboveGroundSemana2, visParams10, 'Previsão 2ª Semana', false);
Map.addLayer(dia3w, visParams10, 'Acumulado 3ª Semana', false);
Map.addLayer(dia2w, visParams10, 'Acumulado 2ª Semana', false);
Map.addLayer(dia1w, visParams10, 'Acumulado 1ª Semana', false);
Map.addLayer(dia3, visParams10, 'Acumulado 72h', false);
Map.addLayer(dia2, visParams10, 'Acumulado 48h', false);
Map.addLayer(dia10, visParams100, 'Acumulado 24h', false);
Map.addLayer(dia6m, visParams10, 'Acumulado 3 mês', false);
Map.addLayer(dia3m, visParams10, 'Acumulado 2 mês', false);
Map.addLayer(dia1m, visParams10, 'Acumulado 1 mês', false);
Map.style().set('cursor', 'crosshair', true);
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '65%', height: '100%'}})
    .add(ui.Label('Clique no mapa para ver os valores das análises integrando Precipitação Prevista 16 dias, Último ano e Normal 30 anos'));
// Create an inspector panel with a horizontal layout.
var inspector0 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
// Add a label to the panel.
inspector0.add(ui.Label('Acumulados'));
var inspector00 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
// Add a label to the panel.
inspector00.add(ui.Label('Acumulados'));
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
// Add a label to the panel.
inspector.add(ui.Label('Click para ver os valores:Análises integrando Precipitação Prevista 16 dias, Último ano e Normal 30 anos'));
var inspector2 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
// Add a label to the panel.
inspector2.add(ui.Label(''));
// Add the panel to the default map.
var inspector3 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
// Add a label to the panel.
inspector3.add(ui.Label(''));
var inspector4 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
// Add a label to the panel.
inspector4.add(ui.Label(''));
var inspector5 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
// Add a label to the panel.
inspector5.add(ui.Label('Acumulados'));
// Set the default map's cursor to a "crosshair".
Map.style().set('cursor', 'crosshair');
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Clear the panel and show a loading message.
  inspector00.clear();
  inspector0.clear();
  inspector.clear();
  inspector2.clear();
  inspector3.clear();
  inspector4.clear();
  inspector5.clear();
  panel.clear();
  // Create or update the location label (the second widget in the panel)
  var location = 'Precipitações em mm/m² de chuva'+ 
                  ' da amostra analisada nas Coordenadas : lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  inspector0.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var geometry = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(geometry, {color: 'FF0000'},'ponto', true));
  var geometryyy = /* color: #d63000 */ee.Geometry.Point([-47.92169974528774,-15.729682540498619]);
Map.layers().set(3, ui.Map.Layer(geometryyy, {color: 'FFFF00'},'Fazenda')); 
  var sampledPoint6m = dia6m.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue6m = sampledPoint6m.get('hourlyPrecipRateGC');
  // Request the value from the server and use the results in a function.
  computedValue6m.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector5.widgets().set(3, ui.Label({
      value: 'Acumulado 6 Meses: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint3m = dia3m.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue3m = sampledPoint3m.get('hourlyPrecipRateGC');
  // Request the value from the server and use the results in a function.
  computedValue3m.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector5.widgets().set(3, ui.Label({
      value: 'Acumulado 3 Meses: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint2m = dia1m.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue2m = sampledPoint2m.get('hourlyPrecipRateGC');
  // Request the value from the server and use the results in a function.
  computedValue2m.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector5.widgets().set(3, ui.Label({
      value: 'Acumulado 1 Mês: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
   var sampledPoint2w = dia3w.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue2w = sampledPoint2w.get('hourlyPrecipRateGC');
  // Request the value from the server and use the results in a function.
  computedValue2w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector00.widgets().set(3, ui.Label({
      value: 'Acumulado 3ª Semana: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
   var sampledPoint1w = dia2w.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue1w = sampledPoint1w.get('hourlyPrecipRateGC');
  // Request the value from the server and use the results in a function.
  computedValue1w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector00.widgets().set(3, ui.Label({
      value: 'Acumulado 2ª Semana: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint0w = dia1w.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue0w = sampledPoint0w.get('hourlyPrecipRateGC');
  // Request the value from the server and use the results in a function.
  computedValue0w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector00.widgets().set(3, ui.Label({
      value: 'Acumulado 1ª Semana: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
   var sampledPoint000 = dia10.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue000 = sampledPoint000.get('total_precipitation_surface');
  // Request the value from the server and use the results in a function.
  computedValue000.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.widgets().set(1, ui.Label({
      value: 'Acumulado 24h: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
   var sampledPoint01 = dia2.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue01 = sampledPoint01.get('total_precipitation_surface');
  // Request the value from the server and use the results in a function.
  computedValue01.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.widgets().set(2, ui.Label({
      value: 'Acumulado 48h: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint02 = dia3.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue02 = sampledPoint02.get('total_precipitation_surface');
  // Request the value from the server and use the results in a function.
  computedValue02.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.widgets().set(3, ui.Label({
      value: 'Acumulado 72h: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint11 = pctWatAboveGround.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue11 = sampledPoint11.get('total_precipitation_surface');
  // Request the value from the server and use the results in a function.
  computedValue11.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector4.widgets().set(3, ui.Label({
      value: 'Previsão 16 dias: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint24 = pctWatAboveGround24.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue24 = sampledPoint24.get('total_precipitation_surface');
  // Request the value from the server and use the results in a function.
  computedValue24.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector3.widgets().set(2, ui.Label({
      value: 'Previsão 24h: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint48 = pctWatAboveGround48.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue48 = sampledPoint48.get('total_precipitation_surface');
  // Request the value from the server and use the results in a function.
  computedValue48.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector3.widgets().set(2, ui.Label({
      value: 'Previsão 48h: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint72 = pctWatAboveGround72.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue72 = sampledPoint72.get('total_precipitation_surface');
  // Request the value from the server and use the results in a function.
  computedValue72.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector3.widgets().set(2, ui.Label({
      value: 'Previsão 72h: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
var sampledPointsemana = pctWatAboveGroundSemana.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValuesemana = sampledPointsemana.get('total_precipitation_surface');
  // Request the value from the server and use the results in a function.
  computedValuesemana.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector4.widgets().set(1, ui.Label({
      value: 'Previsão 1ª semana: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
var sampledPointsemana2 = pctWatAboveGroundSemana2.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValuesemana2 = sampledPointsemana2.get('total_precipitation_surface');
  // Request the value from the server and use the results in a function.
  computedValuesemana2.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector4.widgets().set(2, ui.Label({
      value: 'Previsão 2ª semana: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint = check.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue = sampledPoint.get('pr');
  // Request the value from the server and use the results in a function.
  computedValue.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector2.widgets().set(2, ui.Label({
      value: 'Normal ano: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
 var sampledPoint0 = check2.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue0 = sampledPoint0.get('hourlyPrecipRateGC');
  // Request the value from the server and use the results in a function.
  computedValue0.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector2.widgets().set(3, ui.Label({
      value: 'Último ano: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint1 = dif.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue1 = sampledPoint1.get('hourlyPrecipRateGC');
  // Request the value from the server and use the results in a function.
  computedValue1.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector2.widgets().set(4, ui.Label({
      value: 'Diferença: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
Map.addLayer(forecasts, {min: 0, max: 0.001}, 'forecasts', false)
var TS55 = ui.Chart.image.series({
  imageCollection: forecasts, 
  region: geometry,
  reducer: ee.Reducer.mean(), 
  scale: forecasts.first().projection().nominalScale(),
  xProperty: 'date'
}).setChartType('AreaChart').setOptions({
          title: 'Previsão de Precipitação 16 dias, Obs.:Quanto mais a frente mais impreciso',
          vAxis: {title: 'Acumulado de Chuva mm/m²/6 horas'},
});
//print(chart)
// Charts Long Term Time Series
//var TS55 = ui.Chart.image.series(pctWatAboveGround0, geometry,  ee.Reducer.mean(), 1, 'forecast_time')
//.setChartType('LineChart')
//.setOptions({
 //         title: 'Previsão de Precipitação 16 dias, Obs.:Quanto mais a frente mais impreciso',
 //         vAxis: {title: 'Acumulado de Chuva mm/m²/6 horas'},
//});
//print(TS5);
var TS5 = ui.Chart.image.series(byMonthYear3, geometry,  ee.Reducer.mean(), 1, 'month')
.setChartType('ColumnChart')
.setOptions({
          title: 'Integração da Normal das Chuvas com histórico do último ano',
          curveType:'function',
          series: {
          // Gives each series an axis name that matches the Y-axis below.
         0: {axis: 'hourlyPrecipRateGC',  setChartType: 'ColumnChart', color: 'blue'},
          1: {axis:  'pr' , setChartType:'LineChart', color: 'red'}
                  },
          vAxis: {title: 'Acumulado de Chuva mm/m2/mês'},
        legend: 'true',
        trendlines: {
      0: {
        type: 'polynomial',
        degree: 7,
        color: 'blue',
        visibleInLegend: false,
     },
    1: {
        type: 'polynomial',
        degree: 7,
        color: 'red',
        visibleInLegend: false,
     }
    },
          hAxis: {
        title: 'Mêses',
        ticks: [{v: 1, f: 'Jan'},
                {v: 2, f: 'Fev'},
                {v: 3, f: 'Mar'},
                {v: 4, f: 'Abr'},
                {v: 5, f: 'Mai'},
                {v: 6, f: 'Jun'},
                {v: 7, f: 'Jul'},
                {v: 8, f: 'Ago'},
                {v: 9, f: 'Set'},
                {v: 10, f: 'Out'},
                {v: 11, f: 'Nov'},
                {v: 12, f: 'Dez'},]
                },
}).setSeriesNames(['Precipitação último ano', 'Precipitação Normal']);
//print(TS5);
var Grafico2 = ui.Chart.image.series(
    TERRACLIMATE, geometry, ee.Reducer.sum(), 1).setChartType('AreaChart').setOptions({
          title: 'Normal da Precipitação Média por dia do ano',
          vAxis: {title: 'Acumulado de Chuva mm/m2/dia'},
          hAxis: {title: 'dia do ano'},
          trendlines: {
      0: {
        type: 'polynomial',
        degree: 5,
        color: 'red',
        visibleInLegend: false,
      }
    }
});
// Display the three charts
//print(Grafico2);
var TS = ui.Chart.image.doySeries(
    TERRACLIMATE2, geometry, ee.Reducer.sum(), 1).setChartType('AreaChart').setOptions({
          title: 'Precipitação por dia do último ano',
          vAxis: {title: 'Acumulado de Chuva mm/m2/hora'},
          hAxis: {title: 'dia do ano'},
          trendlines: {
      0: {
        type: 'polynomial',
        degree: 7,
        color: 'red',
        visibleInLegend: false,
      }
    },
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis: 'hourlyPrecipRateGC'},
        },
        axes: {
          // Adds labels to each axis; they don't have to match the axis names.
          y: {
            Temps: {label: 'Chuva (mm/m2)'},
            Daylight: {label: 'Daylight'}
          }
}
});
var T6 = ui.Chart.image.doySeriesByYear(
    TERRACLIMATE,'pr',geometry, ee.Reducer.mean(), 1).setOptions({
          title: 'Variação da Precipitação por dia do ano de todos os anos da Normal',
});
var TS4 = ui.Chart.image.series(byMonthYear3, geometry,  ee.Reducer.mean(), 1, 'month')
.setChartType('Table')
.setOptions({
          title: 'Normais Climatológicas',
          //curveType:'function',
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis: 'hourlyPrecipRateGC', color: 'grey'},
          1: {axis: 'pr', color: 'blue'},
                  },
          hAxis: {title: 'Graus Celsius x10 e mm/m2'},
       // intervals: { 'style':'area' },
        legend: 'none',
          vAxis: {
        title: 'Mêses',
        ticks: [{v: 1, f: 'Jan'},
                {v: 2, f: 'Fev'},
                {v: 3, f: 'Mar'},
                {v: 4, f: 'Abr'},
                {v: 5, f: 'Mai'},
                {v: 6, f: 'Jun'},
                {v: 7, f: 'Jul'},
                {v: 8, f: 'Ago'},
                {v: 9, f: 'Set'},
                {v: 10, f: 'Out'},
                {v: 11, f: 'Nov'},
                {v: 12, f: 'Dez'},]
                },
}).setSeriesNames(['Último ano','Normal' ]);
//print(TS4);
var panel2 = ui.Panel({style: {width: '65%'}})
    .add(ui.Label('Fontes: TerraClimate: Clima mensal e balanço hídrico climático para superfícies terrestres globais, Universidade de Idaho, JAXA GSMaP: Mapeamento Global por Satélites da Precipitação e GFS: Sistema de previsão global de dados de atmosfera de 384 horas' )); 
Map.centerObject(geometry, 7);
panel.widgets().set(1, inspector0).set(2, inspector4).set(3, inspector3).set(4, inspector).set(5, inspector00).set(6, inspector5).set(7, inspector2).set(8, TS55).set(9, TS5).set(10, TS).set(110, Grafico2).set(121, T6).set(13, TS4).set(14, panel2);
});
Map.setCenter(-47.92169974528774,-15.729682540498619, 6);
Map.setOptions('HYBRID');
var geometryyy = /* color: #d63000 */ee.Geometry.Point([-47.92169974528774,-15.729682540498619]);
Map.layers().set(3, ui.Map.Layer(geometryyy, {color: 'FFFF00'},'Fazenda')); 
// Add the panel to the ui.root.
// Add the panel to the ui.root.
ui.root.add(panel);