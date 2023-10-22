//Múltiples vistas en Google Earth Engine
//http://www.gisandbeers.com/multiples-vistas-google-earth-engine/
//condiciones buenas
var geometry = ee.Geometry.Polygon([-92.50864,-5.30296, -75.23813,-5.30296 , -75.23813,1.94005, -92.50864,1.94005,-92.50864,-5.30296]);
var fecha1="2020-03-09";
var fecha2="2020-03-14";
//Ceniza Sangay
var fecha3='2020-03-15';
var fecha4='2020-03-19';
//Baja de actividades
var fecha5='2020-03-20';
var fecha6='2020-03-24';
//Toque de queda
var fecha7='2020-03-25';
var fecha8='2020-04-02';
var TROPOMISensor = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('tropospheric_NO2_column_number_density')
  .filterBounds(geometry)
  .map(function(image){return image.clip(geometry)});
var NO2Previo = TROPOMISensor.filterDate(fecha1, fecha2).mean(); //Primer momento
var NO2Sangay = TROPOMISensor.filterDate(fecha3,fecha4).mean(); //Segundo momento
var NO2Post1 = TROPOMISensor.filterDate(fecha5,fecha6).mean(); //Segundo momento
var NO2Post2 = TROPOMISensor.filterDate(fecha7,fecha8).mean(); //Segundo momento
var SimbologiaNO2  = {min:-0.00001, max: 0.00005, opacity: 0.70,
  palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]};
//Creación y linkeo entre mapas
var PanelMapas = [];
//Object.keys(ComposicionesRGB).forEach(function(name) {
  var Mapa = ui.Map();
  Mapa.add(ui.Label("Previo, desde "+fecha1+" hasta "+fecha2));
  Mapa.addLayer (NO2Previo, SimbologiaNO2, 'Emisiones Previas de NO2 troposferico');
  Mapa.setControlVisibility(false);
  PanelMapas.push(Mapa);
  var Mapa1 = ui.Map();
  Mapa1.add(ui.Label("Desde "+fecha3+" hasta "+fecha4));
  Mapa1.addLayer (NO2Sangay, SimbologiaNO2, 'Emisiones NO2 emisión ceniza Sangay');
  Mapa1.setControlVisibility(false);
  PanelMapas.push(Mapa1);
  var Mapa2 = ui.Map();
  Mapa2.add(ui.Label("Desde "+fecha5+" hasta "+fecha6));
  Mapa2.addLayer (NO2Post1, SimbologiaNO2, 'Emisiones NO2 pre Toque de queda');
  Mapa2.setControlVisibility(false);
  PanelMapas.push(Mapa2);
  var Mapa3 = ui.Map();
  Mapa3.add(ui.Label("Desde "+fecha7+" hasta "+fecha8));
  Mapa3.addLayer (NO2Post2, SimbologiaNO2, 'Emisiones NO2 post Toque de queda');
  Mapa3.setControlVisibility(false);
  PanelMapas.push(Mapa3);
  //});
var linker = ui.Map.Linker(PanelMapas);
//leyenda
// set position of panel
var legend = ui.Panel({
style: {
position: 'bottom-right',
padding: '0px 15px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'NO2(mol/m^2)',
style: {
fontWeight: 'bold',
fontSize: '10px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend.add(legendTitle);
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((SimbologiaNO2.max-SimbologiaNO2.min)/100.0).add(SimbologiaNO2.min);
var legendImage = gradient.visualize(SimbologiaNO2);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label({value:SimbologiaNO2['max'],
style: {
fontWeight: 'bold',
fontSize: '10px',
margin: '0 0 4px 0',
padding: '0'
}
}
)
],
});
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x80'},
style: {padding: '1px', position: 'bottom-left'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
widgets: [
ui.Label({value:SimbologiaNO2['min'],
style: {
fontWeight: 'bold',
fontSize: '10px',
margin: '0 0 4px 0',
padding: '0'
}}
)
],
});
legend.add(panel);
Mapa.add(legend);
//Configuración de la posición de los 4 mapas sobre la vista
var mapGrid = ui.Panel([
    ui.Panel([PanelMapas[0],PanelMapas[2]], null, {stretch: 'both'}),
    ui.Panel([PanelMapas[1],PanelMapas[3]], null, {stretch: 'both'})],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
// Controladores de título y escala-zoom para el primer mapa
PanelMapas[0].setControlVisibility({zoomControl: true});
PanelMapas[1].setControlVisibility({scaleControl: true});
var Titulo = ui.Label('Tropospheric vertical column of NO2 Ecuador/Sentinel 5P NRTI/L3_NO2 (media)', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '11 px'});
// Centrado del mapa en localización y carga de títulos y mapas en mosaico
PanelMapas[0].setCenter(-78.657, -1.404, 6);
ui.root.widgets().reset([Titulo, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));