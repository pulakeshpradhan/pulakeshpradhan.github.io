var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -122.21894165924931,
                37.51654146894642
              ],
              [
                -122.21894165924931,
                37.47936109167407
              ],
              [
                -122.16092011383915,
                37.47936109167407
              ],
              [
                -122.16092011383915,
                37.51654146894642
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-122.21894165924931, 37.51654146894642],
          [-122.21894165924931, 37.47936109167407],
          [-122.16092011383915, 37.47936109167407],
          [-122.16092011383915, 37.51654146894642]]], null, false);
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
  var viewBounds = geometry;
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