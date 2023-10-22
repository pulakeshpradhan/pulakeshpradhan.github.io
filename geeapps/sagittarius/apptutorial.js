/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var hesBor = ee.FeatureCollection("users/sagittarius/HesseBorderWGS84");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Make a button widget.
var button = ui.Button('Click me!');
var button2 = ui.Button('Click me, too, pls!');
/*
// Set a callback function to run when the
// button is clicked.
button.onClick(function() {
  print('Hello, world!');
});
// Display the button in the console.
print(button);
// Set another callback function on the button.
button2.onClick(function() {
  print('Oh, yeah!');
});
print(button2);
*/
//---------//
// widgets
//---------//
/*
var label = ui.Label('Cool label!');
print(label);
print(ui.Label('Here is a:\nnew line', {whiteSpace: 'pre'}));
var button = ui.Button({
  label: 'Get Map Center',
  onClick: function() {
    print(Map.getCenter());
  }
});
print(button);
*/
//var hesBor = require('users/sagittarius/HesseBorderWGS84')
var srtmImage = ee.Image('CGIAR/SRTM90_V4');
var srtmImageClipped = srtmImage.clip(hesBor);
// checkboxes
var checkbox = ui.Checkbox('Show my SRTM layer', true);
checkbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(0).setShown(checked);
});
Map.addLayer(srtmImage);
print(checkbox);
var checkbox1 = ui.Checkbox('Show my clipped SRTM layer', true);
checkbox1.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(1).setShown(checked);
});
Map.addLayer(srtmImageClipped);
print(checkbox1);
/*
// ui.Slider
var slider = ui.Slider();
slider.setValue(0.9);  // Set a default value.
slider.onChange(function(value) {
  Map.layers().get(0).setOpacity(value);
});
Map.addLayer(ee.Image(255), {palette: 'blue'});
print(slider);
// ui.DateSlider
// Use a DateSlider to create annual composites of this collection.
var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1');
// Use the start of the collection and now to bound the slider.
var start = ee.Image(collection.first()).date().get('year').format();
var now = Date.now();
var end = ee.Date(now).format();
// Run this function on a change of the dateSlider.
var showMosaic = function(range) {
  var mosaic = ee.Algorithms.Landsat.simpleComposite({
    collection: collection.filterDate(range.start(), range.end())
  });
  // Asynchronously compute the name of the composite.  Display it.
  range.start().get('year').evaluate(function(name) {
    var visParams = {bands: ['B4', 'B3', 'B2'], max: 100};
    var layer = ui.Map.Layer(mosaic, visParams, name + ' composite');
    Map.layers().set(0, layer);
  });
};
// Asynchronously compute the date range and show the slider.
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
*/