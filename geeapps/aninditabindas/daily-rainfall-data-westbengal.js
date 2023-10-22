var t = ui.import && ui.import("t", "table", {
      "id": "users/aninditabindas/Dist1"
    }) || ee.FeatureCollection("users/aninditabindas/Dist1"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/aninditabindas/Block_Boundary_Final"
    }) || ee.FeatureCollection("users/aninditabindas/Block_Boundary_Final");
var dataset = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY")
              .filterDate('2021-06-01','2021-06-28');
print(dataset);
var clipcollction = dataset.map
                    (function(dataset){
                      return dataset.clip(table);
                    });
var precipitation = clipcollction.select('precipitation');
var dataList=precipitation.toList(precipitation.size());
 print (dataList,'dataList');
var data = ee.Image(dataList.get(0));
var Vis = {
  min: 0.7,
  max: 17.0,
  palette: ['001137', '0aab1e', 'e7eb05', 'ff4a2d', 'e90000'],
};
Map.centerObject(table, 7);
Map.addLayer(precipitation, Vis, 'Precipitation');
//Map.addLayer(data, Vis, 'Precipitation');