var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #23cba7 */
    /* shown: false */
    ee.Geometry.MultiPoint();
/////////////////////////////////////////
Map.setCenter(111, 16, 5);
var now = new Date();
var nowStr = now.toLocaleDateString('en-CA'); 
var dateNow = ee.Date(nowStr);
var d11 = dateNow.advance(-121, 'day').format("YYYY-MM-dd");
var d12 = dateNow.advance(-90, 'day').format("YYYY-MM-dd");
var d21 = dateNow.advance(-61, 'day').format("YYYY-MM-dd");
var d22 = dateNow.advance(-30, 'day').format("YYYY-MM-dd");
var d31 = dateNow.advance(0, 'day').format("YYYY-MM-dd");
//print(d11,d12,d21,d22,d31)
var udate11 = ui.DateSlider({
  start: ee.Date('2014-01-01'),
  end: ee.Date(d31),
  period: 1
  });
var udate12 = ui.DateSlider({
  start: ee.Date('2014-01-01'),
  end: ee.Date(d31),
  period: 1
  });
var udate21 = ui.DateSlider({
  start: ee.Date('2014-01-01'),
  end: ee.Date(d31),
  period: 1
  });
var udate22 = ui.DateSlider({
  start: ee.Date('2014-01-01'),
  end: ee.Date(d31),
  period: 1
  });
var AOI_4_totalimagecount = geometry;
////////////////////////////////////////
// var removeLayer = function(name) {
//   var layers = Map.layers()
//   // list of layers names
//   var names = []
//   layers.forEach(function(lay) {
//     var lay_name = lay.getName()
//     names.push(lay_name)
//   })
//   // get index
//   var index = names.indexOf(name)
//   if (index > -1) {
//     // if name in names
//     var layer = layers.get(index)
//     Map.remove(layer)
//   } else {
//     print('Layer '+name+' not found')
//   }
// }
 // Extract date from meta data
      function dates(imgcol){
        var range = imgcol.reduceColumns(ee.Reducer.minMax(), ["system:time_start"]);
        var printed = ee.String('from ')
          .cat(ee.Date(range.get('min')).format('YYYY-MM-dd'))
          .cat(' to ')
          .cat(ee.Date(range.get('max')).format('YYYY-MM-dd'));
        return printed;
      }
////////////////////////////////////////
var drawingTools = Map.drawingTools();
////////////////////////////////////////
drawingTools.setShown(true);
///////////////////////////////////////////
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
  }
