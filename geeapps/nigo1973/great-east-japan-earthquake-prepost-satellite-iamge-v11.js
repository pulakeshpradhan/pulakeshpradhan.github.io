// Demonstrates before/after imagery comparison with a variety of dates.
var subset = Map.getBounds(true)
var geometry = /* color: #d63000 */ee.Geometry.Point([139.7788, 35.66005]); //shibuya
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
var filters = {
    startDate: ui.Textbox('YYYY-MM-DD', '2011-03-11'), //default
    endDate: ui.Textbox('YYYY-MM-DD', '2020-11-01'), //default
    applyButton: ui.Button('実行', applyFilters),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: '東日本大震災の被災地の今',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('JAXA「だいち」および欧州宇宙機構（ESA)「センチネル」による観測画像.'),
  ui.Label('震災前・震災時: 「だいち」 (2006-04-26 から 2011-04-18)'), filters.startDate,
  ui.Label('震災後: 「センチネル」(2015-06-23以降)'), filters.endDate,
  ui.Label('日付を入力後 "実行" ボタンを押してください.'),
  ui.Panel([
        filters.applyButton,
        filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal')),
  ui.Label({
    value: '概要.',
    style: {fontSize: '14px', fontWeight: 'bold'}
  }),
  ui.Label('東日本大震災からの被災地域がどのように復興されているのか、それを知るひつとの手段とし衛星画像による閲覧サイトを作成作成しました。.'),
  ui.Label('「だいち」に搭載したAVNIR2の観測画像は、設定した日付から２週間後までの観測画像を表示しています。画像が表示されない場合は、その期間での撮像画像がデータベースにないため、異なる日を設定して画像をご確認ください。'),
  ui.Label('「センチネル」の観測画像は、設定した日付から４週間後までの画像のなかで、比較的雲が少ない画像を抽出し、その平均処理した画像になります。'),
  ui.Label({
    value: '免責事項.',
    style: {fontSize: '14px', fontWeight: 'bold'}
  }),
  ui.Label('表示する衛星画像は、Google Earth Engineに提供されている衛星画像を処理し表示させています。データの評価・検証は行っていませんのでご理解ください。また、提供している画像の取扱については、Google Earth Engineの利用規約に則ってください。'),
  ui.Label({
    value: 'Credit.',
    style: {fontSize: '15px', fontWeight: 'bold'}
  }),
  ui.Label({
  value: 'ALOS/AVNIR2© JAXA.',
  style: {fontSize: "15px"},
  targetUrl: 'https://www.eorc.jaxa.jp/ALOS/en/alos-ori/'
  }),
  ui.Label({
  value: 'Copernicus Service information [2021].',
  style: {fontSize: "15px"},
  targetUrl: 'https://sentinel.esa.int/web/sentinel/user-guides/sentinel-2-msi/product-types/level-1c'
  }),
]);
// Set Date variables.
var start = filters.startDate.getValue();
//if (start) start = ee.Date(start);
var end = filters.endDate.getValue();
//if (end) end = ee.Date(end);
print(start)
print(end)
panel.add(intro);
// Add the panel to the ui.root.
ui.root.insert(0, panel);
/*
 * Configure the imagery
 */
var images = {
  '震災前・震災時': getWeeklyAvnir2Composite(start),
  '震災後': getWeeklySentinelComposite(end),
  //'背景地図':getWeeklySentinelComposite('2011-03-11'),
};
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60')
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
// Composite the Sentinel-2 ImageCollection for 4 weeks (inclusive) after the
// given date.
function getWeeklyAvnir2Composite(date) {
  var date = ee.Date(date);
  var avnir2 = ee.ImageCollection('JAXA/ALOS/AVNIR-2/ORI')
                          .filterDate(date, date.advance(2, 'week'))
                          .median(); // mean of images
  return avnir2.visualize({bands: ['B3', 'B2', 'B1'], min: 0.0, max: 255.0});
}
// Composite the Sentinel-2 ImageCollection for 4 weeks (inclusive) after the
// given date.
function getWeeklySentinelComposite(date) {
  var date = ee.Date(date);
  var sentinel2 = ee.ImageCollection('COPERNICUS/S2')
                          .filterDate(date, date.advance(4, 'week'))
                          .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20)) //  particl cloudy day for the last 4 weeks.
                          .map(maskS2clouds)
                          .median(); // mean of images
  return sentinel2.visualize({bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3});
}
print(getWeeklyAvnir2Composite(start))
/*
 * Set up the maps and control widgets
 */
