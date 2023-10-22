var Vaalharts = ui.import && ui.import("Vaalharts", "table", {
      "id": "users/alannarebelo/VaalhartIrrigSys"
    }) || ee.FeatureCollection("users/alannarebelo/VaalhartIrrigSys"),
    roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            24.76376981318911,
            -27.754202516289546
          ]
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
    ee.Geometry.Point([24.76376981318911, -27.754202516289546]);
Map.centerObject(Vaalharts)
// Good dates
//    .filterDate("2020-09-15", "2020-09-17")
//    .filterDate("2021-09-15", "2021-09-17")
//    .filterDate("2022-01-10", "2022-01-17")
//Map.addLayer(Vaalharts, {color: 'FF0000'}, 'Vaalharts');
//chosen July to avoid high cloud cover (dry season). Limitations: winter = crops lost their leaves? 
//Positives: high discrimination due to it being dry season. 
/////////////////////////      2019       /////////////////////////
// // Image collection defined & select least cloudy scene
var image19 = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate("2019-07-10", "2019-07-17")
    .filterBounds(roi)
    .sort("CLOUD_COVERAGE_ASSESSMENT")
    // .first())
   // print(image19, "sentscene2019");
// Spatially mosaic the images in the collection and display the 5 scenes
var mosaic = image19.mosaic();
//Map.addLayer(image, {opacity: 0.2}, 'spatial mosaic');
// // Clipping to Vaalharts
var imageclipped = mosaic.clip(Vaalharts)
//print("imageclipped", imageclipped);
Map.addLayer(imageclipped, {bands: ['B4', 'B3', 'B2'], max: 3000}, 'Vaalharts2019');
var imageclipped19 = imageclipped
//var image = image10000.divide(10000)
// NDVI 
    var NDVI_2019 = imageclipped.expression(
        "(NIR - RED) / (NIR + RED)",
        {
          RED: imageclipped.select("B4"),    //  RED
          NIR: imageclipped.select("B8"),    // NIR
        });
var NDVI_ramp =
  '<RasterSymbolizer>' +
    '<ColorMap type="ramp" extended="false" >' +
      '<ColorMapEntry color="#0000ff" quantity="-1" label="-1"/>' + // black
      '<ColorMapEntry color="#0000ff" quantity="0" label="0"/>' + // blue
      '<ColorMapEntry color="#FF0000" quantity="0.1" label="0.1"/>' + // red
      '<ColorMapEntry color="#FFA500" quantity="0.2" label="0.2" />' + //orange
      '<ColorMapEntry color="#e6c005" quantity="0.4" label="0.4" />' +  //yellow
      '<ColorMapEntry color="#30b855" quantity="0.6" label="0.6" />' +  //green
      '<ColorMapEntry color="#006400" quantity="0.8" label="0.8" />' +  //dark green
      '<ColorMapEntry color="#013220" quantity="1" label="1" />' +  //dark green
    '</ColorMap>' +
  '</RasterSymbolizer>';
Map.addLayer(NDVI_2019.sldStyle(NDVI_ramp), {}, "NDVI_2019");
/////////////////////////      2020       /////////////////////////
// // Image collection defined & select least cloudy scene
var image = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate("2020-07-01", "2020-07-03")
    .filterBounds(roi)
    .sort("CLOUD_COVERAGE_ASSESSMENT")
    // .first())
    //print(image, "sentscene2020");
// Spatially mosaic the images in the collection and display the 5 scenes
var mosaic = image.mosaic();
//Map.addLayer(image, {opacity: 0.2}, 'spatial mosaic');
// // Clipping to Vaalharts
var imageclipped = mosaic.clip(Vaalharts)
//print("imageclipped", imageclipped);
Map.addLayer(imageclipped, {bands: ['B4', 'B3', 'B2'], max: 3000}, 'Vaalharts2020');
var imageclipped20 = imageclipped
//var image = image10000.divide(10000)
// NDVI 
    var NDVI_2020 = imageclipped.expression(
        "(NIR - RED) / (NIR + RED)",
        {
          RED: imageclipped.select("B4"),    //  RED
          NIR: imageclipped.select("B8"),    // NIR
        });
Map.addLayer(NDVI_2020.sldStyle(NDVI_ramp), {}, "NDVI_2020");
/////////////////////////      2021       /////////////////////////
// // Image collection defined & select least cloudy scene
var image = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate("2021-07-01", "2021-07-03")
    .filterBounds(roi)
    .sort("CLOUD_COVERAGE_ASSESSMENT")
    // .first())
    //print(image, "sentscene2021");
