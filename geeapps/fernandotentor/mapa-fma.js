var ERio = ee.FeatureCollection("users/fernandotentor/ER");
var colorbrewer = require('users/gena/packages:colorbrewer')
var palette = colorbrewer.Palettes.Spectral[11].reverse() 
//colorbrewer.showPalettes()
var FMA = ee.FeatureCollection('ft:1AoF7wI77tWBjuQhCq6Wti5yc5Y5ECHhafVjfrzte');
Map.addLayer(FMA, {}, 'FMA',false);
Map.centerObject(ERio,7);
// This is the name of the property to interpolate.
var propertyToInterpolate = 'calculo';
// Combine mean and SD reducers for efficiency.
var combinedReducer = ee.Reducer.mean().combine({
    reducer2: ee.Reducer.stdDev(),
    sharedInputs: true
});
// Estimate global mean and standard deviation (SD) from the points.
var stats = FMA.reduceColumns({
  reducer: combinedReducer,
  selectors: [propertyToInterpolate]
});
// Do the interpolation, valid to 50 kilometers.
var interpolatedPM25 = FMA.inverseDistance({
  range: 100 * 1000,
  propertyName: propertyToInterpolate,
  mean: stats.get('mean'),
  stdDev: stats.get('stdDev'),
  gamma: 0.5,
  reducer: ee.Reducer.median()
})//.reproject(ee.Projection('EPSG:4326').scale(0.05, 0.05));
// Interpolate SST from the sampled points.
var interpolated = FMA.kriging({
  propertyName: 'calculo',
  shape: 'spherical',
  range: 200 * 1000,
  sill: 1.0,
  nugget: 0.1,
  maxDistance: 500 * 1000,
  reducer: 'mean',
});
// Visualize the resulting interpolated raster.
var vis = {min: 0, max: 9, palette: palette};
Map.setCenter(-60,-32, 7);
Map.addLayer(interpolatedPM25.clip(ERio), vis, 'IDW',false);
Map.addLayer(interpolated.clip(ERio), vis, 'Kriging');
print(interpolated)
var filtered = interpolated.set({'class_palette':["ff0000","00ff00","0000ff"]
,'class_names':['Alto','Medio','Bajo']});
//Exporta Mapa (XYZ Tiles) a Cloud Storage
// Export.map.toCloudStorage(clasif,"clasif","map_gee");
// https://storage.cloud.google.com/storage/browser/map_gee/clasif/index.html
// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '30px 35px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'FMA',
  style: {
    fontWeight: 'bold',
    fontSize: '22px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
var loading = ui.Label('Cargando leyenda...', {margin: '2px 0 4px 0'});
legend.add(loading);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '12px',
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
// Get the list of palette colors and class names from the image.
filtered.toDictionary().evaluate(function(result) {
  var palette = result['class_palette'];
  var names = result['class_names'];
  loading.style().set('shown', false);
  for (var i = 0; i < names.length; i++) {
    legend.add(makeRow(palette[i], names[i]));
  }
});
// Add the legend to the map.
Map.add(legend);