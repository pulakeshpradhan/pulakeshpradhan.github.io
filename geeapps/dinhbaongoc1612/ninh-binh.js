// Set a center and zoom level.
var s2 = ee.ImageCollection("COPERNICUS/S2")
//var urban = ee.FeatureCollection("users/ujavalgandhi/e2e/ne_10m_urban_areas")
var urban = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level1");
var filtered = urban.filter(ee.Filter.eq('ADM1_NAME', 'Ninh Binh'));
var center = {lon: 108.23414526886658, lat: 12.881275708865289, zoom: 9};
var geometry = filtered.geometry()
var stations = ee.FeatureCollection("users/dinhbaongoc1612/p_stations/coords");
var start = ee.Image(s2.first()).date().get('year').format();
var now = Date.now();
var end = ee.Date(now).format();
// Create two maps.
var leftMap = ui.Map(center);
var rightMap = ui.Map(center);
// Remove UI controls from both maps, but leave zoom control on the left map.
leftMap.setControlVisibility(true);
rightMap.setControlVisibility(true);
leftMap.setControlVisibility({zoomControl: true});
// Link them together.
var linker = new ui.Map.Linker([leftMap, rightMap]);
// Create a split panel with the two maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
// Remove the default map from the root panel.
ui.root.clear();
// Add our split panel to the root panel.
ui.root.add(splitPanel);
var rgb_vis = {min: 0, max: 3200, bands: ['B4', 'B3', 'B2']};
var showMosaic1 = function(range) {
  var mosaic = s2.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
  .filter(ee.Filter.date(range.start(), range.end()))
  .filter(ee.Filter.bounds(geometry))
  var image = mosaic.median(); 
  var preStorm = image.clip(geometry)
  // Asynchronously compute the name of the composite.  Display it.
  range.start().get('year').evaluate(function(name) {
    //var visParams = {bands: ['B4', 'B3', 'B2'], max: 100};
    //var layer_L = ui.Map.Layer(preStorm, visParams, name + ' pre');
    //Map.layers().set(0, layer_L);
    leftMap.addLayer(preStorm, rgb_vis);
    leftMap.addLayer(stations, {color: 'Yellow'}, 'P_Stations');
  });
};
var dateRange1 = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider1 = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 15,
    onChange: showMosaic1
  });
  dateSlider1.style().set('width', '500px');
  dateSlider1.style().set('position', 'bottom-left');
  leftMap.add(dateSlider1.setValue(now));
});
var showMosaic2 = function(range) {
  var mosaic = s2.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 30))
  .filter(ee.Filter.date(range.start(), range.end()))
  .filter(ee.Filter.bounds(geometry))
  var image = mosaic.median(); 
  var postStorm = image.clip(geometry)
  // Asynchronously compute the name of the composite.  Display it.
  range.start().get('year').evaluate(function(name) {
    //var visParams = {bands: ['B4', 'B3', 'B2'], max: 100};
    //var layer_R = ui.Map.Layer(postStorm, visParams, name + ' post');
    //Map.layers().set(1, layer_R);
    rightMap.addLayer(postStorm, rgb_vis);
    rightMap.addLayer(stations, {color: 'Yellow'}, 'P_Stations');
  });
};
var dateRange2 = ee.DateRange(start, end).evaluate(function(range) {
  var dateSlider2 = ui.DateSlider({
    start: range['dates'][0],
    end: range['dates'][1],
    value: null,
    period: 15,
    onChange: showMosaic2
  });
  dateSlider2.style().set('width', '500px');
  dateSlider2.style().set('position', 'bottom-right');
  rightMap.add(dateSlider2.setValue(now));
});
//select stations
var places = {
  CưMgar: [12.877466,108.065125],
  Bắc_Buôn_Ma_Thuột: [12.743518,108.181926],
  Krông_Năng: [13.065400,108.274100]
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
  rightMap.setCenter(places[key][1], places[key][0],16);
  }
});
print(select)
select.style().set('position', 'top-right');
// Set a place holder.
select.setPlaceholder('Lụa chọn Trạm...');