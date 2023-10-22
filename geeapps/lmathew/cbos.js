var s1 = ui.import && ui.import("s1", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    l8 = ui.import && ui.import("l8", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_TOA"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA"),
    vlfr = ui.import && ui.import("vlfr", "table", {
      "id": "users/lmathew/Forest/TZA_VLFR"
    }) || ee.FeatureCollection("users/lmathew/Forest/TZA_VLFR"),
    wvlfr = ui.import && ui.import("wvlfr", "table", {
      "id": "users/lmathew/Forest/vlfr_wilaya"
    }) || ee.FeatureCollection("users/lmathew/Forest/vlfr_wilaya"),
    hvlfr = ui.import && ui.import("hvlfr", "table", {
      "id": "users/Kilimanjaro/VLFRs_Harvest_Data"
    }) || ee.FeatureCollection("users/Kilimanjaro/VLFRs_Harvest_Data"),
    wilaya = ui.import && ui.import("wilaya", "table", {
      "id": "users/lmathew/Forest/vlfr_wilaya"
    }) || ee.FeatureCollection("users/lmathew/Forest/vlfr_wilaya"),
    wma = ui.import && ui.import("wma", "table", {
      "id": "users/lmathew/TZA-WMA"
    }) || ee.FeatureCollection("users/lmathew/TZA-WMA"),
    cfma = ui.import && ui.import("cfma", "table", {
      "id": "users/lmathew/Seascape/CFMA-02-2018"
    }) || ee.FeatureCollection("users/lmathew/Seascape/CFMA-02-2018");
var AoI = vlfr.geometry().bounds();
var AoH = hvlfr;
var AoD = wilaya.geometry().bounds();
//Wilaya
var chagua_a = "Wilaya";
var	Kilwa = "Kilwa";
var	Rufiji = "Rufiji";
var	Nachingwea = "Nachingwea";
var	Nanyumbu = "Nanyumbu";
var	Ruangwa = "Ruangwa";
var	Tandahimba = "Tandahimba";
var	Namtumbo = "Namtumbo";
var	Tunduru = "Tunduru";
var	Newala = "Newala";
var	Masasi = "Masasi";
var	Mtwara = "Mtwara";
var	Liwale = "Liwale";
var	Lindi = "Lindi";
//Vijiji
var chagua_b = "Vijiji";
var	Likawage = "Likawage";
var	Liwiti = "Liwiti";
var	Nainokwe = "Nainokwe";
var	Namatewa = "Namatewa";
var	Kikole = "Kikole";
var	Kisangi = "Kisangi";
var	Migeregere = "Migeregere";
var	Ruhatwe = "Ruhatwe";
var	Mandawa = "Mandawa";
var	Mchakama = "Mchakama";
var	Mitole = "Mitole";
var	Ngea = "Ngea";
var	Nanjirinji_A = "Nanjirinji_A";
var	Nanjirinji_B = "Nanjirinji_B";
var	Gole = "Gole";
var	Kiangara = "Kiangara";
var	Kibutuka = "Kibutuka";
var	Kitogoro = "Kitogoro";
var	Legezamwendo = "Legezamwendo";
var	Litou = "Litou";
var	Mikunya = "Mikunya";
var	Mikuyu = "Mikuyu";
var	Mtawatawa = "Mtawatawa";
var	Nangano = "Nangano";
var	Ngongowele = "Ngongowele";
var	Ngunja = "Ngunja";
var	Mtungunyu = "Mtungunyu";
var	Ngau = "Ngau";
var	Nyamwage = "Nyamwage";
var	Tawi = "Tawi";
var	Machemba = "Machemba";
var	Mindu = "Mindu";
var	Namakambale = "Namakambale";
var	Sautimoja = "Sautimoja";
var	Songambele = "Songambele";
var	Misechela = "Misechela";
var	Nohoro = "Nohoro";
//Satellite Data
var chagua_c = "Satellite";
var S1 = "Sentinel 1";
var S2 = "Sentinel 2";
var L8 = "Landsat 8";
//Miaka
var chagua_d = "Years";
var y14 = "2014";
var y15 = "2015";
var y16 = "2016";
var y17 = "2017";
var y18 = "2018";
var y19 = "2019";
var y20 = "2020";
///////////////////////////////////////////////////////////////////////////
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
///////////////////////////////////////////////////////////////////////////
// Create an intro panel with labels.
var intro = ui.Panel([ ui.Label({ value: 'Temporal Visual Analysis',
    style: {fontSize: '15px', fontWeight: 'bold', color: '#003300',  textAlign: 'center',stretch: 'horizontal'}
  }),
  ui.Label(
    {
    value: '{ Work in Progess !!! }',
    style: {fontSize: '10px', fontWeight: 'bold', color: '#006600', textAlign: 'center',stretch: 'horizontal'}
    }
  )]);
panel.add(intro);
///////////////////////////////////////////////////////////////////////////
//Wilaya
var chagua_wilaya = ui.Select({ items: [chagua_a,Kilwa,Tunduru,Namtumbo,Rufiji,Liwale,Nachingwea,Ruangwa],
  value: chagua_a, style: { textAlign:'center', stretch:'horizontal', margin:'5px'}, });
//Vijiji
var chagua_kijiji = ui.Select({ items: [chagua_b,Likawage,Liwiti,Nainokwe,Nainokwe,Namatewa,Namatewa,Kikole,Kisangi,Migeregere,Ruhatwe,Mandawa,Mchakama,Mitole,Ngea,Nanjirinji_A,Nanjirinji_B,Gole,Gole,Kiangara,Kibutuka,Kibutuka,Kitogoro,Legezamwendo,Litou,Mikunya,Mikunya,Mikuyu,Mtawatawa,Nangano,Ngongowele,Ngongowele,Ngunja,Mtungunyu,Ngunja,Ngau,Nyamwage,Tawi,Machemba,Mindu,Namakambale,Sautimoja,Songambele,Misechela,Nohoro],
  value: chagua_b, style: {textAlign:'center', stretch:'horizontal', margin:'5px'}, });
//Satellite/Platform
var chagua_sat = ui.Select({ items: [chagua_c,S1,S2,L8],
  value: S2, style: {textAlign:'center', stretch:'horizontal', margin:'5px'}, }); //, onChange: redraw,
///////////////////////////////////////////////////////////////////////////
//Years
var chagua_mwanzo = ui.Select({ items: [chagua_d,y14,y15,y16,y17,y18,y19,y20],
  value: y16, style: {textAlign:'center', stretch:'horizontal', margin:'5px'},});
var chagua_mwisho = ui.Select({ items: [chagua_d,y14,y15,y16,y17,y18,y19,y20],
  value: y18, style: {textAlign:'center', stretch:'horizontal', margin:'5px'}, });
var chora_sasa = ui.Button({label: '==- Draw -==', style: { margin:'5px', stretch:'horizontal'}, onClick: bonyezo, });
//////////////////////////////////////////////////////////////////////////
panel.add(ui.Label('Districts:')).add(chagua_wilaya);
panel.add(ui.Label('Village Forest:')).add(chagua_kijiji);
panel.add(ui.Label('Satellite(Platform):')).add(chagua_sat);
panel.add(ui.Label('Select Start Year):')).add(chagua_mwanzo);
panel.add(ui.Label('Select End Year):')).add(chagua_mwisho);
panel.add(chora_sasa);
///////////////////////////////////////////////////////////////////////////
//Ruvuma Landscape - Visual Analysis
//var tza = wma.filter(ee.Filter.eq('Name', 'Nalika'));
var tzaa = wilaya.geometry().bounds(); 
// These are the input features:
var bands = ['B2', 'B3', 'B4', 'B8','QA60'];
///////////////////////////////////////////////////////////////////////////
//Graph Panel
var panel2016 = ui.Panel({ style: { width: '300px',position: 'bottom-left', padding: '10px 10px' } });
var panel2018 = ui.Panel({ style: { width: '300px',position: 'bottom-right', padding: '10px 10px' } });
///////////////////////////////////////////////////////////////////////////
var tupu = ee.Image().byte();
var wVis = [{palette: '000000'},{palette: '000000'}];
var choraA = tupu.paint({featureCollection: wilaya, color: 1, width: 2});
var WilayaA = [choraA,choraA];
var wmaVis = [{palette: 'FF0000'},{palette: 'FF0000'}];
var choraB = tupu.paint({featureCollection: wma, color: 1, width: 1});
var wmaA = [choraB,choraB];
var vVis = [{palette: '00FF00'},{palette: '00FF00'}];
var choraC = tupu.paint({featureCollection: vlfr, color: 1, width: 1});
var vlfrA = [choraC,choraC];
var cVis = [{palette: '0000FF'},{palette: '0000FF'}];
var choraD = tupu.paint({featureCollection: cfma, color: 1, width: 1});
var cfmaA = [choraD,choraD];
var WName = ['District','District'];
////////////////////////////////////////////////////////////////////////////
//Sentinel 2 - Cloud Removal
function maskS2clouds(image)
{
  var qa = image.select('QA60');
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
//Landsta 8 - Cloud Removal
var LC8_BANDS = ['B2',   'B3',    'B4',  'B5',  'B6',    'B7',    'B10'];
var STD_NAMES = ['blue', 'green', 'red', 'nir', 'swir1', 'swir2', 'temp'];
var cloudScore = function(img)
{
  var rescale = function(img, exp, thresholds)
  {
    return img.expression(exp, {img: img}).subtract(thresholds[0]).divide(thresholds[1] - thresholds[0]);
  };
  var score = ee.Image(1.0);
  score = score.min(rescale(img, 'img.blue', [0.1, 0.3]));
  score = score.min(rescale(img, 'img.red + img.green + img.blue', [0.2, 0.8]));
  score = score.min(rescale(img, 'img.nir + img.swir1 + img.swir2', [0.3, 0.8]));
  score = score.min(rescale(img, 'img.temp', [300, 290]));
  var ndsi = img.normalizedDifference(['green', 'swir1']);
  return score.min(rescale(ndsi, 'img', [0.8, 0.6]));
};
////////////////////////////////////////////////////////////////////////////
var rgbS2a = [{min: 0, max: 0.3000, bands: ['B4','B3','B2']},{min: 0.0, max: 0.3000, bands: ['B4','B3','B2']}];
var rgbS2b = {min: 0, max: 0.3000, bands: ['B4','B3','B2']};
var rgbL8 = {'bands': ['B4', 'B3', 'B2'], 'max': 0.4, 'gamma': 1.6 };
var radVis = {min: -25, max: 5};
////////////////////////////////////////////////////////////////////////////
var mwaka ='';
var eneo = '';
var s1display = '';
var s2display = '';
var l8display = '';
////////////////////////////////////////////////////////////////////////////
var s1Jibu = ee.Image().byte();
function S1changamsha(mwaka,eneo,s1display)
{
  var mwaka_Jan = mwaka + '-01-01';
  var mwaka_Dec = mwaka + '-12-31';
  var tar = ee.Filter.date(mwaka_Jan,mwaka_Dec);
  ///////////////////////////////////////////////////////////////////////////
  var s1A = s1.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
            .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
            .filter(ee.Filter.eq('instrumentMode', 'IW')).filter(tar).filterBounds(eneo)
            .filter(ee.Filter.eq('resolution_meters', 10));
  var s1B = s1.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
            .filter(ee.Filter.eq('instrumentMode', 'IW')).select('VV').filter(tar).filterBounds(eneo)
            .filter(ee.Filter.eq('resolution_meters', 10));
  var s1C = s1.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
            .filter(ee.Filter.eq('instrumentMode', 'IW')).select('VH').filter(tar).filterBounds(eneo)
            .filter(ee.Filter.eq('resolution_meters', 10));
  /////////////////////////////////////////////////////////////////////////
  var vhAsc = s1A.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));//.filter(tar).filterBounds(eneo);
  var vhDes = s1A.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));//.filter(tar).filterBounds(eneo);
  //////////////////////////////////////////////////////////////////////////
  if(s1display === 'A')
  {
    var s1_AD = ee.Image.cat([vhAsc.select('VH').mean(),ee.ImageCollection(vhAsc
                .select('VV').merge(vhDes.select('VV'))).mean(),vhDes.select('VH').mean()]).focal_median();
    //var s1_AD_p90 = vhAsc.reduce(ee.Reducer.percentile([90]));
    //var s1_AD_p10 = vhAsc.reduce(ee.Reducer.percentile([10]));
    //var s1_AD_pdiff = s1_AD_p90.subtract(s1_AD_p10);
    s1Jibu = s1_AD;//s1_AD_pdiff;
  }
  if(s1display === 'B')
  {
    s1Jibu = s1A;
  }
  ////////////////////////////////////////////////////////////////////////
  return s1Jibu;
}
//================== 
var s2Jibu = ee.Image().byte();
function S2changamsha(mwaka,eneo,s2display)
{
  var mwaka_Jan = mwaka + '-01-01';
  var mwaka_Dec = mwaka + '-12-31';
  ///////////////////////////////////////////////////////////////////////////
  var s2A = ee.ImageCollection('COPERNICUS/S2').filterDate(mwaka_Jan,mwaka_Dec).filterBounds(eneo).select('B2','B3','B4','B8','QA60');
  if(s2display === 'A')
  {
    s2Jibu = s2A.filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)).map(maskS2clouds).median();
  }
  if(s2display === 'B')
  {
    s2Jibu = s2A;
  }
  ////////////////////////////////////////////////////////////////////////////
  return s2Jibu;
}
//==================
var l8Jibu = ee.Image().byte();
function L8changamsha(mwaka,eneo,l8display)
{
  var mwaka_Jan = mwaka + '-01-01';
  var mwaka_Dec = mwaka + '-12-31';
  ///////////////////////////////////////////////////////////////////////////
  var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA').filterDate(mwaka_Jan,mwaka_Dec).filterBounds(eneo);
  //////////////////////////////////////////////////////////////////////////
  var l8A = l8.map(function(img) {
        var score = cloudScore(img.select(LC8_BANDS, STD_NAMES));
        score = ee.Image(1).subtract(score).select([0], ['cloudscore']);
        return img.addBands(score);     });
  if(l8display === 'A')
  {
    l8Jibu = l8A.qualityMosaic('cloudscore');
  }
  if(l8display === 'B')
  {
    l8Jibu = l8.select('B2','B3','B4','B5');
  }
  ////////////////////////////////////////////////////////////////////////////
  return l8Jibu;
  //////////////////////////////////////////////////////////////////////////
}
//////////////////////////////////////////////////////////////////////////
var mwakaA = chagua_mwanzo.getValue();
var mwakaB = chagua_mwisho.getValue();
var picha_a = chagua_sat.getValue();
var cBef = S2changamsha(mwakaA,AoD,'A');
var cAft = S2changamsha(mwakaB,AoD,'A');
var IMAGES = [cBef,cAft];
var NAMES_I = ['RGB-432 -> ' + mwakaA,'RGB-432 -> ' + mwakaB];
///////////////////////////////////////////////////////////////////////////
var headA = mwakaA + '-' + chagua_sat.getValue();
var headB = mwakaB + '-' + chagua_sat.getValue();
var NAMES = [headA,headB];
var lebelA = ui.Label(headA, {textAlign: 'center', position: 'bottom-right', fontWeight: 'bold', fontSize: '18px'});
var lebelB = ui.Label(headB, {textAlign: 'center', position: 'bottom-left', fontWeight: 'bold', fontSize: '18px'});
var headAB = [lebelA,lebelB];
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
// Create a map for each visualization option.
var maps = [];
NAMES.forEach(function(name, index) 
{
  var map = ui.Map();
  map.add(headAB[index]);
  map.addLayer(IMAGES[index], rgbS2a[index], NAMES_I[index],false);
  map.addLayer(WilayaA[index], wVis[index], 'Districts');
  map.addLayer(wmaA[index], wmaVis[index], 'WMAs');
  map.addLayer(vlfrA[index], vVis[index], 'VLFRs');
  map.addLayer(cfmaA[index], cVis[index], 'CFMAs');
  map.setControlVisibility(false);
  maps.push(map);
});
//===================
var linker = ui.Map.Linker(maps);
 // Enable zooming on the top-left map.
