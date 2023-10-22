var sentinel = ui.import && ui.import("sentinel", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    Fujian = ui.import && ui.import("Fujian", "table", {
      "id": "users/205527006/bianjie/Fujian_province"
    }) || ee.FeatureCollection("users/205527006/bianjie/Fujian_province"),
    Fujian_city = ui.import && ui.import("Fujian_city", "table", {
      "id": "users/205527006/APP_date/fujian2"
    }) || ee.FeatureCollection("users/205527006/APP_date/fujian2"),
    ImgRice2019 = ui.import && ui.import("ImgRice2019", "image", {
      "id": "users/205527006/APP_date/Rice2019"
    }) || ee.Image("users/205527006/APP_date/Rice2019"),
    ImgRice2020 = ui.import && ui.import("ImgRice2020", "image", {
      "id": "users/205527006/APP_date/Rice2020"
    }) || ee.Image("users/205527006/APP_date/Rice2020"),
    ImgMCI2019 = ui.import && ui.import("ImgMCI2019", "image", {
      "id": "users/205527006/APP_date/MCI2019"
    }) || ee.Image("users/205527006/APP_date/MCI2019"),
    ImgMCI2020 = ui.import && ui.import("ImgMCI2020", "image", {
      "id": "users/205527006/APP_date/MCI2020"
    }) || ee.Image("users/205527006/APP_date/MCI2020"),
    cropland_30 = ui.import && ui.import("cropland_30", "image", {
      "id": "users/1367683089/Dalunwen/farmland30"
    }) || ee.Image("users/1367683089/Dalunwen/farmland30"),
    China_town = ui.import && ui.import("China_town", "table", {
      "id": "users/205527006/bianjie/china_town"
    }) || ee.FeatureCollection("users/205527006/bianjie/china_town");
var Fujian_town =  China_town.filterMetadata('SJMC','equals','福建省');
// //-------------------------------------设置地图上控件的可见性------------------------------------------
var mapPanel = ui.Map();
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
mapPanel.setCenter( 118.05,26.26,8);
// ------------------------------------栅格数据预处理（裁剪、重新赋值、重命名 ）-------------------------------------------------
var cropland1=cropland_30.where(cropland_30.eq(41).or(cropland_30.eq(42)),20);
ImgRice2019 = ImgRice2019.updateMask(cropland1.eq(20)).clip(Fujian).updateMask(ImgRice2019.gte(1));
ImgRice2020 = ImgRice2020.updateMask(cropland1.eq(20)).clip(Fujian).updateMask(ImgRice2020.gte(1));
ImgMCI2019 = ImgMCI2019.updateMask(cropland1.eq(20)).clip(Fujian).updateMask(ImgMCI2019.gte(0));
ImgMCI2020 = ImgMCI2020.updateMask(cropland1.eq(20)).clip(Fujian).updateMask(ImgMCI2020.gte(0));
ImgRice2019 = ImgRice2019.where(ImgRice2019.eq(3),2);
ImgRice2019 = ImgRice2019.where(ImgRice2019.eq(4),3);
ImgRice2020 = ImgRice2020.where(ImgRice2020.eq(3),2);
ImgRice2020 = ImgRice2020.where(ImgRice2020.eq(4),3);
var ImgRice20191 = ImgRice2019.rename("ImgRice2019");
var ImgRice20201 = ImgRice2020.rename("ImgRice2020");
var ImgMCI20191 = ImgMCI2019.rename("ImgMCI2019");
var ImgMCI20201 = ImgMCI2020.rename("ImgMCI2020");
//-------------------------------将福建省各市不同水稻种植类型的值矢量转栅格 -----------------------
var Rice20191 = Fujian_city.reduceToImage(['Rice2019'],ee.Reducer.first());
var SRice20191 = Fujian_city.reduceToImage(['2019SRice'],ee.Reducer.first());
var RiceP20191 = Fujian_city.reduceToImage(['2019RiceP'],ee.Reducer.first());
var DRice20191 = Fujian_city.reduceToImage(['2019DRice'],ee.Reducer.first());
var Rice20201 = Fujian_city.reduceToImage(['Rice2020'],ee.Reducer.first());
var SRice20201 = Fujian_city.reduceToImage(['2020SRice'],ee.Reducer.first());
var RiceP20201 = Fujian_city.reduceToImage(['2020RiceP'],ee.Reducer.first());
var DRice20201 = Fujian_city.reduceToImage(['2020DRice'],ee.Reducer.first());
var MCI20191   = Fujian_city.reduceToImage(['MCI2019'],ee.Reducer.first());
var MCI_020191 = Fujian_city.reduceToImage(['MCI2019_0'],ee.Reducer.first());
var MCI_120191 = Fujian_city.reduceToImage(['MCI2019_1'],ee.Reducer.first());
var MCI_220191 = Fujian_city.reduceToImage(['MCI2019_2'],ee.Reducer.first());
var MCI_320191 = Fujian_city.reduceToImage(['MCI2019_3'],ee.Reducer.first());
var MCI20201   = Fujian_city.reduceToImage(['MCI2020'],ee.Reducer.first());
var MCI_020201 = Fujian_city.reduceToImage(['MCI2020_0'],ee.Reducer.first());
var MCI_120201 = Fujian_city.reduceToImage(['MCI2020_1'],ee.Reducer.first());
var MCI_220201 = Fujian_city.reduceToImage(['MCI2020_2'],ee.Reducer.first());
var MCI_320201 = Fujian_city.reduceToImage(['MCI2020_3'],ee.Reducer.first());
//---------------------------------将福建省各市的值备份------------------------------------------------ 
var Rice2019 =  Rice20191 ;
var SRice2019 = SRice20191 ;
var RiceP2019 = RiceP20191 ;
var DRice2019 = DRice20191 ;
var Rice2020 = Rice20201 ;
var SRice2020 = SRice20201 ;
var RiceP2020 = RiceP20201 ;
var DRice2020 = DRice20201 ;
var MCI2019   = MCI20191;
var MCI_02019 = MCI_020191;
var MCI_12019 = MCI_120191;
var MCI_22019 = MCI_220191;
var MCI_32019 = MCI_320191;
var MCI2020   = MCI20201;
var MCI_02020 = MCI_020201;
var MCI_12020 = MCI_120201;
var MCI_22020 = MCI_220201;
var MCI_32020 = MCI_320201;
//------------------------------------将福建省各市的值重新赋值 ------------------------------------------ 
var variable_list = ee.ImageCollection([Rice2019,SRice2019,RiceP2019,DRice2019,Rice2020,SRice2020,RiceP2020,DRice2020,
                    MCI2019,MCI_02019,MCI_12019,MCI_22019,MCI_32019,MCI2020,MCI_02020,MCI_12020,MCI_22020,MCI_32020]);
// print(variable_list,'variable_list')
var ziduan_list = ee.List(['Rice2019','2019SRice','2019RiceP','2019DRice','Rice2020','2020SRice','2020RiceP','2020DRice','MCI2019','MCI2019_0',
                          'MCI2019_1','MCI2019_2','MCI2019_3','MCI2020','MCI2020_0','MCI2020_1','MCI2020_2','MCI2020_3']);
var name_list=ee.List(['Rice2019','SRice2019','RiceP2019','DRice2019','Rice2020','SRice2020','RiceP2020','DRice2020','MCI2019','MCI_02019',
                      'MCI_12019','MCI_22019','MCI_32019','MCI2020','MCI_02020','MCI_12020','MCI_22020','MCI_32020']);
// print(ccc,'ccc');
var jieguo=[];
for (var i=0; i<18; i++){
  var m = ziduan_list.get(i);
  var ccc = ee.Image(variable_list.toList(18).get(i));
  var imaname=ee.String(name_list.get(i));
  // -----------------------------按照从小打到的顺序取出数字--------------------------------------------- 
  var a = ee.Feature(Fujian_city.sort(m,false).toList(9).get(0)).get(m);
  var b = ee.Feature(Fujian_city.sort(m,false).toList(9).get(1)).get(m);
  var c = ee.Feature(Fujian_city.sort(m,false).toList(9).get(2)).get(m);
  var d = ee.Feature(Fujian_city.sort(m,false).toList(9).get(3)).get(m);
  var e = ee.Feature(Fujian_city.sort(m,false).toList(9).get(4)).get(m);
  var f = ee.Feature(Fujian_city.sort(m,false).toList(9).get(5)).get(m);
  var g = ee.Feature(Fujian_city.sort(m,false).toList(9).get(6)).get(m);
  var h = ee.Feature(Fujian_city.sort(m,false).toList(9).get(7)).get(m);
  var k = ee.Feature(Fujian_city.sort(m,false).toList(9).get(8)).get(m);
  var A =ee.Image(ee.Number(a));
  var B =ee.Image(ee.Number(b));
  var C =ee.Image(ee.Number(c));
  var D =ee.Image(ee.Number(d));
  var E =ee.Image(ee.Number(e));
  var F =ee.Image(ee.Number(f));
  var G =ee.Image(ee.Number(g));
  var H =ee.Image(ee.Number(h));
  var K =ee.Image(ee.Number(k));
 // ----------------------------- 将图像重新赋值 -------------------------------------------
  ccc = ccc.where(ccc.eq(A),1);
  ccc = ccc.where(ccc.eq(B),2);
  ccc = ccc.where(ccc.eq(C),3);
  ccc = ccc.where(ccc.eq(D),4);
  ccc = ccc.where(ccc.eq(E),5);
  ccc = ccc.where(ccc.eq(F),6);
  ccc = ccc.where(ccc.eq(G),7);
  ccc = ccc.where(ccc.eq(H),8);
  ccc = ccc.where(ccc.eq(K),9);
  var ccc_name=ccc.rename(imaname);
  jieguo.push(ccc_name);
  var Palette = [ '#800026','#bd0026','#e31a1c','#fc4e2a',
    '#fd8d3c','#feb24c','#fed976','#ffeda0','#ffffcc'];
// Map.addLayer(ccc,{min:1,max:9,palette:Palette},'ccc');
}
jieguo = ee.ImageCollection(jieguo);
// -----------------------波段整合----------------------------------------------------
Rice2019 = ee.Image(jieguo.toList(18).get(0));
SRice2019 = ee.Image(jieguo.toList(18).get(1));
RiceP2019 = ee.Image(jieguo.toList(18).get(2));
DRice2019 = ee.Image(jieguo.toList(18).get(3));
Rice2020 = ee.Image(jieguo.toList(18).get(4));
SRice2020 = ee.Image(jieguo.toList(18).get(5));
RiceP2020 = ee.Image(jieguo.toList(18).get(6));
DRice2020 = ee.Image(jieguo.toList(18).get(7));
MCI2019 = ee.Image(jieguo.toList(18).get(8));
MCI_02019 = ee.Image(jieguo.toList(18).get(9));
MCI_12019 = ee.Image(jieguo.toList(18).get(10));
MCI_22019 = ee.Image(jieguo.toList(18).get(11));
MCI_32019 = ee.Image(jieguo.toList(18).get(12));
MCI2020 = ee.Image(jieguo.toList(18).get(13));
MCI_02020 = ee.Image(jieguo.toList(18).get(14));
MCI_12020 = ee.Image(jieguo.toList(18).get(15));
MCI_22020 = ee.Image(jieguo.toList(18).get(16));
MCI_32020 = ee.Image(jieguo.toList(18).get(17));
// print(RiceP2019,'RiceP2019');
// Map.addLayer(RiceP2019,{min:1,max:9,palette:Palette},'RiceP2019');
var rec = Rice2019.addBands(SRice2019).addBands(RiceP2019).addBands(DRice2019).addBands(Rice2020).addBands(SRice2020).addBands(RiceP2020).addBands(DRice2020)
         .addBands(MCI2019).addBands(MCI_02019).addBands(MCI_12019).addBands(MCI_22019).addBands(MCI_32019)
         .addBands(MCI2020).addBands(MCI_02020).addBands(MCI_12020).addBands(MCI_22020).addBands(MCI_32020)
         .addBands(ImgRice20191).addBands(ImgRice20201).addBands(ImgMCI20191).addBands(ImgMCI20201);
//-----------------------------------------------图层展示 ------------------------------------------------------
// //图层属性 
var layerProperties;
function tuceng(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22){
//-----------------------------------------------种植模式 颜色显示设置-----------------------------------------------------------------
layerProperties = {
  '2019年水稻': {
    l:a1,
    name: 'Rice2019',
    str : 'Rice2019',
     visParams: {min:1,max:9,palette:[ 
  '#004529','#006837','#238443','#41ab5d',
  '#78c679','#addd8e','#d9f0a3','#f7fcb9','#ffffe5'
    ]},
    legend: [
   {'南平市': '#004529'},{'龙岩市': '#006837'},{'三明市': '#238443'},
   {'宁德市': '#41ab5d'},{'福州市': '#78c679'},{'漳州市': '#addd8e'},
   {'泉州市': '#d9f0a3'},{'莆田市': '#f7fcb9'},{'厦门市': '#ffffe5'}
   ],
    defaultVisibility: true,
  },
  '2019年单季稻': {
    l:a2,
    name: 'SRice2019',
    str : '2019SRice',
     visParams: {min:1,max:9,palette:[ 
  '#004529','#006837','#238443','#41ab5d',
  '#78c679','#addd8e','#d9f0a3','#f7fcb9','#ffffe5'
    ]},
    legend: [
   {'南平市': '#004529'},{'三明市': '#006837'},{'龙岩市': '#238443'},
   {'福州市': '#41ab5d'},{'宁德市': '#78c679'},{'泉州市': '#addd8e'},
   {'漳州市': '#d9f0a3'},{'莆田市': '#f7fcb9'},{'厦门市': '#ffffe5'}
   ],
    defaultVisibility: true,
  },
    '2019年水旱轮作': {
    l:a3,
    name: 'RiceP2019',
    str : '2019RiceP',
     visParams: {min:1,max:9,palette:[ 
  '#004529','#006837','#238443','#41ab5d',
  '#78c679','#addd8e','#d9f0a3','#f7fcb9','#ffffe5'
    ]}, 
   legend: [
   {'南平市': '#004529'},{'三明市': '#006837'},{'宁德市': '#238443'},
   {'龙岩市': '#41ab5d'},{'福州市': '#78c679'},{'漳州市': '#addd8e'},
   {'泉州市': '#d9f0a3'},{'莆田市': '#f7fcb9'},{'厦门市': '#ffffe5'}
   ],
    defaultVisibility: true,
  },
    '2019年双季稻': {
    l:a4,
    name: 'DRice2019',
    str : '2019DRice',
     visParams: {min:1,max:9,palette:[ 
  '#004529','#006837','#238443','#41ab5d',
  '#78c679','#addd8e','#d9f0a3','#f7fcb9','#ffffe5'
    ]},
   legend: [
   {'南平市': '#004529'},{'龙岩市': '#006837'},{'三明市': '#238443'},
   {'宁德市': '#41ab5d'},{'福州市': '#78c679'},{'漳州市': '#addd8e'},
   {'泉州市': '#d9f0a3'},{'莆田市': '#f7fcb9'},{'厦门市': '#ffffe5'}
   ],
    defaultVisibility: true,
  },
    '2020年水稻': {
    l:a5,
    name: 'Rice2020',
    str : 'Rice2020',
     visParams: {min:1,max:9,palette:[ 
  '#004529','#006837','#238443','#41ab5d',
  '#78c679','#addd8e','#d9f0a3','#f7fcb9','#ffffe5'
    ]},
   legend: [
   {'南平市': '#004529'},{'三明市': '#006837'},{'龙岩市': '#238443'},
   {'宁德市': '#41ab5d'},{'福州市': '#78c679'},{'漳州市': '#addd8e'},
   {'泉州市': '#d9f0a3'},{'莆田市': '#f7fcb9'},{'厦门市': '#ffffe5'}
   ],
    defaultVisibility: true,
  },   
    '2020年单季稻': {
    l:a6,
    name: 'SRice2020',
    str : '2020SRice',
     visParams: {min:1,max:9,palette:[ 
  '#004529','#006837','#238443','#41ab5d',
  '#78c679','#addd8e','#d9f0a3','#f7fcb9','#ffffe5'
    ]},
    legend: [
   {'南平市': '#006837'},{'三明市': '#006837'},{'龙岩市': '#238443'},
   {'福州市': '#41ab5d'},{'宁德市': '#78c679'},{'泉州市': '#addd8e'},
   {'漳州市': '#d9f0a3'},{'莆田市': '#f7fcb9'},{'厦门市': '#ffffe5'}
   ],    
    defaultVisibility: true,
  },
    '2020年水旱轮作': {
    l:a7,
    name: 'RiceP2020',
    str : '2020RiceP',
     visParams: {min:1,max:9,palette:[ 
  '#004529','#006837','#238443','#41ab5d',
  '#78c679','#addd8e','#d9f0a3','#f7fcb9','#ffffe5'
    ]},
   legend: [
   {'南平市': '#004529'},{'三明市': '#006837'},{'宁德市': '#238443'},
   {'龙岩市': '#41ab5d'},{'福州市': '#78c679'},{'泉州市': '#addd8e'},
   {'漳州市': '#d9f0a3'},{'莆田市': '#f7fcb9'},{'厦门市': '#ffffe5'}
   ],
    defaultVisibility: true,
  },
    '2020年双季稻': {
    l:a8,
    name: 'DRice2020',
    str : '2020DRice',
     visParams: {min:1,max:9,palette:[ 
  '#004529','#006837','#238443','#41ab5d',
  '#78c679','#addd8e','#d9f0a3','#f7fcb9','#ffffe5'
    ]}, 
   legend: [
   {'南平市': '#004529'},{'龙岩市': '#006837'},{'三明市': '#238443'},
   {'宁德市': '#41ab5d'},{'福州市': '#78c679'},{'漳州市': '#addd8e'},
   {'泉州市': '#d9f0a3'},{'莆田市': '#f7fcb9'},{'厦门市': '#ffffe5'}
   ],
    defaultVisibility: true,
  },
    '2019年复种指数' : {
    l:a9,
    name: 'MCI2019',
    str : 'MCI2019',
     visParams: {min:1,max:9,palette:[ 
  '#800026','#bd0026','#e31a1c','#fc4e2a',
  '#fd8d3c','#feb24c','#fed976','#ffeda0','#ffffcc'
    ]}, 
   legend: [
   {'漳州市': '#800026'},{'三明市': '#bd0026'},{'宁德市': '#e31a1c'},
   {'莆田市': '#fc4e2a'},{'龙岩市': '#fd8d3c'},{'南平市': '#feb24c'},
   {'福州市': '#fed976'},{'泉州市': '#ffeda0'},{'厦门市': '#ffffcc'}
   ],
    defaultVisibility: true,
  },
    '2019年休耕' : {
    l:a10,
    name: 'MCI_02019',
    str : 'MCI2019_0',
     visParams: {min:1,max:9,palette:[ 
  '#800026','#bd0026','#e31a1c','#fc4e2a',
  '#fd8d3c','#feb24c','#fed976','#ffeda0','#ffffcc'
    ]}, 
   legend: [
   {'福州市': '#800026'},{'泉州市': '#bd0026'},{'南平市': '#e31a1c'},
   {'漳州市': '#fc4e2a'},{'龙岩市': '#fd8d3c'},{'莆田市': '#feb24c'},
   {'宁德市': '#fed976'},{'三明市': '#ffeda0'},{'厦门市': '#ffffcc'}
   ],
    defaultVisibility: true,
  },
    '2019年单季作物' : {
    l:a11,
    name: 'MCI_12019',
    str : 'MCI2019_1',
     visParams: {min:1,max:9,palette:[ 
  '#800026','#bd0026','#e31a1c','#fc4e2a',
  '#fd8d3c','#feb24c','#fed976','#ffeda0','#ffffcc'
    ]}, 
   legend: [
   {'南平市': '#800026'},{'龙岩市': '#bd0026'},{'三明市': '#e31a1c'},
   {'福州市': '#fc4e2a'},{'宁德市': '#fd8d3c'},{'泉州市': '#feb24c'},
   {'漳州市': '#fed976'},{'莆田市': '#ffeda0'},{'厦门市': '#ffffcc'}
   ],
    defaultVisibility: true,
  },
    '2019年双季作物' : {
    l:a12,
    name: 'MCI_22019',
    str : 'MCI2019_2',
     visParams: {min:1,max:9,palette:[ 
  '#800026','#bd0026','#e31a1c','#fc4e2a',
  '#fd8d3c','#feb24c','#fed976','#ffeda0','#ffffcc'
    ]}, 
   legend: [
   {'南平市': '#800026'},{'三明市': '#bd0026'},{'龙岩市': '#e31a1c'},
   {'宁德市': '#fc4e2a'},{'福州市': '#fd8d3c'},{'泉州市': '#feb24c'},
   {'漳州市': '#fed976'},{'莆田市': '#ffeda0'},{'厦门市': '#ffffcc'}
   ],
    defaultVisibility: true,
  },  
    '2019年三季作物' : {
    l:a13,
    name: 'MCI_32019',
    str : 'MCI2019_3',
     visParams: {min:1,max:9,palette:[ 
  '#800026','#bd0026','#e31a1c','#fc4e2a',
  '#fd8d3c','#feb24c','#fed976','#ffeda0','#ffffcc'
    ]}, 
   legend: [
   {'福州市': '#800026'},{'泉州市': '#bd0026'},{'南平市': '#e31a1c'},
   {'漳州市': '#fc4e2a'},{'龙岩市': '#fd8d3c'},{'莆田市': '#feb24c'},
   {'宁德市': '#fed976'},{'三明市': '#ffeda0'},{'厦门市': '#ffffcc'}
   ],
    defaultVisibility: true,
  },   
    '2020年复种指数' : {
    l:a14,
    name: 'MCI2020',
    str : 'MCI2020',
     visParams: {min:1,max:9,palette:[ 
  '#800026','#bd0026','#e31a1c','#fc4e2a',
  '#fd8d3c','#feb24c','#fed976','#ffeda0','#ffffcc'
    ]}, 
   legend: [
   {'龙岩市': '#800026'},{'三明市': '#bd0026'},{'莆田市': '#e31a1c'},
   {'宁德市': '#fc4e2a'},{'南平市': '#fd8d3c'},{'福州市': '#feb24c'},
   {'漳州市': '#fed976'},{'泉州市': '#ffeda0'},{'厦门市': '#ffffcc'}
   ],
    defaultVisibility: true,
  },
    '2020年休耕' : {
    l:a15,
    name: 'MCI_02020',
    str : 'MCI2020_0',
     visParams: {min:1,max:9,palette:[ 
  '#800026','#bd0026','#e31a1c','#fc4e2a',
  '#fd8d3c','#feb24c','#fed976','#ffeda0','#ffffcc'
    ]}, 
   legend: [
   {'福州市': '#800026'},{'泉州市': '#bd0026'},{'南平市': '#e31a1c'},
   {'漳州市': '#fc4e2a'},{'莆田市': '#fd8d3c'},{'龙岩市': '#feb24c'},
   {'宁德市': '#fed976'},{'三明市': '#ffeda0'},{'厦门市': '#ffffcc'}
   ],
    defaultVisibility: true,
  },
    '2020年单季作物' : {
    l:a16,
    name: 'MCI_12020',
    str : 'MCI2020_1',
     visParams: {min:1,max:9,palette:[ 
  '#800026','#bd0026','#e31a1c','#fc4e2a',
  '#fd8d3c','#feb24c','#fed976','#ffeda0','#ffffcc'
    ]}, 
   legend: [
   {'南平市': '#800026'},{'三明市': '#bd0026'},{'龙岩市': '#e31a1c'},
   {'宁德市': '#fc4e2a'},{'福州市': '#fd8d3c'},{'漳州市': '#feb24c'},
   {'泉州市': '#fed976'},{'莆田市': '#ffeda0'},{'厦门市': '#ffffcc'}
   ],
    defaultVisibility: true,
  },
    '2020年双季作物' : {
    l:a17,
    name: 'MCI_22020',
    str : 'MCI2020_2',
     visParams: {min:1,max:9,palette:[ 
  '#800026','#bd0026','#e31a1c','#fc4e2a',
  '#fd8d3c','#feb24c','#fed976','#ffeda0','#ffffcc'
    ]}, 
   legend: [
   {'南平市': '#800026'},{'龙岩市': '#bd0026'},{'三明市': '#e31a1c'},
   {'福州市': '#fc4e2a'},{'宁德市': '#fd8d3c'},{'泉州市': '#feb24c'},
   {'漳州市': '#fed976'},{'莆田市': '#ffeda0'},{'厦门市': '#ffffcc'}
   ],
    defaultVisibility: true,
  },  
    '2020年三季作物' : {
    l:a18,
    name: 'MCI_32020',
    str : 'MCI2020_3',
     visParams: {min:1,max:9,palette:[ 
  '#800026','#bd0026','#e31a1c','#fc4e2a',
  '#fd8d3c','#feb24c','#fed976','#ffeda0','#ffffcc'
    ]}, 
   legend: [
   {'龙岩市': '#800026'},{'三明市': '#bd0026'},{'福州市': '#e31a1c'},
   {'漳州市': '#fc4e2a'},{'泉州市': '#fd8d3c'},{'南平市': '#feb24c'},
   {'莆田市': '#fed976'},{'宁德市': '#ffeda0'},{'厦门市': '#ffffcc'}
   ],
    defaultVisibility: true,
  },  
  '2019年水稻分布情况': {
    l:a19,
    name: 'ImgRice2019',
    str : 'ImgRice2019',
    visParams: {min:1,max:3,palette:[ 
    '#ffffbf', '#fdae61','#d7191c'
]},
    legend: [
       {'单季水稻': '#ffffbf'},{'水旱轮作': '#fdae61'},{'双季稻': '#d7191c'}
       ],
    defaultVisibility: true,
  },
  '2020年水稻分布情况': {
    l:a20,
    name: 'ImgRice2020',
    str : 'ImgRice2020',
    visParams: {min:1,max:3,palette:[ 
    '#ffffbf', '#fdae61','#d7191c'
]},
    legend: [
       {'单季水稻': '#ffffbf'},{'水旱轮作': '#fdae61'},{'双季稻': '#d7191c'}
       ],
    defaultVisibility: true,
  },  
  '2019年复种分布情况': {
    l:a21,
    name: 'ImgMCI2019',
    str : 'ImgMCI2019',
    visParams: {min:0,max:3,palette:[ 
    '#CCCCFF', '#66FF33','#6699FF','#CC3333'
]},
    legend: [
        {'休耕': '#CCCCFF'}, {'单季': '#66FF33'},{'双季': '#6699FF'},{'三季': '#CC3333'}
       ],
    defaultVisibility: true,
  }, 
  '2020年复种分布情况': {
    l:a22,
    name: 'ImgMCI2020',
    str : 'ImgMCI2020',
    visParams: {min:0,max:3,palette:[ 
    '#CCCCFF', '#66FF33','#6699FF','#CC3333'
]},
    legend: [
        {'休耕': '#CCCCFF'}, {'单季': '#66FF33'},{'双季': '#6699FF'},{'三季': '#CC3333'}
       ],
    defaultVisibility: false,
  }, 
};
}
tuceng(Rice2019,SRice2019,RiceP2019,DRice2019,Rice2020,SRice2020,RiceP2020,DRice2020,
MCI2019,MCI_02019,MCI_12019,MCI_22019,MCI_32019,MCI2020,MCI_02020,MCI_12020,MCI_22020,MCI_32020,
ImgRice2019,ImgRice2020,ImgMCI2019,ImgMCI2020);
//---------------------------------将地图图层设置为最底层，设置交互地图颜色 
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = rec.select(layer.name).visualize(layer.visParams);
  mapPanel.add(ui.Map.Layer(image, {}, key, layer.defaultVisibility));
}
// console.log(layer.name);
//---------------------------添加APP标题------------------------------------------------------------------------------
var header = ui.Label('福建省农情信息可视化系统', {fontWeight: 'bold', fontSize: '30px', color: 'black'});
var toolPanel = ui.Panel([header], 'flow', {width: '500px'});
ui.root.widgets().add(toolPanel);
// ---------------------------------------------------------------------------------
//-----------------------------------------添加选择显示图层 下拉框-----刷新显示图层与查询图层-------------------------------------------
var crop_type = {
  '复种分布情况':{
    name: '复种分布情况'
  },
  '复种指数':{
    name: '复种指数'
  },
  '休耕':{
    name: '休耕'
  },
  '单季作物':{
    name: '单季作物'
  },
  '双季作物':{
    name: '双季作物'
  },
  '三季作物':{
    name: '三季作物'
  },
  '水稻分布情况':{
    name: '水稻分布情况'
  },  
  '水稻':{
    name: '水稻'
  },  
  '单季稻':{
    name: '单季稻'
  },
  '水旱轮作':{
    name: '水旱轮作'
  },
  '双季稻':{
    name: '双季稻'
  },
};
var years = {
  '2019':{
    name: '2019年'
  },
  '2020':{
    name: '2020年'
  },
}
// ------------------------------------设置年份下拉框 -------------------------
var im = MCI2020;
var years_str = '';
var layerSelect = ui.Select({
  items: Object.keys(years),//selectItems
  value: Object.keys(years)[0],//selectItems[0]
  onChange: function(selected) {
    years_str = years[selected].name;
    // console.log(years_str);
    Imggname();
  }
});
toolPanel.add(ui.Label('选择左侧界面需要展示制图结果', {'font-size': '16px'}));
toolPanel.add(ui.Label('选择年份', {'font-size': '16px'}));
toolPanel.add(layerSelect);
/////////////////////////////////////////设置作物类型下拉框 ///////////////////////////////
var crop_type_str = '';
var layerSelect = ui.Select({
  items: Object.keys(crop_type),//selectItems
  value: Object.keys(crop_type)[0],//selectItems[0]
  onChange: function(selected) {
    crop_type_str = crop_type[selected].name;
    // console.log(crop_type_str);
    crop_name();
    Imggname();
  }
});
toolPanel.add(ui.Label('选择显示类型 ', {'font-size': '16px'}));
toolPanel.add(layerSelect);
//////////////////////////////将年份和作物类型按钮的值组合 //////////////////////////////////////////////
var  result_name = '';
function Imggname(){
   result_name = years_str+crop_type_str;
   return result_name;
}
function crop_name(){
  return crop_type_str;
}
///////////////////////////////////////////////////////////确认按钮设置 //////////////////////////////////////////////////////
var newIm = '';
var cropname = '';
var btn = ui.Button({
 label: "确认",
 onClick: function() {
    var bb = Imggname();
    console.log(bb);
    var imT;
    mapPanel.layers().forEach(function(element, index)
    {
      element.setShown(bb == element.getName());
    });
    // mapPanel.layers().forEach(function(element, index)
    // {
    //   if (bb == "2019年单季稻" | bb == "2019年水旱轮作" | bb == "2019年双季稻" | bb == "2019年水稻"| bb == "2019年水稻分布情况"){
    //   element.setShown("2019年水稻分布情况" == element.getName());
    //   }
    // });
    if (bb == "2019年水稻分布情况" | bb == "2020年水稻分布情况" | bb == "2019年复种分布情况" | bb == "2020年复种分布情况") {
    var COUNTRIES_STYLE = {color: '252525', fillColor: '00000000'};
    mapPanel.addLayer(Fujian_town.style(COUNTRIES_STYLE));
    }
    var aa= bb.toString();
    imT=layerProperties[aa].l;
    // console.log(imT)
    setLegend(layerProperties[aa].legend);
    newIm=imT;
    cropname = ee.String(layerProperties[aa].str);
    console.log(cropname);
    getimgname();
 },
});
toolPanel.add(btn);
function getimgname(){
    return cropname;
}
/////////////////////////////////////////确认按钮结束 ///////////////////////////////////
toolPanel.add(ui.Label('在地图上任意点击一点，可统计该点所在省级或市级范围内各种植类型种植面积', {'font-size': '16px'}));
//---------------------------------------------添加图例----可公用----------------------------
var legendPanel = ui.Panel({
  style:
      {position:'bottom-left',
        fontSize: '16px', margin: '0 0 0 8px', padding: '0'}
});
//-------------------------------------------------图例标题------------------------------------
 var title = ui.Label({
   value: '图例',
   style: {
     fontWeight: 'bold',
     color: "red",
     fontSize: '16px'
   }
 });
 legendPanel.add(title);
