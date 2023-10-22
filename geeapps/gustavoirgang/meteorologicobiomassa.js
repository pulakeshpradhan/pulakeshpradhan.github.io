var table = ui.import && ui.import("table", "table", {
      "id": "users/gustavoirgang/BRPais"
    }) || ee.FeatureCollection("users/gustavoirgang/BRPais");
 var geometry = /* color: #d63000 */ee.Geometry.Point([-40.52449941087357,-9.389501387386687]);
var brasil = ee.FeatureCollection('users/gustavoirgang/BRPais');
var roi = geometry;
// This example demonstrates the use of the pixel QA band to mask
// clouds in surface reflectance (SR) data.  It is suitable
// for use with any of the Landsat SR datasets. 
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
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  inspector.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var geometry = ee.Geometry.Point(coords.lon, coords.lat);
// Load Landsat 8 surface reflectance data
var l8sr = ee.ImageCollection('COPERNICUS/S2');
// Function to cloud mask from the Fmask band of Landsat 8 SR data.
function preprocessL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = ee.Number(2).pow(3).int();
  var cloudsBitMask = ee.Number(2).pow(5).int();
  // Get the pixel QA band.
  var qa = image.select('QA60');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  // Compute NDVI.
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
  // Compute time offset in years.
  var time = ee.Image(image.date().difference({
    start: ee.Date('2013-03-01'),
    unit: 'year',
  })).rename('time').float();
  // Convert to radians and compute harmonic terms.
  var sin = time.multiply(2 * Math.PI).sin().rename('sin');
  var cos = time.multiply(2 * Math.PI).cos().rename('cos');
  // Make a constant band.
  var constant = ee.Image(1);
  // Return the masked image, with additional bands for predictors.
  return constant
      .addBands(time)
      .addBands(cos)
      .addBands(sin)
      // Add the response variable last.
      .addBands(ndvi)
      .updateMask(mask)
      // Retain this metadata property for use in the chart.
      .copyProperties(image, ['system:time_start']);
}
// Map the function over the collection to set up the inputs.
var withIndependents = l8sr
    .filterBounds(geometry)
    .map(preprocessL8sr);
// Check that the bands are present and in the right order:
// print(withIndependents.first()); // OK
// Compute the linear regression.
// The output of the regression reduction is a 4x1 array image.
var harmonicTrend = withIndependents
  .reduce(ee.Reducer.linearRegression(4, 1));
// This is a list of bandnames to use when flattening the array.
var independents = ['constant', 'time', 'cos', 'sin'];
// Turn the array image into a multi-band image of coefficients.
var harmonicTrendCoefficients = harmonicTrend.select('coefficients')
  .arrayProject([0])
  .arrayFlatten([independents]);
