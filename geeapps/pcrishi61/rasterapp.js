var image = ee.Image('WCMC/biomass_carbon_density/v1_0/2010');
// Map.addLayer(ee.Image(1), {min: 0, max: 1}, 'base_map');
Map.addLayer(
    image, {
      min: 1,
      max: 180,
      palette: ['d9f0a3', 'addd8e', '78c679', '41ab5d', '238443', '005a32']
    },
    'carbon_tonnes_per_ha');
Map.setCenter(78.96,20.59,3);
// Load a FeatureCollection from a table dataset: 'RESOLVE' ecoregions.
var ecoregions = ee.FeatureCollection('RESOLVE/ECOREGIONS/2017');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
var palette = ['red','green','blue'];
// Paint the edges with different colors, display.
// Paint the interior of the polygons with different colors.
var fills = empty.paint({
  featureCollection: ecoregions,
  color: 'SHAPE_AREA'
});
Map.addLayer(fills, {palette: palette, max: 25}, 'Ecoregions_by_area');
Map.setCenter(78.96,20.59,3);
var dataset = ee.Image('CSP/ERGo/1_0/Global/ALOS_landforms');
var landforms = dataset.select('constant');
var landformsVis = {
  min: 11.0,
  max: 42.0,
  palette: [
    '141414', '383838', '808080', 'EBEB8F', 'F7D311', 'AA0000', 'D89382',
    'DDC9C9', 'DCCDCE', '1C6330', '68AA63', 'B5C98E', 'E1F0E5', 'a975ba',
    '6f198c'
  ],
};
// Map.setCenter(-105.58, 40.5498, 11);
Map.addLayer(landforms, landformsVis, 'Landforms');
var dataset = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019")
.select('tree-coverfraction');
print(dataset);
Map.addLayer(dataset, {min:0,max:100,palette:['ED5826','FECE28','3C8B2C']}, "Tree-coverfraction");
Map.setCenter(78.96,20.59,3);