// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// $    AUGUST -AUTOMATED GEOPROCESSING ENVIRONMENT CLOUD-BASED  $
// $ =========================================================== $
// $ @tool     : GIS/RS Tool - PROCESSING Sentinel-1 Data        $
// $ @autor    : Lucio Villa                                     $
// $ @e-mail   : luciovilla60@gmail.com                          $
// $ @blog     : luciovilla.blogspot.pe                          $
// $ @revision : Based in AUGUST v3.2 - 21/05/2018               $
// $                                                             $
// $ (c) 2019 Lucio Villa.                                       $
// $ ............................................................$
// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// API KEY:AIzaSyCXDsa5lG2RpLZu0Gx5y766St__OOfZVd4 
//1)  Seleccion del Producto 
// -----------------------------------------------------------
// Area of Interest (AOI)
//var RTMDD = ee.FeatureCollection('users/luciovilla/RTMDD');
var RTMDD = ee.FeatureCollection('users/luciovilla/kktaibo_nor_DG');
/*var MDD = ee.Geometry.Polygon(
        [[[-70.63985750158406, -11.024085377137142],
          [-70.63985750158406, -11.290857352843194],
          [-70.09054109533406, -11.290857352843194],
          [-70.09054109533406, -11.024085377137142]]], null, false);*/
// var Loreto = ee.FeatureCollection('users/luciovilla/Loreto');
//var RNTB = ee.FeatureCollection('users/luciovilla/RNTB');
//var PNBS = ee.FeatureCollection('users/luciovilla/PNBS');
//
//var date_jun18_jun19 = ['2018-06-30', '2019-06-30'];
var date2016_1 = ['2016-01-01', '2016-12-31'];
//var date2017_2 = ['2017-05-13', '2017-05-14'];
var date2017_2 = ['2017-01-01', '2017-12-31'];
var date2018_3 = ['2018-01-01', '2018-12-31'];
//
var S2_images = {
  'Year 2016': S2_Selection1(date2016_1),
  /*'2017-05-13': S1_Selection(date2017_2),
  '2018-02-01': S1_Selection(date2018_1),
  '2018-05-08': S1_Selection(date2018_2),
  '2019-02-08': S1_Selection(date2019_1),*/
  'Year 2017': S2_Selection2(date2017_2),
  'Year 2018': S2_Selection2(date2018_3)
};
//
function S2_Selection1(date) {
  var producto = ee.ImageCollection('COPERNICUS/S2');
  var bandas = ['B2','B3','B4','B8'];
  var S2_RTMDD = producto
    .filterDate(date[0],date[1])
    // Pre-filter to get less cloudy granules.
    .filterBounds(RTMDD)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10));
  //print("S2 Imagenes",S2_RTMDD);
  S2_RTMDD = S2_RTMDD.select(bandas);
  var mosaic_S2_RTMDD = S2_RTMDD.mosaic();
  //print('mosaic_S2_RTMDD:', mosaic_S2_RTMDD);
  // var S1_singleDate = S1subSmoothRatio.mosaic();
  //return mosaic_S2_RTMDD.visualize({bands: ['B4', 'B8', 'B3'],min: 0, max: 0.3, gamma: [0.95, 1.1, 1]});
  //return mosaic_S2_RTMDD.visualize({bands: ['B4', 'B8', 'B3'],min: 0, max: 3000, gamma: [0.95, 1.1, 1]});
  return mosaic_S2_RTMDD.visualize({bands: ['B4', 'B3', 'B2'],min: 0, max: 3000, gamma: [0.8, 0.8, 0.8]});
}
function S2_Selection2(date) {
  var producto = ee.ImageCollection('COPERNICUS/S2');
  var bandas = ['B2','B3','B4','B8'];
  var S2_RTMDD = producto
    .filterDate(date[0],date[1])
    // Pre-filter to get less cloudy granules.
    .filterBounds(RTMDD)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5));
  //print("S2 Imagenes",S2_RTMDD);
  S2_RTMDD = S2_RTMDD.select(bandas);
  var mosaic_S2_RTMDD = S2_RTMDD.mosaic();
  //print('mosaic_S2_RTMDD:', mosaic_S2_RTMDD);
  // var S1_singleDate = S1subSmoothRatio.mosaic();
  //return mosaic_S2_RTMDD.visualize({bands: ['B4', 'B8', 'B3'],min: 0, max: 0.3, gamma: [0.95, 1.1, 1]});
  //return mosaic_S2_RTMDD.visualize({bands: ['B4', 'B8', 'B3'],min: 0, max: 3000, gamma: [0.95, 1.1, 1]});
  return mosaic_S2_RTMDD.visualize({bands: ['B4', 'B3', 'B2'],min: 0, max: 3000, gamma: [0.95, 0.95, 1]});
}
//print('List S1 Images Final',S1_images);
// *************************************************************
function addLayerSelector(mapToChange, defaultValue, position) {
  //var label0 = ui.Label('RT MADRE DE DIOS');
  var label0 = ui.Label({
  value: 'RT Kakataibo North',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
  });
  //var label1 = ui.Label();
  var label1 = ui.Label({
  value: 'Sentinel-2 (ESA)',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
  });
  var label2 = ui.Label({
  value: 'Made by ACCA 2019',
  style: {
    fontWeight: 'light',
    //fontStyle: 'italic',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
  });  
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(S2_images[selection].clip(RTMDD)))
    //mapToChange.layers().set(1, ui.Map.Layer(RTMDD,{color: 'EA3710', opacity: 0.8}, 'RtMDD'));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(S2_images), onChange: updateMap});
  select.setValue(Object.keys(S2_images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label0, label1 ,label2, select], style: {position: position}});
      //ui.Panel({widgets: [label2], style: {position: position2}});
  mapToChange.add(controlPanel);
  //Map.addLayer(RNTB,{'color':'b227b0'} ,'RNTB');
  //Map.addLayer(PNBS,{'color':'b227b0'} ,'PNBS');
}
// *************************************************************
// Make an inset map and add it to the linked map.
/*var inset = ui.Map({style: {position: "bottom-right"}});
linkedMap.add(inset);
// Register a function to the linked map to update the inset map.
linkedMap.onChangeBounds(function() {
  var bounds = ee.Geometry.Rectangle(Map.getBounds());
  inset.centerObject(bounds);
  inset.layers().set(0, bounds);
});*/
// ************************************************************
// Create the left map, and have it display layer 1.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
//Map.addLayer(RTMDD, {color: 'EA3710', opacity: 0.8}, 'RtMDD');
/*var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
Map.add(legend);*/
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
//var leftMap = ui.Map();
// var leftMap1 = ui.Map();
// leftMap1.setControlVisibility(true);
// var leftSelector = Map.addLayer(RTMDD, {color: 'EA3710', opacity: 0.8}, 'RtMDD');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 2, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
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
leftMap.setCenter(-75.628823, -8.534635, 11);