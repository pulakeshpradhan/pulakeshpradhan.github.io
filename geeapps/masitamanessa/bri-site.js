var points = ui.import && ui.import("points", "table", {
      "id": "users/masitamanessa/Selected_sites_BRI"
    }) || ee.FeatureCollection("users/masitamanessa/Selected_sites_BRI"),
    area = ui.import && ui.import("area", "table", {
      "id": "users/masitamanessa/Sites_Area"
    }) || ee.FeatureCollection("users/masitamanessa/Sites_Area");
Map.centerObject(points,5);
Map.addLayer(points, {},"Site");
Map.addLayer(area, {},"AreaSite");
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '200px',position: 'top-left'}})
    .add(ui.Label('Choose site to explore'));
var places = { 
  '01. PLTU Mulut Tambang Sumsel 8' : ['01'],
  '02. Batangtoru HydropowerPlant' : ['02'],
  '03. Jakarta Bandung Fast Train' : ['03'],
  '04. PLTU Paiton Unit 9' : ['04'],
  '05. PLTU Celukan Bawang' : ['05'],
  '06a. Raknamo Dam' : ['06a'],
  '06b. Kolhua Dam' : ['06b'],
  '06c. Mbay/Lambo Dam' : ['06c'],
  '07. Samarinda-Balikpapan Toll Road' : ['07'],
  '08c. Tanah Kuning Industrial Park' : ['08c'],
  '09a. PT Indonesia Kayan Hydro Energy' : ['09a'],
  '10a. Ketapang Industrial Park' : ['10a'],
  '10b. PT Well Harvest Winning Alumina Refinery' : ['10b'],
  '10c. PT. Borneo Alumindo Prima (BAP) Pagar Mentimun' : ['10c'],
  '11a. Likupang Economic Zone' : ['11a'],
  '11b. Bitung Eco Industrial Estate' : ['11b'],
  '11d. Bitung International Port' : ['11d'],
  '11e. PLTU Sulbagut 3' : ['11e'],
  '11f. Lembeh International Airport' :  ['11f'],
  '11g. Manado-Bitung Toll Road' : ['11g'],
  '11h. Lembeh-Manado Bridge' : ['11h'],
  '12a. Morowali Industrial Park' : ['12a'],
  '12b. PT Bintang Delapan Mineral' : ['12b'],
  '12c. PT Indonesia Morowali Industrial Park' : ['12c'],
  '12d. PT Sulawesi Mining Investment' : ['12d'],
  '12e. PT Indonesia Guang Ching  Nickel and Stainless Steel Industry' : ['12e'],
  '12f. PT Indonesia Tiangshan Stainless Steel' : ['12f'],
  '12g. PT Indonesia Ruipu Nickehl and Chrome Alloy' : ['12g'],
  '12h. PT Bintang Delapan' : ['12h'],
  '12i. PT Central Omega Resources' : ['12i'],
  '12j. PT Hengjaya Mineralindo' : ['12j'],
  '12k. PT Hengjaya Nickel Industry' : ['12k'],
  '14a. PT Wanatiara Persada' : ['14a'],
  '14b. PT Megah Surya Pertiwi' : ['14b'],
  '15. SDIC Cement Project' :  ['15'],
};
   //var pois = points.filter(ee.Filter.eq('ID', places[key][1]));
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    var pois = points.filter(ee.Filter.eq('ID', places[key][0]));
    Map.centerObject(pois,13);
  }
});
// Set a place holder.
select.setPlaceholder('Choose a Site...');
panel.widgets().set(1, select);
Map.add(panel);