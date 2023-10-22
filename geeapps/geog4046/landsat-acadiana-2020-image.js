var imageCollection = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA");
var geometry = ee.Geometry.Point([-92.71708984375002, 30.408127012993827]);
var locationImages = imageCollection.filterBounds(geometry);
var dateImages = locationImages.filterDate('2020-01-01', '2020-12-31');
var sortedImages = dateImages.sort('CLOUD_COVER');
var bestImage = sortedImages.first();
var displayOptions = {bands: ['B4', 'B3', 'B2'], max: 0.25};
Map.centerObject(bestImage, 8);
Map.addLayer(bestImage, displayOptions, 'Landsat true color');