// Elegir ZONAS DE INTERÉS
var geometry = ee.FeatureCollection("users/delaralfonso/Limits/ARG_Deptos")
var deptos = ee.List(geometry.aggregate_array("FNA"));
//print(deptos.distinct())
var neco = geometry.filterMetadata('FNA','equals','Partido de Necochea');
var lobe = geometry.filterMetadata('FNA','equals','Partido de Lobería');
var alva = geometry.filterMetadata('FNA','equals','Partido de General Alvarado');
var tres = geometry.filterMetadata('FNA','equals','Partido de Tres Arroyos');
var sanca = geometry.filterMetadata('FNA','equals','Partido de San Cayetano');
var geometry=neco.merge(lobe).merge(alva).merge(tres).merge(sanca)
Map.addLayer(geometry,{opacity:0.7},'DEPARTAMENT',true)
var newDate = new Date();
var dateto = ee.Date(newDate);
var datefrom = dateto.advance(-50, 'day');
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
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 15))
                  .map(maskS2clouds)
                  .filterBounds(geometry)
                  .select(['B2','B3','B4','B8A','B11','B12'],['blue','green','red','nir','swir1','swir2']);
////////////////////////////////////////////////////// ////////////////////////////////////////////////////////////////
var withNd = collection.map(function(image) {
  var nd = image.normalizedDifference(['nir', 'red']);
  return image.addBands(nd.multiply(-1).rename('inv_nd'));
});
var greenest = withNd.qualityMosaic('inv_nd');
var rgb = greenest.select(['red', 'green', 'blue']);
var nbrParams = {min: -370, max: 2000,opacity:0.7};
Map.addLayer(rgb.clip(geometry), nbrParams, 'Sentinel-2 ',true);
var awei = greenest.expression(
    '4 * (B3 - B6) - (0.25 * B5 + 2.75 * B7)', {
      'B3': greenest.select('green'),
      'B6': greenest.select('swir1'),
      'B5': greenest.select('nir'),
      'B7': greenest.select('swir2'),
}).clip(geometry);
var awei_reclass = awei.gt(-1500)
//Map.addLayer(awei, { min: -22234, max: 5357, gamma: 1.6}, 'Indice Agua',false)
Map.addLayer(awei_reclass.updateMask(awei_reclass.eq(1)),{min: 0, max: 1,'palette': ['black','blue']}, 'Agua en superficie')
Map.centerObject(geometry,10)
/*
var checkbox = ui.Checkbox('Ver Imagen Fondo', false);
checkbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
print(checkbox);
*/
var slider = ui.Slider();
slider.setValue(1);  // Set a default value.
slider.onChange(function(value) {
  Map.layers().get(2).setOpacity(value);
});
print(slider);