var LSIB = ui.import && ui.import("LSIB", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017");
// Приклади коду для учасників лекції від Малої академії наук
// лабораторії ГІС та ДЗЗ  "Основи Google Earth Engine"
// Спочатку нам потрібен файл кордонів 
var Ukraine = LSIB.filter(ee.Filter.eq('country_na', 'Ukraine'));
Map.centerObject(Ukraine,5)
//  подивимося на зміну середнього найвищого значення температури в Україні за 1970 та 2020 роки
// для цього підключимося до датасету з температурами worldclim
var dataset = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
                  .filter(ee.Filter.date('1970-01-01', '1970-12-31'));   // тут можна поміняти дати
// створюємо зміну для максимальних значень температури
var maximumTemperature = dataset.select('tmmx');
var maximumTemperatureVis = {
  min: 12.0,
  max: 16.0,
  palette: [
    '1a3678', '2955bc', '5699ff', '8dbae9', 'acd1ff', 'caebff', 'e5f9ff',
    'fdffb4', 'ffe6a2', 'ffc969', 'ffa12d', 'ff7c1f', 'ca531a', 'ff0000',
    'ab0000'
  ],
};
// доаємо на мапу, медіане значення за рік, вирізане кордонами Укрїни, та помножене на коефіцієнт 0.1 щоб перевести в градуси цельсія
Map.addLayer(maximumTemperature.median().clip(Ukraine).multiply(0.1), maximumTemperatureVis, 'Maximum Temperature 1970',true);
// створюємо теж саме для 1970 року
var dataset2 = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
                  .filter(ee.Filter.date('2020-01-01', '2020-12-31'));   // тут можна поміняти дати
var maximumTemperature2 = dataset2.select('tmmx');
var maximumTemperatureVis = {
 min: 10.0,
  max: 16.0,
  palette: [
    '1a3678', '2955bc', '5699ff', '8dbae9', 'acd1ff', 'caebff', 'e5f9ff',
    'fdffb4', 'ffe6a2', 'ffc969', 'ffa12d', 'ff7c1f', 'ca531a', 'ff0000',
    'ab0000'
  ],
};
Map.addLayer(maximumTemperature2.median().clip(Ukraine).multiply(0.1), maximumTemperatureVis, 'Maximum Temperature 2020',true);