var def_min_tot = ee.FeatureCollection("users/glarrea/Def_Min_SPA_1984_2017"),
    predicted_2017_s4_vintage = ee.Image("users/glarrea/mining/predicted_2017_010719_g_prob_s4_100"),
    vis = {"opacity":1,"bands":["classification"],"palette":["000000","0000ff","00feff","03ff00","ff0000"]},
    def_min_2017 = ee.FeatureCollection("users/glarrea/DEF_MIN_2017"),
    predicted_2017_s4_plus = ee.Image("users/glarrea/mining/predicted_2017_010719_g_plus_prob_s4_100"),
    predicted_2017_s3d = ee.Image("users/glarrea/mining/predicted_2017_010719_g_plus_prob_s3d_100"),
    predicted_2017_s5 = ee.Image("users/glarrea/mining/predicted_2017_010719_g_plus_prob_s5_100");
var images = {
  '-' : ee.Image(0), 
  'M1': predicted_2017_s4_plus,
  'M2': predicted_2017_s3d,
  'M3': predicted_2017_s5
  };
// var mining_all = def_min_tot.filter(ee.Filter.lte('Year',2016)).reduceToImage({
//                 properties: ['Type'], 
//                 reducer:ee.Reducer.first()}).gte(1).unmask(0)
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60')
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var collection = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2017-04-01', '2017-12-31')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .map(maskS2clouds)
var collection18 = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2018-04-01', '2018-12-31')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .map(maskS2clouds)
var composite = collection.median()
var composite18 = collection18.median()
// Display the results.
// Map.addLayer(composite, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3}, 'RGB')
/*
 * Configure maps, link them in a grid
 */
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
// Create a map for each visualization option.
//create 3 maps individually
var map_1 = ui.Map();
// map_1.setControlVisibility(false);
map_1.add(ui.Label('Imagen Satelital (B4/B3/B2)',{position:'top-left'}));
map_1.add(ui.Label('Deforestación real - 2017',{position:'top-left'}));
map_1.addLayer(composite, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3},'Imagen Satelital (B4/B3/B2)');
map_1.addLayer(def_min_2017,{color:'ffff00'},'Deforestacion real - 2017');
var map_2 = ui.Map();
// map_2.setControlVisibility(false);
var map_2_selector = addLayerSelector(map_2, 0, 'top-right');
// map_2.addLayer(predicted_2017_s4, { min: 0, max: 1, palette:['000000','blue','ffffff','green','red']},
//             'classified_prob');
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Seleccione un modelo');
  var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
  var legendLabels = ui.Panel({
  widgets: [
    ui.Label(0, {margin: '4px 8px'}),
    ui.Label(0.5,
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(1, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
  var legendTitle = ui.Label({
  value: 'Score de deforestación - RandomForest',
  style: {fontWeight: 'bold'}
});
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(1, ui.Map.Layer(images[selection],vis));
    mapToChange.layers().set(0, ui.Map.Layer(composite, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3},'Imagen Satelital (B4/B3/B2)'));
    }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select, legendTitle, colorBar, legendLabels], style: {position: position}});
  mapToChange.add(controlPanel);
}
// var colorBar = ui.Thumbnail({
//   image: ee.Image.pixelLonLat().select(0),
//   params: makeColorBarParams(vis.palette),
//   style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
// });
// // Create a panel with three numbers for the legend.
// var legendLabels = ui.Panel({
//   widgets: [
//     ui.Label(0, {margin: '4px 8px'}),
//     ui.Label(0.5,
//         {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
//     ui.Label(1, {margin: '4px 8px'})
//   ],
//   layout: ui.Panel.Layout.flow('horizontal')
// });
// var legendTitle = ui.Label({
//   value: 'Map Legend: median 2017 ocean temp (C)',
//   style: {fontWeight: 'bold'}
// });
// var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
// inspectorPanel.widgets().set(3, legendPanel);
var maps = [map_1,map_2];
var linker = ui.Map.Linker(maps);
// Enable zooming on the top-left map.
maps[0].setControlVisibility({zoomControl: true});
// Show the scale (e.g. '500m') on the bottom-right map.
maps[1].setControlVisibility({scaleControl: true});
// // Create a grid of maps.
// var mapGrid = ui.Panel(
//     [
//       ui.Panel([maps[0], maps[1]], null, {stretch: 'both'}),
//       ui.Panel([maps[2], maps[3]], null, {stretch: 'both'})
//     ],
//     ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
// // Center the map at an interesting spot in Greece. All
// // other maps will align themselves to this parent map.
// maps[0].setCenter(21.2712, 38.4151, 12);
// var mapGrid = ui.Panel([map_1,map_2],ui.Panel.Layout.Flow('vertical'), {stretch: 'both'})
var splitPanel = ui.SplitPanel({
  firstPanel: map_1,
  secondPanel: map_2,
  wipe: true,
  style: {stretch: 'both'}
});
/*
 * Add a title and initialize
 */
// Create a title.
var title = ui.Label('Comparación de modelos', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
// Add the maps and title to the ui.root.
// ui.root.widgets().reset([title, mapGrid]);
ui.root.widgets().reset([splitPanel]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
map_1.setCenter(-70.5168, -13.0038, 12)