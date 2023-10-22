var Hyderabad = 
    ee.Geometry.Point([78.47396352619529, 17.42031528488411]),
    Streams = ee.FeatureCollection("users/rambabu/GHMC/Streams");
Map.centerObject(Hyderabad,12);
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint the edges with different colors and widths.
var outlines = empty.paint({
  featureCollection: Streams,
  color: 'StreamOrde',
  width: '2'
});
var palette = ['0075C4', '004ED7'];
Map.addLayer(outlines, {palette: palette,min:1, max: 5}, 'Streams Network',0);
var srtm = ee.Image("USGS/SRTMGL1_003");
var elevation = srtm.select('elevation');
print(elevation);
var elevationVis = {
  min: 400,
  max: 650,
  //palette: [ '00ff00', 'ffff00', 'ff0000'],
  palette: ['3ae237', 'b5e22e', 'd6e21f', 'fff705', 'ffd611','ffb613', 'ff8b13','ff6e08', 'ff500d', 'ff0000'],
};
Map.addLayer(elevation, elevationVis, 'Elevation',1,0.3);
//display hillshading and slope
var hillshade = ee.Terrain.hillshade(srtm);
Map.addLayer(hillshade, {min:150, max:255,}, 'Hillshade',0,0.2);
//var slope = ee.Terrain.slope(srtm);
//Map.addLayer(slope, {min:0, max:20, pallete: ['FFFFFF']},'Slope',0);
//Add Contour Map
var lines = ee.List.sequence(400, 650, 50)
var contourlines = lines.map(function(line) {
var mycontour = srtm
  .convolve(ee.Kernel.gaussian(5, 3))
  .subtract(ee.Image.constant(line)).zeroCrossing()
  .multiply(ee.Image.constant(line)).toFloat();
  return mycontour.mask(mycontour);
})
contourlines = ee.ImageCollection(contourlines).mosaic()
Map.addLayer(contourlines, {min: 400, max: 650, palette:['3ae237','ff0000']}, 'Contours',0)
// Include JRC layer on surface water occurance to mask flood pixels from areas
var swater = ee.Image('JRC/GSW1_0/GlobalSurfaceWater').select('occurrence');
var swater_mask = swater.gte(0).updateMask(swater.gte(0));
// final flooded area without pixels in perennial waterbodies
var flooded = swater_mask.updateMask(swater_mask);
var waterPalette1 = ['6697C7'];
Map.addLayer(flooded,{min: 0, max: 1, palette: waterPalette1}, 'Max. Surface Water',0);