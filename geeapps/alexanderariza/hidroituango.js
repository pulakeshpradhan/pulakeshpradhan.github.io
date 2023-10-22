//###############################################################################################
// Mosaico sin Nubes para Colombia con NDVI y NDWI desarrollado por Hernando Hernandez.29 de Septiembre 2018
// Maestria en Gestion de la Informacion y Tecnologias Geoespaciales, UNIVERSIDAD SERGIO ARBOLEDA 
// Y CIAF, Instituto Geografico Agustin Codazzi
//#####################################################################################################
// SATELITE Sentinel 2 Coleccion COPERNICUS/S2
//SENTINEL-2 
//B1_Aerosols_443nm_60m
//B2_Blue_490nm_10m
//B3_Green_560nm_10m
//B4_Red_665nm_10m
//B5_Red_Edge_1_705nm_20m
//B6_Red_Edge_2_740nm_20m
//B7_Red_Edge_3_783nm_20m
//B8_NIR_842nm_10m
//B8a_Red_Edge_4_865nm_20m
//B9_Water_vapor_940nm_60m
//B10_Cirrus_1375nm_60m
//B11_SWIR1_1610nm_20m
//B12_SWIW_2_2190nm_20m
// Center the region of interest.
var center = {lon: -75.670056, lat: 7.105998, zoom: 14};
// Create two maps.
var leftMap = ui.Map(center);
var rightMap = ui.Map(center);
// Remove UI controls from both maps, but leave zoom control on the left map.
leftMap.setControlVisibility(false);
rightMap.setControlVisibility(false);
leftMap.setControlVisibility({zoomControl: true});
// Link them together.
var linker = new ui.Map.Linker([leftMap, rightMap]);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
var sierra = ee.Geometry.Polygon([[ -75.74976325884718,7.074390136598333 ], [ -75.5691754902925,7.074390136598333 ], [ -75.5691754902925,7.1750586372680845 ], [ -75.74976325884718,7.1750586372680845 ], [ -75.74976325884718,7.074390136598333 ]]);
//https://www.google.com/fusiontables/DataSource?docid=15fsu3PWcI67mgRwyclHEkYMbrsph1mKvJHnjuHXe
//var sierra =  ee.FeatureCollection('ft:19LfIQDSI53uYSZVJVocxGBqXrDHTK6DAt0tfkYTb', 'geometry');
var collection2018 = ee.ImageCollection('COPERNICUS/S2')
 .filterDate('2019-01-02', '2019-01-05')
 .filterBounds(sierra)
var collection2017 = ee.ImageCollection('COPERNICUS/S2')
 .filterDate('2017-01-01', '2017-04-01')
 .filterBounds(sierra)
var collection2016 = ee.ImageCollection('COPERNICUS/S2')
 .filterDate('2019-01-20', '2019-01-25')
 .filterBounds(sierra)
var minimo2018 = collection2018.mean();
var minimo2017 = collection2017.min();
var minimo2016 = collection2016.mean();
var minclip2018 = minimo2018.clip(sierra)
var minclip2017 = minimo2017.clip(sierra)
var minclip2016 = minimo2016.clip(sierra)
//////////##############################################################
// Banda color verdadero.
var Bcolorverdadero2018 = minclip2018.select('B4', 'B3', 'B2');
// Banda falso color.
var Bfalsocolor2018 = minclip2018.select('B6', 'B5', 'B4');
// Banda infrarojo.
var Binfrarojo2018 = minclip2018.select('B11', 'B7', 'B2');
///########################################################################
//Map.addLayer(Bcolorverdadero2018, {gain: '0.1, 0.1, 0.1', scale:20}, 'Mosaico Color Verdadero 2018');
Map.setCenter(-75.670056, 7.105998, 14);
//Map.addLayer(Bfalsocolor2018, {gain: '0.1, 0.1, 0.1', scale:20}, 'Mosaico Falso Color2018');
//Map.addLayer(Binfrarojo2018, {gain: '0.1, 0.1, 0.1', scale:20},'Mosaico Infrarojo 2018');
// NDVI (INDICE NORMALIZADO DE VEGETACION )
var b8 = minclip2018.select("B8")
var b4 = minclip2018.select("B4")
var ndvi2018 = b8.subtract(b4).divide(b8.add(b4))
//Paleta NDVI
var palette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
//Paleta NDWI
var palette1 = ['FFFFFF', '00F5FF', '00ECFF', '00E4FF', '00D9FF', '00CDFF',
               'fb0000', 'fb0000', 'fb0000', 'fb0000', 'fb0000', 'fb0000',
               'fb0000', 'fb0000', 'fb0000', '#FF0000', '#FF0000'];
//00D9FF,00CDFF,00C5FF,00C5FF,00BBFF,00AFFF,00A1FF,0086FF,0058FF,0039FF,0025FF
//Paleta NDSI
var palette3 = ['FFFFFF', '00F5FF', '00ECFF', '00E4FF', '00D9FF', '00CDFF',
               '00C5FF', '00C5FF', '00BBFF', '00AFFF', '00A1FF', '0086FF',
               '#FF0000', '#FF0000', '#FF0000', '#FF0000', '#FF0000'];
