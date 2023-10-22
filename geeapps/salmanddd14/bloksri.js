var SHSri_Geo = ee.FeatureCollection("users/salmanddd14/shp/SHSri_Geo");
var text = require('users/gena/packages:text');
var TyFnt = ['Consolas','Arial'];
var i,SizFnt = [[16,18,24,32],[10,12,14,16,18,24,32,64]];
Map.centerObject(SHSri_Geo,15);
Map.setOptions('HYBRID');
var scale = Map.getScale(),Bounds=Map.getBounds();
print('scale',scale);
var Point = SHSri_Geo.geometry().centroid(), 
SetFont = ['Arial',24,Point];
var Lst_Blk = LstPro(SHSri_Geo,'BLOK_KUS','ID').getInfo();
Lst_Blk[37]='BSL1' ; Lst_Blk[38]='BSL2'; 
Lst_Blk[190]='TGK_Barat1' ; Lst_Blk[191]='TGK_Barat2'; 
Lst_Blk[190]='TGK_Barat1' ; Lst_Blk[191]='TGK_Barat2'; 
Lst_Blk[137]='PKonci1'; Lst_Blk[138]='PKonci2';
Lst_Blk[139]='PKonci3'; Lst_Blk[140]='PKonci4';
var Lst_Blk_Obj = LstPro(SHSri_Geo,'BLOK_KUS','ID');
var Test = showAnno(Lst_Blk[0],SetFont,'','');
/*
var Lst_Feat = SHSri_Geo.sort('ID').toList(SHSri_Geo.size());
var Lst_Blk = Lst_Feat.map(function(f){
  return ee.Feature(f).get('BLOK_KUS');
}); 
*/
var Sri_Point = Poly2Point(SHSri_Geo,'ID','BLOK_KUS');
var Lst_Point = Sri_Point.toList(Sri_Point.size())
.map(function(l){
  var Point = ee.Feature(l).geometry();
  return Point;
});
print('Lst_Blk',Lst_Blk,Lst_Point,Lst_Point.get(0));
SetFont = ['Arial',24,Lst_Point.get(0)];
  var Anno = showAnno(Lst_Blk[0],SetFont,'',''),Anno_Gab=[];
print('Anno',Anno);
for(i=0; i < 194; i++) { SetFont = ['Arial',24,Lst_Point.get(i)];
  Anno_Gab[i]= showAnno(Lst_Blk[i],SetFont,'','');
} 
Anno_Gab=ee.ImageCollection(Anno_Gab).max();
print('Anno_Gab',Anno_Gab);
/*
SHSri_Geo.sort('ID').map(function(f){
  var ID = f.get('ID'),Luas_Ha = f.area().divide(1e4),
  Point = f.centroid().set('ID',ID).set('Area_Ha',Luas_Ha);
 // return showAnno(ID,Set_Font(24,Point),'blue','blue',0);
 return Point;
}); 
var Sri_Anno = SHSri_Geo.sort('ID').map(function(f){
  var ID = ee.String(f.get('BLOK_KUS')),Luas_Ha = f.area().divide(1e4),
  Point = f.centroid().set('ID',ID).set('Area_Ha',Luas_Ha);
  var Idx = Lst_Blk.indexOf(ID);
  var SetFont = ['Arial',24,Point.geometry()];
  var Anno = showAnno(Lst_Blk[Idx],SetFont,'black','white');
 // return showAnno(ID,Set_Font(24,Point),'blue','blue',0);
 return Anno;
}); 
print('Sri_Anno',Sri_Anno);
*/
Map.addLayer(Feat2_Img(SHSri_Geo,1,2,''),{palette:'brown'},'Sri_Boundary');
Map.addLayer(Sri_Point,{color:'red'},'Sri_Point');
Map.addLayer(Anno_Gab,{min:0,max:255},'Blok Name');
function Feat2_Img(FC,Val,Tebal,ProName) {
  var Img = ee.Image()
//    .paint(FC, ProName) // Get color from property named 'fill'
    .paint(FC, Val, Tebal) // Outline using color 3, width 5.
    .toByte();
  if (ProName !=='')Img = Img.paint(FC, ProName); // Isi
  return Img;
}
function Set_Font(Siz,Kord,Font) {
  var Ttk,SetFont=[],FontFix;  // ['Arial',24,Ttk]; 20 gk ada
  if(Font > 0) FontFix = Font; else FontFix = 'Arial';
  if (Siz == 20) Siz = 18;
  Ttk = ee.Geometry.Point(Kord); SetFont = [FontFix,Siz,Ttk];
  return SetFont;
}
function Txt2Img(Txt,Point,FntS,Warna,WarnaOL,Sc) { // Sc : 4m
 var fontType = 'Arial',fontSize = FntS,PointFix,LTxt;
 LTxt = Txt.length();
  if (Warna==='') Warna ='black'; if (WarnaOL==='') WarnaOL ='white'; 
var titleText = text.draw(Txt, Point, Sc, { 
    fontSize: fontSize, textColor: Warna, fontType: fontType,
    outlineColor: WarnaOL, outlineWidth: 2.5, outlineOpacity: 0.6
  });
 return titleText;
}
function showAnno(Txt,info,Warna,WarnaOL) {
  var fontType = info[0],fontSize = info[1], pt = info[2];
  if (Warna==='') Warna ='black'; if (WarnaOL==='') WarnaOL ='white';
  //print(fontType, fontSize)
  var titleText = text.draw(Txt, pt, scale, { 
    fontSize: fontSize, textColor: Warna, fontType: fontType,
    outlineColor: WarnaOL, outlineWidth: 2.5, outlineOpacity: 0.6
  });
// return Set_Map(NoLyr,titleText,{},Txt);
 return titleText;
}
function Poly2Point(Fc,KySrt,ProS) {
 // var Lst_Feat = Fc.sort(KySrt).toList(Fc.size());
  var Points = Fc.map(function(f){
  var ID = (f).get(ProS),
  Point = (f).centroid().set(ProS,ID);
  return Point;}); return (Points);
}
function UpFeatLuas(Fc,Pro) {
  var Polys = Fc.sort(Pro).map(function(f){
  var Luas_Ha = f.area().divide(1e4),
  Poly = f.set('Luas_Ha',Luas_Ha);
  return Poly;}); return Polys; 
}
function LstPro(Fc,Pro,KySrt) {
var Lst_Feat = Fc.sort(KySrt).toList(Fc.size());
var Lst_Blk = Lst_Feat.map(function(f){
  return ee.Feature(f).get(Pro);
}); return Lst_Blk;
}