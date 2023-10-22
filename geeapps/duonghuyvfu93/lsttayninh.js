//--------------------- Khai bao khu vuc nghien cuu --------------------------------
var VietNam = ee.FeatureCollection("projects/ee-nhan-gee/assets/gadm36_VNM_TINH");
//Map.centerObject(VietNam,4);
//Map.addLayer(VietNam,{color:'red'},'Viet Nam');
// Tinh Tay Ninh
var khuvuc = VietNam.filter(ee.Filter.inList('VARNAME_1',['Tay Ninh'])).geometry();
//Map.addLayer(khuvuc,{color:'00FF00'},'Ranh gioi tinh Tay Ninh',0);
Map.centerObject(khuvuc,10);
//Map.setCenter(106.13715011608544,11.380556092886792, 9);
//--------------- kHAI BAO ANH-------------------------
var image = ee.Image('LANDSAT/LC09/C02/T1/LC09_125052_20220308').clip(khuvuc);
print(image)
var trueColor432Vis = {
  min: 6000,
  max: 18000,
  bands:['B4','B3','B2'],
  gamma:1.0
};
//Map.addLayer(image, trueColor432Vis, 'Image L9');
//----------------- TINH CHI SO NHIET DO BE MAT--------------------------------------
// Bước 1: Chuyển đổi giá trị DN sang giá trị bức xạ 
var RADIANCE_MULT_BAND_10 = ee.Number(image.get('RADIANCE_MULT_BAND_10'));
//print(RADIANCE_MULT_BAND_10);
var RADIANCE_ADD_BAND_10 =ee.Number(image.get('RADIANCE_ADD_BAND_10'));
//print(RADIANCE_ADD_BAND_10)
var L = image.expression(
  'M_L*Q_cal + A_L',{
    'M_L':RADIANCE_MULT_BAND_10,//0.00038
    'Q_cal':image.select('B10'),// GIA TRI PIXEL BAND 10
    'A_L':RADIANCE_ADD_BAND_10//0.1
  });
//Map.addLayer(L,{},'L');
// Bước 2: Chuyển đổi giá trị bức xạ sang nhiệt độ chiếu sáng  
var   K1_CONSTANT_BAND_10 = ee.Number(image.get('K1_CONSTANT_BAND_10'));
//print(K1_CONSTANT_BAND_10);
 var   K2_CONSTANT_BAND_10 = ee.Number(image.get('K2_CONSTANT_BAND_10'));
//print(K2_CONSTANT_BAND_10); 
var TB = image.expression(
  'K2/(log((K1/L) + 1))',{
    'K1':K1_CONSTANT_BAND_10,// 799.0284
    'K2':K2_CONSTANT_BAND_10,// 1329.2405
    'L': L
  });
//Map.addLayer(TB,{},'TB');  
//Bước 3: Tính chỉ số NDVI
 var NDVI = image.normalizedDifference(['B5','B4']);
var viz = {
  min: 0,
  max: 1,
  palette: [
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  ]};
//Map.addLayer(NDVI,viz,'NDVI_L9',0);    
// Bước 4: Tính hợp phần thực vật (fv-fractional vegetation) hay tỉ lệ thực vật trong 1 pixel ảnh
var NDVI_dat = ee.Number(0.2);
var NDVI_thucvat = ee.Number(0.86);
var fv = ((NDVI.subtract(NDVI_dat)).divide(NDVI_thucvat.subtract(NDVI_dat))).pow(ee.Number(2));
//Map.addLayer(fv,{},'fv'); 
// Bước 5: Tinh độ phát xạ bề mặt
var e = image.expression(
  'fv*e_thucvat + (1-fv)*e_dattrong',{
    'fv': fv,
    'e_thucvat':0.97,
    'e_dattrong':0.96
  });
//Map.addLayer(e,{},'e'); 
//  Bước 6: Tính nhiệt độ bề mặt LST
var LST = image.expression(
  '(TB/ (1 + (lamda*TB/q)*log(e))) - 273',{
    'TB':TB,
    'lamda': 0.00106,
    'q':1.438,
    'e':e
    });
  var viz = {
    min:25,
    max:37,
    palette: [
  '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003'
 ]};
Map.addLayer(LST,viz,'LST tinh Tay Ninh')  ;
// Xac dinh gia tri min - max
var min = ee.Number(LST.reduceRegion({
reducer: ee.Reducer.min(),
geometry: khuvuc,// ten bien khai bao khu vuc nghien cuu
scale: 30,
maxPixels: 1e9
}).values().get(0));
print(min, ' Giá trị nhỏ nhất cua LST');
var max = ee.Number(LST.reduceRegion({
reducer: ee.Reducer.max(),
geometry: khuvuc,// ten bien khai bao khu vuc nghien cuu
scale: 30,
maxPixels: 1e9
}).values().get(0));
print(max, 'Giá trị lớn nhất cua LST')//
// xay dung bieu do histogram
var Histogram=ui.Chart.image.histogram(LST,khuvuc)//tên biến, khu vuc
      .setOptions({
      title: 'Histogram of LST in 08/03/2022 ', 
    hAxis: {title: 'Temperature (oC) '}, 
    vAxis: {title: 'Frequence'}, series: {0: {color: 'ffa500'}}
    });
//print(Histogram);
 var chart = ui.Panel(
   {
    style: {
      position: 'bottom-right'
    } 
   })
chart.add(Histogram);
Map.add(chart);
// 
  //----------------------------CHU THICH--------------------------------------
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 10px'
  }});
  // Create legend title
var legendTitle = ui.Label({
  value: 'LST (oC)',// Sua ten chu thich
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
 // Add the title to the panel
legend.add(legendTitle); 
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label(viz['max'])
    ],
  });
legend.add(panel);
  // create thumbnail from the image
var thumbnail = ui.Thumbnail({
  image: legendImage, 
  params: {bbox:'0,0,10,100', dimensions:'10x200'},  
  style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label(viz['min'])
    ],
  });
legend.add(panel);
Map.add(legend);
//