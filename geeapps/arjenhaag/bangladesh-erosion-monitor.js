var WorldCover = ui.import && ui.import("WorldCover", "imageCollection", {
      "id": "ESA/WorldCover/v100"
    }) || ee.ImageCollection("ESA/WorldCover/v100"),
    WorldCover_v2 = ui.import && ui.import("WorldCover_v2", "imageCollection", {
      "id": "ESA/WorldCover/v200"
    }) || ee.ImageCollection("ESA/WorldCover/v200"),
    DynamicWorld = ui.import && ui.import("DynamicWorld", "imageCollection", {
      "id": "GOOGLE/DYNAMICWORLD/V1"
    }) || ee.ImageCollection("GOOGLE/DYNAMICWORLD/V1"),
    WorldPop = ui.import && ui.import("WorldPop", "imageCollection", {
      "id": "WorldPop/GP/100m/pop"
    }) || ee.ImageCollection("WorldPop/GP/100m/pop"),
    HRSL = ui.import && ui.import("HRSL", "imageCollection", {
      "id": "projects/sat-io/open-datasets/hrsl/hrslpop"
    }) || ee.ImageCollection("projects/sat-io/open-datasets/hrsl/hrslpop"),
    GAUL = ui.import && ui.import("GAUL", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0"),
    country = ui.import && ui.import("country", "table", {
      "id": "users/arjenhaag/BangladeshErosion/Bangladesh_coast_buffered"
    }) || ee.FeatureCollection("users/arjenhaag/BangladeshErosion/Bangladesh_coast_buffered"),
    country_v2 = ui.import && ui.import("country_v2", "table", {
      "id": "users/arjenhaag/BangladeshErosion/Bangladesh_country_boundaries"
    }) || ee.FeatureCollection("users/arjenhaag/BangladeshErosion/Bangladesh_country_boundaries"),
    polders = ui.import && ui.import("polders", "table", {
      "id": "users/arjenhaag/BangladeshErosion/Polderspoly_ori_3857"
    }) || ee.FeatureCollection("users/arjenhaag/BangladeshErosion/Polderspoly_ori_3857"),
    polders_new = ui.import && ui.import("polders_new", "table", {
      "id": "users/arjenhaag/BangladeshErosion/Polderspoly_2021_3857"
    }) || ee.FeatureCollection("users/arjenhaag/BangladeshErosion/Polderspoly_2021_3857"),
    polders_line = ui.import && ui.import("polders_line", "table", {
      "id": "users/arjenhaag/BangladeshErosion/Poldersline_ori_3857"
    }) || ee.FeatureCollection("users/arjenhaag/BangladeshErosion/Poldersline_ori_3857"),
    polders_line_new = ui.import && ui.import("polders_line_new", "table", {
      "id": "users/arjenhaag/BangladeshErosion/Poldersline_2021_3857"
    }) || ee.FeatureCollection("users/arjenhaag/BangladeshErosion/Poldersline_2021_3857"),
    eroded_embankments = ui.import && ui.import("eroded_embankments", "table", {
      "id": "users/arjenhaag/BangladeshErosion/eroded_embank"
    }) || ee.FeatureCollection("users/arjenhaag/BangladeshErosion/eroded_embank"),
    split_embankments = ui.import && ui.import("split_embankments", "table", {
      "id": "users/arjenhaag/BangladeshErosion/split_embank_1"
    }) || ee.FeatureCollection("users/arjenhaag/BangladeshErosion/split_embank_1"),
    embankments_2013 = ui.import && ui.import("embankments_2013", "table", {
      "id": "users/arjenhaag/BangladeshErosion/embankment_2013"
    }) || ee.FeatureCollection("users/arjenhaag/BangladeshErosion/embankment_2013"),
    ferry_terminals = ui.import && ui.import("ferry_terminals", "table", {
      "id": "users/arjenhaag/BangladeshErosion/ferry_terminals"
    }) || ee.FeatureCollection("users/arjenhaag/BangladeshErosion/ferry_terminals"),
    biwta_ghats = ui.import && ui.import("biwta_ghats", "table", {
      "id": "users/arjenhaag/BangladeshErosion/biwta_ghats"
    }) || ee.FeatureCollection("users/arjenhaag/BangladeshErosion/biwta_ghats"),
    transition_1988_2021 = ui.import && ui.import("transition_1988_2021", "image", {
      "id": "users/arjenhaag/BangladeshErosion/transition_1988_2021"
    }) || ee.Image("users/arjenhaag/BangladeshErosion/transition_1988_2021"),
    transition_yearly_1988_2021 = ui.import && ui.import("transition_yearly_1988_2021", "imageCollection", {
      "id": "users/arjenhaag/BangladeshErosion/transition_yearly"
    }) || ee.ImageCollection("users/arjenhaag/BangladeshErosion/transition_yearly"),
    Landsat_water = ui.import && ui.import("Landsat_water", "imageCollection", {
      "id": "users/arjenhaag/BangladeshErosion/Landsat_water_TOA_v2"
    }) || ee.ImageCollection("users/arjenhaag/BangladeshErosion/Landsat_water_TOA_v2"),
    JRC_water = ui.import && ui.import("JRC_water", "image", {
      "id": "JRC/GSW1_4/GlobalSurfaceWater"
    }) || ee.Image("JRC/GSW1_4/GlobalSurfaceWater"),
    JRC_yearly = ui.import && ui.import("JRC_yearly", "imageCollection", {
      "id": "JRC/GSW1_4/YearlyHistory"
    }) || ee.ImageCollection("JRC/GSW1_4/YearlyHistory"),
    JRC_monthly = ui.import && ui.import("JRC_monthly", "imageCollection", {
      "id": "JRC/GSW1_4/MonthlyHistory"
    }) || ee.ImageCollection("JRC/GSW1_4/MonthlyHistory"),
    coastalDEM = ui.import && ui.import("coastalDEM", "image", {
      "id": "users/arjenhaag/BangladeshErosion/Coastal_DEM"
    }) || ee.Image("users/arjenhaag/BangladeshErosion/Coastal_DEM"),
    NASADEM = ui.import && ui.import("NASADEM", "image", {
      "id": "NASA/NASADEM_HGT/001"
    }) || ee.Image("NASA/NASADEM_HGT/001"),
    MERIT = ui.import && ui.import("MERIT", "image", {
      "id": "MERIT/DEM/v1_0_3"
    }) || ee.Image("MERIT/DEM/v1_0_3"),
    WL_100yRP = ui.import && ui.import("WL_100yRP", "table", {
      "id": "users/arjenhaag/BangladeshErosion/WL_100yRP"
    }) || ee.FeatureCollection("users/arjenhaag/BangladeshErosion/WL_100yRP"),
    Jamuna_riverbank_2019_erosion_risk = ui.import && ui.import("Jamuna_riverbank_2019_erosion_risk", "table", {
      "id": "users/arjenhaag/BangladeshErosion/Jamuna_riverbank_2019_erosion_risk"
    }) || ee.FeatureCollection("users/arjenhaag/BangladeshErosion/Jamuna_riverbank_2019_erosion_risk");
// Bangladesh erosion/sedimentation monitor
var admin_1 = ee.FeatureCollection("projects/ee-tjallingdejong/assets/ErosionMonitor/admin_boundary_division");
var admin_2 = ee.FeatureCollection("projects/ee-tjallingdejong/assets/ErosionMonitor/admin_boundary_district");
var admin_3 = ee.FeatureCollection("projects/ee-tjallingdejong/assets/ErosionMonitor/admin_boundary_upazila");
var admin_4 = ee.FeatureCollection("projects/ee-tjallingdejong/assets/ErosionMonitor/admin_boundary_union");
// print(admin_1.first());
// print(admin_2.first());
// print(admin_3.first());
// print(admin_4.first());
// NOTES:
/*
- restructured version using separate modules
- admin bounds: lvl 1: division, 2: district, 3:upazilla, 4:union
- BWDB jurisdictions: level1: central ofice (national), 2:zone, 3:circle, 4:division
- show erosion impact at admin level in charts, for various landcover datasets
  (add ESRI?)
- use year closest to selected (end) year?
- removed this data import (unused / commented out, but might be relevant for future use):
  var rivers_test = ee.FeatureCollection("users/kymoslager/river_buf")
*/
// ---------------------------------------------------------------------------------------------------- //
// Parameters
// ---------------------------------------------------------------------------------------------------- //
// defaults
var default_start_year  = 1988;
var default_end_year    = 2021;
// var default_start_month = 1;
// var default_end_month   = 12;
var default_start_year_current_polders = 1988;
var default_selection = 'Polders';  // options: Polders, Embankment, Point, None
var default_admin = 'Upazillas';  // options: Division, District, Upazilla, Union
var buffer_embankments = 200;  // to assess erosion/sedimentation near embankments
var buffer_embank_to_point = 20000;  // to find modelled water level point near embankment
// water depth classes
var F0 = [0, 0.3];
var F1 = [0.3, 0.9];
var F2 = [0.9, 1.8];
var F3 = [1.8, 3.6];
var F4 = [3.6, 999];
var waterDepth_classes = [F0, F1, F2, F3, F4];
// UI
var fontSize_sub = '12px';
var selector_message = {
  // 'Polders (original)': 'Click on a (original) polder to query an analysis over the area within the polder.',
  // 'Polders (current)': 'Click on a (current) polder to query an analysis over the area within the polder and the embankment around it.',
  'Polders': "Click on a polder to query an analysis over the area within the original polder and the embankment around the current polder.\
              'Reduction of area' refers to the change in area when comparing the original to the current polders. 'Land -> Water' refers to area\
              that changed from being classified as land to water within the chosen time period (and vice versa). All values are shown in\
              hectares (ha).",
  'Embankment': "Click on an embankment section to simulate that section failing and water entering its polder, analyzing affected population\
                 and land cover. This is done by finding the closest located modelled water level point and assuming that water level spreading\
                 over the entire polder.",
  'Admin. bounds': "Click on an administrative boundary to assess the potential economic impact of erosion there.\
                    All area values are shown in hectares (ha), all monetary values in BDT.",
  'Point': "Click on a point to query an analysis for that specific point (pixel) using the water/land classification data that is behind\
            the transition (erosion/sedimentation) classification.",
  'None': "Select this option to hide the charts and disable functionality to query an analysis by clicking on the map,\
           making browsing the map itself easier."
};
// scale for flood impact analysis
// var pop_scale = 100;  // WorldPop approx
var pop_scale = 92.77;  // WorldPop exact
// var land_scale = 30;  // JRC / Landsat
var land_scale = 10;  // WorldCover
// landcover processing and visualization
var lc_remap_in = [10,20,30,40,50,60,70,80,90,95,100];
var lc_remap_out = [1,2,3,4,5,6,7,8,9,10,11];
var lc_names  = ["Trees","Shrubland","Grassland","Cropland","Built-up","Barren / sparse vegetation","Snow and ice","Open water","Herbaceous wetland","Mangroves","Moss and lichen"];
var lc_colors = ["#006400","#ffbb22","#ffff4c","#f096ff","#fa0000","#b4b4b4","#f0f0f0","#0064c8","#0096a0","#00cf75","#fae6a0"];
// var lc_remap_in = [10,20,30,40,50,60,80,90];
// var lc_remap_out = [1,2,3,4,5,6,7,8];
// var lc_names  = ["Trees","Shrubland","Grassland","Cropland","Built-up","Barren / sparse vegetation","Open water","Herbaceous wetland"];
// var lc_colors = ["#006400","#ffbb22","#ffff4c","#f096ff","#fa0000","#b4b4b4","#0064c8","#0096a0"];
// population processing and visualization
var pop_thresh = 5;  // 10 used before
// land type value
var land_values = ee.Dictionary({
  'build': ee.Dictionary({
    'base': 3706500,
    '3times':  11119500
  }),
  'agri': ee.Dictionary({
    'base': 2965200,
    '3times':  8895600
  })
});
// chart visuals
var color_land       = 'brown';
var color_seas_water = 'blue';
var color_perm_water = 'purple';
var color_sediment   = '#109618';  // default Google chart green
var color_erosion    = '#3366CC';  // default Google chart blue 
// map visuals
var vals_erode_polder    = [0,2000,4000,6000,8000,10000];
// var vals_pcnt_erode_embank    = [0,20,40,60,80,100];
// var palette_pcnt_erode_embank = ['1a9850','91cf60','d9ef8b','fee08b','fc8d59','d73027'];
var vals_pcnt_erode_embank    = [10,30,50,70,90];
var palette_pcnt_erode_embank = ['1a9641','a6d96a','ffffbf','fdae61','d7191c'];
var paletteWaterDepth = ['d2ffbe', 'bdd2ff', '73b2ff', '0071fe', '004da7'];
var waterDepth_styling = '\
<RasterSymbolizer>\
  <ColorMap extended="true" >\
    <ColorMapEntry color="#d2ffbe" quantity="0.01" label="F0"/>\
    <ColorMapEntry color="#bdd2ff" quantity="0.31" label="F1"/>\
    <ColorMapEntry color="#73b2ff" quantity="0.91" label="F2"/>\
    <ColorMapEntry color="#0071fe" quantity="1.81" label="F3"/>\
    <ColorMapEntry color="#004da7" quantity="3.61" label="F4"/>\
  </ColorMap>\
</RasterSymbolizer>';
var visParams_mask_black = {min:0, max:1, palette:['white','black']};
var visParams_mask_white = {min:0, max:1, palette:['black','white']};
var visParams_monthly = {min:0, max:2, palette:['grey','white','blue']};
var visParams_yearly = {min:0, max:3, palette:['grey','white','lightblue','blue']};
var visParams_dynamics = {min:0, max:16, palette:['white','green','yellow','orange','red']};
var visParams_trans = {min:-2, max:3, palette:['green','white','white','white','blue','lightblue']};
var visParams_DEM = {min:0, max:10, palette:['blue','green','yellow','red','white']};
var visParams_depth = {min:0, max:3.6, palette:['white','blue']};
var visParams_lc = {min:lc_remap_out[0], max:lc_remap_out[-1], palette:lc_colors};
var visParams_pop = {min:pop_thresh, max:100, palette:['#fff7ec','#fdbb84','#d7301f']};
// ---------------------------------------------------------------------------------------------------- //
// Processing
// ---------------------------------------------------------------------------------------------------- //
// align name property
// print(polders.first());
// print(polders_new.first());
polders = polders.select(['SNAME'], ['name']);
polders_new = polders_new.select(['SNAME'], ['name']);
// get country boundaries
// var country = GAUL.filter(ee.Filter.eq('ADM0_NAME', 'Bangladesh'));
// var other_countries = GAUL.filter(ee.Filter.eq('ADM0_NAME', 'Bangladesh').not());
country = country_v2;
// other admin levels
admin_1 = admin_1.map(function(f) {
  return f.set('name', f.get('DIVISION'));
});
admin_2 = admin_2.map(function(f) {
  return f.set('name', f.get('DISTRICT_N'));
});
admin_3 = admin_3.map(function(f) {
  return f.set('name', f.get('UPAZILA'));
});
admin_4 = admin_4.map(function(f) {
  return f.set('name', f.get('UNINAME'));
});
var admin_bounds = ee.Dictionary({
  'Divisions': admin_1,
  'Districts': admin_2,
  'Upazillas': admin_3,
  'Unions': admin_4
});
// var admin_names = ee.Dictionary({
//   'Divisions': 'DIVNAME',
//   'Districts': 'DISTNAME',
//   'Upazillas': 'THANAME',
//   'Unions': 'UNINAME'
// });
// background layer
var background_bbox = ee.Geometry.Rectangle({coords:[60,0,120,40], geodesic:false});
var background_other = ee.Image.constant(0).clip(background_bbox.difference(country.geometry(), ee.ErrorMargin(100)));
var background = ee.Image.constant(0).clipToCollection(country);
// landcover
WorldCover = WorldCover.filterBounds(country.geometry().bounds());
WorldCover = WorldCover.mosaic().clip(country.geometry()).remap(lc_remap_in, lc_remap_out);
// population
WorldPop = WorldPop.filterBounds(country.geometry().bounds());
WorldPop = WorldPop.mosaic().clip(country.geometry());
HRSL = HRSL.filterBounds(country.geometry().bounds());
HRSL = HRSL.mosaic().clip(country.geometry());
// DEM
coastalDEM = coastalDEM.divide(1000); // from mm to m
NASADEM = NASADEM.select('elevation');
// model points (water level)
WL_100yRP = WL_100yRP.filter(ee.Filter.bounds(polders_new.geometry()).not());
// ---------------------------------------------------------------------------------------------------- //
// Functions
// ---------------------------------------------------------------------------------------------------- //
var ui_funcs = require('users/arjenhaag/ErosionBangladesh:app/ui_funcs.js');
var geom_funcs = require('users/arjenhaag/ErosionBangladesh:app/geom_funcs.js');
var calc_funcs = require('users/arjenhaag/ErosionBangladesh:app/calc_funcs.js');
var util_funcs = require('users/arjenhaag/ErosionBangladesh:app/util_funcs.js');
var chart_funcs = require('users/arjenhaag/ErosionBangladesh:app/chart_funcs.js');
// var mapClick = function(coords) {
var mapClick = function(coords, polders_withdata, JRC_yearly_2_tmp, JRC_yearly_2_raw, JRC_monthly_2_tmp, JRC_monthly_2_raw) {
  // print(coords);
  // clear previously clicked layer(s)
  // clearLayer('clicked feature');
  // clearLayers(['clicked feature', 'model point']);
  clearLayers(['clicked feature', 'model point', 'water depths - polder (coastal DEM)', 'water depths - polder (NASADEM)', 'water depths - polder (MERIT DEM)']);
  // clear UI
  charts.clear();
  charts_loading_mssg.setValue('Calculating...');
  charts_loading_mssg.style().set('shown', true);
  analyser_name.setValue('');
  analyser_name_2.setValue('');
  analyser_name_3.setValue('');
  analyser_lost_total.setValue('');
  analyser_eroded.setValue('');
  analyser_eroded_2.setValue('');
  analyser_sedimented.setValue('');
  analyser_embank_len.setValue('');
  analyser_wl.setValue('');
  analyser_eroded_built.setValue('');
  analyser_eroded_crops.setValue('');
  analyser_eroded_built_dmg.setValue('');
  analyser_eroded_crops_dmg.setValue('');
  // get clicked point
  var clicked_point = ee.Geometry.Point(coords.lon, coords.lat);
  // proceed based on user selection
  if (analysis_selector.getValue() == 'Polders') {
    // get clicked polder
    var clicked_polder_1 = polders.filterBounds(clicked_point);
    var clicked_polder_2 = polders_new.filterBounds(clicked_point);
    var clicked_polder_3 = clicked_polder_1.merge(clicked_polder_2);
    var clicked_polder_name = clicked_polder_3.aggregate_histogram('name').keys().get(0);
    var clicked_polder = polders.filter(ee.Filter.eq('name', clicked_polder_name));
    clicked_polder_name.evaluate(function(val, err) {
      if (!err) {
        // add to map
        Map.addLayer(clicked_polder, {}, 'clicked feature', true, 0.5);
        // further analysis
        getClickedFeatureValues(polders_withdata, clicked_point);
        getClickedFeatureCharts(polders_stats, clicked_point);
        getClickedFeatureEmbankmentCharts(clicked_point);
      } else {
        // print(err);
        charts_loading_mssg.setValue('Please click inside a polder, or choose a different selection method in the interface to suppress this functionality.');
      }
    });
  }
  if (analysis_selector.getValue() == 'Embankment') {
    // get clicked embankment
    // Map.addLayer(clicked_point.buffer(200), {}, 'buffer around clicked point', false);
    var clicked_embankement = ee.Feature(split_embankments.filterBounds(clicked_point.buffer(200)).first());
    // get embankment strecth length
    var clicked_embank_len = ee.Number(clicked_embankement.length()).round();
    // get polder of embankment
    var polder_of_embankment = ee.Feature(polders_new.filterBounds(clicked_embankement.geometry()).first());
    polder_of_embankment.get('name').evaluate(function(val, err) {
      if (!err) {
        // add clicked embankment to map
        Map.addLayer(clicked_embankement, {}, 'clicked feature', true);
        // get closest modelled water level point
        var model_point = WL_100yRP.filterBounds(clicked_embankement.buffer(buffer_embank_to_point).geometry());
        // Map.addLayer(clicked_embankement.buffer(buffer_embank_to_point), {}, 'buffer around clicked embankment', false);
        model_point = ee.Feature(model_point.map(function(f) {
          return f.set('distance_to_clicked_embankment', ee.Feature(f).distance(clicked_embankement.geometry()));
        }).sort('distance_to_clicked_embankment').first());
        // Map.addLayer(model_point, {color:'red'}, 'model point', true);
        // var wl = model_point.get('WL_100RP');
        // display values in app
        // clicked_name.evaluate(function(val, err) {
        //   analyser_name_2.setValue(val);
        // });
        analyser_name_2.setValue(val);
        clicked_embank_len.format("%.0f").cat(' m').evaluate(function(val, err) {
          analyser_embank_len.setValue(val);
        });
        // ee.Number(wl).format("%.2f").cat(' m').evaluate(function(val, err) {
        //   analyser_wl.setValue(val);
        // })
        ee.Number(model_point.get('WL_100RP')).format("%.2f").cat(' m').evaluate(function(val, err) {
          if (!err) {
            // add to map
            Map.addLayer(model_point, {color:'red'}, 'model point', true);
            // display value in app
            analyser_wl.setValue(val);
            // further analysis
            // spreadWaterPolder(polder_of_embankment, val);
            // spreadWaterPolder(polder_of_embankment, ee.Number(model_point.get('WL_100RP')));
            spreadWaterPolder(polder_of_embankment, clicked_embankement, ee.Number(model_point.get('WL_100RP')));
          } else {
            // print(err);
            analyser_wl.setValue('None');
            charts_loading_mssg.setValue('Could not find a modelled water level point close to this embankment stretch. Please try a different embankment, or choose a different selection method in the interface to suppress this functionality.');
          }
        });
      } else {
        // print(err);
        charts_loading_mssg.setValue('Please click on an embankment, or choose a different selection method in the interface to suppress this functionality.');
      }
    });
  }
  if (analysis_selector.getValue() == 'Admin. bounds') {
    charts_loading_mssg.style().set('shown', false);
    // var level_name = 'Unions';
    var level_name = admin_selector.getValue();
    var clicked_feature = ee.Feature(ee.FeatureCollection(admin_bounds.get(level_name)).filterBounds(clicked_point).first());
    clicked_feature.get('name').evaluate(function(val, err) {
      if (!err) {
        // add clicked embankment to map
        Map.addLayer(clicked_feature, {}, 'clicked feature', true);
        // further analysis
        getClickedAdminValues(clicked_feature);
      } else {
        charts_loading_mssg.setValue('Please click on an administrative area, or choose a different selection method in the interface to suppress this functionality.');
        charts_loading_mssg.style().set('shown', true);
      }
    });
  }
  if (analysis_selector.getValue() == 'Point') {
    getClickedPointCharts(clicked_point, JRC_yearly_2_tmp, JRC_yearly_2_raw, JRC_monthly_2_tmp, JRC_monthly_2_raw);
  }
};
function updateApp() {
  // clear map and UI
  // Map.clear();
  // clearLayers(['dynamics', 'situation start year', 'situation end year', 'transition']);
  charts.clear();
  analyser_name.setValue('');
  analyser_name_2.setValue('');
  analyser_name_3.setValue('');
  analyser_lost_total.setValue('');
  analyser_eroded.setValue('');
  analyser_eroded_2.setValue('');
  analyser_sedimented.setValue('');
  analyser_embank_len.setValue('');
  analyser_wl.setValue('');
  analyser_eroded_built.setValue('');
  analyser_eroded_crops.setValue('');
  analyser_eroded_built_dmg.setValue('');
  analyser_eroded_crops_dmg.setValue('');
  // get time period
  var start_year = ee.Number(year_slider_1.getValue());
  var end_year = ee.Number(year_slider_2.getValue());
  var show_years_warning = ee.Algorithms.If(end_year.lte(start_year), true, false).getInfo();
  years_warning_box.style().set('shown', show_years_warning);
  // get time series
  var JRC_yearly_2_raw = JRC_yearly.filter(ee.Filter.gte('year', start_year))
                               .filter(ee.Filter.lte('year', end_year));
  var JRC_yearly_2_tmp = JRC_yearly_2.filter(ee.Filter.gte('year', start_year))
                               .filter(ee.Filter.lte('year', end_year));
  var JRC_monthly_2_raw = JRC_monthly.filter(ee.Filter.gte('year', start_year))
                                .filter(ee.Filter.lte('year', end_year));
                                // .filter(ee.Filter.gte('month', start_month))
                                // .filter(ee.Filter.lte('month', end_month));
  // var JRC_monthly_2 = JRC_monthly.map(function(img) {
  //   return img.updateMask(img);
  // });
  // JRC_monthly_2 = JRC_monthly_2.map(function(img) {
  //   var tmp_imgs = JRC_monthly_2.filterDate('1984-01-01', img.date()).sort('system:time_start');
  //   var img_filled = tmp_imgs.reduce(ee.Reducer.lastNonNull()).rename('water');
  //   return img_filled.copyProperties(img).copyProperties(img, ['system:index','system:time_start']);
  //                   // .set('img_count', tmp_imgs.size());
  // });
  // JRC_monthly_2 = JRC_monthly_2.filter(ee.Filter.gte('year', default_start_year));
  // // print(JRC_monthly_2.first());
  // JRC_monthly_2 = JRC_monthly_2.map(function(img) {
  //   return img.updateMask(img);
  // });
  var JRC_monthly_2_tmp = JRC_monthly_2.filter(ee.Filter.gte('year', start_year))
                                .filter(ee.Filter.lte('year', end_year));
                                // .filter(ee.Filter.gte('month', start_month))
                                // .filter(ee.Filter.lte('month', end_month));
  // get dynamics/variability
  var dynamics = calc_funcs.calcDynamics(JRC_yearly, start_year, end_year);
  updateLayer(dynamics, 'dynamics', visParams_dynamics, false);
  // get transition
  var transition_data = calc_funcs.calcTransition(JRC_monthly_2, start_year, end_year);
  var transition = ee.Image(transition_data.select('transition'));
  // updateLayer(ee.Image(JRC_yearly_2_raw.filter(ee.Filter.eq('year', start_year)).first()), 'situation start year (JRC yearly, raw)', visParams_yearly, false);
  // updateLayer(ee.Image(JRC_yearly_2_raw.filter(ee.Filter.eq('year', end_year)).first()), 'situation end year (JRC yearly, raw)', visParams_yearly, false);
  // updateLayer(ee.Image(JRC_yearly_2_tmp.filter(ee.Filter.eq('year', start_year)).first()), 'situation start year (JRC yearly)', visParams_yearly, false);
  // updateLayer(ee.Image(JRC_yearly_2_tmp.filter(ee.Filter.eq('year', end_year)).first()), 'situation end year (JRC yearly)', visParams_yearly, false);
  updateLayer(ee.Image(transition_data.select('start_data')), 'situation start year', visParams_monthly, false);
  updateLayer(ee.Image(transition_data.select('end_data')), 'situation end year', visParams_monthly, false);
  updateLayer(transition_1988_2021.select('transition'), 'transition 1988-2021', visParams_trans, false);
  updateLayer(transition, 'transition', visParams_trans, true);
  // get classes
  var erosion  = transition.eq(2);
  var sediment = transition.eq(-2);
  var thesame  = transition.eq(0);
  var no_data  = transition.eq(-3).or(transition.eq(-1)).or(transition.eq(1)).or(transition.eq(3));
  // aggregate to polders
  var polders_withdata = calc_funcs.aggregateToFeatures(polders, transition);
  var polders_new_withdata = calc_funcs.aggregateToFeatures(polders_new, transition);
  // var polders_new_embankments_buffered_withdata = calc_funcs.aggregateToFeatures(polders_new_embankments_buffered, transition);
  // aggregate to river segments
  // var rivers_withdata = calc_funcs.aggregateToFeatures(rivers_test, transition);
  // merge features
  // polders_withdata = polders_withdata.map(function(f) {return f.set('feature_type', 'Polders')});
  // rivers_withdata = rivers_withdata.map(function(f) {return f.set('feature_type', 'River segments')});
  // var all_features = polders_withdata.merge(rivers_withdata);
  // map click functionality
  Map.unlisten();
  Map.onClick(function(coords) {
    // mapClick(coords);
    mapClick(coords, polders_withdata, JRC_yearly_2_tmp, JRC_yearly_2_raw, JRC_monthly_2_tmp, JRC_monthly_2_raw);
  });
}
function getClickedFeatureValues(clicked_feature) {
  var clicked_polder_name = clicked_feature.get('name');
  // Map.addLayer(ee.Image().byte().paint(clicked_feature,0,2), {}, 'clicked feature', true);
  // Map.addLayer(clicked_feature, {}, 'clicked feature', true, 0.5);
  clicked_feature = clicked_feature.first();
  // print(clicked_feature);
  // get relevant values for display in app
  // var clicked_name = clicked_polder.get('SNAME');
  var clicked_name = clicked_feature.get('name');
  var clicked_erosion_total = ee.Number(polders_new.filter(ee.Filter.eq('name', clicked_polder_name)).first().get('eroded_total_area_ha'));
  var clicked_erosion_total_pcnt = clicked_erosion_total.divide(clicked_feature.geometry().area().divide(1e4)).multiply(100);
  clicked_erosion_total = clicked_erosion_total.format("%.0f").cat(' (').cat(clicked_erosion_total_pcnt.format("%.2f")).cat('%)');
  // var clicked_nodata = ee.Number(clicked_feature.get('sum_nodata'));
  // var clicked_nochange = ee.Number(clicked_feature.get('sum_nochange'));
  var clicked_erosion = ee.Number(clicked_feature.get('sum_erosion')).divide(10000).round();
  var clicked_sedimentation = ee.Number(clicked_feature.get('sum_sedimentation')).divide(10000).round();
  var eroded_pcnt = ee.Number(clicked_feature.get('sum_erosion')).divide(clicked_feature.geometry().area()).multiply(100);
  var sedimented_pcnt = ee.Number(clicked_feature.get('sum_sedimentation')).divide(clicked_feature.geometry().area()).multiply(100);
  clicked_erosion = clicked_erosion.format("%.0f").cat(' (').cat(eroded_pcnt.format("%.2f")).cat('%)');
  clicked_sedimentation = clicked_sedimentation.format("%.0f").cat(' (').cat(sedimented_pcnt.format("%.2f")).cat('%)');
  // display values in app
  clicked_name.evaluate(function(val, err) {
    analyser_name.setValue(val);
  });
  clicked_erosion_total.evaluate(function(val, err) {
    analyser_lost_total.setValue(val);
  });
  clicked_erosion.evaluate(function(val, err) {
    analyser_eroded.setValue(val);
  });
  clicked_sedimentation.evaluate(function(val, err) {
    analyser_sedimented.setValue(val);
  });
  return clicked_feature;
}
function getClickedFeatureCharts(features, clicked_point) {
  // var clicked_feature_timeseries = features.filterBounds(clicked_point).first();
  // var clicked_feature_name = clicked_feature_timeseries.get('name');
  var clicked_polder_1 = polders.filterBounds(clicked_point);
  var clicked_polder_2 = polders_new.filterBounds(clicked_point);
  var clicked_polder_3 = clicked_polder_1.merge(clicked_polder_2);
  var clicked_feature_name = clicked_polder_3.aggregate_histogram('name').keys().get(0);
  var clicked_feature_timeseries = features.filter(ee.Filter.eq('name', clicked_feature_name)).first();
  // merge all data into a single (combo) chart
  var clicked_feature_chart_combo = chart_funcs.createComboChart(clicked_feature_timeseries);
  // charts.add(clicked_feature_chart_combo);
  clicked_feature_name.evaluate(function(val, err) {
    clicked_feature_chart_combo.setOptions({
      title: 'Time series within original ' + val,
      seriesType: 'bars',
      series: {
        0: {type:'line', color:color_land, targetAxisIndex:0},
        1: {type:'line', color:color_seas_water, targetAxisIndex:0},
        2: {type:'line', color:color_perm_water, targetAxisIndex:0},
        3: {color:color_sediment, targetAxisIndex:1},
        4: {color:color_erosion, targetAxisIndex:1}
      },
      vAxes: {
        0: {title:'Total area land/water (ha)'},
        1: {title:'Total area erosion/sedimentation (ha)'}
      }
    });
    charts_loading_mssg.style().set('shown', false);
    charts.add(clicked_feature_chart_combo);
  });
  return clicked_feature_timeseries;
}
function getClickedFeatureEmbankmentCharts(clicked_point) {
  // var clicked_polder = polders_new.filterBounds(clicked_point).first();
  // var clicked_polder_name = clicked_polder.get('name');
  var clicked_polder_1 = polders.filterBounds(clicked_point);
  var clicked_polder_2 = polders_new.filterBounds(clicked_point);
  var clicked_polder_3 = clicked_polder_1.merge(clicked_polder_2);
  var clicked_polder_name = clicked_polder_3.aggregate_histogram('name').keys().get(0);
  // var split_embankments_org = geom_funcs.splitLine(ee.Feature(polders_line_new.filter(ee.Filter.eq('SNAME', clicked_polder_name)).first()));
  // print(polders_line_new.filter(ee.Filter.eq('SNAME', clicked_polder_name)).first());
  // Map.addLayer(split_embankments_org);
  var clicked_embankment = polders_new_embankments_buffered_stats.filter(ee.Filter.eq('SNAME', clicked_polder_name)).first();
  // merge all data into a single (combo) chart
  var clicked_feature_chart_combo = chart_funcs.createComboChart(clicked_embankment);
  // charts.add(clicked_feature_chart_combo);
  clicked_polder_name.evaluate(function(val, err) {
    clicked_feature_chart_combo.setOptions({
      title: 'Time series near current embankment around ' + val + ' (within buffer of ' + buffer_embankments + 'm)',
      seriesType: 'bars',
      series: {
        0: {type:'line', color:color_land, targetAxisIndex:0},
        1: {type:'line', color:color_seas_water, targetAxisIndex:0},
        2: {type:'line', color:color_perm_water, targetAxisIndex:0},
        3: {color:color_sediment, targetAxisIndex:1},
        4: {color:color_erosion, targetAxisIndex:1}
      },
      vAxes: {
        0: {title:'Total area land/water (ha)'},
        1: {title:'Total area erosion/sedimentation (ha)'}
      }
    });
    charts_loading_mssg.style().set('shown', false);
    charts.add(clicked_feature_chart_combo);
  });
  return clicked_embankment;
}
function getClickedPointCharts(clicked_point, JRC_yearly_2_tmp, JRC_yearly_2_raw, JRC_monthly_2_tmp, JRC_monthly_2_raw) {
  // Map.addLayer(clicked_point);
  // get time series at clicked point
  var point_chart = chart_funcs.getPointChart(JRC_yearly_2_tmp, clicked_point, 'Yearly water classification at clicked point');
  var point_chart_raw = chart_funcs.getPointChart(JRC_yearly_2_raw, clicked_point, 'Yearly water classification (raw) at clicked point');
  var point_chart_2 = chart_funcs.getPointChart(JRC_monthly_2_tmp, clicked_point, 'Monthly water classification at clicked point', [{v:0, f:'no data'}, {v:1, f:'land'}, {v:2, f:'water'}]);
  var point_chart_2_raw = chart_funcs.getPointChart(JRC_monthly_2_raw, clicked_point, 'Monthly water classification (raw) at clicked point', [{v:0, f:'no data'}, {v:1, f:'land'}, {v:2, f:'water'}]);
  // var point_chart_transition = chart_funcs.getPointChart(transition_yearly, clicked_point, 'Yearly erosion/sedimentation at clicked point');  // UPDATE!
  // display charts in app
  charts_loading_mssg.style().set('shown', false);
  charts.add(point_chart);
  // charts.add(point_chart_raw);
  charts.add(point_chart_2);
  // charts.add(point_chart_2_raw);
  // charts.add(point_chart_transition);
  return clicked_point;
}
function getClickedAdminValues(clicked_feature) {
  // get relevant values for display in app
  // print(clicked_feature);
  var clicked_name = clicked_feature.get('name');
  var eroded_1988_2021 = transition_1988_2021.select('transition').eq(2);
  // Map.addLayer(eroded_1988_2021, {min:0, max:1, palette:['white','blue']});
  var eroded_area = ee.Image.pixelArea().multiply(eroded_1988_2021).reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: clicked_feature.geometry(),
    scale: 30,
    // crs: ,
    // crsTransform: ,
    // maxPixels: 
  });
  eroded_area = ee.Number(eroded_area.values().get(0)).divide(1e4).multiply(100).round().divide(100);
  var eroded_pcnt = eroded_area.divide(clicked_feature.geometry().area().divide(1e4)).multiply(100);
  var clicked_erosion = eroded_area.format("%.0f").cat(' (').cat(eroded_pcnt.format("%.2f")).cat('% of total)');
  var eroded_built = ee.Image.pixelArea().multiply(eroded_1988_2021.multiply(WorldCover.eq(5))).reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: clicked_feature.geometry(),
    scale: 30,
    // crs: ,
    // crsTransform: ,
    // maxPixels: 
  });
  eroded_built = ee.Number(eroded_built.values().get(0)).divide(1e4).multiply(100).round().divide(100);
  // var eroded_built_pcnt = eroded_built.divide(clicked_feature.geometry().area().divide(1e4)).multiply(100);
  var eroded_built_pcnt = eroded_built.divide(eroded_area).multiply(100);
  var clicked_erosion_built = eroded_built.format("%.0f").cat(' (').cat(eroded_built_pcnt.format("%.2f")).cat('% of eroded)');
  var eroded_crops = ee.Image.pixelArea().multiply(eroded_1988_2021.multiply(WorldCover.eq(4))).reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: clicked_feature.geometry(),
    scale: 30,
    // crs: ,
    // crsTransform: ,
    // maxPixels: 
  });
  eroded_crops = ee.Number(eroded_crops.values().get(0)).divide(1e4).multiply(100).round().divide(100);
  // var eroded_crops_pcnt = eroded_crops.divide(clicked_feature.geometry().area().divide(1e4)).multiply(100);
  var eroded_crops_pcnt = eroded_crops.divide(eroded_area).multiply(100);
  var clicked_erosion_crops = eroded_crops.format("%.0f").cat(' (').cat(eroded_crops_pcnt.format("%.2f")).cat('% of eroded)');
  // get economic impact
  var dmg_build_base = eroded_built.multiply(ee.Dictionary(land_values.get('build')).get('base'));
  var dmg_build_3times = eroded_built.multiply(ee.Dictionary(land_values.get('build')).get('3times'));
  var dmg_crops_base = eroded_crops.multiply(ee.Dictionary(land_values.get('agri')).get('base'));
  var dmg_crops_3times = eroded_crops.multiply(ee.Dictionary(land_values.get('agri')).get('3times'));
  var clicked_erosion_build_dmg = dmg_build_base.divide(1000).format("%.0f").cat('k (base) / ').cat(dmg_build_3times.divide(1000).format("%.0f")).cat('k (GoB Order)');
  var clicked_erosion_crops_dmg = dmg_crops_base.divide(1000).format("%.0f").cat('k (base) / ').cat(dmg_crops_3times.divide(1000).format("%.0f")).cat('k (GoB Order)');
  // display values in app
  clicked_name.evaluate(function(val, err) {
    analyser_name_3.setValue(val);
  });
  clicked_erosion.evaluate(function(val, err) {
    analyser_eroded_2.setValue(val);
  });
  clicked_erosion_built.evaluate(function(val, err) {
    analyser_eroded_built.setValue(val);
  });
  clicked_erosion_crops.evaluate(function(val, err) {
    analyser_eroded_crops.setValue(val);
  });
  clicked_erosion_build_dmg.evaluate(function(val, err) {
    analyser_eroded_built_dmg.setValue(val);
  });
  clicked_erosion_crops_dmg.evaluate(function(val, err) {
    analyser_eroded_crops_dmg.setValue(val);
  });
  return clicked_feature;
}
// function spreadWaterPolder(polder, wl) {
function spreadWaterPolder(polder, embankment, wl) {
  // get the water depth image for the value of the selected model point
  var waterDepthImage_coastalDEM = ee.Image.constant(wl).subtract(coastalDEM);
  var waterDepthImage_NASADEM = ee.Image.constant(wl).subtract(NASADEM);
  var waterDepthImage_MERIT = ee.Image.constant(wl).subtract(MERIT);
  // helper function to constrain water spreading to hydraulically connected regions from embankment
  // function spreadWaterHydraulicOnly(polder, embankment, waterDepthImage) {
  function spreadWaterHydraulicOnly(waterDepthImage) {
    // Map.addLayer(waterDepthImage.sldStyle(waterDepth_styling), {}, 'water depths - polder (initial)', false);
    var embankement_prep = embankment.buffer(buffer_embankments).intersection(polder.geometry());
    // Map.addLayer(embankement_prep, {}, 'embankment prep', false);
    var waterDepthImage_mask = waterDepthImage.gt(F0[0]);//.clip(polder.geometry());
    // Map.addLayer(waterDepthImage_mask, visParams_mask_black, 'mask', false);
    waterDepthImage_mask = waterDepthImage_mask.addBands(waterDepthImage_mask.rename('band2'));  // min reducer with reduceToVectors requires two bands
    var connected_water = waterDepthImage_mask.reduceToVectors({
      reducer: ee.Reducer.min(),  // default: ee.Reducer.countEvery()
      geometry: polder.geometry(),  // default: input image footprint
      scale: 30,
      // geometryType: 'polygon',  // default: 'polygon'
      // eightConnected: true,  // default: true
      // labelProperty: 'label',  // default: 'label'
      // crs: ,
      // crsTransform: ,
      // bestEffort: false,  // default: false
      maxPixels: 1e12,  // default: 1e7
      // tileScale 1,  // default: 1
      // geometryInNativeProjection: false  // default: false
    });
    // print('connected water:', connected_water);
    // Map.addLayer(connected_water, {}, 'connected water areas', false);
    connected_water = connected_water.filter(ee.Filter.gt('label', 0));
    // print('connected water:', connected_water);
    // Map.addLayer(connected_water, {}, 'connected water areas', false);
    connected_water = connected_water.filterBounds(embankement_prep.geometry());
    // Map.addLayer(connected_water, {}, 'connected water areas (2)', false);
    var connected_water_geom = connected_water.geometry()
    var geom1 = ee.Feature(connected_water_geom).set("val", connected_water_geom.area(ee.ErrorMargin(1, "meters")))
    var geom2 = embankment.set("val", 0.001)
    var geom_to_clip = ee.Feature(ee.FeatureCollection([geom1, geom2]).sort('val', false).first()).geometry()
    waterDepthImage = waterDepthImage.clip(geom_to_clip.dissolve(ee.ErrorMargin(1, 'meters')))
    return waterDepthImage;
  }
  waterDepthImage_coastalDEM = spreadWaterHydraulicOnly(waterDepthImage_coastalDEM);
  waterDepthImage_NASADEM = spreadWaterHydraulicOnly(waterDepthImage_NASADEM);
  waterDepthImage_MERIT = spreadWaterHydraulicOnly(waterDepthImage_MERIT);
  // update the relevant map layer
  // updateLayer(waterDepthImage.clip(polder.geometry()), 'water depths', visParams_depth);
  // updateLayer(waterDepthImage.clip(polder.geometry()).sldStyle(waterDepth_styling), 'water depths', {});
  // updateLayer(waterDepthImage_coastalDEM.clip(polder.geometry()).sldStyle(waterDepth_styling), 'water depths - polder (coastal DEM)', {}, true);
  // updateLayer(waterDepthImage_NASADEM.clip(polder.geometry()).sldStyle(waterDepth_styling), 'water depths - polder (NASADEM)', {}, false);
  // updateLayer(waterDepthImage_MERIT.clip(polder.geometry()).sldStyle(waterDepth_styling), 'water depths - polder (MERIT DEM)', {}, false);
  updateLayer(waterDepthImage_coastalDEM.sldStyle(waterDepth_styling), 'water depths - polder (coastal DEM)', {}, true);
  updateLayer(waterDepthImage_NASADEM.sldStyle(waterDepth_styling), 'water depths - polder (NASADEM)', {}, false);
  updateLayer(waterDepthImage_MERIT.sldStyle(waterDepth_styling), 'water depths - polder (MERIT DEM)', {}, false);
  // calculate affected exposure (e.g. population, crops)
  var affect_pop_coastalDEM = calc_funcs.calcAffectPopAll(ee.List(waterDepth_classes), waterDepthImage_coastalDEM, polder, WorldPop, pop_scale);
  var affect_pop_NASADEM = calc_funcs.calcAffectPopAll(ee.List(waterDepth_classes), waterDepthImage_NASADEM, polder, WorldPop, pop_scale);
  var affect_pop_MERIT = calc_funcs.calcAffectPopAll(ee.List(waterDepth_classes), waterDepthImage_MERIT, polder, WorldPop, pop_scale);
  var affect_land_coastalDEM = calc_funcs.calcAffectLandAll(ee.List(waterDepth_classes), waterDepthImage_coastalDEM, polder, WorldCover.eq(4), land_scale);
  var affect_land_NASADEM = calc_funcs.calcAffectLandAll(ee.List(waterDepth_classes), waterDepthImage_NASADEM, polder, WorldCover.eq(4), land_scale);
  var affect_land_MERIT = calc_funcs.calcAffectLandAll(ee.List(waterDepth_classes), waterDepthImage_MERIT, polder, WorldCover.eq(4), land_scale);
  // create affected exposure charts
  var chart_pop_affect = chart_funcs.getAffectExposureChart(
    [affect_pop_coastalDEM, affect_pop_NASADEM, affect_pop_MERIT],
    ['coastal DEM', 'NASADEM', 'MERIT'],
    'Affected Population (WorldPop)',
    'Number of people'
  );
  var chart_land_affect = chart_funcs.getAffectExposureChart(
    [affect_land_coastalDEM, affect_land_NASADEM, affect_land_MERIT],
    ['coastal DEM', 'NASADEM', 'MERIT'],
    'Affected Crops (WorldCover)',
    'Area of crops (ha)'
  );
  charts_loading_mssg.style().set('shown', false);
  charts.add(chart_pop_affect);
  charts.add(chart_land_affect);
}
function updateSelector() {
  // charts_loading_mssg.setValue('');
  charts_loading_mssg.style().set('shown', false);
  analyser_mssg.setValue(selector_message[analysis_selector.getValue()]);
  var selected_feature_name = analysis_selector.getValue().toLowerCase();
  if (selected_feature_name == 'polders') {
    admin_selector.style().set('shown', false);
    analyser_mssg.style().set('shown', true);
    analysis_panel_1.style().set('shown', true);
    analysis_panel_2.style().set('shown', false);
    analysis_panel_3.style().set('shown', false);
    charts.clear();
    charts_panel.style().set('shown', true);
    clearLayers(['clicked feature', 'model point', 'water depths - polder (coastal DEM)', 'water depths - polder (NASADEM)', 'water depths - polder (MERIT DEM)']);
    toggleLayersShown(['model water level points'], false);
    toggleLayersShown(['transition', 'polders (original)', 'polders (current)', 'completely eroded embankments'], true);
    Map.style().set('cursor','crosshair');
    Map.layers().forEach(function(layer) {
      // if (layer.get('name') == selected_feature_name) {
      //   layer.setShown(true);
      // }
      if ((layer.get('name') == 'Polders (original)') || (layer.get('name') == 'Polders (current)')) {
        layer.setShown(true);
      }
    });
  }
  if (selected_feature_name == 'embankment') {
    admin_selector.style().set('shown', false);
    // analyser_mssg.style().set('shown', false);
    analysis_panel_1.style().set('shown', false);
    analysis_panel_2.style().set('shown', true);
    analysis_panel_3.style().set('shown', false);
    charts.clear();
    charts_panel.style().set('shown', true);
    // charts.style().set('shown', false);
    clearLayer('clicked feature');
    toggleLayersShown(['transition', 'polders (original)', 'polders (current)', 'completely eroded embankments'], false);
    toggleLayersShown(['embankment erosion risk'], true);
    Map.style().set('cursor','crosshair');
  }
  if (selected_feature_name == 'admin. bounds') {
    admin_selector.style().set('shown', true);
    // analyser_mssg.style().set('shown', false);
    analysis_panel_1.style().set('shown', false);
    analysis_panel_2.style().set('shown', false);
    analysis_panel_3.style().set('shown', true);
    charts.clear();
    charts_panel.style().set('shown', true);
    // charts.style().set('shown', false);
    clearLayer('clicked feature');
    toggleLayersShown(['polders (original)', 'polders (current)', 'completely eroded embankments'], false);
    toggleLayersShown(['transition'], true);
    toggleLayerShown(admin_selector.getValue(), true);
    Map.style().set('cursor','crosshair');
  }
  if (selected_feature_name == 'point') {
    admin_selector.style().set('shown', false);
    // analyser_mssg.style().set('shown', false);
    analysis_panel_1.style().set('shown', false);
    analysis_panel_2.style().set('shown', false);
    analysis_panel_3.style().set('shown', false);
    charts.clear();
    charts_panel.style().set('shown', true);
    charts.style().set('shown', true);
    clearLayers(['clicked feature', 'model point', 'water depths - polder (coastal DEM)', 'water depths - polder (NASADEM)', 'water depths - polder (MERIT DEM)']);
    toggleLayersShown(['polders (original)', 'polders (current)', 'completely eroded embankments', 'embankment erosion risk'], false);
    toggleLayersShown(['transition'], true);
    Map.style().set('cursor','crosshair');
  }
  if (selected_feature_name == 'none') {
    admin_selector.style().set('shown', false);
    // analyser_mssg.style().set('shown', false);
    analysis_panel_1.style().set('shown', false);
    analysis_panel_2.style().set('shown', false);
    analysis_panel_3.style().set('shown', false);
    // charts.style().set('shown', false);
    charts.clear();
    charts_panel.style().set('shown', false);
    clearLayers(['clicked feature', 'model point', 'water depths - polder (coastal DEM)', 'water depths - polder (NASADEM)', 'water depths - polder (MERIT DEM)']);
    toggleLayersShown(['polders (original)', 'polders (current)', 'completely eroded embankments', 'embankment erosion risk'], false);
    toggleLayersShown(['transition'], true);
    Map.style().set('cursor','hand');
  // } else {
  //   admin_selector.style().set('shown', false);
  //   analyser_mssg.style().set('shown', false);
  //   analysis_panel_1.style().set('shown', false);
  //   analysis_panel_2.style().set('shown', false);
  //   analysis_panel_3.style().set('shown', false);
  //   charts.style().set('shown', false);
  //   clearLayers(['clicked feature', 'model point', 'water depths - polder (coastal DEM)', 'water depths - polder (NASADEM)', 'water depths - polder (MERIT DEM)']);
  }
}
function updateAdminSelector() {
  var level_name = admin_selector.getValue();
  // var admin_layer = ee.FeatureCollection(admin_bounds.get(level_name));
  // print(level_name);
  // print(admin_bounds.keys().remove(level_name));
  toggleLayerShown(level_name, true);
  // toggleLayersShown(admin_bounds.keys().remove(level_name), false);
  admin_bounds.keys().remove(level_name).evaluate(function(val, err) {
    toggleLayersShown(val, false);
  });
}
function clearLayer(name) {
  Map.layers().forEach(function(layer) {
    if (layer.get('name') == name) {
      Map.layers().remove(layer);
    }
  });
}
function clearLayers(layers) {
  layers.map(function(n) {
    clearLayer(n);
  });
}
function toggleLayerShown(name, shown) {
  Map.layers().forEach(function(layer) {
    if (layer.get('name') == name) {
      layer.setShown(shown);
    }
  });
}
function toggleLayersShown(layers, shown) {
  layers.map(function(n) {
    toggleLayerShown(n, shown);
  });
}
function updateLayer(new_layer, name, visParams, shown) {
  var found_layer = true;
  Map.layers().forEach(function(layer) {
    if (layer.get('name') == name) {
      // Map.layers().remove(layer);
      layer.setEeObject(new_layer);
      found_layer = false;
    }
  });
  if (found_layer) {
    Map.addLayer(new_layer, visParams, name, shown);
  }
}
// var moveCharts = function() {
//   if (charts_loc == 'map') {
//     // Map.remove(charts_panel);
//     // panel.widgets().insert(6, charts_panel);
//     charts_panel_map.clear();
//     charts_panel_ui = charts_panel_ui.add(charts_panel);
//     charts_loc = 'panel';
//   } else if (charts_loc == 'panel') {
//     // panel.widgets().remove(charts_panel);
//     // Map.add(charts_panel);
//     charts_panel_ui.clear();
//     charts_panel_map = charts_panel_map.add(charts_panel);
//     charts_loc = 'map';
//   }
// };
var toggleLegends = function() {
  legends.style().set('shown', !legends.style().get('shown'));
};
var toggleCharts = function() {
  charts.style().set('shown', !charts.style().get('shown'));
  // if (charts.style().get('shown') === false) {
  //   charts_panel.style().set({width:'150px'});
  // } else {
  //   charts_panel.style().set({width:'400px'});
  // }
};
var toggleRefs = function() {
  refs.style().set('shown', !refs.style().get('shown'));
};
var toggleDisclaimer = function() {
  disclaimer.style().set('shown', !disclaimer.style().get('shown'));
};
// ---------------------------------------------------------------------------------------------------- //
// Pre-calculate data
// ---------------------------------------------------------------------------------------------------- //
// convert current polders to raster
var polders_raster = polders_new.map(function(f) {
  return f.set('pixelVal', ee.Number(1));
}).reduceToImage(['pixelVal'], ee.Reducer.first());
polders_raster = polders_raster.reproject({crs:JRC_yearly.first().projection().crs(), scale:30});
// prepare JRC data
var JRC_yearly_2_raw = JRC_yearly.filter(ee.Filter.gte('year', default_start_year))
                                 .filter(ee.Filter.lte('year', default_end_year));
