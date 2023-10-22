/*
Author: Adrian Rodriguez Meza (adr.rod44@gmail.com)
This code is free and open. 
By using this code and any data derived with it, 
you agree to cite the following reference 
in any publications derived from them:
Rodríguez, A, Moncayo, D., Quilumba, S., Ruales, B., 2020. 
    Estimated Surface Temperature Variation of the Earth (LST) in the National Park Yasuní - Ecuador with Remote Sensor
    Techniques and Cloud Computing., GC103-0011;
    "https://agu.confex.com/agu/fm20/meetingapp.cgi/Paper/750125"
Bibliography:
  -- Ermida, S.L., Soares, P., Mantas, V., Göttsche, F.-M., Trigo, I.F., 2020. 
      Google Earth Engine open-source code for Land Surface Temperature estimation from the Landsat series.
      Remote Sensing, 12 (9), 1471; https://doi.org/10.3390/rs12091471
  -- Sobrino, Jose & Jimenez-Munoz, Juan-Carlos & Paolini, Leo. (2004).
      Land surface temperature retrieval from LANDSAT TM 5.
      Remote Sensing of Environment. 90. 434-440. 10.1016/j.rse.2004.02.003.
  -- Ugur Avdan, Gordana Jovanovska, (vol. 2016)
      "Algorithm for Automated Mapping of Land Surface Temperature Using LANDSAT 8 Satellite Data",
      Journal of Sensors, Article ID 1480307, 8 pages, 2016. https://doi.org/10.1155/2016/1480307
*/
// 1) Map title (Título del mapa)
{
var title = ui.Label('Land Surface Temperature Map');
title.style().set({
  position: 'top-center',
  fontWeight: 'bold'
});
Map.add(title);
}
// 2) Base Information (Informacion base)
/** 
En: It contains the vector file where the Yasuní National Park is delimited.
It can be found in the GEE Assets repository and can be opened through the following link:
Es: Contiene el archivo vectorial donde se delimita el Parque Nacional Yasuní.
Se puede encontrar en el repositorio de GEE Assets y se puede abrir a través del siguiente enlace:
https://code.earthengine.google.com/?asset=users/adrrod44/Proyecto_Yasuni
**/
{
var table = ee.FeatureCollection("users/adrrod44/Proyecto_Yasuni/snap_ambito_fonag_2017");
//Definimos el area de estudio
var YASUNI = table.filter(ee.Filter.eq("NOMBRE", "YASUNI"));
Map.addLayer(YASUNI,{}, "Yasuni National Park");
var roi =  YASUNI;
Map.centerObject(roi, 10);
}
// 3) Creation of Functions (Creación de Funciones)
/** 
En: In this section, the functions that are necessary for the correct estimation of the
LST in Landsat images were created. These are
Es: En este apartado se crearan las funciones que son necesarias para el correcto
la estimacion de la LST en las imagenes Landsat. Estas son:
**/
//3.1) Function to cut images (Función para cortar las imáges)
var corte = function(img){
  var img_corte = img.clip(roi);
  return img_corte; 
};
//3.2) Function to mask the L5 and L7 clouds (Funcion para enmascarar las nubes L5 y L7)
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
//3.3) NDVI Fuction L5 and L7 (Funcion NDVI L5 y L7)
function NDVI_Lt7 (img){
        var NDVI_img = img.addBands(img.normalizedDifference(['B4','B3']).rename("NDVI"));
        return NDVI_img;
}
//3.4) Function to mask the L8 clouds(Funcion para Mascara de nubes Landsat 8)
function maskL8sr(image) {
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = (1 << 3);
  var cloudsBitMask = (1 << 5);
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
                 .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  return image.updateMask(mask);
}
//3.5) NDVI Fuction L8 (Funcion para NDVI Lt 8)
function NDVI_Lt8 (img){
        var NDVI_img = img.addBands(img.normalizedDifference(['B5','B4']).rename("NDVI"));
        return NDVI_img;
}
//4) Reducers (Reductores)
// En: They are necessary to extract statistical information from an image in GEE.
// Es: Son necesarios para extraer la informacion estadistica de una imagen en GEE.
{
  var reducers = ee.Reducer.mean();
      reducers = reducers.combine({
      reducer2: ee.Reducer.stdDev(),
      sharedInputs: true
    });
      reducers = reducers.combine({
       reducer2: ee.Reducer.max(),
        sharedInputs: true
      });
      reducers = reducers.combine({
        reducer2: ee.Reducer.min(),
        sharedInputs: true
    });
}
// 5) Input variables (Variables de entrada)
{
var inicial = 1988; //En: Year in which L5 data collection begins in the study area.
                    //Es: Año en el que inicia la toma de datos L5 en el area de estudio.
var final = 2020; //En: Year in which data collection ends up to the date of publication.
                  //Es: Año en el que termina la toma de datos asta la fecha de publicación.
var n = 0; //Increase (Incremento)
var Coleccion_prom = []; //En: List where the annual average of the LST is stored
                        //Es: Lista donde va guardando el promedio anual de la LST 
var An = []; //En: Year in which you are working within the for cycle
             //Es: Año en el que se esta trabajando dentro del ciclo for
}
//6) LST annual average calculation (Calculo promedio anual LST)
{
//Landsat 5 (1988 - 1991)
for(var i=inicial; i <= 1991; i=i+1){
  var year = i;
  An[n] = year;
  var startDate = ee.Date.fromYMD(year,1,1);
  var endDate = ee.Date.fromYMD(year,12,31);
  //Cargamos la coleccion
  var Fecha_inicio = startDate;
  var Fecha_fin = endDate;
  var Coleccion_L5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR")
                      .filterBounds (roi)
                      .filterDate(Fecha_inicio, Fecha_fin);
                      //.filterMetadata("CLOUD_COVER", "less_than", 100);
  var Coleccion_L5_cortada = Coleccion_L5.map(corte);
  //Coleccion mascara de nubes
  var Coleccion_mask = Coleccion_L5_cortada.map(cloudMaskL457);
  //Coleccion NDVI
  var Coleccion = Coleccion_mask.map(NDVI_Lt7);
  // Get the timestamp from the most recent image in the reference collection.
  var time0 = Coleccion_L5.first().get('system:time_start');
  //Coleccion promedio
  Coleccion_prom[n] = Coleccion.mean().set('system:time_start', time0);
  var B4 = Coleccion_prom[n].select(["B6", "NDVI"]).rename("brightness", "NDVI");
  Coleccion_prom[n] = B4;
  //Tamaño de la imagen
  var N_imagenes = Coleccion_L5.size();
  Coleccion_prom[n] = Coleccion_prom[n].set('N_imagenes', N_imagenes);
  //Temperatura
  {
        var NDVI = Coleccion_prom[n].select("NDVI");
          //Calculamos las estadisticas de una imagen
        var stat = NDVI.reduceRegion({
            reducer: reducers,
            geometry: roi,
            scale: 30,
            maxPixels: 1e9
        });
        var min = stat.getNumber("NDVI_min");
        var max = stat.getNumber("NDVI_max");
        var B10 = Coleccion_prom[n].select('brightness').multiply(0.1);
        var Pv =(NDVI.subtract(min).divide(max.subtract(min))).pow(ee.Number(0.5)).rename('Pv'); 
        var a= ee.Number(0.004);
        var b= ee.Number(0.986);
        var em=Pv.multiply(a).add(b).rename('em');
        var Temperature = B10.expression(
        '(TB/(1 + (0.00115* (TB / 1.438))*log(em)))-273.15', {
        'TB': B10.select('brightness'),
        'em': em.select('em')
        }).rename('LST');
        var Temp = Coleccion_prom[n].addBands(Temperature);
  Coleccion_prom[n] = Temp;
  }
  //Año de la imagen
  Coleccion_prom[n] = Coleccion_prom[n].set('Year', year);
  //Aumento de la coleccion
  n = n+1;
}
/**
En: From 1991 to 1996 there are no images in the study area,
therefore the Landsat 5 images are repeated
Es: Desde el año 1992 al 1995 no hay imagenes en la zona de estudio, 
por ello se repite las imagenes Landsat 5
**/
var inicial = 1996;
//Landsat 5 (1996 - 1999)
for(var i=inicial; i <= 1999; i=i+1){
  var year = i;
  An[n] = year;
  var startDate = ee.Date.fromYMD(year,1,1);
  var endDate = ee.Date.fromYMD(year,12,31);
  //Cargamos la coleccion
  var Fecha_inicio = startDate;
  var Fecha_fin = endDate;
  var Coleccion_L5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_SR")
                      .filterBounds (roi)
                      .filterDate(Fecha_inicio, Fecha_fin);
                      //.filterMetadata("CLOUD_COVER", "less_than", 100);
  var Coleccion_L5_cortada = Coleccion_L5.map(corte);
  //Coleccion mascara de nubes
  var Coleccion_mask = Coleccion_L5_cortada.map(cloudMaskL457);
  //Coleccion NDVI
  var Coleccion = Coleccion_mask.map(NDVI_Lt7);
  // Get the timestamp from the most recent image in the reference collection.
  var time0 = Coleccion_L5.first().get('system:time_start');
  //Coleccion promedio
  Coleccion_prom[n] = Coleccion.mean().set('system:time_start', time0);
  var B4 = Coleccion_prom[n].select(["B6", "NDVI"]).rename("brightness", "NDVI");
  Coleccion_prom[n] = B4;
  //Tamaño de la imagen
  var N_imagenes = Coleccion_L5.size();
  Coleccion_prom[n] = Coleccion_prom[n].set('N_imagenes', N_imagenes);
  //Temperatura 
  {
        var NDVI = Coleccion_prom[n].select("NDVI");
          //Calculamos las estadisticas de una imagen
        var stat = NDVI.reduceRegion({
            reducer: reducers,
            geometry: roi,
            scale: 30,
            maxPixels: 1e9
        });
        var min = stat.getNumber("NDVI_min");
        var max = stat.getNumber("NDVI_max");
        var B10 = Coleccion_prom[n].select('brightness').multiply(0.1);
        var Pv =(NDVI.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('Pv'); 
        var a= ee.Number(0.004);
        var b= ee.Number(0.986);
        var em=Pv.multiply(a).add(b).rename('em');
        var Temperature = B10.expression(
        '(TB/(1 + (0.00115* (TB / 1.438))*log(em)))-273.15', {
        'TB': B10.select('brightness'),
        'em': em.select('em')
        }).rename('LST');
        var Temp = Coleccion_prom[n].addBands(Temperature);
  Coleccion_prom[n] = Temp;
  }
  //Año de la imagen
  Coleccion_prom[n] = Coleccion_prom[n].set('Year', year);
  //Aumento de la coleccion
  n = n+1;
}
//landsat 7 (2000 - 2012)
for(i; i <= 2012; i=i+1){
  var year = i;
  An[n] = year;
  var startDate = ee.Date.fromYMD(year,1,1);
  var endDate = ee.Date.fromYMD(year,12,31);
  //Cargamos la coleccion
  var Fecha_inicio = startDate;
  var Fecha_fin = endDate;
  var Coleccion_L7 = ee.ImageCollection("LANDSAT/LE07/C01/T1_SR")
                      .filterBounds (roi)
                      .filterDate(Fecha_inicio, Fecha_fin);
                      //.filterMetadata("CLOUD_COVER", "less_than", 100);
  var Coleccion_L7_cortada = Coleccion_L7.map(corte);
  //Coleccion mascara de nubes
  var Coleccion_mask = Coleccion_L7_cortada.map(cloudMaskL457);
  //Coleccion NDVI
  var Coleccion = Coleccion_mask.map(NDVI_Lt7);
  // Get the timestamp from the most recent image in the reference collection.
  var time0 = Coleccion.first().get('system:time_start');
  //Coleccion promedio
  Coleccion_prom[n] = Coleccion.mean().set('system:time_start', time0);
  var B4 = Coleccion_prom[n].select(["B6", "NDVI"]).rename("brightness", "NDVI");
  Coleccion_prom[n] = B4;
  //Tamaño de la imagen
  var N_imagenes = Coleccion_L7.size();
  Coleccion_prom[n] = Coleccion_prom[n].set('N_imagenes', N_imagenes);  
  //Temperatura
  {
        var NDVI = Coleccion_prom[n].select("NDVI");
          //Calculamos las estadisticas de una imagen
        var stat = NDVI.reduceRegion({
            reducer: reducers,
            geometry: roi,
            scale: 30,
            maxPixels: 1e9
        });
        var min = stat.getNumber("NDVI_min");
        var max = stat.getNumber("NDVI_max");
        var B10 = Coleccion_prom[n].select('brightness').multiply(0.1);
        var Pv =(NDVI.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('Pv'); 
        var a= ee.Number(0.004);
        var b= ee.Number(0.986);
        var em=Pv.multiply(a).add(b).rename('em');
        var Temperature = B10.expression(
        '(TB/(1 + (0.00115* (TB / 1.438))*log(em)))-273.15', {
        'TB': B10.select('brightness'),
        'em': em.select('em')
        }).rename('LST');
        var Temp = Coleccion_prom[n].addBands(Temperature);
  Coleccion_prom[n] = Temp;
}
  //Año de la imagen
  Coleccion_prom[n] = Coleccion_prom[n].set('Year', year);
  //Aumento de la coleccion
  n = n+1;
}
//Landsat 8 (2013 - 2020)
for(i; i <= final; i=i+1){
  var year = i;
  An[n] = year;
  var startDate = ee.Date.fromYMD(year,1,1);
  var endDate = ee.Date.fromYMD(year,12,31);
  //Cargamos la coleccion
  var Fecha_inicio = startDate;
  var Fecha_fin = endDate;
  var Coleccion_L8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
                      .filterBounds (roi)
                      .filterDate(Fecha_inicio, Fecha_fin);
                      //.filterMetadata("CLOUD_COVER", "less_than", 100);
  var Coleccion_L8_cortada = Coleccion_L8.map(corte);
  //Coleccion mascara de nubes
  var Coleccion_mask = Coleccion_L8_cortada.map(maskL8sr);
  //Coleccion NDVI
  var Coleccion = Coleccion_mask.map(NDVI_Lt8);
  // Get the timestamp from the most recent image in the reference collection.
  var time0 = Coleccion.first().get('system:time_start');
  //Coleccion promedio
  Coleccion_prom[n] = Coleccion.mean().set('system:time_start', time0);
  var B4 = Coleccion_prom[n].select(["B10", "NDVI"]).rename("brightness", "NDVI");
  Coleccion_prom[n] = B4;
  //Tamaño de la imagen
  var N_imagenes = Coleccion_L8.size();
  Coleccion_prom[n] = Coleccion_prom[n].set('N_imagenes', N_imagenes); 
  //Temperatura
  {
        var NDVI = Coleccion_prom[n].select("NDVI");
          //Calculamos las estadisticas de una imagen
        var stat = NDVI.reduceRegion({
            reducer: reducers,
            geometry: roi,
            scale: 30,
            maxPixels: 1e9
        });
        var min = stat.getNumber("NDVI_min");
        var max = stat.getNumber("NDVI_max");
        var B10 = Coleccion_prom[n].select('brightness').multiply(0.1);
        var Pv =(NDVI.subtract(min).divide(max.subtract(min))).pow(ee.Number(2)).rename('Pv'); 
        var a= ee.Number(0.004);
        var b= ee.Number(0.986);
        var em=Pv.multiply(a).add(b).rename('em');
        var Temperature = B10.expression(
        '(TB/(1 + (0.00115* (TB / 1.438))*log(em)))-273.15', {
        'TB': B10.select('brightness'),
        'em': em.select('em')
        }).rename('LST');
        var Temp = Coleccion_prom[n].addBands(Temperature);
  Coleccion_prom[n] = Temp;
}
  //Año de la imagen
  Coleccion_prom[n] = Coleccion_prom[n].set('Year', year);
  //Aumento de la coleccion
  n = n+1;
}
}
//7) On screen display (Visualización en Pantalla)
{
//Display parameters (Parámetros de visualización)
var Vis = {
  //"opacity":1,
  "bands":["LST"],
  "min":17, "max":25,
  "palette":[
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003']
};
//Añadir al mapa
for(var o = 0; o < n; o=o+1){
  var a = An[o];
  Map.addLayer(Coleccion_prom[o], Vis, "Mean temperature "+a, 0);
  /**
  // Export the image, specifying scale and region.
  Export.image.toDrive({
    image: Coleccion_prom[o].toFloat(),
    description: "Temperatura_promedio_"+a,
    scale: 30,
    region: roi
  });
  **/
}
var collection_Lt = ee.ImageCollection(Coleccion_prom);
print("Coleccion_LST_Anual", collection_Lt);
var collection_LST = collection_Lt.select("LST");
Map.addLayer(collection_LST,Vis,"collection_LST",1);
//Barra Temperatura
{
var palette = ['040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'];
var makeColorBarParams = function (palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x8',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
};
var colorBar = ui.Thumbnail({
  //Se crea una imagen que contiene los valores de lat y long por pixel
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(Vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '100px', width: '200px'},
});
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(Vis.min, {margin: '4px 5px'}),
    ui.Label(
        ((Vis.max + Vis.min) / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(Vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'LST variation °C',
  style: {
    fontWeight: 'bold',
    margin: '4px 8px'
    //width: '200px',
    //height : '10px'
  }
});
var legendPanel = ui.Panel(legendTitle).add(colorBar).add(legendLabels);
legendPanel.style().set({
  //height: '95px',
  //width: '200px',
  position: 'bottom-right'
});
Map.add(legendPanel);
}
}
//8) Collection Animated Gif Generation (Generación del Gif animado de la colección)
{
// Cramos la visualizacion a las imagenes.
var RGBvis = collection_Lt.map(function(img) {
return img.visualize(Vis);
});
// Area de creacion del gif
var Area_Estudio = 
    ee.Geometry.Polygon(
        [[[-76.85415103505431, -0.3670160337764574],
          [-76.85415103505431, -1.833380400225754],
          [-75.35451724599181, -1.833380400225754],
          [-75.35451724599181, -0.3670160337764574]]], null, false);
// Define GIF visualization parameters.
var gifParams = {
'region': Area_Estudio,
'dimensions': 900,
'crs': 'EPSG:4326',
'framesPerSecond': 3
};
// Parametrizamos el timelapse con proyección, resolución, AOI, valores de pixel y frames/seg
var Timelapse = {
  crs: 'EPSG:4326',
  dimensions: 900,
  region: Area_Estudio,
  //min: 0,
  //max: 3000,
  //palette: 'ffffff, fcd163, 99b718, 66a000, 3e8601, 207401, 056201, 004c00, 011301',
  framesPerSecond: 3,};
// Creamos la animación con la colección de imagenes y parámetros del timelapses
var Animacion = ui.Thumbnail({
  image: RGBvis ,
  params: Timelapse,
  style: {
    position: 'bottom-left', 
    width: '300px'}});
Map.add(Animacion);
}
//9) Exporting the images to the drive (Exportación de las imágenes al drive)
/**
{
for(var o = 0; o < n; o=o+1){
  var a = An[o];
  // Export the image, specifying scale and region.
  Export.image.toDrive({
    image: Coleccion_prom[o].toFloat(),
    description: "Temperatura_promedio_"+a,
    scale: 30,
    region: roi
  });
}
}
**/
//10) Export to video (Exportacion del video)
/**
{
  Export.video.toDrive({
  collection: RGBvis,
  description: 'LST_Yasuni',
  dimensions: 720,
  framesPerSecond: 1,
  region: Area_Estudio
});  
}
**/