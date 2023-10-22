var dataset = ee.Image('CGIAR/SRTM90_V4');
var elevation = dataset.select('elevation');
var slope = ee.Terrain.slope(elevation);
Map.setCenter(-112.8598, 36.2841, 8);
Map.addLayer(slope, {min: 0, max: 60}, 'slope');
Map.addLayer(elevation, {min: 1000, max: 2500}, 'elevation');