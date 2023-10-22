var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -88.08227783196328,
                15.280517830774139
              ],
              [
                -88.08227783196328,
                13.717015143074837
              ],
              [
                -86.18164306633828,
                13.717015143074837
              ],
              [
                -86.18164306633828,
                15.280517830774139
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
        [[[-88.08227783196328, 15.280517830774139],
          [-88.08227783196328, 13.717015143074837],
          [-86.18164306633828, 13.717015143074837],
          [-86.18164306633828, 15.280517830774139]]], null, false);
//import gaul
var gaul = ee.FeatureCollection("FAO/GAUL/2015/level1");
//extract Ayutthaya province, Thailand, from gaul
var Ayutthaya = gaul.filterMetadata('ADM1_NAME','equals','Honduras');
// set vis parameter and add the boundary of Ayutthaya Province
var outline = ee.Image().byte().paint({
  featureCollection: Ayutthaya,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: ['black']}, 'Boundary')
// set target time period
var startDate = '2019-01-01'
var endDate = '2019-01-31'
// Import NO2 data from Sentinel
var collection = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
    .filterDate(startDate, endDate)
    .filter(ee.Filter.bounds(geometry))
var collection = collection
    .map(function(img) {return img.clip(geometry)
    .multiply(10000)
    .set('system:time_start',img
    .get('system:time_start')
    )})
Map.addLayer(collection.mean(), {}, 'Collection')
print(collection.first())
var scale = Map.getScale();
var values = collection.mean().sample({ 
region: geometry, 
scale: scale, 
numPixels: 500, 
tileScale:16,
geometries: true});
Map.addLayer(values, {palette: ['red']}, 'Samples')
var aoi = values.map(function(feature) {
  return ee.Feature(feature.geometry(), {'id': feature.id()})
});
print(aoi)
var triplets = collection.select('NO2_column_number_density').map(function(image) {
  return image.reduceRegions({
    collection: aoi,
    reducer: ee.Reducer.mean().setOutputs(['NO2_column_number_density']), 
    scale: 100,
    tileScale:16
  })
    .map(function(feature) {
    var NO2 = ee.List([feature.get('NO2_column_number_density'), -9999])
      .reduce(ee.Reducer.firstNonNull())
    return feature.set({'NO2_column_number_density': NO2, 'imageID': ee.String(image.id())})
    })
  }).flatten();
//print('triplets', triplets)
var format = function(table, rowId, colId) {
  var rows = table.distinct(rowId); 
  var joined = ee.Join.saveAll('matches').apply({
    primary: rows, 
    secondary: table, 
    condition: ee.Filter.equals({
      leftField: rowId, 
      rightField: rowId
    })
  });
  return joined.map(function(row) {
      var values = ee.List(row.get('matches'))
        .map(function(feature) {
          feature = ee.Feature(feature);
          return [feature.get(colId), feature.get('NO2_column_number_density')];
        });
      return row.select([rowId]).set(ee.Dictionary(values.flatten()));
    });
};
var results = format(triplets, 'id', 'imageID');
print('results',results)
var merge = function(table, rowId) {
  return results.map(function(feature) {
    var id = feature.get(rowId)
    var allKeys = feature.toDictionary().keys().remove(rowId)
    var substrKeys = ee.List(allKeys.map(function(val) { 
        return ee.String(val).slice(0,8)}
        ))
    var uniqueKeys = substrKeys.distinct()
    var pairs = uniqueKeys.map(function(key) {
      var matches = feature.toDictionary().select(allKeys.filter(ee.Filter.stringContains('item', key))).values()
      var val = matches.reduce(ee.Reducer.max())
      return [key, val]
    })
    return feature.select([rowId]).set(ee.Dictionary(pairs.flatten()))
  })
}
var merged = merge(results, 'id');
print(merged)
// Export NO2 time seriese to csv
Export.table.toDrive({
    collection: merged,
    description: 'NO2_time_series',
    folder: 'earthengine',
    fileNamePrefix: 'no2_time_series',
    fileFormat: 'CSV'
})
var comparison = 
  ee.Feature(ee.Geometry.Rectangle(100.61967, 14.35118, 100.68044, 14.3081));
//Map.addLayer(comparison)
//Map.addLayer(collection)
// Missing values in directly exported csv are available
// in chart except 20190124
var value_comparison = ui.Chart.image.doySeriesByYear(
    collection, 'NO2_column_number_density', 
    aoi, 
    ee.Reducer.mean(), 
    100, 
    ee.Reducer.mean(), 
    1, 
    180
).setOptions({
      interpolateNulls: false});
print(value_comparison);
Map.centerObject(aoi);
print(merged.getDownloadURL("csv"))
var panel = ui.Panel()
panel.add(ui.Label(merged.getDownloadURL("csv")));
Map.add(panel)