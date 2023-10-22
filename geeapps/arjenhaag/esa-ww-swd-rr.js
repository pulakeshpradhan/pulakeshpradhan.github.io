var S1 = ui.import && ui.import("S1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    S2_1C = ui.import && ui.import("S2_1C", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    L8_SR = ui.import && ui.import("L8_SR", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    JRC_water = ui.import && ui.import("JRC_water", "image", {
      "id": "JRC/GSW1_3/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_3/GlobalSurfaceWater"),
    JRC_monthly = ui.import && ui.import("JRC_monthly", "imageCollection", {
      "id": "JRC/GSW1_3/MonthlyHistory"
    }) || ee.ImageCollection("JRC/GSW1_3/MonthlyHistory"),
    SRTM = ui.import && ui.import("SRTM", "image", {
      "id": "USGS/SRTMGL1_003"
    }) || ee.Image("USGS/SRTMGL1_003"),
    HAND_SRTM30_5000 = ui.import && ui.import("HAND_SRTM30_5000", "image", {
      "id": "users/gena/GlobalHAND/30m/hand-5000"
    }) || ee.Image("users/gena/GlobalHAND/30m/hand-5000"),
    water_final = ui.import && ui.import("water_final", "imageCollection", {
      "id": "users/arjenhaag/WW-SWD/RR/water_final_v2"
    }) || ee.ImageCollection("users/arjenhaag/WW-SWD/RR/water_final_v2"),
    RR_sites = ui.import && ui.import("RR_sites", "table", {
      "id": "users/arjenhaag/WW-SWD/RR/all_RR_sites"
    }) || ee.FeatureCollection("users/arjenhaag/WW-SWD/RR/all_RR_sites");
