var S2 = ui.import && ui.import("S2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    roi = ui.import && ui.import("roi", "table", {
      "id": "users/sgkearthengine/TS_State_Bound"
    }) || ee.FeatureCollection("users/sgkearthengine/TS_State_Bound");
var rgb_vis = {
  min:0,
  max:3000,
  bands:['B8','B4','B3']
}
var filtered = S2.filterDate('2018-06-01','2018-12-31').filterBounds(roi);
print(filtered);
var image =ee.Image(filtered.min() );
var img1= image.clip(roi)
print(image)
//Map.addLayer(image,rgb_vis,"TS")
//Map.addLayer(img1,rgb_vis,"TS")
Map.centerObject(roi,9)  
//NDWI//
var ndwi =img1.normalizedDifference(['B3','B8']);
Map.addLayer(ndwi, {min:-1,max:1,palette:['393939','effffa','fcff39','17ad15','355ff9','355ff9','040bff']},'NDWI');
var wb =ndwi .gt(0.2);
 Map.addLayer(wb, {min:0,max:1,palette:['white','blue']},'wb');
 var wb_area=wb.multiply(ee.Image.pixelArea()).divide(100*100);
 var stat = wb_area.reduceRegion({
   reducer:ee.Reducer.sum(),
 geometry:roi,
 scale:10,
 maxPixels: 10e9
 });
 print(stat)
 Export.image.toDrive({
  image: wb,
  description: 'TS_WB',
  scale: 50,
  region: roi,
});