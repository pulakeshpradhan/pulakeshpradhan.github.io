var Ocaso= ee.FeatureCollection('users/dilmillano/SECTOR_OCASO');
Map.centerObject(Ocaso, 15);
//Map.addLayer(Ocaso,{},'Ocaso',false);
var dataset = ee.Image('UMD/hansen/global_forest_change_2020_v1_8');
var treeCoverVisParam = {
  bands: ['treecover2000'],
  min: 0,
  max: 100,
  palette: ['black', 'green']
};
//Map.addLayer(dataset.clip(Ocaso), treeCoverVisParam, 'tree cover',false);
var treeLossVisParam = {
  bands: ['lossyear'],
  min: 0,
  max: 20,
  palette: ['yellow', 'red']
};
var vizLoss = {
  //un cambio de un estado forestal a un estado no forestal
  bands: ['loss'],
  min: 0,
  max: 1,
  palette: [
    "green","red"
  ]
};
Map.addLayer(dataset.clip(Ocaso), treeLossVisParam, 'tree loss year');
treeCoverVisParam= dataset.select('treecover2000')
var rango_1= treeCoverVisParam.lte(20);
var rango_2 = treeCoverVisParam.gt(20).and(treeCoverVisParam.lte(40));
var rango_3 = treeCoverVisParam.gt(40).and(treeCoverVisParam.lte(60));
var rango_4 = treeCoverVisParam.gt(60).and(treeCoverVisParam.lte(80));
var rango_5= treeCoverVisParam.gt(80);
//Mascaras
var mascara_rango_5= rango_5
          .updateMask(rango_5);
var mascara_rango_4= rango_4
          .updateMask(rango_4);
var mascara_rango_3=rango_3
         .updateMask(rango_3);    
var mascara_rango_2=rango_2
         .updateMask(rango_2);  
var mascara_rango_1=rango_1
         .updateMask(rango_1);  
var mosaic = ee.ImageCollection
([mascara_rango_5.visualize({palette: ['#29682e']}),
mascara_rango_4.visualize({palette: ['#40a348']}),
mascara_rango_3.visualize({palette: ['#50cc5a']}),
mascara_rango_2.visualize({palette: ['#64ff70']}),
mascara_rango_1.visualize({palette: ['#b2ffa9']}),
]).mosaic();
Map.centerObject( Ocaso,15);
//Calculo de área
var area = ee.Image.pixelArea().divide(10000);
//lake_mask = lake_mask.updateMask(lake_mask)
mascara_rango_5= mascara_rango_5.multiply(area).select([0],['80-100%']);
mascara_rango_4= mascara_rango_4.multiply(area).select([0],['60-80%']);
mascara_rango_3 = mascara_rango_3.multiply(area).select([0],['40-60%']);
mascara_rango_2 = mascara_rango_2.multiply(area).select([0],['20-40%']);
mascara_rango_1 = mascara_rango_1.multiply(area).select([0],['0-20%']);
var area_image = mascara_rango_5
                .addBands(mascara_rango_4)
                .addBands(mascara_rango_3)
                .addBands(mascara_rango_2)
                .addBands(mascara_rango_1);
var areas = area_image.reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry: Ocaso,
  scale: 30,
  maxPixels:1e13
})
print(areas)
//Declaración de perdidas
var loss = dataset.select('loss').eq(1);
//Mascaras
var mascara_loss= loss
          .updateMask(loss);
//Calculo de área
var area = ee.Image.pixelArea().divide(10000)
var mascara_loss_ = mascara_loss.multiply(area).select([0],['Pérdida de cobertura forestal ']);
var areas = mascara_loss_.reduceRegion({
  reducer:ee.Reducer.sum(),
  geometry: Ocaso,
  scale: 30,
  maxPixels:1e13
})
print(areas)
Map.addLayer(dataset.clip(Ocaso),vizLoss, 'Pérdida de cobertura forestal (2000-2020)')
Map.addLayer(mosaic.clip(Ocaso),{},'Porcentaje de cobertura de arboles');
// Descripcion del etiquetado de elementos de la leyenda
var Etiquetas = [
  '80-100% = ( 353,17 Ha) ',
  ' 60-80%  = ( 136,41 Ha) ',  
  ' 40-60%  = ( 54,79  Ha) ',
  ' 20-40%  = ( 21,98  Ha) ',
  ' 0-20%   = ( 33,06  Ha) ',  
  ];
