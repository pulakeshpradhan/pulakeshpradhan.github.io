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
    Indo18_Kab = ui.import && ui.import("Indo18_Kab", "table", {
      "id": "users/rarasati/SHP2018/SHP_ProvKabKot_2018"
    }) || ee.FeatureCollection("users/rarasati/SHP2018/SHP_ProvKabKot_2018"),
    ModFs_2020145_JwBl = ui.import && ui.import("ModFs_2020145_JwBl", "image", {
      "id": "users/salmanddd14/Img/ModFase_1452020_jwbl"
    }) || ee.Image("users/salmanddd14/Img/ModFase_1452020_jwbl"),
    Indo_Kc = ui.import && ui.import("Indo_Kc", "table", {
      "id": "users/salmanddd14/shp/Indo10_Kc"
    }) || ee.FeatureCollection("users/salmanddd14/shp/Indo10_Kc"),
    DI_Rentang = ui.import && ui.import("DI_Rentang", "table", {
      "id": "users/salmanddd14/shp/DI_Rentang"
    }) || ee.FeatureCollection("users/salmanddd14/shp/DI_Rentang"),
    Jln_Indo = ui.import && ui.import("Jln_Indo", "table", {
      "id": "users/gilangaulia1707226/Ruas_Jalan_Indo"
    }) || ee.FeatureCollection("users/gilangaulia1707226/Ruas_Jalan_Indo");
// *** IMPLEMENTASI MODEL PAJALE UNTUK PEMETAAN FASE
//$$$$$$$ Created By Dr Ir Dede Dirgahayu Domiri, M.Si
var Waktu = require('users/salmanddd14/AFungsi:Waktu.js');
var GUI = require('users/salmanddd14/AFungsi:GUI_GEE.js');
var Citra = require('users/salmanddd14/AFungsi:OlhCitra.js');
var Admin = require('users/salmanddd14/AFungsi:AreaName.js');
var LBS = require('users/dededirgahayu11/LBS:LBS_BPN2019.js'); 
var LBS_ed = require('users/dededirgahayu11/Fungsi:DD_LBS2019.js');
var FeaTxt = require('users/dededirgahayu11/Fungsi:DD_FeaText.js');
var Grid_Indo = FeaTxt.GridIndo_1(); // Grid 1 Deg
var BtsGeom = require('users/dededirgahayu11/Fungsi:DD_BtsGeom.js');
var BtsPlu_10m = BtsGeom.BtsPlu10m(); // Bts Pulau utk Resolusi 10 m
//var Batas = require('users/amirotulbahiyah/sc_jagung:Batas.js');
var LBS_Pulau = LBS.LBSPulau(0),LBS_Prv = ee.List(LBS.LBS19()),Pilih_Pulau=0,Pilih_Prv=1,NamPrvPil;
var WADMPR = Admin.NamProv(1), Pulau_Prv = Admin.PulauProv(), PilPrv = Admin.PilihProv(),Bts_Plu=Admin.BatasPlu(),
Shp_Adm = Admin.ShpAdmin('All'); 
var Thn1,Thn,Bln,Tgl,Tgl_Prd=[],Pd,Prd,Prd1,IdxPrd,ThnT,BlnT,TglT,Judul,JumLBS,Period,Periode,Tgl_Range,
PrdList,PrdList1,i,j,k,Img_S1,Img_S2,NamPrv,BtsPrv,BtsArea,Fase,Shp,Swh,NamPrvPil,RGB_S2,RGB_S1,dPI,
RGB_L8,Fase_S2,Fase_S1,TS_S1,TS_S2,Padi,Padi2,L8,S2,S1,Shp_Kab,VisRGB,Air_Th,Bera_Th,Veg_Th,Mask,
S1_3 =[],TglPrd3,Trend,RPISlop,Bts_Plu=BtsPlu(),AOI,Pilih,
Vis_FaseModis = {min:1,max:7,palette : ['0000ff', '00ff00','00cc00','dede00','ffff00','ef9f00','aaaaaa']}
;
var Bts_Subang = ee.Geometry.Rectangle([107.5,-6.17, 107.96,-6.82]), 
 Bts_Indo = ee.Geometry.Rectangle([92,8, 142,-11]), JumKab;
