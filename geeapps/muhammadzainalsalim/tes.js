var DI_Manganti = ee.FeatureCollection("projects/ee-muhammadzainalsalim/assets/DI_Manganti"),
    DI_Rentang = ee.FeatureCollection("projects/ee-muhammadzainalsalim/assets/DI_Rentang"),
    DI_Jragung = ee.FeatureCollection("projects/ee-muhammadzainalsalim/assets/DI_Jragung"),
    Sukamadi = ee.FeatureCollection("projects/ee-muhammadzainalsalim/assets/2016_2020_Data_Klimatologi_Sukamadi_BPP_Subang"),
    Data_CH = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY");
var palettes = require('users/gena/packages:palettes');
var legend = require('users/muhammadzainalsalim/coba:legendDAP');
var Time = require('users/dededirgahayu11/Fungsi:DD_Dyn_Time.js');
var legDAP = legend.legendDAP();
var legD = legend.legendD();
var legDEF = legend.legendDEF();
//Time
var LstTgl10d = Time.PrdDifTh_Gre(2016,2020,10)
var JumPd = ee.List(LstTgl10d).length().getInfo()
var idxTgl,start,diffday,greg
var GUI = require('users/salmanddd14/AFungsi_1:GUI_GEE.js');
var Logo = require('users/dededirgahayu11/Fungsi:DD_Logo.js');
// var asas = require('users/muhammadzainalsalim/coba:GUI_Neraca_Air_ed_ymanshur.js');
var DI_Feat = [DI_Rentang,DI_Manganti,DI_Jragung];
// Img jdi Thumbnail
var Log_Bappenas = ee.Image("users/dededirgahayu11/Foto/Logo_Bappenas");
var LogBapenasz70 = ee.Image("projects/ee-muhammadzainalsalim/assets/LogoBapPlus");
var Tmb_BRIN8Bapenas=Logo.TmbBRIN8zBape(); //delay
var logo = ee.Image("projects/ee-muhammadzainalsalim/assets/BapePlus")
.visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var Tmb_BRIN8Bapenas = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '300x100',
        format: 'png'
        },
    style: {height: '100px', width: '285px',padding :'0'}
    });
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
var MODIS = require('users/muhammadzainalsalim/coba:Olah_Modis (symbol).js');
var Bts = Kord2Geom([105,-5.5,116,-9],'Rect',0);
var ULx = 105,ULy=-5.5;
var CH,LAI,SLOPE, DAP,D,PET,KC,SWC,PET,RPI,F,WB,DEF;
var Feat_DI, Feat_DI_Cen,IdxPil_DI;
var IdxButtTema;
var Data_S2,Data_S1;
var Fmt = 'YYYY-MM-dd';
var End_Date = ee.Date('2020-12-31'); 
var Start_Date = ee.Date('2016-01-01');
Map.setCenter(108.338581, -6.494353,10); //initial
var TglS = ee.Date('2020-11-01');//initial
var TglE = ee.Date('2020-11-11');//initial
// Set_Map(11,ee.Image(0),{}, 'Precipitation',false);//initial delay
// Set_Map(12,ee.Image(0),{}, 'Leaf Area Index',false);//initial delay
Feat_DI = DI_Rentang ;//initial
// Set_Map(15,Feat2Img(Feat_DI,100,1,''), {palette: ['darkblue']}, 'Outline DI',false); //delay initial
var panelSlider = ui.Panel();
panelSlider.style().set({
  width: '50%',
  // height: '120px',
  position: 'bottom-center',
});
var x = ui.Button({label : '❎HIDE SLIDER' ,
  style : {color:'green',fontSize:'5px',width:'50%',margin:'-37px 0 0 50%'},
onClick: function() { 
panelSlider.style().set('shown', false);
panel.style().set('shown',true);
},
});
var p = ui.Button({label :' 🛰PROCESS              ' ,
style : {color:'blue',fontSize:'5px' ,width:'50%'},
});
var dateSlider = ui.DateSlider({start:Start_Date,end: End_Date,value: null,period: 10});
dateSlider.style().set('width', '100%');
dateSlider.onChange(function (Cek) {
  TglS = Cek.start(); //ee.Date(Cek.start()).format(Fmt).getInfo()
  TglE = Cek.end();
  // return cekTgl(Cek) pindah ke pickdate
});
panelSlider.widgets().set(0,p);
panelSlider.widgets().set(1,x);
panelSlider.widgets().set(2,dateSlider);
var ButtS1=ui.Button('RGB Sentinel-1');
var ButtTema=ui.Select(['Age Crops: Day After Planting (DAP) Map', 'Drought/Flood Risk Map','Water Deficit Map','Thematic Map'], 'Thematic Map');
var ButtS2=ui.Button('RGB Sentinel-2');
UI_Style(ButtS1,12,'blue','bold','' );
UI_Style(ButtTema,12,'green','bold','' );
UI_Style(ButtS2,12,'red','bold','' );
ButtS1.style().set({position:'bottom-left'});
ButtTema.style().set({position:'top-center'});
ButtS2.style().set({position:'bottom-right'});
dateSlider.style().set({position:'bottom-center'});
Map.add(ButtS2);
Map.add(ButtTema);
Map.add(ButtS1);
Map.add(panelSlider);
//PANEL
Map.style().set('cursor', 'crosshair');
var panel = ui.Panel();
panel.style().set({
  width: '300px',
  position: 'bottom-right',
  border : '2px solid black'
});
ui.root.add(panel);
panel.widgets().set(0,Tmb_BRIN8Bapenas);
var Judul = "SATELLITE IMAGERY FOR MONITORING IRRIGATION AREA",
Inventor = ' Inventor : Dr ir Dede Dirgahayu Domiri ', 
Afiliasi = ' Pusfatja; LAPAN-BRIN ', Members='M Zainal Salim, M Yusuf Manshur';
var Lbl_Judul = ui.Label(Judul),
Lbl_Inv = ui.Label(Inventor),Lbl_Member = ui.Label('Assistant : '+ Members),
Lbl_Afil= ui.Label(Afiliasi);
UI_Style(Lbl_Judul,18,'green','bold','center' );
UI_Style(Lbl_Inv,12,'darkblue','bold','center' ); 
UI_Style(Lbl_Member,11,'darkblue','','center' );
UI_Style(Lbl_Afil,13,'red','bold','center' );
// Margin
UI_Margin(Lbl_Judul,0,0,8,8);  UI_Margin(Lbl_Inv,0,0,0,45);
UI_Margin(Lbl_Member,0,0,0,39); UI_Margin(Lbl_Afil,0,0,0,89);
panel.widgets().set(1,Lbl_Judul); panel.widgets().set(2,Lbl_Inv);
panel.widgets().set(3,Lbl_Afil); panel.widgets().set(4,Lbl_Member);
var v = ui.Button({label : '🗓Pick Date️',
style : {color:'red',margin:'0px 0 0 8px ',fontSize:'5px',width:'93px' }, 
onClick: function() {
panelSlider.style().set('shown', true);
cekTgl();
Date_Point.setValue(greg);
}
});
var Date_Point = ui.Textbox({value: 'YYYY-MM-dd,YYYY-MM-dd',style:{color:'gray'}});
UI_Margin(Date_Point,-27,0,0,110);
panel.widgets().set(5,v);
panel.widgets().set(6,Date_Point);
var DI_Nam = ['DI Rentang','DI Manganti','DI Jragung'];
var Pil_DI = ui.Select({placeholder : 'Irigation Area',items:DI_Nam,style:{width:'93px'}});
panel.widgets().set(7,Pil_DI);
var TB_Point = ui.Textbox({value: '🌐Longitude, 🌐Latitude',style:{color:'gray'}});
UI_Margin(TB_Point,-35,0,0,110);
panel.widgets().set(8,TB_Point);
var GoButt = ui.Button({
  label: '🚀Go To',
  onClick: function() {
  var Koor = (TB_Point.getValue()).split(',');
  var Lo = parseFloat(TB_Point.getValue().split(',')[0]),
      La = parseFloat(TB_Point.getValue().split(',')[1]);
  print('Lon,Lat : ' + Lo + ',' + La);
  if(Koor !=='') Map.setCenter(Lo, La, 9);
  }
});
UI_Style(GoButt,11,'red','','center' );
UI_Margin(GoButt,-27,0,0,300);
panel.widgets().set(9,GoButt);
var Lbl_CH = ui.Label('🌧 (mm)');
UI_Margin(Lbl_CH,5,0,0,10);
panel.widgets().set(10,Lbl_CH);
var CH_Point = ui.Textbox({value: 'Prec',style:{color:'gray'}});
UI_Margin(CH_Point,-20,0,0,70);
CH_Point.style().set({maxWidth: '55px'});
panel.widgets().set(11,CH_Point);
var Lbl_LAI = ui.Label('🌱📐 (deg)');
UI_Margin(Lbl_LAI,-20,0,0,130);
panel.widgets().set(12,Lbl_LAI);
var LAI_Point = ui.Textbox({value: 'LAI,SLP',style:{color:'gray'}});
UI_Margin(LAI_Point,-20,0,0,205);
LAI_Point.style().set({maxWidth: '90px'});
panel.widgets().set(13,LAI_Point);
var Lbl_PET = ui.Label('♨️ (mm)');
UI_Margin(Lbl_PET,0,0,0,10);
panel.widgets().set(14,Lbl_PET);
var PET_Point = ui.Textbox({value: 'PET',style:{color:'gray'}});
UI_Margin(PET_Point,-20,0,0,70);
PET_Point.style().set({maxWidth: '55px'});
panel.widgets().set(15,PET_Point);
var Lbl_KC = ui.Label('🌾💧 (mm)');
UI_Margin(Lbl_KC,-20,0,0,130);
panel.widgets().set(16,Lbl_KC);
var KC_Point = ui.Textbox({value: 'KC,SWC',style:{color:'gray'}});
UI_Margin(KC_Point,-20,0,0,205);
KC_Point.style().set({maxWidth: '90px'});
panel.widgets().set(17,KC_Point);
// CHART Initial
var TglSi = '2016-11-01'; 
var TglEi = '2016-11-11';
var intialpoint = /* color: #d63000 */ee.Geometry.Point([108.26265077519163, -6.370272465877426]);
// var initialcol2 = ee.ImageCollection(Kalib_Chirp(TglSi,TglEi));
// var initialcol1 = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/PET_DI_Rentang_5YEARS")
// .filterDate(TglSi,TglEi);initialcol1=Prop(initialcol1);
// var c = initialcol1.combine(initialcol2);
// var chart = ui.Chart.image.regions(c.select(['SMmm','PET','CH_mm'],['SWC','PET','Prec']).first(), intialpoint, null, 250);
// chart.setSeriesNames(['Water Balance Parameters']);
// chart.setOptions({
//   vAxis: {
//     title: '(mm)',
//     titleTextStyle: {italic: false, bold: true}
//   },colors: ["1d6b99"],isStacked: 'absolute'
//   });
// chart.setChartType('ColumnChart');
var chartWB = ui.Chart.image.series(ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/WB_DI_Rentang_5YEARS")
.select(['pr','pet','aet','swc','def','ro'],['Precipitation',
  'PotentialET','ActualET','Soil_Water','Deficit','Runoff']),intialpoint,ee.Reducer.mean(),250)
