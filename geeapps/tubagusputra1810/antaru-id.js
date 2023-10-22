var KLM = ui.import && ui.import("KLM", "table", {
      "id": "users/tubagusputra1810/Wilayah_IbuKotaBaru"
    }) || ee.FeatureCollection("users/tubagusputra1810/Wilayah_IbuKotaBaru");
//variabel peta
var Map = ui.Map();
Map.setControlVisibility(true);
Map.setCenter(116.476, -0.107, 7);
var Map2 = ui.Map();
Map2.setControlVisibility(true);
Map2.setCenter(116.476, -0.107, 7);
//ndbi
var ndbicolor = {"opacity":1,"bands":["B11"],
"min":-0.8325123152709359,"max":0.23020889126941618,
"palette":["165dff","8befff","8dff9b","39ff16","ffa83d","ff0000"]};
var ndbi21 = ee.Image("users/tubagusputra1810/ndbi2021")
Map.addLayer(ndbi21,ndbicolor, 'ndbi21',0);
Map2.addLayer(ndbi21,ndbicolor, 'ndbi21',0);
var ndbi20 = ee.Image("users/tubagusputra1810/ndbi2020")
Map.addLayer(ndbi20,ndbicolor, 'ndbi20',0);
Map2.addLayer(ndbi20,ndbicolor, 'ndbi20',0);
var ndbi19 = ee.Image("users/tubagusputra1810/ndbi2019")
Map.addLayer(ndbi19,ndbicolor, 'ndbi19',0);
Map2.addLayer(ndbi19,ndbicolor, 'ndbi19',0);
//ndwi
var ndwicolor = {"opacity":1,"bands":["B3"],
"min":-1,"max":1,
"palette":['ff8025','f3ff41','5aff5f','45ddff','3790ff','123aff']}
var ndwi21 = ee.Image("users/tubagusputra1810/ndwi2021")
Map.addLayer(ndwi21,ndwicolor, 'ndwi21',0);
Map2.addLayer(ndwi21,ndwicolor, 'ndwi21',0);
var ndwi20 = ee.Image("users/tubagusputra1810/ndwi2020")
Map.addLayer(ndwi20,ndwicolor, 'ndwi20',0);
Map2.addLayer(ndwi20,ndwicolor, 'ndwi20',0);
var ndwi19 = ee.Image("users/tubagusputra1810/ndwi2019")
Map.addLayer(ndwi19,ndwicolor, 'ndwi19',0);
Map2.addLayer(ndwi19,ndwicolor, 'ndwi19',0);
//ndvi
var ndvicolor = {"opacity":1,"bands":["B8"],
"min":0,"max":1,
"palette":['FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901','66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01','012E01', '011D01', '011301']}
var ndvi21 = ee.Image("users/tubagusputra1810/NDVI2021")
Map.addLayer(ndvi21,ndvicolor, 'ndvi21',0);
Map2.addLayer(ndvi21,ndvicolor, 'ndvi21',0);
var ndvi20 = ee.Image("users/tubagusputra1810/NDVI2020")
Map.addLayer(ndvi20,ndvicolor, 'ndvi20',0);
Map2.addLayer(ndvi20,ndvicolor, 'ndvi20',0);
var ndvi19 = ee.Image("users/tubagusputra1810/NDVI2019")
Map.addLayer(ndvi19,ndvicolor, 'ndvi19',0);
Map2.addLayer(ndvi19,ndvicolor, 'ndvi19',0);
//LST
var lstcolor = {"opacity":1,
"min":21.538363454684415,"max":30.47086211061052,"bands":["LST_Day_1km"],
"palette":["0000ff","008000","ffff00","ffa500","ff0000"]}
var lst21 = ee.Image("users/tubagusputra1810/LST_2021")
Map.addLayer(lst21,lstcolor, 'lst21',0);
Map2.addLayer(lst21,lstcolor, 'lst21',0);
var lst20 = ee.Image("users/tubagusputra1810/LST_2020")
Map.addLayer(lst20,lstcolor, 'lst20',0);
Map2.addLayer(lst20,lstcolor, 'lst20',0);
var lst19 = ee.Image("users/tubagusputra1810/LST_2019")
Map.addLayer(lst19,lstcolor, 'lst19',0);
Map2.addLayer(lst19,lstcolor, 'lst19',0);
//co
var cocolor = {"opacity":1,
"min":0.022809094210937256,"max":0.03560378685438339,"bands": ["CO_column_number_density"],
"palette":["000000","0000ff","800080","00ffff","008000","ffff00","ff0000"]}
var co21 = ee.Image("users/tubagusputra1810/CO2021")
Map.addLayer(co21,cocolor, 'co21',0);
Map2.addLayer(co21,cocolor, 'co21',0);
var co20 = ee.Image("users/tubagusputra1810/CO2020")
Map.addLayer(co20,cocolor, 'co20',0);
Map2.addLayer(co20,cocolor, 'co20',0);
var co19 = ee.Image("users/tubagusputra1810/CO2019")
Map.addLayer(co19,cocolor, 'co19',0);
Map2.addLayer(co19,cocolor, 'co19',0);
//no2
var no2color = {"opacity":1,"bands": ["NO2_column_number_density"],
"min":0.00003019023513717464,"max":0.00004450806512288524,
"palette":["000000","0000ff","800080","00ffff","008000","ffff00","ff0000"]}
var no221 = ee.Image("users/tubagusputra1810/NO2_2021")
Map.addLayer(no221,no2color, 'no221',0);
Map2.addLayer(no221,no2color, 'no221',0);
var no220 = ee.Image("users/tubagusputra1810/NO2_2020")
Map.addLayer(no220,no2color, 'no220',0);
Map2.addLayer(no220,no2color, 'no220',0);
var no219 = ee.Image("users/tubagusputra1810/NO2_2019")
Map.addLayer(no219,no2color, 'no219',0);
Map2.addLayer(no219,no2color, 'no219',0);
//o3
var o3color = {"opacity":1,"bands":["O3_column_number_density"],
"min":0.1116571149143337,"max":0.1153458704532583,
"palette":["000000","0000ff","800080","00ffff","008000","ffff00","ff0000"]}
var o321 = ee.Image("users/tubagusputra1810/O3_2021")
Map.addLayer(o321,o3color, 'o321',0);
Map2.addLayer(o321,o3color, 'o321',0);
var o320 = ee.Image("users/tubagusputra1810/O3_2020")
Map.addLayer(o320,o3color, 'o320',0);
Map2.addLayer(o320,o3color, 'o320',0);
var o319 = ee.Image("users/tubagusputra1810/O3_2019")
Map.addLayer(o319,o3color, 'o319',0);
Map2.addLayer(o319,o3color, 'o319',0);
//so2
var so2color = {"opacity":1,"bands":["SO2_column_number_density"],
"min":-0.00007438353547021063,"max":0.00005734629903995966,
"palette":["000000","0000ff","800080","00ffff","008000","ffff00","ff0000"]}
var so221 = ee.Image("users/tubagusputra1810/SO2_2021")
Map.addLayer(so221,so2color, 'so221',0);
Map2.addLayer(so221,so2color, 'so221',0);
var so220 = ee.Image("users/tubagusputra1810/SO2_2020")
Map.addLayer(so220,so2color, 'so220',0);
Map2.addLayer(so220,so2color, 'so220',0);
var so219 = ee.Image("users/tubagusputra1810/SO2_2019")
Map.addLayer(so219,so2color, 'so219',0);
Map2.addLayer(so219,so2color, 'so219',0);
//Natural
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
var citra = ee.ImageCollection('COPERNICUS/S2_SR')
                  .filterDate('2019-01-01', '2020-12-01')
                  // Pre-filter to get less cloudy granules.
                  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',50))
                  .map(maskS2clouds)
                  .median()
                  .clip(KLM);
