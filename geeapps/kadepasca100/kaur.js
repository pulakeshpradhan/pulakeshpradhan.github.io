var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            103.34869916931156,
            -4.792990508568592
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": true
    }) || 
    /* color: #d63000 */
    /* locked: true */
    ee.Geometry.Point([103.34869916931156, -4.792990508568592]),
    kaur = ui.import && ui.import("kaur", "table", {
      "id": "users/kadepasca100/kaur"
    }) || ee.FeatureCollection("users/kadepasca100/kaur"),
    kaur_big = ui.import && ui.import("kaur_big", "table", {
      "id": "projects/kaur1704/assets/1704_BIG"
    }) || ee.FeatureCollection("projects/kaur1704/assets/1704_BIG"),
    airdingin = ui.import && ui.import("airdingin", "table", {
      "id": "users/kadepasca100/Batas_AirDingin"
    }) || ee.FeatureCollection("users/kadepasca100/Batas_AirDingin");
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
// Map the function over one month of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var dataset_18 = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2018-01-01', '2018-12-31')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds)
                  .filterBounds(kaur);
var dataset_19 = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2019-01-01', '2019-12-31')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds)
                  .filterBounds(kaur);
var dataset_20 = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2020-01-01', '2020-12-31')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds)
                  .filterBounds(kaur);
var dataset_21 = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2021-01-01', '2021-12-31')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds)
                  .filterBounds(kaur);
var dataset_22 = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate('2022-01-01', '2022-12-31')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                  .map(maskS2clouds) 
                  .filterBounds(kaur);
var rgbVis = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
Map.setCenter(103.348108,-4.793669, 18);
Map.addLayer(airdingin,{},'Batas Desa');
//Map.setCenter(103.348785, -4.7928856, 15);
//Map.addLayer(dataset_18.median(), rgbVis, '2018');
//Map.addLayer(dataset_19.median(), rgbVis, '2019');
//Map.addLayer(dataset_20.median(), rgbVis, '2020');
//Map.addLayer(dataset_21.median(), rgbVis, '2021');
//Map.addLayer(dataset_22.median(), rgbVis, '2022')