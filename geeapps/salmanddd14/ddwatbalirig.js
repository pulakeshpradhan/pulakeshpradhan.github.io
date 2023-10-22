var image = ee.Image("projects/ee-muhammadzainalsalim/assets/S1_DI_RENTANG_2021/RPI_VH_2021-10-21_Rentang"),
    rentang = /* color: #d63000 */ee.Geometry.Point([108.26265077519163, -6.370272465877426]);
var GUI = require('users/salmanddd14/AFungsi_1:GUI_GEE.js');
var Logo = require('users/dededirgahayu11/Fungsi:DD_Logo.js');
var DI_Feat = [];
// Img jdi Thumbnail
var Log_Bappenas = ee.Image("users/dededirgahayu11/Foto/Logo_Bappenas");
var LogBapenasz70 = ee.Image("users/dededirgahayu11/Foto/LogBapenasz70");
var Tmb_BRIN8Bapenas=Logo.TmbBRIN8zBape();
var Tmb_Bappenas=Img2Thumbz(Log_Bappenas,270,91,0.75);
//<<<<<<<<<<<<<
var Fmt = 'YYYY-MM-dd';
var End_Date = ee.Date(Date.now()).format(Fmt); 
var Start_Date = ee.Date('2017-01-01').format(Fmt);
var TglS = Start_Date.getInfo();
var TglE = End_Date.getInfo();
var TglSEt = TglS + "," + TglE; 
var dateSlider = ui.DateSlider({start:TglS,end: TglE,value: null,period: 10});
dateSlider.onChange(function (Cek) {
  print('Start Date',ee.Date(Cek.start()).format(Fmt)); //------------------------->function()
  TglS = ee.Date(Cek.start()).format(Fmt).getInfo();
} );
Map.add(dateSlider);
var ButtS1=ui.Button('RGB Sentinel-1');
var ButtTema=ui.Select(['Peta Fase HST', 'Peta Rawan Kering','Peta Defisit Air'], 'Peta Tematik');
var ButtMOD=ui.Button('RGB MODIS');
UI_Style(ButtS1,12,'blue','bold','' );
UI_Style(ButtTema,12,'green','bold','' );
UI_Style(ButtMOD,12,'red','bold','' );
ButtS1.style().set({position:'bottom-left'});
ButtTema.style().set({position:'bottom-center'});
ButtMOD.style().set({position:'bottom-right'});
Map.add(ButtMOD);
Map.add(ButtTema);
Map.add(ButtS1);
function UI_Style(UI,Siz,Warna,NorBold,Align) {
  return UI.style().
  set({fontSize : Siz+'px',
  color : Warna,
  fontWeight : NorBold,
  textAlign: Align}); // Align : ['left','center' ], fontWeight:'normal', 'bold' /size}
}
//PANEL
// Create a panel to hold the chart.
// - border (e.g. '1px solid black')
Map.style().set('cursor', 'crosshair');
var panel = ui.Panel();
panel.style().set({
  width: '300px',
  position: 'bottom-right',
  border : '2px solid black'
});
ui.root.add(panel);
//UI_Margin(Tmb_Bappenas,0,0,0,100);
panel.widgets().set(0,Tmb_BRIN8Bapenas);
var Judul = "SATELLITE IMAGERY FOR MONITORING IRRIGATION AREA",
Inventor = ' Inventor : Dr ir Dede Dirgahayu Domiri ', 
Afiliasi = ' Pusfatja; LAPAN-BRIN ', Members='M Zainal Salim, M Yusuf Manshur';
var Lbl_Judul = ui.Label(Judul),
Lbl_Inv = ui.Label(Inventor),Lbl_Member = ui.Label('Members : '+ Members),
Lbl_Afil= ui.Label(Afiliasi);
UI_Style(Lbl_Judul,18,'green','bold','center' );
UI_Style(Lbl_Inv,12,'darkblue','bold','center' ); 
UI_Style(Lbl_Member,11,'darkblue','','center' );
UI_Style(Lbl_Afil,13,'red','bold','center' );
// Margin
UI_Margin(Lbl_Judul,0,0,8,8);  UI_Margin(Lbl_Inv,0,0,0,48);
UI_Margin(Lbl_Member,0,0,0,36); UI_Margin(Lbl_Afil,0,0,0,96);
panel.widgets().set(1,Lbl_Judul); panel.widgets().set(2,Lbl_Inv);
panel.widgets().set(3,Lbl_Afil); panel.widgets().set(4,Lbl_Member);
var DI_Nam = ['DI Rentang','DI Manganti','DI Demak'];
var Pil_DI = ui.Select({placeholder : 'Irigation Area',items:DI_Nam});
panel.widgets().set(5,Pil_DI);
var TB_Point = ui.Textbox({value: '🌐Longitude, 🌐Latitude'});
UI_Margin(TB_Point,-35,0,0,110);
panel.widgets().set(6,TB_Point);
// EVENT
Pil_DI.onChange(function(Cek){
  var Idx =  DI_Nam.indexOf(Cek);
  print('Idx : ' ,  Idx);
});
var GoButt = ui.Button({
  label: '🚀Go To',
  onClick: function() {
  var Koor = (TB_Point.getValue()).split(',');
  var Lo = parseFloat(TB_Point.getValue().split(',')[0]),
      La = parseFloat(TB_Point.getValue().split(',')[1]);
  print('Lon,Lat : ' + Lo + ',' + La);
  if(Koor !=='') Map.setCenter(Lo, La, 10);
  }
});
UI_Style(GoButt,11,'red','','center' );
UI_Margin(GoButt,-27,0,0,300);
panel.widgets().set(7,GoButt);
var chart = ui.Chart.image.regions(image, rentang, null, 100);
var Graf_Tl = 'Crops Water Ballance ';
chart.setOptions({title: Graf_Tl});
chart.setChartType('ColumnChart');
panel.widgets().set(8,chart);
var Bts_Adm = ui.Label({
value: '💠ADMINISTRATION BOUNDARY💠',
style: {color: 'red',
        fontSize:'15px',
        backgroundColor: 'darkgray',
        padding: '5px',
        margin: '0 0px 10px 100px',
        textAlign: 'center'
      }});
