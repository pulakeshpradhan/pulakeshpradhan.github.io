//СОЗДАЛИ ПАНЕЛЬ
ui.root.clear();
var panel = ui.Panel({style: {width: '250px'}});
var map = ui.Map();
ui.root.add(panel).add(map);
map.setCenter(50, 55, 3);
map.style().set('cursor', 'crosshair');
var head = ui.Panel([
  ui.Label({
    value: 'Наибольшее отклоненение',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Индексы, которые имеют наибольшее отклонение')
]);
/*============================================================================================================*/
/*========================================= ДОБАВЛЯЕМ ПАНЕЛИ НА КАРТУ  =========================================*/
Map.add(head);
//Map.addLayer(ndvi, ndviVis, 'ndvi');
// Определили константы
var SR = 'SR';
var NLI = 'NLI';
var LAI = 'LAI';
var SIPI = 'SIPI';
var GEMI = 'GEMI';
var GREATER_THAN = 'Greater than';
var LESS_THAN = 'Less than';
// создали пустой список 
var constraints = [];
//Загрузили датасет
var dataset = ee.ImageCollection("MODIS/006/MOD09A1")
//Определили дату старта и конца
var end_period = ee.Date('2020-01-01')
var start_period = end_period.advance(-100,'day');
//Отфильтровали коллецию по датам 
var modis_date = dataset.filterDate(start_period, end_period)
// каналы который мы будем использовать (ИЗМЕНИТЬ ЕСЛИ КАНАЛЫ ДРУГИЕ)
var modisBands = ['sur_refl_b03','sur_refl_b04','sur_refl_b01','sur_refl_b02','sur_refl_b06','sur_refl_b07'];
var lsBands = ['blue','green','red','nir','swir1','swir2'];
/*===============================================================================================*/
/*============================= ДОБАВЛЕНИЕ ДАТА  =============================================================*/
/*
/*===============================================================================================*/
/*============================= ОБЛАКА =============================================================*/
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
//снимок без облаков 
var noCloud_collection = noCloud.mosaic()
/*=======================================================================================================*/
/*======================== КАНАЛЫ ======================================================================*/
//каналы (ИЗМЕНИТЬ ЕСЛИ ДРУГАЯ КОЛЛЕЦИЯ)
var blue = noCloud_collection.select('blue')
var green = noCloud_collection.select('green')
var red = noCloud_collection.select('red')
var nir = noCloud_collection.select('nir')
var swir1 = noCloud_collection.select('swir1')
var swir2 = noCloud_collection.select('swir2')
/*=======================================================================================================*/
/*============================================ ФУНКЦИИ ==================================================*/
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
/*============================================ ВИЗУАЛИЗАЦИЯ ==================================================*/
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
/*============================================ ИЗОБРАЖЕНИЯ ДЛЯ ПОКАЗА =========================================*/
var collection_with_index = noCloud.map(addSR);
var sr = collection_with_index.select('SR').mosaic()
var srVis = sr.visualize(VisSR)
var collection_with_index= collection_with_index.map(addNLI);
var nli = collection_with_index.select('NLI').mosaic()
var nliVis = nli.visualize(VisNLI)
var collection_with_index= collection_with_index.map(addLAI);
var lai = collection_with_index.select('LAI').mosaic()
var laiVis = lai.visualize(VisLAI)
var collection_with_index= collection_with_index.map(addSIPI);
var sipi = collection_with_index.select('SIPI').mosaic()
var sipiVis = sipi.visualize(VisSIPI)
var collection_with_index= collection_with_index.map(addLAI);
var gemi = collection_with_index.select('GEMI').mosaic()
var gemiVis = gemi.visualize(VisGEMI)
print(collection_with_index)
/*===============================================================================================*/
/*============================= ДОБАВЛЕНИЕ СЛАЙДЕРА ПО ДАТАМ  =============================================================*/
// // созадем словарь
// ee.Dictionary({start: start_period, end: end_period})
// //передаем выбранные на слайдере значения функции renderSlider
//   .evaluate(renderSlider) 
// //функция добавления слайдера 
// //dates - значения что заявлены изначально 
// function renderSlider(dates) {
//   var slider = ui.DateSlider({
//     //start - выбранный день на слайдере, дата старта периода, значение
//     start: dates.start.value, 
//     //end - То что выбрали
//     end: dates.end.value, 
//     period: 8, 
//     //в эту функцию передаются выбраные здесь значния 
//     //onChange: renderDateRange
//     onChange: redraw
//   })
//   panel.add(slider)
// }
/*============================================================================================================*/
/*============================================ ДОБАВЛЯЕМ ФУНКЦИЮ ОПРЕДЕЛЕНИЕ ДАТ СО СЛАЙДЕРА  =========================================*/
// //renderDateRange - функция, возвращенная со слайдера
// //dateRange - даты, которые мы выбрали на слайдере 
// function renderDateRange(dateRange) {
//   //создаем переменные 
//   //ndvi - отфильтрованная по датам коллекция в выбранным одним каналом
//   //  .filterDate - фильтруем коллецию по созданным датам старта и окончания 
//   // .median() - берем среднее значение коллекции
//   var ndviVis = ndviVis.filterDate(dateRange.start(), dateRange.end())
//   // .median()
//   var eviVis = eviVis.filterDate(dateRange.start(), dateRange.end())
//   // .median()
//   var saviVis = saviVis.filterDate(dateRange.start(), dateRange.end())
//   // .median()
// // //ui.Map.Layer - создает слой объекта, для отображения на карте
// // var layer_1 = ui.Map.Layer(ndviVis)
// // var layer_2 = ui.Map.Layer(eviVis)
// // var layer_3 = ui.Map.Layer(saviVis)
//   }
//мы объявляем данную функцию когда пишем renderDateRange    
/*============================================================================================================*/
/*============================================ ВЫБОР ИНДЕКСА ДЛЯ ПОКАЗА =========================================*/
//создаем переменную - выбор индексов 
var select = ui.Select({
  //список опций для выбора
  items: [SR,NLI,LAI,SIPI,GEMI],
  //Заполнитель, отображаемый, когда значение не выбрано.
  placeholder: 'Можешь выбрать индекс, по умолчанию LAI',
  //значение по умолчанию
  value: LAI,
  //onChange - обратный вызов, срабатывает, когда выбрали значение. 
  //передается текущее выбранное значение и данный виджет (в данном случае это redraw)
  onChange: redraw,
});
//добавили индекс на панель
panel.add(ui.Label('Выбери индекс для отображения на карте:')).add(select);
//в redraw мы передали индекс который выбрали в данном виджете
/*============================================================================================================*/
/*============================================ ДОБАВЛЕНИЕ ПАНЕЛИ ДЛЯ ВЫБОРА ИНДЕКСОВ  =========================================*/
//добавили надпись 
panel.add(ui.Label('Ты можешь нажать на карту и получить значение индексов, которые отметил:'));
//создали переменную - отметка галочкой и добавили на панель 
var sipiCheck = ui.Checkbox(SIPI).setValue(false);
panel.add(sipiCheck);
var gemiCheck = ui.Checkbox(GEMI).setValue(false);
panel.add(gemiCheck);
var srCheck = ui.Checkbox(SR).setValue(true);
panel.add(srCheck);
var nliCheck = ui.Checkbox(NLI).setValue(false);
panel.add(nliCheck);
var laiCheck = ui.Checkbox(LAI).setValue(false);
panel.add(laiCheck);
// SR,NLI,LAI,SIPI,GEMI
/*============================================================================================================*/
/*================================= ДОБАВЛЕНИЕ ПАНЕЛИ НА КАРТУ (ДАЛЕЕ ДЛЯ ПОКАЗА ЗНАЧЕНИЙ ИНДЕКСОВ =========================================*/
// ui.Panel - создат панель 
// shown: false - заранее панель скрыта
var inspector = ui.Panel({style: {shown: false}});
// добавили данную панель на карту
map.add(inspector);
/*============================================================================================================*/
/*============================================ ФУНКЦИЯ ДЛЯ ЧТЕНИЯ КООРДИНАТ С КАРТЫ  =========================================*/
// map.onClick - регистрирует вызов по карте
//возвращает функцию обратного вызова 
map.onClick(function(coords) {
  // регистрируем координаты 
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  //объединяем изображения в скобках в одно изображение
  var sample = ee.Image.cat(gemi, sipi, lai, nli, sr)
  //.unmask(0) - заменяет маску входного изображения выходным, где маска входного равна нулю
  //.sample - выбираем выбранные в point пиксели и возвращает их как FeatureCollection. 
  //.first() - возвращает первую запись из данной коллекции
  // .toDictionary() - извлекаем свойства объекта
      .unmask(0).sample(point, 30).first().toDictionary();
  // извлекаем свойства из полученного словаря и передаем их функции как аргумент values
  sample.evaluate(function(values) {
    //очиащаем панель
    inspector.clear();
  //если кнопка ndviCheck
    if (gemiCheck.getValue()) {
      //на панель добавляется надпсиь NDVI и значение ндви 
      inspector.add(ui.Label('GEMI: ' + values.GEMI ));
    }
    if (sipiCheck.getValue()) {
      inspector.add(ui.Label('SIPI: ' + values.SIPI));
    }
    if (laiCheck.getValue()) {
      inspector.add(ui.Label('LAI: ' + values.LAI));
    }
    if (nliCheck.getValue()) {
      inspector.add(ui.Label('NLI: ' + values.NLI));
    }
    if (srCheck.getValue()) {
      inspector.add(ui.Label('SR: ' + values.SR));
    }
    //Добавляем кнопку знакрытия с функций срыть панель
    inspector.add(ui.Button('Close', function() {
      inspector.style().set({shown: false});
    }));
    //показываем снова меню
    inspector.style().set({shown: true});
  });
});
/*============================================================================================================*/
/*============================================ ПАНЕЛЬ ВЫБОРА ИНДЕКСА ДЛЯ ЗАДАНИЯ ПАРАМЕТРОВ  =========================================*/
// Добавление метки включенного фильтра
panel.add(ui.Label('Выбери индекс для задания параметров:'));
var constraint = ui.Select({
  items: [SR,NLI,LAI,SIPI,GEMI],
  placeholder: 'Выбор индекса',
  onChange: selectConstraint,
});
panel.add(constraint);
/*============================================================================================================*/
/*============================================ ФУНКЦИЯ ДЛЯ МЕНЬШЕ БОЛЬШЕ  =========================================*/
// Функция берет на вход имя, изобрадение и значение
function addConstraint(name, image, defaultValue) {
  //добавляем лэйбл
  panel.add(ui.Label('Поставь фильтр для ' + name + ':' + '\n\n(можно выбрать меньше или \nбольшее значение для сравнения)', {whiteSpace: 'pre'}));
  //добавляем панель 
  //ui.Panel.Layout.flow - размещение горизонтально
  var subpanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal')});
  //создаем объект выбора - больше или меньше 
  var mode = ui.Select({
    items: [GREATER_THAN, LESS_THAN],
    value: GREATER_THAN,
    //redraw - функция обратного вызова, которая на вход принимает значение что мы выбрали 
    onChange: redraw,
  });
  //добавили на subpanel
  subpanel.add(mode);
  //создаем текстовое поле 
  var input = ui.Textbox({
    //placeholder - 
    //по умолачанию нет значения текстового поля
    value: defaultValue,
    style: {width: '100px'},
    //redraw - функция обратного вызова, которая на вход принимает значение что мы выбрали 
    onChange: redraw,
  });
  //добавили на subpanel
  subpanel.add(input);
  //добавили subpanel на оснонвную панель 
  panel.add(subpanel);
//добавили лэйблы на панель
  panel.add(ui.Label('Шпаргалка по индексам'));
  panel.add(ui.Label('Здесь будет что-то полезное для Поздняковой'));
/*============================================================================================================*/
/*============================================ СОЗДАЛИ СПИСОК И ЕГО ЗАПОЛНИЛИ =========================================*/
  //добавляем к списку 
  constraints.push({
    image: image, //
    mode: mode, //меньше или больше (что выбрали)
    value: input, //значение которое задали в текстовом поле (именно сколько больше или меньше)
  });
  redraw();
}
/*============================================================================================================*/
/*============================================ =========================================*/
function selectConstraint(name) {
  if (name == GEMI) {
    addConstraint(name, gemi, 0);
  } else if (name == SIPI) {
    addConstraint(name, sipi, 0);
  } else if (name == LAI) {
    addConstraint(name, lai, 0);
  } else if (name == NLI) {
    addConstraint(name, nli, 0);
  } else if (name == SR) {
    addConstraint(name, sr, 0);
  }
  constraint.setValue(null);
}
/*============================================================================================================*/
/*============================================ ВИЗУАЛИЗАЦИЯ СЛОЯ КАРТЫ, НАСТРОЕННОГО ПОЛЬЗОВАТЕЛЕМ =========================================*/
function redraw() {
    //map.layers() - возвращает список слоев, связанных с картой
    //.reset() - заменяет все слои новых списком
    map.layers().reset();
    //возвращаем переменную, которая возвращаем текущеее выбранное значение
    var layer = select.getValue();
    //задаем переменнюу image
    var image;
    if (layer == GEMI) {
      image = ndviVis;
    } else if (layer == SIPI) {
      image = nliVis;
    } else if (layer == LAI) {
      image = laiVis;
    } else if (layer == NLI) {
      image = sipiVis;
    } else if (layer == SR) {
      image = gemiVis;
    }
//задаем переменную i, пока i меньше длины массива, возвращаем ++i
  for (var i = 0; i < constraints.length; ++i) {
    //задаем перменную с индексом массива i 
    var constraint = constraints[i];
    //получаем значение 
    var mode = constraint.mode.getValue();
    //parseFloat - принимает строку в качестве аргумента и возвращает десятичное число 
    var value = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) { 
      image = image.updateMask(constraint.image.gt(value));
    } else {
      image = image.updateMask(constraint.image.lt(value));
    }
  }
  map.addLayer(image, {}, layer);
}
redraw();