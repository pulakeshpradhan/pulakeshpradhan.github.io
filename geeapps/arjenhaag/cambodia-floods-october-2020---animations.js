var adm0 = ui.import && ui.import("adm0", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0"),
    adm1 = ui.import && ui.import("adm1", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level1"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level1"),
    adm2 = ui.import && ui.import("adm2", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2"),
    basins5 = ui.import && ui.import("basins5", "table", {
      "id": "WWF/HydroSHEDS/v1/Basins/hybas_5"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_5"),
    basins6 = ui.import && ui.import("basins6", "table", {
      "id": "WWF/HydroSHEDS/v1/Basins/hybas_6"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_6"),
    basins7 = ui.import && ui.import("basins7", "table", {
      "id": "WWF/HydroSHEDS/v1/Basins/hybas_7"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_7"),
    basins8 = ui.import && ui.import("basins8", "table", {
      "id": "WWF/HydroSHEDS/v1/Basins/hybas_8"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_8"),
    S1 = ui.import && ui.import("S1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    L8 = ui.import && ui.import("L8", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_RT_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_RT_TOA"),
    VIIRS = ui.import && ui.import("VIIRS", "imageCollection", {
      "id": "NOAA/VIIRS/001/VNP09GA"
    }) || ee.ImageCollection("NOAA/VIIRS/001/VNP09GA"),
    MERIT = ui.import && ui.import("MERIT", "image", {
      "id": "MERIT/DEM/v1_0_3"
    }) || ee.Image("MERIT/DEM/v1_0_3"),
    MERIT_HAND = ui.import && ui.import("MERIT_HAND", "image", {
      "id": "users/arjenhaag/SERVIR-Mekong/HAND_MERIT"
    }) || ee.Image("users/arjenhaag/SERVIR-Mekong/HAND_MERIT"),
    HYDRAFloods_WFP = ui.import && ui.import("HYDRAFloods_WFP", "imageCollection", {
      "id": "users/arjenhaag/CambodiaFloodsOct2020/HYDRAFloods_WFP"
    }) || ee.ImageCollection("users/arjenhaag/CambodiaFloodsOct2020/HYDRAFloods_WFP"),
    HYDRAFloods = ui.import && ui.import("HYDRAFloods", "imageCollection", {
      "id": "users/arjenhaag/CambodiaFloodsOct2020/HYDRAFloods"
    }) || ee.ImageCollection("users/arjenhaag/CambodiaFloodsOct2020/HYDRAFloods"),
    HYDRAFloods_daily = ui.import && ui.import("HYDRAFloods_daily", "imageCollection", {
      "id": "users/arjenhaag/CambodiaFloodsOct2020/HYDRAFloods_daily"
    }) || ee.ImageCollection("users/arjenhaag/CambodiaFloodsOct2020/HYDRAFloods_daily"),
    rivers = ui.import && ui.import("rivers", "table", {
      "id": "users/gena/HydroRIVERS_v10"
    }) || ee.FeatureCollection("users/gena/HydroRIVERS_v10");
// Cambodia floods October 2020 - animations app
// ----------------------------------------------------------------------------------------- //
// Parameters
// ----------------------------------------------------------------------------------------- //
// defaults (at app initialization)
// var default_data   = 'VIIRS';
var default_data   = 'HYDRAFloods (masked)';
// var default_rivers = 'HydroRIVERS';
var default_rivers = 'None';
// var default_bounds = 'Country';
var default_bounds = 'None';
// animation
// var timeStep = 500;  // default is 100
var timeStep = 200;  // default is 100
var compact  = true;  // default is false
var a_width  = '400px';   // default is 600px
var position = 'bottom-right';  // default is top-center
// AoI
var country_na = 'Cambodia';
var amd1_na_1 = ['Battambang', 'Banteay Meanchey', 'Pursat'];
var adm1_na_2 = ['Pursat', 'Battambang', 'Pailin', 'Kampong Speu', 'Kampong Chhnang', 'Banteay Meanchey', 'Phnom Penh'];
// dates
var date_start = '2020-10-01';
var date_end   = '2020-11-01';
var dates = [
  'Oct 1', 'Oct 2', 'Oct 3', 'Oct 4', 'Oct 5', 'Oct 6', 'Oct 7', 'Oct 8', 'Oct 9', 'Oct 10', 'Oct 11',
  'Oct 12', 'Oct 13', 'Oct 14', 'Oct 15', 'Oct 16', 'Oct 17', 'Oct 18', 'Oct 19', 'Oct 20', 'Oct 21',
  'Oct 22', 'Oct 23', 'Oct 24', 'Oct 25', 'Oct 26', 'Oct 27', 'Oct 28', 'Oct 29', 'Oct 30', 'Oct 31'
];
// bands
// var L8_BANDS = ['B2',   'B3',    'B4',  'B5',  'B6',    'B7'];
// var L8_NAMES = ['blue', 'green', 'red', 'nir', 'swir1', 'swir2'];
var VIIRS_BANDS = ['M3',  'M4',   'M5', 'M7', 'M10',  'M11'];
// var VIIRS_BANDS = ['M3',  'M4',   'I1', 'I2', 'I3',  'M11'];
var VIIRS_NAMES = ['blue','green','red','nir','swir1','swir2'];
// visual parameters
var visParams_DEM         = {min:0, max:200, palette:['white','blue','green','yellow','red']};
// var visParams_HAND        = {min:0, max:50, palette:['white','blue','green','yellow','red']};
var visParams_S1          = {bands:['VV'], min:-30, max:0};
// var visParams_L8_RGB      = {bands:['red','green','blue'], min:0, max:0.5};
// var visParams_L8_false    = {bands:['swir1','nir','green'], min:0, max:0.5};
var visParams_VIIRS_RGB   = {bands:['red','green','blue'], min:0, max:10000, gamma:2.5};
var visParams_VIIRS_false = {bands:['swir1','nir','green'], min:0, max:10000, gamma:2.5};
var visParams_water       = {min:0, max:1, palette:['white','blue']};
var palette_water = ['#209be4', '#0000e0'];  // permanent/regular and flooded water
// UI
var fontSize_intro = '12px';
var fontSize_sub   = '11px';
// choose water maps
// var water = ee.ImageCollection('projects/cemis-camp/assets/dailyWaterV2');
// var water = HYDRAFloods_WFP;
var water = HYDRAFloods_daily;
// ----------------------------------------------------------------------------------------- //
// Prep
// ----------------------------------------------------------------------------------------- //
// analysis regions
adm0 = adm0.filter(ee.Filter.eq('ADM0_NAME', country_na));
adm1 = adm1.filter(ee.Filter.eq('ADM0_NAME', country_na));
adm2 = adm2.filter(ee.Filter.eq('ADM0_NAME', country_na));
var adm1_focus_1 = adm1.filter(ee.Filter.inList('ADM1_NAME', amd1_na_1));
var adm1_focus_2 = adm1.filter(ee.Filter.inList('ADM1_NAME', adm1_na_2));
basins5 = basins5.filterBounds(adm0.geometry());
basins6 = basins6.filterBounds(adm0.geometry());
basins7 = basins7.filterBounds(adm0.geometry());
basins8 = basins8.filterBounds(adm0.geometry());
// prepare regions dictionary, to pull from based on UI selection
var regions = ee.Dictionary({
  'None': null,
  'Country': adm0,
  'Admin level 1': adm1,
  'Admin level 2': adm2,
  // 'Basins level 5': basins5,
  'Basins level 6': basins6,
  'Basins level 7': basins7,
  'Basins level 8': basins8
});
// filter collections
// water = water.filter(ee.Filter.gte('system:index', date_start.replace('-','').replace('-','')))
//             .filter(ee.Filter.lt('system:index', date_end.replace('-','').replace('-','')));
water = water.filterDate(date_start, date_end);
// HYDRAFloods_WFP = HYDRAFloods_WFP.filterDate(date_start, date_end);
// HYDRAFloods_daily = HYDRAFloods_daily.filterDate(date_start, date_end);
// print('HYDRAFLoods (WFP) images:', water.size());
// print('HYDRAFLoods (custom) images:', water.size());
S1 = S1.filterDate(date_start, date_end)
       .filterBounds(adm0.geometry().bounds());
// print('Sentinel-1 images:', S1.size());
// construct S1 daily mosaics
var S1_dates = S1.aggregate_array('system:time_start').map(function(i) {
  return ee.Date.parse('YYYYMMdd', ee.Date(i).format('YYYYMMdd'));
}).distinct().sort();
// print(S1_dates);
var S1_daily = S1_dates.map(function(i) {
  return S1.filterDate(ee.Date(i), ee.Date(i).advance(1,'day')).median().set('system:time_start', ee.Date(i).millis());
});
// L8 = L8.filterDate(date_start, date_end)
//       .filterBounds(adm0.geometry().bounds())
//       .select(L8_BANDS, L8_NAMES);
// print('Landsat 8 images:', L8.size());
VIIRS = VIIRS.filterDate(date_start, date_end).select(VIIRS_BANDS, VIIRS_NAMES);
// print('VIIRS images:', VIIRS.size());
// add day of month property to VIIRS images
// VIIRS = VIIRS.map(function(img) {
//   return img.set('day', img.date().getRelative('day','month'));
// });
// HYDRAFloods water
// var perm_water = ee.Image(HYDRAFloods_WFP.first()).select('permanentwater');
// var water_max = water.select('dailywater').max();
// var water_max = water.select('water').max();
// var HYDRAFloods_max = HYDRAFloods_daily.select('water').max();
// prepare data dictionary, to pull from based on UI selection
var data = {
  'None': null,
  'VIIRS': {
    'imgs': VIIRS,
    'vis': visParams_VIIRS_false
  },
  'Sentinel-1': {
    'imgs': S1_daily,
    'vis': visParams_S1
  },
  'HYDRAFloods': {
    'imgs': water.select('water'),
    'vis': visParams_water
  },
  'HYDRAFloods (masked)': {
    'imgs': water.select('water').map(function(img) {return img.updateMask(img)}),
    'vis': visParams_water
  }
};
// HydroRIVERS
rivers = rivers.map(function(f) {
  return f.set({ style: {
      // color: '00ffff', 
      color: '06baff',
      gamma: 1.5,
      // width: ee.Number(f.get('DIS_AV_CMS_LOG')).divide(5)
      width: ee.Number(f.get('DIS_AV_CMS')).divide(100).add(0.5).min(3)
    } 
  });
});
var riversImage = rivers.style({ styleProperty: 'style' });
riversImage = riversImage.clipToCollection(adm0);
// ----------------------------------------------------------------------------------------- //
// Functions
// ----------------------------------------------------------------------------------------- //
// var animation = require('users/gena/packages:animation');
var animation = require('users/arjenhaag/modules:animation');
var loadAnimation = function(data_name) {
  // clear animation panel and previously added layers 
  // animation_panel.clear;
  // animation_panel.panel.clear();
  // Map.widgets().reset();
  // Map.layers().reset();
  Map.clear();
  // re-add rivers, if previously added
  updateRivers(selector_rivers.getValue());
  // re-add toggle panel button
  Map.add(toggle_panel_map);
  // add animation panel and new layers
  if (data_name !== 'None') {
    var imgs = ee.ImageCollection(data[data_name]['imgs']);
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
  }
  // re-add boundaries, if previously added
  updateBoundaries(selector_top.getValue());
};
var updateRivers = function(rivers_name) {
  if (rivers_name !== 'None') {
    Map.layers().insert(0, ui.Map.Layer(riversImage, {}, 'rivers', true, 0.5));
  } else {
    Map.layers().forEach(function(layer) {
      if (layer.get('name') == 'rivers') {
        Map.layers().remove(layer);
      }
    });
  }
};
var updateBoundaries = function(region_name) {
  // clear previously added layer
  Map.layers().forEach(function(layer) {
    if (layer.get('name') == 'boundaries') {
      Map.layers().remove(layer);
    }
  });
  // add new layer
  if (region_name !== 'None') {
    var region = regions.get(region_name);
    VIIRS.size().add(1).evaluate(function(val, err){
      Map.layers().insert(val, ui.Map.Layer(ee.Image().byte().paint(region,0,2), {}, 'boundaries', true));
    });
  }
};
var toggleRefs = function() {
  refs.style().set('shown', !refs.style().get('shown'));
};
var togglePanel = function() {
  panel.style().set('shown', !panel.style().get('shown'));
  if (panel.style().get('shown') === false) {
    toggle_panel_map.style().set('shown', true);
  } else {
    toggle_panel_map.style().set('shown', false);
  }
};
// ----------------------------------------------------------------------------------------- //
// User Interface
// ----------------------------------------------------------------------------------------- //
// padding/margin = 1 (all), 2 (top/bottom,right/left), 3 (top,right/left,bottom), 4 (top,right,bottom,left)
// intro
var intro = ui.Panel([
  // title
  ui.Label({
    value: 'Cambodia Floods October 2020 - animations',
    style: {fontSize:'18px', fontWeight:'bold'}
  }),
  // intro texts
  ui.Label({
    value: "Animation of EO data and flood maps (WORK-IN-PROGRESS). Analysis app",
    style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 8px'}
  }),
  ui.Panel([
    ui.Label({
      value: "can be accessed at",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "this link",
      targetUrl: "https://arjenhaag.users.earthengine.app/view/cambodia-floods-october-2020",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 3px'}
    }),
    ui.Label({
      value: ".",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 0px'}
    })
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Label({
    value: "Flood maps are created using the",
    style: {fontSize:fontSize_intro, padding:'0px', margin:'8px 0px 0px 8px'}
  }),
  ui.Panel([
    ui.Label({
      value: "HYDRAFloods",
      targetUrl: "http://hydrafloods-servir.adpc.net/",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "tool of",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 3px'}
    }),
    ui.Label({
      value: "SERVIR-Mekong",
      targetUrl: "https://servir.adpc.net/",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 3px'}
    }),
    ui.Label({
      value: ",",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 0px'}
    })
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "a consortium of",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "ADPC",
      targetUrl: "https://www.adpc.net/",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 3px'}
    }),
    ui.Label({
      value: ",",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 0px'}
    }),
    ui.Label({
      value: "SIG",
      targetUrl: "https://sig-gis.com/",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 3px'}
    }),
    ui.Label({
      value: ",",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 0px'}
    }),
    ui.Label({
      value: "SEI",
      targetUrl: "https://www.sei.org/",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 3px'}
    }),
    ui.Label({
      value: "and",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 3px'}
    })
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "Deltares",
      targetUrl: "https://www.deltares.nl/en/",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "supported by",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 3px'}
    }),
    ui.Label({
      value: "NASA",
      targetUrl: "https://www.nasa.gov/",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 3px'}
    }),
    ui.Label({
      value: ".",
      style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 0px'}
    })
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Label({
    value: "More information on these floods at",
    style: {fontSize:fontSize_intro, padding:'0px', margin:'8px 0px 0px 8px'}
  }),
  ui.Label({
    value: "ReliefWeb",
    targetUrl: "https://reliefweb.int/disaster/fl-2020-000212-khm",
    style: {fontSize:fontSize_intro, padding:'0px', margin:'0px 0px 0px 8px'}
  })
]);
// data selections
var selector_base = ui.Select({
  items: ['None', 'VIIRS', 'Sentinel-1', 'HYDRAFloods', 'HYDRAFloods (masked)'],// (edgeOtsu)', 'HYDRAFloods (WFP)'],
  value: 'None',
  onChange: loadAnimation,
  style: {width: '200px'}
});
// var selector_floods = ui.Select({
//   items: ['None', 'HYDRAFloods'],// (edgeOtsu)', 'HYDRAFloods (WFP)'],
//   value: 'None',
//   // onChange: updateSelection,
//   style: {width: '200px'}
// });
var selector_rivers = ui.Select({
  items: ['None', 'HydroRIVERS'],
  value: 'None',
  onChange: updateRivers,
  style: {width: '200px'}
});
var selector_top = ui.Select({
  items: ['None', 'Country', 'Admin level 1', 'Admin level 2', 'Basins level 6', 'Basins level 7', 'Basins level 8'],
  value: 'None',
  onChange: updateBoundaries,
  style: {width: '200px'}
});
var selector_base_panel = ui.Panel([
  ui.Label({value: 'Data:', style: {fontWeight: 'bold'}}),
  selector_base,
  ui.Label({value: "This adds selected data to the map as a separate layer per time step. It is best to wait until all layers are fully loaded before starting the animation.", style: {fontSize: fontSize_sub}})
]);
// var selector_floods_panel = ui.Panel([
//   ui.Label({value: 'Flood maps:', style: {fontWeight: 'bold'}}),
//   selector_floods
// ]);
var selector_rivers_panel = ui.Panel([
  ui.Label({value: 'Rivers:', style: {fontWeight: 'bold'}}),
  selector_rivers,
  ui.Label({value: "This displays selected rivers underneath the data. It can take a while to load when data layers are still loading.", style: {fontSize: fontSize_sub}})
]);
var selector_top_panel = ui.Panel([
  ui.Label({value: 'Boundaries:', style: {fontWeight: 'bold'}}),
  selector_top,
  ui.Label({value: "This displays selected boundaries on top of the data. It can take a while to load when data layers are still loading.", style: {fontSize: fontSize_sub}})
]);
// references
var refs = ui.Panel([
  ui.Panel([
    ui.Label({
      value: "- Sentinel-1:",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Copernicus Sentinel data",
      targetUrl: "http://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-1",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 3px'}
    })
  ], ui.Panel.Layout.flow('horizontal')),
  // ui.Panel([
  //   ui.Label({
  //     value: "- Landsat 8:",
  //     style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
  //   }),
  //   ui.Label({
  //     value: "U.S. Geological Survey",
  //     targetUrl: "https://www.usgs.gov/core-science-systems/nli/landsat",
  //     style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 3px'}
  //   })
  // ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "- VIIRS:",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Vermote et al. (2016)",
      targetUrl: "https://doi.org/10.5067/VIIRS/VNP09GA.001",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
  ], ui.Panel.Layout.flow('horizontal')),
  // ui.Panel([
  //   ui.Label({
  //     value: "- MERIT DEM:",
  //     style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
  //   }),
  //   ui.Label({
  //     value: "Yamazaki et al. (2017)",
  //     targetUrl: "https://agupubs.onlinelibrary.wiley.com/doi/full/10.1002/2017GL072874",
  //     style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
  //   }),
  // ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "- Basins/Rivers:",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Lehner & Grill (2013)",
      targetUrl: "https://onlinelibrary.wiley.com/doi/10.1002/hyp.9740",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Label({
    value: "Contains modified Copernicus Sentinel data [2020]",
    style: {fontSize:fontSize_sub, padding:'0px', margin:'3px 0px 0px 8px'}
  }),
  ui.Label({
    value: "Source of Administrative boundaries: The Global Administrative Unit Layers (GAUL) dataset, implemented by FAO within the CountrySTAT and Agricultural Market Information System (AMIS) projects",
    style: {fontSize:fontSize_sub, padding:'0px', margin:'3px 0px 0px 8px'}
  }),
  ui.Label({
    value: "Animation code by Gennadii Donchyts",
    style: {fontSize:fontSize_sub, padding:'0px', margin:'3px 0px 0px 8px'}
  })
], ui.Panel.Layout.flow('vertical'), {shown: false});
var refs_panel = ui.Panel([
  ui.Panel([
    ui.Button({label:'Show/hide references', onClick:toggleRefs})
  ], ui.Panel.Layout.flow('horizontal')),
  refs
]);
// toggle panel
var toggle_panel = ui.Button({
  label: 'Hide panel',
  onClick: togglePanel,
  disabled: false,
  style: {position: 'bottom-left'}
});
var toggle_panel_map = ui.Button({
  label: 'Show panel',
  onClick: togglePanel,
  disabled: false,
  style: {position:'bottom-left', shown:false}
});
// outro text
var outro = ui.Label({
  value: "For more information on this application, please contact arjen.haag@deltares.nl",
  style: {fontSize:fontSize_sub, padding:'0px', margin:'3px 0px 8px 8px'}
});
// panel combining relevant UI elements for the ui.root
var panel = ui.Panel({
  widgets: [intro, selector_base_panel, selector_rivers_panel, selector_top_panel, refs_panel, toggle_panel, outro],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    width: '230px'
  }
});
// add the panel to the ui.root
ui.root.insert(0, panel);
// ----------------------------------------------------------------------------------------- //
// Map
// ----------------------------------------------------------------------------------------- //
Map.centerObject(adm0);
// Map.setOptions('TERRAIN');
// Map.addLayer(MERIT, visParams_DEM, 'MERIT DEM', false);
// Map.addLayer(MERIT_HAND, visParams_HAND, 'MERIT HAND', false);
// Map.addLayer(riversImage, {}, 'rivers (HydroRIVERS)', false);
// Map.addLayer(ee.Image().byte().paint(adm1_focus_2,0,2), {palette:'orange'}, 'Affected provinces', false);
// Map.addLayer(ee.Image().byte().paint(adm1_focus_1,0,2), {palette:'red'}, 'Worst affected provinces', true);
// ----------------------------------------------------------------------------------------- //
// Initialization
// ----------------------------------------------------------------------------------------- //
selector_base.setValue(default_data);
selector_rivers.setValue(default_rivers);
selector_top.setValue(default_bounds);