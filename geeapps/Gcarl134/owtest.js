/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #23cba7 */ee.Geometry.Polygon(
        [[[-72.36261867041391, 43.61733084014623],
          [-72.22048305029672, 43.62230169567336],
          [-72.2191097592811, 43.726594722485665],
          [-72.33927272314828, 43.72212873897361]]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// overwites_combined
// MOD09GA_wkmean_10012018
// cag, bfm
// le: 10/8/2020 bfm
// create a 10 year, weekly median cloud-free surface reflectance product
// temporal filtering assumes a 10 year window; this defaults to 
// ($runtime - 10yr - 5 days)
// to override automatic bounds:
var override_daterange = 0;     // toggle
var startDay = ee.Date.fromYMD(2010,10,1); 
var endDay = ee.Date.fromYMD(2020,10,1);
// output parameters
var imgsrc = 'MODIS/006/MOD09GA';
var pxLen = 500;               // output pixel size (m)
var	proj = 'EPSG:4326';        // WGS84 Geographic
var fileFormat = 'GeoTIFF';
var tileArea = 2560;           // max file size (pixels); must be multiple of shard size
var shards = 256;              // unclear how this works/scales
var maxPix = 1e10;             // max image size (not file size)
// static offset for analog inclusion
var offset = ee.Number(500); // 100 = 1%
var snoffset = ee.Number(10); // 1 = 1%
// Gets polygon of US to clip outputs
var us_bounds = ee.FeatureCollection('USDOS/LSIB_SIMPLE/2017')
    .filter(ee.Filter.eq('country_co', 'US'));
// *******************************************************************************************************
// prepare drawing most from https://developers.google.com/earth-engine/tutorials/community/drawing-tools-region-reduction
// *******************************************************************************************************
// Retrive drawing tools for a map and hide them by default
var drawingTools = Map.drawingTools();
// CHange to true if you want users to be able to change initial color
drawingTools.setShown(false);
// While loop to clear all existing geometries 
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
//Initialize a dummy GeometryLayer with null geometry
var dummyGeometry =
// Change the color here if you want the pin to have a different color
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
//******************************************************
// Drawing buttons
//******************************************************
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() {
//  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
//  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
//  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
//  insert the overWhites function here and move the widget to the bottom
// *******************************************************************************************************
// funcs
// *******************************************************************************************************
//remove layer from map
var removeLayer = function(name) {
  var layers = Map.layers();
  // list of layers names
  var names = [];
  layers.forEach(function(lay) {
    var lay_name = lay.getName();
    names.push(lay_name);
  });
  // get index
  var index = names.indexOf(name);
  if (index > -1) {
    // if name in names
    var layer = layers.get(index);
    Map.remove(layer);
  } else {
    print('Layer '+name+' not found');
  }
};
// simple string formatting equivalent to '%02d'
function pad(num, size){ return ('000000000' + num).substr(-size); }
// bit parser for qa flags
var getQABits = function(image, start_bit, end_bit) {
    var pattern = 0;
    for (var i = start_bit; i <= end_bit; i++) {
       pattern += Math.pow(2, i);
       }
    return image.select([0]).bitwiseAnd(pattern).rightShift(start_bit);
};
// create cloud/ocean mask using qa flags
var mask = function(imgCollect) {
  var QA = imgCollect.select('state_1km');
  // Bits 0-1: Cloud state
  //  0: Clear
  //  1: Cloudy
  //  2: Mixed
  //  3: Not set, assumed clear
  //
  //  accept >0 only
  var cloud = getQABits(QA, 0, 1).expression("b(0) > 0");
  var land = getQABits(QA, 3, 5);
  // Bits 3-5: Land/water flag
  // 0: Shallow ocean
  // 1: Land
  // 2: Ocean coastlines and lake shorelines
  // 3: Shallow inland water
  // 4: Ephemeral water
  // 5: Deep inland water
  // 6: Continental/moderate ocean
  // 7: Deep ocean
  //
  //  accept <5 only
  var out = land.lte(5).and(cloud.not());
  return imgCollect.updateMask(out);
};
// *******************************************************************************************************
// main
// *******************************************************************************************************
// get our dates sorted
if (override_daterange === 0) {
  endDay = ee.Date(Date.now()).advance(-5,'day'); // go back 5 days (to account for availability lag)
  startDay = endDay.advance(-10,'year'); // go back 5 years 
}
  // select month here
  var month = 11;
  // week-specific params
  var fnp = 'm' + pad(month,2); // outname prefix
  var sdoy = (month-1)*30 + 1;    // starting DOY
  var edoy = (month-1)*30 + 30;    // ending DOY
  var mod9 = ee.ImageCollection(imgsrc)
    .filter(ee.Filter.calendarRange(sdoy, edoy, 'day_of_year')) // filter DOY (select month)
    .filterDate(startDay, endDay)                               // filter time period 
    .map(mask);                                                 // apply mask
  // convert collection to time-derivative raster
  var rast = mod9.median();
  // select bands for output and reorder
  var out = rast.select(['sur_refl_b03', 'sur_refl_b04', 'sur_refl_b01', 'sur_refl_b02', 'sur_refl_b05', 'sur_refl_b06', 'sur_refl_b07']);
  // scale for tool renderer (0-10,000 >> 0-255)
  //out = out.multiply(255/10000); 
  //out = out.toUint8();
imageVisParam = {"opacity":1,"bands":["sur_refl_b01","sur_refl_b04","sur_refl_b03"],"min":0,"max":4444,"gamma":1};
Map.addLayer(out, imageVisParam, 'RGB');
// ******************************************************************************
// create a 10 year, weekly mean cloud-free snow cover product
// *******************************************************************************************************
// params
// *******************************************************************************************************
// loop parameters for managing the full temporal (weekly) dataset
// temporal filtering assumes a 5 year window; this defaults to 
// ($runtime - 5yr - 5 days)
// to override automatic bounds:
var override_daterange = 0;     // toggle
var startDay = ee.Date.fromYMD(2010,10,1); 
var endDay = ee.Date.fromYMD(2020,10,1);
// output parameters
var imgsrc = 'MODIS/006/MOD10A1';
var pxLen = 500;               // output pixel size (m)
var	proj = 'EPSG:4326';        // WGS84 Geographic
var fileFormat = 'GeoTIFF';
var tileArea = 2560;           // max file size (pixels); must be multiple of shard size
var shards = 256;              // unclear how this works/scales
var maxPix = 1e10;             // max image size (not file size)
// *******************************************************************************************************
// funcs
// *******************************************************************************************************
// simple string formatting equivalent to '%02d'
function pad(num, size){ return ('000000000' + num).substr(-size); }
var mask = function(imgCollect) {
  //var QA = imgCollect.select('NDSI_Snow_Cover_Class');
  //var cloud = imgCollect.expression("b('NDSI_Snow_Cover_Class') > 100 && b('NDSI_Snow_Cover_Class') < 255");
  //var SCA = imgCollect.select('NDSI_Snow_Cover');
  var lowsca = imgCollect.expression("b('NDSI_Snow_Cover') >= 20");
  //var out = cloud.eq(1).or(lowsca.eq(1));
  return lowsca;//imgCollect.updateMask(lowsca.eq(1));
};
// *******************************************************************************************************
// main
// *******************************************************************************************************
// get our dates sorted
if (override_daterange === 0) {
  endDay = ee.Date(Date.now()).advance(-5,'day'); // go back 5 days (to account for availability lag)
  startDay = endDay.advance(-10,'year'); // go back 10 years 
}
  //var snow_m = 2
  //var fnp = 'snow_m' + pad(snow_m,2); // outname prefix
  var sdoy = 1;   //(snow_m-1)*30 + 1;    // starting DOY
  var edoy = 90;  //(snow_m-1)*30 + 30;    // ending DOY
  var mod9 = ee.ImageCollection(imgsrc)
    .filter(ee.Filter.calendarRange(sdoy, edoy, 'day_of_year')) // filter DOY (jan/feb/march)
    .filterDate(startDay, endDay)                              // filter time period (10 years)
    .map(mask);
  // convert collection to time-derivative raster
  var snowrast = mod9.mean();
  // select bands for output and reorder
  var snow = snowrast.select('NDSI_Snow_Cover');
  snow = snow.multiply(100);
var imageVisParam = {"opacity":1,"bands":["NDSI_Snow_Cover"],"min":20,"palette":["030808","58ffff"]};
Map.addLayer(snow, imageVisParam,'Snow Probability');
// *************************************************************************************
function overWhites() {
  removeLayer('sr match');
  removeLayer('sno match');
  removeLayer('combined match');
  // Get the drawn geometry; it will define the reduction region
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Create buffers
//  var buff1 = 5000
//  var k1Buff = click_point.buffer(buff1);
  var mean_k1 = out.reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: aoi,
      scale: 500
  });
  var mean_scap = snow.reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: aoi,
      scale: 500
  });
  var exVals = ee.List([mean_k1.get('sur_refl_b03'),mean_k1.get('sur_refl_b04'),mean_k1.get('sur_refl_b01'),
                        mean_k1.get('sur_refl_b02'),mean_k1.get('sur_refl_b05'),mean_k1.get('sur_refl_b06'),
                        mean_k1.get('sur_refl_b07')]);
  print(mean_k1);
  var exSCA = mean_scap.get('NDSI_Snow_Cover');
  print(exSCA);
  // clips results to U.S.
  out = out.clipToCollection(us_bounds);
  snow = snow.clipToCollection(us_bounds);
  //analog tool
  var sr = out.updateMask(out.select('sur_refl_b01').gt(ee.Number(exVals.get(2)).subtract(offset))
                        .and(out.select('sur_refl_b01').lt(ee.Number(exVals.get(2)).add(offset)))
                        .and(out.select('sur_refl_b02').gt(ee.Number(exVals.get(3)).subtract(offset)))
                        .and(out.select('sur_refl_b02').lt(ee.Number(exVals.get(3)).add(offset)))
                        .and(out.select('sur_refl_b03').gt(ee.Number(exVals.get(0)).subtract(offset)))
                        .and(out.select('sur_refl_b03').lt(ee.Number(exVals.get(0)).add(offset)))
                        .and(out.select('sur_refl_b04').gt(ee.Number(exVals.get(1)).subtract(offset)))
                        .and(out.select('sur_refl_b04').lt(ee.Number(exVals.get(1)).add(offset)))
                        .and(out.select('sur_refl_b05').gt(ee.Number(exVals.get(4)).subtract(offset)))
                        .and(out.select('sur_refl_b05').lt(ee.Number(exVals.get(4)).add(offset)))
                        .and(out.select('sur_refl_b06').gt(ee.Number(exVals.get(5)).subtract(offset)))
                        .and(out.select('sur_refl_b06').lt(ee.Number(exVals.get(5)).add(offset)))
                        .and(out.select('sur_refl_b07').gt(ee.Number(exVals.get(6)).subtract(offset))));
  var sno = snow.updateMask(snow.select('NDSI_Snow_Cover').lt(ee.Number(exSCA).add(snoffset))
                        .and(snow.select('NDSI_Snow_Cover').gt(ee.Number(exSCA).subtract(snoffset))));
  var combined = out.updateMask(out.select('sur_refl_b01').gt(ee.Number(exVals.get(2)).subtract(offset))
                        .and(out.select('sur_refl_b01').lt(ee.Number(exVals.get(2)).add(offset)))
                        .and(out.select('sur_refl_b02').gt(ee.Number(exVals.get(3)).subtract(offset)))
                        .and(out.select('sur_refl_b02').lt(ee.Number(exVals.get(3)).add(offset)))
                        .and(out.select('sur_refl_b03').gt(ee.Number(exVals.get(0)).subtract(offset)))
                        .and(out.select('sur_refl_b03').lt(ee.Number(exVals.get(0)).add(offset)))
                        .and(out.select('sur_refl_b04').gt(ee.Number(exVals.get(1)).subtract(offset)))
                        .and(out.select('sur_refl_b04').lt(ee.Number(exVals.get(1)).add(offset)))
                        .and(out.select('sur_refl_b05').gt(ee.Number(exVals.get(4)).subtract(offset)))
                        .and(out.select('sur_refl_b05').lt(ee.Number(exVals.get(4)).add(offset)))
                        .and(out.select('sur_refl_b06').gt(ee.Number(exVals.get(5)).subtract(offset)))
                        .and(out.select('sur_refl_b06').lt(ee.Number(exVals.get(5)).add(offset)))
                        .and(out.select('sur_refl_b07').gt(ee.Number(exVals.get(6)).subtract(offset)))
                        .and(snow.select('NDSI_Snow_Cover').lt(ee.Number(exSCA).add(snoffset)))
                        .and(snow.select('NDSI_Snow_Cover').gt(ee.Number(exSCA).subtract(snoffset)))
                        );
  var imageVisParam4 = {"opacity":1,"bands":["sur_refl_b01","sur_refl_b04","sur_refl_b03"],"min":0,"max":4444,"gamma":1};
  Map.addLayer(sr, imageVisParam4,'sr match');
  var imageVisParam5 = {"opacity":0.99,"bands":["NDSI_Snow_Cover"],"min":20,"max":100,"palette":["000000","68ffff"]};
  Map.addLayer(sno,imageVisParam5,'sno match');
  Map.addLayer(combined,imageVisParam4,'combined match');
  Map.setCenter(-100, 40, 4);
  }
// Creating ui panel
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('1. Select a drawing mode.'),
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.point + ' Point',
      onClick: drawPoint,
      style: {stretch: 'horizontal'}
    }),
    ui.Label('2. Draw a geometry.'),
    ui.Label('3. Click "Run"'),
    ui.Button({
      label: 'Run',
      onClick: overWhites,
      style: {stretch: 'horizontal'}
    }),
    ui.Label(
        '4. Repeat 1-3 or edit/move\ngeometry for new results.',
        {whiteSpace: 'pre'}),
    ui.Label('Click "Clear" to\nremove geomteries',
        {whiteSpace: 'pre'}),
    ui.Button({
      label: 'Clear',
      onClick: clearGeometry,
      style: {stretch: 'horizontal'}
    }),
  ],
  style: {position: 'bottom-right'},
  layout: null,
});
Map.add(controlPanel);