var a = [];
/*1. Ranh giới cắt ảnh A */
var A = ee.FeatureCollection('users/thao226355/share/VietNam_Ranh_gioi_xa')
.filterMetadata('tinh','equals','Hồ Chí Minh')   // lọc theo tên tỉnh
Map.centerObject(A);    //phóng bản đồ đến vị trí được chọn
Map.addLayer(A,{color:'yellow'},'Ranh giới cắt ảnh');
var list1 = A.distinct('huyen').sort('huyen')
.reduceColumns(ee.Reducer.toList(),['huyen']).get('list').getInfo();
print (list1)
var p1 = ui.Select(list1,'Chọn huyện');
var p2 = ui.Select([],'Chọn xã');
var p3 = ui.Textbox({
  placeholder:'Các thông số lọc ảnh',
  value: '5*2021-01-01*2021-12-31',
  style:{
    width:'250px',
    color:'red',
    fontWeight:'bold'
  }});
var p4 = ui.Checkbox('Lọc và hiển thị danh sách ảnh');
var p5 = ui.Select([],'Chọn ảnh để tải');
var p = ui.Panel();
[p1,p2,p3,p4,p5].map(function(x){return p.add(x)});
ui.root.insert(0,p);
p1.onChange(function(x){
  a[1] = A.filterMetadata('huyen','equals',x);
  a[4] = a[1].distinct('xa').sort('xa')
  .reduceColumns(ee.Reducer.toList(),['xa']).get('list').getInfo();
  p2.items().reset(a[4]);
  p4.setValue(false);
});
p2.onChange(function(x){
  a[1] = a[1].filterMetadata('xa','equals',x);
});  //ranh giới cắt ảnh a[1]
p3.onChange(function(x){
  p4.setValue(false);
});
p4.onChange(function(x){
  Map.clear();
  Map.centerObject(a[1]);
  Map.addLayer(a[1],{color:'yellow'},'Ranh giới cắt ảnh');
  if(x===true){
    var y = p3.getValue().split('*');
    a[2] = ee.ImageCollection("COPERNICUS/S2_SR")
    .filterBounds(a[1])    // lọc theo ranh giới
    .filterDate(y[1],y[2])  // lọc theo ngày
    .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',+y[0])    //lọc theo tỷ lệ mây (dưới 5%)
    .sort('system:time_start',true)   //sắp xếp ảnh theo ngày chụp
    .reduceColumns(ee.Reducer.toList(),['system:index']).get('list').getInfo()
    .map(function(x){return ee.Image('COPERNICUS/S2_SR/'+x).select(['B4','B3','B2','B8']).clip(a[1])});
    var y1 = a[2].map(function(x1){return 'Se2_'+x1.date().format('dd-MM-yyyy').getInfo()});
    a[3] = [];
    for(var i=0;i<a[2].length;i++){
      var y2 = y1[i]+'_'+i;
      a[3].push(y2);
      Map.addLayer(a[2][i],{max:3000,min:0,gamma:1.2},y2,false);
    }
    p5.items().reset(a[3]);
  }
});   //danh sách ảnh a[2], danh sách ngày a[3]
p5.onChange(function(x){
  for (var i=0;i<a[2].length;i++){
    if(x===a[3][i]){
      Export.image.toDrive({
        image: a[2][i], //chọn ảnh để tải (ảnh đầu tiên trong danh sách là ảnh 0)
        description: a[3][i], 
        folder: 'Google_Earth_Engine',  //thư mục Google Drive
        fileNamePrefix: a[3][i], //tên tải về
        region: a[0], 
        scale: 10, 
        crs: 'EPSG:4326', 
        maxPixels: 10e12, 
        fileFormat: 'GeoTIFF'});
    }
  }
});