// /////////////////////////////------------------左下角图例---------------- //////////////////////////////
var keyPanel = ui.Panel();
function setLegend(legend) {
  keyPanel.clear();
  for (var i = 0; i < legend.length; i++) {
    var item = legend[i];
    var name = Object.keys(item)[0];
    var color = item[name];
    var colorBox = ui.Label('', {
      backgroundColor: color,
      padding: '8px',
      margin: '0'
    });
    var description = ui.Label(name, {margin: '0 0 4px 6px'});
    keyPanel.add(
    ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
  }
}
//------------------------------------------添加透明度滑块--可公用-----------------------------------------
var checkbox = ui.Checkbox({
  label: '透明度',
  value: true,
  onChange: function(value) {
    var selected = layerSelect.getValue();
    mapPanel.layers().forEach(function(element, index) {
      element.setShown(selected == element.getName() ? value : false);
    });
    layerSelect.setDisabled(!value);
  }
});
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 0.7,
  step: 0.01,
});
opacitySlider.onSlide(function(value) {
  mapPanel.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
var viewPanel =ui.Panel([checkbox, opacitySlider], ui.Panel.Layout.Flow('horizontal'));
var combinePanel = ui.Panel([keyPanel,viewPanel],ui.Panel.Layout.Flow());
legendPanel.add(combinePanel);
mapPanel.add(legendPanel);
//---------------------------------------------透明度滑块end-------------------------------------------------
//////////////
//------------------------------查询排名水平--可公用---------------------------------------------------
////////////////////////// ----------=----------------------分省市级展示结果------------------ /////////////////////////////////////
var placesRegion = {
  '县域范围展示':{
    name: 'town',
  visParams1: {min:1,max:8,palette: [ 
  '#ffffbf',//2019年单季稻 
  '#fdae61',//2019年水旱轮作 
  '#d7191c',//2019双季稻 
  '#ffffbf',//2019年单季稻 
  '#fdae61',//2019年水旱轮作 
  '#d7191c',//2019双季稻 
  ]},
  leixing1:{'2019年单季稻':1,'2019年水旱轮作':2 ,'2019年双季稻':3,
            '2020年单季稻':4,'2020年水旱轮作':5, '2020年双季稻':6},
   visParams2: {min:1,max:8,palette: [ 
  '#CCCCFF',//2019年休耕 
  '#66FF33',//2019年单季作物 
  '#6699FF',//2019年双季作物 
  '#CC3333',//2019年三季作物 
  '#CCCCFF',//2020年休耕 
  '#66FF33',//2020年单季作物 
  '#6699FF',//2020年双季作物 
  '#CC3333',//2020年三季作物 
  ]},
  leixing2:{'2019年休耕':1,'2019年单季作物':2, '2019年双季作物':3,'2019年三季作物':4, 
            '2020年休耕':5,'2020年单季作物':6, '2020年双季作物':7,'2020年三季作物':8}  
  },  
  '市域范围展示':{
    name: 'city',
  visParams1: {min:1,max:8,palette: [ 
  '#1a9641',//2019年水稻 
  '#ffffbf',//2019年单季稻 
  '#fdae61',//2019年水旱轮作 
  '#d7191c',//2019双季稻 
  '#1a9641',//2020年水稻 
  '#ffffbf',//2019年单季稻 
  '#fdae61',//2019年水旱轮作 
  '#d7191c',//2019双季稻 
  ]},
  leixing1:{'2019年水稻':1,'2019年单季稻':2,'2019年水旱轮作':3 ,'2019年双季稻':4,
    '2020年水稻':5,'2020年单季稻':6,'2020年水旱轮作':7, '2020年双季稻':8},
   visParams2: {min:1,max:8,palette: [ 
  '#CCCCFF',//2019年休耕 
  '#66FF33',//2019年单季作物 
  '#6699FF',//2019年双季作物 
  '#CC3333',//2019年三季作物 
  '#CCCCFF',//2020年休耕 
  '#66FF33',//2020年单季作物 
  '#6699FF',//2020年双季作物 
  '#CC3333',//2020年三季作物 
  ]},
  leixing2:{'2019年休耕':1,'2019年单季作物':2, '2019年双季作物':3,'2019年三季作物':4, 
            '2020年休耕':5,'2020年单季作物':6, '2020年双季作物':7,'2020年三季作物':8}  
  },
  '省域范围展示':{
    name: 'province',
  visParams1: {min:1,max:9, palette: [ 
  '#004529','#006837','#238443','#41ab5d',//水稻颜色 
  '#78c679','#addd8e','#d9f0a3','#f7fcb9','#ffffe5'
  ]},  
  visParams2: {min:1,max:9, palette: [ 
  '#800026','#bd0026','#e31a1c',
  '#fc4e2a','#fd8d3c','#feb24c',
  '#fed976','#ffeda0','#ffffcc'
  ]},
    leixing1:{'南平市':1,'三明市':2,'龙岩市':3,
              '福州市':4,'宁德市':5,'泉州市':6,
              '漳州市':7,'莆田市':8,'厦门市':9
           },
    leixing2:{'南平市':1,'三明市':2,'宁德市':3,
              '龙岩市':4,'福州市':5,'漳州市':6,
              '泉州市':7,'莆田市':8,'厦门市':9
           },
    leixing3:{'南平市':1,'龙岩市':2,'三明市':3,
              '宁德市':4,'福州市':5,'漳州市':6,
              '泉州市':7,'莆田市':8,'厦门市':9
           },
    leixing4:{'南平市':1,'三明市':2,'龙岩市':3,
              '福州市':4,'宁德市':5,'泉州市':6,
              '漳州市':7,'莆田市':8,'厦门市':9
           },
    leixing5:{'南平市':1,'三明市':2,'宁德市':3,
              '龙岩市':4,'福州市':5,'泉州市':6,
              '漳州市':7,'莆田市':8,'厦门市':9
           },
    leixing6:{'南平市':1,'龙岩市':2,'三明市':3,
              '宁德市':4,'福州市':5,'漳州市':6,
              '泉州市':7,'莆田市':8,'厦门市':9
           },      
    leixing7:{'漳州市':1,'三明市':2,'宁德市':3,
              '莆田市':4,'龙岩市':5,'南平市':6,
              '福州市':7,'泉州市':8,'厦门市':9
           },
    leixing8:{'福州市':1,'泉州市':2,'南平市':3,
              '漳州市':4,'龙岩市':5,'莆田市':6,
              '宁德市':7,'三明市':8,'厦门市':9
           },
    leixing9:{'南平市':1,'龙岩市':2,'三明市':3,
              '福州市':4,'宁德市':5,'泉州市':6,
              '漳州市':7,'莆田市':8,'厦门市':9
           },
    leixing10:{'南平市':1,'三明市':2,'龙岩市':3,
               '宁德市':4,'福州市':5,'泉州市':6,
               '漳州市':7,'莆田市':8,'厦门市':9
           },
    leixing11:{'福州市':1,'泉州市':2,'南平市':3,
               '漳州市':4,'龙岩市':5,'莆田市':6,
               '宁德市':7,'三明市':8,'厦门市':9
           },    
    leixing12:{'龙岩市':1,'三明市':2,'莆田市':3,
               '宁德市':4,'南平市':5,'福州市':6,
               '漳州市':7,'泉州市':8,'厦门市':9
         },
    leixing13:{'福州市':1,'泉州市':2,'南平市':3,
               '漳州市':4,'莆田市':5,'龙岩市':6,
               '宁德市':7,'三明市':8,'厦门市':9
           },
    leixing14:{'南平市':1,'三明市':2,'龙岩市':3,
               '宁德市':4,'福州市':5,'漳州市':6,
               '泉州市':7,'莆田市':8,'厦门市':9
           },
    leixing15:{'南平市':1,'龙岩市':2,'三明市':3,
               '福州市':4,'宁德市':5,'泉州市':6,
               '漳州市':7,'莆田市':8,'厦门市':9
           },
    leixing16:{'龙岩市':1,'三明市':2,'福州市':3,
               '漳州市':4,'泉州市':5,'南平市':6,
               '莆田市':7,'宁德市':8,'厦门市':9
           },  
    leixing17:{'南平市':1,'龙岩市':2,'三明市':3,
               '宁德市':4,'福州市':5,'漳州市':6,
               '泉州市':7,'莆田市':8,'厦门市':9
           }, 
    leixing18:{'南平市':1,'三明市':2,'龙岩市':3,
               '宁德市':4,'福州市':5,'漳州市':6,
               '泉州市':7,'莆田市':8,'厦门市':9
           },             
  }
  }
  //////////////////////////////////////////////////////分省市级展示结果设置完成/////////////////////////////////////////////
///////////////////////////////////////////////////选择展示区域范围下拉框//////////////////////////////////// 
var placesRegion_str = '';
var layerSelect = ui.Select({
  items: Object.keys(placesRegion),//selectItems
  value: Object.keys(placesRegion)[0],//selectItems[0]
  onChange: function(selected) {
    placesRegion_str = selected;
    quyufanwei();
    console.log(placesRegion_str)
  }
});
function quyufanwei(){
   console.log(placesRegion_str);
   return placesRegion_str;
}
layerSelect.setPlaceholder('省域范围展示');
//水平排列 
var pan=ui.Panel([layerSelect],ui.Panel.Layout.Flow('horizontal'))
var locationPanel1= ui.Panel([
  ui.Label('选择图表展示行政区级别', {'font-size': '20px'}),pan]);
toolPanel.add(locationPanel1);
quyufanwei();
////////////////////////////------------------------------查询水平end-----------------------------------------------------
//------------------------------经纬度显示// 创建显示经纬度的标签-------------------------------------------------------
var lon = ui.Label();
var lat = ui.Label();
var LonLatP=ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal'))
toolPanel.add(LonLatP);
var initialPoint = ee.Geometry.Point(118.80, 26.85);
//------------------------------经纬度显示end---------------------------------------------------
//------------------------------------点击生成图表功能----------------------------------------
var histogram = ui.Panel()
  histogram.style().set({
  position: 'bottom-center'
});
var intro=ui.Panel();
var generateChart = function (coords) {
  quyufanwei();
  Imggname();
  crop_name();
  intro.clear();
  histogram.clear();
  lon.setValue('lon: ' + coords.lon.toFixed(2));
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'});
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(2, dot);
  var Pl = China_town.filterBounds(point);
  var image =Fujian_city ;//数据*********需要修改
  var region = Pl;
//点击图表功能 (先求影像属性在shp中新建属性)
//---------------------------获取点所在面的像元值-----------------------------
function leixingdata(point,corpimg){ ////需要根据点选城市确定城市编号  
  // var e = ee.Feature(Fujian_city.toList(9).get(city_number)).get(corpname);
  var value_point=corpimg.reduceRegions(point, ee.Reducer.first(),1).first();
  var point_value=ee.Number(value_point.get('first'));
  return point_value;
}
//---------------------------获取点所在的城市像元值-----------------------------
function citydata(imgname,city_number){
  var number = ee.Feature(Fujian_city.sort('2019SRice',false).toList(9).get(city_number)).get(imgname);
  return number;
}
////-------------------------------------统计各种类型的面积 -----------------------------------------------------
function count_mianji(numb,img1,area){
  var d=img1.updateMask(img1.eq(numb)).gte(0).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: area,
  scale: 30,
  maxPixels: 1e13
});
  var e=d.getNumber("b1").divide(1111.1).toInt();
  return e;
}
var P2 = China_town.filterBounds(point);
///////////////////////////////////////////////////////------------提取需要可视化的值----------------------------------------- 
var extremeStates = region.map(function(state) 
{
  var name1 = quyufanwei();  //显示范围字段 placesRegion_str
  var name2 = getimgname(); //对应栅格影像名称 cropname
  var name3 = crop_name(); //对应栅格影像类型名称 crop_type_str
  var imgname = getimgname();
  imgname = imgname.toString();
  console.log("name3---------")
  console.log(name3)
   console.log("name3---------")
   if(name1 == "县域范围展示" ){
    if (name3 == "单季稻" | name3 == "水旱轮作" | name3 == "双季稻" | name3 == "水稻" | name3 == "水稻分布情况"){
      state=state.set('2019年单季稻', count_mianji(1,ImgRice2019,P2));
      state=state.set('2019年水旱轮作', count_mianji(2,ImgRice2019,P2));
      state=state.set('2019年双季稻', count_mianji(3,ImgRice2019,P2));
      state=state.set('2020年单季稻', count_mianji(1,ImgRice2020,P2));  
      state=state.set('2020年水旱轮作', count_mianji(2,ImgRice2020,P2));
      return state.set('2020年双季稻',  count_mianji(3,ImgRice2020,P2));  
      }
    else if (name3 == "复种分布情况" | name3 == "复种指数" | name3 == "休耕" | name3 == "单季作物"| name3 == "双季作物" | name3 == "三季作物"){
      state=state.set('2019年休耕', count_mianji(0,ImgMCI2019,P2));
      state=state.set('2019年单季作物', count_mianji(1,ImgMCI2019,P2));
      state=state.set('2019年双季作物', count_mianji(2,ImgMCI2019,P2));  
      state=state.set('2019年三季作物', count_mianji(3,ImgMCI2019,P2));
      state=state.set('2020年休耕', count_mianji(0,ImgMCI2020,P2));
      state=state.set('2020年单季作物', count_mianji(1,ImgMCI2020,P2));  
      state=state.set('2020年双季作物', count_mianji(2,ImgMCI2020,P2));
      return state.set('2020年三季作物', count_mianji(3,ImgMCI2020,P2));  
      }
    else{
      return 1;
    }  
  } 
  else if(name1 == "市域范围展示" ){
    if (name3 == "单季稻" | name3 == "水旱轮作" | name3 == "双季稻" | name3 == "水稻" | name3 == "水稻分布情况"){
      state=state.set('2019年水稻', leixingdata(point,Rice20191));  
      state=state.set('2019年单季稻', leixingdata(point,SRice20191));
      state=state.set('2019年水旱轮作', leixingdata(point,RiceP20191));
      state=state.set('2019年双季稻', leixingdata(point,DRice20191));
      state=state.set('2020年水稻', leixingdata(point,Rice20201)); 
      state=state.set('2020年单季稻', leixingdata(point,SRice20201));  
      state=state.set('2020年水旱轮作', leixingdata(point,RiceP20201));
      return state.set('2020年双季稻', leixingdata(point,DRice20201));  
      }
    else if (name3 == "复种分布情况" |name3 == "复种指数" | name3 == "休耕" | name3 == "单季作物"| name3 == "双季作物" | name3 == "三季作物"){
      state=state.set('2019年休耕', leixingdata(point,MCI_020191));
      state=state.set('2019年单季作物', leixingdata(point,MCI_120191));
      state=state.set('2019年双季作物', leixingdata(point,MCI_220191));  
      state=state.set('2019年三季作物', leixingdata(point,MCI_320191));
      state=state.set('2020年休耕', leixingdata(point,MCI_020201));
      state=state.set('2020年单季作物', leixingdata(point,MCI_120201));  
      state=state.set('2020年双季作物', leixingdata(point,MCI_220201));
      return state.set('2020年三季作物', leixingdata(point,MCI_320201));  
      }
    else{
      return 1;
    }  
  }    
  else if (name1 == "省域范围展示"){
    if (name3 == "复种指数" | name3 == "休耕" | name3 == "单季作物"| name3 == "双季作物" | name3 == "三季作物" |
        name3 == "单季稻" | name3 == "水旱轮作" | name3 == "双季稻" | name3 == "水稻"){
    state=state.set('福州市', citydata(name2,3));
    state=state.set('厦门市', citydata(name2,8));
    state=state.set('莆田市', citydata(name2,7));
    state=state.set('三明市', citydata(name2,1));
    state=state.set('泉州市', citydata(name2,5));
    state=state.set('漳州市', citydata(name2,6));  
    state=state.set('南平市', citydata(name2,0));
    state=state.set('龙岩市', citydata(name2,2));
    return state.set('宁德市', citydata(name2,4));  
  } 
   else if(imgname == ee.String("ImgRice2019")){
    state=state.set('福州市', citydata('Rice2019',3));
    state=state.set('厦门市', citydata('Rice2019',8));
    state=state.set('莆田市', citydata('Rice2019',7));
    state=state.set('三明市', citydata('Rice2019',1));
    state=state.set('泉州市', citydata('Rice2019',5));
    state=state.set('漳州市', citydata('Rice2019',6));  
    state=state.set('南平市', citydata('Rice2019',0));
    state=state.set('龙岩市', citydata('Rice2019',2));
    return state.set('宁德市', citydata('Rice2019',4));   
   }
   else if(imgname == ee.String("ImgRice2020")){
    state=state.set('福州市', citydata('Rice2020',3));
    state=state.set('厦门市', citydata('Rice2020',8));
    state=state.set('莆田市', citydata('Rice2020',7));
    state=state.set('三明市', citydata('Rice2020',1));
    state=state.set('泉州市', citydata('Rice2020',5));
    state=state.set('漳州市', citydata('Rice2020',6));  
    state=state.set('南平市', citydata('Rice2020',0));
    state=state.set('龙岩市', citydata('Rice2020',2));
    return state.set('宁德市', citydata('Rice2020',4));   
   }
   else if(imgname == ee.String("ImgMCI2019")){
    state=state.set('福州市', citydata('MCI2019',3));
    state=state.set('厦门市', citydata('MCI2019',8));
    state=state.set('莆田市', citydata('MCI2019',7));
    state=state.set('三明市', citydata('MCI2019',1));
    state=state.set('泉州市', citydata('MCI2019',5));
    state=state.set('漳州市', citydata('MCI2019',6));  
    state=state.set('南平市', citydata('MCI2019',0));
    state=state.set('龙岩市', citydata('MCI2019',2));
    return state.set('宁德市', citydata('MCI2019',4));   
   }
   else if(imgname == ee.String("ImgMCI2020")){
    state=state.set('福州市', citydata('MCI2020',3));
    state=state.set('厦门市', citydata('MCI2020',8));
    state=state.set('莆田市', citydata('MCI2020',7));
    state=state.set('三明市', citydata('MCI2020',1));
    state=state.set('泉州市', citydata('MCI2020',5));
    state=state.set('漳州市', citydata('MCI2020',6));  
    state=state.set('南平市', citydata('MCI2020',0));
    state=state.set('龙岩市', citydata('MCI2020',2));
    return state.set('宁德市', citydata('MCI2020',4));   
   }
  }  
});
console.log("extremeStates/////////");
console.log(extremeStates);
console.log("extremeStates/////////");
///////////////////////////////////////////////////////////--提取需要可视化的值end----------------------------------------- 
////////////-///////////////////////-----------------直方图显示顺序--------------------------- 
function paixu(cityname,imgname){
  var shunxu = '';
  var name3 = crop_name();
  if(cityname == "县域范围展示" ){
     if (name3 == "单季稻" | name3 == "水旱轮作" | name3 == "双季稻" | name3 == "水稻" | name3 == "水稻分布情况"){
     shunxu = placesRegion[cityname].leixing1;
      return shunxu;
     }
  else if (name3 == "复种分布情况" |name3 == "复种指数" | name3 == "休耕" | name3 == "单季作物"| name3 == "双季作物" | name3 == "三季作物"){
     shunxu = placesRegion[cityname].leixing2;
      return shunxu;  
  } 
  else{
      return 1;
    }   
  }
  else if(cityname == "市域范围展示" ){
     if (name3 == "单季稻" | name3 == "水旱轮作" | name3 == "双季稻" | name3 == "水稻"| name3 == "水稻分布情况"){
     shunxu = placesRegion[cityname].leixing1;
      return shunxu;
     }
  else if (name3 == "复种分布情况" |name3 == "复种指数" | name3 == "休耕" | name3 == "单季作物"| name3 == "双季作物" | name3 == "三季作物"){
     shunxu = placesRegion[cityname].leixing2;
      return shunxu;  
  } 
  else{
      return 1;
    }   
  }
  else if (cityname == "省域范围展示"){
     imgname = getimgname();
     imgname = imgname.toString();
    console.log("lx-----------");
    console.log(imgname);
    console.log("lx-----------");
    if (imgname == ee.String("2019SRice")){
      shunxu = placesRegion[cityname].leixing1;
      return shunxu;
    }
    else  if (imgname == ee.String("2019RiceP")){ //"2019RiceP"){
      shunxu = placesRegion[cityname].leixing2;
      // console.log("result-----------");
      return shunxu;
    }
    else  if (imgname == ee.String("2019DRice")){
      shunxu = placesRegion[cityname].leixing3;
      return shunxu;
    }    
    else  if (imgname == ee.String("2020SRice")){
      shunxu = placesRegion[cityname].leixing4;
      return shunxu;
    }
    else  if (imgname == ee.String("2020RiceP")){
      shunxu = placesRegion[cityname].leixing5;
      return shunxu;
    }
    else  if (imgname == ee.String("2020DRice")){
      shunxu = placesRegion[cityname].leixing6;
      return shunxu;      
    }  
    else  if (imgname == ee.String("MCI2019") | imgname == ee.String("ImgMCI2019")){ 
      shunxu = placesRegion[cityname].leixing7;
      // console.log("result-----------");
      return shunxu;
    }
    else  if (imgname == ee.String("MCI2019_0")){
      shunxu = placesRegion[cityname].leixing8;
      return shunxu;
    }    
    else  if (imgname == ee.String("MCI2019_1")){
      shunxu = placesRegion[cityname].leixing9;
      return shunxu;
    }
    else  if (imgname == ee.String("MCI2019_2")){
      shunxu = placesRegion[cityname].leixing10;
      return shunxu;
    }
    else  if (imgname == ee.String("MCI2019_3")){
      shunxu = placesRegion[cityname].leixing11;
      return shunxu;      
    } 
    else  if (imgname == ee.String("MCI2020") | imgname == ee.String("ImgMCI2020")){ 
      shunxu = placesRegion[cityname].leixing12;
      // console.log("result-----------");
      return shunxu;
    }
    else  if (imgname == ee.String("MCI2020_0")){
      shunxu = placesRegion[cityname].leixing13;
      return shunxu;
    }    
    else  if (imgname == ee.String("MCI2020_1")){
      shunxu = placesRegion[cityname].leixing14;
      return shunxu;
    }
    else  if (imgname == ee.String("MCI2020_2")){
      shunxu = placesRegion[cityname].leixing15;
      return shunxu;
    }
    else  if (imgname == ee.String("MCI2020_3")){
      shunxu = placesRegion[cityname].leixing16;
      return shunxu;      
    } 
    else  if (imgname == ee.String("Rice2019") | imgname == ee.String("ImgRice2019")){
      shunxu = placesRegion[cityname].leixing17;
      return shunxu;      
    } 
    else  if (imgname == ee.String("Rice2020") | imgname == ee.String("ImgRice2020")){
      shunxu = placesRegion[cityname].leixing18;
      return shunxu;      
    }      
    else{
      return 1;
    }
  } 
}
var name4 = quyufanwei();  
var name5 = getimgname();
var lx = paixu(name4,name5);
console.log(lx);
/////////////////////////////////////////////////////直方图显示顺序end/////////////////////////////
////////////////////////////////行政区选择///////////////////////////////////////////
function area_name(cityname){
  var xingzhengqu = '';
 quyufanwei();
  if(cityname == "市域范围展示" ){
  xingzhengqu = 'DSMC';
  return xingzhengqu;
  }
  else if (cityname == "省域范围展示"){
  xingzhengqu = 'SJMC'; 
  return xingzhengqu;
  }
  else if (cityname == "县域范围展示"){
  xingzhengqu = 'XJMC'; 
  return xingzhengqu;
  }
}
var Areaname = area_name(name4);
console.log(Areaname);
//////////////////////////////////行政区选择end///////////////////////////////////////////
////////////////////////////////////////直方图颜色设置 palette///////////////////////////
function getpalette(cityname){
  var colors = '';
  var name3 = crop_name();
  if(cityname == "市域范围展示" | cityname == "县域范围展示" ){
     if (name3 == "单季稻" | name3 == "水旱轮作" | name3 == "双季稻" | name3 == "水稻"| name3 == "水稻分布情况"){
     colors = placesRegion[cityname].visParams1.palette
      return colors;
     }
     else if (name3 == "复种分布情况" |name3 == "复种指数" | name3 == "休耕" | name3 == "单季作物"| name3 == "双季作物" | name3 == "三季作物"){
     colors = placesRegion[cityname].visParams2.palette
      return colors;  
     } 
  else{
      return 1;
    }   
  }
  else if (cityname == "省域范围展示"){
     if (name3 == "单季稻" | name3 == "水旱轮作" | name3 == "双季稻" | name3 == "水稻"| name3 == "水稻分布情况"){
     colors = placesRegion[cityname].visParams1.palette
      return colors;
     }
     else if (name3 == "复种分布情况" |name3 == "复种指数" | name3 == "休耕" | name3 == "单季作物"| name3 == "双季作物" | name3 == "三季作物"){
     colors = placesRegion[cityname].visParams2.palette
      return colors;  
     } 
  }
}
var getcolors = getpalette(name4);
////---------------------------------------------设置直方图的图例土名和坐标轴1-----------------------
function gettitle(cityname){
  var title = '';
  var yzhou = '';
  var name3 = crop_name();
  if(cityname == "省域范围展示" ){
     if (name3 == "复种分布情况" |name3 == "复种指数" ){
     title = '市域复种指数';
     yzhou = '复种指数';
     return [title,yzhou];
     }
  else {
  title = title = '作物类型种植面积';
  yzhou = '面积(平方千米)';
  return [title,yzhou];
     } 
  }
  else if (cityname == "市域范围展示"){
   title = title = '作物类型种植面积';
   yzhou = '面积(平方千米)';
   return [title,yzhou];
  }
  else if (cityname == "县域范围展示"){
   title = title = '作物类型种植面积';
   yzhou = '面积(平方千米)';
   return [title,yzhou];
  }
}
var ttt = gettitle(name4)[0];
var yyy = gettitle(name4)[1];
//----------------------------------------------------
var label=ui.Label({
    value:'图表展示:',
    style: {fontSize: '15px', fontWeight: 'bold'}
  });
var chart=ui.Chart.feature.byFeature(extremeStates,Areaname, Object.keys(lx))
    .setChartType('ColumnChart')
    .setOptions({
      title: ttt,
      hAxis: {title: '位置所市行政区'},
      vAxis: {title: yyy},
      colors:getcolors
    });
///////////////////////////////////求地图上点的NDVI值//////////////////////////////
////////////////////去云//////////////////////
function maskS2clouds(image) {
  var qa = image.select('QA60');
  var cloudBitMask = Math.pow(2, 10);
  var cirrusBitMask = Math.pow(2, 11);
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0).and(
             qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask);
}
////////////////////指数计算//////////////////////
var cal_ndvi=function(image){
  var time_start = image.get("system:time_start");
  image=image.multiply(0.0001);
  var blue=image.select('B2');
  var green=image.select('B3');
  var red=image.select('B4');
  var vre1=image.select('B5');
  var vre2=image.select('B6');
  var vre3=image.select('B7');
  var nir=image.select('B8');
  var vre4=image.select('B8A');
  var swir1=image.select('B11');
  var swir2=image.select('B12');
  var NDVI=vre4.subtract(red).divide(vre4.add(red)).rename('NDVI');
  return image.addBands(NDVI).set("system:time_start", time_start);
};
//////////////////////////影像镶嵌或合成//////////////////////////////////////////
var Date_Start = ee.Date('2017-01-01');
var Date_End = ee.Date('2021-10-12');
//var Date_window = ee.Number(30);
// Create list of dates for time series
var n_days = Date_End.difference(Date_Start,'day').round();
var dates1 = ee.List.sequence(0,n_days,10);
var make_datelist = function(n) {
  return Date_Start.advance(n,'day');
};
var dates = dates1.map(make_datelist);
var fnc = function(d1) {
  var start = ee.Date(d1);
  var time =ee.Date(d1).advance(4,'day').millis();
  var end = ee.Date(d1).advance(10,'day');
  var date_range = ee.DateRange(start,end);
var S1 = sentinel.filterDate(date_range).map(maskS2clouds);
  var mosaic =S1.median().set('system:time_start',time);
  return mosaic
};
var list_of_images = dates.map(fnc);
var image_mosaic = ee.ImageCollection(list_of_images).filterBounds(Fujian).map(function clip(img){return img.clip(Fujian)});
//////////////////////////////////插值///////////////////////////////////////////////
var imgcol_NDVI = image_mosaic.map(cal_ndvi).select('NDVI');
var pkg_smooth = require('users/yzy/math:pkg_smooth.js');
var frame  = 10*3; 
var nodata = -9999;
var imgcol_NDVI_index = pkg_smooth.linearInterp(imgcol_NDVI, frame, nodata);
var imgcol_NDVI_index1=imgcol_NDVI_index.select("NDVI");
//--------------------------------WS平滑----------------------------------------------------
/** Initialize weights ------------------------------------------------------ */
function qc_NDVI(img) {
    var w= img.select(0).mask(); 
    return ee.Image(img.select('NDVI'))//.divide(10)
        .addBands(w)
        .rename(['NDVI', 'w'])
        .copyProperties(img, img.propertyNames());
}
var pkg_main   = require('users/yzy/math:pkg_main.js');
var pkg_whit   = require('users/yzy/math:pkg_whit.js');
/** GLOBAL FUNCTIONS -------------------------------------------------------- */
var date2str = function(x) { return ee.Date(x).format('YYYY_MM_dd'); };
/** ------------------------------------------------------------------------- */
// MAIN SCRIPT 
    /** Initial parameters for whittaker smoother --------------------------- */
    var lambda = 10;
    var mask       = imgcol_NDVI_index1.select('NDVI').mosaic().mask(); 
    /** 1. pre-process mask NA values and init weights */
    imgcol_NDVI = imgcol_NDVI_index1.map(function(img) {
        // img = img.unmask(-1.0);
        return ee.Image(qc_NDVI(img)).updateMask(mask);
    });
        var options_whit = {
        order        : 2,    // difference order
        wFUN         : pkg_whit.wBisquare_array, // weigths updating function
        iters        : 2,    // Whittaker iterations
        min_ValidPerc: 0,    // pixel valid ratio less then `min_ValidPerc`, is not smoothed.
        min_A        : 0.02, // Amplitude A = ylu_max - ylu_min, points are masked if 
                            // A < min_A. If ylu not specified, min_A not work
        missing      : -0.05 // Missing value in band_sm are set to missing.
        // matrixSolve = 1;  // whittaker, matrix solve option:
        // 1:matrixSolve, 2:matrixCholeskyDecomposition, 3:matrixPseudoInverse 
    };
