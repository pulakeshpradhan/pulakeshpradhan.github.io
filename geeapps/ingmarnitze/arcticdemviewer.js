Map.setOptions('SATELLITE')
var elevationVis2 = {
  min: -10.0,
  max: 700.0,
  palette: ['#709959', '#F0E990', '#F0CB86', '#C9957F', '#CC9E89', '#EED7BC', '#F9ECD7', '#FBF5EA', '#FCFAF5', '#FCFBF9', '#FCFCFC'],
};
var VisHs = {
  min: 150,
  max: 200,
};
Map.centerObject(ee.Geometry.Point([-165, 66.1]), 11)
// Load Arctic DEM and make Hillshade
var dem = ee.Image("UMN/PGC/ArcticDEM/V3/2m_mosaic").select('elevation');
var hillshade = ee.Terrain.hillshade(dem, 270, 45).select('hillshade');
Map.addLayer(dem, elevationVis2, 'Arctic DEM Elevation', true)
Map.addLayer(hillshade, VisHs, 'Arctic DEM Hillshade', true, 0.4)