var visualization = {
  min: 0.0,
  max: 0.3,
  bands: ['B4', 'B3', 'B2'],
};
Map.addLayer(citra, visualization, 'Natural Color');
Map2.addLayer(citra, visualization, 'Natural Color');
var visserealia = {"opacity":1,"bands":["vis-red","vis-green","vis-blue"],"gamma":1};
var gandum = ee.Image("users/tubagusputra1810/Gandum")
var jagung = ee.Image("users/tubagusputra1810/Jagung")
var padi = ee.Image("users/tubagusputra1810/Padi")
var sorgum = ee.Image("users/tubagusputra1810/Sorgum")
var hias = ee.Image("users/tubagusputra1810/Tanaman_hias")
Map.addLayer(gandum, visserealia, 'gandum',0);
Map2.addLayer(gandum, visserealia, 'gandum',0);
Map.addLayer(jagung, visserealia, 'jagung',0);
Map2.addLayer(jagung, visserealia, 'jagung',0);
Map.addLayer(padi, visserealia, 'padi',0);
Map2.addLayer(padi, visserealia, 'padi',0);
Map.addLayer(sorgum, visserealia, 'sorgum',0);
Map2.addLayer(sorgum, visserealia, 'sorgum',0);
Map.addLayer(hias, visserealia, 'hias',0);
Map2.addLayer(hias, visserealia, 'hias',0);
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: Map,
  secondPanel: Map2,
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([Map, Map2]);
var Type = {
  'NDBI 2021' : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24, 25, 26, 27, 28, 29],
  'NDBI 2020': [1, 0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24, 25, 26, 27, 28, 29],
  'NDBI 2019': [2, 0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24, 25, 26, 27, 28, 29],
  'NDWI 2021': [3, 0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24, 25, 26, 27, 28, 29],
  'NDWI 2020' : [4, 0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24, 25, 26, 27, 28, 29],
  'NDWI 2019': [5, 0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24, 25, 26, 27, 28, 29],
  'NDVI 2021': [6, 0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24, 25, 26, 27, 28, 29],
  'NDVI 2020': [7, 0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24, 25, 26, 27, 28, 29],
  'NDVI 2019': [8, 0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24, 25, 26, 27, 28, 29],
  'LST 2021': [9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24, 25, 26, 27, 28, 29],
  'LST 202O': [10, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24, 25, 26, 27, 28, 29],
  'LST 2019': [11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24, 25, 26, 27, 28, 29],
  'CO 2021': [12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24, 25, 26, 27, 28, 29],
  'CO 2020': [13, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,24, 25, 26, 27, 28, 29],
  'CO 2019': [14, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23,24, 25, 26, 27, 28, 29],
  'NO2 2021': [15, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23,24, 25, 26, 27, 28, 29],
  'NO2 2020': [16, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23,24, 25, 26, 27, 28, 29],
  'NO2 2019': [17, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23,24, 25, 26, 27, 28, 29],
  '03 2021': [18, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23,24, 25, 26, 27, 28, 29],
  '03 2020':[19, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23,24, 25, 26, 27, 28, 29] ,
  '03 2019': [20, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23,24, 25, 26, 27, 28, 29],
  'SO2 2021': [21, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23,24, 25, 26, 27, 28, 29],
  'SO2 2020': [22, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23,24, 25, 26, 27, 28, 29],
  'SO2 2019': [23, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,24, 25, 26, 27, 28, 29],
  'Natural Color': [24, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29],
  'Gandum': [25, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29],
  'Jagung': [26, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 27, 28, 29],
  'Padi': [27, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 29],
  'Sorgum': [28, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29],
  'Tanaman Hias': [29, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28 ]
};
//select box
var select = ui.Select({
  items: Object.keys(Type),
  onChange:
  function(key) {
     Map.layers().get(Type[key][0]).setShown(true);
     Map.layers().get(Type[key][1]).setShown(false);
     Map.layers().get(Type[key][2]).setShown(false);
     Map.layers().get(Type[key][3]).setShown(false);
     Map.layers().get(Type[key][4]).setShown(false);
     Map.layers().get(Type[key][5]).setShown(false);
     Map.layers().get(Type[key][6]).setShown(false);
     Map.layers().get(Type[key][7]).setShown(false);
     Map.layers().get(Type[key][8]).setShown(false);
     Map.layers().get(Type[key][9]).setShown(false);
     Map.layers().get(Type[key][10]).setShown(false);
     Map.layers().get(Type[key][11]).setShown(false);
     Map.layers().get(Type[key][12]).setShown(false);
     Map.layers().get(Type[key][13]).setShown(false);
     Map.layers().get(Type[key][14]).setShown(false);
     Map.layers().get(Type[key][15]).setShown(false);
     Map.layers().get(Type[key][16]).setShown(false);
     Map.layers().get(Type[key][17]).setShown(false);
     Map.layers().get(Type[key][18]).setShown(false);
     Map.layers().get(Type[key][19]).setShown(false);
     Map.layers().get(Type[key][20]).setShown(false);
     Map.layers().get(Type[key][21]).setShown(false);
     Map.layers().get(Type[key][22]).setShown(false);
     Map.layers().get(Type[key][23]).setShown(false);
     Map.layers().get(Type[key][24]).setShown(false);
     Map.layers().get(Type[key][25]).setShown(false);
     Map.layers().get(Type[key][26]).setShown(false);
     Map.layers().get(Type[key][27]).setShown(false);
     Map.layers().get(Type[key][28]).setShown(false);
     Map.layers().get(Type[key][29]).setShown(false);
  }
});
var select2 = ui.Select({
  items: Object.keys(Type),
  onChange: function(key) {
     Map2.layers().get(Type[key][0]).setShown(true);
     Map2.layers().get(Type[key][1]).setShown(false);
     Map2.layers().get(Type[key][2]).setShown(false);
     Map2.layers().get(Type[key][3]).setShown(false);
     Map2.layers().get(Type[key][4]).setShown(false);
     Map2.layers().get(Type[key][5]).setShown(false);
     Map2.layers().get(Type[key][6]).setShown(false);
     Map2.layers().get(Type[key][7]).setShown(false);
     Map2.layers().get(Type[key][8]).setShown(false);
     Map2.layers().get(Type[key][9]).setShown(false);
     Map2.layers().get(Type[key][10]).setShown(false);
     Map2.layers().get(Type[key][11]).setShown(false);
     Map2.layers().get(Type[key][12]).setShown(false);
     Map2.layers().get(Type[key][13]).setShown(false);
     Map2.layers().get(Type[key][14]).setShown(false);
     Map2.layers().get(Type[key][15]).setShown(false);
     Map2.layers().get(Type[key][16]).setShown(false);
     Map2.layers().get(Type[key][17]).setShown(false);
     Map2.layers().get(Type[key][18]).setShown(false);
     Map2.layers().get(Type[key][19]).setShown(false);
     Map2.layers().get(Type[key][20]).setShown(false);
     Map2.layers().get(Type[key][21]).setShown(false);
     Map2.layers().get(Type[key][22]).setShown(false);
     Map2.layers().get(Type[key][23]).setShown(false);
     Map2.layers().get(Type[key][24]).setShown(false);
     Map2.layers().get(Type[key][25]).setShown(false);
     Map2.layers().get(Type[key][26]).setShown(false);
     Map2.layers().get(Type[key][27]).setShown(false);
     Map2.layers().get(Type[key][28]).setShown(false);
     Map2.layers().get(Type[key][29]).setShown(false);
  }
});
//////////////////////////////////////////
var data = ui.Panel([]);
data.style().set({position: 'top-left',border:'1px solid gray',padding:'2px',width:'105px'})
var data2 = ui.Panel([]);
data2.style().set({position: 'top-right',border:'1px solid gray',padding:'2px',width:'105px'})
select.setPlaceholder('Pilih Peta...');
select2.setPlaceholder('Pilih Peta...');
data.add(select)
data2.add(select2)
Map.add(data)
Map2.add(data2)
//////////////////////////////////////////
var header = ui.Thumbnail({
    image: ee.Image("projects/ee-tubagusputra1810/assets/logo"), 
    params: { min: 0, max: 255},
    style: {margin:'10px', width: '225px', height: '150px'}});
