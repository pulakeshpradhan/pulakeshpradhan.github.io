var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            106.84754023437496,
            -6.250309083758348
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([106.84754023437496, -6.250309083758348]);
//Menentukan parameter periode akuisisi
var sebelum = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('NO2_column_number_density')
  .filterDate('2019-12-01', '2019-12-31');
var selama = ee.ImageCollection('COPERNICUS/S5P/NRTI/L3_NO2')
  .select('NO2_column_number_density')
  .filterDate('2020-04-01', '2020-04-30');
//Menentukan parameter visualisasi
var palettes = require('users/gena/packages:palettes');
var palette = palettes.matplotlib.magma[7].reverse(); //Sumber: https://github.com/gee-community/ee-palettes
var band_viz = {
  min: 0,
  max: 0.0192,
  opacity:0.5,
  palette: ['palette']
};
//Menampilkan data
Map.addLayer(sebelum.mean(), {min: 0, max: 0.0003, palette: palette, opacity:0.8});
Map.setCenter(106.85, -6.25, 7);
Map.setControlVisibility({all: false, zoomControl: true, mapTypeControl: true});
//Membuat peta yang terhubung (linked map)
var linkedMap = ui.Map();
linkedMap.addLayer(selama.mean(), {min: 0, max: 0.0003, palette: palette, opacity:0.75});
linkedMap.setCenter(106.85, -6.25, 7);
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
//Membuat judul utama di tengah-atas
var title = ui.Label('Peta Emisi Nitrogen Dioksida (NO2)', {fontSize: '30px', color: 'darkSlateGrey', fontWeight: 'bold'});
title.style().set('position', 'top-center');
Map.add(title);
//Membuat judul di sudut kiri-kanan bawah
var judul_sebelum= Map.add(ui.Label(
'Emisi NO2 sebelum pandemik', {fontWeight: 'bold', fontSize: '10px', position: 'bottom-left', color: 'slateGrey'}));
var judul_selama= linkedMap.add(ui.Label(
'Emisi NO2 selama pandemik', {fontWeight: 'bold', fontSize: '10px', position: 'bottom-right', color: 'slateGrey'}));
//Membagi panel peta menjadi dua
var splitPanel = ui.SplitPanel({
firstPanel: linker.get(0),
secondPanel: linker.get(1),
orientation: 'horizontal',
wipe: true,
style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);
//Membuat panel di sisi kanan
var header = ui.Label('Peta Emisi NO2 Sebelum dan Selama Pandemik COVID-19', {fontSize: '25px', color: 'darkSlateGrey'});
var text_1 = ui.Label(
'Peta polusi NO2 di Indonesia selama pandemik yang dimonitor melalui satelit Sentinel-5',
{fontSize: '15px'});
var text_2 = ui.Label(
'Nitrogen dioxide (NO2) and nitrogen oxide (NO) together are usually referred to as nitrogen oxides (NOx = NO + NO2). They are important trace gases in the Earth’s atmosphere, present in both the troposphere and the stratosphere. They enter the atmosphere as a result of anthropogenic activities (notably fossil fuel combustion and biomass burning) and natural processes (such as microbiological processes in soils, wildfires and lightning). During daytime, i.e. in the presence of sunlight, a photochemical cycle involving ozone (O3) converts NO into NO2 (and vice versa) on a timescale of minutes, so that NO2 is a robust measure for concentrations of nitrogen oxides. Tropospheric and stratospheric concentrations of NO2 are monitored all over the world by a variety of instruments either ground-based, in-situ (balloon, aircraft), or satellite-based– each with its own specific advantages. The TROPOMI NO2 (see figure) processing system is based on the algorithm developments for the DOMINO-2 product and for the EU QA4ECV NO2 reprocessed dataset for OMI, and has been adapted for TROPOMI. This retrieval-assimilation-modelling system uses the 3-dimensional global TM5-MP chemistry transport model at a resolution of 1x1 degree as an essential element. (Source: http://www.tropomi.eu/data-products/nitrogen-dioxide)',
{fontSize: '11px'});
var text_3 = ui.Label(
'Dikembangkan oleh Grup Riset Geoinformatika, Universitas Brawijaya',
{fontSize: '11px'});
var toolPanel = ui.Panel([header, text_1, text_2, text_3], 'flow', {width: '400px'});
//Membuat rujukan eksternal dengan tautan
var link = ui.Label(
'Monitoring NO2 dengan Sentinel-5 di Eropa', {},
'http://www.esa.int/Applications/Observing_the_Earth/Copernicus/Sentinel-5P/Coronavirus_lockdown_leading_to_drop_in_pollution_across_Europe');
var linkPanel = ui.Panel(
[ui.Label('Informasi lainnya', {fontWeight: 'bold'}), link]);
toolPanel.add(linkPanel);
var link2 = ui.Label(
'Geoinformatics', {},
'http://gis.filkom.ub.ac.id/');
var linkPanel2 = ui.Panel(
[ui.Label('Geoinformatics Research Group Homepage', {fontWeight: 'bold'}), link2]);
toolPanel.add(linkPanel2);
ui.root.widgets().add(toolPanel);
//Membuat legenda
var legendTitle2 = ui.Label({
value: 'NO2 Emission (mol/m^2)',
style: {
fontWeight: 'bold',
fontSize: '15px',
margin: '10px 0 0 0',
padding: '0'
}
});
//Membuat panel aksesoris dan komponen kartografi
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px',
  }
});
var titleTextVis = {
  'margin':'0px 0px 15px 0px',
  'fontSize': '18px', 
  'font-weight':'bold', 
  'color': '#000000'
  };
//Membuat judul legenda
var legendTitle = ui.Label('Legend',titleTextVis);
//Menambahkan judul legenda kedua
legend.add(legendTitle);
legend.add(legendTitle2);
//Membuat gambar legenda
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((band_viz.max-band_viz.min)/100.0).add(band_viz.min);
var legendImage = gradient.visualize(band_viz);
//Membuat teks di atas legenda
var panel = ui.Panel({
widgets: [
ui.Label('> '.concat(band_viz['max']))
],
});
legend.add(panel);
//Menampilkan gambar legenda
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'10x50'},
style: {padding: '1px', position: 'bottom-center'}
});
//Menambahkan gambar ke legenda
legend.add(thumbnail);
//Membuat teks di bawah legenda
var panel = ui.Panel({
widgets: [
ui.Label(band_viz['min'])
],
});
legend.add(panel);
//Menampilkan legenda di peta utama
Map.add(legend);