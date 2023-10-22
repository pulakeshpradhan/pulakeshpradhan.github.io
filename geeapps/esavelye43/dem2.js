var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            135.43773429219738,
            48.24453435442002
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([135.43773429219738, 48.24453435442002]);
//Добавляем коллекцию данных 
var landsat = ee.ImageCollection("LANDSAT/LC8_L1T")
    .filterDate('2016-01-01', '2017-01-01')
    .filterBounds(geometry)
//Определим функцию и добавляем ее к коллекции
var ndvi = landsat.map(function(image) {
  var result = image.normalizedDifference(["B5", "B4"]).rename("ndvi")
  return image.addBands(result);
})
// Рассчитываем максимальное значение NDVI 
var maxNDVI = ndvi.max().select("ndvi");
// Добавляем буфер вокруг точки интереса (можно использовать сразу полигон) в метрах
var region = geometry.buffer(20000)
// Создаем зоны на основе ЦМР
var elevation = ee.Image("USGS/SRTMGL1_003")
var zones = ee.Image(0)
    .where(elevation.gt(50), 50) // все значения больше 50 = 50
    .where(elevation.gt(100), 100) // все значения больше 100 = 100
    .where(elevation.gt(200), 200) // все значения больше 100 = 100
    .clip(region) // данные обрезаются по области
//Добавляем данные на карту
Map.addLayer(region, {color: "yellow"}, "Область интереса")
Map.addLayer(zones, {}, "Зоны ЦМР")
Map.centerObject(geometry, 10)
// Рассчитываем средние знаяения NDVI в пределах каждой группы
var stats = maxNDVI.addBands(zones).reduceRegion({
  reducer: ee.Reducer.mean().group(1),
  geometry: region,
  scale: 30
})
print(stats)
Map.centerObject(geometry, 10)