var whit_NDVI= pkg_whit.whit_imgcol(imgcol_NDVI, options_whit, lambda);
var mat_zs_NDVI  = whit_NDVI.zs;
var datelist_NDVI = ee.List(imgcol_NDVI.aggregate_array('system:time_start')).map(date2str);
var ids_NDVI = datelist_NDVI.map(function(val){ return ee.String('b').cat(val); }); 
 var img_WS_NDVI_out = mat_zs_NDVI.arraySlice(1,1,2).arrayProject([0]).arrayFlatten([ids_NDVI]);
      // .......................................NDVI转换......................................................
  var img_WS_NDVI_out_toarray=img_WS_NDVI_out.toArray();
  function get_NDVIimg(i) {
  var subarray = img_WS_NDVI_out_toarray.arraySlice(0, ee.Number(i).int(), ee.Number(i).add(1).int())
  return subarray.arrayProject([0]).arrayFlatten([['NDVI_WS']]);  
  }
  var imgcol_NDVI_index1_tolist=imgcol_NDVI_index1.toList(imgcol_NDVI_index1.size())
  var runLength_NDVI=ee.List.sequence(0, imgcol_NDVI_index1.size().subtract(1));
  var WS_NDVI = ee.ImageCollection.fromImages(runLength_NDVI.map(function(i) {
  var time=ee.Image(imgcol_NDVI_index1_tolist.get(ee.Number(i))).get('system:time_start');
  return get_NDVIimg(i).set('system:time_start',time)
  }));
  var WS_NDVI1 = WS_NDVI.filterDate('2019-09-01','2021-09-01')
