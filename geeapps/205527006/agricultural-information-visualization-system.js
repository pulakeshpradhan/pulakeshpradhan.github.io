var china = ui.import && ui.import("china", "table", {
      "id": "users/nirv/coverage_of_program/chinageo"
    }) || ee.FeatureCollection("users/nirv/coverage_of_program/chinageo"),
    china_city = ui.import && ui.import("china_city", "table", {
      "id": "users/205527006/bianjie/china_city"
    }) || ee.FeatureCollection("users/205527006/bianjie/china_city"),
    china_province = ui.import && ui.import("china_province", "table", {
      "id": "users/205527006/bianjie/china_province"
    }) || ee.FeatureCollection("users/205527006/bianjie/china_province"),
    cropland_30 = ui.import && ui.import("cropland_30", "image", {
      "id": "users/1367683089/Dalunwen/farmland30"
    }) || ee.Image("users/1367683089/Dalunwen/farmland30"),
    Maize2015 = ui.import && ui.import("Maize2015", "image", {
      "id": "users/205527006/APP_date/Mazie2015"
    }) || ee.Image("users/205527006/APP_date/Mazie2015"),
    Maize2016 = ui.import && ui.import("Maize2016", "image", {
      "id": "users/205527006/APP_date/Mazie2016"
    }) || ee.Image("users/205527006/APP_date/Mazie2016"),
    Maize2017 = ui.import && ui.import("Maize2017", "image", {
      "id": "users/205527006/APP_date/Mazie2017"
    }) || ee.Image("users/205527006/APP_date/Mazie2017"),
    Maize2018 = ui.import && ui.import("Maize2018", "image", {
      "id": "users/205527006/APP_date/Mazie2018"
    }) || ee.Image("users/205527006/APP_date/Mazie2018"),
    Maize2019 = ui.import && ui.import("Maize2019", "image", {
      "id": "users/205527006/APP_date/Mazie2019"
    }) || ee.Image("users/205527006/APP_date/Mazie2019"),
    Maize2020 = ui.import && ui.import("Maize2020", "image", {
      "id": "users/205527006/APP_date/Mazie2020"
    }) || ee.Image("users/205527006/APP_date/Mazie2020"),
    Rice2015 = ui.import && ui.import("Rice2015", "image", {
      "id": "users/205527006/APP_date/Rice2015"
    }) || ee.Image("users/205527006/APP_date/Rice2015"),
    Rice2016 = ui.import && ui.import("Rice2016", "image", {
      "id": "users/205527006/APP_date/Rice2016"
    }) || ee.Image("users/205527006/APP_date/Rice2016"),
    Rice2017 = ui.import && ui.import("Rice2017", "image", {
      "id": "users/205527006/APP_date/Rice2017"
    }) || ee.Image("users/205527006/APP_date/Rice2017"),
    Rice2018 = ui.import && ui.import("Rice2018", "image", {
      "id": "users/205527006/APP_date/Rice2018"
    }) || ee.Image("users/205527006/APP_date/Rice2018"),
    Rice2019 = ui.import && ui.import("Rice2019", "image", {
      "id": "users/205527006/APP_date/Rice2019"
    }) || ee.Image("users/205527006/APP_date/Rice2019"),
    Rice2020 = ui.import && ui.import("Rice2020", "image", {
      "id": "users/205527006/APP_date/Rice2020"
    }) || ee.Image("users/205527006/APP_date/Rice2020"),
    Corpping2015 = ui.import && ui.import("Corpping2015", "image", {
      "id": "users/205527006/APP_date/corpping_pattern2015"
    }) || ee.Image("users/205527006/APP_date/corpping_pattern2015"),
    Corpping2016 = ui.import && ui.import("Corpping2016", "image", {
      "id": "users/205527006/APP_date/corpping_pattern2016"
    }) || ee.Image("users/205527006/APP_date/corpping_pattern2016"),
    Corpping2017 = ui.import && ui.import("Corpping2017", "image", {
      "id": "users/205527006/APP_date/corpping_pattern2017"
    }) || ee.Image("users/205527006/APP_date/corpping_pattern2017"),
    Corpping2018 = ui.import && ui.import("Corpping2018", "image", {
      "id": "users/205527006/APP_date/corpping_pattern2018"
    }) || ee.Image("users/205527006/APP_date/corpping_pattern2018"),
    Corpping2019 = ui.import && ui.import("Corpping2019", "image", {
      "id": "users/205527006/APP_date/corpping_pattern2019"
    }) || ee.Image("users/205527006/APP_date/corpping_pattern2019"),
    Corpping2020 = ui.import && ui.import("Corpping2020", "image", {
      "id": "users/205527006/APP_date/corpping_pattern2020"
    }) || ee.Image("users/205527006/APP_date/corpping_pattern2020"),
    Wheat2015 = ui.import && ui.import("Wheat2015", "image", {
      "id": "users/205527006/wheat2015"
    }) || ee.Image("users/205527006/wheat2015"),
    Wheat2016 = ui.import && ui.import("Wheat2016", "image", {
      "id": "users/205527006/wheat2016"
    }) || ee.Image("users/205527006/wheat2016"),
    Wheat2017 = ui.import && ui.import("Wheat2017", "image", {
      "id": "users/205527006/wheat2017"
    }) || ee.Image("users/205527006/wheat2017"),
    Wheat2018 = ui.import && ui.import("Wheat2018", "image", {
      "id": "users/205527006/wheat2018"
    }) || ee.Image("users/205527006/wheat2018"),
    Wheat2019 = ui.import && ui.import("Wheat2019", "image", {
      "id": "users/205527006/wheat2019"
    }) || ee.Image("users/205527006/wheat2019"),
    Wheat2020 = ui.import && ui.import("Wheat2020", "image", {
      "id": "users/205527006/wheat2020"
    }) || ee.Image("users/205527006/wheat2020");
