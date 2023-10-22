Map.setOptions("HYBRID");
Map.setCenter(-101.71, 32.42, 7);
// US Lithology
// https://developers.google.com/earth-engine/datasets/catalog/CSP_ERGo_1_0_US_lithology
var dataset = ee.Image('CSP/ERGo/1_0/US/lithology');
var lithology = dataset.select('b1');
var lithologyVis = {
  min: 0.0,
  max: 20.0,
  palette: [
    '356EFF', 'ACB6DA', 'D6B879', '313131', 'EDA800', '616161', 'D6D6D6',
    'D0DDAE', 'B8D279', 'D5D378', '141414', '6DB155', '9B6D55', 'FEEEC9',
    'D6B879', '00B7EC', 'FFDA90', 'F8B28C'
  ],
};
Map.addLayer(lithology, lithologyVis, 'Lithology 90m');
// Alluvium and coastal sediment fine and water reservoir 
var ds_alluvium  = lithology.eq(19).or(lithology.eq(0));
var alluviumVis = {
  min: 0.0,
  max: 1.0,
  palette: ['a5a5a5', 'fe6f00'],
};
Map.addLayer(ds_alluvium, alluviumVis, 'Alluvium and coastal sediment fine 90m');
// Calculate distance to target pixels Alluvium and coastal sediment fine and water reservoirs.
var maxDistM = 150000;
// Euclidean distance.
var AlluviumEuclideanKernel = ee.Kernel.euclidean(maxDistM, 'meters');
var AlluviumEuclideanDist = ds_alluvium.distance(AlluviumEuclideanKernel);
var AlluviumDistVis = {min: 0, max: maxDistM/2, palette: ['d7191c', 'fdae61', 'ffffbf', 'abdda4', '2b83ba'],};
Map.addLayer(AlluviumEuclideanDist, AlluviumDistVis, 'Proximity Alluvium and coastal sediment fine 90m');
//  Global SRTM Landforms 90m
// https://developers.google.com/earth-engine/datasets/catalog/CSP_ERGo_1_0_Global_SRTM_landforms
var ds_SRTM_Landforms = ee.Image('CSP/ERGo/1_0/Global/SRTM_landforms');
var SRTM_Landforms = ds_SRTM_Landforms.select('constant');
var landformsVis = {
  min: 11.0,
  max: 42.0,
  palette: [
    '141414', '383838', '808080', 'EBEB8F', 'F7D311', 'AA0000', 'D89382',
    'DDC9C9', 'DCCDCE', '1C6330', '68AA63', 'B5C98E', 'E1F0E5', 'a975ba',
    '6f198c'
  ],
};
Map.addLayer(SRTM_Landforms, landformsVis, 'SRTM_Landforms 90m', false);
//  Global ALOS Landforms
// https://developers.google.com/earth-engine/datasets/catalog/CSP_ERGo_1_0_Global_ALOS_landforms
var ds_ALOS_landforms = ee.Image('CSP/ERGo/1_0/Global/ALOS_landforms');
var ALOS_landforms = ds_ALOS_landforms.select('constant');
Map.addLayer(ALOS_landforms, landformsVis, 'ALOS_landforms 90m', false);
// US NED Landforms 10m
// https://developers.google.com/earth-engine/datasets/catalog/CSP_ERGo_1_0_US_landforms#bands
var ds_NED_Landforms = ee.Image('CSP/ERGo/1_0/US/landforms');
var NED_Landforms = ds_NED_Landforms.select('constant');
Map.addLayer(NED_Landforms, landformsVis, 'NED_Landforms 10m', false);
// US Physiography 90 meters
// https://developers.google.com/earth-engine/datasets/catalog/CSP_ERGo_1_0_US_physiography
var ds_US_Physiography = ee.Image('CSP/ERGo/1_0/US/physiography');
var physiography = ds_US_Physiography.select('constant');
var physiographyVis = {
  min: 1100.0,
  max: 4220.0,
};
Map.addLayer(physiography, physiographyVis, 'Physiography 90m', false);
// US NED mTPI (Multi-Scale Topographic Position Index)
// https://developers.google.com/earth-engine/datasets/catalog/CSP_ERGo_1_0_US_mTPI
var ds_usMtpi = ee.Image('CSP/ERGo/1_0/US/mTPI');
var usMtpi = ds_usMtpi.select('elevation');
var usMtpiVis = {
  min: -200.0,
  max: 200.0,
  palette: ['0b1eff', '4be450', 'fffca4', 'ffa011', 'ff0000'],
};
Map.addLayer(usMtpi, usMtpiVis, 'US mTPI 270m', false);
// Global ALOS mTPI (Multi-Scale Topographic Position Index)
// https://developers.google.com/earth-engine/datasets/catalog/CSP_ERGo_1_0_Global_ALOS_mTPI
var ds_ALOS_mTPI = ee.Image('CSP/ERGo/1_0/Global/ALOS_mTPI');
var alosMtpi = ds_ALOS_mTPI.select('AVE');
var alosMtpiVis = {
  min: -200.0,
  max: 200.0,
  palette: ['0b1eff', '4be450', 'fffca4', 'ffa011', 'ff0000'],
};
Map.addLayer(alosMtpi, alosMtpiVis, 'ALOS mTPI 270m', false);
// Global ALOS Topographic Diversity 270m
// https://developers.google.com/earth-engine/datasets/catalog/CSP_ERGo_1_0_Global_ALOS_topoDiversity
var ds_ALOS_topoDiversity = ee.Image('CSP/ERGo/1_0/Global/ALOS_topoDiversity');
var alosTopographicDiversity = ds_ALOS_topoDiversity.select('constant');
var alosTopographicDiversityVis = {
  min: 0.0,
  max: 1.0,
};
Map.addLayer(
    alosTopographicDiversity, alosTopographicDiversityVis,
    'ALOS Topographic Diversity 270m', false);
