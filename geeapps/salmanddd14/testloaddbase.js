var EVI_2017_20_LBS_JwBl = ui.import && ui.import("EVI_2017_20_LBS_JwBl", "image", {
      "id": "projects/ee-dededirgahayu11/assets/MODIS/EVI_2017_20_LBS_JwBl"
    }) || ee.Image("projects/ee-dededirgahayu11/assets/MODIS/EVI_2017_20_LBS_JwBl");
// Cek Struktur data Image Stack & Konversi jadi Time Series Data
// by Dr Dede Dirgahayu Domiri
var AstFld = "projects/ee-dededirgahayu11/assets/MODIS/";
var Pref_Data = ["OAI_2017_20_LBS_","EVI_2017_20_LBS_","NDWI_2017_20_LBS_"];
var Bts_JwBl = ee.Geometry.Rectangle(106,-5.5,108.5,-8);
var Nama_Plu =['Sum','JwBl','NTBT','Kal','Sul','Mlk','Pap'],
Nm_Pulau =['Sumatera','Jawa-Bali','Nusa Tenggara','Kalimantan',
'Sulawesi','Maluku','Papua'];
var ui_LoadData = ui.Label('Loading Data Base ...');
 ui_LoadData.style().set({color : 'gray',position : 'top-center'});
Map.add(ui_LoadData);
var NmImg,OAI_Plu=[],EVI_Plu=[],NDWI_Plu=[];
var i, TS_EVI,Stc_EVI,JumBnd_Stck,NmBnd_Stck,JumBnd_TS,NmBnd_TS,Tgl_S,Tgl_E,Pd,
Fmt = 'YYYY-MM-dd',Fmt_Julian = 'YYYY-DDD',Fmt_Jul2 = 'YY_DDD',Scld,Ofs ;
 // Konversi dr Byte ke float data asli index EVI
 Scld = GetSclOfs_Img(EVI_2017_20_LBS_JwBl).scaled;
 Ofs = GetSclOfs_Img(EVI_2017_20_LBS_JwBl).offset;
 // Koleksi setiap Pulau
 for (i=0; i < 7; i++) {
   OAI_Plu[i] = KonByt2Flt(ee.Image(AstFld + Pref_Data[0] + Nama_Plu[i]),[Scld,Ofs]);
   EVI_Plu[i] = KonByt2Flt(ee.Image(AstFld + Pref_Data[1] + Nama_Plu[i]),[Scld,Ofs]);
   NDWI_Plu[i]= KonByt2Flt(ee.Image(AstFld + Pref_Data[2] + Nama_Plu[i]),[Scld,Ofs]);
 }
 // Mosaic Data all Indonesia
OAI_Plu = ee.ImageCollection(OAI_Plu).max(); EVI_Plu = ee.ImageCollection(EVI_Plu).max();
NDWI_Plu = ee.ImageCollection(NDWI_Plu).max();
// print('Mosaik EVI',EVI_Plu);
// Stc_EVI = EVI_Plu;
// print('Stack EVI Indo ',Stc_EVI);
NmBnd_Stck = EVI_Plu.bandNames().getInfo();
JumBnd_Stck = ee.List(NmBnd_Stck).length().getInfo();
//print('Jumlah Band Stck = ' + JumBnd_Stck,'Nama Bands :',NmBnd_Stck);
Tgl_S = EVI_2017_20_LBS_JwBl.get('system:time_start');
Tgl_E = EVI_2017_20_LBS_JwBl.get('system:time_end');
var Tgl1,Tgl2,Tgl_Gre,Tgl_Jul,Img1,Pd,Tgl_St;
Tgl_Gre = ee.Date(Tgl_S).format(Fmt); Tgl_Jul = ee.Date(Tgl_S).format(Fmt);
if (Tgl_S !== null) print('Tgl_Start Data','Date Value from 1970-01-01 :',Tgl_S,
'Gregorian Date : ',Tgl_Gre,'Julian Date : '+ Tgl_Jul.getInfo());
// List Tgl dr Nama Band 
var Lst_Tgl =[];
for(i=0; i < JumBnd_Stck; i++ ) {
  Lst_Tgl[i] = Kanan(NmBnd_Stck[i],10); 
} 
//print('List_Tgl',Lst_Tgl);
// Cek Jumlah Band pd Tgl yg sama
// Konversi Stack -> TSeries (Img Collec)
var TSEVI_JwBl,TSOAI_Indo,TSEVI_Indo,TSNDWI_Indo;
 TSEVI_Indo = ImgStc2Col(EVI_Plu,'EVI',Lst_Tgl);
 TSOAI_Indo = ImgStc2Col(OAI_Plu,'OAI',Lst_Tgl);
 TSNDWI_Indo = ImgStc2Col(NDWI_Plu,'NDWI',Lst_Tgl);
