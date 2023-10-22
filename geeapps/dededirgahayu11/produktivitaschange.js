var S2_TOA = ui.import && ui.import("S2_TOA", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    S2_SR = ui.import && ui.import("S2_SR", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    Indo10_Prv = ui.import && ui.import("Indo10_Prv", "table", {
      "id": "users/salmanddd14/shp/Indo10_Pv"
    }) || ee.FeatureCollection("users/salmanddd14/shp/Indo10_Pv"),
    Indo10_Kab = ui.import && ui.import("Indo10_Kab", "table", {
      "id": "users/salmanddd14/shp/Indo10_Kb"
    }) || ee.FeatureCollection("users/salmanddd14/shp/Indo10_Kb"),
    Indo10_Kec = ui.import && ui.import("Indo10_Kec", "table", {
      "id": "users/salmanddd14/shp/Indo10_Kc"
    }) || ee.FeatureCollection("users/salmanddd14/shp/Indo10_Kc"),
    LBS19_10m_DIY = ui.import && ui.import("LBS19_10m_DIY", "image", {
      "id": "users/sulaiman/Pulau_Jawa_290420/DIY_lbs10m_lzw"
    }) || ee.Image("users/sulaiman/Pulau_Jawa_290420/DIY_lbs10m_lzw"),
    LBS19_10m_DKI = ui.import && ui.import("LBS19_10m_DKI", "image", {
      "id": "users/sulaiman/Pulau_Jawa_290420/DKI_lbs10m_lzw"
    }) || ee.Image("users/sulaiman/Pulau_Jawa_290420/DKI_lbs10m_lzw"),
    LBS19_10m_Jabar = ui.import && ui.import("LBS19_10m_Jabar", "image", {
      "id": "users/sulaiman/Pulau_Jawa_290420/Jabar_lbs10m_lzw"
    }) || ee.Image("users/sulaiman/Pulau_Jawa_290420/Jabar_lbs10m_lzw"),
    LBS19_10m_Jateng = ui.import && ui.import("LBS19_10m_Jateng", "image", {
      "id": "users/sulaiman/Pulau_Jawa_290420/Jateng_lbs10m_lzw"
    }) || ee.Image("users/sulaiman/Pulau_Jawa_290420/Jateng_lbs10m_lzw"),
    LBS19_10m_Banten = ui.import && ui.import("LBS19_10m_Banten", "image", {
      "id": "users/sulaiman/Pulau_Jawa_290420/Banten_lbs10m_lzw"
    }) || ee.Image("users/sulaiman/Pulau_Jawa_290420/Banten_lbs10m_lzw"),
    LBS19_10m_Jatim = ui.import && ui.import("LBS19_10m_Jatim", "image", {
      "id": "users/sulaiman/Pulau_Jawa_290420/Jatim_lbs10m_lzw"
    }) || ee.Image("users/sulaiman/Pulau_Jawa_290420/Jatim_lbs10m_lzw"),
    LBS19_10m_Bali = ui.import && ui.import("LBS19_10m_Bali", "image", {
      "id": "users/sulaiman_ubay/LBS_kls10m/Bali_lbs10m_lzw"
    }) || ee.Image("users/sulaiman_ubay/LBS_kls10m/Bali_lbs10m_lzw"),
    MOD13Q = ui.import && ui.import("MOD13Q", "imageCollection", {
      "id": "MODIS/006/MOD13Q1"
    }) || ee.ImageCollection("MODIS/006/MOD13Q1"),
    EVIS2_Okt2018_2020Jun_P1 = ui.import && ui.import("EVIS2_Okt2018_2020Jun_P1", "image", {
      "id": "users/dededirgahayu11/img/EVIS2_Okt2018_2020Jun_p1"
    }) || ee.Image("users/dededirgahayu11/img/EVIS2_Okt2018_2020Jun_p1"),
    EVIMax_MT1_2019_20 = ui.import && ui.import("EVIMax_MT1_2019_20", "image", {
      "id": "users/dededirgahayu11/img/EVIMax_MT1_2019dan20"
    }) || ee.Image("users/dededirgahayu11/img/EVIMax_MT1_2019dan20"),
    EVIMax_MT2_2019_20 = ui.import && ui.import("EVIMax_MT2_2019_20", "image", {
      "id": "users/dededirgahayu11/img/EVIMax_MT2_2019dan20"
    }) || ee.Image("users/dededirgahayu11/img/EVIMax_MT2_2019dan20"),
    PosMax_MT1_2019_20 = ui.import && ui.import("PosMax_MT1_2019_20", "image", {
      "id": "users/dededirgahayu11/img/PosMax_MT1_2019dan20"
    }) || ee.Image("users/dededirgahayu11/img/PosMax_MT1_2019dan20"),
    PosMax_MT2_2019_20 = ui.import && ui.import("PosMax_MT2_2019_20", "image", {
      "id": "users/dededirgahayu11/img/PosMax_MT2_2019dan20"
    }) || ee.Image("users/dededirgahayu11/img/PosMax_MT2_2019dan20");
// Deteksi Awal Tanam,Panen Padi & Estimasi Produktivias menggunakan Sentinel-2
// Input : EVI S2 TS 1Okt208-2020Juni_p1, EVI_Max & PosMax MT I & II Periode EVI TS
// Created by Dr Dede Dirgahayu,.. Tgl 25 Juni 2020
// Modifikasi hg Tgl 10 Juli 2020
var EVITS_S2_Jawa = KonvDat(EVIS2_Okt2018_2020Jun_P1,125,128,4,'n'); 
print('Info Data EVI Multitemporal : ',EVITS_S2_Jawa);
var Nam_EVI_Kls = [];
 Nam_EVI_Kls[0]= '(1) 0.40-0.45' ; Nam_EVI_Kls[1]= '(2) 0.45-0.50' ; Nam_EVI_Kls[2]= '(3) 0.50-0.55' ;
 Nam_EVI_Kls[3]= '(4) 0.55-0.0.60' ; Nam_EVI_Kls[4]= '(5) 0.60-0.65' ; Nam_EVI_Kls[5]= '(6) 0.65-0.70' ;
 Nam_EVI_Kls[6]= '(7) > 0.70' ;Nam_EVI_Kls[7]= '(8) 0.35-0.40' ; Nam_EVI_Kls[8]= '(9) 0.30-0.35' ;
 Nam_EVI_Kls[9]= '(10) 0.10-0.30' ; Nam_EVI_Kls[10]= '(11) < 0.10' ;
var Bts_SHSri = ee.Geometry.Rectangle([107.596,-6.275, 107.663,-6.372]),
 Bts_Subang = ee.Geometry.Rectangle([107.5,-6.17, 107.96,-6.82]),
 Bts_SumSel = ee.Geometry.Rectangle([102.0877, -4.9331, 106.1307, -1.6101]),
 Bts_Jawa = ee.Geometry.Rectangle([105, -5.8, 116, -9])
 ;
var LBS_JwBl19 = ee.ImageCollection([LBS19_10m_Banten,LBS19_10m_DKI,LBS19_10m_Jabar,LBS19_10m_Jateng,
    LBS19_10m_DIY,LBS19_10m_Jatim,LBS19_10m_Bali]).sum().clip(Bts_Jawa);
var NamKls = ['Mundur','Tetap','Maju'],dEVIMax= ['Menurun','Tetap','Meningkat'],
PalBeda=['ff0000','00ff00','0000ff'],PalBeda_Prv=['ff8800','0000ff','00ff00'];
var S1=[],S2=[],L8=[],EVI_S2 = [],LstMOD13,Pd,Thn1,Thn2,Thn3,MOD13; 
var Bnd_Mod13 = ["sur_refl_b03","sur_refl_b01", "sur_refl_b02", "sur_refl_b07",
'NDVI','EVI',"QA",'DoY'];
var Bnd_Mod13_Ren = ['blue','red','nir','swir2','NDVI','EVI',"QA",'DoY'];
MOD13 = MOD13Q.filterDate('2018-01-01','2020-06-20').map(ReProjGeo)
.map(MskAwn_Mod13).select(Bnd_Mod13,Bnd_Mod13_Ren).map(AddIdx_Mod13);
print('List MOD13',MOD13);
var palEVIMx_Kls =['00ffff','00cccc','ffff00','cccc00','80ff40','00df00', 
                   '008000','cc00cc','ff88ff','ff8800','ff0000'];
var VisEVIMx_Kls = {min:1,max:11,palette:palEVIMx_Kls};
function VisEVIMax(Bnd) { 
  var VisEVIMx_Kls_Bnd = {bands :Bnd ,min:1,max:11,palette:palEVIMx_Kls};
return VisEVIMx_Kls_Bnd; 
}
// var Periode Waktu data Time Series (TS)
Pd = 15; Thn1=2018 ; Thn2=2019; Thn3=2020;
var Bln18 = TglPrd(Thn1,Pd,2),i,j,k, Bln19 = TglPrd(Thn2,Pd,2),Data,
    Bln20 = TglPrd(Thn3,Pd,2),i,j,k;
//print ("Periode " + Pd + " harian Th " + (Thn1),Bln18);
//print ("Periode " + Pd + " harian Th " + (Thn2),Bln19);
//print ("Periode " + Pd + " harian Th " + (Thn3),Bln20);
Map.centerObject(Bts_Jawa,10);
// Par Visualisasi/Display
var RGB_NCC = [['B6','B5','B4'], ['B11','B8','B4']];
var VisNCC_S2 = {bands:RGB_NCC[1],min:[0,0.01,0.03], 
    max : [0.36,0.42,0.15] };
var VisNCC_S2_2St = {bands:RGB_NCC[1],min:[0.04,0.06,0.05], 
    max : [0.28,0.32,0.15] };
// Parameter Visual EVI Multitemporal : bulanan
var VisIdxBulan1 = VisBand(["EVI_2019_05","EVI_2019_03","EVI_2019_01"]
    ,[0.12,0.21,0.04],[0.67,0.72,0.51],0) ,
  VisIdxBulan2 = VisBand(["EVI_2019_08","EVI_2019_06","EVI_2019_04"]
    ,[-0.18,0.18,0.13],[0.56,0.65,0.64],0) , 
  VisIdxBulan3 = VisBand(["EVI_2019_12","EVI_2019_10","EVI_2019_07"]
    ,[-0.03,0.06,0.21],[0.66,0.53,0.63],0);
// Parameter Visual EVI Multitemporal : 15 harian
var  VisIdxP15_1 = VisBand(["EVI_2019_08","EVI_2019_06","EVI_2019_02"]
    ,[0.12,0.21,0.04],[0.67,0.72,0.51],0),
  VisIdxP15_2 = VisBand(["EVI_2019_16","EVI_2019_12","EVI_2019_10"]
    ,[-0.18,0.18,0.13],[0.56,0.65,0.64],0),  
  VisIdxP15_3 = VisBand(["EVI_2019_24","EVI_2019_20","EVI_2019_14"]
    ,[-0.03,0.06,0.21],[0.66,0.53,0.63],0);      
// Visual Hasil Anlisis Statitik Multitemporal (METRIC)
var  VisStkEVI_S2 = VisBand(['EVI_Mean','EVI_Max','EVI_Min'],[0.025,0.043,-0.067],[0.618,0.931,0.395]),
  VisStkEVI_S2_2St = VisBand(['EVI_Mean','EVI_Max','EVI_Min'],[0.187,0.043,-0.067],[0.565,0.931,0.395])    
    ;
var VisAwlTnm = {min:1,max:12,palette: ['0000ff','00ffff','ff00ff','00ff00','ffff00','ff0000']};
// Cek Ketersedian Data S2_SR sblm Des 2018
/*
var S2_Okt_Nov18 = S2_SR.filterDate('2018-10-01','2018-10-01')
.filterBounds(Bts_Subang).select('B8');
print('List S2 < Des 2018',ListImgId(S2_Okt_Nov18)); //S2A gk ada !, pake S2 TOA
*/
var S2_Apr_Jun20 = S2_SR.filterDate('2020-04-01','2020-06-24')
.filterBounds(Bts_Subang).select('SCL');
print('List S2 Apr-Jun 2020',ListImgId(S2_Apr_Jun20,'id'));
var NamBnd, EVI_S2 = [], PL_S2 = [],EVI,SCL,EVIS2_2018 = [],EVIS2_2020Jun= []
;
var ImgSmooth = EVITS_S2_Jawa; 
// Eliminasi awan & smoothing data TS
//var ImgSmooth = GantiAwan_Img(EVI_S2,-1,-1); print('Smoothing Image',ImgSmooth);
// OKTOBER MARET
// ------- Untuk Okt18-Mar19 & Okt19-Mar20 ---------
var nama, Bfr= [],Aft= [],p1,p2, AT_Aft,AT_Bfr,be_af,EVIMax_Be_Af,IVMx_Th, 
  MaxAT,TglAwlDt,EVIMaxI_Be_Af,EVIMax_Kls;
 be_af = PosMax_MT1_2019_20; IVMx_Th = 0.375; MaxAT = 12; TglAwlDt = '2018-10-08';
 EVIMaxI_Be_Af = KonvDat(EVIMax_MT1_2019_20,125,128,4,'n');
EVIMax_Kls= ee.Image.cat(Reklas(EVIMaxI_Be_Af,"EVI_Max_MT1_2019",'EVIMaxMT1_2019_Kls'),
Reklas(EVIMaxI_Be_Af,"EVI_Max_MT1_2020",'EVIMaxMT1_2020_Kls'));
 print ('EVI_Max Klas & PosMax',EVIMax_Kls,be_af);
AT_Bfr = DetAwlTnm(be_af,'before',EVIMaxI_Be_Af,"EVI_Max_MT1_2019",IVMx_Th,Pd,MaxAT,TglAwlDt); 
AT_Aft = DetAwlTnm(be_af,'after',EVIMaxI_Be_Af,"EVI_Max_MT1_2020",IVMx_Th,Pd,MaxAT,TglAwlDt); 
/*
var Bfr = [],p1,p2; //before covid-19
var Bnd = ee.List(ImgSmooth.bandNames().getInfo()); p1=0; p2= 11;
for(i=p1; i<=p2; i++) {
  nama = Bnd.get(i).getInfo();
  Bfr[i-p1]= ImgSmooth.select(nama);
}
Bfr = ee.Image.cat(Bfr);
var StkBfr = StkTS_Img(Bfr,-1,-1,'EVI'), 
AT_Bfr = StkBfr.select('Pos_Max').subtract(60/Pd).rename('Tanam I Okt-Mar 2019') ; // Awal tanam bfr
print("Anlisis Metric Tanam I 2018-2019",StkBfr); 
// ------- Untuk Okt19-Mar20 ---------
var Aft = []; //after covid-19
p1= 24 ; p2=35 ;
for(i=p1; i<=p2; i++) {
  nama = Bnd.get(i).getInfo();
  Aft[i-p1]= ImgSmooth.select(nama);
}
Aft = ee.Image.cat(Aft);
*/
/*
var StkAft = StkTS_Img(Aft,-1,-1,'EVI'),
AT_Aft = StkAft.select('Pos_Max').subtract(60/Pd).rename('Tanam I Okt-Mar 2020') ;
print("Anlisis Metric Tanam I 2018-2019",StkAft);
*/
// var be_af = StkBfr.select("Pos_Max").rename("before").addBands(StkAft.select("Pos_Max").rename("after"));
//print('Stack Before & After',be_af);
/*
var EVIMax_be_af = StkBfr.select("EVI_Max").multiply(125).add(128).toByte().rename("EVI_Max_MT1_2019")
    .addBands(StkAft.select("EVI_Max").multiply(125).add(128).toByte().rename("EVI_Max_MT1_2020"));
// Simpan ke Asset
Export.image.toAsset({
  image: be_af.mask(LBS_JwBl19),
  description: "PosMax_MT1_2019dan20",
  assetId: "PosMax_MT1_2019dan20",
  scale: 10,
  maxPixels: 1e13,
  region: Bts_Jawa,
 });
Export.image.toAsset({
  image:EVIMax_be_af.mask(LBS_JwBl19),
  description: "EVIMax_MT1_2019dan20",
  assetId: "EVIMax_MT1_2019dan20",
  scale: 10,
  maxPixels: 1e13,
  region: Bts_Jawa,
 });
*/
// Analisis Perubahan 
var ImgChange = OvrMat(be_af.select('before'),be_af.select('after'),12);
var geser = be_af.expression(
  'be < af  ? 1 :' +   // "mundur/Lambat" 
  'be > af  ? 3 :' +   // "maju"
  'be == af ? 2 : 4' ,  // "tetap" : "lainnya"
  {
    be : be_af.select('before'),
    af : be_af.select('after')
  }).rename('Pergeseran').focal_mode(); // Filter Rank/Mayority
var ChgEVIMax_Kls = EVIMax_Kls.expression(
  'be > af && be <= 7   ? 1 :' +   // "menurun" 
  'be < af && be <= 7  ? 3 :' +   // "meningkat"
  'be == af ? 2 : 4' ,  // "tetap" : "lainnya"
  {
    be : EVIMax_Kls.select('EVIMaxMT1_2019_Kls'),
    af : EVIMax_Kls.select('EVIMaxMT1_2020_Kls')
  }).rename('Pergeseran').focal_mode(); // Filter Rank/Mayority  
Map.centerObject(Bts_Subang,10); 
var VisGeser = {bands:"Pergeseran",min:1,max:3,palette:PalBeda},
VisGeser_Prv = {min:1,max:3,palette:PalBeda_Prv}
;
//red = mundur ; green = tetap; blue =  maju 
// Map.addLayer(StkAft.mask(LBS_JwBl19), VisStkEVI_S2_2St,'Metric MT I 2020',0);
Map.addLayer(Indo10_Kec,{},'Poligon Kecamatan',0);
Map.addLayer(EVITS_S2_Jawa,{},'EVI S2 Multitemporal Jawa',0);
Map.addLayer(AT_Bfr.mask(LBS_JwBl19),VisAwlTnm,'Tanam MT 1 2018-2019',0);
Map.addLayer(AT_Aft.mask(LBS_JwBl19),VisAwlTnm,'Tanam MT 1 2019-2020',0);
Map.addLayer(EVIMax_Kls.mask(LBS_JwBl19),VisEVIMax('EVIMaxMT1_2020_Kls'),'EVIMax_Kls MT I 2020',0);
Map.addLayer(geser.mask(LBS_JwBl19), VisGeser, "Perubahan Awal Tanam");  
Map.addLayer(ChgEVIMax_Kls.mask(LBS_JwBl19), VisGeser_Prv, "Perubahan Produktivitas");  
// // Map.addLayer(EVI2018_S2,{},'EVI S2 Mult 2018',0);
// //Map.addLayer(mt,{},'EVI S2 Multi 2019',0);
// //Map.addLayer(Stk_EVI_Med,VisStkEVI_S2,'Stk EVI S2 Multi 2019 Metode Median');
// //Map.addLayer(Mos_Mt,VisStkEVI_S2,'Stk EVI S2 Multi 2019 Metode Quality GEE');
// Map.addLayer(StkImgTS.mask(LBS_JwBl19),VisStkEVI_S2,'Stk EVI S2 Multi ' + (Thn2) + ' ' + Pd + ' Harian',0);
// //Map.addLayer(EVI_S2,{},'EVI S2 Multi ' + (Thn2) + ' ' + Pd + ' Harian');
// Map.addLayer(ImgSmooth.mask(LBS_JwBl19), VisIdxP15_1,'EVI S2 Multi (Jan-Mar-Mei)');
// Map.addLayer(ImgSmooth.mask(LBS_JwBl19), VisIdxP15_2,'EVI S2 Multi (Apr-Jun-Agu)');
// Map.addLayer(ImgSmooth.mask(LBS_JwBl19), VisIdxP15_3,'EVI S2 Multi (Jul-Okt-Des)');
// // Map.addLayer(ImgSmooth.mask(LBS_JwBl19),VisIdxBulan2,'EVI S2 Multi (Agu-Jul-Mei) Smoothing',0);
 OvrBtsAdmin('All');// Legenda('LL','Realisasi Tanam','MT I Okt-Mar 2020',3,NamKls,PalBeda);
Legenda('LL','Produktivitas','MT I Okt-Mar 2020',3,dEVIMax,PalBeda_Prv);
//********************
// FUNGSI2
function Reklas(image,NamBnd,RenBnd) {
  var Kls = image.expression(
//  'VI <= -1 ? 0 : VI > -1 && VI < 0.1 ? 11 :VI >= 0.1 && VI <= 0.3 ? 10:' +
  'VI <= 0.35 ? 9: (VI > 0.35 && VI <= 0.4) ? 8:' +
  '(VI > 0.4 && VI <= 0.45) ? 1: (VI > 0.45 && VI <= 0.5) ? 2: (VI > 0.5 && VI <= 0.55) ? 3:' +
  '(VI >0.55 && VI <= 0.6) ? 4:VI > 0.6 && VI <= 0.65?5:VI > 0.65 && VI <= 0.7?6:7'
  ,{VI : image.select(NamBnd) });
  return Kls.rename(RenBnd).toByte();
}
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
            qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*").addBands(qa)
      .copyProperties(image, ["system:time_start"]);
}
// Cloud Mask Sentinel-2 S2_SR menggunakan Band SCL
function MskAwan_S2k(image) {
  var qa = image.select('SCL');
/*
1	ff0004	Saturated or defective
2	868686	Dark Area Pixels
3	774b0a	Cloud Shadows
4	10d22c	Vegetation
5	ffff52	Bare Soils
6	0000ff	Water
7	818181	Clouds Low Probability / Unclassified
8	c0c0c0	Clouds Medium Probability
9	f1f1f1	Clouds High Probability
10	bac5eb	Cirrus
11	52fff9	Snow / Ice  
*/  
  var mask = qa.expression("(q <= 3 || q >= 7) ? 0:1",{q : qa});
  //qa = qa.updateMask(mask); 
  return image.updateMask(mask).divide(10000).toFloat()
      .select("B.*").addBands(qa)
      .copyProperties(image, ["system:time_start"]);
}
// addBands : Indices
function addBands_S2(image){
  var ndvi = image.normalizedDifference(['B8','B4']).rename('NDVI');
  var ndwi = image.normalizedDifference(['B3', 'B12']).rename('NDWI');
  var ndbi = image.normalizedDifference(['B8','B11']).rename('NDBI');
  var ILT =  image.select('B11').divide(image.select('B8')).rename('ILT'); // Indeks Lahan Terbuka
  var evi = image.expression("(RED < NIR || BLUE < RED) ? 2.5*((NIR-RED)/(L+NIR+6*RED-7.5*BLUE))" + 
  ":1.5*((NIR-RED)/(L/2+NIR+RED))"
  ,{NIR: image.select('B8'),RED: image.select('B4'),BLUE: image.select('B2'),L : 1}).rename('EVI');
  var Msk = ndvi.expression("(vi <= -1.0 || vi >= 1.0) ? 0:1",{vi : ndvi});
  evi = evi.updateMask(Msk); ndvi = ndvi.updateMask(Msk);ndwi = ndwi.updateMask(Msk);
  ndbi = ndbi.updateMask(Msk); 
  Msk = evi.expression("(vi <= -1.0 || vi >= 1.0) ? 0:1",{vi : evi});
  evi = evi.updateMask(Msk); ndvi = ndvi.updateMask(Msk);ndwi = ndwi.updateMask(Msk);
  ndbi = ndbi.updateMask(Msk); 
  return image.addBands(ndbi).addBands(evi).addBands(ndwi).addBands(ndvi).addBands(ILT).toFloat(); 
}
function addBands_S2_Sc1(image){ // scaled Reflectance 10000
  var ndvi = image.normalizedDifference(['B8','B4']).multiply(10000).rename('NDVI').toInt16();
  var ndwi = image.normalizedDifference(['B3', 'B12']).multiply(10000).rename('NDWI').toInt16();
  var ndbi = image.normalizedDifference(['B8','B11']).multiply(10000).rename('NDBI').toInt16();
  var ILT =  image.select('B11').divide(image.select('B8')).multiply(10000).rename('ILT').toInt16(); // Indeks Lahan Terbuka
  var evi = image.expression("(RED < NIR || BLUE < RED) ? 2.5*10000.0*((NIR-RED)/(L+NIR+6*RED-7.5*BLUE))" + 
  ":1.5*10000.0*((NIR-RED)/(L/2+NIR+RED))"
  ,{NIR: image.select('B8'),RED: image.select('B4'),BLUE: image.select('B2'),L : 10000}).rename('EVI').toInt16();
  var Msk = ndvi.expression("(vi <= -10000 || vi >= 10000) ? 0:1",{vi : ndvi});
  evi = evi.updateMask(Msk); ndvi = ndvi.updateMask(Msk);ndwi = ndwi.updateMask(Msk);
  ndbi = ndbi.updateMask(Msk); 
Msk = evi.expression("(vi <= -10000 || evi >= 10000) ? 0:1",{evi : evi});
  evi = evi.updateMask(Msk); ndvi = ndvi.updateMask(Msk);ndwi = ndwi.updateMask(Msk);
  ndbi = ndbi.updateMask(Msk); 
  return image.addBands(ndbi).addBands(evi).addBands(ndwi).addBands(ILT).toFloat(); 
}
//******** Pilih Metode Komposit
function Pilih_S2k(date_range,PilBnd,Komp) {
  //var Img = S2_SR.filter(date_range) -> blm diketahui cara copy start,end data df format range
  var Img = S2_SR.filterDate(date_range[0],date_range[1]) 
  .map(MskAwan_S2k).map(addBands_S2)
  .set({'system:time_start': date_range[0],'system:time_end':date_range[1]})
//  .copyProperties(S2_SR,['system:time_start','system:time_end'])
  ;
  if (Komp == 'Min') Img = Img.min(); else if (Komp == 'Max') Img = Img.max();
  else if (Komp == 'Med') Img = Img.median(); else if (Komp == 'Mean') Img = Img.mean();
  else if (Komp == 'Qual')Img = Img.qualityMosaic('NDVI'); else Img = Img.qualityMosaic('NDVI'); 
  return Img.select(PilBnd)
//  .set({'system:time_start': date_range[0],'system:time_end':date_range[1]})
//.copyProperties(S2_SR,['system:time_start','system:time_end'])
  ; 
}
function Pilih_S2_TOA(date_range,PilBnd,Komp) {
  //var Img = S2_TOA.filter(date_range)
  var Img = S2_TOA.filterDate(date_range[0],date_range[1])
  .map(maskS2clouds).map(addBands_S2);
  if (Komp == 'Min') Img = Img.min(); else if (Komp == 'Max') Img = Img.max();
  else if (Komp == 'Med') Img = Img.median(); else if (Komp == 'Mean') Img = Img.mean();
  else if (Komp == 'Qual')Img = Img.qualityMosaic('NDVI'); else Img = Img.qualityMosaic('NDVI'); 
  return Img.select(PilBnd)
 // .copyProperties(S2_TOA,['system:time_start','system:time_end'])
  ; 
}
//********* FUNGSI WAKTU
function NamBul(Indo) {
var Bul=[],Bulan = [
'Januari','Februari','Maret','April',
'Mei','Juni','Juli','Agustus',
'September','Oktober','November','Desember',
  ], 
  Bulan2 = [
'January','February','March','April',
'May','June','July','August',
'September','October','November','December',
  ]; 
if (Indo == 'Ina') Bul=Bulan; else Bul =  Bulan2; 
  return Bul;
}
function NamBln(Tahun,Indo) {
var Bulan = NamBul(Indo);
var BlnTh = [],i;
for (i=0;i <=11;i++) { 
  BlnTh[i] = Bulan[i] + "_" + (Tahun);
}
  return BlnTh;
}
function ThBlnIdx(Tahun,Idx,Pd) { // Nama Band per periode
var BlnTh = [],i,No,JumPd; JumPd = 12*Math.round(30/Pd); 
for (i=0;i < JumPd;i++) { No = (i+1) ; if (i < 9) No = '0' + (i+1) ;
  BlnTh[i] = Idx + "_" + (Tahun) + "_" + No;
}
  return BlnTh;
}
// Periode Tgl
function TglPrd (Th,Pd,Pil) {//Pd =5,10,15,30 ; Pilihan : Opsi format
  var Dsr = [],i,j,k,Tgl=[],Tg1,Tg2,Tg1T,Tg2T,Imod,Kbst,BlnT,JPrd,JumBln;
  Kbst = Th % 4; if (Pd <= 30) JPrd = Math.round(30/Pd); else JPrd = Math.round(12/(Pd-30));
  if (Pd <=30)JumBln=12; else JumBln = Math.round(12/(Pd-30));
  for (i=0;i < JumBln; i++) { Imod = i % 2 ;
  if (Pd <= 30)BlnT=(i+1); else BlnT=(i+1)*(Pd-30);
    if (i < 9) BlnT = '0' + (i+1); else BlnT = (i+1);
    if (i > 6) Imod = (i-7) % 2;
    for (j=0; j < JPrd; j++) {
      k = j + JPrd*i; Tg1 = (Pd*j + 1); Tg2 = (Pd*(j + 1));
      if (Tg1 < 10) Tg1 = '0' + Tg1; if (Tg2 < 10) Tg2 = '0' + Tg2;
    if (j== JPrd-1 && Imod === 0)Tg2 = '31';
      if (j== JPrd-1 && i === 1)Tg2 = '28';
      if (j== JPrd-1 && i === 1 && Kbst === 0 )Tg2 = '29';
      Tg1T = Th + '-' + BlnT + '-' + Tg1;
      Tg2T = Th + '-' + BlnT + '-' + Tg2;
      if (Pil == 1) Dsr[k] = ee.Filter.date(Tg1T, Tg2T); else  Dsr[k] = [Tg1T,Tg2T];
      }
  }
  return Dsr; 
}
function StkTS_Img(imcol,p1,p2,NamBnd){
  // imCol > 1 band ; SelBnd = Bnd yg dipilih 
  var Jum1,Jum2,xrata, yrata, count, atas, bawah,JumDat,listOfImages,i,n,
  img,ymn,ymx,PosMin,PosMax,ImgRange,J1x,J2x,Jxy,ImgStd;
//  JumDat = imcol.size().getInfo(); n = JumDat ;
//   listOfImages = imcol.toList(JumDat);
var k,Bnd = ee.List(imcol.bandNames().getInfo()),BndNm=[];
JumDat = Bnd.length().getInfo(); n = JumDat;
for(i=0; i < JumDat; i++) {
  BndNm[i]= Bnd.get(i).getInfo();
}
  if (p1 >=0 || p2 >=0) n = p2-p1+1; else p1=0 ;
  Jum1 = J1x = Jum2 =J2x= Jxy= ImgRange = xrata = yrata = count = ee.Image(0);
  ymn = ee.Image(1.0); ymx = ee.Image(-1.0); PosMin = PosMax = ee.Image(1);
  for (i=0; i < n ; i++ ){ k=i+p1;
  //img = ee.Image(listOfImages.get(i+p1)).select(BndNm[i]);
  img = imcol.select(BndNm[k]).unmask();
  Jum1 = Jum1.add(img) ; Jum2 = Jum2.add(img.multiply(img));
  J1x = J1x.add(k); J2x = J2x.add(k.multiply(k));
  Jxy = Jxy.add(img.multiply(k));
  count = img.expression('(img != 0 )? count+1 : count'
    ,{img:img,count:count}) ;
  ymn = img.expression('(img != 0 && img < ymn)? img : ymn'
    ,{img:img,ymn:ymn}) ;
  ymx = img.expression('(img != 0 && img > ymx)? img : ymx'
  ,{img:img,ymx:ymx}) ;
  PosMin = img.expression('(img != 0 && img == ymn)?k+1:PMn'
    ,{img:img,ymn:ymn,PMn:PosMin,k:k}) ;
  PosMax = img.expression('(img != 0 && img == ymx)?k+1:PMx'
    ,{img:img,ymx:ymx,PMx:PosMax,k:k}) ; 
    }  
  ymn = ymn.rename(NamBnd + '_Min').toFloat() ; ymx = ymx.rename(NamBnd + '_Max').toFloat() ;
PosMin = PosMin.rename('Pos_Min').toByte(); PosMax = PosMax.rename('Pos_Max').toByte();
  //print ('Max,PosMax',ymx,PosMax);
  yrata = Jum1.divide(count).rename(NamBnd + '_Mean').toFloat();
  //print ('Mean',yrata);
ImgStd = (Jum2.subtract((Jum1.multiply(Jum1)).divide(count))).divide(count.subtract(1));
ImgStd = ImgStd.sqrt().rename(NamBnd + '_Std').toFloat(); 
//print('Std',ImgStd);
// Koef Regresi : Trend/Slope (Slp),intercep(Itc),korelasi(r)
var VarXY,VarX,Trend,VarY,Itc,r;
VarXY = Jxy.subtract(yrata.multiply(J1x)); VarX = J2x.subtract(J1x.multiply(J1x).divide(count)); 
Trend = VarXY.divide(VarX).rename('Trend').toFloat() ; 
VarY = Jum2.subtract((Jum1.multiply(Jum1).divide(count)));
Itc= yrata.subtract(Trend.multiply(J1x.divide(count))).rename('Intcp').toFloat();
r = VarXY.divide((VarX.multiply(VarY)).sqrt()).rename('Korelasi');
ImgRange = ymx.subtract(ymn).rename(NamBnd + '_Range').toFloat(); 
  count = count.rename('Sum NonMask');
  return yrata.addBands(ymx).addBands(ymn).addBands(ImgStd).addBands(ImgRange)
  .addBands(PosMin).addBands(PosMax).addBands(count).addBands(Trend).addBands(Itc).addBands(r);
}
function GantiAwan_Img(imcol,p1,p2){
  // imCol > 1 band ; SelBnd = Bnd yg dipilih 
  var JumDat,i,n,Img=[],ImgMax, k, ImgBaru=[],BndNm=[],Bnd;
//  JumDat = imcol.size().getInfo(); n = JumDat ;
//   listOfImages = imcol.toList(JumDat);
Bnd = ee.List(imcol.bandNames().getInfo());
JumDat = Bnd.length().getInfo(); n = JumDat;
for(i=0; i < JumDat; i++) {
  BndNm[i]= Bnd.get(i).getInfo();
}
  if (p1 >=0 || p2 >=0) n = p2-p1+1; else {p1=0 ; p2=n-1 ; }
ImgMax = ee.ImageCollection(imcol).max(); 
//imcol = imcol.unmask();
ImgBaru[0] = imcol.select(BndNm[p1]).unmask().toFloat();
ImgBaru[n-1] = imcol.select(BndNm[p1+n-1]).unmask().toFloat();
ImgBaru[n-2] = imcol.select(BndNm[p1+n-2]).unmask().toFloat();
  for (i=1; i < n-1 ; i++ ){ k=i+p1;
  //img = ee.Image(listOfImages.get(i+p1)).select(BndNm[i]);
  Img[0] = imcol.select(BndNm[k-1]).unmask().toFloat();
  Img[1] = imcol.select(BndNm[k]).unmask().toFloat();
  Img[2] = imcol.select(BndNm[k+1]).unmask().toFloat(); 
  if (i < n-2) Img[3] =  imcol.select(BndNm[k+2]).unmask().toFloat();
  if (i == n-2) Img[3] = imcol.select(BndNm[k-2]).unmask().toFloat();
// Isi Img Awal jika mask/berawan (0)
ImgBaru[0] = Img[0].expression(
'(i == 1 && Img1 == 0 && Img2 != 0 && Img3 != 0 ) ? Img2*0.67+Img3*0.33 :' +
'(i == 1 && Img1 == 0 && Img2 == 0 && Img3 != 0 && Img4 != 0 ) ? Img3*0.67+Img4*0.33 :' +
'(i == 1 && Img1 == 0 && Img2 != 0 && Img3 == 0 && Img4 != 0) ? Img2*0.67+Img4*0.33 : Img1',
{i:i,Img1:Img[0],Img2:Img[1],Img3:Img[2],Img4:Img[3] }
  ).toFloat(); 
// Pengisian pixel berawan, maksimum 2 data berturut2
ImgBaru[i] = Img[1].expression(
  '(Img2 == 0 && Img1 != 0 && Img3 != 0 )? 0.5*(Img1+Img3):'+
  '(Img2 == 0 && Img1 != 0 && Img3 == 0 && Img4 != 0)? (Img1*0.67+Img4*0.33):'+
  '(Img2 == 0 && Img1 == 0 && Img3 != 0 && Img4 != 0)? (Img3*0.67+Img4*0.33):Img2',
  {Img1:Img[0],Img2:Img[1],Img3:Img[2],Img4:Img[3] }
  ); 
// Img1,img2,im3 diganti jk berawan, agar seklaigus bs lakukan smoothing mean & median 
Img[2] = Img[2].expression(
  '(Img3 == 0 && Img1 != 0 && Img2 != 0 )? 0.33*Img1+0.67*Img2:'+
  '(Img3 == 0 && Img1 != 0 && Img2 == 0 && Img4 != 0)? (Img4*0.67+Img1*0.33):'+
  '(Img3 == 0 && Img1 == 0 && Img2 != 0 && Img4 != 0)? (Img2*0.5+Img4*0.5):Img3',
  {Img1:Img[0],Img2:Img[1],Img3:Img[2],Img4:Img[3] }
  ); 
// isi jka akhir Img = 0
Img[2] = Img[2].expression(
  "(i == n-2 && Img1 != 0 && Img2 != 0 && Img3 == 0 ) ? Img2*0.67+Img1*0.33 :" +
  "(i == n-2 && Img1 == 0 && Img2 != 0 && Img3 == 0 && Img4 != 0) ? Img2*0.67+Img4*0.33 : Img1",
{i:i,Img1:Img[0],Img2:Img[1],Img3:Img[2],Img4:ImgBaru[n-3],n:n }
  );
if(i===0) Img[0] = ImgBaru[0];  Img[1] = ImgBaru[i];
// Smoothing rata2 & median jk Img < ImgMax; 
var Means,Meds,ImgCol ; 
//ImgCol = Img ; ImgCol = ee.ImageCollection(ImgCol);Means = ImgCol.mean().toFloat();
Means = (Img[0].add(Img[1]).add(Img[2])).divide(3).toFloat();  
  if (ImgBaru[i]  != ImgMax) ImgBaru[i] = Means; else ImgBaru[i] = ImgMax;
Img[1] = ImgBaru[i]; Meds=Med3(Img);
//ImgCol = Img ; ImgCol = ee.ImageCollection(ImgCol);Meds = ImgCol.median().toFloat();   
if (ImgBaru[i] != ImgMax) ImgBaru[i] = Meds; else ImgBaru[i] = ImgMax;
  }
  return ee.Image.cat(ImgBaru).rename(BndNm);
}
function Med3(Img) { // Median 3 deret ImgStack
  var Med = Img[1]; Med = Med.expression(
    "(Img2 > Img1 && Img2 < Img3) ?Img2:(Img2 > Img3 && Img2 < Img1) ? Img2:" +
    "(Img1 > Img2 && Img1 < Img3) ?Img1:(Img1 > Img3 && Img1 < Img2) ? Img1:" +
    "(Img3 > Img2 && Img3 < Img1) ?Img3:(Img3 > Img1 && Img3 < Img2) ? Img3:Med",
    {Img1:Img[0],Img2:Img[1],Img3:Img[2],Med:Med }
    ).toFloat();
return Med; 
} 
function VisBand(Bands,Min,Max,Pal) {
  if (Min == -99) Min = [0];
  var Vis = { bands : Bands,min:Min,max:Max};
  if (Pal !== 0) Vis = { bands : Bands,min:Min,max:Max,palette:Pal};
  return Vis;
}
function OvrBtsAdmin (Bts) {
if (Bts == 'All') { Map.addLayer(ee.Image().toByte().paint(Indo10_Kec, 0, 1), {palette : '0f0f0f'},'Sub District Boundary');
 Map.addLayer(ee.Image().toByte().paint(Indo10_Kab, 0, 1), {palette : 'black'},'District Boundary');
Map.addLayer(ee.Image().toByte().paint(Indo10_Prv, 0, 2), {palette : 'dd0000'},'Province Boundary'); }
else {
if (Bts == 'Kec') Map.addLayer(ee.Image().toByte().paint(Indo10_Kec, 0, 1), {palette : 'black'},'Sub District Boundary');  
if (Bts == 'Kab') Map.addLayer(ee.Image().toByte().paint(Indo10_Kab, 0, 1), {palette : 'black'},'District Boundary');
if (Bts == 'Prv') Map.addLayer(ee.Image().toByte().paint(Indo10_Prv, 0, 2), {palette : 'dd0000'},'Province Boundary'); 
}
}
// ========== Legenda
function Legenda(PosPan,Judul,Ket,JumKls,NamKls,Palet) {
//palette with the colors
//var palette =["ff00ff","00ff00","0000ff"];
//var JumKls = ee.List(NamKls).length().getInfo();
var palette = Palet; 
// names[0]= 'Mundur' ; names[1]= 'Tetap' ;  names[2]= 'Maju';
//name of the legend
var names = [], i,PosPnl;
 names = NamKls;
if (PosPan == 'LL') PosPnl = 'bottom-left';
else if (PosPan == 'UL') PosPnl = 'top-left';
else if (PosPan == 'UR') PosPnl = 'top-right';
else PosPnl = 'bottom-right';
//set position of panel
var legend = ui.Panel({
  style: {
    position: PosPnl,
    padding: '8px 15px'
  }});
//create legend title
var legendTitle = ui.Label({
  value: Judul,
  style: {fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
var legendTitle2 = ui.Label({
  value: Ket,
  style: {fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }}); 
//add the title to the panel
legend.add(legendTitle).add(legendTitle2);
//creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      //create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          //use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }});
      //create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      //return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
//add color and and names
for ( i = 0; i < JumKls; i++) {
  legend.add(makeRow(palette[i], NamKls[i]));
  }  
//add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);
}
// List Id Koleksi Data 
function ListImgId (ImgCol,ImgId) { // Id Data
  var imageList = ImgCol.toList(ImgCol.size());
  var id_list = imageList.map(function(item) {
  return (ee.Image(item).id());
});
if (ImgId == 'img') return imageList; else return id_list;
}
function DetAwlTnm(IPMx,BPMx,IVMx,BIVMx,IVMx_Th,Pd,MaxAT,TglAwlDt) {
  // IPMx Img berisi band BPMx dg nama 'Pos_Max', Pd : periode 5,10,15,30
  // EVIMax_Th : Treshold nilai terendah utk EVI max tan padi -> 0.375
 // MaxAT : Max Awal tanam dr data Okt-Mar 6 bulan, klw 15 harian : MaxAt = 2*6 = 12
var UMx = 60; if ((Pd % 8) === 0) UMx = 64; // Umur Tanaman saat EVI Max
var AT = IPMx.expression(
        '(IV >= IVMax_Th)? PMx - UMx/Pd:MaxAT+1',
        {IV : IVMx.select(BIVMx),IVMax_Th:IVMx_Th,PMx:IPMx.select(BPMx),
          MaxAT:MaxAT,Pd:Pd,UMx:UMx
        })
        .rename('AwalTanam_dr_' + TglAwlDt).toInt16();
  return AT;
}
function KonvDat(Img,m,c,TyDt,Linier) { // Konversi Data
 var Hasil ;
 if (Linier == 'y') { if (TyDt == 4) Img.multiply(m).add(c).toFloat();
 else (Img.multiply(m).add(c)).round().toByte();
 }
  else { if (TyDt == 4) Hasil = (Img.subtract(c)).divide(m).toFloat();
  else Hasil = (Img.subtract(c)).divide(m).toByte();
  }
  return Hasil;
}
function OvrMat(Img1,Img2,JumKls) { // Overlay Matrik utk Perubahan
  return Img2.add(Img1.subtract(1).multiply(JumKls)).rename('Change');
}
function BuatLegKls(Min,Max,Interval) {
  var JumKls,LegKls=[];
}
function AwlTnm_Chg(img,bef,aft,JumKls) {
}
function MskAwn_Mod13(img) {
      var DOY = img.select('DayOfYear').rename('DoY'), QA = img.select('SummaryQA').rename('QA'),
      Awan = QA.expression('(qa > 1)?0:1',{qa:QA});
      return img.updateMask(Awan).divide(10000).toFloat()
      .addBands(QA).addBands(DOY)
      .copyProperties(img, ["system:time_start","system:time_end"])
      ;
    }
function ReProjGeo(Img) { // ReProyeksi menjadi GeoDetic
  return Img.reproject({
  crs: ee.Projection('EPSG:4326')}); 
     }
function ResBil(Img,Sc) { // Resampling Biliner
   Img.resample('bilinear').reproject({
  crs: ee.Projection('EPSG:4326'),scale: Sc}); 
    return Img; }
function AddIdx_Mod13(img) {
var ndwi = img.normalizedDifference(['blue', 'swir2']).rename('NDWI');
var ndbi = img.normalizedDifference(['swir2','nir']).rename('NDBI');
return img.addBands(ndbi).addBands(ndwi)}