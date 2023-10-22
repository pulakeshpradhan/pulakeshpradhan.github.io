var batas = ui.import && ui.import("batas", "table", {
      "id": "users/akbarnugroho/jatim_kab"
    }) || ee.FeatureCollection("users/akbarnugroho/jatim_kab");
// Inisialisasi citra yang digunakan dan parameter visualisasi
var periode1 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CO')
                .filterDate('2020-03-20','2020-04-27')
                .mean()
                .select('CO_column_number_density')
                .clip(batas)
                .visualize({min:0.0000,max:0.05,palette:"lightblue,yellow,orange,red,purple"});
var periode2 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CO')
                .filterDate('2020-04-28','2020-05-11')
                .mean()
                .select('CO_column_number_density')
                .clip(batas)
                .visualize({min:0.0000,max:0.05,palette:"lightblue,yellow,orange,red,purple"});
var periode3 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CO')
                .filterDate('2020-05-12','2020-05-25')
                .mean()
                .select('CO_column_number_density')
                .clip(batas)
                .visualize({min:0.0000,max:0.05,palette:"lightblue,yellow,orange,red,purple"});
var periode4 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CO')
                .filterDate('2020-05-26','2020-06-08')
                .mean()
                .select('CO_column_number_density')
                .clip(batas)
                .visualize({min:0.0000,max:0.05,palette:"lightblue,yellow,orange,red,purple"});
var periode5 = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CO')
                .filterDate('2020-06-09','2020-06-23')
                .mean()
                .select('CO_column_number_density')
                .clip(batas)
                .visualize({min:0.0000,max:0.05,palette:"lightblue,yellow,orange,red,purple"});
// Pendeskripsian citra yang dimasukkan pada layer split panel
var images = {
      'Konsentrasi CO Sebelum PSBB': periode1,
      'Konsentrasi CO PSBB Jilid I': periode2,
      'Konsentrasi CO PSBB Jilid II': periode3,
      'Konsentrasi CO PSBB Jilid III': periode4,
      'Konsentrasi CO PSBB Transisi': periode5,
};
// Pembuatan peta split sisi kiri 
var leftMap = ui.Map(); 
leftMap.setControlVisibility(false); 
var leftSelector = addLayerSelector(leftMap, 0, 'top-left'); 
// Pembuatan peta split sisi kanan 
var rightMap = ui.Map(); 
rightMap.setControlVisibility(false); 
var rightSelector = addLayerSelector(rightMap, 1, 'top-right'); 
// Pengaturan layer peta untuk memilih citra yang ingin ditampilkan
function addLayerSelector(mapToChange, defaultValue, position)
{ 
    var label = ui.Label('Pilih Periode Kebijakan');
    function updateMap(selection)
    {
      mapToChange.layers().set(0, ui.Map.Layer(images[selection])); 
    }
    // Konfigurasi layer terpilih, proses update pilihan
      var select = ui.Select({items: Object.keys(images), onChange: updateMap})
      select.setValue(Object.keys(images)[defaultValue], true); 
      var controlPanel = ui.Panel({widgets: [label, select], style: {position: position}}); 
      mapToChange.add(controlPanel); 
} 
/* 
 * Mengikat semuanya pada split panel 
 */ 
// Pembuatan peta perbandingan dalam splitpanel
var splitPanel = ui.SplitPanel({ 
  firstPanel: leftMap, 
  secondPanel: rightMap, 
  wipe: true, 
  style: {stretch: 'both'} 
});
// Menetapkan splitpanel yang berada di root UI
ui.root.widgets().reset([splitPanel]); 
var linker = ui.Map.Linker([leftMap, rightMap]); 
leftMap.centerObject(batas,11); 
// membuat panel samping dan menambah judul dan tulisan 
var header1 = ui.Label('PETA SPLIT PANEL CO DI JAWA TIMUR',  
                      {fontSize: '20px', color: 'black',fontWeight: 'bold'}); 
var header2 = ui.Label('MASA PANDEMI COVID-19',  
                      {fontSize: '14px', color: 'black',fontWeight: 'bold'}); 
