var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "MODIS/006/MOD13Q1"
    }) || ee.ImageCollection("MODIS/006/MOD13Q1"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                85.65378196760096,
                22.569585690438394
              ],
              [
                91.27878196760096,
                22.569585690438394
              ],
              [
                91.32272728010096,
                26.092508015498765
              ],
              [
                85.82956321760096,
                26.092508015498765
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[85.65378196760096, 22.569585690438394],
          [91.27878196760096, 22.569585690438394],
          [91.32272728010096, 26.092508015498765],
          [85.82956321760096, 26.092508015498765]]]),
    table = ui.import && ui.import("table", "table", {
      "id": "users/dghosh616/block1"
    }) || ee.FeatureCollection("users/dghosh616/block1");
var dataset = imageCollection.select('NDVI');
print(dataset.size());
var date_filter = dataset.filterDate('2018-01-01', '2018-05-01');
print(date_filter.size());
var mean_NDVI = date_filter.reduce(ee.Reducer.mean());
//Map.addLayer(mean_NDVI);
var geometry = mean_NDVI.clip(geometry);
var ndviVis = {
  min: 0.0,
  max: 8000.0,
palette: [
   'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
Map.addLayer(geometry,ndviVis);