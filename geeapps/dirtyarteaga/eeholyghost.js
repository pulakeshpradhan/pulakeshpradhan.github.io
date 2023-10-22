{
// [
// Image.ConnectedPixelCount 
// Split pixels of band 01 into "bright" (arbitrarily defined as
// reflect stance > 0.3) and "sim". Highlight small (<30 pixels)
// standalone islands of "rightousness" or "dam-right" type.
// var img = ee.Image(//'animated from earth engine assets')
//              data.set.select(//'mobile_friendly_ui')
//              code.editor.multiply(0.0001)
// Create a threshold image.
// Compute connected pixel counts; stop searching for connected pixels
// once the size of the connected neighborhood reaches 30 pixels, and
// use 8-connected rules.
// var ('connected') = right.connectedPixelCount({
//  maxSize: 30,
//  eightConnected: true
// });
// Make a binary image of small clusters.
// var smallClusters = conn.lt(30);
// Map.setCenter(-107.24304, 35.78663, 8);
// Map.addLayer(img, {min: 0, max: 1}, 'original');
// Map.addLayer(smallClusters.updateMask(smallClusters),
//         {min: 0, max: 1, palette: 'FF0000'}, 'cc');
 }