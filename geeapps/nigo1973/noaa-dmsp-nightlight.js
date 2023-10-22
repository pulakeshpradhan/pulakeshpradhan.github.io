Map.setCenter(140.9576274, 37.7979717, 8); // Souma in Fukushima.
Map.setOptions('SATELLITE');
var dataset = ee.ImageCollection('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS')
                .select('avg_vis')
                .map(function(img){
                  return img.set('year', ee.Image(img).date().get('year'))
                })
var years = [2010, 2011, 2012, 2013]
for (var a = 0; a < 4; a++){
  var filter = dataset.filterMetadata('year', 'equals', years[a])
  var style = {
    bands: ['avg_vis'],
    min:3,
    max: 63,
    palette: ['black','white', 'orange', 'yellow', 'red'],
    opacity: 1.0
  }
  Map.addLayer(filter, style, 'NOAA - YEAR:' + ' ' + years[a], true)
}