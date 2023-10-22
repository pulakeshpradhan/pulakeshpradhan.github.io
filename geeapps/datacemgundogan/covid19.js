var image_prior = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
.select('tropospheric_NO2_column_number_density')
.filterDate('2020-01-28', '2020-02-20');
var image_during = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
.select('tropospheric_NO2_column_number_density')
.filterDate('2020-02-20', '2020-03-13')
var palettes = require('users/gena/packages:palettes');
var palette = palettes.matplotlib.magma[7];
Map.addLayer(image_prior.mean(), {min: 0, max: 0.0003, palette: palette, opacity:0.75});
Map.setCenter(10.084656, 45.060917, 7);
Map.setControlVisibility({all: false, zoomControl: true, mapTypeControl: true});
var linkedMap = ui.Map();
linkedMap.addLayer(image_during.mean(), {min: 0, max: 0.0003, palette: palette, opacity:0.75});
linkedMap.setCenter(10.084656, 45.060917, 7);
linkedMap.setControlVisibility({all: false, zoomControl: true, mapTypeControl: true})
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
var title_prior= Map.add(ui.Label(
'Mean NO2 emissions prior to epidemics', {fontWeight: 'bold', fontSize: '10px', position: 'bottom-left', color: 'slateGrey'}));
var title_during= linkedMap.add(ui.Label(
'Mean NO2 during the epidemics', {fontWeight: 'bold', fontSize: '10px', position: 'bottom-right', color: 'slateGrey'}));
var splitPanel = ui.SplitPanel({
firstPanel: linker.get(0),
secondPanel: linker.get(1),
orientation: 'horizontal',
wipe: true,
style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);
var header = ui.Label('Comparing Mean Tropospheric NO2 Concentration Prior to & During the COVID19 Epidemic in Italy', {fontSize: '15px', color: 'darkSlateGrey', fontWeight: 'bold'});
var text_1 = ui.Label('This map provides a robust comparison of mean tropospheric NO2 concentration prior to and during the COVID19 epidemic in Italy. Troposphere is the lowest region of the atmosphere, extending from the earth´s surface to a height of about 6–10 km (the lower boundary of the stratosphere). Right handside of the panel shows the period between the first COVID19 active case appearence (20 Feb 2020) till 13 Mar 2020. The left handside of the panel shows equal time period before the first case appearance.', {fontSize: '11px'});
var text_2 = ui.Label('Data: Sentinel 5P Near Real Time Data (ESA/Copernicus)', {fontSize: '11px'});
var text_3 = ui.Label('I would like to acknowledge that this app is made thanks to Cristina Vrinceanu´s tutorial. I used this opportunity to learn Google Earth Engine and practice.', {fontSize: '11px'});
var toolPanel = ui.Panel([header, text_1, text_2, text_3], 'flow', {width: '300px'});
var link = ui.Label(
'Sentinel 5P and NO2 Pollution Monitoring', {},
'https://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-5P/Nitrogen_dioxide_pollution_mapped');
var linkPanel = ui.Panel(
[ui.Label('For more information', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);
var viz = {min:0.0, max:300.0, palette:palette};
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
var legendTitle = ui.Label({
value: 'NO2 Concentration (μmol/m²)',
style: {
fontWeight: 'bold',
fontSize: '8 px',
margin: '0 0 4px 0',
padding: '0'
}
});
legend.add(legendTitle);
var makeRow = function(color, name) {
  var colorBox = ui.Label({
style: {
backgroundColor: '#' + color,
padding: '8px',
margin: '0 0 4px 0'
}
});
var description = ui.Label({
value: name,
style: {margin: '0 0 4px 6px'}
});
return ui.Panel({
widgets: [colorBox, description],
layout: ui.Panel.Layout.Flow('horizontal')
});
};
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
var panel_max = ui.Panel({
widgets: [
ui.Label(viz['max'])
],
});
legend.add(panel_max);
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x100'},
style: {padding: '1px', position: 'bottom-center'}
});
legend.add(thumbnail);
var panel_min = ui.Panel({
widgets: [
ui.Label(viz['min'])
],
});
legend.add(panel_min);
toolPanel.add(legend);
ui.root.widgets().add(toolPanel);