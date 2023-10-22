/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var table = ee.FeatureCollection("users/daniellookorox/WaterClarityTraining");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var c_cover = require('users/daniellookorox/default:Kd Calculation/cloud_cover');
var palettes = require('users/gena/packages:palettes');
var palettes = require('users/gena/packages:palettes');
var palette = palettes.misc.coolwarm[7].reverse();
var s2mask = require('users/fitoprincipe/geetools:cloud_masks').sentinel2;
var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
var occurrence = gsw.select('occurrence');
var water_mask  = occurrence.gt(60).unmask(0)
var s2Clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY')
Map.clear()
Map.centerObject(table, 3)
// Geometry for boudary selection 
//var geometria_recorte = geometry
/// Creating the necessary variables 
var MAX_CLOUD_PROBABILITY = 10;
var cloud_cover = 100
//var sen2_in = '2019-08-01';
//var sen2_end = '2019-08-30';
////// Loading the required functions
function GC_sen2cor (img) {
  var rrs = img.divide(10000*3.14)
  var glint1 = rrs.subtract(rrs.select("B11"))
  var filtro_gc = glint1.expression('b("B8A") < 0.003 ? b("B8A") : b("B11")')
  var glint2 = glint1.subtract(filtro_gc)
  var mask_agua = img.expression(('(b("B3") - b("B12"))/(b("B12")+b("B3"))')).expression("b(0) > 0").set('system:time_start', img.get('system:time_start'));
  return glint2.updateMask(mask_agua)
      .select("B.*")
      .copyProperties(img, ['system:index', 'system:time_start']);
      }
// Indexes calculation
var indices = function(imagem) {
  var ndci = imagem.expression(('(b("B5") - b("B4"))/(b("B5")+b("B4"))')).set('system:time_start', imagem.get('system:time_start')).rename("ndci")
  var b3_b2 = imagem.expression(('(b("B3")/b("B2"))')).set('system:time_start', imagem.get('system:time_start')).rename("b3_b2")
  var b3_b4 = imagem.expression(('(b("B3")/b("B4"))')).set('system:time_start', imagem.get('system:time_start')).rename("b3_b4")
  var b3_b6 = imagem.expression(('(b("B3")/b("B6"))')).set('system:time_start', imagem.get('system:time_start')).rename("b3_b6")
  var resultados = imagem.addBands(ndci).addBands(b3_b2).addBands(b3_b4).addBands(b3_b6)
  return(resultados)
}
/// CLOUD MASK for images
function maskClouds(img) {
  var clouds = ee.Image(img.get('cloud_mask')).select('probability');
  var isNotCloud = clouds.lt(MAX_CLOUD_PROBABILITY);
  return img.updateMask(isNotCloud);
}
/// Zsd algorithm 
function secchi_sen2cor_model(img) {
  var secchi = img.classify(RFtrained).rename("Zsd_Sen2Cor").copyProperties(img, ['system:index', 'system:time_start'])
  return(secchi)
}
//// Random Forest Model training steps
var training_features = table.filter(ee.Filter.gt('secchi', 0));
var inputnames=['B2','B3','B4','B5', 'B6', 'ndci', 'b3_b2', 'b3_b4', 'b3_b6'];
var RFtrained = ee.Classifier.smileRandomForest({
numberOfTrees:62, 
  seed:10
})
.setOutputMode('REGRESSION') 
    .train({
    features: training_features,
    inputProperties: inputnames,
    classProperty: 'secchi'});   
