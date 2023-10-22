var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -40.34068533478438,
            -9.4446274208256
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([-40.34068533478438, -9.4446274208256]),
    table = ui.import && ui.import("table", "table", {
      "id": "users/gustavoirgang/BRPais"
    }) || ee.FeatureCollection("users/gustavoirgang/BRPais");
var dataset = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
                  .filter(ee.Filter.date( ee.Date(Date.now()).advance(-32,'year'), ee.Date(Date.now()).advance(0,'hour')));
var TERRACLIMATE = dataset.select('tmmx');
var brasil = ee.FeatureCollection('users/gustavoirgang/BRPais');
var months = ee.List.sequence(1, 12);
var years = ee.List.sequence(1988, 2020);
var precipvis = {
  min: 10.0,
  max: 30,
  opacity: 0.55,
  palette: ['dbfffc', '29ccff', '66aeff', '3801ff']
};
var precipvis2 = {
  min: 5,
  max: -10,
   opacity: 0.65,
  palette: ['990000', '666666', '6666ff', '000088']
};
var byMonthYear = ee.ImageCollection.fromImages(
  months.map(function (m) {
     return TERRACLIMATE
      .filter(ee.Filter.calendarRange(m, m, 'month'))
      .mean().divide(10)
      .set('month', m);
     // .float();
 }).flatten());
//print(byMonthYear)
var check = ee.Image(byMonthYear.mean());
var dataset2 = ee.ImageCollection('NOAA/CFSV2/FOR6H')
.select(['Maximum_temperature_height_above_ground_6_Hour_Interval'])
.filter(ee.Filter.eq('start_hour',12)); 
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '65%', height: '100%'}})
    .add(ui.Label('Clique no mapa'));
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
  }
});
// Add a label to the panel.
inspector.add(ui.Label('Clique para ver o valor'));
// Add the panel to the default map.
// Set the default map's cursor to a "crosshair".
Map.style().set('cursor', 'crosshair');
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Clear the panel and show a loading message.
  inspector.clear();
  panel.clear();
  Map.layers().reset();
  var geometryyy = /* color: #d63000 */ee.Geometry.Point([-40.712685, -9.350365]);