//////////////////////////////////////////
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7', shown: false});
drawingTools.layers().add(dummyGeometry,{opacity: 0.1});
//////////////////////////////////////////
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
/////////////////////////////////////////////
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
//////////////////////////////////////////////////
// var chartPanel = ui.Panel({
//   style:
//       {height: '235px', width: '600px', position: 'bottom-right', shown: false}
// });
///////////////////////////////////////////////////
//Map.add(chartPanel);
var inspector = ui.Label('Link tải ảnh kết quả vùng trượt lở tại đây!');
var s2_truoc =  ui.Label('Link tải ảnh S2 trước TL tại đây!');
var s2_sau = ui.Label('Link tải ảnh S2 sau TL tại đây!');
// Map.add(inspector);
///////////////////////////////////////////////////
function chartNdviTimeSeries() {
  // // Make the chart panel visible the first time a geometry is drawn.
  // if (!chartPanel.style().get('shown')) {
  //   chartPanel.style().set('shown', true);
  // }
  // // Get the drawn geometry; it will define the reduction region.
  var AOI = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  // // Chart NDVI time series for the selected area of interest.
  // var chart = ui.Chart.image
  //                 .seriesByRegion({
  //                   imageCollection: ee.ImageCollection('MODIS/006/MOD13A2'),
  //                   regions: AOI,
  //                   reducer: ee.Reducer.mean(),
  //                   band: 'NDVI',
  //                   scale: scale,
  //                   xProperty: 'system:time_start'
  //                 })
  //                 .setOptions({
  //                   titlePostion: 'none',
  //                   legend: {position: 'none'},
  //                   hAxis: {title: 'Date'},
  //                   vAxis: {title: 'NDVI (x1e4)'},
  //                   series: {0: {color: '23cba7'}}
  //                 });
  // // Replace the existing chart in the chart panel with the new chart.
  // chartPanel.widgets().reset([chart]);
 Map.layers().reset();
 //Map.setOptions("HYBRID");
 //var submit = ui.Button('Nhấn vào đây để lấy dường link tải ảnh!');  
  /*
MIT License
Copyright (c) 2021 Mong-Han Huang and Alexander L. Handwerger
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
// #############################################################################
// ### Event info ###
// #############################################################################
/* 
/* 
* SAR-based landslide (and other ground surface) detection 
* Study Site: Quang Nam, Vietnam
* Event: high rainfall 28 October 2020
* Code written by Mong-Han Huang, Department of Geology, mhhuang@umd.edu
* and Alexander L. Handwerger, UCLA JIFRESSE/NASA JPL, alhandwerger@g.ucla.edu and alexander.handwerger@jpl.nasa.gov with help from many users on stackexchange!
*/   
// #############################################################################
// ### Set AOI ###
// #############################################################################
// var AOI Sub_AOI; // define Area of Interest
Map.setOptions("SATELLITE");
Map.centerObject(AOI, 13); //zooms to center of AOI after clicking "run". The number determines the zoom level.
// #############################################################################
// ### Define pre-event and post-event time periods ###
// #############################################################################
//**************** Define pre-event and post-event time periods ********************************//
//define pre-event stack time period
var PreEventTime_1 = udate11.getValue()[0]; // format: yyyy-mm-dd-HH:MM
var PreEventTime_2 = udate12.getValue()[0]; // format: yyyy-mm-dd-HH:MM
//define post-event stack time period
var PostEventTime_1 = udate21.getValue()[0]; // format: yyyy-mm-dd-HH:MM
var PostEventTime_2 = udate22.getValue()[0]; // format: yyyy-mm-dd-HH:MM
// var PostEventTime_S2longer = '2021-10-25T23:59'; // format: yyyy-mm-dd-HH:MM
var PostEventTime_S2longer = PostEventTime_2;
// #############################################################################
// ### slope and curvature thresholds ###
// #############################################################################
// DEM thresholds
var slope_threshold = 12;    // Exclude areas with hillslope angle < slope_threshold, unit: degree
var curv_threshold = -0.005; // Exclude areas with hillslope curvature > curv_threshold, unit: m/m^2 
// #############################################################################
// ### NASA DEM ###
// #############################################################################
// load NASA Digital Elevation Model (DEM)
var NASADEM_dataset = ee.Image('NASA/NASADEM_HGT/001');
var elevation = NASADEM_dataset.select('elevation');
elevation=elevation.clip(AOI); //clip to AOI
var waterZones = NASADEM_dataset.select('swb'); //load in water body data
var waterMask = waterZones.eq(0); // Create a binary water mask.
var exaggeration = 1; //changes the appearance of the hillshade
var hillshade = ee.Terrain.hillshade(elevation.multiply(exaggeration));
hillshade=hillshade.clip(AOI);
var slope = ee.Terrain.slope(elevation);          // slope angle in degrees
slope=slope.clip(AOI);
var mask_slope = slope.gte(slope_threshold);      // slope mask with values 0 or 1, removes values less than or equal to threshold
var slope_masked = slope.updateMask(mask_slope);  // slope angle with values < threshold excluded
// Calculate hillslope curvature
// Define a Gaussian kernel for smoothing. This step helps reduce noise in the curvature maps
var smooth_curv = ee.Kernel.gaussian({
  radius: 60,
  sigma: 30,
  units: 'meters',
  normalize: true,
});
// Smoothing the DEM with the gaussian kernel.
var elevation_smooth= elevation.convolve(smooth_curv).resample("bilinear");
var xyDemGrad = elevation_smooth.gradient().resample("bilinear");
var xGradient = xyDemGrad.select('x').gradient().resample("bilinear");
var yGradient = xyDemGrad.select('y').gradient().resample("bilinear");
var curvature = xGradient.select('x').add(yGradient.select('y'));
var mask_curvature = curvature.gte(curv_threshold);
var curvature_masked = curvature.updateMask(mask_curvature);
//var DEMMask= mask_slope.multiply(mask_curvature).multiply(waterMask); //slope, curvature, and water mask
// #############################################################################
// ### Sentinel-2 Optical Images ###
// #############################################################################
// cloud filter and mask for Sentinel-2 optical data
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
// Load Sentinel-2 reflectance data.
var S2_PreEvent = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate(PreEventTime_1,PreEventTime_2)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10)) //only include images with less than 10% clouds
                  .filterBounds(AOI)
                  .map(maskS2clouds);
