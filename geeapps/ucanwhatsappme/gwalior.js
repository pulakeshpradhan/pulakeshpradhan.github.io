var region = ui.import && ui.import("region", "table", {
      "id": "users/ucanwhatsappme/Gwalior"
    }) || ee.FeatureCollection("users/ucanwhatsappme/Gwalior");
Map.setCenter(78.3869, 26.3398, 9);
// rgb true color image 
var data1 = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
    .filterDate('2021-03-01', '2021-04-01');
var clip1 =data1.mean().clip(region);
var bands1 = {
  bands: ['SR_B4', 'SR_B3', 'SR_B2'],
  min: 0.0,
  max: 30000.0,
};
Map.addLayer(clip1, bands1, 'True Color');
//landcover map
var dataset2 = ee.Image("COPERNICUS/Landcover/100m/Proba-V-C3/Global/2019")
.select('discrete_classification');
var clip2=dataset2.clip(region);
Map.addLayer(clip2,{}, 'Landcover');
//urban area map
var dataset3 = ee.ImageCollection('JRC/GHSL/P2016/POP_GPW_GLOBE_V1')
                  .filter(ee.Filter.date('2015-01-01', '2015-12-31'));
var populationCount = dataset3.select('population_count');
var clip3=populationCount.mean().clip(region);
var bands3 = {
  min: 0.0,
  max: 200.0,
  palette: ['060606', '337663', '337663', 'green'],
};
Map.addLayer(clip3, bands3, 'Population Count');
// DISTRICT AREA CALCULATION
var stateArea = region.geometry().area()
var stateAreaSqKm = ee.Number(stateArea).divide(1e6).round()
print(stateAreaSqKm)
//URBAN AREA
var modisLandcover = ee.ImageCollection("MODIS/006/MCD12Q1")
var filtered = modisLandcover.filter(
  ee.Filter.date('2018-01-01', '2018-12-31'))
var landcover2018 = ee.Image(filtered.first())
var classified = landcover2018.select('LC_Type1')
var Landcover = classified.clip(region)
var urban = Landcover.eq(13)
var areaImage = urban.multiply(ee.Image.pixelArea())
var area = areaImage.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: region.geometry(),
  scale: 500,
  maxPixels: 1e10
  })
var urbanAreaSqKm = ee.Number(
  area.get('LC_Type1')).divide(1e6).round()
print(urbanAreaSqKm)