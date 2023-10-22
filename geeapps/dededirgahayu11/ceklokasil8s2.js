var S2_SR = ui.import && ui.import("S2_SR", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    SH_Sri_Point = ui.import && ui.import("SH_Sri_Point", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            107.6352944450426,
            -6.3170099860958215
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([107.6352944450426, -6.3170099860958215]),
    Log8 = ui.import && ui.import("Log8", "image", {
      "id": "users/dededirgahayu11/Foto/logo8"
    }) || ee.Image("users/dededirgahayu11/Foto/logo8"),
    Log_Bappenas = ui.import && ui.import("Log_Bappenas", "image", {
      "id": "users/dededirgahayu11/Foto/Logo_Bappenas"
    }) || ee.Image("users/dededirgahayu11/Foto/Logo_Bappenas"),
    Swt_Asahan = ui.import && ui.import("Swt_Asahan", "table", {
      "id": "users/dededirgahayu11/shp/AsahanUD21"
    }) || ee.FeatureCollection("users/dededirgahayu11/shp/AsahanUD21"),
    Swt_Tandun = ui.import && ui.import("Swt_Tandun", "table", {
      "id": "users/salmanddd14/Tandun_Kbn_geo"
    }) || ee.FeatureCollection("users/salmanddd14/Tandun_Kbn_geo"),
    Log8z50 = ui.import && ui.import("Log8z50", "image", {
      "id": "users/dededirgahayu11/Foto/Log8z50"
    }) || ee.Image("users/dededirgahayu11/Foto/Log8z50"),
    LogBapenasz70 = ui.import && ui.import("LogBapenasz70", "image", {
      "id": "users/dededirgahayu11/Foto/LogBapenasz70"
    }) || ee.Image("users/dededirgahayu11/Foto/LogBapenasz70"),
    Log_BRIN = ui.import && ui.import("Log_BRIN", "image", {
      "id": "users/dededirgahayu11/Foto/Logo_BRIN1"
    }) || ee.Image("users/dededirgahayu11/Foto/Logo_BRIN1"),
    Log_Kmentan = ui.import && ui.import("Log_Kmentan", "image", {
      "id": "users/dededirgahayu11/Foto/Logo_Kmentan1"
    }) || ee.Image("users/dededirgahayu11/Foto/Logo_Kmentan1"),
    DI_Rentang = ui.import && ui.import("DI_Rentang", "table", {
      "id": "users/salmanddd14/shp/DI_Rentang"
    }) || ee.FeatureCollection("users/salmanddd14/shp/DI_Rentang"),
    Indo10_Prv = ui.import && ui.import("Indo10_Prv", "table", {
      "id": "users/salmanddd14/shp/Indo10_Pv"
    }) || ee.FeatureCollection("users/salmanddd14/shp/Indo10_Pv"),
    Indo10_kab = ui.import && ui.import("Indo10_kab", "table", {
      "id": "users/salmanddd14/shp/Indo10_Kb"
    }) || ee.FeatureCollection("users/salmanddd14/shp/Indo10_Kb"),
    Log_BRIN8 = ui.import && ui.import("Log_BRIN8", "image", {
      "id": "users/dededirgahayu11/Foto/Log_BRIN_LPN_WRI"
    }) || ee.Image("users/dededirgahayu11/Foto/Log_BRIN_LPN_WRI"),
    SH_Sri_Poly = ui.import && ui.import("SH_Sri_Poly", "table", {
      "id": "users/salmanddd14/shp/SHSri_Geo"
    }) || ee.FeatureCollection("users/salmanddd14/shp/SHSri_Geo"),
    Indo_Kc = ui.import && ui.import("Indo_Kc", "table", {
      "id": "users/salmanddd14/shp/Indo10_Kc"
    }) || ee.FeatureCollection("users/salmanddd14/shp/Indo10_Kc"),
    Jln_Indo = ui.import && ui.import("Jln_Indo", "table", {
      "id": "users/gilangaulia1707226/Ruas_Jalan_Indo"
    }) || ee.FeatureCollection("users/gilangaulia1707226/Ruas_Jalan_Indo");
/* DD_Util.js
Fungsi2 utility; created by Dr Dede Dirgahayu; Pusfatja, LAPAN-BRIN
*/
var Str = require('users/dededirgahayu11/Fungsi:DD_String.js');
var FTxt = require('users/dededirgahayu11/Fungsi:DD_FeaText.js');
var Ekstrak = require('users/dededirgahayu11/Fungsi:DD_Ekstrak.js');
var CMsk = require('users/dededirgahayu11/Fungsi:DD_CMask.js');
var Radar = require('users/dededirgahayu11/Fungsi:DD_Radar_ed.js');
var Logo = require('users/dededirgahayu11/Fungsi:DD_Logo.js');
var Grid_Indo_1 = FTxt.GridIndo_1(); 
var Bts_Indo = ee.Geometry.Rectangle([90,8,142,-11]);
var Tmb_Log8=Img2Thumbz(Log8z50,125,90,0.7),Tmb_BRIN=Img2Thumbz(Log_BRIN,115,125,0.8),
Tmb_Bappenas=Img2Thumbz(LogBapenasz70,270,91,0.75), Tmb_8Bape = Logo.TmbBRIN8zBape(),
Tmb_KMtn=Img2Thumbz(Log_Kmentan,128,129),
Tmb_Lpn_WRI = Img2Thumbz(Log_BRIN8,125,90,0.7) ;
//print('Logo',Tmb_Log8); 
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM 
var S1_Indo = Radar.S1_Indo(); 
var Point,Point_1,Bound,SH_Sri_Kord=[107.6352944,-6.31700999], SH_Sri_Point = Kords2Geom(SH_Sri_Kord,'Point');
var Kord_Brigif=[106.862734,-6.3379290],Lap_Brigif_Point=Kords2Geom(Kord_Brigif,'Point'),Kord_Point;
var Point_Gab_Nam = ['SH_Sri','DI Rentang','DI Manganti','Sawit Asahan','Sawit Tandun','Admin Prov','Current Bound']
,Kord_Manganti =[ 108.74146071, -7.52119801],Manganti_Point =Kords2Geom(Kord_Manganti,'Point')
,Kord_Rentang = [108.34, -6.49],Rentang_Point =Kords2Geom(Kord_Rentang,'Point')
,Kord_FESulTg = [119.78201, 0.21188],FESulTg_Point =Kords2Geom(Kord_FESulTg,'Point')
,Point_Gab = [SH_Sri_Point, Rentang_Point,Manganti_Point,Swt_Asahan,Swt_Tandun,Indo10_Prv]
;
//print(Swt_Asahan) 
var Pil_Mosa=['Mean','Med','Qual'];
var i,j,k,JumLst_S1,JumLst_S2,S1,S2,LstImgs_S1,LstImgs_S2,L8,JumLst_L8,LstImgs_L8,Data_S1,Data_S2,Data_L8,TglS,TglE,TglR=[]; 
var TglS_S2,TglE_S2,TglS_L8,TglE_L8,Tgl_R,Pil_S2,Pil_L8,Pil_S1;
var LstTgl_S2,LstTgl_S2d,LstImgId_S2,LstImgId_S2d,Lbl_Tgl_S2,
LstTgl_S1,LstTgl_S1d,LstImgId_S1,LstImgId_S1d,Lbl_Tgl_S1,Bnd_Idx=['NDBI','EVI','NDWI'],
LstTgl_L8,LstTgl_L8d,LstImgId_L8,LstImgId_L8d,Lbl_Tgl_L8,Arr_NamPrv,NamPrv
; 
Arr_NamPrv = ListPro_Obj(Indo10_Prv.sort('PRV_ID'),'NAMA_PROV').getInfo() ; 
// Par Visual
var BndRGB_S1 = ['VV','VH','DP','API','RPI','NDPI','VH_Int'],Idx_S1 = ['API','RPI','NDPI','VH_Int'] ;
var VisRGB_NCC_S2 = {min:[-0.08,-0.08,-0.08],max:[0.33,0.38,0.29],bands:['Swir1','Nir','Green'] };
var VisRGB_NCC_L8 = {min:[-0.05,-0.08,0.01],max:[0.29,0.38,0.19],bands:['Swir1','Nir','Green'] };
var VisRGB_NCC_Qual = {min:[0.05,0.07,0.01],max:[0.25,0.45,0.19],bands:['Swir1','Nir','Green'] };
var VisRGB_NCC_Mos = {min:[0.05,0.03,0.05],max:[0.28,0.34,0.14],bands:['Swir1','Nir','Green'] };
var VisRGB_NCC_S1 = Radar.VisNCC_S1();
// Selected Date
var Fmt='YYYY-MM-dd',Fmt2='YYYY-DDD',Fmt1='YYYY-MM-dd HH:MM';
var Today = ee.Date(Date.now()).format(); TglE=ee.Date(Today).format(Fmt).getInfo(); 
TglS=(ee.Date(Today).advance(-3,'year')).format(Fmt).getInfo(); print ('Harini',Today); 
var TglS_S1,TglE_S1,TglS_S2,TglE_S2,TglS_L8,TglE_L8;
// GUI
var Panel_1 = ui.Panel(),Panel_2 = ui.Panel(),Pil_Bound,Pil_Mos;
Lbl_Tgl_S2=ui.Label('S2 '); Lbl_Tgl_L8=ui.Label('L8 '); Lbl_Tgl_S1=ui.Label('S1 ');
var TB_SD = ui.Textbox({value:TglS + ',' + TglE }),TB_ED = ui.Textbox({value:TglE}),
TB_Point = ui.Textbox({value: Kord_Brigif[0]+','+Kord_Brigif[1]});
var Pil_S2 = ui.Select({placeholder : ' Sentinel-2 Data '}),Pil_S1 = ui.Select({placeholder : ' Sentinel-1 Data '}),
Pil_L8 = ui.Select({placeholder : ' Landsat-8 Data '}),
Pil_Prv = ui.Select({placeholder : ' Province Bound ',items:Arr_NamPrv})
;
// Inisial Awal
//var Asahan_Bts = Swt_Asahan.geometry().dissolve(),
var Asahan_Point  = Kords2Geom(Obj2Bound(Swt_Asahan).CCxy,'Point');
var Vis_Sri = {min:1,max:194,palette:['red','magenta', 'yellow','orange','cyan','88ff00','00ff00','green']};
Tgl_R = [TglS,TglE] ; Point = Manganti_Point; Point = SH_Sri_Point;
Point=FESulTg_Point;
Main(Point,15); 
Set_Map(10,FTxt.Feat2Img(Indo_Kc,1,1,''),{palette:'black'},'Sub District',0);
Set_Map(11,FTxt.Feat2Img(SH_Sri_Poly,0,1,'ID'),Vis_Sri,'Polygon Sawah SH Sri,Subang',0);
Set_Map(12,FTxt.Feat2Img(SH_Sri_Poly,1,2,''),{palette:'880088'},'Sawah SH Sri,Subang');
Set_Map(13,Jln_Indo,{color:'red'},'Street',0); 
Set_Map(14,Grid_Indo_1,{palette:'black'},'Grid 1 Deg');
//MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMAIN 
exports.Main=function(Point,Zoom) { return Main(Point,Zoom);  }
function Main(Point,Zoom) { //Data_S2=ImgCol(Point,Tgl_R,'S2k');
Data_S2=ImgCol(Point,'','S2k'); S2=Data_S2.Data; JumLst_S2 = Data_S2.JumLst; 
  LstImgs_S2 = (Data_S2.LstImgs); 
LstTgl_S2 = LstImgCol_Tgl(S2); LstTgl_S2d = Urut_Desc(LstTgl_S2);
LstImgId_S2 = LstImgCol_SIdx(S2); LstImgId_S2d=Urut_Desc(LstImgId_S2);
Data_S1=ImgCol(Point,'','S1'); S1=Data_S1.Data; JumLst_S1 = Data_S1.JumLst; 
  LstImgs_S1 = (Data_S1.LstImgs); 
LstTgl_S1 = LstImgCol_Tgl(S1); LstTgl_S1d = Urut_Desc(LstTgl_S1);
LstImgId_S1 = LstImgCol_SIdx(S1); LstImgId_S1d=Urut_Desc(LstImgId_S1);
//print('List Tgl_S2',LstTgl_S2,'Desc',LstTgl_S2d );
Data_L8=ImgCol(Point,'','L8'); L8=Data_L8.Data; JumLst_L8 = Data_L8.JumLst; 
  LstImgs_L8 = Data_L8.LstImgs; 
LstTgl_L8=LstImgCol_Tgl(L8); LstImgId_L8 = LstImgCol_SIdx(L8);
LstTgl_L8d=Urut_Desc(LstTgl_L8); LstImgId_L8d=Urut_Desc(LstImgId_L8);
//var LstPR_S2=GetPR_Lst(LstImgId_S2,'S2k'),LstPR_L8=GetPR_Lst(LstImgId_L8,'L8'); // Lama/Wait nya ???
print('Jum List S2 = ' + JumLst_S2,LstImgs_S2);
print('Jum List L8 = ' + JumLst_L8,LstImgs_L8);
var ImgE_S1 = GetImg_Opsi(JumLst_S1-1,'S1'),ImgE_S2 = GetImg_Opsi(JumLst_S2-1,'S2k'),
ImgE_L8 = GetImg_Opsi(JumLst_L8-1,'L8');
print('Image terakhir S1',ImgE_S1);print('Image terakhir S2',ImgE_S2); print('Image terakhir L8',ImgE_L8);
Map.centerObject(Point,Zoom); Map.setOptions('HYBRID');
Set_Pilih(Point);
// GUI
var Judul = " SATELLITE IMAGERY FOR MONITORING NATURAL RESOURCES ",
Inventor = ' Inventor : Dr ir Dede Dirgahayu Domiri ', 
Afiliasi = ' Pusfatja; LAPAN-BRIN ', Members='M Zainal Salim, M Yusuf Manshur';
var Lbl_Judul = ui.Label(Judul),Lbl_Inv = ui.Label(Inventor),Lbl_Inv2 = ui.Label(Inventor),
Lbl_Afil= ui.Label(Afiliasi),Lbl_TglS=ui.Label('Start,End Date'),Lbl_TglE=ui.Label('End Date'),
Lbl_Point=ui.Label('Point/Bounds'), Btn_Repro=ui.Button({label: ' ReProcess '})
,Btn_Save=ui.Button({label: 'Save Data'})
;
Pil_S2 = ui.Select({placeholder : ' Sentinel-2 Data ', items : LstTgl_S2d});
Pil_L8 = ui.Select({placeholder : ' Landsat-8 Data ', items : LstTgl_L8d});
Pil_S1 = ui.Select({placeholder : ' Sentinel-1 Data ', items : LstTgl_S1d});  
Pil_Bound = ui.Select({placeholder : ' Point/Bounds ', items : Point_Gab_Nam})
,Pil_Mos = ui.Select({placeholder : ' Mosaic ', items : Pil_Mosa})
;      
Lbl_Tgl_S1=ui.Label('S1 '); Lbl_Tgl_S2=ui.Label('S2 '); Lbl_Tgl_L8=ui.Label('L8 ');
Panel_1.style().set({width:'33%'});
Panel_2.style().set({width:'33%',height:'300px'});
// Style : UI_Style(UI,Siz,Warna,NorBold,Align)
UI_Style(Lbl_Judul,15,'green','bold','center' );
UI_Style(Lbl_Inv,14,'blue','bold','' ); UI_Style(Lbl_Afil,14,'blue','bold','' );
UI_Style(Lbl_Point,11,'red','bold','' ); UI_Style(Lbl_TglS,12,'blue','bold','' );
UI_Style(TB_Point,11,'red','','' ); UI_Style(TB_SD,12,'blue','','' );
UI_Style(Btn_Save,11,'red','bold','center' ),UI_Style(Btn_Repro,12,'red','bold','center' )
,UI_Style(Pil_Bound,11,'red','bold','center' )
,UI_Style(Pil_S1,11,'red','bold','center' )
,UI_Style(Pil_S2,11,'00aa00','bold','center' )
,UI_Style(Pil_L8,11,'blue','bold','center' )
,UI_Style(Pil_Prv,11,'magenta','bold','center' )
,UI_Style(Pil_Mos,11,'green','bold','center' )
;
Pil_Bound.style().set({shown:true});
// Margin
UI_Margin(Lbl_Judul,20,10,0,10); 
UI_Margin(Lbl_Inv,0,5,0,25); UI_Margin(Lbl_Afil,0,10,0,80); UI_Margin(TB_Point,-35,0,0,120); // dg label -30 
UI_Margin(TB_SD,-30,0,0,120); UI_Margin(Pil_L8,-35,0,0,150); UI_Margin(Btn_Save,-35,0,0,150);
UI_Margin(Pil_Mos,-35,0,0,80);  UI_Margin(Tmb_Log8,-100,0,0,100); UI_Margin(Pil_Prv,-30,0,0,150);
UI_Margin(Tmb_Bappenas,-50,0,0,180); UI_Margin(Tmb_KMtn,-33,0,0,200);
// Gabung UI
var UI_Gab = [Tmb_BRIN,Tmb_Log8,Tmb_Bappenas,Lbl_Judul,Lbl_Inv,Lbl_Afil,
Pil_Bound,TB_Point,Lbl_TglS,TB_SD,Btn_Repro,Pil_Mos,Pil_Prv,Pil_S2,Pil_L8,Pil_S1,Btn_Save,]
;
for(i=0; i < 17; i++)Panel_1.widgets().set(i,UI_Gab[i]);
var Pos_Pan = {Kiri:0,Kanan:1 };
ui.root.insert(Pos_Pan.Kanan,Panel_1);
UI_Style(Lbl_Tgl_S1,12,'red','bold','' );
UI_Style(Lbl_Tgl_S2,12,'00aa00','bold','' );
UI_Style(Lbl_Tgl_L8,12,'blue','bold','' );
Lbl_Tgl_L8.style().set({position:'bottom-center'});
Lbl_Tgl_S2.style().set({position:'bottom-center'});
Lbl_Tgl_S1.style().set({position:'bottom-center'});
Lbl_Tgl_S1.setValue('S1 ' + LstTgl_S1[JumLst_S1-1] ); 
Lbl_Tgl_S2.setValue('S2 ' + LstTgl_S2[JumLst_S2-1] ); 
Lbl_Tgl_L8.setValue('L8 ' + LstTgl_L8[JumLst_L8-1] );
// Isi Awal GUI
Map.add(Lbl_Tgl_S1); Map.add(Lbl_Tgl_S2); Map.add(Lbl_Tgl_L8);
NamPrv = Arr_NamPrv[12] ; Pil_Prv.setValue(NamPrv); // Jawa Barat
//Point = Indo10_Prv.filter(ee.Filter.eq('PRV_ID',12+1));
//Set_Map(9, Poly2Img(Point,1,3,0),{palette:'aa0000'},'OutLine Prov ' + NamPrv);
// <<<<<<<<<<<< EVENT GUI
Pil_Bound.onChange(function(Cek){
  var Idx,JumPil = ee.List(Point_Gab_Nam).length().getInfo();
Idx = Point_Gab_Nam.indexOf(Cek);
if(Idx < 2)Point_1 = Point_Gab[Idx];
else if(Idx == JumPil-1)Point = ee.Feature(Kords2Geom(Map.getBounds(),'Rec'));
else if(Idx == JumPil-2)Point = Point; // Polygon Provinsi di pilih dulu;
//else Point = Kords2Geom(Obj2Bound(Point_Gab[Idx]).CCxy,'Point');
else Point =  Point_Gab[Idx];
var Point_T,Point2;
if(Idx < 3) Point_T = Geom2Kords(Point)[0].toFixed(6) + ',' + Geom2Kords(Point)[1].toFixed(6);
else {Point2 = Kords2Geom(Obj2Bound(Point).CCxy,'Point');
Point_T = Geom2Kords(Point2)[0].toFixed(6) + ',' + Geom2Kords(Point2)[1].toFixed(6);}
TB_Point.setValue(Point_T);
});
Pil_S1.onChange(function(Cek){
  var Idx;Idx = LstTgl_S1.indexOf(Cek);
 // Idx = LstImgId_S1.indexOf(Cek);
  print('Img_Idx S1 = ' +Idx,LstImgId_S1[Idx]);
Set_Map(3,GetImg_Opsi(Idx,'S1'),VisRGB_NCC_S1,'RGB NCC S1 ' + LstTgl_S1[Idx]);
Lbl_Tgl_S1.setValue('S1 ' + LstTgl_S1[Idx] );
});
Pil_L8.onChange(function(Cek){
  var Idx; Idx = LstTgl_L8.indexOf(Cek);
  //Idx = LstImgId_L8.indexOf(Cek); 
  print('Img_Idx L8 = ' + Idx,LstImgId_L8[Idx]);
  //Map.addLayer(GetImg_Lst(Idx),VisRGB_NCC,'RGB S2 ' + LstTgl_S2[Idx] );
 Set_Map(4,GetImg_Opsi(Idx,'L8').select(CMsk.Bnd_Spc()),VisRGB_NCC_L8,'RGB NCC L8 ' + LstTgl_L8[Idx]);
 Lbl_Tgl_L8.setValue('L8 ' + LstTgl_L8[Idx] );
}); 
Pil_S2.onChange(function(Cek){
  var Idx;Idx = LstTgl_S2.indexOf(Cek);
 // Idx = LstImgId_S2.indexOf(Cek);
 print('Img_Idx S2 = ' +Idx,LstImgId_S2[Idx]);
 Set_Map(5,GetImg_Opsi(Idx,'S2k').select(CMsk.Bnd_Spc()),VisRGB_NCC_S2,'RGB NCC S2 ' + LstTgl_S2[Idx]);
Lbl_Tgl_S2.setValue('S2 ' + LstTgl_S2[Idx] );
});
Pil_Prv.onChange(function(Cek){
var Idx; Idx = Arr_NamPrv.indexOf(Cek);
 NamPrv = Arr_NamPrv[Idx]; print('Prov Id = ' + Idx,NamPrv);
 Point = Indo10_Prv.filter(ee.Filter.eq('PRV_ID',Idx+1));
 print('Shp Provinsi ' + NamPrv,Point,'Bound ',Point.geometry().bounds() );
 Set_Map(9, Poly2Img(Point,1,3,0),{palette:'aa0000'},'OutLine Prov ' + NamPrv);
}); 
TB_Point.onChange(function(value){TB_Point.setValue(value);
    return (value); });
TB_SD.onChange(function(value){TB_SD.setValue(value);
    return (value); });
Btn_Save.onClick(function(){ // Mosaic
//Pil_Bound.style().set({shown:true});
var Img,NamSim,Reg,Sc,Fld; Sc=10; Reg=ee.Feature(Point).geometry().dissolve(); Fld = '01_Imgs';
NamSim = "S2_Mos_" + TglS_S2 + "_" + TglE_S2 + '_' + NamPrv; 
Img = S2.map(CMsk.CMsk_S2K).qualityMosaic('NDVI').select(CMsk.Bnd_Spc).multiply(1000).toInt16();
  Ex2Drv(Img,NamSim,Reg,Sc,Fld);
  Ex2Ast(Img,NamSim,Reg,Sc,Fld);
NamSim = "L8_Mos_" + TglS_L8 + "_" + TglE_L8 + '_' + NamPrv; 
Img = L8.map(CMsk.CMsk_L8b).qualityMosaic('NDVI').select(CMsk.Bnd_Spc).multiply(1000).toInt16();
  Ex2Drv(Img,NamSim,Reg,Sc,Fld);
  Ex2Ast(Img,NamSim,Reg,Sc,Fld);
NamSim = "S1_Mos_" + TglS_S1 + "_" + TglE_S1 + '_' + NamPrv; 
Img = S1.mean().select(Idx_S1).multiply(1000).toInt16();
  Ex2Drv(Img,NamSim,Reg,Sc,Fld);
  Ex2Ast(Img,NamSim,Reg,Sc,Fld);  
});
Btn_Repro.onClick(function(){
  TglR = (TB_SD.getValue()).split(','); print('Cek',TglR); 
  var Xt = Str2Num(TB_Point.getValue().split(',')[0]),
  Yt = Str2Num(TB_Point.getValue().split(',')[1]),
  Kord_Point= [Xt,Yt] ; Point_1 = ee.Geometry.Point(Kord_Point);
Data_S1=ImgCol(Point,TglR,'S1'); S1=Data_S1.Data; JumLst_S1 = Data_S1.JumLst; 
  LstImgs_S1 = (Data_S1.LstImgs); LstTgl_S1=LstImgCol_Tgl(S1); LstImgId_S1 = LstImgCol_SIdx(S1);
  LstTgl_S1d=Urut_Desc(LstTgl_S1),LstImgId_S1d=Urut_Desc(LstImgId_S1);
Data_S2=ImgCol(Point,TglR,'S2k'); S2=Data_S2.Data; JumLst_S2 = Data_S2.JumLst; 
  LstImgs_S2 = (Data_S2.LstImgs); LstTgl_S2=LstImgCol_Tgl(S2); LstImgId_S2 = LstImgCol_SIdx(S2);
  LstTgl_S2d=Urut_Desc(LstTgl_S2),LstImgId_S2d=Urut_Desc(LstImgId_S2);
Data_L8=ImgCol(Point,TglR,'L8'); L8=Data_L8.Data; JumLst_L8 = Data_L8.JumLst; 
  LstImgs_L8 = Data_L8.LstImgs;  LstTgl_L8=LstImgCol_Tgl(L8); LstImgId_L8 = LstImgCol_SIdx(L8);
  LstTgl_L8d=Urut_Desc(LstTgl_L8),LstImgId_L8d=Urut_Desc(LstImgId_L8);
print('Update Data S1, S2 & L8'); print('Jumlah Data S1 = ' + JumLst_S1,S1);
print('Jumlah Data S2 = ' + JumLst_S2,S2); print('Jumlah Data L8 = ' + JumLst_L8,L8);
Sel_Reset(Pil_S1,LstTgl_S1d); Sel_Reset(Pil_S2,LstTgl_S2d); Sel_Reset(Pil_L8,LstTgl_L8d);
//Pil_S2 = ui.Select({placeholder : ' S2 Data ',items:LstTgl_S2d}); 
//Pil_L8 = ui.Select({placeholder : ' L8 Data ',items:LstTgl_L8d});
  Map.setCenter(Xt,Yt,17); Set_Pilih(Point_1);
});
}
function GetImg_Ref(Img){
var imgDescription = ee.Algorithms.Describe(Img);
var Width  = ee.List(ee.Dictionary(ee.List(ee.Dictionary(imgDescription).get("bands")).get(0)).get("dimensions")).get(0);
var Height = ee.List(ee.Dictionary(ee.List(ee.Dictionary(imgDescription).get("bands")).get(0)).get("dimensions")).get(1);
var GeoRef = Img.select(0).geometry().bounds().coordinates().get(0).getInfo();
var Cc = [(GeoRef[1][0]-GeoRef[3][0])/2,(GeoRef[3][1]-GeoRef[1][1])/2];    
  return {LLxy:GeoRef[0],LRxy:GeoRef[1],URxy:GeoRef[2],ULxy:GeoRef[3],Cc:Cc,Width:Width,Height:Height };
   }
function Img2Thumb(Img,FZoom) {
var Lx = GetImg_Ref(Img.select(0)).Width,Ly = GetImg_Ref(Img.select(0)).Height; 
var Lxz=Math.round(Lx*FZoom),Lyz=Math.round(Ly*FZoom);
var thumb = ui.Thumbnail({
    image: Img, //Img2Vis(Img),
    params: {
        dimensions: Lxz + "x" + Lyz,
        format: 'png'
        },
    style: {height: Lyz + 'px', width: Lxz + 'px',padding :'3'}
    });
return thumb;
  }
function Img2Thumbz(Img,Lx,Ly,FZoom) {
var Lxz=Math.round(Lx*FZoom),Lyz=Math.round(Ly*FZoom);
var thumb = ui.Thumbnail({
    image: Img, //Img2Vis(Img),
    params: {
        dimensions: Lxz + "x" + Lyz,
        format: 'png'
        },
    style: {height: Lyz + 'px', width:  + 'px',padding :'3'}
    });
return thumb;
  }
function Img2Vis(Img,Mins,Maxs) {
 var ImgVis = Img.visualize({
  //  bands:  ['b1', 'b2', 'b3'], // Susunan RGB
    min: Mins, max: Maxs
    }); 
return ImgVis; 
  }
function Img2VisPar(Img,Vis) {
 return Img.visualize(Vis); 
}
function Klik_cek() {
Map.onClick(function(coords) {
  // Show the loading label.
Panel_1.widgets().set(7, ui.Label({value: 'Computing....'}));
var point = ee.Geometry.Point(coords.lon, coords.lat);
Ekstrak_Info(point,173,100); print(NamKec);
 KoordT = coords.lon.toFixed(6) + "," + coords.lat.toFixed(6);
 KoordG = coords.lat.toFixed(6) + "," + coords.lon.toFixed(6);  
 inspector.widgets().set(18, ui.Label({
      value: 'Lokasi ' + (k+1) + ' : ' + KoordT,
    }));
 var Buf = point.buffer(56); Koord_Gab[k]=KoordG; 
 Map.layers().set(2, ui.Map.Layer(Buf, {color: 'cyan'},'Buffer 12 Ha'));
 Map.layers().set(3, ui.Map.Layer(point, {color: 'FF8800'},'Point Lokasi ke-' + (k+1)));
Lok_Gab[k]=NamKec; Prv1_Gab[k]=Prv1; Prv2_Gab[k]=Prv2; TglPan_Gab[k] = Tgl_Panen;
var Prv1T,Prv2T; if (Prv1 !==0) Prv2T=Prv2.toFixed(2); else Prv2T='NaN'; 
  TB_Prv2.set('value',Prv2T); TB_TglPanen.set('value',Tgl_Panen);
  var Point_Feat = ee.Feature(point,{'Lokasi' : NamKec,'Koordinat':KoordT,
  'Provitas Potensi':Prv1,'Provitas Aktual':Prv2,'Waktu Panen':Tgl_Panen});
 // Point_Feat.set('Provitas Aktual',TB_Prv2.getValue());
  Point_Gab[k]= Point_Feat;  
  // Request the value from the server.
//  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
     inspector.widgets().set(6, ui.Label({
      value: 'Kecamatan : ' + NamKec,
    }));
    inspector.widgets().set(7, ui.Label({
      //value: 'Mean EVI : ' + result.toFixed(3),
      value: 'Potensi Provitas (Kw/Ha) : ' + Prv1.toFixed(2),
      }));
 k += 1; 
 // Tampilkan Titik2 yg sdh terpilih
  Map.layers().set(4, ui.Map.Layer(ee.FeatureCollection(Point_Gab), {color: 'FF0000'},'Point Lokasi terpilih'));
  });
}
//************* GUI
exports.UI_Margin=function(UI,y1, x1, y2, x2) {return UI_Margin(UI,y1, x1, y2, x2); }
exports.UI_Style=function(UI,Siz,Warna,NorBold,Align) {return UI_Style(UI,Siz,Warna,NorBold,Align); }
function UI_Margin(UI,y1, x1, y2, x2) { 
return UI.style().set({margin:y1+'px '+ x1+'px '+ y2+'px '+ x2+'px'}); 
  }
function UI_Style(UI,Siz,Warna,NorBold,Align) {
return UI.style().set({fontSize : Siz+'px',color : Warna,fontWeight : NorBold,
textAlign: Align}); // Align : ['left','center' ], fontWeight:'normal', 'bold' /size
}
//*************
function RenBnd(Img,Sel1,Sel2) {
  return Img.select(Sel1,Sel2);  
}
// Applies scaling factors L8.
function applyScaleFactors(image) {
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2).toFloat();
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0).subtract(273.15).toFloat();
  return image.addBands(opticalBands, null, true)
              .addBands(thermalBands, null, true);
}
function Div10K_S2k(image) {
  var opticalBands = image.select('B.*').divide(10000).toFloat();
  return image.addBands(opticalBands, null, true)
              ;
}
exports.ImgCol_Indo=function(Opsi){return ImgCol_Indo(Opsi); } 
exports.ImgCol=function(Bound,Tgl_R,Opsi){return ImgCol(Bound,Tgl_R,Opsi); } 
function ImgCol_Indo(Opsi) { // All bts Indo, Tgl-range sesuai data dr awal
  var JumLst,LstImgs,LstTgl,Data,Img_Id;
  if(Opsi=='S2k')Img_Id='COPERNICUS/S2_SR';
  else if(Opsi=='L8')Img_Id='LANDSAT/LC08/C02/T1_L2';
  else if(Opsi=='S1')Img_Id='COPERNICUS/S1_GRD';
  else Img_Id = Opsi;
  if(Opsi !='S1') Data= ee.ImageCollection(Img_Id).filterBounds(Bts_Indo);
  if(Opsi =='S1') Data=S1_Indo;
  if(Opsi=='S2k') Data=Data.map(Div10K_S2k).map(CMsk.RenBndS2).map(CMsk.AddBands_Idx);
  if(Opsi=='L8') Data=Data.map(applyScaleFactors).map(CMsk.RenBndL8b).map(CMsk.AddBands_Idx);
  Data = Data.sort('system:time_start') ; return Data;
}
function ImgCol(Bounds,Tgl_R,Opsi) {
  var JumLst,LstImgs,LstTgl,Data,Img_Id;
  Data = ImgCol_Indo(Opsi);
 if(Bounds !=='' || Bounds  > 0 ) Data = Data.filterBounds(Bounds);
 if(Tgl_R !=='' || Tgl_R  > 0 ) Data = Data.filterDate(Tgl_R[0],Tgl_R[1]);  else Data = Data;
  Data = Data.sort('system:time_start') ; JumLst = JumEl(Data); LstImgs = Lst_Imgs(Data);
  return {Data:Data,JumLst:JumLst,LstImgs:LstImgs};
}
//DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD
function GetImg_LstImgs(LstImgs,Idx) { // Get a img bdrskan urutan Idx 
  var Img = GetImg_Lst(LstImgs,Idx);
  return Img;
  }