//-------------------------------------------------设置地图上控件的可见性------------------------------------------
var mapPanel = ui.Map();
mapPanel.setControlVisibility(
    {all: false, zoomControl: true, mapTypeControl: true});
mapPanel.setCenter( 107.97155591785759,34.32781699066079,8);
//-----------------------------------------------将大于零的值提取出来 -------------------------------------------------------------
Rice2015 = Rice2015.updateMask(cropland_30).updateMask(Rice2015.gte(1));
Rice2016 = Rice2016.updateMask(cropland_30).updateMask(Rice2016.gte(1));
Rice2017 = Rice2017.updateMask(cropland_30).updateMask(Rice2017.gte(1));
Rice2018 = Rice2018.updateMask(cropland_30).updateMask(Rice2018.gte(1));
Rice2019 = Rice2019.updateMask(cropland_30).updateMask(Rice2019.gte(1));
Rice2020 = Rice2020.updateMask(cropland_30).updateMask(Rice2020.gte(1));
Maize2015 = Maize2015.updateMask(cropland_30).updateMask(Maize2015.gte(1));
Maize2016 = Maize2016.updateMask(cropland_30).updateMask(Maize2016.gte(1));
Maize2017 = Maize2017.updateMask(cropland_30).updateMask(Maize2017.gte(1));
Maize2018 = Maize2018.updateMask(cropland_30).updateMask(Maize2018.gte(1));
Maize2019 = Maize2019.updateMask(cropland_30).updateMask(Maize2019.gte(1));
Maize2020 = Maize2020.updateMask(cropland_30).updateMask(Maize2020.gte(1));
Wheat2015 = Wheat2015.updateMask(cropland_30).updateMask(Wheat2015.gte(1));
Wheat2016 = Wheat2016.updateMask(cropland_30).updateMask(Wheat2016.gte(1));
Wheat2017 = Wheat2017.updateMask(cropland_30).updateMask(Wheat2017.gte(1));
Wheat2018 = Wheat2018.updateMask(cropland_30).updateMask(Wheat2018.gte(1));
Wheat2019 = Wheat2019.updateMask(cropland_30).updateMask(Wheat2019.gte(1));
Wheat2020 = Wheat2020.updateMask(cropland_30).updateMask(Wheat2020.gte(1));
Corpping2015 = Corpping2015.updateMask(cropland_30).updateMask(Corpping2015.gte(1));
Corpping2016 = Corpping2016.updateMask(cropland_30).updateMask(Corpping2016.gte(1));
Corpping2017 = Corpping2017.updateMask(cropland_30).updateMask(Corpping2017.gte(1));
Corpping2018 = Corpping2018.updateMask(cropland_30).updateMask(Corpping2018.gte(1));
Corpping2019 = Corpping2019.updateMask(cropland_30).updateMask(Corpping2019.gte(1));
Corpping2020 = Corpping2020.updateMask(cropland_30).updateMask(Corpping2020.gte(1));
var variable_list = [Rice2015,Rice2016,Rice2017,Rice2018,Rice2019,Rice2020,
                     Maize2015,Maize2016,Maize2017,Maize2018,Maize2019,Maize2020,
                     Wheat2015,Wheat2016,Wheat2017,Wheat2018,Wheat2019,Wheat2020,
                     Corpping2015, Corpping2016,Corpping2017,Corpping2018,Corpping2019,Corpping2020];
