var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "BurnDate"
        ],
        "palette": [
          "ff670e"
        ]
      }
    }) || {"opacity":1,"bands":["BurnDate"],"palette":["ff670e"]},
    areasquemadas = ui.import && ui.import("areasquemadas", "table", {
      "id": "users/lucasneoclasico/Incendios2020_SL"
    }) || ee.FeatureCollection("users/lucasneoclasico/Incendios2020_SL"),
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "BurnDate"
        ],
        "palette": [
          "ffed16"
        ]
      }
    }) || {"opacity":1,"bands":["BurnDate"],"palette":["ffed16"]},
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "BurnDate"
        ],
        "palette": [
          "0c40ff"
        ]
      }
    }) || {"opacity":1,"bands":["BurnDate"],"palette":["0c40ff"]},
    imageVisParam4 = ui.import && ui.import("imageVisParam4", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "BurnDate"
        ],
        "palette": [
          "0c40ff"
        ]
      }
    }) || {"opacity":1,"bands":["BurnDate"],"palette":["0c40ff"]},
    imageVisParam5 = ui.import && ui.import("imageVisParam5", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "BurnDate"
        ],
        "palette": [
          "ff2bf8"
        ]
      }
    }) || {"opacity":1,"bands":["BurnDate"],"palette":["ff2bf8"]},
    imageVisParam6 = ui.import && ui.import("imageVisParam6", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "BurnDate"
        ],
        "palette": [
          "ff7e7e"
        ]
      }
    }) || {"opacity":1,"bands":["BurnDate"],"palette":["ff7e7e"]},
    imageVisParam7 = ui.import && ui.import("imageVisParam7", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "BurnDate"
        ],
        "palette": [
          "ff3131"
        ]
      }
    }) || {"opacity":1,"bands":["BurnDate"],"palette":["ff3131"]},
    imageVisParam8 = ui.import && ui.import("imageVisParam8", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "BurnDate"
        ],
        "palette": [
          "2bf5ff"
        ]
      }
    }) || {"opacity":1,"bands":["BurnDate"],"palette":["2bf5ff"]},
    imageVisParam9 = ui.import && ui.import("imageVisParam9", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "BurnDate"
        ],
        "palette": [
          "00ff4e"
        ]
      }
    }) || {"opacity":1,"bands":["BurnDate"],"palette":["00ff4e"]},
    imageVisParam10 = ui.import && ui.import("imageVisParam10", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "BurnDate"
        ],
        "palette": [
          "ef00ff"
        ]
      }
    }) || {"opacity":1,"bands":["BurnDate"],"palette":["ef00ff"]},
    imageVisParam11 = ui.import && ui.import("imageVisParam11", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "BurnDate"
        ],
        "palette": [
          "ffdd91"
        ]
      }
    }) || {"opacity":1,"bands":["BurnDate"],"palette":["ffdd91"]},
    imageVisParam12 = ui.import && ui.import("imageVisParam12", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "BurnDate"
        ],
        "palette": [
          "000000"
        ]
      }
    }) || {"opacity":1,"bands":["BurnDate"],"palette":["000000"]};
var geometry2 = ee.FeatureCollection("users/lucasneoclasico/SanLuisLimite");
var dataset = ee.ImageCollection('MODIS/006/MCD64A1')
                  .filter(ee.Filter.date('2020-01-01', '2020-12-30'));
