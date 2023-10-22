var table = ui.import && ui.import("table", "table", {
      "id": "users/estimacionesmagyp/Departamentos_INDEC_2015"
    }) || ee.FeatureCollection("users/estimacionesmagyp/Departamentos_INDEC_2015"),
    logo = ui.import && ui.import("logo", "image", {
      "id": "users/estimacionesmagyp/min_agricultura_ganaderia"
    }) || ee.Image("users/estimacionesmagyp/min_agricultura_ganaderia"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/estimacionesmagyp/CITIRICOSCOMPLETO"
    }) || ee.FeatureCollection("users/estimacionesmagyp/CITIRICOSCOMPLETO"),
    image55 = ui.import && ui.import("image55", "image", {
      "id": "users/estimacionesmagyp/Chaco_SantaFe_Sgo"
    }) || ee.Image("users/estimacionesmagyp/Chaco_SantaFe_Sgo"),
    image56 = ui.import && ui.import("image56", "image", {
      "id": "users/estimacionesmagyp/znucleo1"
    }) || ee.Image("users/estimacionesmagyp/znucleo1"),
    image57 = ui.import && ui.import("image57", "image", {
      "id": "users/estimacionesmagyp/Tuc_Santiago"
    }) || ee.Image("users/estimacionesmagyp/Tuc_Santiago"),
    image = ui.import && ui.import("image", "image", {
      "id": "users/estimacionesmagyp/cordoba18"
    }) || ee.Image("users/estimacionesmagyp/cordoba18"),
    image2 = ui.import && ui.import("image2", "image", {
      "id": "users/estimacionesmagyp/unitedsur"
    }) || ee.Image("users/estimacionesmagyp/unitedsur");
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
Map.setCenter(-61.132, -33.133, 5);
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
// Create and define visualization parameters and display Chaco_StaFe_Sgo
var paleta55 =['#bfbf77','#a57000','#e9ffbf','#d1ff00','#a40000','#7e99ff','#feff7d','#b17eff','#00ae4c','#702601','#7eb1b2','#92cc92'];
var imglpMasked = image55.updateMask(image55.lt(12));
Map.addLayer(imglpMasked, {min: 1, max: 12, palette: paleta55}, 'Chaco_StaFe_Sgo');
// Create and define visualization parameters and display Nucleo
var paleta56 =['#bfbf77','#a57000','#e9ffbf','#d1ff00','#a40000','#7e99ff','#feff7d','#b17eff','#00ae4c','#702601','#7eb1b2','#92cc92'];
Map.addLayer(image56, {min: 1, max: 12, palette: paleta56}, 'Nucleo');
var imglpMasked2 = image57.updateMask(image57.lt(12));
Map.addLayer(imglpMasked2, {min: 1, max: 12, palette: paleta55}, 'Tuc_Sgo');
// Create and define visualization parameters and display Sur Bs As LP
var paleta88 =['#bfbf77','#a57000','#e9ffbf','#d1ff00','#a40000','#7e99ff','#feff7d','#b17eff','#00ae4c','#702601','#7eb1b2','#92cc92'];
var imglpMaskede = image2.updateMask(image2.lt(12));
Map.addLayer(imglpMaskede, {min: 1, max: 12, palette: paleta88}, 'Sur_BsAs_LP');
// Create and define visualization parameters and display Cordoba
var paleta60 =['#bfbf77','#a57000','#e9ffbf','#d1ff00','#a40000'];
Map.addLayer(image, {min: 1, max: 5, palette: paleta60}, 'Cordoba');
var empty1 = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty1.paint({
  featureCollection: table,
  color: 0.5,
  width: 0.5
});
Map.addLayer(outline, {palette: 'black'}, 'Deptos');
///////////////////////////////// Cartografía forestal 
var cartografia_plantaciones = ee.FeatureCollection( 'users/mgaute/macizos_mapa_fina')
/// Estilos borde cartografía 
//Map.addLayer(cartografia_plantaciones.draw({color: '330033', strokeWidth: 1}), {}, 'macizos');
var palette2 = ['FED90D'];
// Paint the interior of the polygons with different colors.
var fills = empty.paint({
  featureCollection: cartografia_plantaciones,
  color: 'FED90D',
});
Map.addLayer(fills, {palette: palette2, max: 14}, 'Macizos');
//////////////////////////////////////////////////////////////////////////////////////////////
// Create an empty image into which to paint the features, cast to byte.
var Frutales= ee.FeatureCollection('users/estimacionesmagyp/CITIRICOSCOMPLETO');
var palette = ['ff8eaa'];
// Paint the interior of the polygons with different colors.
var fills = empty.paint({
  featureCollection: Frutales,
  color: 'ff8eaa',
});
Map.addLayer(fills, {palette: palette, max: 14}, 'Cítricos');
// Cartografía forestal Cortinas
/// Estilos borde cartografía 
var cartografia_plantaciones_cortinas = ee.FeatureCollection( 'users/mgaute/cortinas_mapa_fina')
//Map.addLayer(cartografia_plantaciones_cortinas.draw({color: '330066', strokeWidth: 1}), {}, 'cortinas');
var palette1 = ['#f5cf00'];
// Paint the interior of the polygons with different colors.
var fills = empty.paint({
  featureCollection: cartografia_plantaciones_cortinas,
  color: '#f5cf00',
});
Map.addLayer(fills, {palette: palette1, max: 14}, 'Cortinas');
// Add the maps and title to the ui.root.
//ui.root.widgets().reset([title, mapGrid]);
//ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
Map.add(ui.Label(
    'Mapa de Cultivos,  Campaña Fina 2019-2020   v01' 
    , {fontWeight: 'bold', fontSize: '24px'}));
