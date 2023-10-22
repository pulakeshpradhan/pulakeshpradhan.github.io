var uk = ui.import && ui.import("uk", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -12.784454641046887,
                59.553342439326045
              ],
              [
                -12.784454641046887,
                48.97600795277512
              ],
              [
                3.9147641089531326,
                48.97600795277512
              ],
              [
                3.9147641089531326,
                59.553342439326045
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
        [[[-12.784454641046887, 59.553342439326045],
          [-12.784454641046887, 48.97600795277512],
          [3.9147641089531326, 48.97600795277512],
          [3.9147641089531326, 59.553342439326045]]], null, false);
function normalise(image) {
  var minMax = image.reduceRegion({
    reducer: ee.Reducer.minMax(),
    geometry: image.geometry(),
    scale: 30,
    maxPixels: 10e9,
    // tileScale: 16
  }); 
  // use unit scale to normalize the pixel values
  var unitScale = ee.ImageCollection.fromImages(
    image.bandNames().map(function(name){
      name = ee.String(name);
      var band = image.select(name);
      return band.unitScale(ee.Number(minMax.get(name.cat('_min'))), ee.Number(minMax.get(name.cat('_max'))))
                  // eventually multiply by 100 to get range 0-100
                  //.multiply(100);
  })).toBands().rename("test");
  return unitScale
}
function updateIndex(date) {
  var startDate = date.start();
  print(startDate)
  var endDate = startDate.advance(30, 'day');
  var dataset = ee.ImageCollection('MODIS/006/MCD43A3')
                    .filter(ee.Filter.date(startDate, endDate))
                    .filterBounds(uk);
  var blackSkyAlbedo = dataset.select('Albedo_BSA_Band1').first().clip(uk);
  print(blackSkyAlbedo)
  var blackSkyAlbedoVis = {
    min: 0.0,
    max: 400.0,
  };
  Map.addLayer(blackSkyAlbedo, blackSkyAlbedoVis, 'Black-Sky Albedo', false);
  var dataset = ee.ImageCollection('MODIS/006/MOD13A2')
                    .filter(ee.Filter.date(startDate, endDate))
                    .filterBounds(uk);
  var evi = dataset.select('EVI').first().clip(uk);
  print(evi)
  var eviVis = {
    min: 0.0,
    max: 9000.0,
    palette: [
      'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
      '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
      '012E01', '011D01', '011301'
    ],
  };
  Map.addLayer(evi, eviVis, 'EVI', false);
  var dataset = ee.ImageCollection('MODIS/006/MOD11A1')
                    .filter(ee.Filter.date(startDate, endDate))
                    .filterBounds(uk);
  var landSurfaceTemperature = dataset.select('LST_Day_1km').first().clip(uk);
  print(landSurfaceTemperature)
  var landSurfaceTemperatureVis = {
    min: 13000.0,
    max: 16500.0,
    palette: [
      '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
      '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
      '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
      'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
      'ff0000', 'de0101', 'c21301', 'a71001', '911003'
    ],
  };
  Map.addLayer(
      landSurfaceTemperature, landSurfaceTemperatureVis,
      'Land Surface Temperature',
      false);
  var score = ee.ImageCollection([normalise(blackSkyAlbedo), normalise(evi), ee.Image.constant(1).subtract(normalise(landSurfaceTemperature)).rename("test")]).mean()
  var gradient = ['blue', 'lightgreen','yellow','red'];
  Map.addLayer(score,{palette:gradient,},'Score');
}
// Converts map to satellite image by default
Map.setOptions("SATELLITE")
Map.setCenter(-1.572600, 54.078771, 6);
var dateSlider = ui.DateSlider({
  start: '2000-01-01',
  end: '2021-05-31',
  value: "2018-01-01",
  period: 1,
  onChange: function(value) {
    Map.remove(Map.layers().get(0));
    Map.remove(Map.layers().get(0));
    Map.remove(Map.layers().get(0));
    Map.remove(Map.layers().get(0));
    updateIndex(value);
  }
});
Map.add(dateSlider)
updateIndex(ee.DateRange('2018-01-01','2018-01-15'))