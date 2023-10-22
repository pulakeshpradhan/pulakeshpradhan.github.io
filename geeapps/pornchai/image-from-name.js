// Display an image given its ID.
// save to my folder
var image = ee.Image('CGIAR/SRTM90_V4');
// Center the Map.
Map.setCenter(100.527, 13.773, 5);
// Display the image.
Map.addLayer(image, {min: 1000, max: 3000}, 'SRTM');