// Leyenda
var legend = ui.Panel({style: {position: 'bottom-right', padding: '8px 15px'}});
var loading = ui.Label('', {margin: '2px 0 4px 0'});
legend.add(loading);
var title = ui.Label('Referencias', {fontWeight: 'bold', fontSize: '20px', color: 'green'});
var descr = ui.Label("Color - Clase ",{fontWeight: 'bold', fontSize: '18px', color: 'black'});
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
legend.add(makeRow('bfbf77', 'Rastrojos y Barbechos'));
legend.add(makeRow('a57000', 'Cereales de Invierno'));
legend.add(makeRow('e9ffbf', 'Recursos Forrajeros'));
legend.add(makeRow('a40000', 'Legumbres'));
legend.add(makeRow('d1ff00', 'Colza'));
legend.add(makeRow('7e99ff', 'Lino'));
legend.add(makeRow('b17eff', 'Caña de Azucar'));
legend.add(makeRow('702601', 'Papa'));
legend.add(makeRow('00ae4c', 'Tabaco'));
legend.add(makeRow('7eb1b2', 'Bajos'));
legend.add(makeRow('92cc92', 'Montes'));
legend.add(makeRow('FED90D', 'Macizos- Plantaciones Forestales'));
legend.add(makeRow('f5cf00', 'Cortinas - Plantaciones Forestales'));
legend.add(makeRow('ff8eaa', 'Citricos'));
Map.add(legend);
var branding = ui.Thumbnail({image:logo,params:{bands:['b1','b2','b3'],min:0,max:255},style:{width:'150px',height:'50px'}});
        legend.add(branding);
var dires = ui.Label("Dirección de Estimaciones Agrícolas",{fontWeight: 'bold', fontSize: '15px', color: 'black'});
legend.add(dires);
//Dirección Nacional de Desarrollo Foresto Industrial
var dires2 = ui.Label("Dirección Nacional de Desarrollo Foresto Industrial",{fontWeight: 'bold', fontSize: '15px', color: 'black'});
legend.add(dires2);