var Etiquetas2 = [
  'Perdida de cobertura forestal = (6,684 Ha)',
  'Areas sin pérdida =( 592,701 Ha) ',  
  ];
// Configuracion del titulo y posicion de la leyenda
var Titulo = ui.Label({
  value: 'Porcentaje de cobertura forestal (2000)', // Titulo de la leyenda
  style: {fontWeight: 'bold', fontSize: '15px', margin: '0px 0px 15px 0px', fontFamily: 'Cambria'}}); // Estilo y dimensiones
var Titulo2 = ui.Label({
  value: 'Pérdida de cobertura forestal (2000-2020)', // Titulo de la leyenda
  style: {fontWeight: 'bold', fontSize: '15px', margin: '0px 0px 15px 0px', fontFamily: 'Cambria'}}); // Estilo y dimensiones
var Leyenda = ui.Panel({
  style: {position: 'bottom-right', padding: '10px 20px'}}); // Posicion, altura y anchura
Leyenda.add(Titulo);
var Simbologia = ['29682e', '40a348', '50cc5a', '64ff70', 'b2ffa9'];
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
var Simbologia = ['ff0000', '008000' ];
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
for (var i = 0; i < 2; i++) {Leyenda.add(Simbolos(Simbologia[i], Etiquetas2[i]))
                                    ;} 
