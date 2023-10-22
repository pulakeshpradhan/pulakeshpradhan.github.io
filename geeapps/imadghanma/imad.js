/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var ETIa = ee.ImageCollection("FAO/WAPOR/2/L1_AETI_D"),
    mis = ee.FeatureCollection("users/imadghanma/mis");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
Map.centerObject(mis,8);
// Filter November 2020
var filtered = ETIa.filter(ee.Filter.date('2020-11-01', '2020-11-30'));
print(filtered.size());
// Create a function to scale the values with scale factor 0.1
function scaleETIa(image) {
  var scaled = image.multiply(0.1);
  return scaled;
}
// Map the function to the imageCollection
var scaledImage = filtered.map(scaleETIa);
// Calculate the monthly average
var average = scaledImage.mean();
// Calculate the total for the month
var month = average.multiply(30);
// Clip to the study area
var clipped = month.clip(mis);
// Visualise the result
var vizParams = {
  min: 0,
  max: 100,
  palette: ['#ece7f2','#a6bddb','#2b8cbe']
};
Map.addLayer(clipped, vizParams, 'Total ETIa November 2020');
// Calculate the sum of total ETIa for study area
var stats = clipped.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: mis,
  scale: 250
});
print('The total ETIa is:', stats.get('L1_AETI_D'), 'mm');
// Save clipped image to Google Drive
Export.image.toDrive({
  image: clipped,
  description: 'Total ETIa November 2020 mis',
  folder: 'earthengine',
  fileNamePrefix: 'ETIatot',
  region: mis,
  scale: 250
});