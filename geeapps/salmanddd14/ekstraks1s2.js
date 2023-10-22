var S1_GRD = ui.import && ui.import("S1_GRD", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    SHSri22_Point = ui.import && ui.import("SHSri22_Point", "table", {
      "id": "projects/ee-dededirgahayu11/assets/Shp/Sri22_Point"
    }) || ee.FeatureCollection("projects/ee-dededirgahayu11/assets/Shp/Sri22_Point"),
    SHSri_2022 = ui.import && ui.import("SHSri_2022", "table", {
      "id": "projects/ee-dededirgahayu11/assets/Shp/SHSRI22_edJul"
    }) || ee.FeatureCollection("projects/ee-dededirgahayu11/assets/Shp/SHSRI22_edJul"),
    Anno_Sri22 = ui.import && ui.import("Anno_Sri22", "image", {
      "id": "projects/ee-dededirgahayu11/assets/Img/AnnoBlok_Sri22"
    }) || ee.Image("projects/ee-dededirgahayu11/assets/Img/AnnoBlok_Sri22"),
    Geom_S2_Sbg1 = ui.import && ui.import("Geom_S2_Sbg1", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                106.80531188782454,
                -5.870341541766845
              ],
              [
                106.80531188782454,
                -6.416501177872218
              ],
              [
                107.79820129212142,
                -6.416501177872218
              ],
              [
                107.79820129212142,
                -5.870341541766845
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[106.80531188782454, -5.870341541766845],
          [106.80531188782454, -6.416501177872218],
          [107.79820129212142, -6.416501177872218],
          [107.79820129212142, -5.870341541766845]]], null, false),
    Fase_S2_18Jul2022_Sbg1 = ui.import && ui.import("Fase_S2_18Jul2022_Sbg1", "image", {
      "id": "projects/ee-salmanddd14/assets/Img/Fase_S2_18Jul2022"
    }) || ee.Image("projects/ee-salmanddd14/assets/Img/Fase_S2_18Jul2022");
var CMsk = require('users/dededirgahayu11/Fungsi:DD_CMask.js');
var FTxt = require('users/dededirgahayu11/Fungsi:DD_FeaText_ed.js');
var GUI = require('users/dededirgahayu11/Fungsi:DD_GUI.js');
var LBS = require('users/dededirgahayu11/Fungsi:DD_LBS2019.js');
var Eks = require('users/dededirgahayu11/Fungsi:DD_Ekstrak.js');
//var Sri_Blok_Img = FTxt.Anno2FC(SHSri_2022,'IDBLKNO22','ID22'); print(Sri_Blok_Img);
//Update Luas Feat
SHSri_2022 = SHSri_2022.map(function(f){
  var VKls_Benih = ee.String(f.get('VIMX_KLS')).cat('_').cat(ee.String(f.get('AREAL22')));
  return f.set('AREA_HA',f.area().divide(1e4)).set('VKls_Benih',VKls_Benih);
});
print('Update Sri',SHSri_2022.first());
var Lst_NBlok = FTxt.LstFeatPro(SHSri_2022,'NBLOKNO','ID22').getInfo();
print('List Nama & No Blok',Lst_NBlok);
var i,JumRec,LstFt,ImgTxt=[],Feat1,Point,ImgTxt1,scale=5  ;
JumRec = Jum_El(SHSri22_Point,1);
Point = SHSri22_Point.filter(ee.Filter.eq('ID22',1));
// (1) Get Id Data
 var Sat_ImgId = { 
  L8 : 'LANDSAT/LC08/C02/T1_L2',
  L9 : 'LANDSAT/LC09/C02/T1_L2',
  S2 : 'COPERNICUS/S2',
  S2k: 'COPERNICUS/S2_SR_HARMONIZED', // new Collection
  S1 : 'COPERNICUS/S1_GRD',
  Planet : "projects/planet-nicfi/assets/basemaps/asia",
  MOD13T : "MODIS/006/MOD13Q1",
  MOD13A : "MODIS/061/MYD13Q1",
  FireCCI : 'ESA/CCI/FireCCI/5_1', //BurnDate,CL%,LC 100m hg Des 2020
  FIRMS : 'FIRMS', // T21 K,CL%,Line CSV ; -2001 hg now
};
var Pros_S1 = S1_GRD.first().propertyNames().sort().getInfo(),
    Pros_S2 = GetSat('S2k').first().propertyNames().sort().getInfo()
;
print('S1 Properties S2',Pros_S1,'S1 Properties S2',Pros_S2);
//########### BOUNDS
var Shp_Prv,Shp_Kab,Shp_Kec,Shp_Adm,LBSwh,LstPrv_2010,LstKab_2010,LstKab_Nam,Shp_Clp,LstKec_2010;
 Shp_Prv = FTxt.Indo10_Prv;  Shp_Kab = FTxt.Indo10_Kab;  Shp_Kec = FTxt.Indo10_Kec; 
 LstPrv_2010 = FTxt.LstPrv_2010.getInfo(); LstKab_2010 = FTxt.LstKab_2010.getInfo();
 LstKec_2010 = FTxt.LstKec_2010.getInfo(); LBSwh =  LBS.LBS10mIndo();
 print('Lahan Baku Swh',LBSwh);
var Prv_Pty,Kab_Pty,Kec_Pty;
Prv_Pty = Shp_Prv.first().propertyNames().sort().getInfo();
Kab_Pty = Shp_Kab.first().propertyNames().sort().getInfo();
Kec_Pty = Shp_Kec.first().propertyNames().sort().getInfo();
print('Properties of ',Prv_Pty,Kab_Pty,Kec_Pty);
var Kords_Bounds = [106.978298,-6.036429,108.064571,-6.398893];
var i,Bounds1 = SHSri_2022.geometry().dissolve();
print('Bounds Sri',Bounds1);
Map.centerObject(Bounds1,11);
Kords_Bounds = Map.getBounds(); 
var Point = Map.getCenter(),Bounds = Bounds1;
var Redu = Redu_MnMxMeanStd(); print(Redu);
var DE = ee.Date(Date.now()),DS=DE.advance(-4,'month'),
    DEt=DE.format('YYYY-MM-dd').getInfo(),DSt=DS.format('YYYY-MM-dd').getInfo(),
    TglR = [DSt,DEt+'T14:59'];