function GetImg_Opsi(Idx,Opsi) { // Get a img bdrskan urutan Idx 
 //if(Opsi=='S2k') return  ee.Image('COPERNICUS/S2_SR/'+LstImgId_S2[Idx]);
// if(Opsi=='L8') return ee.Image('LANDSAT/LC08/C02/T1_L2/'+LstImgId_L8[Idx]);
  var Img; if(Opsi=='S2k') Img = GetImg_Lst(LstImgs_S2,Idx);
  if(Opsi=='L8') Img = GetImg_Lst(LstImgs_L8,Idx); 
  if(Opsi=='S1') Img = Radar.RGBS1_dB(GetImg_Lst(LstImgs_S1,Idx)).focal_median(); 
  return Img;
  }
exports.LstImgCol_Tgl=function(ImgCol){return LstImgCol_Tgl(ImgCol);}
function LstImgCol_Tgl(ImgCol) {
var imageList = ImgCol.toList(ImgCol.size());
  var id_list = imageList.map(function(item) {
  return ee.Date(ee.Image(item).get('system:time_start')).format(); });
return id_list.getInfo();
  }
exports.LstImgCol_SIdx=function(ImgCol){return LstImgCol_SIdx(ImgCol);}
function LstImgCol_SIdx(ImgCol) { 
var imageList = ImgCol.toList(ImgCol.size());
  var id_list = imageList.map(function(item) {
  return (ee.Image(item).get('system:index')); });
return id_list.getInfo();
  } 
