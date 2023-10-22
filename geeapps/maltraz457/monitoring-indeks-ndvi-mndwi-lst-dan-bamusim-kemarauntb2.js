var adm = ui.import && ui.import("adm", "table", {
      "id": "users/maltraz457/IDN_adm2"
    }) || ee.FeatureCollection("users/maltraz457/IDN_adm2"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
var Indonesia = adm;
var Nama_Provinsi = ['Nusa Tenggara Barat'] ;
var geom = Indonesia.filter(ee.Filter.inList('NAME_1', Nama_Provinsi));
var NTB= ee.FeatureCollection(geom);
Map.addLayer(geom,{color:"Yellow" },"Provinsi");
Map.centerObject(NTB,8);
var dataset = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA")
.filterDate('2021-04-01','2021-09-30')
.sort('CLOUD COVER')
.map(function(image){return image});
//Visualisasi parameter indeks NDVI dan MNDWI
//Membuat Fungsi NDVI
var NDVI = dataset.map(function(image) {
var NDVI2 = image.normalizedDifference(['B5', 'B4']);
var NDVI3 = NDVI2.focal_median(100, 'circle', 'meters')
.rename('NDVI1');
return image.addBands(NDVI3);
});
//Membuat Fungsi NDWI
var MNDWI = dataset.map(function(image) {
var MNDWI2 = image.expression(
'(band3 - band6)/(band3 + band6)', {
'band3': image.select('B3'),
'band6': image.select('B6')
});
var MNDWI3 = MNDWI2.focal_median(100, 'circle', 'meters')
.rename('MNDWI1');
return image.addBands(MNDWI3);
});
//visualisasi rata-rata NDVI 2020
var NDVI_Vis = ee.Image(
NDVI.filterBounds(NTB)
.filterDate('2021-04-01','2021-09-30')
.select('NDVI1')
.mean()
.clip(NTB)
);
//visualisasi rata-rata MNDWI 2021
var MNDWI_Vis = ee.Image(
MNDWI.filterBounds(NTB)
.filterDate('2021-04-01','2021-09-30')
.select('MNDWI1')
.mean()
.clip(NTB)
);
//Visualisasi parameter burned area
var dataset2 = ee.ImageCollection('MODIS/006/MCD64A1')
                  .filter(ee.Filter.date('2021-04-01', '2021-08-25'))
                  .filterBounds(geom);
function clp(img) {
  return img.clip(geom)
}
var clipped = dataset2.map(clp)
var burnedArea = clipped.select('BurnDate');
var burnedAreaVis = {
  min: 30.0,
  max: 341.0,
  palette: ['4e0400', '951003', 'c61503', 'ff1901'],
};
Map.addLayer(burnedArea, burnedAreaVis, 'Burned Area');
//Visualisasi Parameter land surface temperatur
var dataset3 = ee.ImageCollection('MODIS/006/MOD11A2')
                  .filter(ee.Filter.date('2021-04-01', '2021-09-30'))
                  .filterBounds(geom);
function clp(img) {
  return img.clip(geom)
}
var clipped = dataset3.map(clp)
var landSurfaceTemperature = clipped.select('LST_Day_1km');
var landSurfaceTemperatureVis = {
  min: 14000.0,
  max: 16000.0,
  palette: [
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ],
};
Map.addLayer(
    landSurfaceTemperature, landSurfaceTemperatureVis,
    'Land Surface Temperature');
//Pembuatan Pemanggil data Time Series
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
var layer = drawingTools.layers().get(0);
drawingTools.layers().remove(layer);
}
var dummyGeometry =
ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
var layers = drawingTools.layers();
layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawPoint() {
clearGeometry();
drawingTools.setShape('point');
drawingTools.draw();
}
var symbol = {
point: ' ',
};
var controlPanel = ui.Panel({
widgets: [
ui.Label('Pilih Titik.'),
ui.Button({label: symbol.point + ' Point',
onClick: drawPoint,
style: {stretch: 'horizontal'}
}),
],
style: {position: 'bottom-left'},
layout: null,
});
Map.add(controlPanel);
//Pembuatan Data Tampilan Grafik Time Series Indeks NDVI
var chartPanel = ui.Panel({
style:
{height: '250px', width: '450px', position: 'bottom-right', shown: false}
});
Map.add(chartPanel);
function chartNDVITimeSeries(){
// Make the chart panel visible the first time a geometry is drawn.
if (!chartPanel.style().get('shown')) {
chartPanel.style().set('shown', true);
}
// Get the drawn geometry; it will define the reduction region.
var aoi = drawingTools.layers().get(0).getEeObject();
// Set the drawing mode back to null; turns drawing off.
drawingTools.setShape(null);
// Reduction scale is based on map scale to avoid memory/timeout errors.
var mapScale = Map.getScale();
var scale = mapScale > 5000 ? mapScale * 2 : 5000;
// Chart NDVI time series for the selected area of interest.
var chart = ui.Chart.image
.seriesByRegion({
imageCollection: NDVI,
regions: aoi,reducer: ee.Reducer.mean(),
band: 'NDVI1',
scale: scale,
xProperty: 'system:time_start'
})
.setOptions({
titlePostion: 'none',
legend: {position: 'none'},
title: 'Indeks NDVI Time Series',
hAxis: {title: 'Date'},
vAxis: {title: 'Indeks NDVI'},
series: {0: {color: '23cba7'}}
});
// Replace the existing chart in the chart panel with the new chart.
chartPanel.widgets().reset([chart]);
}
drawingTools.onDraw(ui.util.debounce(chartNDVITimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartNDVITimeSeries, 500));
//Pembuatan Data Tampilan Grafik Time Series Indeks MNDWI
var chartPanel2 = ui.Panel({
style:
{height: '250px', width: '450px', position: 'bottom-right', shown: false}
});
Map.add(chartPanel2);
function chartMNDWITimeSeries(){
// Make the chart panel visible the first time a geometry is drawn.
if (!chartPanel2.style().get('shown')) {
chartPanel2.style().set('shown', true);
}
// Get the drawn geometry; it will define the reduction region.
var aoi = drawingTools.layers().get(0).getEeObject();
// Set the drawing mode back to null; turns drawing off.
drawingTools.setShape(null);
// Reduction scale is based on map scale to avoid memory/timeout errors.
var mapScale = Map.getScale();
var scale = mapScale > 5000 ? mapScale * 2 : 5000;
// Chart NDVI time series for the selected area of interest.
var chart2 = ui.Chart.image
.seriesByRegion({
imageCollection: MNDWI,
regions: aoi,reducer: ee.Reducer.mean(),
band: 'MNDWI1',
scale: scale,
xProperty: 'system:time_start'
})
.setOptions({
titlePostion: 'none',
legend: {position: 'none'},
title: 'Indeks MNDWI Time Series',
hAxis: {title: 'Date'},
vAxis: {title: 'Indeks MNDWI'},
series: {0: {color: '23cba7'}}
});
// Replace the existing chart in the chart panel with the new chart.
chartPanel2.widgets().reset([chart2]);
}
drawingTools.onDraw(ui.util.debounce(chartMNDWITimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartMNDWITimeSeries, 500));
//Judul Aplikasi
var legendTitle1 = ui.Label({
value: 'Monitoring Musim Kemarau 2021 berdasarkan Parameter dan Indeks NDVI, MNDWI, LST dan Burned Area di Nusa Tenggara Barat',
style: {fontWeight: 'bold',
fontSize: '15px',
margin: '0 0 4px 0',
padding: '0'
}});
Map.add(legendTitle1);
//Simbologi Peta Tampilan
var ndviVis = {
min: -1,
max: 1,
palette: [
'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
'66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
'012E01', '011D01', '011301'
],
};
var mndwiVis = {
min: -1,
max: 1,
palette: ['#4da5ff','#3399ff','#1a8cff','#007fff','#0072e6','#0066cc','#0059b3']
};
//Membuat tampilan simbologi di peta untuk indeks NDVI
function makeColorBarParams(palette) {
return {
bbox: [0, 0, 1, 0.1],
dimensions: '100x10',
format: 'png',
min: 0,
max: 1,
palette: palette,
};
}
var colorBar = ui.Thumbnail({
image: ee.Image.pixelLonLat().select(0),
params: makeColorBarParams(ndviVis.palette),
style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var legendLabels = ui.Panel({
widgets: [
ui.Label(ndviVis.min, {margin: '4px 8px'}),
ui.Label(
(ndviVis.max / 2),
{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
ui.Label(ndviVis.max, {margin: '4px 8px'})
],
layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
value: 'Rata-rata NDVI 2021 ',
style: {fontWeight: 'bold'}
});
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
legendPanel.style().set({
width: '400px',
position: 'top-left'
});
Map.add(legendPanel);
//Membuat tampilan simbologi di peta untuk indeks MNDWI
function makeColorBarParams2(palette) {
return {
bbox: [0, 0, 1, 0.1],
dimensions: '100x10',
format: 'png',
min: -1,
max: 1,
palette: palette,
};
}
var colorBar2 = ui.Thumbnail({
image: ee.Image.pixelLonLat().select(1),
params: makeColorBarParams2(mndwiVis.palette),
style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var legendLabels2 = ui.Panel({
widgets: [
ui.Label(ndviVis.min, {margin: '4px 8px'}),
ui.Label(
(mndwiVis.max / 2),
{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
ui.Label(mndwiVis.max, {margin: '4px 8px'})
],
layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle2 = ui.Label({
value: 'Rata-rata MNDWI 2021 ',
style: {fontWeight: 'bold'}
});
var legendPanel2 = ui.Panel([legendTitle2, colorBar2, legendLabels2]);
legendPanel2.style().set({
width: '400px',
position: 'top-left'
});
Map.add(legendPanel2);
//Widget Checkbox untuk menampilkan indeks apa yang akan ditampilkan
var checkbox = ui.Checkbox('Show NDVI Index', true);
var checkbox2 = ui.Checkbox('Show MNDWI Index', true);
var checkbox3 = ui.Checkbox('Show Parameter Burned Area',true);
var checkbox4 = ui.Checkbox('Show Parameter Surface Temperature',true); 
checkbox.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(3).setShown(checked);
});
checkbox2.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(4).setShown(checked);
});
checkbox3.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(1).setShown(checked);
});
checkbox4.onChange(function(checked) {
  // Shows or hides the first map layer based on the checkbox's value.
  Map.layers().get(2).setShown(checked);
});
Map.addLayer(NDVI_Vis, ndviVis, 'NDVI Rata-rata tahun 2020');
Map.addLayer(MNDWI_Vis, mndwiVis, 'MNDWI Rata-rata tahun 2020');
Map.add(checkbox);
Map.add(checkbox2);
Map.add(checkbox3);
Map.add(checkbox4);