print('Feat_Type : '+ Point.type().getInfo(),Point,TglR);
var Data_S1 ,Info_S1,LstImgs ,LstImgId,LstDt,ImgCount,S1_Max,Tgl_S1 ;
Data_S1 = Pilih_S1(TglR,'','',Bounds,'','').map(CMsk.AddYear2K);
Info_S1 = LstImgC(Data_S1);
  LstImgs = Info_S1.Imgs ; LstImgId=Info_S1.Ids ;
  LstDt = Info_S1.Dts; ImgCount= Info_S1.Count;
  print('Data_S1 = ' + ImgCount,LstImgId);
var S1_Dsc = Data_S1.filter(ee.Filter.eq('orbitProperties_pass','DESCENDING'));
var Info_S1_Dsc = LstImgC(S1_Dsc);
  print('List Tgl S1 Dsc',Info_S1_Dsc.Dts);
var Data_S2,S2_Max,Tgl_S2, Info_S2,LstImgs_S2,LstImgId_S2,LstDt_S2,ImgCount_S2,BndNms_S2;
Data_S2 = CMsk.Pil_Data('S2k',TglR,Bounds,0); Info_S2=LstImgC(Data_S2);
BndNms_S2 = Data_S2.first().bandNames().getInfo(); print("Info_S2",Info_S2,'Band Names',BndNms_S2);
LstImgs_S2 = Info_S2.Imgs ; LstImgId_S2=Info_S2.Ids ;
  LstDt_S2 = Info_S2.Dts; ImgCount_S2= Info_S2.Count;
//  print('Data_S2 = ' + ImgCount_S2,LstImgId_S2);
var LstDt_Arr =  LstDt.reverse().getInfo(),
  LstDt_Arr_S2 =  LstDt_S2.reverse().getInfo();
S1_Max = Data_S1.qualityMosaic('RPI'); S2_Max = Data_S2.qualityMosaic('EVI');
var S1_Geom = S1_Max.select('RPI').geometry().bounds();
//LBSwh = S1_Max.clip(S1_Geom); 
var Stk_Img = StkImg(Data_S1.first(),30,['API','RPI','NDPI'],['VV','VH','VV-VH']);
var Stk_Out = GetMnMx_StkImg(Stk_Img);
//var bb = Stk_Img.get('min') , ba = Stk_Img.get('max');
var Bbt = Stk_Out.min,Bat = Stk_Out.max ;
print(Stk_Img,Bbt,Bat);
var VisRGB_S2 = { min:[0,0,0],max:[0.35,0.45,0.25],bands :['Swir1','Nir','Red']};
var VisRGB_S1dB = { min:[-28.561,-35.653,-0.266],max:[5.620,-0.771,14.563]};
VisRGB_S1dB = { min:[ -24.01,-35.54,1.73],max:[3.69,-0.75,14.60]};
//VisRGB_S1dB = { min:[-26.15,-36.74,2.14],max:[-5.00,-11.86,16.88]};
//CMsk.Set_Map(0,Data_S1.mean(),VisRGB_S1dB,'RGB S1');
//@@@@@@@@@@@@@@ GUI
var Lbl_Judul = UI_Lbl('Sentinel-1/2 Data Analysis FOR PLANT GROWTH PHENOLOGICAL IDENTIFICATION'.toUpperCase(),'red',14)
  ,Lbl_Inv= UI_Lbl('Inventor : Dr Dede Dirgahayu; PRPJ,ORPA-BRIN','red',11)
  ,Lbl_Url_S1 = UI_Lbl('Download S1 Stat','blue',11), Lbl_Url_S2 = UI_Lbl('Download S2 Stat','blue',11);
  UI_Sty(Lbl_Inv,'red','',11,'bold','center');
  UI_Sty(Lbl_Judul,'green','lightyellow',16,'bold','center','2px solid blue');
  Lbl_Judul.style().set({padding:'4px'});
var Lbl_Stat =  UI_Lbl('Stk Result','red',11);
var TB_SED = UI_TB(DSt+","+DEt,'green',11,150);
var Bounds_Pil = ['Paddy Field of SH Sri','AdminBounds', 'CurrentBounds','CurrentCenter'],Jum_Bounds_Pil;
Jum_Bounds_Pil = Jum_El(Bounds_Pil,0);
var Pil_Bounds = UI_Pil(Bounds_Pil,'Bounds','magenta');
var TB_Bounds = UI_TB(Kords_Bounds,'red',11,150); UI_Margin(TB_Bounds,-35,0,0,150);
var Sel_S1 = UI_Pil(LstDt_Arr,'S1 Dates','red'), Sel_S2 = UI_Pil(LstDt_Arr_S2,'S2 Dates','blue');
var Sel_Prv = UI_Pil(LstPrv_2010,'Prov Admin','red'), Sel_Kab = UI_Pil(LstKab_2010,'Distric Admin','blue');
var Btn_Stat = UI_Btn('Img Stat','red'), Btn_ReSet = UI_Btn('ReSet','red'),
    Btn_Stretch = UI_Btn('Img Stretch 2.5 Std','magenta');
UI_Margin(Btn_ReSet,-34,0,0,170); UI_Margin(Sel_S2,-36,0,0,155); 
UI_Margin(Sel_Kab,-36,0,0,155);
UI_Margin(Lbl_Url_S2,-22,0,0,160); UI_Margin(Btn_Stretch,-34,0,0,160); 
var Lbl_Par = UI_Lbl('PARAMETERS','red',12,'bold'),Lbl_Leg = UI_Lbl('LEGENDS','green',12,'bold'),
    Lbl_Grph = UI_Lbl('GRAPHICS','violet',12,'bold'),Lbl_StkPn=UI_Lbl('STATISTICS','red',12,'bold');
