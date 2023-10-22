var JwBl_Met3W_2016_09_05 = ui.import && ui.import("JwBl_Met3W_2016_09_05", "image", {
      "id": "users/panganpusfatja/METRIC/JwBl_Met3W_2016-09-05"
    }) || ee.Image("users/panganpusfatja/METRIC/JwBl_Met3W_2016-09-05"),
    JwBl_Met3W_2016_12_02 = ui.import && ui.import("JwBl_Met3W_2016_12_02", "image", {
      "id": "users/panganpusfatja/METRIC/JwBl_Met3W_2016-12-02"
    }) || ee.Image("users/panganpusfatja/METRIC/JwBl_Met3W_2016-12-02"),
    LstTgl_Met3W = ui.import && ui.import("LstTgl_Met3W", "table", {
      "id": "users/panganpusfatja/CSV/LstTgl_Met3W"
    }) || ee.FeatureCollection("users/panganpusfatja/CSV/LstTgl_Met3W"),
    LstTgl_Met4W = ui.import && ui.import("LstTgl_Met4W", "table", {
      "id": "users/panganpusfatja/CSV/LstTgl_Met4W"
    }) || ee.FeatureCollection("users/panganpusfatja/CSV/LstTgl_Met4W");
/* OTOMATISASI DETEKSI IP PADI
    by Dr Dede Dirgahayu, M.Si ; PRPJ,ORPA-BRIN 
*/
var FTxt = require('users/dededirgahayu11/Fungsi:DD_FeaText_ed.js');
var Simpan = require('users/dededirgahayu11/Fungsi:DD_IO.js');
var TSAni = require('users/dededirgahayu11/Fungsi:DD_TSerAni.js');
var GUI = require('users/dededirgahayu11/Fungsi:DD_GUI.js');
var Bts = require('users/dededirgahayu11/Fungsi:DD_BtsGeom.js');
var Time = require('users/dededirgahayu11/Fungsi:DD_Dyn_Time.js');
var Sys = ['system:index','system:time_end','system:time_start'];
var Geom_Pulau_100m = Bts.BtsPluGeom(100);
var Bts_Indo = ee.Geometry.Rectangle(92,8,142,-11), Bts_JwBl = Geom_Pulau_100m[1],
  Adm_JwBl_Img = FTxt.AdmIndoOL.clip(Bts_JwBl).rename('Admin_JwBl');
print('Adm_JwBl_Img',Adm_JwBl_Img);
var Pantura_Nam = ['BEKASI', 'KARAWANG','SUBANG','INDRAMAYU'];
var Kab_Indramayu = AdmKab([Pantura_Nam[3]]),Pantura_Jbr1=AdmKab(Pantura_Nam);
Map.centerObject(Kab_Indramayu,10);
var i,Tgla = "2016-09-05",Tgl1,Tgl2 = "2016-12-02", Add;
var DifT = ee.Date(Tgl2).difference(ee.Date(Tgla),'day');
print("DifT = " + DifT.getInfo() );
var TS_EVI_2017_20 = TSEVI_FrAst('MOD13_JwBl');
/*
var Prd3W = TSAni.PrdBlnThDif('2016-09-01','2020-10-01',3),
    Prd4W = TSAni.PrdBlnThDif('2016-09-01','2020-10-01',4);
print('Prd3W',Prd3W,'Prd4W',Prd4W);
var Met4W = TSAni.TS_MetEVI(TS_EVI_2017_20,Prd4W);
var LstTgl4W = LstImgC_Tgl(Met4W); 
var JumMet = JumElm(Met4W),PointSim,FeatSim;
PointSim = ee.Geometry.Point(107,-6);
FeatSim = CSV2AST(PointSim,LstTgl4W,'Metric_Date');
//print('FeatSim',FeatSim);
SaveFeat2Ast(FeatSim,'LstTgl_Met4W','CSV');
print('Jum Met4W = ' + JumMet,'TS_Met4w',Met4W,"LstTgl",LstTgl4W);
*/
// Get Lst Tgl Awal buat Metric 3 Bulanan dr Asset
var LstTgl3W = GetLstFeat(LstTgl_Met3W,'Metric_Date').getInfo();
var Ast = "users/panganpusfatja/METRIC/",NamPref = "JwBl_Met3W";
var Met3Col = BuatImgColAst(Ast,NamPref,LstTgl3W),nMetCol;
nMetCol = TSAni.JumElm(Met3Col);
print('Met3Col : ' + nMetCol,Met3Col);
// !!!!!!!!!! KRITERIA (Treshold) DETEKSI PADI dr METRIC 3 Bulanan
var EVI_Max_Tr,EVI_Min_Tr,EVI_Range_Tr,JHP,Pd=8 ; // Pd periode harian Data
EVI_Max_Tr = 0.37; EVI_Min_Tr = 0.212 ; EVI_Range_Tr = 0.33; JHP=90; // Bisa IP 4x 
Met3Col = CekPadi(Met3Col,EVI_Max_Tr,EVI_Min_Tr,EVI_Range_Tr,JHP,Pd);
var nMet3W = JumElm(Met3Col),LstImgs_3W = Met3Col.toList(Met3Col.size());
var ImgPil = ee.Image(LstImgs_3W.get(nMetCol-1)), 
    Tgl_Met=LstTgl3W[nMetCol-1];
