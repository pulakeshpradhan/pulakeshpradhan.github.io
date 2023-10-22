var palette = ['black', 'purple','blue', 'cyan', 'yellow', 'orange', 'red'];
var vis = {
  'min': 0,
  'max': 200,
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
     'Feb 1-Today 2020':SentinelComposite('2020-02-01', '2020-04-07'),
     'Mar 1-Today 2020':SentinelComposite('2020-03-01', '2020-04-07'),
     'Mar 2020':SentinelComposite('2020-03-01', '2020-03-31'),
     'Mar 1-10 2020':SentinelComposite('2020-03-01', '2020-03-10'),
     'Mar 1-20 2020':SentinelComposite('2020-03-01', '2020-03-20'),
     'Mar 11-20 2020':SentinelComposite('2020-03-11', '2020-03-20'),
     'Mar 11-31 2020':SentinelComposite('2020-03-11', '2020-03-31'),
     'Mar 21-30 2020':SentinelComposite('2020-03-21', '2020-03-30'),
     'Mar 31 - Apr 7 2020':SentinelComposite('2020-03-31', '2020-04-07'),
       }
var images19 = { 
     'Feb 1-Today 2019':SentinelComposite('2019-02-01', '2019-04-07'),
     'Mar 1-Today 2019':SentinelComposite('2019-03-01', '2019-04-07'),
     'Mar 2019':SentinelComposite('2019-03-01', '2019-03-31'),
     'Mar 1-10 2019':SentinelComposite('2019-03-01', '2019-03-10'),
     'Mar 1-20 2019':SentinelComposite('2019-03-01', '2019-03-20'),
     'Mar 11-20 2019':SentinelComposite('2019-03-11', '2019-03-20'),
     'Mar 11-31 2019':SentinelComposite('2019-03-11', '2019-03-31'),
     'Mar 21-30 2019':SentinelComposite('2019-03-21', '2019-03-30'),
     'Mar 31 - Apr 7 2019':SentinelComposite('2019-03-31', '2019-04-07'),
       }       
// Create two maps.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector_l(leftMap, 0, 'top-left');
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector_r(rightMap, 0, 'top-right');
function addLayerSelector_r(mapToChange, defaultValue, position) {
  // Creates Title for legend
var panelTitle = ui.Label({
  value: 'NO2 Column Number Density (umol/m2)',
  style: {fontWeight: 'bold', fontSize: '13px'}
});
  // Creates Title for legend
  var label = ui.Panel();
  label.clear();  
  label.style().set('shown', true);
  var la = ui.Label('Choose a  time-period to visualize 2020');
  //legend.add(legendTitle);
  label.add(la);
  // Create the inspector panel, initially hiding it.
  // var le = ui.Label('Click on Map');
   var inspector = ui.Panel({style: {shown: true,width: '300px',position: "middle-right"},  widgets: [
    ui.Label('Click on the map to get NO2 Value .')
  ]});
   mapToChange.add(inspector);
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
   mapToChange.layers().set(0, ui.Map.Layer(images20[selection].visualize(vis)));
  // Set the default map's cursor to a "crosshair".
  mapToChange.style().set('cursor', 'crosshair');
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
 NO2.evaluate(function(val){
    inspector.clear();
    var demText = 'NO2 : ' + val;
    inspector.widgets().set(0, ui.Label(demText));
    inspector.add(ui.Button('Close', function() {
    inspector.style().set({shown: false});
    }));
    inspector.style().set({shown: true});
  });
  mapToChange.layers().set(1, ui.Map.Layer(click_point, {color: 'black'}));
  });
}
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images20), onChange: updateMap});
  select.setValue(Object.keys(images20)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [panelTitle,label, select], style: {position: position}});
  // var panel =
      // ui.Panel({widgets: [label, select], style: {position: position}});
//  leftMap.add(controlPanel);
//  rightMap.add(panel);
mapToChange.add(controlPanel);
}
function addLayerSelector_l(mapToChange, defaultValue, position) {
  // Creates Title for legend
  var label = ui.Panel();
  label.clear();  
  label.style().set('shown', true);
  var la = ui.Label('Choose a  time-period to visualize 2019');
  //legend.add(legendTitle);
  label.add(la);
  // Create the inspector panel, initially hiding it.
  // var le = ui.Label('Click on Map');
   var inspector = ui.Panel({style: {shown: true,width: '300px',position: "middle-left"},  widgets: [
    ui.Label('Click on the map to get NO2 Value .')
  ]});
   mapToChange.add(inspector);
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
   mapToChange.layers().set(0, ui.Map.Layer(images19[selection].visualize(vis)));
  // Set the default map's cursor to a "crosshair".
  mapToChange.style().set('cursor', 'crosshair');
// Register a callback on the map to be invoked when the map is clicked.
  mapToChange.onClick(function(coords) {
  var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                 'lat: ' + coords.lat.toFixed(4);
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
  var NO2 = images19[selection].reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: click_point,
    scale: 1000
  }).get('NO2_column_number_density');
 NO2.evaluate(function(val){
    inspector.clear();
    var demText = 'NO2 : ' + val;
    inspector.widgets().set(0, ui.Label(demText));
    inspector.add(ui.Button('Close', function() {
    inspector.style().set({shown: false});
    }));
    inspector.style().set({shown: true});
  });
  mapToChange.layers().set(1, ui.Map.Layer(click_point, {color: 'black'}));
  });
}
// Configure a selection dropdown to allow the user to choose between images,
// and set the map to update when a user makes a selection.
var select = ui.Select({items: Object.keys(images19), onChange: updateMap});
select.setValue(Object.keys(images19)[defaultValue], true);
var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}}); 
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
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
  }
});
// Creates Title for legend
var legendTitle = ui.Label({
  value: 'NO2 Column Number Density (umol/m2)',
  style: {fontWeight: 'bold', fontSize: '13px'}
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
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
legend.add(colorBar);
// Creates a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px'}),
    ui.Label(
        ((vis.max + vis.min) / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal', fontWeight: 'bold', fontSize: '11px'}),
    ui.Label(vis.max, {margin: '4px 8px', fontWeight: 'bold', fontSize: '11px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
legend.add(legendLabels);
// Add the legend to the linked map.
rightMap.add(legend);