print('TSeries OAI',TSOAI_Indo);
print('TSeries EVI',TSEVI_Indo);
print('TSeries NDWI',TSNDWI_Indo);
var TS_Gab = TSOAI_Indo.combine(TSEVI_Indo).combine(TSNDWI_Indo);
print('Gabung TA',TS_Gab); 
exports.TSIdx_Indo = function() {
  return TS_Gab ;
}
// Parameter visual
var VisRGB_Metric = VisPar([0.18,0.35,-0.07],[0.47,0.85,0.34]);
// Metric ImgCollect
var Tgl_e = ee.Date(Lst_Tgl[JumBnd_Stck-1]).advance(8,'day').format(Fmt),
Tgl_s = ee.Date(Lst_Tgl[0]).format(Fmt) ;
var MetEVI_Indo = Metric(TSEVI_Indo,'EVI',1,Tgl_s,Tgl_e);
print('Metric EVI Indo',MetEVI_Indo);
Map.centerObject(Bts_JwBl,9);
Map.addLayer(TS_Gab.select('EVI','NDWI'),{min:0.15,max:0.75},'Series EVI,NDWI',0);
ui_LoadData.style().set({shown:false});
/*
var TS_AddBndIdx=TSEVI_Indo.map(AddBnd_Sysidx);
print('TS_AddBndIdx',TS_AddBndIdx);
var PosMax = TS_AddBndIdx.qualityMosaic('EVI').select('Sys_Idx').rename('Pos_EVIMax');
MetEVI_Indo=MetEVI_Indo.addBands(PosMax);
print('Metric & PosMax',MetEVI_Indo);
Map.addLayer(MetEVI_Indo,VisRGB_Metric,'Metric EVI Indo');
*/
//********** FFFFFFFFFFFFFFFFF $$$$$$$$$$$$$$
function KonByt2Flt(Img,SclOfs) {
var Scld = SclOfs[0],Ofs = SclOfs[1];
return Img.multiply(Scld).add(Ofs).toFloat();
}
function AddBnd_Sysidx(ImgC) {
  var SysIdx = Lst_Tgl.indexOf(ImgC.get('date'));
  var BndSIdx = ee.Image(SysIdx).rename('Sys_Idx').toByte();
  return ImgC.addBands(BndSIdx);
}
//function ImgStc2Col(Stc_EVI,NmBnds,Tgl_Awl,Pd) {
function ImgStc2Col(Stc_EVI,NmBnds,Lst_Tgl) {  
var i, JumBnd_Stck,NmBnd_Stck,JumBnd_TS,NmBnd_TS,Tgl_S,Tgl_E,Tgl_St
;
NmBnd_Stck = Stc_EVI.bandNames().getInfo();
JumBnd_Stck = ee.List(NmBnd_Stck).length().getInfo();
//print('Jumlah Band Stck = ' + JumBnd_Stck,'Nama Bands :',NmBnd_Stck);
//Tgl_S = Stc_EVI.get('system:time_start');
//Tgl_E = Stc_EVI.get('system:time_end');
Tgl_S = ee.Date(Lst_Tgl[0]);
var Tgl1,Tgl2,Tgl_Gre,Tgl_Jul,Img1,TS =[];
for (i=0; i < JumBnd_Stck; i++) { 
//Tgl1 = ee.Date(Tgl_S).advance(i*Pd,'day');
Tgl1 = Lst_Tgl[i];
//Tgl2 = Tgl1.advance(Pd,'day'); 
//Tgl_St = Tgl1.format(Fmt); 
  Img1 = Stc_EVI.select(NmBnd_Stck[i]).rename(NmBnds);
  Img1 = Img1.set("system:time_start",Tgl1)
  //.set('system:time_end',Tgl2.format(Fmt))
  .set('date',Tgl1).
  set('Jul_date',ee.Date(Tgl1).format(Fmt_Jul2));
  TS[i]=Img1;
}
TS = ee.ImageCollection(TS); return TS;
}
function Jum_Elm(ArrObj,Opsi) {
  if(Opsi > 0) return ArrObj.size().getInfo(); 
  else return ee.List(ArrObj).length().getInfo();
}
function GetSclOfs_Img(Img) {
  var Gain = Img.get('scaled').getInfo(),
  Ofs = Img.get('offset').getInfo();
  return {scaled : Gain,offset:Ofs };
}
function GetTglSE(Img,Opsi) { // Get Tgl Awal & Akhir Img 
var Tgl_S,Tgl_E,JumData,NmBnds,ImgE,SysIdxE;
JumData = Jum_Elm(Img,Opsi);
if(Opsi > 0)NmBnds=Img.first().bandNames().getInfo();
else NmBnds=Img.bandNames().getInfo();
if (Opsi > 0) { 
Tgl_S = Img.first().get('system:time_start');
//print('Cek Tgl S',Tgl_S);
ImgE = GetImgCol_NoIdx(Img,JumData-1);
//print('ImgEnd',ImgE);
Tgl_E = ImgE.first().get('system:time_end');
//print(Tgl_E)
if (Tgl_E === null) Tgl_E = ImgE.get('system:time_start');
}
else {
Tgl_S = Img.get('system:time_start');
Tgl_E = Img.get('system:time_end');}
return { Tgl_S : ee.Date(Tgl_S).format(Fmt),
Tgl_E : ee.Date(Tgl_E).format(Fmt)  };
}
function KonTyDt_Img(Img,SclOfs){
  var Gain = SclOfs[0],Ofs = SclOfs[1];
  return Img.multiply(Gain).add(Ofs).toFloat();
}
function VisPar(Mins,Maxs,Bands,Palet) {
  var Vis = {min:Mins,max:Maxs};
  if(Bands !== 0 || Bands !== '' )Vis = {min:Mins,max:Maxs,bands:Bands };
  if (Palet !==0) Vis = {min:Mins,max:Maxs,palette:Palet };
  if (Palet !==0 && Bands !== 0) Vis = {min:Mins,max:Maxs,bands:Bands,palette:Palet };
  return Vis;
}
function Stck2ImgCol(Img,NmBnds,TglAwl,Pd,Konversi) {
  var ImgC=[],Tgls,Tgle,SysIdx,i,JumBnd,Nmb1 = Img.bandNames().getInfo(); 
   JumBnd= Img.bandNames().size().getInfo(); print('JumBnd = '+JumBnd);
  if (Konversi !==0) Img = Img.subtract(Konversi[0]).divide(Konversi[1]).toFloat();
  for (i=0; i < JumBnd; i++ ) { Tgls = ee.Date(TglAwl).advance(i*Pd,'day');
  Tgle = Tgls.advance(Pd,'day'); SysIdx = NmBnds + "_" + Tgls.format('YYYY-mm-dd');
  ImgC[i]= Img.select(Nmb1[i]) //.set('system:index',SysIdx)
  .set('system:time_start',Tgls.format('YYYY-MM-dd'))
  .set('system:time_end',Tgle.format('YYYY-MM-dd'))
  .rename(NmBnds); }
return ee.ImageCollection(ImgC); 
  }
