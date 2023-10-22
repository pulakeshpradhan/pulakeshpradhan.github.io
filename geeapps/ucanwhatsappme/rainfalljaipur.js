var chirps = ui.import && ui.import("chirps", "imageCollection", {
      "id": "UCSB-CHG/CHIRPS/PENTAD"
    }) || ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD"),
    jaipur = ui.import && ui.import("jaipur", "table", {
      "id": "users/ucanwhatsappme/JaipurCity"
    }) || ee.FeatureCollection("users/ucanwhatsappme/JaipurCity");
Map.setCenter(75.78, 27.1052, 9)
var year = 2020
var startDate = ee.Date.fromYMD(year, 1, 1)
var endDate = startDate.advance(1, 'year')
var filtered = chirps
  .filter(ee.Filter.date(startDate, endDate))
var image = filtered.reduce(ee.Reducer.sum())
var band = {
  min:0,
  max: 2000,
  palette: ['red' ,'cyan','purple','blue','black' ]
}
var clip=image.clip(jaipur);
Map.addLayer(clip, band, 'Total Precipitation')
// Calculate average rainfall in jaipur
var stats = image.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: jaipur,
  scale: 5000,
  })
print(stats.get('precipitation_sum'))
// Calculate average rainfall for past 35+ years
var years = ee.List.sequence(1981, 2020)
print(years)
var yearlyRainfall = function(year) {
  var startDate = ee.Date.fromYMD(year, 1, 1)
  var endDate = startDate.advance(1, 'year')
  var filtered = chirps
    .filter(ee.Filter.date(startDate, endDate))
  var total = filtered.reduce(ee.Reducer.sum())
  var stats = total.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: jaipur,
  scale: 5000,
  })
  var f = ee.Feature(null, {
    'year': year,
    'precipitation': stats.get('precipitation_sum')
  })
  return f
}
var rainfallYears = ee.FeatureCollection(
  years.map(yearlyRainfall))
print(rainfallYears)
Export.table.toDrive({
  collection: rainfallYears,
  folder: 'earthengine',
  fileNamePrefix: 'Jaipur_Rainfall',
  fileFormat: 'CSV'})