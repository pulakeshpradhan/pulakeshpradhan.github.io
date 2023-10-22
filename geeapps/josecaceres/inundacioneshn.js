//Agregar limites
var hn =  ee.FeatureCollection("users/josecaceres/Deptos_HN")
var deptos =  ee.FeatureCollection("users/josecaceres/Limite_Depto_HN")
//Set Center
Map.centerObject(hn, 8)
var minLabel = ui.Label({
  value: 'Ingresa la Fecha de Inicio:',
  style: {stretch: 'vertical'}
});
var minTextbox = ui.Textbox({
  placeholder: 'AAAA-MM-DD',
  onChange: function(value) {
    // set value with a dedicated method
    minTextbox.setValue(value);
    return(value);
  },
  style: {width: '120px'}
});
var maxLabel = ui.Label({
  value: 'Ingresa la Fecha de Final:',
  style: {stretch: 'vertical'}
});
var maxTextbox = ui.Textbox({
  placeholder: 'AAAA-MM-DD',
  onChange: function(value) {
    // set value with a dedicated method
    maxTextbox.setValue(value);
    return(value);
  },
  style: {width: '120px'}
});
var button = ui.Button({
  label: 'Analizar Fechas!', 
  onClick: renderDateRange
});
// Load Sentinel-1 C-band SAR Ground Range collection (log scale, VV, descending)
var collectionVV = ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.eq('instrumentMode', 'IW'))
//.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
//.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
.filterMetadata('resolution_meters', 'equals' , 10)
.filterBounds(hn)
.select('VV');
//print(collectionVV, 'Collection VV');
// Load Sentinel-1 C-band SAR Ground Range collection (log scale, VH, descending)
var collectionVH = ee.ImageCollection('COPERNICUS/S1_GRD')
.filter(ee.Filter.eq('instrumentMode', 'IW'))
//.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
//.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
.filterMetadata('resolution_meters', 'equals' , 10)
.filterBounds(hn)
.select('VH');
//print(collectionVH, 'Collection VH');
var controlPanel = ui.Panel({
    widgets: [minLabel,
        minTextbox,
        maxLabel,
        maxTextbox,
        button
      ],
    style: {position: 'bottom-left'},
    layout: null,
});
Map.add(controlPanel)
function renderDateRange() {
  //Capture filter Dates
  var startDate = minTextbox.getValue();
  var endDate = maxTextbox.getValue();
  //Calculate before Dates
  var date_split = startDate.split('-')
  if (date_split[1] == '01') {
    var before_starDate = String(parseInt(date_split[0])-1) + '-12-01';
    var before_endDate = String(parseInt(date_split[0])-1) + '-12-28';
  } else {
    var before_starDate = date_split[0] + '-' + String(parseInt(date_split[1])-1) + '-01';
    var before_endDate = date_split[0] + '-' + String(parseInt(date_split[1])-1) + '-28';
  }
  print(before_starDate)
  print(before_endDate)
  //Search images before and during the timeframe
  var duringVV_HN = collectionVV
    .filterDate(startDate, endDate)
    .mosaic().clip(hn)
//  var duringVH_HN = collectionVH
//    .filterDate(startDate, endDate)
//    .mosaic().clip(hn)
  var beforeVV_HN = collectionVV.filterDate(before_starDate, before_endDate).mosaic().clip(hn);
  var compositeBands = duringVV_HN.addBands(duringVV_HN).addBands(beforeVV_HN)
  var VV = ui.Map.Layer(duringVV_HN, {min:-15,max:0}, 'Durante Inundacion')
  //var VH = ui.Map.Layer(duringVH_HN, {min:-25,max:0}, 'Durante Inundacion VH')
  var BeforeVV = ui.Map.Layer(beforeVV_HN, {min:-15,max:0}, 'Antes Inundacion', false)
  var composite = ui.Map.Layer(compositeBands, {min: -25, max: -8},'Durante Inundacion color')
  var styling = {color: 'red', fillColor: '00000000'};
  var limites = ui.Map.Layer(deptos.style(styling), {}, 'Limite Departamental');
  Map.layers().reset([BeforeVV, composite, VV, limites])  
  //Map.addLayer(duringVV_HN, {min:-15,max:0}, 'During flood VV', 1)
  //Map.addLayer(duringVH_HN, {min:-25,max:0}, 'During flood VH', 1)
  //Map.addLayer(duringVV_HN.addBands(duringVV_HN).addBands(beforeVV_HN), {min: -25, max: -8},'BVH/AVV/AVH composite', 0)
}
//Filtrar los Datos Sentinel-1 por Fecha y creamos un mosaico con las imágenes //antes del evento y la imagen durante del evento.
//var beforeVV_HN = collectionVV.filterDate('2020-10-25', '2020-10-31').mosaic().clip(hn);
//var duringVV_HN = collectionVV.filterDate('2020-11-14', '2020-11-21').mosaic().clip(hn);
//var beforeVH_HN = collectionVH.filterDate('2020-10-25', '2020-10-31').mosaic().clip(hn);
//var duringVH_HN = collectionVH.filterDate('2020-11-14', '2020-11-21').mosaic().clip(hn);
//muestra las imagenes sentinel encontradas en la consola
//print(beforeVV_HN, 'Before VV');
//print(duringVV_HN, 'During VV');
//print(beforeVH_HN, 'Before VH');
//print(duringVH_HN, 'During VH');
//Mostramos los mosaicos creados, Display map
//Map.addLayer(beforeVV_HN, {min:-15,max:0}, 'Before flood VV', 0);
//Map.addLayer(duringVV_HN, {min:-15,max:0}, 'During flood VV', 0);
//Map.addLayer(beforeVH_HN, {min:-25,max:0}, 'Before flood VH', 0);
//Map.addLayer(duringVH_HN, {min:-25,max:0}, 'During flood VH', 0);
// composición de color RGB
//Map.addLayer(duringVH.addBands(beforeVH).addBands(duringVH), {min: -25, max: -8},'BVH/AVV/AVH composite', 0);
//Map.addLayer(duringVV_HN.addBands(duringVV_HN).addBands(beforeVV_HN), {min: -25, max: -8},'BVH/AVV/AVH composite', 0);
//var styling = {color: 'red', fillColor: '00000000'};
//Map.addLayer(deptos.style(styling))