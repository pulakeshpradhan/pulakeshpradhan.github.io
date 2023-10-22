var DynamicWorld = ee.ImageCollection("GOOGLE/DYNAMICWORLD/V1"),
    JRC_water = ee.Image("JRC/GSW1_4/GlobalSurfaceWater"),
    JRC_monthly = ee.ImageCollection("JRC/GSW1_4/MonthlyHistory"),
    JRC_yearly = ee.ImageCollection("JRC/GSW1_4/YearlyHistory"),
    S2 = ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED"),
    S2_cloudProb = ee.ImageCollection("COPERNICUS/S2_CLOUD_PROBABILITY"),
    GWW_waterbodies = ee.FeatureCollection("projects/global-water-watch/assets/reservoirs-v1-0"),
    GWW_waterbodiesPoints = ee.FeatureCollection("projects/global-water-watch/assets/reservoirs-locations-v1-0"),
    basins = ee.FeatureCollection("projects/ee-angola-dams/assets/af_bas_30s_beta_angola_clipped"),
    artificial_water_bodies = ee.FeatureCollection("projects/ee-angola-dams/assets/artificial_water_bodies"),
    calueque_dam = ee.FeatureCollection("projects/ee-angola-dams/assets/calueque_dam"),
    chicungo_dam = ee.FeatureCollection("projects/ee-angola-dams/assets/chicungo_dam"),
    matala_2_dam = ee.FeatureCollection("projects/ee-angola-dams/assets/matala_2_dam"),
    matala_dam = ee.FeatureCollection("projects/ee-angola-dams/assets/matala_dam"),
    neves_dam = ee.FeatureCollection("projects/ee-angola-dams/assets/neves_dam"),
    ruacana_dam = ee.FeatureCollection("projects/ee-angola-dams/assets/ruacana_dam"),
    tundavala_dam = ee.FeatureCollection("projects/ee-angola-dams/assets/tundavala_dam"),
    countries = ee.FeatureCollection("FAO/GAUL/2015/level0");
