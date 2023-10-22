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
var BURNED_AREA = "MODIS Burned Area Monthly";
var selectionSource = [];
var selectionDate = [];
var selectionMap = [];
var DEFAULT_AREA = "Mozambique - Beira floodings Cyclone Idai"; // The name must match that of one of the presselectedExamples
var preselectedExamples = [
  {
    name : "Mozambique - Beira floodings Cyclone Idai",
      location : [34.66,-19.75],
      zoomLevel : 10, 
      before : {
        source : SENTINEL_1,
        date :  "2019-03-01"
      },
      after : {
        source : SENTINEL_1,
        date : "2019-03-16"
      }
    },
  {
    name : "India - Punjab crop burning",
    location : [76.32,29.93],
    zoomLevel : 13,
    before : {
      source : SENTINEL_2_FALSE_10,
      date :  new Date ("2018-10-03")
    },
    after : {
      source : SENTINEL_2_FALSE_10,
      date : new Date ("2018-10-18") 
    }
  },
  {
    name : "Nicaragua - Incendio Indio Maiz",
    location : [ -83.8225058, 10.9968084, ],
    zoomLevel : 12,
    before : {
      source : BURNED_AREA,
      date :  new Date ("2018-04-17")
    },
    after : {
      source : SENTINEL_2_FALSE_10,
      date : new Date ("2018-04-25") 
    }
  },
  {
    name : "Australia - Bunyip State Park fire",
    location : [ 145.67, -37.99 ],
    zoomLevel : 14,
    before : {
      source : SENTINEL_2_FALSE_20,
      date :  new Date ("2019-03-02")
    },
    after : {
      source : SENTINEL_2_FALSE_10,
      date : new Date ("2019-03-22") 
    }
  },
  {
    name : "USA - Mendocino Complex Fire",
    location : [ -122.777, 39.2 ],
    zoomLevel : 11,
    before : {
      source : SENTINEL_2_FALSE_20,
      date :  new Date ("2018-07-29")
    },
    after : {
      source : SENTINEL_2_FALSE_10,
      date : new Date ("2018-08-29") 
    }
  },
  {
    name : "Indonesia - Anak Krakatau Tsunami",
    location : [105.4216,  -6.099938  ],
    zoomLevel : 15,
    before : {
      source : SENTINEL_1,
      date :  new Date ("2018-11-02")
    },
    after : {
      source : SENTINEL_2_NATURAL,
      date : new Date ("2019-03-22") 
    }
  },
  {
    name : "Chile - Carahue incendio forestal/pastizales",
    location : [-72.9857,  -38.6621  ],
    zoomLevel : 11,
    before : {
      source : LANDSAT_8_FALSE,
      date :  new Date ("2019-01-20")
    },
    after : {
      source : SENTINEL_2_FALSE_10,
      date : new Date ("2019-02-25") 
    }
  },
  {
    name : "Brazil - Landslide Minas Gerais",
    location : [-44.12315,  -20.1238  ],
    zoomLevel : 16,
    before : {
      source : SENTINEL_2_FALSE_10,
      date :  new Date ("2019-01-16")
    },
    after : {
      source : SENTINEL_2_FALSE_10,
      date : new Date ("2019-02-25") 
    }
  }
];
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
  var month = date.get('month');
  var year = date.get('year');
  var burned = ee.ImageCollection('MODIS/006/MCD64A1')
                      .filter(
        ee.Filter.and( ee.Filter.calendarRange( year, year, "year" ) , ee.Filter.calendarRange( month, month, "month" ) ) 
      ).max().gt(0)
                      ;
  var viz = {min: 0 ,  max: 1 , palette : ['white', 'red'],  bands: ['BurnDate'] };
  return burned.visualize( viz );
}
function getSentinel5Composite(range, imageType) {
  var sentinel5 = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
                      .select('NO2_column_number_density')
                      .filterDate(range[0], range[1])
                      .max();
  var viz = {    min: 0, max: 0.0002,  opacity: 1.0,  palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]  };
  return sentinel5.visualize( viz );
}
function getLandsat8(range, falseColor) {
  var viz = {  min: 0.0,max: 30000.0, bands : ['B4', 'B3', 'B2']  };
  if( falseColor ){
    viz = {bands:['B5','B6','B4'],min:0, max:30000};
  }
  var landsat8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT')
                      .filterDate( range[0], range[1] )
                      .mean();
  return landsat8.visualize(  viz );
}
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
/*
 * Set up the maps and control widgets
 */
function getLastWeek() {
  var today = new Date();
  var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  return lastWeek;
}
// This function changes the given map to show the selected image.
function updateMap( selectSource, dateSlider, map) {
  var source = selectSource.getValue();
  var date = dateSlider.getValue();
  map.layers().set(0, ui.Map.Layer(getSingleImage(source, date )));
}
function getObjectSelected( selectedArea ){
  for (var i = 0; i < preselectedExamples.length; i++){
    var obj = preselectedExamples[i];
    if ( obj.name === selectedArea )
      return obj;
  }
  return null;
}
function updateSelection( selectedArea ) {
  var predefinedObject = getObjectSelected( selectedArea );
  selectionSource[0].setValue( predefinedObject.before.source );
  selectionSource[1].setValue( predefinedObject.after.source );
  selectionDate[0].setValue( predefinedObject.before.date );
  selectionDate[1].setValue( predefinedObject.after.date );
  selectionMap[0].setCenter(predefinedObject.location[0], predefinedObject.location[1],  predefinedObject.zoomLevel);
  selectionMap[1].setCenter(predefinedObject.location[0], predefinedObject.location[1],  predefinedObject.zoomLevel);
  updateMap(selectionSource[0], selectionDate[0], selectionMap[0]);
  updateMap(selectionSource[1], selectionDate[1], selectionMap[1]);
}
function addSelectPredefinedAreas(mapToChange, position){
  function getPredefinedAreas(){
    var arr =[];
    for (var i = 0; i < preselectedExamples.length; i++){
      var obj = preselectedExamples[i];
      arr.push( obj.name  );
    }
    return( arr );
  }
  var selectSource = ui.Select({
        placeholder : "Choose predefined area/date",
        items: getPredefinedAreas(),
        onChange : updateSelection,
        style: {position: position, width : "220px"}
  });
  mapToChange.add(selectSource);
}
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, position) {
  var label = ui.Label('Choose the satellite and period to visualize');
  // This function changes the given map to show the selected image.
  function updateMapLocal(selection) {
    updateMap(selectSource, dateSlider, mapToChange);
  }
  var selectSource = ui.Select({
        placeholder : "Select Satellite Imagery and Date",
        items:[SENTINEL_1,SENTINEL_2_NATURAL, SENTINEL_2_FALSE_20, SENTINEL_2_FALSE_10,LANDSAT_8_NATURAL,LANDSAT_8_FALSE, BURNED_AREA,SENTINEL_5_N2O],
        onChange : updateMapLocal
  });
  selectionSource.push( selectSource );
  var dateSlider = ui.DateSlider({
    start : "2014-01-01",
    end : Date.now(),
    value : getLastWeek(), // Last weeks to make sure there is imager
    period: 5,
    onChange : updateMapLocal });
  selectionDate.push( dateSlider );
  var controlPanel =
      ui.Panel({widgets: [selectSource, dateSlider], style: {position: position, width : "280px"}});
  mapToChange.add(controlPanel);
  selectionMap.push( mapToChange );
}
/*
 * Tie everything together
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 'bottom-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 'bottom-right');
addSelectPredefinedAreas( rightMap, 'top-right');
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
// When everything is loaded focus on the default area
updateSelection( DEFAULT_AREA );