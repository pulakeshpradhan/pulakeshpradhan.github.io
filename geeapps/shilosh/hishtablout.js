var MODIS_TFA = ui.import && ui.import("MODIS_TFA", "image", {
      "id": "users/shilosh/TFA_Daily/MODIS_Daily_TFA_Israel"
    }) || ee.Image("users/shilosh/TFA_Daily/MODIS_Daily_TFA_Israel");
// A UI to interactively filter a collection, select an individual image
// from the results, display it with a variety of visualizations, and export it.
// The namespace for our application.  All the state is kept in here.
var app = {};
Map.setCenter(35,32,8)
var visparams = {min: 40, max: 150, palette: ['FF0000', '000000', '00FF00']}
var Datestart = '2019-01-01'
  // Reverse the images into imageCollections
var MODIS_TFA_ic = ee.ImageCollection(MODIS_TFA.bandNames().map(function(name) {
  var doy = ee.Number.parse(ee.Algorithms.String(name).replace('TFA','0').replace('_','')).add(1)
  var start_time = ee.Date(Datestart).advance(ee.Number(doy).subtract(1), 'day')
  return MODIS_TFA.select([ee.Algorithms.String(name)],['mod'])
                  .set('system:DOY', doy)
                  .set('system:time_start', start_time.format('yyyy-MM-dd'))
}))
var next_year_TFA_ic = MODIS_TFA_ic.map(function(img) {
  return img.set('system:time_start', ee.Date(img.get('system:time_start')).advance(1,'year').format('yyyy-MM-dd'))})
var next_next_year_TFA_ic = next_year_TFA_ic.map(function(img) {
  return img.set('system:time_start', ee.Date(img.get('system:time_start')).advance(1,'year').format('yyyy-MM-dd'))})