// Bbrp String spt pd VB 
function Len(Str) {
  return ee.String(Str).length().getInfo();
}
function Mid(Str,s1,s2){// dr 1
  return Str.slice(s1-1,s2);
}
function Kiri(Str,Jum){// dr 1
  return Str.slice(0,Jum);
}
function Kanan(Str,Jum){// dr 1
  return Str.slice(Len(Str)-Jum,Len(Str));
}
function Redu() {
  var Red_Min,Red_Max,Red_Med,Red_MinMax,Red_Mean,Red_Std,Red_MnSt;
  Red_Mean = ee.Reducer.mean(); Red_Std = ee.Reducer.stdDev();
  Red_Min = ee.Reducer.min(); Red_Max = ee.Reducer.max();
  Red_Med = ee.Reducer.median(); Red_MnSt = Red_Mean.combine
  ({reducer2:Red_Std });
  return {Min:Red_Min,Max:Red_Max,Mean:Red_Mean,Std:Red_Std,Med:Red_Med};
}
function Metric(ImgStkCol,NmBnd,Opsi,Tgl_S,Tgl_E) {
  var Img1,Img_Mean,Img_Max,Img_Min,Img_Med,Img_Range,Img_Std
  ;
  Img1 = ImgStkCol.select(NmBnd);
  if(Opsi >0) {Img_Mean = Img1.mean(); Img_Max= Img1.max(); 
  Img_Min = Img1.min(); Img_Med = Img1.median(); Img_Range = Img_Max.subtract(Img_Min);
  Img_Std = Img1.reduce(Redu().Std); }
  else {Img_Mean = Img1.reduce(ee.Reducer.mean()); Img_Max= Img1.reduce(ee.Reducer.max()); 
  Img_Min = Img1.reduce(ee.Reducer.min()); Img_Range = Img_Max.subtract(Img_Min); 
    Img_Std = Img1.reduce(Redu().Std);
  }
  Img_Mean = Img_Mean.rename(NmBnd + '_Mean');
  Img_Max = Img_Max.rename(NmBnd + '_Max');
  Img_Min = Img_Min.rename(NmBnd + '_Min');
  Img_Med = Img_Med.rename(NmBnd + '_Med');
  Img_Range = Img_Range.rename(NmBnd + '_Range');
  Img_Std = Img_Std.rename(NmBnd + '_Std');
//var Tgl_SE = GetTglSE(ImgStkCol,Opsi);
//Tgl_S = Tgl_SE.Tgl_S; Tgl_E = Tgl_SE.Tgl_E; 
return ee.Image.cat(Img_Mean,Img_Max,Img_Min,Img_Range,Img_Std)
.set('system:time_start',Tgl_S).set('system:time_end',Tgl_E);
} 
function GetImgCol_NoIdx(ImgCol,NoIdx) {
  var SysIdx = NoIdx.toString();
  return GetImgCol_SysIdx(ImgCol,SysIdx);
}
function GetImgCol_SysIdx(ImgCol,SysIdx) {
return ImgCol.filter(ee.Filter.eq('system:index',SysIdx));
}