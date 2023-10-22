var S1_GRD = ui.import && ui.import("S1_GRD", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD"),
    BtsKHG_Jambi = ui.import && ui.import("BtsKHG_Jambi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                102.94974938956003,
                -0.7445069795346463
              ],
              [
                102.94974938956003,
                -2.216143111447341
              ],
              [
                104.52079431143503,
                -2.216143111447341
              ],
              [
                104.52079431143503,
                -0.7445069795346463
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[102.94974938956003, -0.7445069795346463],
          [102.94974938956003, -2.216143111447341],
          [104.52079431143503, -2.216143111447341],
          [104.52079431143503, -0.7445069795346463]]], null, false),
    NDPI_Met_Jambi = ui.import && ui.import("NDPI_Met_Jambi", "image", {
      "id": "users/dededirgahayu11/img/NDPI_2018_20_KHGJambi"
    }) || ee.Image("users/dededirgahayu11/img/NDPI_2018_20_KHGJambi");
// ANALISIS WETNESS UNTUK MONITORING SOIL MOISTURE & REWETTING
// DI KHG MENGGUNAKAN DATA SATELIT SENTINEL-1/2
//     by Dr Ir Dede Dirgahayu Domiri, M.Si
var Admin = require('users/salmanddd14/AFungsi:AreaName.js');
var KHG = require('users/salmanddd14/AFungsi:KHG.js');
var Citra = require('users/salmanddd14/AFungsi:OlhCitra.js');
var GUI = require('users/salmanddd14/AFungsi:GUI_GEE.js');
var Sumur_Bor = ee.FeatureCollection("users/mohammadardha/TMT_7_Provinsi");
var KHG_Shp = KHG.KHG_Load(),JumKHG=ee.List(KHG_Shp).length().getInfo();
print('Jumlah KHG = ' + JumKHG,KHG_Shp);
var Shp_Id=1,AOI_Shp = KHG_Shp[Shp_Id],Poly,JumId; JumId = AOI_Shp.size().getInfo();
var Kode_KHG, KHG_Nam ;  if(Shp_Id==1) KHG_Nam = 'Jambi';
Kode_KHG = KHG.KHG_Kode(KHG_Nam);
print('Jumlah Poligon Id : ' + JumId,AOI_Shp);
Map.centerObject(AOI_Shp,11);
// Data Sentinel-1
var Th2019_2020 = ['2019-01-01','2020-08-31'];
var Agu2020_d1 = ['2020-08-01','2020-08-10'],Agu2020_d2 = ['2020-08-11','2020-08-20'],
Agu2020_d3 = ['2020-08-21','2020-08-31'],Sep2020_d1 = ['2020-09-01','2020-09-10'];
var RGB_S1_90p = {min:[-19.1,-28.2,4.8],max:[-4.7,-12.5,8.8]};
var RGB_S1_2Std = {min:[-9.4,-15.7,5.1],max:[-5.8,-12.1,7.6]};
var RGB_S1_Wet_3std = {min:[4.6,5.1,3.5],max:[8.1,9.7,7.6]};
var RGB_S1_Wet_2std = {min:[5.2,5.9,4.1],max:[7.6,8.9,6.9]}; // VV-VH
var RGB_S1_NDPI_2std = {min:[0.54,0.61,0.45],max:[0.71,0.77,0.67]};
var RGB_S1_NDPI_3std = {min:[0.45,0.55,0.35],max:[0.75,0.85,0.72]};
var S1 = Pilih_S1(Th2019_2020,'','',AOI_Shp,'',''),
NDPI_Agu_d3 = Pilih_S1(Sep2020_d1,'MPI','Mean',AOI_Shp,'Med',AOI_Shp),
//NDPI_Agu_d3 = Citra.Pilih_S1(Agu2020_d3,'NDPI','','MeanMed',''),
TglWet=TglR2Indo(Sep2020_d1,2);            
var Komp_S1_Med = S1.select('VV','VH','VV-VH','MPI','VH/VV').mean()
.focal_median().clip(AOI_Shp);
var Stk_KHG = Citra.StkImgGeom(Komp_S1_Med.select('MPI'),50,BtsKHG_Jambi);
print('Statistik KHG_Jambi:',Stk_KHG);
// Analisis Multitemporal / Metric NDPI S1 utk Deteksi Wetness
 var Met_S1_Wet = MetricImg(S1,'MPI',AOI_Shp);
