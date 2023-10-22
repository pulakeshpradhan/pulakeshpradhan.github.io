/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var roi = ee.FeatureCollection("users/edwine_sp/WRI/Adm_sumsel_2020"),
    lv3_sem1_19 = ee.Image("users/edwine_sp/WRI/19lv3sem1_REV"),
    lv3_sem2_19 = ee.Image("users/edwine_sp/WRI/19lv3sem2_REV"),
    lv3_sem1_20 = ee.Image("users/edwine_sp/WRI/20lv3sem1"),
    lv3_sem2_20 = ee.Image("users/edwine_sp/WRI/20lv3sem2");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// DATA fajri
var lv3list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
var lv2list = [201,202,203,204,205,206,207,208,209,210,211,212,212,212,212,212,212,212];
var lv2_sem1_19 = lv3_sem1_19.remap(lv3list,lv2list,0);
var lv2_sem2_19 = lv3_sem2_19.remap(lv3list,lv2list,0);
var lv2_sem1_20 = lv3_sem1_20.remap(lv3list,lv2list,0);
var lv2_sem2_20 = lv3_sem2_20.remap(lv3list,lv2list,0);
var swt_sem1_19 = lv3_sem1_19.eq(12).selfMask();
var swt_sem2_19 = lv3_sem2_19.eq(12).selfMask();
var swt_sem1_20 = lv3_sem1_20.eq(12).selfMask();
var swt_sem2_20 = lv3_sem2_20.eq(12).selfMask();
////////////////////
var lv2 = 'Level 2';
var lv3 = 'Level 3';
var swt = 'Sawit';
var time1 = 'Jan-Jun 2019';
var time2 = 'Jul-Des 2019';
var time3 = 'Jan-Jun 2020';
var time4 = 'Jul-Des 2020';
// membuat control panel
ui.root.clear();
var panel1 = ui.Panel({style: {width: '250px'}});
var panel2 = ui.Panel({style: {width: '250px'}});
var peta = ui.Map();
var button = ui.Button({
  label:'Tampilkan!',
  onClick:redraw
});
var header = ui.Label('PETA KOMODITAS PERKEBUNAN', {fontSize: '24px', color: 'blue'});
var text = ui.Label(
    'Hasil pemetaan komoditas perkebunan Sumatera Selatan, WRI 2020',
    {fontSize: '11px'});
