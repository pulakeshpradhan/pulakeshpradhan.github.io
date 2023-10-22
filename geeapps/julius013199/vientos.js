/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var table = ee.FeatureCollection("users/julius013199/Doce_Octubre_Delimitado"),
    table2 = ee.FeatureCollection("users/julius013199/Doce_Octubre");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
var dataset = ee.ImageCollection('NASA/FLDAS/NOAH01/C/GL/M/V001')
              .filter(ee.Filter.date('2018-05-01', '2018-07-01'));
var layer = dataset.select('Wind_f_tavg');
var datasetview = layer.map(function(image){return image.clip(table)});
var empty = ee.Image()
var vientos = ee.Image(datasetview.iterate(function(image,previous){
  var name = ee.String('WIND_SPEED').cat(image.id());
  var vientos = image.rename(name);
  return ee.Image(previous).addBands(vientos);
},empty));
vientos = vientos.select(vientos.bandNames().remove('constant'));
var band_viz = {
  min: 0.0,
  max: 8,
  opacity: 1.0,
  palette: ["black", "blue", "purple", "cyan", "green", "yellow", "red"]
};
print("inspeccion:",vientos)
Map.setCenter(-75, -8, 2.4);
Map.addLayer(layer, band_viz, 'Near surface wind speed');
// Export.image.toDrive({
//   image: vientos,
//   description: 'Doce_Octubre',
//   scale: 90,
//   region: table
// });
// //exportar imagen
// Export.image.toDrive({
//   image: ndvi,
//   description: 'imageToDriveExample',
//   scale: 250,
//   region: Jequetepeque
// });
// var mapfunc = function(feat) {
//   var id = ee.String(feat.id())
//   var geom = feat.geometry()
//   var newfc = ee.List([])