// Cek Jumlah Data setiap Metric
var Seq = ee.List.sequence(0,15,1);
var LstMetnDt=[] ; 
for(i=1; i < nMet3W; i++) {
  var t1,t2,nDt;
  t1 = ee.Image(LstImgs_3W.get(i-1)).date();
  t2 = ee.Image(LstImgs_3W.get(i)).date();
  nDt = t2.difference(t1,'day').divide(8).floor().add(1);  
 LstMetnDt[i]=nDt;
  }
LstMetnDt[0]=LstMetnDt[1]; LstMetnDt=ee.List(LstMetnDt);
print('LstMetnDt',LstMetnDt.getInfo(),LstMetnDt.get(2));
var IP1,IP=[],IPNam = ['IP_2017' ,'IP_2018','IP_2019' ,'IP_2020'];
IP = DetIP_Padi(Met3Col,2017,3);
print('IP Jawa 2017-2020',IP);
//$$$$$$$$$$$ VISUAL
var Pal_IP = ['magenta','orange', 'yellow','aaaa00', '88ff00','00dd00', 'green'],
  Vis_IP = { bands :'IP_Ave_Kls',min:1,max:7,palette : Pal_IP },
  Vis_Met = {min:[0.169,0.241,0.064],max:[0.552,0.665,0.491]   },
  Vis_Admin = {min:1,max:3,palette : ['444444','brown','darkred']},
  Ket_IP = ['IP_100','IP_150','IP_200','IP_250','IP_300','IP_350','IP_400'], 
  Leg_IP = GUI.Legenda('IP Average','2017-2020',Ket_IP,Pal_IP);
//Map.centerObject(Met3Col.first(),10);
Set_Map(0,TS_EVI_2017_20,{},'TS EVI',0);
Set_Map(1,Met3Col,{},'TS Met3W',0);
Set_Map(2,ImgPil,Vis_Met,'TS Met3W ' + Tgl_Met);
Set_Map(3,IP,Vis_IP,'IP Average');
Set_Map(4,Adm_JwBl_Img,Vis_Admin,'OutLine Admin');
Map.add(Leg_IP);
//@@@@@@@@@ GUI
var App_Ttl = 'OTOMATISASI PENGOLAHAN DATA INDERAJA UNTUK DETEKSI INDEKS PERTANAMAN (IP) PADI';
var Lbl_Judul = UI_Lbl(App_Ttl,'green',20, 'bold','center'), 
    Lbl_Inv = UI_Lbl('Main Inventor : Dr Dede Dirgahayu, M.Si','blue',10,'bold','center'),
    Lbl_Afl = UI_Lbl('PR Penginderaan Jauh,ORPA-BRIN','red', 10, 'bold','left'),
    Lbl_Padi = UI_Lbl('Kriteria Tanaman Padi','green', 10,'bold','center'),
    Lbl_EVI = UI_Lbl('EVI_Max,Min,Range','red', 10,'bold','left'),
    Lbl_JHP = UI_Lbl('Hari Panen, Period','blue', 10,'bold','center'),
  Trs = EVI_Max_Tr + ',' + EVI_Min_Tr + ',' + EVI_Range_Tr ,
  TB_VMax = UI_TB(Trs),TB_JHP = UI_TB(JHP + ',' + Pd,48),Btn_Padi = UI_Btn('ReDetect'),
  Lbl_Met3W = UI_Lbl('EVI Metric 3 Bulanan','green', 10,'bold'),
  Sel_Met3W = UI_Sel(LstTgl3W,'Date Metric 3W')
