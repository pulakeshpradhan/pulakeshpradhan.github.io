// In this exercise, you will replicate the QGIS exercise of finding irrigated
// var dsm = ee.Image("JAXA/ALOS/AW3D30/V2_2");
// var ulb = ee.FeatureCollection("users/spareeth/Module11/urmia_bdry");
var mis = ee.FeatureCollection("users/spareeth/Module11/miandoab_scheme");
// area (using thresholding) and see how it can be accomplished using script in 
// GEE. In addition precipitation data is imported.
// Here Miandoab irrigation scheme boundary and monthly precipitation data
// from GPM satellite constellations are imported.
// Zoom to MIS
Map.centerObject(mis,8);
// Import Landsat 8 image of 24 May 2019, with Path/row provided
// Save the Landsat 8 image into variable 'img1'
var img1 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
                  .filterDate('2019-05-20', '2019-05-30')
                  .filter(ee.Filter.eq('WRS_PATH', 168))
                  .filter(ee.Filter.eq('WRS_ROW', 34))
                  .median();
print(img1, 'img1');
// Import Landsat 8 image of 27 July 2019, with Path/row provided
// Save the Landsat 8 image into variable 'img2'
var img2 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
                  .filterDate('2019-07-20', '2019-07-30')
                  .filter(ee.Filter.eq('WRS_PATH', 168))
                  .filter(ee.Filter.eq('WRS_ROW', 34))
                  .median();
print(img2, 'img2');
// Import Landsat 8 image of 28 August 2019, with Path/row provided
// Save the Landsat 8 image into variable 'img3'
var img3 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
                  .filterDate('2019-08-20', '2019-08-30')
                  .filter(ee.Filter.eq('WRS_PATH', 168))
                  .filter(ee.Filter.eq('WRS_ROW', 34))
                  .median();
print(img3, 'img3');
// Define the visualization palette for Landsat 8 with False color
// composite combination
var visL8 = {
  bands: ['B5', 'B4', 'B3'],
  min: 0,
  max: 1,
  gamma: 2.0
};
// Add all the three Landsat 8 images to map view in FCC
Map.addLayer(img1, visL8, 'img1');
Map.addLayer(img2, visL8, 'img2');
Map.addLayer(img3, visL8, 'img3');
// Define the visualization palette for NDVI
var visNDVI = {
  bands: 'NDVI',
  min: 0,
  max: 1,
  palette: ['white', 'green']
};
// Now let us compute NDVI using normalizedDifference function
// Note that the NDVI function is clubbed with clip function
var ndvi_img1 = img1.normalizedDifference(['B5', 'B4']).rename('NDVI').clip(mis);
var ndvi_img2 = img2.normalizedDifference(['B5', 'B4']).rename('NDVI').clip(mis);
var ndvi_img3 = img3.normalizedDifference(['B5', 'B4']).rename('NDVI').clip(mis);
// If you want to visualize all the three NDVI images uncomment the below line.
Map.addLayer(ndvi_img1, visNDVI, 'ndvi_img1');
// Below line computes mean NDVI, add three NDVI maps and divide by 3
var meanNDVI = ndvi_img1.add(ndvi_img2).add(ndvi_img3).divide(3);
// Visualize the mean NDVI with visNDVI parameter
Map.addLayer(meanNDVI, visNDVI, 'meanNDVI');
// Define the visualization palette for Temperature (Band 10)
var visTemp = {
  bands: 'B10',
  min: 20,
  max: 40,
  palette: ['white', 'red']
};
// Below line computes mean B10 (Temperature), add three Temperature maps and divide by 3
var meanTemp = img1.select('B10').add(img2.select('B10')).add(img3.select('B10')).divide(3);
// Convert the Temperature from Kelvin to Deg Celsius and clip to scheme
var meanTemp_deg = meanTemp.subtract(273.15).clip(mis);
// Visualize the Mean temperature 
Map.addLayer(meanTemp_deg, visTemp, 'meanTemp');
// Now let us assume that all the pixels in Miandoab scheme with NDVI
// higher than 0.3 AND Temprature lower than 33 deg Celsius belongs
// to irrigated agriculture
// Now let us apply those thresholds to create irrigated area mask
var irrig_mask = meanNDVI.gt(0.3).and(meanTemp_deg.lt(33));
print(irrig_mask);
//Next line set all the zeroes to NoData
var irrig_mask = irrig_mask.updateMask(irrig_mask);
// Visualize the Irrigated mask
Map.addLayer(irrig_mask, {palette: ['yellow']}, 'irrig_mask');
//Export the Irrigated area Image to Geotiff
Export.image.toDrive({
  image: irrig_mask,
  description: 'Irrig_Miandoab',
  scale: 30,
  maxPixels: 1e9
});
// Can you find the Irrigated area in sq.meter?
// Check below set of code 
var area_Irrig = irrig_mask.multiply(ee.Image.pixelArea()) // sq meters
                              .reduceRegion({
                                reducer: ee.Reducer.sum(),
                                geometry: mis,
                                scale: 30,
                                maxPixels: 1e9
                              });
print(area_Irrig, 'area');
/*
// Below lines of code print histogram of temperature and ndvi
var temp_histo = ui.Chart.image.histogram(meanTemp_deg, mis, 30, 20);
print(temp_histo);
var ndvi_histo = ui.Chart.image.histogram(meanNDVI, mis, 30, 20);
print(ndvi_histo);
*/