ui.root.add(panel1).add(peta).add(panel2);
panel1.add(header).add(text);
panel1.add(ui.Label('Penutupan lahan', {'font-size': '18px'}));
var selectlv = ui.Select({
  items: [lv2, lv3, swt],
  value: lv3,
  onChange:legenda
});
var selectperiod = ui.Select({
  items: [time1, time2, time3, time4],
  value: time4,
//  onChange: redraw
});
var locationDict = {
  'Provinsi Sumsel': {lon: 104.296878, lat: -3.275556, zoom: 8},
  'Kab. Banyuasin': {lon: 104.681617, lat: -2.526332, zoom: 9},
  'Kab. Empat Lawang': {lon: 102.954796, lat: -3.755612, zoom: 10},
  'Kab. Lahat': {lon: 103.384678, lat: -3.827839, zoom: 10},
  'Kab. Muara Enim': {lon: 103.885971, lat: -3.755507, zoom: 10},
  'Kab. Musi Banyuasin': {lon: 103.822461, lat: -2.457607, zoom: 10},
  'Kab. Musi Rawas': {lon: 103.135881, lat: -3.165418, zoom: 10},
  'Kab. Musi Rawas Utara': {lon: 102.743749, lat: -2.740297, zoom: 10},
  'Kab. Ogan Ilir': {lon: 104.611103, lat: -3.406385, zoom: 10},
  'Kab. Ogan Komering Ilir': {lon: 105.398328, lat: -3.363982, zoom: 10},
  'Kab. Ogan Komering Ulu': {lon: 104.109885, lat: -4.091392, zoom: 10},
  'Kab. Ogan Komering Ulu Selatan': {lon: 103.908796, lat: -4.587121, zoom: 10},
  'Kab. Ogan Komering Ulu Timur': {lon: 104.565266, lat: -4.076673, zoom: 10},
  'Kab. Penukai Abab Lematang Ilir': {lon: 103.976551, lat: -3.219998, zoom: 10},
  'Kota Lubuk Linggau': {lon: 102.877826, lat: -3.264201, zoom: 10},
  'Kota Pagar Alam': {lon: 103.267991, lat: -4.118147, zoom: 10},
  'Kota Palembang': {lon: 104.732574, lat: -2.974968, zoom: 11},
  'Kota Prabumulih': {lon: 104.228085, lat: -3.452602, zoom: 10}
};
var locations = Object.keys(locationDict);
var locationSelect = ui.Select({
  items: locations,
  value: locations[0],
  onChange: function(value) {
    var location = locationDict[value];
    peta.setCenter(location.lon, location.lat, location.zoom);
  }
});
panel1.add(ui.Label('Level:')).add(selectlv);
panel1.add(ui.Label('Periode:')).add(selectperiod);
panel1.add(ui.Label('Wilayah administrasi:')).add(locationSelect);
panel1.add(button);
peta.centerObject(roi, 8);
peta.style().set('cursor', 'crosshair');
//
function redraw() {
  peta.layers().reset();
  var level = selectlv.getValue();
  var periode = selectperiod.getValue();
  var image;
  if (level == 'Level 3' && periode == 'Jan-Jun 2019') {
    image = lv3_sem1_19.visualize({min:1, max:18, palette:lv3Palette});
  } else if (level == 'Level 3' && periode == 'Jul-Des 2019') {
    image = lv3_sem2_19.visualize({min:1, max:18, palette:lv3Palette});
  } else if (level == 'Level 3' && periode == 'Jan-Jun 2020') {
    image = lv3_sem1_20.visualize({min:1, max:18, palette:lv3Palette});
  } else if (level == 'Level 3' && periode == 'Jul-Des 2020') {
    image = lv3_sem2_20.visualize({min:1, max:18, palette:lv3Palette});
  } else if (level == 'Level 2' && periode == 'Jan-Jun 2019') {
    image = lv2_sem1_19.visualize({min:201, max:212, palette:lv2Palette});
  } else if (level == 'Level 2' && periode == 'Jul-Des 2019') {
    image = lv2_sem2_19.visualize({min:201, max:212, palette:lv2Palette});
  } else if (level == 'Level 2' && periode == 'Jan-Jun 2020') {
    image = lv2_sem1_20.visualize({min:201, max:212, palette:lv2Palette});
  } else if (level == 'Level 2' && periode == 'Jul-Des 2020') {
    image = lv2_sem2_20.visualize({min:201, max:212, palette:lv2Palette});
  } else if (level == 'Sawit' && periode == 'Jan-Jun 2019') {
    image = swt_sem1_19.visualize({palette:'green'});
  } else if (level == 'Sawit' && periode == 'Jul-Des 2019') {
    image = swt_sem2_19.visualize({palette:'green'});
  } else if (level == 'Sawit' && periode == 'Jan-Jun 2020') {
    image = swt_sem1_20.visualize({palette:'green'});
  } else if (level == 'Sawit' && periode == 'Jul-Des 2020') {
    image = swt_sem2_20.visualize({palette:'green'});
  }
  peta.addLayer(image);
  peta.addLayer(aoiline, {palette:['black']},'AOI');
}
var aoiline = ee.Image().byte().paint({
  featureCollection: roi,
  color: 1,
  width: 3
});
///////////////////////////////////////
var LEGEND2 = {
  '201: Pemukiman':'#d63000',
  '202: Tubuh Air': '#31acd6',
  '203: Semak Belukar': '#000000',
  '204: Hutan Lahan Kering': '#3c7404', 
  '205: Hutan Mangrove': '#f9cd13',
  '206: Hutan Rawa/ Gambut': '#cf75f9',
  '207: Hutan Tanaman': '#beb407',
  '208: Kolam Tambak': '#200bf9',
  '209: Lahan Terbuka': '#f0f9b6',
  '210: Rawa Pedalaman': '#f9b990',
  '211: Tanaman Semusim': '#f3f956',
  '212: Perkebunan': '#bfffbc',
};
var lv2Palette = Object.keys(LEGEND2).map(function(key){
  return LEGEND2[key]
});
var LEGEND3 = {
  '1: Pemukiman':'#d63000',
  '2: Tubuh Air': '#31acd6',
  '3: Semak Belukar': '#000000',
  '4: Hutan Lahan Kering': '#3c7404', 
  '5: Hutan Mangrove': '#f9cd13',
  '6: Hutan Rawa/ Gambut': '#cf75f9',
  '7: Hutan Tanaman': '#beb407',
  '8: Kolam Tambak': '#200bf9',
  '9: Lahan Terbuka': '#f0f9b6',
  '10: Rawa Pedalaman': '#f9b990',
  '11: Tanaman Semusim': '#f3f956',
  '12: Kelapa sawit': '#fffd00',
  '13: Karet': '#0aff00',
  '14: Kelapa': '#3fff99',
  '15: Kopi': '#0c6804',
  '16: Tebu': '#ff065c',
  '17: Teh': '#abc467',
  '18: Kebun campuran': '#baff00',
};
var lv3Palette = Object.keys(LEGEND3).map(function(key){
  return LEGEND3[key]
});
var LEGEND1 = {
  'Kelapa sawit': '#00ff00',
};
var lv1Palette = Object.keys(LEGEND1).map(function(key){
  return LEGEND1[key]
});
panel2.add(ui.Label('Legenda', {'font-size': '18px'}));
function makeLegend(data) {
  // ui.Panel:
  var legend = ui.Panel({
    style: {
      width: '250px',
      position: 'top-right',
      //border: '1px solid lightgray',
    }
  });
  // Legend title:
  legend.add(ui.Label("Kelas tutupan lahan", {
    fontWeight: 'bold', 
    fontSize: '18px'
    //fontWeight: '100',
    //color: 'gray',
  }));
  Object.keys(data).map(function(label){
    legend.add(makeLegendEntry(data[label], label));
  });
  return legend;
}
function makeLegendEntry(color, label) {
  label = ui.Label(label, {
    margin: '0 0 4px 6px',    //'auto 0',
    //fontWeight: '100',
    //color: '#555'
  });
  return makeRow([makeColorBox(color), label]);
}
function makeColorBox(color) {
  return ui.Label('', {
    backgroundColor: color,  
    padding: '8px',
    margin: '0 0 4px 0',
    border: '1px solid gray',
  });
}
function makeRow(widgets){
  return ui.Panel({
    widgets: widgets,
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      padding: '0px 5px',
    }
  });
}
function legenda() {
  panel2.clear();
  var level = selectlv.getValue();
  var legend;
  if (level == 'Level 2') {
    legend = makeLegend(LEGEND2)
  } else if (level == 'Level 3') {
    legend = makeLegend(LEGEND3)
  } else if (level == 'Sawit') {
    legend = makeLegend(LEGEND1)
  }
  panel2.add(legend)
}