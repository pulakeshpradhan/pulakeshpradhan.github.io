// Elegir ZONAS DE INTERÉS
var geometry = ee.FeatureCollection("users/delaralfonso/Limites/CBA_sin_sierras_y_laguna")
var cba = ee.FeatureCollection("users/delaralfonso/Limites/CBA_Deptos")
var newDate = new Date();
var dateto = ee.Date(newDate);
var datefrom = dateto.advance(-50,'day');
//print(dateto); print(datefrom);
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask);
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var collection = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate(datefrom,dateto)
                  .sort('CLOUDY_PIXEL_PERCENTAGE', false)
                  .map(maskS2clouds)
                //.map(function(image) {return image.addBands(image.metadata('system:time_start'))})
                  .mosaic()
                  .clip(cba)
                  .select(['B2','B3','B4','B8A','B11','B12'],['blue','green','red','nir','swir1','swir2'])
////////////////////////////////////////////////////// ////////////////////////////////////////////////////////////////
var greenest = collection;
var rgb = greenest.select(['red', 'green', 'blue']);
var nbrParams = {min: -370, max: 2000,opacity:1};
Map.addLayer(rgb.clip(cba), nbrParams, 'Sentinel-2 ',true);
//Map.addLayer(cba,{opacity:0.2},'CBA',true)
var awei = greenest.expression(
    '4 * (B3 - B6) - (0.25 * B5 + 2.75 * B7)', {
      'B3': greenest.select('green'),
      'B6': greenest.select('swir1'),
      'B5': greenest.select('nir'),
      'B7': greenest.select('swir2'),
}).clip(cba);
var awei_reclass = awei.gt(-1500)
//Map.addLayer(awei, { min: -22234, max: 5357, gamma: 1.6}, 'Indice Agua',false)
Map.addLayer(awei_reclass.updateMask(awei_reclass.eq(1)),{min: 0, max: 1,'palette': ['black','blue']}, 'Agua en superficie')
Map.centerObject(cba,8)
/*
var slider = ui.Slider();
slider.setValue(1);  // Set a default value.
slider.onChange(function(value) {
  Map.layers().get(2).setOpacity(value);
});
print(slider);
*/