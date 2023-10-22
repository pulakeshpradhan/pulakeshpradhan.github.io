var table = ui.import && ui.import("table", "table", {
      "id": "users/ogordienko112/border_Kyiv"
    }) || ee.FeatureCollection("users/ogordienko112/border_Kyiv"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                30.453039806356152,
                50.4531466639822
              ],
              [
                30.4528681449792,
                50.45158913694826
              ],
              [
                30.46381155775996,
                50.44984027355675
              ],
              [
                30.464884441365918,
                50.450441452638884
              ],
              [
                30.465699832906445,
                50.45115192716069
              ],
              [
                30.45531431960078,
                50.45279144303194
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[30.453039806356152, 50.4531466639822],
          [30.4528681449792, 50.45158913694826],
          [30.46381155775996, 50.44984027355675],
          [30.464884441365918, 50.450441452638884],
          [30.465699832906445, 50.45115192716069],
          [30.45531431960078, 50.45279144303194]]]);
// Приклади коду для учасників лекції від Малої академії наук
// лабораторії ГІС та ДЗЗ  "Основи Google Earth Engine"
// Додаємо шейп до мапи
Map.addLayer (table,{},'border_kyiv',false);
Map.centerObject(table,10)
// Cтворюємо зміні для дат
var startDate = '2021-05-10'; // тут можна поміняти дати
var endDate = '2021-08-31';
// Звертаємося до колекціяї Сентінель-2
var Sentinel2_ImageCollection = ee.ImageCollection('COPERNICUS/S2_SR');
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
// Свторюємо датасет з параметрами, та застосовуємо маску, фільтр дат
var dataset = ee.ImageCollection('COPERNICUS/S2')
  .filterDate(startDate, endDate)
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
// Параметри візуалізації RGB
var rgb = {
  min: 0, 
  max: 5000,
  gamma: 2, // коефіцієнт гамма корекції (зміна контрастності)
  opacity: 1,// прозорість зображення 
  bands: ['B4', 'B3', 'B2'], // канали RGB для Sentinel-2
};
// Додаємо шар до мапи
// Давайте змінемо параметри для відображення  False color 'B11', 'B8', 'B4'
var False_color = {
  min: 0,
  max: 5000,
  gamma: 2,
  bands: ['B11', 'B8', 'B4'],
};
Map.addLayer(dataset.median().clip(table), rgb, 'RGB',false);
// Cтворемо за допомогою параметрів візуалізації розтягування гістограми 
// та додамо їх до Imports
// Параметри візуалізації False Color
// Додаємо шар на мапу, використовуючи створені параметри візуалізації
Map.addLayer(dataset.median().clip(table), False_color, 'False color',false);
// Для колекції знімків рахуємо медіане значення
var Sentinel_2_median = dataset.median().clip(table);
// Розразовуємо NDVI
var Sentinel2_NDVI = Sentinel_2_median.normalizedDifference(['B8', 'B4']).rename('NDVI');
// Створюємо параметри візуалізації
var vis_collection = {bands: ['NDVI'], min: 0, max: 2, palette: [
  'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301']};
// Додаємо на мапу створений NDVI 
Map.addLayer (Sentinel2_NDVI,vis_collection,'Sentinel-2 NDVI',false);
// Створюємо маску для значень NDVI нижче 0.6
var imageMaskedNDVI = Sentinel2_NDVI.updateMask(Sentinel2_NDVI.select('NDVI').gte(0.6));
// Додаємо замаскований NDVI
Map.addLayer (imageMaskedNDVI,vis_collection,'NDVI greater 6',false);
// Розрахуємо індекс EVI = 2.5*(NIR - Red) / (NIR + 6*Red - 7.5*Blue + 1)
var EVI = function(image) {
	return image.expression('2.5*(NIR - RED) / (NIR + 6*RED - 7.5*BLUE + 1)', {
		'RED': image.select('B4'), 
		'BLUE': image.select('B2'),
		'NIR': image.select('B8')
     }).rename('EVI');
};
// Застосовуємо функцію яку щойно створили для медіанного зображення
var EVI = EVI(Sentinel_2_median);
// Додаємо EVI на мапу
Map.addLayer (EVI,{bands: ['EVI'], min: -50, max: 100, palette: [
  'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301']},'EVI',false);
// Експорт зображення на гугл диск відбувається за допомогою (Export.image.toDrive), scale: 10 це масштаб Сентінел-2
Export.image.toDrive({
  image: EVI, 
  description: 'EVI_'+startDate+'_'+endDate,
  folder: 'DATA_GEE_',
  scale: 10,
  region: table,
  maxPixels: 1e8,
  crs: 'EPSG:4326',
  fileFormat: 'GeoTIFF',
  });
// тут щоб пришвидшити експорт ми вказали максимальну кількусть пікселів maxPixels: 1e10,
Export.image.toDrive({
  image: imageMaskedNDVI, 
  description: 'imageMaskedNDVI_'+startDate+'_'+endDate,
  folder: 'DATA_GEE_',
  scale: 10,
  region: table,
  maxPixels: 1e8,
  crs: 'EPSG:4326',
  fileFormat: 'GeoTIFF',
  });
// Оцифруємо парк КПІ
// Задаємо дати для старту
var startDateGlobal = '2016-01-10';
var endDateGlobal = '2021-12-31';
// Стандартна функція накладання маски на хмари (QA60) канал де зберігаються хмари 
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively. 
  //Оператор привласнення зсуву вліво ( << ) переміщає вказану кількість біт вліво і 
  //надає результат змінної.
// var a = 1;         // 00000001
// var b = 10;         // 00001010
// var leftshift = a << b;
// print (leftshift) // 1024
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000)
     //.select("B.*")
      .copyProperties(image, ["system:time_start"])  // Мітка часу Earth Engine в мілісекундах з епохи UNIX. 
}
// Фільтруємо колекцію зображень та застосовуємо маску
var sentinelCollection = ee.ImageCollection('COPERNICUS/S2_SR')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',1))
                  .map(maskS2clouds)
// функція для розрахунку  NDVI 
function addNDVI(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']); 
  return image.addBands(ndvi);
}
// застосовуємо фільтр дат
var filtered = sentinelCollection.filterDate(startDateGlobal, endDateGlobal);
// створюємо колекцію зображень з NDVI
var with_ndvi = filtered.map(addNDVI);
// виводимо в консоль графік для NDVI
var chart = ui.Chart.image.series({
  imageCollection: with_ndvi.select('nd'),
  region: geometry,
  reducer: ee.Reducer.mean(),
  scale: 10
}).setOptions({
      lineWidth: 1,
      title: 'NDVI Time Series',
      vAxis: {title: 'NDVI'},
      hAxis: {title: '', format: 'YYYY-MMM'}
    })
print(chart);