///////////////////////////////////////////////////////////////////////////
//// --------------------    GEOMETRY USED    ----------------------------
/// Point for filterbound image collection
var roi = ee.Geometry.Point([92.1339935642684,21.19472665398992]);
//Map.addLayer(roi,{}, 'Roi', false);
// Center the display to ROI.
Map.centerObject(roi, 13);
// Cox's Bazar boundary
var cox = ee.FeatureCollection('ft:1ORKSfOTOGJTM7n6evaAyVJALbPCTr8Arj0Rj6ALP');
// Ukhia and Teknaf boundary
var roi3 = ee.FeatureCollection('ft:1qmko1-eqaw1JcJT7_KvG8C2ZbcvdhzQrfWhKSHPB');
roi3 = roi3.geometry().bounds(); // Clips image collectiion
// Boundary of refugee camps in Ukhia
var camp_ukhia = ee.FeatureCollection('ft:1Iiya1wATRbHr93iH4Iu79DbUYECIW9biy9gmvn1L'); 
//Map.addLayer(camp_ukhia, {}, 'Ukhia camps')
// Boundary of initil Kutupalong camp
var kutupalong = ee.FeatureCollection('ft:1LdR8oUmS9RxtPzJuNhjpUCiGMElyZHDnD5BU6iUP');
// Extent to display animation and video for camps in Ukhia (Kutupalong)
var bound = ee.Geometry.Rectangle(
  [92.09725802960043,21.150546337355077,92.17240880511417, 21.226027640387617]); // Clip to roi in video export
////// ---------------------------------------------------------------------\\\\\\
// -----------------     ADD BOUNDARY LINES TO DISPLAY     -----------------
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint boundary polygon edges and display.
var outLn_bound = empty.paint({
    featureCollection: bound,
    color: 0,
    width: 1 
    });
Map.addLayer(outLn_bound, {palette: 'red'}, 'Boundary of animation');
// Paint Kutupalong camp (bofore Aug-2017) edges and display.
var outLn_kutu = empty.paint({
  featureCollection: kutupalong,
  color: 0,
  width: 2 
});
Map.addLayer(outLn_kutu, {palette: 'red'}, 'Kutupalong');
//// Paint bound polygon edges with the same number and width, display.
var outLn_camp = empty.paint({
  featureCollection: camp_ukhia,
  color: 0,
  width: 1 
});
Map.addLayer(outLn_camp, {palette: 'black'}, 'Camps: Ukhia');
////////////////////////////////////////////////////////////////////
//// ------------   VARIABLES   ----------------------------------
////---------------Sets observation period ------------------------
// annotations - used for annotating time stamp to videos and animations
var annotations = [{
    position: 'left', 
    offset: '5%', 
    margin: '5%', 
    property: 'label', 
    scale: Map.getScale() * 2
  }];
// package text - to add text on video and animations
var text = require('users/gena/packages:text');
// Package animation - to add animation in display
var animation = require('users/gena/packages:animation');
// Package Tools - to remove layer
var tools = require('users/fitoprincipe/geetools:tools');
// Package cloud mask - to mask out shadows
var cld = require('users/fitoprincipe/geetools:cloud_masks');
// Package bacth - to export image collectiont o asset
//var batch = require('users/fitoprincipe/geetools:batch');
// Function to create mask
var computeQAbits = function(image, start, end, newName) {
    var pattern = 0;
    for (var i=start; i<=end; i++) {
        pattern += Math.pow(2, i);
    }
    return image.select([0], [newName]).bitwiseAnd(pattern).rightShift(start);
};
// Function to apply the masks to image collection using map function
var sentinel2 = function(image) {
  var cloud_mask = image.select("QA60");
  var opaque = computeQAbits(cloud_mask, 10, 10, "opaque");
  var cirrus = computeQAbits(cloud_mask, 11, 11, "cirrus");
  var mask = opaque.or(cirrus);
  var mask_shadow = cld.hollstein_S2(['shadow'])(image)
  return mask_shadow.updateMask(mask.not());
        //image.updateMask(mask.not());
  };
