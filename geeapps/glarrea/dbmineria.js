var db = ee.Image("users/glarrea/mining/data_to_predict_C0_100"),
    vis1 = {"opacity":1,"bands":["distance_vec"],"max":50000,"palette":["ff0000","0013ff","00ff08","e3ff00","ffffff"]},
    def_min_2012 = ee.FeatureCollection("users/glarrea/DEF_MIN_2012"),
    def_min_2013 = ee.FeatureCollection("users/glarrea/DEF_MIN_2013"),
    def_min_2014 = ee.FeatureCollection("users/glarrea/DEF_MIN_2014"),
    def_min_2015 = ee.FeatureCollection("users/glarrea/DEF_MIN_2015"),
    def_min_2016 = ee.FeatureCollection("users/glarrea/DEF_MIN_2016"),
    def_min_2017 = ee.FeatureCollection("users/glarrea/DEF_MIN_2017"),
    vis2 = {"opacity":1,"bands":["altitude"],"min":0,"max":450,"palette":["000000","faff00","03ff00","0036ff","fb00ff","ff0000"]},
    vis3 = {"opacity":1,"bands":["landform"],"min":20,"max":37,"palette":["000000","faff00","03ff00","0036ff","fb00ff","ff0000","ffffff"]},
    vis4 = {"opacity":1,"bands":["scale"],"min":-4.4,"max":9.6,"palette":["0f00ff","00dbff","000000","3eff00","ff0000"]};
/////Useful functions////////{useful functions /////////////////////////////////
var sumNeighborhood = function (image) {
      var output = image.reduceNeighborhood({
          reducer:ee.Reducer.sum().unweighted(),
          kernel: ee.Kernel.circle(10,'pixels')
      });
      return output;
};
var addyear = function (image) {
    var index = image.get('system:index');  
    var number = ee.Number.parse(index).add(1);
    return image.addBands(number)
    .select(['lossyear_sum','constant'],['loss','year'])
    .cast({'loss': 'int64',
            'year': 'int64'
    }, ['loss','year']);
};
var addyear_new = function (image) {
    var index = image.get('system:index');  
    var number = ee.Number.parse(index).add(1);
    return image.addBands(number)
    .select(['first_sum','constant'],['loss','year'])
    .cast({'loss': 'int64',
            'year': 'int64'
    }, ['loss','year']);
};
/////////////////////////////// end of useful functions}
var mining_2012 = def_min_2012.reduceToImage({
                properties: ['Type'], 
                reducer:ee.Reducer.first()}).gte(1).unmask(0),
    mining_2013 = def_min_2013.reduceToImage({
                properties: ['Type'], 
                reducer:ee.Reducer.first()}).gte(1).unmask(0),
    mining_2014 = def_min_2014.reduceToImage({
                properties: ['Type'], 
                reducer:ee.Reducer.first()}).gte(1).unmask(0),
    mining_2015 = def_min_2015.reduceToImage({
                properties: ['Type'], 
                reducer:ee.Reducer.first()}).gte(1).unmask(0),
    mining_2016 = def_min_2016.reduceToImage({
                properties: ['Type'], 
                reducer:ee.Reducer.first()}).gte(1).unmask(0);
var rate2016_mining = ee.ImageCollection ([mining_2012,mining_2013,mining_2014,mining_2015]).map(sumNeighborhood).map(addyear_new)
                          .select(['year','loss']).reduce(ee.Reducer.linearFit()),
    rate2017_mining = ee.ImageCollection ([mining_2013,mining_2014,mining_2015,mining_2016]).map(sumNeighborhood).map(addyear_new)
                          .select(['year','loss']).reduce(ee.Reducer.linearFit());                
var gold12 = ee.Image([1224.5,1571.5]),
    gold13 = ee.Image([1571.5,1669]),
    gold14 = ee.Image([1669,1411.2]),
    gold15 = ee.Image([1411.2,1266.4]),
    gold16 = ee.Image([1266.4,1160.1]);
var gold17_a1 =ee.Image([1160.1,1250.8]),
    gold18_a1 = ee.Image([1250.8,1257.2]),
    gold19_a1 = ee.Image([1257.2,1500]),
    gold20_a1 = ee.Image([1500,1800]),
    gold21_a1 = ee.Image([1800,1500]);
var gold17_a1 = gold17_a1.addBands(gold17_a1.select(1).subtract(gold17_a1.select(0))).select([0,1,2],['price_before','price_after','price_dif']),
    gold18_a1 = gold18_a1.addBands(gold18_a1.select(1).subtract(gold18_a1.select(0))).select([0,1,2],['price_before','price_after','price_dif']),
    gold19_a1 = gold19_a1.addBands(gold19_a1.select(1).subtract(gold19_a1.select(0))).select([0,1,2],['price_before','price_after','price_dif']),
    gold20_a1 = gold20_a1.addBands(gold20_a1.select(1).subtract(gold20_a1.select(0))).select([0,1,2],['price_before','price_after','price_dif']),
    gold21_a1 = gold21_a1.addBands(gold21_a1.select(1).subtract(gold21_a1.select(0))).select([0,1,2],['price_before','price_after','price_dif']);
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
var images = {
  // 'Dist. Car. Nacional' : db.select(['distance_nac']), 
  // 'Dist. Car. Departamental' : db.select(['distance_dep']), 
  'Dist. Car. Vecinal' : db.select(['distance_vec']), 
  'Landsat 8' : composite, 
  'Dist. Parque Nacional' : db.select(['distance_parks']), 
  // 'Dist. Pueblo' : db.select(['distance_villages']), 
  'Altitud' : db.select(['altitude']), 
  'Formación Terrestre': db.select(['landform']),
  'Ratio de Deforestación' : rate2017_mining.select(['scale'])
  };
