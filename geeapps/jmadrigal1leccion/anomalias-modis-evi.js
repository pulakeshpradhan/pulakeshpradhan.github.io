var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -102.41282919210381,
                19.228327368881075
              ],
              [
                -102.41282919210381,
                16.383544176607646
              ],
              [
                -98.28196981710381,
                16.383544176607646
              ],
              [
                -98.28196981710381,
                19.228327368881075
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
        [[[-102.41282919210381, 19.228327368881075],
          [-102.41282919210381, 16.383544176607646],
          [-98.28196981710381, 16.383544176607646],
          [-98.28196981710381, 19.228327368881075]]], null, false);
//Import the MODIS image collection MOD13A1 V6
 var collection = ee.ImageCollection('MODIS/006/MOD13Q1').select('EVI');
// Choose a reference period for your baseline
var reference = collection.filterDate('2001-01-01', '2020-12-31')
  .sort('system:time_start');
//Compute the mean EVI for the reference time frame
 var mean = reference.mean();
 //Define visualisation parameters for EVI
var vis = {min: 2000, max: 5000, palette: ['brown','yellow','green']};
// Map EVI spatially
Map.addLayer(mean, vis, 'Reference EVI');
//Create a collection of images that represent more recent conditions
 var recent = collection.filterDate('2011-01-01', '2020-12-31');
 // Calculate recent mean
 var meanRecent = recent.mean();
 // Map EVI spatially for recent years
 Map.addLayer(meanRecent, vis, 'Recent EVI');
 //Define a function to subtract the reference mean
var subtractmean = function(image) {
  return image.subtract(mean).copyProperties(image, ['system:time_start']);
};
//Create a variable called anomalies by mapping the subtract mean over the recent time-series
var anomalies = recent.map(subtractmean);
//Map the cumulative anomalies by summing them
Map.addLayer(anomalies.sum(), {
  min: -10000,
  max: 10000,
  palette: [
    'darkred','red','yellow','green','darkgreen'
  ]}, 'Cumulative anomaly');