// Gets the current time.  
var eeNow = ee.Date(Date.now());
// SET OBSERVATION PERIOD
var startDate = '2016-02-15';
var endDate = eeNow;
// // Textbox to get user input of latest year
// var endYear = ui.Textbox({
//   placeholder: 'Enter ending year here...',
//   onChange: function(text) {
//     var input = ee.Number(text);
//     return input;
//   }
// });
// Map.add(endYear);
//// --------------- List to sort organise images in month-year fashion --------
// List of years and months
var years = ee.List
  .sequence(2016, ee.Number.parse(eeNow.format('Y'))); // Gets latest year 
              // from eeNow as string then converts string to a number
var months = ee.List.sequence(1, 12);
//// --------- Access Sentinel-2 images for observation period ----------------
// Gets image collection of Observation Period
var series = ee.ImageCollection('COPERNICUS/S2').filterDate(startDate, endDate)
              .filterBounds(roi)
              .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10));
// Application of cloud mask to the image collection
series = series.map(sentinel2);
///////////////////////////////////////////////////////////////////////
// ------------------    FUNCTIONS USED   ---------------------
//// ------------- Function for NDVI  -----------------------------------
// Function to get NDVI.
var getNDVI = function(image){
    var NDVI = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
    //var clouds = image.select('QA60').gte(1024).unmask().not().rename('CloudMask')
    //var clouds = image.select('QA60').gte(1).unmask().not().rename('CloudMask') // New code by david that works better than previous line to mask clouds
  return image.addBands(NDVI); //.mask(clouds)
  };
// Calculates NDVI for image collection.
var series_ndvi = series.map(getNDVI)
               .select([ 'B8','B4', 'B3', 'B2', 'NDVI']); // Select 
//// ------------- Function to sort image collections in MM-YY order---------
// Filters images annualy-monthly using series image collection
//          returns list of images as list in [month[year]] format
var map_m = function(i) {
  i = ee.Number(i);
  var filtered_col = months.map(function(j) {
    var filtered = series_ndvi
        .filter(ee.Filter.calendarRange(j, j, 'month'))
        .filter(ee.Filter.calendarRange(i, i, 'year'));
    var mean = filtered.reduce(ee.Reducer.mean());
    var median=filtered.reduce(ee.Reducer.median());
    var max =filtered.reduce(ee.Reducer.max());
    var time = ee.Date.fromYMD(i,j,1);
    var custom_time = ee.Number.parse(time.format('YYYYMMDD'));
    return mean.set('system:time_start', time.millis())
            .set('custom:time_start', custom_time)
            .addBands(median)
            .addBands(max)
            .addBands(ee.Image(custom_time).rename('time')) // Adds a band with time value
            .clip(roi3); // Clip to Ukhia and Teknaf boundary
  });
  return filtered_col;
};
//////////////////////////////////////////////////////////////////////
// -------------------------  PROCESS  -----------------------------
// Flattens the list and returns list with images as elements
var img_col = ee.ImageCollection(years.map(map_m).flatten());
print(img_col,'image collection');  // Print how many images are in the list - some images are null
// Removing null images - https://www.linkedin.com/pulse/time-series-landsat-data-google-earth-engine-andrew-cutts/
var nullimages = img_col
    .map(function(image) {
      return image.set('count', image.bandNames().length());
    })
    .filter(ee.Filter.gt('count', 1));
print('final images: ', nullimages);
//Map.addLayer(nullimages.first(), {}, 'null first')
////////////////////////////////////////////////////////////////
// ---------     PREPARATION FOR DISPLAY    --------------------
//// ------------------------------------------------------------
//// -------------    FASLE COLOUR MAP    ----------------------
// Set up a variable to display false colour maps
var fls_median = nullimages.select(['B8_median', 'B4_median', 'B3_median']);
print(fls_median.first().bandNames());
var fls_viz = fls_median.map(function(image){
  var start = ee.Date(image.get('system:time_start'));
  var label = start.format('YYYY-MM');
   return image.select(['B8_median', 'B4_median', 'B3_median']).visualize({
     min: 100, max: 3000,
     forceRgbOutput: true
   })
   .clip(bound)
   .set({label:label});
 });
