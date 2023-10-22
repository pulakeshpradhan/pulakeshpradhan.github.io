var Huizhou_b = ui.import && ui.import("Huizhou_b", "table", {
      "id": "users/pengshuhong1231/Huizhou"
    }) || ee.FeatureCollection("users/pengshuhong1231/Huizhou"),
    OLS = ui.import && ui.import("OLS", "imageCollection", {
      "id": "NOAA/DMSP-OLS/NIGHTTIME_LIGHTS"
    }) || ee.ImageCollection("NOAA/DMSP-OLS/NIGHTTIME_LIGHTS");
// Select images from a collection with a silder.
var image = ee.ImageCollection(OLS.select('stable_lights'));
//clip
var collection=image.map(function(img){return img.clip(Huizhou_b)});
// A helper function to show the image for a given year on the default map.
var showLayer = function(year) {
  Map.layers().reset();
  var date = ee.Date.fromYMD(year, 1, 1);
  var dateRange = ee.DateRange(date, date.advance(1, 'year'));
  var image = collection.filterDate(dateRange).first();
  Map.addLayer({
    eeObject: ee.Image(image),
    visParams: {
      min: 0,
      max: 63,
      palette:['000000', 'FFFF00', 'FFA500', 'FF4500', 'FF0000']
    },
    name: String(year)
  });
};
// Create a label and slider.
var label = ui.Label('Light Intensity for Year');
var slider = ui.Slider({
  min: 1992,
  max: 2013,
  step: 1,
  onChange: showLayer,
  style: {stretch: 'horizontal'}
});
// Create a panel that contains both the slider and the label.
var panel = ui.Panel({
  widgets: [label, slider],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-center',
    padding: '7px'
  }
});
// Add the panel to the map.
Map.add(panel);
// Set default values on the slider and map.
slider.setValue(2013);
Map.setCenter(115.06, 23.01, 8);