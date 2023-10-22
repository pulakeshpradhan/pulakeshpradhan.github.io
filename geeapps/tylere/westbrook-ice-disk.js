// Select some Sentinel-2 image data.
var s2 = ee.ImageCollection('COPERNICUS/S2')
                .filterDate('2019-01-15', '2019-01-16');
var vis_params = {
  min: 0,
  max: 3000,
  bands: ['B4', 'B3', 'B2'],
};
// Define two map objects.
var map1 = ui.Map();
map1.addLayer(s2, vis_params);
var map2 = ui.Map();
// Link the two maps.
var linker = ui.Map.Linker([map1,map2]);
// Create a split panel object.
var split_panel = ui.SplitPanel({
  firstPanel: map1,
  secondPanel: map2,
  wipe: true,
});
// Center the maps on the ice disk.
map1.setCenter(-70.364919, 43.677752, 17);
// Add the split panel to the UI.
ui.root.widgets().reset([split_panel]);