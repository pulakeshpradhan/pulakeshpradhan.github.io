var S2_TOA = ui.import && ui.import("S2_TOA", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    S2_SR = ui.import && ui.import("S2_SR", "imageCollection", {
      "id": "COPERNICUS/S2_SR"
    }) || ee.ImageCollection("COPERNICUS/S2_SR"),
    Sawit_Riau = ui.import && ui.import("Sawit_Riau", "image", {
      "id": "users/salmanddd14/sawit_riau"
    }) || ee.Image("users/salmanddd14/sawit_riau"),
    L8_SR = ui.import && ui.import("L8_SR", "imageCollection", {
      "id": "LANDSAT/LC08/C01/T1_SR"
    }) || ee.ImageCollection("LANDSAT/LC08/C01/T1_SR"),
    Riau_Prv = ui.import && ui.import("Riau_Prv", "table", {
      "id": "users/salmanddd14/Prv_Riau"
    }) || ee.FeatureCollection("users/salmanddd14/Prv_Riau"),
    Sawit_Kal = ui.import && ui.import("Sawit_Kal", "image", {
      "id": "users/pusfatjapangan19/LBSawit/Sawit_Kal"
    }) || ee.Image("users/pusfatjapangan19/LBSawit/Sawit_Kal"),
    Sawit_Sum = ui.import && ui.import("Sawit_Sum", "image", {
      "id": "users/pusfatjapangan19/LBSawit/Sawit_sum"
    }) || ee.Image("users/pusfatjapangan19/LBSawit/Sawit_sum"),
    Sawit_Sul = ui.import && ui.import("Sawit_Sul", "image", {
      "id": "users/pusfatjapangan19/LBSawit/sawit_Sul"
    }) || ee.Image("users/pusfatjapangan19/LBSawit/sawit_Sul"),
    Shp_Sawit_Sul = ui.import && ui.import("Shp_Sawit_Sul", "table", {
      "id": "users/pusfatjapangan19/shp/sawit/Sawit_Sul_Geo"
    }) || ee.FeatureCollection("users/pusfatjapangan19/shp/sawit/Sawit_Sul_Geo"),
    Bts_Riau = ui.import && ui.import("Bts_Riau", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                99.96461345479266,
                2.6003616329713153
              ],
              [
                99.96461345479266,
                -1.1010700088901615
              ],
              [
                103.94166423604266,
                -1.1010700088901615
              ],
              [
                103.94166423604266,
                2.6003616329713153
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
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[99.96461345479266, 2.6003616329713153],
          [99.96461345479266, -1.1010700088901615],
          [103.94166423604266, -1.1010700088901615],
          [103.94166423604266, 2.6003616329713153]]], null, false),
    Bts_SumSel = ui.import && ui.import("Bts_SumSel", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                102.05331888483516,
                -1.575397106436737
              ],
              [
                102.05331888483516,
                -4.953203489177774
              ],
              [
                106.12924661921016,
                -4.953203489177774
              ],
              [
                106.12924661921016,
                -1.575397106436737
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
      "color": "#1df9ef",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #1df9ef */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[102.05331888483516, -1.575397106436737],
          [102.05331888483516, -4.953203489177774],
          [106.12924661921016, -4.953203489177774],
          [106.12924661921016, -1.575397106436737]]], null, false),
    Sumsel_prv = ui.import && ui.import("Sumsel_prv", "table", {
      "id": "users/ibrahandi/Prov_Sumsel"
    }) || ee.FeatureCollection("users/ibrahandi/Prov_Sumsel"),
    Sawit_sumsel = ui.import && ui.import("Sawit_sumsel", "table", {
      "id": "users/ibrahandi/Sawit_Sumsel"
    }) || ee.FeatureCollection("users/ibrahandi/Sawit_Sumsel");
