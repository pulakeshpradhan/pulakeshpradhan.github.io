var cedarville = ui.import && ui.import("cedarville", "table", {
      "id": "users/liezlvermeuln/cedarville"
    }) || ee.FeatureCollection("users/liezlvermeuln/cedarville"),
    fortBeaufort = ui.import && ui.import("fortBeaufort", "table", {
      "id": "users/liezlvermeuln/fortBeaufort"
    }) || ee.FeatureCollection("users/liezlvermeuln/fortBeaufort"),
    modnpp = ui.import && ui.import("modnpp", "imageCollection", {
      "id": "MODIS/006/MOD17A3H"
    }) || ee.ImageCollection("MODIS/006/MOD17A3H"),
    modvcf = ui.import && ui.import("modvcf", "imageCollection", {
      "id": "MODIS/006/MOD44B"
    }) || ee.ImageCollection("MODIS/006/MOD44B"),
    ltgc = ui.import && ui.import("ltgc", "image", {
      "id": "users/liezlvermeuln/grazeCap2016"
    }) || ee.Image("users/liezlvermeuln/grazeCap2016"),
    modndvi = ui.import && ui.import("modndvi", "imageCollection", {
      "id": "MODIS/006/MOD13A2"
    }) || ee.ImageCollection("MODIS/006/MOD13A2"),
    modgpp = ui.import && ui.import("modgpp", "imageCollection", {
      "id": "MODIS/006/MOD17A2H"
    }) || ee.ImageCollection("MODIS/006/MOD17A2H");
