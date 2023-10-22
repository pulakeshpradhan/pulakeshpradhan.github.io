//Importar el area de estudio
var Ocaso= ee.FeatureCollection('users/dilmillano/SECTOR_OCASO');
Map.centerObject( Ocaso,15);
//IMÁGENES SATELITALES
var LANDSAT_5 = 'LANDSAT/LT05/C01/T1_SR';
var LANDSAT_7 = 'LANDSAT/LE07/C01/T1_SR';
var LANDSAT_8 = 'LANDSAT/LC08/C01/T1_SR';
//MASCARA DE NUBES LANDSAT 7
var cloudMaskL457 = function(image) {
  var qa = image.select('pixel_qa');
  // If the cloud bit (5) is set and the cloud confidence (7) is high
  // or the cloud shadow bit is set (3), then it's a bad pixel.
  var cloud = qa.bitwiseAnd(1 << 5)
                  .and(qa.bitwiseAnd(1 << 7))
                  .or(qa.bitwiseAnd(1 << 3));
  // Remove edge pixels that don't occur in all bands
  var mask2 = image.mask().reduce(ee.Reducer.min());
  return image.updateMask(cloud.not()).updateMask(mask2);
};
//MASCARA DE NUBES LANDSAT 8
var cloud_masks = require('users/fitoprincipe/geetools:cloud_masks');
var options = ["cloud","shadow"]
var  landsatTOAcloudmask = cloud_masks.landsatTOA (options);
//CALCULO NDVI 
//LANDSAT 5
function addNDVI_L5(img) {
  img = ee.Image(img) ;
  var ndvi = img.normalizedDifference(['B4', 'B3']).rename(['ndvi']);
  var img_ndvi = img.addBands(ndvi);
  return img_ndvi;
}
//LANDSAT 8
function addNDVI_L8(img) {
  img = ee.Image(img) ;
  var ndvi = img.normalizedDifference(['B5', 'B4']).rename(['ndvi']);
  var img_ndvi = img.addBands(ndvi);
  return img_ndvi;
}
//PARAMETROS   
var ndviParameters ={palette:["red", "black","yellow", "green"],min:0.3, max:0.8 };
var realParameters5 = {'bands':['B3', 'B2', 'B1'],max:3000, min:0};
var realParameters7 = { min: 0,  max: 3000,gamma: 1.4,bands:['B3','B2','B1']};
var realParameters8 = { min: 0,  max: 3000,gamma: 1.4,bands:['B4','B3','B2']};
//AÑO 1985 
var Ocaso1985 = ee.ImageCollection(LANDSAT_5)
                     .filterBounds(Ocaso)
                     .filterDate("1985-01-01","1985-12-31")
                     .filterMetadata('CLOUD_COVER','less_than',40)
                     .map(addNDVI_L5)
                     .first()
                     ;
Map.addLayer(Ocaso1985.clip(Ocaso) ,realParameters5,'Año 1985',false);
Ocaso1985= Ocaso1985.select('ndvi');  
Map.addLayer(Ocaso1985.clip(Ocaso),ndviParameters, 'NDVI 1985');
//AÑO 1997 
var Ocaso1997 = ee.ImageCollection(LANDSAT_5)
                     .filterBounds(Ocaso)
                     .filterDate("1997-01-01","1997-12-31")
                     .filterMetadata('CLOUD_COVER','less_than',40)
                     .map(addNDVI_L5)
                     .first()
                     ;
Map.addLayer(Ocaso1997.clip(Ocaso) ,realParameters5,'Año 1997',false);
Ocaso1997= Ocaso1997.select('ndvi');  
Map.addLayer(Ocaso1997.clip(Ocaso),ndviParameters, 'NDVI 1997');
//AÑO 2001 
var Ocaso2001 = ee.ImageCollection(LANDSAT_5)
                     .filterBounds(Ocaso)
                     .filterDate("2001-01-01","2001-12-31")
                     .filterMetadata('CLOUD_COVER','less_than',40)
                     .map(addNDVI_L5)
                     .first()
                     ;
Map.addLayer(Ocaso2001.clip(Ocaso) ,realParameters5,'Año 2001',false);
Ocaso2001= Ocaso2001.select('ndvi');  
Map.addLayer(Ocaso2001.clip(Ocaso),ndviParameters, 'NDVI 2001');
//AÑO 2005 
var Ocaso2005 = ee.ImageCollection(LANDSAT_7)
                     .filterBounds(Ocaso)
                     .filterDate("2005-01-01","2006-12-31")
                     .map(cloudMaskL457)
                     .map(addNDVI_L5)
                     .median()
                     ;