chartWB.setOptions({
  vAxis: {
    title: '(mm)',
    titleTextStyle: {italic: false, bold: true}
  }
  });
panel.widgets().set(18,chartWB);
var Keb_Air = ui.Label({
value: '🌊WATER DEFICIT️',  // ⚖,
style: {color: 'lightyellow',
        fontSize:'15px',
        backgroundColor: 'darkblue',
        fontWeight: 'bold',
        padding: '5px',
        margin: '0 0px 0px 75px',
        textAlign: 'center'
      }});
var TB_Air = ui.Textbox({value: 'HEIGHT (mm)',style:{color:'black',fontWeight: 'bold',maxWidth: '50%'}});
var TB_Volume = ui.Textbox({value: 'VOLUME (m3)',style:{color:'black',fontWeight: 'bold',maxWidth: '50%'}});
TB_Volume.style().set({margin:'-33px 0px 0px 50%'}); 
panel.widgets().set(19,Keb_Air);
panel.widgets().set(20,TB_Air);
panel.widgets().set(21,TB_Volume);
var chartRPI = ui.Chart.image.series(ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/RPI_DI_Rentang_5YEARS")
.select('RPI'),intialpoint,ee.Reducer.mean(),10)
chartRPI.setSeriesNames(['Ratio Polatization Index']);
chartRPI.setOptions({
  vAxis: {
    title: 'RPI',
    titleTextStyle: {italic: false, bold: true}
  }
  });