//Map.addLayer(fls_viz.first(), {}, 'first')
// Adds time stamp on false colout images
var fls_viz_anot = fls_viz.map(function(image) {
  return text.annotateImage(image, {}, bound, annotations);
}); 
// // Exports video: false colour time lapse video
// Export.video.toDrive({
//   collection: fls_viz_anot,
//   description: "FalseColorTimeLapse",    // Filename, no spaces allowed
//   framesPerSecond: 1,             
//   dimensions: 1080,
//   region: bound
//   });
// -------------- Add animation to the display ------------------ 
// Contains max frame numbers
var max_frames_fls = fls_viz_anot.size();  
print(max_frames_fls);
// Adds animation of False Color on display map
//animation.animate(fls_viz_anot, {maxFrames: max_frames_fls});
//// ------------   NDVI    -----------------------------------
// Sets up a new variable to use the list of NDVI 
var ndvi = nullimages; //.select('NDVI_max');
// Function to set palletes for NDVI to image collection
var setPalletes = function(image){
  var img = image.select('NDVI_max');
  var time = image.get('system:time_start');
  var image02 = img.gte(0.2);
  var image04 = img.gte(0.4);
  var image06 = img.gte(0.6);
  var image08 = img.gte(0.8);
  return image02.add(image04).add(image06).add(image08)
    .addBands(image.select('time'))
    .set('system:time_start', time);
};
// Apply setPalletes function to the image collection
var newImages = ndvi.map(setPalletes);
//Add first image of NDVI
//Map.addLayer(ndvi.first(), {bands: ['NDVI_max'], min:0.2, max: 1, palette: ['red', 'orange', 'yellow', 'green']}, 'first');
//var seriesBins = series.first().gt(0.2).add(series.first().gt(0.3)).add(series.first().gt(0.4)).add(series.first().gt(0.5))
//////////////////////////////////////////////////////////////////////
// ------------- EXPORT NDVI VIDEO TO DRIVE  -----------------------
//make the data 8-bit which is necessary for making a video - add visualisation
var ndvi_viz =  newImages.map(function(image){
  var start = ee.Date(image.get('system:time_start'));
  var label = start.format('YYYY-MM'); // Sets time stamp in year-month format
  return image.select('NDVI_max').visualize({
    forceRgbOutput: true,
    palette: ['black', 'red', 'yellow', '#9acd32','green'],
    min: 0,
    max: 4
  }).clip(bound).set({label: label});
});
// Add annotated text on NDVI images
var ndvi_viz_anot = ndvi_viz.map(function(image) {
  return text.annotateImage(image, {}, bound, annotations);
});
////// -----------------------------------------------------
// -----------------  Export Video of NDVI ---------------
// //Export NDVI from whole study area to video
// Export.video.toDrive({
//   collection: ndvi_viz_anot,
//   description: "NDVItimelapse",    // Filename, no spaces allowed
//   framesPerSecond: 1,             
//   dimensions: 1080,
//   region: bound
//   });
// -------------- ADD ANIMATION TO DISPLAY ------------------ 
// Gets maximum frame numbers
var max_frames = ndvi_viz.size();
// Adds animation of NDVI on display map
//animation.animate(ndvi_viz_anot, {maxFrames: max_frames})
//////////////////////////////////////////////////////////////////////////
// ---------------   MAX MONTHLY NDVI   ----------------------------------
// THis is to calculate the maximum drop in NDVI and the month in which that drop occurs. 
// //#############################################
// // FUNCTION TO GET 2-Month MOVING AVERAGE.
// //#############################################
var myList = ndvi.toList(ndvi.size());
  var myFunction = function(i){
        var aaa = ee.Number(i).add(1);
        var bbb = ee.Image(myList.get(aaa)).unmask(); // next image in collection
        var ccc = ee.Image(myList.get(i)).unmask();
        var mean = bbb.select('NDVI_max').add(ccc.select('NDVI_max')).divide(2);
        bbb = bbb.where(bbb.eq(0), ee.Image(mean)); //(myList.get(0)));
        ccc = ccc.where(ccc.eq(0), ee.Image(mean)); //(myList.get(0)))
        // Calculate average of this image and next image in collection
        var avg = bbb.select('NDVI_max').add(ccc.select('NDVI_max'))
                        .divide(2).rename('NDVI_max2Avg');
        // Add Moving average band 
      return ee.Image(myList.get(i)).addBands(ee.Image(avg));
      };
  var listSequence = ee.List.sequence(0,myList.size().subtract(2));
  var myListAverage = ee.ImageCollection(listSequence.map(myFunction));  // AS IMAGE COLLECTION
  print(myListAverage,'My List of Images w/ Averages');
  var myList1 = ee.List(myListAverage.toList(myListAverage.size()));  // AS LIST
  print(myList1, 'MyList 1');
