var AOI = ui.import && ui.import("AOI", "table", {
      "id": "users/DGI/aconcagua"
    }) || ee.FeatureCollection("users/DGI/aconcagua");
//////////////////////////////////////////////////////////
// Objetivos
// 1. Crear una animación con el promedio anual de la cobertura de nieve (NDSI)
// 2. Crear una animación con el promedio mensual de la cobertura de nieve (NDSI)
// 3. Elaborar un Widgets básico 
// 4. Crear una aplicación en GEE
// 5. Exportar datos de interés
////////////////////////////////////////////////////////
////Tomamos el código desarrollado en el ejercicio práctico del día 2 //
// 1. Selección de producto nieve Terra (MOD10A1) y seleccionar banda de nieve
var MOD = ee.ImageCollection('MODIS/006/MOD10A1').select('NDSI_Snow_Cover');
// 2. Calcular nieve binaria a partir NDSI MODIS
// Cambiar valores de NDSI de 20, 30, 40 y producir
// una banda para cada producto binario
var snow_binary = function(image){
  var snow_20 = image.gt(20).multiply(100).rename('snow_20');
  var snow_30 = image.gt(30).multiply(100).rename('snow_30');
  var snow_40 = image.gt(40).multiply(100).rename('snow_40');
  return image.addBands(snow_20).addBands(snow_30).addBands(snow_40);
};
var MOD_binary = MOD.map(snow_binary);
/// Se crea una nueva colección con el promedio de snow binary
var MOD_mean = MOD_binary.mean().clip(AOI).select('snow_40'); 
//print('MOD mean:', MOD_mean)
// Creación de dos image collection: una por mensual y otra por anual
// Rango de años
var years = ee.List.sequence(2000, 2021);
// Calculate yearly SCI
var SCIbyYear = ee.ImageCollection.fromImages(
  years.map(function(y) {
    return MOD_binary
    .filter(ee.Filter.calendarRange(y, y, 'year'))
    .mean()
    .set('year', y)
    .clip(AOI);
  }).flatten());
//print(SCIbyYear);
// Months time range.
var months = ee.List.sequence(1, 12);
// Calculate monthly NDSI.
var SCIbyMonth = ee.ImageCollection.fromImages(
  months.map(function(m) {
    return MOD_binary
    .filter(ee.Filter.calendarRange(m, m, 'month'))
    .mean()
    .set('month', m)
    .clip(AOI);
  }).flatten());
//print(SCIbyMonth); 
///////////////////////////////////////////////////////////////////////////////
// Graficar el patrón anual de la cobertura de nieve
var ChartYear = 
  ui.Chart.image.series({
    imageCollection: SCIbyYear,
    region: AOI,
    reducer: ee.Reducer.mean(),
    scale: 500,
    xProperty:'year'
  }).setOptions({
    title: 'Cobertura de nieve promedio anual 2000-2021 en la cuenca del Rio Aconcagua, usando MODIS',
    vAxis: {title:'Cobertura Nieve (%)'},
    hAxis: {title:'Años'}, 
  });
//print('Gráfico Promedio anual',ChartYear) 
var ChartMonth = 
  ui.Chart.image.series({
    imageCollection: SCIbyMonth,
    region: AOI,
    reducer: ee.Reducer.mean(),
    scale: 500,
    xProperty:'month'
  }).setOptions({
    title: 'Cobertura de nieve promedio Mensual 2000-2021 en la cuenca del Rio Aconcagua, usando MODIS',
    vAxis: {title:'Cobertura Nieve (%)'},
    hAxis: {title:'Meses'}, 
  });
