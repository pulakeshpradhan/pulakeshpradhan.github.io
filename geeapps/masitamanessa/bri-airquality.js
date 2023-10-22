var Area = ui.import && ui.import("Area", "table", {
      "id": "users/masitamanessa/Sites_Area"
    }) || ee.FeatureCollection("users/masitamanessa/Sites_Area");
Map.setOptions('HYBRID');
Map.addLayer(Area);
Map.centerObject(Area, 6);
var startDate = ee.Date('2019-01-01'); // set start time for analysis 2018-12-05T11:53:01 - 2021-02-03T00:00:00
var endDate = ee.Date('2021-01-31'); // set end time for analysis
var nMonths = ee.Number(endDate.difference(startDate,'month')).round();
var CO   = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_CO').filterDate(startDate, endDate).filterBounds(Area).select('CO_column_number_density');
var NO2  = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_NO2').filterDate(startDate, endDate).filterBounds(Area).select('tropospheric_NO2_column_number_density');
var HCHO = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_HCHO').filterDate(startDate, endDate).filterBounds(Area).select('tropospheric_HCHO_column_number_density'); 
var SO4  = ee.ImageCollection('COPERNICUS/S5P/OFFL/L3_SO2').filterDate(startDate, endDate).filterBounds(Area).select('SO2_column_number_density'); 
var CObyMonth = ee.ImageCollection(ee.List.sequence(0,nMonths).map(function (n) {
    // calculate the offset from startDate
    var ini = startDate.advance(n,'month');
    // advance just one month
    var end = ini.advance(1,'month');
    // filter and reduce
    return CO.filterDate(ini,end)
                .select(0).mean()
                .set('system:time_start', ini);
}));
var NO2byMonth = ee.ImageCollection(ee.List.sequence(0,nMonths).map(function (n) {
    // calculate the offset from startDate
    var ini = startDate.advance(n,'month');
    // advance just one month
    var end = ini.advance(1,'month');
    // filter and reduce
    return NO2.filterDate(ini,end)
                .select(0).mean()
                .set('system:time_start', ini);
}));
var HCHObyMonth = ee.ImageCollection(ee.List.sequence(0,nMonths).map(function (n) {
    // calculate the offset from startDate
    var ini = startDate.advance(n,'month');
    // advance just one month
    var end = ini.advance(1,'month');
    // filter and reduce
    return HCHO.filterDate(ini,end)
                .select(0).mean()
                .set('system:time_start', ini);
}));
var SO4byMonth = ee.ImageCollection(ee.List.sequence(0,nMonths).map(function (n) {
    // calculate the offset from startDate
    var ini = startDate.advance(n,'month');
    // advance just one month
    var end = ini.advance(1,'month');
    // filter and reduce
    return SO4.filterDate(ini,end)
                .select(0).mean()
                .set('system:time_start', ini);
}));
// ################################################################
// ### Apps ###
// ################################################################
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '600px',position: 'top-left'}})
    .add(ui.Label('Choose site to explore the Air Quality during 2019 - 2021'));