var endNDVI = myListAverage.sort('system:time_start',false).limit(3).select('NDVI_max2Avg').mean();
//Map.addLayer(endNDVI,{},'Average NDVI of Last 3 Images');
//------------ ADD TO DISPLAY  ---------------------
// Function to set palletes for NDVI to image collection
var setPalletes_avgNDVI = function(image){
  var img = image.select('NDVI_max2Avg');
  var time = image.get('system:time_start');
  var image02 = img.gte(0.2);
  var image04 = img.gte(0.4);
  var image06 = img.gte(0.6);
  var image08 = img.gte(0.8);
  return image02.add(image04).add(image06).add(image08)
    .addBands(image.select('time'))
    .set('system:time_start', time);
};
// Apply palettes to average NDVI of two months window
var avgNDVI = myListAverage.map(setPalletes_avgNDVI);
print(avgNDVI, 'avg ndvi set palletes');
//make the data 8-bit which is necessary for making a video - add visualisation
var avgNDVI_viz =  avgNDVI.map(function(image){
  var start = ee.Date(image.get('system:time_start'));
  var label = start.format('YYYY-MM'); // Sets time stamp in year-month format
  return image.select('NDVI_max2Avg').visualize({
    forceRgbOutput: true,
    palette: ['black', 'red', 'yellow', '#9acd32','green'],
    min: 0,
    max: 4
  }).clip(bound).set({label: label}).set('system:time_start',image.get('system:time_start'));
});
//var avgNDVI_viz = avgNDVI_viz.merge(avgNDVI_viz).merge(avgNDVI_viz).merge(avgNDVI_viz).sort('system:time_start')
// Add annotated text on NDVI images
var avgNDVI_viz_anot = avgNDVI_viz.map(function(image) {
  return text.annotateImage(image, {}, bound, annotations);
});
// Exports image collection to asses
//batch.Download.ImageCollection.toDrive(col, "Folder", {scale:30});
// -------------- ADD ANIMATION TO DISPLAY ------------------ 
// Gets maximum frame numbers
var avgNDVI_max_frames = avgNDVI_viz.size();
// Adds animation of NDVI on display map
//animation.animate(avgNDVI_viz_anot, {maxFrames: avgNDVI_max_frames});
//// -----------------------------------------------------
//-----------------  Export Video of NDVI avg ---------------
//Export NDVI from whole study area to video
// Export.video.toDrive({
//   collection: avgNDVI_viz_anot,
//   description: "NDVItimelapse",    // Filename, no spaces allowed
//   framesPerSecond: 1,             
//   dimensions: 1080,
//   region: bound
//   });
//=============================================================================================================
// FUNCTION TO GET DERIVATIVE (Change Between Months).
//=============================================================================================================
// var myList1 = ndvi.toList(ndvi.size())
var myFunction = function(i){
        var aaa = ee.Number(i).add(1);
        var bbb = ee.Image(myList1.get(aaa)); // Next image in the collection
        var ccc = ee.Image(myList1.get(i));
        var avg = bbb.select('NDVI_max2Avg').subtract(ccc.select('NDVI_max2Avg'))
                  .divide(ee.Number(bbb.get('system:time_start')).subtract(ee.Number(ccc.get('system:time_start'))))
                  .multiply(30)
                  .rename('NDVI_derivative'); // NDVI difference of two consequtive months
        var time2 = ee.Image(ee.Number(bbb.get('system:time_start'))).rename('newTime');
      return  ee.Image(myList1.get(i)).addBands(ee.Image(avg)).addBands(time2);
  };
  ///////////////////////////////
  var listSequence = ee.List.sequence(0,myListAverage.size().subtract(2)); // Lists index numbers of average NDVI images
  var myListDeriv = ee.ImageCollection(listSequence.map(myFunction)); // AS IMAGE COLLECTION
  // Map.addLayer(myListDeriv,{},'myListDeriv')
  print(myListDeriv,'My List of Images w/ Derivative'); 
  var myList2 = ee.List(myListDeriv.toList(myListDeriv.size())); // AS LIST
  print(myList2, 'MyList 2'); 
