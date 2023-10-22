var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                109.99877159446659,
                -7.497323528993128
              ],
              [
                109.99877159446659,
                -8.234638557838938
              ],
              [
                110.93260948509159,
                -8.234638557838938
              ],
              [
                110.93260948509159,
                -7.497323528993128
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[109.99877159446659, -7.497323528993128],
          [109.99877159446659, -8.234638557838938],
          [110.93260948509159, -8.234638557838938],
          [110.93260948509159, -7.497323528993128]]], null, false),
    l8 = ui.import && ui.import("l8", "imageCollection", {
      "id": "LANDSAT/LC08/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LC08/C02/T1_L2"),
    l9 = ui.import && ui.import("l9", "imageCollection", {
      "id": "LANDSAT/LC09/C02/T1_L2"
    }) || ee.ImageCollection("LANDSAT/LC09/C02/T1_L2"),
    s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2_SR_HARMONIZED"
    }) || ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED"),
    gsw = ui.import && ui.import("gsw", "image", {
      "id": "JRC/GSW1_4/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_4/GlobalSurfaceWater"),
    gaul1 = ui.import && ui.import("gaul1", "table", {
      "id": "FAO/GAUL/2015/level1"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level1"),
    banjir = ui.import && ui.import("banjir", "table", {
      "id": "projects/ee-ramiqcom/assets/kuliah/banjir"
    }) || ee.FeatureCollection("projects/ee-ramiqcom/assets/kuliah/banjir");
// Function to get DIY AOI
function diy(){
  return gaul1.filter(ee.Filter.eq('ADM1_NAME', 'Daerah Istimewa Yogyakarta'))
    .first().geometry();
}
gsw = gsw.clip(diy());
// Function to zoom to diy
function myLocation(){
  Map.centerObject(diy(), 10.2);
}
myLocation();
// Function to start map
function resetMap(){
  // Clear map
  Map.clear();
  // Set map to gray
  Map.setOptions( 'Grey', {'Grey': [{
    featureType:'all',
    stylers: [{
      saturation:-100
  }]}]});
  // Change cursor
  Map.style().set({cursor: 'crosshair'});
  // Change map view
  Map.setControlVisibility({
    all: false,
    scaleControl: true,
    fullscreenControl: true,
    layerList: true,
  });
}
resetMap();
// Panel
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {width: '400px', padding: '20px', position: 'bottom-left'}
});
ui.root.add(panel);
// Label
var label = ui.Label({
  value: 'Special Region of Yogyakarta 2022 Flood Database',
  style: {color: 'navy', fontSize: '25px', fontWeight: 'bold', margin: '30px 10px'}
});
panel.add(label);
// Select date
var dateSlider = ui.DateSlider({
  start: '2022-01-01',
  end: Date.now(),
  value: Date.now() - 1209600000,
  period: 30,
  style: {stretch: 'horizontal'}
});
panel.add(dateSlider);
// Button
var button = ui.Button({
  label: 'Show flood extent',
  style: {stretch: 'horizontal'},
  onClick: function(){
    showMap();
  }
});
panel.add(button);
// Function to show map
function showMap(){
  resetMap();
  Map.addLayer(floodDate(), {palette: 'red'}, 'Flood');
  Map.addLayer(gsw.select('occurrence').gt(50).selfMask(), {palette: 'blue'}, 'Permanent water');
  Map.addLayer(floodEvent(), {color: 'green'}, 'Flood event');
  accurate();
  var legendTool = require('users/ramiqcom/ugm:tools/legend').legendDiscrete;
  var start = ee.Date(floodDate().get('system:time_start')).format('yyyy MMM dd');
  var end = ee.Date(floodDate().get('system:time_end')).format('yyyy MMM dd');
  ee.Dictionary({start: start, end: end}).evaluate(function(value){
    var title = 'Flood ' + value.start + ' - ' + value.end;
    var legend = legendTool(title, ['Flood', 'Permanent water', 'Flood event'], ['Red', 'Blue', 'Green'], 3, 'bottom-left');
    Map.add(legend);
  });
}
// Function to get flood extent
function floodExtent(){
  // Area of interest
  var aoi = diy();
  // Date filter
  var start = '2022-01-01';
  var end = '2022-12-31';
  // Bands of Sentinel-2
  var s2BandsOld = ['B1', 'B2', 'B3', 'B4', 'B8', 'B11', 'B12'];
  var landsatBandsOld = ['SR_B1', 'SR_B2', 'SR_B3', 'SR_B4', 'SR_B5', 'SR_B6', 'SR_B7'];
  var bandsNew = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
  // Function to cloud mask + change bands + scaling
  function preProcessS2(image){
    var scl = image.select('SCL');
    var mask = scl.eq(3).or(scl.gte(7).and(scl.lte(10)));
    var masked = image.updateMask(mask.eq(0));
    var newImage = masked.select(s2BandsOld, bandsNew).multiply(0.0001);
    return image.select(null).addBands(newImage).toFloat();
  }
  function preProcessLandsat(image){
    var qa = image.select('QA_PIXEL');
    var dilated = 1 << 1;
    var cirrus = 1 << 2;
    var cloud = 1 << 3;
    var shadow = 1 << 4;
    var mask = qa.bitwiseAnd(dilated).eq(0)
      .and(qa.bitwiseAnd(cirrus).eq(0))
      .and(qa.bitwiseAnd(cloud).eq(0))
      .and(qa.bitwiseAnd(shadow).eq(0));
    var masked = image.updateMask(mask);
    var newImage = masked.select(landsatBandsOld, bandsNew).multiply(0.0000275).add(-0.2);
    return image.select(null).addBands(newImage).toFloat();
  }
  // Filter Landsat and Sentinel images
  var s2Images = s2.filterBounds(aoi).filterDate(start, end).map(preProcessS2);
  var landsatImages = l8.merge(l9).filterBounds(aoi).filterDate(start, end).map(preProcessLandsat);
  // Merged collection
  var images = s2Images.merge(landsatImages).sort('system:time_start');
  // Date list
  var dateList = [];
  for (var i = 1641013200000; i <= 1672462800000; i += 2629743000){
    dateList.push(i);
  }
  // Create weekly median
  var weeklyMedian = ee.ImageCollection(dateList.map(function(date){
    var start = date;
    var end = start + 2629743000;
    var filterDate = images.filterDate(start, end).median().clip(aoi)
      .set('system:time_start', start, 'system:time_end', end);
    return filterDate;
  })).filterDate(1641013200000, 1672462800000);
  // Function to add MNDWI band
  function waterAnalysis(image){
    var mndwi = image.expression(
      '(GREEN - SWIR) / (GREEN + SWIR)',
      {GREEN: image.select('B3'), SWIR: image.select('B7')}
    ).rename('MNDWI');
    var water = mndwi.gt(0).rename('Water').selfMask();
    return image.addBands([mndwi, water]);
  }
  // Images with water
  var imagesWater = weeklyMedian.map(waterAnalysis);
  // Flood analysis
  function floodAnalysis(image){
    var permanent = gsw.select('occurrence').gte(90).rename('Permanent_water').selfMask();
    var mask = gsw.select('occurrence').lt(90);
    var water = image.select('Water');
    var flood = water.updateMask(mask).rename('Flood');
    return image.addBands([permanent, flood]);
  }
  // Images with flood analysis
  var imagesFlood = imagesWater.map(floodAnalysis).select('Flood');
  return imagesFlood;
}
// Function to get flood extent at certain date
function floodDate(){
  var images = floodExtent();
  var start = dateSlider.getValue()[0];
  var end = dateSlider.getValue()[1];
  var image = images.filterDate(start, end).first();
  return image;
}
// Function to get data banjir
function floodEvent(){
  var data = banjir.map(function(feat){
    return feat.set('system:time_start', feat.get('Tanggal'));
  });
  var start = floodDate().get('system:time_start');
  var end = floodDate().get('system:time_end');
  return data.filterDate(start, end).map(function(feat){
    return feat.buffer(1000);
  });
}
// Correct mapping flood
function accurate(){
  var image = floodDate();
  var data = floodEvent();
  var dataSize = data.size();
  var reduce = image.reduceRegions({
    collection: data,
    reducer: ee.Reducer.max(),
    scale: 30,
    crs: 'EPSG:4326'
  });
  var correct = reduce.filter(ee.Filter.gte('max', 1));
  var correctSize = correct.size();
  var accuracy = correct.size().divide(data.size()).multiply(100).round();
  var title = ui.Label({
    value: 'Validation',
    style: {fontWeight: 'bold'}
  });
  ee.Dictionary({accuracy: accuracy, correct: correctSize, data: dataSize})
    .evaluate(function(value){
      var accuracyLabel = ui.Label({
        value: 'Accuracy: ' + value.accuracy + '%',
        style: {fontWeight: 'bold', color: 'green'}
      });
      var correctLabel = ui.Label('Flood detected: ' + value.correct);
      var eventLabel = ui.Label('Flood event: ' + value.data);
      var accuracyPanel = ui.Panel({
        layout: ui.Panel.Layout.flow('vertical', true),
        widgets: [title, correctLabel, eventLabel, accuracyLabel],
        style: {position: 'bottom-left'}
      });
      Map.add(accuracyPanel);
    });
}