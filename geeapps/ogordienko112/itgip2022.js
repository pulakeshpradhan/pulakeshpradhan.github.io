var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    imageCollection2 = ui.import && ui.import("imageCollection2", "imageCollection", {
      "id": "COPERNICUS/S2_SR_HARMONIZED"
    }) || ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                23.815882636650826,
                47.980739595998784
              ],
              [
                23.815882636650826,
                47.920033173798814
              ],
              [
                23.91819281731489,
                47.920033173798814
              ],
              [
                23.91819281731489,
                47.980739595998784
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
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[23.815882636650826, 47.980739595998784],
          [23.815882636650826, 47.920033173798814],
          [23.91819281731489, 47.920033173798814],
          [23.91819281731489, 47.980739595998784]]], null, false);
// Приклади коду для учасників курсу від Малої академії наук
// Обробка та аналіз супутникових знімків
// на платформі Google Earth Engine
// Практична робота 6. Порівняння радарних та спектральних супутникових зображень на прикладі 
// дослідження паводку на Дністрі в районі м. Галич
Map.centerObject(geometry, 12); // Центрування мапи
Map.setOptions('Hybrid'); // Змінення виду мапи
// Наступна змінна звертається до коллекції Sentinel-1, та фільтрує його за датою
// геометрією, орбітою, полярізацією, та бере перший знімок з колекції.
var dataset_1 = imageCollection
  .filterDate('2022-06-01','2022-07-30')
  .filterBounds(geometry)
  .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
  .select('VV','VH')
  .first();
// Додавання шару на папу
Map.addLayer(dataset_1, {'bands': 'VV,VH,VV', min: [-20, -20, -15],max: [0, -15, 0]},'sentinel-1 2022');
// Наступна змінна звертається до коллекції Sentinel-1, та фільтрує його за датою
// геометрією, орбітою, полярізацією, та бере перший знімок з колекції.
var dataset_2 = imageCollection
.filterDate('2015-06-01','2015-07-30')
  .filterBounds(geometry)
  .filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
  .select('VV','VH')
  .first();
// Додавання шару на папу
Map.addLayer(dataset_2, {'bands': 'VV,VH,VV', min: [-20, -20, -15],max: [0, -15, 0]},'sentinel-1 2015');
// Змінна звертається до колекції Sentinel-1, та фільрує його за датами
var dataset_3 = imageCollection2
  .filterDate('2020-06-25','2020-06-26')
// Візуальні параметри
var visualization = {
  min: 0,
  max: 6500,
  bands: ['B12', 'B8', 'B4'],
};
// Додавання шару на папу
Map.addLayer(dataset_3,visualization,'sentinel 2');
var imageJune = ee.ImageCollection(dataset_1); // Змінна що бере відфільтроване зображення
var maskJune = imageJune.select('VV').max().lte(-16) //  Змінна що створю вхідні параметри, для полярізації та граничного значення
var maskedJune = maskJune.updateMask(maskJune); // Використання маски
// Візуальні параметри
var visJune = {bands: ["VV"],
palette: ["18dfff"]};
// Додавання шару на мау
Map.addLayer(maskedJune.clip(geometry),visJune,'Mask 2022');
// Створення лінку для завантаження з параметрами: масшта, система координат, зона цікавості.
var path = maskedJune.getDownloadURL({
  'scale': 30,
  'crs': 'EPSG:4326',
  'region': geometry
});
print(path);// Результат в коноль
var imageAug = ee.ImageCollection(dataset_2);
var maskAug = imageAug.select('VV').max().lte(-16);
var maskedAug = maskAug.updateMask(maskAug);
var visAug = {bands: ["VV"],
palette: ["d52bff"]};
Map.addLayer(maskedAug.clip(geometry),visAug,'Mask 2015');
// var path = maskedAug.getDownloadURL({
//   'scale': 30,
//   'crs': 'EPSG:4326',
//   'region': geometry
// });
// print(path);