var S2_PreEvent_median=S2_PreEvent.median();
S2_PreEvent_median=S2_PreEvent_median.clip(AOI);
var S2_PostEvent = ee.ImageCollection('COPERNICUS/S2')
                  .filterDate(PostEventTime_1, PostEventTime_S2longer)
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10)) //only include images with less than 10% 
                  .filterBounds(AOI)
                  .map(maskS2clouds); 
var S2_PostEvent_median = S2_PostEvent.median();
S2_PostEvent_median=S2_PostEvent_median.clip(AOI);
// #############################################################################
// ### Sentinel-1 SAR Images ###
// #############################################################################
// LOAD Sentinel-1 (S1) Backscatter Coefficient data VH polarization
var imgVH = ee.ImageCollection('COPERNICUS/S1_GRD')
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .select('VH') // VH polarization only
        .filterBounds(AOI)
        .map(function(image) {
          var edge = image.lt(-30.0); //remove low edge values as suggested by GEE
          var maskedImage = image.mask().and(edge.not());
          return image.updateMask(maskedImage);
        });
var desc = imgVH.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING')); //descending acquisition geometry data
var asc = imgVH.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));  //ascending acquisition geometry data
var PreEventPeriod = ee.Filter.date(PreEventTime_1,PreEventTime_2);
var PostEventPeriod = ee.Filter.date(PostEventTime_1,PostEventTime_2);
// calculate the median of the Pre-event S1 SAR Backscatter Intensity
var PreEventPeriod_asc = ee.Image.cat(asc.filter(PreEventPeriod).median());
var PreEventPeriod_desc = ee.Image.cat(desc.filter(PreEventPeriod).median());
// var listpreASC = asc.filter(PreEventPeriod).toList(asc.filter(PreEventPeriod).size()); 
// for (var i=0; i <=listpreASC.length(); i++)
// {
//   var image = ee.Image(listpreASC.get(i));
//   var label = ee.Date(image.get("system:time_start")).format('YYYY-MM-dd HH:mm:ss').getInfo();
//   Map.addLayer(image,{min:-25, max:5},label,true)
// }
// print(listpreASC.length());
// calculate the median of the Post-event S1 SAR Backscatter Intensity
var PostEventPeriod_asc = ee.Image.cat(asc.filter(PostEventPeriod).median());
var PostEventPeriod_desc = ee.Image.cat(desc.filter(PostEventPeriod).median());
// print out image information (number of images, image file name) 
//Note this counts two images acquired on the same day as two separate images, to avoid double counting create very small AOI called "AOI_4_totalimagecount"
var num_asc_pre = asc.filter(PreEventPeriod).filterBounds(AOI_4_totalimagecount);
var num_desc_pre = desc.filter(PreEventPeriod).filterBounds(AOI_4_totalimagecount);
var num_asc_post = asc.filter(PostEventPeriod).filterBounds(AOI_4_totalimagecount);
var num_desc_post = desc.filter(PostEventPeriod).filterBounds(AOI_4_totalimagecount);
var count_asc_pre = num_asc_pre.sort('system:time_start').toList(5000,0).length();   // 5000 controls size of the list
var count_desc_pre = num_desc_pre.sort('system:time_start').toList(5000,0).length(); // 
var count_asc_post = num_asc_post.sort('system:time_start').toList(5000,0).length(); // 
var count_desc_post = num_desc_post.sort('system:time_start').toList(5000,0).length(); // 
print("Number of pre-event ascending images: ", count_asc_pre  );
print("Number of pre-event descending images: ", count_desc_pre  );
print("Number of post-event ascending images: ", count_asc_post  );
print("Number of post-event descending images: ", count_desc_post  );
print(num_asc_post,'Post-event ascending');   //print out to check date of image collection
print(num_desc_post,'Post-event descending'); //print out to check date of image collection
// #############################################################################
// ### I_ratio ###
// #############################################################################
// calculate the log ratio (using subtraction since data are in log scale) for Pre- and Post-event S1 SAR Backscatter
var I_ratio_desc = PreEventPeriod_desc.subtract(PostEventPeriod_desc);
I_ratio_desc=I_ratio_desc.clip(AOI);
var I_ratio_asc = PreEventPeriod_asc.subtract(PostEventPeriod_asc);
I_ratio_asc=I_ratio_asc.clip(AOI);
var I_ratio_avg_desc_asc = (I_ratio_asc.add(I_ratio_desc)).divide(2); // calculate the mean backscatter change for ascending and descending scenes combined
// #############################################################################
// ### Define the I_ratio to be used for landslide detection. This can be "I_ratio_desc", "I_ratio_asc", or "I_ratio_avg_desc_asc". 
// ### We recommend using "I_ratio_avg_desc_asc" if both ascending and descending data exist. Otherwise use either "I_ratio_desc" or "I_ratio_asc" ###
// #############################################################################
//slope and water mask
//var I_ratio_avg_masked = I_ratio_avg_desc_asc.updateMask(mask_slope).updateMask(waterMask); 
//slope, curvature, and water mask
var I_ratio_avg_masked = I_ratio_avg_desc_asc.updateMask(mask_slope).updateMask(mask_curvature).updateMask(waterMask); 
// #############################################################################
// ### Calculate I_ratio statistics ###
// #############################################################################
// Calculate percentiles of I_ratio
var I_ratio_Percentiles = I_ratio_avg_masked.reduceRegion({
  reducer:ee.Reducer.percentile([90, 95, 99]),
  geometry: AOI,
  scale: 10,
  bestEffort: true
});
print('I_ratio Percentiles',I_ratio_Percentiles)
var I_ratio_90thPtile = I_ratio_avg_masked.gte(ee.Number(I_ratio_Percentiles.get("VH_p90")))
var I_ratio_95thPtile = I_ratio_avg_masked.gte(ee.Number(I_ratio_Percentiles.get("VH_p95")))
var I_ratio_99thPtile = I_ratio_avg_masked.gte(ee.Number(I_ratio_Percentiles.get("VH_p99")))
// #############################################################################
// ### Heatmap and threshold-based landslide detection ###
// #############################################################################
var backscatter_chng_threshold = ee.Number(I_ratio_Percentiles.get("VH_p99")); // backscatter change threshold. This determines the values that correspond to potential landslides. Used for heatmap, polygons, points, and raster of possible landslide locations
var backscatter_chng_threshold95 = ee.Number(I_ratio_Percentiles.get("VH_p95"));
var backscatter_chng_threshold90 = ee.Number(I_ratio_Percentiles.get("VH_p90"));
print('I_ratio threshold',I_ratio_Percentiles.get("VH_p99"))
//  identify possible landslide zones
var pos_slide_zones90 = I_ratio_avg_masked.gt(backscatter_chng_threshold90);
var pos_slide_zones95 = I_ratio_avg_masked.gt(backscatter_chng_threshold95);
var pos_slide_zones = I_ratio_avg_masked.gt(backscatter_chng_threshold);
pos_slide_zones = pos_slide_zones.updateMask(pos_slide_zones.neq(0));
// Convert the pos_slide_zones of the thresholded to vectors.
var pos_slide_polygons = pos_slide_zones.addBands(I_ratio_avg_masked).reduceToVectors({
  geometry: AOI,
  crs: I_ratio_avg_masked.projection(),
  scale: 10,
  bestEffort: true,
  geometryType: 'polygon',
  eightConnected: false,
  labelProperty: 'zone',
  reducer: ee.Reducer.mean()
});
// Convert from polygons to points
var S1_points =  imgVH;
var first = ee.Image(S1_points.first()).clip(pos_slide_polygons)
// get image projection
var proj = first.select([0]).projection()
// get coordinates image
var latlon = ee.Image.pixelLonLat().reproject(proj)
// put each lon lat in a list
var coords = latlon.select(['longitude', 'latitude'])
                .reduceRegion({
  reducer: ee.Reducer.toList(),
  geometry: pos_slide_polygons,
  scale: 10,
  bestEffort: true,
})
// // get lat & lon
var lat = ee.List(coords.get('latitude'))
var lon = ee.List(coords.get('longitude'))
// // zip them. 
var point_list = lon.zip(lat)
// // Create points
var mp = ee.Geometry.MultiPoint(point_list)
// //******************** Identify points for heatmap to be exported as a KML ***********************//
var mp2 = ee.FeatureCollection(point_list.map(function(p){
  var point = ee.Feature(ee.Geometry.Point(p), {})
  return point
}))
var points_heatmap = mp2.map(function(feature){
  return feature.set('dummy',1);
});
// #############################################################################
// ### Color Palettes for Maps ###
// #############################################################################
// define color palette ('ffffff' is white, 'ff0000' is red, '0000ff' is blue, '000000' is black)
var ColorScale = {min: -10, max: 10, palette: ['0013ff','8178ff','ffffff','ff7e7e','ff0000']}; // for Backscatter Intensity change (I_ratio)
var rgbVis = {min: 0.0, max: 0.3, bands: ['B4', 'B3', 'B2']}; // for sentinel-2
var rgbVis_wClouds = {min: 0.0, max: 2000, bands: ['B4', 'B3', 'B2']}; // for sentinel-2 with clouds
var ColorCurv = {min: -0.02, max:0.02, palette: ['ff0000','ffffff','0000ff']}; // for curvature 
var MaskColor = {min: 0, max:1, palette: ['ffffff','0050d6']}; // for curvature 
var percentileColor = {min: 0, max:1, palette: ['ffffff','c000d6']}; // for showing percentile  
// #############################################################################
// ### Add layers to maps ###
// #############################################################################
//DEM layers
// Map.addLayer(hillshade, null, 'NASADEM Hillshade', false);
//topo lines
// var lines = ee.List.sequence(0, 4000, 100)
// //var lines = ee.List.sequence(0, 4000, 200)
// var contourlines = lines.map(function(line) {
//   var mycontour = elevation
//     .convolve(ee.Kernel.gaussian(5, 3))
//     .subtract(ee.Image.constant(line)).zeroCrossing() 
//     .multiply(ee.Image.constant(line)).toFloat();
//   return mycontour.mask(mycontour);
// })
// contourlines = ee.ImageCollection(contourlines).mosaic()
// Map.addLayer(contourlines, {min: 0, max: 1000, palette:['000000', '000000']}, 'topo lines', false, 0.5)
//Sentinel-2 optical images
Map.addLayer(S2_PreEvent_median, rgbVis , 'ảnh vệ tinh sentinel-2 trước khi trượt lở',true);
Map.addLayer(S2_PostEvent_median, rgbVis, 'ảnh vệ tinh sentinel-2 sau khi trượt lở',true);
//Possible landslide areas defined based on backscatter change threshold
Map.addLayer(pos_slide_zones.clip(AOI), {min: 0, max: 1, palette: ['ffffff','FF0000']}, 'vùng có nguy cơ trượt lở',true);
//Map.addLayer(I_ratio_avg_masked, ColorScale, 'I_ratio masked', false);
//Map.addLayer(I_ratio_90thPtile, percentileColor, 'I_ratio >= 90th percentile', false);
//Map.addLayer(I_ratio_95thPtile, percentileColor, 'I_ratio >= 95th percentile', false);
//Map.addLayer(I_ratio_99thPtile, percentileColor, 'I_ratio >= 99th percentile', false, 0.75);
// #############################################################################
// ### Generate heatmap visualization in GEE ###
// #############################################################################
//NOTE This often causes GEE to timeout. Until we can optimize the code, we leave this commented out and perform the heatmap calculation in QGIS ***********************//
var radius_heatmap2 = 15;         // heatmap kernal radius
function heatmap(mp2,radius_heatmap){
  var ptImg = points_heatmap.reduceToImage(['dummy'],ee.Reducer.first()).unmask(0);
  var kernel = ee.Kernel.circle(radius_heatmap);
  var result = ptImg.convolve(kernel);
  return result.clip(AOI); //clip to AOI
  //return result.updateMask(result.neq(0)); //uncomment this if want to remove green area
}
var heatmapImg = heatmap(points_heatmap,radius_heatmap2); 
var gradientcolormap = ['lightgreen','yellow','red']; //heatmap gradient
var heatmapColor = {
  min: 0,
  max: .2,
  palette: gradientcolormap,
};
//heatmap
Map.addLayer(heatmapImg,heatmapColor,'Heatmap',false,1);
// #############################################################################
// ### save data for export ###
// #############################################################################
// Export.image.toDrive({
//   image: S2_PostEvent_median,
//   description: 'QuangNam_S2_PostEvent',
//   scale: 10,
//   fileFormat: 'GeoTIFF',
//   region: AOI
// });
// Export.image.toDrive({
//   image: S2_PreEvent_median,
//   description: 'QuangNam_S2_PreEvent',
//   scale: 10,
//   fileFormat: 'GeoTIFF',
//   region: AOI
// });
// Export.image.toDrive({
//   image: I_ratio_99thPtile,
//   description: 'QuangNam_I_ratio>=99thPtile',
//   scale: 10,
//   fileFormat: 'GeoTIFF',
//   region: AOI
// });
// Export.image.toDrive({
//   image: I_ratio_avg_masked,
//   description: 'QuangNam_I_ratio_masked',
//   scale: 10,
//   fileFormat: 'GeoTIFF',
//   region: AOI
// });
// Export.table.toDrive({
//   collection: points_heatmap,
//   description:'QuangNam_Points4Heatmap',
//   fileFormat: 'KML'
// });
// Map.add(submit);
// Map.add(inspector);
// var lbdl = ui.Label('Tải ảnh vùng nguy cơ trượt lở',{},pos_slide_zones.getDownloadURL({
//     name: 'NCTL',
//     scale: 10,
//     region: AOI
// })
// );
 //Map.layers().reset();
