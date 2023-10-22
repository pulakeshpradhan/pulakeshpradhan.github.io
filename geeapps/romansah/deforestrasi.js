var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                121.24449035891875,
                0.8581683829641443
              ],
              [
                121.24449035891875,
                0.5945179275013589
              ],
              [
                121.52876159915313,
                0.5945179275013589
              ],
              [
                121.52876159915313,
                0.8581683829641443
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
        [[[121.24449035891875, 0.8581683829641443],
          [121.24449035891875, 0.5945179275013589],
          [121.52876159915313, 0.5945179275013589],
          [121.52876159915313, 0.8581683829641443]]], null, false),
    l4 = ui.import && ui.import("l4", "imageCollection", {
      "id": "LANDSAT/LT04/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LT04/C02/T1_L2"),
    l7 = ui.import && ui.import("l7", "imageCollection", {
      "id": "LANDSAT/LE07/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LE07/C02/T1_L2"),
    l9 = ui.import && ui.import("l9", "imageCollection", {
      "id": "LANDSAT/LC09/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LC09/C02/T1_L2"),
    l8 = ui.import && ui.import("l8", "imageCollection", {
      "id": "LANDSAT/LC08/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LC08/C02/T1_L2"),
    l5 = ui.import && ui.import("l5", "imageCollection", {
      "id": "LANDSAT/LT05/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LT05/C02/T1_L2");
// Sumber : https://www.youtube.com/watch?v=XakDiVVbpvE
Map.centerObject(roi,10);
// Year list to map
var yearList = [1990, 1995, 2000, 2005, 2010, 2015, 2020];
// Function to filter
function filterCol(col, roi, date){
  return col.filterDate(date[0], date[1]).filterBounds(roi);
}
// Composite function
function landsat457(roi, date){
  var col = filterCol(l4, roi, date).merge(filterCol(l5, roi, date));
  var image = col.map(cloudMaskTm).median().clip(roi);
  return image;
}
function landsat89(roi, date){
  var col = filterCol(l8, roi, date).merge(filterCol(l9, roi, date));
  var image = col.map(cloudMaskOli).median().clip(roi);
  return image;
}
// Cloud mask
function cloudMaskTm(image){
  var qa = image.select('QA_PIXEL');
  var dilated = 1 << 1;
  var cloud = 1 << 3;
  var shadow = 1 << 4;
  var mask = qa.bitwiseAnd(dilated).eq(0)
    .and(qa.bitwiseAnd(cloud).eq(0))
    .and(qa.bitwiseAnd(shadow).eq(0));
  return image.select(['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B7'], ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'])
    .updateMask(mask)
    .multiply(0.0000275)
    .add(-0.2);
}
function cloudMaskOli(image){
  var qa = image.select('QA_PIXEL');
  var dilated = 1 << 1;
  var cirrus = 1 << 2;
  var cloud = 1 << 3;
  var shadow = 1 << 4;
  var mask = qa.bitwiseAnd(dilated).eq(0)
    .and(qa.bitwiseAnd(cirrus).eq(0))
    .and(qa.bitwiseAnd(cloud).eq(0))
    .and(qa.bitwiseAnd(shadow).eq(0));
  return image.select(['SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7'], ['B2', 'B3', 'B4', 'B5', 'B6', 'B7'])
    .updateMask(mask)
    .multiply(0.0000275).add(-0.2);
}
// Generate image per year
var forestCol = ee.ImageCollection(yearList.map(function(year){
  var start = ee.Date.fromYMD(year - 1, 1, 1);
  var end = ee.Date.fromYMD(year + 1, 12, 31);
  var date = [start, end];
  // Conditional on landsat collection to use
  var landsat;
  if (year < 2014) {
    landsat = landsat457;
  } else {
    landsat = landsat89;
  }
  // Create an image composite
  var image = landsat(roi, date);
  // Show the image
  Map.addLayer(image, { min: [0.1, 0.05, 0], max: [0.4, 0.3, 0.15], bands: ['B5', 'B6', 'B2'] }, 'SR_' + year, false);
  // Bandmap
  var bandMap = { NIR: image.select('B5'), SWIR: image.select('B7') };
  // VI
  var vi = image.expression('(NIR - SWIR) / (NIR + SWIR)', bandMap).rename('VI');
  Map.addLayer(vi, { min: -1, max: 1, palette: ['blue', 'white', 'green']}, 'VI_' + year, false);
  // Forest
  var forest = vi.gt(0.7).selfMask().rename('forest').toUint16();
  Map.addLayer(forest, { palette: 'green' }, 'Forest_' + year, false);
  // Forest area
  var forestArea = forest.multiply(ee.Image.pixelArea().divide(10000)).rename('area');
  return forest.multiply(year).toUint16().addBands(forestArea).set('year', year, 'system:time_start', date);
}));
// Forest visual
var vis = {
  'forest_class_values': yearList,
  'forest_class_palette': ['4B0082', 'B22222', 'FF4500', 'FFD700', 'FFFF00', 'ADFF2F', '228B22']
};
// Forest year
var forestYear = forestCol.select('forest').max().set(vis).clip(roi);
Map.addLayer(forestYear, {}, 'Forest Year');
// Forest area chart
var forestAreaChart = ui.Chart.image.series(forestCol.select('area'), roi, ee.Reducer.sum(), 30, 'year')
  .setChartType('AreaChart')
  .setOptions({
    title: 'Forest area 1990 - 2020',
    vAxis: {
      title: 'Area (Ha)'
    },
    hAxis: {
      title: 'Year'
    }
  });
print(forestAreaChart);
// Deforestation legend
var labelList = ['1990 - 1995', '1995 - 2000', '2000 - 2005', '2005 - 2010', '2010 - 2015', '2015 - 2020', 'Current forest'];
// Make a legend
var legendPanel = ui.Panel([ ui.Label('Deforestation', { fontWeight: 'bold' }) ], ui.Panel.Layout.flow('vertical'), { position: 'bottom-left' });
Map.add(legendPanel);
// Add legend list
labelList.map(function(label, index){
  legendPanel.add(ui.Panel(
    [
      ui.Label('', { backgroundColor: vis.forest_class_palette[index], width: '30px', height: '20px' }),
      ui.Label(label, { height: '20px' })
    ],
  ui.Panel.Layout.flow('horizontal')
  ));
});