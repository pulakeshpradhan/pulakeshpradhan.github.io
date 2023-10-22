var china = ui.import && ui.import("china", "table", {
      "id": "users/luzhen0527/chinain/china_shp"
    }) || ee.FeatureCollection("users/luzhen0527/chinain/china_shp"),
    province = ui.import && ui.import("province", "table", {
      "id": "users/luzhen0527/china/China_province"
    }) || ee.FeatureCollection("users/luzhen0527/china/China_province");
var land = ee.ImageCollection("ESA/WorldCover/v100").first().aside(print)
var landcover = land.clip(china);
var palette = land.get('Map_class_palette').aside(print)
var vis = {
  bands: ['Map'],
};
// Get the list of palette colors and class names from the image.
var palette=["006400", "ffbb22", "ffff4c", "f096ff","fa0000","b4b4b4",
"f0f0f0","0064c8","0096a0","00cf75", "fae6a0"
  ];
var names = [
    'Trees', 'Shrubland', 
    'Grassland','Cropland', 'Built-up', 
    'Barren / sparse vegetation', 'Snow and ice', 'Open water', 'Herbaceous wetland', 
    'Mangroves', 'Moss and lichen'];
Map.centerObject(china,4);
Map.addLayer(landcover, vis, "Landcover");
Map.addLayer(landcover.updateMask(landcover.gt(90)), vis, "Landcover91");
// 创建裂图例面板
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'ESA_CoverLand_2020',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
legend.add(loading);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor:'#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
loading.style().set('shown', false);
for (var i = 0; i < names.length; i++) {
    print(palette[i],names[i])
    legend.add(makeRow(palette[i], names[i]));
  }
// Add the legend to the map.
Map.add(legend);