// ---------------------------设置四种类型的映射关系--------------------------- 
function Data_reassignment(){
   var Rice_mapping = {
         "1": "1",
         "2": "2",
         "3": "2",
         "4": "3"
       };
   var Maize_mapping = {      
         "1": "1",
         "2": "2",
         "21": "2",
         "22": "2"
       };
   var Wheat_mapping = {
         "1": "1"
       };
   var Corpping_mapping = {
         "3": "1",
         "14": "2",
         "15": "3",
         "16": "4",
         "17": "5",
         "27": "6",        
         "245": "7",
         "246": "8",
         "255": "9",
         "256": "10"
       };
   var keys1 = [];
   var keys2 = [];
   var keys3 = [];
   var keys4 = [];
   for (var p1 in Rice_mapping){
     if(Rice_mapping.hasOwnProperty(p1))
         keys1.push(p1);
   }
   for (var p2 in Maize_mapping){
     if(Maize_mapping.hasOwnProperty(p2))
         keys2.push(p2);
   }
   for (var p3 in Wheat_mapping){
     if(Wheat_mapping.hasOwnProperty(p3))
         keys3.push(p3);
   }
   for (var p4 in Corpping_mapping){
     if(Corpping_mapping.hasOwnProperty(p4))
         keys4.push(p4);
   }
   for (var i = 0; i < keys1.length; i++){
     Rice2015 = Rice2015.where(Rice2015.eq(parseInt(keys1[i])),parseInt(Rice_mapping[keys1[i]]));
     Rice2016 = Rice2016.where(Rice2016.eq(parseInt(keys1[i])),parseInt(Rice_mapping[keys1[i]]));
     Rice2017 = Rice2017.where(Rice2017.eq(parseInt(keys1[i])),parseInt(Rice_mapping[keys1[i]]));
     Rice2018 = Rice2018.where(Rice2018.eq(parseInt(keys1[i])),parseInt(Rice_mapping[keys1[i]]));
     Rice2019 = Rice2019.where(Rice2019.eq(parseInt(keys1[i])),parseInt(Rice_mapping[keys1[i]]));
     Rice2020 = Rice2020.where(Rice2020.eq(parseInt(keys1[i])),parseInt(Rice_mapping[keys1[i]]));
   }
      for (var j = 0; j < keys2.length; j++){
     Maize2015 = Maize2015.where(Maize2015.eq(parseInt(keys2[j])),parseInt(Maize_mapping[keys2[j]]));
     Maize2016 = Maize2016.where(Maize2016.eq(parseInt(keys2[j])),parseInt(Maize_mapping[keys2[j]]));
     Maize2017 = Maize2017.where(Maize2017.eq(parseInt(keys2[j])),parseInt(Maize_mapping[keys2[j]]));
     Maize2018 = Maize2018.where(Maize2018.eq(parseInt(keys2[j])),parseInt(Maize_mapping[keys2[j]]));
     Maize2019 = Maize2019.where(Maize2019.eq(parseInt(keys2[j])),parseInt(Maize_mapping[keys2[j]]));
     Maize2020 = Maize2020.where(Maize2020.eq(parseInt(keys2[j])),parseInt(Maize_mapping[keys2[j]]));
   }
      for (var n = 0; n < keys3.length; n++){
     Wheat2015 = Wheat2015.where(Wheat2015.eq(parseInt(keys3[n])),parseInt(Wheat_mapping[keys3[n]]));
     Wheat2016 = Wheat2016.where(Wheat2016.eq(parseInt(keys3[n])),parseInt(Wheat_mapping[keys3[n]]));
     Wheat2017 = Wheat2017.where(Wheat2017.eq(parseInt(keys3[n])),parseInt(Wheat_mapping[keys3[n]]));
     Wheat2018 = Wheat2018.where(Wheat2018.eq(parseInt(keys3[n])),parseInt(Wheat_mapping[keys3[n]]));
     Wheat2019 = Wheat2019.where(Wheat2019.eq(parseInt(keys3[n])),parseInt(Wheat_mapping[keys3[n]]));
     Wheat2020 = Wheat2020.where(Wheat2020.eq(parseInt(keys3[n])),parseInt(Wheat_mapping[keys3[n]]));
   }
      for (var m = 0; m < keys4.length; m++){
     Corpping2015 = Corpping2015.where(Corpping2015.eq(parseInt(keys4[m])),parseInt(Corpping_mapping[keys4[m]]));
     Corpping2016 = Corpping2016.where(Corpping2016.eq(parseInt(keys4[m])),parseInt(Corpping_mapping[keys4[m]]));
     Corpping2017 = Corpping2017.where(Corpping2017.eq(parseInt(keys4[m])),parseInt(Corpping_mapping[keys4[m]]));
     Corpping2018 = Corpping2018.where(Corpping2018.eq(parseInt(keys4[m])),parseInt(Corpping_mapping[keys4[m]]));
     Corpping2019 = Corpping2019.where(Corpping2019.eq(parseInt(keys4[m])),parseInt(Corpping_mapping[keys4[m]]));
     Corpping2020 = Corpping2020.where(Corpping2020.eq(parseInt(keys4[m])),parseInt(Corpping_mapping[keys4[m]]));
   }
}
Data_reassignment();///执行映射函数 
// // print('Maize2015',Maize2015);
// Map.addLayer(Corpping2019, {}, 'Corpping2019');
// ----------------------------------------------波段整合 -------------------------------------------------------------------
var Rice20151 = Rice2015.rename("Rice2015");
var Rice20161 = Rice2016.rename("Rice2016");
var Rice20171 = Rice2017.rename("Rice2017");
var Rice20181 = Rice2018.rename("Rice2018");
var Rice20191 = Rice2019.rename("Rice2019");
var Rice20201 = Rice2020.rename("Rice2020");
var Maize20151 = Maize2015.rename("Maize2015");
var Maize20161 = Maize2016.rename("Maize2016");
var Maize20171 = Maize2017.rename("Maize2017");
var Maize20181 = Maize2018.rename("Maize2018");
var Maize20191 = Maize2019.rename("Maize2019");
var Maize20201 = Maize2020.rename("Maize2020");
var Wheat20151 = Wheat2015.rename("Wheat2015");
var Wheat20161 = Wheat2016.rename("Wheat2016");
var Wheat20171 = Wheat2017.rename("Wheat2017");
var Wheat20181 = Wheat2018.rename("Wheat2018");
var Wheat20191 = Wheat2019.rename("Wheat2019");
var Wheat20201 = Wheat2020.rename("Wheat2020");
var Corpping20151 = Corpping2015.rename("Corpping2015");
var Corpping20161 = Corpping2016.rename("Corpping2016");
var Corpping20171 = Corpping2017.rename("Corpping2017");
var Corpping20181 = Corpping2018.rename("Corpping2018");
var Corpping20191 = Corpping2019.rename("Corpping2019");
var Corpping20201 = Corpping2020.rename("Corpping2020");
var rec = Rice20151.addBands(Rice20161).addBands(Rice20171).addBands(Rice20181).addBands(Rice20191).addBands(Rice20201)
          .addBands(Maize20151).addBands(Maize20161).addBands(Maize20171).addBands(Maize20181).addBands(Maize20191).addBands(Maize20201)
          .addBands(Wheat20151).addBands(Wheat20161).addBands(Wheat20171).addBands(Wheat20181).addBands(Wheat20191).addBands(Wheat20201)
          .addBands(Corpping20151).addBands(Corpping20161).addBands(Corpping20171).addBands(Corpping20181).addBands(Corpping20191).addBands(Corpping20201);
