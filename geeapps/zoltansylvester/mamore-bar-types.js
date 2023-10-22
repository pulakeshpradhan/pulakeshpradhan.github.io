var cutoffs_2018 = ui.import && ui.import("cutoffs_2018", "table", {
      "id": "users/zoltansylvester/cutoffs_2018"
    }) || ee.FeatureCollection("users/zoltansylvester/cutoffs_2018"),
    mamore_2018 = ui.import && ui.import("mamore_2018", "image", {
      "id": "LANDSAT/LC08/C01/T1_SR/LC08_232070_20180622"
    }) || ee.Image("LANDSAT/LC08/C01/T1_SR/LC08_232070_20180622"),
    bti_polys = ui.import && ui.import("bti_polys", "table", {
      "id": "users/zoltansylvester/bti_polygons_2018"
    }) || ee.FeatureCollection("users/zoltansylvester/bti_polygons_2018"),
    scrolls_2018 = ui.import && ui.import("scrolls_2018", "table", {
      "id": "users/zoltansylvester/scrolls_2018"
    }) || ee.FeatureCollection("users/zoltansylvester/scrolls_2018"),
    L8_visParams = ui.import && ui.import("L8_visParams", "imageVisParam", {
      "params": {
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 0,
        "max": 1700
      }
    }) || {"bands":["B4","B3","B2"],"min":0,"max":1700};
Map.addLayer(mamore_2018, L8_visParams, 'Mamore 2018');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
var palette = ['0485d1', 'FFFFFF', 'f8481c'];
var bti_fills = empty.paint({
  featureCollection: bti_polys,
  color: 'bti',
  // width: 0.5,
});
Map.addLayer(bti_fills, {palette: palette, min: -0.8, max: 0.8}, 'bti polygons');
var empty = ee.Image().byte();
var cutoff_outlines = empty.paint({
  featureCollection: cutoffs_2018,
  color: 1,
  width: 0.5,
});
Map.addLayer(cutoff_outlines, {palette: '000000'}, 'cutoff outlines');
var empty = ee.Image().byte();
var cutoff_fills = empty.paint({
  featureCollection: cutoffs_2018,
  color: 1,
});
Map.addLayer(cutoff_fills, {palette: '#4e7496'}, 'cutoff fills');
var empty = ee.Image().byte();
var scrolls = empty.paint({
  featureCollection: scrolls_2018,
  color: 1,
  width: 0.25,
});
Map.addLayer(scrolls, {palette: '000000'}, 'scrolls');
Map.setCenter(-65.0, -14.96, 13);
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
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
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(-0.8, {margin: '4px 8px'}),
    ui.Label(
        (0.8 / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(0.8, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal'),
});
var legendTitle = ui.Label({
  value: 'bar type index',
  style: {fontWeight: 'bold'}
});
// Add the legendPanel to the map.
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
Map.add(legendPanel);