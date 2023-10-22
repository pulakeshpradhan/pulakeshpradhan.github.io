// PARAMETERS
var labelB = ui.Label('Before the lockdown');
var labelA = ui.Label('After the lockdown');
var controlPanelB = ui.Panel({widgets: [labelB], style: {position: 'top-left'}});
var controlPanelA = ui.Panel({widgets: [labelA], style: {position: 'top-right'}});
var visParams = {
  min: 0,
  max: 10000,
  gamma: 1.5,
};
var locationDict = {  
  'Victorville (Delta/Southwest)' : {lon: -117.379738, lat: 34.600361, zoom: 14},
  'Pinal County (Delta)'          : {lon: -111.333743, lat: 32.507768, zoom: 14},
  'Roswell Air Center (Divers)'   : {lon: -104.526365, lat: 33.302219, zoom: 14},
  'Pittsburgh (American)'         : {lon: -80.2413270, lat: 40.492905, zoom: 14},
  'Tulsa (American)'              : {lon:  -95.882510, lat: 36.197040, zoom: 14},
  'Munich (Lufthansa)'            : {lon:  11.7800630, lat: 48.353120, zoom: 14},
  'Dubendorf (Swiss)'             : {lon: 8.641279, lat: 47.401644, zoom: 14},
};
var locationDates = {
  'Victorville (Delta/Southwest)' : {b1: '2020-02-15', b2: '2020-02-24', a1: '2020-04-15', a2: '2020-04-24'},
  'Pinal County (Delta)'          : {b1: '2020-01-08', b2: '2020-01-18', a1: '2020-04-08', a2: '2020-04-10'},
  'Roswell Air Center (Divers)'   : {b1: '2019-10-11', b2: '2019-10-18', a1: '2020-04-18', a2: '2020-04-20'},
  'Pittsburgh (American)'         : {b1: '2019-07-01', b2: '2019-07-10', a1: '2020-04-06', a2: '2020-04-09'},
  'Tulsa (American)'              : {b1: '2019-10-11', b2: '2019-10-15', a1: '2020-04-10', a2: '2020-04-15'},
  'Munich (Lufthansa)'            : {b1: '2019-07-05', b2: '2019-07-10', a1: '2020-04-19', a2: '2020-04-23'},
  'Dubendorf (Swiss)'             : {b1: '2019-08-05', b2: '2019-08-10', a1: '2020-04-01', a2: '2020-04-05'},
}
var collection  = ee.ImageCollection('COPERNICUS/S2_SR').select(['B4', 'B3', 'B2']);
// Create a map panel.
ui.root.clear();
var panel = ui.Panel({style: {width: '25%'}});
// Center the map
var defaultLocation = locationDict['Victorville (Delta/Southwest)'];
// Add these to the interface.
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
var leftMap = ui.Map();
leftMap.setControlVisibility({all: false, zoomControl: true, mapTypeControl: true});
leftMap.setCenter(defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
leftMap.add(controlPanelB)
leftMap.style().set('cursor', 'crosshair');
// Center the map
var rightMap = ui.Map();
rightMap.setControlVisibility({all: false, zoomControl: true, mapTypeControl: true});
rightMap.setCenter(defaultLocation.lon, defaultLocation.lat, defaultLocation.zoom);
rightMap.add(controlPanelA)
rightMap.style().set('cursor', 'crosshair');
// Center the map
 var splitPanel = ui.SplitPanel({
    firstPanel: leftMap,
    secondPanel: rightMap,
    wipe: true,
    style: {stretch: 'both'}
  });
  ui.root.insert(0,panel);        // Inset the left instruction panel
  ui.root.insert(1,splitPanel);   // Inset the maps
var linker = ui.Map.Linker([leftMap, rightMap]);    // link the two maps
// ---------------------------------------------------------------------------------------
//                                 USER INTERFACE ON THE RIGHT
// ---------------------------------------------------------------------------------------
// BASIC INFORMATION
var header      = panel.add(ui.Label('COVID-19: Where are the airplanes stored?', {fontSize: '18px', color: 'Black'}))
                       .add(ui.Label('Made by Alexandre Martinez\nPh.D. Candidate, University of California, Irvine.', {fontSize: '16px', color: 'Black', whiteSpace: 'pre'}).setUrl('https://www.linkedin.com/in/alexandre1martinez/'))
                       .add(ui.Label('Using Sentinel-2 satellite images to visualize where planes are stored during COVID-19 lockdowns.', {fontSize: '12px'}));
var text        = panel.add(ui.Label('Planes are typically stored in airparks in arid environment.\nRecently some runaways have been converted to parking.', {fontSize: '12px', whiteSpace: 'pre'}));
// SELECTION OF THE LOCATION
var locations   = Object.keys(locationDict);
var locSelect   = ui.Select({
  items:    locations,
  value:    locations[0],
  onChange: redrawLOC,
  });
var locPanel    = ui.Panel([ui.Label('Choose a location', {'font-size': '18px'}), locSelect]);
panel.add(locPanel);
var text        = panel.add(ui.Label('For comments or suggestions, contact me by email').setUrl('mailto:alexamm4@uci.edu'));
function redrawLOC() {
  leftMap.layers().reset();
  leftMap.clear();
  rightMap.layers().reset();
  rightMap.clear();
  var loc       = locSelect.getValue(); 
  var location  = locationDict[loc];
  var locDate   = locationDates[loc]; 
  var image1    = collection.filterDate(locDate.b1, locDate.b2).mean();
  var image2    = collection.filterDate(locDate.a1, locDate.a2).mean();
  //NOW we need to redraw also the image due to change of dates.
  leftMap.addLayer(image1, visParams);
  leftMap.setCenter(location.lon, location.lat, location.zoom);
  rightMap.addLayer(image2, visParams);
  rightMap.setCenter(location.lon, location.lat, location.zoom);  
  }
redrawLOC();