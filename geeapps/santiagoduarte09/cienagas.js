//  Buscando el Magdalena
// Con Ayuda de la Santa Maria
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// Add a title and some explanatory text to a side panel.
var header = ui.Label('Exploring Artificial Intelligence (AI) for linking water resources and digital citizens information ', {fontSize: '18px'});
var subheader = ui.Label('Natural Language Processing (NLP) application to the Magdalena River Basin: Swamps', {fontSize: '14px'});
var text = ui.Label(' Explore the main topics of the main water bodies in the Magdalena River basin according to the most important newspapers in the country at the national and regional level in the last years',{fontSize: '12px'})
var text2 =  ui.Label('Discover the annual perception (sentiment) by applying Natural Language Processing (NLP) techniques to almost 20,000 articles between January 2016 and July 2020. ',{fontSize: '12px'})
var text3 =  ui.Label('To start, click on the colored elements on the map.',{fontSize: '14px'});
var panel = ui.Panel([header,subheader, text, text2, text3], 'flow', {width: '250px'});
ui.root.widgets()
// Create Map With Cursor
ui.root.clear();
var map = ui.Map();
ui.root.add(panel).add(map);
map.style().set('cursor', 'crosshair');
map.setCenter(-74, 10, 7.5);
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {position: 'top-right',}});
inspector.add(ui.Label('Click for details'));
map.add(inspector);
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// CARGAR DATOS
// Import Features 
var river = ee.FeatureCollection('users/santiagoduarte09/lasantamaria/CienagasMagdalena');
// Import Basin
var region=ee.FeatureCollection('users/santiagoduarte09/lasantamaria/areamagda');
var empty = ee.Image().byte();
var fills = empty.paint({
  featureCollection: region,
});
var visParams = {
  palette:'blue',
  opacity:0.1
};
var lluvia = ui.Map.Layer(fills, visParams, 'Cuenca');
map.layers().set(0, lluvia);
// CREATE LEGEND
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
var legendTitle = ui.Label({
  value: 'Sentiment Analysis',
  style: {
    fontWeight: 'bold', 
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
legend.add(legendTitle);
var texto4=ui.Label('For the sentiment classification, those articles with a calculated value lower than 0.3 were considered negative, and those with a calculated value higher than 0.6 as positive.', {fontSize: '10px'})
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
var names =['Negative', 'Neutral',  'Positive','No Info'];
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
    // Get Actual Date
  var fecha=range.start().get('year');
  range.start().get('year').evaluate(function(name) {
    // Add Precipitation Map
    var visParams = {
      min: 0,
      max: 1,
      // palette:mipaleta,
      opacity:0.3
    };
    // Add River Map
    var bad = ee.FeatureCollection(river.filter(ee.Filter.eq('Tens '+fecha.getInfo(), 'Malo')));
    var neutral = ee.FeatureCollection(river.filter(ee.Filter.eq('Tens '+fecha.getInfo(), 'Neutro')));
    var noexiste = ee.FeatureCollection(river.filter(ee.Filter.eq('Tens '+fecha.getInfo(), 'No')));
    var good = ee.FeatureCollection(river.filter(ee.Filter.eq('Tens '+fecha.getInfo(), 'Bueno')));
    var bad_sent = empty.paint({featureCollection: bad});
    var bad_map = ui.Map.Layer(bad_sent, {palette:'red'},'Negative');
    map.layers().set(3, bad_map);
    var neutral_sent = empty.paint({featureCollection: neutral});
    var neutral_map = ui.Map.Layer(neutral_sent, {palette:'yellow'},'Neutral');
    map.layers().set(4, neutral_map);
    var noexiste_sent = empty.paint({featureCollection: noexiste});
    var noexiste_map = ui.Map.Layer(noexiste_sent, {},'No_Info');
    map.layers().set(5, noexiste_map);
    var good_sent = empty.paint({featureCollection: good});
    var good_map = ui.Map.Layer(good_sent, {palette:'green'},'Positive');
    map.layers().set(6, good_map);
  });
  // GET INFORMATION ON CLICK
  map.onClick(function(coords) {
    // Analisis Points
    inspector.clear()
    inspector.add(ui.Label('Loading ...'));
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    // Define a spatial filter, with distance 50 km and a save distance
    var distFilter = ee.Filter.withinDistance({
      distance: 10000,
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
    print(spatialFill)
      var hasNearest = spatialFill.map(function(f) {
      var neighsSize = ee.List(f.get('points')).size();
      return f.set('neighsSize', neighsSize);
    }).filter(ee.Filter.gt('neighsSize', 1));
     print(hasNearest)
    // Name
    var name =  spatialFill.first().get('Element');
    // Clase
    var clase =  spatialFill.first().get('Class');
    // Sentiment
    var riv_sentiment =  spatialFill.first().get('Sent '+fecha.getInfo());
    var sentiment_riv=ee.Number.parse(riv_sentiment);
    // Topicos
    var topic =  spatialFill.first().get('Top '+fecha.getInfo());
    // Articulos
    var articulos =  spatialFill.first().get('Art '+fecha.getInfo());
    // Links
    var links =  spatialFill.first().get('Class');
    // Dislay results in Panel
    name.evaluate(function(result) {
      inspector.widgets().set(0, ui.Label({
        value: 'Name: ' + result,
        style: {stretch: 'vertical',fontSize: '18px'},
      }));
    });
    clase.evaluate(function(result) {
      inspector.widgets().set(1, ui.Label({
        value: 'Type: ' + result,
        style: {stretch: 'vertical',fontSize: '14px'},
      }));
    });
   // inspector.widgets().set(2, ui.Label({
   //   value: 'Año: ' + fecha.getInfo(),
  //    style: {stretch: 'vertical',fontSize: '12px', color: 'red'},
  //     }));
    sentiment_riv.evaluate(function(result){
      inspector.widgets().set(2, ui.Label({
        value: 'Sentiment: ' +  result.toFixed(3),
        style: {stretch: 'vertical',fontSize: '14px'}
      }));
    });
    topic.evaluate(function(result) {
     inspector.widgets().set(3, ui.Label({
      value: 'Key Topics: ' + result,
       style: {stretch: 'horizontal',width: '200px',fontSize: '14px'}
      }));
    });
     articulos.evaluate(function(result) {
      inspector.widgets().set(4, ui.Label({
       value: 'Articles: ' + result,
       style: {stretch: 'vertical',fontSize: '14px'}
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