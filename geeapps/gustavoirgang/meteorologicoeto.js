var geometry = /* color: #98ff00 */ee.Geometry.Point([-40.475603424200095,-9.374173530454579]);
var temp = ee.ImageCollection('NOAA/GFS0P25')
.filter(ee.Filter.date( ee.Date(Date.now()).advance(-30,'hour'), ee.Date(Date.now()).advance(3,'hour'))).limit(300)
//.filter(ee.Filter.lte('creation_time',ee.Date(Date.now()).advance(-460,'hour').millis())) .filter(ee.Filter.lte('forecast_time',ee.Date(Date.now()).advance(-466,'hour').millis()))
//.filter(ee.Filter.gte('forecast_time', ee.Date(Date.now()).advance(0,'day').millis())).filter(ee.Filter.lte('forecast_time',  ee.Date(Date.now()).advance(384,'hour').millis()))
                // .filter(ee.Filter.eq('forecast_hours', 4))
                 .select(['temperature_2m_above_ground']);
//print(comp)
var visParams11 = {
  min: 0,
  max: 10,
  opacity: 0.30,
  palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
};
var visParams10 = {
  min: 0,
  max: 18,
  opacity: 0.30,
  palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
};
//print(comp)
var visParams100 = {
  min: 0,
  max: 36,
  opacity: 0.30,
  palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
};
//print(comp)
var visParams1001 = {
  min: 0,
  max: 200,
  opacity: 0.30,
  palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
};
//print(comp)
var visParams1006 = {
  min: 0,
  max: 1500,
  opacity: 0.30,
  palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
};
//print(comp)
var visParams1012 = {
  min: 0,
  max: 2000,
  opacity: 0.30,
  palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
};
// Define RGB visualization parameters.
var visParams = {
  min: 0.0,
  max: 30.0,
  opacity: 0.30,
  palette: [
    'FFFFFF', '000088','008800','777700', '880000'
  ],
};
var wx = temp
//.filter(ee.Filter.eq('creation_time', ee.Filter.date( ee.Date(Date.now()))));
//.filterDate(d);
var temp5 = ee.ImageCollection('NOAA/GFS0P25')
.filter(ee.Filter.date( ee.Date(Date.now()).advance(-30,'hour'), ee.Date(Date.now()).advance(385,'hour'))).limit(385)
//.filter(ee.Filter.lte('creation_time',ee.Date(Date.now()).advance(-460,'hour').millis())) .filter(ee.Filter.lte('forecast_time',ee.Date(Date.now()).advance(-466,'hour').millis()))
.filter(ee.Filter.gte('forecast_time', ee.Date(Date.now()).advance(0,'day').millis())).filter(ee.Filter.lte('forecast_time',  ee.Date(Date.now()).advance(384,'hour').millis()))
                // .filter(ee.Filter.eq('forecast_hours', 4))
                 .select(['relative_humidity_2m_above_ground']);
