var table = ui.import && ui.import("table", "table", {
      "id": "projects/ee-st069419/assets/land_1"
    }) || ee.FeatureCollection("projects/ee-st069419/assets/land_1");
//боковая панель
ui.root.clear();
var panel = ui.Panel({style: {width: '350px'}});
var map = ui.Map();
ui.root.add(panel).add(map);
map.setCenter(50, 55, 3);
map.style().set('cursor', 'crosshair');
//панель заголовка
var panel_main = ui.Panel({style: {height:'50px' ,  width: '550px' ,  position :'top-center'}});
map.add(panel_main)
var zagolovok = ui.Label(
  { value:'Определение вегетационных индексов по снимкам спекторметра MODIS',
    style: {fontWeight: 'bold', textAlign: 'left', stretch: 'horizontal'}})
panel_main.add(zagolovok)
// Определили константы
var NDVI = 'NDVI';
var MSAVI = 'MSAVI';
var ARVI = 'ARVI';
var EVI = 'EVI';
var GCI = 'GCI';
var NBR = 'NBR';
var SIPI = 'SIPI';
var LAI = 'LAI';
var RECI = 'RECI';
var GNDWI = 'GNDVI';
var NDWI = 'NDWI';
// var GREATER_THAN = 'Greater than';
// var LESS_THAN = 'Less than';
// // создали пустой список 
// var constraints = [];
//Загрузили датасет
var dataset = ee.ImageCollection("MODIS/006/MOD09A1")
//Создаем поле для дат 
var name_data = ui.Label(
  { value:'Выберите даты для фильтрации коллекции',
    style: {fontWeight: 'bold', textAlign: 'left', stretch: 'horizontal'}})
var lblstartDate = ui.Label({
    value:'Укажите дату начала фильтрации. Пример: 2021-05-01',
    style: {textAlign: 'left', stretch: 'horizontal'}});
var startDate = ui.Textbox({
  value: '2021-05-01',
  style: {textAlign:'center',stretch:'horizontal'},
  //здесь обратному вызову передается текст, который указан 
  onChange: date
});
var lblendDate = ui.Label(
  {
    value:'Укажите дату окончания фильтрации. Пример: 2021-08-31',
    style: {textAlign: 'left', stretch: 'horizontal'}}
);
var endDate = ui.Textbox({
  value: '2021-08-31',
  style: {textAlign:'center',stretch:'horizontal', margin:'5px'},
  //здесь обратному вызову передается текст, который указан 
  onChange: date
});
var button = ui.Button(
  {label : 'Загрузить',
  onClick: date } 
  )
//Функция фильтрации по дате 
function date() {
var sDate = startDate.getValue();
var eDate = endDate.getValue(); 
var modis = dataset.filterDate(sDate, eDate)
print(modis)
Map.addLayer(modis)
return modis
}
var modis_date = date()
panel = panel.add(name_data).add(lblstartDate).add(startDate).add(lblendDate).add(endDate).add(button)
// //Определили дату старта и конца
// var modis_date = dataset.filterDate('2011-01-01', '2021-01-01')
// var modis_date = modis_date.filter(ee.Filter.calendarRange(5, 8,'month'))
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
// vis parameters 
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
//LAI
function addLAI(noCloud_collection){
var lai = noCloud_collection.expression(
'3.618 * (2.5 * (N - R) / (N + 6*R - 7.5*B + 1)) * 0.118', {
      'N': noCloud_collection.select('nir'),
      'R': noCloud_collection.select('red'),
      'B': noCloud_collection.select('blue'),
      'G': noCloud_collection.select('green')
});
  var lai = lai.rename("LAI")
  var noCloud_collection_indexes = noCloud_collection.addBands(lai)
      return noCloud_collection_indexes 
}
//NDVI
function addNDVI(noCloud_collection) {
 var ndvi = noCloud_collection.normalizedDifference(['nir','red']).rename('NDVI');
 var noCloud_collection_indexes = noCloud_collection.addBands(ndvi)
return noCloud_collection_indexes; }
//NDWI
function addNDWI(noCloud_collection){
var ndwi = noCloud_collection.expression(
 '(G-N)/(G+N)', {
      'N': noCloud_collection.select('nir'),
      'R': noCloud_collection.select('red'),
      'B': noCloud_collection.select('blue'),
      'G': noCloud_collection.select('green')
});
  var ndwi = ndwi.rename("NDWI")
  var noCloud_collection_indexes = noCloud_collection.addBands(ndwi)
  return noCloud_collection_indexes; }
