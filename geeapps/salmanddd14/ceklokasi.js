var Indo10_Prv = ui.import && ui.import("Indo10_Prv", "table", {
      "id": "users/salmanddd14/shp/Indo10_Pv"
    }) || ee.FeatureCollection("users/salmanddd14/shp/Indo10_Pv"),
    Indo10_Kab = ui.import && ui.import("Indo10_Kab", "table", {
      "id": "users/salmanddd14/shp/Indo10_Kb"
    }) || ee.FeatureCollection("users/salmanddd14/shp/Indo10_Kb"),
    Indo10_Kec = ui.import && ui.import("Indo10_Kec", "table", {
      "id": "users/salmanddd14/shp/Indo10_Kc"
    }) || ee.FeatureCollection("users/salmanddd14/shp/Indo10_Kc"),
    MOD13Q = ui.import && ui.import("MOD13Q", "imageCollection", {
      "id": "MODIS/006/MOD13Q1"
    }) || ee.ImageCollection("MODIS/006/MOD13Q1"),
    DEM_DAS = ui.import && ui.import("DEM_DAS", "image", {
      "id": "WWF/HydroSHEDS/03VFDEM"
    }) || ee.Image("WWF/HydroSHEDS/03VFDEM"),
    Hujan5 = ui.import && ui.import("Hujan5", "imageCollection", {
      "id": "UCSB-CHG/CHIRPS/PENTAD"
    }) || ee.ImageCollection("UCSB-CHG/CHIRPS/PENTAD"),
    Hujan1 = ui.import && ui.import("Hujan1", "imageCollection", {
      "id": "UCSB-CHG/CHIRPS/DAILY"
    }) || ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY");
// CEK LOKASI INTERAKTIF 
//Created by Dr Dede Dirgahayu
//var Waktu = require('users/salmanddd14/AFungsi:Waktu.js');
var GUI = require('users/salmanddd14/AFungsi:GUI_GEE.js');
// var Citra = require('users/salmanddd14/AFungsi:OlhCitra.js');
var Bts_Subang = ee.Geometry.Rectangle([107.5,-6.17, 107.96,-6.82]),
 Bts_SumSel = ee.Geometry.Rectangle([102.0877, -4.9331, 106.1307, -1.6101]),
 Bts_Jawa = ee.Geometry.Rectangle([105, -5.8, 116, -9]),
 Bts_Indo = ee.Geometry.Rectangle([92,10,142, -11])
 ;
var jan2020 = ["2020-01-01", "2020-01-31T15:00"], chjan2020;
chjan2020 = Hujan1.filterDate(jan2020).select("precipitation").filterBounds(Bts_Indo).sum().rename("Jan2020");
Map.addLayer(chjan2020,{min:5, max:150, palette: ['ff0000','ff00ff','ffff00','aaaa00','00ff00','00aa00', '0000ff','0000aa']},"Hujan Januari");
var Img,VisRGB,EVI_TS,k,Tgla,Tgle,Tga,Tge,Tgl1,Tgl2,TglR=[],Pd,Unit,ImgMed,Trend;
var Img_Lereng = Lereng(ee.Feature(Bts_Indo)); print("Lereng",Img_Lereng);
var Monas = ee.Feature(ee.Geometry.Point(106.8270944, -6.1753572),{Lokasi : "Monas"}),
Zoom=20,Buf_Rad=50,Lok=0,LokGab=[],
Lokasi_1 = ee.Feature(ee.Geometry.Point(107.0551529,-6.5539899),{Lokasi : "Lokasi_1" }),
Lokasi_2 = ee.Feature(ee.Geometry.Point(106.878497,-6.354357),{Lokasi : "Lokasi_2" }),
Lokasi_3 = ee.Feature(ee.Geometry.Point(108.294700,-6.937711),{Lokasi : "Lokasi_3" }),
Lokasi_4 = ee.Feature(ee.Geometry.Point(111.486770,-7.282457),{Lokasi : "Lokasi_4" }),
Lokasi_5 = ee.Feature(ee.Geometry.Point(107.011753,-6.545506),{Lokasi : "Lokasi_5" }),
Lokasi_6 = ee.Feature(ee.Geometry.Point(108.2930509,-6.9383835),{Lokasi : "Lokasi_6" }),
Lokasi_7 = ee.Feature(ee.Geometry.Point(107.06309403,-6.57862097),{Lokasi : "Lokasi_7" })
;
var Koleksi_Point = [
  Monas,Lokasi_1,Lokasi_2,Lokasi_3,Lokasi_4,Lokasi_5,Lokasi_6,Lokasi_7
  ];