var Nama_Fase_Kls = ['Water','Veg1','Veg2','Gen1','Gen2','Bare','Non Paddy/Data'],
Nama_Fase1_Kls = ['Water','Vegetative','Generative','Bare','Cloud/No Data'],NamKls=[];
var Fase_palette = ['0000ff','88FF00','00aa00','eedd00','ffff44','d28d4f','9e9e9e'], 
Palet4= ['0000ff','88FF00','ffff44','d28d4f','9e9e9e'], Palet=[],
Palet8= ['ffffff','0000ff','88FF00','00aa00','eedd00','ffff44','d28d4f','9e9e9e','ee00ee','ee0000','444444'],
Palet6= ['ffffff','0000ff','44cc00','ffff44','d28d4f','9e9e9e','ee00ee','ee0000','ee00ee','ee0000','444444'];
var VisFase1 = {min:1,max:8,palette:['blue','88ff00', 'green','888800', 'yellow','ffddaa','red','dedede']};
var VisFase = {min:1,max:7,palette:Fase_palette},FaseVis,FaseTampil, JumKls,Tampil,Tampil2,
VisFase4 = {bands:'Fase',min:1,max:5,palette: Palet4},VisFase_LayO = {bands:'Fase',min:1,max:10,palette: Palet8},
VisFaseS1_LayO = {bands:'Fase',min:0,max:10,palette: Palet8},VisFaseS2_LayO = {bands:'Fase',min:0,max:10,palette: Palet6};
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
Bnd_S2k = ['B.*','NDBI','EVI','NDWI','SCL'], // SR terkoreksi atmosfir
Bnd_S2Pilih = ['B2','B3','B4','B5','B6','B7','B8','B8A','B11','B12','NDBI','EVI','NDWI'];
/* var Bnd_S1 = ['VV_Lee','VH-VV','VV-VH','MeanBS','VH_Lee','NDPI'],
BndRGB_S1 = ['VV_Lee','VH-VV','VV-VH']; */
var Bnd_S1 = ['VV_Cor','VH-VV','VV-VH','MeanBS','VH_Cor','RPI'],
BndRGB_S1 = ['VV_Cor','VH-VV','VV-VH']
;
//Batas Prov 
var Bts_Prv = BtsPrv(),Bts1Prv;
AOI = ee.Geometry.Rectangle(Bts_Prv[12]); // AOI def = Jawa Barat
var i,ft,NamProv,PrvId,ListProv = [], Jam,HariniTxt,TglRange=[] ;
var Harini = Waktu.TglNow('WIB');  Thn1 = Thn-1;
HariniTxt = Waktu.Date2Tgl(Harini);
Jam =  Harini.get('hour').getInfo() + ':' + Harini.get('minute').getInfo() + ':' + Harini.get('second').getInfo();
var HariniTxtInfo = HariniTxt + 'T' + Jam, ExDatS1,ExDatS2;
var Pre6Bln = Waktu.DifTglNow(-6,'month'); TglRange = [Pre6Bln,HariniTxt];
 print('Info : ' + HariniTxtInfo,'6 Bulan sblmnya ' + TglRange); 
 ExDatS1 = Citra.ListImgId(FiltData('s1',TglRange,AOI)).sort(); 
 ExDatS2 = Citra.ListImgId(FiltData('s2k',TglRange,AOI)).sort();
print('Ketersediaan Data Sentinel-1 di Jawa Barat dari '  +  Pre6Bln + ' : ',ExDatS1);
print('Ketersediaan Data Sentinel-2 di Jawa Barat dari '  +  Pre6Bln + ' : ',ExDatS2);
//=================Dasarian/15 harian atau Period==============================
Thn = 2021; Thn1 = Thn-1; Pd = 15;  // Pd bisa diganti : 5,10,15,30 
FaseTampil ='S1' ; 
if(FaseTampil == 'S2') { FaseVis = VisFase4 ; NamKls = Nama_Fase1_Kls; Palet = Palet4 ; JumKls=5; Tampil=1; Tampil2=0 }
else { FaseVis =VisFase ; NamKls = Nama_Fase_Kls;  Palet = Fase_palette; JumKls=7; Tampil=0; Tampil2=1}
Prd = Waktu.TglPrd(Thn,Pd,1);PrdList = Waktu.TglPrd(Thn,Pd,2);
  print('Tgl ' + Pd + ' Harian : ',PrdList);
var Pulau = {'Sumatera':1,'Jawa_Bali':2,'NTB_NTT':3,'Kalimantan':4,'Sulawesi':5,'Maluku':6,'Papua':7},
Nama_Pulau = ['Sumatera','Jawa_Bali','NTB_NTT','Kalimantan','Sulawesi','Maluku','Papua'],NamaPulau,
Plu,PluId
;
if (Pd == 10 || Pd ==15) Pilih = Waktu.PilihPrd(Pd); else Pilih = PrdList;
Air_Th = -19.25; Bera_Th = -12.5; // Berdasarkan VH
Map.setCenter(106.7888, -6.5717,9);
//var Grid_Indo = GridTile(92,8,142,-11,1,1);
// Buat UI
var Judul = 'SENTINEL for AGRICULTURAL CROP',
Author = 'by Dr Dede Dirgahayu, M.Si, Pusfatja LAPAN'
;
var TB_Thn = GUI.TxtBnm(Thn,'Tgl Awal',10,'red',200,55,''),
    TB_Prd = GUI.TxtB(1,'Tgl Awal',10,'red','-33px 0 0 210px',200,40,''),
    Lbl_App = GUI.Lblnm(Judul,15,'#00DD00','bold','center'),
    Lbl_Author = GUI.Lbl(Author,12,'blue','0 0 0 12px','bold','center'),
    TB_Pd = GUI.TxtB(Pd,'Periode',10,'red','-27px 0 0 70px',200,40,''),
    PilPeriod = GUI.Pilih(Pilih,'Select Period',13,'0000DD','-27px 0px 0px 115px','bold',120,""),
    PilProv = GUI.Pilih(PilPrv,'Select Province',13,'DD0000','8px 10px 0px 8px','bold',120,""),
    PilPulau = GUI.Pilih(Pulau,'Pilih Pulau',13,'00DD00','-28px 10px 0px 130px','bold',120,""),
