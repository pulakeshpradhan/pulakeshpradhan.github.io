var LokSur_Riau_29Okt20 = ui.import && ui.import("LokSur_Riau_29Okt20", "table", {
      "id": "users/salmanddd14/shp/LokSur_Riau_29Okt20"
    }) || ee.FeatureCollection("users/salmanddd14/shp/LokSur_Riau_29Okt20"),
    S1_GRD = ui.import && ui.import("S1_GRD", "imageCollection", {
      "id": "COPERNICUS/S1_GRD"
    }) || ee.ImageCollection("COPERNICUS/S1_GRD");
var KHG = require('users/salmanddd14/AFungsi:KHG.js'); 
var KHG_Shp = KHG.KHG_Load(),JumKHG=ee.List(KHG_Shp).length().getInfo();
//print('Jumlah KHG = ' + JumKHG,KHG_Shp);
var Shp_Id=0,AOI_Shp = KHG_Shp[Shp_Id],Poly,JumId; JumId = AOI_Shp.size().getInfo();
//Map.centerObject(LokSur_Riau_29Okt20,11);
var Tgl_Range = ['2020-10-15','2020-10-31'];
var S1 = Pilih_S1(Tgl_Range,'NDPI','Mean',AOI_Shp,'Med',AOI_Shp);
var Warna_Wet = ['ff0000', 'ffaa00','ff00ff','ffff00','00ff00',
'00dd00','00ffff','00dddd', '0000ff','0000aa'],
Pal_NDPI = {min:0.1,max:0.8,palette:Warna_Wet};
Map.setCenter(101.9982, 0.8325,12); // Siak
Map.addLayer(S1,{min:0.2,Max:1.0,palette : ['red','ff00ff','yellow','00ff00','green','00ffff','blue']},'NDPI 21-31 Okt 2020');
Map.addLayer(LokSur_Riau_29Okt20,{color:'red'},'Lokasi Survey');
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