//
var Waktu = require('users/salmanddd14/AFungsi_1:Waktu.js');
var GUI = require('users/salmanddd14/AFungsi_1:GUI_GEE.js');
var Citra = require('users/salmanddd14/AFungsi_1:OlhCitra.js');
// IMPLEMENTASI MODEL UMUR SAWIT 
// Created by Dr Dede Dirgahayu M.Si Mar 15, 18:10
// Modifikasi Tgl 30 Agustus 2020
var Th_2019 = [['2019-01-01', '2019-12-31'],['2018-12-01', '2019-04-30'],
['2019-05-01', '2019-08-31'],['2019-09-01', '2019-12-31']
];
var Th_2020 = [['2020-01-01', '2020-12-31'],['2020-01-01', '2020-06-30'],
['2020-05-01', '2020-08-31'],['2020-09-01', '2020-12-31']
];
var S2_2019=[],S2_2020=[];
var PilBnd_L8 = ['B.*','NDBI','EVI','NDVI','NDWI'],PilBnd_S2 = ['B.*','NDBI','EVI','NDVI','NDWI','SCL'];
S2_2019[0] = S2_SR
    .filterDate(Th_2019[0][0],Th_2019[0][1])  
//  .filterBounds(Prv_SumSel)
//    .map(Citra.MskAwan_S2k)
//    .map(Citra.AddIdx_S2)
    .map(MskAwan_S2k)
    .map(addBands_S2)
    ;
S2_2019[1] = S2_SR  // Jan_Apr
    .filterDate(Th_2019[1][0],Th_2019[1][1])  
//  .filterBounds(Prv_SumSel)
 .map(MskAwan_S2k).map(addBands_S2)
    ;
S2_2019[2]  = S2_SR
    .filterDate(Th_2019[2][0],Th_2019[2][1])  
//  .filterBounds(Prv_SumSel)
   .map(MskAwan_S2k).map(addBands_S2)
    ;
S2_2019[3]  = S2_SR
    .filterDate(Th_2019[3][0],Th_2019[3][1])  
//  .filterBounds(Prv_SumSel)
   .map(MskAwan_S2k).map(addBands_S2)
    ;
S2_2020[0] = S2_SR
    .filterDate(Th_2020[0][0],Th_2020[0][1])  
//  .filterBounds(Prv_SumSel)
     .map(MskAwan_S2k).map(addBands_S2)
    ;
S2_2020[1] = S2_SR
    .filterDate(Th_2020[1][0],Th_2020[1][1])  
//  .filterBounds(Prv_SumSel)
    .map(MskAwan_S2k).map(addBands_S2)
    ;
S2_2020[2] = S2_SR
    .filterDate(Th_2020[2][0],Th_2020[2][1])  
//  .filterBounds(Prv_SumSel)
   .map(MskAwan_S2k).map(addBands_S2)
    ;
S2_2020[3] = S2_SR
    .filterDate(Th_2020[3][0],Th_2020[3][1])  
//  .filterBounds(Prv_SumSel)
   .map(MskAwan_S2k).map(addBands_S2)
    ;
var L8_2019 = L8_SR
    .filterDate(Th_2019[0][0],Th_2019[0][1]) 
//  .filterBounds(Prv_SumSel)
    .map(Citra.MskAwan_L8)
    .map(Citra.AddIdx_L8)
    ; 
