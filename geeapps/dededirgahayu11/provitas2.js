var Indo_Kec = ui.import && ui.import("Indo_Kec", "table", {
      "id": "users/salmanddd14/shp/Indo10_Kc"
    }) || ee.FeatureCollection("users/salmanddd14/shp/Indo10_Kc"),
    MOD13Q = ui.import && ui.import("MOD13Q", "imageCollection", {
      "id": "MODIS/006/MOD13Q1"
    }) || ee.ImageCollection("MODIS/006/MOD13Q1"),
    BPP_Subang = ui.import && ui.import("BPP_Subang", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            107.65009,
            -6.35211
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.Point([107.65009, -6.35211]),
    Bts_Indo = ui.import && ui.import("Bts_Indo", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                90,
                -11
              ],
              [
                90,
                8
              ],
              [
                142,
                8
              ],
              [
                142,
                -11
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[90, -11],
          [90, 8],
          [142, 8],
          [142, -11]]]),
    Blora_1 = ui.import && ui.import("Blora_1", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            111.3545895,
            -7.00727875
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff0000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ff0000 */ee.Geometry.Point([111.3545895, -7.00727875]),
    MetEVI = ui.import && ui.import("MetEVI", "image", {
      "id": "users/salmanddd14/MODIS/Met_EVI_2021Mar"
    }) || ee.Image("users/salmanddd14/MODIS/Met_EVI_2021Mar"),
    PosMax = ui.import && ui.import("PosMax", "image", {
      "id": "users/salmanddd14/MODIS/PosMax_2021Mar"
    }) || ee.Image("users/salmanddd14/MODIS/PosMax_2021Mar"),
    PrvKls = ui.import && ui.import("PrvKls", "image", {
      "id": "users/salmanddd14/MODIS/Provitas_Kls2021Mar"
    }) || ee.Image("users/salmanddd14/MODIS/Provitas_Kls2021Mar"),
    Prv2021 = ui.import && ui.import("Prv2021", "image", {
      "id": "users/salmanddd14/MODIS/Provitas_2021Mar"
    }) || ee.Image("users/salmanddd14/MODIS/Provitas_2021Mar");
// ESTIMASI PROVITAS PADI UNTUK MENENTUKAN LOKASI POTENSI > 9 Ton/Ha
// Created by Dr Dede Dirgahayu
var Admin = require('users/salmanddd14/AFungsi:AreaName.js');
var Shp_Adm = Admin.Indo10Adm(); 
var Admin_Kec = require('users/dededirgahayu11/Fungsi:DD_NamaKecamatan.js'); 
var GUI = require('users/salmanddd14/AFungsi:GUI_GEE.js');
// Lahan Baku Sawah (LBS)
var LBS = require('users/dededirgahayu11/LBS:LBS_BPN2019.js');
var LBS_Pulau = LBS.LBSPulau(0),LBS_Prv = ee.List(LBS.LBS19());
var Swh_LBS = ee.Image.cat(LBS_Pulau).reduce(ee.Reducer.max()); 
// Filter Waktu ...
var Tgl_S = '2018-09-30', Tgl_E = '2021-03-31', Pd=16, 
MT1_2019 = ['2018-09-30','2019-03-31'],MT2_2019 = ['2019-04-01','2019-09-30'],
MT1_2020 = ['2019-09-30','2020-03-31'],MT2_2020 = ['2020-04-01','2020-09-30']
;
Tgl_S = "2018-09-30"; Tgl_E = "2021-03-31"; Tgl_SE = Tgl_S + ',' + Tgl_E; 
// List Kecamatan
var List_NamProv=Admin.NamProv(1),Prv1,Prv2,Shp_Pilih_Prv,Nama_Prov,
Tgl_SE,Tgl_Panen,KoordT,KoordG
;
// ***** INPUT DATA SATELIT
var Pos_Max,PosMax_Img,Met_EVI,Img_Prv,Potensi_90
;
// Load EVI image.
var TS_EVI = MOD13Q.select('EVI').filterBounds(Bts_Indo)  
    .filterDate(Tgl_S, Tgl_E)
    ; 
// Metric / Komposit Temporal & Reproject jdi 100 m
if (Tgl_E != '2021-03-31') {
Met_EVI = Metric(TS_EVI,'EVI').divide(10000).toFloat().reproject('EPSG:4326',null,100); 
print('Metric EVI 2018-2021',Met_EVI);
PosMax_Img = PosEVIMax(TS_EVI).reproject('EPSG:4326',null,100);
// Mask DATA EVI dg Sawah
Met_EVI = Met_EVI.mask(Swh_LBS); PosMax_Img = PosMax_Img.mask(Swh_LBS);
// Simpan ke Asset utk Aplikasi
Simpan2Ast(Met_EVI.multiply(125).add(128).toByte(),'Met_EVI_2021Mar',100,Bts_Indo,'MODIS');
Simpan2Ast(PosMax_Img,'PosMax_2021Mar',100,Bts_Indo,'MODIS');
// Potensi Provitas >= 90 Kw/Ha
Img_Prv = YieldPadi(Met_EVI.select('EVI_Max')).focal_median().toFloat(); // Filter Median haluskan batas obyek, tpi yg max bisa hilang, jk 1 pixel
print('Img Provitas Kw/Ha',Img_Prv);
Simpan2Ast(Img_Prv.multiply(100).rename('Kw_Ha').toUint16(),'Provitas',100,Bts_Indo,'MODIS');
Potensi_90 = Img_Prv.expression("(Val >=30 && Val <= 60) ? 1 : (Val > 60 && Val <= 70) ? 2 :" + 
"(Val > 70 && Val <= 80)? 3: (Val > 80 && Val <= 90) ? 4 :(Val > 90 && Val <= 95)? 5: " +
"(Val > 95 )? 6:0",{Val : Img_Prv }).rename('Provitas_Kls').toByte().focal_mode(); // Filter Spasial Mayority
Potensi_90 = Potensi_90.mask(Potensi_90);
Simpan2Ast(Potensi_90.select('Provitas_Kls'),'Provitas_Kls',100,Bts_Indo,'MODIS');
}
else {Met_EVI = (MetEVI.subtract(128)).divide(125).toFloat();
PosMax_Img = PosMax ; Img_Prv = Prv2021.divide(100).rename('Kw/Ha').toFloat() ; 
Potensi_90 = PrvKls 
;
}
// Tambah band Lonlat utk otomatisai
Potensi_90=Potensi_90.addBands(ee.Image.pixelLonLat().toFloat());
// Parameter visual Image (RGB,pallete),Table shp (color) ... 
var PaletIV = ['0000ff','00ffff','00bbbb','ffaa00','ff0000',
'ff00ff','ffff44','bbbb00','88ff00','00ff00','00dd00','008800'],
PaletPot = ['ff9900','ff00ff','00dddd', 'ffff00','00ff00','00bb00'],
Leg_Prv = ['30-60','60-70','70-80','80-90','90-95',' > 95'],
Leg_Pot = GUI.Legenda('Provitas Padi','Kw/Ha',Leg_Prv,PaletPot)
;
var Vis_EVIMax = VisPar(0.35,0.847,'EVI_Max',PaletIV),
Vis_Pot = VisPar(1,6,'Provitas_Kls',PaletPot) 
;
// Polygon Kecamatan dijadikan Img dg nilai Kec_Id
var ImgKec=Indo_Kec.reduceToImage(['KEC_ID'], 'mean').rename('KEC_ID').toUint16();
// Konversi Polygon Admin menjadi OutLine aj
var Adm_Line = BtsAdimLine([1,2,3]);
// Membuat List All Kecamatan & disimpan jadi Array
//var List_Kec = (GetRecPro_Feat(Indo_Kec.sort('KEC_ID'),['KEC_ID','NAMA_PROV'],0));
// Test Lokasi Blora_1 
var KC_ID,NamKec,Tgl_Tanam,List_Kec = Admin_Kec.GetNamKec();
var k=0,JTtk,Point_Gab=[],Lok_Gab=[],Prv1_Gab=[],Prv2_Gab=[],Koord_Gab=[];
Ekstrak_Info(Blora_1,173,100); 
print('Nama Kecamatan =  ',NamKec); 
print('Koordinat : ' + KoordT);
print('Provitas (Kw/Ha) = ' + Prv1.toFixed(2)
,'Aktual (Kw/Ha) = ' + Prv2.toFixed(2)
,'Tgl Tanam = ' + Tgl_Tanam
,'Tgl Panen = ' + Tgl_Panen);
Map.centerObject(Blora_1,13);
Map.addLayer(Potensi_90,Vis_Pot,'Potensi Provitas');
Map.addLayer(Adm_Line,{min:1,max:3,palette:['black','aa00aa','red']},'Batas Admin');
Map.addLayer(Blora_1.buffer(173),{color:'cyan'},'Buffer 12 Ha',1,0.6);
//Map.addLayer(Blora_1,{color:'red'},'Lokasi_1');
Map.add(Leg_Pot);
// UI utk Aplikasi
var inspector = ui.Panel();
inspector.style().set({
  width: '275px',height: '300px',
  position: 'top-right'
});
var Judul = ui.Label('ESTIMASI PROVITAS PADI MENGGUNAKAN DATA SATELIT');
Judul.style().set({fontSize: 14 + 'px', color: '00aa00',textAlign:'center',fontWeight: 'bold', 
 });
var Author = ui.Label('by Dr Dede Dirgahayu, Pusfatja, LAPAN');
Author.style().set({fontSize: 12 + 'px', color: 'blue',textAlign:'',fontWeight: 'bold', 
margin: '-4px 0px 0px 30px',
});
//print(Judul);
var Lbl_TglSE = ui.Label("Start,End Date");
Lbl_TglSE = Style(Lbl_TglSE,12,'ff0000','dddddd','10px 0 0 10px','bold',80,'left',0,0);
var TB_TglSE = ui.Textbox({value : Tgl_SE});
TB_TglSE = Style(TB_TglSE,10,'ff0000','00dddd','-20px 0 0 100px','bold',158,'left',0,0);
//print(Lbl_TglSE,TB_TglSE);
var Simpan_Point = ui.Button('Simpan Lokasi');
Simpan_Point = Style(Simpan_Point,12,'ff0000','00dddd','-36px 0 0 120px','bold',100,'left',0,0);
var Lbl_Lokasi = ui.Label('Lokasi 1' + ' : ' + KoordT),
Lbl_NamKec = ui.Label('Kecamatan : ' + NamKec),
Lbl_Prv1 = ui.Label('Potensi Provitas (Kw/Ha) : ' + Prv1.toFixed(2))
;
// Pilihan shp/Tabel Nama Provinsi 
var Pilih_Prov = ui.Select({
  style : {position: 'top-left', fontSize: 12 + 'px', color: '0000ff',
 fontWeight: 'bold', //200,
 },
  //items: Object.keys(Pilih_Prv),
  // Object, jika pilihan berbentuk type : Pilih = { Landat : 1, S2 : 2,..}
  items : List_NamProv,
  placeholder: 'Pilih Provinsi'
  });
var Update = ui.Button('Update');
Update = Style(Update,12,'00dd00','00dddd','-28px 0 0 180px','bold',60,'left',0,0);
var Lbl_Prv2 = ui.Label("Aktual Provitas : ");
var TB_Prv2 = ui.Textbox({ value: Prv2.toFixed(2),});
TB_Prv2 = Style(TB_Prv2,12,'ff0000','00dddd','-28px 0 0 120px','bold',54,'left',0,0);
var Lbl_TglPanen = ui.Label("Tgl Panen Aktual : ");
var TB_TglPanen = ui.Textbox({value: Tgl_Panen}); 
TB_TglPanen = Style(TB_TglPanen,12,'ff0000','00dddd','-28px 0 0 120px','bold',90,'left',0,0);
// Event Menu
TB_TglSE.onChange(
  function () {
  Tgl_SE = TB_TglSE.getValue(); 
  Tgl_S = Tgl_SE.split(',')[0]; Tgl_E = Tgl_SE.split(',')[1];
 } );
TB_TglPanen.onChange(
  function () {
  Tgl_Panen = TB_TglPanen.getValue(); 
 } );
TB_Prv2.onChange( 
  function () {
  Prv2 = TB_Prv2.getValue(); 
 } );
Update.onClick(
  function() {
  Prv2 = parseFloat(TB_Prv2.getValue());
  Tgl_Panen = TB_TglPanen.getValue();
  }
  ); 
Simpan_Point.onClick(
  function() {
  var i,Header,Koordinat_yx,Kecamatan,Pro1,Pro2; 
  Header = [ 
    {label: 'Kecamatan', role: 'domain', type: 'string'},
    {label: 'Koordinat_yx', role: 'annotation', type: 'string'},
    {label: 'Potensi', role: 'data', type: 'number'},
    {label: 'Aktual', role: 'data', type: 'number'},
    ]; 
  if (k > 0)JTtk=k+1;  
  var dataTable = [ ];
  print ('Provitas',Prv1_Gab,Prv2_Gab,'Kecamatan',Lok_Gab,'Koord',Koord_Gab);
  for (i=1; i <= JTtk ; i++) {
  Kecamatan = Lok_Gab[i-1]; Koordinat_yx = Koord_Gab[i-1]; 
  Pro1 = Prv1_Gab[i-1]; Pro2=Prv2_Gab[i-1];
  dataTable[i]= [Kecamatan,Koordinat_yx,Pro1,Pro2];
  }
 dataTable[0]= Header;
 var Tabel = ui.Chart(dataTable).setChartType('ColumnChart').setOptions({
  title: 'Potensi Produktivitas di Provinsi ' + Nama_Prov,
  legend: {position: 'right'},
  hAxis: {title: 'Lokasi Kecamatan', titleTextStyle: {italic: false, bold: true}},
  vAxis: {title: 'Provitas (Kw/Ha)', titleTextStyle: {italic: false, bold: true}},
  colors: ['00aa00','00ff00']
});
inspector.widgets().set(14,Tabel)  }
  );
inspector.widgets().set(0,Judul).set(1,Author).set(2,Lbl_TglSE).set(3,TB_TglSE)
.set(4,Pilih_Prov).set(5,Simpan_Point)
.set(6, Lbl_Lokasi).set(7, Lbl_NamKec)
.set(8, Lbl_Prv1).set(9, Lbl_Prv2).set(10, TB_Prv2)
.set(11,Update).set(12,Lbl_TglPanen).set(13,TB_TglPanen);
ui.root.add(inspector);
Pilih_Prov.set('value','Jawa_Tengah');
// Configure the map.
Map.style().set('cursor', 'crosshair');
Pilih_Prov.onChange(
   function (key) {
var Cek = parseInt(key, 9); // Kode : 1476,1477
var Idx,Pil = Pilih_Prov.getValue(); 
Idx = GetIdxArr(List_NamProv,Pil);
Shp_Pilih_Prv = Shp_Adm[0].filter(ee.Filter.eq('NAMA_PROV',List_NamProv[Idx]));
Nama_Prov = List_NamProv[Idx]; 
Map.centerObject(Shp_Pilih_Prv,10); 
k=0; Jttk =0; // Provinsi berubah,simpan titik dg nama baru 
}
);
Map.onClick(function(coords) {
  // Show the loading label.
inspector.widgets().set(8, ui.Label({value: 'Computing....'}));
var point = ee.Geometry.Point(coords.lon, coords.lat);
Ekstrak_Info(point,173,100); print(NamKec);
 KoordT = coords.lon.toFixed(6) + "," + coords.lat.toFixed(6);
 KoordG = coords.lat.toFixed(6) + "," + coords.lon.toFixed(6);  
 inspector.widgets().set(6, ui.Label({
      value: 'Lokasi ' + (k+1) + ' : ' + KoordT,
    }));
 var Buf = point.buffer(173); Koord_Gab[k]=KoordG; 
 Map.layers().set(2, ui.Map.Layer(Buf, {color: 'cyan'},'Buffer 12 Ha'));
 Map.layers().set(3, ui.Map.Layer(point, {color: 'FF8800'},'Point Lokasi ke-' + (k+1)));
Lok_Gab[k]=NamKec; Prv1_Gab[k]=Prv1; Prv2_Gab[k]=Prv2;
  TB_Prv2.set('value',Prv2.toFixed(2)); TB_TglPanen.set('value',Tgl_Panen);
  var Point_Feat = ee.Feature(point,{'Lokasi' : NamKec,'Koordinat':KoordT,
  'Provitas Potensi':Prv1,'Provitas Aktual':Prv2,'Waktu Panen':Tgl_Panen});
 // Point_Feat.set('Provitas Aktual',TB_Prv2.getValue());
  Point_Gab[k]= Point_Feat;
  // Request the value from the server.
//  computedValue.evaluate(function(result) {
    // When the server returns the value, show it.
     inspector.widgets().set(7, ui.Label({
      value: 'Kecamatan : ' + NamKec,
    }));
    inspector.widgets().set(8, ui.Label({
      //value: 'Mean EVI : ' + result.toFixed(3),
      value: 'Potensi Provitas (Kw/Ha) : ' + Prv1.toFixed(2),
      }));
 k += 1; 
 // Tampilkan Titik2 yg sdh terpilih
  Map.layers().set(4, ui.Map.Layer(ee.FeatureCollection(Point_Gab), {color: 'FF0000'},'Point Lokasi terpilih'));
  });
// ************ FUNGSI2
// Created by Dr Dede Dirgahayu 
function Ekstrak_Info(Point,Radius,Sc) {
KC_ID = StkImgGeom(ImgKec,'KEC_ID',Point,Sc,0)[0];
Prv1 = StkImgGeom(Img_Prv,'Kw/Ha',Point.buffer(Radius),Sc,0)[0]; Prv2= Prv1/1.11;
Pos_Max = Math.round(StkImgGeom(PosMax_Img,'PosMax',Point,Sc,0)[0]);
Tgl_Tanam = TglTnmPan(Tgl_S,Pos_Max,Pd)[0];
Tgl_Panen = TglTnmPan(Tgl_S,Pos_Max,Pd)[1];
var Koord = Point.coordinates().getInfo();
KoordT = Koord[0].toFixed(6) + "," + Koord[1].toFixed(6); 
KoordG = Koord[1].toFixed(6) + "," + Koord[0].toFixed(6);
NamKec = List_Kec[KC_ID-1]; if (NamKec==="")NamKec='Kecamatan X';
return 1;}
function GetIdxArr(Arr,Val) {
  return Arr.indexOf(Val); 
}
function Style(UI,Siz,WarFg,WarBg,Margin,Tebal,
              Max,Align,Pad,Bord) { // Lengkap
  UI.style().set({
 // position: Pos,
  fontSize: Siz + 'px',
  color: '#' + WarFg,
  backgroundColor: '#' + WarBg,
  fontWeight: Tebal, // 700, 'bold'
  margin: Margin, //'30px 10px 10px 10px', y1  x  y  x1'
  //minHeight: MinMax [0]+'px', //'60px',
  maxWidth:Max +'px',// '200px',
  textAlign:Align, // 'center', 'left'
  padding: Pad + 'px', //'10px'
  //border: Bord // '2px dashed #00aa33',
});
if (Bord > 0) UI.style().set({border: 'dashed #00aa33' });
return UI; 
    }
function List_ProFeat(Feat,Pro,Opsi) { // Hasilnya Urutan berdasrkan Abjad
var List1 = ee.Dictionary(Feat.reduceColumns(ee.Reducer.frequencyHistogram(), [Pro])
                            .get('histogram')).keys();
if (Opsi > 0)List1=List1.getInfo();
return List1;  
  }
function List_IndoKec(Pilih,Opsi) {
var Pro; if (Pilih==1) Pro = 'KEC_COD';
if (Pilih==2) Pro = 'KECAMATAN';
if (Pilih==3) Pro = 'KAB_KOD';
if (Pilih==4) Pro = 'KABKOT';
if (Pilih==5) Pro = 'PRV_ID';
if (Pilih==6) Pro = 'NAMA_PROV';
return List_ProFeat(Indo_Kec.sort('KEC_COD'),Pro,Opsi);
  }  
function PosEVIMax(ImgCol) { // Created by Dr Dede Dirgahayu
// Deteksi Posisi data saat terjadi EVI Max, sekaligus eleminasi awan dg smoothing median 3
var i, JumList = ImgCol.size().getInfo(),Max,Min,PosMax,PosMin,
Img1,Tgl1,Tgl2,List_Imgs = ImgCol.toList(JumList);
Max = ImgCol.min();  PosMax = ee.Image(1).toByte(); 
Tgl1 = ee.Image(List_Imgs.get(0)).get('system:time_start');
Tgl2 = ee.Image(List_Imgs.get(0)).get('system:time_end');
 for (i=0; i < JumList; i++ ) {
 Img1 = ee.Image(List_Imgs.get(i));
 Max = Img1.expression('(d > Max)? d : Max',
 {d:Img1,i:i,Max:Max,PMx:PosMax}); 
PosMax=Img1.expression('(d == Max)? i+1 : PMx',
 {d:Img1,i:i,Max:Max,PMx:PosMax}).rename('PosMax').toByte(); 
}
return PosMax;
}
function TglTnmPan(Tgl_AwalT,Pos_Max,Pd) {// Created by Dr Dede Dirgahayu
 // Tgl Tanam & Panen padi dari urutan data saat capai EVI max
// Pd : periode harian = 5,7,8,10,15,16
 var t1,t2; t1 = Pos_Max - Math.round(64/Pd); t2 = Pos_Max + Math.round(56/Pd);
 var Tgl_Tnm = ee.Date(Tgl_AwalT).advance(t1*Pd,'day').format('YYYY-MM-dd').getInfo();
 var Tgl_Pan = ee.Date(Tgl_AwalT).advance(t2*Pd,'day').format('YYYY-MM-dd').getInfo();
 return [Tgl_Tnm,Tgl_Pan];
} 
function Poly2Img(fc,ValIsi,ValOutLn,TebalOutLn,TyDt) {
  var Img =  ee.Image()
  .paint(fc, ValIsi) // Get color from property named 'ValIsi'
  .paint(fc, ValOutLn, TebalOutLn) // Outline using value/color ValOutLn, width TebalOutLn.
  ;
if (TyDt == 1) Img = Img.toUint16(); else Img = Img.toByte(); 
return Img; }
function Poly2Img2(fc,ValOutLn,TebalOutLn,TyDt) {
  var Img =  ee.Image()
//  .paint(fc, ValIsi) // Get color from property named 'ValIsi'
  .paint(fc, ValOutLn, TebalOutLn) // Outline using value/color ValOutLn, width TebalOutLn.
  ;
if (TyDt == 1) Img = Img.toUint16(); else Img = Img.toByte(); 
return Img; 
  }
function BtsAdimLine(Val) {// Outline gabungan Bts Admin Prov & Kab
return ee.ImageCollection([Poly2Img2(Indo_Kec, Val[0], 1,0),Poly2Img2(Shp_Adm[1], Val[1], 2,0),Poly2Img2(Shp_Adm[0], Val[2], 3,0)]).max();
}
function GetMinMaxVal(List,Idx) {
  var i,Min,Max,JumLst = ee.List(List).length().getInfo();
Min = List[JumLst-1][Idx]; Max = List[0][Idx];
for(i=0; i < JumLst; i++ ) {  
  if(List[i][Idx] < Min) Min = List[i][Idx];
  if(List[i][Idx] > Max) Max = List[i][Idx];
  }
  return [Min,Max];
}  
function Metric(ImgCol,NamBnd) {
  var JumLst = ImgCol.size().getInfo(),ListImgs = ImgCol.toList(JumLst);  
  var Tgl_s = ee.Date(ee.Image(ListImgs.get(0)).get('system:time_start')).format('YYYY-MM-dd');
  var Tgl_e = ee.Date(ee.Image(ListImgs.get(JumLst-1)).get('system:time_end')).format('YYYY-MM-dd');
  return ee.Image.cat(
    ImgCol.mean().rename(NamBnd+ '_Mean'),
    ImgCol.max().rename(NamBnd+ '_Max'),
    ImgCol.min().rename(NamBnd+ '_Min'),
    ImgCol.median().rename(NamBnd+ '_Med'))
    .set('system:time_start',Tgl_s).set('system:time_end',Tgl_e)
    ;
}
function VisPar(Mins,Maxs,Bnds,Palet) {
  if (Palet !=="") return {min:Mins,max:Maxs,bands:Bnds,palette:Palet };
}
function StkImgGeom(img,NamBnd,Geom,Sc) {
  // Get Mean Std
var meanReducer = ee.Reducer.mean();
var sigmaReducer = ee.Reducer.stdDev();
var mean = img.reduceRegion(meanReducer, Geom, Sc).get(NamBnd).getInfo();
var sigma = img.reduceRegion(sigmaReducer, Geom, Sc).get(NamBnd).getInfo();
if (mean === 0) return [0,0]; else return [mean,sigma];
}
function Provitas_Padi(EVIMax_Val) {
  if(EVIMax_Val===0) return 0;
  else return Math.log((EVIMax_Val/0.103))*(38.46154*1.11);
}
function YieldPadi(EVIMax) {
  return (EVIMax.divide(0.103)).log().multiply(38.46154*1.11).rename('Kw/Ha');
}
function Simpan2Ast(ImgIn,ImgOut,Sc,BtsGeom,Fld){
  Export.image.toAsset({
  image:ImgIn,
  description: 'Task_' + ImgOut,
  assetId: Fld + "/" + ImgOut,
  scale: Sc,
//  folder : Fld,
  maxPixels: 1e13,
  region: BtsGeom
 });
}