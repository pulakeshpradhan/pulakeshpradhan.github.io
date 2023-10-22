var region = ee.Geometry(Map.getBounds(true))
 var geometry = /* color: #d63000 */ee.Geometry.Point([-51.38935541702386,-27.422141958602673]);
// Strip time off current date/time
var today = ee.Date(new Date().toISOString().split('T')[0])
var collection = ee.ImageCollection('NOAA/GFS0P25')
  .select('temperature_2m_above_ground','relative_humidity_2m_above_ground','u_component_of_wind_10m_above_ground', 'v_component_of_wind_10m_above_ground')
  // Might not have date for today, so include yesterday too
  .filterDate(today.advance(-1, 'day'), today.advance(1, 'day'))
  // Sort so latest can be picked by taking first
  .sort('system:forecast_time', true)
var forecasts1 = ee.ImageCollection(
  [123,126,129,132,135,138,141,144,147,150,153,156,159,162,165,168,171,174,177,180,183,186,189,192,195,198,201,204,207,210,213,216,219,222,225,228,231,234,237,240,243,246,249,252,255,258,261,264,267,270,273,276,279,282,285,288,291,294,297,300,303,306,309,312,315,318,321,324,327,330,333,336,339,342,345,348,351,354,357,360,363,366,369,372,375,378,381,384].map(forecast) // Pick forecasts for these hours
);
var forecasts = ee.ImageCollection(
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,120].map(forecast) // Pick forecasts for these hours
);
var dia1 = ee.ImageCollection(
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].map(forecast) // Pick forecasts for these hours
);
var dia2 = ee.ImageCollection(
  [25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48].map(forecast) // Pick forecasts for these hours
);
var dia3 = ee.ImageCollection(
  [49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72].map(forecast) // Pick forecasts for these hours
);
var dia4 = ee.ImageCollection(
  [73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96].map(forecast) // Pick forecasts for these hours
);
var dia5 = ee.ImageCollection(
  [97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120].map(forecast) // Pick forecasts for these hours
);
var dia6  = ee.ImageCollection(
  [123,126,129,132,135,138,141,144].map(forecast) // Pick forecasts for these hours
);
var dia7 = ee.ImageCollection(
  [147,150,153,156,159,162,165,168].map(forecast) // Pick forecasts for these hours
);
var dia8 = ee.ImageCollection(
  [171,174,177,180,183,186,189,192].map(forecast) // Pick forecasts for these hours
);
var dia9 = ee.ImageCollection(
  [195,198,201,204,207,210,213,216].map(forecast) // Pick forecasts for these hours
);
var dia10  = ee.ImageCollection(
  [219,222,225,228,231,234,237,240].map(forecast) // Pick forecasts for these hours
);
var dia11 = ee.ImageCollection(
  [243,246,249,252,255,258,261,264].map(forecast) // Pick forecasts for these hours
);
var dia12 = ee.ImageCollection(
  [267,270,273,276,279,282,285,288].map(forecast) // Pick forecasts for these hours
);
var dia13 = ee.ImageCollection(
  [291,294,297,300,303,306,309,312].map(forecast) // Pick forecasts for these hours
);
var dia14 = ee.ImageCollection(
  [315,318,321,324,327,330,333,336].map(forecast) // Pick forecasts for these hours
);
var dia15 = ee.ImageCollection(
  [339,342,345,348,351,354,357,360].map(forecast) // Pick forecasts for these hours
);
var dia16 = ee.ImageCollection(
  [363,366,369,372,375,378,381,384].map(forecast) // Pick forecasts for these hours
);
var quality = function(image){ 
  var mask1 = image.select("temperature_2m_above_ground").gte(15).selfMask()
  var mask2 = image.select('u_component_of_wind_10m_above_ground').pow(2).add(
   image.select('v_component_of_wind_10m_above_ground').pow(2))
 .sqrt().multiply(3.6).rename('velocidade').gte(3).selfMask()
   var mask3 = image.select("relative_humidity_2m_above_ground").lte(25).selfMask()
  return mask1.multiply(mask2).multiply(mask3).copyProperties(image,['system:forecast_time','forecast_time']);
};
var Hfrio = forecasts.map(quality);
//print(Hfrio)
var Hfrio1016 = forecasts1.map(quality);
//print(Hfrio)
var Hfrios = Hfrio.merge(Hfrio1016).merge(Hfrio1016).merge(Hfrio1016);
var dia1f = dia1.map(quality).count().multiply(1);
//print(dia1f)
var dia2f = dia2.map(quality).count().multiply(1);
var dia3f = dia3.map(quality).count().multiply(1);
var dia4f = dia4.map(quality).count().multiply(1);
var dia5f = dia5.map(quality).count().multiply(1);
var dia6f = dia6.map(quality).count().multiply(3);
var dia7f = dia7.map(quality).count().multiply(3);
var dia8f = dia8.map(quality).count().multiply(3);
var dia9f = dia9.map(quality).count().multiply(3);
var dia10f = dia10.map(quality).count().multiply(3);
var dia11f = dia11.map(quality).count().multiply(3);
var dia12f = dia12.map(quality).count().multiply(3);
var dia13f = dia13.map(quality).count().multiply(3);
var dia14f = dia14.map(quality).count().multiply(3);
var dia15f = dia15.map(quality).count().multiply(3);
var dia16f = dia16.map(quality).count().multiply(3);
var dias = ee.ImageCollection([dia1f, dia2f, dia3f, dia4f, dia5f])
//print(dias)
var dias16 = ee.ImageCollection([dia1f, dia2f, dia3f, dia4f, dia5f, dia6f, dia7f, dia8f, dia9f, dia10f, dia11f, dia12f, dia13f, dia14f, dia15f, dia16f])
var dias1016 = ee.ImageCollection([dia6f, dia7f, dia8f, dia9f, dia10f, dia11f, dia12f, dia13f, dia14f, dia15f, dia16f])
var precipvis2 = {
  min: 0,
  max: 16,
   opacity: 0.65,
  palette: ['ffffff',    'ff6f00']
};
var precipvis = {
  min: 0,
  max: 384,
   opacity: 0.65,
  palette: ['ffffff',   'ff6f00']
};
function forecast(hours) {
  var image = collection
    .filterMetadata('forecast_hours', 'equals', hours)
    // Since colleciton is sorted descending, if there are forecasts 
    // for both yesterday and today, first() will give today.
    .first()
  var date = image.date().advance(hours, 'hours')
  return image
    .set('date', date.format())
}
Map.addLayer( Hfrios.count(), precipvis, 'soma horas 16 dias')
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '65%', height: '100%'}})
    .add(ui.Label('Painel Meteorológico ')).add(ui.Label('Clique no mapa para consultar os períodos com risco de incêndio. Os resutados são apresentados em dois conjuntos temporais, de 0 a 120 horas de hora em hora e de 120 a 384 horas de previsão de 3 por 3 horas conforme padrão original do modelo. É considerado risco de incêncio quamdo a Umidade Relativa esta abaixo de 25%, com Velocidade do Vento maior do que 3km/h e temperatura ambiente maior que 15°C. . OBS.:Caso não hajam ocorrências no ponto clicado os gráficos não aparecem'));
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
// Add a label to the panel.
inspector.add(ui.Label('Clique para ver o valor'));
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
inspector.add(ui.Label('Painel Meteorológico '));
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
var inspector2 = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
// Add a label to the panel.
inspector2.add(ui.Label(''));
// Add the panel to the default map.
// Set the default map's cursor to a "crosshair".
Map.style().set('cursor', 'crosshair');
var date = ee.Date(Date.now());
//  print(date)
  var date100 = date.format("YYYY-MM-dd");
  date100 =date100.getInfo();
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Clear the panel and show a loading message.
  inspector00.clear();
  inspector0.clear();
  inspector.clear();
  inspector2.clear();
  panel.clear();
  Map.layers().reset();
 // var geometry = /* color: #d63000 */ee.Geometry.Point([-40.712685, -9.350365]);
