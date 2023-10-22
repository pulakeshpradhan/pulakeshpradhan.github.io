var geometry = ui.import && ui.import("geometry", "table", {
      "id": "users/rrmeza89/poligonos_atributosResiproaf"
    }) || ee.FeatureCollection("users/rrmeza89/poligonos_atributosResiproaf"),
    imagenes = ui.import && ui.import("imagenes", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2");
var oct = imagenes.filterBounds(geometry).filterDate('2019-10-01','2019-11-26')
                          .filterMetadata('CLOUDY_PIXEL_PERCENTAGE',"less_than",5).mosaic();
Map.addLayer(oct,{"opacity":1,"bands":["B4","B3","B2"],
"min":497.75111903099753,"max":1653.7636679364214,
"gamma":1},'Imagen');
print(oct)
//throw('epyta')
//Centrar la vista en donde estan las parcelas objetivas
Map.centerObject(geometry,12);
//var mosaico = filterImage.mosaic()
//Analisis de NDVI
var ndvi1 = oct.normalizedDifference(['B8','B4']);
// Detect edges in the composite.
var canny1 = ee.Algorithms.CannyEdgeDetector(ndvi1, 0.1);
// Mask the image with itself to get rid of areas with no edges.
canny1 = canny1.updateMask(canny1);
//Map.addLayer(ndvi, {"opacity":1,"bands":["nd"],"min":0.01998780965805054,"max":0.683561384677887,
//"palette":["ff5a29","ffc65d","fcff56","dcff71","a4ff5f","42c546"]}, 'NDVI Octubre',0);
//Map.addLayer(canny, {min: 0, max: 1, palette: 'FF0000'}, 'Bordes Octubre',0);
//Corte de la banda ndvi a la medida de los poligonos
var cut1 = ndvi1.clip(geometry);
//----------------Noviembre
var filterImage = imagenes.filterBounds(geometry)
                          .filterDate('2020-01-01','2020-02-15')
                          .filterMetadata('CLOUDY_PIXEL_PERCENTAGE',"less_than",10).mosaic();
//var mosaico = filterImage.mosaic()
//Analisis de NDVI
var ndvi = filterImage.normalizedDifference(['B8','B4']);
// Detect edges in the composite.
var canny = ee.Algorithms.CannyEdgeDetector(ndvi, 0.1);
// Mask the image with itself to get rid of areas with no edges.
canny = canny.updateMask(canny);
//Map.addLayer(ndvi, {"opacity":1,"bands":["nd"],"min":0.01998780965805054,"max":0.683561384677887,
//"palette":["ff5a29","ffc65d","fcff56","dcff71","a4ff5f","42c546"]}, 'NDVI NOVIEMBRE',0);
//Map.addLayer(canny, {min: 0, max: 1, palette: 'FF0000'}, 'Bordes Noviembre');
//Corte de la banda ndvi a la medida de los poligonos
var cut = ndvi.clip(geometry);
Map.addLayer(geometry,{palette:'ff0000'},'poligonos');
//visualizacion de ndvi cortado OCTUBRE.
Map.addLayer(cut1,{"opacity":1,"bands":["nd"],"min":0.01998780965805054,"max":0.683561384677887,
"palette":["ff5a29","ffc65d","fcff56","dcff71","a4ff5f","42c546"]},'NDVI Noviembre 2019');
//visualizacion de ndvi cortado NOVIEMBRE.
Map.addLayer(cut,{"opacity":1,"bands":["nd"],"min":0.01998780965805054,"max":0.683561384677887,
"palette":["ff5a29","ffc65d","fcff56","dcff71","a4ff5f","42c546"]},'NDVI_CLIP Febrero 2020');
Map.centerObject(geometry,11)
//throw('epyta')
//Descargas
//-------------------NDVI
var id = cut.id().getInfo();
Export.image.toDrive({image: cut, scale: 10, description: id, fileNamePrefix: 'NDVIDIAFPA_29/11',
  region: geometry, maxPixels: 1e10});
//------------------Borde.
var id = canny.id().getInfo();
Export.image.toDrive({image: canny, scale: 10, description: id, fileNamePrefix: 'Bordes_NDVI01',
  region: geometry, maxPixels: 1e10});