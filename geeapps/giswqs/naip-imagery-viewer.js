// Author: Qiusheng Wu (https://wetlands.io | https://GIShub.org) //
var lon = ui.url.get('lon', -99);
var lat = ui.url.get('lat', 47);
var zoom = ui.url.get('zoom', 8);
try {
  Map.setCenter(lon, lat, zoom);
} catch (error) {
  // Load defaults.
  Map.setCenter(-99, 47, 8);
}
// Load National Hydrography Dataset (NHD) 
var HUC10 = ee.FeatureCollection('USGS/WBD/2017/HUC10');  // 18,487 HUC10 watersheds in the U.S.
// Add HUC layer to the map
// Map.setCenter(-99.00, 47.01, 8);
Map.addLayer(ee.Image().paint(HUC10, 0, 1), {}, 'HUC-10 Watershed');   // HUC10 for the entire U.S.
// Find all available NAIP images for a geometry
var findNAIP = function(geometry) {
  var init_collection = ee.ImageCollection('USDA/NAIP/DOQQ')
    .filterBounds(geometry)
    .filterDate('2009-01-01', '2018-12-31')
    .filter(ee.Filter.listContains("system:band_names", "N"));
  var yearList = ee.List(init_collection.distinct(['system:time_start']).aggregate_array('system:time_start'));
  var init_years = yearList.map(function(y){
    return ee.Date(y).get('year');
  });
  // remove duplicates
  init_years = ee.Dictionary(init_years.reduce(ee.Reducer.frequencyHistogram())).keys();
  var years = init_years.map(function(x) {return ee.Number.parse(x)});
  // Available NAIP years with NIR band
  var NAIPAnnual= function(year){
    var start_date = ee.Date.fromYMD(year, 1, 1);
    var end_date = ee.Date.fromYMD(year, 12, 31);
    var collection = init_collection
      .filterDate(start_date, end_date);
    var time_start = ee.List(collection.aggregate_array('system:time_start')).sort().get(0);
    var time_end = ee.List(collection.aggregate_array('system:time_end')).sort().get(-1);
    var col_size = collection.size();
    var image = ee.Image(collection.mosaic().clip(geometry));
    return image.set({'system:time_start': time_start, 'system:time_end': time_end, 'tiles': col_size}); 
  };
  var naip = ee.ImageCollection(years.map(NAIPAnnual));
  return naip;
};
// pad a number with leading zeros
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal')
});
// Add a label to the panel.
inspector.add(ui.Label('Click to select a watershed'));
// Add the panel to the default map.
Map.add(inspector);
// Set the default map's cursor to a "crosshair".
Map.style().set('cursor', 'crosshair');
// Register a callback on the map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Clear the panel and show a loading message.
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Loading...', {color: 'gray'}));
  var i_lyr = 1;
  // get clicked subbasin info
  var clicked_point      = ee.Geometry.Point(coords.lon, coords.lat);
  var clicked_basin_fc   = HUC10.filterBounds(clicked_point);
  var clicked_basin      = ee.Feature(clicked_basin_fc.first());
  var clicked_basin_geom = clicked_basin.geometry();
  var clicked_basin_id   = clicked_basin.get('huc10');
  var huc_id;
  clicked_basin_id.evaluate(function (result) {
    huc_id = String(result);
    // Map.layers().set(i_lyr++, ui.Map.Layer(ee.Image().paint(clicked_basin_geom, 0, 3), {palette: 'red'}, 'HUC Id: ' + String(result)));
  });
  // Get time-series NAIP imagery with NDWI and NDVI bands added
  var naip = findNAIP(clicked_basin_geom);
  var NAIP = naip.sort('system:time_start', false);  // descending order
  var time_start = NAIP
    .reduceColumns(ee.Reducer.toList(), ['system:time_start'])
    .get('list');
  time_start.evaluate(
    function (result) {
      Map.layers().set(i_lyr++, ui.Map.Layer(ee.Image().paint(clicked_basin_geom, 0, 3), {palette: 'red'}, 'HUC Id: ' + huc_id));
      result.forEach(
        function (date) {
          var image = NAIP.filterMetadata('system:time_start', 'equals', date);
          var year = new Date(date).getFullYear();
          var month = new Date(date).getMonth();
          var day = new Date(date).getDate();
          var date_str = String(year) + '-' + String(pad(month, 2)) + '-' + String(pad(day, 2));
          Map.layers().set(i_lyr++, ui.Map.Layer(image, {
              bands: ['N', 'R', 'G']
          }, date_str));
        });
    }
  );
  // Request the value from the server and use the results in a function.
  clicked_basin_id.evaluate(function(result) {
    inspector.clear();
    // Add a label with the results from the server.
    inspector.add(ui.Label({
      value: 'HUC-10 watershed: ' + result,
      style: {stretch: 'vertical'}
    }));
    // Add a button to hide the Panel.
    inspector.add(ui.Button({
      label: 'Close',
      onClick: function() {
        inspector.style().set('shown', false);
      }
    }));
  });
});