//----------------------------------------------------------------------
// ---------------    CALCULATE ANOMATY HERE    ------------------------
////////////////////////////////////////////////////////////////////
// ------------------------    ANOMALY    -------------------------
// SET REFERENCE PERIOD
var refererenceStartDate = '2015-07-01';
var referenceEndDate = '2016-02-15';
var sentinelReference = ee.ImageCollection('COPERNICUS/S2')
                      .filterDate(refererenceStartDate,referenceEndDate)
                      .map(getNDVI)
                      .sort('system:time_start', false);
var sentinelRefMedian = sentinelReference.median()
                      .clip(roi3);
//Map.addLayer(sentinelRefMedian.select('NDVI'),{min:-1,max:1},"Sentinel Reference");
// CALCULATE ANOMALY              
var seriesAnomaly = myListAverage
                    .map(function(image) {
                      var threshold = sentinelRefMedian.select('NDVI').gt(0.4);
                      return image.select('NDVI_max2Avg').subtract(sentinelRefMedian.select('NDVI')).updateMask(threshold)
                                .set('system:time_start', image.get('system:time_start'))
                                // .set('Date',image.get('system:time_start').toDate())
                                .clip(roi);
                      });
print(seriesAnomaly,'seriesAnomaly');
//  ANOMALY MEAN
  var numimages = ee.Image(seriesAnomaly.select('NDVI_max2Avg').count());
  var anomoly = seriesAnomaly.sum();
  // Divide the sum by the number of images to correct for number of images in collection
  var anomolyMean = anomoly.divide(numimages);
  print(anomolyMean, 'anomoly mean');
  //Map.addLayer(anomolyMean.select('NDVI_max2Avg'), {}, 'anomoly mean');
//---------------------------------------------------------------------------
// ----------------    GETS MAX LOST (DEFORESTATION) OVER TIME   ------------
// Reverse the collection
var ndvi_rev = myListDeriv.map(function(image){
  var ndvi_max = image.select('NDVI_derivative').float().multiply(-1);
  var time = image.select('time').int();
  var newTime = ee.Image(ee.Number(image.get('system:time_start'))).long().rename('newTime')
  // var newTime = image.select('newTime').int();
  // var aaa = image.get('system:index')
  // var index = ee.Image(ee.Number(aaa)).int().rename('index')
  return ndvi_max.addBands(time)
    .addBands(newTime); //.addBands(index)
  });
print(ndvi_rev, 'reverse');
// Quality Mosaic based on max NDVI derivative
// With the 2-band image, you are selecting the mosaic to be composed of the largest drop in NDVI
// and the corresponding time
// masking with areas that have an NDVI less than a threshold (I used 0.5)
// but this should probably only occur in areas that have been detected with change
var ndvi_revTimeMax = ndvi_rev.qualityMosaic('NDVI_derivative')
                  .updateMask(endNDVI.lt(0.5))//(anomolyMean.lt(0.5))//(endNDVI.lt(0.5)) // Run qualityMosaic on pixels that are lt ndvi 0.5 in recent 3 images
                  // Replace this mask with anomaly threshlond.
                  .clip(bound);
print(ndvi_revTimeMax, 'time Max');
// ndvi_revTimeMax = ndvi_revTimeMax.mask(ndvi_revTimeMax.select('NDVI_max').gt(0));
// ndvi_revTimeMax = ndvi_revTimeMax.select('time')
//print(ndvi_revTimeMax, 'time');
// Map.addLayer(ndvi_revTimeMax.select('time').randomVisualizer(),{},'Date of NDVI drop ~ Forest Loss');
//Map.addLayer(ndvi_revTimeMax.select('newTime'),{palette: ['red', 'green']},'Date of NDVI drop ~ Forest Loss');
// // MAKE LIST OF UNIQUE VALUES FOR BAND TIME - Work on it later (idea: to get area of 
          // //indivisual image from the image Collection of Loss.)
// var dateList = ee.List([,,,,])
// var areaLossByDate = dateList.map(function(i){
//   return ndvi_revTimeMax.select('time').eq(i).selfMask()
// })
///////////////////////////////////////////////////////////////////////////////
//-------------------   CREATE USER INTERFACE     --------------------------------
//// --------------------------------------------------------------------------
// --- Create panel to display lat-long of mouse clicks and charts at that point----
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
// Create an intro panel with labels.
var intro = ui.Panel(
  [ui.Label({
    value: 'Chart Inspector for NDVI',
    style: {fontSize: '18px', fontWeight: 'bold'}
    }),
  ui.Label('Click a point on the map to inspect.')]
  );