var JRC_monthly_2_raw = JRC_monthly.filter(ee.Filter.gte('year', default_start_year))
                              .filter(ee.Filter.lte('year', default_end_year));
                              // .filter(ee.Filter.gte('month', default_start_month))
                              // .filter(ee.Filter.lte('month', default_end_month));
var JRC_yearly_2  = calc_funcs.calcJRC_yearly(JRC_yearly);
var JRC_monthly_2 = calc_funcs.calcJRC_monthly(JRC_monthly);
JRC_yearly_2  = JRC_yearly_2.filter(ee.Filter.gte('year', default_start_year));
JRC_monthly_2 = JRC_monthly_2.filter(ee.Filter.gte('year', default_start_year));
// add recent data
// var JRC_last_year = JRC_yearly_2.sort('system:time_start', false).first().get('year');
// var new_years = Landsat_water.aggregate_array('year').distinct();
// print(new_years);
// style embankments based on offline analysis on erosion risk (percentage eroded in full time period per 1km stretch)
split_embankments = split_embankments.map(function(f) {
  var tmp_pcnt_erode_embank = ee.Number(f.get('Split_i_36')).multiply(100);
  var closest_match_idx = util_funcs.findClosestMatch(vals_pcnt_erode_embank, tmp_pcnt_erode_embank);
  return f.set('style', {'color': ee.List(palette_pcnt_erode_embank).get(closest_match_idx), 'width':3});
});
Jamuna_riverbank_2019_erosion_risk = Jamuna_riverbank_2019_erosion_risk.map(function(f) {
  var closest_match_idx = util_funcs.findClosestMatch(vals_pcnt_erode_embank, f.get('erosion_pcnt'));
  return f.set('style', {'color': ee.List(palette_pcnt_erode_embank).get(closest_match_idx), 'width':3});
});
// total erosion current vs original polders
// var polders_new_total_erosion = polders_new.map(function(f) {
polders_new = polders_new.map(function(f) {
  var f_org = polders.filter(ee.Filter.eq('name', f.get('name')));
  var f_erosion_geom = f_org.geometry().difference(f.geometry()).dissolve();
  var f_erosion = ee.Number(f_erosion_geom.area()).divide(1e4).multiply(100).round().divide(100);
  var f_erosion_pcnt = f_erosion.divide(f_org.geometry().area().divide(1e4)).multiply(100);
  var closest_match_idx_val  = util_funcs.findClosestMatch(vals_erode_polder, f_erosion);
  var closest_match_idx_pcnt = util_funcs.findClosestMatch(vals_pcnt_erode_embank, f_erosion_pcnt);
  // return f.setGeometry(f_erosion_geom);
  return f.set(
    'eroded_total_area_ha', f_erosion, 'eroded_total_area_pcnt', f_erosion_pcnt,
    'style_val', {'color': ee.List(palette_pcnt_erode_embank).get(closest_match_idx_val)},
    'style_pcnt', {'color': ee.List(palette_pcnt_erode_embank).get(closest_match_idx_pcnt)}
  );
});
// print(polders_new.aggregate_max('eroded_total_area_ha'));
// print(polders_new.aggregate_max('eroded_total_area_pcnt'));
// transition (erosion/sedimentation)
var transition = ee.Image(calc_funcs.calcTransition(JRC_monthly_2, default_start_year, default_end_year));
// calculate polder erosion statistics
// var transition_yearly = transition_yearly_1988_2021;
var transition_yearly = calc_funcs.calcTransitionYearly(JRC_monthly_2, default_start_year, default_end_year);
// print('transition yearly (start years):', transition_yearly.aggregate_array('start_year'));
// print('transition yearly:', transition_yearly);
// get stats over time for each (new) polder
var polders_stats = calc_funcs.getPolderStats(polders, JRC_yearly_2, JRC_monthly_2, transition_yearly, default_start_year, default_end_year);
var polders_new_stats = calc_funcs.getPolderStats(polders_new, JRC_yearly_2, JRC_monthly_2, transition_yearly, default_start_year_current_polders, default_end_year);
// print(polders_line_new.first());
var polders_new_embankments_buffered = polders_line_new.map(function(f) {
  // return f.buffer(100);
  // var tmp_polder = polders_new.filter(ee.Filter.eq('SNAME', f.get('SNAME')));
  var tmp_polder = polders_new.filter(ee.Filter.eq('name', f.get('SNAME')));
  return f.buffer(buffer_embankments).difference(tmp_polder.first().geometry());
});
var polders_new_embankments_buffered_stats = calc_funcs.getPolderStats(polders_new_embankments_buffered, JRC_yearly_2, JRC_monthly_2, transition_yearly, default_start_year_current_polders, default_end_year);
// split embankment lines (to analyze each resulting line segment)
// var split_embankments_org = polders_line.map(geom_funcs.splitLine);
// var split_embankments_new = polders_line_new.map(geom_funcs.splitLine);
// Map.addLayer(split_embankments_org);
// Map.addLayer(split_embankments_new);
// throw(1)
// ---------------------------------------------------------------------------------------------------- //
// UI
// ---------------------------------------------------------------------------------------------------- //
// intro text
var intro = ui_funcs.createIntro();
// period
var year_slider_labels = ui.Panel(
  [ui.Label('Start', {margin:'0px 90px 0px 7px'}), ui.Label('End', {margin:'0px'})],
  ui.Panel.Layout.flow('horizontal')
);
var year_slider_1 = ui.Slider(1988, 2021, default_start_year, 1);
var year_slider_2 = ui.Slider(1988, 2021, default_end_year, 1);
var year_slider = ui.Panel(
  [year_slider_1, year_slider_2],
  ui.Panel.Layout.flow('horizontal')
);
var years_warning_box = ui.Label('Start year should be less than end year!', {padding:'0px', margin:'0px 7px', color:'red', shown:false});
var period_panel = ui.Panel([
  ui.Label({value: 'Select period:', style: {fontWeight: 'bold'}}),
  year_slider_labels,
  year_slider,
  years_warning_box
]);
// update button
var updateButton = ui.Button('Update', updateApp);
// map layer inspection
var analysis_label = ui.Label({value: 'Data analysis:', style: {fontWeight: 'bold'}});
var analysis_selector = ui.Select({
  // items: ['Polders', 'River segments', 'Embankments'],
  // items: ['Polders (original)', 'Polders (current)', 'Point'],
  // items: ['Polders', 'Point', 'Embankment'],
  // items: ['Polders', 'Embankment', 'Point', 'None'],
  items: ['Polders', 'Embankment', 'Admin. bounds', 'Point', 'None'],
  // placeholder: 'Select a value...',
  // value: 'Polders (original)',
  // value: 'Polders',
  onChange: updateSelector
});
var analyser_mssg = ui.Label({value:'', style:{fontSize:fontSize_sub, padding:'0px'}});
var analyser_name = ui.Label('');
var analyser_name_2 = ui.Label('');  // TO-DO: added as quick-fix because 'analyser_name' can only be added once and is now used twice, implement proper fix
var analyser_name_3 = ui.Label('');  // TO-DO: added as quick-fix because 'analyser_name' can only be added once and is now used twice, implement proper fix
var analyser_lost_total = ui.Label('');
var analyser_eroded = ui.Label('');
var analyser_eroded_2 = ui.Label('');  // TO-DO: added as quick-fix because 'analyser_name' can only be added once and is now used twice, implement proper fix
var analyser_sedimented = ui.Label('');
// var analyser_eroded_embank = ui.Label('');
var analyser_embank_len = ui.Label('');
var analyser_wl = ui.Label('');
var analyser_eroded_built = ui.Label('');
var analyser_eroded_crops = ui.Label('');
var analyser_eroded_built_dmg = ui.Label('');
var analyser_eroded_crops_dmg = ui.Label('');
var analysis_panel_1 = ui.Panel([
  ui.Panel([
    ui.Label('Name:'),
    ui.Label('Reduction of area:'),
    ui.Label('Land -> Water:'),
    ui.Label('Water -> Land:'),
    // ui.Label('Eroded embankments [km]:')
  ]),
  ui.Panel([
    analyser_name,
    analyser_lost_total,
    analyser_eroded,
    analyser_sedimented,
    // analyser_eroded_embank
  ])
], ui.Panel.Layout.flow('horizontal'));
var analysis_panel_2 = ui.Panel([
  ui.Panel([
    ui.Label('Polder name:'),
    ui.Label('Embankment stretch:'),
    ui.Label('Water level (RP 100):')
  ]),
  ui.Panel([
    analyser_name_2,
    analyser_embank_len,
    analyser_wl
  ])
], ui.Panel.Layout.flow('horizontal'));
var analysis_panel_3 = ui.Panel([
  ui.Panel([
    ui.Label('Admin. name:'),
    ui.Label('Area eroded:'),
    ui.Label('Of which build:'),
    ui.Label('Of which crops:'),
    ui.Label('Value of build:'),
    ui.Label('Value of crops:')
  ]),
  ui.Panel([
    analyser_name_3,
    analyser_eroded_2,
    analyser_eroded_built,
    analyser_eroded_crops,
    analyser_eroded_built_dmg,
    analyser_eroded_crops_dmg
  ])
], ui.Panel.Layout.flow('horizontal'));
// admin level selector
var admin_selector = ui.Select({
  items: ['Divisions','Districts','Upazillas','Unions'],
  // placeholder: 'Select a value...',
  value: default_admin,
  onChange: updateAdminSelector,
  style: {shown:false}
});
var analysis_panel = ui.Panel([analysis_label, analysis_selector, admin_selector, analyser_mssg, analysis_panel_1, analysis_panel_2, analysis_panel_3]);
// charts
var charts = ui.Panel({widgets:[], style:{shown:true}});
var charts_loading_mssg = ui.Label({value:'Calculating...', style:{fontSize:fontSize_sub, padding:'0px', shown:false}});
var charts_panel = ui.Panel([
  ui.Button('Show/hide charts', toggleCharts, false, {fontWeight: 'bold'}),
  // ui.Panel([
  //   ui.Button('Show/hide charts', toggleCharts, false, {fontWeight: 'bold'}),
  //   ui.Button('Move charts', moveCharts, false, {fontWeight: 'bold'})
  // ], ui.Panel.Layout.flow('horizontal')),
  // ui.Label('Charts:', {fontWeight:'bold'}),
  charts_loading_mssg,
  charts
]);
// var charts_panel_ui = ui.Panel();
// var charts_panel_map = ui.Panel();
charts_panel.style().set({
// charts_panel_map.style().set({
  width: '400px',
  position: 'bottom-right'
});
// charts_panel_map = charts_panel_map.add(charts_panel)
// var charts_loc = 'map';
// map drawing tools
var drawingTools = Map.drawingTools();
var drawing_inspector = ui.Panel([ui.Label('Draw shape to measure length/area')]);
drawing_inspector.style().set('shown',false);
var draw_warning_box = ui.Label('Something went wrong with drawing a geometry. Please clear all drawn geometries and try again.', {padding:'0px', margin:'0px 7px', color:'red', shown:false});
function clearGeometry() {
  draw_warning_box.style().set('shown',false);
  // var layers = drawingTools.layers();
  // if(layers.length() > 0){
  //   layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
  // }
  drawingTools.layers().reset();
  drawing_inspector.widgets().set(0, ui.Label({
    value: 'Draw shape to measure length/area',
  }));
  drawingTools.stop();
  drawing_inspector.style().set('shown',false);
  clearGeomButton.style().set('shown',false);
}
var clearGeomButton = ui.Button({
  label: "Clear drawn geometry",
  onClick: clearGeometry,
  style: {shown:false}
});
drawingTools.onDraw(function (geometry) {
  draw_warning_box.style().set('shown',false);
  drawing_inspector.style().set('shown',true);
  clearGeomButton.style().set('shown',true);
  var len = geometry.length().float();
  var arr = geometry.area({'maxError': 1});
  drawing_inspector.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  len.evaluate(function(val, err) {
    if (!err) {
      if (val === 0) {
       arr.divide(1000000).format('%.2f').evaluate(function(val, err) {
          drawing_inspector.widgets().set(0, ui.Label('Area: '+ val + ' km2'));
       });
      } else {
        ee.Number(val).divide(1000).format('%.2f').evaluate(function(val, err) {
          drawing_inspector.widgets().set(0, ui.Label('Distance: '+ val + ' km'));
        });
      }
    } else {
      // print(err);
      draw_warning_box.style().set('shown',true);
    }
  });
});
var text_drawing_1 = 'Click the button below to activate (or deactivate) the drawing tools on the map.';
var text_drawing_2 = text_drawing_1 + ' It can be used to either measure the length of a line or the area of a polygon. Finish the line by double clicking or pressing Esc, finish a polygon by clicking on its starting point.';
var text_drawingPanel = ui.Label({
  value: text_drawing_1,
  style: {fontSize:fontSize_sub, padding:'0px'}
});
function toggleDrawing() {
  // Map.setControlVisibility({drawingToolsControl: !drawingTools.get('shown')});
  if (drawingTools.get('shown') === true) {
    clearGeometry();
    text_drawingPanel.setValue(text_drawing_1);
    Map.setControlVisibility({drawingToolsControl: false});
  } else {
    text_drawingPanel.setValue(text_drawing_2);
    Map.setControlVisibility({drawingToolsControl: true});
  }
}
var drawingButton = ui.Button({
  label: '(De)activate drawing',
  onClick: toggleDrawing
});
var panel_drawing = ui.Panel([
  ui.Label({value: 'Extra tools:', style: {fontWeight: 'bold'}}),
  text_drawingPanel,
  ui.Label({value: 'Please note that you cannot draw on the map and select features at the same time. Please deactivate drawing before querying feature(s).', style: {fontSize:fontSize_sub, padding:'0px'}}),
  drawingButton,
  drawing_inspector,
  draw_warning_box,
  clearGeomButton
]);
// legend(s)
var legend_transition = ui_funcs.createLegendTransition();
var legend_dynamics = ui_funcs.createLegendDynamics();
var legend_erosionrisk = ui_funcs.createLegendErosionRisk();
var legend_waterdepths = ui_funcs.createLegendWaterDepth();
var legend_population = ui_funcs.createLegendPopulation();
var legend_WorldCover = ui_funcs.createLegendWorldCover(lc_colors, lc_names);
var legends = ui.Panel({
  widgets: [legend_transition, legend_dynamics, legend_erosionrisk, legend_waterdepths, legend_population, legend_WorldCover],
  style: {shown:true}
});
var legends_panel = ui.Panel([
  ui.Button('Show/hide legends', toggleLegends, false, {fontWeight: 'bold'})
]);
// references
var refs = ui_funcs.createRefs();
var refs_panel = ui.Panel([
  ui.Panel([
    ui.Button({label:'Show/hide references', onClick:toggleRefs})
  ], ui.Panel.Layout.flow('horizontal')),
  refs
]);
var disclaimer = ui_funcs.createDisclaimer();
var disclaimer_panel = ui.Panel([
  ui.Panel([
    ui.Button({label:'Show/hide disclaimer', onClick:toggleDisclaimer})
  ], ui.Panel.Layout.flow('horizontal')),
  disclaimer
]);
var outro = ui.Label({
  value: "For more information on this application, please contact kymo.slager@deltares.nl, arjen.haag@deltares.nl and/or sam@iwmbd.org",
  style: {fontSize:fontSize_sub, padding:'0px', margin:'3px 0px 8px 8px'}
});
// panel combining relevant UI elements for the ui.root
var panel = ui.Panel({
  widgets: [intro, period_panel, updateButton, analysis_panel, panel_drawing, legends_panel, legends, refs_panel, disclaimer_panel, outro],
  // widgets: [intro, period_panel, updateButton, analysis_panel, charts_panel_ui, legends_panel, legends, refs_panel, disclaimer_panel, outro],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    width: '290px'
  }
});
// add the panel to the ui.root
ui.root.insert(0, panel);
// ---------------------------------------------------------------------------------------------------- //
// Map
// ---------------------------------------------------------------------------------------------------- //
Map.setControlVisibility({drawingToolsControl: false});
// Map.centerObject(country);
// Map.centerObject(polders);
Map.centerObject(polders_new);
Map.setZoom(9);
// add default layers
// Map.addLayer(background_bbox, {}, 'background bbox', false);
Map.addLayer(background_other, {palette:['grey']}, 'background (other)', true, 0.5);
Map.addLayer(background, {palette:['white']}, 'background (focus)', true, 0.5);
Map.addLayer(MERIT.clip(country), visParams_DEM, 'MERIT DEM', false);
Map.addLayer(NASADEM.clip(country), visParams_DEM, 'NASADEM', false);
Map.addLayer(coastalDEM, visParams_DEM, 'Coastal DEM', false);
Map.addLayer(WorldCover, visParams_lc, 'landcover (ESA WorldCover)', false);
Map.addLayer(WorldPop.updateMask(WorldPop.gte(pop_thresh)), visParams_pop, 'population (WorldPop)', false);
// Map.addLayer(HRSL.updateMask(HRSL.gte(pop_thresh)), visParams_pop, 'population (HRSL)', false);
Map.addLayer(JRC_water, {bands:'occurrence', min:0, max:100, palette:['white','blue']}, 'JRC water occurrence', false);
// Map.addLayer(JRC_yearly, visParams_monthly, 'JRC water (yearly)', false);
// Map.addLayer(JRC_monthly, visParams_monthly, 'JRC water (monthly)', false);
// Map.addLayer(JRC_water.select('transition'), {}, 'JRC water transition', false);
// initial update using default settings
analysis_selector.setValue(default_selection);
updateSelector();
updateApp();
analyser_mssg.setValue(selector_message[analysis_selector.getValue()]);
charts.add(ui.Label({value:'Click on the map to query a timeseries analysis for that polder or point', style:{fontSize:fontSize_sub, padding:'0px'}}));
Map.add(charts_panel);
// Map.add(charts_panel_map);
// add disclaimer pop-up box
Map.add(ui_funcs.createDisclaimerBox());
// add other map layers
Map.addLayer(polders_raster, visParams_mask_white, 'polders internal mask', false);
Map.addLayer(ferry_terminals, {}, 'ferry terminals', false);
Map.addLayer(biwta_ghats, {}, 'biwta ghats', false);
Map.addLayer(WL_100yRP, {}, 'model water level points', false, 0.5);
Map.addLayer(embankments_2013, {palette:'grey'}, 'embankments (2013)', false);
Map.addLayer(ee.Image().byte().paint(polders, 0, 2), {palette:'grey'}, 'polders (original)', true);
Map.addLayer(ee.Image().byte().paint(polders_new, 0, 2), {}, 'polders (current)', true);
// Map.addLayer(ee.Image().byte().paint(polders_new_total_erosion, 0, 2), {}, 'polders (eroded area)', true);
// Map.addLayer(polders_new.style({styleProperty:'style_val'}), {}, 'polders (current) [area lost]', false);
// Map.addLayer(polders_new.style({styleProperty:'style_pcnt'}), {}, 'polders (current) [% area lost]', false);
// Map.addLayer(rivers_test, {'color': 'orange'}, 'river segments', false, 0.5);
// Map.addLayer(eroded_embankments, {color:'red'}, 'eroded embankments', false);
Map.addLayer(ee.Image().byte().paint(eroded_embankments, 0, 3), {palette:'red'}, 'completely eroded embankments', true);
Map.addLayer(split_embankments.style({styleProperty:'style'}), {}, 'embankment erosion risk', false);
Map.addLayer(Jamuna_riverbank_2019_erosion_risk.style({styleProperty:'style'}), {}, 'Jamuna riverbank erosion risk', false);
Map.addLayer(polders_new_embankments_buffered, {}, 'polder embankments buffer', false);
Map.addLayer(ee.Image().byte().paint(admin_4, 0, 1), {}, 'Unions', false);
Map.addLayer(ee.Image().byte().paint(admin_3, 0, 1), {}, 'Upazillas', false);
Map.addLayer(ee.Image().byte().paint(admin_2, 0, 2), {}, 'Districts', false);
Map.addLayer(ee.Image().byte().paint(admin_1, 0, 2), {}, 'Divisions', false);
Map.addLayer(ee.Image().byte().paint(country, 0, 3), {}, 'Bangladesh', false);
// Map.addLayer(other_countries, {}, 'Bangladesh focus', true, 0.7);