var app = {};
// Dictionary for storing coordinate data
app.mapObjects = [];
var waterOcc = ee.Image("JRC/GSW1_0/GlobalSurfaceWater").select('occurrence'),
    jrc_data0 = ee.Image("JRC/GSW1_0/Metadata").select('total_obs').lte(0),
    waterOccFilled = waterOcc.unmask(0).max(jrc_data0),
    waterMask = waterOccFilled.lt(50);
var gsw = ee.Image("JRC/GSW1_0/GlobalSurfaceWater")
var change = gsw.select("change_abs");
var occurrence = gsw.select('occurrence');
var VIS_WATER_MASK = {
  palette: ['white', 'black']
};
app.project_variables = {
  title: 'Untitled',
  output_directory: '',
  IMAGE: '',
  region_bounds: []
};
app.cloud_limit = 0.5 // 50% cloud
// Edmonds Deltas
var edmonds_dat = ee.FeatureCollection("users/sbrooke14/delta_explorer/edmonds_data")
var edmonds_dat_alpha_sort = edmonds_dat.limit(edmonds_dat.size(), 'Name');
var edmonds_delta_ids = ee.List(edmonds_dat_alpha_sort.aggregate_array('Name'))
var edmonds_dat_list = edmonds_dat_alpha_sort.toList(edmonds_dat_alpha_sort.size())
var edmonds_colour = '1e9644'
// Jose and Austin's Avulsion Hunt
var jose_and_austin_dat = ee.FeatureCollection("users/sbrooke14/delta_explorer/jose_austin_av_hunt")
var jose_and_austin_alpha_sort = jose_and_austin_dat.limit(jose_and_austin_dat.size(), 'ID');
var ja_delta_ids = ee.List(jose_and_austin_alpha_sort.aggregate_array('ID'))
var jose_and_austin_list = jose_and_austin_alpha_sort.toList(jose_and_austin_alpha_sort.size())
var ja_colour = '#ed6939'
// Global Compilation (Brooke and Ganti)
var global_dat = ee.FeatureCollection("users/sbrooke14/delta_explorer/global_database_jan_2021")
var global_dat_alpha_sort = global_dat.limit(global_dat.size(), 'AV_ID_DATE');
var global_delta_ids = ee.List(global_dat_alpha_sort.aggregate_array('AV_ID_DATE'))
var global_dat_list = global_dat_alpha_sort.toList(global_dat_alpha_sort.size())
var global_colour = '7f1ce8'
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
        if(point1_x.getInfo() < point2_x.getInfo()){
          var xMax = point2_x;
          var xMin = point1_x;
        } else {
          var xMax = point1_x;
          var xMin = point2_x;         
        }
        if(point1_y.getInfo() < point2_y.getInfo()){
          var yMax = point2_y;
          var yMin = point1_y;        
        } else {
          var yMax = point1_y;
          var yMin = point2_y;
        }
        Map.addLayer(point, {color: 'FF0000'}, 'regionBottomRight');
        var region_bounds = [xMin, yMin, xMax, yMax];
        app.project_variables.region_bounds = region_bounds;
        print(region_bounds)
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
    // var yMax = app.top_left_lat.getValue();
    // var yMin = app.bottom_right_lat.getValue();
    // var xMin = app.top_left_lon.getValue();
    // var xMax = app.bottom_right_lon.getValue();
    var tl_lat = app.top_left_lat.getValue();
    var br_lat = app.bottom_right_lat.getValue();
    var tl_lon = app.top_left_lon.getValue();
    var br_lon = app.bottom_right_lon.getValue();
    if(tl_lat > br_lat){
      var yMax = tl_lat;
      var yMin = br_lat;
    } else {
      var yMax = br_lat;
      var yMin = tl_lat;
    }
    if(br_lon > tl_lon){
      var xMax = br_lon;
      var xMin = tl_lon;
    } else {
      var xMax = tl_lon;
      var xMin = br_lon;
    }
    if(yMax && yMin && xMax && xMin){
      var region_bounds = ee.List([xMin, yMin, xMax, yMax]);
      app.project_variables.region_bounds = region_bounds;
      app.AOI = ee.Geometry.Rectangle(region_bounds);
      var AOI_coords = app.AOI.coordinates().get(0);
      app.AOI_outline = ee.Geometry.LineString(AOI_coords);
      print(app.AOI)
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
};
app.BCET_Region_init = function(){
  app.BCET.panel.style().set('shown', true);
  app.regionSelect.panel.style().set('shown', false);
};
app.createInputs = function(){
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
app.delta_select_edmonds = ui.Select({
  items: edmonds_delta_ids.getInfo(),
  placeholder: 'Select Delta ID',
  onChange: function(key) {
    var idx = edmonds_delta_ids.indexOf(key)
    var feat = ee.Feature(edmonds_dat_list.get(idx))
    Map.setCenter(feat.geometry().coordinates().get(0).getInfo(), feat.geometry().coordinates().get(1).getInfo(), 12);
  }
});
app.delta_select_ja = ui.Select({
  items: ja_delta_ids.getInfo(),
  placeholder: 'Select Delta ID',
  onChange: function(key) {
    var idx = ja_delta_ids.indexOf(key)
    var feat = ee.Feature(jose_and_austin_list.get(idx))
    Map.setCenter(feat.geometry().coordinates().get(0).getInfo(), feat.geometry().coordinates().get(1).getInfo(), 12);
  }
});
app.delta_select_global = ui.Select({
  items: global_delta_ids.getInfo(),
  placeholder: 'Select Delta ID',
  onChange: function(key) {
    var idx = global_delta_ids.indexOf(key)
    var feat = ee.Feature(global_dat_list.get(idx))
    Map.setCenter(feat.geometry().coordinates().get(0).getInfo(), feat.geometry().coordinates().get(1).getInfo(), 12);
  }
});
app.setDeltaOptions = function(){
  var edmonds_delta_ids = ee.List(edmonds_dat.filterBounds(Map.getBounds(true)).aggregate_array('Name'))
  app.delta_select_edmonds.items().reset(edmonds_delta_ids.getInfo());
  var ja_delta_ids = ee.List(jose_and_austin_dat.filterBounds(Map.getBounds(true)).aggregate_array('ID'))
  app.delta_select_ja.items().reset(ja_delta_ids.getInfo());
  var global_delta_ids = ee.List(global_dat.filterBounds(Map.getBounds(true)).aggregate_array('AV_ID_DATE'))
  app.delta_select_global.items().reset(global_delta_ids.getInfo());
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
app.centreMarker = function(marker_id){
  var coords = app.coordData[marker_id];
  Map.setCenter(coords.get('lon').getInfo(), coords.get('lat').getInfo(), 12);
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
app.cloudSlider = ui.Slider({
  min: 0,
  max: 1,
  value: 0.5,
  step: 0.1,
  onChange: function(){
    app.cloud_limit = app.cloudSlider.getValue()
  },
  style: {stretch: 'horizontal'}
});
app.cloud_filter_slider = ui.Panel([
  ui.Label({
    value: 'Maximum cloud cover (1 = 100%)'
  }),
  app.cloudSlider,
],ui.Panel.Layout.flow('horizontal'));
// Create Interface
app.createPanels = function(){
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Delta Explorer',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('An application to view archive Landsat and Sentinel 2 imagery of deltas'),
      ui.Label({
        value:'Author: Sam Brooke (sbrooke@ucsb.edu)',
        style: {fontSize: '12px'}
      }),
      ui.Panel([
        ui.Label({value:'Edmonds Database', style: {padding: '5px 5px 5px 5px', color:'white', fontSize: '12px', backgroundColor: edmonds_colour}}),
        app.delta_select_edmonds]
      , ui.Panel.Layout.flow('horizontal')),
      ui.Panel([
        ui.Label({value:'Jose and Austin Database', style: {padding: '5px 5px 5px 5px', color:'white', fontSize: '12px', backgroundColor: ja_colour}}),
        app.delta_select_ja]
      , ui.Panel.Layout.flow('horizontal')),
      ui.Panel([
        ui.Label({value:'Current Global Database', style: {padding: '5px 5px 5px 5px', color:'white', fontSize: '12px', backgroundColor: global_colour}}),
        app.delta_select_global]
      , ui.Panel.Layout.flow('horizontal')),
      ui.Button({
        label: 'Limit delta list based on viewport',
        onClick: function(){
          app.setDeltaOptions()
        }
      }),
      ui.Button({
        label: 'Reset View (zoom out to full globe)',
        onClick: function(){
          Map.setCenter(0, 0, 2);
          app.setDeltaOptions()
        }
      }),
      ui.Button({
        label: 'Clear imagery from map',
        onClick: function(){
          app.refreshMapLayer(true)
        }
      }),
      app.cloud_filter_slider
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
      width: '250px'
    }
  });
  /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('Add Imagery', {fontWeight: 'bold'}),
      ui.Label('1) Browse Imagery Sources', {fontWeight: 'bold'}),
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
      ui.Label('2) Choose scene from date range:', {fontWeight: 'bold'}),
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
      onChange: function(){
        app.refreshMapLayer(false)
      }
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
      ui.Label('3) Choose an image', {fontWeight: 'bold'}),
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
        app.refreshMapLayer(false);
      }
    })
  };
  /* The panel for the visualization section with corresponding widgets. */
  app.vis.panel = ui.Panel({
    widgets: [
      // ui.Label('4) Visualize', {fontWeight: 'bold'}),
      // app.vis.select,
      // app.vis.label,
    ],
    style: app.SECTION_STYLE
  });
  // Default the select to the first value.
  app.vis.select.setValue(app.vis.select.items().get(0));
  var water_slider = ui.Slider();
  water_slider.setValue(0.9);  // Set a default value.
  water_slider.onChange(function(value) {
    var water_mask = occurrence.gt(value*100).unmask(0);
    app.clearLayerAssets('Water occurrence mask')
    Map.addLayer({
      eeObject: water_mask,
      visParams: VIS_WATER_MASK,
      shown:true,
      name: 'Water occurrence mask'
    });
  });
  app.water_panel = ui.Panel({
    widgets:[
      ui.Label('Water Occurrence Mask', {fontWeight: 'bold'}),
      water_slider
    ]
  });
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
        app.filters.endDate.setValue(app.today);       
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
      .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', app.cloud_limit*100))
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
        filtered = filtered.filterMetadata('CLOUD_COVER_LAND', 'less_than', app.cloud_limit*100);
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
  app.refreshMapLayer = function(clear_all) {
    if(clear_all){
      Map.clear();
      Map.setOptions('HYBRID');
      Map.addLayer(edmonds_dat, {color: edmonds_colour, pointRadius:10, strokeWidth: 0.1}, 'Edmonds Deltas');
      Map.addLayer(jose_and_austin_dat, {color: ja_colour, pointRadius:10, strokeWidth: 0.1}, 'Jose and Austin Deltas');
      Map.addLayer(global_dat, {color: global_colour, pointRadius:10, strokeWidth: 0.1}, 'Current Global Database');
    }
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
      app.CURRENT_IMAGE = img.updateMask(waterMask);
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
    var collection_params = app.COLLECTION_ID.split('/');
    var s = app.stretch_std(app.CURRENT_IMAGE, 2);
    var vis_options = {};
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
            visParams: {gamma: [.5, .5, .5], min: min_nat.getInfo(), max: max_nat.getInfo(), bands: ['B4', 'B3', 'B2']}
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
            visParams: {gamma: [.5, .5, .5], min: min_nat.getInfo(), max: max_nat.getInfo(), bands: ['B3', 'B2', 'B1']}
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
            visParams: {gamma: [.5, .5, .5], min: min_nat.getInfo(), max: max_nat.getInfo(), bands: ['B3', 'B2', 'B1']}
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
          visParams: {gamma: [.5, .5, .5], min: min_nat.getInfo(), max: max_nat.getInfo(), bands: ['B4', 'B3', 'B2']}
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
    app.intro.panel.style().set('shown', false);
    app.filters.panel.style().set('shown', true);
    app.date_chooser.panel.style().set('shown', false);
    app.year_picker.panel.style().set('shown', false);
    app.picker.panel.style().set('shown', false);
    app.vis.panel.style().set('shown', false);
    var landsat8Toa = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR');
    app.COLLECTION_ID = 'LANDSAT/LC08/C01/T1_SR'
    app.CURRENT_IMAGE = ee.Image(landsat8Toa.first()).updateMask(waterMask);
    app.AOI = ee.Geometry.Rectangle(-118.457336, 38.011311, -116.542969, 37.037639);
    var AOI_coords = app.AOI.coordinates().get(0);
    app.AOI_outline = ee.Geometry.LineString(AOI_coords);
  } else {
    app.intro.panel.style().set('shown', true);
    app.filters.panel.style().set('shown', true);
    app.year_picker.panel.style().set('shown', false);
    app.date_chooser.panel.style().set('shown', false);
    app.picker.panel.style().set('shown', false);
    app.vis.panel.style().set('shown', false);
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
      app.intro.panel,
      app.filters.panel,
      app.year_picker.panel,
      app.date_chooser.panel,
      app.picker.panel,
      app.vis.panel,
      app.water_panel
    ],
    style: {width: '400px', padding: '8px'}
  });
  Map.addLayer(edmonds_dat, {color: edmonds_colour, pointRadius:10, strokeWidth: 0.1}, 'Edmonds Deltas');
  Map.addLayer(jose_and_austin_dat, {color: ja_colour, pointRadius:10, strokeWidth: 0.1}, 'Jose and Austin Deltas');
  Map.addLayer(global_dat, {color: global_colour, pointRadius:10, strokeWidth: 0.1}, 'Current Global Database');
  // Map.addLayer(edmonds_dat_rivers, {color: '00FFFF', pointRadius:10, strokeWidth: 0.1}, 'Edmonds Deltas');
  var VIS_CHANGE = {
      min:-50,
      max:50,
      palette: ['red', 'black', 'limegreen']
  };
  var VIS_OCCURRENCE = {
    min:0,
    max:100,
    palette: ['red', 'blue']
  };
  //////////////////////////////////////////////////////////////
  // Calculations
  //////////////////////////////////////////////////////////////
  // Create a water mask layer, and set the image mask so that non-water areas
  // are opaque.
  var water_mask = occurrence.gt(50).unmask(0);
  Map.addLayer({
    eeObject: occurrence.updateMask(occurrence.divide(100)),
    name: "Water Occurrence (1984-2015)",
    visParams: VIS_OCCURRENCE
  });
  Map.addLayer({
    eeObject: change,
    visParams: VIS_CHANGE,
    shown:false,
    name: 'Surface water change (1984-2015)'
  });
  Map.addLayer({
    eeObject: water_mask,
    visParams: VIS_WATER_MASK,
    shown:false,
    name: 'Water occurrence mask'
  });
  Map.setOptions('HYBRID');
  ui.root.insert(0, main);
  Map.setCenter(0, 0, 2);
};
app.boot();