var k,Img,Bts_Prv = [Bts_Riau,Bts_SumSel],NamSim=['EVIL8_Riau','EVIL8_SumSel'] ;
var Komp_S2_2019 = S2_2019[0].qualityMosaic('NDVI'),Komp_L8_2019 = L8_2019.qualityMosaic('NDVI');
var EVIMaxS2_2019 = (Komp_S2_2019.select('EVI').multiply(125)).add(128).toByte().rename('EVI_Max'),
EVIMaxL8_2019 = (Komp_L8_2019.select('EVI').multiply(125)).add(128).toByte().rename('EVI_Max');
var EVIS2_2019_Sawit_Sum = EVIMaxS2_2019.updateMask(Sawit_Sum),EVIL8_2019_Sawit_Sum = EVIMaxL8_2019.updateMask(Sawit_Sum),
EVIS2_2019_Sawit_Kal = EVIMaxS2_2019.updateMask(Sawit_Kal),EVIL8_2019_Sawit_Kal = EVIMaxL8_2019.updateMask(Sawit_Kal),
EVIS2_2019_Sawit_Sul = EVIMaxS2_2019.updateMask(Sawit_Sul),EVIL8_2019_Sawit_Sul = EVIMaxL8_2019.updateMask(Sawit_Sul);
// Simpan ke Asset
for(k=0;k <2; k++) {
  Img = EVIL8_2019_Sawit_Sum; 
Export.image.toAsset({ 
  image: Img, 
  description: NamSim[k], 
//  folder : '01_Citra',
  assetId: NamSim[k],
  scale: 30, 
  maxPixels: 1e13,
  region: Bts_Prv[k]});
}
// Parameter Model / Koef Regresi umur Sawit Riau : NDVI = b0 +b1*t + b2*t^2
var i,j,k,b0,b1,b2,boV,b1V,b2V,boG,b1G,b2G,X_Max,b,Y_Max,VI_V=[],X,Th1,Th2,Koe=[],a,c1,c,Sat,
VI_G=[],b_V=[],b_G=[],X_Max_V,Y_Max_V,X_Max_G,Y_Max_G,dIV,IV1,IV2,Txt,X1,X2,Tgl1=[],Tgl2=[];
// Membuat Stack / Koleksi NDVI Sentinel-2
var NDVITS_S2 = [], NDVITS_S2_Kol=[];
for (k=1; k < 5; k++) {
  if( k < 4)
  NDVITS_S2_Kol[k-1] = S2_2019[k].select('NDVI').map(AddTime)
  .median()
  .set("system:time_start",ee.Date(Th_2019[k][0]))
  .set("system:time_end",ee.Date(Th_2019[k][1]))
  ;
else NDVITS_S2_Kol[k-1] = S2_2020[k-4].select('NDVI').map(AddTime)
  .median()
  .set("system:time_start",ee.Date(Th_2020[k-4][0]))
  .set("system:time_end",ee.Date(Th_2020[k-4][1])) // baru diganti jadi 2, tgl 30 agustus
  ;
}
print('List Data S2 hingga 10 Juli 2020',S2_2020[2].filterBounds(Bts_Prv[0]).limit(5000) );
NDVITS_S2_Kol = StackImgCol(NDVITS_S2_Kol);
var Trend_S2 = LineFit(NDVITS_S2_Kol,'NDVI');
print('Trend S2 :',Trend_S2);
print('Time Series NDVI S2 4 bulanan Th 2019-Jun 2020',NDVITS_S2_Kol);
print('Trend S2 :',Trend_S2);
var NDVIS2_Trend_Jun2020 = (GetImgCol(NDVITS_S2_Kol,3,'NDVI')).median()
.addBands(Trend_S2);
print('Data ke-4 S2 Juni 2020 & Trend', NDVIS2_Trend_Jun2020);
var Komp_S2_2019_Med = Pilih_S2k(Th_2019[0],'Med',PilBnd_S2,'');
//b0 = 0.839; b1 = 0.0055397; b2 = -0.000171;
Sat = 'S2' ;
var Koef_Gabung = [
    [0.8203, 0.0306, -0.0011], // LS8 PTPN
    [-0.0011, 0.0306, 0.5759], // S2 NDVI a , b, c
    [-0.0009, 0.0263, 0.3523], // EVI
    [-0.0009, 0.0255, 0.325], // SAVI
    [0.0019, 0.059, 1.0192], // MSI
    [-17.311, 0.4579, -0.0222], // S1 HV Tanjung Balai
                ]; 
