//Importar el area de estudio
var Incendio= ee.FeatureCollection('users/dilmillano/Incendio');
var MovimientosMasa= ee.FeatureCollection('users/dilmillano/MovimientosMasa');
var AvenidasTorrenciales= ee.FeatureCollection('users/dilmillano/AvenidasTorrenciales1');
var RellenoAOI = ee.Image().byte();
//AvenidasTorrenciales = RellenoAOI.paint({featureCollection: AvenidasTorrenciales, width: 5,});
//MovimientosMasa = RellenoAOI.paint({featureCollection: MovimientosMasa, width: 5,});
Map.addLayer(Incendio,{color: '#e49551'},'Amenaza y riesgo por incendios forestales altos',true);
Map.addLayer(AvenidasTorrenciales, {color: 'red', opacity: 0.5}, 'Amenaza y riesgo por avenidas torrenciales altas');
Map.addLayer(MovimientosMasa, {color: '#9b816b'}, 'Amenaza y riesgo por movimientos en masa altos');
Map.centerObject( Incendio,15);
print(Incendio);
// Descripcion del etiquetado de elementos de la leyenda
var Etiquetas = [
  'Amenaza y riesgo por incendios forestales altos = (531,246Ha)',
  'Amenaza y riesgo por avenidas torrenciales altas = (29,907 Ha) ',  
  'Amenaza y riesgo por movimientos en masa altos = (5,966 Ha)',
  ];
// Configuracion del titulo y posicion de la leyenda
var Titulo = ui.Label({
  value: 'Amenaza y riesgos altos del sector del Ocaso', // Titulo de la leyenda
  style: {fontWeight: 'bold', fontSize: '15px', margin: '0px 0px 15px 0px', fontFamily: 'Cambria'}}); // Estilo y dimensiones
var Leyenda = ui.Panel({
  style: {position: 'bottom-right', padding: '10px 20px'}}); // Posicion, altura y anchura