HariniLbl = GUI.Lbl(HariniTxt,12,'#0000dd','-53px 0px 0px 135px',200,120,""),
Btn_Pros = GUI.CmdBtn1('START PROCESSING !',14,'DD0000','dddddd','10px 10px 0px 8px','bold',110,'center',4,
'2px dashed #ff0000'), 
Btn_Save = GUI.CmdBtn1('SAVE RESULT',14,'0000DD','dddddd','-41px 10px 0px 155px','bold',120,'center',4,
'2px dashed #ff0000'),
Panel = ui.Panel()
;
var SimLay = 'y',ResOut,SimWarna='n';
Panel.style().set('width', '275px');
var intro = ui.Panel([Lbl_App,Lbl_Author,TB_Thn,TB_Prd,PilPeriod,TB_Pd,PilProv,PilPulau,Btn_Pros,Btn_Save
  ]);
Panel.add(intro);ui.root.insert(0, Panel);
function GUI_Chg() {
Thn = TB_Thn.getValue(); Thn1 = Thn-1; Pd = TB_Pd.getValue();
Prd = Waktu.TglPrd(Thn,Pd,1);PrdList = Waktu.TglPrd(Thn,Pd,2);
Prd1 = Waktu.TglPrd(Thn1,Pd,1);PrdList1 = Waktu.TglPrd(Thn1,Pd,2);
Periode = Pilih[PilPeriod.getValue()];  //IdxPrd = Waktu.GetIdxPrd(Pilih[Periode]);
IdxPrd = Periode-1;
return 1; 
  }
TB_Thn.onChange(
  function () {
  Thn = TB_Thn.getValue(); Thn1 = Thn-1;
 // print(Thn);
 Prd = Waktu.TglPrd(Thn,Pd,1);PrdList = Waktu.TglPrd(Thn,Pd,2);
 } );
 TB_Pd.onChange(
  function () {
Thn = TB_Thn.getValue(); Thn1 = Thn-1; Pd = TB_Pd.getValue();
Prd = Waktu.TglPrd(Thn,Pd,1);PrdList = Waktu.TglPrd(Thn,Pd,2);
Prd1 = Waktu.TglPrd(Thn1,Pd,1);PrdList1 = Waktu.TglPrd(Thn1,Pd,2);
Periode = Pilih[PilPeriod.getValue()];  //IdxPrd = Waktu.GetIdxPrd(Pilih[Periode]);
IdxPrd = Periode-1;
 } );
//print(PilPeriod.items())
PilPeriod.onChange(
  function (key) {
var Cek = parseInt(key, 9);
//  PilPeriod.items().set(Object.keys,PrdList);
Thn = TB_Thn.getValue(); Thn1 = Thn-1; Pd = TB_Pd.getValue();
Prd = Waktu.TglPrd(Thn,Pd,1);PrdList = Waktu.TglPrd(Thn,Pd,2);
Prd1 = Waktu.TglPrd(Thn1,Pd,1);PrdList1 = Waktu.TglPrd(Thn1,Pd,2);
Periode = Pilih[PilPeriod.getValue()];  //IdxPrd = Waktu.GetIdxPrd(Pilih[Periode]);
IdxPrd = Periode-1; TB_Prd.set('value',Periode);
 //print('Periode ' + Periode,Pilih[Periode])
 //print((IdxPrd) + ':' + PrdList[IdxPrd]);
  }
  );
PilProv.onChange(
  function (key) {
  var Cek = parseInt(key, 9);
 Pilih_Pulau = 0; Pilih_Prv =1; 
NamPrvPil = PilProv.getValue(); PrvId = PilPrv[NamPrvPil];
 NamPrv = WADMPR[PrvId-1]; 
 print((PrvId ) + " : " + NamPrvPil + '/'+NamPrv);
 Shp_Kab=Shp_Adm[1].filter(ee.Filter.eq('NAMA_PROV',NamPrv));
 ft = Shp_Adm[0].filter(ee.Filter.eq('PRV_ID',PrvId));
 Map.centerObject(ft,9);
//  ft = Indo_Prv.filter(ee.Filter.eq('WADMPR',NamPrv));
Bts1Prv =  ee.Geometry.Rectangle(Bts_Prv[PrvId-1]);  
 Mask = ee.Image(LBS_Prv.get(PrvId-1));  
 if (PrvId==14 || PrvId==16){ Mask = Mask.addBands(ee.Image(LBS_Prv.get(PrvId)));
// Pilih Jawa Tengah, Yogya Masuk
Mask=Mask.reduce(ee.Reducer.max()).rename('Mask');
var Shp_Kab2 = Shp_Adm[1].filter(ee.Filter.eq('NAMA_PROV',WADMPR[PrvId])); 
var ft2 = Shp_Adm[0].filter(ee.Filter.eq('PRV_ID',PrvId+1));
Shp_Kab = Shp_Kab.merge(Shp_Kab2); ft = ft.merge(ft2);
 }
  }
  );
