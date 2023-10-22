var table = ui.import && ui.import("table", "table", {
      "id": "users/daniellookorox/WaterClarityTraining"
    }) || ee.FeatureCollection("users/daniellookorox/WaterClarityTraining");
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
// Selecionando zoom para a localização atual 
function current_position(point) {
  Map.addLayer(point, {color: 'blue', fillColor: '00000000'}, "Localização Atual");
  Map.centerObject(point, 8);
  print(point);
}
function oops(error) {
  print(error);
}
ui.util.getCurrentPosition(current_position, oops);
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
  value: 'Profundidade do Disco de Secchi (metros)',
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
  dateSlider.style().set('position', 'bottom-center')
  Map.add(dateSlider.setValue(now));
});
Map.setControlVisibility({
  drawingToolsControl:false
})
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
var RGB_all = ui.Map.Layer(s2_sen2cor, visualizationRGB, 'Imagem Original');
var INSITU_DATA = ui.Map.Layer(table, {}, "Dados Medidos")
var RGB = ui.Map.Layer(RGB_GC_mask, {min: 0, max: 0.05, bands: ['B4', 'B3', 'B2']}, 'Imagem Apenas da Água');
var ZSD = ui.Map.Layer(secchi_s2_mask, visualization, 'Profundidade Secchi (m)');
Map.layers().reset([RGB_all, RGB,ZSD,INSITU_DATA])
}