var table = ui.import && ui.import("table", "table", {
      "id": "users/ucanwhatsappme/JaipurCity"
    }) || ee.FeatureCollection("users/ucanwhatsappme/JaipurCity");
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var dataset3 = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2021-01-01', '2021-01-30')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                  .map(maskS2clouds);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
var clip3=dataset3.mean().clip(table);
Map.addLayer(clip3, visualization, 'RGB');
var dataset = ee.ImageCollection('JRC/GHSL/P2016/POP_GPW_GLOBE_V1')
                  .filter(ee.Filter.date('2015-01-01', '2015-12-31'));
var populationCount = dataset.select('population_count');
var populationCountVis = {
  min: 0.0,
  max: 200.0,
  palette: ['060606', '337663', '337663', 'ffffff'],
};
Map.setCenter(75.78, 27.1052, 9);
var clip=populationCount.mean().clip(table);
Map.addLayer(clip, populationCountVis, 'Population 2016');
var dataset2 = ee.Image('CGIAR/SRTM90_V4');
var elevation = dataset2.select('elevation');
var slope = ee.Terrain.slope(elevation);
var clip2=slope.clip(table);
Map.addLayer(clip2, {min: 0, max: 4}, 'slope');
//GlobCover: Global Land Cover Map
var dataset4 = ee.Image('ESA/GLOBCOVER_L4_200901_200912_V2_3');
var landcover = dataset4.select('landcover');
var clip4=landcover.clip(table);
Map.addLayer(clip4, {}, 'Landcover 2009');
//SOIL WATER
var dataset5 = ee.Image("OpenLandMap/SOL/SOL_WATERCONTENT-33KPA_USDA-4B1C_M/v01");
var visualization = {
  bands: ['b0'],
  min: 0.0,
  max: 52.9740182135385,
  palette: [
    "d29642","eec764","b4ee87","32eeeb","0c78ee","2601b7",
    "083371",
  ]
};
Map.centerObject(dataset5);
var clip5=dataset5.clip(table);
Map.setCenter(75.78, 27.1052, 9);
Map.addLayer(clip5, visualization, "Soil water content at 33kPa (field capacity)");
//HYDROGRAPHY MAP
var dataset6 = ee.Image("MERIT/Hydro/v1_0_1");
var visualization = {bands: ['viswth'],};
var clip6=dataset6.clip(table);
Map.addLayer(clip6, visualization, "Hydrography Map");