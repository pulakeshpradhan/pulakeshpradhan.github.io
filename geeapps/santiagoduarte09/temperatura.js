//  Buscando el Magdalena
// Con Ayuda de la Santa Maria 
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Buscando el Magdalena', {fontSize: '18px'});
var subheader = ui.Label('con ayuda de la Santa Maria', {fontSize: '14px'});
var text = ui.Label(' Explora año tras año los principales temas de los elementos de la cuenca del Río Magdalena acorde con los diarios más importantes del país a nivel nacional y regional.',{fontSize: '12px'})
var text2 =  ui.Label('Descubre su percepción (sentimiento) anual mediante la aplicación de tecnicas de Procesamiento del Lenguaje Natual (NLP) a más de 14000 articulos entre el 1 de Enero de 2016 y el 1 de Junio de 2020. ',{fontSize: '12px'})
var text3 =  ui.Label('Para comenzar da click a los elementos coloreados en el mapa.',{fontSize: '14px'});
var panel = ui.Panel([header,subheader, text, text2, text3], 'flow', {width: '250px'});
ui.root.widgets()
// Create Map With Cursor
ui.root.clear();
var map = ui.Map();
ui.root.add(panel).add(map);
map.style().set('cursor', 'crosshair');
map.setCenter(-72, 6.5, 5.7);
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {position: 'top-right',}});
inspector.add(ui.Label('Click para obtener detalles'));
map.add(inspector);
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Cargar paleta de colores
var paletas=require('users/gena/packages:palettes')
var mipaleta=paletas.colorbrewer.Spectral[11].reverse()
// CARGAR DATOS
// Import Features
var river = ee.FeatureCollection('users/santiagoduarte09/lasantamaria/RiosMagdalena');
// Import Basin
var region=ee.FeatureCollection('users/santiagoduarte09/lasantamaria/areamagda');
var empty = ee.Image().byte();
var fills = empty.paint({
  featureCollection: region,
});
var visParams = {
  palette:'blue',
  opacity:0.2
};
var basin = ui.Map.Layer(fills, visParams, 'Cuenca');
// Import Images
var era=ee.ImageCollection("ECMWF/ERA5/MONTHLY")
var era5_tas = era.select('mean_2m_air_temperature')
// CREATE LEGEND
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
var legendTitle = ui.Label({
  value: 'Análisis de Sentimiento',
  style: {
    fontWeight: 'bold', 
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legendTitle);
var texto4=ui.Label('Para la clasificacicón  del sentimiento se consideraron como negativos aquellos articulos con un valor calculado inferior a 0.3, y como  positivos aquellos con un valor calculado superior a 0.6', {fontSize: '10px'})
legend.add(texto4);
var makeRow = function(color, name) {
    var colorBox = ui.Label({
      style: {
        backgroundColor: color,
        padding: '6px',
        margin: '0 0 3px 0'
      }
    });
    var description = ui.Label({
      value: name,
      style: {margin: '0 0 4px 6px'}
    });
    return ui.Panel({
      widgets: [colorBox, description],
      layout: ui.Panel.Layout.Flow('horizontal')
    });
};
var palette = ['red', 'yellow', 'green', 'black'];
var names =['Negativo', 'Neutro',  'Positivo','No Info'];
 for (var i = 0; i < 4; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
panel.add(legend);
// DATESLIDE
// Use the start of the collection and now to bound the slider.
var start = ee.Date.fromYMD(2016, 1, 1);
var now = Date.now();
var end =  ee.Date.fromYMD(2021, 1, 1).format();
// Run this function on a change of the dateSlider.
var showMosaic = function(range) {
  var tempe = era5_tas.filterDate(range.start(), range.end());
  var tempe_clip =ee.Image(tempe.mean()).clip(region)
  // Get Actual Date
  var fecha=range.start().get('year');
  range.start().get('year').evaluate(function(name) {
    // Add Temperature  Map
     var visParamsTas = {
      min: 224,
      max: 304,
      palette:mipaleta,
      opacity:0.8
    };
    var calor = ui.Map.Layer(tempe_clip, visParamsTas, 'Temperatura'+name );
    map.layers().set(0, calor);
    // Add River Map
    var bad = ee.FeatureCollection(river.filter(ee.Filter.eq('Tens '+fecha.getInfo(), 'Malo')));
    var neutral = ee.FeatureCollection(river.filter(ee.Filter.eq('Tens '+fecha.getInfo(), 'Neutro')));
    var noexiste = ee.FeatureCollection(river.filter(ee.Filter.eq('Tens '+fecha.getInfo(), 'No')));
    var good = ee.FeatureCollection(river.filter(ee.Filter.eq('Tens '+fecha.getInfo(), 'Bueno')));
    var bad_sent = empty.paint({featureCollection: bad, width: 2});
    var bad_map = ui.Map.Layer(bad_sent, {palette:'red'},'Negativo');
    map.layers().set(1, bad_map);
    var neutral_sent = empty.paint({featureCollection: neutral, width: 2});
    var neutral_map = ui.Map.Layer(neutral_sent, {palette:'yellow'},'Neutro');
    map.layers().set(2, neutral_map);
    var noexiste_sent = empty.paint({featureCollection: noexiste, width: 2});
    var noexiste_map = ui.Map.Layer(noexiste_sent, {},'No_Info');
    map.layers().set(3, noexiste_map);
    var good_sent = empty.paint({featureCollection: good, width: 2});
    var good_map = ui.Map.Layer(good_sent, {palette:'green'},'Positivo');
    map.layers().set(4, good_map);
  });
  // GET INFORMATION ON CLICK
  map.onClick(function(coords) {
    // Analisis Points
    inspector.clear()
    inspector.add(ui.Label('Cargando ...'));
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    // Define a spatial filter, with distance 50 km and a save distance
    var distFilter = ee.Filter.withinDistance({
      distance: 50000,
      leftField: '.geo',
      rightField: '.geo',
      maxError: 10
    });
    var distSaveAll = ee.Join.saveAll({
      matchesKey: 'points',
      measureKey: 'distance'
    });
    // Calculate Parameters
    var spatialFill = distSaveAll.apply(river, point, distFilter);
    // Name
    var name =  spatialFill.first().get('Element');
    // Clase
    var clase =  spatialFill.first().get('Class');
    // Sentiment
    var riv_sentiment =  spatialFill.first().get('Sent '+fecha.getInfo());
    var sentiment_riv=ee.Number.parse(riv_sentiment);
    // Temperature
    var temporalTas = era5_tas.reduce(ee.Reducer.mean());
    var temperatura =  temporalTas.reduceRegion(ee.Reducer.mean(), point, 30).get('mean_2m_air_temperature_mean');
    // Dislay results in Panel
    name.evaluate(function(result) {
      inspector.widgets().set(0, ui.Label({
        value: 'Nombre: ' + result,
        style: {stretch: 'vertical',fontSize: '18px'},
      }));
    });
    clase.evaluate(function(result) {
      inspector.widgets().set(1, ui.Label({
        value: 'Clase: ' + result,
        style: {stretch: 'vertical',fontSize: '14px'},
      }));
    });   
    sentiment_riv.evaluate(function(result){
      inspector.widgets().set(2, ui.Label({
        value: 'Sentimiento: ' +  result.toFixed(3),
        style: {stretch: 'vertical',fontSize: '12px'}
      }));
    });
    temperatura.evaluate(function(result) {
      inspector.widgets().set(3, ui.Label({
        value: 'Temperatura (°C): ' + (result-273.15).toFixed(2),
        style: {stretch: 'vertical',fontSize: '12px'}
      }));
    });
  });
};
// Asynchronously compute the date range and show the slider.
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 365,
    onChange: showMosaic,
    style: {
    position: 'bottom-center',
    width:'230px',
  }
  });
  map.add(dateSlider.setValue(now));
});
map.drawingTools().setShown(false);