panel.add(intro);
// Titles of charts
// var title = {
//   title: 'NDVI over time',
//   hAxis: {title: 'Time'},
//   vAxis: {title: 'NDVI'},
//   };
// panels to hold lon/lat values
var lon = ui.Label();
var lat = ui.Label();
panel.add(ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal')));
// Register a callback on the default map to be invoked when the map is clicked
Map.onClick(function(coords) {
  // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF00FF'});
  Map.layers().set(1, dot);
  // // Create NDVI chart.
  // var ndviChart = ui.Chart.image.series(ndvi.select(
  //   ['NDVI_max']),//,'NDVI_median',  'NDVI_mean']),
  //   point, ee.Reducer.mean(), 30, 'system:time_start');
  // ndviChart.setOptions(title);
  // panel.widgets().set(1, ndviChart);
});
Map.style().set('cursor', 'crosshair');
// Add the panel to the ui.root.
ui.root.insert(0, panel);
// var title = {
//   title: 'NDVI anomaly over time',
//   hAxis: {title: 'Time'},
//   vAxis: {title: 'NDVI'},
// };
// print(ui.Chart.image.series(ndvi.select(['NDVI_median', 'NDVI_max', 'NDVI_mean']),
//   geometry,
//   ee.Reducer.max(), 
//   30,
//   'system:time_start')
//       .setOptions(title));
////-------------    ADD LEGENDS    -----------------------------------------
// Set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '7px 10px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Vegetation map based on NDVI values',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    color: '264d08'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          border: '1px solid black',
          // Use padding to give the box height and width.
          padding: '6px',
          margin: '0 0 4px 0'
        }
      });
      // Create a label with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px',
        fontSize: '12.5px'
        }
      });
      // Return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['ffffff00','black', 'red', 'yellow', '#9acd32','green'];
// Name of each legend value
var names = ['Clouds', 
            'NDVI: below 0.2', 
            'NDVI: 0.2 - 0.4', 
            'NDVI: 0.4 - 0.6', 
            'NDVI: 0.6 - 0.8', 
            'NDVI: o.8 - 1.0'];
// Add color and and names to legend
for (var i = 0; i < 6; i++) {     // For loop in cliend side process
  legend.add(makeRow(palette[i], names[i])); 
  }  
//Map.add(legend);
//////////////////////////////////////////////////////////////////////////
// ---------------   MAX MONTHLY NDVI   --------------------------------------
// // Reverse the collection
// var ndvi_rev = ndvi.map(function(image){
//   var ndvi_max = image.select('NDVI_max').multiply(-1);
//   var time = image.select('time')
//   return ndvi_max.addBands(time)
// })
// //print(ndvi_rev, 'reverse');
// // Quality Mosaic based on max derivative
// var ndvi_revTimeMax = ndvi_rev.qualityMosaic('NDVI_max')
// //print(ndvi_revTimeMax, 'time Max')
// ndvi_revTimeMax = ndvi_revTimeMax.mask(ndvi_revTimeMax.select('NDVI_max').gt(0));
// ndvi_revTimeMax = ndvi_revTimeMax.select('time')
// print(ndvi_revTimeMax, 'time')
//////////////////////////////////////////////////////////////////
// ------------------    GET OLDEST & NEWEST Image   --------------
// Gets oldest image by selecting the first image of the collection. 
var oldest = ndvi.first();
print(oldest, 'Oldest');
// Gets the image collection that contains only latest image.
var recent = ee.Image(ndvi.sort('system:time_start', false).limit(1).first());
print(recent, 'Recent');
// Creates an image collection by merging the two.
var old_new = ee.ImageCollection([oldest, recent]);//.merge(recent);
print(old_new, 'OLD & NEW');
// Calculating area of oldest image
var old_area = oldest.select('NDVI_max')
        .updateMask(oldest.select('NDVI_max')
        .lt(0.2))
        // oldest.select('NDVI_max').lt(0.2).selfMask()
        .rename('loss_old');//.ee.Image(pixelArea())
