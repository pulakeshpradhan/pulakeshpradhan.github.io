var table = ui.import && ui.import("table", "table", {
      "id": "users/thaiqm09gl/VQGCHUMOMRAY_RGTRAM"
    }) || ee.FeatureCollection("users/thaiqm09gl/VQGCHUMOMRAY_RGTRAM");
/*Chọn ranh giới quan tâm cái này bỏ qua vì có rồi
Chọn ngày, tháng, tỷ lệ mây - aps dungj
Chọn ảnh quan tâm, tải ảnh
ảnh đầu kỳ - ngưỡng - phân loại
ảnh cuói kỳ - ngường - phân loại
biến động tăng giảm - tải ảnh - tải vector*/
var f = require('users/thaiqm09gl/work:Các hàm')
/*1. Thiết kế giao diện*/
  var PANEL = ui.Panel({
    style: {
    width: '350px',
    border: '1px solid black',
    textAlign: 'left',
    backgroundColor:'#00FF00',
    margin: '3px 3px 3px 3px'},
    layout: ui.Panel.Layout.flow('vertical')}); //tao bang dieu khien
  ui.root.insert(0,PANEL); //them vao ban do
  var Menu01 = ui.Label({value: 'Tải ảnh Sentinel 2',
  style: {fontWeight: 'bold', fontSize: '24px',margin: '10px 60px',width: 200+'px',color: '#0000FF'}});
  PANEL.add(Menu01);
  /*Chọn ngày, tháng, tỷ lệ mây*/
  var LOC_ANH = ui.Textbox({
    value:'2020-01-01, 2021-01-01, 5',
    placeholder: 'Ngày, tỷ lệ % mây',
    style: {width: 200+'px',padding:'2px',fontWeight:'bold',color: '#0000FF'} });
  var RANH_GIOI = ui.Select({
    placeholder: 'Chọn RG',
    style: {stretch: 'both',width: 100+'px',fontWeight:'bold',color: '#0000FF'} });
  var AP_DUNG = ui.Button({
    label: 'Hiển thị',
    style: {stretch: 'both',width: 100+'px',fontWeight:'bold',color: '#0000FF'} });
  var TAI_ANH = ui.Select({
    placeholder: 'Tải ảnh',
    style: {width: 200+'px',fontWeight:'bold',color: '#0000FF'} });
  var DAU_KY = ui.Select({
    placeholder: 'Đầu kỳ',
    style: {width: 180+'px',fontWeight:'bold',color: '#0000FF'} });
  var NGUONG_1 = ui.Textbox({
    placeholder: 'Ngưỡng 1',
    style: {width: 70+'px',padding:'2px',fontWeight:'bold',color: '#0000FF'} });
  var PL_1 = ui.Button({
    label: 'PL 1',
    style: {stretch: 'both',width: 50+'px',fontWeight:'bold',color: '#0000FF'} });
  var CUOI_KY = ui.Select({
    placeholder: 'Cuối kỳ',
    style: {width: 180+'px',fontWeight:'bold',color: '#0000FF'} });
  var NGUONG_2 = ui.Textbox({
    placeholder: 'Ngưỡng 2',
    style: {width: 70+'px',padding:'2px',fontWeight:'bold',color: '#0000FF'} });
  var PL_2 = ui.Button({
    label: 'PL 2',
    style: {stretch: 'both',width: 50+'px',fontWeight:'bold',color: '#0000FF'} });
  var BD_TANG = ui.Button({
    label: 'Biến động tăng',
    style: {stretch: 'both',width: 150+'px',fontWeight:'bold',color: '#0000FF'} });
  var BD_GIAM = ui.Button({
    label: 'Biến động giảm',
    style: {stretch: 'both',width: 150+'px',fontWeight:'bold',color: '#0000FF'} });    
  f.f3(PANEL,[LOC_ANH,RANH_GIOI])
  f.f3(PANEL,[AP_DUNG,TAI_ANH])
  f.f3(PANEL,[DAU_KY,NGUONG_1,PL_1])
  f.f3(PANEL,[CUOI_KY,NGUONG_2,PL_2])
  f.f3(PANEL,[BD_TANG,BD_GIAM])
