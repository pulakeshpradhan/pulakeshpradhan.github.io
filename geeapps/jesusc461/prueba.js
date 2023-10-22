var AOI = ui.import && ui.import("AOI", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -84.44135812383374,
                10.108167854021856
              ],
              [
                -84.44135812383374,
                9.981733428654548
              ],
              [
                -84.17219308477124,
                9.981733428654548
              ],
              [
                -84.17219308477124,
                10.108167854021856
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
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
    ee.Geometry.Polygon(
        [[[-84.44135812383374, 10.108167854021856],
          [-84.44135812383374, 9.981733428654548],
          [-84.17219308477124, 9.981733428654548],
          [-84.17219308477124, 10.108167854021856]]], null, false),
    table = ui.import && ui.import("table", "table", {
      "id": "users/jesusc461/CoopeVictoria5"
    }) || ee.FeatureCollection("users/jesusc461/CoopeVictoria5");
// A UI to interactively filter a collection, select an individual image
// from the results, display it with a variety of visualizations, and export it.
// The namespace for our application.  All the state is kept in here.
var app = {};
// A UI to interactively filter a collection, select an individual image
// from the results, display it with a variety of visualizations, and export it.
// The namespace for our application.  All the state is kept in here.
/** Creates the UI panels. */
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([ 
      ui.Label({
        value: 'Explorador de imágenes del Sensor Sentinel-2',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '15px 10px', position : "top-right"}
      }),
      ui.Label('Está app le permite observar imágenes e índices de vegetación ' +
               'del sensor sentinel-2 con el fin de obtener información '+
               "de las parcelas de cultivo")
    ])
  };
  /* The collection filter controls. */ 
  app.filters = {
    mapCenter: ui.Checkbox({label: 'Filtro al centro del mapa', value: true}),
    startDate: ui.Textbox('YYYY-MM-DD', '2021-07-01'),
    endDate: ui.Textbox('YYYY-MM-DD', '2021-08-30'),
    applyButton: ui.Button('Aplicar filtros', app.applyFilters),
    loadingLabel: ui.Label({
      value: 'Cargando...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('1) Seleccionar filtros', {fontWeight: 'bold'}),
      ui.Label('Fecha inicial', app.HELPER_TEXT_STYLE), app.filters.startDate,
      ui.Label('Fecha final', app.HELPER_TEXT_STYLE), app.filters.endDate,
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
      placeholder: 'Seleccione una imagen por fecha',
      onChange: app.refreshMapLayer
    }),
    // Create a button that centers the map on a given object.
    centerButton: ui.Button('Centrar el mapa', function() {
      Map.centerObject(Map.layers().get(0).get('eeObject'));
    })
  };
  /* The panel for the picker section with corresponding widgets. */
  app.picker.panel = ui.Panel({
    widgets: [
      ui.Label('2) Seleccione una imagen', {fontWeight: 'bold'}),
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
      ui.Label('3) Seleccione una visualización', {fontWeight: 'bold'}),
      app.vis.select,
      app.vis.label
    ],
    style: app.SECTION_STYLE
  });
  // Default the select to the first value.
  app.vis.select.setValue(app.vis.select.items().get(0));
  // Create an empty panel in which to arrange widgets.
  // The layout is vertical flow by default.
  app.panel_1 = ui.Panel([
    ui.Label({
    value: '4) Sentinel-2 NDVI - Series de tiempo /' 
    +
    ""
    +
    '  Click en el mapa para generar el gráfico de NDVI',
    style: {fontSize: '14px', fontWeight: 'bold'}
  }),
  ui.Label({value: 'De un click en el mapa para generar el gráfico de NDVI',
  style: {fontSize: '15px'}})
  ])
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
  var vis = {min: 0, max: 1, palette: 'ff1010,ff6b14,fff829,d1ff19,65ff33,0cff2a'};
  // Create the color bar for the legend.
  var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
  });
  // Create a panel with three numbers for the legend.
  var legendLabels = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        (vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
  });
  var legendTitle = ui.Label({
  value: 'Leyenda de la vizualización del NDVI',
  style: {fontWeight: 'bold'}
  });
  app.legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
  /* The image picker section. */
  app.picker2 = {
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      placeholder: 'Seleccione una parcela', 
      onChange: app.refreshMapLayer
    }),
    // Create a button that centers the map on a given object.
    centerButton: ui.Button('Centrar el mapa', function() {
      Map.centerObject(app.parcela_i);
    })
  };
  /* The panel for the picker section with corresponding widgets. */
  app.picker2.panel = ui.Panel({
    widgets: [
      ui.Label('5) Seleccione la parcela del productor para generar el gráfico / Seleccione al asociado y clickee en la imagen para que se actualice', {fontWeight: 'bold'}),
      ui.Panel([
        app.picker2.select,
        app.picker2.centerButton
      ], ui.Panel.Layout.flow('horizontal'))
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
    app.COLLECTION_NDVI_1 = app.COLLECTION_NDVI.filterDate(start, end);
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
    var filtered2 = ee.FeatureCollection(app.featurecollection);
    // Get the list of computed ids.
    var computedIds2 = filtered2
        //.limit(app.IMAGE_COUNT_LIMIT)
        .reduceColumns(ee.Reducer.toList(), ['FINCAS_2'])
        .get('list');
        print(computedIds2);
    computedIds2.evaluate(function(ids2) {
      // Update the image picker with the given list of ids.
      app.picker2.select.items().reset(ids2);
      // Default the image picker to the first id.
      app.picker2.select.setValue(app.picker2.select.items().get(0));
    });
  };
  Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  app.location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
                 app.panel_1.widgets().set(1, ui.Label(app.location));
  // Add a red dot to the map where the user clicked.
  app.point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(2, ui.Map.Layer(app.point, {color: '#ff0000'}, "Punto " + "" + coords.lon.toFixed(4) + "/" + coords.lat.toFixed(4)));
  // Create a chart using a dictionary of named arguments.
  // Create a chart of NDVI over time.
  app.chart = ui.Chart.image.series(app.COLLECTION_NDVI_1, app.point, ee.Reducer.mean(), 30)
      .setOptions({
        title: 'NDVI en el tiempo',
        vAxis: {title: 'Valor del NDVI en el punto clickeado'},
        lineWidth: 1,
        pointSize: 3,
        //xProperty: 'DATE_ACQUIRED',
      });
  app.panel_1.widgets().set(2, app.chart);
  app.chart2 = ui.Chart.image.seriesByRegion({
  imageCollection:app.COLLECTION_NDVI_1,
  regions:app.parcela_i,
  reducer:ee.Reducer.mean(),
  band: "NDVI",
  scale:10,
  }).setOptions({title: "Valor promedio del NDVI en toda la parcela seleccionada"});
  app.picker2.panel.widgets().set(2, app.chart2);
  }); 
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  /** Refreshes the current map layer based on the UI widget states. */
  app.refreshMapLayer = function() {
    var imageId = app.picker.select.getValue();
    if (imageId) {
      var addNDVI = function(image) {
        return image.addBands(image.normalizedDifference(['B8', 'B4'])
        .rename('NDVI')).float();};
      // If an image id is found, create an image.
      var image = ee.ImageCollection(ee.Image(app.COLLECTION_ID + '/' + imageId)).map(addNDVI);
      // Add the image to the map with the corresponding visualization options.
      var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
      var tableId = app.picker2.select.getValue();
      if (tableId) {
      app.parcela_i = table.filter(ee.Filter.eq('FINCAS_2', tableId))
      var visParams2 = {'color': 'red'}
      var visParams3 = {'color': 'blue', "fillColor": 1}
      Map.clear()
      Map.addLayer(image, visOption.visParams, imageId);
      Map.addLayer(table,visParams3, "Parcelas");
      Map.addLayer(app.parcela_i, visParams2, + '' + tableId);
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
    app.COLLECTION_NDVI_1 = app.COLLECTION_NDVI.filterDate(start, end);
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
    var filtered2 = ee.FeatureCollection(app.featurecollection);
    // Get the list of computed ids.
    var computedIds2 = filtered2
        //.limit(app.IMAGE_COUNT_LIMIT)
        .reduceColumns(ee.Reducer.toList(), ['FINCAS_2'])
        .get('list');
        print(computedIds2);
    computedIds2.evaluate(function(ids2) {
      // Update the image picker with the given list of ids.
      app.picker2.select.items().reset(ids2);
      // Default the image picker to the first id.
      app.picker2.select.setValue(app.picker2.select.items().get(0));
    });
  };
  Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  app.location = 'lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
                 app.panel_1.widgets().set(1, ui.Label(app.location));
  // Add a red dot to the map where the user clicked.
  app.point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.addLayer(app.parcela_i, visParams2, + '' + tableId);
  Map.layers().set(2, ui.Map.Layer(app.point, {color: '#ff0000'}, "Punto " + "" + coords.lon.toFixed(4) + "/" + coords.lat.toFixed(4)));
  // Create a chart using a dictionary of named arguments.
  // Create a chart of NDVI over time.
  app.chart = ui.Chart.image.series(app.COLLECTION_NDVI_1, app.point, ee.Reducer.mean(), 30)
      .setOptions({
        title: 'NDVI en el tiempo',
        vAxis: {title: 'Valor del NDVI en el punto clickeado'},
        lineWidth: 1,
        pointSize: 3,
        //xProperty: 'DATE_ACQUIRED',
      });
  app.panel_1.widgets().set(2, app.chart);
  app.chart2 = ui.Chart.image.seriesByRegion({
  imageCollection:app.COLLECTION_NDVI_1,
  regions:app.parcela_i,
  reducer:ee.Reducer.mean(),
  band: "NDVI",
  scale:10,
  }).setOptions({title: "Valor promedio del NDVI en toda la parcela seleccionada"});
  app.picker2.panel.widgets().set(2, app.chart2);
  })
      }
    }
  }
};
/** Creates the app constants. */
app.createConstants = function() {
  var addNDVI = function(image) {
  return image
    .addBands(image.normalizedDifference(['B8', 'B4'])
    .rename('NDVI'))
    .float()};
  app.COLLECTION_ID =  'COPERNICUS/S2';
  app.featurecollection = "users/jesusc461/CoopeVictoria5"
  app.COLLECTION_NDVI = ee.ImageCollection('COPERNICUS/S2').map(addNDVI).select("NDVI").filterBounds(AOI)
  app.SECTION_STYLE = {margin: '20px 0 0 0'}; 
  print(app.COLLECTION_NDVI)
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.IMAGE_COUNT_LIMIT = 100;
  var palette = ["ff0808", "ff7727", "ffe635", "caff27", "77ff21","34ff31","0aff28"];
  app.VIS_OPTIONS = {
    'Color Natural (B4/B3/B2)': {
      description: 'Permite observar la superficie de la tierra ' +
                   'con la apariencia que tiene la visión humana.',
      visParams: {gamma: 1.3, min: 100, max: 3000, bands: ['B4', 'B3', 'B2']}
    },
    'Distinción de cultivos (B5/B4/B1)': {
      description: 'Combinación de bandas dirigida a ayudar en la ' +
                   'distinción de cultivos.',
      visParams: {gamma: 1.3, min: 100, max: 3000, bands: ['B12', 'B11', 'B4']}
    },
    'Índice de Vegetación de Diferencia Normalizada (NDVI)': { 
      description: 'Es un indicador de la vegetación fotosintéticamente activa es decir un cálculo de la salud de la vegetación. ' +
                   'Valores con mayor actividad se muestran en verde.',
      visParams: {min: 0, max: 1,palette:["ff1010","ff6b14","fff829","d1ff19","65ff33","0cff2a"], bands: ['NDVI'] }
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
      app.legendPanel,
      app.panel_1,
      app.picker2.panel,
    ],
    style: {width: '400px', padding: '10px', position: 'top-right'}
  });
  Map.style().set('cursor', 'crosshair');
 Map.setCenter(-84.3238, 10.0635, 13) ;
  ui.root.insert(1, main);
  app.applyFilters();
};
app.boot();