//  Legenda
var Pal_EVIMax = ['ff00ff','ffaa44','00ffff','ffff00','aaaa00','88ff00','00ff00','00bb00','008800'];
var Ket_EVIMx = ['< 0.4', '0.40-0.45','0.45-0.50','0.50-0.55','0.55-0.60','0.60-0.65','0.65-0.70','0.70-0.75','> 0.75'];
var Ket_RPIMx = ['< 0.3', '0.30-0.35','0.35-0.40','0.40-0.45','0.45-0.50','0.50-0.55','0.55-0.60','0.60-0.65','> 0.65'];
var Leg_EVIMax = GUI.Legenda('Max_EVI',TglR[0] + ' to ' + TglR[1].slice(0,10),Ket_EVIMx,Pal_EVIMax);
var Leg_RPIMax = GUI.Legenda('Max_RPI',TglR[0] + ' to ' + TglR[1].slice(0,10),Ket_RPIMx,Pal_EVIMax);
UI_Margin(Leg_RPIMax,-232,0,0,200);
var Pnl_Judul = UI_Pnl([Lbl_Judul,Lbl_Inv],'130%','100px','3px solid darkblue'),
  Pnl_Par = UI_Pnl([Lbl_Par,TB_SED,Btn_ReSet,Pil_Bounds,TB_Bounds,Sel_S1,Sel_S2,Sel_Prv,Sel_Kab],'130%','150px','2px solid darkblue'),
  Pnl_Legends = UI_Pnl([Lbl_Leg,Leg_EVIMax,Leg_RPIMax],'150%','200px','2px solid darkblue'),
  Pnl_Graph = UI_Pnl([Lbl_Grph],'120%','200px','2px solid darkblue'),
  Pnl_Stat = UI_Pnl([Lbl_StkPn,Btn_Stat,Btn_Stretch,Lbl_Stat,Lbl_Url_S1,Lbl_Url_S2],'120%','150px','2px solid darkblue'),
Panel_Main = UI_Pnl([Pnl_Judul,Pnl_Par,Pnl_Legends,Pnl_Graph,Pnl_Stat],
    '24%','100%','3px solid darkblue');
