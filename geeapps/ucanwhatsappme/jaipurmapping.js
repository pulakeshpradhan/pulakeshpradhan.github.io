// elevation
var jaipur = ee.FeatureCollection("users/ucanwhatsappme/JaipurCity");
Map.setCenter(75.78, 27.1052, 9);
var data = ee.Image('CGIAR/SRTM90_V4');
var elevation = data.select('elevation');
var slope = ee.Terrain.slope(elevation);
var image=slope.clip(jaipur);
var bands = {
  min: 0,
  max: 4,
};
Map.addLayer(image,bands,"ELEVATION");
//soil texture
var dataset2 = ee.Image("OpenLandMap/SOL/SOL_TEXTURE-CLASS_USDA-TT_M/v02");
var bands2 = {
  bands: ['b0'],
  min: 1.0,
  max: 12.0,
  palette: [
    "d5c36b","b96947","9d3706","ae868f","f86714","46d143",
    "368f20","3e5a14","ffd557","fff72e","ff5a9d","ff005b",
  ]
};
var clip2=dataset2.clip(jaipur);
Map.addLayer(clip2,bands2,"SOIL TYPE");
//cropland extent
var dataset = ee.Image('USGS/GFSAD1000_V1');
var cropMask = dataset.select('landcover');
var clip3=cropMask.clip(jaipur);
var bands3 = {
  min: 0.0,
  max: 5.0,
  palette: ['black', 'orange', 'brown', '02a50f', 'green', 'yellow'],
};
Map.addLayer(clip3,bands3,'Cropland Extent');
// soil water capacity
var data4 = ee.Image("OpenLandMap/SOL/SOL_WATERCONTENT-33KPA_USDA-4B1C_M/v01");
var clip4=data4.clip(jaipur);
var bands4 = {
  bands: ['b0'],
  min: 0.0,
  max: 52.9740182135385,
  palette: [
    "d29642","eec764","b4ee87","32eeeb","0c78ee","2601b7",
    "083371",
  ]
};
Map.addLayer(clip4, bands4, ' Surface Water');
// hydrography
var data5 = ee.Image("MERIT/Hydro/v1_0_1");
var clip5=data5.clip(jaipur);
var bands5 = {
  bands: ['viswth'],
};
Map.addLayer(clip5, bands5, 'hydrography');