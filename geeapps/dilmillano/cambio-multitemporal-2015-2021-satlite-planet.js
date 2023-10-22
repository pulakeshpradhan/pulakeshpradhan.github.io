var Ocaso= ee.FeatureCollection('users/dilmillano/SECTOR_OCASO');
Map.centerObject(Ocaso,15);
//2015
var ocaso2015= ee.Image('users/dilmillano/PLANET-DICIEMBRE2015');
var ndvi2015= ocaso2015.normalizedDifference(["b4", "b3"]);
Map.addLayer(ndvi2015.clip(Ocaso),{palette:["red", "black","yellow", "green"],min:0, max:0.8 }, 'NDVI 2015', false);
Map.addLayer(ocaso2015.clip(Ocaso),{bands:["b3","b2","b1"], max:5000}, '2015',false);
//RANGOS DE CLASIFICACIÓN
var urban = ndvi2015.lte(0.5);
var urbanDis = ndvi2015.gt(0.5).and(ndvi2015.lte(0.65));
var cropland = ndvi2015.gt(0.65).and(ndvi2015.lte(0.7));
var vegetation = ndvi2015.gt(0.7).and(ndvi2015.lte(0.75));
var forest = ndvi2015.gt(0.75);
//Mascaras
var mascara_urban= urban
          .updateMask(urban);
var mascara_urbanDis=urbanDis
         .updateMask(urbanDis);    
var mascara_cropland=cropland
         .updateMask(cropland);  
var mascara_vegetation=vegetation
         .updateMask(vegetation);
var mascara_forest=forest
         .updateMask(forest);  
var mosaic = ee.ImageCollection
([mascara_urban.visualize({palette: ['red']}),
 mascara_urbanDis.visualize({palette: ['yellow']}),
mascara_cropland.visualize({palette: ['#ab5619']}),// café
mascara_vegetation.visualize({palette: ['#97eb57']}), //verde claro
mascara_forest.visualize({palette: ['green']}),
]).mosaic();
Map.addLayer(mosaic.clip(Ocaso),{},'Clasificación de coberturas 2015');
//Calculo de área
var area = ee.Image.pixelArea().divide(10000);
mascara_urban = mascara_urban.multiply(area).select([0],['Tejido landcover2-rojo']);
mascara_urbanDis = mascara_urbanDis.multiply(area).select([0],['Tejido landcover2 Discontinuo-amarillo ']);
mascara_cropland = mascara_cropland.multiply(area).select([0],['Bosque fragmentado con cultivos y pastos-verde claro']);
mascara_vegetation = mascara_vegetation.multiply(area).select([0],['Bosque fragmentado con Vegetación secundaria-morado']);
mascara_forest = mascara_forest.multiply(area).select([0],['Bosque']);
var area_image = mascara_urban
                .addBands(mascara_urbanDis)
                .addBands(mascara_cropland)
                .addBands(mascara_vegetation)
                .addBands(mascara_forest);
var areas = area_image.reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry: Ocaso,
  scale: 30,
  maxPixels:1e13
});
print(areas);
//2021
var ocaso2021= ee.Image('users/dilmillano/PLANET-ENERO2021');
var ndvi2021= ocaso2021.normalizedDifference(["b4", "b3"]);
Map.addLayer(ndvi2021.clip(Ocaso),{palette:["red", "black","yellow", "green"],min:0, max:0.8 }, 'NDVI 2021', false);
Map.addLayer(ocaso2021.clip(Ocaso),{bands:["b3","b2","b1"], max:5000}, '2021',false);
//RANGOS DE CLASIFICACIÓN
var urban1 = ndvi2021.lte(0.5);
var urbanDis1 = ndvi2021.gt(0.5).and(ndvi2021.lte(0.65));
var cropland1 = ndvi2021.gt(0.65).and(ndvi2021.lte(0.7));
var vegetation1 = ndvi2021.gt(0.7).and(ndvi2021.lte(0.75));
var forest1 = ndvi2021.gt(0.75);
//Mascaras
var mascara_urban1= urban1
          .updateMask(urban1);
