var region = ui.import && ui.import("region", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -168.77552155733304,
                70.37000377830375
              ],
              [
                -168.77552155733304,
                -82.94319869880883
              ],
              [
                188.41197844266685,
                -82.94319869880883
              ],
              [
                188.41197844266685,
                70.37000377830375
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-168.77552155733304, 70.37000377830375],
          [-168.77552155733304, -82.94319869880883],
          [188.41197844266685, -82.94319869880883],
          [188.41197844266685, 70.37000377830375]]], null, false),
    region1 = ui.import && ui.import("region1", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -176.518079363553,
                84.68664515896477
              ],
              [
                -176.518079363553,
                -77.43525241313914
              ],
              [
                177.85692063644697,
                -77.43525241313914
              ],
              [
                177.85692063644697,
                84.68664515896477
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-176.518079363553, 84.68664515896477],
          [-176.518079363553, -77.43525241313914],
          [177.85692063644697, -77.43525241313914],
          [177.85692063644697, 84.68664515896477]]], null, false);
var region1 = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Point([-35.70470938542142, -9.656344421639309]),
    region = 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-168.77552155733304, 70.37000377830375],
          [-168.77552155733304, -82.94319869880883],
          [188.41197844266685, -82.94319869880883],
          [188.41197844266685, 70.37000377830375]]], null, false),
    geometry = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Point([-55.42227944954119, -17.997776628511165]);
Map.style().set('cursor', 'crosshair');
var dataset = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
                  .filter(ee.Filter.date( ee.Date(Date.now()).advance(-32,'year'), ee.Date(Date.now()).advance(0,'hour')));
var TERRACLIMATE = dataset.select('vs');
var brasil = ee.FeatureCollection('users/gustavoirgang/BRPais');
var months = ee.List.sequence(1, 12);
var years = ee.List.sequence(1988, 2021);
var precipvis = {
  min: 30,
  max: 0,
  opacity: 0.85,
  palette: ['990000', '666666', '6666ff', '000088']
};
var precipvis2 = {
  min: 10,
  max: -10,
   opacity: 0.85,
  palette: ['990000', '666666', '6666ff', '000088']
};
var byMonthYear = ee.ImageCollection.fromImages(
  months.map(function (m) {
     return TERRACLIMATE
      .filter(ee.Filter.calendarRange(m, m, 'month'))
      .mean().multiply(0.01).multiply(3.6)
      .set('month', m)
     .double();
 }).flatten());
//print(byMonthYear)
var check = ee.Image(byMonthYear.mean());
var dataset2 = ee.ImageCollection('NASA/GLDAS/V021/NOAH/G025/T3H')
.select(['Wind_f_inst'])
.filter(ee.Filter.eq('start_hour',12)); 
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '60%'}})
    .add(ui.Label('Clique no mapa para ver os dados eólicos (ventos) do local'));
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
// Add a label to the panel.
// Add the panel to the default map.
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  panel.clear();
  Map.layers().reset();
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var geometry = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(geometry, {color: 'FF0000'}));
var uv = ee.ImageCollection("NOAA/GFS0P25").filter(ee.Filter.gt('creation_time', ee.Date(Date.now()).advance(-1,'day').millis()))
.filter(ee.Filter.gte('forecast_time', ee.Date(Date.now()).advance(0,'hour').millis())).filter(ee.Filter.lte('forecast_time',  ee.Date(Date.now()).advance(1,'hour').millis()));
var uv0 = ee.Image(uv.select(['u_component_of_wind_10m_above_ground', 'v_component_of_wind_10m_above_ground']).mode())    
var uv10 = uv0.clip(region)
print(uv10,"uv0")
var scale = 75000
var numPixels = 1e10
var samples = uv10.rename(['u10', 'v10']).sample({
  region: region, 
  scale: scale, 
  numPixels: numPixels, 
  geometries: true
})
var geomUtils = require('users/gena/packages:geometry')
var vectors = samples.map(function(f) {
  var u = ee.Number(f.get('u10'))
  var v = ee.Number(f.get('v10'))
  var origin = f.geometry()
  // translate
  var proj = origin.projection().translate(u, v)
  var end = ee.Geometry.Point(origin.transform(proj).coordinates())
  // construct line
  var geom = ee.Algorithms.GeometryConstructors.LineString([origin, end], null, true)
  return f.setGeometry(geom)
}) 
var palettes = require('users/gena/packages:palettes')
var l8sr = ee.ImageCollection('NOAA/GFS0P25').select(['v_component_of_wind_10m_above_ground','u_component_of_wind_10m_above_ground']).filter(ee.Filter.gt('creation_time', ee.Date(Date.now()).advance(-1,'day').millis()))
.filter(ee.Filter.gte('forecast_time', ee.Date(Date.now()).advance(-1,'hour').millis())).filter(ee.Filter.lte('forecast_time',  ee.Date(Date.now()).advance(384,'hour').millis()));
// Map the function over the collection to set up the inputs.
var withIndependents = l8sr
    .filterBounds(region1);
