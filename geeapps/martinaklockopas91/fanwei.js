var district = ui.import && ui.import("district", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                118.12901342495385,
                33.18322042058228
              ],
              [
                118.42564428432885,
                33.169427242073944
              ],
              [
                118.43697393520776,
                33.23147944450253
              ],
              [
                118.13553655727807,
                33.23176662093018
              ]
            ]
          ],
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
        [[[118.12901342495385, 33.18322042058228],
          [118.42564428432885, 33.169427242073944],
          [118.43697393520776, 33.23147944450253],
          [118.13553655727807, 33.23176662093018]]]),
    table = ui.import && ui.import("table", "table", {
      "id": "users/martinaklockopas91/chuzhou"
    }) || ee.FeatureCollection("users/martinaklockopas91/chuzhou");
//var district = ee.FeatureCollection("users/xxxxx/data/nj");
/*
var dsize = district.geometry();
print(dsize);
var district_geometry = district.geometry();*/
Map.centerObject(district, 10);
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
// Map the function over one year of data.
// Load Sentinel-2 TOA reflectance data.
var dataset = ee.ImageCollection('COPERNICUS/S2')
                  .filterBounds(district)
                  .filterDate('2021-03-01', '2021-06-01')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds);
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
Map.addLayer(dataset.median().clip(district), rgbVis, 'RGB');
//export data
var exportdataset =  ee.ImageCollection('COPERNICUS/S2')
                  .filterBounds(district)
                  .filterDate('2017-01-01', '2021-01-01')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds)
                  .select(['B4', 'B3', 'B2','B1', 'B5', 'B6','B7', 'B8', 'B8A','B9', 'B10', 'B11','B12']);
  var mosaic = exportdataset.mosaic();
  Export.image.toDrive({
      image:mosaic.clip(district),
      description:'fanwei',
      scale:10,
      maxPixels: 1e13,
      region:district,
      fileFormat: 'GeoTIFF',
      formatOptions: {
        cloudOptimized: true
      }
    });