var arm_borders = ui.import && ui.import("arm_borders", "table", {
      "id": "users/armkhudinyan/Armenian_borders"
    }) || ee.FeatureCollection("users/armkhudinyan/Armenian_borders"),
    NK_borders = ui.import && ui.import("NK_borders", "table", {
      "id": "users/armkhudinyan/NK_shape"
    }) || ee.FeatureCollection("users/armkhudinyan/NK_shape"),
    Nk_new_borders = ui.import && ui.import("Nk_new_borders", "table", {
      "id": "users/armkhudinyan/KarabakhArea01_26_2021"
    }) || ee.FeatureCollection("users/armkhudinyan/KarabakhArea01_26_2021");
// Demonstrates before/after imagery comparison with a variety of dates.
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
// var Arm_border = ee.Image().toByte()
//     //.paint(HKM_region, 'fill') // Get color from property named 'fill'
//     .paint(arm_borders, 1, 2) // Outline using color 3, width 5.
//     .visualize({palette: ['black'], max: 0.3, opacity: 0.6})
var Arm_Artsakh_border = ee.Image().toByte()
    .paint(NK_borders, 1, 2) // Outline using color 3, width 5.
    .visualize({palette: ['red'], max: 0.3, opacity: 0.6})
var Nk_new_border = ee.Image().toByte()
    .paint(Nk_new_borders, 1, 2) // Outline using color 3, width 5.
    .visualize({palette: ['green'], max: 0.3, opacity: 0.6})
// convert shapefile to line to visualize in gee
// var land_modif = ee.Image().toByte()
//     .paint(NK_shape, 'fill') // Get color from property named 'fill'
//     .paint(table, 1, 2); // Outline using color 3, width 5.
// print(land_modif, 'land_modif')
// Define clipping function
var clip2AOI = function(image){
  return image.clip(AOI);
};
/*
* Configure the imagery
*/
var vis_param_S2 = {min: 0, max: 3000, bands: ['B4', 'B3', 'B2']};
var bands = ['B4', 'B3', 'B2']
// var vis_param_false_color = {min: 0, max: [6000, 6000, 4000], bands: ['B11', 'B8', 'B5']};
// Sentinel 2 data
var S2_coll = ee.ImageCollection('COPERNICUS/S2')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
                  .filterBounds(AOI)
                  .filterDate('2020-09-01', '2021-07-10')
                  .select(bands)
                  // .map(clip2AOI)
// CHeck the available Sentinel images in a given time interval
print(S2_coll, 'Sentinel 2 images available')
// var S2_bands = S2.toBands() //to get a sertain element from list => list.first(), .last(), .get(N)
// print(S2_bands, 'S2 bands')
// var S2_1 = ee.Image('COPERNICUS/S2/20200705T074621_20200705T075705_T38TNL')
var Sep = S2_coll.filter(ee.Filter.date('2020-09-01', '2020-10-01')).median()
var Oct = S2_coll.filter(ee.Filter.date('2020-10-01', '2020-11-01')).median()
var Nov = S2_coll.filter(ee.Filter.date('2020-11-01', '2020-12-01')).median()
var Dec = S2_coll.filter(ee.Filter.date('2020-12-01', '2021-01-01')).median()
var Jan = S2_coll.filter(ee.Filter.date('2021-01-01', '2021-02-01')).median()
var Feb = S2_coll.filter(ee.Filter.date('2021-02-01', '2021-03-01')).median()
var Mar = S2_coll.filter(ee.Filter.date('2021-03-01', '2021-04-01')).median()
var Apr = S2_coll.filter(ee.Filter.date('2021-04-01', '2021-05-01')).median()
var May = S2_coll.filter(ee.Filter.date('2021-05-01', '2021-06-01')).median()
var Jun = S2_coll.filter(ee.Filter.date('2021-06-01', '2021-07-01')).median()
var Jul = S2_coll.filter(ee.Filter.date('2021-07-01', '2021-07-10')).median()
// print(S1, 'S1 collec')
// var S1_bands = S1.toBands() //to get a sertain element from list => list.first(), .last(), .get(N)
// print(S1_bands, 'S1')
// make a dictionary from the selected images to visualize
var images = {
  'Sent2-RGB |Sep-20': Sep.visualize(vis_param_S2),
  'Sent2-RGB |Oct-20': Oct.visualize(vis_param_S2),
  'Sent2-RGB |Nov-20': Nov.visualize(vis_param_S2),
  'Sent2-RGB |Dec-20': Dec.visualize(vis_param_S2),
  'Sent2-RGB |Jan-21': Jan.visualize(vis_param_S2),
  'Sent2-RGB |Feb-21': Feb.visualize(vis_param_S2),
  'Sent2-RGB |Mar-21': Mar.visualize(vis_param_S2),
  'Sent2-RGB |Apr-21': Apr.visualize(vis_param_S2),
  'Sent2-RGB |May-21': May.visualize(vis_param_S2),
  'Sent2-RGB |Jun-21': Jun.visualize(vis_param_S2),
  'Sent2-RGB |Jul-21': Jul.visualize(vis_param_S2),
};
print(Jul, 'Sent2-RGB |Jul')
/*
* Set up the maps and control widgets
*/
// Define map title
var left_title  = ui.Label('Borders after 2020 Artsakh War' ,{fontWeight: 'bold', fontSize: '14px' })
var right_title = ui.Label('Borders after 2020 Artsakh War' ,{fontWeight: 'bold', fontSize: '14px' })
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// leftMap.addLayer(Arm_border);
leftMap.addLayer(Arm_Artsakh_border);
leftMap.addLayer(Nk_new_border);
leftMap.add(left_title);
// leftMap.addLayer(land_modif,{palette: ['red'], max: 0.3}, '', true, 0.4)
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 10, 'top-right');
// rightMap.addLayer(Arm_border);
rightMap.addLayer(Arm_Artsakh_border);
rightMap.addLayer(Nk_new_border);
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
leftMap.setCenter(46.634, 40.25, 9);
// leftMap.centerObject(AOI,  10)