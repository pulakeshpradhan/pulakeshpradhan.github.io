var table = ee.FeatureCollection("users/geogismx/upbl_wgs84");
// The namespace for our application.  All the state is kept in here.
var app = {};// The namespace for our application.  All the state is kept in here.
/** Creates the app constants. */
app.createConstants = function() {
  app.Landsat5_ID = 'LANDSAT/LT05/C01/T1_SR';
  app.Landsat7_ID = 'LANDSAT/LE07/C01/T1_SR';
  app.Landsat8_ID = 'LANDSAT/LC08/C01/T1_SR';
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  //app.IMAGE_COUNT_LIMIT = 60;
  app.VIS_OPTIONS = {
    'PV factor': {
      description: 'fractional cover of photosynthetic vegetation.',
      visParams: {'min': 0.0,'max': 0.6,'bands':'pv', 'palette':['ff0000','008000','0000ff','f1ff62']},
    },
    'NPV factor': {
      description: 'fractional cover of non-photosynthetic vegetation.',
      visParams: {'min': 0.0,'max': 0.6,'bands':'npv', 'palette':['ff0000','008000','0000ff','f1ff62']},
    },
    'C factor': {
      description: 'the ratio of soil loss from landcover.',
      visParams: {'min': 1.1,'max': 1.23,'bands':'Cfactor', 'palette':['ff0000','008000','0000ff','f1ff62']},
    }
  };
   app.sensorBandDictLandsatSR =ee.Dictionary({L8 : ee.List([1,2,3,4,5,7,6,10]),
                            L7 : ee.List([0,1,2,3,4,5,6,9]),
                            L5 : ee.List([0,1,2,3,4,5,6,9]),
                            L4 : ee.List([0,1,2,3,4,5,6,9])
    });
   app.sensorBandDictLandsatTOA =ee.Dictionary({L8 : ee.List([1,2,3,4,5,9,6]),
                            L7 : ee.List([0,1,2,3,4,5,7]),
                            L5 : ee.List([0,1,2,3,4,5,6]),
                            L4 : ee.List([0,1,2,3,4,5,6])
    });
   app.sensorBandDictLandsatTOATemp = ee.Dictionary({L8 : ee.List([9]),
                            L7 : ee.List([5]),
                            L5 : ee.List([5]),
                            L4 : ee.List([5])
    });
   app.bandNamesLandsatSRWTOA = ee.List(['blue','green','red','nir','swir1','temp','swir2','cfmask']);
   app.bandNamesLandsatWOTOA = ee.List(['blue','green','red','nir','swir1','temp','swir2']);
   app.bandNamesLandsatTOA = ee.List(['blue','green','red','nir','swir1','temp','swir2']);
   app.bandNamesLandsatTOATemp = ee.List(['temp']);
   app.bandNamesLandsatSRToDivide = ee.List(['blue','green','red','nir','swir1','swir2']);
   app.bandNamesLandsatSRWTOANotToDivide = ee.List(['temp','cfmask']);
   app.bandNamesLandsatSRWOTOANotToDivide = ee.List(['cfmask']);
   function fMask(img){
          var fmsk = img.select('cfmask');
          var cloudAndShadow = fmsk.eq(2).or(fmsk.eq(4)).eq(0);
          return img.updateMask(img.mask().and(cloudAndShadow));
    }
    var filtered_5 = ee.ImageCollection(app.Landsat5_ID);
    var filtered_7 = ee.ImageCollection(app.Landsat7_ID);
    var filtered_8 = ee.ImageCollection(app.Landsat8_ID);
    var geo = ee.FeatureCollection(table).geometry();
    filtered_5 = filtered_5.filterBounds(geo)
              .filter(ee.Filter.lt('CLOUD_COVER',5))
              .select(app.sensorBandDictLandsatSR.get('L5'),app.bandNamesLandsatSRWTOA)
              .map(fMask);
    filtered_7 = filtered_7.filterBounds(geo)
                           .filter(ee.Filter.lt('CLOUD_COVER',5))
                           .select(app.sensorBandDictLandsatSR.get('L7'),app.bandNamesLandsatSRWTOA)
                           .map(fMask);
    filtered_8 = filtered_8.filterBounds(geo)
                            .filter(ee.Filter.lt('CLOUD_COVER',5))
                            .select(app.sensorBandDictLandsatSR.get('L8'),app.bandNamesLandsatSRWTOA)
                            .map(fMask);
    var filtered = ee.ImageCollection(filtered_5.merge(filtered_7).merge(filtered_8));
    app.filtered = filtered;
    app.geo = geo;
};
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
      app.filters.applyButton,
      //app.applyFilters.filtered,
      app.filters.mapCenter,
      app.picker.select,
      //app.picker.centerButton,
      app.export.button
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  };
  /** Applies the selection filters currently selected in the UI. */
  app.applyFilters = function() {
    app.setLoadingMode(true);
    // Filter bounds to the map if the checkbox is marked.
    //if (app.filters.mapCenter.getValue()) {
      //filtered = filtered.filterBounds(Map.getCenter());
    //}
    // Set filter variables.
    var start = app.filters.startDate.getValue();
    if (start) start = ee.Date(start);
    var year = start.get('year');
    var end = start.advance(1, 'year');
    var filteredcol = app.filtered;
    filteredcol = filteredcol.filterDate(start, end)
    //print(computedIds)
    var  month_list = ee.List(['0','1','2','3','4','5','6','7','8','9','10','11'])
    month_list.evaluate(function(ids) {
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
    var start = app.filters.startDate.getValue();
    if (start) start = ee.Date(start);
    var year = start.get('year');
    var end = start.advance(1, 'year');
    var filteredcol = app.filtered;
    filteredcol = filteredcol.filterDate(start, end)
    //print(filtered);
    var months = ee.List.sequence(1, 12);
    var bandnames = ee.Image(filteredcol.first()).bandNames();
    //print(bandnames)
    var Nfiltered =  ee.ImageCollection(
      ee.List([year]).map(function (y) {
        return months.map(function(m) {
          var month_start = ee.Date.fromYMD(y, m, 1);
          var month_end = month_start.advance(1, 'month');
            return filteredcol.filterDate(month_start, month_end)
                  .reduce(ee.Reducer.percentile([50])).rename(bandnames)
                  .set({'system:time_start': month_start.millis()
                  });
        });
      }).flatten()
    );
    //print(Nfiltered)
    var pv_cal = function(img) {
        var nir = img.select('nir').multiply(0.0001);
        var green = img.select('green').multiply(0.0001);
        var red = img.select('red').multiply(0.0001);
        var pv = img.expression('1.7208*(1.2*(NIR-GREEN)-2.5*(RED-GREEN))+0.1004', {NIR: nir, RED:red, GREEN:green}).rename('pv');
        return img.addBands(pv);
    };
    var npv_cal = function(img) {
        var swir1 = img.select('swir1').multiply(0.0001);
        var red = img.select('red').multiply(0.0001);
        var npv = img.expression('0.82*(SWIR-RED)/(SWIR+RED)+0.0753', {SWIR: swir1, RED:red}).rename('npv');
        return img.addBands(npv);
    };
    var c_cal = function(img) {
        var npv = img.select('npv');
        var pv = img.select('pv');
        var gc = ee.Image(npv).add(ee.Image(pv));
        //gc = gc.lt(100).and(gc.gt(0));
        var Cfactor = gc.expression('exp(-0.0418*(GC-5))', {GC: gc}).rename('Cfactor');
        return img.addBands(Cfactor);
    };
    var compositecol = Nfiltered.map(pv_cal)
                                .map(npv_cal)
                                .map(c_cal);
    var imageId = app.picker.select.getValue();
    //print(imageId)
    if (imageId) {
      // If an image id is found, create an image.
      var month_image = ee.Image(compositecol.filter(ee.Filter.eq('system:index', imageId)).first());
      //var image = ee.Image(app.COLLECTION_ID + '/' + imageId);
      // Add the image to the map with the corresponding visualization options.
      var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
      Map.addLayer(month_image.clip(app.geo), visOption.visParams,imageId);
    }
  };
};
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Landsat 5 and 7 and 8 fractional cover of vegetation',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('This app allows you to filter and export Cfacotor images ' +
               'from the Landsat 5 and 7 and 8 Surface Reflectance collection.')
    ])
  };
  /* The collection filter controls. */
  app.filters = {
    mapCenter: ui.Checkbox({label: 'Filter to map center', value: true}),
    startDate: ui.Textbox('YYYY-MM-DD', '2017-01-01'),
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
      ui.Label('year from 2000-2018', app.HELPER_TEXT_STYLE), app.filters.startDate,
      //ui.Label('End date', app.HELPER_TEXT_STYLE), app.filters.endDate,
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
      placeholder: 'Select a month',
      onChange: app.refreshMapLayer
    })
  };
  /* The panel for the picker section with corresponding widgets. */
  app.picker.panel = ui.Panel({
    widgets: [
      ui.Label('2) Select a month starting from 0', {fontWeight: 'bold'}),
      ui.Panel([
        app.picker.select
        //app.picker.centerButton
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
    var start = app.filters.startDate.getValue();
    if (start) start = ee.Date(start);
    var year = start.get('year');
    var end = start.advance(1, 'year');
    var filteredcol = app.filtered;
    filteredcol = filteredcol.filterDate(start, end)
    //print(filtered);
    var months = ee.List.sequence(1, 12);
    var bandnames = ee.Image(filteredcol.first()).bandNames();
    //print(bandnames)
    var Nfiltered =  ee.ImageCollection(
      ee.List([year]).map(function (y) {
        return months.map(function(m) {
          var month_start = ee.Date.fromYMD(y, m, 1);
          var month_end = month_start.advance(1, 'month');
            return filteredcol.filterDate(month_start, month_end)
                  .reduce(ee.Reducer.percentile([50])).rename(bandnames)
                  .set({'system:time_start': month_start.millis()
                  });
        });
      }).flatten()
    );
    //print(Nfiltered)
    var pv_cal = function(img) {
        var nir = img.select('nir').multiply(0.0001);
        var green = img.select('green').multiply(0.0001);
        var red = img.select('red').multiply(0.0001);
        var pv = img.expression('1.7208*(1.2*(NIR-GREEN)-2.5*(RED-GREEN))+0.1004', {NIR: nir, RED:red, GREEN:green}).rename('pv');
        return img.addBands(pv);
    };
    var npv_cal = function(img) {
        var swir1 = img.select('swir1').multiply(0.0001);
        var red = img.select('red').multiply(0.0001);
        var npv = img.expression('0.82*(SWIR-RED)/(SWIR+RED)+0.0753', {SWIR: swir1, RED:red}).rename('npv');
        return img.addBands(npv);
    };
    var c_cal = function(img) {
        var npv = img.select('npv');
        var pv = img.select('pv');
        var gc = ee.Image(npv).add(ee.Image(pv));
        //gc = gc.lt(100).and(gc.gt(0));
        var Cfactor = gc.expression('exp(-0.0418*(GC-5))', {GC: gc}).rename('Cfactor');
        return img.addBands(Cfactor);
    };
    function toString(s,format){ 
      return ee.Number(s).format(format);
    }
    var compositecol = Nfiltered.map(pv_cal)
                                .map(npv_cal)
                                .map(c_cal);
        var geo = ee.FeatureCollection(table).geometry();
        var imageIdTrailer = app.picker.select.getValue();
        var month_image = ee.Image(compositecol.filter(ee.Filter.eq('system:index', imageIdTrailer)).first());
        // Add the image to the map with the corresponding visualization options.
        var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
        var id_year = toString(year,'%s');
        //print(id_year);
        // Export the image to Drive.
        Export.image.toDrive({
          image: month_image.clip(geo).select(visOption.visParams.bands),
          description: 'fractor_Export_'+id_year.getInfo()+'_'+imageIdTrailer,
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
  Map.setCenter(107.9798, 37.0786, 9);
  ui.root.insert(0, main);
  app.applyFilters();
};
app.boot();