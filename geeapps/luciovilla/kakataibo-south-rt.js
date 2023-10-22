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
// API KEY:AIzaSyDzI9dEJ0qEmOv5GEimnPUc8BoqYM9JxkY 
//1)  Seleccion del Producto 
// -----------------------------------------------------------
// Area of Interest (AOI)
//var RTMDD = ee.FeatureCollection('users/luciovilla/RTMDD');
var RTMDD = ee.FeatureCollection('users/luciovilla/kktaibo_sur_DG');
//
function cloudfunction_S2(image){
  //use add the cloud likelihood band to the image
  var quality = image.select("QA60").unmask();
  //get pixels above the threshold
  var cloud01 = quality.gt(0);
  //create a mask from high likelihood pixels
  var cloudmask = image.mask().and(cloud01.not());
  //mask those pixels from the image
  return image.updateMask(cloudmask).divide(10000);
                  }
//
function S2_Selection(date) {
  var S2 = ee.ImageCollection('COPERNICUS/S2');
  //var S2_test=ee.Image ('COPERNICUS/S2_SR/20190310T105851_20190310T110327_T30TVK');
  //print(S2_test);
  //var S2 = ee.ImageCollection("COPERNICUS/S2_SR");
  var sentinel2 = S2
  // Filter to get images with VV and VH dual polarization
                  .filterDate(date[0],date[1])
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 25))
                  .map(cloudfunction_S2)
                  .filterBounds(RTMDD);
                  //.map(createTimeBand)
                  //.map(createConstantBand);
  //print('sentinel2',sentinel2);
  //var startDate = ee.Date(date[0]);
  // print(startDate);
  var s2median = sentinel2.median();
  //print ('s2median',s2median);
  //return s2median_NDVI;//S2_singleDate;
  return s2median.visualize({bands: ['B4', 'B3', 'B2'],min: 0, max: 0.3, gamma: [0.95, 0.95, 1]});
}
//print('List S1 Images Final',S1_images);
// *************************************************************
var date2016_1 = ['2016-01-01', '2016-08-20'];
//var date2017_2 = ['2017-05-13', '2017-05-14'];
var date2017_2 = ['2017-01-01', '2017-12-31'];
var date2018_3 = ['2018-01-01', '2018-09-10'];
//
var S2_images = {
  'Year 2016': S2_Selection(date2016_1),
  /*'2017-05-13': S1_Selection(date2017_2),
  '2018-02-01': S1_Selection(date2018_1),
  '2018-05-08': S1_Selection(date2018_2),
  '2019-02-08': S1_Selection(date2019_1),*/
  'Year 2017': S2_Selection(date2017_2),
  'Year 2018': S2_Selection(date2018_3)
};
// *************************************************************
function addLayerSelector(mapToChange, defaultValue, position) {
  //var label0 = ui.Label('RT MADRE DE DIOS');
  var label0 = ui.Label({
  value: 'RT Kakataibo South',
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
leftMap.setCenter(-75.598305, -9.499498, 12);