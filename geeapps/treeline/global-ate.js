/*
  Introduction:
  1) Examine the determined study domain.
  2) Clip, vectorize, and output the clipped study domain.
  Date:
  6/26/2019.
*/
/* Setup. */
// Set the working directory.
var wd = "users/treeline/Global/ATE_Detection/";
// Import and reproject the study domain in the western US.
var studyDomain = ee.Image(wd + "studyDomain_Global_CHELSA_v1_2_ALOS_maxAbsTLH_Lte1000m");
// Import the CHELSA treeline height dataset (version 1.2).
var tlh = ee.Image("users/treeline/Global/Global_CHELSA_TLH_V1_2/" + 
  "Stacked_CHELSA_v12_TLH_1979to2013_10000pixels_NAinterpolated_Predictor2_Zlevel9_DeflateCompressed");
// Load the previous random sampling result with no un-certain pixel.
var random = ee.FeatureCollection(wd + "Pixel_Sampling/200splCtr_noUC");
// Define the extent of the western US.
var westernUS = ee.Geometry.Rectangle({
  coords: [-124.7631, 31.33218, -102.0415, 49.00249],
  geodesic: false
});
/*
  Examine the determined study domain.
*/
if (true) {
  // Calculate the average treeline height. 
  var avgTLH = ee.ImageCollection(tlh.bandNames().map(function(b) {
    return tlh.select([b]).rename("TLH");
  })).mean();
  // Visualization.
  Map.setOptions("hybrid");
  Map.setCenter(90.608, 39.851, 6);
  for (var i = 1; i <= 35; i ++) {
    var year = 1983 + i;
    Map.addLayer(tlh.select("b" + i), 
      {min: -1e3, max: 1e3, palette: "FFFFFF, 006400, FFFFFF", opacity: 1}, 
        "TLH in " + year, true);
  }
  Map.addLayer(avgTLH, {min: -1e3, max: 1e3, palette: "FFFFFF, 0000FF, FFFFFF", opacity: 1}, "Average TLH", true);
  Map.addLayer(studyDomain, {palette: "FF0000", opacity: 0.5}, "Determined study domain", true);
}
/*
  Clip, vectorize, and output the study domain.
*/
if (false) {
  /* Remove the part of study domain outside the U.S. */
  // Re-project the study domain.
  studyDomain = studyDomain.reproject({
    crs: "EPSG:4326",
    scale: 30
  });
  // Import the dataset of Large Scale International Boundary Polygons and select the U.S.
  var us = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017').filter(ee.Filter.eq("country_co", "US"));
  // Clip the NDVI data with the U.S. border.
  studyDomain = studyDomain.clipToCollection(us)
                           .clip(westernUS);
  // Check the resolution of image.
  print(studyDomain.projection().nominalScale());
  /* Vectorization. */
  // Convert the study domain to a polygon.
  var polygon = studyDomain.reduceToVectors({
    geometry: westernUS,
    crs: "EPSG:4326",
    scale: 30,
    geometryType: "polygon",
    eightConnected: false,
    maxPixels: 1e13
  });
  /* Export the result. */
  if (false) {
    var outputName = "studyDomain_westernUS";
    // Export the raster data.
    Export.image.toDrive({
      image: studyDomain,
      description: outputName, 
      folder: "Global_ATE", 
      crs: "EPSG:4326",
      scale: 30,
      region: westernUS,
      maxPixels: 1e13
    }); 
  } else if (false) {
    var outputName = "studyDomain_westernUS";
    // Export the vector data.
    Export.table.toDrive({
      collection: polygon,
      description: outputName, 
      folder: outputName,
      fileFormat: "SHP"
    }); 
  } else {
    // Visualization.
    Map.setOptions("hybrid");
    Map.centerObject(westernUS, 6);
    Map.addLayer(studyDomain, {palette: "FF00FF"}, "Study domain", false);
    Map.addLayer(polygon, {color: "00FF00"}, "Polygon", false);
  }
}