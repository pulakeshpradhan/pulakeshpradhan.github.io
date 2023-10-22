///////////////////////////////////////////////////////////////////////////////
// Visor de Palma SPDE elaborado por: Osmar Yupanqui Carrasco, e-mail: osmar30asis@gmail.com
///////////////////////////////////////////////////////////////////////////////
// Cambiar estilo del puntero
Map.style().set('cursor', 'crosshair');
// Carga del shape de Palma
var palma_2016_2020 = ee.FeatureCollection("users/osmaryupanqui/Palm_oil/palma_2016_2020");
var palma_2016 = palma_2016_2020.filter(ee.Filter.eq('Fecha', '2016'));
var palma_2017 = palma_2016_2020.filter(ee.Filter.eq('Fecha', '2017'));
var palma_2018 = palma_2016_2020.filter(ee.Filter.eq('Fecha', '2018'));
var palma_2019 = palma_2016_2020.filter(ee.Filter.eq('Fecha', '2019'));
var palma_2020 = palma_2016_2020.filter(ee.Filter.eq('Fecha', '2020'));
var plantas_procesamiento = ee.FeatureCollection("users/osmaryupanqui/Palm_oil/plantas_procesamiento");
// Cargar logo de SPDE
var logo_spde = ee.Image("users/osmaryupanqui/Palm_oil/spde_logo");
// Algunas ubicaciones predefinidas de interes
var locationDict = {
  'Por defecto': {lon: -75.5, lat: -7.5, zoom: 8},
  'Palmas del Shanusi': {lon: -76.1457, lat: -6.0927, zoom: 12},
  'Palmas del Espino': {lon: -76.4756, lat: -8.3234, zoom: 12},
  'Ochosur': {lon: -74.9918, lat: -8.206, zoom: 11}
};
// Ubicaciones de plantas de procesamiento
var plantasDict = {
  'Por defecto': {lon: -75.5, lat: -7.5, zoom: 8},
  'OLAMSA-1': {lon: -74.958337, lat: -8.644962, zoom: 18},
  'OLAMSA-2': {lon: -74.832926, lat: -8.493357, zoom: 18},
  'OLPASA': {lon: -75.645119, lat: -9.058845, zoom: 18},
  'INDOLMASA': {lon: -74.970428, lat: -8.647854, zoom: 18},
  'INDEPAL UCAYALI SA': {lon: -74.984818, lat: -8.676068, zoom: 18},
  'AGROPECUARIA ROSSEL SRL': {lon: -74.934712, lat: -8.600249, zoom: 18},
  'OLPUSAC': {lon: -74.914589, lat: -8.58573, zoom: 18},
  'INDUSTRIAS PALM OLEO SAC': {lon: -74.626411, lat: -8.405051, zoom: 18},
  'OLNA PERU SAC': {lon: -74.80069, lat: -8.866212, zoom: 18},
  'INDUSTRIAS DEL SHANUSI SA': {lon: -76.166281, lat: -6.126094, zoom: 18},
  'INDUPALSA': {lon: -76.279067, lat: -6.310149, zoom: 18},
  'OLPESA': {lon: -74.80069, lat: -8.866212, zoom: 18},
  'INDUSTRIAS DEL ESPINO SA': {lon: -76.491652, lat: -8.334752, zoom: 18},
  'BIOANDES EIRL': {lon: -74.852523, lat: -8.511112, zoom: 18},
  'ASOCIACION AGROPECUARIA NUEVO AMANECER': {lon: -74.741255, lat: -8.630178, zoom: 18},
  'BIODIESEL UCAYALI SRL': {lon: -75.026255, lat: -8.435442, zoom: 18}
};
///////////////////////////////////////////////////////////////////////////////
// Añadir las capas
Map.addLayer(palma_2016.draw({color: 'A587CA', strokeWidth: 1}), {}, 'Línea Base de Palma 2016', 1);
Map.addLayer(palma_2017.draw({color: '36CEDC', strokeWidth: 1}), {}, 'Palma 2017', 1);
Map.addLayer(palma_2018.draw({color: '8FE968', strokeWidth: 1}), {}, 'Palma 2018', 1);
Map.addLayer(palma_2019.draw({color: 'FFEA56', strokeWidth: 1}), {}, 'Palma 2019', 1);
Map.addLayer(palma_2020.draw({color: 'FFB750', strokeWidth: 1}), {}, 'Palma 2020', 1);
Map.addLayer(plantas_procesamiento.draw({color: '#FE797B', pointRadius: 4}), {}, 'Plantas de Procesamiento', 1);
///////////////////////////////////////////////////////////////////////////////
// Creación del Panel introductorio con la interfaz
var panelIntro = ui.Panel();
panelIntro.style().set({
  maxHeight: '1000px',
  maxWidth: '300px',
  position: 'top-right',
  border: '2px solid black'
});
// Añadir título
var title = ui.Label('Cartografía de Palma Aceitera 2016-2020',
{fontSize: '35px', color: 'green', textAlign: 'center'});
// Añadir logo
var logo = ui.Thumbnail(logo_spde, {format: 'png', bands: ['b1', 'b2', 'b3'], min: 0, max: 255},
{}, {position: 'top-center'});
// Añadir texto descriptivo del proyecto
var subtitle = ui.Label('Resultados de la interpretación visual del cultivo de Palma Aceitera en el Perú, de los mosaicos bianuales de Planet NICFI. Para mayor información acceda a la página institucional:',
{fontSize: '15px'});
// Añadir texto de información adicional
var linkText = ui.Label('Sociedad Peruana de Ecodesarrollo (SPDE) 2021', {fontWeight: 'bold', textAlign: 'center'},
    'http://spdecodesarrollo.org/');