PilPulau.onChange(
  function (key) {
  var Cek = parseInt(key, 9);
Pilih_Pulau = 1; Pilih_Prv = 0; 
Plu = PilPulau.getValue(); PluId = Pulau[Plu] - 1;
// print((PrvId + 1) + " : " + NamPrvPil);
NamaPulau = Nama_Pulau[PluId]; NamPrvPil = Plu;
// ft=Shp_Adm[0].filter(ee.Filter.eq('NAMA_PULAU',NamaPulau));
 ft = BtsPlu_10m[PluId];
 Shp_Kab = Shp_Adm[1].filter(ee.Filter.inList('NAMA_PROV',Pulau_Prv[PluId]));
Mask = LBS_Pulau[PluId];  
Bts1Prv =  ee.Geometry.Rectangle(Bts_Plu[PluId]); 
Map.centerObject(ft,9);
  }
  );
Btn_Pros.onClick(
  function() {
Thn = TB_Thn.getValue(); Thn1 = Thn-1; Pd = TB_Pd.getValue();
Prd = Waktu.TglPrd(Thn,Pd,1);PrdList = Waktu.TglPrd(Thn,Pd,2);
Prd1 = Waktu.TglPrd(Thn1,Pd,1);PrdList1 = Waktu.TglPrd(Thn1,Pd,2);
Periode = Pilih[PilPeriod.getValue()]; // IdxPrd = Waktu.GetIdxPrd(Pilih[Periode]);
IdxPrd = Periode-1;  
Map.centerObject(Bts1Prv,9);
var Idx,Tgl_Fase,Pil,p1; 
Pil=4; Tgl_Fase = Tgl_Prd[Pil]; p1=Pil-2;
Tgl_Fase = PrdList[IdxPrd]; ft = Bts_Indo;
//S2 = ee.Image(Pilih_S2k(Tgl_Fase,Bnd_S2k,'Qual','S2',Bts1Prv));
S2 = ee.Image(Pilih_S2k(Tgl_Fase,Bnd_S2k,'Qual','S2',Bts_Indo));
var S2_Pre6 = ee.Image(Pilih_S2k(TglRange,Bnd_S2k,'Qual','S2',Bts_Indo)),
EVI_Max = S2_Pre6.select('EVI');
S1 = ee.Image(Pilih_S1(Tgl_Fase,'',Bnd_S1,'MeanMed','S1',Bts_Indo));
//print('Data Sentinel-1 Tgl '+ Tgl_Fase[0] +'-' +  Tgl_Fase[1]  + ':',S1);
// Get 3 data utk dihitung slope/trendnya utk deteksi fase Vegetatif (Trend +) 
//& Fase Generatif (Trend -). Sblmnya hrs proses Ganti awan dulu
var S2_3=[],Trend_S2,SCL_3=[];
for (k=0; k < 3; k++) {
Idx = IdxPrd-k; 
if (Idx >= 0) TglPrd3 = PrdList[Idx]; else TglPrd3 = PrdList1[12*(30/Pd) + Idx];
S1_3[2-k]= (Pilih_S1(TglPrd3,'','VH-VV','MeanMed','RPI',Bts_Indo)).rename('RPI_' + (2-k+1));   
S2_3[2-k]= ee.Image(Pilih_S2k(TglPrd3,'EVI','Qual','S2',Bts_Indo)).rename('EVI_' + (2-k+1));
SCL_3[2-k]= ee.Image(Pilih_S2k(TglPrd3,'SCL','Qual','S2',Bts_Indo)).rename('SCL_' + (2-k+1));  
} 
// Hitung Trend/Slope 
S1_3 = ee.Image.cat(S1_3);   S2_3 = ee.Image.cat(S2_3); SCL_3 = ee.Image.cat(SCL_3);
var GantiS2 = GantiAwan(S2_3), GantiSCL = GantiAwan(SCL_3); 
//dPI = S1_3.select('RPI_3').subtract(S1_3.select('RPI_3')).rename('dPI');
Trend = Citra.Slop3(S1_3,'n'); Trend_S2 = Citra.Slop3(GantiS2,'n');
S1 = S1.addBands(Trend); S1_3 = [];  print('Trend',S1);
S2 = S2.select(Bnd_S2k); S2_3=[]; SCL_3=[];
var SCL = GantiSCL.select('SCL_3').rename('SCL'); SCL = SCL.addBands(Trend_S2).addBands(GantiS2).mask(SCL);
Fase_S1 = Citra.Det1Fase_S1(S1,'Slope',Air_Th,Bera_Th).focal_mode();
var TglFase = Tgl_Fase[0].slice(0,7)+"_" + Tgl_Fase[0].slice(8,10) + "-" + Tgl_Fase[1].slice(8,10);
var Fase_S2 = Fase1_S2(SCL).clip(ft).mask(Mask); print('Fase_S2',Fase_S2);
Map.clear(); 
//var FaseS1_LayO = RedRes_img(FaseS1_LayO,150,'Mod'); 
//print ('FaseS1_LayO',FaseS1_LayO);
var FaseS1_LayO = Fase_S1.mask(Mask).addBands(Feat2Img(Shp_Kab, 8, 1)).addBands(Feat2Img(ft, 9, 2))
.addBands(Feat2Img(Grid_Indo, 10, 1));
//var FaseS2_LayO = RedRes_img(FaseS2_LayO,150,'Mod'); 
var FaseS2_LayO = Fase_S2.mask(Mask).addBands(Feat2Img(Shp_Kab, 8, 1)).addBands(Feat2Img(ft, 9, 2))
.addBands(Feat2Img(Grid_Indo, 10, 1));
FaseS1_LayO =FaseS1_LayO.reduce(ee.Reducer.max()).rename('Fase');
FaseS2_LayO =FaseS2_LayO.reduce(ee.Reducer.max()).rename('Fase');
print('Test Lay S2',FaseS2_LayO);
Save2drv(FaseS2_LayO,'FaseS2_'+TglFase+ "_" + NamPrv,150,'01_Fase',Bts1Prv);
Save2drv(FaseS1_LayO,'FaseS1_'+TglFase+ "_" + NamPrv,150,'01_Fase',Bts1Prv);
Save2drv(Vis(FaseS2_LayO.unmask(0),VisFaseS2_LayO),'FaseS2L_'+TglFase+ "_" + NamPrv,150,'01_Fase',Bts1Prv);
Save2drv(Vis(FaseS1_LayO.unmask(0),VisFaseS1_LayO),'FaseS1L_'+TglFase+ "_" + NamPrv,150,'01_Fase',Bts1Prv);
var FaseS1,FsS1,FaseS2,FsS2; 
if (Pilih_Prv==1) {
//FsS1=downloadImg(FaseS1_LayO,"",150,Bts1Prv,'FaseS1_'+ TglFase + "_" + NamPrv,'Download Grey');
//FaseS1=downloadImg(FaseS1_LayO,VisFase_LayO,200,Bts1Prv,'FaseS1_'+ TglFase + "_" + NamPrv,'Download Color');
//FsS2=downloadImg(FaseS2_LayO,"",150,Bts1Prv,'FaseS2_'+ TglFase + "_" + NamPrv,'Download S2 Grey');
//FaseS2=downloadImg(FaseS2_LayO.unmask(0),VisFaseS2_LayO,200,Bts1Prv,'FaseS2_'+ TglFase + "_" + NamPrv,'Download S2 Color');
}
//Map.addLayer(L8.clip(ft),VisRGB_L8,'RGB L8 '+ Tgl_Fase[1],0);
Map.addLayer(S2.clip(ft).select(Bnd_S2Pilih).clip(ft).mask(Mask),VisRGB_S2,'RGB S2 '+ TglFase,0);
Map.addLayer(SCL.clip(ft).mask(Mask),{},'SCL & 3 EVI S2 '+ TglFase,0);
Map.addLayer(Fase_S2,VisFase4,'Fase S2 '+ TglFase,Tampil);
Map.addLayer(S1.clip(ft).mask(Mask),VisRGB_S1,'RGB S1 '+ TglFase,0);
Map.addLayer(Fase_S1.mask(Mask),VisFase,'Fase S1 '+ TglFase,Tampil2); 
//Map.addLayer(ModFs_2020145_JwBl.clip(ft),Vis_FaseModis,'Fase MODIS 24-31 Mei 2020');
// Map.addLayer(Shp_Kab, {color : '00ffff'},'Kabupaten',0,0.7);
Map.addLayer(Feat2Img(Indo_Kc, 8, 1), {min:8,max:8,palette : '000000'},'Batas Kecamatan');
Map.addLayer(Feat2Img(Shp_Kab, 8, 2), {min:8,max:8,palette : '880088'},'Batas Kabupaten');
Map.addLayer(Feat2Img(ft, 9, 3), {min:9,max:9,palette : 'red'},'Batas Provinsi');
//Map.addLayer(Feat2Img(Bts1Prv, 3, 2), {palette : 'blue'},'Batas Area');
Map.addLayer(Grid_Indo,{},'Grid Tiles');
Map.addLayer(Jln_Indo,{color : 'red'},'Primary Road');
//var LegendaFase = Legenda('Fase Tanaman',PrdList[IdxPrd][0],Nama_Fase_Kls,Fase_palette); 
var LegendaFase = GUI.Legenda('Crop Phase',TglFase,NamKls,Palet); 
Map.add(LegendaFase);Map.setControlVisibility(1);
if (SimLay == 'y') {SimWarna='y'; ResOut=100 } else ResOut=10;     
  }
  );
