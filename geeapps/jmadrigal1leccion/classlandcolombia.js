var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -75.61829034838289,
                6.309048247684872
              ],
              [
                -75.61829034838289,
                6.152052677239715
              ],
              [
                -75.49744073900789,
                6.152052677239715
              ],
              [
                -75.49744073900789,
                6.309048247684872
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            -75.53795282396882,
            6.192671243017035
          ]
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        },
        {
          "type": "marker"
        }
      ],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      },
      {
        "type": "marker"
      }
    ] */
    ee.Geometry({
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -75.61829034838289,
                6.309048247684872
              ],
              [
                -75.61829034838289,
                6.152052677239715
              ],
              [
                -75.49744073900789,
                6.152052677239715
              ],
              [
                -75.49744073900789,
                6.309048247684872
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            -75.53795282396882,
            6.192671243017035
          ]
        }
      ],
      "coordinates": []
    }),
    pacifico = ui.import && ui.import("pacifico", "table", {
      "id": "users/jmadrigal1leccion/ElPacificook"
    }) || ee.FeatureCollection("users/jmadrigal1leccion/ElPacificook");
// Load a pre-computed Landsat composite for input.
var input = ee.Image('LANDSAT/LE7_TOA_1YEAR/2010');
// Define a region in which to generate a sample of the input.
var region = ee.Geometry.Rectangle(29.7, 30, 32.5, 31.7);
// Display the sample region.
Map.setCenter(-75.53795282396882,6.192671243017035, 12
);
// Make the training dataset.
var training = input.sample({
  region: region,
  scale: 10,
  numPixels: 5000
});
// Instantiate the clusterer and train it.
var clusterer = ee.Clusterer.wekaKMeans(15).train(training);
// Cluster the input using the trained clusterer.
var result = input.cluster(clusterer);
// Display the clusters with random colors.
Map.addLayer(result.randomVisualizer(), {}, 'clusters2010');
// Load a pre-computed Landsat composite for input.
var input = ee.Image('LANDSAT/LE7_TOA_1YEAR/2014');
// Define a region in which to generate a sample of the input.
var region = ee.Geometry.Rectangle(29.7, 30, 32.5, 31.7);
// Display the sample region.
Map.setCenter(-75.53795282396882,6.192671243017035, 12
);
// Make the training dataset.
var training = input.sample({
  region: region,
  scale: 30,
  numPixels: 5000
});
// Instantiate the clusterer and train it.
var clusterer = ee.Clusterer.wekaKMeans(15).train(training);
// Cluster the input using the trained clusterer.
var result = input.cluster(clusterer);
// Display the clusters with random colors.
Map.addLayer(result.randomVisualizer(), {}, 'clusters2014');
Map.addLayer(pacifico, {color: 'green'},'El Pacifico' )