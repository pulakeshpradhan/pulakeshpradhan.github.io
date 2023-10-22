var areaOfInterest = ui.import && ui.import("areaOfInterest", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -61.32601733071937,
                13.421826176017543
              ],
              [
                -61.32601733071937,
                13.076056960848028
              ],
              [
                -61.05959887368812,
                13.076056960848028
              ],
              [
                -61.05959887368812,
                13.421826176017543
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
      "color": "#ff0000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ff0000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-61.32601733071937, 13.421826176017543],
          [-61.32601733071937, 13.076056960848028],
          [-61.05959887368812, 13.076056960848028],
          [-61.05959887368812, 13.421826176017543]]], null, false),
    singleImage = ui.import && ui.import("singleImage", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -61.20242113931312,
            13.248111834240207
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#f5e800",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #f5e800 */
    /* shown: false */
    ee.Geometry.Point([-61.20242113931312, 13.248111834240207]),
    timeLapseAOI = ui.import && ui.import("timeLapseAOI", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -61.30129850067965,
                13.39594019623115
              ],
              [
                -61.30129850067965,
                13.113226813824042
              ],
              [
                -61.09599149384371,
                13.113226813824042
              ],
              [
                -61.09599149384371,
                13.39594019623115
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
      "color": "#d6c100",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d6c100 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-61.30129850067965, 13.39594019623115],
          [-61.30129850067965, 13.113226813824042],
          [-61.09599149384371, 13.113226813824042],
          [-61.09599149384371, 13.39594019623115]]], null, false);
  //User chooses how far back they are willing to go with data normal
    var monthsBackImages = 1.5; // 6 months seems like a good default
  //This will make their first geometry object be their Area Of Interest (AOI)
var txtBox = ui.Textbox({
  // value: Today01, // will be set later, in a callback
  style: {width : '90px'},
  onChange: function(text) {
    var period_former_end = text;
  }
});
var eeNow = ee.Date(Date.now());
// eeNow.format('YYYY-MM-dd').evaluate(function(dateStr){
//   txtBox.setValue(dateStr);
// });
// print(txtBox);
var imageBegin = eeNow.advance(-monthsBackImages, 'month');
imageBegin.format('YYYY-MM-dd').evaluate(function(dateStr){
  txtBox.setValue(dateStr);
});
print('Sentinel2 median data taken from ', txtBox, 'to the current date. A period of', monthsBackImages, 'months total');
function maskCloudAndShadows(image) {
  var cloudProb = image.select('MSK_CLDPRB');
  var snowProb = image.select('MSK_SNWPRB');
  var cloud = cloudProb.lt(5);
  var snow = snowProb.lt(3);
  var scl = image.select('SCL'); 
  var shadow = scl.eq(3); // 3 = cloud shadow
  var cirrus = scl.eq(10); // 10 = cirrus
  // Cloud probability less than 5% or cloud shadow classification
  var mask = (cloud.and(snow)).and(cirrus.neq(1)).and(shadow.neq(1));
  return image.updateMask(mask);}
///////////////////////////////////////////////////////////////////////////////////
//Most Recent Landsat Image
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
var Landsat = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
                  .filterBounds(singleImage)
                  .filterDate(imageBegin, '2021-12-31')
                  .map(maskL8sr)
                  // .sort('CLOUD_COVER_LAND')
                  // .filter(ee.Filter.lt('CLOUD_COVER_LAND', 20))
                  .first()
                  .clip(areaOfInterest);
var visParams = {
  bands: ['B4', 'B3', 'B2'],
  min: 0,
  max: 3000,
  gamma: 1.4,
};
Map.addLayer(Landsat
// .median()
,visParams, 'Most Recent Landsat 8 Image');
  ///////////////////Single Image/////////////////////////////////////////////////////////////////////
var Sentinel2a = ee.ImageCollection('COPERNICUS/S2_SR')
//Need to make this so it ties into the "Area of Interest" and doesn't cut anything off
                .filterBounds(singleImage)//geometry should be "Area of Interest"
                .filterDate(imageBegin, '2100-12-31')//It would be good to get code that puts in the current date as the hend bound
                // .sort('CLOUDY_PIXEL_PERCENTAGE')
                // .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
                // .map(maskCloudAndShadows)
                .first()
                .clip(areaOfInterest);
// print('# of Sentinel2 images used in Collection = ', Sentinel2a.size())
  Map.addLayer(Sentinel2a, {bands: ['B4', 'B3', 'B2'], min: 0, max: 2000}, 'Most Recent Sentinel2');
print(Sentinel2a,'Sentinel 2 Most Recent Image')
//////////////////////////////////////////Median////////////////////////////////////////////////////////////////
  var Sentinel2 = ee.ImageCollection('COPERNICUS/S2_SR')
  //Need to make this so it ties into the "Area of Interest" and doesn't cut anything off
                  .filterBounds(areaOfInterest)//geometry should be "Area of Interest"
                  .filterDate(imageBegin, '2090-09-30')//It would be good to get code that puts in the current date as the hend bound
                  .sort('CLOUDY_PIXEL_PERCENTAGE')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 100))
                  //Not sure if median is best or "first" or some other filter
                  .map(maskCloudAndShadows)
                  .median()
                  .clip(areaOfInterest)
;
  Map.centerObject(areaOfInterest , 10);
  Map.addLayer(Sentinel2, {bands: ['B4', 'B3', 'B2'], min: 0, max: 2000}, 'Sentinel2 Median Merge');
////////////////////////////////////// Time Lapse Section
  var Sentinel2Coll = ee.ImageCollection('COPERNICUS/S2_SR')
  //Need to make this so it ties into the "Area of Interest" and doesn't cut anything off
                  .filterBounds(timeLapseAOI)//geometry should be "Area of Interest"
                  .filterDate(imageBegin, '2100-12-31')//It would be good to get code that puts in the current date as the hend bound
                  // .sort('CLOUDY_PIXEL_PERCENTAGE')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 100))
                  //Not sure if median is best or "first" or some other filter
                  // .map(maskCloudAndShadows)
                  // .clip(areaOfInterest)
;
var visParams = {
  min: 0,
  max: 2000,
  // palette: [
  //   'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
  //   '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
  //   '012E01', '011D01', '011301'
  // ],
};
// Create RGB visualization images for use as animation frames.
var rgbVis = Sentinel2Coll.select('B4', 'B3', 'B2').map(function(img) {
  return img.visualize(visParams);
});
print(rgbVis)
// Map.addLayer(rgbVis.first(), {},'rgb')
// Define GIF visualization parameters.
var gifParams = {
  'region': timeLapseAOI,
  'dimensions': 350,
  'crs': 'EPSG:3857',
  'framesPerSecond': 3
};
// Print the GIF URL to the console.
print(rgbVis.getVideoThumbURL(gifParams));
var thumb = ui.Thumbnail({
  // Specifying a collection for "image" animates the sequence of images.
  image: rgbVis,
  params: gifParams,
  style: {
    position: 'bottom-right',
    width: '320px'
  }});
Map.add(thumb);
////////////////////////////////////////////////////////////////////////////////
// Export Median Image, specifying scale and region.
Export.image.toDrive({
  image: Sentinel2,
  description: 'MedianSentinel',
  scale: 10,
  region: areaOfInterest
});
// // Export Sentinel2 One Image, specifying scale and region.
// Export.image.toDrive({
//   image: Sentinel2,
//   description: 'SentinelOneImage',
//   scale: 10,
//   region: areaOfInterest
// });