panel.widgets().set(9,Bts_Adm);
var Grid = ui.Checkbox('Grid');
UI_Style(Grid,11,'black','bold','center' );
UI_Margin(Grid,0,0,0,0);
var Road = ui.Checkbox('Road');
UI_Style(Road,11,'red','bold','center' );
UI_Margin(Road,-13,0,0,90);
var Prov = ui.Checkbox('Prov');
UI_Style(Prov,11,'purple','bold','center' );
UI_Margin(Prov,-12,0,0,180);
var Kab = ui.Checkbox('Kab');
UI_Style(Kab,11,'purple','bold','center' );
UI_Margin(Kab,-13,0,0,270);
var Kec = ui.Checkbox('Kec');
UI_Style(Kec,11,'black','bold','center' );
UI_Margin(Kec,-13,0,0,360);
var Check_Gab = [Grid,Road,Prov,Kab,Kec];
for (var i=0;i<5;i++){
  panel.widgets().set(i+10,Check_Gab[i]);
}
Map.onClick(function(coords) {
var point = ee.Geometry.Point(coords.lon, coords.lat);
var KoordT = coords.lon.toFixed(6) + "," + coords.lat.toFixed(6);
TB_Point.setValue(KoordT)
});
function UI_Margin(UI,y1, x1, y2, x2) { 
return UI.style().set({margin:y1+'px '+ x1+'px '+ y2+'px '+ x2+'px'}); 
  }
function Img2Thumbz(Img,Lx,Ly,FZoom) {
var Lxz=Math.round(Lx*FZoom),Lyz=Math.round(Ly*FZoom);
var thumb = ui.Thumbnail({
    image: Img, //Img2Vis(Img),
    params: {
        dimensions: Lxz + "x" + Lyz,
        format: 'png'
        },
    style: {height: Lyz + 'px', width:  + 'px',padding :'3'}
    });
  return thumb;
  }
function Img2Vis(Img,Mins,Maxs) {
 var ImgVis = Img.visualize({
  //  bands:  ['b1', 'b2', 'b3'], // Susunan RGB
    min: Mins, max: Maxs
    }); 
return ImgVis; 
  }
function UI_Style(UI,Siz,Warna,NorBold,Align) {
  return UI.style().
  set({fontSize : Siz+'px',
  color : Warna,
  fontWeight : NorBold,
  textAlign: Align}); // Align : ['left','center' ], fontWeight:'normal', 'bold' /size}
}