//-----------------------------------------------种植模式展示 ------------------------------------------------------
// //图层属性 
var layerProperties;
function gh(a1,a2,a3,a4,a5,a6,a7,a8,a9,a10,a11,a12,a13,a14,a15,a16,a17,a18,a19,a20,a21,a22,a23,a24){
//-----------------------------------------------种植模式 颜色显示设置-----------------------------------------------------------------
layerProperties = {
  'Rice2015': {
    l:a1,
    name: 'Rice2015',
    visParams: {min:1,max:3,palette:[ 
  '#78C679',//1 单季水稻
  '#238443',//2 水稻加其他 
  '#005A00',//3 双季稻 
]},
    legend: [
       {'单季水稻': '#78C679'},{'水稻加其他': '#238443'},{'双季稻': '#005A00'}
       ],
    defaultVisibility: true,
  },
  'Rice2016': {
    l:a2,
    name: 'Rice2016',
    visParams: {min:1,max:3,palette:[ 
  '#78C679',//1 单季水稻
  '#238443',//2 水稻加其他 
  '#005A00',//3 双季稻 
]},
    legend: [
       {'单季水稻': '#78C679'},{'水稻加其他': '#238443'},{'双季稻': '#005A00'}
       ],
    defaultVisibility: true,
  },
  'Rice2017': {
    l:a3,
    name: 'Rice2017',
        visParams: {min:1,max:3,palette:[ 
  '#78C679',//1 单季水稻
  '#238443',//2 水稻加其他 
  '#005A00',//3 双季稻 
]},
    legend: [
       {'单季水稻': '#78C679'},{'水稻加其他': '#238443'},{'双季稻': '#005A00'}
       ],
    defaultVisibility: true,
  },
  'Rice2018': {
    l:a4,
    name: 'Rice2018',
    visParams: {min:1,max:3,palette:[ 
  '#78C679',//1 单季水稻
  '#238443',//2 水稻加其他 
  '#005A00',//3 双季稻 
]},
    legend: [
       {'单季水稻': '#78C679'},{'水稻加其他': '#238443'},{'双季稻': '#005A00'}
       ],
    defaultVisibility: true,
  },
  'Rice2019': {
    l:a5,
    name: 'Rice2019',
    visParams: {min:1,max:3,palette:[ 
  '#78C679',//1 单季水稻
  '#238443',//2 水稻加其他 
  '#005A00',//3 双季稻 
]},
    legend: [
       {'单季水稻': '#78C679'},{'水稻加其他': '#238443'},{'双季稻': '#005A00'}
       ],
    defaultVisibility: true,
  },
  'Rice2020': {
    l:a6,
    name: 'Rice2020',
    visParams: {min:1,max:3,palette:[ 
  '#78C679',//1 单季水稻
  '#238443',//2 水稻加其他 
  '#005A00',//3 双季稻 
]},
    legend: [
       {'单季水稻': '#78C679'},{'水稻加其他': '#238443'},{'双季稻': '#005A00'}
       ],
    defaultVisibility: true,
  },
   'Maize2015': {
    l:a7,
    name: 'Maize2015',
    visParams: {min:1,max:2,palette:[ 
  '#E69800',//1单季玉米 
  '#FFD37F',//2 玉米 
]},
    legend: [
       {'玉米加其他': '#E69800'},{'单季玉米': '#FFD37F'},
       ],
    defaultVisibility: true,
  },
  'Maize2016': {
    l:a8,
    name: 'Maize2016',
    visParams: {min:1,max:2,palette:[ 
  '#E69800',//1单季玉米 
  '#FFD37F',//2 玉米 
]},
    legend: [
       {'玉米加其他': '#E69800'},{'单季玉米': '#FFD37F'},
       ],
    defaultVisibility: true,
  },
  'Maize2017': {
    l:a9,
    name: 'Maize2017',
    visParams: {min:1,max:2,palette:[ 
  '#E69800',//1单季玉米 
  '#FFD37F',//2 玉米 
]},
    legend: [
       {'玉米加其他': '#E69800'},{'单季玉米': '#FFD37F'},
       ],
    defaultVisibility: true,
  },
  'Maize2018': {
    l:a10,
    name: 'Maize2018',
    visParams: {min:1,max:2,palette:[ 
  '#E69800',//1单季玉米 
  '#FFD37F',//2 玉米 
]},
    legend: [
       {'玉米加其他': '#E69800'},{'单季玉米': '#FFD37F'},
       ],
    defaultVisibility: true,
  },
  'Maize2019': {
    l:a11,
    name: 'Maize2019',
    visParams: {min:1,max:2,palette:[ 
  '#E69800',//1单季玉米 
  '#FFD37F',//2 玉米 
]},
    legend: [
       {'玉米加其他': '#E69800'},{'单季玉米': '#FFD37F'},
       ],
    defaultVisibility: true,
  },
  'Maize2020': {
    l:a12,
    name: 'Maize2020',
    visParams: {min:1,max:2,palette:[ 
  '#E69800',//1单季玉米 
  '#FFD37F',//2 玉米 
]},
    legend: [
       {'玉米加其他': '#E69800'},{'单季玉米': '#FFD37F'},
       ],
    defaultVisibility: true,
  },
    'Wheat2015': {
    l:a13,
    name: 'Wheat2015',
     visParams: {min:1,max:1,palette:[ 
  '#005A00',//1xiao'mai
]}, 
   legend: [
      {'小麦': '#005A00'},
       ],
    defaultVisibility: true,
  },
  'Wheat2016': {
    l:a14,
    name: 'Wheat2016',
    visParams: {min:1,max:1,palette:[ 
  '#005A00',//1xiao'mai
]}, 
   legend: [
      {'小麦': '#005A00'},
       ],
    defaultVisibility: true,
  },
  'Wheat2017': {
    l:a15,
    name: 'Wheat2017',
    visParams: {min:1,max:1,palette:[ 
  '#005A00',//1xiao'mai
]}, 
   legend: [
      {'小麦': '#005A00'},
       ],
    defaultVisibility: true,
  },
  'Wheat2018': {
    l:a16,
    name: 'Wheat2018',
    visParams: {min:1,max:1,palette:[ 
  '#005A00',//1xiao'mai
]}, 
   legend: [
      {'小麦 ': '#005A00'},
       ],
    defaultVisibility: true,
  },
  'Wheat2019': {
    l:a17,
    name: 'Wheat2019',
    visParams: {min:1,max:1,palette:[ 
  '#005A00',//1xiao'mai
]}, 
   legend: [
      {'小麦': '#005A00'},
       ],
    defaultVisibility: true,
  },
  'Wheat2020': {
    l:a18,
    name: 'Wheat2020',
    visParams: {min:1,max:1,palette:[ 
  '#005A00',//1xiao'mai
]}, 
   legend: [
      {'小麦': '#005A00'},
       ],
    defaultVisibility: true,
  },
   'Corpping2015': {
    l:a19,
    name: 'Corpping2015',
    visParams: {min:1,max:10,palette:[ 
  '#8400A8',//3三季作物 1
  '#D9F0A3',//14单季玉米 2
  '#78C679',//15单季水稻3
  '#238443',//16单季小麦 4
  '#005A00',//17单季其他 5
  '#FFFF73',//27其他双季作物 6
  '#FFD37F',//245水稻加玉米 7
  '#E69800',//247玉米加小麦 8
  '#FF5500',//255双季稻 9
  '#EC0000',//256水稻加小麦 10
]},
   legend: [
      {'三季作物': '#8400A8'},{'单季玉米': '#D9F0A3'},
      {'单季水稻': '#78C679'}, {'单季小麦 ': '#238443'},{'单季其他': '#005A00'},
      {'其他双季作物': '#FFFF73'},{'水稻加玉米': '#FFD37F'}, {'玉米加小麦': '#E69800'},
      {'双季稻': '#FF5500'},{'水稻加小麦': '#EC0000'}
       ],
    defaultVisibility: true,
  },
  'Corpping2016': {
    l:a20,
    name: 'Corpping2016',
    visParams: {min:1,max:10,palette:[ 
  '#8400A8',//3三季作物 1
  '#D9F0A3',//14单季玉米 2
  '#78C679',//15单季水稻3
  '#238443',//16单季小麦 4
  '#005A00',//17单季其他 5
  '#FFFF73',//27其他双季作物 6
  '#FFD37F',//245水稻加玉米 7
  '#E69800',//247玉米加小麦 8
  '#FF5500',//255双季稻 9
  '#EC0000',//256水稻加小麦 10
]},
   legend: [
      {'三季作物': '#8400A8'},{'单季玉米': '#D9F0A3'},
      {'单季水稻': '#78C679'}, {'单季小麦 ': '#238443'},{'单季其他': '#005A00'},
      {'其他双季作物': '#FFFF73'},{'水稻加玉米': '#FFD37F'}, {'玉米加小麦': '#E69800'},
      {'双季稻': '#FF5500'},{'水稻加小麦': '#EC0000'}
       ],
    defaultVisibility: true,
  },
  'Corpping2017': {
    l:a21,
    name: 'Corpping2017',
    visParams: {min:1,max:10,palette:[ 
  '#8400A8',//3三季作物 1
  '#D9F0A3',//14单季玉米 2
  '#78C679',//15单季水稻3
  '#238443',//16单季小麦 4
  '#005A00',//17单季其他 5
  '#FFFF73',//27其他双季作物 6
  '#FFD37F',//245水稻加玉米 7
  '#E69800',//247玉米加小麦 8
  '#FF5500',//255双季稻 9
  '#EC0000',//256水稻加小麦 10
]},
   legend: [
      {'三季作物': '#8400A8'},{'单季玉米': '#D9F0A3'},
      {'单季水稻': '#78C679'}, {'单季小麦 ': '#238443'},{'单季其他': '#005A00'},
      {'其他双季作物': '#FFFF73'},{'水稻加玉米': '#FFD37F'}, {'玉米加小麦': '#E69800'},
      {'双季稻': '#FF5500'},{'水稻加小麦': '#EC0000'}
       ],
    defaultVisibility: true,
  },
  'Corpping2018': {
    l:a22,
    name: 'Corpping2018',
    visParams: {min:1,max:10,palette:[ 
  '#8400A8',//3三季作物 1
  '#D9F0A3',//14单季玉米 2
  '#78C679',//15单季水稻3
  '#238443',//16单季小麦 4
  '#005A00',//17单季其他 5
  '#FFFF73',//27其他双季作物 6
  '#FFD37F',//245水稻加玉米 7
  '#E69800',//247玉米加小麦 8
  '#FF5500',//255双季稻 9
  '#EC0000',//256水稻加小麦 10
]},
   legend: [
      {'三季作物': '#8400A8'},{'单季玉米': '#D9F0A3'},
      {'单季水稻': '#78C679'}, {'单季小麦 ': '#238443'},{'单季其他': '#005A00'},
      {'其他双季作物': '#FFFF73'},{'水稻加玉米': '#FFD37F'}, {'玉米加小麦': '#E69800'},
      {'双季稻': '#FF5500'},{'水稻加小麦': '#EC0000'}
       ],
    defaultVisibility: true,
  },
  'Corpping2019': {
    l:a23,
    name: 'Corpping2019',
    visParams: {min:1,max:10,palette:[ 
  '#8400A8',//3三季作物 1
  '#D9F0A3',//14单季玉米 2
  '#78C679',//15单季水稻3
  '#238443',//16单季小麦 4
  '#005A00',//17单季其他 5
  '#FFFF73',//27其他双季作物 6
  '#FFD37F',//245水稻加玉米 7
  '#E69800',//247玉米加小麦 8
  '#FF5500',//255双季稻 9
  '#EC0000',//256水稻加小麦 10
]},
   legend: [
      {'三季作物': '#8400A8'},{'单季玉米': '#D9F0A3'},
      {'单季水稻': '#78C679'}, {'单季小麦 ': '#238443'},{'单季其他': '#005A00'},
      {'其他双季作物': '#FFFF73'},{'水稻加玉米': '#FFD37F'}, {'玉米加小麦': '#E69800'},
      {'双季稻': '#FF5500'},{'水稻加小麦': '#EC0000'}
       ],
    defaultVisibility: true,
  },
  'Corpping2020': {
    l:a24,
    name: 'Corpping2020',
    visParams: {min:1,max:10,palette:[ 
  '#8400A8',//3三季作物 1
  '#D9F0A3',//14单季玉米 2
  '#78C679',//15单季水稻3
  '#238443',//16单季小麦 4
  '#005A00',//17单季其他 5
  '#FFFF73',//27其他双季作物 6
  '#FFD37F',//245水稻加玉米 7
  '#E69800',//247玉米加小麦 8
  '#FF5500',//255双季稻 9
  '#EC0000',//256水稻加小麦 10
]},
   legend: [
      {'三季作物': '#8400A8'},{'单季玉米': '#D9F0A3'},
      {'单季水稻': '#78C679'}, {'单季小麦 ': '#238443'},{'单季其他': '#005A00'},
      {'其他双季作物': '#FFFF73'},{'水稻加玉米': '#FFD37F'}, {'玉米加小麦': '#E69800'},
      {'双季稻': '#FF5500'},{'水稻加小麦': '#EC0000'}
       ],
    defaultVisibility: false,
  },
};
}
 gh(Rice2015,Rice2016,Rice2017,Rice2018,Rice2019,Rice2020,
    Maize2015,Maize2016,Maize2017,Maize2018,Maize2019,Maize2020,
    Wheat2015,Wheat2016,Wheat2017,Wheat2018,Wheat2019,Wheat2020,
    Corpping2015,Corpping2016, Corpping2017,Corpping2018,Corpping2019,Corpping2020);