ui.root.insert(0,Panel_Main);
Prv_Shp_Pil = Shp_Prv.filter(ee.Filter.eq('NAMA_PROV','Jawa_Barat'));
Shp_Clp = Prv_Shp_Pil;
var Grd_Clp = 1;
LBSwh = LBSwh.clip(Shp_Clp); 
// Lbl Tgl Img Pil taro di Map
Tgl_S1 = LstDt_Arr[0]; Tgl_S2 = LstDt_Arr_S2[0]; 
var Lbl_S1 = UI_Lbl('S1_' + Tgl_S1,'red',11),Lbl_S2 = UI_Lbl('S2_'+Tgl_S2,'blue',11);
var Pnl_LblData = UI_Pnl([Lbl_S1,Lbl_S2],'150px','50px','1px solid red','horizontal');
Pnl_LblData.style().set('position','bottom-left'); 
Lbl_S1.style().set('position','bottom-center'); Lbl_S2.style().set('position','bottom-center');
Map.add(Lbl_S1).add(Lbl_S2);
var Prv_Shp_Pil,Kec_Shp_Pil,Kab_Shp_Pil;
//********** GUI Events
var Img_S1,Img_S2,Img_Pln,Img_L8 ;
//!!!!!!!!!! RESET
Btn_ReSet.onClick(function(Cek){
/*
Kords_Bounds = Map.getBounds(); 
Kords_Bounds=[parseFloat(Kords_Bounds[0].toFixed(6)),parseFloat(Kords_Bounds[3].toFixed(6)),
    parseFloat(Kords_Bounds[2].toFixed(6)),parseFloat(Kords_Bounds[1].toFixed(6))];
*/
if(Bounds_Pil.indexOf(Pil_Bounds.getValue()) < 1)Bounds = SHSri_2022;
else { print('Cek = ' , Txts2Val(TB_Bounds.getValue()));
Kords_Bounds = Txts2Val(TB_Bounds.getValue());
Point = Map.getCenter(); 
Bounds = Kords2Geom(Kords_Bounds);
}
//TglR = [DSt,DEt+'T14:59'];
TglR = TB_SED.getValue().split(","); TglR[1]=TglR[1]+'T14:59';
//Pilih_S1(Tgl_Range,PilBnd,Komp,AOI,FltSpas,Clp);
Data_S1 = Pilih_S1(TglR,"","",Bounds,"","").map(CMsk.AddYear2K);
Info_S1 = LstImgC(Data_S1); LstImgs = Info_S1.Imgs ; LstImgId=Info_S1.Ids ;
  LstDt = Info_S1.Dts; ImgCount= Info_S1.Count;
 // print('Data_S1 = ' + ImgCount,LstImgId);
Data_S2 = CMsk.Pil_Data('S2k',TglR,Bounds,0); Info_S2=LstImgC(Data_S2);
print("Info_S2",Info_S2);
LstImgs_S2 = Info_S2.Imgs ; LstImgId_S2=Info_S2.Ids ;
  LstDt_S2 = Info_S2.Dts; ImgCount_S2= Info_S2.Count;
  print('Data_S2 = ' + ImgCount_S2,LstImgId_S2);
LstDt_Arr =  LstDt.reverse().getInfo();
LstDt_Arr_S2 =  LstDt_S2.reverse().getInfo();
Sel_S1.items().reset(LstDt_Arr); Sel_S2.items().reset(LstDt_Arr_S2);
S1_Max = Data_S1.qualityMosaic('RPI'); S2_Max = Data_S2.qualityMosaic('EVI');
});
Pil_Bounds.onChange(function(Cek){
Kords_Bounds = Map.getBounds(); 
Kords_Bounds=[parseFloat(Kords_Bounds[0].toFixed(6)),parseFloat(Kords_Bounds[3].toFixed(6)),
    parseFloat(Kords_Bounds[2].toFixed(6)),parseFloat(Kords_Bounds[1].toFixed(6))];
Point = Map.getCenter(); print('Point',Point);
if(Cek==Bounds_Pil[Jum_Bounds_Pil-2]) Bounds = ee.Geometry.Rectangle(Kords_Bounds); 
else if(Cek==Bounds_Pil[Jum_Bounds_Pil-1]) {Bounds = Point; 
Kords_Bounds = Point.coordinates().getInfo(); Kords_Bounds= [parseFloat(Kords_Bounds[0].toFixed(6)),
parseFloat(Kords_Bounds[1].toFixed(6))]} 
else {Bounds = SHSri_2022; Kords_Bounds = Bounds_Pil[0]; }
TB_Bounds.setValue(Kords_Bounds);
});
Sel_S1.onChange(function(Cek){
  var Idx = LstDt_Arr.indexOf(Cek);
  Img_S1 = GetImgLstImgs(LstImgs,Idx);
//  Map.centerObject(Img_S1,10);
  CMsk.Set_Map(1,Img_S1,VisRGB_S1dB,'RGB S1 ' + Cek,0);
  Lbl_S1.setValue('S1_' + Cek);
});
Sel_S2.onChange(function(Cek){
  var Idx = LstDt_Arr_S2.indexOf(Cek);
  Img_S2 = GetImgLstImgs(LstImgs_S2,Idx);
//  Map.centerObject(Img_S2.bounds(),10);
  CMsk.Set_Map(0,Img_S2,VisRGB_S2,'RGB S2 ' + Cek,0);
  Lbl_S2.setValue('S2_' + Cek);
});
var Vis_Fase = {min:1,max:7,palette:['blue','00ff00','00aa00','dddd00','yellow','feC0C0','gray']};
Map.centerObject(Bounds,14);
var S2_Max_EVI_Kls = (S2_Max.select('EVI').subtract(0.35)).divide(0.05).ceil().toByte().rename('EVIMax_Kls').focalMode().mask(LBSwh);
var S1_Max_RPI_Kls = (S1_Max.select('RPI').subtract(0.25)).divide(0.05).ceil().toByte().rename('RPIMax_Kls').focalMode().mask(LBSwh);
Sel_S2.setValue(LstDt_Arr_S2[0]); Sel_S1.setValue(LstDt_Arr[0]);
CMsk.Set_Map(2,S2_Max_EVI_Kls,{min:1,max:9,palette:Pal_EVIMax},'Max EVI of S2 ' + TglR[0] + ' to ' + TglR[1].slice(0,11));
CMsk.Set_Map(3,S1_Max_RPI_Kls,{min:1,max:9,palette:Pal_EVIMax},'Max RPI of S1 ' + TglR[0] + ' to ' + TglR[1].slice(0,11));
CMsk.Set_Map(4,Fase_S2_18Jul2022_Sbg1.mask(LBSwh),Vis_Fase,'Fase S2 18 Juli 2022');
CMsk.Set_Map(5,Anno_Sri22,{min:1,max:3,palette:['brown','darkred','darkblue']},'PaddyFiels of SH Sri');
CMsk.Set_Map(6,SHSri22_Point,{color  : 'red'},'Central Block of SH Sri');
var Lbl_Klik = UI_Lbl('Compute...'),Lbl_Result = UI_Lbl('...');
var Cek_Stat = UI_Pnl([Lbl_Klik,Lbl_Result],'100px','20px');
var Stk_Img_Reg, StkUrl, selectors, filename,StkUrl_S2, Select_S2,Sim_S2;
//EVENTS
Btn_Stat.onClick(function(Cek){
  Lbl_Stat.setValue("");
  Lbl_Stat.setValue('Start Computing.....');
  var Geom = ee.Geometry.Rectangle(Map.getBounds());
  var Sc = Map.getScale(); print('Sc = ' + Sc);
  Stk_Img = StkImg(Img_S1,Sc,['API','RPI','NDPI'],['VV','VH','VV-VH','API','RPI','NDPI']);
  //var Stk_Url = ee.Feature(Stk_Img).getDownloadURL('CSV', ['RPI_mean','RPI_stdDev'], 'Test_Stk.csv');
  //Lbl_Url.setUrl(Stk_Url);
  var Stk_Out = GetMnMx_StkImg(Stk_Img);
  print('Stk_Img at (LLx,LLy,URx,URy) ',Map.getBounds(),Stk_Img);
  var Stk_RGB = 'min(VV,VH,DP,API,RPI,NDPI) : ' + Stk_Out.min + "\r" + 
      'max(VV,VH,DP) : ' + Stk_Out.max + "\r" ;
  Lbl_Stat.setValue(Stk_RGB); 
//  Stk_Img_Reg = StkImgRegs(Img_S1,ee.Reducer.mean(),10,SHSri_2022.select('ID'));
var S1_PilBnds = ['API','RPI','NDPI','VH_Int',"YearFr2000"],
    S2_PilBnds = CMsk.JumArr(Data_S2.first().bandNames().getInfo().slice(1,16),"YearFr2000");
    var Data_S1_Sel = Data_S1.select(S1_PilBnds),
    Feat_Pil = SHSri_2022.sort('ID22').select(['ID22','IDBLKNO22']),
    Data_S2_Sel = Data_S2.select(S2_PilBnds);
    print('S2_PilBnds',S2_PilBnds);
  Stk_Img_Reg = Eks.EksImgCFeat(Data_S1_Sel,Feat_Pil,10); 
  print('Stk_Img_Reg',Stk_Img_Reg);
 // getDownloadURL(format, selectors, filename, callback)
 selectors = ['ID22','IDBLKNO22',"Img_Date", "YearFr2000_mode",'API_mode','RPI_mode','NDPI_mode','VH_Int_mode','API_mean','RPI_mean','NDPI_mean','VH_Int_mean','API_stdDev','RPI_stdDev','NDPI_stdDev','VH_Int_stdDev'];
 filename = 'S1_' + Sel_S1.getValue();
  StkUrl = Stk_Img_Reg.getDownloadURL('CSV', selectors, filename); Lbl_Url_S1.setUrl(StkUrl);
var Stk_Img_Reg_S2 = Eks.EksImgCFeat(Data_S2_Sel,
    SHSri_2022.sort('ID22').select(['ID22','IDBLKNO22']),10);   
Select_S2 = ['ID22','IDBLKNO22',"Img_Date", "YearFr2000_mode",'NDBI_mode','EVI_mode','NDWI_mode','NBR_mode','NDBI_stdDev','EVI_stdDev','NDWI_stdDev','NBR_stdDev'];
 Sim_S2 = 'S2_' + Sel_S2.getValue();
StkUrl_S2 = Stk_Img_Reg_S2.getDownloadURL('CSV', Select_S2, Sim_S2); Lbl_Url_S2.setUrl(StkUrl_S2);
});
Sel_Prv.onChange(function(Cek){
  Prv_Shp_Pil = Shp_Prv.filter(ee.Filter.eq('NAMA_PROV',Cek));
  Kab_Shp_Pil = Shp_Kab.filter(ee.Filter.eq('NAMA_PROV',Cek));
  Kec_Shp_Pil = Shp_Kec.filter(ee.Filter.eq('NAMA_PROV',Cek));
  LstKab_Nam = FTxt.LstFeatPro(Kab_Shp_Pil,'KABKOT','KB_ID').getInfo();
  Bounds = Prv_Shp_Pil; Sel_Kab.items().reset(LstKab_Nam);
  Shp_Clp = Prv_Shp_Pil;
  });
