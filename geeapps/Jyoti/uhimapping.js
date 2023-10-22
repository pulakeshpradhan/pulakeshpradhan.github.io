var c_lst = ui.import && ui.import("c_lst", "imageCollection", {
      "id": "users/Jyoti/GIZCoimbatore"
    }) || ee.ImageCollection("users/Jyoti/GIZCoimbatore"),
    b_lst = ui.import && ui.import("b_lst", "imageCollection", {
      "id": "users/Jyoti/BhubanshwarLSTImages"
    }) || ee.ImageCollection("users/Jyoti/BhubanshwarLSTImages"),
    b_shp = ui.import && ui.import("b_shp", "table", {
      "id": "users/Jyoti/WRI/Bhubaneshwar"
    }) || ee.FeatureCollection("users/Jyoti/WRI/Bhubaneshwar"),
    k_shp = ui.import && ui.import("k_shp", "table", {
      "id": "users/Jyoti/WRI/Kochi"
    }) || ee.FeatureCollection("users/Jyoti/WRI/Kochi"),
    k_lst = ui.import && ui.import("k_lst", "imageCollection", {
      "id": "users/Jyoti/WRI/KochiLSTImages"
    }) || ee.ImageCollection("users/Jyoti/WRI/KochiLSTImages"),
    c_shp = ui.import && ui.import("c_shp", "table", {
      "id": "users/Jyoti/WRI/CoimbatoreNew"
    }) || ee.FeatureCollection("users/Jyoti/WRI/CoimbatoreNew");
