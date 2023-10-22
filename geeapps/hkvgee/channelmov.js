/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #d63000 */ee.Geometry.Point([34.8660119569031, -17.046826174412587]),
    Landsat = ee.ImageCollection("LANDSAT/LT05/C01/T1_TOA"),
    geometry2 = 
    /* color: #98ff00 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[34.97239935203885, -17.425860537744843],
          [34.97239935203885, -17.724355101046413],
          [35.2827631215701, -17.724355101046413],
          [35.2827631215701, -17.425860537744843]]], null, false);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
Map.centerObject(geometry,7)
// 1990
var image1990 = ee.Image(Landsat
.filterBounds(geometry)
.filterDate('1990-01-01', '1990-12-31')
.sort('CLOUD_COVER')
.first());
print(image1990);
// 2005
var image2005 = ee.Image(Landsat
.filterBounds(geometry)
.filterDate('2005-01-01', '2005-12-31')
.sort('CLOUD_COVER')
.first());
print(image2005)
// Manual imagecollection selection
var imagecollection = ee.ImageCollection(['LANDSAT/LT05/C01/T1_TOA/LT05_167072_19901008','LANDSAT/LT05/C01/T1_TOA/LT05_167072_20050307']);
var visParams = {bands: ['B3', 'B2', 'B1'], max: 0.3};
Map.addLayer(ee.Image((imagecollection.toList(imagecollection.size())).get(0)), visParams, 't0')
Map.addLayer(ee.Image((imagecollection.toList(imagecollection.size())).get(1)), visParams, 't1')
var Determinewatermask = function(index, centerline, MaxDist) {
  var WaterMaskFunc = function(image){
    var addNDWI = ee.Image(image).addBands(ee.Image(image).normalizedDifference(['B2','B4']).rename('NDWI'))
    var edge = ee.Algorithms.CannyEdgeDetector(addNDWI.select('NDWI'), 0.4) 
    // value 0.4 is minimal difference for the edge
    var scale = 200 // Determine the size of the buffer. In this case 200 square meters,
    //the larger the scale the larger the bufferzone around focal_max. 
    var edgeBuffer = edge.focal_max(scale, 'square' , 'meters' ); // create a buffer around the focal_max.
    var EdgeCut = ee.Image(addNDWI).mask(edgeBuffer) //mask the bufferzone around the focal_max
    //edges between land and water
  var threshold = 0
    // Now determine the water mask
  var WaterMask = addNDWI.select('NDWI').gt(threshold) // by using the NDWI create the water mask
  // filter noise with the help of the centerline
  var ExtractChannel = function(ctrline, maxDistance) {
  // extract the channel water bodies from the water mask, based on connectivity to the reference centerline.
  // to only show the rivers and not random other lakes etc.
    var cost = WaterMask.not().cumulativeCost({
        source: ee.Image().toByte().paint(ee.Image(centerline), 1).and(WaterMask), 
        // only use the centerline that overlaps with the water mask
        maxDistance: maxDistance,
        geodeticDistance: false
      }).eq(0);
    return WaterMask.updateMask(cost).unmask(0).updateMask(WaterMask.gte(0)).rename(['channelMask']);
    };
  var channel = ExtractChannel(centerline, MaxDist)
  return channel
  }
return WaterMaskFunc
}
var grwl = ee.FeatureCollection("users/eeProject/grwl") // Global database of river centerline
// RivWidthCloud Paper
var bounds = imagecollection.first().geometry(); // First image of Landsatimages (1990)
var centerlineFiltered = grwl.filterBounds(bounds) // Only use the river centerlines that fit in the 'bounds'
var WaterMasks = imagecollection.map(Determinewatermask('NDWI',centerlineFiltered, 5000))
// Make a List out of this imagecollection
var WaterMasks = WaterMasks.toList(WaterMasks.size())
// Function calculates the difference between t+1 and t
//Calculates difference between t0 and t1, see for 'zip' the Docs. Makes sure you can loop through the information
var DifferenceMasks = WaterMasks.slice(0,-1).zip(WaterMasks.slice(1)).map(function(f){
    return ee.Image(ee.List(f).get(1)).subtract(ee.Image(ee.List(f).get(0)))
  });
var viz = {palette:['yellow','black','red']};
Map.addLayer(ee.ImageCollection(DifferenceMasks),viz,'difference')
// In eroded and deposited, 0 is land, 1 is water - that is why if you // subtract them from eachother the outcome is -1 or 1
// if the grid cell was first water and than land and vice versa.
var eroded = ee.Image(ee.List(DifferenceMasks).get(0)).eq(1)
.updateMask(ee.Image(ee.List(DifferenceMasks).get(0)).eq(1))
var deposited = ee.Image(ee.List(DifferenceMasks).get(0)).eq(-1)
.updateMask(ee.Image(ee.List(DifferenceMasks).get(0)).eq(-1))
var Mask = ee.Image(ee.List(WaterMasks).get(1))
var mosaic = ee.ImageCollection([Mask.visualize({palette: ['black', 'blue']}), 
eroded.visualize({palette: ['red']}), deposited.visualize({palette: ['yellow']})]).mosaic()
print(mosaic)
Map.addLayer(mosaic, {}, 'mosaic')
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Channel movement',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
// var palette =['FFFFFF','d742f4','001556','b7d2f7'];
var palette = ['0000FF','FF0000','FFFF00'];
// name of the legend
var names = ['constant water','eroded','deposited']
// Add color and and names
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);  
Export.image.toDrive({
  image: mosaic.select('vis-red', 'vis-green', 'vis-blue'),
  description: 'imageToDriveExample',
  scale: 30,
  region: geometry2,
  fileFormat: 'GeoTIFF'
});