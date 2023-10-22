var Sawit = ui.import && ui.import("Sawit", "imageCollection", {
      "id": "BIOPAMA/GlobalOilPalm/v1"
    }) || ee.ImageCollection("BIOPAMA/GlobalOilPalm/v1"),
    Sur_Telaga_03Mar22 = ui.import && ui.import("Sur_Telaga_03Mar22", "table", {
      "id": "projects/ee-salmanddd14/assets/Shp/Tlg_Dongga03Mar22"
    }) || ee.FeatureCollection("projects/ee-salmanddd14/assets/Shp/Tlg_Dongga03Mar22"),
    Survey22_NAD = ui.import && ui.import("Survey22_NAD", "table", {
      "id": "users/timperkebunanpusfatja/Survei_Aceh_April_2022/Titik_Survei_Aceh"
    }) || ee.FeatureCollection("users/timperkebunanpusfatja/Survei_Aceh_April_2022/Titik_Survei_Aceh"),
    Jalan = ui.import && ui.import("Jalan", "table", {
      "id": "users/timperkebunanpusfatja/Survei_Aceh_April_2022/Jaringan_Jalan_Aceh"
    }) || ee.FeatureCollection("users/timperkebunanpusfatja/Survei_Aceh_April_2022/Jaringan_Jalan_Aceh"),
    Slope_Aceh = ui.import && ui.import("Slope_Aceh", "image", {
      "id": "users/timperkebunanpusfatja/Survei_Aceh_April_2022/Slope_Aceh"
    }) || ee.Image("users/timperkebunanpusfatja/Survei_Aceh_April_2022/Slope_Aceh");
// EKSTRAK KLASIFIKASI SENTINEL 2 ESA V100
//  by Dr Dede Dirgahayu, PR Inderaja, LAPAN-BRIN
// Ref Fungsi
var GUI = require('users/dededirgahayu11/Fungsi:DD_GUI.js');
var LBS = require('users/dededirgahayu11/Fungsi:DD_LBS2019.js');
var Logo = require('users/dededirgahayu11/Fungsi:DD_Logo.js');
var FTxt = require('users/dededirgahayu11/Fungsi:DD_FeaText.js');
var CMsk = require('users/dededirgahayu11/Fungsi:DD_CMask.js');
var dataset = ee.ImageCollection("ESA/WorldCover/v100").first();
var LBSwh = LBS.LBS10mIndo(), Sawit_2019 = Sawit.select('classification').mosaic();
var Talaga_Point = ee.Geometry.Point(119.84851, 0.1788);
var Indo10_Prv = FTxt.Indo10_Prv,Indo10_Kab = FTxt.Indo10_Kab,Indo10_Kec = FTxt.Indo10_Kec ;
// List Bts Admin
//var Lst_NamPrv = LstFeatPro(Indo10_Prv,'NAMA_PROV', 'PRV_ID').getInfo(),
var Lst_NamPrv = FTxt.LstPrv_2010().getInfo(), Lst_NamKab,Lst_NamKec;
print('Lst_NamaPrv 2010',Lst_NamPrv);
var Log8Tani = Logo.Tmb8Mentan();
// Nilai awal
var Clp_Prv = Indo10_Prv.filter(ee.Filter.eq('PRV_ID',1)),SulTeng_Kab,Clp_Kab,Clp_AOI
//SulTeng_Kab = Indo10_Kab.filter(ee.Filter.eq('PRV_ID',27)),
,Prv_Idx,Prv_Shp,Kab_Shp,Prv_Pil,Prv_Nam,Kab_Nam,Kec_Shp,Adm_Img,Kab_Idx,Kec_Idx,Kec1_Shp,Img_Kec
;
var ImgCol_L8,ImgCol_L9,ImgCol_S2k,ImgCol_S1,ImgCol_Pln;
var Bounds,Bounds_Kord = GetBoundKord(Clp_Prv);
print('Bounds',Bounds_Kord); 
//Clp_Kab = SulTeng_Kab.filter(ee.Filter.eq('NAMKABKOT','DONGGALA'));
//print('dataset',dataset);
// Var Time
var Tgl_R,YMd='YYYY-MM-dd', ED = ee.Date(Date.now()), SD = ED.advance(-1,'year'), 
Today = ee.Date(Date.now()).format('YYYY-MM-dd HH:MM:ss','Asia/Jakarta'); 
var SDt = SD.format(YMd).getInfo(), EDt = ED.format(YMd).getInfo();
print('Today', Today,'SD = ' + SDt);
var LstTgl_L8,LstTgl_L9,LstTgl_S2,LstTgl_S1,LstImgs_L8,LstImgs_L9,LstImgs_S2k;
// Bulanan, 4 bulanan for Metric analysis
var Lst1B_2021_22 = CMsk.ListTgl_Bln2(SDt,EDt,1), Lst4W_2021_22 = CMsk.ListTgl_Bln2(SDt,EDt,4);
print ('Lst Tgl 4 bulanan',Lst4W_2021_22);
var Klas = ReKlas_LCS2('y'), Kls_Name = Get_LCS2_KlsPal()[0],Kls_Pal = Get_LCS2_KlsPal()[1],
    Swt_Pal = ['88ff44','lightgreen','brown'];
