var forest = ui.import && ui.import("forest", "image", {
      "id": "UMD/hansen/global_forest_change_2019_v1_7"
    }) || ee.Image("UMD/hansen/global_forest_change_2019_v1_7"),
    ind = ui.import && ui.import("ind", "table", {
      "id": "users/masitamanessa/indo"
    }) || ee.FeatureCollection("users/masitamanessa/indo"),
    fair = ui.import && ui.import("fair", "table", {
      "id": "users/masitamanessa/FAIR_BRI_point"
    }) || ee.FeatureCollection("users/masitamanessa/FAIR_BRI_point");
Map.centerObject(ind)
var places = {
  NAD:[96.19833000000,4.10765600000],
  Tanjung_Kasam:[104.13300000000,1.04550000000],
  Sumsel:[103.75450730000,-2.15590430000],
  Bengkulu:[102.27037500000,-3.91234780000],
  Paiton:[113.57061000000,-7.71116000000],
  Teluk_Sirih:[100.37240000000,-1.07655000000],
  Adipala:[109.13756000000,-7.68377000000],
  Celukan_Bawang:[114.85160000000,-8.19630000000],
  Cilacap_Sumber:[109.09001000000,-7.68621000000],
  Parit_Baru:[109.20333000000,0.05804000000],
  Bangko_Tengah:[103.80413300000,-3.83867900000],
  Pangkalan_Susu_3_4:[98.25782300000,4.11840100000],
  Pelabuhan_Ratu:[106.54683000000,-7.02393000000],
  Suralaya:[106.46460000000,-6.05850000000],
  Takalar:[119.55082200000,-5.62363470000],
  Rembang:[111.47490000000,-6.63600000000],
  Pacitan:[111.37360000000,-8.25780000000],
  Java_7:[106.10080050000,-5.99169430000],
  Indramayu_Sumuradem:[107.97030100000,-6.27494700000],
  Cilacap_Extension:[109.08774050000,-7.68478600000],
  East_Nusa:[123.93309600000,-10.12277300000],
  Pangkalan_Susu_2_1:[98.25784319000,4.11937847000],
  Pangkalan_Susu_2_2:[98.20835000000,4.08520000000],
  Nagan_Raya:[96.19808865000,4.10770728400]
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    Map.setCenter(places[key][0], places[key][1],14);
  }
});
select.setPlaceholder('Choose a site...');
Map.add(select);
var dataset = ee.Image('UMD/hansen/global_forest_change_2019_v1_7');
var treeCoverVisParam = {
  bands: ['treecover2000'],
  min: 0,
  max: 100,
  opacity: 0.44,
  palette: ['white', 'green']
};
//Map.addLayer(dataset, treeCoverVisParam, 'tree cover');
var treeLossVisParam = {
  bands: ['lossyear'],
  min: 0,
  max: 19,
  opacity: 0.44,
  palette: ['yellow', 'red']
};
Map.addLayer(dataset, treeLossVisParam, 'tree loss year');
Map.addLayer(fair)