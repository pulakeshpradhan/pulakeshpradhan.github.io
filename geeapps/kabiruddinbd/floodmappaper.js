var bnd = ui.import && ui.import("bnd", "table", {
      "id": "projects/servir-hkh/RLCMS/BGD/bnd/bnd_buff"
    }) || ee.FeatureCollection("projects/servir-hkh/RLCMS/BGD/bnd/bnd_buff");
//Coordinates provided to view map
Map.centerObject(bnd, 7)
//Selecting the pre-monsoon or pre-flood Copernicus Sentinel-1 
//Sentinel-1 Data available also at https://scihub.copernicus.eu/dhus/#/home )
var sentinel1p = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterDate('2019-05-01', '2019-5-31') // Please change perineal water date range according to your definition 
  .filterBounds(bnd); // Within the boundary selecting the satellite imagery   
// Filtering pre-flood Copernicus Sentinel-1 image by metadata properties.
var vhp = sentinel1p
  // Filtering to get Sentinel-1 images VV and VH dual polarization band.
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  // Filter the  to get images collected in interferometric wide swath mode.
  .filter(ee.Filter.eq('instrumentMode', 'IW'));
// iltering to get Sentinel-1 images from different look angles.
var vhAscendp = vhp.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
var vhDescendp = vhp.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
// Creating a composite from means at different polarizations and look angles.
var S1p = ee.Image.cat([
  vhAscendp.select('VH').mean(),
  ee.ImageCollection(vhAscendp.select('VV').merge(vhDescendp.select('VV'))).mean(),
  vhDescendp.select('VH').mean()
]).focal_median();
var vvp = S1p.select('VV') ///Selecting the VV polarization band from the flood inundation periods Sentinel-1 image
var vhp = S1p.select('VH') ///Selecting the VV polarization band from the flood inundation periods Sentinel-1 image
//Selecting the flood Copernicus Sentinel-1 
var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD')
  .filterDate('2019-05-01', '2019-5-31')
   // .filterDate('2019-06-16', '2019-6-26')
  .filterBounds(bnd);
// Filtering flood time Copernicus Sentinel-1 image by metadata properties.
var vh = sentinel1
  // Filter to get images with VV and VH dual polarization.
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  // Filter to get images collected in interferometric wide swath mode.
  .filter(ee.Filter.eq('instrumentMode', 'IW'));
// Filtering flood time Copernicus Sentinel-1 image from different look angles.
var vhAscend = vh.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
var vhDescend = vh.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
// Create a composite from means at different polarizations and look angles.
var S1 = ee.Image.cat([
  vhAscend.select('VH').mean(),
  ee.ImageCollection(vhAscend.select('VV').merge(vhDescend.select('VV'))).mean(),
  vhDescend.select('VH').mean()
]).focal_median();
var vv = S1.select('VV') ///Select the VV polarization band from the flood inundation periods Sentinel-1 image
var vh = S1.select('VH') //Select the VH polarization band from the flood inundation periods Sentinel-1 image
var vvvh = vv.divide(vh); ////Divides VV bye VH polarization flood inundation periods Sentinel-1 image
//Speckles Filter of the Sentinel-1 image
var vv_smoothed = vv.focal_median(100,'circle','meters').rename('VV_Filtered') //Applying a focal median filter
var vh_smoothed = vh.focal_median(100,'circle','meters').rename('VH_Filtered') //Applying  a focal median filter
var vvvh_smoothed = vvvh.focal_median(100,'circle','meters').rename('VVVH_Filtered') //Applying  a focal median filter
var vvp_speckles = vvp.focal_median(100,'circle','meters').rename('VVp_Filtered') //Applying  a focal median filter
var vhp_speckles = vhp.focal_median(100,'circle','meters').rename('VHp_Filtered') //Applying  a focal median filter
//Sentinel-1 RGB composite ((VV, VH, VV/VH backscatter)
var rgb_composite =(vv_smoothed.addBands(vh_smoothed)).addBands(vvvh_smoothed);
Map.addLayer(rgb_composite.clip(bnd),{bands: ['VV_Filtered', 'VH_Filtered', 'VVVH_Filtered'], min: [-21.157577809006437, -31.045197714437794, 0.2652234113640131], max: [3.251654666934027, 0.7236627552617089, 0.7186323852617604]},'Sentinel Composite')
//Determining the normal waterbodies by masking
//var vvp_watermask = vvp_speckles.updateMask(vvp_speckles.lt(-14.5)).toUint16();
var vvp_watermask = ee.ImageCollection([
  vvp_speckles.updateMask(vvp_speckles.lt(-17)).visualize(floodViz),
  vhp_speckles.updateMask(vhp_speckles.lt(-27)).visualize(floodViz),
  ]).mosaic();
//Map.addLayer(vvp_watermask.clip(bnd), {},'Flood Map1');
// Visualization parameters for the Sentinel backscatter.
var floodViz = {min: -1, max: 1, palette: ['#3caadc', '007f00']};
// Flood masking and mosaicking  the Sentinel 1 image. 
var FloodMap = ee.ImageCollection([
  vv_smoothed.updateMask(vv_smoothed.lt(-17)).visualize(floodViz),
  vh_smoothed.updateMask(vh_smoothed.lt(-27)).visualize(floodViz),
  vvp_watermask.visualize({palette: ['BLUE']}),
  ]).mosaic();
Map.addLayer(FloodMap.clip(bnd), {},'Flood Map');
// Export the flood map.
Export.image.toDrive({
  image: FloodMap, //Generated flood map
  description: 'Flood_Map', //Export file name  
  scale: 90, //Map resolution, here we used 300 to minimized the google drive space
  //region: bnd // The boundary of the flood mapping areas
  maxPixels:1e10, 
  folder: "folder_name", // please give the flder name from your Goodle drive
});
//*
// Author 
// Kabir Uddin
// GIS and Remote Sensing Specialist
// International Centre for Integrated Mountain Development
// Email: Kabir.Uddin@icimod.org
// kabir.uddin.bd@gmail.com
//