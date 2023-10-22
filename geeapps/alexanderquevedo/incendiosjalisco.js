/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var ignicion = ee.Image("users/raulnanclares/peligro_ignicion"),
    anio = ee.Image("users/raulnanclares/incendios_forestales_anio"),
    freq = ee.Image("users/raulnanclares/incendios_forestales_frecuencia"),
    interfazUF = ee.FeatureCollection("users/raulnanclares/interfaz_urbano_forestal"),
    anps = ee.FeatureCollection("users/raulnanclares/anps_jalisco"),
    comb = ee.Image("users/raulnanclares/disponibilidad_combustible"),
    peligroMeteo = ee.Image("users/alexanderquevedo/incendios/abril/2020w18");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var palettes = require('users/gena/packages:palettes');
var ndvi_info = require("users/alexanderquevedo/jalisco/:NDVI_Anomalias")
var viridis = palettes.matplotlib.viridis[7]
var plasma = palettes.matplotlib.plasma[7]
var inferno = palettes.matplotlib.inferno[7]
var paleta_ndvi = palettes.colorbrewer.RdYlGn[7] 
var visParam = {min:1, max:5, palette:['#FFFFB2','#FECC5C', '#FD8D3C', '#F03B20','#BD0026']}
var visParamAnio = {min:2000, max:2019, palette: viridis}
var visParamFreq = {min:1, max:11, palette: plasma}
var visParamPeligroMeteo = {min:0, max:1, palette:['#FFFFB2','#FECC5C', '#FD8D3C', '#F03B20','#BD0026']}
var riesgoCombinado = ignicion.multiply(peligroMeteo.multiply(100))
var visParam2 = {min:10, max:500, palette:['#FFFFB2','#FECC5C', '#FD8D3C', '#F03B20','#BD0026']}
var visParamNDVIanom = {min: -5, max:5, palette:paleta_ndvi}
var Mapa = ui.Map()
Mapa.setCenter(-103.597, 20.414, 9)
Mapa.addLayer(ignicion, visParam, 'Peligro de Ignición', false)
Mapa.addLayer(peligroMeteo, visParamPeligroMeteo, 'Peligro Meteorológico Semanal', false)
Mapa.addLayer(riesgoCombinado, visParam2, 'Peligro Combinado')
Mapa.addLayer(comb, visParam, 'Disponibilidad de Combustible', false)
Mapa.addLayer(anio, visParamAnio, 'Año Último Incendio')
Mapa.addLayer(freq, visParamFreq, 'Número de Incendios - 2000 a 2019')
Mapa.addLayer(interfazUF, {color: '#46E8F0', opacity: 0.7}, 'Interfaz Urbano Forestal', true)
Mapa.addLayer(anps, {color: '#4DAF4A', opacity: 0.7}, 'Áreas Naturales Protegidas', true)
Mapa.addLayer(ndvi_info.ultima_anomalia,visParamNDVIanom,ndvi_info.mes_anomalia, false)
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
var legendTitle = ui.Label({
  value: 'Peligro de Ignición',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legendTitle);
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((visParam.max-visParam.min)/100.0).add(visParam.min);
var legendImage = gradient.visualize(visParam);
var panel = ui.Panel({
    widgets: [
      ui.Label(visParam['max'])
    ],
  });
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
  image: legendImage,
  params: {bbox:'0,0,10,100', dimensions:'10x30'},
  style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label(visParam['min'])
    ],
  });
legend.add(panel);
var legendTitle2 = ui.Label({
  value: 'Año Último Incendio',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legendTitle2);
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((visParamAnio.max-visParamAnio.min)/100.0).add(visParamAnio.min);
var legendImage2 = gradient.visualize(visParamAnio);
var panel = ui.Panel({
    widgets: [
      ui.Label(visParamAnio['max'])
    ],
  });
legend.add(panel);
// create thumbnail from the image
var thumbnail2 = ui.Thumbnail({
  image: legendImage2,
  params: {bbox:'0,0,10,100', dimensions:'10x30'},
  style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail2);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label(visParamAnio['min'])
    ],
  });