if (Sat == 'L8') { // Landsat 8 SR
b0 = 0.8393; b1 = 0.0055; b2 = -0.0002; }
if (Sat == 'S2') { // Sentinel 2 SR
b0 = 0.5759 ; b1 = 0.0306; b2 = -0.0011 ; } // NDVI
if (Sat == 'S1') { // Sentinel 1
b0 = 0.8393; b1 = 0.0055; b2 = -0.0002; }
// Parameter opsi a,b,c Per garis Kuadratik -> y = a*x^2 + b*x + c
b=b1; a=b2; c = b0;  
Koe = ([c,b,a]); 
b_V = ([0.848,0.00360,-0.000079]); // Dipisah Fase Vegetatif / trend naik. Plot berdasrkan Model
b_G = ([ 0.814,0.00842,-0.000244]);// Fase Generatif
print('Test Persamaan Rgresi Kuadratik Umur Sawit NDVI S2');
print('Y = a*x^2 + b*x + c');print('a = ' + a + '; b = ' + b + '; c = ' + c );
X_Max = -b/(2*a) ; Y_Max = YReg(Koe,X_Max);
print ('X,Y max : ' , X_Max.toFixed(1) + ';' + Y_Max.toFixed(3));
print ('Umur ,X, NDVI, dIV');
for (i=1; i <= 30; i++) {
 IV1 = YReg(Koe,i-1);  IV2 = YReg(Koe,i); dIV = IV2-IV1;
 var Par = ParReg(Koe,IV2); X1=Par[3];X2=Par[4];
  if(dIV >= 0) X=X1; else X=X2;
   Txt = (i) + ',' + Math.round(X) + ',' + IV2.toFixed(3) + ',' + dIV.toFixed(3); print(Txt) ;}
// Pilih Th yg mau diproses
Th1 = 2017 ; Th2 =2019; Tgl1[0] = Th1 + '-01-01'; Tgl1[1] = Th1 + '-12-31'; 
Tgl2[0] = Th2 + '-01-01'; Tgl2[1] = Th2 + '-12-31'; 
var Tgl_Range1 = [Tgl1[0],Tgl1[1]],Tgl_Range2 = [Tgl2[0],Tgl2[1]];
var L8_Th1 = ee.Image(Pilih_L8(Tgl_Range1,'Med',PilBnd_L8,'')),
    L8_Th2 = ee.Image(Pilih_L8(Tgl_Range2,'Med',PilBnd_L8,'')) ;
var L8_NDVI_Gab = ee.Image.cat(
  L8_Th1.select('NDVI').rename('NDVI_' + Th1),
  L8_Th2.select('NDVI').rename('NDVI_' + Th2),
  L8_Th2.select('NDVI').subtract(L8_Th1.select('NDVI')).rename('dIV_' + Th2)
  );