//print('Gráfico Promedio anual',ChartMonth) 
// #########################################################################
// ###                      Proyecto Día 3                              ####
// ###           Animaciones -  Widget -  Apps experimental             ####    
// #########################################################################
/////////////////////////////////////////////////////////////////////////////
//       1. Creación de animaciones con el promedio Anual
// Seleccione su ImageCollection by year, 
// y selecciona una de las bandas creadas en el proyecto 2
var SCIyear = SCIbyYear.select('snow_40'); 
//print('Colección anual, banda "snow_40":', SCIyear); 
// Defina los paremetros de visualización RGB
var visParams = {
  min: 0.0,
  max: 100.0,
  palette: [
            'fffff0', //  0 - 10
            'ffffb4', // 10 - 20
            'ffebbe', // 20 - 30
            'ffd37f', // 30 - 40
            'ffaa00', // 40 - 50
            'ff9800', // 50 - 60
            '70a800', // 60 - 70
            '00a884', // 70 - 80
            '0084a8', // 80 - 90
            '004c99'  // 90 - 100
 ],
};
// Cree imágenes de visualización RGB para usarlas como cuadros de animación visualización.
var rgbVis = SCIyear.map(function(img) {
  return img.visualize(visParams).clip(AOI);
});
//creamos una variable ROI
var ROI = ee.Geometry.Rectangle([-71.633, -32.229,
                                 -69.943, -33.200]);
// Defina los parametros de visualización del GIF.
var gifParams = {
  'region': ROI,
  'dimensions': 600,
  'crs': 'EPSG:3857',
  'framesPerSecond': 1
};
// Print la URL del GIF en la consola.
//print(rgbVis.getVideoThumbURL(gifParams));
// Render the GIF animation in the console. //Recuerde que el GIF solo puede ser impreso en la consola o en el panel, NO en ambos elementos
var Gifyear = ui.Thumbnail(rgbVis, gifParams);
//print(Gifyear);
//print(ui.Thumbnail(rgbVis, gifParams));
////////////////////////////////////////////////////////////////////////
//  2. Creación de animaciones con el promedio mensual
// Seleccione su ImageCollection byMonth, 
// y selecciona una de las bandas creadas en el proyecto 2
var Monthyear = SCIbyMonth.select('snow_40'); 
print('Coleccion mensual banda "snow_40:"', Monthyear); 
// Cree imágenes de visualización RGB para usarlas como cuadros de animación visualización.
var rgbVismonth = Monthyear.map(function(img) {
  return img.visualize(visParams).clip(AOI);
});
//creamos una variable ROI
var ROI = ee.Geometry.Rectangle([-71.633, -32.229,
                                 -69.943, -33.200]);
// Defina los parametros de visualización del GIF.
var gifParamsMonth = {
  'region': ROI,
  'dimensions': 600,
  'crs': 'EPSG:3857',
  'framesPerSecond': 1
};
//Los gif pueden ser impresos en la consola o en el panel, 
//para agregar en el panel debe comentar gif en la consola
// Print the GIF URL to the console.
print(rgbVismonth.getVideoThumbURL(gifParamsMonth));
// Render the GIF animation in the console.
var Gifmonth = ui.Thumbnail(rgbVismonth,gifParamsMonth);
//print(Gifmonth)
//print(ui.Thumbnail(rgbVismonth,gifParamsMonth)); 
////////////////////////////////////////////////////////////////////////
// 3. Elaborar un panel básico con distintos widget
var panel = ui.Panel({style: {width:'25.0%'}});
ui.root.insert(0,panel);
// Introduction 
var intro = ui.Label('Curso de Capacitación en Google Earth Engine\n, enfocado a nieves, 2022', 
  {fontWeight: 'bold', fontSize: '20px', margin: '10px 5px'}
);
panel.add(intro);
panel.add(ChartYear);
panel.add(Gifyear);
panel.add(ChartMonth);
panel.add(Gifmonth);
Map.addLayer(MOD_mean,visParams,'Promedio NDSI')
Map.centerObject(AOI,10);
// 4. Crear una Apps en la plataforma de Google Earth Engine(mostrar resultados obtenidos)
// 5. Exportar datos de interés
/// Trabajar con la colección promedio/// 
// Exporte la imagen, especificando escala y región
//Export.image.toDrive({
 // image: MOD_mean,
 // description: 'Ejemplo_imagen_a_Drive',
 // scale: 500,
 //region: AOI
//});
// Exporte la imagen a un recurso de Earth Engine
//Export.image.toAsset({
  //image: MOD_mean,
  //description: 'Ejemplo_imagen_al_Asset',
  //assetId: 'exampleExport',
  //scale: 500,
  //region: AOI,
//});