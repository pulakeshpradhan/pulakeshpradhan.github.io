var departamentos = ee.FeatureCollection("users/erollero/Departamentos_INDEC_2015"),
    s2 = ee.ImageCollection("COPERNICUS/S2");
//Provincias
var total = ee.FeatureCollection("users/joseserafinig/Argentina/provincias");
var roi = total.filterMetadata('provincia','equals','Santa Fe');
var collection = ee.ImageCollection ("COPERNICUS/S2")
    .filterDate('2019-08-10','2019-09-27')
Map.setOptions("HYBRID")
 Map.centerObject(roi, 7);   
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = ee.Number(2).pow(10).int();
  var cirrusBitMask = ee.Number(2).pow(11).int();
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked and scaled data.
  return image.updateMask(mask).divide(10000);
}
// Map the cloud masking function over one year of data
var s2filtered = s2.filterDate('2019-08-05','2019-09-27')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds)
                  .select('B2', 'B3', 'B4', 'B8','B11');
var bands = ('B2', 'B3', 'B4', 'B8','B11');
var composite = s2filtered.median();
// Display the results.
var zona = composite.clip(roi)
Map.addLayer(zona, {bands: ['B8', 'B11', 'B4'], min: 0.081, max: 0.4}, 'RGB');
var addNDVI = function(image) {
  var ndvi2 = image.expression("(nir-red) / (nir+red)", {
    nir : image.select("B8"),
    red : image.select("B4")
  }).rename("ndvi")
  return ndvi2
}
var withNDVI = collection.map(addNDVI)
var maxNDVI = withNDVI.reduce(ee.Reducer.max())
var maxiNDVI = maxNDVI.clip(roi);
// Shared visualization parameters.
var visParams_ndvi = {
  min: 0,
  max: 1,
  palette: [
      'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
      '74A901', '66A000', '529400', '3E8601', '207401', '056201',
      '004C00', '023B01', '012E01', '011D01', '011301'
  ]
};
Map.addLayer(maxiNDVI,visParams_ndvi,'maxNDVI')
var threshold = maxiNDVI .gt(0.70)
var highNDVI = maxiNDVI .updateMask(threshold)
// Shared visualization parameters.
var visParams_hndvi = {
  min: 0.70,
  max: 0.82,
  palette: [
      '#ffff24','#ff9224','#db0000'
  ]
};
Map.addLayer(highNDVI,{palette: '#ff00ff'},"highNDVI")
Map.addLayer(highNDVI,visParams_hndvi,'NDVIgraduado')
var area = threshold.multiply(ee.Image.pixelArea()).reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry: roi,
  scale: 10,
  maxPixels:1e9,
  crs: "EPSG:4326" 
})
var result = (ee.Number(area.get('ndvi_max')).divide(1000000))
var table = ee.FeatureCollection([ee.Feature(null, {'area': result})])
Export.table.toDrive(table, "my_result")
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: departamentos,
  color: 1,
  width: 0.5
});
Map.addLayer(outline, {palette: 'ffffff'}, 'Deptos');
Export.image.toDrive({
  image:maxNDVI.clip(roi),
  description: "maxNDVI",
  region:roi,
  maxPixels: 1.0E13,
  scale:30
})
Export.image.toDrive({
  image:highNDVI.clip(roi),
  description: "highNDVI",
  region:roi,
  maxPixels: 1.0E13,
  scale:30
})
// Leyenda
var legend = ui.Panel({style: {position: 'bottom-right', padding: '8px 15px'}});
var loading = ui.Label('', {margin: '2px 0 4px 0'});
legend.add(loading);
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
 // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
legend.add(makeRow('ffff24', '0.70 - 0.75'));
legend.add(makeRow('ff9224', '0.75 - 0.80'));
legend.add(makeRow('db0000', '0.80 - 0.85'));
Map.add(legend);