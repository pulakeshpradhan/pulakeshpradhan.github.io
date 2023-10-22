var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "IDAHO_EPSCOR/TERRACLIMATE"
    }) || ee.ImageCollection("IDAHO_EPSCOR/TERRACLIMATE");
 var geometry = /* color: #d63000 */ee.Geometry.Point([-40.52449941087357,-9.389501387386687]);
var dataset = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
                  .filter(ee.Filter.date('1957-07-01', '2020-04-01'));
var precipitacao = dataset.select('pr');
var precipitacaoVis = {
  min: -300.0,
  max: 300.0,
  palette: [
    '1a3678', '2955bc', '5699ff', '8dbae9', 'acd1ff', 'caebff', 'e5f9ff',
    'fdffb4', 'ffe6a2', 'ffc969', 'ffa12d', 'ff7c1f', 'ca531a', 'ff0000',
    'ab0000'
  ],
};
//Map.addLayer(precipitacao, precipitacaoVis, 'precipitacao');
//var Brazil = ee.FeatureCollection('ft:1KqFmS4P0DwRjN9VmUnfj59iH4tXWjm277g3XeFAR').filterMetadata('Country', 'equals', 'Brazil');
// Charts Long Term Time Series
Map.style().set('cursor', 'crosshair');
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '80%'}})
    .add(ui.Label('Clique no mapa para ver os dados climáticos do local'));
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var geometry = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(geometry, {color: 'FF0000'}));
var Grafico1 = ui.Chart.image.series(precipitacao, geometry, ee.Reducer.mean(), 1000).setOptions({
          title: 'Precipitação Média por dia',
          vAxis: {title: 'milímetros'},
          trendlines: {
      0: {
        type: 'polynomial',
        degree: 10,
        color: 'red',
        visibleInLegend: false,
      }
    }
});
//print(Grafico1);
// Define a chart with one series precip in the forest region, averaged by DOY.
var Grafico2 = ui.Chart.image.doySeries(
    precipitacao, geometry, ee.Reducer.mean(), 1000).setOptions({
          title: 'Normal da Precipitação Média por dia do ano',
          vAxis: {title: 'milímetros'},
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
// Load several years of MODIS NDVI data.  TERRA AND AQUA COMBINED PRODUCT
var collection = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
    .filterDate(ee.Date('1967-01-01'), ee.Date('2020-04-30'));
var Grafico3 = ui.Chart.image.doySeriesByYear(
    collection, 'pr', geometry, ee.Reducer.mean(), 1000);
// Define a chart with different series for each region, averaged by DOY.
// Display the three charts
//print(Grafico3);
var maximumTemperature = dataset.select('tmmx');
var maximumTemperatureVis = {
  min: -300.0,
  max: 300.0,
  palette: [
    '1a3678', '2955bc', '5699ff', '8dbae9', 'acd1ff', 'caebff', 'e5f9ff',
    'fdffb4', 'ffe6a2', 'ffc969', 'ffa12d', 'ff7c1f', 'ca531a', 'ff0000',
    'ab0000'
  ],
};
//Map.setCenter(-54, -30, 3);
//Map.addLayer(maximumTemperature, maximumTemperatureVis, 'Maximum Temperature');
// Charts Long Term Time Series
var Grafico4 = ui.Chart.image.series(maximumTemperature, geometry,  ee.Reducer.mean(), 1000).setOptions({
          title: 'Series Temperatura Máxima por dia',
          vAxis: {title: 'Graus Celsius (ºCx10)'},
          trendlines: {
      0: {
        type: 'polynomial',
        degree: 10,
        color: 'red',
        visibleInLegend: false,
      }
    }
});
//print(Grafico4);
// Define a chart with one series precip in the forest region, averaged by DOY.
var Grafico5 = ui.Chart.image.doySeries(
    maximumTemperature, geometry, ee.Reducer.mean(), 1000).setOptions({
          title: 'Normal da Temperatura Máxima por dia do ano',
          vAxis: {title: 'Graus Celsius (ºCx10)'},
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
//print(Grafico5);
// Load several years of MODIS NDVI data.  TERRA AND AQUA COMBINED PRODUCT
var Grafico6 = ui.Chart.image.doySeriesByYear(
    collection, 'tmmx', geometry, ee.Reducer.mean(), 1000);
// Define a chart with different series for each region, averaged by DOY.
// Display the three charts
//print(Grafico6);
var minimumTemperature = dataset.select('tmmn');
var minimumTemperatureVis = {
  min: -300.0,
  max: 300.0,
  palette: [
    '1a3678', '2955bc', '5699ff', '8dbae9', 'acd1ff', 'caebff', 'e5f9ff',
    'fdffb4', 'ffe6a2', 'ffc969', 'ffa12d', 'ff7c1f', 'ca531a', 'ff0000',
    'ab0000'
  ],
};
//Map.setCenter(-54, -30, 3);
//Map.addLayer(minimumTemperature, minimumTemperatureVis, 'Minimum Temperature');
// Charts Long Term Time Series
var Grafico7 = ui.Chart.image.series(minimumTemperature, geometry,  ee.Reducer.mean(), 100).setOptions({
          title: 'Séries Temperatura mínima por dia',
          vAxis: {title: 'Graus Celsius (ºCx10)'},
          trendlines: {
      0: {
        type: 'polynomial',
        degree: 10,
        color: 'red',
        visibleInLegend: false,
      }
    }
});
//print(Grafico7);
// Define a chart with one series precip in the forest region, averaged by DOY.
var Grafico8 = ui.Chart.image.doySeries(
    minimumTemperature, geometry, ee.Reducer.median(), 1000).setOptions({
          title: 'Normal da Temperatura Mínima por dia do ano',
          vAxis: {title: 'Graus Celsius (ºCx10)'},
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
//print(Grafico8);
// Load several years of MODIS NDVI data.  TERRA AND AQUA COMBINED PRODUCT
var Grafico9 = ui.Chart.image.doySeriesByYear(
    collection, 'tmmn', geometry, ee.Reducer.mean(), 1000);
// Define a chart with different series for each region, averaged by DOY.
// Display the three charts
//print(Grafico9);
var vento = dataset.select('vs');
var ventoVis = {
  min: -300.0,
  max: 300.0,
  palette: [
    '1a3678', '2955bc', '5699ff', '8dbae9', 'acd1ff', 'caebff', 'e5f9ff',
    'fdffb4', 'ffe6a2', 'ffc969', 'ffa12d', 'ff7c1f', 'ca531a', 'ff0000',
    'ab0000'
  ],
};
//Map.addLayer(vento, ventoVis, 'vento');
// Charts Long Term Time Series
var Grafico10 = ui.Chart.image.series(vento, geometry,  ee.Reducer.mean(), 1000).setOptions({
          title: 'Séries média velovidade do vento por dia',
          vAxis: {title: 'Senhora'},
          trendlines: {
      0: {
        type: 'polynomial',
        degree: 10,
        color: 'red',
        visibleInLegend: false,
      }
    }
});
//print(Grafico10);
// Define a chart with one series precip in the forest region, averaged by DOY.
var Grafico11 = ui.Chart.image.doySeries(
    vento, geometry, ee.Reducer.median(), 1000).setOptions({
          title: 'Normal da média velocidade do vento por dia do ano',
          vAxis: {title: 'Senhora'},
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
//print(Grafico11);
// Load several years of MODIS NDVI data.  TERRA AND AQUA COMBINED PRODUCT
var Grafico12 = ui.Chart.image.doySeriesByYear(
    collection, 'vs', geometry, ee.Reducer.mean(), 1000);
// Define a chart with different series for each region, averaged by DOY.
// Display the three charts
//print(Grafico12);
var radiacao = dataset.select('srad');
var radiacaoVis = {
  min: -300.0,
  max: 300.0,
  palette: [
    '1a3678', '2955bc', '5699ff', '8dbae9', 'acd1ff', 'caebff', 'e5f9ff',
    'fdffb4', 'ffe6a2', 'ffc969', 'ffa12d', 'ff7c1f', 'ca531a', 'ff0000',
    'ab0000'
  ],
};
//Map.centerObject(geometry,12);
//Map.addLayer(radiacao, radiacaoVis, 'radiacao');
// Charts Long Term Time Series
var Grafico13 = ui.Chart.image.series(radiacao, geometry,  ee.Reducer.mean(), 1000).setOptions({
          title: 'Séries média Radiação Ondas Curtas por dia',
          vAxis: {title: 'W / m ^ 2'},
          trendlines: {
      0: {
        type: 'polynomial',
        degree: 10,
        color: 'red',
        visibleInLegend: false,
      }
    }
});
//print(Grafico13);
// Define a chart with one series precip in the forest region, averaged by DOY.
var Grafico14 = ui.Chart.image.doySeries(
    radiacao, geometry, ee.Reducer.median(), 1000).setOptions({
          title: 'Normal da Radiação Onda Curta média por dia do ano',
          vAxis: {title: 'W / m ^ 2'},
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
//print(Grafico14);
// Load several years of MODIS NDVI data.  TERRA AND AQUA COMBINED PRODUCT
var Grafico15 = ui.Chart.image.doySeriesByYear(
    collection, 'srad', geometry, ee.Reducer.mean(), 1000);
// Define a chart with different series for each region, averaged by DOY.
// Display the three charts
//print(Grafico15);
var Evapotranspiracao = dataset.select('aet');
var EvapotranspiracaoVis = {
  min: -300.0,
  max: 300.0,
  palette: [
    '1a3678', '2955bc', '5699ff', '8dbae9', 'acd1ff', 'caebff', 'e5f9ff',
    'fdffb4', 'ffe6a2', 'ffc969', 'ffa12d', 'ff7c1f', 'ca531a', 'ff0000',
    'ab0000'
  ],
};
//Map.centerObject(geometry,12);
//Map.addLayer(Evapotranspiracao, EvapotranspiracaoVis, 'Evapotranspiracao');
// Charts Long Term Time Series
var Grafico16 = ui.Chart.image.series(Evapotranspiracao, geometry,  ee.Reducer.mean(), 1000).setOptions({
          title: 'Séries média da Evapotranspiração por dia',
          vAxis: {title: 'milimetros'},
          trendlines: {
      0: {
        type: 'polynomial',
        degree: 10,
        color: 'red',
        visibleInLegend: false,
      }
    }
});
//print(Grafico16);
// Define a chart with one series precip in the forest region, averaged by DOY.
var Grafico17 = ui.Chart.image.doySeries(
    Evapotranspiracao, geometry, ee.Reducer.median(), 1000).setOptions({
          title: 'Normal da Evapotranspiração por dia do ano',
          vAxis: {title: 'milimetros'},
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
//print(Grafico17);
// Load several years of MODIS NDVI data.  TERRA AND AQUA COMBINED PRODUCT
var Grafico18 = ui.Chart.image.doySeriesByYear(
    collection, 'aet', geometry, ee.Reducer.mean(), 1000);
// Define a chart with different series for each region, averaged by DOY.
// Display the three charts
//print(Grafico18);
var Deficit = dataset.select('def');
var DeficitVis = {
  min: -300.0,
  max: 300.0,
  palette: [
    '1a3678', '2955bc', '5699ff', '8dbae9', 'acd1ff', 'caebff', 'e5f9ff',
    'fdffb4', 'ffe6a2', 'ffc969', 'ffa12d', 'ff7c1f', 'ca531a', 'ff0000',
    'ab0000'
  ],
};
// Charts Long Term Time Series
var Grafico19 = ui.Chart.image.series(Deficit, geometry,  ee.Reducer.mean(), 1000).setOptions({
          title: 'Séries média do Déficit Hídrico por dia',
          vAxis: {title: 'milímetros'},
          trendlines: {
      0: {
        type: 'polynomial',
        degree: 10,
        color: 'red',
        visibleInLegend: false,
      }
    }
});
//print(Grafico19);
// Define a chart with one series precip in the forest region, averaged by DOY.
var Grafico20 = ui.Chart.image.doySeries(
    Deficit, geometry, ee.Reducer.median(), 1000).setOptions({
          title: 'Normal do Deficit Hídrico pordia do ano',
          vAxis: {title: 'milímetros'},
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
//print(Grafico20);
// Load several years of MODIS NDVI data.  TERRA AND AQUA COMBINED PRODUCT
var Grafico21 = ui.Chart.image.doySeriesByYear(
    collection, 'def', geometry, ee.Reducer.mean(), 1000);
// Define a chart with different series for each region, averaged by DOY.
// Display the three charts
//print(Grafico21);
// Load Landsat 8 top-of-atmosphere (TOA) input imagery.
var collection8 = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE').select('pr','tmmx','tmmn','vs','srad','aet','def');
// Create and print the chart.
var Grafico22 = ui.Chart.image.doySeries(collection8, geometry, ee.Reducer.mean(), 1000).setOptions({
          title: 'Normais de Precipitação (pr), Tmáxima (tmmx), Tmínima, Vento (vs), Radiação Ondas Curtas (srad), Evapotranspiração (aet)e Deficit Hidrico (def)',
          vAxis: {title: 'milimetros, ºC, Sra, W / m ^ 2'},
          hAxis: {title: 'dia do ano'},
          curveType: 'function',
          legend: 'none',
          colors:  ['blue', 'red', 'lightblue', 'green', 'yellow', 'black','gray']
         });
// Load Landsat 8 top-of-atmosphere (TOA) input imagery.
var collection9 = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE').select('pr','tmmx','tmmn','vs');
// Create and print the chart.
var Grafico23 = ui.Chart.image.doySeries(collection9, geometry, ee.Reducer.mean(), 1000).setOptions({
          title: 'Normais de Precipitação (pr), Tmáxima (tmmx), Tmínima, Vento (vs)',
          vAxis: {title: 'milimetros, ºC, Sra'},
          hAxis: {title: 'dia do ano'},
          curveType: 'function',
          legend: 'none',
          colors:  ['blue', 'red', 'lightblue', 'green', 'yellow', 'black','gray']
         });
// Load Landsat 8 top-of-atmosphere (TOA) input imagery.
var collection10 = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE').select('vs','srad','aet','def');
// Create and print the chart.
var Grafico24 = ui.Chart.image.doySeries(collection10, geometry, ee.Reducer.mean(), 1000).setOptions({
          title: 'Normais de Vento (vs), Radiação Ondas Curtas (srad), Evapotranspiração (aet)e Deficit Hidrico (def)',
          vAxis: {title: 'milimetros, ºC, Sra, W / m ^ 2'},
          hAxis: {title: 'dia do ano'},
          curveType: 'function',
          legend: 'none',
          colors:  ['blue', 'red', 'lightblue', 'green', 'yellow', 'black','gray']
         });
// Load Landsat 8 top-of-atmosphere (TOA) input imagery.
var collection11 = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE').select('pr','tmmx','tmmn','vs','def');
// Create and print the chart.
var Grafico25 = ui.Chart.image.doySeries(collection11, geometry, ee.Reducer.mean(), 1000).setOptions({
          title: 'Normais de Precipitação (pr), Tmáxima (tmmx), Tmínima, Vento (vs) e Deficit Hidrico (def)',
          vAxis: {title: 'milimetros, ºC, Sra'},
          hAxis: {title: 'dia do ano'},
          curveType: 'function',
          legend: 'none',
          colors:  ['blue', 'red', 'lightblue', 'green', 'yellow', 'black','gray']
         });
 // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
panel.widgets().set(2, Grafico25).set(3, Grafico24).set(4, Grafico23).set(5, Grafico22).set(6, Grafico1).set(7, Grafico2).set(8, Grafico3).set(9, Grafico4).set(10, Grafico5).set(11, Grafico6).set(12, Grafico7).set(13, Grafico8).set(14, Grafico9).set(15, Grafico10).set(16, Grafico11).set(17, Grafico12).set(18, Grafico13).set(19, Grafico14).set(20, Grafico15)
.set(21, Grafico16).set(22, Grafico17).set(23, Grafico18).set(24, Grafico19).set(25, Grafico20).set(26, Grafico21);
});
// Add the panel to the ui.root.
ui.root.add(panel);
Map.setOptions('HYBRID');    
Map.centerObject(geometry,8);
//Map.addLayer(Deficit, DeficitVis, 'Deficit');
Map.setCenter(-40.52449941087357,-9.389501387386687, 14);