Map.layers().set(3, ui.Map.Layer(geometryyy, {color: 'FFFF00'},'Fazenda')); 
var showLayer = function(year) {
  Map.layers().reset();
  var date = ee.Date.fromYMD(year, 1, 1);
  var dateRange = ee.DateRange(date, date.advance(1, 'year'));
  // A helper function to show the image for a given year on the default map.
var image = dataset2.filterDate(dateRange).mean().multiply(1);
 Map.addLayer({
    eeObject: ee.Image(image),
    visParams: {
  min: 300,
  max: 273,
  opacity: 0.55,
  palette: ['dbfffc', '29ccff', '66aeff', '3801ff']
},
    name: String(year)
  });
};
// Create a label and slider.
var label = ui.Label('Escolha o ano no botão ao lado para ver imagem do período, para seguir clique no mapa');
var slider = ui.Slider({
  min: 1988,
  max: 2020,
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
var TERRACLIMATE2 = dataset2.select(['Maximum_temperature_height_above_ground_6_Hour_Interval']);
var months = ee.List.sequence(1, 12);
var years = ee.List.sequence(1988, 2020);
var byMonthYear2 = ee.ImageCollection.fromImages(
  months.map(function (m) {
     return TERRACLIMATE2
      .filter(ee.Filter.calendarRange(m, m, 'month'))
      .mean().subtract(273.15)
      .set('month', m)
      .double();
 }).flatten());
//print(byMonthYear2)
var byMonthYear3 = byMonthYear.select(['tmmx']).merge(byMonthYear2.select(['Maximum_temperature_height_above_ground_6_Hour_Interval']));
//print(byMonthYear3)
var check2 = ee.Image(byMonthYear2.mean());
var dif = check2.subtract(check);
Map.addLayer(brasil, precipvis2 , 'Brasil');
Map.addLayer(dif, precipvis2 , 'Diferença Temperatura Máxima');
Map.addLayer(check2,precipvis , 'Temperatura Máxima ult. ano',false);
Map.addLayer(check, precipvis, 'Temperatura Máxima Normal', false);
Map.style().set('cursor', 'crosshair', true);
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  inspector.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var geometry = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(geometry, {color: 'FF0000'},'ponto', true));
  var sampledPoint = check.reduceRegion(ee.Reducer.mean(), geometry, 30);
  var computedValue = sampledPoint.get('tmmx');
  // Request the value from the server and use the results in a function.
  computedValue.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.widgets().set(2, ui.Label({
      value: 'Normal Temp. Máx.°C: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
 var sampledPoint0 = check2.reduceRegion(ee.Reducer.mean(), geometry, 4);
  var computedValue0 = sampledPoint0.get('Maximum_temperature_height_above_ground_6_Hour_Interval');
  // Request the value from the server and use the results in a function.
  computedValue0.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.widgets().set(3, ui.Label({
      value: 'Média da T. Máx. °C últ.ano: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint1 = dif.reduceRegion(ee.Reducer.mean(), geometry, 4);
  var computedValue1 = sampledPoint1.get('Maximum_temperature_height_above_ground_6_Hour_Interval');
  // Request the value from the server and use the results in a function.
  computedValue1.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.widgets().set(4, ui.Label({
      value: 'Diferença das T. Máx. °C: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
var TS5 = ui.Chart.image.series(byMonthYear3, geometry,  ee.Reducer.mean(), 100, 'month')
.setChartType('ColumnChart')
.setOptions({
          title: 'Integração da Normal da Temperatura Máxima média com histórico do último ano',
          curveType:'function',
          series: {
          // Gives each series an axis name that matches the Y-axis below.
         0: {axis: 'Maximum_temperature_height_above_ground_6_Hour_Interval',  setChartType: 'ColumnChart', color: 'red'},
          1: {axis:  'tmmx' , setChartType:'LineChart', color: 'blue'}
                  },
          vAxis: {title: 'Temperatura Máxima °C mês'},
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
}).setSeriesNames(['Temperatura Máxima último ano', 'Temperatura Máxima Normal']);
//print(TS5);
var Grafico2 = ui.Chart.image.series(
    TERRACLIMATE, geometry, ee.Reducer.mean(), 10).setOptions({
          title: 'Normal da Temperatura Máxima Média °C por dia do ano',
          vAxis: {title: 'Temperatura Máxima °C dia',
        ticks: [{v: 0, f: '0'},
                {v: 100, f: '10'},
                {v: 150, f: '15'},
                {v: 200, f: '20'},
                {v: 300, f: '30'},
                ]
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
          title: 'Temperatura Máxima por dia do último ano',
          vAxis: {title: 'Temperatura Máxima dia °C',
        ticks: [{v: 273.15, f: '0'},
                {v: 283.15, f: '10'},
                {v: 288.15, f: '15'},
                {v: 293.15, f: '20'},
                {v: 303.15, f: '30'},
                ]
                },
          hAxis: {title: 'ano'},
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis: 'Maximum_temperature_height_above_ground_6_Hour_Interval'},
        },
        axes: {
          // Adds labels to each axis; they don't have to match the axis names.
          y: {
            Temps: {label: 'Temperatura Máxima °C'},
            Daylight: {label: 'Daylight'}
          }
}
});
var T6 = ui.Chart.image.doySeriesByYear(
    TERRACLIMATE,'tmmx',geometry, ee.Reducer.mean(), 1000).setOptions({
          title: 'Variação das Temperaturas Mínimas °Cx10 por dia do ano de todos os anos da Normal',
});
var TS4 = ui.Chart.image.series(byMonthYear3, geometry,  ee.Reducer.min(), 1000, 'month')
.setChartType('Table')
.setOptions({
          title: 'Normais Climatológicas',
          //curveType:'function',
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis: 'Maximum_temperature_height_above_ground_6_Hour_Interval', color: 'grey'},
          1: {axis: 'tmmx', color: 'blue'},
                  },
          hAxis: {title: 'Temperatura Máxima °C'},
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
    .add(ui.Label('Fontes: TerraClimate: Clima mensal e balanço hídrico climático para superfícies terrestres globais, Universidade de Idaho e O Sistema de Previsão Climática (CCE) dos Centros Nacionais de Previsão Ambiental (NCEP)' )); 
Map.centerObject(geometry, 16);
panel.widgets().set(1, inspector).set(2, TS5).set(3, TS).set(4, Grafico2).set(5, T6).set(6, TS4).set(7, panel2).set(8, panel1);
});
Map.setCenter(-40.712685, -9.350365, 14);
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
var geometryyy = /* color: #d63000 */ee.Geometry.Point([-40.712685, -9.350365]);
Map.layers().set(3, ui.Map.Layer(geometryyy, {color: 'FFFF00'},'Fazenda')); 
// Add the panel to the ui.root.
// Add the panel to the ui.root.
ui.root.add(panel);