;
var Pnl_Main = UI_Panel([Lbl_Judul],'300px','99%','3px solid red');
var Pnl_Inv = UI_Panel([Lbl_Inv,Lbl_Afl],'300px','60px');
var Pnl_Par = UI_Panel([Lbl_Met3W,Sel_Met3W,Lbl_Padi,Lbl_EVI,TB_VMax,Lbl_JHP,Btn_Padi,TB_JHP],'350px');
Pnl_Main = Pnl_Main.add(Pnl_Inv).add(Pnl_Par);
//######## Atur Margin
UI_MrgnPad(Lbl_Afl,0,-8,20,0); UI_MrgnPad(Lbl_EVI,0,-8,16,0); UI_MrgnPad(TB_JHP,0,-8,4,0);
UI_MrgnPad(Sel_Met3W,0,-32,156,0); UI_MrgnPad(Btn_Padi,0,-32,140,0);
ui.root.insert(0,Pnl_Main);
//%%%%%%%%%%%% GUI EVENTS
Sel_Met3W.onChange(function(Cek){
  var Idx = LstTgl3W.indexOf(Cek);
  ImgPil = ee.Image(LstImgs_3W.get(Idx));
  Set_Map(2,ImgPil,Vis_Met,'TS Met3W ' + Cek);
});
Btn_Padi.onClick(function(Cek){ //print(TB_VMax.getValue());
 EVI_Max_Tr = GetVal_UI(TB_VMax,0);
 EVI_Min_Tr = GetVal_UI(TB_VMax,1);
 EVI_Range_Tr = GetVal_UI(TB_VMax,2);
JHP = GetVal_UI(TB_JHP,0); Pd = GetVal_UI(TB_JHP,1);  
 Met3Col = CekPadi(Met3Col,EVI_Max_Tr,EVI_Min_Tr,EVI_Range_Tr,JHP,Pd);
// print('ReDetect Padi',Met3Col);
 IP = DetIP_Padi(Met3Col,2017,3);
 Set_Map(3,IP,Vis_IP,'IP Average');
});
// @@@@@@@@@@@@@@@@@@@@ Collection of Functions created by Dr Dede Dirgahayu
function AdmKab(NamKabs) {return FTxt.AdmKab(NamKabs)}
function Dslv_Feat(Feat,Pro) {   }
function JumElm(Obj,Ops) { return TSAni.JumElm(Obj,Ops); }
function TSEVI_FrAst(Ops){return TSAni.TSEVI_FrAst(Ops);} // TS EVI MOD13 dr Asset
function LstImgC_Tgl(ImgC) { return TSAni.LstImgCDts(ImgC) }
function BuatImgColAst(Ast,NamPref,Lst_Tgl) {  
  return TSAni.BuatImgColAst(Ast,NamPref,Lst_Tgl) }
//!!!!!!! DETEKSI IP 
function CekPadi(Met3Col,EVI_Max_Tr,EVI_Min_Tr,EVI_Range_Tr,JHP,Pd){
return TSAni.CekPadi(Met3Col,EVI_Max_Tr,EVI_Min_Tr,EVI_Range_Tr,JHP,Pd); }
function DetIP_Padi(MetCol3W,Thn1,WBln) { //WBln 3 Bulanan
return TSAni.DetIP_Padi(MetCol3W,Thn1,WBln) }
//#######################################
function AddBDate(ImgC){return TSAni.AddBDate(ImgC);}
function AddIdx(ImgC){return TSAni.AddIdx(ImgC);} // Add Bnd index/urutan
function MetEVI(ImgC){return TSAni.MetEVI(ImgC);} // Metric EVI
function CSV2AST(Point,Lst,NamCol) { return TSAni.CSV2AST(Point,Lst,NamCol) }
function GetLstFeat(Feat,Pro,KySort) { return TSAni.GetLstFeat(Feat,Pro,KySort) }
function Set_Map(No,Obj,Vis,Ket,Opsi,Opac) { return TSAni.Set_Map(No,Obj,Vis,Ket,Opsi,Opac) }
// Save Img/Feat to Asset/Drv
function SaveImg2Ast(ImgIn,NamSim,Reg,Sc,Fld) { return Simpan.Ex2Ast(ImgIn,NamSim,Reg,Sc,Fld) }
function SaveFeat2Ast(FC,NamSim,Fld) { return Simpan.SaveFeat2Ast(FC,NamSim,Fld) }
function SaveImg2Drv(Img,NamSim,Reg,Sc,Fld) {return Simpan.Ex2Drv(Img,NamSim,Reg,Sc,Fld)}
function SaveFeat2Drv(Ops,FC,NamSim,Fld,FormTab,Select)
  { return Simpan.SaveFeat2Drv(Ops,FC,NamSim,Fld,FormTab,Select)}
// GUI &&&&&&&&&&&&&&&&&&
function UI_Panel(Wgts,Lx,Ly,Bord,Flow){return GUI.UI_Pnl(Wgts,Lx,Ly,Bord,Flow) }
function UI_TB(Val,Wd,PH) { return GUI.UI_TB(Val,Wd,PH) }
function UI_Lbl(Val,Warna,Wbg,Siz,Tebal,Alg,Bord,Wd,Pad) {
return GUI.UI_Lbl(Val,Warna,Wbg,Siz,Tebal,Alg,Bord,Wd,Pad);
}
function UI_Sel(Itm,PH,Warna,Sz,Wd,Val) {
  return GUI.UI_Sel(Itm,PH,Warna,Sz,Wd,Val);
}
function UI_Btn(Lbl,Bord,Warna){ 
  return GUI.UI_Btn(Lbl,Bord,Warna);
}
function Sel_Reset(UI_Sel,Itms) { // Reset Itms Select
  return GUI.Sel_Reset(UI_Sel,Itms);
}
function UI_Sty(UI,Warna,Wb,Siz,Bold,Align,Bord,Wd) {
  return GUI.UI_Sty(UI,Warna,Wb,Siz,Bold,Align,Bord,Wd);
}
function GetVal_UI(UI,Idx) { return GUI.GetVal_UI(UI,Idx) }
// Margin & Padding
function UI_MrgnPad(UI,x1,y1,x2,y2,Pad){ return GUI.UI_MrgPad(UI,x1,y1,x2,y2,Pad) }