var text = ui.Label(
    'Analisa Ibu Kota Baru Indonesia', {fontWeight: 'bold',fontSize: '14px'});
var toolPanel = ui.Panel([header, text], 'flow', {width: '250px'});
ui.root.widgets().add(toolPanel);
ui.root.widgets().reset([toolPanel]);
ui.root.widgets().add(splitPanel);
var link = ui.Label(
    'Panduan penggunaan aplikasi Antaru-id', {},
    'https://sites.google.com/view/antaru-id/panduan');
var tahuntersedia = ui.Panel([
  ui.Label('Tahun yang tersedia: 2019, 2020 dan 2021', {'font-size': '11px'}), link]);
toolPanel.add(tahuntersedia);
//////////////////////////////////////////
var Kutai = ee.FeatureCollection("projects/ee-tubagusputra1810/assets/Kutai"),
    Penajam = ee.FeatureCollection("projects/ee-tubagusputra1810/assets/Panajem"),
    KLM = ee.FeatureCollection("users/tubagusputra1810/Wilayah_IbuKotaBaru");
var locationDict = {
  'Keseluruhan': {area: KLM, zoom: 8},
  'Kabupaten Kutai Kartanegara': {area: Kutai, zoom: 8.5},
  'Kabupaten Penajam Paser Utara': {area: Penajam, zoom: 9.8}
};    
var defaultLocation = locationDict['Keseluruhan'];
Map.centerObject(
    defaultLocation.area, defaultLocation.zoom);
