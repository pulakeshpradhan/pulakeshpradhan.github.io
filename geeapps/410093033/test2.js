/**
 * @license
 * Copyright 2019 Google LLC.
 * SPDX-License-Identifier: Apache-2.0
 */
// Import an image and display it to the Map.
var img = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_044034_20140318');
var imgVis = {bands: ['B6', 'B5', 'B4'], min: 500, max: 3000};
Map.centerObject(img, 12);
Map.addLayer(img, imgVis, 'Image');
// Define a function to generate a download URL of the image for the
// viewport region. 
function downloadImg() {
  var viewBounds = ee.Geometry.Rectangle(Map.getBounds());
  var downloadArgs = {
    name: 'ee_image',
    crs: 'EPSG:5070',
    scale: 30,
    region: viewBounds.toGeoJSONString()
 };
 var url = img.getDownloadURL(downloadArgs);
 urlLabel.setUrl(url);
 urlLabel.style().set({shown: true});
}
// Add UI elements to the Map.
var downloadButton = ui.Button('Download viewport', downloadImg);
var urlLabel = ui.Label('Download', {shown: false});
var panel = ui.Panel([downloadButton, urlLabel]);
Map.add(panel);