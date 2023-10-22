var S2_L1C = ui.import && ui.import("S2_L1C", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    S2_L2A = ui.import && ui.import("S2_L2A", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    L8_TOA = ui.import && ui.import("L8_TOA", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            130.99054187782713,
            31.75314893281215
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([130.99054187782713, 31.75314893281215]),
    region = ui.import && ui.import("region", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -55,
                -3
              ],
              [
                -55,
                -4
              ],
              [
                -54,
                -4
              ],
              [
                -54,
                -3
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[-55, -3],
          [-55, -4],
          [-54, -4],
          [-54, -3]]]);
// Change detection using Sentinel-2 NDVI
// Demonstration for Local Government
// Coded by Takuya ITOH 2019.10.12 v3 @RESTEC Toranomon
//                  mod 2019.12.26 v3s
// Coded by Takuya ITOH 2020.05.19 v4 @RESTEC Office SoToBo
// Coded by Takuya ITOH 2020.05.25 brv1 @RESTEC Office SoToBo
// Coded by Takuya ITOH 2020.05.28 brv2 @RESTEC Office SoToBo
// Near Santaren
geometry = /* color: #d63000 */ee.Geometry.Point([-54.875, -3.5137]);
region = ee.Geometry.Rectangle([-55, -4, -54, -3]);
print(geometry);
var app = {};
var maps = [];
var splitPanel = [];
var leftMap = ui.Map();
var rightMap = ui.Map();
ui.Map.Linker([leftMap, rightMap]);
splitPanel = ui.SplitPanel(leftMap, rightMap, null, true);
var NDVI_DIFF_THRESHOLD_S2 = -0.22;
var NDVI_DIFF_THRESHOLD_S2_GAIN = 0.3;
var CLOUD_PIX_THRESHOLD = 20;
// JAXA Forest/Non-Forest map
var dataset = ee.ImageCollection('JAXA/ALOS/PALSAR/YEARLY/FNF')
                  .filterDate('2016-01-01', '2016-12-31');
var forestNonForest = dataset.select('fnf');
forestNonForest = forestNonForest.first();
var blank = ee.Image(0);
var fnf = blank.where(forestNonForest.eq(1), 1); //set the output to 1.
var fnfMask = fnf.updateMask(fnf);
var CS2_BANDS = ['B2','B3','B4','B8','B9','B10','B11','B12','QA60'];
var S2S_NAMES = ['B','G','R','N','V','CR','SWIR1','SWIR2','CM'];
/** Creates the UI panels. */
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'NDVI Change Detection',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('Change Detection using NDVI' +
               'by Sentinel-2')
    ])
  };
  /* The satellite picker section. */
  app.sat_s2 = {
    label: ui.Label(),
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      items: Object.keys(app.SAT_SELECT_S2),
      onChange: function() {
        // Update the label's value with the select's description.
        var option = app.SAT_SELECT_S2[app.sat_s2.select.getValue()];
        app.sat_s2.label.setValue(option.description);
      }
    })
  };
  app.sat_l8 = {
    label: ui.Label(),
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      items: Object.keys(app.SAT_SELECT_L8),
      onChange: function() {
        // Update the label's value with the select's description.
        var option = app.SAT_SELECT_L8[app.sat_l8.select.getValue()];
        app.sat_l8.label.setValue(option.description);
      }
    })
  };
  /* The panel for the satellite section with corresponding widgets. */
  app.sat_s2.panel = ui.Panel({
    widgets: [
      // ui.Label('1) Select Sensor and Set Periods', {fontWeight: 'bold'}),
      app.sat_s2.select,
      app.sat_s2.label
      // app.sat_l8.select,
      // app.sat_l8.label
    ],
    style: app.SECTION_STYLE
  });
  app.sat_l8.panel = ui.Panel({
    widgets: [
      // ui.Label('1) Select Sensor and Set Periods', {fontWeight: 'bold'}),
      // app.sat_s2.select,
      // app.sat_s2.label,
      app.sat_l8.select,
      app.sat_l8.label
    ],
    style: app.SECTION_STYLE
  });
  // Default the select to the first value.
  app.sat_s2.select.setValue(app.sat_s2.select.items().get(0));
  app.sat_l8.select.setValue(app.sat_l8.select.items().get(0));
  /* The collection filter Period controls. */
  app.period = {
    startDate: ui.Textbox('YYYY-MM-DD', '2016-04-01'),
    endDate: ui.Textbox('YYYY-MM-DD', '2016-09-30'),
    margineDate: ui.Textbox('','30'),
    sliderCloudThreshold: ui.Slider({
      min: 0,
      max: 100,
      value: CLOUD_PIX_THRESHOLD,
      onChange: function(value) {
        CLOUD_PIX_THRESHOLD = value;
        // app.refreshMapLayer();
      }
    }),
    // mapButton: ui.Button('Get Map Center', function() { // Get and Change Map Center
    //   geometry = leftMap.getCenter(),
    //   print(geometry)
    //   // app.applyFilters
    // }),
    latNS: ui.Textbox('', 'S'),
    latNum: ui.Textbox('', '03'),
    lonEW: ui.Textbox('', 'W'),
    lonNum: ui.Textbox('', '55'),
    applyButton: ui.Button('Apply', function() {
      app.setGeometryTileID();
      app.applyFilters();
      app.applyFilters();
      app.applyFilters();
    }),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  /* The panel for the Period control widgets. */
  app.period.panel = ui.Panel({
    widgets: [
      ui.Label('1) Set Period/Cloud Cover/TileID', {fontWeight: 'bold'}),
      ui.Label('Start date', app.HELP_TEXT_STYLE), app.period.startDate,
      ui.Label('End date', app.HELP_TEXT_STYLE), app.period.endDate,
      ui.Label('Margine (days)', app.HELP_TEXT_STYLE), app.period.margineDate,
      ui.Label('Cloud Coverage (%)', app.HELP_TEXT_STYLE),
      ui.Panel([
        app.period.sliderCloudThreshold,
      ], ui.Panel.Layout.flow('horizontal')),
      // ui.Label('Change Map Center', app.HELP_TEXT_STYLE),
      // ui.Panel([
      //   app.period.mapButton
      // ], ui.Panel.Layout.flow('horizontal')),
      ui.Label('Latitude N/S', app.HELP_TEXT_STYLE), app.period.latNS,
      ui.Label('Latitude Number', app.HELP_TEXT_STYLE), app.period.latNum,
      ui.Label('Longitude E/W', app.HELP_TEXT_STYLE), app.period.lonEW,
      ui.Label('Longitude Number', app.HELP_TEXT_STYLE), app.period.lonNum,
      ui.Panel([
        app.period.applyButton,
        app.period.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  /* The image picker section. Before/After */
  app.pickerBef_s2 = {
    select: ui.Select({
      placeholder: 'Select Image ID: Sentinel-2',
      onChange: app.refreshMapLayer
    })
  };
  app.pickerBef_s2.panel = ui.Panel({
    widgets: [
      ui.Label('2) Select Image(date)', {fontWeight: 'bold'}),
      ui.Label('Sentinel-2', app.HELP_TEXT_STYLE_L),
      ui.Label('Before:', app.HELP_TEXT_STYLE),
      ui.Panel([
        app.pickerBef_s2.select//,
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  app.pickerAft_s2 = {
    select: ui.Select({
      placeholder: 'Select Image ID: Sentinel-2',
      onChange: app.refreshMapLayer
    })
  };
  app.pickerAft_s2.panel = ui.Panel({
    widgets: [
      ui.Label('After:', app.HELP_TEXT_STYLE),
      ui.Panel([
        app.pickerAft_s2.select
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  app.pickerBef_l8 = {
    select: ui.Select({
      placeholder: 'Select Image ID: Landsat-8',
      onChange: app.refreshMapLayer
    })
  };
  app.pickerBef_l8.panel = ui.Panel({
    widgets: [
      ui.Label('Landsat-8', app.HELP_TEXT_STYLE_L),
      ui.Label('Before:', app.HELP_TEXT_STYLE),
      ui.Panel([
        app.pickerBef_l8.select//,
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  app.pickerAft_l8 = {
    select: ui.Select({
      placeholder: 'Select Image ID: Landsat-8',
      onChange: app.refreshMapLayer
    })
  };
  app.pickerAft_l8.panel = ui.Panel({
    widgets: [
      ui.Label('After:', app.HELP_TEXT_STYLE),
      ui.Panel([
        app.pickerAft_l8.select
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  /* Slider for NDVI threshold */
  app.sliderThreshold = {
    // Create a select with a function that reacts to the "change" event.
    slider: ui.Slider({
      min: -1,
      max: 1,
      value: NDVI_DIFF_THRESHOLD_S2,
      onChange: function(value) {
        NDVI_DIFF_THRESHOLD_S2 = value;
        app.refreshMapLayer();
      }
    })
  };
  /* The panel for the slider section with corresponding widgets. */
  app.sliderThreshold.panel = ui.Panel({
    widgets: [
      ui.Label('3) Set/Change threshold for NDVI', {fontWeight: 'bold'}),
      ui.Panel([
        app.sliderThreshold.slider
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  /* The export section. */
  app.export = {
    button: ui.Button({
      //label: 'Export the current image to Drive',
      label: 'Download URL',
      // React to the button's click event.
      onClick: function() {
        // // Select the full image id.
        // var imageIdBef_s2 = app.pickerBef_s2.select.getValue();
        // var imageIdAft_s2 = app.pickerAft_s2.select.getValue();
        // var sat_s2 = app.SAT_SELECT_S2[app.sat_s2.select.getValue()];
        // var imageBef_s2 = ee.Image(sat_s2.satID + '/' + imageIdBef_s2);
        // var imageAft_s2 = ee.Image(sat_s2.satID + '/' + imageIdAft_s2);
        // var imageIdBef_l8 = app.pickerBef_l8.select.getValue();
        // var imageIdAft_l8 = app.pickerAft_l8.select.getValue();
        // var sat_l8 = app.SAT_SELECT_L8[app.sat_l8.select.getValue()];
        // var imageBef_l8 = ee.Image(sat_l8.satID + '/' + imageIdBef_l8);
        // var imageAft_l8 = ee.Image(sat_l8.satID + '/' + imageIdAft_l8);
        // // Get the visualization options.
        // var vis_s2 = app.SAT_SELECT_S2[app.sat_s2.select.getValue()];
        // var rgbVIS_s2 = vis_s2.rgbVIS;
        // var vis_l8 = app.SAT_SELECT_L8[app.sat_l8.select.getValue()];
        // var rgbVIS_l8 = vis_l8.rgbVIS;
        // // Calculate NDVI data.
        // var ndviBef_s2 = imageBef_s2.normalizedDifference([vis_s2.nir, vis_s2.red]).rename('ndvi');
        // imageBef_s2 = imageBef_s2.addBands(ndviBef_s2);
        // var ndviAft_s2 = imageAft_s2.normalizedDifference([vis_s2.nir, vis_s2.red]).rename('ndvi');
        // imageAft_s2 = imageAft_s2.addBands(ndviAft_s2);
        // var ndviBef_l8 = imageBef_l8.normalizedDifference([vis_l8.nir, vis_l8.red]).rename('ndvi');
        // imageBef_l8 = imageBef_l8.addBands(ndviBef_l8);
        // var ndviAft_l8 = imageAft_l8.normalizedDifference([vis_l8.nir, vis_l8.red]).rename('ndvi');
        // imageAft_l8 = imageAft_l8.addBands(ndviAft_l8);
        // // Calc NDVI diff
        // var ndviDiff_s2 = imageAft_s2.select('ndvi').subtract(imageBef_s2.select('ndvi'));
        // var ndviDiff_l8 = imageAft_l8.select('ndvi').subtract(imageBef_l8.select('ndvi'));
        // // ###### Change Detection using NDVI diff image
        // // Threshold s2 NDVI differences to identify "Change Detection" areas.
        // var ndviDiffThreshold_s2 = ndviDiff_s2.lt(NDVI_DIFF_THRESHOLD_S2);
        // var ndviDiffThreshold_l8 = ndviDiff_l8.lt(NDVI_DIFF_THRESHOLD_S2);
        // // NDVI diff image mask creation
        // ndviDiffThreshold_s2 = ndviDiffThreshold_s2.updateMask(ndviDiffThreshold_s2);
        // ndviDiffThreshold_l8 = ndviDiffThreshold_l8.updateMask(ndviDiffThreshold_l8);
        // // FNF
        // var ndviDiffThreshold_masked_s2 = ndviDiffThreshold.multiply(fnfMask);
        // var ndviDiffThreshold_masked_l8 = ndviDiffThreshold.multiply(fnfMask);
        // // Download example.
        // //var bandEX = vis.bandEX;
        // var scale_s2 = sat_s2.scale;
        // var scale_l8 = sat_l8.scale;
        // print('Download Scale Sentinel-2 : ' + scale_s2);
        // print('Download Scale Landsat-8: ' + scale_l8);
        // // Image Bef
        // print('Download [' + sat_s2.satName + '] ' + rgbVIS_s2.bands + ' for Before ' + imageIdBef_s2);
        // var pathBef_s2 = ee.Image(imageBef_s2).select(rgbVIS_s2.bands).getDownloadURL({
        //   'scale': scale_s2,
        //   'crs': 'EPSG:4326',
        // });
        // print(pathBef_s2);
        // print('Download [' + sat_l8.satName + '] ' + rgbVIS_l8.bands + ' for Before ' + imageIdBef_l8);
        // var pathBef_l8 = ee.Image(imageBef_l8).select(rgbVIS_l8.bands).getDownloadURL({
        //   'scale': scale_s2,
        //   'crs': 'EPSG:4326',
        // });
        // print(pathBef_l8);
        // // Image Aft
        // print('Download [' + sat_s2.satName + '] ' + rgbVIS_s2.bands + ' for After ' + imageIdAft_s2);
        // var pathAft_s2 = ee.Image(imageAft_s2).select(rgbVIS_s2.bands).getDownloadURL({
        //   'scale': scale_s2,
        //   'crs': 'EPSG:4326',
        // });
        // print(pathAft_s2);
        // print('Download [' + sat_l8.satName + '] ' + rgbVIS_l8.bands + ' for After ' + imageIdAft_l8);
        // var pathAft_l8 = ee.Image(imageAft_l8).select(rgbVIS_l8.bands).getDownloadURL({
        //   'scale': scale_l8,
        //   'crs': 'EPSG:4326',
        // });
        // print(pathAft_l8);
        // // Change Detection
        // print('Download [' + sat_s2.satName + '] change Detection');
        // var pathCNG_s2 = ee.Image(ndviDiffThreshold_masked_s2).getDownloadURL({
        //   'scale': scale_s2,
        //   'crs': 'EPSG:4326',
        // });
        // print(pathCNG_s2);
        // print('Download [' + sat_l8.satName + '] change Detection');
        // var pathCNG_l8 = ee.Image(ndviDiffThreshold_masked_l8).getDownloadURL({
        //   'scale': scale_l8,
        //   'crs': 'EPSG:4326',
        // });
        // print(pathCNG_l8);
      }
    })
  };
  /* The panel for the export section with corresponding widgets. */
  app.export.panel = ui.Panel({
    widgets: [
      ui.Label('4) Export Images', {fontWeight: 'bold'}),
      app.export.button
    ],
    style: app.SECTION_STYLE
  });
};
app.createMaps = function() {
  ui.root.widgets().reset([splitPanel]);
};
/** Creates the app functions. */
app.createFunctions = function() {
  /* ???
   * Enables or disables loading mode.
   * @param {boolean} enabled Whether loading mode is enabled.
   */
  app.setLoadingMode = function(enabled) {
    // Set the loading label visibility to the enabled mode.
    app.period.loadingLabel.style().set('shown', enabled);
    // Set each of the widgets to the given enabled mode.
    var loadDependentWidgets = [
      app.sat_s2.select,
      app.sat_l8.select,
      app.period.startDate,
      app.period.endDate,
      app.period.margineDate,
      app.period.sliderCloudThreshold,
      // app.period.mapButton,
      app.period.latNS,
      app.period.latNum,
      app.period.lonEW,
      app.period.lonNum,
      app.period.applyButton,
      app.pickerBef_s2.select,
      app.pickerAft_s2.select,
      app.pickerBef_l8.select,
      app.pickerAft_l8.select,
      app.export.button
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  };
  /** Applies the selection filters currently selected in the UI. */
  app.applyFilters = function() {
    app.setLoadingMode(true);
    var sat_s2 = app.SAT_SELECT_S2[app.sat_s2.select.getValue()];
    var sat_l8 = app.SAT_SELECT_L8[app.sat_l8.select.getValue()];
// print(app.SAT_SELECT_S2);
// print(sat_s2.satID);
// print(sat_s2.collection);
    var search_s2 = sat_s2.collection.filterBounds(region);
    var search_l8 = sat_l8.collection.filterBounds(region);
// print(search_s2);
    // Set filter variables.
    var margine = app.period.margineDate.getValue();
    if (margine) margine = ee.Number.parse(margine);
    var start = app.period.startDate.getValue();
    if (start) start = ee.Date(start);
    start = start.advance(margine.multiply(-1),'day');
    var end = app.period.endDate.getValue();
    if (end) end = ee.Date(end);
    end = end.advance(margine,'day');
// print(start, end);
    // Get CLOUD ID
    var getVal_s2 = app.SAT_SELECT_S2[app.sat_s2.select.getValue()];
    var cloudID_s2 = getVal_s2.cloudID;
    if (start) search_s2 = search_s2.filterDate(start, end).filterMetadata(cloudID_s2, "less_than", CLOUD_PIX_THRESHOLD);
    var getVal_l8 = app.SAT_SELECT_L8[app.sat_l8.select.getValue()];
    var cloudID_l8 = getVal_l8.cloudID;
    if (start) search_l8 = search_l8.filterDate(start, end).filterMetadata(cloudID_l8, "less_than", CLOUD_PIX_THRESHOLD);
    // Get number of images.
    var count_s2 = search_s2.size();
    var count_l8 = search_l8.size();
print('Count Sentinel-2 : ', count_s2);
print('Count Landsat-8 : ', count_l8);
print('Searched ImageCollection/Sentinel-2 : ', search_s2);
print('Searched ImageCollection/Landsat-8 : ', search_l8);
    // Get the list of computed ids.
    var computedIds_s2 = search_s2
        .limit(app.IMAGE_COUNT_LIMIT)
        .reduceColumns(ee.Reducer.toList(), ['system:index'])
        .get('list');
    var computedIds_l8 = search_l8
        .limit(app.IMAGE_COUNT_LIMIT)
        .reduceColumns(ee.Reducer.toList(), ['system:index'])
        .get('list');
    computedIds_s2.evaluate(function(ids) {
      // Update the image picker with the given list of ids.
      app.setLoadingMode(false);
      app.pickerBef_s2.select.items().reset(ids);
      app.pickerAft_s2.select.items().reset(ids);
      // Default the image picker to the first id.
      app.pickerBef_s2.select.setValue(app.pickerBef_s2.select.items().get(0));
      app.pickerAft_s2.select.setValue(app.pickerAft_s2.select.items().get(0));
    });
    computedIds_l8.evaluate(function(ids) {
      // Update the image picker with the given list of ids.
      app.setLoadingMode(false);
      app.pickerBef_l8.select.items().reset(ids);
      app.pickerAft_l8.select.items().reset(ids);
      // Default the image picker to the first id.
      app.pickerBef_l8.select.setValue(app.pickerBef_l8.select.items().get(0));
      app.pickerAft_l8.select.setValue(app.pickerAft_l8.select.items().get(0));
    });
  };
  app.setGeometryTileID = function() {
    var latL = app.period.latNS.getValue();
    var lonL = app.period.lonEW.getValue();
    var latN = ee.Number.parse(app.period.latNum.getValue());
    var lonN = ee.Number.parse(app.period.lonNum.getValue());
print('Tile ID check', latL, lonL, latN, lonN);
    if (latL == 'S') latN = latN.multiply(-1);
    if (lonL == 'W') lonN = lonN.multiply(-1);
print('Tile ID check', latL, lonL, latN, lonN);
    geometry = ee.Geometry.Point(lonN.add(0.5), latN.add(-0.5));
print(geometry);
    region = ee.Geometry.Rectangle([lonN, latN.subtract(1), lonN.add(1), latN]);
print(region)
    leftMap.centerObject(geometry, 9);
  };
  /** Refreshes the current map layer based on the UI widget states. */
  app.refreshMapLayer = function() {
    leftMap.clear();
    rightMap.clear();
    // print('threshold:'+NDVI_DIFF_THRESHOLD_S2);
    var imageIdBef_s2 = app.pickerBef_s2.select.getValue();
    var imageIdAft_s2 = app.pickerAft_s2.select.getValue();
    var imageIdBef_l8 = app.pickerBef_l8.select.getValue();
    var imageIdAft_l8 = app.pickerAft_l8.select.getValue();
    if (imageIdBef_s2) {
print('Image ID', imageIdBef_s2, imageIdAft_s2, imageIdBef_l8, imageIdAft_l8);
      // If an image id is found, create an image.
      var sat_s2 = app.SAT_SELECT_S2[app.sat_s2.select.getValue()];
      var imageBef_s2 = ee.Image(sat_s2.satID + '/' + imageIdBef_s2);
      var imageAft_s2 = ee.Image(sat_s2.satID + '/' + imageIdAft_s2);
      var sat_l8 = app.SAT_SELECT_L8[app.sat_l8.select.getValue()];
      var imageBef_l8 = ee.Image(sat_l8.satID + '/' + imageIdBef_l8);
      var imageAft_l8 = ee.Image(sat_l8.satID + '/' + imageIdAft_l8);
      var vis_s2 = app.SAT_SELECT_S2[app.sat_s2.select.getValue()];
      var vis_l8 = app.SAT_SELECT_L8[app.sat_l8.select.getValue()];
      // Cloud mask from QA data
      var cloudBitMasks2 = 1 << 10;
      var cirrusBitMasks2 = 1 << 11;
      var qas2b = imageBef_s2.select(vis_s2.QA);
      var tmCmasks2b = qas2b.bitwiseAnd(cloudBitMasks2).eq(0).and(qas2b.bitwiseAnd(cirrusBitMasks2).eq(0));
      imageBef_s2 = imageBef_s2.updateMask(tmCmasks2b);
      var qas2a = imageAft_s2.select(vis_s2.QA);
      var tmCmasks2a = qas2a.bitwiseAnd(cloudBitMasks2).eq(0).and(qas2a.bitwiseAnd(cirrusBitMasks2).eq(0));
      imageAft_s2 = imageAft_s2.updateMask(tmCmasks2a);
      var qal8b = imageBef_l8.select(vis_l8.QA);
      var tmCmaskl8b = qal8b.bitwiseAnd(1 << 4).eq(0);
      imageBef_l8 = imageBef_l8.updateMask(tmCmaskl8b);
      var qal8a = imageAft_l8.select(vis_l8.QA);
      var tmCmaskl8a = qal8a.bitwiseAnd(1 << 4).eq(0);
      imageAft_l8 = imageAft_l8.updateMask(tmCmaskl8a);
      // Calculate NDVI data.
      var ndviBef_s2 = imageBef_s2.normalizedDifference([vis_s2.nir, vis_s2.red]).rename('ndvi');
      imageBef_s2 = imageBef_s2.addBands(ndviBef_s2);
      var ndviAft_s2 = imageAft_s2.normalizedDifference([vis_s2.nir, vis_s2.red]).rename('ndvi');
      imageAft_s2 = imageAft_s2.addBands(ndviAft_s2);
      var ndviBef_l8 = imageBef_l8.normalizedDifference([vis_l8.nir, vis_l8.red]).rename('ndvi');
      imageBef_l8 = imageBef_l8.addBands(ndviBef_l8);
      var ndviAft_l8 = imageAft_l8.normalizedDifference([vis_l8.nir, vis_l8.red]).rename('ndvi');
      imageAft_l8 = imageAft_l8.addBands(ndviAft_l8);
      // Calc NDVI diff
      var ndviDiff_s2 = imageAft_s2.select('ndvi').subtract(imageBef_s2.select('ndvi'));
      var ndviDiff_l8 = imageAft_l8.select('ndvi').subtract(imageBef_l8.select('ndvi'));
      // ###### Change Detection using NDVI diff image
      // Threshold s2 NDVI differences to identify "Change Detection" areas.
      var ndviDiffThreshold_s2 = ndviDiff_s2.lt(NDVI_DIFF_THRESHOLD_S2);
      var ndviDiffThresholdGain_s2 = ndviDiff_s2.gt(NDVI_DIFF_THRESHOLD_S2_GAIN);
      var ndviDiffThreshold_l8 = ndviDiff_l8.lt(NDVI_DIFF_THRESHOLD_S2);
      var ndviDiffThresholdGain_l8 = ndviDiff_l8.gt(NDVI_DIFF_THRESHOLD_S2_GAIN);
      // NDVI diff image mask creation
      ndviDiffThreshold_s2 = ndviDiffThreshold_s2.updateMask(ndviDiffThreshold_s2);
      ndviDiffThresholdGain_s2 = ndviDiffThresholdGain_s2.updateMask(ndviDiffThresholdGain_s2);
      ndviDiffThreshold_l8 = ndviDiffThreshold_l8.updateMask(ndviDiffThreshold_l8);
      ndviDiffThresholdGain_l8 = ndviDiffThresholdGain_l8.updateMask(ndviDiffThresholdGain_l8);
      // FNF mask
      var ndviDiffThreshold_masked_s2 = ndviDiffThreshold_s2.multiply(fnfMask);
      var ndviDiffThreshold_masked_l8 = ndviDiffThreshold_l8.multiply(fnfMask);
      var ndviDiffThresholdGain_masked_s2 = ndviDiffThresholdGain_s2.multiply(fnfMask);
      var ndviDiffThresholdGain_masked_l8 = ndviDiffThresholdGain_l8.multiply(fnfMask);
      // Add the image to the map with the corresponding visualization options.
      var rgbVIS_s2 = vis_s2.rgbVIS;
      var rgbVIS_l8 = vis_l8.rgbVIS;
      /* White-Red-Green */
      //var ndviVIS = {bands: 'ndvi', min: 0.0, max: 1.0, palette: 'FFFFFF, CE7E45,' +
      //      'DF923D, F1B555, FCD163, 99B718, 74A901, 66A000, 529400, 3E8601,' +
      //      '207401, 056201, 004C00, 023B01, 012E01, 011D01, 011301'};
      /* Blue-Green-Yellow-Red */
      var ndviVIS = {bands: 'ndvi', min: 0.0, max: 1.0, palette: '0000FF, 0A3419,' +
            '1468F3, 1E9CED, 28D0E6, 27EDC3 ,1BF286 ,0EF849, 02FE0B, 3BFF00,' +
            '85FF00, CFFF00, FFEB00, FFB000, FF7500, FF3A00, FF0000 '};
      var empty = ee.Image().byte();
      // Paint all the polygon edges with the same number and width, display.
      var outline = empty.paint({
        featureCollection: region,
        color: 1,
        width: 3
      });
      // Map add Layer
      leftMap.addLayer(imageBef_s2, rgbVIS_s2, 'Before RGB natural color S2', 1);
      leftMap.addLayer(imageBef_l8, rgbVIS_l8, 'Before RGB natural color L8', 1);
      leftMap.addLayer(outline, {palette: 'FF0000'}, '1deg x 1deg Tile Rectangle');
      rightMap.addLayer(imageBef_s2, rgbVIS_s2, 'Before RGB natural color S2', 0);
      rightMap.addLayer(imageBef_s2, ndviVIS, 'Before NDVI color S2', 0);
      rightMap.addLayer(imageAft_s2, rgbVIS_s2, 'After RGB natural color S2', 1);
      rightMap.addLayer(imageAft_s2, ndviVIS, 'After NDVI color S2', 0);
      rightMap.addLayer(ndviDiff_s2, {}, 'Diff NDVI S2', 0);
      rightMap.addLayer(imageBef_l8, rgbVIS_l8, 'Before RGB natural color L8', 0);
      rightMap.addLayer(imageBef_l8, ndviVIS, 'Before NDVI color L8', 0);
      rightMap.addLayer(imageAft_l8, rgbVIS_l8, 'After RGB natural color L8', 1);
      rightMap.addLayer(imageAft_l8, ndviVIS, 'After NDVI color L8', 0);
      rightMap.addLayer(ndviDiff_l8, {}, 'Diff NDVI L8', 0);
      // rightMap.addLayer(ndviDiffThreshold, {palette:"00FF00", opacity:0.6}, 'NDVI Loss (non-masked)', 0);
      rightMap.addLayer(fnfMask, {palette:"009900", opacity:0.4}, 'FNF map (C)JAXA', 0);
      rightMap.addLayer(outline, {palette: 'FF0000'}, '1deg x 1deg Tile Rectangle');
      rightMap.addLayer(ndviDiffThreshold_masked_s2, {palette:"FFB039", opacity:0.6}, 'NDVI Loss S2', 1);
      // rightMap.addLayer(ndviDiffThresholdGain_masked_s2, {palette:"FFB039", opacity:0.6}, 'NDVI Gain S2', 0);
      rightMap.addLayer(ndviDiffThreshold_masked_l8, {palette:"FF0000", opacity:0.6}, 'NDVI Loss L8', 1);
      // rightMap.addLayer(ndviDiffThresholdGain_masked_l8, {palette:"FF00FF", opacity:0.6}, 'NDVI Gain L8', 0);
    }
  };
};
app.maskS2clouds = function(image) {
  var qa = image.select('QA60')
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0))
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask)//.divide(10000)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
}
app.cloudScore = function(img) { // Function modified for Sentinel-2
  // A helper to apply an expression and linearly rescale the output.
  var rescale = function(img, exp, thresholds) {
    return img.expression(exp, {img: img})
        .subtract(thresholds[0]).divide(thresholds[1] - thresholds[0]);
  };
  // Compute several indicators of cloudyness and take the minimum of them.
  var score = ee.Image(1.0);
  // Clouds are reasonably bright in the blue band.
  score = score.min(rescale(img, 'img.B', [1000, 3000]));
  // score = score.min(rescale(img, 'img.B2', [1000, 3000]));
  // Clouds are reasonably bright in all visible bands.
  score = score.min(rescale(img, 'img.R + img.G + img.B', [2000, 8000]));
  // score = score.min(rescale(img, 'img.B4 + img.B3 + img.B2', [2000, 8000]));
  // Clouds are reasonably bright in all infrared bands.
  score = score.min(
      rescale(img, 'img.N + img.SWIR1 + img.SWIR2', [3000, 8000]));
      // rescale(img, 'img.B8 + img.B11 + img.B12', [3000, 8000]));
  // Clouds are reasonably cool in temperature.
  //score = score.min(rescale(img, 'img.temp', [300, 290])); // Cannot use this function because Sentinel-2 don't have thurmal sensor
  // However, clouds are not snow.
  var ndsi = img.normalizedDifference(['G', 'SWIR1']);
  // var ndsi = img.normalizedDifference(['B3', 'B11']);
  score.min(rescale(ndsi, 'img', [8000, 6000]));
  var cloudScore_threshold = 0.1;
  var mask = score.lt(cloudScore_threshold);
  mask = mask.updateMask(mask);
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask)
      .select("B.*")
      .copyProperties(image, ["system:time_start"])
};
/** Creates the app constants. */
app.createConstants = function() {
  app.SECTION_STYLE = {margin: '10px 0 0 0'};
  app.HELP_TEXT_STYLE_L = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'black'
  };
  app.HELP_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.IMAGE_COUNT_LIMIT = 1000;
  app.SAT_SELECT_S2 = {
    'Sentinel-2 TOA': {
      description: 'Sentinel-2 : Multispectral Instrument (MSI) Level-1C , ' +
                   '[ Data availability : Jun 23, 2015 - ]',
      collection: S2_L1C,
      scale: 14,  // 14=9.6m, 15=4.8m
      satName: 'S2_L1C',
      satID: 'COPERNICUS/S2',
      red: 'B4',
      nir: 'B8',
      QA: 'QA60',
      rgbVIS: {bands: ['B4', 'B3', 'B2'], min: 300, max: 3000.0, gamma:1.3},
      cloudID: 'CLOUDY_PIXEL_PERCENTAGE'
    },
  };
  app.SAT_SELECT_L8 = {
    'Landsat-8 TOA': {
      description: 'USGS Landsat 8 TOA Reflectance (Orthorectified) , ' +
                    '[ Data availability : Jan 1, 1984 - ]',
      collection: L8_TOA,
      scale: 30,  // 12=38m, 13=19m   <- original size over 1,024MB
      satName: 'L8_TOA',
      satID: 'LANDSAT/LC08/C01/T1_RT', // LANDSAT/LC08/C01/T1_RT LANDSAT/LC8_L1T_TOA
      red: 'B4',
      nir: 'B5',
      QA: 'BQA',
      rgbVIS: {bands: ['B4', 'B3', 'B2'], min: 5000, max: 15000, gamma: [0.95, 1.1, 1]},
      cloudID: 'CLOUD_COVER'
    },
  };
};
/** Creates the application interface. */
app.boot = function() {
  app.createConstants();
  app.createFunctions();
  app.createPanels();
  app.createMaps();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      // app.sat_s2.panel,
      // app.sat_l8.panel,
      app.period.panel,
      app.pickerBef_s2.panel,
      app.pickerAft_s2.panel,
      app.pickerBef_l8.panel,
      app.pickerAft_l8.panel,
      app.sliderThreshold.panel,
      // app.export.panel
    ],
    style: {width: '385px', padding: '8px'}
  });
  // Map.centerObject(geometry, 13);
  // leftMap.setCenter(130.99, 31.75, 13);
  leftMap.centerObject(geometry, 9);
  ui.root.insert(0, main);
  app.applyFilters();
  app.applyFilters();
  app.applyFilters();
};
app.boot();