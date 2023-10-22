// Create the application title bar.
// Build the thumbnail display panel
var titlePanel = ui.Panel([
  ui.Label({ value: 'MODIS Vegetation Time Series',
             style: {fontWeight: 'bold',
                     fontSize: '40px',
                    // margin: '20px 5px', 
                    // height: '50px',
                    // width: '50px',
                     color:'red',      
                     backgroundColor: '#CFF992',
                    // border: '1px solid black',
                     fontFamily :'serif'}
            }),
  ui.Label('Developed by INRS, Centre Eau Terre Environnrment, Group Geo-AI',{backgroundColor : '#CFF991'})
                        ],'',{
                     backgroundColor: '#CFF991',
                     border: '4px solid black',
                     fontFamily :'serif'});
Map.add(titlePanel)
// Configure the map.
var centerDefult=[-71.50,46.9];
Map.style().set('cursor', 'crosshair');
// Set bands to be extracted from Modis 
var bandNames = ['NDVI','EVI', 'DetailedQA'] ;// 0-axis variation.
// Make a palette: a list of hex strings.
var palette = ['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718',
               '74A901', '66A000', '529400', '3E8601', '207401', '056201',
               '004C00', '023B01', '012E01', '011D01', '011301'];
// Load and display NDVI data.
// Load MODIS MOD13Q1 dataset.
var MOD13Q1 = ee.ImageCollection('MODIS/006/MOD13Q1')
  .select(bandNames);
// Load MODIS MYD13Q1 dataset.
var MYD13Q1 = ee.ImageCollection('MODIS/006/MYD13Q1')
  .select(bandNames);
