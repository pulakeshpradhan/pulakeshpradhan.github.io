// NDVI, SAVI, ARVI, EVI, GCI, NBR, SIPI
//СОЗДАЛИ ПАНЕЛЬ
ui.root.clear();
var panel = ui.Panel({style: {width: '250px'}});
var map = ui.Map();
ui.root.add(panel).add(map);
map.setCenter(50, 55, 3);
map.style().set('cursor', 'crosshair');
var widget = ui.Panel({style:{position: 'bottom-right', height: '300px', width: '300px', border: '5px solid black'}});
var label_1 = ui.Label('Краткая справка')
widget.add(label_1);
var label = ui.Label('EVI позволяет оценивать состояние растений, как в условиях густого растительного покрова, так и в условиях разреженной растительности. Значения лежат в пределах от -1 до +1. ')
widget.add(label);
map.add(widget);
// Определили константы
var NDVI = 'NDVI';
var SAVI = 'SAVI';
var ARVI = 'ARVI';
var EVI = 'EVI';
var GCI = 'GCI';
var NBR = 'NBR';
var SIPI = 'SIPI';
var GREATER_THAN = 'Greater than';
var LESS_THAN = 'Less than';
// создали пустой список 
var constraints = [];
//Загрузили датасет
var dataset = ee.ImageCollection("MODIS/006/MOD09A1")
//Определили дату старта и конца
var end_period = ee.Date('2020-06-01')
var start_period = end_period.advance(-30,'day');
//Отфильтровали коллецию по датам 
var modis_date = dataset.filterDate(start_period, end_period)
// каналы который мы будем использовать (ИЗМЕНИТЬ ЕСЛИ КАНАЛЫ ДРУГИЕ)
var modisBands = ['sur_refl_b03','sur_refl_b04','sur_refl_b01','sur_refl_b02','sur_refl_b06','sur_refl_b07'];
var lsBands = ['blue','green','red','nir','swir1','swir2'];
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
//NDVI
function addNDVI(noCloud_collection) {
 var ndvi = noCloud_collection.normalizedDifference(['nir','red']).rename('NDVI');
 var noCloud_collection_indexes = noCloud_collection.addBands(ndvi)
return noCloud_collection_indexes; }
//SAVI
function addSAVI(noCloud_collection){
var savi = noCloud_collection.expression(
'(1.5 * (N - R)) / (N + R + 0.5)', {
      'N': noCloud_collection.select('nir'),
      'R': noCloud_collection.select('red'),
      'B': noCloud_collection.select('blue'),
      'G': noCloud_collection.select('green')
});
  var savi = savi.rename("SAVI")
  var noCloud_collection_indexes = noCloud_collection.addBands(savi)
  return noCloud_collection_indexes; }
//ARVI
function addARVI(noCloud_collection){
var arvi = noCloud_collection.expression(
'(N-(2*R)+B)/(N+2*R+B)', {
      'N': noCloud_collection.select('nir'),
      'R': noCloud_collection.select('red'),
      'B': noCloud_collection.select('blue'),
      'G': noCloud_collection.select('green')
});
  var arvi = arvi.rename("ARVI")
  var noCloud_collection_indexes = noCloud_collection.addBands(arvi)
  return noCloud_collection_indexes; }
//EVI
function addEVI(noCloud_collection) {
 var evi = noCloud_collection.expression(
    '2.5 * ((nir - red) / (nir + 6 * red - 7.5 * blue + 1))',
    {
      'nir': noCloud_collection.select('nir'),
      'red': noCloud_collection.select('red'),
      'blue': noCloud_collection.select('blue')
}
)
 var evi = evi.rename("EVI")
 var noCloud_collection_indexes = noCloud_collection.addBands(evi)
 return noCloud_collection_indexes;
}
//NBR
function addNBR(noCloud_collection){
var nbr = noCloud_collection.expression(
'(N-S)/(N+S)', {
      'N': noCloud_collection.select('nir'),
      'R': noCloud_collection.select('red'),
      'B': noCloud_collection.select('blue'),
      'G': noCloud_collection.select('green'),
      'S': noCloud_collection.select('swir1')
});
  var nbr = savi.rename("NBR")
  var noCloud_collection_indexes = noCloud_collection.addBands(nbr)
  return noCloud_collection_indexes; }
