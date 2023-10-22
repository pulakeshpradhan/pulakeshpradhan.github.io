var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            107.92513237385475,
            -6.8409184402421745
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #0b4a8b */ee.Geometry.Point([107.92513237385475, -6.8409184402421745]),
    Water = ui.import && ui.import("Water", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.07949696293574,
                -6.873884996209998
              ],
              [
                108.07949696293574,
                -6.885303499750449
              ],
              [
                108.09567604771357,
                -6.885303499750449
              ],
              [
                108.09567604771357,
                -6.873884996209998
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
      "properties": {
        "label": "Perairan"
      },
      "color": "#00ff00",
      "mode": "Feature",
      "shown": true,
      "locked": false
    }) || 
    /* color: #00ff00 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Feature(
        ee.Geometry.Polygon(
            [[[108.07949696293574, -6.873884996209998],
              [108.07949696293574, -6.885303499750449],
              [108.09567604771357, -6.885303499750449],
              [108.09567604771357, -6.873884996209998]]], null, false),
        {
          "label": "Perairan",
          "system:index": "0"
        }),
    Forest = ui.import && ui.import("Forest", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.08292129075751,
                -6.751908020391986
              ],
              [
                108.08292129075751,
                -6.770318519166556
              ],
              [
                108.10369231736884,
                -6.770318519166556
              ],
              [
                108.10369231736884,
                -6.751908020391986
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
      "properties": {
        "label": "Hutan"
      },
      "color": "#999900",
      "mode": "Feature",
      "shown": true,
      "locked": false
    }) || 
    /* color: #999900 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Feature(
        ee.Geometry.Polygon(
            [[[108.08292129075751, -6.751908020391986],
              [108.08292129075751, -6.770318519166556],
              [108.10369231736884, -6.770318519166556],
              [108.10369231736884, -6.751908020391986]]], null, false),
        {
          "label": "Hutan",
          "system:index": "0"
        }),
    City = ui.import && ui.import("City", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                107.92276520125142,
                -6.853134698144203
              ],
              [
                107.92276520125142,
                -6.854721870543856
              ],
              [
                107.92455691687337,
                -6.854721870543856
              ],
              [
                107.92455691687337,
                -6.853134698144203
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
      "properties": {
        "label": "Bangunan"
      },
      "color": "#009999",
      "mode": "Feature",
      "shown": true,
      "locked": false
    }) || 
    /* color: #009999 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Feature(
        ee.Geometry.Polygon(
            [[[107.92276520125142, -6.853134698144203],
              [107.92276520125142, -6.854721870543856],
              [107.92455691687337, -6.854721870543856],
              [107.92455691687337, -6.853134698144203]]], null, false),
        {
          "label": "Bangunan",
          "system:index": "0"
        }),
    polygon = ui.import && ui.import("polygon", "table", {
      "id": "projects/ee-glocalupi/assets/Sumedang"
    }) || ee.FeatureCollection("projects/ee-glocalupi/assets/Sumedang");
//Filter image collection for time window, spatial location, and cloud cover
var image = ee.Image(ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterBounds(roi)
    .filterDate('2016-05-01', '2016-06-30')
    .sort('CLOUD_COVER')
    .first());
//Add true-clour composite to map
Map.addLayer(image.clip(polygon), {bands: ['B4', 'B3', 'B2'],min:0, max: 3000}, 'True colour image');
//Choose bands to include and define feature collection to use
var subset = image.select('B[1-7]')
var samples = ee.FeatureCollection([Water,Forest,City]);
// Create the scatter chart
var Chart1 = ui.Chart.image.regions(
    subset, samples, ee.Reducer.mean(), 10, 'label')
        .setChartType('ScatterChart');
print(Chart1);
// Define customization options.
var plotOptions = {
  title: 'Landsat-8  Surface reflectance spectra',
  hAxis: {title: 'Wavelength (nanometers)'},
  vAxis: {title: 'Reflectance'},
  lineWidth: 1,
  pointSize: 4,
  series: {
    0: {color: 'blue'}, // Water
    1: {color: 'green'}, // Forest
    2: {color: 'red'}, // City
}};
// Define a list of Landsat-8 wavelengths for X-axis labels.
var wavelengths = [443, 482, 562, 655, 865, 1609, 2201];
// Create the chart and set options.
var Chart2 = ui.Chart.image.regions(
    subset, samples, ee.Reducer.mean(), 10, 'label', wavelengths)
        .setChartType('ScatterChart')
        .setOptions(plotOptions);
// Display the chart.
print(Chart2);