var fittedHarmonic = withIndependents.map(function(image) {
  var d = image.date().format('Y-M-d')
  var l8sr = ee.ImageCollection('NOAA/GFS0P25').select(['v_component_of_wind_10m_above_ground','u_component_of_wind_10m_above_ground']).filter(ee.Filter.gt('creation_time', ee.Date(Date.now()).advance(-1,'day').millis()))
.filter(ee.Filter.gte('forecast_time', ee.Date(Date.now()).advance(0,'hour').millis())).filter(ee.Filter.lte('forecast_time',  ee.Date(Date.now()).advance(1,'hour').millis()))
//.filterDate(d).max();
  return image.addBands(
   image.select('u_component_of_wind_10m_above_ground').pow(2).add(
   image.select('v_component_of_wind_10m_above_ground').pow(2))
 .sqrt().multiply(3.6).rename('velocidade'));
});
var fittedHarmonic1 = withIndependents.map(function(image) {
  var d = image.date().format('Y-M-d')
  var l8sr = ee.ImageCollection('NOAA/GFS0P25').select(['v_component_of_wind_10m_above_ground','u_component_of_wind_10m_above_ground']).filter(ee.Filter.gt('creation_time', ee.Date(Date.now()).advance(-1,'day').millis()))
.filter(ee.Filter.gte('forecast_time', ee.Date(Date.now()).advance(0,'hour').millis())).filter(ee.Filter.lte('forecast_time',  ee.Date(Date.now()).advance(1,'hour').millis()))
//.filterDate(d);
 return image.addBands(
   (image.select('u_component_of_wind_10m_above_ground').atan2(
   image.select('v_component_of_wind_10m_above_ground')).multiply((180/3.1416))).add(180).rename('direção'));
});
// Display the results.
//Map.addLayer(l8sr, {bands: ['v_component_of_wind_10m_above_ground', 'u_component_of_wind_10m_above_ground'], min: 0, max: 0.3}, 'RGB',false)
var TS55 = ui.Chart.image.series(fittedHarmonic.select('velocidade'), geometry,  ee.Reducer.mean(), 100,'forecast_time')
.setChartType('AreaChart')
.setOptions({
          title: 'Velocidade dos ventos previsão 16 dias',
          vAxis: {title: 'km/h'},
          curveType: 'function',
          interpolateNulls: true,
          trendlines: {
    }
});
//print(TS55)
var TS56 = ui.Chart.image.series(fittedHarmonic1.select('direção'), geometry,  ee.Reducer.mean(), 100,'forecast_time')
.setChartType('AreaChart')
.setOptions({
          title: 'Direção dos ventos  previsão 16 dias',
          vAxis: {title: 'azimute 0° a 360°'},
          curveType: 'function',
          interpolateNulls: true,
});
//print(TS56)
var showLayer = function(year) {
  Map.layers().reset();
  var date = ee.Date.fromYMD(year, 1, 1);
  var dateRange = ee.DateRange(date, date.advance(1, 'year'));
  // A helper function to show the image for a given year on the default map.
var image = dataset2.filterDate(dateRange).mean();
 Map.addLayer({
    eeObject: ee.Image(image),
    visParams: {
  min: 5,
  max: 0,
  opacity: 0.85,
  palette: ['990000', '666666', '6666ff', '000088']
},
    name: String(year)
  });
};
// Create a label and slider.
var label = ui.Label('Escolha o ano no botão ao lado para ver imagem do período, para seguir clique no mapa');
var slider = ui.Slider({
  min: 1988,
  max: 2021,
  step: 1,
  onChange: showLayer,
  style: {stretch: 'horizontal'}
});
// Create a panel that contains both the slider and the label.
var panel1 = ui.Panel({
  widgets: [label, slider],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-center',
    padding: '1px'
  }
});
// Add the panel to the map.
panel.add(panel1);
// Set default values on the slider and map.
slider.setValue(2007);  
     var data = ee.Date(Date.now());
  //   print (data);
var TERRACLIMATE2 = dataset2.select(['Wind_f_inst']);
var months = ee.List.sequence(1, 12);
var years = ee.List.sequence(1988, 2021);
var byMonthYear2 = ee.ImageCollection.fromImages(
  months.map(function (m) {
     return TERRACLIMATE2
      .filter(ee.Filter.calendarRange(m, m, 'month'))
      .mean().multiply(3.6)
      .set('month', m)
      .double();
 }).flatten());