function GetPR_Lst(Lst_ImgId,Opsi) {
  var Lst=[]; for (i=0; i < JumEl(Lst_ImgId,1); i++) {
    Lst[i]=GetPR(Lst_ImgId[i],Opsi)
  }
return Lst;
  }
exports.Lst_Imgs=function(ImgCol){return Lst_Imgs(ImgCol)};
function Lst_Imgs(ImgCol) { 
return ImgCol.toList(ImgCol.size()); // tinggal tambah : ee.Image
}
exports.GetImg_Lst=function(Lst_Imgs,Idx){return GetImg_Lst(Lst_Imgs,Idx);}
function GetImg_Lst(Lst_Imgs,Idx) { return ee.Image(Lst_Imgs.get(Idx)) } 
function GetPR(ImgId_Nam,Opsi) {
  var PR ; if(Opsi=='L8') PR = ImgId_Nam.split('_')[1];
  if(Opsi=='S2k') PR = Kanan(ImgId_Nam,6);  //T48MYU
return PR; 
  } 
  function Urut_Desc2(Arr,LstExt) {
  var PR,Arr2=[],JumLst = JumEl(Arr,1);
  for (i=0; i < JumLst; i++ ) {Arr2[i] = Arr[JumLst-1-i]; 
  if(LstExt !=='' || LstExt !== 0 ) Arr2[i] = Arr2[i]+ "_" + LstExt[i]; 
  } return Arr2;
}
function Urut_Desc(Arr) {
  var Arr2=[],JumLst = JumEl(Arr,1);
  for (i=0; i < JumLst; i++ ) {
  Arr2[i] = Arr[JumLst-1-i];
  } return Arr2;
}
/********** Save to 
created by Dr Dede Dirgahayu; Pusfatja, LAPAN_BRIN
*/
exports.Ex2Drv=function(Img,NamSim,Reg,Sc,Fld){return Ex2Drv(Img,NamSim,Reg,Sc,Fld)};
function Ex2Drv(Img,NamSim,Reg,Sc,Fld) {
Export.image.toDrive({
  image: Img, description: NamSim, region: Reg, 
  scale: Sc, maxPixels: 1e13, folder : Fld
});
}
exports.Ex2Ast=function(Img,NamSim,Reg,Sc,Fld){return Ex2Ast(Img,NamSim,Reg,Sc,Fld)};
function Ex2Ast(Img,NamSim,Reg,Sc,Fld) {
var Flds ; if(Ex2Ast !=='') Flds = Fld + '/' + NamSim; else Flds = NamSim;
Export.image.toAsset({
  image:Img,description: 'Ast_' + NamSim, assetId: Flds, 
  scale: Sc,maxPixels: 1e13, region: Reg,
 }); 
 }