//GCI
function addGCI(noCloud_collection){
var gci = noCloud_collection.expression(
'N/(G-1)', {
      'N': noCloud_collection.select('nir'),
      'R': noCloud_collection.select('red'),
      'B': noCloud_collection.select('blue'),
      'G': noCloud_collection.select('green'),
});
  var gci = gci.rename("GCI")
  var noCloud_collection_indexes = noCloud_collection.addBands(gci)
  return noCloud_collection_indexes; }
//SIPI
function addSIPI(noCloud_collection){
var nbr = noCloud_collection.expression(
'(N-B)/(N-R)', {
      'N': noCloud_collection.select('nir'),
      'R': noCloud_collection.select('red'),
      'B': noCloud_collection.select('blue'),
      'G': noCloud_collection.select('green'),
      'S': noCloud_collection.select('swir1')
});
  var sipi = gci.rename("SIPI")
  var noCloud_collection_indexes = noCloud_collection.addBands(sipi)
  return noCloud_collection_indexes; }
/*============================================================================================================*/
/*============================================ ВИЗУАЛИЗАЦИЯ ==================================================*/
//параметры визуализации для NDVI
var VisNDVI = {
  min: -1.0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
//параметры визуализации для SAVI
var VisSAVI = {
  min: 0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
//параметры визуализации для ARVI
var VisARVI = {
  min: 0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
//параметры визуализации для EVI
var VisEVI = {
  min: 0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
//параметры визуализации для GCI
var VisGCI = {
  min: 0,
  max: 1.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
//параметры визуализации для NBR
var VisNBR = {
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
/*============================================================================================================*/
/*============================================ ИЗОБРАЖЕНИЯ ДЛЯ ПОКАЗА =========================================*/
var collection_with_index = noCloud.map(addNDVI);
var ndvi = collection_with_index.select('NDVI').mosaic()
var ndviVis = ndvi.visualize(VisNDVI)
var collection_with_index = noCloud.map(addSAVI);
var savi = collection_with_index.select('SAVI').mosaic()
var saviVis = savi.visualize(VisSAVI)
var collection_with_index = noCloud.map(addARVI);
var arvi = collection_with_index.select('ARVI').mosaic()
var arviVis = arvi.visualize(VisARVI)
var collection_with_index = noCloud.map(addEVI);
var evi = collection_with_index.select('EVI').mosaic()
var eviVis = savi.visualize(VisEVI)
var collection_with_index = noCloud.map(addGCI);
var gci = collection_with_index.select('GCI').mosaic()
var gciVis = gci.visualize(VisGCI)
var collection_with_index = noCloud.map(addNBR);
var nbr = collection_with_index.select('NBR').mosaic()
var nbrVis = nbr.visualize(VisNBR)
var collection_with_index = noCloud.map(addSIPI);
var sipi = collection_with_index.select('SIPI').mosaic()
var sipiVis = sipi.visualize(VisSIPI)
/*===============================================================================================*/
/*============================================ ВЫБОР ИНДЕКСА ДЛЯ ПОКАЗА =========================================*/
//создаем переменную - выбор индексов 
var select = ui.Select({
  //список опций для выбора
  items: [NDVI, SAVI, ARVI, EVI, GCI, NBR, SIPI],
  //Заполнитель, отображаемый, когда значение не выбрано.
  placeholder: 'Можешь выбрать индекс, по умолчанию NDVI',
  //значение по умолчанию
  value: NDVI,
  //onChange - обратный вызов, срабатывает, когда выбрали значение. 
  //передается текущее выбранное значение и данный виджет (в данном случае это redraw)
  onChange: redraw,
});
//добавили индекс на панель
panel.add(ui.Label('Выбери индекс для отображения на карте:')).add(select);
//в redraw мы передали индекс который выбрали в данном виджете
/*============================================================================================================*/
/*============================================ ДОБАВЛЕНИЕ ПАНЕЛИ ДЛЯ ВЫБОРА ИНДЕКСОВ  =========================================*/
//NDVI, SAVI, ARVI, EVI, GCI, NBR, SIPI    
//добавили надпись 
panel.add(ui.Label('Ты можешь нажать на карту и получить значение индексов, которые отметил:'));
//создали переменную - отметка галочкой и добавили на панель 
var ndviCheck = ui.Checkbox(NDVI).setValue(true);
panel.add(ndviCheck);
var saviCheck = ui.Checkbox(SAVI).setValue(false);
panel.add(saviCheck);
var arviCheck = ui.Checkbox(ARVI).setValue(false);
panel.add(arviCheck);
var eviCheck = ui.Checkbox(EVI).setValue(true);
panel.add(eviCheck);
var gciCheck = ui.Checkbox(GCI).setValue(false);
panel.add(gciCheck);
var nbrCheck = ui.Checkbox(NBR).setValue(false);
panel.add(nbrCheck);
var sipiCheck = ui.Checkbox(SIPI).setValue(true);
panel.add(sipiCheck);
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
  //NDVI, SAVI, ARVI, EVI, GCI, NBR, SIPI    
  //ndvi, savi, arvi, evi, gci, nbr, sipi
  var sample = ee.Image.cat(ndvi, savi, arvi, evi, gci, nbr, sipi)
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
    if (ndviCheck.getValue()) {
      //NDVI, SAVI, ARVI, EVI, GCI, NBR, SIPI    
  //ndvi, savi, arvi, evi, gci, nbr, sipi
      //на панель добавляется надпсиь NDVI и значение ндви 
      inspector.add(ui.Label('NDVI: ' + values.NDVI ));
    }
    if (saviCheck.getValue()) {
      inspector.add(ui.Label('SAVI: ' + values.SAVI));
    }
    if (arviCheck.getValue()) {
      inspector.add(ui.Label('ARVI: ' + values.ARVI));
    }
     if (eviCheck.getValue()) {
      inspector.add(ui.Label('EVI: ' + values.EVI));
    }
    if (gciCheck.getValue()) {
      inspector.add(ui.Label('GCI: ' + values.GCI));
    }
    if (nbrCheck.getValue()) {
      inspector.add(ui.Label('NBR: ' + values.NBR));
    }
    if (sipiCheck.getValue()) {
      inspector.add(ui.Label('SIPI: ' + values.SIPI));
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
 //NDVI, SAVI, ARVI, EVI, GCI, NBR, SIPI    
  //ndvi, savi, arvi, evi, gci, nbr, sipi
// Добавление метки включенного фильтра
panel.add(ui.Label('Выбери индекс для задания параметров:'));
var constraint = ui.Select({
  items: [NDVI, SAVI, ARVI, EVI, GCI, NBR, SIPI ],
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
 //NDVI, SAVI, ARVI, EVI, GCI, NBR, SIPI    
  //ndvi, savi, arvi, evi, gci, nbr, sipi
function selectConstraint(name) {
  if (name == NDVI) {
    addConstraint(name, ndvi, 0);
  } else if (name == SAVI) {
    addConstraint(name, savi, 0);
  } else if (name == ARVI) {
    addConstraint(name, arvi, 0);
  } else if (name == EVI) {
    addConstraint(name, evi, 0);
  } else if (name == GCI) {
    addConstraint(name, gci, 0);
  } else if (name == NBR) {
    addConstraint(name, nbr, 0);
  } else if (name == SIPI) {
    addConstraint(name, sipi, 0);
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
     //NDVI, SAVI, ARVI, EVI, GCI, NBR, SIPI    
  //ndvi, savi, arvi, evi, gci, nbr, sipi
    if (layer == NDVI) {
      image = ndviVis;
    } else if (layer == SAVI) {
      image = saviVis;
    } else if (layer == ARVI) {
      image = arviVis;
    } else if (layer == EVI) {
      image = eviVis;
    } else if (layer == GCI) {
      image = gciVis;
    } else if (layer == NBR) {
      image = nbrVis; 
    } else if (layer == SIPI) {
      image = sipiiVis;
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