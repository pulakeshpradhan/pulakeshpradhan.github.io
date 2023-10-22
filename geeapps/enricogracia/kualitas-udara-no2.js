/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = 
    /* color: #bf04c2 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[94.80492187499999, 5.749917939661983],
          [94.80492187499999, -11.21880523772043],
          [141.2990625, -11.21880523772043],
          [141.2990625, 5.749917939661983]]], null, false),
    point = 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.MultiPoint(
        [[98.66867614746093, 3.6086916030764677],
         [106.84499529578278, -6.219500406720315],
         [116.85757366659315, -1.2145680324024453],
         [119.44860197532277, -5.151457167343162],
         [140.67475941252647, -2.5830603233590868]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
//Menentukan parameter periode akuisisi
var sebelum = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2")
  .select('NO2_column_number_density')
  .filterDate('2019-11-01', '2020-03-15')
  .filterBounds(geometry);
var selama = ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2")
  .select('NO2_column_number_density')
  .filterDate('2020-04-01', '2020-08-31')
  .filterBounds(geometry);
//Menentukan parameter visualisasi
var palettes = require('users/gena/packages:palettes');
var palette = palettes.colorbrewer.OrRd[8]; //Sumber: https://github.com/gee-community/ee-palettes
//Menampilkan data SEBELUM PSBB
Map.addLayer(sebelum.mean(), {
  min: 0, 
  max: 0.00006, 
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'], 
  opacity:0.65}
  );
Map.addLayer(point);
Map.setCenter(121.26, -3.05, 5);
Map.setControlVisibility({all: false, layerList: true, zoomControl: true, mapTypeControl: true, fullscreenControl: true});
//Membuat peta yang terhubung (linked map)
var linkedMap = ui.Map();
linkedMap.addLayer(selama.mean(), {
  min: 0, 
  max: 0.00006, 
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'], 
  opacity:0.65}
  );
linkedMap.addLayer(point);
linkedMap.setCenter(121.26, -3.05, 5);
var linker = ui.Map.Linker([ui.root.widgets().get(0), linkedMap]);
//Membuat judul utama di tengah-atas
var judul_tengahKiri= Map.add(ui.Label(
'Peta Emisi Nitrogen Dioksida (NO2)', {fontWeight: 'bold', fontSize: '20px', position: 'top-center', color: 'black'}));
var judul_tengahKanan= linkedMap.add(ui.Label(
'Peta Emisi Nitrogen Dioksida (NO2)', {fontWeight: 'bold', fontSize: '20px', position: 'top-center', color: 'black'}));
//Membuat judul di sudut kiri-kanan bawah
var judul_sebelum= Map.add(ui.Label(
'Sebelum PSBB: 01/11/2019 - 15/03/2020', {fontWeight: 'bold', fontSize: '10px', position: 'bottom-left', color: 'slateGrey'}));
var judul_selama= linkedMap.add(ui.Label(
'Selama PSBB: 01/04/2020 - 31/08/2020', {fontWeight: 'bold', fontSize: '10px', position: 'bottom-right', color: 'slateGrey'}));
//Membagi panel peta menjadi dua
var splitPanel = ui.SplitPanel({
firstPanel: linker.get(0),
secondPanel: linker.get(1),
orientation: 'horizontal',
wipe: true,
style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);
//Membuat buffer titik
var buffer_Medan = ee.Geometry.Point(98.675, 3.617).buffer(1000);
var buffer_Jakarta = ee.Geometry.Point(106.827, -6.198).buffer(1000);
var buffer_Balikpapan = ee.Geometry.Point(116.868, -1.241).buffer(1000);
var buffer_Makassar = ee.Geometry.Point(119.460, -5.149).buffer(1000);
var buffer_Jayapura = ee.Geometry.Point(140.704, -2.559).buffer(1000);
//Membuat grafis NO2 sebelum PSBB (Kota Medan)
var grafSebelum = ui.Chart.image.seriesByRegion({
  imageCollection: sebelum,
  regions: buffer_Medan,
  reducer: ee.Reducer.mean(),
  scale: 100,
  xProperty: 'system:time_start',
});
grafSebelum.setChartType('ColumnChart');
grafSebelum.setOptions({
  title: 'Emisi NO2 di Kota Medan dan Sekitarnya sebelum PSBB',
  vAxis: {title: 'Kadar NO2 (mol/m^2)', format:'scientific'},
  lineWidth: 1,
  pointSize: 4,
  }
);
print(grafSebelum);
//Membuat grafis NO2 selama PSBB (Kota Medan)
var grafSelama = ui.Chart.image.seriesByRegion({
  imageCollection: selama,
  regions: buffer_Medan,
  reducer: ee.Reducer.mean(),
  scale: 100,
  xProperty: 'system:time_start',
});
grafSelama.setChartType('ColumnChart');
grafSelama.setOptions({
  title: 'Emisi NO2 di Kota Medan dan Sekitarnya selama PSBB',
  vAxis: {title: 'Kadar NO2 (mol/m^2)', format:'scientific'},
  lineWidth: 1,
  pointSize: 4,
  }
);
print(grafSelama);
//Membuat grafis NO2 sebelum PSBB (Kota Jakarta)
var grafSebelum = ui.Chart.image.seriesByRegion({
  imageCollection: sebelum,
  regions: buffer_Jakarta,
  reducer: ee.Reducer.mean(),
  scale: 100,
  xProperty: 'system:time_start',
});
grafSebelum.setChartType('ColumnChart');
grafSebelum.setOptions({
  title: 'Emisi NO2 di Kota Jakarta dan Sekitarnya sebelum PSBB',
  vAxis: {title: 'Kadar NO2 (mol/m^2)', format:'scientific'},
  lineWidth: 1,
  pointSize: 4,
  }
);
print(grafSebelum);
//Membuat grafis NO2 selama PSBB (Kota Jakarta)
var grafSelama = ui.Chart.image.seriesByRegion({
  imageCollection: selama,
  regions: buffer_Jakarta,
  reducer: ee.Reducer.mean(),
  scale: 100,
  xProperty: 'system:time_start',
});
grafSelama.setChartType('ColumnChart');
grafSelama.setOptions({
  title: 'Emisi NO2 di Kota Jakarta dan Sekitarnya selama PSBB',
  vAxis: {title: 'Kadar NO2 (mol/m^2)', format:'scientific'},
  lineWidth: 1,
  pointSize: 4,
  }
);
print(grafSelama);
//Membuat grafis NO2 sebelum PSBB (Kota Balikpapan)
var grafSebelum = ui.Chart.image.seriesByRegion({
  imageCollection: sebelum,
  regions: buffer_Balikpapan,
  reducer: ee.Reducer.mean(),
  scale: 100,
  xProperty: 'system:time_start',
});
grafSebelum.setChartType('ColumnChart');
grafSebelum.setOptions({
  title: 'Emisi NO2 di Kota Balikpapan dan Sekitarnya sebelum PSBB',
  vAxis: {title: 'Kadar NO2 (mol/m^2)', format:'scientific'},
  lineWidth: 1,
  pointSize: 4,
  }
);
print(grafSebelum);
//Membuat grafis NO2 selama PSBB (Kota Balikpapan)
var grafSelama = ui.Chart.image.seriesByRegion({
  imageCollection: selama,
  regions: buffer_Balikpapan,
  reducer: ee.Reducer.mean(),
  scale: 100,
  xProperty: 'system:time_start',
});
grafSelama.setChartType('ColumnChart');
grafSelama.setOptions({
  title: 'Emisi NO2 di Kota Balikpapan dan Sekitarnya selama PSBB',
  vAxis: {title: 'Kadar NO2 (mol/m^2)', format:'scientific'},
  lineWidth: 1,
  pointSize: 4,
  }
);
print(grafSelama);
//Membuat grafis NO2 sebelum PSBB (Kota Makassar)
var grafSebelum = ui.Chart.image.seriesByRegion({
  imageCollection: sebelum,
  regions: buffer_Makassar,
  reducer: ee.Reducer.mean(),
  scale: 100,
  xProperty: 'system:time_start',
});
grafSebelum.setChartType('ColumnChart');
grafSebelum.setOptions({
  title: 'Emisi NO2 di Kota Makassar dan Sekitarnya sebelum PSBB',
  vAxis: {title: 'Kadar NO2 (mol/m^2)', format:'scientific'},
  lineWidth: 1,
  pointSize: 4,
  }
);
print(grafSebelum);
//Membuat grafis NO2 selama PSBB (Kota Makassar)
var grafSelama = ui.Chart.image.seriesByRegion({
  imageCollection: selama,
  regions: buffer_Makassar,
  reducer: ee.Reducer.mean(),
  scale: 100,
  xProperty: 'system:time_start',
});
grafSelama.setChartType('ColumnChart');
grafSelama.setOptions({
  title: 'Emisi NO2 di Kota Makassar dan Sekitarnya selama PSBB',
  vAxis: {title: 'Kadar NO2 (mol/m^2)', format:'scientific'},
  lineWidth: 1,
  pointSize: 4,
  }
);
print(grafSelama);
//Membuat grafis NO2 sebelum PSBB (Kota Jayapura)
var grafSebelum = ui.Chart.image.seriesByRegion({
  imageCollection: sebelum,
  regions: buffer_Jayapura,
  reducer: ee.Reducer.mean(),
  scale: 100,
  xProperty: 'system:time_start',
});
grafSebelum.setChartType('ColumnChart');
grafSebelum.setOptions({
  title: 'Emisi NO2 di Kota Jayapura dan Sekitarnya sebelum PSBB',
  vAxis: {title: 'Kadar NO2 (mol/m^2)', format:'scientific'},
  lineWidth: 1,
  pointSize: 4,
  }
);
print(grafSebelum);
//Membuat grafis NO2 selama PSBB (Kota Jayapura)
var grafSelama = ui.Chart.image.seriesByRegion({
  imageCollection: selama,
  regions: buffer_Jayapura,
  reducer: ee.Reducer.mean(),
  scale: 100,
  xProperty: 'system:time_start',
});
grafSelama.setChartType('ColumnChart');
grafSelama.setOptions({
  title: 'Emisi NO2 di Kota Jayapura dan Sekitarnya selama PSBB',
  vAxis: {title: 'Kadar NO2 (mol/m^2)', format:'scientific'},
  lineWidth: 1,
  pointSize: 4,
  }
);
print(grafSelama);
//Membuat panel di sisi kanan
var header = ui.Label('Peta Emisi Nitrogen Dioksida (NO2) Sebelum dan Selama Regulasi PSBB COVID-19 di Kota-kota Besar di Indonesia', {fontSize: '25px', color: 'darkSlateGrey'});
var text_1 = ui.Label(
'Peta polusi NO2 di kota-kota besar di Indonesia selama PSBB dimonitor melalui satelit Sentinel-5. Diasumsikan bahwa kebijakan PSBB diterapkan serentak pada tanggal 1 April 2020.',
{fontSize: '15px'});
var text_2 = ui.Label(
'Kota-kota besar yang diteliti antara lain Kota Medan (P. Sumatera), Kota Jakarta (P. Jawa), Kota Balikpapan (P. Kalimantan), Kota Makassar (P. Sulawesi), dan Kota Jayapura (P. Papua). Kelima kota tersebut ditandai dengan titik berwarna hitam.',
{fontSize: '13px'});
var text_3 = ui.Label(
'Dikembangkan sebagai tugas akhir mata kuliah PJ Dinamika Urban Rural. Dikembangkan oleh Enrico Gracia (Kelompok 2), FMIPA UI, berdasarkan pengembangan oleh Grup Riset Geoinformatika, Universitas Brawijaya.',
{fontSize: '11px'});
var toolPanel = ui.Panel([header, text_1, text_2], 'flow', {width: '400px'});
// Creates a color bar thumbnail image for use in legend from the given color
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
  };
}
// Create the color bar for the legend.
var colorBar = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(Map.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
// Create a panel with three numbers for the legend.
var legendLabels = ui.Panel({
  widgets: [
    ui.Label(0, {margin: '4px 8px'}),
    ui.Label(
        (3e-5),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(6e-5, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legendTitle = ui.Label({
  value: 'Kadar NO2 (mol/m^2)',
  style: {fontWeight: 'bold'}
});
// Add the legendPanel.
var legendPanel = ui.Panel([legendTitle, colorBar, legendLabels]);
toolPanel.add(legendPanel);
//Membuat rujukan eksternal studi serupa dengan tautan
var link1 = ui.Label(
'Emissions changes due to lockdown measures during the first wave of the COVID-19 pandemic in Europe', {},
'https://atmosphere.copernicus.eu/emissions-changes-due-lockdown-measures-during-first-wave-covid-19-pandemic-europe');
var linkPanel1 = ui.Panel(
[ui.Label('Referensi mengenai perubahan emisi akibat Lockdown di Eropa:', {fontWeight: 'bold'}), link1]);
toolPanel.add(linkPanel1);
//Membuat rujukan eksternal timeline PSBB di Kota Surabaya dengan tautan
var link2 = ui.Label(
'Penerapan PSBB di Sejumlah Wilayah Indonesia', {},
'https://indonesiabaik.id/infografis/penerapan-psbb-di-sejumlah-wilayah-indonesia');
var linkPanel2 = ui.Panel(
[ui.Label('Referensi mengenai penerapan PSBB di beberapa wilayah di Indonesia:', {fontWeight: 'bold'}), link2]);
toolPanel.add(linkPanel2);
ui.root.widgets().add(toolPanel);