//MSAVI
function addMSAVI(noCloud_collection){
var savi = noCloud_collection.expression(
 '(1/2)*(2 *(N+1)- sqrt((2*N + 1)*(2*N + 1)- 8*(N-R)))', {
      'N': noCloud_collection.select('nir'),
      'R': noCloud_collection.select('red'),
      'B': noCloud_collection.select('blue'),
      'G': noCloud_collection.select('green')
});
  var savi = savi.rename("MSAVI")
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
//ReCI
function addReCI(noCloud_collection){
var reci = noCloud_collection.expression(
'(N/R)-1', {
      'N': noCloud_collection.select('nir'),
      'R': noCloud_collection.select('red'),
      'B': noCloud_collection.select('blue'),
      'G': noCloud_collection.select('green'),
      'S': noCloud_collection.select('swir1')
});
  var reci = reci.rename("RECI")
  var noCloud_collection_indexes = noCloud_collection.addBands(reci)
  return noCloud_collection_indexes; }
//GNDVI
function addGNDVI(noCloud_collection){
var gndvi = noCloud_collection.expression(
'(N-G)/(N+G)', {
      'N': noCloud_collection.select('nir'),
      'R': noCloud_collection.select('red'),
      'B': noCloud_collection.select('blue'),
      'G': noCloud_collection.select('green'),
      'S': noCloud_collection.select('swir1')
});
  var gndvi = gndvi.rename("GNDVI")
  var noCloud_collection_indexes = noCloud_collection.addBands(gndvi)
  return noCloud_collection_indexes; }
/*============================================================================================================*/
/*============================================ ВИЗУАЛИЗАЦИЯ ==================================================*/
//ReCI
var VisReCI = {
  min: 0,
  max: 13,
  palette: [
    '#04123C', '#D9CEC2' , '#957744', '#8CB00F', '#096404', '#042204',
  ],
};
//NDWI
var VisNDWI = {
  min: -1,
  max: 1,
  palette: 
   ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58']
  ,
};
//GNDVI
var VisGNDVI = {
  min: 0,
  max: 1,
  palette: [
    '#04123C', '#D9CEC2' , '#957744', '#8CB00F', '#096404', '#042204',
  ],
};
//LAI 
var VisLAI = {
  min: 0,
  max: 5,
  palette: [
    '#04123C', '#D9CEC2' , '#957744', '#8CB00F', '#096404', '#042204',
  ],
};
//NDVI
var VisNDVI = {
  min: -1,
  max: 1,
  palette:  [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    // '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
//MSAVI
var VisSAVI = {
  min: -1,
  max: 1,
  palette: [
    '01665e', '35978f', '80cdc1', 'c7eae5', 'f6e8c3', 'dfc27d', 'bf812d',
    '8c510a'
  ],
};
//ARVI
var VisARVI = {
  min: -1,
  max: 1,
  palette: [
    '2166ac', '4393c3', '92c5de', 'd1e5f0', 'fddbc7', 'f4a582', 'd6604d',
    'b2182b'
  ],
};
//EVI
var VisEVI = {
  min: 0,
  max: 1.0,
  palette: ['#d7191c','#fdae61','#ffffbf','#a6d96a','#1a9641']
};
//GCI
var VisGCI = {
  min: 0,
  max: 5.0,
  palette:['#74add1','#abd9e9','#fdae61','#fee08b','#ffffbf','#d9ef8b','#a6d96a','#66bd63','#1a9850']
};
//NBR
var VisNBR = {
  min: 0,
  max: 1.0,
  palette: ['#d7191c','#fdae61','#ffffbf','#a6d96a','#1a9641']
};
//SIPI
var VisSIPI = {
  min: 0,
  max: 20.0,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ],
};
/*============================================================================================================*/
/*============================================ ИЗОБРАЖЕНИЯ ДЛЯ ПОКАЗА =========================================*/
var collection_with_index = noCloud.map(addGNDVI);
var gndvicol = collection_with_index.select('GNDVI')
var gndvi = collection_with_index.select('GNDVI').median()
var gndviVis = gndvi.visualize(VisGNDVI).clip(table)
var collection_with_index = noCloud.map(addReCI);
var recicol = collection_with_index.select('RECI')
var reci = collection_with_index.select('RECI').median()
var reciVis = reci.visualize(VisReCI).clip(table)
var collection_with_index = noCloud.map(addNDVI);
var ndvicol = collection_with_index.select('NDVI')
var ndvi = collection_with_index.select('NDVI').median()
var ndviVis = ndvi.visualize(VisNDVI).clip(table)
var collection_with_index = noCloud.map(addLAI);
var laicol = collection_with_index.select('LAI')
var lai = collection_with_index.select('LAI').median()
var laiVis = lai.visualize(VisLAI).clip(table)
var collection_with_index = noCloud.map(addNDWI);
var ndwicoll = collection_with_index.select('NDWI')
var ndwi = collection_with_index.select('NDWI').median()
var ndwiVis = ndwi.visualize(VisNDWI).clip(table)
var collection_with_index = noCloud.map(addMSAVI);
var savicol = collection_with_index.select('MSAVI')
var savi = collection_with_index.select('MSAVI').median()
var saviVis = savi.visualize(VisSAVI).clip(table)
var collection_with_index = noCloud.map(addARVI);
var arvicol = collection_with_index.select('ARVI')
var arvi = collection_with_index.select('ARVI').median()
var arviVis = arvi.visualize(VisARVI).clip(table)
var collection_with_index = noCloud.map(addEVI);
var evicol = collection_with_index.select('EVI')
var evi = collection_with_index.select('EVI').median()
var eviVis = savi.visualize(VisEVI).clip(table)
var collection_with_index = noCloud.map(addGCI);
var gcicol = collection_with_index.select('GCI')
var gci = collection_with_index.select('GCI').median()
var gciVis = gci.visualize(VisGCI).clip(table)
var collection_with_index = noCloud.map(addNBR);
var nbrcol = collection_with_index.select('NBR')
var nbr = collection_with_index.select('NBR').median()
var nbrVis = nbr.visualize(VisNBR).clip(table)
var collection_with_index = noCloud.map(addSIPI);
var sipicol = collection_with_index.select('SIPI')
var sipi = collection_with_index.select('SIPI').median()
var sipiVis = sipi.visualize(VisSIPI).clip(table)
/*===============================================================================================*/
/*============================================ ВЫБОР ИНДЕКСА ДЛЯ ПОКАЗА =========================================*/
//создаем переменную - выбор индексов 
var select = ui.Select({
  //список опций для выбора
  items: [NDVI, MSAVI, ARVI, EVI, GCI, NBR, SIPI],
  //Заполнитель, отображаемый, когда значение не выбрано.
  placeholder: 'Выбор индекса. По умолчанию NDVI',
  //значение по умолчанию
  value: NDVI,
  //onChange - обратный вызов, срабатывает, когда выбрали значение. 
  //передается текущее выбранное значение и данный виджет (в данном случае это redraw)
  onChange: redraw,
});
//добавили индекс на панель
panel.add(ui.Label({
    value:'Выбери индекс для отображения на карте:',
    style: {fontWeight: 'bold', textAlign: 'left', stretch: 'horizontal'}})).add(select);
//в redraw мы передали индекс который выбрали в данном виджете
/*============================================================================================================*/
/*============================================ ДОБАВЛЕНИЕ ПАНЕЛИ ДЛЯ ВЫБОРА ИНДЕКСОВ  =========================================*/
//NDVI, SAVI, ARVI, EVI, GCI, NBR, SIPI    
//добавили надпись 
panel.add(ui.Label({
    value:'Выбери индекс(ы) для построения графика на карте:',
    style: {fontWeight: 'bold', textAlign: 'left', stretch: 'horizontal'}}))
panel.add(ui.Label(
    //value:
    'Можно выбрать индексы (один или несколько). Кликнуть в любое место карты. Тогда отобразится среднее значение этих индексов за выбранный промежуток времени и построится график изменения индекса в безоблачные дни'))
    //style: {fontWeight: 'bold', textAlign: 'left', stretch: 'horizontal'}}));
//создали переменную - отметка галочкой и добавили на панель 
var ndviCheck = ui.Checkbox(NDVI).setValue(true);
panel.add(ndviCheck);
var saviCheck = ui.Checkbox(MSAVI).setValue(false);
panel.add(saviCheck);
var arviCheck = ui.Checkbox(ARVI).setValue(false);
panel.add(arviCheck);
var eviCheck = ui.Checkbox(EVI).setValue(false);
panel.add(eviCheck);
var gciCheck = ui.Checkbox(GCI).setValue(false);
panel.add(gciCheck);
var nbrCheck = ui.Checkbox(NBR).setValue(false);
panel.add(nbrCheck);
var sipiCheck = ui.Checkbox(SIPI).setValue(false);
panel.add(sipiCheck);
var laiCheck = ui.Checkbox(LAI).setValue(false);
panel.add(laiCheck);
var reciCheck = ui.Checkbox(RECI).setValue(false);
panel.add(reciCheck);
var gndwiCheck = ui.Checkbox(GNDWI).setValue(false);
panel.add(gndwiCheck);
var ndwiCheck = ui.Checkbox(NDWI).setValue(false);
panel.add(ndwiCheck);
/*============================================================================================================*/
/*================================= ДОБАВЛЕНИЕ ПАНЕЛИ НА КАРТУ (ДАЛЕЕ ДЛЯ ПОКАЗА ЗНАЧЕНИЙ ИНДЕКСОВ =========================================*/
var panelchart = ui.Panel({style: {width: '400px' , position: 'bottom-center', shown:false
}})
    //.add(ui.Label('Кликните на карту для получения значения индекса и построения графика'));
map.add(panelchart)
// ui.Panel - создат панель 
// shown: false - заранее панель скрыта
var inspector = ui.Panel({style: {position: 'bottom-left', shown: false}});
// добавили данную панель на карту
map.add(inspector);
/*============================================================================================================*/
/*============================================ ФУНКЦИЯ ДЛЯ ЧТЕНИЯ КООРДИНАТ С КАРТЫ  =========================================*/
// map.onClick - регистрирует вызов по карте
//возвращает функцию обратного вызова 
map.onClick(function(coords) {
  // регистрируем координаты 
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  print(point)
  //объединяем изображения в скобках в одно изображение
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
    panelchart.clear()
  //если кнопка ndviCheck
    if (ndviCheck.getValue()) {
      //на панель добавляется надпсиь NDVI и значение ндви 
      inspector.add(ui.Label('NDVI: ' + values.NDVI ));
      panelchart.add(ui.Chart.image.series(ndvicol, point, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'NDVI Over Time',
        vAxis: {title: 'NDVI'},
        lineWidth: 1,
        pointSize: 3,
      }))
    }
    if (saviCheck.getValue()) {
      inspector.add(ui.Label('MSAVI: ' + values.MSAVI));
      //panelchart.clear();
      var chart = ui.Chart.image.series(savicol, point, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'MSAVI Over Time',
        vAxis: {title: 'MSAVI'},
        lineWidth: 1,
        pointSize: 3,
      });
      panelchart.add(chart)
    }
    if (arviCheck.getValue()) {
      inspector.add(ui.Label('ARVI: ' + values.ARVI));
      //panelchart.clear();
      var chart = ui.Chart.image.series(arvicol, point, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'ARVI Over Time',
        vAxis: {title: 'ARVI'},
        lineWidth: 1,
        pointSize: 3,
      });
      panelchart.add(chart)
    }
     if (eviCheck.getValue()) {
      inspector.add(ui.Label('EVI: ' + values.EVI));
      panelchart.clear();
      var chart = ui.Chart.image.series(evicol, point, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'EVI Over Time',
        vAxis: {title: 'EVI'},
        lineWidth: 1,
        pointSize: 3,
      });
      panelchart.add(chart)
    }
    if (gciCheck.getValue()) {
      inspector.add(ui.Label('GCI: ' + values.GCI));
      panelchart.clear();
      var chart = ui.Chart.image.series(gcicol, point, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'GCI Over Time',
        vAxis: {title: 'GCI'},
        lineWidth: 1,
        pointSize: 3,
      });
      panelchart.add(chart)
    }
    if (nbrCheck.getValue()) {
      inspector.add(ui.Label('NBR: ' + values.NBR));
      panelchart.clear();
      var chart = ui.Chart.image.series(nbrcol, point, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'NBR Over Time',
        vAxis: {title: 'NBR'},
        lineWidth: 1,
        pointSize: 3,
      });
      panelchart.add(chart)
    }
    if (sipiCheck.getValue()) {
      inspector.add(ui.Label('SIPI: ' + values.SIPI));
      panelchart.clear();
      var chart = ui.Chart.image.series(sipicol, point, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'SIPI Over Time',
        vAxis: {title: 'SIPI'},
        lineWidth: 1,
        pointSize: 3,
      });
      panelchart.add(chart)
    }
    if (laiCheck.getValue()) {
      inspector.add(ui.Label('LAI: ' + values.LAI));
      panelchart.clear();
      var chart = ui.Chart.image.series(laicol, point, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'LAI Over Time',
        vAxis: {title: 'LAI'},
        lineWidth: 1,
        pointSize: 3,
      });
      panelchart.add(chart)
    }
    if (reciCheck.getValue()) {
      inspector.add(ui.Label('RECI: ' + values.RECI));
      panelchart.clear();
      var chart = ui.Chart.image.series(recicol, point, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'RECI Over Time',
        vAxis: {title: 'RECI'},
        lineWidth: 1,
        pointSize: 3,
      });
      panelchart.add(chart)
    }
    if (gndviCheck.getValue()) {
      inspector.add(ui.Label('GNDVI: ' + values.GNDVI));
      panelchart.clear();
      var chart = ui.Chart.image.series(recicol, point, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'GNDVI Over Time',
        vAxis: {title: 'GNDVI'},
        lineWidth: 1,
        pointSize: 3,
      });
      panelchart.add(chart)
    }
    //Добавляем кнопку знакрытия с функций срыть панель
    inspector.add(ui.Button('Закрыть', function() {
      inspector.style().set({shown: false});
    }));
    //показываем снова меню
    inspector.style().set({shown: true});
    //Добавляем кнопку знакрытия с функций срыть панель
    panelchart.add(ui.Button('Закрыть', function() {
      panelchart.style().set({shown: false});
    }));
    //показываем снова меню
    panelchart.style().set({shown: true})
  });
});
/*============================================================================================================*/
/*============================================ ПАНЕЛЬ ВЫБОРА ИНДЕКСА ДЛЯ ЗАДАНИЯ ПАРАМЕТРОВ  =========================================*/
function redraw() {
    //map.layers() - возвращает список слоев, связанных с картой
    //.reset() - заменяет все слои новых списком
    map.layers().reset();
    //возвращаем переменную, которая возвращаем текущеее выбранное значение
    var layer = select.getValue();
    //задаем переменнюу image
    var image;
    if (layer == NDVI) {
      image = ndviVis;
      var palette =   [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ]
      var mini = -1
      var maxi = 1
      var label = 'NDVI'
      var name = 'Нормализованный Разностный Вегетационный Индекс '
      var text = 'Подходит для отслеживания динамики развития cельскохозяйственных культур'
      var formula = 'NDVI = (NIR – RED) / (NIR + RED)'
      var property = 'Можно использовать на протяжении всего сезона выращивания культур. '
      //NDVI дает самые точные результаты в середине сезона, в период наиболее активного развития вегетации
      var box = [-1, 10, 1, 5]
      var collection = ndvicol
    } else if (layer == MSAVI) {
      image = saviVis;
      var palette = ['01665e', '35978f', '80cdc1', 'c7eae5', 'f6e8c3', 'dfc27d', 'bf812d','8c510a']
      var mini = -1
      var maxi = 1
      var label = 'MSAVI'
      var name = 'Модифицированный Почвенный Вегетационный Индекс'
      var formula = '(2 *RED + 1 – sqrt((2*RED + 1)2 – 8 * (RED – NIR))) / 2' 
      var text = 'Разработан с целью уменьшения влияния почвенных шумов на результаты мониторинга. Применяют при отсутствии почвенного покрова, скудной вегетации или низком содержании хлорофилла в растениях.'
      var property = 'Индекс можно использовать для наблюдения за вегетацией на ранних стадиях развития, данный вегетационный индекс показателен даже при незначительном растительном покрове.'
      var box = [-1, 10, 1, 5]
    } else if (layer == NDWI) {
      image = ndwiVis;
      var palette = ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58']
      var mini = -1
      var maxi = 1
      var label = 'NDWI'
      var name = 'Нормализованный Разностный Водный Индекс'
      var formula = 'NDWI = (GREEN – NIR) / (GREEN + NIR)'
      var text = 'Индекс NDWI необходим для исследования водных объектов '
      var property = 'Используется для обнаружения затопленных сельскохозяйственных земель, выявления наводнений на полях, мониторинга эффективности ирригации, определения заболоченных территорий.'
      var box = [-1, 0, 1, 0.2]
    } else if (layer == ARVI) {
      image = arviVis;
      var palette = [
    '2166ac', '4393c3', '92c5de', 'd1e5f0', 'fddbc7', 'f4a582', 'd6604d',
    'b2182b'
  ]
      var mini = -1
      var maxi = 1
      var label = 'ARVI'
      var name = 'Атмосфероустойчивый Вегетационный Индекс '
      var formula = 'ARVI = (NIR – (2 * RED) + BLUE) / (NIR + (2 * RED) + BLUE)'
      var text = 'Особенность в том, что вегетационный индекс не подвержен влиянию атмосферных факторов (например, аэрозолей) и не зависит от топографических особенностей'
      var property = 'Используется: для наблюдения за регионами с высокой концентрацией атмосферных аэрозолей (дождей, тумана, пыли, дыма, загрязнения воздуха)'
      var box = [-1, 10, 1, 5]
    } else if (layer == EVI) {
      image = eviVis;
      var palette = palettes.cmocean.Speed[7]
      //var palette = ['#d7191c','#fdae61','#ffffbf','#a6d96a','#1a9641']
      var mini = -1
      var maxi = 1
      var label = 'EVI'
      var name = 'Усовершенствованный Вегетационный Индекс'
      var formula = 'EVI = 2.5 * ((NIR – RED) / ((NIR) + (C1 * RED) – (C2 * BLUE) + L))'
      var text = 'Вегетационный индекс, который корректирует результаты NDVI'
      var property = 'Шкала EVI варьируется от –1 до +1; для здоровой растительности показатель колеблется в пределах 0,2–0,8. Используется: для анализа вегетации в регионах Земли с большим количеством хлорофилла (например, дождевых лесах).'
      var box = [-1, 0, 1, 0.2]
    } else if (layer == GCI) {
      image = gciVis;
      var palette = ['#d7191c','#fdae61','#ffffbf','#a6d96a','#1a9641']
      var mini = -2
      var maxi = 2
      var label = 'GCI'
      var name = 'Зеленый Вегетационный Индекс Хлорофилла'
      var formula = 'GCI = NIR / GREEN – 1'
      var text = 'Содержание хлорофилла отражает физиологическое состояние вегетации. Если растения подвержены стрессу, этот показатель снижается, поэтому GCI можно использовать в качестве индикатора здоровья растений.'
      var property = 'Используется для мониторинга влияния сезонности, экологических стрессов или применяемых пестицидов на здоровье посевов.'
      var box = [-2, 0, 2, 0.2]
    } else if (layer == NBR) {
      image = nbrVis; 
      var palette = palettes.colorbrewer.Spectral[9]
      var mini = -1
      var maxi = 1
      var label = 'NBR'
      var name = 'Нормализованный Коэффициент Выгорания'
      var formula = 'NBR = (NIR – SWIR) / (NIR + SWIR)'
      var text = 'Индекс используют для выделения территорий, выгоревших в результате пожара'
      var property = 'NBR обычно применяют в сельском хозяйстве и лесоводстве для обнаружения происходящих пожаров, анализа силы пожара и мониторинга вегетации, уцелевшей после пожара.'
      var box = [-1, 0, 1, 0.2]
    } else if (layer == SIPI) {
      image = sipiVis;
      var palette = [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
    ]
    var mini = -2
    var maxi = 2
    var label = 'SIPI'
    var name = 'Структурный Индекс Интенсивности Пигментов'
    var formula = 'SIPI = (NIR – BLUE) / (NIR – RED)'
    var text = 'Индекс подходит для анализа вегетации с различной структурой.'
    var property = 'Используется для мониторинга состояния растений на территории с большим разнообразием видов растительности, для обнаружения ранних признаков болезней растений или других факторов вегетационного стресса.'
    var box = [-2, 0, 2, 0.2]
    } else if (layer == LAI) {
      image = laiVis;
      var palette = palettes.cmocean.Speed[7];
  //     var palette = [
  // '#04123C', '#D9CEC2' , '#957744', '#8CB00F', '#096404', '#042204',
  // ]
      var mini = 0
      var maxi = 5
      var label = 'LAI'
      var name = 'Индекс Листовой Поверхности '
      var property = 'Когда используется: для анализа состояния культур, а также как вводный параметр для модели прогнозирования продуктивности. В отличие от NDVI учитывает топографические особенности'
      var text = 'Индекс разработан для анализа листовой поверхности нашей планеты и анализирует количество листьев на определенной территории'
      var formula= 'Рассчитывается как отношение односторонней (освещенной) площади листьев к занимаемой ими поверхности почвы.' 
      var box = [0, 0, 5, 0.2]
    } else if (layer == ReCI) {
      image = reciVis;
      var palette = [
     '#04123C', '#D9CEC2' , '#957744', '#8CB00F', '#096404', '#042204',
  ]
      var mini = -1
      var maxi = 5
      var label = 'ReCI'
      var name = 'Хлорофильный Red Edge Индекс'
      var formula = 'ReCI = (NIR / RED) – 1'
      var text = 'ReCI показывает фотосинтетическую активность вегетационного покрова.'
      var property = 'ReCI наиболее показателен во время активного развития вегетации и не подходит для мониторинга растительности во время сбора урожая.'
      var box = [-1, 0, 5, 0.2]
    }
      else if (layer == GNDVI) {
      image = gndviVis;
      var palette = [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ]
      var mini = -1
      var maxi =1 
      var label = 'GNDVI'
      var name = 'Зеленый Нормализованный Разностный Вегетационный Индекс '
      var formula = 'GNDVI = (NIR – GREEN) / (NIR + GREEN)'
      var text = 'GNDVI измеряет содержание хлорофилла в растениях точнее, чем NDVI.'
      var property = 'Используется для обнаружения увядших или дозревающих культур при отсутствии крайнего красного канала; для мониторинга вегетации с высокой густотой покрова или на стадии дозревания культур.'
      var box = [-1, 0, 1, 0.2]
    }
//добавили слой
;
var legendPanel = ui.Panel({
  style: {position: 'bottom-right', width: '250px',padding: '8px 15px'}
  })
//фунукция которая возвращает панель с легендой
function index_info(titleText, palette, min, max) {
  // Legend Title
  var big_name = ui.Label({
    value: name, 
    style: {fontWeight: 'bold', textAlign: 'left', stretch: 'horizontal'}});
  var title = ui.Label({
    value: titleText, 
    style: {fontWeight: 'bold', textAlign: 'left', stretch: 'horizontal'}});
  var opisanie = ui.Label({
    value: text, 
    style: {textAlign: 'left', stretch: 'horizontal'}});
  var titleText = 'Формула'
  var mean_for = 'Для чего используется'
  var mean_for_label = ui.Label({
    value: mean_for, 
    style: {fontWeight: 'bold', textAlign: 'left', stretch: 'horizontal'}});
  var mean_for_opisanie = ui.Label({
    value: property, 
    style: {textAlign: 'left', stretch: 'horizontal'}});
  var formula_shet = ui.Label({
    value: formula, 
    style: {textAlign: 'left', stretch: 'horizontal'}});
  var formula_name = ui.Label({
    value: titleText, 
    style: {fontWeight: 'bold', textAlign: 'left', stretch: 'horizontal'}});
  var info = ui.Label({
    value: label, 
    style: {fontSize: '24px' , fontWeight: 'bold', textAlign: 'left', stretch: 'horizontal'}});
  // Colorbar
  var legend = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      // bbox: [-1, 0, 1, 0.2],
      bbox: box , 
      dimensions: '200x20',
      format: 'png', 
      min: mini, 
      max: maxi,
      palette: palette },
    style: {stretch: 'horizontal', margin: '8px 8px', maxHeight: '40px'},
  });
  // Legend Labels
  var labels = ui.Panel({
    widgets: [
      ui.Label(mini, {margin: '4px 10px',textAlign: 'left', stretch: 'horizontal'}),
      ui.Label((mini+maxi)/2, {margin: '4px 20px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(maxi, {margin: '4px 10px',textAlign: 'right', stretch: 'horizontal'})],
    layout: ui.Panel.Layout.flow('horizontal')});
  // Create a panel with all widgets
  legendPanel.add(info)
  legendPanel.add(big_name)
  legendPanel.add(formula_name)
  legendPanel.add(formula_shet)
  legendPanel.add(mean_for_label)
  legendPanel.add(mean_for_opisanie)
  legendPanel.add(legend)
  legendPanel.add(labels)
  //Добавляем кнопку знакрытия с функций срыть панель
    legendPanel.add(ui.Button('Close', function() {
      legendPanel.style().set({shown: false});
    }));
    //показываем снова меню
    legendPanel.style().set({shown: true})
  return legendPanel
 }
var colorBar = index_info('Значение индекса', palette, mini, maxi)
map.add(colorBar)
map.addLayer(image, {}, layer);
}
redraw();