// Crear checkbox para las capas
var check2016 = ui.Checkbox('Línea Base de Palma 2016', true);
check2016.onChange(function(checked) {    
Map.layers().get(0).setShown(checked);  
});
check2016.style().set({
  backgroundColor: 'A587CA',
  padding: '8px',
  margin: '0',
  width: '250px',
  border: '1px solid black',
});
var check2017 = ui.Checkbox('Palma 2017', true);
check2017.onChange(function(checked) {    
Map.layers().get(1).setShown(checked);  
});  
check2017.style().set({
  backgroundColor: '36CEDC',
  padding: '8px',
  margin: '0',
  width: '250px',
  border: '1px solid black'
});
var check2018 = ui.Checkbox('Palma 2018', true);
check2018.onChange(function(checked) {    
Map.layers().get(2).setShown(checked);  
});  
check2018.style().set({
  backgroundColor: '8FE968',
  padding: '8px',
  margin: '0',
  width: '250px',
  border: '1px solid black'
});
var check2019 = ui.Checkbox('Palma 2019', true);
check2019.onChange(function(checked) {    
Map.layers().get(3).setShown(checked);  
});  
check2019.style().set({
  backgroundColor: 'FFEA56',
  padding: '8px',
  margin: '0',
  width: '250px',
  border: '1px solid black'
});
var check2020 = ui.Checkbox('Palma 2020', true);
check2020.onChange(function(checked) {    
Map.layers().get(4).setShown(checked);  
});  
check2020.style().set({
  backgroundColor: 'FFB750',
  padding: '8px',
  margin: '0',
  width: '250px',
  border: '1px solid black'
});
var check_plantas = ui.Checkbox('Plantas de Procesamiento', true);
check_plantas.onChange(function(checked) {    
Map.layers().get(5).setShown(checked);  
});  
check_plantas.style().set({
  backgroundColor: '#FE797B',
  padding: '8px',
  margin: '0',
  width: '250px',
  border: '1px solid black'
});
// Añadir barra de opacidad
var opacityTitle = ui.Label(
  'Ajuste la Opacidad aquí',
  {textAlign: 'center', fontWeight: 'bold'});
