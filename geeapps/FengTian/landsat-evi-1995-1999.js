var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            108.61695844409242,
            25.02322548198062
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([108.61695844409242, 25.02322548198062]);
// Configure the map.
Map.setCenter(0, 30, 2);
Map.style().set('cursor', 'crosshair');
Map.setOptions('HYBRID');
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '500px'}})
    .add(ui.Label('Click on the map to get EVI2 time series'));
// initialize variables used in the following iteration events
var i = 0;
var tileID_list = ee.List(['0']);
// Applies scaling factors.
function applyScaleFactors(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  // var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  return image.addBands(opticalBands, null, true);
              // .addBands(thermalBands, null, true);
}
var point_timeseries_chart = function(coords, map) {
  // number of point selected
  i++;
  // map the selected points on the map
  var coord_array = Object.keys(coords).map(function (key) { return coords[key]; });
  var point = ee.Geometry.Point(coord_array);
  // get the location of selected point
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  //load, clip and display Sentinel-2 EVI2 data
  var L8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
              .filterDate('2013-03-18', '2021-01-01')
              .filterBounds(point)
              .map(applyScaleFactors)
              .map(function(img){
                  var EVI2 = img.expression(
                        '2.5 * ((NIR  - RED ) / (NIR  + 2.4 * RED  + 1))', {
                          'NIR': img.select('SR_B5'), 'RED': img.select('SR_B4')
                        }).rename('EVI2');
                  return img.addBands(EVI2).select(['EVI2']);
                  // var cloudShadowBitMask = (1 << 3);
                  // var cloudsBitMask = (1 << 5);
                  // // Get the pixel QA band.
                  // var qa = img.select('pixel_qa');
                  // // Both flags should be set to zero, indicating clear conditions.
                  // var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                  //               .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
                  // return img.addBands(EVI2).updateMask(mask).select(['L8EVI2']);
              });
  var L7 = ee.ImageCollection('LANDSAT/LE07/C02/T1_L2')
            .filterDate('1999-05-28', '2021-01-01')
            .filterBounds(point)
            .map(applyScaleFactors)
            .map(function(image) {
                  var EVI2 = image.expression(
                      '2.5 * ((NIR  - RED ) / (NIR  + 2.4 * RED  + 1))', {
                      'NIR': image.select('SR_B4'), 'RED': image.select('SR_B3')
                      }).rename('EVI2');
                  return image.addBands(EVI2).select(['EVI2']);
                });
  var L5 = ee.ImageCollection('LANDSAT/LT05/C02/T1_L2')
            .filterDate('1985-01-01', '1999-06-24') /*2012-05-05 */
            .filterBounds(point)
            .map(applyScaleFactors)
            .map(function(image) {
                  var EVI2 = image.expression(
                      '2.5 * ((NIR - RED) / (NIR  + 2.4 * RED  + 1))', {
                      'NIR': image.select('SR_B4'), 'RED': image.select('SR_B3')
                      }).rename('EVI2');
                  return image.addBands(EVI2).select(['EVI2']);
                });
  var L4 = ee.ImageCollection('LANDSAT/LT04/C02/T1_L2')
            .filterDate('1985-01-01', '1993-06-24')
            .filterBounds(point)
            .map(applyScaleFactors)
            .map(function(image) {
                  var EVI2 = image.expression(
                      '2.5 * ((NIR  - RED ) / (NIR  + 2.4 * RED  + 1))', {
                      'NIR': image.select('SR_B4'), 'RED': image.select('SR_B3')
                      }).rename('EVI2');
                  return image.addBands(EVI2).select(['EVI2']);
                });
// Plot the time series data at the ROI.
  var chart = ui.Chart.image.series(L5.select('EVI2'), point, ee.Reducer.mean(), 30)
    .setOptions({
      title: location,
      lineWidth: 1,
      pointSize: 3,
  });
  panel.widgets().set(i+1, chart);
};
// Set a callback function for when the user clicks the map.
Map.onClick(point_timeseries_chart);
// Add the panel to the ui.root.
ui.root.add(panel);