panel.widgets().set(22,chartRPI);
var Bts_Adm = ui.Label({
value: '💠ADMINISTRATIVE BOUNDARIES💠',
style: {color: 'lightyellow',
        fontSize:'15px',
        backgroundColor: 'darkblue',
        padding: '5px',
        margin: '5px 0px 10px 20px',
        textAlign: 'center'
      }});
panel.widgets().set(23,Bts_Adm);
//Batas Admin ChekBox
var Grid = ui.Checkbox('Grid');
UI_Style(Grid,11,'black','bold','center' );
UI_Margin(Grid,0,0,0,0);
var Road = ui.Checkbox('Road');
UI_Style(Road,11,'red','bold','center' );
UI_Margin(Road,-13,0,0,60);
var Prov = ui.Checkbox('Prov');
UI_Style(Prov,11,'purple','bold','center' );
UI_Margin(Prov,-12,0,0,120);
var Kab = ui.Checkbox('Kab');
UI_Style(Kab,11,'purple','bold','center' );
UI_Margin(Kab,-13,0,0,180);
var Kec = ui.Checkbox('Kec');
UI_Style(Kec,11,'black','bold','center' );
UI_Margin(Kec,-13,0,0,240);
var Check_Gab = [Grid,Road,Prov,Kab,Kec];
for (var i=0;i<5;i++){
  panel.widgets().set(i+24,Check_Gab[i]);
}
// ######################################EVENT####################################################
var Feat2Cent = ['108.338581, -6.494353','108.801197, -7.556260','110.574858, -7.023700']
Pil_DI.onChange(function(Cek){
  IdxPil_DI =  DI_Nam.indexOf(Cek);
  Feat_DI = DI_Feat[IdxPil_DI];Map.centerObject(Feat_DI,12);
  // Feat_DI_Cen =  (Feat_DI,'txt')
  TB_Point.setValue(Feat2Cent[IdxPil_DI]); //delay dulu biar gak lama
});
ButtTema.onChange(function(Cek){
   Map.remove(legDAP);
   Map.remove(legD);
   Map.remove(legDEF);
  if(Cek === ButtTema.items().get(0)){
    Map.add(legDAP);
  }
  else if(Cek === ButtTema.items().get(1)){
    Map.add(legD);
  }
  else if(Cek === ButtTema.items().get(2)){
    Map.add(legDEF);
  }
  else {
    Map.remove(legDAP);
    Map.remove(legD);
    Map.remove(legDEF);
  }
});
p.onClick(function(){
//SLOPE 2000 30m
  SLOPE = ee.Image('CGIAR/SRTM90_V4');
  SLOPE = SLOPE.select('elevation').clip(Feat_DI);
  SLOPE = ee.Terrain.slope(SLOPE);print('SLOPE',SLOPE);
//CURAH HUJAN 250m
  var paletteCH = palettes.colorbrewer.RdYlBu[11];
  CH = Kalib_Chirp(TglS,TglE,10);print('CH',CH);
  RemoveLayer('Precipitation');
//LAI 250m
  LAI = ee.ImageCollection("MODIS/006/MCD15A3H");
  LAI = LAI.select('Lai').filterBounds(Bts).map(ResamBicPro250).filterDate(TglS, TglE).map(Div10Clip)
  .qualityMosaic('Lai');print('LAI',LAI);
  RemoveLayer('Leaf Area Index');
//DAP 10m
  var PalDAP = {"min":0,"max":12,"palette":["0000FF","00ffff","00ff00","00d600","008f00","003300","406600","738f00","b2c200","ccd600","e6eb00","ffff00","808080"]};
  if(Feat_DI === DI_Rentang){ //DI_Feat[0]
    DAP = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/DAP_DI_Rentang_5YEARS");
  }
  else if(Feat_DI === DI_Manganti ){//DI_Feat[1]
    DAP = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/DAP_DI_Manganti_5YEARS");
  }
  else if(Feat_DI === DI_Jragung){//DI_Feat[2]
    DAP = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/DAP_DI_Jragung_5YEARS");
  }
  else DAP = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/DAP_DI_Rentang_5YEARS"); 
  DAP = DAP.filterDate(TglS, TglE).mode();
  RemoveLayer('Age Of Plant');
//Drought Risk 250m
  var PalD = {"min":1,"max":5,"palette":['00ff00', '00FFFF','FFFF00','FFA500','ff0000']};
  if(Feat_DI === DI_Rentang){ //DI_Feat[0]
    D = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/D_DI_Rentang_5YEARS");
  }
  else if(Feat_DI === DI_Manganti ){//DI_Feat[1]
    D = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/D_DI_Manganti_5YEARS");
  }
  else if(Feat_DI === DI_Jragung){//DI_Feat[2]
    D = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/D_DI_Jragung_5YEARS");
  }
  else D = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/D_DI_Rentang_5YEARS");
  if (TglS <= ee.Date('2016-01-01').advance(3,'month')){D = D.filterDate(TglS, TglE.advance(3,'month')).mean()}
  else D = D.filterDate(TglS.advance(-3,'month'), TglE).mean();
  RemoveLayer('Drought Risk');
  //Flood Risk 250m
  if(Feat_DI === DI_Rentang){ //DI_Feat[0]
    F = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/F_DI_Rentang_5YEARS");
  }
  else if(Feat_DI === DI_Manganti ){//DI_Feat[1]
    F = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/F_DI_Manganti_5YEARS");
  }
  else if(Feat_DI === DI_Jragung){//DI_Feat[2]
    F = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/F_DI_Jragung_5YEARS");
  }
  else F = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/F_DI_Rentang_5YEARS");
  if (TglS <= ee.Date('2016-01-01').advance(3,'month')){D = D.filterDate(TglS, TglE.advance(3,'month')).mean()}
  else F = F.filterDate(TglS.advance(-3,'month'), TglE).mean();
  RemoveLayer('Flood Risk');
//PET 250m
  var PalPET = {
  bands: ['PET'],
  min: 2.6953295755254985, max: 77.5390444692546,
  palette: palettes.kovesi.rainbow_bgyr_35_85_c72[7]
  };
  if(Feat_DI === DI_Rentang){ //DI_Feat[0]
    PET = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/PET_DI_Rentang_5YEARS");
  }
  else if(Feat_DI === DI_Manganti ){//DI_Feat[1]
    PET = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/PET_DI_Manganti_5YEARS");
  }
  else if(Feat_DI === DI_Jragung){//DI_Feat[2]
    PET = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/PET_DI_Jragung_5YEARS");
  }
  else PET = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/PET_DI_Rentang_5YEARS"); 
  PET = PET.filterDate(TglS, TglE).mean();
  RemoveLayer('Potential EvapoTranspiration');
//KC 250m
  RemoveLayer('Koefficient Crops');
//SWC 250m
  var PalSWC = {
  bands: ['SMmm'],
  min: -37.86984555348849, max: 119.54799738599897,
  palette: paletteCH
  };
  RemoveLayer('Soil Water Capacity');
//DEF
  var PalDEF = {
  bands: ['def'],
  min: 0, max: 50,
  palette: ['1a3678', '2955bc', '5699ff', '8dbae9', 'acd1ff', 'caebff', 'e5f9ff',
      'fdffb4', 'ffe6a2', 'ffc969', 'ffa12d', 'ff7c1f', 'ca531a', 'ff0000',
      'ab0000' ]
  };
  if(Feat_DI === DI_Rentang){ //DI_Feat[0]
    DEF = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/WB_DI_Rentang_5YEARS");
  }
  else if(Feat_DI === DI_Manganti ){//DI_Feat[1]
    DEF = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/WB_DI_Manganti_5YEARS");
  }
  else if(Feat_DI === DI_Jragung){//DI_Feat[2]
    DEF = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/WB_DI_Jragung_5YEARS");
  }
  else DEF = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/WB_DI_Rentang_5YEARS"); 
  DEF = DEF.filterDate(TglS, TglE).mean();
  RemoveLayer('Water Deficit');
//DI Outline
  RemoveLayer('Outline DI');
return Set_Map(0,SLOPE,{min:-1.70,max:4.63}, 'Slope',false),
  Set_Map(1,CH, {min:0.1, max:100,palette:paletteCH}, 'Precipitation',false),
  Set_Map(2,LAI, {min:0.249,max:6.599,palette: ['e1e4b4', '999d60', '2ec409', '0a4b06']}, 'Leaf Area Index',false),
  Set_Map(3,DAP.focal_mode(),PalDAP,'Age Of Plant',false),
  Set_Map(4,D.clip(Feat_DI).focal_mode(),PalD,'Drought Risk',false),
  Set_Map(5,PET,PalPET,'Potential EvapoTranspiration',false),
  Set_Map(6,PET.select('Kc'),{},'Koefficient Crops',false),
  Set_Map(7,PET,PalSWC,'Soil Water Capacity',false),
  Set_Map(8,F.select('Bjr_Kls').clip(Feat_DI).focal_mode(),PalD,'Flood Risk',false),
  Set_Map(9,DEF,PalDEF,'Water Deficit',false),
  Set_Map(50,Feat2Img(Feat_DI, 100, 1,''), {palette: ['darkblue']}, 'Outline DI');
});
var dataCH,dataCHN,dataLAI,dataLAIN,dataSLOPE,dataSLOPEN,dataPET,dataPETN,dataKC,dataKcN,dataSWC,dataSWCN;
var dataDEF,dataDEFN,Volume;
Map.onClick(function(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var KoordT = coords.lon.toFixed(6) + "," + coords.lat.toFixed(6);
  RemoveLayer('Point Of Interest');
  Set_Map(51,point,{}, 'Point Of Interest');
TB_Point.setValue(KoordT);
// Extract CH data
  dataCH = CH
  .select("CH_mm")
  .reduceRegion(ee.Reducer.mean(),point.buffer({distance:500}),250)
  .get("CH_mm");
  dataCHN = ee.Number(dataCH);print('dataCH',dataCHN);
  CH_Point.setValue(dataCHN.getInfo().toFixed(2));
// Extract LAI data
  dataLAI = LAI
  .select("Lai")
  .reduceRegion(ee.Reducer.mean(),point.buffer({distance:500}),250)
  .get("Lai");
  dataLAIN = ee.Number(dataLAI);print('dataLAI',dataLAIN);
// Extract SLOPE data
  dataSLOPE = SLOPE
  .select("slope")
  .reduceRegion(ee.Reducer.mean(),point.buffer({distance:500}),250)
  .get("slope");
  dataSLOPEN = ee.Number(dataSLOPE);print('dataSLOPE',dataSLOPEN);
LAI_Point.setValue(dataLAIN.getInfo().toFixed(2)+','+dataSLOPEN.getInfo().toFixed(2));
// Extract PET data
  dataPET = PET
  .select("PET")
  .reduceRegion(ee.Reducer.mean(),point.buffer({distance:500}),250)
  .get("PET");
  dataPETN = ee.Number(dataPET);print('dataPET',dataPETN);
  PET_Point.setValue(dataPETN.getInfo().toFixed(2));
// Extract KC data
  dataKC = PET
  .select("Kc")
  .reduceRegion(ee.Reducer.mean(),point.buffer({distance:500}),250)
  .get("Kc");
  dataKcN = ee.Number(dataKC);print('dataKC',dataKcN);//sssssssssssssssssssssssssss 
// Extract SWC data
  dataSWC = PET
  .select("SMmm")
  .reduceRegion(ee.Reducer.mean(),point.buffer({distance:500}),250)
  .get("SMmm");
  dataSWCN = ee.Number(dataSWC);print('dataSWC',dataSWCN);
KC_Point.setValue(dataKcN.getInfo().toFixed(2)+','+dataSWCN.getInfo().toFixed(2));
// Extract DEF data
  dataDEF = DEF
  .select("def")
  .reduceRegion(ee.Reducer.mean(),point.buffer({distance:500}),250)
  .get("def");
  dataDEFN = ee.Number(dataDEF);print('dataDEF',dataDEFN);
TB_Air.setValue(dataDEFN.getInfo().toFixed(5)+' mm');
Volume = dataDEFN.multiply(250).multiply(250).divide(1000);
TB_Volume.setValue(Volume.getInfo().toFixed(5)+' m3');
//Update Chart
  // var CCH=Prop(ee.ImageCollection(CH));
  // var c = ee.ImageCollection(PET).combine(CCH);
  // var chart = ui.Chart.image.regions(c.select(['SMmm','PET','CH_mm'],['SWC','PET','Prec']).first(), point.buffer({distance:1500}), null, 250);
  // chart.setSeriesNames(['Water Balance Parameters']);
  // chart.setOptions({
  //   vAxis: {
  //     title: '(mm)',
  //     titleTextStyle: {italic: false, bold: true}
  //   },colors: ["1d6b99"],isStacked: 'absolute'
  //   });
  // chart.setChartType('ColumnChart');
  // panel.widgets().set(18,chart);
  if(Feat_DI === DI_Rentang){ //DI_Feat[0]
    WB = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/WB_DI_Rentang_5YEARS");
  }
  else if(Feat_DI === DI_Manganti ){//DI_Feat[1]
    WB = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/WB_DI_Manganti_5YEARS");
  }
  else if(Feat_DI === DI_Jragung){//DI_Feat[2]
    WB = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/WB_DI_Jragung_5YEARS");
  }
  else WB = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/WB_DI_Rentang_5YEARS");
  var chartWB = ui.Chart.image.series(WB
  .select(['pr','pet','aet','swc','def','ro'],['Precipitation',
  'PotentialET','ActualET','Soil_Water','Deficit','Runoff']),point,ee.Reducer.mean(),250)
  chartWB.setOptions({
  vAxis: {
    title: '(mm)',
    titleTextStyle: {italic: false, bold: true}
  }
  });
panel.widgets().set(18,chartWB);
//Update ChartRPI
  if(Feat_DI === DI_Rentang){ //DI_Feat[0]
    RPI = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/RPI_DI_Rentang_5YEARS");
  }
  else if(Feat_DI === DI_Manganti ){//DI_Feat[1]
    RPI = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/RPI_DI_Manganti_5YEARS");
  }
  else if(Feat_DI === DI_Jragung){//DI_Feat[2]
    RPI = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/RPI_DI_Jragung_5YEARS");
  }
  else RPI = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/RPI_DI_Rentang_5YEARS");
  var chartRPI = ui.Chart.image.series(RPI
  .select('RPI'),point,ee.Reducer.mean(),10)
  chartRPI.setSeriesNames(['Ratio Polatization Index']);
  chartRPI.setOptions({
  vAxis: {
    title: 'RPI',
    titleTextStyle: {italic: false, bold: true}
  }
  });
  panel.widgets().set(22,chartRPI);
});//end map click
ButtS2.onClick(function(){
  RemoveLayer('RGB NCC S2 Mosaik');
  var VisRGB_NCC_S2 = {min:[-0.08,-0.08,-0.08],max:[0.33,0.38,0.29],bands:['Swir1','Nir','Green'] };
  Data_S2 = ImgCol(Feat_DI,TglS,TglE,'S2k');print('Data_S2',Data_S2);
  Set_Map(9,Data_S2.median()
  .select(['NDBI','EVI','NDWI','UBlue','Blue','Green','Red','Nir','Swir1','Swir2'])
  .clip(Feat_DI.geometry().bounds()),
  VisRGB_NCC_S2,
  'RGB NCC S2 Mosaik');
});
ButtS1.onClick(function(){
  if(Feat_DI === DI_Rentang){ //DI_Feat[0]
    Data_S1 = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/S1_DI_Rentang_5YEARS");
  }
  else if(Feat_DI === DI_Manganti ){//DI_Feat[1]
    Data_S1 = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/S1_DI_Manganti_5YEARS");
  }
  else if(Feat_DI === DI_Jragung){//DI_Feat[2]
    Data_S1 = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/S1_DI_Jragung_5YEARS");
  }
  else Data_S1 = ee.ImageCollection("projects/ee-muhammadzainalsalim/assets/S1_DI_Rentang_5YEARS");
  Data_S1 = Data_S1.map(RGBS1_dB);
  Data_S1 = Data_S1.filterDate(TglS,TglE);print('Data_S1',Data_S1);
  var BndRGB_S1 = ['VV','VH','DP','API','RPI','NDPI','VH_Int'];
  var VisRGB_NCC_S1 = {min:[-16,-24,1],max:[0,-7,24],bands:['VV','VH','DP'] };
  RemoveLayer('RGB NCC S1 Mosaik');
  Set_Map(10,Data_S1.mean()
  .clip(Feat_DI.geometry().bounds()),
  VisRGB_NCC_S1,
  'RGB NCC S1 Mosaik');
});
//FUNCTION#################################################################################
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
function UI_Style(UI,Siz,Warna,NorBold,Align,maxW) {
  return UI.style().
  set({fontSize : Siz+'px',
  color : Warna,
  fontWeight : NorBold,
  textAlign: Align,
  maxWidth: maxW+'Px'
  }); // Align : ['left','center' ], fontWeight:'normal', 'bold' /size}
}
function RemoveLayer (name) {
  var layers = Map.layers();
  // list of layers names
  var names = [];
  layers.forEach(function(lay) {
    var lay_name = lay.getName();
    names.push(lay_name);
  });
  // get index
  var index = names.indexOf(name);
  if (index > -1) {
    // if name in names
    var layer = layers.get(index);
    Map.remove(layer);
  } else {
    print('Layer '+name+' not found');
  }
}
function Feat2Cent(Feat,Ops){
  var Feat_Cen = Feat_DI.geometry().centroid().coordinates().getInfo();
  var Feat_Cen_Dict = {lon: Feat_Cen[0].toFixed(6), lat: Feat_Cen[1].toFixed(6)};
  if (Ops == 'txt') return Feat_Cen[0].toFixed(6)+', '+ Feat_Cen[1].toFixed(6);
  else if (Ops == 'point') return ee.geometry.Point(Feat_Cen[0], Feat_Cen[0]);
  else return Feat_Cen_Dict;
}
function Feat2Img(Feat,Val,Tebal) {
  return ee.Image().toByte().paint(Feat, Val, Tebal);
}
function Set_Map(No,Obj,Vis,Ket,Opsi,Opac) {
return Map.layers().set(No, ui.Map.Layer(Obj, Vis,Ket,Opsi,Opac));
}
function UI_Style(UI,Siz,Warna,NorBold,Align) {
  return UI.style().
  set({fontSize : Siz+'px',
  color : Warna,
  fontWeight : NorBold,
  textAlign: Align}); // Align : ['left','center' ], fontWeight:'normal', 'bold' /size}
}
function Kalib_Chirp(TglS,TglE,Pd) {// Pd : Periode 5,8,10 Harian
  // Chirp : Olah Chirps aktual
  var Data_CH = ee.ImageCollection("UCSB-CHG/CHIRPS/DAILY");
  var Scld;
  var Pilih_CH = 'Real';
  if (Pilih_CH == 'Real') Scld=1 ; else Scld=10;
  var Hujan =  Data_CH.map(function(img){
    return img.resample('bicubic').reproject('EPSG:4326', null, 250);
  })
  .filterDate(TglS,TglE).filterBounds(Bts)  
  .sum().divide(Scld);
  if (Hujan < 0) Hujan = 0.1 ; //biar gak masked
  else Hujan = (Hujan.multiply(0.46)).subtract(0.7461);  //0.8461-0.46*Hujan + 0.1; 
  Hujan = Hujan.rename('CH_mm').toFloat()
  .set('system:time_start',TglS)
  .set('system:time_end',TglE);
  return Hujan.clip(Feat_DI); //res 250;
}
function Div10Clip(img){
  return img.divide(10).toFloat().clip(Feat_DI)
    .copyProperties(img,['system:time_start','system:time_end','system:index']);
}
function ResamBilPro10(ImgC){ // 30m TO 10 m
  var transform_new = [Mtr2Deg(10),0,ULx,0,Mtr2Deg(-10),ULy];
  return ImgC.resample('bilinear').reproject(
  {
  crs: 'EPSG:4326',
  crsTransform: transform_new
});
}
function ResamBilPro250(ImgC){ // 500m TO 250 m
  var transform_new = [Mtr2Deg(250),0,ULx,0,Mtr2Deg(-250),ULy];
  return ImgC.resample('bilinear').reproject(
  {
  crs: 'EPSG:4326',
  crsTransform: transform_new
});
}
function ResamBicPro250(ImgC){ // 1 Km TO 250 m
  var transform_new = [Mtr2Deg(250),0,ULx,0,Mtr2Deg(-250),ULy];
  return ImgC.resample('bicubic').reproject(
  {
  crs: 'EPSG:4326',
  crsTransform: transform_new
});
}
function Deg2m(Deg){
  return Deg*250.69149326645208/0.002252;
}
function Mtr2Deg(Mtr){
  return Mtr*0.002252/250.69149326645208;
}
function Kord2Geom(Kords,Ops,Lbl) {
  var Geom; if (Ops == 'Point') Geom = ee.Geometry.Point(Kords);
  else if (Ops == 'Line') Geom = ee.Geometry.LineString(Kords);
  else if (Ops == 'Rect') Geom = ee.Geometry.Rectangle(Kords);
  else Geom = ee.Geometry.Polygon(Kords);
  if ( Lbl !== 0) Geom = ee.Feature(Geom).set('Label',Ldabl);
  return Geom;
}
function Prop(ImgC) {//ubah porp metadata to string
  var Img=[], ImgS=[];
  var JumLst=JumDat(ImgC,1);
  var LstImgCol = List_ImgCol(ImgC);
  for(var i =0;i<JumLst;i++){
    var ImgCOL;
    Img [i] = ee.Image(LstImgCol.get(i));
    ImgS [i]= Img[i]
    .set('system:time_start',ee.Date(Img [i].get('system:time_start')).format())
    .set('system:time_end',ee.Date(Img [i].get('system:time_end')).format())
    .set('system:index',ee.Number(i).format());
    ImgCOL = ImgS;
  }
  return ee.ImageCollection(ImgS);
}
function JumDat(VirImg,Arr) {// Hitung Jumlah data dlm Virtual atw Array Img
  if (Arr !==0) return VirImg.size().getInfo();
  else return ee.List(VirImg).length().getInfo();
}
function List_ImgCol(ImgCol) {
  return ImgCol.toList(ImgCol.size());
}
function ImgCol(Bounds,TglS,TglE,Opsi) {
  var JumLst,LstImgs,LstTgl,Data,Img_Id;
  if(Opsi=='S2k')Img_Id='COPERNICUS/S2_SR';
  else if(Opsi=='L8')Img_Id='LANDSAT/LC08/C02/T1_L2';
  else if(Opsi=='S1')Img_Id='COPERNICUS/S1_GRD';
  else Img_Id = Opsi;
  Data= ee.ImageCollection(Img_Id).filterBounds(Bounds);
  if(Opsi=='S2k') Data=Data.map(Div10K_S2k).map(RenBndS2).map(AddBands_Idx);
  if(Opsi=='L8') Data=Data.map(applyScaleFactors).map(CMsk.RenBndL8b).map(CMsk.AddBands_Idx);
  if(Opsi=='S1') Data=S1_Indo.filterBounds(Bounds);
  Data = Data.filterDate(TglS,TglE);
  Data = Data.sort('system:time_start');LstImgs = Lst_Imgs(Data); JumLst = JumEl(LstImgs);
  return Data;
}
// #Div10K_S2k
function Div10K_S2k(image) {
  var opticalBands = image.select('B.*').divide(10000).toFloat();
  return image.addBands(opticalBands, null, true)}
