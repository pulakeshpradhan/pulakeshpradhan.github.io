var table = ee.FeatureCollection("users/esavelye43/OOPT"),
    imageVisParam = {"opacity":1,"bands":["tmmx"],"min":203.3083581094694,"max":216.52904026451432,"palette":["f3ff23","ffcd43","ffa354","ff6c18","ff4d0a"]};
//Создаем коллекцию данных, указывая ID загруженных данных
var aoi = ee.FeatureCollection('users/esavelye43/OOPT');
// Создаем пустое изображение
var empty = ee.Image().byte();
// Используем созданно еизображение для отображения границ области интереса
var outline = empty.paint({
  featureCollection:aoi,
  color: 1,
  width: 3
});
//Отображаем на карте и центрируем карту по области интереса
Map.centerObject(aoi, 8);
Map.addLayer(outline, {palette: 'FF0000'}, 'Границы');
//Добавляем коллекцию данных по температуре за август 2018
var dataset = ee.ImageCollection('IDAHO_EPSCOR/TERRACLIMATE')
                  .filter(ee.Filter.date('2017-07-01', '2017-08-01'));
var maximumTemperature = dataset.select('tmmx');
// Создаем палитру для отображения
var maximumTemperatureVis = {
  min: -300.0,
  max: 300.0,
  palette: [
    '1a3678', '2955bc', '5699ff', '8dbae9', 'acd1ff', 'caebff', 'e5f9ff',
    'fdffb4', 'ffe6a2', 'ffc969', 'ffa12d', 'ff7c1f', 'ca531a', 'ff0000',
    'ab0000'
  ],
};
// Добавляем на карту полученные данные
//Map.addLayer(maximumTemperature, maximumTemperatureVis, 'Temperature');
// Обрезаем полученные данные по области интереса и отображаем на карте
var clipped = maximumTemperature.mean().clip(aoi);
Map.addLayer(clipped, imageVisParam, 'Surface Temperature ООПТ');
//Отображаем на карте среднее значение температуры за август 2018 в пределах области интереса
var meanDictionary = clipped.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: aoi.geometry(),
  scale: 1000,
  maxPixels: 1e9
});
// The result is a Dictionary.  Print it.
print(meanDictionary);