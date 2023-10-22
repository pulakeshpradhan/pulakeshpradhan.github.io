var geometry1 = ui.import && ui.import("geometry1", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                36.13817394347108,
                48.197138735176445
              ],
              [
                36.13817394347108,
                47.45122779603227
              ],
              [
                37.38786876768983,
                47.45122779603227
              ],
              [
                37.38786876768983,
                48.197138735176445
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
        [[[36.13817394347108, 48.197138735176445],
          [36.13817394347108, 47.45122779603227],
          [37.38786876768983, 47.45122779603227],
          [37.38786876768983, 48.197138735176445]]], null, false),
    LSIB = ui.import && ui.import("LSIB", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
var Ukraine = LSIB.filter(ee.Filter.eq('country_na', 'Ukraine'));
var srtm = ee.Image("USGS/SRTMGL1_003"),
    geometry = /* color: #d63000 */ee.Geometry.Point([105.29296875, 19.137903466001216]);
Map.addLayer(geometry,{},'aoi',false)
/**
 * Function to mask clouds using the Sentinel-2 QA band
 * @param {ee.Image} image Sentinel-2 image
 * @return {ee.Image} cloud masked Sentinel-2 image
 */
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
var start = '2022-08-01';
var now = Date.now();
var dataset = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate(start, now)
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',2))
                  .map(maskS2clouds);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
//Map.centerObject(geometry1)
Map.addLayer(dataset.mean().clip(Ukraine), visualization, 'RGB');
var lines = ee.List.sequence(0, 2000, 10)
print(lines)
var contourlines = lines.map(function(line) {
  var mycontour = srtm
    .convolve(ee.Kernel.gaussian(5, 3))
    .subtract(ee.Image.constant(line)).zeroCrossing() 
    .multiply(ee.Image.constant(line)).toFloat();
  return mycontour.mask(mycontour);
})
var contourlines = ee.ImageCollection(contourlines).mosaic()
Map.addLayer(contourlines.clip(Ukraine), {min: 0, max: 3000, palette:['964B00']}, 'contours')
print(contourlines)
Map.centerObject(Ukraine,6)