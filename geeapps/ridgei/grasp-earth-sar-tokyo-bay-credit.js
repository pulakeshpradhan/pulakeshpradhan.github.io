var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
var subset = Map.getBounds(true)
var geometry = /* color: #d63000 */ee.Geometry.Point([139.7788, 35.66005]); //Disney world
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
var LOWER_THRESH = 10
var UPPER_THRESH = 20
var filters = {
    startDate: ui.Textbox('YYYY-MM-DD', '2016-01-01'), //default
    endDate: ui.Textbox('YYYY-MM-DD', '2021-01-01'), //default
    applyButton: ui.Button('Apply Dates', applyFilters),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
// Create chart panel
var chartPanel = ui.Panel({
  style:
  {height: '235px', width: '600px', position: 'bottom-right', shown: false}
});
var chartShow = ui.Checkbox('hide chart', false);
chartShow.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  chartPanel.style().set('shown', !checked);
});
var explanetionShow = ui.Checkbox('hide explanation', false);
explanetionShow.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  explanation.style().set('shown', !checked);
});
var explanation = ui.Panel({
  widgets: [
    ui.Label({
        value: '赤く表示された箇所',
        style: {fontSize: '14px', fontWeight: 'bold', color: 'red'}
    }),
    ui.Label('Date1 の方が Date2 に比べて地表面に起伏が生じた箇所'),
    ui.Label({
        value: '青く表示された箇所',
        style: {fontSize: '14px', fontWeight: 'bold', color: 'blue'}
    }),
    ui.Label('Date2 の方が Date1 に比べて地表面に起伏が生じた箇所'),
    explanetionShow,
  ],
  style:{
    height: '180px',
    width: '310px',
    position: 'bottom-left',
    shown: true
  },
})
// Create an intro panel with labels.
var intro1 = ui.Panel([
  ui.Label({
    value: 'GRASP EARTH SAR',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Descendingは午前6時頃観測'),
  ui.Label('Ascendingは午後6時頃観測'),
  ui.Label({
    value: '(指定がない場合にはAscendingとなります)',
    style: {fontSize: '12px'}
  }),
]);
var select = ui.Select(
    {items: [{label:'Descending', value:'DESCENDING'}, {label:'Ascending', value:'ASCENDING'}],
      onChange: function() {
      }
});
var intro2 = ui.Panel({
  widgets: [
  ui.Label('Date1'), filters.startDate,
  ui.Label('Date2'), filters.endDate,
  ui.Panel([
    filters.applyButton,
    filters.loadingLabel
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Label({
  value: '地図上に以下のいずれかの図形を描き変化をグラフで表示',
      style: {fontSize: '14px', fontWeight: 'bold'}
  }),
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
  chartShow,
  ui.Label({
      value: 'データ存在する期間',
      style: {fontSize: '14px', fontWeight: 'bold'}
    }),
    ui.Label('2014-10-03 - 今日から2日前まで'),
  ui.Label('衛星画像は、Date1/2の日付の前後6日間の対象域の観測画像になります'),
  ui.Label('2016年4月以前は12日間に一度の観測が多いため、該当日に画像が表示されない場合は、Dateを変更して実行してください'),
  ui.Label({
    value: 'Credit.',
    style: {fontSize: '15px', fontWeight: 'bold'}
  }),
  ui.Label({
  value: 'Ridge-i',
  style: {fontSize: "13px"},
  targetUrl: 'https://ridge-i.com/'
  }),
  ui.Label({
  value: 'Contains modified Copernicus Sentinel data [2021].',
  style: {fontSize: "13px"},
  targetUrl: 'https://sentinel.esa.int/web/sentinel/user-guides/sentinel-1-sar/'
  })
  ]
});
// Set Date variables.
var start = filters.startDate.getValue();
if (start) start = ee.Date(start);
var end = filters.endDate.getValue();
if (end) end = ee.Date(end);
// Create panels to hold lon/lat values.
//var lon = ui.Label();
//var lat = ui.Label();
//panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
panel.add(intro1);
panel.add(select);
panel.add(intro2);
// Add the panel to the ui.root.
ui.root.insert(0, panel);
var collection_Asc= ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass','ASCENDING'))
    .select(['VV']);
var collection_Des = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass','DESCENDING'))
    .select(['VV']);
// Create a 3 band stack by selecting from different periods (months)
var im1_Asc = ee.Image(collection_Asc.filterDate(start.advance(-6,"day"), start.advance(6,"day")).mean());
var im2_Asc = ee.Image(collection_Asc.filterDate(end.advance(-6,"day"), end.advance(6,"day")).mean());
// var im1_Des = ee.Image(collection_Des.filterDate(start.advance(-6,"day"), start.advance(6,"day")).mean());
// var im2_Des = ee.Image(collection_Des.filterDate(end.advance(-6,"day"), end.advance(6,"day")).mean());
var vanished = im1_Asc.subtract(im2_Asc)
var built = im2_Asc.subtract(im1_Asc)
Map.setOptions('SATELLITE');
Map.centerObject(geometry, 12);
// Map.addLayer(im1_Asc.addBands(im2_Asc).addBands(im2_Asc), {min: -25, max: 10}, 'ASCENDING RGB Comp.');
// Map.addLayer(im1_Des.addBands(im2_Des).addBands(im2_Des), {min: -25, max: 10}, 'DESCENDING RGB Comp.');
Map.addLayer(vanished.addBands(built).addBands(built), {min: LOWER_THRESH, max: UPPER_THRESH, opacity:0.5}, 'Diff.');
// Map.add(explanation);
function applyFilters() {
  // Set Date variables.
  var start = filters.startDate.getValue();
  if (start) start = ee.Date(start);
  var end = filters.endDate.getValue();
  if (end) end = ee.Date(end);
  //print(start)
  //print(end)
  var pass_direction = select.getValue();
  if (!pass_direction) pass_direction = 'ASCENDING'
  var collection_Asc= ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass',pass_direction))
    .select(['VV']);
  var collection_Des = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass',pass_direction))
    .select(['VV']);
  var image1_Asc = collection_Asc
    .filterDate(start.advance(-6,"day"), start.advance(6,"day"));
  var image2_Asc = collection_Asc
    .filterDate(end.advance(-6,"day"), end.advance(6,"day"));
  var im1_Asc = ee.Image(image1_Asc.mean());
  var im2_Asc = ee.Image(image2_Asc.mean());
// 　var image1_Des = collection_Des
//     .filterDate(start.advance(-6,"day"), start.advance(6,"day"));
//   var image2_Des = collection_Des
//     .filterDate(end.advance(-6,"day"), end.advance(6,"day"));
//   var im1_Des = ee.Image(image1_Des.mean());
// 　var im2_Des = ee.Image(image2_Des.mean());
  //print Date information
  var single_image = collection_Asc.first()//reduceColumns(ee.Reducer.minMax(), ["system:time_start"])
  print('captured date: ', ee.Date(single_image.get('system:time_start')))
  // Experimental end
  var vanished = im1_Asc.subtract(im2_Asc)
  var built = im2_Asc.subtract(im1_Asc)
  var layer = ui.Map.Layer(vanished.addBands(built).addBands(built), {min: LOWER_THRESH, max: UPPER_THRESH, opacity:0.5}, 'Diff.');
// 　var layer_Des = ui.Map.Layer(im1_Des.addBands(im2_Des).addBands(im2_Des), {min: -25, max: 10}, 'DESCENDING RGB Comp.');
  Map.layers().reset([layer]);
}
// Implement drawing tool
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
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
Map.add(chartPanel);
function chartSarTimeSeries() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  print(aoi)
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  var pass_direction = select.getValue();
  if (!pass_direction) pass_direction = 'ASCENDING'
  var collection_Asc= ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass',pass_direction))
    .select(['VV']);
  var Sentinel1avT = collection_Asc.filterDate(start, end);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  // Set Date variables.
  //var start = filters.startDate.getValue();
  if (start) start = ee.Date(start);
  //var end = filters.endDate.getValue();
  if (end) end = ee.Date(end);
  // Set Date variables.
  var start2 = filters.startDate.getValue();
  if (start) start2 = ee.Date(start2);
  var end2 = filters.endDate.getValue();
  if (end) end2 = ee.Date(end2);
  var collection= ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass',pass_direction))
    .select(['VV']);
  var Sentinel1T = collection.filterDate(start2, end2);
  //var Sentinel1avT = collection_Asc.filterDate(start2, end2);
  // Create an image time series chart.
  var chart = ui.Chart.image.series({
    imageCollection: Sentinel1T,
    region: aoi,
    reducer: ee.Reducer.mean(),//
    scale: 10,
      //xProperty: 'system:time_start'
  });
  chart.setOptions({
      title: 'Sentinel-1 time-series differnce index',
      //vAxis: {title: 'VV',viewWindow: {min: -15, max: -5},},
      vAxis: {title: 'Objectness index'},
      hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7},
      }
  });
  chartPanel.widgets().reset([chart]);
}
drawingTools.onDraw(ui.util.debounce(chartSarTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartSarTimeSeries, 500));