/*2. Thêm tính năng*/
  var a = []
  a[0] = table.distinct('TRAM').sort('TRAM')
  .reduceColumns(ee.Reducer.toList(),['TRAM']).get('list').getInfo() // DS LỌC ranh gioi
  RANH_GIOI.items().reset(a[0]) //tao danh sach de loc
  RANH_GIOI.onChange(function(value){
    a[1] = table.filterMetadata('TRAM','equals',value)
    Map.centerObject(a[1])
    Map.clear()
    f.f4(a[1],'Ranh gioi tai anh')
  })
  AP_DUNG.onClick(function(value){
    a[2] = LOC_ANH.getValue().split(', ')
    a[3] = f.f1(a[1],a[2][0],a[2][1],+a[2][2]) //danh sach anh ve tinh
    a[4] = f.f2(a[3]) //danh sach ngay
    TAI_ANH.items().reset(a[4])
    DAU_KY.items().reset(a[4])
    CUOI_KY.items().reset(a[4])
    for(var i=0;i<a[3].length;i++){
      Map.addLayer(a[3][i],{max:3000,min:0,gamma:1.2,bands:['B4','B3','B2']},a[4][i],false)
    }
  })
  TAI_ANH.onChange(function(value){
    for(var i1=0;i1<a[4].length;i1++){
      if(a[4][i1]===value){
        f.f5(a[3][i1].select(['B4','B3','B2']),a[4][i1],a[1])
      }
    }
  })
  PL_1.onClick(function(){
    for(var i2=0;i2<a[4].length;i2++){
      if(a[4][i2]===DAU_KY.getValue()){
        a[5] = a[3][i2] //anh ve tinh dau ky
        a[6] = a[4][i2] //ten hien thi
        a[7] = +NGUONG_1.getValue() //nguong phan loai
        a[8] = a[5].expression('float((nir-red)/(nir+red))',
        {'nir': a[5].select('B8'),
        'red': a[5].select('B4')}).rename('NDVI')
        a[9] = a[8].where(a[8],1).where(a[8].updateMask(a[8].lt(a[7])),2) //dat nguong phan loai
        a[10] = a[9].updateMask(a[9].eq(1)) //dat co rung
        a[11] = a[9].updateMask(a[9].eq(2)) //dat khac
        a[12] = f.f7(a[11].eq(2)) //vector đất khác
      }}
    Map.clear()
    Map.addLayer(a[5],{max:3000,min:0,gamma:1.2,bands:['B4','B3','B2']},a[6])
    Map.addLayer(a[10],{palette: '#00FF00'},'Đất có rừng')
    Map.addLayer(a[11],{palette: '#fff702'},'Đất khác')
    f.f8(a[12],'Vector đất khác')
  })
  PL_2.onClick(function(){
     for(var i2=0;i2<a[4].length;i2++){
      if(a[4][i2]===CUOI_KY.getValue()){
        a[13] = a[3][i2] //anh ve tinh dau ky
        a[14] = a[4][i2] //ten hien thi
        a[15] = +NGUONG_2.getValue() //nguong phan loai
        a[16] = a[13].expression('float((nir-red)/(nir+red))',
        {'nir': a[13].select('B8'),
        'red': a[13].select('B4')}).rename('NDVI')
        a[17] = a[16].where(a[16],1).where(a[16].updateMask(a[16].lt(a[7])),2) //dat nguong phan loai
        a[18] = a[17].updateMask(a[17].eq(1)) //dat co rung
        a[19] = a[17].updateMask(a[17].eq(2)) //dat khac
        a[20] = f.f7(a[19].eq(2)) //vector đất khác
      }}
    Map.clear()
    Map.addLayer(a[13],{max:3000,min:0,gamma:1.2,bands:['B4','B3','B2']},a[14])
    Map.addLayer(a[18],{palette: '#00FF00'},'Đất có rừng')
    Map.addLayer(a[19],{palette: '#fff702'},'Đất khác')
    f.f8(a[20],'Vector đất khác')
  })
  BD_TANG.onClick(function(){
    a[21] = a[9].multiply(10).add(a[17])
    a[22] = a[21].updateMask(a[21].eq(21)) //ảnh biến động
    a[23] = f.f7(a[22].eq(21)) //vector biến động
    Map.clear()
    Map.addLayer(a[5],{max:3000,min:0,gamma:1.2,bands:['B4','B3','B2']},a[6])
    Map.addLayer(a[13],{max:3000,min:0,gamma:1.2,bands:['B4','B3','B2']},a[14])
    Map.addLayer(a[22],{palette: '#00FF00'},'Ảnh biến động tăng')
    f.f8(a[23],'Vector biến động tăng')
    f.f5(a[22],'IMG_tang',a[1])
    Export.table.toDrive({
      collection:a[23], 
      description:'Vector_tang', 
      folder:'Bien_dong_rung', 
      fileNamePrefix:'Vector_tang', 
      fileFormat:'SHP'})
  })
  BD_GIAM.onClick(function(){
    a[26] = a[9].multiply(10).add(a[17])
    a[24] = a[26].updateMask(a[26].eq(12)) //ảnh biến động giảm
    a[25] = f.f7(a[24].eq(12)) //vector biến động giảm
    Map.clear()
    Map.addLayer(a[5],{max:3000,min:0,gamma:1.2,bands:['B4','B3','B2']},a[6])
    Map.addLayer(a[13],{max:3000,min:0,gamma:1.2,bands:['B4','B3','B2']},a[14])
    Map.addLayer(a[24],{palette: '#00FF00'},'Ảnh biến động giảm')
    f.f8(a[25],'Vector biến động giảm')
    f.f5(a[24],'IMG_giam',a[1])
    Export.table.toDrive({
      collection:a[25], 
      description:'Vector_giam', 
      folder:'Bien_dong_rung', 
      fileNamePrefix:'Vector_tang', 
      fileFormat:'SHP'})
  })
// xong nhé, anh đi ăn cơm đây