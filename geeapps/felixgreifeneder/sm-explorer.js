/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var sm_vis_params = {"opacity":1,"bands":["ESTIMATED_SM"],"min":8,"max":32,"palette":["c87e0f","ffca35","fcff2f","7adaff","4967ff","1000ff"]};
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// A UI to interactively filter a collection, select an individual image
// from the results, display it with a variety of visualizations, and export it.
// The namespace for our application.  All the state is kept in here.
var app = {};
/** Creates the UI panels. */
app.createInitPanel = function() {
  /*create interface for the selection of the image collection*/
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Soil Moisture Explorer',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('Please select one of the soil moisture demo image collections.')
    ])
  };
  app.cselect = {
    selCol: ui.Select({
      items: ['California', 'Euregio: Tyrol, South Tyrol, Trentino']
    }),
    confirmButton: ui.Button('Select', app.boot)
  };
  app.cselect.panel = ui.Panel({
    widgets: [
      app.cselect.selCol,
      app.cselect.confirmButton
      ],
    style: {margin: '20px 0 0 0'}
  });
};
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Soil Moisture Explorer',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('This app allows you to filter and export images ' +
               'from the soil moisture collection.')
    ])
  };
  /* The collection filter controls. */
  app.filters = {
    mapCenter: ui.Checkbox({label: 'Filter to map center', value: true}),
    startDate: ui.Textbox('YYYY-MM-DD', '2015-01-01'),
    endDate: ui.Textbox('YYYY-MM-DD', '2020-12-31'),
    trackNr: ui.Select({
      placeholder: 'Select track'
    }),
    fltTrack: ui.Checkbox({label: 'Filter S1 track nr.', value: false}),
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
      ui.Label('Select S1 track', app.HELPER_TEXT_STYLE), app.filters.trackNr,
      app.filters.fltTrack,
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
      onClick: function() {
        // Select the full image id.
        var imageIdTrailer = app.picker.select.getValue();
        var imageId = app.COLLECTION_ID + '/' + imageIdTrailer;
        // Get the visualization options.
        var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
        // Export the image to Drive.
        Export.image.toDrive({
          image: ee.Image(imageId).select(visOption.visParams.bands),
          description: 'SM_Export_' + imageIdTrailer,
        });
      }
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
/*
 * Legend setup
 */
// Creates a color bar thumbnail image for use in legend from the given color
// palette.
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(sm_vis_params.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(sm_vis_params.min, {margin: '4px 8px'}),
    ui.Label(
        (sm_vis_params.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(sm_vis_params.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Map Legend: surface soil moisture content [m^3m^-3]',
  style: {fontWeight: 'bold'}
});
// Add the legendPanel to the map.
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
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
      app.filters.trackNr,
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
    var filtered = ee.ImageCollection(app.COLLECTION_ID);
    // Filter bounds to the map if the checkbox is marked.
    if (app.filters.mapCenter.getValue()) {
      filtered = filtered.filterBounds(Map.getCenter());
    }
    // Set filter variables.
    var start = app.filters.startDate.getValue();
    if (start) start = ee.Date(start);
    var end = app.filters.endDate.getValue();
    if (end) end = ee.Date(end);
    if (start) filtered = filtered.filterDate(start, end);
    if (app.filters.fltTrack.getValue()) {
      var tracknr = app.filters.trackNr.getValue();
      if (tracknr) filtered = filtered.filter(ee.Filter.eq('s1tracknr', ee.Number.parse(tracknr)));
    }
    // Get the list of computed ids.
    var computedIds = filtered
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
    Map.clear();
    var imageId = app.picker.select.getValue();
    if (imageId) {
      // If an image id is found, create an image.
      var image = ee.Image(app.COLLECTION_ID + '/' + imageId);
      // Add the image to the map with the corresponding visualization options.
      var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
      Map.addLayer(image, visOption.visParams, imageId);
      Map.add(legendPanel);
    }
  };
};
/** Creates the app constants. */
app.createConstants = function() {
  print(app.cselect.selCol.getValue());
  if (app.cselect.selCol.getValue() == 'California'){
    app.COLLECTION_ID = 'users/felixgreifeneder/SM_CALIFORNIA';
  } else {
    app.COLLECTION_ID = 'users/felixgreifeneder/SM_EUREGIO';
  }
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.IMAGE_COUNT_LIMIT = 10;
  app.VIS_OPTIONS = {
    Paletted: {
      description: 'Red to blue gradient',
      visParams: sm_vis_params
    }
  };
};
/** Creates the application interface. */
app.boot = function() {
  ui.root.remove(ui.root.widgets().get(0));
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.filters.panel,
      app.picker.panel,
      app.vis.panel,
      app.export.panel
    ],
    style: {width: '320px', padding: '8px'}
  });
  if (app.cselect.selCol.getValue() == 'California') {
    Map.setCenter(-120.60983128642324,37.37143308190912, 5);
  } else {
    Map.setCenter(11.35, 46.49, 8);
  }
  ui.root.insert(0, main);
  // create list of tracks
  var computedTracks = ee.ImageCollection(app.COLLECTION_ID)
          .reduceColumns(ee.Reducer.toList(), ['s1tracknr'])
          .get('list');
  var computedTrack = ee.List(computedTracks).distinct().map(function(nr) {return(ee.String(nr))});
  computedTrack.evaluate(function(tracks) {
        // Update the image picker with the given list of ids.
        app.setLoadingMode(false);
        app.filters.trackNr.items().reset(tracks);
        // Default the image picker to the first track.
       app.filters.trackNr.setValue(app.filters.trackNr.items().get(0));
  });
  app.applyFilters();
};
app.preboot = function() {
  app.createInitPanel();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.cselect.panel
      ],
    style: {width: '320px', padding: '8px'}
  });
  ui.root.insert(0, main);
};
app.preboot();