print('Klas Img','Klas Nama',Klas,Kls_Name,'Klas Palet',Kls_Pal);
var visualization = {bands: ['Map']};
var Vis_Kls = {bands: 'Land_Cover',min:1,max:15,palette:Kls_Pal},
    Vis_Sawit = {min:1,max:3,palette:Swt_Pal};
var NCC_Optik = {bands:['Swir1','Nir','Green'],min:[0],max:[0.45,0.55,0.35] };
Prv_Shp = FTxt.SelFeat(Indo10_Prv,'NAMA_PROV',Lst_NamPrv[0]);
Lst_NamKab = FTxt.LstFeatPro(Prv_Shp,'NAMKABKOT', 'KB_ID').getInfo();
Kab_Shp = FTxt.SelFeat(Indo10_Kab,'NAMKABKOT',Lst_NamKab[0]);
var L89_Idx,S2_Idx,S1_Idx,L8_Komp,S2_Komp,S1_Komp,L8_Img,S2_Img,S1_Img,LstId_L89,LstId_L89Arr;
Map.centerObject(Prv_Shp,9);
//Map.addLayer(SulTeng_Kab,{}, "Regency of Central Sulawesi",0)
FTxt.Set_Map(0,Klas,Vis_Kls , "Sentinel Landcover 2020",0);
FTxt.Set_Map(1,Klas.clip(Clp_Prv),Vis_Kls , "Sentinel Landcover 2020 of " +Lst_NamPrv[0]);
FTxt.Set_Map(5,Jalan,{color:'red'} , "Street");
//Map.addLayer(LBSwh,{}, "Sawah");
//Map.addLayer(Sur_Telaga_03Mar22,{color : 'red'} , "Points observation around Talaga lake, Donggala,Central Sulawesi");
// GUI
var Titel1='LANDCOVER Level-2',Titel2='2020';
var Lbl_Inv = UI_Lbl('Inventors : Dr Dede Dirgahayu ; RC Remote Sensing, BRIN'); UI_Sty(Lbl_Inv,'red',"",12,'bold');
var Lbl_Mbr = UI_Lbl('Members : Fulan/ah ..... '); UI_Sty(Lbl_Mbr,'blue',"",12,'bold');
UI_Margin(Lbl_Inv,-4,0,0,8); UI_Margin(Lbl_Mbr,-1,0,0,8);
var Leg_Kls = GUI.Legenda(Titel1,Titel2,Kls_Name,Kls_Pal);
var Panel1 = ui.Panel({style : {width:'320px',border:'3px solid green'}});
var Panel = ui.Panel({style : {width:'300px',height:'200px',border:'2px solid red'}});
var Panel_Leg = ui.Panel({style : {width:'300px',height:'200px',border:'2px solid darkblue'}});
var Panel_Graf = ui.Panel({style : {width:'300px',height:'200px',border:'2px solid darkblue'}});
Panel_Leg.add(ui.Label('Legend',{color:'red',fontWeight : 'bold'})) ; 
Panel_Graf.add(ui.Label('Graphics',{color:'blue',fontWeight : 'bold'}));
var Pil_Prv = GUI.UI_Pilih(Lst_NamPrv,'Prov Name'),Pil_Kab = ui.Select(Lst_NamKab,'District Name');
var Lst_NamKec,Pil_Kec = GUI.UI_Pilih(Lst_NamKec,'Sub District Name');
var Btn_Load = ui.Button('Load Landsat-8/9;Sentinel-1/2');
var LstDt_LS8,LstDt_LS9,LstDt_S2,LstDt_S1;
var Pil_L8 = GUI.UI_Pilih(LstDt_LS8,'L8/9 Date'),Pil_S2 = ui.Select(LstDt_LS9,'S2 Date')
,Pil_S1 = ui.Select(LstDt_S1,'S1 Date');
var Bound_KordT = Kord2Txt(Bounds_Kord);  
var Border='2px solid red';
var App_Judul = 'LANDCOVER BASED ON SENTINEL-1/2 SATELLITE';
var TB_SD = GUI.UI_TB(SDt + ',' + EDt,168),TB_Bound = GUI.UI_TB(Bound_KordT,160),
DSld_SD = GUI.UI_DSld(SDt, ee.Date(SDt).advance(1,'month'), 1, 16),
DSld_ED = GUI.UI_DSld(ee.Date(EDt).advance(-1,'week'), EDt, 1, 16)
    ;
