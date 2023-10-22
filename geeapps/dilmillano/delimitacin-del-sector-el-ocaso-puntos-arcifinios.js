//Importar el area de estudio
var Vertices= ee.FeatureCollection('users/dilmillano/PUNTOSARCIFINIOS');
var Delimitacion= ee.FeatureCollection('users/dilmillano/DELIMITACION');
Map.addLayer(Vertices,{color: '#a52929'},'Puntos arcifinios',true);
Map.addLayer(Delimitacion,{palette: 'red', opacity: 0.5},'Poligono de delimitación',true);
Map.centerObject( Vertices,15);
print(Vertices);
//EXPORT TO SHAPE 
// Export the FeatureCollection.
Export.table.toDrive({
  collection: Vertices,
  description: 'Puntos Arcifinios',
  folder: 'EXPORT_GEE',
  fileFormat: 'SHP'
});
//EXPORT 2
Export.table.toDrive({
  collection: Delimitacion,
  description: 'Delimitación',
  folder: 'EXPORT_GEE',
  fileFormat: 'SHP'
});   
// Create an empty panel in which to arrange widgets.
Map.style().set('cursor', 'crosshair');
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}})
    .add(ui.Label({
  value: 'DELIMITACIÓN DEL ÁREA DE ESTUDIO MEDIANTE PUNTOS ARCIFINIOS', // Titulo de la leyenda
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
  value: 'Usted está visualizando la delimitación del área de estudio del sector del Ocaso del Municipio de Zipacón Cundinamarca, acá podrá visualizar los puntos arcifinios utilizados para la delimitación y el polígono de delimitación final', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: '*Nota: Para visualizar los datos solo tiene que dirijirse al icono “Layers” y en el, activar las capas que desea visualizar ', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: 'Procesamiento de resultados', // Titulo de la leyenda
  style: {fontWeight: '100', fontSize: '15px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'center', color: '#0b7891'  }}))
    .add(ui.Label({
  value: 'Como segunda medida se obtuvo el polígono de la vereda El Ocaso del municipio de Zipacón, el cual se descargó desde el portal de datos abiertos del IGAC y se corroboró con la geodatabase de Catastro. Una vez obtenido el polígono del área de estudio, se procedió a delimitarlo mediante puntos arcifinios con el objetivo de tenerlo establecido muy claramente con linderos detallados. Cada punto corresponde a un vértice del polígono, el cual presenta un rumbo determinado, lo que significa que en un plano 2D se le coloca un diagrama cartesiano perpendicular a la norte-sur, de manera que el punto de origen es el punto inicial, para así determinar el rumbo que corresponde al ángulo que se forma con la norte-sur. Luego, es necesario determinar la distancia entre vértices con el fin de que el polígono quede delimitado verdaderamente y coincida con lo que se encuentra en campo..', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: 'Acceso a los datos', // Titulo de la leyenda
  style: {fontWeight: '100', fontSize: '15px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'center', color: '#0b7891'  }}))
    .add(ui.Label({
  value: 'Si desea acceder al script utilizado para el procesamiento de los datos o descargar los resultados (formato SHP, CSV,GEO_JSON,KML, KMZ)  solo debe acceder al siguiente link,y logearse con su cuenta de google ', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value:'Link de acceso a script',
  targetUrl: 'https://code.earthengine.google.com/9ca11f073559be6046ffd7bc97544ab5', 
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