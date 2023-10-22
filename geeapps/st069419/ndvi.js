var dataset = ui.import && ui.import("dataset", "imageCollection", {
      "id": "MODIS/006/MOD09A1"
    }) || ee.ImageCollection("MODIS/006/MOD09A1"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "bands": [
          "NDVI"
        ],
        "min": 0,
        "max": 2,
        "palette": [
          "FFFFFF",
          "CE7E45",
          "FCD163",
          "66A000",
          "207401",
          "056201",
          "004C00",
          "023B01",
          "012E01",
          "011301"
        ]
      }
    }) || {"bands":["NDVI"],"min":0,"max":2,"palette":["FFFFFF","CE7E45","FCD163","66A000","207401","056201","004C00","023B01","012E01","011301"]},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
//Определяем параметры визуализации для коллекции снимков, с помощью визуализации нового канала ndvi
//var End_period = ee.Date(new Date().getTime())
//var Start_period = End_period.advance(-100,'day');
//определили дату старта и конца 
var end_period = ee.Date(new Date().getTime())
var start_period = end_period.advance(-1000,'day');
//отфильтровали коллекцию по датам 
var modis_date = dataset.filterDate(start_period, end_period)
//var image = modis_date.median()
// каналы который мы будем использовать 
var modisBands = ['sur_refl_b03','sur_refl_b04','sur_refl_b01','sur_refl_b02','sur_refl_b06','sur_refl_b07'];
var lsBands = ['blue','green','red','nir','swir1','swir2'];
// функция для побитового извелечения 
function getQABits(modis_date, start, end, newName) {
    // Compute the bits we need to extract.
    var pattern = 0;
    for (var i = start; i <= end; i++) {
       pattern += Math.pow(2, i);
    }
    // Return a single band image of the extracted QA bits, giving the band
    // a new name.
    return modis_date.select([0], [newName])
                  .bitwiseAnd(pattern)
                  .rightShift(start);
}
// A function to mask out cloudy pixels.
function maskQuality(image) {
  // Select the QA band.
  var QA = image.select('StateQA');
  // Get the internal_cloud_algorithm_flag bit.
  var internalQuality = getQABits(QA,8, 13, 'internal_quality_flag');
  // Return an image masking out cloudy areas.
  return image.updateMask(internalQuality.eq(0));
}
// create cloud free composite
var noCloud = modis_date.map(maskQuality).select(modisBands,lsBands);
// create composite with clouds 
var Cloud = modis_date.select(modisBands,lsBands);
// vis parameters
var visParams = {bands:['red','green','blue'],min:0,max:3000,gamma:1.3};
// // add the cloud free composite
// Map.addLayer(noCloud.median(),visParams,'MODIS Composite');
// // add the cloud composite
// Map.addLayer(Cloud.median(),visParams,'MODIS Composite clouds');
//снимок без облаков 
var noCloud_collection = noCloud.mosaic()
//каналы
var blue = noCloud_collection.select('blue')
var green = noCloud_collection.select('green')
var red = noCloud_collection.select('red')
var nir = noCloud_collection.select('nir')
var swir1 = noCloud_collection.select('swir1')
var swir2 = noCloud_collection.select('swir2')
//функция для рассчета NDVI
function addNDVI(noCloud_collection) {
 var ndvi = noCloud_collection.normalizedDifference(['nir','red']).rename('NDVI');
 return noCloud_collection.addBands(ndvi);
}
var collection_with_ndvi = noCloud.map(addNDVI);
var image_with_ndvi = collection_with_ndvi.mosaic()
var ndvi = collection_with_ndvi.select('NDVI');
// //добавляем индекс для рассчета NDVI в нашу коллекцию
// var collection_with_ndvi = addNDVI(noCloud_collection)
// //оставляем только один канал - NDVI 
// var ndvi = collection_with_ndvi.select('NDVI');
// Добавляем виджет - слайдер 
// to get client-side values of start and end period
ee.Dictionary({start: start_period, end: end_period})
  .evaluate(renderSlider) 
