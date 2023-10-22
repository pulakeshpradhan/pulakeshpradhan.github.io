var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                44.71484492997847,
                40.59358521212771
              ],
              [
                44.71484492997847,
                38.861595658709405
              ],
              [
                46.90112422685347,
                38.861595658709405
              ],
              [
                46.90112422685347,
                40.59358521212771
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
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[44.71484492997847, 40.59358521212771],
          [44.71484492997847, 38.861595658709405],
          [46.90112422685347, 38.861595658709405],
          [46.90112422685347, 40.59358521212771]]], null, false);
// Demonstrates before/after imagery comparison with a variety of dates.
//Define boundaries
// var AOI =  ee.Geometry.Rectangle({ //ee.Geometry.Polygon -> in case the polygon has multyple vertexes
//         coords: [[45.4, 40.8], [45.7, 41]],
//         geodesic: false
// });
//Define boundaries
// var AOI =  ee.Geometry.Rectangle({ //ee.Geometry.Polygon -> in case the polygon has multyple vertexes
//         coords: [[46, 39], [47.5, 40.5]],
//         geodesic: false
// });
var AOI = geometry
// Map.addLayer(AOI, {})
// define borderlines
var countries_name = ['Armenia'] 
var HKM_region = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017').filter(ee.Filter.inList('country_na', countries_name));
var border = ee.Image().toByte()
    //.paint(HKM_region, 'fill') // Get color from property named 'fill'
    .paint(HKM_region, 1, 2); // Outline using color 3, width 5.
var border_clip = border.clip(AOI).visualize({palette: ['yellow'], max: 0.3, opacity: 0.6})
// // convert shapefile to line to visualize in gee
// var land_modif = ee.Image().toByte()
//     //.paint(HKM_region, 'fill') // Get color from property named 'fill'
//     .paint(table, 1, 2); // Outline using color 3, width 5.
// print(land_modif, 'land_modif')
// Define clipping function
var clip2AOI = function(image){
  return image.clip(AOI);
};
// Define map title
var left_title = ui.Label('Infrastructure changes along the borderline in south Armenia' ,{fontWeight: 'bold', fontSize: '14px' })
var right_title = ui.Label('Infrastructure changes along the borderline in south Armenia' ,{fontWeight: 'bold', fontSize: '14px' })
/*
* Configure the imagery
*/
var vis_param_Sentinel = {min: 0, max: 3000, bands: ['B4', 'B3', 'B2']};
var vis_param_Sentinel2 = {min: 1000, max: 4000, bands: ['B4', 'B3', 'B2']};
// /*
// * Select the images to visualize ##################################################
// */
// Sentinel 2 data
var S2_2020 = ee.ImageCollection('COPERNICUS/S2_SR')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
                  // .filter(ee.Filter.eq('SENSING_ORBIT_NUMBER', 135))
                  .filterBounds(AOI)
                  // .filterDate('2020-07-01', '2020-10-03')
                  // .filterDate('2020-07-20', '2020-08-31')
                  .filterDate('2020-09-20', '2020-10-31')
                  .map(clip2AOI)
                  .median()
print(S2_2020, 'Sentinel 2 images available')
var S2_2021 = ee.ImageCollection('COPERNICUS/S2_SR')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
                  // .filter(ee.Filter.eq('SENSING_ORBIT_NUMBER', 135))
                  .filterBounds(AOI)
                  // .filterDate('2020-07-01', '2020-10-03')
                  .filterDate('2021-08-20', '2021-09-30')
                  .map(clip2AOI)
                  .median()
var S2_2022 = ee.ImageCollection('COPERNICUS/S2_SR')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
                  // .filter(ee.Filter.eq('SENSING_ORBIT_NUMBER', 135))
                  .filterBounds(AOI)
                  // .filterDate('2020-07-01', '2020-10-03')
                  .filterDate('2022-08-20', '2022-09-20')
                  .map(clip2AOI)
                  .median()
var S2_2023 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterBounds(AOI)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
                  .filterDate('2023-08-01', '2023-09-10')
                  .map(clip2AOI)
                  .median()
// CHeck the available Sentinel images in a given time interval
print(S2_2023, '2023 Sentinel 2 images available')
var S2_1 = ee.Image(S2_2020)
var S2_2 = ee.Image(S2_2021)
var S2_3 = ee.Image(S2_2022)
var S2_4 = ee.Image(S2_2023)
// var S2_1 = ee.Image('COPERNICUS/S2/20200705T074621_20200705T075705_T38TNL')
// var S2_2 = ee.Image('COPERNICUS/S2/20200715T074621_20200715T075644_T38TNL')
// make a dictionary from the selected images to visualize
var images = {
  'Sentinel2 Oct 2020': S2_2020.visualize(vis_param_Sentinel),
  'Sentinel2 Sep 2021': S2_2021.visualize(vis_param_Sentinel),
  'Sentinel2 Sep 2022': S2_2022.visualize(vis_param_Sentinel2),
  'Sentinel2 Aug 2023': S2_2023.visualize(vis_param_Sentinel2),
};
// /*
// * Set up the maps and control widgets
// */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 2, 'top-left');
leftMap.addLayer(border_clip);
leftMap.add(left_title);
// leftMap.addLayer(land_modif,{palette: ['red'], max: 0.3}, '', true, 0.4)
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 3, 'top-right');
rightMap.addLayer(border_clip);
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
// leftMap.setCenter(45.8, 39.8, 12);
leftMap.centerObject(geometry,  11)