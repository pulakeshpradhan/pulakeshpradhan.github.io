var studyArea = ui.import && ui.import("studyArea", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                102.64078660323914,
                12.373591513097583
              ],
              [
                102.64078660323914,
                12.327812536905247
              ],
              [
                102.70636124923523,
                12.327812536905247
              ],
              [
                102.70636124923523,
                12.373591513097583
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
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[102.64078660323914, 12.373591513097583],
          [102.64078660323914, 12.327812536905247],
          [102.70636124923523, 12.327812536905247],
          [102.70636124923523, 12.373591513097583]]], null, false);
// Load the necessary datasets
var s2 = ee.ImageCollection("COPERNICUS/S2_SR");
var l8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR");
// Define the study area
// Define the start and end dates
var startDate = ee.Date('2022-01-01');
var endDate = ee.Date('2023-03-31');
// Filter the images by date and study area
var s2_filtered = s2.filterDate(startDate, endDate).filterBounds(studyArea);
var l8_filtered = l8.filterDate(startDate, endDate).filterBounds(studyArea);
// Compute the NDVI for Sentinel-2 and Landsat 8
var ndvi_s2 = s2_filtered.map(function(image) {
  return image.normalizedDifference(['B8', 'B4']);
});
var ndvi_l8 = l8_filtered.map(function(image) {
  return image.normalizedDifference(['B5', 'B4']);
});
// Combine the NDVI images from Sentinel-2 and Landsat 8
var ndvi = ndvi_s2.merge(ndvi_l8);
// Define the function to compute the water stress index
var waterStressIndex = function(image) {
  var ndvi_image = ee.Image(image);
  var wsi = ndvi_image.expression(
    '1-((ndvi_image - ndvi_min)/(ndvi_max - ndvi_min))', {
      'ndvi_image': ndvi_image,
      'ndvi_min': 0.2,
      'ndvi_max': 0.8
    }
  ).rename('wsi');
  return wsi;
};
// Create palettes for display 
var pal = [
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'];
// Compute the water stress index for each image
var wsi = ndvi.map(waterStressIndex);
// Compute the mean water stress index for the study area
var mean_wsi = wsi.reduce(ee.Reducer.mean());
var viz = {min:0.8, max:1.5, palette:['blue','green', 'yellow', 'pink','red']};
// add the map
Map.addLayer(mean_wsi, viz);
Map.centerObject(studyArea,10);
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Mean WSI',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
 // Add the title to the panel
legend.add(legendTitle); 
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label(viz['max'])
    ],
  });
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
  image: legendImage, 
  params: {bbox:'0,0,10,100', dimensions:'25x200'},  
  style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label(viz['min'])
    ],
  });
legend.add(panel);
Map.add(legend);