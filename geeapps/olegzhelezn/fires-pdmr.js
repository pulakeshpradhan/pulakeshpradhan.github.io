var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                108.20462522055143,
                55.74419161781929
              ],
              [
                108.20462522055143,
                53.17813402406619
              ],
              [
                110.79739865805143,
                53.17813402406619
              ],
              [
                110.79739865805143,
                55.74419161781929
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[108.20462522055143, 55.74419161781929],
          [108.20462522055143, 53.17813402406619],
          [110.79739865805143, 53.17813402406619],
          [110.79739865805143, 55.74419161781929]]], null, false),
    border = ui.import && ui.import("border", "table", {
      "id": "users/olegzhelezn/borders"
    }) || ee.FeatureCollection("users/olegzhelezn/borders");
// CLOUD MASKING: FUNCTIONS 
// This one deals with bits and is a bit complicated.
var getQABits = function(image, start, end, newName) {
  // Compute the bits we need to extract.
  var pattern = 0;
  for (var i = start; i <= end; i++) {
    pattern += Math.pow(2, i);
  }
  // Return a single band image of the extracted QA bits, giving the band a new name.
  return image.select([0], [newName])
              .bitwiseAnd(pattern)
              .rightShift(start);
  };
// A function to mask out cloudy pixels.
var cmask = function(image) {
  // Select the QA band.
  var QA = image.select('QA60'); // Different for different sensors.
  // Get the internal_cloud_algorithm_flag bit.
  var opaque = getQABits(QA, 10, 10, 'opaque').eq(0);
  var cirrus = getQABits(QA, 11, 11, 'cirrus').eq(0);
  image = image.updateMask(opaque);
  return image.updateMask(cirrus);
};
// PREPROCESSING
// Loading the image collection and selecting only imagery within bounds
var col_noclouds = ee.ImageCollection("COPERNICUS/S2_HARMONIZED")
    .filterBounds(geometry)
    // clipping
    .map(function(image) { return image.clip(geometry); })
    // filtering by cloud cover within clipped area
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 80))
    // selecting summer imagery
    .filter(ee.Filter.calendarRange(152, 243,'day_of_year')) // 01.06 - 31.08
    // https://www.free-online-calculator-use.com/day-of-year-calculator.html
    // applying a cloud mask
    .map(cmask)
    // calculating NBR
    .map(function(image) {
      var nbr = image.expression('(NIR - SWIR2)/(NIR + SWIR2)', {
        'NIR': image.select('B8'),
        'SWIR2': image.select('B12')
      }).rename('NBR');
      return image.addBands(nbr);
    })
    .map(function(image) {
      var ndvi = image.expression('(NIR - Red)/(NIR + Red)', {
        'NIR': image.select('B8'),
        'Red': image.select('B4')
      }).rename('NDVI');
      return image.addBands(ndvi);
    });
// ----------------------------------------------------------------------------------------------------------------
// REDUCING
var NBR_percent = function(start, end, index, percentile) {
  var s23 = col_noclouds.filterDate('2023-' + start, '2023-' + end).select(index).reduce(ee.Reducer.percentile([percentile])).setMulti({date: 2023, yr: '2023'});
  var s22 = col_noclouds.filterDate('2022-' + start, '2022-' + end).select(index).reduce(ee.Reducer.percentile([percentile])).setMulti({date: 2022, yr: '2022'});
  var s21 = col_noclouds.filterDate('2021-' + start, '2021-' + end).select(index).reduce(ee.Reducer.percentile([percentile])).setMulti({date: 2021, yr: '2021'});
  var s20 = col_noclouds.filterDate('2020-' + start, '2020-' + end).select(index).reduce(ee.Reducer.percentile([percentile])).setMulti({date: 2020, yr: '2020'});
  var s19 = col_noclouds.filterDate('2019-' + start, '2019-' + end).select(index).reduce(ee.Reducer.percentile([percentile])).setMulti({date: 2019, yr: '2019'});
  var s18 = col_noclouds.filterDate('2018-' + start, '2018-' + end).select(index).reduce(ee.Reducer.percentile([percentile])).setMulti({date: 2018, yr: '2018'});
  var s17 = col_noclouds.filterDate('2017-' + start, '2017-' + end).select(index).reduce(ee.Reducer.percentile([percentile])).setMulti({date: 2017, yr: '2017'});
  var s16 = col_noclouds.filterDate('2016-' + start, '2016-' + end).select(index).reduce(ee.Reducer.percentile([percentile])).setMulti({date: 2016, yr: '2016'});
  var percentiles = ee.ImageCollection([s16, s17, s18, s19, s20, s21, s22, s23]);
  return percentiles;
};
// For this, we are going to use yearly medians:
var percentile = 80;
// Selecting the index:
var index = 'NBR';
// Create a new image with medians as bands:
var NBRs = NBR_percent('06-01', '08-31', index, percentile).toBands();
// This function will assign names to the bands automatically.
Map.setCenter(109.13, 53.74, 10);
Map.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
var header = ui.Label('Гари на территории ФГБУ "Заповедное Подлеморье"', {fontSize: '28px', color: 'red'});
var text = ui.Label(
    'Составлено О. Железным, с.н.с. Часть отображенных изменений не связана с пожарами, а вызвана наличием снега, теней, разливами воды и т.д. Для таких участков характерны "прыгающие" кривые графиков. Для гарей же более типичны стабильно высокие значения индекса до пожара, снижение в течение 1-2 лет после пожара, и после этого стабильно низкие значения, или медленный рост. Как правило, гари - довольно крупные объекты. ',
    {fontSize: '13px', fontFamily: "Bahnschrift"});
