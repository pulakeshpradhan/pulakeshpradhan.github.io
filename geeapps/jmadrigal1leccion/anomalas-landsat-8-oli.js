var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -100.29435720152708,
                17.279715441863875
              ],
              [
                -100.30534352965208,
                17.101291350093216
              ],
              [
                -100.03068532652708,
                16.993629330217093
              ],
              [
                -99.94279470152708,
                16.95947965893334
              ],
              [
                -99.92906179137083,
                17.195772577815337
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {
        "p1": 1
      },
      "color": "#d63000",
      "mode": "FeatureCollection",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-100.29435720152708, 17.279715441863875],
                  [-100.30534352965208, 17.101291350093216],
                  [-100.03068532652708, 16.993629330217093],
                  [-99.94279470152708, 16.95947965893334],
                  [-99.92906179137083, 17.195772577815337]]]),
            {
              "p1": 1,
              "system:index": "0"
            })]),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI"
        ],
        "min": -3,
        "max": 3,
        "palette": [
          "ff0000",
          "000000",
          "a8ffa7"
        ]
      }
    }) || {"opacity":1,"bands":["NDVI"],"min":-3,"max":3,"palette":["ff0000","000000","a8ffa7"]},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "NDVI"
        ],
        "min": -3,
        "max": 3,
        "palette": [
          "93ff80",
          "ffffff",
          "ff2d0c"
        ]
      }
    }) || {"opacity":1,"bands":["NDVI"],"min":-3,"max":3,"palette":["93ff80","ffffff","ff2d0c"]};
var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_32DAY_NDVI');
// Load MODIS EVI imagery.
// Define reference conditions from the first 10 years of data.
var reference = collection.filterDate('2013-01-01', '2019-12-31')
  // Sort chronologically in descending order.
  .sort('system:time_start', false);
// Compute the mean of the first 10 years.
var mean = reference.mean();
var series = collection.filterDate('2011-01-01', '2014-12-31').map(function(image) {
    return image.subtract(mean).set('system:time_start', image.get('system:time_start'));
});
// Display cumulative anomalies.
Map.setCenter(-100.138158,  17.099067, 9);
Map.addLayer(series.sum(),
    {min: -3, max: 3, palette: ['FF0000', '000000', '00FF00']}, 'ndvianomaly');
// Get the timestamp from the most recent image in the reference collection.
var time0 = reference.first().get('system:time_start');
// Use imageCollection.iterate() to make a collection of cumulative anomaly over time.
// The initial value for iterate() is a list of anomaly images already processed.
// The first anomaly image in the list is just 0, with the time0 timestamp.
var first = ee.List([
  // Rename the first band 'ndvi'.
  ee.Image(0).set('system:time_start', time0).select([0], ['ndvi'])
]);
// This is a function to pass to Iterate().
// As anomaly images are computed, add them to the list.
var accumulate = function(image, list) {
  // Get the latest cumulative anomaly image from the end of the list with
  // get(-1).  Since the type of the list argument to the function is unknown,
  // it needs to be cast to a List.  Since the return type of get() is unknown,
  // cast it to Image.
  var previous = ee.Image(ee.List(list).get(-1));
  // Add the current anomaly to make a new cumulative anomaly image.
  var added = image.add(previous)
    // Propagate metadata to the new image.
    .set('system:time_start', image.get('system:time_start'));
  // Return the list with the cumulative anomaly inserted.
  return ee.List(list).add(added);
};
// Create an ImageCollection of cumulative anomaly images by iterating.
// Since the return type of iterate is unknown, it needs to be cast to a List.
var cumulative = ee.ImageCollection(ee.List(series.iterate(accumulate, first)));
// Predefine the chart titles.
var title = {
  title: 'Cumulative NDVI anomaly over time',
  hAxis: {title: 'Time'},
  vAxis: {title: 'Cumulative NDVI anomaly'},
};