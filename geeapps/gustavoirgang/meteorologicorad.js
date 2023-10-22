var table = ui.import && ui.import("table", "table", {
      "id": "users/gustavoirgang/BRPais"
    }) || ee.FeatureCollection("users/gustavoirgang/BRPais");
var dataset = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
                  .filter(ee.Filter.date( ee.Date(Date.now()).advance(-32,'year'), ee.Date(Date.now()).advance(0,'hour')));
var TERRACLIMATE = dataset.select('srad');
var brasil = ee.FeatureCollection('users/gustavoirgang/BRPais');
var months = ee.List.sequence(1, 12);
var years = ee.List.sequence(1988, 2020);
var precipvis = {
  min: 0.0,
  max: 20000,
  opacity: 0.55,
  palette: ['dbfffc', '29ccff', '66aeff', '3801ff']
};
var precipvis2 = {
  min: 6000,
  max: -6000,
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
var dataset2 = ee.ImageCollection('NOAA/CFSV2/FOR6H')
.select(['Downward_Short-Wave_Radiation_Flux_surface_6_Hour_Average'])
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
  var geometryy = /* color: #d63000 */ee.Geometry.Point([-40.52449941087357,-9.389501387386687]);
  Map.layers().set(2, ui.Map.Layer(geometryy, {color: 'FF0000'},'Fazenda'));
var showLayer = function(year) {
  Map.layers().reset();
  var date = ee.Date.fromYMD(year, 1, 1);
  var dateRange = ee.DateRange(date, date.advance(1, 'year'));
  // A helper function to show the image for a given year on the default map.
var image = dataset2.filterDate(dateRange).mean().multiply(1);
 Map.addLayer({
    eeObject: ee.Image(image),
    visParams: {
  min: 200,
  max: 60,
  opacity: 0.55,
  palette: ['dbfffc', '29ccff', '66aeff', '3801ff']
},
    name: String(year)
  });
};
// Create a label and slider.
var label = ui.Label('Escolha o ano e clique no mapa');
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
var TERRACLIMATE2 = dataset2.select(['Downward_Short-Wave_Radiation_Flux_surface_6_Hour_Average']);
var months = ee.List.sequence(1, 12);
var years = ee.List.sequence(1988, 2020);
var byMonthYear2 = ee.ImageCollection.fromImages(
  months.map(function (m) {
     return TERRACLIMATE2
      .filter(ee.Filter.calendarRange(m, m, 'month'))
      .mean().multiply(3)
      .set('month', m)
      .double();
 }).flatten());
//print(byMonthYear2)
var byMonthYear3 = byMonthYear.select(['srad']).merge(byMonthYear2.select(['Downward_Short-Wave_Radiation_Flux_surface_6_Hour_Average']));
//print(byMonthYear3)
var check2 = ee.Image(byMonthYear2.sum());
var dif = check2.subtract(check);
Map.addLayer(brasil, precipvis2 , 'Brasil');
Map.addLayer(dif, precipvis2 , 'Radiação diferença');
Map.addLayer(check2,precipvis , 'Radiação ult. ano',false);
Map.addLayer(check, precipvis, 'Radiação Normal', false);
Map.style().set('cursor', 'crosshair', true);
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  inspector.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var geometry = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(geometry, {color: 'FF0000'},'ponto', true));
  var sampledPoint = check.reduceRegion(ee.Reducer.mean(), geometry, 30);
  var computedValue = sampledPoint.get('srad');
  // Request the value from the server and use the results in a function.
  computedValue.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.widgets().set(2, ui.Label({
      value: 'Normal W/m²/ano: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
 var sampledPoint0 = check2.reduceRegion(ee.Reducer.mean(), geometry, 4);
  var computedValue0 = sampledPoint0.get('Downward_Short-Wave_Radiation_Flux_surface_6_Hour_Average');
  // Request the value from the server and use the results in a function.
  computedValue0.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.widgets().set(3, ui.Label({
      value: 'W/m²/últ.ano: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint1 = dif.reduceRegion(ee.Reducer.mean(), geometry, 4);
  var computedValue1 = sampledPoint1.get('Downward_Short-Wave_Radiation_Flux_surface_6_Hour_Average');
  // Request the value from the server and use the results in a function.
  computedValue1.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.widgets().set(4, ui.Label({
      value: 'Dif.W/m²/ano: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
var TS5 = ui.Chart.image.series(byMonthYear3, geometry,  ee.Reducer.mean(), 100, 'month')
.setChartType('ColumnChart')
.setOptions({
          title: 'Integração da Normal da Radiação Curta média com histórico do último ano',
          curveType:'function',
          series: {
          // Gives each series an axis name that matches the Y-axis below.
         0: {axis: 'Downward_Short-Wave_Radiation_Flux_surface_6_Hour_Average',  setChartType: 'ColumnChart', color: 'red'},
          1: {axis:  'srad' , setChartType:'LineChart', color: 'blue'}
                  },
          vAxis: {title: 'Radiação Curta W/m²/mês'},
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
}).setSeriesNames(['Radiação Curta último ano', 'Radiação Curta Normal']);
//print(TS5);
var Grafico2 = ui.Chart.image.series(
    TERRACLIMATE, geometry, ee.Reducer.sum(), 100).setOptions({
          title: 'Normal da Radiação Curta Média por dia do ano',
          vAxis: {title: 'Acumulado de Radiação Curta W/m2/dia'},
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
    TERRACLIMATE2, geometry, ee.Reducer.mean(), 100).setOptions({
          title: 'Radiação Curta por dia do último ano',
          vAxis: {title: 'Acumulado de Radiação Curta W/m2/6hora'},
          hAxis: {title: 'ano'},
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis: 'Downward_Short-Wave_Radiation_Flux_surface_6_Hour_Average'},
        },
        axes: {
          // Adds labels to each axis; they don't have to match the axis names.
          y: {
            Temps: {label: 'Radiação Curta (W/m2)'},
            Daylight: {label: 'Daylight'}
          }
}
});
var TS4 = ui.Chart.image.series(byMonthYear3, geometry,  ee.Reducer.mean(), 1000, 'month')
.setChartType('Table')
.setOptions({
          title: 'Normais Climatológicas',
          //curveType:'function',
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis: 'Downward_Short-Wave_Radiation_Flux_surface_6_Hour_Average', color: 'grey'},
          1: {axis: 'srad', color: 'blue'},
                  },
          hAxis: {title: 'watt/m2'},
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
panel.widgets().set(1, inspector).set(2, TS5).set(3, TS).set(4, Grafico2).set(5, TS4).set(6, panel2).set(7, panel1);
});
 Map.setCenter(-40.52449941087357,-9.389501387386687, 14);
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
var geometryyy = /* color: #d63000 */ee.Geometry.Point([-40.52449941087357,-9.389501387386687]);
Map.layers().set(3, ui.Map.Layer(geometryyy, {color: 'FFFF00'},'Fazenda')); 
// Add the panel to the ui.root.
// Add the panel to the ui.root.
ui.root.add(panel);