//print(byMonthYear2)
var byMonthYear3 = byMonthYear.select(['vs']).merge(byMonthYear2.select(['Wind_f_inst']));
//print(byMonthYear3)
var check2 = ee.Image(byMonthYear2.mean());
var dif = check2.subtract(check);
Map.addLayer(uv10.pow(2).reduce(ee.Reducer.sum()).sqrt(), { palette: palettes.cmocean.Balance[7], min: 0, max: 15 }, 'Velocidade agora')
Map.addLayer (fittedHarmonic.mode().select('velocidade'),{min:36, max:0, palette: ['990000', '666666', '6666ff', '000088']},'velocidade agora');
Map.addLayer (fittedHarmonic1.mode().select('direção'),{min:0, max:360, palette: ['FFFFFF','888800','880000', '000000', '000077','007777','FFFFFF']},'direção agora');
Map.addLayer(vectors.style({ color: '00000055', width: 1 }), {}, 'UV (vector agora)')
//Map.addLayer(samples.style({ pointSize: 1, color: 'red' }), {}, 'UV (samples)', false, 0.7)
//Map.addLayer(brasil, precipvis2 , 'Brasil');
Map.addLayer(dif, precipvis2 , 'Diferença de velocidade do vento');
Map.addLayer(check2,precipvis , ' velocidade do vento média ult. ano',false);
Map.addLayer(check, precipvis, ' velocidade do vento Normal', false);
  // Add a red dot to the map where the user clicked.
  var geometry = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(geometry, {color: 'FF0000'},'ponto', true));
  var sampledPoint = check.reduceRegion(ee.Reducer.mean(), geometry, 30);
  var computedValue = sampledPoint.get('vs');
  // Request the value from the server and use the results in a function.
  computedValue.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.widgets().set(2, ui.Label({
      value: 'Normal velocidade do vento km/h: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
 var sampledPoint0 = check2.reduceRegion(ee.Reducer.mean(), geometry, 4);
  var computedValue0 = sampledPoint0.get('Wind_f_inst');
  // Request the value from the server and use the results in a function.
  computedValue0.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.widgets().set(3, ui.Label({
      value: 'Média da velocidade do vento km/h últ.ano: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint1 = dif.reduceRegion(ee.Reducer.mean(), geometry, 4);
  var computedValue1 = sampledPoint1.get('Wind_f_inst');
  // Request the value from the server and use the results in a function.
  computedValue1.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.widgets().set(4, ui.Label({
      value: 'Diferença km/h das velocidades do vento: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
var TS5 = ui.Chart.image.series(byMonthYear3, geometry,  ee.Reducer.mean(), 100, 'month')
.setChartType('ColumnChart')
.setOptions({
          title: 'Integração da Normal da velocidade do vento média com histórico do último ano',
          curveType:'function',
          series: {
          // Gives each series an axis name that matches the Y-axis below.
         0: {axis: 'Wind speed',  setChartType: 'ColumnChart', color: 'red'},
          1: {axis:  'vs' , setChartType:'LineChart', color: 'blue'}
                  },
          vAxis: {title: 'velocidade do vento mês'},
        legend: 'true',
        trendlines: {
      0: {
        type: 'polynomial',
        degree: 7,
        color: 'red',
        visibleInLegend: false,
     },
    1: {
        type: 'polynomial',
        degree: 7,
        color: 'blue',
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
}).setSeriesNames(['velocidade do vento último ano', 'velocidade do vento Normal']);
//print(TS5);
var Grafico2 = ui.Chart.image.series(
    TERRACLIMATE, geometry, ee.Reducer.mean(), 10).setOptions({
          title: 'Normal da velocidade do vento Média por dia do ano',
          vAxis: {title: 'velocidade do vento m/s dia',
                },
          hAxis: {title: 'ano'},
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
    TERRACLIMATE2, geometry, ee.Reducer.mean(), 10).setOptions({
          title: 'velocidade do vento por dia do último ano',
          vAxis: {title: 'velocidade do vento km/h',
                },
          hAxis: {title: 'ano'},
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis: 'Wind_f_inst'},
        },
        axes: {
          // Adds labels to each axis; they don't have to match the axis names.
          y: {
            Temps: {label: 'velocidade do vento'},
            Daylight: {label: 'm/s'}
          }
}
});
var T6 = ui.Chart.image.doySeriesByYear(
    TERRACLIMATE,'vs',geometry, ee.Reducer.mean(), 1000).setOptions({
          title: 'Variação das velocidade do vento m/s x10 por dia do ano de todos os anos da Normal',
});
var TS4 = ui.Chart.image.series(byMonthYear3, geometry,  ee.Reducer.mean(), 1000, 'month')
.setChartType('Table')
.setOptions({
          title: 'Normais Climatológicas',
          //curveType:'function',
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis: 'Wind_f_inst', color: 'grey'},
          1: {axis: 'vs', color: 'blue'},
                  },
          hAxis: {title: 'velocidade do vento'},
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
    .add(ui.Label('Fontes: TerraClimate: Clima mensal e balanço hídrico climático para superfícies terrestres globais, Universidade de Idaho e GFS: Sistema de previsão global de dados de atmosfera de 384 horas' )); 
Map.centerObject(geometry, 8);
panel.widgets().set(1, inspector).set(2, TS55).set(3, TS56).set(4, TS5).set(5, TS).set(6, Grafico2).set(7, T6).set(8, TS4).set(9, panel2).set(10, panel1);
});
// Add the panel to the ui.root.
ui.root.add(panel);
Map.setOptions('HYBRID');    
Map.centerObject(geometry,8);
//Map.addLayer(Deficit, DeficitVis, 'Deficit');
Map.setCenter(-40.712685, -9.350365, 6);