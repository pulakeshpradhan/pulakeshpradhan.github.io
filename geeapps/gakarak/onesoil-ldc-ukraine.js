/*
 * Map layer configuration
 */
//init empty raster
var empty = ee.Image().byte();
// Function for color filling by attribute
function feature_to_image(feature, column, viz) {
  var polygon_filling = empty.paint({
    featureCollection: feature,
    color: column
  });
var image = polygon_filling.visualize(viz);
return(image);
}
// custom palletes
var palettes = require('users/gena/packages:palettes');
var color_palette_norm = palettes.matplotlib.viridis[7];
var color_palette_abs_SunFlower = palettes.matplotlib.magma[7];
var color_palette_abs_Maize = palettes.kovesi.linear_green_5_95_c69[7];
var viz_YieldNorm = {min:0, max:1, palette: color_palette_norm};
var viz_YieldSunFlower = {min:13, max:20, palette: color_palette_abs_SunFlower};
var viz_YieldMaize = {min:15, max:70, palette: color_palette_abs_Maize};
/*
var crops = ee.FeatureCollection('users/skachkovaas/glencore/UA_crops');
var sunflower = ee.FeatureCollection('users/skachkovaas/glencore/UA_Kirovohrad_sunflower');
var maize = ee.FeatureCollection('users/skachkovaas/glencore/UA_Poltava_maize');
Export.table.toAsset({
  collection: crops, 
  description: 'glencore-UA_crops',
  assetId: 'glencore/UA_crops'
});
Export.table.toAsset({
  collection: sunflower, 
  description: 'glencore-UA_Kirovohrad_sunflower', 
  assetId: 'glencore/UA_Kirovohrad_sunflower'
});
Export.table.toAsset({
  collection: maize, 
  description: 'glencore-UA_Poltava_maize', 
  assetId: 'glencore/UA_Poltava_maize'
});
*/
var crops = ee.FeatureCollection('users/gakarak/glencore/UA_crops');
var sunflower = ee.FeatureCollection('users/gakarak/glencore/UA_Kirovohrad_sunflower');
var maize = ee.FeatureCollection('users/gakarak/glencore/UA_Poltava_maize');
// Layers, filters, viz and labels.
//Normalized
var sunflower_norm = ui.Map.Layer(feature_to_image(sunflower, 'field_scor', viz_YieldNorm)).setName('Подсолнечник, FieldScore').setShown(false);
var mazie_norm = ui.Map.Layer(feature_to_image(maize, 'field_scor', viz_YieldNorm)).setName('Кукуруза, FieldScore').setShown(false);                                                          
// Abs
var sunflower_abs = ui.Map.Layer(feature_to_image(sunflower, 'YIELD_pred', viz_YieldSunFlower)).setName('Подсолнечник, ц/га');
var mazie_abs = ui.Map.Layer(feature_to_image(maize, 'YIELD_pred',viz_YieldMaize)).setName('Кукуруза, ц/га');
var mapPanel = ui.Map();
// mapPanel.setOptions('HYBRID');
var initialPoint = ee.Geometry.Point(33.62, 49.012);
mapPanel.centerObject(initialPoint, 7);
var layers = mapPanel.layers();
layers.add(sunflower_norm);
layers.add(mazie_norm);
layers.add(sunflower_abs);
layers.add(mazie_abs);
// (1) Panel setup
// Create a panel to hold title, intro text, chart and legend components.
var inspectorPanel = ui.Panel({style: {width: '30%'}});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'LDC Ukraine',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
]);
inspectorPanel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
inspectorPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Add placeholders for the chart and legend.
inspectorPanel.add(ui.Label('[Легенда]'));
// (2) Norm Legend setup
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '80x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(viz_YieldNorm.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(viz_YieldNorm.min, {margin: '4px 8px'}),
    ui.Label(
        (viz_YieldNorm.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(viz_YieldNorm.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'FieldScore',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(3, legendPanel);
// (3) Sunflower Legend setup
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(viz_YieldSunFlower.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(viz_YieldSunFlower.min, {margin: '4px 8px'}),
    ui.Label(
        (viz_YieldSunFlower.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(viz_YieldSunFlower.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Урожайность подсолнечника, ц/га',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(4, legendPanel);
// (4) Mazie Legend setup
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(viz_YieldMaize.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(viz_YieldMaize.min, {margin: '4px 8px'}),
    ui.Label(
        (viz_YieldMaize.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(viz_YieldMaize.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Урожайность кукурузы, ц/га',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(5, legendPanel);
// (5) Initialize the app
// Replace the root with a SplitPanel that contains the inspector and map.
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));