var vWind = wx.select(['temperature_2m_above_ground']);
var min = wx.select(['temperature_2m_above_ground']);
var uWind = wx.select(['temperature_2m_above_ground']);
var UmidityAboveGroundMin = temp5.select('relative_humidity_2m_above_ground');
var pctWatAboveGround0 = min.filter(ee.Filter.gt('forecast_hours', 1)).filter(ee.Filter.lt('forecast_hours', 384));
var UmidityAboveGroundMin0 = UmidityAboveGroundMin.filter(ee.Filter.gt('forecast_hours', 1)).filter(ee.Filter.lt('forecast_hours', 384));
var pctWatAboveGround = (pctWatAboveGround0.mean().multiply(2.5)).multiply((((((UmidityAboveGroundMin0.median())).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(14).divide(365);
var pctWatAboveGround241 = min.filter(ee.Filter.gt('forecast_hours', 1)).filter(ee.Filter.lt('forecast_hours', 24));
var UmidityAboveGroundMin24 = UmidityAboveGroundMin.filter(ee.Filter.gt('forecast_hours', 1)).filter(ee.Filter.lt('forecast_hours', 24));
var pctWatAboveGround24 = (pctWatAboveGround241.mean().multiply(2.5)).multiply((((((UmidityAboveGroundMin0.median())).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var pctWatAboveGround481 = min.filter(ee.Filter.gt('forecast_hours', 1)).filter(ee.Filter.lt('forecast_hours', 48));
var UmidityAboveGroundMin48 = UmidityAboveGroundMin.filter(ee.Filter.gt('forecast_hours', 1)).filter(ee.Filter.lt('forecast_hours', 48));
var pctWatAboveGround48 = (pctWatAboveGround481.mean().multiply(2.5)).multiply((((((UmidityAboveGroundMin48.median())).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(2).divide(365);
var pctWatAboveGround721 = min.filter(ee.Filter.gt('forecast_hours', 1)).filter(ee.Filter.lt('forecast_hours', 72));
var UmidityAboveGroundMin72 = UmidityAboveGroundMin.filter(ee.Filter.gt('forecast_hours', 1)).filter(ee.Filter.lt('forecast_hours', 72));
var pctWatAboveGround72 = (pctWatAboveGround721.mean().multiply(2.5)).multiply((((((UmidityAboveGroundMin72.median())).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(3).divide(365);
var pctWatAboveGroundSemana1 = min.filter(ee.Filter.gt('forecast_hours', 1)).filter(ee.Filter.lt('forecast_hours', 192));
var UmidityAboveGroundMinSemana1 = UmidityAboveGroundMin.filter(ee.Filter.gt('forecast_hours', 1)).filter(ee.Filter.lt('forecast_hours', 192));
var pctWatAboveGroundSemana = (pctWatAboveGroundSemana1.mean().multiply(2.5)).multiply((((((UmidityAboveGroundMinSemana1.median())).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(7).divide(365);
var pctWatAboveGroundSemana21 = min.filter(ee.Filter.gt('forecast_hours', 192)).filter(ee.Filter.lt('forecast_hours', 384));
var UmidityAboveGroundMinSemana21 = UmidityAboveGroundMin.filter(ee.Filter.gt('forecast_hours', 1)).filter(ee.Filter.lt('forecast_hours', 192));
var pctWatAboveGroundSemana2 = (pctWatAboveGroundSemana21.mean().multiply(2.5)).multiply((((((UmidityAboveGroundMinSemana21.median())).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(7).divide(365);
var dataset = ee.ImageCollection('NASA/FLDAS/NOAH01/C/GL/M/V001')
                  .filter(ee.Filter.date( ee.Date(Date.now()).advance(-32,'year'), ee.Date(Date.now()).advance(0,'hour')));
var TERRACLIMATE = dataset.select('Evap_tavg');
var dataset22 = ee.ImageCollection('NASA/FLDAS/NOAH01/C/GL/M/V001')
                  .filter(ee.Filter.date( ee.Date(Date.now()).advance(-1.2,'year'), ee.Date(Date.now()).advance(0,'hour')));
var TERRACLIMATE22 = dataset22.select('Evap_tavg');
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
var dataset3m = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-365,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(0,'hour').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m1 = dataset3m.select('relative_humidity_2m_above_ground').median();
var UmidadeAboveGroundX11 = UmidityAboveGround3m1.gte(80).divide(UmidityAboveGround3m1.gte(80)).multiply(80);
var UmidadeAboveGroundX12 = UmidityAboveGround3m1.updateMask(UmidityAboveGround3m1.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX14 = UmidadeAboveGroundX12.unmask(UmidadeAboveGroundX11);
var TERRACLIMATE3m = dataset3m.select( 'temperature_2m_above_ground');
var dia3m = (TERRACLIMATE3m.median().multiply(2.7)).multiply((((((UmidadeAboveGroundX14)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(365).divide(365);
var dataset2d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-50,'hour').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(0,'hour').millis()));
 //.filter(ee.Filter.date( ee.Date(Date.now()).advance(-50,'hour'), ee.Date(Date.now()).advance(0,'hour')));
var TERRACLIMATE2d = dataset2d.select( 'temperature_2m_above_ground');
var dia2 = (TERRACLIMATE2d.median().multiply(4.0)).multiply((((((UmidadeAboveGroundX14)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(2).divide(365);
var dataset1d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-28,'hour').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(0,'hour').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-28,'hour'), ee.Date(Date.now()).advance(0,'hour')));
var TERRACLIMATE1d = dataset1d.select( 'temperature_2m_above_ground');
var dia10 = (TERRACLIMATE1d.median().multiply(4.0)).multiply((((((UmidadeAboveGroundX14)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(1).divide(365);
var dataset3d = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-76,'hour').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(0,'hour').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-76,'hour'), ee.Date(Date.now()).advance(0,'hour')));
var TERRACLIMATE3d = dataset3d.select( 'temperature_2m_above_ground');
var dia3 = (TERRACLIMATE3d.median().multiply(4.0)).multiply((((((UmidadeAboveGroundX14)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(3).divide(365);
var dataset1w = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-7,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(0,'hour').millis()));
 //.filter(ee.Filter.date( ee.Date(Date.now()).advance(-7,'day'), ee.Date(Date.now()).advance(0,'hour')));
var UmidityAboveGround1w = dataset1w.select('relative_humidity_2m_above_ground');
var TERRACLIMATE1w = dataset1w.select( 'temperature_2m_above_ground');
var dia1w = (TERRACLIMATE1w.median().multiply(3.9)).multiply((((((UmidadeAboveGroundX14)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(7).divide(365);
var dataset2w = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-14,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-7,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-14,'day'), ee.Date(Date.now()).advance(-7,'day')));
var TERRACLIMATE2w = dataset2w.select( 'temperature_2m_above_ground');
var dia2w = (TERRACLIMATE2w.median().multiply(3.9)).multiply((((((UmidadeAboveGroundX14)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(7).divide(365);
var dataset3w = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-21,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(-14,'day').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-21,'day'), ee.Date(Date.now()).advance(-14,'day')));
var TERRACLIMATE3w = dataset3w.select( 'temperature_2m_above_ground');
var dia3w = (TERRACLIMATE3w.median().multiply(3.9)).multiply((((((UmidadeAboveGroundX14)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(7).divide(365);
var dataset1m = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-30,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(0,'hour').millis()));
 //.filter(ee.Filter.date( ee.Date(Date.now()).advance(-30,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE1m = dataset1m.select( 'temperature_2m_above_ground');
var dia1m = (TERRACLIMATE1m.median().multiply(3.6)).multiply((((((UmidadeAboveGroundX14)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(30).divide(365);
var dataset6m = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-180,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(0,'hour').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-182,'day'), ee.Date(Date.now()).advance(-0,'day')));
var TERRACLIMATE6m = dataset6m.select( 'temperature_2m_above_ground');
var dia6m = (TERRACLIMATE6m.median().multiply(2.7)).multiply((((((UmidadeAboveGroundX14)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(182).divide(365);
var brasil = ee.FeatureCollection('users/gustavoirgang/BRPais');
Map.setCenter(-40.475603424200095,-9.374173530454579, 4)
Map.addLayer(brasil, precipvis2 , 'Brasil',false);
Map.addLayer(pctWatAboveGround24.resample(), visParams11, 'Previsão 24h', false);
Map.addLayer(pctWatAboveGround48.resample(), visParams10, 'Previsão 48h', false);
Map.addLayer(pctWatAboveGround72.resample(), visParams10, 'Previsão 72h', false);
Map.addLayer(pctWatAboveGroundSemana.resample(), visParams100, 'Previsão 1ª Semana');
Map.addLayer(pctWatAboveGroundSemana2.resample(), visParams100, 'Previsão 2ª Semana', false);
Map.addLayer(dia3w.resample(), visParams100, 'Acumulado 3ª Semana', false);
Map.addLayer(dia2w.resample(), visParams100, 'Acumulado 2ª Semana', false);
Map.addLayer(dia1w.resample(), visParams100, 'Acumulado 1ª Semana', false);
Map.addLayer(dia3.resample(), visParams10, 'Acumulado 72h', false);
Map.addLayer(dia2.resample(), visParams10, 'Acumulado 48h', false);
Map.addLayer(dia10.resample(), visParams11, 'Acumulado 24h'), false;
Map.addLayer(dia6m.resample(), visParams1006, 'Acumulado 6 meses', false);
Map.addLayer(dia3m.resample(), visParams1012, 'Acumulado 12 meses', false);
Map.addLayer(dia1m.resample(), visParams1001, 'Acumulado 1 mês', false);
Map.addLayer(pctWatAboveGround.resample(), visParams100, 'Previsão 14 dias', false);
Map.style().set('cursor', 'crosshair', true);
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '65%', height: '100%'}})
    .add(ui.Label('Clique no mapa para ver os valores Evapotranspiração ETo Prevista 16 dias, Último ano e Normal 30 anos'));
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
inspector.add(ui.Label('Click para ver os valores: Análises Evapotranspiração (ETo) Prevista 16 dias, Último ano e Normal 30 anos'));
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
  var location = 'Evapotranspiração ETo em mm/m²'+ 
                  ' da amostra analisada nas Coordenadas : lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  inspector0.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var geometry = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(geometry, {color: 'FF0000'},'ponto', true));
  var geometryyy = /* color: #d63000 */ee.Geometry.Point([-40.475603424200095,-9.374173530454579]);
Map.layers().set(3, ui.Map.Layer(geometryyy, {color: 'FFFF00'},'Fazenda')); 
  var sampledPoint6m = dia6m.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue6m = sampledPoint6m.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue6m.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector5.widgets().set(3, ui.Label({
      value: 'Acumulado 6 Meses: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint3m = dia3m.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue3m = sampledPoint3m.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue3m.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector5.widgets().set(3, ui.Label({
      value: 'Acumulado 12 Meses: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint2m = dia1m.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue2m = sampledPoint2m.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue2m.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector5.widgets().set(3, ui.Label({
      value: 'Acumulado 1 Mês: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
   var sampledPoint2w = dia3w.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue2w = sampledPoint2w.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue2w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector00.widgets().set(3, ui.Label({
      value: 'Acumulado 3ª Semana: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
   var sampledPoint1w = dia2w.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue1w = sampledPoint1w.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue1w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector00.widgets().set(3, ui.Label({
      value: 'Acumulado 2ª Semana: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint0w = dia1w.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue0w = sampledPoint0w.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue0w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector00.widgets().set(3, ui.Label({
      value: 'Acumulado 1ª Semana: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
   var sampledPoint000 = dia10.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue000 = sampledPoint000.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue000.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.widgets().set(1, ui.Label({
      value: 'Acumulado 24h: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
   var sampledPoint01 = dia2.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue01 = sampledPoint01.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue01.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.widgets().set(2, ui.Label({
      value: 'Acumulado 48h: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint02 = dia3.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue02 = sampledPoint02.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue02.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.widgets().set(3, ui.Label({
      value: 'Acumulado 72h: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint11 = pctWatAboveGround.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue11 = sampledPoint11.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue11.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector4.widgets().set(3, ui.Label({
      value: 'Previsão 16 dias: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint24 = pctWatAboveGround24.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue24 = sampledPoint24.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue24.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector3.widgets().set(2, ui.Label({
      value: 'Previsão 24h: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint48 = pctWatAboveGround48.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue48 = sampledPoint48.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue48.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector3.widgets().set(2, ui.Label({
      value: 'Previsão 48h: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint72 = pctWatAboveGround72.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue72 = sampledPoint72.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue72.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector3.widgets().set(2, ui.Label({
      value: 'Previsão 72h: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
var sampledPointsemana = pctWatAboveGroundSemana.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValuesemana = sampledPointsemana.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValuesemana.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector4.widgets().set(1, ui.Label({
      value: 'Previsão 1ª semana: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
var sampledPointsemana2 = pctWatAboveGroundSemana2.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValuesemana2 = sampledPointsemana2.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValuesemana2.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector4.widgets().set(2, ui.Label({
      value: 'Previsão 2ª semana: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
//var region = geometry
// Strip time off current date/time
var today = ee.Date(new Date().toISOString().split('T')[0])
var collection = ee.ImageCollection('NOAA/GFS0P25')
  //.select('temperature_2m_above_ground','relative_humidity_2m_above_ground')
  // Might not have date for today, so include yesterday too
  .filterDate(today.advance(-1, 'day'), today.advance(1, 'day'))
  // Sort so latest can be picked by taking first
  .sort('system:time_start', false)
var forecasts = ee.ImageCollection(
  [ 6, 12, 18,  24, 30, 36, 42,  48, 54, 60, 66, 72,  78, 84, 90, 96, 102, 108, 114, 120, 126, 132, 138, 144, 150, 156, 162, 168, 174, 180, 186, 192, 198, 204, 210, 216, 222, 228, 234, 240, 246,  252,  258, 264, 270, 276, 282, 288, 294, 300, 306, 312, 318, 324, 330, 336, 342, 348, 354, 360, 366, 372, 378, 384].map(forecast) // Pick forecasts for these hours
)
//Map.addLayer(forecasts, {min: 0, max: 0.001}, 'forecasts', false)
var T4 = ui.Chart.image.series({
  imageCollection: forecasts, 
  region: geometry,
  reducer: ee.Reducer.median(), 
  scale: forecasts.first().projection().nominalScale(),
  xProperty: 'date'
}).setChartType('LineChart').setOptions({
          title: 'Previsão de Evapotranspiração 16 dias, Obs.:Quanto mais a frente mais impreciso',
          vAxis: {title: 'Acumulado de ETo mm/m²/6 horas'},
          trendlines: {
      0: {
        color: 'red',
        visibleInLegend: true,
      }
    }
});
//print(chart)
function forecast(hours) {
  var image = collection
    .filterMetadata('forecast_hours', 'equals', hours)
    // Since colleciton is sorted descending, if there are forecasts 
    // for both yesterday and today, first() will give today.
    .first()
  var date = image.date().advance(hours, 'hours')
 var umidit = (((((ee.ImageCollection('NOAA/GFS0P25').select('relative_humidity_2m_above_ground').filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-365,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(0,'hour').millis())).filter(ee.Filter.eq('forecast_hours', 0)).median().gte(80).divide(ee.ImageCollection('NOAA/GFS0P25').select('relative_humidity_2m_above_ground').filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-365,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(0,'hour').millis())).filter(ee.Filter.eq('forecast_hours', 0)).median().gte(80)).multiply(80)
   .updateMask(ee.ImageCollection('NOAA/GFS0P25').select('relative_humidity_2m_above_ground').filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-365,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(0,'hour').millis())).filter(ee.Filter.eq('forecast_hours', 0)).median().lt(80)).unmask(ee.ImageCollection('NOAA/GFS0P25').select('relative_humidity_2m_above_ground').filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-365,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(0,'hour').millis())).filter(ee.Filter.eq('forecast_hours', 0)).median().gte(80).divide(ee.ImageCollection('NOAA/GFS0P25').select('relative_humidity_2m_above_ground').filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-365,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(0,'hour').millis())).filter(ee.Filter.eq('forecast_hours', 0)).median().gte(80)).multiply(80)))).multiply(-1)).add(100)).multiply(0.0145))
  return (image.select( 'temperature_2m_above_ground').multiply(3.7)).multiply(umidit).multiply(58.93).multiply(0.3).divide(365).rename('ETo')
    .set('date', date.format())
}
var T12 = ui.Chart.image.doySeries(
    dataset3m, geometry, ee.Reducer.sum(), 1).setOptions({
          title: 'Evapotranspiração por dia da Normal (média 30 anos)',
          vAxis: {title: 'Acumulado de Evapotranspiração mm/m2/hora'},
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
          0: {axis: 'Evap_tavg'},
        },
        axes: {
          // Adds labels to each axis; they don't have to match the axis names.
          y: {
            Temps: {label: 'Eto (mm/m2)'},
            Daylight: {label: 'Evap_tavg'}
          }
}
});
var T11 = ui.Chart.image.series(TERRACLIMATE22, geometry,  ee.Reducer.mean()*1000, 1)
.setChartType('LineChart')
.setOptions({
          title: 'Evapotranspiração diária último ano',
          vAxis: {title: 'Acumulado de ETo mm/m²/24 horas'},
          trendlines: {
      0: {
        type: 'polynomial',
        degree: 20,
        color: 'red',
        visibleInLegend: false,
      }
    }
});
//print(TS55)
var T12 = ui.Chart.image.series(dataset3m, geometry,  ee.Reducer.mean(), 1,'forecast_time')
.setChartType('LineChart')
.setOptions({
          title: 'Evapotranspiração acumulada íltimo ano',
          vAxis: {title: 'Acumulado de ETo mm/m²/6 horas'},
          trendlines: {
      0: {
        type: 'polynomial',
        degree: 20,
        color: 'red',
        visibleInLegend: false,
      }
    }
});
// Charts Long Term Time Series
var TS55 = ui.Chart.image.series(TERRACLIMATE, geometry,  ee.Reducer.mean()*1000, 1)
.setChartType('LineChart')
.setOptions({
          title: 'Evapotranspiração diária últimos 30 anos',
          vAxis: {title: 'Acumulado de ETo mm/m²/24 horas'},
          trendlines: {
      0: {
        type: 'polynomial',
        degree: 20,
        color: 'red',
        visibleInLegend: false,
      }
    }
});
//print(TS55)
var TS = ui.Chart.image.doySeries(
    TERRACLIMATE, geometry, ee.Reducer.sum(), 1).setOptions({
          title: 'Evapotranspiração por dia da Normal (média 30 anos)',
          vAxis: {title: 'Acumulado de Evapotranspiração mm/m2/hora'},
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
          0: {axis: 'Evap_tavg'},
        },
        axes: {
          // Adds labels to each axis; they don't have to match the axis names.
          y: {
            Temps: {label: 'Eto (mm/m2)'},
            Daylight: {label: 'Evap_tavg'}
          }
}
});
var T6 = ui.Chart.image.doySeriesByYear(
    TERRACLIMATE,'Evap_tavg',geometry, ee.Reducer.mean(), 1).setOptions({
          title: 'Variação da Evapotranspiração por dia do ano de todos os anos da Normal',
});
var panel2 = ui.Panel({style: {width: '65%'}})
    .add(ui.Label('Fontes: TerraClimate: Clima mensal e balanço hídrico climático para superfícies terrestres globais, Universidade de Idaho, JAXA GSMaP: Mapeamento Global por Satélites da Precipitação e GFS: Sistema de previsão global de dados de atmosfera de 384 horas' )); 
Map.centerObject(geometry, 12);
panel.widgets().set(1, inspector0).set(2, inspector4).set(3, inspector3).set(4, inspector).set(5, inspector00).set(6, inspector5).set(7, inspector2).set(8, T4).set(9, T11).set(10, TS).set(11, TS55).set(12, T6).set(13, panel2);
});
Map.setOptions('HYBRID');
var geometryyy = /* color: #d63000 */ee.Geometry.Point([-40.475603424200095,-9.374173530454579]);
Map.centerObject(geometryyy, 8);
Map.layers().set(3, ui.Map.Layer(geometryyy, {color: 'FFFF00'},'Fazenda')); 
// Add the panel to the ui.root.
// Add the panel to the ui.root.
ui.root.add(panel);