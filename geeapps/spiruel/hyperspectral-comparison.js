var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                0.016773896999628946,
                52.128890098000674
              ],
              [
                0.016773896999628946,
                52.04070469155915
              ],
              [
                0.18294210989025395,
                52.04070469155915
              ],
              [
                0.18294210989025395,
                52.128890098000674
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[0.016773896999628946, 52.128890098000674],
          [0.016773896999628946, 52.04070469155915],
          [0.18294210989025395, 52.04070469155915],
          [0.18294210989025395, 52.128890098000674]]], null, false);
var s2 = ee.Image('COPERNICUS/S2_SR/20190628T105621_20190628T110225_T30UYC')
            .select(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9', 'B11', 'B12']);
Map.addLayer(s2, {bands: ['B4', 'B3', 'B2'], max: 4000}, 'S2')
var hyperion = ee.ImageCollection('EO1/HYPERION')
                  .filterBounds(geometry);
var rgb = hyperion.select(['B050', 'B023', 'B015']);
var rgbVis = {
  min: 1000.0,
  max: 14000.0,
  gamma: 2.5,
};
Map.addLayer(rgb.median(), rgbVis, 'Hyperion_RGB');
var s2_gross1 = ee.Image('COPERNICUS/S2_SR/20191105T101119_20191105T101115_T32TPN');
Map.addLayer(s2_gross1, {bands: ['B4', 'B3', 'B2'], max: 4000}, 's2_gross1')
Map.centerObject(s2);
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'SENSE Team 1 - Hyperspectral-Multispectral Spectra Comparison',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Click a point on the map to inspect.')
]);
panel.add(intro);
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  Map.layers().set(1, dot);
  var wavelengths = [443, 490, 560, 665, 705, 740, 783, 842, 865, 945, 1610, 2190];
  var spectraChart = ui.Chart.image.regions(s2, point, ee.Reducer.mean(), 20, 'label', wavelengths);
  spectraChart.setOptions({
    title: 'Sentinel 2 spectra',
    hAxis: {title: 'Wavelength / nm',
      viewWindowMode:'explicit',
      viewWindow: {
        max:0,
        min:2400
      },
    },
    vAxis: {title: 'Reflectance'},
  });
  panel.widgets().set(2, spectraChart);
  var hyp_wavelengths = [426.8200, 436.9900, 447.1700, 457.3400, 467.5200, 477.6900, 487.8700, 498.0400, 508.2200, 518.3900, 528.5700, 538.7400, 548.9200, 559.0900, 569.2700, 579.4500, 589.6200, 599.8000, 609.9700, 620.1500, 630.3200, 640.5000, 650.6700, 660.8500, 671.0200, 681.2000, 691.3700, 701.5500, 711.7200, 721.9000, 732.0700, 742.2500, 752.4300, 762.6000, 772.7800, 782.9500, 793.1300, 803.3000, 813.4800, 823.6500, 833.8300, 844.0000, 854.1800, 864.3500, 874.5300, 884.7000, 894.8800, 905.0500, 915.2300, 925.4100, 912.4500, 922.5400, 932.6400, 942.7300, 952.8200, 962.9100, 972.9900, 983.0800, 993.1700, 1003.300,1013.300, 1023.400,1033.490,1043.590, 1053.690, 1063.790, 1073.890, 1083.990, 1094.090, 1104.190, 1114.190, 1124.280,1134.3800, 1144.4800, 1154.5800, 1164.6800, 1174.7700, 1184.8700, 1194.9700, 1205.0700, 1215.1700, 1225.1700, 1235.2700, 1245.3600, 1255.4600, 1265.5600, 1275.6600, 1285.7600, 1295.8600, 1305.9600, 1316.0500, 1326.0500, 1336.1500, 1346.2500, 1356.3500, 1366.4500, 1376.5500, 1386.6500, 1396.7400, 1406.8400, 1416.9400, 1426.9400, 1437.0400, 1447.1400, 1457.2300, 1467.3300, 1477.4300, 1487.5300, 1497.6300, 1507.7300, 1517.8300, 1527.9200, 1537.9200, 1548.0200, 1558.1200, 1568.2200, 1578.3200, 1588.4200, 1598.5100, 1608.6100, 1618.7100, 1628.8100, 1638.8100, 1648.9000, 1659.0000, 1669.1000, 1679.2000, 1689.3000, 1699.4000, 1709.5000, 1719.6000, 1729.7000, 1739.7000, 1749.7900, 1759.8900, 1769.9900, 1780.0900, 1790.1900, 1800.2900, 1810.3800, 1820.4800, 1830.5800, 1840.5800, 1850.6800, 1860.7800, 1870.8700, 1880.9800, 1891.0700, 1901.1700, 1911.2700, 1921.3700, 1931.4700, 1941.5700, 1951.5700, 1961.6600, 1971.7600, 1981.8600, 1991.9600, 2002.0600, 2012.1500, 2022.2500, 2032.3500, 2042.4500, 2052.4500, 2062.5500, 2072.6500, 2082.7500, 2092.8400, 2102.9400, 2113.0400, 2123.1400, 2133.2400, 2143.3400, 2153.3400, 2163.4300, 2173.5300, 2183.6300, 2193.7300, 2203.8300, 2213.9300, 2224.0300, 2234.1200, 2244.2200, 2254.2200, 2264.3200, 2274.4200, 2284.5200, 2294.6100, 2304.7100, 2314.8100, 2324.9100, 2335.0100, 2345.1100, 2355.2100, 2365.2000, 2375.3000, 2385.4000, 2395.5000]
  var spectraChart_hyp = ui.Chart.image.regions(ee.ImageCollection('EO1/HYPERION').filterBounds(geometry).first(), point, ee.Reducer.mean(), 20, 'label', hyp_wavelengths);
  spectraChart_hyp.setOptions({
    title: 'Hyperion Spectra',
    hAxis: {title: 'Wavelength / nm',
          viewWindowMode:'explicit',
          viewWindow: {
            max:0,
            min:2400
          },
    },
    vAxis: {title: 'Reflectance'},
  });
  panel.widgets().set(3, spectraChart_hyp);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);