var mascara_urbanDis1=urbanDis1
         .updateMask(urbanDis1);    
var mascara_cropland1=cropland1
         .updateMask(cropland1);  
var mascara_vegetation1=vegetation1
         .updateMask(vegetation1);
var mascara_forest1=forest1
         .updateMask(forest1);  
var mosaic1 = ee.ImageCollection
([mascara_urban1.visualize({palette: ['red']}),
 mascara_urbanDis1.visualize({palette: ['yellow']}),
mascara_cropland1.visualize({palette: ['#ab5619']}),// café
mascara_vegetation1.visualize({palette: ['#97eb57']}), //verde claro
mascara_forest1.visualize({palette: ['green']}),
]).mosaic();
Map.addLayer(mosaic1.clip(Ocaso),{},'Clasificación de coberturas 2021');
//Calculo de área
var area = ee.Image.pixelArea().divide(10000);
mascara_urban1 = mascara_urban1.multiply(area).select([0],['Tejido landcover2-rojo 2020']);
mascara_urbanDis1 = mascara_urbanDis1.multiply(area).select([0],['Tejido landcover2 Discontinuo-amarillo 2020']);
mascara_cropland1 = mascara_cropland1.multiply(area).select([0],['Bosque fragmentado con cultivos y pastos-verde claro 2020']);
mascara_vegetation1 = mascara_vegetation1.multiply(area).select([0],['Bosque fragmentado con Vegetación secundaria-morado 2020']);
mascara_forest1 = mascara_forest1.multiply(area).select([0],['Bosque 2020']);
var area_image1 = mascara_urban1
                .addBands(mascara_urbanDis1)
                .addBands(mascara_cropland1)
                .addBands(mascara_vegetation1)
                .addBands(mascara_forest1);
var areas1 = area_image1.reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry: Ocaso,
  scale: 30,
  maxPixels:1e13
});
print(areas1);
// Descripcion del etiquetado de elementos de la leyenda
var Etiquetas = [
  'Tejido Urbano=(10.656 Ha)',
  'Tejido Urbano Discontinuo=(48.156 Ha) ',  
  'Mosaico de cultivos, pastos y espacios naturales=(37.714 Ha)',
  'Bosque Fragmentado con vegetación secundaria=(66.627 Ha)',
  'Bosque Denso Bajo=(436.229 Ha)', 
  ];
var Etiquetas2 = [
  'Tejido Urbano=(2.575 Ha)',
  'Tejido Urbano Discontinuo=(20.436 Ha) ',  
  'Mosaico de cultivos, pastos y espacios naturales=(35.987 Ha)',
  'Bosque Fragmentado con vegetación secundaria=(116.932 Ha)',
  'Bosque Denso Bajo=(423.454 Ha)', 
  ];
// Configuracion del titulo y posicion de la leyenda
var Titulo = ui.Label({
  value: 'Coberturas para el año 2015', // Titulo de la leyenda
  style: {fontWeight: 'bold', fontSize: '15px', margin: '0px 0px 15px 0px', fontFamily: 'Cambria'}}); // Estilo y dimensiones
var Titulo2 = ui.Label({
  value: 'Coberturas para el año 2020', // Titulo de la leyenda
  style: {fontWeight: 'bold', fontSize: '15px', margin: '0px 0px 15px 0px', fontFamily: 'Cambria'}}); // Estilo y dimensiones
var Leyenda = ui.Panel({
  style: {position: 'bottom-right', padding: '10px 20px'}}); // Posicion, altura y anchura
Leyenda.add(Titulo);
var Simbologia = ['ff0000', 'e4ff00', 'ab5619', '97eb57', '25ba00'];
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
for (var i = 0; i < 5; i++) {Leyenda.add(Simbolos(Simbologia[i], Etiquetas[i]))}
Leyenda.add(Titulo2);
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
}
for (var i = 0; i < 5; i++) {Leyenda.add(Simbolos(Simbologia[i], Etiquetas2[i]))
                                    ;} 