//var Met_S1 = (NDPI_Met_Jambi).divide(10000).toFloat();
var Agud3_Wet = WetNess(NDPI_Agu_d3,Met_S1_Wet),
Sepd1_Wet2 = (NDPI_Agu_d3.subtract(0.15)).divide(0.5).multiply(100.0).toFloat() ;
var Agud3_Wet_Klas =  Agud3_Wet.divide(10).ceil().rename('Wetness_Kls').toByte(),
Sepd1_Wet2_Klas =  Sepd1_Wet2.divide(10).ceil().rename('Wetness2_Kls').toByte();
var Warna_Wet = ['ffaa00', 'ff0000','ff00ff','ffff00','00ff00',
'00dd00','00ffff','00dddd', '0000ff','0000aa'],
Pal_WetNess = {min:1,max:10,palette:Warna_Wet};
Map.addLayer(Komp_S1_Med,RGB_S1_2Std,'RGB S1 Median 2019-2020',0);
Map.addLayer(Met_S1_Wet,RGB_S1_NDPI_3std,'Metric NDPI 2019-2020',0);
Map.addLayer(Agud3_Wet,{},'Wetness ' + TglWet,0);
Map.addLayer(Sepd1_Wet2_Klas,Pal_WetNess,'Wetness Klas2 ' + TglWet);
Map.addLayer(Agud3_Wet_Klas,Pal_WetNess,'Wetness Klas ' + TglWet);
var Warna = ['red','green','blue','cyan','magenta','yellow','ff0000',
'00ff00','0000ff','aaaa00','ff88aa'];
if(KHG_Nam == 'Jambi') { 
for (var i=0; i < JumId; i++) {
Poly = AOI_Shp.filter(ee.Filter.eq('KODE_KHG',Kode_KHG[i]));
Map.addLayer(Poly,{color : Warna[i] },'Jambi ' + Kode_KHG[i],0,0.6); 
var Stk_SubKHG = Citra.StkImgGeom(Komp_S1_Med.select('MPI').clip(Poly),50,Poly.geometry());
print('Statistik Sub KHG_Jambi-' + (i+1),Stk_SubKHG);
}
}
MapShp2Img(AOI_Shp,2,'aa00aa','Batas Sub KHG');
Map.addLayer(Sumur_Bor,{color : 'red'},'Sumur Bor');
var LegWetness = BuatNamKls(10,10);
var LegendaWet = Legenda('Relative Wetness(%)',TglWet,LegWetness,Warna_Wet);
Map.add(LegendaWet);
// Simpan Hasil Olah Wetness ke GoogleDrive 
Citra.SaveImg2Drv(Agud3_Wet.multiply(2.5),'Wetness_KHGJambi_2020Sep_d1',30,BtsKHG_Jambi,AOI_Shp,'','Byte','');
Citra.SaveImg2Drv(Agud3_Wet_Klas,'Wetness_KHGJambi_2020Sep_d1_Kls',30,BtsKHG_Jambi,AOI_Shp,'Vis','Byte',Pal_WetNess);
// FUNGSI 
function Pilih_S1(Tgl_Range,PilBnd,Komp,AOI,FltSpas,Clp) {
  // Creatde by Dr Dede Dirgahayu
var S1 = S1_GRD
.filterDate(Tgl_Range[0],Tgl_Range[1])
.select('VV','VH','angle')
    .map(function(Img) { // Hilangkan Border Noise, biasanya nilai minimum pd bts scene
          var edge = Img.lt(-30.0);
          var maskedImage = Img.mask().and(edge.not());
          return Img.updateMask(maskedImage);
        })
.map(Koreksi_S1);
if (AOI !=='' ) S1 = S1.filterBounds(AOI);
if (PilBnd !=='') S1=S1.select(PilBnd);
if (Komp !=='') {
  if (Komp == 'Mean') S1 = S1.mean();
  if (Komp == 'Med') S1 = S1.median();
  if (Komp == 'Min') S1 = S1.min();
  if (Komp == 'Max') S1 = S1.max();
}
if (FltSpas == 'Med') S1 = S1.focal_median();
if (FltSpas == 'Mod') S1 = S1.focal_mode();
if (FltSpas == 'Mean') S1 = S1.focal_mean();
if (Clp !== '') S1=S1.clip(Clp);
if (Komp !=='')  S1 = S1.set("system:time_start",Tgl_Range[0]).set("system:time_end",Tgl_Range[1]);
return S1;
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
    var RVH_VV = VH_Int.divide(VV_Int).toFloat().rename('VH/VV');
    var NDPI = ((VV_Int.subtract(VH_Int)).divide((VV_Int.add(VH_Int)))).toFloat().rename('NDPI');
    var MPI = (NDPI.multiply(-1.0)).add(1.0).rename('MPI').toFloat();
return  VV_Corr.addBands(VH_Corr).addBands(VV_VH).addBands(NDPI).addBands(RVH_VV).addBands(MPI);
}
function MetricImg(Img,SelBnd,Clip) {// Img : Virtual ImgCol 
var Met  = ee.Image.cat(
 Img.select(SelBnd).mean().rename('Mean'),
 Img.select(SelBnd).max().rename('Max'),
 Img.select(SelBnd).min().rename('Min')
// Img.select(SelBnd).max().subtract(Img.select(SelBnd).min()).rename('Range')
  ).focal_median();
if (Clip !== '') Met = Met.clip(Clip);
 return Met; 
}
function WetNessNDPI(NDPI,Metric) { // Wetness Relative
// Moisture/Wetness = (1-NDPI)
var Range =  Metric.select('Min').subtract(Metric.select('Max'));
var WetR = (NDPI.subtract(Metric.select('Min'))).divide(Range).add(1.0);
WetR = WetR.multiply(100).focal_mode().rename('Wetness').toFloat();
return WetR;
}
function WetNess(MPI,Metric) { // Wetness Relative
// Moisture/Wetness = (1-NDPI)
var Range =  Metric.select('Max').subtract(Metric.select('Min'));
var WetR = (MPI.subtract(Metric.select('Min'))).divide(Range);
WetR = WetR.multiply(100).focal_mode().rename('Wetness').toFloat();
return WetR;
}
function Legenda(Titel1,Titel2,NamKls,Palet){
var legend = GUI.PosPanel('LL','8px 15px'),JumKls = ee.List(NamKls).length().getInfo();
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
function BuatNamKls(JumKls,Itv) {
  var i,j1,j2,NamKls=[],Kls;
  for (i=0; i < JumKls; i++) {
    j1 = i*Itv+1; j2 = (i+1)*Itv;
    if (i===0) j1=0; Kls = j1 + '-' + j2;
    if (i== JumKls-1) Kls = '> ' + (i*Itv);
    NamKls[i] = Kls;
  }
return NamKls ;}
function Shp2Img(Shp,Tebal) {
return ee.Image().toByte().paint(Shp, 0, Tebal);
}
function MapShp2Img(Shp,Tebal,Warna,KetLyr) {
return Map.addLayer(Shp2Img(Shp,Tebal), {palette : Warna},KetLyr);
}
function TglR2Indo(TglR,Fmt) {
 var Th,Bl,Tg1,Tg2,TglT;
if(Fmt == 1) Th = TglR[0].slice(0,7) ; else Th = TglR[0].slice(0,4) ; Bl = TglR[0].slice(5,7); 
Tg1 = TglR[0].slice(8,10); Tg2 = TglR[1].slice(8,10);
if(Fmt == 1) TglT = Th +"," + Tg1 + "-" + Tg2; else TglT =  Tg1 + "-" + Tg2 + "/" + Bl + "/" + Th;
return TglT;
}