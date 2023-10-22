/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var hansen = ee.Image("UMD/hansen/global_forest_change_2017_v1_5"),
    image = ee.Image("users/glarrea/database_roads/rasters4/classified_rf_nolatlon_v11"),
    image4 = ee.Image("users/glarrea/database_roads/rasters4/v5_net_2"),
    image7 = ee.Image("users/glarrea/database_roads/rasters4/v5_net_0_1"),
    image3 = ee.Image("users/glarrea/database_roads/rasters4/v6_nn_6_5000_reg"),
    training_database = ee.Image("users/glarrea/database_roads/rasters3/data_pre_100mpx"),
    to_predict_database = ee.Image("users/glarrea/database_roads/rasters3/data_pre_proj_100mpx_v2"),
    image2 = ee.Image("users/glarrea/database_roads/rasters4/train_rf_nolatlon_v6");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var palette = ['9e0142','d53e4f','f46d43','fdae61','fee08b','ffffbf','e6f598','abdda4','66c2a5','3288bd','5e4fa2']
function getPalette(palette, opt_size) {
  var size = opt_size ? opt_size : [100, 7]
  var image = ee.Image.pixelLonLat().select(0)
    .clip(ee.Geometry.Rectangle({ coords: [[0, 0], size], geodesic: false }))
    .visualize({ min: 0, max: 100, palette: palette })
  var thumb = ui.Thumbnail({ 
    image: image, 
    style: { width: '100%' } 
  })
  var panel = ui.Panel({ 
    widgets: [thumb], 
    layout: ui.Panel.Layout.flow('horizontal'), 
    style: { height: '50px' } 
  })
  return panel
}
var class_vis = {
  palette:palette.reverse(),
              max: 1, min:0
};
var gradient= getPalette(palette)
var map1=ui.Map(), map2 =ui.Map(); 
map1.setCenter(-73, -9.74, 6)
map2.setCenter(-73, -9.74, 6)
map1.setOptions("SATELLITE")
// Link the default Map to the other map.
// var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
var linker = ui.Map.Linker([map1, map2]);
// var linker = ui.Map.Linker([linkedMap,map1]);
map1.addLayer(to_predict_database, {min:0, max:10000, bands:["distance_any"]}, "Database to predict")
map1.addLayer(training_database, {min:0, max:10000, bands:["distance_any"]}, "Training database")
map2.addLayer(image4, class_vis, "Model a")
map2.addLayer(image7, class_vis, "Model b")
map2.addLayer(image2, class_vis, "Model c")
map2.addLayer(image3, class_vis, "Model d")
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = new ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: false,
  style: {stretch: 'both'}
});
var legendTitle = ui.Label({
  value: 'Probability',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    padding: '10'
    }
});
var legend = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {
    position: 'bottom-left',
    padding: '1px',
    color: '000000'
  }
});
legend.add(legendTitle);
var panel = ui.Panel({
    widgets: [
      ui.Label(0)
    ],
  });
legend.add(panel);
legend.add(gradient); 
var panel = ui.Panel({
    widgets: [
      ui.Label(1)
    ],
  });
legend.add(panel);
// Set the SplitPanel as the only thing in root.
ui.root.widgets().reset([splitPanel]);
map1.setCenter(-70.6831, -12.2227, 10);
map2.add(legend)