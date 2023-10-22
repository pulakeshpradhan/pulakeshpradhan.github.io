var imageVisParam = {"opacity":1,"bands":["NDVI_median"],"min":0.03427836688806535,"max":1.0151797799522686,"palette":["ff2913","ffc648","73ffb8","36c7ff","0f38ff"]},
    imageVisParam2 = {"opacity":1,"bands":["NDVI_median"],"min":0.3921881318092346,"max":0.8681147694587708,"palette":["ff2913","ffc648","73ffb8","36c7ff","0f38ff"]},
    ROI = ee.FeatureCollection("users/jespavon/malherbologia");
Map.centerObject(ROI,13)
//Map.addLayer(image);
//var roi = image.clip(ROI)
Map.addLayer(ROI)
var DEM =  ee.Image('USGS/SRTMGL1_003')
             .select('elevation');
var Sen1 = ee.ImageCollection('COPERNICUS/S1_GRD')
/////////////////////////////////////////////////////////////////////
////////////////////////////////////// The First Objetive performance of the Algoritm
//////////////////////////////////////////////////////////////////////////////
// PARAMETER VISUALICE
var vizPar = {
    falseColour: {
      bands: ['B8', 'B4', 'B3'],
      min: 200,
      max: 3000,
      gamma: 1.5
  },
    naturalColour: {
      bands: ['B4', 'B3', 'B2'],
      min: 350,
      max: 2500,
      gamma: 1.5
  },
    NDVI: {
      bands: ['NDVI'],
      min: -0.9,
      max: 0.9
  },
    S1: {
      bands: ['VV','VH','VV/VH'],
      min: [1.02,1,1.02],
      max: [1.05,1.012,1.04]
    },
    VH: {
      bands: ['VH'],
      min: 0,
      max: 0.06
    }
};
// PRE-PROCESING THE IMAGE ONLY FILTER LEE
// Refined Lee speckle filter for use with S1 data
var RefinedLee = function RefinedLee(img) {
  // img must be in natural units, i.e. not in dB! Convert 
  img = ee.Image(10.0).pow(img.select(0).divide(10.0))
  // Set up 3x3 kernels 
  var weights3 = ee.List.repeat(ee.List.repeat(1,3),3);
  var kernel3 = ee.Kernel.fixed(3,3, weights3, 1, 1, false);
  var mean3 = img.reduceNeighborhood(ee.Reducer.mean(), kernel3);
  var variance3 = img.reduceNeighborhood(ee.Reducer.variance(), kernel3);
  // Use a sample of the 3x3 windows inside a 7x7 windows to determine gradients and directions
  var sample_weights = ee.List([[0,0,0,0,0,0,0], [0,1,0,1,0,1,0],[0,0,0,0,0,0,0], [0,1,0,1,0,1,0], [0,0,0,0,0,0,0], [0,1,0,1,0,1,0],[0,0,0,0,0,0,0]]);
  var sample_kernel = ee.Kernel.fixed(7,7, sample_weights, 3,3, false);
  // Calculate mean and variance for the sampled windows and store as 9 bands
  var sample_mean = mean3.neighborhoodToBands(sample_kernel); 
  var sample_var = variance3.neighborhoodToBands(sample_kernel);
  // Determine the 4 gradients for the sampled windows
  var gradients = sample_mean.select(1).subtract(sample_mean.select(7)).abs();
  gradients = gradients.addBands(sample_mean.select(6).subtract(sample_mean.select(2)).abs());
  gradients = gradients.addBands(sample_mean.select(3).subtract(sample_mean.select(5)).abs());
  gradients = gradients.addBands(sample_mean.select(0).subtract(sample_mean.select(8)).abs());
  // And find the maximum gradient amongst gradient bands
  var max_gradient = gradients.reduce(ee.Reducer.max());
  // Create a mask for band pixels that are the maximum gradient
  var gradmask = gradients.eq(max_gradient);
  // duplicate gradmask bands: each gradient represents 2 directions
  gradmask = gradmask.addBands(gradmask);
  // Determine the 8 directions
  var directions = sample_mean.select(1).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(7))).multiply(1);
  directions = directions.addBands(sample_mean.select(6).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(2))).multiply(2));
  directions = directions.addBands(sample_mean.select(3).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(5))).multiply(3));
  directions = directions.addBands(sample_mean.select(0).subtract(sample_mean.select(4)).gt(sample_mean.select(4).subtract(sample_mean.select(8))).multiply(4));
  // The next 4 are the not() of the previous 4
  directions = directions.addBands(directions.select(0).not().multiply(5));
  directions = directions.addBands(directions.select(1).not().multiply(6));
  directions = directions.addBands(directions.select(2).not().multiply(7));
  directions = directions.addBands(directions.select(3).not().multiply(8));
  // Mask all values that are not 1-8
  directions = directions.updateMask(gradmask);
  // "collapse" the stack into a singe band image (due to masking, each pixel has just one value (1-8) in it's directional band, and is otherwise masked)
  directions = directions.reduce(ee.Reducer.sum());  
  //var pal = ['ffffff','ff0000','ffff00', '00ff00', '00ffff', '0000ff', 'ff00ff', '000000'];
  //Map.addLayer(directions.reduce(ee.Reducer.sum()), {min:1, max:8, palette: pal}, 'Directions', false);
  var sample_stats = sample_var.divide(sample_mean.multiply(sample_mean));
  // Calculate localNoiseVariance
  var sigmaV = sample_stats.toArray().arraySort().arraySlice(0,0,5).arrayReduce(ee.Reducer.mean(), [0]);
  // Set up the 7*7 kernels for directional statistics
  var rect_weights = ee.List.repeat(ee.List.repeat(0,7),3).cat(ee.List.repeat(ee.List.repeat(1,7),4));
  var diag_weights = ee.List([[1,0,0,0,0,0,0], [1,1,0,0,0,0,0], [1,1,1,0,0,0,0], 
    [1,1,1,1,0,0,0], [1,1,1,1,1,0,0], [1,1,1,1,1,1,0], [1,1,1,1,1,1,1]]);
  var rect_kernel = ee.Kernel.fixed(7,7, rect_weights, 3, 3, false);
  var diag_kernel = ee.Kernel.fixed(7,7, diag_weights, 3, 3, false);
  // Create stacks for mean and variance using the original kernels. Mask with relevant direction.
  var dir_mean = img.reduceNeighborhood(ee.Reducer.mean(), rect_kernel).updateMask(directions.eq(1));
  var dir_var = img.reduceNeighborhood(ee.Reducer.variance(), rect_kernel).updateMask(directions.eq(1));
  dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), diag_kernel).updateMask(directions.eq(2)));
  dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), diag_kernel).updateMask(directions.eq(2)));
  // and add the bands for rotated kernels
  for (var i=1; i<4; i++) {
    dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), rect_kernel.rotate(i)).updateMask(directions.eq(2*i+1)));
    dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), rect_kernel.rotate(i)).updateMask(directions.eq(2*i+1)));
    dir_mean = dir_mean.addBands(img.reduceNeighborhood(ee.Reducer.mean(), diag_kernel.rotate(i)).updateMask(directions.eq(2*i+2)));
    dir_var = dir_var.addBands(img.reduceNeighborhood(ee.Reducer.variance(), diag_kernel.rotate(i)).updateMask(directions.eq(2*i+2)));
  }
  // "collapse" the stack into a single band image (due to masking, each pixel has just one value in it's directional band, and is otherwise masked)
  dir_mean = dir_mean.reduce(ee.Reducer.sum());
  dir_var = dir_var.reduce(ee.Reducer.sum());
  // A finally generate the filtered value
  var varX = dir_var.subtract(dir_mean.multiply(dir_mean).multiply(sigmaV)).divide(sigmaV.add(1.0));
  var b = varX.divide(dir_var);
  var result = dir_mean.add(b.multiply(img.subtract(dir_mean)));
  // Return the result in natural numbers rather than dB, allowing mean reductions etc. 
  return ee.Image(result.arrayFlatten([['sum']]));
  //.log10().multiply(10.0);
};
//Calling functions to pre-process images
function preProcessing(image) {
  var collection = RefinedLee(image);
  return collection;
}
//Setup bounds using the ROI SOY
var bounds = ROI;
//Map.addLayer(bounds,{},'bounds',false);
//Map.centerObject(orig, 11);
//Operate within a yearly window
var start = ee.Date('2019-01-01');
var end = ee.Date('2019-02-27');
var s1 = ee.ImageCollection('COPERNICUS/S1_GRD_FLOAT')
  .filterDate(start, end)
  .filter(ee.Filter.eq('instrumentMode', 'IW'));//Recommended for forestry applications, default mode over land
