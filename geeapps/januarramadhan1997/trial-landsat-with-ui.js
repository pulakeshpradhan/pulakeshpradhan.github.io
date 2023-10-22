// data slider untuk pilihan data secara tahunan
var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1');
// user interface
var start = ee.Image(collection.first()).date().get('year').format();
var now = Date.now();
var end = ee.Date(now).format();
//bagian operasional data slider
var showMosaic = function(range) {
	var mosaic = ee.Algorithms.Landsat.simpleComposite({
		collection: collection.filterDate(range.start(), range.end())
	});
	//komputasi nama composite band dan ditampilkan
	range.start().get('year').evaluate(function(name) {
		var visParams = {bands: ['B4', 'B3', 'B2'], max: 100};
		var layer = ui.Map.Layer(mosaic, visParams, name + 'composite');
		Map.layers().set(0, layer);
	});
};
//komputasi data range dan tampilan slider
var dateRange = ee.DateRange(start, end).evaluate(function(range) {
	var dateSlider = ui.DateSlider({
		start: range['dates'][0],
		end: range['dates'][1],
		value: null,
		period: 365,
		onChange: showMosaic
	});
	Map.add(dateSlider.setValue(now));
});