var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -40.474472717518395,
            -9.373670236577924
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([-40.474472717518395, -9.373670236577924]);
var dataset3m = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(-365,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(0,'hour').millis()));
// .filter(ee.Filter.date( ee.Date(Date.now()).advance(-90,'day'), ee.Date(Date.now()).advance(-0,'day')));
var UmidityAboveGround3m1 = dataset3m.select('relative_humidity_2m_above_ground').median();
var UmidadeAboveGroundX11 = UmidityAboveGround3m1.gte(80).divide(UmidityAboveGround3m1.gte(80)).multiply(80);
var UmidadeAboveGroundX12 = UmidityAboveGround3m1.updateMask(UmidityAboveGround3m1.lt(80));
//var UmidadeAboveGroundX13 = UmidadeAboveGroundX1.multiply(UmidadeAboveGroundX12)
var UmidadeAboveGroundX14 = UmidadeAboveGroundX12.unmask(UmidadeAboveGroundX11);
var InsertStartYear = prompt('Entre o dia de início do período em dias em relação a hoje:',-8); 
var InsertEndYear = prompt('Entre o dia de fim  do período  em dias em relação a hoje:',-1);
var InsertDias = prompt('Entre o número de dias de duração do período em dias:',7);
var StartYear = ee.Number.parse(InsertStartYear).getInfo();
var EndYear = ee.Number.parse(InsertEndYear).getInfo();
var InsertDiasN =  ee.Number.parse(InsertDias).getInfo()
//var diaini = ee.Date(Date.now()).advance(-7,'day')
var dataset1w = ee.ImageCollection('NOAA/GFS0P25').filter(ee.Filter.eq('forecast_hours', 0))
.filter(ee.Filter.gt('forecast_time', ee.Date(Date.now()).advance(StartYear,'day').millis())).filter(ee.Filter.lt('forecast_time',  ee.Date(Date.now()).advance(EndYear,'day').millis()));
 //.filter(ee.Filter.date( ee.Date(Date.now()).advance(-7,'day'), ee.Date(Date.now()).advance(0,'hour')));
var UmidityAboveGround1w = dataset1w.select('relative_humidity_2m_above_ground');
var TERRACLIMATE1w = dataset1w.select( 'temperature_2m_above_ground');
var dia1w = (TERRACLIMATE1w.median().multiply(3.5)).multiply((((((UmidadeAboveGroundX14)).multiply(-1)).add(100)).multiply(0.0145))).multiply(58.93).multiply(InsertDiasN).divide(365);
var visParams100 = {
  min: 0.0,
  max: 100.0,
  opacity: 0.60,
  palette: [
    'FFFFFF', '000088','008800','777700', '880000'
  ],
};
Map.setCenter(-40.474472717518395,-9.373670236577924, 12)
Map.addLayer(dia1w.resample(), visParams100, 'Acumulado de ETo np Período consultado');
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({layout: ui.Panel.Layout.flow('vertical'),style: {width: '65%', height: '100%'}})
    .add(ui.Label('Clique no mapa para ver os valores Evapotranspiração ETo para o período definido'));
// Create an inspector panel with a horizontal layout.
var inspector0 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'bottom-left',
  }
});
// Add a label to the panel.
inspector0.add(ui.Label('Acumulados'));
Map.style().set('cursor', 'crosshair');
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Clear the panel and show a loading message.
  inspector0.clear();
  panel.clear();
 // var dias = InsertDiasN;
 // print(dias)
//  var dias1 = dias;
 // dias1 =dias1.getInfo();
  var date = ee.Date(Date.now());
  print(date)
  var date1 = date.format("YYYY-MM-dd");
  date1 =date1.getInfo();
  var dateini = ee.Date(Date.now()).advance(StartYear,'day');
  print(dateini)
  var dateini1 = dateini.format("YYYY-MM-dd");
  dateini1 =dateini1.getInfo();
  var datefim = ee.Date(Date.now()).advance(EndYear,'day');
  print(datefim)
   var datefim1 = datefim.format("YYYY-MM-dd");
   datefim1 =datefim1.getInfo();
  // Create or update the location label (the second widget in the panel)
  var location1 = 'Observatório Agroclimático Pomartec';
  var location = 'Evapotranspiração ETo em mm/m²'+ 
                  ' da amostra analisada nas Coordenadas : lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2) 
  inspector0.widgets().set(1, ui.Label(location1)).set(2, ui.Label(location));
var dattas = 'Data da consulta: ' + date1 +';  Data inícial do peródo: '+ dateini1 +';  Data Final  do período: '+ datefim1+ ';  Número de dias do período: '+ InsertDiasN ;
  inspector0.widgets().set(3, ui.Label(dattas));
  // Add a red dot to the map where the user clicked.
  var geometry = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(geometry, {color: 'FF0000'},'ponto consulta', true));
  var geometryyy = /* color: #d63000 */ee.Geometry.Point([-40.474472717518395,-9.373670236577924]);
Map.layers().set(4, ui.Map.Layer(geometryyy, {color: 'FFFF00'},'Fazenda')); 
  var sampledPoint0w = dia1w.reduceRegion(ee.Reducer.mean(), geometry, 1);
  var computedValue0w = sampledPoint0w.get('temperature_2m_above_ground');
  // Request the value from the server and use the results in a function.
  computedValue0w.evaluate(function(result) {
    // Add a label with the results from the server.
    inspector0.widgets().set(4, ui.Label({
      value: 'Acumulado de ETo no período em mm/m²: ' + result.toFixed(2),
      style: {stretch: 'vertical'}
    }));
  });
var panel2 = ui.Panel({style: {width: '65%'}})
    .add(ui.Label('Fontes: GFS: Sistema de previsão global de dados de atmosfera de 384 horas (para alterar o período, acione a ferramenta novamente no Menu' )); 
Map.centerObject(geometry, 17);
panel.widgets().set(1, inspector0).set(2, panel2);
});
Map.setOptions('HYBRID');
var geometryyy = /* color: #d63000 */ee.Geometry.Point([-40.474472717518395,-9.373670236577924]);
//Map.centerObject(geometryyy, 16);
Map.layers().set(3, ui.Map.Layer(geometryyy, {color: 'FFFF00'},'Fazenda')); 
// Add the panel to the ui.root.
// Add the panel to the ui.root.
ui.root.add(panel);