var burnedArea = dataset.select('BurnDate');
var burnedArea_max = burnedArea.max().clip(geometry2) // reducir x el maximo, no se si es lo que necesitas 
print(burnedArea_max,'burnedArea_max')
var burnedAreaVis = {
  min: 1.0,
  max: 366.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.centerObject(geometry2, 10);
Map.addLayer(burnedArea_max, null, 'burnedArea_max2019');
Map.addLayer(geometry2, null, 'SanLuis');
Map.addLayer(areasquemadas, null, 'Areasquemadas2020SL');
Export.image.toDrive({
image: burnedArea_max, // aca no va entre comillas xq va el objeto
description: 'burnedArea_max',
scale: 500,
region: geometry2,
crs: 'EPSG:4326'
});
//                  FIRE CCI  2020
var dataset = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
                  .filter(ee.Filter.date('2020-01-01', '2020-12-30'));
var burnedArea = dataset.select('BurnDate');
var burnedArea_max = burnedArea.max().clip(geometry2) // reducir x el maximo, no se si es lo que necesitas 
print(burnedArea_max,'burnedArea_max')
var burnedAreaVis = {
  min: 1.0,
  max: 366.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.centerObject(geometry2, 10);
Map.addLayer(burnedArea_max, imageVisParam, 'AreaQuemada_2020_FireCCI');
Export.image.toDrive({
image: burnedArea_max, // aca no va entre comillas xq va el objeto
description: 'burnedArea_FIREcci',
scale: 500,
region: geometry2,
crs: 'EPSG:4326'
});
//                  FIRE CCI  2019
var dataset = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
                  .filter(ee.Filter.date('2019-01-01', '2019-12-30'));
var burnedArea = dataset.select('BurnDate');
var burnedArea_max = burnedArea.max().clip(geometry2) // reducir x el maximo, no se si es lo que necesitas 
print(burnedArea_max,'burnedArea_max')
var burnedAreaVis = {
  min: 1.0,
  max: 366.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.centerObject(geometry2, 10);
Map.addLayer(burnedArea_max, imageVisParam2, 'AreaQuemada_2019_FireCCI');
Export.image.toDrive({
image: burnedArea_max, // aca no va entre comillas xq va el objeto
description: 'burnedArea_FIREcci2019',
scale: 500,
region: geometry2,
crs: 'EPSG:4326'
});
//                  FIRE CCI  2018
var dataset = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
                  .filter(ee.Filter.date('2018-01-01', '2018-12-30'));
var burnedArea = dataset.select('BurnDate');
var burnedArea_max = burnedArea.max().clip(geometry2) // reducir x el maximo, no se si es lo que necesitas 
print(burnedArea_max,'burnedArea_max')
var burnedAreaVis = {
  min: 1.0,
  max: 366.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.centerObject(geometry2, 10);
Map.addLayer(burnedArea_max, imageVisParam3, 'AreaQuemada_2018_FireCCI');
Export.image.toDrive({
image: burnedArea_max, // aca no va entre comillas xq va el objeto
description: 'burnedArea_FIREcci2019',
scale: 500,
region: geometry2,
crs: 'EPSG:4326'
});
//                  FIRE CCI  2017
var dataset = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
                  .filter(ee.Filter.date('2017-01-01', '2017-12-30'));
var burnedArea = dataset.select('BurnDate');
var burnedArea_max = burnedArea.max().clip(geometry2) // reducir x el maximo, no se si es lo que necesitas 
print(burnedArea_max,'burnedArea_max')
var burnedAreaVis = {
  min: 1.0,
  max: 366.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.centerObject(geometry2, 10);
Map.addLayer(burnedArea_max, imageVisParam4, 'AreaQuemada_2017_FireCCI');
Export.image.toDrive({
image: burnedArea_max, // aca no va entre comillas xq va el objeto
description: 'burnedArea_FIREcci2017',
scale: 500,
region: geometry2,
crs: 'EPSG:4326'
});
//                  FIRE CCI  2016
var dataset = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
                  .filter(ee.Filter.date('2016-01-01', '2016-12-30'));
var burnedArea = dataset.select('BurnDate');
var burnedArea_max = burnedArea.max().clip(geometry2) // reducir x el maximo, no se si es lo que necesitas 
print(burnedArea_max,'burnedArea_max')
var burnedAreaVis = {
  min: 1.0,
  max: 366.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.centerObject(geometry2, 10);
Map.addLayer(burnedArea_max, imageVisParam5, 'AreaQuemada_2016_FireCCI');
Export.image.toDrive({
image: burnedArea_max, // aca no va entre comillas xq va el objeto
description: 'burnedArea_FIREcci2017',
scale: 500,
region: geometry2,
crs: 'EPSG:4326'
});
//                  FIRE CCI  2015
var dataset = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
                  .filter(ee.Filter.date('2015-01-01', '2015-12-30'));
var burnedArea = dataset.select('BurnDate');
var burnedArea_max = burnedArea.max().clip(geometry2) // reducir x el maximo, no se si es lo que necesitas 
print(burnedArea_max,'burnedArea_max')
var burnedAreaVis = {
  min: 1.0,
  max: 366.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.centerObject(geometry2, 10);
Map.addLayer(burnedArea_max, imageVisParam7, 'AreaQuemada_2015_FireCCI');
Export.image.toDrive({
image: burnedArea_max, // aca no va entre comillas xq va el objeto
description: 'burnedArea_FIREcci2015',
scale: 500,
region: geometry2,
crs: 'EPSG:4326'
});
//                  FIRE CCI  2014
var dataset = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
                  .filter(ee.Filter.date('2014-01-01', '2014-12-30'));
var burnedArea = dataset.select('BurnDate');
var burnedArea_max = burnedArea.max().clip(geometry2) // reducir x el maximo, no se si es lo que necesitas 
print(burnedArea_max,'burnedArea_max')
var burnedAreaVis = {
  min: 1.0,
  max: 366.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.centerObject(geometry2, 10);
Map.addLayer(burnedArea_max, imageVisParam8, 'AreaQuemada_2014_FireCCI');
Export.image.toDrive({
image: burnedArea_max, // aca no va entre comillas xq va el objeto
description: 'burnedArea_FIREcci2014',
scale: 500,
region: geometry2,
crs: 'EPSG:4326'
});
//                  FIRE CCI  2013
var dataset = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
                  .filter(ee.Filter.date('2013-01-01', '2013-12-30'));
var burnedArea = dataset.select('BurnDate');
var burnedArea_max = burnedArea.max().clip(geometry2) // reducir x el maximo, no se si es lo que necesitas 
print(burnedArea_max,'burnedArea_max')
var burnedAreaVis = {
  min: 1.0,
  max: 366.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.centerObject(geometry2, 10);
Map.addLayer(burnedArea_max, imageVisParam9, 'AreaQuemada_2013_FireCCI');
Export.image.toDrive({
image: burnedArea_max, // aca no va entre comillas xq va el objeto
description: 'burnedArea_FIREcci2013',
scale: 500,
region: geometry2,
crs: 'EPSG:4326'
});
//                  FIRE CCI  2012
var dataset = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
                  .filter(ee.Filter.date('2012-01-01', '2012-12-30'));
var burnedArea = dataset.select('BurnDate');
var burnedArea_max = burnedArea.max().clip(geometry2) // reducir x el maximo, no se si es lo que necesitas 
print(burnedArea_max,'burnedArea_max')
var burnedAreaVis = {
  min: 1.0,
  max: 366.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.centerObject(geometry2, 10);
Map.addLayer(burnedArea_max, imageVisParam10, 'AreaQuemada_2012_FireCCI');
Export.image.toDrive({
image: burnedArea_max, // aca no va entre comillas xq va el objeto
description: 'burnedArea_FIREcci2012',
scale: 500,
region: geometry2,
crs: 'EPSG:4326'
});
//                  FIRE CCI  2011
var dataset = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
                  .filter(ee.Filter.date('2011-01-01', '2011-12-30'));
var burnedArea = dataset.select('BurnDate');
var burnedArea_max = burnedArea.max().clip(geometry2) // reducir x el maximo, no se si es lo que necesitas 
print(burnedArea_max,'burnedArea_max')
var burnedAreaVis = {
  min: 1.0,
  max: 366.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.centerObject(geometry2, 10);
Map.addLayer(burnedArea_max, imageVisParam11, 'AreaQuemada_2011_FireCCI');
Export.image.toDrive({
image: burnedArea_max, // aca no va entre comillas xq va el objeto
description: 'burnedArea_FIREcci2011',
scale: 500,
region: geometry2,
crs: 'EPSG:4326'
});
//                  FIRE CCI  2010
var dataset = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
                  .filter(ee.Filter.date('2010-01-01', '2010-12-30'));
var burnedArea = dataset.select('BurnDate');
var burnedArea_max = burnedArea.max().clip(geometry2) // reducir x el maximo, no se si es lo que necesitas 
print(burnedArea_max,'burnedArea_max')
var burnedAreaVis = {
  min: 1.0,
  max: 366.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.centerObject(geometry2, 10);
Map.addLayer(burnedArea_max, null, 'AreaQuemada_2010_FireCCI');
Export.image.toDrive({
image: burnedArea_max, // aca no va entre comillas xq va el objeto
description: 'burnedArea_FIREcci2010',
scale: 500,
region: geometry2,
crs: 'EPSG:4326'
});
//                  FIRE CCI  2009
var dataset = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
                  .filter(ee.Filter.date('2009-01-01', '2009-12-30'));
var burnedArea = dataset.select('BurnDate');
var burnedArea_max = burnedArea.max().clip(geometry2) // reducir x el maximo, no se si es lo que necesitas 
print(burnedArea_max,'burnedArea_max')
var burnedAreaVis = {
  min: 1.0,
  max: 366.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.centerObject(geometry2, 10);
Map.addLayer(burnedArea_max,imageVisParam12, 'AreaQuemada_2009_FireCCI');
Export.image.toDrive({
image: burnedArea_max, // aca no va entre comillas xq va el objeto
description: 'burnedArea_FIREcci2009',
scale: 500,
region: geometry2,
crs: 'EPSG:4326'
});
//                  FIRE CCI  2008
var dataset = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
                  .filter(ee.Filter.date('2008-01-01', '2008-12-30'));
var burnedArea = dataset.select('BurnDate');
var burnedArea_max = burnedArea.max().clip(geometry2) // reducir x el maximo, no se si es lo que necesitas 
print(burnedArea_max,'burnedArea_max')
var burnedAreaVis = {
  min: 1.0,
  max: 366.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.centerObject(geometry2, 10);
Map.addLayer(burnedArea_max,imageVisParam12, 'AreaQuemada_2008_FireCCI');
Export.image.toDrive({
image: burnedArea_max, // aca no va entre comillas xq va el objeto
description: 'burnedArea_FIREcci2008',
scale: 500,
region: geometry2,
crs: 'EPSG:4326'
});
//                  FIRE CCI  2007
var dataset = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
                  .filter(ee.Filter.date('2007-01-01', '2007-12-30'));
var burnedArea = dataset.select('BurnDate');
var burnedArea_max = burnedArea.max().clip(geometry2) // reducir x el maximo, no se si es lo que necesitas 
print(burnedArea_max,'burnedArea_max')
var burnedAreaVis = {
  min: 1.0,
  max: 366.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.centerObject(geometry2, 10);
Map.addLayer(burnedArea_max,imageVisParam12, 'AreaQuemada_2007_FireCCI');
Export.image.toDrive({
image: burnedArea_max, // aca no va entre comillas xq va el objeto
description: 'burnedArea_FIREcci2007',
scale: 500,
region: geometry2,
crs: 'EPSG:4326'
});
//                  FIRE CCI  2006
var dataset = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
                  .filter(ee.Filter.date('2006-01-01', '2006-12-30'));
var burnedArea = dataset.select('BurnDate');
var burnedArea_max = burnedArea.max().clip(geometry2) // reducir x el maximo, no se si es lo que necesitas 
print(burnedArea_max,'burnedArea_max')
var burnedAreaVis = {
  min: 1.0,
  max: 366.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.centerObject(geometry2, 10);
Map.addLayer(burnedArea_max,imageVisParam12, 'AreaQuemada_2006_FireCCI');
Export.image.toDrive({
image: burnedArea_max, // aca no va entre comillas xq va el objeto
description: 'burnedArea_FIREcci2006',
scale: 500,
region: geometry2,
crs: 'EPSG:4326'
});
//                  FIRE CCI  2005
var dataset = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
                  .filter(ee.Filter.date('2005-01-01', '2005-12-30'));
var burnedArea = dataset.select('BurnDate');
var burnedArea_max = burnedArea.max().clip(geometry2) // reducir x el maximo, no se si es lo que necesitas 
print(burnedArea_max,'burnedArea_max')
var burnedAreaVis = {
  min: 1.0,
  max: 366.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.centerObject(geometry2, 10);
Map.addLayer(burnedArea_max,imageVisParam12, 'AreaQuemada_2005_FireCCI');
Export.image.toDrive({
image: burnedArea_max, // aca no va entre comillas xq va el objeto
description: 'burnedArea_FIREcci2005',
scale: 500,
region: geometry2,
crs: 'EPSG:4326'
});
//                  FIRE CCI  2004
var dataset = ee.ImageCollection('ESA/CCI/FireCCI/5_1')
                  .filter(ee.Filter.date('2004-01-01', '2004-12-30'));
var burnedArea = dataset.select('BurnDate');
var burnedArea_max = burnedArea.max().clip(geometry2) // reducir x el maximo, no se si es lo que necesitas 
print(burnedArea_max,'burnedArea_max')
var burnedAreaVis = {
  min: 1.0,
  max: 366.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.centerObject(geometry2, 10);
Map.addLayer(burnedArea_max,imageVisParam12, 'AreaQuemada_2004_FireCCI');
Export.image.toDrive({
image: burnedArea_max, // aca no va entre comillas xq va el objeto
description: 'burnedArea_FIREcci2004',
scale: 500,
region: geometry2,
crs: 'EPSG:4326'
});
// Descripcion del etiquetado de elementos de la leyenda
var Etiquetas = [
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010',
  '2009',
  '2008',
  '2007',
  '2006',
  '2005',
  '2004',];
// Configuracion del titulo y posicion de la leyenda
var Titulo = ui.Label({
  value: 'AREAS QUEMADAS_FireCCI', // Titulo de la leyenda
  style: {fontWeight: 'bold', fontSize: '12px', margin: '0px 0px 10px 0px',}}); // Estilo y dimensiones
var Leyenda = ui.Panel({
  style: {position: 'bottom-left', padding: '4px 10px'}}); // Posicion, altura y anchura
Leyenda.add(Titulo);
// Configuracion de la simbologia
var Simbologia = ['0030F5', '36886A', '82B513', 'EDC823', 'F68E19', 'F45A44', 'FD92FA', '0030F5', '36886A', '82B513', 'EDC823', 'F68E19', 'F45A44', 'FD92FA', 'FD92FA', '0030F5', '36886A'];
var Simbolos = function(simbolo, texto) {
var TextoLeyenda = ui.Label({
  value: texto,
  style: {margin: '2px 0px 4px 6px'}}); // Posicion en la separacion de los textos
var CajaLeyenda = ui.Label({
  style: {backgroundColor: '#' + simbolo,
  padding: '8px', // TamaÃ±o del simbolo
  margin: '0px 0px 0px 0px'}}); // Posicion en la separacion de los simbolos
//Representacion de leyenda en el visor
return ui.Panel({
  widgets: [CajaLeyenda, TextoLeyenda],
  layout: ui.Panel.Layout.Flow('horizontal')});};
for (var i = 0; i < 17; i++) {Leyenda.add(Simbolos(Simbologia[i], Etiquetas[i]));} 
Map.centerObject (areasquemadas, 8);
Map.add(Leyenda);
//Definir el titulo
var TituloMapa = ui.Label({
  value: 'OCURRENCIA DE INCENDIOS SAN LUIS 2004-2020', // Titulo del mapa
  style: {position: 'top-center', // Posicion
  fontWeight: 'bold', // Negrita
  fontSize: '15px'}}); // TamaÃ±o de fuente
//Incorporar el titulo en el visor
Map.add(TituloMapa); 
// Posiciones del Titulo
//'top-left'
//'top-center'
//'top-right'
//'middle-left'
//'middle-right'
//'bottom-left'
//'bottom-center'
//'bottom-right'