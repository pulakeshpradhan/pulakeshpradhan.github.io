var aoi = ui.import && ui.import("aoi", "table", {
      "id": "users/singh22pragati/haidergarhprojectarea"
    }) || ee.FeatureCollection("users/singh22pragati/haidergarhprojectarea");
var s1 = ee.ImageCollection('COPERNICUS/S1_GRD')
var collection =  s1.filterBounds(aoi)
                    .filterMetadata('orbitProperties_pass', 'equals', 'DESCENDING')
                    .select('VH')
var collection1 = collection.filterDate('2020-06-15', '2020-10-31')
var Collection2 = collection1.median().clip(aoi);
print(collection1)
Map.centerObject(aoi,10)
Map.addLayer(Collection2,{min: -50, max: 0})
var DN = Collection2.multiply(10).add(255)
Map.addLayer(DN,{min:0, max: 255},'dn')
var crop = DN.gt(55).and(DN.lt(110))
Map.addLayer(crop,{min: 0, max: 1, palette: ['ffffff','00ca00']},'crop')
var area_veg = crop.multiply(ee.Image.pixelArea()).divide(100*100);
var stat = area_veg.reduceRegion ({
  reducer: ee.Reducer.sum(),
  geometry: aoi,
  scale: 10,
  maxPixels: 1e9
});
print(stat)