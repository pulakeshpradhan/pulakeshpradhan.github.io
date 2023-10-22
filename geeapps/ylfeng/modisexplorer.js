var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -72.95506503210798,
                -1.6845410644902132
              ],
              [
                -72.96879796521745,
                -1.6835115393839863
              ],
              [
                -72.97205953689273,
                -1.6912329645931579
              ],
              [
                -72.95901325035268,
                -1.690031856035513
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -72.30508846557616,
                -2.03716714305226
              ],
              [
                -72.3210529736328,
                -2.037681801619512
              ],
              [
                -72.3181347302246,
                -2.054150788699749
              ],
              [
                -72.29427379882812,
                -2.056552501828914
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -71.07344927514649,
                -4.555650774492134
              ],
              [
                -71.10606493676758,
                -4.573446934126539
              ],
              [
                -71.10005678857422,
                -4.590729319821059
              ],
              [
                -71.06417956079102,
                -4.571564668891078
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -62.31720169311522,
                -6.776064274442349
              ],
              [
                -62.35204895263671,
                -6.831461331858448
              ],
              [
                -62.26141174560546,
                -6.8057238015899735
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -61.48012603149413,
                -1.1225134863458368
              ],
              [
                -61.49454558549836,
                -1.115948734449351
              ],
              [
                -61.5069051790657,
                -1.1172788417269461
              ],
              [
                -61.508965142822255,
                -1.1266325658497571
              ],
              [
                -61.49300069158576,
                -1.1430230198276665
              ],
              [
                -61.481499322509755,
                -1.1504887861052722
              ],
              [
                -61.46381820068358,
                -1.1504887861052722
              ],
              [
                -61.46184413433911,
                -1.1308374311366372
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            -64.50048583068849,
            -2.698856614731633
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #00ffff */ee.Geometry({
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -72.95506503210798,
                -1.6845410644902132
              ],
              [
                -72.96879796521745,
                -1.6835115393839863
              ],
              [
                -72.97205953689273,
                -1.6912329645931579
              ],
              [
                -72.95901325035268,
                -1.690031856035513
              ]
            ]
          ],
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -72.30508846557616,
                -2.03716714305226
              ],
              [
                -72.3210529736328,
                -2.037681801619512
              ],
              [
                -72.3181347302246,
                -2.054150788699749
              ],
              [
                -72.29427379882812,
                -2.056552501828914
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -71.07344927514649,
                -4.555650774492134
              ],
              [
                -71.10606493676758,
                -4.573446934126539
              ],
              [
                -71.10005678857422,
                -4.590729319821059
              ],
              [
                -71.06417956079102,
                -4.571564668891078
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -62.31720169311522,
                -6.776064274442349
              ],
              [
                -62.35204895263671,
                -6.831461331858448
              ],
              [
                -62.26141174560546,
                -6.8057238015899735
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -61.48012603149413,
                -1.1225134863458368
              ],
              [
                -61.49454558549836,
                -1.115948734449351
              ],
              [
                -61.5069051790657,
                -1.1172788417269461
              ],
              [
                -61.508965142822255,
                -1.1266325658497571
              ],
              [
                -61.49300069158576,
                -1.1430230198276665
              ],
              [
                -61.481499322509755,
                -1.1504887861052722
              ],
              [
                -61.46381820068358,
                -1.1504887861052722
              ],
              [
                -61.46184413433911,
                -1.1308374311366372
              ]
            ]
          ],
          "geodesic": true,
          "evenOdd": true
        },
        {
          "type": "Point",
          "coordinates": [
            -64.50048583068849,
            -2.698856614731633
          ]
        }
      ],
      "coordinates": []
    });
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
        value: 'MODIS Explorer',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('This app allows you to filter and export images ' +
               'from the MODIS collection.')
    ])
  };
  /* The collection filter controls. */
  app.filters = {
    mapCenter: ui.Checkbox({label: 'Filter to map center', value: true}),
    startDate: ui.Textbox('YYYY-MM-DD', '2019-04-05'),
    endDate: ui.Textbox('YYYY-MM-DD', '2019-09-14'),
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
          description: 'L8_Export-' + imageIdTrailer,
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
      print("image",image)
      var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
      Map.addLayer(image, visOption.visParams, imageId);
    }
  };
};
/** Creates the app constants. */
app.createConstants = function() {
  // app.COLLECTION_ID = 'LANDSAT/LT05/C01/T1_TOA';
  // app.COLLECTION_ID = 'LANDSAT/LC08/C01/T1_RT_TOA';
  app.COLLECTION_ID = 'MODIS/006/MOD09GA';
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.IMAGE_COUNT_LIMIT = 30;
  app.VIS_OPTIONS = {
    'False color (B7/B6/B4)': {
      description: 'Vegetation is shades of red, urban areas are ' +
                   'cyan blue, and soils are browns.',
      // visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B7', 'B6', 'B4']}
      // // visParams:{'bands': 'B5,B4,B3', 'gain': '1200, 500, 1200'}
      visParams: {bands:['sur_refl_b06','sur_refl_b02','sur_refl_b01'],gain:[0.07, 0.06,0.06]}
    },
    'Natural color (B4/B3/B2)': {
      description: 'Ground features appear in colors similar to their ' +
                   'appearance to the human visual system.',
      visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B4', 'B3', 'B2']}
    },
    'Atmospheric (B7/B6/B5)': {
      description: 'Coast lines and shores are well-defined. ' +
                   'Vegetation appears blue.',
      visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B7', 'B6', 'B5']}
    }
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
      app.picker.panel,
      app.vis.panel,
      app.export.panel
    ],
    style: {width: '320px', padding: '8px'}
  });
  Map.setCenter(-61.5136, -1.1232, 13);
  ui.root.insert(0, main);
  app.applyFilters();
};
app.boot();