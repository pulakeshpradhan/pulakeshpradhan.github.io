var geometry = ee.FeatureCollection("users/delaralfonso/DIFM/2019-20_UNL_Wheat_Trials");
var newDate = new Date();
var dateto = ee.Date(newDate);
var datefrom = dateto.advance(-120, 'day');
///////////////////////////////////////////////////////////
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
var L8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                .filterDate(datefrom ,dateto)
                .filter(ee.Filter.lt("CLOUD_COVER", 50))
                .map(maskL8sr)
                .filterBounds(geometry);
function getNDVIL8 (image){
  var red = ee.Image(image.select('B4'));
  var nir = ee.Image(image.select('B5'));
  var ndvi = (nir.subtract(red)).divide(nir.add(red)).rename('ndvi');
  return image.addBands(ndvi);
}
var collectionNDVIL8 = L8.map(getNDVIL8);
//print(collectionNDVIL8)
///////////////////////////////////////////////////////////
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
function maskS2cloudsSR(image) {
  var CLDPRB = image.select('MSK_CLDPRB');
  var mask = CLDPRB.lte(1)
  return image.updateMask(mask);
}
var S2 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate(datefrom,dateto)
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
                  .filterBounds(geometry)
                  .map(maskS2clouds)
                  .map(maskS2cloudsSR);
function getNDVIS2 (image){
  var red = ee.Image(image.select('B4'));
  var nir = ee.Image(image.select('B8'));
  var ndvi = (nir.subtract(red)).divide(nir.add(red)).rename('ndvi');
  return image.addBands(ndvi);
}
var collectionNDVIS2 = S2.map(getNDVIS2);
//print(collectionNDVIS2)
///////////////////////////////////////////////////////////
var collectionNDVI = collectionNDVIL8.merge(collectionNDVIS2)
print(collectionNDVI)
// Create a time series chart.
var NDVITimeSeries = ui.Chart.image.seriesByRegion(
    collectionNDVI, geometry, ee.Reducer.mean(), 'ndvi', 10, 'system:time_start', 'Id')
        .setChartType('LineChart')
        .setOptions({
          title: 'UNL 2020 Wheat - Trials NDVI Temporal Series (Landsat-8 and Sentinel-2 Combination)',
          curveType: 'function',
          vAxis: {title: 'NDVI'},
          lineWidth: 1,
          pointSize: 4,
          interpolateNulls: true,
          width:900,height:500
        })
        ;
//ui.root.clear();
ui.root.add(NDVITimeSeries);
/*ui.root.clear();
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '1000px',
  height: '400px',
  stretch:'both'
  //position: 'top-center'
});
Map.add(panel);
panel.add(NDVITimeSeries);
*/
var nbrParams = {min: 0, max: 0.5, palette: ['red', 'yellow', 'green']};
var aoi= geometry.geometry().bounds()
var NDVI = collectionNDVI.select(['ndvi']).max().clip(aoi)
print(NDVI)
Map.addLayer(NDVI,nbrParams, "maxNDVI COMBINED")
var empty = ee.Image().byte();
var outlinearea = empty.paint({
  featureCollection: geometry.geometry().buffer(1000),
  color: 1,
  width: 3
});
Map.addLayer(outlinearea, {palette: 'FF0000'}, 'AOI');
Map.centerObject(geometry,9)
var outlinetrial = empty.paint({
  featureCollection: geometry,
  color: 1,
  width: 3
});
Map.addLayer(outlinetrial, {}, 'Trials');