//добавили слайдер на карту
function renderSlider(dates) {
  var slider = ui.DateSlider({
    start: dates.start.value, 
    end: dates.end.value, 
    period: 8, // Every 5 days
    onChange: renderDateRange
  })
  Map.add(slider)
}
//функция 
function renderDateRange(dateRange) {
   var image_ndvi = ndvi
     .filterDate(dateRange.start(), dateRange.end())
     .median()
//Добавляем слой с нашей функцией 
var layer = ui.Map.Layer(image_ndvi, imageVisParam, 'NDVI')
Map.layers().reset([layer])
}
//добавляем панель 
var inspectorPanel = ui.Panel({style: {width: '30%'}});
//временные ряды NDVI для нарисованной пользователем геометрии. 
/*приложение  отображает диаграмму среднего значения NDVI для пикселей, 
пересекающих нарисованную геометрию*/
//1) настроим пользовательские инструменты для рисования
var drawingTools = Map.drawingTools();
//2) скорем инструменты рисования, для создания собственных
drawingTools.setShown(false);
/*3) цикл while необходим, чтобы отчищать все созданные геометрии
которые были добавлены пользователем 
(приложение позволяет обрабатывать временные ряды для одной геометрии )*/
/* как работает цикл
когда нарисовано больше одной гемеотрии:
создаем переменную из этой геометрии, далее удаляем
ее из переменной с исходной геометрией, тем самым геометрия 
отчищается*/
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
//4)переменная для заполнения нашей геометрии
//создаем переменную для рисования геометрии в нашем слое
/*geometries: null - это обозначет, что геометрия в слое ничего 
не должна возвращать*/
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
//добавляем слой гоеметрии к инструментам рисования
drawingTools.layers().add(dummyGeometry);
//создаем функции обратного вызова 
//они необходимы для создания диаграмм
//кнопки рисования 
/*определим кнопки, которые необходимы для 
1) отчистки существующей геометрии от GeometryLayer
2) кнопка для режима рисования (прямоугольник, многоугольник и точка)*/
//кнопка отчистки геометрии
function clearGeometry() {
  //переменная которая возвращает существующую геометрию
  var layers = drawingTools.layers();
  //берем первый элемент из layers
  //берем геометрию из этого слоя 
  //удаляем элементы
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
/*определяем функции, которые будут нажиматься при нажатии
//на кнопку рисования
//каждая функция вначале отчистит предыдущие рисунки с помощью 
clearGeometry 
далее будет рисовать с помощью спец режима*/
//рисование прямугольника
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
//Regional time series chart
//добавили панель 
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: false}
});
//добавили в панель файл map
Map.add(chartPanel);
/*Определим функцию, которая вызывается  при завершении рисования геометрии 
и событиях редактирования для создания диаграммы временного ряда NDVI 
для нарисованной области*/
//функция показывает панель диаграммы
function chartNdviTimeSeries() {
  // Сделаем панель видимой при первом рисовании геометрии
  //!0 -> true , !1 -> false
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  //если в 1 пикселе более 5000 м, то масштаб увеличиается в 2 раза, если нет то также
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  // Chart NDVI time series for the selected area of interest.
  var chart = ui.Chart.image
                  .seriesByRegion({
                    imageCollection:collection_with_ndvi, //ee.ImageCollection('MODIS/006/MOD13A2'),
                    regions: aoi,
                    reducer: ee.Reducer.mean(),
                    band: 'NDVI',
                    //yearReducer: ee.Reducer.mean(),
                    scale: scale,
                    xProperty: 'system:time_start'
                  })
                  .setOptions({
                    titlePostion: 'none',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'ndvi (x1e4)'},
                    series: {0: {color: '23cba7'}}
                  });
  // Replace the existing chart in the chart panel with the new chart.
  chartPanel.widgets().reset([chart]);
}
//настроим виджет для рисования
/*функция ui.util.debounce 
оборачивает  chartNdviTimeSeries функцию, 
чтобы уменьшить частоту ее вызова при рисовании и редактировании геометрии*/
//задержка 0,5 сек
drawingTools.onDraw(ui.util.debounce(chartNdviTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartNdviTimeSeries, 500));
//пользовательский интерфейс
//определим словарь символов  
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
//определим ui.Panel для хранения инструкций приложения и кнопок рисования геометрии.
//ui.Label - для каждой строки инструкции 
//ui.Button - для каждого варианта рисования геометрии
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('1. Выбери дату начала расчета индекса NDVI.'),
    ui.Label('2. Выбери тип рисования.'),
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.point + ' Point',
      onClick: drawPoint,
      style: {stretch: 'horizontal'}
    }),
    ui.Label('3. Отметь на карте интересующую область.'),
    ui.Label('4. Происходит магия.'),
    ui.Label('5. Ты можешь скачать полученный график \n в csv, png или svg форматах.', {whiteSpace: 'pre'}),
    ui.Label('6. Белые области на графике означают, \n что была облачность. \n Получить значения индекса в это время \n невозможно на эту территорию \n по данной коллекции снимков.', {whiteSpace: 'pre'}),
    ui.Label(
        '7. Можно построить еще графиков')
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'NDVI',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Выбор NDVI на любую территорию.')
]);
inspectorPanel.add(intro);
Map.add(intro);
//Map.addLayer(ndvi, ndviVis, 'ndvi');
Map.add(controlPanel);