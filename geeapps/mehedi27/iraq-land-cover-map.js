var adm0 = ui.import && ui.import("adm0", "table", {
      "id": "projects/ee-mehedi27/assets/iraq_boundary"
    }) || ee.FeatureCollection("projects/ee-mehedi27/assets/iraq_boundary"),
    visualization = ui.import && ui.import("visualization", "imageVisParam", {
      "params": {
        "bands": [
          "Map"
        ]
      }
    }) || {"bands":["Map"]};
var dataset = ee.ImageCollection("ESA/WorldCover/v100")
.filterBounds(adm0).first()
.clip(adm0);
print("ALL Metadata", dataset);
//Map.centerObject(dataset);
/*function addImage(dataset) { // display each image in collection
  var id = dataset.id
  var image = ee.Image(dataset.id)
  Map.addLayer(image)
}
*/
Map.setCenter(44.28,33.26, 5); // Iraq
Map.addLayer(dataset, visualization, "Landcover");
//Map.addLayer(adm0, {color: 'FF0000', opacity: 10}, 'geodesic polygon');
// Center the map and display the image.