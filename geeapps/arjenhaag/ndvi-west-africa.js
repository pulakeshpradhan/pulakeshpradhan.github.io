var LSIB = ui.import && ui.import("LSIB", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    GAUL_lvl0 = ui.import && ui.import("GAUL_lvl0", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level0"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level0"),
    GAUL_lvl1 = ui.import && ui.import("GAUL_lvl1", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level1"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level1"),
    GAUL_lvl2 = ui.import && ui.import("GAUL_lvl2", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2"),
    GADM_0_Afr = ui.import && ui.import("GADM_0_Afr", "table", {
      "id": "users/arjenhaag/WPS/gadm36_0_complete_afr"
    }) || ee.FeatureCollection("users/arjenhaag/WPS/gadm36_0_complete_afr"),
    GADM_1_Afr = ui.import && ui.import("GADM_1_Afr", "table", {
      "id": "users/arjenhaag/WPS/gadm36_1_complete_afr"
    }) || ee.FeatureCollection("users/arjenhaag/WPS/gadm36_1_complete_afr"),
    MODIS_Terra_NDVI_250m = ui.import && ui.import("MODIS_Terra_NDVI_250m", "imageCollection", {
      "id": "MODIS/061/MOD13Q1"
    }) || ee.ImageCollection("MODIS/061/MOD13Q1"),
    MODIS_Aqua_NDVI_250m = ui.import && ui.import("MODIS_Aqua_NDVI_250m", "imageCollection", {
      "id": "MODIS/061/MYD13Q1"
    }) || ee.ImageCollection("MODIS/061/MYD13Q1"),
    MODIS_Terra_NDVI_500m = ui.import && ui.import("MODIS_Terra_NDVI_500m", "imageCollection", {
      "id": "MODIS/061/MOD13A1"
    }) || ee.ImageCollection("MODIS/061/MOD13A1"),
    MODIS_Aqua_NDVI_500m = ui.import && ui.import("MODIS_Aqua_NDVI_500m", "imageCollection", {
      "id": "MODIS/061/MYD13A1"
    }) || ee.ImageCollection("MODIS/061/MYD13A1"),
    VIIRS_NDVI_500m = ui.import && ui.import("VIIRS_NDVI_500m", "imageCollection", {
      "id": "NOAA/VIIRS/001/VNP13A1"
    }) || ee.ImageCollection("NOAA/VIIRS/001/VNP13A1"),
    NOAA_CDR_NDVI = ui.import && ui.import("NOAA_CDR_NDVI", "imageCollection", {
      "id": "NOAA/CDR/AVHRR/NDVI/V5"
    }) || ee.ImageCollection("NOAA/CDR/AVHRR/NDVI/V5"),
    GIMMS_NDVI = ui.import && ui.import("GIMMS_NDVI", "imageCollection", {
      "id": "NASA/GIMMS/3GV0"
    }) || ee.ImageCollection("NASA/GIMMS/3GV0"),
    test_point = ui.import && ui.import("test_point", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -0.47496105242566866,
            14.488139595663986
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
    ee.Geometry.Point([-0.47496105242566866, 14.488139595663986]);
// Vegetation Indices Western Africa
// NOTES:
/*
- aggregate to which region(s)? currently using point and GADM (level 1). others?
- aggregate by which means? currently using the default mean/average, but should (also) do others?
- mask out water bodies (strong negative signal influence aggregated results)?!
- countries correct? allow users to specify?
- other NDVI / vegetation index datasets?
- completely different (drought) indicators? precipitation? link with NGDI? GWW?
*/
// ---------------------------------------------------------------------------------------------------- //
// Parameters
// ---------------------------------------------------------------------------------------------------- //
// countries
var country_na = [
  'Burkina Faso',
  'Ghana',
  'Togo',
  'Benin',
  'Niger',
  'Nigeria'
];
// properties
var sys_props = ['system:index', 'system:footprint', 'system:time_start'];
// visuals
// var NDVI_min = -1;
// var NDVI_min = -0.5;
// var NDVI_max = 1;
var NDVI_min = -5000;
var NDVI_max = 10000;
var visParams_NDVI = {bands:['NDVI'], min:NDVI_min, max:NDVI_max, palette:['red','white','green']};
// UI
var app_title = 'NDVI demo';
var app_text1 = 'This application shows vegetation indices derived from satellite data as proxies for vegetation health,\
                 with lower values a potential indicator of vegetation stress and drought.';
var app_text2 = 'Click on the map to query time series for that specific location. Click on a point in a chart to visualize\
                 the data for that time step on the map.';
var fontSize_title = '20px';
var fontSize_sub = '12px';
// ---------------------------------------------------------------------------------------------------- //
// Pre-processing
// ---------------------------------------------------------------------------------------------------- //
var Africa = LSIB.filter(ee.Filter.eq('wld_rgn', 'Africa'));
var countries = GADM_0_Afr.filter(ee.Filter.inList('NAME_0', country_na));
// print(countries.size());
// var MODIS_250m = MODIS_Terra_NDVI_250m.select(['NDVI','EVI']).merge(MODIS_Aqua_NDVI_250m.select(['NDVI','EVI']));
// var start_date = MODIS_250m.sort('system:time_start').first().date();
// var end_date   = MODIS_250m.sort('system:time_start', false).first().date();
var start_date = MODIS_Terra_NDVI_250m.sort('system:time_start').first().date();
var end_date   = MODIS_Terra_NDVI_250m.sort('system:time_start', false).first().date();
NOAA_CDR_NDVI = NOAA_CDR_NDVI.filterDate(start_date, end_date.advance(1, 'day'));
// ---------------------------------------------------------------------------------------------------- //
// Functions
// ---------------------------------------------------------------------------------------------------- //
// module(s)
var ui_funcs = require('users/arjenhaag/modules:ui');
// rescale indices
var rescaleImg = function(img, factor) {
  return img.divide(factor).copyProperties(img).copyProperties(img, sys_props);
};
var rescaleIc = function(ic, bands, factor) {
  return ic.map(function(img) {
    // return img.divide(factor).copyProperties(img).copyProperties(img, sys_props);
    return img.addBands(img.select(bands).divide(factor), bands, true);//.copyProperties(img).copyProperties(img, sys_props);
  });
};
function createChartArray_1(data, prop, title) {
  var xLabels = data.filter(ee.Filter.notNull([prop])).sort('system:time_start').aggregate_array('system:time_start');
  var NDVI_point = data.sort('system:time_start').aggregate_array(prop);
  var tmp_chart = ui.Chart.array.values(NDVI_point, 0, xLabels)
  .setSeriesNames(['NDVI'])
  .setOptions({
    title: title,
    series:{
      0:{lineWidth:2, pointSize:2}
    }
  });
  tmp_chart.onClick(function(x, y, name) {
    var clicked_time = ee.Date(x);
    var img_time = NOAA_CDR_NDVI.filterDate(clicked_time);
    // print(img_time);
    ui_funcs.clearLayer('NOAA CDR NDVI (chart)');
    Map.layers().insert(2, ui.Map.Layer(img_time, visParams_NDVI, 'NOAA CDR NDVI (chart)', true));
  });
  // print(tmp_chart);
  charts.add(tmp_chart);
  // return tmp_chart;
}
function createChartArray_2(data, props, title) {
  var xLabels = data.filter(ee.Filter.notNull(props)).sort('system:time_start').aggregate_array('system:time_start');
  var NDVI_point = data.sort('system:time_start').aggregate_array(props[0]);
  var EVI_point = data.sort('system:time_start').aggregate_array(props[1]);
  var tmp_chart = ui.Chart.array.values(ee.Array.cat([NDVI_point, EVI_point], 1), 0, xLabels)
  .setSeriesNames(['NDVI', 'EVI'])
  .setOptions({
    title: title,
    series:{
      0:{lineWidth:2, pointSize:2},
      1:{lineWidth:2, pointSize:2}
    }
  });
  tmp_chart.onClick(function(x, y, name) {
    var clicked_time = ee.Date(x);
    var img_time = MODIS_Terra_NDVI_250m.filterDate(clicked_time);
    // var img_time = MODIS_250m.filterDate(clicked_time);
    // print(img_time);
    ui_funcs.clearLayer('MODIS NDVI (chart)');
    Map.layers().insert(2, ui.Map.Layer(img_time, visParams_NDVI, 'MODIS NDVI (chart)', true));
  });
  // print(tmp_chart);
  charts.add(tmp_chart);
  // return tmp_chart;
}
function createChartArray_mean_stdDev(data, prop_name, title) {
  var xLabels = data.filter(ee.Filter.notNull([prop_name + '_adm1_mean'])).sort('system:time_start').aggregate_array('system:time_start');
  var tmp_mean = ee.Array(data.sort('system:time_start').aggregate_array(prop_name + '_adm1_mean'));
  var tmp_stdDev = ee.Array(data.sort('system:time_start').aggregate_array(prop_name + '_adm1_stdDev'));
  var tmp_mean_min_stdDev = tmp_mean.subtract(tmp_stdDev);
  var tmp_mean_add_stdDev = tmp_mean.add(tmp_stdDev);
  var tmp_chart = ui.Chart.array.values(ee.Array.cat([tmp_mean, tmp_mean_min_stdDev, tmp_mean_add_stdDev], 1), 0, xLabels)
  .setSeriesNames([prop_name + ' mean', prop_name + ' -1 stdDev', prop_name + ' +1 stdDev'])
  .setOptions({
    title: title,
    series:{
      0:{lineWidth:2, pointSize:0, color:'blue'},
      1:{lineWidth:2, pointSize:0, color:'grey', lineDashStyle:[2,2]},
      2:{lineWidth:2, pointSize:0, color:'grey', lineDashStyle:[2,2]}
    }
  });
  // tmp_chart.onClick(function(x, y, name) {
  //   var clicked_time = ee.Date(x);
  //   var img_time = MODIS_Terra_NDVI_250m.filterDate(clicked_time);
  //   // var img_time = MODIS_250m.filterDate(clicked_time);
  //   // print(img_time);
  //   Map.layers().insert(2, ui.Map.Layer(img_time, visParams_NDVI, 'MODIS NDVI (chart)', true));
  // });
  // print(tmp_chart);
  charts.add(tmp_chart);
  // return tmp_chart;
}
// 
function updateMap(clicked_point) {
  // clear previously clicked layer(s)
  // ui_funcs.clearLayer('clicked point');
  // ui_funcs.clearLayer('selected region');
  ui_funcs.clearLayers(['clicked point', 'clicked admin 1', 'clicked country']);
  // clear UI
  charts.clear();
  Map.addLayer(clicked_point, {}, 'clicked point');
  // get clicked region(s)
  // var clicked_adm0 = GADM_0_Afr.filterBounds(clicked_point);
  // var clicked_adm1 = GADM_1_Afr.filterBounds(clicked_point);
  var clicked_adm0 = GAUL_lvl0.filterBounds(clicked_point);
  var clicked_adm1 = GAUL_lvl1.filterBounds(clicked_point);
  Map.addLayer(clicked_adm1, {}, 'clicked admin 1', true, 0.5);
  Map.addLayer(clicked_adm0, {}, 'clicked country', true, 0.5);
  // get data at clicked point/region(s)
  // var chart_point_1 = ui.Chart.image.series(MODIS_Terra_NDVI_250m.select(['NDVI','EVI']), clicked_point, ee.Reducer.mean(), 250, 'system:time_start');
  // var chart_point_2 = ui.Chart.image.series(MODIS_Aqua_NDVI_250m.select(['NDVI','EVI']), clicked_point, ee.Reducer.mean(), 250, 'system:time_start');
  // print(chart_point_1);
  // print(chart_point_2);
  // var chart_point = ui.Chart.image.series(MODIS_250m.select(['NDVI','EVI']), clicked_point, ee.Reducer.mean(), 250, 'system:time_start');
  // print(chart_point);
  // var chart_adm1 = ui.Chart.image.series(MODIS_250m.select(['NDVI','EVI']), clicked_adm1, ee.Reducer.mean(), 250, 'system:time_start');
  // print(chart_adm1);
  // var chart_adm0 = ui.Chart.image.series(MODIS_250m.select(['NDVI','EVI']), clicked_adm0, ee.Reducer.mean(), 250, 'system:time_start');
  // print(chart_adm0);  // times out, too many pixels, switch to reduceRegion(s) below
  // var chart_features = ee.FeatureCollection([
  //   clicked_point.set('name', 'point'),
  //   clicked_adm1.set('name', 'admin 1'),
  //   clicked_adm0.set('name', 'country'),
  // ]);
  // var clicked_data = MODIS_250m.map(function(img) {
  //   var tmp_data = img.reduceRegions({
  //     collection: chart_features,
  //     reducer: ee.Reducer.mean(),
  //     scale: 250,
  //     // crs: ,
  //     // crsTransform: ,
  //     // tileScale: 
  //   });
  //   return img.set('data', tmp_data);
  // });
  var clicked_data = MODIS_Terra_NDVI_250m.map(function(img) {
  // var clicked_data = MODIS_250m.map(function(img) {
    var tmp_data_point = img.reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: clicked_point,
      scale: 250,
      // crs: ,
      // crsTransform: ,
      // bestEffort: ,
      // maxPixels: ,
      // tileScale: 
    });
    var tmp_data_adm1 = img.reduceRegion({
      reducer: ee.Reducer.mean().combine(ee.Reducer.stdDev(), "", true),
      geometry: clicked_adm1.geometry(),
      scale: 250,
      // crs: ,
      // crsTransform: ,
      // bestEffort: ,
      maxPixels: 1e10,
      // tileScale: 
    });
    // var tmp_data_adm0 = img.reduceRegion({
    //   reducer: ee.Reducer.mean(),
    //   geometry: clicked_adm0.geometry(),
    //   scale: 250,
    //   // crs: ,
    //   // crsTransform: ,
    //   // bestEffort: ,
    //   maxPixels: 1e12,
    //   // tileScale: 
    // });
    return img.set(
      // 'test', tmp_data_adm1
      'NDVI_point', tmp_data_point.get('NDVI'),
      'EVI_point', tmp_data_point.get('EVI'),
      // 'NDVI_adm1', tmp_data_adm1.get('NDVI'),
      // 'EVI_adm1', tmp_data_adm1.get('EVI')
      'NDVI_adm1_mean', tmp_data_adm1.get('NDVI_mean'),
      'EVI_adm1_mean', tmp_data_adm1.get('EVI_mean'),
      'NDVI_adm1_stdDev', tmp_data_adm1.get('NDVI_stdDev'),
      'EVI_adm1_stdDev', tmp_data_adm1.get('EVI_stdDev')
      // 'NDVI_adm0', tmp_data_adm0.get('NDVI'),
      // 'EVI_adm0', tmp_data_adm0.get('EVI')
    );
  });
  // print(clicked_data.first());
  createChartArray_2(clicked_data, ['NDVI_point', 'EVI_point'], 'MODIS point');
  // createChartArray_2(clicked_data, ['NDVI_adm1', 'EVI_adm1'], 'MODIS admin 1');
  createChartArray_2(clicked_data, ['NDVI_adm1_mean', 'EVI_adm1_mean'], 'MODIS admin 1 (mean)');
  createChartArray_mean_stdDev(clicked_data, 'NDVI', 'MODIS admin 1 (NDVI mean and stdDev)');
  createChartArray_mean_stdDev(clicked_data, 'EVI', 'MODIS admin 1 (EVI mean and stdDev)');
  var clicked_data_2 = NOAA_CDR_NDVI.select('NDVI').map(function(img) {
    var tmp_data_point = img.reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: clicked_point,
      scale: 5566,
      // crs: ,
      // crsTransform: ,
      // bestEffort: ,
      // maxPixels: ,
      // tileScale: 
    });
    var tmp_data_adm1 = img.reduceRegion({
      reducer: ee.Reducer.mean().combine(ee.Reducer.stdDev(), "", true),
      geometry: clicked_adm1.geometry(),
      scale: 5566,
      // crs: ,
      // crsTransform: ,
      // bestEffort: ,
      maxPixels: 1e10,
      // tileScale: 
    });
    return img.set(
      // 'test', tmp_data_adm1
      'NDVI_point', tmp_data_point.get('NDVI'),
      // 'NDVI_adm1', tmp_data_adm1.get('NDVI'),
      'NDVI_adm1_mean', tmp_data_adm1.get('NDVI_mean'),
      'NDVI_adm1_stdDev', tmp_data_adm1.get('NDVI_stdDev')
    );
  });
  createChartArray_1(clicked_data_2, 'NDVI_point', 'NOAA CDR point');
  createChartArray_1(clicked_data_2, 'NDVI_adm1_mean', 'NOAA CDR admin 1 (mean)');
  // createChartArray_mean_stdDev(clicked_data_2, 'NDVI', 'NOAA CDR admin 1 (NDVI mean and stdDev)');
}
// click on map
Map.onClick(function(coords) {
  // get clicked point
  var clicked_point = ee.Geometry.Point(coords.lon, coords.lat);
  // update map and charts
  updateMap(clicked_point);
});
// ---------------------------------------------------------------------------------------------------- //
// Processing
// ---------------------------------------------------------------------------------------------------- //
// MODIS_Terra_NDVI_250m = rescaleIc(MODIS_Terra_NDVI_250m, ['NDVI','EVI'], 10000);
// MODIS_Aqua_NDVI_250m = rescaleIc(MODIS_Aqua_NDVI_250m, ['NDVI','EVI'], 10000);
// MODIS_250m = rescaleIc(MODIS_250m, ['NDVI','EVI'], 10000);
// NOAA_CDR_NDVI = rescaleIc(NOAA_CDR_NDVI, ['NDVI'], 10000);
// ---------------------------------------------------------------------------------------------------- //
// UI
// ---------------------------------------------------------------------------------------------------- //
// intro text
var intro = ui_funcs.createIntro(app_title, app_text1, app_text2, fontSize_title, fontSize_sub);
// legend(s)
var legend = ui_funcs.createLegend(visParams_NDVI, 'Vegetation Index');
// chart(s)
var charts = ui.Panel([ui.Label({value: 'click on an area to query analysis', style:{color: 'white', backgroundColor:'grey'}})]);
var charts_panel = ui.Panel([
  ui.Label({value:'Charts:', style:{fontWeight:'bold'}}),
  charts
]);
// outro text
var outro = ui_funcs.createOutro();
// panel combining relevant UI elements for the ui.root
var panel = ui.Panel({
  widgets: [intro, legend, charts_panel, outro],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    width: '300px'
  }
});
// add the panel to the ui.root
ui.root.insert(0, panel);
// update cursor
Map.style().set('cursor','crosshair');
// ---------------------------------------------------------------------------------------------------- //
// Map
// ---------------------------------------------------------------------------------------------------- //
// Map.centerObject(Africa);
Map.centerObject(countries);
// Map.addLayer(NOAA_CDR_NDVI, visParams_NDVI, 'NOAA CDR NDVI (5km)', false);
// Map.addLayer(MODIS_Terra_NDVI_250m, visParams_NDVI, 'MODIS Terra NDVI (250m)', false);
// Map.addLayer(MODIS_Aqua_NDVI_250m, visParams_NDVI, 'MODIS Aqua NDVI (250m)', false);
// Map.addLayer(MODIS_250m, visParams_NDVI, 'MODIS NDVI (250m)', false);
Map.addLayer(NOAA_CDR_NDVI.median(), visParams_NDVI, 'NOAA CDR NDVI median (5km)', false);
Map.addLayer(MODIS_Terra_NDVI_250m.median(), visParams_NDVI, 'MODIS Terra NDVI median (250m)', true);
// Map.addLayer(MODIS_Aqua_NDVI_250m.median(), visParams_NDVI, 'MODIS Aqua NDVI median (250m)', false);
// Map.addLayer(countries, {}, 'countries (GADM)', true, 0.5);
Map.addLayer(ee.Image().byte().paint(countries,0,2), {}, 'countries (GADM)', true);
Map.addLayer(GADM_0_Afr, {}, 'GADM level 0', false, 0.5);
Map.addLayer(GADM_1_Afr, {}, 'GADM level 1', false, 0.5);
updateMap(test_point);