var locations = Object.keys(locationDict);
var locationSelect = ui.Select({
  items: locations,
  value: locations[0],
  onChange: function(value) {
    var location = locationDict[value];
    Map.centerObject(location.area,location.zoom);
  }
});
var locationPanel = ui.Panel([
  ui.Label('Pilih Lokasi Ibu Kota Baru', {'font-size': '16px','fontWeight': 'bold' }), locationSelect]);
toolPanel.add(locationPanel);
//////////////////////////////////
var mapPanel = ui.Map();
// Histogram display options (combined suitability grid)
var legend = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {position:'bottom-left',border:'1px solid gray',padding:'2px',width:'205px'}
})
var identity = ui.Panel ([
  ui.Label('Tampilkan data dalam bentuk grafik time series', {fontSize: '11px', padding:'2px'},
    'https://sites.google.com/view/antaru-id/projek'),
    ]);
legend.add(identity);
Map.add(legend);
var layerProperties = {
    'NDBI': {
    name: 'B11',
   legend: [
      {'Badan Air': '165dff'},{'Vegetasi': '39ff16'}, {'Rapat Bangunan Rendah': 'ffa83d'}, {'Rapat Bangunan Tinggi': 'ff0000'}
    ],
    defaultVisibility: false
  },
    'NDWI': {
    name: 'B3',
   legend: [
      {'Sangat Kering': 'ff8025'},{'Kering': 'f3ff41'}, {'Sedang': '5aff5f'}, {'Basah': '45ddff'},
      {'Sangat Basah': '123aff'}
    ],
    defaultVisibility: false
  },
   'NDVI': {
    name: 'B8 ',
   legend: [
      {'Badan Air': 'FFFFFF'},{'Rapat Vegetasi Sangat Rendah': 'CE7E45'}, {'Rapat Vegetasi Rendah': 'FCD163'}, {'Rapat Vegetasi Sedang': '74A901'},
      {'Rapat Vegetasi Tinggi': '207401'}
    ],
    defaultVisibility: false
  },
   'LST': {
    name: "LST_Day_1km",
   legend: [
      {'Suhu 20-22 °C': '0000ff'},{'Suhu 23-24 °C': '008000'}, {'Suhu 25-26 °C': 'ffff00'}, {'Suhu 27-29 °C': 'ffff00'},
      {'Suhu >29 °C': 'ff0000'}
    ],
    defaultVisibility: false
  },
   'CO': {
    name: "CO_column_number_density",
   legend: [{'0.022-0.023 mol/m2': '000000'},
      {'0.023-0.025 mol/m2': '0000ff'},{'0.026-0.027 mol/m2': '800080'}, {'0.028-0.029 mol/m2': '00ffff'}, {'0.030-0.031 mol/m2': '008000'},
      {'0.032-0.034 mol/m2': 'ffff00'}, {'>0.035 mol/m2': 'ff0000'}
    ],
    defaultVisibility: false
  },
   'NO2': {
    name: "NO2_column_number_density",
   legend: [{'< 0.000031 mol/m2': '000000'},
      {'0.000032 mol/m2': '0000ff'},{'0.000034 mol/m2': '800080'}, {'0.000036 mol/m2': '00ffff'}, {'0.000038-0.000040 mol/m2': '008000'},
      {'0.000041 mol/m2': 'ffff00'}, {'>0.000043 mol/m2': 'ff0000'}
    ],
    defaultVisibility: false
  },
   'O3': {
    name: "O3_column_number_density",
   legend: [{'0.1115-0.1118 mol/m2': '000000'},
      {'0.1119-0.1123 mol/m2': '0000ff'},{'0.1123-0.1129 mol/m2': '800080'}, {'0.1130-0.1134 mol/m2': '00ffff'}, {'0.1134-0.1141 mol/m2': '008000'},
      {'0.1141-0.1150 mol/m2': 'ffff00'}, {'>0.1151 mol/m2': 'ff0000'}
    ],
    defaultVisibility: false
  },'SO2': {
    name: "SO2_column_number_density",
   legend: [{'<-0.00008 mol/m2': '000000'},
      {'-0.00005 mol/m2': '0000ff'},{'-0.00003 mol/m2': '800080'}, {'-0.00001 mol/m2': '00ffff'}, {'0.00001 mol/m2': '008000'},
      {'0.00003 mol/m2': 'ffff00'}, {'>0.00005 mol/m2': 'ff0000'}
    ],
    defaultVisibility: false
},
   'Serealia': {
    name: ["vis-red","vis-green","vis-blue"],
   legend: [{'Sangat cocok ditanami': '37eb34'},
      {'Cocok ditanami': 'faf20c'},{'Kurang cocok ditanami': 'e00438'}, {'Tidak cocok ditanami': 'd10eeb'}
    ],
    defaultVisibility: false
  }
};
var mapPanel = ui.Map();
// Create a layer selector pulldown.
// The elements of the pulldown are the keys of the layerProperties dictionary.
var selectItems = Object.keys(layerProperties);
// Define the pulldown menu.  Changing the pulldown menu changes the map layer
// and legend.
var layerSelect = ui.Select({
  items: selectItems,
  value: selectItems[0],
  onChange: function(selected) {
    // Loop through the map layers and compare the selected element to the name
    // of the layer. If they're the same, show the layer and set the
    // corresponding legend.  Hide the others.
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName());
    });
    setLegend(layerProperties[selected].legend);
  }
});
// Add the select to the toolPanel with some explanatory text.
toolPanel.add(ui.Label('Pilih Legenda:', {'font-size': '16px', 'fontWeight': 'bold'}));
toolPanel.add(layerSelect);
// Create the legend.
// Define a panel for the legend and give it a tile.
var legendPanel = ui.Panel({
  style:
      {fontWeight: 'bold', fontSize: '10px', margin: '0 0 0 8px', padding: '0'}
});
toolPanel.add(legendPanel);
// Define an area for the legend key itself.
// This area will be replaced every time the layer pulldown is changed.
var keyPanel = ui.Panel();
legendPanel.add(keyPanel);
function setLegend(legend) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
  keyPanel.clear();
  for (var i = 0; i < legend.length; i++) {
    var item = legend[i];
    var name = Object.keys(item)[0];
    var color = item[name];
    var colorBox = ui.Label('', {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0'
    });
    // Create the label with the description text.
    var description = ui.Label(name, {margin: '0 0 4px 6px'});
    keyPanel.add(
        ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
  }
}
// Set the initial legend.
setLegend(layerProperties[layerSelect.getValue()].legend);
var update = ui.Panel([
  ui.Label('Update Desember 2021', {'font-size': '9px'})]);
toolPanel.add(update);