var map,mapTypeId = ["ROADMAP", "SATELLITE", "HYBRID","TERRAIN"],Umur_Sawit,Umur_Padi;
var Komposit =['MED','QUAL'],RGB = ['TCC','NCC','FCC','PAL'],BufGab=[],k,BufKe=0;
var Sat,Satelit = ['L8','S2','S1','MOD'],Buf,NamLok='Lokasi_0';
var Bnd_Mod13 = ["sur_refl_b03","sur_refl_b01", "sur_refl_b02", "sur_refl_b07",
'NDVI','EVI'];
var Bnd_Mod13_Ren = ['blue','red','nir','swir2','NDVI','EVI'];
var LoLaZom,LonC,LatC,Peta,BtsAdmin = Feat2ImgAdm();
var VisRGB_S2 = {bands:["B11","B8","B3"],min:[-0.06,-0.05,0.05],max:[0.324,0.372,0.1447] };
// Persamaan koefisien regresi S2 SR Sawit PTPN & Smallholders
// var Koordinat,location,Lx,Ly,Buf,BufPoint,Radius,NamLok;
var Koef_Gabung = [
    [0.8203, 0.0306, -0.0011], // LS8 PTPN
    [-0.0011, 0.0306, 0.5759], // S2 NDVI a , b, c
    [-0.0009, 0.0263, 0.3523], // EVI
    [-0.0009, 0.0255, 0.325], // SAVI
    [0.0019, 0.059, 1.0192], // MSI
    [-17.311, 0.4579, -0.0222], // S1 HV Tanjung Balai
                ]; 
var Tgl_Img = ['2019-07-01','2020-12-31'],Citra=[]; 
Img = Pilih_S2k(Tgl_Img); ImgMed = Img.qualityMosaic('NDVI');
print('Komposit Median ',ImgMed);
// Inisial Awal
Tgla = '2000-10-01'; Tgle = '2020-03-31'; // Start,end date for Time Series (TS)
Pd = 6; Unit = 'Bln';Sat='S2'; // Komposit Data 6 bulanan
map=mapTypeId[2] ; Map.setOptions(map); 
Map.centerObject(Koleksi_Point[1],Zoom);
Citra= [Img,ImgMed,BtsAdmin,Img_Lereng]; TampilCitra(Citra); 
var Lstfeat,PointBuf = Point2RectBuf([107.0551529,-6.5539899],Buf_Rad,2);
var Test = Point2ImgRect([107.0551529,-6.5539899],Buf_Rad,2);
// Buat Input TS EVI dr MOD 13
TglR = TglPrd(Tgla,Tgle,Pd,Unit); // Filter Periode komposit  
  print('Periode ' + Pd + ' ' + Unit +'an',TglR);
// EVI_TS = TSCol('Modis',TglR,'EVI'); print('T Series EVI 6 Bulanan',EVI_TS);
// Trend All
var JumDat, EVI_MOD = ee.ImageCollection("MODIS/006/MOD13Q1")
.filterDate(Tgla,Tgle).filterBounds(Bts_Indo)
.map(Kon2Float).select('EVI')
;
JumDat = EVI_MOD.size().getInfo();
print('TS MOD 13 periode '+ Tgla + ' s/d ' + Tgle + ': ' + JumDat, EVI_MOD);
var Trend_Mod ;
// Analisis Fase, Panen Padi, Produktifitas
var JumDt_Up,EVI_UpDt = ee.ImageCollection("MODIS/006/MOD13Q1")
.filterDate('2020-03-01','2020-07-16').filterBounds(Bts_Indo)
.map(MskAwan_Mod13).select(Bnd_Mod13,Bnd_Mod13_Ren).map(AddIdx_Mod13)
.select('NDBI','EVI','NDWI','NDVI')
;
// Analisis trend setiap 48 hari (3 data)
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
 var Judul = ui.Label('TREND ANALYSIS USING SENTINEL-2 & MODIS (Created by Dr Dede Dirgahayu, Pusfatja, LAPAN');
 var panel = ui.Panel({style: {width: '275px' }})
 .add(Judul)
  // .add(ui.Select())
  ;
var TB_Radius = ui.Textbox({
  value: Buf_Rad,
  placeholder: 'Radius Buffer (m)',
  onChange: function(value) {
    // set value with a dedicated method
   TB_Radius.setValue(value);
    return(value);
  }
});
var LonLatZoom = ui.Textbox({
 // value: '106.8270944,-6.1753572,17',
 value: '-6.5539899/107.0551529,17',
  placeholder: 'Enter Lon,Lat,Zoom here...',
  onChange: function(value) {
    // set value with a dedicated method
    LonLatZoom.setValue(value);
    return(value);
  }
});
var BaseMap = ui.Textbox({
  value: ["HYBRID",'S2',"MED","NCC"],
  placeholder: 'Enter MapType or Id...',
  onChange: function(value) {
    // set value with a dedicated method
    BaseMap.setValue(value);
    return(value);
  }
});
var Lbl_Lokasi = ui.Label('-6.1753572/106.8270944');
var Lbl_Citra = ui.Label('Komposit S2 B653 Th ')
.style().set('position', PosUI('UC'));
//Map.add(Lbl_Citra);
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
//  panel.widgets().set(5, chart);
// Set a callback function for when the user clicks the map.
// Add the panel to the ui.root.
ui.root.add(panel);
// Susun GUI di Panel
var Btn_Sim = ui.Button({
  label: 'Save Location',
  onClick: function() {
BufGab = ee.FeatureCollection(BufGab);
SaveTab2Drv(ImgMed,BufGab,10,NamLok) ;  
  BufKe=0; BufGab = []; Lok=0; LokGab=[];
 print('Point terpilih',LokGab);   
  }});
