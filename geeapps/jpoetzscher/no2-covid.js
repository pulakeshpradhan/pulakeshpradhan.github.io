var palette = ['f7fbff', 'deebf7', 'c6dbef', '9ecae1', '6baed6', '4292c6', '2171b5', '08519c', '08306b'];
var vis = {
  'min': 0,
  'max': 150,
  'opacity': 0.85,
  'palette': palette
};
function SentinelComposite(Start,end) {
  var Startt = ee.Date(Start);
  var endd = ee.Date(end);
  var NO2 = 'NO2_column_number_density';
  var sentinel1 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                      .filterDate(Startt,endd)
                      .select(NO2)
                      .mean()
                      .multiply(1e6);
    return sentinel1;
}
  var images20 = {
     'Mar 01 - Mar 07 2019':SentinelComposite('2019-03-01', '2019-03-07'),
          'Mar 01 - Mar 07 2020':SentinelComposite('2020-03-01', '2020-03-07'),
     'Mar 08 - Mar 14 2019':SentinelComposite('2019-03-08', '2019-03-14'),
          'Mar 08 - Mar 14 2020':SentinelComposite('2020-03-08', '2020-03-14'),
     'Mar 15 - Mar 21 2019':SentinelComposite('2019-03-15', '2019-04-21'),
          'Mar 15 - Mar 21 2020':SentinelComposite('2020-03-15', '2020-04-21'),
     'Mar 22 - Mar 28 2019':SentinelComposite('2019-03-22', '2019-04-28'),
          'Mar 22 - Mar 28 2020':SentinelComposite('2020-03-22', '2020-04-28'),
     'Mar 29 - Apr 04 2019':SentinelComposite('2019-03-29', '2019-04-04'),
          'Mar 29 - Apr 04 2020':SentinelComposite('2020-03-29', '2020-04-04'),
     'Apr 05 - Apr 11 2019':SentinelComposite('2019-04-05', '2019-04-11'),
          'Apr 05 - Apr 11 2020':SentinelComposite('2020-04-05', '2020-04-11'),
     'Apr 12 - Apr 18 2019':SentinelComposite('2019-04-12', '2019-04-18'),
          'Apr 12 - Apr 18 2020':SentinelComposite('2020-04-12', '2020-04-18'),
     'Apr 19 - Apr 27 2019':SentinelComposite('2019-04-19', '2019-04-27'),
          'Apr 19 - Apr 27 2020':SentinelComposite('2020-04-19', '2020-04-27'),
       }       
var images19 = {
     'Mar 01 - Mar 07 2019':SentinelComposite('2019-03-01', '2019-03-07'),
          'Mar 01 - Mar 07 2020':SentinelComposite('2020-03-01', '2020-03-07'),
     'Mar 08 - Mar 14 2019':SentinelComposite('2019-03-08', '2019-03-14'),
          'Mar 08 - Mar 14 2020':SentinelComposite('2020-03-08', '2020-03-14'),
     'Mar 15 - Mar 21 2019':SentinelComposite('2019-03-15', '2019-04-21'),
          'Mar 15 - Mar 21 2020':SentinelComposite('2020-03-15', '2020-04-21'),
     'Mar 22 - Mar 28 2019':SentinelComposite('2019-03-22', '2019-04-28'),
          'Mar 22 - Mar 28 2020':SentinelComposite('2020-03-22', '2020-04-28'),
     'Mar 29 - Apr 04 2019':SentinelComposite('2019-03-29', '2019-04-04'),
          'Mar 29 - Apr 04 2020':SentinelComposite('2020-03-29', '2020-04-04'),
     'Apr 05 - Apr 11 2019':SentinelComposite('2019-04-05', '2019-04-11'),
          'Apr 05 - Apr 11 2020':SentinelComposite('2020-04-05', '2020-04-11'),
     'Apr 12 - Apr 18 2019':SentinelComposite('2019-04-12', '2019-04-18'),
          'Apr 12 - Apr 18 2020':SentinelComposite('2020-04-12', '2020-04-18'),
     'Apr 19 - Apr 27 2019':SentinelComposite('2019-04-19', '2019-04-27'),
          'Apr 19 - Apr 27 2020':SentinelComposite('2020-04-19', '2020-04-27'),
       }       
