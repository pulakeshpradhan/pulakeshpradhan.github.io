var AOI = ui.import && ui.import("AOI", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -8.95374025488421,
                38.5899314296567
              ],
              [
                -8.95374025488421,
                38.34477812089906
              ],
              [
                -8.589818135743585,
                38.34477812089906
              ],
              [
                -8.589818135743585,
                38.5899314296567
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-8.95374025488421, 38.5899314296567],
          [-8.95374025488421, 38.34477812089906],
          [-8.589818135743585, 38.34477812089906],
          [-8.589818135743585, 38.5899314296567]]], null, false),
    table = ui.import && ui.import("table", "table", {
      "id": "users/armkhudinyan/Sado_aoi"
    }) || ee.FeatureCollection("users/armkhudinyan/Sado_aoi"),
    AOI_mask = ui.import && ui.import("AOI_mask", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -9.511704387073088,
                38.92763826819345
              ],
              [
                -9.511704387073088,
                38.381772785973624
              ],
              [
                -8.676743449573088,
                38.372083542698604
              ],
              [
                -8.664383830432463,
                38.92336478664856
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-9.511704387073088, 38.92763826819345],
          [-9.511704387073088, 38.381772785973624],
          [-8.676743449573088, 38.372083542698604],
          [-8.664383830432463, 38.92336478664856]]], null, false),
    image = ui.import && ui.import("image", "image", {
      "id": "users/armkhudinyan/Modelled_20200310"
    }) || ee.Image("users/armkhudinyan/Modelled_20200310"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/armkhudinyan/Modelled_20200315"
    }) || ee.Image("users/armkhudinyan/Modelled_20200315"),
    image3 = ui.import && ui.import("image3", "image", {
      "id": "users/armkhudinyan/Modelled_20200325"
    }) || ee.Image("users/armkhudinyan/Modelled_20200325");
// Demonstrates before/after imagery comparison with a variety of dates.
var Table = table.geometry()
// load Hydrometric modelling results for fluuded areas
// mask out 0 values and convert to uint8 file format
var Modelled_high_Tide  = ee.Image(image2).select('b1').gt(0).uint8().clip(AOI_mask)
var Modelled_high_Tide = Modelled_high_Tide.updateMask(Modelled_high_Tide)
var Modelled_mid_Tide = ee.Image(image3).select('b1').gt(0).uint8().clip(AOI_mask)
var Modelled_mid_Tide = Modelled_mid_Tide.updateMask(Modelled_mid_Tide)
var Modelled_low_Tide  = ee.Image(image).select('b1').gt(0).uint8().clip(AOI_mask)
var Modelled_low_Tide = Modelled_low_Tide.updateMask(Modelled_low_Tide)
/*
 * Configure the imagery
 */
// Select the bands for water detection
var POL = 'VV'; // // Only include the VV polarization, for consistent compositing.
var BANDS = ['B2', 'B3','B4','B8', 'B11', 'NDVI', 'NDWI', 'DBSI'];
var BANDS_viz = [ 'B4', 'B3', 'B2'];
var vizParams = {'bands': 'B4,B3,B2', 'min': 0, 'max': 3000};
// This function adds vegetation, soil and water index bands to images.
// for NDWI, see www.mdpi.com/2072-4292/8/4/354/pdf
var addIndexBands = function(image) {
  // Calculate Bare Soil Index
  var DBSI = image.expression(
    '((SWIR-GREEN)/(SWIR+GREEN)) - ((NIR-RED)/(NIR+RED))', {
     'RED': image.select('B4'),
     'GREEN': image.select('B3'),
     'SWIR': image.select('B11'),
     'NIR': image.select('B8')
   }).rename('DBSI');
  return image
    // NDVI, NDWI, BSI
    .addBands(image.normalizedDifference(['B8',  'B4']).rename('NDVI')) //Normalized Difference Vegetation Index
    //.addBands(image.normalizedDifference(['B8', 'B12']).multiply(10000).int16().rename('NDWI')) //Normalized Difference Water Index
    .addBands(image.normalizedDifference(['B3', 'B8']).rename('NDWI')) //Normalized Difference Water Index
    .addBands(DBSI) //Modfied Bare Soil Index
    //.addBands((image.normalizedDifference(['B11',  'B3'])).subtract(image.normalizedDifference(['B8',  'B4'])).rename('DBSI'))
};
// Load Sentinel 1 image collection
var SENTINEL_1 = ee.ImageCollection('COPERNICUS/S1_GRD')
                      .filter(ee.Filter.eq('instrumentMode', 'IW'))
                      .filterMetadata('resolution_meters', 'equals' , 10)
                      .filter(ee.Filter.eq('relativeOrbitNumber_stop', 125)) // Descending
                      .filterBounds(AOI)
                      .select(POL)