s1 = s1.filterBounds(bounds)
print('ASCENDING',s1.filterMetadata('orbitProperties_pass','equals','ASCENDING'));
print('DESCENDING',s1.filterMetadata('orbitProperties_pass','equals','DESCENDING'));
s1 = s1.filterMetadata('orbitProperties_pass','equals','DESCENDING')
// Get the VV dual polerisation images, preform the preprocessing on them and copy the timestamp across for future use
var s1 = s1
      .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
      .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
      //.map(erodeGeometry)
      .map(function(i) {
        return ee.Image.cat((
          preProcessing(i.select('VV')).select(['sum'],['VV'])
            .copyProperties(i,['system:time_start'])),
          (preProcessing(i.select('VH')).select(['sum'],['VH'])
            .copyProperties(i,['system:time_start'])))
            //,glcm(i))
      });      
print('Processed images',s1)
//generate a list to map through (monthly will only work for one year at the moment). Bother Conor with this? 
var months = ee.List.sequence(1,12);
//Placeholder so postion 1 does not give Feb instead of Jan
var monthsString = ee.List(['PLACEHOLDER','January','Febuary','March','April','May','June','July','August','September','October','November','December']);
////perform a seperate reduction for each month of imagery, attaching the respective 
//month (int and string) and number of images in the composite
var processedComposites = ee.ImageCollection((months.map(function(m) {
        var filtered = s1.filter(ee.Filter.calendarRange(m, m, 'month'))
        m = ee.Number(m) //have to cast year as a number object before calling int() on it
        var monthString = monthsString.get(m);
        filtered = ee.ImageCollection(filtered)
        .mean()
        .set('numImages',filtered.size())
        .set('month', m)
        .set('monthString', monthString);
        return filtered
      }
)));
//Add indicies
processedComposites = s1.map(function(i){
  return i.addBands(i.normalizedDifference(['VH', 'VV']).rename('ND'))//Add an ND band
  .addBands(((i.select('VV')).divide(i.select('VH'))).rename('VV/VH'))//Add a ratio band
})
print('Monthly composites', processedComposites);
//Get a list of bands from the first composite
var bands = processedComposites.first().bandNames()
//var bands = ['VH','VV/VH']
print(bands)
// var bands = ['VV','VH','VH-VV','VV_div_VH','VH_contrast','VH_diss','VH_idm','VH_asm','VH_ent','VH_savg','VH_corr','VH_var',
// 'VV_contrast','VV_diss','VV_idm','VV_asm','VV_ent','VV_savg','VV_corr','VV_var']
// Select the monthly composite to process
var S1T1 = ee.Image(processedComposites.toList(100).get(0));
var S1T2 = ee.Image(processedComposites.toList(100).get(4));
print(S1T1)
//STOP 3
var T1_clip = S1T1.clip(ROI)
Map.addLayer(T1_clip,vizPar.S1,'Before_20190102')
var T2_clip = S1T2.clip(ROI)
Map.addLayer(T2_clip,vizPar.S1,'After_20190219')
// The different change
// set date window
var bef = T1_clip.select('VV/VH');
var aft = T2_clip.select('VV/VH')
//Map.addLayer(bef);
//Map.addLayer(aft);
var p90bf = bef.reduce(ee.Reducer.percentile([90]));
var p50bf = bef.reduce(ee.Reducer.percentile([50])); 
var p10bf = bef.reduce(ee.Reducer.percentile([10]));
var p90at = aft.reduce(ee.Reducer.percentile([90]));
var p50at = aft.reduce(ee.Reducer.percentile([50])); 
var p10at = aft.reduce(ee.Reducer.percentile([10]));
var imgbf = p90bf.addBands(p50bf).addBands(p10bf);
var imgat = p90at.addBands(p50at).addBands(p10at);
var imgbf_clip = imgbf.clip(ROI)
var imgat_clip = imgat.clip(ROI)
//Map.addLayer(imgbf_clip, {min: 1.014714247850709, max: 1.0870637939101968,bands: ['p10', 'p50', 'p10']}, 'Before_2019_01_02',1);
//Map.addLayer(imgat_clip, {min: 1.0202118818803803, max: 1.0735631126917233, bands: ['p10', 'p50', 'p10']}, 'After_2019_02_19',1);
var diff = p10at.subtract(p10bf);
var diff_clip = diff.clip(ROI)
var radius = 5;
var thres = -0.03;
var diff_sm = diff.focal_median(radius, 'circle', 'meters')
.subtract(p10bf.focal_median(radius, 'circle', 'meters'));
var diff_th = diff_sm.lt(thres);
//var clip_diff = diff_th.clip(ROI)
var change = diff_th.updateMask(diff_th.neq(0));
//var clip_change = change.clip(ROI)5
//Map.addLayer(diff_th, {min: -10, max: 10}, 'Diff',0)
//Map.addLayer(change, {palette: 'FFF000'}, 'Changed')
// THE MULTISPECTRAL
var start_date = ee.Date.fromYMD(2019,2,15);
var end_date = ee.Date.fromYMD(2019,2,27);
var Sentinel2 = (ee.ImageCollection('COPERNICUS/S2')
                .filterBounds(ROI)
                .filterDate(ee.Date(start_date),ee.Date(end_date)));
                //.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10)));
