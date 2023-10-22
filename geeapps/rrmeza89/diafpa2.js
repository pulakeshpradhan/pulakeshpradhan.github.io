var geometry = ui.import && ui.import("geometry", "table", {
      "id": "users/rrmeza89/Poligonos_diafpa2"
    }) || ee.FeatureCollection("users/rrmeza89/Poligonos_diafpa2"),
    imagenes = ui.import && ui.import("imagenes", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2");
var sep = imagenes.filterBounds(geometry).filterDate('2020-09-01','2020-09-26')
                          .filterMetadata('CLOUDY_PIXEL_PERCENTAGE',"less_than",5).mosaic();
//print(sep)
//throw('epyta')
//Centrar la vista en donde estan las parcelas objetivas
//var mosaico = filterImage.mosaic()
//Analisis de NDVI
var ndvi_sep = sep.normalizedDifference(['B8','B4']);
// Detect edges in the composite.
var canny_sep = ee.Algorithms.CannyEdgeDetector(ndvi_sep, 0.1);
// Mask the image with itself to get rid of areas with no edges.
canny_sep = canny_sep.updateMask(canny_sep);
//Map.addLayer(ndvi, {"opacity":1,"bands":["nd"],"min":0.01998780965805054,"max":0.683561384677887,
//"palette":["ff5a29","ffc65d","fcff56","dcff71","a4ff5f","42c546"]}, 'NDVI Octubre',0);
//Map.addLayer(canny, {min: 0, max: 1, palette: 'FF0000'}, 'Bordes Octubre',0);
//Corte de la banda ndvi a la medida de los poligonos
var cut_sep = ndvi_sep.clip(geometry);
//--------------------- Octubre
var oct = imagenes.filterBounds(geometry).filterDate('2020-10-01','2020-10-26')
                          .filterMetadata('CLOUDY_PIXEL_PERCENTAGE',"less_than",5).mosaic();
//print(oct)
//throw('epyta')
//Analisis de NDVI
var ndvi_oct = oct.normalizedDifference(['B8','B4']);
// Detect edges in the composite.
var canny_oct = ee.Algorithms.CannyEdgeDetector(ndvi_oct, 0.1);
// Mask the image with itself to get rid of areas with no edges.
canny_oct = canny_oct.updateMask(canny_oct);
//Map.addLayer(ndvi, {"opacity":1,"bands":["nd"],"min":0.01998780965805054,"max":0.683561384677887,
//"palette":["ff5a29","ffc65d","fcff56","dcff71","a4ff5f","42c546"]}, 'NDVI Octubre',0);
//Map.addLayer(canny, {min: 0, max: 1, palette: 'FF0000'}, 'Bordes Octubre',0);
//Corte de la banda ndvi a la medida de los poligonos
var cut_oct = ndvi_oct.clip(geometry);
//----------------------------------------------Noviembre
var nov = imagenes.filterBounds(geometry)
                          .filterDate('2020-11-15','2020-11-30')
                          .filterMetadata('CLOUDY_PIXEL_PERCENTAGE',"less_than",10).mosaic();
//var mosaico = filterImage.mosaic()
//Analisis de NDVI
var ndvi_nov = nov.normalizedDifference(['B8','B4']);
//SAVI (Soil Adjusted Vegetation Index)
var SAVI = nov.expression ('float (((NIR - RED) / (NIR + RED + L))* (1+L))',{
    'L': 0.75, // Cobertura vegetacion 0-1
    'NIR': nov.select ('B8'),
    'RED': nov.select ('B4')});
print(SAVI)
// Detect edges in the composite.
var canny_nov = ee.Algorithms.CannyEdgeDetector(ndvi_nov, 0.1);
// Mask the image with itself to get rid of areas with no edges.
canny_nov = canny_nov.updateMask(canny_nov);
//Map.addLayer(ndvi, {"opacity":1,"bands":["nd"],"min":0.01998780965805054,"max":0.683561384677887,
//"palette":["ff5a29","ffc65d","fcff56","dcff71","a4ff5f","42c546"]}, 'NDVI NOVIEMBRE',0);
//Map.addLayer(canny, {min: 0, max: 1, palette: 'FF0000'}, 'Bordes Noviembre');
//Corte de la banda ndvi a la medida de los poligonos
var cut_nov = ndvi_nov.clip(geometry);
//--------------------------------------------- Agregar en el mapas
//--------------------------RGB
//------Septiembre
Map.addLayer(sep,{"opacity":1,"bands":["B4","B3","B2"],
"min":497.75111903099753,"max":1653.7636679364214,
"gamma":1},'Septiembre 25');
//-------Octubre
Map.addLayer(oct,{"opacity":1,"bands":["B4","B3","B2"],
"min":497.75111903099753,"max":1653.7636679364214,
"gamma":1},'Octubre 25');
//-------Noviembre.
Map.addLayer(nov,{"opacity":1,"bands":["B4","B3","B2"],
"min":497.75111903099753,"max":1653.7636679364214,
"gamma":1},'Noviembre');
Map.addLayer (SAVI, {"opacity":1,"bands":["B8"],"min":0.4,"max":1,
"palette":["ff5a29","ffc65d","fcff56","dcff71","a4ff5f","42c546"]}, 'SAVI',0);
//---Poligonos
Map.addLayer(geometry,{palette:'ff0000'},'poligonos');
//-------------------------NDVI.
//------Septiembre
Map.addLayer(cut_sep,{"opacity":1,"bands":["nd"],"min":0.01998780965805054,"max":0.683561384677887,
"palette":["ff5a29","ffc65d","fcff56","dcff71","a4ff5f","42c546"]},'NDVI Septiembre 25');
//------Octubre
Map.addLayer(cut_oct,{"opacity":1,"bands":["nd"],"min":0.01998780965805054,"max":0.683561384677887,
"palette":["ff5a29","ffc65d","fcff56","dcff71","a4ff5f","42c546"]},'NDVI OCTUBRE 25');
//------NOVIEMBRE.
Map.addLayer(cut_nov,{"opacity":1,"bands":["nd"],"min":0.01998780965805054,"max":0.683561384677887,
"palette":["ff5a29","ffc65d","fcff56","dcff71","a4ff5f","42c546"]},'NDVI NOVIEMBRE 29');
Map.centerObject(geometry,11)
//------------------------------------Descargas
//-------------------NDVI
var id = cut_sep.id().getInfo();
Export.image.toDrive({image: cut_sep, scale: 10, description: id, fileNamePrefix: 'Septiembre_25',
  region: geometry, maxPixels: 1e10});
var id = cut_oct.id().getInfo();
Export.image.toDrive({image: cut_oct, scale: 10, description: id, fileNamePrefix: 'Octubre_25',
  region: geometry, maxPixels: 1e10});
var id = cut_nov.id().getInfo();
Export.image.toDrive({image: cut_nov, scale: 10, description: id, fileNamePrefix: 'Noviembre_29',
  region: geometry, maxPixels: 1e10});