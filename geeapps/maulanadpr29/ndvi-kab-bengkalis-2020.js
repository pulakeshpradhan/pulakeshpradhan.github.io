var table = ui.import && ui.import("table", "table", {
      "id": "users/maulanadpr29/PulauBengkalisPoly"
    }) || ee.FeatureCollection("users/maulanadpr29/PulauBengkalisPoly"),
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA");
var maskL8 = function(image) {
  var qa = image.select('BQA');
  return image.updateMask(qa.bitwiseAnd(1 << 4).eq(0));
};
var composite = imageCollection
  .filterDate('2020-01-01','2020-12-31')
  .map(maskL8)
  .median()
  .clip(table);
Map.addLayer(composite,{bands:['B6','B5','B2'],min:0,max:0.3},'komposit 652')
var ndvi = composite.normalizedDifference(['B5','B4']).rename('NDVI');
Map.addLayer(ndvi,{palette:["blue","red","yellow","green","darkgreen"],min:0,max:1},"NDVI");
Map.setCenter(102.2829,1.4861,12);
Map.addLayer(ndvi,'NDVI');
Map.onClick(function(coords) {
  lon.setValue('Lon: '+coords.lon);
  lat.setValue('Lat: '+coords.lat);
});
Map.style().set('cursor','crosshair');