var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "LST_Night_1km"
        ],
        "max": 0.7,
        "palette": [
          "ff0000",
          "f1ff23",
          "42ca39"
        ]
      }
    }) || {"opacity":1,"bands":["LST_Night_1km"],"max":0.7,"palette":["ff0000","f1ff23","42ca39"]},
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "MODIS/006/MYD11A1"
    }) || ee.ImageCollection("MODIS/006/MYD11A1"),
    chile = ui.import && ui.import("chile", "table", {
      "id": "users/erollero/HDIChile/regiones"
    }) || ee.FeatureCollection("users/erollero/HDIChile/regiones");
// from MODIS Aqua from years 2002 to 2019
//Como obtener la info de un punto
// Select the dataset of night temperature
var lstpoint = ee.ImageCollection('MODIS/006/MYD11A1').select('LST_Night_1km')
              // Filter on specified year range defined by the question asker
                                .filterDate('2002-01-01','2019-12-31')
                                .filter(ee.Filter.calendarRange(244,365, 'day_of_year'));
var lstagrados = lstpoint.map(function(image){
  var props = image.toDictionary(image.propertyNames());
    return ee.Image(image.multiply(0.02).subtract(275.15).setMulti(props));
});
Map.setOptions("HYBRID")
Map.centerObject(chile, 9)
// Cálculo de la temperatura mínima por debajo de 0°C.
var MinLSTc = lstagrados.min().clip(chile);
print("MinMinima" , MinLSTc);
Map.addLayer(MinLSTc, {
  min: -8, max: 5,
  palette:  ['#084594', '#2171b5','#4292c6','#6baed6','#9ecae1','#c6dbef ','#deebf7','#f7fbff ','#fff5f0','#fee0d2','#fcbba1','#fc9272','#fb6a4a','#ef3b2c','#cb181d','#99000d']},
  'Temperatura Mínima Absoluta');
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: chile,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: '001327'}, 'V,VI;VII,VIII Región');
//grafico de la coleccion al hacer clic
var title_chart = 'Grafico de Temperaturas'
Map.onClick(function(coords) {
    var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                  'lat: ' + coords.lat.toFixed(4)
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    // Map.layers().set(1, ui.Map.Layer(point, {color: '0000FF'}));
    var chart1 = ui.Chart.image.series(lstagrados,point,ee.Reducer.first(), 1200)
        .setOptions({
          title: title_chart + " | lon/lat: " + coords.lon.toFixed(4) + ' / ' + coords.lat.toFixed(4),
          vAxis: {title: "lstagrados", viewWindow : {max : 20, min : -7.5}},
          legend: "top",
          interpolateNulls: true,
          })
    panel.widgets().set(0, chart1);
})
var panel = ui.Panel({style: {
  width: '40%',
  padding: '8px 15px',
  position: 'bottom-right'}})
    .add(ui.Label('Click on the map to generate historical chart'))
Map.add(panel)
// Add the maps and title to the ui.root.
//ui.root.widgets().reset([title, mapGrid]);
//ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
Map.add(ui.Label(
    'Land Surface Temperature - Modis-Aqua, Night 1Km.    ' 
    , {fontWeight: 'bold', fontSize: '24px'}));