var aboutPanel_visible=1;
// Create legend panel 
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {position: 'bottom-left', margin: '20px'}
});
// Create two maps.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector_l(leftMap, 0, 'top-left');
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector_r(rightMap, 0, 'top-right');
rightMap.setCenter(0.0, 0.0, 2.5);
leftMap.setCenter(0.0,0.0,2.5);
function addLayerSelector_l(mapToChange, defaultValue, position) {
  // Creates Title for legend
var panelTitle = ui.Label({
  value: 'Impact of COVID-19 on Global NO2 Levels',
  style: {fontWeight: 'bold', fontSize: '15px', backgroundColor: 'grey', color: 'white'}
});
  // Creates Title for legend
 var label = ui.Panel({
 //  label.clear();  
  style: {
  //  fontWeight: 'bold', 
  //  fontSize: '13px',
    position: 'top-left',
    backgroundColor: 'grey', color: 'white'
  }
});
  label.clear();  
  label.style().set('shown', true);
 var la = ui.Label({
    value: 'Choose a  time period to compare',
    style: {fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
    });
  label.add(la);
var inspectorTitle = ui.Label({
  value: 'Value at Point',
  style: {margin: '4px 8px', fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
});
  // Create the inspector panel, initially hiding it.
  var placeHolder = ui.Label({
    value: 'Click a point to get value',
    style: {margin: '4px 8px', fontSize: '13px', backgroundColor: 'grey', color: 'white'},
    });
   var inspector = ui.Panel({style: {shown: true, backgroundColor: 'grey', color: 'black'},  widgets: [
    placeHolder
  ]});
//   mapToChange.add(inspector);
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
   mapToChange.layers().set(0, ui.Map.Layer(images20[selection].visualize(vis)));
  // Set the default map's cursor to a "crosshair".
 // mapToChange.style().set('cursor', 'crosshair');
// Register a callback on the map to be invoked when the map is clicked.
  mapToChange.onClick(function(coords) {
  var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                 'lat: ' + coords.lat.toFixed(4);
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
  var NO2 = images20[selection].reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: click_point,
    scale: 1000
  }).get('NO2_column_number_density');
 var latLabel = ui.Label({
    value: 'Latitude: ' + Math.round(coords.lat * 1000) / 1000,
    style: {margin: '4px 8px', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
    });
 var lonLabel = ui.Label({
    value: 'Longitude: ' + Math.round(coords.lon * 1000) / 1000,
    style: {margin: '4px 8px', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
    });   
 NO2.evaluate(function(val){
    inspector.clear();
   var demText = ui.Label({
    value: 'NO2 Column: ' + Math.round(val * 1000) / 1000 + ' (µmol/m2)',
    style: {margin: '4px 8px', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
    });
    inspector.widgets().set(0, latLabel);
    inspector.widgets().set(1, lonLabel);
    inspector.widgets().set(2, demText);
   // demText.style(color: 'black');
 //   inspector.add(ui.Button('Close', function() {
  //  inspector.style().set({shown: false});
 //   }));
    inspector.style().set({shown: true});
  });
 // mapToChange.layers().set(1, ui.Map.Layer(click_point, {color: 'black'}));
  });
}
 // Creates Title for legend
 var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    backgroundColor: 'grey', color: 'white'
  }
});
// Creates Title for legend
var legendTitle = ui.Label({
  value: 'NO2 Column Number Density (µmol/m2)',
  style: {fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
});
legend.add(legendTitle);
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Creates the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '20px'},
});
legend.add(colorBar);
// Creates a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px', backgroundColor: 'grey', color: 'white'}),
    ui.Label(
        ((vis.max + vis.min) / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontWeight: 'bold', fontSize: '11px', backgroundColor: 'grey', color: 'white'}),
    ui.Label(vis.max, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px', backgroundColor: 'grey', color: 'white'})
  ],
  style: {
  backgroundColor: 'grey',
  color: 'white'
  },
  layout: ui.Panel.Layout.flow('horizontal')
});
legend.add(legendLabels);
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images20), onChange: updateMap, style: {color: 'black'}});
  select.setValue(Object.keys(images20)[15], true);
  var controlPanel =
      ui.Panel({widgets: [panelTitle, label, select, inspectorTitle, inspector, legend], style: {position: position, backgroundColor: 'grey', color: 'white'}});
  // var panel =
      // ui.Panel({widgets: [label, select], style: {position: position}});
