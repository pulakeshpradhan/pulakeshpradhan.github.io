// Importing Japan administrative boundaries
var worldcountries = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017');
var filterCountry = ee.Filter.eq('country_na', 'Japan');
var country = worldcountries.filter(filterCountry);
Map.addLayer(country);
Map.centerObject(country, 6);
//Import Sentinel-2 MSI: MultiSpectral Instrument, Level-1C
var s2 = ee.ImageCollection("COPERNICUS/S2")
// Get images after the disaster.
var s2_af = ee.ImageCollection(s2
  .filterDate('2018-08-01', '2018-09-30')
  .filterMetadata("CLOUDY_PIXEL_PERCENTAGE","not_greater_than",6)
);
// Create an image collection without clouds.
var s2_nc = ee.ImageCollection(s2
  .filterDate('2018-05-01', '2018-06-30')
  .filterMetadata("CLOUDY_PIXEL_PERCENTAGE","not_greater_than",6)
);
// Create a simple composit image by median.
var s2_af_sc = s2_af.reduce(ee.Reducer.median()).clip(country);
var s2_nc_sc = s2_nc.reduce(ee.Reducer.median()).clip(country);
// NDVI 
var s2_af_sc_ndvi = s2_af_sc.normalizedDifference(['B8_median', 'B4_median']);
var s2_nc_sc_ndvi = s2_nc_sc.normalizedDifference(['B8_median', 'B4_median']);
// Adding data to the map
var vizParams = {
  min: 0,
  max: 1,
  palette: ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301']
};
//Map.addLayer(s2_nc_sc_ndvi, vizParams, 'pre');
//Map.addLayer(s2_af_sc_ndvi, vizParams, 'post');
// Visualizing maps using a screen split display
// Add pre to the default Map
Map.addLayer(s2_nc_sc_ndvi, vizParams, 'splitpre');
// Make another Map and add post to it
var Map2 = ui.Map();
Map2.addLayer(s2_af_sc_ndvi, vizParams, 'splitpost');
// Link the default Map to the Map2
var linker = ui.Map.Linker([ui.root.widgets().get(0), Map2]);
// Create a SplitPanel which holds the linked maps side-by-side
// wipe is set to true to let the user swipe the handle back and forth between the two visualizations
var splitPanel = ui.SplitPanel({
  firstPanel: linker.get(0),
  secondPanel: linker.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in root
ui.root.widgets().reset([splitPanel]);
// Center the SplitPanel on coordinates (10, 44) and set zoom level to 6
linker.get(0).setCenter(136.781985467113, 35.4341059264032, 9);
// Saving maps
// Export.image.toDrive({image: no2pre,description: 'mappre', region: country});
// Export.image.toDrive({image: no2post, description: 'mappost', region: country});