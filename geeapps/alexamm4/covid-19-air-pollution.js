// ---------------------------------------------------------------------------------------
//                                      PARAMETERS
// ---------------------------------------------------------------------------------------
// DICTIONARIES
var locationDict = {  
  'Los Angeles'     : {lon: -118.257134, lat: 34.050135, zoom: 9, dateLock: '2020-03-19'},
  'Bay Area'        : {lon: -122.241415, lat: 37.490724, zoom: 9, dateLock: '2020-03-19'},
  'San Diego'       : {lon: -116.985792, lat: 32.497716, zoom: 10,dateLock: '2020-03-19'},
  'Chicago'         : {lon: -87.6933310, lat: 41.820484, zoom: 7, dateLock: '2020-03-21'},
  'Phoenix'         : {lon: -112.096241, lat: 33.476900, zoom: 9, dateLock: '2020-03-31'},
  'Salt Lake City'  : {lon: -111.936966, lat: 40.712339, zoom: 9, dateLock: '2020-03-30'},
  'New York City'   : {lon: -73.9913610, lat: 40.735395, zoom: 9, dateLock: '2020-03-22'},
  'India'           : {lon: 78.60994000, lat: 21.569226, zoom: 5, dateLock: '2020-03-25'},
};
var variableDict   = {
  'NO2'             :{name: 'NO2', min: 0.00008, max: 0.0002, coll: 'COPERNICUS/S5P/NRTI/L3_NO2', band: 'NO2_column_number_density', legende: 'NO2 concentration [mol/m^2]', scale: 1},
  'AOD'             :{name: 'AOD', min: 0.1, max: 1.0, coll: 'MODIS/006/MCD19A2_GRANULES', band: 'Optical_Depth_047', legende: ' Aerosol Optical Depth', scale: 0.001},  
  'SO2'             :{name: 'SO2', min: 0.00008, max: 0.0005, coll: 'COPERNICUS/S5P/NRTI/L3_SO2', band: 'SO2_column_number_density', legende: 'SO2 concentration [mol/m^2]', scale: 1},  
  'CO'              :{name: 'CO',  min: 0.00010, max: 0.0500, coll: 'COPERNICUS/S5P/NRTI/L3_CO' , band: 'CO_column_number_density' , legende: 'CO concentration [mol/m^2]', scale: 1},  
//  'Night LST'       :{name: 'Night LST', min: 260.0, max: 300.0, coll: 'MODIS/006/MOD11A1', band: 'LST_Night_1km', legende: 'Night LST [K]', scale: 0.02},
//  'Day LST'         :{name: 'Day LST', min: 260.0, max: 310.0, coll: 'MODIS/006/MOD11A1', band: 'LST_Day_1km', legende: 'Day LST [K]', scale: 0.02},
//  'T mean'          :{name: 'T mean', min: 5, max: 28.0, coll: 'OREGONSTATE/PRISM/AN81d', band: 'tmean', legende: 'tmean [C]', scale: 1},
  'UV Aerosol Index':{name: 'UV Aerosol Index', min: -2, max: 0.5, coll: 'COPERNICUS/S5P/NRTI/L3_AER_AI', band: 'absorbing_aerosol_index', legende: 'UV Aerosol Index', scale: 1},
//  'HCHO'            :{name: 'HCHO', min: 0, max: 0.0003, coll: 'COPERNICUS/S5P/NRTI/L3_HCHO', band: 'tropospheric_HCHO_column_number_density', legende: 'HCHOx', scale: 1},
};
// OTHERS
var opac          = 0.55;
var vizPalette    = ['black','blue', 'green', 'yellow', 'red'];
var labelB        = ui.Label('One week before the lockdown');
var labelA        = ui.Label('One week after the lockdown');
var controlPanelB = ui.Panel({widgets: [labelB], style: {position: 'top-left'}});
var controlPanelA = ui.Panel({widgets: [labelA], style: {position: 'top-right'}});
var colorBar      = ui.Thumbnail({// Create the color bar for the legend.
                      image: ee.Image.pixelLonLat().select(0),
                      params: makeColorBarParams(vizPalette),
                      style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
 var legendPanel = ui.Panel([colorBar]);  
// SET DEFAULTS
var defaultLocation = locationDict['Los Angeles'];
var defaultVariable = variableDict['NO2'];
// ---------------------------------------------------------------------------------------
//                                      MAKING THE LAYOUT
// ---------------------------------------------------------------------------------------
ui.root.clear();  // Create a map panel.
var panel = ui.Panel({style: {width: '350px'}});
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
// LEFT MAP
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
//                                 USER INTERFACE ON THE LEFT
// ---------------------------------------------------------------------------------------
// BASIC INFORMATION
var header      = panel.add(ui.Label('Air pollution change during Covid-19 lockdown', {fontSize: '18px', color: 'Black'}))
                       .add(ui.Label('Made by Alexandre Martinez\nPh.D. Candidate, University of California, Irvine.', {fontSize: '16px', color: 'Black', whiteSpace: 'pre'}).setUrl('https://www.linkedin.com/in/alexandre1martinez/'))
                       .add(ui.Label('For comments or suggestions to add variables, contact me by email').setUrl('mailto:alexamm4@uci.edu'));
var text        = panel.add(ui.Label(['Visualization of the change in air pollution between one week before and one week after the lockdown',
                                      '\nNote: This is just a visualization of the changes before/after lockdown as a results of the lockdown AND meteorology'], {fontSize: '12px'}))
var text        = panel.add(ui.Label(['NO2: Nitrogen Dioxide (fossil fuel combustion) from Sentinel-5P',
                                      '\nAOD: Aerosol Optical Depth (% of light abosrved): Haze indicator',
                                      '\nSO2: Sulphur Dioxide (fossil fuel combustion) from Sentinel-5P',
                                      '\nCO: Carbon Monoxide (fossil fuel combustion) from Sentinel-5P',
                                    //  '\nLST: Land Surface Temperature',
                                      ], {fontSize: '11px', whiteSpace: 'pre'}));
//SMOOTHING
var boxcar = ee.Kernel.square({
  radius: 1000, units: 'meters', magnitude: 1  // Buffer of 5km
});
// SELECTION OF THE DATASET
var parameters   = Object.keys(variableDict);
var parSelect = ui.Select({
  items: parameters,
  value: parameters[0],
  onChange: redrawVAR,
});
var varPanel = ui.Panel([ui.Label('Choose a variable', {'font-size': '18px'}), parSelect]);
panel.add(varPanel);
// SELECTION OF THE LOCATION
var locations   = Object.keys(locationDict);
var locSelect   = ui.Select({
  items:    locations,
  value:    locations[0],
  onChange: redrawLOC,
  });
var locPanel = ui.Panel([ui.Label('Choose a location', {'font-size': '18px'}), locSelect]);
panel.add(locPanel);
var text        = panel.add(ui.Label('Click on the left map to see the time evolution', {'font-size': '18px'}));
// ---------------------------------------------------------------------------------------
//                                      MAPPING FUNCTIONS
// ---------------------------------------------------------------------------------------
// Creates a color bar thumbnail image for use in legend from the given color palette.
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
function drawMap(loca, varDraw) {
  var date1     = ee.Date(loca.dateLock);
  var datasetB  = ee.ImageCollection(varDraw.coll)
                    .filterDate(date1.advance(-15,'day'), date1.advance(-1, 'day'))
                    .select(varDraw.band)
                    .mean();
  datasetB      = datasetB.multiply(varDraw.scale);
  var datasetA  = ee.ImageCollection(varDraw.coll)
                    .filterDate(date1.advance(1,'day'), date1.advance(15, 'day'))
                    .select(varDraw.band)
                    .mean();
  datasetA      = datasetA.multiply(varDraw.scale);
  var imageB    = datasetB.visualize({min: varDraw.min, max: varDraw.max, opacity: opac,  palette: vizPalette});
  var imageA    = datasetA.visualize({min: varDraw.min, max: varDraw.max, opacity: opac,  palette: vizPalette});
  var imageMB   = imageB.updateMask(imageB.gte(0.000007));
  var imageMA   = imageA.updateMask(imageA.gte(0.000007));
  leftMap.clear()
  rightMap.clear()
  leftMap.addLayer(imageB, {}, varDraw.name);
  rightMap.addLayer(imageA, {}, varDraw.name);
    // SET UP LEGEND: Create a panel with three numbers for the legend.
  var legendTitle = ui.Label({value: varDraw.legende ,style: {fontWeight: 'bold'}});
  var legendLabels = ui.Panel({
                        widgets: [ui.Label(varDraw.min, {margin: '4px 8px'}),
                                  ui.Label((varDraw.max / 2), {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
                                  ui.Label(varDraw.max, {margin: '4px 8px'})],
                        layout: ui.Panel.Layout.flow('horizontal')
  });
  legendPanel.clear()
  legendPanel.insert(0,legendTitle);
  legendPanel.insert(1,colorBar);
  legendPanel.insert(2,legendLabels);
  legendPanel.style().set({position: 'bottom-left'});
  leftMap.add(legendPanel); 
  // do the time serie as well
  var varTimeSerie = ee.ImageCollection(varDraw.coll)  //Land Surface Temp
                      .filterDate('2020-01-01', ee.Date(Date.now()))
                      .select(varDraw.band);
  // ---------------------------------------------------------------------------------------
  //                           NOW WE DO THE INSPECTOR TIME SERIE
  // ---------------------------------------------------------------------------------------
  // FUNCTION ON CLICK
  leftMap.onClick(function(coords) {
    var point     = ee.Geometry.Point(coords.lon, coords.lat);
    var varChart  = ui.Chart.image.series(varTimeSerie, point.buffer(500), ee.Reducer.mean(), 30); // use smooth instead of .buffer(2000)
    varChart.setChartType('LineChart');
    varChart.setOptions({
      title:      'Time Serie',
      vAxis:      {title: 'Variable'},
      hAxis:      {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
      lineWidth:  2,
      interpolateNulls: true,
    });
    panel.widgets().set(8, varChart);
});
}
function redrawLOC() {
  var loc         = locSelect.getValue(); 
  var location    = locationDict[loc];  
  var par         = parSelect.getValue();   
  var parameter   = variableDict[par]; 
  drawMap(location, parameter)
  //NOW we need to redraw also the image due to change of dates.
  leftMap.setCenter(location.lon, location.lat, location.zoom);
  rightMap.setCenter(location.lon, location.lat, location.zoom);
}
function redrawVAR() {
  var par         = parSelect.getValue(); 
  var parameter   = variableDict[par];
  var loc         = locSelect.getValue(); 
  var location    = locationDict[loc]; 
  drawMap(location, parameter);
}
// Start by drawing
drawMap(defaultLocation, defaultVariable);