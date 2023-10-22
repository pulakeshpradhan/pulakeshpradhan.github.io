var table = ui.import && ui.import("table", "table", {
      "id": "projects/ee-joseplanet/assets/Eucalipto/3_FLORESTA_PLANTADA_GCS_SIRGAS2000_Simpler"
    }) || ee.FeatureCollection("projects/ee-joseplanet/assets/Eucalipto/3_FLORESTA_PLANTADA_GCS_SIRGAS2000_Simpler"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -54.62146385559791,
            -20.441143589078894
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([-54.62146385559791, -20.441143589078894]),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "projects/ee-joseplanet/assets/DATASETS/lim_pais_a"
    }) || ee.FeatureCollection("projects/ee-joseplanet/assets/DATASETS/lim_pais_a");
var baseChange = [{featureType: 'all', stylers: [{invert_lightness: true}]}];
Map.setOptions('baseChange', {'baseChange': baseChange});
var geometry = /* color: #d63000 */ee.Geometry.Point([-54.62, -20.44]),
    table = ee.FeatureCollection(table);
// This example demonstrates the use of the pixel QA band to mask
// clouds in surface reflectance (SR) data.  It is suitable
// for use with any of the Landsat SR datasets. 
var dataset = ee.ImageCollection('MODIS/006/MYD13Q1')
                  .filter(ee.Filter.date('2000-02-01', ee.Date(Date.now()).advance(0,'hour')));
var ndvi = dataset.select('NDVI');
var ndviVis = {
  min: 0.0,
  max: 8000.0,
  opacity: 0.8,
  palette: [
    '#f7fcfd','#e5f5f9','#ccece6','#99d8c9','#66c2a4','#41ae76','#238b45','#006d2c','#00441b'
  ],
};
// Map the function over the collection to set up the inputs.
var withIndependents = ndvi
    //.filterBounds(geometry)
   ;
Map.addLayer(ndvi, ndviVis, 'NDVI', false);
var Simplevis = {
  opacity: 0.9,
  'fillColorOpacity': null,
  'color': 'blue'
};
var Simplevis2 = {
  opacity: 0.3,
  'color': 'yellow'
};
var brasil = ee.FeatureCollection(table2);
var eucalipto = ee.FeatureCollection(table);
// Map.addLayer(brasil, Simplevis, 'Brasil');
Map.addLayer(eucalipto, Simplevis2, 'Plantações de eucalipto');
var roi = geometry;
var TERRACLIMATE = ndvi;
var now = Date.now();       //getting time at UTC
var eeNow = ee.Date(now);   //converting number to object format 
var year = eeNow.get('year');
var months = ee.List.sequence(1, 12);
var years = ee.List.sequence(2000, year);
var precipvis = {
  min: 0,
  max: 5000,
  opacity: 0.55,
  palette: ['dbfffc', '29ccff', '665522', '008800']
};
var precipvis2 = {
  min: -100,
  max: 1000,
   opacity: 0.65,
  palette: ['990000', '666666', '6666ff', '00FF00']
};
var byMonthYear = ee.ImageCollection.fromImages(
  months.map(function (m) {
     return TERRACLIMATE
      .filter(ee.Filter.calendarRange(m, m, 'month'))
      .mean()
      .set('month', m)
     .double();
 }).flatten());