////////////////////////////////////////ndvi取值结束////////////////////////////// 
var ndviChart = ui.Chart.image.series(WS_NDVI1, point, ee.Reducer.mean(), 30);
 //设置NDVI
  ndviChart.setOptions({
    title: '作物生长趋势曲线',
    vAxis: {title: 'NDVI'},
    hAxis: {title: '时间', format: 'MM-yy', gridlines: {count: 7}},
  });
 ui.Panel().widgets().set(2, ndviChart);
//////////////////////////////////天取指定日的像元值////////////////////////////////////// 
// function ndvidata(point,number){
//   var img = ee.Image(WS_NDVI.toList(147).get(number))
//   var eee = img.reduceRegions(point, ee.Reducer.first(),1).first();
//   var point_value=ee.Number(eee.get('first'));
//   return point_value;
// }
/////----------------------------------------------------------------------------------
//////////////////////////////////取一年最大值 ////////////////////////////////////// 
function ndvi_90max(startDate, endDate){
 var ndvi_max  = WS_NDVI.filterDate(startDate, endDate)
                        .select('NDVI_WS')
                        .reduce(ee.Reducer.percentile([90]));
  return ndvi_max                  
}
var ndvi_max_2017 = ndvi_90max('2017-01-01','2017-12-31');
var ndvi_max_2018 = ndvi_90max('2018-01-01','2018-12-31');
var ndvi_max_2019 = ndvi_90max('2019-01-01','2019-12-31');
var ndvi_max_2020 = ndvi_90max('2020-01-01','2020-12-31');
var ndvi_max_2021 = ndvi_90max('2021-01-01','2021-10-12');
/////////////////////取该点的像元值  ////////////////////////////////////// 
function point_ndvi_value (point,img_ndvi_max){
  var ndvi_value =img_ndvi_max.reduceRegions(point, ee.Reducer.first(),1).first();
  var point_value = ee.Number(ndvi_value.get('first'));
  return point_value;
}
var shixundvi  = region.map(function(state){
state=state.set('2017年', point_ndvi_value(point,ndvi_max_2017));
state=state.set('2018年', point_ndvi_value(point,ndvi_max_2018));
state=state.set('2019年', point_ndvi_value(point,ndvi_max_2019));  
state=state.set('2020年', point_ndvi_value(point,ndvi_max_2020));
return state.set('2021年', point_ndvi_value(point,ndvi_max_2021)) 
})
console.log(shixundvi);
var hengzuobiao = {'2017年':1,'2018年':2,'2019年':3,'2020年':4,'2021年':5};
var ndvicolor = ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00' ];
var navidata=ui.Chart.feature.byFeature(shixundvi,'XSMC', Object.keys(hengzuobiao))
    .setChartType('ColumnChart')
    .setOptions({
      title: '历年长势对比',
      hAxis: {title: '年份'},
      vAxis: {title: 'NDVI'},
      colors:ndvicolor
    });
