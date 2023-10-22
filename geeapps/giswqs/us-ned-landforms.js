var elev = ee.Image("USGS/NED");
// var hillshade = ee.Terrain.hillshade(elev);
// Use the terrain algorithms to compute a hillshade with 8-bit values.
var shade = ee.Terrain.hillshade(elev);
Map.addLayer(shade, {}, 'Hillshade', false);
// Create an "ocean" variable to be used for cartographic purposes
var ocean = elev.lte(0);
// Map.addLayer(ocean.mask(ocean), {palette:'000022'}, 'ocean', false);
// Create a custom elevation palette from hex strings.
var elevationPalette = ['006600', '002200', 'fff700', 'ab7634', 'c4d0ff', 'ffffff'];
// Use these visualization parameters, customized by location.
var visParams = {min: 1, max: 3000, palette: elevationPalette};
// Create a mosaic of the ocean and the elevation data
var visualized = ee.ImageCollection([
  // Mask the elevation to get only land
  elev.mask(ocean.not()).visualize(visParams), 
  // Use the ocean mask directly to display ocean.
  ocean.mask(ocean).visualize({palette:'000022'})
]).mosaic();
// Note that the visualization image doesn't require visualization parameters.
// Map.addLayer(visualized, {}, 'elev palette', false);
// Convert the visualized elevation to HSV, first converting to [0, 1] data.
var hsv = visualized.divide(255).rgbToHsv();
// Select only the hue and saturation bands.
var hs = hsv.select(0, 1);
// Convert the hillshade to [0, 1] data, as expected by the HSV algorithm.
var v = shade.divide(255);
// Create a visualization image by converting back to RGB from HSV.
// Note the cast to byte in order to export the image correctly.
var rgb = hs.addBands(v).hsvToRgb().multiply(255).byte();
Map.addLayer(rgb, {}, 'Shaded Relief');
var dataset = ee.Image('CSP/ERGo/1_0/US/landforms');
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
Map.setCenter(-105.58, 40.5498, 11);
// Map.addLayer(hillshade, {}, "Hillshade");
Map.addLayer(landforms, landformsVis, 'Landforms');