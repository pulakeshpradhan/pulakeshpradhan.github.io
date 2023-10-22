var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                7.3920059832765395,
                36.65633408955968
              ],
              [
                7.3920059832765395,
                35.78777414104576
              ],
              [
                8.172035280151539,
                35.78777414104576
              ],
              [
                8.172035280151539,
                36.65633408955968
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
        [[[7.3920059832765395, 36.65633408955968],
          [7.3920059832765395, 35.78777414104576],
          [8.172035280151539, 35.78777414104576],
          [8.172035280151539, 36.65633408955968]]], null, false);
// Sentinel-2/Landsat 5 Normalized Difference Vegetation Index (NDVI) script, written by Will Deadman (william.m.deadman@gmail.com)
var ndvi_palette = 'FFFFFF, CE7E45, DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400, ' + '3E8601, 207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301';
//Landsat 5 (1984-2012)
var L5_display = {bands: ["B3", "B2", "B1"], min: 0, max: 0.5};
function addndl5(input) {
  var nd = input.normalizedDifference(['B4', 'B3']).rename('ndvi');
  return input.addBands(nd);
}
var L5_collection = ee.ImageCollection("LANDSAT/LT05/C01/T1_TOA")
  .filterBounds(geometry)
  .filterDate('1990-01-01', '1990-12-31')
  .filter(ee.Filter.lt("CLOUD_COVER", 0.1))
  .map(addndl5);  
print(L5_collection);
var L5_mosaic = L5_collection.median().clip(geometry);
Map.addLayer(L5_mosaic, L5_display, "Landsat 5",false);
var ndvi_L5 = L5_collection.select('ndvi').median().clip(geometry);
Map.addLayer(ndvi_L5, {min: -0.1, max: 1, palette: ndvi_palette}, 'NDVI L5');
// Sentinel-2 (late 2015-)
var S2_display = {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000};
function addnd(input) {
  var nd = input.normalizedDifference(['B8', 'B4']).rename('ndvi');
  return input.addBands(nd);
}
var S2_collection = ee.ImageCollection("COPERNICUS/S2")
  .filterBounds(geometry)
  .filterDate('2020-01-01', '2020-12-31')
  .filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10)
  .map(addnd);
print(S2_collection);
var S2_mosaic = S2_collection.median().clip(geometry);
Map.addLayer(S2_mosaic, S2_display, "Sentinel-2",false);
var ndvi_S2 = S2_collection.select('ndvi').median().clip(geometry);
Map.addLayer(ndvi_S2, {min: -0.1, max: 1, palette: ndvi_palette}, 'NDVI S2');
Map.centerObject(geometry);
// Exporting the NDVI data
Export.image.toDrive({ 
  image: ndvi_S2,
  description: 'NDVI_Sentinel-2',
  fileNamePrefix: 'NDVI_S2_',
  folder: 'GEE_NDVI',
  scale: 10, 
  maxPixels: 1e13, 
  region: geometry 
});
Export.image.toDrive({ 
  image: ndvi_L5,
  description: 'NDVI_Landsat-5',
  fileNamePrefix: 'NDVI_L5_',
  folder: 'GEE_NDVI',
  scale: 30, 
  maxPixels: 1e13, 
  region: geometry 
});