// Display a grid of linked maps, each with a different visualization.
//------------------------------USER INPUTS-------------------------
// The namespace for our application.  All the state is kept in here.
var app = {};
/** Creates the UI panels. */
app.createPanels = function() {
  // Create a panel to hold title, intro text, chart and legend components.
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: '2CMV Explorer',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('This app allows you to filter for pertinent S1 images, ' +
               'create a Two Color Multiview (2CMV) image, ' +
               'and output vectors of areas of highest change')
    ])
  };
  /* The collection filter controls. */
  app.filters = {
    //mapCenter: ui.Checkbox({label: 'Filter to map center', value: true}),
    DOI: ui.Textbox('YYYY-MM-DD', '2020-08-04'),//'YYYY-MM-DD'),
    Delta_Day: ui.Textbox('DD', '4'),//'YYYY-MM-DD'), //each S1 stack has a 6 or 12 day repeat cycle
    Lat: ui.Textbox('DMS', app.LAT),//'DMS'),
    Lon: ui.Textbox('DMS', app.LON),
    Radius: ui.Textbox('KM', '1'),//app.LON),
    applyButton: ui.Button('Apply filters', app.applyFilters),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('Select filters', {fontWeight: 'bold'}),
      ui.Panel([ui.Label('Date of Interest:', app.HELPER_TEXT_STYLE), app.filters.DOI, ui.Label('Delta Day(s):', app.HELPER_TEXT_STYLE), app.filters.Delta_Day], ui.Panel.Layout.flow('vertical')),  
      ui.Panel([ui.Label('Lat:', app.HELPER_TEXT_STYLE), app.filters.Lat, ui.Label('Lon:', app.HELPER_TEXT_STYLE), app.filters.Lon, ui.Label('Radius(km):', app.HELPER_TEXT_STYLE), app.filters.Radius], ui.Panel.Layout.flow('vertical')), 
      //app.filters.mapCenter,
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
      //placeholder: 'Select an image ID',
      onChange: app.refreshMapLayer
    }),
  };
  /* The panel for the picker section with corresponding widgets. */
  app.picker.panel = ui.Panel({
    widgets: [
      ui.Label('Select a Reference (before) image', {fontWeight: 'bold'}),
      ui.Panel([
        app.picker.select,
        //app.picker.centerButton
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  /* The image picker section. */
  app.pickerM = {
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      //placeholder: 'Select an image ID',
      onChange: app.refreshMapLayer
    }),
  };
  app.pickerM.panel = ui.Panel({
    widgets: [
      ui.Label('Select a Match (after) Image', {fontWeight: 'bold'}),
      ui.Panel([
        app.pickerM.select,
        //app.pickerM.centerButton
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  /* The visualization section. */
  app.vis = {
    label: ui.Label(),
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      placeholder: 'Visualization Options',
      items: Object.keys(app.VIS_OPTIONS),
      onChange: function() {
        // Update the label's value with the select's description.
        var option = app.VIS_OPTIONS[app.vis.select.getValue()];
        app.vis.label.setValue(option.description);
        // Refresh the map layer.
        app.refreshMapVisLayer();
      }
    })
  };
  /* The panel for the visualization section with corresponding widgets. */
  app.vis.panel = ui.Panel({
    widgets: [
      ui.Label('4) Select a visualization', {fontWeight: 'bold'}),
      app.vis.select,
      app.vis.label
    ],
    style: app.SECTION_STYLE
  });
  // Default the select to the first value.
  app.vis.select.setValue(app.vis.select.items().get(0));
};
/** Creates the app helper functions. */
app.createHelpers = function() {
  /**
   * Enables or disables loading mode.
   * @param {boolean} enabled Whether loading mode is enabled.
   */
  app.setLoadingMode = function(enabled) {
    // Set the loading label visibility to the enabled mode.
    app.filters.loadingLabel.style().set('shown', enabled);
    // Set each of the widgets to the given enabled mode.
    var loadDependentWidgets = [
      app.vis.select,
      app.filters.DOI,
      app.filters.Delta_Day,
      app.filters.Lat,
      app.filters.Lon,
      app.filters.Radius,
      app.filters.applyButton,
      //app.filters.mapCenter,
      app.picker.select,
      app.pickerM.select,
      //app.export.button
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  };
  /** Applies the selection filters currently selected in the UI. */
  app.applyFilters = function() {
    app.LAT = app.filters.Lat.getValue();
    app.LON = app.filters.Lon.getValue();
    app.RAD = app.filters.Radius.getValue();
    if (isNaN(app.LAT) || isNaN(app.LON)) {
      print('Please enter a valid lat/lon')
    } else if (Number(app.LAT) > 90.0 || Number(app.LAT) < -90.0  || Number(app.LON) > 180.0 || Number(app.LON) < -180){
      print('Please enter a valid lat/lon')
    } else {
      app.setLoadingMode(true);
      app.POINT = ee.Geometry.Point(parseFloat(app.LON), parseFloat(app.LAT))
      app.BUFFER = app.POINT.buffer(Number(app.RAD)*1000)
      var filtered = ee.ImageCollection(app.COLLECTION_ID).filterBounds(app.POINT);
      // filter for instrument mode and dual pol (if image has VH or HV, it will have co pol)
      filtered = filtered.filter(ee.Filter.eq('instrumentMode', app.INSTRUMENT_MODE));
      filtered = filtered.filter(ee.Filter.listContains('transmitterReceiverPolarisation', app.TR_POL[1]));
      // Set filter variables and get images for desired dates
      var filteredM = filtered;
      var filteredR = filtered;
      var DOI = app.filters.DOI.getValue();
      if (DOI) DOI = ee.Date(DOI);
      var match = DOI.advance(parseInt(app.filters.Delta_Day.getValue()), 'day');
      if (match) match = ee.Date(match);
      var ref = DOI.advance(-parseInt(app.filters.Delta_Day.getValue()), 'day');
      if (ref) ref = ee.Date(ref);
      if (DOI) filteredM = filtered.filterDate(DOI, match);
      if (DOI) filteredR = filtered.filterDate(ref, DOI);
      // Get the list of computed Ref ids.
      var computedRIds = filteredR
          .limit(app.IMAGE_COUNT_LIMIT)
          .reduceColumns(ee.Reducer.toList(), ['system:index'])
          .get('list');
      //print(computedRIds)
      // Get the list of computed ids.
      var computedMIds = filteredM
          .limit(app.IMAGE_COUNT_LIMIT)
          .reduceColumns(ee.Reducer.toList(), ['system:index'])
          .get('list');
      //print(computedMIds)
      computedRIds.evaluate(function(ids) {
        // Update the image picker with the given list of ids.
        app.setLoadingMode(false);
        app.picker.select.items().reset(ids);
        // Default the image picker to the first id.
        app.picker.select.setValue(app.picker.select.items().get(0));
        //print(app.picker.select.items().get(0))
      });
      computedMIds.evaluate(function(ids) {
        // Update the image picker with the given list of ids.
        app.setLoadingMode(false);
        app.pickerM.select.items().reset(ids);
        // Default the image picker to the first id.
        app.pickerM.select.setValue(app.pickerM.select.items().get(0));
        //print(app.pickerM.select.items().get(0))
      });
    }
    Map.setCenter(parseFloat(app.LON), parseFloat(app.LAT), app.ZOOM-2);
    app.vis.select.setValue(app.vis.select.items().get(0));
  };
  /** Refreshes the current map layer based on the UI widget states. */
  app.refreshMapLayer = function() {
    var referenceID = app.picker.select.getValue();
    var matchID = app.pickerM.select.getValue();
    print(referenceID)
    print(matchID)
    if (referenceID && matchID) {
      // If an image id is found, create an image.
      //print(referenceID)
      //print(matchID)
      // If an image id is found, create an image.
      app.ORIGINAL_REFERENCE = ee.Image(app.COLLECTION_ID + '/' + referenceID).clip(app.BUFFER);
      app.ORIGINAL_MATCH = ee.Image(app.COLLECTION_ID + '/' + matchID).clip(app.BUFFER);
      app.CMV = ee.Image.cat([app.ORIGINAL_REFERENCE,app.ORIGINAL_MATCH,app.ORIGINAL_MATCH])//.focal_median({radius: scale, units: 'meters' });
      //Apply SAR water mask
      var SAR_water_mask = app.ORIGINAL_REFERENCE.gt(app.SAR_WATER_MASK).and(app.ORIGINAL_MATCH.gt(app.SAR_WATER_MASK)) //make sure we mask super dark pixels in both ref and match
      app.REFERENCE = app.ORIGINAL_REFERENCE.updateMask(SAR_water_mask).updateMask(app.HANSEN_WATER_MASK)
      app.MATCH = app.ORIGINAL_MATCH.updateMask(SAR_water_mask).updateMask(app.HANSEN_WATER_MASK)
      app.DIFF = app.MATCH.subtract(app.REFERENCE)
      app.DIFF = app.DIFF.convolve(app.SMOOTH)
      require('users/ecatcom1/CA:GEE_Seminar/Make_Histogram').Make_Histogram(app.DIFF)
      //var diff_minMax = require('users/ecatcom1/CA:GEE_Seminar/stretch_image').stretch_std(app.DIFF, 1)
      var arrive_threshold = app.DIFF.reduceRegion({
        reducer: ee.Reducer.intervalMean(app.ARRIVAL_INTERVAL[0],app.ARRIVAL_INTERVAL[1]),
        bestEffort: true
      });
      var depart_threshold = app.DIFF.reduceRegion({
        reducer: ee.Reducer.intervalMean(app.DEPARTURE_INTERVAL[0],app.DEPARTURE_INTERVAL[1]),
        bestEffort: true
      });
      app.arrive_threshold = {VH: 9, VV: 9, angle: 40}
      app.depart_threshold = {VH: -9, VV: -10, angle: 42}
      var arrive = require('users/ecatcom1/CA:GEE_Seminar/Apply_Diff_Threshold_v2').Apply_Diff_Threshold(app.DIFF, app.TR_POL, app.arrive_threshold, 'arrival')
      var depart = require('users/ecatcom1/CA:GEE_Seminar/Apply_Diff_Threshold_v2').Apply_Diff_Threshold(app.DIFF, app.TR_POL, app.depart_threshold, 'departure')
      app.ARRIVE = arrive.convolve(app.HEATMAP)
      app.DEPART = depart.convolve(app.HEATMAP)
      app.S2 = require('users/ecatcom1/CA:GEE_Seminar/Get_S2_v3').Get_S2(app.filters.DOI.getValue(), [parseFloat(app.LON),parseFloat(app.LAT)], app.BUFFER, true); //dates, latLon, latLonBounds, cloudfilter
      print(app.S2)
      Map.setCenter(parseFloat(app.LON), parseFloat(app.LAT), app.ZOOM);         
      // Add the image to the map with the corresponding visualization options.
      Map.style().set('cursor', 'crosshair');
      Map.onClick(function(coords) {
        // Update the lon/lat panel with values from the click event.
        app.filters.Lon.setValue(coords.lon.toFixed(2)),
        app.filters.Lat.setValue(coords.lat.toFixed(2));
        // Add a red dot for the point clicked on.
        var click_point = ee.Geometry.Point(Number(app.filters.Lon.getValue()), Number(app.filters.Lat.getValue()));
        var dot = ui.Map.Layer(click_point, {color: 'FF0000'}, 'POI');
        Map.layers().set(0, dot);
      })
      var currentPoint = ui.Map.Layer(app.POINT, {}, 'POI')
      Map.layers().set(1, currentPoint); 
      // Create an histogram.
      //var histo = require('users/ecatcom1/CA:GEE_Seminar/Make_Histogram').Make_Histogram(app.DIFF) 
      //app.pickerM.panel.widgets().set(2, histo);
      //if (lat!='DMS' && lon!='DMS'){
      //  var point = ee.Geometry.Point(parseFloat(lon), parseFloat(lat))
      //  Map.addLayer(point, {}, 'POI')
      //}      
    } else if (referenceID) {
      print('No Match ID; change date range or AOI')
    } else if (matchID) {
      print('No Reference ID; change date range or AOI')
    } else {
      print('No imagery available for chosen date range or AOI')
    }
    app.vis.select.setValue(app.vis.select.items().get(0));
  };
  /** Refreshes the current map layer based on the UI widget states. */
  app.refreshMapVisLayer = function() {
    Map.clear();
    var referenceID = app.picker.select.getValue();
    var matchID = app.pickerM.select.getValue();
    if (referenceID && matchID) {
      // Add the image to the map with the corresponding visualization options.
      var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
      Map.setCenter(parseFloat(app.LON), parseFloat(app.LAT), app.ZOOM);      
      //var minBlue = arrive.reduceRegion({reducer: ee.Reducer.min(), geometry: arrive.geometry(), scale:10, maxPixels:1e9})
      //print(minBlue)
      if (visOption.imType=='2CMV'){
        //var arrive_minMax = require('users/ecatcom1/CA:GEE_Seminar/stretch_image').stretch_std(app.ARRIVE, app.STRETCH)
        //var depart_minMax = require('users/ecatcom1/CA:GEE_Seminar/stretch_image').stretch_std(app.DEPART, app.STRETCH)
        Map.addLayer(app.ORIGINAL_REFERENCE, app.VIS_OPTIONS['Reference'].visParams, 'Reference: ' + referenceID, false);  
        Map.addLayer(app.ORIGINAL_MATCH, app.VIS_OPTIONS['Match'].visParams, 'Match: ' + matchID, false); 
        Map.addLayer(app.CMV, visOption.visParams, '2CMV');
        Map.addLayer(app.DIFF, app.VIS_OPTIONS['Difference (M-R)'].visParams, 'Difference Image', false);        
        Map.addLayer(app.ARRIVE, {bands:['VV'], palette:app.BLUE_GRADIENT, min:app.arrive_threshold['VV'], max:15}, 'Significant Arrivals');
        Map.addLayer(app.DEPART, {bands:['VV'], palette:app.RED_GRADIENT, min: -30, max:app.depart_threshold['VV']}, 'Significant Departures');
        Map.addLayer(app.S2[0], {gamma: 1.5, min: 0, max: 0.3, bands: ['B4', 'B3', 'B2']}, 'S2 Natural Color Before (B4/B3/B2)', false);        
        Map.addLayer(app.S2[1], {gamma: 1.5, min: 0, max: 0.3, bands: ['B4', 'B3', 'B2']}, 'S2 Natural Color After (B4/B3/B2)', false);
        Map.addLayer(app.POINT, {}, 'POI')
        Map.style().set('cursor', 'crosshair');
        Map.onClick(function(coords) {
          // Update the lon/lat panel with values from the click event.
          app.filters.Lon.setValue(coords.lon.toFixed(2)),
          app.filters.Lat.setValue(coords.lat.toFixed(2));
          // Add a red dot for the point clicked on.
          var point = ee.Geometry.Point(Number(app.filters.Lon.getValue()), Number(app.filters.Lat.getValue()));
          var dot = ui.Map.Layer(point, {color: 'FF0000'}, 'POI');
          Map.layers().set(0, dot);
        })
      } else if (visOption.imType=='clear'){
        Map.addLayer(app.POINT, {}, 'POI')
        Map.style().set('cursor', 'crosshair');
        Map.onClick(function(coords) {
          // Update the lon/lat panel with values from the click event.
          app.filters.Lon.setValue(coords.lon.toFixed(2)),
          app.filters.Lat.setValue(coords.lat.toFixed(2));
          // Add a red dot for the point clicked on.
          var point = ee.Geometry.Point(Number(app.filters.Lon.getValue()), Number(app.filters.Lat.getValue()));
          var dot = ui.Map.Layer(point, {color: 'FF0000'}, 'POI');
          Map.layers().set(0, dot);
        })
      }else if (visOption.imType=='diff'){
        Map.addLayer(app.DIFF, visOption.visParams, 'Difference Image');   
        Map.addLayer(app.POINT, {}, 'POI')
        Map.style().set('cursor', 'crosshair');
        Map.onClick(function(coords) {
          // Update the lon/lat panel with values from the click event.
          app.filters.Lon.setValue(coords.lon.toFixed(2)),
          app.filters.Lat.setValue(coords.lat.toFixed(2));
          // Add a red dot for the point clicked on.
          var point = ee.Geometry.Point(Number(app.filters.Lon.getValue()), Number(app.filters.Lat.getValue()));
          var dot = ui.Map.Layer(point, {color: 'FF0000'}, 'POI');
          Map.layers().set(0, dot);
        })
      } else if (visOption.imType=='ref'){
        Map.addLayer(app.ORIGINAL_REFERENCE, visOption.visParams, referenceID);        
        Map.addLayer(app.POINT, {}, 'POI')
        Map.style().set('cursor', 'crosshair');
        Map.onClick(function(coords) {
          // Update the lon/lat panel with values from the click event.
          app.filters.Lon.setValue(coords.lon.toFixed(2)),
          app.filters.Lat.setValue(coords.lat.toFixed(2));
          // Add a red dot for the point clicked on.
          var point = ee.Geometry.Point(Number(app.filters.Lon.getValue()), Number(app.filters.Lat.getValue()));
          var dot = ui.Map.Layer(point, {color: 'FF0000'}, 'POI');
          Map.layers().set(0, dot);
        })
      } else if (visOption.imType=='match'){
        Map.addLayer(app.ORIGINAL_MATCH, visOption.visParams, matchID);        
        Map.addLayer(app.POINT, {}, 'POI')
        Map.style().set('cursor', 'crosshair');
        Map.onClick(function(coords) {
          // Update the lon/lat panel with values from the click event.
          app.filters.Lon.setValue(coords.lon.toFixed(2)),
          app.filters.Lat.setValue(coords.lat.toFixed(2));
          // Add a red dot for the point clicked on.
          var point = ee.Geometry.Point(Number(app.filters.Lon.getValue()), Number(app.filters.Lat.getValue()));
          var dot = ui.Map.Layer(point, {color: 'FF0000'}, 'POI');
          Map.layers().set(0, dot);
        })
      } else if (visOption.imType=='s2_nat'){
        Map.addLayer(app.S2[0], visOption.visParams, 'S2 Natural Color Before (B4/B3/B2)');        
        Map.addLayer(app.S2[1], visOption.visParams, 'S2 Natural Color After (B4/B3/B2)'); 
      }
    } else{
      print('Make sure to select both reference and match images')
    }
  }
};
/** Creates the app constants. */
app.createConstants = function() {
  app.COLLECTION_ID = 'COPERNICUS/S1_GRD';
  app.INSTRUMENT_MODE = 'IW';
  app.TR_POL = ['VV', 'VH']
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.IMAGE_COUNT_LIMIT = 10;
  app.VIS_OPTIONS = {
    'AOI': {
      imType: 'clear',
      description: '',
      visParams: {}
    },
    '2CMV Analysis': {
      imType: '2CMV',
      description: 'Red: reference, Green: match, Blue: match',
      visParams: {gamma: 1, min: -25, max: 25, bands: ['VV', 'VV_1', 'VV_2']}
    },
    'Reference': {
      imType: 'ref',
      description: 'Reference Image/First Image',
      visParams: {gamma: 1, min: -25, max: 25, bands: ['VV']}
    },
    'Match': {
      imType: 'match',
      description: 'Match image/Second Image',
      visParams: {gamma: 1, min: -25, max: 25, bands: ['VV']}
    },
    'Difference (M-R)': {
      imType: 'diff',
      description: 'Difference image between match and reference',
      visParams: {bands: ['VV'], min: -30, max: 30}
    },
      'S2 Natural Color (B4/B3/B2)': {
      imType: 's2_nat',
      description: 'Sentinel-2 natural color image: R:B4, G:B3, B:B2',
      visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B4', 'B3', 'B2']}
    },
  };
  app.LAT = 33.902
  app.LON = 35.52
  app.ZOOM = 15
  app.LATLONBOUNDS = [2, 2]
  app.BLUE = ['000000', '0000FF']
  app.BLUE_GRADIENT = ['blue', 'navy', 'purple']
  app.RED = ['FF0000', '000000']
  app.RED_GRADIENT = ['red', 'orange', 'yellow']  
  //what % of pixel value mean do u want to use to define change
  app.ARRIVAL_INTERVAL = [95, 100]
  app.DEPARTURE_INTERVAL = [100-app.ARRIVAL_INTERVAL[1],100-app.ARRIVAL_INTERVAL[0]]
  app.STRETCH = 3
  app.KERNEL_RADIUS = 14 //meters
  app.BOXCAR = ee.Kernel.square({radius: app.KERNEL_RADIUS,units: 'meters',normalize: false}) //smoothing filter to use
  app.HEATMAP = ee.Kernel.circle({radius: app.KERNEL_RADIUS,units: 'meters',normalize: true})
  app.SMOOTH = ee.Kernel.circle({radius: 10,units: 'meters',normalize: true})
  var hansenImage = ee.Image("UMD/hansen/global_forest_change_2019_v1_7");
  // Select the land/water mask.
  var datamask = hansenImage.select('datamask');
  // Create a binary mask.
  app.HANSEN_WATER_MASK = datamask.eq(1);
  app.SAR_WATER_MASK = -23
}; 
/** Creates the application interface. */
app.boot = function() {
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.filters.panel,
      app.picker.panel,
      app.pickerM.panel,
      app.vis.panel
    ],
    style: {width: '20%', padding: '8px'}
  });
  var right_map = ui.root.widgets().get(0)
  // Create a SplitPanel to hold the adjacent, linked maps.
  var splitPanel = ui.SplitPanel({
    firstPanel: main,
    secondPanel: right_map,
    orientation: 'horizontal',
    wipe: false,
    style: {stretch: 'both'}
  });
  // Set the SplitPanel as the only thing in the UI root.
  ui.root.widgets().reset([splitPanel]);
  right_map.setCenter(0, 0, 2);  
  Map.style().set('cursor', 'crosshair');
  Map.onClick(function(coords) {
    // Update the lon/lat panel with values from the click event.
    app.filters.Lon.setValue(coords.lon.toFixed(2)),
    app.filters.Lat.setValue(coords.lat.toFixed(2));
    // Add a red dot for the point clicked on.
    var point = ee.Geometry.Point(Number(app.filters.Lon.getValue()), Number(app.filters.Lat.getValue()));
    var dot = ui.Map.Layer(point, {color: 'FF0000'}, 'POI');
    Map.layers().set(0, dot);
  })
  //ui.root.insert(0, main);
  //app.applyFilters();
};
app.boot();