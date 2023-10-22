var shapefile12 = ui.import && ui.import("shapefile12", "table", {
      "id": "projects/ee-glocalupi/assets/Clip_P1"
    }) || ee.FeatureCollection("projects/ee-glocalupi/assets/Clip_P1"),
    shapefile22 = ui.import && ui.import("shapefile22", "table", {
      "id": "projects/ee-glocalupi/assets/SAWAH_DIGIT"
    }) || ee.FeatureCollection("projects/ee-glocalupi/assets/SAWAH_DIGIT");
// Load the two geometries
var shp1 = shapefile22;
var shp2 = shapefile12;
// Get the geometries of each feature
var geometry1 = shp1.geometry();
var geometry2 = shp2.geometry();
// Compute intersection geometry
var intersection = geometry1.intersection(geometry2);
// Compute areas
var area1 = geometry1.area();
var area2 = geometry2.area();
var intersectionArea = intersection.area();
var unionArea = area1.add(area2).subtract(intersectionArea);
var unionAreaImage = ee.Image.constant(unionArea);
// Compute IOU
var iou = intersectionArea.divide(unionArea);
var iouPercentage = iou.multiply(100);
// Compute areas in hectares
var intersectionAreaHectares = intersectionArea.divide(10000);
var unionAreaHectares = unionArea.divide(10000);
// Compute percentage of intersection and union areas compared to the total area
var totalArea = area1.add(area2).subtract(intersectionArea);
var intersectionPercentage = intersectionArea.divide(totalArea).multiply(100);
var unionPercentage = unionArea.divide(totalArea).multiply(100);
// Print the results
print('IOU:', iou);
print('IOU Percentage:', iouPercentage, '%');
print('Intersection Area:', intersectionPercentage, '% of total area', '(', intersectionAreaHectares, 'hectares )');
print('Union Area:', unionPercentage, '% of total area', '(', unionAreaHectares, 'hectares )');
print('SHP REFERENCE:', area1, 'square meters', '(', area1.divide(10000), 'hectares )');
print('SHP SEGMENTATION:', area2, 'square meters', '(', area2.divide(10000), 'hectares )');
// Create a legend panel
var legendPanel = ui.Panel({
  style: {
    position: 'bottom-right'
  }
});
// Create and add legend labels
var geometry1Label = ui.Label('SHP REFERENCE', {margin: '2px 0', fontWeight: 'bold', fontSize: '14px', padding: '0 8px', backgroundColor: 'red', color: 'white'});
var geometry2Label = ui.Label('SHP PREDICTION', {margin: '2px 0', fontWeight: 'bold', fontSize: '14px', padding: '0 8px', backgroundColor: 'blue', color: 'white'});
var intersectionLabel = ui.Label('Intersection', {margin: '2px 0', fontWeight: 'bold', fontSize: '14px', padding: '0 8px', backgroundColor: 'green', color: 'white'});
// Create and style the panel for the legend labels
var legendLabels = ui.Panel([geometry1Label, geometry2Label, intersectionLabel]);
legendLabels.style().set({
position: 'bottom-left',
width: '200px'
});
// Create text box with results
var textBox = ui.Panel({
  style: {position: 'bottom-right'}
});
textBox.add(ui.Label('IOU: ' + iou.getInfo().toFixed(2)));
textBox.add(ui.Label('IOU Percentage: ' + iouPercentage.getInfo().toFixed(2) + '%'));
textBox.add(ui.Label('Intersection Area: ' + intersectionPercentage.getInfo().toFixed(2) + '% of total area (' + intersectionAreaHectares.getInfo().toFixed(2) + ' hectares)'));
textBox.add(ui.Label('Union Area: ' + unionPercentage.getInfo().toFixed(2) + '% of total area (' + unionAreaHectares.getInfo().toFixed(2) + ' hectares)'));
textBox.add(ui.Label('SHP REFERENCE: ' + area1.getInfo().toFixed(2) + ' square meters (' + area1.divide(10000).getInfo().toFixed(2) + ' hectares)'));
textBox.add(ui.Label('SHP PREDICTION: ' + area2.getInfo().toFixed(2) + ' square meters (' + area2.divide(10000).getInfo().toFixed(2) + ' hectares)'));
Map.add(textBox);
// Add the legend to the map
Map.add(legendLabels);
// Center the map on the first geometry
Map.centerObject(geometry1);
// Visualize the geometries
Map.addLayer(geometry1, {color: 'red'}, 'SHP REFERENCE');
Map.addLayer(geometry2, {color: 'blue'}, 'SHP PREDICTION');
Map.addLayer(intersection, {color: 'green'}, 'Intersection');
// Print the results
print('IOU:', iou);
print('IOU Percentage:', iouPercentage, '%');
print('Intersection Area:', intersectionPercentage, '% of total area', '(', intersectionAreaHectares, 'hectares )');
print('Union Area:', unionPercentage, '% of total area', '(', unionAreaHectares, 'hectares )');
print('SHP REFERENCE:', area1, 'square meters', '(', area1.divide(10000), 'hectares )');
print('SHP PREDICTION:', area2, 'square meters', '(', area2.divide(10000), 'hectares )');