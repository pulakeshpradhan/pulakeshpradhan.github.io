//  Buscando el Magdalena
// Con Ayuda de la Santa Maria
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Buscando el Magdalena', {fontSize: '18px'});
var text3 =  ui.Label('Para comenzar da click a los elementos coloreados en el mapa.',{fontSize: '14px'});
var panel = ui.Panel([text3], 'flow', {width: '250px'});
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
var era5_pre = era.select('total_precipitation')
// CREATE LEGEND
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '10px 50px'
  }
});
var legendTitle = ui.Label({
  value: 'ERA 5 Data',
  style: {
    fontWeight: 'bold', 
    fontSize: '20px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legendTitle);
var texto4=ui.Label('ERA5 is the fifth generation ECMWF reanalysis for the global climate and weather for the past 4 to 7 decades. Currently data is available from 1950, split into Climate Data Store entries for 1950-1978 (preliminary back extension) and from 1979 onwards (final release plus timely updates, this page). ERA5 replaces the ERA-Interim reanalysis.', {fontSize: '11px'})
legend.add(texto4);
var texto5=ui.Label('Taken from https://cds.climate.copernicus.eu/', {fontSize: '10px'})
legend.add(texto5);
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
var palette = ['blue', 'blue', 'blue', 'blue'];
panel.add(legend);
// DATESLIDE
// Use the start of the collection and now to bound the slider.
var start = ee.Date.fromYMD(2016, 1, 1);
var now = Date.now();
var end =  ee.Date.fromYMD(2021, 1, 1).format();
// Run this function on a change of the dateSlider.
var showMosaic = function(range) {
  var preci = era5_pre.filterDate(range.start(), range.end());
  var preci_clip =ee.Image(preci.mean()).clip(region)
  // Get Actual Date
  var fecha=range.start().get('year');
  range.start().get('year').evaluate(function(name) {
    // Add Precipitation Map
    var visParams = {
      min: 0,
      max: 0.4,
      palette:mipaleta.reverse(),
      opacity:0.8
    };
    var lluvia = ui.Map.Layer(preci_clip, visParams, 'Precipitación '+name );
    map.layers().set(0, lluvia);
    // Add River Map 
    var rioParams = {
      palette:'blue'
    };
    var rio = ui.Map.Layer(river, rioParams, 'Rio ' );
    map.layers().set(1, rio);
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
    // Precipitation
    var temporalPre = era5_pre.reduce(ee.Reducer.mean());
    var precipitacion = temporalPre.reduceRegion(ee.Reducer.mean(), point, 30).get('total_precipitation_mean');
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
    precipitacion.evaluate(function(result) {
      inspector.widgets().set(3, ui.Label({
        value: 'Precipitación (mm): ' + (result*1000).toFixed(2),
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