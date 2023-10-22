// Spectral Point v0.7
// A UI for process Landsat 5, 7, 8 and Sentinel 2 data and to collect
// spectral signatures for multiple point locations
// Copyright (C) 2019 Sam Brooke
// Email: sbrooke@ucsb.edu
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
var version = 0.7;
var app = {};
// Dictionary for storing coordinate data
app.mapObjects = [];
app.timeseries_plot_choices = [];
app.ts_band_choices = false;
app.set_plot_choices = false;
app.get_plot_choices = false;
app.timeSeriesOptionPanel = false;
app.seriesSelect = false;
app.PCA_LAYERS = false;
app.PCA_INPUT_BANDS = [];
app.PCA_BANDS = [];
app.coordData = {};
app.pointerIds = [];
app.pointListenId = false;
app.hex_counter = 0;
app.colorList = {};
app.bandChart = false;
app.pointListening = false;
app.project_variables = {
  title: 'Untitled',
  output_directory: '',
  IMAGE: '',
  region_bounds: []
};
app.setProjectTitle = function() {
  var title = app.project_name_input.getValue();
  title = title.replace(/ /g, "_").replace(/[|&;$%@"<>()+,]/g, "");
  app.project_variables.title = title;
  app.project_name_input.setValue(title, false);
};
app.clearLayerAssets = function(names) {
  var clearMap = function(e,i){
    if(names.indexOf(e.get('name')) > -1){
      Map.remove(e);
    }
  };
  // Run twice because some units are weirdly missing
  for(var i = 0; i < 2; i++){
    Map.layers().forEach(clearMap);
  }
};
app.selectRegion = function() {
    Map.style().set('cursor', 'crosshair');
    app.mapAssets = [];
    app.clearLayerAssets(['regionRectangle','regionBottomRight','regionTopLeft']);
    var createBtns = true;
    if(app.AOI){
      createBtns = false;
    }
    var listenerId = Map.onClick(function(coords) {
      var point = ee.Geometry.Point(coords.lon, coords.lat);
      // Once the panel is hidden, the map should not
      // try to close it by listening for clicks.
      app.mapAssets.push(point);
      if(app.mapAssets.length > 1){
        var p1 = app.mapAssets[0];
        var p2 = app.mapAssets[1];
        var point1_x = ee.Number(p1.coordinates().get(0));
        var point2_x = ee.Number(p2.coordinates().get(0)); 
        var point1_y = ee.Number(p1.coordinates().get(1));
        var point2_y = ee.Number(p2.coordinates().get(1));
        if(point1_x < point2_x){
          var yMax = point2_y;
          var yMin = point1_y;
          var xMax = point2_x;
          var xMin = point1_x;
        } else {
          var yMax = point1_y;
          var yMin = point2_y;
          var xMax = point1_x;
          var xMin = point2_x;         
        }
        Map.addLayer(point, {color: 'FF0000'}, 'regionBottomRight');
        var region_bounds = [xMax, yMin, xMin, yMax];
        app.project_variables.region_bounds = region_bounds;
        app.AOI = ee.Geometry.Rectangle(region_bounds);
        var AOI_coords = app.AOI.coordinates().get(0);
        app.AOI_outline = ee.Geometry.LineString(AOI_coords);
        Map.addLayer(app.AOI, {color: 'FF0000'}, 'regionRectangle');
        Map.unlisten(listenerId);
        app.top_left_lat.setValue(yMax.getInfo(), false);
        app.bottom_right_lat.setValue(yMin.getInfo(), false);
        app.top_left_lon.setValue(xMax.getInfo(), false);
        app.bottom_right_lon.setValue(xMin.getInfo(), false);
        if(createBtns){
          app.continueToBCETBtn();
        }
      } else {
        Map.addLayer(point, {color: 'FF0000'}, 'regionTopLeft');
      }
    });
};
app.continueToBCETBtn = function(){
  var btbclabel = ui.Label({
    value: 'Next',
    style: {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px'}
  });
  var btbcbtn = ui.Button({
    label: 'Continue to contrast enhancement',
    onClick: function(){
      print('Continuing to BCET contrast enhancement');
      app.BCET_Region_init();
    },
    style: {
      stretch:'horizontal'
    }
  });
  app.regionSelect.panel.add(btbclabel);
  app.regionSelect.panel.add(btbcbtn);
};
app.setRegion = function() {
  app.clearLayerAssets(['regionRectangle','regionBottomRight','regionTopLeft']);
  var createBtns = true;
  if(app.AOI){
    createBtns = false;
  }
  if(app.top_left_lat.getValue()){
    var yMax = app.top_left_lat.getValue();
    var yMin = app.bottom_right_lat.getValue();
    var xMin = app.top_left_lon.getValue();
    var xMax = app.bottom_right_lon.getValue();
    if(yMax && yMin && xMax && xMin){
      var region_bounds = ee.List([xMin, yMin, xMax, yMax]);
      app.project_variables.region_bounds = region_bounds;
      app.AOI = ee.Geometry.Rectangle(region_bounds);
      var AOI_coords = app.AOI.coordinates().get(0);
      app.AOI_outline = ee.Geometry.LineString(AOI_coords);
      Map.addLayer(app.AOI, {color: 'FF0000'}, 'regionRectangle');
      var tl = ee.Geometry.Point(ee.List([xMin, yMax]));
      var br = ee.Geometry.Point(ee.List([xMax, yMin]));
      Map.addLayer(tl, {color: 'FF0000'}, 'regionTopLeft');
      Map.addLayer(br, {color: 'FF0000'}, 'regionBottomRight');
      app.centerRegion();
      if(createBtns){
        app.continueToBCETBtn();
      }
    }
  }
};
app.centerRegion = function(){
  if (app.AOI){
    Map.centerObject(app.AOI);
  }
};
app.setImage = function() {
  var imageIdTrailer = app.picker.select.getValue();
  app.project_variables.IMAGE = app.COLLECTION_ID + '/' + imageIdTrailer;
  app.date_chooser.panel.style().set('shown', false);
  app.year_picker.panel.style().set('shown', false);
  app.filters.panel.style().set('shown', false);
  app.picker.panel.style().set('shown', false);
  app.vis.panel.style().set('shown', false);
  app.regionSelect.panel.style().set('shown', true);
};
app.BCET_Region_init = function(){
  app.BCET.panel.style().set('shown', true);
  app.regionSelect.panel.style().set('shown', false);
};
app.createInputs = function(){
  app.project_name_input = ui.Textbox({
    placeholder: 'Project Name',
    onChange: app.setProjectTitle,
    style: {
      stretch: 'horizontal'
    }
  });
  app.top_left_lat = ui.Textbox({
    placeholder: 'Lat',
    style: {
      width: '50px'
    }
  });
  app.top_left_lon = ui.Textbox({
    placeholder: 'Lon',
    style: {
      width: '50px'
    }
  });
  app.bottom_right_lat = ui.Textbox({
    placeholder: 'Lat',
    style: {
      width: '50px'
    }
  });
  app.bottom_right_lon = ui.Textbox({
    placeholder: 'Lon',
    style: {
      width: '50px'
    }
  });
  app.position_panel = ui.Panel([
    ui.Label({
      value: 'Top Left:',
      style: {fontWeight: 'bold', fontSize: '10px'}
    }),
    app.top_left_lat,
    app.top_left_lon,
    ui.Label({
      value: 'Bot Right:',
      style: {fontWeight: 'bold', fontSize: '10px'}
    }),
    app.bottom_right_lat,
    app.bottom_right_lon
  ], ui.Panel.Layout.flow('horizontal'));
  app.position_inputs = {
    panel: app.position_panel
  };
};
app.todaysDate = function(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10){
    dd='0'+dd;
  }
  if(mm<10){
    mm='0'+mm;
  }
  app.today = [yyyy,mm,dd].join('-');
};
app.todaysDate(); // Set today's date
var guid = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4();
};
app.pointMapListen = function(){
  if(!app.pointListening){
    app.pointListening = true;
    if(!app.pointerIds){
     var r = confirm("Do you want to clear the map?");
      if (r == 1) {
        app.clearLayerAssets(app.pointerIds);
        app.pointerIds = [];
        app.coordData = {};
      }
    }
    Map.style().set('cursor', 'crosshair');
    app.pointListenId = Map.onClick(function(coords) {
      app.createPoint(ee.Dictionary(coords), false);
    });
  }
};
app.pointMapUnlisten = function(){
  if(app.pointListening){
    app.pointListening = false;
    if(app.pointListenId){
      Map.unlisten(app.pointListenId);
      app.pointListenId = false;
      Map.style().set('cursor', 'hand');
    }
  }
};
app.removePointMarker = function(marker_id){
  app.clearLayerAssets([marker_id]);
  var index = app.pointerIds.indexOf(marker_id);
  if (index > -1) {
    app.pointerIds.splice(index, 1);
  }
  delete app.coordData[marker_id];
  delete app.colorList[marker_id];
  app.setBandChart(app.pointerIds);
};
app.centreMarker = function(marker_id){
  var coords = app.coordData[marker_id];
  Map.setCenter(coords.get('lon').getInfo(), coords.get('lat').getInfo(), 12);
};
app.updateVisibleBands = function(){
  app.CHART_BANDS = [];
  if(app.BCETskipped){
    var current_bands = app.spectralBands(app.CURRENT_IMAGE.bandNames()).getInfo();
    for (var i = 0; i < current_bands.length; i++) {
      var input_name = current_bands[i]+'_visible';
      if (app[input_name].getValue()){
        app.CHART_BANDS.push(current_bands[i]);
      }
    }
  } else {
    for (var i = 0; i < app.BCET_BANDS.length; i++) {
      var input_name = app.BCET_BANDS[i]+'_visible';
      if (app[input_name].getValue()){
        app.CHART_BANDS.push(app.BCET_BANDS[i]);
      }
    }
    for (var i = 0; i < app.PCA_BANDS.length; i++) {
      var input_name = app.PCA_BANDS[i]+'_visible';
      if (app[input_name].getValue()){
        app.CHART_BANDS.push(app.PCA_BANDS[i]);
      }
    }
  }
  app.setBandChart(app.pointerIds);
};
app.visibleBandSelect = function(){
  if(app.BCETskipped){
    var multispectral = app.spectralBands(app.CURRENT_IMAGE.bandNames()).getInfo();
  } else {
    var multispectral = app.BCET_BANDS;
  }
  for (var i = 0; i < multispectral.length; i++) {
    var input_name = multispectral[i]+'_visible';
    app[input_name] = ui.Checkbox({
      label: multispectral[i],
      value: true,
      onChange: app.updateVisibleBands
    });
    app.chartBandSelect_left.add(app[input_name]);
  }
  for (var i = 0; i < app.PCA_BANDS.length; i++){
    var input_name = app.PCA_BANDS[i]+'_visible';
    app[input_name] = ui.Checkbox({
      label: app.PCA_BANDS[i],
      value: true,
      onChange: app.updateVisibleBands
    });
    app.chartBandSelect_right.add(app[input_name]);  
  }
  app.setBandChart(app.pointerIds);
  app.showHideChartBandBtn = ui.Button({
    label: 'Hide',
    onClick: function(){
      for (var i = 0; i < multispectral.length; i++) {
        var input_name = multispectral[i]+'_visible';
        if (app[input_name].style().get('shown')){
          if(i === 0){
            app.showHideChartBandBtn.set('label', 'Show');
          }
          app[input_name].style().set('shown', false);
        } else {
          if(i === 0){
            app.showHideChartBandBtn.set('label', 'Hide');
          }
          app[input_name].style().set('shown', true);
        }
      }
      for (var i = 0; i < app.PCA_BANDS.length; i++) {
        var input_name = app.PCA_BANDS[i]+'_visible';
        if (app[input_name].style().get('shown')){
          if(i === 0){
            app.showHideChartBandBtn.set('label', 'Show');
          }
          app[input_name].style().set('shown', false);
        } else {
          if(i === 0){
            app.showHideChartBandBtn.set('label', 'Hide');
          }
          app[input_name].style().set('shown', true);
        }
      }
    },
    style: {
      stretch:'horizontal',
      fontSize: '18px'
    }
  });
  app.chartBandSelect.panel.add(app.showHideChartBandBtn);
};
app.setBandChart = function(marker_ids){
  if(app.CHART_BANDS && (marker_ids.length > 0)){
    var points = [];
    var plot_series = {};
    for (var i = 0; i < marker_ids.length; i++) {
      var coords = app.coordData[marker_ids[i]];
      var point = ee.Feature(ee.Geometry.Point(ee.List([coords.get('lon'), coords.get('lat')])), {label: marker_ids[i]});
      points.push(point);
      plot_series[i] = {color: app.colorList[marker_ids[i]]};
    }
    var bandPoints = ee.FeatureCollection(points);
    if (app.bandChart){
      app.coordMasterPanel.remove(app.bandChart);
    }
    var imageBands = app.CURRENT_IMAGE.select(app.CHART_BANDS);
    app.bandChart = ui.Chart.image.regions({
      image: imageBands,
      regions: bandPoints,
      seriesProperty: 'label',
      scale: 30
    });
    app.bandChart.setChartType('LineChart');
    if(app.BCETskipped){
      var chartTitle = 'Pixel Values';
      var chartY = 'DN';
    } else {
      var chartTitle = 'Pixel Values';
      var chartY = 'DN_BCET';
    }
    app.bandChart.setOptions({
      title: chartTitle,
      hAxis: {
        title: 'Band'
      },
      vAxis: {
        title: chartY
      },
      lineWidth: 1,
      pointSize: 4,
      series: plot_series
    });
    app.coordMasterPanel.add(app.bandChart);
  }
};
app.coordPanel = function(lat, lon, marker_id){
  var cp = ui.Panel([
    ui.Label({
      value: 'Id: '+marker_id.toString(),
      style: {padding: '0 10px 0 0', fontSize: '12px', backgroundColor: app.colorList[marker_id]}
    }),
    ui.Label({
      value: 'Lat: '+lat.getInfo().toFixed(5).toString(),
      style: {padding: '0 10px 0 0', fontSize: '12px'}
    }),
    ui.Label({
      value: 'Lon: '+lon.getInfo().toFixed(5).toString(),
      style: {padding: '0 10px 0 0', fontSize: '12px'}
    })
  ], ui.Panel.Layout.flow('horizontal'));
  var center_btn = ui.Button({
    label: '☩',
    onClick: function(){
      app.centreMarker(marker_id);
    },
    style: {
      fontSize: '16px'
    }
  });
 var time_series_btn = ui.Button({
    label: 'Time series',
    onClick: function(){
      var coords = app.coordData[marker_id];
      app.current_ts_point =  ee.Feature(ee.Geometry.Point(ee.List([coords.get('lon'), coords.get('lat')])));
      app.update_timeseries('L8');
    },
    style: {
      fontSize: '12px'
    }
  });
  var rmv_btn = ui.Button({
    label: 'X',
    onClick: function(){
      app.removePointMarker(marker_id);
      app.coordMasterPanel.remove(cp);
    },
    style: {
      fontSize: '16px'
    }
  });
  cp.add(center_btn);
  cp.add(time_series_btn);
  cp.add(rmv_btn);time_series_btn
  return cp;
};
app.createPoint = function(coords, sample_name_original){
    var gid = guid();
    var coord_id = '';
    if(sample_name_original){
      var sample_name = ee.String(sample_name_original).replace(ee.String('/ /g'), ee.String("_")).replace(ee.String('/[|&;$%@"<>()+,]/g'), ee.String('')).getInfo();
      if (app.pointerIds.indexOf(sample_name) < 0){
        coord_id = sample_name;
      } else {
        coord_id = [coord_id, gid].join('_');
      }
    } else {
      coord_id = gid;
    }
    var point = ee.Geometry.Point(ee.List([coords.get('lon'), coords.get('lat')]));
    app.pointerIds.push(coord_id);
    app.coordData[coord_id] = coords;
    app.colorList[coord_id] = app.HEX_CODES[app.hex_counter];
    app.coordMasterPanel.add(app.coordPanel(coords.get('lat'), coords.get('lon'), coord_id));
    Map.addLayer(point, {color: app.HEX_CODES[app.hex_counter]}, coord_id);
    if (app.hex_counter < (app.HEX_CODES.length)-1) {
      app.hex_counter++;
    } else {
      app.hex_counter = 0;
    }
    app.setBandChart(app.pointerIds);
};
app.addManualCoord = function(){
  var gid = guid();
  var coords = ee.Dictionary({
    lon: ee.Number.parse(app.lon_input.getValue()),
    lat: ee.Number.parse(app.lat_input.getValue())
  });
  var sample_name = app.sample_input.getValue();
  app.createPoint(coords, sample_name);
};
app.exportCoords = function(){
  var points = [];
  if (app.pointerIds){
    for (var i = 0; i < app.pointerIds.length; i++) {
      var coords = app.coordData[app.pointerIds[i]];
      var point = ee.Feature(ee.Geometry.Point(ee.List([coords.get('lon'), coords.get('lat')])), {label: app.pointerIds[i], image: app.CURRENT_IMAGE.id()});
      points.push(point);
    }
    var bandPoints = ee.FeatureCollection(points);
    var fid = guid();
    var fileName = [fid,app.project_variables.title].join('_');
    var ft = ee.FeatureCollection(ee.List([]));
    var fill = function(img, ini) {
      // type cast
      var inift = ee.FeatureCollection(ini);
      // gets the values for the points in the current img
      var ft2 = img.reduceRegions({
        collection:bandPoints,
        reducer:ee.Reducer.first(),
        crs: 'EPSG:4326',
        crsTransform: [0.00025,0,0,0,-0.00025,0]
      });
      return inift.merge(ft2);
    };
    var res = fill(app.CURRENT_IMAGE.select(app.CHART_BANDS), ft);
    Export.table.toDrive({
      collection: res,
      description: [fid,'Coordinates',app.project_variables.title].join('_'),
      fileNamePrefix: fileName,
      fileFormat: 'SHP'
    });
  }
};
app.exportFusionTable = function(){
  var fusion_id = app.fusion_table_id.getValue();
  var points = [];
  if(fusion_id){
    var fid_protocol = ee.String('ft:').cat(fusion_id).getInfo();
    var fusion_data = ee.FeatureCollection(fid_protocol);
    var names = ee.List(fusion_data.aggregate_array('name'));
    var surfaces = ee.List(fusion_data.aggregate_array('surface'));
    var cc = fusion_data.geometry().coordinates();
    var getLatLon = function(n){
      var latlon = ee.List(cc.get(n));
      var name = names.get(n);
      var sface = surfaces.get(n);
      return ee.Feature(ee.Geometry.Point(latlon), {label: name, surface:sface});
    };
    var seq = ee.List.sequence(0, cc.length().subtract(1));
    points = seq.map(getLatLon);
    var bandPoints = ee.FeatureCollection(points);
    var ft = ee.FeatureCollection(ee.List([]));
    var fill = function(img, ini) {
      // type cast
      var inift = ee.FeatureCollection(ini);
      // gets the values for the points in the current img
      var ft2 = img.reduceRegions({
        collection:bandPoints,
        reducer:ee.Reducer.first(),
        crs: 'EPSG:4326',
        crsTransform: [0.00025,0,0,0,-0.00025,0]
      });
      return inift.merge(ft2);
    };
    var fid = guid();
    var fileName = [fid,app.project_variables.title].join('_');
    var res = fill(app.CURRENT_IMAGE.select(app.CHART_BANDS), ft);
    var desc = [fid,'Reflectance',app.project_variables.title].join('_');
    ('Exporting point values to task');
    Export.table.toDrive({
      collection:res,
      description: desc,
      fileNamePrefix: fileName,
      fileFormat: 'CSV'
    });
  }
};
app.stackCollection = function(collection, names) {
    // Create an initial image.
    var first = ee.Image(collection.first()).select([]);
    // Write a function that appends a band to an image.
    var appendBands = function(image, previous) {
      return ee.Image(previous).addBands(image);
    };
    var appended = ee.Image(collection.iterate(appendBands, first));
    return appended.rename(names);
};
app.BCETRegion = function(skip){
  if(skip){
    app.PCAInputs(false);
    app.BCET.panel.style().set('shown', false);
    app.PCABandSelect.panel.style().set('shown', true);
    app.PCA_Map_Layer.panel.style().set('shown', true);
    app.continueToPoint.panel.style().set('shown', true);
    app.BCETskipped = skip;
    app.clearLayerAssets(['regionRectangle','regionBottomRight','regionTopLeft']);
    if(app.AOI){
      Map.addLayer(app.AOI_outline, {color: 'FFFFFF'}, 'AOI_outline');
    } 
  } else {
    app.regionSelect.panel.style().set('shown', false);
    app.BCETBandSelect.panel.style().set('shown', true);
    app.BCETskipped = skip;
    var collection_params = app.COLLECTION_ID.split('/');
    if(collection_params[0] == 'LANDSAT'){
      if((collection_params[1] == 'LC08')||
        (collection_params[1] == 'LC8_L1T_8DAY_TOA')||
        (collection_params[1] == 'LC8_L1T_32DAY_TOA')){
        var bandNames = ee.List(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'B11']);
        var allBands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11'];
        var vis_bands = ['B4', 'B3', 'B2'];
        var bcet_vis_bands = ['B4_BCET', 'B3_BCET', 'B2_BCET'];
      } else if (collection_params[1] == 'LE07'){
        if(app.CURRENT_IMAGE.bandNames().contains('B6_VCID_1').getInfo()){
          var bandNames = ee.List(['B1', 'B2', 'B3', 'B4', 'B5', 'B6_VCID_1', 'B6_VCID_2', 'B7', 'B8']);
          var allBands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6_VCID_1', 'B6_VCID_2', 'B7', 'B8'];
        } else {
          var bandNames = ee.List(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7']);
          var allBands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'];       
        }
        var vis_bands = ['B3', 'B2', 'B1'];
        var bcet_vis_bands = ['B3_BCET', 'B2_BCET', 'B1_BCET'];
      } else if (collection_params[1] == 'LT05'){
        var bandNames = ee.List(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7']);
        var allBands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
        var vis_bands = ['B3', 'B2', 'B1'];
        var bcet_vis_bands = ['B3_BCET', 'B2_BCET', 'B1_BCET'];
      }
    } else {
      // SENTINEL BANDS
      var bandNames = ee.List(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7',
      'B8', 'B8A', 'B9', 'B10', 'B11', 'B12']);
      var allBands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7',
      'B8', 'B8A', 'B9', 'B10', 'B11', 'B12'];
      var vis_bands = ['B4', 'B3', 'B2'];
      var bcet_vis_bands = ['B4_BCET', 'B3_BCET', 'B2_BCET'];
    }
    var box = app.AOI;
    if(box){
      var reducers = ee.Reducer.mean().combine({
        reducer2: ee.Reducer.minMax(),
        sharedInputs: true
      });
      var stats = app.CURRENT_IMAGE.reduceRegion({
        reducer: reducers,
        geometry: box,
        crs: 'EPSG:4326',
        crsTransform: [0.00025,0,0,0,-0.00025,0],
        bestEffort:true
      });
      var pow2 = app.CURRENT_IMAGE.pow(2);
      var s_values = pow2.reduceRegion({
        reducer: ee.Reducer.mean(),
        geometry: box,
        crs: 'EPSG:4326',
        crsTransform: [0.00025,0,0,0,-0.00025,0],
        bestEffort:true
      });
    } else {
      var reducers = ee.Reducer.mean().combine({
        reducer2: ee.Reducer.minMax(),
        sharedInputs: true
      });
      var stats = app.CURRENT_IMAGE.reduceRegion({
        reducer: reducers,
        crs: 'EPSG:4326',
        crsTransform: [0.00025,0,0,0,-0.00025,0],
        bestEffort:true
      });
      var pow2 = app.CURRENT_IMAGE.pow(2);
      var s_values = pow2.reduceRegion({
        reducer: ee.Reducer.mean(),
        crs: 'EPSG:4326',
        crsTransform: [0.00025,0,0,0,-0.00025,0],
        bestEffort:true
      });
    }
    // BCET values
    var L =  ee.Number(0); // minimum
    var H =  ee.Number(255); // maximum
    var E =  ee.Number(110); // mean
    var len = ee.Number(bandNames.length());
    var seq = ee.List.sequence(ee.Number(0), len.subtract(1));
    var processBCETBands = function(i){
      var band_name = ee.String(bandNames.get(i));
      var band = app.CURRENT_IMAGE.select(band_name);
      var l = ee.Number(stats.get(band_name.cat('_min')));
      var h = ee.Number(stats.get(band_name.cat('_max')));
      var e = ee.Number(stats.get(band_name.cat('_mean')));
      var s = ee.Number(s_values.get(band_name));
      var b_nom = h.pow(2).multiply(E.subtract(L)).subtract(s.multiply(H.subtract(L))).add(l.pow(2).multiply(H.subtract(E)));
      var b_den = ee.Number(2).multiply(h.multiply(E.subtract(L)).subtract(e.multiply(H.subtract(L))).add(l.multiply(H.subtract(E))));
      var b = b_nom.divide(b_den);
      var a1 = H.subtract(L);
      var a2 = h.subtract(l);
      var a3 = h.add(l).subtract(ee.Number(2).multiply(b));
      var a = a1.divide(a2.multiply(a3));
      var c = L.subtract(a.multiply(l.subtract(b).pow(2)));
      var y = app.CURRENT_IMAGE.expression(
        'a * (x - b)**2 + c', {
        'a': a,
        'b': b,
        'c': c,
        'x': app.CURRENT_IMAGE.select(band_name)
      });
      var y_r = y.select(
          ['constant',], // old names
          [band_name.cat(ee.String('_BCET'))] // new names
      );
      return y_r;
    };
    var BCETBandNames = function(n){
      var band_name = ee.String(bandNames.get(n));
      return band_name.cat('_BCET');
    };
    var BCET_COLLECTION = ee.ImageCollection(seq.map(processBCETBands));
    app.BCET_BANDS = ee.List(seq.map(BCETBandNames)).getInfo();
    var BCET_IMAGE = app.stackCollection(BCET_COLLECTION, app.BCET_BANDS);
    app.CURRENT_IMAGE = app.CURRENT_IMAGE.addBands(BCET_IMAGE);
    var mean_check = app.CURRENT_IMAGE.select(app.BCET_BANDS).reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: box,
      crs: 'EPSG:4326',
      crsTransform: [0.00025,0,0,0,-0.00025,0],
      bestEffort:true
    });
    Map.clear();
    Map.setOptions('HYBRID');
    app.VIS_OPTIONS = app.vis_params();
    Map.addLayer(app.CURRENT_IMAGE, app.VIS_OPTIONS, 'All Bands', false);
    var s = app.stretch_std(BCET_IMAGE, 2);
    if(collection_params[0] == 'LANDSAT'){
      if((collection_params[1] == 'LC08')||
        (collection_params[1] == 'LC8_L1T_8DAY_TOA')||
        (collection_params[1] == 'LC8_L1T_32DAY_TOA')){
        var min_nat = ee.Number(ee.List([s.vmin.B4_BCET, s.vmin.B3_BCET, s.vmin.B2_BCET]).reduce(ee.Reducer.mean()));
        var max_nat = ee.Number(ee.List([s.vmax.B4_BCET, s.vmax.B3_BCET, s.vmax.B2_BCET]).reduce(ee.Reducer.mean()));
        app.BCETvisParams = {gamma: [1, 1, 1], min: min_nat.getInfo(), max: max_nat.getInfo(), bands: ['B4_BCET', 'B3_BCET', 'B2_BCET']};
      } else if ((collection_params[1] == 'LE07')||(collection_params[1] == 'LT05')){
        var min_nat = ee.Number(ee.List([s.vmin.B3_BCET, s.vmin.B2_BCET, s.vmin.B1_BCET]).reduce(ee.Reducer.mean()));
        var max_nat = ee.Number(ee.List([s.vmax.B3_BCET, s.vmax.B2_BCET, s.vmax.B1_BCET]).reduce(ee.Reducer.mean()));
        app.BCETvisParams = {gamma: [1, 1, 1], min: min_nat.getInfo(), max: max_nat.getInfo(), bands: ['B3_BCET', 'B2_BCET', 'B1_BCET']};
      }
    } else {
      var min_nat = ee.Number(ee.List([s.vmin.B4_BCET, s.vmin.B3_BCET, s.vmin.B2_BCET]).reduce(ee.Reducer.mean()));
      var max_nat = ee.Number(ee.List([s.vmax.B4_BCET, s.vmax.B3_BCET, s.vmax.B2_BCET]).reduce(ee.Reducer.mean()));
      app.BCETvisParams = {gamma: [1, 1, 1], min: min_nat.getInfo(), max: max_nat.getInfo(), bands: ['B4_BCET', 'B3_BCET', 'B2_BCET']};
    }
    Map.addLayer(BCET_IMAGE, app.BCETvisParams,  'BCET Bands', true);
    if(box){
      Map.addLayer(app.AOI_outline, {color: 'FFFFFF'}, 'AOI_outline');
    }
    app.centerRegion();
    app.BCETBandSelect.panel.clear();
    app.PCAInputs(true);
    app.BCET.panel.style().set('shown', false);
    app.PCABandSelect.panel.style().set('shown', true);
    app.PCA_Map_Layer.panel.style().set('shown', true);
    app.continueToPoint.panel.style().set('shown', true);
  }
};
app.convertToUint8 = function(img, bandNames){
  // var band = img.bandTypes().keys().get(0)
  // var btypes = img.bandTypes().select([band])
  // var listT = btypes.get(band).getInfo()
  if(app.CURRENT_IMAGE_MOSAIC){
    var max = img.reduceRegion({
      reducer: ee.Reducer.max(),
      crs: 'EPSG:4326',
      geometry: app.CURRENT_IMAGE_FOOTPRINT,
      crsTransform: [0.00025,0,0,0,-0.00025,0],
      bestEffort: true
    });
  } else {
    var max = img.reduceRegion({
      reducer: ee.Reducer.max(),
      geometry: app.CURRENT_IMAGE_FOOTPRINT,
      bestEffort: true
    });
  }
  var max_img = ee.Image.constant(max.values(bandNames));
  var img255 = ee.Image.constant(255);
  var img_div = img.select(bandNames).divide(max_img)
  var img_8bit = img_div.multiply(img255).toUint8()
  return img_8bit
};
app.showPCALayer = function(){
  var band = app.PCA_Layer_Select.getValue();
  Map.addLayer(app.pcImage.select([band]), {min: -2, max: 2}, band);
};
app.PCA_Processing = function(){
  app.pcImage = app.getPrincipalComponents();
  var pcBands = app.pcImage.select(app.PCA_BANDS);
  app.CURRENT_IMAGE = app.CURRENT_IMAGE.addBands(pcBands);
  print('... pca processed ...');
  Map.addLayer(pcBands, {}, 'PCA Bands');
  app.PCA_Layer_Select = ui.Select({
    items: app.PCA_BANDS,
    value: 'PC_1',
    placeholder: 'Layer Name',
    onChange: function(){
      app.showPCALayer();
    }
  });
  app.PCA_add_btn = ui.Button({
    label: 'Add PCA layer',
    onClick: function(){
      app.showPCALayer();
    },
    style: {
      stretch:'horizontal',
      fontSize: '18px'
    }
  });
  app.PCA_Map_Layer.panel.add(app.PCA_Layer_Select);
  app.PCA_Map_Layer.panel.add(app.PCA_add_btn);
  app.PCABandSelect.panel.style().set('shown', false);
};
app.getPrincipalComponents = function() {
  // Lifted from the GEE example!
  // https://developers.google.com/earth-engine/arrays_eigen_analysis
  // Collapse the bands of the image into a 1D array per pixel.
  print('Generating Principle Components...');
  var pca_target = app.CURRENT_IMAGE.select(app.PCA_INPUT_BANDS);
  var bandNames = pca_target.bandNames();
  var getNewBandNames = function(prefix) {
    var seq = ee.List.sequence(1, bandNames.length());
    return seq.map(function(b) {
      return ee.String(prefix).cat(ee.Number(b).int());
    });
  };
  if(app.AOI){
    var meanDict = pca_target.reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: app.AOI,
      crs: 'EPSG:4326',
      crsTransform: [0.00025,0,0,0,-0.00025,0],
      bestEffort:true
    });
    var means = ee.Image.constant(meanDict.values(bandNames));
    var centred = pca_target.subtract(means);
    var arrays = centred.toArray();
    // Compute the covariance of the bands within the region.
    var covar = arrays.reduceRegion({
      reducer: ee.Reducer.centeredCovariance(),
      geometry: app.AOI,
      crs: 'EPSG:4326',
      crsTransform: [0.00025,0,0,0,-0.00025,0],
      bestEffort:true
    });
  } else {
    var meanDict = pca_target.reduceRegion({
      reducer: ee.Reducer.mean(),
      crs: 'EPSG:4326',
      crsTransform: [0.00025,0,0,0,-0.00025,0],
      bestEffort:true
    });
    var means = ee.Image.constant(meanDict.values(bandNames));
    var centred = pca_target.subtract(means);
    var arrays = centred.toArray();
    // Compute the covariance of the bands within the region.
    var covar = arrays.reduceRegion({
      reducer: ee.Reducer.centeredCovariance(),
      crs: 'EPSG:4326',
      crsTransform: [0.00025,0,0,0,-0.00025,0],
      bestEffort:true
    });
  }
  // Get the 'array' covariance result and cast to an array.
  // This represents the band-to-band covariance within the region.
  var covarArray = ee.Array(covar.get('array'));
  // Perform an eigen analysis and slice apart the values and vectors.
  var eigens = covarArray.eigen();
  // This is a P-length vector of Eigenvalues.
  var eigenValues = eigens.slice(1, 0, 1);
  // This is a PxP matrix with eigenvectors in rows.
  var eigenVectors = eigens.slice(1, 1);
  // Convert the array image to 2D arrays for matrix computations.
  var arrayImage = arrays.toArray(1);
  // Turn the square roots of the Eigenvalues into a P-band image.
  var sdImage = ee.Image(eigenValues.sqrt())
    .arrayProject([0]).arrayFlatten([getNewBandNames('sd')]);
  app.PCA_BANDS = getNewBandNames('PC_').getInfo();
  print('... complete ...');
  // Left multiply the image array by the matrix of eigenvectors.
  var principalComponents = ee.Image(eigenVectors)
    .matrixMultiply(arrayImage)
    .arrayProject([0])
    // Make the one band array image a multi-band image, [] -> image.
    .arrayFlatten([getNewBandNames('PC_')])
    // Normalize the PCs by their SDs.
    .divide(sdImage);
  return principalComponents;
};
app.spectralBands = function(bandNames){
  // Needs app.COLLECTION_ID to be set
  var collection_params = app.COLLECTION_ID.split('/');
  if(collection_params[0] == 'LANDSAT'){
    if((collection_params[1] == 'LC08')||
      (collection_params[1] == 'LC8_L1T_8DAY_TOA')||
      (collection_params[1] == 'LC8_L1T_32DAY_TOA')){
      var bands = ee.List(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'B11']);
    } else if (collection_params[1] == 'LE07'){
      if(bandNames.contains('B6_VCID_1').getInfo()){
        var bands = ee.List(['B1', 'B2', 'B3', 'B4', 'B5', 'B6_VCID_1', 'B6_VCID_2', 'B7', 'B8']);
      } else {
        var bands = ee.List(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7']);
      }
    } else if (collection_params[1] == 'LT05'){
      var bands = ee.List(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7']);
    }
  } else {
    // SENTINEL BANDS
    var bands = ee.List(['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7',
    'B8', 'B8A', 'B9', 'B10', 'B11', 'B12']);
  };
  return bands
};
app.refreshBCETLayer = function(){
  // DEFAULT = ['B5_BCET', 'B4_BCET', 'B3_BCET']
  var R = app.BCET_R.getValue();
  var G = app.BCET_G.getValue();
  var B = app.BCET_B.getValue();
  if(app.BCETskipped){
    app.BCETvisParams = {
      bands: [R, G, B]
    };
  } else {
    app.BCETvisParams = {
      bands: [R, G, B],
      min: 0,
      max: 255,
      gamma: [0.95, 1.1, 1]
    };
  }
  Map.clear();
  Map.setOptions('HYBRID');
  Map.addLayer(app.CURRENT_IMAGE, app.BCETvisParams);
  if(app.AOI_outline){
    Map.addLayer(app.AOI_outline, {color: 'FFFFFF'}, 'AOI_outline');
  }
};
app.pointSetup = function(){
  app.BCET.panel.style().set('shown', false);
  app.BCETBandSelect.panel.style().set('shown', false);
  app.PCABandSelect.panel.style().set('shown', false);
  app.PCA_Map_Layer.panel.style().set('shown', false);
  app.continueToPoint.panel.style().set('shown', false);
  app.visibleBandSelect();
  app.chartBandSelect.panel.style().set('shown', true);
  app.pointSelect.panel.style().set('shown', true);
  app.export.panel.style().set('shown', true);
  if(app.BCETskipped){
    app.CHART_BANDS = app.CURRENT_IMAGE.bandNames();
  } else {
    app.CHART_BANDS = app.BCET_BANDS.concat(app.PCA_BANDS);
  }
  if(!app.CURRENT_IMAGE_TOA){
    app.create_histogram();
  }
  app.ExportBandSelectInputs();
};
app.update_histogram = function(){
  var ps1 = app.plot_1_select.getValue();
  var ps2 = app.plot_2_select.getValue();
  var ps3 = app.plot_3_select.getValue();
  print(app.CHART_BANDS)
  var defaults = app.CHART_BANDS.slice(1, 4);
  print(defaults)
  if(ps1 == null){
    var ps1 = defaults[0];
  }
  if(ps2 == null){
    var ps2 = defaults[1];
  }
  if(ps3 == null){
    var ps3 = defaults[2];
  }
  app.histogram_bands = [ps1, ps2, ps3];
  app.hist_image = app.CURRENT_IMAGE.setDefaultProjection('EPSG:4326', [0.00025,0,0,0,-0.00025,0]).reduceResolution({
    reducer: ee.Reducer.mean(),
    bestEffort: true,
    maxPixels: 65536
  });
  app.hist_image = app.hist_image.select(ee.List(app.histogram_bands).distinct());
  app.histogram = ui.Chart.image.histogram(app.hist_image, app.AOI, 100, 50)
      .setOptions(app.hist_options);
  app.hist_panel.widgets().reset();
  app.hist_panel.add(app.hist_panel_buttons);
  app.hist_panel.add(app.histogram);
};
app.create_histogram = function(){
  var chart_bands = app.CHART_BANDS;
  app.histogram_bands = chart_bands.slice(1, 4);
  app.hist_image = app.CURRENT_IMAGE.setDefaultProjection('EPSG:4326', [0.00025,0,0,0,-0.00025,0]).reduceResolution({
    reducer: ee.Reducer.mean(),
    bestEffort: true,
    maxPixels: 65536
  });
  app.hist_options = {
    fontSize: 12,
    hAxis: {title: 'DN'},
    vAxis: {title: 'count of DN'},
    series: {
      0: {color: 'red'},
      1: {color: 'green'},
      2: {color: 'blue'}
    }
  };
  app.histogram = ui.Chart.image.histogram(app.hist_image.select(app.histogram_bands), app.AOI, 100, 50)
      .setOptions(app.hist_options);
  app.hist_panel = ui.Panel();
  app.hist_panel_show = function() {
    app.hist_hide_panel.style().set('shown', false);
    app.hist_panel.style().set('shown', true);
  };
  app.hist_panel_hide = function() {
    app.hist_hide_panel.style().set('shown', true);
    app.hist_panel.style().set('shown', false);
  };
  var all_bands = app.hist_image.bandNames().getInfo();
  app.hist_panel.style().set({
    width: '600px',
    height: '280px',
    position: 'bottom-right'
  });
  app.hist_hide_btn = ui.Button('Hide', app.hist_panel_hide);
  app.hist_show_btn = ui.Button('Show histogram', app.hist_panel_show);
  app.plot_1_select = ui.Select({items:chart_bands, placeholder: 'Plot 1', value: app.histogram_bands[0], onChange: app.update_histogram});
  app.plot_2_select = ui.Select({items:chart_bands, placeholder: 'Plot 2', value: app.histogram_bands[1], onChange: app.update_histogram});
  app.plot_3_select = ui.Select({items:chart_bands, placeholder: 'Plot 3', value: app.histogram_bands[2], onChange: app.update_histogram});
  app.hist_panel_buttons = ui.Panel({
    widgets: [
      app.hist_hide_btn,
      ui.Label({style: {padding: '30px 10px 0 0', fontSize: '12px', backgroundColor: 'red'}}),
      app.plot_1_select,
      ui.Label({style: {padding: '30px 10px 0 0', fontSize: '12px', backgroundColor: 'green'}}),
      app.plot_2_select,
      ui.Label({style: {padding: '30px 10px 0 0', fontSize: '12px', backgroundColor: 'blue'}}),
      app.plot_3_select,
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  app.hist_panel.add(app.hist_panel_buttons);
  if(!app.CURRENT_IMAGE_TOA){
    app.hist_panel.add(app.histogram);
  }
  app.hist_hide_panel = ui.Panel();
  app.hist_hide_panel.add(app.hist_show_btn);
  app.hist_hide_panel.style().set({
    height: '61px',
    width: '130px',
    shown: false,
    position: 'bottom-right'
  });
  Map.add(app.hist_panel);
  Map.add(app.hist_hide_panel);
};
app.update_timeseries = function(platform){
  if(platform == 'L8'){
    var all_bands = ['-', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B10', 'B11'];
    if(!app.ts_band_choices){
      app.ts_band_choices = all_bands.slice(1, 7);
    } else {
      app.get_plot_choices();
    }
    var ts_selected = ee.List(app.ts_band_choices).distinct().remove('-')
    var collection =  ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').filterMetadata('CLOUD_COVER_LAND', 'less_than', 1).select(ts_selected);
  } else if (platform == 'L7'){
    var all_bands = ['-', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6_VCID_1', 'B6_VCID_2', 'B7', 'B8'];
    if(!app.ts_band_choices){
      app.ts_band_choices = all_bands.slice(1, 7);
    } else {
      app.get_plot_choices();
    }
    var ts_selected = ee.List(app.ts_band_choices).distinct().remove('-')
    var collection = ee.ImageCollection('LANDSAT/LE07/C01/T1').filterMetadata('CLOUD_COVER_LAND', 'less_than', 1).select(ts_selected);
  } else if (platform == 'L5'){
    var all_bands = ['-', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7'];
    if(!app.ts_band_choices){
      app.ts_band_choices = all_bands.slice(1, 7);
    } else {
      app.get_plot_choices();
    }
    var ts_selected = ee.List(app.ts_band_choices).distinct().remove('-')
    var collection = ee.ImageCollection('LANDSAT/LT05/C01/T1').filterMetadata('CLOUD_COVER_LAND', 'less_than', 1).select(ts_selected);
  } else if (platform == 'S2'){
    var all_bands = ['-', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9', 'B10', 'B11', 'B12'];
    if(!app.ts_band_choices){
      app.ts_band_choices = all_bands.slice(1, 7);
    } else {
      app.get_plot_choices();
    }
    var ts_selected = ee.List(app.ts_band_choices).distinct().remove('-')
    var collection =  ee.ImageCollection('COPERNICUS/S2').filterMetadata('CLOUDY_PIXEL_PERCENTAGE', 'less_than', 10).select(ts_selected);
  }
  if(app.timeSeriesPanel){
    Map.remove(app.timeSeriesPanel);
  }
  app.set_plot_choices(all_bands);
  app.timeSeries = ui.Chart.image.series(collection, ee.Feature(app.current_ts_point), ee.Reducer.mean(), 30).setOptions({
    title: 'Mean pixel values through time (30 metre pixel size, cloud free imagery)',
    hAxis: {title: 'Date'},
    vAxis: {title: 'Dn (mean)'},
  });
  app.close_timeseries_panel = function(){
    Map.remove(app.timeSeriesPanel);
    app.timeSeriesPanel = false
  };
  app.ts_close_btn = ui.Button('Close', app.close_timeseries_panel);
  app.timeSeriesPanel = ui.Panel({style: {width: '750px'}}); 
  app.timeSeriesPanel.widgets().reset();
  app.timeSeriesOptionPanel = ui.Panel({
    widgets: [],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  app.timeSeriesOptionPanel.widgets().reset();
  app.seriesSelect = ui.Select({
    items:['L8', 'L7', 'L5', 'S2'],
    placeholder: 'Platform',
    value: platform,
    onChange: function(){
      app.ts_band_choices = false;
      app.update_timeseries(app.seriesSelect.getValue());
    }
  });
  app.timeSeriesOptionPanel.add(app.ts_close_btn);
  app.timeSeriesOptionPanel.add(ui.Label('Platform'));
  app.timeSeriesOptionPanel.add(app.seriesSelect);
  app.timeSeriesOptionPanel.add(ui.Label('Bands to plot'));
  for(var i=0; i < 6; i++){
    app.timeSeriesOptionPanel.add(app.timeseries_plot_choices[i]);
  }
  app.timeSeriesPanel.add(app.timeSeriesOptionPanel);
  app.timeSeriesPanel.add(app.timeSeries);
  Map.add(app.timeSeriesPanel);
};
app.set_plot_choices = function(all_bands){
  app.timeseries_plot_choices = [];
  for(var i=0; i < 6; i++){
    app.timeseries_plot_choices.push(ui.Select(
      {items:all_bands,
      placeholder: app.ts_band_choices[i],
      value: app.ts_band_choices[i],
      onChange: function(){
        app.update_timeseries(app.seriesSelect.getValue())
      }
    }));
  }
};
app.get_plot_choices = function(){
  if(app.timeSeriesOptionPanel){
    app.ts_band_choices = [];
    for(var i=4; i < 10; i++){
      app.ts_band_choices.push(app.timeSeriesOptionPanel.widgets().getJsArray()[i].getValue());
    }
  } else{
    app.ts_band_choices = false;
  }
};
app.print_reflectance_data = function(){
  // Empty Collection to fill
  var marker_ids = app.pointerIds;
  var points = [];
  for (var i = 0; i < marker_ids.length; i++) {
    var coords = app.coordData[marker_ids[i]];
    var point = ee.Feature(ee.Geometry.Point(ee.List([coords.get('lon'), coords.get('lat')])),
      {label: marker_ids[i], image: app.CURRENT_IMAGE.id()});
    points.push(point);
  }
  var pts = ee.FeatureCollection(points);
  var ft = ee.FeatureCollection(ee.List([]));
  var fill = function(img, ini) {
    // type cast
    var inift = ee.FeatureCollection(ini);
    // gets the values for the points in the current img
    var ft2 = img.reduceRegions({
      collection:pts,
      reducer:ee.Reducer.first(),
      crs: 'EPSG:4326',
      crsTransform: [0.00025,0,0,0,-0.00025,0]
    });
    return inift.merge(ft2);
  };
  var fid = guid();
  var fileName = [fid,app.project_variables.title].join('_');
  var res = fill(app.CURRENT_IMAGE.select(app.CHART_BANDS), ft);
  Export.table.toDrive({
      collection:res,
      description: [fid,'Reflectance',app.project_variables.title].join('_'),
      fileNamePrefix: fileName,
      fileFormat: 'CSV'
  });
};
app.manual_image_setup = function(){
  var manual_image_id = app.manual_image.getValue()
  if(manual_image_id){
    manual_image_id = ee.String(app.manual_image.getValue()).getInfo();
    Map.clear();
    Map.setOptions('HYBRID');
    var mc = manual_image_id.split('/');
    app.COLLECTION_ID = mc[0]+'/'+mc[1];
    app.CURRENT_IMAGE_TOA = false;
    app.CURRENT_IMAGE_MOSAIC = false;
    // If an image id is found, create an image.
    var img = ee.Image(manual_image_id);
    var spectral_bands = app.spectralBands(img.bandNames());
    app.CURRENT_IMAGE_FOOTPRINT = ee.Geometry(img.get('system:footprint'));
    app.CURRENT_IMAGE_CENTROID = app.CURRENT_IMAGE_FOOTPRINT.centroid();
    app.CURRENT_IMAGE = app.convertToUint8(img,app.spectralBands(img.bandNames()));
    app.VIS_OPTIONS = app.vis_params();
    var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
    Map.addLayer(app.CURRENT_IMAGE, visOption.visParams, manual_image_id);
    var centroid_coords = app.CURRENT_IMAGE_CENTROID.coordinates();
    Map.setCenter(centroid_coords.get(0).getInfo(), centroid_coords.get(1).getInfo(), 9);
    app.vis.panel.style().set('shown', true);
    // var properties = app.CURRENT_IMAGE.propertyNames();
    // print('Metadata properties: ', properties);
  }
};
app.PCAInputs = function(BCET){
  if(BCET){
    app.PCA_LAYERS = app.BCET_BANDS;
  } else {
    app.PCA_LAYERS = app.spectralBands(app.CURRENT_IMAGE.bandNames()).getInfo();
  }
  for (var i = 0; i < app.PCA_LAYERS.length; i++) {
    var input_name = app.PCA_LAYERS[i]+'_pca';
    app[input_name] = ui.Checkbox({
      label: app.PCA_LAYERS[i],
      value: true,
      onChange: app.updatePCABands
    });
    app.PCABandSelect.panel.add(app[input_name]);
  }
  var gen_btn = ui.Button({
    label: 'Generate principal components',
    onClick: app.PCA_Processing,
    style: {
      stretch:'horizontal',
      fontSize: '18px'
    }
  });
  app.PCABandSelect.panel.add(gen_btn);
  app.updatePCABands();
};
app.loadFusionTable = function(){
  var fusion_id = app.fusion_table_id.getValue();
  if(fusion_id){
    var fid_protocol = ee.String('ft:').cat(fusion_id).getInfo();
    var fusion_data = ee.FeatureCollection(fid_protocol);
    var names = ee.List(fusion_data.aggregate_array('name'));
    var getCoords = function(n){
      var latlon = ee.List(cc.get(n));
      var name = names.get(n);
      var coords = ee.Dictionary({
        lat:latlon.get(1),
        lon:latlon.get(0)
      });
      return [coords, name];
    };
    var cc = fusion_data.geometry().coordinates();
    var seq = ee.List.sequence(0, cc.length().subtract(1));
    var coord_data = seq.map(getCoords);
    var g = coord_data.length().getInfo();
    for(var i=0; i < g; i++){
      var cd = ee.List(coord_data.get(i));
      app.createPoint(ee.Dictionary(cd.get(0)), cd.get(1));
    }
    app.fusion_table_id.setValue('');
  }
};
app.loadShapefilePoints = function(){
  var feature_id = app.fusion_table_id.getValue();
  if(feature_id){
    app.clearLayerAssets([feature_id]);
    var points = ee.FeatureCollection(feature_id);
    Map.addLayer(points, {}, feature_id, true);
  }
};
app.exportShapefilePoints = function(){
  var feature_id = app.fusion_table_id.getValue();
  if(feature_id){
    var bandPoints = ee.FeatureCollection(feature_id);
    //var ft = ee.FeatureCollection(ee.List([]));
    var ft = ee.FeatureCollection(ee.List([]));
    var fill = function(img, ini) {
      // type cast
      var inift = ee.FeatureCollection(ini);
      // gets the values for the points in the current img
      var ft2 = img.reduceRegions({
        collection:bandPoints,
        reducer:ee.Reducer.first(),
        crs: 'EPSG:4326',
        crsTransform: [0.00025,0,0,0,-0.00025,0]
      });
      return inift.merge(ft2);
    };
    var fid = guid();
    var fileName = [fid,app.project_variables.title].join('_');
    var res = fill(app.CURRENT_IMAGE.select(app.CHART_BANDS), ft);
    res.set('image', app.CURRENT_IMAGE.id());
    Export.table.toDrive({
        collection:res,
        description: [fid,'Reflectance',app.project_variables.title].join('_'),
        fileNamePrefix: fileName,
        fileFormat: 'CSV'
    });
  }
};
app.updatePCABands = function(){
  app.PCA_INPUT_BANDS = [];
  for (var i = 0; i < app.PCA_LAYERS.length; i++) {
    var input_name = app.PCA_LAYERS[i]+'_pca';
    if (app[input_name].getValue()){
      app.PCA_INPUT_BANDS.push(app.PCA_LAYERS[i]);
    }
  }
};
app.ExportBandSelectInputs = function(){
  var widgets = [
    ui.Label({
        value: 'Composite layer:',
        style: {fontWeight: 'bold', fontSize: '15px', margin: '10px 5px'}
    })
  ];
  var all_bands = app.CURRENT_IMAGE.bandNames().getInfo();
  app.R = ui.Select({
    items: all_bands,
    value: all_bands[0],
    placeholder: 'R'
  });
  app.B = ui.Select({
    items: all_bands,
    value: all_bands[1],
    placeholder: 'B'
  });
  app.G = ui.Select({
    items: all_bands,
    value: all_bands[2],
    placeholder: 'G'
  });
  widgets.push(ui.Label({value: 'R', style: {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px'}}));
  widgets.push(app.R);
  widgets.push(ui.Label({value: 'G', style: {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px'}}));
  widgets.push(app.G);
  widgets.push(ui.Label({value: 'B', style: {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px'}}));
  widgets.push(app.B);
  app.exportRegion = function(){
    var bands_to_export = [app.R.getValue(), app.G.getValue(), app.B.getValue()];
    Export.image.toDrive({
      image: app.CURRENT_IMAGE.select(bands_to_export),
      description: guid()+'_Export_' + bands_to_export.join('_') + '_' + app.project_variables.title,
      scale: 30,
      crs:'EPSG:4326'
    });
  };
  widgets.push(
    ui.Button({
      label: 'Export Tif',
      onClick: function(){
        app.exportRegion();
      },
      style: {
        stretch:'horizontal',
        fontSize: '18px'
      }
    })
  );
  for(var i = 0; i < widgets.length; i++){
     app.ExportRGB.add(widgets[i]);
  }
};
app.edgeDetectLayer = function(){
  app.clearLayerAssets(['KirschFilter']);
  var collection_params = app.COLLECTION_ID.split('/');
  var kirsch_bands = false;
  if(collection_params[0] == 'LANDSAT'){
    if((collection_params[1] == 'LC08')||
      (collection_params[1] == 'LC8_L1T_8DAY_TOA')||
      (collection_params[1] == 'LC8_L1T_32DAY_TOA')){
        kirsch_bands = ['B1', 'B2', 'B3', 'B4', 'B5'];
    } else if (collection_params[1] == 'LE07'){
        kirsch_bands = ['B1', 'B2', 'B3', 'B4'];
    } else if (collection_params[1] == 'LT05'){
        kirsch_bands = ['B1', 'B2', 'B3', 'B4'];
    }
  } else if (collection_params[0] == 'COPERNICUS'){
    kirsch_bands = ['B1', 'B2', 'B3', 'B4', 'B5'];
  }
  if(kirsch_bands) {
    var s = app.stretch_std(app.CURRENT_IMAGE, 10);
    var min_nat = ee.Number(ee.List([s.vmin.B4, s.vmin.B3, s.vmin.B2]).reduce(ee.Reducer.mean()));
    var max_nat = ee.Number(ee.List([s.vmax.B4, s.vmax.B3, s.vmax.B2]).reduce(ee.Reducer.mean()));
    var normalised = ee.Image(app.CURRENT_IMAGE).select([]);
    for(var i=0; i < kirsch_bands.length; i++){
      var db = app.CURRENT_IMAGE.select(kirsch_bands[i]).divide(s.vmax[kirsch_bands[i]]);
      normalised = normalised.addBands(db.select(kirsch_bands[i]));
    }
    var kirsch_r0 = ee.Kernel.kirsch();
    var kirsch_r1 = kirsch_r0.rotate(1);
    var kirsch_r2 = kirsch_r0.rotate(2);
    var kirsch_r3 = kirsch_r0.rotate(3);
    // Make 45 degree Kirsch kernel
    var k45_top = [5, 5, -3];
    var k45_mid = [5, 0, -3];
    var k45_bot = [-3, -3, -3];
    var k45 = [k45_top, k45_mid, k45_bot];
    var kirch45_r0 = ee.Kernel.fixed(3,3,k45);
    var kirch45_r1 = kirch45_r0.rotate(1);
    var kirch45_r2 = kirch45_r0.rotate(2);
    var kirch45_r3 = kirch45_r0.rotate(3);
    var k_kernels = [kirsch_r0, kirsch_r1, kirsch_r2, kirsch_r3, kirch45_r0, kirch45_r1, kirch45_r2, kirch45_r3];
    var k_images = [];
    for(var i = 0; i < k_kernels.length; i++){
      k_images.push(normalised.convolve(k_kernels[i]));
    }
    var k_collection = ee.ImageCollection(k_images);
    var vr = k_collection.reduce(ee.Reducer.max());
    var k_thresh = vr.gt(app.thresholdSlider.getValue());
    Map.addLayer(k_thresh, false, 'KirschFilter', true, 0.3);
  }
};
// Create Interface
app.createPanels = function(){
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Spectral Point App',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('Visualize and measure spectral signatures from Landsat and Sentinel 2')
      //,
      // ui.Label({
      //   value:'Author: Sam Brooke (sbrooke@ucsb.edu)',
      //   style: {fontSize: '12px'}
      // })
    ])
  };
  var today_split = app.today.split('-');
  app.year_before_now = [today_split[0]-1, today_split[1], today_split[2]].join('-');
  // LANDSAT/SENTINEL Data chooser -- lifted from Google Script
  app.filters = {
    mapCenter: ui.Checkbox({label: 'Filter to map center', value: true}),
    startDate: ui.Textbox('YYYY-MM-DD', app.year_before_now),
    endDate: ui.Textbox('YYYY-MM-DD', app.today),
    applyButton: ui.Button('Search', app.applyFilters),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  app.collection_picker = ui.Select({
    items: app.LANDSAT_COLLECTIONS,
    value: '', /* Default */
    onChange: app.selectCollection
  });
  app.collection_picker.style().set('shown', false)
  app.manual_image = ui.Textbox({
    placeholder: 'DATASET/COLLECTION/IMAGE',
    style: {
      width: '400px'
    }
  });
  /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('STEPS', {fontWeight: 'bold'}),
      ui.Label('1) Pan and zoom to desired location of map', {fontWeight: 'bold'}),
      ui.Label('2) Browse Imagery Sources', {fontWeight: 'bold'}),
      ui.Select({
        items: ['', 'Landsat', 'Sentinel 2'],
        value: '',
        onChange: app.selectDataset
      }),
      app.collection_picker,
      ui.Label('or load specific image using an ID', {fontWeight: 'bold'}),
      ui.Panel({
        widgets: [
          app.manual_image,
          ui.Button({
            label: 'Load',
            onClick: app.manual_image_setup,
            style: {
              fontSize: '16px'
            }
          })
        ],
        layout: ui.Panel.Layout.flow('horizontal')
      }),
    ],
    style: app.SECTION_STYLE
  });
  app.date_chooser = {};
  app.date_chooser.panel = ui.Panel({
    widgets: [
      ui.Label('3) Choose scene from date range:', {fontWeight: 'bold'}),
      ui.Label('Start date', app.HELPER_TEXT_STYLE), app.filters.startDate,
      ui.Label('End date', app.HELPER_TEXT_STYLE), app.filters.endDate,
      app.filters.mapCenter,
      ui.Panel([
        app.filters.applyButton,
        app.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  /* The image picker section. */
  app.picker = {
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      placeholder: 'Select an image ID',
      onChange: app.refreshMapLayer
    })
  };
  app.year_picker = {
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      placeholder: 'Year',
      onChange: function(){
        app.COLLECTION_ID = app.collection_picker.getValue();
        app.applyFilters();
      }
    }),
    loading_label: ui.Label()
  };
  /* The panel for the picker section with corresponding widgets. */
  app.year_picker.panel = ui.Panel({
    widgets: [
      ui.Label('Choose a year', {fontWeight: 'bold'}),
      ui.Panel([
        app.year_picker.select
      ]),
      app.year_picker.loading_label
    ],
    style: app.SECTION_STYLE
  });
  app.picker.panel = ui.Panel({
    widgets: [
      ui.Label('4) Choose an image', {fontWeight: 'bold'}),
      ui.Panel([
        app.picker.select
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  /* The visualization section. */
  app.vis = {
    label: ui.Label(),
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      items: Object.keys(app.VIS_OPTIONS),
      onChange: function() {
        // Update the label's value with the select's description.
        var option = app.VIS_OPTIONS[app.vis.select.getValue()];
        app.vis.label.setValue(option.description);
        // Refresh the map layer.
        app.refreshMapLayer();
      }
    })
  };
  /* The panel for the visualization section with corresponding widgets. */
  app.vis.panel = ui.Panel({
    widgets: [
      // ui.Label('4) Visualize', {fontWeight: 'bold'}),
      // app.vis.select,
      // app.vis.label,
      ui.Button({
        label: 'Next',
        onClick: app.setImage,
        style: {
          stretch:'horizontal',
          fontSize: '18px'
        }
      })
    ],
    style: app.SECTION_STYLE
  });
  // Default the select to the first value.
  app.vis.select.setValue(app.vis.select.items().get(0));
  app.regionSelect = {
    panel: ui.Panel([
      ui.Label({
        value: 'Region',
        style: {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px'}
      }),
      ui.Label('Select the rectangular region of interest (1st click for top left corner, 2nd for bottom right)'),
      ui.Button({
        label: 'Select Region',
        onClick: app.selectRegion,
        style: {
          stretch:'horizontal',
          fontSize: '18px'
        }
      }),
      ui.Label('Select option above to set AOI or input decimal coordinates manually below'),
      app.position_inputs.panel,
      ui.Button({
        label: 'Create region from manual coordinates above',
        onClick: app.setRegion,
        style: {
          stretch:'horizontal'
        }
      }),
      ui.Button({
        label: 'Recentre on region',
        onClick: app.centerRegion,
        style: {
          stretch:'horizontal'
        }
      })
    ])
  };
  app.BCET = {
    panel: ui.Panel([
      ui.Label({
        value: 'Region',
        style: {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px'}
      }),
      ui.Label('BCET region of interest (after Lui, 1991)'),
      ui.Label({
        value:'Apply a normalization stretch to all bands for effective cross-band spectral comparison',
        style:{
          'fontSize':10
        }
      }),
      ui.Button({
        label: 'BCET Region',
        onClick: function(){
          var skip = false;
          app.BCETRegion(skip);
        },
        style: {
          stretch:'horizontal',
          fontSize: '18px'
        }
      }),
      ui.Button({
        label: 'Skip',
        onClick: function(){
          var skip = true;
          app.BCETRegion(skip);
        },
        style: {
          stretch:'horizontal',
          fontSize: '18px'
        }
      })
    ])
  };
  app.PCABandSelect = {
    panel: ui.Panel([
      ui.Label({
        value: 'Principal Component Bands:',
        style: {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px'}
      })
    ])
  };
  app.chartBandSelect_left = ui.Panel();
  app.chartBandSelect_right = ui.Panel();
  app.chartBandSelect = {
    panel: ui.Panel([
      ui.Label({
        value: 'Select Bands',
        style: {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px'}
      }),
      ui.Panel({widgets:[app.chartBandSelect_left, app.chartBandSelect_right], layout: ui.Panel.Layout.flow('horizontal')})
    ])
  };
  app.pcImage = false;
  app.PCA_Map_Layer = {
    panel: ui.Panel([ui.Label({
      value: 'Add PCA Layer:',
      style: {fontWeight: 'bold', fontSize: '10px'}
      })
    ])
  };
  app.BCETBandSelect = {
    panel: ui.Panel([ui.Label('Processing BCET...')], ui.Panel.Layout.flow('horizontal'))
  };
  app.continueToPoint = {
    panel: ui.Panel([
      ui.Label('Generate PCA layers to proceed to spectral sampling'),
      ui.Button({
        label: 'Continue to point selection',
        onClick: function(){
          app.pointSetup();
        },
        style: {
          stretch:'horizontal',
          fontSize: '18px'
        }
      })
    ])
  };
  app.coordMasterPanel = ui.Panel([]);
  app.sample_input = ui.Textbox({
    placeholder: 'Sample',
    style: {
      width: '150px'
    }
  });
  app.lat_input = ui.Textbox({
    placeholder: 'Lat',
    style: {
      width: '150px'
    }
  });
  app.lon_input = ui.Textbox({
    placeholder: 'Lon',
    style: {
      width: '150px'
    }
  });
  var addCoordBtn = ui.Button({
    label: 'Add',
    onClick: app.addManualCoord,
    style: {
      fontSize: '16px'
    }
  });
  app.manualCoordForm = ui.Panel([
    app.sample_input,
    app.lat_input,
    app.lon_input,
    addCoordBtn
  ], ui.Panel.Layout.flow('horizontal'));
  app.fusion_table_id = ui.Textbox({
    placeholder: 'Asset Table ID',
    style: {
      width: '250px'
    }
  });
  var loadFusionTableBtn = ui.Button({
    label: 'Plot',
    //onClick: app.loadFusionTable,
    onClick: app.loadShapefilePoints,
    style: {
      fontSize: '16px'
    }
  });
  var exportFusionTableValuesBtn = ui.Button({
    label: 'Export Values Only',
    // onClick: function(){
    //   app.exportFusionTable();
    // },
    onClick: app.exportShapefilePoints,
    style: {
      fontSize: '16px'
    }
  });
  app.fusionTableForm = ui.Panel([
    app.fusion_table_id,
    loadFusionTableBtn,
    exportFusionTableValuesBtn
    ],ui.Panel.Layout.flow('horizontal'));
  app.thresholdSlider = ui.Slider({
    min: 0,
    max: 1,
    value: 0.5,
    step: 0.1,
    onChange: app.edgeDetectLayer,
    style: {stretch: 'horizontal'}
  });
  app.edgeDetectPanel = ui.Panel([
    ui.Button({
      label: 'Edge Detection Filter',
      onClick: app.edgeDetectLayer,
      style: {
        stretch:'horizontal'
      }
    }),
    app.thresholdSlider,
    ],ui.Panel.Layout.flow('horizontal'));
  app.pointSelect = {
    panel: ui.Panel([
      ui.Label({
        value: 'Edge Detect',
        style: {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px'}
      }),
      app.edgeDetectPanel,
      ui.Label('Add a semi-transparent layer that highlights areas with higher constract gradients. These areas may be problematic for reliable point selection'),
      ui.Label({
        value: 'Points',
        style: {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px'}
      }),
      app.coordMasterPanel,
      ui.Button({
        label: 'Select points on map',
        onClick: app.pointMapListen,
        style: {
          stretch:'horizontal'
        }
      }),
      ui.Label('Choose query points by clicking on map'),
      ui.Button({
        label: 'Pan Mode',
        onClick: app.pointMapUnlisten,
        style: {
          stretch:'horizontal'
        }
      }),
      ui.Label('Return to map exploration mode'),
      ui.Label({
        value: 'Add Points Manually',
        style: {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px'}
      }),
      app.manualCoordForm
      // ,
      // ui.Label({
      //   value: 'Import points from shapefile asset (EPSG:4326)',
      //   style: {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px'}
      // }),
      // app.fusionTableForm
    ])
  };
  app.ExportRGB = ui.Panel([], ui.Panel.Layout.flow('horizontal'));
  app.export = {
    panel: ui.Panel([
      ui.Label({
        value: 'Export',
        style: {fontWeight: 'bold', fontSize: '18px', margin: '10px 5px'}
      }),
      app.ExportRGB,
      ui.Button({
        label: 'Export pixel values to Google Drive (.csv)',
        onClick: app.print_reflectance_data,
        style: {
          stretch:'horizontal'
        }
      }),
      ui.Button({
        label: 'Export shapefile to Google Drive (.shp)',
        onClick: app.exportCoords,
        style: {
          stretch:'horizontal'
        }
      }),
      ui.Label('(This will be stored as task that can be executed in the console above)')
    ])
  };
  app.debug_start = {
    panel: ui.Panel([
      ui.Button({
        label: 'Start Debug',
        onClick: function(){
          app.debug_post_setup();
        },
        style: {
          stretch:'horizontal'
        }
      })
    ])
  };
};
app.selectCollection = function(collection){
  app.picker.panel.style().set('shown', false);
  if(collection){
    app.COLLECTION_ID = collection;
    if((app.COLLECTION_ID=='LANDSAT 8 cloud-free composite') ||
    (app.COLLECTION_ID=='LANDSAT 7 cloud-free composite') ||
    (app.COLLECTION_ID=='LANDSAT 5 cloud-free composite')) {
      app.year_picker_range = []
      var today = new Date();
      var yyyy = today.getFullYear();
      if(app.COLLECTION_ID.substring(0, 9) == 'LANDSAT 5'){
        var i;
        var start_year = 1984;
        for (i = 0; i < 30; i++) {
          app.year_picker_range.push((start_year+i).toString());
        }
      } else if (app.COLLECTION_ID.substring(0, 9) == 'LANDSAT 7'){
        var i;
        var start_year = 1999;
        var inc = yyyy-start_year+1;
        for (i = 0; i < inc; i++) {
          app.year_picker_range.push((start_year+i).toString());
        }
      } else {
        // LANDSAT 8
        var i;
        var start_year = 2013;
        var inc = yyyy-start_year+1;
        for (i = 0; i < inc; i++) {
          app.year_picker_range.push((start_year+i).toString());
        }
      }
      app.date_chooser.panel.style().set('shown', false);
      app.year_picker.panel.style().set('shown', true);
      app.year_picker.select.items().reset(app.year_picker_range);
    } else {
      app.date_chooser.panel.style().set('shown', true);
      var collection_params = app.COLLECTION_ID.split('/');
      if(collection_params[1] == 'LT05'){
        app.filters.startDate.setValue('1984-03-01');
        app.filters.endDate.setValue('2013-06-24');
      } else if (collection_params[1] == 'LE07'){
        app.filters.startDate.setValue('1999-04-15');
        app.filters.endDate.setValue('2003-03-31');       
      } else {
        app.filters.startDate.setValue(app.year_before_now);
        app.filters.endDate.setValue(app.today);
      }
      app.year_picker.panel.style().set('shown', false);
    }
  }
};
app.selectDataset = function(dataset){
  app.collection_picker.style().set('shown', true)
  if(dataset == 'Landsat'){
    app.collection_picker.items().reset(app.LANDSAT_COLLECTIONS);
  } else if(dataset == 'Sentinel 2'){
    app.COLLECTION_ID = 'COPERNICUS/S2';
    app.collection_picker.items().reset(['COPERNICUS/S2']);
  }
};
app.createHelpers = function() {
  // Image loading and visualisation helpers
  app.setLoadingMode = function(enabled) {
    // Set the loading label visibility to the enabled mode.
    app.filters.loadingLabel.style().set('shown', enabled);
    // Set each of the widgets to the given enabled mode.
    var loadDependentWidgets = [
      app.vis.select,
      app.filters.startDate,
      app.filters.endDate,
      app.filters.applyButton,
      app.filters.mapCenter,
      app.picker.select
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  };
  /** Applies the selection filters currently selected in the UI. */
  app.applyFilters = function() {
    print('Applying search filters')
    app.year_picker.loading_label.set('value', '');
    if((app.COLLECTION_ID=='LANDSAT 8 cloud-free composite') ||
    (app.COLLECTION_ID=='LANDSAT 7 cloud-free composite') ||
    (app.COLLECTION_ID=='LANDSAT 5 cloud-free composite')) {
      var collection_raw = false;
      if (app.COLLECTION_ID=='LANDSAT 8 cloud-free composite') {
        collection_raw = "LANDSAT/LC08/C01/T1"
      }
      if (app.COLLECTION_ID=='LANDSAT 7 cloud-free composite') {
        collection_raw = "LANDSAT/LE07/C01/T1"
      }
      if (app.COLLECTION_ID=='LANDSAT 5 cloud-free composite') {
        collection_raw = "LANDSAT/LT05/C01/T1"
      }
      // Set date filter variables.
      var year_choice = app.year_picker.select.getValue();
      var start = ee.Date(year_choice+'-01-01');
      var end = ee.Date(year_choice+'-12-31');
      app.picker.panel.style().set('shown', false);
      app.COLLECTION_ID = collection_raw;
      var cloud_collection = ee.ImageCollection(collection_raw)
      .filterBounds(Map.getCenter()).filterDate(start, end).limit(app.IMAGE_COUNT_LIMIT);
      if(cloud_collection.toList(app.IMAGE_COUNT_LIMIT).length().getInfo() > 0){
        var simple_composite = ee.Algorithms.Landsat.simpleComposite(cloud_collection);
        app.CURRENT_IMAGE_PROJ = cloud_collection.first().projection();
        app.CURRENT_IMAGE_GEOM = ee.Geometry(cloud_collection.first().get('system:footprint'));
        app.CURRENT_IMAGE_CENTROID = app.CURRENT_IMAGE_GEOM.centroid();
        app.CURRENT_IMAGE_FOOTPRINT = app.CURRENT_IMAGE_GEOM;
        app.CURRENT_IMAGE_MOSAIC = true;
        app.CURRENT_IMAGE_TOA = false;
        app.CURRENT_IMAGE = app.convertToUint8(simple_composite,app.spectralBands(simple_composite.bandNames()));
        app.VIS_OPTIONS = app.vis_params();
        var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
        Map.addLayer(app.CURRENT_IMAGE, visOption.visParams, collection_raw+' ('+year_choice+')');
        var current_center = Map.getCenter();
        Map.setCenter(current_center.coordinates().get(0).getInfo(), current_center.coordinates().get(1).getInfo(), 9);
        app.vis.panel.style().set('shown', true);
        //var properties = app.CURRENT_IMAGE.propertyNames();
        //print('Metadata properties: ', properties);
      } else {
        app.year_picker.loading_label.set('value', 'No cloud-free images found');
      }
    } else if(app.COLLECTION_ID == 'COPERNICUS/S2') {
      // SENTINEL 2 IMAGERY
      app.setLoadingMode(true);
      app.picker.panel.style().set('shown', false);
      // Set filter variables.
      var start = ee.Date(app.filters.startDate.getValue());
      var end = ee.Date(app.filters.endDate.getValue());
      var filtered = ee.ImageCollection(app.COLLECTION_ID)
      .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
      .filterBounds(Map.getCenter()).filterDate(start, end).limit(app.IMAGE_COUNT_LIMIT);
      // Get the list of computed ids.
      var computedIds = filtered
          .reduceColumns(ee.Reducer.toList(), ['system:index'])
          .get('list');
      if(ee.List(computedIds).length().getInfo() > 0){
        computedIds.evaluate(function(ids) {
          // Update the image picker with the given list of ids.
          app.setLoadingMode(false);
          app.picker.select.items().reset(ids);
          app.picker.panel.style().set('shown', true);
        });
        app.vis.panel.style().set('shown', true);
      } else{
        app.filters.loadingLabel.set('value', 'No cloud-free images found');
        app.setLoadingMode(false);
        app.filters.loadingLabel.style().set('shown', true);
        app.picker.select.items().reset([]);
      }
    } else {
      app.setLoadingMode(true);
      var filtered = ee.ImageCollection(app.COLLECTION_ID);
      // Filter bounds to the map if the checkbox is marked.
      if (app.filters.mapCenter.getValue()) {
        filtered = filtered.filterBounds(Map.getCenter());
      }
      // Set filter variables.
      var start = ee.Date(app.filters.startDate.getValue());
      var end = ee.Date(app.filters.endDate.getValue());
      filtered = filtered.filterDate(start, end);
      // Preselect low-cloud imagery unless we are using the premade 32 or 8 day composites
      if ((app.COLLECTION_ID !== 'LANDSAT/LC8_L1T_32DAY_TOA') && (app.COLLECTION_ID !== 'LANDSAT/LC8_L1T_8DAY_TOA')){
        filtered = filtered.filterMetadata('CLOUD_COVER_LAND', 'less_than', 1);
      }
      // Get the list of computed ids.
      var computedIds = filtered
          .limit(app.IMAGE_COUNT_LIMIT)
          .reduceColumns(ee.Reducer.toList(), ['system:index'])
          .get('list');
      if(ee.List(computedIds).length().getInfo() > 0){
        computedIds.evaluate(function(ids) {
          // Update the image picker with the given list of ids.
          app.setLoadingMode(false);
          app.picker.select.items().reset(ids);
          app.picker.panel.style().set('shown', true);
        });
        app.vis.panel.style().set('shown', true);
      } else{
        app.filters.loadingLabel.set('value', 'No cloud-free images found');
        app.setLoadingMode(false);
        app.filters.loadingLabel.style().set('shown', true);
        app.picker.select.items().reset([]);
      }
    }
  };
  /** Refreshes the current map layer based on the UI widget states. */
  app.refreshMapLayer = function() {
    Map.clear();
    Map.setOptions('HYBRID');
    var imageId = app.picker.select.getValue();
    if (imageId) {
      if ((app.COLLECTION_ID == 'LANDSAT/LC8_L1T_32DAY_TOA') || (app.COLLECTION_ID == 'LANDSAT/LC8_L1T_8DAY_TOA')){
        app.CURRENT_IMAGE_MOSAIC = true;
        app.CURRENT_IMAGE_TOA = true;
        var image_id_full = ee.String(app.COLLECTION_ID + '/').cat(imageId).getInfo();
        var img = ee.Image(image_id_full);
        var spectral_bands = app.spectralBands(img.bandNames());
        var current_center = Map.getCenter();
        Map.setCenter(current_center.coordinates().get(0).getInfo(), current_center.coordinates().get(1).getInfo(), 9);
        app.CURRENT_IMAGE_FOOTPRINT = ee.Geometry(Map.getBounds(true));
      } else {
        app.CURRENT_IMAGE_TOA = false;
        app.CURRENT_IMAGE_MOSAIC = false;
        // If an image id is found, create an image.
        var image_id_full = ee.String(app.COLLECTION_ID + '/').cat(imageId).getInfo();
        var img = ee.Image(image_id_full);
        var spectral_bands = app.spectralBands(img.bandNames());
        app.CURRENT_IMAGE_FOOTPRINT = ee.Geometry(img.get('system:footprint'));
      }
      app.CURRENT_IMAGE = app.convertToUint8(img,spectral_bands);
      app.VIS_OPTIONS = app.vis_params();
      app.manual_image.setValue(image_id_full, false);
      // Add the image to the map with the corresponding visualization options.
      var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
      Map.addLayer(app.CURRENT_IMAGE, visOption.visParams, imageId);
      app.vis.panel.style().set('shown', true);
    }
  };
};
// Google chooser constants
app.createConstants = function(collection_ID) {
  app.LANDSAT_COLLECTIONS = [
      '',
      'LANDSAT/LC8_L1T_32DAY_TOA',
      'LANDSAT/LC8_L1T_8DAY_TOA',
      'LANDSAT/LC08/C01/T1_SR',
      'LANDSAT/LE07/C01/T1_SR',
      'LANDSAT/LT05/C01/T1_SR',
      'LANDSAT 8 cloud-free composite',
      'LANDSAT 7 cloud-free composite',
      'LANDSAT 5 cloud-free composite'
    ];
  app.COLLECTION_ID = 'LANDSAT/LC08/C01/T1_SR';
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.IMAGE_COUNT_LIMIT = 10;
  app.HEX_CODES = [
    'ff1111',
    'ffa811',
    '49ff00',
    '00e8ff',
    '0051ff',
    '9b00ff',
    'ff00d1',
    'ff0070',
    'ff9e00',
    'f7ff00',
    '00ff6c',
    '72ccff',
    'b0baff',
    'ebb0ff',
    'ffb0bc',
    'fffbb0',
    'b0ffc0'
  ];
  // app.bcet_presets = ee.Dictionary({
  //   'B1': {'a':false, 'b':false, 'c':false},
  //   'B2': {'a':false, 'b':false, 'c':false},
  //   'B3': {'a':false, 'b':false, 'c':false},
  //   'B4': {'a':false, 'b':false, 'c':false},
  //   'B5': {'a':false, 'b':false, 'c':false},
  //   'B6': {'a':false, 'b':false, 'c':false},
  //   'B7': {'a':false, 'b':false, 'c':false},
  //   'B8': {'a':false, 'b':false, 'c':false},
  //   'B8A': {'a':false, 'b':false, 'c':false},
  //   'B9': {'a':false, 'b':false, 'c':false},
  //   'B10': {'a':false, 'b':false, 'c':false},
  //   'B11': {'a':false, 'b':false, 'c':false},
  //   'B12': {'a':false, 'b':false, 'c':false}
  // });
  app.VIS_OPTIONS = app.vis_params();
};
app.stretch_std = function(i, n_std) {
  // https://gis.stackexchange.com/questions/259072/google-earth-engine-different-stretch-options
  //if(ee.String(app.CURRENT_IMAGE_PROJ.crs()).compareTo(ee.String('EPSG:4326'))){
  if(app.CURRENT_IMAGE_MOSAIC){ // Is the current image a mosaic
    print('Processing image mosaic')
    var mean = i.reduceRegion({
      reducer: ee.Reducer.mean(),
      crs: 'EPSG:4326',
      geometry: app.CURRENT_IMAGE_FOOTPRINT,
      crsTransform: [0.00025,0,0,0,-0.00025,0],
      bestEffort: true})
    var std = i.reduceRegion({
      reducer: ee.Reducer.stdDev(),
      crs: 'EPSG:4326',
      geometry: app.CURRENT_IMAGE_FOOTPRINT,
      crsTransform: [0.00025,0,0,0,-0.00025,0],
      bestEffort: true})
    var min = mean.map(function(key, val){
        return ee.Number(val).subtract(ee.Number(std.get(key)).multiply(n_std))
      }).getInfo()
    var max = mean.map(function(key, val){
        return ee.Number(val).add(ee.Number(std.get(key)).multiply(n_std))
      }).getInfo()
    return {vmin: min, vmax: max}
  } else {
    print('Processing single image')
    var mean = i.reduceRegion({
      reducer: ee.Reducer.mean(),
      geometry: app.CURRENT_IMAGE_FOOTPRINT,
      bestEffort: true})
    var std = i.reduceRegion({
      reducer: ee.Reducer.stdDev(),
      geometry: app.CURRENT_IMAGE_FOOTPRINT,
      bestEffort: true})
    var min = mean.map(function(key, val){
        return ee.Number(val).subtract(ee.Number(std.get(key)).multiply(n_std))
      }).getInfo()
    var max = mean.map(function(key, val){
        return ee.Number(val).add(ee.Number(std.get(key)).multiply(n_std))
      }).getInfo()
    return {vmin: min, vmax: max}
  }
};
app.vis_params = function(){
  if(app.CURRENT_IMAGE !== undefined){
    var s = app.stretch_std(app.CURRENT_IMAGE, 2);
    var vis_options = {};
    var collection_params = app.COLLECTION_ID.split('/');
    var min_nat = 0;
    var max_nat = 0;
    if(collection_params[0] == 'LANDSAT'){
      if((collection_params[1] == 'LC8_L1T_32DAY_TOA')
        ||(collection_params[1] == 'LC8_L1T_8DAY_TOA')
        ||(collection_params[1] == 'LC08')){
        /// Landsat 8 and composites
        print('Visualising L8')
        min_nat = ee.Number(ee.List([s.vmin.B4, s.vmin.B3, s.vmin.B2]).reduce(ee.Reducer.mean()));
        max_nat = ee.Number(ee.List([s.vmax.B4, s.vmax.B3, s.vmax.B2]).reduce(ee.Reducer.mean()));
        vis_options = {
          'Natural color': {
            description: 'Ground features appear in colors similar to their ' +
                         'appearance to the human visual system.',
            visParams: {gamma: [1, 1, 1], min: min_nat.getInfo(), max: max_nat.getInfo(), bands: ['B4', 'B3', 'B2']}
          }
        };
      } else if (collection_params[1] == 'LE07'){
        print('Visualising L7')
        // Landsat 7
        min_nat = ee.Number(ee.List([s.vmin.B3, s.vmin.B2, s.vmin.B1]).reduce(ee.Reducer.mean()));
        max_nat = ee.Number(ee.List([s.vmax.B3, s.vmax.B2, s.vmax.B1]).reduce(ee.Reducer.mean()));
        vis_options = {
          'Natural color': {
            description: 'Ground features appear in colors similar to their ' +
                         'appearance to the human visual system.',
            visParams: {gamma: [1, 1, 1], min: min_nat.getInfo(), max: max_nat.getInfo(), bands: ['B3', 'B2', 'B1']}
          }
        };
      } else if (collection_params[1] == 'LT05'){
        print('Visualising L5')
        // Landsat 5
        min_nat = ee.Number(ee.List([s.vmin.B3, s.vmin.B2, s.vmin.B1]).reduce(ee.Reducer.mean()));
        max_nat = ee.Number(ee.List([s.vmax.B3, s.vmax.B2, s.vmax.B1]).reduce(ee.Reducer.mean()));
        vis_options = {
          'Natural color': {
            description: 'Ground features appear in colors similar to their ' +
                         'appearance to the human visual system.',
            visParams: {gamma: [1, 1, 1], min: min_nat.getInfo(), max: max_nat.getInfo(), bands: ['B3', 'B2', 'B1']}
          }
        };
      }
    } else if(collection_params[0] == 'COPERNICUS'){
      print('Visualising Sentinel 2')
      min_nat = ee.Number(ee.List([s.vmin.B4, s.vmin.B3, s.vmin.B2]).reduce(ee.Reducer.mean()));
      max_nat = ee.Number(ee.List([s.vmax.B4, s.vmax.B3, s.vmax.B2]).reduce(ee.Reducer.mean()));
       vis_options = {
        'Natural color': {
          description: 'Ground features appear in colors similar to their ' +
                       'appearance to the human visual system.',
          visParams: {gamma: [1, 1, 1], min: min_nat.getInfo(), max: max_nat.getInfo(), bands: ['B4', 'B3', 'B2']}
        }
      };
    }
  } else {
    // Default visualisation
    vis_options = {
      'Natural color': {
        description: 'Ground features appear in colors similar to their ' +
                     'appearance to the human visual system.',
        visParams: {gamma: [0.95, 1.1, 1], min: 0, max: 0.3, bands: ['B4', 'B3', 'B2']}
      }
    };
  }
  return vis_options;
};
app.debugSettings = function(){
  if(app.debug){
    app.skip_to_point_select = true;
    app.debug_start.panel.style().set('shown', true);
    app.intro.panel.style().set('shown', false);
    app.filters.panel.style().set('shown', true);
    app.date_chooser.panel.style().set('shown', false);
    app.year_picker.panel.style().set('shown', false);
    app.picker.panel.style().set('shown', false);
    app.vis.panel.style().set('shown', false);
    app.BCET.panel.style().set('shown', false);
    app.BCETBandSelect.panel.style().set('shown', false);
    app.regionSelect.panel.style().set('shown', false);
    app.PCABandSelect.panel.style().set('shown', false);
    app.PCA_Map_Layer.panel.style().set('shown', false);
    app.continueToPoint.panel.style().set('shown', false);
    app.chartBandSelect.panel.style().set('shown', false);
    app.pointSelect.panel.style().set('shown', false);
    app.export.panel.style().set('shown', false);
    var landsat8Toa = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR');
    app.COLLECTION_ID = 'LANDSAT/LC08/C01/T1_SR'
    app.CURRENT_IMAGE = app.convertToUint8(ee.Image(landsat8Toa.first()),app.spectralBands(ee.Image(landsat8Toa.first()).bandNames()));
    app.AOI = ee.Geometry.Rectangle(-118.457336, 38.011311, -116.542969, 37.037639);
    var AOI_coords = app.AOI.coordinates().get(0);
    app.AOI_outline = ee.Geometry.LineString(AOI_coords);
  } else {
    app.debug_start.panel.style().set('shown', false);
    app.intro.panel.style().set('shown', true);
    app.filters.panel.style().set('shown', true);
    app.year_picker.panel.style().set('shown', false);
    app.date_chooser.panel.style().set('shown', false);
    app.picker.panel.style().set('shown', false);
    app.vis.panel.style().set('shown', false);
    app.BCET.panel.style().set('shown', false);
    app.BCETBandSelect.panel.style().set('shown', false);
    app.regionSelect.panel.style().set('shown', false);
    app.PCABandSelect.panel.style().set('shown', false);
    app.PCA_Map_Layer.panel.style().set('shown', false);
    app.continueToPoint.panel.style().set('shown', false);
    app.chartBandSelect.panel.style().set('shown', false);
    app.pointSelect.panel.style().set('shown', false);
    app.export.panel.style().set('shown', false);
    app.AOI = false;
  }
};
app.debug_post_setup = function(){
  if(app.debug){
    app.manual_image.setValue(ee.String('LANDSAT/LE07/C01/T1_SR/LE07_041034_20020726'));
    app.manual_image_setup();
    if(app.skip_to_point_select){
      app.BCETRegion(false);
    }
  }
};
app.boot = function(){
  // DEBUG ROUTINE
  app.debug = false;
  app.createConstants();
  app.createHelpers();
  app.createInputs();
  app.createPanels();
  app.debugSettings();
  var main = ui.Panel({
    widgets: [
      app.debug_start.panel,
      app.intro.panel,
      app.filters.panel,
      app.year_picker.panel,
      app.date_chooser.panel,
      app.picker.panel,
      app.vis.panel,
      app.regionSelect.panel,
      app.BCET.panel,
      app.BCETBandSelect.panel,
      app.PCABandSelect.panel,
      app.PCA_Map_Layer.panel,
      app.continueToPoint.panel,
      app.chartBandSelect.panel,
      app.pointSelect.panel,
      // app.export.panel
    ],
    style: {width: '600px', padding: '8px'}
  });
  Map.setOptions('HYBRID');
  ui.root.insert(0, main);
};
app.boot();