//---------------------------------将地图图层设置为最底层，设置交互地图颜色 
ui.root.widgets().reset([mapPanel]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));
for (var key in layerProperties) {
  var layer = layerProperties[key];
  var image = rec.select(layer.name).visualize(layer.visParams);
  mapPanel.add(ui.Map.Layer(image, {}, key, layer.defaultVisibility));
}
//---------------------------添加APP标题------------------------------------------------------------------------------
var header = ui.Label('中国农情信息可视化系统', {fontWeight: 'bold', fontSize: '30px', color: 'black'});
var toolPanel = ui.Panel([header], 'flow', {width: '500px'});
ui.root.widgets().add(toolPanel);
// ---------------------------------------------------------------------------------
var crop_type = {
  'Rice':{
    name: '001 ',
    visParams: {min:1,max:3,palette:[ 
  '#78C679',//1 单季水稻
  '#238443',//2 水稻加其他 
  '#005A00',//3 双季稻 
]},
    legend: [
       {'单季水稻': '#78C679'},{'水稻加其他': '#238443'},{'双季稻': '#005A00'}
       ],
    leixing:{'单季水稻': 1,'水稻加其他': 2,'双季稻': 3},   
  },
  'Maize':{
    name: '002 ',
    visParams: {min:1,max:2,palette:[ 
  '#E69800',//1单季玉米 
  '#FFD37F',//2 玉米 
]},
    legend: [
       {'玉米加其他': '#E69800'},{'单季玉米': '#FFD37F'},
       ],
    leixing:{'玉米加其他':1, '单季玉米': 2},
  },
  'Wheat':{
    name: '003 ',
    visParams: {min:1,max:1,palette:[ 
  '#005A00',//1xiao'mai
]}, 
   legend: [
      {'小麦': '#005A00'},
       ],
   leixing:{'小麦': 1},
  },
  'Corpping':{
    name: '004 ',
    visParams: {min:1,max:10,palette:[ 
  '#8400A8',//3三季作物 1
  '#D9F0A3',//14单季玉米 2
  '#78C679',//15单季水稻3
  '#238443',//16单季小麦 4
  '#005A00',//17单季其他 5
  '#FFFF73',//27其他双季作物 6
  '#FFD37F',//245水稻加玉米 7
  '#E69800',//247玉米加小麦 8
  '#FF5500',//255双季稻 9
  '#EC0000',//256水稻加小麦 10
]},
   legend: [
      {'三季作物': '#8400A8'},{'单季玉米': '#D9F0A3'},
      {'单季水稻': '#78C679'}, {'单季小麦 ': '#238443'},{'单季其他': '#005A00'},
      {'其他双季作物': '#FFFF73'},{'水稻加玉米': '#FFD37F'}, {'玉米加小麦': '#E69800'},
      {'双季稻': '#FF5500'},{'水稻加小麦': '#EC0000'}
       ],
   leixing:{'三季作物': 1,'单季玉米':2 ,'单季水稻':3,'单季小麦':4,'单季其他':5,'其他双季作物': 6,
   '水稻加玉米': 7,'玉米加小麦': 8,'双季稻':9, '水稻加小麦': 10},
  }
}
var years = {
  '2015':{
    name: '2015年 '
  },
  '2016':{
    name: '2016年 '
  },
  '2017':{
    name: '2017年 '
  },
  '2018':{
    name: '2018年 '
  },
  '2019':{
    name: '2019年 '
  },
  '2020':{
    name: '2020年 '
  },
}
// ------------------------------------设置年份下拉框 -------------------------
var im=Corpping2020
var years_str = '';
var layerSelect = ui.Select({
  items: Object.keys(years),//selectItems
  value: Object.keys(years)[0],//selectItems[0]
  onChange: function(selected) {
    years_str = selected;
    dosomt();
  }
});
toolPanel.add(ui.Label('选择左侧界面需要展示制图结果', {'font-size': '16px'}));
toolPanel.add(ui.Label('选择年份', {'font-size': '20px'}));
toolPanel.add(layerSelect);
/////////////////////////////////////////设置作物类型下拉框 ///////////////////////////////
var crop_type_str = '';
var layerSelect = ui.Select({
  items: Object.keys(crop_type),//selectItems
  value: Object.keys(crop_type)[0],//selectItems[0]
  onChange: function(selected) {
    crop_type_str = selected;
    // console.log(crop_type_str);
    dosomt();
  }
});
toolPanel.add(ui.Label('选择作物类型 ', {'font-size': '20px'}));
toolPanel.add(layerSelect);
//////////////////////////////将年份和作物类型按钮的值组合 //////////////////////////////////////////////
var  result_name = '';
function dosomt(){
   result_name = crop_type_str + years_str ;
   return result_name;
}
var newIm = '';
var btn = ui.Button({
 label: "确认",
 onClick: function() {
    var bb = dosomt();
    console.log(bb);
    var imT;
    mapPanel.layers().forEach(function(element, index)
    {
      element.setShown(bb == element.getName());
    });
    var aa= bb.toString();
    imT=layerProperties[aa].l;
    setLegend(layerProperties[aa].legend);
    im=imT;
    newIm = im;
    // console.log(im);
    //return im;
    getIm();
 },
});
toolPanel.add(btn); 
function getIm(){
    return newIm;
}
toolPanel.add(ui.Label('在地图上任意点击一点，可统计该点所在省级或市级范围内各种植类型种植面积', {'font-size': '16px'}));
//---------------------------------------------添加图例----可公用----------------------------
var legendPanel = ui.Panel({
  style:
      {position:'bottom-left',
        fontSize: '15px', margin: '0 0 0 8px', padding: '0'}
});
//-------------------------------------------------图例标题------------------------------------
 var title = ui.Label({
   value: '种植结构类型',
   style: {
     fontWeight: 'bold',
     color: "red",
     fontSize: '16px'
   }
 });
 legendPanel.add(title);
