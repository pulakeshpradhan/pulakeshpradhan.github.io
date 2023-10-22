var estratos = ui.import && ui.import("estratos", "table", {
      "id": "users/reginoa579/Estratos_corregido"
    }) || ee.FeatureCollection("users/reginoa579/Estratos_corregido"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#ffe606",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ffe606 */ee.Geometry.MultiPoint(),
    obs_BulnesiaS = ui.import && ui.import("obs_BulnesiaS", "table", {
      "id": "users/reginoa579/MaxEnt_views/BulnesiaSarmientoi_geeMaxEnt"
    }) || ee.FeatureCollection("users/reginoa579/MaxEnt_views/BulnesiaSarmientoi_geeMaxEnt"),
    obs_CoperniciaA = ui.import && ui.import("obs_CoperniciaA", "table", {
      "id": "users/reginoa579/MaxEnt_views/CoperniciaAlbai_geeMaxEnt"
    }) || ee.FeatureCollection("users/reginoa579/MaxEnt_views/CoperniciaAlbai_geeMaxEnt");
var vis = {min: 0, max: 1, palette:'blue,green,yellow'};
// topografía
var DEM = ee.Image('USGS/GTOPO30').select('elevation');
var DEMClip = DEM.clip(estratos);
var pendiente = ee.Terrain.slope(DEMClip);
var laderas = ee.Terrain.aspect(DEMClip);
var hillshade = ee.Terrain.hillshade(DEMClip, 310, 15);
// var clasesPendiente = pendiente.where(pendiente.lte(5), 10)
//                                 .where(pendiente.gt(5).and(pendiente.lte(20)), 20)
//                                 .where(pendiente.gt(20).and(pendiente.lte(40)), 30)
//                                 .where(pendiente.gt(40),40);
// Uso de la Tierra  
var landUse = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019").select('discrete_classification');
var lUClip = landUse.clip(estratos);
// Variables Meteorológicas  
var presip =  ee.Image('WORLDCLIM/V1/BIO').select('bio12').clip(estratos);
var temp =    ee.Image('WORLDCLIM/V1/BIO').select('bio01').clip(estratos).multiply(0.1);
var tempF =   ee.Image('WORLDCLIM/V1/BIO').select('bio11').clip(estratos).multiply(0.1);
var tempC =   ee.Image('WORLDCLIM/V1/BIO').select('bio10').clip(estratos).multiply(0.1);
// Imagenes Satelitales
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"]);
}
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var collection = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2021-01-01', '2021-12-31')
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .map(maskS2clouds);
var composite = collection.median().clip(estratos);
var meanNDVI = composite.normalizedDifference(["B8","B4"]);
var meanNDWI = composite.normalizedDifference(["B3","B8"]);
var EVI = composite.expression ('float (2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1)))', {
    'NIR': composite.select ('B8'),  
    'RED': composite.select ('B4'),
    'BLUE': composite.select ('B2')});
var SAVI = composite.expression ('float (((NIR - RED) / (NIR + RED + L))* (1+L))',{
    'L': 0.5, // Cobertura vegetacion 0-1
    'NIR': composite.select ('B8'),
    'RED': composite.select ('B4')});
var SIPI = composite.expression ('float ((NIR - BLUE) / (NIR - RED))',{
    'NIR': composite.select ('B8'),
    'BLUE': composite.select ('B2'), 
    'RED': composite.select ('B4')});
var ARVI = composite.expression ('float ((NIR - (2 * RED) + BLUE) / (NIR + (2 * RED) + BLUE))',{
    'NIR': composite.select ('B8'),
    'BLUE': composite.select ('B2'), 
    'RED': composite.select ('B4')});
var indexes =   meanNDVI.addBands(EVI)
                        .addBands(SAVI)
                        .addBands(SIPI)
                        .addBands(ARVI);
