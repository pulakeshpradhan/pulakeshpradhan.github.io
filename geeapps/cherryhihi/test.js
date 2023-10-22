var l8 = ui.import && ui.import("l8", "imageCollection", {
      "id": "LANDSAT/LC08/C02/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C02/T1_TOA"),
    tratbb = ui.import && ui.import("tratbb", "table", {
      "id": "users/cherryhihi/tratbb"
    }) || ee.FeatureCollection("users/cherryhihi/tratbb");
// Zoom to center.
Map.setCenter(102.57159037724527, 12.200927062314184, 10); 
var aoi =ee.FeatureCollection(tratbb)
        .geometry();
// Landsat 8 bands 
var bands = ['B2','B3','B4','B5','B6','B7']; 
//filter date 
var l8_2021 = l8.filterDate('2021-01-01', '2021-12-31')
                .filterMetadata('CLOUD_COVER',"less_than", 10)
                .filterBounds(aoi)
                .select(bands);
print(l8_2021);
// Display the image on the map in bounding box.
var image = l8_2021.median().clip(aoi); 
Map.addLayer(image);