MODIS_TFA_ic = MODIS_TFA_ic.merge(next_year_TFA_ic).merge(next_next_year_TFA_ic)
app.GDDimg = ee.Image(0)
/** Creates the UI panels. */
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'השתבלות',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('הכניסו תאריך הצצה על מנת לצפות בתאריך ההשתבלות  הצפוי')
    ])
  };
  /* The collection filter controls. */
  app.filters = {
    // startDate: ui.Textbox('YYYY-MM-DD', '2019-02-01'),
    startDate: ui.DateSlider({
        start: Datestart,
        value: Datestart,
        period: 1,
        style: {width: '250px'},
      }),
    applyButton: ui.Button('חשב השתבלות', app.applyFilters),
    resultLabel1: ui.Label({
      value: '',
      style: {stretch: 'vertical', color: 'gray', shown: true}
    }),
    resultLabel2: ui.Label({
      value: 'לחץ על המפה כדי לקבל את זמן ההשתבלות הצפוי',
      style: {stretch: 'vertical', color: 'gray', shown: true}
    }),
    resultLabel3: ui.Label({
      value: '',
      style: {stretch: 'vertical', color: 'gray', shown: true}
    }),
    resultLabel4: ui.Label({
      value: '',
      style: {stretch: 'vertical', color: 'gray', shown: true}
    }),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('1) תאריך הצצה', {fontWeight: 'bold'}),
      //ui.Label('Start date', app.HELPER_TEXT_STYLE), 
      app.filters.startDate,
      ui.Panel([
        app.filters.applyButton,
        app.filters.loadingLabel,
        app.filters.resultLabel1,
        app.filters.resultLabel2,
        app.filters.resultLabel3,
        app.filters.resultLabel4
      ], ui.Panel.Layout.flow('vertical'))
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
        // Refresh the map layer.
        app.refreshMapLayer();
      }
    })
  };
  /* The panel for the visualization section with corresponding widgets. */
  app.vis.panel = ui.Panel({
    widgets: [
      ui.Label('2) בחר זן', {fontWeight: 'bold'}),
      app.vis.select,
      app.vis.label
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
    app.filters.resultLabel1.style().set('shown', enabled);
    app.filters.resultLabel1.style().set('shown', enabled);
    // Set each of the widgets to the given enabled mode.
    var loadDependentWidgets = [
      app.vis.select,
      app.filters.startDate,
      app.filters.applyButton,
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  };
// var dd_accum = ee.Image(0)
// function calcHishtablout(doy, dd){
//   // create list of days over which to iterate
//   var days = ee.List.sequence(doy, doy.add(140));
//   // Iterate through years 
//   var accumulate_dd = days.iterate(function(d, dd_accum) {
//     var current_dd = ee.Image(degreeDays.filter(ee.Filter.eq('system:DOY', d)).first())
//     dd_accum = ee.Image(dd_accum).add(current_dd)
//     return dd_accum
//   })
//   return dd_accum
// }
  /** Applies the selection filters currently selected in the UI. */
  app.applyFilters = function() {
    // Refresh the map layer.
    // app.refreshMapLayer();
    // Map.remove(Map.layers().get(0))
    // app.setLoadingMode(true);
    // var filtered = ee.ImageCollection(app.COLLECTION_ID);
    // Map.clear()
    app.setLoadingMode(true);
      // Set filter variables.
    var CultivarOption = app.VIS_OPTIONS[app.vis.select.getValue()];
    var start = ee.Date(app.filters.startDate.getValue()[0]).format('yyyy-MM-dd');
    var end = ee.Date(start).advance(1,'year').format('yyyy-MM-dd')
    var doy = ee.Date(start).getRelative('day', 'year').add(1);
  var DD = CultivarOption.visParams
  // Get the timestamp from the most recent image in the reference collection.
  var time0 = MODIS_TFA_ic.first().get('system:time_start');
  // print('time0 = ', time0)
  // Use imageCollection.iterate() to make a collection of cumulative GDD over time.
  // The initial value for iterate() is a list of GDD images already processed.
  // The first GDD image in the list is just 0.
  var first = ee.List([
  ee.Image(0).addBands(ee.Image(0)).rename(['cumulative', 'DD']).set('system:time_start', time0)
  ]);
  // This is a function to pass to Iterate().
  // As GDD images are computed, add them to the list.
  var accumulate = function(image, list) {
    // Get the latest cumulative anomaly image from the end of the list with
    // get(-1).  Since the type of the list argument to the function is unknown,
    // it needs to be cast to a List.  Since the return type of get() is unknown,
    // cast it to Image.
    var previous = ee.Image(ee.List(list).get(-1));
    var cumulativeImg = previous.select('cumulative').add(image)
    var DDimg = previous.select('DD')
    var days = ee.List(list).size()
    DDimg = DDimg.where(cumulativeImg.gt(DD),days)
    cumulativeImg = cumulativeImg.where(cumulativeImg.gt(DD),-99999)
    // Add the current anomaly to make a new cumulative anomaly image.
    var added = ee.Image.cat([cumulativeImg, DDimg])
    // added.addBands(previous.select('cumulative').add(image))
    .rename(['cumulative', 'DD'])
      // Propagate metadata to the new image.
      .set('system:time_start', image.get('system:time_start'));
    // Return the list with the cumulative anomaly inserted.
    return ee.List(list).add(added);
  };
  // Create an ImageCollection of cumulative anomaly images by iterating.
  // Since the return type of iterate is unknown, it needs to be cast to a List.
  // end = '2021-12-31'
  print('end = ', end)
  var MODIS_TFA_Current = MODIS_TFA_ic.filterDate(start,end)
  var cumulativeList = ee.List(MODIS_TFA_Current.iterate(accumulate, first));
  var cumulative = ee.ImageCollection(cumulativeList);
  // print('cumulative = ', cumulative)
  var last = ee.Image(ee.List(cumulativeList).get(-1));
  app.GDDimg = last.select('DD').clip(MODIS_TFA_Current.first().geometry()).selfMask()
  Map.addLayer(app.GDDimg, visparams ,'GDD ', true, 0.75 )
  if (Map.layers().length() > 1) {Map.remove(Map.layers().get(0))}
  app.setLoadingMode(false);
  // var kDaysGtT = firstDOYimg.reduceRegion(ee.Reducer.min(), firstDOYimg.geometry())
  // Map.addLayer(firstDOYimg,{min:0,max:20},'first day LST>'+DD)//+" for "+kDaysGtT+" days");
  };
  /** Refreshes the current map layer based on the UI widget states. */
  app.refreshMapLayer = function() {
    // Map.clear();
      // Add the image to the map with the corresponding visualization options.
      var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
      // Map.addLayer(image, visOption.visParams, imageId);
  };
};
/** Creates the app constants. */
app.createConstants = function() {
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
  app.IMAGE_COUNT_LIMIT = 10;
    app.VIS_OPTIONS = {
    'Dariel': {
      visParams: 1385
    },
    'Shefa': {
      visParams: 1376
    },
    'Ruta': {
      visParams: 1368
    },
    'Gadish': {
      visParams: 1269
    },
    'Galil': {
      visParams: 1242
    },
    'Negev': {
      visParams: 1231
    },    
    'Ziv': {
      visParams: 1214
    },
    'Kitain': {
      visParams: 1204
    },
    'Binyamin': {
      visParams: 1191
    },
    'Gedera': {
      visParams: 1167
    },
    'Beth-Hashita': {
      visParams: 1167
    },
    'Bar-Nir': {
      visParams: 1150
    },    
    'Omer': {
      visParams: 1126
    },
    'Rotem': {
      visParams: 1125
    },
    'Kinneret': {
      visParams: 1122
    },
    'Amit': {
      visParams: 1113
    },    
    'Zahir': {
      visParams: 1108
    },
    'Aviv': {
      visParams: 1073
    },
    'Yuval': {
      visParams: 996
    },
    'Very late': {
      visParams: 1400
    },
    'Late': {
      visParams: 1300
    },    
    'Intermediate': {
      visParams: 1200
    },
    'Early': {
      visParams: 1100
    },
    'Very early': {
      visParams: 1000
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
      app.vis.panel,
    ],
    style: {width: '320px', padding: '8px'}
  });
  Map.setCenter(35,32,8);
  ui.root.insert(0, main);
  app.applyFilters();
};
app.boot();
Map.onClick(function(coords) {
  // Show the loading label.
  app.filters.resultLabel2.set(ui.Label({
    value: 'טוען...',
    style: {color: 'gray'}
  }));
  // Determine GDD, a long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var sample = app.GDDimg.sample(point, 30);
  var computedValue = sample.first().get('DD');
  // Request the value from the server.
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    app.filters.resultLabel2.set(ui.Label({
      value: 'ימי מעלה להשתבלות' +  ' '+  result,
      // value: 'Growing degree days: '+  result  + ', the predicted date is: ' + endDate.evaluate(function(result) {return ee.String(result)}),
      //value: result,
    }));
  });
    var endDate = ee.Date(app.filters.startDate.getValue()[0]).advance(computedValue,'day').format('yyyy-MMM-dd')
    endDate.evaluate(function(result) {
      // When the server returns the value, show it.
      app.filters.resultLabel3.set(ui.Label('תאריך ההשתבלות הצפוי:'))
      app.filters.resultLabel4.set(ui.Label(result))
      });
});
// Create the title label.
var title = ui.Label('מפת ימי הגידול מההצצה להשתבלות, לחצו על מיקום במפה בכדי לראות את תאריך ההשתבלות הצפוי');
title.style().set('position', 'top-center');
Map.add(title);
// A function to construct a legend for the given single-band vis
// parameters.  Requires that the vis parameters specify 'min' and 
// 'max' but not 'bands'.
function makeLegend(vis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
  // In case you really need it, get the color ramp as an image:
  print(legendImage.getThumbURL({bbox:'0,0,100,8', dimensions:'256x20'}));
  // Otherwise, add it to a panel and add the panel to the map.
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'},  
    style: {padding: '1px', position: 'bottom-center'}
  });
  var panel = ui.Panel({
    widgets: [
      // ui.Label({
      //   value: 'GDD',
      //   style: {
      //     position: 'top-right',
      //     fontWeight: 'bold',
      //     fontSize: '18px',
      //     margin: '0 0 0 0',
      //     padding: '0'
      //   }}),
      ui.Label(String(vis['min'])), 
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label(vis['max'])
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      stretch: 'horizontal',
      position: 'bottom-left',
      padding: '8px 15px'
    }
  });
  return ui.Panel().add(panel).add(thumb);
}
Map.add(makeLegend(visparams));