//var collection = ee.ImageCollection('COPERNICUS/S2_SR').filter(ee.Filter.date('2019-11-19', '2019-11-25')).filterBounds(Map.getBounds(true))
//print(collection.first().id())
//Map.addLayer(collection, {bands: ['B4', 'B3', 'B2'], max: 4000}, 'S2')
print(hyperion.first());
  var vegetation1 = /* color: #d6d410 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[0.2894539390369344, 52.13404516788626],
                  [0.28722234113654377, 52.13299147005391],
                  [0.28996892316779377, 52.13288609889994]]]),
            {
              "landcover": 1,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[0.23555226667365314, 52.13994541519338],
                  [0.23332066877326252, 52.139313283220986],
                  [0.23572392805060627, 52.13825970999687]]]),
            {
              "landcover": 1,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[0.2772052463427377, 52.089440656606044],
                  [0.2746303256884408, 52.08828042746419],
                  [0.2773769077196908, 52.08764756248959]]]),
            {
              "landcover": 1,
              "system:index": "2"
            })]),
    vegetation2 = /* color: #98ff00 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[0.24115635718258144, 52.09819414028424],
                  [0.23978306616695644, 52.09713959469376],
                  [0.24270130957515956, 52.09713959469376]]]),
            {
              "landcover": 2,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[0.26450230444820644, 52.06675798269086],
                  [0.26467396582515956, 52.06464738053006],
                  [0.26673390234859706, 52.065069508942116]]]),
            {
              "landcover": 2,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[0.2306850131884408, 52.036355686997275],
                  [0.22811009253414394, 52.0346660639927],
                  [0.2327449497118783, 52.034138043708246]]]),
            {
              "landcover": 2,
              "system:index": "2"
            })]),
    vegetation3 = /* color: #0b4a8b */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[0.25643421973140956, 52.05820942785336],
                  [0.25643421973140956, 52.05609842169528],
                  [0.25918080176265956, 52.05588731559287]]]),
            {
              "landcover": 3,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[0.21094395483883144, 52.06802429610828],
                  [0.20819737280758144, 52.0673911438882],
                  [0.2099139865771127, 52.066019283280966]]]),
            {
              "landcover": 3,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[0.1833064731493783, 52.00255109309151],
                  [0.1831348117724252, 52.00096587591835],
                  [0.1853664096728158, 52.00086019277735]]]),
            {
              "landcover": 3,
              "system:index": "2"
            })]),
    building = /* color: #ffc82d */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[0.23815228308590175, 52.0124310145625],
                  [0.23729397620113613, 52.01169141683211],
                  [0.23883892859371425, 52.01169141683211]]]),
            {
              "landcover": 4,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[0.3252262288556995, 52.274756349609305],
                  [0.32402459921702764, 52.273705983114816],
                  [0.32556955160960577, 52.273705983114816]]]),
            {
              "landcover": 4,
              "system:index": "1"
            })]),
    geometry = 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[0.13586706606039556, 52.194532861217304],
          [0.13586706606039556, 52.02923306137657],
          [0.43799108949789556, 52.02923306137657],
          [0.43799108949789556, 52.194532861217304]]], null, false);
//Man CHEN sentinel 2 classification
//Calculate NDVI and create an image that contains all Sentinel 2 bands and NDVI
//var ndviS2 = s2.normalizedDifference(['B8', 'B4']).rename('NDVI');
//var compositeS2F = ee.Image.cat(s2,ndviS2);
//Merge Feature Collections(training data)
var trainingSample = vegetation1.merge(vegetation2).merge(vegetation3).merge(building);
//Define the SENTINEL-2 bands to train your data
var bandsS2 = ['B1','B2', 'B3', 'B5', 'B6', 'B7', 'B8'];
//var bandsS2 = ['NDVI' ];
var trainingS2 = s2.select(bandsS2).sampleRegions({
collection: trainingSample,
properties: ['landcover'],
scale: 30
});
//Train the classifier
var classifierS2 = ee.Classifier.randomForest().train({
features: trainingS2,
classProperty: 'landcover',
inputProperties: bandsS2
});
var classifierS2 = ee.Classifier.randomForest({
  numberOfTrees: 40,
  variablesPerSplit: 4
  })
    .train(trainingS2, 'landcover');
//Run the Classifier
var classifiedS2 = s2.select(bandsS2).classify(classifierS2,'classification');
//Display the Classification
Map.addLayer(classifiedS2,{min: 1, max: 4, palette: ['1667fa', 'c9270d', 'cf7b68', 'ee9a1c']}, 'Sentinel-2 Classification', false);
var aircraft = ee.Image('users/spiruel/f180b08_mapped_osng');
var rgb = aircraft.select(['b50', 'b23', 'b15']);
var rgbVis = {
  gamma: 5,
};
Map.addLayer(rgb, rgbVis, 'Aircraft RGB');
var prisma = ee.Image('users/spiruel/vnir_proj_');
var prisma_rgb = prisma.select(['b50', 'b23', 'b15']);
Map.addLayer(prisma_rgb, {}, 'Prisma VNIR');