maps[0].setControlVisibility({zoomControl: true});
maps[0].setControlVisibility({layers: true});
// Show the scale (e.g. '500m') on the bottom-right map.
maps[1].setControlVisibility({scaleControl: true});
maps[1].setControlVisibility({layers: true});
//===========================
//var geom  = ee.Geometry.Point(coords.lon, coords.lat);
//2016
maps[0].onClick(function(coords)
      { 
        panel2016.clear();
        panel2018.clear();
        ////////////////////////////////////////
        picha_a = chagua_sat.getValue();
        mwakaA = chagua_mwanzo.getValue();
        mwakaB = chagua_mwisho.getValue();
        ////////////////////////////////////////
        var tupuA = ee.Image().byte();
        var eneoJ  = ee.Geometry.Point(coords.lon, coords.lat).buffer(10);
        if(picha_a === 'Sentinel 1') { var cBefG = S1changamsha(mwakaA,eneoJ,'B'); var cAftG = S1changamsha(mwakaB,eneoJ,'B'); }
        if(picha_a === 'Sentinel 2') { var cBefG = S2changamsha(mwakaA,eneoJ,'B');  var cAftG = S2changamsha(mwakaB,eneoJ,'B'); }
        if(picha_a === 'Landsat 8') { var cBefG = L8changamsha(mwakaA,eneoJ,'B'); var cAftG = L8changamsha(mwakaB,eneoJ,'B'); }
        ////////////////////////////////////////
        var chart2016 = ui.Chart.image.series(cBefG, eneoJ, ee.Reducer.mean(), 10);
        var FooHai_A = mwakaA + ' - ' + picha_a;
        var kichwa2016 = FooHai_A + '\nLongitude: ' + coords.lon + '\nLatitude: ' +  coords.lat;
        chart2016.setOptions({title: kichwa2016 });
        panel2016.add(chart2016);
        var chart2018 = ui.Chart.image.series(cAftG, eneoJ, ee.Reducer.mean(), 10);
        var FooHai_B = mwakaB + ' - ' + picha_a;
        var kichwa2018  = FooHai_B + '\nLongitude: ' + coords.lon + '\nLatitude: ' +  coords.lat;
        chart2018.setOptions({title: kichwa2018  });
        panel2018.add(chart2018);
        var jira = tupuA.paint({featureCollection: eneoJ, color: 1, width: 5 });
        maps[0].addLayer(jira ,{palette: 'FFFF00'}, "!");
        maps[1].addLayer(jira ,{palette: 'FF00FF'}, "!");
      });
