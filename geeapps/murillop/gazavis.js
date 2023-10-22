var date_bfast = ee.Image("users/murillop/GAZA/date_breaks"),
    geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[34.49075568803573, 31.61440710981752],
          [34.20511115678573, 31.3591101048622],
          [34.26278937944198, 31.187742510611667],
          [34.40011848100448, 31.305151171899894],
          [34.61984504350448, 31.541870626401582]]]),
    mag_bfast = ee.Image("users/murillop/GAZA/magnitude");
/*
#######################################################################################################
This code was modified from the original script written by: Gennadii Donchyts 
Original: https://code.earthengine.google.com/f0011ae8554cf924176fd7a931a38add
#######################################################################################################
2018-05-11
Modifications were made by Justin Braaten (jstnbraaten@gmail.com) 
-Modified to include all the combinations from this this ESRI blog post:
 https://www.esri.com/arcgis-blog/products/product/imagery/band-combinations-for-landsat-8/
-Set ControlVisibility on first map to false
-Added three columns of maps to accommodate all the additional combinations
-Centered the maps near Santa Cruz
-Changed the image source year to 32-day composite for 2016 July
-Changed the title and the map labels
#######################################################################################################
2018-12-12 
More modifications by Paulo Murillo. Gaza Project! 
#######################################################################################################
*/
// Display a grid of linked maps, each with a different visualization.
//var image2 = ee.Image('LANDSAT/LC8_L1T_32DAY_TOA/20180132');
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60')
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = ee.Number(2).pow(10).int()
  var cirrusBitMask = ee.Number(2).pow(11).int()
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
// Map the function over one year of data and take the median.
// Load Sentinel-2 TOA reflectance data.
var collection = ee.ImageCollection('COPERNICUS/S2')
    .filterDate('2018-11-01', '2018-12-31')
    .filterBounds(geometry)
    // Pre-filter to get less cloudy granules.
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
    .map(maskS2clouds)
var sentinel_para = {'min': 0.05,'max': [0.3,0.6,0.35],   'bands':'B11,B8,B4'};
//Another way
// //Get some s2 data
// var s2s = ee.ImageCollection('COPERNICUS/S2')
//                   .filterDate(startDate,endDate)
//                   .filterBounds(geometry)
//                   .map(function(img){
//                     var t = img.select([ 'B1','B2','B3','B4','B5','B6','B7','B8','B8A', 'B9','B10', 'B11','B12']).divide(10000);//Rescale to 0-1
//                     t = t.addBands(img.select(['QA60']));
//                     var out = t.copyProperties(img).copyProperties(img,['system:time_start']);
//                   return out;
//                     })
//                     .select(['QA60', 'B1','B2','B3','B4','B5','B6','B7','B8','B8A', 'B9','B10', 'B11','B12'],['QA60','cb', 'blue', 'green', 'red', 're1','re2','re3','nir', 'nir2', 'waterVapor', 'cirrus','swir1', 'swir2']);
// /////////////////////////////////////////////////////                  
// //Map.addLayer(s2s,vizParams, 'all')
// //var s2 = ee.Image(s2s.sort('QA60').first());
// var s2 = ee.Image(s2s.first());
//Masking everythin first. Remove spurious points from BFAST. Keep magnitudes less than 0.
var xxx = date_bfast.updateMask(mag_bfast.lt(0))
var NAMES = [
  'Year // 2008',
  'Year // 2009',
  'Year // 2010',
  'Year // 2011',
  'Year // 2012',
  'Year // 2013',
  'Year // 2014',
  'Year // 2015',
  'Year // 2016',
  'Year // 2017'
];
var VIS_PARAMS = [
  {min: 2008, max: 2009, palette:'2623ff',bands: ['b4']},
  {min: 2009, max: 2010, palette:'2623ff',bands: ['b5']},
  {min: 2010, max: 2011, palette:'2623ff',bands: ['b6']},
  {min: 2011, max: 2012, palette:'2623ff',bands: ['b7']},
  {min: 2012, max: 2013, palette:'2623ff',bands: ['b8']},
  {min: 2013, max: 2014, palette:'2623ff',bands: ['b9']},
  {min: 2014, max: 2015, palette:'2623ff',bands: ['b10']},
  {min: 2015, max: 2016, palette:'2623ff',bands: ['b11']},
  {min: 2016, max: 2017, palette:'2623ff',bands: ['b12']},
  {min: 2017, max: 2018, palette:'2623ff',bands: ['b13']}
];
// Create a map for each visualization option.
var maps = [];
NAMES.forEach(function(name, index) {
  var map = ui.Map();
  map.add(ui.Label(name));
  map.addLayer(collection.first(), sentinel_para);
  map.addLayer(xxx, VIS_PARAMS[index], name);
  map.setControlVisibility(false);
  maps.push(map);
});
var linker = ui.Map.Linker(maps);
// Enable zooming on the top-left map.
maps[0].setControlVisibility({zoomControl: true});
// Show the scale (e.g. '500m') on the bottom-right map.
maps[3].setControlVisibility({scaleControl: true});
maps[0].setControlVisibility({geometryEditor: true});
// Create a title.
var title = ui.Label('BFASTSpatial disturbance. Background Sentinel2', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
// Create a grid of maps.
var mapGrid = ui.Panel(
  [
    ui.Panel([maps[0], maps[1]], null, {stretch: 'both'}),
    ui.Panel([maps[2], maps[3]], null, {stretch: 'both'}),
    ui.Panel([maps[4], maps[5]], null, {stretch: 'both'}),
    ui.Panel([maps[6], maps[7]], null, {stretch: 'both'}),
    ui.Panel([maps[8], maps[9]], null, {stretch: 'both'})
  ],
  ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'}
);
// Add the maps and title to the ui.root.
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
// Center the maps near Santa Cruz.
maps[0].setControlVisibility(false);
maps[0].setCenter(34.5128, 31.56863, 13);