// /////////////////////////////左下角图例 /////////////////////////////
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
// setLegend(layerProperties[layerSelect.getValue()].legend);
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
  value: 1,
  step: 0.01,
});
opacitySlider.onSlide(function(value) {
  mapPanel.layers().forEach(function(element, index) {
    element.setOpacity(value);
  });
});
var viewPanel =ui.Panel([checkbox, opacitySlider], ui.Panel.Layout.Flow('horizontal'))
var combinePanel = ui.Panel([keyPanel,viewPanel],ui.Panel.Layout.Flow());
legendPanel.add(combinePanel);
mapPanel.add(legendPanel);
//---------------------------------------------透明度滑块end-------------------------------------------------
//------------------------------查询水平--可公用---------------------------------------------------
var placesRegion = {
  "省级": china_province,
  "市级": china_city
};
var Regionlevel;
var featureA=china_city;
var selectsRegion = ui.Select({
    items: Object.keys(placesRegion),
    onChange: function(key) {
    featureA=placesRegion[key];
  }
});
selectsRegion.setPlaceholder('级别');
//水平排列 
var pan=ui.Panel([selectsRegion],ui.Panel.Layout.Flow('horizontal'))
var locationPanel1= ui.Panel([
  ui.Label('选择行政区级别', {'font-size': '18px'}),pan]);
