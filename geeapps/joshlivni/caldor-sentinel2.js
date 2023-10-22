var now = new Date();
var yesterday = new Date().setDate(now.getDate() - 2);
var geometry = ee.Geometry.Polygon([ [ [ -121, 38.5 ], [ -119.5, 38.5 ], [ -119.5, 39 ], [ -121, 39 ],[ -121, 38.5 ]] ]);
var area = ee.FeatureCollection(geometry);
var imagery = ee.ImageCollection('COPERNICUS/S2');
var imageCollection = ee.ImageCollection(imagery
    .filterDate(yesterday, now)
    .filterBounds(area));
print("S2 ", imageCollection);
var mos = imageCollection.mosaic().clip(area);
Map.centerObject(area);
var range = imageCollection.reduceColumns(ee.Reducer.minMax(), ["system:time_start"])
var start = ee.Date(range.get('min'))
var local = new Date(start.format(null, 'America/Los_Angeles').getInfo())
var vis = {bands: ['B12', 'B11', 'B4'], min: 1000, max: 3000, gamma: 1.5, opacity: .8};
Map.addLayer(mos, vis, '12 11 4: ' + local.toLocaleString());
var swir = {bands: ['B12', 'B8', 'B5'], min: 1100, max: 4000, gamma: 1.5, opacity: .8};
Map.addLayer(mos, swir, '12 8 5: ' + local.toLocaleString());
var bd = {
      'B02': mos.select('B2'),
      'B03': mos.select('B3'),
      'B04': mos.select('B4'),
      'B05': mos.select('B5'),
      'B08': mos.select('B8'),
      'B11': mos.select('B11'),
      'B12': mos.select('B12')
}
var swirmix_r = mos.expression('2.1 * B04 + 0.5 * B12', bd);
var swirmix_g = mos.expression('2.2 * B03 + 0.5 * B08', bd);
var swirmix_b = mos.expression('3.0 * B02', bd);
//Map.addLayer(mos, bands:, local.toLocaleString());