// merge collections
var MOD_merged = MOD13Q1.merge(MYD13Q1);
// sort by date
var MOD_merge_sorted = MOD_merged.sort("system:time_start");
var addTime= function(image){
  return image.addBands(image.metadata('system:time_start').divide(1e18).rename('time'));
};
MOD_merge_sorted = MOD_merge_sorted.map(addTime)
print(MOD_merge_sorted.limit(5))
// Smoothing the whole images 
var join = ee.Join.saveAll({
  matchesKey: 'images'
});
var timeField = 'system:time_start';
var diffFilter = ee.Filter.maxDifference({
  difference: 1000 * 60 * 60 * 24 * 17,
  leftField: timeField, 
  rightField: timeField
});
var threeNeighborJoin = join.apply({
  primary: MOD_merge_sorted, 
  secondary: MOD_merge_sorted, 
  condition: diffFilter
});
var smoothed = ee.ImageCollection(threeNeighborJoin.map(function(image) {
  var collection = ee.ImageCollection.fromImages(image.get('images'));
  return ee.Image(image).addBands(collection.mean());
}));
// A UI to interactively filter a collection, select an individual image
// from the results, display it with a variety of visualizations, and export it.
// The namespace for our application.  All the state is kept in here.
var app = {};
/** Creates the UI panels. */
app.createPanelsLeft = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'MODIS Vegetation Index',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('This app allows you to filter and export results ' +
               'from the MOD13 and MYD13')
    ])
  };
  /* The collection filter controls. */
  app.filters = {
    mapCenter: ui.Checkbox({label: 'Filter to map center', value: true}),
    center:  ui.Textbox('DD.[MM][ss] , DD.[MM][ss]', '-71.51,46.9'),
    startDate: ui.Textbox('YYYY-MM-DD', '2019-05-09'),
    endDate: ui.Textbox('YYYY-MM-DD', '2019-09-01'),
    applyButton: ui.Button('Apply filters', app.applyFilters),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('1) Select filters', {fontWeight: 'bold'}),
      ui.Label('Start date', app.HELPER_TEXT_STYLE), app.filters.startDate,
      ui.Label('End date', app.HELPER_TEXT_STYLE), app.filters.endDate,
      ui.Label('Center', app.HELPER_TEXT_STYLE),app.filters.center,
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
    }),
    // Create a button that centers the map on a given object.
    centerButton: ui.Button('Center on map', function() {
      Map.centerObject(Map.layers().get(0).get('eeObject'));
    })
  };
  /* The panel for the picker section with corresponding widgets. */
  app.picker.panel = ui.Panel({
    widgets: [
      ui.Label('2) Select an image', {fontWeight: 'bold'}),
      ui.Panel([
        app.picker.select,
        app.picker.centerButton
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
      ui.Label('3) Select a visualization', {fontWeight: 'bold'}),
      app.vis.select,
      app.vis.label
    ],
    style: app.SECTION_STYLE
  });
  // Default the select to the first value.
  app.vis.select.setValue(app.vis.select.items().get(0));
  /* The export section. */
  app.export = {
    button: ui.Button({
      label: 'Export the current image to Drive',
      // React to the button's click event.
      // onClick: function() {
      //   // Select the full image id.
      //   var imageIdTrailer = app.picker.select.getValue();
      //   var imageId = app.COLLECTION_ID + '/' + imageIdTrailer;
      //   // Get the visualization options.
      //   var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
      //   // Export the image to Drive.
      //   Export.image.toDrive({
      //     image: ee.Image(imageId).select(visOption.visParams.bands),
      //     description: 'Export-' + imageIdTrailer,
      //   });
      // }
    })
  };
  /* The panel for the export section with corresponding widgets. */
  app.export.panel = ui.Panel({
    widgets: [
      ui.Label('4) Start an export', {fontWeight: 'bold'}),
      app.export.button
    ],
    style: app.SECTION_STYLE
  });
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
      app.filters.startDate,
      app.filters.endDate,
      app.filters.applyButton,
      app.filters.mapCenter,
      app.filters.center,
      app.picker.select,
      app.picker.centerButton,
      app.export.button
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  };
  /** Applies the selection filters currently selected in the UI. */
  app.applyFilters = function() {
    app.setLoadingMode(true);
    app.FILTERED = app.COLLECTION
    // Set filter variables.
    var start = app.filters.startDate.getValue();
    if (start) start = ee.Date(start);
    var end = app.filters.endDate.getValue();
    if (end) end = ee.Date(end);
    var center = app.filters.center.getValue().split(',')
    if (center) {
      center = [ee.Number.parse(center[0]),ee.Number.parse(center[1])];
      center = ee.Geometry.Point(center); 
                }
    // if (ee.Filter.eq(center.type(),'Point')) center = ee.Geometry.Point(center);
    if (start) app.FILTERED = app.FILTERED.filterDate(start, end);
    // Filter bounds to the map if the checkbox is marked.
    if (app.filters.mapCenter.getValue()) {
      app.FILTERED = app.FILTERED.filterBounds(Map.getCenter());
    } else {
            Map.centerObject(center,8)
            app.FILTERED = app.FILTERED.filterBounds(center);
    }
    // Get the list of computed ids.
    var computedIds = app.FILTERED
        .limit(app.IMAGE_COUNT_LIMIT)
        .reduceColumns(ee.Reducer.toList(), ['system:index'])
        .get('list');
    computedIds.evaluate(function(ids) {
      // Update the image picker with the given list of ids.
      app.setLoadingMode(false);
      app.picker.select.items().reset(ids);
      // Default the image picker to the first id.
      app.picker.select.setValue(app.picker.select.items().get(0));
    });
  };
  /** Refreshes the current map layer based on the UI widget states. */
  app.refreshMapLayer = function() {
    // Map.clear();
    var imageId = app.picker.select.getValue();
    if (imageId) {
      // If an image id is found, create an image.
      var image = app.COLLECTION.filterMetadata('system:index','equals',imageId);        
      // Add the image to the map with the corresponding visualization options.
      var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
      Map.addLayer(image, visOption.visParams, imageId);
    }
  };
};
/** Creates the app constants. */
app.createConstants = function() {
  app.COLLECTION = smoothed;
  app.FILTERED
  // app.COLLECTION_ID = 'COPERNICUS/S2_SR';
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.IMAGE_COUNT_LIMIT = 10;
  app.VIS_OPTIONS = {
    'NDVI MOD': {
      description: 'NDVI ' +
                   'MODIS',
      visParams: {min: -2000	, max: 10000, bands: ['NDVI'], palette: palette}
    },
    'EVI MOD': {
      description: 'EVI ' +
                   'MODIS',
      visParams: {min:-2000	, max: 10000, bands: ['EVI'], palette: palette}
    },
    'QA MOD': {
      description: ' QA MODIS',
      visParams: {gamma: 1.3, min: 0, max: 10000, bands: ['DetailedQA']}
    }
  };
};
/** Creates the application interface. */
app.boot = function() {
  app.createConstants();
  app.createHelpers(); 
  app.createPanelsLeft();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.filters.panel,
      app.picker.panel,
      app.vis.panel,
      app.export.panel
    ],
    style: {width: '320px', padding: '5px'}
  });
  /*
   * Initialize the app
   */
  // Replace the root with a SplitPanel that contains the inspector and map.
  // ui.root.clear();
  Map.setCenter(centerDefult[0],centerDefult[1],9);
  ui.root.insert(0, main);
  app.applyFilters();
};
app.boot();
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}})
    .add(ui.Label('Click on the map'));
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(1, ui.Label(location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(1, ui.Map.Layer(point, {color: 'FF0000'}));
  // Create a chart of NDVI over time.
  var band = app.VIS_OPTIONS[app.vis.select.getValue()].visParams.bands[0] 
  // var chart = ui.Chart.image.series(app.FILTERED.select(band), point, ee.Reducer.mean(), 200)
  //     .setOptions({
  //       title: band + ' time series Over Time',
  //       vAxis: {title: band},
  //       lineWidth: 1,
  //       pointSize: 3,
  //     });
  // Function to smooth time series
  // stacks windows of linear regression results
  // requires that a variable 'data' exists with NDVI and time bands
  function smoother(t){
    // helper function to apply linear regression equation
    function applyFit(img){
        return img.select('time').multiply(fit.select('scale')).add(fit.select('offset'))
                .set('system:time_start',img.get('system:time_start')).rename(band);
    }
    t = ee.Date(t);
    var window = data.filterDate(t.advance(-windowSize,'day'),t.advance(windowSize,'day'));
    var fit = window.select(['time',band])
      .reduce(ee.Reducer.linearFit());
    return window.map(applyFit).toList(5);
  }
  // function to reduce time stacked linear regression results
  // requires that a variable 'fitIC' exists from the smooter function
  function reduceFits(t){
    t = ee.Date(t);
    return fitIC.filterDate(t.advance(-windowSize,'day'),t.advance(windowSize,'day'))
                .mean().set('system:time_start',t.millis()).rename(band);
  }
  var data =  app.FILTERED.select([band, 'time']);//.map(addDataBands);
  print(data);
  var dates = ee.List(data.aggregate_array('system:time_start'));
  var windowSize = 30; //days on either side
  var fitIC = ee.ImageCollection(dates.map(smoother).flatten());
  var smoothed = ee.ImageCollection(dates.map(reduceFits));
  // merge original and smoothed data into one image collection for plotting
  var joined = ee.ImageCollection(smoothed.select([band],['smoothed'])
                  .merge(data.select([band],['original'])));
  var chart = ui.Chart.image.series({
    imageCollection: joined,
    region: point,
    reducer: ee.Reducer.mean(),
    scale: 1000
  }).setOptions({title: band + ' over time'});
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel.widgets().set(2, chart);
});
// Add the panel to the ui.root.
ui.root.insert(2, panel);
print(ui.root.widgets())