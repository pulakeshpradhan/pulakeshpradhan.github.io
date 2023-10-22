// A UI to interactively filter to a certain date, zoom to an area of interest,
// display the LSTcont (gap-filled LST) for the current extent, and export it as geotif.
var contLST = function(day, geometry){  
  var CFSV2_TFA = ee.Image("users/shilosh/CFSv2_TFA_Daily_Global"),
      MODIS_TFA = ee.Image("users/shilosh/MODIS_TFA_Daily_Global");
  var firstDay = day;
  var lastDay  = ee.Date(day).advance(1, 'day');
  var Temperature_Band = 'Maximum_temperature_height_above_ground_6_Hour_Interval';
  var Day_Temperature_Band = 'LST_Day_1km';
  var Night_Temperature_Band = 'LST_Night_1km';
  var collection = 'NOAA/CFSV2/FOR6H';
  //Multiply by the scale factor to retrive the original values
  MODIS_TFA = MODIS_TFA.multiply(0.02)
  // Reverse the images into imageCollections
  var MODIS_TFA_ic = ee.ImageCollection(MODIS_TFA.bandNames().map(function(name) { 
    return MODIS_TFA.select([ee.Algorithms.String(name)],['mod']).set('system:DOY', ee.Number.parse(ee.Algorithms.String(name).replace('TFA','0').replace('_','')).add(1)) }))
  var CFSV2_TFA_ic = ee.ImageCollection(CFSV2_TFA.bandNames().map(function(name) { 
    return CFSV2_TFA.select([ee.Algorithms.String(name)],['cfs']).set('system:DOY', ee.Number.parse(ee.Algorithms.String(name).replace('TFA','0').replace('_','')).add(1)) }))
  var modisProjection = MODIS_TFA.projection().crs().getInfo()
  var scale = ee.Image(MODIS_TFA).projection().nominalScale().getInfo();
  // Get the CFSv2 data at MODIS scale and projection.
  var resample = function(image) {
    return image.resample('bilinear')
                .reproject({
                      crs: modisProjection,
                      scale: scale})
                .set('system:DOY', image.get('system:DOY'))
                .set('system:time_start', image.get('system:time_start'));
  };
  //convert Kelvin to Celsius
  var k2celsius = function(image) {
        return image.subtract(ee.Image(273.15))
                    .clip(geometry)
                    .set('system:DOY', image.get('system:DOY'))
                    .set('system:time_start', image.get('system:time_start'));};
  // Add a property with doy to the colection.
  function createDoyBand(img) {
    var d = ee.Date(img.get('system:time_start'))
      .getRelative('day', 'year')
      .add(1);
    img=img.set('system:DOY', d);
    return img;
  }
  // Construct image date from 'system:index' and add it to a new 'date' property 
  var addTimeStampToCFSv2 = function(image) {
     var start = ee.String(image.get('system:index'));
     var y = start.slice(0,4);
     var m = start.slice(4,6);
     var d = start.slice(6,8);
     var date = y.cat('-').cat(m).cat('-').cat(d);
     return image.set({'system:time_start': date});
  };
  // Construct image date from 'system:index' and add it to a new 'date' property 
  var addTimeStampToMODIS = function(image) {
     var start = ee.String(image.get('system:index'));
    // var date = start.replace(/_/g, '-');
     start = start.replace('_', '-');
     var date = start.replace('_', '-');
     return image.set({'system:time_start': ee.String(date)});
  };
  // Calculate the daily mean of the 4 images (00, 06, 12, 18) 
  var daily_mean = function(image) {
     return image.reduce(ee.Reducer.mean())
                  .set('system:DOY', image.get('system:DOY'))
                  .set('system:time_start', image.get('system:time_start'));
  };
  CFSV2_TFA_ic = CFSV2_TFA_ic.map(resample);
  // Convert the date string into milliseconds integer
  var dayMillis = 86400000 // 86400000 is 1 day in milliseconds
  var intFirstDay = ee.Date(firstDay).millis()
  var intLastDay  = ee.Date(lastDay).millis().subtract(dayMillis)
  // Collect all 4 images of each day and create imageCollection from the daily mean.
  var CFSV2 = ee.ImageCollection(ee.List.sequence(intFirstDay, intLastDay, dayMillis).map(function (day){
    return  ee.ImageCollection('NOAA/CFSV2/FOR6H')
                          .select('Maximum_temperature_height_above_ground_6_Hour_Interval')
                          .filterDate(day, ee.Number(day).add(dayMillis))
                          // .filter(ee.Filter.calendarRange(doy, doy, 'day_of_year'))
                          .map(resample)
                          .map(k2celsius)
                          .mean()
                          .set({'system:DOY': ee.Date(day).getRelative('day', 'year').add(1)})
                          .set({'system:time_start': ee.Date(day)})
  }))
  // Use an equals filter to specify how the collections match.
  var Filter = ee.Filter.equals({
    leftField: 'system:DOY',
    rightField: 'system:DOY'
  });
    // Define the join.
    var innerJoin = ee.Join.inner('primary', 'secondary');
  // Join CFSV2 with CFSV2_TFA_ic by DOY
    // Apply the join.
    var CFSV2_JoinInner = innerJoin.apply(CFSV2, CFSV2_TFA_ic, Filter);
  // Calculate CFSv2 anomalies
  var CFSV2_Anomalies = CFSV2_JoinInner.map(function(f) {
    var tfa = ee.Image(f.get('secondary'));
    var actual = ee.Image(f.get('primary'));
    return actual.subtract(tfa)
            .set('system:time_start', actual.get('system:time_start'))
            .set('system:DOY', actual.get('system:DOY'));
  })//.map(addTimeStampToCFSv2)
                 //.map(createDoyBand);
  // Join MODIS_TFA_ic with CFSV2_Anomalies by DOY
    // Apply the join.
    var MODIS_JoinInner = innerJoin.apply(CFSV2_Anomalies, MODIS_TFA_ic, Filter);
  // print('MODIS_JoinInner = ' ,MODIS_JoinInner)
  // Calculate MODIS TFA Plus CFSv2 anomalies
  var MODIS_Continuous = MODIS_JoinInner.map(function(f) {
    var anomalies       = ee.Image(f.get('primary'));
    var tfa = ee.Image(f.get('secondary'));
      // Anomalies at night do not conribute to the TFA only prediction, 
      // therefor because we are trying to predict daily mean LST, we only add half of the daily anomalies
    return (anomalies.divide(ee.Image(2))).add(tfa)//.subtract(anomalies);
            .set('system:time_start', anomalies.get('system:time_start'))
            .set('system:DOY', anomalies.get('system:DOY'));
  })//.map(addTimeStampToCFSv2)
                 //.map(createDoyBand);
  // print('MODIS_Continuous = ' ,MODIS_Continuous)
  Temperature_Band = 'LST_Day_1km';
  collection = 'MODIS/006/MYD11A1';
  //convert Kelvin to Celsius
  var modis_k2celsius = function(image) {
        return image.updateMask(image.select(Day_Temperature_Band))
                    .updateMask(image.select(Night_Temperature_Band))
                    .reduce( ee.Reducer.mean()).rename(Temperature_Band)
                    .multiply(ee.Image(0.02))
                    .subtract(ee.Image(273.15))
                    .clip(geometry)
                    .set('system:time_start', ee.Date(image.get('system:time_start')))
                    .rename([ee.String('daily_').cat(image.get('system:time_start'))]);
  };
  var MODIS_LST = ee.ImageCollection(collection)
              .filterDate(firstDay, lastDay)
              .select(Day_Temperature_Band, Night_Temperature_Band)
              //.map(function (image){return image.reduce(ee.Reducer.mean())})
              .map(addTimeStampToMODIS)
              .map(modis_k2celsius)
  // Use an equals filter to specify how the collections match.
  Filter = ee.Filter.equals({
    leftField: 'system:time_start',
    rightField: 'system:time_start'
  });
  // Join MODIS_LST with MODIS_TFA_plus_CFSV2_Anomalies by DOY
    // Apply the join.
    var MODIS_Blended_JoinInner = innerJoin.apply(MODIS_LST, MODIS_Continuous, Filter);
  // Blend the results to fill LST gaps
  var MODIS_LST_Blended_Daily = MODIS_Blended_JoinInner.map(function(f) {
    var prediction = ee.Image(f.get('secondary'));
    var lst = ee.Image(f.get('primary'));
    return prediction.blend(lst);
  })
  // ******* Day LSTcont *********
  MODIS_TFA = ee.Image("users/shilosh/MODIS_TFA_Day_Global");
  //Multiply by the scale factor to retrive the original values
  MODIS_TFA = MODIS_TFA.multiply(0.02)
  // Reverse the images into imageCollections
  MODIS_TFA_ic = ee.ImageCollection(MODIS_TFA.bandNames().map(function(name) { 
    return MODIS_TFA.select([ee.Algorithms.String(name)],['mod']).set('system:DOY', ee.Number.parse(ee.Algorithms.String(name).replace('TFA','0').replace('_','')).add(1)) }))
  MODIS_Continuous = MODIS_TFA_ic
  Temperature_Band = 'LST_Day_1km';
  collection = 'MODIS/006/MYD11A1';
  //convert Kelvin to Celsius
  var modis_day_k2celsius = function(image) {
        return image.updateMask(image.select(Day_Temperature_Band))
                    .reduce( ee.Reducer.mean())
                    .multiply(ee.Image(0.02))
                    .subtract(ee.Image(273.15))
                    .clip(geometry)
                    .set('system:time_start', ee.Date(image.get('system:time_start')))
                    .rename([ee.String('day_').cat(image.get('system:time_start'))]);
  };
  var MODIS_LST_Day = ee.ImageCollection(collection)
              .filterDate(firstDay, lastDay)
              .select(Day_Temperature_Band)
              //.map(function (image){return image.reduce(ee.Reducer.mean())})
              .map(addTimeStampToMODIS)
              .map(modis_day_k2celsius)
              .map(createDoyBand)
  // Use an equals filter to specify how the collections match.
  Filter = ee.Filter.equals({
    leftField: 'system:DOY',
    rightField: 'system:DOY'
  });
  // Join MODIS_LST with MODIS_TFA_plus_CFSV2_Anomalies by DOY
    // Apply the join.
  MODIS_Blended_JoinInner = innerJoin.apply(MODIS_LST_Day, MODIS_Continuous, Filter);
  // Blend the results to fill LST gaps
  var MODIS_LST_Blended_Day = MODIS_Blended_JoinInner.map(function(f) {
    var prediction = ee.Image(f.get('secondary'));
    var lst = ee.Image(f.get('primary'));
    return prediction.blend(lst);
  })  
  // ******* Night LSTcont *********
  MODIS_TFA = ee.Image("users/shilosh/MODIS_TFA_Night_Global");
  //Multiply by the scale factor to retrive the original values
  MODIS_TFA = MODIS_TFA.multiply(0.02)
  // Reverse the images into imageCollections
  MODIS_TFA_ic = ee.ImageCollection(MODIS_TFA.bandNames().map(function(name) { 
    return MODIS_TFA.select([ee.Algorithms.String(name)],['mod']).set('system:DOY', ee.Number.parse(ee.Algorithms.String(name).replace('TFA','0').replace('_','')).add(1)) }))
  MODIS_Continuous = MODIS_TFA_ic
  Temperature_Band = 'LST_Night_1km';
  collection = 'MODIS/006/MYD11A1';
  //convert Kelvin to Celsius
  var modis_night_k2celsius = function(image) {
        return image.updateMask(image.select(Night_Temperature_Band))
                    .reduce( ee.Reducer.mean())
                    .multiply(ee.Image(0.02))
                    .subtract(ee.Image(273.15))
                    .clip(geometry)
                    .set('system:time_start', ee.Date(image.get('system:time_start')))
                    .rename([ee.String('Night_').cat(image.get('system:time_start'))]);
  };
  var MODIS_LST_Night = ee.ImageCollection(collection)
              .filterDate(firstDay, lastDay)
              .select(Night_Temperature_Band)
              //.map(function (image){return image.reduce(ee.Reducer.mean())})
              .map(addTimeStampToMODIS)
              .map(modis_night_k2celsius)
              .map(createDoyBand)
  // Use an equals filter to specify how the collections match.
  Filter = ee.Filter.equals({
    leftField: 'system:DOY',
    rightField: 'system:DOY'
  });
  // Join MODIS_LST with MODIS_TFA_plus_CFSV2_Anomalies by DOY
    // Apply the join.
  MODIS_Blended_JoinInner = innerJoin.apply(MODIS_LST_Night, MODIS_Continuous, Filter);
  // Blend the results to fill LST gaps
  var MODIS_LST_Blended_Night = MODIS_Blended_JoinInner.map(function(f) {
    var prediction = ee.Image(f.get('secondary'));
    var lst = ee.Image(f.get('primary'));
    return prediction.blend(lst);
  })
  // Check if current day exist, otherwise popup a msgbox
  if (MODIS_LST_Blended_Daily.first().getInfo()){
    return ee.Image(MODIS_LST_Blended_Daily.first())
                .addBands(ee.Image(MODIS_LST_Night.first()))
                .addBands(ee.Image(MODIS_LST_Blended_Night.first()))
                .addBands(ee.Image(MODIS_LST_Day.first()))
                .addBands(ee.Image(MODIS_LST_Blended_Day.first()))
  }else{
      alert("Can\'t calculate LST. \nThe selected date has no data");
  }
};
//_________________________________________________
//function to calculate min & max band values for visualisation
var min_max = function(image, attributeName, bounds){
    var minmax = image.reduceRegion({
      reducer:ee.Reducer.minMax(),
      geometry:bounds,
      maxPixels:10000000000,
      });
    var min = (minmax.getNumber(attributeName.cat('_min')))
    var max = (minmax.getNumber(attributeName.cat('_max'))) 
    min = min.getInfo()
    max = max.getInfo()
  return [min, max]
}
// _________________________________________________________________
// A function to construct a legend for the given single-band vis
// parameters.  Requires that the vis parameters specify 'min' and 
// 'max' but not 'bands'.
function makeLegend(vis) {
  var lon = ee.Image.pixelLonLat().select('longitude');
  var gradient = lon.multiply((vis.max-vis.min)/100.0).add(vis.min);
  var legendImage = gradient.visualize(vis);
  // Otherwise, add it to a panel and add the panel to the map.
  var thumb = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,100,8', dimensions:'256x20'},  
    style: {padding: '1px', position: 'bottom-center'}
  });
  var min = ee.Number(vis.min).format('%.1f')
  var max = ee.Number(vis.max).format('%.1f')
  var panel = ui.Panel({
    widgets: [
      // ui.Label(String(vis['min'])), 
      ui.Label(min.getInfo()), 
      ui.Label('°C'),
      ui.Label({style: {stretch: 'horizontal'}}), 
      ui.Label(max.getInfo()),
      ui.Label('°C')
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal'}
  });
  return ui.Panel().add(panel).add(thumb);
}
// _________________________________________________________________
// A function to construct a panel for the getDownloadURL
function makeUrlPanel(url) {
  // add the panel to the map.
  var panel = ui.Panel({
    widgets: [
      // ui.Label(String(vis['min'])), 
      ui.Label(url), 
      // ui.Label({style: {stretch: 'horizontal'}}), 
      // ui.Label(max.getInfo())
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {stretch: 'horizontal'}
  });
  return ui.Panel().add(panel)//.add(thumb);
}
// _______________________________________________________
// The namespace for our application.  All the state is kept in here.
var app = {};
// Map.setCenter(-3,40,9)
var Datestart = '2020-05-01'
/** Creates the UI panels. */
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Continuous MODIS LST',
        style: {fontWeight: 'bold', fontSize: '22px', margin: '10px 5px'}
      }),
      ui.Label('This app uses time-series analysis technics ' +
                'to predict MODIS LST (MYD11A1) values in cloudy pixels.',{fontSize:'12px'})
    ])
  };
  /* The collection filter controls. */
  app.filters = {
    startDate: ui.DateSlider({
    start: '2002-07-04',
    value: Datestart,
    period: 1,
    style: {width: '250px'},
      }),
    applyButton: ui.Button('Calculate LST for current extent', app.applyFilters),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('1) LST date', {fontWeight: 'bold'}),
      //ui.Label('Start date', app.HELPER_TEXT_STYLE), 
      app.filters.startDate,
      // app.filters.mapCenter,
      ui.Panel([
        app.filters.applyButton,
        app.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  /* The export section. */
  app.export = {
    button: ui.Button({
      label: 'Export the current image',
      // React to the button's click event.
      onClick: function() {
        app.export.panel.remove(app.urlWidget)
        // Select the full image id.
        var image = app.image;
        // Export the image to Drive.	        
        Export.image.toDrive({	          
          image: ee.Image(image),	          
          description: 'LST-' ,	        
        });
        var bounds = ee.Geometry.Rectangle(Map.getBounds(),'EPSG:4326', false);
        var ExportingLinks;
        if (bounds.area(1000).divide(1000000).getInfo() < 500000){
          var url = image.getDownloadURL({ 
            name: "LST_",
            // region: ROI,
            scale: 1000,//Map.getScale(),
            format: 'GeoTIFF',
            crs: "EPSG:4326",
            }); 
            // print(url)
            ExportingLinks=ui.Label('Click to download').setUrl(url); //This creates a hyper link.
            app.urlWidget = ExportingLinks
            app.export.panel.add(ExportingLinks);
            // Add panel with image download url
            var widgets = require('users/fitoprincipe/geetools:widgets')
            var panel = new widgets.ClosePanel({
              widgets:[ui.Label('Click here to download image',{},url)],
              style: {position: 'bottom-center'},
              inner_style: {
                border: '1px solid black'
              },
              layout: ui.Panel.Layout.flow('horizontal')
            })
            // panel.onClose(function(wid) {print('panel closed..')})
            panel.addTo(Map)
        }else{
            ExportingLinks=ui.Label('Can\'t download, area is too big',{color:'red',fontWeight :'bold'})
            app.export.panel.add(ExportingLinks);
            alert("Can\'t download, area is too big. \nDownloadable area is limited to 500,000 sq Km");
        }
      }
    })
  };
  /* The panel for the export section with corresponding widgets. */
  var geeCodeUrl = 'https://code.earthengine.google.com/?scriptPath=users%2Fshilosh%2Fdefault%3AUser%20Interface%2FLSTcont%20Explorer'
  app.export.panel = ui.Panel({
    widgets: [
      ui.Label('2) Start an export', {fontWeight: 'bold'}),
      ui.Label('Click the button to prepare the image and then click the link ' +
                'bellow to download the image as a geotiff. ' +
                'Downloadable area is limited to 500,000 sq Km',{fontSize:'12px'}),
      ui.Label('If larger area is needed, click here and ' + 
                'log in as a Google Earth Engine User',{fontSize:'12px'}).setUrl(geeCodeUrl),
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
      // app.vis.select,
      app.filters.startDate,
      // app.filters.endDate,
      app.filters.applyButton,
      // app.filters.mapCenter,
      // app.picker.select,
      // app.picker.centerButton,
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
    // Set filter variables.
    var start = ee.Date(app.filters.startDate.getValue()[0]).format('yyyy-MM-dd');
    //   // Update the image picker with the given list of ids.
      app.setLoadingMode(false);
            // Refresh the map layer.
      app.refreshMapLayer();
  };
  /** Refreshes the current map layer based on the UI widget states. */
  app.refreshMapLayer = function() {
    Map.clear();
    // var imageId = app.picker.select.getValue();
    // if (app.image) {
      // If an image is found, create an image.
      // var image = ee.Image(app.COLLECTION_ID + '/' + imageId );
      var bounds = ee.Geometry.Rectangle(Map.getBounds(),'EPSG:4326', false);
      // print(bounds.area(1000).divide(1000000))
      var day = ee.Date(app.filters.startDate.getValue()[0]).format('yyyy-MM-dd');
      var image = contLST(day, bounds)
      // Add the image to the map with the corresponding visualization options.
      // var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
      app.image = image
      var attributeName = ee.String(image.bandNames().getString(0))
      var minmax = min_max(image, attributeName, bounds)
      app.visParams = {min:minmax[0], max:minmax[1],   palette: [
          '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
          '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
          '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
          'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
          'ff0000', 'de0101', 'c21301', 'a71001', '911003'
        ],}
      Map.addLayer(image.select(0), app.visParams, 'Daily continuous LST',true,0.7);
      attributeName = ee.String(image.select(2).bandNames().getString(0))
      minmax = min_max(image, attributeName, bounds)
      Map.addLayer(image.select(1), 
                {min:minmax[0], max:minmax[1]}, 'Night original LST',false,0.7);
      Map.addLayer(image.select(2), 
                {min:minmax[0], max:minmax[1]}, 'Night continuous LST',false,0.7);      attributeName = ee.String(image.select(2).bandNames().getString(0))
      attributeName = ee.String(image.select(4).bandNames().getString(0))
      minmax = min_max(image, attributeName, bounds)
      Map.addLayer(image.select(3), 
                {min:minmax[0], max:minmax[1]}, 'Day original LST',false,0.7);
      Map.addLayer(image.select(4), 
                {min:minmax[0], max:minmax[1]}, 'Day continuous LST',false,0.7);      Map.add(makeLegend(app.visParams));
      app.export.panel.remove(app.urlWidget)
    // }
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
  // app.IMAGE_COUNT_LIMIT = 10;
  app.urlWidget = ui.Label()
  app.image = 0
  app.visParams = {}
  // app.VIS_OPTIONS = {
  //   'False color (B7/B6/B4)': {
  //     description: 'Vegetation is shades of red, urban areas are ' +
  //                 'cyan blue, and soils are browns.',
  //     visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B7', 'B6', 'B4']}
  //   },
  //   'Natural color (B4/B3/B2)': {
  //     description: 'Ground features appear in colors similar to their ' +
  //                 'appearance to the human visual system.',
  //     visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B4', 'B3', 'B2']}
  //   },
  //   'Atmospheric (B7/B6/B5)': {
  //     description: 'Coast lines and shores are well-defined. ' +
  //                 'Vegetation appears blue.',
  //     visParams: {gamma: 1.3, min: 0, max: 0.3, bands: ['B7', 'B6', 'B5']}
  //   }
  // };
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
      // app.picker.panel,
      // app.vis.panel,
      app.export.panel
    ],
    style: {width: '320px', padding: '8px'}
  });
  // Map.setCenter(-3, 40, 9);
  ui.root.insert(0, main);
  app.applyFilters();
};
app.boot();