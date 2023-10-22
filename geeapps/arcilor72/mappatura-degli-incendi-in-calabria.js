var gaul = ee.FeatureCollection("FAO/GAUL/2015/level1")
var calabria = gaul.filter(ee.Filter.eq('ADM1_NAME', 'Calabria'));
var bufferPoly100 = function(feature) {return feature.buffer(1000);};
var calabria = calabria.map(bufferPoly100)
//var calabria_buff = calabria.buffer(1000);
var area = ee.FeatureCollection(calabria);
// Set study area as map center.
//Map.centerObject(area);
var corine = ee.ImageCollection('COPERNICUS/CORINE/V18_5_1/100m').first();
var lc_value = corine.get('landcover_class_values');
var prefire_start = '2021-06-01';   
var prefire_end = '2021-06-30';
var postfire_start = '2021-08-01';
var postfire_end = '2021-09-06';
var ImCol = 'COPERNICUS/S2_SR';
var pl = 'Sentinel-2';
var imagery = ee.ImageCollection(ImCol);
var prefireImCol = ee.ImageCollection(imagery
    .filterDate(prefire_start, prefire_end)
    .filterBounds(area));
var postfireImCol = ee.ImageCollection(imagery
    .filterDate(postfire_start, postfire_end)
    .filterBounds(area));
function maskS2sr(image) {
  var cloudBitMask = ee.Number(2).pow(10).int();
  var cirrusBitMask = ee.Number(2).pow(11).int();
  var qa = image.select('QA60');
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask)
      .copyProperties(image, ["system:time_start"]);
}
function maskCloudAndShadows(image) {
  var cloudProb = image.select('MSK_CLDPRB');
  var snowProb = image.select('MSK_SNWPRB');
  var cloud = cloudProb.lt(10);
  var snow = snowProb.lt(10);
  var scl = image.select('SCL'); 
  var shadow = scl.eq(3); 
  var cirrus = scl.eq(10); 
  var mask = (cloud.and(snow)).and(cirrus.neq(1)).and(shadow.neq(1));
  return image.updateMask(mask);
}
var prefire_CM_ImCol = prefireImCol.map(maskCloudAndShadows);
var postfire_CM_ImCol = postfireImCol.map(maskCloudAndShadows);
var pre_mos = prefireImCol.median().clip(calabria);
var post_mos = postfireImCol.median().clip(calabria);
var pre_cm_mos = prefire_CM_ImCol.median().clip(calabria);
var post_cm_mos = postfire_CM_ImCol.median().clip(calabria);
var preNBR = pre_cm_mos.normalizedDifference(['B8', 'B12']);
var postNBR = post_cm_mos.normalizedDifference(['B8', 'B12']);
var dNBR_unscaled = preNBR.subtract(postNBR);
var dNBR = dNBR_unscaled.multiply(1000);
var forest = corine.updateMask(corine.gte(23).and(corine.lte(32))).clip(area)
var vis = {bands: ['B4', 'B3', 'B2'], max: 2000, gamma: 1.5};
var grey = ['white', 'black'];
var sld_intervals =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#ffffff" quantity="-500" label="-500"/>' +
      '<ColorMapEntry color="#7a8737" quantity="-250" label="-250" />' +
      '<ColorMapEntry color="#acbe4d" quantity="-100" label="-100" />' +
      '<ColorMapEntry color="#0ae042" quantity="100" label="100" />' +
      '<ColorMapEntry color="#fff70b" quantity="270" label="270" />' +
      '<ColorMapEntry color="#ffaf38" quantity="440" label="440" />' +
      '<ColorMapEntry color="#ff641b" quantity="660" label="660" />' +
      '<ColorMapEntry color="#a41fd6" quantity="2000" label="2000" />' +
    '</ColorMap>' +
  '</RasterSymbolizer>';
