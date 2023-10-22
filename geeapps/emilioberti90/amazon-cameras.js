var p = ee.FeatureCollection('users/emilioberti90/amazon-cameras');
var addBuffer = function(feature) {
  return feature.buffer(500); //change here for different buffer
};
p = p.map(addBuffer);
var humanModification = ee.ImageCollection("CSP/HM/GlobalHumanModification").first();
var hmVis = {
  bands: ['gHM'],
  min: 0.0,
  max: 1.0,
  palette: ['0c0c0c', '071aff', 'ff0000', 'ffbd03', 'fbff05', 'fffdfd']
};
var landCover = ee.ImageCollection('ESA/WorldCover/v100').first();
var lcVis = {
  bands: ['Map'],
};
var notFragmented = landCover
  .selfMask()
  .mask(landCover.eq(10));
notFragmented = notFragmented.divide(notFragmented);
var nfVis = {
  min: 1,
  max: 1,
  palette: ['black']
};
Map.setCenter(-50, -10, 3);
Map.addLayer(humanModification, hmVis, 'Human modification', false);
Map.addLayer(landCover, lcVis, 'Land-cover', false);
Map.addLayer(notFragmented.divide(notFragmented), nfVis, 'Not fragmented', true);
Map.addLayer(p, {color: 'gold'}, 'Camera-trap sites', true);
// calculate fragmentation --------
var fragmentation = notFragmented.reduceRegions({
  collection: p,
  reducer: ee.Reducer.sum(),
  scale: 100
});
// calculate human index --------
var human = humanModification.reduceRegions({
  collection: p,
  reducer: ee.Reducer.mean(),
  scale: 100
});
// Export to google drive ----
Export.table.toDrive({
  collection: fragmentation,
  description:'amazon-fragmentation',
  fileFormat: 'CSV'
});
Export.table.toDrive({
  collection: human,
  description:'amazon-human-index',
  fileFormat: 'CSV'
});