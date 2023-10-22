// Landsat-8 (l8) false color composite (fcc) 
var l8_fcc_vis = {min: 0, max: 3000, bands: ['B5', 'B4', 'B3']}; //Landsat8 2013
//Setting up region of interest
var roi = ee.FeatureCollection("projects/stable-terminus-313018/assets/India_States_2023") // you need to uplod Shapfile on Assest
.filter(ee.Filter.or(
 ee.Filter.eq('state', 'Bihar')));
Map.addLayer(roi, {}, "ROI BHIHAR", true);
Map.setOptions('Satellite');
Map.centerObject(roi, 8);
//Filtering L8 data for year 2015
var L8 = ee.ImageCollection("LANDSAT/LC08/C01/T1_SR")
        .filterDate('2020-01-01', '2020-12-31')
        .filterBounds(roi)
        .filterMetadata('CLOUD_COVER', 'less_than', 10);
//Generate median (cloud free) image
var L8_2020_median_image = ee.Image(L8.median());
// Calculate the NDVI
 var ndvi_c_2020 = L8_2020_median_image
                  .normalizedDifference(['B5', 'B4']); 
  //clip the Images 
var ndvi_crop4=ndvi_c_2020.clip(roi);
var Narea = roi.geometry().area();
var NareaSqKm = ee.Number(Narea).divide(1e6).round();
print(NareaSqKm);
//color ramp
//var ndviParams = {min: -1, max: 1, palette:[ 'C5AF20','9B8A00','736600','4F4400','352400']};
var ndviParams = {min: -1, max: 1, palette:['#C5AF20','#9B8A00','#736600','#4F4400','#352400']};
var NDVI2020 = Map.addLayer(ndvi_crop4, ndviParams, 'NDVI for BHIAR 2020', true);
//Export the NDVI images to your Google Drive 
Export.image.toDrive({
image:ndvi_crop4,
description:'NNDVI for BHIAR 2020',
folder: "NDVI_GEE_EXPORT",
scale:30,
region:roi,
maxPixels: 1e10
}
 );