// Pull out the three bands we're going to visualize.
var sin = harmonicTrendCoefficients.select('sin');
var cos = harmonicTrendCoefficients.select('cos');
// Do some math to turn the first-order Fourier model into
// hue, saturation, and value in the range[0,1].
var sat = cos.hypot(sin).multiply(5);
var hue = sin.atan2(cos).unitScale(-Math.PI, Math.PI);
var val = withIndependents.select('NDVI').reduce('mean');
// Turn the HSV data into an RGB image and add it to the map.
var seasonality = ee.Image.cat(hue, sat, val).hsvToRgb();
Map.addLayer(seasonality, {}, 'Seasonality');
// EXTRA:
// Compute fitted values.
var fittedHarmonic = withIndependents.map(function(image) {
  return image.addBands(
    image.select(independents)
      .multiply(harmonicTrendCoefficients)
      .reduce('sum')
      .rename('fitted'));
});
var TERRACLIMATE = fittedHarmonic.select('fitted');
var months = ee.List.sequence(1, 12);
var years = ee.List.sequence(2013, 2020);
var precipvis = {
  min: 0,
  max: 0.5,
  opacity: 0.55,
  palette: ['FFFFFF','CC9966','CC9900', '996600', '33CC00', '009900','006600','000000']
};
var precipvis2 = {
  min: -0.1,
  max: 0.1,
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
var dataset2 = ee.ImageCollection('fittedHarmonic')
.select(['fitted']).filter(ee.Filter.date( ee.Date(Date.now()).advance(-1,'year'), ee.Date(Date.now()).advance(0,'hour')));
//.filter(ee.Filter.eq('time_start',06)); 
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var showLayer = function(year) {
  Map.layers().reset();
  var date = ee.Date.fromYMD(year, 1, 1);
  var dateRange = ee.DateRange(date, date.advance(1, 'year'));
  var geometryy = /* color: #d63000 */ee.Geometry.Point([-40.52449941087357,-9.389501387386687]);
  Map.layers().set(2, ui.Map.Layer(geometryy, {color: 'FFFF00'},'Fazenda'));
  // A helper function to show the image for a given year on the default map.
var image = TERRACLIMATE.filterDate(dateRange).mean().multiply(1);
 Map.addLayer({
    eeObject: ee.Image(image),
    visParams: precipvis,
    name: String(year)
  });
};
// Create a label and slider.
var label = ui.Label('Escolha o ano no botão ao lado para ver imagem do período, para seguir clique no mapa');
var slider = ui.Slider({
  min: 2013,
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
slider.setValue(2018);  
     var data = ee.Date(Date.now());
  //   print (data);
var TERRACLIMATE2 = TERRACLIMATE.select(['fitted']).filter(ee.Filter.date( ee.Date(Date.now()).advance(-1,'year'), ee.Date(Date.now()).advance(0,'hour')));
var months = ee.List.sequence(1, 12);
var years = ee.List.sequence(2018, 2020);
var byMonthYear2 = ee.ImageCollection.fromImages(
  months.map(function (m) {
     return TERRACLIMATE2
      .filter(ee.Filter.calendarRange(m, m, 'month'))
      .mean().multiply(1)
      .set('month', m)
      .double()
      .rename('fitted1');
 }).flatten())
 ;
//print(byMonthYear2)
var byMonthYear3 = byMonthYear.select(['fitted']).merge(byMonthYear2.select(['fitted1']));
//print(byMonthYear3)
var check2 = ee.Image(byMonthYear2.mean());
var dif = check2.subtract(check);
Map.addLayer(brasil, precipvis,'Brasil', false);
Map.addLayer(seasonality, {}, 'Seasonality');
Map.addLayer(dif,precipvis2, 'Diferença Biomassa');
Map.addLayer(check2,precipvis, 'Biomassa ult. ano',false);
Map.addLayer(check, precipvis,'Biomassa Normal', false);
Map.layers().set(1, ui.Map.Layer(geometry, {color: 'FF0000'},'ponto', true));
Map.style().set('cursor', 'crosshair', true);
  var sampledPoint = check.reduceRegion(ee.Reducer.mean(), geometry, 30);
  var computedValue = sampledPoint.get('fitted');
  // Request the value from the server and use the results in a function.
  computedValue.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.widgets().set(2, ui.Label({
      value: 'Biomassa Normal: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
 var sampledPoint0 = check2.reduceRegion(ee.Reducer.mean(), geometry, 4);
  var computedValue0 = sampledPoint0.get('fitted1');
  // Request the value from the server and use the results in a function.
  computedValue0.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector.widgets().set(3, ui.Label({
      value: 'Biomassa últ.ano: ' + result.toFixed(2),
      style: {stretch: 'horizontal'}
    }));
  });
  var sampledPoint1 = dif.reduceRegion(ee.Reducer.mean(), geometry, 4);
  var computedValue1 = sampledPoint1.get('fitted1');
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
         0: {axis: 'fitted',  setChartType: 'ColumnChart', color: 'red'},
          1: {axis:  'fitted1' , setChartType:'ColumnChart', color: 'green'}
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
          0: {axis: 'fitted'},
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
    TERRACLIMATE,'fitted',geometry, ee.Reducer.mean(), 1000).setOptions({
          title: 'Variação da Biomassa por dia do ano de todos os anos da Normal',
});
var TS4 = ui.Chart.image.series(byMonthYear3, geometry,  ee.Reducer.min(), 1000, 'month')
.setChartType('Table')
.setOptions({
          title: 'Normail Biomassa',
          //curveType:'function',
          series: {
          // Gives each series an axis name that matches the Y-axis below.
          0: {axis: 'fitted', color: 'grey'},
          1: {axis: 'fitted', color: 'blue'},
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
    .add(ui.Label('Fontes: Dados do ESA Sentinel-2, satélite multi-espectral, de alta resolução e ampla cobertura, que apoia estudos de Monitoramento Terrestre Copernicus' )); 
Map.centerObject(geometry, 17);
panel.widgets().set(1, inspector).set(2, TS5).set(3, TS).set(4, Grafico2).set(5, T6).set(6, TS4).set(7, panel2).set(8, panel1);
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
// Add the panel to the ui.root.
var geometryy = /* color: #d63000 */ee.Geometry.Point([-40.52449941087357,-9.389501387386687]);
  Map.layers().set(2, ui.Map.Layer(geometryy, {color: 'FFFF00'},'Fazenda'));
// Add the panel to the ui.root.
ui.root.add(panel);