Map.layers().set(3, ui.Map.Layer(geometryyy, {color: 'FFFF00'},'Fazenda')); 
Map.style().set('cursor', 'crosshair', true);
inspector00.widgets().set(1, ui.Label('Painel Meteorológico, consulta realizada em: '+ date100 ));
  // Create or update the location label (the second widget in the panel)
  var location = 'Consulta ao risco de incêncio por hora na coordenada lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  inspector.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var geometry = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(geometry, {color: 'FF0000'},'ponto', true));
var region = ee.Geometry(Map.getBounds(true))
// Strip time off current date/time
var today = ee.Date(new Date().toISOString().split('T')[0])
var collection = ee.ImageCollection('NOAA/GFS0P25')
  .select('temperature_2m_above_ground','relative_humidity_2m_above_ground','u_component_of_wind_10m_above_ground', 'v_component_of_wind_10m_above_ground')
  // Might not have date for today, so include yesterday too
  .filterDate(today.advance(-1, 'day'), today.advance(1, 'day'))
  // Sort so latest can be picked by taking first
  .sort('system:forecast_time', true)
var forecasts1 = ee.ImageCollection(
  [123,126,129,132,135,138,141,144,147,150,153,156,159,162,165,168,171,174,177,180,183,186,189,192,195,198,201,204,207,210,213,216,219,222,225,228,231,234,237,240,243,246,249,252,255,258,261,264,267,270,273,276,279,282,285,288,291,294,297,300,303,306,309,312,315,318,321,324,327,330,333,336,339,342,345,348,351,354,357,360,363,366,369,372,375,378,381,384].map(forecast) // Pick forecasts for these hours
);
var forecasts = ee.ImageCollection(
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,120].map(forecast) // Pick forecasts for these hours
);
var dia1 = ee.ImageCollection(
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].map(forecast) // Pick forecasts for these hours
);
var dia2 = ee.ImageCollection(
  [25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48].map(forecast) // Pick forecasts for these hours
);
var dia3 = ee.ImageCollection(
  [49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72].map(forecast) // Pick forecasts for these hours
);
var dia4 = ee.ImageCollection(
  [73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96].map(forecast) // Pick forecasts for these hours
);
var dia5 = ee.ImageCollection(
  [97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120].map(forecast) // Pick forecasts for these hours
);
var dia6  = ee.ImageCollection(
  [123,126,129,132,135,138,141,144].map(forecast) // Pick forecasts for these hours
);
var dia7 = ee.ImageCollection(
  [147,150,153,156,159,162,165,168].map(forecast) // Pick forecasts for these hours
);
var dia8 = ee.ImageCollection(
  [171,174,177,180,183,186,189,192].map(forecast) // Pick forecasts for these hours
);
var dia9 = ee.ImageCollection(
  [195,198,201,204,207,210,213,216].map(forecast) // Pick forecasts for these hours
);
var dia10  = ee.ImageCollection(
  [219,222,225,228,231,234,237,240].map(forecast) // Pick forecasts for these hours
);
var dia11 = ee.ImageCollection(
  [243,246,249,252,255,258,261,264].map(forecast) // Pick forecasts for these hours
);
var dia12 = ee.ImageCollection(
  [267,270,273,276,279,282,285,288].map(forecast) // Pick forecasts for these hours
);
var dia13 = ee.ImageCollection(
  [291,294,297,300,303,306,309,312].map(forecast) // Pick forecasts for these hours
);
var dia14 = ee.ImageCollection(
  [315,318,321,324,327,330,333,336].map(forecast) // Pick forecasts for these hours
);
var dia15 = ee.ImageCollection(
  [339,342,345,348,351,354,357,360].map(forecast) // Pick forecasts for these hours
);
var dia16 = ee.ImageCollection(
  [363,366,369,372,375,378,381,384].map(forecast) // Pick forecasts for these hours
);
var quality = function(image){ 
  var mask1 = image.select("temperature_2m_above_ground").gte(15).selfMask()
  var mask2 = image.select('u_component_of_wind_10m_above_ground').pow(2).add(
   image.select('v_component_of_wind_10m_above_ground').pow(2))
 .sqrt().multiply(3.6).rename('velocidade').gte(3).selfMask()
   var mask3 = image.select("relative_humidity_2m_above_ground").lte(25).selfMask()
  return mask1.multiply(mask2).multiply(mask3).copyProperties(image,['system:forecast_time','forecast_time']);
};
var Hfrio = forecasts.map(quality);
//print(Hfrio)
var Hfrio1016 = forecasts1.map(quality);
//print(Hfrio)
var Hfrios = Hfrio.merge(Hfrio1016).merge(Hfrio1016).merge(Hfrio1016);
var dia1f = dia1.map(quality).count().multiply(1);
//print(dia1f)
var dia2f = dia2.map(quality).count().multiply(1);
var dia3f = dia3.map(quality).count().multiply(1);
var dia4f = dia4.map(quality).count().multiply(1);
var dia5f = dia5.map(quality).count().multiply(1);
var dia6f = dia6.map(quality).count().multiply(3);
var dia7f = dia7.map(quality).count().multiply(3);
var dia8f = dia8.map(quality).count().multiply(3);
var dia9f = dia9.map(quality).count().multiply(3);
var dia10f = dia10.map(quality).count().multiply(3);
var dia11f = dia11.map(quality).count().multiply(3);
var dia12f = dia12.map(quality).count().multiply(3);
var dia13f = dia13.map(quality).count().multiply(3);
var dia14f = dia14.map(quality).count().multiply(3);
var dia15f = dia15.map(quality).count().multiply(3);
var dia16f = dia16.map(quality).count().multiply(3);
var dias = ee.ImageCollection([dia1f, dia2f, dia3f, dia4f, dia5f])
//print(dias)
var dias16 = ee.ImageCollection([dia1f, dia2f, dia3f, dia4f, dia5f, dia6f, dia7f, dia8f, dia9f, dia10f, dia11f, dia12f, dia13f, dia14f, dia15f, dia16f])
var dias1016 = ee.ImageCollection([dia6f, dia7f, dia8f, dia9f, dia10f, dia11f, dia12f, dia13f, dia14f, dia15f, dia16f])
var precipvis2 = {
  min: 0,
  max: 16,
   opacity: 0.65,
  palette: ['ffffff',  'ff6f00']
};
var precipvis = {
  min: 0,
  max: 384,
   opacity: 0.65,
  palette: ['ffffff',  'ff6f00']
};
Map.addLayer( dias.count(), precipvis2, 'soma horas 5 dias')
Map.addLayer(dias1016.count(), precipvis2, 'soma horas 6º ao 16º dia')
Map.addLayer( Hfrios.count(), precipvis, 'soma horas 16 dias')
 var sampledPoint = dias.count().reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue = sampledPoint.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector2.widgets().set(1, ui.Label({
      value: 'Cont. de horas 5 dias ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
 var sampledPoint0 = dias1016.sum().reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue0 = sampledPoint0.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue0.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector2.widgets().set(2, ui.Label({
      value: 'Cont. de horas do 6º ao 16º dia ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint1 = Hfrios.count().reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue1 = sampledPoint1.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue1.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector2.widgets().set(3, ui.Label({
      value: 'Cont. de horas 16 dias ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
var Grafico50 = ui.Chart.image.series({
  imageCollection: dias16,
  region: geometry,
  reducer: ee.Reducer.mean(), 
  scale: 100,
   xProperty:'system:index'
}).setOptions({
          title: 'Contagem de horas por dia com Risco de Incêncios',
          //curveType:'function',
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis:  'temperature_2m_above_ground' , setChartType:'ColumnChart', color: 'ff6f00',format: 'short'}
          },
          vAxis: {title: 'Horas por dia'},
        legend: 'true',
        trendlines: {
      0: {
        type: 'polynomial',
        degree: 7,
        color: 'ff6f00',
        visibleInLegend: false,
     }        },
        hAxis: {
          format: 'short',
        title: 'Cada um dos 16 dias de previsão (384h), podem estar fora de ordem',
                },
}).setSeriesNames(['Contagem de horas por dia']).setChartType('ColumnChart');
//print(chart0)
var chart0 = ui.Chart.image.series({
  imageCollection: dias,
  region: geometry,
  reducer: ee.Reducer.mean(), 
  scale: 100,
   xProperty:'system:index'
}).setOptions({
          title: 'Contagem de horas por dia com Risco de Incêncios',
          //curveType:'function',
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis:  'temperature_2m_above_ground' , setChartType:'ColumnChart', color: 'ff6f00'}
          },
          vAxis: {title: 'Horas por dia'},
        legend: 'true',
        trendlines: {
      0: {
        type: 'polynomial',
        degree: 7,
        color: 'ff6f00',
        visibleInLegend: false,
     }        },
        hAxis: {
        title: '5 dias de previsão (120h)',
                },
}).setSeriesNames(['Umidade relativa']).setChartType('ColumnChart');
//print(chart0)
var chart = ui.Chart.image.series({
  imageCollection: Hfrio, 
  region: geometry,
  reducer: ee.Reducer.mean(), 
  scale: forecasts.first().projection().nominalScale(),
  xProperty: 'date'
}).setOptions({
          title: 'Risco de Incêncios por hora',
          //curveType:'function',
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis:  'temperature_2m_above_ground' , setChartType:'ColumnChart', color: 'ff6f00'}
          },
          vAxis: {title: 'aplicação de produtos agrotóxicos por hora'},
        legend: 'true',
        trendlines: {
      0: {
        type: 'polynomial',
        degree: 7,
        color: 'ff6f00',
        visibleInLegend: false,
     }        },
        hAxis: {
        title: '5 dias de previsão',
                },
}).setSeriesNames(['Umidade relativa']).setChartType('ColumnChart');
//print(chart)
var chart1 = ui.Chart.image.series({
  imageCollection: forecasts, 
  region: geometry,
  reducer: ee.Reducer.mean(), 
  scale: forecasts1.mean().projection().nominalScale(),
  xProperty: 'date'
}).setOptions({
          title: 'Risco de Incêncios por hora',
          //curveType:'function',
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis:  'temperature_2m_above_ground' , setChartType:'ColumnChart', color: 'ff6f00'}
          },
          vAxis: {title: 'Teperatura hora'},
        legend: 'true',
        trendlines: {
      0: {
        type: 'polynomial',
        degree: 7,
        color: 'ff6f00',
        visibleInLegend: false,
     }        },
        hAxis: {
        title: '5 dias de previsão',
                },
}).setSeriesNames(['Umidade relativa']).setChartType('ColumnChart');
//print(chart1)
var chart10 = ui.Chart.image.series({
  imageCollection: dias1016,
  region: geometry,
  reducer: ee.Reducer.mean(), 
  scale: 100,
   xProperty:'system:index'
}).setChartType('ColumnChart').setOptions({
          title: 'Contagem de horas por dia com Risco de Incêncios',
          curveType:'function',
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis:  'temperature_2m_above_ground' , setChartType:'ColumnChart', color: 'ff6f00'}
          },
          vAxis: {title: 'Horas por dia'},
        legend: 'true',
        trendlines: {
      0: {
        type: 'polynomial',
        degree: 7,
        color: 'ff6f00',
        visibleInLegend: false,
     }        },
        hAxis: {
          format: 'decimal',
        title: 'Cada dia do 6º dia ao 16º dia de previsão, podem estar fora de ordem',
        xLabels: [{v: '0', f: 'Jan'},
                {v: '1', f: 'Jan'},
                {v: 2, f: 'Fev'},
                {v: 3, f: 'Mar'},
                {v: 4, f: 'Abr'},
                {v: 5, f: 'Mai'},
                {v: 6, f: 'Jun'},
                {v: 7, f: 'Jul'},
                {v: 8, f: 'Ago'},
                {v: 9, f: 'Set'},
                {v: 10, f: 'Out'},
                ]
                },
});
//print(chart10)
var chart100 = ui.Chart.image.series({
  imageCollection: Hfrio1016, 
  region: geometry,
  reducer: ee.Reducer.mean(), 
  scale: forecasts.first().projection().nominalScale(),
  xProperty: 'date'
}).setOptions({
          title: 'Risco de Incêncios a cada 3 horas',
          //curveType:'function',
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis:  'temperature_2m_above_ground' , setChartType:'ColumnChart', color: 'ff6f00'}
          },
          vAxis: {title: 'Risco de Incêncios 3 horas'},
        legend: 'true',
        trendlines: {
      0: {
        type: 'polynomial',
        degree: 7,
        color: 'ff6f00',
        visibleInLegend: false,
     }        },
        hAxis: {
        title: 'do 6º dia ao 16º dia de previsão',
                },
}).setSeriesNames(['Umidade relativa']).setChartType('ColumnChart');
//print(chart)
var chart11 = ui.Chart.image.series({
  imageCollection: forecasts1, 
  region: geometry,
  reducer: ee.Reducer.mean(), 
  scale: forecasts1.first().projection().nominalScale(),
  xProperty: 'date'
}).setOptions({
          title: 'Risco de Incêncios a cada 3 horas',
          //curveType:'function',
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis:  'temperature_2m_above_ground' , setChartType:'ColumnChart', color: 'ff6f00'}
          },
          vAxis: {title: 'Risco de Incêncios'},
        legend: 'true',
        trendlines: {
      0: {
        type: 'polynomial',
        degree: 7,
        color: 'ff6f00',
        visibleInLegend: false,
     }        },
        hAxis: {
        title: 'do 6º dia ao 16º dia de previsão',
                },
}).setSeriesNames(['Umidade relativa']).setChartType('ColumnChart');
//print(chart1)
var Grafico5 = ui.Chart.image.series({
  imageCollection: dias16,
  region: geometry,
  reducer: ee.Reducer.mean(), 
  scale: 100,
   xProperty:'system:index'
}).setOptions({
          title: 'Contagem de horas por dia com Risco de Incêncios',
          //curveType:'function',
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis:  'temperature_2m_above_ground' , setChartType:'ColumnChart', color: 'ff6f00'}
          },
          vAxis: {title: 'Horas por dia'},
        legend: 'true',
        trendlines: {
      0: {
        type: 'polynomial',
        degree: 7,
        color: 'ff6f00',
        visibleInLegend: false,
     }        },
        hAxis: {
        title: '16 dias de previsão',
                },
}).setSeriesNames(['Contagem de horas por dia']).setChartType('Table');
//print(chart0)
function forecast(hours) {
  var image = collection
    .filterMetadata('forecast_hours', 'equals', hours)
    // Since colleciton is sorted descending, if there are forecasts 
    // for both yesterday and today, first() will give today.
    .first()
  var date = image.date().advance(hours, 'hours')
  return image
    .set('date', date.format())
}
//print(TS4);
var panel2 = ui.Panel({style: {width: '65%'}})
    .add(ui.Label('Fontes:  GFS: Sistema de previsão global de dados de atmosfera de 384 horas.períodos com Risco de Fogo. Os resutados são apresentados em dois conjuntos temporais, de 0 a 120 horas de hora em hora e de 120 a 384 horas de previsão de 3 por 3 horas conforme padrão original do modelo. É considerado risco de incêncio quamdo a Umidade Relativa esta abaixo de 25%, com Velocidade do Vento maior do que 3km/h e temperatura ambiente maior que 15°C. OBS.:Caso não hajam ocorrências no ponto clicado os gráficos não aparecem' )); 
Map.centerObject(geometry, 6);
panel.widgets().set(1, inspector00).set(2, inspector).set(3, inspector2).set(4, Grafico50).set(5, chart0).set(7, chart1).set(8, chart10).set(10, chart11).set(11, Grafico5).set(12, panel2);
});
 var styles = {
  'Cinza': [
    {
      featureType: 'all',
      stylers: [
        { saturation: -80 }
      ]
    },{
      featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [
        { hue: '#00ffee' },
        { saturation: 50 }
      ]
    },{
      featureType: 'poi.business',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' }
      ]
    }
  ]
};
Map.setOptions('HYBRID');
var geometryyy = /* color: #d63000 */ee.Geometry.Point([-51.38935541702386,-27.422141958602673]);
Map.layers().set(3, ui.Map.Layer(geometryyy, {color: 'FFFF00'},'Fazenda')); 
Map.setCenter(-51.38935541702386,-27.422141958602673, 5);  
// Add the panel to the ui.root.
// Add the panel to the ui.root.
ui.root.add(panel);