Sel_Kab.onChange(function(Cek){
//  Prv_Shp_Pil = Shp_Prv.filter(ee.Filter.eq('KABKOT',Cek));
  Kab_Shp_Pil = Shp_Kab.filter(ee.Filter.eq('KABKOT',Cek));
  Kec_Shp_Pil = Shp_Kec.filter(ee.Filter.eq('KABKOT',Cek));
  Bounds = Kab_Shp_Pil; Shp_Clp = Kab_Shp_Pil;
  });
//************** RADAR
function Pilih_S1(Tgl_Range,PilBnd,Komp,AOI,FltSpas,Clp) {
  // Created by Dr Dede Dirgahayu
var S1 = ee.ImageCollection("COPERNICUS/S1_GRD")
.filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.inList('orbitProperties_pass', ['ASCENDING','DESCENDING']))
    .select('VV','VH','angle').map(Rem_Noise).map(Koreksi_S1)
    .filterDate(Tgl_Range[0],Tgl_Range[1])
     ;
if (AOI !=='' ) S1 = S1.filterBounds(AOI); 
//despeckle Radar : median spatial filter 3x3
S1 = S1.map(FltSpsMed); 
if (Komp !=='') S1 = Komp_ImgCol(S1,'Mean','');
if (Komp !=='' && FltSpas !== '') S1 = Filt_Spas(S1,FltSpas);
if (Clp !== '' && Komp !=='') S1=S1.clip(Clp); // Crooping
if (Komp !=='')  S1 = S1.set("Img_Date",Tgl_Range[0])
.set("system:time_start",ee.Date(Tgl_Range[0]).millis()).set("system:time_end",ee.Date(Tgl_Range[1]).millis());
if (PilBnd !=='') { if(S1 === null) S1 = Img_Null(PilBnd,Clp); 
       else S1=S1.select(PilBnd); }
return S1.sort('system:time_start');
}
function Rem_Noise(Img) { // Hilangkan Border Noise, biasanya nilai minimum pd bts scene
  var edge = Img.lt(-30); // -30.0
    var maskedImage = Img.mask().and(edge.not());
    return Img.updateMask(maskedImage) 
    //.copyProperties(Img,['system:time_start','system:index'])
    ;   
        }
function Koreksi_S1(img) {
   // Koreksi Inc Angle
   var VV_Corr = img.select('VV').subtract(img.select('angle').multiply(Math.PI/180.0).cos().
    log10().multiply(10.0)).rename('VV').toFloat();
    var VH_Corr = img.select('VH').subtract(img.select('angle').multiply(Math.PI/180.0).cos().
    log10().multiply(10.0)).rename('VH').toFloat() ;
    var VV_VH = VV_Corr.select('VV').subtract(VH_Corr.select('VH')).rename('VV-VH');
    var VV_Int = VV_Corr.expression('10**(VV/10)',{VV : VV_Corr.select('VV')}).rename('VV_Int').toFloat();
    var VH_Int = VH_Corr.expression('10**(VH/10)',{VH : VH_Corr.select('VH')}).rename('VH_Int').toFloat();
    var API = (VV_Int.add(VH_Int)).divide(2.0).rename('API').toFloat();
    var RPI = VH_Int.divide(VV_Int).toFloat().rename('RPI');
    var NDPI = ((VV_Int.subtract(VH_Int)).divide((VV_Int.add(VH_Int)))).toFloat().rename('NDPI');
    var MPI = (NDPI.multiply(-1.0)).add(1.0).rename('MPI').toFloat();
return  VV_Corr.addBands(VH_Corr).addBands(VV_VH).addBands(API).addBands(NDPI)
  .addBands(RPI).addBands(MPI).addBands(VH_Int)
  .copyProperties(img,Pros_S1)
  ;
}
function Komp_ImgCol(ImgC,MetKomp){
  if (MetKomp=='Mean') return ImgC.mean();
  else if (MetKomp=='Max') return ImgC.max();
  else if (MetKomp=='Min') return ImgC.min();
  else if (MetKomp=='Med') return ImgC.median();
  else if (MetKomp=='Mod') return ImgC.mode();
  else if (MetKomp=='Qual') return ImgC.qualityMosaic('EVI');
  else if (MetKomp=='Std') return ImgC.reduce(ee.Reducer.stdDev());
  else if (MetKomp=='Range') return ImgC.max().subtract(ImgC.min());
  else if (MetKomp=='CoefVar') return ImgC.reduce(ee.Reducer.stdDev()).divide(ImgC.mean());
  else return ImgC.qualityMosaic(BndQual);
  }
function FltSpsMed(Img) {
  return Img.focalMedian().copyProperties(Img,Pros_S1);
}
function Filt_Spas(Img,Ops,RadPix){//RadPix:1.5,2.5 ,...
  var n = (RadPix*2); n=n*n;
  if(Ops=='Mean') return Img.focal_mean(RadPix);
  else if(Ops=='Med') return Img.focalMedian(RadPix);
  else if(Ops=='Mod') return Img.focal_mode(RadPix);
   else if(Ops=='Min') return Img.focal_min(RadPix);
   else if(Ops=='Max') return Img.focal_max(RadPix); 
   else if(Ops=='Range') return Img.focal_max(RadPix).subtract(Img.focal_min(RadPix));
   else return (Img.subtract(Img.focal_mean(RadPix))).pow(2).divide(n).sqrt();
  }
//@@@@@@@@@@@@ REDUCER
function Redu_MeanStd(){
  return ee.Reducer.mean().combine(ee.Reducer.stdDev(),'',true);
    }
function Redu_MnMxMeanStd(){
   var Stk1 = ee.Reducer.minMax().combine(Redu_MeanStd(),'',true);
  return Stk1.combine(ee.Reducer.mode(),'',true);
    }