Map.add(Leyenda);
// Create an empty panel in which to arrange widgets.
Map.style().set('cursor', 'crosshair');
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}})
    .add(ui.Label({
  value: 'CAMBIO DE COBERTURAS DEL SECTOR DEL OCASO 2000-2020', // Titulo de la leyenda
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
  value: 'Usted esta visualizando el mapa de cambio multitemporal de coberturas del sector del Ocaso del municipio de Zipacón.En esta página podrá visualizar:', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: '1.La imagen satelital libre de nubes y sombras del año 2000 y 2020', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: '2.La imagen de cada año de acuerdo al resultado del índice NDVI', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: '3.La imagen de cada año de la clasificación de coberturas', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
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
  value: 'Los resultados de las coberturas que se observan en esta página se obtuvieron mediante el análisis de las imágenes Planet. Para clasificar las coberturas se usaron los índices  NDVI (Normalized Difference Vegetation Index),NDBI ( Normalized Difference Builing Index) y BSI (Bare Soil Index), los resultados de los índices se clasificaron identificando 5 coberturas ajustadas a la clasificación de Corine Land Cover, comprobando los resultados con las coberturas identificadas en el POMCA Del Río Bogotá (Plan de Ordenación y Manejo de Cuencas Hidrográficas) y con la elaboración de una clasificación supervisada  que mediante el método de “Accuracy Assessment” se obtuvo una precisión general de validación de coberturas de 0,80.', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: 'Acceso a los datos', // Titulo de la leyenda
  style: {fontWeight: '100', fontSize: '15px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'center', color: '#0b7891'  }}))
    .add(ui.Label({
  value: 'Si desea acceder al script utilizado para el procesamiento de los datos o descargar los resultados (formato SHP, CSV,GEO_JSON,KML, KMZ)  solo debe acceder al siguiente link,y logearse con su cuenta de google ', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value:'Link de acceso a datos',
  targetUrl: 'https://code.earthengine.google.com/fe0cc67259ac681190e390657b4db2a7', 
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
  // Create a chart of NDVI over time.
var LANDSAT_7 = 'LANDSAT/LE07/C01/T1_SR';
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
function addNDVI_L5(img) {
  img = ee.Image(img) ;
  var ndvi = img.normalizedDifference(['B4', 'B3']).rename(['ndvi']);
  var img_ndvi = img.addBands(ndvi);
  return img_ndvi;
}
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
  panel.widgets().set(13, chart);
});
ui.root.add(panel);
//CONVERT TO INT 
mascara_urban = mascara_urban.toInt();
mascara_urbanDis = mascara_urbanDis.toInt();
mascara_cropland = mascara_cropland.toInt();
mascara_vegetation = mascara_vegetation.toInt();
mascara_forest = mascara_forest.toInt();
//EXPORT TO SHAPE
var shapeUrban = mascara_urban.reduceToVectors(
                                     {geometry:Ocaso,
                                      scale:3,
                                      geometryType: 'polygon',
                                      maxPixels: 10e7,
                                      labelProperty: 'clasificación'
                                     });
var shapeUrbanDis = mascara_urbanDis.reduceToVectors(
                                     {geometry:Ocaso,
                                      scale:3,
                                      geometryType: 'polygon',
                                      maxPixels: 10e7,
                                      labelProperty: 'clasificación'
                                     });
var shapeCropland = mascara_cropland.reduceToVectors(
                                     {geometry:Ocaso,
                                      scale:3,
                                      geometryType: 'polygon',
                                      maxPixels: 10e7,
                                      labelProperty: 'clasificación'
                                     });
var shapeVegetation = mascara_vegetation.reduceToVectors(
                                     {geometry:Ocaso,
                                      scale:3,
                                      geometryType: 'polygon',
                                      maxPixels: 10e7,
                                      labelProperty: 'clasificación'
                                     });                                     
var shapeForest = mascara_forest.reduceToVectors(
                                     {geometry:Ocaso,
                                      scale:3,
                                      geometryType: 'polygon',
                                      maxPixels: 10e7,
                                      labelProperty: 'clasificación'
                                     });                                     
// Export the FeatureCollection.
Export.table.toDrive({
  collection: shapeUrban,
  description: 'TejidoUrbano2000',
  folder: 'EXPORT_GEE_2',
  fileFormat: 'SHP'
});
Export.table.toDrive({
  collection: shapeUrbanDis,
  description: 'TejidoUrbanoDiscontinuo2000',
  folder: 'EXPORT_GEE_2',
  fileFormat: 'SHP'
});   
Export.table.toDrive({
  collection: shapeCropland,
  description: 'BosqueFragmentadoConCultivosyPastos2000',
  folder: 'EXPORT_GEE_2',
  fileFormat: 'SHP'
});
Export.table.toDrive({
  collection: shapeVegetation,
  description: 'BosqueFragmentadoConVegetacionSecundaria2000',
  folder: 'EXPORT_GEE_2',
  fileFormat: 'SHP'
}); 
Export.table.toDrive({
  collection: shapeForest,
  description: 'Bosque2000',
  folder: 'EXPORT_GEE_2',
  fileFormat: 'SHP'
}); 
//CONVERT TO INT 
mascara_urban1 = mascara_urban1.toInt();
mascara_urbanDis1 = mascara_urbanDis1.toInt();
mascara_cropland1 = mascara_cropland1.toInt();
mascara_vegetation1 = mascara_vegetation1.toInt();
mascara_forest1 = mascara_forest1.toInt();
//EXPORT TO SHAPE
var shapeUrban1 = mascara_urban1.reduceToVectors(
                                     {geometry:Ocaso,
                                      scale:3,
                                      geometryType: 'polygon',
                                      maxPixels: 10e7,
                                      labelProperty: 'clasificación'
                                     });
var shapeUrbanDis1 = mascara_urbanDis1.reduceToVectors(
                                     {geometry:Ocaso,
                                      scale:3,
                                      geometryType: 'polygon',
                                      maxPixels: 10e7,
                                      labelProperty: 'clasificación'
                                     });
var shapeCropland1 = mascara_cropland1.reduceToVectors(
                                     {geometry:Ocaso,
                                      scale:3,
                                      geometryType: 'polygon',
                                      maxPixels: 10e7,
                                      labelProperty: 'clasificación'
                                     });
var shapeVegetation1 = mascara_vegetation1.reduceToVectors(
                                     {geometry:Ocaso,
                                      scale:3,
                                      geometryType: 'polygon',
                                      maxPixels: 10e7,
                                      labelProperty: 'clasificación'
                                     });                                     
var shapeForest1 = mascara_forest1.reduceToVectors(
                                     {geometry:Ocaso,
                                      scale:3,
                                      geometryType: 'polygon',
                                      maxPixels: 10e7,
                                      labelProperty: 'clasificación'
                                     });                                     
// Export the FeatureCollection.
Export.table.toDrive({
  collection: shapeUrban1,
  description: 'TejidoUrbano2020',
  folder: 'EXPORT_GEE_2',
  fileFormat: 'SHP'
});
Export.table.toDrive({
  collection: shapeUrbanDis1,
  description: 'TejidoUrbanoDiscontinuo2020',
  folder: 'EXPORT_GEE_2',
  fileFormat: 'SHP'
});   
Export.table.toDrive({
  collection: shapeCropland1,
  description: 'BosqueFragmentadoConCultivosyPastos2020',
  folder: 'EXPORT_GEE_2',
  fileFormat: 'SHP'
});
Export.table.toDrive({
  collection: shapeVegetation1,
  description: 'BosqueFragmentadoConVegetacionSecundaria2020',
  folder: 'EXPORT_GEE_2',
  fileFormat: 'SHP'
}); 
Export.table.toDrive({
  collection: shapeForest1,
  description: 'Bosque2020',
  folder: 'EXPORT_GEE_2',
  fileFormat: 'SHP'
});