exports.JumEl=function(ArObj,Opsi){return JumEl(ArObj,Opsi); }
function JumEl(ArObj,Opsi) {
  if (Opsi > 0) return ee.List(ArObj).length().getInfo(); else 
  return ArObj.size().getInfo();
} 
exports.Set_Map=function(No,Obj,Vis,Ket,Opsi,Opac){return Set_Map(No,Obj,Vis,Ket,Opsi,Opac);}
function Set_Map(No,Obj,Vis,Ket,Opsi,Opac) {
return Map.layers().set(No, ui.Map.Layer(Obj, Vis,Ket,Opsi,Opac));
} 
function ListPro_Obj(Obj,Pro) {// Pro : system:index,time_start
var LstObj = Obj
        .reduceColumns(ee.Reducer.toList(),[Pro])
        .get('list');
return LstObj;
}
function Sel_Reset(UI_Sel,Ids) {
  return UI_Sel.items().reset(Ids);
}
function Get_Lst(UI_Sel,Idx) {
  return UI_Sel.setValue(UI_Sel.items().get(Idx));
}
function Set_Pilih(Point_1) {
TglS_S1 = ee.Date(LstTgl_S1[0]).format(Fmt).getInfo(); TglE_S1 = ee.Date(LstTgl_S1[JumLst_S1-1]).format(Fmt).getInfo();
TglS_S2 = ee.Date(LstTgl_S2[0]).format(Fmt).getInfo(); TglE_S2 = ee.Date(LstTgl_S2[JumLst_S2-1]).format(Fmt).getInfo();
TglS_L8 = ee.Date(LstTgl_L8[0]).format(Fmt).getInfo(); TglE_L8 = ee.Date(LstTgl_L8[JumLst_L8-1]).format(Fmt).getInfo();
var Komp_L8,Komp_S2,Komp_S1;
Komp_L8 = L8.map(CMsk.CMsk_L8b).median().select(CMsk.Bnd_Optis());
Set_Map(0,S1.mean().select(BndRGB_S1),VisRGB_NCC_S1,'RGB NCC S1 Mosaik ' + TglS_S1 + ' to ' + TglE_S1,0);
Set_Map(1,Komp_L8,VisRGB_NCC_Mos,'RGB NCC L8 Mosaik ' +  TglS_L8 + ' to ' + TglE_L8);
Set_Map(2,S2.map(CMsk.CMsk_S2k_1).median().select(CMsk.Bnd_Optis()),VisRGB_NCC_Mos,'RGB NCC S2 Mosaik ' + TglS_S2 + ' to ' + TglE_S2);
Set_Map(3,GetImg_Opsi(JumLst_S1-1,'S1').select(BndRGB_S1),VisRGB_NCC_S1,'RGB NCC S1 ' + LstTgl_S1[JumLst_S1-1],0);
Set_Map(4,GetImg_Opsi(JumLst_L8-1,'L8').select(CMsk.Bnd_Optis()),VisRGB_NCC_L8,'RGB NCC L8 ' + LstTgl_L8[JumLst_L8-1],0);
Set_Map(5,GetImg_Opsi(JumLst_S2-1,'S2k').select(CMsk.Bnd_Optis()),VisRGB_NCC_S2,'RGB NCC S2 ' + LstTgl_S2[JumLst_S2-1]);
Set_Map(6,S2.select(Bnd_Idx),{},'TSeries BI,EVI,WI S2',0);
Set_Map(7,Point_1.buffer(56),{color:'cyan'},'Buffer 1 Ha',1,0.5);
Set_Map(8,Point_1,{color:'red'},'Point Interest');
Lbl_Tgl_S1.setValue('S1 ' + LstTgl_S1[JumLst_S1-1] );
Lbl_Tgl_S2.setValue('S2 ' + LstTgl_S2[JumLst_S2-1] ); 
Lbl_Tgl_L8.setValue('L8 ' + LstTgl_L8[JumLst_L8-1] );
return 1;}
//********************
function UI_Sel(PH,Item_Arr,Pos,Fungsi) {
var UI =  ui.Select({
      placeholder : PH,
      //items: Object.keys(), 
      items : Item,
      style : {position : Pos   },
      onChange: function() {
        var Idx,Tgl_Pilih,Val = UI.getValue();
        Idx = Ekstrak.GetIdxArr(LMod13,Val);
        //Tgl_Pilih = ee.Date(LMod13_Tgl[Idx]).format('YYYY-MM-dd').getInfo();
        Tgl_Pilih = LMod13_Tgl[Idx];
        print('Pilihan = '+Val,'Tgl = ' + Tgl_Pilih );
        Mod13_Last = GetImgCIdx(TSDat,LMod13[Idx]); 
        FeaTxt.SetMap(1,Mod13_Last,VisNCC_Mod13,'Img Tgl '+Tgl_Pilih ,1);
         }
}); 
return UI ;
  }