var Lbl_App = ui.Label(App_Judul); GUI.UI_Style(Lbl_App,16,'darkblue','bold','center','white',Border);
var Lbl_SED = ui.Label('Start,End Date'), Lbl_Bound = ui.Label('Bounds'); 
// Margin, Padding
GUI.UI_Margin(Btn_Load,-35,0,0,140); GUI.UI_Margin(Pil_Kab,-35,0,0,150); 
GUI.UI_Margin(TB_SD,-28,0,0,112); GUI.UI_Margin(TB_Bound,-28,0,0,60); 
GUI.UI_Margin(Pil_S2,-35,0,0,150); //GUI.UI_Margin(Pil_S1,-35,0,0,250); 
Lbl_App.style().set('padding','4px');
Log8Tani.style().set({border:'3px soloid green'});
Panel.add(Log8Tani).add(Lbl_App).add(Lbl_Inv).add(Lbl_Mbr).add(Lbl_SED).add(TB_SD).add(Pil_Prv).add(Pil_Kab).add(Pil_Kec)
.add(Btn_Load).add(Lbl_Bound).add(TB_Bound).add(Pil_L8).add(Pil_S2);
Panel_Leg.add(Leg_Kls); Panel1.add(Panel).add(Panel_Leg).add(Panel_Graf);
ui.root.insert(0, Panel1);
// EVENT GUI
TB_SD.onChange(function(Cek){}); TB_Bound.onChange(function(Cek){});
/*
DSld_SD.onChange(function(Cek){print('Cek',Cek)});
DSld_ED.onChange(function(Cek){print('Cek',Cek)});
*/
Btn_Load.onClick(function(Cek){
  SDt = TB_SD.getValue().split(',')[0]; EDt = TB_SD.getValue().split(',')[1];
  Tgl_R = [SDt,EDt] ; Bound_KordT = TB_Bound.getValue().split(','); 
  Bounds = KordT2Geom(Bound_KordT);
  print(Tgl_R,'Bounds',Bounds);
  ImgCol_L8 = CMsk.Pil_Data('L8',Tgl_R,Clp_Prv); 
  ImgCol_L9 = CMsk.Pil_Data('L9',Tgl_R,Clp_Prv);
  LstTgl_L9=CMsk.LstImgCol(ImgCol_L9,'Tgl');
  // Merge L8/L9
  ImgCol_L8 = CMsk.MergImgC([ImgCol_L8,ImgCol_L9]);
  L8_Komp = ImgCol_L8.median();
  LstId_L89 = CMsk.LstImgCol(ImgCol_L8,'Id');
  LstTgl_L8=CMsk.LstImgCol(ImgCol_L8,'Tgl');
  LstId_L89Arr = CMsk.LstMid(LstId_L89,2,21);
//print(LstMid(LstId_L89,2,21));
//print(GetImgColIdx(MergImgC([L8_Sri,L9_Sri]),LstId_L89,1));
  ImgCol_S2k = CMsk.Pil_Data('S2k',Tgl_R,Clp_Prv);
  LstTgl_S2=CMsk.LstImgCol(ImgCol_S2k,'Tgl');
//  print('ImgCol_L8',ImgCol_L8,'ImgCol_L9',ImgCol_L9
//  ,'ImgCol_S2k',ImgCol_S2k.limit(500));
 FTxt.Set_Map(0,L8_Komp.clip(Prv_Shp),NCC_Optik , "Landsat 8/9 Median Temporal Composite of " + Pil_Prv.getValue() );
  GUI.Pil_Reset(Pil_L8,LstId_L89Arr);
  GUI.Pil_Reset(Pil_S2,LstTgl_S2.getInfo());
}
);
Pil_L8.onChange(function(Cek){
L89_Idx = LstId_L89Arr.indexOf(Cek) ;
L8_Img = CMsk.GetImgColIdx(ImgCol_L8,LstId_L89,L89_Idx);
print('L8_Img-' + L89_Idx,L8_Img);
});
Pil_S2.onChange(function(Cek){
 S2_Idx =  LstTgl_S2.indexOf(Cek) ;
});
Pil_Prv.onChange(function(Cek){
  Prv_Idx =  Lst_NamPrv.indexOf(Cek) ; Prv_Nam = Cek;
  Prv_Shp = FTxt.SelFeat(Indo10_Prv,'NAMA_PROV',Cek);
  Kab_Shp = FTxt.SelFeat(Indo10_Kab,'NAMA_PROV',Cek);
  Lst_NamKab = FTxt.LstFeatPro(Kab_Shp,'NAMKABKOT', 'KB_ID').getInfo();
  GUI.Pil_Reset(Pil_Kab,Lst_NamKab);
  Adm_Img = FTxt.Feat2Imgs([Kab_Shp,Prv_Shp],[2,3],[3,3],"");
  //print('Lst_NamKab',Lst_NamKab);
  Map.centerObject(Prv_Shp,11); Clp_Prv= Prv_Shp; 
  TB_Bound.setValue(FTxt.Kord2Txt(FTxt.GetBoundKord(Clp_Prv)));
  FTxt.Set_Map(1,Klas.clip(Prv_Shp),Vis_Kls , "Sentinel Landcover 2020 of " + Cek);
  FTxt.Set_Map(2,Adm_Img,{min: 1,max:3,palette : ['444444','darkviolet','darkred']} , "Admin Boundary of " + Cek);
});
Pil_Kab.onChange(function(Cek){
  Kab_Idx =  Lst_NamKab.indexOf(Cek);
  Kec_Shp = FTxt.SelFeat(Indo10_Kec,'KABKOT',Cek);
  print('Kec_Shp',Kec_Shp);
  Lst_NamKec = FTxt.LstFeatPro(Kec_Shp,'KECAMATAN', 'KEC_ID').getInfo();
  print(Lst_NamKec);
  GUI.Pil_Reset(Pil_Kec,Lst_NamKec);
  Img_Kec = FTxt.Feat2Img(Kec_Shp,1,1,"");
  Adm_Img = ee.ImageCollection([Adm_Img,Img_Kec]).max();
  Map.centerObject(Kab_Shp,10); Clp_Prv= Kab_Shp; 
  TB_Bound.setValue(FTxt.Kord2Txt(FTxt.GetBoundKord(Clp_Prv)));
  FTxt.Set_Map(2,Adm_Img,{min: 1,max:3,palette : ['444444','darkviolet','darkred']} , "Admin Boundary of " + Cek);
 });