// NOT PUT MASK CLOUDS STANDAR BUT CALCULE NDVI
// This function adds a band representing the image timestamp.
var computeNDVI = function(image) {
  return image.normalizedDifference(['B8', 'B4']).rename('NDVI')
    .set({'system:time_start': image.get('system:time_start')})
};
var inputs = Sentinel2.map(computeNDVI)
print (inputs)
var median = inputs.reduce(ee.Reducer.median());
var clip = median.clip(ROI)
Map.addLayer(clip,imageVisParam,'median_0215_0227')
/////////////////////////////////////////////////////
////////////////////////// UI VISUALIZE ////////////
///////////////////////////////////////////////////
print('script started');
// =======================================
// options
// =======================================
// smelly global variable
var max_ew_slope = 0; // below this east-west slope value, both ascending and descending are used. Null means no filtering.
// constants
var OBSERVATION_BOUNDS = 1826; // days before today that can be selected with sliders
var NOW = new Date(); // time of script start
var MIN_OBS = 3; // min number of datapoints required at right tail of step function
// =======================================
// ascending/descending separation based on terrain
// =======================================
// get aspect and slope bands
DEM = ee.Terrain.products(DEM);
// get relief image with Eastern sun
var aspect = DEM.select('aspect').multiply(Math.PI/180);
var slope = DEM.select('slope').multiply(Math.PI/180);
var ew_slope_img = slope.tan().multiply(aspect.sin()).atan().multiply(180/Math.PI);
// function to filter steep faces facing the satellite
function without_steep (img) {
  // asc: >0 (truthy), desc: 0 (falsy)
  var ascending = ee.String(img.get('orbitProperties_pass')).compareTo('DESCENDING');
  return ee.Algorithms.If(ascending,
                          img.updateMask(ew_slope_img.gt(-max_ew_slope)),
                          img.updateMask(ew_slope_img.lte(max_ew_slope))
  // for max_ew_slope == 0, desc orbit will be used for flat areas (i. e. where relief == 0)
                         );
}
// =======================================
// get season model
// =======================================
// code block adapted from Karyn Tabor:
// https://code.earthengine.google.com/26b5ce2fe826f4fe1d6b030cc229b07e
var EPOCH = ee.Date('2010-01-01');
function add_independents(image) {
  var freq_x_time = image.date().difference(EPOCH, 'year').multiply(2*Math.PI);
  var independents = ee.Image.cat(1, freq_x_time.sin(), freq_x_time.cos()).rename(['center', 'sin', 'cos']);
  return image.addBands(independents).float().select(['center', 'sin', 'cos', 'sigma0']);
}
var season_model;
function get_season_model(collection) {
  var with_independents = collection.map(add_independents); 
  var regression = with_independents.reduce(ee.Reducer.linearRegression(3), 4)
                                    .select('coefficients')
                                    .arrayProject([0])
                                    .arrayFlatten([['center', 'sin', 'cos']])
                                    .float();
  season_model = regression;
}
// function to remove seasonal component at each pixel.
var remove_season = function(image) {
  var freq_x_time = ee.Date(image.get('system:time_start')).difference(EPOCH, 'year').multiply(2*Math.PI);
  return ee.Image(image.subtract(season_model.select('sin').multiply(freq_x_time.sin()))
                  .subtract(season_model.select('cos').multiply(freq_x_time.cos()))
                  .float()
                  .copyProperties(image, ['system:time_start']));
};
// =======================================
// change visualization functions
// =======================================
// single step function (least squares fit)
function fit_step(full_coll, change_coll, min_obs) {
  var combi_reducer = ee.Reducer.mean().combine(
                      ee.Reducer.variance(), '', true).combine(
                      ee.Reducer.count(), '', true);
  var lsq_sums = change_coll.map( function(image) {
    image = ee.Image(image);
    full_coll = ee.ImageCollection(full_coll);
    change_coll = ee.ImageCollection(change_coll);
    var step_date = image.get('system:time_start');
    var left_tail = full_coll.filterMetadata('system:time_start', 'less_than', step_date);
    var left_stats = left_tail.reduce(combi_reducer);
    var right_tail = change_coll.filterMetadata('system:time_start', 'not_less_than', step_date);
    var right_stats = right_tail.reduce(combi_reducer);
    // add up two tails
    var neg_squares = left_stats.expression("b('sigma0_variance')*b('sigma0_count')")
                      .add(right_stats.expression("b('sigma0_variance')*b('sigma0_count')"))
                      .multiply(-1)
                      .where(right_stats.select('sigma0_count').lte(min_obs), -1e9);
    return ee.Image.cat(image.metadata('system:time_start'), neg_squares,
                        left_stats.select('sigma0_mean'), right_stats.select('sigma0_mean'))
              .rename(['toc', 'good_fit', 'sigma0_old', 'sigma0_new']);
  });
  var mosaic = ee.ImageCollection(lsq_sums).qualityMosaic('good_fit');
  mosaic = mosaic.updateMask(mosaic.select('good_fit').neq(-1e9)); // remove pixels were constraints are too hard.
  // R squared:
  var blue = mosaic.expression("1 + b('good_fit')/(stats.sigma0_variance*stats.sigma0_count)",
                               {stats: full_coll.reduce(ee.Reducer.variance().combine(
                                                          ee.Reducer.count(), '', true))
                               })
    .rename('R_squared');
  var green = mosaic.select('sigma0_new');
  var red = mosaic.select('sigma0_old');
  var full_count = full_coll.count().rename('images_in_time_series');
  var change_count = change_coll.count().rename('images_in_change_series');
  return ee.Image.cat(red, green, blue, full_count, change_count);
}
// trend line (least squares fit)
function fit_line(change_coll, start, end, weights) {
  change_coll = ee.ImageCollection(change_coll);
  start = ee.Date(start).millis();
  end = ee.Date(end).millis();
  ///*
  var set_weights;
  if (weights == 'no_weights') set_weights = function (image) { return image; };
  else if (weights == 'linear') set_weights = function (image) {
    return image.updateMask(ee.Number(image.get('system:time_start')).subtract(start).divide(end.subtract(start)));
  };
  else throw 'Bad argument supplied for weights!';
  change_coll = change_coll
    .map(function(image) {
      return set_weights(image)
        .addBands(image.metadata('system:time_start'));
    } );
  var trend_img = change_coll
    .select(['system:time_start', 'sigma0'])
    .reduce(ee.Reducer.linearFit());
  if (weights != 'no_weights') trend_img = trend_img.updateMask(1);
  // change offset (=intercept) from offset in 1970 to offset 'a_while_ago' and adjust units 
  var output_img = ee.Image.cat(
    trend_img.select('offset')
      .add(trend_img.select('scale').multiply(start)), // move intercept
    trend_img.select('offset')
      .add(trend_img.select('scale').multiply(end)), // move intercept
    // r_squared (actually nothing)
    ee.Image.constant(0),
    // count
    change_coll.select('sigma0').count()
  ).rename(['before', 'after', 'r_2', 'count']).float();
  return output_img;
}
// This function highlights backscatter maxima in color
// hue: date of maximum, saturation: sigma0 ratio max/median, value: median [decibels]
function find_spike(change_coll, start, end) {
  // main computations
  var spike_images = change_coll.map(function(image) {
    return image.addBands(image.metadata('system:time_start'));
  });
  var spike_mosaic = spike_images.qualityMosaic('sigma0');
  var median = spike_images.select('sigma0').median().rename('baseline');
  var diff = spike_mosaic.select('sigma0').subtract(median).rename('difference');
  var ratio = diff.expression('10.0**(b()/10.0)'); // =sigma0_max/sigma0_median
  // compute the dates for the legend
  start = ee.Date(start).millis().getInfo();
  var range = ee.Date(end).millis().getInfo() - start;
  var dates = [{bg:'red', c:'white', d:start},
               {bg:'yellow', c:'black', d: start + range/5},
               {bg:'00FF00', c:'white', d: start + range*2/5},
               {bg:'cyan', c:'black', d: start + range*3/5},
               {bg:'blue', c:'white', d: start + range*4/5},
               {bg:'magenta', c:'white', d: start + range}
              ];
  var legends = [ui.Label('spike date (topmost spike layer): ')];
  for (var i=0; i<dates.length; i++) {
    legends.push(ui.Label(ee.Date(dates[i].d).format('yyyy-MM-dd').getInfo(),
                          {color: dates[i].c, backgroundColor: dates[i].bg}
                         ));
  }
  var colorbar = ui.Panel(legends, ui.Panel.Layout.flow('horizontal'), {position: 'bottom-center'});
  Map.add(colorbar);
  // create hsv summary image
  var rgb = ee.Image.cat(spike_mosaic.select('system:time_start').subtract(start).divide(range*6/5), // clipping to hues from red to magenta, i.e. rygcbm
                         ratio.subtract(1).divide(9), // clipping to ratios from 1 to 10.
                         median.add(20).divide(20)
                        ).hsvToRgb();
  return rgb;
}
// =======================================
// export basic functions
// =======================================
exports.without_steep = without_steep;
exports.get_season_model = get_season_model;
exports.remove_season = remove_season;
exports.fit_line = fit_line;
exports.fit_step = fit_step;
exports.find_spike = find_spike;
// =======================================
// custom date slider for UI
// =======================================
// factory function
function single_slider (slider_default) {
  // define UI elements
  var mini_panel = ui.Panel({
    widgets: [
        ui.Slider({
          min: -OBSERVATION_BOUNDS,
          max: 1,
          value: slider_default,
          step: 1,
          style: {
            width: '200px',
            fontSize: 0, // hide label
            margin: '0px -50px 0px 8px',
          }
        }),
        ui.Textbox({style: {
          width: '85px',
          margin: '0px'
        } })
      ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {margin: '0px'},
    }
  );
  // helper functions with convenient names
  var listen_textbox = true;
  var listen_slider = true;
  mini_panel.slider = mini_panel.widgets().get(0);
  mini_panel.box = mini_panel.widgets().get(1);
  mini_panel.box.parent = mini_panel;
  mini_panel.value = mini_panel.slider.getValue; // a function
  mini_panel.getDate = function() {
    mini_panel.box.style().set('color', 'black');
    if (listen_slider) {
      var date = new Date(NOW);
      date.setUTCDate(date.getUTCDate() + mini_panel.value());
      var pad = function(int) { return ('0' + int).slice(-2); };
      var date_string = date.getUTCFullYear() + '-' + pad(date.getUTCMonth()+1) + '-' + pad(date.getUTCDate());
      listen_textbox = false;
      mini_panel.box.setValue(date_string);
      listen_textbox = true;
      return date;
    }
  };
  // link textbox and slider
  mini_panel.slider.onSlide(mini_panel.getDate);
  mini_panel.box.onChange( function(text, box) {
    if (listen_textbox) {
      var newdate = new Date(text);
      var newval = Math.ceil((newdate - NOW)/(1000*3600*24));
      if (newval === 0 || newval && newval > -OBSERVATION_BOUNDS && newval < 2) {
        listen_slider = false;
        box.parent.slider.setValue(newval);
        listen_slider = true;
      }
      else
        box.style().set('color', 'red');
    }
  });
  // sync textbox and slider
  mini_panel.getDate();
  // return combined slider with textbox
  return mini_panel;
}
// =======================================
// UI
// =======================================
// help box
var help_text = ui.Label({
  value: 'This application can summarize a Sentinel-1 timeseries search patterns of weeds in cultivatione',
  style: {position: 'bottom-center', width: '300px', whiteSpace: 'pre-wrap'},
});
var help_cross = ui.Button({
  label: 'X',
  style: {position: 'top-right'},
});
var help_panel = ui.Panel({
  layout: ui.Panel.Layout.absolute(),
  widgets: [help_cross, help_text],
  style: {width: '350px', height: '100px'},
});
Map.add(help_panel);
help_cross.onClick( function() {help_panel.style().set('shown', false); });
function show_help_panel(text) {
  help_panel.style().set('shown', true);
  help_text.setValue(text);
}
// toggle to remove harmonic (seasonal) signal
var season_toggle = ui.Checkbox({
  label: 'remove seasonal signal',
  style: {stretch: 'both'},
});
var season_help = ui.Button({
  label: '?',
  onClick: function() {
    show_help_panel('At each pixel a sine-function is fit to the timme series of pixel values. Subsequently this seasonal component is subtracted across the time series. Note that this step only makes sense if there is at least a year between start of data and start of monitoring period. Even then this step tends to introduce noise.');
  }
});
var season_panel = ui.Panel({
  widgets: [season_toggle, season_help],
  layout: ui.Panel.Layout.flow('horizontal'),
});
// dropdown to select polarization
var pol_label = ui.Label('polarization');
var pol_dropdown = ui.Select({
  items: ['VH', 'VV'],
  value: 'VV',
  style: {stretch: 'horizontal'},
});
var pol_help = ui.Button({
  label: '?',
  onClick: function() {
    show_help_panel('VH: Transmitted radio waves are vertically polarized and horizontally polarized waves are received.\n\nVV: Both transmitted and received radio waves are vertically polarized.');
  }
});
var pol_panel = ui.Panel({
  widgets: [pol_dropdown, pol_help],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal'},
});
// textbox to select layer name
var name_label = ui.Label('layer name:');
var name_box = ui.Textbox({
  value: 'step composite image',
  style: {stretch: 'horizontal'},
});
// dropdown to select between ascending and descending polarization or combinations thereof
var pass_label = ui.Label('satellite pass direction:');
var pass_dropdown = ui.Select({
  items: ['ascending', 'descending', 'best', 'filter steep terrain (>20°)', 'combine'],
  value: 'combine',
  style: {stretch: 'horizontal'},
});
var pass_help = ui.Button({
  label: '?',
  onClick: function() {
    switch (pass_dropdown.getValue()) {
      case 'ascending':
        show_help_panel('Only images from ascending satellite passes are used to build the composite image.');
        break;
      case 'descending':
        show_help_panel('Only images from descending satellite passes are usedto build the composite image.');
        break;
      case 'best':
        show_help_panel('For each pixel, only images from satellites passing on the uphill side are used.');
        break;
      case 'filter steep terrain (>20°)':
        show_help_panel('For pixels in steep terrain (>20°), only images from satellites passing on the uphill side are used.');
        break;
      case 'combine':
        show_help_panel('The full time series with both ascending and descending node images is used to build the composite image.');
        break;
    }
  }
});
var pass_panel = ui.Panel({
  widgets: [pass_dropdown, pass_help],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal'},
});
// dropdown to select time series fitting function
var fit_label = ui.Label('function to fit:');
var fit_dropdown = ui.Select({
  items: ['trend line', 'step function', 'spike function'],
  value: 'step function',
  style: {stretch: 'horizontal'},
  onChange: function(new_value) {
    name_box.setValue(new_value);
    d1_label.style().set('shown', (new_value == 'step function'));
    d1_slide.style().set('shown', (new_value == 'step function'));
  },
});
var fit_help = ui.Button({
  label: '?',
  onClick: function() {
    switch (fit_dropdown.getValue()) {
      case 'trend line':
        show_help_panel('At each pixel a linear fit of backscatter values is computed. The composite shows the start (red) and end (green) values of this trend line.');
        break;
      case 'step function':
        show_help_panel('At each pixel a step function with a single discontinuity is fit to the backscatter values. The composite shows the left (red) and right (green) values of the step function, as well as R squared in blue.');
        break;
      case 'spike function':
        show_help_panel('At each pixel the maximum and average of the time series is computed. The resulting composite shows the following. value: average; saturation: max/average; hue: Date of maximum.');
        break;
    }
  }
});
var fit_panel = ui.Panel({
  widgets: [fit_dropdown, fit_help],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal'},
});
// sliders to select extent of monitoring period
var d1_label = ui.Label('start of data:');
var d1_slide = single_slider(-180);
var d2_label = ui.Label('start of monitoring period:');
var d2_slide = single_slider(-90);
var d3_label = ui.Label('end of monitoring period:');
var d3_slide = single_slider(0);
// button to calculate
var apply_button = ui.Button({
  label: 'load time series composite image',
  style: {stretch: 'horizontal'},
});
// panel with all the options
var side_panel = ui.Panel({
  widgets: [season_panel,
    pol_label, pol_panel, // not implemented
    pass_label, pass_panel,
    fit_label, fit_panel, name_label, name_box,
    d1_label, d1_slide, d2_label, d2_slide, d3_label, d3_slide,
    apply_button],
});
ui.root.add(side_panel);
// function for loading the time series composite images
var show = function() {
  print('loading ' + fit_dropdown.getValue() + ' composite image');
  var start_date = d1_slide.getDate();
  var steady_date = d2_slide.getDate();
  var end_date = d3_slide.getDate(); 
  print(ee.Date(start_date), ee.Date(steady_date), ee.Date(end_date));
  // preprocessing
  var Sen1filtered = Sen1.filterDate(start_date, end_date)
                         .filter(ee.Filter.listContains('transmitterReceiverPolarisation', pol_dropdown.getValue()))
                         .select(pol_dropdown.getValue()) // not implemented
                         .map(function (img) {return img.rename('sigma0')});
  switch (pass_dropdown.getValue()) {
    case 'ascending':
      Sen1filtered = Sen1filtered.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
      break;
    case 'descending':
      Sen1filtered = Sen1filtered.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
      break;
    case 'best':
      max_ew_slope = 0;
      Sen1filtered = Sen1filtered.map(without_steep);
      break;
    case 'filter steep terrain (>20°)':
      max_ew_slope = 20;
      Sen1filtered = Sen1filtered.map(without_steep);
      break;
    case 'combine':
      break;
  }
  var Sen1filtered_steady = Sen1filtered.filterDate(start_date, steady_date);
  if (season_toggle.getValue()) {
    // get harmonic season model and remove it from images
    get_season_model(Sen1filtered_steady);
    Sen1filtered = Sen1filtered.map(remove_season);
    Sen1filtered_steady = Sen1filtered.filterDate(start_date, steady_date);
  }
  var Sen1timeframe = Sen1filtered.filterDate(steady_date, end_date);
  var viz_rgb;
  switch (pol_dropdown.getValue()) {
    case 'VV':
      viz_rgb = {
        min: [-20.0, -20.0, 0.0],
        max: [0.0, 0.0, 1.0],
      };
      break;
    case 'VH':
      viz_rgb = {
        min: [-30.0, -30.0, 0.0],
        max: [0.0, 0.0, 1.0],
      };
      break;
  }
  var layer_name = name_box.getValue();
  switch (fit_dropdown.getValue()) {
    case 'trend line':
      var trend_composite = fit_line(
        Sen1timeframe, steady_date, end_date, 'no_weights');
      Map.addLayer(trend_composite, viz_rgb, layer_name);
      break;
  case 'step function':
      var step_composite = fit_step(
        Sen1filtered, Sen1timeframe, MIN_OBS);
      Map.addLayer(step_composite, viz_rgb, layer_name);
    break;
  case 'spike function':
      var widgets = Map.widgets();
      if (widgets.length() > 2) Map.remove(widgets.get(2)); // remove previous colorbar
      var spike_img = find_spike(
        Sen1timeframe, steady_date, end_date);
      Map.addLayer(spike_img, {}, layer_name);
    break;
  }
};
apply_button.onClick(show);
// =======================================
// Show time series on click
// =======================================
// separate ascending and descending columns
function asc_des_columns (img) {
  var band_names = img.bandNames().remove('angle');
  var new_names = band_names.map(function(name) {
    return ee.String(name).cat('_').cat(ee.String(img.get('orbitProperties_pass')).toLowerCase());
  });
  return img.select(band_names, new_names);
}
var Sen1_asc_des = Sen1.map(asc_des_columns);
// chart options
var vAxis_dB = {title: 'SAR backscatter coefficient sigma-0 [dB]',
                minValue: -30.0,
                maxValue: 0.0,
                gridlines: {count: 7}};
var options = {
  title: 'SAR backscatter time series',
  vAxis: vAxis_dB,
  hAxis: {title: 'acquisition start dates (UTC)'},
  lineWidth: 0,
  pointSize: 2,
  colors: ['#9999ff', '#ff9999', '#0000aa', '#aa0000'],
};
// checkbox: if checked clicking the map will produce a time series chart
function change_cursor(bool, box) {
  if(bool) Map.style().set({cursor: 'crosshair'});
  else Map.style().set({cursor: 'hand'});
}
var box_inspect = ui.Checkbox({
  label: 'show pixel time series',
  value: false,
  onChange: change_cursor,
  style: {backgroundColor: 'green', color: 'white', padding: '10px',
          stretch: 'horizontal', position: 'top-left'}
});
Map.add(box_inspect);
// function to compute time series chart
function show_chart (coords, map) {
  if(box_inspect.getValue()) { 
    // get point from coordinates
    var coord_array = Object.keys(coords).map(function (key) { return coords[key]; });
    var point = ee.Geometry.Point(coord_array);
    // create chart
    options.title = 'SAR backscatter time series at lon: ' + String(coords.lon) + ' lat: ' + coords.lat;
    var chart = ui.Chart.image.series(Sen1_asc_des, point)
                .setOptions(options);
    chart.style().set({width: '900px', height: '280px', position: 'bottom-left',
                       padding: '0px', margin: '0px',
    });
    // figure out if click is on bottom or top half of the map
    var center_coords = Map.getCenter();
    var y_center = center_coords.coordinates().get(1);
    var position = (coords.lat > y_center.getInfo()) ? 'bottom-center' : 'top-center';
    // show chart
    var chart_panel = ui.Panel({
      widgets: [chart,
                ui.Button({
                  label: 'X',
                  style: {position: 'top-right',
                          padding: '0px', margin: '0px',
                  },
                  onClick: function () { Map.remove(chart_panel); },
                }),
      ],
      layout: ui.Panel.Layout.absolute(),
      style: {width: '1000px', height: '300px', position: position,
              padding: '0px', margin: '0px',
      },
    });
    Map.add(chart_panel);
  }
}
Map.onClick(show_chart);