var dataset = ee.Image('NOAA/NGDC/ETOPO1');
var elevation = dataset.select('bedrock');
var elevationVis = {
  min: -7000.0,
  max: 3000.0,
  palette: ['011de2', 'afafaf', '3603ff', 'fff477', 'b42109'],
};
var lit_zone = elevation.expression('dem >= -50 &&  dem <= 0',
    {dem: elevation.select('bedrock')})
Map.setCenter(-37.62, 25.8, 2);
Map.addLayer(elevation, elevationVis, 'Elevation');
Map.addLayer(lit_zone,{"min": 0,"max":1, 
               palette: ['black', 'red']}, 'litzone');
Export.image.toDrive({
  image: lit_zone,
  description: 'LITZONE',
});