function Redu_MeanStdMod(){ // Gabungan Reducer min,max,mean,stdDev
  var Red_MeanStd = ee.Reducer.mean().combine({reducer2:ee.Reducer.stdDev(), sharedInputs:true});
  var Redu = ee.Reducer.mode().combine({reducer2:Red_MeanStd, sharedInputs:true});
  return Redu;
}
function Redu_All(){
  var Stk1 = ee.Reducer.mode().combine(Redu_MnMxMeanStd,'',true);
  return ee.Reducer.median().combine(Stk1,'',true);
    }
function StkImg(Img,Sc,BcV,BlwUp){ // BlwUp : Bats lower,upper 2.5 Std
  var i,Geom,Stk;
  Geom = Img.geometry(); 
  Stk = Img.reduceRegion(
    {reducer:Redu, geometry:Geom,scale:Sc, crs:'EPSG:4326', bestEffort:true, maxPixels:1e13 }
    );
  var cVs = BcV.map(function(b) {
    var cV = ee.Number(Stk.get(b+'_stdDev')).divide(ee.Number(Stk.get(b+'_mean'))); 
    return cV;
    }); 
  var bb = BlwUp.map(function(b) {
    var ll = ee.Number(Stk.get(b+'_mean')).subtract(ee.Number(Stk.get(b+'_stdDev')).multiply(2.5)); 
    return ll;
    }); 
  var ba = BlwUp.map(function(b) {
    var ul = ee.Number(Stk.get(b+'_mean')).add(ee.Number(Stk.get(b+'_stdDev')).multiply(2.5)); 
    return ul;
    }); 
  var JumcV = ee.List(cVs).length().getInfo();
  for(i=0; i < JumcV; i++ ) { Stk = Stk.set(BcV[i]+'_cV',cVs[i]); }
  return Stk.set('min',bb).set('max',ba);
}
//reduceRegions(collection, reducer, scale, crs, crsTransform, tileScale)
function StkImgRegs(Img,Redu,Sc,Geom){ // BlwUp : Bats lower,upper 2.5 Std
  var i,Geom2,Stk;
  if(Geom=='All'){ Geom2 = Img.geometry() ; Geom2 = ee.Feature(Geom2).set('Label','All_Area'); } 
  else Geom2 = Geom;
  Stk = Img.reduceRegions({collection: Geom2,reducer: Redu,scale:Sc,crs:'EPSG:4326'});
  /*  
     var cVs = BcV.map(function(b) {
    var cV = ee.Number(Stk.get(b+'_stdDev')).divide(ee.Number(Stk.get(b+'_mean'))); 
    return cV;
    }); 
  var bb = BlwUp.map(function(b) {
    var ll = ee.Number(Stk.get(b+'_mean')).subtract(ee.Number(Stk.get(b+'_stdDev')).multiply(2.5)); 
    return ll;
    }); 
  var ba = BlwUp.map(function(b) {
    var ul = ee.Number(Stk.get(b+'_mean')).add(ee.Number(Stk.get(b+'_stdDev')).multiply(2.5)); 
    return ul;
    }); 
  var JumcV = ee.List(cVs).length().getInfo();
  for(i=0; i < JumcV; i++ ) { Stk = Stk.set(BcV[i]+'_cV',cVs[i]); }
  */
  return Stk
  //.set('min',bb).set('max',ba)
  ;
}
function GetMnMx_StkImg(Stk_Img) {//bb,ba : Mean -/+ 2.5*Std
var bb = Stk_Img.get('min') , ba = Stk_Img.get('max');
var Bbt = ee.Number(ee.List(bb).get(0)).format('%.2f').cat(",").cat(ee.Number(ee.List(bb).get(1)).format('%.2f'))
  .cat(",").cat(ee.Number(ee.List(bb).get(2)).format('%.2f')).getInfo();
var Bat = ee.Number(ee.List(ba).get(0)).format('%.2f').cat(",").cat(ee.Number(ee.List(ba).get(1)).format('%.2f'))
  .cat(",").cat(ee.Number(ee.List(ba).get(2)).format('%.2f')).getInfo();
  return { min:Bbt,max:Bat };
}  
//############# ImgCol Info
function GetImgLstImgs(LstImg,Idx){return ee.Image(LstImg.get(Idx))}
function LstImgC(ImgC){
  var LstId,LstDt,LstImgs = GetLstImgs(ImgC);
  LstId = LstImgs.map(function(Lst){
    return ee.Image(Lst).id();});
  LstDt = LstImgs.map(function(Lst){
    return ee.Image(Lst).date().format('YYYY-MM-dd HH:MM:ss');});
  return {Imgs:LstImgs,Ids:LstId,Dts:LstDt,Count:ImgC.size().getInfo() };
}
function GetLstImgs(ImgC){ return ImgC.toList(ImgC.size())}
// (1) Utility
function Jum_El(Obj,Ops) {
  if(Ops > 0) return Obj.size().getInfo();
  else return ee.List(Obj).length().getInfo();
}
function Kords2Geom(Kords){
  if(Jum_El(Kords,0) == 2) return ee.Geometry.Point(Kords);
  else return ee.Geometry.Rectangle(Kords);
}
// (2) Time : membuat periode tgl (dateRange) utk timeseries data
function PrdTgln(Tgla,Pd,n,Unit) { // Sistem Julian,interval (Pd) sama
  // created by Dr Dede Dirgahayu
  var Tgl1,Tgl2,LstTgl=[];
  for(i=0; i < n; i++) {  
    Tgl1 = ee.Date(Tgla).advance(Pd*i,Unit);
    Tgl2 = Tgl1.advance(Pd,Unit);
   LstTgl[i]=[Tgl1.format('YYYY-MM-dd'),Tgl2.format('YYYY-MM-dd')] ;
  } return LstTgl;
}
function PrdTglDif(Tgla,Tgle,Pd,Unit) { // Sistem Julian,interval (Pd) sama
  /* created by Dr Dede Dirgahayu
  Tgla,Tgle : start,end data in sring/text format-> "2021-01-01"
  */
  var Tgl1,Tgl2,n,LstTgl;
  n = ee.Date(Tgle).difference(ee.Date(Tgla),Unit).divide(Pd).floor();
  LstTgl = PrdTgln(Tgla,Pd,n,Unit);
  return LstTgl;
}
function ChgFmt2FD(TglFmt){ // Ubah format tgl (YYYY-MM-dd HH:MM:ss) -> (YYYY-MM-ddTHH:MM:ss)
  var TglRPisah = TglFmt.split("").getInfo();
  var TglR = TglRPisah[0]+'T'+TglRPisah[1];
  return TglR;
}
//######### ImgCol akses
function GetSat(Sat) { // Sat : Img_Id
  return ee.ImageCollection(Sat_ImgId[Sat]);
}
function Pil_Data(Sat,Tgl_R,Bounds){
  var Data,Geom;
  if(Sat == 'L8_9') Data = GetSat('L8').merge(GetSat('L9'));
  else Data = GetSat(Sat);
  if(Tgl_R !=='') Data=Data.filterDate(Tgl_R[0],Tgl_R[1]);
  if(Bounds == 'Cur')Bounds = Kords2Geom(Map.getBounds());
  if(Bounds !=='')Data=Data.filterBounds(Bounds);
  Data = Data.sort('system:time_start');
  var Bnds=Data.first().bandNames().getInfo(),
      Pros=Data.first().propertyNames().sort().getInfo(),
      Res_m = Data.first().select(0).projection().nominalScale().getInfo();
  return { Coll:Data,Counts:Jum_El(Data,1),Imgs:ImgCol_Imgs(Data),
    Dts : ImgCol_Dts(Data),Ids:ImgCol_Ids(Data),Bnds:Bnds,
    Pty:Pros,Sc:Res_m };
}
//@@@@@@@@@@@@@@@@ ImgCol Info
function ImgCol_Imgs(ImgCol){ // List Virtual Imgs
  return ImgCol.toList(ImgCol.size());
}
function ImgCol_Dts(ImgCol){ // List berdasarkan tgl data
  var LstImgs = ImgCol_Imgs(ImgCol.sort(Sys[1]));
  var LstTgl = LstImgs.map(GetDts);
  return LstTgl;
}
function GetDts(ImgC1){
  return ee.Image(ImgC1).date().format(Fmt[2]);
}
function ImgCol_Ids(ImgCol){ // List berdasarkan ImgId
  var LstImgs = ImgCol_Imgs(ImgCol.sort(Sys[0]));
  var LstId = LstImgs.map(GetImgId);
  return LstId;
}
function GetImgId(ImgC1){
  return ee.Image(ImgC1).id();
}
function GetImgFrLst(LstImgs,Idx){ // Get Img dr List Imgs
  return ee.Image(LstImgs_S2.get(Idx));
}
//###CCCCCCCCCCCCCC Cloud Mask
function MskAwn_S2(ImgC){ // Cloud high & shadow aj
  var Msk = ImgC.expression('(v == 3  || v == 8  || v == 9)?0:1',
        {v:ImgC.select('SCL')});
  return ImgC.updateMask(Msk);
}
function MskAwn_L89(image) { // utk Landsat 8/9
  // Bit 0 - Fill
  // Bit 1 - Dilated Cloud
  // Bit 2 - Cirrus
  // Bit 3 - Cloud
  // Bit 4 - Cloud Shadow
  var qaMask = image.select('QA_PIXEL').bitwiseAnd(parseInt('11111', 2)).eq(0);
  var saturationMask = image.select('QA_RADSAT').eq(0);
  // Apply the scaling factors to the appropriate bands.
  var opticalBands = image.select('SR_B.').multiply(0.0000275).add(-0.2);
  var thermalBands = image.select('ST_B.*').multiply(0.00341802).add(149.0);
  // Replace the original bands with the scaled ones and apply the masks.
  return image.addBands(opticalBands, null, true)
      .addBands(thermalBands, null, true)
      .updateMask(qaMask)
      .updateMask(saturationMask);
}
//$$$$$$$$$$$
// Spatial Statistic using Reducer
function StkImg1(Img,Sc,Geom) { // Img singledate/Stack. 1 Region
  //reduceRegion(reducer, geometry, scale, crs, crsTransform, bestEffort, maxPixels, tileScale)
var Geom2; if(Geom == 'All' ||Geom === '') Geom2 = Img.first().geometry(); else Geom2=Geom;
var Stk = Img.reduceRegion(
  {reducer:Redu_MeanStd(),geometry:Geom2,scale:Sc,
  maxPixels:1e13,bestEffort:true
  });
return Stk; // Hasil brp Object dictionary
}
//reduceRegions(collection, reducer, scale, crs, crsTransform, tileScale)
function StkImgRegs(Img,Sc,Geom) { // Img singledate/Stack. 1 Region
var Geom2; if(Geom == 'All' ||Geom === '') Geom2 = ee.Feature(Img.select(0).geometry()).set('Label','All_Scene'); else Geom2=Geom;
print('Feature',Geom2,Img.select(0).geometry());
var Stk = Img.reduceRegions(Img.select(0).geometry(),Redu_MeanStd(),Sc,'EPSG:4326')
 ;
return Stk; // Hasil brp Object dictionary
}
//$$$$$$$$$$$$$$$$$ GRAPHICS
function Graf_ImgRegs(Img,Regs,Sc,BndSel,Pro,WV) {
  var Chrt_Stk_Img = ui.Chart.image.regions(
  {image : Img.select(BndSel) , regions : Regs, 
  reducer : Redu_MeanStd(), scale : Sc, 
  seriesProperty : Pro || "Img_Id" , 
//  xLabels : WV || BndSel    // Wavelength
    }); return Chrt_Stk_Img;
}
function Graf_SetOps(Graf,Type,Bands,Warna,Title,HTitle,VTitle,FntSz) {
  //Type : 'LineChart', 'ColumnChart' 
Graf = Graf.setChartType(Type);
Graf.setOptions({
  title: Title,
  titleTextStyle: { color: 'darkblue', fontName: 'arial',
  fontSize: FntSz + 'px' || '18px', italic: true, bold: true},
  hAxis: {
    title: HTitle, //'Wavelength (micrometers)',
    titleTextStyle: {italic: true, bold: true},
    //gridlines: {color: 'FFFFFF'},
  },
  vAxis: {
    title: VTitle, //'Reflectance',
    titleTextStyle: {italic: true, bold: true},
    //gridlines: {color: 'FFFFFF',count: 7}, // count:0 //hidden
  },
  lineWidth: 2, pointSize: 3,
  colors: Warna, series: Bands,
  curveType: 'function',
  chartArea: {backgroundColor: 'EBEBEB'}
});
return Graf;
}
// ************ GUI
//ui.Panel(widgets, layout, style)
function UI_Pnl(Wgts,Lx,Ly,Bord,Flow) {//Unit Lx,Ly "%" atw "px", flow : horiz / verti
return GUI.UI_Pnl(Wgts,Lx,Ly,Bord,Flow);
}
//ui.Label(value, style, targetUrl, imageUrl)
function UI_Lbl(Val,Warna,Sz,Bold,Pad) {
var UI = ui.Label({value :Val,style :{color:Warna||'black',fontSize:Sz+'px',fontWeight:'bold' || 'normal',padding:Pad + 'px' || ""}}) ;
return UI;
}
//ui.Textbox(placeholder, value, onChange, disabled, style);
function UI_TB(Val,Warna,Sz,Wd,PH) {
var UI =  ui.Textbox({placeholder: PH || "",value : Val,style: {color:Warna||'black', 
    fontSize:Sz+'px',width:Wd + 'px' || ""}});
return UI;
}
//ui.Button(label, onClick, disabled, style, imageUrl)
function UI_Btn(Lbl,Warna,Sz,Pad) {
var UI = ui.Button({label : Lbl,style:{color:Warna||'black',fontSize:Sz+'px',padding:Pad + 'px' || ""}});
return UI;
}
//ui.Select(items, placeholder, value, onChange, disabled, style)
function UI_Pil(Itm,PH,Warna,Wd,Val) {
var UI =  ui.Select({items: Itm,placeholder: PH || "",value : Val || null,style: {color:Warna||'black',width:Wd || ""}});
return UI;
}
// Style set
function UI_Sty(UI,Warna,Wb,Siz,Bold,Align,Bord,Wd) {
  return GUI.UI_Sty(UI,Warna,Wb,Siz,Bold,Align,Bord,Wd);
  }
