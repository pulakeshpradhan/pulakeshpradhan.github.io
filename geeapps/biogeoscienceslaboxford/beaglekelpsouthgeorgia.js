var sg160 = ui.import && ui.import("sg160", "image", {
      "id": "users/biogeoscienceslaboxford/SG_2016-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/SG_2016-0000000000-0000000000"),
    sg161 = ui.import && ui.import("sg161", "image", {
      "id": "users/biogeoscienceslaboxford/SG_2016-0000000000-0000023296"
    }) || ee.Image("users/biogeoscienceslaboxford/SG_2016-0000000000-0000023296"),
    sg162 = ui.import && ui.import("sg162", "image", {
      "id": "users/biogeoscienceslaboxford/SGBird_2016"
    }) || ee.Image("users/biogeoscienceslaboxford/SGBird_2016"),
    sg170 = ui.import && ui.import("sg170", "image", {
      "id": "users/biogeoscienceslaboxford/SG_2017-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/SG_2017-0000000000-0000000000"),
    sg171 = ui.import && ui.import("sg171", "image", {
      "id": "users/biogeoscienceslaboxford/SG_2017-0000000000-0000023296"
    }) || ee.Image("users/biogeoscienceslaboxford/SG_2017-0000000000-0000023296"),
    sg172 = ui.import && ui.import("sg172", "image", {
      "id": "users/biogeoscienceslaboxford/SGBird_2017"
    }) || ee.Image("users/biogeoscienceslaboxford/SGBird_2017"),
    sg180 = ui.import && ui.import("sg180", "image", {
      "id": "users/biogeoscienceslaboxford/SG_2018-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/SG_2018-0000000000-0000000000"),
    sg181 = ui.import && ui.import("sg181", "image", {
      "id": "users/biogeoscienceslaboxford/SG_2018-0000000000-0000023296"
    }) || ee.Image("users/biogeoscienceslaboxford/SG_2018-0000000000-0000023296"),
    sg182 = ui.import && ui.import("sg182", "image", {
      "id": "users/biogeoscienceslaboxford/SGBird_2018"
    }) || ee.Image("users/biogeoscienceslaboxford/SGBird_2018"),
    sg190 = ui.import && ui.import("sg190", "image", {
      "id": "users/biogeoscienceslaboxford/SG_2019-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/SG_2019-0000000000-0000000000"),
    sg191 = ui.import && ui.import("sg191", "image", {
      "id": "users/biogeoscienceslaboxford/SG_2019-0000000000-0000023296"
    }) || ee.Image("users/biogeoscienceslaboxford/SG_2019-0000000000-0000023296"),
    sg192 = ui.import && ui.import("sg192", "image", {
      "id": "users/biogeoscienceslaboxford/SGBird_2019"
    }) || ee.Image("users/biogeoscienceslaboxford/SGBird_2019"),
    CB20 = ui.import && ui.import("CB20", "image", {
      "id": "users/biogeoscienceslaboxford/01CumberlandBay1920"
    }) || ee.Image("users/biogeoscienceslaboxford/01CumberlandBay1920"),
    RB = ui.import && ui.import("RB", "image", {
      "id": "users/biogeoscienceslaboxford/01RoyalBay1882"
    }) || ee.Image("users/biogeoscienceslaboxford/01RoyalBay1882"),
    MH = ui.import && ui.import("MH", "image", {
      "id": "users/biogeoscienceslaboxford/01MoltkeHarbour1882"
    }) || ee.Image("users/biogeoscienceslaboxford/01MoltkeHarbour1882"),
    BoI = ui.import && ui.import("BoI", "image", {
      "id": "users/biogeoscienceslaboxford/01BayofIsles1914"
    }) || ee.Image("users/biogeoscienceslaboxford/01BayofIsles1914"),
    kec20 = ui.import && ui.import("kec20", "image", {
      "id": "users/biogeoscienceslaboxford/01KingEdwardCove1920"
    }) || ee.Image("users/biogeoscienceslaboxford/01KingEdwardCove1920"),
    CB25 = ui.import && ui.import("CB25", "image", {
      "id": "users/biogeoscienceslaboxford/01CumberlandBay1925"
    }) || ee.Image("users/biogeoscienceslaboxford/01CumberlandBay1925"),
    CB29 = ui.import && ui.import("CB29", "image", {
      "id": "users/biogeoscienceslaboxford/01CumberlandBay1929"
    }) || ee.Image("users/biogeoscienceslaboxford/01CumberlandBay1929"),
    SB = ui.import && ui.import("SB", "image", {
      "id": "users/biogeoscienceslaboxford/01StromnessBay1927"
    }) || ee.Image("users/biogeoscienceslaboxford/01StromnessBay1927"),
    UH27 = ui.import && ui.import("UH27", "image", {
      "id": "users/biogeoscienceslaboxford/01UndineHarbour1927"
    }) || ee.Image("users/biogeoscienceslaboxford/01UndineHarbour1927"),
    UH27Z = ui.import && ui.import("UH27Z", "image", {
      "id": "users/biogeoscienceslaboxford/01UndineHarbour1927_zoom"
    }) || ee.Image("users/biogeoscienceslaboxford/01UndineHarbour1927_zoom"),
    HH = ui.import && ui.import("HH", "image", {
      "id": "users/biogeoscienceslaboxford/01HusvikHarbour1928"
    }) || ee.Image("users/biogeoscienceslaboxford/01HusvikHarbour1928"),
    BF = ui.import && ui.import("BF", "image", {
      "id": "users/biogeoscienceslaboxford/01BarfPoint1929"
    }) || ee.Image("users/biogeoscienceslaboxford/01BarfPoint1929"),
    JH = ui.import && ui.import("JH", "image", {
      "id": "users/biogeoscienceslaboxford/01JasonHarbour1929"
    }) || ee.Image("users/biogeoscienceslaboxford/01JasonHarbour1929"),
    Mai = ui.import && ui.import("Mai", "image", {
      "id": "users/biogeoscienceslaboxford/01Maiviken1929"
    }) || ee.Image("users/biogeoscienceslaboxford/01Maiviken1929"),
    PC = ui.import && ui.import("PC", "image", {
      "id": "users/biogeoscienceslaboxford/01PleasantCove1929"
    }) || ee.Image("users/biogeoscienceslaboxford/01PleasantCove1929"),
    LH27 = ui.import && ui.import("LH27", "image", {
      "id": "users/biogeoscienceslaboxford/01LarsenHarbour1927"
    }) || ee.Image("users/biogeoscienceslaboxford/01LarsenHarbour1927"),
    Leith27 = ui.import && ui.import("Leith27", "image", {
      "id": "users/biogeoscienceslaboxford/01LeithHarbour1927"
    }) || ee.Image("users/biogeoscienceslaboxford/01LeithHarbour1927"),
    WB = ui.import && ui.import("WB", "image", {
      "id": "users/biogeoscienceslaboxford/01WillisAndBirdIslands1931"
    }) || ee.Image("users/biogeoscienceslaboxford/01WillisAndBirdIslands1931"),
    CBuller = ui.import && ui.import("CBuller", "image", {
      "id": "users/biogeoscienceslaboxford/01CapeBuller1931"
    }) || ee.Image("users/biogeoscienceslaboxford/01CapeBuller1931"),
    Else = ui.import && ui.import("Else", "image", {
      "id": "users/biogeoscienceslaboxford/01Elsehul1930"
    }) || ee.Image("users/biogeoscienceslaboxford/01Elsehul1930"),
    RW = ui.import && ui.import("RW", "image", {
      "id": "users/biogeoscienceslaboxford/01RightWhaleBay1930"
    }) || ee.Image("users/biogeoscienceslaboxford/01RightWhaleBay1930"),
    BW = ui.import && ui.import("BW", "image", {
      "id": "users/biogeoscienceslaboxford/01BlueWhale1931"
    }) || ee.Image("users/biogeoscienceslaboxford/01BlueWhale1931"),
    FB = ui.import && ui.import("FB", "image", {
      "id": "users/biogeoscienceslaboxford/01FortunaBay1931"
    }) || ee.Image("users/biogeoscienceslaboxford/01FortunaBay1931"),
    LH31 = ui.import && ui.import("LH31", "image", {
      "id": "users/biogeoscienceslaboxford/01LarsenHarbour1931"
    }) || ee.Image("users/biogeoscienceslaboxford/01LarsenHarbour1931"),
    PO = ui.import && ui.import("PO", "image", {
      "id": "users/biogeoscienceslaboxford/01PrinceOlaf1931"
    }) || ee.Image("users/biogeoscienceslaboxford/01PrinceOlaf1931"),
    POZ = ui.import && ui.import("POZ", "image", {
      "id": "users/biogeoscienceslaboxford/01PrinceOlaf193_zoom"
    }) || ee.Image("users/biogeoscienceslaboxford/01PrinceOlaf193_zoom"),
    UH31 = ui.import && ui.import("UH31", "image", {
      "id": "users/biogeoscienceslaboxford/01UndineHarbour1931"
    }) || ee.Image("users/biogeoscienceslaboxford/01UndineHarbour1931"),
    Leith31 = ui.import && ui.import("Leith31", "image", {
      "id": "users/biogeoscienceslaboxford/01LeithHarbour1931"
    }) || ee.Image("users/biogeoscienceslaboxford/01LeithHarbour1931"),
    Larsen2020 = ui.import && ui.import("Larsen2020", "image", {
      "id": "users/biogeoscienceslaboxford/LARH_15JAN2020_reducedtiff"
    }) || ee.Image("users/biogeoscienceslaboxford/LARH_15JAN2020_reducedtiff"),
    Rook = ui.import && ui.import("Rook", "image", {
      "id": "users/biogeoscienceslaboxford/ROOK_22NOV2019_lowrestif"
    }) || ee.Image("users/biogeoscienceslaboxford/ROOK_22NOV2019_lowrestif"),
    Cobb = ui.import && ui.import("Cobb", "image", {
      "id": "users/biogeoscienceslaboxford/COBB_22NOV2019_lowrestiff"
    }) || ee.Image("users/biogeoscienceslaboxford/COBB_22NOV2019_lowrestiff"),
    Oce = ui.import && ui.import("Oce", "image", {
      "id": "users/biogeoscienceslaboxford/OCEA_17JAN2020_reducedtif"
    }) || ee.Image("users/biogeoscienceslaboxford/OCEA_17JAN2020_reducedtif"),
    frtn = ui.import && ui.import("frtn", "image", {
      "id": "users/biogeoscienceslaboxford/FRTN_21NOV2019_reducedtif"
    }) || ee.Image("users/biogeoscienceslaboxford/FRTN_21NOV2019_reducedtif");
///Beagle Kelp project
// South Georgia 
Map.setOptions('SATELLITE');
Map.setControlVisibility(null, null, false, false, false); 
var col1882 = ee.ImageCollection([CB20, RB, MH, BoI, kec20]);//Fuera: CB05,  kec05
var col1925 = ee.ImageCollection([CB25,CB29,  SB, UH27, UH27Z, HH, BF,  JH, Mai, PC, LH27, Leith27]);
var col1930 = ee.ImageCollection([WB, CBuller, Else, RW, BW, FB, LH31, PO, POZ, UH31, Leith31 ]); 
Map.addLayer(col1882,  {}, 'SG Charts 1882-1920');
Map.addLayer(col1925, {}, 'SG Charts 1925-1929');
Map.addLayer(col1930, {}, 'SG Charts 1930-1931');
var sg16 = ee.ImageCollection([sg160, sg161, sg162]);
var sg17= ee.ImageCollection([sg170, sg171, sg172]);
var sg18= ee.ImageCollection([sg180, sg181, sg182]);
var sg19= ee.ImageCollection([sg190, sg191, sg192]);
var uav = ee.ImageCollection([Rook, Cobb, Larsen2020,  Oce, frtn])
Map.addLayer(uav,{}, 'UAV (Drone) Imagery 2020');
Map.setCenter(-36.555, -54.312, 9);
Map.addLayer(sg16, {palette: '2a9d8f'}, '2016' );
Map.addLayer(sg17, {palette: 'e9c46a'}, '2017' );
Map.addLayer(sg18,{palette: 'f4a261'}, '2018');
Map.addLayer(sg19,{palette: 'e76f51'}, '2019');
//Whaling/sealing areas
var whaling = {
  'Larsen Harbour 1927 1931': [-36.00687, -54.83555], 
  'Godthul': [-36.2911, -54.2927], 
  'Darthmouth Point': [-36.44514, -54.31474],
  'Discovery Point': [-36.4848, -54.30427], 
  'Grytviken' : [-36.50179, -54.28143],
  'Maiviken': [-36.51473, -54.24649],
  'Jason Harbour': [-36.58356, -54.19406], 
  'Husvik': [-36.71044, -54.17965], 
  'Alert Cove': [-36.69575, -54.18687], 
  'Tonsberg Point': [-36.65409, -54.16819], 
  'Stromness': [-36.71264, -54.15967], 
  'Leith Harbour': [-36.6865, -54.14139], 
  'Prince Olaf Harbour': [-37.15705, -54.06068], 
  'Prion Island': [-37.26229, -54.03124], 
'Rosita Harbour': [-37.45868, -54.01561], 
'Right Whale Bay': [-37.68765, -54.00445], 
'Elsehul': [-37.96645, -54.0264], 
'Undine Harbour':[-37.96876, -54.03438]
}
var selectwha = ui.Select({
  items: Object.keys(whaling),
  onChange: function(key) {
    Map.setCenter(whaling[key][0], whaling[key][1], 14);
  }
});
selectwha.setPlaceholder('Whaling stations/ Sealing sites');
// Glacier retreat 
var glacier = {
    'Moltke Harbour (Ross Glacier) 1882': [-36.07298, -54.52385], 
    'Turnback Glacier': [-36.82923, -54.12863], 
    'Purvis Glacier': [-37.16241, -54.09256], 
    'Beckmann Fjord': [-37.19934, -54.05887], 
    'Sea Leopard Fjord': [-37.24181, -54.07989]
}
var selectgla = ui.Select({
  items: Object.keys(glacier),
  onChange: function(key) {
    Map.setCenter(glacier[key][0], glacier[key][1], 13 );
  }
});
selectgla.setPlaceholder('Glacier retreat');
//South Georgia
var maps = {
  'Bay of Isles, 1914': [-37.2875, -54.023],
  'Blue Whale Harbour 1931': [-37.01362, -54.0721], 
  //'Cook Bay': [-37.12275, -54.05797],
  'Elsehul 1930': [-37.96828, -54.02091],
  'Fortuna Bay 1931': [-36.8018, -54.1353], 
  'Jason Harbour 1929': [-36.57443, -54.19904],
  'Husvik Harbour 1928': [-36.69622, -54.18096],
  'King Edward Cove 1920': [-36.49872, -54.28393],
  'Leith Harbour 1927 1931': [-36.67658, -54.14407], 
  'Maiviken 1929' : [-36.50596, -54.24565],
  'Pleasant Cove 1929': [-36.298, -54.2789], 
  'Prince Olaf Harbour 1931': [-37.15159, -54.06059], 
  'Right Whale Bay 1930': [-37.67223, -54.00723],
 // 'Royal Bay 1882' : [-36.0496, -54.553],
'Undine Harbour 1927': [-37.96093, -54.03788], 
'Willis and Bird Islands 1931': [-38.0498, -54.0061]
};
var selectmaps = ui.Select({
  items: Object.keys(maps),
  onChange: function(key) {
    Map.setCenter(maps[key][0], maps[key][1], 9 );
  }
});
selectmaps.setPlaceholder('South Georgia - Nautical Charts');
var uav_name = {
  'Ocean Harbour ': [-36.26214, -54.33712],
  'Cobbler’s Cove': [-36.29822, -54.27937], 
  'Larsen Harbour': [-36.00851, -54.83652],
  'Rookery Bay': [-36.32101, -54.26952], 
  'Fortuna Bay': [-36.79964, -54.14388]
};
var selectuav = ui.Select({
  items: Object.keys(uav_name),
  onChange: function(key) {
    Map.setCenter(uav_name[key][0], uav_name[key][1], 14 );
  }
});
selectuav.setPlaceholder('South Georgia - UAV Imagery');
var title = ui.Label({
  value: 'The Beagle Kelp project - South Georgia', 
  style: {    fontSize: '20px',    fontWeight: 'bold',     maxWidth: '320px'  }});
var explore = ui.Label({
  value: 'Click on Layers and explore. Each colour layer is indicating annual satellite-detected kelp canopies. In the background, the first records of kelp areas drawn on Nautical Charts.', 
  style: {    fontSize: '14px',    maxWidth: '320px'  }});
var sources = ui.Label({
  value: 'Sources', 
  style: {    fontSize: '16px',    fontWeight: 'bold',     maxWidth: '320px'  }});
var source2 = ui.Label({
  value: '2016-2019: KF derived from Sentinel-2.', 
  style: {    fontSize: '14px',      maxWidth: '350px'  }});
var source3 = ui.Label({
  value: '1882-1931: UKHO Nautical Charts.', 
  style: {    fontSize: '14px',      maxWidth: '350px'  }});
var style_header = {fontSize: '13px',    fontWeight: 'bold',  width:'300px',  maxWidth: '320px', backgroundColor: 'lightblue', padding: '5px', margin: '15px 0 0 10px '};
var source4 = ui.Label({
  value: '2020 UAV Imagery: Tom Hart, Penguin Watch', 
  style: {    fontSize: '14px',      maxWidth: '350px'  }});
var style_header = {fontSize: '13px',    fontWeight: 'bold',  width:'300px',  maxWidth: '320px', backgroundColor: 'lightblue', padding: '5px', margin: '15px 0 0 10px '};
var subtitle23_link = ui.Label('Main map - The Beagle Kelp Project',style_header , 'https://biogeoscienceslaboxford.users.earthengine.app/view/beaglekelpcharts');
var panel = ui.Panel();
panel.add(title);
panel.add(explore);
panel.add(sources)
panel.add(source3);
panel.add(source2);
panel.add(source4);
panel.add(selectwha);
panel.add(selectgla);
panel.add(selectmaps);
panel.add(selectuav);
panel.add(subtitle23_link); 
ui.root.add(panel);