var bands = {
  // 'Dist. Car. Nacional' :  {"opacity":1,"bands":["distance_nac"],"max":20000,"palette":["ff0000","0013ff","00ff08","e3ff00","ffffff"]}, 
  // 'Dist. Car. Departamental' : {"opacity":1,"bands":["distance_dep"],"max":20000,"palette":["ff0000","0013ff","00ff08","e3ff00","ffffff"]}, 
  'Dist. Car. Vecinal' : {"opacity":1,"bands":["distance_vec"],"max":20000,"palette":["ff0000","0013ff","00ff08","e3ff00","ffffff"]}, 
  'Landsat 8' : {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3},
  'Dist. Parque Nacional' : {"opacity":1,"bands":["distance_parks"],"max":20000,"palette":["ff0000","0013ff","00ff08","e3ff00","ffffff"]}, 
  // 'Dist. Pueblo' : {"opacity":1,"bands":["distance_villages"],"max":20000,"palette":["ff0000","0013ff","00ff08","e3ff00","ffffff"]}, 
  'Altitud' : vis2, 
  'Formación Terrestre': vis3,
  'Ratio de Deforestación' : vis4
  };
// Display the results.
// map_1.addLayer(vis1)
// // map_1.setControlVisibility(false);
// map_1.add(ui.Label('Imagen Satelital (B4/B3/B2)',{position:'top-center'}));
// map_1.add(ui.Label('Deforestación real - 2017',{position:'top-left'}));
// map_1.addLayer(composite, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3},'Imagen Satelital (B4/B3/B2)');
// map_1.addLayer(def_min_2017,{color:'ffff00'},'Deforestacion real - 2017');
var maps = [];
Object.keys(images).forEach(function(name) {
  var map = ui.Map();
  map.add(ui.Label(name));
  map.addLayer(images[name], bands[name], name)
  map.setControlVisibility(false);
  maps.push(map);
});
// function addLayerSelector(mapToChange, defaultValue, position) {
//   var label = ui.Label('Seleccione un modelo');
//   var colorBar = ui.Thumbnail({
//   image: ee.Image.pixelLonLat().select(0),
//   params: makeColorBarParams(vis.palette),
//   style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
// });
//   var legendLabels = ui.Panel({
//   widgets: [
//     ui.Label(0, {margin: '4px 8px'}),
//     ui.Label(0.5,
//         {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
//     ui.Label(1, {margin: '4px 8px'})
//   ],
//   layout: ui.Panel.Layout.flow('horizontal')
// });
//   var legendTitle = ui.Label({
//   value: 'Score de deforestación - RandomForest',
//   style: {fontWeight: 'bold'}
// });
//   // This function changes the given map to show the selected image.
//   function updateMap(selection) {
//     mapToChange.layers().set(1, ui.Map.Layer(images[selection],vis));
//     mapToChange.layers().set(0, ui.Map.Layer(composite, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3},'Imagen Satelital (B4/B3/B2)'));
//     }
//   // Configure a selection dropdown to allow the user to choose between images,
//   // and set the map to update when a user makes a selection.
//   var select = ui.Select({items: Object.keys(images), onChange: updateMap});
//   select.setValue(Object.keys(images)[defaultValue], true);
//   var controlPanel =
//       ui.Panel({widgets: [label, select, legendTitle, colorBar, legendLabels], style: {position: position}});
//   mapToChange.add(controlPanel);
// }
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
var linker = ui.Map.Linker(maps);
// Enable zooming on the top-left map.
maps[0].setControlVisibility({zoomControl: true});
// Show the scale (e.g. '500m') on the bottom-right map.
maps[1].setControlVisibility({scaleControl: true});
// // Create a grid of maps.
var mapGrid = ui.Panel(
    [
      ui.Panel([maps[0], maps[1], maps[2]], null, {stretch: 'both'}),
      ui.Panel([maps[3], maps[4], maps[5]], null, {stretch: 'both'}),
      // ui.Panel([maps[6], maps[7], maps[8]], null, {stretch: 'both'}),
    ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
// // Center the map at an interesting spot in Greece. All
// // other maps will align themselves to this parent map.
// maps[0].setCenter(21.2712, 38.4151, 12);
// var mapGrid = ui.Panel([map_1,map_2],ui.Panel.Layout.Flow('vertical'), {stretch: 'both'})
// var splitPanel = ui.SplitPanel({
//   firstPanel: map_1,
//   secondPanel: map_2,
//   wipe: true,
//   style: {stretch: 'both'}
// });
/*
 * Add a title and initialize
 */
// Create a title.
var title = ui.Label('Variables de la base de datos', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
// Add the maps and title to the ui.root.
ui.root.widgets().reset([title, mapGrid]);
// ui.root.widgets().reset([splitPanel]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
maps[0].setCenter(-70.5168, -13.0038, 12)