// Margin & Pad set
function UI_Margin(UI,y1,x1,y2,x2,Pad) { // Margin & Padding
  return GUI.UI_MrgPad(UI,y1,x1,y2,x2,Pad);
 }
function Txts2Val(Txts){
  var i,ArT,Arr=[],JumTxt = ee.List(Txts).length().getInfo();
  ArT = Txts.toString().split(',');
  for(i=0; i < JumTxt; i++ ) {Arr[i]=parseFloat(ArT[i]) }
 return Arr;}
function Kords2Geom(Kords){
  var JumK = ee.List(Kords).length().getInfo();
  if(JumK==2) return ee.Geometry.Point(Kords); else return ee.Geometry.Rectangle(Kords);
}
// EKSTRAK
function InspecOut(inspector,Img,coords,Sc) {
  var Loc = coords.lon.toFixed(6) + ',' + coords.lat.toFixed(6);
  var Bnds = Img.bandNames().getInfo();
  //var Bnds_Stk = GetBndStk(Bnds,['mean','stdDev']);
  var Bnds_Stk = [Bnds+'_mean',Bnds+'_stdDev',Bnds+'_mode'];
  inspector.clear();
  inspector.style().set('shown', true);
  inspector.add(ui.Label('Computing...', {color: 'gray'}));
  // Compute the mean NDVI; a potentially long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var Buf = point.buffer(1.5*Sc);
  //var temporalMean = ndvi.reduce(ee.Reducer.mean());
  var Redu = ee.Reducer.mean().combine(ee.Reducer.stdDev(),'',true);
  Redu = Redu.combine(ee.Reducer.mode(),'',true);
  Redu = Redu.combine(ee.Reducer.minMax(),'',true);
  var sampledPoint = Img.reduceRegion(Redu,Buf, Sc);
  var computedValue = [sampledPoint.get(Bnds_Stk[0]),sampledPoint.get(Bnds_Stk[1]),
        sampledPoint.get(Bnds_Stk[2])];
print('sampledPointBuf',sampledPoint,computedValue);
  // Request the value from the server and use the results in a function.
  computedValue[0].evaluate(function(result) {
  // sampledPoint.evaluate(function(result) {
    inspector.clear();
    var LocInfo = 'Point :, ' + Loc + '\r' +',RadBuf:,' + 1.5*Sc + ',' + '\r';
    var StkOut = 
            'Mean NDVI:, ' + result.toFixed(3) + ',' + '\r'
          + 'Std  NDVI:, ' +computedValue[1].getInfo().toFixed(3) + ',' + '\r'
          + 'Mode NDVI:, ' +computedValue[2].getInfo().toFixed(3) +'\r';
    // Add a label with the results from the server.
    inspector.add(ui.Label({ value: LocInfo,
     // style: {stretch: 'vertical'} 'horizontal'
      style: {stretch: 'vertical',width :'140px',fontSize:'10px',border :'1px dashed'}
    }))
    .add(ui.Label({
      value: StkOut,
     // style: {stretch: 'vertical'} 'horizontal'
      style: {stretch: 'vertical',width :'90px',
      fontSize:'10px',border :'1px dashed'}}));
    // Add a button to hide the Panel.
    inspector.add(ui.Button({
      label: 'close', style:{margin:'-40px 0 0 108px' },
      onClick: function() {
        inspector.style().set('shown', false);
      }
    }));
  }); return 1;
}
function GetBndStk(Bnds,Ops){
  var ParmStk = ['min','max','med','mod','mean','stdDev'],Par2;
  if(Ops=='MnMx') Par2 = ParmStk.slice(0,2);
  else if (Ops=='MeanStd') Par2 = ParmStk.slice(4,6);
  else if (Ops=='ModMeanStd') Par2 = ParmStk.slice(3,6);
   else if (Ops=='MnMxMedMod') Par2 = ParmStk.slice(0,4);
   else Par2 = ParmStk;
   var i,j,k,Lst=[],JumBnd,JumPar;
   JumBnd = ee.List(Bnds).length().getInfo();
   JumPar = ee.List(Par2).length().getInfo();
  for(i=0; i < JumPar; i++) {
     for(j=0; j < JumBnd; j++) {
       k = i*JumBnd + j;
       Lst[k] = Bnds[j] + "_" + Par2[i];}
       }
 return Lst;
}