var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                4.645045794735978,
                63.24450844454025
              ],
              [
                4.645045794735978,
                57.78740162446715
              ],
              [
                13.609889544735978,
                57.78740162446715
              ],
              [
                13.609889544735978,
                63.24450844454025
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
        [[[4.645045794735978, 63.24450844454025],
          [4.645045794735978, 57.78740162446715],
          [13.609889544735978, 57.78740162446715],
          [13.609889544735978, 63.24450844454025]]], null, false);
var s2Sr = ee.ImageCollection('COPERNICUS/S2_SR');
var s2Clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY');
var START_DATE = ee.Date('2022-03-01');
var END_DATE = ee.Date('2022-09-10');
var MAX_CLOUD_PROBABILITY = 100;
function maskClouds(img) {
  var clouds = ee.Image(img.get('cloud_mask')).select('probability');
  var isNotCloud = clouds.lt(MAX_CLOUD_PROBABILITY);
  return img.updateMask(isNotCloud);
}
// The masks for the 10m bands sometimes do not exclude bad data at
// scene edges, so we apply masks from the 20m and 60m bands as well.
// Example asset that needs this operation:
// COPERNICUS/S2_CLOUD_PROBABILITY/20190301T000239_20190301T000238_T55GDP
function maskEdges(s2_img) {
  return s2_img.updateMask(
      s2_img.select('B8A').mask().updateMask(s2_img.select('B9').mask()));
}
// Filter input collections by desired data range and region.
var criteria = ee.Filter.and(
    ee.Filter.bounds(geometry), ee.Filter.date(START_DATE, END_DATE));
s2Sr = s2Sr.filter(criteria).map(maskEdges);
s2Clouds = s2Clouds.filter(criteria);
// Join S2 SR with cloud probability dataset to add cloud mask.
var s2SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({
  primary: s2Sr,
  secondary: s2Clouds,
  condition:
      ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
});
var s2CloudMasked =
    ee.ImageCollection(s2SrWithCloudMask).map(maskClouds).median();
var rgbVis = {min: 0, max: 3000, bands: ['B4', 'B3', 'B2']};
var composite = s2CloudMasked.visualize(rgbVis);
var compositeLayer = ui.Map.Layer(composite).setName('Without clouds');
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(compositeLayer, '2019 Composite');
var inspectorPanel = ui.Panel({style: {width: '30%'}});
var intro = ui.Panel([
  ui.Label({
    value: 'Cloud Panel ',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click on your interest point to check the NDVI chart of this point. The time range is March/22 to September/22')
]);
inspectorPanel.add(intro);
var lon = ui.Label();
var lat = ui.Label();
inspectorPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
inspectorPanel.add(ui.Label('[Chart]'));
var generateChart = function (coords) {
  lon.setValue('lon: ' + coords.lon.toFixed(4));
  lat.setValue('lat: ' + coords.lat.toFixed(4));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  mapPanel.layers().set(1, dot);
var cloudChart = ui.Chart.image.series(s2Clouds, point, ee.Reducer.mean(), 10);
  cloudChart.setOptions({
    title: 'Cloud probability from Sentinel-2',
    vAxis: {title: 'Cloud probability'},
    hAxis: {title: 'Date', format: 'dd-MM-yy', gridlines: {count: 7}},
    series: {
      0: {
        color: 'blue',
        lineWidth: 0,
        pointsVisible: true,
        pointSize: 2,
      },
    },
    legend: {position: 'right'},
  });
  inspectorPanel.widgets().set(2, cloudChart);
};
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: -1,
    max: 1,
    palette: palette,
  };
}
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var TITLE_STYLE = {
  fontWeight: '100',
  fontSize: '32px',
  padding: '10px',
  color: '#616161',
  backgroundColor: colors.transparent,
};
var PARAGRAPH_STYLE = {
  fontSize: '14px',
  fontWeight: '50',
  color: '#9E9E9E',
  padding: '8px',
  backgroundColor: colors.transparent,
};
  // Add the app description to the main panel
  var descriptionText =
      'This chart shows the probability of this point be clouded in each day with available Sentinel-2 image.' +
      'The RGB image IS SHOWED ONLY FOR VISUALIZATION and is based on the "median" RGB value of each pixel during the time range';
  var descriptionLabel = ui.Label(descriptionText, PARAGRAPH_STYLE);
mapPanel.onClick(generateChart);
mapPanel.style().set('cursor', 'crosshair');
inspectorPanel.add(descriptionLabel);
var initialPoint = ee.Geometry.Point(9.9133, 59.2854);
mapPanel.centerObject(initialPoint, 14);
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});