function PlotLokasi(Buf,point){
  Map.layers().set(4, ui.Map.Layer(Feat2Img(Buf,3,1), {palette: 'yellow'},'AOI 100 x 100 m'));
  Map.layers().set(5, ui.Map.Layer(point, {color: 'FF0000'},'Point Lokasi'));
}
var button = ui.Button({
  label: 'Zoom to Location',
  onClick: function() {
    // you don't have to convert it into EE objects since you are
    // working on the client side
    Buf_Rad = Str2Num(TB_Radius.getValue(),'Flt');
    LoLaZom = StrArr2Num(LonLatZoom.getValue(),'/');
    LonC = LoLaZom[1];LatC = LoLaZom[0];Zoom = LoLaZom[2];
   Peta = BaseMap.getValue();
    Map.setCenter(LonC, LatC, 18); 
var Lx,Ly,Lok_Rect,Lok_Point = ee.Geometry.Point(LonC, LatC),x1,y1,x2,y2;
Lx = 3*m2Deg(30) ; Ly = Lx ; x1 = LonC-Lx ; x2 = LonC+Lx ; y1 = LatC+Ly ; y2 = LatC-Ly ;
Lok_Rect = ee.Geometry.Rectangle(x1,y1,x2,y2) // Area 150 x 150 m
;
Buf = Lok_Point.buffer(Buf_Rad); PlotLokasi(Buf,Lok_Point);
if (Peta[1] == 'L8' || Sat == 'L8') Img = Pilih_L8(Tgl_Img);
Trend = LineFit(Img,'EVI').select('Trend','EVI_Trend'); 
ImgMed=Img.median().addBands(Trend);
print('Hasil Analisis Trend EVI Data Sentienl-2 Th 2019-2020',ImgMed);
// Aplikasi Model Umur Padi, Sawit berdasrkan Sentinel-2
VisRGB = {bands:["B11","B8","B3"],min:[0.0895,0.127,0.05],max:[0.2535,0.4215,0.1765] };
//Stk 2Std (2-12) Komp Median ;min :0.055,0.05,0.0131, 0.0073,-0.0308,-0.0462, -0.05,-0.061,-0.0493 ;  
//max : 0.1227,0.1447,0.1556, 0.2067,0.3248,0.3759,  0.372, 8A 0.4058, SWIR 0.324,0.2386
// Komposit Quality : 0.0895 0.2535  0.127 0.4215 0 0.1765
  Map.setOptions(Peta[0]); 
  //Map.style(mapTypeId[1]);
//Map.layers().set(0, ui.Map.Layer(Img.select('NDBI','EVI','NDWI'),{},'T Series NDBI,EVI,NDWI',0));  
//Map.layers().set(1, ui.Map.Layer(ImgMed,VisRGB,'Komposit '+ Peta[1],1,0.5));  
//Map.layers().set(2, ui.Map.Layer(BtsAdmin,{palette : ['black','aa00aa','ff0000']},'Batas Admin'));  
//Map.layers().set(3, ui.Map.Layer(EVI_MOD,{},'T Series EVI MODIS',0)); 
  }
});
//print(button); 
var i,TB_NamLok, Menu = [BaseMap,LonLatZoom,button,Btn_Sim,TB_Radius];
for(i=0; i < 5; i++) {
panel.widgets().set(i+1, Menu[i]);
}
// KLIK on Map utk Tampilkan Grafik EVI Time Series dr Mean Buufer
// Configure the map.
Map.style().set('cursor', 'crosshair');
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
   var Koordinat,location,Lx,Ly,Buf,BufPoint,Radius;
 // Koordinat = (coords.lon.toFixed(6) + ',' +coords.lat.toFixed(6));
  Koordinat = (coords.lat.toFixed(6) + '/' +coords.lon.toFixed(6));
  location = 'Lok-' + (Lok+1) + ':' + (coords.lon.toFixed(6) + ',' +coords.lat.toFixed(6)).toString();
  NamLok = location;  Zoom = Map.getZoom();