//  leftMap.add(controlPanel);
//  rightMap.add(panel);
mapToChange.add(controlPanel);
}
function addLayerSelector_r(mapToChange, defaultValue, position) {
  // Creates Title for legend
 var label = ui.Panel({
 //  label.clear();  
  style: {
    position: 'top-left',
    backgroundColor: 'grey', color: 'white'
  }
});
  label.clear();  
  label.style().set('shown', true);
 var la = ui.Label({
    value: 'Choose a  time period to compare',
    style: {fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
    });
  label.add(la);  
//Inspector title
var inspectorTitle = ui.Label({
  value: 'Value at Point',
  style: {margin: '4px 8px', fontWeight: 'bold', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
});
// Create the inspector panel, initially hiding it.
// var le = ui.Label('Click on Map');
    var placeHolder = ui.Label({
    value: 'Click a point to get value',
    style: {margin: '4px 8px', fontSize: '13px', backgroundColor: 'grey', color: 'white'},
    });
   var inspector = ui.Panel({style: {shown: true, backgroundColor: "grey"},  widgets: [
   placeHolder
  ]});
 //  mapToChange.add(inspector);
  // This function changes the given map to show the selected image. 
  function updateMap(selection) {
   mapToChange.layers().set(0, ui.Map.Layer(images19[selection].visualize(vis)));
  // Set the default map's cursor to a "crosshair".
//  mapToChange.style().set('cursor', 'crosshair');
// Register a callback on the map to be invoked when the map is clicked.
  mapToChange.onClick(function(coords) {
  var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                 'lat: ' + coords.lat.toFixed(4);
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
  var NO2 = images19[selection].reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: click_point,
    scale: 100
  }).get('NO2_column_number_density');
 var latLabel = ui.Label({
    value: 'Latitude: ' + Math.round(coords.lat * 1000) / 1000,
    style: {margin: '4px 8px', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
    });
 var lonLabel = ui.Label({
    value: 'Longitude: ' + Math.round(coords.lon * 1000) / 1000,
    style: {margin: '4px 8px', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
    });   
 NO2.evaluate(function(val){
    inspector.clear();
   var demText = ui.Label({
    value: 'NO2 Column: ' + Math.round(val * 1000) / 1000 + ' (µmol/m2)',
    style: {margin: '4px 8px', fontSize: '13px', backgroundColor: 'grey', color: 'white'}
    });
    inspector.widgets().set(0, latLabel);
    inspector.widgets().set(1, lonLabel);
    inspector.widgets().set(2, demText);
  //  inspector.add(ui.Button('Close', function() {
  //  inspector.style().set({shown: false});
 //   }));
    inspector.style().set({shown: true});
  });
  });
}
// Configure a selection dropdown to allow the user to choose between images,
// and set the map to update when a user makes a selection.
var select = ui.Select({items: Object.keys(images19), onChange: updateMap, style: {color: 'black'}
});
select.setValue(Object.keys(images19)[7], true);
var controlPanel =
      ui.Panel({widgets: [label, select, inspectorTitle, inspector], style: {position: position, backgroundColor: 'grey', color: 'white'}}); 
mapToChange.add(controlPanel);
}
// Link them together.
var linker = new ui.Map.Linker([leftMap, rightMap]);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
// Remove the default map from the root panel.
ui.root.clear();
// Add our split panel to the root panel.
ui.root.add(splitPanel);
rightMap.setCenter(0.0, 0.0, 2.5);
leftMap.setCenter(0.0,0.0,2.5);
// Add the legend to the linked map.
//rightMap.add(legend);