var jielun1 = ui.Label('2019年福建省复种指数为1.52，全国第九，全国复种指数为1.27', {'font-size': '16px'});
var jielun2 = ui.Label('2020年福建省复种指数为1.50，全国第八，全国复种指数为1.29', {'font-size': '16px'});
var jielun3 = ui.Label('2019年福建省水稻播种面积为5992.3平方千米，全国水稻播种面积排行16', {'font-size': '16px'});
var jielun4 = ui.Label('2020年福建省水稻播种面积为6215.7平方千米，全国水稻播种面积排行16', {'font-size': '16px'});
var jielun5 = ui.Label('2019年福建省播种面积为11601.2平方千米，全国播种面积排行25', {'font-size': '16px'});
var jielun6 = ui.Label('2020年福建省播种面积为1145.8平方千米，全国播种面积排行25', {'font-size': '16px'});
var jielun7 = ui.Label('2019年福建省复种指数排名前五的县区如下：金门县：2.38，丰泽区：2.16，华安县：2.12，德化县：1.97，漳平市：1.92', {'font-size': '16px'});
var jielun8 = ui.Label('2020年福建省复种指数排名前五的县区如下：金门县：1.94，洛江区：1.81，永安市：1.80，清流县：1.77，明溪县：1.76', {'font-size': '16px'});
var jielun9 = ui.Label('2019年福建省水稻播种面积排名前五的县区如下：浦城县：462.01，建瓯市：439.59，建阳区：392.26，武夷山市：345.70，上杭县：237.19', {'font-size': '16px'});
var jielun10 = ui.Label('2020年福建省水稻播种面积排名前五的县区如下：浦城县：462.01，建瓯市：439.59，建阳区：392.26，武夷山市：345.70，上杭县：245.44', {'font-size': '16px'});
function jielunlabel(cropname){
  var jinlun = '';
  var name3 = cropname;
  var cityname = quyufanwei(); 
  if(cityname == "县域范围展示" ){
   if (name3 == "2020年单季稻" | name3 == "2020年水旱轮作" | name3 == "2020年双季稻" | name3 == "2020年水稻"| name3 == "2020年水稻分布情况"){
   jielun = jielun10;
   return jielun;
   }
    else if (name3 == "2019年单季稻" | name3 == "2019年水旱轮作" | name3 == "2019年双季稻" | name3 == "2019年水稻"| name3 == "2019年水稻分布情况"){
   jielun = jielun9;
   return jielun;
    }
   else if (name3 == "2019年复种分布情况" |name3 == "2019年复种指数" |name3 == "2019年休耕" | name3 == "2019年单季作物"| name3 == "2019年双季作物" | name3 == "2019年三季作物"){
   jielun = jielun7;
   return jielun;  
   } 
   else if (name3 == "2020年复种分布情况" |name3 == "2020年复种指数" |name3 == "2020年休耕" | name3 == "2020年单季作物"| name3 == "2020年双季作物" | name3 == "2020年三季作物"){
   jielun = jielun8;
   return jielun;  
   } 
   } 
  else if(cityname == "市域范围展示" | cityname == "省域范围展示"){
   if (name3 == "2020年单季稻" | name3 == "2020年水旱轮作" | name3 == "2020年双季稻" | name3 == "2020年水稻"| name3 == "2020年水稻分布情况"){
   jielun = jielun4;
   return jielun;
   }
    else if (name3 == "2019年单季稻" | name3 == "2019年水旱轮作" | name3 == "2019年双季稻" | name3 == "2019年水稻"| name3 == "2019年水稻分布情况"){
   jielun = jielun3;
   return jielun;
   }
   else if (name3 == "2019年复种指数" | name3 == "2019年复种分布情况" ){
   jielun = jielun1;
   return jielun;  
   } 
   else if (name3 == "2020年复种指数" | name3 == "2020年复种分布情况" ){
   jielun = jielun2;
   return jielun;  
   } 
   else if (name3 == "2019年休耕" | name3 == "2019年单季作物"| name3 == "2019年双季作物" | name3 == "2019年三季作物"){
   jielun = jielun1;
   return jielun;  
   } 
   else if (name3 == "2020年休耕" | name3 == "2020年单季作物"| name3 == "2020年双季作物" | name3 == "2020年三季作物"){
   jielun = jielun2;
   return jielun;  
   } 
} 
}
var jielun = jielunlabel(Imggname()) ;
histogram.add(chart);
histogram.add(jielun);
histogram.add(ndviChart);
histogram.add(navidata);
intro.add(label);
toolPanel.add(intro);//out put in ui panel
toolPanel.add(histogram);
};
mapPanel.onClick(generateChart);
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});