var estrato = estratos;
var maxent_bs = ee.Image('users/reginoa579/MaxEnt_output/MaxEnt_bulnesia_sarmientoi');
var maxent_ca = ee.Image('users/reginoa579/MaxEnt_output/MaxEnt_copernicia_alba');
var mapCA = ui.Map();
var mapBS = ui.Map(); 
var mapVar = ui.Map();
mapCA.addLayer(maxent_ca,{bands: 'probability', min: 0, max: 1, palette:['033db2','28dd29','ffe606']}, 'Dist pot Copernicia Alba');
mapBS.addLayer(maxent_bs,{bands: 'probability', min: 0, max: 1, palette:['033db2','28dd29','ffe606']}, 'Dist pot Bulnesia Sarmientoi');
var Panel = ui.Panel();
var maps = [mapVar, mapCA, mapBS];
var linker = ui.Map.Linker(maps);
// Enable zooming on the top-left map.
maps[0].setControlVisibility({zoomControl: true, layerList: true});
maps[1].setControlVisibility({zoomControl: true, layerList: false});
maps[2].setControlVisibility({zoomControl: true, layerList: false});
// Create a grid of maps.
var mapGrid = ui.Panel(
    [
      ui.Panel([maps[0]], null, {stretch: 'both'}),
      ui.Panel([maps[1]], null, {stretch: 'both'}),
      ui.Panel([maps[2]], null, {stretch: 'both'})
    ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
// Center the map at an interesting spot in Greece. All
// other maps will align themselves to this parent map.
maps[0].centerObject(estrato,6.6);
maps[1].centerObject(estrato,6.6);
maps[2].centerObject(estrato,6.6);
var refCA = ui.Label('MaxEnt: copernicia alba', {
  stretch: 'horizontal',
  textAlign: 'left',
  fontWeight: 'bold',
  fontSize: '12'
});
var refBS =  ui.Label('MaxEnt: bulnesia sarmientoi', {
  stretch: 'horizontal',
  textAlign: 'left',
  fontWeight: 'bold',
  fontSize: '12'
});
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// var VIS_MAX_VALUE = 1.00;
// var VIS_NONLINEARITY = 2.00;
// // Aplique un tramo no lineal a los datos de departamentos para su visualización.
// function colorStretch(image) {
//   return image.divide(VIS_MAX_VALUE)
//       .pow(4 / VIS_NONLINEARITY);
// }
// // Invierte el tramo no lineal que aplicamos a los datos del Departamento para
// // visualización, para que podamos retroceder valores para mostrar en la leyenda.
// // Esto usa funciones matemáticas comunes de JavaScript, en lugar de Earth Engine
// // funciones, ya que las vamos a llamar desde JS para calcular los valores de las etiquetas.
// function undoColorStretch(val) {
//   return Math.pow(val, VIS_NONLINEARITY) * VIS_MAX_VALUE;
// }
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var panelCA = ui.Panel({widgets: [refCA],layout:'flow',style:{backgroundColor:'ffffffff', position: 'bottom-left'}});
mapCA.add(panelCA);
var panelBS = ui.Panel({widgets: [refBS],layout:'flow',style:{backgroundColor:'ffffffff', position: 'bottom-left'}});
mapBS.add(panelBS);
// Variables del Modelo
//Display
// Topografía
mapVar.addLayer(DEMClip,{min:0.0, max: 800.0, opacity:0.75,bands:['elevation'],
  palette:['0602ff','307ef3','30c8e2','3ae237','d6e21f','ffd611','ff8b13','ff0000','c21301']},
  'MDE',true);
mapVar.addLayer(pendiente,{
  min: 0.0,
  max: 90.0,
  palette: [
    '3ae237', 'b5e22e', 'd6e21f', 'fff705', 'ffd611', 'ffb613', 'ff8b13',
    'ff6e08', 'ff500d', 'ff0000', 'de0101', 'c21301', '0602ff', '235cb1',
    '307ef3', '269db1', '30c8e2', '32d3ef', '3be285', '3ff38f', '86e26f'
  ]},'pendiente',true);
mapVar.addLayer(laderas,{
  min: 0.0,
  max: 360.0,
  palette: [
    '3ae237', 'b5e22e', 'd6e21f', 'fff705', 'ffd611', 'ffb613', 'ff8b13',
    'ff6e08', 'ff500d', 'ff0000', 'de0101', 'c21301', '0602ff', '235cb1',
    '307ef3', '269db1', '30c8e2', '32d3ef', '3be285', '3ff38f', '86e26f'
  ]},'laderas',false);
mapVar.addLayer(hillshade,{min:25,max:230, opacity:0.75},"hillshade",true);
// Usos de suelo
mapVar.addLayer(lUClip,{},"Usos de suelo",false);
// datos meteorológicos
mapVar.addLayer (presip,{min: 0.0, max: 2000.0, palette: ['bfffff','82f3ff','007dd6']},'Presipitación',false);
mapVar.addLayer (temp,{min: 17.0, max: 30.0, opacity:0.5, palette: ['a5e6ff','f30000']},'temperatura media',false);
mapVar.addLayer (tempF,{min: 17.0, max: 30.0, opacity:0.5, palette: ['a5e6ff','f30000']},'temperatura Mínima',false);
mapVar.addLayer (tempC,{min: 17.0, max: 30.0, opacity:0.5, palette: ['a5e6ff','f30000']},'temperatura Máxima',false);
// Imágenes satelitales
mapVar.addLayer(composite, {bands: ['B4', 'B3', 'B2'], min: 0, max: 0.3}, 'Imagen RGB',false);
mapVar.addLayer(composite, {bands: ['B8', 'B11', 'B12'], min: 0, max: 0.3}, 'Imagen Infrarrojo',false);
// Indices de vegetación Promedios
mapVar.addLayer(meanNDVI,{min: -1, max: 1, palette: ['red','yellow','green']},'mean NDVI 2021',false);
mapVar.addLayer(meanNDWI,{min: -1, max: 1, palette: ['white','skyblue','blue']},'mean NDWI 2021',false);
mapVar.addLayer(EVI,{min: -1, max: 1, palette: ['dfff0b','f3de22','149d4e']},'EVI',false);
mapVar.addLayer(SAVI,{min: -1, max: 1, palette: ['dfff0b','ffb02e','f3de22','149d4e','009bff']},'SAVI',false);
mapVar.addLayer(SIPI,{min: -1, max: 1, palette: ['dfff0b','ffb02e','f3de22','149d4e','009bff']},'SIPI',false);
mapVar.addLayer(ARVI,{min: -1, max: 1, palette: ['dfff0b','ffb02e','f3de22','149d4e','009bff']},'ARVI',false);
/*
 * Add a title and initialize
 */
 var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
// Create a title.
var title = ui.Label('Laboratorio de Procesamiento de Imágenes - PTI', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '16'
});
var subtitle = ui.Label('Distribución potencial de especies forestales basado en MaxEnt', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '12px'
});
var link1 = ui.Label(
    'Crear cuenta de #GEE aquí', {},
    'https://signup.earthengine.google.com/#!/');
var link2 = ui.Label(
    'Acceder al código fuente', {},
    'https://code.earthengine.google.com/763a63013663cdc3c5052d5f7bf51db7');
var linkPanel = ui.Panel({
 widgets:[link1,link2], 
 layout:ui.Panel.Layout.Flow('horizontal'), 
 style:{backgroundColor: '00000000'}
});
// Add the maps and title to the ui.root.
ui.root.widgets().reset([title, subtitle,colorBar, legendLabels,mapGrid ,linkPanel]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));