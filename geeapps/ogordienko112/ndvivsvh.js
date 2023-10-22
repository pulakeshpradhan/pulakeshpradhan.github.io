var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                33.6116054326788,
                46.632789877192565
              ],
              [
                33.70052602594052,
                46.64410469319771
              ],
              [
                33.69674947564755,
                46.664842377485336
              ],
              [
                33.60267904107724,
                46.65471018436978
              ]
            ]
          ],
          "geodesic": true,
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
        [[[33.6116054326788, 46.632789877192565],
          [33.70052602594052, 46.64410469319771],
          [33.69674947564755, 46.664842377485336],
          [33.60267904107724, 46.65471018436978]]]);
var roi = geometry 
// Filter the collection for the VV product from the descending track
var collectionVV = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterBounds(roi)
    .select(['VV']);
print(collectionVV);
// Filter the collection for the VH product from the descending track
var collectionVH = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
    .filterBounds(roi)
    .select(['VH']);
print(collectionVH);
//Let's centre the map view over our ROI
Map.centerObject(roi, 13);
// Adding the VV layer to the map
//Map.addLayer(VV, {min: -14, max: -7}, 'VV'); 
//Calculate the VH layer and add it
var VH = collectionVH.median();
Map.addLayer(VH, {min: -20, max: -7}, 'VH',false);
// Create a 3 band stack by selecting from different periods (months)
var VV1 = ee.Image(collectionVV.filterDate('2018-01-01', '2018-04-30').median()).clip(geometry);
var VV2 = ee.Image(collectionVV.filterDate('2018-05-01', '2018-08-31').median()).clip(geometry);
var VV3 = ee.Image(collectionVV.filterDate('2018-09-01', '2018-12-31').median()).clip(geometry);
//Add to map
Map.addLayer(VV1.addBands(VV2).addBands(VV3), {min: -12, max: -7}, 'Season composite',false);
var startDate = '2021-07-15';
var endDate = '2021-07-30';
var vh = ee.Image(collectionVH.filterDate(startDate, endDate).median()).clip(geometry);
Map.addLayer (vh,{bands: ['VH'], min: -20, max: 10, palette: [
      'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
      '056201', '004C00', '023B01', '012E01', '011301']},'vh');
/////////////////////
var img_collection = ee.ImageCollection('COPERNICUS/S2')
  .filterBounds(roi)
  .filterDate(startDate, endDate)
  .filter(ee.Filter.lt('CLOUD_COVERAGE_ASSESSMENT',15))
  .sort('CLOUD_COVERAGE_ASSESSMENT',false);
var image = img_collection
 .median()
 .clip(roi);
 var visparams = {bands: ['B4','B3','B2'],gamma:2, min:300, max:5000};
Map.addLayer (image,visparams,'sentinel',false);
function addNDVI(image) {
 var ndvi = image.normalizedDifference(['B8A', 'B4']).rename('NDVI');
 return image.addBands(ndvi);
}
var collection_with_ndvi = img_collection.map(addNDVI);
var imageNDVI = addNDVI(image);
var vis_collection = {bands: ['NDVI'], min: 0, max: 2, palette: [
      'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
      '056201', '004C00', '023B01', '012E01', '011301']};
Map.addLayer(imageNDVI,vis_collection, 'NDVI');
var inspector2 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {position:'top-left'}
});
inspector2.add(ui.Label('Кликни'));
Map.add(inspector2);
Map.style().set('cursor', 'crosshair');
Map.onClick(function(coords) {
  inspector2.clear();
  inspector2.style().set('shown', true);
  inspector2.add(ui.Label('Загрузка...', {color: 'gray'}));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var sampledPoint = vh.reduceRegion(ee.Reducer.mean(), point, 30);
  var computedValue = sampledPoint.get('VH');
  computedValue.evaluate(function(result) {
    inspector2.clear();
    inspector2.add(ui.Label({
      value: 'VH в этой точке: ' + result.toFixed(2),
      style: {stretch: 'vertical'}
    }));
    inspector2.add(ui.Button({
      label: 'Закрыть',
      onClick: function() {
        inspector2.style().set('shown', false);
      }
    }));
  });
});
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {position:'top-right'}
});
inspector.add(ui.Label('Кликни'));
Map.add(inspector);
Map.style().set('cursor', 'crosshair');
Map.onClick(function(coords) {
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Загрузка...', {color: 'gray'}));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var sampledPoint1 = imageNDVI.reduceRegion(ee.Reducer.mean(), point, 30);
  var computedValue1 = sampledPoint1.get('NDVI');
  computedValue1.evaluate(function(result) {
    inspector.clear();
    inspector.add(ui.Label({
      value: 'ndvi в этой точке: ' + result.toFixed(2),
      style: {stretch: 'vertical'}
    }));
    inspector.add(ui.Button({
      label: 'Закрыть',
      onClick: function() {
        inspector.style().set('shown', false);
      }
    }));
  });
});