Pil_Kec.onChange(function(Cek){
  Kec1_Shp = FTxt.SelFeat(Kec_Shp,'KECAMATAN',Cek);
  Map.centerObject(Kec1_Shp,12); Clp_Prv= Kec1_Shp; 
  TB_Bound.setValue(FTxt.Kord2Txt(FTxt.GetBoundKord(Clp_Prv)));
});
//Functionc
exports.ReKlas_LCS2 = function(MskSwh){return ReKlas_LCS2(MskSwh); } 
function ReKlas_LCS2(MskSwh) {
  var Rek = dataset.select('Map').expression('v != 95 && v > 10 ? v/10 + 3:v==100?14:v==95?13: v==10 && s !=3 ? s+1:v==10?1:15',
  {v:dataset.select('Map'),s:Sawit_2019}).rename('Land_Cover').toByte()
  .copyProperties(dataset,['system:time_start','system:time_end','system:index']);
  if(MskSwh=='y')Rek = ee.Image(Rek).expression('(v == 7 && p > 0) ? 4:v',{v:Rek,p:LBSwh });
  return ee.Image(Rek).set('Creator','çreated by Dr Dede Dirgahayu, M.Si; PR Inderaja, LAPAN-BRIN');
}
function Get_LCS2_KlsPal() {
var i,NamKls=[],Pal=[],Kls_Name = dataset.get('Map_class_names').getInfo(),
Kls_Pal = dataset.get('Map_class_palette').getInfo();
for(i=1; i <=10; i++) {NamKls[i+3]=(i+4) + '_' + Kls_Name[i]; Pal[i+3]=Kls_Pal[i];  }
NamKls[0]='1_Trees non Oil Palm',NamKls[1]='2_Industrial Oil Palm',NamKls[2]='3_Smallholder Oil Palm',NamKls[3]='4_Paddy Field',NamKls[14]='15_Deep sea',
Pal[0]= Kls_Pal[0] ; Pal[1]='00dd00',Pal[2]='ef00ff',Pal[3]='00ffff',Pal[14]='0000aa';
return [NamKls,Pal];
}
//****************************************
/*
function LstFeatPro(Feat,Pro,KyPro) {
 return ee.List(Feat.sort(KyPro).aggregate_array(Pro)).distinct(); 
}
function GetProFeat(Feat) { 
return Feat.toDictionary(Feat.propertyNames()).getInfo();
}
function SelFeat(Feat,Pro,ValPro) {
  return Feat.filter(ee.Filter.eq(Pro,ValPro));
}
*/
function GetBoundFea(Fea){
  return Fea.geometry().bounds();
}
function GetBoundKord(Fea){
  var Kords = Fea.geometry().bounds().coordinates().get(0).getInfo();
  return [Kords[3],Kords[1]];
}
function Kord2Txt(Bounds_Kord) {
  var Bound_KordT,Jum=ee.List(Bounds_Kord).length().getInfo();
  if (Jum == 2) Bound_KordT = Bounds_Kord[0][0].toFixed(6) + ',' + Bounds_Kord[0][1].toFixed(6) + ',' + 
Bounds_Kord[1][0].toFixed(6) + ',' + Bounds_Kord[1][1].toFixed(6); 
else Bound_KordT = Bounds_Kord[0][0].toFixed(6) + ',' + Bounds_Kord[0][1].toFixed(6);
return Bound_KordT; 
  } 