//Map.addLayer(old_area,{}, 'old area');
old_area = old_area.multiply(ee.Image.pixelArea());
// Sum the values of loss pixels.
var stats_old = old_area.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: bound,
  scale: 30,
  maxPixels: 1e9
});
// Calculating area of oldest image
var recent_area = recent.select('NDVI_max')
        .updateMask(recent.select('NDVI_max')
        .lt(0.2))
        .rename('loss_recent')
        .multiply(ee.Image.pixelArea());//.ee.Image(pixelArea())
//old_area = old_area.multiply(ee.Image.pixelArea());
// Sum the values of loss pixels in Congo.
var stats_recent = recent_area.reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: bound,
  scale: 30,
  maxPixels: 1e9
});
print('Non-forest in oldest image: ', ee.Number(stats_old.get('loss_old')).round(),
  'square meters & in recent image', ee.Number(stats_recent.get('loss_recent')).round(), 'square meters');
// Apply the palette to the image collection
old_new = old_new.map(setPalletes);
// Apply visualize to the image collection
var oldNew_viz =  old_new.map(function(image){
  var start = ee.Date(image.get('system:time_start'));
  var label = start.format('YYYY-MM'); // Sets time stamp in year-month format
  return image.select('NDVI_max').visualize({
    forceRgbOutput: true,
    palette: ['black', 'red', 'yellow', '#9acd32','green'],
    min: 0,
    max: 4
  }).clip(bound).set({label: label});
});
// Add annotated text on NDVI images
var oldNew_viz_anot = oldNew_viz.map(function(image) {
  return text.annotateImage(image, {}, bound, annotations);
});
// -------------- ADD ANIMATION TO DISPLAY ------------------ 
// Adds animation of NDVI on display map
//animation.animate(oldNew_viz_anot, {maxFrames: 2})
////////////////////////////////////////////////////////////////////////////////
// ---------------------     CHECKBOXES    ---------------------------------
// Remove Layer
var removeLayer = function(name) {
  var layers = Map.layers()
  // list of layers names
  var names = []
  layers.forEach(function(lay) {
    var lay_name = lay.getName()
    names.push(lay_name)
  })
  // get index
  var index = names.indexOf(name)
  if (index > -1) {
    // if name in names
    var layer = layers.get(index)
    Map.remove(layer)
  } else {
    print('Layer '+name+' not found')
  }
}
// Set position of panel
var chkBox = ui.Panel({
  style: {
    position: 'top-right',
    padding: '7px 5px'
  }
});
// Create checkbox title
var chkBoxTitle = ui.Label({
  value: 'Select to display on map',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 4px 0',
    padding: '0',
    color: 'black'
    }
});
// Add the title to the panel
chkBox.add(chkBoxTitle);
// False colour checkbox
var falsChk = ui.Checkbox('False colour time series', false); 
falsChk.onChange(function(checked){
  if(checked){
    animation.animate(fls_viz_anot, {maxFrames: max_frames_fls});
  } else {
    var laye = Map.layers();
    laye.forEach(function(lay) {
      var layName = lay.getName();
      removeLayer(layName);
      // if(layName == 'Boundary of animation'){}
      //   else{
      //   removeLayer(layName);
      //   }
      });
    }
  });