var toolPanel = ui.Panel([header, text], 'flow', {width: '440px', padding: '5px 20px',});
ui.root.widgets().add(toolPanel);
// Create a hyperlink to an external reference.
var link1 = ui.Label(
    'Материал про пожары в Сибири. ', {fontSize: '13px', fontFamily: "Bahnschrift"},
    'https://greenpeace.ru/news/2021/08/10/greenpeace-poluchil-pervye-rezultaty-issledovanija-prichin-lesnyh-pozharov/');
var link2 = ui.Label(
    'ФБУ "Авиалесоохрана": тушение лесных пожаров.', {fontSize: '13px', fontFamily: "Bahnschrift"},
    'https://aviales.ru/');
var link3 = ui.Label(
    'Наши контакты. ', {fontSize: '13px', fontFamily: "Bahnschrift"},
    'https://zapovednoe-podlemorye.ru/contacts/');
var linkPanel = ui.Panel(
    [ui.Label('Полезные ссылки:', {fontWeight: 'bold'}), link3, link1, link2]);
toolPanel.add(linkPanel);
// A gap:
toolPanel.add(ui.Label(' ', {'font-size': '16px'}));
Map.addLayer(NBRs).setShown(0); // not visualising by default, we'll have a checkbox for that
// A tickbox menu:
toolPanel.add(ui.Label('Слои карты', {'font-size': '13px'}));
var checkbox1 = ui.Checkbox('Год падения NBR на >0.25 (в основном из-за пожаров)', true);
checkbox1.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(1).setShown(checked);
});
toolPanel.add(checkbox1);
var checkbox2 = ui.Checkbox('3-летний композит NBR; R:2017, G:2018, B:2019', false);
checkbox2.onChange(function(checked) {
  // Shows or hides the map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
toolPanel.add(checkbox2);
toolPanel.add(ui.Label('Кликните на карту для создания графика изменения NBR между 2016-2023', {'font-size': '15px'}));
// Setting a threshold:
var fires = NBRs.expression(
    "((y6 - y7) > 0.25) ? 2022" +
      ": ((y5 - y6) > 0.25) ? 2021" +
        ": ((y4 - y5) > 0.25) ? 2020" +
          ": ((y3 - y4) > 0.25) ? 2019" +
            ": ((y2 - y3) > 0.25) ? 2018" +
              ": ((y1 - y2) > 0.25) ? 2017" +
                ": ((y0 - y1) > 0.25) ? 2016" +
                  ": 0", {
      'y0': NBRs.select('0_NBR_p80'),
      'y1': NBRs.select('1_NBR_p80'),
      'y2': NBRs.select('2_NBR_p80'),
      'y3': NBRs.select('3_NBR_p80'),
      'y4': NBRs.select('4_NBR_p80'),
      'y5': NBRs.select('5_NBR_p80'),
      'y6': NBRs.select('6_NBR_p80'),
      'y7': NBRs.select('7_NBR_p80')
});
// Masking '0' values:
var fires_m0 = fires.updateMask(fires.gte(1));
// masking water and snow (low NDVI): 
var veg_mask = col_noclouds.filterDate('2016-06-01', '2016-08-31').select('NDVI').reduce(ee.Reducer.percentile([50]));
var fires_m = fires_m0.updateMask(veg_mask.gte(0.35));
// Loading a palette library and setting limits
var palettes = require('users/gena/packages:palettes');
var palette = palettes.colorbrewer.PuOr[8];
Map.addLayer(fires_m, {palette: palette, max: 2023, min: 2016}, 'Fire year');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint the edges with different colors and widths.
var outlines = empty.paint({
  featureCollection: border,
  color: 'red',
  width: 'NNH'
});
Map.addLayer(outlines);
// CLICKING!
var plot_panel = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '0px 0px',
    width: '400px',
  }
});
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ', ' +
                 'lat: ' + coords.lat.toFixed(2);
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(2, ui.Map.Layer(point, {color: 'FF0000'}));
  // Plotting a chart of change in NBR:
  var chart = function(images, shapes) { 
    return ui.Chart.image.series(images, shapes, ee.Reducer.mean(), 30, 'yr')
    .setOptions({
      title: 'Изменения медианных за летний сезон NBR',
      hAxis: {title: 'Год'},
      vAxis: {title: 'NBR'},
      legend: {position: 'none'},
      lineWidth: 1,
      pointSize: 3,
    });
  };
  plot_panel.widgets().set(0, chart(NBR_percent('06-01', '08-31', index, percentile), point));
});
toolPanel.add(plot_panel);
// LEGEND
// https://mygeoblog.com/2016/12/09/add-a-legend-to-to-your-gee-map/
// Set position of panel:
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Год пожара',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel:
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var pal = palette;
// name of the legend
var names = ['2016', '2017','2018', '2019', '2020', '2021', '2022', '2023'];
// Add color and and names
for (var i = 0; i < 8; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);