var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            135.54669142301663,
            34.67220673441972
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            130.75742855339675,
            32.81261149800173
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint(
        [[135.54669142301663, 34.67220673441972],
         [130.75742855339675, 32.81261149800173]]);
var dataset = ee.ImageCollection('MODIS/006/MYD11A1')
                  .filter(ee.Filter.date('2020-05-01', '2020-10-31'));
var landSurfaceTemperature = dataset.select('LST_Day_1km');
/* var lstc = dataset.expression(
  dataset.select('LST_Day_1km') * 0.02 - 273.15); */
var median = dataset.reduce(ee.Reducer.median());
var maxT = landSurfaceTemperature.reduce(ee.Reducer.max());
var maxTinC = maxT.divide(50).subtract(273.15);
var landSurfaceTemperatureVis = {
  min: 15800.0,
  max: 16200.0,
  palette: [
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ],
};
var Temperature_inCVis = {
  min: 40.0,
  max: 55.0,
  palette: [
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ],
};
// Load a MODIS image on a specific date
var image = ee.Image('MODIS/006/MYD11A1/2020_08_15');
// Compute the Temperature in C using an expression.
var lstc = image.expression(
    '0.02 * myd11 - 273.15', {
      'myd11': image.select('LST_Day_1km')
});
/*うまく動かない 
バンドは一つしかない（はずだ）けど指定できない*/
/*var maxTC = maxT.expression(
    '0.02 * image[0] - 273.15';
*/
Map.setCenter(136, 35, 6);
/*Map.addLayer(
    landSurfaceTemperature, landSurfaceTemperatureVis,
    'Land Surface Temperature');
Map.addLayer(
    lstc, Temperature_inCVis,
    'Land Surface Temperature in degC (8/15)');
*/
Map.addLayer(
    maxTinC, Temperature_inCVis,
    'Max Land Surface Temperature in degC (Aug. 2020)');
/*本当は温度を摂氏で表示したい
    Map.addLayer(
    maxTC, landSurfaceTemperatureVis,
    'Max Land Surface Temperature in degC');
    */