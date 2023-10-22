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
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 0.01,
        "gamma": 0.1
      }
    }) || {"opacity":0.01,"gamma":0.1},
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
Map.setCenter(50, 55, 3);
/*============================================================================================================*/
/*============================================ ВЫБОР ДАТЫ  =========================================*/
//ee.Date - создает новый объект для даты
//определили дату старта и конца 
var end_period = ee.Date(new Date().getTime())
var start_period = end_period.advance(-1000,'day');
//end_period - новая дата, получить время 
//start_period - -1000 дней от end_period
//отфильтровали коллекцию по датам 
var modis_date = dataset.filterDate(start_period, end_period)
/*============================================================================================================*/
/*============================================ ВЫБОР КАНАЛОВ (1)  =========================================*/
// каналы который мы будем использовать (ИЗМЕНИТЬ ЕСЛИ КАНАЛЫ ДРУГИЕ)
var modisBands = ['sur_refl_b03','sur_refl_b04','sur_refl_b01','sur_refl_b02','sur_refl_b06','sur_refl_b07'];
var lsBands = ['blue','green','red','nir','swir1','swir2'];
/*============================================================================================================*/
/*============================================ ОБЛАКА =========================================*/
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
  // ПОСМОТРЕТЬ КАК НАЗЫВАЕТСЯ КАНАЛ QA (ЕСЛИ НОВАЯ КОЛЛЕЦИЯ)
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
// vis parameters (ИЗМЕНИТЬ ЕСЛИ ДРУГАЯ КОЛЛЕКЦИЯ)
var visParams = {bands:['red','green','blue'],min:0,max:3000,gamma:1.3};
// // add the cloud free composite
// Map.addLayer(noCloud.median(),visParams,'MODIS Composite');
// // add the cloud composite
// Map.addLayer(Cloud.median(),visParams,'MODIS Composite clouds');
//снимок без облаков 
var noCloud_collection = noCloud.mosaic()
/*============================================================================================================*/
/*============================================ ОБЛАКА =========================================*/
//каналы (ИЗМЕНИТЬ ЕСЛИ ДРУГАЯ КОЛЛЕЦИЯ)
var blue = noCloud_collection.select('blue')
var green = noCloud_collection.select('green')
var red = noCloud_collection.select('red')
var nir = noCloud_collection.select('nir')
var swir1 = noCloud_collection.select('swir1')
var swir2 = noCloud_collection.select('swir2')
/*============================================================================================================*/
/*============================================ ФУНКЦИИ ДЛЯ РАССЧЕТА ИНДЕКСОВ  =========================================*/
//НЕОБХОДИМО ДОБАВИТЬ СВОЮ ФУНКЦИЮ ДЛЯ РАСЧЕТА 
/*SR - */
function addSR(noCloud_collection){
var SR = noCloud_collection.expression(
'N/R', {
      'N': noCloud_collection.select('nir'),
      'R': noCloud_collection.select('red'),
      'B': noCloud_collection.select('blue'),
      'G': noCloud_collection.select('green')
});
  var SR = SR.rename("SR")
      return noCloud_collection.addBands(SR)
}
//NLI - '(N * N – R)/ (N * N + R)'
function addNLI(noCloud_collection){
var NLI = noCloud_collection.expression(
'(N*N - R)/(N*N + R)', {
      'N': noCloud_collection.select('nir'),
      'R': noCloud_collection.select('red'),
      'B': noCloud_collection.select('blue'),
      'G': noCloud_collection.select('green')
});
  var NLI = NLI.rename("NLI")
      return noCloud_collection.addBands(NLI)
}
/*LAI - индекс листовой поверхности
https://inlnk.ru/Bpe4j2*/
function addLAI(noCloud_collection){
var LAI = noCloud_collection.expression(
'3.618 * (2.5 * (N - R) / (N + 6*R - 7.5*B + 1)) * 0.118', {
      'N': noCloud_collection.select('nir'),
      'R': noCloud_collection.select('red'),
      'B': noCloud_collection.select('blue'),
      'G': noCloud_collection.select('green')
});
  var LAI = LAI.rename("LAI")
      return noCloud_collection.addBands(LAI)
}
//SIPI (N–B)/(N–R)
function addSIPI(noCloud_collection){
var SIPI = noCloud_collection.expression(
'(N-B)/(N-R)', {
      'N': noCloud_collection.select('nir'),
      'R': noCloud_collection.select('red'),
      'B': noCloud_collection.select('blue'),
      'G': noCloud_collection.select('green')
});
  var SIPI = SIPI.rename("SIPI")
      return noCloud_collection.addBands(SIPI)
}
// (((2*(N^2-R^2))+1.5*N+0.5*R)/(N+R+0.5))
//((2*(N^2-R^2)+1.5*N+0.5*R)/(N+R+0.5))*(1-0.25*(2*(2*(N^2-R^2)+1.5*N+0.5*R)/(N+R+0.5))))+((R-0.125)/(1-R))
/*GEMI - */
function addGEMI(noCloud_collection){
var E = noCloud_collection.expression(
  '(((2*(N^2-R^2))+1.5*N+0.5*R)/(N+R+0.5))' , {
      'N': noCloud_collection.select('nir'),
      'R': noCloud_collection.select('red'),
      'B': noCloud_collection.select('blue'),
      'G': noCloud_collection.select('green')
  });
var GEMI = noCloud_collection.expression(
  '(((2*(N^2-R^2))+1.5*N+0.5*R)/(N+R+0.5))*(1-0.25*(((2*(N^2-R^2))+1.5*N+0.5*R)/(N+R+0.5)))-((R-0.125)/(1-R))' , {
      'N': noCloud_collection.select('nir'),
      'R': noCloud_collection.select('red'),
      'B': noCloud_collection.select('blue'),
      'G': noCloud_collection.select('green')
});
  var GEMI = GEMI.rename("GEMI")
      return noCloud_collection.addBands(GEMI)
}
/*============================================================================================================*/
/*============================================ ДАЛЕЕМ МОЗАИКУ  =========================================*/
// noCloud - коллекция изображений без облаков, отфильтрованных по дате 
var collection_with_index = noCloud.map(addSR);
var collection_with_index= collection_with_index.map(addNLI);
var collection_with_index= collection_with_index.map(addLAI);
var collection_with_index= collection_with_index.map(addSIPI);
var collection_with_index= collection_with_index.map(addGEMI);
//полная коллекция индексов, отфильтрованных по дате 
//print(collection_with_index)
//создали мозаику collection_with_index
var image_with_ndvi = collection_with_index.mosaic()
//из коллекции, отфильтрованной по дате, выбираем нужный каналы  
var sr = collection_with_index.select('SR');
var nli = collection_with_index.select('NLI');
var lai = collection_with_index.select('LAI');
var sipi = collection_with_index.select('SIPI');
var gemi = collection_with_index.select('GEMI');
var indices = collection_with_index.select('SR','NLI','LAI','SIPI','GEMI')
//коллекция изображений, отфильтрованных по дате, которые содержат только каналы 
print(indices)
// //коллекция изображений, отфильтрованных по дате, которые содержат только каналы 
// print(indexes)
/*============================================================================================================*/
/*============================================ ВИЗУАЛИАЦЗИЯ  =========================================*/
//параметры визуализации для GEMI
var VisGEMI = {
  min: 0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
//параметры визуализации для SIPI
var VisSIPI = {
  min: 0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
//параметры визуализации для SAVI
var VisLAI = {
  min: 0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
}; 
//параметры визуализации для NLI
var VisNLI = {
  min: 0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
//параметры визуализации для SR
var VisSR = {
  min: 0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
}; 
/*============================================================================================================*/
/*============================================ ДОБАВЛЯЕМ СЛАЙДЕР  =========================================*/
// созадем словарь
ee.Dictionary({start: start_period, end: end_period})
//передаем выбранные на слайдере значения функции renderSlider
  .evaluate(renderSlider) 
//функция добавления слайдера 
//dates - значения что заявлены изначально 
function renderSlider(dates) {
  var slider = ui.DateSlider({
    //start - выбранный день на слайдере, дата старта периода, значение
    start: dates.start.value, 
    //end - То что выбрали
    end: dates.end.value, 
    period: 8, 
    //в эту функцию передаются выбраные здесь значния 
    onChange: renderDateRange
  })
  Map.add(slider)
}
/*============================================================================================================*/
/*============================================ ДОБАВЛЯЕМ ФУНКЦИЮ ОПРЕДЕЛЕНИЕ ДАТ СО СЛАЙДЕРА  =========================================*/
//renderDateRange - функция, возвращенная со слайдера
//dateRange - даты, которые мы выбрали на слайдере 
function renderDateRange(dateRange) {
var sr = collection_with_index.select('SR');
var nli = collection_with_index.select('NLI');
var lai = collection_with_index.select('LAI');
var sipi = collection_with_index.select('SIPI');
var gemi = collection_with_index.select('GEMI');
  //создаем переменные 
  //ndvi - отфильтрованная по датам коллекция в выбранным одним каналом
   //  .filterDate - фильтруем коллецию по созданным датам старта и окончания 
   // .median() - берем среднее значение коллекции
  var image_sr = sr
     .filterDate(dateRange.start(), dateRange.end())
     .median()
  var image_nli = nli
     .filterDate(dateRange.start(), dateRange.end())
     .median()
  var image_lai = lai
     .filterDate(dateRange.start(), dateRange.end())
     .median()
  var image_sipi = sipi
     .filterDate(dateRange.start(), dateRange.end())
     .median()
  var image_gemi = gemi
     .filterDate(dateRange.start(), dateRange.end())
     .median()
//ui.Map.Layer - создает слой объекта, для отображения на карте
var layer_1 = ui.Map.Layer(image_sr, VisSR, 'SR')
var layer_2 = ui.Map.Layer(image_nli, VisNLI, 'NLI')
var layer_3 = ui.Map.Layer(image_lai, VisLAI, 'LAI')
var layer_4 = ui.Map.Layer(image_sipi, VisSIPI, 'SIPI')
var layer_5 = ui.Map.Layer(image_gemi, VisGEMI, 'GEMI')
//Map.layers() - возвращает список слоев, связанных с картой по умолчанию - ui.data.ActiveList
//ActiveList.reset(list) - заменяет все элементы списка новым списком (что указан)
Map.layers().reset([layer_1,layer_2,layer_3,layer_4,layer_5])
}
/*============================================================================================================*/
/*============================================ ДОБАВЛЯЕМ ПАНЕЛЬ  =========================================*/
/*приложение  отображает диаграмму среднего значения NDVI для пикселей, 
пересекающих нарисованную геометрию*/
//создаем переменную добаляение панели 
var inspectorPanel = ui.Panel({style: {width: '30%'}});
/*============================================================================================================*/
/*============================================ СОЗДАЕМ ИНСТРУМЕНТЫ РИСОВАНИЯ  =========================================*/
//создаем переменную инструменты рисования (возвращает набор инструментов рисования)
var drawingTools = Map.drawingTools();
//скорем инструменты рисования для задания своих
drawingTools.setShown(false);
/*============================================================================================================*/
/*============================================ СОЗДАЕМ МЕТОДЫ ДЛЯ РИСОВАНИЯ ГЕОМЕТРИИ =========================================*/
/*3) цикл while необходим, чтобы отчищать все созданные геометрии
которые были добавлены пользователем (приложение позволяет обрабатывать временные ряды для одной геометрии )*/
/* как работает цикл когда нарисовано больше одной гемеотрии: создаем переменную из этой геометрии, далее удаляем
ее из переменной с исходной геометрией, тем самым геометрия  отчищается*/
//drawingTools.layers() - возвращает список слоев геометрии в инструментах рисования 
//когда данный список больше нуля
while (drawingTools.layers().length() > 0) {
  //создавай перменную, которая возвращает нулевой (первый элемент из списка)
  var layer = drawingTools.layers().get(0);
  //далее удалаяй из списка геометрий данный элекмент
  drawingTools.layers().remove(layer);
}
//4)переменная для заполнения нашей геометрии
//создаем переменную для рисования геометрии в нашем слое
/*geometries: null - это обозначет, что геометрия в слое ничего 
не должна возвращать*/
//создаем переменную для отображения геметрии на карте
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
//drawingTools.layers() - возвращает список слоев геометрии в инструментах рисования 
//добавляем пемеременную отображения 
drawingTools.layers().add(dummyGeometry);
/*============================================================================================================*/
/*============================================ ФУНКЦИИ ДЛЯ ОТЧИСТИКИ ГЕОМЕТРИИ  =========================================*/
//создаем функции обратного вызова 
//они необходимы для создания диаграмм
//кнопки рисования 
/*определим кнопки, которые необходимы для 
1) отчистки существующей геометрии от GeometryLayer
2) кнопка для режима рисования (прямоугольник, многоугольник и точка)*/
//кнопка отчистки геометрии
function clearGeometry() {
  //drawingTools.layers() - возвращает список слоев геометрии в инструментах рисования 
  var layers = drawingTools.layers();
  //layers.get(0) - берем первый элемент из слоя с геметрией
  //.geometries() - берем геометрию из этого слоя
  //удаляем элементы
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
/*============================================================================================================*/
/*============================================ ФУНКЦИИ ДЛЯ РИСОВАНИЯ ГЕОМЕТРИИ  =========================================*/
/*определяем функции, которые будут нажиматься при нажатии
//на кнопку рисования
//каждая функция вначале отчистит предыдущие рисунки с помощью 
clearGeometry 
далее будет рисовать с помощью спец режима*/
//рисование прямугольника
function drawRectangle() {
  //объявлеем функцию отчистки геометрии
  clearGeometry();
  //устанавлияем форму рисования - прямоугольник
  //запускаем режи рисования прямоугольника
  drawingTools.setShape(rectangle);
 //по щелчку по карте рисуется данная геометрия
  drawingTools.draw();
}
//рисование полигона 
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
//рисование точки 
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
/*============================================================================================================*/
/*========================================== СОЗДАЛИ ПАНЕЛЬ ДЛЯ РИСОВАНИЯ ГРАФИКА  =========================================*/
//Создали панель для графика 
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: false}
});
//Добавили панель на карту
Map.add(chartPanel);
/*============================================================================================================*/
/*========================================== ФУНКЦИЯ СОЗДАНИЯ ГРАФИКА  =========================================*/
/*Определим функцию, которая вызывается  при завершении рисования геометрии 
и событиях редактирования для создания диаграммы временного ряда NDVI 
для нарисованной области*/
//функция показывает панель диаграммы
function chartNdviTimeSeries() {
  //chartPanel - панель графика
  //ui.chartPanel.style - возвращает словарь стилей виджета
  // Сделаем панель видимой при первом рисовании геометрии
  //!0 -> true , !1 -> false
  //если в панели графика нет - показать
  if (!chartPanel.style().get('shown')) {
    //установит (set) - показать 
    chartPanel.style().set('shown', true);
  }
  // получем нарисованную геометрию
  //инструменты рисования, список, первый элемент, 
  //получаем на выходе слой с геометрией 
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Ставим режим рисования обратно на ноль 
  drawingTools.setShape(null);
  //перменная получаем масштба карты (метров в пикселе)
  var mapScale = Map.getScale();
  //если в 1 пикселе более 5000 м, то масштаб увеличиается в 2 раза, если нет то также
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
/*============================================================================================================*/
/*========================================== ФУНКЦИЯ СОЗДАНИЯ ГРАФИКА НА ВЫБРАННУЮ ОБЛАСТЬ ИНТЕРЕСОВ =========================================*/
  //создаем переменную для отрисовки графика
  //ui.Chart.image.series - cоздает диаграмму из коллекции изображений
  var chart = ui.Chart.image.series ({
    //данные которые булут на диаграмме
    imageCollection:indices,
    //область по которой будем рисовать геометрию
    region: aoi,
    //reducer - для значение на оси y 
    reducer: ee.Reducer.median(),
    scale: scale,
    xProperty: 'system:time_start'
  })
  //.setSeriesNames - возвращает копию этой диаграммы с обновленными именами рядов.
    .setSeriesNames(['SR','NLI','LAI','SIPI','GEMI'])
   .setOptions({
                    titlePostion: 'none',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'значение индекса'}, //' 'NLI','LAI','SIPI','GEMI'
                    })
chartPanel.widgets().reset([chart]);
};
/*============================================================================================================*/
/*========================================== СТАРЫЙ ГРАФИК =========================================*/
  // var chart = ui.Chart.image
  //                 .seriesByRegion({
  //                   imageCollection:noCloud_collection_indexes, //ee.ImageCollection('MODIS/006/MOD13A2'),
  //                   regions: aoi,
  //                   reducer: ee.Reducer.mean(),
  //                   band: 'NDVI','EVI',
  //                   //yearReducer: ee.Reducer.mean(),
  //                   scale: scale,
  //                   xProperty: 'system:time_start'
  //                 })
  //                 .setOptions({
  //                   titlePostion: 'none',
  //                   legend: {position: 'none'},
  //                   hAxis: {title: 'Date'},
  //                   vAxis: {title: 'ndvi (x1e4)'},
  //                   series: {0: {color: '23cba7'}}
  //                 });
  // // Replace the existing chart in the chart panel with the new chart.
