var table = ui.import && ui.import("table", "table", {
      "id": "users/idakwovicks/Taraba_State"
    }) || ee.FeatureCollection("users/idakwovicks/Taraba_State");
var image = ee.Image(ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterBounds(table)
    .filterDate('2021-01-01', '2021-12-30')
    .sort('CLOUD_COVER')
    .median());
// Clip to the output image to the table boundary.
var clipped = image.clipToCollection(table);
Map.addLayer(clipped, {bands: ['B6', 'B5', 'B4'],min:0, max: 3000}, 'true colour image');
//CALCULATING NDVI
//Define variable NDVI from equation
    var NDVI = image.expression(
        "(NIR - RED) / (NIR + RED)",
        {
          RED: image.select("B4"),    //  RED
          NIR: image.select("B5"),    // NIR
        });
var clippedNDVI = NDVI.clipToCollection(table);
    Map.addLayer(clippedNDVI, {min: 0, max: 1}, "NDVI");
Export.image.toDrive({
  image:clippedNDVI,
  description:"2021NDVI",
  fileNamePrefix:"2021NDV",
  scale:60,
  folder:"MR_MARKU",
  region:table,
  fileFormat:"GeoTIFF"
})