toolPanel.add(locationPanel1);
//------------------------------查询水平end-----------------------------------------------------
//------------------------------经纬度显示-------------------------------------------------------
var lon = ui.Label();
var lat = ui.Label();
var LonLatP=ui.Panel([lon, lat], ui.Panel.Layout.flow('horizontal'))
toolPanel.add(LonLatP);
var initialPoint = ee.Geometry.Point(118.80541126489923, 36.85878902232039);
//------------------------------经纬度显示end---------------------------------------------------
//------------------------------------点击生成图表功能----------------------------------------
var histogram = ui.Panel()
histogram.style().set({
  position: 'bottom-center'
});
var intro=ui.Panel();
var generateChart = function (coords) {
  intro.clear();
  histogram.clear();
  lon.setValue('lon: ' + coords.lon.toFixed(2));
  lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: '000000'});
  // Add the dot as the second layer, so it shows up on top of the composite.
  mapPanel.layers().set(2, dot);
  var Pl=featureA.filterBounds(point);
  var image = getIm();
  // var image =im ;//数据*********需要修改
  // console.log("tyytytyuyy");
  console.log(image);
  var region = Pl;
//点击图表功能 (先求影像属性在shp中新建属性)
var wkt = ' \
  PROJCS["World_Mollweide", \
    GEOGCS["GCS_WGS_1984", \
      DATUM["WGS_1984", \
        SPHEROID["WGS_1984",6378137,298.257223563]], \
      PRIMEM["Greenwich",0], \
      UNIT["Degree",0.017453292519943295]], \
    PROJECTION["Mollweide"], \
    PARAMETER["False_Easting",0], \
    PARAMETER["False_Northing",0], \
    PARAMETER["Central_Meridian",0], \
    UNIT["Meter",1], \
    AUTHORITY["EPSG","54009"]]';
