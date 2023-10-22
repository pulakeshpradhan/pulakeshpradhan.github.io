var table = ui.import && ui.import("table", "table", {
      "id": "users/erollero/Departamentos_INDEC_2015"
    }) || ee.FeatureCollection("users/erollero/Departamentos_INDEC_2015"),
    logo = ui.import && ui.import("logo", "image", {
      "id": "users/estimacionesmagyp/min_agricultura_ganaderia"
    }) || ee.Image("users/estimacionesmagyp/min_agricultura_ganaderia"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/estimacionesmagyp/CITIRICOSCOMPLETO"
    }) || ee.FeatureCollection("users/estimacionesmagyp/CITIRICOSCOMPLETO");
Map.setCenter(-63.285, -30.813, 6);
//////////////////////////////////////////////////////////////////////////////////////////////
// Create an empty image into which to paint the features, cast to byte.
var empt = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empt.paint({
  featureCollection: table3,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: '#ff8eaa'}, 'Citrus');
//////////////////////////////////////////////////////////////////////////////////////////////
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: table,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: 'black'}, 'Deptos');
// Add the maps and title to the ui.root.
//ui.root.widgets().reset([title, mapGrid]);
//ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
Map.add(ui.Label(
    'Mapa de Cítricos de la República Argentina 2019' 
    , {fontWeight: 'bold', fontSize: '24px'}));
// Leyenda
var legend = ui.Panel({style: {position: 'bottom-right', padding: '8px 15px'}});
var loading = ui.Label('', {margin: '2px 0 4px 0'});
legend.add(loading);
var title = ui.Label('Referencias', {fontWeight: 'bold', fontSize: '18px', color: 'green'});
var descr = ui.Label("Color - Clase ",{fontWeight: 'bold', fontSize: '15px', color: 'black'});
legend.add(title);
legend.add(descr);
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
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
legend.add(makeRow('ff8eaa', 'Cítricos'));
Map.add(legend);
var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'150px',height:'50px'}});
        legend.add(branding);
var dires = ui.Label("Dirección de Estimaciones Agrícolas",{fontWeight: 'bold', fontSize: '15px', color: 'black'});
legend.add(dires);
var l8 = ee.ImageCollection("COPERNICUS/S2_SR")
        .filterDate('2019-05-01', '2020-05-30')
        .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 2));
    var ndvi = l8.map(function(image) {
      return image.select().addBands(image.normalizedDifference(['B8','B4']));});
    var panel = ui.Panel();
    panel.style().set('width', '300px');
    var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'200px',height:'60px'}});
        panel.add(branding);
    var intro = ui.Panel([
      ui.Label({value: 'NDVI Campaña 19/20',
        style: {fontSize: '20px', fontWeight: 'bold'}  }),
      ui.Label('Realice un click sobre un lote.')]);
    panel.add(intro);
    var lat = ui.Label();
    var lon = ui.Label();
    panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
    Map.onClick(function(coords) {
      lat.setValue('lat: ' + coords.lat.toFixed(5)),
      lon.setValue('lon: ' + coords.lon.toFixed(5));
      var point = ee.Geometry.Point(coords.lon, coords.lat);
      var dot = ui.Map.Layer(point, {color: 'FF0000'});
      Map.layers().set(1, dot);
      var ndviChart = ui.Chart.image.series(ndvi, point, ee.Reducer.mean(), 500);
      ndviChart.setOptions({
        title: 'NDVI Serie de Tiempo',vAxis: {title: 'NDVI'},
        hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
      });  panel.widgets().set(2, ndviChart);});
    Map.style().set('cursor', 'crosshair')
    ui.root.insert(0, panel);