// Spatially mosaic the images in the collection and display the 5 scenes
var mosaic = image.mosaic();
//Map.addLayer(image, {opacity: 0.2}, 'spatial mosaic');
// // Clipping to Vaalharts
var imageclipped = mosaic.clip(Vaalharts)
//print("imageclipped", imageclipped);
Map.addLayer(imageclipped, {bands: ['B4', 'B3', 'B2'], max: 3000}, 'Vaalharts2021');
var imageclipped21 = imageclipped
//var image = image10000.divide(10000)
// NDVI 
    var NDVI_2021 = imageclipped.expression(
        "(NIR - RED) / (NIR + RED)",
        {
          RED: imageclipped.select("B4"),    //  RED
          NIR: imageclipped.select("B8"),    // NIR
        });
Map.addLayer(NDVI_2021.sldStyle(NDVI_ramp), {}, "NDVI_2021");
/////////////////////////      2022       /////////////////////////
// // Image collection defined & select least cloudy scene
var image = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate("2022-01-10", "2022-01-17")
    .filterBounds(roi)
    .sort("CLOUD_COVERAGE_ASSESSMENT")
    // .first())
    //print(image, "sentscene2020");
// Spatially mosaic the images in the collection and display the 5 scenes
var mosaic = image.mosaic();
//Map.addLayer(image, {opacity: 0.2}, 'spatial mosaic');
// // Clipping to Vaalharts
var imageclipped = mosaic.clip(Vaalharts)
//print("imageclipped", imageclipped);
Map.addLayer(imageclipped, {bands: ['B4', 'B3', 'B2'], max: 3000}, 'Vaalharts2022');
var imageclipped22 = imageclipped
//var image = image10000.divide(10000)
// NDVI 
    var NDVI_2022 = imageclipped.expression(
        "(NIR - RED) / (NIR + RED)",
        {
          RED: imageclipped.select("B4"),    //  RED
          NIR: imageclipped.select("B8"),    // NIR
        });
Map.addLayer(NDVI_2022.sldStyle(NDVI_ramp), {}, "NDVI_2022");
//Colorized or visualize the NDVI images 
var Palette = [
'#FFFFFF', 
'#CE7E45', 
'#DF923D', 
'#F1B555', 
'#FCD163', 
'#99B718', 
'#74A901', 
'#66A000', 
'#529400', 
'#3E8601', 
'#207401', 
'#056201', 
'#004C00', 
'#023B01', 
'#012E01', 
'#011D01', 
'#011301', 
];
//-------------------------------------------------------------------------------------//
//Configure the imagery
var images = {
  'NDVI_2019': NDVI_2019.visualize({min: 0, max: 1, palette: Palette}),
  'NDVI_2020': NDVI_2020.visualize({min: 0, max: 1, palette: Palette}),
  'NDVI_2021': NDVI_2021.visualize({min: 0, max: 1, palette: Palette}),
  'NDVI_2022': NDVI_2022.visualize({min: 0, max: 1, palette: Palette}),
  'Sentinel 10-17 July 2019': imageclipped19.visualize({bands: ['B4', 'B3', 'B2'], max: 3000}),
  'Sentinel 1-3 July 2020': imageclipped20.visualize({bands: ['B4', 'B3', 'B2'], max: 3000}),
  'Sentinel 1-3 July 2021': imageclipped21.visualize({bands: ['B4', 'B3', 'B2'], max: 3000}),
  'Sentinel 10-17 January 2022': imageclipped22.visualize({bands: ['B4', 'B3', 'B2'], max: 3000}),
};
// ---------------------------------------------------------------------------------- //
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
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
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
//Tie everything together
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// // Create a title. -TO FINALISE
// var title = ui.Label('Change in alien trees at Tokai Park, South Africa', {
//   stretch: 'horizontal',
//   textAlign: 'center',
//   fontWeight: 'bold',
//   fontSize: '24px'
// });
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(24.77, -27.81, 14);
// ADD A KEY
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var main = ui.Panel({style: {width: '310px', padding: '8px'}});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var title = ui.Label('Vaalharts NDVI Classification', {fontWeight: 'bold', fontSize: '20px', color: 'green'});
//var descr = ui.Label("This tool shows invasive alien tree cover at Tokai Park in December of 2018 and 2020 and July of 2021, as well as in greater Table Mountain National Park. It is mapped from Sentinel-2 imagery in three broad categories: pine, gum, and wattle, at a 20 m resolution. Developed by the Friends of Tokai Park, the project was led by Dr Alanna Rebelo, funded by the Izele Small Grant Scheme (2021) and a WESSA Small Grant (2021) and uses methodology from Holden & Rebelo et al. 2021. Choose between the 2018, 2020 and 2021 alien tree map, and compare the results to the Sentinel-2 mosaic of December 2018, 2019 or 2020, and July 2021.", {color: 'black'});
//var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'133px',height:'123px'}});
//var key = ui.Thumbnail({image:key,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'201px',height:'300px'}});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
main.add(title);
//main.add(branding);
//main.add(descr);
//main.add(key);
ui.root.insert(0, main);
//////////////////////////////////////////////////////////////////////// END ////////////////////////////////////////////////////////////////////////