// #RenBndS2
function RenBndS2 (Img) {
  var BndS2a = ['B1','B2','B3', 'B4','B5','B6', 'B7','B8A','B8', 'B11','B12','SCL'];
  var Ren_BndS2 = ['UBlue','Blue','Green', 'Red','RdE1','RdE2','RdE3','RdE4', 'Nir','Swir1','Swir2','SCL'];
  return Img.select(BndS2a,Ren_BndS2);
}
// #AddBands_Idx
function AddBands_Idx(image){ // Index EVI,NDWI,NDBI   
  var ndvi = image.normalizedDifference(['Nir', 'Red']).rename('NDVI').toFloat();
  var ndwi = image.normalizedDifference(['Green', 'Swir2']).rename('NDWI').toFloat();
  var mndwi = image.normalizedDifference(['Green', 'Swir1']).rename('MNDWI').toFloat();
  var ndbi = image.normalizedDifference(['Swir1', 'Nir']).rename('NDBI').toFloat();
  var evi = image.expression("(RED < NIR || BLUE < RED) ? L*2.5*((NIR-RED)/(L+NIR+6*RED-7.5*BLUE))"+
  ":L*1.5*((NIR-RED)/(L/2+NIR+RED))"
    ,{NIR: image.select('Nir'),RED: image.select('Red'),BLUE: image.select('Blue'),L: 1}).rename('EVI').toFloat();
  var Msk = ndvi.expression('(vi <= -1.0 || vi >= 1.0 || iv <= -1.0 || iv >= 1.0) ? 0:1',{vi:ndvi,iv:evi});
 // var bui = ndbi.subtract(evi).rename('BUI');
  return image.addBands(ndbi).addBands(evi).addBands(ndwi).addBands(ndvi).addBands(mndwi).updateMask(Msk); 
 }
 //#Lst_Imgs