maps[0].add(panel2016);
///
//2018
maps[1].onClick(function(coords)
      {
        panel2016.clear();
        panel2018.clear();
        ////////////////////////////////////////
        picha_a = chagua_sat.getValue();
        mwakaA = chagua_mwanzo.getValue();
        mwakaB = chagua_mwisho.getValue();
        ////////////////////////////////////////
        var tupuA = ee.Image().byte();
        var eneoJ  = ee.Geometry.Point(coords.lon, coords.lat).buffer(10);
        if(picha_a === 'Sentinel 1') { var cBefG = S1changamsha(mwakaA,eneoJ,'B'); var cAftG = S1changamsha(mwakaB,eneoJ,'B'); }
        if(picha_a === 'Sentinel 2') { var cBefG = S2changamsha(mwakaA,eneoJ,'B'); var cAftG = S2changamsha(mwakaB,eneoJ,'B'); }
        if(picha_a === 'Landsat 8')  { var cBefG = L8changamsha(mwakaA,eneoJ,'B'); var cAftG = L8changamsha(mwakaB,eneoJ,'B'); }
        ////////////////////////////////////////
        var chart2018 = ui.Chart.image.series(cAftG, eneoJ, ee.Reducer.mean(), 10);
        var FooHai_B = mwakaB + ' - ' + picha_a;
        var kichwa2018  = FooHai_B + '\nLongitude: ' + coords.lon + '\nLatitude: ' +  coords.lat;
        chart2018.setOptions({title: kichwa2018 });
        panel2018.add(chart2018);
        var chart2016 = ui.Chart.image.series(cBefG, eneoJ, ee.Reducer.mean(), 10);
        var FooHai_A = mwakaA + ' - ' + picha_a;
        var kichwa2016 = FooHai_A + '\nLongitude: ' + coords.lon + '\nLatitude: ' +  coords.lat;
        chart2016.setOptions({title: kichwa2016 });
        panel2016.add(chart2016);
        var jira = tupuA.paint({featureCollection: eneoJ, color: 1, width: 10 });
        maps[0].addLayer(jira ,{palette: 'FF00FF'}, "!");
        maps[1].addLayer(jira ,{palette: 'FFFF00'}, "!");
      });
 maps[1].add(panel2018);
