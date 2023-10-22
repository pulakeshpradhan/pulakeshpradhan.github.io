var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                18.54116115372353,
                47.76553645671723
              ],
              [
                18.54116115372353,
                47.12284051072289
              ],
              [
                19.84304103653603,
                47.12284051072289
              ],
              [
                19.84304103653603,
                47.76553645671723
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
        [[[18.54116115372353, 47.76553645671723],
          [18.54116115372353, 47.12284051072289],
          [19.84304103653603, 47.12284051072289],
          [19.84304103653603, 47.76553645671723]]], null, false);
/**
 * Function to mask clouds based on the pixel_qa band of Landsat 8 SR data.
 * @param {ee.Image} image input Landsat 8 SR image
 * @return {ee.Image} cloudmasked Landsat 8 image
 */
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
var dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterDate('2020-01-01', '2020-12-31')
                  .map(maskL8sr);
var visParams = {
  bands: ['B10'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};
var budapest = dataset.median().clip(geometry)
Map.addLayer(budapest, visParams,'Budapest Image' )
Map.setCenter(19.1646, 47.46, 9);
//Map.addLayer(dataset.median(), visParams, 'All images');
Export.image.toDrive({
  image: budapest,
  description: 'Budapest_L8',
  scale: 100,
  region: geometry,
 folder : 'LDN',
maxPixels: 11945630520,
  crs : 'EPSG:3857'
});