// NDVI checkbox
var ndviChk = ui.Checkbox('NDVI time series', false);
ndviChk.onChange(function(checked){
  if(checked){
    // Shows animation of NDVI time seties
    animation.animate(avgNDVI_viz_anot, {maxFrames: avgNDVI_max_frames});
    // Adds legend to map.
    Map.add(legend);
    // Register a callback on the default map to be invoked when the map is clicked
  Map.onClick(function(coords) {
    // Update the lon/lat panel with values from the click event.
  lon.setValue('lon: ' + coords.lon.toFixed(2)),
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF00FF'});
  //Map.layers().set(1, dot);
  // Create NDVI chart.
  var ndviChart = ui.Chart.image.series(myListAverage.select(
    ['NDVI_max2Avg']), point, ee.Reducer.mean(), 30, 'system:time_start');
  ndviChart.setOptions( {
      title: 'NDVI over time',
      hAxis: {title: 'Time'},
      vAxis: {title: 'NDVI'},
      });
  panel.widgets().set(1, ndviChart);
    // Create NDVI Difference chart.
  var ndviDerivChart = ui.Chart.image.series(myListDeriv.select(
    ['NDVI_derivative']),point, ee.Reducer.mean(), 30, 'system:time_start');
  ndviDerivChart.setOptions( {
      title: 'NDVI Derivatives  time',
      hAxis: {title: 'Time'},
      vAxis: {title: 'NDVI Changes'},
      });
  panel.widgets().set(2, ndviDerivChart);
    });
    // // Register a callback on the default map to be invoked when the map is clicked
    // Map.onClick(function(coords) {
    //   // Update the lon/lat panel with values from the click event.
    //   lon.setValue('lon: ' + coords.lon.toFixed(2)),
    //   lat.setValue('lat: ' + coords.lat.toFixed(2));
    //   var point = ee.Geometry.Point(coords.lon, coords.lat);
    //   var dot = ui.Map.Layer(point, {color: 'FF00FF'});
    //   Map.layers().set(1, dot);
    //});
  } else {
    var laye = Map.layers();
    laye.forEach(function(lay) {
      var layName = lay.getName();
      //removeLayer(layName)
      if(layName != 'Boundary of animation' || layName != 'kutupalong' || 
                      layName != 'Camps: Ukhia'){   // Work on this more**************
        removeLayer(layName)}
      Map.remove(legend); // Removes legends
    });
  }
});
// Oldest and Newest image checkbox
var oldNewChk = ui.Checkbox('Earliest and recent', false);
oldNewChk.onChange(function(checked){
  if(checked){
    // Shows animation of earliest and recent images' time seties
    animation.animate(oldNew_viz_anot, {maxFrames: 2});
    // Adds legend to map.
    Map.add(legend);
  } else {
    Map.remove(legend); // Removes legends
    removeLayer('00');
    removeLayer('01');
  }
});
// Forest loss with time
var lossChk = ui.Checkbox('Loss Epoch', false);
lossChk.onChange(function(checked){
  //var a = Map.addLayer(ndvi_revTimeMax.select('time').randomVisualizer(),{},'Date of NDVI drop ~ Forest Loss');
  if(checked){
    // Add layer loss loss/time
    Map.addLayer(ndvi_revTimeMax.select('time').randomVisualizer(),{},'Loss');
    // panels to hold time of loss
    //var T = ui.Label();
    //var lat = ui.Label();
    //panel.add(ui.Panel(T, ui.Panel.Layout.flow('horizontal')));
    // // Register a callback on the default map to be invoked when the map is clicked
    // Map.onClick(function(coords) {
    //   // Update the lon/lat panel with values from the click event.
    //   lon.setValue('lon: ' + coords.lon.toFixed(2)),
    //   lat.setValue('lat: ' + coords.lat.toFixed(2));
    //   var point = ee.Geometry.Point(coords.lon, coords.lat);// Update the lon/lat panel with values from the click event.
    //   var data = ndvi_revTimeMax.select('time').reduceRegion(ee.Reducer.first(),point,10)
    //             .get('time');
    //   data = ee.Number(data);
    //   T.setValue('Time of loss: ' + data);  
    //   });
  } else {
    removeLayer('Loss');
    //Map.clear();
  }
});
//
// Add checkboxes to the panel
chkBox.add(falsChk).add(ndviChk).add(oldNewChk).add(lossChk);
// Add checkbox panel to display
Map.add(chkBox);
//------------
// var choice = {
//   False: [animation.animate(fls_viz_anot, {maxFrames: max_frames_fls})],
//   NDVI: [animation.animate(avgNDVI_viz_anot, {maxFrames: avgNDVI_max_frames})]
// };
// var select = ui.Select({
//   items: Object.keys(choice),
//   onChange: function(key) {
//     Map.setCenter(places[key][0], places[key][1]);
//   }
// });
// // Set a place holder.
// select.setPlaceholder('Choose a location...');
// print(select);
//-----------
/////////////////////////////////////////////////////////////////////////////////////
// ------------------     NDVI DIFFERENCE     -------------------------------------
//// --------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//var ndvi_max = ndvi.select('NDVI_max')
// Example given by David
//Map.addLayer(image,{},ee.String(image.get('system:time_start')))  // example
// *** To display chart at display
// var title = {
//   title: 'NDVI over time',
//   hAxis: {title: 'Time'},
//   vAxis: {title: 'NDVI'},
// };
// print(ui.Chart.image.series(ndvi.select(['NDVI_median', 'NDVI_max', 'NDVI_mean']),
//   geometry,
//   ee.Reducer.max(), 
//   30,
//   'system:time_start')
//       .setOptions(title));