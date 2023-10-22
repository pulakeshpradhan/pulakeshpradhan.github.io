var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                76.0487166480135,
                10.913176813647421
              ],
              [
                76.0487166480135,
                10.5529234215361
              ],
              [
                76.724375827701,
                10.5529234215361
              ],
              [
                76.724375827701,
                10.913176813647421
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
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[76.0487166480135, 10.913176813647421],
          [76.0487166480135, 10.5529234215361],
          [76.724375827701, 10.5529234215361],
          [76.724375827701, 10.913176813647421]]], null, false);
var palettes = require('users/gena/packages:colorbrewer').Palettes;
var utils = require('users/gena/packages:utils')
var text = require('users/gena/packages:text')
  var geom =   ee.Geometry.Polygon(
        [[[76.0487166480135, 10.913176813647421],
          [76.0487166480135, 10.5529234215361],
          [76.724375827701, 10.5529234215361],
          [76.724375827701, 10.913176813647421]]], null, false);
function pix (image) {
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  var qa = image.select('pixel_qa');
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
  var col = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
.filterBounds(geom)
.filterDate('2018-01-01','2018-08-01').sort('CLOUD_COVER',false)
.map(pix);
  var SAVI = col.map(function(image) {
  return image.select().addBands(image.expression(
                        '(2 * NIR + 1 - sqrt(pow((2 * NIR + 1), 2) - 8 * (NIR - RED)) ) / 2', {
                        'NIR': image.select('B5'),
                        'RED': image.select('B4'),
                        'L': 0.5
                    }).float()).rename('SAVI')});
var distinctDOY = col.filterDate('2020-01-01', '2020-07-01');
print('distinctDOY')
var filter = ee.Filter.equals({leftField: 'doy', rightField: 'doy'});
var join = ee.Join.saveAll('doy_matches');
var joinCol = ee.ImageCollection(join.apply(distinctDOY, col, filter));
var comp = joinCol.map(function(img) {
  var doyCol = ee.ImageCollection.fromImages(
    img.get('doy_matches')
  );
  return doyCol.reduce(ee.Reducer.median());
});
var visParams = {
  min: .2,
  max: 1.0,
  palette: ['FFFFFF', 'FCD163', '99B718', '74A901', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'],
 };
var plotNDVI = ui.Chart.image.series(SAVI, geom, ee.Reducer.mean(), 500) .setChartType('ScatterChart');
  plotNDVI.setOptions({
    title: 'SAVI Over Time',
  vAxis: {title: 'SAVI'},
    hAxis: {title: 'date', format: 'yy-MM', gridlines: {count: 14}},
  }).setOptions({
      title: 'Time series SAVI',
      hAxis: {'title': 'Date'},
      vAxis: {'title': 'Mean SAVI'},
      lineWidth: 3})
plotNDVI.style().set({
    position: 'bottom-right',
    width: '500px',
    height: '300px'
  });
Map.add(plotNDVI)
var label = ui.Label('Click a point on the chart to show the image for that date.');
Map.add(label);
plotNDVI.onClick(function(xValue, yValue, seriesName) 
{
    if (!xValue) return;
    var equalDate = ee.Filter.equals('system:time_start', xValue);
    var Click_d = ee.Image(SAVI.filter(equalDate).first()).clip(geom).select('SAVI'); 
    var C_to_roi = ee.Image(SAVI.filter(equalDate).first());
    var ndvi_layer = ui.Map.Layer(C_to_roi, {
      bands: ['SAVI'],
      max: 1,
    });
    Map.layers().reset([]);
    Map.addLayer(Click_d,visParams,'SAVI')
    label.setValue((new Date(xValue)).toUTCString());
  });
  Map.setCenter(76.0487166480135, 10.5529234215361);
  print (SAVI)
  print (col)