var equalArea_proj_globe = ee.Projection(wkt);
function reducer(nb,img1,r){
  var d=img1.eq(nb).reduceRegion({
  reducer: ee.Reducer.sum(),
  geometry: r,
  scale:30,
  crs:equalArea_proj_globe,
  maxPixels: 1e13
});
  var e=d.getNumber("b1").divide(4).toInt();
  return e;
}
var extremeStates = region.map(function(state) 
{
  if (crop_type_str == "Rice"){
    state=state.set('单季水稻', reducer(1,image,region));
    state=state.set('水稻加其他', reducer(2,image,region));
    return state.set('双季稻', reducer(3,image,region));
    //return state;
  }
  else if(crop_type_str == "Maize"){
    state=state.set('单季玉米', reducer(1,image,region));
    return state.set('玉米加其他', reducer(2,image,region));
    //return state;
  }
  else if(crop_type_str == "Wheat"){
    return state.set('小麦', reducer(1,image,region));
  }
  else if(crop_type_str == "Corpping"){
    state=state.set('三季作物', reducer(1,image,region));
    state=state.set('单季玉米', reducer(2,image,region));
    state=state.set('单季水稻', reducer(3,image,region));
    state=state.set('单季小麦', reducer(4,image,region));
    state=state.set('单季其他', reducer(5,image,region));
    state=state.set('其他双季作物', reducer(6,image,region));
    state=state.set('水稻加玉米', reducer(7,image,region));
    state=state.set('玉米加小麦', reducer(8,image,region));
    state=state.set('双季稻', reducer(9,image,region));
    return state.set('水稻加小麦', reducer(10,image,region));
    //return state;
  }
});
var lx = crop_type[crop_type_str].leixing;
var label=ui.Label({
    value:'作物类型面积:',
    style: {fontSize: '15px', fontWeight: 'bold'}
  });
// console.log("22222222222222222222222222222");
// console.log(crop_type_str);
var chart=ui.Chart.feature.byFeature(extremeStates, 'DSMC', Object.keys(lx))
    .setChartType('ColumnChart')
    .setOptions({
    // title: '农业大棚面积:',
      hAxis: {title: '行政区'},
      vAxis: {title: '面积（平方千米）'},
      // colors: [ '#8400A8', '#D9F0A3', '#78C679','#238443' , '#005A00','#FFFF73' , '#FFD37F','#E69800' ,'#FF5500', '#EC0000']
      colors:crop_type[crop_type_str].visParams.palette
    })
histogram.add(chart);
intro.add(label)
toolPanel.add(intro);//out put in ui panel
toolPanel.add(histogram);
};
mapPanel.onClick(generateChart);
generateChart({
  lon: initialPoint.coordinates().get(0).getInfo(),
  lat: initialPoint.coordinates().get(1).getInfo()
});