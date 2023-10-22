//define period of analysis
var period = 'Winter'
//import historical data
var hist = ee.List([])
for(var i = 1950; i < 2006; i++){
hist = hist.add(ee.Image('users/dareyt/Hist_mean/' + period + '_mean_hist_' + i.toString())
  .addBands(i)
  .set({'year': i})
  .toFloat())}
hist = ee.ImageCollection(hist)
//import projected data
var rcp85 = ee.List([])
var rcp45 = ee.List([])
for(var i = 2006; i < 2100; i++){
rcp85 = rcp85.add(ee.Image('users/dareyt/RCP85_mean/' + period + '_mean_rcp85_' + i.toString())
  .addBands(i)
  .set({'year': i})
  .toFloat())
rcp45 = rcp45.add(ee.Image('users/dareyt/RCP45_mean/' + period + '_mean_rcp45_' + i.toString())
  .addBands(i)
  .set({'year': i})
  .toFloat())
}
rcp85 = ee.ImageCollection(rcp85)
rcp45 = ee.ImageCollection(rcp45)
//Estimate trends in a) historical data, b) projected data
var trends_hist = hist.reduce(ee.Reducer.sensSlope())
var trends_rcp85 = rcp85.reduce(ee.Reducer.sensSlope())
var trends_rcp45 = rcp45.reduce(ee.Reducer.sensSlope())
//Compare the last quarter of data to the first quarter
var Mean_hist = hist.limit(50).mean().select('SWE')
var Mean_rcp85 = rcp85.sort('system:index', false).limit(25).mean().select('SWE')
var Mean_rcp45 = rcp45.sort('system:index', false).limit(25).mean().select('SWE')
var NH = ee.Geometry.Polygon(180,0,180,60,0,60,-180,60,-180,0,0,0)
Export.image.toDrive({image: rcp45//.filterMetadata('year', 'greater_than', 2024)
                                  .filterMetadata('year','less_than',2025)
                                  .select('SWE')
                                  .mean(), 
                      description: 'RCP45_Winter_mean_Q1',
                      region: NH,
                      scale:20000,
                      maxPixels: 1e9
})
var maps = [];
var map = ui.Map().setControlVisibility(false)
//add rcp45 delta to map
Map.addLayer(Mean_rcp45.subtract(Mean_hist).divide(Mean_hist).multiply(100), {min:-100, max: 100, palette: ['red', 'yellow', 'blue']}, '% difference between hist and rcp45')
map.add(ui.Label('Difference between 1950-2000 and 2075-2100 SWE for RCP4.5'))
maps.push(map)
//add rcp85
var map = ui.Map().setControlVisibility(false)
Map.addLayer(Mean_rcp85.subtract(Mean_hist).divide(Mean_hist).multiply(100), {min:-100, max: 100, palette: ['red', 'yellow', 'blue']}, '% difference between hist and rcp85')
map.add(ui.Label('Difference between 1950-2000 and 2075-2100 SWE for RCP8.5'))
maps.push(map)
ui.root.widgets().reset(maps)
var linker = ui.Map.Linker(maps);