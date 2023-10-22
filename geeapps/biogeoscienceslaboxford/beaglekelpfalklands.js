var EF = ui.import && ui.import("EF", "image", {
      "id": "users/biogeoscienceslaboxford/02_EastFalkland_3857"
    }) || ee.Image("users/biogeoscienceslaboxford/02_EastFalkland_3857"),
    PL = ui.import && ui.import("PL", "image", {
      "id": "users/biogeoscienceslaboxford/02_BeagleChart_PortLouis3857"
    }) || ee.Image("users/biogeoscienceslaboxford/02_BeagleChart_PortLouis3857"),
    f160 = ui.import && ui.import("f160", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falkands_2016-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falkands_2016-0000000000-0000000000"),
    f161 = ui.import && ui.import("f161", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falkands_2016-0000000000-0000023296"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falkands_2016-0000000000-0000023296"),
    f162 = ui.import && ui.import("f162", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falkands_2016-0000000000-0000046592"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falkands_2016-0000000000-0000046592"),
    f170 = ui.import && ui.import("f170", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falkands_2017-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falkands_2017-0000000000-0000000000"),
    f171 = ui.import && ui.import("f171", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falkands_2017-0000000000-0000023296"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falkands_2017-0000000000-0000023296"),
    f172 = ui.import && ui.import("f172", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falkands_2017-0000000000-0000046592"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falkands_2017-0000000000-0000046592"),
    f180 = ui.import && ui.import("f180", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falkands_2018-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falkands_2018-0000000000-0000000000"),
    f181 = ui.import && ui.import("f181", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falkands_2018-0000000000-0000023296"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falkands_2018-0000000000-0000023296"),
    f182 = ui.import && ui.import("f182", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falkands_2018-0000000000-00000465920"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falkands_2018-0000000000-00000465920"),
    f190 = ui.import && ui.import("f190", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falkands_2019-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falkands_2019-0000000000-0000000000"),
    f191 = ui.import && ui.import("f191", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falkands_2019-0000000000-0000023296"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falkands_2019-0000000000-0000023296"),
    f192 = ui.import && ui.import("f192", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falkands_2019-0000000000-0000046592"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falkands_2019-0000000000-0000046592"),
    f84 = ui.import && ui.import("f84", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_1984-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_1984-0000000000-0000000000"),
    f86 = ui.import && ui.import("f86", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_1986-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_1986-0000000000-0000000000"),
    f870 = ui.import && ui.import("f870", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_1987-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_1987-0000000000-0000000000"),
    f871 = ui.import && ui.import("f871", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_1987-0000000000-0000032768"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_1987-0000000000-0000032768"),
    f970 = ui.import && ui.import("f970", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_1997-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_1997-0000000000-0000000000"),
    f971 = ui.import && ui.import("f971", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_1997-0000000000-0000032768"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_1997-0000000000-0000032768"),
    f980 = ui.import && ui.import("f980", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_1998-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_1998-0000000000-0000000000"),
    f981 = ui.import && ui.import("f981", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_1998-0000000000-0000032768"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_1998-0000000000-0000032768"),
    f990 = ui.import && ui.import("f990", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_1999-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_1999-0000000000-0000000000"),
    f991 = ui.import && ui.import("f991", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_1999-0000000000-0000032768"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_1999-0000000000-0000032768"),
    f010 = ui.import && ui.import("f010", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_2001-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_2001-0000000000-0000000000"),
    f011 = ui.import && ui.import("f011", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_2001-0000000000-0000032768"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_2001-0000000000-0000032768"),
    f020 = ui.import && ui.import("f020", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_2002-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_2002-0000000000-0000000000"),
    f021 = ui.import && ui.import("f021", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_2002-0000000000-0000032768"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_2002-0000000000-0000032768"),
    f030 = ui.import && ui.import("f030", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_2003-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_2003-0000000000-0000000000"),
    f031 = ui.import && ui.import("f031", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_2003-0000000000-0000032768"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_2003-0000000000-0000032768"),
    f040 = ui.import && ui.import("f040", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_2004-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_2004-0000000000-0000000000"),
    f041 = ui.import && ui.import("f041", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_2004-0000000000-0000032768"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_2004-0000000000-0000032768"),
    f050 = ui.import && ui.import("f050", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_2005-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_2005-0000000000-0000000000"),
    f051 = ui.import && ui.import("f051", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_2005-0000000000-0000032768"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_2005-0000000000-0000032768"),
    f060 = ui.import && ui.import("f060", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_2006-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_2006-0000000000-0000000000"),
    f061 = ui.import && ui.import("f061", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_2006-0000000000-0000032768"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_2006-0000000000-0000032768"),
    f070 = ui.import && ui.import("f070", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_2007-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_2007-0000000000-0000000000"),
    f071 = ui.import && ui.import("f071", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_2007-0000000000-0000032768"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_2007-0000000000-0000032768"),
    f080 = ui.import && ui.import("f080", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_2008-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_2008-0000000000-0000000000"),
    f081 = ui.import && ui.import("f081", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_2008-0000000000-0000032768"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_2008-0000000000-0000032768"),
    f090 = ui.import && ui.import("f090", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_2009-0000000000-0000000000"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_2009-0000000000-0000000000"),
    f091 = ui.import && ui.import("f091", "image", {
      "id": "users/biogeoscienceslaboxford/02_Falklands_2009-0000000000-0000032768"
    }) || ee.Image("users/biogeoscienceslaboxford/02_Falklands_2009-0000000000-0000032768"),
    PW = ui.import && ui.import("PW", "image", {
      "id": "users/biogeoscienceslaboxford/02_L279_PortWilliam_Falklands"
    }) || ee.Image("users/biogeoscienceslaboxford/02_L279_PortWilliam_Falklands"),
    WF = ui.import && ui.import("WF", "image", {
      "id": "users/biogeoscienceslaboxford/02_WestFalkland_3857"
    }) || ee.Image("users/biogeoscienceslaboxford/02_WestFalkland_3857"),
    tus = ui.import && ui.import("tus", "image", {
      "id": "users/biogeoscienceslaboxford/Validation_KD_Tussacbottom"
    }) || ee.Image("users/biogeoscienceslaboxford/Validation_KD_Tussacbottom"),
    kelly = ui.import && ui.import("kelly", "image", {
      "id": "users/biogeoscienceslaboxford/Validation_KD_Tussackelly"
    }) || ee.Image("users/biogeoscienceslaboxford/Validation_KD_Tussackelly"),
    top = ui.import && ui.import("top", "image", {
      "id": "users/biogeoscienceslaboxford/Validation_KD_Tussactop"
    }) || ee.Image("users/biogeoscienceslaboxford/Validation_KD_Tussactop"),
    drone1 = ui.import && ui.import("drone1", "image", {
      "id": "users/biogeoscienceslaboxford/2019_07_11_TussacIslands_BottomIsland_20cm"
    }) || ee.Image("users/biogeoscienceslaboxford/2019_07_11_TussacIslands_BottomIsland_20cm"),
    drone2 = ui.import && ui.import("drone2", "image", {
      "id": "users/biogeoscienceslaboxford/2019_07_11_TussacIslands_TopIslandKelly_20cm"
    }) || ee.Image("users/biogeoscienceslaboxford/2019_07_11_TussacIslands_TopIslandKelly_20cm"),
    a153 = ui.import && ui.import("a153", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0153_1_modified"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0153_1_modified"),
    a155 = ui.import && ui.import("a155", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0155_3_1_modified"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0155_3_1_modified"),
    a158 = ui.import && ui.import("a158", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0158_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0158_modified_1"),
    a117 = ui.import && ui.import("a117", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0117_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0117_modified_1"),
    a118 = ui.import && ui.import("a118", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0118_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0118_modified_1"),
    a119 = ui.import && ui.import("a119", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0119_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0119_modified_1"),
    a120 = ui.import && ui.import("a120", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0120_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0120_modified_1"),
    a121 = ui.import && ui.import("a121", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0121_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0121_modified_1"),
    a122 = ui.import && ui.import("a122", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0122_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0122_modified_1"),
    a124 = ui.import && ui.import("a124", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0124_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0124_modified_1"),
    a126 = ui.import && ui.import("a126", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0126_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0126_modified_1"),
    a132 = ui.import && ui.import("a132", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0132_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0132_modified_1"),
    a135 = ui.import && ui.import("a135", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0135_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0135_modified_1"),
    a160 = ui.import && ui.import("a160", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0160_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0160_modified_1"),
    a283 = ui.import && ui.import("a283", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0283_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0283_modified_1"),
    a284 = ui.import && ui.import("a284", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0284_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0284_modified_1"),
    a285 = ui.import && ui.import("a285", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0285_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0285_modified_1"),
    a315 = ui.import && ui.import("a315", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0315_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0315_modified_1"),
    a317 = ui.import && ui.import("a317", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0317_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0317_modified_1"),
    a318 = ui.import && ui.import("a318", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0318_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0318_modified_1"),
    a320 = ui.import && ui.import("a320", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0320_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0320_modified_1"),
    a328 = ui.import && ui.import("a328", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0328_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0328_modified_1"),
    a334 = ui.import && ui.import("a334", "image", {
      "id": "users/biogeoscienceslaboxford/02_IMAG0334_modified_1"
    }) || ee.Image("users/biogeoscienceslaboxford/02_IMAG0334_modified_1"),
    gt76 = ui.import && ui.import("gt76", "table", {
      "id": "users/biogeoscienceslaboxford/02_GT_AerialFalklands_1976"
    }) || ee.FeatureCollection("users/biogeoscienceslaboxford/02_GT_AerialFalklands_1976");
///Beagle Kelp project
//Agua Fresca, Strait of Magellan 
Map.setOptions('SATELLITE');
Map.setControlVisibility(null, null, false, false, false); 
var f87 = ee.ImageCollection([f870, f871]);
var f97 = ee.ImageCollection([f970, f971]);
var f98 = ee.ImageCollection([f980, f981]);
var f99 = ee.ImageCollection([f990, f991]);
var f01 = ee.ImageCollection([f010, f011]);
var f02 = ee.ImageCollection([f020, f021]);
var f03 = ee.ImageCollection([f030, f031]);
var f04 = ee.ImageCollection([f040, f041]);
var f05 = ee.ImageCollection([f050, f051]);
var f06 = ee.ImageCollection([f060, f061]);
var f07 = ee.ImageCollection([f070, f071]);
var f08 = ee.ImageCollection([f080, f081]);
var f09 = ee.ImageCollection([f090, f091]);
var f2016 = ee.ImageCollection([f160, f161, f162]);
var f2017 = ee.ImageCollection([f170, f171, f172]);
var f2018 = ee.ImageCollection([f180, f181, f182]);
var f2019 = ee.ImageCollection([f190, f191, f192]);
var f2019v = ee.ImageCollection([tus, kelly, top]);
var faerial = ee.ImageCollection([a155, a153, a158, a160, a328,
a135, a284, a285, a283, a121, a122, a124, a315, a317, a120, 
a132, a117, a118, a119, a126, a318, a320, a334]);
var fdrone = ee.ImageCollection([drone1, drone2]);
Map.addLayer(WF, {}, 'West Falklands, HMS Beagle, 1834');
Map.addLayer(EF, {}, 'East Falklands, HMS Beagle, 1834');
Map.addLayer(PL, {min: 0, max: 255}, 'Port Louis, Falklands, HMS Beagle, 1834');
Map.addLayer(PW, {min: 0, max: 255}, 'Port William, Falklands, HMS Beagle, 1834');
Map.addLayer(faerial, {}, 'UKHO Aerial surveys, 1976');
Map.addLayer(gt76, {}, 'Ground Truth Aerial surveys 1976');
Map.addLayer(fdrone, {}, 'UAV surveys, 2019');
//Map.setCenter(-57.8097, -51.6624, 10)
Map.setCenter(-59.6114, -51.7071, 8)
Map.addLayer(f84, {palette: '2a9d8f'}, '1984' )
Map.addLayer(f86,{palette: 'e9c46a'}, '1986' )
Map.addLayer(f87,{palette: 'f4a261'}, '1987')
Map.addLayer(f97,{palette: 'e76f51'}, '1997')
Map.addLayer(f98,{palette: 'e63946'}, '1998')
Map.addLayer(f99,{palette: 'a8dadc'}, '1999')
Map.addLayer(f01,{palette: '457b9d'}, '2001')
//Map.addLayer(f02,{palette: '1d3557'}, '2002')
Map.addLayer(f03,{palette: 'ffcdb2'}, '2003')
Map.addLayer(f04,{palette: 'ffbe0b'}, '2004')
Map.addLayer(f05,{palette: 'fb5607'}, '2005')
Map.addLayer(f06,{palette: 'ff006e'}, '2006')
Map.addLayer(f07,{palette: '8338ec'}, '2007')
Map.addLayer(f08,{palette: '3d5a80'}, '2008')
Map.addLayer(f09,{palette: 'ee6c4d'}, '2009')
Map.addLayer(f2016,{palette: '3a86ff'}, '2016')
Map.addLayer(f2017,{palette: '1a535c'}, '2017')
Map.addLayer(f2018,{palette: '4ecdc4'}, '2018')
Map.addLayer(f2019,{palette: 'ff6b6b'}, '2019')
Map.addLayer(f2019v,{palette: 'ff6b6b'}, '2019 KF validation')
var city = {
  'Stanley to Cape Pembroke ': [-57.85778, -51.69499]
  }
var selectcity = ui.Select({
  items: Object.keys(city),
  onChange: function(key) {
    Map.setCenter(city[key][0], city[key][1], 11);
  }
});
selectcity.setPlaceholder('Urban development');
var places6 = {
  'Stanley Harbour (protected)': [-57.867, -51.69033],
    'Kelly Rocks (exposed)': [-57.76068, -51.67341],
     'Berkeley Sound': [-58.1652, -51.5452],
      'White Rock Bay': [-59.3465, -51.5185],
   'Pebble Island': [-59.4708, -51.3167],
    'Saunders Island': [-60.0785, -51.37],
    'West Point Island': [-60.6816, -51.34],
    'Beaver Island': [-61.2044, -51.8269],
'Fox Bay': [-60.0767, -51.963],
};
var select6 = ui.Select({
  items: Object.keys(places6),
  onChange: function(key) {
    Map.setCenter(places6[key][0], places6[key][1], 13);
  }
});
select6.setPlaceholder('van Tussenbroek, 1985-1987 Surveys');
var title = ui.Label({
  value: 'The Beagle Kelp project - Falkland Islands (Malvinas)', 
  style: {    fontSize: '20px',    fontWeight: 'bold',     maxWidth: '320px'  }});
var explore = ui.Label({
  value: 'Click on Layers and explore. Each colour layer is indicating annual satellite-detected kelp canopies. In the background, aerial images (1976), drone images (2019-2020),the first records of kelp areas drawn on Nautical Charts.', 
  style: {    fontSize: '14px',    maxWidth: '320px'  }});
var sources = ui.Label({
  value: 'Sources', 
  style: {    fontSize: '16px',    fontWeight: 'bold',     maxWidth: '320px'  }});
var source1 = ui.Label({
  value: '1984-2011: NDVI derived from Landsat 5 TM.', 
  style: {    fontSize: '14px',      maxWidth: '320px'  }});
var source2 = ui.Label({
  value: '2016-2019: KF derived from Sentinel-2.', 
  style: {    fontSize: '14px',      maxWidth: '350px'  }});
var source3 = ui.Label({
  value: '1834: East and West Falklands, Port Louis and Port William, from HMS Beagle.', 
  style: {    fontSize: '14px',      maxWidth: '350px'  }});
var source4 = ui.Label({
  value: '1976: UKHO Aerial Surveys.', 
  style: {    fontSize: '14px',      maxWidth: '350px'  }});
var source5 = ui.Label({
  value: '2019: SAERI UAV Surveys.', 
  style: {    fontSize: '14px',      maxWidth: '350px'  }});
var style_header = {fontSize: '13px',    fontWeight: 'bold',  width:'300px',  maxWidth: '320px', backgroundColor: 'lightblue', padding: '5px', margin: '15px 0 0 10px '};
var subtitle23_link = ui.Label('Main map - The Beagle Kelp Project',style_header , 'https://biogeoscienceslaboxford.users.earthengine.app/view/beaglekelpcharts');
var panel = ui.Panel();
panel.add(title);
panel.add(explore);
panel.add(sources)
panel.add(source3);
panel.add(source4); 
panel.add(source1);
panel.add(source2);
panel.add(source5);
panel.add(selectcity);
panel.add(select6);
panel.add(subtitle23_link);
ui.root.add(panel);