//   chartPanel.widgets().reset([chart]);
// }
/*============================================================================================================*/
/*========================================= ЗАДЕРЖКА =========================================*/
//настроим виджет для рисования
/*функция ui.util.debounce 
оборачивает  chartNdviTimeSeries функцию, 
чтобы уменьшить частоту ее вызова при рисовании и редактировании геометрии*/
//задержка 0,5 сек
//onDraw - обратный вызов при рисовании 
drawingTools.onDraw(ui.util.debounce(chartNdviTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartNdviTimeSeries, 500));
/*============================================================================================================*/
/*========================================= ОСНОВНАЯ ПАНЕЛЬ  =========================================*/
//определим словарь символов  
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
//СОЗДАЕМ ПАНЕЛЬ
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('1. Выбери дату начала расчета индексов.'),
    ui.Label('2. Выбери тип рисования.'),
    //создали кнопку
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      //по клику происходит срабатывание функции
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
/*============================================================================================================*/
/*========================================= ЗАГОЛОВОК  =========================================*/
var intro = ui.Panel([
  ui.Label({
    value: 'Наибольшее отклоненение',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Индексы, которые имеют наибольшее отклонение')
]);
inspectorPanel.add(intro);
/*============================================================================================================*/
/*========================================= ДОБАВЛЯЕМ ПАНЕЛИ НА КАРТУ  =========================================*/
Map.add(intro);
//Map.addLayer(ndvi, ndviVis, 'ndvi');
Map.add(controlPanel);