var NamaIV1 =  'NDVI_' + Th1,NamaIV2 =  'NDVI_' + Th2,Nam_dIV = 'dIV_' + Th2;
//var c1 = ((L8_NDVI_Gab.select(NamaIV2).subtract(b0)).multiply(-4*a).rename('c1')).toFloat();
// Estimasi Umur Sawit
var Umur_Sawit2019 = Umur_Sawit_Trend(NDVIS2_Trend_Jun2020,'NDVI',Koe);
//var Umur_Sawit2019 = Umur_Sawit(L8_NDVI_Gab,NamaIV1,NamaIV2,Koe);
var Interval = Th2-Th1+1,Umur19_Kls = Reklas(Umur_Sawit2019,Interval);
c1 ='' ; // Kosongkan memory
// FUNGSI ESTIMASI UMUR BERDASRKAN MODEL KUADRATIK
function Umur_Sawit(Img,NmIV1,NmIV2,Koef) {
  c1 = ((L8_NDVI_Gab.select(NamaIV2).subtract(b0)).multiply(-4*a).rename('c1')).toFloat();
  var Umur = Img.expression(
    "(dIV >= 0) ? xm+(b**2-c)**(0.5)/(2*a) :xm-(b**2-c)**(0.5)/(2*a)",
    {dIV : Img.select(Nam_dIV),xm:X_Max,a:a,b:b,
    c:c1.select('c1')}
    );
    Umur = Umur.expression("(Umur > 30) ? 30 :(Umur <= 0) ? 1 : Umur",
    {Umur : Umur});
    return Umur.round().rename('Umur_Th').toByte().focal_mode();
}
function Umur_Sawit_Trend(Img,NmIV,Koef) {
  c1 = ((Img.select(NmIV).subtract(b0)).multiply(-4*a).rename('c1')).toFloat();
  var Umur = Img.expression(
    "(dIV >= 0) ? xm+(b**2-c)**(0.5)/(2*a) :xm-(b**2-c)**(0.5)/(2*a)",
    {dIV : Img.select('Trend'),xm:X_Max,a:a,b:b,
    c:c1.select('c1')}
    );
    Umur = Umur.expression("(Umur > 30) ? 30 :(Umur <= 0) ? 1 : Umur",
    {Umur : Umur});
    return Umur.round().rename('Umur_Th').toByte().focal_mode();
}
// Parameter utk Display citra
var vis = {bands : 'EVI',min: 0, max: 1, palette: [
  'FFFFFF', 'CE7E45', 'FCD163', '66A000', '207401',
  '056201', '004C00', '023B01', '012E01', '011301'
]};
var viskls = {min: 1, max: 10, palette: [
'8bff00','71ce00','31a905','085cce','2a9edc', 
'6f24dc','cc19dc','dc1346','ff8e23','fff321'
]};
var VisUmr3 = {bands : 'Umur_Th',min: 1, max: 27, palette: [
  'eeeeee','eeeeee','eeeeee','66FFFF','66FFFF','66FFFF', '00cccc','00cccc','00cccc',
  '008800','008800','008800', 'cccc00','cccc00','cccc00','66ff00','66ff00','66ff00',
  '00dd00','00dd00','00dd00', '008800','008800','008800', 'FFdd00','FFdd00','FFdd00',
  'aa8844','aa8845','aa8846', 'FFFF54','FFFF55','FFFF56','FFFFaa','FFFFab','FFFFac'
]};
var vis_RGBNCC_LS8 = {bands : ['B6','B5','B3'],min:0,max:[0.35,0.5,0.26]};
var vis_RGBNCC_2Std = {bands : ['B6','B5','B3'],min:0,max:[0.32,0.65,0.13]};
var vis_RGB_EVI = {bands:['EVI_15','EVI_18','EVI_13'],min:0,max:[0.9,0.83,0.8]};
var vis_RGB_EVI8b = {bands:['EVI_15','EVI_18','EVI_13'],min:128,max:[200,220,240]};
var vis_RGBNCC_S2 = {bands : ['B11','B8','B3'],min:0,max:[0.35,0.5,0.26]};
//var vis_EVITS =VisRGBImgCol(EVITS_S2_Kol,[0,1,2],[0,0,0],[0.7,0.75,0.7]);
Map.centerObject(Riau_Prv,9); 
//Map.addLayer(RGBImgCol(EVITS_S2_Kol,[0,1,2],'EVI'),{},'TS EVI Sentinel-2 Th 2019');
Map.addLayer(Komp_S2_2019.clip(Riau_Prv),vis_RGBNCC_S2,'RGB S2 Riau Th ' + Th2);
Map.addLayer(Sawit_Sum.mask(Sawit_Sum),{palette:'green'},'LB Sawit Sum',0);
Map.addLayer(Umur19_Kls.mask(Sawit_Riau),viskls,'Umur Sawit Riau Th ' + Th2);
// LEGENDA
// set position of panel
var legend = ui.Panel({
  style: {
  //  position: 'bottom-right',
 //   position: 'top-right',
 position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var Ket_SM = 'Umur Sawit', Ket_Rentan = 'UMUR KELAPA SAWIT';
var Ket = Ket_Rentan;
var legendTitle = ui.Label({
  value: Ket,
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var Tgl = ['Th 2017','Th 2018','Th 2019','Umur (tahun)'];
var TglTitle = ui.Label({
  value: Tgl[3],
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle).add(TglTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
// var palette =['FF0000', '22ff00', '1500ff'];
/*var Palette = ['FF8866','66FFFF','00cccc','66ff00','00dd00', 
'008800','FFFF00','cccc00','de44de','FFaaFF'] ;*/ //pallete p.dede
var Palette = ['8bff00','71ce00','31a905','085cce','2a9edc', 
'6f24dc','cc19dc','dc1346','ff8e23','fff321'] ;
// name of the legend
var names = [];
for (var i = 0; i < 10; i++) {
 names[i]= i*3+1 + '-' + 3*(i+1);
}  
// Add color and and names
var c1,c2; c1=0; c2=10;
for (var i = c1; i < c2; i++) {
 legend.add(makeRow(Palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend);  
var PilNDVI = ['NDVI_'+Th1,'NDVI_'+Th1]
// Simpan Hasil
  Export.image.toDrive({ 
  image:  Umur19_Kls.mask(Sawit_Riau), 
  description: 'Umur2019_Kls_Riau', 
  scale: 30, 
  maxPixels: 1e13,
  region: Bts_Riau})
  ;
  Export.image.toDrive({ 
  image:  L8_NDVI_Gab.select(PilNDVI).mask(Sawit_Riau).multiply(125).add(128).toByte(), 
  description: 'NDVI8bit_2017_2019_Riau', 
  scale: 30, 
  maxPixels: 1e13,
  region: Bts_Riau})
  ;
    Export.image.toDrive({ 
  image:  L8_Th2.clip(Riau_Prv).visualize(vis_RGBNCC_2Std).toByte(), 
  description: 'RGB_' + Th2 + '_Riau', 
  scale: 30, 
  maxPixels: 1e13,
  region: Bts_Riau});
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
// Pilih Data Satelit
function Pilih_S2(date_range,Komp,PilBnd,nama) {
  // var nama = date_range.Leftside()
  var L8 = S2_TOA.filterDate(date_range[0],date_range[1]).map(maskS2clouds).map(addBands_S2).qualityMosaic('NDVI')
   .select(PilBnd)
   .set('system:time_start',date_range[0])
   .set('system:time_end',date_range[1]);
 if (Komp == 'Qual') L8=L8.qualityMosaic('NDVI');
  else if (Komp == 'Mean') L8=L8.mean();
  else if (Komp == 'Med') L8=L8.median();
  else if (Komp == 'Max') L8=L8.max();
  else if (Komp == 'Min') L8=L8.min();
  else if (Komp == 'Mos') L8=L8.mosaic();
  else L8=L8.qualityMosaic('NDVI');   
 if(nama !== '') Img = Img.set({name: nama});
 if (PilBnd !== '')Img = Img.select(PilBnd);
  return Img; 
}
function Pilih_S2k(date_range,Komp,PilBnd,nama) {
  // var nama = date_range.Leftside()
var Img = S2_SR.filterDate(date_range[0],date_range[1]).map(MskAwan_S2k).map(addBands_S2)
   .select(PilBnd)
   .set('system:time_start',date_range[0])
   .set('system:time_end',date_range[1]);
if (Komp == 'Qual')Img=Img.qualityMosaic('NDVI');
  else if (Komp == 'Mean') Img=Img.mean();
  else if (Komp == 'Med') Img=Img.median();
  else if (Komp == 'Max') Img=Img.max();
  else if (Komp == 'Min') Img=Img.min();
  else if (Komp == 'Mos') Img=Img.mosaic();
  else Img=Img.qualityMosaic('NDVI');  
 if(nama !== '') Img = Img.set({name: nama});
 if (PilBnd !== '')Img = Img.select(PilBnd);
  return Img; 
}
function Pilih_L8(date_range,Komp,PilBnd,nama) {
  var L8 = L8_SR.filterDate(date_range[0],date_range[1])
  .map(maskL8sr).map(addBands_Idx).select(PilBnd)
   .set('system:time_start',date_range[0])
   .set('system:time_end',date_range[1]);
  // Komposit Temporal
  if (Komp == 'Qual') L8=L8.qualityMosaic('NDVI');
  else if (Komp == 'Mean') L8=L8.mean();
  else if (Komp == 'Med') L8=L8.median();
  else if (Komp == 'Max') L8=L8.max();
  else if (Komp == 'Min') L8=L8.min();
  else if (Komp == 'Mos') L8=L8.mosaic();
  else L8=L8.qualityMosaic('NDVI');
  if(nama !== '') L8 = L8.set({name: nama});
  if (PilBnd !== '')Img = Img.select(PilBnd); 
  return L8; 
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
  var Msk = ndvi.expression("(evi <= -1.0 || evi >= 1.0 || ndvi <= -1.0 || ndvi >= 1.0) ? 0:1",{evi : evi,ndvi : ndvi});
  evi = evi.updateMask(Msk); ndvi = ndvi.updateMask(Msk);ndwi = ndwi.updateMask(Msk);
  ndbi = ndbi.updateMask(Msk); ILT = ILT.updateMask(Msk);
  return image.addBands(ndbi).addBands(evi).addBands(ndwi).addBands(ndvi).addBands(ILT).toFloat(); 
}
function addBands_S2_Sc1(image){
  var ndvi = image.normalizedDifference(['B8','B4']).rename('NDVI');
  var ndwi = image.normalizedDifference(['B3', 'B12']).rename('NDWI');
  var ndbi = image.normalizedDifference(['B11','B8']).rename('NDBI');
  var ILT =  image.select('B11').divide(image.select('B8')).rename('ILT'); // Indeks Lahan Terbuka
  var evi = image.expression("(RED < NIR || BLUE < RED) ? 2.5*((NIR-RED)/(L+NIR+6*RED-7.5*BLUE))" + 
  ":1.5*((NIR-RED)/(L/2+NIR+RED))"
  ,{NIR: image.select('B8'),RED: image.select('B4'),BLUE: image.select('B2'),L : 10000}).rename('EVI');
 var Msk = ndvi.expression("(evi <= -1.0 || evi >= 1.0 || ndvi <= -1.0 || ndvi >= 1.0) ? 0:1",{evi : evi,ndvi : ndvi});
  evi = evi.updateMask(Msk); ndvi = ndvi.updateMask(Msk);ndwi = ndwi.updateMask(Msk);
  ndbi = ndbi.updateMask(Msk); 
  return image.addBands(ndbi).addBands(evi).addBands(ndwi).addBands(ILT).toFloat(); 
}
// CLOUD Masking
function maskL8sr(image) { // Utk Landsat 8
  // Bits 3 and 5 are cloud shadow and cloud, respectively.
  var cloudShadowBitMask = 1 << 3;
  var cloudsBitMask = 1 << 5;
  // Get the pixel QA band.
  var qa = image.select('pixel_qa');
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudShadowBitMask).eq(0)
      .and(qa.bitwiseAnd(cloudsBitMask).eq(0));
  // Return the masked image, scaled to TOA reflectance, without the QA bands.
   return image.updateMask(mask).divide(10000) // Reflektan dijadikan 0-1
  //   return image.updateMask(mask)  // Scaled Reflektan 0-10000
      .select("B[0-9]*") // Pilih Band Reflektan 1-7, and Suhu Brightness B10,B11 (dlm K, dikali 10)
      .copyProperties(image, ["system:time_start"]);
}
// Function to mask clouds using the Sentinel-2 QA band.
function maskS2clouds(image) { // S2_TOA utk data sblm Desember 2018
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  // Return the masked and scaled data, without the QA bands.
  return image.updateMask(mask).divide(10000)
      .select("B.*")
      .addBands(qa)
      .copyProperties(image, ["system:time_start"])
    //  .addBands(qa) 
}
function addBands_Idx(image){ // LS 8
  var ndvi = image.normalizedDifference(['B5', 'B4']).rename('NDVI');
  var ndwi = image.normalizedDifference(['B3', 'B7']).rename('NDWI');
  var ndbi = image.normalizedDifference(['B6', 'B5']).rename('NDBI');
  var ILT =  image.select('B6').divide(image.select('B5')).rename('ILT'); // Indeks Lahan Terbuka
  var evi = image.expression("(RED < NIR || BLUE < RED) ? 2.5*((NIR-RED)/(L+NIR+6*RED-7.5*BLUE))"+
  ": 1.5*((NIR-RED)/(L/2+NIR+RED))"
    ,{NIR: image.select('B5'),RED: image.select('B4'),BLUE: image.select('B2'),L : 1}).rename('EVI');
  var Msk = ndvi.expression("(evi <= -1.0 || evi >= 1.0 || ndvi <= -1.0 || ndvi >= 1.0) ? 0:1",{evi : evi,ndvi : ndvi});
  evi = evi.updateMask(Msk); ndvi = ndvi.updateMask(Msk);ndwi = ndwi.updateMask(Msk);
  ndbi = ndbi.updateMask(Msk); ILT = ILT.updateMask(Msk);
 return image.addBands(ndvi).addBands(ndbi).addBands(evi).addBands(ndwi).addBands(ILT).toFloat()
     .copyProperties(image, ["system:time_start"]); 
 }
 function MskAwan_S2k(Img) {
// Cloud Mask S2 Surface Ref dr band SCL. 4,5,6 : Bare,Veg,Water
var SCL = Img.select('SCL');  
var Msk = Img.expression( "(Tc < 4 || Tc > 7 ) ? 0:1 ",{Tc : SCL}); 
SCL = SCL.updateMask(Msk);
return Img.updateMask(Msk).select('B.*').divide(10000).addBands(SCL)
 .copyProperties(Img, ["system:time_start"]);
}
function StackImg(ListDat) {// Array Listdat jdi Img Stack, nama Band hrs beda
  var Stck = ee.Image.cat(ListDat);
  return Stck;
}
function StackImgCol(ListDat) { // Array Listdat jdi Img Koleksi
  var Stck = ee.ImageCollection(ListDat);
  return Stck;
}
function ThnBln(Th1,Th2,Intr) {
  //Interval : 1,2,3,4,6 bulan
  var i,t1,t2,s1,s2,JumDt,JumTh,Thn =[];
  JumDt = Math.floor(12/Intr); // Jumlah Data / Th
  JumTh = 1+Th2 - Th1; 
  var Date_Start = ee.Date(Th1 + '-01-01');
for (i=0; i < JumTh*JumDt; i++) {
  t1=Date_Start.advance(Intr*i,'month');
  t2=t1.advance(Intr,'month');
  t2=t2.advance(-7,'hour');
  Thn[i] = ee.Filter.date(t1,t2);
}
 return Thn;
  }
function GetImgCol(ImgCol,Idx) {
var Idt = '' + Idx +  '',JumSetDt = ImgCol.size().getInfo();
if (Idx + 1 > JumSetDt) Idx = JumSetDt-1;
return ImgCol.filter(ee.Filter.eq('system:index',Idt));  
}
function RGBImgCol(ImgCol,IdxBnd,NmBnd) {
  var k, img=[], Bnd = []; 
  for (k=0; k < 3; k++) {img[k] = GetImgCol(ImgCol,IdxBnd[k]).median().rename(NmBnd + '_'+(IdxBnd[k]+1));}
  return ee.Image.cat(img);
}
function VisRGB(NmBnd,Min,Max) {
  var k, img=[], Bnd = []; 
  var Vis = {bands:NmBnd,min:Min,max:Max };
  return Vis;
}
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