function KordT2Geom(KordT) {
  var i,KordF=[],Jum=ee.List(KordT).length().getInfo();
  for(i=0; i < Jum; i++) {KordF[i]=parseFloat(KordT[i]);  }
if(Jum==2) return ee.Geometry.Point(KordF);
return ee.Geometry.Rectangle(KordF);
  }
// GUI
//ui.Label(value, style, targetUrl, imageUrl)
function UI_Lbl(Val) {
var UI = ui.Label({value :Val}) ;
return UI;
}
//ui.Textbox(placeholder, value, onChange, disabled, style);
function UI_TB(Val,PH,Wd) {
var UI =  ui.Textbox({placeholder: PH || "",value : Val,style: {width:Wd || ""},onChange:function(){}});
return UI;
}
//ui.Select(items, placeholder, value, onChange, disabled, style)
function UI_Sty(UI,Warna,Wb,Siz,Bold,Align,Bord) {
  return UI.style().set({
  color:Warna || 'black',backgroundColor:Wb || 'white',
  fontSize:Siz + 'px' || '11px',
  fontWeight : Bold || 'normal',
  textAlign :  Align || 'left',
  border : Bord  || "" ,
 } 
    ); 
}
function UI_Margin(UI,y1,x1,y2,x2,Pad) { // Margin & Padding
  return UI.style().set({
margin:  y1 + 'px ' + x1 +  'px ' + y2+'px '+ x2 +  'px' || "4px",
padding : Pad + 'px ' ||'' , } 
    ); 
}