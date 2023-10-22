// Created by Alfonso Sanchez-Paus
// If you improve it please share the code!
// Improvements from the example on ui.SplitPanel
var SENTINEL_1 = "Sentinel-1 SAR Radar";
var SENTINEL_2_NATURAL = "Sentinel-2 Natural ( RGB )";
var SENTINEL_2_FALSE_20 = "Sentinel-2 False 20 m (nir-swir1-red)";
var SENTINEL_2_FALSE_10 = "Sentinel-2 False 10 m (nir-red-green)";
var LANDSAT_8_NATURAL = "Landsat-8 Natural (RGB)";
var LANDSAT_8_FALSE = "Landsat-8 False (nir-swir-red)";
var SENTINEL_5_N2O = "Sentinel-5 N2O";
var BURNED_AREA = "MODIS Burned Area Monthly"
function getSentinel1Composite(range) {
  // Only include the VV polarization, for consistent compositing.
  var polarization = 'VV';
  var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
                      .filterDate(range[0], range[1])
                      .filter(ee.Filter.listContains(
                          'transmitterReceiverPolarisation', polarization))
                      //.filter(ee.Filter.eq('instrumentMode', 'IW'))
                      .select(polarization)
                      .mean();
  return sentinel1.visualize({min: -25, max: 0, palette: ['aqua', 'black']});
}
function getSentinel2Composite(range, imageType) {
  var sentinel2 = ee.ImageCollection('COPERNICUS/S2')
                      .filterDate(range[0], range[1])
                      .median()
                      .divide(10000);
  var viz = {min: 0.0,  max: 0.3,  bands: ['B4', 'B3', 'B2']};
  if( imageType === SENTINEL_2_FALSE_20 ){
    viz = {bands:['B8','B11','B4'], min: 0, max:0.3};
  }else  if( imageType ===  SENTINEL_2_FALSE_10 ){
    viz = {bands:['B8','B4' , 'B3' ],min:0, max:0.35};
  }
  return sentinel2.visualize( viz );
}
function getModisBurnedArea(range) {
  var date = ee.Date(range[0]);
  print( date )
  var month = date.get('month');
  var year = date.get('year');
  print( month )
  var burned = ee.ImageCollection('MODIS/006/MCD64A1')
                      .filter(
        ee.Filter.and( ee.Filter.calendarRange( year, year, "year" ) , ee.Filter.calendarRange( month, month, "month" ) ) 
      ).max().gt(0)
                      ;
  var viz = {min: 0 ,  max: 1 , palette : ['white', 'red'],  bands: ['BurnDate'] };
 // burned = burned.mask( burned.eq( 0 ) );
  return burned.visualize( viz );
}
function getSentinel5Composite(range, imageType) {
  var sentinel5 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                      .select('NO2_column_number_density')
                      .filterDate(range[0], range[1])
                      .max();
  var val_max = 0.0002;
  var val_min = 0;
  var viz = {
    min: val_min,
    max: val_max,
    opacity: 1.0,
    palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]
  };
  return sentinel5.visualize( viz );
}
function getLandsat8(range, falseColor) {
  var viz = {    min: 0.0,    max: 30000.0,    bands : ['B4', 'B3', 'B2']  };
  if( falseColor ){
    viz = {bands:['B5','B6','B4'],min:0, max:30000};
  }
  var landsat8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT')
                      .filterDate( range[0], range[1] )
                      .mean();
  return landsat8.visualize(  viz );
}
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 'bottom-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 'bottom-right');
function getSingleImage(source, range ){
  if( source == SENTINEL_1){
    return getSentinel1Composite(range);
  }else if( source == SENTINEL_2_NATURAL){
    return getSentinel2Composite(range, 0);
  }else if( source == SENTINEL_2_FALSE_20 || source == SENTINEL_2_FALSE_10 ){
    return getSentinel2Composite(range, source);
  }else if( source == LANDSAT_8_NATURAL){
    return getLandsat8(range, false);
  }else if( source == LANDSAT_8_FALSE){
    return getLandsat8(range, true);
  }else if( source == SENTINEL_5_N2O ){
    return getSentinel5Composite(range);
  }else if( source == BURNED_AREA ){
    return getModisBurnedArea(range);
  }
}
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, position) {
  var label = ui.Label('Choose the satellite and period to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    var source = selectSource.getValue();
    var date = dateSlider.getValue();
    mapToChange.layers().set(0, ui.Map.Layer(getSingleImage(source, date )));
  }
  var selectSource = ui.Select({
        placeholder : "Select Satellite Imagery",
        items:[SENTINEL_1,SENTINEL_2_NATURAL, SENTINEL_2_FALSE_20, SENTINEL_2_FALSE_10,LANDSAT_8_NATURAL,LANDSAT_8_FALSE,SENTINEL_5_N2O, BURNED_AREA],
        onChange : updateMap
  });
  var now = Date.now();
  var end = ee.Date(now);
  var dateSlider = ui.DateSlider({
    start : "2000-01-01",
    end : Date.now(),
    value : Date.now(),
    period: 5,
    onChange : updateMap });
  var controlPanel =
      ui.Panel({widgets: [label, selectSource, dateSlider], style: {position: position, width : "330px"}});
  mapToChange.add(controlPanel);
}
/*
 * Tie everything together
 */
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(75,30,  6);
rightMap.setOptions('HYBRID');
leftMap.setOptions('HYBRID');
rightMap.setControlVisibility({  "mapTypeControl":true, "layerList":true });
leftMap.setControlVisibility({ "zoomControl":true  });