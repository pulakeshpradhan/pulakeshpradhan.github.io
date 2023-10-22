/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var roi = /* color: #ffd2ba */ee.Geometry.Polygon(
        [[[-63.04938369158881, -18.525379432336734],
          [-62.89170511708139, -18.533150131659905],
          [-62.89442187642607, -18.43829207739739],
          [-63.03988107589517, -18.453909554941067]]]),
    ductos = ee.FeatureCollection("users/joseauza/trazos");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//////////////////////////////////////////////////////////////
// Asset List
//////////////////////////////////////////////////////////////
var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
var occurrence = gsw.select('occurrence');
var change = gsw.select("change_abs");
//////////////////////////////////////////////////////////////
// Constants
//////////////////////////////////////////////////////////////
var VIS_OCCURRENCE = {
    min:0,
    max:100,
    palette: ['red', 'blue']
};
var VIS_CHANGE = {
    min:-30,
    max:30,
    palette: ['red', 'black', 'limegreen']
};
var VIS_WATER_MASK = {
  palette: ['white', 'black']
};
//////////////////////////////////////////////////////////////
// Calculations
//////////////////////////////////////////////////////////////
// Create a water mask layer, and set the image mask so that non-water areas are transparent.
var water_mask = occurrence.gt(90).mask(1);
// Generate a histogram object and print it to the console tab.
var histogram = ui.Chart.image.histogram({
  image: change,
  region: roi,
  scale: 30,
  minBucketWidth: 10
});
histogram.setOptions({
  title: 'Histogram of surface water change intensity.'
});
//print(histogram);
//////////////////////////////////////////////////////////////
// Initialize Map Location
//////////////////////////////////////////////////////////////
Map.setCenter(-65.2804423665435, -17.812128652582512, 7
);  
//////////////////////////////////////////////////////////////
// Map Layers
//////////////////////////////////////////////////////////////
Map.addLayer({
  eeObject: water_mask,
  visParams: VIS_WATER_MASK,
  name: '90% occurrence water mask',
  shown: false
});
Map.addLayer({
  eeObject: occurrence.updateMask(occurrence.divide(100)),
  name: "Water Occurrence (1984-2015)",
  visParams: VIS_OCCURRENCE,
  shown: false
});
Map.addLayer({
  eeObject: change,
  visParams: VIS_CHANGE,
  name: 'Intensidad del cambio de ocurrencia'
});
var styling = {color: 'purple', fillColor: '00000000'};
Map.addLayer(ductos.style(styling));