Leyenda.add(Titulo);
var Simbologia = ['e49551', 'ff0000', '9b816b'];
var Simbolos = function(simbolo, texto) {
var TextoLeyenda = ui.Label({
  value: texto,
  style: {margin: '3px 0px 5px 7px', fontFamily: 'Cambria'}}); // Posicion en la separacion de los textos
var CajaLeyenda = ui.Label({
  style: {backgroundColor: '#' + simbolo,
  padding: '7px', // TamaÃ±o del simbolo
  margin: '0px 0px 6px 0px'}}); // Posicion en la separacion de los simbolos
return ui.Panel({
  widgets: [CajaLeyenda, TextoLeyenda],
  layout: ui.Panel.Layout.Flow('horizontal')});
};
for (var i = 0; i < 3; i++) {Leyenda.add(Simbolos(Simbologia[i], Etiquetas[i]))}
Map.add(Leyenda);
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}})
    .add(ui.Label({
  value: 'AMENAZAS Y RIESGOS ALTOS IDENTIFICADOS EN EL SECTOR DEL OCASO', // Titulo de la leyenda
  style: {fontWeight: 'bold', fontSize: '25px', fontFamily: 'Cambria', margin: '0px 0px 15px 0px',textAlign: 'center', color: '#0b7891'  }}))
    .add(ui.Label({
  value: 'Universidad Distrital Francisco José de Caldas', // Titulo de la leyenda
  style: {fontWeight: '80', fontSize: '15px', fontFamily: 'Cambria', margin: '0px 0px 0px 45px',textAlign: 'center', color: '#0b7891'  }}))
    .add(ui.Label({
  value: 'Facultad de Medio Ambiente y Recursos Naturales', // Titulo de la leyenda
  style: {fontWeight: '80', fontSize: '15px', fontFamily: 'Cambria', margin: '0px 0px 0px 35px',textAlign: 'center', color: '#0b7891'  }}))
    .add(ui.Label({
  value: 'Proyecto Curricular de Ingeniería Ambiental', // Titulo de la leyenda
  style: {fontWeight: '80', fontSize: '15px', fontFamily: 'Cambria', margin: '0px 0px 15px 45px',textAlign: 'center', color: '#0b7891'  }}))
    .add(ui.Label({
  value: 'Tesis: Evaluación de la afectación de coberturas a causa del desarrollo de loteos en el sector del Ocaso del municipio de Zipacón Cundinamarca', // Titulo de la leyenda
  style: {fontWeight: '80', fontSize: '15px', fontFamily: 'Cambria', margin: '0px 0px 0px 0px',textAlign: 'center', color: 'black'  }}))
    .add(ui.Label({
  value: 'Elaborado por: Diana Lorena Millan Orduz y Daniela Stefania Corredor Rico', // Titulo de la leyenda
  style: {fontWeight: '80', fontSize: '15px', fontFamily: 'Cambria', margin: '0px 0px 15px 0px',textAlign: 'center', color: 'black'  }}))
    .add(ui.Label({
  value: 'Contenido', // Titulo de la leyenda
  style: {fontWeight: '100', fontSize: '15px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'center', color: '#0b7891'  }}))
    .add(ui.Label({
  value: 'Usted esta visualizando el mapa de las amenazas y riesgos altos identificados en el sector del Ocaso en el municipio de Zipacón, Cundinamarca, acá podra visualizar:', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: '1.El área de amenaza y riesgo alto por incendios forestales', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: '2.El área de amenaza y riesgo alto por avenidas torrenciales', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: '3.El área de amenaza y riesgo alto por movimientos en masa', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: '*Nota: Para visualizar los datos solo tiene que dirijirse al icono “Layers” y en el, activar las capas que desea visualizar ', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: 'Procesamiento de resultados', // Titulo de la leyenda
  style: {fontWeight: '100', fontSize: '15px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'center', color: '#0b7891'  }}))
    .add(ui.Label({
  value: 'Los resultados se obtuvieron del estudio de diagnostico del POMCA del río Bogotá 2019 usted puede acceder a los datos mediante el siguiente link', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value:'Link documentos POMCA 2019',
  targetUrl: 'http://www.car.gov.co/vercontenido/94', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: 'Acceso a los datos', // Titulo de la leyenda
  style: {fontWeight: '100', fontSize: '15px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'center', color: '#0b7891'  }}))
    .add(ui.Label({
  value: 'Si desea acceder al script utilizado para el procesamiento de los datos o descargar los resultados (formato SHP, CSV,GEO_JSON,KML, KMZ)  solo debe acceder al siguiente link,y logearse con su cuenta de google ', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value:'Link de acceso al script',
  targetUrl: 'https://code.earthengine.google.com/a26384d1845cdbe857851d3c09a21a0a', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: 'Si desea acceder al documento y a los resultados obtenidos mediante la elaboración del trabajo dirijase al siguiente link ', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value:'Link de acceso documento final',
  targetUrl: 'https://drive.google.com/drive/folders/1Fl5F_IcyA2bluWsNmdxPh_1OuThH4q57?usp=sharing', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    ;
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(14, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
      });
ui.root.add(panel);
// Export the FeatureCollection.
Export.table.toDrive({
  collection: Incendio,
  description: 'Incendios altos del sector el Ocaso',
  folder: 'EXPORT_GEE',
  fileFormat: 'SHP'
});
// Export the FeatureCollection.
Export.table.toDrive({
  collection: MovimientosMasa,
  description: 'Movimientos en Masa altos del sector el Ocaso',
  folder: 'EXPORT_GEE',
  fileFormat: 'SHP'
});
// Export the FeatureCollection.
Export.table.toDrive({
  collection: AvenidasTorrenciales,
  description: 'Avenidas torrenciales altos del sector el Ocaso',
  folder: 'EXPORT_GEE',
  fileFormat: 'SHP'
});