//Map.add(lbdl);  
// submit.onClick(function() {
//   // Show the loading label.
//   //inspector.widgets().set(0, lbdl);
// Map.add(lbdl);
// });
PreEventPeriod_asc = PreEventPeriod_asc.clip(AOI);
PreEventPeriod_desc = PreEventPeriod_desc.clip(AOI);
PostEventPeriod_asc = PostEventPeriod_asc.clip(AOI);
PostEventPeriod_desc = PostEventPeriod_desc.clip(AOI);
pos_slide_zones = pos_slide_zones.addBands([pos_slide_zones95,pos_slide_zones90,PreEventPeriod_asc,PreEventPeriod_desc,PostEventPeriod_asc,PostEventPeriod_desc]);
pos_slide_zones = pos_slide_zones.rename('dtlo99','dtlo95','dtlo90','asc_pre', 'desc_pre', 'asc_pos','desc_pos'); 
inspector.setUrl(pos_slide_zones.getDownloadURL({
    name: 'NCTL',
    scale: 10,
    region: AOI
}));
s2_truoc.setUrl(S2_PreEvent_median.getDownloadURL({
    name: 'S2_truoc',
    scale: 10,
    region: AOI
}));
s2_sau.setUrl(S2_PostEvent_median.getDownloadURL({
    name: 'S2_sau',
    scale: 10,
    region: AOI
}));
//var s1_truoclst =  ui.Label('');
//var s1_saulst =  ui.Label('');
var dates1 = ee.List(S2_PreEvent
    .aggregate_array("system:time_start"))
    .map(function(d) { return ee.Date(d)});
