// A UI to interactively filter a collection, select an individual image
// from the results, display it with a variety of visualizations, and export it.
// The namespace for our application.  All the state is kept in here.
var app = {};
/** Creates the UI panels. */
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'TROPOMI SO2 Explorer',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('Generate mean TROPOMI/S5P SO2 images')
    ])
  };
  var now = new Date();
  var filtered = ee.ImageCollection(app.COLLECTION_ID);
  var daterange = filtered.select('SO2_column_number_density_15km').reduceColumns(ee.Reducer.minMax(), ["system:time_start"])
  var begin=ee.Date(daterange.get('min')).format('YYYY-MM-dd')
  var endday=ee.Date(daterange.get('max')).format('YYYY-MM-dd')
  var end=ee.Date(daterange.get('max')).format()
  var eeNow = ee.Date(Date.now()).format();
  /* The collection filter controls. */
  app.filters = {
    startDate: ui.Textbox('YYYY-MM-DD', endday.getInfo()+'T00:00:00'),
    endDate: ui.Textbox('YYYY-MM-DD', eeNow.getInfo()),
    applyButton: ui.Button('Apply filters', app.applyFilters),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('Select date range from '+begin.getInfo()+' to '+end.getInfo(), {fontWeight: 'bold'}),
      ui.Label('Start date', app.HELPER_TEXT_STYLE), app.filters.startDate,
      ui.Label('End date', app.HELPER_TEXT_STYLE), app.filters.endDate
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
      }
    })
  };
  /* The panel for the visualization section with corresponding widgets. */
  app.vis.panel = ui.Panel({
    widgets: [
      ui.Label('Select product', {fontWeight: 'bold'}),
      app.vis.select,      
      //app.vis.label,
      ui.Panel([
        app.filters.applyButton,
        app.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'))
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
      app.filters.startDate,
      app.filters.endDate,
      app.filters.applyButton,
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  };
  /** Applies the selection filters currently selected in the UI. */
  app.applyFilters = function() {
    app.setLoadingMode(true);
    //var filtered = ee.ImageCollection(app.COLLECTION_ID);
    var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
    var filtered = ee.ImageCollection(visOption.collection);
    // Set filter variables.
    var start = app.filters.startDate.getValue();
    if (start) start = ee.Date(start);
    var end = app.filters.endDate.getValue();
    if (end) end = ee.Date(end);
    if (start) filtered = filtered.filterDate(start, end);
    var image = ee.Image(filtered.select(visOption.visParams.bands).median().multiply(2241.15));
    Map.clear()
    Map.addLayer(image, visOption.visParams, visOption.visParams.bands[0])
    // Mask low SO2 pixels.
    function makeColorBarParams(palette) {
      return {
        bbox: [0, 0, 1, 0.1],
        dimensions: '100x10',
        format: 'png',
        min: 0,
        max: 1,
        palette:  visOption.visParams.palette,
      };
    }
    // Create the color bar for the legend.
    var colorBar = ui.Thumbnail({
      image: ee.Image.pixelLonLat().select(0),
      params: makeColorBarParams( visOption.visParams.palette),
      style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
    });
    // Create a panel with three numbers for the legend.
    var legendLabels = ui.Panel({
      widgets: [
        ui.Label( visOption.visParams.min, {margin: '4px 8px'}),
        ui.Label(
            ( visOption.visParams.max / 2),
            {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label( visOption.visParams.max, {margin: '4px 8px'})
      ],
      layout: ui.Panel.Layout.flow('horizontal')
    });
    var legendTitle = ui.Label({
      value: visOption.legend,
      style: {fontWeight: 'bold'}
    });
    var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels],ui.Panel.Layout.flow('vertical'),
        {width: '250px', position: 'bottom-left'})
    Map.widgets().set(3, legendPanel);
    app.setLoadingMode(false);
  };
};
/** Creates the app constants. */
app.createConstants = function() {
  app.COLLECTION_ID = 'COPERNICUS/S5P/NRTI/L3_SO2';
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.IMAGE_COUNT_LIMIT = 10;
  app.VIS_OPTIONS = {
    'SO2 VCD 15km (Volcanoes)': {
      description: '15km VCD (Volcanoes)',
      visParams: {min: 0.0,  max: 10,  palette:['white', 'blue', 'yellow','red'], bands: ['SO2_column_number_density_15km'],opacity:0.75},
      collection:'COPERNICUS/S5P/NRTI/L3_SO2',
      legend: 'SO2 VCD (DU)'
    },
    'SO2 VCD Pollution': {
      description: 'Pollution VCD',
      visParams: {min: 0.0,  max: 2,  palette: ['white', 'blue', 'yellow','red'], bands: ['SO2_column_number_density'],opacity:0.75},
      collection:'COPERNICUS/S5P/NRTI/L3_SO2',
      legend: 'SO2 VCD (DU)'
    },
  };
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
      app.vis.panel,
    ],
    style: {width: '340px', padding: '8px'}
  });
  Map.setCenter(30, 50, 3);
  ui.root.insert(0, main);
  app.applyFilters();
};
app.boot();