LonLatZoom.setValue(Koordinat + "," + Zoom);
  // Add a red dot to the map where the user clicked.
  var x1,y1,x2,y2,Res, point = ee.Geometry.Point(coords.lon, coords.lat);
  Res = 0.00134747, Lx,Ly,Buf; Lx = 3*m2Deg(30); Ly=Lx; Buf = point.buffer(Buf_Rad);
  x1 = coords.lon - Lx; x2 = coords.lon + Lx;
  y1 = coords.lat + Ly; y2 = coords.lat - Ly;
  var Rect = ee.Geometry.Rectangle([x1,y1,x2,y2]);
 BufPoint=ee.FeatureCollection([Buf,point]);
 PlotLokasi(Buf,point); Map.centerObject(Buf,Zoom);
//  Map.layers().set(3, ui.Map.Layer(Feat2Img(Buf,2,0), {palette: 'yellow'},'AOI 150 x 150 m'));
//  Map.layers().set(4, ui.Map.Layer(point, {color: 'FF0000'},'Lokasi'));
var Mean_Lereng = StkImgReg(Img_Lereng,Buf,10,'MeanStd');
print("Mean,Std Lereng :",Mean_Lereng);
//var Lok_InfoMean = Mean_Lereng.get('mean'); print(Lok_InfoMean);
panel.widgets().set(6, ui.Label(location));  
  // Create a chart of EVI over time.
  var chart = ui.Chart.image.series(EVI_MOD, Buf, ee.Reducer.mean(), 250)
      .setOptions({
        title: (Lok+1) + ' : ' + location,
        vAxis: {title: 'NDBI/EVI/NDWI'},
        lineWidth: 1,
        pointSize: 3,
      });
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel.widgets().set(7, chart);
 Lok += 1 ; LokGab[Lok]=location; BufGab[BufKe]=Buf; BufKe += 1;
});
// Awal Display  Citra= [Img,ImgMed,BtsAdmin,Img_Lereng]
function TampilCitra(Citra) {
Map.layers().set(0, ui.Map.Layer(Citra[0].select('NDBI','EVI','NDWI'),{},'T Series NDBI,EVI,NDWI',0));  
Map.layers().set(1, ui.Map.Layer(Citra[3],{},'Lereng',0));  
Map.layers().set(2, ui.Map.Layer(Citra[1],VisRGB_S2,'Komposit S2 '+ Tgl_Img[0] + '-' + Tgl_Img[1] ,1,0.5));  
Map.layers().set(3, ui.Map.Layer(Citra[2],{palette : ['black','aa00aa','ff0000']},'Batas Admin'));
}
function Pilih_S2k(Tgl_Range){
var Img = ee.ImageCollection("COPERNICUS/S2_SR")
.filterDate(Tgl_Range[0],Tgl_Range[1])
.filterBounds(Bts_Indo)
.map(MskAwan_S2k).map(addBands_S2).map(AddTime)
;
return Img ;}
function Str2Num(Str,TyDt) {
  var Num = parseFloat(Str);
  if(TyDt == 'I16') Num = parseInt(Str,10);
    else Num = parseFloat(Str);
  return Num ;
}
function StrArr2Num(Str,Pemisah) {
  var StrPlt = Str.split(Pemisah),JumStr,k,NumArr=[];
  JumStr = ee.List(StrPlt).length().getInfo();
  for (k=0;k < JumStr;k++) {NumArr[k]= Str2Num(StrPlt[k],'flt');}
  return NumArr ;
}
// CITRA
function Kon2Float(im) {
  return im.divide(10000).toFloat()
  .copyProperties(im, ["system:time_start","system:time_end"])
  ;  
}
function MskAwan_S2k(Img) {
// Cloud Mask S2 Surface Ref dr band SCL. 4,5,6 : Bare,Veg,Water
var SCL = Img.select('SCL');  
var Msk = Img.expression( "(Tc < 4 || Tc > 7 ) ? 0:1 ",{Tc : SCL}); 
SCL = SCL.updateMask(Msk);
return Img.updateMask(Msk).select('B.*','SCL').divide(10000)
 .copyProperties(Img, ["system:time_start"])
 ;
}
function MskAwan_Mod13(im) {
  // Mask Awan & nilai Indek EVI dll yg tdk valid
  var Awan,QA = im.select('SummaryQA');
  Awan = QA.expression('(qa > 1) ?0:1',{qa:QA});
  var Msk = im.select('EVI').expression('(im <= -10000 || im >=10000)?0:1',{im:im});
  //im = im.updateMask(Msk);
  return im.updateMask(Awan).select(Bnd_Mod13,Bnd_Mod13_Ren)
  .divide(10000).toFloat()
  .copyProperties(im, ["system:time_start","system:time_end"])
  ;  
}
function TS_EVIMOD13(TglR,Komp,PilBnd) { // MOD13Q
// Komposit Temporal EVI MOD13; TgL filter waktu dg format Date
var Img = ee.ImageCollection("MODIS/006/MOD13Q1")
  .filterDate(TglR[0],TglR[1]).map(MskAwan_Mod13)
 .map(AddTime)
  ;
  var Xr,Ytr,Sc,Ofs,Trend = LineFit(Img,'EVI');
//  print('Analisis',Trend);
Sc = Trend.select('Trend'); Ofs = Trend.select('Ofs');
Xr = Img.median().select("Time");
Ytr = Sc.multiply(Xr).add(Ofs).toFloat().rename('EVI_Trend');
if(Komp !== '')Img=KompImgCol(Img,Komp,'EVI'); 
Img = Img.set("system:time_start",ee.Date(TglR[0]))
.set("system:time_end",ee.Date(TglR[1]));
return Img.addBands(Ytr)
;
}
function KompImgCol(Img,Komp,PilBnd) {
if(Komp == 'Med') return Img.select(PilBnd).median().rename(PilBnd+"_Med");
else if(Komp == 'Max') return Img.select(PilBnd).max().rename(PilBnd+"_Max");
else if(Komp == 'Mean') return Img.select(PilBnd).mean().rename(PilBnd+"_Mean");
else if(Komp == 'Min') return Img.select(PilBnd).min().rename(PilBnd+"_Min");
else return Img.qualityMosaic('EVI').select(PilBnd).rename(PilBnd+"_Max");
}
function TSCol(Sat,TglR,PilBnd) {
var i,k,TS=[],Tgl1R,JumTh,JumPrd, Tgl2R ;
JumPrd = ee.List(TglR).length().getInfo();
for (k=0; k < JumPrd; k++) {
 if(Sat=='MOD' || Sat=='Modis')
 TS[k] = (TS_EVIMOD13(TglR[k],'Mean',PilBnd)
.addBands(TS_EVIMOD13(TglR[k],'Qual',PilBnd))
.addBands(TS_EVIMOD13(TglR[k],'Min',PilBnd)))
.select(PilBnd+'_Mean',PilBnd+'_Max',PilBnd+'_Min',"EVI_Trend")
; 
}
  TS = ee.ImageCollection(TS)
  .map(function(im) { return im.reproject(ee.Projection('EPSG:4326'),null,150)})
//  .map(AddTime) // time_start not number ?
  ;
// var Trend = LineFit(TS,'EVI_Trend'); print('Trend',Trend);
  return TS;
}
function TglPrd(Th1,Th2,Pd,Unit) {
var k,Tgl1,Tgl2,JumPd,Tgla,TglR=[],Thn1,Thn2 ;
Thn1 = Str2Num(Th1.slice(0,4),'I16');Thn2 = Str2Num(Th2.slice(0,4),'flt');
//print(Thn1,Thn2);
JumPd = (Thn2-Thn1)*(12/Pd)-1;
// print('JumPd ='+JumPd);
if(Unit=='Bln')Unit = 'month'; else if(Unit=='Hri')Unit = 'day';
 else Unit = 'year';   
// Tgla = ee.Date('2000-10-01');
Tgla = ee.Date(Th1);
for (k=0; k < JumPd; k++) {
  Tgl1 = Tgla.advance(k*Pd,Unit); 
  Tgl2 = Tgl1.advance(Pd,Unit).advance(-7,'hour');
  //TglR[k] =[Tgl1.format('YYYY-MM-dd'),Tgl2.format('YYYY-MM-dd')];
  TglR[k] =[Tgl1,Tgl2];
  } 
return TglR; }
function AddTime(ImgCol) {
  var Time = (ImgCol.metadata('system:time_start')
    .divide(1000 * 60 * 60 * 24 * 365)).rename('Time'); 
  return ImgCol.addBands(Time);
}    
function LineFit(ImgCol,BndY) {
  // Ektrak koef Regresi Linier Y = b0 + b1*X
  // BndY , misal EVI; X : time dr fungsi AddTime
var Ren = [["scale","offset"],["Trend","Ofs"]];
var Xr,Sc,Ofs,YTrend, Trend = ImgCol.select(['Time', BndY])
  // Compute the linear trend over time.
  .reduce(ee.Reducer.linearFit()).toFloat()
  .select(Ren[0],Ren[1])
  ;
Xr = ImgCol.select('Time').median();
Sc = Trend.select('Trend') ; Ofs = Trend.select('Ofs');
YTrend = Ofs.add(Sc.multiply(Xr)).toFloat().rename(BndY+ '_Trend');
return Trend.addBands(YTrend);}
function addBands_S2_Sc1(image){
  var ndvi = image.normalizedDifference(['B8','B4']).rename('NDVI');
  var ndwi = image.normalizedDifference(['B3', 'B12']).rename('NDWI');
  var ndbi = image.normalizedDifference(['B11','B8']).rename('NDBI');
  var ILT =  image.select('B11').divide(image.select('B8')).rename('ILT'); // Indeks Lahan Terbuka
  var evi = image.expression("(RED < NIR || BLUE < RED) ? 2.5*((NIR-RED)/(L+NIR+6*RED-7.5*BLUE))" + 
  ":1.5*((NIR-RED)/(L/2+NIR+RED))"
  ,{NIR: image.select('B8'),RED: image.select('B4'),BLUE: image.select('B2'),L : 10000}).rename('EVI');
  var savi = image.expression(
      '(1.5 * (NIR - RED)) / (NIR + RED + 0.5)', {
        'NIR': image.select('B8'),
        'RED': image.select('B4')}).rename('SAVI');
  var msi = image.expression('SWIR / NIR', {
        'SWIR': image.select('B11'),
        'NIR': image.select('B8')}).rename('MSI');
 var Msk = ndvi.expression("(evi <= -1.0 || evi >= 1.0 || ndvi <= -1.0 || ndvi >= 1.0) ? 0:1",{evi : evi,ndvi : ndvi});
  evi = evi.updateMask(Msk); ndvi = ndvi.updateMask(Msk);ndwi = ndwi.updateMask(Msk);
  ndbi = ndbi.updateMask(Msk); msi= msi.updateMask(Msk);savi= savi.updateMask(Msk);
  return image.addBands(ndbi).addBands(evi).addBands(ndwi).addBands(ndvi)
  .addBands(msi).addBands(savi).toFloat(); 
}
function KompImCol(ImCol,Komp) { // Komposit Temporal ImgCol
  var ImKomp;
  if (Komp == 'Qual')ImKomp=ImCol.qualityMosaic('NDVI');
  else if (Komp == 'Mean') ImKomp=ImCol.mean();
  else if (Komp == 'Med') ImKomp=ImCol.median();
  else if (Komp == 'Max') ImKomp=ImCol.max();
  else if (Komp == 'Min') ImKomp=ImCol.min();
  //else if (Komp == 'Mos') ImKomp=ImCol.mosaic();
  else ImKomp=ImCol.qualityMosaic('NDVI');  
  return ImKomp ;
}
function AddTrend(ImCol,BndY,Komp) { // Komp = '' -> ImCol blm dikomposit
  var YTrend,Sc,Ofs,ImKomp,Trend,X,Xr;  
  ImCol = ImCol.map(AddTime); 
  X=ImCol.select('system:time_start').median().rename('Time');
  Trend=LineFit(ImCol,BndY);
//  print('Trend',Trend) ;
  Sc=Trend.select('Scale'),Ofs=Trend.select('Offset');
  ImKomp =KompImCol(ImCol,Komp); 
//  ImKomp = ImKomp.addBands(Trend);
//  print('Hasil Komposit ' + Komp,ImKomp);
  YTrend = Sc.multiply(X).add(Ofs).rename(BndY +'_Trend').toFloat();
//  print('Hasil Trend ' + BndY,YTrend);
  return ImKomp.addBands(YTrend).addBands(Sc);
}
// Add Band Index ...
function addBands_S2(image){
  var ndvi = image.normalizedDifference(['B8','B4']).rename('NDVI');
  var ndwi = image.normalizedDifference(['B3', 'B12']).rename('NDWI');
  var ndbi = image.normalizedDifference(['B11','B8']).rename('NDBI');
  var ILT =  image.select('B11').divide(image.select('B8')).rename('ILT'); // Indeks Lahan Terbuka
  var evi = image.expression("(RED < NIR || BLUE < RED) ? 2.5*((NIR-RED)/(L+NIR+6*RED-7.5*BLUE))" + 
  ":1.5*((NIR-RED)/(L/2+NIR+RED))"
  ,{NIR: image.select('B8'),RED: image.select('B4'),BLUE: image.select('B2'),L : 1}).rename('EVI');
  var savi = image.expression(
      '(1.5 * (NIR - RED)) / (NIR + RED + 0.5)', {
        'NIR': image.select('B8'),
        'RED': image.select('B4')}).rename('SAVI');
  var msi = image.expression('SWIR / NIR', {
        'SWIR': image.select('B11'),
        'NIR': image.select('B8')}).rename('MSI');
  var Msk = ndvi.expression("(evi <= -1.0 || evi >= 1.0 || ndvi <= -1.0 || ndvi >= 1.0) ? 0:1",{evi : evi,ndvi : ndvi});
  evi = evi.updateMask(Msk); ndvi = ndvi.updateMask(Msk);ndwi = ndwi.updateMask(Msk);
  ndbi = ndbi.updateMask(Msk); ILT = ILT.updateMask(Msk);msi= msi.updateMask(Msk);savi= savi.updateMask(Msk);
  return image.addBands(ndbi).addBands(evi).addBands(ndwi).addBands(ndvi)
  .addBands(msi).addBands(savi).toFloat(); 
}
// Koefisien Regresi Kuadrati
// FUNGSI2
function YReg(Koef,x) {
  var y = Koef[0] + Koef[1]*x + Koef[2]*Math.pow(x,2);
  return y;
}
function ParReg(Koef,y) { //Diskriman =d
  var a,b,xm,ym,c,d, Par = [],da,x1,x2; // ax^2 + bx + c =0
  a = Koef[2] ;  b = Koef[1] ;
  xm = -b/(2*a); ym = YReg(Koef,xm);
  c = Koef[0]-y;
  d=Math.sqrt(Math.pow(b,2) - 4*a*c);
  da = d / (2*a);
  x1 = xm + da ; x2 = xm - da;
  Par = [xm,ym,d,x1,x2];
  return Par;
} 
function XmaxReg(Koef) { // Ektrak X_Max, Y_Max
  var xm,ym, Par = [];
  xm = -Koef[1]/(2*Koef[2]); ym = YReg(Koef,xm);
  Par = [xm,ym];
  return Par;
}
function XReg(Koef,y) { // Akar persamaan Kuadrat x1,x2
 // var y = Koef[0] + Koef[1]*x + Koef[2]*Math.pow(x,2);
  var a,b,c1,c,x1,x2,x = [],d,xm;
  a= Koef[2]; b= Koef[1]; c = Koef[1]-y;
  xm = -b/(2*a); d = Math.sqrt(Math.pow(b,2) - 4*a*c)/(2*a);
  x1 = xm + d ; x2 = xm - d; x = [x1,x2];
  return x;
}
function Reklas(Img,Itv) {// Reklas umur dg interval Itv (3-5 th)
  var Kls = Img.divide(Itv).ceil().rename('Umur_Kls').toByte();
  return Kls;
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
function AddIdx_Mod13(img){
  var CenterWave = [645,858.5,469,555,1240,1640,2130]; //red,nir,blue,green,mir,swir1,swir2
  // MOD13 : ndvi,evi,b1:red,b2:nir,b3:blue,b7:swir2
  // Sblmnya band direname dulu 
  var bl = img.select('blue'),rd = img.select('red'),nr = img.select('nir'),sw2 = img.select('swir2');
  // Sintetis Reflktan green,swir1,mir
  var dlt_rd_bl = CenterWave[0]- CenterWave[2],dlt_sw2_nr = CenterWave[6]- CenterWave[1],
      dlt_gr_bl = CenterWave[3]- CenterWave[2],dlt_sw1_nr = CenterWave[5]- CenterWave[1],
      dlt_mir_nr = CenterWave[4]- CenterWave[1];
  var Slp_gr =(rd.subtract(bl)).divide(dlt_rd_bl),Slp_sw1 =(sw2.subtract(nr)).divide(dlt_sw2_nr); 
  var gr = bl.add(Slp_gr.multiply(dlt_gr_bl)).rename('green');
  var sw1 = nr.add(Slp_sw1.multiply(dlt_sw2_nr)).rename('swir1');
  var Slp_mir =(sw1.subtract(nr)).divide(dlt_sw1_nr); 
  var mir = nr.add(Slp_mir.multiply(dlt_mir_nr)).rename('mir');
 var ndwi2 = img.normalizedDifference(['blue', 'swir2']).rename('NDWI');
  var ndbi2 = img.normalizedDifference(['swir2','nir']).rename('NDBI');
  var ndwi = (gr.subtract(sw2)).divide(gr.add(sw2)).rename('NDWI');
  var ndbi = (sw1.subtract(nr)).divide(sw1.add(nr)).rename('NDBI');
  return img.addBands(ndwi).addBands(ndbi).addBands(gr).addBands(mir).addBands(sw1).toFloat(); 
}
function Point2RectBuf(PointArr,Radius,RectBuf) {
  //Radius/jari2 dlm meter
  var Point,PointBuf,Rect,x1,y1,x2,y2, Lx,Ly,Buf;
Lx = (m2Deg(3*Radius)); Ly = Lx; 
Point = (ee.Geometry.Point([PointArr[0],PointArr[1]]));
Buf = ee.FeatureCollection(Point.buffer(Radius)).set({'Area' : 1});
Point = ee.FeatureCollection(ee.Geometry.Point([PointArr[0],PointArr[1]])).set({'Lokasi':1});
x1 = PointArr[0]-Lx ; x2 =PointArr[0]+Lx ; y1 = PointArr[1]+Ly ; y2 = PointArr[1]-Ly ;
if(RectBuf == 1)Rect = ee.FeatureCollection(ee.Geometry.Rectangle(x1,y1,x2,y2)).set({'Area' : 1}); 
else Rect = Buf;
 PointBuf = ee.FeatureCollection([Rect,Point]); return PointBuf ;
}
function Feat2Img(Feat,Tebal,Val) { // Fill = 0 ; OutLine aj
  return ee.Image().toByte().paint(Feat, 0, Tebal).eq(Val);
}
function Point2ImgRect(PointArr,Rad,RectBuf) {
  var PointBuf = Point2RectBuf(PointArr,Rad,RectBuf),
  Lstfeat = PointBuf.toList(PointBuf.size().getInfo());
var Buf = Lstfeat.get(0),Point= Lstfeat.get(1);
var Gabung = Feat2Img(Buf,2,1).rename('AOI').toByte();
return Gabung;
}
function Feat2ImgAdm(l) { // Fill = 0 ; OutLine aj
  var Gabung = ee.ImageCollection([Feat2Img(Indo10_Prv,3,1),Feat2Img(Indo10_Kab,2,2),Feat2Img(Indo10_Kec,1,3),])
  .sum().rename('Batas Admin').toByte();
  return Gabung;
}
function TampiFeatUI(NoLyr,Feat,Tebal,Val,Warna,KetLyr) {
 return Map.layers().set(NoLyr, ui.Map.Layer(Feat2Img(Feat,Tebal,Val), {palette: Warna },KetLyr));
}
function SaveTab2Drv(Img,Reg,Sc,NamLok) {
var RedMean,RedStd,RedMeanStd,RedGab,RMnMx;
RMnMx = ee.Reducer.minMax();RedMean = ee.Reducer.mean(); 
RedStd = ee.Reducer.stdDev();
RedMeanStd = RedMean.combine({
  reducer2: RedStd,
  sharedInputs: true
});
RedGab = RMnMx.combine({
  reducer2: RedMeanStd,
  sharedInputs: true
});
var MeanStd = Img.reduceRegion({
  reducer: RedGab,
  geometry: Reg,
  scale: Sc
});
// Make a feature without geometry and set the properties to the dictionary of means.
var feature = ee.Feature(null, MeanStd);
// Wrap the Feature in a FeatureCollection for export.
var featureCollection = ee.FeatureCollection([feature]);
// Export the FeatureCollection.
Export.table.toDrive({
  collection: featureCollection,
  description: 'Stk_' + NamLok,
  fileFormat: 'CSV'
});
}
GUI_Style(Judul,15,'00aa00','' ,'center','',500,'',20);
GUI_Style(Btn_Sim,12,'dd0000','' ,'','-36px 10px 10px 120px',300,'',20);
GUI_Style(TB_Radius,12,'dd0000','' ,'','-36px 10px 10px 120px',300,50,20);
// Style GUI
function GUI_Style(UI,Siz,WarFg,WarBg,Align,Margin,Tebal,Lbr,Pad
  ) {
  UI.style().set({
  fontSize: Siz + 'px',
  color: '#' + WarFg,
  textAlign:Align, // "center"
  fontWeight: Tebal, // 700,'bold"
   margin: Margin, //'30px 10px 10px 10px',
//  minHeight: MinMax [0]+'px', //'60px',
  maxWidth: Lbr +'px',// '200px',
 // backgroundColor: '#' + WarBg,
//  padding: Pad + 'px', //'10px'
 // border: '2px dashed #00aa33',
});
}
function PosUI(Pos) {
  var ArrPos = ['top-left','top-center','top-right',
'middle-left','middle-right',
'bottom-left','bottom-center','bottom-right'
];
var i,Posisi,ArrKy = ['UL','UC','UR','ML','MR','LL','LC','LR'];
for (i=0;i < 8; i++) {if (Pos == ArrKy[i])Posisi=ArrPos[i]; }  
return Posisi;
}
function Pkt(x,p) {
  return Math.pow(x,p);
}
function Akr(x) {
  return Math.sqrt(x);
}
function Deg2m(Deg) {
  return (Deg/0.000008983153);
}
function m2Deg(m) {
  return (m*0.000008983153);
}
// Deteksi Lereng
function Lereng(AOI) {
var hydrosheds = DEM_DAS;
var Terrain = ee.Algorithms.Terrain(hydrosheds), Slope = Terrain.select('slope').clip(AOI);
return Slope;
}
function StkImgReg(Img,Reg,Sc,Opsi) { // Hitung Statistik Img dg Batas Region Geometry
var minmaxReducer = ee.Reducer.minMax(),medReducer = ee.Reducer.median(),
sigmaReducer = ee.Reducer.stdDev(), meanReducer = ee.Reducer.mean(),
countReducer = ee.Reducer.count(),sumReducer = ee.Reducer.sum()
;
var MinMaxMed = minmaxReducer.combine({reducer2:medReducer,sharedInputs: true});
var MeanStd = meanReducer.combine({reducer2:sigmaReducer,sharedInputs: true});
var StkImgGab = MinMaxMed.combine({reducer2:MeanStd,sharedInputs: true});
var SumCountRed = sumReducer.combine({reducer2:countReducer,sharedInputs: true} );
var Redu; if(Opsi=='All')Redu = StkImgGab;
if(Opsi=='MeanStd')Redu = MeanStd; if(Opsi=='Mean')Redu = meanReducer;
var StkImg = (Img).reduceRegions({
  collection: Reg,reducer:Redu,scale:Sc 
}).getInfo(); return StkImg;
}