//  US NED Topographic Diversity 90m
// https://developers.google.com/earth-engine/datasets/catalog/CSP_ERGo_1_0_US_topoDiversity#bands
var ds_US_topoDiversity = ee.Image('CSP/ERGo/1_0/US/topoDiversity');
var usTopographicDiversity = ds_US_topoDiversity.select('constant');
var usTopographicDiversityVis = {
  min: 0.0,
  max: 1.0,
};
Map.addLayer(
    usTopographicDiversity, usTopographicDiversityVis,
    'US Topographic Diversity 90m', false);
//  ETOPO1: Global 1 Arc-Minute Elevation 1855 meters 
// https://developers.google.com/earth-engine/datasets/catalog/NOAA_NGDC_ETOPO1
var ds_ETOPO1 = ee.Image('NOAA/NGDC/ETOPO1');
var ETOPO1_ele = ds_ETOPO1.select('bedrock');
var elevationVis = {
  min: -100.0,
  max: 3000.0,
//  palette: ['011de2', 'afafaf', '3603ff', 'fff477', 'b42109'],
//  palette: [ '3ae237', 'b5e22e', 'd6e21f', 'fff705', 'ffd611', 'ffb613', 'ff8b13',  'ff6e08', 'ff500d', 'ff0000', 'de0101', 'c21301', '0602ff', '235cb1',  '307ef3', '269db1', '30c8e2', '32d3ef', '3be285', '3ff38f', '86e26f']
  gamma: 3.5,
};
Map.addLayer(ETOPO1_ele, elevationVis, 'ETOPO1_elevation 1,85km', false);
//  GMTED2010: Global Multi-resolution Terrain Elevation Data 2010 - 232m
// https://developers.google.com/earth-engine/datasets/catalog/USGS_GMTED2010
var ds_GMTED2010 = ee.Image('USGS/GMTED2010');
var GMTED2010_ele = ds_GMTED2010.select('be75');
Map.addLayer(GMTED2010_ele, elevationVis, 'GMTED2010_elevation  232m', false);
//  SRTM Digital Elevation Data Version 4
// https://developers.google.com/earth-engine/datasets/catalog/CGIAR_SRTM90_V4#bands
var ds_SRTM90_V4 = ee.Image('CGIAR/SRTM90_V4');
var SRTM90_V4_elevation = ds_SRTM90_V4.select('elevation');
Map.addLayer(SRTM90_V4_elevation, elevationVis, 'SRTM90_V4_elevation  90m', false);
//  NASADEM: NASA NASADEM Digital Elevation 30m
// https://developers.google.com/earth-engine/datasets/catalog/NASA_NASADEM_HGT_001#bands
var ds_NASADEM_30m = ee.Image('NASA/NASADEM_HGT/001');
var NASADEM_30m_ele = ds_NASADEM_30m.select('elevation');
Map.addLayer(NASADEM_30m_ele, elevationVis, 'NASADEM_elevation 30m', false);
//  USGS 3DEP 10m National Map Seamless (1/3 Arc-Second)
// https://developers.google.com/earth-engine/datasets/catalog/USGS_3DEP_10m#bands
var ds_USGS_3DEP_10m = ee.Image('USGS/3DEP/10m')
var USGS_3DEP_10m_elevation = ds_USGS_3DEP_10m.select('elevation');
Map.addLayer(USGS_3DEP_10m_elevation, elevationVis, 'USGS_3DEP_elevation 10m', false);
// SLOPE
var ETOPO_slope = ee.Terrain.slope(ETOPO1_ele);
Map.addLayer(ETOPO_slope, {min: 0, max: 30}, 'ETOPO_slope 2km', false);
var GMTED2010_slope = ee.Terrain.slope(GMTED2010_ele);
Map.addLayer(GMTED2010_slope, {min: 0, max: 30}, 'GMTED2010_slope 232m', false);
var SRTM90_V4_slope = ee.Terrain.slope(SRTM90_V4_elevation);
Map.addLayer(SRTM90_V4_slope, {min: 0, max: 30}, 'SRTM90_V4_slope 90m', false);
var NASADEM_30m_slope = ee.Terrain.slope(NASADEM_30m_ele);
Map.addLayer(NASADEM_30m_slope, {min: 0, max: 30}, 'NASADEM_slope 30m', false);
var USGS_3DEP_10m_slope = ee.Terrain.slope(USGS_3DEP_10m_elevation);
Map.addLayer(USGS_3DEP_10m_slope, {min: 0, max: 30}, 'USGS_3DEP slope 10m', false);
// ee.Terrain.fillMinima
// https://developers.google.com/earth-engine/apidocs/ee-terrain-fillminima
// ee.Terrain.fillMinima(image, borderValue, neighborhood)
// var GMTED2010_fillMinima = ee.Terrain.fillMinima(GMTED2010_ele);
//Map.addLayer(GMTED2010_fillMinima, {min: 0, max: 250}, 'GMTED2010_fillMinima 232m', false);