var LOCATION1 = ui.import && ui.import("LOCATION1", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                131.40354192879337,
                -12.059466941563407
              ],
              [
                131.40354192879337,
                -12.236682002388914
              ],
              [
                131.75510442879337,
                -12.236682002388914
              ],
              [
                131.75510442879337,
                -12.059466941563407
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff0000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ff0000 */ee.Geometry.Polygon(
        [[[131.40354192879337, -12.059466941563407],
          [131.40354192879337, -12.236682002388914],
          [131.75510442879337, -12.236682002388914],
          [131.75510442879337, -12.059466941563407]]], null, false),
    LOCATION2 = ui.import && ui.import("LOCATION2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                130.27744329598085,
                -12.016488006245638
              ],
              [
                130.27744329598085,
                -12.14540412933437
              ],
              [
                130.61801946785585,
                -12.14540412933437
              ],
              [
                130.61801946785585,
                -12.016488006245638
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#f6ff12",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #f6ff12 */ee.Geometry.Polygon(
        [[[130.27744329598085, -12.016488006245638],
          [130.27744329598085, -12.14540412933437],
          [130.61801946785585, -12.14540412933437],
          [130.61801946785585, -12.016488006245638]]], null, false),
    LOCATION3 = ui.import && ui.import("LOCATION3", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                130.11264837410585,
                -11.193221972505894
              ],
              [
                130.11264837410585,
                -11.311748444967996
              ],
              [
                130.33237493660585,
                -11.311748444967996
              ],
              [
                130.33237493660585,
                -11.193221972505894
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#10c2ff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #10c2ff */ee.Geometry.Polygon(
        [[[130.11264837410585, -11.193221972505894],
          [130.11264837410585, -11.311748444967996],
          [130.33237493660585, -11.311748444967996],
          [130.33237493660585, -11.193221972505894]]], null, false),
    geom = ui.import && ui.import("geom", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                130.0165180030121,
                -11.112498551968637
              ],
              [
                130.0165180030121,
                -12.322679220927057
              ],
              [
                132.5433734717621,
                -12.322679220927057
              ],
              [
                132.5433734717621,
                -11.112498551968637
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[130.0165180030121, -11.112498551968637],
          [130.0165180030121, -12.322679220927057],
          [132.5433734717621, -12.322679220927057],
          [132.5433734717621, -11.112498551968637]]], null, false),
    L8 = ui.import && ui.import("L8", "imageCollection", {
      "id": "LANDSAT/LO08/C01/T1_RT"
    }) || ee.ImageCollection("LANDSAT/LO08/C01/T1_RT");
// Plot a time series of a band's value in regions of the ALOR.
var COLOR = {
  LOCATION1: 'ff0000',
  LOCATION2: 'a41fd6',
  LOCATION3: 'acbe4d',
};
var LOCATION1 = ee.Feature(    // 
    ee.Geometry.Rectangle(131.403, -12.236, 131.755, -12.059),
    {label: 'Van Diemen Gulf'});
var LOCATION2 = ee.Feature(    //
    ee.Geometry.Rectangle(130.2774, -12.1454, 130.6180, -12.0164),
    {label: 'Beagle Gulf'});
var LOCATION3 = ee.Feature(  //
    ee.Geometry.Rectangle(130.1126, -11.3117, 130.3323, -11.1932),
    {label: 'Timor Sea'});
var area = new ee.FeatureCollection([LOCATION1, LOCATION2, LOCATION3]);
// Get brightness temperature data for 1 year.
var landsat8Toa = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
var temps = landsat8Toa.filterBounds(area)
    .filterDate('2010-01-01', '2020-08-21')
    .select('B10')
    .sort('CLOUD_COVER');
// Convert temperature to Celsius.
temps = temps.map(function(image) {
  return image.addBands(image.subtract(273.15).select([0], ['Temp']));
});
var tempTimeSeries = ui.Chart.image.seriesByRegion({
  imageCollection: temps,
  regions: area,
  reducer: ee.Reducer.mean(),
  band: 'Temp',
  scale: 200,
  xProperty: 'system:time_start',
  seriesProperty: 'label'
});
tempTimeSeries.setChartType('ScatterChart');
tempTimeSeries.setOptions({
  title: 'Temperature over time',
  vAxis: {
    title: 'Temperature (Celsius)'
  },
  lineWidth: 1,
  pointSize: 4,
  series: {
    0: {color: COLOR.LOCATION1},
    1: {color: COLOR.LOCATION2},
    2: {color: COLOR.LOCATION3},
  }
});
print(tempTimeSeries);
//L8 datasets
var image = ee.Image('LANDSAT/LC08/C01/T1_RT/LC08_106068_20160801');
var image1 = ee.Image('LANDSAT/LC08/C01/T1_RT/LC08_105068_20160810');
//Deterine the band to be used for visualization
var trueColour = {
        bands: ["B4", "B3", "B2"],
        min: 6000,
        max: 12000
        };
var trueColour1 = {
        bands: ["B4", "B3", "B2"],
        min: 6000,
        max: 12000
        };
// Add the image to the map, using the visualization parameters.
Map.addLayer(image, trueColour, "Natural Colour");
Map.addLayer(image1, trueColour1, "Natural Colour");
Map.setCenter(131.403, -12.236, 8);
//Showing the cloud-mask images
// Function to cloud mask from the pixel_qa band of Landsat 8 SR data.
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  // Return the masked image, scaled to reflectance, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B[0-9]*")
      .copyProperties(image, ["system:time_start"]);
}
// Map the function over one year of data.
var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterDate('2016-01-01', '2016-12-31')
    .map(maskL8sr)
var composite = collection.median();
// Display the results.
Map.addLayer(composite, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.2}, "Nat Colour Cloud-masked");
//Sentinel-3
var dataset = ee.ImageCollection('COPERNICUS/S3/OLCI')
                  .filterDate('2016-08-01', '2016-08-05');
// Select bands for visualization and apply band-specific scale factors.
var rgb = dataset.select(['Oa08_radiance', 'Oa06_radiance', 'Oa04_radiance'])
              .median()
              // Convert to radiance units.
              .multiply(ee.Image([0.00876539, 0.0123538, 0.0115198]));
var visParams = {
  min: 0,
  max: 2,
  gamma: 2.5,
};
Map.addLayer(rgb, visParams, 'Sentinel-3 RGB');
//Add cartographic component
var title = ui.Label({
  value: 'Monitoring the total suspended matter',
  style:{
  fontWeight: 'bold',
  fontSize: '20px'
  }});
title.style().set('position', 'top-center');
//Show title
Map.add(title);