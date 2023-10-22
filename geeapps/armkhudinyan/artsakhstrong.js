var table = ui.import && ui.import("table", "table", {
      "id": "users/armkhudinyan/NK_shape"
    }) || ee.FeatureCollection("users/armkhudinyan/NK_shape"),
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "users/armkhudinyan/NK"
    }) || ee.ImageCollection("users/armkhudinyan/NK"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/armkhudinyan/Armenian_borders"
    }) || ee.FeatureCollection("users/armkhudinyan/Armenian_borders"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/armkhudinyan/ArmenianArtsakh_frontlines"
    }) || ee.FeatureCollection("users/armkhudinyan/ArmenianArtsakh_frontlines"),
    table4 = ui.import && ui.import("table4", "table", {
      "id": "users/armkhudinyan/Azerbaijan_frontlines"
    }) || ee.FeatureCollection("users/armkhudinyan/Azerbaijan_frontlines");
// Demonstrates before/after imagery comparison with a variety of dates.
print(NK)
//Define boundaries
// var AOI =  ee.Geometry.Rectangle({ //ee.Geometry.Polygon -> in case the polygon has multyple vertexes
//         coords: [[45.4, 40.8], [45.7, 41]],
//         geodesic: false
// });
//Define boundaries
var AOI =  ee.Geometry.Rectangle({ //ee.Geometry.Polygon -> in case the polygon has multyple vertexes
        coords: [[46, 39], [47.5, 40.5]],
        geodesic: false
});
// Map.addLayer(AOI, {})
// define borderlines
// var countries_name = ['Armenia'] 
// var HKM_region = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017').filter(ee.Filter.inList('country_na', countries_name));
var border_clip = ee.Image().toByte()
    //.paint(HKM_region, 'fill') // Get color from property named 'fill'
    .paint(table, 1, 2) // Outline using color 3, width 5.
    .visualize({palette: ['red'], max: 0.3, opacity: 0.6})
var Arm_border = ee.Image().toByte()
    .paint(table2, 1, 2) // Outline using color 3, width 5.
    .visualize({palette: ['yellow'], max: 0.3, opacity: 0.6})
var Arm_Artsakh_border = ee.Image().toByte()
    .paint(table3, 1, 2) // Outline using color 3, width 5.
    .visualize({palette: ['green'], max: 0.3, opacity: 0.6})
var Az_frontline = ee.Image().toByte()
    .paint(table4, 1, 2) // Outline using color 3, width 5.
    .visualize({palette: ['red'], max: 0.3, opacity: 0.6})
// convert shapefile to line to visualize in gee
// var land_modif = ee.Image().toByte()
//     .paint(NK_shape, 'fill') // Get color from property named 'fill'
//     .paint(table, 1, 2); // Outline using color 3, width 5.
// print(land_modif, 'land_modif')
// Define clipping function
var clip2AOI = function(image){
  return image.clip(AOI);
};
function renameBand(image) {
    var B2 = image.select('b1').rename('B2')
    var B3 = image.select('b2').rename('B3')
    var B4 = image.select('b3').rename('B4')
    var rtrn = B2.addBands(B3).addBands(B4);
    return rtrn;
  }
var NK = imageCollection.map(renameBand)
print(NK, 'renamed')
// Define map title
var left_title = ui.Label('2020 Artsakh War | Active forestfires' ,{fontWeight: 'bold', fontSize: '14px' })
var right_title = ui.Label('2020 Artsakh War | Active forestfires' ,{fontWeight: 'bold', fontSize: '14px' })
/*
* Configure the imagery
*/
var vis_param_S2          = {min: 0, max: 3000, bands: ['B4', 'B3', 'B2']};
var vis_param_false_color = {min: 0, max: [6000, 6000, 4000], bands: ['B11', 'B8', 'B5']};
// var vis_param_S1 = {min: -20, max: 0};
// Sentinel 2 data
var S2 = ee.ImageCollection('COPERNICUS/S2')
                  // Pre-filter to get less cloudy granules.
                  // .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 80))
                  .filterBounds(AOI)
                  .filterDate('2020-10-25', '2020-11-03')
                  // .map(clip2AOI)
// CHeck the available Sentinel images in a given time interval
print(S2, 'Sentinel 2 images available')
// var S2_bands = S2.toBands() //to get a sertain element from list => list.first(), .last(), .get(N)
// print(S2_bands, 'S2 bands')
// var S2_1 = ee.Image('COPERNICUS/S2/20200705T074621_20200705T075705_T38TNL')
var S2_1 = ee.Image(S2.filterDate('2020-10-25', '2020-10-28').mean())
var S2_2 = ee.Image(S2.filterDate('2020-10-28', '2020-10-29').mean())
var S2_3 = ee.Image(S2.filterDate('2020-10-30', '2020-11-01').mean())
var S2_4 = ee.Image(S2.filterDate('2020-11-01', '2020-10-03').mean())
// var S2_4 = ee.Image((NK).mean())
// // Load Sentinel 1 image collection
// var S1 = ee.ImageCollection('COPERNICUS/S1_GRD')
//                       .filter(ee.Filter.eq('instrumentMode', 'IW'))
//                       .filterMetadata('resolution_meters', 'equals' , 10)
//                       // .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
//                       .filterDate('2020-07-01', '2020-10-03')
//                       // .filter(ee.Filter.eq('relativeOrbitNumber_stop', 152)) // Descending
//                       .filterBounds(AOI)
//                       .select('VV')
//                       .map(clip2AOI)
// print(S1, 'S1 collec')
// var S1_bands = S1.toBands() //to get a sertain element from list => list.first(), .last(), .get(N)
// print(S1_bands, 'S1')
// // var S1_1 = S1_list.get(1) 
// // var S1_2 = S1_list.get(9) 
// var S1_1 = S1_bands.select(0)
// var S1_2 = S1_bands.select(6) 
// make a dictionary from the selected images to visualize
var images = {
  'Sent2-RGB |2020-10-25': S2_1.visualize(vis_param_S2),
  'Sent2-false color |2020-10-25': S2_1.visualize(vis_param_false_color),
  'Sent2-RGB | 2020-10-28': S2_2.visualize(vis_param_S2),
  'Sent2-false color | 2020-10-28': S2_2.visualize(vis_param_false_color),
  'Sent2-RGB |2020-10-30': S2_3.visualize(vis_param_S2),
  'Sent2-false color |2020-10-30': S2_3.visualize(vis_param_false_color),
  // 'Sentinel2 2020-08-09': S2_5.visualize(vis_param_Sentinel),
  // 'Sentinel2 2020-09-18': S2_6.visualize(vis_param_Sentinel),
  // 'Sentinel1 2020-07-04': S1_1.visualize(vis_param_S1),
  // 'Sentinel1 2020-09-14': S1_2.visualize(vis_param_S1),
};
/*
* Set up the maps and control widgets
*/
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 4, 'top-left');
leftMap.addLayer(Arm_border);
leftMap.addLayer(Arm_Artsakh_border);
leftMap.addLayer(Az_frontline);
leftMap.add(left_title);
// leftMap.addLayer(land_modif,{palette: ['red'], max: 0.3}, '', true, 0.4)
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 5, 'top-right');
rightMap.addLayer(Arm_border);
rightMap.addLayer(Arm_Artsakh_border);
rightMap.addLayer(Az_frontline);
rightMap.add(right_title);
// rightMap.addLayer(land_modif,{palette: ['red'], max: 0.3},'', true, 0.4)
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
leftMap.setCenter(46.634, 40.25, 13);
// leftMap.centerObject(AOI,  10)