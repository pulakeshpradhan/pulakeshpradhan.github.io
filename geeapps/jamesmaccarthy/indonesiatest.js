//********** default things *********
// Map.setOptions('HYBRID'); //SATELLITE
// var lat = 110.1916
// var lon = -0.9082
// var zoom = 12
// Map.setCenter(lat, lon, 12)
var test_chips = ee.FeatureCollection('projects/anika-alert-drivers/assets/test_chips_20211202')
var centerPlotID = 1
var centerPlot = test_chips.filterMetadata('PLOTID', 'equals', centerPlotID)
                            .first()
Map.centerObject(centerPlot, 12)