var thresholds = ee.Image([-1000, -251, -101, 99, 269, 439, 659, 2000]);
var classified = dNBR.lt(thresholds).reduce('sum').toInt();
var classified = classified.updateMask(dNBR.gte(10).and(forest))
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }});
var legendTitle = ui.Label({
  value: 'Classi di danno',
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
legend.add(legendTitle);
var makeRow = function(color, name) {
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }});
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
var palette =[ 'fff70b', 'ffaf38', 'ff641b', 'a41fd6'];
var names = [ 'Basso',
'Medio-basso', 'Medio-alto', 'Alto'];
for (var i = 0; i < 4; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
var leftMap = ui.Map();
var rightMap = ui.Map();
var leftImg = ee.Image.constant(0);
var rightImg = ee.Image.constant(1);
var style = {min:0, max:1, opacity:0.6};
var max1 = 2000;
var max2 = 4000;
var min1 = 50;
var min2 = 100;
var RGBViz = {bands: ['B4', 'B3', 'B2'], min: [min1,min1,min1], max: [max1,max1,max1], gamma: [1.5, 1.1, 1]};
var irViz = {bands: ['B8', 'B4', 'B3'], min: [min1,min1,min1], max: [max2,max1,max1], gamma: [1.5, 1.1, 1]};
var SWIR2 = {bands: ['B12', 'B8A', 'B4'], min: [min2,min2,min2], max: [max2,max2,max1], gamma: [1.5, 1.1, 1]};
var SWIR1 = {bands: ['B11', 'B8', 'B3'], min: [min2,min2,min2], max: [max2,max2,max2], gamma: [1.5, 1.1, 1]};
var swir1_dopo = post_cm_mos.visualize(SWIR1);
var swir2_dopo = post_cm_mos.visualize(SWIR2);
var RGB_prima = pre_cm_mos.visualize(RGBViz);
var RGB_dopo = post_cm_mos.visualize(RGBViz);
var IR_dopo = post_cm_mos.visualize(irViz);
leftMap.addLayer(RGB_prima);
leftMap.centerObject(area,9);
var images = {
  'Colori naturali RGB (Red-Green-Blue)': RGB_dopo,
  'Infrarosso Ir (Ir-Red-Green)': IR_dopo,
  'Infrarosso SWIR2 (SWIR2-Ir-Red)': swir2_dopo,
  'Infrarosso SWIR1 (SWIR1-Ir-Green)': swir1_dopo,
  'Classificazione del danno': dNBR.sldStyle((sld_intervals)),
};
var rightSelector = addLayerSelector(rightMap, 0, 'top-right');
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Scegli la mappa da visualizzare');
  function updateMap(selection) {
    mapToChange.layers().set(0, ui.Map.Layer(images[selection]))//,{bands:['B11', 'B8', 'B3'], min:500, max:3500, gamma:1.2}));
  }
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel =
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
var linkedMaps = ui.Map.Linker([leftMap,rightMap ]);//
var splitPanel = ui.SplitPanel({
  firstPanel: linkedMaps.get(0),
  secondPanel: linkedMaps.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
var fireName = ui.Label('Mappatura degli incendi avvenuti in Calabria', {fontWeight:'italic', fontSize:'20px',fontFamily: 'serif'});
var fireExplorerLabel = ui.Label('Fire Explorer', {fontWeight:'italic', fontSize:'16px',fontFamily: 'serif'});
fireName.setUrl('https://twitter.com/hashtag/Calabria?src=hash');
/*
var infoLabel = ui.Label(
  '- Fai scorrere le frecce per visualizzare i cambiamenti.\
'+
  '- La mappa a sinistra mostra l\'area prima dell\'incendio.\
'+
  '- Usa il menù \"Layers\" per selezionare altre date post evento.\
'+
  '- Usa zoom and pan per navigare la mappa map.\
'+
  '\n * composizione a falsi colori utilizzando le bande  B11(SWIR1), B8(NiR), B3(Red) del Sentinel2.\
',  {whiteSpace:'pre',fontWeight:'italic', fontSize:'4px',fontFamily: 'serif'});
*/
var autore  = ui.Label('Realizzazione a cura di Lorenzo Arcidiaco', {fontWeight:'italic', fontSize:'12px',fontFamily: 'serif',color:'green'});
autore.setUrl('https://twitter.com/larcidiaco');
var infoPanel = ui.Panel([fireName, autore], null, {position: 'top-left'});
//var infoPanel1 = ui.Panel(['ANNO 2020'], null, {position: 'top-left'});
var title = ui.Label('ESTATE 2020');
title.style().set({position: 'middle-left', width: '200px',color:'red',fontFamily :'serif',stretch: 'horizontal',border: '5px solid blue',fontSize : '23px',textAlign :'center'});
var titler = ui.Label('ESTATE 2021');
titler.style().set({position: 'middle-right', width: '200px',color:'red',fontFamily :'serif',stretch: 'horizontal',border: '5px solid blue',fontSize : '23px',textAlign :'center'});
ui.root.clear();
leftMap.add(title);
rightMap.add(titler);
legend.style().set({position: 'bottom-right'})
rightMap.add(legend);
leftMap.add(infoPanel);
leftMap.setControlVisibility(false)
leftMap.setControlVisibility({ zoomControl: false});
//leftMap.setControlVisibility({Layers:true});
rightMap.setControlVisibility({all:true});
ui.root.add(splitPanel);
//leftMap.setLocked(false)
//leftMap.setOptions('ROADMAP')