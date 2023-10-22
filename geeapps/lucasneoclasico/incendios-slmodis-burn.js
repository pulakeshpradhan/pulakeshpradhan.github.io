var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -66.97835547996114,
                -32.260975481953565
              ],
              [
                -66.97835547996114,
                -35.837267783996246
              ],
              [
                -64.94039161277364,
                -35.837267783996246
              ],
              [
                -64.94039161277364,
                -32.260975481953565
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
        [[[-66.97835547996114, -32.260975481953565],
          [-66.97835547996114, -35.837267783996246],
          [-64.94039161277364, -35.837267783996246],
          [-64.94039161277364, -32.260975481953565]]], null, false);
var dataset = ee.ImageCollection('MODIS/006/MCD64A1')
                  .filter(ee.Filter.date('2020-01-01', '2020-12-30'));
var burnedArea = dataset.select('BurnDate');
var burnedArea_max = burnedArea.max() // reducir x el maximo, no se si es lo que necesitas 
print(burnedArea,'burnedArea')
print(burnedArea_max,'burnedArea_max')
var burnedAreaVis = {
  min: 30.0,
  max: 341.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.centerObject(geometry, 10);
Map.addLayer(burnedArea, null, 'Burned Area');
Map.addLayer(burnedArea_max, null, 'burnedArea_max');
Export.image.toDrive({
image: burnedArea_max, // aca no va entre comillas xq va el objeto
description: 'burnedArea_max',
scale: 500,
region: geometry,
crs: 'EPSG:4326'
});
//Esa fire Modis Burn CCi
var dataset = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
                  .filter(ee.Filter.date('2019-01-01', '2019-12-30'));
var burnedArea = dataset.select('BurnDate');
var burnedArea_max = burnedArea.max() // reducir x el maximo, no se si es lo que necesitas 
print(burnedArea,'burnedArea')
print(burnedArea_max,'burnedArea_max')
var burnedAreaVis = {
  min: 30.0,
  max: 341.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.centerObject(geometry, 10);
Map.addLayer(burnedArea, null, 'Burned Area');
Map.addLayer(burnedArea_max, null, 'burnedArea_max');
Export.image.toDrive({
image: burnedArea_max, // aca no va entre comillas xq va el objeto
description: 'burnedArea_max_CCI',
scale: 500,
region: geometry,
crs: 'EPSG:4326'
});