var app = {};
Map.drawingTools().setShown(false);
Map.setOptions('SATELLITE');
var place = {'Bhubaneshwar':'Bhubaneshwar','Coimbatore':'Coimbatore','Kochi':'Kochi'};
var year = {'2014':'2014','2015':'2015','2016':'2016','2017':'2017','2018':'2018','2019':'2019','2020':'2020'};
var filtered, city,selectedYear=2014,selectedPlace = 'Bhubaneshwar'; 
function ymdList(imgcol){
    var iter_func = function(image, newlist){
        var date = image.date().format("YYYY-MM-dd");
        newlist = ee.List(newlist);
        return ee.List(newlist.add(date).sort());
    };
    return imgcol.iterate(iter_func, ee.List([]));
}
var attachDate = function (img)
{
  var date = ee.Date(img.id());
  return img.set('system:time_start',date.millis());
};
var bhubaneshwar = b_lst.map(attachDate);
var coimbatore = c_lst.map(attachDate);
var kochi = k_lst.map(attachDate);
var collection = bhubaneshwar.merge(coimbatore).merge(kochi).set('id','users/Jyoti');
// print(collection);
app.createPanels = function() {
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'Land Surface Temperature (LST)',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('This app allows you to interactively monitor LST ' +
               'for three cities Bhubaneshwar, Coimbatore and Kochi '+
               'for years 2014 to 2020 '+
               'Dataset: Landsat 8')
    ])
  };
  app.filters = {
    selectLocation : ui.Select({
      items: Object.keys(place),
      placeholder: 'Choose a Location'
    }),
    selectYear : ui.Select({
      items: Object.keys(year),
      placeholder: 'Choose the Year'
    }),
    applyButton: ui.Button('Apply the above two filters', app.applyFilters),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('1) Select filters', {fontWeight: 'bold'}),
      ui.Label('Location', app.HELPER_TEXT_STYLE), app.filters.selectLocation,
      ui.Label('Year', app.HELPER_TEXT_STYLE), app.filters.selectYear,
      ui.Panel([
        app.filters.applyButton,
        app.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
  app.picker = {
    // Create a select with a function that reacts to the "change" event.
    select: ui.Select({
      placeholder: 'Select a date',
      onChange: app.refreshMapLayer
    })
  };
  app.picker.panel = ui.Panel({
    widgets: [
      ui.Label('2) Select a Date', {fontWeight: 'bold'}),
      ui.Label('Choose a date from the following dropdown',app.HELPER_TEXT_STYLE),
      ui.Panel([
        app.picker.select
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
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
      // app.vis.select,
      app.filters.selectLocation,
      app.filters.selectYear,
      app.filters.applyButton,
      app.picker.select,
    ];
    loadDependentWidgets.forEach(function(widget) {
      widget.setDisabled(enabled);
    });
  };
  app.applyFilters = function() {
    app.setLoadingMode(true);
    var selectedYear = app.filters.selectYear.getValue();
    var selectedPlace = app.filters.selectLocation.getValue();
    if (selectedPlace == 'Bhubaneshwar')
    city = b_shp;
    if(selectedPlace == 'Coimbatore')
    city = c_shp;
    if(selectedPlace == 'Kochi')
    city = k_shp;
    filtered = collection.filterDate(selectedYear, ee.Date.fromYMD(ee.Number.parse(selectedYear),12,31))
                             .filterBounds(city);
    // print(filtered);
    // Get the list of computed ids.
    var computedIds = ymdList(filtered);
    computedIds.evaluate(function(ids) {
      // Update the image picker with the given list of ids.
      app.setLoadingMode(false);
      app.picker.select.items().reset(ids);
      // Default the image picker to the first id.
      // app.picker.select.setValue(app.picker.select.items().get(0));
    });
  };
  app.refreshMapLayer = function() {
    Map.drawingTools().setShown(false);
    Map.clear();
    var imageId = app.picker.select.getValue();
    var d = ee.Image(imageId).date();
      // If an image id is found, create an image.
      var image = filtered.filterDate(imageId).filterBounds(city).first().clip(city);
      // Add the image to the map with the corresponding visualization options.
      // var visOption = app.VIS_OPTIONS[app.vis.select.getValue()];
      // print(image);
      var minValue = image.reduceRegion(ee.Reducer.min(),city,30).get('B10');
      var maxValue = image.reduceRegion(ee.Reducer.max(),city,30).get('B10');
      var viz = {min:minValue.getInfo(),max:maxValue.getInfo(),palette:['0c13ff','f8ff89','ff2d0c']};
      Map.addLayer(image, viz, imageId);
      var outline = ee.Image().byte().paint({
        featureCollection: city,
        color: 1,
        width: 2
      });
      Map.addLayer(outline, {palette: ['green']}, 'Shapefile');
      Map.centerObject(city);
      // print( ee.Number(viz.min).toInt(),viz.max);
      var legend = ui.Panel({
        style: {
          position: 'bottom-right',
          padding: '8px 15px'
        }
      });
      var legendTitle = ui.Label({
        value: 'LST (degree celcius)',
        style: 
        {
          fontWeight: 'bold',
          fontSize: '18px',
          margin: '0 0 4px 0',
          padding: '0'
          }
      });
      legend.add(legendTitle);
      var lon = ee.Image.pixelLonLat().select('latitude');
      var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
      var legendImage = gradient.visualize(viz);
      var panel = ui.Panel({
        widgets: [
          ui.Label(ee.Number(viz.max).toInt().getInfo())
        ],
        });
      legend.add(panel);
      var thumbnail = ui.Thumbnail({
        image: legendImage, 
        params: {bbox:'0,0,10,100', dimensions:'10x200'},  
        style: {padding: '1px', position: 'bottom-center'}
      });
      legend.add(thumbnail);
      panel = ui.Panel({
        widgets: [
          ui.Label(ee.Number(viz.min).toInt().getInfo())
          ],
      });
      legend.add(panel);
      Map.add(legend);
  };
};
app.createConstants = function() {
  app.SECTION_STYLE = {margin: '20px 0 0 0'};
  app.HELPER_TEXT_STYLE = {
      margin: '8px 0 -3px 8px',
      fontSize: '12px',
      color: 'gray'
  };
};
app.boot = function() {
  app.createConstants();
  app.createHelpers();
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.filters.panel,
      app.picker.panel,
    ],
    style: {width: '320px', padding: '8px'}
  });
  Map.setCenter(76.95, 22.25, 4);
  ui.root.insert(0, main);
  app.applyFilters();
};
app.boot();