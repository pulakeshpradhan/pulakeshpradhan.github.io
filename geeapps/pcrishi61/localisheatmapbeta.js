var table = ui.import && ui.import("table", "table", {
      "id": "users/pcrishi61/bq-results-20220609-012811-1654738112998"
    }) || ee.FeatureCollection("users/pcrishi61/bq-results-20220609-012811-1654738112998");
//PAs of Malaysia
var fc2 = ee.FeatureCollection('users/pcrishi61/bq-results-20220609-012811-1654738112998');
var points = fc2.map(function(feature){
  return feature.set('dummy',1);
});
function heatmap(fc,radius){
  var ptImg = points.reduceToImage(['dummy'],ee.Reducer.first()).unmask(0);
  var kernel = ee.Kernel.circle(radius).add(ee.Kernel.gaussian(radius * 3, radius/3))
  var result = ptImg.convolve(kernel);
  return result.updateMask(result.neq(0));
}
var heatmapImg = heatmap(points,2.5);
var gradient = ['lightgreen','yellow','red'];
// Map.centerObject(fc2, 1); //KL city
Map.addLayer(heatmapImg,{palette:gradient,min:0,max:0.02},'Heatmap');
// Make an image out of the numerical gis area attribute and display it.
Map.setCenter(144.38321270960984, -38.14506556703076, 15);