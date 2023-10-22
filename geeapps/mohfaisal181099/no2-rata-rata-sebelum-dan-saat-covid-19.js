var table = ui.import && ui.import("table", "table", {
      "id": "users/mohfaisal181099/KP/shp_jawa"
    }) || ee.FeatureCollection("users/mohfaisal181099/KP/shp_jawa");
//Importing Sentinel 5P image collections Sebelum Pandemi Tahun 2019
var image_prior = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
.select('NO2_column_number_density')
.filterDate('2019-01-01','2019-12-30')
.mean()
.clip(table);
// Importing Sentinel 5P image collections Saat Pandemi COVID-19 Kasus Pertama Pada Bulan Maret
var image_during = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
.select('NO2_column_number_density')
.filterDate('2020-03-01', '2021-07-31')
.mean()
.clip(table);
// Visualisasi Peta Menggunakan Gena Packages
var palettes = require('users/gena/packages:palettes');
var palette = palettes.matplotlib.magma[7];
var myCollection =image_prior.addBands(image_during);
print('NO2', myCollection.bandNames());
// script parameter grafik
//var options = {
 //title: 'Grafik Konsentrasi NO2 Tiap Bulan mol/m^2',
 //hAxis: {title: 'Timeline (Periode dalam Bulan)'},
 //vAxis: {title: 'Konsentrasi NO2 (mol/m^2) '},
 //lineWidth: 1,
 //pointSize: 4,
 //};
//var waktu = [0, 1];
// Script memunculkan grafik
//var chart = ui.Chart.image.regions(
  //myCollection,table, ee.Reducer.mean(), 30, 'PROVINSI', waktu)
   //.setChartType('ScatterChart')
   //.setOptions(options);
// Display grafik.
//print(chart);
// Mengatur Tampilan Layar Peta
Map.addLayer(image_prior, {min: 0, max: 0.0003, palette: palette, opacity:0.75});
Map.setCenter(110.10051853263381,-7.384531851672154, 6);
Map.setControlVisibility({all: false, zoomControl: true, mapTypeControl: true});
//Membuat Link Map dan Split Layer
var linkedMap = ui.Map();
linkedMap.addLayer(image_during, {min: 0, max: 0.0003, palette: palette, opacity:0.75});
linkedMap.setCenter(110.10051853263381,-7.384531851672154,7);
linkedMap.setControlVisibility({all: false, zoomControl: true, mapTypeControl: true})
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
// Add title labels to the maps
var title_prior= Map.add(ui.Label(
'Rata" NO2 Sebelum Pandemi-2019', {fontWeight: 'bold', fontSize: '10px', position: 'bottom-left', color: 'slateGrey'}));
var title_during= linkedMap.add(ui.Label(
'Rata" NO2 Sesudah Pandemi-maret2020-Agustus2021', {fontWeight: 'bold', fontSize: '10px', position: 'bottom-right', color: 'slateGrey'}));
// Creating the split panel comprising the two maps
var splitPanel = ui.SplitPanel({
firstPanel: linker.get(0),
secondPanel: linker.get(1),
orientation: 'horizontal',
wipe: true,
style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);
// Create side panel and add a header and text
var header = ui.Label('Perbandingan Konsentrasi Rata-rata NO2 Selama Pandemi COVID-19', {fontSize: '15px', color: 'darkSlateGrey'});
var text_1 = ui.Label(
'Peta Ini Menyajikan Perbandingan Antara Konsentrasi NO2 Rata-rata Selama Pandemi COVID-19 (Panel Kanan) dan Periode Sebelum Terjadi Pandemi Pada Tahun 2019 (Panel Kiri). Dimulai Pada Tanggal 01 Maret Kasus Pertama Di Indonesia.',
{fontSize: '11px'});
var text_2 = ui.Label(
'Sumber Data: Sentinel-5P Near Real Time Data (European Comission/ESA/Copernicus)',
{fontSize: '11px'});
var text_3 = ui.Label(
'Data Terakhir Diupdate: 2021-Aug-01)',
{fontSize: '11px'});
var toolPanel = ui.Panel([header,text_1,text_2,text_3],'flow', {width:'300px'});
ui.root.widgets().add(toolPanel);
//Create external reference with link
var link = ui.Label(
'Nitrogen dioxide Di Google Earth Engine ', {},
'https://developers.google.com/earth-engine/datasets/catalog/sentinel-5p');
var linkPanel = ui.Panel(
[ui.Label('Informasi Lebih Lanjut', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);
// Create legend for the data
var viz = {min:0.0, max:300.0, palette:palette};
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
// Create legend title
var legendTitle = ui.Label({
value: 'Konsentrasi Gas Emisis NO2 (μmol/m²)',
style: {
fontWeight: 'bold',
fontSize: '8 px',
margin: '0 0 4px 0',
padding: '0'
}
});
// Add the title to the panel
legend.add(legendTitle);
// Create and and style the legend
var makeRow = function(color, name) {
// Create the colored box.
var colorBox = ui.Label({
style: {
backgroundColor: '#' + color,
// Use padding to give the box height and width.
padding: '8px',
margin: '0 0 4px 0'
}
});
// Create the label filled with the description text.
var description = ui.Label({
value: name,
style: {margin: '0 0 4px 6px'}
});
// Return the panel
return ui.Panel({
widgets: [colorBox, description],
layout: ui.Panel.Layout.Flow('horizontal')
});
};
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// Create text label on top of legend
var panel_max = ui.Panel({
widgets: [
ui.Label(viz['max'])
],
});
legend.add(panel_max);
// Create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x100'},
style: {padding: '1px', position: 'bottom-center'}
});
// Add the thumbnail to the legend
legend.add(thumbnail);
// Create text label on bottom of legend
var panel_min = ui.Panel({
widgets: [
ui.Label(viz['min'])
],
});
legend.add(panel_min);
toolPanel.add(legend);
//ui.root.widgets().add(toolPanel);