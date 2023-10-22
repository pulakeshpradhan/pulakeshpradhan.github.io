var ic = ui.import && ui.import("ic", "imageCollection", {
      "id": "COPERNICUS/S5P/NRTI/L3_NO2"
    }) || ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2"),
    g = ui.import && ui.import("g", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -99.3139007137785,
                19.613588856214243
              ],
              [
                -99.3139007137785,
                19.232820230688993
              ],
              [
                -98.92113948330974,
                19.232820230688993
              ],
              [
                -98.92113948330974,
                19.613588856214243
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Polygon(
        [[[-99.3139007137785, 19.613588856214243],
          [-99.3139007137785, 19.232820230688993],
          [-98.92113948330974, 19.232820230688993],
          [-98.92113948330974, 19.613588856214243]]], null, false);
// define time period
var now = ee.Date(Date.now());
var start = now.advance(-30,'day');
var doy = now.getRelative('day', 'year');
var doy_start = start.getRelative('day', 'year');
// A stricter cloud mask is recommended (default removed qa<0.5)
// https://atmosphere.copernicus.eu/flawed-estimates-effects-lockdown-measures-air-quality-derived-satellite-observations?q=flawed-estimates-effects-lockdown-measures-air-quality-satellite-observations
function maskCloudPixels(im){
    var cf=im.select('cloud_fraction');
    return im.updateMask(cf.lt(0.25)); // keeps pixels with less than 25% cloud
}
// mask cloud
ic = ic.map(maskCloudPixels);
// scale to µmol
ic = ic.select('NO2_column_number_density').map(function(img) {
    return img.multiply(1e6).copyProperties(img, ['system:time_start']);
  })
// select collection band
var im2 = ic.select('NO2_column_number_density')
  .filterDate(start,now)
  .mean(); 
// color palette 
var p=['f1eef6','d7b5d8','df65b0','dd1c77','980043'];
var vis={min:50, max:300, palette:p};
// images to mask out low values
var m2 = im2.gt(50);
ui.root.clear();
ui.root.add(ui.Map());
var Map = ui.root.widgets().get(0);
// base map style
var mapStyle = require('users/sgascoin/apps:mapStyle');
Map.setOptions('mapStyle', {mapStyle: mapStyle.mapStyle});
Map.addLayer(im2.updateMask(m2), vis, 'Last month NO2',true,0.6);
// set legend position of panel
var legend = ui.Panel({
  style: {
  position: 'bottom-left',
  padding: '3px 3px'}});
// Create legend title
var legendTitle = ui.Label({
  value: 'NO2 (µmol/m²)',
  style: {
  fontWeight: 'bold',
  margin: '0 0 0 0'}});
// Add the title to the panel
legend.add(legendTitle);
// create the legend image
var lat = ee.Image.pixelLonLat().select('latitude');
var gradient = lat.multiply((vis.max-vis.min)/100.0).add(vis.min);
var legendImage = gradient.visualize(vis);
// create text on top of legend
var panel = ui.Panel({
  widgets: [
  ui.Label(vis['max'])]});
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x100'},
style: {padding: '1px', position: 'bottom-left'}});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
  widgets: [
  ui.Label(vis['min'])]});
legend.add(panel);
// add legend to left map and date labels
Map.add(legend);
// Create the title label.
var title = ui.Label('Draw a polygon');
title.style().set('position', 'top-center');
Map.add(title);
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  position: 'bottom-right'
});
Map.add(panel);
// center near Wuhan
Map.setCenter(112, 30, 5);
var drawingTools = Map.drawingTools();
drawingTools.setDrawModes(['polygon']);
// Register a function to draw a chart when a user clicks on the map.
drawingTools.onDraw(function(g,gl) {
  panel.clear();
  var t = ee.String('NO2 tropospheric column: ').cat(gl.getName());
  var chart = ui.Chart.image.doySeriesByYear(
    ic,'NO2_column_number_density',g,null,null,null,doy_start,doy);
  chart.setOptions(
  {
  title: t.getInfo(), 
  //titleTextStyle: { color: gl.getColor()},
  vAxis: {title: '(µmol/m2)'},
  hAxis: {title: 'day of year'}});
  panel.add(chart);
  gl.setLocked('true');
});