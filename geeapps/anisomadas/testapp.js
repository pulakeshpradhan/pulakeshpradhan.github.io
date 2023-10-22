var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                77.44465125071315,
                13.065494034119828
              ],
              [
                77.44465125071315,
                12.823245106189762
              ],
              [
                77.72892249094752,
                12.823245106189762
              ],
              [
                77.72892249094752,
                13.065494034119828
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
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ffff */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[77.44465125071315, 13.065494034119828],
          [77.44465125071315, 12.823245106189762],
          [77.72892249094752, 12.823245106189762],
          [77.72892249094752, 13.065494034119828]]], null, false);
var palettes = require('users/gena/packages:colorbrewer').Palettes;
var utils = require('users/gena/packages:utils')
var text = require('users/gena/packages:text')
  var mask =   ee.Geometry.Polygon(
        [[[77.44465125071315, 13.065494034119828],
          [77.44465125071315, 12.823245106189763],
          [77.72892249094753, 12.823245106189763],
          [77.72892249094753, 13.065494034119828]]], null, false);
  var region =   ee.Geometry.Polygon(
        [[[77.44465125071315, 13.065494034119828],
          [77.44465125071315, 12.823245106189763],
          [77.72892249094753, 12.823245106189763],
          [77.72892249094753, 13.065494034119828]]], null, false);
  var geom =   ee.Geometry.Polygon(
        [[[77.44465125071315, 13.065494034119828],
          [77.44465125071315, 12.823245106189763],
          [77.72892249094753, 12.823245106189763],
          [77.72892249094753, 13.065494034119828]]], null, false);
  var col = ee.ImageCollection('COPERNICUS/S2')
  .filterDate('2015-08-01', '2019-12-30')
  .filterBounds(geom);
  var filterClouds = col.filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',2);
  var addNDVI = function(image)
    {return image.addBands(image.normalizedDifference(['B8', 'B4']));
    };
  var col = filterClouds;
  var col = col.map(addNDVI);
  var ndvi = col.select(['nd']);
col = ndvi.map(function(img) {
  var doy = ee.Date(img.get('system:time_start')).getRelative('day', 'year');
  return img.set('doy', doy);
});
var distinctDOY = col.filterDate('2018-01-01', '2020-01-01');
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
var plotNDVI = ui.Chart.image.series({
  imageCollection: ndvi.select('nd'),
  region: geom,
  reducer: ee.Reducer.mean(),
  scale: 100,
})
  .setOptions({
      title: 'Time series NDVI',
      hAxis: {'title': 'Date'},
      vAxis: {'title': 'Mean NDVI'},
      lineWidth: 3
    })
plotNDVI.style().set({
    position: 'bottom-right',
    width: '500px',
    height: '300px'
  });
Map.add(plotNDVI)
var label = ui.Label('Click a point on the chart to show the image for that date.');
Map.add(label);
plotNDVI.onClick(function(xValue, yValue, seriesName) {
    if (!xValue) return;
    var equalDate = ee.Filter.equals('system:time_start', xValue);
    var Click_d = ee.Image(ndvi.filter(equalDate).first()).clip(mask).select('nd'); 
    var C_to_roi = ee.Image(ndvi.filter(equalDate).first());
    var ndvi_layer = ui.Map.Layer(C_to_roi, {
      bands: ['nd'],
      max: 1,
      min: .2
    });
    Map.layers().reset([]);
    Map.addLayer(Click_d,visParams,'nd')
    label.setValue((new Date(xValue)).toUTCString());
  });