// A UI to interactively calculate grass cover (%) and grazing capacity (ha/LSU),
// inspect individual pixels, chart annual NPP and export results. 
var model = require('users/liezlvermeuln/Masters:GCModel');
// The namespace for our application.  All the state is kept in here.
var app = {};
/** Creates the global state variables. */
var finalLon;
var finalLat;
var startDate = '2018-01-10';
var endDate = '2019-01-10';
var AOI = fortBeaufort;
var grazeResult = false;
var grassResult = false;
var globalNDVI;
var globalNPP;
var globalFVC;
var globalGC;
var refNDVI;
var refNPP;
var refFVC;
var refGC;
var leftMap = ui.Map();
var rightMap = ui.Map();
var globalMetric = 'FVC';
// Some pre-set locations of interest that will be loaded into a pulldown menu.
var locationDict = {
  'Cedarville': {object: cedarville, lon: 29.007, lat: -30.423, zoom: 12},
  'Fort Beaufort': {object: fortBeaufort, lon: 26.455, lat: -32.779, zoom: 12}
};
var datesDict = {
  '2016': {startDate: '2015-10-01', endDate: '2016-10-01'},
  '2017': {startDate: '2016-10-01', endDate: '2017-10-01'},
  '2018': {startDate: '2017-10-01', endDate: '2018-10-01'},
  '2019': {startDate: '2018-10-01', endDate: '2019-10-01'}
};
var metricDict = {
  'NDVI': {metric: 'NDVI'},
  'Fractional vegetation cover': {metric: 'FVC'},
  'Annual vegetation production': {metric: 'NPP'},
  'Grazing capacity': {metric: 'GC'}
};
var legendDict = {
  'NDVI': {label: 'NDVI', palette: ['brown', 'yellow', 'green'], minVal: 0.1, maxVal: 0.9, names: ['None']},
  'FVC': {label: 'Fractional Vegetation Cover (%)', palette: ['FF0000', '22ff00', '1500ff'], minVal: 0, maxVal: 100, names: ['Bare', 'Grassy', 'Woody']},
  'NPP': {label: 'Annual NPP (gC/m^2/year)', palette: ['red', 'orange', 'yellow', 'green'], minVal: 0, maxVal: 1000, names: ['None']},
  'GC': {label: 'Grazing Capacity (ha/LSU)', palette: ['green', 'yellow', 'orange', 'red'], minVal: 2, maxVal: 12, names: ['None']}
}
var descriptText = 'This app allows you to calculate fractional vegetation cover (%), annual vegetation production (gDM/ha) ' +
'and grazing capacity (ha/LSU) using Sentinel-2 satellite imagery to aid in sustainable grassland management.  ';
/** Creates the UI panels. */
app.createPanels = function() { 
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: descriptText,
        style: {fontWeight: '50', fontSize: '14px', color: '#9E9E9E', backgroundColor:'#11ffee00' }
      })
    ])
  };
  /* The location selection section. */
  var locations = Object.keys(locationDict);
  var dates = Object.keys(datesDict);
  var metrics = Object.keys(metricDict);
  app.parameters = {
    studyAreaSelect: ui.Select(locations, "Select a study area...", locations[1], app.selectStudyArea),
    dateSelect: ui.Select(dates, "Select a date...", dates[2], app.selectDates),
    metricSelect: ui.Select(metrics, 'Select a metric...', metrics[1], app.selectMetric),
    calc: ui.Button('Calculate', null, false, {border: '1pt black'})
  };
  print(app.parameters.dateSelect.style());
  app.parameters.panel = ui.Panel({
    widgets: [
      ui.Label('Specify an example study area and year: ', {fontWeight: 'bold', color: '#9DB68C'}),
      ui.Panel([
        app.parameters.studyAreaSelect,
        app.parameters.dateSelect,
        app.parameters.calc
      ], ui.Panel.Layout.flow('horizontal')),
       ui.Label('Toggle metrics:', {fontWeight: 'bold', color: '#9DB68C'}),
       ui.Panel([
        app.parameters.metricSelect,
      ], ui.Panel.Layout.flow('horizontal')),
    ],
    style: app.SECTION_STYLE
  });
  app.title = ui.Panel({
    widgets: [
      ui.Label({
        value: 'Welcome to Graze Engine!',
        style: {fontWeight: '100', fontSize: '32px', margin: '10px 5px', color: '#616161', backgroundColor:'#11ffee00' }
      }),
    ], 
    layout: ui.Panel.Layout.flow('vertical'),
    style: {textAlign: 'center', stretch: 'vertical', position: 'top-left'}
  });
  app.legend = ui.Panel({
      style: {
      position: 'bottom-right',
      padding: '8px 15px'
    }
  });
  /* The chart results section. */
  app.resultsModel = ui.Panel();
  app.resultsRef = ui.Panel();
  app.results = ui.Panel();
  /* The panel for the chart results section with corresponding widgets. */
  app.results.panel = ui.Panel({
    widgets: [
      ui.Label('Click on the map to generate chart data.', {fontWeight: 'bold', color: '#9DB68C'}),
      ui.Panel ({
        widgets: [
          app.resultsModel,
          app.resultsRef
          ],
          layout: ui.Panel.Layout.flow('horizontal')
      })
    ],
    layout: ui.Panel.Layout.flow('vertical'),
    style: app.SECTION_STYLE
  });
  /* The export section. */
  /*app.export = {
    button: ui.Button('Export to Drive', app.export),
  };
  /* The panel for the export section with corresponding widgets. 
  app.export.panel = ui.Panel({
    widgets: [
      ui.Label('5) Export results to Google Drive', {fontWeight: 'bold', color: '#9DB68C'}),
      app.export.button
    ],
    style: app.SECTION_STYLE
  });*/
  /* The inspector section. */
  app.inspector = {
    ndvi: ui.Textbox({placeholder: 'Model: NDVI', value: '0.0', disabled: true}),
    graze: ui.Textbox({placeholder: 'Model: Grazing Capacity', value: '0 per/LSU', disabled: true}),
    npp: ui.Textbox({placeholder: 'Model: Annual NPP', value: '0 gC/m^2/year', disabled: true}),
    grassy: ui.Textbox({placeholder: 'Model: Grassy Cover (%)', value: '0 %', disabled: true}),
    bare: ui.Textbox({placeholder: 'Model: Bare Cover (%)', value: '0 %', disabled: true}),
    woody: ui.Textbox({placeholder: 'Model: Woody Cover (%)', value: '0 %', disabled: true}),
    ndviRef: ui.Textbox({placeholder: 'MODIS: NDVI', value: '0.0', disabled: true}),
    grazeRef: ui.Textbox({placeholder: 'Long Term Map: Grazing Capacity', value: '0 per/LSU', disabled: true}),
    nppRef: ui.Textbox({placeholder: 'MODIS: Annual NPP', value: '0 gC/m^2/year', disabled: true}),
    grassyRef: ui.Textbox({placeholder: 'MODIS: Grassy Cover (%)', value: '0 %', disabled: true}),
    bareRef: ui.Textbox({placeholder: 'MODIS: Bare Cover (%)', value: '0 %', disabled: true}),
    woodyRef: ui.Textbox({placeholder: 'MODIS: Woody Cover (%)', value: '0 %', disabled: true}),
    ndviLabel: ui.Label('NDVI:', app.HELPER_TEXT_STYLE),
    grazeLabel: ui.Label('Grazing Capacity (ha/LSU):', app.HELPER_TEXT_STYLE),
    nppLabel: ui.Label('Annual NPP (g/m^2/year):', app.HELPER_TEXT_STYLE),
    grassyLabel: ui.Label('Grass Cover (%):', app.HELPER_TEXT_STYLE),
    woodyLabel: ui.Label('Woody Cover (%):', app.HELPER_TEXT_STYLE),
    bareLabel: ui.Label('Bare Cover (%):', app.HELPER_TEXT_STYLE),
    ndviRefLabel: ui.Label('NDVI:', app.HELPER_TEXT_STYLE),
    grazeRefLabel: ui.Label('Grazing Capacity (ha/LSU):', app.HELPER_TEXT_STYLE),
    nppRefLabel: ui.Label('Annual NPP (g/m^2/year):', app.HELPER_TEXT_STYLE),
    grassyRefLabel: ui.Label('Grass Cover (%):', app.HELPER_TEXT_STYLE),
    woodyRefLabel: ui.Label('Woody Cover (%):', app.HELPER_TEXT_STYLE),
    bareRefLabel: ui.Label('Bare Cover (%):', app.HELPER_TEXT_STYLE),
    modelLabel: ui.Label('Model-estimated'),
    refLabel: ui.Label('Comparison product'),
    clickLabel: ui.Label('Click to inspect map values.', {fontWeight: 'bold', position: 'top-center', color: '#9DB68C'}),
    loadingLabel: ui.Label({ value: 'Click to inspect productivity values...', style: {stretch: 'vertical', color: 'gray', shown: false }}),
  };
  /* The panel for the inspector section with corresponding widgets. */
  app.inspector.panelModel = ui.Panel({
    widgets: [
      app.inspector.modelLabel,
      app.inspector.bareLabel,
      app.inspector.bare,
      app.inspector.grassyLabel,
      app.inspector.grassy, 
      app.inspector.woodyLabel,
      app.inspector.woody
    ], 
    layout: ui.Panel.Layout.flow('vertical'),
    style: {textAlign: 'center', stretch: 'vertical', position: 'top-left'}
  });
   /* The panel for the inspector section with corresponding widgets. */
  app.inspector.panelRef = ui.Panel({
    widgets: [
      app.inspector.refLabel,
      app.inspector.bareRefLabel,
      app.inspector.bareRef,
      app.inspector.grassyRefLabel,
      app.inspector.grassyRef, 
      app.inspector.woodyRefLabel,
      app.inspector.woodyRef
    ], 
    layout: ui.Panel.Layout.flow('vertical'),
    style: {textAlign: 'center', stretch: 'vertical', position: 'top-left'}
  });
  /* The panel for the inspector section with corresponding widgets. */
  app.inspector.panel = ui.Panel({
    widgets: [
      app.inspector.clickLabel,
      ui.Panel({
        widgets: [
          app.inspector.panelModel,
          app.inspector.panelRef
        ], 
        layout: ui.Panel.Layout.flow('horizontal')
      }), 
    ], 
    layout: ui.Panel.Layout.flow('vertical'),
    style: {textAlign: 'center', stretch: 'vertical', position: 'top-left'}
  });
};
/** Creates the app helper functions. */
app.createHelpers = function() {
  /**
   * Enables or disables loading mode.
   * @param {boolean} enabled Whether loading mode is enabled.
   */
  app.setLoadingMode = function(enabled) {
    // Set each of the widgets to the given enabled mode.
    var loadDependentWidgets = [
      //app.location.lon,
      //app.location.lat,
      //app.location.locationButton,
      //app.imagery.l8,
      //app.imagery.modis,
      //app.grazing.grazingButton,
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  };
  /** Select an example study area. */
  app.selectStudyArea = function() {
    // Reset all layers and parameters.
    rightMap.layers().reset();
    leftMap.layers().reset();
    //app.inspector.subpanel.clear();
    app.resultsModel.clear();
    app.resultsRef.clear();
    var selected = app.parameters.studyAreaSelect.getValue();
      var studyArea = locationDict[selected];
      AOI = studyArea.object;
      leftMap.setCenter(studyArea.lon, studyArea.lat, studyArea.zoom);
      finalLon = studyArea.lon;
      finalLat = studyArea.lat;
    //app.calcProductivity();
  }
  /** Select a date.   */
  app.selectDates = function() {
    // Reset all layers and parameters.
    rightMap.layers().reset();
    leftMap.layers().reset();
    app.resultsModel.clear();
    app.resultsRef.clear();
    var selected = app.parameters.dateSelect.getValue();
    var analysisDate = datesDict[selected];
    print(analysisDate)
    startDate = analysisDate.startDate;
    print(startDate);
    endDate = analysisDate.endDate;
    print(endDate);
    ///app.calcProductivity();
  }
  /** Select a date.   */
  app.selectMetric = function() {
    // Reset all layers and parameters.
    rightMap.layers().reset();
    leftMap.layers().reset();
    app.inspector.panelModel.clear();
    app.inspector.panelRef.clear();
    app.resultsModel.clear();
    app.resultsRef.clear();
    app.legend.clear();
    var selected = app.parameters.metricSelect.getValue();
    var analysisMetric = metricDict[selected];
    print(analysisMetric)
    globalMetric = analysisMetric.metric;
    if (globalMetric == "NDVI") {
      app.inspector.panelModel.add(app.inspector.modelLabel);
      app.inspector.panelModel.add(app.inspector.ndviLabel);
      app.inspector.panelModel.add(app.inspector.ndvi);
      app.inspector.panelRef.add(app.inspector.refLabel);
      app.inspector.panelRef.add(app.inspector.ndviRefLabel);
      app.inspector.panelRef.add(app.inspector.ndviRef);
    } else if (globalMetric == "FVC") {
      app.inspector.panelModel.add(app.inspector.modelLabel);
      app.inspector.panelModel.add(app.inspector.bareLabel);
      app.inspector.panelModel.add(app.inspector.bare);
      app.inspector.panelModel.add(app.inspector.grassyLabel);
      app.inspector.panelModel.add(app.inspector.grassy);
      app.inspector.panelModel.add(app.inspector.woodyLabel);
      app.inspector.panelModel.add(app.inspector.woody);
      app.inspector.panelRef.add(app.inspector.refLabel);
      app.inspector.panelRef.add(app.inspector.bareRefLabel);
      app.inspector.panelRef.add(app.inspector.bareRef);
      app.inspector.panelRef.add(app.inspector.grassyRefLabel);
      app.inspector.panelRef.add(app.inspector.grassyRef);
      app.inspector.panelRef.add(app.inspector.woodyRefLabel);
      app.inspector.panelRef.add(app.inspector.woodyRef);
    } else if (globalMetric == "NPP") {
      print("SELECTED NPP")
      app.inspector.panelModel.add(app.inspector.modelLabel);
      app.inspector.panelModel.add(app.inspector.nppLabel);
      app.inspector.panelModel.add(app.inspector.npp);
      app.inspector.panelRef.add(app.inspector.refLabel);
      app.inspector.panelRef.add(app.inspector.nppRefLabel);
      app.inspector.panelRef.add(app.inspector.nppRef);
    } else if (globalMetric == "GC") {
      app.inspector.panelModel.add(app.inspector.modelLabel);
      app.inspector.panelModel.add(app.inspector.grazeLabel);
      app.inspector.panelModel.add(app.inspector.graze);
      app.inspector.panelRef.add(app.inspector.refLabel);
      app.inspector.panelRef.add(app.inspector.grazeRefLabel);
      app.inspector.panelRef.add(app.inspector.grazeRef);
    }
    app.makeLegend();
    app.redraw();
    //app.calcProductivity();
  }
  app.makeLegend = function() {
    print("LEGEND", globalMetric);
    var legendItems = legendDict[globalMetric];
    var palette = legendItems.palette;
    var names = legendItems.names;
    var min = legendItems.minVal;
    var max = legendItems.maxVal;
    // Create legend title
    var legendTitle = ui.Label({
      value: legendItems.label,
      style: {
        fontWeight: 'bold',
        fontSize: '18px',
        margin: '0 0 4px 0',
        padding: '0'
        }
    });
    // Add the title to the panel
    app.legend.add(legendTitle);
    // Creates and styles 1 row of the legend.
    var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
    };
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
    if (globalMetric == 'FVC') {
      // Add color and and names
      for (var i = 0; i < 3; i++) {
        app.legend.add(makeRow(palette[i], names[i]));
        }  
    } else {
      var colorBar = ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: makeColorBarParams(palette),
        style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
      });
      // Create a panel with three numbers for the legend.
      var legendLabels = ui.Panel({
        widgets: [
          ui.Label(min, {margin: '4px 8px'}),
          ui.Label(
              (max / 2),
              {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
          ui.Label(max, {margin: '4px 8px'})
        ],
        layout: ui.Panel.Layout.flow('horizontal')
      });
      app.legend.add(colorBar);
      app.legend.add(legendLabels);
    }
    //var viz = {min:0, max:3500, palette:['ffffff','b7f0ae','21f600','0000FF','FDFF92','FF2700','d600ff']};
    //var names2 = ['Bare','Grassy','Woody'];
    // add legend to map (alternatively you can also print the legend to the console)
  }
  /** Calculate FVC. */
  app.FVC = function() {
    var fvc = model.FVC_S2(app.COLLECTION_ID_S2, AOI, startDate, endDate);
    return fvc;
  };
  app.aNPP = function(fvc) {
    var comp = model.createComps(app.COLLECTION_ID_S2, AOI, startDate, endDate, 16);
    var LUEmax = model.LUEmax(comp, AOI, startDate, endDate, fvc);
    var aNPP = model.npp_S2(comp, AOI, startDate, endDate, LUEmax);
    return aNPP;
  }
  /** Calculate grazing capacity. */
  app.grazing = function(aNPP, fvc) {
    var gc = model.GC(aNPP, fvc);
    return gc;
  };
  /** Method to run when "Calculate Productivity" button clicked. */
  app.calcProductivity = function() {
    print("Calculating productivity");
    //var fvc = app.FVC();
    //var aNPP = app.aNPP(fvc);
    //print("Annual NPP", aNPP);
    //print("FVC", fvc);
    //var grazing = model.GC(aNPP, fvc);
    //print("Grazing capacity", grazing);
    globalFVC = app.FVC();
    globalNPP = app.aNPP(globalFVC);
    globalGC = model.GC(globalNPP, globalFVC);
    globalNDVI = globalNPP.select('NDVI');
    refFVC = ee.Image(modvcf.filterDate(startDate, endDate).first()).select([2, 1, 0]).rename(['bare', 'grassy', 'woody']);
    var modGPP = modgpp.filterDate(startDate, endDate).select(['Gpp']).map(function(m) { return m.multiply(0.0001).copyProperties(m, ['system:time_start']);});
    refNPP = modGPP.map(function(m) { return m.multiply (0.5).multiply(1000).rename('NPP').copyProperties(m, ['system:time_start']);});
    refGC = ltgc;
    refNDVI = (modndvi.filterDate(startDate, endDate)).select(['NDVI']).map(function(m) { return m.multiply(0.0001).rename("NDVI").copyProperties(m, ['system:time_start']);});
    print('Ref ndvi', refNDVI)
    print("calculated");
    app.redraw()
    /*if(globalMetric == 'NDVI') {
      var aNDVI = aNPP.max().select('NDVI');
      rightMap.addLayer(ee.Image(aNDVI).clip(AOI), app.VIS_NDVI, 'NDVI');
      var modNDVI = (modndvi.filterDate(startDate, endDate)).max().select(['NDVI']).multiply(0.0001).rename(['NDVI']);
      print('mod ndvi', modNDVI);
      leftMap.addLayer(modNDVI.clip(AOI), app.VIS_NDVI, 'NDVI');
      var chart = app.chartTimeSeries(aNPP.select('NDVI'));
      chart.setOptions(app.CHART_OPTIONS_NDVI);
      app.results.add(chart);
    } else if (globalMetric == 'FVC') {
      rightMap.addLayer(ee.Image(fvc).clip(AOI), app.VIS_FVC, 'FVC (%)');
      var vcf = ee.Image(modvcf.filterDate(startDate, endDate).first()).select([2, 1, 0]).rename(['bare', 'grassy', 'woody']);
      print(vcf);
      leftMap.addLayer(vcf.clip(AOI), app.VIS_FVC, 'MODIS FVC (%)');
      var chart = app.chartBar(fvc);
      chart.setSeriesNames(['Bare', 'Grassy', 'Woody']);
      chart.setOptions(app.CHART_OPTIONS_FVC);
      app.results.add(chart);
    } else if (globalMetric == 'NPP') {
      var sumNPP = aNPP.sum().select('NPP');
      rightMap.addLayer(ee.Image(sumNPP).clip(AOI), app.VIS_NPP, 'Annual primary production (gC/m^2/year)');
      var modGPP = (modgpp.filterDate(startDate, endDate)).sum().select(['Gpp']).multiply(0.0001).rename(['GPP']);
      var modNPP = modGPP.multiply (0.5).multiply(1000);
      print('MODIS NPP', modNPP);
      leftMap.addLayer(modNPP.clip(AOI), app.VIS_NPP, 'MODIS NPP (gC/m^2/year)');
      var chart = app.chartTimeSeries(aNPP.select('NPP'));
      chart.setOptions(app.CHART_OPTIONS_NPP);
      app.results.add(chart);
    } else if (globalMetric == 'GC') {
      rightMap.addLayer(ee.Image(grazing).clip(AOI), app.VIS_GRAZINGCAP, 'Grazing Capacity (ha/LSU)');
      var refMap = ltgc;
      leftMap.addLayer(ltgc.clip(AOI), app.VIS_GRAZINGCAP, 'Long Term Grazing Capacity map (ha/LSU)');
    }*/
    //app.extract();
  };
  /** Chart annual NPP. */
  app.redraw = function() {
    if(globalMetric == 'NDVI') {
      rightMap.addLayer(ee.Image(globalNDVI.max().rename('NDVI')).clip(AOI), app.VIS_NDVI, 'NDVI');
      //var modNDVI = (modndvi.filterDate(startDate, endDate)).max().select(['NDVI']).multiply(0.0001).rename(['NDVI']);
      //print('mod ndvi', modNDVI);
      leftMap.addLayer(refNDVI.max().clip(AOI), app.VIS_NDVI, 'NDVI');
      //var chart = app.chartTimeSeries(globalNDVI.select('NDVI'));
      //chart.setOptions(app.CHART_OPTIONS_NDVI);
      //app.results.add(chart);
    } else if (globalMetric == 'FVC') {
      rightMap.addLayer(ee.Image(globalFVC).clip(AOI), app.VIS_FVC, 'FVC (%)');
      //var vcf = ee.Image(modvcf.filterDate(startDate, endDate).first()).select([2, 1, 0]).rename(['bare', 'grassy', 'woody']);
      //print(vcf);
      leftMap.addLayer(refFVC.clip(AOI), app.VIS_FVC, 'MODIS FVC (%)');
      //var chart = app.chartBar(globalFVC);
      //chart.setSeriesNames(['Bare', 'Grassy', 'Woody']);
      //chart.setOptions(app.CHART_OPTIONS_FVC);
      //app.results.add(chart);
    } else if (globalMetric == 'NPP') {
      rightMap.addLayer(ee.Image(globalNPP.sum().select('NPP')).clip(AOI), app.VIS_NPP, 'Annual primary production (gC/m^2/year)');
      //var modGPP = (modgpp.filterDate(startDate, endDate)).sum().select(['Gpp']).multiply(0.0001).rename(['GPP']);
      //var modNPP = modGPP.multiply (0.5).multiply(1000);
      print('MODIS NPP', refNPP);
      leftMap.addLayer(refNPP.sum().clip(AOI), app.VIS_NPP, 'MODIS NPP (gC/m^2/year)');
      //var chart = app.chartTimeSeries(globalNPP.select('NPP'));
      //chart.setOptions(app.CHART_OPTIONS_NPP);
      //app.results.add(chart);
    } else if (globalMetric == 'GC') {
      rightMap.addLayer(ee.Image(globalGC).clip(AOI), app.VIS_GRAZINGCAP, 'Grazing Capacity (ha/LSU)');
      //var refMap = ltgc;
      leftMap.addLayer(refGC.clip(AOI), app.VIS_GRAZINGCAP, 'Long Term Grazing Capacity map (ha/LSU)');
    }
  };
  /** Chart annual NPP. */
  app.chartTimeSeries = function(timeSeries) {
    var point = ee.Geometry.Point([finalLon, finalLat]);
    var chart = ui.Chart.image.series({
      imageCollection: timeSeries.select(0), 
      region: point, 
      reducer: ee.Reducer.mean(), 
      scale: 10
    });
    return chart;
  };
  app.chartTimeSeriesNDVI = function(timeSeries) {
    var point = ee.Geometry.Point([finalLon, finalLat]);
    var chart = ui.Chart.image.series({
      imageCollection: timeSeries.select(0), 
      region: point, 
      reducer: ee.Reducer.mean(), 
      scale: 10
    });
    return chart;
  };
  app.chartBar = function(image) {
    var point = ee.Geometry.Point([finalLon, finalLat]);
    var chart = ui.Chart.image.byRegion(image, point, ee.Reducer.mean(), 10) 
            .setChartType('BarChart')
    return chart;
  };
  /** Extract grass cover and grazing capacity values from map layers. */
  app.extract = function() {
    app.setLoadingMode(true);
    app.resultsModel.clear();
    app.resultsRef.clear();
    var point = ee.Geometry.Point([finalLon, finalLat]);
    print(point);
    // Loop through each layer on the map and create an image.
    var allLayers = [];
    var layers = rightMap.layers();
    layers.forEach(function(lay) {
      var img = ee.Image(lay.getEeObject());
      var name = ee.String(lay.getName());
      print(name, img);
      allLayers.push(img);
    });
    var allLayersImg = ee.Image(allLayers);
    print('Layers', allLayers);
    var allExtract = allLayersImg.reduceRegion(ee.Reducer.mean(), point, 30);
     // Loop through each layer on the map and create an image.
    var allLayersRef = [];
    var layersRef = leftMap.layers();
    layersRef.forEach(function(lay) {
      var img = ee.Image(lay.getEeObject());
      var name = ee.String(lay.getName());
      print(name, img);
      allLayersRef.push(img);
    });
    var allLayersImgRef = ee.Image(allLayersRef);
    print('Layers', allLayersRef);
    var allExtractRef = allLayersImgRef.reduceRegion(ee.Reducer.mean(), point, 30);
    // Set loading inspector to loading
    //app.inspector.grassCover.style().set('color', 'gray');
    //app.inspector.graze.style().set('color', 'gray');
    if(globalMetric == 'NDVI') {
      allExtract.get("NDVI").evaluate(function(result) { app.inspector.ndvi.setValue(result.toFixed(2)); app.inspector.ndvi.style().set('color', 'black');});
      allExtractRef.get("NDVI").evaluate(function(result) { app.inspector.ndviRef.setValue(result.toFixed(2)); app.inspector.ndviRef.style().set('color', 'black');});
      var chart = app.chartTimeSeries(globalNDVI.select('NDVI'));
      chart.setOptions(app.CHART_OPTIONS_NDVI_MODEL);
      app.resultsModel.add(chart);
      var chartRef = app.chartTimeSeries(refNDVI.select('NDVI'));
      chartRef.setOptions(app.CHART_OPTIONS_NDVI_REF);
      app.resultsRef.add(chartRef);
    } else if (globalMetric == 'FVC') {
      allExtract.get("bare").evaluate(function(result) { app.inspector.bare.setValue(result.toFixed(2)); app.inspector.bare.style().set('color', 'black');});
      allExtract.get("grassy").evaluate(function(result) { app.inspector.grassy.setValue(result.toFixed(2)); app.inspector.grassy.style().set('color', 'black');});
      allExtract.get("woody").evaluate(function(result) { app.inspector.woody.setValue(result.toFixed(2)); app.inspector.woody.style().set('color', 'black');});
      allExtractRef.get("bare").evaluate(function(result) { app.inspector.bareRef.setValue(result.toFixed(2)); app.inspector.bareRef.style().set('color', 'black');});
      allExtractRef.get("grassy").evaluate(function(result) { app.inspector.grassyRef.setValue(result.toFixed(2)); app.inspector.grassyRef.style().set('color', 'black');});
      allExtractRef.get("woody").evaluate(function(result) { app.inspector.woodyRef.setValue(result.toFixed(2)); app.inspector.woodyRef.style().set('color', 'black');});
      var chart = app.chartBar(globalFVC);
      chart.setSeriesNames(['Bare', 'Grassy', 'Woody']);
      chart.setOptions(app.CHART_OPTIONS_FVC_MODEL);
      app.resultsModel.add(chart);
      var chartRef = app.chartBar(refFVC);
      chartRef.setSeriesNames(['Bare', 'Grassy', 'Woody']);
      chartRef.setOptions(app.CHART_OPTIONS_FVC_REF);
      app.resultsRef.add(chartRef);
    } else if (globalMetric == 'NPP') {
      allExtract.get("NPP").evaluate(function(result) { app.inspector.npp.setValue(result.toFixed(2)); app.inspector.npp.style().set('color', 'black');});
      allExtractRef.get("NPP").evaluate(function(result) { app.inspector.nppRef.setValue(result.toFixed(2)); app.inspector.nppRef.style().set('color', 'black');});
      var chart = app.chartTimeSeries(globalNPP.select('NPP'));
      chart.setOptions(app.CHART_OPTIONS_NPP);
      app.resultsModel.add(chart);
      var chartRef = app.chartTimeSeries(refNPP.select('NPP'));
      chartRef.setOptions(app.CHART_OPTIONS_NPP);
      app.resultsRef.add(chartRef);
    } else if (globalMetric == 'GC') {
      allExtract.get("LSU").evaluate(function(result) { app.inspector.graze.setValue(result.toFixed(2)); app.inspector.graze.style().set('color', 'black');});
      allExtractRef.get(0).evaluate(function(result) { app.inspector.grazeRef.setValue(result.toFixed(2)); app.inspector.grazeRef.style().set('color', 'black');});
      print("extract lsu", allExtractRef.get(0));
    }
    app.setLoadingMode(false);
  };
  /*
  /** Method to run when "Calculate Productivity" button clicked.
  app.calcGrazing = function() {
    print("Grazing calc");
    calcl8 = app.imagery.l8.getValue();
    calcmodis = app.imagery.modis.getValue();
    if (calcl8 && calcmodis ) {
      var grassCovL8 = app.grassL8();
      var grassCovMODIS = app.grassMODIS();
      var nppL8 = app.nppL8();
      var grazeL8 = app.gc(nppL8);
      var nppMODIS = app.nppMODIS();
      var grazeMODIS = app.gc(nppMODIS);
      leftMap.addLayer(ee.Image(grassCovL8), app.VIS_GRASSCOVER, 'Grass Cover (%): Landsat 8');
      leftMap.addLayer(ee.Image(grassCovMODIS), app.VIS_GRASSCOVER, 'Grass Cover (%): MODIS');
      leftMap.addLayer(ee.Image(grazeL8), app.VIS_GRAZINGCAP, 'Grazing Capacity (ha/LSU): Landsat 8');
      leftMap.addLayer(ee.Image(grazeMODIS), app.VIS_GRAZINGCAP, 'Grazing Capacity (ha/LSU): MODIS');
      app.inspector.subpanel.add(app.inspector.panelLS);
      app.inspector.subpanel.add(app.inspector.panelMODIS);
      globalNPPL8 = nppL8;
      globalNPPMODIS = nppMODIS;
      var chartL8 = app.chartResults(nppL8);
      chartL8.setOptions(app.CHART_OPTIONS_L8);
      app.results.add(chartL8);
      var chartMODIS = app.chartResults(nppMODIS);
      chartMODIS.setOptions(app.CHART_OPTIONS_MODIS);
      app.results.add(chartMODIS);
    } else if (calcl8) {
      var grassCovL8 = app.grassL8();
      var nppL8 = app.nppL8();
      print(nppL8)
      var grazeL8 = app.gc(nppL8);
      print(grazeL8)
      leftMap.addLayer(ee.Image(grassCovL8), app.VIS_GRASSCOVER, 'Grass Cover (%): Landsat 8');
      leftMap.addLayer(ee.Image(grazeL8), app.VIS_GRAZINGCAP, 'Grazing Capacity (ha/LSU): Landsat 8');
      app.inspector.subpanel.add(app.inspector.panelLS);
      globalNPPL8 = nppL8;
      var chartL8 = app.chartResults(nppL8);
      chartL8.setOptions(app.CHART_OPTIONS_L8);
      app.results.add(chartL8);
    } else if (calcmodis) {
      var grassCovMODIS = app.grassMODIS();
      var nppMODIS = app.nppMODIS();
      var grazeMODIS = app.gc(nppMODIS);
      leftMap.addLayer(ee.Image(grassCovMODIS), app.VIS_GRASSCOVER, 'Grass Cover (%): MODIS');
      leftMap.addLayer(ee.Image(grazeMODIS), app.VIS_GRAZINGCAP, 'Grazing Capacity (ha/LSU): MODIS');
      app.inspector.subpanel.add(app.inspector.panelMODIS);
      globalNPPMODIS = nppMODIS;
      var chartMODIS = app.chartResults(nppMODIS);
      chartMODIS.setOptions(app.CHART_OPTIONS_MODIS);
      app.results.add(chartMODIS);
    }
    grazeResult = true;
    grassResult = true;
    app.inspector.loadingLabel.style().set('shown', true);
    app.extract();
  };
  */
  /*
  /** Extract grass cover and grazing capacity values from map layers. 
  app.extract = function() {
    app.setLoadingMode(true);
    var point = ee.Geometry.Point([finalLon, finalLat]);
    // Loop through each layer on the map and create an image.
    var allLayers = [];
    var layers = leftMap.layers();
    layers.forEach(function(lay) {
      var img = ee.Image(lay.getEeObject());
      var name = ee.String(lay.getName());
      print(name, img);
      allLayers.push(img.select(0));
    });
    var allLayersImg = ee.Image(allLayers);
    // Extract all grass cover and grazing capacity values
    var allExtract = allLayersImg.reduceRegion(ee.Reducer.mean(), point, 30);
    // Set inspector panel values accordingly
    if (calcl8 && calcmodis) {
      // Set loading inspector to loading
      app.inspector.grasscoverLS.style().set('color', 'gray');
      app.inspector.grazeLS.style().set('color', 'gray');
      app.inspector.grasscoverMODIS.style().set('color', 'gray');
      app.inspector.grazeMODIS.style().set('color', 'gray');
      app.inspector.grasscoverLS.setValue('Loading...');
      app.inspector.grazeLS.setValue('Loading...');
      app.inspector.grasscoverMODIS.setValue('Loading...');
      app.inspector.grazeMODIS.setValue('Loading...');
      // Extract values asynchrononously and display
      allExtract.get("Grass Cover").evaluate(function(result) { app.inspector.grasscoverLS.setValue(result.toFixed(2)); app.inspector.grasscoverLS.style().set('color', 'black');});
      allExtract.get("LSU").evaluate(function(result) { app.inspector.grazeLS.setValue(result.toFixed(2)); app.inspector.grazeLS.style().set('color', 'black');});
      allExtract.get("Grass Cover_1").evaluate(function(result) { app.inspector.grasscoverMODIS.setValue(result.toFixed(2)); app.inspector.grasscoverMODIS.style().set('color', 'black');});
      allExtract.get("LSU_1").evaluate(function(result) { app.inspector.grazeMODIS.setValue(result.toFixed(2)); app.inspector.grazeMODIS.style().set('color', 'black');});
    } else if (calcl8) {
      // Set loading inspector to loading
      app.inspector.grasscoverLS.style().set('color', 'gray');
      app.inspector.grazeLS.style().set('color', 'gray');
      app.inspector.grasscoverLS.setValue('Loading...');
      app.inspector.grazeLS.setValue('Loading...');
      // Extract values asynchrononously and display
      allExtract.get("Grass Cover").evaluate(function(result) { app.inspector.grasscoverLS.setValue(result.toFixed(2)); app.inspector.grasscoverLS.style().set('color', 'black');});
      allExtract.get("LSU").evaluate(function(result) { app.inspector.grazeLS.setValue(result.toFixed(2)); app.inspector.grazeLS.style().set('color', 'black');});
    } else if (calcmodis) {
      // Set loading inspector to loading
      app.inspector.grasscoverMODIS.style().set('color', 'gray');
      app.inspector.grazeMODIS.style().set('color', 'gray');
      app.inspector.grasscoverMODIS.setValue('Loading...');
      app.inspector.grazeMODIS.setValue('Loading...');
      // Extract values asynchrononously and display
      allExtract.get("Grass Cover").evaluate(function(result) { app.inspector.grasscoverMODIS.setValue(result.toFixed(2)); app.inspector.grasscoverMODIS.style().set('color', 'black');});
      allExtract.get("LSU").evaluate(function(result) { app.inspector.grazeMODIS.setValue(result.toFixed(2)); app.inspector.grazeMODIS.style().set('color', 'black');});
    }
    app.setLoadingMode(false);
      /*
      //var len = Map.layers().length();
      for (var i = 0; i < len; i++) {
        var img = ee.Image(Map.layers().get(i).getEeObject());
        var name = ee.String(Map.layers().get(i).getName());
        print("Layer:", name);
        print(img);
        print("Grass i", ee.Algorithms.IsEqual(name, ee.String('Grass Cover (%): Landsat 8')));
        print("Graze Eq",  ee.Algorithms.IsEqual(name, ee.String('Grazing Capacity (ha/LSU): Landsat 8')));
        //if ((name.index('Grass Cover (%): Landsat 8')).getInfo() > -1)
        if (calcl8 && calcmodis ) {
          if ((name.index('Grass Cover (%): Landsat 8')).getInfo() > -1) {
            var sampledPoint = img.reduceRegion(ee.Reducer.mean(), point, 30);
            var computedValue = sampledPoint.get("Grass Cover");
            //app.inspector.grasscoverLS.setValue(computedValue.getInfo());
            computedValue.evaluate(function(result) { app.inspector.grasscoverLS.setValue(result.toFixed(2));});
          } else if ((name.index('Grazing Capacity (ha/LSU): Landsat 8')).getInfo() > -1) {
            var sampledPoint = img.reduceRegion(ee.Reducer.mean(), point, 30);
            var computedValue = sampledPoint.get("LSU");
            //app.inspector.grazeLS.setValue(computedValue.getInfo());
            computedValue.evaluate(function(result) { app.inspector.grazeLS.setValue(result.toFixed(2));});
          } else if ((name.index('Grass Cover (%): MODIS')).getInfo() > -1) {
            var sampledPoint = img.reduceRegion(ee.Reducer.mean(), point, 30);
            var computedValue = sampledPoint.get("Grass Cover");
            //app.inspector.grasscoverMODIS.setValue(computedValue.getInfo());
            computedValue.evaluate(function(result) { app.inspector.grasscoverMODIS.setValue(result.toFixed(2));});
          } else if ((name.index('Grazing Capacity (ha/LSU): MODIS')).getInfo() > -1) {
            var sampledPoint = img.reduceRegion(ee.Reducer.mean(), point, 30);
            var computedValue = sampledPoint.get("LSU");
            //app.inspector.grazeMODIS.setValue(computedValue.getInfo());
            computedValue.evaluate(function(result) { app.inspector.grazeMODIS.setValue(result.toFixed(2));});
          }
        } else if (calcl8) {
          if (ee.Algorithms.IsEqual(name, ee.String('Grass Cover (%): Landsat 8'))) {
            var sampledPoint = img.reduceRegion(ee.Reducer.mean(), point, 30);
            var computedValue = sampledPoint.get("Grass Cover");
            print('grass comp', computedValue);
            //app.inspector.grasscoverLS.setValue(computedValue.getInfo());
            computedValue.evaluate(function(result) { app.inspector.grasscoverLS.setValue(result.toFixed(2));});
          } else if (ee.Algorithms.IsEqual(name, ee.String('Grazing Capacity (ha/LSU): Landsat 8'))) {
            var sampledPoint = img.reduceRegion(ee.Reducer.mean(), point, 30);
            var computedValue = sampledPoint.get("LSU");
            //app.inspector.grazeLS.setValue(computedValue.getInfo());
            print('graze comp', computedValue);
            computedValue.evaluate(function(result) { app.inspector.grazeLS.setValue(result.toFixed(2));});
          }
        } else if (calcmodis) { 
          if ((name.index('Grass Cover')).getInfo() > -1) {
            var sampledPoint = img.reduceRegion(ee.Reducer.mean(), point, 30);
            var computedValue = sampledPoint.get("Grass Cover");
            //app.inspector.grasscoverMODIS.setValue(computedValue.getInfo());
            computedValue.evaluate(function(result) { app.inspector.grasscoverMODIS.setValue(result.toFixed(2));});
          } else if ((name.index('Grazing Capacity')).getInfo() > -1) {
            var sampledPoint = img.reduceRegion(ee.Reducer.mean(), point, 30);
            var computedValue = sampledPoint.get("LSU");
            //app.inspector.grazeMODIS.setValue(computedValue.getInfo());
            computedValue.evaluate(function(result) { app.inspector.grazeMODIS.setValue(result.toFixed(2));});
          }
        }
      }
      //app.inspector.loadingLabel.setValue('Click to inspect productivity values...');
  };*/
  /** Export grass cover and grazing capacity results to Google Drive. */
  /*app.export = function() {
    // Loop through each layer on the map, create an image and export
    var layers = rightMap.layers();
    layers.forEach(function(lay) {
      var img = ee.Image(lay.getEeObject());
      var name = ee.String(lay.getName()).getInfo();
      var region = img.geometry(10).bounds(10).getInfo()["coordinates"];
      var imgtype = img.toFloat();
      Export.image.toDrive({
        image: imgtype,
        description: name,
        fileNamePrefix: name,
        region: region,
        scale: 30,
        maxPixels: 1e10})
    });
  };*/
};
/** Creates the app constants. */
app.createConstants = function() {
  app.LON = 26.43567663935687;
  app.LAT = -32.84163257359404;
  app.ZOOM = 13;
  app.COLLECTION_ID_S2 = 'COPERNICUS/S2';
  app.COLLECTION_ID_L8 = 'LANDSAT/LC08/C01/T1_TOA';
  app.COLLECTION_ID_MODIS = 'MODIS/006/MOD09A1';
  app.SECTION_STYLE = {margin: '5px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.IMAGE_COUNT_LIMIT = 10;
  app.VIS_FVC = {bands:['bare', 'grassy', 'woody'], min: 0, max: 100};
  app.VIS_NDVI = {min: 0.1, max: 0.9, palette: ['brown', 'yellow', 'green']};
  app.VIS_NPP = { min: 0, max: 1000, palette: ['red', 'orange', 'yellow', 'green']}; 
  app.VIS_GRAZINGCAP = { min: 2, max: 12, palette: ['green', 'yellow', 'orange', 'red']}; 
  app.CHART_OPTIONS_NDVI_MODEL = {
    title: 'Model: Seasonal NDVI',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
    interpolateNulls: true,
    series: {
      0: {color: '#78AB46'}
    }
  };
  app.CHART_OPTIONS_NDVI_REF = {
    title: 'MODIS: Seasonal NDVI',
    vAxis: {title: 'NDVI'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
    interpolateNulls: true,
    series: {
      0: {color: '#78AB46'}
    }
  };
  app.CHART_OPTIONS_NPP = {
    title: 'Seasonal NPP (gC/m^2/year) for Sentinel-2',
    vAxis: {title: 'NPP'},
    hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
    interpolateNulls: true,
    series: {
      0: {color: '#78AB46'}
    }
  };
  app.CHART_OPTIONS_FVC_MODEL = {
    title: 'Model: Fractional Vegetation Cover (%)',
    vAxis: {title: 'Cover Type'},
    hAxis: {title: 'Cover (%)'},
    series: {
      0: {color: '#FF0000'},
      1: {color: '#22ff00'},
      2: {color: '#1500ff'}
    }
  };
  app.CHART_OPTIONS_FVC_REF = {
    title: 'MODIS: Fractional Vegetation Cover (%)',
    vAxis: {title: 'Cover Type'},
    hAxis: {title: 'Cover (%)'},
    series: {
      0: {color: '#FF0000'},
      1: {color: '#22ff00'},
      2: {color: '#1500ff'}
    }
  };
  app.CUSTOM_BASE_MAP_STYLE_LIGHT = { 
    'Light Theme': [
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#e3e3e3"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": "0"
            },
            {
                "lightness": "6"
            },
            {
                "weight": "0.90"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "lightness": "0"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#c7d7af"
            },
            {
                "lightness": "-14"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "color": "#cccccc"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "saturation": "0"
            },
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#FFFFFF"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": "-28"
            },
            {
                "saturation": "33"
            },
            {
                "color": "#c7def0"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
]};
  app.VIS_OPTIONS = {
    'False color (B12/B11/B4)': {
      description: 'Vegetation is shades of red, urban areas are ' +
                   'cyan blue, and soils are browns.',
      visParams: {gamma: 1, max: 8048, bands: ['B12', 'B11', 'B4']}
    },
    'Natural color (B4/B3/B2)': {
      description: 'Ground features appear in colors similar to their ' +
                   'appearance to the human visual system.',
      visParams: {gamma: 1, max: 8048, bands: ['B4', 'B3', 'B2']}
    },
    'Atmospheric (B12/B11/B8)': {
      description: 'Coast lines and shores are well-defined. ' +
                   'Vegetation appears blue.',
      visParams: {gamma: 1, max: 8048, bands: ['B12', 'B11', 'B8']}
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
      app.parameters.panel,
      //app.grazing.panel,
      //app.results.panel
    ],
    style: {height: '200px', padding: '5px', stretch: 'horizontal'}
  });
  var split = ui.SplitPanel({
    firstPanel: leftMap,
    secondPanel: rightMap,
    wipe: true
  });
  var splitResults = ui.SplitPanel({
    firstPanel: main,
    secondPanel: app.results.panel,
    wipe: false,
    style: {height: '230px'}
  });
  //leftMap.setControlVisibility(false); 
  leftMap.centerObject(fortBeaufort, app.ZOOM);
  leftMap.setOptions('Light Theme' , app.CUSTOM_BASE_MAP_STYLE_LIGHT);
  leftMap.style().set('cursor', 'crosshair');
  //rightMap.setControlVisibility(false);  
  rightMap.setOptions('Light Theme' , app.CUSTOM_BASE_MAP_STYLE_LIGHT);
  rightMap.style().set('cursor', 'crosshair');
  rightMap.add(app.legend);
  leftMap.add(app.title);
  leftMap.add(app.inspector.panel);
  var linker = ui.Map.Linker([leftMap, rightMap]);
  var full = ui.Panel({
    widgets: [
      split, 
      splitResults
    ],
    style: {stretch: 'both'}
  });
  app.inspector.panel.style().set('shown', true);
  finalLon = app.LON;
  finalLat = app.LAT;
  app.makeLegend();
  print(finalLon, finalLat)
  //app.calcProductivity();
  //app.selectMetric();
  app.parameters.calc.onClick(function() {
    app.calcProductivity();
  });
  // Update isnpector and location when map clicked
  rightMap.onClick(function(coords) {
    finalLon = coords.lon;
    finalLat = coords.lat;
    print(finalLon, finalLat);
    app.extract();
  });
  ui.root.clear();
  ui.root.insert(0, full);
  //ui.root.insert(1, split);
};
app.boot();