//============================
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
function bonyezo()
{
  maps[0].layers().reset();
  maps[1].layers().reset();
  panel2016.clear();
  panel2018.clear();
  ////////////////////////////////////////
  picha_a = chagua_sat.getValue();
  mwakaA = chagua_mwanzo.getValue();
  mwakaB = chagua_mwisho.getValue();
  ////////////////////////////////////////
  var Wilaya_a = chagua_wilaya.getValue();
  var Kijiji_a = chagua_kijiji.getValue();
  picha_a = chagua_sat.getValue();
  Map.centerObject(AoD);
  function getMapW(Wilaya_a) { return wvlfr.filter(ee.Filter.eq('Name', Wilaya_a)); }
  function getMap(Wilaya_a) { return vlfr.filter(ee.Filter.eq('District', Wilaya_a)); }
  function getMapV(Kijiji_a) { return vlfr.filter(ee.Filter.eq('Village', Kijiji_a)); }
  if (Wilaya_a != chagua_a && Kijiji_a === chagua_b)
  {
    var Wilaya_b = getMap(Wilaya_a);
    var eneoW = Wilaya_b.geometry().bounds();
    maps[0].centerObject(eneoW);
    if(picha_a === 'Sentinel 1') { var cBef = S1changamsha(mwakaA,eneoW,'A'); var cAft = S1changamsha(mwakaB,eneoW,'A');
                                   var rgbVis = {min: [-25, -20, -25], max: [0, 10, 0]}; var FooHai = 'RGB-VHA->'; }
    if(picha_a === 'Sentinel 2') { var cBef = S2changamsha(mwakaA,eneoW,'A');  var cAft = S2changamsha(mwakaB,eneoW,'A');
                                   var rgbVis = {min: 0, max: 0.3000, bands: ['B4','B3','B2']}; var FooHai = 'RGB-432->'; }
    if(picha_a === 'Landsat 8') { var cBef = L8changamsha(mwakaA,eneoW,'A'); var cAft = L8changamsha(mwakaB,eneoW,'A'); 
                                  var rgbVis = {'bands': ['B4', 'B3', 'B2'], 'max': 0.4, 'gamma': 1.6 };  var FooHai = 'RGB-432->'; }
    var FooHai_A = mwakaA + ' - ' + picha_a;
    var FooHai_B = mwakaB + ' - ' + picha_a;
    lebelA.setValue(FooHai_A);
    maps[0].addLayer(cBef, rgbVis, FooHai_B, true);
    lebelB.setValue(FooHai_B);
    maps[1].addLayer(cAft, rgbVis, FooHai_B, true);
    var tupuW = ee.Image().byte();
    var choraW = tupuW.paint({featureCollection: Wilaya_b, color: 1, width: 2 });
    maps[0].addLayer(choraW,{palette: '000000'}, Wilaya_a);
    maps[1].addLayer(choraW,{palette: '000000'}, Wilaya_a);
    maps[0].centerObject(eneoW);
  }
  else if (Kijiji_a != chagua_b && Wilaya_a === chagua_a )
  {
    var Kijiji_b = getMapV(Kijiji_a);
    var eneoK = Kijiji_b.geometry().bounds();
    if(picha_a === 'Sentinel 1') { var cBef = S1changamsha(mwakaA,eneoK,'A'); var cAft = S1changamsha(mwakaB,eneoK,'A');
                                   var rgbVis =  {min: [-25, -20, -25], max: [0, 10, 0]}; var FooHai = 'RGB-VHA->'; }
    if(picha_a === 'Sentinel 2') { var cBef = S2changamsha(mwakaA,eneoK,'A');  var cAft = S2changamsha(mwakaB,eneoK,'A');
                                   var rgbVis = {min: 0, max: 0.3000, bands: ['B4','B3','B2']}; var FooHai = 'RGB-432->'; }
    if(picha_a === 'Landsat 8') { var cBef = L8changamsha(mwakaA,eneoK,'A'); var cAft = L8changamsha(mwakaB,eneoK,'A'); 
                                  var rgbVis = {'bands': ['B4', 'B3', 'B2'], 'max': 0.4, 'gamma': 1.6 }; var FooHai = 'RGB-432->'; }
    maps[0].centerObject(Kijiji_b);
    var FooHai_A = mwakaA + ' - ' + picha_a;
    var FooHai_B = mwakaB + ' - ' + picha_a;
    lebelA.setValue(FooHai_A);
    maps[0].addLayer(cBef, rgbVis, mwakaA, true);
    lebelB.setValue(FooHai_B);
    maps[1].addLayer(cAft, rgbVis, mwakaB, true);
    var tupu = ee.Image().byte();
    var chora = tupu.paint({featureCollection: Kijiji_b, color: 1, width: 3 });
    maps[0].addLayer(chora,{palette: '00FF00'}, Kijiji_a);
    maps[1].addLayer(chora,{palette: '00FF00'}, Kijiji_a);
    maps[0].addLayer(AoH,{palette: '0000FF'}, 'Harvest Points',false);
    maps[1].addLayer(AoH,{palette: '0000FF'}, 'Harvest Points',false);
    maps[0].centerObject(Kijiji_b);
  } 
  else
  {
    Map.centerObject(AoD);
    if(picha_a === 'Sentinel 1') { var cBef = S1changamsha(mwakaA,AoD,'A'); var cAft = S1changamsha(mwakaB,AoD,'A');
                                   var rgbVis =  {min: [-25, -20, -25], max: [0, 10, 0]}; var FooHai = 'RGB-VHA->'; }
    if(picha_a === 'Sentinel 2') { var cBef = S2changamsha(mwakaA,AoD,'A');  var cAft = S2changamsha(mwakaB,AoD,'A');
                                   var rgbVis = {min: 0, max: 0.3000, bands: ['B4','B3','B2']}; var FooHai = 'RGB-432->'; }
    if(picha_a === 'Landsat 8') { var cBef = L8changamsha(mwakaA,AoD,'A'); var cAft = L8changamsha(mwakaB,AoD,'A'); 
                                  var rgbVis = {'bands': ['B4', 'B3', 'B2'], 'max': 0.4, 'gamma': 1.6 }; var FooHai = 'RGB-432->'; }
    var FooHai_A = mwakaA + ' - ' + picha_a;
    lebelA.setValue(FooHai_A);
    maps[0].addLayer(cBef, rgbVis, mwakaA, false);
    maps[0].addLayer(choraA, {palette: '000000'}, 'Districts');
    maps[0].addLayer(choraB, {palette: 'FF0000'}, 'WMAs');
    maps[0].addLayer(choraC, {palette: '00FF00'}, 'VLFRs');
    maps[0].addLayer(choraD, {palette: '0000FF'}, 'CFMAs');
    //===
    var FooHai_B = mwakaB + ' - ' + picha_a;
    lebelB.setValue(FooHai_B);
    maps[1].addLayer(cAft, rgbVis, mwakaB, false);
    maps[1].addLayer(choraA, {palette: '000000'}, 'Districts');
    maps[1].addLayer(choraB, {palette: 'FF0000'}, 'WMAs');
    maps[1].addLayer(choraC, {palette: '00FF00'}, 'VLFRs');
    maps[1].addLayer(choraD, {palette: '0000FF'}, 'CFMAs');
    Map.centerObject(AoD);
  }
}
///////////////////////////////////////////////////////////////////////////
// Create a title.
var title = ui.Label('CBOs (WMAs,VLFRs, CFMAs & WUAs)', {
stretch: 'horizontal', textAlign: 'center', fontWeight: 'bold', fontSize: '30px' });
// Create a grid of maps.
var mapGrid = ui.Panel(
[
panel,
ui.Panel([maps[0]], null, {stretch: 'both'}),
ui.Panel([maps[1]], null, {stretch: 'both'})
],
ui.Panel.Layout.Flow('horizontal'), {width: '100%', stretch: 'both'}
);
// Add the maps and title to the ui.root.
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
maps[0].centerObject(AoD);
// Add the panel to the ui.root.
//ui.root.insert(0, panel);
//ui.root.insert(0, panelg);