var dates2 = ee.List(S2_PostEvent
    .aggregate_array("system:time_start"))
    .map(function(d) { return ee.Date(d)});    
// s1_truoclst.setValue(dates1);
// s1_saulst.setValue(dates2);
print(dates1)
Map.add(inspector);
Map.add(s2_truoc);
Map.add(s2_sau);
//Map.add(s1_truoclst);
//Map.add(s1_saulst);
//end function  
}
/////////////////////////////////////////////////
drawingTools.onDraw(ui.util.debounce(chartNdviTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartNdviTimeSeries, 500));
////////////////////////////////////////////////
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
////////////////////////////////////////////////
var controlPanel = ui.Panel({
  widgets: [
    ui.Label({value:'CHỌN CÁC THÔNG SỐ ĐỂ XÁC ĐỊNH VỊ TRÍ NGUY CƠ TRƯỢT LỞ',style: {fontWeight: 'bold', fontSize: '16px', color: '484848'}}),
    ui.Label({value:'Bước 1. Chọn thời điểm 1 trước khi xảy ra trượt lở:',style: {fontWeight: 'bold', textDecoration: 'underline'}}),
    udate11,
    ui.Label({value:'Bước 2. Chọn thời điểm 2 trước khi xảy ra trượt lở:',style: {fontWeight: 'bold', textDecoration: 'underline'}}),
    udate12,
    ui.Label({value:'Bước 3. Chọn thời điểm 1 sau khi xảy ra trượt lở:',style: {fontWeight: 'bold', textDecoration: 'underline'}}),
    udate21,
    ui.Label({value:'Bước 4. Chọn thời điểm 2 sau khi xảy ra trượt lở:',style: {fontWeight: 'bold', textDecoration: 'underline'}}),
    udate22,
    ui.Label({value:'Bước 5. Chọn vùng:',style: {fontWeight: 'bold', textDecoration: 'underline'}}),
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    // ui.Button({
    //   label: symbol.polygon + ' Polygon',
    //   onClick: drawPolygon,
    //   style: {stretch: 'horizontal'}
    // }),
    // ui.Button({
    //   label: symbol.point + ' Point',
    //   onClick: drawPoint,
    //   style: {stretch: 'horizontal'}
    // }),
    ui.Label('(Lưu ý: tạo vùng có diện tích NHỎ để xác định vùng trượt lở.'),
    ui.Label(' Có thể mất một ít thời gian đợi kết quả sau khi tạo vùng)'),
    // ui.Label(
    //     '4. Repeat 1-3 or edit/move\ngeometry for a new chart.',
    //     {whiteSpace: 'pre'})
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
//////////////////////////////////////////////
//controlPanel.add(ui.Panel([udate11,udate12,udate21,udate22]));
Map.add(controlPanel);