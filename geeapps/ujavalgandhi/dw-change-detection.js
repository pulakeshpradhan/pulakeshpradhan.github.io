// Panels are the main container widgets
var mainPanel = ui.Panel({
  style: {width: '300px'}
});
var title = ui.Label({
  value: 'Dynamic World Change Detection',
  style: {'fontSize': '24px'}
});
// You can add widgets to the panel
mainPanel.add(title);
var adminLabel = ui.Label('Select a region');
mainPanel.add(adminLabel);
// You can even add panels to other panels
var adminPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
});
mainPanel.add(adminPanel);
var adminSelector = ui.Select();
adminPanel.add(adminSelector);
var yearLabel = ui.Label('Select the time period (start and end year)');
mainPanel.add(yearLabel);
var yearPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
});
mainPanel.add(yearPanel);
var startYearSelector = ui.Select();
var endYearSelector = ui.Select();
yearPanel.add(startYearSelector);
yearPanel.add(endYearSelector);
var bandPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
});
var probabilityBands = [
    'water', 'trees', 'grass', 'flooded_vegetation', 'crops',
    'shrub_and_scrub', 'built', 'bare', 'snow_and_ice'
    ];
var bandLabel = ui.Label('Select a band');
mainPanel.add(bandLabel);
var bandSelector = ui.Select({
  items: probabilityBands,
  value: 'built'
  });
bandPanel.add(bandSelector);
mainPanel.add(bandPanel);
var thresholdLabel = ui.Label('Set the change threshold');
mainPanel.add(thresholdLabel);
var thresholdPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
    style: {width: '250px'}
});
mainPanel.add(thresholdPanel);
var slider = ui.Slider({
  min: 0.1,
  max: 0.9,
  value: 0.5,
  step: 0.1,
  style: {width: '200px'}
});
thresholdPanel.add(slider);
var button = ui.Button('Show Changes');
mainPanel.add(button);
// Let's add a dropdown with all admin2 areas
var admin2 = ee.FeatureCollection('FAO/GAUL_SIMPLIFIED_500m/2015/level2');
var kenyaAdmin2 = admin2.filter(ee.Filter.eq('ADM0_NAME', 'Kenya'));
var kenyaAdmin2Names = kenyaAdmin2.aggregate_array('ADM2_NAME');
// Evaluate the results and populate the dropdown
kenyaAdmin2Names.evaluate(function(kenyaAdmin2NamesList) {
  adminSelector.items().reset(kenyaAdmin2NamesList);
    adminSelector.setValue(kenyaAdmin2NamesList[0]);
});
// Let's add dropdown with start and end years
var startYears = ee.List.sequence(2017, 2023);
var endYears = ee.List.sequence(2018, 2023);
// Dropdown items need to be strings
var startYearsStrings = startYears.map(function(year){
  return ee.Number(year).format('%04d');
});
var endYearsStrings = endYears.map(function(year){
  return ee.Number(year).format('%04d');
});
// Evaluate the results and populate the dropdown
startYearsStrings.evaluate(function(yearList) {
  startYearSelector.items().reset(yearList);
  startYearSelector.setValue(yearList[0]);
});
endYearsStrings.evaluate(function(yearList) {
  endYearSelector.items().reset(yearList);
  endYearSelector.setValue(yearList[yearList.length -1]);
});
// Define a function that triggers when any value is changed
var showChange = function() {
  var startYear = startYearSelector.getValue();
  var endYear = endYearSelector.getValue();
  var band = bandSelector.getValue();
  var threshold = slider.getValue();
  var admin2Value = adminSelector.getValue();
  var selectedAdmin2 = admin2.filter(ee.Filter.eq('ADM2_NAME', admin2Value));
  var geometry = selectedAdmin2.geometry();
  var beforeStart = ee.Date.fromYMD(ee.Number.parse(startYear), 1, 1);
  var beforeEnd = beforeStart.advance(1, 'year');
  var afterStart = ee.Date.fromYMD(ee.Number.parse(endYear), 1, 1);
  var afterEnd = afterStart.advance(1, 'year');
  var dw = ee.ImageCollection('GOOGLE/DYNAMICWORLD/V1')
  .filterBounds(geometry).select(band);
  var beforeDw = dw
    .filter(ee.Filter.date(beforeStart, beforeEnd))
    .mean();
  var afterDw = dw
    .filter(ee.Filter.date(afterStart, afterEnd))
    .mean();
  var diff = afterDw.subtract(beforeDw);
  var change = diff.abs().gt(threshold);
  var changeVisParams = {min: 0, max: 1, palette: ['white', 'red']};
  Map.clear();
  Map.centerObject(geometry);
  Map.addLayer(change.clip(geometry), changeVisParams, 'Change');
};
button.onClick(showChange);
var authorLabel = ui.Label('App by: Ujaval Gandhi');
mainPanel.add(authorLabel);
Map.setCenter(37.794, 0.341, 7);
ui.root.add(mainPanel);