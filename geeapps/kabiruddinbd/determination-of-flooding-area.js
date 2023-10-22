//Pre-monsoon or pre-flood Copernicus Sentinel-1 Date: 2019-05-20
//Data available (https://scihub.copernicus.eu/dhus/#/home)
var S1pre = ee.Image('COPERNICUS/S1_GRD/S1A_IW_GRDH_1SDV_20190520T120441_20190520T120506_027311_031480_43CA');
//Flood inundation periods Copernicus Sentinel-1 Date: 2019-09-19
var S1 = ee.Image('COPERNICUS/S1_GRD/S1A_IW_GRDH_1SDV_20190919T235547_20190919T235612_029097_034D72_B042');
//Coordinates provided to view map
Map.setCenter(90.5284, 24.2916, 8)
var Sprevv = S1pre.select('VV') //Select the VV polarization band from the pre-flood Sentinel-1 image
var vv = S1.select('VV') ///Select the VV polarization band from the flood inundation periods Sentinel-1 image
var vh = S1.select('VH') //Select the VH polarization band from the flood inundation periods Sentinel-1 image
var vvvh = vv.divide(vh); ////Divides VV bye VH polarization flood inundation periods Sentinel-1 image
//Speckles Filter of the Sentinel-1 image
var Sprevv_smoothed = Sprevv.focal_median(100,'circle','meters').rename('Sprevv_Filtered') //Apply a focal median filter
var vv_smoothed = vv.focal_median(100,'circle','meters').rename('VV_Filtered') //Apply a focal median filter
var vh_smoothed = vh.focal_median(100,'circle','meters').rename('VH_Filtered') //Apply a focal median filter
var vvvh_smoothed = vvvh.focal_median(100,'circle','meters').rename('VVVH_Filtered') //Apply a focal median filter
//Sentinel-1 RGB composite ((VH, VV, VV/VH backscatter)
var rgb_composite = (vv_smoothed.addBands(vh_smoothed)).addBands(vvvh_smoothed);
Map.addLayer(rgb_composite,{bands: ['VV_Filtered', 'VH_Filtered', 'VVVH_Filtered'], min: [-25.035914594849196, -30.966125573095724, -0.23708864117877165], max: [8.649052560375141, -8.769894895793351, 0.8953084541466999]},'Sentinel Composite', false)
//FlFlood inundation periods Landsat Image for the comparison of sentinel based inundation results Date: 2019-09-19
var landsat = ee.Image('LANDSAT/LC08/C01/T1_RT/LC08_137043_20190920');
Map.addLayer(landsat,{  bands: ['B5', 'B4', 'B3'],  min: 2164, max: 20205 },'Landsat', false)
//Determining the normal waterbodies by masking
var Sprevv_smoothedmask = Sprevv_smoothed.updateMask(Sprevv_smoothed.lt(-16)).toUint16();
// Visualization parameters for the Sentinel backscatter.
var floodViz = {min: -1, max: 1, palette: ['#3caadc', '007f00']};
// Flood masking and mosaicking  the Sentinel 1 image. 
var FloodMap = ee.ImageCollection([
  vv_smoothed.updateMask(vv_smoothed.lt(-16)).visualize(floodViz),
  vh_smoothed.updateMask(vh_smoothed.lt(-20)).visualize(floodViz),
  Sprevv_smoothedmask.visualize({palette: ['BLUE']}),
  ]).mosaic();
Map.addLayer(FloodMap, {},'Flood Map');
// Export the image, specifying scale and region.
Export.image.toDrive({
  image: FloodMap,
  description: 'flood_map', // File name
  scale: 300, //Map resolution, here we used 300 to minimized the google drive space
  //region: bnd // The boundary of the flood mapping areas
  maxPixels:1e10, 
  folder: "folder_name", // please give the flder name from your Goodle drive
});
//*
// Prepared by: 
// Kabir Uddin
// GIS and Remote Sensing Specialist, Geospatial Solutions
// LULC Thematic Lead, SERVIR HKH
// International Centre for Integrated Mountain Development
// Email: Kabir.Uddin@icimod.org