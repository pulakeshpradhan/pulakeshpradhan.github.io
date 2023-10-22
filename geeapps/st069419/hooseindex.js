//СОЗДАЛИ ПАНЕЛЬ
ui.root.clear();
var panel = ui.Panel({style: {width: '250px'}});
var map = ui.Map();
ui.root.add(panel).add(map);
map.setCenter(50, 55, 3);
map.style().set('cursor', 'crosshair');
// Define some constants.
var NDVI = 'NDVI';
var EVI = 'EVI';
var SAVI = 'SAVI';
var GREATER_THAN = 'Greater than';
var LESS_THAN = 'Less than';
var dataset = ee.ImageCollection("MODIS/006/MOD09A1")
//определили дату старта и конца 
var end_period = ee.Date(new Date().getTime())
var start_period = end_period.advance(-1000,'day');
//отфильтровали коллекцию по датам 
var modis_date = dataset.filterDate(start_period, end_period)
// каналы который мы будем использовать (ИЗМЕНИТЬ ЕСЛИ КАНАЛЫ ДРУГИЕ)
var modisBands = ['sur_refl_b03','sur_refl_b04','sur_refl_b01','sur_refl_b02','sur_refl_b06','sur_refl_b07'];
var lsBands = ['blue','green','red','nir','swir1','swir2'];
// СОЗДАЛИ ПУСТОЙ СПИСОК ФИЛЬТРА
var constraints = [];
// Load the WorldPop 2015 UN-adjusted population density estimates.
// (Note that these are only available for some countries, e.g. not the US.)
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
//каналы (ИЗМЕНИТЬ ЕСЛИ ДРУГАЯ КОЛЛЕЦИЯ)
var blue = noCloud_collection.select('blue')
var green = noCloud_collection.select('green')
var red = noCloud_collection.select('red')
var nir = noCloud_collection.select('nir')
var swir1 = noCloud_collection.select('swir1')
var swir2 = noCloud_collection.select('swir2')
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
//NDVI
function addNDVI(noCloud_collection) {
 var ndvi = noCloud_collection.normalizedDifference(['nir','red']).rename('NDVI');
 var noCloud_collection_indexes = noCloud_collection.addBands(ndvi)
return noCloud_collection_indexes; }
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
//параметры визуализации для NDVI
var VisEVI = {
  min: 0,
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
var collection_with_index = noCloud.map(addSAVI);
var savi = collection_with_index.select('SAVI').mosaic()
var saviVis = savi.visualize(VisSAVI)
var collection_with_index = noCloud.map(addNDVI);
var ndvi = collection_with_index.select('NDVI').mosaic()
var ndviVis = ndvi.visualize(VisNDVI)
var collection_with_index = noCloud.map(addEVI);
var evi = collection_with_index.select('EVI').mosaic()
var eviVis = evi.visualize(VisEVI)
// Create a layer selector that dictates which layer is visible on the map.
var select = ui.Select({
  items: [NDVI, EVI, SAVI],
  value: EVI,
  onChange: redraw,
});
panel.add(ui.Label('Выбери индекс для отображения на карте:')).add(select);
// Check-boxes to control which layers are shown in the inspector.
panel.add(ui.Label('Ты можешь нажать на карту и получить значение индексов, которые отметил:'));
var ndviCheck = ui.Checkbox(NDVI).setValue(true);
panel.add(ndviCheck);
var eviCheck = ui.Checkbox(EVI).setValue(false);
panel.add(eviCheck);
var saviCheck = ui.Checkbox(SAVI).setValue(false);
panel.add(saviCheck);
// Create the inspector panel, initially hiding it.
var inspector = ui.Panel({style: {shown: false}});
map.add(inspector);
// Register an onClick handler that populates and shows the inspector panel.
map.onClick(function(coords) {
  // Gather the image bands into a single Image that we can asynchronously sample.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var sample = ee.Image.cat(savi, ndvi, evi)
      .unmask(0).sample(point, 30).first().toDictionary();
  sample.evaluate(function(values) {
    inspector.clear();
  // Display a label that corresponds to a checked checkbox.
    if (ndviCheck.getValue()) {
      inspector.add(ui.Label('NDVI: ' + values.NDVI ));
    }
    if (eviCheck.getValue()) {
      inspector.add(ui.Label('EVI: ' + values.EVI));
    }
    if (saviCheck.getValue()) {
      inspector.add(ui.Label('SAVI: ' + values.SAVI));
    }
    inspector.add(ui.Button('Close', function() {
      inspector.style().set({shown: false});
    }));
    inspector.style().set({shown: true});
  });
});
// Добавление метки включенного фильтра
panel.add(ui.Label('Выбери индекс для задания параметров:'));
var constraint = ui.Select({
  items: [NDVI, EVI, SAVI],
  placeholder: 'Выбор индекса',
  onChange: selectConstraint,
});
panel.add(constraint);
// Новое ограничение
function addConstraint(name, image, defaultValue) {
  panel.add(ui.Label('Поставь фильтр для ' + name + ':' + '\n\n(можно выбрать меньше или \nбольше и значение для сравнения)', {whiteSpace: 'pre'}));
  var subpanel = ui.Panel({layout: ui.Panel.Layout.flow('horizontal')});
  // Create a greater-than / less-than selector.
  var mode = ui.Select({
    items: [GREATER_THAN, LESS_THAN],
    value: GREATER_THAN,
    onChange: redraw,
  });
  subpanel.add(mode);
  // Create a textbox for the filter threshold.
  var input = ui.Textbox({
    value: defaultValue,
    style: {width: '100px'},
    onChange: redraw,
  });
  subpanel.add(input);
  panel.add(subpanel);
  panel.add(ui.Label('Шпаргалка по индексам'));
  panel.add(ui.Label('Здесь будет что-то полезное для Поздняковой'));
  // Add this constraint to the global list so we can access the
  // constraints from the redraw() function in the future.
  constraints.push({
    image: image,
    mode: mode,
    value: input,
  });
  redraw();
}
function selectConstraint(name) {
  if (name == NDVI) {
    addConstraint(name, ndviVis, 0);
  } else if (name == EVI) {
    addConstraint(name, eviVis, 0);
  } else if (name == SAVI) {
    addConstraint(name, saviVis, 0);
  }
  constraint.setValue(null);
}
// Create a function to render a map layer configured by the user inputs.
function redraw() {
  map.layers().reset();
  var layer = select.getValue();
  var image;
  if (layer == EVI) {
    image = eviVis;
  } else if (layer == NDVI) {
    image = ndviVis;
  } else if (layer == SAVI) {
    image = saviVis;
  }
  for (var i = 0; i < constraints.length; ++i) {
    var constraint = constraints[i];
    var mode = constraint.mode.getValue();
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