//print(byMonthYear)
var check = ee.Image(byMonthYear.mean());
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '65%', height: '100%'}})
    .add(ui.Label('App Desenvolvido por José A. C. Martins - contato: jose.a@ufms.br . Para ter acesso aos dados - Clique no mapa'
    )
    );
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
var showLayer = function(year) {
  Map.layers().reset();
  var date = ee.Date.fromYMD(year, 1, 1);
  var dateRange = ee.DateRange(date, date.advance(1, 'year'));
  // A helper function to show the image for a given year on the default map.
var image = TERRACLIMATE.filterDate(dateRange).mean().multiply(1);
 Map.addLayer({
    eeObject: ee.Image(image),
    visParams: ndviVis,
    name: String(year)
  });
};
// Create a label and slider.
var label = ui.Label('Escolha o ano no botão ao lado para ver imagem do período, para seguir clique no mapa');
var slider = ui.Slider({
  min: 2000,
  max: 2022,
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
slider.setValue(year);  
     var data = ee.Date(Date.now());
  //   print (data);
var TERRACLIMATE2 = TERRACLIMATE.select(['NDVI']).filter(ee.Filter.date( ee.Date(Date.now()).advance(-1,'year'), ee.Date(Date.now()).advance(0,'hour')));
var months = ee.List.sequence(1, 12);
var years = ee.List.sequence(2000, year);
var byMonthYear2 = ee.ImageCollection.fromImages(
  months.map(function (m) {
     return TERRACLIMATE2
      .filter(ee.Filter.calendarRange(m, m, 'month'))
      .mean().multiply(1)
      .set('month', m)
      .double()
      .rename('NDVI1');
 }).flatten())
 ;
//print(byMonthYear2)
var byMonthYear3 = byMonthYear.select(['NDVI']).merge(byMonthYear2.select(['NDVI1']));
//print(byMonthYear3)
var check2 = ee.Image(byMonthYear2.mean());
var dif = check2.subtract(check);
Map.addLayer(ndvi.mean(), ndviVis, 'NDVI');
Map.addLayer(dif,precipvis2, 'Diferença Biomassa');
Map.addLayer(check2,ndviVis, 'Biomassa ult. ano',false);
Map.addLayer(check, ndviVis,'Biomassa Normal', false);
Map.style().set('cursor', 'crosshair', true);
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  inspector.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var geometry = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(geometry, {color: 'FF0000'},'ponto', true));
  var sampledPoint = check.reduceRegion(ee.Reducer.mean(), geometry, 30);
  var computedValue = sampledPoint.get('NDVI');
  // Request the value from the server and use the results in a function.
  computedValue.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.widgets().set(2, ui.Label({
      value: 'Biomassa Normal: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
 var sampledPoint0 = check2.reduceRegion(ee.Reducer.mean(), geometry, 4);
  var computedValue0 = sampledPoint0.get('NDVI1');
  // Request the value from the server and use the results in a function.
  computedValue0.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.widgets().set(3, ui.Label({
      value: 'Biomassa últ.ano: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint1 = dif.reduceRegion(ee.Reducer.mean(), geometry, 4);
  var computedValue1 = sampledPoint1.get('NDVI1');
  // Request the value from the server and use the results in a function.
  computedValue1.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.widgets().set(4, ui.Label({
      value: 'Diferença das Biomassas: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
var TS5 = ui.Chart.image.series(byMonthYear3, geometry,  ee.Reducer.mean(), 10, 'month')
.setChartType('ColumnChart')
.setOptions({
          title: 'Integração da Normal da Biomassa média com histórico do último ano',
          curveType:'function',
          series: {
          // Gives each series an axis name that matches the Y-axis below.
         0: {axis: 'NDVI',  setChartType: 'ColumnChart', color: 'red'},
          1: {axis:  'NDVI1' , setChartType:'ColumnChart', color: 'green'}
                  },
          vAxis: {title: 'Biomassa mês'},
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
        color: 'green',
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
}).setSeriesNames(['Biomassa Normal', 'Biomassa Últ. Ano']);
//print(TS5);
var Grafico2 = ui.Chart.image.series(
    TERRACLIMATE, geometry, ee.Reducer.mean(), 10).setOptions({
          title: 'Normal da Biomassa por dia do ano',
          vAxis: {title: 'Biomassa dia',
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
          title: 'Biomassa por dia do último ano',
          vAxis: {title: 'Biomassa dia',
                },
          hAxis: {title: 'dia do ano'},
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis: 'NDVI'},
        },
        axes: {
          // Adds labels to each axis; they don't have to match the axis names.
          y: {
            Temps: {label: 'Biomassa'},
            Daylight: {label: 'Daylight'}
          }
}
});
var T6 = ui.Chart.image.doySeriesByYear(
    TERRACLIMATE,'NDVI',geometry, ee.Reducer.mean(), 1000).setOptions({
          title: 'Variação da Biomassa por dia do ano de todos os anos da Normal',
});
var TS4 = ui.Chart.image.series(byMonthYear3, geometry,  ee.Reducer.min(), 1000, 'month')
.setChartType('Table')
.setOptions({
          title: 'Normal Biomassa',
          //curveType:'function',
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis: 'NDVI', color: 'grey'},
          1: {axis: 'NDVI1', color: 'blue'},
                  },
          hAxis: {title: 'Biomassa'},
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
    .add(ui.Label('Fontes: Dados do USGS Landsat 8 Collection 1 Tier 1 e Real-Time Raw Scenes' )); 
Map.centerObject(geometry, 9);
panel.widgets().set(1, inspector).set(2, TS5).set(3, TS).set(4, Grafico2).set(5, T6).set(6, TS4).set(7, panel2).set(8, panel1);
});
Map.centerObject(brasil, 5);
 Map.centerObject(geometry, 6);
// Add the panel to the ui.root.
// Add the panel to the ui.root.
ui.root.add(panel);