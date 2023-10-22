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
var S2 = ee.ImageCollection('COPERNICUS/S2_SR')
            .filterDate('2022-03-01', '2022-09-10')
            .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
            //.filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 50)
            .filterBounds(geometry);
// Function to keep only vegetation and soil pixels
function keepFieldPixel(image) {
  // Select SCL layer
  var scl = image.select('SCL'); 
  // Select vegetation and soil pixels
  var veg = scl.eq(4); // 4 = Vegetation
  var soil = scl.eq(5); // 5 = Bare soils
  // Mask if not veg or soil
  var mask = (veg.neq(1)).or(soil.neq(1));
  return image.updateMask(mask);
}
// Apply custom filter to S2 collection
var S2 = S2.map(keepFieldPixel);
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask);
}
// Function to compute NDVI and add result as new band
var addNDVI = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B4']).rename('NDVI'));
};
// Add NDVI band to image collection
var S2 = S2.map(addNDVI);
// Extract NDVI band and create NDVI median composite image
var NDVI = S2.select(['NDVI']);
var NDVImed = NDVI.median(); //I just changed the name of this variable ;)
 var vis = {min: -1, max: 1,  palette: [
         'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
         '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
         '012E01', '011D01', '011301'
         ]};
var composite = NDVImed.visualize(vis);
var compositeLayer = ui.Map.Layer(composite).setName('NDVI');
var mapPanel = ui.Map();
var layers = mapPanel.layers();
layers.add(compositeLayer, '2019 Composite');
var inspectorPanel = ui.Panel({style: {width: '30%'}});
var intro = ui.Panel([
  ui.Label({
    value: 'NDVI Panel ',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click on your interest point to check the NDVI chart of this point. The time range is March/22 to September/22')
]);
inspectorPanel.add(intro);
var lon = ui.Label();
var lat = ui.Label();
inspectorPanel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
inspectorPanel.add(ui.Label('[Chart]'));
inspectorPanel.add(ui.Label('[Legend]'));
var generateChart = function (coords) {
  lon.setValue('lon: ' + coords.lon.toFixed(4));
  lat.setValue('lat: ' + coords.lat.toFixed(4));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'}, 'clicked location');
  mapPanel.layers().set(1, dot);
  var etChart = ui.Chart.image.series(NDVI, point, ee.Reducer.mean(), 500);
  etChart.setOptions({
    title: 'NDVI from Sentinel-2',
    vAxis: {title: 'NDVI'},
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
  inspectorPanel.widgets().set(2, etChart);
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
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'ATTENTION: this NDVI visualization is based on the median values in the time range',
  style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
inspectorPanel.widgets().set(3, legendPanel);
mapPanel.onClick(generateChart);
mapPanel.style().set('cursor', 'crosshair');
var initialPoint = ee.Geometry.Point(9.9133, 59.2854);
mapPanel.centerObject(initialPoint, 14);
ui.root.clear();
ui.root.add(ui.SplitPanel(inspectorPanel, mapPanel));
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});