// String Function
function Len(Str) {
  return ee.String(Str).length().getInfo();
}
function Mid1(Str,s1,s2){// dr 1
  return Str.slice(s1-1,s2);
}
function Mid(Str,s1,Jum){
  return Str.slice(s1,s1-1+Jum);
}
function Kiri(Str,JumStr){// dr 1
  return Str.slice(0,JumStr);
}
function Kanan(Str,Jum){// dr 1
  return Str.slice(Len(Str)-Jum,Len(Str));
}
function Str2Num(Str){
  return parseFloat(Str);
}
function Split(Str,Pemisah) {
  return Str.split(Pemisah);
}
exports.Str2Num=function(Str){return Str2Num(Str);}
function DisFeat(Feat) {
    return Feat.geometry().dissolve();
  }
function Geom2Kords(Geom) {
    return Geom.coordinates().getInfo();
  }
  function Kords2Geom(Kord,Opsi,Rad) {
    var Feat; if(Opsi== 'Point')Feat = ee.Geometry.Point(Kord);
    if(Opsi=='Rec')Feat = ee.Geometry.Rectangle(Kord);
    if(Opsi=='Buf')Feat = (ee.Geometry.Point(Kord)).buffer(Rad);
    return Feat;
  }
  function Feat2Kords(Feat) {
    return (Feat.geometry()).coordinates().getInfo();
  }
  function HitLuas_Geom(Img,Geom,Sc) {
var Area = Img.multiply(ee.Image.pixelArea()).divide(10000)
           .rename('Luas_Ha').toFloat();
var stats = Area.reduceRegion({
  reducer : ee.Reducer.sum(),
  geometry: Geom,
  scale : Sc,
  maxPixels: 1e13
});
return stats;
}
function Histogram_Geom(Img,Geom,Sc) {
var Hist = Img.reduceRegion({
  reducer : ee.Reducer.histogram(),
  geometry: Geom,
  scale : Sc,
  maxPixels: 1e13
});
return Hist; 
}
function KlikMap(Met_EVI,RadBuf,Sc) {
// Configure the map.
Map.style().set('cursor', 'crosshair');
// Create a panel and add it to the map.
var inspector = ui.Panel([ui.Label('Click to get mean EVI')]);
Map.add(inspector);
Map.onClick(function(coords) {
  // Show the loading label.
  inspector.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray',fontSize:'14px'}
  }));
  // Determine the mean EVI Max, a long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var Lokasi = coords.lon.toFixed(6) + "," + coords.lat.toFixed(6);
  // Ektrak Nama Kecamatan dr Properties Tabel/shp
 // var NamKec = List_Kec.get(0).getInfo(); 
  //var meanNdvi = ndvi.reduce('mean');
  var sample = Met_EVI.select('EVI_Max').sample(point.buffer(RadBuf), Sc);
  var computedValue = sample.first().get('EVI_Max');
  // Request the value from the server.
  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
    inspector.widgets().set(0, ui.Label({
      value: 'Koordinat : ' + Lokasi,
      style: {color: 'red',fontSize:'11px'}
    }));
  /*   
     inspector.widgets().set(1, ui.Label({
      value: 'Kecamatan : ' + NamKec.toString(),
    }));
  */  
    inspector.widgets().set(1, ui.Label({
      value: 'Mean EVI : ' + result.toFixed(3),
      style: {color: 'green',fontSize:'12px',
       // margin : '-5px 0 0 0'
      }
    }));
  });
});
}
function Obj2Bound(Obj) { // Obj : Img or feat
var GeoRef = Obj.geometry().bounds().coordinates().get(0).getInfo();
var dx,dy,Cc,Cx,Cy;
   dx = (GeoRef[1][0]-GeoRef[3][0])/2 ; dy=(GeoRef[3][1]-GeoRef[0][1])/2;
   Cx = GeoRef[3][0] + dx; Cy = GeoRef[3][1] - dy; 
   Cc = [parseFloat(Cx.toFixed(7)),parseFloat(Cy.toFixed(7))];
   return {LLxy:GeoRef[0],LRxy:GeoRef[1],URxy:GeoRef[2],ULxy:GeoRef[3],CCxy:Cc}
}
function Poly2Img(fc,ValOutLn,TebalOutLn,TyDt) {
  var Img =  ee.Image()
//  .paint(fc, ValIsi) // Get color from property named 'ValIsi'
  .paint(fc, ValOutLn, TebalOutLn) // Outline using value/color ValOutLn, width TebalOutLn.
  ;
if (TyDt == 1) Img = Img.toUint16(); else Img = Img.toByte(); 
return Img; 
  }