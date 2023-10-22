var DEM = ui.import && ui.import("DEM", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    Sen1 = ui.import && ui.import("Sen1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    Sen2 = ui.import && ui.import("Sen2", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR");
/*
MIT License
Copyright (c) 2021 Lukas J. Schreiber, born 9 March 1993.
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
// User Handbook at: https://sites.google.com/view/sisterfaq
// Docs at: https://developers.google.com/earth-engine/
print('script started');
// =======================================
// to-dos
// =======================================
//maybe:
// add cloud mask -- I tried this and couldn't get it to work.
// options for six polarizations
// Use drawing function to get pixel time series or polygon time series
// =======================================
// options
// =======================================
// smelly global variables
var max_ew_slope = 0; // below this east-west slope value, both ascending and descending are used. Null means no filtering.
// constants
var OBSERVATION_BOUNDS = 1826; // days before today that can be selected with sliders
var NOW = new Date(); // time of script start
var MIN_OBS = 3; // min number of datapoints required at right tail of step function
var TREND = '↗ least-squares line';
var SEN = '↗ Theil-Sen estimator';
var STEP = '㇅ step function';
var TOC = '㇅ step time';
var SPIKE = '⊥ spike function';
var I = 'intensity ✨';
var NDVI = 'NDVI 🌱';
var NBR = 'NBR 🔥';
var SEN2INDICES = [I, NDVI, NBR]; // supported indices
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
function without_steep (img, max_ew_slope) {
  var ascending = ee.String(img.get('orbitProperties_pass')).compareTo('DESCENDING');
  return ee.Algorithms.If(ascending,
                          img.updateMask(ew_slope_img.gt(-max_ew_slope)),
                          img.updateMask(ew_slope_img.lte(max_ew_slope))
  // for max_ew_slope == 0, desc orbit will be used for flat areas (i. e. where relief == 0)
                         );
}
function without_steep_0 (img) {
  return without_steep(img, 0);
}
function without_steep_10 (img) {
  return without_steep(img, 10);
}
// =======================================
// get season model
// =======================================
// code block adapted from Karyn Tabor:
// https://code.earthengine.google.com/26b5ce2fe826f4fe1d6b030cc229b07e
var EPOCH = ee.Date('2010-01-01');
function add_independents (image) {
  var freq_x_time = image.date().difference(EPOCH, 'year').multiply(2*Math.PI);
  var independents = ee.Image.cat(1, freq_x_time.sin(), freq_x_time.cos()).rename(['center', 'sin', 'cos']);
  return image.addBands(independents).float().select(['center', 'sin', 'cos', 'y']);
}
function get_season_model (collection) {
  var with_independents = collection.map(add_independents); 
  var regression = with_independents.reduce(ee.Reducer.robustLinearRegression(3), 4)
                                    .select('coefficients')
                                    .arrayProject([0])
                                    .arrayFlatten([['center', 'sin', 'cos']])
                                    .float();
  return regression;
}
// function to remove seasonal component at each pixel.
function without_season (coll, steady) {
  var season_model = get_season_model(steady);
  return coll.map(function (image) {
    var freq_x_time = ee.Date(image.get('system:time_start'))
                      .difference(EPOCH, 'year')
                      .multiply(2*Math.PI);
    return ee.Image(image.subtract(season_model.select('sin').multiply(freq_x_time.sin()))
                    .subtract(season_model.select('cos').multiply(freq_x_time.cos()))
                    .float()
                    .copyProperties(image, ['system:time_start']));
  });
}
// =======================================
// change visualization functions
// =======================================
var combi_reducer = ee.Reducer.mean().combine(
                    ee.Reducer.variance(), '', true).combine(
                    ee.Reducer.count(), '', true);
var varcount_reducer = ee.Reducer.variance().combine(ee.Reducer.count(), '', true);
// single step function (least squares fit)
function fit_step (full_coll, change_coll, min_obs) {
  var lsq_sums = change_coll.map( function (image) {
    image = ee.Image(image);
    full_coll = ee.ImageCollection(full_coll);
    change_coll = ee.ImageCollection(change_coll);
    var step_date = image.get('system:time_start');
    var left_tail = full_coll.filterMetadata('system:time_start', 'less_than', step_date);
    var left_stats = left_tail.reduce(combi_reducer);
    var right_tail = change_coll.filterMetadata('system:time_start', 'not_less_than', step_date);
    var right_stats = right_tail.reduce(combi_reducer);
    // add up two tails
    var neg_squares = left_stats.expression("b('y_variance')*b('y_count')")
                      .add(right_stats.expression("b('y_variance')*b('y_count')"))
                      .multiply(-1)
                      .where(right_stats.select('y_count').lte(min_obs), -1e9);
    var output = ee.Image.cat(
      image.metadata('system:time_start'),
      neg_squares,
      left_stats.select('y_mean'),
      right_stats.select('y_mean')
      ).rename(['toc', 'good_fit', 'before', 'after']);
    return output;
  });
  var mosaic = ee.ImageCollection(lsq_sums).qualityMosaic('good_fit');
  mosaic = mosaic.updateMask(mosaic.select('good_fit').neq(-1e9)); // remove pixels were constraints are too hard.
  // R squared:
  var blue = mosaic.expression("1 + b('good_fit')/(stats.y_variance*stats.y_count)",
                               {stats: full_coll.reduce(varcount_reducer)
                               })
                   .rename('R_squared');
  var red = mosaic.select('before');
  var green = mosaic.select('after');
  var full_count = full_coll.count().rename('images_in_time_series');
  var change_count = change_coll.count().rename('images_in_change_series');
  var toc = mosaic.select('toc');
  return ee.Image.cat(red, green, blue, toc, full_count, change_count);
}
// single step function time of change
function fit_toc (full_coll, change_coll, min_obs, steady, end) {
  var img = ee.Image(fit_step(full_coll, change_coll, min_obs));
  // compute the dates for the legend
  steady = ee.Date(steady).millis();
  var before = img.select('before');
  var after = img.select('after');
  var range = ee.Date(end).millis().subtract(steady);
  var time = img.select('toc');
  var rgb = ee.Image.cat(time.subtract(steady).divide(range).multiply(6/5), // clipping to hues from red to magenta, i.e. rygcbm
                         img.select('R_squared'),
                         before.add(20).divide(20)
                        ).hsvToRgb();
  rgb = ee.Image.cat(rgb, before, after, time);
  return rgb;
}
// trend line (least squares fit)
function createConstantAndTimeBand (image) {
  image = image.addBands(image.metadata('system:time_start'));
  return ee.Image(1).addBands(image);
}
function fit_line (change_coll, start, end, trend_type) {
  // trend type can be: 'lsq' for least-squares or 'sen' for Theil-Sen estimator.
  change_coll = ee.ImageCollection(change_coll);
  start = ee.Date(start).millis();
  end = ee.Date(end).millis();
  change_coll = change_coll.map( function (img) {
    return img.addBands(img.metadata('system:time_start'));
  });
  // least squares fit or Theil-Sen fit  
  var reducer = trend_type == 'lsq' ? ee.Reducer.linearFit() : ee.Reducer.sensSlope();
  var slope = trend_type == 'lsq' ? 'scale' : 'slope';
  var trend_img = change_coll
    .select(['system:time_start', 'y'])
    .reduce(reducer);
  // calculate R_squared, the coefficient of determination
  // R_squared = 1 - SS_res / SS_tot
  var offset = trend_img.select('offset');
  slope = trend_img.select(slope);
  var SS_res = change_coll.map( function (img) {
    var fit = offset.add(img.select('system:time_start').multiply(slope));
    var error = img.select('y').subtract(fit);
    return error.multiply(error);
  }).sum();
  var SS_tot = change_coll.reduce(varcount_reducer).expression("b('y_variance')*b('y_count')");
  var r2 = SS_res.divide(SS_tot).multiply(-1).add(1.0).rename('r2');
  // change offset (=intercept) from offset in 1970 to offset 'start' and adjust units
  var before = offset.add(slope.multiply(start)); // move intercept
  var after = offset.add(slope.multiply(end)); // move intercept
  var output_img = ee.Image.cat(
    before, // start offset
    after, // end offset
    r2, // r_squared
    change_coll.select('y').count(), // count layer
    ee.Image.constant(0) // pointless time of change layer
  ).rename(['before', 'after', 'blue', 'count', 'toc']).float();
  return output_img;
}
// spike
// This function highlights backscatter maxima in color
// hue: date of maximum, saturation: y ratio max/median, value: median [decibels]
function find_spike (change_coll, start, end) {
  // main computations
  var spike_images = change_coll.map( function (image) {
    return image.addBands(image.metadata('system:time_start'));
  });
  var spike_mosaic = spike_images.qualityMosaic('y');
  var median = spike_images.select('y').median().rename('before');
  var high = spike_mosaic.select('y').rename('after');
  var diff = high.subtract(median).rename('difference');
  var ratio = diff.expression('10.0**(b()/10.0)'); // =y_max/y_median
  // compute the dates for the legend
  start = ee.Date(start).millis();
  var range = ee.Date(end).millis().subtract(start);
  // create hsv summary image
  var time = spike_mosaic.select('system:time_start').rename('toc');
  var rgb = ee.Image.cat(time.subtract(start).divide(range).multiply(6/5), // clipping to hues from red to magenta, i.e. rygcbm
                         ratio.subtract(1).divide(9), // clipping to ratios from 1 to 10.
                         median.add(20).divide(20)
                        ).hsvToRgb();
  rgb = ee.Image.cat(rgb, median, high, time);
  return rgb;
}
// =======================================
// export basic functions
// =======================================
exports.without_steep = without_steep;
exports.get_season_model = get_season_model;
exports.without_season = without_season;
exports.fit_line = fit_line;
exports.fit_step = fit_step;
exports.find_spike = find_spike;
// =======================================
// helper functions for UI
// =======================================
// date formatting
function pad (int) { return ('0' + int).slice(-2); }
function string_from_date (date) {
  return date.getUTCFullYear() + '-' + pad(date.getUTCMonth()+1) + '-' + pad(date.getUTCDate());
}
// custom date slider for UI
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
  mini_panel.getDate = function () {
    mini_panel.box.style().set('color', 'black');
    if (listen_slider) {
      var date = new Date(NOW);
      date.setUTCDate(date.getUTCDate() + mini_panel.slider.getValue());
      listen_textbox = false;
      mini_panel.box.setValue(string_from_date(date));
      listen_textbox = true;
      return date;
    }
  };
  // link textbox and slider
  mini_panel.slider.onSlide(mini_panel.getDate);
  mini_panel.box.onChange( function (text, box) {
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
// help box
var help_text = ui.Label({
  value: 'This application can summarize a time series in one RGB image. ' +
  'The options on the right side control how. ' +
  'Do not forget to zoom in and to press Go!' +
  'The "inspect pixels" toggle on the left side allows you to plot the time series at any pixel.' +
  'For detailed explanations, refer to the user handbook at sites.google.com/view/sisterfaq/home .',
  style: {position: 'bottom-center', width: '370px', whiteSpace: 'pre-wrap'},
});
var help_cross = ui.Button({
  label: 'X',
  style: {position: 'top-right'},
});
var help_panel = ui.Panel({
  layout: ui.Panel.Layout.absolute(),
  widgets: [help_cross, help_text],
  style: {width: '400px', height: '200px'},
});
Map.add(help_panel);
help_cross.onClick( function () {help_panel.style().set('shown', false); });
function show_help_panel(text) {
  help_panel.style().set('shown', true);
  help_text.setValue(text);
}
// unique identifier
var fit_dropdown;
function change_uid () {
  var random_digits = Math.random().toString().substr(2, 3); // 3 random digits
    var short_pol = pol_dropdown.getValue().slice(0, 4);
    var short_fit = fit_dropdown.getValue().slice(2, 7);
    var name = short_pol + '_' + short_fit + ' ' + random_digits;
    name_box.setValue(name);
}
// function to figure out whether there is a training period
function show_training (_) {
  var season = season_toggle.getValue();
  var fit = fit_dropdown.getValue();
  var need_train = season || (fit == STEP) || (fit == TOC);
  train_panel.style().set('shown', need_train);
  d1_slide.style().set('shown', need_train);
}
// =======================================
// UI
// =======================================
// data source
var sar_panel, ms_panel;
var data_label = ui.Label('data source:');
var data_dropdown = ui.Select({
  items: ['Sentinel-1 SAR', 'Sentinel-2 multispectral'],
  value: 'Sentinel-1 SAR',
  style: {stretch: 'horizontal'},
  onChange: function (new_value) {
    // show ascending/descending dropdown only for SAR
    pass_label.style().set('shown', (new_value == 'Sentinel-1 SAR'));
    pass_panel.style().set('shown', (new_value == 'Sentinel-1 SAR'));
    // show cloud stuff only for multispectral
    cloud_panel.style().set('shown', (new_value == 'Sentinel-2 multispectral'));
    if (new_value == 'Sentinel-1 SAR') {
      pol_dropdown.items().reset(['VV', 'VH']);
      pol_dropdown.setValue('VV');
      pol_panel.remove(index_help);
      pol_panel.add(pol_help);
      pol_label.setValue('polarization');
    }
    else {
      pol_dropdown.items().reset(SEN2INDICES);
      pol_dropdown.setValue(NDVI);
      pol_panel.remove(pol_help);
      pol_panel.add(index_help);
      pol_label.setValue('index:');
    }
  },
});
var data_help = ui.Button({
  label: '?',
  onClick: function () {
    switch (data_dropdown.getValue()) {
      case 'Sentinel-1':
        show_help_panel(
          'Synthetic aperture radar images from Sentinel-1. ' +
          '15 meter resolution. Good for seeing through clouds.');
        break;
      case 'Sentinel-2 multispectral':
        show_help_panel(
          'Multispectral images from Sentinel-2. ' +
          '10-meter resolution for most bands.');
        break;
    }
  }
});
var data_panel = ui.Panel({
  widgets: [data_dropdown, data_help],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal'},
});
// cloud slider for multispectral imagery
var cloud_label = ui.Label('max cloud percentage');
var cloud_slider = ui.Slider({
  min: 0,
  max: 20,
  value: 10,
  step: 1,
  style: {stretch: 'horizontal'}
});
var percent_sign = ui.Label('%');
var cloud_slider_with_percent = ui.Panel({
  widgets: [cloud_slider, percent_sign],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal'}
});
var cloud_help = ui.Button({
  label: '?',
  onClick: function () {
    show_help_panel(
      'The maximum allowed percentage of clouds on each image. ' +
      'The higher you set this, the more images will be included ' +
      'but some of them will be cloudy.' +
      'Unfortunatly, pixel-based cloud masking is not available.'
      );
  }
});
var vertical_cloud_panel = ui.Panel({
  widgets: [cloud_label, cloud_slider_with_percent],
  style: {stretch: 'horizontal'}
});
var cloud_panel = ui.Panel({
  widgets: [vertical_cloud_panel, cloud_help],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal', shown: false},
});
// toggle to remove harmonic (seasonal) signal
var season_toggle = ui.Checkbox({
  label: 'remove seasonal signal',
  style: {stretch: 'both'},
  onChange: show_training
});
var season_help = ui.Button({
  label: '?',
  onClick: function () {
    show_help_panel(
      'At each pixel a sine-function is fit to the time series of pixel values in the training period. ' + 
      'Subsequently this seasonal component is subtracted across the time series. ' +
      'Note that this step only makes sense if the training period is at least one year long. ' +
      'Even then this step tends to introduce noise.');
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
    show_help_panel(
      'VH: Transmitted radio waves are vertically polarized and horizontally polarized waves are received.\n\n' +
      'VV: Both transmitted and received radio waves are vertically polarized.');
  }
});
var index_help = ui.Button({
  label: '?',
  onClick: function () {
    show_help_panel(
      'intensity: Visible spectrum ("grayscale") image. B2+B3+B4\n' +
      'NDVI: Normalized difference vegetation index. (B8-B4)/(B8+B4)\n' +
      'NBR: Normalized burn ratio. (B8-B12)/(B8+B12)');
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
  //value: 'first one',
  style: {stretch: 'horizontal'},
  onChange: function (value) { name_box.edited = true; }
});
name_box.edited = false;
// dropdown to select between ascending and descending polarization or combinations thereof
var pass_label = ui.Label('satellite pass direction:');
var pass_dropdown = ui.Select({
  items: ['ascending', 'descending', 'best', 'filter steep terrain (>10°)', 'combine'],
  value: 'combine',
  style: {stretch: 'horizontal'},
});
var pass_help_dict = ee.Dictionary([
  'ascending', 'ascending: Only images from ascending satellite passes are used to build the composite image. If the image is still empty when fully loaded, choose "descending" instead.',
  'descending', 'descending: Only images from descending satellite passes are used to build the composite image. If the image is still empty when fully loaded, choose "ascending" instead.',
  'best', 'best: For each pixel, only images from satellites passing on the uphill side are used. The resulting composite images are more crisp but have discontinuities in flat areas.',
  'filter steep terrain (>10°)', 'filter steep terrain (>10°): A mix of "combine" and "best". For pixels in steep terrain (>10°), only images from satellites passing on the uphill side are used.',
  'combine', 'combine: The full time series with both ascending and descending node images is used to build the composite image.'
]);
var pass_help = ui.Button({
  label: '?',
  onClick: function () {
    show_help_panel(pass_help_dict.get(pass_dropdown.getValue()));
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
  items: [TREND, SEN, STEP, TOC, SPIKE],
  value: TREND,
  style: {stretch: 'horizontal'},
  onChange: show_training
});
var FIT_EXPLANATION = 'If this does not make sense to you, ' +
  'you can check out this function by using the 📉 feature on the very left ' +
  'after adding at least one layer. ';
var fit_help = ui.Button({
  label: '?',
  onClick: function () {
    switch (fit_dropdown.getValue()) {
      case TREND:
        show_help_panel(
          TREND + ': ' +
          'At each pixel a straight line is fit to the values. ' +
          'Specifically, we use a least-squares fit. ' +
          FIT_EXPLANATION +
          'The composite shows the start (red) and end (green) values ' +
          'of this trend line as well as R² in blue.');
        break;
      case SEN:
        show_help_panel(
          SEN + ': ' +
          'At each pixel a straight line is fit to the values. ' +
          'Specifically, we use a Theil-Sen estimator for a robust linear fit. ' +
          FIT_EXPLANATION +
          'The composite shows the start (red) and end (green) values ' +
          'of this trend line as well as R² in blue.');
        break;
      case STEP:
        show_help_panel(
          STEP + ': ' +
          'At each pixel a step function with a single discontinuity is fit to the backscatter values. ' +
          FIT_EXPLANATION +
          'The composite shows the left (red) and right (green) values of the step function, ' +
          'as well as R² in blue. ' +
          'Hence, purple areas indicate where the landscape got darker, ' +
          'and cyan areas indicate where it got brighter.');
        break;
      case TOC:
        show_help_panel(
          TOC + ': ' +
          'At each pixel a step function with a single discontinuity is fit to the backscatter values. ' +
          FIT_EXPLANATION +
          'The resulting composite shows the follwing: ' +
          'hue: date of step; saturation: R²; value: left value (same as red in the step composite).'
          );
        break;
      case SPIKE:
        show_help_panel(
          SPIKE + ': ' +
          'At each pixel the maximum and average of the time series is computed. ' +
          FIT_EXPLANATION +
          'The resulting composite shows the following: ' +
          'hue: date of maximum; saturation: max/average; value: average.');
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
var time_label = ui.Label('time period(s):');
var d1_slide = single_slider(-180);
d1_slide.slider.onChange( function (val) {
  d2_slide.slider.setValue(Math.max(d2_slide.slider.getValue(), val));
});
var train_label = ui.Label('↕ training period ↕', {stretch: 'both'});
var train_help = ui.Button({
  label: '?',
  onClick: function () {
    show_help_panel(
      'The training period for season removal ' +
      'and also the period where the step function cannot have a step.');
  }
});
var train_panel = ui.Panel({
  widgets: [train_label, train_help],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal'},
});
show_training(); // hide d1_slide
var d2_slide = single_slider(-90);
d2_slide.slider.onChange( function (val) {
  d1_slide.slider.setValue(Math.min(d1_slide.slider.getValue(), val));
  d3_slide.slider.setValue(Math.max(d3_slide.slider.getValue(), val));
});
var monitor_label = ui.Label('↕ monitoring period ↕', {stretch: 'both'});
var monitor_help = ui.Button({
  label: '?',
  onClick: function () {
    show_help_panel(
      'The trend or spike function will be fit to this period. ' +
      'The step function will be fit to the training period plus the monitoring period. ' +
      'but the step can only occur in this (monitoring) period.');
  }
});
var monitor_panel = ui.Panel({
  widgets: [monitor_label, monitor_help],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch: 'horizontal'},
});
var d3_slide = single_slider(0);
d3_slide.slider.onChange( function (val) {
  d2_slide.slider.setValue(Math.min(d2_slide.slider.getValue(), val));
});
// button to calculate
var apply_button = ui.Button({
  label: 'Go! Add layer!',
  style: {stretch: 'horizontal', border: '2px solid green'}
});
// acknowledgements
var thanks_label = ui.Label({
  value: 
    'The user handbook at sites.google.com/view/sisterfaq/home will come in handy.' +
    'If you have a question or feature request, ' +
    'do not hesitate to contact me at l.schreiber@alumni.ubc.ca' +
    'Thanks to the Integrated Remote Sensing Studio at the University of British Columbia, ' +
    'Urthecast, CARIC, and MITACS for funding part of this project! ' +
    'For details and citation, refer to: https://doi.org/f6h . ',
  style: {width: '200px'}
});
// panel with all the options
var sar_panel = ui.Panel({
  widgets: [
    data_panel,
    cloud_panel,
    season_panel,
    pol_label, pol_panel,
    pass_label, pass_panel,
    fit_label, fit_panel,
    time_label, d1_slide, train_panel, d2_slide, monitor_panel, d3_slide,
    name_label, name_box,
    apply_button, thanks_label
  ],
});
ui.root.add(sar_panel);
// =======================================
// full Sentinel-2 collections
// =======================================
// cloud masking with QA60 band
// source: https://developers.google.com/earth-engine/datasets/catalog/COPERNICUS_S2_SR
/*
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.mask(mask).divide(10000).select(0);
}
function maskS2clouds(image) {
  var no_clouds = image.select('QA60').eq(2048);
  return image.mask(no_clouds).divide(10000).select(0);
}
*/
// monochrome visible spectrum intensity
// 10000 and 0.3 from data catalog info, 2 out of thin air
var intensity_full = Sen2.map( function (image) {
  return image.select()
    .addBands(image.expression("1/10000 * ( b('B2') + b('B3') + b('B4') )"))
    .rename(I);
    //.addBands(image.select('QA60'));
});
// Normalized Difference Vegetation Index
// source: https://www.indexdatabase.de/db/si-single.php?sensor_id=96&rsindex_id=58
var ndvi_full = Sen2.map( function (image) {
  return image.select()
    .addBands(image.normalizedDifference(['B8', 'B4']))
    .rename(NDVI);
    //.addBands(image.select('QA60'));
});
// Normalized Burn Ratio
var nbr_full = Sen2.map( function (image) {
  return image.select()
    .addBands(image.normalizedDifference(['B8', 'B12']))
    .rename(NBR);
    //.addBands(image.select('QA60'));
});
// maybe implement these:
// Enhanced Vegetation Index: https://www.indexdatabase.de/db/si-single.php?sensor_id=96&rsindex_id=16
// Global Vegetation Moisture Index: https://www.indexdatabase.de/db/si-single.php?sensor_id=96&rsindex_id=372
// all indices in a combined collection for the timeseries chart
var sen2_indices = ndvi_full.merge(nbr_full).merge(intensity_full);
var sen2_indices = intensity_full.merge(ndvi_full).merge(nbr_full);
// =======================================  
// function for loading the time series composite images
// =======================================
var show = function () {
  // deal with layer naming
  if (! name_box.edited) {
    change_uid();
  }
  var layer_name = name_box.getValue();
  name_box.edited = false;
  // print
  print('loading ' + layer_name);
  // get settings
  var start_date = d1_slide.getDate();
  var steady_date = d2_slide.getDate();
  var end_date = d3_slide.getDate();
  var settings = {
    start: start_date,
    steady: steady_date,
    end: end_date,
    min_obs: MIN_OBS,
    cloud_percent: cloud_slider.getValue(),
    season: season_toggle.getValue(),
    data: data_dropdown.getValue(),
    pol: pol_dropdown.getValue(),
    pass: pass_dropdown.getValue(),
    fit: fit_dropdown.getValue(),
  };
  var server_settings = ee.Dictionary(settings);
  print(start_date, steady_date, end_date);
  // preprocessing Sen1
  var Sen1filtered = Sen1.filterDate(start_date, end_date)
                         .filter(ee.Filter.listContains('transmitterReceiverPolarisation', settings.pol))
                         .select(settings.pol);
  var pas_dict = ee.Dictionary(['ascending', Sen1filtered.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING')),
                                'descending', Sen1filtered.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING')),
                                'best', Sen1filtered.map(without_steep_0),
                                'filter steep terrain (>10°)', Sen1filtered.map(without_steep_10),
                                'combine', Sen1filtered]);
  var Sen1passfiltered = pas_dict.get(server_settings.get('pass'));
  // preprocessing Sentinel-2
  var index_dict = ee.Dictionary([
    'VV', ee.ImageCollection([]),
    'VH', ee.ImageCollection([]),
    I, intensity_full,
    NDVI, ndvi_full,
    NBR, nbr_full
  ]);
  var Sen2filtered = ee.ImageCollection(index_dict.get(server_settings.get('pol')))
    .filterDate(start_date, end_date)
    .filter(ee.Filter.lte('CLOUDY_PIXEL_PERCENTAGE', settings.cloud_percent));
    //.map(maskS2clouds);
  // selecting Sen1 or Sen2
  var data_dict = ee.Dictionary([
    'Sentinel-1 SAR', Sen1passfiltered,
    'Sentinel-2 multispectral', Sen2filtered,
  ]);
  var coll_filtered = ee.ImageCollection(data_dict.get(server_settings.get('data')))
    .map( function (img) {return img.rename('y')});
  // get harmonic season model and remove it from images
  var coll_filtered_steady = coll_filtered.filterDate(start_date, steady_date);
  coll_filtered = ee.Algorithms.If(server_settings.get('season'),
                                   without_season(coll_filtered, coll_filtered_steady),
                                   coll_filtered);
  coll_filtered = ee.ImageCollection(coll_filtered);
  coll_filtered_steady = coll_filtered.filterDate(start_date, steady_date);
  var coll_timeframe = coll_filtered.filterDate(steady_date, end_date);
  // set visialization parameters. r=red, g=green, b=blue.
  var imin = 0.0; // lower bound for NDVI and NBR
  var viz_rgb_dict = {
    VV: { min: [-20.0, -20.0, 0.0], max: [0.0, 0.0, 1.0] },
    VH: { min: [-30.0, -30.0, 0.0], max: [0.0, 0.0, 1.0] }
  };
  viz_rgb_dict[I] = { min: [0.0, 0.0, 0.0], max: [1.0, 1.0, 1.0] };
  viz_rgb_dict[NDVI] = { min: [imin, imin, 0.0], max: [1.0, 1.0, 1.0] };
  viz_rgb_dict[NBR] = { min: [imin, imin, 0.0], max: [1.0, 1.0, 1.0] };
  var viz = viz_rgb_dict[settings.pol];
  // add layer with time series composite image to map
  switch (settings.fit) {
    case TREND:
    case SEN:
      var trend_type = settings.fit == TREND ? 'lsq' : 'sen';
      var trend_composite = fit_line(coll_timeframe, steady_date, end_date, trend_type);
      trend_composite = trend_composite.set('settings', server_settings);
      Map.addLayer(trend_composite, viz, layer_name);
      break;
    case STEP:
      var step_composite = fit_step(coll_filtered, coll_timeframe, MIN_OBS);
      step_composite = step_composite.set('settings', server_settings);
      Map.addLayer(step_composite, viz, layer_name);
      break;
    case TOC:
      var toc_img = fit_toc(coll_filtered, coll_timeframe, MIN_OBS, steady_date, end_date);
      toc_img = toc_img.set('settings', server_settings);
      Map.addLayer(toc_img, {}, layer_name);
      break;
    case SPIKE:
      var widgets = Map.widgets();
      var spike_img = find_spike(coll_timeframe, steady_date, end_date);
      spike_img = spike_img.set('settings', server_settings);
      Map.addLayer(spike_img, {}, layer_name);
      break;
  }
  if (settings.fit == SPIKE || settings.fit == TOC) {
    // remove previous colorbar
    Map.widgets().forEach( function (element, index) {
      if ('is_colorbar' in element) {
        Map.remove(element);
      }
    });
    // add spike image legend to bottom of screen
    var start = settings.steady.getTime();
    var range = settings.end.getTime() - start;
    var dates = [{bg:'red', c:'white', d: start + 0}, // date as POSIX timestamp
                 {bg:'yellow', c:'black', d: start + range/5},
                 {bg:'00FF00', c:'black', d: start + range*2/5},
                 {bg:'cyan', c:'black', d: start + range*3/5},
                 {bg:'blue', c:'white', d: start + range*4/5},
                 {bg:'magenta', c:'white', d: start + range}
                ];
    var legends = [ui.Label('spike date\n(topmost spike\nor toc layer): ')];
    for (var i=0; i<dates.length; i++) {
      legends.push(ui.Label(string_from_date(new Date(dates[i].d)),
                            {color: dates[i].c, backgroundColor: dates[i].bg}
                           ));
    }
    var colorbar = ui.Panel(
      legends,
      ui.Panel.Layout.flow('vertical'),
      {position: 'bottom-left', whiteSpace: 'pre'}
    );
    colorbar.is_colorbar = true;
    Map.add(colorbar);
  }
};
apply_button.onClick(show);
// =======================================
// Export Map Button
// =======================================
var export_map_button = ui.Button({
  label: 'export a layer',
  style: {position: 'top-right'},
  onClick: function (button) {
    var layers = Map.layers();
    var layer_objects = [];
    layers.forEach( function (layer, index) {
      layer_objects.push({label: layer.getName(), value: layer});
    });
    layer_objects.push({label: 'export all', value: layers});
    Map.add(ui.Select({
      items: layer_objects,
      style: {position: 'top-right'},
      onChange: function (layer, dropdown) {
        if (layer instanceof ui.Map.Layer) {
          Export.image.toDrive({
            image: layer.getEeObject().float().set('visualization', layer.getVisParams()),
            description: layer.getName().replace(/[^a-z0-9]/gi, '_'),
            folder: 'new_change_composites',
            scale: 10, // meters
            region: Map.getBounds(true),
            maxPixels: 1e11 // increase pixel limit to 1e11 pixels, allowing bigger files
          });
        }
        else if (layer instanceof ui.data.ActiveList) {
          layers.forEach( function (layer, index) {
            Export.image.toDrive({
              image: layer.getEeObject().float().set('visualization', layer.getVisParams()),
              description: layer.getName().replace(/[^a-z0-9]/gi, '_'),
              folder: 'new_change_composites' + new Date().toISOString(),
              scale: 10, // meters
              region: Map.getBounds(true),
              maxPixels: 1e11 // increase pixel limit to 1e11 pixels, allowing bigger files
            });
          });
        }
        else throw 'Invalid selection for export!';
        Map.remove(dropdown);
      }
    }));
  }
});
//Map.add(export_map_button);
// =======================================
// Show time series on click
// =======================================
// show fit function
function all_fits (point, data_selected) {
  function layer_fit (layer) {
    var img = ee.Image(layer.getEeObject());
    var settings = ee.Dictionary(img.get('settings'));
    var data_settings = ee.String(settings.get('data'));
    var fit = settings.get('fit');
    var start = ee.Date(settings.get('start')).millis();
    var steady = ee.Date(settings.get('steady')).millis();
    var end = ee.Date(settings.get('end')).millis();
    var dict = img.reduceRegion(ee.Reducer.median(), point, 1);
    var change = dict.get('toc');
    var left = dict.get('before');
    var right = dict.get('after');
    var trend_coll = ee.List([
      ee.Image.constant(left).set('system:time_start', steady),
      ee.Image.constant(right).set('system:time_start', end)
    ]);
    var step_coll = ee.List([
      ee.Image.constant(left).set('system:time_start', start),
      ee.Image.constant(left).set('system:time_start', steady),
      ee.Image.constant(left).set('system:time_start', change),
      ee.Image.constant(right).set('system:time_start', change),
      ee.Image.constant(right).set('system:time_start', end)
    ]);
    var spike_coll = ee.List([
      ee.Image.constant(left).set('system:time_start', steady),
      ee.Image.constant(left).set('system:time_start', change),
      ee.Image.constant(right).set('system:time_start', change),
      ee.Image.constant(left).set('system:time_start', change),
      ee.Image.constant(left).set('system:time_start', end)
    ]);
    var fake_img_dict = ee.Dictionary([
      TREND, trend_coll,
      SEN, trend_coll,
      STEP, step_coll,
      TOC, step_coll,
      SPIKE, spike_coll
    ]);
    var fake_img_coll = ee.List(fake_img_dict.get(fit));
    var name = layer.getName();
    fake_img_coll = fake_img_coll.map(function (img) { return ee.Image(img).rename(name); } );
    fake_img_coll = ee.Algorithms.If(
      ee.Algorithms.IsEqual(data_settings, data_selected), fake_img_coll, ee.List([]));
    return fake_img_coll;
  }
  var fake_colls = ee.List(Map.layers().map(layer_fit));
  fake_colls = ee.ImageCollection.fromImages(fake_colls.flatten());
  return fake_colls;
}
// separate ascending and descending columns
function asc_des_columns (img) {
  var band_names = img.bandNames().remove('angle');
  var new_names = band_names.map( function (name) {
    return ee.String(name).cat('_').cat(ee.String(img.get('orbitProperties_pass')).toLowerCase());
  });
  return img.select(band_names, new_names).set('pol_orbit', new_names);
}
var Sen1_asc_des = Sen1.map(asc_des_columns);
// chart options
var options = {
  vAxis: vAxis_dB,
  hAxis: {title: 'acquisition start dates (UTC)'},
  interpolateNulls: true,
  lineWidth: 1,
  pointSize: 2,
};
var vAxis_dB = {title: 'SAR backscatter coefficient sigma-0 [dB]',
                viewWindow: {min: -30.0, max: 0.0},
                gridlines: {count: 6}};
var vAxis_ms = {title: 'Sentinel-2 indices',
                viewWindow: {min: -0.25, max: 1.0},
                gridlines: {count: 5}};
var series_sen2 = {
  0: {lineWidth: 0, pointSize: 2, color: '#ff0000'}, // NBR
  1: {lineWidth: 0, pointSize: 2, color: '#0000ff'}, // NDVI
  2: {lineWidth: 0, pointSize: 2, color: '#000000'}, // intensity
};
var colors = ee.Dictionary({
//var colors = {
  HH_ascending: {lineWidth: 0, pointShape: 'triangle', pointSize: 4, color: '#0000aa'},  // light blue
  HH_descending: {lineWidth: 0, pointShape: 'triangle', pointSize: 4, color: '#aa0000'}, // light red
  HV_ascending: {lineWidth: 0, pointShape: 'triangle', pointSize: 4, color: '#9999ff'},  // dark blue
  HV_descending: {lineWidth: 0, pointShape: 'triangle', pointSize: 4, color: '#ff9999'}, // dark red
  VH_ascending: {lineWidth: 0, pointSize: 2, color: '#9999ff'},  // light blue
  VH_descending: {lineWidth: 0, pointSize: 2, color: '#ff9999'}, // light red
  VV_ascending: {lineWidth: 0, pointSize: 2, color: '#0000aa'},  // dark blue
  VV_descending: {lineWidth: 0, pointSize: 2, color: '#aa0000'}, // dark red
});
function get_series_colors_old(pol_orbits) {
  // Sort the list because series legends are in alphabetical order.
  // Unfortunately we can't access them by name but only by position.
  pol_orbits = ee.List(pol_orbits).sort();
  var series_list = pol_orbits.map( function(series_name) {
    return colors.get(series_name);
  });
  // var enumeration = ee.List.sequence(0, series_list.length().subtract(1))
  //                  .map( function(int) {return ee.Number(int).format('%d')});
  var enumeration = ee.List(['0', '1', '2', '3', '4', '5', '6', '7'])
                    .slice(0, series_list.length());
  series_list = ee.Dictionary.fromLists(enumeration, series_list);
  return series_list.aside(print);
}
function get_series_colors(pol_orbits) {
  // Sort the list because series legends are in alphabetical order.
  // Unfortunately we can't access them by name but only by position.
  pol_orbits.sort();
  var series_list = pol_orbits.map( function(series_name) {
    return colors[series_name];
  });
  return series_list;
}
// checkbox: if checked clicking the map will produce a time series chart
function change_cursor (bool, box) {
  if(bool) Map.style().set({cursor: 'crosshair'});
  else Map.style().set({cursor: 'hand'});
}
var box_inspect = ui.Checkbox({
  label: 'show pixel time series 📉',
  value: false,
  onChange: change_cursor,
  style: {backgroundColor: 'green', color: 'white', padding: '10px',
          stretch: 'horizontal', position: 'top-left'}
});
Map.add(box_inspect);
// function to compute time series chart
function show_chart (coords) {
  if(box_inspect.getValue()) {
    // get point from coordinates
    var coord_array = Object.keys(coords).map(function (key) { return coords[key]; });
    var point = ee.Geometry.Point(coord_array);
    // get random color
    // source: https://stackoverflow.com/a/5365036/4691830
    var random_color = '#' + Math.random().toString(16).slice(-6);
    // add marker to map
    var drawing_tools = Map.drawingTools();
    var geometries = [point];
    drawing_tools.addLayer(geometries, 'selected_pixel', random_color);
    // data source?
    var coll;
    var data = data_dropdown.getValue();
    switch (data) {
      case 'Sentinel-1 SAR':
        coll = Sen1_asc_des.filterBounds(point);
        options.vAxis = vAxis_dB;
        options.titleTextStyle = {color: random_color};
        options = ee.Dictionary(options); //
        var pol_orbits = coll.aggregate_array('pol_orbit').flatten().distinct();
        options = options.set('series', get_series_colors_old(pol_orbits));
        // options.series = get_series_colors(pol_orbits);
        options = options.getInfo();
        break;
      case 'Sentinel-2 multispectral':
        coll = sen2_indices
          .filterBounds(point)
          .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', cloud_slider.getValue()));
          //.map(maskS2clouds);
        options.vAxis = vAxis_ms;
        options.series = series_sen2;
        break;
    }
    // add fit functions as fake images to collection
    var fake_coll = ee.ImageCollection(all_fits(point, data));
    coll = coll.merge(fake_coll);
    // create chart
    options.title = 'time series. lat: ' + coords.lat + ' lon:' + coords.lon;
    var chart = ui.Chart.image.series({imageCollection: coll, region: point, scale: 1})
                .setOptions(options);
    chart.style().set({width: '900px', height: '280px', padding: '0px', margin: '0px'});
    // add fit function to chart
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