Map.addLayer(Ocaso2005.clip(Ocaso) ,realParameters7,'Año 2005',false);
Ocaso2005= Ocaso2005.select('ndvi');  
Map.addLayer(Ocaso2005.clip(Ocaso),ndviParameters, 'NDVI 2005');
//AÑO 2007 
var Ocaso2007 = ee.ImageCollection(LANDSAT_7)
                     .filterBounds(Ocaso)
                     .filterDate("2007-01-01","2008-12-31")
                     .map(cloudMaskL457)
                     .map(addNDVI_L5)
                     .median()
                     ;
Map.addLayer(Ocaso2007.clip(Ocaso) ,realParameters7,'Año 2007',false);
Ocaso2007= Ocaso2007.select('ndvi');  
Map.addLayer(Ocaso2007.clip(Ocaso),ndviParameters, 'NDVI 2007');
//AÑO 2009 
var Ocaso2009 = ee.ImageCollection(LANDSAT_7)
                     .filterBounds(Ocaso)
                     .filterDate("2009-01-01","2010-12-31")
                     .map(cloudMaskL457)
                     .map(addNDVI_L5)
                     .median()
                     ;
Map.addLayer(Ocaso2009.clip(Ocaso) ,realParameters7,'Año 2009',false);
Ocaso2009= Ocaso2009.select('ndvi');  
Map.addLayer(Ocaso2009.clip(Ocaso),ndviParameters, 'NDVI 2009');
//AÑO 2013 
var Ocaso2013 = ee.ImageCollection(LANDSAT_7)
                     .filterBounds(Ocaso)
                     .filterDate("2013-01-01","2014-12-31")
                     .map(cloudMaskL457)
                     .map(addNDVI_L5)
                     .median()
                     ;
Map.addLayer(Ocaso2013.clip(Ocaso) ,realParameters7,'Año 2013',false);
Ocaso2013= Ocaso2013.select('ndvi');  
Map.addLayer(Ocaso2013.clip(Ocaso),ndviParameters, 'NDVI 2013');
//Año 2015 
var Ocaso2015 = ee.ImageCollection(LANDSAT_8)
                     .filterBounds(Ocaso)
                     .filterDate("2015-01-01","2015-12-31")
                     .filterMetadata('CLOUD_COVER','less_than',30)
                     .map(addNDVI_L8)
                     .first()
                     ;
Map.addLayer(Ocaso2015.clip(Ocaso) ,realParameters8,'Año 2015',false);
Ocaso2015= Ocaso2015.select('ndvi');  
Map.addLayer(Ocaso2015.clip(Ocaso),ndviParameters, 'NDVI 2015');
//AÑO 2017 
var Ocaso2017 = ee.ImageCollection(LANDSAT_7)
                     .filterBounds(Ocaso)
                     .filterDate("2017-01-01","2018-12-31")
                     .map(cloudMaskL457)
                     .map(addNDVI_L5)
                     .median()
                     ;
Map.addLayer(Ocaso2017.clip(Ocaso) ,realParameters7,'Año 2017',false);
Ocaso2017= Ocaso2017.select('ndvi');  
Map.addLayer(Ocaso2017.clip(Ocaso),ndviParameters, 'NDVI 2017');
//AÑO 2019 
var Ocaso2019 = ee.ImageCollection(LANDSAT_7)
                     .filterBounds(Ocaso)
                     .filterDate("2019-01-01","2020-12-31")
                     .map(cloudMaskL457)
                     .map(addNDVI_L5)
                     .median()
                     ;
Map.addLayer(Ocaso2019.clip(Ocaso) ,realParameters7,'Año 2019',false);
Ocaso2019= Ocaso2019.select('ndvi');  
Map.addLayer(Ocaso2019.clip(Ocaso),ndviParameters, 'NDVI 2019');
// Descripcion del etiquetado de elementos de la leyenda
var Etiquetas = [
  ' < 0',
  ' 0.2 - 0.4 ',  
  '0.4-0.6 ',
  '0.6 - 1',
  ];