// Crear una barra de opacidad, que cambiara la opacidad para las capas
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 1,
  step: 0.01,
});
opacitySlider.onSlide(function(value) {
  Map.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
var viewPanel =
    ui.Panel([opacityTitle, opacitySlider], ui.Panel.Layout.Flow('horizontal'));
// Crear el menu pulldown
var locations = Object.keys(locationDict);
var locationSelect = ui.Select({
  items: locations,
  value: locations[0],
  onChange: function(value) {
    var location = locationDict[value];
    Map.setCenter(location.lon, location.lat, location.zoom);
  }
});
var locationPanel = ui.Panel([
  ui.Label('Algunos ejemplos de Palma', {'font-size': '20px'}), locationSelect
]);
// Añadir panel de plantas de procesamiento
// Crear el menu pulldown
var locations = Object.keys(plantasDict);
var locationSelect = ui.Select({
  items: locations,
  value: locations[0],
  onChange: function(value) {
    var location = plantasDict[value];
    Map.setCenter(location.lon, location.lat, location.zoom);
  }
});
var plantasPanel = ui.Panel([
  ui.Label('Plantas de procesamiento', {'font-size': '20px'}), locationSelect
]);
// Añadir texto de descarga
var downText = ui.Label('Click aquí para descargar la información', {fontWeight: 'bold', textAlign: 'center'},
    'https://drive.google.com/drive/u/0/folders/1J8hw3MeYOHUaeSRqLav4FbPkh4Wzvp-c');
// Añadir texto de créditos
var credits = ui.Label('Elaborado por:\n- Osmar Yupanqui Carrasco\ne-mail: osmar30asis@gmail.com\n- Erick Valerio Candia\ne-mail: erick.valerio.candia.28@gmail.com\n- Juan Julca Torres\ne-mail: jjulcatorres@gmail.com',
{fontSize: '12px', whiteSpace: 'pre'});
///////////////////////////////////////////////////////////////////////////////
// Añadir componentes al panel
panelIntro.add(title);
panelIntro.add(logo);
panelIntro.add(subtitle);
panelIntro.add(linkText);
panelIntro.add(check2016);
panelIntro.add(check2017);
panelIntro.add(check2018);
panelIntro.add(check2019);
panelIntro.add(check2020);
panelIntro.add(check_plantas);
panelIntro.add(viewPanel);
panelIntro.add(locationPanel);
panelIntro.add(plantasPanel);
panelIntro.add(downText);
panelIntro.add(credits);
///////////////////////////////////////////////////////////////////////////////
// Insertar el Panel introductorio
ui.root.insert(0, panelIntro);
// Definir algunas opciones como centrar el mapa y mapa base
Map.setOptions('SATELLITE');
Map.setCenter(-75.5, -7.5, 8);
Map.setControlVisibility(
    {all: false, zoomControl: true, scaleControl: true, mapTypeControl: true, fullscreenControl: true});
///////////////////////////////////////////////////////////////////////////////
// Añadir un panel central
var panelDatos = ui.Panel();
panelDatos.style().set({
  maxHeight: '150px',
  maxWidth: '250px',
  position: 'top-center',
  border: '2px solid black'
});
// Crear panel para ha de cultivo
var panelDatosText = ui.Label('Haga click para obtener información',
{fontSize: '12px', textAlign: 'center'});
// Crear canvas para calcular ha
var palma2 = palma_2016_2020.filter(ee.Filter.notNull(['Area_ha'])).reduceToImage({
  properties: ['Area_ha'],
  reducer: ee.Reducer.first()
});
panelDatos.add(panelDatosText);
var plantas_procesamiento = plantas_procesamiento.map(function (f) {
  return ee.Feature(f.geometry().buffer(500), {Empresa: f.get('Empresa')});
});
// Funcion on Click
Map.onClick(function(feature) {
    panelDatos.clear();
    var location = 'Long: ' + feature.lon.toFixed(4) + ' ' +
                 'Lat: ' + feature.lat.toFixed(4);
    panelDatos.widgets().set(1, ui.Label(location, {fontSize: '12px', textAlign: 'center'}));
    var click_point = ee.Geometry.Point(feature.lon, feature.lat);
    var palma_valor = palma2.reduceRegion(ee.Reducer.first(), click_point, 90);
    var featPalma = palma_valor.get('first').evaluate(function (f) {
      panelDatos.widgets().set(2, ui.Label('El área es: ' + f.toFixed(2) + ' ha', {fontSize: '12px', textAlign: 'center'}));
    });
    var featPlantas = plantas_procesamiento.filterBounds(click_point).first().get('Empresa').evaluate(function (e) {
      panelDatos.widgets().set(3, ui.Label('La empresa es: ' + e, {fontSize: '12px', textAlign: 'center'}));
    });
});
Map.add(panelDatos);