// Load Sentinel 2 image collections
var SENTINEL_2 = ee.ImageCollection('COPERNICUS/S2_SR')
                  //.filter(ee.Filter.eq('SENSING_ORBIT_NUMBER', 37))
                  .filter(ee.Filter.eq('MGRS_TILE', '29SNC'))
                  .filterBounds(AOI)
                  //.select(BANDS)
                  .map(addIndexBands)
                  .select(BANDS)
// These Sentinel-1 images track the major flooding in Myanmar during the 2018
// monsoon season: https://www.bbc.com/news/world-asia-44962585
var images = {
  //'RGB-Extra-high-Tide': getSentinel_2_RGB('2020-02-19')[1],
  'RGB-high-Tide': getSentinel_2_RGB('2020-03-15')[1],
  'RGB-mid-Tide': getSentinel_2_RGB('2020-03-25')[1],
  'RGB-low-Tide': getSentinel_2_RGB('2020-03-10')[1],
  'Modelled_high_Tide': Modelled_high_Tide.visualize({palette:['92a8d1']}),
  'Modelled_mid_Tide': Modelled_mid_Tide.visualize({palette:['92a8d1']}),
  'Modelled_low_Tide': Modelled_low_Tide.visualize({palette:['92a8d1']}),
  //'NDWI-high-Tide': getSentinel_2_NDWI('2020-02-19')[1],
  'NDWI-high-Tide': getSentinel_2_NDWI('2020-03-15')[1],
  'NDWI-mid-Tide':  getSentinel_2_NDWI('2020-03-25')[1],
  'NDWI-low-Tide':  getSentinel_2_NDWI('2020-03-10')[1],
  //'NDVI-high-Tide': getSentinel_2_NDVI('2020-02-19')[1],
  //'NDVI-mid-Tide':  getSentinel_2_NDVI('2020-03-15')[1],
  //'NDVI-low-Tide':  getSentinel_2_NDVI('2020-03-10')[1],
  //'NDWI_NDVI': NDWI_NDVI('2020-02-19')[1],
  //'DBSI-high-Tide': getSentinel_2_DBSI('2020-02-19')[1],
  //'BSI-mid-Tide': getSentinel_2_BSI('2020-03-15')[1],
  //'DBSI-low-Tide': getSentinel_2_DBSI('2020-03-10')[1],
  'Sent1-high-Tide': getSentinel_1_Composite('2019-11-17')[1],
  'Sent1-low-Tide': getSentinel_1_Composite('2019-11-23')[1],
  //'diff-Sent1': getDifference_S1(),
  //'Modelled_low_Tide': masked.visualize({palette:['87bdd8','4285F4', 'blue']}),
};
var DBSI_high = getSentinel_2_DBSI('2020-02-19')[0];
var DBSI_low = getSentinel_2_DBSI('2020-03-10')[0];
// Composite the Sentinel-1 ImageCollection reduces to mean value.
function getSentinel_1_Composite(date) {
  var date = ee.Date(date);
  var sentinel1 = ee.ImageCollection(SENTINEL_1)
                  .filterDate(date, date.advance(1, 'day'))
                  .mean(); 
  return  [sentinel1, sentinel1.clip(AOI).visualize({min: -20, max: 0})];
}
// Calculate the difference of 2 in order to detect the changed areas
function getDifference_S1(){
  var image1 = getSentinel_1_Composite('2019-11-17')[0];
  var image2 = getSentinel_1_Composite('2019-11-23')[0]
  var changes = image1.subtract(image2);
  return changes.clip(AOI).visualize({ min:-10.0, max: 5.0, palette: [ 'red','white','grey']});
} 
// Composeite of Sentinel 2 images
function getSentinel_2_RGB(date) {
  var date = ee.Date(date);
  var sentinel2 = ee.ImageCollection(SENTINEL_2)
                  .filterDate(date, date.advance(1, 'day'))
                  .mean(); 
  return  [sentinel2, sentinel2.clip(AOI).visualize({'bands': 'B4,B3,B2', 'min': 0, 'max': 3000})];
}
// Sentinel 2 NDWI
function getSentinel_2_NDWI(date) {
  var date = ee.Date(date);
  var sentinel2_NDWI = ee.ImageCollection(SENTINEL_2)
                  .filterDate(date, date.advance(1, 'day'))
                  .select('NDWI')
                  .mean();
  var water = sentinel2_NDWI//.gt(-0.05)
  return  [sentinel2_NDWI, water.clip(AOI).visualize({min:-0.8, max: 0.8, palette:['white','4285F4']})]; // ffff00
}
// Sentinel 2 NDVI
function getSentinel_2_NDVI(date) {
  var date = ee.Date(date);
  var sentinel2_NDVI = ee.ImageCollection(SENTINEL_2)
                  .filterDate(date, date.advance(1, 'day'))
                  .select('NDVI')
                  .mean();
  var vegetation = sentinel2_NDVI//.gt(0.31)
  return  [sentinel2_NDVI, vegetation.clip(AOI).visualize({ min:-0.8, max: 0.8,palette:['white', '59b300']})]; //4285F4
}
// Water masked with NDVI
function NDWI_NDVI(date) {
  var date = ee.Date(date);
  var sentinel2 = ee.ImageCollection(SENTINEL_2)
                  .filterDate(date, date.advance(1, 'day')).mean();
  var NDWI =  sentinel2.select('NDWI')
  var NDVI =  sentinel2.select('NDVI').gt(0.35)
  var water_mask = NDVI.mask(NDWI)
  return  [water_mask, water_mask.clip(AOI).visualize({ palette:['4285F4']})]; //4285F4
}
// Sentinel 2 BSI
function getSentinel_2_DBSI(date) {
  var date = ee.Date(date);
  var sentinel2_BSI = ee.ImageCollection(SENTINEL_2)
                  .filterDate(date, date.advance(1, 'day'))
                  .select('DBSI')
                  .mean();
  var bare_soil = sentinel2_BSI//.gt(0.1)
  return  [bare_soil, bare_soil.clip(AOI).visualize({ min:-1.8, max: 1.8, palette: ['white','gray', 'red']})]; //4285F4
}
/*
 * Set up the maps and control widgets
 */
//=============================
//Set up left and right maps
//=============================
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(true);
//leftMap.style().set('cursor', 'crosshair');
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the application title bar.
leftMap//.add(ui.Label(
    //'Dinâmica das Marés no Estuário do Sado', {fontWeight: 'bold', fontSize: '10px', position:'bottom-left'}))
    .add(ui.Label('Intertidal Dynamics' ,{fontWeight: 'bold', fontSize: '14px' }));
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
//rightMap.style().set('cursor', 'crosshair');
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
rightMap.add(ui.Label('Intertidal Dynamics' ,{fontWeight: 'bold', fontSize: '14px' }));
//=============================
//Define interface options
//=============================
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose an image to visualize');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({
    items: Object.keys(images), 
    onChange: updateMap
  });
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel = ui.Panel({widgets: [label, select], style: {position: position}})
                   //.add(ui.Label('Filter by Value:')); // changed here
  mapToChange.add(controlPanel);
}
//=============================
// Interactive thresholding
//=============================
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
leftMap.setCenter(-8.73, 38.50,  12);
// Make  awidget
//var button = ui.Button({
//  label: 'click me',
//})