// ESA World Water - Surface Water Dynamics - Round Robin (results)
// Maps of monthly surface water presence (water/non-water) at 10m for 2018-2020
// ---------------------------------------------------------------------------------------------------- //
// Parameters
// ---------------------------------------------------------------------------------------------------- //
// sites
var site_na = 'Colombia';  // focus
// var site_na = 'Gabon';
// var site_na = 'Mexico';  // focus
// var site_na = 'Zambia';  // focus
// bands
var S1_band   = 'VV';
var S2_BANDS  = ['B2',  'B3',   'B4', 'B8', 'B11',  'B12'];
var L8_BANDS  = ['B2',  'B3',   'B4', 'B5', 'B6',   'B7'];
var STD_NAMES = ['blue','green','red','nir','swir1','swir2'];
// animation
// var timeStep = 500;  // default is 100
var timeStep = 250;  // default is 100
var compact  = true;  // default is false
var a_width  = '400px';   // default is 600px
var position = 'bottom-right';  // default is top-center
// properties
var dates_dict = {
   1: '2018-01',  2: '2018-02',  3: '2018-03',  4: '2018-04',  5: '2018-05',  6: '2018-06',
   7: '2018-07',  8: '2018-08',  9: '2018-09', 10: '2018-10', 11: '2018-11', 12: '2018-12',
  13: '2019-01', 14: '2019-02', 15: '2019-03', 16: '2019-04', 17: '2019-05', 18: '2019-06',
  19: '2019-07', 20: '2019-08', 21: '2019-09', 22: '2019-10', 23: '2019-11', 24: '2019-12',
  25: '2020-01', 26: '2020-02', 27: '2020-03', 28: '2020-04', 29: '2020-05', 30: '2020-06',
  31: '2020-07', 32: '2020-08', 33: '2020-09', 34: '2020-10', 35: '2020-11', 36: '2020-12'
};
// visual parameters
var bands_RGB = ['red','green','blue'];
var bands_SNG = ['swir1','nir','green'];
var visParams_S1 = {bands: [S1_band], min:-25, max:0};
var visParams_opt = {bands:bands_RGB, min:0, max:5000};
var visParams_opt_false = {bands:bands_SNG, min:0, max:5000};
var visParams_water = {min:0, max:1, palette:['white','blue']};
var visParams_water_comb = {min:0, max:2, palette:['white','lightblue','blue']};
var visParams_mask = {min:0, max:1, palette:['white','black']};
var visParams_DEM = {min:0, max:1000, palette:['blue','green','yellow','red','white']};
var visParams_HAND = {min:0, max:50, palette:['blue','green','yellow','red','white']};
// prepare data dictionary, to pull from based on UI selection (for animations)
var data = {
  'None': null,
  'Water maps': {
    'imgs': water_final.select('water'),
    'vis': visParams_water
  },
  // 'Sentinel-1': {
  //   'imgs': S1_asc,
  //   'vis': visParams_S1
  // },
  // 'Sentinel-2': {
  //   'imgs': S2,
  //   'vis': visParams_opt_false
  // },
  // 'Landsat 8': {
  //   'imgs': L8,
  //   'vis': visParams_opt_false
  // }
};
// ---------------------------------------------------------------------------------------------------- //
// Functions
// ---------------------------------------------------------------------------------------------------- //
var animation = require('users/arjenhaag/modules:animation');
// clear map layer(s)
function clearLayer(layer_na) {
  Map.layers().forEach(function(layer) {
    if (layer.get('name') == layer_na) {
      Map.layers().remove(layer);
    }
  });
}
function clearLayers(layers) {
  layers.map(function(n) {
    clearLayer(n);
  });
}
function clearLayersSlider() {
  // clearLayer('site bounds');
  clearLayer('slider: monthly final result');
  clearLayer('slider: monthly JRC water');
  clearLayers(['slider: monthly S1 [asc] (raw)', 'slider: monthly S1 [des] (raw)', 'slider: monthly S2 (raw)', 'slider: monthly L8 (raw)']);
}
// set opacity of layers
function opacityLayer(layer_na, val) {
  Map.layers().forEach(function(layer) {
    if (layer.get('name') == layer_na) {
      layer.setOpacity(val);
    }
  });
}
function opacityLayers(layers, val) {
  layers.map(function(n) {
    opacityLayer(n, val);
  });
}
// toggle layers
function showLayer(layer_na, val) {
  Map.layers().forEach(function(layer) {
    if (layer.get('name') == layer_na) {
      layer.setShown(val);
    }
  });
}
function showLayers(layers, val) {
  layers.map(function(n) {
    showLayer(n, val);
  });
}
// toggle refs
var toggleRefs = function() {
  refs.style().set('shown', !refs.style().get('shown'));
};
// toggle slider
function toggleSlider() {
  // toggle slider
  slider.setDisabled(!slider.getDisabled());
  // toggle text
  slider_date_panel.style().set('shown', !slider_date_panel.style().get('shown'));
  // update map layers
  if (slider.getDisabled() === false) {
    updateSlider(slider.getValue());
    // opacityLayers(['final results min', 'final results mean', 'final results max'], 0);
    showLayers(['final results min', 'final results mean', 'final results max'], false);
  } else {
    clearLayersSlider();
    // opacityLayers(['final results mean'], 1);
    showLayers(['final results mean'], true);
  }
}
// update elements based on slider
function updateSlider(i) {
  // clean map/UI
  // loadAnimation('None');
  // loadGlobal();
  // updateSelection(selector.getValue());
  clearLayer('site bounds');
  // get date
  var year  = ee.Number(i).divide(12).subtract(0.01).floor().add(2018);
  var month = ee.Number(i).mod(12).add(ee.Number(i).mod(12).eq(0).multiply(12));
  var date  = ee.Date.fromYMD(year, month, 1);
  // update displayed date
  var date_str = dates_dict[i];
  slider_date.setValue(date_str);
  // get site
  var site = RR_sites.filter(ee.Filter.eq('site', selector.getValue()));
  // get imagery
  var S1_asc_tmp = S1_asc.filterBounds(site.geometry().bounds()).filterDate(date, date.advance(1, 'month'));
  var S1_des_tmp = S1_des.filterBounds(site.geometry().bounds()).filterDate(date, date.advance(1, 'month'));
  var S1_asc_2_tmp = S1_asc.filterBounds(site.geometry().bounds()).filterDate(date, date.advance(1, 'month'));
  var S1_des_2_tmp = S1_des.filterBounds(site.geometry().bounds()).filterDate(date, date.advance(1, 'month'));
  var S2_tmp = S2.filterBounds(site.geometry().bounds()).filterDate(date, date.advance(1, 'month'));
  var L8_tmp = L8.filterBounds(site.geometry().bounds()).filterDate(date, date.advance(1, 'month'));
  // get JRC
  var JRC_tmp = JRC_monthly.filter(ee.Filter.eq('year', year)).filter(ee.Filter.eq('month', month));
  // JRC_tmp = JRC_tmp.map(function(img) {return img.eq(2).updateMask(img.eq(2))}).first();
  // get results
  var final_tmp = water_final.filterBounds(site.geometry().bounds()).filterDate(date, date.advance(1, 'day')).first();
  // clear relevant layers
  clearLayersSlider();
  // show current layers on map
  Map.addLayer(S1_asc_tmp.median(), visParams_S1, 'slider: monthly S1 [asc] (raw)', false);
  Map.addLayer(S1_des_tmp.median(), visParams_S1, 'slider: monthly S1 [des] (raw)', false);
  Map.addLayer(S2_tmp.median(), visParams_opt_false, 'slider: monthly S2 (raw)', false);
  Map.addLayer(L8_tmp.median(), visParams_opt_false, 'slider: monthly L8 (raw)', false);
  // if (i < 25) {
  //   JRC_tmp = JRC_tmp.first().eq(2).clip(site.geometry());
  //   Map.addLayer(JRC_tmp.updateMask(JRC_tmp), visParams_water, 'slider: monthly JRC water', false);
  // }
  JRC_tmp = JRC_tmp.first().eq(2).clip(site.geometry());
  Map.addLayer(JRC_tmp.updateMask(JRC_tmp), visParams_water, 'slider: monthly JRC water', false);
  Map.addLayer(final_tmp.updateMask(final_tmp), {bands:['water'], min:0, max:1, palette:['white','blue']}, 'slider: monthly final result', true);
  Map.addLayer(ee.Image().byte().paint(site,0,2), {palette:'red'}, 'site bounds', false);
}
function updateGlobal() {
  // add background for all sites
  Map.addLayer(backgrounds, {min:0, max:1, palette:'white'}, 'background', true, 0.5);
  // add global map layers
  Map.addLayer(SRTM, visParams_DEM, 'SRTM DEM', false);
  Map.addLayer(HAND_SRTM30_5000, visParams_HAND, 'HAND (SRTM)', false);
  Map.addLayer(JRC_water, {bands:['occurrence'], min:0, max:100, palette:['white','blue']}, 'JRC occurrence (1984-2020)', false);
  Map.addLayer(HANDmask.not().updateMask(HANDmask.not()), visParams_mask, 'HAND mask (static version)', false);
}
function updateSelection(site_na) {
  // clear relevant map(s) / UI
  clearLayer('site bounds');
  slider.setDisabled(true);
  slider_date_panel.style().set('shown', false);
  slider.setValue(1);
  clearLayersSlider();
  // get site
  var site = RR_sites.filter(ee.Filter.eq('site', site_na));
  // get results
  var final_site = water_final.filterBounds(site.geometry().bounds());
  // add site-specific map layers
  Map.centerObject(site);
  clearLayers(['final results min', 'final results mean', 'final results max']);
  Map.addLayer(final_site.min().updateMask(final_site.min()), {bands:['water'], min:0, max:1, palette:['white','blue']}, 'final results min', false);
  Map.addLayer(final_site.mean().updateMask(final_site.mean()), {bands:['water'], min:0, max:1, palette:['white','blue']}, 'final results mean', true);
  Map.addLayer(final_site.max().updateMask(final_site.max()), {bands:['water'], min:0, max:1, palette:['white','blue']}, 'final results max', false);
  Map.addLayer(ee.Image().byte().paint(site,0,2), {palette:'red'}, 'site bounds', false);
}
var loadAnimation = function(data_name) {
  Map.clear();
  // add animation panel and new layers
  if (data_name !== 'None') {
    Map.addLayer(backgrounds, {min:0, max:1, palette:'white'}, 'background', true, 0.5);
    // clear map/UI
    slider.setValue(1);
    slider.setDisabled(true);
    slider_date_panel.style().set('shown', false);
    slider_button.setDisabled(true);
    selector.setDisabled(true);
    var imgs = ee.ImageCollection(data[data_name]['imgs']).filter(ee.Filter.eq('site', selector.getValue())).sort('system:time_start');
    imgs = imgs.map(function(img) {return img.updateMask(img)});
    var vis  = data[data_name]['vis'];
    // animation_panel = animation.animate(imgs, {
    animation.animate(imgs, {
      'maxFrames': imgs.size(),
      'vis': vis,
      'prefix': data_name,
      // 'label': 'day',
      'label': '{{date}}',
      'timeStep': timeStep,
      'compact': compact,
      'position': position,
      'width': a_width,
      'map': Map
    });
  } else {
    updateGlobal();
    updateSelection(selector.getValue());
    selector.setDisabled(false);
    slider_button.setDisabled(false);
  }
};
// ---------------------------------------------------------------------------------------------------- //
// Processing
// ---------------------------------------------------------------------------------------------------- //
// Sentinel-1
S1 = S1.filterDate('2018-01-01', '2021-01-01')
       .filter(ee.Filter.listContains('transmitterReceiverPolarisation', S1_band));
