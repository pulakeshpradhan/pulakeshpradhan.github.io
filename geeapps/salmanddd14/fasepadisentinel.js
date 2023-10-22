var L8_SR = ui.import && ui.import("L8_SR", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    S2_TOA = ui.import && ui.import("S2_TOA", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    S2_SR = ui.import && ui.import("S2_SR", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    S1_GRD = ui.import && ui.import("S1_GRD", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    Indo_Kab = ui.import && ui.import("Indo_Kab", "table", {
      "id": "users/panganpusfatja/Tab_Shp/Indo_Kab"
    }) || ee.FeatureCollection("users/panganpusfatja/Tab_Shp/Indo_Kab"),
    Indo15_Prv = ui.import && ui.import("Indo15_Prv", "table", {
      "id": "users/panganpusfatja/Tab_Shp/IndoPrv15"
    }) || ee.FeatureCollection("users/panganpusfatja/Tab_Shp/IndoPrv15"),
    Indo18_Kab = ui.import && ui.import("Indo18_Kab", "table", {
      "id": "users/rarasati/SHP2018/SHP_ProvKabKot_2018"
    }) || ee.FeatureCollection("users/rarasati/SHP2018/SHP_ProvKabKot_2018"),
    Indo_Prv = ui.import && ui.import("Indo_Prv", "table", {
      "id": "users/panganpusfatja/Tab_Shp/Indo_Prv"
    }) || ee.FeatureCollection("users/panganpusfatja/Tab_Shp/Indo_Prv"),
    LBS_MALUKU = ui.import && ui.import("LBS_MALUKU", "image", {
      "id": "users/amirotulbahiyah/LBS_Maluku_Malut_10m2"
    }) || ee.Image("users/amirotulbahiyah/LBS_Maluku_Malut_10m2"),
    LBS_NUSA_TENGGARA = ui.import && ui.import("LBS_NUSA_TENGGARA", "image", {
      "id": "users/yanryanirawan/LBS_Nusa_Tenggara_10m"
    }) || ee.Image("users/yanryanirawan/LBS_Nusa_Tenggara_10m"),
    LBS_SULAWESI = ui.import && ui.import("LBS_SULAWESI", "image", {
      "id": "users/yanryanirawan/LBS_Sulawesi_10m"
    }) || ee.Image("users/yanryanirawan/LBS_Sulawesi_10m"),
    LBS_SUMATERA = ui.import && ui.import("LBS_SUMATERA", "image", {
      "id": "users/yanryanirawan/LBS_Sumatera_10m"
    }) || ee.Image("users/yanryanirawan/LBS_Sumatera_10m"),
    LBS_PAPUA = ui.import && ui.import("LBS_PAPUA", "image", {
      "id": "users/yanryanirawan/LBS_Papua_10m"
    }) || ee.Image("users/yanryanirawan/LBS_Papua_10m"),
    LBS_KALIMANTAN = ui.import && ui.import("LBS_KALIMANTAN", "image", {
      "id": "users/yanryanirawan/LBS_Kalimantan_10m"
    }) || ee.Image("users/yanryanirawan/LBS_Kalimantan_10m"),
    LBS_JAWA_BALI = ui.import && ui.import("LBS_JAWA_BALI", "image", {
      "id": "users/yanryanirawan/LBS_Jawa_Bali_10m"
    }) || ee.Image("users/yanryanirawan/LBS_Jawa_Bali_10m"),
    ACEH_SWH = ui.import && ui.import("ACEH_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/ACEH_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/ACEH_SWH"),
    BALI_SWH = ui.import && ui.import("BALI_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/BALI_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/BALI_SWH"),
    BANTEN_SWH = ui.import && ui.import("BANTEN_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/BANTEN_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/BANTEN_SWH"),
    DIY_SWH = ui.import && ui.import("DIY_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/DIY_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/DIY_SWH"),
    DKI_SWH = ui.import && ui.import("DKI_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/DKI_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/DKI_SWH"),
    KALBAR_SWH = ui.import && ui.import("KALBAR_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/KALBAR_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/KALBAR_SWH"),
    KALSEL_SWH = ui.import && ui.import("KALSEL_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/KALSEL_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/KALSEL_SWH"),
    LAMPUNG_SWH = ui.import && ui.import("LAMPUNG_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/LAMPUNG_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/LAMPUNG_SWH"),
    NTB_SWH = ui.import && ui.import("NTB_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/NTB_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/NTB_SWH"),
    SULSEL_SWH = ui.import && ui.import("SULSEL_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/SULSEL_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/SULSEL_SWH"),
    SUMSEL_SWH = ui.import && ui.import("SUMSEL_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/SUMSEL_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/SUMSEL_SWH"),
    BABEL_SWH = ui.import && ui.import("BABEL_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/BABEL_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/BABEL_SWH"),
    BENGKULU_SWH = ui.import && ui.import("BENGKULU_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/BENGKULU_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/BENGKULU_SWH"),
    GORONTALO_SWH = ui.import && ui.import("GORONTALO_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/GORONTALO_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/GORONTALO_SWH"),
    JAMBI_SWH = ui.import && ui.import("JAMBI_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/JAMBI_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/JAMBI_SWH"),
    JATENG_SWH = ui.import && ui.import("JATENG_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/JATENG_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/JATENG_SWH"),
    PAPUA_BARAT_SWH = ui.import && ui.import("PAPUA_BARAT_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/PAPUA_BARAT_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/PAPUA_BARAT_SWH"),
    SUMBAR_SWH = ui.import && ui.import("SUMBAR_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/SUMBAR_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/SUMBAR_SWH"),
    PAPUA_SWH = ui.import && ui.import("PAPUA_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/PAPUA_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/PAPUA_SWH"),
    NTT_SWH = ui.import && ui.import("NTT_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/NTT_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/NTT_SWH"),
    MALUKU_SWH = ui.import && ui.import("MALUKU_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/MALUKU_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/MALUKU_SWH"),
    MALUT_SWH = ui.import && ui.import("MALUT_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/MALUT_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/MALUT_SWH"),
    KALTIM_SWH = ui.import && ui.import("KALTIM_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/KALTIM_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/KALTIM_SWH"),
    KEPRI_SWH = ui.import && ui.import("KEPRI_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/KEPRI_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/KEPRI_SWH"),
    SULTRA_SWH = ui.import && ui.import("SULTRA_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/SULTRA_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/SULTRA_SWH"),
    RIAU_SWH = ui.import && ui.import("RIAU_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/RIAU_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/RIAU_SWH"),
    SULBAR_SWH = ui.import && ui.import("SULBAR_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/SULBAR_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/SULBAR_SWH"),
    JATIM_SWH = ui.import && ui.import("JATIM_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/JATIM_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/JATIM_SWH"),
    KALTENG_SWH = ui.import && ui.import("KALTENG_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/KALTENG_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/KALTENG_SWH"),
    SULTENG_SWH = ui.import && ui.import("SULTENG_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/SULTENG_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/SULTENG_SWH"),
    SULUT_SWH = ui.import && ui.import("SULUT_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/SULUT_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/SULUT_SWH"),
    SUMUT_SWH = ui.import && ui.import("SUMUT_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/SUMUT_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/SUMUT_SWH"),
    JABAR_SWH = ui.import && ui.import("JABAR_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/JABAR_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/JABAR_SWH"),
    KALTARA_SWH = ui.import && ui.import("KALTARA_SWH", "image", {
      "id": "users/pusfatjapangan19/LBSawah/KALTARA_SWH"
    }) || ee.Image("users/pusfatjapangan19/LBSawah/KALTARA_SWH");
// *** IMPLEMENTASI MODEL PAJALE UNTUK PEMETAAN FASE
//$$$$$$$ Created By Dr Ir Dede Dirgahayu Domiri, M.Si
var Waktu = require('users/salmanddd14/AFungsi_1:Waktu.js');
var GUI = require('users/salmanddd14/AFungsi_1:GUI_GEE.js');
var Citra = require('users/salmanddd14/AFungsi_1:OlhCitra.js');
var LBS_Pulau = ([LBS_SUMATERA,LBS_JAWA_BALI,LBS_KALIMANTAN,LBS_SULAWESI,
LBS_NUSA_TENGGARA,LBS_MALUKU,LBS_PAPUA]);
var LBS_Prv = ee.List([ACEH_SWH,SUMUT_SWH,SUMBAR_SWH,RIAU_SWH,JAMBI_SWH,BENGKULU_SWH,SUMSEL_SWH,LAMPUNG_SWH,KEPRI_SWH,BABEL_SWH,
DKI_SWH,BANTEN_SWH,JABAR_SWH,JATENG_SWH,DIY_SWH,JATIM_SWH,BALI_SWH,
NTB_SWH,NTT_SWH,KALBAR_SWH,KALTENG_SWH,KALSEL_SWH,KALTIM_SWH,KALTARA_SWH,
SULBAR_SWH,SULSEL_SWH,SULTENG_SWH,SULTRA_SWH,GORONTALO_SWH,SULUT_SWH,
MALUT_SWH,MALUKU_SWH,PAPUA_SWH,PAPUA_BARAT_SWH]);
var thn1,Thn,Bln,Tgl,TglPrd=[],Prd,IdxPrd,ThnT,BlnT,TglT,Judul,JumLBS,Period,Periode,Tgl_Range,
PrdList=[],i,j,k,Img_S1,Img_S2,NamPrv,BtsPrv,BtsArea,Fase,Shp,Swh,NamPrvPil,RGB_S2,RGB_S1,dPI,
RGB_L8,Fase_S2,Fase_S1,TS_S1,TS_S2,Padi,Padi2,L8,S2,S1,Shp_Kab,VisRGB,Air_Th,Bera_Th,Veg_Th,Mask,
S1_3 =[],TglPrd3,Trend,RPISlop,Bts_Plu=BtsPlu()
;
var Bts_Subang = ee.Geometry.Rectangle([107.5,-6.17, 107.96,-6.82]), JumKab;
var NamLBS = ee.List( ['Aceh','SumUt','SumBar' ,'SumSel','Lampung',
   'Banten','Jabar','Jateng','Yogya','Jatim','Bali','NTB','NTT','KalSel','SulSel','Gorontalo']);
 JumLBS = NamLBS.length().getInfo();
var Nama_Fase_Kls = ['Water','Veg1','Veg2','Gen1','Gen2','Bera','Non Paddy/Data'];
var Fase_palette = ['0000ff','88FF00','00aa00','eedd00','ffff44', 
'd28d4f','aaaaaa'] ;
var VisFase1 = {min:1,max:8,palette:['blue','88ff00', 'green','888800', 'yellow','ffddaa','red','dedede']};
var VisFase = {min:1,max:7,palette:Fase_palette};
// Par Display
//var VisRGB_S1 = {min:[-12.23,-9.19 ,-20.49],max :[-1.55,-4.89,-7.36]}; //VV_Lee,VH-VV,VH_Lee
//var VisRGB_S1 = {min:[-12.23,-9.19 ,-14.29],max :[-1.55,-4.89,-5.5]}; //VV_Lee,VH-VV,MeanBS,
var VisRGB1_S1 = {min:[-12.23,-9.19 ,4.54],max :[-1.55,-4.89,9.54]}; //VV_Lee,VH-VV,VV-VH
var VisRGB_S1 = {min:[-12.23,-9.19 ,1.58],max :[-1.55,-4.89,5.53]}; //VV_Lee,VH-VV,VV-0.75*VH
var VisRGB_S2 = {bands:['B11','B8','B4'],min:[0.08,0.14,0.01],max :[0.29, 0.36,0.14]};
var VisRGB_L8 = {bands:['B6','B5','B4'],min:[0.06,0.12,0.01],max :[0.29, 0.38,0.14]};
var VisRGBS1_2St = {bands : ['VV','VH','VV-VH'],min:[-9.78,-16.71,4.25], max :[-3.19,-10.09,10.49]};
var VisRGBS1_3St = {bands : ['VV','VH','VV-VH'],min:[-25.05,-39.26,1.15], max :[6.51,3.86,15.69]};
var VisRGBS1_25St = {bands : ['VV','VH','VV-VH'],min :[-24.55,-35.41,2.52],max:[-2.15,-9.48,14.38]};
var Vis_SCL = {min:1,max:11,palette :['ff0004','868686','774b0a','10d22c',
'd28d4f','0000ff','818181','c0c0c0','f1f1f1','bac5eb','52fff9'] };
var Bnd_S2 = ['B.*','NDBI','EVI','NDWI'],Bnd_L8 = Bnd_S2,
Bnd_S2k = ['B.*','NDBI','EVI','NDWI','SCL'] // SR terkoreksi atmosfir
;
/* var Bnd_S1 = ['VV_Lee','VH-VV','VV-VH','MeanBS','VH_Lee','NDPI'],
BndRGB_S1 = ['VV_Lee','VH-VV','VV-VH']; */
var Bnd_S1 = ['VV_Cor','VH-VV','VV-VH','MeanBS','VH_Cor','NDPI'],
BndRGB_S1 = ['VV_Cor','VH-VV','VV-VH']
;
var WADMPR = [
'Aceh','Sumatera Utara','Sumatera Barat','Riau','Jambi',
'Bengkulu','Sumatera Selatan','Lampung','Kep Riau','Kep Bangka Belitung',
'DKI Jakarta','Banten','Jawa Barat','Jawa Tengah','DI Yogyakarta',
'Jawa Timur','Bali','Nusa Tenggara Barat','Nusa Tenggara Timur',
'Kalimantan Barat','Kalimantan Tengah','KalSel','Kalimantan Selatan','Kalimantan Timur','Kalimantan Utara',
'Sulawesi Barat','Sulawesi Selatan','Sulawesi Tengah','Sulawesi Tenggara','Gorontalo','Sulawesi Utara',
'Maluku Utara','Maluku','Papua','Papua Barat'];
var Pulau_Prv = [['Aceh','Sumatera Utara','Sumatera Barat','Riau','Jambi','Bengkulu','Sumatera Selatan',
'Lampung','Kep Riau','Kep Bangka Belitung'],
['DKI Jakarta','Banten','Jawa Barat','Jawa Tengah','DI Yogyakarta','Jawa Timur','Bali'],
['Nusa Tenggara Barat','Nusa Tenggara Timur'],['Kalimantan Barat','Kalimantan Tengah','Kalimantan Selatan','Kalimantan Timur','Kalimantan Utara'],
['Sulawesi Barat','Sulawesi Selatan','Sulawesi Tengah','Sulawesi Tenggara','Gorontalo','Sulawesi Utara'],
['Maluku Utara','Maluku','Papua','Papua Barat']]
;
var NamPrvPil, PilPrv = {
Aceh:1,Sumatera_Utara:2,Sumatera_Barat:3,Riau:4,Jambi:5,
Bengkulu:6,Sumatera_Selatan:7,Lampung:8,Kep_Riau:9,Kep_Bangka_Belitung:10,
DKI_Jakarta:11,Banten:12,Jawa_Barat:13,Jawa_Tengah:14,DI_Yogyakarta:15,
Jawa_Timur:16,Bali:17,Nusa_Tenggara_Barat:18,Nusa_Tenggara_Timur:19,
Kalimantan_Barat:20,Kalimantan_Tengah:21,Kalimantan_Selatan:23,
Kalimantan_Timur:24,Kalimantan_Utara:25,Sulawesi_Barat:26,Sulawesi_Selatan:27,
Sulawesi_Tengah:28,Sulawesi_Tenggara:29,Gorontalo:30,Sulawesi_Utara:31,
Maluku_Utara:32,Maluku:33,Papua:34,Papua_Barat:35,All : 37};
//Batas Prov
var Bts_Prv = BtsPrv(),Bts1Prv,AOI;
AOI = ee.Geometry.Rectangle(Bts_Prv[12]); // AOI def = Jawa Barat
/*
var Bts_Prv = ([Bts_Aceh,Bts_sumut,Bts_sumbar,Bts_sumsel,
Bts_lampung,Bts_dki,Bts_Btn,Bts_Jbr,Bts_Jtg,Bts_diy,
Bts_Jtm,Bts_bali,Bts_ntb,Bts_ntt,Bts_kalsel,Bts_sulsel,
Bts_gorontalo]); 
*/
var i,ft,NamProv,PrvId,ListProv = [], Jam,HariniTxt,TglRange=[] ;
var Harini = Waktu.TglNow('WIB');
Thn = Harini.get('year').getInfo(); Bln = Harini.get('month').getInfo();
Tgl = Harini.get('day').getInfo(); 
HariniTxt = Thn.toString() +'-' + Bln.toString()+'-' + Tgl.toString();
Jam =  Harini.get('hour').getInfo() + ':' + Harini.get('minute').getInfo() + ':' + Harini.get('second').getInfo();
var HariniTxtInfo = HariniTxt + 'T' + Jam, ExDatS1,ExDatS2;
 print('Info : ' + HariniTxtInfo); TglRange = [Thn + '-01-01',HariniTxt];
 ExDatS1 = Citra.ListImgId(FiltData('s1',TglRange,AOI)); 
 ExDatS2 = Citra.ListImgId(FiltData('s2k',TglRange,AOI));
print('Ketersediaan Data Sentinel-1 di Jawa Barat dari 01-01-'+ Thn + ' : ',ExDatS1);
print('Ketersediaan Data Sentinel-2 di Jawa Barat dari 01-01-'+ Thn + ' : ',ExDatS2);
 Thn = 2020; // Bisa diganti
// Prd = Waktu.PrdTgl(Thn,1);PrdList = Waktu.PrdTgl(Thn,2);
 Prd = Waktu.Dasarian(Thn,1);PrdList = Waktu.Dasarian(Thn,2);
  print('Tgl Dasarian : ',PrdList);
var Pulau = {'Sumatera':1,'Jawa_Bali':2,'Kalimantan':3,'Sulawesi':4,'NTB_NTT':5,'Maluku_Papua':6},
Nama_Pulau = ['Sumatera','Jawa_Bali','Kalimantan','Sulawesi','NTB_NTT','Maluku_Papua'],NamaPulau,
Plu,PluId
;
var Pilih = {
January_p1 : PrdList[0][0],January_p2 : PrdList[1][0],
February_p1 : PrdList[2[0]],February_p2 : PrdList[3][0],
Maret_p1 : PrdList[4][0],Maret_p2 :PrdList[5][0],
April_p1 : PrdList[6][0],April_p2 : PrdList[7][0],
May_p1 : PrdList[8[0]],May_p2 : PrdList[9][0],
June_p1 : PrdList[10][0],June_p2 : PrdList[11][0],
July_p1 : PrdList[12][0],July_p2 : PrdList[13][0],
Agustus_p1 : PrdList[14][0],Agustus_p2: PrdList[15][0],
September_p1 : PrdList[16][0],September_p2 : PrdList[17][0],
Oktober_p1 : PrdList[18][0],Oktober_p2 : PrdList[19][0],
November_p1 : PrdList[20][0],November_p2 : PrdList[21][0],
Desember_p1 : PrdList[22][0],Desember_p2 : PrdList[23][0]
};
Air_Th = -19.5; Bera_Th = -13; // Berdasarkan VH
// Buat UI
var Judul = 'SENTINEL for AGRICULTURAL CROP',
Author = 'by Dr Dede Dirgahayu, M.Si, Pusfatja LAPAN'
;
var TB_Thn = GUI.TxtBnm(Thn,'Tgl Awal',10,'red',200,60,''),
    TB_Prd = GUI.TxtB(1,'Tgl Awal',10,'red','-33px 0 0 70px',200,40,''),
    Lbl_App = GUI.Lblnm(Judul,15,'#00DD00','bold','center'),
    Lbl_Author = GUI.Lbl(Author,12,'blue','0 0 0 12px','bold','center'),
    PilPeriod = GUI.Pilih(PrdList,'Select Period',13,'0000DD','-27px 0px 0px 115px','bold',120,""),
    PilProv = GUI.Pilih(PilPrv,'Select Province',13,'DD0000','8px 10px 0px 8px','bold',120,""),
    PilPulau = GUI.Pilih(Pulau,'Pilih Pulau',13,'00DD00','-28px 10px 0px 130px','bold',120,""),
HariniLbl = GUI.Lbl(HariniTxt,12,'#0000dd','-53px 0px 0px 135px',200,120,""),
Btn_Pros = GUI.CmdBtn1('START PROCESSING !',14,'DD0000','dddddd','10px 10px 0px 8px','bold',110,'center',4,
'2px dashed #ff0000'), 
Btn_Save = GUI.CmdBtn1('SAVE RESULT',14,'0000DD','dddddd','-41px 10px 0px 155px','bold',120,'center',4,
'2px dashed #ff0000'),
Panel = ui.Panel()
;
Panel.style().set('width', '275px');
var intro = ui.Panel([Lbl_App,Lbl_Author,TB_Thn,TB_Prd,PilPeriod,PilProv,PilPulau,Btn_Pros,Btn_Save
]);
Panel.add(intro);ui.root.insert(0, Panel);
TB_Thn.onChange(
  function () {
  Thn = TB_Thn.getValue();
 // print(Thn);
 Prd = Waktu.PrdTgl(Thn,1);PrdList = Waktu.PrdTgl(Thn,2);
 } );
//print(PilPeriod.items())
PilPeriod.onChange(
  function (key) {
  var Cek = parseInt(key, 9);
 Thn = TB_Thn.getValue();
//  Prd = Waktu.PrdTgl(Thn,1);PrdList = Waktu.PrdTgl(Thn,2);
  Prd = Waktu.Dasarian(Thn,1);PrdList = Waktu.Dasarian(Thn,2);
//  PilPeriod.items().set(Object.keys,PrdList);
  Periode = PilPeriod.getValue();  // IdxPrd = Waktu.GetIdxPrd(Pilih[Periode]);
 IdxPrd = Periode;
 //print('Periode ' + Periode,Pilih[Periode])
 //print((IdxPrd) + ':' + PrdList[IdxPrd]);
 TB_Prd.set('value',IdxPrd);
  }
  );
PilProv.onChange(
  function (key) {
  var Cek = parseInt(key, 9);
NamPrvPil = PilProv.getValue(); PrvId = PilPrv[NamPrvPil];
 NamPrv = WADMPR[PrvId-1]; 
// print((PrvId ) + " : " + NamPrvPil + '/'+NamPrv);
 Shp_Kab=Indo_Kab.filter(ee.Filter.eq('WADMPR',NamPrv));
  ft = Indo_Prv.filter(ee.Filter.eq('PRV_ID',PrvId));
//  ft = Indo_Prv.filter(ee.Filter.eq('WADMPR',NamPrv));
Bts1Prv =  ee.Geometry.Rectangle(Bts_Prv[PrvId-1]);  
 Mask = ee.Image(LBS_Prv.get(PrvId-1));  
  }
  );
PilPulau.onChange(
  function (key) {
  var Cek = parseInt(key, 9);
Plu = PilPulau.getValue(); PluId = Pulau[Plu] - 1;
// print((PrvId + 1) + " : " + NamPrvPil);
NamaPulau = Nama_Pulau[PluId]; NamPrvPil = Plu;
 ft=Indo15_Prv.filter(ee.Filter.eq('PULAU',NamaPulau));
Shp_Kab = Indo18_Kab.filter(ee.Filter.inList('WADMPR',Pulau_Prv[PluId]));
Mask = LBS_Pulau[PluId];  
Bts1Prv =  ee.Geometry.Rectangle(Bts_Plu[PluId]);     
  }
  );
Btn_Pros.onClick(
  function() {
Thn = TB_Thn.getValue(); 
//Prd = Waktu.PrdTgl(Thn,1);PrdList = Waktu.PrdTgl(Thn,2);
Prd = Waktu.Dasarian(Thn,1);PrdList = Waktu.Dasarian(Thn,2);
//NamPrvPil = PilProv.getValue(); PrvId = PilPrv[NamPrvPil] ;
// print(PrvId + " : " + NamPrvPil);
// NamPrv = WADMPR[PrvId-1]; Periode = PilPeriod.getValue(); // IdxPrd = Waktu.GetIdxPrd(Pilih[Periode]);
 IdxPrd = TB_Prd.getValue();
//  print(IdxPrd + ' = ' + Pilih[Periode]);
//ft=Indo_Prv.filter(ee.Filter.eq('WADMPR',NamPrv));
Map.centerObject(ft,8);
//TglPrd = PrdList[IdxPrd]; print('Periode  ' + IdxPrd,TglPrd); // Pilihan Otomatis
// Pilihan Waktu 10 Harian manual
var Idx,Tgl_Fase,Tgl_Prd = [],Pil,p1; Tgl_Prd[0]= ['2020-01-11','2020-01-20']; Tgl_Prd[1]= ['2020-01-21','2020-01-31'];
    Tgl_Prd[2] = ['2020-02-01','2020-02-10']; Tgl_Prd[3] = ['2020-02-11','2020-02-20'];
Pil=2; Tgl_Fase = Tgl_Prd[Pil]; p1=Pil-2;
S2 = ee.Image(Pilih_S2k(Tgl_Fase,Bnd_S2k,'Qual','S2',ft));
S1 = ee.Image(Pilih_S1(Tgl_Fase,'',Bnd_S1,'MeanMed','S1',ft));
print('Data Sentinel-1 pada '+ Tgl_Fase[0] +'-' +  Tgl_Fase[1]  + ':',S1);
// Get 3 data utk dihitung slope/trendnya utk deteksi fase Vegetatif (Trend +) 
//& Fase Generatif (Trend -)
for (k=p1; k < 3+p1; k++) {
TglPrd3 = Tgl_Prd[k];
print('Cek Tgl yg dipilih : ',TglPrd3);
S1_3[k]= (Pilih_S1(TglPrd3,'','VH-VV','MeanMed','RPI',ft)).rename('RPI_' + (k+1));   
}
// Hitung Trend/Slope : Lama
S1_3 = ee.Image.cat(S1_3); 
//dPI = S1_3.select('RPI_3').subtract(S1_3.select('RPI_3')).rename('dPI');
Trend = Citra.Slop3(S1_3,'n');
S1 = S1.addBands(Trend); S1_3 = [];
print('Trend',S1);
Fase_S1 = Citra.Det1Fase_S1(S1,'Slope',Air_Th,Bera_Th).focal_mode();
Map.clear(); 
//Map.addLayer(L8.clip(ft),VisRGB_L8,'RGB L8 '+ Tgl_Fase[1],0);
Map.addLayer(S2.clip(ft).mask(Mask),VisRGB_S2,'RGB S2 '+ Tgl_Fase[1],0);
Map.addLayer(S1.clip(ft).mask(Mask),VisRGB_S1,'RGB S1 '+ Tgl_Fase[1],0);
Map.addLayer(S2.select('SCL').clip(ft).mask(Mask),Vis_SCL,'Penutup Lahan S2 '+ Tgl_Fase[1],0);
Map.addLayer(Fase_S1.clip(ft).mask(Mask),VisFase,'Fase S1 '+ Tgl_Fase[1]);
// Map.addLayer(Shp_Kab, {color : '00ffff'},'Kabupaten',0,0.7);
Map.addLayer(ee.Image().toByte().paint(Shp_Kab, 0, 1), {palette : '000000'},'Batas Kabupaten');
Map.addLayer(ee.Image().toByte().paint(ft, 0, 2), {palette : 'red'},'Batas Provinsi');
//var LegendaFase = Legenda('Fase Tanaman',PrdList[IdxPrd][0],Nama_Fase_Kls,Fase_palette,7); 
var LegendaFase = Legenda('Crop Phase',Tgl_Fase[1],Nama_Fase_Kls,Fase_palette,7); 
Map.add(LegendaFase);Map.setControlVisibility(1);
  }
  );
Btn_Save.onClick(
  function() {
  var NoP = IdxPrd+1; if (NoP < 10)NoP = '0' + NoP;
  VisRGB = VisRGB_S2;
  // Provinsi harus dipilih, jk tdk dipilih defaultnya Jabar
  if (NamPrvPil === '') {NamPrvPil = 'Jawa_Barat'; Bts1Prv = ee.Geometry.Rectangle(Bts_Prv[12]);}
  var RGB_S2 = S2.visualize(VisRGB), RGB_S2Out = 'RGBS2_'+ Thn + '_p' + NoP + '_' +  NamPrvPil;   
  var RGB_S1 = S1.visualize(VisRGB_S1), RGB_S1Out = 'RGBS1_'+ Thn + '_p' + NoP + '_' +  NamPrvPil;  
  var Fase_Prv = Fase_S1.clip(ft).mask(Mask), Fase_Out = 'FaseS1_'+ Thn + '_p' + NoP + '_' +  NamPrvPil;
  SaveImg2Drv(Fase_Prv,Fase_Out,10,Bts1Prv,ft,'','Byte');  
  SaveImg2Drv(RGB_S1,RGB_S1Out,10,Bts1Prv,ft,'','Byte');  
  SaveImg2Drv(RGB_S2,RGB_S2Out,10,Bts1Prv,ft,'','Byte');  
  //SaveImg2Ast(RGB_S1,RGB_S1Out,10,Bts1Prv,ft,'','Byte'); 
  }
  );
  // FUNGSI2
  function Pilih_L8(TglRange,PilBnd,Komp,Nama) {
    var Tgl1 = ee.Date(TglRange[0]),Tgl2 = ee.Date(TglRange[1]);
    var L8 = L8_SR
    .filterDate(TglRange[0],TglRange[1])
    .map(Citra.MskAwan_L8).map(Citra.AddIdx_L8)
   .set("system:time_start",Tgl1).set("system:time_end",Tgl2)
    ;
    L8 = Citra.Komposit(L8,Komp);
    if (Nama !=='')L8 =L8.set('name',Nama+ '_' + TglRange[0]);
    return L8.select(PilBnd)//.copyProperties(L8_SR, ["system:time_start","system:time_end"])
    ;
  }
// SENTINEL-2 TOA
function Pilih_S2(TglRange,PilBnd,Komp,Nama) {
  var S2 = S2_TOA.filterDate(TglRange[0],TglRange[1]).map(Citra.MskAwan_S2).map(Citra.AddIdx_S2);
if (Komp !== '') S2 = Citra.Komposit(S2,Komp);
if (Nama !== '') S2 = S2.set({name:Nama + '_' + TglRange[0]}).set("system:time_start",TglRange[0])
.set("system:time_end",TglRange[1]); 
return S2.select(PilBnd);
}
// SENTINEL-2 SURFACE REFLECTANCE
function Pilih_S2k(TglRange,PilBnd,Komp,Nama) {
  var S2 = S2_SR.filterDate(TglRange[0],TglRange[1]).map(Citra.MskAwan_S2k).map(Citra.AddIdx_S2);
if (Komp !== '')  S2 = Citra.Komposit(S2,Komp);
if (Nama !== '') S2 = S2.set({name:Nama + '_' + TglRange[0]}).set("system:time_start",TglRange[0])
.set("system:time_end",TglRange[1]); 
return S2.select(PilBnd);
}
// SENTINEL-1
function Pilih_S1(Tgl_Range,Pass,PilBnd,Komp,Nama,roi) {
var S1 =  S1_GRD
.filterDate(Tgl_Range[0],Tgl_Range[1])
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
.filter(ee.Filter.eq('instrumentMode', 'IW'))
.map(Citra.KorIncAngl)
.map(Citra.RemNoBord)
/*
.map(function(Img){
  var VV_Lee = Citra.RefinedLee(Img.select('VV_Cor')).rename('VV_Lee');
  var VH_Lee = Citra.RefinedLee(Img.select('VH_Cor')).rename('VH_Lee');
  return Img.addBands(VH_Lee).addBands(VV_Lee);
}
   ) */
.map(Citra.AddIdx_S1);
if (Pass == 'DSC') S1 = S1.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
if (Pass == 'ASC') S1 = S1.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
if (Nama !== '') S1 = S1.set({name:Nama + '_' + Tgl_Range[0]}).set("system:time_start",Tgl_Range[0])
.set("system:time_end",Tgl_Range[1]); 
if (roi !== '') S1 = S1.filterBounds(roi);
//S1 = Citra.Pilih_S1_Komp(S1,'MeanMed');
if (Komp !== '') S1 = Citra.Pilih_S1_Komp(S1,Komp);
if (PilBnd !=='') S1 = S1.select(PilBnd);
//return (S1.select('VV_Lee','VH_Lee','VH-VV','MeanBS','NDPI','RPI'));
return S1;
}
// Simpan Img ke Asset
function SaveImg2Ast(ImgIn,ImgOut,Sc,Bts,Clip,KoefKon,TypOut) {
var ImgIn2 = ImgIn;
if (Clip !== '') ImgIn2 = ImgIn.clip(Clip);
if (KoefKon !== '') { if (KoefKon == 'Vis') ImgIn2 = ImgIn2.visualize(VisRGB); 
else ImgIn2 = ImgIn2.multiply(KoefKon[1]).add(KoefKon[0]); 
  if (TypOut == 'U16') ImgIn2 = ImgIn2.toUint16(); 
  else if (TypOut == 'S16') ImgIn2 = ImgIn2.toInt16(); else ImgIn2 = ImgIn2.toByte();  
}
Export.image.toAsset({
  image:ImgIn2,
  description: ImgOut,
  //folder : 'LBS_Kls30m',
  assetId: ImgOut,
  scale: Sc,
  maxPixels: 1e13,
  region: Bts,
 });
 }
function SaveImg2Drv(ImgIn,ImgOut,Sc,Bts,Clip,KoefKon,TypOut) {
var ImgIn2 = ImgIn;
if (Clip !== '') ImgIn2 = ImgIn.clip(Clip);
if (KoefKon !== '') { if (KoefKon == 'Vis') ImgIn2 = ImgIn2.visualize(Vis2RGB); 
else ImgIn2 = ImgIn2.multiply(KoefKon[1]).add(KoefKon[0]); 
  if (TypOut == 'U16') ImgIn2 = ImgIn2.toUint16(); 
  else if (TypOut == 'S16') ImgIn2 = ImgIn2.toInt16(); else ImgIn2 = ImgIn2.toByte();  
} 
  Export.image.toDrive({ 
  image:ImgIn2,
  description:ImgOut,
  scale: Sc, 
  maxPixels: 1e13,
  region: Bts});
}
function BtsPrv() {
var Batas_Prov = [
[94.972336,6.077241,98.287292,1.976846],[97.058762,4.30419,100.643311,-0.638271],[98.596176,0.908519,101.886116,-4.01639],
[100.053658,2.529452,103.813889,-1.121101],[101.122696,-0.746249,104.489548,-2.770429],[101.025993,-2.277211,103.781303,-5.51512],
[102.063423,-1.6299,106.221024,-4.95982],[103.593361,-3.727249,106.11158,-6.168612],[103.285065,4.795834,109.167427,-0.866396],
[105.108459,-0.908888,108.716316,-3.803609],[106.390274,-5.201668,106.973068,-6.37674],[105.099998,-5.807498,106.775948,-7.016391], // 10 Banten
[106.370407,-5.91444,108.830612,-7.821099],[108.555428,-5.725279,111.692879,-8.212777],[110.009048,-7.543099,110.837929,-8.204723],
[110.898346,-5.042778,116.27079,-8.780645],[114.431114,-8.06111,115.712502,-8.849445],[115.820137,-6.55222,119.347221,-9.110002], // 16 - 19
[118.926941,-7.777499,125.18898,-11.009721],[108.59861,2.082131,114.204193,-3.068059],[110.733887,0.793241,115.847198,-3.54472],[110.733887,0.793241,115.847198,-3.54472], // 20-23, 22/23 Kalsel berulang
[114.351067,-1.302411,117.458748,-5.102222],[113.838081,3.443534,119.037079,-2.542598],[114.587616,4.40325,117.966667,1.086809], // 24 -26
[118.756668,-0.860949,119.909172,-3.570556],[117.650551,-1.884479,122.222504,-7.495834],[119.422493,1.374653,124.033707,-3.640521],
[121.162033,1.040832,123.524139,0.305911],[120.86528,-2.77362,124.616943,-6.213333],[123.113907,5.5662,127.163696,0.291731],
[124.143608,2.64556,129.657364,-2.477779],[125.721909,-2.725555,134.90834,-9.031908],[134.205246,-0.206099,141.011765,-9.118333],
[128.910309,1.081351,135.25766,-4.328449]
];
return Batas_Prov;
}
function BtsPlu() {
var Batas_Plu = [
[94.972336,6.077241,109.167427,-0.866396],[105,-5.5,116.27079,-8.780645],[108.759260,-4.322264,119.240217,-4.322264],
[117.997539,2.046538,125.182598,-6.835678],[115.756277,-7.4309423,127.632498,-11.019763],[124.232968,2.882579,141.074145,-9.152472]
];
return Batas_Plu;
}
function GetPrd(Prd1,JumPrd,Prd) {
 // Prd1 : Periode yg mau dianalisis
 // JumPrd : jum prd sblmnya utk perubahan
 // Prd : dasarian,15 harian, bulanan, x bulan, tahunan
}
function Legenda(Titel1,Titel2,NamKls,Palet,JumKls){
var legend = GUI.PosPanel('LL','8px 15px');
var legendTitle1 = GUI.Lbl(Titel1,16,'black','0 0 4px 0','bold','');
var legendTitle2 = GUI.Lbl(Titel2,14,'black','0 0 4px 0','bold','');
legend.add(legendTitle1).add(legendTitle2);
for (i = 0; i < JumKls; i++) {
 legend.add( Box1War(Palet[i], NamKls[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)  
// Map.add(legend);  
return legend;
}
function Box1War(color, name) {
var colorBox = GUI.WarnaBox(color,8);
// Create the label filled with the description text.
    var description = GUI.Lbl(name,12,'black','0 0 4px 6px','bold','',color,8);   
// return the panel
return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
}
function FiltData(Sat,TglRange,AOI) {
var Id,ImgCol ;
if (Sat == 'L8r') Id = L8_SR ;
if (Sat == 's2') Id = S2_TOA ;
if (Sat == 's2k') Id = S2_SR;
if (Sat == 's1') Id = S1_GRD;
if (Sat == 'CHRP1')Id = 'UCSB-CHG/CHIRPS/DAILY/' ;
if (Sat == 'GSMAP')Id = 'JAXA/GPM_L3/GSMaP/v6/operational/';
ImgCol = (Id).filterDate(TglRange[0],TglRange[1]);
if (AOI != 't' || AOI != 'T' ) ImgCol = ImgCol.filterBounds(AOI);
return (ImgCol);
}