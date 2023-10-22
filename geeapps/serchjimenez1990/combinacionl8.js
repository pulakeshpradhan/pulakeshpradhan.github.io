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
        value: 'Explorador de LandSat 8',
        style: {fontWeight: 'bold', fontSize: '20px', margin: '10px 5px'}
      }),
      ui.Label('Esta aplicación te permite mostrar combinacion de bandas LandSat 8 y exportar imágenes'),
      ui.Label({
    value: 'Elaboró: Sergio Jiménez con codigo base de GEE (https://code.earthengine.google.com/)',
    style: {fontSize: '12px'}
  }) 
    ])
  };
  /* The collection filter controls. */
  app.filters = {
    mapCenter: ui.Checkbox({label: 'Filtro al centro del mapa', value: true}),
    startDate: ui.Textbox('YYYY-MM-DD', '2020-08-01'),
    endDate: ui.Textbox('YYYY-MM-DD', '2021-06-01'),
    applyButton: ui.Button('Aplicar filtros', app.applyFilters),
    loadingLabel: ui.Label({
      value: 'Cargando...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('1) Select filters', {fontWeight: 'bold'}),
      ui.Label('Fecha inicial', app.HELPER_TEXT_STYLE), app.filters.startDate,
      ui.Label('Fecha Final', app.HELPER_TEXT_STYLE), app.filters.endDate,
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
      placeholder: 'Selecciona un ID de Imagen',
      onChange: app.refreshMapLayer
    }),
    // Create a button that centers the map on a given object.
    centerButton: ui.Button('Centrar mapa', function() {
      Map.centerObject(Map.layers().get(0).get('eeObject'));
    })
  };
  /* The panel for the picker section with corresponding widgets. */
  app.picker.panel = ui.Panel({
    widgets: [
      ui.Label('2) Selecciona una imagen', {fontWeight: 'bold'}),
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
      ui.Label('3) Selecciona un combinación', {fontWeight: 'bold'}),
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
      label: 'Exportar la imagen actual a Drive',
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
      ui.Label('4) Iniciar la exportación', {fontWeight: 'bold'}),
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
      var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
      Map.addLayer(image, visOption.visParams, imageId);
    }
  };
};
/** Creates the app constants. */
app.createConstants = function() {
  app.COLLECTION_ID = 'LANDSAT/LC08/C01/T1_RT_TOA';
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.IMAGE_COUNT_LIMIT = 20;
  app.VIS_OPTIONS = {
    '2.1. Color Natural (B4/B3/B2)': {
      description: 'Las características del suelo aparecen en colores similares a sus' +
                   'apariencia al sistema visual humano.',
      visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B4', 'B3', 'B2']}
    },
    '2.2. Combinación (B5/B4/B3)': {
      description: 'La banda del infrarrojo cercano  es útil para identificar los límites' +
                    'entre el suelo y el agua',
      visParams: {gamma: 1.3, min: 0, max: 0.5, bands: ['B5', 'B4', 'B3']}
    },    
    '2.3. Combinación (B6/B5/B4)': {
      description: 'Esta combinación con dos bandas en la región del infrarrojo (SWIR 1 y NIR)'+
      '             muestra una mayor diferenciación entre el suelo y el agua',
      visParams: {gamma: 1.3, min: 0, max: 0.7, bands: ['B6', 'B5', 'B4']}
    },
    '2.4. Combinación (B5/B6/B4)': {
      description: 'esta combinación realza las diferencias de humedad en el suelo y es usada '+
                    'para el análisis de humedad en el suelo y vegetación',
      visParams: {gamma: 1.3, min: 0, max: 0.5, bands: ['B5', 'B6', 'B4']}
    },    
    '2.5. Combinación (B7/B5/B3)': {
      description: 'La Vegetación se muestra en tonos de verde porque la banda NIR está en el color verde.',
      visParams: {gamma: 1.3, min: 0, max: 0.5, bands: ['B7', 'B5', 'B3']}
    },    
    '2.6. Combinación (B7/B6/B4)': {
      description: 'superficies calientes (incendios, calderas volcánicas) se muestran en tonos '+
                    'de rojo o amarillo; el agua se muestra en azul oscuro a negro',
      visParams: {gamma: 1.3, min: 0, max: 0.5, bands: ['B7', 'B6', 'B4']}
    },     
    '2.7. Combinación (B7/B6/B5)': {
      description: 'Proporciona la mejor penetración atmosférica. Líneas costeras, y las orillas'+
                    'están bien definidos',
      visParams: {gamma: 1.3, min: 0, max: 0.5, bands: ['B7', 'B6', 'B5']}
    },     
    '2.8. Combinación (B6/B5/B2)': {
      description: 'Esta combinación SWIR 1-NIR-B es mejor para estudios agrícolas.',
      visParams: {gamma: 1.3, min: 0, max: 0.5, bands: ['B6', 'B5', 'B2']}
    }, 
    '2.9. Combinación (B5/B6/B2)': {
      description: 'La vegetación sana aparece en tonos de rojos, marrones, naranjas y amarillos;'+
                    'los suelos pueden ser en verdes y marrones',
      visParams: {gamma: 1.3, min: 0, max: 0.5, bands: ['B5', 'B6', 'B2']}
    },
    '2.10. Combinación (B6/B4/B2)': {
      description: 'Esta combinación muestra texturas topográficos. ', 
      visParams: {gamma: 1.3, min: 0, max: 0.5, bands: ['B6', 'B4', 'B2']}
    },    
    '2.11. Combinación (B7/B4/B2)': {
      description: 'Puede mostrar diferencias en los tipos de roca. ' ,
      visParams: {gamma: 1.3, min: 0, max: 0.4, bands: ['B7', 'B4', 'B2']}
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
  Map.setCenter(-97.308, 18.716, 10);
  ui.root.insert(0, main);
  app.applyFilters();
};
app.boot();