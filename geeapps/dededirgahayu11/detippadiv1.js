var modisLandcover = ui.import && ui.import("modisLandcover", "imageCollection", {
      "id": "MODIS/006/MCD12Q1"
    }) || ee.ImageCollection("MODIS/006/MCD12Q1"),
    Admin1 = ui.import && ui.import("Admin1", "table", {
      "id": "FAO/GAUL_SIMPLIFIED_500m/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level2"),
    Admin2 = ui.import && ui.import("Admin2", "table", {
      "id": "FAO/GAUL/2015/level2"
    }) || ee.FeatureCollection("FAO/GAUL/2015/level2"),
    MOD13Q = ui.import && ui.import("MOD13Q", "imageCollection", {
      "id": "MODIS/006/MOD13Q1"
    }) || ee.ImageCollection("MODIS/006/MOD13Q1"),
    SHSri_Poly = ui.import && ui.import("SHSri_Poly", "table", {
      "id": "users/salmanddd14/shp/SHSri_Geo"
    }) || ee.FeatureCollection("users/salmanddd14/shp/SHSri_Geo"),
    SHSri_Bts = ui.import && ui.import("SHSri_Bts", "table", {
      "id": "users/salmanddd14/shp/Sri_Poly"
    }) || ee.FeatureCollection("users/salmanddd14/shp/Sri_Poly"),
    Blora_1 = ui.import && ui.import("Blora_1", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            111.50139962545248,
            -6.944198645383269
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "Sawah": "Tadah Hujan",
        "Plot": "Blora_1",
        "Kec": "BOGOREJO",
        "Kab": "BLORA",
        "system:index": "0"
      },
      "color": "#d63000",
      "mode": "Feature",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Feature(
        ee.Geometry.Point([111.50139962545248, -6.944198645383269]),
        {
          "Sawah": "Tadah Hujan",
          "Plot": "Blora_1",
          "Kec": "BOGOREJO",
          "Kab": "BLORA",
          "system:index": "0"
        }),
    EVIs8Mod2017_20 = ui.import && ui.import("EVIs8Mod2017_20", "image", {
      "id": "projects/ee-dededirgahayu11/assets/EVIs8Mod2017_20"
    }) || ee.Image("projects/ee-dededirgahayu11/assets/EVIs8Mod2017_20"),
    IP_JwBl2017_20 = ui.import && ui.import("IP_JwBl2017_20", "image", {
      "id": "projects/ee-dededirgahayu11/assets/IP_JwBl2017_20"
    }) || ee.Image("projects/ee-dededirgahayu11/assets/IP_JwBl2017_20"),
    Stk_Subang2017_20 = ui.import && ui.import("Stk_Subang2017_20", "image", {
      "id": "projects/ee-dededirgahayu11/assets/Stk_Subang2017_20"
    }) || ee.Image("projects/ee-dededirgahayu11/assets/Stk_Subang2017_20");
// Deteksi IP Padi brdasarkan saat terjadi EVI Max & Awal Tanam menggunakan data MODIS 16 harian EVI Multitemporal
//  Created by Dr Dede Dirgahayu
// Referensi Batas Admin & LB Sawah 2019
var Admin = require('users/salmanddd14/AFungsi:AreaName.js');
var Admin_Kec = require('users/dededirgahayu11/Fungsi:DD_NamaKecamatan.js'); 
var LBS = require('users/dededirgahayu11/LBS:LBS_BPN2019.js');
var GUI = require('users/salmanddd14/AFungsi:GUI_GEE.js');
var EVIs = EVIs8Mod2017_20.subtract(128).divide(125).toFloat();
// Metric 
// Konversi to TSeries (ImgCollection)
EVIs = Stck2ImgCol(EVIs,'EVI','2017-01-17',8,0);
var LBS_Pulau = LBS.LBSPulau(0),LBS_Prv = ee.List(LBS.LBS19()),Pilih_Pulau=0,Pilih_Prv=1,NamPrvPil;
var WADMPR = Admin.NamProv(1), Pulau_Prv = Admin.PulauProv(), PilPrv = Admin.PilihProv(),Bts_Plu=Admin.BatasPlu(),
Shp_Admin = Admin.ShpAdmin('All'); 
// ..... Batas area (Bounds), Lokasi
var Bts_Indo = ee.Geometry.Rectangle([90,8,142,-11]),
Bts_JwBl = ee.Geometry.Rectangle([105,-5.5,116,-9]);
var Kota_Blora = ee.Geometry.Point(111.4186, -6.96916),
SwhTH_Blora = Blora_1
  ;
// .... Filter Waktu
var Pd=16, Tgl_Awal = '2017-01-01',Tgl_Akhir = '2021-07-31',
 Tgl_Cek = [Tgl_Awal,Tgl_Akhir];
 // **** Membuat Time Series (TS) EVI 16 Harian MODIS
 var Scld = 10000, Pilih_Band = ['NDBI','EVI','NDWI'],JumList;
 var TS_EVI16 = MOD13Q.filterBounds(Bts_Indo).filterDate(Tgl_Cek[0],Tgl_Cek[1])
              .map(EVIFloat).map(AddIdx_Mod13)
              .select(Pilih_Band) 
              ;
 JumList = TS_EVI16.size().getInfo();
// print('Jumlah list Img EVI16 = ' + JumList,'TS EVI16 :',TS_EVI16);
var List_Imgs = TS_EVI16.toList(JumList);
// Par Visual
var PalIV = ['0000ff','00ffff','00bbbb','ffaa00','ff0000','ff00ff','ffff44','bbbb00','88ff00','00ff00','00dd00','008800'];
var Pal_IP8 = ['ff44ff','ffaa00','ffff00', 'bbbb00','00ffff','00ff00','00dd00'];
var Vis_IP_Kls = VisPar([1],[8],['IP_Kls'],Pal_IP8),Vis_IP_Ave = VisPar([0],[3],['IP_year'],Pal_IP8);
// Legenda
var Prod_Kls = ['< 45','45-50','50-55','55-60','60-65','65-70','70-75','75-80','80-85','85-90','90-95','> 95'],
Prod_Ket = ['Produktivitas','Potensi (Kw/Ha)'],Leg_Prod = GUI.Legenda(Prod_Ket[0],Prod_Ket[1],Prod_Kls,PalIV),
sample,Prv,Leg_IP,IP_Kls = ['0.5-1.0','1.0-1.5','1.5-2.0', '2.0-2.5','2.5-3.0','3.0-3.5',' > 3.5 '], 
IP_Ket = ['Average IP/year','2017-2020'],Leg_IP = GUI.Legenda(IP_Ket[0],IP_Ket[1],IP_Kls,Pal_IP8)
;
var LegProd1 = GUI.Legenda(Prod_Ket[0],Prod_Ket[1],Get_Arr(Prod_Kls,1,5),PalIV);
print(Get_Arr(Prod_Kls,1,5));
// Eliminasi Awan & Smoothing Image Metode Moving Median & Mean, 
// Deteksi EVI_Max & Pos Max utk perhitungan IP
var TSEVI_Smooth = PosEVIMax(TS_EVI16,'EVI'); 
//print ('PosMax',TSEVI_Smooth[0]); 
//print ('Smoothing',TSEVI_Smooth[1]);
// Metric Index2 utk Deteksi Karakteristik Tan Padi for Deteksi Tan Padi/Non & Klasifikasi Sawah/Non Sawah
var MetricEVI = Metric(TSEVI_Smooth[1],['EVI']),Sawah;
//print('MetricEVI awal',MetricEVI);
//Sawah=DetSawah(MetricEVI);
MetricEVI = MetricEVI.addBands(YieldPadi(MetricEVI.select('EVI_Max')))
          .addBands(TSEVI_Smooth[0]);
//print('MetricEVI modif',MetricEVI);
var Swh_LBS = ee.Image.cat(LBS_Pulau).reduce(ee.Reducer.max()); 
var EVIMax_Kls = ReKlasImg(MetricEVI.select('EVI_Max'),0.35,0.85,0.05,'EVIMax_Kls').focal_mode();
var Prod_Kls = ReKlasImg(MetricEVI.select('Kw/Ha'),45,90,5,'Produktivitas_Kls').focal_mode();
// Deteksi IP 
//var IP_2017_20_JwBl = IP_JwBl2017_20.divide(3.488).rename('IP_year').toFloat();
var IP_2017_20_JwBl = HitIP(IP_JwBl2017_20,'2017-01-17','2020-12-18');
print("IP_2017_20_JwBl",IP_2017_20_JwBl);
var IP_2017_20_JwBl_Kls = ReKlsIP(IP_2017_20_JwBl);
print("IP_2017_20_JwBl_Kls",IP_2017_20_JwBl_Kls);
//********* VISUALISASI & GRAFIK
var Ket_Layer,Ket_Layer = ['TS EVIMOD 16','Produktivitas','EVI_Max_Kls'
      ,'Produksi_Kls','Average IP/Th', 'Class IP/Th','Batas Blok SHSri','Batas Admin Prov/Kab/Kec'];
var VisObjs = [TSEVI_Smooth[1],MetricEVI.mask(Swh_LBS),EVIMax_Kls.mask(Swh_LBS).reproject('EPSG:4326',null,250),
          Prod_Kls.mask(Swh_LBS).reproject('EPSG:4326',null,250),IP_2017_20_JwBl.mask(Swh_LBS),IP_2017_20_JwBl_Kls.mask(Swh_LBS),
           Feat2Img(SHSri_Poly,4,2)];
Map.centerObject(SHSri_Bts,10);
Map.addLayer(TSEVI_Smooth[1],{min:0,max:0.85},'TS EVI16',0);
Map.addLayer(MetricEVI.mask(Swh_LBS),{min:0.2,max:0.75},'Produktivitas',0);
Map.addLayer(EVIMax_Kls.mask(Swh_LBS).reproject('EPSG:4326',null,250),{min:1,max:13,palette:PalIV},'EVI_Max_Kls',0);
Map.addLayer(Prod_Kls.mask(Swh_LBS).reproject('EPSG:4326',null,250),{min:1,max:12,palette:PalIV},'Produksi_Kls',0);
Map.addLayer(IP_2017_20_JwBl.mask(Swh_LBS),Vis_IP_Ave,'Average IP/Th',0);
Map.addLayer(IP_2017_20_JwBl_Kls.mask(Swh_LBS),Vis_IP_Kls,'Class IP/Th');
Map.addLayer(Feat2Img(SHSri_Poly,4,2),{palette :'444444'},'Blok Sh Sri');
// Outline Feature Admin
//Map.addLayer(Shp_Admin[2],{},'Polygon Kecamatan',0);
Map.addLayer(ShpPrvKab([8,9,10]),{min:8,max:10,palette :['black','dd00dd','red']},'Batas Admin Prov/Kab/Kec');
Map.add(Leg_IP); //Map.add(Leg_Prod); 
// Create a panel to hold the chart.
var panel = ui.Panel(); 
panel.style().set({
  width: '250px',//height:'350px',
  position: 'middle-right'
});
var Judul = GUI.Lbl('DETEKSI IP & ESTIMASI PROVITAS PADI MENGGUNAKAN DATA SATELIT (Inventor : Dr Dede Dirgahayu, Pusfatja, LAPAN)',
  12,'blue',"8px 0 0 0",'bold','center');
var TB_Info = GUI.TxtB('Info IP & Provitas',"Info",9,'0000ff',"0 0 0 10px",'normal',200,'center');
var Lbl_NoLok = GUI.Lbl('Selected location',11,'red',"10px 4px 4px 10px",'bold',"");
var Lbl_Klik = GUI.Lbl('Clik on Map !',12,'red',"",'bold',"");
panel.widgets().set(0,Judul).set(1,Lbl_NoLok).set(2,TB_Info).set(3,Leg_Prod);
Map.style().set('cursor', 'crosshair'); Lbl_Klik.style({position:'top-middle'});
ui.root.add(panel); Map.add(Lbl_Klik);
// Interactive selection
var Gab_Point=[],JTtk=0,k=0,IP_Sam,IP_Val,EVI_Maxt,Pos_Maxt;
Map.onClick(function(coords) {
  var Lx,Ly,Buf,KorT,BufGab=[]; 
//panel.clear(); 
  var Lokasi,point = ee.Feature(ee.Geometry.Point(coords.lon, coords.lat));
  Buf = point.buffer(125); Lokasi = coords.lon.toFixed(6) + "," + coords.lat.toFixed(6);
  Map.layers().set(8, ui.Map.Layer(Buf, {color: 'FF0000'},'Buffer 250m Lokasi'));
 sample = MetricEVI.select('Kw/Ha').sample(Buf.geometry(),250);
 Prv = sample.first().get('Kw/Ha').getInfo().toFixed(2);
 EVI_Maxt = MetricEVI.select('EVI_Max').sample(Buf.geometry(),250);
 Pos_Maxt = MetricEVI.select('Pos_Max').sample(Buf.geometry(),250);
 IP_Sam = IP_2017_20_JwBl.sample(Buf.geometry(),250),
 IP_Val = IP_Sam.first().get('IP_year').getInfo().toFixed(1);
  //var chart = ui.Chart.image.seriesByRegion(image.select('B5'), Buf, ee.Reducer.mean(), 30);
 // var chart = ui.Chart.image.regions(MetricEVI, Buf, ee.Reducer.mean(), 125);
// var chart = ui.Chart.image.series(TSEVI_Smooth[1], Buf, ee.Reducer.mean(), 125);
//  chart.setOptions({title: 'Produktivitas (Kw/Ha) = ' +  Prv + '\n' + Lokasi}
//  ); 
var chart = BuatGrafik_TS (TSEVI_Smooth[1],Buf,ee.Reducer.mean(),250,['NDBI','EVI','NDWI'],['00dd00','Red','blue'],
'Produktivitas (Kw/Ha) = ' +  Prv + " ; IP = " + IP_Val + " ; " + Lokasi,'Tanggal Data','Index(EVI,NDBI,NDWI)');
var chart2 = BuatGrafik_TS (EVIs,Buf,ee.Reducer.mean(),250,['EVI'],['00dd00'],
'Smoothing EVI' +  " ; " + Lokasi,'Tanggal Data','Index(EVI,NDBI,NDWI)');
 //  var chart2 = ui.Chart.ui.Chart.image.seriesByRegion(TSEVI_Smooth[1], Buf, ee.Reducer.mean(), 125);
//  chart2.setOptions({title: 'Metrik'});
//  panel.add(chart) ;
  Lbl_NoLok.setValue('Lokasi_' + (k+1) + " : " + Lokasi);
  TB_Info.setValue('Provitas : ' + Prv + '; IP = ' + IP_Val ) ; // + '; ' + EVI_Maxt + '; ' + Pos_Maxt) ;
  panel.widgets().set(4,chart); panel.widgets().set(5,chart2);
 k +=1 ;
});
//FUNGSI2
function VisPar(Mins,Maxs,Bands,Palet) {
  var Vis = {min:Mins,max:Maxs,bands:Bands };
  if (Palet !==0) Vis = {min:Mins,max:Maxs,bands:Bands,palette:Palet };
  return Vis;
}
 function Konversi_ImgCol(ImgCol,Koef) {
  // Konversi Data ImgColeksi jdi float dg Koef : Scaled & Offsed
var Tgl1 = ee.Date(ImgCol.get('system:time_start')).format('YYYY-MM-dd'),
Tgl2 = ee.Date(ImgCol.get('system:time_end')).format('YYYY-MM-dd');
return ImgCol.multiply(Koef[0]).add(Koef[1]).toFloat()
  //.copyProperties(ImgCol,['system:time_start','system:time_end'])
  .set('system:time_start',Tgl1).set('system:time_end',Tgl2)
  ;
  } 
function EVIFloat(Img) {
  return Konversi_ImgCol(Img,[1.0/Scld,0]);
} 
function NDif(Img,Bnds,RenBnd) { 
  var ND = Img.expression('(b1-b2)/(b1+b2)',
  {b1:Img.select(Bnds[0]),b2:Img.select(Bnds[0]) }).toFloat().rename(RenBnd);
return ND;
  }
function AveWgt(Img,Bnds,Wgt,RenBnd) {// Komb Linear Band 
  var ND = Img.expression('w1*b1 + w2*b2',
  {b1:Img.select(Bnds[0]),b2:Img.select(Bnds[0]),w1:Wgt[0],w2:Wgt[1] }).toFloat().rename(RenBnd);
return ND;
  }
function AddIdx_Mod13(Img) {
 var Bnds = ['sur_refl_b01','sur_refl_b03'],Wgt=[0.4,0.6];
  var Gr = AveWgt(Img,Bnds,Wgt,'green');
  var ndwi = Img.normalizedDifference(['sur_refl_b01', 'sur_refl_b07']).rename('NDWI').toFloat();
  var ndbi = Img.normalizedDifference(['sur_refl_b07', 'sur_refl_b02']).rename('NDBI').toFloat();
return Img.addBands(ndbi).addBands(ndwi);
}
function ReKlasImg(Img,bb,ba,Itv,NamBnd) {
var Kls,JumKls=(ba-bb)/Itv + 3; // Lebihkan 2 klas
Kls = Img.expression("(d <= 0) ? 0 : (d > 0 && d < bb) ? 1 : (d > ba) ? JumKls : 2 + (d-bb)/Itv",
{d:Img,bb:bb,ba:ba,JumKls:JumKls,Itv:Itv})
.round().rename(NamBnd).toByte();
return Kls.mask(Kls); 
  }
function Metric(ImgCol,NamBnds) {
  var JumLst = ImgCol.size().getInfo(),ListImgs = ImgCol.toList(JumLst);  
  var Tgl_s = ee.Date(ee.Image(ListImgs.get(0)).get('system:time_start')).format('YYYY-MM-dd');
  var Tgl_e = ee.Date(ee.Image(ListImgs.get(JumLst-1)).get('system:time_end')).format('YYYY-MM-dd');
  var i,NamBnd, JumBnd,ImgStck =[] ;
  JumBnd = ee.List(NamBnds).length().getInfo();
  for (i=0; i < JumBnd; i++) { NamBnd=NamBnds[i]; 
  ImgStck[i] = ee.Image.cat(
    ImgCol.mean().select(NamBnd).rename(NamBnd+ '_Mean'),
    ImgCol.max().select(NamBnd).rename(NamBnd+ '_Max'),
    ImgCol.min().select(NamBnd).rename(NamBnd+ '_Min'),
    ImgCol.median().select(NamBnd).rename(NamBnd+ '_Med'))
    .set('system:time_start',Tgl_s).set('system:time_end',Tgl_e)
    ;}
    ImgStck = ee.Image.cat(ImgStck); return ImgStck; 
}
function DetSawah(Img) { 
  var Swh = Img.expression("(Min <= 0.188 && Max > 0.35 && Max-Min > 0.4)?1:0",
  {Min:Img.select('EVI_Min'),Max:Img.select('EVI_Max')}).rename('Sawah').toByte();
return Swh;} 
function YieldPadi(EVIMax) {
  return (EVIMax.divide(0.103)).log().multiply(38.46154).rename('Kw/Ha').toFloat();
}
function PosEVIMax(ImgCol,NamBnd) {
// Deteksi Posisi data saat terjadi EVI Max, sekaligus eleminasi awan dg smoothing median 3
var i, JumList = ImgCol.size().getInfo(),Max,Min,PosMax,PosMin,
Img1,Img2,Img3,Ganti_Awan,s1,s2,t1,t2,EVI_Tnm,EVI_Pan,WI_Tnm,BI_Pan;
List_Imgs = ImgCol.toList(JumList);
Max = ImgCol.select(NamBnd).min(); Min = ImgCol.select(NamBnd).max(); 
PosMax = ee.Image(1).toByte(); PosMin = ee.Image(1).toByte();
var Tgl1,Tgl2,ImgMed,ImgS,ImgSmooth = [];
Tgl1 = ee.Image(List_Imgs.get(0)).get('system:time_start');
Tgl2 = ee.Image(List_Imgs.get(0)).get('system:time_end');
ImgSmooth[0]=ee.Image(List_Imgs.get(0)).set('system:time_start',Tgl1).set('system:time_end',Tgl2);
 for (i=0; i < JumList; i++ ) {
 Img1 = ee.Image(List_Imgs.get(i));
Tgl1 = ee.Image(List_Imgs.get(i)).get('system:time_start');
Tgl2 = ee.Image(List_Imgs.get(i)).get('system:time_end');
ImgSmooth[i]=Img1.set('system:time_start',Tgl1).set('system:time_end',Tgl2);
 if (i > 0 && i < JumList-1 ){ 
 Img2 = ee.Image(List_Imgs.get(i-1)); Img3 = ee.Image(List_Imgs.get(i+1)); 
  //Awan/Noise biasanya Img1 < Img2 & Img1 < Img3
// Ganti_Awan = Img1.expression("(I2 < I1 && I2 < I3) ? (I1+I3)/2:I2",
// { I1:Img2,I2:Img1,I3:Img3}); ImgSmooth[i]= Ganti_Awan; Img1= Ganti_Awan;
ImgMed = GetListImg(List_Imgs,i,3).median();
//ImgMed = ee.ImageCollection([Img1,Img2,Img3]).median();
ImgMed=ImgMed.set('system:time_start',Tgl1).set('system:time_end',Tgl2);
  ImgS =Img1.expression("(d < Max) ? d:a",{
    d:ImgMed,Max:Max,a:Img1 }); ImgSmooth[i]= ImgS;
 }
Min = Img1.expression('(d < Min)? d : Min',
 {d:Img1.select(NamBnd),i:i,Min:Min});
PosMin=Img1.expression('(d != 0 && d == Min)? i+1 : PMn',
 {d:Img1.select(NamBnd),i:i,Min:Min,PMn:PosMin}).rename('PosMin').toByte(); 
Max = Img1.expression('(d > Max)? d : Max',
 {d:Img1.select(NamBnd),i:i,Max:Max,PMx:PosMax}); 
PosMax=Img1.expression('(d == Max)? i+1 : PMx',
 {d:Img1.select(NamBnd),i:i,Max:Max,PMx:PosMax}).rename('PosMax').toByte(); 
}
// Musim Tanam pertama, yg paling Max sbg acuan deteksi penanaman yg lain
// EVI Saat Tanam (dominan air/lembab) & Panen (Bera)
Min = ee.ImageCollection(ImgSmooth).min().select(NamBnd).rename('EVI_Min');
Max = ee.ImageCollection(ImgSmooth).max().select(NamBnd).rename('EVI_Max');
for (i=0; i < JumList; i++ ) {
Img1 = ImgSmooth[i];
t1 = Math.ceil(64/Pd); s1=i-t1; s2=i+t1;
if (s1 < 0) s1=0; if (s2 > JumList-1) s2=JumList-1;
 if (s1 >= 0) {
 EVI_Tnm = Max.expression('(d != 0 && d == Max && s1 >=0)? Tnm : d',
 {d:Img1.select(NamBnd),i:i,Max:Max,s1:s1,Tnm:ImgSmooth[s1].select(NamBnd)}).rename('EVI_Tanam'); 
 WI_Tnm = Max.expression('(d != 0 && d == Max && s1 >=0)? Tnm : d',
 {d:Img1.select(NamBnd),i:i,Max:Max,s1:s1,Tnm:ImgSmooth[s1].select('NDWI')}).rename('NDWI_Tanam');
 }
 if (s2 < JumList ) {
 EVI_Pan = Max.expression('(d != 0 && d == Max && s2 < JumList)? Pan : d',
 {d:Img1.select(NamBnd),i:i,Max:Max,s2:s2,JumList:JumList,Pan:ImgSmooth[s2].select(NamBnd)}).rename('EVI_Panen');  
 BI_Pan = Max.expression('(d != 0 && d == Max && s2 < JumList)? Pan : d',
 {d:Img1.select(NamBnd),i:i,Max:Max,s2:s2,JumList:JumList,Pan:ImgSmooth[s2].select('NDBI')}).rename('NDBI_Panen');
 }
 }
//var Data = [EVI_Tnm.addBands(EVI_Pan).addBands(PosMax).addBands(PosMin),ee.ImageCollection(ImgSmooth)];
return [(PosMax).addBands(PosMin).addBands(EVI_Tnm).addBands(WI_Tnm).addBands(EVI_Pan).addBands(BI_Pan),
ee.ImageCollection(ImgSmooth)];
  }
 function GetListImg(ListImgs,Idx,n) {
   var Hasil,i,s1,s2,d,ImgGab=[]; d=Math.floor(n/2);
   s1 = Idx-d; s2 = Idx + d;
   for (i=s1; i <= s2; i++) {ImgGab[i-s1]=ee.Image(ListImgs.get(i)) }
 return ee.ImageCollection(ImgGab);
   }
function Feat2Img(Feat,Val,Tebal,Pro) { // Konversi Polygon jdi Garis, Image 
  return ee.Image().toByte().paint(Feat, Val, Tebal);
}
function ShpPrvKab(Val) {// Outline gabungan Bts Admin Prov & Kab
return ee.ImageCollection([Feat2Img(Shp_Admin[2], Val[0], 1),Feat2Img(Shp_Admin[1], Val[1], 2),Feat2Img(Shp_Admin[0], Val[3], 3)]).max();
}
function BuatGrafik_TS (ImgCol,Region,Reducer,Sc,Bands,Warna,Title,HTitle,VTitle) {
var Chart = ui.Chart.image
        .series({
          imageCollection: ImgCol.select(Bands), 
         // region: 'users/daffamus49/MyLampung',
          region : Region, 
          //reducer: ee.Reducer.mean(),
          reducer: Reducer,
          scale: Sc,
          xProperty: 'system:time_start'
        })
       // .setSeriesNames(Bands)
        .setOptions({
          title: Title,
          hAxis: {title: HTitle, titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: VTitle,
            titleTextStyle: {italic: true, bold: true}
          },
          lineWidth: 3,
          colors: Warna,
          curveType: 'function'
        });    
  return Chart;
  }
function Simpan2Ast(ImgIn,ImgOut,Sc,BtsGeom,Fld){
  Export.image.toAsset({
  image:ImgIn,
  description: 'Task_' + ImgOut,
  assetId: ImgOut,
  scale: Sc,
  maxPixels: 1e13,
  region: BtsGeom,
  folder : Fld
 });
}
function StkImgGeom(img,NamBnd,Geom,Sc) {
  // Get Mean Std
var meanRedu = ee.Reducer.mean(), sigmaRedu = ee.Reducer.stdDev();
var Redu = meanRedu.combine({reducer2:sigmaRedu,sharedInputs: true});
var MeanStd = img.reduceRegion({reducer:Redu,region:Geom,scale: Sc,maxPixels:1e13});
var Mean = MeanStd.get(NamBnd + "_mean").getInfo();
var Std = MeanStd.get(NamBnd + "_stdDev").getInfo();
return [Mean,Std];
  } 
function Deteksi_Obyek(BUI_Img,EVI_Img,Th_BUI,Th_EVI) {
  // Deteksi obyek Permukiman, Vegetasi & dominan air (Lan dCover Utama)
  // Th : nilai treshold, berdasarkan analisis Stk mean +- k*Std. Utk Air EVI <= 0.188
  // Th_BUI : -0.041 ; Th_EVI : 0.205 -> Landsat 8 di Lampung
  // Created by Dr Dede Dirgahayu
  var LC = BUI_Img.expression("(bi < Th1 && iv < 0.188) ? 1 : " + // Air
  "(bi >= Th1 && iv <= Th2) ? 2 : (iv > Th2) ? 3:0",{bi:BUI_Img,iv:EVI_Img,Th1:Th_BUI,Th2:Th_EVI}).rename('LC').toByte();
 return LC; 
  } 
function StkTS_Img(imcol,p1,p2,NamBnd){
  // imCol > 1 band ; SelBnd = Bnd yg dipilih 
  var Jum1,Jum2,xrata, yrata, count, atas, bawah,JumDat,listOfImages,i,n,AT,
  img,ymn,ymx,PosMin,PosMax,ImgRange,J1x,J2x,Jxy,ImgStd,k,ImgX,Bnd,BndNm=[],IV0,IVTnm,
  VarXY,VarX,Trend,VarY,Itc,r,ImgMed,IVe,ImgKV;
JumDat = imcol.size().getInfo(); listOfImages = imcol.toList(JumDat); n=JumDat;
IV0 = ee.Image(listOfImages.get(0)).select(NamBnd).unmask();
IVe = ee.Image(listOfImages.get(n-1)).select(NamBnd).unmask();
ImgMed = GetImgColTS(listOfImages,NamBnd,p1,p2).median().rename(NamBnd + '_Med').toFloat();
/*
Bnd = ee.List(imcol.bandNames().getInfo());
JumDat = Bnd.length().getInfo(); 
for(i=0; i < JumDat; i++) {
  BndNm[i]= Bnd.get(i).getInfo();}
  */
  if (p1 >=0 || p2 >=0) n = p2-p1+1; else p1=0 ;
  Jum1 = J1x = Jum2 =J2x= Jxy= ImgRange = xrata =count = ImgX = ee.Image(0);
  ymn = ee.Image(1.0); ymx = ee.Image(-1.0); PosMin = PosMax = ee.Image(1).toInt16();
  yrata = ee.Image(0.01); ImgStd = ee.Image(0.01); Trend = ee.Image(0.01); 
  Itc = ee.Image(0.01); r = ee.Image(0.01); ImgX = ee.Image(0);
  for (i=0; i < n ; i++ ){ k=i+p1;
  img = ee.Image(listOfImages.get(k)).select(NamBnd).unmask();
  //img = imcol.select(BndNm[k]).unmask();
  //ImgX = ImgX.add(k);
  Jum1 = Jum1.add(img) ; Jum2 = Jum2.add(img.multiply(img));
  ImgX = img.expression('(img != 0 )? y : x'
    ,{img:img,x:ImgX,y :ImgX.add(k) }) ;
  J1x = J1x.add(ImgX); J2x = J2x.add(ImgX.multiply(ImgX));
  Jxy = Jxy.add(img.multiply(ImgX));
  count = img.expression('(img != 0 )? count+1 : count'
    ,{img:img,count:count}) ;
  ymn = img.expression('(img != 0 && img < ymn)? img : ymn'
    ,{img:img,ymn:ymn}) ;
  ymx = img.expression('(img != 0 && img > ymx)? img : ymx'
  ,{img:img,ymx:ymx}) ;
  PosMin = img.expression('(img != 0 && img == ymn)?k+1:PMn'
    ,{img:img,ymn:ymn,PMn:PosMin,k:k}) ;
  PosMax = img.expression('(img != 0 && img == ymx)?k+1:PMx'
    ,{img:img,ymx:ymx,PMx:PosMax,k:k}) ; 
    }  
ymn = ymn.rename(NamBnd + '_Min').toFloat() ; ymx = ymx.rename(NamBnd + '_Max').toFloat() ;
PosMin = PosMin.rename('Pos_Min'); PosMax = PosMax.rename('Pos_Max');
yrata = Jum1.divide(count).rename(NamBnd + '_Mean').toFloat();
ImgStd = (Jum2.subtract((Jum1.multiply(Jum1)).divide(count))).divide(count.subtract(1));
ImgStd = ImgStd.sqrt().rename(NamBnd + '_Std').toFloat(); 
ImgKV = ImgStd.divide(yrata).rename(NamBnd + '_KV').toFloat();
// Koef Regresi : Trend/Slope (Slp),intercep(Itc),korelasi(r)
VarXY = Jxy.subtract(yrata.multiply(J1x)); VarX = J2x.subtract(J1x.multiply(J1x).divide(count)); 
Trend = VarXY.divide(VarX).rename('Trend').toFloat() ; 
VarY = Jum2.subtract((Jum1.multiply(Jum1).divide(count)));
Itc= yrata.subtract(Trend.multiply(J1x.divide(count))).rename('Intcp').toFloat();
r = VarXY.divide((VarX.multiply(VarY)).sqrt()).rename('Korelasi').toFloat();
ImgRange = ymx.subtract(ymn).rename(NamBnd + '_Range').toFloat(); 
  count = count.rename('Sum NonMask').toUint16();
  return yrata.addBands(ymx).addBands(ymn).addBands(ImgMed).addBands(ImgRange).addBands(ImgKV)
  .addBands(PosMin).addBands(PosMax).addBands(count).addBands(Trend).addBands(Itc).addBands(r);
}
function StkTS_Padi(imcol,Pd){ // Deteksi Phenologi tan Padi
  // Input imcol TimeSeries NDBI,EVI,NDWI
  var Jum1,Jum2,xrata, yrata, count, JumDat,listOfImages,i,n,
  img,ymn,ymx,PosMin,PosMax,ImgRange,J1x,J2x,Jxy,ImgStd,k,ImgX,Bnd,BndNm=[],IV0,IVTnm,
  VarXY,VarX,Trend,VarY,Itc,r,ImgMed,WITnm,BIPan,IVPan,IVe,UMx,LPh,p1,p2,WI0,BIe;
if (Pd % 8 === 0) UMx = 64; else UMx = 60; LPh = UMx/Pd; 
JumDat = imcol.size().getInfo(); listOfImages = imcol.toList(JumDat); n=JumDat;
IV0 = ee.Image(listOfImages.get(0)).select('EVI').unmask();
IVe = ee.Image(listOfImages.get(n-1)).select('EVI').unmask();
WI0 = ee.Image(listOfImages.get(0)).select('NDWI').unmask();
BIe = ee.Image(listOfImages.get(n-1)).select('NDBI').unmask();
WITnm = IVTnm = IVPan = BIPan = ee.Image(0.01); 
var Stk1 = StkTS_Img(imcol,-1,-1,'EVI'); ymx = Stk1.select('EVI_Max'); 
PosMax = Stk1.select('Pos_Max');
  for (i=0; i < n ; i++ ){ k=i;
  img = ee.Image(listOfImages.get(i)).select('EVI').unmask();
  //img = imcol.select(BndNm[k]).unmask();
 if ((i - LPh) >= 0) {
  IVTnm = ymx.expression('(img == ymx && PMx - LPh >=0)?IVt:IV0'
    ,{img:img,ymx:ymx,PMx:PosMax,LPh:LPh,IV0 :IV0,
  IVt:ee.Image(listOfImages.get(i-LPh)).select('EVI').unmask()
    });   
  WITnm = ymx.expression('(img == ymx && PMx - LPh >=0)?IVt:IV0'
    ,{img:img,ymx:ymx,PMx:PosMax,LPh:LPh,IV0 :WI0,
  IVt:ee.Image(listOfImages.get(i-LPh)).select('NDWI').unmask()
    });  }
  if ((i + LPh) < n) {
  IVPan = ymx.expression('(img == ymx && PMx + LPh < n)?IVt:IVe'
    ,{img:img,ymx:ymx,PMx:PosMax,LPh:LPh,IVe :IVe,n:n,
  IVt:ee.Image(listOfImages.get(i+LPh)).select('EVI').unmask()
    });  
  BIPan = ymx.expression('(img == ymx && PMx + LPh < n)?IVt:IVe'
    ,{img:img,ymx:ymx,PMx:PosMax,LPh:LPh,IVe :BIe,n:n,
  IVt:ee.Image(listOfImages.get(i+LPh)).select('NDBI').unmask()
    });  }
  /*
  if ((i - LPh) >= 0 && (i + LPh) < n) {  
  var Mean_Veg = ymx.expression('(img == ymx && PMx - LPh >= 0)?IVt:IVe'
    ,{img:img,ymx:ymx,PMx:PosMax,LPh:LPh,
  IVt:StkTS_Img(imcol,i - LPh,i,'EVI').select('EVI_Mean'),
  IVe:StkTS_Img(imcol,0,i,'EVI').select('EVI_Mean') 
    }).rename('Mean_Veg').toFloat;  
  var Mean_Gen = ymx.expression('(img == ymx && PMx + LPh < n)?IVt:IVe'
    ,{img:img,ymx:ymx,PMx:PosMax,LPh:LPh,n:n,
  IVt:StkTS_Img(imcol,i,i+LPh,'EVI').select('EVI_Mean'),
  IVe:StkTS_Img(imcol,i,n-1,'EVI').select('EVI_Mean') 
    }).rename('Mean_Gen').toFloat;  
  var Mean_TP = ymx.expression('(img == ymx && PMx - LPh >= 0 && PMx + LPh < n)?IVt:' +
  '(img == ymx && PMx - LPh >= 0 && PMx + LPh > n-1)?IV1:' + 
   '(img == ymx && PMx - LPh < 0 && PMx + LPh < n)?IV2:IVe' 
    ,{img:img,ymx:ymx,PMx:PosMax,LPh:LPh,n:n,IVe:IVe,
  IVt:StkTS_Img(imcol,i-LPh,i+LPh,'EVI').select('EVI_Mean'),
  IV1:StkTS_Img(imcol,i-LPh,n-1,'EVI').select('EVI_Mean'), 
  IV2:StkTS_Img(imcol,0,i+LPh,'EVI').select('EVI_Mean')  
    }).rename('Mean_TP').toFloat;  
  }
    */
  }  
IVTnm = IVTnm.rename('EVI_Tanam').toFloat(); IVPan = IVPan.rename('EVI_Panen').toFloat();
WITnm = WITnm.rename('NDWI_Tanam').toFloat(); BIPan = BIPan.rename('NDBI_Panen').toFloat();
return Stk1.addBands(IVTnm).addBands(WITnm).addBands(IVPan).addBands(BIPan) 
 //.addBands(Mean_Veg).addBands(Mean_Gen).addBands(Mean_TP) 
 ;
}
function DetPadi(Img){ // Kriteria : EVI Min,Max & Range
  var Padi = Img.expression( // Brdsrkan S2_SR : Jabar th 2019
    "(Max >= 0.387 && Min <= 0.182 && Range >= 0.225) ? 1:0"
     ,{ // Non Irigasi
      Min : Img.select('EVI_Min'),Max : Img.select('EVI_Max'),Mean : Img.select('EVI_Mean'),
      Range : Img.select('EVI_Range')
    }
    );
  return Padi.updateMask(Padi).focal_mode().rename('Padi').toByte();
}
function DetPadi1(Img){ // Kriteria : EVI Min,Max & Range
  var Padi = Img.expression( // Brdsrkan S2_SR : Jabar th 2019
    "(Max >= 0.4 && Min <= 0.15 && Range >= 0.36) ? 1:"+ // Irigasi
    "(Max >= 0.375 && Min > 0.15 && Min <= 0.19 && Range >= 0.3) ? 2:0",{ // Non Irigasi
      Min : Img.select('EVI_Min'),Max : Img.select('EVI_Max'),Mean : Img.select('EVI_Mean'),
      Range : Img.select('EVI_Range')
    }
    );
  return Padi.mask(Padi).focal_mode().rename('Padi').toByte();
}
function DetPadi2(Img){// Kriteria : EVI Min,Max,Range & Mean
  var Padi = Img.expression( // Brdsrkan S2_SR : Jabar th 2019
    "(Max >= 0.40 && Min <= 0.15 && Range >= 0.36 && Mean > 0.221) ? 1:"+ // Irigasi
    "(Max >= 0.375 && Min > 0 && Min <= 0.19 && Range >= 0.3 && Mean > 0.22) ? 2:0",{ // Non Irigasi
      Min : Img.select('EVI_Min'),Max : Img.select('EVI_Max'),
      Mean : Img.select('EVI_Mean'),Range : Img.select('EVI_Range')
    }
    );
  return Padi.updateMask(Padi).focal_mode().rename('Padi').toByte();
}
function GetData_PosMax(ListImgs,PosMax,JdPre,JdPost) {
  // Pre PosMax_1 List_Dat2a,b,c.... Post : List_Dat3a
  // ListImgs : Bands NDBI,EVI,NDWI
  var Img1,Img2,Imgs,JumDat,Pd,i,ListDat=[],t1,t2,Iter1,Iter;
  JumDat = JdPre+ JdPost + 1; Iter1 = ListImgs.size().getInfo()/JumDat;
  for (i=0; i < JumDat; i++) {
   Img2 = PosMax.select('Pos_Max');
   Imgs = Img1.expression('(Pmx - d1 >=0 && i <= (Pmx-d1))?Val',{Pmx:Img2,d1:JdPre,
   Val:Img1 = ee.Image(ListImgs.get(i))}); 
   ListDat[i] = Imgs;     
  }
}
function HitIP(Img,TglAwal,TglAkhir) {
  var IP,IP_Kls,dT = ee.Date(TglAkhir).difference(ee.Date(TglAwal),'day').getInfo()/(365.25+60);
  print ('dT = ' + dT); 
 // IP = Img.divide(dT).rename('IP_year').toFloat();
  IP = Img.expression('(d <= dT/2) ? 0.5 : 0.5 + (d/dT-0.5)',{d:Img,dT:dT}).rename('IP_year').toFloat();
  return IP.mask(IP); 
}
function ReKlsIP(Img) {
  var RekImg = Img.expression('(Val <=0.5) ? 1 : (Val > 0.5 && Val <=1 ) ? 2 :' + 
               '(Val > 1 && Val <=1.5 )?3:(Val > 1.5 && Val <=2 )?4:(Val > 2 && Val <=2.5 )?5:' +
               '(Val > 2.5 && Val <=3 )?6:(Val > 3 && Val <=3.5 )?7:8',{Val :Img}).rename('IP_Kls').toByte();
  return RekImg.mask(RekImg) ;
}
function Get_Arr(Arr,s1,s2) {
  if (s1<=0)s1=1;
  return Arr.slice(s1-1,s2+1);
}
function Gab_Arr(Arr1,Arr2) {
  return (Arr1 + ',' + Arr2).split(',');
}
function SetMap(NoLyr,Obj,Vis,KetLyr,LyrOn) {
return Map.layers().set(NoLyr, ui.Map.Layer(Obj, Vis,KetLyr,LyrOn));
}
function Stck2ImgCol(Img,NmBnds,TglAwl,Pd,Konversi) {
  var ImgC=[],Tgls,Tgle,SysIdx,i,JumBnd,Nmb1 = Img.bandNames().getInfo(); 
   JumBnd= Img.bandNames().size().getInfo();
  if (Konversi !==0) Img = Img.subtract(Konversi[0]).divide(Konversi[1]).toFloat();
  for (i=0; i < JumBnd; i++ ) { Tgls = ee.Date(TglAwl).advance(i*Pd,'day');
  Tgle = Tgls.advance(Pd,'day'); SysIdx = NmBnds + "_" + Tgls.format('YYYY-mm-dd');
  ImgC[i]= Img.select(Nmb1[i]) //.set('system:index',SysIdx)
  .set('system:time_start',Tgls.format('YYYY-mm-dd')).set('system:time_end',Tgle.format('YYYY-mm-dd'))
  .rename(NmBnds); }
return ee.ImageCollection(ImgC); }