legend.add(panel);
var legendTitle3 = ui.Label({
  value: 'Número de Incendios',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legendTitle3);
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((visParamFreq.max-visParamFreq.min)/100.0).add(visParamFreq.min);
var legendImage3 = gradient.visualize(visParamFreq);
var panel = ui.Panel({
    widgets: [
      ui.Label(visParamFreq['max'])
    ],
  });
legend.add(panel);
// create thumbnail from the image
var thumbnail3 = ui.Thumbnail({
  image: legendImage3,
  params: {bbox:'0,0,10,100', dimensions:'10x30'},
  style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail3);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label(visParamFreq['min'])
    ],
  });
legend.add(panel);
var panel = ui.Panel({
    widgets: [
      ui.Label(visParamAnio['min'])
    ],
  });
var legendTitle4 = ui.Label({
  value: 'Peligro Meteorológico',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legendTitle4);
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((visParamPeligroMeteo.max-visParamPeligroMeteo.min)/100.0)
.add(visParamPeligroMeteo.min);
var legendImage4 = gradient.visualize(visParamPeligroMeteo);
var panel = ui.Panel({
    widgets: [
      ui.Label('Muy Alto')
    ],
  });
legend.add(panel);
// create thumbnail from the image
var thumbnail4 = ui.Thumbnail({
  image: legendImage4,
  params: {bbox:'0,0,10,100', dimensions:'10x30'},
  style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail4);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label('Bajo')
    ],
  });
legend.add(panel);
var legendTitle5 = ui.Label({
  value: 'Disponibilidad de Combustible',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legendTitle5);
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((visParam.max-visParam.min)/100.0)
.add(visParam.min);
var legendImage5 = gradient.visualize(visParam);
var panel = ui.Panel({
    widgets: [
      ui.Label('Muy Alta')
    ],
  });
legend.add(panel);
// create thumbnail from the image
var thumbnail5 = ui.Thumbnail({
  image: legendImage5,
  params: {bbox:'0,0,10,100', dimensions:'10x30'},
  style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail5);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label('Baja')
    ],
  });
legend.add(panel);
Mapa.add(legend)
var toolPanel = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
  });
var toolPanelTitle = ui.Label({
  value: 'Información',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
toolPanel.add(toolPanelTitle)
Mapa.add(toolPanel)
Mapa.onClick(function(coords) {
  var location = 'Longitud: ' + coords.lon.toFixed(4) + ' ' +
                 'Latitud: ' + coords.lat.toFixed(4);
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
  var combinedRisk = riesgoCombinado.reduceRegion(ee.Reducer.first(), click_point, 90).evaluate(function(val){
    var riskText = 'Peligro Combinado: ' + val.b1.toFixed(2);
    toolPanel.widgets().set(2, ui.Label(riskText));
  });
  var lastYear = anio.reduceRegion(ee.Reducer.first(), click_point, 90).evaluate(function(val){
    var yearText = 'Año Ultimo Incendio: ' + val.b1;
    toolPanel.widgets().set(3, ui.Label(yearText));
  })
   var fireFreq = freq.reduceRegion(ee.Reducer.first(), click_point, 90).evaluate(function(val){
    var yearText = 'Número de Incendios: ' + val.b1;
    toolPanel.widgets().set(4, ui.Label(yearText));
  })
  toolPanel.widgets().set(1, ui.Label(location));
// Edit: To be temporary, the "loading..." panel number has to be the same as the demText panel number (changed from 1 to 2).
//  toolPanel.widgets().set(1, ui.Label("Cargando..."));
  Map.layers().set(1, ui.Map.Layer(click_point, {color: 'FF0000'}));
//  Map.layers().set(2, ui.Map.Layer(click_point, {color: 'FF0000'}));
});
Mapa.setOptions('HYBRID')
var header = ui.Label('Sistema de Información de Incendios Forestales - Gobierno de Jalisco', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
ui.root.widgets().reset([header, Mapa]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));