// Configuracion del titulo y posicion de la leyenda
var Titulo = ui.Label({
  value: 'Rangos del índice NDVI', // Titulo de la leyenda
  style: {fontWeight: 'bold', fontSize: '15px', margin: '0px 0px 15px 0px',}}); // Estilo y dimensiones
var Leyenda = ui.Panel({
  style: {position: 'bottom-right', padding: '10px 20px'}}); // Posicion, altura y anchura
Leyenda.add(Titulo);
// Configuracion de la simbologia
var Simbologia = ['ff0000', '000000','ffff00', '008000'];
var Simbolos = function(simbolo, texto) {
var TextoLeyenda = ui.Label({
  value: texto,
  style: {margin: '3px 0px 5px 7px'}}); // Posicion en la separacion de los textos
var CajaLeyenda = ui.Label({
  style: {backgroundColor: '#' + simbolo,
  padding: '7px', // TamaÃ±o del simbolo
  margin: '0px 0px 6px 0px'}}); // Posicion en la separacion de los simbolos
return ui.Panel({
  widgets: [CajaLeyenda, TextoLeyenda],
  layout: ui.Panel.Layout.Flow('horizontal')});
};
for (var i = 0; i < 4; i++) {Leyenda.add(Simbolos(Simbologia[i], Etiquetas[i]));} 
Map.add(Leyenda);
// Create an empty panel in which to arrange widgets.
Map.style().set('cursor', 'crosshair');
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}})
    .add(ui.Label({
  value: 'CAMBIO EN EL ÍNDICE NDVI DEL SECTOR DEL OCASO 1985-2020', // Titulo de la leyenda
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
  value: 'Usted esta visualizando el mapa de cambio multitemporal del índice NDVI del sector del Ocaso del municipio de Zipacón.En esta página podrá visualizar:', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: '1.La imagen satelital libre de nubes y sombras desde el año 1985 al 2020', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: '2.La imagen de los rangos del índice NDVI desde el año 1985 al 2020', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: '*Nota: Para visualizar los datos solo tiene que dirijirse al icono “Layers” y en el, activar las capas que desea visualizar ', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: 'Adicionalmente puede visualizar la gráfica del cambio del índice ndvi a través del tiempo, para esto debe seleccionar con el cursor el lugar que quiere visualizar el cambio y la gráfica cargará automaticamente', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: 'En este espacio se visualizara el cambio del índice NDVI ', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'red'  }}))
    .add(ui.Label({
  value: 'Longitud y Latitud del punto seleccionado ', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'red'  }}))
    .add(ui.Label({
  value: 'Procesamiento de resultados', // Titulo de la leyenda
  style: {fontWeight: '100', fontSize: '15px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'center', color: '#0b7891'  }}))
    .add(ui.Label({
  value: 'Los resultados del índice NDVI que se observan en esta página se obtuvieron mediante el análisis de las imágenes USGS Landsat 8 Surface Reflectance Tier 1 y USGS Landsat 5 Surface Reflectance Tier 1. Estas imágenes se procesaron mediante un algoritmo que permitía eliminar nubes y sombras con el objetivo de eliminar estos errores en el análisis de datos. ', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: 'Acceso a los datos', // Titulo de la leyenda
  style: {fontWeight: '100', fontSize: '15px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'center', color: '#0b7891'  }}))
    .add(ui.Label({
  value: 'Si desea acceder al script utilizado para el procesamiento de los datos o descargar los resultados (formato SHP, CSV,GEO_JSON,KML, KMZ)  solo debe acceder al siguiente link,y logearse con su cuenta de google ', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value:'Link de acceso al script',
  targetUrl: 'https://code.earthengine.google.com/0bec804a0487d8ce75b8f660eed2525c', 
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
  panel.widgets().set(13, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
  // Create a chart of NDVI over time.
//AÑO 2019 
var withNDVI = ee.ImageCollection(LANDSAT_7)
                     .filterBounds(Ocaso)
                     .filterDate("1999-01-01","2020-12-31")
                     .map(cloudMaskL457)
                     .map(addNDVI_L5)
                     ;
  var chart = ui.Chart.image.series(withNDVI.select('ndvi'), point, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'NDVI Over Time',
        vAxis: {title: 'NDVI'},
        lineWidth: 2,
        pointSize: 3,
      });
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel.widgets().set(12, chart);
});
// Add the panel to the ui.root.
ui.root.add(panel);