var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
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
        value: 'TROPOMI Product Explorer',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('Generate mean TROPOMI/S5P images. Select product below.')
    ])
  };
  var now = new Date();
  var filtered = ee.ImageCollection(app.COLLECTION_ID);
  var daterange = filtered.select('SO2_column_number_density_15km').reduceColumns(ee.Reducer.minMax(), ["system:time_start"])
  var begin=ee.Date(daterange.get('min')).format('YYYY-MM-dd')
  var endday=ee.Date(daterange.get('max')).format('YYYY-MM-dd')
  var end=ee.Date(daterange.get('max')).format()
  var eeNow = ee.Date(Date.now()).format();
  var filteredOFFL = ee.ImageCollection(app.COLLECTION_ID_OFFL);
  var daterangeOFFL = filteredOFFL.select('SO2_column_number_density_15km').reduceColumns(ee.Reducer.minMax(), ["system:time_start"])
  var beginOFFL=ee.Date(daterangeOFFL.get('min')).format('YYYY-MM-dd')
  var endOFFL=ee.Date(daterangeOFFL.get('max')).format()
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
      ui.Label('Select date range:', {fontWeight: 'bold'}),
      ui.Label('NRTI: '+begin.getInfo()+' to '+end.getInfo()),
      ui.Label('OFFL: '+beginOFFL.getInfo()+' to '+endOFFL.getInfo()),
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
  var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
  app.slider = {
  panel: ui.Panel([
      ui.Label({
        value: 'Colorbar',
        style: {fontWeight: 'bold'}
      }),
     ui.Label('Loading colorbars...'),
     ui.Label('Loading slider...'),
    ])
  };
  app.inspector = {
    panel: ui.Panel([
      ui.Label({
        value: 'Timeseries',
        style: {fontWeight: 'bold'}
      }),
    ])
  };
};
/** Creates the app helper functions. */
app.createHelpers = function() {
  /**C
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
    var original_palette = visOption.visParams.palette
    var collection = ee.ImageCollection(visOption.collection);
    var endvar=ee.Date(collection.select(visOption.visParams.bands).reduceColumns(ee.Reducer.minMax(), ["system:time_start"]).get('max')).format('YYYY-MM-dd').getInfo()+'T00:00:00'
    var start = app.filters.startDate.getValue();
    // Reset date if startdate > startdate of variable
    var reset=ee.Algorithms.If(endvar<start,true,false)
    start=ee.Algorithms.If(reset,endvar,start)
    app.filters.startDate.setValue(start.getInfo())
    if (start) start = ee.Date(start);
    var end = app.filters.endDate.getValue();
    if (end) end = ee.Date(end);
    var filtered = collection
      .filterDate(start, end)//.filter(ee.Filter.lt('cloud_fraction', visOption.cf));
      .select(visOption.visParams.bands);
   var image = ee.Image(filtered.median().multiply(visOption.scaler));
   var scale = Map.getScale();
    var geometry = Map.getCenter().buffer(scale*10);
  //meanStdDev = meanStdDev.rename(meanStdDev.keys(), ['max','mean','min','stdDev']);  
  // evaluate to the client-side
  //meanStdDev.evaluate(function(val){
//  var mean = val.mean;
  //var stdDev = val.stdDev;
  //var max = val.max;
  //var min = val.min;
  //&visOption.visParams.min=mean - (stdDev * 3)
  //visOption.visParams.max=mean + (stdDev * 3)
  //visOption.visParams.min=0
  //visOption.visParams.max=Math.round(max)
  Map.clear()
  //Map.addLayer(image.updateMask(image.gte(visOption.mask_value)), visOption.visParams, visOption.visParams.bands[0])
      Map.addLayer(image, visOption.visParams, visOption.visParams.bands[0])
  var palet = require('users/gena/packages:palettes'); 
  var colorbars = {
    'Predefined':original_palette,
    'matplotlib.magma': palet.matplotlib.magma[7],
    'matplotlib.inferno':palet.matplotlib.inferno[7],
    'matplotlib.plasma':palet.matplotlib.plasma[7],
    'matplotlib.viridis':palet.matplotlib.viridis[7],
    'misc.coolwarm':palet.misc.coolwarm[7],
    'misc.warmcool':palet.misc.warmcool[7],
    'misc.cubehelix':palet.misc.cubehelix[7],
    'misc.gnuplot':palet.misc.gnuplot[7],
    'misc.jet':palet.misc.jet[7],
    'misc.parula':palet.misc.parula[7],
    'misc.tol_rainbow':palet.misc.tol_rainbow[7],
    'misc.cividis':palet.misc.cividis[7],
    'misc.BlueFluorite':palet.misc.BlueFluorite[7],
    'cmocean.Thermal':palet.cmocean.Thermal[7],
    'cmocean.Haline':palet.cmocean.Haline[7],
    'cmocean.Solar':palet.cmocean.Solar[7],
    'cmocean.Ice':palet.cmocean.Ice[7],
    'cmocean.Gray':palet.cmocean.Gray[7],
    'cmocean.Oxy':palet.cmocean.Oxy[7],
    'cmocean.Deep':palet.cmocean.Deep[7],
    'cmocean.Dense':palet.cmocean.Dense[7],
    'cmocean.Algae':palet.cmocean.Algae[7],
    'cmocean.Matter':palet.cmocean.Matter[7],
    'cmocean.Turbid':palet.cmocean.Turbid[7],
    'cmocean.Speed':palet.cmocean.Speed[7],
    'cmocean.Amp':palet.cmocean.Amp[7],
    'cmocean.Tempo':palet.cmocean.Tempo[7],
    'cmocean.Phase':palet.cmocean.Phase[7],
    'cmocean.Balance':palet.cmocean.Balance[7],
    'cmocean.Delta':palet.cmocean.Delta[7],
    'cmocean.Curl':palet.cmocean.Curl[7],
    }
  var colorbarchooser =  ui.Select({
    items: Object.keys(colorbars),   
    onChange: function(key) {
          visOption.visParams.palette=colorbars[key]
          makeColorBarParams(colorbars[key])
          Map.layers().get(0).setVisParams(visOption.visParams);
          }
    })
  colorbarchooser.setPlaceholder('Choose a colorbar...');
  //Color bar slider
  var minslider = ui.Slider(-10,visOption.visParams.max*3).setValue(visOption.visParams.min).setStep(1)
  minslider.onChange(function(value) {
    visOption.visParams.min=value
    Map.layers().get(0).setVisParams(visOption.visParams);
  });
  var maxslider = ui.Slider(visOption.visParams.min,visOption.visParams.max*3).setValue(visOption.visParams.max).setStep(1)
  maxslider.onChange(function(value) {
    visOption.visParams.max=value
    Map.layers().get(0).setVisParams(visOption.visParams);
  });
  var ColorbarPanel = ui.Panel({
    widgets: [
      colorbarchooser,
      ui.Label('See available palettes here').setUrl('https://github.com/gee-community/ee-palettes#Palettes')],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {padding: '5px',width:'250'}})
  var Slider = ui.Panel({
      widgets: [
        ui.Label('Min:'),
        minslider,
        ui.Label('Max:'),
        maxslider],
        layout: ui.Panel.Layout.flow('horizontal'),
        style: {padding: '5px'}
  })
  app.slider.panel.widgets().set(1, ColorbarPanel);
  app.slider.panel.widgets().set(2, Slider);
var removeLayer = function(name) {
  var layers = Map.layers()
  // list of layers names
  var names = []
  layers.forEach(function(lay) {
    var lay_name = lay.getName()
    names.push(lay_name)
  })
  // get index
  var index = names.indexOf(name)
  if (index > -1) {
    // if name in names
    var layer = layers.get(index)
    Map.remove(layer)
  } 
}
Map.style().set('cursor', 'crosshair');
var drawingTools = Map.drawingTools();
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
drawingTools.setShown(false);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: false}
});
Map.add(chartPanel);
function chartNdviTimeSeries() {
  // Make the chart panel visible the first time a geometry is drawn.
  if (!chartPanel.style().get('shown')) {
    chartPanel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  var ima = filtered.select(visOption.visParams.bands).map(function(image) {
      return image.multiply(visOption.scaler).set(image.toDictionary(image.propertyNames()))
  })
  // Chart NDVI time series for the selected area of interest.
  var chart= ui.Chart.image.series(ima, aoi, ee.Reducer.median());
   chart.setOptions({
    title: visOption.visParams.bands,
    vAxis: {title: visOption.legend},
    hAxis: {title: 'Date', format: 'yyyy-MM-dd', gridlines: {count: 7}},
    legend: {position: 'right'},
    series: {
      0: {
        color: 'blue',
        lineWidth: 0,
        pointsVisible: true,
        pointSize:3,
      },
    },
  });
  chart.onClick(function(xValue, yValue, seriesName) {
      if (!xValue) return;  // Selection was cleared.
      // Show the image for the clicked date.
      var equalDate = ee.Filter.equals('system:time_start', xValue);
      var newlayer = ui.Map.Layer(ee.Image(collection.select(visOption.visParams.bands).filter(equalDate).first().multiply(visOption.scaler)),
        visOption.visParams,(new Date(xValue)).toUTCString())
  Map.layers().add(newlayer);
  }
  );
  // Replace the existing chart in the chart panel with the new chart.
  chartPanel.widgets().reset([chart]);
}
drawingTools.onDraw(ui.util.debounce(chartNdviTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartNdviTimeSeries, 500));
var controlPanel = ui.Panel({
  widgets: [
    ui.Button({
      label: '⬛',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: '🔺',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: '📍',
      onClick: drawPoint,
      style: {stretch: 'horizontal'}
    }),
  ],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {padding: '5px'},
});  
app.inspector.panel.widgets().set(1,ui.Label('1. Select a drawing mode:'))
app.inspector.panel.widgets().set(2,controlPanel)
app.inspector.panel.widgets().set(3,ui.Label('2. Draw a geometry.'))
app.inspector.panel.widgets().set(4,ui.Label('3. Wait for chart to render.'))
app.inspector.panel.widgets().set(5,ui.Label('4. Click on datapoint to show corresponding orbit.'))
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
    var legendPanel = ui.Panel([legendTitle, colorBar,legendLabels],ui.Panel.Layout.flow('vertical'),
        {width: '250px', position: 'bottom-left'})
    Map.widgets().set(3, legendPanel);
    app.setLoadingMode(false);
  };
};
/** Creates the app constants. */
app.createConstants = function() {
  app.COLLECTION_ID = 'COPERNICUS/S5P/NRTI/L3_SO2';
  app.COLLECTION_ID_OFFL = 'COPERNICUS/S5P/OFFL/L3_SO2';
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.IMAGE_COUNT_LIMIT = 10;
  app.VIS_OPTIONS = {
    'NRTI SO2 VCD 15km (Volcanoes)': {
      description: '15km VCD (Volcanoes)',
      visParams: {min: 0.0,  max: 10,  palette:['white', 'blue', 'yellow','red'], bands: ['SO2_column_number_density_15km'],opacity:0.75},
      collection:'COPERNICUS/S5P/NRTI/L3_SO2',
      legend: 'SO2 VCD (DU)',
      scaler: 2241.15,
      mask_value: 0.5,
      product:'SO2',
      cf:1
    },
    'OFFL SO2 VCD 15km (Volcanoes)': {
      description: '15km VCD (Volcanoes)',
      visParams: {min: 0.0,  max: 10,  palette:['white', 'blue', 'yellow','red'], bands: ['SO2_column_number_density_15km'],opacity:0.75},
      collection:'COPERNICUS/S5P/OFFL/L3_SO2',
      legend: 'SO2 VCD (DU)',
      scaler: 2241.15,
      mask_value: 0.5,
      product:'SO2',
      cf:1
    },
    'NRTI SO2 VCD Pollution': {
      description: 'Pollution VCD',
      visParams: {min: 0.0,  max: 2,  palette: ['white', 'blue', 'yellow','red'], bands: ['SO2_column_number_density'],opacity:0.75},
      collection:'COPERNICUS/S5P/NRTI/L3_SO2',
      legend: 'SO2 VCD (DU)',
      scaler: 2241.15,
      mask_value: 0,
      product:'SO2',
      cf:1
    },
    'OFFL SO2 VCD Pollution': {
      description: 'Pollution VCD',
      visParams: {min: 0.0,  max: 2,  palette: ['white', 'blue', 'yellow','red'], bands: ['SO2_column_number_density'],opacity:0.75},
      collection:'COPERNICUS/S5P/OFFL/L3_SO2',
      legend: 'SO2 VCD (DU)',
      scaler: 2241.15,
      mask_value: 0,
      product:'SO2',
      cf:1
    },
    'NRTI NO2': {
      description: 'NO2 VCD',
      visParams: {min: 0,  max: 20,  palette: ['white', 'blue', 'yellow','red'], bands: ['NO2_column_number_density'],opacity:0.75},
      collection:'COPERNICUS/S5P/NRTI/L3_NO2',
      legend: 'NO2 VCD (10^15 molec/cm2)',
      scaler: 6.022140857e+4,
      mask_value: 0,
      product:'NO2',
      cf:1
    },
    'OFFL NO2': {
      description: 'NO2 VCD',   
      visParams: {min: 0,  max: 20,  palette: ['white', 'blue', 'yellow','red'], bands: ['NO2_column_number_density'],opacity:0.75},
      collection:'COPERNICUS/S5P/OFFL/L3_NO2',
      legend: 'NO2 VCD (10^15 molec/cm2)',
      scaler: 6.022140857e+4,
      mask_value: 0,
      product:'NO2',
      cf:1
    },
    'NRTI HCHO': {
      description: 'HCHO VCD',
      visParams: {min: 0,  max: 20,  palette: ['white', 'blue', 'yellow','red'], bands: ['tropospheric_HCHO_column_number_density'],opacity:0.75},
      collection:'COPERNICUS/S5P/NRTI/L3_HCHO',
      legend: 'HCHO VCD (10^15 molec/cm2)',
      mask_value: -5.0,
      scaler: 6.022140857e+4,
      product:'HCHO',
      cf:1
    },
    'OFFL HCHO': {
      description: 'HCHO VCD',
      visParams: {min: 0,  max: 20,  palette: ['white', 'blue', 'yellow','red'], bands: ['tropospheric_HCHO_column_number_density'],opacity:0.75},
      collection:'COPERNICUS/S5P/OFFL/L3_HCHO',
      legend: 'HCHO VCD (10^15 molec/cm2)',
      scaler: 6.022140857e+4,
      mask_value: -5.0,
  product:'HCHO',
      cf:1
    },
    'NRTI O3': {
      description: 'O3 VCD',
      visParams: {min: 200,  max: 500,  palette: ['white', 'blue', 'yellow','red'], bands: ['O3_column_number_density'],opacity:0.75},
      collection:'COPERNICUS/S5P/NRTI/L3_O3',
      legend: 'O3 VCD (DU)',
      scaler: 2241.15,
      mask_value: 0,
      product:'O3',
      cf:1
    },
    'OFFL O3': {
      description: 'O3 VCD',
      visParams: {min: 200,  max: 500,  palette: ['white', 'blue', 'yellow','red'], bands: ['O3_column_number_density'],opacity:0.75},
      collection:'COPERNICUS/S5P/OFFL/L3_O3',
      legend: 'O3 VCD (DU)',
      scaler: 2241.15,
      mask_value: 0,
      product:'O3',
      cf:1
    },
    'Tropo. O3': {
      description: 'TropO3 VCD',
      visParams: {min: 20,  max: 80,  palette: ['white', 'blue', 'yellow','red'], bands: ['ozone_tropospheric_vertical_column'],opacity:0.75},
      collection:'COPERNICUS/S5P/OFFL/L3_O3_TCL',
      legend: 'O3 VCD (DU)',
      scaler: 2241.15,
      mask_value: 0,
      product:'TropO3',
      cf:1
    },
    'OFFL CH4': {
      description: 'Methane',
      visParams: {min: 1750,  max: 1900,  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'], bands: ['CH4_column_volume_mixing_ratio_dry_air'],opacity:0.75},
      collection:'COPERNICUS/S5P/OFFL/L3_CH4',
      legend: 'CH4 volume mixing ratio (ppbV)',
      scaler: 1,
      mask_value: 0,
      product:'CH4',
      cf:0
    },
    'OFFL CO': {
      description: 'CarbonMonoxide',
      visParams: {min: 0,  max: 100,  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'], bands: ['CO_column_number_density'],opacity:0.75},
      collection:'COPERNICUS/S5P/OFFL/L3_CO',
      legend: 'CO VCD (DU)',
      scaler: 2241.15,
      mask_value: 0,
      product:'CO',
      cf:0
    },
    'NRTI Cloud Fraction': {
      description: 'Cloud fraction',
      visParams: {min: 0,  max: 1,  palette: ['white', 'blue', 'yellow','red'], bands: ['cloud_fraction'],opacity:0.75},
      collection:'COPERNICUS/S5P/NRTI/L3_CLOUD',
      legend: 'Cloud fraction',
      scaler: 1,
      mask_value: -1,
      product:'Cloud',
      cf:1
    },
    'OFFL Cloud Fraction': {
      description: 'Cloud fraction',
      visParams: {min: 0,  max: 1,  palette: ['white', 'blue', 'yellow','red'], bands: ['cloud_fraction'],opacity:0.75},
      collection:'COPERNICUS/S5P/OFFL/L3_CLOUD',
      legend: 'Cloud fraction',
      scaler: 1,
      mask_value: -1,
      product:'Cloud',
      cf:1
    },
    'NRTI Cloud Top Height': {
      description: 'Cloud top height',
      visParams: {min: 0,  max: 7,  palette: ['white', 'blue', 'yellow','red'], bands: ['cloud_top_height'],opacity:0.75},
      collection:'COPERNICUS/S5P/NRTI/L3_CLOUD',
      legend: 'Cloud top height [km]',
      scaler: 0.001,
      mask_value: -1,
      product:'Cloud',
      cf:1
    },
    'OFFL Cloud Top Height': {
      description: 'Cloud top height',
      visParams: {min: 0,  max: 7,  palette: ['white', 'blue', 'yellow','red'], bands: ['cloud_top_height'],opacity:0.75},
      collection:'COPERNICUS/S5P/OFFL/L3_CLOUD',
      legend: 'Cloud top height [km]',
      scaler: 0.001,
      mask_value: -1,
      product:'Cloud',
      cf:1
    },
    'NRTI Cloud Optical Depth': {
      description: 'Cloud optical depth',
      visParams: {min: 0,  max: 100,  palette: ['white', 'blue', 'yellow','red'], bands: ['cloud_optical_depth'],opacity:0.75},
      collection:'COPERNICUS/S5P/NRTI/L3_CLOUD',
      legend: 'Cloud optical depth [-]',
      scaler: 1,
      mask_value: -1,
      product:'Cloud',
      cf:1
    },
    'OFFL Cloud Optical Depth': {
      description: 'Cloud optical depth',
      visParams: {min: 0,  max: 100,  palette: ['white', 'blue', 'yellow','red'], bands: ['cloud_optical_depth'],opacity:0.75},
      collection:'COPERNICUS/S5P/OFFL/L3_CLOUD',
      legend: 'Cloud optical depth [-]',
      scaler: 1,
      mask_value: -1,
      product:'Cloud',
      cf:1
    },
    'NRTI Aerosol Index': {
      description: 'Aerosol index',
      visParams: {min: -5,  max: 5,  palette: ['white', 'blue', 'yellow','red'], bands: ['absorbing_aerosol_index'],opacity:0.75},
      collection:'COPERNICUS/S5P/NRTI/L3_AER_AI',
      legend: 'Aerosol Index',
      scaler: 1,
      mask_value: -1,
      product:'AER_AI',
      cf:1
    },
    'OFFL Aerosol Index': {
      description: 'Aerosol index',
      visParams: {min: -5,  max: 5,  palette: ['white', 'blue', 'yellow','red'], bands: ['absorbing_aerosol_index'],opacity:0.75},
      collection:'COPERNICUS/S5P/OFFL/L3_AER_AI',
      legend: 'Aerosol Index',
      scaler: 1,
      mask_value: -1,
      product:'AER_AI',
      cf:1
    },
'NRTI Aerosol LH': {
      description: 'Aerosol layer height',
      visParams: {min: 0,  max: 5,  palette: ['blue','red'], bands: ['aerosol_height'],opacity:0.75},
      collection:'COPERNICUS/S5P/NRTI/L3_AER_LH',
      legend: 'Aerosol Layer Height (km)',
      scaler: 0.001,
      mask_value: -999,
      product:'AER_LH',
      cf:1
    },
'OFFL Aerosol LH': {
      description: 'Aerosol layer height',
      visParams: {min: 0,  max: 5,  palette: ['blue','red'], bands: ['aerosol_height'],opacity:0.75},
      collection:'COPERNICUS/S5P/OFFL/L3_AER_LH',
      legend: 'Aerosol Layer Height (km)',
      scaler: 0.001,
      mask_value: -999,
      product:'AER_LH',
      cf:1
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
      app.slider.panel,
      app.inspector.panel,
    ],
    style: {width: '20%'}
  });
  Map.setCenter(30, 50, 3);
  ui.root.insert(0, main);
  app.applyFilters();
};
app.boot();