var S1 = ui.import && ui.import("S1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    S2_1C = ui.import && ui.import("S2_1C", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    S2_2A = ui.import && ui.import("S2_2A", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    VIIRS = ui.import && ui.import("VIIRS", "imageCollection", {
      "id": "NOAA/VIIRS/001/VNP09GA"
    }) || ee.ImageCollection("NOAA/VIIRS/001/VNP09GA"),
    JRC_water = ui.import && ui.import("JRC_water", "image", {
      "id": "JRC/GSW1_4/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_4/GlobalSurfaceWater"),
    JRC_monthly = ui.import && ui.import("JRC_monthly", "imageCollection", {
      "id": "JRC/GSW1_4/MonthlyHistory"
    }) || ee.ImageCollection("JRC/GSW1_4/MonthlyHistory"),
    MERIT = ui.import && ui.import("MERIT", "image", {
      "id": "MERIT/DEM/v1_0_3"
    }) || ee.Image("MERIT/DEM/v1_0_3"),
    Beira_point = ui.import && ui.import("Beira_point", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            34.86242175857979,
            -19.828622092344936
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Point([34.86242175857979, -19.828622092344936]),
    Beira_poly = ui.import && ui.import("Beira_poly", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                33.93923130721362,
                -19.25975371403389
              ],
              [
                33.93923130721362,
                -20.324480113829775
              ],
              [
                35.21364536971362,
                -20.324480113829775
              ],
              [
                35.21364536971362,
                -19.25975371403389
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[33.93923130721362, -19.25975371403389],
          [33.93923130721362, -20.324480113829775],
          [35.21364536971362, -20.324480113829775],
          [35.21364536971362, -19.25975371403389]]], null, false),
    basins_lvl5 = ui.import && ui.import("basins_lvl5", "table", {
      "id": "WWF/HydroSHEDS/v1/Basins/hybas_5"
    }) || ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_5"),
    GAUL_lvl0 = ui.import && ui.import("GAUL_lvl0", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0"),
    GAUL_lvl1 = ui.import && ui.import("GAUL_lvl1", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level1"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level1"),
    GAUL_lvl2 = ui.import && ui.import("GAUL_lvl2", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2"),
    HYDRAFloods_S1 = ui.import && ui.import("HYDRAFloods_S1", "imageCollection", {
      "id": "users/arjenhaag/BeiraFloods2019/HYDRAFloods_S1_v2"
    }) || ee.ImageCollection("users/arjenhaag/BeiraFloods2019/HYDRAFloods_S1_v2"),
    HYDRAFloods_S2 = ui.import && ui.import("HYDRAFloods_S2", "imageCollection", {
      "id": "users/arjenhaag/BeiraFloods2019/HYDRAFloods_S2_v2"
    }) || ee.ImageCollection("users/arjenhaag/BeiraFloods2019/HYDRAFloods_S2_v2"),
    HYDRAFloods = ui.import && ui.import("HYDRAFloods", "imageCollection", {
      "id": "users/arjenhaag/BeiraFloods2019/HYDRAFloods_merged"
    }) || ee.ImageCollection("users/arjenhaag/BeiraFloods2019/HYDRAFloods_merged"),
    HYDRAFloods_max = ui.import && ui.import("HYDRAFloods_max", "image", {
      "id": "users/arjenhaag/BeiraFloods2019/HYDRAFloods_merged_max"
    }) || ee.Image("users/arjenhaag/BeiraFloods2019/HYDRAFloods_merged_max");
// Moonshot 2: flooding - Beira case study - app
// NOTES
/*
- Different from previous apps, haven't processed flood maps into daily images,
  so it only includes maps from specific dates
*/
// ----------------------------------------------------------------------------------------- //
// Parameters
// ----------------------------------------------------------------------------------------- //
// AoI
var country_na = 'Mozambique';
// dates
var date_start = '2019-03-01';
// var date_start = '2019-03-12';
var date_end   = '2019-04-01';
// var dates = [
//   'Mar 1', 'Mar 2', 'Mar 3', 'Mar 4', 'Mar 5', 'Mar 6', 'Mar 7', 'Mar 8', 'Mar 9', 'Mar 10', 'Mar 11',
//   'Mar 12', 'Mar 13', 'Mar 14', 'Mar 15', 'Mar 16', 'Mar 17', 'Mar 18', 'Mar 19', 'Mar 20', 'Mar 21',
//   'Mar 22', 'Mar 23', 'Mar 24', 'Mar 25', 'Mar 26', 'Mar 27', 'Mar 28', 'Mar 29', 'Mar 30', 'Mar 31'
// ];
var dates = [
  'Mar 1', 'Mar 2', 'Mar 7', 'Mar 8', 'Mar 10', 'Mar 12', 'Mar 13', 'Mar 14', 'Mar 19', 'Mar 20',
  'Mar 22', 'Mar 25', 'Mar 26', 'Mar 27', 'Mar 30', 'Mar 31'
];
// var S2 = S2_1C;
var S2 = S2_2A;
// bands
var S2_BANDS  = ['B2',   'B3',    'B4',  'B8',  'B11',   'B12'];
// var L8_BANDS  = ['B2',   'B3',    'B4',  'B5',  'B6',    'B7'];
var STD_NAMES = ['blue', 'green', 'red', 'nir', 'swir1', 'swir2'];
var VIIRS_BANDS = ['M3',  'M4',   'M5', 'M7', 'M10',  'M11'];
// var VIIRS_BANDS = ['M3',  'M4',   'I1', 'I2', 'I3',  'M11'];
var VIIRS_NAMES = ['blue','green','red','nir','swir1','swir2'];
// visual parameters
var visParams_DEM         = {min:0, max:200, palette:['blue','green','yellow','red','white']};
// var visParams_HAND        = {min:0, max:50, palette:['white','blue','green','yellow','red']};
// var visParams_S1          = {bands:['VV'], min:-30, max:0};
// var visParams_S2_false    = {bands:['swir1','nir','green'], min:0, max:5000};
var visParams_S1          = {min:-30, max:0};
var visParams_S2_false    = {min:0, max:5000};
// var visParams_L8_RGB      = {bands:['red','green','blue'], min:0, max:0.5};
// var visParams_L8_false    = {bands:['swir1','nir','green'], min:0, max:0.5};
// var visParams_VIIRS_RGB   = {bands:['red','green','blue'], min:0, max:10000, gamma:2.5};
// var visParams_VIIRS_false = {bands:['swir1','nir','green'], min:0, max:10000, gamma:2.5};
var visParams_VIIRS       = {min:0, max:10000, gamma:2.5};
var visParams_MNDWI       = {min:-1, max:1, palette:['white','blue']};
var visParams_water       = {min:0, max:1, palette:['white','blue']};
var visParams_water_2     = {min:-1,max:1,palette:['grey','white','blue']};
var palette_water = ['#209be4', '#0000e0'];  // permanent/regular and flooded water
// UI
var fontSize_intro = '12px';
var fontSize_sub   = '11px';
// ----------------------------------------------------------------------------------------- //
// Prep
// ----------------------------------------------------------------------------------------- //
// get administrative boundaries
var country = ee.Feature(GAUL_lvl0.filter(ee.Filter.eq('ADM0_NAME', 'Mozambique')).first());
GAUL_lvl1 = GAUL_lvl1.filter(ee.Filter.eq('ADM0_NAME', 'Mozambique'));
GAUL_lvl2 = GAUL_lvl2.filter(ee.Filter.eq('ADM0_NAME', 'Mozambique'));
var Beira_admin1 = ee.Feature(GAUL_lvl1.filterBounds(Beira_point).first());
var Beira_admin2 = ee.Feature(GAUL_lvl2.filterBounds(Beira_point).first());
var Beira_basins = basins_lvl5.filterBounds(Beira_poly);
// get overall bounds
var bounds = Beira_admin1.geometry().bounds();
// filter collections
var JRC_month = JRC_monthly.filterDate('2019-03-01', '2019-03-31').first();
// S1 = S1.filterDate(date_start, date_end)
S1 = S1.filterDate(date_start, ee.Date(date_end).advance(1,'day'))
       .filterBounds(country.geometry().bounds());
      // .filterBounds(bounds);
      // .filterBounds(Beira_admin1.geometry());
// print('S1 images:', S1.size());
// S2 = S2.filterDate(date_start, date_end)
S2 = S2.filterDate(date_start, ee.Date(date_end).advance(1,'day'))
       .filterBounds(country.geometry().bounds())
       .select(S2_BANDS, STD_NAMES);
      // .filterBounds(bounds);
      // .filterBounds(Beira_admin1.geometry());
// print('S2 images:', S2.size());
// VIIRS = VIIRS.filterDate(date_start, date_end).select(VIIRS_BANDS, VIIRS_NAMES);
VIIRS = VIIRS.filterDate(date_start, ee.Date(date_end).advance(1,'day')).select(VIIRS_BANDS, VIIRS_NAMES);
// print('VIIRS images:', VIIRS.size());
// HYDRAFloods_S1 = HYDRAFloods_S1.filterDate(date_start, date_end);
// HYDRAFloods_S2 = HYDRAFloods_S2.filterDate(date_start, date_end);
// HYDRAFloods_S1 = HYDRAFloods_S1.filterDate(date_start, ee.Date(date_end).advance(1,'day'));
// HYDRAFloods_S2 = HYDRAFloods_S2.filterDate(date_start, ee.Date(date_end).advance(1,'day'));
// HYDRAFloods = HYDRAFloods.filterDate(date_start, ee.Date(date_end).advance(1,'day'));
var water = HYDRAFloods;
// var water_area = water.map(function(img) {
//   return img.set('water_area', img.multiply(ee.Image.pixelArea()).reduceRegion({
//     reducer: ee.Reducer.sum(),
//     geometry: bounds,
//     scale: 10,
//     // crs: ,
//     // crsTransform: ,
//     bestEffort: true,
//     maxPixels: 1e12,
//     // tileScale:
//   }).values().get(0));
// }).aggregate_array('water_area');
// print(water_area);
// map layer placeholders
// var layer_VIIRS = ui.Map.Layer(ee.Image(), visParams_VIIRS_false, 'VIIRS', true);
var layer_VIIRS = ui.Map.Layer(ee.Image(), visParams_VIIRS, 'VIIRS', true);
var layer_S1 = ui.Map.Layer(ee.Image(), visParams_S1, 'Sentinel-1', false);
var layer_S2 = ui.Map.Layer(ee.Image(), visParams_S2_false, 'Sentinel-2', false);
var layer_HF_S1 = ui.Map.Layer(ee.Image(), visParams_water, 'Sentinel-1 water', false);
var layer_HF_S2 = ui.Map.Layer(ee.Image(), visParams_water, 'Sentinel-2 water', false);
var layer_HF_raw = ui.Map.Layer(ee.Image(), visParams_water_2, 'Floodmap', false);
var layer_HF = ui.Map.Layer(ee.Image(), visParams_water, 'Floodmap (water only)', true);
// ----------------------------------------------------------------------------------------- //
// Functions
// ----------------------------------------------------------------------------------------- //
// update elements based on slider
var updateSlider = function(i) {
  // get date
  var slider_date = dates[i-1];
  // var slider_date = dates[i-12];
  slider_date_label.setValue(slider_date);
  // var temp_date   = ee.Date.fromYMD(2019,3,i);
  var temp_date   = ee.Date.fromYMD(2019,3,ee.Number.parse(slider_date.replace('Mar ','')));
  // print('slider date:', slider_date);
  // print('used date:', temp_date);
  // get water image
  var temp_water = ee.Image(water.filterDate(temp_date, temp_date.advance(1,'day')).first());//.select('water');
  var temp_HYDRAFloods_S1 = HYDRAFloods_S1.filterDate(temp_date, temp_date.advance(1,'day'));
  var temp_HYDRAFloods_S2 = HYDRAFloods_S2.filterDate(temp_date, temp_date.advance(1,'day'));
  // get imagery
  var temp_VIIRS = VIIRS.filterDate(temp_date, temp_date.advance(1,'day'));
  var temp_S1 = S1.filterDate(temp_date, temp_date.advance(1,'day'));
  var temp_S2 = S2.filterDate(temp_date, temp_date.advance(1,'day'));
  // var temp_L8 = L8.filterDate(temp_date, temp_date.advance(1,'day'));
  // add layers to map
  layer_VIIRS.setEeObject(temp_VIIRS.select(['swir1','nir','green'])).setName('VIIRS ' + slider_date);
  layer_S1.setEeObject(temp_S1.select('VV')).setName('Sentinel-1 ' + slider_date);
  layer_S2.setEeObject(temp_S2.select(['swir1','nir','green'])).setName('Sentinel-2 ' + slider_date);
  // layer_HF_S1.setEeObject(temp_HYDRAFloods_S1).setName('Sentinel-1 water ' + slider_date);
  // layer_HF_S2.setEeObject(temp_HYDRAFloods_S2).setName('Sentinel-2 water ' + slider_date);
  layer_HF_raw.setEeObject(temp_water.select('water')).setName('Floodmap ' + slider_date);
  layer_HF.setEeObject(temp_water.select('water').selfMask()).setName('Floodmap (water only) ' + slider_date);
};
var toggleLegends = function() {
  legends.style().set('shown', !legends.style().get('shown'));
};
var toggleRefs = function() {
  refs.style().set('shown', !refs.style().get('shown'));
};
// ----------------------------------------------------------------------------------------- //
// User Interface
// ----------------------------------------------------------------------------------------- //
// padding/margin = 1 (all), 2 (top/bottom,right/left), 3 (top,right/left,bottom), 4 (top,right,bottom,left)
// intro
var intro = ui.Panel([
  // title
  ui.Label({
    value: 'Beira Floods March 2019',
    style: {fontSize:'20px', fontWeight:'bold'}
  }),
  // intro texts
  ui.Label({
    value: "Quick visualation and analysis of EO derived flood maps. Toggle various layers using the list window at the top right of the map. Scroll through available imagery using the slider below.",
    style: {fontSize:fontSize_intro, padding:'0px'}
  })
]);
// image slider
var slider = ui.Slider({
  min:1,
  // min:12,
  // max:31,
  max:dates.length,
  // value:1,
  // value:12,
  value:8,
  step:1,
  onChange: updateSlider,
  // style: {width:'200px'}
  style: {width:'150px'}
});
var slider_date_label = ui.Label(dates[0]);
// var slider_imgs_remover = ui.Button('Clear images', clearSliderImgs, false);//, {fontWeight: 'bold'});
var slider_panel = ui.Panel([
  // ui.Label({value: 'Image slider (day of month):', style: {fontWeight: 'bold'}}),
  // ui.Label({value: 'Image slider (image index):', style: {fontWeight: 'bold'}}),
  ui.Label({value: 'Image slider:', style: {fontWeight: 'bold'}}),
  ui.Panel([
    ui.Label({value: 'Index', style: {fontSize: fontSize_sub, margin:'7px 10px'}}),
    ui.Label({value: 'Date', style: {fontSize: fontSize_sub, margin:'7px 128px'}}),
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([slider, slider_date_label], ui.Panel.Layout.flow('horizontal')),
  ui.Label({value: 'Use this to check available imagery and flood maps for each day.', style: {fontSize: fontSize_sub}}),
  // slider_imgs_remover,
  // ui.Label({value: 'Click the button above to clear all slider images.', style: {fontSize: fontSize_sub}}),
]);
// legend(s)
var legend_water = ui.Panel({widgets:[
  ui.Label({value: 'Water/flood maps:', style: {fontWeight: 'bold'}}),
  ui.Panel({widgets:[
    ui.Label({
      style: {
        backgroundColor: 'grey',
        padding: '8px',
        margin: '0 0 4px 8px'
      }
    }),
    ui.Label({
      value: 'No data',
      style: {margin: '0 0 4px 6px'}
    })], layout: ui.Panel.Layout.Flow('horizontal')}),
    ui.Panel({widgets:[
    ui.Label({
      style: {
        backgroundColor: 'white',
        padding: '8px',
        margin: '0 0 4px 8px'
      }
    }),
    ui.Label({
      value: 'Not water',
      style: {margin: '0 0 4px 6px'}
    })], layout: ui.Panel.Layout.Flow('horizontal')}),
    ui.Panel({widgets:[
    ui.Label({
      style: {
        backgroundColor: 'blue',
        padding: '8px',
        margin: '0 0 4px 8px'
      }
    }),
    ui.Label({
      value: 'Water',
      style: {margin: '0 0 4px 6px'}
    })], layout: ui.Panel.Layout.Flow('horizontal')})
  ], style:{margin: '0px 0px 10px 0px'}
});
var legend_DEM = ui.Panel({widgets:[
  ui.Label({value: 'Elevation (m):', style: {fontWeight: 'bold'}}),
  ui.Panel({widgets:[
    ui.Label({
      style: {
        backgroundColor: 'blue',
        padding: '8px',
        margin: '0 0 4px 8px'
      }
    }),
    ui.Label({
      value: '0',
      style: {margin: '0 0 4px 6px'}
    })], layout: ui.Panel.Layout.Flow('horizontal')}),
  ui.Panel({widgets:[
    ui.Label({
      style: {
        backgroundColor: 'green',
        padding: '8px',
        margin: '0 0 4px 8px'
      }
    }),
    ui.Label({
      value: '50',
      style: {margin: '0 0 4px 6px'}
    })], layout: ui.Panel.Layout.Flow('horizontal')}),
  ui.Panel({widgets:[
    ui.Label({
      style: {
        backgroundColor: 'yellow',
        padding: '8px',
        margin: '0 0 4px 8px'
      }
    }),
    ui.Label({
      value: '100',
      style: {margin: '0 0 4px 6px'}
    })], layout: ui.Panel.Layout.Flow('horizontal')}),
  ui.Panel({widgets:[
    ui.Label({
      style: {
        backgroundColor: 'red',
        padding: '8px',
        margin: '0 0 4px 8px'
      }
    }),
    ui.Label({
      value: '150',
      style: {margin: '0 0 4px 6px'}
    })], layout: ui.Panel.Layout.Flow('horizontal')}),
  ui.Panel({widgets:[
    ui.Label({
      style: {
        backgroundColor: 'white',
        padding: '8px',
        margin: '0 0 4px 8px'
      }
    }),
    ui.Label({
      value: '200+',
      style: {margin: '0 0 4px 6px'}
    })], layout: ui.Panel.Layout.Flow('horizontal')})
  ], style:{margin: '0px 0px 10px 0px'}
});
var legends = ui.Panel([legend_water, legend_DEM]);
var legends_panel = ui.Panel([
  ui.Button('Show/hide legends', toggleLegends, false, {fontWeight: 'bold'})
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
  ui.Panel([
    ui.Label({
      value: "- Sentinel-2:",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Copernicus Sentinel data",
      targetUrl: "http://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-2",
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
  ui.Panel([
    ui.Label({
      value: "- JRC Surface Water:",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Pekel et al. (2016)",
      targetUrl: "https://www.nature.com/articles/nature20584.epdf?author_access_token=C5JSvooRop4jWxyp_qRPLNRgN0jAjWel9jnR3ZoTv0MqBuzCNsmw_DFxRd7sX93nfPzcbm_xTiPLlZMl7XrUhadm6EiT9cGdDNgn1s6EWrPWH3IeadLUjApplBoaS6xH",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "- MERIT DEM:",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Yamazaki et al. (2017)",
      targetUrl: "https://agupubs.onlinelibrary.wiley.com/doi/full/10.1002/2017GL072874",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "- HydroBASINS:",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Lehner & Grill (2013)",
      targetUrl: "https://onlinelibrary.wiley.com/doi/10.1002/hyp.9740",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Label({
    value: "Contains modified Copernicus Sentinel data [2019]",
    style: {fontSize:fontSize_sub, padding:'0px', margin:'3px 0px 0px 8px'}
  }),
  ui.Label({
    value: "Source of Administrative boundaries: The Global Administrative Unit Layers (GAUL) dataset, implemented by FAO within the CountrySTAT and Agricultural Market Information System (AMIS) projects",
    style: {fontSize:fontSize_sub, padding:'0px', margin:'3px 0px 0px 8px'}
  })
], ui.Panel.Layout.flow('vertical'), {shown:false});
var refs_panel = ui.Panel([
  ui.Panel([
    ui.Button({label:'Show/hide references', onClick:toggleRefs})
  ], ui.Panel.Layout.flow('horizontal')),
  refs
]);
var outro = ui.Label({
  value: "For more information on this application, please contact arjen.haag@deltares.nl",
  style: {fontSize:fontSize_sub, padding:'0px', margin:'3px 0px 8px 8px'}
});
// panel combining relevant UI elements for the ui.root
var panel = ui.Panel({
  // widgets: [intro, selector_panel, slider_panel, legends_panel, legends, charts_panel, charts_extra, charts, refs_panel, outro],
  widgets: [intro, slider_panel, legends_panel, legends, refs_panel, outro],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    width: '260px'
  }
});
// add the panel to the ui.root
ui.root.insert(0, panel);
// ----------------------------------------------------------------------------------------- //
// Map
// ----------------------------------------------------------------------------------------- //
// Map.centerObject(Beira_point, 8);
Map.centerObject(bounds, 7);
// Map.setOptions('TERRAIN');
Map.addLayer(MERIT, visParams_DEM, 'MERIT DEM', false);
Map.addLayer(JRC_water, {bands:['occurrence'], min:0, max:100, palette:['white','blue']}, 'JRC water occurrence (1984-2021)', false);
Map.addLayer(JRC_water.select('max_extent').selfMask(), visParams_water, 'JRC water max extent (1984-2021)', false);
Map.addLayer(JRC_month, {min:0, max:2, palette:['grey','white','blue']}, 'JRC March 2019', false);
// Map.addLayer(S1.min(), visParams_S1, 'Sentinel-1 (min)', false);
// Map.addLayer(S1.median(), visParams_S1, 'Sentinel-1 (median)', false);
Map.layers().add(layer_VIIRS);
Map.layers().add(layer_S1);
Map.layers().add(layer_S2);
Map.addLayer(HYDRAFloods_max.selfMask(), {min:0, max:1, palette:['white','red']}, 'Maximum flood extent', false);
// Map.layers().add(layer_HF_S1);
// Map.layers().add(layer_HF_S2);
Map.layers().add(layer_HF_raw);
Map.layers().add(layer_HF);
Map.addLayer(ee.Image().byte().paint(country,0,2), {}, 'Mozambique', false);
Map.addLayer(ee.Image().byte().paint(GAUL_lvl1,0,2), {}, 'Mozambique admins level 1', false);
Map.addLayer(ee.Image().byte().paint(GAUL_lvl2,0,2), {}, 'Mozambique admins level 2', false);
Map.addLayer(ee.Image().byte().paint(Beira_admin1,0,2), {}, 'Beira admin level 1', true);
Map.addLayer(ee.Image().byte().paint(Beira_admin2,0,2), {}, 'Beira admin level 2', false);
// initialize slider
// updateSlider(1);
// updateSlider(12);
updateSlider(8);