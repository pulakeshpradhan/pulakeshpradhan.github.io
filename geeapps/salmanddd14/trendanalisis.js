// CEK LOKASI INTERAKTIF 
//Created by Dr Dede Dirgahayu
var Waktu = require('users/salmanddd14/AFungsi:Waktu.js');
var GUI = require('users/salmanddd14/AFungsi_1:GUI_GEE.js');
var Citra = require('users/salmanddd14/AFungsi:OlhCitra.js');
var Img,VisRGB,EVI_TS,k,Tgla,Tgle,Tga,Tge,Tgl1,Tgl2,TglR=[],Pd,Unit;
var Monas = ee.Geometry.Point(106.8270944, -6.1753572),Zoom=17;
var map,mapTypeId = ["ROADMAP", "SATELLITE", "HYBRID","TERRAIN"];
var Komposit =['MED','QUAL'],RGB = ['TCC','NCC','FCC','PAL'];
var Sat,Satelit = ['L8','S2','S1','MOD'];
var Bnd_Mod13 = ["sur_refl_b03","sur_refl_b01", "sur_refl_b02", "sur_refl_b07",
'NDVI','EVI'];
var Bnd_Mod13_Ren = ['blue','red','nir','swir2','NDVI','EVI'];
var LoLaZom,LonC,LatC,Peta;
// Inisial Awal
Tgla = '2000-10-01'; Tgle = '2020-03-31'; // Start,end date for Time Series (TS)
Pd = 6; Unit = 'Bln'; // Komposit Data 6 bulanan
map=mapTypeId[2] ; Map.setOptions(map); 
Map.centerObject(Monas,Zoom);
TglR = TglPrd(Tgla,Tgle,Pd,Unit); // Filter Periode komposit  
  print('Periode ' + Pd + ' ' + Unit +'an',TglR);
EVI_TS = TSCol('Modis',TglR,'EVI');
print(EVI_TS);
// Configure the map.
Map.style().set('cursor', 'crosshair');
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
 var panel = ui.Panel({style: {position: 'bottom-left',
width: '250px' }})
.add(ui.Label('TREND ANALYSIS USING SENTINEL-2 & MODIS'))
  // .add(ui.Select())
;
// Set a callback function for when the user clicks the map.
var k=0,Lokasi=0; 
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var Koordinat,location,Lx,Ly,Buf;
  Koordinat = (coords.lon.toFixed(6) + ',' +coords.lat.toFixed(6));
  location = 'Lok-' + (Lokasi+1) + ':' + (coords.lon.toFixed(6) + ',' +coords.lat.toFixed(6)).toString();
  panel.widgets().set(4, ui.Label(location));
//Zoom = Map.getZoom();
LonLatZoom.setValue(Koordinat + "," + Zoom);
  // Add a red dot to the map where the user clicked.
  var x1,y1,x2,y2,Res, point = ee.Geometry.Point(coords.lon, coords.lat);
  Res = 0.00134747, Lx,Ly,Buf; Lx = 3*0.00025; Ly=Lx; Buf = point.buffer(75);
  x1 = coords.lon - Lx; x2 = coords.lon + Lx;
  y1 = coords.lat + Ly; y2 = coords.lat - Ly;
  var Rect = ee.Geometry.Rectangle([x1,y1,x2,y2]);
  Map.layers().set(2, ui.Map.Layer(Buf, {color: 'yellow'},'AOI 150 x 150 m'));
   Map.layers().set(3, ui.Map.Layer(point, {color: 'FF0000'},'Lokasi'));
  // Create a chart of EVI over time.
  var chart = ui.Chart.image.series(EVI_TS, Buf, ee.Reducer.mean(), 250)
      .setOptions({
        title: (Lokasi+1) + ' : ' + location,
        vAxis: {title: 'NDBI/EVI/NDWI'},
        lineWidth: 1,
        pointSize: 3,
      });
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel.widgets().set(5, chart);
 Lokasi += 1});
var LonLatZoom = ui.Textbox({
  value: '106.8270944,-6.1753572,17',
  placeholder: 'Enter Lon,Lat,Zoom here...',
  onChange: function(value) {
    // set value with a dedicated method
    LonLatZoom.setValue(value);
    return(value);
  }
});
//print(LonLatZoom);
var BaseMap = ui.Textbox({
   value: ["SATELLITE",'S2',"MED","NCC"],
  placeholder: 'Enter MapType or Id...',
  onChange: function(value) {
    // set value with a dedicated method
    BaseMap.setValue(value);
    return(value);
  }
});
//print(BaseMap);
var button = ui.Button({
  label: 'Zoom to Location',
  onClick: function() {
    // you don't have to convert it into EE objects since you are
    // working on the client side
    LoLaZom = StrArr2Num(LonLatZoom.getValue(),',');
    LonC = LoLaZom[0];LatC = LoLaZom[1];Zoom = LoLaZom[2];
   Peta = BaseMap.getValue();
    Map.setCenter(LonC, LatC, Zoom);
var Lx,Ly,Lok_Rect,Lok_Point = ee.Geometry.Point(LonC, LatC),x1,y1,x2,y2;
Lx = 3*0.00025 ; Ly = Lx ; x1 = LonC-Lx ; x2 = LonC+Lx ; y1 = LatC+Ly ; y2 = LatC-Ly ;
Lok_Rect = ee.Geometry.Rectangle(x1,y1,x2,y2) // Area 150 x 150 m
;
if (Peta[1] == 'S2') {
Img = ee.ImageCollection("COPERNICUS/S2_SR")
.filterDate('2019-06-01','2020-06-30')
//.filterBounds(Lok_Point)
.map(MskAwan_S2k).map(addBands_S2)
.map(AddTime)
;
var ImgMed,Trend = LineFit(Img,'EVI').select('Trend','EVI_Trend'); 
ImgMed=Img.median().addBands(Trend);
print('Hasil Analisis Trend EVI Data Sentienl-2 Th 2019-2020',ImgMed);
// Aplikasi Model Umur Padi, Sawit berdasrkan Sentinel-2
VisRGB = {bands:["B11","B8","B3"],min:[-0.06,-0.05,0.05],max:[0.324,0.372,0.1447] };
//Stk 2Std (2-12) Komp Median ;min :0.055,0.05,0.0131, 0.0073,-0.0308,-0.0462, -0.05,-0.061,-0.0493 ;  
//max : 0.1227,0.1447,0.1556, 0.2067,0.3248,0.3759,  0.372, 8A 0.4058, SWIR 0.324,0.2386
//  
}
  Map.setOptions(Peta[0]);
  //Map.style(mapTypeId[1]);
Map.layers().set(0, ui.Map.Layer(Img.select('NDBI','EVI','NDWI'),{},'TSeries NDBI,EVI,NDWI',0));  
Map.layers().set(1, ui.Map.Layer(ImgMed,VisRGB,'Komposit '+ Peta[1],1,0.5));  
//  Map.addLayer(Img.median(),VisRGB,'Komposit '+ Peta[1],1,0.5);  
  }
});
//print(button); 
// Susun GUI di Panel
var i, Menu = [LonLatZoom,BaseMap,button];
for(i=0; i < 3; i++) {
panel.widgets().set(i+1, Menu[i]);
}
// Add the panel to the ui.root.
ui.root.add(panel);
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