// split orbits
var S1_asc = S1.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
var S1_des = S1.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
// Sentinel-2
var S2 = S2_1C.filterDate('2018-01-01', '2021-01-01').select(S2_BANDS, STD_NAMES);
// Landsat 8
var L8 = L8_SR.filterDate('2018-01-01', '2021-01-01').select(L8_BANDS, STD_NAMES);
// HAND
var HANDmask = HAND_SRTM30_5000.lt(ee.Number(water_final.get('HAND_mask')));
// get background imagery
var backgrounds = water_final.select('water').max().gt(2).unmask(0).clip(RR_sites.geometry());
// ---------------------------------------------------------------------------------------------------- //
// UI
// ---------------------------------------------------------------------------------------------------- //
// padding/margin = 1 (all), 2 (top/bottom,right/left), 3 (top,right/left,bottom), 4 (top,right,bottom,left)
// intro
var intro = ui.Panel([
  // title
  ui.Label({
    value: 'ESA WW-SWD RR',
    style: {fontSize:'20px', fontWeight:'bold'}
  }),
  // intro texts
  ui.Label({
    value: "Visualization of monthly water maps (2018-2020) for ESA WW-SWD RR.",
    style: {fontSize:'12px', padding:'0px'}
  }),
  ui.Label({
    value: "The maps are at 10 meter resolution, derived from Sentinel-1, Sentinel-2 and Landsat 8 imagery " +
           "for 4 sites across the globe, specifically for the purpose of a comparison study of water " +
           "detection methods within ESA's World Water - Surface Water Dynamics (WW-SWD) project.",
    style: {fontSize:'12px', padding:'0px'}
  }),
  ui.Label({
    value: "More information on this comparison",
    style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 8px'}
  }),
  ui.Panel([
    ui.Label({
      value: "study is available",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "here",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 3px'},
      targetUrl: "https://worldwater.earth/elementor-4282/"
    }),
    ui.Label({
      value: ".",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 0px'}
    })
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Label({
    value: "For more information on this application",
    style: {fontSize:'11px', padding:'0px', margin:'7px 0px 0px 8px'}
  }),
  ui.Panel([
    ui.Label({
      value: "please contact",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "arjen.haag@deltares.nl",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 3px'}
    })
  ], ui.Panel.Layout.flow('horizontal'))
]);
// site selector
var selector = ui.Select({
  items: ['Colombia', 'Gabon', 'Mexico', 'Zambia'],
  onChange: updateSelection,
  style: {width: '200px'}
});
var selector_panel = ui.Panel([
  ui.Label({value: 'Site selection:', style: {fontWeight: 'bold'}}),
  selector
]);
// image slider(s)
var slider_button = ui.Button('(De)activate slider', toggleSlider);
var slider = ui.Slider({
  min:1,
  max:36,
  value:1,
  step:1,
  onChange: updateSlider,
  style: {width:'200px'},
  disabled: true
});
var slider_date = ui.Label(dates_dict[1]);
var slider_date_panel = ui.Panel(
  [ui.Label('Slider date:'), slider_date],
  ui.Panel.Layout.flow('horizontal'),
  {shown:false}
);
var slider_panel = ui.Panel([
  ui.Label({value: 'Monthly maps (manual slider):', style: {fontWeight: 'bold'}}),
  slider_button,
  slider,
  slider_date_panel,
  ui.Label({
    value: "Activating the slider will add monthly map layers, including (unprocessed) satellite imagery and data from the JRC global surface water dataset to compare with.",
    style: {fontSize:'11px', padding:'0px'}
  })
]);
var selector_animate = ui.Select({
  items: ['None', 'Water maps'],//, 'Sentinel-1', 'Sentinel-2', 'Landsat 8'],
  value: 'None',
  onChange: loadAnimation,
  style: {width: '200px'}
});
var selector_animate_panel = ui.Panel([
  ui.Label({value: 'Monthly maps (animation):', style: {fontWeight: 'bold'}}),
  selector_animate,
  ui.Label({
    value: "Activating the animations will remove all current map layers and deactivate the other application elements. " +
           "Select 'None' to reactivate those. Please wait for all layers to be loaded to ensure a smooth and complete animation.",
    style: {fontSize:'11px', padding:'0px'}
  })
]);
// references
var refs = ui.Panel([
  ui.Label({
    value: "Water maps created within the ongoing",
    style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 8px'}
  }),
  ui.Panel([
    ui.Label({
      value: "SERVIR-Mekong",
      targetUrl: "https://servir.adpc.net/",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "initiative, derived with",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 3px'}
    })
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "edge-Otsu algorithm (",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Markert et al. 2020",
      targetUrl: "https://doi.org/10.3390/rs12152469",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 0px'}
    }),
    ui.Label({
      value: ")",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 0px'}
    })
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Label({
    value: "Datasets:",
    style: {fontSize:'11px', padding:'0px', margin:'3px 0px 0px 8px'}
  }),
  ui.Panel([
    ui.Label({
      value: "- Sentinel-1:",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Copernicus Sentinel data",
      targetUrl: "http://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-1",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 3px'}
    })
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "- Sentinel-2:",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Copernicus Sentinel data",
      targetUrl: "http://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-2",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 3px'}
    })
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "- Landsat 8:",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "U.S. Geological Survey",
      targetUrl: "https://www.usgs.gov/core-science-systems/nli/landsat",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 3px'}
    })
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "- JRC water:",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Pekel et al. (2016)",
      targetUrl: "https://global-surface-water.appspot.com/",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 3px'}
    })
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "- SRTM DEM:",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Farr et al. (2007)",
      targetUrl: "https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2005RG000183",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 3px'}
    })
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "- Global HAND:",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Donchyts et al. (2016)",
      targetUrl: "https://meetingorganizer.copernicus.org/EGU2016/EGU2016-17445-3.pdf",
      style: {fontSize:'11px', padding:'0px', margin:'0px 0px 0px 3px'}
    })
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Label({
    value: "Contains modified Copernicus Sentinel data [2020]",
    style: {fontSize:'11px', padding:'0px', margin:'3px 0px 0px 8px'}
  }),
  ui.Label({
    value: "Animation code by Gennadii Donchyts",
    style: {fontSize:'11px', padding:'0px', margin:'3px 0px 3px 8px'}
  })
], ui.Panel.Layout.flow('vertical'), {shown: false});
var refs_panel = ui.Panel([
  ui.Panel([
    ui.Button({label:'Show/hide references', onClick:toggleRefs})
  ], ui.Panel.Layout.flow('horizontal')),
  refs
]);
// panel combining relevant UI elements for the ui.root
var panel = ui.Panel({
  widgets: [intro, selector_panel, slider_panel, selector_animate_panel, refs_panel],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    width: '230px'
  }
});
// add the panel to the ui.root
ui.root.insert(0, panel);
// ---------------------------------------------------------------------------------------------------- //
// Initialization
// ---------------------------------------------------------------------------------------------------- //
// add global map layers
updateGlobal();
// intialize
selector.setValue(site_na);