Btn_Save.onClick(
  function(SimLay) {
  var NoP = IdxPrd+1; if (NoP < 10)NoP = '0' + NoP;
  VisRGB = VisRGB_S2;
  // Provinsi harus dipilih, jk tdk dipilih defaultnya Jabar
  if (NamPrvPil === '') {NamPrvPil = 'Jawa_Barat'; Bts1Prv = ee.Geometry.Rectangle(Bts_Prv[12]);}
  var RGB_S2 = S2.visualize(VisRGB), RGB_S2Out = 'RGBS2_'+ Thn + '_p' + NoP + '_' +  NamPrvPil;   
  var RGB_S1 = S1.visualize(VisRGB_S1), RGB_S1Out = 'RGBS1_'+ Thn + '_p' + NoP + '_' +  NamPrvPil;  
  var Fase_Prv = Fase_S1.clip(ft).mask(Mask), Fase_Out = 'FaseS1_'+ Thn + '_p' + NoP + '_' +  NamPrvPil;
  print('LayOut S1',Fase_Prv);
  var FaseS2_Prv = Fase_S2, FaseS2_Out = 'FaseS2_'+ Thn + '_p' + NoP + '_' +  NamPrvPil;
  print('LayOut S2',FaseS2_Prv);
  if(SimLay=='y') {Fase_Prv =  Fase_Prv.addBands(Feat2Img(Shp_Kab, 8,2))
  .addBands(Feat2Img(ft, 9, 3)); FaseS2_Prv =  FaseS2_Prv.addBands(Feat2Img(Shp_Kab, 8,2))
  .addBands(Feat2Img(ft, 9, 3)); 
  Fase_Prv =  Fase_Prv.reduce(ee.Reducer.max()).rename('Fase');
  FaseS2_Prv =  FaseS2_Prv.reduce(ee.Reducer.max()).rename('Fase');
  if (SimWarna=='y'){Fase_Prv =  Fase_Prv.visualize(VisFase_LayO); FaseS2_Prv =  FaseS2_Prv.visualize(VisFaseS2_LayO); }
  }
  SaveImg2Drv(Fase_Prv,Fase_Out,ResOut,Bts1Prv,ft,'','Byte','01_Fase');
  SaveImg2Drv(FaseS2_Prv,FaseS2_Out,ResOut,Bts1Prv,ft,'','Byte','01_Fase');
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
/* Filter desepckel bisa diganti dg Focal Median
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
function SaveImg2Drv(ImgIn,ImgOut,Sc,Bts,Clip,KoefKon,TypOut,Fld) {
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
  folder : Fld,
  fileFormat: 'GeoTIFF',
  region: Bts});
}
function Save2drv(Img,ImgOut,Sc,Fld,Bts) {
 Export.image.toDrive({ 
  image:Img,
  description:ImgOut,
  scale: Sc, 
  maxPixels: 1e13,
  folder : Fld,
  fileFormat: 'GeoTIFF',
  region: Bts});
}
function BtsPrv() {
var Batas_Prov = [
[94.972336,6.077241,98.287292,1.976846],[97.058762,4.30419,100.643311,-0.638271],[98.596176,0.908519,101.886116,-4.01639],
[100.053658,2.529452,103.813889,-1.121101],[101.122696,-0.746249,104.489548,-2.770429],[101.025993,-2.277211,103.781303,-5.51512],
[102.063423,-1.6299,106.221024,-4.95982],[103.593361,-3.727249,106.11158,-6.168612],[103.285065,4.795834,109.167427,-0.866396],
[105.108459,-0.908888,108.716316,-3.803609],[106.390274,-5.201668,106.973068,-6.37674],[105.099998,-5.807498,106.7825626,-7.016391], // 10 Banten
[106.370407,-5.91444,108.8549979,-7.821099],[108.555428,-6.33504477,111.692879,-8.212777],[110.009048,-7.543099,110.837929,-8.204723],
[110.898346,-6.6534245,115.9139458,-8.849445],[114.431114,-8.06111,115.712502,-8.849445],[115.820137,-8.0,119.347221,-9.110002], // 16 - 19
[118.926941,-7.777499,125.18898,-11.009721],[108.59861,2.082131,114.204193,-3.068059],[110.733887,0.793241,115.847198,-3.54472], // 20-22
[114.351067,-1.302411,117.458748,-5.102222],[113.838081,3.443534,119.037079,-2.542598],[114.587616,4.40325,117.966667,1.086809], // 23-25
[118.756668,-0.860949,119.909172,-3.570556],[119.1724397,-1.884479,121.8361225,-7.1605767],[119.422493,1.374653,124.033707,-3.640521],
[120.86528,-2.77362,123.278911,-5.789848],[121.162033,1.040832,123.5597205,0.305911],[123.113907,5.5662,127.163696,0.291731],
[124.143608,2.64556,129.657364,-2.477779],[125.721909,-2.725555,134.90834,-9.031908],[134.205246,-0.206099,141.011765,-9.118333],
[128.910309,1.081351,135.25766,-4.328449]
];
return Batas_Prov;
}
function BtsPlu() {
var Batas_Plu = [
[94.972336,6.077241,109.167427,-6.18],[105,-5.5,116,-8.9],[115.756277,-7.4309423,127.632498,-11.019763],
[108.759260,4.5,119.240217,-4.322264],[117.997539,2.046538,125.37,-6.835678],[124.232968,2.882579,130.97,-4.243],
[129.2,0.5,141,-9.152472]];
return Batas_Plu;
}
function GetPrd(Prd1,JumPrd,Prd) {
 // Prd1 : Periode yg mau dianalisis
 // JumPrd : jum prd sblmnya utk perubahan
 // Prd : dasarian,15 harian, bulanan, x bulan, tahunan
}
function FiltData(Sat,TglRange,AOI) {
var Id,ImgCol ;
if (Sat == 'L8r') Id = L8_SR ;
if (Sat == 's2') Id = S2_TOA ;
if (Sat == 's2k') Id = S2_SR;
if (Sat == 's1') Id = S1_GRD;
if (Sat == 'CHRP1')Id = 'UCSB-CHG/CHIRPS/DAILY/' ;
if (Sat == 'GSMAP')Id = 'JAXA/GPM_L3/GSMaP/v6/operational/';
ImgCol = Id.filterDate(TglRange[0],TglRange[1]);
if (AOI != 't' || AOI != 'T' ) ImgCol = ImgCol.filterBounds(AOI);
return (ImgCol);
}
function Fase1_S2(SCL) {
var Fase = SCL.expression( '(Lc==0) ? 0:(iv <= 0.188 && Lc== 6) ? 1:( iv > 0 && Slp > 0 && Lc==4)?2:(iv >  0 && Slp < 0 && Lc==4)?3:' + 
'(Lc==5) ? 4:5 ',{iv : SCL.select('EVI_3'),Lc : SCL.select('SCL'),Slp :SCL.select('Slope') }).rename('Fase');  
Fase = (Fase.updateMask(Fase));return Fase.focal_mode();
}
function GantiAwan(Img3,TyDt) { // Img3 stack
var Ganti=[],BndNam = Citra.ExtNamBandImg(Img3);
Img3 = Img3.unmask(); 
Ganti[0] = Img3.expression('(im1 == 0 && im2 !=0 && im3 !=0) ? (im2*0.67+im3*0.33):im1',
          {im1:Img3.select(BndNam[0]),im2:Img3.select(BndNam[1]),
          im3:Img3.select(BndNam[2])}).rename(BndNam[0]).toFloat(); 
Ganti[1] = Img3.expression('(im2 == 0 && im1 !=0 && im3 !=0) ? (im1+im3)/2:im2',
          {im1:Img3.select(BndNam[0]),im2:Img3.select(BndNam[1]),
          im3:Img3.select(BndNam[2])}).rename(BndNam[1]).toFloat(); 
Ganti[2] = Img3.expression('(im3 == 0 && im2 !=0 && im3 !=0) ? (im2*0.67+im1*0.33):im3',
          {im1:Img3.select(BndNam[0]),im2:Img3.select(BndNam[1]),
          im3:Img3.select(BndNam[2])}).rename(BndNam[2]).toFloat(); 
if (TyDt==1) { Ganti[0].round().toByte(); Ganti[1].round().toByte();Ganti[2].round().toByte()}
Ganti = ee.Image.cat(Ganti) ; return Ganti;
}
function Feat2Img(Feat,Val,Tebal) {
  return ee.Image().toByte().paint(Feat, Val, Tebal);
}
function OtoFase(Sat,Tgl_Fase,Pd) { 
// Otomatis Fase, buat URL
var JumPrv=34,IVMax,Lst_Tgl=[],Thn,Bln,Tgl;
//Tgl_Fase = PrdList[IdxPrd];
TglRange = ee.Date(Tgl_Fase).advance(-6,'month');
S2 = ee.Image(Pilih_S2k(Tgl_Fase,Bnd_S2k,'Qual','S2',Bts1Prv));
var S2_Pre6 = ee.Image(Pilih_S2k(TglRange,Bnd_S2k,'Qual','S2',Bts1Prv)),
EVI_Max = S2_Pre6.select('EVI');
S1 = ee.Image(Pilih_S1(Tgl_Fase,'',Bnd_S1,'MeanMed','S1',Bts1Prv));
print('Data Sentinel-1 Tgl '+ Tgl_Fase[0] +'-' +  Tgl_Fase[1]  + ':',S1);
// Get 3 data utk dihitung slope/trendnya utk deteksi fase Vegetatif (Trend +) 
//& Fase Generatif (Trend -). Sblmnya hrs proses Ganti awan dulu
var S2_3=[],Trend_S2,SCL_3=[];
for (k=0; k < 3; k++) {
Idx = IdxPrd-k; 
if (Idx >= 0) TglPrd3 = PrdList[Idx]; else TglPrd3 = PrdList1[12*(30/Pd) + Idx];
S1_3[2-k]= (Pilih_S1(TglPrd3,'','VH-VV','MeanMed','RPI',Bts1Prv)).rename('RPI_' + (2-k+1));   
S2_3[2-k]= ee.Image(Pilih_S2k(TglPrd3,'EVI','Qual','S2',Bts1Prv)).rename('EVI_' + (2-k+1));
SCL_3[2-k]= ee.Image(Pilih_S2k(TglPrd3,'SCL','Qual','S2',Bts1Prv)).rename('SCL_' + (2-k+1));  
} 
// Hitung Trend/Slope 
S1_3 = ee.Image.cat(S1_3);   S2_3 = ee.Image.cat(S2_3); SCL_3 = ee.Image.cat(SCL_3);
var GantiS2 = GantiAwan(S2_3), GantiSCL = GantiAwan(SCL_3); 
//dPI = S1_3.select('RPI_3').subtract(S1_3.select('RPI_3')).rename('dPI');
Trend = Citra.Slop3(S1_3,'n'); Trend_S2 = Citra.Slop3(GantiS2,'n');
S1 = S1.addBands(Trend); S1_3 = [];  print('Trend',S1);
S2 = S2.select(Bnd_S2k); S2_3=[]; SCL_3=[];
var SCL = GantiSCL.select('SCL_3').rename('SCL'); SCL = SCL.addBands(Trend_S2).addBands(GantiS2).mask(SCL);
//print('SCL :',SCL);
Fase_S1 = Citra.Det1Fase_S1(S1,'Slope',Air_Th,Bera_Th).focal_mode();
var TglFase = Tgl_Fase[0].slice(0,7)+"_" + Tgl_Fase[0].slice(8,10) + "-" + Tgl_Fase[1].slice(8,10);
var Fase_S2 = Fase1_S2(SCL); print('Fase_S2',Fase_S2);
}
function Vis(Img,VisPar) { return Img.visualize(VisPar) }
function downloadImg(Img,Vis,Sc,Reg,NamSim,Label) {
//  var viewBounds = ee.Geometry.Rectangle(Map.getBounds());
//  print("View",viewBounds) ;
// Max size Img = 33554432 bytes 
  var downloadArgs = {
    name: NamSim,
    crs: 'EPSG:4326',
    scale: Sc,
    filePerBand:false,
   // region: viewBounds.toGeoJSONString()
    region: Reg.toGeoJSONString()
 };
 if (Vis !=='') Img=Img.visualize(Vis);
 var url = Img.getDownloadURL(downloadArgs);
 //print('URL ' + NamProv,url,'Size = ',Img.dimensions());
 // Add UI elements to the Map.
var downloadButton = ui.Button('Download viewport', downloadImg);
var urlLabel = ui.Label(Label, {shown: false});
 urlLabel.setUrl(url);
 urlLabel.style().set({shown: true});
var panel = ui.Panel([downloadButton, urlLabel]);
//Map.add(panel);
Map.add(urlLabel);
return url;  
}
function Garis(x1,y1,x2,y2,Label){ 
//var Warna = '#' + KodeWarna;
return ee.FeatureCollection(/* color: '#444444 */ 
ee.Geometry.LineString([[x1,y1],[x2,y2]]),{'label':Label});
  }
