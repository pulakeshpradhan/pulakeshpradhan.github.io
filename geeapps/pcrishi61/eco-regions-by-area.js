// Load a FeatureCollection from a table dataset: 'RESOLVE' ecoregions.
var ecoregions = ee.FeatureCollection('RESOLVE/ECOREGIONS/2017');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
var palette = ['57E86B', '78EC6C','A9F36A', 'DDF969','FEFE69'];
// Paint the edges with different colors, display.
// Paint the interior of the polygons with different colors.
var fills = empty.paint({
  featureCollection: ecoregions,
  color: 'SHAPE_AREA'
});
Map.addLayer(fills, {palette: palette, max: 25}, 'colored fills');
Map.setCenter(78.96,20.59,3)