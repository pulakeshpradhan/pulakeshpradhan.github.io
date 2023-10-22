var LSIB = ui.import && ui.import("LSIB", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    SRTM = ui.import && ui.import("SRTM", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    aoi = ui.import && ui.import("aoi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                24.379874685382124,
                48.195140960028446
              ],
              [
                24.379874685382124,
                48.12231259478683
              ],
              [
                24.58449504671025,
                48.12231259478683
              ],
              [
                24.58449504671025,
                48.195140960028446
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
        [[[24.379874685382124, 48.195140960028446],
          [24.379874685382124, 48.12231259478683],
          [24.58449504671025, 48.12231259478683],
          [24.58449504671025, 48.195140960028446]]], null, false),
    Line = ui.import && ui.import("Line", "geometry", {
      "geometries": [
        {
          "type": "LineString",
          "coordinates": [
            [
              12.947991667442768,
              50.37304079473193
            ],
            [
              13.096307097130268,
              50.3905548894984
            ]
          ],
          "geodesic": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.LineString(
        [[12.947991667442768, 50.37304079473193],
         [13.096307097130268, 50.3905548894984]]);
// // Приклади коду для учасників курсу від Малої академії наук
// // Обробка та аналіз супутникових знімків
// // на платформі Google Earth Engine
// // Практична робота 5. Аналіз  рельєфу на прикладі моделювання підтоплених території України
// // внаслідок підняття рівня океану та створення профілю 
// // і відмивки рельєфу г.Говерли
// // Спочатку нам потрібен файл кордонів 
var Ukraine = LSIB.filter(ee.Filter.eq('country_na', 'Czechia'));
Map.addLayer(Ukraine,{},'Czech')
// // Завантажимо  зображення SRTM
// var SRTM_PK = SRTM.clip(Ukraine);
// var change_number = 50; // тут змінюється висота
// print(change_number)
// // Задаємо порогове значення
// var threshold = SRTM_PK.gte(change_number);
// // Додаємо на карту
// Map.centerObject(Ukraine,5);
// Map.addLayer(threshold, {palette:['06768F','8F4809']},'threshold');
// // Створюємо маску  
// var mask = threshold.updateMask(threshold);
// // Обчислимо площу пікселів замаскованих областей
// //Це поверне площу в квадратних метрах, тому для перетворення нам потрібно розділити на 1e6
// var pix_area = ee.Image.pixelArea().addBands(mask.select('elevation')).divide(1e6).reduceRegion({
// reducer: ee.Reducer.sum().group(1),
// geometry: Ukraine,
// scale: 30,
// bestEffort: true
// });
// // Додаємо в консоль результат розрахунку
// print(pix_area,'no Flood area');
// // змінна з площею України
// var areaUkraine = ee.Number(603628);
// print (areaUkraine,'area Ukraine');
// // Звертаємося до стороннього розробника за параметрами візуалізації рельєфу
// var palettes = require('users/gena/packages:palettes');
// var palette = palettes.colorbrewer.BrBG[11].reverse();
// var visParams = {min: 500, max: 2061, palette: palette};
// // Виводимо на мапу ЦМР з параметрами візуалізації
// Map.addLayer(SRTM.clip(Ukraine), visParams, 'Elevation')
// // Розраховуємо "відмивку рельєфа"
// var shade = ee.Terrain.hillshade(SRTM.clip(aoi));
// Map.addLayer (shade.clip(Ukraine),{},'Hillshade')
// // Створюємо лінк для скачування даних
// var path = shade.getDownloadURL({
//   'scale': 30,
//   'crs': 'EPSG:4326',
//   'region': aoi
// });
// print(path);
var line = Line;
print(line); 
var coord = line.coordinates();
var Line_p2 =ee.List(coord.get(0));
var p2_lat = ee.List(Line_p2.get(1));
var Line_p1 = ee.List(coord.get(1));
var p1_lat = ee.List(Line_p1.get(0));
// команда яка буде брати значення координат з зображення
var latLonImg = ee.Image.pixelLonLat();
// Імпортуйте цифрову модель поверхні та додайте смуги широти та довготи.
var elevImg =
    SRTM.select('elevation').addBands(latLonImg);
// Зменшити смуги висоти та координат за лінією розрізу; отримати словник з
// назви смуг як ключі, значення пікселів як списки.
var elevTransect = elevImg.reduceRegion({
  reducer: ee.Reducer.toList(),
  geometry: Line,
  scale: 30,
});
// Отримати списки значень довготи та висоти зі словника .
var lon = ee.List(elevTransect.get('longitude'));
var elev = ee.List(elevTransect.get('elevation'));
// Відсортувати значення довготи та висоти за зростанням довготи.
var lonSort = lon.sort(lon);
var elevSort = elev.sort(lon);
// Параметри візуалізації графіку
var chart = ui.Chart.array.values({array: elevSort, axis: 0, xLabels: lonSort})
                .setOptions({
                  title: 'Elevation Profile Across Longitude',
                  hAxis: {
                    title: 'Longitude',
                    viewWindow: {min: p2_lat, max: p1_lat},
                    titleTextStyle: {italic: false, bold: true}
                  },
                  vAxis: {
                    title: 'Elevation (m)',
                    titleTextStyle: {italic: false, bold: true}
                  },
                  colors: ['654321'],
                  lineSize: 5,
                  pointSize: 0,
                  legend: {position: 'none'}
                });
print(chart.setChartType('AreaChart'));