// Create the left map, and have it display layer 0.
var leftMap = ui.Map();
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display layer 1.
var rightMap = ui.Map();
//rightMap.setControlVisibility(false);
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
// Adds a layer selection widget to the given map, to allow users to change
// which image is displayed in the associated map.
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('表示する画像の選択');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
/*
 * Tie everything together
 */
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(141.6255, 39.027753, 12); //Rikuzentakada in Japan.
// Add the panel to the ui.root.
ui.root.insert(0, panel);
function applyFilters() {
  // Set Date variables.
  var start2 = filters.startDate.getValue();
  //if (start) start = ee.Date(start);
  var end2 = filters.endDate.getValue();
  //if (end) end= ee.Date(end);
  print(start2)
  print(end2)
  var images = {
    '震災前・震災時':getWeeklyAvnir2Composite(start2),
    '震災後': getWeeklySentinelComposite(end2),
    //'背景地図':getWeeklySentinelComposite('2011-03-11'),
  };
  function getWeeklyAvnir2Composite(date) {
    var date = ee.Date(date);
    var avnir2 = ee.ImageCollection('JAXA/ALOS/AVNIR-2/ORI')
                            .filterDate(date, date.advance(2, 'week'))
                            .median(); // mean of images
    return avnir2.visualize({bands: ['B3', 'B2', 'B1'], min: 0.0, max: 255.0});
  }
    // given date.
  function getWeeklySentinelComposite(date) {
    var date = ee.Date(date);
    var sentinel2 = ee.ImageCollection('COPERNICUS/S2')
                            .filterDate(date, date.advance(4, 'week'))
                            .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20)) //  particl cloudy day for the last 4 weeks.
                           .map(maskS2clouds)
                            .median(); // mean of images
    return sentinel2.visualize({bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3});
  }
  print(getWeeklyAvnir2Composite(start2))
  // Create the left map, and have it display layer 0.
  var leftMap = ui.Map();
  leftMap.setControlVisibility(false);
  var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
  // Create the right map, and have it display layer 1.
  var rightMap = ui.Map();
  //rightMap.setControlVisibility(false);
  var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
  // Adds a layer selection widget to the given map, to allow users to change
  // which image is displayed in the associated map.
  function addLayerSelector(mapToChange, defaultValue, position) {
    var label = ui.Label('表示する画像の選択');
    // This function changes the given map to show the selected image.
    function updateMap(selection) {
     mapToChange.layers().set(0, ui.Map.Layer(images[selection]));
    }
    // Configure a selection dropdown to allow the user to choose between images,
    // and set the map to update when a user makes a selection.
    var select = ui.Select({items: Object.keys(images), onChange: updateMap});
    select.setValue(Object.keys(images)[defaultValue], true);
    var controlPanel =
       ui.Panel({widgets: [label, select], style: {position: position}});
    mapToChange.add(controlPanel);
  }  
  // Create a SplitPanel to hold the adjacent, linked maps.
  var splitPanel = ui.SplitPanel({
    firstPanel: leftMap,
    secondPanel: rightMap,
    wipe: true,
    style: {stretch: 'both'}
  });
  // Set the SplitPanel as the only thing in the UI root.
  ui.root.widgets().reset([splitPanel]);
  var linker = ui.Map.Linker([leftMap, rightMap]);
  leftMap.setCenter(141.6255, 39.027753, 12); //Shibuya in Japan
  // Add the panel to the ui.root.
  ui.root.insert(0, panel);
}