//Paleta DIFDNSI
var palette4 = ['fb0000','fb6212','f5ff36','24fe4f'];
//Map.addLayer(ndvi2018, {min: 0, max: 1, palette: palette}, 'Mosaico NDVI 2018');
// NDWI (INDICE NORMALIZADO DE AGUA)
var b3 = minclip2018.select("B3")
var b8 = minclip2018.select("B8")
var ndwi2018 = b3.subtract(b8).divide(b3.add(b8))
// NDSI2018 (INDICE NOERMALIZADO HIELO)
var b3 = minclip2018.select("B3")
var b11 = minclip2018.select("B11")
var ndsi2018 = b3.subtract(b11).divide(b3.add(b11))
// NDSI2017 (INDICE NOERMALIZADO HIELO)
var b3 = minclip2017.select("B3")
var b11 = minclip2017.select("B11")
var ndsi2017 = b3.subtract(b11).divide(b3.add(b11))
var b3 = minclip2016.select("B3")
var b8 = minclip2016.select("B8")
var ndwi2016 = b3.subtract(b8).divide(b3.add(b8))
var difnsdi = ndwi2018.subtract(ndwi2016)
leftMap.addLayer(ndwi2018, {min: 0, max: 1, palette: palette3}, 'NDSI HIELO 2016')
rightMap.addLayer(difnsdi,  {min: 0, max: 1, palette: palette1}, 'ndwi 2018')
var palette = ['fb0000','fb6212','ffffff','24fe4f'];
var thresholds = ee.Image([-0.009, 0.269, 0.439, 0.800]);
var dNBRClases = difnsdi.lt(thresholds).reduce('sum');
Map.addLayer(dNBRClases, {min: 0, max: 4, palette: palette4}, 'dNBR clasificado');
Map.addLayer(ndwi2018, {min: 0, max: 1, palette: palette1}, 'Mosaico NDWI 2018');
Map.addLayer(ndsi2018, {min: 0, max: 1, palette: palette3}, 'NDSI HIELO 2018');
//Map.addLayer(ndsi2017, {min: 0, max: 1, palette: palette3}, 'NDSI HIELO 2017');
Map.addLayer(ndwi2016, {min: 0, max: 1, palette: palette3}, 'NDSI HIELO 2016');
Map.addLayer(difnsdi, {min: 0, max: 1, palette: palette4}, 'DIF 2016');
//###################################################################################
// EXPORTE LAS IMAGENES 2500X2500 PIXELES
// CAMBIE LAS DIMENSIONES DE LOS PIXELES 
Export.image.toDrive({
  image: Bcolorverdadero2018,
  description: 'Mosaico_colv',
  fileNamePrefix: 'Mos_Col_Colverdadero',
  scale: 0.01,
  region: sierra
});
Export.image.toDrive({
  image: Bfalsocolor2018,
  description: 'Mosaico_colv',
  fileNamePrefix: 'Mos_Col_Colverdadero',
  scale: 0.01,
  region: sierra
});
Export.image.toDrive({
  image: Binfrarojo2018,
  description: 'Mosaico_infr',
  fileNamePrefix: 'Mos_Col_infrarojo',
  scale: 0.01,
  region: sierra
});
Export.image.toDrive({
  image: ndvi2018,
  description: 'Mosaico_ndvi',
  fileNamePrefix: 'Mos_Col_Colverdadero',
  scale: 0.01,
  region: sierra
});
Export.image.toDrive({
  image: ndwi2018,
  description: 'Mosaico_ndwi',
  fileNamePrefix: 'Mos_Col_Colverdadero',
  scale: 0.01,
  region: sierra
});
// Panel for outputting the NDSI trends
var panel = ui.Panel({style: {width: '300px'}});
panel.add(ui.Label('REPRESA DE HIDROITUANGO', {fontSize: '20px'}))
// panel.add(ui.Label('Pump Irrigation Tool', {fontSize: '10px'}))
ui.root.insert(0, panel);
var instructions = ui.Label(
  "NIVEL DEL AGUA IZQUIERDA ENERO 2 DE 2019 Y DERECHA PÉRDIDA (ROJO) AL 22 DE ENERO DE 2019:"
  + " IMAGENES INDICE DE AGUA NDWI"
  + " IGAC CIAF");
panel.add(instructions);
var compChart = ui.Panel({style: {stretch: "vertical"}});
panel.add(compChart)
var chartPanel = ui.Panel({style: {stretch: "horizontal"}});
panel.add(chartPanel);
// Remove the default map from the root panel.
ui.root.clear();
// Add our split panel to the root panel.
ui.root.add(splitPanel);
ui.root.add(panel)
// Set crosshair cursor for clicking on Map
leftMap.style().set("cursor","crosshair");
rightMap.style().set("cursor","crosshair");
////////////////////////////////////////////
// Create the panel for the legend items.
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Clasificación coberturas CGSM 2017 Seca',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
var enero22018 = ndwi2018.reduceToVectors({
    reducer: ee.Reducer.first()
});