var places = { 
  '01. PLTU Mulut Tambang Sumsel 8' : ['01'],
  '02. Batangtoru HydropowerPlant' : ['02'],
  //'03. Jakarta Bandung Fast Train' : ['03'],
  '04. PLTU Paiton Unit 9' : ['04'],
  '05. PLTU Celukan Bawang' : ['05'],
  //'06a. Raknamo Dam' : ['06a'],
  //'06b. Kolhua Dam' : ['06b'],
  //'06c. Mbay/Lambo Dam' : ['06c'],
  //'07. Samarinda-Balikpapan Toll Road' : ['07'],
  '08. Tanah Kuning Industrial Park' : ['08'],
  //'09. PT Indonesia Kayan Hydro Energy' : ['09'],
  '10. Ketapang Industrial Park' : ['10'],
  //'10b. PT Well Harvest Winning Alumina Refinery' : ['10b'],
  //'10c. PT. Borneo Alumindo Prima (BAP) Pagar Mentimun' : ['10c'],
  //'11. Manado-Bitung Toll Road' : ['11'],
  '11a. Likupang Economic Zone' : ['11a'],
  '11b. Bitung Eco Industrial Estate' : ['11b'],
  '11c. Bitung International Port' : ['11c'],
  '11d. PLTU Sulbagut 3' : ['11d'],
  //'11f. Lembeh International Airport' :  ['11f'],
  //'11h. Lembeh-Manado Bridge' : ['11h'],
  '12. Morowali Industrial Park' : ['12'],
  //'12b. PT Bintang Delapan Mineral' : ['12b'],
  //'12c. PT Indonesia Morowali Industrial Park' : ['12c'],
  //'12d. PT Sulawesi Mining Investment' : ['12d'],
  //'12e. PT Indonesia Guang Ching  Nickel and Stainless Steel Industry' : ['12e'],
  //'12f. PT Indonesia Tiangshan Stainless Steel' : ['12f'],
  //'12g. PT Indonesia Ruipu Nickehl and Chrome Alloy' : ['12g'],
  //'12h. PT Bintang Delapan' : ['12h'],
  //'12i. PT Central Omega Resources' : ['12i'],
  //'12j. PT Hengjaya Mineralindo' : ['12j'],
  //'12k. PT Hengjaya Nickel Industry' : ['12k'],
  '13. Hengjaya Nickel Project' : ['13'],
  '14a. PT Wanatiara Persada' : ['14a'],
  '14b. PT Megah Surya Pertiwi' : ['14b'],
  '15. SDIC Cement Project' :  ['15'],
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
      var pois = Area.filter(ee.Filter.eq('ID', places[key][0]));
      var geometries = pois.geometry();
      var poi = geometries.buffer(500);
      Map.centerObject(pois,15);
    var titleCO  = 'CO Over Time: ' + key ;
    var titleNO2 = 'NO2 Over Time: ' + key ;
    var titleHCHO  = 'HCHO Over Time: ' + key ;
    var titleSO4 = 'SO4 Over Time: ' + key ;
    var chart1 = ui.Chart.image.series(CObyMonth, pois, ee.Reducer.mean(), 100)
      .setOptions({
        title: titleCO,
        vAxis: {title: 'mol/m^2'},
        lineWidth: 1,
        pointSize: 3,
        trendlines: {0: {
        color: 'CC0000',
        type: 'linear',
              showR2: true,
              visibleInLegend: true
      }},
      });
      panel.widgets().set(2, chart1);
    var chart2 = ui.Chart.image.series(NO2byMonth, pois, ee.Reducer.mean(), 100)
      .setOptions({
        title: titleNO2,
        vAxis: {title: 'mol/m^2'},
        lineWidth: 1,
        pointSize: 3,
        trendlines: {0: {
        color: 'CC0000',
        type: 'linear',
              showR2: true,
              visibleInLegend: true
      }},
      });
      panel.widgets().set(3, chart2);
    var chart3 = ui.Chart.image.series(SO4byMonth, pois, ee.Reducer.mean(), 100)
      .setOptions({
        title: titleSO4,
        vAxis: {title: 'mol/m^2'},
        lineWidth: 1,
        pointSize: 3,
        trendlines: {0: {
        color: 'CC0000',
        type: 'linear',
              showR2: true,
              visibleInLegend: true
      }},
      });
      panel.widgets().set(4, chart3);  
    var chart4 = ui.Chart.image.series(HCHObyMonth, pois, ee.Reducer.mean(), 100)
      .setOptions({
        title: titleHCHO,
        vAxis: {title: 'mol/m^2'},
        lineWidth: 1,
        pointSize: 3,
        trendlines: {0: {
        color: 'CC0000',
        type: 'linear',
              showR2: true,
              visibleInLegend: true
      }},
      });
      panel.widgets().set(5, chart4);    
  }
});
// Set a place holder.
select.setPlaceholder('Choose a Site...');
panel.widgets().set(1, select);
Map.add(panel);