Map.add(Leyenda);
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}})
    .add(ui.Label({
  value: 'COBERTURA FORESTAL ', // Titulo de la leyenda
  style: {fontWeight: 'bold', fontSize: '25px', fontFamily: 'Cambria', margin: '0px 0px 15px 50px',textAlign: 'center', color: '#0b7891'  }}))
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
  value: 'Usted está visualizando el mapa de porcentaje de cobertura forestal, en este mapa usted podra visualizar: ', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: '1.El mapa de porcentaje de cobertura del dosel de árboles para el año 2000 representado en 5 rangos ', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: '2.El mapa que representa las áreas de pérdida neta de cobertura forestal en el periodo 2000 al 2020', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: '**Nota: Para visualizar los datos solo tiene que dirijirse al icono “Layers” y en el, activar las capas que desea visualizar ', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
     .add(ui.Label({
  value: 'Procesamiento de resultados', // Titulo de la leyenda
  style: {fontWeight: '100', fontSize: '15px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'center', color: '#0b7891'  }}))
    .add(ui.Label({
  value: 'Los datos representados; son los resultados del análisis de series de tiempo de imágenes Landsat que caracterizan la extensión y el cambio del bosque. Este procesamiento fue realizado por la Universidad de Maryland, publicado por Hansen, Potapov, Moore, Hancher et al. Los árboles se definen como vegetación de más de 5 m de altura y se expresan como un porcentaje y la pérdida de cobertura forestal se define como una alteración de reemplazo de rodal, o un cambio de un estado forestal a no forestal, durante el período 2000-2020.', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: 'Acceso a los datos', // Titulo de la leyenda
  style: {fontWeight: '100', fontSize: '15px', fontFamily: 'Cambria', margin: '0px 0px 0px 5px',textAlign: 'center', color: '#0b7891'  }}))
    .add(ui.Label({
  value: 'Si desea acceder al script utilizado para el procesamiento de los datos o descargar los resultados (formato SHP, CSV,GEO_JSON,KML, KMZ)  solo debe acceder al siguiente link,y logearse con su cuenta de google ', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value:'Link de acceso al script',
  targetUrl: 'https://code.earthengine.google.com/3e3413c0d175e3a1e9abb30b893f14bf', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: 'Si desea acceder al documento y a los resultados obtenidos mediante la elaboración del trabajo dirijase al siguiente link ', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value:'Link de acceso documento final',
  targetUrl: 'https://drive.google.com/drive/folders/1Fl5F_IcyA2bluWsNmdxPh_1OuThH4q57?usp=sharing', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value: 'Asi mismo, mediante el siguiente link podrá acceder a la aplicación "Global Forest Change"  ', 
  style: {fontWeight: '100', fontSize: '13px', fontFamily: 'Cambria', margin: '0px 0px 15px 5px',textAlign: 'left', color: 'black'  }}))
    .add(ui.Label({
  value:'Global Forest Change- University of Maryland',
  targetUrl: 'https://glad.earthengine.app/view/global-forest-change#dl=0;old=off;bl=off;lon=-74.43996136597514;lat=4.73361379451117;zoom=14;', 
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
// Add the panel to the ui.root.
ui.root.add(panel);
//CONVERT TO INT 
mascara_rango_5 = mascara_rango_5.toInt();
mascara_rango_4 = mascara_rango_4.toInt();
mascara_rango_3 = mascara_rango_3.toInt();
mascara_rango_2 = mascara_rango_2.toInt();
mascara_rango_1 = mascara_rango_1.toInt();
//EXPORT TO SHAPE
var shapeUrban1 = mascara_rango_5.reduceToVectors(
                                     {geometry:Ocaso,
                                      scale:3,
                                      geometryType: 'polygon',
                                      maxPixels: 10e7,
                                      labelProperty: 'clasificación'
                                     });
var shapeUrbanDis1 = mascara_rango_4.reduceToVectors(
                                     {geometry:Ocaso,
                                      scale:3,
                                      geometryType: 'polygon',
                                      maxPixels: 10e7,
                                      labelProperty: 'clasificación'
                                     });
var shapeCropland1 = mascara_rango_3.reduceToVectors(
                                     {geometry:Ocaso,
                                      scale:3,
                                      geometryType: 'polygon',
                                      maxPixels: 10e7,
                                      labelProperty: 'clasificación'
                                     });
var shapeVegetation1 = mascara_rango_2.reduceToVectors(
                                     {geometry:Ocaso,
                                      scale:3,
                                      geometryType: 'polygon',
                                      maxPixels: 10e7,
                                      labelProperty: 'clasificación'
                                     });                                     
var shapeForest1 = mascara_rango_1.reduceToVectors(
                                     {geometry:Ocaso,
                                      scale:3,
                                      geometryType: 'polygon',
                                      maxPixels: 10e7,
                                      labelProperty: 'clasificación'
                                     });                                     
// Export the FeatureCollection.
Export.table.toDrive({
  collection: shapeUrban1,
  description: '80A100',
  folder: 'EXPORT_GEE_2',
  fileFormat: 'SHP'
});
Export.table.toDrive({
  collection: shapeUrbanDis1,
  description: '60A80',
  folder: 'EXPORT_GEE_2',
  fileFormat: 'SHP'
});   
Export.table.toDrive({
  collection: shapeCropland1,
  description: '40A60',
  folder: 'EXPORT_GEE_2',
  fileFormat: 'SHP'
});
Export.table.toDrive({
  collection: shapeVegetation1,
  description: '20A40',
  folder: 'EXPORT_GEE_2',
  fileFormat: 'SHP'
}); 
Export.table.toDrive({
  collection: shapeForest1,
  description: '0A20',
  folder: 'EXPORT_GEE_2',
  fileFormat: 'SHP'
}); 
//CONVERT TO INT 
mascara_loss = mascara_loss.toInt();
//EXPORT TO SHAPE
var shapemascara_loss = mascara_loss.reduceToVectors(
                                     {geometry:Ocaso,
                                      scale:3,
                                      geometryType: 'polygon',
                                      maxPixels: 10e7,
                                      labelProperty: 'clasificación'
                                     });
// Export the FeatureCollection.
Export.table.toDrive({
  collection: shapemascara_loss,
  description: 'AreaDePerdidaDeCobertura',
  folder: 'EXPORT_GEE_2',
  fileFormat: 'SHP'
});