// Angola dams dashboard
// ---------------------------------------------------------------------------------------------------- //
// Parameters
// ---------------------------------------------------------------------------------------------------- //
// defaults
var country_na = 'Angola';
var default_basin = 'Kwanza';
var default_dam = 'Ruacana';
var default_prop = 'velocity';
var default_year = '2022';
var default_legend_scaling = 'local min/max (quartiles)';
// var default_legend_colors = 'blue-green-yellow-red';
var default_legend_colors = 'red-yellow-green-blue';
var prop_units = {
  'velocity': '[mm/yr]',
  'velocity_a': '[mm/yr]',
};
// (temporarily) remove erroneous water bodies
var temp_remove_res_ids = ['1886','1887','1905','2204','2863','2900','3281','4124','4125','4126','4560','5207','5870','5871','6548','8724','8725','9566','9567','10769','10770','10771','10772','12964'];
artificial_water_bodies = artificial_water_bodies.filter(ee.Filter.inList('id', temp_remove_res_ids).not());
// GWW parameters
// var GWW_DATA_VERSION = '2021-Q3';
var GWW_DATA_VERSION = '2022-Q2';
// var GWW_DATA_VERSION = '2022-Q3';
var GWW_START_DATE = '2016-09-01';
var GWW_END_DATE   = '2022-01-01';
var GWW_RAW_OPACITY = 0.5;  // default 0.3
// EO data
var S2_BANDS = ['B2',  'B3',   'B4', 'B8', 'B11',  'B12'];
var S2_NAMES = ['blue','green','red','nir','swir1','swir2'];
var CLD_PRB_THRESH = 40;  // default 50, other 40
var NIR_DRK_THRESH = 0.15;  // default 0.15
var CLD_PRJ_DIST = 1;  // default 1, other 2
var BUFFER = 50;  // default 50, other 100
var CLD_SCALE = 20;  // default is 20, native 10 (but that often times out...)
// UI elements
var fontSize_sub = '12px';
// var default_chart_x_prop = 'system:index';
var default_chart_x_prop = 'id';
// var palette_dams = ['blue','green','yellow','red'];
// visual parameters
// var visParams_S2_RGB = {bands:['B4','B3','B2'], min:0, max:5000, gamma:1.5};
// var visParams_S2_SNG = {bands:['B11','B8','B3'], min:0, max:5000};//, gamma:1.5};
var visParams_S2_RGB = {bands:['red','green','blue'], min:0, max:5000, gamma:1.5};
var visParams_S2_SNG = {bands:['swir1','nir','green'], min:0, max:5000};//, gamma:1.5};
// var visParams_index = {bands:['MNDWI'], min:0, max:1, palette:['white','blue']};
var visParams_water_jrc = {min:0, max:3, palette:['#cccccc','#ffffff','#99d9ea','#0000ff']};
var visParams_diff_jrc = {min:0, max:1, palette:['ffffff','00ff00']};
var visParams_water_occ = {min:0, max:100, palette:['white','blue','purple']};
// ---------------------------------------------------------------------------------------------------- //
// Functions (GWW)
// ---------------------------------------------------------------------------------------------------- //
// function Logger() {
function Logger(loc) {
  this.label = ui.Label('', {
      shown: false,
      // backgroundColor: '#00000066',
      // color: 'ffffff',
      // fontSize: '14px',
      fontSize: fontSize_sub,
      // position: 'top-center',
      // margin: '2px', 
      // padding: '2px'
  });
  // Map.widgets().add(this.label);
  loc.add(this.label);
}
Logger.prototype.info = function(message) {
  this.label.setValue(message);
  this.show();
};
Logger.prototype.hide = function() {
  this.label.style().set({ shown: false });
};
Logger.prototype.show = function() {
  this.label.style().set({ shown: true });
};
// var log = new Logger();
// var log = new Logger(Map.widgets());
// ref: http://stackoverflow.com/a/1293163/2343
// This will parse a delimited string into an array of
// arrays. The default delimiter is the comma, but this
// can be overriden in the second argument.
function CSVToArray(strData, strDelimiter){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");
    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );
    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];
    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;
    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){
        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];
        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){
            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );
        }
        var strMatchedValue;
        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){
            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );
        } else {
            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }
    arrData = arrData.slice(0, arrData.length-1); // last element is empty
    // Return the parsed data.
    return( arrData );
}
var pad = function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};
function show(waterbodyPoint) {
// function show(waterbodyPoint, t_start, t_end) {
//   if (typeof t_start == 'undefined') t_start = GWW_START_DATE;
//   if (typeof t_end == 'undefined') t_end = GWW_END_DATE;
  if(showing) {
    return;
  }
  showing = true;
  // obtain water body
  log.info('GWW: Loading chart data ...');
  var f = selectedWaterbody;
  var fid = waterbodyPoint.get('fid');
  // print(fid);
  fid.evaluate(function(fid) {
    // ui.url.set('fid', fid);
    var filename = pad(fid, 7) + '.csv';
    var timeSeries = ee.Blob('gs://global-water-watch/reservoir-time-series-' + GWW_DATA_VERSION + '/time_series_area/' + filename);
    var timeSeriesMonthly = ee.Blob('gs://global-water-watch/reservoir-time-series-' + GWW_DATA_VERSION + '/time_series_area_monthly/' + filename);
    log.info('GWW: Querying daily data ...');
    timeSeries.string().evaluate(function (sDaily) {
      log.info('GWW: Querying monthly data ...');
      timeSeriesMonthly.string().evaluate(function (sMonthly) {
        if(!sMonthly) {
          GWW_charts.clear();
          GWW_charts.add(ui.Label('No data (yet) ...'));
          showing = false;
        }
        var chart1 = createChart(sMonthly, sDaily);
        // var chart1 = createChart(sMonthly, sDaily, t_start, t_end);
        GWW_charts.clear();
        GWW_charts.add(chart1);
        var filtered = GWW_waterbodies.filterBounds(waterbodyPoint.geometry());
        var waterbody = ee.Feature(filtered.first());
        var s = Map.getScale() * 5;
        selection = filtered.style({ color: 'yellow', fillColor: 'ffff0011'});
        selectionLayer.setEeObject(selection);
        if(!selectionLayer.getShown()) {
          selectionLayer.setShown(true);
        }
        var GWW_reservoir_url = "https://www.globalwaterwatch.earth/reservoir/"+fid;
        GWW_charts.add(ui.Label('Click here to go to reservoir on GWW platform', {fontSize: fontSize_sub}, GWW_reservoir_url));
        GWW_charts.style().set({ shown: true });
        showing = false;
      });
    });
  });
}
function showTimeseries(waterbody) {
// function showTimeseries(waterbody, t_start, t_end) {
//   if (typeof t_start == 'undefined') t_start = GWW_START_DATE;
//   if (typeof t_end == 'undefined') t_end = GWW_END_DATE;
  if(showing) {
    return;
  }
  log.show();
  log.info('GWW: Loading chart data for selected waterbody ...');
  GWW_charts.clear();
  log.info('GWW: Searching for waterbody data  ...');
  waterbody.geometry().evaluate(function(waterbodyGeometry) {
    // check if a water body was found
    // if(!waterbodiesClickedSize) {
    //   log.info('GWW: Waterbody not found.');
    //   selectedWaterbody = null;
    //   return;
    // }
    // show chart if it's not visible
    if(!GWW_charts.style().get('shown')) {
      // onToggleControlsClick();
      GWW_charts.style().set('shown', true);
    }
    selectedWaterbody = waterbody;
    // proceed with quering time series
    var waterbodyPoints = GWW_waterbodiesPoints.filterBounds(waterbodyGeometry);
      // .map(function(f) {
      //   return f.set({distance: f.geometry().distance(pt, Map.getScale() * 5)});
      // }).sort('distance', true).limit(1);
    log.info('GWW: Loading waterbody data ...');
    waterbodyPoints.size().evaluate(function(size) {
      if(!size) {
        // try with a buffer
        // var waterbodyPoints2 = GWW_waterbodiesPoints.filterBounds(waterbodyGeometry.buffer(300, 10)).limit(1);
        // waterbodyPoints2.size().evaluate(function(size) {
        //   if(!size) {
            GWW_charts.clear();
            // GWW_charts.add(ui.Label('No data yet.'));
            log.info('GWW: Waterbody not found.');
            return;
          // }
          // var waterbodyPoint2 = ee.Feature(waterbodyPoints2.first());
          // show(waterbodyPoint2);//, true);
          // // show(waterbodyPoint2, t_start, t_end);//, true);
        // });
      } else {
        var waterbodyPoint = waterbodyPoints.first();
        // var waterbodyPoint = ee.Feature(waterbodyPoints.first())
        show(waterbodyPoint);//, true);
        // show(waterbodyPoint, t_start, t_end);//, true);
      }
    });
  });
}
function createChart(sMonthly, sDaily) {
// function createChart(sMonthly, sDaily, t_start, t_end) {
//   if (typeof t_start == 'undefined') t_start = GWW_START_DATE;
//   if (typeof t_end == 'undefined') t_end = GWW_END_DATE;
  var table = 
  {
    cols: [
      {id: 't', type: 'date', role: 'domain'},
      {id: 'area', type: 'number', role: 'data'},
      {id: 'area_raw', type: 'number', role: 'data'},
    ],
    rows: []
  };
  var dataDaily = CSVToArray(sDaily).slice(1);
  var rowsDaily = dataDaily.map(function(o) {
    return { c: [{v: new Date(Date.parse(o[0]))}, { v: null }, {v: parseFloat(o[1]) / 1000000 }, {v: null}] };
  });
  var allRows = rowsDaily;
  var dataMonthly = CSVToArray(sMonthly).slice(1);
  var rowsMonthly = dataMonthly.map(function(o) {
    return { c: [{v: new Date(Date.parse(o[0]))}, {v: parseFloat(o[1]) / 1000000 }, { v: null }, {v: null}] };
  });
  allRows  = allRows.concat(rowsMonthly);
  // all tables below eachother
  table.rows = allRows;
  var chart = ui.Chart(table)
    .setOptions({
      title: 'GWW time series of reservoir surface area',
      // chartArea: {width: '80%', height: '80%'},
      // width: '700px', height: '240px',
      vAxis: { viewWindow: { min: 0 } },
      hAxis: { viewWindow: { min: new Date(Date.parse(GWW_START_DATE)).getTime(), max: new Date(Date.parse(GWW_END_DATE)).getTime() } },
      // hAxis: { viewWindow: { min: new Date(Date.parse(t_start)).getTime(), max: new Date(Date.parse(t_end)).getTime() } },
      series: {
        0: { title: 'fit', lineWidth: 1, pointSize: 0, color: 'blue'},
        1: { title: 'raw', lineWidth: 0, pointSize: 2, color: 'red', dataOpacity: GWW_RAW_OPACITY },
      }
    });
  chart.setSeriesNames(['fit', 'raw']);
  log.hide();
  return chart;
}
// ---------------------------------------------------------------------------------------------------- //
// Functions (app)
// ---------------------------------------------------------------------------------------------------- //
// S2 cloud masking using s2cloudless/S2_cloudProb
// https://developers.google.com/earth-engine/tutorials/community/sentinel-2-s2cloudless
function add_cloud_bands(img) {
  var cld_prb = ee.Image(img.get('s2cloudless')).select('probability');
  var is_cloud = cld_prb.gt(CLD_PRB_THRESH).rename('clouds');
  return img.addBands(is_cloud);
}
function add_shadow_bands(img) {
  // Identify water pixels from the SCL band.
  var not_water = img.select('SCL').neq(6);
  // Identify dark NIR pixels that are not water (potential cloud shadow pixels).
  var SR_BAND_SCALE = 1e4;
  var dark_pixels = img.select('B8').lt(NIR_DRK_THRESH*SR_BAND_SCALE).multiply(not_water).rename('dark_pixels');
  // Determine the direction to project cloud shadow from clouds (assumes UTM projection).
  var shadow_azimuth = ee.Number(90).subtract(ee.Number(img.get('MEAN_SOLAR_AZIMUTH_ANGLE')));
  // Project shadows from clouds for the distance specified by the CLD_PRJ_DIST input.
  var cld_proj = (img.select('clouds').directionalDistanceTransform(shadow_azimuth, CLD_PRJ_DIST*10)
      .reproject({'crs': img.select(0).projection(), 'scale': 100})
      .select('distance')
      .mask()
      .rename('cloud_transform'));
  // Identify the intersection of dark pixels with cloud shadow projection.
  var shadows = cld_proj.multiply(dark_pixels).rename('shadows');
  return img.addBands(shadows);
}
function add_cld_shdw_mask(img) {
  // Add cloud component bands.
  var img_cloud = add_cloud_bands(img);
  // Add cloud shadow component bands.
  var img_cloud_shadow = add_shadow_bands(img_cloud);
  // Combine cloud and shadow mask, set cloud and shadow as value 1, else 0.
  var is_cld_shdw = img_cloud_shadow.select('clouds').add(img_cloud_shadow.select('shadows')).gt(0);
  // Remove small cloud-shadow patches and dilate remaining pixels by BUFFER input.
  // 20 m scale is for speed, and assumes clouds don't require 10 m precision.
  is_cld_shdw = (is_cld_shdw.focal_min(2).focal_max(BUFFER*2/20)
      // .reproject({'crs': img.select([0]).projection(), 'scale': 20})
      .reproject({'crs': img.select([0]).projection(), 'scale': CLD_SCALE})
      .rename('cloudmask'));
  // Add the final cloud-shadow mask to the image.
  return img.addBands(is_cld_shdw);
}
function apply_cld_shdw_mask(img) {
  var not_cld_shdw = img.select('clouds').not();  // TESTING ONLY!
  // var not_cld_shdw = img.select('cloudmask').not();
  return img.select('B.*').updateMask(not_cld_shdw);
}
// calculate difference between JRC years
function calcDiffJRC(year1, year2) {
  // get monthly JRC data for the two years
  var JRC_year1 = JRC_monthly.filter(ee.Filter.eq('year', year1));
  var JRC_year2 = JRC_monthly.filter(ee.Filter.eq('year', year2));
  // helper function to obtain water only
  var remap = function(img) {
    return img.eq(2).set('system:time_start', img.get('system:time_start'));
  };
  // helper function to get yearly mean water
  var yearlyMean = function(JRC_year) {
    JRC_year = JRC_year.map(remap).mean().gt(0.1);
    return JRC_year.mask(JRC_year.gt(0)).clip(country.geometry().bounds());
  };
  // get mean water within each year
  JRC_year1 = yearlyMean(JRC_year1);
  JRC_year2 = yearlyMean(JRC_year2);
  var JRC_diff = JRC_year2.unmask().subtract(JRC_year1.unmask());
  JRC_diff = JRC_diff.mask(JRC_diff.eq(0).not());
  Map.addLayer(JRC_year2, {min:0, max:1, palette:['ffffff','0000ff']}, 'JRC mean water ' + year2, false);
  Map.addLayer(JRC_year1, visParams_diff_jrc, 'JRC mean water ' + year1, false);
  Map.addLayer(JRC_diff, visParams_diff_jrc, 'JRC water difference ' + year2 + '-' + year1, false);
  return JRC_diff;
}
// update use case
function updateUseCase(case_n) {
  // clear relevant items before updating
  Map.unlisten();
  Map.remove(button_zoom);
  chart_1.clear();
  chart_2.clear();
  GWW_charts.clear();
  // if (case_n == 'Inspect water bodies') {
  if ((case_n == usecases_en[0]) || (case_n == usecases_pt[0])) {
    // reset UI panels
    panel.widgets().reset(panels_case_water);
    // chart_dam_mssg.setValue('Select a basin on the map to query an analysis of water bodies within it. Select a point on the chart to zoom the map to that water body.');
    if (language_selector.getValue() == 'EN') {
      chart_dam_mssg.setValue('Select a basin on the map to query an analysis of water bodies within it. Select a point on the chart to zoom the map to that water body.');
    } else if (language_selector.getValue() == 'PT') {
      chart_dam_mssg.setValue("Selecione uma bacia no mapa para consultar uma análise dos corpos d'água dentro dela. Selecione um ponto no gráfico para ampliar o mapa para esse corpo de água.");
    }
    clearLayers(['selected dam and property', 'clicked dam segment']);
    // update app using defaults
    updateLayer(ee.Image().byte().paint(basins,0,2), 'Angola basins', true, {}, 0.7);
    updateBasin(basins.filter(ee.Filter.eq('NAME', default_basin)));
    updateYear(selector_year.getValue());
    // add map-on-click functionality
    var mapClickBasins = function(coords) {
      chart_1.clear();
      // get water bodies within clicked basin
      var clicked_point = ee.Geometry.Point([coords.lon, coords.lat]);
      // Map.addLayer(clicked_point);
      var clicked_basin = basins.filterBounds(clicked_point);
      updateBasin(clicked_basin);
    };
    // update map
    // Map.remove(legend_dam);
    Map.remove(legend_panel);
    Map.centerObject(basins);
    Map.onClick(mapClickBasins);
    Map.style().set({cursor: 'crosshair'});
  // } else if (case_n == 'Analyse dam deformations') {
  } else if ((case_n == usecases_en[1]) || (case_n == usecases_pt[1])) {
    // reset UI panels
    panel.widgets().reset(panels_case_dams);
    // chart_dam_mssg.setValue('Select a point on the longitudinal profile chart or a coloured dam segment on the map to query the time series for that dam segment.');
    if (language_selector.getValue() == 'EN') {
      chart_dam_mssg.setValue('Select a point on the longitudinal profile chart or a coloured dam segment on the map to query the time series for that dam segment.');
    } else if (language_selector.getValue() == 'PT') {
      chart_dam_mssg.setValue("Selecione um ponto no gráfico de perfil longitudinal ou um segmento de barragem colorido no mapa para consultar a série temporal desse segmento de barragem.");
    }
    clearLayers(['clicked basin', 'waterbody from chart-click', 'Sentinel-2 (true color - RGB)', 'Sentinel-2 (false color - SNG)', 'water classification (JRC)', 'water occurrence (Dynamic World)']);
    // update app using defaults
    updateLayer(ee.Image().byte().paint(basins,0,2), 'Angola basins', false, {}, 0.7);
    var dam_n = selector_dams.getValue();
    updateDam(dam_n);
    // add map-on-click functionality
    var mapClickDams = function(coords) {
      var clicked_point = ee.Geometry.Point([coords.lon, coords.lat]);
      // Map.addLayer(clicked_point);
      // find clicked dam segment
      var dam_n = selector_dams.getValue();
      var dam_select = ee.FeatureCollection(dams.get(dam_n));
      var tmp_dam_segment = dam_select.filterBounds(clicked_point.buffer(10));
      // print(tmp_dam_segment);
      // print(tmp_dam_segment.size());
      tmp_dam_segment = ee.Feature(tmp_dam_segment.map(function(f) {
        return f.set('dist', f.distance(clicked_point));
      }).sort('dist').first());
      // print(tmp_dam_segment);
      // highlight point on chart
      // var tmp_DataTable = chart_1.widgets().get(0).getDataTable();
      // print(tmp_DataTable);
      // tmp_DataTable.cols = tmp_DataTable.cols.push({'type':'string', 'role':'style'});
      // tmp_DataTable.rows = tmp_DataTable.rows.map(function(row) {
      //   row.c[2] = null;
      //   return row;
      // });
      // print(tmp_DataTable);
      // tmp_DataTable.rows[25].c[2] = 'point {size: 6}';
      // print(tmp_DataTable);
      // chart_1.widgets().get(0).setDataTable(tmp_DataTable);
      // print(chart_1.widgets().get(0).getDataTable());
      // update for clicked dam segment
      tmp_dam_segment.get('id').evaluate(function(val, err) {
        updateDamSegment(tmp_dam_segment, selector_props.getValue(), 'id', val);
      });
    };
    // update map
    Map.centerObject(ee.FeatureCollection(dams.get(dam_n)));
    // Map.add(legend_dam);
    Map.add(legend_panel);
    Map.onClick(mapClickDams);
    Map.style().set({cursor: 'crosshair'});
  } else {
    // reset UI panels
    panel.widgets().reset(panels_base);
    chart_dam_mssg.setValue('');
    // clearLayers([]);
    updateLayer(ee.Image().byte().paint(basins,0,2), 'Angola basins', false, {}, 0.7);
    // update map
    // Map.remove(legend_dam);
    Map.remove(legend_panel);
    Map.centerObject(basins);
    Map.unlisten();
    Map.style().set({cursor: 'hand'});
  }
}
// update using selected basin
// var chart_areas = ui.Chart();  // initialization of chart
// var chart_basin_title_en = 'Area of artificial water bodies (logarithmic scale)';
// var chart_basin_title_pt = "Área de corpos d'água artificiais (escala logarítmica)";
// var text_below_chart_basin_en = 'Artificial water bodies in basin:';
// var text_below_chart_basin_pt = 'Corpos de água artificiais na bacia:';
// var label_below_chart_basin = ui.Label(text_below_chart_basin_en, {fontSize: fontSize_sub});
function updateBasin(clicked_basin) {
  // Map.addLayer(clicked_basin, {}, 'clicked basin', true, 0.5);
  updateLayer(clicked_basin, 'clicked basin', true, {}, 0.5);
  var GWW_waterbodies_basin = GWW_waterbodies.filterBounds(clicked_basin.geometry());
  var app_waterbodies_basin = artificial_water_bodies.filterBounds(clicked_basin.geometry());
  // show number of identified water bodies
  app_waterbodies_basin.size().evaluate(function(val, err) {
    // if (language_selector.getValue() == 'EN') {
    //   label_below_chart_basin = ui.Label(text_below_chart_basin_en, {fontSize: fontSize_sub});
    // } else if (language_selector.getValue() == 'PT') {
    //   label_below_chart_basin = ui.Label(text_below_chart_basin_pt, {fontSize: fontSize_sub});
    // }
    var basin_extra = ui.Panel([
      ui.Panel([
        ui.Label('Artificial water bodies in basin:', {fontSize: fontSize_sub}),
        // label_below_chart_basin,
        ui.Label(val, {fontSize: fontSize_sub}),
      ], ui.Panel.Layout.flow('horizontal')),
    ]);
    chart_1.add(basin_extra);
  });
  // show information on water bodies in chart and enable on-click functionality
  var chart_areas = ui.Chart.feature.byFeature(app_waterbodies_basin.sort('id'), 'id', ['area']);
  // chart_areas = ui.Chart.feature.byFeature(app_waterbodies_basin.sort('id'), 'id', ['area']);
  // chart_areas.setChartType('ColumnChart');
  chart_areas.setOptions({
    title: 'Area of artificial water bodies (logarithmic scale)',
    hAxis: {title: 'id'},
    vAxis: {title: 'Area (m2, log scale)', scaleType:'log'}
  });
  // if (language_selector.getValue() == 'EN') {
  //   chart_areas.setOptions({
  //     title: chart_basin_title_en,
  //     hAxis: {title: 'id'},
  //     vAxis: {title: 'Area (m2, log scale)', scaleType:'log'}
  //   });
  // } else if (language_selector.getValue() == 'PT') {
  //   chart_areas.setOptions({
  //     title: chart_basin_title_pt,
  //     hAxis: {title: 'id'},
  //     vAxis: {title: 'Área (m2, escala log)', scaleType:'log'}
  //   });
  // }
  chart_areas.onClick(function(chart_x, chart_y, chart_n) {
    Map.remove(button_zoom);
    var waterbody_from_chart_click = ee.Feature(app_waterbodies_basin.filter(ee.Filter.eq('id', chart_x)).first());
    // print(waterbody_from_chart_click);
    Map.centerObject(waterbody_from_chart_click);
    // Map.addLayer(waterbody_from_chart_click, {}, 'waterbody from chart-click', true, 0.7);
    updateLayer(waterbody_from_chart_click, 'waterbody from chart-click', true, {}, 0.7);
    Map.add(button_zoom);
  });
  chart_1.add(chart_areas);
}
// update EO imagery/datasets based on selected year
function updateYear(year_str) {
  // get year/dates
  var year_int = ee.Number.parse(year_str);
  var startDate = ee.Date.fromYMD(year_int, 1, 1);
  var endDate = ee.Date.fromYMD(year_int.add(1), 1, 1);
  // print(S2_masked.filterDate(startDate, endDate).size());
  // get EO imagery/datasets
  var S2_year = S2_masked.filterDate(startDate, endDate).median();
  var DW_water_year = DynamicWorld.filterDate(startDate, endDate).select('water').mean().multiply(100);
  var JRC_water_year = JRC_yearly.filter(ee.Filter.eq('year', year_int));
  // print('JRC water ' + year_str, JRC_water_year);
  // Map.addLayer(S2_year, visParams_S2_RGB, 'Sentinel-2 ' + year_str + ' (true color - RGB)', false);
  // Map.addLayer(S2_year, visParams_S2_SNG, 'Sentinel-2 ' + year_str + ' (false color - SNG)', false);
  // Map.addLayer(JRC_water_year, visParams_water_jrc, 'water ' + year_str + ' (JRC)', false);
  // Map.addLayer(DW_water_year, visParams_water_occ, 'water occurrence ' + year_str + ' (Dynamic World)', false);
  // updateLayer(S2_year, 'Sentinel-2 ' + year_str + ' (true color - RGB)', false, visParams_S2_RGB);
  // updateLayer(S2_year, 'Sentinel-2 ' + year_str + ' (false color - SNG)', false, visParams_S2_SNG);
  // updateLayer(JRC_water_year, 'water ' + year_str + ' (JRC)', false, visParams_water_jrc);
  // updateLayer(DW_water_year, 'water occurrence ' + year_str + ' (Dynamic World)', false, visParams_water_occ);
  updateLayer(S2_year, 'Sentinel-2 (true color - RGB)', false, visParams_S2_RGB, 0.8);
  updateLayer(S2_year, 'Sentinel-2 (false color - SNG)', false, visParams_S2_SNG, 0.8);
  updateLayer(JRC_water_year, 'water classification (JRC)', false, visParams_water_jrc);
  updateLayer(DW_water_year, 'water occurrence (Dynamic World)', false, visParams_water_occ);
}
// find water bodies closest to (selected) dam
function findClosestWaterBody(dam) {
  // get water bodies within search range
  var search_area = dam.geometry().dissolve(ee.ErrorMargin(100)).buffer(100);
  // Map.addLayer(search_area, {}, 'water body search area', false);
  var waterbodies_GWW = GWW_waterbodies.filterBounds(search_area);
  var waterbodies_app = artificial_water_bodies.filterBounds(search_area);
  // print('Found GWW dam(s) close to selected dam:', waterbodies_GWW);
  // print('Found project dam(s) close to selected dam:', waterbodies_app);
  // get closest water body
  var GWW_waterbody = ee.Feature(waterbodies_GWW.first());
  var app_waterbody = ee.Feature(waterbodies_app.first());
  // var GWW_waterbody = ee.Feature(GWW_waterbodies.map(function(f) {
  //   return f.set({distance: f.geometry().distance(dam.geometry())});
  // }).sort('distance', false).limit(1).first());
  // var app_waterbody = ee.Feature(app_waterbodies.map(function(f) {
  //   return f.set({distance: f.geometry().distance(dam.geometry())});
  // }).sort('distance', false).limit(1).first());
  // get GWW time series
  showTimeseries(GWW_waterbody);
  // var tmp_dam_segment_ts = ee.Feature(dam.filter(ee.Filter.notNull(['velocity'])).first()).select(["v_.*"]).toDictionary();
  // tmp_dam_segment_ts_x = convertToDates(tmp_dam_segment_ts.keys()).sort();
  // showTimeseries(GWW_waterbody, tmp_dam_segment_ts_x.get(0).format(), );
}
// find closest match of a certain numeric value within a list of numeric values
function findClosestMatch(values_list, to_match_val) {
  var tmp_diffs = ee.List(values_list).map(function(i) {
    return ee.Number(i).divide(to_match_val).subtract(1).abs();
  });
  var diff_min = tmp_diffs.reduce(ee.Reducer.min());
  var closest_match_idx = tmp_diffs.indexOf(diff_min);
  return closest_match_idx;
}
// set style property for visualisation on map
function setStyleProp(fc, prop, metric, colors) {
  // default(s)
  // if (typeof metric == 'undefined') metric = default_legend_scaling;
  // if (typeof colors == 'undefined') metric = default_legend_colors;
  // split out features with null value at selected property
  var fc_null = fc.filter(ee.Filter.notNull([prop]).not());
  fc = fc.filter(ee.Filter.notNull([prop]));
  // get relevant values to match to colors
  var tmp_vals_prop = null;
  var tmp_vals_min = null;
  var tmp_vals_max = null;
  var tmp_vals_step = null;
  var palette_dams = [];
  if (metric == 'local min/max (quartiles)') {
    tmp_vals_prop = ee.Dictionary(ee.List(fc.aggregate_array(prop)).reduce(ee.Reducer.percentile([0, 25, 75, 100])));
    // print(tmp_vals_prop);
    // convert dict to list for use in findClosestMatch function
    tmp_vals_prop = ee.List([
      tmp_vals_prop.get('p0'),
      tmp_vals_prop.get('p25'),
      tmp_vals_prop.get('p75'),
      tmp_vals_prop.get('p100')
    ]);
  } else if (metric == 'global min/max (quartiles)') {
    tmp_vals_prop = ee.Dictionary(dams_fc.aggregate_array(prop).reduce(ee.Reducer.percentile([0, 25, 75, 100])));
    // print(tmp_vals_prop);
    tmp_vals_prop = ee.List([
      tmp_vals_prop.get('p0'),
      tmp_vals_prop.get('p25'),
      tmp_vals_prop.get('p75'),
      tmp_vals_prop.get('p100')
    ]);
  } else if (metric == 'local min/max (linear)') {
    tmp_vals_min = ee.Number(fc.aggregate_min(prop));
    tmp_vals_max = ee.Number(fc.aggregate_max(prop));
    tmp_vals_step = tmp_vals_max.subtract(tmp_vals_min).divide(3);
    tmp_vals_prop = ee.List([
      tmp_vals_min,
      tmp_vals_min.add(tmp_vals_step),
      tmp_vals_max.subtract(tmp_vals_step),
      tmp_vals_max
    ]);
  } else if (metric == 'global min/max (linear)') {
    tmp_vals_min = ee.Number(dams_fc.aggregate_min(prop));
    tmp_vals_max = ee.Number(dams_fc.aggregate_max(prop));
    tmp_vals_step = tmp_vals_max.subtract(tmp_vals_min).divide(3);
    tmp_vals_prop = ee.List([
      tmp_vals_min,
      tmp_vals_min.add(tmp_vals_step),
      tmp_vals_max.subtract(tmp_vals_step),
      tmp_vals_max
    ]);
  }
  // print(tmp_vals_prop);
  // set colors
  palette_dams = String(colors).split('-');
  // print(palette_dams);
  // set style properties based on value of individual feature(s)
  fc = fc.map(function(f) {
    var closest_match_idx = findClosestMatch(tmp_vals_prop, f.get(prop));
    return f.set('style_val', {'color':ee.List(palette_dams).get(closest_match_idx), 'width':3});
  });
  // set style properties of feature(s) with null value at selected property
  fc_null = fc_null.map(function(f) {
    return f.set('style_val', {'color':'white', 'width':1});
  });
  // merge all features
  fc = fc.merge(fc_null);
  // also update legend based on obtained values
  tmp_vals_prop.evaluate(function(val, err) {
    // print(val);
    // print(Math.floor(val[0]));
    // print(Math.ceil(val[val.length-1]));
    // var legend_props = {min:val[0], max:val[val.length-1], palette:palette_dams};
    // var legend_props = {min:Math.floor(val[0]), max:Math.ceil(val[val.length-1]), palette:palette_dams};
    // var legend_tmp = createLegend({vals:val, palette:palette_dams}, prop);
    var legend_tmp = createLegend({vals:val, palette:palette_dams}, prop + ' ' + prop_units[prop]);
    legend_dam.clear();
    legend_dam.add(legend_tmp);
    // legend_panel.style().set('shown', true);  // if shown on map
    // legend_dam.style().set('shown', true);  // if shown on map (without larger panel)
  });
  return fc;
}
// create legend (copied and adjusted from UI module)
// (instead of styling between a min and max, style based on supplied values; requires values and palette to be of equal length)
var createLegend = function(params, title, position) {
  // default parameters
  if (typeof title == 'undefined') title = '';
  if (typeof position == 'undefined') position = 'bottom-left';
  // construct legend
  var legend = ui.Panel([
    // ui.Label('Legend', {fontWeight: 'bold', fontSize: '16px'}),  // commented out (active in UI module, not wanted here)
    ui.Label(title, {fontSize: '14px', fontWeight: 'bold'}),  // added bold compared to UI module
    ], ui.Panel.Layout.flow('vertical'), {position: position}
  );
  // var legend_count = params.palette.length;  // commented out (active in UI module, not wanted here)
  // var legend_steps = (params.max-params.min)/(legend_count-1);  // commented out (active in UI module, not wanted here)
  var legend_count = params.vals.length;
  var legend_items = [];
  for (var i=0; i<legend_count; i++) {
    var label_1 = ui.Label({style:{
      backgroundColor:params.palette[i],
      border:'1px solid black',
      padding:'8px',
      margin:'7px 0px 0px 8px'
    }});
    // var label_2 = ui.Label(String(params.min+i*legend_steps));  // commented out (active in UI module, not wanted here)
    var label_2 = ui.Label(String(Math.round(params.vals[i]*100)/100));  // added compared to UI module
    var panel = ui.Panel([label_1, label_2], ui.Panel.Layout.Flow('horizontal'));
    legend.add(panel);
  }
  // Map.add(legend);
  return legend;
};
// update legend
var updateLegend = function() {
  var dam_select = ee.FeatureCollection(dams.get(selector_dams.getValue()));
  dam_select = setStyleProp(dam_select, selector_props.getValue(), selector_legend_scaling.getValue(), selector_legend_colors.getValue());
  updateLayer(dam_select.style({styleProperty:'style_val'}), 'selected dam and property', true, {});
};
// trigger when updating dam selector
var updateDam = function(dam_n) {
  // clear chart(s)
  chart_2.clear();
  // obtain selected dam
  var dam_select = ee.FeatureCollection(dams.get(dam_n));
  // dam_select = setStyleProp(dam_select, selector_props.getValue());
  dam_select = setStyleProp(dam_select, selector_props.getValue(), selector_legend_scaling.getValue(), selector_legend_colors.getValue());
  // find water body
  findClosestWaterBody(dam_select);
  // update app elements
  updateChart(dam_select, selector_props.getValue());
  Map.centerObject(dam_select);
  // Map.addLayer(dam_select, {}, dam_n + ' dam', true);
  // Map.addLayer(dam_select.style({styleProperty:'style_val'}), {}, dam_n + ' dam (' + selector_props.getValue() + ')', true);
  // updateLayer(dam_select.style({styleProperty:'style_val'}), dam_n + ' dam (' + selector_props.getValue() + ')', {}, true);
  updateLayer(dam_select.style({styleProperty:'style_val'}), 'selected dam and property', true, {});
};
// trigger when updating property selector
var updateProp = function(prop) {
  // clear chart(s)
  chart_2.clear();
  // obtain selected dam
  var dam_n = selector_dams.getValue();
  var dam_select = ee.FeatureCollection(dams.get(dam_n));
  // update app elements
  // dam_select = setStyleProp(dam_select, prop);
  dam_select = setStyleProp(dam_select, prop, selector_legend_scaling.getValue(), selector_legend_colors.getValue());
  updateChart(dam_select, prop);
  // Map.addLayer(dam_select, {}, dam_n + ' dam', true);
  // Map.addLayer(dam_select.style({styleProperty:'style_val'}), {}, dam_n + ' dam (' + prop + ')', true);
  // updateLayer(dam_select.style({styleProperty:'style_val'}), dam_n + ' dam (' + prop + ')', {}, true);
  updateLayer(dam_select.style({styleProperty:'style_val'}), 'selected dam and property', true, {});
};
function convertToDates(dates_str) {
  return dates_str.map(function(i) {
    var tmp_date = ee.Date.parse('YYYYMMdd', ee.String(i).split('_').get(1));//, timeZone)
    return tmp_date.millis();
  });
}
// 
var updateDamSegment = function(tmp_dam_segment, chart_n, x_prop, chart_x) {
  chart_2.clear();
  // print(tmp_dam_segment);
  // print(tmp_dam_segment.get('ts_chart'));
  // Map.addLayer(tmp_dam_segment, {}, 'clicked dam segment', true, 0.7);
  // Map.addLayer(tmp_dam_segment.buffer(10), {}, 'clicked dam segment', true, 0.5);
  // Map.addLayer(ee.Image().byte().paint(tmp_dam_segment.buffer(5),0,2), {}, 'clicked dam segment', true);
  updateLayer(ee.Image().byte().paint(tmp_dam_segment.buffer(5),0,2), 'clicked dam segment');
  var tmp_dam_segment_ts = tmp_dam_segment.select(["v_.*"]).toDictionary();
  // print(tmp_dam_segment_ts);
  var tmp_dam_segment_ts_y = tmp_dam_segment_ts.values();
  var tmp_dam_segment_ts_x = tmp_dam_segment_ts.keys();
  // tmp_dam_segment_ts_x = tmp_dam_segment_ts_x.map(function(i) {
  //   var tmp_date = ee.Date.parse('YYYYMMdd', ee.String(i).split('_').get(1));//, timeZone)
  //   return tmp_date.millis();
  // });
  tmp_dam_segment_ts_x = convertToDates(tmp_dam_segment_ts_x);
  // print(tmp_dam_segment_ts_x);
  var tmp_chart_ts = ui.Chart.array.values(tmp_dam_segment_ts_y, 0, tmp_dam_segment_ts_x);
  tmp_chart_ts.setSeriesNames([chart_n]);
  tmp_chart_ts.setOptions({
    // title: chart_n + ' time series at clicked dam segment (' + x_prop + ': ' + chart_x + ')',
    title: 'Time series at clicked dam segment (' + x_prop + ': ' + chart_x + ')',
    vAxis: {title: chart_n + ' ' + prop_units[chart_n]},
    series: {
      0: {lineWidth: 1, pointSize: 4}
      // 0: {lineWidth: 0, pointSize: 4}
    }
  });
  // charts_panel.add(tmp_chart_ts);
  chart_2.add(tmp_chart_ts);
  tmp_dam_segment.toDictionary().evaluate(function(val, err) {
    var tmp_dam_segment_extra = ui.Panel([
      ui.Panel([
        ui.Label('detailed chart:', {fontSize: fontSize_sub}),
        ui.Label('click here', {fontSize: fontSize_sub}, val['ts_chart']),
      ], ui.Panel.Layout.flow('horizontal')),
  //     ui.Panel([
  //       ui.Label('Seasonal amplitude:', {fontSize: fontSize_sub}),
  //       ui.Label(val['seasonal_a'], {fontSize: fontSize_sub}),
  //       ui.Label('mm', {fontSize: fontSize_sub})
  //     ], ui.Panel.Layout.flow('horizontal')),
  //     ui.Panel([
  //       ui.Label('Seasonal phase:', {fontSize: fontSize_sub}),
  //       ui.Label(val['seasonal_p'], {fontSize: fontSize_sub}),
  //       ui.Label('days of year', {fontSize: fontSize_sub})
  //     ], ui.Panel.Layout.flow('horizontal')),
  //     ui.Panel([
  //       ui.Label('RMSE:', {fontSize: fontSize_sub}),
  //       ui.Label(val['rmse'], {fontSize: fontSize_sub}),
  //       ui.Label('mm', {fontSize: fontSize_sub})
  //     ], ui.Panel.Layout.flow('horizontal'))
    ]);
    chart_2.add(tmp_dam_segment_extra);
  });
};
// chart update
var updateChart = function(dam, prop, x_prop) {
  // default(s)
  if (typeof x_prop == 'undefined') x_prop = default_chart_x_prop;
  // charts_panel.clear();
  chart_1.clear();
  // dam = dam.filter(ee.Filter.notNull([prop]));
  // dam = dam.sort(prop);
  dam = dam.sort(x_prop);
  var tmp_chart = ui.Chart.feature.byFeature(dam, x_prop, prop);
  tmp_chart.setOptions({
    title: 'Longitudinal profile chart',
    series: {
      // 0: {lineWidth: 1, pointSize: 4}
      0: {lineWidth: 0, pointSize: 4}
    }
  });
  // tmp_chart.setChartType('ScatterChart');
  tmp_chart.onClick(function(chart_x, chart_y, chart_n) {
    chart_2.clear();
    // print(chart_x, chart_y, chart_n);
    var tmp_dam_segment = ee.Feature(dam.filter(ee.Filter.eq(x_prop, chart_x)).first());
    updateDamSegment(tmp_dam_segment, chart_n, x_prop, chart_x);
  });
  // charts_panel.add(tmp_chart);
  chart_1.add(tmp_chart);
};
// clear map layer(s)
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
// update map layer(s)
function updateLayer(new_layer, name, shown, visParams, opacity) {
  // defaults
  if (typeof shown == 'undefined') shown = true;
  if (typeof visParams == 'undefined') visParams = {};
  if (typeof opacity == 'undefined') opacity = 1.0;
  // check if layer already exists, and if so, update
  var found_layer = true;
  Map.layers().forEach(function(layer) {
    if (layer.get('name') == name) {
      // Map.layers().remove(layer);
      layer.setEeObject(new_layer);
      layer.setShown(shown);
      found_layer = false;
    }
  });
  // otherwise, add as new layer
  if (found_layer) {
    Map.addLayer(new_layer, visParams, name, shown, opacity);
  }
}
// map zoom
var zoomCountry = function() {
  Map.centerObject(basins);
  Map.remove(button_zoom);
};
// toggle UI elements
var toggleRefs = function() {
  refs.style().set('shown', !refs.style().get('shown'));
};
var toggleDisclaimer = function() {
  disclaimer.style().set('shown', !disclaimer.style().get('shown'));
};
// ---------------------------------------------------------------------------------------------------- //
// Prep
// ---------------------------------------------------------------------------------------------------- //
// country
var country = countries.filter(ee.Filter.eq('ADM0_NAME', country_na));
// basin(s)
// var Kwanza_basin = basins.filter(ee.Filter.eq('NAME', 'Kwanza'));
// join Sentinel-2 collection with s2cloudless
S2_cloudProb = S2_cloudProb.filterBounds(country.geometry().bounds());
// print('S2 cloudProb images:', S2_cloudProb.size());
// print('S2 cloudProb:', S2_cloudProb);
var S2_masked = ee.ImageCollection(ee.Join.saveFirst('s2cloudless').apply({
  'primary': S2,
  'secondary': S2_cloudProb,
  'condition': ee.Filter.equals({
    'leftField': 'system:index',
    'rightField': 'system:index'
  })
}));
// apply cloud and cloud shadow masking
// S2_masked = S2_masked.map(add_cld_shdw_mask).map(apply_cld_shdw_mask);
S2_masked = S2_masked.map(add_cloud_bands).map(apply_cld_shdw_mask);  // TESTING ONLY!
S2_masked = S2_masked.select(S2_BANDS, S2_NAMES);
// water
JRC_water = JRC_water.clip(country.geometry().bounds());
// var DW_water_2022 = DynamicWorld.filterDate('2022-01-01', '2023-01-01').select('water').mean().multiply(100);
// water bodies
GWW_waterbodies = GWW_waterbodies.filterBounds(country.geometry().bounds());
// print(artificial_water_bodies.first());
// print(GWW_waterbodies.first());
// dams
// print(ruacana_dam);
// print(ruacana_dam.first());
// print(ruacana_dam.aggregate_histogram('id'));
// print(ruacana_dam.aggregate_histogram('velocity'));
// print(ruacana_dam.aggregate_histogram('velocity_a'));
// ruacana_dam = setStyleProp(ruacana_dam, 'velocity');
// tundavala_dam = setStyleProp(tundavala_dam, 'velocity');
var dams = ee.Dictionary({
  'Calueque': calueque_dam,
  'Chicungo': chicungo_dam,
  'Matala': matala_dam,
  'Matala_2': matala_2_dam,
  'Neves': neves_dam,
  'Ruacana': ruacana_dam,
  'Tundavala': tundavala_dam
});
// var dams_fc = ruacana_dam.merge(tundavala_dam);//.flatten();
// print(dams_fc);
var dams_fc = ee.FeatureCollection([
  calueque_dam, chicungo_dam, matala_dam, matala_2_dam, neves_dam, ruacana_dam, tundavala_dam
]).flatten();
// print(dams_fc);
// GWW placeholders
var showing = false;
var f = ee.Feature(null);
var selection = ee.FeatureCollection([]);
var selectionLayer = ui.Map.Layer(selection.style({ color: 'yellow', fillColor: 'ffff0005'}), {}, 'waterbody (selection)', false);
var selectedWaterbody = null;
// ---------------------------------------------------------------------------------------------------- //
// User Interface
// ---------------------------------------------------------------------------------------------------- //
// padding/margin = 1 (all), 2 (top/bottom,right/left), 3 (top,right/left,bottom), 4 (top,right,bottom,left)
var updateLanguage = function(language) {
  if (language == 'EN') {
    // intro
    label_intro_1.setValue(text_intro_1_en);
    label_intro_2.setValue(text_intro_2_en);
    label_intro_3.setValue(text_intro_3_en);
    // use cases
    title_usecase_panel.setValue(title_usecase_panel_en);
    // selector_usecase.items().reset(usecases_en);
    if (selector_usecase.getValue() == usecases_pt[0]) {
      selector_usecase.items().reset(usecases_en);
      selector_usecase.setValue(usecases_en[0], false);
    } else if (selector_usecase.getValue() == usecases_pt[1]) {
      selector_usecase.items().reset(usecases_en);
      selector_usecase.setValue(usecases_en[1], false);
    }
    selector_usecase.setPlaceholder(usecase_placeholder_en);
    label_usecase_panel.setValue(text_usecase_panel_en);
    // years panel
    title_year_panel.setValue(text_year_panel_en);
    // charts panel
    charts_panel_title.setValue(text_panel_title_en);
    if (selector_usecase.getValue() == usecases_en[0]) {
      chart_dam_mssg.setValue('Select a basin on the map to query an analysis of water bodies within it. Select a point on the chart to zoom the map to that water body.');
    } else if (selector_usecase.getValue() == usecases_en[1]) {
      chart_dam_mssg.setValue('Select a point on the longitudinal profile chart or a coloured dam segment on the map to query the time series for that dam segment.');
    }
    // label_below_chart_basin.setValue(text_below_chart_basin_en);
    // chart_areas.setOptions({
    //   title: chart_basin_title_en,
    //   hAxis: {title: 'id'},
    //   vAxis: {title: 'Area (m2, log scale)', scaleType:'log'}
    // });
    // zoom button
    button_zoom.setLabel(text_button_zoom_en);
    // dams panel
    dams_panel_title.setValue(dams_panel_title_en);
    dams_panel_extra.setValue(dams_panel_extra_en);
    dams_panel_label_1.setValue(dams_panel_text_1_en);
    dams_panel_label_2.setValue(dams_panel_text_2_en);
    styling_panel_title.setValue(styling_panel_title_en);
    styling_panel_label_1.setValue(styling_panel_text_1_en);
    styling_panel_label_2.setValue(styling_panel_text_2_en);
    // references & disclaimer
    title_refs_disc.setValue(title_refs_disc_en);
    refs_button.setLabel(text_refs_button_en);
    disc_button.setLabel(text_disc_button_en);
    outro.setValue(text_outro_en);
  } else if (language == 'PT') {
    // intro
    label_intro_1.setValue(text_intro_1_pt);
    label_intro_2.setValue(text_intro_2_pt);
    label_intro_3.setValue(text_intro_3_pt);
    // use cases
    title_usecase_panel.setValue(title_usecase_panel_pt);
    // selector_usecase.items().reset(usecases_pt);
    if (selector_usecase.getValue() == usecases_en[0]) {
      selector_usecase.items().reset(usecases_pt);
      selector_usecase.setValue(usecases_pt[0], false);
    } else if (selector_usecase.getValue() == usecases_en[1]) {
      selector_usecase.items().reset(usecases_pt);
      selector_usecase.setValue(usecases_pt[1], false);
    }
    selector_usecase.setPlaceholder(usecase_placeholder_pt);
    label_usecase_panel.setValue(text_usecase_panel_pt);
    // years panel
    title_year_panel.setValue(text_year_panel_pt);
    // charts panel
    charts_panel_title.setValue(text_panel_title_pt);
    if (selector_usecase.getValue() == usecases_pt[0]) {
      chart_dam_mssg.setValue("Selecione uma bacia no mapa para consultar uma análise dos corpos d'água dentro dela. Selecione um ponto no gráfico para ampliar o mapa para esse corpo de água.");
    } else if (selector_usecase.getValue() == usecases_pt[1]) {
      chart_dam_mssg.setValue("Selecione um ponto no gráfico de perfil longitudinal ou um segmento de barragem colorido no mapa para consultar a série temporal desse segmento de barragem.");
    }
    // label_below_chart_basin.setValue(text_below_chart_basin_pt);
    // chart_areas.setOptions({
    //   title: chart_basin_title_pt,
    //   hAxis: {title: 'id'},
    //   vAxis: {title: 'Área (m2, escala log)', scaleType:'log'}
    // });
    // zoom button
    button_zoom.setLabel(text_button_zoom_pt);
    // dams panel
    dams_panel_title.setValue(dams_panel_title_pt);
    dams_panel_extra.setValue(dams_panel_extra_pt);
    dams_panel_label_1.setValue(dams_panel_text_1_pt);
    dams_panel_label_2.setValue(dams_panel_text_2_pt);
    styling_panel_title.setValue(styling_panel_title_pt);
    styling_panel_label_1.setValue(styling_panel_text_1_pt);
    styling_panel_label_2.setValue(styling_panel_text_2_pt);
    // references & disclaimer
    title_refs_disc.setValue(title_refs_disc_pt);
    refs_button.setLabel(text_refs_button_pt);
    disc_button.setLabel(text_disc_button_pt);
    outro.setValue(text_outro_pt);
  }
};
// intro text
var text_intro_1_en = "This is a prototype dashboard for inspecting and visualizing data on artificial water bodies and dams within Angola, part of a World Bank funded project carried out by Deltares and Sensar.";
var text_intro_1_pt = "Este é um painel protótipo para inspecionar e visualizar dados sobre corpos de água artificiais e barragens em Angola, parte de um projeto financiado pelo World Bank realizado pela Deltares e Sensar.";
var text_intro_2_en = "The data shown in this dashboard is obtained from various pre-existing datasets and satellite sensors (see references).";
var text_intro_2_pt = "Os dados mostrados neste painel são obtidos de vários conjuntos de dados e sensores de satélite pré-existentes (consulte as referências).";
var text_intro_3_en = "< THIS IS A PROOF-OF-CONCEPT PROTOTYPE ! >";
var text_intro_3_pt = "< ESTE É UM PROTÓTIPO DE PROVA DE CONCEITO ! TRADUÇÃO PARA O PORTUGUÊS FEITA POR COMPUTADOR ! >";
var label_intro_1 = ui.Label({
  value: text_intro_1_en,
  style: {fontSize:fontSize_sub, padding:'0px'}
});
var label_intro_2 = ui.Label({
  value: text_intro_2_en,
  style: {fontSize:fontSize_sub, padding:'0px'}
});
var label_intro_3 = ui.Label({
  value: text_intro_3_en,
  style: {fontSize:fontSize_sub, padding:'0px'}
});
var language_selector = ui.Select({
  items: ['EN', 'PT'],
  value: 'EN',
  onChange: updateLanguage,
  style: {fontSize:'10px', margin:'5px 5px 0px 20px'}
});
var intro = ui.Panel([
  // ui.Label({
  //   value: 'Angola Dam Dashboard',
  //   style: {fontSize:'20px', fontWeight:'bold'}
  // }),
  ui.Panel([
    ui.Label({
      value: 'Angola Dam Dashboard',
      style: {fontSize:'20px', fontWeight:'bold', margin:'10px 10px 0px 7px'}
    }),
    language_selector
  ], ui.Panel.Layout.flow('horizontal')),
  label_intro_1, label_intro_2, label_intro_3
]);
// use case selector
var usecases_en = ['Inspect water bodies', 'Analyse dam deformations'];//, 'None'];
var usecases_pt = ["Inspecionar corpos d'água", "Analisar as deformações da barragem"];//, 'Nenhum'];
var usecase_placeholder_en = 'Select a use case...';
var usecase_placeholder_pt = 'Selecione um caso de uso';
var selector_usecase = ui.Select({
  items: usecases_en,
  placeholder: usecase_placeholder_en,
  onChange: updateUseCase,
});
var title_usecase_panel_en = 'Select a use case for more features:';
var title_usecase_panel_pt = 'Selecione um caso de uso para mais recursos:';
var text_usecase_panel_en = 'This will enable functionalities designed for that use case. It will load data using a predefined selection, which can be changed at will.';
var text_usecase_panel_pt = 'Isso habilitará as funcionalidades projetadas para esse caso de uso. Ele carregará dados usando uma seleção predefinida, que pode ser alterada à vontade.';
var title_usecase_panel = ui.Label(title_usecase_panel_en, {fontWeight:'bold'});
var label_usecase_panel = ui.Label(text_usecase_panel_en, {fontSize:fontSize_sub});
var usecase_panel = ui.Panel([title_usecase_panel, selector_usecase, label_usecase_panel]);
// legend(s)
var legend_dam = ui.Panel();
var selector_legend_scaling = ui.Select({
  items: ['local min/max (linear)', 'local min/max (quartiles)', 'global min/max (linear)', 'global min/max (quartiles)'], 
  // placeholder: 'Select a metric...',
  value: default_legend_scaling,
  onChange: updateLegend,
  // style:
});
var selector_legend_colors = ui.Select({
  items: ['blue-green-yellow-red', 'red-yellow-green-blue', 'blue-white-white-red', 'red-white-white-blue'],
  // placeholder: 'Select colors...',
  value: default_legend_colors,
  onChange: updateLegend,
  // style:
});
var legend_panel = ui.Panel([
  ui.Label('Legend(s):', {fontWeight:'bold'}),
  legend_dam,
  // selector_legend_scaling
]);
// legend_dam.style().set('position', 'bottom-left', 'shown', false);  // if shown on map (without larger panel)
// Map.add(legend_dam);
legend_panel.style().set('position', 'bottom-left');//, 'shown', false);  // if shown on map
// Map.add(legend_panel);
// dam selector
var selector_dams = ui.Select({
  // items: ['Ruacana', 'Tundavala'],
  items: ['Calueque', 'Chicungo', 'Matala', 'Matala_2', 'Neves', 'Ruacana', 'Tundavala'],
  // placeholder: 'Select a dam...',
  value: default_dam,
  onChange: updateDam,
  // style:
});
var selector_props = ui.Select({
  items: ['velocity', 'velocity_a'], 
  // placeholder: 'Select a property...',
  value: default_prop,
  onChange: updateProp,
  // style:
});
var dams_panel_title_en = 'Select dam and property:';
var dams_panel_title_pt = 'Selecione barragem e propriedade:';
var dams_panel_title = ui.Label(dams_panel_title_en, {fontWeight:'bold'});
var dams_panel_extra_en = "Velocity is measured in the vertical direction and 'velocity_a' is its accuracy.";
var dams_panel_extra_pt = "A velocidade é medida na direção vertical e 'velocity_a' é sua precisão";
var dams_panel_extra = ui.Label(dams_panel_extra_en, {fontSize:fontSize_sub});
var dams_panel_text_1_en = 'Dam:';
var dams_panel_text_1_pt = 'Barragem:';
var dams_panel_text_2_en = 'Property:';
var dams_panel_text_2_pt = 'Propriedade:';
var dams_panel_label_1 = ui.Label(dams_panel_text_1_en, {fontSize:fontSize_sub, margin:'14px 29px 0px 7px'});
var dams_panel_label_2 = ui.Label(dams_panel_text_2_en, {fontSize:fontSize_sub, margin:'14px 9px 0px 7px'});
var dams_panel = ui.Panel([
  dams_panel_title,
  dams_panel_extra,
  ui.Panel([
    dams_panel_label_1,
    selector_dams,
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    dams_panel_label_2,
    selector_props
  ], ui.Panel.Layout.flow('horizontal')),
]);
var styling_panel_title_en = 'Select visualization styling:';
var styling_panel_title_pt = 'Selecione o estilo de visualização:';
var styling_panel_title = ui.Label(styling_panel_title_en, {fontWeight:'bold'});
var styling_panel_text_1_en = 'Scaling:';
var styling_panel_text_1_pt = 'Escala:';
var styling_panel_text_2_en = 'Colors:';
var styling_panel_text_2_pt = 'Cores:';
var styling_panel_label_1 = ui.Label(styling_panel_text_1_en, {fontSize:fontSize_sub, margin:'14px 14px 0px 7px'});
var styling_panel_label_2 = ui.Label(styling_panel_text_2_en, {fontSize:fontSize_sub, margin:'14px 18px 0px 7px'});
var styling_panel = ui.Panel([
  styling_panel_title,
  ui.Panel([
    styling_panel_label_1,
    selector_legend_scaling
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    styling_panel_label_2,
    selector_legend_colors
  ], ui.Panel.Layout.flow('horizontal')),
]);
// year selector
var selector_year = ui.Select({
  items: ['2018', '2019', '2020', '2021', '2022'],
  // placeholder: 'Select a value...',
  value: default_year,
  onChange: updateYear,
  // style:
});
var text_year_panel_en = 'Select year for EO datasets:';
var text_year_panel_pt = 'Selecione o ano para conjuntos de dados EO';
var title_year_panel = ui.Label(text_year_panel_en, {fontWeight:'bold'});
// var text_year_label_en = 'This will load Earth Observation (EO) imagery for the selected year, namely Copernicus/ESA Sentinel-2, JRC yearly water classification and intra-annual water occurrence based on the Dynamic World dataset. Datasets shown in this dashboard have been created with imagery from 2022, which is thus shown by default.';
// var text_year_label_pt = "Isso carregará imagens de Observação da Terra (EO) para o ano selecionado, ou seja, Copernicus/ESA Sentinel-2, classificação de água anual do JRC e ocorrência de água intra-anual com base no conjunto de dados do Dynamic World. Os conjuntos de dados mostrados neste painel foram criados com imagens de 2022, que são mostradas por padrão.";
// var label_year_panel = ui.Label(text_year_label_en, {fontSize:fontSize_sub});
var year_panel = ui.Panel([
  title_year_panel,
  // label_year_panel,
  selector_year
]);
// chart(s)
var chart_1 = ui.Panel();
var chart_2 = ui.Panel();
var chart_dam_mssg = ui.Label('', {fontSize:fontSize_sub});
var text_panel_title_en = 'Charts:';
var text_panel_title_pt = 'Gráficas:';
var charts_panel_title = ui.Label(text_panel_title_en, {fontWeight:'bold'});
var charts_panel = ui.Panel([
  charts_panel_title,
  chart_dam_mssg,
  chart_1, chart_2
]);
// GWW UI elements
var GWW_charts = ui.Panel();
GWW_charts.style().set({
  // 'background-color': '#fafafa',
  // position: 'bottom-right',
  // width: '600px',
  // height: '305px',
  // // height: '479px',
  // margin: '0px 0px 50px 0px',
  shown: false
});
var GWW_charts_panel = ui.Panel([GWW_charts]);
var log = new Logger(GWW_charts_panel);
// zoom button
var text_button_zoom_en = 'Back to country overview';
var text_button_zoom_pt = 'Voltar para a visão geral do país';
var button_zoom = ui.Button({
  label: text_button_zoom_en,
  onClick: zoomCountry,
  style: {padding:'0px', margin:'0px'}
});
var title_refs_disc_en = 'References & disclaimer:';
var title_refs_disc_pt = 'Referências & isenção de responsabilidade:';
var title_refs_disc = ui.Label(title_refs_disc_en, {fontWeight:'bold'});
// references
var refs = ui.Panel([
  ui.Panel([
    ui.Label({
      value: "- Landsat:",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "U.S. Geological Survey",
      targetUrl: "https://www.usgs.gov/core-science-systems/nli/landsat",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 3px'}
    })
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
      value: "- Global Water Watch (GWW):",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Donchyts et al. (2022)",
      targetUrl: "https://www.nature.com/articles/s41598-022-17074-6",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "- Dynamic World:",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
    ui.Label({
      value: "Brown et al. (2022)",
      targetUrl: "https://www.nature.com/articles/s41597-022-01307-4",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
  ], ui.Panel.Layout.flow('horizontal')),
  ui.Panel([
    ui.Label({
      value: "Global Water Watch (GWW) is available at",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'3px 0px 0px 8px'}
    }),
    ui.Label({
      value: "https://www.globalwaterwatch.earth/",
      targetUrl: "https://www.globalwaterwatch.earth/",
      style: {fontSize:fontSize_sub, padding:'0px', margin:'0px 0px 0px 8px'}
    }),
  ], ui.Panel.Layout.flow('vertical')),
  ui.Label({
    value: "Dynamic World is produced for the Dynamic World Project by Google in partnership with National Geographic Society and the World Resources Institute.",
    style: {fontSize:fontSize_sub, padding:'0px', margin:'3px 0px 0px 8px'}
  }),
  ui.Label({
    value: "Contains modified Copernicus Sentinel data [2016-2022].",
    style: {fontSize:fontSize_sub, padding:'0px', margin:'3px 0px 0px 8px'}
  }),
  // ui.Label({
  //   value: "Source of Administrative boundaries: The Global Administrative Unit Layers (GAUL) dataset, implemented by FAO within the CountrySTAT and Agricultural Market Information System (AMIS) projects.",
  //   style: {fontSize:fontSize_sub, padding:'0px', margin:'3px 0px 0px 8px'}
  // })
], ui.Panel.Layout.flow('vertical'), {shown:false});
var text_refs_button_en = 'Show/hide references';
var text_refs_button_pt = 'Mostrar/esconder referências';
var refs_button = ui.Button({label:text_refs_button_en, onClick:toggleRefs});
var refs_panel = ui.Panel([
  ui.Panel([
    refs_button
  ], ui.Panel.Layout.flow('horizontal')),
  refs
]);
var disclaimer = ui.Panel({widgets:[
  ui.Label({
    value: "This is a prototype dashboard. It is advised to use this to obtain preliminary insights or first estimations.\
            It should not be the basis of real-world decisions before careful field validations are carried out.",
    style: {fontSize:fontSize_sub, padding:'0px', margin:'3px 0px 8px 8px'}
  }),
  ui.Label({
    value: "Link to official disclaimer",
    targetUrl: "https://www.deltares.nl/en/disclaimer/",
    style: {fontSize:fontSize_sub, padding:'0px', margin:'3px 0px 8px 8px'}
  })
], style:{shown:false}});
var text_disc_button_en = 'Show/hide disclaimer';
var text_disc_button_pt = 'Mostrar/esconder isenção de responsabilidade';
var disc_button = ui.Button({label:text_disc_button_en, onClick:toggleDisclaimer});
var disclaimer_panel = ui.Panel([
  ui.Panel([
    disc_button
  ], ui.Panel.Layout.flow('horizontal')),
  disclaimer
]);
var text_outro_en = "For more information on this application, please contact arjen.haag@deltares.nl";
var text_outro_pt = "Para mais informações sobre este aplicativo, entre em contato arjen.haag@deltares.nl";
var outro = ui.Label({
  value: text_outro_en,
  style: {fontSize:fontSize_sub, padding:'0px', margin:'3px 0px 8px 8px'}
});
// panels combining relevant UI elements for the ui.root
var panels_base = [intro, usecase_panel, title_refs_disc, refs_panel, disclaimer_panel, outro];
var panels_case_water = [intro, usecase_panel, year_panel, charts_panel, title_refs_disc, refs_panel, disclaimer_panel, outro];
var panels_case_dams = [intro, usecase_panel, dams_panel, styling_panel, charts_panel, GWW_charts_panel, title_refs_disc, refs_panel, disclaimer_panel, outro];
var panel = ui.Panel({
  widgets: panels_base,
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-left',
    width: '330px'
  }
});
// add the panel to the ui.root
ui.root.insert(0, panel);
// ---------------------------------------------------------------------------------------------------- //
// Map
// ---------------------------------------------------------------------------------------------------- //
Map.centerObject(country);
// Map.centerObject(artificial_water_bodies);
Map.setOptions('HYBRID');
Map.addLayer(JRC_water.select('occurrence'), visParams_water_occ, 'water occurrence 1984-2021 (JRC)', false);
calcDiffJRC(1995, 2020);
Map.addLayer(GWW_waterbodies, {color:'lightblue'}, 'GWW water bodies', false, 0.7);
Map.addLayer(artificial_water_bodies, {color:'darkblue'}, 'artificial water bodies', true, 0.7);
// Map.addLayer(ee.Image().byte().paint(country,0,2), {}, 'Angola', false);