////////////////////////////////////////////////////////////////
///////////// CREATING THE LEGEND ///
////////////////////////////////////////////////////////////////
// Loading the pallete
var vis = {min: 0, max: 4, palette: palette};
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '300x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label('>4', {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Secchi Disk Depth (m)',
  style: {fontWeight: 'bold'}
});
// Add the legendPanel to the map.
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
Map.add(legendPanel);
///////////////////// ADD FUNCTIONS TO THE BUTTOMS ON THE MAP /////////////////
////// Set a callback function for when the user clicks the map////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// DESGING OUR USER INTERFACE BY ADDING A PANEL ////////////////
/// CREATING THE INTERFACE TO WORK WITH TIME SERIE: I NEED AN INTERVAL DO SELECT MY IMAGES ///
// Use the start of the collection and now to bound the slider.
var collection = ee.ImageCollection('COPERNICUS/S2').filterBounds(table)
var start = ee.Image(collection.first()).date().get('year').format();
var now = Date.now();
var end = ee.Date(now).format();
// Asynchronously compute the date range and show the slider.
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 5, 
    onChange: secchi_calculation
  });
  Map.add(dateSlider.setValue(now));
});
///////////////////////// TIME IINTERVAL FOR COMPOSITE IMAGE ////////////
var panel = ui.Panel({
  style:{width:'400px',backgroundColor: "lightgray"}
})
var title = ui.Label('Water Clarity in Brazilian Waters',  {fontWeight: 'bold', fontSize: '25px'})
var explanation = ui.Label('Please, select date interval on the slider (5-days)\nThe interval represents the temporal resolution\n of Sentinel-2A/B. Secchi Disk depth generated \nusing Random Forest Regression algorithm.',  {whiteSpace: 'pre',fontWeight: 'bold', fontSize: '15x'})
var explanation2 = ui.Label('This APP was developed by the\nInstrumentation Laboratory for Aquatic Systems (LabISA-INPE).\nPlease, cite this work as:',  {whiteSpace: 'pre',fontWeight: 'bold', fontSize: '15px'})
var explanation3 = ui.Label('Maciel, D. A., Barbosa, C. C. F., de Moraes Novo, E. M. L., Júnior, R. F., & Begliomini, F. N. (2021). Water clarity in Brazilian water assessed using Sentinel-2 and machine learning methods. ISPRS Journal of Photogrammetry and Remote Sensing, 182, 134-152.',  {fontWeight: 'bold', fontSize: '10px'})
var header = ui.Label('Click on Map to get Secchi values \nand the time series for specific point', {whiteSpace: 'pre', fontWeight: 'bold', fontSize: '18px'});
var toolPanel = ui.Panel([header], 'flow', {width: '400px'});
ui.root.add(panel.add(title).add(explanation).add(explanation2).add(explanation3).add(toolPanel))
//////////////////////// Calculate Secchi disk depth ///////////////////////
function secchi_calculation(range) {
var s2_sen2cor = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate(range.start(), range.end())
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',cloud_cover))
                  //.filterMetadata('MGRS_TILE', 'equals', MGRS_TILE)
                  //.filterBounds(geometria_recorte)
var s2_sen2cor_masked = ee.Join.saveFirst('cloud_mask').apply({
  primary: s2_sen2cor,
  secondary: s2Clouds,
  condition:
      ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
});
var s2_sen2cor_masked =  ee.ImageCollection(s2_sen2cor_masked).map(maskClouds);
var secchi_s2 = s2_sen2cor_masked
                  .map(GC_sen2cor)
                  .map(indices)
                  .map(secchi_sen2cor_model)
                  .mosaic()
                  .mask(water_mask)
var secchi_s2_mask = secchi_s2.updateMask(secchi_s2.gt(0)).rename("Secchi")
var RGB_GC = s2_sen2cor_masked
                  .map(GC_sen2cor)
                  .mosaic()
                  .mask(water_mask)
var RGB_GC_mask = RGB_GC.updateMask(secchi_s2_mask.gt(0))
var visualization = {
  min: 0.0,
  max: 4, 
  palette:palette};
var visualizationRGB = {
  min: 0.0,
  max: 3000,
  bands: ['B4', 'B3', 'B2'],
};
var RGB_all = ui.Map.Layer(s2_sen2cor, visualizationRGB, 'RGB Image');
var INSITU_DATA = ui.Map.Layer(table, {}, "In Situ Data")
var RGB = ui.Map.Layer(RGB_GC_mask, {min: 0, max: 0.05, bands: ['B4', 'B3', 'B2']}, 'RGB Image Water Areas');
var ZSD = ui.Map.Layer(secchi_s2_mask, visualization, 'Secchi Depth (m) Sen2Cor');
Map.layers().reset([RGB_all, RGB,ZSD,INSITU_DATA])
Map.onClick(function(coords) {
  var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                 'lat: ' + coords.lat.toFixed(4);
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
  var demValue = secchi_s2_mask.reduceRegion(ee.Reducer.first(), click_point, 90).evaluate(function(val){
    var demText = 'Secchi Disk Depth: ' + val.Secchi;
    toolPanel.widgets().set(2, ui.Label(demText));
  });
  toolPanel.widgets().set(1, ui.Label(location));
// Edit: To be temporary, the "loading..." panel number has to be the same as the demText panel number (changed from 1 to 2).
  toolPanel.widgets().set(1, ui.Label("loading..."));
  Map.layers().set(5, ui.Map.Layer(click_point, {color: 'FF0000'}));
});
}
/////////////////////// GET THE TIME SERIES OF THE ENTIRE DATA ////////////////// 
Map.onClick(function(coords) {
  var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                 'lat: ' + coords.lat.toFixed(4);
  var click_point = ee.Geometry.Point(coords.lon, coords.lat)
var s2_sen2cor = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',cloud_cover))
                  //.filterMetadata('MGRS_TILE', 'equals', MGRS_TILE)
                  .filterBounds(click_point).map(s2mask())
var s2_sen2cor_masked = ee.Join.saveFirst('cloud_mask').apply({
  primary: s2_sen2cor,
  secondary: s2Clouds,
  condition:
      ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
});
var s2_sen2cor_masked =  ee.ImageCollection(s2_sen2cor_masked).map(maskClouds);
var secchi_s2 = s2_sen2cor_masked
                  .map(GC_sen2cor)
                  .map(indices)
                  .map(secchi_sen2cor_model)
 var Zsd_chart = ui.Chart.image.series(secchi_s2, click_point, ee.Reducer.mean(), 300);
  Zsd_chart.setOptions({
    title: 'Secchi Disk Depth Time Series',
    vAxis: {title: "Zsd", viewWindow : {max : 5, min : 0}},
  hAxis: {title: 'date', format:  'm-yy',  gridlines: {count: 7}},
  series: {0: {color: '000000'}}
  });
  panel.widgets().set(6, Zsd_chart);
  Map.layers().set(5, ui.Map.Layer(click_point, {color: 'FF0000'}));
})
//Export.image.toDrive({
//  image: secchi_s2,
//  description: 'set',
//  scale: 20,
//  region: geometry,
//  maxPixels: 52906088820000 
//});