var text_1 = ui.Label( 
'Peta ini menyajikan perbandingan antara konsentrasi CO rata-rata di setiap perubahan kebijakan PSBB selama pandemi COVID-19. Data konsentrasi rata-rata CO yang digunakan, yaitu:', 
{fontSize: '11px',margin: '0 0 0 11px', padding: '0'}); 
var text_2 = ui.Label( 
'1. Sebelum PSBB = 20-03-2020 s/d 27-04-2020 ', 
{fontSize: '11px', margin: '11px 0 0 11px',padding: '0'}); 
var text_3 = ui.Label( 
'2. PSBB Jilid I = 28-04-2020 s/d 11-05-2020', 
{fontSize: '11px',margin: '0 0 0 11px',padding: '0'}); 
var text_4 = ui.Label( 
'3. PSBB Jilid II = 12-05-2020 s/d 25-05-2020', 
{fontSize: '11px',margin: '0 0 0 11px',padding: '0'}); 
var text_5 = ui.Label( 
'4. PSBB Jilid III = 26-05-2020 s/d 08-06-2020', 
{fontSize: '11px',margin: '0 0 0 11px',padding: '0'}); 
var text_6 = ui.Label( 
'5. PSBB Transisi = 09-06-2020 s/d 23-06-2020', 
{fontSize: '11px',margin: '0 0 0 11px',padding: '0'}); 
var text_7 = ui.Label( 
' Sumber data: Sentinel-5P Offline Data (European Union/ESA/Copernicus)', 
{fontSize: '11px',margin: '11px 0 0 11px',padding: '0'});
var text_8 = ui.Label( 
'Column Number Density', 
{fontSize: '11px',margin: '0 0 0 11px',padding: '0'}); 
var toolPanel = ui.Panel([header1, header2, text_1, text_2, text_3, text_4, text_5, text_6, text_7, text_8],  
'flow', {width: '360px'}); 
// Membuat legenda peta 
var viz = {min:0,max:0.05,palette:"lightblue,yellow,orange,red,purple"}; 
var legend = ui.Panel({ 
style: { 
position: 'bottom-left', 
padding: '8px 15px' 
} 
}); 
// Mambuat judul legenda 
var legendTitle = ui.Label({ 
value: 'Konsentrasi CO (mol/m²)', 
style: { 
fontWeight: 'bold', 
fontSize: '8 px', 
margin: '0 0 4px 0', 
padding: '0' 
} 
}); 
// Menambahkan judul ke panel 
legend.add(legendTitle); 
// membuat style legenda 
var makeRow = function(color, name) { 
// membuat kotak yang diwarnai 
var colorBox = ui.Label({ 
style: { 
backgroundColor: '#' + color, 
// Menggunakan padding untuk memberi lebar dan tinggi 
padding: '8px', 
margin: '0 0 4px 0' 
} 
}); 
// Membuat label warna dengan deskripsi text 
var description = ui.Label({ 
value: name, 
style: {margin: '0 0 4px 6px'} 
}); 
// Kembali ke panel 
return ui.Panel({ 
widgets: [colorBox, description], 
layout: ui.Panel.Layout.Flow('horizontal') 
}); 
}; 
var lon = ee.Image.pixelLonLat().select('latitude'); 
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min); 
var legendImage = gradient.visualize(viz); 
// Membuat label tulisan di atas legenda 
var panel_max = ui.Panel({ 
widgets: [ 
ui.Label(viz['max']) 
], 
}); 
legend.add(panel_max); 
// membuat thumbnail dari gambar 
var thumbnail = ui.Thumbnail({ 
image: legendImage, 
params: {bbox:'0,0,10,100', dimensions:'10x100'}, 
style: {padding: '1px', position: 'bottom-center'} 
}); 
// Menambahkan thumbnail ke legenda 
legend.add(thumbnail); 
// Membuat label tulisan dibawah legenda 
var panel_min = ui.Panel({ 
widgets: [ 
ui.Label(viz['min']) 
], 
}); 
legend.add(panel_min); 
toolPanel.add(legend); 
// membuat tulisan 
var text_6 = ui.Label( 
'Dibuat oleh: Akbar Nugroho',{fontSize: '11px',color:'gray',margin: '15px 0 0 11px',padding: '0'}); 
var text_7 = ui.Label( 
'Email: akbar.nugroho',{fontSize: '11px',color:'gray',margin: '0 0 0 11px',padding: '0'}); 
var text_8 = ui.Label(
  'S1 Teknik Geodesi Fakultas Teknik',{fontSize: '11px',color:'gray',margin: '0 0 0 11px',padding: '0'}); 
var text_9 = ui.Label( 
'Universitas Gadjah Mada',{fontSize: '11px',color:'gray',margin: '0 0 0 11px',padding: '0'}); 
var text6_9 = ui.Panel([text_6,text_7,text_8,text_9],'flow'); 
toolPanel.add(text6_9);
ui.root.widgets().add(toolPanel);