function Lst_Imgs(ImgCol) { 
return ImgCol.toList(ImgCol.size()); // tinggal tambah : ee.Image
}
//#JumEl
function JumEl(ArObj,Opsi) {
  if (Opsi > 0) return ee.List(ArObj).size().getInfo(); else 
  return ee.List(ArObj).length().getInfo();
}
function RGBS1_dB(ImgS1) {
  var VV = ImgS1.select('VH_Int').divide(ImgS1.select('RPI')).toFloat().rename('VV_Int');
  var VV_dB = (VV.log10()).multiply(10).rename('VV'),VH_dB = (ImgS1.select('VH_Int').log10()).multiply(10).rename('VH'),
  DP = VV_dB.subtract(VH_dB).rename('DP');
  var Img_Gab = VV_dB.addBands(VH_dB).addBands(DP).addBands(ImgS1).copyProperties(ImgS1,
  ['system:index','system:time_start','system:time_end']);
  return Img_Gab;
}
function cekTgl (){
  print('cek.start()',TglS)
  diffday = TglS.difference(ee.Date(LstTgl10d[0][0]),'day').getInfo()
  print('diffday',diffday)
  idxTgl = Math.floor(diffday / 10); 
  if (idxTgl>=JumPd)idxTgl=JumPd-1
  print('idxTgl',idxTgl);
  print(LstTgl10d[idxTgl][0])
  greg = LstTgl10d[idxTgl]
  return greg;
}