function GridTile(x1,y1,x2,y2,dx,dy){ 
var i,j,Jdx,Jdy,Grids=[];
Jdx=(Math.round((x2-x1)/dx)) + 1 ; Jdy = (Math.round((y1-y2)/dy))+1 ;
  for (i=0; i < Jdy; i++) {Grids[i] = [[x1,y1-i*dy],[x2,y1-i*dy]] } // Lintang
  for (j=0; j < Jdx; j++) {Grids[Jdy+j] = [[x1+j*dx,y1],[x1+j*dx,y2]]  }
//return ee.FeatureCollection(Grids);
var Tiles = /* color: #d63000 */ ee.Geometry.MultiLineString(Grids); 
return ee.Feature(Tiles);  
}
function ShpPrvKab(Val) {// Outline gabungan Bts Admin Prov & Kab
return ee.ImageCollection([Feat2Img(Shp_Admin[2], Val[0], 1),Feat2Img(Shp_Admin[1], Val[1], 2),Feat2Img(Shp_Admin[0], Val[3], 3)]).max();
}
function RedRes_img(Img,Sc,Met) {
  var Redu ; if(Met =='Mean') Redu = ee.Reducer.mean();
  if(Met =='Med') Redu = ee.Reducer.median();
  if(Met =='Mod') Redu = ee.Reducer.mode();
  return Img.reduceResolution({
      reducer: Redu, 
      //scale : Sc,
      maxPixels: 3072
});
}