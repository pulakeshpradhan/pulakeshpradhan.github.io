var table = ui.import && ui.import("table", "table", {
      "id": "users/gaguilar/CAMPE"
    }) || ee.FeatureCollection("users/gaguilar/CAMPE"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/gaguilar/04_incendios_2020"
    }) || ee.FeatureCollection("users/gaguilar/04_incendios_2020"),
    Estados = ui.import && ui.import("Estados", "table", {
      "id": "users/gaguilar/Estados"
    }) || ee.FeatureCollection("users/gaguilar/Estados"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/gaguilar/YUCA"
    }) || ee.FeatureCollection("users/gaguilar/YUCA");
//FUNCIONES BÁSICAS, INTERMEDIAS, AVANZADAS
//BÁSICO PERO POTENTE
//AHORRO DE TIEMPO EN PROCESAMIENTO, AHORRO DE MEMORIA EN DD, ORDENADORES DE GAMA INTERMEDIA, 
//MÁS TIEMPO PARA ANALIZAR DATOS
//BUENA CONEXIÓN A INTERNET 
//REFLECTANCIA 
//1.OBTENCION DE NBR de 01-01-20  al 30-07-2020 
//L8-B5	Infrarrojo cercano (NIR)	0.851 - 0.879	
//L8-B7	Infrarrojo de onda corta 2 (SWIR 2)	2.107 - 2.294	)
//2.COMBINACION DE BANDAS 762 PARA IDENTIFICAR FUEGOS
//3.EXTRACCION DE FUEGOS
//4.IDENTIFICACION DE DISTINTOS PATRONES
//CREAR GRAFICO DE NBR Y NDVI PARA ZONAS NO AFECTADAS POR FUEGO 
//CREAR GRAFICO DE NBR Y NDVI PARA ZONAS AFECTADAS POR FUEGO T2020 (01-01-20- ACTUALIDAD) 
//CREAR GRAFICO DE NBR Y NDVI PARA ZONAS IDENTIFICADAS CON FUEGO 
//6.EVALUACIÓN DE ZONAS DE INFLUENCIA/AFECTADAS
//7.EVALUACIÓN DE LA RESILIENCIA DE AREAS AFECTADAS
//8.COMPARTIR CÓDIGO
//primero se crea varible NBR
var nbr = function (image)
{
var nbr2 = image.expression(
    '(nir -SWir) / (nir + SWir)',
    {
        nir: image.select('B5'),    
        SWir: image.select('B7')    
    });
image  = image.addBands(nbr2.rename('NBR'));
return  image;
};
var ndvi = function (image)
{
var ndvi2 = image.expression(
    '(nir - red) / (nir + red)',
    {
        nir: image.select('B5'),    
        red: image.select('B4')    
    });
var image2  = image.addBands(ndvi2.rename('NDVI'));
return  image2;
};
//se llama a la coleccion de imágenes L8
var img = ee.ImageCollection('LANDSAT/LC08/C01/T1_RT_TOA')
//este es el unico campo que se puede cambiar,fecha,
//elejir intervalos amplios de tiempo 
    .filterDate('2020-01-01', '2020-06-30')
//No cambiar nada de ahora en adelante, a menos que sepa lo que hace   
    .filterMetadata('CLOUD_COVER', 'less_than',10)
    .filterBounds(Estados)
    .map(nbr)
     .map(ndvi);
var vizParams = {
  bands: ['B7'],
  min: 0.44,
  max: 1.40,
};
Map.addLayer(img.median (),{min: 0, max: 1,bands:['NBR']}, 'NBR_2020');
Map.addLayer(img, vizParams,'fuegos',false);
Map.addLayer(img, {min: 0, max: 1, bands:'B7,B6,B2' }, 'fuegos_T20');
Map.addLayer(img, {min: 0.05, max: 0.20, bands:'B4,B3,B2' }, 'color real_T20',false);
//Map.addLayer(img.median (),{min: 0, max: 1,bands:['NBR']}, 'NBR_2020');
//Map.addLayer(table2);
Map.addLayer(table2, {min:1, max:1, color:"red"}, 'Temporada 2020',false);
//Map.addLayer(table4);
Map.centerObject(Estados);
//boton para centrar CAMPE
var botonC = ui.Button ({label: 'Yucatán', onClick: function (n)
  { n = Map.centerObject(table3);
  }, style: { color:'green', backgroundColor: 'orange', position: 'bottom-left'}});
  Map.add(botonC);
// grafico al hacer click
var IMGLandsat8= ee.ImageCollection ('LANDSAT/LC08/C01/T1_TOA') 
  .filterDate ('2018-01-01', '2020-06-29') 
  .filterBounds (Estados) 
  .filterMetadata ('CLOUD_COVER', 'Less_Than', 2)
  .map(function (o){
var ndvi = o.normalizedDifference(['B5', 'B4']);
o = o.addBands(ndvi.rename('NDVI'));
return o.clip(Estados);
})
 .map(function (o){
var nbr = o.normalizedDifference(['B7', 'B5']);
o = o.addBands(nbr.rename('NBR'));
return o.clip(Estados);
});  
var visparms = {bands:['NDVI'], min: -1, max: 1, palette: ['blue', 'black', 'white','yellow','green','red']};
var visparms2 = {bands:['NBR'], min: -1, max: 1, palette: ['red', 'orange','yellow', 'white']};
//Map.addLayer(IMGLandsat8, visparms, 'NDVI')
//Map.addLayer(IMGLandsat8, visparms2, 'NBR')
var lon = ui.Label();
var lat = ui.Label();
Map.onClick (function(click){
  lon.setValue('longitud:'+ click.lon.toFixed(2));
  lat.setValue('latitud:'+ click.lat.toFixed(2));
  var punto = ee.Geometry.Point(click.lon, click.lat);
  var dibujo= ui.Map.Layer(punto);
  Map.layers().set(1, punto);
  Map.centerObject(punto, 16);
  var grafico = ui.Chart.image.series(IMGLandsat8.select('NDVI', 'NBR'), punto, ee.Reducer.mean(),10);
  //Map.widgets().set(2, grafico)
  var panel= ui.Panel({widgets: grafico, layout: ui.Panel.Layout.Flow('vertical') 
  , style: {
   width: '300px',
   height: '300px',
   position: 'bottom-left'
}});
Map.widgets().set(2, panel);
}
);
Map.centerObject(Estados, 7);